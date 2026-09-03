import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Calculator, 
  Stethoscope, 
  Sparkles, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Clock, 
  AlertTriangle, 
  RotateCcw, 
  Trophy, 
  BarChart3, 
  Layers, 
  FlaskConical, 
  Briefcase, 
  Leaf, 
  FileText, 
  Shuffle, 
  Check, 
  X, 
  Flag, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  BookMarked,
  Zap,
  Info,
  TrendingUp,
  ClipboardList,
  Baby
} from 'lucide-react';
import {
  COMPETENCY_DOMAINS,
  HIGH_YIELD_TOPICS,
  EXAM_QUESTION_BANK,
  FORMULA_GUIDES,
  OSCE_STATIONS,
  FLASHCARD_DECK,
  CALCULATION_FORMULA_DETAILS,
  HighYieldTopic,
  ExamQuestion,
  FormulaCalculatorGuide,
  OsceStationGuide,
  FlashcardItem
} from '../data/competencyExamData';

interface PharmacyCompetencyCenterProps {
  onSelectTab?: (tabId: string) => void;
  onOpenPricingModal?: () => void;
}

export const PharmacyCompetencyCenter: React.FC<PharmacyCompetencyCenterProps> = ({
  onSelectTab
}) => {
  // Main Subtab State
  const [activeMainTab, setActiveMainTab] = useState<'topics' | 'cbt' | 'calc' | 'osce' | 'flashcards'>('topics');

  // 1. High-Yield Topics State
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');
  const [topicSearchQuery, setTopicSearchQuery] = useState<string>('');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(HIGH_YIELD_TOPICS[0]?.id || null);

  // 2. CBT Exam Bank State
  const [cbtMode, setCbtMode] = useState<'study' | 'tryout'>('study');
  const [cbtDomainFilter, setCbtDomainFilter] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isTryoutSubmitted, setIsTryoutSubmitted] = useState<boolean>(false);
  const [tryoutTimeLeft, setTryoutTimeLeft] = useState<number>(15 * 60); // 15 mins demo timer
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // 3. Interactive Formula Calculators State
  const [selectedCalcCategory, setSelectedCalcCategory] = useState<string>('alligation');
  // Alligation Inputs
  const [alliHigh, setAlliHigh] = useState<number>(96);
  const [alliLow, setAlliLow] = useState<number>(0);
  const [alliTarget, setAlliTarget] = useState<number>(70);
  const [alliVol, setAlliVol] = useState<number>(100);
  // HLB Inputs
  const [hlbTarget, setHlbTarget] = useState<number>(12);
  const [hlbA, setHlbA] = useState<number>(15); // Tween 80
  const [hlbB, setHlbB] = useState<number>(4.3); // Span 80
  const [hlbTotalWeight, setHlbTotalWeight] = useState<number>(10);
  // Tonicity Inputs
  const [tonicVol, setTonicVol] = useState<number>(100);
  const [tonicDrugWeight, setTonicDrugWeight] = useState<number>(1.0);
  const [tonicEVal, setTonicEVal] = useState<number>(0.13);
  // PK Inputs
  const [pkCss, setPkCss] = useState<number>(15);
  const [pkVd, setPkVd] = useState<number>(35);
  const [pkCl, setPkCl] = useState<number>(2.8);
  // HJA Inputs
  const [hjaHpp, setHjaHpp] = useState<number>(100000);
  const [hjaPpnRate, setHjaPpnRate] = useState<number>(11);
  const [hjaMarginPercent, setHjaMarginPercent] = useState<number>(20);
  // ICER Inputs
  const [icerCostA, setIcerCostA] = useState<number>(200000);
  const [icerCostB, setIcerCostB] = useState<number>(500000);
  const [icerEffectA, setIcerEffectA] = useState<number>(10);
  const [icerEffectB, setIcerEffectB] = useState<number>(16);
  // Consumption Planning Inputs
  const [consAvg, setConsAvg] = useState<number>(3000);
  const [consPeriod, setConsPeriod] = useState<number>(1);
  const [consLeadTime, setConsLeadTime] = useState<number>(0.5);
  const [consBuffer, setConsBuffer] = useState<number>(1500);
  const [consCurrentStock, setConsCurrentStock] = useState<number>(800);
  // Friability Inputs
  const [friaW1, setFriaW1] = useState<number>(6.50);
  const [friaW2, setFriaW2] = useState<number>(6.44);
  // BSA Mosteller Inputs
  const [bsaHeight, setBsaHeight] = useState<number>(120);
  const [bsaWeight, setBsaWeight] = useState<number>(25);
  // CrCl Cockcroft-Gault Inputs
  const [crclAge, setCrclAge] = useState<number>(65);
  const [crclWeight, setCrclWeight] = useState<number>(54);
  const [crclScr, setCrclScr] = useState<number>(1.6);
  const [crclGender, setCrclGender] = useState<'male' | 'female'>('female');
  // Reorder Point (ROP) Inputs
  const [ropLeadTime, setRopLeadTime] = useState<number>(3);
  const [ropDailyUsage, setRopDailyUsage] = useState<number>(30);
  const [ropSafetyStock, setRopSafetyStock] = useState<number>(60);

  // 4. OSCE State
  const [selectedOsceId, setSelectedOsceId] = useState<string>(OSCE_STATIONS[0]?.id || '');
  const [completedChecklistItems, setCompletedChecklistItems] = useState<Record<string, boolean>>({});

  // 5. Flashcard State
  const [flashcardCategory, setFlashcardCategory] = useState<string>('all');
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [showCardHint, setShowCardHint] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  // Filtered Topics
  const filteredTopics = useMemo(() => {
    return HIGH_YIELD_TOPICS.filter((topic) => {
      const matchDomain = selectedDomainFilter === 'all' || topic.domainId === selectedDomainFilter;
      if (!matchDomain) return false;
      if (!topicSearchQuery.trim()) return true;
      const q = topicSearchQuery.toLowerCase();
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.category.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.tags.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [selectedDomainFilter, topicSearchQuery]);

  // Filtered CBT Questions
  const filteredQuestions = useMemo(() => {
    return EXAM_QUESTION_BANK.filter((q) => {
      if (cbtDomainFilter === 'all') return true;
      return q.domainId === cbtDomainFilter;
    });
  }, [cbtDomainFilter]);

  const activeQuestion = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  // Tryout Score Calculation
  const tryoutScore = useMemo(() => {
    let correctCount = 0;
    filteredQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = filteredQuestions.length > 0 ? Math.round((correctCount / filteredQuestions.length) * 100) : 0;
    return { correctCount, total: filteredQuestions.length, percentage };
  }, [filteredQuestions, userAnswers]);

  // Active OSCE Station
  const activeOsceStation = useMemo(() => {
    return OSCE_STATIONS.find(s => s.id === selectedOsceId) || OSCE_STATIONS[0];
  }, [selectedOsceId]);

  // OSCE Score
  const osceTotalScore = useMemo(() => {
    if (!activeOsceStation) return 0;
    let earned = 0;
    activeOsceStation.criticalChecklist.forEach((item, idx) => {
      if (completedChecklistItems[`${activeOsceStation.id}-${idx}`]) {
        earned += item.points;
      }
    });
    return earned;
  }, [activeOsceStation, completedChecklistItems]);

  // Filtered Flashcards
  const filteredFlashcards = useMemo(() => {
    return FLASHCARD_DECK.filter((card) => {
      if (flashcardCategory === 'all') return true;
      return card.category === flashcardCategory;
    });
  }, [flashcardCategory]);

  const activeCard = filteredFlashcards[currentFlashcardIdx] || filteredFlashcards[0];

  const handleNextCard = () => {
    setIsCardFlipped(false);
    setShowCardHint(false);
    setCurrentFlashcardIdx((prev) => (prev + 1) % filteredFlashcards.length);
  };

  const handlePrevCard = () => {
    setIsCardFlipped(false);
    setShowCardHint(false);
    setCurrentFlashcardIdx((prev) => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
  };

  const handleShuffleCards = () => {
    setIsCardFlipped(false);
    setShowCardHint(false);
    setCurrentFlashcardIdx(Math.floor(Math.random() * filteredFlashcards.length));
  };

  // Timer Effect for Tryout
  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && tryoutTimeLeft > 0 && !isTryoutSubmitted) {
      interval = setInterval(() => {
        setTryoutTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (tryoutTimeLeft === 0 && !isTryoutSubmitted) {
      setIsTryoutSubmitted(true);
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, tryoutTimeLeft, isTryoutSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in font-sans">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c242b] via-[#091b22] to-[#041014] p-6 sm:p-8 text-white border border-teal-500/30 shadow-2xl">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none hidden sm:block">
          <GraduationCap className="w-64 h-64 text-emerald-400 -rotate-12" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black tracking-wide border border-emerald-500/30 font-outfit">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>MODUL RESMI PERSIAPAN UKMPPAI & UKTVF NASIONAL</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-emerald-200 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Standar Blueprint KFN & IAI
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-cyan-200 border border-white/20">
                <BookMarked className="w-3.5 h-3.5 text-cyan-300" />
                4 Domain • {EXAM_QUESTION_BANK.length} Soal CBT • {OSCE_STATIONS.length} Stase OSCE • {FLASHCARD_DECK.length} Flashcards
              </span>
            </div>
            
            <div className="flex items-start sm:items-center gap-3.5 pt-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shadow-inner shrink-0">
                <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight leading-tight">
                  Pusat Belajar <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">Uji Kompetensi Farmasi</span>
                </h1>
                <p className="text-xs text-emerald-200/90 font-semibold font-outfit mt-0.5">
                  Platform Akselerasi &amp; Simulasi Terpadu UKMPPAI (CBT &amp; OSCE) serta UKTVF
                </p>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Platform akselerasi kelulusan Uji Kompetensi Mahasiswa Program Profesi Apoteker Indonesia (UKMPPAI CBT &amp; OSCE) serta Uji Kompetensi Tenaga Vokasi Farmasi (UKTVF). Dilengkapi rangkuman 4 blueprint nasional, bank soal kasus vignette, simulasi CBT, rumus hitungan cepat, dan panduan stasi OSCE.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-left shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Total Bank Materi Ukom:</span>
              <span className="text-sm font-black text-emerald-400">{EXAM_QUESTION_BANK.length} CBT • {OSCE_STATIONS.length} OSCE • {FLASHCARD_DECK.length} Flashcards</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-black font-outfit">
                <Layers className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase font-outfit">4 Domain Utama</p>
                <p className="text-xs font-black text-white">Sesuai Blueprint KFN/IAI</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-black font-outfit">
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase font-outfit">Terintegrasi PNPK &amp; FI VI</p>
                <p className="text-xs font-black text-white">Pembahasan Rasional &amp; EBM</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-black font-outfit">
                <Calculator className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase font-outfit">9 Rumus & 6 OSCE</p>
                <p className="text-xs font-black text-white">Simulasi Praktik Klinis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Subtab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveMainTab('topics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer font-outfit ${
            activeMainTab === 'topics'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Rangkuman 4 Domain</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-700/60 text-emerald-100">
            {HIGH_YIELD_TOPICS.length} Topik
          </span>
        </button>

        <button
          onClick={() => setActiveMainTab('cbt')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer font-outfit ${
            activeMainTab === 'cbt'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Bank Soal & Tryout CBT</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-700/60 text-emerald-100">
            Simulasi
          </span>
        </button>

        <button
          onClick={() => setActiveMainTab('calc')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer font-outfit ${
            activeMainTab === 'calc'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Kalkulator & Rumus Cepat</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-700/60 text-emerald-100">
            {FORMULA_GUIDES.length} Rumus
          </span>
        </button>

        <button
          onClick={() => setActiveMainTab('osce')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer font-outfit ${
            activeMainTab === 'osce'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Panduan Stasi OSCE</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-700/60 text-emerald-100">
            Praktik
          </span>
        </button>

        <button
          onClick={() => setActiveMainTab('flashcards')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer font-outfit ${
            activeMainTab === 'flashcards'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Flashcard & Hafalan Cepat</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-700/60 text-emerald-100">
            {FLASHCARD_DECK.length} Kartu
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: RANGKUMAN 4 DOMAIN HIGH-YIELD                                   */}
      {/* ========================================================================= */}
      {activeMainTab === 'topics' && (
        <div className="space-y-6">
          {/* Domain Blueprint Filter Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => setSelectedDomainFilter('all')}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer font-outfit flex flex-col justify-between ${
                selectedDomainFilter === 'all'
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-[#0c141d] border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-white">Semua Domain</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    100%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Kompilasi seluruh materi uji kompetensi 4 domain.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span>{HIGH_YIELD_TOPICS.length} Materi Inti</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </button>

            {COMPETENCY_DOMAINS.map((domain) => {
              const isSelected = selectedDomainFilter === domain.id;
              const topicCount = HIGH_YIELD_TOPICS.filter(t => t.domainId === domain.id).length;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomainFilter(domain.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer font-outfit flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-[#0c141d] border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-800 dark:text-white">{domain.shortName}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${domain.badgeColor}`}>
                        {domain.weightPercentage}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {domain.description}
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span>{topicCount} Materi</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={topicSearchQuery}
              onChange={(e) => setTopicSearchQuery(e.target.value)}
              placeholder="Cari materi ringkas, diagnosis (Hipertensi, DM, TB), rumus, atau regulasi..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0c141d] border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* High-Yield Topics List */}
          <div className="space-y-4">
            {filteredTopics.map((topic: HighYieldTopic) => {
              const isExpanded = expandedTopicId === topic.id;
              const domainInfo = COMPETENCY_DOMAINS.find(d => d.id === topic.domainId);

              return (
                <div
                  key={topic.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c141d] shadow-sm overflow-hidden transition-all duration-200"
                >
                  {/* Topic Card Header */}
                  <div
                    onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${domainInfo?.badgeColor}`}>
                          {domainInfo?.shortName}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {topic.category}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-outfit">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                        {topic.summary}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Expanded Content Drawer */}
                  {isExpanded && (
                    <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#080d14]/70 space-y-4 animate-fade-in">
                      {/* Key High-Yield Pearls */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-black text-emerald-800 dark:text-emerald-300 font-outfit uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Poin Emas Wajib Hafal (High-Yield Pearls):</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
                          {topic.keyPearls.map((pearl, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{pearl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Frequent Exam Pitfalls */}
                      {topic.frequentExamPitfalls.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-black text-amber-800 dark:text-amber-300 font-outfit uppercase tracking-wider">
                            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span>Jebakan Soal yang Sering Mengecoh (Exam Pitfalls):</span>
                          </div>
                          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 space-y-2 text-xs text-amber-950 dark:text-amber-200 font-medium">
                            {topic.frequentExamPitfalls.map((pitfall, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 mt-1.5 shrink-0" />
                                <span className="leading-relaxed">{pitfall}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reference & Quick Link Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <BookMarked className="w-3.5 h-3.5 text-slate-400" />
                          <span>Standar Rujukan: <strong>{topic.referenceStandard}</strong></span>
                        </div>

                        {onSelectTab && topic.domainId === 'klinis' && (
                          <button
                            onClick={() => onSelectTab('guidelines')}
                            className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                          >
                            <span>Buka PNPK Terkait</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: BANK SOAL & SIMULASI TRYOUT CBT                                */}
      {/* ========================================================================= */}
      {activeMainTab === 'cbt' && (
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0c141d] border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              <button
                onClick={() => { setCbtMode('study'); setIsTryoutSubmitted(false); setIsTimerRunning(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-outfit ${
                  cbtMode === 'study'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Mode Belajar (Instant Rationale)
              </button>
              <button
                onClick={() => { setCbtMode('tryout'); setIsTimerRunning(true); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-outfit ${
                  cbtMode === 'tryout'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Mode Tryout CBT (Berwaktu)
              </button>
            </div>

            {/* Timer & Domain Filter */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {cbtMode === 'tryout' && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-emerald-400 border border-slate-700 font-mono text-xs font-black">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{formatTimer(tryoutTimeLeft)}</span>
                </div>
              )}

              <select
                value={cbtDomainFilter}
                onChange={(e) => {
                  setCbtDomainFilter(e.target.value);
                  setCurrentQuestionIndex(0);
                }}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
              >
                <option value="all">Semua Domain ({EXAM_QUESTION_BANK.length} Soal)</option>
                <option value="klinis">Farmasi Klinis</option>
                <option value="manajemen">Manajemen & Hukum</option>
                <option value="teknologi">Teknologi & CPOB</option>
                <option value="bahan_alam">Bahan Alam</option>
              </select>
            </div>
          </div>

          {/* Question Number Matrix Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {filteredQuestions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = Boolean(userAnswers[q.id]);
              const isFlagged = Boolean(flaggedQuestions[q.id]);

              let buttonStyle = 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
              if (isAnswered) buttonStyle = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-300';
              if (isCurrent) buttonStyle = 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-500/30';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-9 h-9 rounded-xl border text-xs font-black font-outfit shrink-0 transition-all flex items-center justify-center relative cursor-pointer ${buttonStyle}`}
                >
                  <span>{idx + 1}</span>
                  {isFlagged && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1 right-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Question Display Card */}
          {activeQuestion && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c141d] border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black font-outfit text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/60">
                    Soal No. {currentQuestionIndex + 1} dari {filteredQuestions.length}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Tingkat: {activeQuestion.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setFlaggedQuestions(prev => ({ ...prev, [activeQuestion.id]: !prev[activeQuestion.id] }));
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    flaggedQuestions[activeQuestion.id]
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[activeQuestion.id] ? 'Ragu-ragu (Ditandai)' : 'Tandai Ragu'}</span>
                </button>
              </div>

              {/* Case Vignette */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {activeQuestion.vignette}
              </div>

              {/* Core Question */}
              <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-outfit">
                {activeQuestion.question}
              </p>

              {/* Options A - E */}
              <div className="space-y-2.5">
                {activeQuestion.options.map((opt) => {
                  const isSelected = userAnswers[activeQuestion.id] === opt.key;
                  const isCorrect = activeQuestion.correctAnswer === opt.key;
                  const showAnswerValidation = cbtMode === 'study' && isSelected;

                  let optionStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900';
                  if (isSelected) {
                    optionStyle = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20';
                  }

                  if (showAnswerValidation) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold';
                    } else {
                      optionStyle = 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setUserAnswers(prev => ({ ...prev, [activeQuestion.id]: opt.key }));
                      }}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${optionStyle}`}
                    >
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs font-outfit shrink-0 ${
                        isSelected 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {opt.key}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 flex-1">
                        {opt.text}
                      </span>
                      {showAnswerValidation && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {showAnswerValidation && !isCorrect && (
                        <X className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Study Mode: Instant Rational Explanation */}
              {cbtMode === 'study' && userAnswers[activeQuestion.id] && (
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 space-y-2.5 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-900 dark:text-emerald-300 font-outfit">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Pembahasan Rasional Kunci Jawaban: {activeQuestion.correctAnswer}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-line">
                    {activeQuestion.explanation}
                  </p>
                  <div className="text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold pt-1">
                    📖 Referensi: {activeQuestion.clinicalReference}
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
                >
                  Sebelumnya
                </button>

                {currentQuestionIndex < filteredQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Selanjutnya
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsTryoutSubmitted(true);
                      setIsTimerRunning(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black shadow-lg cursor-pointer font-outfit"
                  >
                    Selesai & Kumpulkan Ujian
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Tryout Result Modal / Score Card */}
          {isTryoutSubmitted && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-500/40 shadow-2xl space-y-5 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Trophy className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black font-outfit">Hasil Rekapitulasi Tryout CBT</h3>
                  <p className="text-xs text-slate-300">Evaluasi skor ketuntasan uji kompetensi Anda.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-xs text-slate-400 font-bold">Skor Kelulusan</span>
                  <p className="text-3xl font-black font-outfit text-emerald-400 mt-1">{tryoutScore.percentage}%</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-xs text-slate-400 font-bold">Jawaban Benar</span>
                  <p className="text-3xl font-black font-outfit text-white mt-1">{tryoutScore.correctCount} / {tryoutScore.total}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-xs text-slate-400 font-bold">Status Prediksi</span>
                  <p className={`text-xl font-black font-outfit mt-2 ${tryoutScore.percentage >= 65 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {tryoutScore.percentage >= 65 ? 'LULUS (KOMPETEN)' : 'PERLU DRILLING'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsTryoutSubmitted(false);
                    setUserAnswers({});
                    setFlaggedQuestions({});
                    setTryoutTimeLeft(15 * 60);
                    setIsTimerRunning(true);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Ulangi Tryout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: KALKULATOR & RUMUS CEPAT HITUNGAN UKMPPAI                     */}
      {/* ========================================================================= */}
      {activeMainTab === 'calc' && (
        <div className="space-y-6">
          {/* Category Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              { id: 'alligation', label: 'Aligasi Silang', icon: FlaskConical },
              { id: 'hlb', label: 'HLB Campuran', icon: Layers },
              { id: 'tonicity', label: 'Tonisitas E-NaCl', icon: Sparkles },
              { id: 'pk', label: 'Farmakokinetika (LD/MD)', icon: Calculator },
              { id: 'crcl', label: 'Klirens Kreatinin (CrCl)', icon: Stethoscope },
              { id: 'hja', label: 'HJA, Margin & PPN', icon: Briefcase },
              { id: 'icer', label: 'Farmakoekonomi (ICER)', icon: TrendingUp },
              { id: 'consumption', label: 'Metode Konsumsi', icon: ClipboardList },
              { id: 'rop', label: 'Reorder Point (ROP)', icon: RotateCcw },
              { id: 'friability', label: 'Kerapuhan Tablet (%)', icon: Zap },
              { id: 'bsa', label: 'BSA Mosteller (m²)', icon: Baby }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCalcCategory(cat.id)}
                className={`p-3 rounded-2xl border text-center font-outfit text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  selectedCalcCategory === cat.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                    : 'bg-white dark:bg-[#0c141d] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Interactive Calculator Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0c141d] border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
            {/* 1. Aligasi Calculator */}
            {selectedCalcCategory === 'alligation' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator Aligasi Silang (Pengenceran Multi-Konsentrasi)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menghitung proporsi volume/bobot sediaan pekat dan encer untuk menghasilkan konsentrasi target.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Konsentrasi Tinggi (%)</label>
                    <input
                      type="number"
                      value={alliHigh}
                      onChange={(e) => setAlliHigh(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Konsentrasi Rendah (%)</label>
                    <input
                      type="number"
                      value={alliLow}
                      onChange={(e) => setAlliLow(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Konsentrasi Target (%)</label>
                    <input
                      type="number"
                      value={alliTarget}
                      onChange={(e) => setAlliTarget(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Volume Target (mL)</label>
                    <input
                      type="number"
                      value={alliVol}
                      onChange={(e) => setAlliVol(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Calculation Output */}
                {(() => {
                  const partHigh = Math.abs(alliTarget - alliLow);
                  const partLow = Math.abs(alliHigh - alliTarget);
                  const totalParts = partHigh + partLow;
                  const volHigh = totalParts > 0 ? (partHigh / totalParts) * alliVol : 0;
                  const volLow = totalParts > 0 ? (partLow / totalParts) * alliVol : 0;

                  return (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs space-y-2 font-medium text-emerald-950 dark:text-emerald-200">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300">Hasil Perhitungan Aligasi:</div>
                      <div>• Bagian Sediaan Tinggi ({alliHigh}%): <strong>{partHigh} bagian</strong> &rarr; Butuh <strong>{volHigh.toFixed(2)} mL</strong></div>
                      <div>• Bagian Sediaan Rendah ({alliLow}%): <strong>{partLow} bagian</strong> &rarr; Butuh <strong>{volLow.toFixed(2)} mL</strong></div>
                      <div>• Total Volume Akhir: <strong>{alliVol} mL ({alliTarget}%)</strong></div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 2. HLB Calculator */}
            {selectedCalcCategory === 'hlb' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator HLB Campuran Emulgator
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menghitung bobot masing-masing surfaktan (misal: Tween 80 & Span 80) untuk mencapai nilai RHLB emulsi.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">RHLB Target</label>
                    <input
                      type="number"
                      step="0.1"
                      value={hlbTarget}
                      onChange={(e) => setHlbTarget(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">HLB Surfaktan A (Tinggi)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={hlbA}
                      onChange={(e) => setHlbA(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">HLB Surfaktan B (Rendah)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={hlbB}
                      onChange={(e) => setHlbB(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Total Bobot Emulgator (gram)</label>
                    <input
                      type="number"
                      value={hlbTotalWeight}
                      onChange={(e) => setHlbTotalWeight(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {(() => {
                  const denom = hlbA - hlbB;
                  const weightA = denom !== 0 ? ((hlbTarget - hlbB) / denom) * hlbTotalWeight : 0;
                  const weightB = hlbTotalWeight - weightA;

                  return (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs space-y-2 font-medium text-emerald-950 dark:text-emerald-200">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300">Hasil Penimbangan Emulgator:</div>
                      <div>• Surfaktan A (HLB {hlbA}): <strong>{weightA.toFixed(2)} gram</strong> ({((weightA/hlbTotalWeight)*100).toFixed(1)}%)</div>
                      <div>• Surfaktan B (HLB {hlbB}): <strong>{weightB.toFixed(2)} gram</strong> ({((weightB/hlbTotalWeight)*100).toFixed(1)}%)</div>
                      <div>• Total Campuran: <strong>{hlbTotalWeight} gram (RHLB {hlbTarget})</strong></div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 3. Tonicity Calculator */}
            {selectedCalcCategory === 'tonicity' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator Tonisitas & Ekivalensi NaCl (Metode E-NaCl)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menghitung kekurangan bobot NaCl murni agar sediaan tetes mata atau injeksi mencapai kondisi isotonis (setara NaCl 0,9%).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Volume Sediaan (mL)</label>
                    <input
                      type="number"
                      value={tonicVol}
                      onChange={(e) => setTonicVol(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Bobot Zat Aktif (gram)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={tonicDrugWeight}
                      onChange={(e) => setTonicDrugWeight(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Nilai Ekivalensi NaCl (E)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={tonicEVal}
                      onChange={(e) => setTonicEVal(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {(() => {
                  const reqNacl = (0.9 / 100) * tonicVol;
                  const suppliedNacl = tonicDrugWeight * tonicEVal;
                  const deficit = Math.max(0, reqNacl - suppliedNacl).toFixed(3);

                  return (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs space-y-2 font-medium text-emerald-950 dark:text-emerald-200">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300">Hasil Perhitungan Isotonisitas:</div>
                      <div>• Kebutuhan NaCl isotonis murni: <strong>{reqNacl.toFixed(3)} gram</strong></div>
                      <div>• Tonisitas dari zat aktif: <strong>{suppliedNacl.toFixed(3)} gram setara NaCl</strong></div>
                      <div>• <strong>Kekurangan NaCl yang wajib ditambahkan: {deficit} gram</strong></div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 4. PK Calculator */}
            {selectedCalcCategory === 'pk' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator Farmakokinetika Klinis (Loading Dose, Maintenance Dose, t1/2)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menghitung dosis muatan awal dan laju infus pemeliharaan obat indeks terapi sempit.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Target Kadar Tunak Css (mg/L)</label>
                    <input
                      type="number"
                      value={pkCss}
                      onChange={(e) => setPkCss(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Volume Distribusi Vd (Liter)</label>
                    <input
                      type="number"
                      value={pkVd}
                      onChange={(e) => setPkVd(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Klirens Total Cl (L/jam)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={pkCl}
                      onChange={(e) => setPkCl(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {(() => {
                  const ld = (pkCss * pkVd).toFixed(1);
                  const md = (pkCss * pkCl).toFixed(1);
                  const kel = pkVd > 0 ? (pkCl / pkVd) : 0;
                  const tHalf = kel > 0 ? (0.693 / kel).toFixed(2) : '0';

                  return (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs space-y-2 font-medium text-emerald-950 dark:text-emerald-200">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300">Hasil Perhitungan Farmakokinetika:</div>
                      <div>• Loading Dose (LD): <strong>{ld} mg</strong> (IV Bolus Awal)</div>
                      <div>• Maintenance Dose (MD): <strong>{md} mg / jam</strong> (Laju Infus Kontinu)</div>
                      <div>• Konstanta Eliminasi (Kel): <strong>{kel.toFixed(4)} jam⁻¹</strong></div>
                      <div>• Waktu Paruh Eliminasi (t½): <strong>{tHalf} jam</strong></div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 5. HJA Calculator */}
            {selectedCalcCategory === 'hja' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator HJA, Margin & Pajak PPN Apotek
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menghitung harga jual apotek berdasarkan harga netto beli PBF, PPN, dan target margin.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Harga Netto Beli PBF (Rp)</label>
                    <input
                      type="number"
                      step="1000"
                      value={hjaHpp}
                      onChange={(e) => setHjaHpp(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Tarif PPN (%)</label>
                    <input
                      type="number"
                      value={hjaPpnRate}
                      onChange={(e) => setHjaPpnRate(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Target Margin dari HJA (%)</label>
                    <input
                      type="number"
                      value={hjaMarginPercent}
                      onChange={(e) => setHjaMarginPercent(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {(() => {
                  const hppWithPpn = hjaHpp * (1 + (hjaPpnRate / 100));
                  const marginFrac = hjaMarginPercent / 100;
                  const hjaFinal = marginFrac < 1 ? (hppWithPpn / (1 - marginFrac)) : 0;
                  const grossProfit = hjaFinal - hppWithPpn;

                  return (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs space-y-2 font-medium text-emerald-950 dark:text-emerald-200">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300">Hasil Penentuan Harga Jual Apotek:</div>
                      <div>• HPP Termasuk PPN: <strong>Rp {Math.round(hppWithPpn).toLocaleString('id-ID')}</strong></div>
                      <div>• <strong>Harga Jual Apotek (HJA): Rp {Math.round(hjaFinal).toLocaleString('id-ID')}</strong></div>
                      <div>• Laba Kotor per Unit: <strong>Rp {Math.round(grossProfit).toLocaleString('id-ID')}</strong></div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 6. ICER Calculator */}
            {selectedCalcCategory === 'icer' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator Farmakoekonomi (ICER - Incremental Cost-Effectiveness Ratio)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menghitung rasio penambahan biaya yang dibutuhkan untuk menghasilkan setiap satu unit peningkatan efektivitas klinis baru.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Biaya Terapi A (Rp)</label>
                    <input
                      type="number"
                      step="10000"
                      value={icerCostA}
                      onChange={(e) => setIcerCostA(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Efektivitas Terapi A</label>
                    <input
                      type="number"
                      step="0.1"
                      value={icerEffectA}
                      onChange={(e) => setIcerEffectA(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Biaya Terapi B (Rp)</label>
                    <input
                      type="number"
                      step="10000"
                      value={icerCostB}
                      onChange={(e) => setIcerCostB(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Efektivitas Terapi B</label>
                    <input
                      type="number"
                      step="0.1"
                      value={icerEffectB}
                      onChange={(e) => setIcerEffectB(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {(() => {
                  const deltaCost = icerCostB - icerCostA;
                  const deltaEffect = icerEffectB - icerEffectA;
                  const icerValue = deltaEffect !== 0 ? (deltaCost / deltaEffect) : 0;

                  return (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs space-y-2 font-medium text-emerald-950 dark:text-emerald-200">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300">Hasil Evaluasi Farmakoekonomi:</div>
                      <div>• Selisih Biaya (ΔC): <strong>Rp {deltaCost.toLocaleString('id-ID')}</strong></div>
                      <div>• Selisih Efektivitas (ΔE): <strong>{deltaEffect.toFixed(2)} unit</strong></div>
                      <div>• <strong>Nilai ICER: Rp {Math.round(icerValue).toLocaleString('id-ID')} per tambahan unit efektivitas</strong></div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        *Pedoman Kemenkes RI: Terapi dinilai <em>Cost-Effective</em> jika ICER &lt; 1-3x PDB per kapita Indonesia (~Rp 75-225 juta).
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 7. Consumption Planning Calculator */}
            {selectedCalcCategory === 'consumption' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator Perencanaan Pengadaan: Metode Konsumsi
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menghitung kuantitas riil obat yang harus dipesan dengan mempertimbangkan rata-rata konsumsi, waktu tunggu PBF, safety stock, dan sisa persediaan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Pemakaian Rerata/Bulan</label>
                    <input
                      type="number"
                      value={consAvg}
                      onChange={(e) => setConsAvg(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Periode Rencana (Bulan)</label>
                    <input
                      type="number"
                      value={consPeriod}
                      onChange={(e) => setConsPeriod(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Lead Time PBF (Bulan)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={consLeadTime}
                      onChange={(e) => setConsLeadTime(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Safety Stock (Unit)</label>
                    <input
                      type="number"
                      value={consBuffer}
                      onChange={(e) => setConsBuffer(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Sisa Stok Gudang (Unit)</label>
                    <input
                      type="number"
                      value={consCurrentStock}
                      onChange={(e) => setConsCurrentStock(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {(() => {
                  const periodNeed = consAvg * consPeriod;
                  const leadTimeNeed = consAvg * consLeadTime;
                  const totalNeed = periodNeed + leadTimeNeed + consBuffer;
                  const orderQuantity = Math.max(0, totalNeed - consCurrentStock);

                  return (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs space-y-2 font-medium text-emerald-950 dark:text-emerald-200">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300">Hasil Rencana Pengadaan (SP):</div>
                      <div>• Kebutuhan Selama Periode ({consPeriod} bln): <strong>{periodNeed.toLocaleString('id-ID')} unit</strong></div>
                      <div>• Kebutuhan Lead Time ({consLeadTime} bln): <strong>{leadTimeNeed.toLocaleString('id-ID')} unit</strong></div>
                      <div>• Safety Stock: <strong>{consBuffer.toLocaleString('id-ID')} unit</strong></div>
                      <div>• Total Estimasi Kebutuhan: <strong>{totalNeed.toLocaleString('id-ID')} unit</strong></div>
                      <div>• <strong>Kuantitas Pengadaan Riil yang Dipesan: {orderQuantity.toLocaleString('id-ID')} unit</strong></div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 8. Friability Calculator */}
            {selectedCalcCategory === 'friability' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator Uji Kerapuhan Tablet (Friability Test)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menguji persentase bobot tablet yang tergerus setelah pemutaran 100 putaran pada alat friabilator (Syarat FI VI: &lt; 1,0%).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Bobot Awal Tablet (W1) dalam gram</label>
                    <input
                      type="number"
                      step="0.01"
                      value={friaW1}
                      onChange={(e) => setFriaW1(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Bobot Akhir Tablet (W2) dalam gram</label>
                    <input
                      type="number"
                      step="0.01"
                      value={friaW2}
                      onChange={(e) => setFriaW2(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {(() => {
                  const weightLoss = friaW1 - friaW2;
                  const friabilityPercent = friaW1 > 0 ? (weightLoss / friaW1) * 100 : 0;
                  const isPassed = friabilityPercent < 1.0 && friabilityPercent >= 0;

                  return (
                    <div className={`p-4 rounded-2xl border text-xs space-y-2 font-medium ${
                      isPassed
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                    }`}>
                      <div className="font-bold">Hasil Uji Kerapuhan:</div>
                      <div>• Selisih Bobot Hilang: <strong>{weightLoss.toFixed(3)} gram</strong></div>
                      <div>• <strong>Persentase Kerapuhan (% F): {friabilityPercent.toFixed(3)}%</strong></div>
                      <div className="flex items-center gap-1.5 font-bold">
                        <span>Status Kelulusan Farmakope:</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] text-white ${isPassed ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                          {isPassed ? 'LULUS (Memenuhi Syarat < 1,0%)' : 'TIDAK LULUS (Kerapuhan >= 1,0%)'}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 9. BSA Mosteller Calculator */}
            {selectedCalcCategory === 'bsa' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator Luas Permukaan Tubuh (BSA Mosteller)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menghitung Body Surface Area (BSA) untuk penentuan dosis pediatrik, kemoterapi sitostatika, dan obat dengan indeks terapi sempit.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Tinggi Badan (cm)</label>
                    <input
                      type="number"
                      value={bsaHeight}
                      onChange={(e) => setBsaHeight(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 mb-1 block">Berat Badan (kg)</label>
                    <input
                      type="number"
                      value={bsaWeight}
                      onChange={(e) => setBsaWeight(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {(() => {
                  const bsaVal = Math.sqrt((bsaHeight * bsaWeight) / 3600);

                  return (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs space-y-2 font-medium text-emerald-950 dark:text-emerald-200">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300">Hasil Perhitungan BSA:</div>
                      <div>• Tinggi: <strong>{bsaHeight} cm</strong> | Berat: <strong>{bsaWeight} kg</strong></div>
                      <div>• <strong>Nilai BSA (Mosteller): {bsaVal.toFixed(3)} m²</strong></div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        *Rumus Dosis Anak = (BSA Pasien / 1,73 m²) x Dosis Dewasa Standar.
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 10. CrCl Cockcroft-Gault Calculator */}
            {selectedCalcCategory === 'crcl' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator Klirens Kreatinin (Cockcroft-Gault) & Penyesuaian Dosis Ginjal
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Estimasi Klirens Kreatinin (CrCl) berbasis usia, berat badan, serum kreatinin, dan jenis kelamin.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">Usia Pasien (Tahun):</label>
                    <input
                      type="number"
                      value={crclAge}
                      onChange={(e) => setCrclAge(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">Berat Badan (kg):</label>
                    <input
                      type="number"
                      value={crclWeight}
                      onChange={(e) => setCrclWeight(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">Serum Kreatinin (mg/dL):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={crclScr}
                      onChange={(e) => setCrclScr(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">Jenis Kelamin:</label>
                    <select
                      value={crclGender}
                      onChange={(e) => setCrclGender(e.target.value as 'male' | 'female')}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="male">Laki-laki (Faktor = 1,00)</option>
                      <option value="female">Perempuan (Faktor = 0,85)</option>
                    </select>
                  </div>
                </div>

                {(() => {
                  const baseCrCl = crclScr > 0 ? ((140 - crclAge) * crclWeight) / (72 * crclScr) : 0;
                  const finalCrCl = crclGender === 'female' ? baseCrCl * 0.85 : baseCrCl;
                  
                  let stageText = 'Normal / Minimal (Stage 1)';
                  let stageColor = 'text-emerald-600 dark:text-emerald-400';
                  let recText = 'Dosis obat standar normal. Pantau fungsi ginjal berkala.';

                  if (finalCrCl < 15) {
                    stageText = 'Gagal Ginjal Terminal / End-Stage (Stage 5)';
                    stageColor = 'text-rose-600 dark:text-rose-400';
                    recText = 'Dosis obat harus diturunkan drastis (75-80%) atau interval diperpanjang. Hentikan obat nefrotoksik & Metformin.';
                  } else if (finalCrCl < 30) {
                    stageText = 'Gangguan Ginjal Berat (Stage 4)';
                    stageColor = 'text-orange-600 dark:text-orange-400';
                    recText = 'KONTRAINDIKASI Metformin (risiko Asidosis Laktat). Dosis antibiotik (Cefepime, Meropenem) diturunkan 50%.';
                  } else if (finalCrCl < 60) {
                    stageText = 'Gangguan Ginjal Sedang (Stage 3)';
                    stageColor = 'text-amber-600 dark:text-amber-400';
                    recText = 'Pertimbangkan penyesuaian dosis obat dengan eliminasi ginjal tinggi. Metformin maksimal 1000 mg/hari jika eGFR 30-44.';
                  } else if (finalCrCl < 90) {
                    stageText = 'Gangguan Ginjal Ringan (Stage 2)';
                    stageColor = 'text-teal-600 dark:text-teal-400';
                    recText = 'Fungsi ginjal sedikit menurun, umumnya dosis obat standar masih dapat ditoleransi.';
                  }

                  return (
                    <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 text-xs space-y-2 font-medium text-teal-950 dark:text-teal-200">
                      <div className="font-bold text-teal-900 dark:text-teal-300 text-sm">Hasil Estimasi Klirens Kreatinin (CrCl):</div>
                      <div className="text-base font-black font-outfit text-teal-700 dark:text-teal-300">
                        CrCl = {finalCrCl > 0 ? finalCrCl.toFixed(2) : 0} mL/min
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-teal-200/60 dark:border-teal-800/60">
                        <div>
                          • Klasifikasi Fungsi: <strong className={stageColor}>{stageText}</strong>
                        </div>
                        <div>
                          • Jenis Kelamin: <strong>{crclGender === 'female' ? 'Perempuan (x 0,85)' : 'Laki-laki (x 1,00)'}</strong>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 pt-1">
                        <strong>Rekomendasi Farmasi Klinis:</strong> {recText}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 11. Reorder Point (ROP) Calculator */}
            {selectedCalcCategory === 'rop' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    Kalkulator Titik Pemesanan Kembali (Reorder Point / ROP)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Kalkulasi batas kuantitas minimum untuk menerbitkan Surat Pesanan (SP) baru ke distributor PBF.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">Waktu Tunggu / Lead Time (Hari):</label>
                    <input
                      type="number"
                      value={ropLeadTime}
                      onChange={(e) => setRopLeadTime(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">Rata-Rata Pemakaian Harian (Unit/Hari):</label>
                    <input
                      type="number"
                      value={ropDailyUsage}
                      onChange={(e) => setRopDailyUsage(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 mb-1">Stok Pengaman / Safety Stock (Unit):</label>
                    <input
                      type="number"
                      value={ropSafetyStock}
                      onChange={(e) => setRopSafetyStock(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {(() => {
                  const leadTimeStock = ropLeadTime * ropDailyUsage;
                  const totalRop = leadTimeStock + ropSafetyStock;

                  return (
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs space-y-2 font-medium text-amber-950 dark:text-amber-200">
                      <div className="font-bold text-amber-900 dark:text-amber-300 text-sm">Hasil Perhitungan Reorder Point:</div>
                      <div className="text-base font-black font-outfit text-amber-700 dark:text-amber-300">
                        Titik Reorder (ROP) = {totalRop} Unit
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-800/60">
                        <div>
                          • Kebutuhan Selama Lead Time: <strong>{leadTimeStock} Unit</strong> ({ropLeadTime} hari × {ropDailyUsage} unit)
                        </div>
                        <div>
                          • Cadangan Pengaman (Safety Stock): <strong>{ropSafetyStock} Unit</strong>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 pt-1">
                        <strong>Instruksi Pengadaan Apotek:</strong> Segera terbitkan Surat Pesanan (SP) baru ke PBF ketika sisa fisik obat di rak apotek telah menyentuh angka <strong>{totalRop} Unit</strong>.
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ========================================================================= */}
            {/* EDUKASI MATERI, PENJELASAN RUMUS & CONTOH KASUS CBT UKMPPAI & UKTVF     */}
            {/* ========================================================================= */}
            {(() => {
              const currentFormulaDetail = CALCULATION_FORMULA_DETAILS[selectedCalcCategory];
              if (!currentFormulaDetail) return null;

              return (
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6 animate-fade-in">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-teal-500/15 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-teal-700 dark:text-teal-400 font-outfit">
                          Modul Pembelajaran Resmi • {currentFormulaDetail.categoryName}
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-outfit">
                          Penjelasan Rumus & Teori: {currentFormulaDetail.title}
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-outfit">
                      {currentFormulaDetail.badgeDomain}
                    </span>
                  </div>

                  {/* 1. Rumus Matematika Resmi & Notasi */}
                  <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-md space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-300 font-outfit uppercase tracking-wider">
                      <Calculator className="w-4 h-4 text-teal-400" />
                      <span>Formula Matematis Baku:</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-xs sm:text-sm bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-emerald-300">
                      {currentFormulaDetail.mathFormula.map((formula, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-slate-500 select-none">▶</span>
                          <span className="font-bold">{formula}</span>
                        </div>
                      ))}
                    </div>

                    {/* Penjelasan Notasi / Variabel */}
                    <div className="pt-2 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {currentFormulaDetail.variableExplanations.map((v, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                          <span className="font-bold text-teal-200 font-outfit">{v.symbol}</span>: <span className="text-slate-300">{v.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Konsep Dasar & Alur Langkah Kerja */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Konsep */}
                    <div className="p-5 rounded-3xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/50 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-teal-900 dark:text-teal-300 font-outfit uppercase tracking-wider">
                        <Info className="w-4 h-4 text-teal-600" />
                        <span>Konsep Dasar & Teori Farmasetika:</span>
                      </div>
                      <p className="text-xs text-teal-950 dark:text-teal-100/90 leading-relaxed font-medium">
                        {currentFormulaDetail.conceptExplanation}
                      </p>
                    </div>

                    {/* Langkah Kerja */}
                    <div className="p-5 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300 font-outfit uppercase tracking-wider">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                        <span>Alur Langkah Perhitungan Manual:</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-indigo-950 dark:text-indigo-100/90 font-medium">
                        {currentFormulaDetail.stepByStepGuide.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 3. Contoh Kasus Nyata Soal CBT UKMPPAI & Langkah Hitung Manual */}
                  <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-4">
                    <div className="flex items-center justify-between border-b border-amber-200/80 dark:border-amber-900/60 pb-3">
                      <div className="flex items-center gap-2 text-xs font-black text-amber-950 dark:text-amber-300 font-outfit uppercase tracking-wider">
                        <Trophy className="w-4 h-4 text-amber-600" />
                        <span>Contoh Kasus Soal CBT Vignette & Pembahasan Lengkap:</span>
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                        Standar Ujian
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <p className="text-amber-950 dark:text-amber-200 leading-relaxed font-semibold italic">
                        "{currentFormulaDetail.exampleCase.vignette}"
                      </p>
                      <p className="text-slate-900 dark:text-white font-black font-outfit">
                        Pertanyaan: {currentFormulaDetail.exampleCase.question}
                      </p>
                    </div>

                    {/* Langkah Pembahasan */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#0c141d] border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Langkah Penyelesaian Matematis Manual:</span>
                      </div>
                      <div className="space-y-1 text-slate-700 dark:text-slate-300 font-mono text-[11px] leading-relaxed">
                        {currentFormulaDetail.exampleCase.stepByStepCalculation.map((calc, idx) => (
                          <div key={idx} className="p-1 rounded bg-slate-50 dark:bg-slate-800/60">
                            {calc}
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 font-bold text-emerald-700 dark:text-emerald-400">
                        🎯 Kesimpulan Jawaban: {currentFormulaDetail.exampleCase.finalAnswer}
                      </div>
                    </div>
                  </div>

                  {/* 4. Tips Kritis Ujian & Rujukan Resmi */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-950 dark:text-rose-300 font-outfit">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>Poin Kritis & Jebakan Ujian (Exam Key Pearls):</span>
                      </div>
                      <ul className="list-disc list-inside text-xs text-rose-950 dark:text-rose-200 space-y-1 font-medium leading-relaxed">
                        {currentFormulaDetail.examKeyPearls.map((pearl, idx) => (
                          <li key={idx}>{pearl}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white font-outfit">
                          <BookMarked className="w-4 h-4 text-teal-600" />
                          <span>Sumber Kepustakaan & Rujukan Baku:</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {currentFormulaDetail.referenceStandard}
                        </p>
                      </div>
                      <div className="text-[11px] text-teal-700 dark:text-teal-400 font-bold pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Tervalidasi sesuai Blueprint Uji Kompetensi Apoteker & TTK Indonesia</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: PANDUAN STASI PRAKTIK OSCE                                     */}
      {/* ========================================================================= */}
      {activeMainTab === 'osce' && (
        <div className="space-y-6">
          {/* Station Selector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {OSCE_STATIONS.map((station) => {
              const isSelected = selectedOsceId === station.id;
              return (
                <button
                  key={station.id}
                  onClick={() => setSelectedOsceId(station.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer font-outfit ${
                    isSelected
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-[#0c141d] border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                      {station.stationType}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {station.durationMinutes} Menit
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-2">
                    {station.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Station Detail & Checklist */}
          {activeOsceStation && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c141d] border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-outfit">
                      {activeOsceStation.stationType}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Standar Waktu Uji: {activeOsceStation.durationMinutes} Menit
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit mt-1.5">
                    {activeOsceStation.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-outfit">Skor Praktik Anda</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-outfit">
                      {osceTotalScore} / 100 Poin
                    </span>
                  </div>
                  <div className="text-xs font-black px-2 py-1 rounded-lg bg-emerald-600 text-white font-outfit">
                    {osceTotalScore}%
                  </div>
                </div>
              </div>

              {/* Skenario Kasus & Script Pasien */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 font-outfit">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>Instruksi Soal / Tugas Peserta (Candidate Task):</span>
                  </div>
                  <p className="text-xs text-amber-950 dark:text-amber-200/90 leading-relaxed">
                    {activeOsceStation.candidateTask}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300 font-outfit">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>Respon / Skenario Pasien Standar (Simulated Patient):</span>
                  </div>
                  <p className="text-xs text-indigo-950 dark:text-indigo-200/90 leading-relaxed italic">
                    "{activeOsceStation.simulatedPatientScript}"
                  </p>
                </div>
              </div>

              {/* Checklist Penguji */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-slate-900 dark:text-white font-outfit flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Rubrik Penilaian Objektif Stasi (Evaluator Checklist):</span>
                </h4>

                <div className="space-y-2">
                  {activeOsceStation.criticalChecklist.map((item, idx) => {
                    const itemKey = `${activeOsceStation.id}-${idx}`;
                    const isChecked = completedChecklistItems[itemKey] || false;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setCompletedChecklistItems(prev => ({ ...prev, [itemKey]: !prev[itemKey] }));
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isChecked
                            ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>

                        <div className="flex-1 text-xs space-y-0.5">
                          <div className="flex items-center justify-between font-bold">
                            <span className="font-outfit text-slate-900 dark:text-white">{item.step}</span>
                            <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">+{item.points} Poin</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tips Penguji */}
              {activeOsceStation.examinerTips && activeOsceStation.examinerTips.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-900 dark:text-rose-300 font-outfit">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Poin Kritis Penguji (Critical Assessment Pearls):</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-rose-950 dark:text-rose-200/90 space-y-1">
                    {activeOsceStation.examinerTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 5: FLASHCARD DIGITAL & HAFALAN KILAT                                */}
      {/* ========================================================================= */}
      {activeMainTab === 'flashcards' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {['all', 'Antidotum', 'Efek Samping Khas', 'Nilai Normal Lab', 'Mekanisme Obat (MoA)', 'Interaksi Kritis', 'Regulasi & DOWA', 'Singkatan Latin & BUD'].map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setFlashcardCategory(cat);
                    setCurrentFlashcardIdx(0);
                    setIsCardFlipped(false);
                    setShowCardHint(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-outfit ${
                    flashcardCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'Semua Kategori' : cat}
                </button>
              ))}
            </div>

            <button
              onClick={handleShuffleCards}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Acak Kartu</span>
            </button>
          </div>

          {/* Interactive 3D Flip Flashcard */}
          {activeCard && (
            <div className="max-w-xl mx-auto space-y-4">
              <div
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className={`min-h-[280px] sm:min-h-[320px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-center border cursor-pointer transition-all duration-300 shadow-xl ${
                  isCardFlipped
                    ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white border-emerald-500/50 shadow-emerald-500/10'
                    : 'bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#0d1622] dark:to-[#080d14] text-slate-900 dark:text-white border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Card Top Label */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold px-2.5 py-0.5 rounded-full bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 font-outfit">
                    {activeCard.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Kartu {currentFlashcardIdx + 1} / {filteredFlashcards.length}
                  </span>
                </div>

                {/* Card Main Text */}
                <div className="py-6 space-y-3">
                  {!isCardFlipped ? (
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-2 font-outfit">
                        Pertanyaan / Soal:
                      </span>
                      <h3 className="text-base sm:text-xl font-black font-outfit leading-relaxed">
                        {activeCard.frontText}
                      </h3>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-4 font-bold flex items-center justify-center gap-1">
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Klik kartu untuk membalik & melihat jawaban</span>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold block mb-2 font-outfit">
                        Jawaban & Penjelasan:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium whitespace-pre-line text-left">
                        {activeCard.backText}
                      </p>
                    </div>
                  )}
                </div>

                {/* Hint Bar */}
                <div className="text-xs">
                  {showCardHint ? (
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300 text-[11px] font-medium">
                      💡 Petunjuk: {activeCard.hint}
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCardHint(true);
                      }}
                      className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
                    >
                      Buka Petunjuk (Hint)
                    </button>
                  )}
                </div>
              </div>

              {/* Flip & Next Controls */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrevCard}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Sebelumnya
                </button>

                <button
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Balik Kartu</span>
                </button>

                <button
                  onClick={handleNextCard}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
