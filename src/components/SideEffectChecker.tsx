import React, { useState, useMemo } from 'react';
import { Drug, ClinicBrandingSettings } from '../types';
import { 
  ORGAN_TOXICITY_CATEGORIES, 
  DRUG_TOXICITY_PROFILES, 
  ADR_SYMPTOM_DATABASE, 
  NARANJO_QUESTIONS, 
  interpretNaranjoScore,
  WHO_UMC_CATEGORIES,
  HARTWIG_SEVERITY_LEVELS,
  SCHUMOCK_QUESTIONS,
  evaluateSchumockResult,
  BpomYellowFormReport,
  DEFAULT_BPOM_YELLOW_FORM
} from '../data/sideEffectData';
import { 
  Search, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  HeartPulse, 
  Zap, 
  Eye, 
  Moon, 
  VolumeX, 
  Flame, 
  Printer, 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  Sparkles, 
  ChevronRight, 
  Stethoscope, 
  X, 
  FileText,
  Clock,
  ArrowRight,
  Pill,
  Globe,
  BarChart3,
  ShieldCheck,
  Check,
  Building,
  User,
  Download
} from 'lucide-react';

interface SideEffectCheckerProps {
  allDrugs: Drug[];
  clinicBranding?: ClinicBrandingSettings;
  onOpenBrandingModal?: () => void;
  onSelectTab?: (tab: string) => void;
  isProUser?: boolean;
  onOpenPricingModal?: () => void;
}

