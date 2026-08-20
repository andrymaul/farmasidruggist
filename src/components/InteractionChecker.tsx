import React, { useState, useEffect } from 'react';
import { Drug, DrugInteraction, UserProfile, SeverityLevel, PricingPlan } from '../types';
import { 
  ShieldAlert, 
  Plus, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  BookmarkPlus, 
  Sparkles, 
  Search, 
  Info, 
  ShieldCheck,
  ExternalLink,
  Utensils,
  CopyX,
  Download,
  Database
} from 'lucide-react';
import { resolveDrugFromDDInter, resolveInteractionPair, evaluateTherapeuticDuplications, evaluateFoodInteractions } from '../utils/ddinterEngine';
import { SAMPLE_FOOD_INTERACTIONS, SAMPLE_THERAPEUTIC_DUPLICATIONS, DDINTER_DATASET_INFO } from '../data/ddinterData';

interface InteractionCheckerProps {
  drugs: Drug[];
  interactions: DrugInteraction[];
  currentUser: UserProfile | null;
  pricingPlans?: PricingPlan[];
  onSaveHistory: (drugNames: string[], interactionCount: number, highestSeverity: SeverityLevel | 'None') => void;
  onOpenPricingModal: () => void;
  onOpenAuthModal: () => void;
  onOpenReportModal: (selectedDrugs: Drug[], matchedInteractions: DrugInteraction[]) => void;
  preselectedDrugName?: string;
}

