import React, { useState, useMemo } from 'react';
import { SystemAuditLog, AuditActionType } from '../types';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  User, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Key, 
  Database, 
  Code, 
  X, 
  Eye, 
  Lock,
  Layers,
  Activity
} from 'lucide-react';

interface AuditLogManagerProps {
  auditLogs: SystemAuditLog[];
}

export const AuditLogManager: React.FC<AuditLogManagerProps> = ({ auditLogs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('Semua');
  const [targetFilter, setTargetFilter] = useState<string>('Semua');
  const [selectedLogForDetail, setSelectedLogForDetail] = useState<SystemAuditLog | null>(null);

  // Statistics
  const stats = useMemo(() => {
    const total = auditLogs.length;
    const createCount = auditLogs.filter(l => l.actionType === 'CREATE').length;
    const updateCount = auditLogs.filter(l => l.actionType === 'UPDATE').length;
    const licenseCount = auditLogs.filter(l => l.actionType === 'LICENSE_CHANGE').length;
    const syncCount = auditLogs.filter(l => l.actionType === 'SYNC').length;

    return { total, createCount, updateCount, licenseCount, syncCount };
  }, [auditLogs]);

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesSearch = searchQuery === '' || 
        log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        log.actorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.summaryText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.targetEntity.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAction = actionFilter === 'Semua' || log.actionType === actionFilter;
      const matchesTarget = targetFilter === 'Semua' || log.targetEntity === targetFilter;

      return matchesSearch && matchesAction && matchesTarget;
    });
  }, [auditLogs, searchQuery, actionFilter, targetFilter]);

  // CSV Exporter
  const handleExportCsv = () => {
    const headers = ['ID Log', 'Waktu (ISO)', 'Nama Admin', 'Email Admin', 'Tipe Aksi', 'Entitas Target', 'Ringkasan Perubahan', 'Alamat IP'];
    const rows = filteredLogs.map(log => [
      log.id,
      log.timestamp,
      `"${log.actorName}"`,
      `"${log.actorEmail}"`,
      log.actionType,
      `"${log.targetEntity}"`,
      `"${log.summaryText.replace(/"/g, '""')}"`,
      log.ipAddress || '-'
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `system_audit_log_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActionBadge = (action: AuditActionType) => {
    switch (action) {
      case 'CREATE':
        return <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]"><PlusCircle className="w-3 h-3 text-emerald-600" /> TAMBAH DATA</span>;
      case 'UPDATE':
        return <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]"><Edit3 className="w-3 h-3 text-blue-600" /> EDIT DATA</span>;
      case 'DELETE':
        return <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]"><Trash2 className="w-3 h-3 text-rose-600" /> HAPUS DATA</span>;
      case 'LICENSE_CHANGE':
        return <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]"><Key className="w-3 h-3 text-amber-600" /> LISENSI</span>;
      case 'SYNC':
        return <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]"><RefreshCw className="w-3 h-3 text-purple-600" /> SYNC CLOUD</span>;
      default:
        return <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold text-[10px]">{action}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Lock className="w-3.5 h-3.5 text-teal-400" />
            <span>Audit Trail & Sistem Pengawasan Keamanan</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Audit Log & Riwayat Perubahan Data
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Rekam jejak kronologis otomatis seluruh aktivitas administrator (penambahan obat, perpanjangan lisensi, perubahan harga, dan aturan klinis).
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 border border-teal-500/40"
        >
          <Download className="w-5 h-5" />
          <span>Ekspor Laporan Log (.CSV)</span>
        </button>
      </div>

      {/* Statistics Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total Log Aktivitas</span>
            <Activity className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{stats.total}</p>
          <p className="text-[11px] text-slate-500">Tercatat di sistem</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Pengubahan Data</span>
            <Edit3 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-blue-600">{stats.updateCount}</p>
          <p className="text-[11px] text-slate-500">Aksi perbaikan/edit</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Perubahan Lisensi</span>
            <Key className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600">{stats.licenseCount}</p>
          <p className="text-[11px] text-slate-500">Perpanjangan customer</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Penambahan Data</span>
            <PlusCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600">{stats.createCount}</p>
          <p className="text-[11px] text-slate-500">Rekor baru dibuat</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari log berdasarkan nama admin, email, atau ringkasan perubahan..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>

          {/* Filter Options */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500">Aksi:</span>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl text-xs px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Semua">Semua Aksi</option>
                <option value="CREATE">Tambah Data</option>
                <option value="UPDATE">Edit Data</option>
                <option value="DELETE">Hapus Data</option>
                <option value="LICENSE_CHANGE">Lisensi</option>
                <option value="SYNC">Sync Cloud</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500">Target:</span>
              <select
                value={targetFilter}
                onChange={(e) => setTargetFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl text-xs px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Semua">Semua Target</option>
                <option value="Obat">Obat</option>
                <option value="Interaksi DDInter">Interaksi Obat</option>
                <option value="Subskripsi Customer">Subskripsi Customer</option>
                <option value="Tarif & Fitur">Tarif & Fitur</option>
                <option value="Interaksi Makanan">Interaksi Makanan</option>
                <option value="Duplikasi Terapi">Duplikasi Terapi</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Waktu (WIB)</th>
                <th className="py-3.5 px-4">Administrator / Pengubah</th>
                <th className="py-3.5 px-4">Jenis Aksi</th>
                <th className="py-3.5 px-4">Entitas & Ringkasan Perubahan</th>
                <th className="py-3.5 px-4 text-right">Rincian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    Tidak ada log aktivitas audit yang sesuai dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Timestamp */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {new Date(log.timestamp).toLocaleString('id-ID', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Actor */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-900 text-teal-400 font-bold flex items-center justify-center text-[11px] shrink-0">
                          {log.actorName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{log.actorName}</p>
                          <p className="text-[10px] text-slate-500">{log.actorEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Action Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getActionBadge(log.actionType)}
                    </td>

                    {/* Target Entity & Summary */}
                    <td className="py-3.5 px-4 max-w-md">
                      <span className="inline-block font-bold text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 mb-1">
                        {log.targetEntity}
                      </span>
                      <p className="font-medium text-slate-800 leading-relaxed">{log.summaryText}</p>
                    </td>

                    {/* Action View Detail */}
                    <td className="py-3.5 px-4 text-right">
                      {log.detailsJson ? (
                        <button
                          onClick={() => setSelectedLogForDetail(log)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200 rounded-lg text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Detail Snapshot Log */}
      {selectedLogForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Code className="w-5 h-5 text-teal-600" />
                Rincian Snapshot Log #{selectedLogForDetail.id}
              </h3>
              <button onClick={() => setSelectedLogForDetail(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <p className="text-slate-500 font-medium">Ringkasan Aksi:</p>
                <p className="font-bold text-slate-800">{selectedLogForDetail.summaryText}</p>
                <p className="text-[11px] text-slate-500 pt-1">
                  Pengubah: <strong>{selectedLogForDetail.actorName}</strong> ({selectedLogForDetail.actorEmail}) • IP: {selectedLogForDetail.ipAddress || '127.0.0.1'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">JSON Snapshot Data:</label>
                <pre className="bg-slate-900 text-teal-300 p-4 rounded-xl font-mono text-[11px] overflow-x-auto max-h-60 leading-relaxed">
                  {selectedLogForDetail.detailsJson}
                </pre>
              </div>
            </div>

            <div className="pt-3 flex justify-end border-t border-slate-100">
              <button
                onClick={() => setSelectedLogForDetail(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
