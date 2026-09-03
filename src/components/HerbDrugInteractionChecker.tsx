import React, { useState, useMemo } from 'react';
import {
  Leaf,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Trash2,
  Share2,
  Printer,
  Copy,
  Check,
  BookOpen,
  Info,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Layers,
  Activity,
  HeartPulse,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  HERB_DRUG_INTERACTIONS_DATABASE,
  INDONESIAN_HERB_PROFILES,
  HerbDrugInteraction,
  HerbProfile,
  HerbInteractionSeverity,
  HerbInteractionType
} from '../data/herbDrugInteractionsData';
import { FloatingPillsBackground } from './FloatingPillsBackground';

interface HerbDrugInteractionCheckerProps {
  onSelectTab?: (tabId: string) => void;
  onOpenPricingModal?: () => void;
}

export const HerbDrugInteractionChecker: React.FC<HerbDrugInteractionCheckerProps> = ({
  onSelectTab,
  onOpenPricingModal
}) => {
  const [activeTab, setActiveTab] = useState<'screening' | 'monographs' | 'critical' | 'guidelines'>('screening');

  // 1. Screening State
  const [selectedInteractionIds, setSelectedInteractionIds] = useState<string[]>([
    'hdi-curcuma-warfarin',
    'hdi-sambiloto-immunosuppressant',
    'hdi-garlic-anticoagulant'
  ]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCounseling, setCopiedCounseling] = useState<boolean>(false);

  // 2. Monograph State
  const [selectedHerbModal, setSelectedHerbModal] = useState<HerbProfile | null>(null);
  const [selectedInteractionDetail, setSelectedInteractionDetail] = useState<HerbDrugInteraction | null>(null);
  const [monographSearchQuery, setMonographSearchQuery] = useState<string>('');

  // Filtered Monographs
  const filteredMonographs = useMemo(() => {
    if (!monographSearchQuery.trim()) return INDONESIAN_HERB_PROFILES;
    const q = monographSearchQuery.toLowerCase();
    return INDONESIAN_HERB_PROFILES.filter(
      herb =>
        herb.name.toLowerCase().includes(q) ||
        herb.latinName.toLowerCase().includes(q) ||
        herb.commonIndonesianNames.some(n => n.toLowerCase().includes(q)) ||
        herb.activeCompounds.toLowerCase().includes(q) ||
        herb.traditionalUses.some(u => u.toLowerCase().includes(q))
    );
  }, [monographSearchQuery]);

  // Active screening list
  const activeScreeningList = useMemo(() => {
    return selectedInteractionIds
      .map(id => HERB_DRUG_INTERACTIONS_DATABASE.find(item => item.id === id))
      .filter((item): item is HerbDrugInteraction => Boolean(item));
  }, [selectedInteractionIds]);

  // Autocomplete Suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return HERB_DRUG_INTERACTIONS_DATABASE.filter(
      item =>
        !selectedInteractionIds.includes(item.id) &&
        (item.herbName.toLowerCase().includes(q) ||
          item.latinName.toLowerCase().includes(q) ||
          item.drugName.toLowerCase().includes(q) ||
          item.drugClass.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [searchQuery, selectedInteractionIds]);

  // Critical Interactions
  const criticalInteractions = useMemo(() => {
    return HERB_DRUG_INTERACTIONS_DATABASE.filter(item => item.severity === 'Mayor (Tinggi)');
  }, []);

  const handleAddInteraction = (id: string) => {
    if (!selectedInteractionIds.includes(id)) {
      setSelectedInteractionIds([...selectedInteractionIds, id]);
    }
    setSearchQuery('');
  };

  const handleRemoveInteraction = (id: string) => {
    setSelectedInteractionIds(selectedInteractionIds.filter(i => i !== id));
  };

  const getSeverityBadge = (severity: HerbInteractionSeverity) => {
    switch (severity) {
      case 'Mayor (Tinggi)':
        return 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      case 'Moderat (Sedang)':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Minor (Ringan)':
        return 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800';
    }
  };

  const handleCopyCounseling = () => {
    const lines = [
      `*LEMBAR EDUKASI & PENAPISAN INTERAKSI HERBAL-OBAT (HDI)*`,
      `*Aplikasi FARMASIDRUGGIST (Standar FOHI Kemenkes & WHO)*`,
      `Jumlah Temuan Interaksi: ${activeScreeningList.length}`,
      ...activeScreeningList.map((item, idx) => {
        return `${idx + 1}. *${item.herbName}* (${item.latinName}) ➔ *${item.drugName}*\n• Tingkat Risiko: ${item.severity}\n• Dampak Klinis: ${item.clinicalEffect}\n• Rekomendasi Apoteker: ${item.clinicalRecommendation}`;
      }),
      `\n_Konsultasikan selalu dengan Apoteker atau Dokter Anda sebelum mengombinasikan jamu/herbal dengan obat resep dokter._`
    ];

    navigator.clipboard.writeText(lines.join('\n\n'));
    setCopiedCounseling(true);
    setTimeout(() => setCopiedCounseling(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* HERO BANNER - EMERALD JADE & DARK MOSS */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#030e08] via-[#071f13] to-[#0c2e1c] p-6 sm:p-8 text-white shadow-2xl border border-emerald-500/25">
        <FloatingPillsBackground density="low" accentColor="#34d399" />
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <Leaf className="w-48 h-48 text-emerald-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-outfit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Formularium Obat Herbal Asli Indonesia (FOHI) Kemenkes &amp; WHO Monographs</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-950/50 shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Interaksi Herbal &amp; Obat Indonesia (HDI)
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100/80 font-medium">
                  Penapisan klinis interaksi Jamu, OHT &amp; Fitofarmaka (Kunyit, Temulawak, Sambiloto, Bawang Putih, Kumis Kucing, Ginkgo) terhadap obat resep sintetik.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sitokrom CYP &amp; P-Glikoprotein</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-rose-200">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-300" />
                <span>Pencegahan Perdarahan Masif</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-teal-200">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                <span>Protokol Penghentian Pra-Bedah</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-emerald-950/60 text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Total Herbal Terdaftar:</span>
              <span className="text-lg font-black text-emerald-400">{INDONESIAN_HERB_PROFILES.length} Herbal &amp; {HERB_DRUG_INTERACTIONS_DATABASE.length} Interaksi</span>
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
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Skrining Herbal ➔ Resep Obat</span>
        </button>

        <button
          onClick={() => setActiveTab('monographs')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'monographs'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Monografi Herbal Indonesia</span>
        </button>

        <button
          onClick={() => setActiveTab('critical')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'critical'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Peringatan Interaksi Kritis</span>
        </button>

        <button
          onClick={() => setActiveTab('guidelines')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'guidelines'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>Panduan Edukasi Pra-Bedah</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: SKRINING RESEP HERBAL ➔ OBAT PASIEN                             */}
      {/* ========================================================================= */}
      {activeTab === 'screening' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search Box */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-outfit">
                  Pilih Herbal &amp; Obat Resep untuk Diskrin
                </h3>
                <p className="text-xs text-slate-500">
                  Evaluasi potensi perdarahan ganda, hipoglikemia, atau kegagalan imunosupresi akibat konsumsi jamu bersamaan.
                </p>
              </div>
              <button
                onClick={handleCopyCounseling}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-100 cursor-pointer"
              >
                {copiedCounseling ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCounseling ? 'Tersalin!' : 'Salin Laporan WhatsApp'}</span>
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Ketik nama herbal atau obat (misal: Kunyit, Temulawak, Sambiloto, Bawang Putih, Warfarin, Aspirin, Amlodipine, Steroid)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />

              {/* Suggestions */}
              {searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 space-y-1 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-bold text-slate-400 px-3 py-1">Pilih Interaksi untuk Ditambahkan:</div>
                  {searchSuggestions.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleAddInteraction(item.id)}
                      className="w-full p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white font-outfit">
                          {item.herbName} ➔ {item.drugName}
                        </div>
                        <div className="text-[10px] text-slate-500">{item.drugClass}</div>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${getSeverityBadge(item.severity)}`}>
                        {item.severity}
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
                  className="pl-3 pr-2 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 text-xs font-bold flex items-center gap-2"
                >
                  <span>{item.herbName} ➔ {item.drugName}</span>
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

          {/* Active Cards */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
              Daftar Dampak Interaksi Herbal-Obat ({activeScreeningList.length} Temuan)
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
                        {item.herbName} <span className="text-xs font-medium text-slate-500">({item.latinName})</span>
                      </h4>
                    </div>
                    <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                      Interaksi dengan: <strong>{item.drugName}</strong> ({item.drugClass})
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300">
                      {item.interactionType}
                    </span>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${getSeverityBadge(item.severity)}`}>
                      {item.severity}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                  {/* Clinical Effect Box */}
                  <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 space-y-1.5 border border-rose-200 dark:border-rose-900/50">
                    <div className="font-bold text-rose-950 dark:text-rose-300 font-outfit uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Dampak Klinis Terhadap Pasien:</span>
                    </div>
                    <p className="text-rose-950 dark:text-rose-200 font-bold leading-relaxed">
                      {item.clinicalEffect}
                    </p>
                    <p className="text-slate-500 text-[11px] pt-1 border-t border-rose-200 dark:border-rose-900/60">
                      <strong>Zat Aktif Herbal:</strong> {item.herbActiveCompounds}
                    </p>
                  </div>

                  {/* Mechanism Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5 border border-slate-200 dark:border-slate-700/50">
                    <div className="font-bold text-slate-900 dark:text-white font-outfit uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <span>Mekanisme Farmakologi:</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {item.mechanism}
                    </p>
                  </div>

                  {/* Recommendation Box */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 space-y-1.5 border border-emerald-200 dark:border-emerald-900/50">
                    <div className="font-bold text-emerald-950 dark:text-emerald-300 font-outfit uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Rekomendasi Konseling Apoteker:</span>
                    </div>
                    <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                      {item.clinicalRecommendation}
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
      {/* SUBTAB 2: MONOGRAFI HERBAL ASLI INDONESIA                                */}
      {/* ========================================================================= */}
      {activeTab === 'monographs' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari tanaman herbal Indonesia (misal: Kunyit, Sambiloto, Kelor, Meniran, Pegagan, Lidah Buaya, Manggis, Daun Sirsak)..."
                value={monographSearchQuery}
                onChange={e => setMonographSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
            <div className="text-xs font-bold text-slate-500 shrink-0">
              {filteredMonographs.length} Simplisia / Tanaman
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMonographs.map(herb => (
              <div
                key={herb.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-outfit">
                      Tanaman Obat Resmi
                    </span>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white font-outfit mt-1">
                      {herb.name}
                    </h4>
                    <div className="text-xs text-slate-500 italic font-medium">{herb.latinName}</div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300">Zat Aktif Utama:</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px]">{herb.activeCompounds}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                      <strong className="text-[11px] text-emerald-800 dark:text-emerald-300 font-outfit">Khasiat Tradisional:</strong>
                      <ul className="list-disc list-inside text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                        {herb.traditionalUses.slice(0, 3).map((u, i) => (
                          <li key={i}>{u}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-[11px] text-rose-900 dark:text-rose-200">
                      <strong>Kontraindikasi Resep:</strong> {herb.contraindicatedDrugs.join(', ')}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedHerbModal(herb)}
                  className="w-full py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Lihat Monografi Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: PERINGATAN INTERAKSI KRITIS                                    */}
      {/* ========================================================================= */}
      {activeTab === 'critical' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-black text-sm font-outfit">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Interaksi Herbal Kritis Tingkat Mayor (Severe Herb-Drug Red Flags)</span>
            </div>
            <p className="text-xs text-rose-950 dark:text-rose-200/90 leading-relaxed">
              Kombinasi herbal berikut berpotensi menyebabkan komplikasi mematikan seperti <strong>perdarahan otak spontan</strong>, <strong>rejeksi organ pasca-transplantasi</strong>, atau <strong>kegagalan terapi HIV</strong>.
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
                      {item.herbName} ➔ {item.drugName}
                    </h4>
                    <div className="text-xs text-slate-500">{item.latinName}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-black text-xs">
                    {item.severity}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-bold border border-rose-200 dark:border-rose-800">
                    🚨 Bahaya: {item.clinicalEffect}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Mekanisme:</strong> {item.mechanism}
                  </p>

                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-medium border border-emerald-200 dark:border-emerald-800">
                    💡 <strong>Solusi Apoteker:</strong> {item.clinicalRecommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: PANDUAN EDUKASI PRA-BEDAH                                      */}
      {/* ========================================================================= */}
      {activeTab === 'guidelines' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit">
                Pedoman Penghentian Herbal Pra-Operasi Bedah (Preoperative Surgical Washout)
              </h3>
              <p className="text-xs text-slate-500">
                Standar American Society of Anesthesiologists (ASA) &amp; Perhimpunan Dokter Spesialis Anestesiologi Indonesia (PERDATIN).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-2">
                <div className="font-bold text-rose-950 dark:text-rose-300 text-sm font-outfit">
                  Wajib Stop 14 Hari (2 Minggu) Sebelum Operasi:
                </div>
                <ul className="list-disc list-inside space-y-1 text-rose-900 dark:text-rose-200 font-medium">
                  <li><strong>Ginkgo Biloba:</strong> Efek inhibisi Platelet-Activating Factor bertahan lama; risiko hematoma operasi.</li>
                  <li><strong>St. John's Wort:</strong> Induksi enzim hepar masif; menurunkan efektivitas anestesi dan analgesik opioid.</li>
                  <li><strong>Kunyit / Temulawak Dosis Tinggi:</strong> Menghindari risiko perdarahan intraoperatif.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <div className="font-bold text-amber-950 dark:text-amber-300 text-sm font-outfit">
                  Wajib Stop 7 Hari (1 Minggu) Sebelum Operasi:
                </div>
                <ul className="list-disc list-inside space-y-1 text-amber-900 dark:text-amber-200 font-medium">
                  <li><strong>Bawang Putih (Garlic Oil):</strong> Inhibisi agregasi platelet ireversibel selama masa hidup trombosit (7-10 hari).</li>
                  <li><strong>Ginseng:</strong> Risiko fluktuasi tekanan darah dan penurunan kadar gula darah saat puasa operasi.</li>
                  <li><strong>Jahe Pekat:</strong> Inhibisi sintesis tromboksan sintetase.</li>
                </ul>
              </div>
            </div>

            {/* General Advice */}
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 space-y-2 text-xs text-teal-950 dark:text-teal-200">
              <div className="font-bold font-outfit flex items-center gap-1.5">
                <Info className="w-4 h-4 text-teal-600" />
                <span>Aturan Emas Konseling Jamu di Apotek:</span>
              </div>
              <p className="leading-relaxed">
                1. <strong>Beri Jeda Waktu:</strong> Bila pasien tetap ingin mengonsumsi jamu pemeliharaan kesehatan, berikan jarak minimal <strong>2 hingga 3 jam</strong> setelah obat sintetik dokter untuk mencegah gangguan absorpsi lambung.
              </p>
              <p className="leading-relaxed">
                2. <strong>Jangan Pernah Mengganti Obat Esensial:</strong> Edukasi pasien bahwa jamu berfungsi sebagai terapi pendamping (komplementer), bukan pengganti obat antihipertensi, antidiabetes, atau antitiroid tanpa evaluasi dokter spesialis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Detail Monografi Herbal */}
      {selectedHerbModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0a2016] w-full max-w-2xl rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 border border-slate-200 dark:border-emerald-900/60 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white font-outfit">
                  {selectedHerbModal.name}
                </h3>
                <div className="text-xs text-slate-500 italic font-medium">{selectedHerbModal.latinName}</div>
              </div>
              <button
                onClick={() => setSelectedHerbModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Nama Daerah &amp; Sinonim:</div>
                <p className="text-slate-600 dark:text-slate-300">{selectedHerbModal.commonIndonesianNames.join(', ')}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Kandungan Senyawa Aktif:</div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{selectedHerbModal.activeCompounds}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5 text-emerald-950 dark:text-emerald-200">
                <div className="font-bold uppercase tracking-wider text-[11px]">Dampak Terhadap Enzim Sitokrom &amp; P-gp:</div>
                <p className="font-medium">{selectedHerbModal.cypEffects}</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1.5 text-rose-950 dark:text-rose-200">
                <div className="font-bold uppercase tracking-wider text-[11px]">Daftar Obat Kontraindikasi / Bahaya:</div>
                <ul className="list-disc list-inside space-y-1 font-medium">
                  {selectedHerbModal.contraindicatedDrugs.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-1.5 text-amber-950 dark:text-amber-200">
                <div className="font-bold uppercase tracking-wider text-[11px]">Peringatan Klinis Apoteker:</div>
                <ul className="list-disc list-inside space-y-1 font-medium">
                  {selectedHerbModal.clinicalCautions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
