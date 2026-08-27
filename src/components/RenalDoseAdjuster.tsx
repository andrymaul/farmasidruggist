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
  Check
} from 'lucide-react';

interface RenalDoseAdjusterProps {
  drugs: Drug[];
  currentUser: UserProfile | null;
  onOpenPricingModal: () => void;
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
  onOpenPricingModal
}) => {
  const [activeTab, setActiveTab] = useState<'renal' | 'hepatic' | 'opioid' | 'ibw-bmi' | 'oxygen'>('renal');

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

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#143d47] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Kalkulator Farmakoterapi Klinis Terpadu</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kalkulator Medis & Penyesuaian Dosis
          </h1>
          <p className="text-teal-100/80 text-xs sm:text-sm leading-relaxed font-medium">
            Suite kalkulator farmako-klinis terverifikasi: Klirens Ginjal (CrCl/eGFR), Skor Hepar (Child-Pugh & MELD), Konversi Opioid & Paliatif (OME CDC), Berat Badan Ideal (IBW), & Oksigen Medis.
          </p>
        </div>

        {/* Top 5-Tab Switcher Menu */}
        <div className="bg-[#06181c] p-1.5 rounded-2xl border border-[#14424e] grid grid-cols-2 sm:flex sm:items-center gap-1.5 shrink-0 w-full sm:w-auto overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('renal')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'renal'
                ? 'bg-[#0f766e] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Dosis Ginjal</span>
          </button>

          <button
            onClick={() => setActiveTab('hepatic')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'hepatic'
                ? 'bg-[#0f766e] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Dosis Hepar</span>
          </button>

          <button
            onClick={() => setActiveTab('opioid')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'opioid'
                ? 'bg-[#0f766e] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Konversi Opioid</span>
          </button>

          <button
            onClick={() => setActiveTab('ibw-bmi')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'ibw-bmi'
                ? 'bg-[#0f766e] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>IBW & BMI</span>
          </button>

          <button
            onClick={() => setActiveTab('oxygen')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'oxygen'
                ? 'bg-[#0f766e] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>Oksigen Medis</span>
          </button>
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

    </div>
  );
};
