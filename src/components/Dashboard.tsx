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
  AlertTriangle, 
  ChevronRight, 
  ShieldCheck,
  Activity,
  HeartPulse,
  Baby,
  Syringe,
  MessageSquare,
  Calculator, 
  Zap, 
  Stethoscope,
  BookMarked,
  GraduationCap
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

  const quickModules = [
    { id: 'competency', title: 'Pusat Belajar Uji Kompetensi', desc: 'UKMPPAI CBT, OSCE, Rangkuman 4 Domain & Kalkulator', icon: GraduationCap, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60' },
    { id: 'interactions', title: 'Cek Interaksi Obat', desc: 'Analisis DDI tervalidasi Drugs.com & DDInter', icon: ShieldAlert, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60' },
    { id: 'side-effects', title: 'Cek Efek Samping & Toksisitas', desc: 'Beban toksisitas organ, pelacak gejala & Naranjo', icon: Activity, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60' },
    { id: 'whatsapp-pio', title: 'Kartu PIO WhatsApp', desc: 'Kirim etiket & edukasi 1-klik ke pasien', icon: MessageSquare, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60' },
    { id: 'pediatric', title: 'Dosis Pediatrik & Puyer', desc: 'Kalkulator BB/BSA & racikan puyer anak', icon: Baby, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60' },
    { id: 'iv-compatibility', title: 'Kompatibilitas Injeksi IV', desc: 'Skrining Y-Site & kompatibilitas pelarut ICU', icon: Syringe, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/60' },
    { id: 'literature', title: 'Literatur & Basis Ilmiah', desc: '8+ Sumber PNPK Kemenkes, ASHP & DDInter', icon: BookMarked, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800/60' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome & User Status Banner - Modern Deep Sapphire Obsidian */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#0d1f2d] to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute right-72 -bottom-10 opacity-10 pointer-events-none hidden lg:block">
          <Stethoscope className="w-56 h-56 text-teal-400 -rotate-12" />
        </div>
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Ruang Kerja Klinis Apoteker & Dokter</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Selamat Datang, <span className="text-teal-300">{currentUser ? currentUser.name : 'Apoteker / Dokter'}</span>
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
            Platform integrasi klinis informasi obat resmi BPOM & MIMS, penapisan polifarmasi resep, kalkulator dosis ginjal & pediatrik, serta pedoman terapi terpercaya.
          </p>
        </div>

        {/* User Badge & Subscription Quick Status */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-2.5 shrink-0 min-w-[260px] shadow-lg relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Status Lisensi:</span>
            <span className="bg-teal-500/20 text-teal-300 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-teal-500/40 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-teal-300" />
              {currentUser?.subscriptionStatus === 'active' ? 'Aktif' : 'Trial / Dasar'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-300 font-bold">Paket Layanan:</span>
            <span className="text-sm font-black text-teal-300">{currentUser?.subscriptionPlan || 'Pemula'}</span>
          </div>

          <button
            onClick={onOpenPricingModal}
            className="w-full mt-2 py-2 px-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer hover:scale-[1.02]"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Kelola Paket Langganan</span>
          </button>
        </div>
      </div>

      {/* Metrics Row - Vibrant Multi-Color Semantic Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Monografi Obat (Blue / Sapphire) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5 hover:border-blue-400 dark:hover:border-blue-500 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Monografi Obat</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{drugs.length}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Obat Unik Terdaftar (BPOM & MIMS)</p>
        </div>

        {/* Metric 2: Pasangan Interaksi (Amber / Gold) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5 hover:border-amber-400 dark:hover:border-amber-500 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Pasangan Interaksi</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{interactions.length}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Tervalidasi Drugs.com & DDInter</p>
        </div>

        {/* Metric 3: Riwayat Resep (Indigo / Purple) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5 hover:border-purple-400 dark:hover:border-purple-500 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Riwayat Resep</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <History className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{historyRecords.length}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Pemeriksaan Tersimpan</p>
        </div>

        {/* Metric 4: Firebase Cloud (Emerald) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Database Engine</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Terhubung</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Sinkronisasi Real-Time v12</p>
        </div>
      </div>

      {/* Quick Access Modules Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Akses Cepat Modul Klinis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => onSelectTab(mod.id)}
                className={`p-4 rounded-2xl border ${mod.bg} text-left transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer space-y-2 group`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl bg-white dark:bg-slate-900 shadow-2xs ${mod.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">{mod.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-0.5">{mod.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace (Full Width) */}
      <div className="space-y-6">
        
        {/* Main Action Block 1: Cek Interaksi Obat */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950/60 rounded-xl flex items-center justify-center text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-white">Pemeriksa Interaksi Multi-Obat</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Mesin analisis klinis untuk skrining potensi interaksi berbahaya</p>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('interactions')}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer hover:scale-[1.02] shrink-0"
            >
              <span>Buka Cek Interaksi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick High Risk Test Pair Shortcut */}
          <div className="space-y-3">
            <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
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
                  className="p-3.5 bg-slate-50 dark:bg-slate-950 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-700 text-left transition-all group space-y-1.5 cursor-pointer hover:shadow-xs hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 truncate pr-1">
                      {pair.drugA} + {pair.drugB}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-600 text-white shrink-0">
                      {pair.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">{pair.outcome}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Action Block 2: Quick Search Drug Directory */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/60 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shrink-0">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-white">Informasi & Monografi Obat</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pencarian cepat farmakologi, indikasi, dan efek samping</p>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('drugs')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
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
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
            >
              Cari Monografi
            </button>
          </form>
        </div>

        {/* Recent History Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Riwayat Pemeriksaan Resep Terbaru</h3>
            </div>
            <button
              onClick={() => onSelectTab('history')}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Riwayat Lengkap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {historyRecords.length === 0 ? (
            <div className="p-6 text-center bg-slate-50 dark:bg-slate-950 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 space-y-2">
              <Clock className="w-6 h-6 text-slate-400 mx-auto" />
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Belum ada riwayat pemeriksaan disimpan hari ini.</p>
              <button
                onClick={() => onSelectTab('interactions')}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Mulai Cek Resep
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {historyRecords.slice(0, 6).map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1 pr-2 min-w-0">
                    <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white truncate">
                      <span>{rec.drugs.join(' + ')}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
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
                        ? 'bg-rose-600 text-white'
                        : rec.highestSeverity === 'Moderate'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-emerald-600 text-white'
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
