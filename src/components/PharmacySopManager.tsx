import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  Building2, 
  Sliders, 
  Lock, 
  ThermometerSnowflake, 
  Pill, 
  Clock, 
  Download, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  ClipboardList,
  Layers
} from 'lucide-react';
import { FloatingPillsBackground } from './FloatingPillsBackground';
import { PHARMACY_SOP_LIST, PharmacySopItem } from '../data/pharmacySopData';
import { ClinicBrandingSettings } from '../types';

interface PharmacySopManagerProps {
  clinicBranding: ClinicBrandingSettings;
}

export const PharmacySopManager: React.FC<PharmacySopManagerProps> = ({
  clinicBranding
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSop, setSelectedSop] = useState<PharmacySopItem>(PHARMACY_SOP_LIST[0]);

  const categories = [
    { id: 'all', label: 'Semua SOP', count: PHARMACY_SOP_LIST.length },
    { id: 'klinis', label: 'Pelayanan Klinis', count: PHARMACY_SOP_LIST.filter(s => s.category === 'klinis').length },
    { id: 'logistik', label: 'Logistik & Cold Chain', count: PHARMACY_SOP_LIST.filter(s => s.category === 'logistik').length },
    { id: 'khusus', label: 'Regulasi Khusus & High Alert', count: PHARMACY_SOP_LIST.filter(s => s.category === 'khusus').length },
    { id: 'safety', label: 'Keselamatan & Mutu', count: PHARMACY_SOP_LIST.filter(s => s.category === 'safety').length }
  ];

  const filteredSops = PHARMACY_SOP_LIST.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.docNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'klinis': return 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800';
      case 'logistik': return 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/40 dark:text-sky-300 dark:border-sky-800';
      case 'khusus': return 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800';
      case 'safety': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HERO BANNER - TITANIUM SLATE & DARK STEEL */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#080a0e] via-[#12161f] to-[#1c2230] p-6 sm:p-8 text-white shadow-2xl border border-slate-500/25 print:hidden">
        <FloatingPillsBackground density="low" accentColor="#cbd5e1" />
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-slate-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <ClipboardList className="w-48 h-48 text-slate-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/20 text-slate-300 border border-slate-500/30 text-xs font-bold font-outfit">
              <ClipboardList className="w-3.5 h-3.5 text-slate-400" />
              <span>Dokumen Mutu &amp; Akreditasi Kefarmasian Resmi Permenkes</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-zinc-600 text-white flex items-center justify-center shadow-lg shadow-slate-950/50 shrink-0">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Standar Prosedur Operasional (SOP) Farmasi
                </h1>
                <p className="text-xs sm:text-sm text-slate-200/80 font-medium">
                  Kumpulan SOP Pelayanan Kefarmasian resmi berstandar Permenkes No. 73/2016, 72/2016, CDOB &amp; PerBPOM.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-slate-200">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>Standar Akreditasi Kemenkes &amp; CDOB</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kop &amp; Stempel Digital Instansi</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-cyan-200">
                <Printer className="w-3.5 h-3.5 text-cyan-300" />
                <span>Format Dokumen Siap Cetak A4</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch sm:items-end gap-2.5 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-left sm:text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Total SOP Terakreditasi:</span>
              <span className="text-lg font-black text-slate-200">{PHARMACY_SOP_LIST.length} Dokumen Resmi</span>
            </div>
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-500/40 hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Dokumen SOP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: SOP Navigation & Directory */}
        <div className="lg:col-span-4 space-y-4 print:hidden">
          
          {/* Search Box - Titanium Slate Suite */}
          <div className="bg-white dark:bg-[#0e1218] p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/50 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari judul SOP / nomor / kata kunci..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold font-outfit text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold font-outfit transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-slate-700 to-zinc-700 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-[#161c26] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SOP List Cards */}
          <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredSops.length === 0 ? (
              <div className="bg-white dark:bg-[#071c21] p-6 rounded-3xl text-center border border-slate-200 dark:border-[#143d47] text-xs text-slate-500">
                <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p>Tidak ada dokumen SOP yang sesuai dengan pencarian.</p>
              </div>
            ) : (
              filteredSops.map((sop) => {
                const isSelected = selectedSop.id === sop.id;
                return (
                  <div
                    key={sop.id}
                    onClick={() => setSelectedSop(sop)}
                    className={`p-4 rounded-3xl border transition-all cursor-pointer text-left space-y-2 ${
                      isSelected
                        ? 'bg-teal-50/80 dark:bg-[#0b353e] border-teal-500 shadow-md ring-1 ring-teal-500'
                        : 'bg-white dark:bg-[#071c21] border-slate-200 dark:border-[#143d47] hover:border-teal-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeColor(sop.category)}`}>
                        {sop.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">
                        Rev. {sop.revision}
                      </span>
                    </div>

                    <h3 className={`text-xs font-black leading-snug ${isSelected ? 'text-teal-950 dark:text-teal-200' : 'text-slate-900 dark:text-white'}`}>
                      {sop.title}
                    </h3>

                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {sop.purpose}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-medium">
                      <span className="font-mono">{sop.docNumber}</span>
                      <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold">
                        Buka SOP <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Complete Interactive SOP Document View */}
        <div className="lg:col-span-8 bg-white dark:bg-[#071c21] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#143d47] shadow-lg space-y-6">
          
          {/* Printable Official Letterhead (Kop Surat) */}
          <div className="border-b-2 border-slate-800 dark:border-teal-600/80 pb-4 text-center space-y-1">
            <div className="flex items-center justify-center gap-3">
              {clinicBranding.logoUrl ? (
                <img src={clinicBranding.logoUrl} alt="Logo" className="w-12 h-12 object-contain rounded-xl" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-black text-lg">
                  {clinicBranding.clinicName.charAt(0) || 'F'}
                </div>
              )}
              <div className="text-left">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {clinicBranding.clinicName || 'INSTALASI FARMASI & APOTEK KLINIS'}
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {clinicBranding.tagline || 'Pelayanan Informasi Obat & Standar Mutu Akreditasi Kefarmasian'}
                </p>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 dark:text-slate-400 pt-1">
              {clinicBranding.address || 'Jl. Kesehatan No. 10, Jakarta Pusat'} • Telp: {clinicBranding.phone || '(021) 555-0199'} • SIA/SIPA: {clinicBranding.licenseNumber || 'SIA-1988/DINKES/2026'}
            </p>
          </div>

          {/* SOP Header Document Control Box */}
          <div className="border border-slate-300 dark:border-[#14424e] rounded-2xl overflow-hidden text-xs">
            <div className="bg-slate-100 dark:bg-[#0b353e] p-3 text-center border-b border-slate-300 dark:border-[#14424e]">
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-teal-200 uppercase tracking-wide">
                {selectedSop.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-300 dark:divide-[#14424e] bg-slate-50/50 dark:bg-[#06181c] text-[11px]">
              <div className="p-2.5 space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Nomor Dokumen:</p>
                <p className="font-mono font-bold text-slate-900 dark:text-white">{selectedSop.docNumber}</p>
              </div>
              <div className="p-2.5 space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Tanggal Berlaku:</p>
                <p className="font-bold text-slate-900 dark:text-white">{selectedSop.effectiveDate}</p>
              </div>
              <div className="p-2.5 space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Nomor Revisi:</p>
                <p className="font-bold text-slate-900 dark:text-white">{selectedSop.revision}</p>
              </div>
              <div className="p-2.5 space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Penanggung Jawab:</p>
                <p className="font-bold text-teal-700 dark:text-teal-400">{clinicBranding.doctorName || 'Apoteker Penanggung Jawab'}</p>
              </div>
            </div>
          </div>

          {/* Section 1: Pengertian, Tujuan & Kebijakan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 dark:bg-[#0b2830] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] space-y-1.5">
              <p className="font-black text-slate-900 dark:text-teal-300 flex items-center gap-1.5 text-xs">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>1. TUJUAN:</span>
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {selectedSop.purpose}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#0b2830] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] space-y-1.5">
              <p className="font-black text-slate-900 dark:text-teal-300 flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>2. RUANG LINGKUP:</span>
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {selectedSop.scope}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#0b2830] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] space-y-1.5">
              <p className="font-black text-slate-900 dark:text-teal-300 flex items-center gap-1.5 text-xs">
                <Lock className="w-4 h-4 text-teal-600" />
                <span>3. KEBIJAKAN MUTU:</span>
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {selectedSop.policy}
              </p>
            </div>
          </div>

          {/* Section 2: Dasar Hukum */}
          <div className="bg-teal-50/70 dark:bg-[#0b353e]/40 p-4 rounded-2xl border border-teal-200 dark:border-teal-800 text-xs space-y-1.5">
            <p className="font-black text-teal-950 dark:text-teal-200 uppercase tracking-wider text-[11px]">
              ⚖️ Dasar Hukum & Pedoman Regulator:
            </p>
            <ul className="list-disc list-inside space-y-1 text-teal-900 dark:text-teal-200 text-[11px]">
              {selectedSop.legalBasis.map((law, idx) => (
                <li key={idx} className="leading-snug">{law}</li>
              ))}
            </ul>
          </div>

          {/* Section 3: Prosedur Langkah-demi-Langkah */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <ClipboardList className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Langkah-Langkah Prosedur Kerja Baku
              </h3>
            </div>

            <div className="space-y-3">
              {selectedSop.procedureSteps.map((step) => (
                <div key={step.stepNumber} className="bg-white dark:bg-[#06181c] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] shadow-xs space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      {step.stepNumber}
                    </span>
                    <div className="space-y-1 flex-1">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-teal-200">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.description}
                      </p>

                      {step.keyPoints && step.keyPoints.length > 0 && (
                        <div className="bg-slate-50 dark:bg-[#0b2830] p-3 rounded-xl border border-slate-200 dark:border-[#14424e] mt-2 space-y-1">
                          {step.keyPoints.map((point, pIdx) => (
                            <p key={pIdx} className="text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-2">
                              <span className="text-teal-500 font-bold">•</span>
                              <span className="leading-snug">{point}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Critical Quality Checklist & Formulir Terkait */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* Checklist Mutu */}
            <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <p className="font-extrabold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Titik Kendali Kritis (Quality Control Checklist):</span>
              </p>
              <div className="space-y-1.5">
                {selectedSop.criticalChecklist.map((chk, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2 text-[11px] text-emerald-900 dark:text-emerald-300">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="leading-snug">{chk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulir Terkait */}
            <div className="bg-slate-50 dark:bg-[#0b2830] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] space-y-2">
              <p className="font-extrabold text-slate-900 dark:text-teal-300 flex items-center gap-1.5 text-xs">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Formulir & Rekaman Terkait:</span>
              </p>
              <div className="space-y-1">
                {selectedSop.relatedForms.map((frm, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    <span>{frm}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Signature & Validation Block */}
          <div className="pt-6 border-t-2 border-slate-200 dark:border-slate-800 grid grid-cols-2 text-center text-xs">
            <div className="space-y-14">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">Disiapkan Oleh (Tim Farmasi):</p>
              <div>
                <p className="font-bold text-slate-900 dark:text-white underline">Apoteker Penanggung Jawab</p>
                <p className="text-[10px] text-slate-400">SIPA. 19881024/SIPA_31.71/2026</p>
              </div>
            </div>

            <div className="space-y-14">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">Disahkan Oleh (Pimpinan Faskes):</p>
              <div>
                <p className="font-bold text-slate-900 dark:text-white underline">{clinicBranding.doctorName || 'Direktur / Kepala Klinik'}</p>
                <p className="text-[10px] text-slate-400">SIP. {clinicBranding.sipNumber || 'SIP.01.2026/DINKES'}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
