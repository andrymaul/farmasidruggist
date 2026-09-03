import React, { useState, useMemo } from 'react';
import { 
  BookMarked, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  FileText, 
  Layers, 
  Award, 
  Send, 
  HeartHandshake,
  TableProperties,
  Stethoscope,
  Info,
  BookOpen
} from 'lucide-react';
import { 
  CLINICAL_LITERATURE_DATABASE, 
  LITERATURE_CATEGORIES, 
  FEATURE_EVIDENCE_MAPPING,
  LiteratureSource 
} from '../data/clinicalLiteratureData';
import { FloatingPillsBackground } from './FloatingPillsBackground';

interface ClinicalLiteratureProps {
  onSelectTab?: (tabId: string) => void;
}

export const ClinicalLiterature: React.FC<ClinicalLiteratureProps> = ({ onSelectTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'cards' | 'matrix'>('cards');
  
  // Feedback Modal State
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    profession: 'Apoteker',
    sourceName: '',
    proposedUpdate: '',
    referenceLink: ''
  });

  const filteredSources = useMemo(() => {
    return CLINICAL_LITERATURE_DATABASE.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.institution.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.documentCode && item.documentCode.toLowerCase().includes(q)) ||
        item.keyTopics.some(t => t.toLowerCase().includes(q)) ||
        item.appliedInFeatures.some(f => f.featureName.toLowerCase().includes(q) || f.description.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitationId(id);
    setTimeout(() => {
      setCopiedCitationId(null);
    }, 2500);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
      setShowFeedbackModal(false);
      setFeedbackData({
        name: '',
        profession: 'Apoteker',
        sourceName: '',
        proposedUpdate: '',
        referenceLink: ''
      });
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* HERO SECTION - DEEP TEAL & MIDNIGHT SAPPHIRE */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#030b0e] via-[#061922] to-[#092634] p-6 sm:p-8 text-white shadow-2xl border border-teal-500/25">
        <FloatingPillsBackground density="low" accentColor="#2dd4bf" />
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <BookOpen className="w-48 h-48 text-teal-400" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold font-outfit">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Evidence-Based Medicine (EBM) &amp; Basis Ilmiah FarmasiDruggist</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-teal-950/50 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                    Literatur &amp; Basis Ilmiah
                  </h1>
                  <p className="text-xs sm:text-sm text-teal-100/80 font-medium">
                    Kompilasi dan penyelarasan transparan dari PNPK Kemenkes RI, konsensus organisasi profesi spesialis, serta standar baku emas internasional.
                  </p>
                </div>
              </div>

              {/* Quick Stat Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-teal-200">
                  <Layers className="w-3.5 h-3.5 text-teal-400" />
                  <span>100% Metodologi Berbasis Bukti</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-cyan-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Standar PNPK, ASHP &amp; KDIGO</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-sky-200">
                  <Award className="w-3.5 h-3.5 text-sky-300" />
                  <span>Grade A &amp; B Level Evidens</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-teal-950/60 text-right shadow-md shrink-0">
              <span className="text-[11px] text-slate-400 block font-medium">Total Literatur EBM:</span>
              <span className="text-lg font-black text-teal-400">{CLINICAL_LITERATURE_DATABASE.length} Sumber Baku Emas</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/5">
              <div className="text-xl sm:text-2xl font-black font-outfit text-teal-400">100% EBM</div>
              <div className="text-xs text-slate-400 mt-0.5">Metodologi Berbasis Bukti</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/5">
              <div className="text-xl sm:text-2xl font-black font-outfit text-emerald-400">{CLINICAL_LITERATURE_DATABASE.length} Sumber Primer</div>
              <div className="text-xs text-slate-400 mt-0.5">Kemenkes, BPOM & Global</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/5">
              <div className="text-xl sm:text-2xl font-black font-outfit text-amber-400">Grade A & B</div>
              <div className="text-xs text-slate-400 mt-0.5">Level Evidens Tertinggi</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/5">
              <div className="text-xl sm:text-2xl font-black font-outfit text-cyan-400">Verifikasi Resmi</div>
              <div className="text-xs text-slate-400 mt-0.5">Tautan Portal Terbuka</div>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW SELECTOR & SEARCH BAR */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari literatur, institusi (PERKI, Kemenkes, ASHP, IDAI), obat, atau topik penyakit..."
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0e1320] border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg"
              >
                Reset
              </button>
            )}
          </div>

          {/* View Toggle & Feedback Button */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 bg-slate-100 dark:bg-[#0e1320] border border-slate-200 dark:border-slate-800 rounded-2xl">
              <button
                onClick={() => setActiveView('cards')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'cards'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Kartu Sumber ({filteredSources.length})</span>
              </button>
              <button
                onClick={() => setActiveView('matrix')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'matrix'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <TableProperties className="w-3.5 h-3.5" />
                <span>Matriks Fitur</span>
              </button>
            </div>

            <button
              onClick={() => setShowFeedbackModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer shadow-xs"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
              <span>Usulkan Pembaruan</span>
            </button>
          </div>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Pencarian Cepat:</span>
          {['PERKI', 'PERKENI', 'IDAI', 'ASHP Trissel', 'DDInter', 'FORNAS', 'KDIGO', 'BPOM', 'POGI', 'Naranjo', 'Puyer'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                setSelectedCategory('all');
              }}
              className={`px-2.5 py-0.5 rounded-lg border text-[11px] font-medium transition-all cursor-pointer ${
                searchQuery.toLowerCase() === tag.toLowerCase()
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white dark:bg-[#0e1320] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY TABS (HANYA MUNCUL DI VIEW CARDS) */}
      {activeView === 'cards' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {LITERATURE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-500/20'
                  : 'bg-white dark:bg-[#0e1320] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                selectedCategory === cat.id
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* VIEW: CARDS */}
      {activeView === 'cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSources.map((source: LiteratureSource) => (
            <div 
              key={source.id}
              className="bg-white dark:bg-[#0e1320] rounded-3xl border border-slate-200/90 dark:border-slate-800/90 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header Card */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {source.categoryLabel}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${source.badgeColor}`}>
                        {source.evidenceGrade}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-outfit text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                      {source.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      Penerbit: <strong className="text-slate-700 dark:text-slate-200">{source.institution}</strong>
                    </p>
                  </div>
                  
                  <div className="shrink-0 text-right">
                    <span className="inline-block text-[11px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2 py-1 rounded-lg border border-teal-200 dark:border-teal-900/60">
                      Rilis: {source.releaseYear}
                    </span>
                  </div>
                </div>

                {/* Evidence Level & Document Code */}
                <div className="flex flex-wrap items-center gap-2 text-xs py-2 px-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{source.evidenceLevel}</span>
                  </div>
                  {source.documentCode && (
                    <>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                        {source.documentCode}
                      </div>
                    </>
                  )}
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {source.summary}
                </p>

                {/* Key Topics Badges */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Fokus & Parameter Utama:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {source.keyTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Feature Integration Box */}
                <div className="p-3.5 bg-teal-50/60 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 rounded-2xl space-y-2">
                  <div className="text-[11px] font-extrabold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>Diterapkan pada Fitur FarmasiDruggist:</span>
                  </div>
                  <div className="space-y-1.5">
                    {source.appliedInFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 text-xs">
                        <div className="text-slate-700 dark:text-slate-300">
                          <strong className="font-semibold text-slate-900 dark:text-white">{feat.featureName}:</strong> {feat.description}
                        </div>
                        {onSelectTab && (
                          <button
                            onClick={() => onSelectTab(feat.tabId)}
                            className="shrink-0 text-[11px] font-bold text-teal-700 dark:text-teal-300 hover:text-teal-800 dark:hover:text-white bg-white dark:bg-teal-900/40 px-2.5 py-1 rounded-lg border border-teal-200 dark:border-teal-800/60 flex items-center gap-1 transition-all cursor-pointer hover:scale-105"
                          >
                            <span>Buka</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formal Citation Box */}
                <div className="p-2.5 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 font-mono">
                      Sitasi Resmi (Vancouver Format):
                    </span>
                    <button
                      onClick={() => handleCopyCitation(source.id, source.citation)}
                      className="text-[11px] font-semibold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1 cursor-pointer"
                      title="Salin Sitasi Resmi"
                    >
                      {copiedCitationId === source.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin Sitasi</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 italic leading-snug">
                    "{source.citation}"
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400">
                  Update Terakhir: <strong className="text-slate-600 dark:text-slate-300">{source.lastUpdated}</strong>
                </div>
                {source.officialUrl && (
                  <a
                    href={source.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline"
                  >
                    <span>{source.officialUrlLabel || 'Akses Dokumen Resmi'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW: MATRIX TABLE */}
      {activeView === 'matrix' && (
        <div className="bg-white dark:bg-[#0e1320] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-hidden space-y-4">
          <div>
            <h3 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">
              Matriks Pemetaan Fitur & Sumber Data Ilmiah
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Panduan transparansi pemanfaatan database medis untuk setiap modul klinis di FarmasiDruggist.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">Fitur / Modul Aplikasi</th>
                  <th className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">Sumber Primer & Penerbit</th>
                  <th className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">Standar & Parameter Klinis</th>
                  <th className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">Tingkat Evidens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {FEATURE_EVIDENCE_MAPPING.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span>{row.feature}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      {row.primarySource}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {row.standards}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-900/60">
                        {row.evidenceLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EDITORIAL POLICY & DISCLAIMER */}
      <div className="bg-slate-50 dark:bg-[#0e1320] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-outfit text-slate-900 dark:text-white">
              Kebijakan Tata Kelola Data & Disclaimer Medis
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Prinsip integritas kurasi ilmiah FarmasiDruggist untuk apoteker dan tenaga medis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
          <div className="p-4 bg-white dark:bg-[#0b0f19] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-2">
            <strong className="text-slate-900 dark:text-white flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              1. Prinsip Kurasi Ilmiah Independen
            </strong>
            <p>
              Data farmakoterapi tidak dihasilkan melalui inferensi acak, melainkan diekstraksi secara presisi dari literatur baku, pedoman PNPK Kemenkes RI, dan jurnal bereputasi tinggi. Database diperbarui berkala setiap ada adendum/revisi pedoman organisasi profesi.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-[#0b0f19] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-2">
            <strong className="text-slate-900 dark:text-white flex items-center gap-1.5 font-semibold">
              <Info className="w-4 h-4 text-amber-500" />
              2. Pendukung Keputusan Klinis (CDSS)
            </strong>
            <p>
              Sistem ini dirancang sebagai alat bantu komputasi dan penapisan cepat (*Clinical Decision Support*). Pertimbangan profesional apoteker, dokter spesialis, kondisi klinis individual pasien, serta hasil laboratorium tetap memegang peranan utama dalam keputusan peresepan akhir.
            </p>
          </div>
        </div>
      </div>

      {/* MODAL USULAN PEMBARUAN PEDOMAN / FEEDBACK */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0e1320] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">
                  Usulkan Pembaruan / Koreksi Literatur
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Menemukan pedoman atau regulasi baru yang belum tercantum? Bantu kami memperbarui database.
                </p>
              </div>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {feedbackSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Terima Kasih atas Masukan Anda!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Usulan pembaruan telah dicatat dan akan ditinjau oleh tim kurasi klinis kami.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nama & Profesi
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Nama Lengkap"
                      value={feedbackData.name}
                      onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                      className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
                    />
                    <select
                      value={feedbackData.profession}
                      onChange={(e) => setFeedbackData({ ...feedbackData, profession: e.target.value })}
                      className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
                    >
                      <option value="Apoteker">Apoteker (apt.)</option>
                      <option value="Dokter Spesialis">Dokter Spesialis (Sp.)</option>
                      <option value="Dokter Umum">Dokter Umum (dr.)</option>
                      <option value="TTK / Asisten Apoteker">Tenaga Vokasi / TTK</option>
                      <option value="Mahasiswa Farmasi">Mahasiswa Farmasi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Pedoman / Regulasi yang Diusulkan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Konsensus PERKI Sindrom Koroner Akut 2024"
                    value={feedbackData.sourceName}
                    onChange={(e) => setFeedbackData({ ...feedbackData, sourceName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Rincian Pembaruan / Catatan Koreksi
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Jelaskan perubahan dosis, algoritma terapi, atau interaksi obat yang perlu diperbarui..."
                    value={feedbackData.proposedUpdate}
                    onChange={(e) => setFeedbackData({ ...feedbackData, proposedUpdate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tautan Dokumen / Jurnal Resmi (Opsional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://kemkes.go.id/... atau https://inaheart.org/..."
                    value={feedbackData.referenceLink}
                    onChange={(e) => setFeedbackData({ ...feedbackData, referenceLink: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Usulan</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
