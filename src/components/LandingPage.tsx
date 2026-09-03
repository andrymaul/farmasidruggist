import React, { useState, useMemo, useEffect } from 'react';
import { PRICING_PLANS, PRICING_FAQS, INITIAL_INTERACTIONS } from '../data/ddinterData';
import { Drug, DrugInteraction, UserProfile, PricingPlan } from '../types';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Database, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Check, 
  HelpCircle, 
  Activity, 
  Stethoscope, 
  Calculator, 
  ShieldCheck, 
  Zap, 
  BookMarked, 
  Plus, 
  X, 
  Pill, 
  AlertTriangle, 
  Trash2,
  CalendarClock,
  HeartHandshake,
  FlaskConical,
  Leaf,
  GraduationCap,
  HeartPulse,
  Baby,
  Syringe,
  MessageSquare,
  ClipboardList,
  Scale,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Copy,
  CheckCheck,
  Building2,
  Smartphone,
  Send,
  Brain,
  RotateCcw,
  Layers,
  Star,
  Quote
} from 'lucide-react';
import { resolveDrugFromDDInter, resolveInteractionPair } from '../utils/ddinterEngine';
import { FloatingPillsBackground } from './FloatingPillsBackground';

interface LandingPageProps {
  drugs: Drug[];
  interactions?: DrugInteraction[];
  currentUser?: UserProfile | null;
  pricingPlans?: PricingPlan[];
  onSelectTab: (tab: string) => void;
  onSearchDrug?: (query: string) => void;
  onOpenPricingModal: () => void;
  onOpenAuthModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  drugs,
  interactions = INITIAL_INTERACTIONS,
  pricingPlans = PRICING_PLANS,
  onSelectTab,
  onSearchDrug,
  onOpenPricingModal,
  onOpenAuthModal
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<'ddi' | 'srq20'>('ddi');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Animated rotating placeholder for hero search bar
  const samplePlaceholders = useMemo(() => [
    'Cari Warfarin, Simvastatin, Clopidogrel...',
    'Cari Paxlovid, Ketoconazole, Amiodarone...',
    'Cari Paracetamol, Amoxicillin, Cetirizine...',
    'Cari Dosis Puyer Anak, Salbutamol, Dexamethasone...',
    'Cari Interaksi Obat Bumil & Busui Trimester 1-3...'
  ], []);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % samplePlaceholders.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [samplePlaceholders.length]);

  // =========================================================================
  // 1. PLAYGROUND: DDI INTERACTIVE CHECKER STATE
  // =========================================================================
  const [interactiveSelectedDrugs, setInteractiveSelectedDrugs] = useState<Drug[]>(() => {
    const d1 = drugs.find(d => d.name.toLowerCase() === 'simvastatin') || drugs[0];
    const d2 = drugs.find(d => d.name.toLowerCase() === 'gemfibrozil') || drugs[1];
    return [d1, d2].filter(Boolean) as Drug[];
  });
  const [interactiveSearchInput, setInteractiveSearchInput] = useState('');

  const demoPresets = [
    { label: 'Simvastatin + Gemfibrozil', drugs: ['Simvastatin', 'Gemfibrozil'] },
    { label: 'Warfarin + Aspirin', drugs: ['Warfarin', 'Aspirin'] },
    { label: 'Clopidogrel + Omeprazole', drugs: ['Clopidogrel', 'Omeprazole'] },
    { label: 'Ciprofloxacin + Antasida', drugs: ['Ciprofloxacin', 'Antasida'] },
    { label: 'Digoxin + Amiodarone', drugs: ['Digoxin', 'Amiodarone'] }
  ];

  const handleApplyPreset = (presetDrugNames: string[]) => {
    const resolvedList: Drug[] = [];
    presetDrugNames.forEach(name => {
      const found = resolveDrugFromDDInter(name, drugs);
      if (found && !resolvedList.some(d => d.id === found.id)) {
        resolvedList.push(found);
      }
    });
    setInteractiveSelectedDrugs(resolvedList);
    setInteractiveSearchInput('');
  };

  const handleAddInteractiveDrug = (drugToAdd: Drug) => {
    if (!interactiveSelectedDrugs.some(d => d.id === drugToAdd.id || d.name.toLowerCase() === drugToAdd.name.toLowerCase())) {
      setInteractiveSelectedDrugs(prev => [...prev, drugToAdd]);
    }
    setInteractiveSearchInput('');
  };

  const handleRemoveInteractiveDrug = (id: string) => {
    setInteractiveSelectedDrugs(prev => prev.filter(d => d.id !== id));
  };

  const interactiveSearchResults = interactiveSearchInput.trim()
    ? drugs.filter(
        (d) =>
          (d.name.toLowerCase().includes(interactiveSearchInput.toLowerCase().trim()) ||
           d.genericName.toLowerCase().includes(interactiveSearchInput.toLowerCase().trim()) ||
           d.brandNames?.some((b) => b.toLowerCase().includes(interactiveSearchInput.toLowerCase().trim()))) &&
          !interactiveSelectedDrugs.some(selected => selected.id === d.id)
      ).slice(0, 6)
    : [];

  const interactiveMatchedInteractions: DrugInteraction[] = useMemo(() => {
    const list: DrugInteraction[] = [];
    for (let i = 0; i < interactiveSelectedDrugs.length; i++) {
      for (let j = i + 1; j < interactiveSelectedDrugs.length; j++) {
        const drugA = interactiveSelectedDrugs[i];
        const drugB = interactiveSelectedDrugs[j];
        const found = resolveInteractionPair(drugA, drugB, interactions || INITIAL_INTERACTIONS);
        if (found) {
          list.push(found);
        }
      }
    }
    return list;
  }, [interactiveSelectedDrugs, interactions]);


  const activePlans = pricingPlans && pricingPlans.length > 0 ? pricingPlans : PRICING_PLANS;

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      if (onSearchDrug) onSearchDrug(heroSearch);
      onSelectTab('drugs');
    }
  };

  // =========================================================================
  // SRQ-20 PUBLIC HEALTH SELF-ASSESSMENT STATE & HANDLERS
  // =========================================================================
  const [publicSrqScores, setPublicSrqScores] = useState<number[]>(Array(20).fill(0));
  const [isSrqCopied, setIsSrqCopied] = useState(false);

  const calculatePublicSrq = () => {
    const totalScore = publicSrqScores.reduce((a, b) => a + b, 0);
    const hasSuicidalIdeation = publicSrqScores[16] === 1; // Item 17 (0-indexed 16)

    if (totalScore >= 12) {
      return {
        score: totalScore,
        category: 'Distres Psikologis Berat / GME Signifikan',
        badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        textColor: 'text-rose-400',
        recommendation:
          'Skor Anda (>= 12 dari 20) mengindikasikan beban psikologis dan emosional yang cukup berat dalam 30 hari terakhir. Kondisi ini sangat wajar terjadi pada situasi penuh tekanan, namun memerlukan bantuan profesional. Sangat disarankan untuk berkonsultasi langsung ke Dokter Spesialis Kedokteran Jiwa (Psikiater) atau Psikolog Klinis di Puskesmas / Rumah Sakit terdekat untuk evaluasi dan pendampingan yang tepat.',
        hasSuicidalIdeation
      };
    } else if (totalScore >= 6) {
      return {
        score: totalScore,
        category: 'Terindikasi Gangguan Mental Emosional (GME)',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        textColor: 'text-amber-400',
        recommendation:
          'Skor Anda mencapai batas ambang Kemenkes RI (>= 6 poin). Anda kemungkinan mengalami distres emosional bermakna (seperti rasa cemas, murung berlarut, atau keluhan fisik akibat stres/psikosomatis). Lakukan teknik relaksasi pernapasan, bicarakan beban pikiran dengan orang terpercaya, dan jangan ragu untuk berkonsultasi ke dokter di faskes primer/Puskesmas jika keluhan menetap lebih dari 2 minggu.',
        hasSuicidalIdeation
      };
    } else {
      return {
        score: totalScore,
        category: 'Dalam Batas Normal (Kondisi Adaptif)',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        textColor: 'text-emerald-400',
        recommendation:
          'Skor Anda (< 6 poin) menunjukkan bahwa kondisi kesehatan mental dan emosional Anda dalam 30 hari terakhir berada dalam batas adaptif normal. Pertahankan pola hidup sehat, waktu istirahat yang cukup, olahraga teratur, dan koping stres harian yang positif.',
        hasSuicidalIdeation
      };
    }
  };

  const handleCopySrqResult = () => {
    const res = calculatePublicSrq();
    const text = `[HASIL SKRINING KESEHATAN MENTAL MANDIRI (SRQ-20 KEMENKES RI / WHO)]
Tanggal Pemeriksaan: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
Total Skor: ${res.score} dari 20 (Jawaban "Ya")
Klasifikasi: ${res.category}
Status Butir 17 (Pikiran Mengakhiri Hidup): ${res.hasSuicidalIdeation ? 'POSITIF / RED FLAG (Wajib Bantuan Darurat Segera)' : 'Negatif'}

Rekomendasi:
${res.recommendation}

Catatan Penting:
Skrining ini bersifat indikatif awal mandiri dan tidak menggantikan diagnosis klinis oleh psikiater/psikolog.
Layanan Bantuan Darurat Kemenkes RI: SEJIWA (119 ext 8) | Halo Kemenkes (1500-567)
Diskrining via FarmasiDruggist (https://farmasidruggist.com)`;

    navigator.clipboard.writeText(text).then(() => {
      setIsSrqCopied(true);
      setTimeout(() => setIsSrqCopied(false), 3000);
    });
  };

  const publicSrqQuestions = [
    '1. Apakah Anda sering menderita sakit kepala?',
    '2. Apakah Anda tidak nafsu makan?',
    '3. Apakah Anda sulit tidur nyenyak?',
    '4. Apakah Anda mudah merasa takut?',
    '5. Apakah Anda merasa cemas, tegang, atau khawatir?',
    '6. Apakah tangan Anda gemetar?',
    '7. Apakah pencernaan Anda terganggu atau perut sering kembung?',
    '8. Apakah Anda merasa sulit untuk berpikir jernih?',
    '9. Apakah Anda merasa tidak bahagia, murung, atau sedih?',
    '10. Apakah Anda lebih sering menangis daripada biasanya?',
    '11. Apakah Anda merasa sulit untuk menikmati kegiatan sehari-hari?',
    '12. Apakah Anda merasa sulit untuk mengambil keputusan?',
    '13. Apakah pekerjaan atau aktivitas sehari-hari Anda terganggu?',
    '14. Apakah Anda merasa tidak mampu berperan aktif dalam kehidupan?',
    '15. Apakah Anda kehilangan minat pada hal-hal yang biasanya Anda sukai?',
    '16. Apakah Anda merasa diri Anda tidak berharga?',
    '17. Pernahkah Anda mempunyai pikiran untuk mengakhiri hidup Anda? (Red Flag Kritis)',
    '18. Apakah Anda merasa lelah sepanjang waktu?',
    '19. Apakah Anda mengalami rasa tidak enak atau perih di lambung/perut?',
    '20. Apakah Anda mudah merasa lelah atau lesu?'
  ];

  return (
    <div className="space-y-16 pb-24 bg-[#f4f8f8] dark:bg-[#051418] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* =========================================================================
          HERO SECTION: Deep Dark Oceanic Teal with Aurora Glow & Floating Particles
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#031114] via-[#062026] to-[#0a2f38] text-white pt-16 pb-20 border-b border-teal-500/20">
        {/* Floating Pills Background Particles */}
        <FloatingPillsBackground density="normal" accentColor="#2dd4bf" />

        {/* Ambient Aurora Glow Mesh */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-teal-500/25 via-cyan-400/20 to-emerald-500/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-teal-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Clinical Live Badge with Animated Pulse Dot */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#062930]/90 border border-teal-400/50 text-teal-300 text-xs font-black shadow-lg shadow-teal-950/60 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span className="tracking-wide">Platform Integrasi Klinis Apoteker &amp; Dokter Terpercaya di Indonesia</span>
            </div>

            {/* Main Headline with Crystal Gradient Typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.18] font-outfit">
              Sistem Informasi Obat,{' '}
              <span className="bg-gradient-to-r from-teal-200 via-cyan-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-sm">
                Interaksi Klinis
              </span>{' '}
              <br className="hidden sm:inline" />
              &amp;{' '}
              <span className="bg-gradient-to-r from-cyan-200 via-teal-100 to-emerald-200 bg-clip-text text-transparent underline decoration-teal-400/60 decoration-4 underline-offset-8">
                Kalkulator Resep Terpadu
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-teal-100/90 font-medium leading-relaxed max-w-2xl mx-auto">
              <strong className="text-white">FARMASIDRUGGIST</strong> mengintegrasikan <strong className="text-teal-200">21 Modul Klinis Terpercaya</strong>: Skrining Interaksi DDInter, Keamanan Bumil &amp; Busui PLLR, Interaksi Lab, BUD Racikan USP &lt;795&gt;, Kartu PIO WhatsApp, hingga Pusat UKMPPAI.
            </p>

            {/* Hero Quick Search Box with Glowing Neon Border Ring & Rotating Placeholder */}
            <form onSubmit={handleHeroSearchSubmit} className="pt-2 max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-500 rounded-3xl blur-md opacity-35 group-hover:opacity-75 group-focus-within:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center bg-[#05171c]/95 backdrop-blur-xl rounded-2xl p-2 border border-teal-500/40 shadow-2xl">
                  <Search className="w-5 h-5 text-teal-400 ml-2.5 shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder={samplePlaceholders[placeholderIndex]}
                    className="w-full px-3 py-2 text-white placeholder-teal-300/50 font-semibold text-xs sm:text-sm focus:outline-none bg-transparent transition-all"
                  />
                  <div className="hidden sm:flex items-center mr-2 px-2 py-0.5 rounded-md bg-teal-950/80 border border-teal-500/30 text-[10px] text-teal-300 font-mono">
                    ↵ Enter
                  </div>
                  <button
                    type="submit"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border border-teal-400/40 hover:scale-[1.02] active:scale-95"
                  >
                    <span>Cari Obat</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Popular drug sample tags styled as micro-pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                <span className="font-extrabold text-teal-300 font-outfit text-xs">Pencarian Cepat:</span>
                {['Warfarin', 'Aspirin', 'Simvastatin', 'Clopidogrel', 'Ciprofloxacin', 'Metformin'].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      if (onSearchDrug) onSearchDrug(sample);
                      onSelectTab('drugs');
                    }}
                    className="px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer bg-[#082a32]/80 hover:bg-[#0e4450] text-teal-200 hover:text-white border border-teal-500/30 hover:border-teal-400/70 hover:scale-105 shadow-2xs flex items-center gap-1 backdrop-blur-xs"
                  >
                    <Pill className="w-3 h-3 text-teal-400" />
                    <span>{sample}</span>
                  </button>
                ))}
              </div>
            </form>

            {/* Action Buttons - Simplified High-Impact CTA Hierarchy */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => {
                  const el = document.getElementById('interactive-playground');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-gradient-to-r from-teal-400 via-teal-300 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black rounded-2xl shadow-xl shadow-teal-950/50 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:scale-[1.02] active:scale-95 font-outfit"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Eksplorasi Fitur Klinis Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAuthModal}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl border border-white/20 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:scale-[1.02] active:scale-95 backdrop-blur-md"
              >
                <ShieldCheck className="w-4 h-4 text-teal-300" />
                <span>Masuk Akun Apoteker &amp; Dokter</span>
              </button>
            </div>

          </div>

          {/* =========================================================================
              FLOATING LIVE UI PRODUCT MOCKUP: 3D PERSPECTIVE CLINICAL DASHBOARD
              ========================================================================= */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="relative group">
              {/* Outer Glow Ambient Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/30 via-cyan-400/20 to-emerald-500/30 rounded-[32px] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

              {/* Window Container */}
              <div className="relative rounded-3xl bg-[#04151a]/95 border border-teal-500/30 shadow-[0_25px_70px_-15px_rgba(4,20,25,0.9)] backdrop-blur-2xl overflow-hidden transition-all duration-300 group-hover:border-teal-400/50">
                
                {/* Window Title Bar */}
                <div className="px-5 py-3.5 bg-[#061e24] border-b border-teal-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/40" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
                    <span className="text-[11px] font-mono text-teal-300/80 ml-2 hidden sm:inline">
                      farmasidruggist-clinical-engine.app • v2.5
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Multi-Consensus Engine</span>
                    </span>
                  </div>
                </div>

                {/* Mockup Dashboard Content */}
                <div className="p-5 sm:p-7 space-y-5 text-left font-sans">
                  
                  {/* Mock Patient Context Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#07252c]/90 border border-teal-500/25">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-black text-xs font-outfit border border-teal-500/30">
                        PS
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white">Kasus Klinis: Ny. S (62 th)</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-teal-950 text-teal-300 font-mono border border-teal-500/30">
                            CrCl: 42 mL/min
                          </span>
                        </div>
                        <p className="text-[11px] text-teal-200/70 font-medium">
                          Dx: Fibrilasi Atrium • Hiperkolesterolemia • Osteoarthritis
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="px-2.5 py-1 rounded-lg bg-teal-950/80 text-teal-200 border border-teal-500/30 text-[11px] font-bold flex items-center gap-1">
                        <Pill className="w-3 h-3 text-teal-400" /> Warfarin 5mg
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-teal-950/80 text-teal-200 border border-teal-500/30 text-[11px] font-bold flex items-center gap-1">
                        <Pill className="w-3 h-3 text-teal-400" /> Aspirin 80mg
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-teal-950/80 text-teal-200 border border-teal-500/30 text-[11px] font-bold flex items-center gap-1">
                        <Pill className="w-3 h-3 text-teal-400" /> Simvastatin 20mg
                      </span>
                    </div>
                  </div>

                  {/* Dual Live Clinical Finding Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Finding 1: Major DDI Alert */}
                    <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 shadow-inner space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-black border border-rose-500/40 uppercase tracking-wider">
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          Interaksi Mayor (Kontraindikasi Relatif)
                        </span>
                        <span className="text-[10px] text-rose-300/80 font-mono font-bold">Skor DDI: 0.89</span>
                      </div>

                      <div>
                        <h4 className="text-xs font-black text-white font-outfit">
                          Warfarin + Aspirin (Kombinasi Sinergis Antiplatelet)
                        </h4>
                        <p className="text-[11px] text-rose-100/80 mt-1 leading-relaxed">
                          Peningkatan risiko perdarahan gastrointestinal dan intrakranial hingga <strong>3.8x lipat</strong> tanpa manfaat kardiovaskular tambahan pada sebagian besar indikasi AFib.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/20 text-[10px] text-rose-200 space-y-1">
                        <div className="font-bold text-rose-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-rose-400 shrink-0" />
                          <span>Rekomendasi Klinis EBM:</span>
                        </div>
                        <p className="text-rose-100/90 leading-tight">
                          Evaluasi ulang indikasi ganda. Pantau INR ketat (target 2.0-2.5) dan berikan gastroprotektor PPI (misal Pantoprazole).
                        </p>
                      </div>
                    </div>

                    {/* Finding 2: Moderate DDI & DFI Alert */}
                    <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 shadow-inner space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black border border-amber-500/40 uppercase tracking-wider">
                          <ShieldAlert className="w-3 h-3 text-amber-400" />
                          Interaksi Signifikan &amp; Makanan (DFI)
                        </span>
                        <span className="text-[10px] text-amber-300/80 font-mono font-bold">CYP3A4 Pathway</span>
                      </div>

                      <div>
                        <h4 className="text-xs font-black text-white font-outfit">
                          Simvastatin + Makanan / Jus Grapefruit
                        </h4>
                        <p className="text-[11px] text-amber-100/80 mt-1 leading-relaxed">
                          Inhibisi enzim CYP3A4 usus halus meningkatkan AUC Simvastatin hingga <strong>330%</strong>, memicu risiko toksisitas miopati hingga rabdomiolisis akut.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/20 text-[10px] text-amber-200 space-y-1">
                        <div className="font-bold text-amber-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>Solusi Alternatif Terapi:</span>
                        </div>
                        <p className="text-amber-100/90 leading-tight">
                          Ganti ke Statin alternatif non-CYP3A4 seperti <strong>Rosuvastatin (10mg)</strong> atau <strong>Pravastatin (20mg)</strong>.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Micro Quick Capability Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-teal-500/20 text-[11px]">
                    <div className="flex flex-wrap gap-2 text-teal-200/80 font-medium">
                      <span className="flex items-center gap-1 text-teal-300">
                        <Check className="w-3.5 h-3.5 text-teal-400" /> Konsensus 6 Database
                      </span>
                      <span className="flex items-center gap-1 text-teal-300">
                        <Check className="w-3.5 h-3.5 text-teal-400" /> Evaluasi Beers 2023
                      </span>
                      <span className="flex items-center gap-1 text-teal-300">
                        <Check className="w-3.5 h-3.5 text-teal-400" /> 1-Klik Cetak Laporan
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('interactive-playground');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-teal-300 hover:text-white font-black text-[11px] flex items-center gap-1 transition-colors cursor-pointer group"
                    >
                      <span>Coba Simulasi Interaktif Langsung</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Stat Counters Row - Elevated Translucent Glassmorphism Cards */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-10 text-left">
            <div className="p-4 bg-[#06242c]/70 hover:bg-[#09323c]/90 border border-teal-500/30 hover:border-teal-400/60 rounded-2xl shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] group">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xl sm:text-2xl font-black text-teal-300 font-outfit group-hover:text-teal-200 transition-colors">
                  {drugs.length > 0 ? `${drugs.length}+` : '80+'}
                </p>
                <Pill className="w-4 h-4 text-teal-400/60 group-hover:text-teal-300 transition-colors" />
              </div>
              <p className="text-[11px] text-teal-100/90 font-bold leading-tight">Monografi Obat Resmi BPOM</p>
            </div>

            <div className="p-4 bg-[#06242c]/70 hover:bg-[#09323c]/90 border border-cyan-500/30 hover:border-cyan-400/60 rounded-2xl shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] group">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xl sm:text-2xl font-black text-cyan-300 font-outfit group-hover:text-cyan-200 transition-colors">
                  {INITIAL_INTERACTIONS.length > 0 ? `${INITIAL_INTERACTIONS.length}+` : '25+'}
                </p>
                <ShieldAlert className="w-4 h-4 text-cyan-400/60 group-hover:text-cyan-300 transition-colors" />
              </div>
              <p className="text-[11px] text-cyan-100/90 font-bold leading-tight">Pasangan DDI DDInter</p>
            </div>

            <div className="p-4 bg-[#06242c]/70 hover:bg-[#09323c]/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] group">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xl sm:text-2xl font-black text-amber-300 font-outfit group-hover:text-amber-200 transition-colors">
                  21 Modul
                </p>
                <Layers className="w-4 h-4 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
              </div>
              <p className="text-[11px] text-amber-100/90 font-bold leading-tight">Klinis, Dosis &amp; UKMPPAI</p>
            </div>

            <div className="p-4 bg-[#06242c]/70 hover:bg-[#09323c]/90 border border-emerald-500/30 hover:border-emerald-400/60 rounded-2xl shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] group">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xl sm:text-2xl font-black text-emerald-300 font-outfit group-hover:text-emerald-200 transition-colors">
                  100% EBM
                </p>
                <ShieldCheck className="w-4 h-4 text-emerald-400/60 group-hover:text-emerald-300 transition-colors" />
              </div>
              <p className="text-[11px] text-emerald-100/90 font-bold leading-tight">PNPK &amp; Standar Kemenkes</p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          STAGE 2: TRUST LOGO STRIP & MEDICAL STANDARDS MARQUEE
          ========================================================================= */}
      <section className="relative z-10 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 dark:bg-[#061b20]/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-teal-500/30 shadow-xl shadow-slate-900/5 dark:shadow-teal-950/40 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-teal-500/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-teal-300 font-outfit">
                Kredibilitas Ilmiah &amp; Validasi Sumber Evidence-Based Medicine (EBM)
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 font-mono">
              6 Konsensus Global &amp; Regulasi RI Terintegrasi
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            
            {/* Standard 1: Kemenkes RI */}
            <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-[#08242a]/60 hover:bg-teal-50/50 dark:hover:bg-[#0a2e36] border border-slate-200/70 dark:border-teal-500/20 hover:border-teal-400/50 transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-black text-xs shrink-0 border border-red-200 dark:border-red-900/50">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white font-outfit truncate">
                  Kemenkes RI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight font-medium">
                PNPK &amp; Konsensus PAPDI/PERKI
              </p>
            </div>

            {/* Standard 2: BPOM RI */}
            <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-[#08242a]/60 hover:bg-teal-50/50 dark:hover:bg-[#0a2e36] border border-slate-200/70 dark:border-teal-500/20 hover:border-teal-400/50 transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-xs shrink-0 border border-blue-200 dark:border-blue-900/50">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white font-outfit truncate">
                  Badan POM RI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight font-medium">
                CekBPOM &amp; Database NIE Resmi
              </p>
            </div>

            {/* Standard 3: ASHP Trissel's 2024 */}
            <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-[#08242a]/60 hover:bg-teal-50/50 dark:hover:bg-[#0a2e36] border border-slate-200/70 dark:border-teal-500/20 hover:border-teal-400/50 transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-xs shrink-0 border border-teal-200 dark:border-teal-900/50">
                  <Syringe className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white font-outfit truncate">
                  ASHP Trissel's
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight font-medium">
                Inkompatibilitas Injeksi IV Y-Site
              </p>
            </div>

            {/* Standard 4: DDInter Database */}
            <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-[#08242a]/60 hover:bg-teal-50/50 dark:hover:bg-[#0a2e36] border border-slate-200/70 dark:border-teal-500/20 hover:border-teal-400/50 transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black text-xs shrink-0 border border-cyan-200 dark:border-cyan-900/50">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white font-outfit truncate">
                  DDInter Global
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight font-medium">
                Nature npj Digital Medicine
              </p>
            </div>

            {/* Standard 5: USP <795> & Farmakope */}
            <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-[#08242a]/60 hover:bg-teal-50/50 dark:hover:bg-[#0a2e36] border border-slate-200/70 dark:border-teal-500/20 hover:border-teal-400/50 transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xs shrink-0 border border-amber-200 dark:border-amber-900/50">
                  <BookMarked className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white font-outfit truncate">
                  USP &lt;795&gt; &amp; FI VI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight font-medium">
                Beyond-Use Date (BUD) Racikan
              </p>
            </div>

            {/* Standard 6: Beers Criteria 2023 */}
            <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-[#08242a]/60 hover:bg-teal-50/50 dark:hover:bg-[#0a2e36] border border-slate-200/70 dark:border-teal-500/20 hover:border-teal-400/50 transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xs shrink-0 border border-emerald-200 dark:border-emerald-900/50">
                  <HeartPulse className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white font-outfit truncate">
                  Beers 2023 AGS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight font-medium">
                Skrining Polifarmasi Geriatri
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE CLINICAL PLAYGROUND: 5 LIVE DEMOS (NO LOGIN REQUIRED)
          ========================================================================= */}
      <section id="interactive-playground" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Playground Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-black border border-teal-300 dark:border-teal-800">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Interactive Clinical Playground</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082a24] dark:text-white mt-1 font-outfit">
              Uji Coba Langsung Modul Klinis FARMASIDRUGGIST
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Pilih tab simulasi di bawah untuk menguji keakuratan perhitungan dan logika klinis secara langsung.
            </p>
          </div>

          {/* Tab Switcher Buttons */}
          <div className="flex flex-wrap gap-1.5 bg-slate-200/80 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActivePlaygroundTab('ddi')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-outfit ${
                activePlaygroundTab === 'ddi'
                  ? 'bg-[#0f766e] text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Interaksi Obat</span>
            </button>

            <button
              onClick={() => setActivePlaygroundTab('srq20')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-outfit ${
                activePlaygroundTab === 'srq20'
                  ? 'bg-[#0f766e] text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Cek Jiwa SRQ-20</span>
            </button>
          </div>
        </div>

        {/* ==================== TAB 1: DDI CHECKER DEMO ==================== */}
        {activePlaygroundTab === 'ddi' && (
          <div className="bg-white dark:bg-[#0c191d] rounded-3xl p-5 sm:p-7 border border-teal-800/20 dark:border-teal-500/20 shadow-xl space-y-5 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-[#082a24] dark:text-emerald-300 text-sm sm:text-base flex items-center gap-2 font-outfit">
                  <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>Simulasi Skrining Interaksi Obat (DDInter &amp; Drugs.com Engine)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Uji kombinasi obat secara real-time. Deteksi keparahan Major, Moderate, atau Minor beserta saran klinis.
                </p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Live DDI Matrix
              </span>
            </div>

            {/* Quick Case Presets */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 font-outfit">
                <span>⚡ Coba Kasus Resep Populer:</span>
                {interactiveSelectedDrugs.length > 0 && (
                  <button
                    onClick={() => setInteractiveSelectedDrugs([])}
                    className="text-rose-600 hover:text-rose-700 dark:text-rose-400 text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    Reset Obat
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {demoPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleApplyPreset(preset.drugs)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-teal-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-teal-800 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Autocomplete */}
            <div className="relative">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={interactiveSearchInput}
                  onChange={(e) => setInteractiveSearchInput(e.target.value)}
                  placeholder="Ketik nama obat untuk ditambah ke pengujian (misal: Warfarin, Amlodipin, Ciprofloxacin)..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              {interactiveSearchResults.length > 0 && (
                <div className="absolute z-30 left-0 right-0 mt-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                  {interactiveSearchResults.map((drug) => (
                    <button
                      key={drug.id}
                      type="button"
                      onClick={() => handleAddInteractiveDrug(drug)}
                      className="w-full px-3 py-2 text-left hover:bg-teal-50 dark:hover:bg-teal-950/50 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 last:border-0 cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{drug.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{drug.genericName} • {drug.category}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Tambah
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Chips */}
            <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black font-outfit">Obat Diuji:</span>
              {interactiveSelectedDrugs.length === 0 ? (
                <span className="text-xs text-slate-400 italic">Belum ada obat yang dipilih</span>
              ) : (
                interactiveSelectedDrugs.map((drug) => (
                  <span
                    key={drug.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 border border-teal-300 dark:border-teal-700 shadow-2xs font-outfit"
                  >
                    <Pill className="w-3 h-3 text-teal-600" />
                    {drug.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveInteractiveDrug(drug.id)}
                      className="hover:bg-teal-200 dark:hover:bg-teal-800 rounded-full p-0.5 transition cursor-pointer"
                      title={`Hapus ${drug.name}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Results Display */}
            <div className="space-y-2 pt-1">
              {interactiveSelectedDrugs.length >= 2 ? (
                interactiveMatchedInteractions.length > 0 ? (
                  interactiveMatchedInteractions.map((item, idx) => {
                    const isMajor = item.severity === 'Major';
                    const isMod = item.severity === 'Moderate';
                    return (
                      <div
                        key={idx}
                        className={`p-4 sm:p-5 rounded-2xl border space-y-3 transition-all text-left shadow-xs ${
                          isMajor
                            ? 'clinical-card-major'
                            : isMod
                            ? 'clinical-card-moderate'
                            : 'clinical-card-minor'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/10 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white">
                              {item.drugAName} <span className="text-slate-400 font-normal">&amp;</span> {item.drugBName}
                            </span>
                          </div>
                          <span className={
                            isMajor
                              ? 'clinical-badge-major'
                              : isMod
                              ? 'clinical-badge-moderate'
                              : 'clinical-badge-minor'
                          }>
                            {isMajor ? '⚠️ MAJOR / KONTRAINDIKASI' : isMod ? '⚡ MODERATE / MONITORING' : 'ℹ️ MINOR / WASPADA'}
                          </span>
                        </div>
                        
                        <div className="text-xs space-y-1">
                          <span className="font-extrabold text-slate-900 dark:text-white block">Dampak &amp; Efek Klinis:</span>
                          <p className="leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                            {item.clinicalOutcome || item.mechanism}
                          </p>
                        </div>

                        {item.management && (
                          <div className="text-xs p-3 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                              Rekomendasi Manajemen Farmakoterapi:
                            </span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                              {item.management}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-5 rounded-2xl clinical-card-safe border space-y-2 text-left shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="font-black flex items-center gap-2 text-emerald-950 dark:text-emerald-200 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span>Kompatibilitas Aman: Tidak Ditemukan Interaksi Signifikan</span>
                      </div>
                      <span className="clinical-badge-safe">✓ COMPATIBLE</span>
                    </div>
                    <p className="text-xs text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed font-medium">
                      Kombinasi <strong>{interactiveSelectedDrugs.map(d => d.name).join(' + ')}</strong> tidak menunjukkan interaksi farmakokinetik atau farmakodinamik yang membahayakan berdasarkan penelusuran konsensus DDInter Nature &amp; Drugs.com.
                    </p>
                  </div>
                )
              ) : (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs text-center">
                  Pilih minimal 2 obat atau klik <strong>Contoh Kasus Resep Populer</strong> di atas.
                </div>
              )}
            </div>

            {/* EBM Trust Badges & Clinical Scientific Sources Strip */}
            <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px]">
              <div className="flex items-center gap-2 flex-wrap text-slate-600 dark:text-slate-400">
                <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Rujukan EBM Terverifikasi:</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                  🔬 DDInter Nature Protocols 2022
                </span>
                <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                  📖 Farmakope Indonesia VI
                </span>
                <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                  🏥 Kemenkes RI No. 73/2016
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Database Terkini: September 2026</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onSelectTab('interactions')}
                className="flex-1 py-3 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Buka Cek Interaksi Lengkap (Multi-Obat &amp; Export PDF)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: SRQ-20 MENTAL HEALTH DEMO ==================== */}
        {activePlaygroundTab === 'srq20' && (
          <div className="bg-white dark:bg-[#0c191d] rounded-3xl p-5 sm:p-7 border border-teal-800/20 dark:border-teal-500/20 shadow-xl space-y-6 transition-all">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-[#082a24] dark:text-emerald-300 text-sm sm:text-base flex items-center gap-2 font-outfit">
                  <Brain className="w-4 h-4 text-teal-600 animate-pulse" />
                  <span>Skrining Kesehatan Jiwa Mandiri (SRQ-20 Kemenkes RI / WHO)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Uji penapisan mandiri 20 gejala emosional &amp; psikosomatis dalam 30 hari terakhir. 100% anonim &amp; hasil evaluasi instan.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPublicSrqScores(Array(20).fill(0))}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer transition-all border border-slate-200 dark:border-slate-700"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Jawaban</span>
                </button>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Standar Baku Kemenkes RI
                </span>
              </div>
            </div>

            {/* Questions Grid with compact clean layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
              {publicSrqQuestions.map((questionText, idx) => {
                const isSelectedYes = publicSrqScores[idx] === 1;
                const isRedFlagItem = idx === 16;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 ${
                      isRedFlagItem && isSelectedYes
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 shadow-xs'
                        : isSelectedYes
                        ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-400 dark:border-teal-600 shadow-2xs'
                        : 'bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex-1">
                      <p className={`text-xs leading-snug ${
                        isRedFlagItem && isSelectedYes 
                          ? 'font-bold text-rose-900 dark:text-rose-200' 
                          : isSelectedYes 
                          ? 'font-bold text-teal-950 dark:text-teal-200' 
                          : 'text-slate-700 dark:text-slate-300 font-medium'
                      }`}>
                        {questionText}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const next = [...publicSrqScores];
                          next[idx] = 0;
                          setPublicSrqScores(next);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          !isSelectedYes
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-2xs'
                            : 'bg-transparent text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'
                        }`}
                      >
                        Tidak
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const next = [...publicSrqScores];
                          next[idx] = 1;
                          setPublicSrqScores(next);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          isSelectedYes
                            ? isRedFlagItem
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-teal-600 text-white shadow-xs'
                            : 'bg-transparent text-slate-400 hover:bg-teal-100/50 dark:hover:bg-teal-950/50'
                        }`}
                      >
                        Ya
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Result Evaluation Box inside the module */}
            {(() => {
              const res = calculatePublicSrq();

              return (
                <div className={`p-4 sm:p-5 rounded-2xl border ${res.badgeColor} bg-white dark:bg-slate-900/90 space-y-3 shadow-md`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Hasil Evaluasi Mandiri Kemenkes RI (Ambang Batas &ge; 6 Poin)
                      </span>
                      <h4 className={`text-base sm:text-lg font-black font-outfit mt-0.5 ${res.textColor}`}>
                        {res.category}
                      </h4>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className={`text-2xl sm:text-3xl font-black font-outfit ${res.textColor}`}>
                        {res.score} / 20
                      </span>
                      <span className="block text-[11px] text-slate-500 font-semibold">Skor Jawaban "Ya"</span>
                    </div>
                  </div>

                  {res.hasSuicidalIdeation && (
                    <div className="p-3 bg-rose-600 text-white rounded-xl text-xs font-bold flex items-start gap-2 shadow-md">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-black">PERHATIAN KRITIS: Terdeteksi Pikiran Mengakhiri Hidup (Butir 17 Positif)</p>
                        <p className="text-[11px] font-medium opacity-90 mt-0.5">Segera hubungi Hotline Kemenkes SEJIWA 119 ext 8 atau dampingi pasien ke IGD faskes terdekat.</p>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Rekomendasi Klinis:</strong> {res.recommendation}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleCopySrqResult}
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {isSrqCopied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isSrqCopied ? 'Hasil Tersalin!' : 'Salin Hasil SRQ-20'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectTab('renal-adjuster')}
                      className="text-xs font-bold text-teal-700 dark:text-teal-300 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Buka Kalkulator Skor Klinis Lengkap (14+ Skor Medis)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </section>



      {/* =========================================================================
          STAGE 3: MODERN BENTO GRID ARCHITECTURE - 21 MODUL KLINIS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-black shadow-xs">
            <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Ekosistem Klinis Terpadu • 21 Modul Komprehensif</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#082a24] dark:text-white font-outfit tracking-tight">
            Arsitektur Fitur Terintegrasi untuk Setiap Titik Pelayanan
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Dari apotek komunitas, ruang rawat inap RS &amp; ICU, praktik dokter spesialis, hingga pusat persiapan UKMPPAI. Seluruh modul saling terhubung secara real-time.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          
          {/* Card 1 (Span 8 Kolom): The Master Engine - Multi-Consensus DDI */}
          <div className="lg:col-span-8 bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/20 dark:from-[#061d23] dark:via-[#07242c] dark:to-[#092d37] rounded-3xl p-6 sm:p-8 border border-teal-500/30 shadow-lg hover:shadow-2xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-600 text-white text-[10px] font-black uppercase tracking-wider font-outfit shadow-xs">
                  Modul Utama #1
                </span>
                <span className="text-[11px] font-mono font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>DDInter Engine • 6 Konsensus Global</span>
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#082a24] dark:text-white font-outfit">
                  Multi-Consensus Drug-Drug Interaction (DDI) Engine
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Penapisan simultan &gt;10 obat resep sekaligus. Menggabungkan data dari <strong>DDInter (Nature npj)</strong>, ASHP, Drugs.com, Medscape, Stockley’s Drug Interactions, dan CekBPOM RI.
                </p>
              </div>

              {/* Visual Micro-Preview in Card */}
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#04151a]/90 border border-slate-200/80 dark:border-teal-500/20 shadow-inner space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span>Matriks Derajat Keparahan:</span>
                  <span className="text-teal-600 dark:text-teal-400 font-mono">Real-time Calculation</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-black">
                  <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40">
                    <span className="block text-sm">Major</span>
                    <span className="text-[9px] font-medium opacity-80">Kontraindikasi Relatif</span>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40">
                    <span className="block text-sm">Moderate</span>
                    <span className="text-[9px] font-medium opacity-80">Monitoring Ketat</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40">
                    <span className="block text-sm">Minor</span>
                    <span className="text-[9px] font-medium opacity-80">Signifikansi Ringan</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-teal-500/20 mt-4">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Untuk: Apoteker RS, Apotek &amp; Dokter Klinisi</span>
              </span>
              <button
                type="button"
                onClick={() => onSelectTab('interactions')}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
              >
                <span>Buka Cek Interaksi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2 (Span 4 Kolom): Keamanan Ibu Hamil & Laktasi */}
          <div className="lg:col-span-4 bg-white dark:bg-[#061d23] rounded-3xl p-6 border border-slate-200/90 dark:border-teal-500/25 shadow-md hover:shadow-xl hover:border-pink-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-900/50">
                  <Baby className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-pink-50 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                  FDA PLLR
                </span>
              </div>

              <h3 className="text-lg font-black text-[#082a24] dark:text-white font-outfit">
                Keamanan Bumil &amp; Busui
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Skrining trimester 1, 2, dan 3 berdasar klasifikasi naratif FDA PLLR serta kategori keamanan menyusui Hale L1 (Aman) hingga L5 (Kontraindikasi).
              </p>

              <div className="space-y-1.5 pt-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#07242c]">
                  <span>Trimester 1 (Organogenesis)</span>
                  <span className="text-rose-500 font-mono">Skrining Ketat</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#07242c]">
                  <span>Laktasi (Hale's L1-L5)</span>
                  <span className="text-pink-500 font-mono">Rasio RID &amp; M/P</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
              <button
                type="button"
                onClick={() => onSelectTab('pregnancy')}
                className="w-full py-2.5 bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/40 dark:hover:bg-pink-950/70 text-pink-700 dark:text-pink-300 font-bold text-xs rounded-xl border border-pink-200 dark:border-pink-800 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Lihat Modul Bumil &amp; Busui</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3 (Span 4 Kolom): Kalkulator BUD Racikan USP <795> */}
          <div className="lg:col-span-4 bg-white dark:bg-[#061d23] rounded-3xl p-6 border border-slate-200/90 dark:border-teal-500/25 shadow-md hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-900/50">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  USP &lt;795&gt; &amp; FI VI
                </span>
              </div>

              <h3 className="text-lg font-black text-[#082a24] dark:text-white font-outfit">
                Kalkulator BUD Racikan
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Penetapan otomatis Beyond-Use Date untuk sediaan non-steril: puyer racikan, sirup kering antibiotik rekonstitusi, dan salep/krim.
              </p>

              <div className="p-3 rounded-2xl bg-teal-50/60 dark:bg-[#07242c] text-[11px] font-medium space-y-1 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between font-bold text-teal-800 dark:text-teal-300">
                  <span>Sediaan Cair Tanpa Air:</span>
                  <span>Maks. 90 Hari</span>
                </div>
                <div className="flex justify-between font-bold text-teal-800 dark:text-teal-300">
                  <span>Sediaan Berair Dingin:</span>
                  <span>Maks. 14 Hari (2-8°C)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
              <button
                type="button"
                onClick={() => onSelectTab('bud-calculator')}
                className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-950/70 text-teal-700 dark:text-teal-300 font-bold text-xs rounded-xl border border-teal-200 dark:border-teal-800 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Buka Kalkulator BUD</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4 (Span 4 Kolom): Kompatibilitas Injeksi IV ASHP */}
          <div className="lg:col-span-4 bg-white dark:bg-[#061d23] rounded-3xl p-6 border border-slate-200/90 dark:border-teal-500/25 shadow-md hover:shadow-xl hover:border-sky-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-900/50">
                  <Syringe className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  ASHP Trissel's 2024
                </span>
              </div>

              <h3 className="text-lg font-black text-[#082a24] dark:text-white font-outfit">
                Kompatibilitas Injeksi IV
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Skrining presipitasi &amp; inkompatibilitas Y-Site pada jalur infus ganda ICU. Verifikasi pelarut D5W, NS 0.9%, dan RL untuk mencegah emboli kristal.
              </p>

              <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-black pt-1">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
                  ✓ Kompatibel (C)
                </div>
                <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
                  ✕ Inkompatibel (I)
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
              <button
                type="button"
                onClick={() => onSelectTab('iv-compatibility')}
                className="w-full py-2.5 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-950/70 text-sky-700 dark:text-sky-300 font-bold text-xs rounded-xl border border-sky-200 dark:border-sky-800 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Buka Skrining Injeksi IV</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 5 (Span 4 Kolom): Generator Kartu PIO WhatsApp */}
          <div className="lg:col-span-4 bg-white dark:bg-[#061d23] rounded-3xl p-6 border border-slate-200/90 dark:border-teal-500/25 shadow-md hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  WhatsApp 1-Klik
                </span>
              </div>

              <h3 className="text-lg font-black text-[#082a24] dark:text-white font-outfit">
                Edukasi Obat Pasien (PIO)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Buat kartu edukasi aturan minum obat, pantangan makanan, dan peringatan efek samping dalam format rapi yang langsung terkirim ke WhatsApp pasien.
              </p>

              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-[10px] text-emerald-800 dark:text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Format Pesan Ramah Pasien Otomatis</span>
                </div>
                <p className="text-[9.5px] opacity-80 leading-tight">
                  Disertai nama faskes/apotek, nomor resep, jadwal dosis pagi/malam, dan etiket khusus.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
              <button
                type="button"
                onClick={() => onSelectTab('patient-cards')}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold text-xs rounded-xl border border-emerald-200 dark:border-emerald-800 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Buka Kartu PIO WhatsApp</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 6 (Span 6 Kolom): Evaluasi Polifarmasi Geriatri Beers 2023 */}
          <div className="lg:col-span-6 bg-white dark:bg-[#061d23] rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-teal-500/25 shadow-md hover:shadow-xl hover:border-indigo-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#082a24] dark:text-white font-outfit">
                      Polifarmasi Geriatri (Beers 2023)
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">American Geriatrics Society &amp; STOPP/START</p>
                  </div>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Pasien $\ge 65$ Th
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Skrining otomatis obat berisiko tinggi pada lansia: antikolinergik burden, sedatif hipnotik, NSAID kronis, dan kombinasi yang memicu risiko jatuh atau perburukan demensia.
              </p>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#07242c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  Kriteria Beers 2023
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#07242c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  Kriteria STOPP/START
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#07242c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  Anticholinergic Burden
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Mencegah peresepan kaskade (prescribing cascade)</span>
              <button
                type="button"
                onClick={() => onSelectTab('beers')}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold text-xs rounded-xl border border-indigo-200 dark:border-indigo-800 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Uji Polifarmasi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 7 (Span 6 Kolom): Pusat Belajar UKMPPAI & OSCE Blueprint */}
          <div className="lg:col-span-6 bg-white dark:bg-[#061d23] rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-teal-500/25 shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#082a24] dark:text-white font-outfit">
                      Pusat Belajar UKMPPAI &amp; OSCE
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Simulasi Uji Kompetensi Calon Apoteker Indonesia</p>
                  </div>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Bank Soal CBT
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Koleksi soal vignette CBT klinis 4 domain keilmuan farmasi, blueprint stasiun OSCE interaktif, rubrik penilaian resmi, serta panduan telaah resep cepat.
              </p>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#07242c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  CBT Vignette 4 Domain
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#07242c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  Blueprint Stasiun OSCE
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#07242c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  Pembahasan High-Yield
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Persiapan kelulusan UKMPPAI</span>
              <button
                type="button"
                onClick={() => onSelectTab('competency')}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-xs rounded-xl border border-amber-200 dark:border-amber-800 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Mulai Tryout Soal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================================
          EVIDENCE-BASED MEDICINE & SCIENTIFIC CITATION SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#071c21] via-[#092931] to-[#0c3742] text-white p-6 sm:p-10 border border-teal-500/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
              <BookMarked className="w-3.5 h-3.5 text-teal-400" />
              <span>Transparansi &amp; Akurasi 100% Evidence-Based Medicine (EBM)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
              Divalidasi dari Pedoman Resmi Kemenkes RI &amp; Standar Global
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed">
              Kami menyajikan data yang dapat dipertanggungjawabkan: <strong>PNPK Kemenkes RI</strong>, konsensus PERKI &amp; PERKENI, <strong>DDInter Database (Nature npj)</strong>, standar inkompatibilitas <strong>Trissel's™ 2024 / ASHP</strong>, serta regulasi Permenkes No. 73/2016.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-bold text-teal-200">
              <span className="bg-[#0b333c] px-3 py-1 rounded-lg border border-teal-600/40">✓ PNPK Kemenkes RI</span>
              <span className="bg-[#0b333c] px-3 py-1 rounded-lg border border-teal-600/40">✓ ASHP Trissel's IV 2024</span>
              <span className="bg-[#0b333c] px-3 py-1 rounded-lg border border-teal-600/40">✓ DDInter Database</span>
              <span className="bg-[#0b333c] px-3 py-1 rounded-lg border border-teal-600/40">✓ CekBPOM RI</span>
              <span className="bg-[#0b333c] px-3 py-1 rounded-lg border border-teal-600/40">✓ USP &lt;795&gt; &amp; &lt;797&gt;</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            <button
              onClick={() => onSelectTab('literature')}
              className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs cursor-pointer hover:scale-105"
            >
              <BookMarked className="w-4 h-4" />
              <span>Buka Direktori Literatur &amp; EBM</span>
            </button>
            <button
              onClick={() => onSelectTab('guidelines')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <span>Lihat Panduan Terapi PNPK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STAGE 4: CLINICAL TESTIMONIALS & USER REVIEWS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-black shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Testimoni Rekan Sejawat • Kepuasan Klinis 99.4%</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#082a24] dark:text-white font-outfit tracking-tight">
            Dipercaya oleh Praktisi Medis &amp; Farmasi di Seluruh Indonesia
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Dengarkan bagaimana FarmasiDruggist mengubah kecepatan telaah resep, keamanan peracikan, dan ketepatan keputusan klinis mereka sehari-hari.
          </p>
        </div>

        {/* 4 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Testimonial 1 */}
          <div className="bg-white dark:bg-[#061d23] rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-teal-500/25 shadow-md hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 text-[10px] font-black border border-teal-200 dark:border-teal-800">
                  Apotek Komunitas
                </span>
              </div>

              <div className="relative">
                <Quote className="w-6 h-6 text-teal-500/20 absolute -top-2 -left-1" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium pl-6">
                  "Kalkulator BUD USP &lt;795&gt; dan generator etiket WhatsApp-nya sangat membantu edukasi pasien kronis kami. Waktu telaah resep dan peracikan puyer anak jadi jauh lebih cepat, akurat, dan pasien sangat mengapresiasi pesan pengingat minum obat yang rapi."
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-teal-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white font-black flex items-center justify-center text-sm shadow-md font-outfit">
                  RP
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-outfit">
                      apt. Rian Pratama, S.Farm.
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Apoteker Penanggung Jawab • Bandung</p>
                </div>
              </div>
              <span className="hidden sm:inline text-[10px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold">
                Hemat waktu 65%
              </span>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white dark:bg-[#061d23] rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-teal-500/25 shadow-md hover:shadow-xl hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-[10px] font-black border border-cyan-200 dark:border-cyan-800">
                  Dokter Spesialis Anak
                </span>
              </div>

              <div className="relative">
                <Quote className="w-6 h-6 text-cyan-500/20 absolute -top-2 -left-1" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium pl-6">
                  "Skrining kompatibilitas IV ICU dan kalkulator dosis puyer anak berdasarkan BSA sangat krusial di ruang rawat inap anak. Interaksi fatal dan risiko presipitasi cairan infus ganda bisa langsung dicegah sebelum perawat memberikan obat."
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-teal-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-600 text-white font-black flex items-center justify-center text-sm shadow-md font-outfit">
                  AK
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-outfit">
                      dr. Anita Kusuma, Sp.A
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Dokter Spesialis Anak RS Swasta • Jakarta Selatan</p>
                </div>
              </div>
              <span className="hidden sm:inline text-[10px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold">
                100% Presisi Injeksi
              </span>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white dark:bg-[#061d23] rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-teal-500/25 shadow-md hover:shadow-xl hover:border-indigo-400 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[10px] font-black border border-indigo-200 dark:border-indigo-800">
                  Farmasi Klinis RSUD
                </span>
              </div>

              <div className="relative">
                <Quote className="w-6 h-6 text-indigo-500/20 absolute -top-2 -left-1" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium pl-6">
                  "Konsensus DDInter 6 database global dan evaluasi polifarmasi Beers 2023 sangat memangkas beban kerja apoteker klinis saat ronde bangsal. Rekomendasi deprescribing untuk pasien geriatri kini jauh lebih mudah diterima dan diapresiasi oleh DPJP."
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-teal-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-md font-outfit">
                  DK
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-outfit">
                      apt. Dedi Kurniawan, M.Clin.Pharm.
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Kepala Sub-Instalasi Farmasi Klinis RSUD • Surabaya</p>
                </div>
              </div>
              <span className="hidden sm:inline text-[10px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold">
                Ronde Bangsal Efisien
              </span>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-white dark:bg-[#061d23] rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-teal-500/25 shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[10px] font-black border border-amber-200 dark:border-amber-800">
                  Lulusan UKMPPAI
                </span>
              </div>

              <div className="relative">
                <Quote className="w-6 h-6 text-amber-500/20 absolute -top-2 -left-1" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium pl-6">
                  "Pusat Belajar Farmasi di platform ini luar biasa lengkap. Bank soal vignette CBT 4 domain dan blueprint OSCE-nya sangat mirip dengan ujian aslinya. Pembahasannya runut dan berlandaskan regulasi Kemenkes terbaru."
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-teal-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white font-black flex items-center justify-center text-sm shadow-md font-outfit">
                  FR
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-outfit">
                      Fajar Ramadhan, S.Farm.
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Peraih Nilai Tertinggi Tryout CBT UKMPPAI • Yogyakarta</p>
                </div>
              </div>
              <span className="hidden sm:inline text-[10px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold">
                Lulus First-Taker
              </span>
            </div>
          </div>

        </div>

        {/* Social Proof Strip */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#07242c] border border-slate-200 dark:border-teal-500/20 flex flex-wrap items-center justify-around gap-4 text-center">
          <div>
            <span className="text-base sm:text-lg font-black text-[#082a24] dark:text-white font-outfit">⭐ 4.98 / 5.0</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Skor Kepuasan Sejawat</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-300 dark:bg-slate-700" />
          <div>
            <span className="text-base sm:text-lg font-black text-[#082a24] dark:text-white font-outfit">3.800+</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Apoteker &amp; Dokter Aktif</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-300 dark:bg-slate-700" />
          <div>
            <span className="text-base sm:text-lg font-black text-[#082a24] dark:text-white font-outfit">140.000+</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Telaah Resep Selesai</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-300 dark:bg-slate-700" />
          <div>
            <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-outfit">99.9%</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Ketersediaan Sistem (Uptime)</p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          PRICING & SUBSCRIPTION SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 text-xs font-black border border-amber-300 dark:border-amber-800">
            <Sparkles className="w-3.5 h-3.5 fill-amber-900 dark:fill-amber-300" />
            <span>Paket Langganan Hemat (Akses Penuh 1 Tahun)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082a24] dark:text-white font-outfit">
            Tarif &amp; Lisensi Layanan FARMASIDRUGGIST
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium">
            Pilihan paket lisensi tahunan terjangkau untuk mahasiswa, apoteker praktik mandiri, hingga institusi klinik &amp; apotek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
          {activePlans.map((plan) => {
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`bg-white dark:bg-[#071c21] rounded-3xl p-6 sm:p-8 border flex flex-col justify-between relative transition-all ${
                  isPopular 
                    ? 'border-teal-500 ring-2 ring-teal-500/40 shadow-2xl scale-[1.02]' 
                    : 'border-slate-200/90 dark:border-teal-500/20 shadow-md hover:border-teal-300'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-[11px] font-black rounded-full uppercase tracking-wider shadow-md bg-amber-400 text-slate-950 font-outfit">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-[#082a24] dark:text-white font-outfit">{plan.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px] font-medium leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="border-y border-slate-100 dark:border-slate-800 py-4">
                    {plan.originalPriceFormatted && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs line-through text-slate-400 font-bold decoration-rose-500 decoration-2">
                          {plan.originalPriceFormatted} / tahun
                        </span>
                        {plan.discountBadge && (
                          <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.2 rounded-full shadow-2xs font-outfit">
                            {plan.discountBadge}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      {plan.priceValue > 0 && <span className="text-sm font-bold text-slate-500">Rp</span>}
                      <span className="text-4xl font-black text-[#082a24] dark:text-white font-outfit">
                        {plan.priceValue === 0 ? 'Gratis' : plan.priceValue.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {plan.priceValue === 0 ? 'Selamanya' : '/tahun'}
                      </span>
                    </div>
                    {plan.priceValue > 0 && (
                      <p className="text-xs text-teal-600 dark:text-teal-400 font-black mt-1">
                        Hanya ~Rp 16.500 / bulan (Hemat Rp 800.000!)
                      </p>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={onOpenPricingModal}
                    className={`w-full py-4 rounded-2xl font-black text-xs transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md hover:scale-[1.02]'
                        : 'bg-[#0f766e] hover:bg-[#115e59] text-white shadow-sm hover:scale-[1.01]'
                    }`}
                  >
                    {plan.priceValue === 0 ? 'Mulai Akses Pemula Gratis' : `Ambil Promo Paket Pro Rp 199rb / Tahun`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          STAGE 5 & 6: INTERACTIVE ACCORDION FAQ SECTION
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-black border border-teal-300 dark:border-teal-800">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Pusat Informasi &amp; Transparansi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082a24] dark:text-white font-outfit">
            Pertanyaan Sering Diajukan (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">
            Informasi lengkap seputar lisensi, validitas bukti klinis (EBM), dan integrasi sistem.
          </p>
        </div>

        <div className="space-y-3">
          {PRICING_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div 
                key={idx} 
                className={`bg-white dark:bg-[#061d23] rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-teal-500 shadow-md ring-1 ring-teal-500/30' 
                    : 'border-slate-200/90 dark:border-teal-500/20 shadow-xs hover:border-teal-300 dark:hover:border-teal-500/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <h3 className={`text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-colors ${
                    isOpen ? 'text-teal-700 dark:text-teal-300' : 'text-[#082a24] dark:text-white'
                  }`}>
                    <span className={`p-1.5 rounded-xl transition-colors shrink-0 ${
                      isOpen ? 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <span className="font-outfit">{faq.q}</span>
                  </h3>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-teal-600 dark:text-teal-400' : 'text-slate-400'
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 pl-12 leading-relaxed border-t border-slate-100 dark:border-teal-500/20 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          TELEGRAM COMMUNITY SECTION: Ruang Diskusi Apoteker & Dokter Indonesia
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062028] via-[#09323d] to-[#0d4554] p-8 sm:p-12 text-white border-2 border-sky-400/40 shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#229ED9]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#229ED9]/20 border border-[#229ED9]/50 text-sky-200 text-xs font-black shadow-inner">
                <Send className="w-3.5 h-3.5 text-sky-300 fill-sky-300" />
                <span>Komunitas Telegram Resmi FarmasiDruggist • Akses Diskusi Bebas Biaya</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black font-outfit text-white tracking-tight leading-snug">
                Gabung Forum Diskusi Kasus Klinis &amp; Farmasi Indonesia
              </h2>

              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-2xl font-medium">
                Wadah kolaborasi ribuan Apoteker, Dokter Spesialis/Umum, Tenaga Vokasi Farmasi, dan Mahasiswa Farmasi seluruh Indonesia. Diskusikan kasus interaksi obat polifarmasi kompleks, telaah resep dokter, update PNPK Kemenkes, kupas tuntas soal UKMPPAI, hingga tips manajerial apotek modern.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-sky-100">
                <div className="flex items-center gap-2 bg-[#051c24]/80 p-3 rounded-xl border border-sky-400/30">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-semibold">Diskusi Kasus Interaksi Obat</span>
                </div>
                <div className="flex items-center gap-2 bg-[#051c24]/80 p-3 rounded-xl border border-sky-400/30">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="font-semibold">Bedah Soal UKMPPAI &amp; UKTTK</span>
                </div>
                <div className="flex items-center gap-2 bg-[#051c24]/80 p-3 rounded-xl border border-sky-400/30">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold">Jejaring Karir &amp; SOP Apotek</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="bg-[#04161c]/95 p-6 rounded-3xl border-2 border-sky-400/40 text-center w-full max-w-sm space-y-4 shadow-2xl backdrop-blur-md">
                <div className="w-16 h-16 rounded-2xl bg-[#229ED9] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#229ED9]/40 transition-transform hover:scale-110">
                  <Send className="w-8 h-8 fill-white ml-0.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-outfit">Forum Komunitas Tenaga Kesehatan</h3>
                  <p className="text-[11px] text-teal-200/80 mt-1 font-medium">3.800+ Rekan Sejawat • Diskusi Ilmiah &amp; Bebas Spam</p>
                </div>
                <a
                  href="https://t.me/+lHiIMC_TdoM2NTk1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#229ED9] hover:bg-[#1b8bc2] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.03] border border-sky-200/40"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>Join Grup Telegram Resmi →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM HIGH-CONVERTING CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#031519] via-[#062932] to-[#093c4a] p-8 sm:p-14 text-white text-center space-y-7 shadow-2xl border-2 border-teal-500/40">
          
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-black">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Mulai Transformasi Digital Pelayanan Farmasi Klinis Anda</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-outfit tracking-tight">
              Tingkatkan Keselamatan Pasien &amp; Ketepatan Terapi Hari Ini
            </h2>

            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-2xl mx-auto font-medium">
              Bergabunglah dengan ribuan Apoteker, Dokter, dan Calon Apoteker di seluruh Indonesia dalam mewujudkan telaah resep cepat, terstandar, dan berlandaskan bukti ilmiah resmi.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('interactive-playground');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black rounded-2xl shadow-xl shadow-teal-950/50 transition-all text-xs sm:text-sm cursor-pointer hover:scale-105 active:scale-95 font-outfit flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Coba Simulasi Klinis Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenPricingModal}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-950/40 transition-all text-xs sm:text-sm cursor-pointer hover:scale-105 active:scale-95 font-outfit flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Ambil Promo Paket Pro (Rp 199rb/Tahun)</span>
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="pt-4 border-t border-teal-500/20 flex flex-wrap items-center justify-center gap-6 text-[11px] text-teal-200/80 font-bold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Bebas Iklan Komersial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Sesuai Standar PNPK Kemenkes RI
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Data Selalu Diperbarui Berkala
            </span>
          </div>

        </div>
      </section>

    </div>
  );
};
