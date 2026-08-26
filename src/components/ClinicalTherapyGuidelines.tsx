import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  ShieldAlert, 
  Sparkles, 
  Activity, 
  Pill, 
  HeartPulse, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Layers, 
  Printer, 
  ExternalLink, 
  ChevronRight, 
  ArrowRight, 
  Filter, 
  X, 
  Stethoscope, 
  Target, 
  FileText,
  Copy,
  Check,
  Building2,
  BookmarkCheck,
  Download
} from 'lucide-react';
import { 
  ClinicalGuideline, 
  GuidelineCategory, 
  GuidelineOrganization, 
  Drug, 
  ClinicBrandingSettings 
} from '../types';
import { CLINICAL_GUIDELINES_DATABASE } from '../data/clinicalGuidelinesData';

interface ClinicalTherapyGuidelinesProps {
  allDrugs: Drug[];
  onSelectDrugForDetail?: (drug: Drug) => void;
  onCheckInteractionsWithRegimen?: (drugNames: string[]) => void;
  clinicBranding?: ClinicBrandingSettings;
}

export const ClinicalTherapyGuidelines: React.FC<ClinicalTherapyGuidelinesProps> = ({
  allDrugs,
  onSelectDrugForDetail,
  onCheckInteractionsWithRegimen,
  clinicBranding
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<GuidelineCategory>('Semua Kategori');
  const [selectedOrg, setSelectedOrg] = useState<GuidelineOrganization>('Semua Sumber');
  const [selectedGuideline, setSelectedGuideline] = useState<ClinicalGuideline | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: GuidelineCategory[] = [
    'Semua Kategori',
    'Kardiovaskular',
    'Endokrin & Metabolik',
    'Respirasi & Alergi',
    'Anti-Infeksi',
    'Pediatri (Kesehatan Anak)',
    'Obstetri & Ginekologi',
    'Gastrointestinal',
    'Reumatologi & Ginjal',
    'Sistem Saraf & Psikiatri'
  ];

  const organizations: GuidelineOrganization[] = [
    'Semua Sumber',
    'PNPK Kemenkes RI',
    'PERKI',
    'PERKENI',
    'PAPDI',
    'PDPI',
    'IDAI',
    'POGI',
    'PERDOSSI',
    'IRA',
    'PERNEFRI',
    'PGI-PEGI'
  ];

  // Helper styling for category badges
  const getCategoryBadgeStyle = (category?: string) => {
    switch (category) {
      case 'Pediatri (Kesehatan Anak)':
        return 'bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800 shadow-2xs';
      case 'Obstetri & Ginekologi':
        return 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800 shadow-2xs';
      case 'Kardiovaskular':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Endokrin & Metabolik':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Respirasi & Alergi':
        return 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
      case 'Anti-Infeksi':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Gastrointestinal':
        return 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'Reumatologi & Ginjal':
        return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'Sistem Saraf & Psikiatri':
        return 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800';
      default:
        return 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800';
    }
  };

  // Helper styling for organization badges
  const getOrgBadgeStyle = (org?: string) => {
    switch (org) {
      case 'PNPK Kemenkes RI':
        return 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'PERKI':
        return 'bg-red-600/10 text-red-700 dark:text-red-300 border-red-500/30';
      case 'PERKENI':
        return 'bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'PAPDI':
        return 'bg-amber-600/10 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'PDPI':
        return 'bg-cyan-600/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30';
      case 'IDAI':
        return 'bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-400/40 font-black';
      case 'POGI':
        return 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-400/40 font-black';
      case 'PERDOSSI':
        return 'bg-indigo-600/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30';
      case 'IRA':
        return 'bg-orange-600/10 text-orange-700 dark:text-orange-300 border-orange-500/30';
      case 'PERNEFRI':
        return 'bg-teal-600/10 text-teal-700 dark:text-teal-300 border-teal-500/30';
      case 'PGI-PEGI':
        return 'bg-lime-600/10 text-lime-700 dark:text-lime-300 border-lime-500/30';
      default:
        return 'bg-teal-600/10 text-teal-700 dark:text-teal-300 border-teal-500/30';
    }
  };

  // Helper styling for FORNAS badges
  const getFornasBadgeStyle = (tier?: string) => {
    if (tier?.includes('Faskes 1')) {
      return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    }
    if (tier?.includes('Faskes 2/3')) {
      return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800';
    }
    return 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800';
  };

  // Filter guidelines based on category, organization, and search query
  const filteredGuidelines = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return CLINICAL_GUIDELINES_DATABASE.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Semua Kategori' || item.category === selectedCategory;

      const matchesOrg =
        selectedOrg === 'Semua Sumber' || item.organization === selectedOrg;

      const matchesSearch =
        !query ||
        item.diseaseName.toLowerCase().includes(query) ||
        (item.icd10 && item.icd10.toLowerCase().includes(query)) ||
        item.summary.toLowerCase().includes(query) ||
        (item.indonesianKeywords && item.indonesianKeywords.some((k) => k.toLowerCase().includes(query))) ||
        (item.organization && item.organization.toLowerCase().includes(query)) ||
        item.firstLineTherapy.some((r) => r.drugName.toLowerCase().includes(query) || (r.notes && r.notes.toLowerCase().includes(query))) ||
        item.secondLineTherapy.some((r) => r.drugName.toLowerCase().includes(query)) ||
        item.sourceGuidelines.toLowerCase().includes(query);

      return matchesCategory && matchesOrg && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedOrg]);

  const handleOpenDrugDetail = (drugName: string) => {
    if (!onSelectDrugForDetail) return;
    const clean = drugName.toLowerCase().trim();
    const matched = allDrugs.find(
      (d) =>
        d.name.toLowerCase() === clean ||
        d.genericName.toLowerCase() === clean ||
        d.brandNames?.some((b) => b.toLowerCase() === clean) ||
        d.name.toLowerCase().includes(clean)
    );
    if (matched) {
      onSelectDrugForDetail(matched);
    }
  };

  const handleTestInteractions = (guideline: ClinicalGuideline) => {
    if (!onCheckInteractionsWithRegimen) return;
    const drugNames = [
      ...guideline.firstLineTherapy.map((r) => r.drugName),
      ...guideline.secondLineTherapy.slice(0, 2).map((r) => r.drugName)
    ].slice(0, 4);

    onCheckInteractionsWithRegimen(drugNames);
  };

  const handleCopySummary = (guideline: ClinicalGuideline) => {
    const text = `📋 PANDUAN TERAPI KLINIS: ${guideline.diseaseName} (${guideline.icd10 || '-'})
Sumber Resmi: ${guideline.sourceGuidelines} (${guideline.organization || 'Standar Nasional'})

🎯 SASARAN TARGET:
${guideline.targetGoals.map((g) => `• ${g}`).join('\n')}

💊 REKOMENDASI LINI PERTAMA:
${guideline.firstLineTherapy.map((d) => `• ${d.drugName}: ${d.dosage} (${d.fornasTier || 'FORNAS'})`).join('\n')}

🛡️ PERINGATAN KLINIS:
${guideline.keyClinicalAlert || '-'}`;

    navigator.clipboard.writeText(text);
    setCopiedId(guideline.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrintGuideline = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner - Dark Teal Gradient with Rich Aesthetics */}
      <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#143d47] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0a2f38] px-3.5 py-1.5 rounded-full text-xs font-black text-teal-300 uppercase tracking-wider border border-teal-500/30">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Pedoman Nasional Pelayanan Kedokteran (PNPK) & Konsensus Spesialis RI</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Panduan Terapi <span className="text-teal-300">Penyakit Klinis Indonesia</span>
              </h1>
              <p className="text-teal-100/80 text-xs sm:text-sm leading-relaxed max-w-3xl font-medium mt-1">
                Database tatalaksana farmakoterapi resmi berbasis standar Kemenkes RI, PERKI, PERKENI, PAPDI, PDPI, IDAI, POGI, PERDOSSI, IRA, PERNEFRI, & PGI-PEGI. Terintegrasi dengan ketersediaan Formularium Nasional (FORNAS) BPJS Kesehatan dan uji interaksi obat otomatis.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="bg-teal-900/70 border border-teal-500/40 text-teal-200 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-2xs">
                {CLINICAL_GUIDELINES_DATABASE.length} Pedoman Nasional
              </span>
              <span className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold px-3 py-1.5 rounded-xl">
                BPJS & FORNAS Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#071c21] rounded-2xl border border-slate-200/90 dark:border-teal-500/20 p-5 shadow-xs space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari penyakit (misal: TB Paru, Stroke, DBD, Tifoid, Kejang Demam, Asma, Preeklamsia, Hipertensi, ICD-10, atau nama obat)..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-[#0b2830] border border-slate-200 dark:border-[#14424e] rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Organization / Sumber Pedoman Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Building2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Sumber Pedoman:</span>
          </span>
          {organizations.map((org) => {
            const isSelected = selectedOrg === org;
            const count =
              org === 'Semua Sumber'
                ? CLINICAL_GUIDELINES_DATABASE.length
                : CLINICAL_GUIDELINES_DATABASE.filter((g) => g.organization === org).length;

            return (
              <button
                key={org}
                onClick={() => setSelectedOrg(org)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-[#0b2830] text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-[#113a45] hover:text-teal-800 dark:hover:text-teal-200'
                }`}
              >
                <span>{org}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-teal-900/70 text-teal-100' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100 dark:border-[#14424e]">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" />
            <span>Kategori:</span>
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === 'Semua Kategori'
                ? CLINICAL_GUIDELINES_DATABASE.length
                : CLINICAL_GUIDELINES_DATABASE.filter((g) => g.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#0b2830] text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-[#113a45] hover:text-teal-800 dark:hover:text-teal-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-teal-900/60 text-teal-100' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Guidelines Grid */}
      {filteredGuidelines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGuidelines.map((guideline) => (
            <div
              key={guideline.id}
              className="bg-white dark:bg-[#071c21] rounded-2xl border border-slate-200/90 dark:border-teal-500/20 p-5 shadow-xs hover:border-teal-400 dark:hover:border-teal-500/50 hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {guideline.organization && (
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${getOrgBadgeStyle(guideline.organization)}`}>
                        {guideline.organization}
                      </span>
                    )}
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${getCategoryBadgeStyle(guideline.category)}`}>
                      {guideline.category === 'Pediatri (Kesehatan Anak)' ? '🌸 ' : guideline.category === 'Obstetri & Ginekologi' ? '💜 ' : ''}{guideline.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {guideline.icd10 && (
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        {guideline.icd10}
                      </span>
                    )}
                    {guideline.updatedYear && (
                      <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {guideline.updatedYear}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Summary */}
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors leading-tight">
                    {guideline.diseaseName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-1.5 leading-relaxed">
                    {guideline.summary}
                  </p>
                </div>

                {/* FORNAS Coverage Tag */}
                {guideline.fornasTier && (
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${getFornasBadgeStyle(guideline.fornasTier)}`}>
                      <BookmarkCheck className="w-3 h-3" />
                      <span>FORNAS: {guideline.fornasTier}</span>
                    </span>
                  </div>
                )}

                {/* Target Goals Snippet */}
                {guideline.targetGoals && guideline.targetGoals.length > 0 && (
                  <div className="bg-slate-50 dark:bg-[#0b2830] p-2.5 rounded-xl border border-slate-200/80 dark:border-[#14424e] space-y-1">
                    <span className="text-[10px] font-extrabold text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1">
                      <Target className="w-3 h-3 text-teal-600" />
                      <span>Target Sasaran Terapi:</span>
                    </span>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold line-clamp-1">
                      {guideline.targetGoals[0]}
                    </p>
                  </div>
                )}

                {/* 1st Line Regimens Chips */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Regimen Lini Pertama (1st Line):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {guideline.firstLineTherapy.slice(0, 3).map((reg, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDrugDetail(reg.drugName);
                        }}
                        className="bg-teal-50/80 dark:bg-slate-800 text-teal-900 dark:text-teal-200 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-teal-200 dark:border-teal-700 hover:bg-teal-100 transition-colors cursor-pointer flex items-center gap-1"
                        title="Klik untuk membuka monografi obat"
                      >
                        <span>💊 {reg.drugName}</span>
                        {reg.fornasTier && (
                          <span className="text-[8px] bg-teal-200/70 dark:bg-teal-900 text-teal-800 dark:text-teal-300 px-1 py-0.2 rounded font-extrabold">
                            {reg.fornasTier}
                          </span>
                        )}
                      </button>
                    ))}
                    {guideline.firstLineTherapy.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-bold self-center">
                        +{guideline.firstLineTherapy.length - 3} lainnya
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedGuideline(guideline)}
                  className="flex-1 bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Buka Protokol Lengkap</span>
                </button>

                <button
                  onClick={() => handleCopySummary(guideline)}
                  className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  title="Salin Resume Terapi"
                >
                  {copiedId === guideline.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                {onCheckInteractionsWithRegimen && (
                  <button
                    onClick={() => handleTestInteractions(guideline)}
                    className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-teal-900/50 text-teal-800 dark:text-teal-300 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    title="Uji Interaksi Regimen Obat di Checker"
                  >
                    <ShieldAlert className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#071c21] p-12 rounded-2xl border border-slate-200 dark:border-teal-500/20 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Pedoman Terapi Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Tidak ada pedoman klinis yang cocok dengan kata kunci "{searchTerm}" atau filter yang dipilih. Coba ubah kategori atau gunakan istilah medis lainnya.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Semua Kategori');
              setSelectedOrg('Semua Sumber');
            }}
            className="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800 transition-colors cursor-pointer"
          >
            Reset Seluruh Filter
          </button>
        </div>
      )}

      {/* DETAIL MODAL: Full Protocol & Decision Support */}
      {selectedGuideline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#071c21] w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-teal-500/30 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] p-5 sm:p-6 text-white flex items-start justify-between gap-3 shrink-0">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedGuideline.organization && (
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${getOrgBadgeStyle(selectedGuideline.organization)}`}>
                      {selectedGuideline.organization}
                    </span>
                  )}
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getCategoryBadgeStyle(selectedGuideline.category)}`}>
                    {selectedGuideline.category === 'Pediatri (Kesehatan Anak)' ? '🌸 ' : selectedGuideline.category === 'Obstetri & Ginekologi' ? '💜 ' : ''}{selectedGuideline.category}
                  </span>
                  {selectedGuideline.fornasTier && (
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                      FORNAS: {selectedGuideline.fornasTier}
                    </span>
                  )}
                  {selectedGuideline.icd10 && (
                    <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      ICD-10: {selectedGuideline.icd10}
                    </span>
                  )}
                  {selectedGuideline.updatedYear && (
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                      Revisi: {selectedGuideline.updatedYear}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedGuideline.diseaseName}
                </h2>
                <p className="text-teal-100/70 text-xs font-medium">
                  {selectedGuideline.sourceGuidelines}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleCopySummary(selectedGuideline)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-teal-200 transition-colors cursor-pointer"
                  title="Salin Resume Terapi"
                >
                  {copiedId === selectedGuideline.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handlePrintGuideline}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-teal-200 transition-colors cursor-pointer"
                  title="Cetak Pedoman Terapi"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedGuideline(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-xs">
              
              {/* Summary Box */}
              <div className="bg-slate-50 dark:bg-[#0b2830] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] space-y-1.5">
                <p className="font-black text-teal-900 dark:text-teal-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-teal-600" />
                  <span>Ringkasan Klinis & Definisi Penyakit:</span>
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedGuideline.summary}
                </p>
              </div>

              {/* Key Clinical Alert (If any) */}
              {selectedGuideline.keyClinicalAlert && (
                <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-300 dark:border-rose-900/60 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-rose-950 dark:text-rose-200 text-xs">
                      Poin Kunci & Rekomendasi Terapi Krusial:
                    </p>
                    <p className="text-rose-900 dark:text-rose-300 font-medium leading-relaxed mt-0.5">
                      {selectedGuideline.keyClinicalAlert}
                    </p>
                  </div>
                </div>
              )}

              {/* Target Goals */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-black text-xs uppercase tracking-wider">
                  <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Sasaran & Target Terapi Klinis:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {selectedGuideline.targetGoals.map((goal, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white dark:bg-slate-900/80 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 font-bold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* First-Line Therapy Table */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-900 dark:text-teal-300 font-black text-sm">
                    <Pill className="w-4 h-4 text-teal-600" />
                    <span>Regimen Obat Lini Pertama (1st Line Therapy)</span>
                  </div>
                  <span className="text-[10px] font-extrabold bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-200 px-2.5 py-0.5 rounded-full border border-teal-300 dark:border-teal-700">
                    Prioritas Utama
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedGuideline.firstLineTherapy.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-[#0b2830] p-4 rounded-2xl border border-teal-200 dark:border-teal-800/80 shadow-2xs space-y-1.5 hover:border-teal-400 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <button
                          onClick={() => handleOpenDrugDetail(item.drugName)}
                          className="text-sm font-black text-teal-900 dark:text-teal-300 hover:underline flex items-center gap-1.5 cursor-pointer text-left"
                          title="Buka Monografi Obat"
                        >
                          <span>{item.drugName}</span>
                          <ExternalLink className="w-3 h-3 text-teal-500" />
                        </button>
                        <div className="flex items-center gap-1.5">
                          {item.fornasTier && (
                            <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">
                              FORNAS: {item.fornasTier}
                            </span>
                          )}
                          <span className="bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-200 text-[10px] font-extrabold px-2 py-0.5 rounded border border-teal-300 dark:border-teal-700">
                            {item.role}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 font-bold">
                        Dosis Standar: <span className="text-teal-800 dark:text-teal-300">{item.dosage}</span>
                      </p>
                      {item.notes && (
                        <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Second-Line & Combination Therapy */}
              {selectedGuideline.secondLineTherapy && selectedGuideline.secondLineTherapy.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200 font-black text-sm">
                      <Layers className="w-4 h-4 text-purple-600" />
                      <span>Lini Kedua / Terapi Kombinasi / Add-On</span>
                    </div>
                    <span className="text-[10px] font-extrabold bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-200 px-2.5 py-0.5 rounded-full border border-purple-300 dark:border-purple-700">
                      Eskalasi Terapi
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedGuideline.secondLineTherapy.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-[#0b2830] p-4 rounded-2xl border border-purple-200 dark:border-purple-900/60 shadow-2xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <button
                            onClick={() => handleOpenDrugDetail(item.drugName)}
                            className="text-sm font-black text-purple-950 dark:text-purple-300 hover:underline flex items-center gap-1.5 cursor-pointer text-left"
                            title="Buka Monografi Obat"
                          >
                            <span>{item.drugName}</span>
                            <ExternalLink className="w-3 h-3 text-purple-500" />
                          </button>
                          <div className="flex items-center gap-1.5">
                            {item.fornasTier && (
                              <span className="bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-300 dark:border-indigo-700">
                                FORNAS: {item.fornasTier}
                              </span>
                            )}
                            <span className="bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-200 text-[10px] font-extrabold px-2 py-0.5 rounded border border-purple-300 dark:border-purple-700">
                              {item.role}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 font-bold">
                          Dosis Standar: <span className="text-purple-800 dark:text-purple-300">{item.dosage}</span>
                        </p>
                        {item.notes && (
                          <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Populations & Contraindications */}
              {selectedGuideline.specialPopulations && selectedGuideline.specialPopulations.length > 0 && (
                <div className="bg-amber-50/80 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Pertimbangan Populasi Khusus & Kontraindikasi:</span>
                  </div>
                  <div className="space-y-2">
                    {selectedGuideline.specialPopulations.map((pop, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
                        <p className="font-black text-amber-950 dark:text-amber-200 text-xs">
                          🏷️ {pop.condition}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {pop.recommendation}
                        </p>
                        {pop.contraindicatedDrugs && pop.contraindicatedDrugs.length > 0 && (
                          <div className="pt-1">
                            <span className="text-[10px] font-extrabold text-rose-700 dark:text-rose-400 uppercase">
                              Kontraindikasi:
                            </span>
                            <ul className="list-disc list-inside text-[11px] text-rose-900 dark:text-rose-300 font-semibold pl-1">
                              {pop.contraindicatedDrugs.map((contra, cIdx) => (
                                <li key={cIdx}>{contra}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Non-Pharmacological & Monitoring Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Non-Pharmacological */}
                <div className="bg-slate-50 dark:bg-[#0b2830] p-4 rounded-2xl border border-slate-200 dark:border-[#14424e] space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-200 font-black text-xs uppercase tracking-wider">
                    <HeartPulse className="w-4 h-4 text-teal-600" />
                    <span>Modifikasi Gaya Hidup & Non-Farmakologi:</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {selectedGuideline.nonPharmacological.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Monitoring Parameters */}
                <div className="bg-sky-50/70 dark:bg-sky-950/30 p-4 rounded-2xl border border-sky-200 dark:border-sky-900/50 space-y-2">
                  <div className="flex items-center gap-1.5 text-sky-900 dark:text-sky-300 font-black text-xs uppercase tracking-wider">
                    <Activity className="w-4 h-4 text-sky-600" />
                    <span>Parameter Pemantauan & Evaluasi Klinis:</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {selectedGuideline.monitoringParameters.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sky-950 dark:text-sky-200 leading-relaxed font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 dark:bg-[#071c21] p-4 sm:p-5 border-t border-slate-200 dark:border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Sumber Resmi: <strong className="text-slate-700 dark:text-slate-300">{selectedGuideline.sourceGuidelines}</strong>
              </p>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onCheckInteractionsWithRegimen && (
                  <button
                    onClick={() => {
                      handleTestInteractions(selectedGuideline);
                      setSelectedGuideline(null);
                    }}
                    className="flex-1 sm:flex-none bg-[#0f766e] hover:bg-[#115e59] text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Uji Interaksi Regimen di Checker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedGuideline(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
