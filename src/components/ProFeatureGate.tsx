import React from 'react';
import { Lock, Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ProFeatureGateProps {
  featureTitle: string;
  featureDescription: string;
  onOpenPricingModal: () => void;
  onOpenAuthModal?: () => void;
  isLoggedIn?: boolean;
}

export const ProFeatureGate: React.FC<ProFeatureGateProps> = ({
  featureTitle,
  featureDescription,
  onOpenPricingModal,
  onOpenAuthModal,
  isLoggedIn = false
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#071c21] rounded-3xl border-2 border-amber-400/60 dark:border-amber-500/40 shadow-2xl p-6 sm:p-10 text-center relative overflow-hidden space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Lock & Promo Badge */}
        <div className="relative z-10 flex flex-col items-center space-y-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/30">
            <Lock className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 text-xs font-black border border-amber-300 dark:border-amber-800">
            <Sparkles className="w-3.5 h-3.5 fill-amber-900 dark:fill-amber-300" />
            <span>Fitur Khusus Paket Pro (Akses Penuh)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Buka Akses {featureTitle}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
            {featureDescription}
          </p>
        </div>

        {/* Promo Price Box */}
        <div className="relative z-10 max-w-md mx-auto p-4 rounded-2xl bg-gradient-to-r from-teal-50/80 via-emerald-50/80 to-teal-50/80 dark:from-teal-950/40 dark:via-emerald-950/40 dark:to-teal-950/40 border border-teal-300 dark:border-teal-700/60 shadow-xs space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs line-through text-slate-400 font-bold decoration-rose-500 decoration-2">
              Rp 999.000 / tahun
            </span>
            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.2 rounded-full shadow-2xs">
              Hemat 80%
            </span>
          </div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-black text-teal-800 dark:text-teal-200">
              Rp 199.000
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              / tahun
            </span>
          </div>
          <p className="text-[11px] text-teal-700 dark:text-teal-300 font-bold">
            Hanya ~Rp 16.500 / bulan (Aktif 365 Hari Penuh)
          </p>
        </div>

        {/* Feature Comparison Box */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto text-xs">
          
          {/* Paket Pemula Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#06191c] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-slate-800 dark:text-white">Paket Pemula (Gratis)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Aktif</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 font-medium">
              <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Pencarian Monografi Obat Seluruhnya</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Cek Interaksi Obat Tanpa Batas</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Panduan Cara Pakai & Edukasi Pasien</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400 line-through">
                <Lock className="w-3 h-3 shrink-0" />
                <span>Kalkulator Dosis & PNPK Kemenkes</span>
              </li>
            </ul>
          </div>

          {/* Paket Pro Card */}
          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border-2 border-teal-500/60 dark:border-teal-600/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-teal-900 dark:text-teal-200">Paket Pro (Akses Penuh)</span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-400 text-slate-950">Rekomendasi</span>
            </div>
            <ul className="space-y-1.5 text-teal-950 dark:text-teal-100 font-medium">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Semua Fitur Paket Pemula</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Panduan Terapi PNPK & Konsensus RI</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Kalkulator Dosis Ginjal (CrCl & eGFR)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Cetak Laporan PDF Pasien & Kop Surat</span>
              </li>
            </ul>
          </div>

        </div>

        {/* CTA Buttons */}
        <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenPricingModal}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-amber-400/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Ambil Promo Pro Rp 199rb / Tahun</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isLoggedIn && onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
            >
              Sudah Punya Akun? Masuk
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
