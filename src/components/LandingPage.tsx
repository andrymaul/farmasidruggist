import React, { useState, useMemo } from 'react';
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
  Copy,
  CheckCheck,
  Building2,
  Smartphone,
  Send,
  Brain,
  RotateCcw
} from 'lucide-react';
import { resolveDrugFromDDInter, resolveInteractionPair } from '../utils/ddinterEngine';

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
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<'ddi' | 'bud' | 'pregnancy' | 'whatsapp' | 'ukmppai'>('ddi');

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

  // =========================================================================
  // 2. PLAYGROUND: BUD CALCULATOR SAMPLE
  // =========================================================================
  const [selectedBudType, setSelectedBudType] = useState<'puyer' | 'sirup_oral' | 'salep_krim' | 'dry_syrup'>('puyer');
  const [rawMaterialEdMonths, setRawMaterialEdMonths] = useState<number>(12);

  const calculatedBudResult = useMemo(() => {
    if (selectedBudType === 'puyer') {
      const calculatedMonths = Math.min(6, Math.floor(rawMaterialEdMonths * 0.25));
      return {
        standard: 'USP <795> Non-Aqueous Solid',
        budPeriod: `${calculatedMonths > 0 ? calculatedMonths : 1} Bulan (${(calculatedMonths > 0 ? calculatedMonths : 1) * 30} Hari)`,
        storage: 'Suhu Kamar Terkontrol (20°C - 25°C), wadah tertutup rapat & kering',
        rule: `25% dari sisa ED bahan baku (${rawMaterialEdMonths} bln x 25% = ${rawMaterialEdMonths * 0.25} bln) atau maks 6 bulan.`
      };
    } else if (selectedBudType === 'sirup_oral') {
      return {
        standard: 'USP <795> Water-Containing Oral Formulations',
        budPeriod: 'Maksimal 14 Hari',
        storage: 'Wajib Lemari Pendingin (2°C - 8°C), jangan dibekukan',
        rule: 'Sediaan cair oral berair rentan hidrolisis & kontaminasi mikroba.'
      };
    } else if (selectedBudType === 'salep_krim') {
      return {
        standard: 'USP <795> Water-Containing Topical Formulations',
        budPeriod: 'Maksimal 30 Hari',
        storage: 'Suhu Kamar Terkontrol (20°C - 25°C), terlindung dari sinar matahari langsung',
        rule: 'Sediaan topikal semipadat (krim/gel berair) dengan pengawet.'
      };
    } else {
      return {
        standard: 'Standar Rekonstitusi Pabrik (Commercial Dry Syrup)',
        budPeriod: '7 - 14 Hari (Sesuai Brosur)',
        storage: 'Lemari Pendingin (2°C - 8°C) untuk sirup Amoksisilin / Cefixime',
        rule: 'Setelah dilarutkan dengan Aquades, perhatikan degradasi cincin beta-laktam.'
      };
    }
  }, [selectedBudType, rawMaterialEdMonths]);

  // =========================================================================
  // 3. PLAYGROUND: PREGNANCY & LACTATION SAMPLE
  // =========================================================================
  const samplePregnancyDrugs = [
    { name: 'Methyldopa', fda: 'B', hale: 'L2', safe: true, info: 'Pilihan utama antihipertensi gestasional & preeklamsia trimester 1-3.' },
    { name: 'Captopril / ACEI', fda: 'D', hale: 'L2', safe: false, info: 'KONTRAINDIKASI Trimester 2-3 (Risiko gagal ginjal janin & oligohidramnion).' },
    { name: 'Paracetamol', fda: 'B', hale: 'L1', safe: true, info: 'Analgesik & antipiretik lini pertama teraman untuk ibu hamil & menyusui.' },
    { name: 'Warfarin', fda: 'X', hale: 'L2', safe: false, info: 'KONTRAINDIKASI Kategori X (Sindrom Warfarin Fetal, hipoplasia hidung & pendarahan).' }
  ];
  const [selectedPregDrug, setSelectedPregDrug] = useState(samplePregnancyDrugs[0]);

  // =========================================================================
  // 4. PLAYGROUND: WHATSAPP PIO CARD SAMPLE
  // =========================================================================
  const [waPatientName, setWaPatientName] = useState('Ny. Siti Rahma (54 Th)');
  const [waCopied, setWaCopied] = useState(false);

  const sampleWaText = `*KLINIK & APOTEK FARMASIDRUGGIST*\n*KARTU INFORMASI OBAT & PIO PASIEN*\n----------------------------------------\n*Nama Pasien:* ${waPatientName}\n*Tanggal Pelayanan:* ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}\n\n*DAFTAR RESEP & ATURAN PAKAI:*\n1. *Amlodipine 10 mg* : 1x1 tablet pagi hari (sesudah makan)\n2. *Metformin 500 mg* : 2x1 tablet bersama/sesudah makan\n3. *Atorvastatin 20 mg* : 1x1 tablet malam hari sebelum tidur\n\n*PERINGATAN & EDUKASI KHUSUS:*\n- Hindari konsumsi jus grapefruit saat minum Amlodipine/Atorvastatin.\n- Simpan obat pada suhu ruang (< 30°C) kering dan jauh dari jangkauan anak.\n\n_Semoga lekas sembuh! Konsultasi farmasi hubungi Apoteker kami._`;

  const handleCopyWa = () => {
    navigator.clipboard.writeText(sampleWaText);
    setWaCopied(true);
    setTimeout(() => setWaCopied(false), 2500);
  };

  // =========================================================================
  // 5. PLAYGROUND: UKMPPAI CBT FLASHCARD SAMPLE
  // =========================================================================
  const [ukmppaiSelectedOption, setUkmppaiSelectedOption] = useState<number | null>(null);
  const sampleQuiz = {
    domain: 'Farmasi Klinis & Farmakoterapi',
    question: 'Seorang pasien pria 58 tahun dengan riwayat Gagal Jantung (HFrEF) dan Hipertensi mengonsumsi Digoxin. Pasien kemudian diresepkan Amiodarone untuk aritmia. Apa interaksi klinis yang wajib diwaspadai dan tindakan apoteker?',
    options: [
      'Amiodarone menurunkan klirens Digoxin via inhibisi P-gp; Turunkan dosis Digoxin 30-50% dan pantau kadar serum.',
      'Amiodarone menginduksi metabolisme CYP3A4 Digoxin; Naikkan dosis Digoxin 2 kali lipat.',
      'Digoxin menurunkan absorpsi Amiodarone di usus; Berikan jeda 2 jam saat minum.',
      'Tidak ada interaksi signifikan karena rute ekskresi berbeda total.'
    ],
    correctIndex: 0,
    explanation: 'Amiodarone merupakan inhibitor kuat glikoprotein-P (P-gp) di tubulus ginjal dan empedu. Pemberian bersamaan meningkatkan kadar serum Digoxin hingga 70-100%, memicu aritmia fatal dan toksisitas digitalis. Rekomendasi klinis: Turunkan dosis Digoxin sebesar 30-50% dan lakukan TDM (Therapeutic Drug Monitoring).'
  };

  const activePlans = pricingPlans && pricingPlans.length > 0 ? pricingPlans : PRICING_PLANS;

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      if (onSearchDrug) onSearchDrug(heroSearch);
      onSelectTab('drugs');
    }
  };

  // =========================================================================
  // 18-MODULE DASHBOARD DIRECTORY DATA
  // =========================================================================
  const moduleCategories = [
    {
      categoryName: '1. Skrining Resep & Keamanan Klinis',
      categoryDesc: 'Mesin deteksi risiko interaksi obat, uji lab semu, jamu, toksisitas organ, dan inkompatibilitas infus.',
      accentColor: 'rose',
      modules: [
        {
          id: 'interactions',
          title: 'Cek Interaksi Obat (DDInter)',
          desc: 'Skrining interaksi multi-obat simultan, level keparahan (Major/Mod/Minor), mekanisme farmakokinetik & laporan PDF.',
          icon: ShieldAlert,
          badge: 'DDInter & Drugs.com',
          badgeColor: 'bg-rose-600 text-white',
          color: 'text-rose-600 dark:text-rose-400',
          bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60'
        },
        {
          id: 'pregnancy',
          title: 'Keamanan Bumil & Busui',
          desc: 'Kategori FDA PLLR per Trimester (1/2/3) & skor laktasi Hale (L1–L5), dosis relatif bayi (RID), dan alternatif obat aman.',
          icon: HeartHandshake,
          badge: 'FDA PLLR & Hale',
          badgeColor: 'bg-pink-600 text-white',
          color: 'text-pink-600 dark:text-pink-400',
          bg: 'bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800/60'
        },
        {
          id: 'drug-lab',
          title: 'Interaksi Obat & Uji Lab',
          desc: 'Deteksi hasil lab palsu/semu (Troponin, Kreatinin, Tiroid, Elektrolit) akibat interferensi analitik obat.',
          icon: FlaskConical,
          badge: 'Uji Lab Semu',
          badgeColor: 'bg-cyan-700 text-white',
          color: 'text-cyan-700 dark:text-cyan-400',
          bg: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/60'
        },
        {
          id: 'herb-drug',
          title: 'Interaksi Herbal & Obat Resep',
          desc: 'Penapisan interaksi jamu, OHT, dan fitofarmaka Indonesia (FOHI) vs obat resep dokter.',
          icon: Leaf,
          badge: 'Jamu & FOHI',
          badgeColor: 'bg-emerald-800 text-white',
          color: 'text-emerald-800 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
        },
        {
          id: 'side-effects',
          title: 'Cek Efek Samping & Skor Naranjo',
          desc: 'Evaluasi toksisitas organ (Hepatotoksisitas, Nefrotoksisitas), pelacak gejala pasien & algoritma probabilitas ADR Naranjo.',
          icon: Activity,
          badge: 'ADR & Naranjo',
          badgeColor: 'bg-amber-600 text-white',
          color: 'text-amber-600 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60'
        },
        {
          id: 'iv-compatibility',
          title: 'Kompatibilitas Injeksi IV & ICU',
          desc: 'Skrining Y-Site injeksi & kompatibilitas pelarut infus ICU berdasarkan standar ASHP Trissel’s 2024.',
          icon: Syringe,
          badge: 'ASHP Trissel’s',
          badgeColor: 'bg-cyan-600 text-white',
          color: 'text-cyan-600 dark:text-cyan-400',
          bg: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/60'
        }
      ]
    },
    {
      categoryName: '2. Kalkulator Medis & Racikan Farmasi',
      categoryDesc: 'Perhitungan presisi batas stabilitas Beyond-Use-Date, dosis anak BB/BSA, klirens ginjal, dan skor risiko klinis.',
      accentColor: 'teal',
      modules: [
        {
          id: 'bud',
          title: 'Stabilitas & BUD Racikan',
          desc: 'Kalkulator masa simpan sediaan puyer, sirup oral, salep/krim topikal & dry syrup sesuai USP <795> dan FI VI.',
          icon: CalendarClock,
          badge: 'USP <795>',
          badgeColor: 'bg-emerald-700 text-white',
          color: 'text-emerald-700 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
        },
        {
          id: 'pediatric',
          title: 'Dosis Pediatrik & Puyer Anak',
          desc: 'Kalkulator dosis anak berbasis Berat Badan (mg/kg/hari) & BSA Mosteller, verifikasi dosis maksimal & racikan pulveres.',
          icon: Baby,
          badge: 'BB & BSA',
          badgeColor: 'bg-rose-500 text-white',
          color: 'text-rose-600 dark:text-rose-400',
          bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60'
        },
        {
          id: 'renal-adjuster',
          title: 'Kalkulator Medis & Penyesuaian Dosis',
          desc: 'Suite kalkulator farmako-klinis terpadu: Dosis Ginjal (CrCl/eGFR), Hepar, Syringe Pump, Opioid, IBW, serta 14 Kalkulator Skor Klinis (termasuk SRQ-20).',
          icon: Calculator,
          badge: '14+ Skor & Dosis',
          badgeColor: 'bg-violet-600 text-white',
          color: 'text-violet-600 dark:text-violet-400',
          bg: 'bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800/60'
        }
      ]
    },
    {
      categoryName: '3. Manajemen Polifarmasi & Edukasi Pasien',
      categoryDesc: 'Optimalisasi terapi geriatri, pengiriman etiket WhatsApp satu klik, panduan PNPK, dan cara pakai alat obat.',
      accentColor: 'indigo',
      modules: [
        {
          id: 'polypharmacy',
          title: 'Evaluasi Polifarmasi & Geriatri',
          desc: 'Skrining Kriteria Beers 2023, STOPP/START, Skrining Antikolinergik (ARS), dan deteksi duplikasi terapi pada resep polifarmasi.',
          icon: Stethoscope,
          badge: 'Beers 2023 & STOPP',
          badgeColor: 'bg-indigo-600 text-white',
          color: 'text-indigo-600 dark:text-indigo-400',
          bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/60'
        },
        {
          id: 'whatsapp-pio',
          title: 'Kartu PIO WhatsApp Pasien',
          desc: 'Generator etiket, aturan pakai, peringatan interaksi & jadwal minum obat terformat 1-klik langsung ke nomor WhatsApp pasien.',
          icon: MessageSquare,
          badge: '1-Klik Pasien',
          badgeColor: 'bg-teal-600 text-white',
          color: 'text-teal-600 dark:text-teal-400',
          bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60'
        },
        {
          id: 'guidelines',
          title: 'Panduan Terapi Klinis (PNPK)',
          desc: 'Algoritma terapi lini 1 & lini 2 terstandarisasi PNPK Kemenkes RI, Konsensus PERKI (Kardio), PERKENI (Endokrin), & PAPDI.',
          icon: HeartPulse,
          badge: 'PNPK Kemenkes',
          badgeColor: 'bg-blue-600 text-white',
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60'
        },
        {
          id: 'usage',
          title: 'Panduan Penggunaan Obat Khusus',
          desc: 'Instruksi visual langkah demi langkah pemakaian inhaler (MDI/Turbuhaler), insulin pen, suppositoria, tetes mata/telinga.',
          icon: BookOpen,
          badge: 'Edukasi Visual',
          badgeColor: 'bg-teal-700 text-white',
          color: 'text-teal-700 dark:text-teal-400',
          bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60'
        },
        {
          id: 'drugs',
          title: 'Monografi & Katalog Obat Lengkap',
          desc: 'Direktori farmakologi, indikasi, dosis lazim, kontraindikasi, farmakokinetik & ratusan merk dagang obat Indonesia.',
          icon: Pill,
          badge: 'BPOM & MIMS',
          badgeColor: 'bg-blue-700 text-white',
          color: 'text-blue-700 dark:text-blue-400',
          bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60'
        }
      ]
    },
    {
      categoryName: '4. Pusat Belajar UKMPPAI, SOP, Regulasi & EBM',
      categoryDesc: 'Sumber daya pembelajaran apoteker, standardisasi operasional, hukum kefarmasian, dan basis literatur resmi.',
      accentColor: 'emerald',
      modules: [
        {
          id: 'competency',
          title: 'Pusat Belajar Uji Kompetensi',
          desc: 'Persiapan UKMPPAI CBT & OSCE lengkap dengan bank soal 4 domain, rangkuman high-yield materi, dan kalkulator farmasi.',
          icon: GraduationCap,
          badge: 'UKMPPAI & OSCE',
          badgeColor: 'bg-emerald-600 text-white',
          color: 'text-emerald-600 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
        },
        {
          id: 'sop',
          title: 'SOP Pelayanan Kefarmasian',
          desc: 'Template Standar Operasional Prosedur resmi apotek & klinik sesuai Permenkes 73/2016 siap cetak dan implementasi.',
          icon: ClipboardList,
          badge: 'Permenkes 73/16',
          badgeColor: 'bg-slate-700 text-white',
          color: 'text-slate-700 dark:text-slate-300',
          bg: 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        },
        {
          id: 'regulations',
          title: 'Regulasi & Hukum Farmasi',
          desc: 'Kompilasi peraturan perundang-undangan: UU Kesehatan No. 17/2023, regulasi narkotika/psikotropika, dan peraturan BPOM.',
          icon: Scale,
          badge: 'UU Kesehatan',
          badgeColor: 'bg-amber-600 text-white',
          color: 'text-amber-600 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60'
        },
        {
          id: 'literature',
          title: 'Literatur & Basis Ilmiah EBM',
          desc: 'Transparansi sumber literatur ilmiah terverifikasi: PNPK Kemenkes, DDInter Nature, ASHP Trissel’s, dan CekBPOM.',
          icon: BookMarked,
          badge: 'Evidence-Based',
          badgeColor: 'bg-teal-600 text-white',
          color: 'text-teal-600 dark:text-teal-400',
          bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60'
        }
      ]
    }
  ];

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
          HERO SECTION: Deep Dark Teal Obsidian Clinical Atmosphere
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071c21] via-[#092931] to-[#0c3742] text-white pt-16 pb-20 border-b border-[#143d47]">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Clinical Live Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e444f] border border-teal-400/40 text-teal-300 text-xs font-black shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Platform Integrasi Klinis Apoteker & Dokter No. 1 di Indonesia</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-outfit">
              Sistem Informasi Obat, <span className="text-teal-300 underline decoration-teal-500 decoration-4 underline-offset-8">Interaksi Klinis</span> &amp; Kalkulator Resep Terpadu
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-teal-100/90 font-medium leading-relaxed max-w-2xl mx-auto">
              <strong>FARMASIDRUGGIST</strong> mengintegrasikan <strong>18+ Modul Klinis Terpercaya</strong>: Skrining Interaksi DDInter, Keamanan Bumil &amp; Busui, Interaksi Lab, BUD Racikan USP &lt;795&gt;, Kartu PIO WhatsApp, hingga Pusat Belajar UKMPPAI.
            </p>

            {/* Hero Quick Search Box */}
            <form onSubmit={handleHeroSearchSubmit} className="pt-2 max-w-2xl mx-auto">
              <div className="flex items-center bg-[#071a1e] rounded-2xl shadow-xl border-2 border-teal-500/60 p-2 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-400/20 transition-all">
                <Search className="w-5 h-5 text-teal-400 ml-2 shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Cari nama obat (contoh: Warfarin, Simvastatin, Clopidogrel, Paracetamol)..."
                  className="w-full px-3 py-2 text-white placeholder-teal-300/60 font-semibold text-xs sm:text-sm focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border border-teal-400/30 hover:scale-[1.02]"
                >
                  <span>Cari Obat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Popular drug sample tags */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5 text-xs text-teal-200/80">
                <span className="font-bold text-teal-300">Pencarian Cepat:</span>
                {['Warfarin', 'Aspirin', 'Simvastatin', 'Clopidogrel', 'Ciprofloxacin', 'Metformin'].map((sample, idx) => {
                  const colors = [
                    'bg-[#0a3840] text-teal-200 border-teal-600/60 hover:bg-[#0f4d58]',
                    'bg-[#0a3840] text-cyan-200 border-cyan-600/60 hover:bg-[#0f4d58]',
                    'bg-[#0a3840] text-emerald-200 border-emerald-600/60 hover:bg-[#0f4d58]',
                    'bg-[#0a3840] text-amber-200 border-amber-600/60 hover:bg-[#0f4d58]',
                    'bg-[#0a3840] text-rose-200 border-rose-600/60 hover:bg-[#0f4d58]',
                    'bg-[#0a3840] text-indigo-200 border-indigo-600/60 hover:bg-[#0f4d58]'
                  ];
                  return (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => {
                        if (onSearchDrug) onSearchDrug(sample);
                        onSelectTab('drugs');
                      }}
                      className={`${colors[idx % colors.length]} border px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer hover:scale-105 text-[11px]`}
                    >
                      {sample}
                    </button>
                  );
                })}
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('interactive-playground');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-slate-950 font-black rounded-xl shadow-lg transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Coba Uji Klinis Langsung (Gratis)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('skrining-srq20');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:scale-[1.02] border border-emerald-400/30"
              >
                <Brain className="w-4 h-4 text-emerald-200" />
                <span>Cek Kesehatan Jiwa (SRQ-20 Gratis)</span>
              </button>

              <button
                onClick={onOpenAuthModal}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-teal-300" />
                <span>Masuk / Login Akun</span>
              </button>

              <a
                href="https://t.me/+lHiIMC_TdoM2NTk1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#229ED9] hover:bg-[#1b8bc2] text-white font-black rounded-xl shadow-lg transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:scale-[1.02] border border-sky-300/40"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Gabung Komunitas Telegram</span>
              </a>

              <button
                onClick={onOpenPricingModal}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl shadow-lg transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Paket Langganan Pro</span>
              </button>
            </div>

            {/* Stat Counters Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-10 border-t border-[#143d47]/80 text-left">
              <div className="p-3.5 sm:p-4 bg-[#08262d] border border-[#144754] rounded-2xl shadow-md">
                <p className="text-xl sm:text-2xl font-black text-teal-300 font-outfit">{drugs.length > 0 ? `${drugs.length}+` : '80+'}</p>
                <p className="text-[11px] text-teal-100 font-extrabold mt-0.5">Monografi Obat Resmi BPOM</p>
              </div>
              <div className="p-3.5 sm:p-4 bg-[#08262d] border border-[#144754] rounded-2xl shadow-md">
                <p className="text-xl sm:text-2xl font-black text-cyan-300 font-outfit">{INITIAL_INTERACTIONS.length > 0 ? `${INITIAL_INTERACTIONS.length}+` : '25+'}</p>
                <p className="text-[11px] text-cyan-100 font-extrabold mt-0.5">Pasangan DDI DDInter</p>
              </div>
              <div className="p-3.5 sm:p-4 bg-[#08262d] border border-[#144754] rounded-2xl shadow-md">
                <p className="text-xl sm:text-2xl font-black text-amber-300 font-outfit">18+ Modul</p>
                <p className="text-[11px] text-amber-100 font-extrabold mt-0.5">Klinis, Dosis &amp; UKMPPAI</p>
              </div>
              <div className="p-3.5 sm:p-4 bg-[#08262d] border border-[#144754] rounded-2xl shadow-md">
                <p className="text-xl sm:text-2xl font-black text-indigo-300 font-outfit">100% EBM</p>
                <p className="text-[11px] text-indigo-100 font-extrabold mt-0.5">PNPK &amp; Standar Kemenkes</p>
              </div>
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
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-outfit ${
                activePlaygroundTab === 'ddi'
                  ? 'bg-[#0f766e] text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Interaksi Obat</span>
            </button>

            <button
              onClick={() => setActivePlaygroundTab('bud')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-outfit ${
                activePlaygroundTab === 'bud'
                  ? 'bg-[#0f766e] text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <CalendarClock className="w-3.5 h-3.5" />
              <span>BUD Racikan USP</span>
            </button>

            <button
              onClick={() => setActivePlaygroundTab('pregnancy')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-outfit ${
                activePlaygroundTab === 'pregnancy'
                  ? 'bg-[#0f766e] text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Bumil &amp; Busui</span>
            </button>

            <button
              onClick={() => setActivePlaygroundTab('whatsapp')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-outfit ${
                activePlaygroundTab === 'whatsapp'
                  ? 'bg-[#0f766e] text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Kartu PIO WA</span>
            </button>

            <button
              onClick={() => setActivePlaygroundTab('ukmppai')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-outfit ${
                activePlaygroundTab === 'ukmppai'
                  ? 'bg-[#0f766e] text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Kuis UKMPPAI</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('skrining-srq20');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-outfit text-teal-700 dark:text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30"
            >
              <Brain className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
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
                        className={`p-4 rounded-2xl border space-y-2 transition-all text-left ${
                          isMajor
                            ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80 text-rose-950 dark:text-rose-200'
                            : isMod
                            ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80 text-amber-950 dark:text-amber-200'
                            : 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/80 text-blue-950 dark:text-blue-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-black font-outfit tracking-wide">
                            {item.drugAName} + {item.drugBName}
                          </span>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded font-outfit ${
                            isMajor
                              ? 'bg-rose-700 text-white shadow-xs'
                              : isMod
                              ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                              : 'bg-blue-600 text-white shadow-xs'
                          }`}>
                            {item.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed font-medium">
                          <strong>Efek Klinis:</strong> {item.clinicalOutcome || item.mechanism}
                        </p>
                        {item.management && (
                          <div className="text-xs pt-2 border-t border-black/5 dark:border-white/10">
                            <strong>Saran Manajemen Farmasi:</strong> {item.management}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-200 text-xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Tidak Ditemukan Interaksi Berbahaya Signifikan</span>
                    </div>
                    <p className="text-[11px] text-emerald-800/90 dark:text-emerald-300/90">
                      Kombinasi <strong>{interactiveSelectedDrugs.map(d => d.name).join(' + ')}</strong> relatif aman digunakan bersamaan berdasarkan data DDInter &amp; Drugs.com.
                    </p>
                  </div>
                )
              ) : (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs text-center">
                  Pilih minimal 2 obat atau klik <strong>Contoh Kasus Resep Populer</strong> di atas.
                </div>
              )}
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

        {/* ==================== TAB 2: BUD RACIKAN USP DEMO ==================== */}
        {activePlaygroundTab === 'bud' && (
          <div className="bg-white dark:bg-[#0c191d] rounded-3xl p-5 sm:p-7 border border-teal-800/20 dark:border-teal-500/20 shadow-xl space-y-5 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-[#082a24] dark:text-emerald-300 text-sm sm:text-base flex items-center gap-2 font-outfit">
                  <CalendarClock className="w-4 h-4 text-emerald-600" />
                  <span>Kalkulator Stabilitas &amp; Beyond-Use Date (USP &lt;795&gt; &amp; USP &lt;797&gt;)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Hitung masa kadaluarsa racikan puyer, sirup oral, salep/krim topikal sesuai Farmakope Indonesia VI &amp; USP.
                </p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                USP &lt;795&gt; Standard
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Form Controls */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  1. Pilih Bentuk Sediaan Racikan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBudType('puyer')}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                      selectedBudType === 'puyer'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-300 shadow-xs ring-1 ring-emerald-400'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <p className="font-black">💊 Puyer / Pulveres / Kapsul</p>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">Sediaan padat tanpa air</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedBudType('sirup_oral')}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                      selectedBudType === 'sirup_oral'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-300 shadow-xs ring-1 ring-emerald-400'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <p className="font-black">🧪 Sirup / Suspensi Oral</p>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">Cairan oral mengandung air</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedBudType('salep_krim')}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                      selectedBudType === 'salep_krim'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-300 shadow-xs ring-1 ring-emerald-400'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <p className="font-black">🧴 Salep / Krim Topikal</p>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">Semipadat dengan fase air</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedBudType('dry_syrup')}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                      selectedBudType === 'dry_syrup'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-300 shadow-xs ring-1 ring-emerald-400'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <p className="font-black">💧 Dry Syrup Rekonstitusi</p>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">Sirup antibiotik pabrik</p>
                  </button>
                </div>

                {selectedBudType === 'puyer' && (
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      2. Sisa Masa Kadaluarsa (ED) Bahan Baku Terdekat:
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="2"
                        max="36"
                        step="1"
                        value={rawMaterialEdMonths}
                        onChange={(e) => setRawMaterialEdMonths(Number(e.target.value))}
                        className="flex-1 accent-teal-600"
                      />
                      <span className="text-xs font-black px-2.5 py-1 rounded bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 shrink-0">
                        {rawMaterialEdMonths} Bulan
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Calculation Output Card */}
              <div className="bg-emerald-50/80 dark:bg-emerald-950/30 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800/60 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Hasil Perhitungan BUD:</span>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{calculatedBudResult.standard}</span>
                  </div>

                  <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-700 text-center shadow-xs">
                    <p className="text-[11px] text-slate-500 font-bold uppercase">Batas Waktu Penggunaan (BUD)</p>
                    <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-outfit mt-0.5">
                      {calculatedBudResult.budPeriod}
                    </p>
                  </div>

                  <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                    <p><strong>Kondisi Penyimpanan:</strong> {calculatedBudResult.storage}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400"><strong>Dasar Aturan:</strong> {calculatedBudResult.rule}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTab('bud')}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CalendarClock className="w-4 h-4" />
                  <span>Buka Kalkulator BUD Lengkap &amp; Cetak Etiket</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: BUMIL & BUSUI DEMO ==================== */}
        {activePlaygroundTab === 'pregnancy' && (
          <div className="bg-white dark:bg-[#0c191d] rounded-3xl p-5 sm:p-7 border border-teal-800/20 dark:border-teal-500/20 shadow-xl space-y-5 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-[#082a24] dark:text-pink-300 text-sm sm:text-base flex items-center gap-2 font-outfit">
                  <HeartHandshake className="w-4 h-4 text-pink-600" />
                  <span>Skrining Keamanan Ibu Hamil (FDA PLLR) &amp; Menyusui (Hale L1–L5)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Verifikasi keamanan obat maternal, trimester spesifik risiko teratogenik &amp; keamanan laktasi.
                </p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-300 border border-pink-300 dark:border-pink-700">
                FDA &amp; Hale Rating
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {samplePregnancyDrugs.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedPregDrug(item)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                    selectedPregDrug.name === item.name
                      ? 'bg-pink-50 dark:bg-pink-950/60 border-pink-500 shadow-md ring-2 ring-pink-400'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-pink-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 dark:text-white font-outfit">{item.name}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      item.fda === 'X' || item.fda === 'D'
                        ? 'bg-rose-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      FDA {item.fda}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-slate-500">Laktasi Hale: <strong>{item.hale}</strong></span>
                    <span className={`font-bold ${item.safe ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.safe ? '✓ Relatif Aman' : '⚠ Risiko Tinggi'}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Drug Detail Banner */}
            <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800/60 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-pink-950 dark:text-pink-200 text-sm">
                  Evaluasi Klinis: {selectedPregDrug.name}
                </span>
                <span className="text-[11px] font-bold text-pink-800 dark:text-pink-300">
                  Kategori FDA {selectedPregDrug.fda} • Hale {selectedPregDrug.hale}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedPregDrug.info}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectTab('pregnancy')}
                className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Buka Direktori Keamanan Bumil &amp; Busui Lengkap (100+ Obat &amp; Panduan Trimester)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: WHATSAPP PIO DEMO ==================== */}
        {activePlaygroundTab === 'whatsapp' && (
          <div className="bg-white dark:bg-[#0c191d] rounded-3xl p-5 sm:p-7 border border-teal-800/20 dark:border-teal-500/20 shadow-xl space-y-5 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-[#082a24] dark:text-teal-300 text-sm sm:text-base flex items-center gap-2 font-outfit">
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                  <span>Generator Kartu PIO &amp; Edukasi Pasien via WhatsApp</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kirim aturan pakai obat, jadwal minum, pantangan makanan &amp; edukasi resep 1-klik langsung ke WhatsApp pasien.
                </p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-700 flex items-center gap-1">
                <Smartphone className="w-3 h-3" />
                WhatsApp Direct API
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Nama Pasien Uji Coba:
                  </label>
                  <input
                    type="text"
                    value={waPatientName}
                    onChange={(e) => setWaPatientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-xs space-y-2">
                  <p className="font-extrabold text-teal-900 dark:text-teal-300 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-teal-600" />
                    <span>Fitur Unggulan Modul WhatsApp PIO:</span>
                  </p>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                    <li>✓ Menggunakan Kop &amp; Branding Apotek / Klinik Anda sendiri</li>
                    <li>✓ Format rapi dengan teks tebal (*bold*) &amp; list poin profesional</li>
                    <li>✓ Peringatan interaksi obat otomatis &amp; cara penyimpanan</li>
                    <li>✓ Tombol Kirim 1-Klik membuka aplikasi WhatsApp Web / Mobile</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopyWa}
                    className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {waCopied ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{waCopied ? 'Teks Tersalin!' : 'Salin Format Pesan'}</span>
                  </button>

                  <button
                    onClick={() => onSelectTab('whatsapp-pio')}
                    className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Buka Generator PIO</span>
                  </button>
                </div>
              </div>

              {/* Smartphone Chat Bubble Mockup */}
              <div className="bg-[#e5ddd5] dark:bg-[#0b141a] p-4 rounded-3xl border border-slate-300 dark:border-slate-800 shadow-md">
                <div className="bg-white dark:bg-[#202c33] p-4 rounded-2xl shadow-sm text-xs font-mono space-y-2 text-slate-800 dark:text-slate-100 whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto">
                  {sampleWaText}
                </div>
                <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 mt-2 font-sans font-medium">
                  Pratinjau tampilan pesan WhatsApp yang diterima pasien
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: UKMPPAI CBT DEMO ==================== */}
        {activePlaygroundTab === 'ukmppai' && (
          <div className="bg-white dark:bg-[#0c191d] rounded-3xl p-5 sm:p-7 border border-teal-800/20 dark:border-teal-500/20 shadow-xl space-y-5 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-[#082a24] dark:text-emerald-300 text-sm sm:text-base flex items-center gap-2 font-outfit">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Pusat Belajar Uji Kompetensi Apoteker (UKMPPAI CBT &amp; OSCE)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Simulasi bank soal 4 domain farmasi: Klinis, Manajemen, Industri CPOB &amp; Bahan Alam.
                </p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                UKMPPAI CBT Prep
              </span>
            </div>

            {/* Flashcard Question */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px]">
                  {sampleQuiz.domain}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">Soal Interaksi &amp; DRP</span>
              </div>

              <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-relaxed">
                {sampleQuiz.question}
              </p>

              <div className="space-y-2 pt-2">
                {sampleQuiz.options.map((opt, idx) => {
                  const isSelected = ukmppaiSelectedOption === idx;
                  const isCorrect = idx === sampleQuiz.correctIndex;
                  let btnClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400';
                  
                  if (ukmppaiSelectedOption !== null) {
                    if (isCorrect) {
                      btnClass = 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnClass = 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setUkmppaiSelectedOption(idx)}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-start gap-2 ${btnClass}`}
                    >
                      <span className="font-mono font-bold">{String.fromCharCode(65 + idx)}.</span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {ukmppaiSelectedOption !== null && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-1 mt-3">
                  <p className="font-extrabold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pembahasan &amp; Clinical Pearls:</span>
                  </p>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                    {sampleQuiz.explanation}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectTab('competency')}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Buka Pusat Belajar UKMPPAI Lengkap (Bank Soal CBT, OSCE Station &amp; Rangkuman 4 Domain)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </section>

      {/* =========================================================================
          COMPREHENSIVE 18-MODULE DASHBOARD DIRECTORY SHOWCASE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0a3840]/10 dark:bg-teal-950/60 text-[#0f5c53] dark:text-teal-300 text-xs font-black border border-[#0f5c53]/20 dark:border-teal-800">
            <Database className="w-3.5 h-3.5" />
            <span>Katalog Lengkap Fitur &amp; Menu Dashboard</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#082a24] dark:text-white font-outfit">
            18+ Modul Klinis Terintegrasi untuk Praktik Farmasi Modern
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Setiap fitur dirancang khusus untuk memenuhi standar pelayanan kefarmasian di Apotek, Klinik, Rumah Sakit, dan Pusat Studi.
          </p>
        </div>

        {/* 4 Pillars Category Listing */}
        <div className="space-y-10">
          {moduleCategories.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-4">
              
              {/* Category Subheader */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit flex items-center gap-2">
                  <span>{cat.categoryName}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {cat.categoryDesc}
                </p>
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.modules.map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <div
                      key={mod.id}
                      className={`p-5 rounded-2xl border ${mod.bg} shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md hover:scale-[1.01] transition-all group`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-2xs ${mod.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded shadow-2xs font-outfit ${mod.badgeColor}`}>
                            {mod.badge}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white font-outfit group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                            {mod.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                            {mod.desc}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectTab(mod.id)}
                        className="w-full py-2.5 px-3 bg-white dark:bg-slate-900 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group-hover:border-teal-500"
                      >
                        <span>Buka Modul {mod.title}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          BENEFICIARIES SECTION: SIAPA YANG DIUNTUNGKAN?
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-[#0a232b] to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-teal-500/20 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black font-outfit text-white">
              Solusi Terpadu untuk Berbagai Ranah Praktik
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/80">
              Meningkatkan keselamatan pasien (*patient safety*) dan efisiensi kerja tenaga kesehatan di setiap titik pelayanan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-teal-500/20 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 w-fit">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-sm">Apoteker Rumah Sakit &amp; ICU</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Skrining inkompatibilitas IV Y-Site ASHP, penyesuaian dosis gagal ginjal, deteksi efek samping obat, dan evaluasi polifarmasi Beers.
              </p>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-2xl border border-teal-500/20 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 w-fit">
                <Pill className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-sm">Apoteker Apotek Komunitas</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hitung BUD puyer/sirup racikan, kirim edukasi etiket WhatsApp ke pasien, verifikasi dosis anak &amp; penapisan jamu vs obat resep.
              </p>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-2xl border border-teal-500/20 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 w-fit">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-sm">Dokter &amp; Klinisi</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Verifikasi interaksi obat multi-resep, penapisan hasil uji lab palsu, kalkulator skor kardio CHA2DS2-VASc, dan panduan PNPK.
              </p>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-2xl border border-teal-500/20 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 w-fit">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-sm">Mahasiswa &amp; Calon Apoteker</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pusat belajar UKMPPAI CBT &amp; OSCE 4 domain, rangkuman materi high-yield, SOP pelayanan kefarmasian &amp; regulasi UU Kesehatan.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          STANDALONE PUBLIC HEALTH SECTION: SRQ-20 MENTAL HEALTH SCREENING
          ========================================================================= */}
      <section id="skrining-srq20" className="py-20 relative bg-slate-900/95 dark:bg-[#061016] text-white border-y border-slate-800 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30 shadow-xs">
              <Brain className="w-4 h-4 text-teal-300" />
              <span>Layanan Terbuka untuk Umum • Standar Baku WHO &amp; Kemenkes RI</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black font-outfit tracking-tight text-white">
              Cek Kesehatan Mental Mandiri <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">(SRQ-20)</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Kuesioner 20 pertanyaan resmi Kementerian Kesehatan RI untuk mendeteksi dini Gangguan Mental Emosional (kecemasan, depresi, dan distres somatik) dalam kurun waktu <strong>30 hari terakhir</strong>.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 font-semibold shadow-inner">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Anonim, Rahasia &amp; Gratis — Jawaban Anda hanya diproses di peramban ini dan tidak pernah disimpan ke server.</span>
            </div>
          </div>

          {/* Interactive Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/60 dark:bg-slate-900/80 border border-slate-700/80 shadow-2xl backdrop-blur-md space-y-8">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-700/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-black">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Panduan Pengisian:</h4>
                  <p className="text-xs text-slate-400">Pilihlah <strong>"Ya"</strong> jika keluhan tersebut Anda rasakan dalam 30 hari terakhir.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPublicSrqScores(Array(20).fill(0))}
                  className="px-3.5 py-2 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
                  <span>Reset Semua "Tidak"</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySrqResult}
                  className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-teal-900/30"
                >
                  {isSrqCopied ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Hasil Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Ringkasan Hasil</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 20 Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[560px] overflow-y-auto pr-1 sm:pr-2">
              {publicSrqQuestions.map((questionText, idx) => {
                const isSelectedYes = publicSrqScores[idx] === 1;
                const isRedFlagItem = idx === 16;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                      isRedFlagItem && isSelectedYes
                        ? 'bg-rose-950/40 border-rose-500/80 shadow-md shadow-rose-950/40'
                        : isSelectedYes
                        ? 'bg-teal-950/40 border-teal-500/60 shadow-xs'
                        : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className={`text-xs leading-relaxed font-semibold block ${
                        isRedFlagItem ? 'text-rose-300 font-bold' : 'text-slate-200'
                      }`}>
                        {questionText}
                      </span>
                      {isRedFlagItem && (
                        <span className="text-[10px] text-rose-400/90 font-medium block">
                          *Butir kritis evaluasi keselamatan diri
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-700/40">
                      <button
                        type="button"
                        onClick={() => {
                          const next = [...publicSrqScores];
                          next[idx] = 0;
                          setPublicSrqScores(next);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          !isSelectedYes
                            ? 'bg-slate-700 text-white border-slate-500 shadow-2xs'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        Tidak (0)
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const next = [...publicSrqScores];
                          next[idx] = 1;
                          setPublicSrqScores(next);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                          isSelectedYes
                            ? isRedFlagItem
                              ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/40'
                              : 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-900/40'
                            : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-teal-900/30 hover:border-teal-600/50'
                        }`}
                      >
                        Ya (1)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Result Evaluation Box */}
            {(() => {
              const res = calculatePublicSrq();

              return (
                <div className={`p-6 rounded-2xl border ${res.badgeColor} bg-slate-900/90 space-y-4 shadow-xl`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Hasil Evaluasi Mandiri Kemenkes RI
                      </span>
                      <h3 className={`text-xl sm:text-2xl font-black font-outfit mt-0.5 ${res.textColor}`}>
                        {res.category}
                      </h3>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className={`text-3xl sm:text-4xl font-black font-outfit ${res.textColor}`}>
                        {res.score} / 20
                      </span>
                      <span className="block text-xs text-slate-400 font-semibold">Skor Jawaban "Ya"</span>
                    </div>
                  </div>

                  {/* Red Flag Alert Banner */}
                  {res.hasSuicidalIdeation && (
                    <div className="p-4 rounded-2xl bg-rose-600 text-white text-xs font-medium space-y-2 shadow-lg shadow-rose-950/60 border border-rose-400 animate-pulse">
                      <div className="flex items-center gap-2 font-black text-sm text-rose-100">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-white" />
                        <span>PERINGATAN KRITIS KESEHATAN JIWA (BUTIR 17):</span>
                      </div>
                      <p className="leading-relaxed">
                        Anda menandai <strong>"Ya"</strong> pada pertanyaan mengenai pikiran untuk mengakhiri hidup. Perasaan ini sangat berat dan tidak boleh dipikul sendirian. Bantuan dan harapan selalu ada. Silakan segera hubungi orang terdekat atau akses layanan bantuan darurat 24 jam bebas pulsa:
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1 font-bold">
                        <span className="px-3 py-1 rounded-lg bg-black/30 border border-white/20">
                          📞 Layanan SEJIWA: <strong>119 ext 8</strong>
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-black/30 border border-white/20">
                          🏥 Halo Kemenkes: <strong>1500-567</strong>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Clinical Recommendation Text */}
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    <strong className="text-teal-300">💡 Penjelasan &amp; Rekomendasi:</strong> {res.recommendation}
                  </div>

                  {/* Score Reference Table Footnote */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-slate-400 border-t border-slate-800">
                    <div>
                      <strong>Standar Cut-Off Kemenkes RI:</strong> Skor 0–5 (Normal) | Skor &ge; 6 (Indikasi Gangguan Mental Emosional) | Skor &ge; 12 (Distres Berat).
                    </div>
                    <button
                      type="button"
                      onClick={handleCopySrqResult}
                      className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-bold transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isSrqCopied ? 'Tersalin ke Clipboard!' : 'Salin Hasil Ini'}</span>
                    </button>
                  </div>
                </div>
              );
            })()}

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
          FAQ SECTION
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-[#082a24] dark:text-white font-outfit">Pertanyaan Sering Diajukan (FAQ)</h2>
          <p className="text-xs text-slate-500 font-medium">Informasi seputar lisensi, validitas klinis data, dan integrasi WhatsApp</p>
        </div>

        <div className="space-y-3">
          {PRICING_FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-1">
              <h3 className="text-xs sm:text-sm font-bold text-[#082a24] dark:text-teal-300 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#0f766e] shrink-0" />
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          TELEGRAM COMMUNITY SECTION: Ruang Diskusi Apoteker & Dokter Indonesia
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#07252f] via-[#0c3947] to-[#0f4758] p-8 sm:p-12 text-white border-2 border-[#229ED9]/50 shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#229ED9]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#229ED9]/20 border border-[#229ED9]/60 text-sky-200 text-xs font-black shadow-inner">
                <Send className="w-3.5 h-3.5 text-sky-300 fill-sky-300" />
                <span>Komunitas Telegram Resmi FarmasiDruggist • Akses Diskusi Gratis</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black font-outfit text-white tracking-tight leading-snug">
                Gabung Forum Diskusi Kasus Klinis &amp; Farmasi Indonesia
              </h2>

              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-2xl">
                Wadah kolaborasi interaktif ribuan Apoteker, Dokter, Tenaga Vokasi Farmasi, dan Mahasiswa Farmasi seluruh Indonesia. Diskusikan kasus interaksi obat polifarmasi kompleks, telaah resep dokter, update PNPK Kemenkes, kupas tuntas soal latihan UKMPPAI (CBT &amp; OSCE), hingga tips manajerial apotek klinis modern.
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
              <div className="bg-[#051b22]/95 p-6 rounded-2xl border-2 border-sky-400/40 text-center w-full max-w-sm space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-[#229ED9] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#229ED9]/40">
                  <Send className="w-8 h-8 fill-white ml-0.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-outfit">Grup Telegram Apoteker &amp; Dokter</h3>
                  <p className="text-[11px] text-teal-200/80 mt-1">Gabung sekarang &amp; bangun jejaring profesional Anda</p>
                </div>
                <a
                  href="https://t.me/+lHiIMC_TdoM2NTk1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#229ED9] hover:bg-[#1b8bc2] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.03] border border-sky-200/40"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>Join Komunitas Telegram →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CONVERTING CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl border border-teal-400/30">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black font-outfit">
              Tingkatkan Standar Pelayanan Farmasi Klinis Anda Hari Ini
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              Bergabunglah dengan ribuan Apoteker, Dokter, dan Mahasiswa Farmasi di seluruh Indonesia dalam mewujudkan pelayanan obat yang aman, cepat, dan presisi.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAuthModal}
              className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 font-black rounded-2xl shadow-xl transition-all text-xs sm:text-sm cursor-pointer hover:scale-105"
            >
              Mulai Daftar Akun Sekarang
            </button>
            <a
              href="https://t.me/+lHiIMC_TdoM2NTk1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#229ED9] hover:bg-[#1b8bc2] text-white font-black rounded-2xl shadow-xl transition-all text-xs sm:text-sm cursor-pointer hover:scale-105 flex items-center gap-2 border border-sky-300/40"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Gabung Komunitas Telegram</span>
            </a>
            <button
              onClick={onOpenPricingModal}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl shadow-xl transition-all text-xs sm:text-sm cursor-pointer hover:scale-105"
            >
              Berlangganan Paket Pro (Rp 199rb/Tahun)
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
