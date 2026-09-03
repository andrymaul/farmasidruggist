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

  // Feedback Questionnaire to WhatsApp State
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackRole, setFeedbackRole] = useState('');
  const [feedbackCity, setFeedbackCity] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackModule, setFeedbackModule] = useState('Multi-Consensus DDI (Interaksi Obat)');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSendFeedbackWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const stars = '⭐'.repeat(feedbackRating);
    const message = `Halo Admin FarmasiDruggist, saya ingin menyampaikan testimoni / saran pengguna:

👤 *Nama:* ${feedbackName.trim() || 'Rekan Sejawat'}
🏥 *Profesi/Faskes:* ${feedbackRole.trim() || '-'}
📍 *Kota:* ${feedbackCity.trim() || '-'}
⭐ *Rating Kepuasan:* ${stars} (${feedbackRating}/5)
🔬 *Modul Favorit:* ${feedbackModule}
💬 *Ulasan, Masukan & Saran:*
"${feedbackMessage.trim() || 'Aplikasi FarmasiDruggist sangat membantu praktik kefarmasian klinis.'}"`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6287778402266?text=${encoded}`, '_blank');
  };

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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* =========================================================================
              2-COLUMN SPLIT HERO GRID: TEXT ON LEFT, 3D LIVE UI MOCKUP ON RIGHT
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column (Span 5 Kolom di Desktop): Copywriting, Search, & CTA */}
            <div className="lg:col-span-5 text-left space-y-5">
              
              {/* Clinical Live Badge with Animated Pulse Dot */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#062930]/90 border border-teal-400/50 text-teal-300 text-xs font-black shadow-lg shadow-teal-950/60 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span className="tracking-wide text-[11px] sm:text-xs">Sistem Integrasi Apoteker &amp; Dokter</span>
              </div>

              {/* Main Headline with Crystal Gradient Typography */}
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-black text-white tracking-tight leading-[1.15] font-outfit">
                Sistem Informasi Obat,{' '}
                <span className="bg-gradient-to-r from-teal-200 via-cyan-100 to-emerald-200 bg-clip-text text-transparent">
                  Interaksi Klinis
                </span>{' '}
                &amp;{' '}
                <span className="bg-gradient-to-r from-cyan-200 via-teal-100 to-emerald-200 bg-clip-text text-transparent underline decoration-teal-400/60 decoration-4 underline-offset-8">
                  Kalkulator Resep
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-teal-100/90 font-medium leading-relaxed">
                <strong className="text-white">FARMASIDRUGGIST</strong> mengintegrasikan <strong className="text-teal-200">21 Modul Klinis Terpercaya</strong>: Skrining Interaksi DDInter 6 database global, Keamanan Bumil &amp; Busui PLLR, BUD Racikan USP &lt;795&gt;, hingga Pusat UKMPPAI.
              </p>

              {/* Hero Quick Search Box with Glowing Neon Border Ring & Rotating Placeholder */}
              <form onSubmit={handleHeroSearchSubmit} className="pt-1">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-500 rounded-2xl blur-md opacity-35 group-hover:opacity-75 group-focus-within:opacity-100 transition duration-500"></div>
                  <div className="relative flex items-center bg-[#05171c]/95 backdrop-blur-xl rounded-2xl p-1.5 sm:p-2 border border-teal-500/40 shadow-2xl">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 ml-2 shrink-0" />
                    <input
                      type="text"
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                      placeholder={samplePlaceholders[placeholderIndex]}
                      className="w-full px-2.5 py-1.5 sm:py-2 text-white placeholder-teal-300/50 font-semibold text-xs sm:text-sm focus:outline-none bg-transparent transition-all"
                    />
                    <button
                      type="submit"
                      className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border border-teal-400/40 hover:scale-[1.02] active:scale-95 font-outfit"
                    >
                      <span>Cari</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Popular drug sample tags styled as micro-pills */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs">
                  <span className="font-extrabold text-teal-300 font-outfit text-[11px]">Pencarian Cepat:</span>
                  {['Warfarin', 'Aspirin', 'Simvastatin', 'Clopidogrel', 'Ciprofloxacin'].map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => {
                        if (onSearchDrug) onSearchDrug(sample);
                        onSelectTab('drugs');
                      }}
                      className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer bg-[#082a32]/80 hover:bg-[#0e4450] text-teal-200 hover:text-white border border-teal-500/30 hover:border-teal-400/70 hover:scale-105 shadow-2xs flex items-center gap-1 backdrop-blur-xs"
                    >
                      <Pill className="w-2.5 h-2.5 text-teal-400" />
                      <span>{sample}</span>
                    </button>
                  ))}
                </div>
              </form>

              {/* Action Buttons - High-Impact CTA Hierarchy */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('interactive-playground');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-gradient-to-r from-teal-400 via-teal-300 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black rounded-xl shadow-xl shadow-teal-950/50 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:scale-[1.02] active:scale-95 font-outfit"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Eksplorasi Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenAuthModal}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:scale-[1.02] active:scale-95 backdrop-blur-md"
                >
                  <ShieldCheck className="w-4 h-4 text-teal-300" />
                  <span>Masuk Akun</span>
                </button>
              </div>

            </div>

            {/* Right Column (Span 7 Kolom di Desktop): Floating 3D Perspective Live UI Mockup Card */}
            <div className="lg:col-span-7">
              <div className="relative group">
                {/* Outer Glow Ambient Halo */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/30 via-cyan-400/20 to-emerald-500/30 rounded-[32px] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

                {/* Window Container */}
                <div className="relative rounded-3xl bg-[#04151a]/95 border border-teal-500/30 shadow-[0_25px_70px_-15px_rgba(4,20,25,0.9)] backdrop-blur-2xl overflow-hidden transition-all duration-300 group-hover:border-teal-400/50">
                  
                  {/* Window Title Bar */}
                  <div className="px-4 py-3 bg-[#061e24] border-b border-teal-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block border border-rose-600/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
                      <span className="text-[10.5px] font-mono text-teal-300/80 ml-2 hidden sm:inline">
                        farmasidruggist-clinical-engine.app • v2.5
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[9.5px] font-black">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Multi-Consensus</span>
                      </span>
                    </div>
                  </div>

                  {/* Mockup Dashboard Content */}
                  <div className="p-4 sm:p-5 space-y-4 text-left font-sans">
                    
                    {/* Mock Patient Context Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-2xl bg-[#07252c]/90 border border-teal-500/25">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-black text-xs font-outfit border border-teal-500/30">
                          PS
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-white">Ny. S (62 th)</span>
                            <span className="text-[9.5px] px-2 py-0.2 rounded-full bg-teal-950 text-teal-300 font-mono border border-teal-500/30">
                              CrCl: 42 mL/min
                            </span>
                          </div>
                          <p className="text-[10px] text-teal-200/70 font-medium truncate max-w-[240px]">
                            Dx: AFib • Hiperkolesterolemia
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 items-center">
                        <span className="px-2 py-0.5 rounded-lg bg-teal-950/80 text-teal-200 border border-teal-500/30 text-[10px] font-bold flex items-center gap-1">
                          <Pill className="w-2.5 h-2.5 text-teal-400" /> Warfarin 5mg
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-teal-950/80 text-teal-200 border border-teal-500/30 text-[10px] font-bold flex items-center gap-1">
                          <Pill className="w-2.5 h-2.5 text-teal-400" /> Aspirin 80mg
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-teal-950/80 text-teal-200 border border-teal-500/30 text-[10px] font-bold flex items-center gap-1">
                          <Pill className="w-2.5 h-2.5 text-teal-400" /> Simvastatin 20mg
                        </span>
                      </div>
                    </div>

                    {/* Dual Live Clinical Finding Cards */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                      
                      {/* Finding 1: Major DDI Alert */}
                      <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/40 shadow-inner space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[9px] font-black border border-rose-500/40 uppercase tracking-wider">
                            <AlertTriangle className="w-3 h-3 text-rose-400" />
                            Interaksi Mayor
                          </span>
                          <span className="text-[9.5px] text-rose-300/80 font-mono font-bold">Skor: 0.89</span>
                        </div>

                        <div>
                          <h4 className="text-[11.5px] font-black text-white font-outfit">
                            Warfarin + Aspirin (Antiplatelet Sinergis)
                          </h4>
                          <p className="text-[10px] text-rose-100/80 mt-0.5 leading-relaxed">
                            Risiko perdarahan mayor GI/intrakranial naik hingga <strong>3.8x</strong> tanpa bukti manfaat proteksi tambahan.
                          </p>
                        </div>

                        <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/20 text-[9.5px] text-rose-200 space-y-0.5">
                          <div className="font-bold text-rose-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-rose-400 shrink-0" />
                            <span>Rekomendasi EBM:</span>
                          </div>
                          <p className="text-rose-100/90 leading-tight">
                            Evaluasi ulang indikasi. Pantau INR ketat (2.0-2.5) dan resepkan gastroprotektor PPI.
                          </p>
                        </div>
                      </div>

                      {/* Finding 2: Moderate DDI & DFI Alert */}
                      <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 shadow-inner space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-black border border-amber-500/40 uppercase tracking-wider">
                            <ShieldAlert className="w-3 h-3 text-amber-400" />
                            Interaksi Makanan (DFI)
                          </span>
                          <span className="text-[9.5px] text-amber-300/80 font-mono font-bold">CYP3A4</span>
                        </div>

                        <div>
                          <h4 className="text-[11.5px] font-black text-white font-outfit">
                            Simvastatin + Jus Grapefruit
                          </h4>
                          <p className="text-[10px] text-amber-100/80 mt-0.5 leading-relaxed">
                            Inhibisi enzim CYP3A4 usus menaikkan AUC Simvastatin hingga <strong>330%</strong> (risiko rhabdomyolysis).
                          </p>
                        </div>

                        <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/20 text-[9.5px] text-amber-200 space-y-0.5">
                          <div className="font-bold text-amber-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>Solusi Alternatif:</span>
                          </div>
                          <p className="text-amber-100/90 leading-tight">
                            Ganti Statin non-CYP3A4 seperti <strong>Rosuvastatin (10mg)</strong> atau Pravastatin.
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Micro Quick Capability Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-teal-500/20 text-[10.5px]">
                      <div className="flex flex-wrap gap-2 text-teal-200/80 font-medium">
                        <span className="flex items-center gap-1 text-teal-300">
                          <Check className="w-3 h-3 text-teal-400" /> 6 Konsensus Global
                        </span>
                        <span className="flex items-center gap-1 text-teal-300">
                          <Check className="w-3 h-3 text-teal-400" /> Beers 2023
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('interactive-playground');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-teal-300 hover:text-white font-black text-[10.5px] flex items-center gap-1 transition-colors cursor-pointer group"
                      >
                        <span>Coba Simulasi Langsung</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Full-width Stat Counters Row - Elevated Translucent Glassmorphism Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 text-left border-t border-teal-500/20">
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono hidden sm:inline mr-1">
                6 Konsensus Global
              </span>
              <button
                type="button"
                onClick={() => onSelectTab('guidelines')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold text-[10px] border border-teal-200 dark:border-teal-800 transition-all cursor-pointer"
              >
                <span>Panduan Terapi PNPK</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('literature')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                <BookMarked className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                <span>Direktori EBM</span>
              </button>
            </div>
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
          STAGE 4: PUSAT SUARA PENGGUNA & KUISIONER FEEDBACK WHATSAPP (0877-7840-2266)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-black shadow-xs">
            <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Pusat Suara Pengguna &amp; Partisipasi Sejawat</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#082a24] dark:text-white font-outfit tracking-tight">
            Bagikan Pengalaman, Ulasan &amp; Usulan Fitur Anda
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Platform ini terus berkembang berkat masukan riil rekan sejawat di lapangan. Sampaikan testimoni praktik Anda, kritik konstruktif, atau usulan fitur baru langsung ke WhatsApp pengembang kami.
          </p>
        </div>

        {/* 2-Column Split: Value Proposition on Left, Interactive Questionnaire Form on Right */}
        <div className="bg-white dark:bg-[#061d23] rounded-3xl border border-slate-200/90 dark:border-teal-500/25 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column (5 Cols): Why Your Voice Matters & Direct Contact */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#04151a] via-[#07252c] to-[#09323c] text-white p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider font-outfit border border-emerald-500/30">
                    Transparansi &amp; Kolaborasi
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-outfit text-white">
                    Suara Rekan Sejawat Adalah Nyawa Perkembangan Kami
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed font-medium">
                    Kami percaya perangkat lunak klinis terbaik tidak lahir di laboratorium tertutup, melainkan dari meja apotek, ruang peracikan, dan bangsal rawat inap nyata.
                  </p>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white">100% Dibaca Tim Pengembang</h4>
                      <p className="text-[11px] text-teal-200/70 mt-0.5">Setiap pesan yang Anda kirim ke WhatsApp langsung ditelaah oleh tim farmasi &amp; engineering kami.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white">Prioritas Roadmap Fitur Baru</h4>
                      <p className="text-[11px] text-teal-200/70 mt-0.5">Butuh algoritma obat baru, template etiket khusus, atau kalkulator klinis tertentu? Usulkan di sini.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white">Testimoni Asli &amp; Terverifikasi</h4>
                      <p className="text-[11px] text-teal-200/70 mt-0.5">Ulasan autentik dari Anda akan kami tampilkan dengan izin sebagai rujukan kredibel bagi sejawat lain.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-teal-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-200">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Layanan Admin Langsung:</span>
                </div>
                <a
                  href="https://wa.me/6287778402266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-black text-emerald-300 hover:text-emerald-200 font-mono tracking-wide hover:underline block"
                >
                  +62 877-7840-2266
                </a>
              </div>
            </div>

            {/* Right Column (7 Cols): Interactive Form */}
            <div className="lg:col-span-7 p-6 sm:p-10">
              <form onSubmit={handleSendFeedbackWhatsApp} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-black text-[#082a24] dark:text-white font-outfit">
                      Formulir Kuisioner &amp; Ulasan Pengguna
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Isi formulir ringkas di bawah ini untuk mengirim ulasan langsung ke WhatsApp Admin.</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                    WhatsApp 1-Klik
                  </span>
                </div>

                {/* Grid Inputs: Nama & Profesi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 dark:text-slate-300 font-outfit">
                      Nama &amp; Gelar <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      placeholder="misal: apt. Budi Santoso, S.Farm."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#07242c] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 dark:text-slate-300 font-outfit">
                      Profesi / Tempat Tugas <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={feedbackRole}
                      onChange={(e) => setFeedbackRole(e.target.value)}
                      placeholder="misal: Apoteker RSUD / Apotek / Dokter"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#07242c] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Grid Inputs: Kota & Modul Favorit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 dark:text-slate-300 font-outfit">
                      Kota / Daerah
                    </label>
                    <input
                      type="text"
                      value={feedbackCity}
                      onChange={(e) => setFeedbackCity(e.target.value)}
                      placeholder="misal: Bandung / Surabaya / Medan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#07242c] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 dark:text-slate-300 font-outfit">
                      Modul yang Dinilai
                    </label>
                    <select
                      value={feedbackModule}
                      onChange={(e) => setFeedbackModule(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#07242c] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all font-medium cursor-pointer"
                    >
                      <option value="Multi-Consensus DDI (Interaksi Obat)">Multi-Consensus DDI (Interaksi Obat)</option>
                      <option value="Kalkulator BUD Racikan USP <795>">Kalkulator BUD Racikan USP &lt;795&gt;</option>
                      <option value="Kompatibilitas Injeksi IV ICU (ASHP)">Kompatibilitas Injeksi IV ICU (ASHP)</option>
                      <option value="Keamanan Bumil & Busui (FDA PLLR & Hale)">Keamanan Bumil &amp; Busui (FDA PLLR &amp; Hale)</option>
                      <option value="Evaluasi Geriatri Beers 2023">Evaluasi Geriatri Beers 2023</option>
                      <option value="Generator Kartu PIO WhatsApp">Generator Kartu PIO WhatsApp</option>
                      <option value="Pusat Belajar UKMPPAI & OSCE">Pusat Belajar UKMPPAI &amp; OSCE</option>
                      <option value="Lainnya / Usulan Modul Baru">Lainnya / Usulan Modul Baru</option>
                    </select>
                  </div>
                </div>

                {/* Rating Bintang Interaktif */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-amber-50/70 dark:bg-[#07242c]/60 border border-amber-200/80 dark:border-amber-900/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-200 font-outfit">
                      Rating Kepuasan Anda terhadap Platform Ini:
                    </span>
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono">
                      {feedbackRating} dari 5 Bintang
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= feedbackRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 dark:fill-slate-700 text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-2 font-medium">
                      {feedbackRating === 5 && 'Sangat Memuaskan & Bermanfaat! 🎉'}
                      {feedbackRating === 4 && 'Bagus & Bermanfaat 👍'}
                      {feedbackRating === 3 && 'Cukup, Perlu Peningkatan 🙂'}
                      {feedbackRating <= 2 && 'Perlu Banyak Pembenahan ✍️'}
                    </span>
                  </div>
                </div>

                {/* Pesan & Saran */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300 font-outfit">
                    Ulasan Pengalaman, Kritik Membangun, atau Usulan Fitur Baru <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Ceritakan pengalaman Anda saat mencoba aplikasi ini, modul apa yang paling membantu kerja Anda, atau kendala apa yang Anda temukan..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#07242c] text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all font-medium leading-relaxed resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-98 font-outfit border border-emerald-400/40"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>Kirim Ulasan &amp; Saran ke WhatsApp (+62 877-7840-2266) →</span>
                </button>

                <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
                  🔒 WhatsApp akan terbuka langsung di ponsel atau browser Anda tanpa perantara.
                </p>
              </form>
            </div>

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
          STAGE 6: 2-COLUMN SIDE-BY-SIDE: TELEGRAM COMMUNITY & CONVERTING CTA
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Left Card: Telegram Community */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062028] via-[#09323d] to-[#0d4554] p-6 sm:p-8 text-white border-2 border-sky-400/40 shadow-2xl flex flex-col justify-between space-y-6">
            {/* Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#229ED9]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#229ED9]/20 border border-[#229ED9]/50 text-sky-200 text-xs font-black shadow-inner">
                <Send className="w-3.5 h-3.5 text-sky-300 fill-sky-300" />
                <span>Komunitas Telegram Resmi • Bebas Biaya</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-outfit text-white tracking-tight leading-snug">
                Gabung Forum Diskusi Kasus Klinis &amp; Farmasi Indonesia
              </h2>

              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium">
                Wadah kolaborasi 7.000+ Apoteker, Dokter Spesialis/Umum, dan Mahasiswa Farmasi seluruh Indonesia. Bedah kasus polifarmasi kompleks, telaah resep dokter, hingga kupas tuntas soal UKMPPAI.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-sky-400/20 relative z-10">
              <a
                href="https://t.me/+lHiIMC_TdoM2NTk1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 bg-[#229ED9] hover:bg-[#1b8bc2] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] border border-sky-200/40 font-outfit"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Join Grup Telegram (7.000+ Sejawat) →</span>
              </a>
              <p className="text-[10px] text-center text-teal-200/70">
                🔒 Diskusi ilmiah, teratur, dan bebas spam iklan komersial.
              </p>
            </div>
          </div>

          {/* Right Card: Converting Platform CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#031519] via-[#062932] to-[#093c4a] p-6 sm:p-8 text-white border-2 border-teal-500/40 shadow-2xl flex flex-col justify-between space-y-6">
            {/* Ambient Glow */}
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-black">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Mulai Transformasi Pelayanan Klinis Anda</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-outfit tracking-tight leading-snug">
                Tingkatkan Keselamatan Pasien &amp; Ketepatan Terapi Hari Ini
              </h2>

              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium">
                Dapatkan akses instan ke 21 modul klinis terpadu, monografi resmi BPOM, skrining interaksi multi-konsensus global, dan kalkulator resep presisi tanpa instalasi rumit.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-teal-500/20 relative z-10">
              <button
                onClick={() => {
                  const el = document.getElementById('interactive-playground');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black rounded-xl shadow-lg shadow-teal-950/40 transition-all text-xs sm:text-sm cursor-pointer hover:scale-[1.02] active:scale-98 font-outfit flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Coba Simulasi Klinis Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPricingModal}
                className="w-full py-3 px-5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl shadow-md transition-all text-xs cursor-pointer hover:scale-[1.01] active:scale-98 font-outfit flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>Ambil Promo Paket Pro (Rp 199rb/Tahun)</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
