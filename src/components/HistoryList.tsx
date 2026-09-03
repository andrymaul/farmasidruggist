import React, { useState, useMemo } from 'react';
import { InteractionCheckRecord, UserProfile } from '../types';
import { 
  History, 
  Calendar, 
  Lock, 
  Clock, 
  Search, 
  Filter, 
  RotateCcw, 
  Printer, 
  Copy, 
  Check, 
  Smartphone, 
  Trash2, 
  Edit3, 
  FileText, 
  Download, 
  Pill, 
  ShieldAlert, 
  ShieldCheck, 
  User, 
  X,
  Sparkles,
  Layers
} from 'lucide-react';

interface HistoryListProps {
  historyRecords: InteractionCheckRecord[];
  currentUser: UserProfile | null;
  onOpenPricingModal: () => void;
  onOpenAuthModal: () => void;
  onRecheckRecord?: (record: InteractionCheckRecord) => void;
  onPrintReport?: (record: InteractionCheckRecord) => void;
  onSendWhatsapp?: (record: InteractionCheckRecord) => void;
  onUpdateRecordNotes?: (recordId: string, notes: string) => void;
  onDeleteRecord?: (recordId: string) => void;
  onClearAllRecords?: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  historyRecords,
  currentUser,
  onOpenPricingModal,
  onOpenAuthModal,
  onRecheckRecord,
  onPrintReport,
  onSendWhatsapp,
  onUpdateRecordNotes,
  onDeleteRecord,
  onClearAllRecords
}) => {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all');

  // Interactive Action state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState<boolean>(false);

  // Filtered list
  const filteredRecords = useMemo(() => {
    return historyRecords.filter((record) => {
      // Search filter (patient name, drug name, notes)
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        (record.patientName && record.patientName.toLowerCase().includes(q)) ||
        (record.notes && record.notes.toLowerCase().includes(q)) ||
        record.drugs.some((d) => d.toLowerCase().includes(q));

      // Severity filter
      const matchSeverity =
        selectedSeverity === 'all' ||
        record.highestSeverity === selectedSeverity;

      // Time range filter
      let matchTime = true;
      if (selectedTimeRange !== 'all') {
        const recordTime = new Date(record.timestamp).getTime();
        const now = Date.now();
        if (selectedTimeRange === 'today') {
          matchTime = now - recordTime <= 24 * 60 * 60 * 1000;
        } else if (selectedTimeRange === '7days') {
          matchTime = now - recordTime <= 7 * 24 * 60 * 60 * 1000;
        } else if (selectedTimeRange === '30days') {
          matchTime = now - recordTime <= 30 * 24 * 60 * 60 * 1000;
        }
      }

      return matchSearch && matchSeverity && matchTime;
    });
  }, [historyRecords, searchTerm, selectedSeverity, selectedTimeRange]);

  // Plan limitation check
  const isLimited = !currentUser || currentUser.subscriptionPlan === 'Gratis' || currentUser.subscriptionPlan === 'Pemula';
  const displayedRecords = isLimited ? filteredRecords.slice(0, 3) : filteredRecords;

  // Copy structured CPPT medical record format
  const handleCopyCppt = (record: InteractionCheckRecord) => {
    const dateObj = new Date(record.timestamp);
    const dateStr = dateObj.toLocaleDateString('id-ID', { dateStyle: 'long' });
    const timeStr = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const cpptText = `[LEMBAR TELAAH RESEP & INTERAKSI OBAT - FARMASIDRUGGIST CDSS]
Fasilitas / Unit: Farmasi Klinis & Rawat Jalan
Waktu Telaah: ${dateStr}, ${timeStr} WIB
Nama Pasien: ${record.patientName || 'Pasien Rawat Jalan'}
Status Telaah: ${record.highestSeverity === 'None' ? 'Bebas Interaksi Signifikan' : `Risiko ${record.highestSeverity}`}

DAFTAR OBAT RESEP (${record.drugs.length} R/):
${record.drugs.map((d, i) => `${i + 1}. ${d}`).join('\n')}

HASIL SKRINING FARMAKOKINETIK & FARMAKODINAMIK:
- Tingkat Keparahan Terparah: ${record.highestSeverity}
- Jumlah Pasangan Interaksi: ${record.interactionCount} Pasangan Teridentifikasi

CATATAN / REKOMENDASI APOTEKER:
${record.notes || 'Resep telah ditelaah, tidak ditemukan duplikasi terapi mutlak.'}

Penelaah: ${currentUser?.name || 'Apoteker Penanggung Jawab'}
Sistem Verifikasi: FarmasiDruggist Evidence-Based CDSS (DDInter / Fornas VI)`;

    navigator.clipboard.writeText(cpptText);
    setCopiedId(record.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Export to CSV
  const handleExportCsv = () => {
    if (filteredRecords.length === 0) return;
    const headers = [
      'No',
      'Tanggal',
      'Waktu',
      'Nama Pasien',
      'Daftar Obat Resep',
      'Jumlah Obat',
      'Tingkat Risiko Terparah',
      'Jumlah Interaksi',
      'Catatan Apoteker'
    ];

    const rows = filteredRecords.map((r, idx) => {
      const d = new Date(r.timestamp);
      const dateStr = d.toLocaleDateString('id-ID');
      const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const drugsStr = `"${r.drugs.join(', ')}"`;
      const notesStr = `"${(r.notes || '').replace(/"/g, '""')}"`;
      const patientStr = `"${(r.patientName || 'Pasien Tanpa Nama').replace(/"/g, '""')}"`;

      return [
        idx + 1,
        dateStr,
        timeStr,
        patientStr,
        drugsStr,
        r.drugs.length,
        r.highestSeverity,
        r.interactionCount,
        notesStr
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Rekapitulasi_Telaah_Resep_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Note Draft
  const handleSaveNote = (recordId: string) => {
    if (onUpdateRecordNotes) {
      onUpdateRecordNotes(recordId, noteDraft.trim());
    }
    setEditingNoteId(null);
    setNoteDraft('');
  };

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto border border-teal-100">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-outfit">Riwayat Pemeriksaan Tersimpan</h2>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Silakan masuk atau mendaftar akun pelanggan untuk melihat riwayat pemeriksaan resep pasien di Firebase Cloud.
        </p>
        <button
          onClick={onOpenAuthModal}
          className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors cursor-pointer"
        >
          Masuk Akun
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* HERO BANNER - STANDARDIZED CLINICAL DEEP TEAL GRADIENT */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2f35] via-[#10424a] to-[#18444a] p-6 sm:p-8 text-white shadow-xl border border-teal-500/20">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <History className="w-48 h-48 text-teal-300" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold font-outfit">
              <History className="w-3.5 h-3.5" />
              <span>Cloud Patient Interaction Archive &amp; EMR Logs</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shrink-0">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Riwayat Pemeriksaan Resep &amp; Interaksi
                </h1>
                <p className="text-xs sm:text-sm text-teal-100/80 font-medium">
                  Arsip lengkap rekam jejak telaah resep pasien, cetak lembar telaah klinis, salin format CPPT, dan integrasi WhatsApp.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-teal-200">
                <Layers className="w-3.5 h-3.5 text-[#3dbfd1]" />
                <span>Format Standar CPPT / SIMRS</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cetak Lembar Telaah PDF</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-cyan-200">
                <Smartphone className="w-3.5 h-3.5 text-cyan-300" />
                <span>Integrasi Kartu PIO WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Total Arsip Resep:</span>
              <span className="text-lg font-black text-teal-300 font-mono tabular-nums">{historyRecords.length} Tersimpan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filters, & Actions */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari pasien, obat resep (misal: Levofloxacin, Ondansetron), atau catatan..."
              className="w-full pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Action Buttons: Export CSV & Clear All */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportCsv}
              disabled={filteredRecords.length === 0}
              title="Unduh rekapitulasi riwayat dalam format spreadsheet CSV/Excel"
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-slate-700 rounded-xl text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              <Download className="w-3.5 h-3.5 text-teal-700" />
              <span className="hidden sm:inline">Ekspor CSV</span>
            </button>

            {historyRecords.length > 0 && onClearAllRecords && (
              <button
                onClick={() => setShowClearAllConfirm(true)}
                title="Bersihkan seluruh riwayat pemeriksaan"
                className="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hapus Semua</span>
              </button>
            )}
          </div>

        </div>

        {/* Filter Badges Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#0f766e]" />
              <span>Filter:</span>
            </span>

            {/* Severity Filter Dropdown */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 cursor-pointer focus:outline-none focus:border-teal-600"
            >
              <option value="all">Semua Status Risiko</option>
              <option value="Major">🔴 Risiko Major</option>
              <option value="Moderate">🟡 Risiko Moderate</option>
              <option value="Minor">🔵 Risiko Minor</option>
              <option value="None">🟢 Bebas Interaksi</option>
            </select>

            {/* Time Filter Dropdown */}
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 cursor-pointer focus:outline-none focus:border-teal-600"
            >
              <option value="all">Semua Rentang Waktu</option>
              <option value="today">Hari Ini (24 Jam)</option>
              <option value="7days">7 Hari Terakhir</option>
              <option value="30days">30 Hari Terakhir</option>
            </select>
          </div>

          <p className="text-[11px] font-medium text-slate-500">
            Menampilkan <span className="font-black text-[#0f766e]">{displayedRecords.length}</span> dari <span className="font-black text-slate-900">{filteredRecords.length}</span> resep cocok
          </p>
        </div>
      </div>

      {/* Confirmation Modal for Clear All */}
      {showClearAllConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-base font-extrabold text-slate-900 font-outfit">Hapus Semua Riwayat?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tindakan ini akan menghapus seluruh {historyRecords.length} rekam jejak pemeriksaan resep tersimpan. Data yang dihapus tidak dapat dikembalikan.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowClearAllConfirm(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (onClearAllRecords) onClearAllRecords();
                  setShowClearAllConfirm(false);
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Items List */}
      {displayedRecords.length > 0 ? (
        <div className="space-y-4">
          {displayedRecords.map((record) => {
            const severityClass =
              record.highestSeverity === 'Major'
                ? 'clinical-card-major'
                : record.highestSeverity === 'Moderate'
                ? 'clinical-card-moderate'
                : record.highestSeverity === 'Minor'
                ? 'clinical-card-minor'
                : 'clinical-card-safe';

            const badgeStyle =
              record.highestSeverity === 'Major'
                ? 'clinical-badge-major'
                : record.highestSeverity === 'Moderate'
                ? 'clinical-badge-moderate'
                : record.highestSeverity === 'Minor'
                ? 'clinical-badge-minor'
                : 'clinical-badge-safe';

            const isEditingThisNote = editingNoteId === record.id;
            const isConfirmingDelete = confirmDeleteId === record.id;
            const isCopied = copiedId === record.id;

            return (
              <div
                key={record.id}
                className={`bg-white rounded-2xl p-5 border shadow-xs transition-all space-y-4 hover:shadow-md ${severityClass}`}
              >
                {/* Top Header Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 font-outfit">
                        {record.patientName || 'Pasien Tanpa Nama'}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-medium">
                        ID Sesi: <span className="font-mono">{record.id.slice(-8)}</span>
                      </p>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${badgeStyle}`}>
                      {record.highestSeverity === 'None' ? 'Bebas Interaksi' : `Risiko ${record.highestSeverity}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(record.timestamp).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(record.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                    </div>
                  </div>
                </div>

                {/* Drug List Badges */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <p className="font-bold text-slate-600 flex items-center gap-1.5">
                      <Pill className="w-3.5 h-3.5 text-teal-700" />
                      <span>Daftar Obat Resep ({record.drugs.length}):</span>
                    </p>
                    <span className="text-[11px] font-bold text-slate-500">
                      {record.interactionCount > 0 ? (
                        <span className="text-rose-600 font-extrabold">⚠️ {record.interactionCount} Interaksi Terdeteksi</span>
                      ) : (
                        <span className="text-emerald-700 font-bold">✓ Bebas Konflik</span>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {record.drugs.map((drug, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-800 px-3 py-1 rounded-xl border border-slate-200 transition-colors shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                        <span>{drug}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pharmacist Notes / Recommendation Section */}
                {isEditingThisNote ? (
                  <div className="bg-teal-50/70 p-3 rounded-2xl border border-teal-200 space-y-2 animate-in fade-in duration-150">
                    <label className="text-[11px] font-extrabold text-teal-900 flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-teal-700" />
                      <span>Catatan Klinis / Rekomendasi Apoteker:</span>
                    </label>
                    <textarea
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="Tuliskan rekomendasi apoteker, konfirmasi dokter, jadwal pemisahan jam minum obat, atau hasil pemantauan efek samping..."
                      rows={3}
                      className="w-full text-xs font-medium bg-white border border-teal-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-500"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingNoteId(null);
                          setNoteDraft('');
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => handleSaveNote(record.id)}
                        className="px-4 py-1.5 text-xs font-bold bg-[#0f766e] hover:bg-[#115e59] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
                      >
                        Simpan Catatan
                      </button>
                    </div>
                  </div>
                ) : record.notes ? (
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                      <span className="flex items-center gap-1 text-teal-800 font-extrabold">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Catatan Rekomendasi Apoteker:</span>
                      </span>
                      <button
                        onClick={() => {
                          setEditingNoteId(record.id);
                          setNoteDraft(record.notes || '');
                        }}
                        className="text-teal-700 hover:text-teal-900 underline font-bold cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="italic text-slate-800 font-medium">"{record.notes}"</p>
                  </div>
                ) : null}

                {/* Card Action Bar (EMR & Clinical Workflow Tools) */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  
                  {/* Primary & Secondary Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    
                    {/* 1. Re-check / Open in Interaction Checker */}
                    {onRecheckRecord && (
                      <button
                        onClick={() => onRecheckRecord(record)}
                        className="px-3.5 py-2 bg-[#0f766e] hover:bg-[#115e59] text-white rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-xs hover:scale-105 cursor-pointer"
                        title="Buka kembali seluruh obat resep ini ke modul Cek Interaksi Obat"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Muat ke Skrining</span>
                      </button>
                    )}

                    {/* 2. Print / Export Official PDF Report */}
                    {onPrintReport && (
                      <button
                        onClick={() => onPrintReport(record)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-teal-900 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:scale-105"
                        title="Cetak atau unduh lembar telaah resep resmi format PDF"
                      >
                        <Printer className="w-3.5 h-3.5 text-teal-700" />
                        <span className="hidden sm:inline">Cetak Lembar Telaah</span>
                      </button>
                    )}

                    {/* 3. Copy CPPT / SIMRS Format */}
                    <button
                      onClick={() => handleCopyCppt(record)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border shadow-2xs hover:scale-105 ${
                        isCopied
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                      title="Salin ringkasan telaah resep format CPPT untuk ditempel ke SIMRS / Rekam Medis"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                          <span className="text-emerald-800 font-extrabold">Format CPPT Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-600" />
                          <span>Salin CPPT</span>
                        </>
                      )}
                    </button>

                    {/* 4. Send to WhatsApp PIO */}
                    {onSendWhatsapp && (
                      <button
                        onClick={() => onSendWhatsapp(record)}
                        className="px-3 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:scale-105"
                        title="Kirimkan jadwal minum obat dan peringatan interaksi ke WhatsApp pasien"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Kartu PIO WA</span>
                      </button>
                    )}

                    {/* 5. Add / Edit Note Button */}
                    {!record.notes && !isEditingThisNote && onUpdateRecordNotes && (
                      <button
                        onClick={() => {
                          setEditingNoteId(record.id);
                          setNoteDraft('');
                        }}
                        className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        title="Tambahkan catatan rekomendasi apoteker untuk resep ini"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Beri Catatan</span>
                      </button>
                    )}

                  </div>

                  {/* Delete Button (with inline safety confirmation) */}
                  {onDeleteRecord && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-xl border border-rose-200 animate-in fade-in duration-100">
                          <span className="text-[11px] text-rose-700 font-bold px-1.5">Yakin hapus?</span>
                          <button
                            onClick={() => {
                              onDeleteRecord(record.id);
                              setConfirmDeleteId(null);
                            }}
                            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-extrabold rounded-lg transition-colors cursor-pointer"
                          >
                            Ya
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(record.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                          title="Hapus riwayat resep ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}

                </div>

              </div>
            );
          })}

          {/* Pro Plan Gate if limited */}
          {isLimited && historyRecords.length > 3 && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-amber-950 font-outfit">Arsip Riwayat Dibatasi ({historyRecords.length - 3} Catatan Lain Terkunci)</h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Paket Pemula hanya menampilkan 3 catatan pemeriksaan terakhir. Tingkatkan ke Paket Pro untuk membuka seluruh riwayat tanpa batas, ekspor CSV, dan cetak lembar telaah tak terbatas.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenPricingModal}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs rounded-xl shadow-xs transition-all shrink-0 hover:scale-105 cursor-pointer"
              >
                Upgrade ke Pro
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <History className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-slate-800 font-outfit">
              {historyRecords.length > 0 ? 'Tidak Ada Riwayat yang Cocok' : 'Belum Ada Riwayat Tersimpan'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
              {historyRecords.length > 0
                ? 'Tidak ada catatan resep yang cocok dengan kata kunci pencarian atau filter yang dipilih.'
                : 'Lakukan pemeriksaan resep pada menu Cek Interaksi Obat dan klik "Simpan Riwayat" untuk mengarsipkan rekam telaah di sini.'}
            </p>
          </div>

          {historyRecords.length > 0 && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSeverity('all');
                setSelectedTimeRange('all');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter Pencarian</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
};
