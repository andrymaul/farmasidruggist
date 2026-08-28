import React, { useState, useMemo } from 'react';
import { Drug, UserProfile } from '../types';
import { 
  Calculator, 
  Activity, 
  BookOpen, 
  Binary, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Pill, 
  User, 
  Scale, 
  Info, 
  Search, 
  Wind, 
  HeartPulse, 
  Sparkles, 
  ShieldAlert, 
  Gauge, 
  RotateCcw,
  Sliders,
  Check,
  Baby,
  FlaskConical,
  Syringe,
  Stethoscope,
  Layers,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Flame,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { PediatricCompoundingCalculator } from './PediatricCompoundingCalculator';
import { ClinicalScoreCalculatorsModal, CalculatorType } from './ClinicalScoreCalculatorsModal';
import { 
  calculateSyringePumpRate, 
  calculateGravityDripRate, 
  IV_DRUGS_DATABASE 
} from '../data/ivCompatibilityData';

interface RenalDoseAdjusterProps {
  drugs: Drug[];
  currentUser: UserProfile | null;
  onOpenPricingModal: () => void;
  initialTab?: 'renal' | 'hepatic' | 'pediatric' | 'compounding' | 'syringe-pump' | 'opioid' | 'ibw-bmi' | 'oxygen' | 'clinical-scores';
}

interface RenalDrugRule {
  drugName: string;
  genericName: string;
  atcCode: string;
  normalDose: string;
  rules: {
    minCrCl: number;
    maxCrCl: number;
    recommendation: string;
    status: 'Normal' | 'Adjust' | 'Contraindicated';
  }[];
  clinicalPearls: string;
}

const RENAL_DRUG_RULES: RenalDrugRule[] = [
  {
    drugName: 'Metformin',
    genericName: 'Metformin HCl',
    atcCode: 'A10BA02',
    normalDose: '500 - 1000 mg 2-3x sehari (maks 2000 mg/hari)',
    rules: [
      { minCrCl: 60, maxCrCl: 999, recommendation: 'Dosis normal (1000 - 2000 mg/hari). Monitor fungsi ginjal tahunan.', status: 'Normal' },
      { minCrCl: 45, maxCrCl: 59, recommendation: 'Dosis maksimal 1500 mg/hari. Monitor fungsi ginjal setiap 3-6 bulan.', status: 'Adjust' },
      { minCrCl: 30, maxCrCl: 44, recommendation: 'Dosis maksimal 1000 mg/hari. JANGAN memulai terapi baru jika pasien baru.', status: 'Adjust' },
      { minCrCl: 0, maxCrCl: 29, recommendation: 'KONTRAINDIKASI MUTLAK (eGFR < 30 mL/min). Risiko tinggi Asidosis Laktat fatal!', status: 'Contraindicated' }
    ],
    clinicalPearls: 'Metformin diekskresikan utuh di ginjal. Penurunan fungsi ginjal memicu akumulasi metformin yang memicu Asidosis Laktat.'
  },
  {
    drugName: 'Digoxin',
    genericName: 'Digoxin',
    atcCode: 'C01AA05',
    normalDose: '0.125 - 0.25 mg 1x sehari',
    rules: [
      { minCrCl: 50, maxCrCl: 999, recommendation: 'Dosis standar 0.125 - 0.25 mg/hari. Monitor kadar serum digoxin.', status: 'Normal' },
      { minCrCl: 10, maxCrCl: 49, recommendation: 'Kurangi dosis sebesar 25% - 50% (0.0625 mg/hari atau selang 36 jam).', status: 'Adjust' },
      { minCrCl: 0, maxCrCl: 9, recommendation: 'Kurangi dosis sebesar 50% - 75% (0.0625 mg setiap 48 jam). Monitor ketat tanda toksisitas.', status: 'Adjust' }
    ],
    clinicalPearls: 'Indeks terapi sangat sempit. Hipokalemia akibat diuretik memperparah toksisitas digoxin (aritmia jantung).'
  },
  {
    drugName: 'Allopurinol',
    genericName: 'Allopurinol',
    atcCode: 'M04AA01',
    normalDose: '100 - 300 mg 1x sehari',
    rules: [
      { minCrCl: 50, maxCrCl: 999, recommendation: 'Dosis standar 100 - 300 mg/hari sesudah makan.', status: 'Normal' },
      { minCrCl: 20, maxCrCl: 49, recommendation: 'Dosis maksimal 100 - 200 mg/hari.', status: 'Adjust' },
      { minCrCl: 10, maxCrCl: 19, recommendation: 'Dosis maksimal 100 mg/hari.', status: 'Adjust' },
      { minCrCl: 0, maxCrCl: 9, recommendation: 'Dosis 100 mg setiap 2-3 hari atau 50 mg/hari. Risiko Sindrom Hypersensitivitas Allopurinol (AHS).', status: 'Adjust' }
    ],
    clinicalPearls: 'Metabolit aktif oxypurinol diekskresikan di ginjal. Penumpukan memicu ruam kulit berat (Stevens-Johnson Syndrome).'
  },
  {
    drugName: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin HCl',
    atcCode: 'J01MA02',
    normalDose: '500 mg 2x sehari (setiap 12 jam)',
    rules: [
      { minCrCl: 50, maxCrCl: 999, recommendation: 'Dosis standar 500 mg setiap 12 jam.', status: 'Normal' },
      { minCrCl: 30, maxCrCl: 49, recommendation: 'Berikan 250 - 500 mg setiap 12 jam.', status: 'Adjust' },
      { minCrCl: 0, maxCrCl: 29, recommendation: 'Berikan 250 - 500 mg setiap 18 - 24 jam.', status: 'Adjust' }
    ],
    clinicalPearls: 'Hindari konsumsi bersama susu/kalsium. Penyesuaian interval penting untuk mencegah toksisitas SSP.'
  },
  {
    drugName: 'Levofloxacin',
    genericName: 'Levofloxacin',
    atcCode: 'J01MA12',
    normalDose: '500 mg 1x sehari (setiap 24 jam)',
    rules: [
      { minCrCl: 50, maxCrCl: 999, recommendation: 'Dosis standar 500 mg setiap 24 jam.', status: 'Normal' },
      { minCrCl: 20, maxCrCl: 49, recommendation: 'Dosis awal 500 mg, selanjutnya 250 mg setiap 24 jam.', status: 'Adjust' },
      { minCrCl: 0, maxCrCl: 19, recommendation: 'Dosis awal 500 mg, selanjutnya 250 mg setiap 48 jam.', status: 'Adjust' }
    ],
    clinicalPearls: 'Ekskresi ginjal > 80%. Waktu paruh memanjang signifikan pada gangguan ginjal sedang-berat.'
  },
  {
    drugName: 'Spironolactone',
    genericName: 'Spironolactone',
    atcCode: 'C03DA01',
    normalDose: '25 - 100 mg 1x sehari',
    rules: [
      { minCrCl: 50, maxCrCl: 999, recommendation: 'Dosis standar 25 - 50 mg/hari.', status: 'Normal' },
      { minCrCl: 30, maxCrCl: 49, recommendation: 'Dosis maksimal 25 mg/hari atau selang hari. Monitor kalium darah ketat.', status: 'Adjust' },
      { minCrCl: 0, maxCrCl: 29, recommendation: 'KONTRAINDIKASI MUTLAK (eGFR < 30 mL/min). Risiko Hiperkalemia Fatal!', status: 'Contraindicated' }
    ],
    clinicalPearls: 'Diuretik hemat kalium. Kontraindikasi pada gagal ginjal berat untuk mencegah henti jantung akibat hiperkalemia.'
  }
];

interface HepaticDrugRule {
  drugName: string;
  genericName: string;
  category: string;
  childPughA: string;
  childPughB: string;
  childPughC: string;
  clinicalPearls: string;
}

const HEPATIC_DRUG_RULES: HepaticDrugRule[] = [
  {
    drugName: 'Paracetamol',
    genericName: 'Acetaminophen / Paracetamol',
    category: 'Analgesik & Antipiretik',
    childPughA: 'Dosis maksimal 2000 - 3000 mg/hari (jangan melebihi 3 g/hari).',
    childPughB: 'Dosis maksimal 2000 mg/hari (500 mg tiap 6 jam p.r.n).',
    childPughC: 'Hindari penggunaan rutin atau batasi maks 1000 - 1500 mg/hari hanya jika mutlak perlu.',
    clinicalPearls: 'Paracetamol tetap menjadi analgesik pilihan lini pertama pada sirosis stabil (lebih aman dibanding NSAID yang memicu sindrom hepatorenal/perdarahan varises), namun dosis harian WAJIB DIBATASI ≤ 2000 mg/hari.'
  },
  {
    drugName: 'Metronidazole',
    genericName: 'Metronidazole',
    category: 'Antibiotik & Antiprotozoa',
    childPughA: 'Dosis standar (500 mg tiap 8 jam).',
    childPughB: 'Kurangi dosis sebesar 50% (500 mg tiap 12-24 jam).',
    childPughC: 'Kurangi dosis sebesar 50% (250-500 mg tiap 24 jam). Pantau tanda ensefalopati dan toksisitas SSP.',
    clinicalPearls: 'Metronidazole dimetabolisme secara ekstensif di hati (>80%). Klirens plasma turun drastis pada sirosis hati berat.'
  },
  {
    drugName: 'Simvastatin / Atorvastatin',
    genericName: 'HMG-CoA Reductase Inhibitor',
    category: 'Hipolipidemik / Statin',
    childPughA: 'Gunakan dosis terendah dengan pemantauan ALT/AST berkala.',
    childPughB: 'KONTRAINDIKASI pada penyakit hati aktif atau peningkatan transaminase persisten.',
    childPughC: 'KONTRAINDIKASI MUTLAK.',
    clinicalPearls: 'Statin mengalami metabolisme lintas pertama (*first-pass metabolism*) hepar yang tinggi. Akumulasi pada sirosis berat memicu rhabdomyolysis.'
  },
  {
    drugName: 'Voriconazole',
    genericName: 'Voriconazole',
    category: 'Antijamur Triazol',
    childPughA: 'Loading dose standar, turunkan dosis pemeliharaan (maintenance) sebesar 50%.',
    childPughB: 'Loading dose standar, turunkan dosis pemeliharaan sebesar 50%. TDM (Therapeutic Drug Monitoring) wajib.',
    childPughC: 'KONTRAINDIKASI / Gunakan hanya jika manfaat melebihi risiko kematian akibat infeksi jamur invasif.',
    clinicalPearls: 'Voriconazole dimetabolisme oleh CYP2C19, CYP2C9, dan CYP3A4. Klirens hepar sangat menurun pada sirosis.'
  },
  {
    drugName: 'Diazepam / Midazolam',
    genericName: 'Benzodiazepin',
    category: 'Sedasi & Anxiolitik',
    childPughA: 'Gunakan dosis minimal dengan interval diperpanjang.',
    childPughB: 'HINDARI PENGGUNAAN (Risiko tinggi presipitasi Koma Ensefalopati Hepatik).',
    childPughC: 'KONTRAINDIKASI MUTLAK. Memicu depresi SSP dalam dan koma hepatikum.',
    clinicalPearls: 'Pasien sirosis memiliki sensitivitas reseptor GABA yang meningkat pesat. Benzodiazepin waktu paruh panjang adalah pemicu utama ensefalopati hepatik akut.'
  },
  {
    drugName: 'Lansoprazole / Omeprazole',
    genericName: 'Proton Pump Inhibitor (PPI)',
    category: 'Gastrointestinal',
    childPughA: 'Dosis standar (Lansoprazole 30 mg atau Omeprazole 20 mg/hari).',
    childPughB: 'Dosis maksimal Lansoprazole 15-30 mg/hari atau Omeprazole 10-20 mg/hari.',
    childPughC: 'Dosis maksimal Lansoprazole 15 mg/hari atau Omeprazole 10 mg/hari.',
    clinicalPearls: 'Klirens hepar menurun hingga 50-70%. Penggunaan jangka panjang pada sirosis juga dikaitkan dengan peningkatan risiko SBP (Spontaneous Bacterial Peritonitis).'
  }
];

interface OpioidEquiProfile {
  id: string;
  name: string;
  route: 'Oral' | 'IV/SC' | 'Transdermal Patch' | 'Sublingual';
  conversionFactorToOralMorphine: number; // Multiply by this to get Oral Morphine Equivalent (OME)
  unit: string;
  standardBreakthroughPct: number; // e.g. 10 - 15%
  notes: string;
}

const OPIOID_DATABASE: OpioidEquiProfile[] = [
  {
    id: 'morphine-oral',
    name: 'Morphine (Oral)',
    route: 'Oral',
    conversionFactorToOralMorphine: 1.0, // 1 mg Oral Morphine = 1 OME
    unit: 'mg / hari',
    standardBreakthroughPct: 15,
    notes: 'Standar emas acuan konversi ekivalensi analgetik (Oral Morphine Equivalent / OME).'
  },
  {
    id: 'morphine-iv',
    name: 'Morphine (IV / SC)',
    route: 'IV/SC',
    conversionFactorToOralMorphine: 3.0, // 10 mg IV Morphine = 30 mg Oral Morphine
    unit: 'mg / hari',
    standardBreakthroughPct: 15,
    notes: 'Potensi parenteral 3x lebih kuat dari rute oral akibat eliminasi first-pass hepar.'
  },
  {
    id: 'fentanyl-patch',
    name: 'Fentanyl Transdermal Patch',
    route: 'Transdermal Patch',
    conversionFactorToOralMorphine: 2.4, // 25 mcg/hr patch ~ 60 mg Oral Morphine / hari (25 * 2.4 = 60)
    unit: 'mcg / jam (Patch)',
    standardBreakthroughPct: 10,
    notes: 'Ganti patch setiap 72 jam. Onset 12-24 jam. HANYA untuk nyeri kronis yang sudah toleran opioid.'
  },
  {
    id: 'fentanyl-iv',
    name: 'Fentanyl (IV / Bolus)',
    route: 'IV/SC',
    conversionFactorToOralMorphine: 0.3, // 100 mcg IV Fentanyl (0.1 mg) ~ 10 mg IV Morphine = 30 mg Oral Morphine (100 * 0.3 = 30 OME)
    unit: 'mcg / hari',
    standardBreakthroughPct: 10,
    notes: 'Sangat lipofilik, onset cepat (1-2 menit), durasi pendek (30-60 menit).'
  },
  {
    id: 'oxycodone-oral',
    name: 'Oxycodone (Oral)',
    route: 'Oral',
    conversionFactorToOralMorphine: 1.5, // 20 mg Oral Oxycodone ~ 30 mg Oral Morphine (20 * 1.5 = 30)
    unit: 'mg / hari',
    standardBreakthroughPct: 15,
    notes: '1.5x lebih poten dari morfin oral. Efek samping mual dan pelepasan histamin lebih rendah.'
  },
  {
    id: 'codeine-oral',
    name: 'Codeine (Oral)',
    route: 'Oral',
    conversionFactorToOralMorphine: 0.15, // 200 mg Oral Codeine ~ 30 mg Oral Morphine (200 * 0.15 = 30)
    unit: 'mg / hari',
    standardBreakthroughPct: 15,
    notes: 'Prodrug yang diaktifkan oleh CYP2D6 menjadi morfin. Plafon dosis analgetik 360 mg/hari.'
  },
  {
    id: 'tramadol-oral',
    name: 'Tramadol (Oral)',
    route: 'Oral',
    conversionFactorToOralMorphine: 0.1, // 300 mg Oral Tramadol ~ 30 mg Oral Morphine (300 * 0.1 = 30)
    unit: 'mg / hari',
    standardBreakthroughPct: 15,
    notes: 'Agonis mu-opioid lemah & inhibitor reuptake serotonin/norepinefrin. Dosis maksimal 400 mg/hari.'
  },
  {
    id: 'hydromorphone-oral',
    name: 'Hydromorphone (Oral)',
    route: 'Oral',
    conversionFactorToOralMorphine: 4.0, // 7.5 mg Oral Hydromorphone ~ 30 mg Oral Morphine
    unit: 'mg / hari',
    standardBreakthroughPct: 15,
    notes: '4x - 5x lebih poten dibanding morfin oral. Metabolit bebas neurotoksisitas glukuronida.'
  },
  {
    id: 'buprenorphine-sublingual',
    name: 'Buprenorphine (Sublingual)',
    route: 'Sublingual',
    conversionFactorToOralMorphine: 30.0, // 1 mg Sublingual Buprenorphine ~ 30 mg Oral Morphine
    unit: 'mg / hari',
    standardBreakthroughPct: 10,
    notes: 'Agonis parsial reseptor mu berpotensi tinggi dengan efek plafon pada depresi napas.'
  }
];

export const RenalDoseAdjuster: React.FC<RenalDoseAdjusterProps> = ({
  drugs,
  currentUser,
  onOpenPricingModal,
  initialTab
}) => {
  const [activeTab, setActiveTab] = useState<'renal' | 'hepatic' | 'pediatric' | 'compounding' | 'syringe-pump' | 'opioid' | 'ibw-bmi' | 'oxygen' | 'clinical-scores'>(initialTab || 'renal');

  // ==========================================
  // SYRINGE PUMP & DRIP STATE
  // ==========================================
  const [calcDrugPreset, setCalcDrugPreset] = useState<string>('iv-norepinephrine');
  const [calcPatientWeightKg, setCalcPatientWeightKg] = useState<number>(60);
  const [calcTargetDose, setCalcTargetDose] = useState<number>(0.05); // mcg/kg/min or mg/hr
  const [calcDrugMgInSyringe, setCalcDrugMgInSyringe] = useState<number>(4); // 4 mg
  const [calcSyringeVolumeMl, setCalcSyringeVolumeMl] = useState<number>(50); // 50 mL
  const [dripVolumeMl, setDripVolumeMl] = useState<number>(500);
  const [dripDurationHours, setDripDurationHours] = useState<number>(8);
  const [dripFactor, setDripFactor] = useState<20 | 60>(20);

  // ==========================================
  // CLINICAL SCORES MODAL LAUNCHER STATE
  // ==========================================
  const [selectedClinicalScore, setSelectedClinicalScore] = useState<CalculatorType | null>(null);
  const [isScoresModalOpen, setIsScoresModalOpen] = useState<boolean>(false);

  // ==========================================
  // 1. RENAL STATE
  // ==========================================
  const [renalAge, setRenalAge] = useState<number>(60);
  const [renalGender, setRenalGender] = useState<'male' | 'female'>('male');
  const [renalWeight, setRenalWeight] = useState<number>(65);
  const [renalScr, setRenalScr] = useState<number>(1.8);
  const [searchRenalDrug, setSearchRenalDrug] = useState('');

  // ==========================================
  // 2. HEPATIC STATE (Child-Pugh & MELD)
  // ==========================================
  const [biliTotal, setBiliTotal] = useState<number>(2.2); // mg/dL
  const [serumAlbumin, setSerumAlbumin] = useState<number>(2.9); // g/dL
  const [serumInr, setSerumInr] = useState<number>(1.8);
  const [ascitesDegree, setAscitesDegree] = useState<'none' | 'mild' | 'moderate_severe'>('mild');
  const [encephGrade, setEncephGrade] = useState<'none' | 'grade_1_2' | 'grade_3_4'>('none');
  const [serumCreatinineMeld, setSerumCreatinineMeld] = useState<number>(1.2); // for MELD
  const [searchHepaticDrug, setSearchHepaticDrug] = useState('');

  // ==========================================
  // 3. OPIOID EQUIANALGESIC STATE
  // ==========================================
  const [fromOpioidId, setFromOpioidId] = useState<string>('tramadol-oral');
  const [fromOpioidDose, setFromOpioidDose] = useState<number>(300); // 300 mg/day
  const [toOpioidId, setToOpioidId] = useState<string>('fentanyl-patch');
  const [crossToleranceReductionPct, setCrossToleranceReductionPct] = useState<number>(25); // 25% default safe reduction

  // ==========================================
  // 4. IBW & BMI STATE
  // ==========================================
  const [ibwGender, setIbwGender] = useState<'male' | 'female'>('male');
  const [ibwHeightCm, setIbwHeightCm] = useState<number>(170);
  const [ibwActualWeightKg, setIbwActualWeightKg] = useState<number>(85);

  // ==========================================
  // 5. OXYGEN CYLINDER DURATION & FIO2 STATE
  // ==========================================
  const [cylinderType, setCylinderType] = useState<string>('D');
  const [pressurePsi, setPressurePsi] = useState<number>(1500);
  const [flowRateLpm, setFlowRateLpm] = useState<number>(3);
  const [oxygenDeliveryDevice, setOxygenDeliveryDevice] = useState<string>('nasal-cannula');

  // ==========================================
  // RENAL CALCULATIONS (Cockcroft-Gault)
  // ==========================================
  const calculateCrCl = () => {
    if (!renalAge || !renalWeight || !renalScr || renalScr <= 0 || renalAge <= 0 || renalWeight <= 0) return 0;
    let baseCrCl = ((140 - renalAge) * renalWeight) / (72 * renalScr);
    if (renalGender === 'female') {
      baseCrCl *= 0.85;
    }
    return Math.max(0, Math.round(baseCrCl * 10) / 10);
  };

  const crClValue = calculateCrCl();

  const getCkdStage = (crCl: number) => {
    if (crCl >= 90) return { stage: 'G1 (Normal / Tinggi)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (crCl >= 60) return { stage: 'G2 (Penurunan Ringan)', color: 'bg-teal-100 text-teal-800 border-teal-300' };
    if (crCl >= 45) return { stage: 'G3a (Sedang-Ringan)', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (crCl >= 30) return { stage: 'G3b (Sedang-Berat)', color: 'bg-orange-100 text-orange-800 border-orange-300' };
    if (crCl >= 15) return { stage: 'G4 (Berat)', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    return { stage: 'G5 (Gagal Ginjal Terminal)', color: 'bg-red-200 text-red-900 border-red-400 font-extrabold' };
  };

  const ckdInfo = getCkdStage(crClValue);

  const filteredRenalRules = RENAL_DRUG_RULES.filter(
    (r) =>
      r.drugName.toLowerCase().includes(searchRenalDrug.toLowerCase()) ||
      r.genericName.toLowerCase().includes(searchRenalDrug.toLowerCase()) ||
      r.atcCode.toLowerCase().includes(searchRenalDrug.toLowerCase())
  );

  // ==========================================
  // HEPATIC CALCULATIONS (Child-Pugh & MELD)
  // ==========================================
  const childPughCalculation = useMemo(() => {
    // 1. Bilirubin points
    let biliPts = 1;
    if (biliTotal > 3.0) biliPts = 3;
    else if (biliTotal >= 2.0) biliPts = 2;

    // 2. Albumin points
    let albPts = 1;
    if (serumAlbumin < 2.8) albPts = 3;
    else if (serumAlbumin <= 3.5) albPts = 2;

    // 3. INR points
    let inrPts = 1;
    if (serumInr > 2.3) inrPts = 3;
    else if (serumInr >= 1.7) inrPts = 2;

    // 4. Ascites points
    let ascPts = ascitesDegree === 'none' ? 1 : ascitesDegree === 'mild' ? 2 : 3;

    // 5. Encephalopathy points
    let encPts = encephGrade === 'none' ? 1 : encephGrade === 'grade_1_2' ? 2 : 3;

    const totalScore = biliPts + albPts + inrPts + ascPts + encPts;

    let grade: 'A' | 'B' | 'C' = 'A';
    let severityLabel = 'Gangguan Ringan (Kompensasi Baik)';
    let survival1Yr = '100%';
    let survival2Yr = '85%';
    let badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

    if (totalScore >= 10) {
      grade = 'C';
      severityLabel = 'Gangguan Berat (Dekomposisi Lanjut)';
      survival1Yr = '45%';
      survival2Yr = '35%';
      badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    } else if (totalScore >= 7) {
      grade = 'B';
      severityLabel = 'Gangguan Sedang (Kompensasi Menurun)';
      survival1Yr = '81%';
      survival2Yr = '57%';
      badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }

    // MELD Score calculation: 9.57 * ln(Cr) + 3.78 * ln(Bili) + 11.2 * ln(INR) + 6.43
    const safeCr = Math.min(4.0, Math.max(1.0, serumCreatinineMeld || 1.0));
    const safeBili = Math.max(1.0, biliTotal || 1.0);
    const safeInr = Math.max(1.0, serumInr || 1.0);

    const meldRaw = 9.57 * Math.log(safeCr) + 3.78 * Math.log(safeBili) + 11.2 * Math.log(safeInr) + 6.43;
    const meldScore = Math.min(40, Math.max(6, Math.round(meldRaw)));

    let meldMortality90Day = '< 2%';
    if (meldScore >= 40) meldMortality90Day = '71.3%';
    else if (meldScore >= 30) meldMortality90Day = '52.6%';
    else if (meldScore >= 20) meldMortality90Day = '19.6%';
    else if (meldScore >= 10) meldMortality90Day = '6.0%';

    return {
      totalScore,
      grade,
      severityLabel,
      survival1Yr,
      survival2Yr,
      badgeColor,
      biliPts,
      albPts,
      inrPts,
      ascPts,
      encPts,
      meldScore,
      meldMortality90Day
    };
  }, [biliTotal, serumAlbumin, serumInr, ascitesDegree, encephGrade, serumCreatinineMeld]);

  const filteredHepaticRules = HEPATIC_DRUG_RULES.filter(
    (r) =>
      r.drugName.toLowerCase().includes(searchHepaticDrug.toLowerCase()) ||
      r.genericName.toLowerCase().includes(searchHepaticDrug.toLowerCase()) ||
      r.category.toLowerCase().includes(searchHepaticDrug.toLowerCase())
  );

  // ==========================================
  // OPIOID CALCULATIONS (Equianalgesic Converter)
  // ==========================================
  const opioidCalculation = useMemo(() => {
    const fromProfile = OPIOID_DATABASE.find(o => o.id === fromOpioidId) || OPIOID_DATABASE[0];
    const toProfile = OPIOID_DATABASE.find(o => o.id === toOpioidId) || OPIOID_DATABASE[2];

    const safeFromDose = Math.max(0, fromOpioidDose || 0);

    // 1. Convert current opioid dose to Oral Morphine Equivalent (OME / MME in mg/day)
    const totalOmeMgPerDay = safeFromDose * fromProfile.conversionFactorToOralMorphine;

    // 2. Apply Incomplete Cross-Tolerance Reduction
    const reductionMultiplier = (100 - crossToleranceReductionPct) / 100;
    const targetOmeAfterReduction = totalOmeMgPerDay * reductionMultiplier;

    // 3. Convert target OME to the new target opioid units
    const targetNewDoseRaw = targetOmeAfterReduction / toProfile.conversionFactorToOralMorphine;
    const targetNewDose = Math.round(targetNewDoseRaw * 10) / 10;

    // 4. Breakthrough pain dose (PRN rescue dose: 10 - 15% of 24h total dose)
    const breakthroughDose10Pct = Math.round((targetNewDose * 0.10) * 10) / 10;
    const breakthroughDose15Pct = Math.round((targetNewDose * 0.15) * 10) / 10;

    // 5. CDC Risk Level
    let cdcRiskLevel: 'Safe' | 'Caution' | 'HighRisk' = 'Safe';
    let cdcRiskText = 'Beban Opioid Rendah (< 50 MME/hari). Risiko overdosis minimal.';
    let cdcBadgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

    if (totalOmeMgPerDay >= 90) {
      cdcRiskLevel = 'HighRisk';
      cdcRiskText = '⚠️ RISIKO TINGGI (≥ 90 MME/hari). Risiko fatal depresi napas & overdosis meningkat pesat. Hindari kenaikan dosis dan wajib siapkan/resepkan Nalokson!';
      cdcBadgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    } else if (totalOmeMgPerDay >= 50) {
      cdcRiskLevel = 'Caution';
      cdcRiskText = '⚠️ PERHATIAN (50 - 89 MME/hari). Gandakan pemantauan, evaluasi manfaat vs efek samping sedasi.';
      cdcBadgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }

    return {
      fromProfile,
      toProfile,
      totalOmeMgPerDay: Math.round(totalOmeMgPerDay * 10) / 10,
      targetNewDose,
      breakthroughDose10Pct,
      breakthroughDose15Pct,
      cdcRiskLevel,
      cdcRiskText,
      cdcBadgeColor
    };
  }, [fromOpioidId, fromOpioidDose, toOpioidId, crossToleranceReductionPct]);

  // ==========================================
  // IBW & BMI CALCULATIONS (Devine Formula)
  // ==========================================
  const safeHeightCm = Math.max(0, ibwHeightCm || 0);
  const heightOver50Inches = Math.max(0, safeHeightCm - 152.4);
  const ibwKg = safeHeightCm > 0 ? Math.round((ibwGender === 'male' ? 50 : 45.5) + 0.9 * heightOver50Inches) : 0;
  const abwKg = ibwKg > 0 ? Math.round(ibwKg + 0.4 * (Math.max(0, ibwActualWeightKg || 0) - ibwKg)) : 0;
  const heightMeters = safeHeightCm / 100;
  const bmiValue = (safeHeightCm > 0 && ibwActualWeightKg > 0)
    ? Math.round((ibwActualWeightKg / (heightMeters * heightMeters)) * 10) / 10
    : 0;

  const getBmiCategory = (bmi: number) => {
    if (bmi <= 0) return { cat: 'Data Tidak Lengkap', color: 'text-slate-500 bg-slate-100 border-slate-200' };
    if (bmi < 18.5) return { cat: 'Underweight (Kekurangan BB)', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    if (bmi < 25.0) return { cat: 'Normal (Ideal)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (bmi < 30.0) return { cat: 'Overweight (Kelebihan BB)', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    return { cat: 'Obese (Obesitas)', color: 'text-rose-600 bg-rose-50 border-rose-200 font-bold' };
  };

  const bmiCatInfo = getBmiCategory(bmiValue);

  // ==========================================
  // OXYGEN DURATION CALCULATIONS
  // ==========================================
  const getCylinderFactor = (type: string) => {
    switch (type) {
      case 'D': return 0.16;
      case 'E': return 0.28;
      case 'M': return 1.56;
      case 'G': return 2.41;
      case 'H': return 3.14;
      default: return 0.16;
    }
  };

  const cFactor = getCylinderFactor(cylinderType);
  const safeMarginPsi = 200;
  const effectivePsi = Math.max(0, (pressurePsi || 0) - safeMarginPsi);
  const remainingLiters = Math.round(effectivePsi * cFactor);
  const safeFlowRate = Math.max(0, flowRateLpm || 0);
  const oxygenDurationMinutes = safeFlowRate > 0 ? Math.round(remainingLiters / safeFlowRate) : 0;
  const oxygenDurationHours = Math.floor(oxygenDurationMinutes / 60);
  const oxygenDurationRemMinutes = oxygenDurationMinutes % 60;

  // FiO2 Estimation
  const calculateFiO2 = (device: string, flow: number) => {
    if (device === 'nasal-cannula') {
      const estimated = Math.min(44, 21 + Math.min(6, flow) * 4);
      return { fio2: `${estimated}%`, range: '24% - 44%', notes: 'Standar hipoksia ringan-sedang (1-6 LPM)' };
    } else if (device === 'simple-mask') {
      return { fio2: '40% - 60%', range: '40% - 60%', notes: 'Standar hipoksia sedang (5-8 LPM)' };
    } else if (device === 'nrm') {
      return { fio2: '60% - 90%', range: '60% - 90%', notes: 'Non-Rebreathing Mask dengan kantung reservoir (10-15 LPM)' };
    } else {
      return { fio2: '24% - 60%', range: '24% - 60%', notes: 'Venturi Mask presisi konsentrasi tinggi' };
    }
  };

  const fio2Info = calculateFiO2(oxygenDeliveryDevice, flowRateLpm);
  // ==========================================
  // SYRINGE PUMP & GRAVITY DRIP CALCULATIONS
  // ==========================================
  const syringePumpCalculations = useMemo(() => {
    return calculateSyringePumpRate(
      calcTargetDose,
      calcPatientWeightKg,
      calcDrugMgInSyringe,
      calcSyringeVolumeMl
    );
  }, [calcTargetDose, calcPatientWeightKg, calcDrugMgInSyringe, calcSyringeVolumeMl]);

  const gravityDripCalculations = useMemo(() => {
    return calculateGravityDripRate(dripVolumeMl, dripDurationHours, dripFactor);
  }, [dripVolumeMl, dripDurationHours, dripFactor]);

  // Standard Presets Dictionary for ICU Syringe Pump
  const handleApplySyringePreset = (presetKey: string) => {
    setCalcDrugPreset(presetKey);
    switch (presetKey) {
      case 'iv-norepinephrine':
        setCalcDrugMgInSyringe(4);
        setCalcSyringeVolumeMl(50);
        setCalcTargetDose(0.05);
        break;
      case 'iv-dobutamine':
        setCalcDrugMgInSyringe(250);
        setCalcSyringeVolumeMl(50);
        setCalcTargetDose(5.0);
        break;
      case 'iv-dopamine':
        setCalcDrugMgInSyringe(200);
        setCalcSyringeVolumeMl(50);
        setCalcTargetDose(5.0);
        break;
      case 'iv-nicardipine':
        setCalcDrugMgInSyringe(10);
        setCalcSyringeVolumeMl(50);
        setCalcTargetDose(1.0);
        break;
      case 'iv-fentanyl':
        setCalcDrugMgInSyringe(0.5); // 500 mcg
        setCalcSyringeVolumeMl(50);
        setCalcTargetDose(1.0);
        break;
      case 'iv-midazolam':
        setCalcDrugMgInSyringe(50);
        setCalcSyringeVolumeMl(50);
        setCalcTargetDose(0.05);
        break;
      case 'iv-milrinone':
        setCalcDrugMgInSyringe(10);
        setCalcSyringeVolumeMl(50);
        setCalcTargetDose(0.5);
        break;
      case 'iv-propofol':
        setCalcDrugMgInSyringe(500);
        setCalcSyringeVolumeMl(50);
        setCalcTargetDose(1.5);
        break;
      default:
        break;
    }
  };


  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* HEADER BANNER - Modern Deep Obsidian & Violet/Sapphire Palette */}
      <div className="bg-gradient-to-r from-slate-900 via-[#131127] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-violet-500/20 relative overflow-hidden space-y-6">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none hidden sm:block">
          <Calculator className="w-64 h-64 text-violet-400 -rotate-12" />
        </div>
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30">
            <Activity className="w-4 h-4 text-violet-400" />
            <span>Kalkulator Farmakoterapi Klinis Terpadu</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-outfit">
            Kalkulator Medis & <span className="text-violet-400">Penyesuaian Dosis</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
            Suite kalkulator farmako-klinis terpadu: Dosis Ginjal (CrCl/eGFR), Dosis Hepar (Child-Pugh & MELD), Dosis Pediatrik & Bayi, Racikan Puyer (SL & DTD), Titrasi Syringe Pump & Infus Drip, Konversi Opioid (CDC MME), IBW/BMI, Oksigen Medis, serta 13 Kalkulator Skor Klinis Terintegrasi.
          </p>
        </div>

        {/* Full-width Responsive 9-Tab Switcher Menu */}
        <div className="bg-slate-950/90 p-2 rounded-2xl border border-slate-800 shadow-inner relative z-10">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setActiveTab('renal')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
                activeTab === 'renal'
                  ? 'bg-[#0f766e] text-white shadow-md ring-1 ring-teal-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
              }`}
            >
              <Activity className="w-4 h-4 text-teal-400" />
              <span>Dosis Ginjal</span>
            </button>

            <button
              onClick={() => setActiveTab('hepatic')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
                activeTab === 'hepatic'
                  ? 'bg-[#0f766e] text-white shadow-md ring-1 ring-teal-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
              }`}
            >
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>Dosis Hepar</span>
            </button>

            <button
              onClick={() => setActiveTab('pediatric')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
                activeTab === 'pediatric'
                  ? 'bg-[#0f766e] text-white shadow-md ring-1 ring-teal-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
              }`}
            >
              <Baby className="w-4 h-4 text-emerald-400" />
              <span>Dosis Pediatrik</span>
            </button>

            <button
              onClick={() => setActiveTab('compounding')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
                activeTab === 'compounding'
                  ? 'bg-[#0f766e] text-white shadow-md ring-1 ring-teal-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              <span>Racikan Puyer</span>
            </button>

            <button
              onClick={() => setActiveTab('syringe-pump')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
                activeTab === 'syringe-pump'
                  ? 'bg-[#0f766e] text-white shadow-md ring-1 ring-teal-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
              }`}
            >
              <Syringe className="w-4 h-4 text-sky-400" />
              <span>Syringe Pump & Drip</span>
            </button>

            <button
              onClick={() => setActiveTab('opioid')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
                activeTab === 'opioid'
                  ? 'bg-[#0f766e] text-white shadow-md ring-1 ring-teal-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
              }`}
            >
              <Pill className="w-4 h-4 text-amber-400" />
              <span>Konversi Opioid</span>
            </button>

            <button
              onClick={() => setActiveTab('ibw-bmi')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
                activeTab === 'ibw-bmi'
                  ? 'bg-[#0f766e] text-white shadow-md ring-1 ring-teal-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
              }`}
            >
              <Scale className="w-4 h-4 text-indigo-400" />
              <span>IBW & BMI</span>
            </button>

            <button
              onClick={() => setActiveTab('oxygen')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
                activeTab === 'oxygen'
                  ? 'bg-[#0f766e] text-white shadow-md ring-1 ring-teal-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
              }`}
            >
              <Wind className="w-4 h-4 text-blue-400" />
              <span>Oksigen Medis</span>
            </button>

            <button
              onClick={() => setActiveTab('clinical-scores')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
                activeTab === 'clinical-scores'
                  ? 'bg-[#0f766e] text-white shadow-md ring-1 ring-teal-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-fuchsia-400" />
              <span>13 Skor Klinis</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: RENAL DOSAGE CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'renal' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="w-5 h-5 text-teal-600" />
                <h2 className="text-sm font-bold text-slate-900">Parameter Fisiologis Pasien</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jenis Kelamin Pasien:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setRenalGender('male')}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        renalGender === 'male' 
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Laki-Laki (Male)
                    </button>
                    <button
                      onClick={() => setRenalGender('female')}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        renalGender === 'female' 
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Wanita (Female x0.85)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Usia (Tahun):</label>
                    <input
                      type="number"
                      value={renalAge}
                      onChange={(e) => setRenalAge(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Berat Badan (kg):</label>
                    <input
                      type="number"
                      value={renalWeight}
                      onChange={(e) => setRenalWeight(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Serum Kreatinin (mg/dL):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={renalScr}
                    onChange={(e) => setRenalScr(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-teal-50 border border-teal-300 rounded-xl text-sm font-black text-teal-950 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Nilai normal rata-rata: 0.6 - 1.2 mg/dL</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-teal-300">HASIL ESTIMASI ESTIMASI KLINIK</span>
                  <span className="text-[10px] text-slate-400">Formula Cockcroft-Gault</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Klirens Kreatinin (CrCl):</p>
                    <p className="text-3xl font-black text-teal-400">{crClValue} <span className="text-sm font-normal text-slate-300">mL/min</span></p>
                    <p className="text-[10px] text-slate-400">Dasar penyesuaian dosis obat</p>
                  </div>

                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Stadium Penurunan Fungsi Ginjal (CKD):</p>
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border mt-1 ${ckdInfo.color}`}>
                      {ckdInfo.stage}
                    </span>
                  </div>
                </div>
              </div>

              {/* Renal Drug Rules Search */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-teal-600" />
                    Panduan Dosis Obat Ginjal (CrCl Pasien: {crClValue} mL/min)
                  </h3>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchRenalDrug}
                    onChange={(e) => setSearchRenalDrug(e.target.value)}
                    placeholder="Cari obat penyesuaian ginjal (Metformin, Allopurinol, Ciprofloxacin...)"
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto custom-scrollbar">
                  {filteredRenalRules.map((drug, idx) => {
                    const matchedRule = drug.rules.find(r => crClValue >= r.minCrCl && crClValue <= r.maxCrCl);
                    return (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{drug.drugName} <span className="text-[10px] text-slate-500 font-normal">({drug.genericName})</span></span>
                          {matchedRule?.status === 'Contraindicated' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">KONTRAINDIKASI</span>
                          )}
                          {matchedRule?.status === 'Adjust' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">PENYESUAIAN DOSIS</span>
                          )}
                          {matchedRule?.status === 'Normal' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">DOSIS NORMAL</span>
                          )}
                        </div>
                        <p className="text-slate-700"><strong className="text-teal-700">Rekomendasi:</strong> {matchedRule?.recommendation || 'Gunakan sesuai petunjuk dokter.'}</p>
                        <p className="text-[10px] text-slate-500 italic">*Mutiara Klinis: {drug.clinicalPearls}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HEPATIC DOSAGE (CHILD-PUGH & MELD) */}
      {/* ========================================================================= */}
      {activeTab === 'hepatic' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Panel */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <HeartPulse className="w-5 h-5 text-teal-600" />
                <h2 className="text-sm font-bold text-slate-900">Parameter Laboratorium & Klinis Hepar</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Bilirubin Total (mg/dL):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={biliTotal}
                    onChange={(e) => setBiliTotal(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>&lt;2.0 (1 pt)</span>
                    <span>2.0 - 3.0 (2 pt)</span>
                    <span>&gt;3.0 (3 pt)</span>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Serum Albumin (g/dL):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={serumAlbumin}
                    onChange={(e) => setSerumAlbumin(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>&gt;3.5 (1 pt)</span>
                    <span>2.8 - 3.5 (2 pt)</span>
                    <span>&lt;2.8 (3 pt)</span>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    International Normalized Ratio (INR):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={serumInr}
                    onChange={(e) => setSerumInr(Math.max(0.5, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>&lt;1.7 (1 pt)</span>
                    <span>1.7 - 2.3 (2 pt)</span>
                    <span>&gt;2.3 (3 pt)</span>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Derajat Asites Pasien:</label>
                  <select
                    value={ascitesDegree}
                    onChange={(e) => setAscitesDegree(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="none">Tidak Ada Asites (1 poin)</option>
                    <option value="mild">Ringan / Terkontrol Diuretik (2 poin)</option>
                    <option value="moderate_severe">Sedang - Berat / Refrakter (3 poin)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ensefalopati Hepatik:</label>
                  <select
                    value={encephGrade}
                    onChange={(e) => setEncephGrade(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="none">Tidak Ada / Grade 0 (1 poin)</option>
                    <option value="grade_1_2">Grade 1 - 2 (Bingung ringan, tremor, asteriksis) (2 poin)</option>
                    <option value="grade_3_4">Grade 3 - 4 (Somnolen berat, stupor, koma) (3 poin)</option>
                  </select>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="font-bold text-slate-700 block mb-1">Serum Kreatinin untuk Skor MELD (mg/dL):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={serumCreatinineMeld}
                    onChange={(e) => setSerumCreatinineMeld(parseFloat(e.target.value) || 1.0)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    Hasil Klasifikasi Child-Pugh & MELD
                  </span>
                  <span className="text-[10px] text-slate-400">UNOS / Mayo Clinic Standard</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Skor & Kelas Child-Pugh:</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-teal-400">Kelas {childPughCalculation.grade}</span>
                      <span className="text-xs font-semibold text-slate-300">({childPughCalculation.totalScore} Poin)</span>
                    </div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border mt-1 ${childPughCalculation.badgeColor}`}>
                      {childPughCalculation.severityLabel}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-2">
                      Survival 1 Tahun: <strong>{childPughCalculation.survival1Yr}</strong> • 2 Tahun: <strong>{childPughCalculation.survival2Yr}</strong>
                    </p>
                  </div>

                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Skor MELD (End-Stage Liver):</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-amber-400">{childPughCalculation.meldScore}</span>
                      <span className="text-xs font-semibold text-slate-300">/ 40</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Mortalitas 90-Hari: <strong className="text-amber-300">{childPughCalculation.meldMortality90Day}</strong>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-2">
                      Prediktor kesintasan sirosis dekompensata
                    </p>
                  </div>
                </div>
              </div>

              {/* Hepatic Drug Adjustment Directory */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-teal-600" />
                    Panduan Dosis Obat Gangguan Hepar (Pasien: Kelas {childPughCalculation.grade})
                  </h3>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchHepaticDrug}
                    onChange={(e) => setSearchHepaticDrug(e.target.value)}
                    placeholder="Cari obat metabolisme hepar (Paracetamol, Metronidazole, Statin, PPI...)"
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto custom-scrollbar">
                  {filteredHepaticRules.map((drug, idx) => {
                    const currentClassRec = 
                      childPughCalculation.grade === 'A' ? drug.childPughA :
                      childPughCalculation.grade === 'B' ? drug.childPughB :
                      drug.childPughC;

                    const isContraindicated = currentClassRec.toUpperCase().includes('KONTRAINDIKASI') || currentClassRec.toUpperCase().includes('HINDARI');

                    return (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">
                            {drug.drugName} <span className="text-[10px] text-slate-500 font-normal">({drug.category})</span>
                          </span>
                          {isContraindicated ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                              KONTRAINDIKASI / HINDARI
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                              REKOMENDASI KELAS {childPughCalculation.grade}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-700">
                          <strong className="text-teal-700">Aturan Dosis:</strong> {currentClassRec}
                        </p>
                        <p className="text-[10px] text-slate-500 italic">*Mutiara Klinis: {drug.clinicalPearls}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: OPIOID EQUIANALGESIC CONVERTER */}
      {/* ========================================================================= */}
      {activeTab === 'opioid' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Opioid Source */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Pill className="w-5 h-5 text-teal-600" />
                <h2 className="text-sm font-bold text-slate-900">1. Opioid Saat Ini (Regimen Aktif Pasien)</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilih Jenis Opioid Asal:</label>
                  <select
                    value={fromOpioidId}
                    onChange={(e) => setFromOpioidId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    {OPIOID_DATABASE.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.name} ({o.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Total Dosis Harian Pasien ({opioidCalculation.fromProfile.unit}):
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={fromOpioidDose}
                    onChange={(e) => setFromOpioidDose(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-teal-50 border border-teal-300 rounded-xl text-sm font-black text-teal-950 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">{opioidCalculation.fromProfile.notes}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 block">2. Opioid Target yang Akan Digunakan:</label>
                  </div>
                  <select
                    value={toOpioidId}
                    onChange={(e) => setToOpioidId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    {OPIOID_DATABASE.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.name} ({o.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <label className="font-bold text-slate-700 block">
                    3. Pengurangan Toleransi Silang (*Incomplete Cross-Tolerance*):
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    {[0, 25, 33, 50].map(pct => (
                      <button
                        key={pct}
                        onClick={() => setCrossToleranceReductionPct(pct)}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                          crossToleranceReductionPct === pct
                            ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {pct === 0 ? '0%' : `-${pct}%`}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 leading-relaxed">
                    💡 Standar keselamatan paliatif: Disarankan mereduksi dosis target <strong>25% - 50%</strong> saat rotasi opioid untuk mencegah depresi pernapasan fatal akibat toleransi silang tak sempurna.
                  </p>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 text-white space-y-5 shadow-xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    Hasil Konversi Ekivalensi Dosis Opioid
                  </span>
                  <span className="text-[10px] text-slate-400">CDC & EAPC Guideline</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Total Beban Opioid (MME):</p>
                    <p className="text-3xl font-black text-teal-400">{opioidCalculation.totalOmeMgPerDay}</p>
                    <p className="text-[10px] text-slate-400">mg Oral Morphine / hari</p>
                  </div>

                  <div className="bg-teal-950 p-3.5 rounded-2xl border border-teal-500/50 space-y-1 col-span-2">
                    <p className="text-[10px] text-teal-300 uppercase font-bold">
                      REKOMENDASI DOSIS BARU ({crossToleranceReductionPct}% Reduksi):
                    </p>
                    <p className="text-3xl font-black text-white">
                      {opioidCalculation.targetNewDose} <span className="text-sm text-teal-300">{opioidCalculation.toProfile.unit}</span>
                    </p>
                    <p className="text-[10px] text-teal-200">
                      Target: {opioidCalculation.toProfile.name}
                    </p>
                  </div>
                </div>

                {/* CDC Risk Banner */}
                <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${opioidCalculation.cdcBadgeColor}`}>
                  <p className="font-bold">{opioidCalculation.cdcRiskText}</p>
                </div>

                {/* Breakthrough Pain Rescue Dose Box */}
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 text-xs space-y-2">
                  <span className="font-extrabold text-teal-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    Dosis Penyelamat Nyeri Terobosan (*Breakthrough Pain Rescue / PRN*):
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    Jika pasien mengalami nyeri mendadak (*breakthrough pain*), berikan dosis penyelamat oral/injeksi sebesar <strong>10% - 15%</strong> dari total dosis 24 jam:
                  </p>
                  <div className="flex items-center gap-3 font-mono text-[11px] font-bold text-amber-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span>• 10% Dosis: {opioidCalculation.breakthroughDose10Pct} {opioidCalculation.toProfile.unit.split(' ')[0]}</span>
                    <span>• 15% Dosis: {opioidCalculation.breakthroughDose15Pct} {opioidCalculation.toProfile.unit.split(' ')[0]} (tiap 2-4 jam p.r.n)</span>
                  </div>
                </div>
              </div>

              {/* Opioid Conversion Table Info */}
              <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-lg text-xs space-y-3">
                <span className="font-bold text-teal-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  Prinsip Klinis Rotasi Opioid pada Pasien Paliatif & Onkologi:
                </span>
                <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px] pl-1">
                  <li><strong>Hitung Total 24 Jam:</strong> Jumlahkan seluruh opioid reguler + dosis PRN yang diminum pasien dalam 24 jam terakhir.</li>
                  <li><strong>Konversi ke MME:</strong> Kalikan dosis dengan faktor konversi standar morfin oral.</li>
                  <li><strong>Reduksi Toleransi Silang:</strong> Selalu kurangi 25-50% dari dosis kalkulasi matematis karena toleransi reseptor mu tidak sepenuhnya berpindah ke molekul opioid baru.</li>
                  <li><strong>Evaluasi 24-48 Jam Pertama:</strong> Pantau skor nyeri (NRS/VAS), laju pernapasan (&lt;10x/menit tanda overdosis), dan tingkat sedasi (*Richmond Agitation-Sedation Scale*).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: IBW & BMI CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'ibw-bmi' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Scale className="w-6 h-6 text-teal-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Kalkulator Berat Badan Ideal (IBW, ABW & BMI)</h2>
              <p className="text-xs text-slate-500">Penyesuaian dosis obat hidrofilik/lipofilik pada pasien overweight & obesitas (Devine Formula).</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Jenis Kelamin:</label>
              <select
                value={ibwGender}
                onChange={(e) => setIbwGender(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="male">Laki-Laki (Male)</option>
                <option value="female">Wanita (Female)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Tinggi Badan (cm):</label>
              <input
                type="number"
                value={ibwHeightCm}
                onChange={(e) => setIbwHeightCm(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Berat Badan Aktual (kg):</label>
              <input
                type="number"
                value={ibwActualWeightKg}
                onChange={(e) => setIbwActualWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase">BB Ideal (IBW Devine):</p>
              <p className="text-3xl font-black text-slate-900">{ibwKg} <span className="text-xs font-normal text-slate-500">kg</span></p>
              <p className="text-[10px] text-slate-400">Gunakan untuk Dosis Aminofilin & Digoxin</p>
            </div>

            <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 space-y-1">
              <p className="text-[10px] font-bold text-teal-800 uppercase">BB Disesuaikan (ABW 40%):</p>
              <p className="text-3xl font-black text-teal-950">{abwKg} <span className="text-xs font-normal text-teal-700">kg</span></p>
              <p className="text-[10px] text-teal-700">Gunakan untuk Dosis Aminoglikosida</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl text-white space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Indeks Massa Tubuh (BMI):</p>
              <p className="text-3xl font-black text-teal-400">{bmiValue} <span className="text-xs font-normal text-slate-300">kg/m²</span></p>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${bmiCatInfo.color}`}>
                {bmiCatInfo.cat}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: OXYGEN MEDIS CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'oxygen' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Wind className="w-6 h-6 text-teal-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Kalkulator Durasi Tabung & Konsentrasi Oksigen Medis (FiO2)</h2>
              <p className="text-xs text-slate-500">Estimasi waktu habis pasokan tabung oksigen & fraksi oksigen terhirup (FiO2) pasien emergency/IGD.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Ukuran Tabung Oksigen:</label>
              <select
                value={cylinderType}
                onChange={(e) => setCylinderType(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="D">Tipe D (Portabel 350 L - Faktor 0.16)</option>
                <option value="E">Tipe E (Emergency Standar 680 L - Faktor 0.28)</option>
                <option value="M">Tipe M (3000 L - Faktor 1.56)</option>
                <option value="G">Tipe G (5300 L - Faktor 2.41)</option>
                <option value="H">Tipe H (Besar RS 6900 L - Faktor 3.14)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Tekanan Manometer (psi):</label>
              <input
                type="number"
                value={pressurePsi}
                onChange={(e) => setPressurePsi(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">Standar tabung penuh: ~2000 psi</p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Laju Aliran / Flow Rate (LPM):</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="15"
                value={flowRateLpm}
                onChange={(e) => setFlowRateLpm(Number(e.target.value))}
                className="w-full px-3 py-2 bg-teal-50 border border-teal-300 rounded-xl text-xs font-black text-teal-950 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">Liter per menit (L/min)</p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Perangkat Oksigenasi:</label>
              <select
                value={oxygenDeliveryDevice}
                onChange={(e) => setOxygenDeliveryDevice(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="nasal-cannula">Nasal Cannula (1 - 6 LPM)</option>
                <option value="simple-mask">Simple Mask (5 - 8 LPM)</option>
                <option value="nrm">NRM Reservoir (10 - 15 LPM)</option>
                <option value="venturi">Venturi Mask (Konsentrasi Presisi)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="bg-slate-900 p-5 rounded-2xl text-white space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Estimasi Sisa Durasi Tabung:</p>
              <p className="text-3xl font-black text-teal-400 mt-1">
                {oxygenDurationHours} <span className="text-sm font-semibold text-slate-300">Jam</span> {oxygenDurationRemMinutes} <span className="text-sm font-semibold text-slate-300">Menit</span>
              </p>
              <p className="text-[10px] text-slate-400">Total: {oxygenDurationMinutes} menit (Sisa Volume: ~{remainingLiters} Liter)</p>
            </div>

            <div className="bg-teal-950 p-5 rounded-2xl border border-teal-500/40 space-y-1 text-white">
              <p className="text-[10px] text-teal-300 uppercase font-bold">Estimasi Fraksi Oksigen Terhirup (FiO2):</p>
              <p className="text-3xl font-black text-white mt-1">{fio2Info.fio2}</p>
              <p className="text-[10px] text-teal-200">Rentang Alat: {fio2Info.range} ({fio2Info.notes})</p>
            </div>
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* TAB: PEDIATRIC DOSING CALCULATOR (INTEGRATED) */}
      {/* ========================================================================= */}
      {activeTab === 'pediatric' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Baby className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Kalkulator Dosis Pediatrik & Sirup Terintegrasi</h3>
                <p className="text-xs text-emerald-200/80">Perhitungan dosis anak akurat berbasis Berat Badan (mg/kgBB), Usia, Luas Permukaan Tubuh (BSA), dan takaran mL sirup.</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
              Standar BPOM & IDAI
            </span>
          </div>

          <PediatricCompoundingCalculator 
            initialSubTab="quick" 
            hideHeader={true} 
            existingDrugs={drugs}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: COMPOUNDING PUYER & SIRUP KERING (INTEGRATED) */}
      {/* ========================================================================= */}
      {activeTab === 'compounding' && (
        <div className="space-y-4">
          <div className="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FlaskConical className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Kalkulator Peracikan Puyer & Serbuk Bagi Terintegrasi</h3>
                <p className="text-xs text-cyan-200/80">Konversi tablet utuh ke puyer serbuk bagi, perhitungan bobot pengisi Saccharum Lactis (SL), etiket resep, dan rekonstitusi sirup kering.</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shrink-0">
              Farmakope & Dispensing
            </span>
          </div>

          <PediatricCompoundingCalculator 
            initialSubTab="compounding" 
            hideHeader={true} 
            existingDrugs={drugs}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: SYRINGE PUMP & GRAVITY DRIP CALCULATOR (INTEGRATED) */}
      {/* ========================================================================= */}
      {activeTab === 'syringe-pump' && (
        <div className="space-y-6">
          <div className="p-4 bg-sky-950/40 border border-sky-800/60 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Syringe className="w-5 h-5 text-sky-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Kalkulator Kecepatan Syringe Pump & Tetesan Infus Drip</h3>
                <p className="text-xs text-sky-200/80">Hitung laju infus titrasi kontinu (mcg/kg/menit, mcg/menit, mg/jam ke mL/jam) dan tetesan infus makro/mikro per menit.</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 shrink-0">
              ICU & Emergensi
            </span>
          </div>

          {/* Quick Drug Presets for Syringe Pump */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Pilih Preset Obat Titrasi ICU Sering Digunakan:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'iv-norepinephrine', name: 'Norepinephrine (Vascon)', dose: '4 mg / 50 mL (80 mcg/mL)' },
                { id: 'iv-dobutamine', name: 'Dobutamine (Inotrop)', dose: '250 mg / 50 mL (5000 mcg/mL)' },
                { id: 'iv-dopamine', name: 'Dopamine', dose: '200 mg / 50 mL (4000 mcg/mL)' },
                { id: 'iv-nicardipine', name: 'Nicardipine (Perdipine)', dose: '10 mg / 50 mL (200 mcg/mL)' },
                { id: 'iv-fentanyl', name: 'Fentanyl ICU', dose: '0.5 mg / 50 mL (10 mcg/mL)' },
                { id: 'iv-midazolam', name: 'Midazolam Sedasi', dose: '50 mg / 50 mL (1000 mcg/mL)' },
                { id: 'iv-milrinone', name: 'Milrinone (Primacor)', dose: '10 mg / 50 mL (200 mcg/mL)' },
                { id: 'iv-propofol', name: 'Propofol 1%', dose: '500 mg / 50 mL (10 mg/mL)' }
              ].map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handleApplySyringePreset(preset.id)}
                  className={`p-2.5 text-left rounded-xl border text-xs transition cursor-pointer ${
                    calcDrugPreset === preset.id
                      ? 'bg-sky-950/90 border-sky-500 text-sky-200 shadow-sm'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-white">{preset.name}</div>
                  <div className="text-[10.5px] text-slate-400 mt-0.5">{preset.dose}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Parameters */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sky-400" />
                Parameter Syringe Pump
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Berat Badan Pasien (kg):</label>
                  <input
                    type="number"
                    value={calcPatientWeightKg}
                    onChange={(e) => setCalcPatientWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Target Dosis Titrasi (mcg / kgBB / menit):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={calcTargetDose}
                    onChange={(e) => setCalcTargetDose(Number(e.target.value))}
                    className="w-full bg-sky-950/50 border border-sky-500/60 rounded-xl px-3 py-2 text-sky-300 font-black text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Total Obat (mg):</label>
                    <input
                      type="number"
                      value={calcDrugMgInSyringe}
                      onChange={(e) => setCalcDrugMgInSyringe(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Volume Spuit (mL):</label>
                    <input
                      type="number"
                      value={calcSyringeVolumeMl}
                      onChange={(e) => setCalcSyringeVolumeMl(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Gravity Drip Inputs */}
                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Wind className="w-4 h-4 text-emerald-400" />
                    Parameter Infus Gravitasi (Drip)
                  </h4>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10.5px] text-slate-400 mb-1">Volume (mL):</label>
                      <input
                        type="number"
                        value={dripVolumeMl}
                        onChange={(e) => setDripVolumeMl(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] text-slate-400 mb-1">Durasi (Jam):</label>
                      <input
                        type="number"
                        value={dripDurationHours}
                        onChange={(e) => setDripDurationHours(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] text-slate-400 mb-1">Faktor Tetes:</label>
                      <select
                        value={dripFactor}
                        onChange={(e) => setDripFactor(Number(e.target.value) as 20 | 60)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-white font-bold"
                      >
                        <option value={20}>20 gtt (Makro)</option>
                        <option value={60}>60 gtt (Mikro)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations Output */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Hasil Perhitungan Setting Syringe Pump
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                    <span className="text-xs text-slate-400 font-medium">Setting Syringe Pump</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-sky-400">{syringePumpCalculations.rateMlPerHour}</span>
                      <span className="text-sm font-semibold text-slate-300">mL / jam</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Konsentrasi: {syringePumpCalculations.concentrationMcgPerMl} mcg/mL
                    </span>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                    <span className="text-xs text-slate-400 font-medium">Waktu Spuit Habis</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-emerald-400">~{syringePumpCalculations.syringeDurationHours}</span>
                      <span className="text-sm font-semibold text-slate-300">Jam</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Total dosis masuk: {syringePumpCalculations.totalDoseMgPerHour} mg/jam
                    </span>
                  </div>
                </div>

                {/* Gravity Drip Result Box */}
                <div className="bg-sky-950/30 border border-sky-800/40 rounded-xl p-4">
                  <span className="text-xs font-bold text-sky-300 block mb-1">
                    Hasil Tetesan Infus Gravitasi ({dripVolumeMl} mL dalam {dripDurationHours} jam):
                  </span>
                  <div className="flex items-baseline gap-4 mt-2">
                    <div>
                      <span className="text-2xl font-black text-white">{gravityDripCalculations.dripRateGttPerMin}</span>
                      <span className="text-xs font-semibold text-sky-300 ml-1">tetes / menit ({dripFactor === 20 ? 'Makro' : 'Mikro'})</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Kecepatan: <strong>{gravityDripCalculations.rateMlPerHour} mL/jam</strong>
                    </div>
                  </div>
                </div>

                {/* Formula Box */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 text-xs text-slate-400">
                  <span className="font-bold text-slate-300 block">Rumus Syringe Pump Standar:</span>
                  <p className="font-mono text-[11px] text-slate-300">
                    Kecepatan (mL/jam) = [Dosis ({calcTargetDose} mcg/kg/mnt) × BB ({calcPatientWeightKg} kg) × 60] ÷ Konsentrasi ({syringePumpCalculations.concentrationMcgPerMl} mcg/mL)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: 13 INTEGRATED CLINICAL SCORE CALCULATORS */}
      {/* ========================================================================= */}
      {activeTab === 'clinical-scores' && (
        <div className="space-y-6">
          <div className="p-4 bg-fuchsia-950/40 border border-fuchsia-800/60 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-5 h-5 text-fuchsia-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Suite 13 Kalkulator Skor Klinis & Risiko Terpadu</h3>
                <p className="text-xs text-fuchsia-200/80">Kalkulator stratifikasi risiko kardiovaskular, stroke, sepsis, dehidrasi, mortalitas, dan psikometri berbasis pedoman klinis internasional.</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 shrink-0">
              13 Skor Valid
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'ascvd' as CalculatorType, name: '10-Year ASCVD Risk', org: 'AHA / ACC 2019', desc: 'Estimasi risiko aterosklerotik kardiovaskular 10 tahun untuk memulai terapi statin & aspirin.', badge: 'Kardiologi', color: 'border-blue-800/80 bg-blue-950/20' },
              { id: 'cha2ds2vasc' as CalculatorType, name: 'CHA2DS2-VASc Score', org: 'ESC / AHA / ACC', desc: 'Stratifikasi risiko stroke tromboemboli pada Fibrilasi Atrium (AF) & indikasi antikoagulan oral (DOAC).', badge: 'Antikoagulasi', color: 'border-indigo-800/80 bg-indigo-950/20' },
              { id: 'curb65' as CalculatorType, name: 'CURB-65 Pneumonia', org: 'BTS Standard', desc: 'Penilaian derajat keparahan pneumonia komunitas (CAP) & penentuan lokasi rawat (Rawat Jalan / Ruang Rawat / ICU).', badge: 'Respirasi', color: 'border-cyan-800/80 bg-cyan-950/20' },
              { id: 'qsofa' as CalculatorType, name: 'qSOFA Sepsis Score', org: 'Sepsis-3 Guidelines', desc: 'Skrining cepat bedside kecurigaan sepsis di luar ICU (Laju napas ≥22, GCS <15, TDS ≤100 mmHg).', badge: 'Emergensi', color: 'border-rose-800/80 bg-rose-950/20' },
              { id: 'map' as CalculatorType, name: 'Mean Arterial Pressure (MAP)', org: 'ICU Hemodinamik', desc: 'Penghitungan tekanan arteri rata-rata target perfusi organ (MAP ≥65 mmHg) pada syok & resusitasi.', badge: 'Hemodinamik', color: 'border-teal-800/80 bg-teal-950/20' },
              { id: 'egfr' as CalculatorType, name: 'eGFR CKD-EPI 2021', org: 'KDIGO Standard', desc: 'Formula estimasi laju filtrasi glomerulus berbasis kreatinin serum terbaru tanpa faktor ras.', badge: 'Nefrologi', color: 'border-emerald-800/80 bg-emerald-950/20' },
              { id: 'holliday-segar' as CalculatorType, name: 'Holliday-Segar Cairan', org: 'Pediatrik Standar', desc: 'Kalkulasi kebutuhan cairan rumatan harian (maintenance fluid) anak & laju tetesan mL/jam.', badge: 'Pediatrik', color: 'border-amber-800/80 bg-amber-950/20' },
              { id: 'pediatric-dehydration' as CalculatorType, name: 'Derajat Dehidrasi WHO', org: 'WHO Guidelines', desc: 'Klasifikasi dehidrasi diare akut anak (Tanpa, Ringan-Sedang, Berat) & Rencana Terapi Cairan A/B/C.', badge: 'Gastro Pediatrik', color: 'border-orange-800/80 bg-orange-950/20' },
              { id: 'hba1c-eag' as CalculatorType, name: 'HbA1c to eAG Converter', org: 'ADA / ADAG Study', desc: 'Konversi nilai HbA1c (%) menjadi perkiraan rata-rata glukosa darah harian (eAG mg/dL).', badge: 'Endokrin', color: 'border-purple-800/80 bg-purple-950/20' },
              { id: 'act-asthma' as CalculatorType, name: 'Asthma Control Test (ACT)', org: 'GINA Standard', desc: 'Kuesioner evaluasi tingkat kendali asma 4 minggu (Terkontrol Penuh, Baik, Tidak Terkontrol).', badge: 'Asma / Paru', color: 'border-sky-800/80 bg-sky-950/20' },
              { id: 'phq9' as CalculatorType, name: 'PHQ-9 Depression Scale', org: 'DSM-5 / APA', desc: 'Instrumen skrining tingkat keparahan depresi 9 kriteria dan evaluasi efikasi antidepresan.', badge: 'Psikiatri', color: 'border-fuchsia-800/80 bg-fuchsia-950/20' },
              { id: 'bishop' as CalculatorType, name: 'Bishop Score Induksi', org: 'ACOG Obstetri', desc: 'Penilaian kematangan serviks untuk memprediksi keberhasilan induksi persalinan pervaginam.', badge: 'Obstetri', color: 'border-pink-800/80 bg-pink-950/20' }
            ].map(scoreItem => (
              <div
                key={scoreItem.id}
                className={`p-4.5 rounded-2xl border ${scoreItem.color} flex flex-col justify-between space-y-3 shadow-md hover:border-slate-600 transition group`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-slate-300 border border-slate-700">
                      {scoreItem.badge}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{scoreItem.org}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition">
                    {scoreItem.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {scoreItem.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedClinicalScore(scoreItem.id);
                    setIsScoresModalOpen(true);
                  }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-teal-600 text-slate-200 hover:text-white border border-slate-700 hover:border-teal-500 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Buka Kalkulator Skor</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                </button>
              </div>
            ))}
          </div>

          {/* Modal for Clinical Score */}
          {isScoresModalOpen && selectedClinicalScore && (
            <ClinicalScoreCalculatorsModal
              isOpen={isScoresModalOpen}
              onClose={() => setIsScoresModalOpen(false)}
              initialCalculator={selectedClinicalScore}
              allDrugs={drugs}
            />
          )}
        </div>
      )}

    </div>
  );
};
