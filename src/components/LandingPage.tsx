import React, { useState, useMemo } from 'react';
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
  Zap,
  BookMarked,
  Plus,
  X,
  RotateCcw,
  Pill,
  AlertTriangle,
  Trash2
} from 'lucide-react';
import { resolveDrugFromDDInter, resolveInteractionPair } from '../utils/ddinterEngine';

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
  interactions = INITIAL_INTERACTIONS,
  pricingPlans = PRICING_PLANS,
  onSelectTab,
  onSearchDrug,
  onOpenPricingModal,
  onOpenAuthModal
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Interactive Drug Interaction Checker State (No Login Required)
  const [interactiveSelectedDrugs, setInteractiveSelectedDrugs] = useState<Drug[]>(() => {
    const d1 = drugs.find(d => d.name.toLowerCase() === 'simvastatin') || drugs[0];
    const d2 = drugs.find(d => d.name.toLowerCase() === 'gemfibrozil') || drugs[1];
    return [d1, d2].filter(Boolean) as Drug[];
  });
  const [interactiveSearchInput, setInteractiveSearchInput] = useState('');

  const demoPresets = [
    { label: 'Simvastatin + Gemfibrozil', drugs: ['Simvastatin', 'Gemfibrozil'] },
    { label: 'Warfarin + Aspirin', drugs: ['Warfarin', 'Aspirin'] },
    { label: 'Clopidogrel + Omeprazole', drugs: ['Clopidogrel', 'Omeprazole'] },
    { label: 'Ciprofloxacin + Antasida', drugs: ['Ciprofloxacin', 'Antasida'] },
    { label: 'Digoxin + Amiodarone', drugs: ['Digoxin', 'Amiodarone'] }
  ];

  const handleApplyPreset = (presetDrugNames: string[]) => {
    const resolvedList: Drug[] = [];
    presetDrugNames.forEach(name => {
      const found = resolveDrugFromDDInter(name, drugs);
      if (found && !resolvedList.some(d => d.id === found.id)) {
        resolvedList.push(found);
      }
    });
    setInteractiveSelectedDrugs(resolvedList);
    setInteractiveSearchInput('');
  };

  const handleAddInteractiveDrug = (drugToAdd: Drug) => {
    if (!interactiveSelectedDrugs.some(d => d.id === drugToAdd.id || d.name.toLowerCase() === drugToAdd.name.toLowerCase())) {
      setInteractiveSelectedDrugs(prev => [...prev, drugToAdd]);
    }
    setInteractiveSearchInput('');
  };

  const handleRemoveInteractiveDrug = (id: string) => {
    setInteractiveSelectedDrugs(prev => prev.filter(d => d.id !== id));
  };

  const interactiveSearchResults = interactiveSearchInput.trim()
    ? drugs.filter(
        (d) =>
          (d.name.toLowerCase().includes(interactiveSearchInput.toLowerCase().trim()) ||
           d.genericName.toLowerCase().includes(interactiveSearchInput.toLowerCase().trim()) ||
           d.brandNames?.some((b) => b.toLowerCase().includes(interactiveSearchInput.toLowerCase().trim()))) &&
          !interactiveSelectedDrugs.some(selected => selected.id === d.id)
      ).slice(0, 6)
    : [];

  const interactiveMatchedInteractions: DrugInteraction[] = useMemo(() => {
    const list: DrugInteraction[] = [];
    for (let i = 0; i < interactiveSelectedDrugs.length; i++) {
      for (let j = i + 1; j < interactiveSelectedDrugs.length; j++) {
        const drugA = interactiveSelectedDrugs[i];
        const drugB = interactiveSelectedDrugs[j];
        const found = resolveInteractionPair(drugA, drugB, interactions || INITIAL_INTERACTIONS);
        if (found) {
          list.push(found);
        }
      }
    }
    return list;
  }, [interactiveSelectedDrugs, interactions]);

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
            <div className="bg-white dark:bg-[#0c191d] rounded-3xl p-5 sm:p-6 border border-teal-800/20 dark:border-teal-500/20 shadow-xl space-y-4 transition-all">
              {/* Header with Live Indicator */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="font-black text-[#082a24] dark:text-emerald-300 text-sm sm:text-base flex items-center gap-2 font-outfit">
                    <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
                    <span>Uji Cek Interaksi Obat Interaktif</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Bebas uji kombinasi obat secara real-time tanpa perlu login
                  </p>
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Live Testing
                </span>
              </div>

              {/* Quick Case Presets */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 font-outfit">
                  <span>⚡ Coba Kasus Cepat:</span>
                  {interactiveSelectedDrugs.length > 0 && (
                    <button
                      onClick={() => setInteractiveSelectedDrugs([])}
                      className="text-rose-600 hover:text-rose-700 dark:text-rose-400 text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      Reset Obat
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {demoPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleApplyPreset(preset.drugs)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-teal-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-teal-800 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Drug Search Autocomplete */}
              <div className="relative">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={interactiveSearchInput}
                    onChange={(e) => setInteractiveSearchInput(e.target.value)}
                    placeholder="Ketik nama obat untuk ditambah (mis: Warfarin, Amlodipin)..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>

                {/* Autocomplete Dropdown */}
                {interactiveSearchResults.length > 0 && (
                  <div className="absolute z-30 left-0 right-0 mt-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                    {interactiveSearchResults.map((drug) => (
                      <button
                        key={drug.id}
                        type="button"
                        onClick={() => handleAddInteractiveDrug(drug)}
                        className="w-full px-3 py-2 text-left hover:bg-teal-50 dark:hover:bg-teal-950/50 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 last:border-0 cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">{drug.name}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">{drug.genericName} • {drug.category}</div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Tambah
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Drug Chips */}
              <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black font-outfit">Obat Diuji:</span>
                {interactiveSelectedDrugs.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Belum ada obat yang dipilih</span>
                ) : (
                  interactiveSelectedDrugs.map((drug) => (
                    <span
                      key={drug.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 border border-teal-300 dark:border-teal-700 shadow-2xs font-outfit"
                    >
                      <Pill className="w-3 h-3 text-teal-600" />
                      {drug.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveInteractiveDrug(drug.id)}
                        className="hover:bg-teal-200 dark:hover:bg-teal-800 rounded-full p-0.5 transition cursor-pointer"
                        title={`Hapus ${drug.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Dynamic Interaction Results Box */}
              <div className="space-y-2 pt-1">
                {interactiveSelectedDrugs.length >= 2 ? (
                  interactiveMatchedInteractions.length > 0 ? (
                    interactiveMatchedInteractions.map((item, idx) => {
                      const isMajor = item.severity === 'Major';
                      const isMod = item.severity === 'Moderate';
                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-2xl border space-y-1.5 transition-all text-left ${
                            isMajor
                              ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80 text-rose-950 dark:text-rose-200'
                              : isMod
                              ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80 text-amber-950 dark:text-amber-200'
                              : 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/80 text-blue-950 dark:text-blue-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black font-outfit tracking-wide">
                              {item.drugAName} + {item.drugBName}
                            </span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded font-outfit ${
                              isMajor
                                ? 'bg-rose-700 text-white shadow-xs'
                                : isMod
                                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                                : 'bg-blue-600 text-white shadow-xs'
                            }`}>
                              {item.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed font-medium">
                            {item.clinicalOutcome || item.mechanism}
                          </p>
                          {item.management && (
                            <div className="text-[11px] pt-1 border-t border-black/5 dark:border-white/10 opacity-90">
                              <strong>Saran Klinis:</strong> {item.management}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-200 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Tidak Ditemukan Interaksi Berbahaya Signifikan</span>
                      </div>
                      <p className="text-[11px] text-emerald-800/90 dark:text-emerald-300/90">
                        Kombinasi <strong>{interactiveSelectedDrugs.map(d => d.name).join(' + ')}</strong> relatif aman digunakan bersamaan berdasarkan data DDInter & Drugs.com.
                      </p>
                    </div>
                  )
                ) : interactiveSelectedDrugs.length === 1 ? (
                  <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Pilih minimal 1 obat lagi di kolom pencarian atau klik tombol <em>Contoh Cepat</em> di atas untuk melihat analisis interaksi.</span>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs text-center">
                    Ketik nama obat atau klik salah satu <strong>Contoh Kasus Cepat</strong> untuk memulai pengujian interaksi.
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 text-center">
                <button
                  onClick={() => onSelectTab('interactions')}
                  className="w-full py-3 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Buka Analisis Interaksi Lengkap (Multi-Obat & PDF Pasien)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Evidence-Based Medicine & Literature Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#071c21] via-[#092931] to-[#0c3742] text-white p-8 sm:p-10 border border-teal-500/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
              <BookMarked className="w-3.5 h-3.5 text-teal-400" />
              <span>Transparansi & Akurasi 100% Evidence-Based Medicine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
              Divalidasi dari Pedoman Resmi Kemenkes RI & Standar Global
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed">
              Kami menyajikan data yang dapat dipertanggungjawabkan: <strong>PNPK Kemenkes RI</strong>, konsensus PERKI & PERKENI, <strong>DDInter Database (Nature npj)</strong>, standar inkompatibilitas <strong>Trissel's™ 2024 / ASHP</strong>, serta regulasi Permenkes No. 73/2016.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-bold text-teal-200">
              <span className="bg-[#0b333c] px-3 py-1 rounded-lg border border-teal-600/40">✓ PNPK Kemenkes</span>
              <span className="bg-[#0b333c] px-3 py-1 rounded-lg border border-teal-600/40">✓ ASHP Trissel's IV</span>
              <span className="bg-[#0b333c] px-3 py-1 rounded-lg border border-teal-600/40">✓ DDInter Database</span>
              <span className="bg-[#0b333c] px-3 py-1 rounded-lg border border-teal-600/40">✓ CekBPOM RI</span>
              <span className="bg-[#0b333c] px-3 py-1 rounded-lg border border-teal-600/40">✓ KDIGO & Cockcroft-Gault</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            <button
              onClick={() => onSelectTab('literature')}
              className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs cursor-pointer hover:scale-105"
            >
              <BookMarked className="w-4 h-4" />
              <span>Buka Direktori Literatur & EBM</span>
            </button>
            <button
              onClick={() => onSelectTab('guidelines')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <span>Lihat Panduan Terapi PNPK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
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
