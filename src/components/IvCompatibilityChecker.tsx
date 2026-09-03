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
      {/* HERO BANNER - STANDARDIZED CLINICAL DEEP TEAL GRADIENT */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2f35] via-[#10424a] to-[#18444a] p-6 sm:p-8 text-white shadow-xl border border-teal-500/20">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <Syringe className="w-48 h-48 text-teal-300" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold font-outfit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Standar Trissel’s 2024 &amp; ASHP Injectable Drugs Handbook</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shrink-0">
                <Syringe className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Uji Kompatibilitas Injeksi IV &amp; Y-Site
                </h1>
                <p className="text-xs sm:text-sm text-teal-100/80 font-medium">
                  Evaluasi kompatibilitas percabangan jalur infus bersama (Y-Site), skrining presipitasi asam-basa, kompatibilitas pelarut infus, dan titrasi syringe pump.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-teal-200">
                <Layers className="w-3.5 h-3.5 text-[#3dbfd1]" />
                <span>Skrining Y-Site Percabangan Infus</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pelarut NS, D5W, RL &amp; Stabilitas BUD</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-pink-200">
                <AlertTriangle className="w-3.5 h-3.5 text-pink-300" />
                <span>Pencegahan Presipitasi Kristal</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Total Obat Injeksi:</span>
              <span className="text-lg font-black text-teal-300">{IV_DRUGS_DATABASE.length} Sediaan IV &amp; ICU</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <button
          onClick={() => setActiveSubTab('ysite')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
            activeSubTab === 'ysite'
              ? 'bg-[#0f766e] text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          Uji Kompatibilitas Percabangan Y-Site
          <span className={`ml-1 px-2 py-0.5 text-[10px] font-bold rounded-full ${activeSubTab === 'ysite' ? 'bg-teal-900/50 text-teal-100' : 'bg-teal-100 text-teal-800'}`}>
            Multi-Drug
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('directory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
            activeSubTab === 'directory'
              ? 'bg-[#0f766e] text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          Monografi Pelarut & Stabilitas Rekonstitusi (BUD)
        </button>

        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
            activeSubTab === 'calculator'
              ? 'bg-[#0f766e] text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Kalkulator Titrasi Syringe Pump & Drip
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: UJI KOMPATIBILITAS Y-SITE */}
      {/* ========================================================================= */}
      {activeSubTab === 'ysite' && (
        <div className="space-y-6">
          {/* Drug Selection Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold">
                  <Syringe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Pilih Obat Injeksi yang Dialirkan Sejalur (Y-Site)</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pilih 2 atau lebih obat untuk menguji kompatibilitas fisikokimia larutan</p>
                </div>
              </div>

              {/* Status Header Badge */}
              <div>
                {overallYSiteStatus === 'incompatible' && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-rose-600 text-white shadow-md shadow-rose-900/20">
                    <AlertTriangle className="w-4 h-4" />
                    TERDETEKSI INKOMPATIBILITAS BERBAHAYA!
                  </span>
                )}
                {overallYSiteStatus === 'compatible' && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-emerald-600 text-white shadow-md shadow-emerald-900/20">
                    <CheckCircle2 className="w-4 h-4" />
                    SEMUA OBAT KOMPATIBEL DI JALUR Y-SITE
                  </span>
                )}
                {overallYSiteStatus === 'conditional' && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-amber-600 text-white shadow-md shadow-amber-900/20">
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
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400" />
                    {drug.name}
                    <span className="text-[11px] text-teal-800 dark:text-teal-300 font-mono font-bold">(pH {drug.phRange})</span>
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
                  className="bg-teal-50 hover:bg-teal-100 text-teal-900 dark:bg-slate-800 dark:text-teal-300 border border-teal-300 dark:border-teal-700 rounded-xl px-3.5 py-1.5 text-xs font-bold focus:outline-none cursor-pointer transition-colors"
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
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-2xs">
              <span className="text-slate-500 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Contoh Kasus Injeksi Ruang Kritis:
              </span>
              <button
                onClick={() => setSelectedYSiteDrugIds(['iv-norepinephrine', 'iv-dobutamine', 'iv-furosemide'])}
                className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 font-medium cursor-pointer"
              >
                🫀 Syok Kardiogenik (Norepinephrine + Dobutamine + Furosemide)
              </button>
              <button
                onClick={() => setSelectedYSiteDrugIds(['iv-mannitol', 'iv-furosemide', 'iv-phenytoin'])}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 font-medium cursor-pointer"
              >
                🧠 Edema Serebral & Kejang (Mannitol 20% + Furosemide + Fenitoin)
              </button>
              <button
                onClick={() => setSelectedYSiteDrugIds(['iv-thiopental', 'iv-atracurium', 'iv-midazolam'])}
                className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 font-medium cursor-pointer"
              >
                ⚠️ Inkompatibilitas Fatal Anestesi (Thiopental + Atracurium + Midazolam)
              </button>
              <button
                onClick={() => setSelectedYSiteDrugIds(['iv-calcium-gluconate', 'iv-potassium-phosphate', 'iv-sodium-bicarbonate'])}
                className="px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800 hover:bg-red-100 font-medium cursor-pointer"
              >
                ⚡ Presipitasi Kapur Elektrolit (Kalsium + K-Phos + Bikarbonat)
              </button>
              <button
                onClick={() => setSelectedYSiteDrugIds(['iv-oxytocin', 'iv-tranexamic-acid', 'iv-magnesium-sulfate'])}
                className="px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-800 dark:text-pink-300 border border-pink-200 dark:border-pink-800 hover:bg-pink-100 font-medium cursor-pointer"
              >
                🤰 Kebidanan & PPH (Oxytocin + Asam Traneksamat + MgSO4)
              </button>
            </div>
          </div>

          {/* Matrix Grid Overview (if >=2 drugs) */}
          {selectedYSiteDrugIds.length >= 2 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm overflow-x-auto">
              <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                Matriks Kompatibilitas Y-Site Antar Pasangan
              </h4>

              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="p-2 text-left text-slate-600 dark:text-slate-400 font-bold">Obat</th>
                    {selectedYSiteDrugIds.map(id => {
                      const d = IV_DRUGS_DATABASE.find(item => item.id === id);
                      return (
                        <th key={id} className="p-2 text-slate-800 dark:text-slate-200 font-bold max-w-[110px] truncate" title={d?.name}>
                          {d?.name.split(' ')[0]}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {selectedYSiteDrugIds.map((rowId) => {
                    const rowDrug = IV_DRUGS_DATABASE.find(d => d.id === rowId);
                    return (
                      <tr key={rowId}>
                        <td className="p-2 text-left font-black text-slate-900 dark:text-white whitespace-nowrap">
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
                                <span className="inline-block w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 leading-7 font-black border border-emerald-300 dark:border-emerald-500/30" title="Kompatibel (Aman)">
                                  C
                                </span>
                              )}
                              {check.status === 'incompatible' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 leading-7 font-black border border-rose-300 dark:border-rose-500/30" title="Inkompatibel (Bahaya)">
                                  I
                                </span>
                              )}
                              {check.status === 'conditional' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 leading-7 font-black border border-amber-300 dark:border-amber-500/30" title="Bersyarat / Waspada">
                                  V
                                </span>
                              )}
                              {check.status === 'no_data' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 leading-7 font-bold border border-slate-200 dark:border-slate-700" title="Belum Ada Data">
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

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 font-medium">
                <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-[10px] border border-emerald-300">C</span> Kompatibel (Aman)</span>
                <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-rose-100 text-rose-800 font-black flex items-center justify-center text-[10px] border border-rose-300">I</span> Inkompatibel (Bahaya / Presipitasi)</span>
                <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-amber-100 text-amber-800 font-black flex items-center justify-center text-[10px] border border-amber-300">V</span> Bersyarat (Waspada pH)</span>
                <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-slate-100 text-slate-700 font-black flex items-center justify-center text-[10px] border border-slate-200">?</span> Belum Ada Data Uji</span>
              </div>
            </div>
          )}

          {/* Detailed Pairwise Cards */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              Rincian Klinis Kompatibilitas Antar Pasangan ({ySitePairwiseResults.length} Pasangan)
            </h4>

            {ySitePairwiseResults.map((pair, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 shadow-sm transition space-y-4 border ${
                  pair.result.status === 'incompatible'
                    ? 'bg-rose-50/90 dark:bg-rose-950/40 border-2 border-rose-400 dark:border-rose-700/80'
                    : pair.result.status === 'conditional'
                    ? 'bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-700/80'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-base sm:text-lg font-black ${
                      pair.result.status === 'incompatible' ? 'text-rose-950 dark:text-rose-100' :
                      pair.result.status === 'conditional' ? 'text-amber-950 dark:text-amber-100' :
                      'text-slate-900 dark:text-white'
                    }`}>
                      {pair.drugA.name}
                    </span>
                    <span className="text-sm font-black text-slate-400">+</span>
                    <span className={`text-base sm:text-lg font-black ${
                      pair.result.status === 'incompatible' ? 'text-rose-950 dark:text-rose-100' :
                      pair.result.status === 'conditional' ? 'text-amber-950 dark:text-amber-100' :
                      'text-slate-900 dark:text-white'
                    }`}>
                      {pair.drugB.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {renderStatusBadge(pair.result.status)}
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 font-mono">
                      Ref: {pair.result.evidence}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <span className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Parameter pH Larutan:</span>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 font-medium">
                      <span className="text-slate-800 dark:text-slate-200 font-mono">
                        {pair.drugA.name.split(' ')[0]}: <strong className="text-teal-800 dark:text-teal-300 font-black">pH {pair.drugA.phRange}</strong>
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-mono">
                        {pair.drugB.name.split(' ')[0]}: <strong className="text-teal-800 dark:text-teal-300 font-black">pH {pair.drugB.phRange}</strong>
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
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={directorySearchQuery}
                onChange={(e) => setDirectorySearchQuery(e.target.value)}
                placeholder="Cari obat injeksi (nama generik / merk dagang)..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white font-bold focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Kategori:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 cursor-pointer"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Vasoaktif / Inotropik">Vasoaktif / Inotropik</option>
                <option value="Antibiotik / Antijamur">Antibiotik / Antijamur</option>
                <option value="Sedasi & Anestesi">Sedasi & Anestesi</option>
                <option value="Antikoagulan & Kardiovaskular">Antikoagulan & Kardiovaskular</option>
                <option value="Gastrointestinal">Gastrointestinal</option>
                <option value="Elektrolit & Koreksi">Elektrolit & Koreksi</option>
              </select>
            </div>
          </div>

          {/* Directory Drug Cards */}
          <div className="space-y-4">
            {filteredDirectoryDrugs.map(drug => (
              <div
                key={drug.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-teal-400 transition"
              >
                <div
                  className="flex flex-wrap items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setExpandedDrugId(expandedDrugId === drug.id ? null : drug.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                        {drug.name}
                        <span className="text-xs font-semibold text-slate-500 font-mono">({drug.genericName})</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-teal-50 text-teal-800 border border-teal-200">
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
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300" title="Wajib Flabot Gelap / Aluminium Foil">
                        <SunMedium className="w-3 h-3" />
                        Pelindung Cahaya
                      </span>
                    )}
                    {drug.stability.filterRequired && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black bg-purple-100 text-purple-900 border border-purple-300" title="Wajib In-line Filter">
                        <Filter className="w-3 h-3" />
                        In-line Filter
                      </span>
                    )}
                    <span className="text-xs text-[#0f766e] dark:text-teal-400 font-bold underline ml-1">
                      {expandedDrugId === drug.id ? 'Tutup Rincian' : 'Lihat Rekonstitusi & BUD'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedDrugId === drug.id && (
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
                    {/* Diluent Compatibility Grid */}
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200 block mb-2">
                        Kompatibilitas Cairan Pembawa / Infus:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className={`p-2.5 rounded-lg border flex items-center justify-between font-bold ${drug.diluents.ns ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800/40 dark:text-emerald-300' : 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/30 dark:border-rose-800/40 dark:text-rose-300'}`}>
                          <span>NaCl 0.9% (NS)</span>
                          {drug.diluents.ns ? <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> : <X className="w-4 h-4 text-rose-700 dark:text-rose-400" />}
                        </div>
                        <div className={`p-2.5 rounded-lg border flex items-center justify-between font-bold ${drug.diluents.d5w ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800/40 dark:text-emerald-300' : 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/30 dark:border-rose-800/40 dark:text-rose-300'}`}>
                          <span>Dextrose 5% (D5W)</span>
                          {drug.diluents.d5w ? <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> : <X className="w-4 h-4 text-rose-700 dark:text-rose-400" />}
                        </div>
                        <div className={`p-2.5 rounded-lg border flex items-center justify-between font-bold ${drug.diluents.rl ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800/40 dark:text-emerald-300' : 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/30 dark:border-rose-800/40 dark:text-rose-300'}`}>
                          <span>Ringer Lactate (RL)</span>
                          {drug.diluents.rl ? <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> : <X className="w-4 h-4 text-rose-700 dark:text-rose-400" />}
                        </div>
                        <div className={`p-2.5 rounded-lg border flex items-center justify-between font-bold ${drug.diluents.wfi ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800/40 dark:text-emerald-300' : 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/30 dark:border-rose-800/40 dark:text-rose-300'}`}>
                          <span>Water for Inj. (WFI)</span>
                          {drug.diluents.wfi ? <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> : <X className="w-4 h-4 text-rose-700 dark:text-rose-400" />}
                        </div>
                      </div>
                      {drug.diluents.notes && (
                        <p className="text-xs text-amber-900 dark:text-amber-300 mt-2 font-bold">
                          *Catatan: {drug.diluents.notes}
                        </p>
                      )}
                    </div>

                    {/* Reconstitution & Stability Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-black text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                          <FlaskConical className="w-3.5 h-3.5" /> Panduan Rekonstitusi & Pengenceran:
                        </span>
                        <p className="text-slate-800 dark:text-slate-200"><strong className="text-slate-900 dark:text-white">Pelarut: </strong>{drug.reconstitution.recommendedDiluent}</p>
                        <p className="text-slate-800 dark:text-slate-200"><strong className="text-slate-900 dark:text-white">Volume: </strong>{drug.reconstitution.volumeToReconstitute}</p>
                        <p className="text-slate-800 dark:text-slate-200"><strong className="text-slate-900 dark:text-white">Konsentrasi Akhir: </strong>{drug.reconstitution.resultantConcentration}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 italic font-medium">{drug.reconstitution.instructions}</p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> Stabilitas & Beyond Use Date (BUD):
                        </span>
                        <p className="text-slate-800 dark:text-slate-200"><strong className="text-slate-900 dark:text-white">Suhu Kamar (15-25°C): </strong>{drug.stability.roomTemp25C}</p>
                        <p className="text-slate-800 dark:text-slate-200"><strong className="text-slate-900 dark:text-white">Kulkas (2-8°C): </strong>{drug.stability.refrigerated2to8C}</p>
                        <p className="text-slate-800 dark:text-slate-200"><strong className="text-slate-900 dark:text-white">Pelindung Cahaya: </strong>{drug.stability.lightProtectionRequired ? 'Wajib Dibungkus Gelap / Aluminium Foil' : 'Tidak Wajib'}</p>
                        <p className="text-slate-800 dark:text-slate-200"><strong className="text-slate-900 dark:text-white">In-line Filter: </strong>{drug.stability.filterRequired ? drug.stability.filterType : 'Tidak Diperlukan'}</p>
                      </div>
                    </div>

                    {/* Black Box Incompatibilities */}
                    {drug.blackBoxIncompatibilities && drug.blackBoxIncompatibilities.length > 0 && (
                      <div className="p-3.5 bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-700 rounded-xl text-rose-950 dark:text-rose-200 space-y-1">
                        <span className="font-black flex items-center gap-1.5 text-rose-950 dark:text-rose-300">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-700" /> Inkompatibilitas Mutlak (KONTRAINDIKASI SEJALUR):
                        </span>
                        <ul className="list-disc list-inside text-xs font-bold text-rose-900 dark:text-rose-100 pl-1">
                          {drug.blackBoxIncompatibilities.map((bb, idx) => (
                            <li key={idx}>{bb}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                Parameter Infus Syringe Pump
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Preset Obat Inotropik / Sedasi</label>
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
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600"
                >
                  <option value="iv-norepinephrine">Norepinephrine (Vascon) 4 mg / 50 mL</option>
                  <option value="iv-dobutamine">Dobutamine (Inotrop) 250 mg / 50 mL</option>
                  <option value="iv-dopamine">Dopamine 200 mg / 50 mL</option>
                  <option value="iv-nicardipine">Nicardipine (Perdipine) 10 mg / 50 mL</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Berat Badan Pasien (kg)</label>
                  <input
                    type="number"
                    min="1"
                    value={calcPatientWeightKg}
                    onChange={(e) => setCalcPatientWeightKg(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Dosis Titrasi</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0.001"
                      value={calcTargetDose}
                      onChange={(e) => setCalcTargetDose(Math.max(0.001, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-black text-teal-800 dark:text-teal-300 focus:outline-none focus:border-teal-600"
                    />
                    <span className="absolute right-2.5 top-2 text-[10px] text-slate-500 font-bold">mcg/kg/mnt</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Jumlah Obat dlm Spuit (mg)</label>
                  <input
                    type="number"
                    min="0.1"
                    value={calcDrugMgInSyringe}
                    onChange={(e) => setCalcDrugMgInSyringe(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Volume Spuit (mL)</label>
                  <select
                    value={calcSyringeVolumeMl}
                    onChange={(e) => setCalcSyringeVolumeMl(parseInt(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600"
                  >
                    <option value={50}>50 mL (Spuit Standar ICU)</option>
                    <option value={20}>20 mL</option>
                    <option value={100}>100 mL (Micro-infusion)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Gravity Drip Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Kalkulator Tetesan Infus Gravitasi (Flabot/Kantong)
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Volume (mL)</label>
                  <input
                    type="number"
                    value={dripVolumeMl}
                    onChange={(e) => setDripVolumeMl(parseInt(e.target.value) || 100)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Durasi (Jam)</label>
                  <input
                    type="number"
                    value={dripDurationHours}
                    onChange={(e) => setDripDurationHours(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Faktor Tetes</label>
                  <select
                    value={dripFactor}
                    onChange={(e) => setDripFactor(parseInt(e.target.value) as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
                  >
                    <option value={20}>Makro (20 gtt/mL)</option>
                    <option value={60}>Mikro (60 gtt/mL)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] border border-[#143d47] rounded-2xl p-6 text-white shadow-xl space-y-5">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                Hasil Setting Kecepatan Syringe Pump
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#06181c] border border-[#14424e] rounded-xl p-4">
                  <span className="text-xs text-teal-200/80 font-medium">Setting Syringe Pump</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-teal-300">{syringePumpCalculations.rateMlPerHour}</span>
                    <span className="text-sm font-bold text-teal-100">mL / jam</span>
                  </div>
                  <span className="text-[11px] text-teal-300/70 mt-1 block font-mono">
                    Konsentrasi: {syringePumpCalculations.concentrationMcgPerMl} mcg/mL
                  </span>
                </div>

                <div className="bg-[#06181c] border border-[#14424e] rounded-xl p-4">
                  <span className="text-xs text-teal-200/80 font-medium">Waktu Spuit Habis</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-emerald-300">~{syringePumpCalculations.syringeDurationHours}</span>
                    <span className="text-sm font-bold text-teal-100">Jam</span>
                  </div>
                  <span className="text-[11px] text-teal-300/70 mt-1 block font-mono">
                    Total dosis masuk: {syringePumpCalculations.totalDoseMgPerHour} mg/jam
                  </span>
                </div>
              </div>

              {/* Gravity Drip Result Box */}
              <div className="bg-[#08282e] border border-teal-500/30 rounded-xl p-4">
                <span className="text-xs font-bold text-teal-300 block mb-1">
                  Hasil Tetesan Infus Gravitasi ({dripVolumeMl} mL dalam {dripDurationHours} jam):
                </span>
                <div className="flex items-baseline gap-4 mt-2">
                  <div>
                    <span className="text-2xl font-black text-white">{gravityDripCalculations.dripRateGttPerMin}</span>
                    <span className="text-xs font-bold text-teal-300 ml-1">tetes / menit ({dripFactor === 20 ? 'Makro' : 'Mikro'})</span>
                  </div>
                  <div className="text-xs text-teal-100 font-medium">
                    Kecepatan: <strong className="text-white font-black">{gravityDripCalculations.rateMlPerHour} mL/jam</strong>
                  </div>
                </div>
              </div>

              {/* Clinical Formula Box */}
              <div className="p-4 rounded-xl bg-[#06181c] border border-[#14424e] space-y-1 text-xs text-teal-200/80">
                <span className="font-bold text-teal-300 block">Rumus Syringe Pump Standar:</span>
                <p className="font-mono text-[11px] text-teal-100">
                  Kecepatan (mL/jam) = [Dosis ({calcTargetDose} mcg/kg/mnt) × BB ({calcPatientWeightKg} kg) × 60] ÷ Konsentrasi ({syringePumpCalculations.concentrationMcgPerMl} mcg/mL)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VERIFIED CLINICAL REFERENCES FOOTER */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <BookOpen className="w-4 h-4 text-[#0f766e] dark:text-teal-400" />
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
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
