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
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Plus, 
  Trash2, 
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
  Share2,
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
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Kompatibel (Aman)
          </span>
        );
      case 'incompatible':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <AlertTriangle className="w-3.5 h-3.5" />
            Inkompatibel (Bahaya)
          </span>
        );
      case 'conditional':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Info className="w-3.5 h-3.5" />
            Bersyarat / Waspada
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
            <HelpCircle className="w-3.5 h-3.5" />
            Belum Ada Data Uji
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-800 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none">
          <Syringe className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/30 text-sky-100 backdrop-blur-md border border-sky-400/30">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              Modul Farmasi Klinis Rumah Sakit & ICU
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
              Trissel's 2024 & ASHP Standard
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Uji Kompatibilitas Injeksi IV, Y-Site & Stabilitas Rekonstitusi
          </h1>
          <p className="mt-2 text-sky-100 text-sm md:text-base leading-relaxed">
            Evaluasi kompatibilitas percabangan jalur infus bersama (*Y-Site Co-Infusion*), skrining presipitasi asam-basa, kompatibilitas pelarut infus (NS, D5W, RL), stabilitas *Beyond Use Date* (BUD), dan kalkulator titrasi syringe pump.
          </p>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveSubTab('ysite')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition ${
            activeSubTab === 'ysite'
              ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          Uji Kompatibilitas Percabangan Y-Site
          <span className="ml-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-sky-500/30 text-sky-200 border border-sky-400/30">
            Multi-Drug
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('directory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition ${
            activeSubTab === 'directory'
              ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          Monografi Pelarut & Stabilitas Rekonstitusi (BUD)
        </button>

        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition ${
            activeSubTab === 'calculator'
              ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
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
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <Syringe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Pilih Obat Injeksi yang Dialirkan Sejalur (Y-Site)</h3>
                  <p className="text-xs text-slate-400">Pilih 2 atau lebih obat untuk menguji kompatibilitas fisikokimia larutan</p>
                </div>
              </div>

              {/* Status Header Badge */}
              <div>
                {overallYSiteStatus === 'incompatible' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-950/50">
                    <AlertTriangle className="w-4 h-4" />
                    TERDETEKSI INKOMPATIBILITAS BERBAHAYA!
                  </span>
                )}
                {overallYSiteStatus === 'compatible' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 className="w-4 h-4" />
                    SEMUA OBAT KOMPATIBEL DI JALUR Y-SITE
                  </span>
                )}
                {overallYSiteStatus === 'conditional' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
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
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-700 text-white shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    {drug.name}
                    <span className="text-[10px] text-slate-400 font-mono">(pH {drug.phRange})</span>
                    <button
                      onClick={() => handleRemoveYSiteDrug(drug.id)}
                      className="text-slate-500 hover:text-rose-400 transition"
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
                  className="bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-600/40 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none cursor-pointer"
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
          </div>

          {/* Matrix Grid Overview (if >=2 drugs) */}
          {selectedYSiteDrugIds.length >= 2 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg overflow-x-auto">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Matriks Kompatibilitas Y-Site Antar Pasangan
              </h4>

              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="p-2 text-left text-slate-400">Obat</th>
                    {selectedYSiteDrugIds.map(id => {
                      const d = IV_DRUGS_DATABASE.find(item => item.id === id);
                      return (
                        <th key={id} className="p-2 text-slate-300 font-semibold max-w-[100px] truncate" title={d?.name}>
                          {d?.name.split(' ')[0]}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {selectedYSiteDrugIds.map((rowId) => {
                    const rowDrug = IV_DRUGS_DATABASE.find(d => d.id === rowId);
                    return (
                      <tr key={rowId}>
                        <td className="p-2 text-left font-bold text-white whitespace-nowrap">
                          {rowDrug?.name}
                        </td>
                        {selectedYSiteDrugIds.map((colId) => {
                          if (rowId === colId) {
                            return (
                              <td key={colId} className="p-2 bg-slate-950/40 text-slate-600 font-bold">
                                —
                              </td>
                            );
                          }
                          const check = checkYSiteCompatibility(rowId, colId);
                          return (
                            <td key={colId} className="p-2">
                              {check.status === 'compatible' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 leading-7 font-bold border border-emerald-500/30" title="Kompatibel (Aman)">
                                  C
                                </span>
                              )}
                              {check.status === 'incompatible' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 leading-7 font-bold border border-rose-500/30" title="Inkompatibel (Bahaya)">
                                  I
                                </span>
                              )}
                              {check.status === 'conditional' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 leading-7 font-bold border border-amber-500/30" title="Bersyarat / Waspada">
                                  V
                                </span>
                              )}
                              {check.status === 'no_data' && (
                                <span className="inline-block w-7 h-7 rounded-lg bg-slate-800 text-slate-500 leading-7 font-bold border border-slate-700" title="Belum Ada Data">
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

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-800">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center text-[9px]">C</span> Compatible (Kompatibel Aman)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500/30 text-rose-300 font-bold flex items-center justify-center text-[9px]">I</span> Incompatible (Inkompatibel Berbahaya)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500/30 text-amber-300 font-bold flex items-center justify-center text-[9px]">V</span> Variable / Conditional (Perbedaan pH / Waktu Kontak)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-800 text-slate-400 font-bold flex items-center justify-center text-[9px]">?</span> Belum Ada Data Uji Langsung</span>
              </div>
            </div>
          )}

          {/* Detailed Pairwise Cards */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              Rincian Klinis Kompatibilitas Antar Pasangan ({ySitePairwiseResults.length} Pasangan)
            </h4>

            {ySitePairwiseResults.map((pair, idx) => (
              <div
                key={idx}
                className={`border rounded-2xl p-5 shadow-lg transition ${
                  pair.result.status === 'incompatible'
                    ? 'bg-rose-950/20 border-rose-800/50 shadow-rose-950/30'
                    : pair.result.status === 'conditional'
                    ? 'bg-amber-950/20 border-amber-800/40'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base font-bold text-white">
                      {pair.drugA.name}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">+</span>
                    <span className="text-sm md:text-base font-bold text-white">
                      {pair.drugB.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {renderStatusBadge(pair.result.status)}
                    <span className="text-[11px] text-slate-500 font-mono">
                      Ref: {pair.result.evidence}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
                  <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80">
                    <span className="text-slate-400 font-medium block mb-0.5">Parameter pH Larutan:</span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-slate-300 font-mono">
                        {pair.drugA.name.split(' ')[0]}: <strong className="text-sky-300">pH {pair.drugA.phRange}</strong>
                      </span>
                      <span className="text-slate-300 font-mono">
                        {pair.drugB.name.split(' ')[0]}: <strong className="text-sky-300">pH {pair.drugB.phRange}</strong>
                      </span>
                    </div>
                  </div>

                  {pair.result.mechanism && (
                    <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80">
                      <span className="text-slate-400 font-medium block mb-0.5">Mekanisme Reaksi:</span>
                      <p className="text-slate-300 leading-relaxed">{pair.result.mechanism}</p>
                    </div>
                  )}
                </div>

                {pair.result.clinicalEffect && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-200 text-xs mb-3">
                    <span className="font-bold text-rose-300">Dampak Klinis: </span>
                    {pair.result.clinicalEffect}
                  </div>
                )}

                <div className="pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200">Rekomendasi Farmasi: </span>
                    <span className="text-slate-300">{pair.result.recommendation}</span>
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
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={directorySearchQuery}
                onChange={(e) => setDirectorySearchQuery(e.target.value)}
                placeholder="Cari obat injeksi (nama generik / merk dagang)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Kategori:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-sky-500"
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
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg hover:border-slate-700 transition"
              >
                <div
                  className="flex flex-wrap items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setExpandedDrugId(expandedDrugId === drug.id ? null : drug.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {drug.name}
                        <span className="text-xs font-normal text-slate-400 font-mono">({drug.genericName})</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-sky-300">
                          {drug.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          pH: <strong className="text-slate-200">{drug.phRange}</strong>
                        </span>
                        <span className="text-xs text-slate-400">
                          Merk: <em className="text-slate-300">{drug.brandNames.join(', ')}</em>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {drug.stability.lightProtectionRequired && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30" title="Wajib Flabot Gelap / Aluminium Foil">
                        <SunMedium className="w-3 h-3" />
                        Pelindung Cahaya
                      </span>
                    )}
                    {drug.stability.filterRequired && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30" title="Wajib In-line Filter">
                        <Filter className="w-3 h-3" />
                        In-line Filter
                      </span>
                    )}
                    <span className="text-xs text-sky-400 font-semibold">
                      {expandedDrugId === drug.id ? 'Tutup Rincian' : 'Lihat Rekonstitusi & BUD'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedDrugId === drug.id && (
                  <div className="mt-5 pt-4 border-t border-slate-800 space-y-4 text-xs">
                    {/* Diluent Compatibility Grid */}
                    <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80">
                      <span className="text-xs font-bold text-slate-300 block mb-2">
                        Kompatibilitas Cairan Pembawa / Infus:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className={`p-2.5 rounded-lg border flex items-center justify-between ${drug.diluents.ns ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' : 'bg-rose-950/30 border-rose-800/40 text-rose-300'}`}>
                          <span className="font-bold">NaCl 0.9% (NS)</span>
                          {drug.diluents.ns ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />}
                        </div>
                        <div className={`p-2.5 rounded-lg border flex items-center justify-between ${drug.diluents.d5w ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' : 'bg-rose-950/30 border-rose-800/40 text-rose-300'}`}>
                          <span className="font-bold">Dextrose 5% (D5W)</span>
                          {drug.diluents.d5w ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />}
                        </div>
                        <div className={`p-2.5 rounded-lg border flex items-center justify-between ${drug.diluents.rl ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' : 'bg-rose-950/30 border-rose-800/40 text-rose-300'}`}>
                          <span className="font-bold">Ringer Lactate (RL)</span>
                          {drug.diluents.rl ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />}
                        </div>
                        <div className={`p-2.5 rounded-lg border flex items-center justify-between ${drug.diluents.wfi ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' : 'bg-rose-950/30 border-rose-800/40 text-rose-300'}`}>
                          <span className="font-bold">Water for Inj. (WFI)</span>
                          {drug.diluents.wfi ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />}
                        </div>
                      </div>
                      {drug.diluents.notes && (
                        <p className="text-[11px] text-amber-300 mt-2">
                          *Catatan: {drug.diluents.notes}
                        </p>
                      )}
                    </div>

                    {/* Reconstitution & Stability Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80 space-y-2">
                        <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                          <FlaskConical className="w-3.5 h-3.5" /> Panduan Rekonstitusi & Pengenceran:
                        </span>
                        <p className="text-slate-300"><strong className="text-slate-200">Pelarut: </strong>{drug.reconstitution.recommendedDiluent}</p>
                        <p className="text-slate-300"><strong className="text-slate-200">Volume: </strong>{drug.reconstitution.volumeToReconstitute}</p>
                        <p className="text-slate-300"><strong className="text-slate-200">Konsentrasi Akhir: </strong>{drug.reconstitution.resultantConcentration}</p>
                        <p className="text-[11px] text-slate-400 italic">{drug.reconstitution.instructions}</p>
                      </div>

                      <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80 space-y-2">
                        <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> Stabilitas & Beyond Use Date (BUD):
                        </span>
                        <p className="text-slate-300"><strong className="text-slate-200">Suhu Kamar (15-25°C): </strong>{drug.stability.roomTemp25C}</p>
                        <p className="text-slate-300"><strong className="text-slate-200">Kulkas (2-8°C): </strong>{drug.stability.refrigerated2to8C}</p>
                        <p className="text-slate-300"><strong className="text-slate-200">Pelindung Cahaya: </strong>{drug.stability.lightProtectionRequired ? 'Wajib Dibungkus Gelap / Aluminium Foil' : 'Tidak Wajib'}</p>
                        <p className="text-slate-300"><strong className="text-slate-200">In-line Filter: </strong>{drug.stability.filterRequired ? drug.stability.filterType : 'Tidak Diperlukan'}</p>
                      </div>
                    </div>

                    {/* Black Box Incompatibilities */}
                    {drug.blackBoxIncompatibilities && drug.blackBoxIncompatibilities.length > 0 && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-200 space-y-1">
                        <span className="font-bold flex items-center gap-1.5 text-rose-300">
                          <AlertTriangle className="w-3.5 h-3.5" /> Inkompatibilitas Mutlak (KONTRAINDIKASI SEJALUR):
                        </span>
                        <ul className="list-disc list-inside text-[11px] text-rose-200/90 pl-1">
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
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-sky-400" />
                Parameter Infus Syringe Pump
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Preset Obat Inotropik / Sedasi</label>
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="iv-norepinephrine">Norepinephrine (Vascon) 4 mg / 50 mL</option>
                  <option value="iv-dobutamine">Dobutamine (Inotrop) 250 mg / 50 mL</option>
                  <option value="iv-dopamine">Dopamine 200 mg / 50 mL</option>
                  <option value="iv-nicardipine">Nicardipine (Perdipine) 10 mg / 50 mL</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Berat Badan Pasien (kg)</label>
                  <input
                    type="number"
                    min="1"
                    value={calcPatientWeightKg}
                    onChange={(e) => setCalcPatientWeightKg(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Target Dosis Titrasi</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0.001"
                      value={calcTargetDose}
                      onChange={(e) => setCalcTargetDose(Math.max(0.001, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-sky-400 focus:outline-none focus:border-sky-500"
                    />
                    <span className="absolute right-2.5 top-2 text-[11px] text-slate-500">mcg/kg/mnt</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Jumlah Obat dlm Spuit (mg)</label>
                  <input
                    type="number"
                    min="0.1"
                    value={calcDrugMgInSyringe}
                    onChange={(e) => setCalcDrugMgInSyringe(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Volume Spuit (mL)</label>
                  <select
                    value={calcSyringeVolumeMl}
                    onChange={(e) => setCalcSyringeVolumeMl(parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value={50}>50 mL (Spuit Standar ICU)</option>
                    <option value={20}>20 mL</option>
                    <option value={100}>100 mL (Micro-infusion)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Gravity Drip Section */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Kalkulator Tetesan Infus Gravitasi (Flabot/Kantong)
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Volume (mL)</label>
                  <input
                    type="number"
                    value={dripVolumeMl}
                    onChange={(e) => setDripVolumeMl(parseInt(e.target.value) || 100)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Durasi (Jam)</label>
                  <input
                    type="number"
                    value={dripDurationHours}
                    onChange={(e) => setDripDurationHours(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Faktor Tetes</label>
                  <select
                    value={dripFactor}
                    onChange={(e) => setDripFactor(parseInt(e.target.value) as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white"
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
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Hasil Setting Kecepatan Syringe Pump
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs text-slate-400 font-medium">Setting Syringe Pump</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-sky-400">{syringePumpCalculations.rateMlPerHour}</span>
                    <span className="text-sm font-semibold text-slate-300">mL / jam</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Konsentrasi: {syringePumpCalculations.concentrationMcgPerMl} mcg/mL
                  </span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs text-slate-400 font-medium">Waktu Spuit Habis</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-emerald-400">~{syringePumpCalculations.syringeDurationHours}</span>
                    <span className="text-sm font-semibold text-slate-300">Jam</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Total dosis masuk: {syringePumpCalculations.totalDoseMgPerHour} mg/jam
                  </span>
                </div>
              </div>

              {/* Gravity Drip Result Box */}
              <div className="bg-sky-950/30 border border-sky-800/40 rounded-xl p-4">
                <span className="text-xs font-bold text-sky-300 block mb-1">
                  Hasil Tetesan Infus Gravitasi ({dripVolumeMl} mL dalam {dripDurationHours} jam):
                </span>
                <div className="flex items-baseline gap-4 mt-2">
                  <div>
                    <span className="text-2xl font-black text-white">{gravityDripCalculations.dripRateGttPerMin}</span>
                    <span className="text-xs font-semibold text-sky-300 ml-1">tetes / menit ({dripFactor === 20 ? 'Makro' : 'Mikro'})</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Kecepatan: <strong>{gravityDripCalculations.rateMlPerHour} mL/jam</strong>
                  </div>
                </div>
              </div>

              {/* Clinical Formula Box */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 text-xs text-slate-400">
                <span className="font-bold text-slate-300 block">Rumus Syringe Pump Standar:</span>
                <p className="font-mono text-[11px] text-slate-300">
                  Kecepatan (mL/jam) = [Dosis ({calcTargetDose} mcg/kg/mnt) × BB ({calcPatientWeightKg} kg) × 60] ÷ Konsentrasi ({syringePumpCalculations.concentrationMcgPerMl} mcg/mL)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VERIFIED CLINICAL REFERENCES FOOTER */}
      <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-slate-200">
          <BookOpen className="w-4 h-4 text-sky-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Sumber Referensi Resmi & Literatur Terverifikasi:
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px] text-slate-400">
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1">
            <span className="font-bold text-sky-300 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              1. Handbook on Injectable Drugs
            </span>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              Lawrence A. Trissel, American Society of Health-System Pharmacists (ASHP). Rujukan baku dunia untuk data kompatibilitas Y-Site, presipitasi fisiko-kimiawi, dan stabilitas Beyond Use Date (BUD).
            </p>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1">
            <span className="font-bold text-sky-300 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              2. ASHP Injectable Drug Information
            </span>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              American Society of Health-System Pharmacists. Standar monografi rekonstitusi, pelarut yang direkomendasikan (NS, D5W, RL), filter membran, perlindungan cahaya, dan kecepatan titrasi syringe pump.
            </p>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1">
            <span className="font-bold text-sky-300 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              3. Pedoman Pencampuran Obat Suntik
            </span>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              Direktorat Bina Farmasi Komunitas dan Klinik, Ditjen Binfar dan Alkes, Kementerian Kesehatan Republik Indonesia. Standar teknik aseptis dispensing sediaan steril rumah sakit.
            </p>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1">
            <span className="font-bold text-sky-300 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              4. FDA & King Guide to Parenteral Admixtures
            </span>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              Black Box Warnings FDA (seperti kontraindikasi fatal Seftriakson + Kalsium) dan data kompatibilitas cairan infus parenteral multi-komponen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
