import React, { useState, useMemo } from 'react';
import { 
  SwamedikasiProtocol, 
  SwamedikasiCategoryKey, 
  Drug, 
  ClinicBrandingSettings 
} from '../types';
import { 
  SWAMEDIKASI_PROTOCOLS, 
  SWAMEDIKASI_CATEGORIES,
  searchSwamedikasiProtocols,
  getProtocolsByCategory
} from '../data/swamedikasiData';
import { 
  Search, 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  CloudRain, 
  Eye, 
  Smile, 
  Baby, 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  Pill, 
  Clock, 
  Utensils, 
  ShieldCheck, 
  AlertOctagon, 
  Copy, 
  Check, 
  MessageSquare, 
  X, 
  ArrowRight, 
  Share2, 
  FileText, 
  HeartHandshake, 
  Info,
  ExternalLink,
  ChevronRight,
  Stethoscope,
  RotateCcw,
  Layers
} from 'lucide-react';
import { FloatingPillsBackground } from './FloatingPillsBackground';

interface SwamedikasiManagerProps {
  drugs: Drug[];
  clinicBranding?: ClinicBrandingSettings;
  onCheckInteractionWith?: (drugName: string) => void;
  onAddToPioCard?: (drug: Drug) => void;
  onSelectTab?: (tab: string) => void;
}

