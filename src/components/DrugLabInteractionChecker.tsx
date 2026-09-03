import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  Microscope,
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
  Activity,
  TestTubes,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  DRUG_LAB_INTERACTIONS_DATABASE,
  LAB_PANEL_GUIDES,
  DrugLabInteraction,
  LabPanelGuide,
  LabCategory,
  LabSeverity,
  LabInteractionEffectType
} from '../data/drugLabInteractionsData';

interface DrugLabInteractionCheckerProps {
  onSelectTab?: (tabId: string) => void;
  onOpenPricingModal?: () => void;
}

export const DrugLabInteractionChecker: React.FC<DrugLabInteractionCheckerProps> = ({
  onSelectTab,
  onOpenPricingModal
}) => {
  const [activeTab, setActiveTab] = useState<'screening' | 'critical' | 'panels' | 'directory'>('screening');

  // 1. Screening State
  const [selectedInteractions, setSelectedInteractions] = useState<string[]>([
    'dli-biotin-troponin',
    'dli-trimethoprim-creatinine',
    'dli-ceftriaxone-coombs'
  ]);
  const [screeningSearchQuery, setScreeningSearchQuery] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // 2. Directory State
  const [dirSearchQuery, setDirSearchQuery] = useState('');
  const [dirCategoryFilter, setDirCategoryFilter] = useState<string>('all');
  const [dirSeverityFilter, setDirSeverityFilter] = useState<string>('all');
  const [selectedDetailModal, setSelectedDetailModal] = useState<DrugLabInteraction | null>(null);

  // 3. Panel Guide State
  const [selectedPanelId, setSelectedPanelId] = useState<string>(LAB_PANEL_GUIDES[0]?.id || '');

  // Selected drug lab interactions for screening
  const activeScreeningList = useMemo(() => {
    return selectedInteractions
      .map(id => DRUG_LAB_INTERACTIONS_DATABASE.find(d => d.id === id))
      .filter((d): d is DrugLabInteraction => Boolean(d));
  }, [selectedInteractions]);

  // Autocomplete drug suggestions for screening
  const drugSuggestions = useMemo(() => {
    if (!screeningSearchQuery.trim()) return [];
    const q = screeningSearchQuery.toLowerCase();
    return DRUG_LAB_INTERACTIONS_DATABASE.filter(
      d =>
        !selectedInteractions.includes(d.id) &&
        (d.drugName.toLowerCase().includes(q) ||
          d.genericName.toLowerCase().includes(q) ||
          d.labTestName.toLowerCase().includes(q) ||
          d.drugClass.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [screeningSearchQuery, selectedInteractions]);

  // Filtered directory interactions
  const filteredDirectory = useMemo(() => {
    return DRUG_LAB_INTERACTIONS_DATABASE.filter(d => {
      const matchCat = dirCategoryFilter === 'all' || d.labCategory === dirCategoryFilter;
      const matchSev = dirSeverityFilter === 'all' || d.severity.includes(dirSeverityFilter);
      if (!matchCat || !matchSev) return false;

      if (!dirSearchQuery.trim()) return true;
      const q = dirSearchQuery.toLowerCase();
      return (
        d.drugName.toLowerCase().includes(q) ||
        d.genericName.toLowerCase().includes(q) ||
        d.labTestName.toLowerCase().includes(q) ||
        d.drugClass.toLowerCase().includes(q) ||
        d.distortionDescription.toLowerCase().includes(q)
      );
    });
  }, [dirSearchQuery, dirCategoryFilter, dirSeverityFilter]);

  // Critical False Results
  const criticalInteractions = useMemo(() => {
    return DRUG_LAB_INTERACTIONS_DATABASE.filter(d => d.severity === 'Kritis (Critical)');
  }, []);

  const handleAddInteraction = (id: string) => {
    if (!selectedInteractions.includes(id)) {
      setSelectedInteractions([...selectedInteractions, id]);
    }
    setScreeningSearchQuery('');
  };

  const handleRemoveInteraction = (id: string) => {
    setSelectedInteractions(selectedInteractions.filter(i => i !== id));
  };

  const getSeverityBadge = (severity: LabSeverity) => {
    switch (severity) {
      case 'Kritis (Critical)':
        return 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      case 'Signifikan (Significant)':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Moderat (Moderate)':
        return 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800';
    }
  };

  const getEffectTypeBadge = (effectType: LabInteractionEffectType) => {
    switch (effectType) {
      case 'False Negative / Falsely Low':
        return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-400/40';
      case 'False Positive / Falsely High':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/40';
      case 'Physiological Alteration':
        return 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-400/40';
    }
  };

  const handleCopySummary = () => {
    const lines = [
      `*HASIL EVALUASI INTERAKSI OBAT - UJI LABORATORIUM (DLI)*`,
      `*Aplikasi FARMASIDRUGGIST (Standar Tietz & AACC)*`,
      `Jumlah Temuan Interferensi: ${activeScreeningList.length}`,
      ...activeScreeningList.map((item, idx) => {
        return `${idx + 1}. *${item.drugName}* ➔ *Uji ${item.labTestName}*\n• Dampak Hasil: ${item.distortionDescription}\n• Mekanisme: ${item.biochemicalMechanism}\n• Solusi Lab: ${item.managementRecommendation}`;
      }),
      `\n_Konfirmasikan dengan Tim Patologi Klinik & Laboratorium Rumah Sakit._`
    ];

    navigator.clipboard.writeText(lines.join('\n\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* HERO BANNER - ELECTRIC CYAN & MIDNIGHT NAVY */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#030914] via-[#07192b] to-[#0c273e] p-6 sm:p-8 text-white shadow-2xl border border-cyan-500/25">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <FlaskConical className="w-48 h-48 text-cyan-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold font-outfit">
              <Microscope className="w-3.5 h-3.5" />
              <span>Standar Tietz Clinical Guide to Laboratory Tests &amp; AACC Guidelines</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-950/50 shrink-0">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Interaksi Obat dengan Uji Laboratorium
                </h1>
                <p className="text-xs sm:text-sm text-cyan-100/80 font-medium">
                  Deteksi gangguan analit in vitro, hasil positif/negatif palsu pada pemeriksaan Troponin, Tiroid, Ginjal, Glukosa, dan Skrining Narkoba Urin.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-cyan-200">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interferensi Analitik &amp; Fisiologis</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-rose-200">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-300" />
                <span>Pencegahan Misdiagnosis</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protokol Konfirmasi Uji Lab</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-cyan-950/60 text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Total Parameter Terdaftar:</span>
              <span className="text-lg font-black text-cyan-400">{DRUG_LAB_INTERACTIONS_DATABASE.length} Pasangan Uji Lab</span>
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
              ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Skrining Resep ➔ Dampak Lab</span>
        </button>

        <button
          onClick={() => setActiveTab('critical')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'critical'
              ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Hasil Lab Palsu Kritis</span>
        </button>

        <button
          onClick={() => setActiveTab('panels')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'panels'
              ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <TestTubes className="w-4 h-4" />
          <span>Panduan Panel Laboratorium</span>
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'directory'
              ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Direktori Lengkap Uji Lab</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: SKRINING RESEP ➔ DAMPAK UJI LAB                                */}
      {/* ========================================================================= */}
      {activeTab === 'screening' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search Box */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-outfit">
                  Pilih Obat / Uji Lab Pasien untuk Diskrin
                </h3>
                <p className="text-xs text-slate-500">
                  Periksa apakah obat yang dikonsumsi pasien dapat mengubah, menaikkan, atau menurunkan nilai hasil tes laboratorium secara palsu.
                </p>
              </div>
              <button
                onClick={handleCopySummary}
                className="px-3 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 text-xs font-bold flex items-center gap-1.5 hover:bg-violet-100 cursor-pointer"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? 'Tersalin!' : 'Salin Laporan WhatsApp'}</span>
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Ketik nama obat atau nama tes lab (misal: Biotin, Troponin, Cotrimoxazole, Ceftriaxone, Levofloxacin, Vitamin C)..."
                value={screeningSearchQuery}
                onChange={e => setScreeningSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />

              {/* Suggestions */}
              {drugSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 space-y-1 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-bold text-slate-400 px-3 py-1">Pilih Interferensi untuk Ditambahkan:</div>
                  {drugSuggestions.map(d => (
                    <button
                      key={d.id}
                      onClick={() => handleAddInteraction(d.id)}
                      className="w-full p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white font-outfit">
                          {d.drugName} ➔ {d.labTestName}
                        </div>
                        <div className="text-[10px] text-slate-500">{d.labCategory}</div>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${getSeverityBadge(d.severity)}`}>
                        {d.severity}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {activeScreeningList.map(item => (
                <div
                  key={item.id}
                  className="pl-3 pr-2 py-1.5 rounded-xl border border-violet-300 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 text-xs font-bold flex items-center gap-2"
                >
                  <span>{item.drugName} ➔ {item.labTestName}</span>
                  <button
                    onClick={() => handleRemoveInteraction(item.id)}
                    className="p-1 hover:bg-black/10 rounded-lg cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-500 hover:text-rose-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Screening Cards */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
              Daftar Dampak Interferensi Laboratorium ({activeScreeningList.length} Temuan)
            </h3>

            {activeScreeningList.map((item, index) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-400">#{index + 1}</span>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white font-outfit">
                        {item.drugName}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">({item.drugClass})</span>
                    </div>
                    <div className="text-xs font-bold text-violet-600 dark:text-violet-400 mt-0.5">
                      Target Uji Lab: <strong>{item.labTestName}</strong> ({item.labCategory})
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${getEffectTypeBadge(item.effectType)}`}>
                      {item.effectType}
                    </span>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${getSeverityBadge(item.severity)}`}>
                      {item.severity}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                  {/* Distortion Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5 border border-slate-200 dark:border-slate-700/50">
                    <div className="font-bold text-slate-900 dark:text-white font-outfit uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>Dampak Distorsi Hasil Lab:</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      {item.distortionDescription}
                    </p>
                    <p className="text-slate-500 text-[11px] pt-1 border-t border-slate-200 dark:border-slate-700">
                      <strong>Dampak Klinis:</strong> {item.clinicalImpact}
                    </p>
                  </div>

                  {/* Mechanism Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5 border border-slate-200 dark:border-slate-700/50">
                    <div className="font-bold text-slate-900 dark:text-white font-outfit uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Microscope className="w-4 h-4 text-violet-500" />
                      <span>Mekanisme Biokimia / Analitik:</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {item.biochemicalMechanism}
                    </p>
                  </div>

                  {/* Solution Box */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 space-y-1.5 border border-emerald-200 dark:border-emerald-900/50">
                    <div className="font-bold text-emerald-950 dark:text-emerald-300 font-outfit uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Protokol Solusi & Manajemen Lab:</span>
                    </div>
                    <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                      {item.managementRecommendation}
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-emerald-200 dark:border-emerald-900/60">
                      Rujukan: {item.references}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: HASIL LAB PALSU KRITIS                                          */}
      {/* ========================================================================= */}
      {activeTab === 'critical' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-black text-sm font-outfit">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Interferensi Laboratorium Berbahaya (Critical False Readings)</span>
            </div>
            <p className="text-xs text-rose-950 dark:text-rose-200/90 leading-relaxed">
              Interferensi berikut memiliki risiko fatal tinggi seperti <strong>kegagalan mendiagnosis serangan jantung (NSTEMI)</strong> atau memicu <strong>hipoglikemia berat akibat kesalahan dosis insulin</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criticalInteractions.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <div>
                    <h4 className="text-base font-black text-rose-950 dark:text-rose-300 font-outfit">
                      {item.drugName}
                    </h4>
                    <div className="text-xs text-slate-500">Uji: {item.labTestName}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-black text-xs">
                    {item.severity}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-bold border border-rose-200 dark:border-rose-800">
                    🚨 Dampak: {item.distortionDescription}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    <strong>Bahaya Klinis:</strong> {item.clinicalImpact}
                  </p>

                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-medium border border-emerald-200 dark:border-emerald-800">
                    💡 <strong>Prosedur Solusi:</strong> {item.managementRecommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: PANDUAN PANEL LABORATORIUM                                      */}
      {/* ========================================================================= */}
      {activeTab === 'panels' && (
        <div className="space-y-6 animate-fade-in">
          {/* Panel Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {LAB_PANEL_GUIDES.map(panel => (
              <button
                key={panel.id}
                onClick={() => setSelectedPanelId(panel.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedPanelId === panel.id
                    ? 'bg-gradient-to-br from-violet-500/15 to-cyan-500/15 border-violet-500 shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="text-[10px] font-extrabold text-violet-600 dark:text-violet-400 font-outfit uppercase">
                  {panel.category}
                </div>
                <div className="text-xs font-black text-slate-900 dark:text-white font-outfit mt-0.5">
                  {panel.panelName}
                </div>
              </button>
            ))}
          </div>

          {/* Active Panel Details */}
          {(() => {
            const panel = LAB_PANEL_GUIDES.find(p => p.id === selectedPanelId);
            if (!panel) return null;

            return (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 font-outfit">
                    Modul Patologi Klinik
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit mt-1">
                    {panel.panelName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{panel.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white font-outfit uppercase tracking-wider">
                    <FlaskConical className="w-4 h-4 text-violet-600" />
                    <span>Daftar Obat yang Mengganggu Panel Ini:</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {panel.commonInterferingDrugs.map((d, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5 text-xs"
                      >
                        <div className="font-black text-violet-900 dark:text-violet-300 font-outfit text-sm">
                          {d.drugName}
                        </div>
                        <div className="text-[11px] font-bold text-rose-700 dark:text-rose-400">
                          ⚠️ {d.effect}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          <strong>Mekanisme:</strong> {d.mechanism}
                        </p>
                        <div className="pt-1 border-t border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                          ✓ Solusi: {d.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Pearls */}
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-950 dark:text-amber-300 font-outfit">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span>Poin Kritis Laboratorium:</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-amber-950 dark:text-amber-200 space-y-1 font-medium">
                    {panel.clinicalPearls.map((p, i) => (
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
      {/* SUBTAB 4: DIREKTORI LENGKAP UJI LAB                                      */}
      {/* ========================================================================= */}
      {activeTab === 'directory' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search & Filters */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari obat, nama tes lab, atau mekanisme..."
                value={dirSearchQuery}
                onChange={e => setDirSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <select
              value={dirCategoryFilter}
              onChange={e => setDirCategoryFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="all">Semua Kategori Lab</option>
              <option value="Kardiologi & Enzim Jantung">Kardiologi & Enzim Jantung</option>
              <option value="Tiroid & Endokrin">Tiroid & Endokrin</option>
              <option value="Fungsi Ginjal & Elektrolit">Fungsi Ginjal & Elektrolit</option>
              <option value="Hematologi & Imunohematologi">Hematologi & Imunohematologi</option>
              <option value="Glukosa & Metabolik">Glukosa & Metabolik</option>
              <option value="Toksikologi & Narkoba Urin">Toksikologi & Narkoba Urin</option>
            </select>

            <select
              value={dirSeverityFilter}
              onChange={e => setDirSeverityFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="all">Semua Tingkat Keparahan</option>
              <option value="Kritis">Kritis (Critical)</option>
              <option value="Signifikan">Signifikan (Significant)</option>
              <option value="Moderat">Moderat (Moderate)</option>
            </select>
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDirectory.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                        {item.drugName}
                      </h4>
                      <div className="text-xs text-slate-500 font-medium">Uji: {item.labTestName}</div>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${getSeverityBadge(item.severity)}`}>
                      {item.severity}
                    </span>
                  </div>

                  <div className="text-[11px] font-bold text-violet-700 dark:text-violet-400">
                    {item.labCategory}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">
                    {item.distortionDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getEffectTypeBadge(item.effectType)}`}>
                    {item.effectType}
                  </span>

                  <button
                    onClick={() => setSelectedDetailModal(item)}
                    className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Detail Interaksi Lab Lengkap */}
      {selectedDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0d1f2d] w-full max-w-2xl rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 border border-slate-200 dark:border-violet-900/60 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-outfit">
                    {selectedDetailModal.drugName} ➔ {selectedDetailModal.labTestName}
                  </h3>
                </div>
                <div className="text-xs text-slate-500 font-medium">{selectedDetailModal.drugClass} • {selectedDetailModal.labCategory}</div>
              </div>
              <button
                onClick={() => setSelectedDetailModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                <div className="font-bold uppercase tracking-wider text-[11px] mb-1">Dampak Terhadap Hasil Uji:</div>
                <div className="font-semibold text-sm">{selectedDetailModal.distortionDescription}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Mekanisme Biokimiawi & Analitik:
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedDetailModal.biochemicalMechanism}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5 text-emerald-950 dark:text-emerald-200">
                <div className="font-bold uppercase tracking-wider text-[11px]">
                  Rekomendasi Manajemen & Konfirmasi Lab:
                </div>
                <p className="leading-relaxed font-medium">{selectedDetailModal.managementRecommendation}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-[11px]">
                <strong>Rujukan Resmi:</strong> {selectedDetailModal.references}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