export const InteractionChecker: React.FC<InteractionCheckerProps> = ({
  drugs,
  interactions,
  currentUser,
  pricingPlans,
  onSaveHistory,
  onOpenPricingModal,
  onOpenAuthModal,
  onOpenReportModal,
  preselectedDrugName = ''
}) => {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showDatasetDetails, setShowDatasetDetails] = useState(false);
  const [limitWarning, setLimitWarning] = useState<string | null>(null);

  // Compute permissions for current active plan from admin pricing settings
  const userPlanObj = pricingPlans?.find(p => p.name === currentUser?.subscriptionPlan || (p.id === 'free' && (!currentUser || currentUser.subscriptionPlan === 'Gratis')) || (p.id === 'pro' && currentUser?.subscriptionPlan === 'Pro') || (p.id === 'klinik' && currentUser?.subscriptionPlan === 'Klinik'));

  const activePermissions = userPlanObj?.permissions || {
    maxDrugsPerCheck: (!currentUser || currentUser.subscriptionPlan === 'Gratis') ? 2 : 99,
    canPrintPdfReport: currentUser?.subscriptionPlan !== 'Gratis',
    canAccessFoodInteractions: currentUser?.subscriptionPlan !== 'Gratis',
    canAccessTherapeuticDuplications: currentUser?.subscriptionPlan !== 'Gratis',
    canSaveCloudHistory: true,
    maxHistoryRecords: (!currentUser || currentUser.subscriptionPlan === 'Gratis') ? 3 : 999,
    canAccessClinicBranding: currentUser?.subscriptionPlan === 'Klinik',
    canExportExcelCsv: currentUser?.subscriptionPlan !== 'Gratis'
  };

  // Preselect initial drugs if passed
  useEffect(() => {
    if (preselectedDrugName) {
      const names = preselectedDrugName.split(',').map((s) => s.trim()).filter(Boolean);
      names.forEach((name) => {
        const match = resolveDrugFromDDInter(name, drugs);
        if (match) {
          setSelectedDrugs((prev) => {
            if (prev.some((d) => d.id === match.id || d.name.toLowerCase() === match.name.toLowerCase())) {
              return prev;
            }
            return [...prev, match];
          });
        }
      });
    }
  }, [preselectedDrugName, drugs]);

  // Handle adding drug to selector
  const handleAddDrug = (drugToAdd: Drug) => {
    if (selectedDrugs.length >= activePermissions.maxDrugsPerCheck) {
      setLimitWarning(`Paket ${userPlanObj?.name || 'Gratis'} dibatasi maksimal ${activePermissions.maxDrugsPerCheck} obat per pemeriksaan. Tingkatkan ke paket Pro/Klinik untuk analisis multi-obat tak terbatas!`);
      return;
    }

    if (!selectedDrugs.some((d) => d.id === drugToAdd.id || d.name.toLowerCase() === drugToAdd.name.toLowerCase())) {
      setSelectedDrugs([...selectedDrugs, drugToAdd]);
      setIsSaved(false);
      setLimitWarning(null);
    }
    setSearchInput('');
  };

  // Handle direct custom typed drug search
  const handleAddCustomDrug = () => {
    if (!searchInput.trim()) return;
    
    if (selectedDrugs.length >= activePermissions.maxDrugsPerCheck) {
      setLimitWarning(`Paket ${userPlanObj?.name || 'Gratis'} dibatasi maksimal ${activePermissions.maxDrugsPerCheck} obat per pemeriksaan.`);
      return;
    }

    const resolved = resolveDrugFromDDInter(searchInput.trim(), drugs);
    if (resolved) {
      if (!selectedDrugs.some((d) => d.id === resolved.id || d.name.toLowerCase() === resolved.name.toLowerCase())) {
        setSelectedDrugs([...selectedDrugs, resolved]);
        setIsSaved(false);
        setLimitWarning(null);
      }
    }
    setSearchInput('');
  };

  const handleRemoveDrug = (id: string) => {
    setSelectedDrugs(selectedDrugs.filter((d) => d.id !== id));
    setIsSaved(false);
  };

  // Filter dynamic dropdown
  const searchResults = searchInput.trim()
    ? drugs.filter(
        (d) =>
          d.name.toLowerCase().includes(searchInput.toLowerCase().trim()) ||
          d.genericName.toLowerCase().includes(searchInput.toLowerCase().trim()) ||
          d.brandNames?.some((b) => b.toLowerCase().includes(searchInput.toLowerCase().trim()))
      ).slice(0, 8)
    : [];

  // Match Interactions using resolution matrix
  const matchedInteractions: DrugInteraction[] = [];
  for (let i = 0; i < selectedDrugs.length; i++) {
    for (let j = i + 1; j < selectedDrugs.length; j++) {
      const drugA = selectedDrugs[i];
      const drugB = selectedDrugs[j];
      const found = resolveInteractionPair(drugA, drugB, interactions);
      if (found) {
        matchedInteractions.push(found);
      }
    }
  }

  // Therapeutic Duplications evaluation
  const matchedDuplications = evaluateTherapeuticDuplications(selectedDrugs, SAMPLE_THERAPEUTIC_DUPLICATIONS);

  // Food Interactions evaluation
  const matchedFoodInteractions = evaluateFoodInteractions(selectedDrugs, SAMPLE_FOOD_INTERACTIONS);

  // Determine highest severity
  let highestSeverity: SeverityLevel | 'None' = 'None';
  if (matchedInteractions.some((i) => i.severity === 'Major') || matchedDuplications.length > 0) {
    highestSeverity = 'Major';
  } else if (matchedInteractions.some((i) => i.severity === 'Moderate')) {
    highestSeverity = 'Moderate';
  } else if (matchedInteractions.some((i) => i.severity === 'Minor')) {
    highestSeverity = 'Minor';
  }

  const handleOpenPdfReport = () => {
    if (!currentUser) {
      onOpenAuthModal();
      return;
    }
    if (!activePermissions.canPrintPdfReport) {
      onOpenPricingModal();
      return;
    }
    onOpenReportModal(selectedDrugs, matchedInteractions);
  };

  const presets = [
    {
      title: 'Antikoagulan & Antiplatelet',
      desc: 'Warfarin + Aspirin',
      drugNames: ['Warfarin', 'Aspirin']
    },
    {
      title: 'Statin & Azole',
      desc: 'Simvastatin + Ketoconazole',
      drugNames: ['Simvastatin', 'Ketoconazole']
    },
    {
      title: 'SKA & PPI',
      desc: 'Clopidogrel + Omeprazole',
      drugNames: ['Clopidogrel', 'Omeprazole']
    },
    {
      title: 'Hipertensi & NSAID',
      desc: 'Lisinopril + Ibuprofen',
      drugNames: ['Lisinopril', 'Ibuprofen']
    },
    {
      title: 'Transplantasi & Antijamur',
      desc: 'Tacrolimus + Fluconazole',
      drugNames: ['Tacrolimus', 'Fluconazole']
    }
  ];

  const applyPreset = (drugNames: string[]) => {
    const list: Drug[] = [];
    const seenIds = new Set<string>();
    for (const name of drugNames) {
      const resolved = resolveDrugFromDDInter(name, drugs);
      if (resolved && !seenIds.has(resolved.id)) {
        seenIds.add(resolved.id);
        list.push(resolved);
      }
    }
    setSelectedDrugs(list);
    setIsSaved(false);
  };

  const handleSaveCheck = () => {
    if (!currentUser) {
      onOpenAuthModal();
      return;
    }
    const drugNames = selectedDrugs.map((d) => d.name);
    onSaveHistory(drugNames, matchedInteractions.length, highestSeverity);
    setIsSaved(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 print:hidden">
      
      {/* Dark Teal Banner */}
      <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-[#143d47]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#0a2f38] px-3 py-1 rounded-full text-[11px] font-black text-amber-300 uppercase tracking-wider border border-teal-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Multi-Drug & Food Interaction Engine</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Analisis Interaksi Obat <span className="text-teal-300">Terintegrasi</span>
          </h1>
          <p className="text-teal-100/80 text-xs sm:text-sm leading-relaxed max-w-3xl font-medium">
            Pilih 2 obat atau lebih untuk menganalisis risiko interaksi obat-obat (DDI), interaksi makanan/minuman (DFI), serta duplikasi terapi berdasarkan database klinis terpercaya.
          </p>
        </div>
      </div>

      {/* Preset Scenarios */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#0f766e]" />
          <span>Skenario Interaksi Klinis Populer (Uji Cepat):</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset.drugNames)}
              className="bg-white hover:bg-teal-50/80 p-3 rounded-xl border border-slate-200 hover:border-teal-400 text-left transition-all group shadow-xs cursor-pointer"
            >
              <p className="text-xs font-black text-slate-900 group-hover:text-teal-800 transition-colors">{preset.title}</p>
              <p className="text-[11px] text-teal-700 font-bold">{preset.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Limit Warning Banner for Free Tier */}
      {limitWarning && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs font-black text-amber-950 leading-relaxed">{limitWarning}</p>
          </div>
          <button
            onClick={onOpenPricingModal}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Upgrade ke Pro / Klinik</span>
          </button>
        </div>
      )}

      {/* Drug Selector Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-black text-[#082a24]">Daftar Obat Resep Pasien</h2>
            <p className="text-xs text-slate-500 font-medium">Pilih obat dari katalog atau ketik nama obat apapun untuk ditambahkan ke penapisan.</p>
          </div>
          <span className="bg-teal-50 text-teal-800 text-xs font-black px-3 py-1 rounded-full border border-teal-200">
            {selectedDrugs.length} Obat Dipilih
          </span>
        </div>

        {/* Selected Drugs Chips */}
        <div className="flex flex-wrap items-center gap-2 min-h-[48px] p-3 bg-slate-50 rounded-xl border border-slate-200">
          {selectedDrugs.length > 0 ? (
            selectedDrugs.map((drug) => (
              <div
                key={drug.id}
                className="bg-[#0f766e] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <span>{drug.name}</span>
                <span className="text-[10px] text-teal-200 font-normal">({drug.atcCode || 'Obat'})</span>
                <button
                  onClick={() => handleRemoveDrug(drug.id)}
                  className="hover:bg-white/20 p-0.5 rounded transition-colors cursor-pointer"
                  title="Hapus"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <span className="text-xs text-slate-400 font-medium italic">
              Belum ada obat yang dipilih. Gunakan pencarian di bawah untuk menambahkan minimal 2 obat.
            </span>
          )}
        </div>

        {/* Search Input */}
        <div className="relative space-y-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Ketik nama obat (misal: Warfarin, Atorvastatin, Ketoconazole, Tacrolimus, Sildenafil)..."
              className="w-full pl-10 pr-24 py-2.5 text-xs font-bold text-slate-900 bg-white rounded-xl border border-slate-300 focus:outline-none focus:border-teal-600 shadow-2xs"
            />
            {searchInput.trim().length > 0 && (
              <button
                onClick={handleAddCustomDrug}
                className="absolute right-2 bg-[#0f766e] hover:bg-[#115e59] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                + Tambah
              </button>
            )}
          </div>

          {/* Search Dropdown Suggestions */}
          {searchInput.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-200 z-30 max-h-60 overflow-y-auto divide-y divide-slate-100">
              {searchResults.length > 0 ? (
                searchResults.map((drug) => {
                  const matchingBrand = drug.brandNames?.find((b) =>
                    b.toLowerCase().includes(searchInput.toLowerCase().trim())
                  );

                  return (
                    <button
                      key={drug.id}
                      onClick={() => handleAddDrug(drug)}
                      className="w-full p-2.5 text-left hover:bg-teal-50 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{drug.name}</p>
                          {matchingBrand && (
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.2 rounded border border-amber-300">
                              Merek: {matchingBrand}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {drug.genericName} • {drug.category}
                        </p>
                        {drug.brandNames && drug.brandNames.length > 0 && !matchingBrand && (
                          <p className="text-[10px] text-teal-800 font-bold truncate max-w-sm">
                            Merek ID: {drug.brandNames.join(', ')}
                          </p>
                        )}
                      </div>
                      <span className="bg-[#0f766e] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                        <Plus className="w-3 h-3" /> Tambah
                      </span>
                    </button>
                  );
                })
              ) : null}

              {/* Direct add trigger option */}
              <button
                onClick={handleAddCustomDrug}
                className="w-full p-3 text-left bg-teal-50 hover:bg-teal-100 transition-colors flex items-center justify-between text-teal-900 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-700" />
                  <div>
                    <p className="text-xs font-bold">Tambah "{searchInput}" ke Analisis Interaksi</p>
                    <p className="text-[10px] text-teal-700 font-medium">Ambil parameter & mekanisme klinis langsung</p>
                  </div>
                </div>
                <span className="bg-[#0f766e] text-white text-xs font-bold px-3 py-1 rounded-lg">
                  + Tambah Obat
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Output */}
      {selectedDrugs.length >= 1 ? (
        <div className="space-y-5">
          
          {/* Risk Banner - Crisp High-Contrast Clinical Colors */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md ${
            highestSeverity === 'Major'
              ? 'bg-[#881337] text-white border-rose-900'
              : highestSeverity === 'Moderate'
              ? 'bg-[#78350f] text-white border-amber-900'
              : highestSeverity === 'Minor'
              ? 'bg-[#0e7490] text-white border-cyan-800'
              : 'bg-[#0f766e] text-white border-teal-800'
          }`}>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <h3 className="text-base font-black tracking-tight">
                  {highestSeverity === 'Major' && 'RISIKO TINGGI (MAJOR INTERACTION / DUPLICATION DETECTED)'}
                  {highestSeverity === 'Moderate' && 'RISIKO SEDANG (MODERATE INTERACTION)'}
                  {highestSeverity === 'Minor' && 'RISIKO RINGAN (MINOR MONITORING)'}
                  {highestSeverity === 'None' && 'TIDAK DITEMUKAN INTERAKSI KONTRAINDIKASI'}
                </h3>
              </div>
              <p className="text-xs text-white/90 font-medium">
                Ditemukan <strong>{matchedInteractions.length} pasangan DDI</strong>, <strong>{matchedDuplications.length} duplikasi terapi</strong>, dan <strong>{matchedFoodInteractions.length} interaksi makanan (DFI)</strong>.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenPdfReport}
                className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Printer className="w-3.5 h-3.5 text-teal-700" />
                <span>Cetak Laporan PDF</span>
              </button>

              <button
                onClick={handleSaveCheck}
                disabled={isSaved}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSaved 
                    ? 'bg-emerald-800 text-white opacity-90' 
                    : 'bg-black/30 hover:bg-black/40 text-white hover:scale-[1.02]'
                }`}
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Tersimpan' : 'Simpan Cloud'}</span>
              </button>
            </div>
          </div>

          {/* Therapeutic Duplications Section */}
          {matchedDuplications.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-rose-950 font-black text-sm">
                <CopyX className="w-5 h-5 text-rose-700" />
                <span>Peringatan Duplikasi Terapetik (Therapeutic Duplications)</span>
              </div>
              <div className="space-y-2">
                {matchedDuplications.map((dup) => (
                  <div key={dup.id} className="bg-white p-4 rounded-xl border border-rose-200 text-xs space-y-1 shadow-2xs">
                    <p className="font-black text-slate-900">{dup.drugAName} & {dup.drugBName} <span className="text-rose-700 font-bold">({dup.therapeuticClass})</span></p>
                    <p className="text-slate-600 font-medium">{dup.riskDescription}</p>
                    <p className="text-rose-900 font-bold mt-1">💡 Saran: {dup.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drug-Food Interactions (DFI) Section */}
          {matchedFoodInteractions.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
                <Utensils className="w-5 h-5 text-amber-700" />
                <span>Interaksi Makanan & Minuman (Drug-Food Interactions / DFI)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {matchedFoodInteractions.map((dfi) => (
                  <div key={dfi.id} className="bg-white p-4 rounded-xl border border-amber-200 text-xs space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900">{dfi.drugName} ⚡ {dfi.foodName}</span>
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded">
                        {dfi.foodCategory}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">{dfi.clinicalOutcome}</p>
                    <p className="text-amber-950 font-bold">📌 Petunjuk: {dfi.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual DDI Pairs */}
          {selectedDrugs.length >= 2 && matchedInteractions.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#082a24]">
                Detail Hasil Analisis Interaksi Obat ({matchedInteractions.length})
              </h3>

              {matchedInteractions.map((item) => {
                const badgeColor =
                  item.severity === 'Major'
                    ? 'bg-rose-700 text-white'
                    : item.severity === 'Moderate'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-cyan-700 text-white';

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-slate-900">{item.drugAName}</span>
                        <span className="text-amber-500 font-black">⚡</span>
                        <span className="text-lg font-black text-slate-900">{item.drugBName}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-3 py-0.5 rounded-full ${badgeColor}`}>
                          {item.severity}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          Bukti: {item.evidenceLevel}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                        <p className="font-black text-slate-900">Mekanisme Interaksi:</p>
                        <p className="text-slate-600 leading-relaxed font-medium">{item.mechanism}</p>
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                        <p className="font-black text-slate-900">Dampak Klinis Pasien:</p>
                        <p className="text-slate-600 leading-relaxed font-medium">{item.clinicalOutcome}</p>
                      </div>
                    </div>

                    {/* Management Box */}
                    <div className="bg-teal-50 p-4 rounded-xl border border-teal-200/80 space-y-1">
                      <div className="flex items-center gap-1.5 text-teal-900 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-teal-700" />
                        <span>Solusi & Manajemen Praktik Klinis:</span>
                      </div>
                      <p className="text-xs text-teal-950 leading-relaxed font-medium">
                        {item.management}
                      </p>
                    </div>

                    <div className="text-[10px] text-slate-400 font-semibold text-right">
                      Kode Pasangan DDInter: {item.ddinterPairId}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : selectedDrugs.length >= 2 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-black text-[#082a24]">Aman! Tidak Ditemukan Interaksi Signifikan</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                Kombinasi obat yang Anda pilih tidak menunjukkan efek interaksi berbahaya pada analisis standar database.
              </p>
            </div>
          ) : null}

        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-2 shadow-xs">
          <Info className="w-8 h-8 text-[#0f766e] mx-auto" />
          <h3 className="text-sm font-black text-slate-800">Pilih Minimal 2 Obat untuk Memulai Analisis Interaksi</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
            Gunakan kotak pencarian di atas atau klik contoh skenario klinis di bagian atas.
          </p>
        </div>
      )}

    </div>
  );
};
