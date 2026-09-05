import React, { useState, useMemo } from 'react';
import { 
  IV_DRUGS_DATABASE, 
  IvDrugProfile, 
  YSiteCompatibilityPair, 
  checkYSiteCompatibility, 
  calculateSyringePumpRate, 
  calculateGravityDripRate,
  CompatibilityStatus 
} from '../data/ivCompatibilityData';
import { 
  Syringe, 
  FlaskConical, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Search, 
  Clock, 
  SunMedium, 
  Filter, 
  Calculator, 
  Layers, 
  Check, 
  X, 
  Sparkles, 
  Activity, 
  HelpCircle,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { FloatingPillsBackground } from './FloatingPillsBackground';
import { EvidenceSourceBadge, DualEvidenceBadge } from './EvidenceSourceBadge';

interface IvCompatibilityCheckerProps {
  onSelectTab?: (tab: string) => void;
}

export const IvCompatibilityChecker: React.FC<IvCompatibilityCheckerProps> = () => {
  const [activeSubTab, setActiveSubTab] = useState<'ysite' | 'directory' | 'calculator'>('ysite');

  // Y-Site multi-drug selection (initial preset: Norepinephrine + Dobutamine + Furosemide)
  const [selectedYSiteDrugIds, setSelectedYSiteDrugIds] = useState<string[]>([
    'iv-norepinephrine',
    'iv-dobutamine',
    'iv-furosemide'
  ]);

  // Directory Search State (Tab 2)
  const [directorySearchQuery, setDirectorySearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Semua');
  const [expandedDrugId, setExpandedDrugId] = useState<string | null>('iv-norepinephrine');

  // Syringe Pump Calculator State (Tab 3)
  const [calcDrugPreset, setCalcDrugPreset] = useState<string>('iv-norepinephrine');
  const [calcPatientWeightKg, setCalcPatientWeightKg] = useState<number>(60);
  const [calcTargetDose, setCalcTargetDose] = useState<number>(0.05); // mcg/kg/min or mg/hr
  const [calcDrugMgInSyringe, setCalcDrugMgInSyringe] = useState<number>(4); // 4 mg
  const [calcSyringeVolumeMl, setCalcSyringeVolumeMl] = useState<number>(50); // 50 mL

  // Gravity drip state
  const [dripVolumeMl, setDripVolumeMl] = useState<number>(500);
  const [dripDurationHours, setDripDurationHours] = useState<number>(8);
  const [dripFactor, setDripFactor] = useState<20 | 60>(20);

  // Y-Site Combinations evaluation
  const ySitePairwiseResults = useMemo(() => {
    const pairs: { drugA: IvDrugProfile; drugB: IvDrugProfile; result: YSiteCompatibilityPair }[] = [];

    for (let i = 0; i < selectedYSiteDrugIds.length; i++) {
      for (let j = i + 1; j < selectedYSiteDrugIds.length; j++) {
        const idA = selectedYSiteDrugIds[i];
        const idB = selectedYSiteDrugIds[j];
        const drugA = IV_DRUGS_DATABASE.find(d => d.id === idA);
        const drugB = IV_DRUGS_DATABASE.find(d => d.id === idB);

        if (drugA && drugB) {
          const result = checkYSiteCompatibility(idA, idB);
          pairs.push({ drugA, drugB, result });
        }
      }
    }

    return pairs;
  }, [selectedYSiteDrugIds]);

  // Overall Y-Site status
  const overallYSiteStatus = useMemo(() => {
    if (ySitePairwiseResults.some(p => p.result.status === 'incompatible')) return 'incompatible';
    if (ySitePairwiseResults.some(p => p.result.status === 'conditional')) return 'conditional';
    if (ySitePairwiseResults.every(p => p.result.status === 'compatible')) return 'compatible';
    return 'conditional';
  }, [ySitePairwiseResults]);

  // Add drug to Y-Site
  const handleAddYSiteDrug = (drugId: string) => {
    if (!selectedYSiteDrugIds.includes(drugId)) {
      setSelectedYSiteDrugIds([...selectedYSiteDrugIds, drugId]);
    }
  };

  // Remove drug from Y-Site
  const handleRemoveYSiteDrug = (drugId: string) => {
    setSelectedYSiteDrugIds(selectedYSiteDrugIds.filter(id => id !== drugId));
  };

  // Filtered Directory drugs
  const filteredDirectoryDrugs = useMemo(() => {
    return IV_DRUGS_DATABASE.filter(drug => {
      const matchQuery = 
        drug.name.toLowerCase().includes(directorySearchQuery.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(directorySearchQuery.toLowerCase()) ||
        drug.brandNames.some(b => b.toLowerCase().includes(directorySearchQuery.toLowerCase()));

      const matchCat = selectedCategoryFilter === 'Semua' || drug.category === selectedCategoryFilter;
      return matchQuery && matchCat;
    });
  }, [directorySearchQuery, selectedCategoryFilter]);

  // Calculated Syringe Pump values
  const syringePumpCalculations = useMemo(() => {
    return calculateSyringePumpRate(
      calcTargetDose,
      calcPatientWeightKg,
      calcDrugMgInSyringe,
      calcSyringeVolumeMl
    );
  }, [calcTargetDose, calcPatientWeightKg, calcDrugMgInSyringe, calcSyringeVolumeMl]);

  // Calculated Gravity Drip values
  const gravityDripCalculations = useMemo(() => {
    return calculateGravityDripRate(dripVolumeMl, dripDurationHours, dripFactor);
  }, [dripVolumeMl, dripDurationHours, dripFactor]);

  // Helper badge for status
  const renderStatusBadge = (status: CompatibilityStatus) => {
    switch (status) {
      case 'compatible':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Kompatibel (Aman)
          </span>
        );
      case 'incompatible':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            Inkompatibel (Bahaya)
          </span>
        );
      case 'conditional':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-600 text-white shadow-xs">
            <Info className="w-3.5 h-3.5" />
            Bersyarat / Waspada
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <HelpCircle className="w-3.5 h-3.5" />
            Belum Ada Data Uji
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HERO BANNER - COBALT ICE & DARK SAPPHIRE */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#040914] via-[#09172f] to-[#0d2347] p-6 sm:p-8 text-white shadow-2xl border border-blue-500/25">
        <FloatingPillsBackground density="low" accentColor="#60a5fa" />
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <Syringe className="w-48 h-48 text-blue-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold font-outfit">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Standar Trissel’s 2024 &amp; ASHP Injectable Drugs Handbook</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-950/50 shrink-0">
                <Syringe className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Uji Kompatibilitas Injeksi IV &amp; Y-Site
                </h1>
                <p className="text-xs sm:text-sm text-blue-100/80 font-medium">
                  Evaluasi kompatibilitas percabangan jalur infus bersama (Y-Site), skrining presipitasi asam-basa, kompatibilitas pelarut infus, dan titrasi syringe pump.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-blue-200">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Skrining Y-Site Percabangan Infus</span>
              </div>
              <EvidenceSourceBadge preset="ashp-iv" size="sm" />
              <EvidenceSourceBadge preset="usp-795" size="sm" />
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-sky-200">
                <AlertTriangle className="w-3.5 h-3.5 text-sky-300" />
                <span>Pencegahan Presipitasi Kristal</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-blue-950/60 text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Total Obat Injeksi:</span>
              <span className="text-lg font-black text-blue-400">{IV_DRUGS_DATABASE.length} Sediaan IV &amp; ICU</span>
            </div>
          </div>
        </div>
      </div>      {/* SUB-TABS NAVIGATION - SKY & NAVY CLINICAL ICU */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-50 dark:bg-[#061422] border border-sky-200/70 dark:border-sky-500/25 rounded-2xl shadow-2xs">
        <button
          onClick={() => setActiveSubTab('ysite')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold font-outfit transition cursor-pointer ${
            activeSubTab === 'ysite'
              ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-950/40 border border-sky-400/30'
              : 'text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-50/80 dark:hover:bg-sky-950/40'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Uji Kompatibilitas Percabangan Y-Site</span>
          <span className={`ml-1 px-2 py-0.5 text-[10px] font-bold font-outfit rounded-full ${activeSubTab === 'ysite' ? 'bg-sky-950/60 text-sky-200 border border-sky-400/30' : 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800'}`}>
            Multi-Drug
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('directory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold font-outfit transition cursor-pointer ${
            activeSubTab === 'directory'
              ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-950/40 border border-sky-400/30'
              : 'text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-50/80 dark:hover:bg-sky-950/40'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>Monografi Pelarut & Stabilitas Rekonstitusi (BUD)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold font-outfit transition cursor-pointer ${
            activeSubTab === 'calculator'
              ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-950/40 border border-sky-400/30'
              : 'text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-50/80 dark:hover:bg-sky-950/40'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Kalkulator Titrasi Syringe Pump & Drip</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: UJI KOMPATIBILITAS Y-SITE */}
      {/* ========================================================================= */}
      {activeSubTab === 'ysite' && (
        <div className="space-y-6">
          {/* Drug Selection Card - Sky & Navy Thematic Suite */}
          <div className="bg-white dark:bg-[#071726] border border-sky-200/80 dark:border-sky-500/25 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-sky-100 dark:border-sky-950/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-400/30 flex items-center justify-center font-bold shadow-2xs">
                  <Syringe className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold font-outfit text-slate-900 dark:text-white tracking-tight">Pilih Obat Injeksi yang Dialirkan Sejalur (Y-Site)</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pilih 2 atau lebih obat untuk menguji kompatibilitas fisikokimia larutan</p>
                </div>
              </div>

              {/* Status Header Badge */}
              <div>
                {overallYSiteStatus === 'incompatible' && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black font-outfit bg-rose-600 text-white shadow-md shadow-rose-900/20">
                    <AlertTriangle className="w-4 h-4" />
                    TERDETEKSI INKOMPATIBILITAS BERBAHAYA!
                  </span>
                )}
                {overallYSiteStatus === 'compatible' && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black font-outfit bg-emerald-600 text-white shadow-md shadow-emerald-900/20">
                    <CheckCircle2 className="w-4 h-4" />
                    SEMUA OBAT KOMPATIBEL DI JALUR Y-SITE
                  </span>
                )}
                {overallYSiteStatus === 'conditional' && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black font-outfit bg-amber-500 text-slate-950 shadow-md shadow-amber-950/20">
                    <Info className="w-4 h-4" />
                    PERHATIAN KHUSUS / PEMBILASAN
                  </span>
                )}
              </div>
            </div>

            {/* Selected Drugs Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {selectedYSiteDrugIds.map(drugId => {
                const drug = IV_DRUGS_DATABASE.find(d => d.id === drugId);
                if (!drug) return null;
                return (
                  <span
                    key={drug.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold font-outfit bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-sky-950 dark:text-sky-100 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-sky-500 ring-2 ring-sky-400/40" />
                    {drug.name}
                    <span className="text-[11px] text-sky-700 dark:text-sky-300 font-mono font-bold bg-sky-500/10 px-1.5 py-0.5 rounded-md">(pH {drug.phRange})</span>
                    <button
                      onClick={() => handleRemoveYSiteDrug(drug.id)}
                      className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition cursor-pointer ml-1"
                      title="Hapus dari daftar"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                );
              })}

              {/* Add dropdown */}
              <div className="relative">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddYSiteDrug(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                  className="bg-sky-500/10 hover:bg-sky-500/15 text-sky-900 dark:text-sky-200 border border-sky-400/40 hover:border-sky-400/60 rounded-xl px-4 py-2 text-xs font-bold font-outfit focus:outline-none cursor-pointer transition-colors shadow-2xs"
                >
                  <option value="" disabled>+ Tambah Obat Injeksi...</option>
                  {IV_DRUGS_DATABASE.filter(d => !selectedYSiteDrugIds.includes(d.id)).map(drug => (
                    <option key={drug.id} value={drug.id}>
                      {drug.name} ({drug.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Clinical Presets */}
            <div className="pt-3 border-t border-sky-100 dark:border-sky-950/80 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-extrabold font-outfit flex items-center gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>Contoh Kasus Injeksi Ruang Kritis:</span>
              </span>
              <button
                onClick={() => setSelectedYSiteDrugIds(['iv-norepinephrine', 'iv-dobutamine', 'iv-furosemide'])}
                className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 border border-sky-200 dark:border-sky-800/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 font-bold font-outfit cursor-pointer transition-colors"
              >
                🫀 Syok Kardiogenik (Norepinephrine + Dobutamine + Furosemide)
              </button>
              <button
                onClick={() => setSelectedYSiteDrugIds(['iv-mannitol', 'iv-furosemide', 'iv-phenytoin'])}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-bold font-outfit cursor-pointer transition-colors"
              >
                🧠 Edema Serebral & Kejang (Mannitol 20% + Furosemide + Fenitoin)
              </button>
              <button
                onClick={() => setSelectedYSiteDrugIds(['iv-thiopental', 'iv-atracurium', 'iv-midazolam'])}
                className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 font-bold font-outfit cursor-pointer transition-colors"
              >
                ⚠️ Inkompatibilitas Fatal Anestesi (Thiopental + Atracurium + Midazolam)
              </button>
              <button
                onClick={() => setSelectedYSiteDrugIds(['iv-calcium-gluconate', 'iv-potassium-phosphate', 'iv-sodium-bicarbonate'])}
                className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 font-bold font-outfit cursor-pointer transition-colors"
              >
                ⚡ Presipitasi Kapur Elektrolit (Kalsium + K-Phos + Bikarbonat)
              </button>
              <button
                onClick={() => setSelectedYSiteDrugIds(['iv-oxytocin', 'iv-tranexamic-acid', 'iv-magnesium-sulfate'])}
                className="px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-900 dark:text-pink-200 border border-pink-200 dark:border-pink-800/60 hover:bg-pink-100 dark:hover:bg-pink-900/60 font-bold font-outfit cursor-pointer transition-colors"
              >
                🤰 Kebidanan & PPH (Oxytocin + Asam Traneksamat + MgSO4)
              </button>
            </div>
          </div>

          {/* Matrix Grid Overview (if >=2 drugs) */}
          {selectedYSiteDrugIds.length >= 2 && (
            <div className="bg-white dark:bg-[#071726] border border-sky-200/80 dark:border-sky-500/25 rounded-3xl p-5 sm:p-6 shadow-sm overflow-x-auto">
              <h4 className="text-xs font-black font-outfit text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-sky-500" />
                <span>Matriks Kompatibilitas Y-Site Antar Pasangan</span>
              </h4>

              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr className="border-b border-sky-100 dark:border-sky-950/80">
                    <th className="p-2 text-left text-slate-600 dark:text-slate-400 font-bold font-outfit">Obat</th>
                    {selectedYSiteDrugIds.map(id => {
                      const d = IV_DRUGS_DATABASE.find(item => item.id === id);
                      return (
                        <th key={id} className="p-2 text-slate-800 dark:text-slate-200 font-bold font-outfit max-w-[110px] truncate" title={d?.name}>
                          {d?.name.split(' ')[0]}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100/60 dark:divide-sky-950/60">
                  {selectedYSiteDrugIds.map((rowId) => {
                    const rowDrug = IV_DRUGS_DATABASE.find(d => d.id === rowId);
                    return (
                      <tr key={rowId}>
                        <td className="p-2 text-left font-black font-outfit text-slate-900 dark:text-white whitespace-nowrap">
                          {rowDrug?.name}
                        </td>
                        {selectedYSiteDrugIds.map((colId) => {
                          if (rowId === colId) {
                            return (
                              <td key={colId} className="p-2 bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold">
                                —
                              </td>
                            );
                          }
                          const check = checkYSiteCompatibility(rowId, colId);
                          return (
                            <td key={colId} className="p-2">
                              {check.status === 'compatible' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 leading-7 font-black font-outfit border border-emerald-300 dark:border-emerald-500/30" title="Kompatibel (Aman)">
                                  C
                                </span>
                              )}
                              {check.status === 'incompatible' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 leading-7 font-black font-outfit border border-rose-300 dark:border-rose-500/30" title="Inkompatibel (Bahaya)">
                                  I
                                </span>
                              )}
                              {check.status === 'conditional' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 leading-7 font-black font-outfit border border-amber-300 dark:border-amber-500/30" title="Bersyarat / Waspada">
                                  V
                                </span>
                              )}
                              {check.status === 'no_data' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 leading-7 font-bold font-outfit border border-slate-200 dark:border-slate-700" title="Belum Ada Data">
                                  ?
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 mt-4 pt-3 border-t border-sky-100 dark:border-sky-950/80 font-medium font-outfit">
                <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-[10px] border border-emerald-300">C</span> Kompatibel (Aman)</span>
                <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-rose-100 text-rose-800 font-black flex items-center justify-center text-[10px] border border-rose-300">I</span> Inkompatibel (Bahaya / Presipitasi)</span>
                <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-amber-100 text-amber-800 font-black flex items-center justify-center text-[10px] border border-amber-300">V</span> Bersyarat (Waspada pH)</span>
                <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-slate-100 text-slate-700 font-black flex items-center justify-center text-[10px] border border-slate-200">?</span> Belum Ada Data Uji</span>
              </div>
            </div>
          )}

          {/* Detailed Pairwise Cards */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
              <Activity className="w-4 h-4 text-sky-500" />
              Rincian Klinis Kompatibilitas Antar Pasangan ({ySitePairwiseResults.length} Pasangan)
            </h4>

            {ySitePairwiseResults.map((pair, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-5 sm:p-6 shadow-sm transition space-y-4 border ${
                  pair.result.status === 'incompatible'
                    ? 'bg-rose-50/90 dark:bg-rose-950/30 border-2 border-rose-400 dark:border-rose-700/80'
                    : pair.result.status === 'conditional'
                    ? 'bg-amber-50/90 dark:bg-amber-950/30 border-2 border-amber-400 dark:border-amber-700/80'
                    : 'bg-white dark:bg-[#071726] border-sky-200/80 dark:border-sky-500/25'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-base sm:text-lg font-black font-outfit ${
                      pair.result.status === 'incompatible' ? 'text-rose-950 dark:text-rose-100' :
                      pair.result.status === 'conditional' ? 'text-amber-950 dark:text-amber-100' :
                      'text-slate-900 dark:text-white'
                    }`}>
                      {pair.drugA.name}
                    </span>
                    <span className="text-sm font-black text-slate-400">+</span>
                    <span className={`text-base sm:text-lg font-black font-outfit ${
                      pair.result.status === 'incompatible' ? 'text-rose-950 dark:text-rose-100' :
                      pair.result.status === 'conditional' ? 'text-amber-950 dark:text-amber-100' :
                      'text-slate-900 dark:text-white'
                    }`}>
                      {pair.drugB.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {renderStatusBadge(pair.result.status)}
                    <DualEvidenceBadge nationalPreset="kemenkes-iv" internationalPreset="ashp-iv" size="sm" />
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                      Ref: {pair.result.evidence}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50/80 dark:bg-slate-900/80 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                    <span className="text-slate-700 dark:text-slate-300 font-bold font-outfit block mb-1">Parameter pH Larutan:</span>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 font-medium">
                      <span className="text-slate-800 dark:text-slate-200 font-mono">
                        {pair.drugA.name.split(' ')[0]}: <strong className="text-sky-700 dark:text-sky-300 font-black">pH {pair.drugA.phRange}</strong>
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-mono">
                        {pair.drugB.name.split(' ')[0]}: <strong className="text-sky-700 dark:text-sky-300 font-black">pH {pair.drugB.phRange}</strong>
                      </span>
                    </div>
                  </div>

                  {pair.result.mechanism && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <span className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Mekanisme Reaksi:</span>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{pair.result.mechanism}</p>
                    </div>
                  )}
                </div>

                {pair.result.clinicalEffect && (
                  <div className="p-3.5 bg-rose-100/90 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-700/80 rounded-xl text-xs">
                    <span className="font-black text-rose-950 dark:text-rose-200">Dampak Klinis: </span>
                    <span className="text-rose-950 dark:text-rose-100 font-bold">{pair.result.clinicalEffect}</span>
                  </div>
                )}

                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/70 rounded-xl flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-emerald-950 dark:text-emerald-200">Rekomendasi Farmasi: </span>
                    <span className="text-emerald-950 dark:text-emerald-100 font-bold">{pair.result.recommendation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DIREKTORI PELARUT & STABILITAS REKONSTITUSI */}
      {/* ========================================================================= */}
      {activeSubTab === 'directory' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white dark:bg-[#071726] border border-sky-200/80 dark:border-sky-500/25 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={directorySearchQuery}
                onChange={(e) => setDirectorySearchQuery(e.target.value)}
                placeholder="Cari obat injeksi (nama generik / merk dagang)..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white font-bold font-outfit focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-outfit text-slate-600 dark:text-slate-400">Kategori:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold font-outfit text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Vasoaktif / Inotropik">Vasoaktif / Inotropik</option>
                <option value="Antibiotik / Antijamur">Antibiotik / Antijamur</option>
                <option value="Nutrisi Parenteral & Cairan Khusus">Nutrisi Parenteral & Cairan Khusus</option>
                <option value="Kemoterapi Onkologi & Imunologi">Kemoterapi Onkologi & Imunologi</option>
                <option value="Sedasi & Anestesi">Sedasi & Anestesi</option>
                <option value="Analgesik & Antiinflamasi">Analgesik & Antiinflamasi</option>
                <option value="Antikoagulan & Kardiovaskular">Antikoagulan & Kardiovaskular</option>
                <option value="Gastrointestinal">Gastrointestinal</option>
                <option value="Elektrolit & Koreksi">Elektrolit & Koreksi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          {/* Directory Drug Cards */}
          <div className="space-y-4">
            {filteredDirectoryDrugs.map(drug => (
              <div
                key={drug.id}
                className="bg-white dark:bg-[#071726] border border-sky-200/80 dark:border-sky-500/25 rounded-3xl p-5 sm:p-6 shadow-sm hover:border-sky-400 dark:hover:border-sky-400/60 transition"
              >
                <div
                  className="flex flex-wrap items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setExpandedDrugId(expandedDrugId === drug.id ? null : drug.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-400/30 flex items-center justify-center font-bold shadow-2xs">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2">
                        {drug.name}
                        <span className="text-xs font-semibold text-slate-500 font-mono">({drug.genericName})</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black font-outfit bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                          {drug.category}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                          pH: <strong className="text-slate-900 dark:text-slate-200 font-black">{drug.phRange}</strong>
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          Merk: <em className="text-slate-800 dark:text-slate-200 font-bold">{drug.brandNames.join(', ')}</em>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {drug.stability.lightProtectionRequired && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black font-outfit bg-amber-100 text-amber-900 border border-amber-300" title="Wajib Flabot Gelap / Aluminium Foil">
                        <SunMedium className="w-3 h-3" />
                        Pelindung Cahaya
                      </span>
                    )}
                    {drug.stability.filterRequired && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black font-outfit bg-purple-100 text-purple-900 border border-purple-300" title="Wajib In-line Filter">
                        <Filter className="w-3 h-3" />
                        In-line Filter
                      </span>
                    )}
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-bold font-outfit underline ml-1">
                      {expandedDrugId === drug.id ? 'Tutup Rincian' : 'Lihat Rekonstitusi & BUD'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedDrugId === drug.id && (
                  <div className="mt-5 pt-4 border-t border-sky-100 dark:border-sky-950/80 space-y-4 text-xs">
                    {/* Diluent Compatibility Grid */}
                    <div className="bg-slate-50 dark:bg-[#040f1a] rounded-2xl p-4 border border-sky-200/60 dark:border-sky-900/40">
                      <span className="text-xs font-black font-outfit text-slate-800 dark:text-slate-200 block mb-2">
                        Kompatibilitas Cairan Pembawa / Infus:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {Object.entries(drug.diluents).filter(([k]) => k !== 'notes').map(([key, val], idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-xl border flex items-center justify-between ${
                              val
                                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-300'
                                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/80 text-rose-900 dark:text-rose-300'
                            }`}
                          >
                            <span className="font-bold font-outfit">{key.toUpperCase()}</span>
                            <span className="font-black font-outfit text-xs">
                              {val ? '✓ Ya' : '✕ Tidak'}
                            </span>
                          </div>
                        ))}
                      </div>
                      {drug.diluents.notes && (
                        <p className="text-xs text-amber-900 dark:text-amber-300 mt-2 font-bold font-outfit">
                          *Catatan: {drug.diluents.notes}
                        </p>
                      )}
                    </div>

                    {/* Reconstitution & Stability Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-sky-50/60 dark:bg-sky-950/30 rounded-2xl border border-sky-200/80 dark:border-sky-800/60 space-y-2">
                        <span className="font-black font-outfit text-sky-900 dark:text-sky-300 block flex items-center gap-1.5">
                          <FlaskConical className="w-4 h-4 text-sky-600" />
                          Panduan Rekonstitusi:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 font-medium font-outfit">{drug.reconstitution.instructions}</p>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono pt-1 border-t border-sky-200/60 dark:border-sky-900/60">
                          <p>Pelarut: {drug.reconstitution.recommendedDiluent}</p>
                          <p>Volume: {drug.reconstitution.volumeToReconstitute}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl border border-blue-200/80 dark:border-blue-800/60 space-y-2">
                        <span className="font-black font-outfit text-blue-900 dark:text-blue-300 block flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-blue-600" />
                          Stabilitas & Beyond Use Date (BUD):
                        </span>
                        <div className="text-slate-700 dark:text-slate-300 text-[11px] font-outfit font-medium">
                          <p>Suhu Kamar: {drug.stability.roomTemp25C}</p>
                          <p>Kulkas: {drug.stability.refrigerated2to8C}</p>
                        </div>
                        <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/60">
                          <DualEvidenceBadge nationalPreset="kemenkes-iv" internationalPreset="usp-795" size="sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: KALKULATOR TITRASI SYRINGE PUMP & DRIP */}
      {/* ========================================================================= */}
      {activeSubTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-[#071726] border border-sky-200/80 dark:border-sky-500/25 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-sky-500" />
                Parameter Syringe Pump ICU
              </h3>

              <div>
                <label className="block text-xs font-bold font-outfit text-slate-700 dark:text-slate-300 mb-1">Pilih Preset Obat Vasoaktif:</label>
                <select
                  value={calcDrugPreset}
                  onChange={(e) => {
                    setCalcDrugPreset(e.target.value);
                    if (e.target.value === 'iv-norepinephrine') {
                      setCalcTargetDose(0.05);
                      setCalcDrugMgInSyringe(4);
                      setCalcSyringeVolumeMl(50);
                    } else if (e.target.value === 'iv-dobutamine') {
                      setCalcTargetDose(5);
                      setCalcDrugMgInSyringe(250);
                      setCalcSyringeVolumeMl(50);
                    } else if (e.target.value === 'iv-dopamine') {
                      setCalcTargetDose(5);
                      setCalcDrugMgInSyringe(200);
                      setCalcSyringeVolumeMl(50);
                    } else if (e.target.value === 'iv-nicardipine') {
                      setCalcTargetDose(5); // mg/hr
                      setCalcDrugMgInSyringe(10);
                      setCalcSyringeVolumeMl(50);
                    }
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold font-outfit text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="iv-norepinephrine">Norepinephrine (Vascon) 4 mg / 50 mL</option>
                  <option value="iv-dobutamine">Dobutamine (Inotrop) 250 mg / 50 mL</option>
                  <option value="iv-dopamine">Dopamine 200 mg / 50 mL</option>
                  <option value="iv-nicardipine">Nicardipine (Perdipine) 10 mg / 50 mL</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold font-outfit text-slate-700 dark:text-slate-300 mb-1">Berat Badan (kg)</label>
                  <input
                    type="number"
                    min="1"
                    value={calcPatientWeightKg}
                    onChange={(e) => setCalcPatientWeightKg(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold font-outfit text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-outfit text-slate-700 dark:text-slate-300 mb-1">Target Dosis Titrasi</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0.001"
                      value={calcTargetDose}
                      onChange={(e) => setCalcTargetDose(Math.max(0.001, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-black font-outfit text-sky-800 dark:text-sky-300 focus:outline-none focus:border-sky-500"
                    />
                    <span className="absolute right-2.5 top-2 text-[10px] text-slate-500 font-bold font-outfit">mcg/kg/mnt</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gravity Drip Section */}
            <div className="bg-white dark:bg-[#071726] border border-sky-200/80 dark:border-sky-500/25 rounded-3xl p-6 shadow-sm space-y-3">
              <h3 className="text-xs font-black font-outfit text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Kalkulator Tetesan Infus Gravitasi
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold font-outfit text-slate-600 dark:text-slate-400 mb-1">Vol (mL)</label>
                  <input
                    type="number"
                    value={dripVolumeMl}
                    onChange={(e) => setDripVolumeMl(parseInt(e.target.value) || 100)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-bold font-outfit text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold font-outfit text-slate-600 dark:text-slate-400 mb-1">Jam</label>
                  <input
                    type="number"
                    value={dripDurationHours}
                    onChange={(e) => setDripDurationHours(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-bold font-outfit text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold font-outfit text-slate-600 dark:text-slate-400 mb-1">Factor</label>
                  <select
                    value={dripFactor}
                    onChange={(e) => setDripFactor(parseInt(e.target.value) as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-2 py-1.5 text-xs font-bold font-outfit text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value={20}>Makro</option>
                    <option value={60}>Mikro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-gradient-to-r from-[#031522] via-[#072438] to-[#041926] border border-sky-500/30 rounded-3xl p-6 text-white shadow-xl space-y-5">
              <span className="text-xs font-extrabold font-outfit text-sky-400 uppercase tracking-wider block">
                Hasil Setting Syringe Pump
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#020d16]/90 border border-sky-500/25 rounded-2xl p-4">
                  <span className="text-xs text-sky-200/80 font-medium font-outfit">Setting Pump</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black font-outfit text-sky-400">{syringePumpCalculations.rateMlPerHour}</span>
                    <span className="text-sm font-bold font-outfit text-sky-100">mL / jam</span>
                  </div>
                </div>
                <div className="bg-[#020d16]/90 border border-sky-500/25 rounded-2xl p-4">
                  <span className="text-xs text-sky-200/80 font-medium font-outfit">Habis Dalam</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black font-outfit text-emerald-300">~{syringePumpCalculations.syringeDurationHours}</span>
                    <span className="text-sm font-bold font-outfit text-sky-100">Jam</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#041624] border border-sky-500/30 rounded-2xl p-4">
                <span className="text-xs font-bold font-outfit text-sky-300 block mb-1">
                  Hasil Tetesan Gravitasi ({dripVolumeMl} mL / {dripDurationHours} jam):
                </span>
                <span className="text-2xl font-black font-outfit text-white">{gravityDripCalculations.dripRateGttPerMin}</span>
                <span className="text-xs font-bold font-outfit text-sky-300 ml-1">tetes / menit</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VERIFIED CLINICAL REFERENCES FOOTER */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <h4 className="text-xs font-black font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Sumber Referensi Resmi & Literatur Terverifikasi:
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-[#0f766e] dark:text-teal-300 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              1. Handbook on Injectable Drugs
            </span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Lawrence A. Trissel, American Society of Health-System Pharmacists (ASHP). Rujukan baku dunia untuk data kompatibilitas Y-Site, presipitasi fisiko-kimiawi, dan stabilitas Beyond Use Date (BUD).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-[#0f766e] dark:text-teal-300 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              2. ASHP Injectable Drug Info
            </span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              American Society of Health-System Pharmacists. Standar monografi rekonstitusi, pelarut yang direkomendasikan (NS, D5W, RL), filter membran, dan perlindungan cahaya.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-[#0f766e] dark:text-teal-300 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              3. Pedoman Pencampuran Obat Suntik
            </span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Direktorat Bina Farmasi Komunitas dan Klinik, Ditjen Binfar dan Alkes, Kementerian Kesehatan Republik Indonesia. Standar teknik aseptis dispensing sediaan steril.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-black text-[#0f766e] dark:text-teal-300 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              4. FDA & King Guide to Admixtures
            </span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Black Box Warnings FDA (seperti kontraindikasi fatal Seftriakson + Kalsium) dan data kompatibilitas cairan infus parenteral multi-komponen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
