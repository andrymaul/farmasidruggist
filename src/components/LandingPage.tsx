import React, { useState } from 'react';
import { PRICING_PLANS, PRICING_FEATURE_COMPARISON, PRICING_FAQS, INITIAL_INTERACTIONS } from '../data/ddinterData';
import { Drug, DrugInteraction, UserProfile, PricingPlan } from '../types';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Database, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Star, 
  Check, 
  HelpCircle, 
  XCircle, 
  CheckCircle,
  Activity,
  Stethoscope,
  Calculator,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface LandingPageProps {
  drugs: Drug[];
  interactions?: DrugInteraction[];
  currentUser?: UserProfile | null;
  pricingPlans?: PricingPlan[];
  onSelectTab: (tab: string) => void;
  onSearchDrug?: (query: string) => void;
  onOpenPricingModal: () => void;
  onOpenAuthModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  drugs,
  pricingPlans = PRICING_PLANS,
  onSelectTab,
  onSearchDrug,
  onOpenPricingModal,
  onOpenAuthModal
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const activePlans = pricingPlans && pricingPlans.length > 0 ? pricingPlans : PRICING_PLANS;

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      if (onSearchDrug) onSearchDrug(heroSearch);
      onSelectTab('drugs');
    }
  };

  return (
    <div className="space-y-16 pb-20 bg-[#f4f8f8] dark:bg-[#051418] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Hero Section - Deep Dark Teal Clinical Atmosphere */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071c21] via-[#092931] to-[#0c3742] text-white pt-16 pb-20 border-b border-[#143d47]">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Dark Teal Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e444f] border border-teal-400/40 text-teal-300 text-xs font-black shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Database Interaksi Obat Klinis & Sinkronisasi Cloud Real-Time</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Informasi Obat & <span className="text-teal-300 underline decoration-teal-500 decoration-4 underline-offset-8">Interaksi Klinis</span> Terpercaya
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-teal-100/90 font-medium leading-relaxed">
              <strong>FARMASIDRUGGIST</strong> menyajikan data obat komprehensif, brand obat Indonesia, penapisan polifarmasi, dan kalkulator klinis untuk Apoteker, Dokter & Tenaga Kesehatan.
            </p>

            {/* Hero Search Box */}
            <form onSubmit={handleHeroSearchSubmit} className="pt-2 max-w-2xl mx-auto">
              <div className="flex items-center bg-[#071a1e] rounded-2xl shadow-xl border-2 border-teal-500/60 p-2 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-400/20 transition-all">
                <Search className="w-5 h-5 text-teal-400 ml-2 shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Cari nama obat (contoh: Warfarin, Simvastatin, Clopidogrel)..."
                  className="w-full px-3 py-2 text-white placeholder-teal-300/60 font-semibold text-sm focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-sm rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border border-teal-400/30 hover:scale-[1.02]"
                >
                  <span>Cari</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5 text-xs text-teal-200/80">
                <span className="font-bold text-teal-300">Contoh populer:</span>
                {['Warfarin', 'Aspirin', 'Simvastatin', 'Clopidogrel', 'Omeprazole'].map((sample, idx) => {
                  const colors = [
                    'bg-[#0a3840] text-teal-200 border-teal-600/60 hover:bg-[#0f4d58]',
                    'bg-[#0a3840] text-cyan-200 border-cyan-600/60 hover:bg-[#0f4d58]',
                    'bg-[#0a3840] text-emerald-200 border-emerald-600/60 hover:bg-[#0f4d58]',
                    'bg-[#0a3840] text-amber-200 border-amber-600/60 hover:bg-[#0f4d58]',
                    'bg-[#0a3840] text-rose-200 border-rose-600/60 hover:bg-[#0f4d58]'
                  ];
                  return (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => {
                        if (onSearchDrug) onSearchDrug(sample);
                        onSelectTab('drugs');
                      }}
                      className={`${colors[idx % colors.length]} border px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer hover:scale-105`}
                    >
                      {sample}
                    </button>
                  );
                })}
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={onOpenAuthModal}
                className="px-6 py-3.5 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold rounded-xl shadow-lg border border-teal-400/40 transition-all flex items-center gap-2 text-sm cursor-pointer hover:scale-[1.02]"
              >
                <ShieldCheck className="w-4 h-4 text-teal-300" />
                Masuk / Daftar Akun
              </button>

              <button
                onClick={onOpenPricingModal}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm cursor-pointer hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                Lihat Paket Langganan
              </button>
            </div>

            {/* Stat Counters with Deep Dark Teal & Harmonious Accents */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-[#143d47]/80">
              <div className="p-4 bg-[#08262d] border border-[#144754] rounded-2xl text-left shadow-md">
                <p className="text-2xl font-black text-teal-300 font-outfit">{drugs.length > 0 ? `${drugs.length}` : '80+'}</p>
                <p className="text-xs text-teal-100 font-extrabold mt-0.5">Monografi Obat Valid</p>
              </div>
              <div className="p-4 bg-[#08262d] border border-[#144754] rounded-2xl text-left shadow-md">
                <p className="text-2xl font-black text-cyan-300 font-outfit">{INITIAL_INTERACTIONS.length > 0 ? `${INITIAL_INTERACTIONS.length}` : '25+'}</p>
                <p className="text-xs text-cyan-100 font-extrabold mt-0.5">Interaksi Pasangan Valid</p>
              </div>
              <div className="p-4 bg-[#08262d] border border-[#144754] rounded-2xl text-left shadow-md">
                <p className="text-2xl font-black text-indigo-300 font-outfit">100%</p>
                <p className="text-xs text-indigo-100 font-extrabold mt-0.5">Standar Klinis Teruji</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a3840]/10 text-[#0f5c53] text-xs font-extrabold border border-[#0f5c53]/20">
              <Database className="w-3.5 h-3.5" />
              <span>Database Informasi & Interaksi Obat</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082a24]">
              Apa itu <span className="text-[#0f766e]">FARMASIDRUGGIST</span>?
            </h2>

            <p className="text-slate-700 text-sm leading-relaxed">
              <strong>FARMASIDRUGGIST</strong> mengintegrasikan data dari 
              <span className="text-[#0f766e] font-bold"> Database Evaluasi Obat Terpadu</span>, repositori terpercaya untuk evaluasi risiko terapi obat, manajemen polifarmasi, dan informasi penggunaan obat khusus.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Tingkat Keparahan (Severity Matrix)</h3>
                  <p className="text-xs text-slate-600">Major (Kritis), Moderate (Signifikan), dan Minor (Pemantauan Rutin).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Mekanisme Farmakologi & Interaksi DFI</h3>
                  <p className="text-xs text-slate-600">Inhibisi CYP450, klirens ginjal, efek sinergis, dan interaksi obat-makanan.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Rekomendasi Klinis Manajemen</h3>
                  <p className="text-xs text-slate-600">Saran penyesuaian dosis, jeda pemberian obat, atau alternatif terapi aman.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-6 border border-teal-900/10 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-[#082a24] text-sm flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Pratinjau Hasil Penapisan Interaksi
                </h3>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 border border-teal-300">
                  Data Terverifikasi
                </span>
              </div>

              {/* Major High-Risk Alert Box */}
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-950">Simvastatin + Gemfibrozil</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-700 text-white">MAJOR</span>
                </div>
                <p className="text-xs text-rose-900">
                  Risiko rhabdomyolysis & miopati meningkat secara signifikan akibat inhibisi metabolisme CYP3A4.
                </p>
              </div>

              {/* Moderate Alert Box */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950">Warfarin + Aspirin</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black">MODERATE</span>
                </div>
                <p className="text-xs text-amber-900">
                  Peningkatan risiko pendarahan gastrointestinal. Pemantauan nilai INR dan efek antiplatelet sangat disarankan.
                </p>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => onSelectTab('interactions')}
                  className="w-full py-3 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01]"
                >
                  Uji Cek Interaksi Obat Sekarang
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 text-xs font-black border border-amber-300 dark:border-amber-800">
            <Sparkles className="w-3.5 h-3.5 fill-amber-900 dark:fill-amber-300" />
            <span>Paket Langganan Tahunan Hemat (1 Tahun Akses)</span>
          </div>

          <h2 className="text-3xl font-extrabold text-[#082a24] dark:text-white">
            Tarif & Lisensi Layanan FARMASIDRUGGIST
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            Paket lisensi tahunan terjangkau untuk mahasiswa, apoteker praktik mandiri, hingga institusi klinik & apotek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
          {activePlans.map((plan) => {
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`bg-white dark:bg-[#071c21] rounded-3xl p-6 sm:p-8 border flex flex-col justify-between relative transition-all ${
                  isPopular 
                    ? 'border-teal-500 ring-2 ring-teal-500/40 shadow-2xl scale-[1.02]' 
                    : 'border-slate-200/90 dark:border-teal-500/20 shadow-md hover:border-teal-300'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-[11px] font-black rounded-full uppercase tracking-wider shadow-md bg-amber-400 text-slate-950">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-[#082a24] dark:text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px] font-medium leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="border-y border-slate-100 dark:border-slate-800 py-4">
                    {plan.originalPriceFormatted && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs line-through text-slate-400 font-bold decoration-rose-500 decoration-2">
                          {plan.originalPriceFormatted} / tahun
                        </span>
                        {plan.discountBadge && (
                          <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.2 rounded-full shadow-2xs">
                            {plan.discountBadge}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      {plan.priceValue > 0 && <span className="text-sm font-bold text-slate-500">Rp</span>}
                      <span className="text-4xl font-black text-[#082a24] dark:text-white">
                        {plan.priceValue === 0 ? 'Gratis' : plan.priceValue.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {plan.priceValue === 0 ? 'Selamanya' : '/tahun'}
                      </span>
                    </div>
                    {plan.priceValue > 0 && (
                      <p className="text-xs text-teal-600 dark:text-teal-400 font-black mt-1">
                        Hanya ~Rp 16.500 / bulan (Hemat Rp 800.000!)
                      </p>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={onOpenPricingModal}
                    className={`w-full py-4 rounded-2xl font-black text-xs transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md hover:scale-[1.02]'
                        : 'bg-[#0f766e] hover:bg-[#115e59] text-white shadow-sm hover:scale-[1.01]'
                    }`}
                  >
                    {plan.priceValue === 0 ? 'Mulai Akses Pemula Gratis' : `Ambil Promo Paket Pro Rp 199rb / Tahun`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-[#082a24]">Pertanyaan Sering Diajukan (FAQ)</h2>
          <p className="text-xs text-slate-500 font-medium">Informasi seputar lisensi, fitur, dan integrasi Firebase</p>
        </div>

        <div className="space-y-3">
          {PRICING_FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs space-y-1">
              <h3 className="text-sm font-bold text-[#082a24] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#0f766e] shrink-0" />
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
