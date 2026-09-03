import React, { useState, useEffect } from 'react';
import { Drug, DrugInteraction, UserProfile, SeverityLevel, PricingPlan, DrugDiseaseInteraction } from '../types';
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
  Database,
  Activity,
  HeartPulse,
  Stethoscope,
  Flame,
  UserCheck,
  Layers
} from 'lucide-react';
import { 
  resolveDrugFromDDInter, 
  resolveInteractionPair, 
  evaluateTherapeuticDuplications, 
  evaluateFoodInteractions,
  evaluateDrugDiseaseInteractions
} from '../utils/ddinterEngine';
import { SAMPLE_FOOD_INTERACTIONS, SAMPLE_THERAPEUTIC_DUPLICATIONS, DDINTER_DATASET_INFO } from '../data/ddinterData';
import { DRUG_DISEASE_INTERACTIONS_DATABASE, COMMON_CLINICAL_DISEASES } from '../data/drugDiseaseInteractionsData';
import { CuteMascot, MascotMood } from './CuteMascot';
import { FloatingPillsBackground } from './FloatingPillsBackground';
import { CuteConfettiEffect } from './CuteConfettiEffect';
import { CuteVisualPlaygroundModal } from './CuteVisualPlaygroundModal';
import { playCutePop, playCuteChime, playCuteAlert } from '../utils/cuteSoundEffects';

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
  preselectedDrugNames?: string[];
}

