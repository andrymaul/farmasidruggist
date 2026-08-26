import React, { useState, useMemo } from 'react';
import { MEDICATION_GUIDES, deduplicateMedicationGuides } from '../data/medicationGuides';
import { MedicationGuide } from '../types';
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
  Check,
  Droplets,
  ArrowUpRight,
  ShieldCheck,
  Smile,
  PackageCheck,
  Activity
} from 'lucide-react';

import { ClinicBrandingSettings } from '../types';
import { Edit3 } from 'lucide-react';

interface MedicationUsageGuideProps {
  clinicBranding?: ClinicBrandingSettings;
  onOpenBrandingModal?: () => void;
  onSelectTab?: (tab: string) => void;
}

export const MedicationUsageGuide: React.FC<MedicationUsageGuideProps> = ({ 
  clinicBranding,
  onOpenBrandingModal,
  onSelectTab 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeGuideModal, setActiveGuideModal] = useState<MedicationGuide | null>(null);

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
      case 'ShieldAlert': default: return <ShieldAlert className={sizeClass} />;
    }
  };

  // Helper for dynamic step visual config (Icons, Colors & Badges)
  const getStepVisualConfig = (stepNumber: number, title: string, description: string) => {
    const text = (title + ' ' + description).toLowerCase();

    if (text.includes('cuci') || text.includes('tangan') || text.includes('bersih')) {
      return {
        icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        badge: 'Persiapan Higienis'
      };
    }
    if (text.includes('kepala') || text.includes('tengadahkan') || text.includes('duduk') || text.includes('miring') || text.includes('berbaring')) {
      return {
        icon: <ArrowUpRight className="w-5 h-5 text-indigo-600" />,
        bg: 'bg-indigo-50 border-indigo-200 text-indigo-700',
        badge: 'Posisi Tubuh'
      };
    }
    if (text.includes('kelopak') || text.includes('mata') || text.includes('kantung')) {
      return {
        icon: <Eye className="w-5 h-5 text-sky-600" />,
        bg: 'bg-sky-50 border-sky-200 text-sky-700',
        badge: 'Area Pengaplikasian'
      };
    }
    if (text.includes('telinga') || text.includes('daun telinga')) {
      return {
        icon: <Ear className="w-5 h-5 text-amber-600" />,
        bg: 'bg-amber-50 border-amber-200 text-amber-700',
        badge: 'Area Telinga'
      };
    }
    if (text.includes('tetes') || text.includes('cairan') || text.includes('penetesan')) {
      return {
        icon: <Droplets className="w-5 h-5 text-blue-600" />,
        bg: 'bg-blue-50 border-blue-200 text-blue-700',
        badge: 'Dosis & Penetesan'
      };
    }
    if (text.includes('inhaler') || text.includes('turbuhaler') || text.includes('diskus') || text.includes('napas') || text.includes('hisap') || text.includes('semprot')) {
      return {
        icon: <Wind className="w-5 h-5 text-teal-600" />,
        bg: 'bg-teal-50 border-teal-200 text-teal-700',
        badge: 'Inhalasi & Respirasi'
      };
    }
    if (text.includes('jarum') || text.includes('injeksi') || text.includes('pen insulin') || text.includes('dosis unit') || text.includes('cubit')) {
      return {
        icon: <Syringe className="w-5 h-5 text-rose-600" />,
        bg: 'bg-rose-50 border-rose-200 text-rose-700',
        badge: 'Teknik Injeksi'
      };
    }
    if (text.includes('tutup') || text.includes('tekan') || text.includes('sudut') || text.includes('tahan')) {
      return {
        icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        badge: 'Penguncian Obat'
      };
    }
    if (text.includes('kumur') || text.includes('bersihkan') || text.includes('lap')) {
      return {
        icon: <Smile className="w-5 h-5 text-purple-600" />,
        bg: 'bg-purple-50 border-purple-200 text-purple-700',
        badge: 'Pembersihan Akhir'
      };
    }
    if (text.includes('simpan') || text.includes('kulkas') || text.includes('wadah')) {
      return {
        icon: <PackageCheck className="w-5 h-5 text-amber-600" />,
        bg: 'bg-amber-50 border-amber-200 text-amber-700',
        badge: 'Penyimpanan'
      };
    }

    return {
      icon: <Activity className="w-5 h-5 text-teal-600" />,
      bg: 'bg-teal-50 border-teal-200 text-teal-700',
      badge: `Langkah ${stepNumber}`
    };
  };

  const categories = ['Semua', 'Mata & Telinga', 'Inhalasi & Respirasi', 'Injeksi', 'Suppositoria & Vaginal'];

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
        guide.commonMistakes.some(m => m.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [cleanGuides, searchQuery, selectedCategory]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200 print:max-w-none print:w-full print:m-0 print:p-0">
      
      {/* SCREEN UI WRAPPER */}
      <div className="space-y-6 print:hidden">
        {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#143d47] relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold border border-teal-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            Panduan Edukasi Pasien & Apoteker
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Panduan Tata Cara Penggunaan Obat
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Edukasi langkah demi langkah cara penggunaan bentuk sediaan khusus (Tetes mata, Tetes telinga, Salep mata, Pen Insulin, Inhaler, Turbuhaler, Diskus, Suppositoria, dan Ovula) untuk efektifitas terapi maksimal.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari sediaan (misal: tetes mata, insulin, inhaler, suppositoria)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Result Count Badge */}
          <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl self-start sm:self-auto flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-teal-600" />
            <span>Menampilkan {filteredGuides.length} dari {MEDICATION_GUIDES.length} Panduan</span>
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
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
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">Panduan Obat Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Tidak ada panduan penggunaan yang cocok dengan kata kunci "{searchQuery}". Coba kata kunci lain seperti tetes mata, insulin, atau inhaler.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
            className="px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
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
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-500/50 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                {/* Card Top: Icon & Category */}
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                    {renderIcon(guide.iconName, 'w-6 h-6')}
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border shadow-2xs ${
                    guide.category === 'Injeksi'
                      ? 'bg-pink-50 text-pink-700 border-pink-300'
                      : guide.category === 'Inhalasi & Respirasi'
                      ? 'bg-purple-50 text-purple-700 border-purple-300'
                      : guide.category === 'Suppositoria & Vaginal'
                      ? 'bg-rose-50 text-rose-700 border-rose-300'
                      : 'bg-sky-50 text-sky-700 border-sky-300'
                  }`}>
                    {guide.category}
                  </span>
                </div>

                {/* Title & Short Description */}
                <div>
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-teal-700 transition-colors flex items-center gap-1.5">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {guide.shortDesc}
                  </p>
                </div>

                {/* Quick Info Badges */}
                <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
                    {guide.steps.length} Langkah Utama
                  </span>
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                    Simpan Terawat
                  </span>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600 group-hover:text-teal-700">
                <span>Buka Panduan Lengkap</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

      {/* INTERACTIVE MODAL (SCREEN ONLY) */}
      {activeGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in print:hidden">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {renderIcon(activeGuideModal.iconName, 'w-7 h-7')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {activeGuideModal.category}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                    {activeGuideModal.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold shadow-xs"
                  title="Cetak Panduan Pasien (1 Lembar A4)"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak (1 Lembar)</span>
                </button>

                <button
                  onClick={() => setActiveGuideModal(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 custom-scrollbar">
              
              {/* Short Desc & Storage Alert */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-teal-50/70 border border-teal-100 rounded-2xl p-4 text-xs text-teal-900 space-y-1">
                  <span className="font-bold flex items-center gap-1 text-teal-800 text-sm">
                    <Info className="w-4 h-4 text-teal-600" />
                    Deskripsi Ringkas
                  </span>
                  <p className="leading-relaxed">{activeGuideModal.shortDesc}</p>
                </div>

                <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                  <span className="font-bold flex items-center gap-1 text-amber-800 text-sm">
                    <Thermometer className="w-4 h-4 text-amber-600" />
                    Saran Penyimpanan
                  </span>
                  <p className="leading-relaxed">{activeGuideModal.storageAdvice}</p>
                </div>
              </div>

              {/* Persiapan Awal */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Langkah Persiapan Sebelum Penggunaan
                </h3>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                  {activeGuideModal.preparationSteps.map((prep, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="leading-relaxed">{prep}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    Tata Cara Langkah demi Langkah (Visual Flow)
                  </h3>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                    {activeGuideModal.steps.length} Langkah Utama
                  </span>
                </div>

                <div className="space-y-4 relative">
                  {/* Visual Stepper Timeline Line */}
                  <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-teal-500 via-teal-300 to-slate-200 hidden sm:block z-0" />

                  {activeGuideModal.steps.map((step) => {
                    const visual = getStepVisualConfig(step.stepNumber, step.title, step.description);
                    return (
                      <div 
                        key={step.stepNumber}
                        className="bg-white border border-slate-200 hover:border-teal-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start gap-4 relative z-10 group"
                      >
                        {/* Step Icon Badge Box */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-105 ${visual.bg}`}>
                              {visual.icon}
                            </div>
                            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-900 text-white font-extrabold text-[11px] flex items-center justify-center shadow-md border-2 border-white">
                              {step.stepNumber}
                            </span>
                          </div>
                        </div>

                        {/* Step Description & Content */}
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                              {step.title}
                            </h4>
                            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${visual.bg}`}>
                              Langkah {step.stepNumber} • {visual.badge}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            {step.description}
                          </p>
                          
                          {step.importantNote && (
                            <div className="mt-3 p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 shadow-2xs">
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="text-amber-800">Catatan Penting:</strong> {step.importantNote}
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
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Hal yang Boleh & Tidak Boleh Dilakukan (Do's & Don'ts)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* DO'S */}
                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>HAL YANG DISARANKAN (DO'S)</span>
                    </div>
                    <ul className="space-y-2">
                      {activeGuideModal.dosAndDonts.dos.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-emerald-900 leading-relaxed">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DONT'S */}
                  <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>HAL YANG DILARANG (DON'TS)</span>
                    </div>
                    <ul className="space-y-2">
                      {activeGuideModal.dosAndDonts.donts.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-rose-900 leading-relaxed">
                          <span className="text-rose-600 font-bold">✕</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Kesalahan Umum yang Sering Terjadi */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-md">
                <h4 className="text-sm font-bold text-teal-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Kesalahan Umum Pasien yang Sering Terjadi
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeGuideModal.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Panduan Edukasi Pasien • Selalu ikuti petunjuk apoteker atau dokter Anda.
              </span>
              <div className="flex items-center gap-2">
                {onOpenBrandingModal && (
                  <button
                    onClick={onOpenBrandingModal}
                    className="px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-xl border border-amber-300 transition-colors flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Kop & Stempel</span>
                  </button>
                )}
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-teal-400" />
                  <span>Cetak Panduan (1 Halaman)</span>
                </button>
                <button
                  onClick={() => setActiveGuideModal(null)}
                  className="px-4 py-2 text-xs font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-xs transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* PRINT-ONLY 1-PAGE A4 PATIENT GUIDE SHEET */}
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

          {/* Step-by-Step Grid (2 Columns x 2 Rows) */}
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
              {clinicBranding?.stampUrl && (
                <img 
                  src={clinicBranding.stampUrl} 
                  alt="Stempel Digital" 
                  className="w-12 h-12 object-contain absolute -top-4 right-2 opacity-80 pointer-events-none" 
                />
              )}
              <p className="font-medium text-[7.5px]">Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="font-bold text-slate-900 text-[8.5px]">Apoteker Penanggung Jawab</p>
              <div className="h-6 flex items-center justify-center italic text-slate-400 text-[7.5px]">
                ( Tanda Tangan & Stempel Resmi )
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
