import React, { useState, useMemo } from 'react';
import { MEDICATION_GUIDES, deduplicateMedicationGuides } from '../data/medicationGuides';
import { MedicationGuide } from '../types';
import { FloatingPillsBackground } from './FloatingPillsBackground';
import { 
  Eye, 
  Ear, 
  Sparkles, 
  Syringe, 
  Wind, 
  CircleDot, 
  Disc, 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  BookOpen, 
  Thermometer, 
  ChevronRight, 
  X, 
  Printer, 
  Clock, 
  HelpCircle, 
  Droplets, 
  ArrowUpRight, 
  ShieldCheck, 
  Smile, 
  PackageCheck, 
  Activity, 
  MessageSquare, 
  Copy, 
  CheckCheck, 
  Tag,
  Edit3,
  Layers
} from 'lucide-react';
import { ClinicBrandingSettings } from '../types';

interface MedicationUsageGuideProps {
  clinicBranding?: ClinicBrandingSettings;
  onSelectTab?: (tab: string) => void;
}

export const MedicationUsageGuide: React.FC<MedicationUsageGuideProps> = ({ 
  clinicBranding
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeGuideModal, setActiveGuideModal] = useState<MedicationGuide | null>(null);
  const [copiedGuideId, setCopiedGuideId] = useState<string | null>(null);

  // Icon mapping helper for main cards
  const renderIcon = (iconName: string, sizeClass = 'w-6 h-6') => {
    switch (iconName) {
      case 'Eye': return <Eye className={sizeClass} />;
      case 'Ear': return <Ear className={sizeClass} />;
      case 'Sparkles': return <Sparkles className={sizeClass} />;
      case 'Syringe': return <Syringe className={sizeClass} />;
      case 'Wind': return <Wind className={sizeClass} />;
      case 'CircleDot': return <CircleDot className={sizeClass} />;
      case 'Disc': return <Disc className={sizeClass} />;
      case 'Activity': return <Activity className={sizeClass} />;
      case 'ShieldAlert': default: return <ShieldAlert className={sizeClass} />;
    }
  };

  // Helper for dynamic step visual config (Icons, Colors & Badges)
  const getStepVisualConfig = (stepNumber: number, title: string, description: string) => {
    const text = (title + ' ' + description).toLowerCase();

    if (text.includes('cuci') || text.includes('tangan') || text.includes('bersih')) {
      return {
        icon: <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300',
        badge: 'Persiapan Higienis'
      };
    }
    if (text.includes('kepala') || text.includes('tengadahkan') || text.includes('duduk') || text.includes('miring') || text.includes('berbaring') || text.includes('menunduk')) {
      return {
        icon: <ArrowUpRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        bg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300',
        badge: 'Posisi Tubuh'
      };
    }
    if (text.includes('kelopak') || text.includes('mata') || text.includes('kantung')) {
      return {
        icon: <Eye className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
        bg: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300',
        badge: 'Area Mata'
      };
    }
    if (text.includes('telinga') || text.includes('daun telinga')) {
      return {
        icon: <Ear className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
        badge: 'Area Telinga'
      };
    }
    if (text.includes('tetes') || text.includes('cairan') || text.includes('penetesan')) {
      return {
        icon: <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
        bg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
        badge: 'Dosis & Penetesan'
      };
    }
    if (text.includes('inhaler') || text.includes('turbuhaler') || text.includes('diskus') || text.includes('napas') || text.includes('hisap') || text.includes('semprot') || text.includes('nebul')) {
      return {
        icon: <Wind className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
        bg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300',
        badge: 'Inhalasi & Respirasi'
      };
    }
    if (text.includes('jarum') || text.includes('injeksi') || text.includes('pen insulin') || text.includes('dosis unit') || text.includes('cubit') || text.includes('suntik')) {
      return {
        icon: <Syringe className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        bg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300',
        badge: 'Teknik Injeksi'
      };
    }
    if (text.includes('tutup') || text.includes('tekan') || text.includes('sudut') || text.includes('tahan') || text.includes('kunci')) {
      return {
        icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300',
        badge: 'Retensi Obat'
      };
    }
    if (text.includes('kumur') || text.includes('bersihkan') || text.includes('lap')) {
      return {
        icon: <Smile className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
        bg: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
        badge: 'Pembersihan Akhir'
      };
    }
    if (text.includes('simpan') || text.includes('kulkas') || text.includes('wadah')) {
      return {
        icon: <PackageCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
        badge: 'Penyimpanan'
      };
    }

    return {
      icon: <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      bg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300',
      badge: `Langkah ${stepNumber}`
    };
  };

  const categories = ['Semua', 'Inhalasi & Respirasi', 'Mata & Telinga', 'Injeksi', 'Suppositoria & Vaginal', 'Topikal & Oral Khusus'];

  // Deduplicated clean guides array
  const cleanGuides = useMemo(() => deduplicateMedicationGuides(MEDICATION_GUIDES), []);

  // Filtered guides based on search and category
  const filteredGuides = useMemo(() => {
    return cleanGuides.filter((guide) => {
      const matchesCategory = selectedCategory === 'Semua' || guide.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        guide.title.toLowerCase().includes(q) || 
        guide.shortDesc.toLowerCase().includes(q) ||
        (guide.popularBrands && guide.popularBrands.some(b => b.toLowerCase().includes(q))) ||
        guide.steps.some(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) ||
        guide.commonMistakes.some(m => m.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [cleanGuides, searchQuery, selectedCategory]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyWhatsAppGuide = (guide: MedicationGuide, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const clinicHeader = clinicBranding?.clinicName 
      ? `*${clinicBranding.clinicName.toUpperCase()}*\n`
      : `*PANDUAN EDUKASI PENGGUNAAN OBAT*\n`;

    const stepsText = guide.steps.map((s) => `${s.stepNumber}. *${s.title}*: ${s.description}${s.importantNote ? ` _(⚠️ ${s.importantNote})_` : ''}`).join('\n');
    const warningsText = guide.importantWarnings.map((w) => `• ${w}`).join('\n');

    const formattedText = `${clinicHeader}*PANDUAN CARA PAKAI: ${guide.title.toUpperCase()}*\n----------------------------------------\n*Deskripsi:* ${guide.shortDesc}\n\n*LANGKAH PENGGUNAAN:*\n${stepsText}\n\n*PERINGATAN PENTING:*\n${warningsText}\n\n*PENYIMPANAN:* ${guide.storageAdvice}\n\n_Semoga lekas sembuh! Untuk konsultasi obat lebih lanjut, hubungi Apoteker kami._`;

    navigator.clipboard.writeText(formattedText);
    setCopiedGuideId(guide.id);
    setTimeout(() => setCopiedGuideId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 print:max-w-none print:w-full print:m-0 print:p-0">
      
      {/* SCREEN UI WRAPPER */}
      <div className="space-y-6 print:hidden">
        
        {/* HERO BANNER - AQUA CYAN & DEEP NAVY */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#030e12] via-[#072029] to-[#0c313d] p-6 sm:p-8 text-white shadow-2xl border border-cyan-500/25">
          <FloatingPillsBackground density="low" accentColor="#22d3ee" />
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
            <BookOpen className="w-48 h-48 text-cyan-400" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold font-outfit border border-cyan-500/30">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Panduan Pelayanan Informasi Obat (PIO) &amp; Edukasi Pasien</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-cyan-950/50 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-outfit">
                    Panduan Tata Cara Penggunaan Obat Khusus
                  </h1>
                  <p className="text-xs sm:text-sm text-cyan-100/80 font-medium">
                    Database sediaan khusus (Inhaler MDI/Spacer, Turbuhaler, Diskus, Pen Insulin, Suppositoria, Koyo) dengan instruksi langkah demi langkah.
                  </p>
                </div>
              </div>

              {/* Quick Stat Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-cyan-200">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Teknik Inhaler, Insulin &amp; Topikal</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-teal-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Standar WHO &amp; Kemenkes PIO</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-cyan-200">
                  <Printer className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Lembar Edukasi Cetak Pasien</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 relative z-10">
              <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-cyan-950/60 text-right shadow-md">
                <span className="text-[11px] text-slate-400 block font-medium">Total Sediaan Terdaftar:</span>
                <span className="text-lg font-black text-cyan-400">{cleanGuides.length} Panduan Khusus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari sediaan atau merk obat (misal: Symbicort, Ventolin, Ozempic, Lovenox, Spiriva, Microlax)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Result Count Badge */}
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl self-start sm:self-auto flex items-center gap-1.5 shrink-0">
              <Info className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Menampilkan {filteredGuides.length} dari {cleanGuides.length} Panduan</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer font-outfit ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Guide Cards Grid */}
        {filteredGuides.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">Panduan Obat Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Tidak ada panduan penggunaan yang cocok dengan kata kunci "{searchQuery}". Coba gunakan nama obat umum seperti Symbicort, Insulin, Inhaler, atau Suppositoria.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
              className="px-4 py-2 text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 rounded-xl hover:bg-teal-100 border border-teal-200 dark:border-teal-800 transition-colors cursor-pointer"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => setActiveGuideModal(guide)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-3">
                  {/* Card Top: Icon & Category */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-800 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      {renderIcon(guide.iconName, 'w-6 h-6')}
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border shadow-2xs font-outfit ${
                      guide.category === 'Injeksi'
                        ? 'bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800'
                        : guide.category === 'Inhalasi & Respirasi'
                        ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                        : guide.category === 'Suppositoria & Vaginal'
                        ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                        : guide.category === 'Topikal & Oral Khusus'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                        : 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800'
                    }`}>
                      {guide.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-base font-black text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors font-outfit">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                      {guide.shortDesc}
                    </p>
                  </div>

                  {/* Popular Brand Tags */}
                  {guide.popularBrands && guide.popularBrands.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      <span className="text-[10px] text-slate-400 font-bold flex items-center gap-0.5">
                        <Tag className="w-2.5 h-2.5" />
                      </span>
                      {guide.popularBrands.slice(0, 3).map((brand, bIdx) => (
                        <span
                          key={bIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700"
                        >
                          {brand}
                        </span>
                      ))}
                      {guide.popularBrands.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-bold">
                          +{guide.popularBrands.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  )}

                  {/* Quick Info Badges */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-500" />
                      {guide.steps.length} Langkah Utama
                    </span>
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                      Simpan Terstandar
                    </span>
                  </div>
                </div>

                {/* Action Link Footer with WhatsApp Share */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                  <span className="text-teal-600 dark:text-teal-400 group-hover:underline flex items-center gap-1">
                    <span>Buka Panduan</span>
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleCopyWhatsAppGuide(guide, e)}
                    className="p-1.5 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
                    title="Salin Teks Format WhatsApp untuk Pasien"
                  >
                    {copiedGuideId === guide.id ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Kirim WA</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          INTERACTIVE DETAIL MODAL
          ========================================================================= */}
      {activeGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in print:hidden">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 border border-slate-200 dark:border-slate-800">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {renderIcon(activeGuideModal.iconName, 'w-7 h-7')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider font-outfit">
                      {activeGuideModal.category}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1 font-outfit">
                    {activeGuideModal.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyWhatsAppGuide(activeGuideModal)}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold shadow-xs cursor-pointer"
                  title="Salin Pesan Format WhatsApp Pasien"
                >
                  {copiedGuideId === activeGuideModal.id ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedGuideId === activeGuideModal.id ? 'Tersalin!' : 'Salin WA'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold shadow-xs cursor-pointer"
                  title="Cetak Panduan Pasien (1 Lembar A4)"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak (1 Lembar)</span>
                </button>

                <button
                  onClick={() => setActiveGuideModal(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 custom-scrollbar text-slate-900 dark:text-slate-100">
              
              {/* Short Desc, Storage & Popular Brands */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-2xl p-4 text-xs text-teal-950 dark:text-teal-200 space-y-2">
                  <span className="font-extrabold flex items-center gap-1 text-teal-900 dark:text-teal-300 text-sm font-outfit">
                    <Info className="w-4 h-4 text-teal-600" />
                    Deskripsi Ringkas &amp; Indikasi
                  </span>
                  <p className="leading-relaxed font-medium">{activeGuideModal.shortDesc}</p>

                  {activeGuideModal.popularBrands && activeGuideModal.popularBrands.length > 0 && (
                    <div className="pt-2 border-t border-teal-200/60 dark:border-teal-800/60 flex flex-wrap items-center gap-1">
                      <span className="font-bold text-teal-800 dark:text-teal-300 text-[11px]">Contoh Merk Terkenal:</span>
                      {activeGuideModal.popularBrands.map((b, i) => (
                        <span key={i} className="bg-white dark:bg-slate-900 text-teal-900 dark:text-teal-300 font-bold px-2 py-0.5 rounded-md border border-teal-300 dark:border-teal-700 text-[10px]">
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                  <span className="font-extrabold flex items-center gap-1 text-amber-900 dark:text-amber-300 text-sm font-outfit">
                    <Thermometer className="w-4 h-4 text-amber-600" />
                    Saran Penyimpanan &amp; BUD
                  </span>
                  <p className="leading-relaxed font-medium">{activeGuideModal.storageAdvice}</p>
                </div>
              </div>

              {/* Persiapan Awal */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 font-outfit">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Langkah Persiapan Sebelum Penggunaan
                </h3>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
                  {activeGuideModal.preparationSteps.map((prep, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="leading-relaxed font-medium">{prep}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Visual Flow */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 font-outfit">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    Tata Cara Langkah demi Langkah (Visual Flow)
                  </h3>
                  <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                    {activeGuideModal.steps.length} Langkah Utama
                  </span>
                </div>

                <div className="space-y-4 relative">
                  {/* Stepper Timeline Line */}
                  <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-teal-500 via-teal-300 to-slate-200 dark:to-slate-800 hidden sm:block z-0" />

                  {activeGuideModal.steps.map((step) => {
                    const visual = getStepVisualConfig(step.stepNumber, step.title, step.description);
                    return (
                      <div 
                        key={step.stepNumber}
                        className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-teal-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start gap-4 relative z-10 group"
                      >
                        {/* Step Icon Badge Box */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-105 ${visual.bg}`}>
                              {visual.icon}
                            </div>
                            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-900 text-white font-extrabold text-[11px] flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800">
                              {step.stepNumber}
                            </span>
                          </div>
                        </div>

                        {/* Step Description & Content */}
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-base font-black text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors font-outfit">
                              {step.title}
                            </h4>
                            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${visual.bg}`}>
                              Langkah {step.stepNumber} • {visual.badge}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {step.description}
                          </p>
                          
                          {step.importantNote && (
                            <div className="mt-3 p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 text-xs flex items-start gap-2.5 shadow-2xs">
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="leading-relaxed font-medium">
                                <strong className="text-amber-900 dark:text-amber-300">Catatan Penting:</strong> {step.importantNote}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Do's & Don'ts Comparison Table */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 font-outfit">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Hal yang Boleh &amp; Tidak Boleh Dilakukan (Do's &amp; Don'ts)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* DO'S */}
                  <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm font-outfit">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>HAL YANG DISARANKAN (DO'S)</span>
                    </div>
                    <ul className="space-y-2">
                      {activeGuideModal.dosAndDonts.dos.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DONT'S */}
                  <div className="bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm font-outfit">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>HAL YANG DILARANG (DON'TS)</span>
                    </div>
                    <ul className="space-y-2">
                      {activeGuideModal.dosAndDonts.donts.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-rose-950 dark:text-rose-200 leading-relaxed font-medium">
                          <span className="text-rose-600 font-bold">✕</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Kesalahan Umum yang Sering Terjadi */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-md border border-slate-800">
                <h4 className="text-sm font-bold text-teal-300 flex items-center gap-2 font-outfit">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Kesalahan Umum Pasien yang Sering Terjadi
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeGuideModal.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Panduan Edukasi Pasien • Selalu ikuti petunjuk Apoteker atau Dokter Anda.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-teal-400" />
                  <span>Cetak (1 Lembar)</span>
                </button>
                <button
                  onClick={() => setActiveGuideModal(null)}
                  className="px-4 py-2 text-xs font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          PRINT-ONLY 1-PAGE A4 PATIENT GUIDE SHEET
          ========================================================================= */}
      {activeGuideModal && (
        <div className="hidden print:block print:fixed print:inset-0 print:z-[999999] print:bg-white print:p-0 print:m-0 font-sans text-slate-900 space-y-2">
          <style>{`
            @media print {
              html, body {
                background: white !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                overflow: hidden !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              @page {
                size: A4 portrait;
                margin: 4mm 6mm;
              }
              * {
                break-inside: avoid !important;
                page-break-inside: avoid !important;
              }
            }
          `}</style>

          {/* Kop Lembar Edukasi Pasien */}
          <div className="border-b-2 pb-1.5 flex items-center justify-between" style={{ borderColor: clinicBranding?.primaryColor || '#0d9488' }}>
            <div className="flex items-center gap-2">
              {clinicBranding?.logoUrl && (
                <img src={clinicBranding.logoUrl} alt="Logo" className="w-10 h-10 object-contain shrink-0" />
              )}
              <div>
                <h1 className="text-sm font-black uppercase tracking-wider" style={{ color: clinicBranding?.primaryColor || '#0d9488' }}>
                  {clinicBranding?.clinicName || 'LEMBAR PANDUAN EDUKASI PASIEN - TATA CARA PENGGUNAAN OBAT'}
                </h1>
                <p className="text-[9.5px] text-slate-600 font-bold">
                  {clinicBranding?.address || 'Pelayanan Informasi Obat (PIO) & Konseling Pasien'}
                </p>
              </div>
            </div>
            <div className="text-right text-[8.5px] text-slate-500 font-semibold">
              <p className="font-bold text-slate-900">Kategori: {activeGuideModal.category}</p>
              <p>Tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Title Banner */}
          <div className="bg-slate-900 text-white p-2 rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-white">{activeGuideModal.title}</h2>
              <p className="text-[9px] text-slate-300">{activeGuideModal.shortDesc}</p>
            </div>
            <span className="text-[8.5px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded shrink-0">
              Sediaan Khusus
            </span>
          </div>

          {/* Storage Advice & Preparation Grid */}
          <div className="grid grid-cols-12 gap-2 text-[9px]">
            <div className="col-span-5 bg-amber-50/90 p-2 rounded-lg border border-amber-200">
              <strong className="text-amber-900 block font-bold mb-0.5">📌 Saran Penyimpanan:</strong>
              <p className="text-slate-800 leading-tight">{activeGuideModal.storageAdvice}</p>
            </div>
            <div className="col-span-7 bg-slate-50 p-2 rounded-lg border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-0.5">✓ Persiapan Sebelum Penggunaan:</strong>
              <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                {activeGuideModal.preparationSteps.map((prep, i) => (
                  <li key={i} className="truncate">{prep}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step-by-Step Grid (2 Columns) */}
          <div className="space-y-1">
            <h3 className="text-[9.5px] font-extrabold text-teal-900 uppercase tracking-wide border-b border-teal-100 pb-0.5">
              Tata Cara Langkah demi Langkah Penggunaan:
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {activeGuideModal.steps.map((step) => {
                const visual = getStepVisualConfig(step.stepNumber, step.title, step.description);
                return (
                  <div key={step.stepNumber} className="border border-slate-200 p-2 rounded-lg bg-white space-y-1">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
                      <span className="font-bold text-slate-900 text-[9.5px] flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-teal-700 text-white text-[8.5px] flex items-center justify-center font-extrabold">
                          {step.stepNumber}
                        </span>
                        {step.title}
                      </span>
                      <span className="text-[8px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                        {visual.badge}
                      </span>
                    </div>
                    <p className="text-[8.5px] text-slate-700 leading-tight font-medium">
                      {step.description}
                    </p>
                    {step.importantNote && (
                      <p className="text-[8px] text-amber-900 bg-amber-50/90 p-1 rounded border border-amber-200 leading-tight">
                        ⚠️ <strong>Catatan:</strong> {step.importantNote}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Do's & Don'ts Comparison Table */}
          <div className="grid grid-cols-2 gap-2 text-[8.5px]">
            <div className="bg-emerald-50/70 p-2 rounded-lg border border-emerald-200">
              <strong className="text-emerald-900 block font-bold mb-0.5">✓ HAL DISARANKAN (DO'S):</strong>
              <ul className="space-y-0.5 text-emerald-950">
                {activeGuideModal.dosAndDonts.dos.map((item, i) => (
                  <li key={i} className="flex items-start gap-1 leading-tight">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-rose-50/70 p-2 rounded-lg border border-rose-200">
              <strong className="text-rose-900 block font-bold mb-0.5">✕ HAL DILARANG (DON'TS):</strong>
              <ul className="space-y-0.5 text-rose-950">
                {activeGuideModal.dosAndDonts.donts.map((item, i) => (
                  <li key={i} className="flex items-start gap-1 leading-tight">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Mistakes Warning */}
          <div className="bg-slate-100 p-1.5 rounded-lg border border-slate-300 text-[8.5px] text-slate-800">
            <strong className="text-rose-700 block font-bold mb-0.5">⚠️ Hindari Kesalahan Umum Pasien:</strong>
            <p className="leading-tight text-slate-700">
              {activeGuideModal.commonMistakes.join(' • ')}
            </p>
          </div>

          {/* Signature Footer Line & Digital Stamp */}
          <div className="pt-1.5 border-t border-slate-300 flex items-end justify-between text-[8.5px] text-slate-600">
            <div>
              <p className="font-bold text-slate-800">Dokumen Edukasi Resmi Apoteker Penanggung Jawab</p>
              <p className="text-[7.5px] text-slate-500">Dicetak melalui FARMASIDRUGGIST Decision Support System</p>
            </div>
            <div className="text-center w-36 shrink-0 relative space-y-0.5">
              {clinicBranding?.enableDigitalStamp !== false && clinicBranding?.stampUrl && (
                <img 
                  src={clinicBranding.stampUrl} 
                  alt="Stempel Digital" 
                  className="w-12 h-12 object-contain absolute -top-4 right-2 opacity-80 pointer-events-none" 
                />
              )}
              <p className="font-medium text-[7.5px]">Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="font-bold text-slate-900 text-[8.5px]">Apoteker Penanggung Jawab</p>
              <div className="h-6 flex items-center justify-center italic text-slate-400 text-[7.5px]">
                ( Tanda Tangan &amp; Stempel Resmi )
              </div>
              <p className="font-bold underline text-slate-900 border-t border-slate-800 pt-0.5 text-[8.5px]">
                {clinicBranding?.pharmacistName || '( apt. Penanggung Jawab, S.Farm. )'}
              </p>
              <p className="text-[7.5px] text-slate-600 font-semibold">{clinicBranding?.pharmacistSipa || 'SIPA: 19940825/SIPA-31.71/2026/2088'}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
