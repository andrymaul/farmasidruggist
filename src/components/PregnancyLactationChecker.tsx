import React, { useState, useMemo } from 'react';
import {
  Baby,
  HeartHandshake,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Trash2,
  Share2,
  Printer,
  Sparkles,
  Layers,
  BookOpen,
  Info,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Filter,
  Check,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  PREGNANCY_LACTATION_DATABASE,
  SAFE_PREGNANCY_CONDITIONS,
  PregnancyLactationDrug,
  SafePregnancyConditionGuide,
  FdaPregnancyCategory,
  HalesLactationRating
} from '../data/pregnancyLactationData';
import { FloatingPillsBackground } from './FloatingPillsBackground';

interface PregnancyLactationCheckerProps {
  onSelectTab?: (tabId: string) => void;
  onOpenPricingModal?: () => void;
  onOpenDrugDetail?: (drugName: string) => void;
}

export const PregnancyLactationChecker: React.FC<PregnancyLactationCheckerProps> = ({
  onSelectTab,
  onOpenPricingModal,
  onOpenDrugDetail
}) => {
  // Main Tab State
  const [activeTab, setActiveTab] = useState<'screening' | 'directory' | 'conditions' | 'teratogens'>('screening');

  // 1. Screening State
  const [selectedDrugIds, setSelectedDrugIds] = useState<string[]>([
    'preg-captopril',
    'preg-paracetamol'
  ]);
  const [patientTrimester, setPatientTrimester] = useState<'t1' | 't2' | 't3' | 'lactation'>('t2');
  const [searchQueryScreening, setSearchQueryScreening] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // 2. Directory State
  const [dirSearchQuery, setDirSearchQuery] = useState('');
  const [dirCategoryFilter, setDirCategoryFilter] = useState('all');
  const [dirFdaFilter, setDirFdaFilter] = useState('all');
  const [selectedDrugModal, setSelectedDrugModal] = useState<PregnancyLactationDrug | null>(null);

  // 3. Condition Guide State
  const [selectedConditionId, setSelectedConditionId] = useState<string>(SAFE_PREGNANCY_CONDITIONS[0]?.id || '');

  // Get selected drugs list for screening
  const selectedDrugs = useMemo(() => {
    return selectedDrugIds
      .map(id => PREGNANCY_LACTATION_DATABASE.find(d => d.id === id))
      .filter((d): d is PregnancyLactationDrug => Boolean(d));
  }, [selectedDrugIds]);

  // Autocomplete drug suggestions for screening
  const drugSuggestions = useMemo(() => {
    if (!searchQueryScreening.trim()) return [];
    const q = searchQueryScreening.toLowerCase();
    return PREGNANCY_LACTATION_DATABASE.filter(
      d =>
        !selectedDrugIds.includes(d.id) &&
        (d.name.toLowerCase().includes(q) ||
          d.genericName.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.brandNames?.some(b => b.toLowerCase().includes(q)))
    ).slice(0, 6);
  }, [searchQueryScreening, selectedDrugIds]);

  // Filtered Directory Drugs
  const filteredDirectoryDrugs = useMemo(() => {
    return PREGNANCY_LACTATION_DATABASE.filter(d => {
      const matchCat = dirCategoryFilter === 'all' || d.category.includes(dirCategoryFilter);
      const matchFda = dirFdaFilter === 'all' || d.fdaCategory === dirFdaFilter;
      if (!matchCat || !matchFda) return false;

      if (!dirSearchQuery.trim()) return true;
      const q = dirSearchQuery.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.genericName.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.brandNames?.some(b => b.toLowerCase().includes(q))
      );
    });
  }, [dirSearchQuery, dirCategoryFilter, dirFdaFilter]);

  // Teratogenic Drugs (Category X or D with strong teratogenic alert)
  const teratogenicDrugs = useMemo(() => {
    return PREGNANCY_LACTATION_DATABASE.filter(
      d => d.fdaCategory === 'X' || d.fdaCategory === 'D' || d.isContraindicatedInPregnancy
    );
  }, []);

  const handleAddDrugToScreening = (drugId: string) => {
    if (!selectedDrugIds.includes(drugId)) {
      setSelectedDrugIds([...selectedDrugIds, drugId]);
    }
    setSearchQueryScreening('');
  };

  const handleRemoveDrugFromScreening = (drugId: string) => {
    setSelectedDrugIds(selectedDrugIds.filter(id => id !== drugId));
  };

  // Helper for FDA Badge Styling
  const getFdaBadge = (cat: FdaPregnancyCategory) => {
    switch (cat) {
      case 'A':
        return {
          label: 'Kategori A (Sangat Aman)',
          bg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
        };
      case 'B':
        return {
          label: 'Kategori B (Aman)',
          bg: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-800'
        };
      case 'C':
        return {
          label: 'Kategori C (Gunakan Jika Perlu)',
          bg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
        };
      case 'D':
        return {
          label: 'Kategori D (Bukti Positif Risiko Janin)',
          bg: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800'
        };
      case 'X':
        return {
          label: 'Kategori X (KONTRAINDIKASI MUTLAK)',
          bg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
        };
    }
  };

  // Helper for Hale's Lactation Rating Styling
  const getHalesBadge = (rating: HalesLactationRating) => {
    switch (rating) {
      case 'L1':
        return { label: 'L1: Paling Aman (Safest)', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50' };
      case 'L2':
        return { label: 'L2: Aman (Safer)', color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50' };
      case 'L3':
        return { label: 'L3: Cukup Aman (Moderately Safe)', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50' };
      case 'L4':
        return { label: 'L4: Berpotensi Bahaya (Possibly Hazardous)', color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50' };
      case 'L5':
        return { label: 'L5: KONTRAINDIKASI (Hazardous)', color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50' };
    }
  };

  // Copy WhatsApp Summary
  const handleCopySummary = () => {
    const lines = [
      `*HASIL PENAPISAN KEAMANAN OBAT IBU HAMIL & MENYUSUI*`,
      `*Aplikasi FARMASIDRUGGIST (Standar FDA & Briggs)*`,
      `Status Pasien: ${
        patientTrimester === 't1'
          ? 'Trimester 1 (Organogenesis)'
          : patientTrimester === 't2'
          ? 'Trimester 2 (Pertumbuhan Janin)'
          : patientTrimester === 't3'
          ? 'Trimester 3 (Maturasi & Menjelang Lahir)'
          : 'Ibu Menyusui (Laktasi)'
      }`,
      `Daftar Obat yang Dievaluasi (${selectedDrugs.length}):`,
      ...selectedDrugs.map((d, idx) => {
        return `${idx + 1}. *${d.name}* (FDA Kategori ${d.fdaCategory} | Hale's ${d.halesLactationRating})\n• Status: ${
          d.isContraindicatedInPregnancy ? '⚠️ KONTRAINDIKASI HAMIL' : '✅ Dapat Dipertimbangkan'
        }\n• Catatan: ${d.pllrSummary}\n• Alternatif Aman: ${d.safeAlternatives.join(', ')}`;
      }),
      `\n_Konsultasikan penyesuaian regimen obat dengan Dokter Spesialis Obgyn & Apoteker._`
    ];

    navigator.clipboard.writeText(lines.join('\n\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* HERO BANNER - BLUSH ROSE & DARK PLUM */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e040c] via-[#1e0919] to-[#2e0e27] p-6 sm:p-8 text-white shadow-2xl border border-pink-500/25">
        <FloatingPillsBackground density="low" accentColor="#f472b6" />
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <Baby className="w-48 h-48 text-pink-300" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-bold font-outfit">
              <Baby className="w-3.5 h-3.5" />
              <span>Standar FDA PLLR &amp; Briggs Drugs in Pregnancy and Lactation</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-pink-950/50 shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Keamanan Obat Ibu Hamil &amp; Menyusui
                </h1>
                <p className="text-xs sm:text-sm text-pink-100/80 font-medium">
                  Penapisan risiko teratogenesis trimester, profil ekskresi ASI (Hale’s L1–L5 &amp; RID %), serta direktori alternatif obat lini pertama yang aman.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-pink-200">
                <Layers className="w-3.5 h-3.5 text-pink-400" />
                <span>{PREGNANCY_LACTATION_DATABASE.length} Monografi Klinis</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-rose-200">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Deteksi Obat Teratogenik</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Alternatif Aman Lini 1</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-pink-950/60 text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Total Obat Terverifikasi:</span>
              <span className="text-lg font-black text-pink-400">{PREGNANCY_LACTATION_DATABASE.length} Obat Bumil &amp; Busui</span>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION SUBTABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('screening')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'screening'
              ? 'bg-gradient-to-r from-pink-600 to-teal-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Penapisan Multi-Obat Resep</span>
        </button>

        <button
          onClick={() => setActiveTab('conditions')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'conditions'
              ? 'bg-gradient-to-r from-pink-600 to-teal-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Alternatif Aman per Kondisi</span>
        </button>

        <button
          onClick={() => setActiveTab('teratogens')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'teratogens'
              ? 'bg-gradient-to-r from-pink-600 to-teal-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Daftar Teratogenik & Kategori X</span>
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'directory'
              ? 'bg-gradient-to-r from-pink-600 to-teal-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Direktori Lengkap Monografi</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: PENAPISAN MULTI-OBAT RESEP                                      */}
      {/* ========================================================================= */}
      {activeTab === 'screening' && (
        <div className="space-y-6 animate-fade-in">
          {/* Patient Profile & Trimester Selector */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-outfit">
                  Pilih Status Fisiologis Kehamilan / Laktasi
                </h3>
                <p className="text-xs text-slate-500">
                  Risiko toksisitas obat berbeda secara signifikan antara Trimester 1 (organogenesis), Trimester 2/3 (pertumbuhan & persalinan), dan masa Menyusui.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySummary}
                  className="px-3 py-1.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 text-xs font-bold flex items-center gap-1.5 hover:bg-pink-100 cursor-pointer"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'Tersalin!' : 'Salin Laporan WhatsApp'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => setPatientTrimester('t1')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  patientTrimester === 't1'
                    ? 'bg-pink-500/10 border-pink-500 text-pink-900 dark:text-pink-200 font-bold shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black font-outfit">Trimester 1</div>
                <div className="text-[11px] text-slate-500">Minggu 1 – 12 (Organogenesis)</div>
              </button>

              <button
                onClick={() => setPatientTrimester('t2')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  patientTrimester === 't2'
                    ? 'bg-pink-500/10 border-pink-500 text-pink-900 dark:text-pink-200 font-bold shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black font-outfit">Trimester 2</div>
                <div className="text-[11px] text-slate-500">Minggu 13 – 27 (Maturasi Organ)</div>
              </button>

              <button
                onClick={() => setPatientTrimester('t3')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  patientTrimester === 't3'
                    ? 'bg-pink-500/10 border-pink-500 text-pink-900 dark:text-pink-200 font-bold shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black font-outfit">Trimester 3</div>
                <div className="text-[11px] text-slate-500">Minggu 28 – 40+ (Persalinan)</div>
              </button>

              <button
                onClick={() => setPatientTrimester('lactation')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  patientTrimester === 'lactation'
                    ? 'bg-teal-500/10 border-teal-500 text-teal-900 dark:text-teal-200 font-bold shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black font-outfit">Ibu Menyusui (ASI)</div>
                <div className="text-[11px] text-slate-500">Laktasi & Nilai RID %</div>
              </button>
            </div>
          </div>

          {/* Search & Add Drug to Patient List */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-outfit">
              Daftar Obat Resep Pasien yang Sedang Dievaluasi
            </h3>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Ketik nama obat (misal: Captopril, Metformin, Amoxicillin, Ibuprofen, Simvastatin)..."
                value={searchQueryScreening}
                onChange={e => setSearchQueryScreening(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40"
              />

              {/* Suggestions Dropdown */}
              {drugSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 space-y-1 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-bold text-slate-400 px-3 py-1">Pilih Obat untuk Ditambahkan:</div>
                  {drugSuggestions.map(d => (
                    <button
                      key={d.id}
                      onClick={() => handleAddDrugToScreening(d.id)}
                      className="w-full p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white font-outfit">{d.name}</div>
                        <div className="text-[10px] text-slate-500">{d.category}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${getFdaBadge(d.fdaCategory).bg}`}>
                          FDA {d.fdaCategory}
                        </span>
                        <Plus className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Drugs Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedDrugs.map(d => (
                <div
                  key={d.id}
                  className={`pl-3 pr-2 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                    d.isContraindicatedInPregnancy || d.fdaCategory === 'X' || d.fdaCategory === 'D'
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                      : 'bg-teal-50 dark:bg-teal-950/40 border-teal-300 dark:border-teal-800 text-teal-900 dark:text-teal-200'
                  }`}
                >
                  <span>{d.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">
                    Kategori {d.fdaCategory}
                  </span>
                  <button
                    onClick={() => handleRemoveDrugFromScreening(d.id)}
                    className="p-1 hover:bg-black/10 rounded-lg cursor-pointer"
                    title="Hapus obat"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-500 hover:text-rose-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SCREENING EVALUATION CARDS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                Evaluasi Klinis & Penilaian Risiko Keamanan ({selectedDrugs.length} Obat)
              </h3>
            </div>

            {selectedDrugs.map((drug, index) => {
              const fdaBadge = getFdaBadge(drug.fdaCategory);
              const halesBadge = getHalesBadge(drug.halesLactationRating);

              // Specific risk for selected trimester
              const specificTrimesterRisk =
                patientTrimester === 't1'
                  ? drug.trimesterRisks.trimester1
                  : patientTrimester === 't2'
                  ? drug.trimesterRisks.trimester2
                  : patientTrimester === 't3'
                  ? drug.trimesterRisks.trimester3
                  : drug.breastfeedingSummary;

              const isHighRisk = drug.fdaCategory === 'X' || drug.fdaCategory === 'D' || drug.isContraindicatedInPregnancy;

              return (
                <div
                  key={drug.id}
                  className={`p-6 rounded-3xl border transition-all shadow-sm ${
                    isHighRisk
                      ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-400">#{index + 1}</span>
                        <h4 className="text-lg font-black text-slate-900 dark:text-white font-outfit">
                          {drug.name}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">({drug.genericName})</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{drug.category}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-black px-3 py-1 rounded-xl border ${fdaBadge.bg}`}>
                        {fdaBadge.label}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${halesBadge.color}`}>
                        Laktasi: {halesBadge.label}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4 text-xs">
                    {/* Column 1: Specific Trimester Alert */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 border border-slate-200 dark:border-slate-700/50">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white font-outfit uppercase tracking-wider text-[11px]">
                        <Baby className="w-4 h-4 text-pink-600" />
                        <span>
                          {patientTrimester === 't1'
                            ? 'Risiko Trimester 1 (Organogenesis):'
                            : patientTrimester === 't2'
                            ? 'Risiko Trimester 2 (Janin):'
                            : patientTrimester === 't3'
                            ? 'Risiko Trimester 3 (Persalinan):'
                            : 'Profil Keamanan Menyusui (ASI):'}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {specificTrimesterRisk}
                      </p>
                      {patientTrimester === 'lactation' && (
                        <div className="text-[11px] font-bold text-teal-700 dark:text-teal-300 pt-1 border-t border-slate-200 dark:border-slate-700">
                          Relative Infant Dose (RID): {drug.relativeInfantDosePercent}%
                        </div>
                      )}
                    </div>

                    {/* Column 2: Teratogenic Alert or PLLR Summary */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 border border-slate-200 dark:border-slate-700/50">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white font-outfit uppercase tracking-wider text-[11px]">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Peringatan Teratogenik & FDA PLLR:</span>
                      </div>
                      {drug.teratogenicAlert ? (
                        <div className="p-2.5 rounded-xl bg-rose-100/70 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200 font-bold leading-relaxed">
                          ⚠️ {drug.teratogenicAlert}
                        </div>
                      ) : (
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {drug.pllrSummary}
                        </p>
                      )}
                    </div>

                    {/* Column 3: Safe Alternatives & Recommendation */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 space-y-2 border border-emerald-200 dark:border-emerald-900/50">
                      <div className="flex items-center gap-2 font-bold text-emerald-950 dark:text-emerald-300 font-outfit uppercase tracking-wider text-[11px]">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Alternatif Pengganti yang Lebih Aman:</span>
                      </div>
                      <div className="space-y-1">
                        {drug.safeAlternatives.map((alt, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-200 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{alt}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-emerald-200 dark:border-emerald-900/60 text-[11px] text-emerald-950 dark:text-emerald-200 font-medium">
                        💡 <strong>Saran Klinis:</strong> {drug.clinicalRecommendations}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: ALTERNATIF AMAN PER KONDISI KLINIS                              */}
      {/* ========================================================================= */}
      {activeTab === 'conditions' && (
        <div className="space-y-6 animate-fade-in">
          {/* Condition Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SAFE_PREGNANCY_CONDITIONS.map(cond => (
              <button
                key={cond.id}
                onClick={() => setSelectedConditionId(cond.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedConditionId === cond.id
                    ? 'bg-gradient-to-br from-pink-500/15 to-teal-500/15 border-pink-500 shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="text-[10px] font-extrabold text-pink-600 dark:text-pink-400 font-outfit uppercase">
                  {cond.category}
                </div>
                <div className="text-xs font-black text-slate-900 dark:text-white font-outfit mt-0.5">
                  {cond.conditionName}
                </div>
              </button>
            ))}
          </div>

          {/* Active Condition Details */}
          {(() => {
            const cond = SAFE_PREGNANCY_CONDITIONS.find(c => c.id === selectedConditionId);
            if (!cond) return null;

            return (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-800 dark:text-pink-300 font-outfit">
                      Protokol Rekomendasi Klinis Bumil
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit mt-1">
                      Panduan Terapi: {cond.conditionName}
                    </h3>
                  </div>
                </div>

                {/* 1. First-line safe drugs */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-800 dark:text-emerald-300 font-outfit uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Obat Pilihan Lini Pertama (First-Line Safe Regimens):</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cond.firstLineSafeDrugs.map((d, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/80 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-emerald-950 dark:text-emerald-200 font-outfit text-sm">
                            {d.drugName}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
                            {d.fdaCategory}
                          </span>
                        </div>
                        <div className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300">
                          Dosis: {d.dosageNote}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                          {d.safetyProfile}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Strictly Contraindicated Drugs */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-black text-rose-800 dark:text-rose-300 font-outfit uppercase tracking-wider">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Obat yang KONTRAINDIKASI MUTLAK / HARUS DIHINDARI:</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cond.strictlyContraindicatedDrugs.map((d, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800/80 space-y-1 text-xs"
                      >
                        <div className="font-black text-rose-950 dark:text-rose-200 font-outfit text-sm">
                          ❌ {d.drugName}
                        </div>
                        <p className="text-rose-900 dark:text-rose-200/90 leading-relaxed font-medium">
                          Bahaya: {d.riskReason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Clinical Pearls */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white font-outfit">
                    <Info className="w-4 h-4 text-pink-600" />
                    <span>Poin Kritis & Mutiara Klinis:</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
                    {cond.clinicalPearls.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: DAFTAR TERATOGENIK & KATEGORI X                                 */}
      {/* ========================================================================= */}
      {activeTab === 'teratogens' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-black text-sm font-outfit">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Daftar Obat Teratogenik Kuat & Black Box Warnings pada Kehamilan</span>
            </div>
            <p className="text-xs text-rose-950 dark:text-rose-200/90 leading-relaxed">
              Obat-obat berikut terbukti secara epidemiologis dan klinis menyebabkan malformasi kongenital berat, aborsi janin spontan, atau kematian perinatal. <strong>Dilarang keras diresepkan pada wanita hamil tanpa pertimbangan darurat khusus.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teratogenicDrugs.map(drug => (
              <div
                key={drug.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <div>
                    <h4 className="text-base font-black text-rose-950 dark:text-rose-300 font-outfit">
                      {drug.name}
                    </h4>
                    <div className="text-xs text-slate-500">{drug.category}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-black text-xs">
                    FDA Kategori {drug.fdaCategory}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {drug.teratogenicAlert && (
                    <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-bold border border-rose-200 dark:border-rose-800">
                      🚨 Sindrom Teratogenik: {drug.teratogenicAlert}
                    </div>
                  )}

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {drug.pllrSummary}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-500">Alternatif Aman:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      {drug.safeAlternatives.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: DIREKTORI LENGKAP MONOGRAFI                                     */}
      {/* ========================================================================= */}
      {activeTab === 'directory' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama obat, generik, atau nama paten..."
                value={dirSearchQuery}
                onChange={e => setDirSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <select
              value={dirFdaFilter}
              onChange={e => setDirFdaFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="all">Semua Kategori FDA</option>
              <option value="A">Kategori A (Sangat Aman)</option>
              <option value="B">Kategori B (Aman)</option>
              <option value="C">Kategori C (Perhatian)</option>
              <option value="D">Kategori D (Berisiko)</option>
              <option value="X">Kategori X (Kontraindikasi)</option>
            </select>
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDirectoryDrugs.map(drug => {
              const fdaBadge = getFdaBadge(drug.fdaCategory);
              const halesBadge = getHalesBadge(drug.halesLactationRating);

              return (
                <div
                  key={drug.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                          {drug.name}
                        </h4>
                        <div className="text-xs text-slate-500 font-medium">({drug.genericName})</div>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg border ${fdaBadge.bg}`}>
                        FDA {drug.fdaCategory}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold text-teal-700 dark:text-teal-400">
                      {drug.category}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-medium">
                      {drug.pllrSummary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${halesBadge.color}`}>
                      Laktasi: {drug.halesLactationRating} (RID {drug.relativeInfantDosePercent}%)
                    </span>

                    <button
                      onClick={() => setSelectedDrugModal(drug)}
                      className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: Detail Monografi Obat Lengkap */}
      {selectedDrugModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0c1e22] w-full max-w-2xl rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 border border-slate-200 dark:border-teal-900/60 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-outfit">
                    {selectedDrugModal.name}
                  </h3>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg border ${getFdaBadge(selectedDrugModal.fdaCategory).bg}`}>
                    FDA {selectedDrugModal.fdaCategory}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">{selectedDrugModal.genericName} • {selectedDrugModal.category}</div>
              </div>
              <button
                onClick={() => setSelectedDrugModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {selectedDrugModal.brandNames && (
                <div>
                  <span className="font-bold text-slate-500">Nama Paten / Dagang:</span>{' '}
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {selectedDrugModal.brandNames.join(', ')}
                  </span>
                </div>
              )}

              {/* Trimester Matrix */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white font-outfit uppercase tracking-wider text-[11px]">
                  Evaluasi Risiko Berdasarkan Usia Kehamilan:
                </div>
                <div className="space-y-1.5">
                  <div><strong>• Trimester 1 (Minggu 1-12):</strong> {selectedDrugModal.trimesterRisks.trimester1}</div>
                  <div><strong>• Trimester 2 (Minggu 13-27):</strong> {selectedDrugModal.trimesterRisks.trimester2}</div>
                  <div><strong>• Trimester 3 (Minggu 28-40+):</strong> {selectedDrugModal.trimesterRisks.trimester3}</div>
                </div>
              </div>

              {/* Lactation Profile */}
              <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-1.5 text-teal-950 dark:text-teal-200">
                <div className="font-bold font-outfit uppercase tracking-wider text-[11px]">
                  Profil Keamanan Menyusui & Laktasi (Hale's {selectedDrugModal.halesLactationRating}):
                </div>
                <div>{selectedDrugModal.breastfeedingSummary}</div>
                <div className="font-bold pt-1 border-t border-teal-200 dark:border-teal-800">
                  Relative Infant Dose (RID): {selectedDrugModal.relativeInfantDosePercent}%
                </div>
              </div>

              {/* Safe Alternatives */}
              <div>
                <span className="font-bold text-slate-500">Alternatif Aman untuk Kehamilan:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedDrugModal.safeAlternatives.map((alt, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                      ✓ {alt}
                    </span>
                  ))}
                </div>
              </div>

              {/* References & Monograph CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
                <div className="text-slate-400">
                  <strong>Rujukan Resmi:</strong> {selectedDrugModal.references}
                </div>
                {onOpenDrugDetail && (
                  <button
                    onClick={() => {
                      const drugName = selectedDrugModal.name;
                      setSelectedDrugModal(null);
                      onOpenDrugDetail(drugName);
                    }}
                    className="bg-[#0f766e] hover:bg-[#115e59] text-white font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer self-end sm:self-auto hover:scale-[1.02]"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Lihat Monografi Lengkap</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