export const SideEffectChecker: React.FC<SideEffectCheckerProps> = ({
  allDrugs,
  clinicBranding,
  onOpenBrandingModal,
  isProUser = true,
  onOpenPricingModal
}) => {
  // State for selected drugs
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>(() => {
    // Default sample case: Azithromycin + Ondansetron + Paracetamol
    const d1 = allDrugs.find(d => d.id === 'drug-azithromycin' || d.name.toLowerCase().includes('azithromycin'));
    const d2 = allDrugs.find(d => d.id === 'drug-ondansetron' || d.name.toLowerCase().includes('ondansetron'));
    const d3 = allDrugs.find(d => d.id === 'drug-paracetamol' || d.name.toLowerCase().includes('paracetamol'));
    return [d1, d2, d3].filter(Boolean) as Drug[];
  });

  // State for active main subtab
  const [activeSubtab, setActiveSubtab] = useState<'overlap' | 'symptoms' | 'meso_suite' | 'bpom_form' | 'mitigation'>('overlap');

  // State for active MESO tool inside 'meso_suite'
  const [activeMesoTool, setActiveMesoTool] = useState<'naranjo' | 'who_umc' | 'hartwig' | 'schumock'>('naranjo');

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Selected symptom for Reverse ADR Tab
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>('symptom-dry-cough');
  const [symptomSearch, setSymptomSearch] = useState('');

  // 1. Naranjo Questionnaire State
  const [naranjoAnswers, setNaranjoAnswers] = useState<Record<number, 'yes' | 'no' | 'unknown'>>({
    1: 'yes',
    2: 'yes',
    3: 'yes',
    4: 'no',
    5: 'no',
    6: 'no',
    7: 'unknown',
    8: 'unknown',
    9: 'unknown',
    10: 'yes'
  });
  const [suspectedDrugForNaranjo, setSuspectedDrugForNaranjo] = useState<string>('');

  // 2. WHO-UMC State
  const [selectedWhoUmcId, setSelectedWhoUmcId] = useState<string>('probable');

  // 3. Hartwig & Siegel State
  const [selectedHartwigLevel, setSelectedHartwigLevel] = useState<number>(3);

  // 4. Schumock & Thornton State
  const [schumockAnswers, setSchumockAnswers] = useState<Record<string, boolean>>({
    A1: false,
    A2: false,
    A3: false,
    A4: false,
    B1: true,
    B2: false
  });

  // 5. BPOM Yellow Form State
  const [bpomForm, setBpomForm] = useState<BpomYellowFormReport>(DEFAULT_BPOM_YELLOW_FORM);

  // Filtered drug list for auto-complete
  const filteredDrugs = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allDrugs
      .filter(d => 
        d.name.toLowerCase().includes(query) || 
        (d.genericName && d.genericName.toLowerCase().includes(query)) ||
        (d.brandNames && d.brandNames.some(b => b.toLowerCase().includes(query)))
      )
      .slice(0, 10);
  }, [allDrugs, searchQuery]);

  const handleAddDrug = (drug: Drug) => {
    if (!selectedDrugs.some(d => d.id === drug.id)) {
      setSelectedDrugs(prev => [...prev, drug]);
    }
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleRemoveDrug = (drugId: string) => {
    setSelectedDrugs(prev => prev.filter(d => d.id !== drugId));
  };

  const handleClearAll = () => {
    setSelectedDrugs([]);
  };

  // Sample Presets
  const applyPreset = (presetName: string) => {
    let targetNames: string[] = [];
    if (presetName === 'qtc') {
      targetNames = ['amiodarone', 'azithromycin', 'ondansetron', 'haloperidol'];
    } else if (presetName === 'renal') {
      targetNames = ['gentamicin', 'furosemide', 'vancomycin', 'ibuprofen'];
    } else if (presetName === 'sedation') {
      targetNames = ['alprazolam', 'tramadol', 'chlorpheniramine', 'amitriptyline'];
    } else if (presetName === 'hepar') {
      targetNames = ['paracetamol', 'amoxicillin', 'atorvastatin', 'ketoconazole'];
    } else if (presetName === 'electrolyte') {
      targetNames = ['spironolactone', 'potassium', 'captopril'];
    }

    const matched = allDrugs.filter(d => 
      targetNames.some(t => d.name.toLowerCase().includes(t) || (d.genericName && d.genericName.toLowerCase().includes(t)))
    );
    setSelectedDrugs(matched);
  };

  // 1. Organ Toxicity Overlap Evaluation Logic
  const toxicityAnalysis = useMemo(() => {
    const categoryResults = ORGAN_TOXICITY_CATEGORIES.map(category => {
      const contributingDrugs: {
        drug: Drug;
        profile?: (typeof DRUG_TOXICITY_PROFILES)[0];
        matchedEvidence: string[];
      }[] = [];

      let totalWeight = 0;

      selectedDrugs.forEach(drug => {
        const drugId = drug.id.toLowerCase();
        const drugName = drug.name.toLowerCase();
        const genericName = (drug.genericName || '').toLowerCase();
        const allText = `${drug.name} ${drug.genericName || ''} ${drug.sideEffects || ''} ${drug.adverseEffects || ''} ${drug.blackBoxWarning || ''}`.toLowerCase();

        // 1. Check curated profiles
        const profile = DRUG_TOXICITY_PROFILES.find(p => 
          p.toxicityCategory === category.id && 
          (p.drugId === drugId || drugName.includes(p.drugName.toLowerCase()) || genericName.includes(p.drugName.toLowerCase()))
        );

        // 2. Keyword heuristic check
        let isKeywordMatch = false;
        const matchedEvidence: string[] = [];

        if (profile) {
          matchedEvidence.push(profile.mechanism);
          totalWeight += profile.weightScore;
        } else {
          // Heuristic matching
          if (category.id === 'qtc_cardiac' && (allText.includes('qtc') || allText.includes('torsades') || allText.includes('aritmia ventrikel'))) {
            isKeywordMatch = true;
            matchedEvidence.push('Potensi pemanjangan repolarisasi ventrikel / aritmia kardiak');
            totalWeight += 2;
          } else if (category.id === 'hepatotoxicity' && (allText.includes('hepatotoksisitas') || allText.includes('sgot') || allText.includes('dili') || allText.includes('ikterus') || allText.includes('hati'))) {
            isKeywordMatch = true;
            matchedEvidence.push('Potensi kenaikan enzim transaminase atau cedera hepatosit');
            totalWeight += 2;
          } else if (category.id === 'nephrotoxicity' && (allText.includes('nefrotoksisitas') || allText.includes('kreatinin') || allText.includes('gagal ginjal') || allText.includes('tubulus'))) {
            isKeywordMatch = true;
            matchedEvidence.push('Beban filtrasi glomerulus atau potensi cedera tubulus ginjal');
            totalWeight += 2;
          } else if (category.id === 'cns_sedation' && (allText.includes('somnolen') || allText.includes('mengantuk') || allText.includes('depresi ssp') || allText.includes('sedasi') || allText.includes('gaba'))) {
            isKeywordMatch = true;
            matchedEvidence.push('Efek sedatif sentral / depresi sistem saraf pusat');
            totalWeight += 2;
          } else if (category.id === 'anticholinergic' && (allText.includes('antikolinergik') || allText.includes('mulut kering') || allText.includes('retensi urin') || allText.includes('delirium'))) {
            isKeywordMatch = true;
            matchedEvidence.push('Aktivitas antagonis reseptor muskarinik antikolinergik');
            totalWeight += 2;
          } else if (category.id === 'gi_bleeding' && (allText.includes('perdarahan saluran cerna') || allText.includes('ulkus') || allText.includes('melena') || allText.includes('cox-1'))) {
            isKeywordMatch = true;
            matchedEvidence.push('Iritasi mukosa gaster atau supresi prostaglandin protektif');
            totalWeight += 2;
          } else if (category.id === 'electrolyte' && (allText.includes('hiperkalemia') || allText.includes('hipokalemia') || allText.includes('elektrolit'))) {
            isKeywordMatch = true;
            matchedEvidence.push('Potensi fluktuasi elektrolit renal');
            totalWeight += 2;
          } else if (category.id === 'ototoxicity' && (allText.includes('ototoksisitas') || allText.includes('tinitus') || allText.includes('pendengaran') || allText.includes('koklea'))) {
            isKeywordMatch = true;
            matchedEvidence.push('Potensi gangguan sel rambut koklea / vestibular telinga');
            totalWeight += 3;
          } else if (category.id === 'dermatology' && (allText.includes('stevens-johnson') || allText.includes('sjs') || allText.includes('dress') || allText.includes('ruam makulopapular'))) {
            isKeywordMatch = true;
            matchedEvidence.push('Potensi reaksi hipersensitivitas erupsi kulit berat');
            totalWeight += 2;
          }
        }

        if (profile || isKeywordMatch) {
          contributingDrugs.push({
            drug,
            profile,
            matchedEvidence
          });
        }
      });

      // Calculate risk level
      let riskLevel: 'Aman' | 'Rendah' | 'Sedang' | 'Tinggi' | 'Kritis' = 'Aman';
      let riskColor = 'text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-300';
      let progressBarColor = 'bg-slate-400';

      if (totalWeight >= 6 || contributingDrugs.length >= 3) {
        riskLevel = 'Kritis';
        riskColor = 'text-red-700 bg-red-100 dark:bg-red-950/80 dark:text-red-300 border-red-300 dark:border-red-800';
        progressBarColor = 'bg-red-600';
      } else if (totalWeight >= 4 || contributingDrugs.length === 2) {
        riskLevel = 'Tinggi';
        riskColor = 'text-amber-700 bg-amber-100 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800';
        progressBarColor = 'bg-amber-500';
      } else if (totalWeight >= 2 || contributingDrugs.length === 1) {
        riskLevel = 'Sedang';
        riskColor = 'text-yellow-700 bg-yellow-100 dark:bg-yellow-950/80 dark:text-yellow-300 border-yellow-300 dark:border-yellow-800';
        progressBarColor = 'bg-yellow-500';
      } else if (totalWeight > 0) {
        riskLevel = 'Rendah';
        riskColor = 'text-blue-700 bg-blue-100 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800';
        progressBarColor = 'bg-blue-500';
      }

      return {
        category,
        contributingDrugs,
        totalWeight,
        riskLevel,
        riskColor,
        progressBarColor,
        isElevated: totalWeight > 0
      };
    });

    // Sort so elevated toxicities come first
    return categoryResults.sort((a, b) => b.totalWeight - a.totalWeight);
  }, [selectedDrugs]);

  // Overall Regimen Risk Summary
  const overallRiskStats = useMemo(() => {
    const elevated = toxicityAnalysis.filter(t => t.totalWeight > 0);
    const criticalCount = toxicityAnalysis.filter(t => t.riskLevel === 'Kritis').length;
    const highCount = toxicityAnalysis.filter(t => t.riskLevel === 'Tinggi').length;
    const moderateCount = toxicityAnalysis.filter(t => t.riskLevel === 'Sedang').length;

    let overallGrade: 'Rendah' | 'Sedang' | 'Tinggi' | 'Kritis' = 'Rendah';
    if (criticalCount > 0) overallGrade = 'Kritis';
    else if (highCount >= 2 || (highCount >= 1 && moderateCount >= 2)) overallGrade = 'Tinggi';
    else if (highCount === 1 || moderateCount >= 2) overallGrade = 'Sedang';

    return {
      elevatedCount: elevated.length,
      criticalCount,
      highCount,
      moderateCount,
      overallGrade
    };
  }, [toxicityAnalysis]);

  // 2. Reverse Symptom Checker Evaluation Logic
  const activeSymptom = useMemo(() => {
    return ADR_SYMPTOM_DATABASE.find(s => s.id === selectedSymptomId) || ADR_SYMPTOM_DATABASE[0];
  }, [selectedSymptomId]);

  const matchedCausativeDrugs = useMemo(() => {
    if (!activeSymptom) return [];

    const results: {
      drug: Drug;
      probability: 'Sangat Tinggi (Very High)' | 'Tinggi (High)' | 'Sedang (Moderate)';
      mechanism: string;
      onset: string;
      mitigation: string;
    }[] = [];

    selectedDrugs.forEach(drug => {
      const drugName = drug.name.toLowerCase();
      const genericName = (drug.genericName || '').toLowerCase();
      const allText = `${drug.name} ${drug.genericName || ''} ${drug.sideEffects || ''} ${drug.adverseEffects || ''}`.toLowerCase();

      // Check if this drug is listed in causative drugs
      const match = activeSymptom.commonCausativeDrugs.find(c => {
        const keywords = (c.genericMatch || c.drugName).toLowerCase().split(',').map(k => k.trim());
        return keywords.some(k => drugName.includes(k) || genericName.includes(k));
      });

      if (match) {
        results.push({
          drug,
          probability: match.probability,
          mechanism: match.mechanism,
          onset: match.onset,
          mitigation: match.mitigation
        });
      } else {
        // Check if symptom words exist in drug's side effects text
        const symptomWords = activeSymptom.symptomName.toLowerCase().split(/[\s,()]+/).filter(w => w.length > 3);
        const hasTextMatch = symptomWords.some(w => allText.includes(w));
        if (hasTextMatch) {
          results.push({
            drug,
            probability: 'Sedang (Moderate)',
            mechanism: `Efek samping tercantum pada profil monografi resmi ${drug.name}.`,
            onset: 'Bervariasi sesuai dosis dan durasi pemakaian',
            mitigation: 'Evaluasi respons klinis dan pertimbangkan penurunan dosis atau obat alternatif.'
          });
        }
      }
    });

    return results;
  }, [activeSymptom, selectedDrugs]);

  // 3. Naranjo Score Calculator Logic
  const naranjoScore = useMemo(() => {
    let score = 0;
    NARANJO_QUESTIONS.forEach(q => {
      const ans = naranjoAnswers[q.id];
      if (ans === 'yes') score += q.yesScore;
      else if (ans === 'no') score += q.noScore;
      else score += q.unknownScore;
    });
    return score;
  }, [naranjoAnswers]);

  const naranjoInterpretation = useMemo(() => {
    return interpretNaranjoScore(naranjoScore);
  }, [naranjoScore]);

  // 4. WHO-UMC Category Detail
  const selectedWhoUmcDetail = useMemo(() => {
    return WHO_UMC_CATEGORIES.find(w => w.id === selectedWhoUmcId) || WHO_UMC_CATEGORIES[1];
  }, [selectedWhoUmcId]);

  // 5. Hartwig Detail
  const selectedHartwigDetail = useMemo(() => {
    return HARTWIG_SEVERITY_LEVELS.find(h => h.level === selectedHartwigLevel) || HARTWIG_SEVERITY_LEVELS[2];
  }, [selectedHartwigLevel]);

  // 6. Schumock Result
  const schumockResult = useMemo(() => {
    return evaluateSchumockResult(schumockAnswers);
  }, [schumockAnswers]);

  const handlePrint = () => {
    window.print();
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-amber-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-purple-500" />;
      case 'Moon': return <Moon className="w-5 h-5 text-indigo-500" />;
      case 'Eye': return <Eye className="w-5 h-5 text-orange-500" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-emerald-500" />;
      case 'VolumeX': return <VolumeX className="w-5 h-5 text-cyan-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-pink-500" />;
      default: return <Activity className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
      
      {/* 1. Header Banner & Intro - Deep Obsidian & Teal Palette */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0d1f27] to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-teal-500/20 shadow-xl relative overflow-hidden print:hidden">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none hidden sm:block">
          <HeartPulse className="w-64 h-64 text-teal-400 -rotate-12" />
        </div>
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
                <span>Pusat Farmakovigilans & Monitoring Efek Samping Obat (MESO)</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white/10 text-teal-200 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Standar Naranjo, WHO-UMC & BPOM RI
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-outfit">
              Cek Efek Samping & <span className="text-teal-300">Evaluasi Kausalitas MESO</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Suite komprehensif farmakovigilans: Analisis Toksisitas Organ Kumulatif, Pelacak Gejala Pasien, Kalkulator Kausalitas Naranjo & WHO-UMC, Skala Keparahan Hartwig, Skala Ketercegahan Schumock, dan Generator Formulir Kuning BPOM RI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
            {onOpenBrandingModal && (
              <button
                onClick={onOpenBrandingModal}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xs shadow-xs active:scale-95"
              >
                <Building className="w-3.5 h-3.5 text-teal-300" />
                <span>Kop & Stempel</span>
              </button>
            )}
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Ekspor PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Drug Selector & Quick Presets */}
      <div className="bg-white dark:bg-[#0c121e] rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Pill className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Daftar Obat Pasien ({selectedDrugs.length} Obat Terpilih)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pilih seluruh obat rutin/resep pasien untuk menganalisis beban toksisitas kumulatif dan evaluasi MESO.
            </p>
          </div>

          {selectedDrugs.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 font-semibold flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Hapus Semua Obat
            </button>
          )}
        </div>

        {/* Search Bar Input */}
        <div className="relative mt-4">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsSearching(true);
              }}
              onFocus={() => setIsSearching(true)}
              placeholder="Cari nama generik atau merk obat (contoh: Captopril, Azithromycin, Amlodipine, Paracetamol, Gentamicin)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setIsSearching(false); }}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearching && filteredDrugs.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {filteredDrugs.map(drug => {
                const isSelected = selectedDrugs.some(d => d.id === drug.id);
                return (
                  <button
                    key={drug.id}
                    onClick={() => handleAddDrug(drug)}
                    disabled={isSelected}
                    className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors text-xs sm:text-sm cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-400 cursor-not-allowed' 
                        : 'hover:bg-teal-50/70 dark:hover:bg-teal-950/40 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{drug.name}</div>
                      <div className="text-2xs text-slate-500 dark:text-slate-400 font-mono">
                        {drug.genericName || drug.category}
                      </div>
                    </div>
                    <div>
                      {isSelected ? (
                        <span className="text-2xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                          Sudah Dipilih
                        </span>
                      ) : (
                        <span className="text-2xs px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 font-bold flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Tambah
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Drugs Chips */}
        {selectedDrugs.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedDrugs.map(drug => (
              <div
                key={drug.id}
                className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 text-xs font-semibold shadow-2xs group"
              >
                <span>{drug.name}</span>
                <span className="text-2xs px-1.5 py-0.5 rounded bg-teal-200/60 dark:bg-teal-800/60 text-teal-800 dark:text-teal-300 font-normal">
                  {drug.atcCode || 'Obat'}
                </span>
                <button
                  onClick={() => handleRemoveDrug(drug.id)}
                  className="p-1 rounded-lg text-teal-600 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                  title="Hapus obat"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl mt-4">
            <Pill className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Belum ada obat yang dipilih. Silakan cari obat di atas atau gunakan contoh kasus preset klinis berikut:
            </p>
          </div>
        )}

        {/* Quick Presets for Pharmacists */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-2xs">
          <span className="text-slate-500 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Kasus Preset Klinis:
          </span>
          <button
            onClick={() => applyPreset('qtc')}
            className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 font-medium cursor-pointer"
          >
            🫀 Pemanjangan QTc (Amiodarone + Azithro + Ondansetron)
          </button>
          <button
            onClick={() => applyPreset('renal')}
            className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 font-medium cursor-pointer"
          >
            🩺 Toksisitas Ginjal / AKI (Gentamicin + Vancomycin + NSAID)
          </button>
          <button
            onClick={() => applyPreset('sedation')}
            className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 font-medium cursor-pointer"
          >
            🧠 Sedasi & Risiko Jatuh (Alprazolam + Tramadol + CTM)
          </button>
          <button
            onClick={() => applyPreset('electrolyte')}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 font-medium cursor-pointer"
          >
            ⚡ Hiperkalemia Fatal (Spironolactone + Captopril + KCl)
          </button>
        </div>
      </div>

      {/* 3. Main Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 print:hidden">
        <button
          onClick={() => setActiveSubtab('overlap')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSubtab === 'overlap'
              ? 'text-teal-600 dark:text-teal-400 bg-white dark:bg-[#0c121e] border-t-2 border-t-teal-500 border-x border-slate-200 dark:border-slate-800 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Analisis Toksisitas Organ Kumulatif</span>
          {overallRiskStats.elevatedCount > 0 && (
            <span className="text-2xs px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold">
              {overallRiskStats.elevatedCount} Organ
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubtab('symptoms')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSubtab === 'symptoms'
              ? 'text-teal-600 dark:text-teal-400 bg-white dark:bg-[#0c121e] border-t-2 border-t-teal-500 border-x border-slate-200 dark:border-slate-800 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Pelacak Gejala Pasien (*Reverse ADR*)</span>
        </button>

        <button
          onClick={() => setActiveSubtab('meso_suite')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSubtab === 'meso_suite'
              ? 'text-teal-600 dark:text-teal-400 bg-white dark:bg-[#0c121e] border-t-2 border-t-teal-500 border-x border-slate-200 dark:border-slate-800 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-amber-500" />
          <span>Suite Evaluasi Kausalitas MESO</span>
          <span className="text-2xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold">
            4 Tools
          </span>
        </button>

        <button
          onClick={() => setActiveSubtab('bpom_form')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSubtab === 'bpom_form'
              ? 'text-teal-600 dark:text-teal-400 bg-white dark:bg-[#0c121e] border-t-2 border-t-teal-500 border-x border-slate-200 dark:border-slate-800 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4 text-yellow-500" />
          <span>Formulir Kuning MESO BPOM RI</span>
          <span className="text-2xs px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-800 font-black">
            Cetak
          </span>
        </button>

        <button
          onClick={() => setActiveSubtab('mitigation')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSubtab === 'mitigation'
              ? 'text-teal-600 dark:text-teal-400 bg-white dark:bg-[#0c121e] border-t-2 border-t-teal-500 border-x border-slate-200 dark:border-slate-800 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Panduan Mitigasi & Red Flags</span>
        </button>
      </div>

      {/* 4. TAB 1: Analisis Toksisitas Organ Kumulatif */}
      {activeSubtab === 'overlap' && (
        <div className="space-y-6">
          
          {/* Executive Summary Card */}
          <div className="bg-white dark:bg-[#0c121e] rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-2xs font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-mono">
                  EXECUTIVE REGIMEN SUMMARY
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Tingkat Risiko Kumulatif Polifarmasi: 
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-black inline-block ${
                    overallRiskStats.overallGrade === 'Kritis' ? 'bg-red-600 text-white animate-pulse' :
                    overallRiskStats.overallGrade === 'Tinggi' ? 'bg-amber-500 text-white' :
                    overallRiskStats.overallGrade === 'Sedang' ? 'bg-yellow-500 text-slate-900' :
                    'bg-emerald-600 text-white'
                  }`}>
                    {overallRiskStats.overallGrade.toUpperCase()}
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-center px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-2xs text-slate-400">Organ Terpapar</div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-base">{overallRiskStats.elevatedCount} / 9</div>
                </div>
                <div className="text-center px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
                  <div className="text-2xs text-red-500">Risiko Kritis</div>
                  <div className="font-extrabold text-red-600 text-base">{overallRiskStats.criticalCount}</div>
                </div>
                <div className="text-center px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <div className="text-2xs text-amber-500">Risiko Tinggi</div>
                  <div className="font-extrabold text-amber-600 text-base">{overallRiskStats.highCount}</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
              Analisis ini memindai efek sinergis obat terhadap 9 sistem organ utama. Ketika beberapa obat membebani organ yang sama (misal: multipel obat memperpanjang QTc atau membebani tubulus ginjal), risiko kegagalan fungsi organ melonjak secara eksponensial.
            </p>
          </div>

          {/* 9 Organ Toxicity Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {toxicityAnalysis.map(({ category, contributingDrugs, totalWeight, riskLevel, riskColor, progressBarColor, isElevated }) => (
              <div
                key={category.id}
                className={`rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                  isElevated
                    ? 'bg-white dark:bg-[#0c121e] border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                    : 'bg-slate-50/50 dark:bg-[#080d15]/50 border-slate-200/50 dark:border-slate-800/40 opacity-75'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                        {getCategoryIcon(category.icon)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          {category.shortName}
                        </h4>
                        <div className="text-2xs text-slate-400 font-mono mt-0.5">
                          {contributingDrugs.length} Obat Terlibat
                        </div>
                      </div>
                    </div>

                    <span className={`text-2xs px-2.5 py-1 rounded-full font-bold border ${riskColor}`}>
                      {riskLevel}
                    </span>
                  </div>

                  {/* Progress Bar Score */}
                  <div className="mt-3">
                    <div className="flex justify-between text-2xs text-slate-500 mb-1">
                      <span>Beban Toksisitas</span>
                      <span className="font-bold font-mono">{totalWeight} / 10</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${progressBarColor} transition-all duration-500 rounded-full`}
                        style={{ width: `${Math.min(100, (totalWeight / 8) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-2xs text-slate-500 dark:text-slate-400 mt-3 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Contributing Drugs List */}
                  {contributingDrugs.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-2xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Obat Penyumbang Beban:
                      </div>
                      <div className="space-y-2">
                        {contributingDrugs.map(({ drug, profile, matchedEvidence }, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs"
                          >
                            <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                              <span>{drug.name}</span>
                              {profile && (
                                <span className={`text-2xs px-1.5 py-0.2 rounded font-bold ${
                                  profile.severity === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                                  profile.severity === 'High' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                                }`}>
                                  {profile.severity}
                                </span>
                              )}
                            </div>
                            <div className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {matchedEvidence[0] || 'Tercantum pada monografi efek samping'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Laboratory Monitors */}
                {isElevated && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-2.5 rounded-xl">
                    <div className="text-2xs font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3 h-3" /> Pemantauan Lab Esensial:
                    </div>
                    <ul className="text-2xs text-slate-600 dark:text-slate-300 space-y-0.5 list-disc list-inside">
                      {category.keyMonitors.slice(0, 2).map((mon, mIdx) => (
                        <li key={mIdx}>{mon}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 2: Pelacak Gejala Pasien (Reverse ADR) */}
      {activeSubtab === 'symptoms' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Symptom Selector List */}
          <div className="bg-white dark:bg-[#0c121e] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-teal-500" />
                Pilih Keluhan / Gejala Pasien
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Pilih gejala yang dialami pasien untuk menemukan obat penyebab.
              </p>
            </div>

            {/* Search Input for Symptoms */}
            <div className="relative">
              <input
                type="text"
                value={symptomSearch}
                onChange={e => setSymptomSearch(e.target.value)}
                placeholder="Cari keluhan (contoh: batuk, bengkak, gusi, tinitus)..."
                className="w-full pl-3 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* Symptoms List */}
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {ADR_SYMPTOM_DATABASE
                .filter(s => 
                  !symptomSearch || 
                  s.symptomName.toLowerCase().includes(symptomSearch.toLowerCase()) || 
                  s.indonesianName.toLowerCase().includes(symptomSearch.toLowerCase())
                )
                .map(symptom => {
                  const isSelected = symptom.id === selectedSymptomId;
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => setSelectedSymptomId(symptom.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-300 dark:border-teal-700 shadow-2xs'
                          : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                          {symptom.category}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-600' : 'text-slate-400'}`} />
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-1.5">
                        {symptom.indonesianName}
                      </div>
                      <div className="text-2xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {symptom.symptomName}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Right Column: Matched Causative Drugs Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#0c121e] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-2xs font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-mono">
                    KELUHAN TERPILIH
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeSymptom.indonesianName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {activeSymptom.description}
                  </p>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 text-xs font-bold shrink-0">
                  {matchedCausativeDrugs.length} Obat Relevan
                </div>
              </div>

              {/* Red Flag Alert for this Symptom */}
              {activeSymptom.redFlagWarning && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-900 dark:text-red-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">PERINGATAN TANDA BAHAYA (RED FLAG): </span>
                    {activeSymptom.redFlagWarning}
                  </div>
                </div>
              )}

              {/* Matched Drugs in Patient's Regimen */}
              <div className="mt-6">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5 text-teal-500" />
                  Hasil Penapisan Obat Pasien yang Dicurigai Menjadi Penyebab:
                </h4>

                {matchedCausativeDrugs.length > 0 ? (
                  <div className="space-y-4">
                    {matchedCausativeDrugs.map(({ drug, probability, mechanism, onset, mitigation }, index) => (
                      <div
                        key={drug.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-900/60 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-black flex items-center justify-center">
                              {index + 1}
                            </span>
                            <div>
                              <span className="font-bold text-sm text-slate-900 dark:text-white">{drug.name}</span>
                              <span className="text-2xs text-slate-500 ml-2 font-mono">({drug.genericName || drug.category})</span>
                            </div>
                          </div>

                          <span className={`text-2xs px-2.5 py-1 rounded-full font-bold self-start sm:self-auto ${
                            probability.includes('Very High') ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-200' :
                            probability.includes('High') ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 border border-yellow-200'
                          }`}>
                            Probabilitas: {probability}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-200/60 dark:border-slate-800">
                          <div>
                            <span className="text-2xs font-bold text-slate-400 block mb-0.5">MEKANISME FARMAKOLOGIS:</span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{mechanism}</p>
                          </div>
                          <div>
                            <span className="text-2xs font-bold text-slate-400 block mb-0.5">WAKTU TIMBULNYA GEJALA (ONSET):</span>
                            <p className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {onset}
                            </p>
                          </div>
                        </div>

                        {/* Mitigation Strategy */}
                        <div className="p-3 rounded-lg bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60 text-xs text-teal-950 dark:text-teal-200">
                          <span className="font-bold flex items-center gap-1 mb-0.5">
                            <ArrowRight className="w-3 h-3 text-teal-600" />
                            Rekomendasi & Alternatif Terapi:
                          </span>
                          <p>{mitigation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      Tidak Ada Obat Terpilih yang Merupakan Pemicu Utama Gejala Ini
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                      Dari {selectedDrugs.length} obat yang dipilih, tidak ditemukan korelasi efek samping mayor terhadap keluhan "{activeSymptom.indonesianName}". Pertimbangkan penyebab infeksi atau penyakit dasar pasien.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 3: Suite Evaluasi Kausalitas MESO (Naranjo, WHO-UMC, Hartwig, Schumock) */}
      {activeSubtab === 'meso_suite' && (
        <div className="space-y-6">
          
          {/* MESO Tool Sub-selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white dark:bg-[#0c121e] p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setActiveMesoTool('naranjo')}
              className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                activeMesoTool === 'naranjo'
                  ? 'bg-teal-50 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-200 shadow-xs'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="text-2xs font-extrabold uppercase font-mono text-teal-600">INSTRUMEN 1</div>
              <div className="font-bold text-xs sm:text-sm mt-0.5">Algoritma Naranjo</div>
              <div className="text-2xs text-slate-500 mt-0.5">10 Kuesioner Kausalitas</div>
            </button>

            <button
              onClick={() => setActiveMesoTool('who_umc')}
              className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                activeMesoTool === 'who_umc'
                  ? 'bg-teal-50 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-200 shadow-xs'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="text-2xs font-extrabold uppercase font-mono text-blue-600">INSTRUMEN 2</div>
              <div className="font-bold text-xs sm:text-sm mt-0.5">Kausalitas WHO-UMC</div>
              <div className="text-2xs text-slate-500 mt-0.5">Standar Utama BPOM RI</div>
            </button>

            <button
              onClick={() => setActiveMesoTool('hartwig')}
              className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                activeMesoTool === 'hartwig'
                  ? 'bg-teal-50 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-200 shadow-xs'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="text-2xs font-extrabold uppercase font-mono text-amber-600">INSTRUMEN 3</div>
              <div className="font-bold text-xs sm:text-sm mt-0.5">Keparahan Hartwig</div>
              <div className="text-2xs text-slate-500 mt-0.5">Level 1 - 7 Keparahan</div>
            </button>

            <button
              onClick={() => setActiveMesoTool('schumock')}
              className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                activeMesoTool === 'schumock'
                  ? 'bg-teal-50 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-200 shadow-xs'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="text-2xs font-extrabold uppercase font-mono text-emerald-600">INSTRUMEN 4</div>
              <div className="font-bold text-xs sm:text-sm mt-0.5">Ketercegahan Schumock</div>
              <div className="text-2xs text-slate-500 mt-0.5">Preventability Scale</div>
            </button>
          </div>

          {/* 6.1 NARANJO CALCULATOR */}
          {activeMesoTool === 'naranjo' && (
            <div className="bg-white dark:bg-[#0c121e] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-2xs font-bold font-mono">
                    NARANJO ADR PROBABILITY SCALE
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    Kuesioner Probabilitas KTD Algoritma Naranjo
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Gunakan 10 pertanyaan terstandar ini untuk menguji tingkat kepastian apakah KTD disebabkan oleh obat terkait.
                  </p>
                </div>

                {/* Live Score Display Card */}
                <div className={`px-5 py-3 rounded-2xl border text-center ${naranjoInterpretation.badgeBg} shadow-sm shrink-0`}>
                  <div className="text-2xs font-bold uppercase tracking-wider">Skor Naranjo Total</div>
                  <div className="text-2xl font-black">{naranjoScore}</div>
                  <div className="text-xs font-bold mt-0.5">{naranjoInterpretation.category}</div>
                </div>
              </div>

              {/* Suspected Drug Selector */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  Obat yang Sedang Diuji Kausalitasnya:
                </span>
                <select
                  value={suspectedDrugForNaranjo}
                  onChange={e => setSuspectedDrugForNaranjo(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">-- Pilih Dari Obat Pasien --</option>
                  {selectedDrugs.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.genericName || d.category})</option>
                  ))}
                </select>
              </div>

              {/* 10 Questions Questionnaire List */}
              <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
                {NARANJO_QUESTIONS.map(q => (
                  <div key={q.id} className="pt-4 first:pt-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="max-w-2xl">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-bold font-mono text-teal-600 dark:text-teal-400 shrink-0 mt-0.5">
                          #{q.id}
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                            {q.indonesianQuestion}
                          </p>
                          <p className="text-2xs text-slate-400 mt-0.5">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 3 Radio Options */}
                    <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
                      <button
                        type="button"
                        onClick={() => setNaranjoAnswers(prev => ({ ...prev, [q.id]: 'yes' }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          naranjoAnswers[q.id] === 'yes'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        Ya (+{q.yesScore})
                      </button>
                      <button
                        type="button"
                        onClick={() => setNaranjoAnswers(prev => ({ ...prev, [q.id]: 'no' }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          naranjoAnswers[q.id] === 'no'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        Tidak ({q.noScore})
                      </button>
                      <button
                        type="button"
                        onClick={() => setNaranjoAnswers(prev => ({ ...prev, [q.id]: 'unknown' }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          naranjoAnswers[q.id] === 'unknown'
                            ? 'bg-slate-700 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        Tidak Tahu (0)
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interpretation & Clinical Recommendation Box */}
              <div className={`p-5 rounded-2xl border ${naranjoInterpretation.badgeBg} mt-6 space-y-2`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  Hasil Kesimpulan Farmakovigilans: {naranjoInterpretation.category} (Skor: {naranjoScore})
                </div>
                <p className="text-xs leading-relaxed opacity-95">
                  {naranjoInterpretation.description}
                </p>
                <div className="pt-2 border-t border-current/20 text-xs font-semibold">
                  Rekomendasi Tindakan: {naranjoInterpretation.recommendation}
                </div>
              </div>
            </div>
          )}

          {/* 6.2 WHO-UMC CAUSALITY TOOL */}
          {activeMesoTool === 'who_umc' && (
            <div className="bg-white dark:bg-[#0c121e] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-2xs font-bold font-mono">
                  STANDAR UTAMA FARMAKOVIGILANS BPOM RI & WHO
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Klasifikasi Kausalitas Efek Samping WHO-UMC
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Pilih salah satu dari 6 kategori kausalitas resmi yang sesuai dengan kondisi klinis pasien untuk laporan MESO.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WHO_UMC_CATEGORIES.map(cat => {
                  const isSelected = cat.id === selectedWhoUmcId;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedWhoUmcId(cat.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-teal-50/70 dark:bg-teal-950/60 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                          : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-full border ${cat.badgeBg}`}>
                            {cat.indonesianName}
                          </span>
                          {isSelected && <Check className="w-5 h-5 text-teal-600" />}
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">
                          {cat.explanation}
                        </p>
                        
                        <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                          <div className="text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Kriteria Penentu:
                          </div>
                          <ul className="text-2xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                            {cat.criteria.slice(0, 3).map((c, cIdx) => (
                              <li key={cIdx}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-2xs text-slate-700 dark:text-slate-300">
                        <strong className="text-teal-700 dark:text-teal-400 block mb-0.5">Tindakan Resmi BPOM:</strong>
                        {cat.officialBpomaAction}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 6.3 HARTWIG & SIEGEL SEVERITY SCALE */}
          {activeMesoTool === 'hartwig' && (
            <div className="bg-white dark:bg-[#0c121e] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-2xs font-bold font-mono">
                  HARTWIG & SIEGEL SEVERITY ASSESSMENT SCALE
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Skala Derajat Keparahan Efek Samping (Level 1 - 7)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tentukan tingkatan keparahan dampak klinis dan intervensi medis yang dibutuhkan pasien.
                </p>
              </div>

              {/* Levels Selector Cards */}
              <div className="space-y-3">
                {HARTWIG_SEVERITY_LEVELS.map(item => {
                  const isSelected = item.level === selectedHartwigLevel;
                  return (
                    <div
                      key={item.level}
                      onClick={() => setSelectedHartwigLevel(item.level)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-amber-50/80 dark:bg-amber-950/60 border-amber-500 shadow-sm ring-1 ring-amber-500/30'
                          : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
                          isSelected ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {item.level}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {item.title}
                            </span>
                            <span className={`text-2xs px-2 py-0.5 rounded-full font-bold border ${item.badgeBg}`}>
                              {item.grade}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-slate-500 shrink-0 self-start sm:self-auto sm:text-right">
                        <span className="text-2xs text-slate-400 block">Dampak Klinis:</span>
                        {item.clinicalImpact}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 6.4 SCHUMOCK & THORNTON PREVENTABILITY */}
          {activeMesoTool === 'schumock' && (
            <div className="bg-white dark:bg-[#0c121e] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-2xs font-bold font-mono">
                    SCHUMOCK & THORNTON PREVENTABILITY SCALE
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    Skala Ketercegahan Efek Samping Obat
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Evaluasi apakah kejadian KTD ini sebenarnya dapat dicegah sebelum terjadi pada pasien.
                  </p>
                </div>

                {/* Result Badge Card */}
                <div className={`px-5 py-3 rounded-2xl border text-center ${schumockResult.badgeBg} shadow-sm shrink-0`}>
                  <div className="text-2xs font-bold uppercase tracking-wider">Kesimpulan Ketercegahan</div>
                  <div className="text-sm font-black mt-0.5">{schumockResult.result}</div>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
                {SCHUMOCK_QUESTIONS.map(q => {
                  const isYes = schumockAnswers[q.id] === true;
                  return (
                    <div key={q.id} className="pt-4 first:pt-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="max-w-2xl">
                        <span className="text-2xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-mono">
                          {q.sectionTitle}
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                          {q.question}
                        </p>
                        <p className="text-2xs text-slate-400 mt-0.5">
                          {q.explanation}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
                        <button
                          type="button"
                          onClick={() => setSchumockAnswers(prev => ({ ...prev, [q.id]: true }))}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isYes
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          Ya (Terjadi Kesalahan)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSchumockAnswers(prev => ({ ...prev, [q.id]: false }))}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            !isYes
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          Tidak (Sesuai Prosedur)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Schumock Interpretation Box */}
              <div className={`p-5 rounded-2xl border ${schumockResult.badgeBg} mt-6 space-y-2`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  {schumockResult.result}
                </div>
                <p className="text-xs leading-relaxed opacity-95">
                  {schumockResult.summary}
                </p>
                <div className="pt-2 border-t border-current/20 text-xs font-semibold">
                  Rekomendasi Mutu Klinis: {schumockResult.recommendation}
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 7. TAB 4: Formulir Kuning MESO BPOM RI (Official Yellow Form) */}
      {activeSubtab === 'bpom_form' && (
        <div className="bg-amber-50/60 dark:bg-[#121620] rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-900/60 shadow-md space-y-6">
          
          {/* BPOM Form Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-amber-300 dark:border-amber-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-900 text-2xs font-black uppercase">
                  FORMULIR RESMI
                </span>
                <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                  BADAN PENGAWAS OBAT DAN MAKANAN (BPOM) RI
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                Laporan Efek Samping Obat / Kejadian Tidak Diinginkan (Formulir Kuning MESO)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Pusat Farmakovigilans / Subdirektorat Pengawasan Keamanan Obat BPOM RI.
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
            >
              <Printer className="w-4 h-4" />
              Cetak Formulir Kuning
            </button>
          </div>

          {/* Form Content Sections */}
          <div className="space-y-6 text-xs text-slate-800 dark:text-slate-200">
            
            {/* Section 1: PENDERITA */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200 dark:border-slate-800 space-y-3">
              <h4 className="font-black text-amber-900 dark:text-amber-400 uppercase tracking-wider text-xs border-b pb-1">
                1. IDENTITAS PENDERITA / PASIEN
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-2xs font-bold text-slate-500 block">Nama Pasien (Inisial):</label>
                  <input
                    type="text"
                    value={bpomForm.patient.name}
                    onChange={e => setBpomForm(prev => ({ ...prev, patient: { ...prev.patient, name: e.target.value } }))}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-2xs font-bold text-slate-500 block">No. Rekam Medis (RM):</label>
                  <input
                    type="text"
                    value={bpomForm.patient.recordNo}
                    onChange={e => setBpomForm(prev => ({ ...prev, patient: { ...prev.patient, recordNo: e.target.value } }))}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-2xs font-bold text-slate-500 block">Umur / BB Pasien:</label>
                  <input
                    type="text"
                    value={`${bpomForm.patient.age} / ${bpomForm.patient.weightKg}`}
                    onChange={e => setBpomForm(prev => ({ ...prev, patient: { ...prev.patient, age: e.target.value } }))}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-2xs font-bold text-slate-500 block">Jenis Kelamin:</label>
                  <select
                    value={bpomForm.patient.gender}
                    onChange={e => setBpomForm(prev => ({ ...prev, patient: { ...prev.patient, gender: e.target.value as any } }))}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: REAKSI EFEK SAMPING OBAT */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200 dark:border-slate-800 space-y-3">
              <h4 className="font-black text-amber-900 dark:text-amber-400 uppercase tracking-wider text-xs border-b pb-1">
                2. MANIFESTASI REAKSI EFEK SAMPING OBAT (KTD)
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-2xs font-bold text-slate-500 block">Bentuk Manifestasi Efek Samping yang Terjadi:</label>
                  <textarea
                    rows={2}
                    value={bpomForm.reaction.manifestation}
                    onChange={e => setBpomForm(prev => ({ ...prev, reaction: { ...prev.reaction, manifestation: e.target.value } }))}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-2xs font-bold text-slate-500 block">Tanggal Timbul Reaksi:</label>
                    <input
                      type="date"
                      value={bpomForm.reaction.onsetDate}
                      onChange={e => setBpomForm(prev => ({ ...prev, reaction: { ...prev.reaction, onsetDate: e.target.value } }))}
                      className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-2xs font-bold text-slate-500 block">Kesudahan Efek Samping (Outcome):</label>
                    <select
                      value={bpomForm.reaction.outcome}
                      onChange={e => setBpomForm(prev => ({ ...prev, reaction: { ...prev.reaction, outcome: e.target.value as any } }))}
                      className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    >
                      <option value="Sembuh Sempurna">Sembuh Sempurna</option>
                      <option value="Sembuh dengan Cacat">Sembuh dengan Cacat</option>
                      <option value="Belum Sembuh">Belum Sembuh</option>
                      <option value="Meninggal Dunia">Meninggal Dunia</option>
                      <option value="Tidak Diketahui">Tidak Diketahui</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-2xs font-bold text-slate-500 block">Data Lab / Pemeriksaan Penunjang:</label>
                    <input
                      type="text"
                      value={bpomForm.reaction.labDataResults}
                      onChange={e => setBpomForm(prev => ({ ...prev, reaction: { ...prev.reaction, labDataResults: e.target.value } }))}
                      className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: OBAT YANG DICURIGAI */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200 dark:border-slate-800 space-y-3">
              <h4 className="font-black text-amber-900 dark:text-amber-400 uppercase tracking-wider text-xs border-b pb-1">
                3. OBAT YANG DICURIGAI (SUSPECTED DRUG)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-2xs font-bold text-slate-500 block">Nama Dagang / Generik:</label>
                  <input
                    type="text"
                    value={bpomForm.suspectedDrug.tradeName}
                    onChange={e => setBpomForm(prev => ({ ...prev, suspectedDrug: { ...prev.suspectedDrug, tradeName: e.target.value } }))}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-2xs font-bold text-slate-500 block">Bentuk Sediaan & No. Batch:</label>
                  <input
                    type="text"
                    value={`${bpomForm.suspectedDrug.dosageForm} / ${bpomForm.suspectedDrug.batchNumber}`}
                    onChange={e => setBpomForm(prev => ({ ...prev, suspectedDrug: { ...prev.suspectedDrug, batchNumber: e.target.value } }))}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-2xs font-bold text-slate-500 block">Dosis & Rute Pemberian:</label>
                  <input
                    type="text"
                    value={`${bpomForm.suspectedDrug.dosageGiven} (${bpomForm.suspectedDrug.route})`}
                    onChange={e => setBpomForm(prev => ({ ...prev, suspectedDrug: { ...prev.suspectedDrug, dosageGiven: e.target.value } }))}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-2xs font-bold text-slate-500 block">Hasil Dechallenge (Penghentian):</label>
                  <select
                    value={bpomForm.suspectedDrug.dechallengeResult}
                    onChange={e => setBpomForm(prev => ({ ...prev, suspectedDrug: { ...prev.suspectedDrug, dechallengeResult: e.target.value as any } }))}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  >
                    <option value="Gejala Membaik">Gejala Membaik</option>
                    <option value="Gejala Tidak Berubah">Gejala Tidak Berubah</option>
                    <option value="Obat Tidak Dihentikan">Obat Tidak Dihentikan</option>
                    <option value="Tidak Tahu">Tidak Tahu</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: PELAPOR */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  Apoteker Pelapor: {clinicBranding?.pharmacistName || bpomForm.reporter.pharmacistName}
                </div>
                <div className="text-2xs text-slate-500 font-mono">
                  SIPA: {clinicBranding?.pharmacistSipa || bpomForm.reporter.sipaNumber} | Instansi: {clinicBranding?.clinicName || bpomForm.reporter.institutionName}
                </div>
              </div>

              <div className="text-2xs text-slate-400 text-right">
                <div>Tanggal Laporan: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</div>
                <div className="text-teal-600 font-semibold mt-0.5">Tervalidasi FarmasiDruggist MESO</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 8. TAB 5: Panduan Mitigasi & Emergency Red Flags */}
      {activeSubtab === 'mitigation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ORGAN_TOXICITY_CATEGORIES.map(category => (
              <div
                key={category.id}
                className="bg-white dark:bg-[#0c121e] rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {category.name}
                    </h4>
                    <span className="text-2xs text-teal-600 dark:text-teal-400 font-mono">
                      Protokol Pencegahan & Penanganan
                    </span>
                  </div>
                </div>

                {/* Mitigation Steps */}
                <div>
                  <h5 className="text-2xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                    Langkah Mitigasi & Pencegahan:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {category.clinicalManagement.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Red Flags Alert */}
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-900 dark:text-red-200 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-red-700 dark:text-red-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    Tanda Bahaya Darurat (Segera Bawa ke IGD):
                  </span>
                  <ul className="space-y-0.5 list-disc list-inside text-2xs pl-1">
                    {category.redFlags.map((flag, fIdx) => (
                      <li key={fIdx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. Printable Clinical Report (Only visible on Print) */}
      <div className="hidden print:block text-slate-900 bg-white p-8 space-y-6">
        {/* Clinic Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black uppercase tracking-wider">
              {clinicBranding?.clinicName || 'FARMASIDRUGGIST CLINICAL PHARMACY'}
            </h1>
            <p className="text-xs text-slate-600">
              {clinicBranding?.address || 'Jl. Farmasi Klinis No. 10, Layanan Informasi Obat & Farmakovigilans'}
            </p>
            <p className="text-2xs text-slate-500">
              Telepon: {clinicBranding?.phone || '0812-3456-7890'} | Email: {clinicBranding?.email || 'klinik@farmasidruggist.com'}
            </p>
          </div>
          <div className="text-right text-xs">
            <div className="font-bold">LEMBAR EVALUASI EFEK SAMPING OBAT & MESO</div>
            <div className="text-2xs text-slate-500 font-mono">Tgl: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</div>
          </div>
        </div>

        {/* Patient Profile */}
        <div className="grid grid-cols-2 gap-4 text-xs p-3 bg-slate-50 border rounded-lg">
          <div><span className="font-bold">Nama Pasien:</span> {bpomForm.patient.name}</div>
          <div><span className="font-bold">No. Rekam Medis:</span> {bpomForm.patient.recordNo}</div>
          <div className="col-span-2">
            <span className="font-bold">Daftar Obat Resep:</span> {selectedDrugs.map(d => d.name).join(', ') || '-'}
          </div>
        </div>

        {/* MESO Causality & Severity Scores */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="p-3 border rounded bg-slate-50">
            <span className="font-bold block text-2xs text-slate-500">SKOR NARANJO:</span>
            <span className="text-base font-black">{naranjoScore}</span> ({naranjoInterpretation.category})
          </div>
          <div className="p-3 border rounded bg-slate-50">
            <span className="font-bold block text-2xs text-slate-500">KAUSALITAS WHO-UMC:</span>
            <span className="text-base font-black">{selectedWhoUmcDetail.indonesianName}</span>
          </div>
          <div className="p-3 border rounded bg-slate-50">
            <span className="font-bold block text-2xs text-slate-500">KEPARAHAN HARTWIG:</span>
            <span className="text-base font-black">Level {selectedHartwigLevel}</span> ({selectedHartwigDetail.grade})
          </div>
        </div>

        {/* Toxicity Summary Table */}
        <div>
          <h3 className="text-sm font-bold border-b pb-1 mb-2">RINGKASAN BEBAN TOKSISITAS ORGAN</h3>
          <table className="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100">
                <th className="border p-2 text-left">Sistem Organ</th>
                <th className="border p-2 text-center">Tingkat Risiko</th>
                <th className="border p-2 text-left">Obat Penyumbang Beban</th>
                <th className="border p-2 text-left">Pemantauan Laboratorium</th>
              </tr>
            </thead>
            <tbody>
              {toxicityAnalysis.filter(t => t.totalWeight > 0).map((t, idx) => (
                <tr key={idx}>
                  <td className="border p-2 font-bold">{t.category.shortName}</td>
                  <td className="border p-2 text-center font-bold">{t.riskLevel}</td>
                  <td className="border p-2">{t.contributingDrugs.map(cd => cd.drug.name).join(', ')}</td>
                  <td className="border p-2">{t.category.keyMonitors.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pharmacist Signature Area */}
        <div className="pt-8 flex justify-between text-xs">
          <div>
            <p className="text-2xs text-slate-500 italic">Dicetak secara otomatis dari Sistem FarmasiDruggist MESO & Farmakovigilans</p>
          </div>
          <div className="text-center w-48">
            <p>Apoteker / Klinisi Pemeriksa,</p>
            <div className="h-16" />
            <p className="font-bold underline">{clinicBranding?.pharmacistName || '( Apt. Penanggung Jawab )'}</p>
            <p className="text-2xs text-slate-500">SIPA: {clinicBranding?.pharmacistSipa || '19900101/SIPA/2026'}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