export const SwamedikasiManager: React.FC<SwamedikasiManagerProps> = ({
  drugs,
  clinicBranding,
  onCheckInteractionWith,
  onAddToPioCard,
  onSelectTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProtocol, setActiveProtocol] = useState<SwamedikasiProtocol | null>(null);
  const [activeTabModal, setActiveTabModal] = useState<'drugs' | 'lifestyle' | 'redflags' | 'populations' | 'dagusibu'>('drugs');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Filtered protocols based on category and search query
  const filteredProtocols = useMemo(() => {
    let result = selectedCategory === 'all' 
      ? SWAMEDIKASI_PROTOCOLS 
      : getProtocolsByCategory(selectedCategory as SwamedikasiCategoryKey);

    if (searchQuery.trim()) {
      result = searchSwamedikasiProtocols(searchQuery).filter(item => 
        selectedCategory === 'all' || item.category === selectedCategory
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  // Icon mapping helper
  const getCategoryIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'Flame': return <Flame className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'CloudRain': return <CloudRain className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'Smile': return <Smile className={className} />;
      case 'Baby': return <Baby className={className} />;
      case 'Compass': return <Compass className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  // BPOM Classification Badge Styling
  const renderBpomBadge = (bpomClass: string) => {
    if (bpomClass.includes('Hijau') || bpomClass.includes('Bebas (Hijau)')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-300 dark:ring-emerald-700"></span>
          Obat Bebas (Hijau)
        </span>
      );
    }
    if (bpomClass.includes('Biru') || bpomClass.includes('Bebas Terbatas')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-300 dark:ring-blue-700"></span>
          Bebas Terbatas (Biru)
        </span>
      );
    }
    if (bpomClass.includes('OWA') || bpomClass.includes('Wajib Apotek')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-300 dark:ring-amber-700"></span>
          OWA (Obat Wajib Apotek)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
        {bpomClass}
      </span>
    );
  };

  // Convert recommended drug to a Drug model so it can be added to WhatsApp PIO card
  const handleTransferToPio = (genericName: string, brandExamples: string[], dosage: string, timing: string) => {
    const existing = drugs.find(d => 
      d.name.toLowerCase().includes(genericName.toLowerCase()) ||
      d.genericName.toLowerCase().includes(genericName.toLowerCase())
    );

    if (existing) {
      onAddToPioCard?.(existing);
    } else {
      const syntheticDrug: Drug = {
        id: 'swam-' + Date.now(),
        name: brandExamples[0] ? `${genericName} (${brandExamples[0]})` : genericName,
        genericName: genericName,
        brandNames: brandExamples,
        atcCode: 'SWAMEDIKASI',
        category: 'Swamedikasi Bebas / OWA',
        dosage: dosage,
        indication: activeProtocol?.title || 'Swamedikasi Keluhan Ringan',
        mechanismOfAction: timing
      };
      onAddToPioCard?.(syntheticDrug);
    }
  };

  // Copy structured patient counseling education text for WhatsApp
  const handleCopyWhatsAppCounseling = () => {
    if (!activeProtocol) return;

    const clinicHeader = clinicBranding?.clinicName 
      ? `*${clinicBranding.clinicName.toUpperCase()}*\n_${clinicBranding.tagline || 'Layanan Informasi Obat & Konseling Farmasi' }_\n` 
      : `*FARMASI DRUGGIST CLINICAL CARE*\n_Panduan Informasi Obat & Konseling Swamedikasi_\n`;

    const drugsText = activeProtocol.recommendedDrugs.map((d, i) => (
      `*${i + 1}. ${d.genericName}* (${d.bpomClass})\n` +
      `   • Contoh Merk: ${d.brandExamples.slice(0, 3).join(', ')}\n` +
      `   • Aturan Dosis: ${d.dosageGuideline}\n` +
      `   • Waktu Minum: ${d.timing}\n` +
      `   • Catatan: ${d.cautionNotes}\n`
    )).join('\n');

    const lifestyleText = activeProtocol.nonPharmacolTherapy.map(t => `   ✓ ${t}`).join('\n');
    const redFlagsText = activeProtocol.redFlags.map(r => `   ⚠️ ${r}`).join('\n');

    const message = 
`${clinicHeader}
=======================================
📋 *EDUKASI SWAMEDIKASI MANDIRI PASIEN*
Keluhan: *${activeProtocol.title}*
Batas Maksimal Swamedikasi: *${activeProtocol.maxSelfMedDays} Hari*
=======================================

💊 *REKOMENDASI OBAT BEBAS / OWA RESMI:*
${drugsText}
🌿 *TERAPI ALAMI & POLA HIDUP (NON-OBAT):*
${lifestyleText}

🚨 *TANDA BAHAYA (SEGERA KE DOKTER / IGD JIKA):*
${redFlagsText}

💡 *PENGINGAT GEMA CERMAT & DAGUSIBU KEMENKES:*
- JANGAN menggunakan Antibiotik secara mandiri tanpa resep dokter!
- Simpan obat pada suhu sejuk terhindar dari sinar matahari dan jangkauan anak.
- Bila keluhan belum membaik dalam ${activeProtocol.maxSelfMedDays} hari, segera konsultasikan ke Dokter.

Semoga lekas pulih dan sehat selalu! 🙏
=======================================`;

    navigator.clipboard.writeText(message);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // Suggested layman chips for rapid discovery
  const popularKeywords = [
    { label: 'Meriang / Demam', query: 'meriang' },
    { label: 'Sakit Kepala Menusuk', query: 'kepala tegang' },
    { label: 'Sakit Maag / Gerd', query: 'maag lambung' },
    { label: 'Diare Mencret', query: 'mencret' },
    { label: 'Flu & Hidung Mampet', query: 'pilek mampet' },
    { label: 'Batuk Berdahak', query: 'batuk dahak' },
    { label: 'Sariawan Perih', query: 'sariawan' },
    { label: 'Biduran / Gatal Alergi', query: 'biduran' },
    { label: 'Mata Merah Iritasi', query: 'mata merah' },
    { label: 'Mabuk Perjalanan', query: 'mabuk mobil' }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* HERO BANNER - DEEP OBSIDIAN & EMERALD FOREST (Matches other core menus) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#030f0a] via-[#072418] to-[#0b3624] p-6 sm:p-8 text-white shadow-2xl border border-emerald-500/25">
        <FloatingPillsBackground density="low" accentColor="#34d399" />
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <Stethoscope className="w-48 h-48 text-emerald-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-outfit">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pedoman Swamedikasi Kemenkes RI GEMA CERMAT &amp; OWA BPOM</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-950/50 shrink-0">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Swamedikasi &amp; Clinical Triage Keluhan
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100/80 font-medium">
                  Panduan pemilihan obat mandiri untuk masyarakat awam dan nakes berbasis keluhan gejala harian, penapisan tanda bahaya ke dokter, obat bebas resmi BPOM &amp; OWA, serta terapi non-farmakologi alami tanpa antibiotik berlebih.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>GEMA CERMAT &amp; DAGUSIBU</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-teal-200">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span>Obat Bebas, Terbatas &amp; OWA</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-rose-200">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-300" />
                <span>Skrining Tanda Bahaya (Red Flags)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-emerald-950/60 text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Database Protokol Swamedikasi:</span>
              <span className="text-lg font-black text-emerald-400">{SWAMEDIKASI_PROTOCOLS.length} Keluhan &amp; Triage</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR (Consistent with DrugDirectory toolbar suite) */}
      <div className="bg-white dark:bg-[#071c17] p-5 sm:p-6 rounded-3xl border border-emerald-200/80 dark:border-emerald-500/25 shadow-sm space-y-4">
        {/* Top Search Input & Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari keluhan: meriang, flu batuk, sakit gigi, lambung perih, mencret, gatal alergi..."
              className="w-full pl-10 pr-10 py-2.5 text-xs font-bold font-outfit text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                title="Hapus kata kunci"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-3 py-2 text-xs font-bold font-outfit text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Pencarian</span>
            </button>
          )}
        </div>

        {/* Layman Keyword Quick Chips */}
        <div className="pt-3 border-t border-emerald-100 dark:border-emerald-950/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold font-outfit text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            Keluhan Populer:
          </span>
          {popularKeywords.map((kw) => {
            const isActive = searchQuery.toLowerCase() === kw.query.toLowerCase();
            return (
              <button
                key={kw.label}
                onClick={() => setSearchQuery(isActive ? '' : kw.query)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold font-outfit transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/30 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-50 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border-slate-200 dark:border-slate-800'
                }`}
              >
                {kw.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mt-0.5 sm:mt-0 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black font-outfit text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              Prinsip Keselamatan Swamedikasi (Self-Care First Aid)
            </h4>
            <p className="text-xs text-amber-900/80 dark:text-amber-300/80 mt-0.5 leading-relaxed">
              Swamedikasi hanya diperuntukkan bagi keluhan ringan dengan batas aman konsumsi <strong>maksimal 2–3 hari</strong>. 
              Bila gejala tidak membaik atau muncul tanda bahaya seperti sesak napas, nyeri dada hebat, muntah terus-menerus, kejang, atau kaku kuduk, 
              <strong>segera periksa ke Fasilitas Kesehatan / Dokter</strong>.
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 self-end sm:self-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold font-outfit px-3 py-1.5 rounded-xl bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 border border-amber-300 dark:border-amber-700">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            Dilarang Beli Antibiotik Oral Bebas
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold font-outfit text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <span>Kategori Keluhan Pasien</span>
            <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">({filteredProtocols.length} Protokol Ditemukan)</span>
          </h3>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {SWAMEDIKASI_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black font-outfit transition-all whitespace-nowrap cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/40 border-emerald-400/30'
                    : 'bg-white dark:bg-[#041a10] text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border-slate-200 dark:border-emerald-900/30'
                }`}
              >
                {getCategoryIcon(cat.icon, 'w-3.5 h-3.5')}
                <span>{cat.label}</span>
                {cat.key !== 'all' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Protocol Cards Grid */}
      {filteredProtocols.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">
            Keluhan "{searchQuery}" Tidak Ditemukan
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Coba gunakan kata kunci umum lainnya seperti "demam", "batuk", "maag", "alergi", atau klik kategori di atas.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-2 text-xs font-semibold px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProtocols.map((protocol) => {
            return (
              <div
                key={protocol.id}
                onClick={() => {
                  setActiveProtocol(protocol);
                  setActiveTabModal('drugs');
                }}
                className="group relative bg-white dark:bg-slate-900/90 hover:bg-teal-50/30 dark:hover:bg-teal-950/20 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  {/* Category Pill & Max Days Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/70 dark:border-teal-800/60">
                      {getCategoryIcon(protocol.iconName, 'w-3.5 h-3.5 text-teal-600 dark:text-teal-400')}
                      {protocol.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/50">
                      <Clock className="w-3 h-3 text-amber-500" />
                      Maks. {protocol.maxSelfMedDays} Hari
                    </span>
                  </div>

                  {/* Title & Quick Summary */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {protocol.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {protocol.quickSummary}
                    </p>
                  </div>

                  {/* Symptoms Bullet Preview */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800/60 space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Gejala Khas yang Cocok:
                    </div>
                    <ul className="space-y-1">
                      {protocol.typicalSymptoms.slice(0, 2).map((symptom, idx) => (
                        <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{symptom}</span>
                        </li>
                      ))}
                      {protocol.typicalSymptoms.length > 2 && (
                        <li className="text-[11px] text-teal-600 dark:text-teal-400 font-medium pl-5">
                          +{protocol.typicalSymptoms.length - 2} tanda gejala lainnya...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Safe Drug Options Preview */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Pilihan Obat Swamedikasi Aman:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {protocol.recommendedDrugs.map((drug, dIdx) => (
                        <span
                          key={dIdx}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs font-medium"
                        >
                          <Pill className="w-3 h-3 text-teal-500" />
                          <span>{drug.genericName.split(' ')[0]}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Red Flag Warning Alert Preview */}
                  <div className="pt-1">
                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 flex items-center gap-2 text-rose-800 dark:text-rose-300 text-xs">
                      <AlertOctagon className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span className="font-semibold line-clamp-1">
                        Tanda Bahaya: {protocol.redFlags[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Card Action */}
                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:underline">
                    Lihat Protokol & Triage Lengkap
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {protocol.recommendedDrugs.length} Opsi Obat
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAILED CLINICAL TRIAGE MODAL */}
      {activeProtocol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            
            {/* Modal Top Banner */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-teal-800 to-emerald-900 text-white flex items-start justify-between gap-4 border-b border-teal-700/50">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-teal-100 border border-white/20">
                    {getCategoryIcon(activeProtocol.iconName, 'w-3 h-3 text-teal-200')}
                    {activeProtocol.categoryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-200 border border-amber-300/30">
                    <Clock className="w-3 h-3 text-amber-300" />
                    Batas Swamedikasi: Maksimal {activeProtocol.maxSelfMedDays} Hari
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  {activeProtocol.title}
                </h2>
                <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-2xl">
                  {activeProtocol.quickSummary}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleCopyWhatsAppCounseling}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  title="Salin Teks Konseling Edukasi Pasien untuk WhatsApp"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span className="hidden sm:inline text-emerald-300">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white" />
                      <span className="hidden sm:inline">Salin WA</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProtocol(null)}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Red Flag Warning Callout Banner in Modal */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-3 bg-rose-50 dark:bg-rose-950/50 border-b border-rose-200 dark:border-rose-900/60 flex items-start gap-3">
              <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed">
                <span className="font-bold">PERINGATAN TANDA BAHAYA (RED FLAGS): </span>
                Jika Anda mendapati tanda darurat seperti demam &gt; 39°C, sesak berat, kaku kuduk, muntah darah, atau tidak membaik &gt; {activeProtocol.maxSelfMedDays} hari, 
                <strong> JANGAN lanjutkan swamedikasi</strong> dan segera periksakan ke dokter/IGD!
              </div>
            </div>

            {/* Modal Navigation Tabs - Modern Pill Segmented Control */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTabModal('drugs')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTabModal === 'drugs'
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-900/20 border border-teal-500 ring-2 ring-teal-400/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Pill className="w-3.5 h-3.5 text-teal-400" />
                  <span>Pilihan Obat ({activeProtocol.recommendedDrugs.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTabModal('lifestyle')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTabModal === 'lifestyle'
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-900/20 border border-teal-500 ring-2 ring-teal-400/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terapi Alami & Gaya Hidup</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTabModal('redflags')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTabModal === 'redflags'
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-900/30 border border-rose-500 ring-2 ring-rose-400/20'
                      : 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50'
                  }`}
                >
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
                  <span>Tanda Bahaya ({activeProtocol.redFlags.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTabModal('populations')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTabModal === 'populations'
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-900/20 border border-teal-500 ring-2 ring-teal-400/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Baby className="w-3.5 h-3.5 text-sky-400" />
                  <span>Bumil, Anak & Lansia</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTabModal('dagusibu')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTabModal === 'dagusibu'
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-900/20 border border-teal-500 ring-2 ring-teal-400/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edukasi DAGUSIBU</span>
                </button>
              </div>
            </div>

            {/* Modal Body Content - Natural Flex Scroll Container */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* TAB 1: DRUGS RECOMMENDATION */}
              {activeTabModal === 'drugs' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        Pilihan Obat Resmi yang Aman Dikonsumsi Mandiri:
                      </h4>
                      <p className="text-xs text-slate-500">
                        Disusun berdasarkan Kepmenkes RI tentang Obat Wajib Apotek (OWA) & Daftar Obat Bebas Terdaftar BPOM.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {activeProtocol.recommendedDrugs.map((drug, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 space-y-4 shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h5 className="text-base font-bold text-slate-900 dark:text-white">
                                {drug.genericName}
                              </h5>
                              {renderBpomBadge(drug.bpomClass)}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              <strong>Contoh Merk Dagang Populer di Apotek:</strong> {drug.brandExamples.join(', ')}
                            </div>
                          </div>

                          {/* Action Buttons: Cross-check interaction & Create WhatsApp PIO Card */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {onCheckInteractionWith && (
                              <button
                                onClick={() => {
                                  onCheckInteractionWith(drug.genericName.split(' ')[0]);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors"
                                title="Cek apakah obat ini berinteraksi dengan obat rutin yang sedang diminum pasien"
                              >
                                <ShieldAlert className="w-3.5 h-3.5" />
                                <span>Cek Interaksi</span>
                              </button>
                            )}

                            {onAddToPioCard && (
                              <button
                                onClick={() => {
                                  handleTransferToPio(drug.genericName, drug.brandExamples, drug.dosageGuideline, drug.timing);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-colors"
                                title="Buat Kartu Aturan Minum WhatsApp Pasien"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Kartu WA</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Dosage, Timing, and Cautions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 space-y-1">
                            <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-teal-500" />
                              <span>Aturan Dosis Dewasa / Anak</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                              {drug.dosageGuideline}
                            </p>
                          </div>

                          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 space-y-1">
                            <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5 text-amber-500" />
                              <span>Aturan Minum & Waktu</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {drug.timing}
                            </p>
                          </div>

                          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 space-y-1">
                            <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5 text-blue-500" />
                              <span>Catatan Penting Apoteker</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {drug.cautionNotes}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Anti-Microbial Resistance Reminder */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white dark:bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <AlertOctagon className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <div className="font-bold text-rose-300">
                        STOP PENYALAHGUNAAN ANTIBIOTIK PADA SWAMEDIKASI!
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        Infeksi virus seperti flu batuk biasa, radang tenggorokan akut, demam hari pertama, dan diare akut 
                        <strong> TIDAK MEMBUTUHKAN ANTIBIOTIK</strong> (seperti Amoxicillin, Cefadroxil, Ciprofloxacin). 
                        Penggunaan antibiotik tanpa resep dokter memicu resistensi kuman bakteri kebal obat yang mematikan.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: NON-PHARMACOLOGICAL LIFESTYLE THERAPY */}
              {activeTabModal === 'lifestyle' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Terapi Alami, Perawatan Rumahan & Modifikasi Gaya Hidup:
                    </h4>
                    <p className="text-xs text-slate-500">
                      Lakukan langkah pendukung non-obat ini terlebih dahulu sebelum mengonsumsi obat-obatan.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeProtocol.nonPharmacolTherapy.map((therapy, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 flex items-start gap-3"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-500 text-white flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                          {therapy}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Prohibited Self-Care Actions */}
                  {activeProtocol.contraindicatedForSelfMed && activeProtocol.contraindicatedForSelfMed.length > 0 && (
                    <div className="mt-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2">
                      <div className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>Hal-Hal yang DILARANG / PANTANGAN Selama Swamedikasi:</span>
                      </div>
                      <ul className="space-y-1.5 pl-5 list-disc text-xs text-rose-800 dark:text-rose-300">
                        {activeProtocol.contraindicatedForSelfMed.map((contra, cIdx) => (
                          <li key={cIdx} className="leading-relaxed">
                            {contra}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: RED FLAGS & WHEN TO SEE DOCTOR */}
              {activeTabModal === 'redflags' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                    <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200 flex items-center gap-2">
                      <AlertOctagon className="w-5 h-5 text-rose-600" />
                      <span>Daftar Tanda Bahaya (Red Flags) Pasien Wajib Segera ke Dokter:</span>
                    </h4>
                    <p className="text-xs text-rose-800 dark:text-rose-300">
                      Bila Anda atau pasien menemui SATU saja dari kriteria berikut, segera hentikan pengobatan mandiri dan lakukan rujukan medis:
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {activeProtocol.redFlags.map((flag, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border-l-4 border-l-rose-500 border-y border-r border-slate-200 dark:border-slate-700 flex items-start gap-3 shadow-xs"
                      >
                        <div className="p-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mt-0.5 flex-shrink-0">
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                          {flag}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* When to see doctor checklist */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                    <h5 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                      Waktu Tepat Menemui Dokter / IGD:
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {activeProtocol.whenToSeeDoctor.map((item, wIdx) => (
                        <li key={wIdx} className="flex items-start gap-2">
                          <span className="text-teal-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: SPECIAL POPULATIONS */}
              {activeTabModal === 'populations' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Panduan Khusus untuk Ibu Hamil, Balita & Lansia:
                    </h4>
                    <p className="text-xs text-slate-500">
                      Kelompok pasien rentan membutuhkan kehati-hatian ekstra terhadap pemilihan obat dan dosis.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Pregnancy */}
                    <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-200/80 dark:border-pink-900/40 space-y-1.5">
                      <div className="flex items-center gap-2 text-pink-800 dark:text-pink-300 font-bold text-xs">
                        <HeartHandshake className="w-4 h-4 text-pink-500" />
                        <span>Ibu Hamil & Menyusui (Bumil / Busui)</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                        {activeProtocol.specialPopulations.pregnancyWarning}
                      </p>
                    </div>

                    {/* Pediatric */}
                    <div className="p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-900/40 space-y-1.5">
                      <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold text-xs">
                        <Baby className="w-4 h-4 text-sky-500" />
                        <span>Anak-Anak & Balita</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                        {activeProtocol.specialPopulations.pediatricWarning}
                      </p>
                    </div>

                    {/* Geriatric */}
                    <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5">
                      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span>Lansia (Geriatri &gt; 65 Tahun)</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                        {activeProtocol.specialPopulations.geriatricWarning}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: DAGUSIBU KEMENKES */}
              {activeTabModal === 'dagusibu' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-emerald-900 text-white space-y-1">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span>Edukasi DAGUSIBU Kemenkes RI:</span>
                    </h4>
                    <p className="text-xs text-teal-100">
                      Dapatkan, Gunakan, Simpan, dan Buang Obat dengan Tepat dan Benar.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                      <div className="text-xs font-bold text-teal-700 dark:text-teal-400">
                        1. DAPATKAN (DA)
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Beli obat selalu di sarana resmi: Apotek berizin, Klinik, atau Toko Obat Berizin. Periksa kemasan segel dan nomor registrasi BPOM.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                      <div className="text-xs font-bold text-teal-700 dark:text-teal-400">
                        2. GUNAKAN (GU)
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Gunakan obat sesuai aturan pakai (sebelum/sesudah makan), takar sirup dengan sendok takar resmi, jangan berbagi obat resep dengan orang lain.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                      <div className="text-xs font-bold text-teal-700 dark:text-teal-400">
                        3. SIMPAN (SI)
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Simpan di kotak obat pada suhu sejuk terhindar sinar matahari langsung. Jauhkan dari jangkauan anak-anak. Jangan simpan salep/tetes mata yang lewat BUD.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                      <div className="text-xs font-bold text-teal-700 dark:text-teal-400">
                        4. BUANG (BU)
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Hancurkan tablet/kapsul campur dengan tanah/kopi sebelum dibuang ke sampah. Rusak label botol sirup dan gunting blister agar tidak disalahgunakan.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-teal-500" />
                <span>Edukasi resmi farmasis klinis Farmasi Druggist</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyWhatsAppCounseling}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-colors"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Teks Edukasi Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Salin Konseling Pasien WA</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveProtocol(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
