import React, { useState } from 'react';
import { UserProfile, Drug, DrugInteraction, InteractionCheckRecord } from '../types';
import { 
  ShieldAlert, 
  Pill, 
  History, 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  FileSpreadsheet, 
  AlertTriangle, 
  ChevronRight, 
  Database, 
  Building2, 
  BookOpen,
  Stethoscope,
  Calculator,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';

interface DashboardProps {
  currentUser: UserProfile | null;
  drugs: Drug[];
  interactions: DrugInteraction[];
  historyRecords?: InteractionCheckRecord[];
  onSelectTab: (tab: string) => void;
  onSearchDrug?: (query: string) => void;
  onCheckInteractionWith?: (drugName: string) => void;
  onOpenPricingModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  drugs = [],
  interactions = [],
  historyRecords = [],
  onSelectTab,
  onSearchDrug,
  onCheckInteractionWith,
  onOpenPricingModal
}) => {
  const [quickSearch, setQuickSearch] = useState('');

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      if (onSearchDrug) onSearchDrug(quickSearch);
      onSelectTab('drugs');
    }
  };

  const highRiskPairs = [
    { drugA: 'Warfarin', drugB: 'Aspirin', severity: 'Major', outcome: 'Sinergis Antikoagulan & Risiko Pendarahan Masif' },
    { drugA: 'Clopidogrel', drugB: 'Omeprazole', severity: 'Major', outcome: 'Penurunan Konversi Bioaktif Antiplatelet (CYP2C19)' },
    { drugA: 'Simvastatin', drugB: 'Ketoconazole', severity: 'Major', outcome: 'Inhibisi CYP3A4 & Toksisitas Rhabdomyolysis' },
    { drugA: 'Digoxin', drugB: 'Amiodarone', severity: 'Major', outcome: 'Peningkatan Kadar Digoxin Plasma (P-gp Inhibisi)' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome & User Status Banner - Deep Dark Teal Clinical */}
      <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-[#143d47] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Ruang Kerja Klinis Apoteker & Dokter</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Selamat Datang, <span className="text-teal-300">{currentUser ? currentUser.name : 'Apoteker / Dokter'}</span>
          </h1>
          
          <p className="text-teal-100/80 text-xs sm:text-sm font-medium leading-relaxed">
            Akses komprehensif database informasi obat resmi, penapisan polifarmasi resep, kalkulator dosis ginjal & pediatrik, serta pedoman klinis terpercaya.
          </p>
        </div>

        {/* User Badge & Subscription Quick Status */}
        <div className="bg-[#06181c]/90 p-5 rounded-2xl border border-[#14424e] flex flex-col justify-center space-y-2.5 shrink-0 min-w-[260px] shadow-lg relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-teal-200/70 font-semibold">Status Lisensi:</span>
            <span className="bg-teal-500/20 text-teal-300 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-teal-500/40 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-teal-300" />
              {currentUser?.subscriptionStatus === 'active' ? 'Aktif' : 'Trial / Dasar'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#14424e]">
            <span className="text-xs text-slate-300 font-bold">Paket Langganan:</span>
            <span className="text-sm font-black text-teal-300">{currentUser?.subscriptionPlan || 'Pemula'}</span>
          </div>

          <button
            onClick={onOpenPricingModal}
            className="w-full mt-2 py-2 px-3 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md border border-teal-400/30 cursor-pointer hover:scale-[1.02]"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Kelola Paket Langganan</span>
          </button>
        </div>
      </div>

      {/* Metrics Row with Darker Teal Themes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1.5 hover:border-teal-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">Monografi Obat</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#082a24]">{drugs.length}</p>
          <p className="text-[11px] text-slate-500 font-medium">Sediaan & Brand Indonesia</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1.5 hover:border-teal-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">Pasangan Interaksi</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#082a24]">{interactions.length}</p>
          <p className="text-[11px] text-slate-500 font-medium">Tervalidasi Sistem DDInter</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1.5 hover:border-teal-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">Riwayat Resep</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <History className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#082a24]">{historyRecords.length}</p>
          <p className="text-[11px] text-slate-500 font-medium">Pemeriksaan Tersimpan</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1.5 hover:border-teal-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">Firebase Cloud</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-700">Terhubung</p>
          <p className="text-[11px] text-slate-500 font-medium">Sinkronisasi Real-Time v12</p>
        </div>
      </div>

      {/* Main Workspace (Full Width) */}
      <div className="space-y-6">
        
        {/* Main Action Block 1: Cek Interaksi Obat */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0a3840]/10 rounded-xl flex items-center justify-center text-[#0f766e] border border-[#0f766e]/20 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#082a24]">Pemeriksa Interaksi Multi-Obat</h2>
                <p className="text-xs text-slate-500 font-medium">Mesin analisis klinis untuk skrining potensi interaksi berbahaya</p>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('interactions')}
              className="px-5 py-2.5 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer hover:scale-[1.02] shrink-0"
            >
              <span>Buka Cek Interaksi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick High Risk Test Pair Shortcut */}
          <div className="space-y-3">
            <p className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Pilihan Pasangan Interaksi Kritis (Uji Cepat 1-Klik):</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {highRiskPairs.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (onCheckInteractionWith) onCheckInteractionWith(`${pair.drugA}, ${pair.drugB}`);
                  }}
                  className="p-3.5 bg-slate-50 hover:bg-teal-50/60 rounded-xl border border-slate-200 hover:border-teal-400 text-left transition-all group space-y-1.5 cursor-pointer hover:shadow-xs hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 group-hover:text-teal-800 truncate pr-1">
                      {pair.drugA} + {pair.drugB}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-700 text-white shrink-0">
                      {pair.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1 font-medium">{pair.outcome}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Action Block 2: Quick Search Drug Directory */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-700 border border-teal-200 shrink-0">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#082a24]">Informasi & Monografi Obat</h2>
                <p className="text-xs text-slate-500 font-medium">Pencarian cepat farmakologi, indikasi, dan efek samping</p>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('drugs')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleQuickSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Ketik nama obat (contoh: Atorvastatin, Ciprofloxacin, Metformin)..."
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0a3840] hover:bg-[#0f4d58] text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
            >
              Cari Monografi
            </button>
          </form>
        </div>

        {/* Recent History Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-teal-700" />
              <h3 className="font-extrabold text-[#082a24] text-sm">Riwayat Pemeriksaan Resep Terbaru</h3>
            </div>
            <button
              onClick={() => onSelectTab('history')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Riwayat Lengkap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {historyRecords.length === 0 ? (
            <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
              <Clock className="w-6 h-6 text-slate-400 mx-auto" />
              <p className="text-xs font-medium text-slate-600">Belum ada riwayat pemeriksaan disimpan hari ini.</p>
              <button
                onClick={() => onSelectTab('interactions')}
                className="px-4 py-2 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Mulai Cek Resep
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {historyRecords.slice(0, 6).map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs hover:bg-teal-50/40 transition-colors"
                >
                  <div className="space-y-1 pr-2 min-w-0">
                    <div className="flex items-center gap-2 font-black text-slate-900 truncate">
                      <span>{rec.drugs.join(' + ')}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {new Date(rec.timestamp).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <div className="text-right space-y-1 shrink-0">
                    <span className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      rec.highestSeverity === 'Major'
                        ? 'bg-rose-700 text-white'
                        : rec.highestSeverity === 'Moderate'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-emerald-700 text-white'
                    }`}>
                      {rec.highestSeverity} ({rec.interactionCount} Interaksi)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
