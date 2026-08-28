import React from 'react';
import { InteractionCheckRecord, UserProfile } from '../types';
import { History, Calendar, Lock, Clock } from 'lucide-react';

interface HistoryListProps {
  historyRecords: InteractionCheckRecord[];
  currentUser: UserProfile | null;
  onOpenPricingModal: () => void;
  onOpenAuthModal: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  historyRecords,
  currentUser,
  onOpenPricingModal,
  onOpenAuthModal
}) => {
  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto border border-teal-100">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Riwayat Pemeriksaan Tersimpan</h2>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Silakan masuk atau mendaftar akun pelanggan untuk melihat riwayat pemeriksaan resep pasien di Firebase Cloud.
        </p>
        <button
          onClick={onOpenAuthModal}
          className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors"
        >
          Masuk Akun
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#181126] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-purple-500/20 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none hidden sm:block">
          <History className="w-64 h-64 text-purple-400 -rotate-12" />
        </div>
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
            <History className="w-3.5 h-3.5" />
            <span>Cloud Patient Interaction Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-outfit">
            Riwayat Pemeriksaan <span className="text-purple-400">Resep & Interaksi</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium">
            Catatan pemeriksaan interaksi tersimpan {currentUser?.email ? `di akun ${currentUser.email}` : 'pada sesi lokal'}.
          </p>
        </div>
        <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-purple-500/30 shrink-0 relative z-10">
          {historyRecords.length} Catatan Tersimpan
        </span>
      </div>

      {historyRecords.length > 0 ? (
        <div className="space-y-3">
          {((!currentUser || currentUser.subscriptionPlan === 'Gratis' || currentUser.subscriptionPlan === 'Pemula') ? historyRecords.slice(0, 3) : historyRecords).map((record) => {
            const badgeColor =
              record.highestSeverity === 'Major'
                ? 'bg-red-100 text-red-800 border-red-200'
                : record.highestSeverity === 'Moderate'
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-emerald-100 text-emerald-800 border-emerald-200';

            return (
              <div
                key={record.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5 hover:border-teal-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      {record.patientName || 'Pasien Tanpa Nama'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                      {record.highestSeverity === 'None' ? 'Tidak Ada Interaksi' : `Risiko ${record.highestSeverity}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(record.timestamp).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                    <Clock className="w-3.5 h-3.5 ml-2" />
                    <span>{new Date(record.timestamp).toLocaleTimeString('id-ID', { timeStyle: 'short' })}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Daftar Obat Resep ({record.drugs.length}):</p>
                  <div className="flex flex-wrap gap-1.5">
                    {record.drugs.map((drug, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                        {drug}
                      </span>
                    ))}
                  </div>
                </div>

                {record.notes && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                    "{record.notes}"
                  </p>
                )}
              </div>
            );
          })}

          {(!currentUser || currentUser.subscriptionPlan === 'Gratis' || currentUser.subscriptionPlan === 'Pemula') && historyRecords.length > 3 && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Arsip Riwayat Dibatasi ({historyRecords.length - 3} Catatan Lain Terkunci)</h4>
                  <p className="text-xs text-amber-800">Paket Pemula hanya menampilkan 3 catatan pemeriksaan terakhir. Tingkatkan ke Pro atau Elite untuk akses arsip tak terbatas.</p>
                </div>
              </div>
              <button
                onClick={onOpenPricingModal}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                Upgrade ke Pro
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center space-y-2">
          <History className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Belum ada riwayat tersimpan</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Gunakan menu Cek Interaksi Obat untuk mengecek resep dan klik "Simpan Cloud".
          </p>
        </div>
      )}

    </div>
  );
};
