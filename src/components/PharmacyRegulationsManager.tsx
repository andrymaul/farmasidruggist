import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  BookOpen, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  Building2, 
  FileText, 
  Lock, 
  Pill, 
  ExternalLink,
  ChevronRight,
  Gavel,
  ShieldCheck,
  BookmarkCheck,
  Sparkles,
  Layers
} from 'lucide-react';
import { FloatingPillsBackground } from './FloatingPillsBackground';
import { PHARMACY_REGULATIONS_DATA, RegulationItem } from '../data/pharmacyRegulationsData';
import { ClinicBrandingSettings } from '../types';

interface PharmacyRegulationsManagerProps {
  clinicBranding: ClinicBrandingSettings;
}

export const PharmacyRegulationsManager: React.FC<PharmacyRegulationsManagerProps> = ({
  clinicBranding
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedReg, setSelectedReg] = useState<RegulationItem>(PHARMACY_REGULATIONS_DATA[0]);

  const categories = [
    { id: 'all', label: 'Semua Regulasi', count: PHARMACY_REGULATIONS_DATA.length },
    { id: 'uu', label: 'Undang-Undang (UU)', count: PHARMACY_REGULATIONS_DATA.filter(r => r.type === 'uu').length },
    { id: 'pp', label: 'Peraturan Pemerintah (PP)', count: PHARMACY_REGULATIONS_DATA.filter(r => r.type === 'pp').length },
    { id: 'permenkes', label: 'Permenkes (PMK)', count: PHARMACY_REGULATIONS_DATA.filter(r => r.type === 'permenkes').length },
    { id: 'dowa', label: 'Daftar DOWA (1, 2, 3)', count: PHARMACY_REGULATIONS_DATA.filter(r => r.type === 'dowa').length },
    { id: 'perbpom', label: 'Peraturan BPOM (OOT & CDOB)', count: PHARMACY_REGULATIONS_DATA.filter(r => r.type === 'perbpom').length }
  ];

  const filteredRegulations = PHARMACY_REGULATIONS_DATA.filter((item) => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.typeLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'uu': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800';
      case 'pp': return 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-800';
      case 'permenkes': return 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800';
      case 'dowa': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800';
      case 'perbpom': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HERO BANNER - GOLDEN BRONZE & DARK ESPRESSO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e0a04] via-[#211709] to-[#33240e] p-6 sm:p-8 text-white shadow-2xl border border-amber-500/25 print:hidden">
        <FloatingPillsBackground density="low" accentColor="#f59e0b" />
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <Scale className="w-48 h-48 text-amber-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-outfit">
              <Gavel className="w-3.5 h-3.5 text-amber-400" />
              <span>Kompilasi Hukum &amp; Regulasi Kefarmasian Indonesia</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 text-white flex items-center justify-center shadow-lg shadow-amber-950/50 shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Regulasi &amp; Kebijakan Farmasi Indonesia
                </h1>
                <p className="text-xs sm:text-sm text-amber-100/80 font-medium">
                  Pusat referensi regulasi kefarmasian: UU No. 17/2023, Narkotika &amp; Psikotropika, Permenkes 73/2016, dan DOWA 1, 2, 3.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-amber-200">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>UU 17/2023 &amp; Narkotika-Psikotropika</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Permenkes 73/2016 &amp; CDOB BPOM</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-amber-200">
                <Pill className="w-3.5 h-3.5 text-amber-300" />
                <span>Daftar Obat Wajib Apotek (DOWA 1,2,3)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch sm:items-end gap-2.5 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-amber-950/60 text-left sm:text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Total Regulasi Terdaftar:</span>
              <span className="text-lg font-black text-amber-300">{PHARMACY_REGULATIONS_DATA.length} Peraturan &amp; DOWA</span>
            </div>
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer border border-amber-400/40 hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Intisari Regulasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Regulations Directory */}
        <div className="lg:col-span-4 space-y-4 print:hidden">
          
          {/* Search Box - Amber Gold Suite */}
          <div className="bg-white dark:bg-[#161005] p-5 rounded-3xl border border-amber-200/80 dark:border-amber-500/25 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari regulasi / nomor / kata kunci..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold font-outfit text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedType(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold font-outfit transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedType === cat.id
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-[#211707] text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedType === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Regulations List */}
          <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredRegulations.length === 0 ? (
              <div className="bg-white dark:bg-[#071c21] p-6 rounded-3xl text-center border border-slate-200 dark:border-[#143d47] text-xs text-slate-500">
                <Scale className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p>Tidak ada regulasi yang sesuai dengan pencarian.</p>
              </div>
            ) : (
              filteredRegulations.map((reg) => {
                const isSelected = selectedReg.id === reg.id;
                return (
                  <div
                    key={reg.id}
                    onClick={() => setSelectedReg(reg)}
                    className={`p-4 rounded-3xl border transition-all cursor-pointer text-left space-y-2 ${
                      isSelected
                        ? 'bg-teal-50/80 dark:bg-[#0b353e] border-teal-500 shadow-md ring-1 ring-teal-500'
                        : 'bg-white dark:bg-[#071c21] border-slate-200 dark:border-[#143d47] hover:border-teal-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getTypeBadgeColor(reg.type)}`}>
                        {reg.typeLabel}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.2 rounded-md">
                        {reg.status}
                      </span>
                    </div>

                    <h3 className={`text-xs font-black leading-snug ${isSelected ? 'text-teal-950 dark:text-teal-200' : 'text-slate-900 dark:text-white'}`}>
                      {reg.title}
                    </h3>

                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {reg.summary}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-medium">
                      <span className="font-mono font-bold text-slate-600 dark:text-slate-300">{reg.regNumber}</span>
                      <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold">
                        Buka Detail <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Complete Interactive Regulation Document View */}
        <div className="lg:col-span-8 bg-white dark:bg-[#071c21] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#143d47] shadow-lg space-y-6">
          
          {/* Header Info Box */}
          <div className="border border-slate-300 dark:border-[#14424e] rounded-2xl overflow-hidden text-xs">
            <div className="bg-slate-100 dark:bg-[#0b353e] p-4 text-center border-b border-slate-300 dark:border-[#14424e] space-y-1">
              <span className={`text-[10px] font-extrabold px-3 py-0.5 rounded-full border ${getTypeBadgeColor(selectedReg.type)}`}>
                {selectedReg.typeLabel} • TAHUN {selectedReg.year}
              </span>
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-teal-200 uppercase tracking-wide pt-1">
                {selectedReg.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y sm:divide-y-0 divide-slate-300 dark:divide-[#14424e] bg-slate-50/50 dark:bg-[#06181c] text-[11px]">
              <div className="p-3 space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Nomor Regulasi:</p>
                <p className="font-mono font-bold text-slate-900 dark:text-white">{selectedReg.regNumber}</p>
              </div>
              <div className="p-3 space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Instansi Penerbit:</p>
                <p className="font-bold text-slate-900 dark:text-white">{selectedReg.issuingAuthority}</p>
              </div>
              <div className="p-3 space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Status Keberlakuan:</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">✅ {selectedReg.status}</p>
              </div>
            </div>
          </div>

          {/* Section 1: Ringkasan Eksekutif & Ruang Lingkup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 dark:bg-[#0b2830] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] space-y-1.5">
              <p className="font-black text-slate-900 dark:text-teal-300 flex items-center gap-1.5 text-xs">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>Ringkasan Eksekutif Regulasi:</span>
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {selectedReg.summary}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#0b2830] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] space-y-1.5">
              <p className="font-black text-slate-900 dark:text-teal-300 flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Ruang Lingkup & Subjek Hukum:</span>
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {selectedReg.scope}
              </p>
            </div>
          </div>

          {/* Section 2: Intisari Pasal-Pasal Kritis & Implikasi Klinis */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Gavel className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Intisari Pasal-Pasal Kunci & Implikasi Klinis Apoteker
              </h3>
            </div>

            <div className="space-y-3">
              {selectedReg.keyArticles.map((art, idx) => (
                <div key={idx} className="bg-white dark:bg-[#06181c] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] shadow-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                    <span className="font-mono text-xs font-black text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-[#0e3742] px-2.5 py-0.5 rounded-md">
                      {art.articleNumber}
                    </span>
                    <span className="text-xs font-extrabold text-slate-800 dark:text-white">
                      {art.topic}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {art.content}
                  </p>

                  <div className="bg-amber-50/70 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-snug">
                      <strong>Implikasi Praktik Farmasi:</strong> {art.clinicalImplication}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Lampiran Daftar Obat Regulasi (Jika Ada) */}
          {selectedReg.drugListsOrSchedules && selectedReg.drugListsOrSchedules.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Pill className="w-5 h-5 text-teal-600" />
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Lampiran Daftar Golongan & Batas Penyerahan Obat
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {selectedReg.drugListsOrSchedules.map((schedule, sIdx) => (
                  <div key={sIdx} className="bg-slate-50 dark:bg-[#0b2830] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] space-y-2">
                    <p className="font-extrabold text-teal-900 dark:text-teal-200 text-xs">
                      {schedule.category}
                    </p>

                    <div className="space-y-1">
                      {schedule.items.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 dark:text-slate-400">
                      <strong>Aturan Khusus:</strong> {schedule.rules}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Sanksi Hukum & Catatan Kritis */}
          <div className="bg-rose-50/70 dark:bg-rose-950/30 p-4 rounded-2xl border border-rose-200 dark:border-rose-800 text-xs space-y-2">
            <p className="font-extrabold text-rose-950 dark:text-rose-200 flex items-center gap-1.5 text-xs">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Sanksi Administratif & Ancaman Pidana Pelanggaran:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 text-rose-900 dark:text-rose-300 text-[11px]">
              {selectedReg.sanctionsOrPenalties.map((snc, sncIdx) => (
                <li key={sncIdx} className="leading-snug">{snc}</li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-[#0b2830] rounded-2xl border border-slate-200 dark:border-[#14424e] text-xs text-slate-600 dark:text-slate-400">
            <strong>Catatan Yuridis:</strong> {selectedReg.notes}
          </div>

        </div>

      </div>

    </div>
  );
};