export const InteractionChecker: React.FC<InteractionCheckerProps> = ({
  drugs,
  interactions,
  currentUser,
  pricingPlans = [],
  onSaveHistory,
  onOpenPricingModal,
  onOpenAuthModal,
  onOpenReportModal,
  preselectedDrugName = '',
  preselectedDrugNames = []
}) => {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showDatasetDetails, setShowDatasetDetails] = useState(false);
  const [limitWarning, setLimitWarning] = useState<string | null>(null);
  const [showPlaygroundModal, setShowPlaygroundModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Auto-select when navigating with preselected drug(s)
  useEffect(() => {
    if (preselectedDrugNames && preselectedDrugNames.length > 0) {
      const list: Drug[] = [];
      const seen = new Set<string>();
      preselectedDrugNames.forEach((name) => {
        const resolved = resolveDrugFromDDInter(name, drugs);
        if (resolved && !seen.has(resolved.id)) {
          seen.add(resolved.id);
          list.push(resolved);
        }
      });
      if (list.length > 0) {
        setSelectedDrugs(list);
        setIsSaved(false);
      }
    } else if (preselectedDrugName) {
      const found = resolveDrugFromDDInter(preselectedDrugName, drugs);
      if (found) {
        setSelectedDrugs((prev) => {
          if (!prev.some((d) => d.id === found.id || d.name.toLowerCase() === found.name.toLowerCase())) {
            return [...prev, found];
          }
          return prev;
        });
      }
    }
  }, [preselectedDrugName, preselectedDrugNames, drugs]);
  const isFreePlan = !currentUser || currentUser.subscriptionPlan === 'Gratis' || currentUser.subscriptionPlan === 'Pemula';
  const isProPlan = Boolean(currentUser && (currentUser.subscriptionPlan === 'Pro' || currentUser.role === 'admin'));

  const userPlanObj = pricingPlans?.find(p => 
    p.name.toLowerCase() === currentUser?.subscriptionPlan?.toLowerCase() || 
    (p.id === 'free' && isFreePlan) || 
    (p.id === 'pro' && isProPlan)
  );

  const activePermissions = userPlanObj?.permissions || {
    maxDrugsPerCheck: 99, // Pemula gratis bisa cek interaksi multi-obat tanpa batas
    canPrintPdfReport: isProPlan,
    canAccessFoodInteractions: isProPlan,
    canAccessTherapeuticDuplications: isProPlan,
    canSaveCloudHistory: isProPlan,
    maxHistoryRecords: isProPlan ? 999 : 0,
    canAccessClinicBranding: isProPlan,
    canExportExcelCsv: isProPlan
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
      setLimitWarning(`Paket ${userPlanObj?.name || 'Gratis'} dibatasi maksimal ${activePermissions.maxDrugsPerCheck} obat per pemeriksaan. Tingkatkan ke paket Pro untuk analisis multi-obat tak terbatas!`);
      return;
    }

    if (!selectedDrugs.some((d) => d.id === drugToAdd.id || d.name.toLowerCase() === drugToAdd.name.toLowerCase())) {
      setSelectedDrugs([...selectedDrugs, drugToAdd]);
      setIsSaved(false);
      setLimitWarning(null);
      playCutePop();
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
        playCutePop();
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
          d?.name?.toLowerCase().includes(searchInput.toLowerCase().trim()) ||
          d?.genericName?.toLowerCase().includes(searchInput.toLowerCase().trim()) ||
          d?.brandNames?.some((b) => b?.toLowerCase().includes(searchInput.toLowerCase().trim()))
      ).slice(0, 8)
    : [];

  // Handle toggle disease selection
  const handleToggleDisease = (diseaseName: string) => {
    setSelectedDiseases((prev) =>
      prev.includes(diseaseName) ? prev.filter((d) => d !== diseaseName) : [...prev, diseaseName]
    );
    setIsSaved(false);
  };

  const handleClearDiseases = () => {
    setSelectedDiseases([]);
    setIsSaved(false);
  };

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

  // Food & Lifestyle Interactions evaluation
  const matchedFoodInteractions = evaluateFoodInteractions(selectedDrugs, SAMPLE_FOOD_INTERACTIONS);

  // Drug-Disease Interactions (Contraindications) evaluation
  const matchedDiseaseInteractions = evaluateDrugDiseaseInteractions(
    selectedDrugs,
    selectedDiseases,
    DRUG_DISEASE_INTERACTIONS_DATABASE
  );

  // Determine highest severity
  let highestSeverity: SeverityLevel | 'None' = 'None';
  if (
    matchedInteractions.some((i) => i.severity === 'Major') ||
    matchedDuplications.length > 0 ||
    matchedDiseaseInteractions.some((d) => d.severity === 'Major')
  ) {
    highestSeverity = 'Major';
  } else if (
    matchedInteractions.some((i) => i.severity === 'Moderate') ||
    matchedDiseaseInteractions.some((d) => d.severity === 'Moderate')
  ) {
    highestSeverity = 'Moderate';
  } else if (
    matchedInteractions.some((i) => i.severity === 'Minor') ||
    matchedDiseaseInteractions.some((d) => d.severity === 'Minor')
  ) {
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

  // Trigger celebratory confetti when a safe prescription is evaluated
  useEffect(() => {
    if (selectedDrugs.length >= 2 && highestSeverity === 'None') {
      setShowConfetti(true);
      playCuteChime();
    }
  }, [selectedDrugs.length, highestSeverity]);

  const presets = [
    {
      title: '🌟 Resep Bebas Interaksi (100% Aman)',
      desc: 'Paracetamol + Cetirizine',
      drugNames: ['Paracetamol', 'Cetirizine']
    },
    {
      title: 'Paxlovid & Statin (CYP3A4)',
      desc: 'Paxlovid + Simvastatin',
      drugNames: ['Paxlovid', 'Simvastatin']
    },
    {
      title: 'Antikoagulan & Antiplatelet',
      desc: 'Warfarin + Aspirin',
      drugNames: ['Warfarin', 'Aspirin']
    },
    {
      title: 'Sindrom Serotonin Akut',
      desc: 'Linezolid + Sertraline',
      drugNames: ['Linezolid', 'Sertraline']
    },
    {
      title: 'Statin & Azole',
      desc: 'Simvastatin + Ketoconazole',
      drugNames: ['Simvastatin', 'Ketoconazole']
    },
    {
      title: 'Gout & Makrolida',
      desc: 'Colchicine + Clarithromycin',
      drugNames: ['Colchicine', 'Clarithromycin']
    },
    {
      title: 'Washout ARNI & ACEi',
      desc: 'Sacubitril / Valsartan + Captopril',
      drugNames: ['Sacubitril / Valsartan', 'Captopril']
    },
    {
      title: 'PDE-5 & Nitrat (Hipotensi Fatal)',
      desc: 'Sildenafil + Isosorbide Dinitrate',
      drugNames: ['Sildenafil', 'Isosorbide Dinitrate']
    },
    {
      title: 'Clopidogrel & PPI (CYP2C19)',
      desc: 'Clopidogrel + Lansoprazole',
      drugNames: ['Clopidogrel', 'Lansoprazole']
    },
    {
      title: 'Teofilin & Kuinolon (CYP1A2)',
      desc: 'Theophylline + Ciprofloxacin',
      drugNames: ['Theophylline', 'Ciprofloxacin']
    },
    {
      title: 'Lithium & NSAID (Toksisitas Ginjal)',
      desc: 'Lithium Carbonate + Diclofenac Sodium',
      drugNames: ['Lithium Carbonate', 'Diclofenac Sodium']
    },
    {
      title: 'Amlodipine & Makrolida (CYP3A4 AKI)',
      desc: 'Amlodipine + Clarithromycin',
      drugNames: ['Amlodipine', 'Clarithromycin']
    },
    {
      title: 'DOAC & Azole (Perdarahan Akut)',
      desc: 'Rivaroxaban + Ketoconazole',
      drugNames: ['Rivaroxaban', 'Ketoconazole']
    },
    {
      title: 'Pemanjangan QTc (Torsades de Pointes)',
      desc: 'Levofloxacin + Ondansetron',
      drugNames: ['Levofloxacin', 'Ondansetron']
    },
    {
      title: 'Dual RAAS Blockade (AKI & Hipotensi)',
      desc: 'Captopril + Candesartan',
      drugNames: ['Captopril', 'Candesartan']
    },
    {
      title: 'Litium & Diuretik Tiazid',
      desc: 'Lithium + Hydrochlorothiazide',
      drugNames: ['Lithium', 'Hydrochlorothiazide']
    },
    {
      title: 'Methotrexate & NSAID (Supresi Sumsum)',
      desc: 'Methotrexate + Ibuprofen',
      drugNames: ['Methotrexate', 'Ibuprofen']
    },
    {
      title: 'Incretin & Sulfonilurea (Hipoglikemia)',
      desc: 'Semaglutide + Glibenclamide',
      drugNames: ['Semaglutide', 'Glibenclamide']
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
    playCutePop();
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
    <div className="space-y-6 print:hidden">
      
      {/* HERO BANNER - CRIMSON RUBY & DARK OBSIDIAN */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c0407] via-[#1a0812] to-[#260d1b] p-6 sm:p-8 text-white shadow-2xl border border-rose-500/25">
        <FloatingPillsBackground density="normal" accentColor="#fb7185" />
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <ShieldAlert className="w-48 h-48 text-rose-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold font-outfit">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Multi-Consensus Drug &amp; Food Interaction Engine</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shadow-lg shadow-rose-950/50 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Analisis Interaksi Obat &amp; Duplikasi Terapi
                </h1>
                <p className="text-xs sm:text-sm text-rose-100/80 font-medium">
                  Evaluasi komprehensif risiko interaksi obat-obat (DDI), makanan/minuman (DFI), dan duplikasi terapi tervalidasi 6 database global.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-rose-200">
                <Layers className="w-3.5 h-3.5 text-rose-400" />
                <span>Konsensus 6 Database Global</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-amber-200">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Skrining Duplikasi &amp; Makanan</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-red-200">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>Gradasi Major, Moderate &amp; Minor</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10">
            {/* Live Reactive Cute Mascot */}
            <div className="hidden lg:block">
              <CuteMascot
                mood={
                  selectedDrugs.length === 0
                    ? 'happy'
                    : highestSeverity === 'Major'
                    ? 'danger'
                    : highestSeverity === 'Moderate'
                    ? 'alert'
                    : highestSeverity === 'Minor'
                    ? 'thinking'
                    : 'happy'
                }
                size="sm"
                interactive={true}
                speechBubble={
                  selectedDrugs.length === 0
                    ? 'Yuk racik resep! ✨'
                    : highestSeverity === 'Major'
                    ? 'Awas bahaya! ⚠️'
                    : highestSeverity === 'Moderate'
                    ? 'Cek jeda jam ya 🧐'
                    : highestSeverity === 'Minor'
                    ? 'Pantau ringan ya'
                    : '100% Aman! 👍'
                }
              />
            </div>

            <div className="flex flex-col items-stretch sm:items-end gap-2.5">
              <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-rose-950/60 text-right shadow-md">
                <span className="text-[11px] text-slate-400 block font-medium">Basis Data Terverifikasi:</span>
                <span className="text-lg font-black text-rose-400">{drugs.length.toLocaleString('id-ID')} Obat &amp; {interactions.length.toLocaleString('id-ID')} Interaksi</span>
              </div>

              <button
                onClick={() => {
                  setShowPlaygroundModal(true);
                  playCutePop();
                }}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white text-xs font-black shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 cursor-pointer active:scale-95 hover:scale-105 transition-all border border-pink-300/40"
              >
                <span className="text-sm">🧸</span>
                <span>Coba Visual &amp; Maskot Lucu</span>
              </button>
            </div>
          </div>
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
            <span>Upgrade ke Pro</span>
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
                {drug.blackBoxWarning && (
                  <span className="bg-rose-900/90 text-rose-200 text-[9px] px-1.5 py-0.5 rounded font-black border border-rose-400/40" title="Obat memiliki FDA Boxed Warning (Peringatan Khusus)">
                    ⚠️ Boxed
                  </span>
                )}
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

        {/* Comorbidity / Patient Disease Conditions Selector */}
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200">
                <Stethoscope className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Riwayat Komorbiditas & Penyakit Pasien</span>
                  <span className="text-[10px] text-teal-700 dark:text-teal-300 font-bold bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                    Opsional / Skrining Kontraindikasi
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Klik kondisi pasien untuk mendeteksi kontraindikasi obat terhadap penyakit (Drug-Disease Interactions & Beers Criteria).
                </p>
              </div>
            </div>

            {selectedDiseases.length > 0 && (
              <button
                onClick={handleClearDiseases}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset ({selectedDiseases.length})</span>
              </button>
            )}
          </div>

          {/* Quick Disease Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {COMMON_CLINICAL_DISEASES.map((dis) => {
              const isSelected = selectedDiseases.includes(dis.name);
              return (
                <button
                  key={dis.id}
                  onClick={() => handleToggleDisease(dis.name)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-700 shadow-xs scale-[1.02]'
                      : 'bg-white dark:bg-[#071c21] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:text-teal-700'
                  }`}
                >
                  <span>{dis.icon}</span>
                  <span>{dis.name}</span>
                  {isSelected && <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Analysis Output */}
      {selectedDrugs.length >= 1 ? (
        <div className="space-y-5">
          
          {/* Risk Banner - Hospital EMR Standard Clinical Severity Palette */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md ${
            highestSeverity === 'Major'
              ? 'bg-gradient-to-r from-rose-900 via-rose-950 to-slate-950 text-white border-rose-700/80'
              : highestSeverity === 'Moderate'
              ? 'bg-gradient-to-r from-amber-900 via-amber-950 to-slate-950 text-white border-amber-600/80'
              : highestSeverity === 'Minor'
              ? 'bg-gradient-to-r from-sky-900 via-sky-950 to-slate-950 text-white border-sky-600/80'
              : 'bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-950 text-white border-teal-600/80'
          }`}>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <h3 className="text-base font-black tracking-tight">
                  {highestSeverity === 'Major' && 'RISIKO TINGGI (KONTRAINDIKASI / MAJOR INTERACTION DETECTED)'}
                  {highestSeverity === 'Moderate' && 'RISIKO SEDANG (MODERATE RISK / CAUTION)'}
                  {highestSeverity === 'Minor' && 'RISIKO RINGAN (MINOR MONITORING)'}
                  {highestSeverity === 'None' && 'TIDAK DITEMUKAN KONTRAINDIKASI ATAU INTERAKSI BERBAHAYA'}
                </h3>
              </div>
              <p className="text-xs text-white/90 font-medium">
                Ditemukan: <strong>{matchedInteractions.length} pasangan DDI</strong>, <strong>{matchedDiseaseInteractions.length} kontraindikasi penyakit</strong>, <strong>{matchedDuplications.length} duplikasi terapi</strong>, dan <strong>{matchedFoodInteractions.length} interaksi makanan/lifestyle</strong>.
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

          {/* Safe Prescription Celebration Card */}
          {highestSeverity === 'None' && selectedDrugs.length >= 2 && (
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border-2 border-emerald-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in">
              <FloatingPillsBackground density="low" accentColor="#10b981" />
              <div className="relative z-10 flex items-center gap-4">
                <CuteMascot mood="happy" size="sm" speechBubble="Aman 100%! 🌟" interactive={true} />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] mb-1 font-outfit uppercase">
                    <span>Terverifikasi Bebas Interaksi</span>
                  </div>
                  <h4 className="text-sm font-black text-emerald-950 dark:text-emerald-200 font-outfit">
                    Resep Ini Lolos Seluruh Penapisan Interaksi Klinis!
                  </h4>
                  <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                    Tidak ditemukan interaksi antar-obat (DDI), kontraindikasi penyakit, maupun duplikasi terapeutik.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowConfetti(true);
                  playCuteChime();
                }}
                className="relative z-10 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 hover:scale-105 transition-all shrink-0"
              >
                <span>🎉 Ulangi Selebrasi</span>
              </button>
            </div>
          )}

          {/* Drug-Disease Interactions (Contraindications) Section - Bold Amber/Rose Danger Styling */}
          {matchedDiseaseInteractions.length > 0 && (
            <div className="bg-gradient-to-r from-red-50/95 via-rose-50/95 to-amber-50/95 dark:from-rose-950/40 dark:via-red-950/40 dark:to-amber-950/40 border-2 border-rose-400 dark:border-rose-700 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 flex-wrap border-b border-rose-200 dark:border-rose-800/80 pb-3">
                <div className="flex items-center gap-2 text-rose-950 dark:text-rose-200 font-black text-sm">
                  <span className="p-1.5 rounded-lg bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-100">
                    <HeartPulse className="w-4 h-4" />
                  </span>
                  <span>Peringatan Kontraindikasi Obat terhadap Penyakit (Drug-Disease Interactions)</span>
                </div>
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-rose-600 text-white shadow-xs">
                  {matchedDiseaseInteractions.length} Kontraindikasi Ditemukan
                </span>
              </div>

              <div className="space-y-3">
                {matchedDiseaseInteractions.map((item) => {
                  const isAbsolute = item.contraindicationLevel.includes('Absolute');
                  return (
                    <div
                      key={item.id}
                      className="clinical-card-major rounded-xl p-4 sm:p-5 border shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/10 pb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-slate-900 dark:text-white text-sm">💊 {item.drugName}</span>
                          <span className="text-rose-600 font-black">❌ KONTRAINDIKASI DENGAN</span>
                          <span className="bg-white/90 dark:bg-slate-800 text-rose-950 dark:text-rose-200 text-xs font-black px-2.5 py-0.5 rounded-lg border border-rose-300 dark:border-rose-700">
                            🩺 {item.diseaseName}
                          </span>
                        </div>
                        <span className={isAbsolute ? 'clinical-badge-major' : 'clinical-badge-moderate'}>
                          {isAbsolute ? '⛔ MUTLAK / ABSOLUTE' : '⚠️ RELATIF / CAUTION'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                        <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                          <p className="font-black text-slate-900 dark:text-white">Mekanisme Patologis:</p>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{item.mechanism}</p>
                        </div>

                        <div className="bg-rose-50/60 dark:bg-rose-950/30 p-3 rounded-lg border border-rose-200/80 dark:border-rose-900/50 space-y-0.5">
                          <p className="font-black text-rose-950 dark:text-rose-200">Bahaya & Risiko Klinis:</p>
                          <p className="text-rose-900 dark:text-rose-300 leading-relaxed font-bold">{item.clinicalRisk}</p>
                        </div>
                      </div>

                      <div className="bg-teal-50/80 dark:bg-teal-950/40 p-3.5 rounded-lg border border-teal-200/80 dark:border-teal-900 text-xs space-y-0.5">
                        <div className="flex items-center gap-1.5 text-teal-900 dark:text-teal-200 font-black">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                          <span>Rekomendasi Tindakan Klinis:</span>
                        </div>
                        <p className="text-teal-950 dark:text-teal-100 font-medium leading-relaxed">
                          {item.recommendation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Therapeutic Duplications Section - Cute Berry/Pink Styling */}
          {matchedDuplications.length > 0 && (
            <div className="bg-gradient-to-r from-pink-50/90 via-rose-50/90 to-pink-50/90 dark:from-pink-950/30 dark:via-rose-950/30 dark:to-pink-950/30 border border-pink-300 dark:border-pink-800/80 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-pink-950 dark:text-pink-200 font-black text-sm">
                <span className="p-1 rounded-lg bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300">
                  <CopyX className="w-4 h-4" />
                </span>
                <span>Peringatan Duplikasi Terapetik (Therapeutic Duplications)</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-pink-200 dark:bg-pink-900 text-pink-900 dark:text-pink-200">
                  {matchedDuplications.length} Duplikasi
                </span>
              </div>
              <div className="space-y-2">
                {matchedDuplications.map((dup) => (
                  <div key={dup.id} className="bg-white dark:bg-[#071c21] p-4 rounded-xl border border-pink-200 dark:border-pink-800/60 text-xs space-y-1.5 shadow-2xs hover:border-pink-400 transition-all">
                    <p className="font-black text-slate-900 dark:text-white flex items-center gap-1.5 flex-wrap">
                      <span>💊 {dup.drugAName} & {dup.drugBName}</span>
                      <span className="bg-pink-100 dark:bg-pink-900/60 text-pink-800 dark:text-pink-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-pink-300 dark:border-pink-700">
                        {dup.therapeuticClass}
                      </span>
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{dup.riskDescription}</p>
                    <p className="text-pink-900 dark:text-pink-300 font-bold mt-1 bg-pink-50 dark:bg-pink-950/40 p-2 rounded-lg border border-pink-200/60 dark:border-pink-900/50">
                      💡 Saran Apoteker: {dup.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual DDI Pairs (Drug-Drug Interactions) */}
          {selectedDrugs.length >= 2 && matchedInteractions.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#082a24] dark:text-teal-200">
                Detail Hasil Analisis Interaksi Antar Obat ({matchedInteractions.length})
              </h3>

              {matchedInteractions.map((item) => {
                const isMajor = item.severity === 'Major';
                const isMod = item.severity === 'Moderate';
                const cardSeverityClass = isMajor 
                  ? 'clinical-card-major' 
                  : isMod 
                  ? 'clinical-card-moderate' 
                  : 'clinical-card-minor';
                const badgeSeverityClass = isMajor
                  ? 'clinical-badge-major'
                  : isMod
                  ? 'clinical-badge-moderate'
                  : 'clinical-badge-minor';

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-5 sm:p-6 border shadow-sm space-y-4 text-left transition-all ${cardSeverityClass}`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">{item.drugAName}</span>
                        <span className="text-amber-500 font-black">⚡</span>
                        <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">{item.drugBName}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={badgeSeverityClass}>
                          {isMajor ? '⚠️ MAJOR / KONTRAINDIKASI' : isMod ? '⚡ MODERATE / MONITORING' : 'ℹ️ MINOR / WASPADA'}
                        </span>
                        <span className="bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                          Bukti: {item.evidenceLevel}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white/90 dark:bg-slate-900/70 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                        <p className="font-black text-slate-900 dark:text-white">Mekanisme Interaksi:</p>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{item.mechanism}</p>
                      </div>

                      <div className="bg-white/90 dark:bg-slate-900/70 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                        <p className="font-black text-slate-900 dark:text-white">Dampak Klinis Pasien:</p>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{item.clinicalOutcome}</p>
                      </div>
                    </div>

                    {/* Management Box */}
                    <div className="bg-white/95 dark:bg-slate-900/85 p-4 rounded-xl border border-teal-300/60 dark:border-teal-800/80 space-y-1 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-teal-900 dark:text-teal-200 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                        <span>Solusi &amp; Manajemen Praktik Klinis:</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                        {item.management}
                      </p>
                    </div>

                    {/* EBM Scientific Verification Strip */}
                    <div className="pt-2 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                          <span>Level Bukti Ilmiah: <strong>Tingkat {item.evidenceLevel}</strong></span>
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-slate-600 dark:text-slate-400">
                          Rujukan: <strong>DDInter Nature Protocol &amp; Panduan Terapi</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 dark:text-slate-500">
                        <span>ID Verifikasi:</span>
                        <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs">
                          {item.ddinterPairId}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : selectedDrugs.length >= 2 ? (
            <div className="clinical-card-safe p-8 rounded-2xl border text-center space-y-2.5 shadow-xs">
              <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-black text-emerald-950 dark:text-emerald-200">
                  Kompatibilitas Aman: Tidak Ditemukan Interaksi Signifikan
                </h3>
                <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 max-w-md mx-auto font-medium leading-relaxed">
                  Kombinasi obat yang Anda pilih tidak menunjukkan efek interaksi obat-dengan-obat (DDI) yang membahayakan pada analisis standar konsensus klinis DDInter &amp; Drugs.com.
                </p>
              </div>
            </div>
          ) : null}

          {/* Drug-Food & Lifestyle Interactions (DFI) Section - Sweet Lavender Styling */}
          {matchedFoodInteractions.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50/90 via-fuchsia-50/90 to-purple-50/90 dark:from-purple-950/30 dark:via-fuchsia-950/30 dark:to-purple-950/30 border border-purple-300 dark:border-purple-800/80 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-purple-950 dark:text-purple-200 font-black text-sm">
                <span className="p-1 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                  <Utensils className="w-4 h-4" />
                </span>
                <span>Interaksi Makanan, Minuman & Gaya Hidup (Food & Lifestyle / DFI)</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200">
                  {matchedFoodInteractions.length} Interaksi
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {matchedFoodInteractions.map((dfi) => (
                  <div key={dfi.id} className="bg-white dark:bg-[#071c21] p-4 rounded-xl border border-purple-200 dark:border-purple-800/60 text-xs space-y-1.5 shadow-2xs hover:border-purple-400 transition-all">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-black text-slate-900 dark:text-white flex items-center gap-1">
                        <span>💊 {dfi.drugName}</span>
                        <span className="text-purple-600 dark:text-purple-400">⚡</span>
                        <span>🥗 {dfi.foodName}</span>
                      </span>
                      <span className="bg-purple-100 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200 text-[10px] font-black px-2 py-0.5 rounded-md border border-purple-300 dark:border-purple-700 shadow-2xs">
                        {dfi.foodCategory}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{dfi.clinicalOutcome}</p>
                    <p className="text-purple-950 dark:text-purple-200 font-bold bg-purple-50 dark:bg-purple-950/40 p-2 rounded-lg border border-purple-200/60 dark:border-purple-900/50">
                      📌 Petunjuk Konsumsi: {dfi.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EBM Scientific Framework & Institutional Standards Footer */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Basis Ilmiah &amp; Standar Regulasi Terverifikasi (EBM Standards)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Algoritma penapisan interaksi FarmasiDruggist dibangun di atas konsensus farmakologi global dan nasional.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Audit Mutu Data: September 2026</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/80 space-y-1">
                <span className="text-xs font-black text-slate-900 dark:text-white block">🔬 DDInter Nature Protocol</span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">Kurasi mekanisme kinetik &amp; dinamik multi-agen dengan ID relasi unik.</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/80 space-y-1">
                <span className="text-xs font-black text-slate-900 dark:text-white block">📖 Farmakope Indonesia VI</span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">Monografi resmi zat aktif, kelarutan, pH stabilitas, dan pedoman BPOM RI.</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/80 space-y-1">
                <span className="text-xs font-black text-slate-900 dark:text-white block">🏥 Permenkes RI No. 73/2016</span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">Standar baku Pelayanan Kefarmasian &amp; pengkajian resep di apotek.</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/80 space-y-1">
                <span className="text-xs font-black text-slate-900 dark:text-white block">👴 Beers Criteria &amp; STOPP</span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">Evaluasi peresepan berpotensi tidak tepat (PIMs) pada populasi geriatri.</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 dark:text-slate-400 italic pt-1 text-center sm:text-left">
              *Catatan Medis: Sistem ini berfungsi sebagai instrumen pendukung keputusan klinis (Clinical Decision Support System / CDSS). Keputusan intervensi resep sepenuhnya berada pada wewenang profesional apoteker dan dokter penanggung jawab.
            </p>
          </div>

        </div>
      ) : (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-rose-50/30 to-slate-50 dark:from-[#0c121e] dark:via-[#160c14] dark:to-[#080d16] p-8 sm:p-12 border-2 border-dashed border-rose-300/80 dark:border-rose-900/60 text-center space-y-4 shadow-sm">
          <FloatingPillsBackground density="low" accentColor="#fb7185" />
          
          <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
            <CuteMascot
              mood="thinking"
              size="lg"
              interactive={true}
              speechBubble="Meja racik masih kosong nih! Ketik nama obat di atas yuk~ 🔍"
            />

            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-outfit">
                Pilih Minimal 2 Obat untuk Memulai Analisis Klinis
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Gunakan kolom pencarian di atas, atau klik salah satu skenario uji cepat di atas untuk melihat penapisan interaksi, kontraindikasi penyakit, dan duplikasi terapi secara instan.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={() => applyPreset(['Paracetamol', 'Cetirizine'])}
                className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>🌟 Coba Resep Aman</span>
              </button>
              <button
                onClick={() => applyPreset(['Paxlovid', 'Simvastatin'])}
                className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-800 dark:text-rose-300 text-xs font-bold border border-rose-300 dark:border-rose-800 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>⚠️ Coba Interaksi Mayor</span>
              </button>
              <button
                onClick={() => {
                  setShowPlaygroundModal(true);
                  playCutePop();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
              >
                <span>🧸 Buka Taman Visual Lucu</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confetti Celebration on Safe Prescriptions */}
      <CuteConfettiEffect
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Interactive Cute Visual Playground Modal */}
      <CuteVisualPlaygroundModal
        isOpen={showPlaygroundModal}
        onClose={() => setShowPlaygroundModal(false)}
      />

    </div>
  );
};
