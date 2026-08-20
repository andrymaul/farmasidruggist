import React, { useState } from 'react';
import { Drug, UserProfile } from '../types';
import { 
  Calculator, 
  Activity, 
  BookOpen, 
  FileText, 
  Binary, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Pill, 
  User, 
  Scale, 
  Info,
  ChevronRight,
  Sparkles,
  Search,
  Baby,
  Stethoscope,
  Droplets,
  Ruler,
  Clock,
  Sliders,
  Wind,
  Gauge
} from 'lucide-react';

interface RenalDoseAdjusterProps {
  drugs: Drug[];
  currentUser: UserProfile | null;
  onOpenPricingModal: () => void;
}

interface PediatricDrugPreset {
  name: string;
  genericName: string;
  strengthLabel: string;
  mgStrength: number;
  mlStrength: number;
  defaultDoseMgKg: number;
  minDoseMgKg: number;
  maxDoseMgKg: number;
  defaultMode: 'per-day' | 'per-dose';
  defaultTimesPerDay: number;
  literatureRangeLabel: string;
  literatureSource: string;
  maxDailyAbsoluteMg?: number;
  notes: string;
}

const PEDIATRIC_DRUG_PRESETS: PediatricDrugPreset[] = [
  {
    name: 'Paracetamol Drops Bayi',
    genericName: 'Paracetamol (Tetes Bayi)',
    strengthLabel: '100 mg / 1 mL',
    mgStrength: 100,
    mlStrength: 1,
    defaultDoseMgKg: 12.5,
    minDoseMgKg: 10,
    maxDoseMgKg: 15,
    defaultMode: 'per-dose',
    defaultTimesPerDay: 4,
    literatureRangeLabel: '10 - 15 mg/kgBB/kali (maks 60 mg/kg/hari)',
    literatureSource: 'IDAI / Nelson Pediatric / BNF for Children',
    maxDailyAbsoluteMg: 4000,
    notes: 'Sediaan tetes bayi (infant drops). Gunakan pipet tetes presisi.'
  },
  {
    name: 'Paracetamol Sirup Standar',
    genericName: 'Paracetamol',
    strengthLabel: '120 mg / 5 mL',
    mgStrength: 120,
    mlStrength: 5,
    defaultDoseMgKg: 12.5,
    minDoseMgKg: 10,
    maxDoseMgKg: 15,
    defaultMode: 'per-dose',
    defaultTimesPerDay: 4,
    literatureRangeLabel: '10 - 15 mg/kgBB/kali (maks 60 mg/kg/hari)',
    literatureSource: 'IDAI / Nelson Pediatric / BNF for Children',
    maxDailyAbsoluteMg: 4000,
    notes: 'Dosis lazim anak: 10 - 15 mg/kgBB per kali minum (maksimal 4-5x sehari).'
  },
  {
    name: 'Paracetamol Forte Sirup',
    genericName: 'Paracetamol (Forte)',
    strengthLabel: '250 mg / 5 mL',
    mgStrength: 250,
    mlStrength: 5,
    defaultDoseMgKg: 12.5,
    minDoseMgKg: 10,
    maxDoseMgKg: 15,
    defaultMode: 'per-dose',
    defaultTimesPerDay: 4,
    literatureRangeLabel: '10 - 15 mg/kgBB/kali (maks 60 mg/kg/hari)',
    literatureSource: 'IDAI / Nelson Pediatric / BNF for Children',
    maxDailyAbsoluteMg: 4000,
    notes: 'Sediaan konsentrasi tinggi untuk anak di atas 6 tahun.'
  },
  {
    name: 'Amoxicillin Sirup Kering',
    genericName: 'Amoxicillin Trihydrate',
    strengthLabel: '125 mg / 5 mL',
    mgStrength: 125,
    mlStrength: 5,
    defaultDoseMgKg: 30,
    minDoseMgKg: 25,
    maxDoseMgKg: 50,
    defaultMode: 'per-day',
    defaultTimesPerDay: 3,
    literatureRangeLabel: '25 - 50 mg/kgBB/hari (Infeksi berat / OMA: 80-90 mg/kg/hari)',
    literatureSource: 'IDAI / AAP Pediatric Guidelines / Nelson',
    maxDailyAbsoluteMg: 3000,
    notes: 'Dosis total harian: 25 - 50 mg/kgBB/hari dibagi dalam 3 dosis terbagi.'
  },
  {
    name: 'Amoxicillin Forte Sirup',
    genericName: 'Amoxicillin (Forte)',
    strengthLabel: '250 mg / 5 mL',
    mgStrength: 250,
    mlStrength: 5,
    defaultDoseMgKg: 40,
    minDoseMgKg: 25,
    maxDoseMgKg: 50,
    defaultMode: 'per-day',
    defaultTimesPerDay: 3,
    literatureRangeLabel: '25 - 50 mg/kgBB/hari (Infeksi berat: 80-90 mg/kg/hari)',
    literatureSource: 'IDAI / AAP Guidelines / BNF for Children',
    maxDailyAbsoluteMg: 3000,
    notes: 'Untuk infeksi bakteri sedang-berat pada anak.'
  },
  {
    name: 'Ibuprofen Sirup Anak',
    genericName: 'Ibuprofen',
    strengthLabel: '100 mg / 5 mL',
    mgStrength: 100,
    mlStrength: 5,
    defaultDoseMgKg: 7.5,
    minDoseMgKg: 5,
    maxDoseMgKg: 10,
    defaultMode: 'per-dose',
    defaultTimesPerDay: 3,
    literatureRangeLabel: '5 - 10 mg/kgBB/kali (maks 30 - 40 mg/kg/hari)',
    literatureSource: 'IDAI / Nelson Pediatric / BNF for Children',
    maxDailyAbsoluteMg: 2400,
    notes: 'Dosis lazim anak: 5 - 10 mg/kgBB per kali minum. Berikan sesudah makan.'
  },
  {
    name: 'Cefixime Sirup Kering',
    genericName: 'Cefixime',
    strengthLabel: '100 mg / 5 mL',
    mgStrength: 100,
    mlStrength: 5,
    defaultDoseMgKg: 8,
    minDoseMgKg: 8,
    maxDoseMgKg: 10,
    defaultMode: 'per-day',
    defaultTimesPerDay: 2,
    literatureRangeLabel: '8 - 10 mg/kgBB/hari (dosis tunggal atau 2 dosis terbagi)',
    literatureSource: 'IDAI / Nelson Pediatric / Medscape',
    maxDailyAbsoluteMg: 400,
    notes: 'Dosis total harian: 8 - 10 mg/kgBB/hari dibagi 1 - 2 kali sehari.'
  },
  {
    name: 'Cetirizine Sirup Anak',
    genericName: 'Cetirizine HCl',
    strengthLabel: '5 mg / 5 mL',
    mgStrength: 5,
    mlStrength: 5,
    defaultDoseMgKg: 0.25,
    minDoseMgKg: 0.25,
    maxDoseMgKg: 0.5,
    defaultMode: 'per-dose',
    defaultTimesPerDay: 1,
    literatureRangeLabel: '0.25 - 0.5 mg/kgBB/hari (atau 2.5 - 5 mg/hari)',
    literatureSource: 'IDAI / BNF for Children / Drugs.com',
    maxDailyAbsoluteMg: 10,
    notes: 'Usia 2-6 thn: 2.5 mg (2.5 mL) 1x/hari. Usia >6 thn: 5-10 mg (5-10 mL) 1x/hari.'
  },
  {
    name: 'Domperidone Sirup',
    genericName: 'Domperidone',
    strengthLabel: '5 mg / 5 mL',
    mgStrength: 5,
    mlStrength: 5,
    defaultDoseMgKg: 0.25,
    minDoseMgKg: 0.25,
    maxDoseMgKg: 0.4,
    defaultMode: 'per-dose',
    defaultTimesPerDay: 3,
    literatureRangeLabel: '0.25 - 0.4 mg/kgBB/kali (maks 1 mg/kgBB/hari)',
    literatureSource: 'BNF for Children / MIMS Pediatrik',
    maxDailyAbsoluteMg: 80,
    notes: 'Dosis lazim anak: 0.25 - 0.4 mg/kgBB per kali minum (15-30 menit sebelum makan).'
  },
  {
    name: 'Cotrimoxazole Sirup',
    genericName: 'Sulfamethoxazole + Trimethoprim',
    strengthLabel: '240 mg / 5 mL',
    mgStrength: 240,
    mlStrength: 5,
    defaultDoseMgKg: 30,
    minDoseMgKg: 25,
    maxDoseMgKg: 40,
    defaultMode: 'per-day',
    defaultTimesPerDay: 2,
    literatureRangeLabel: '25 - 40 mg SMX/kgBB/hari (atau 5 - 8 mg TMP/kgBB/hari)',
    literatureSource: 'IDAI / WHO Pocket Book of Hospital Care for Children',
    maxDailyAbsoluteMg: 1920,
    notes: 'Berdasarkan komponen Sulfamethoxazole (25-40 mg/kgBB/hari dibagi 2 dosis).'
  },
  {
    name: 'Ambroxol Sirup Anak',
    genericName: 'Ambroxol HCl',
    strengthLabel: '15 mg / 5 mL',
    mgStrength: 15,
    mlStrength: 5,
    defaultDoseMgKg: 1.5,
    minDoseMgKg: 1.2,
    maxDoseMgKg: 1.6,
    defaultMode: 'per-day',
    defaultTimesPerDay: 3,
    literatureRangeLabel: '1.2 - 1.6 mg/kgBB/hari (dibagi 2 - 3 dosis)',
    literatureSource: 'MIMS Indonesia / BNF for Children',
    maxDailyAbsoluteMg: 120,
    notes: 'Mukolitik sekretolitik untuk batuk produktif pada anak.'
  },
  {
    name: 'Cefadroxil Sirup Kering',
    genericName: 'Cefadroxil Monohydrate',
    strengthLabel: '125 mg / 5 mL',
    mgStrength: 125,
    mlStrength: 5,
    defaultDoseMgKg: 30,
    minDoseMgKg: 25,
    maxDoseMgKg: 50,
    defaultMode: 'per-day',
    defaultTimesPerDay: 2,
    literatureRangeLabel: '25 - 50 mg/kgBB/hari (dibagi 2 dosis terbagi)',
    literatureSource: 'Nelson Pediatric / IDAI / Medscape',
    maxDailyAbsoluteMg: 2000,
    notes: 'Sefalosporin generasi I untuk infeksi saluran napas & kulit anak.'
  }
];

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

export const RenalDoseAdjuster: React.FC<RenalDoseAdjusterProps> = ({
  drugs,
  currentUser,
  onOpenPricingModal
}) => {
  const [activeTab, setActiveTab] = useState<'pediatric' | 'renal' | 'iv-drip' | 'ibw-bmi' | 'oxygen'>('pediatric');

  // 1. PEDIATRIC STATE
  const [pedsAgeYears, setPedsAgeYears] = useState<number>(3);
  const [pedsWeightKg, setPedsWeightKg] = useState<number>(14);
  const [pedsHeightCm, setPedsHeightCm] = useState<number>(95);
  const [adultDoseMg, setAdultDoseMg] = useState<number>(500);

  const [selectedPreset, setSelectedPreset] = useState<PediatricDrugPreset>(PEDIATRIC_DRUG_PRESETS[1]);
  const [doseMode, setDoseMode] = useState<'per-day' | 'per-dose'>(PEDIATRIC_DRUG_PRESETS[1].defaultMode);
  const [targetMgKg, setTargetMgKg] = useState<number>(PEDIATRIC_DRUG_PRESETS[1].defaultDoseMgKg);
  const [timesPerDay, setTimesPerDay] = useState<number>(PEDIATRIC_DRUG_PRESETS[1].defaultTimesPerDay);
  const [syrupMgStrength, setSyrupMgStrength] = useState<number>(PEDIATRIC_DRUG_PRESETS[1].mgStrength);
  const [syrupMlStrength, setSyrupMlStrength] = useState<number>(PEDIATRIC_DRUG_PRESETS[1].mlStrength);

  // 2. RENAL STATE
  const [renalAge, setRenalAge] = useState<number>(60);
  const [renalGender, setRenalGender] = useState<'male' | 'female'>('male');
  const [renalWeight, setRenalWeight] = useState<number>(65);
  const [renalScr, setRenalScr] = useState<number>(1.8);
  const [searchRenalDrug, setSearchRenalDrug] = useState('');

  // 3. IV DRIP INFUSION STATE
  const [ivVolumeMl, setIvVolumeMl] = useState<number>(500);
  const [ivTimeHours, setIvTimeHours] = useState<number>(8);
  const [dripFactor, setDripFactor] = useState<number>(20);

  // 4. IBW & BMI STATE
  const [ibwGender, setIbwGender] = useState<'male' | 'female'>('male');
  const [ibwHeightCm, setIbwHeightCm] = useState<number>(170);
  const [ibwActualWeightKg, setIbwActualWeightKg] = useState<number>(85);

  // 5. OXYGEN CYLINDER DURATION & FIO2 STATE
  const [cylinderType, setCylinderType] = useState<string>('D'); // D=0.16, E=0.28, M=1.56, G=2.41, H=3.14
  const [pressurePsi, setPressurePsi] = useState<number>(1500); // Standard full ~2000 psi
  const [flowRateLpm, setFlowRateLpm] = useState<number>(3); // 1-15 LPM
  const [oxygenDeliveryDevice, setOxygenDeliveryDevice] = useState<string>('nasal-cannula');

  // PEDIATRIC CALCULATIONS WITH SAFEGUARD GUARDS
  const safePedsAge = Math.max(0, pedsAgeYears || 0);
  const safePedsWeight = Math.max(0, pedsWeightKg || 0);
  const safePedsHeight = Math.max(0, pedsHeightCm || 0);
  const safeAdultDose = Math.max(0, adultDoseMg || 0);

  let calculatedTotalDailyMg = 0;
  let calculatedSingleDoseMg = 0;
  let calculatedMinDailyMg = 0;
  let calculatedMaxDailyMg = 0;
  let calculatedMinSingleDoseMg = 0;
  let calculatedMaxSingleDoseMg = 0;

  const minDoseMgKg = selectedPreset.minDoseMgKg || (selectedPreset.defaultDoseMgKg * 0.8);
  const maxDoseMgKg = selectedPreset.maxDoseMgKg || (selectedPreset.defaultDoseMgKg * 1.2);

  if (doseMode === 'per-day') {
    calculatedTotalDailyMg = Math.round(targetMgKg * safePedsWeight * 10) / 10;
    calculatedSingleDoseMg = Math.round((calculatedTotalDailyMg / (timesPerDay || 1)) * 10) / 10;
    
    calculatedMinDailyMg = Math.round(minDoseMgKg * safePedsWeight * 10) / 10;
    calculatedMaxDailyMg = Math.round(maxDoseMgKg * safePedsWeight * 10) / 10;
    calculatedMinSingleDoseMg = Math.round((calculatedMinDailyMg / (timesPerDay || 1)) * 10) / 10;
    calculatedMaxSingleDoseMg = Math.round((calculatedMaxDailyMg / (timesPerDay || 1)) * 10) / 10;
  } else {
    calculatedSingleDoseMg = Math.round(targetMgKg * safePedsWeight * 10) / 10;
    calculatedTotalDailyMg = Math.round(calculatedSingleDoseMg * timesPerDay * 10) / 10;

    calculatedMinSingleDoseMg = Math.round(minDoseMgKg * safePedsWeight * 10) / 10;
    calculatedMaxSingleDoseMg = Math.round(maxDoseMgKg * safePedsWeight * 10) / 10;
    calculatedMinDailyMg = Math.round(calculatedMinSingleDoseMg * timesPerDay * 10) / 10;
    calculatedMaxDailyMg = Math.round(calculatedMaxSingleDoseMg * timesPerDay * 10) / 10;
  }

  const safeSyrupMg = Math.max(0.1, syrupMgStrength || 1);
  const safeSyrupMl = Math.max(0, syrupMlStrength || 0);
  
  const calculatedMlPerDose = Math.round(((calculatedSingleDoseMg / safeSyrupMg) * safeSyrupMl) * 100) / 100;
  const calculatedMinMlPerDose = Math.round(((calculatedMinSingleDoseMg / safeSyrupMg) * safeSyrupMl) * 100) / 100;
  const calculatedMaxMlPerDose = Math.round(((calculatedMaxSingleDoseMg / safeSyrupMg) * safeSyrupMl) * 100) / 100;
  
  const spoon5ml = Math.round((calculatedMlPerDose / 5) * 10) / 10;
  const dropper08ml = Math.round((calculatedMlPerDose / 0.8) * 10) / 10;
  const intervalHours = Math.round(24 / (timesPerDay || 1));

  const youngDoseMg = safePedsAge > 0 ? Math.round((safePedsAge / (safePedsAge + 12)) * safeAdultDose) : 0;
  const dillingDoseMg = safePedsAge > 0 ? Math.round((safePedsAge / 20) * safeAdultDose) : 0;
  const bsaM2 = (safePedsHeight > 0 && safePedsWeight > 0) ? Math.round(Math.sqrt((safePedsHeight * safePedsWeight) / 3600) * 100) / 100 : 0;
  const bsaDoseMg = bsaM2 > 0 ? Math.round((bsaM2 / 1.73) * safeAdultDose) : 0;

  // RENAL CALCULATIONS (Cockcroft-Gault)
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

  // IV DRIP CALCULATIONS
  const safeIvHours = Math.max(0, ivTimeHours || 0);
  const safeIvVol = Math.max(0, ivVolumeMl || 0);
  const calcTpm = safeIvHours > 0 ? Math.round((safeIvVol * dripFactor) / (safeIvHours * 60)) : 0;
  const calcSecPerDrop = calcTpm > 0 ? Math.round((60 / calcTpm) * 10) / 10 : 0;

  // IBW & BMI CALCULATIONS (Devine Formula)
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

  // OXYGEN DURATION CALCULATIONS
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

  const handleSelectPreset = (preset: PediatricDrugPreset) => {
    setSelectedPreset(preset);
    setDoseMode(preset.defaultMode);
    setTargetMgKg(preset.defaultDoseMgKg);
    setTimesPerDay(preset.defaultTimesPerDay);
    setSyrupMgStrength(preset.mgStrength);
    setSyrupMlStrength(preset.mlStrength);
  };

  const handleSwitchDoseMode = (newMode: 'per-day' | 'per-dose') => {
    if (newMode === doseMode) return;
    const freq = Math.max(1, timesPerDay || 1);
    if (newMode === 'per-day') {
      const newTarget = Math.round(targetMgKg * freq * 10) / 10;
      setDoseMode('per-day');
      setTargetMgKg(newTarget);
    } else {
      const newTarget = Math.round((targetMgKg / freq) * 10) / 10;
      setDoseMode('per-dose');
      setTargetMgKg(newTarget);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#143d47] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Calculator className="w-4 h-4 text-teal-400" />
            <span>Kalkulator Farmako-Klinis Terintegrasi</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kalkulator Dosis & Farmakoterapi Klinis
          </h1>
          <p className="text-teal-100/80 text-xs sm:text-sm leading-relaxed font-medium">
            Suite kalkulator medis lengkap: Dosis Pediatrik Anak, Dosis Ginjal CrCl, Tetesan Infus (TPM), Berat Badan Ideal (IBW), & Durasi Oksigen Medis.
          </p>
        </div>

        {/* Top 5-Tab Switcher Menu */}
        <div className="bg-[#06181c] p-1.5 rounded-2xl border border-[#14424e] grid grid-cols-2 sm:flex sm:items-center gap-1.5 shrink-0 w-full sm:w-auto overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('pediatric')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'pediatric'
                ? 'bg-[#0f766e] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
            }`}
          >
            <Baby className="w-4 h-4" />
            <span>Pediatrik</span>
          </button>

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
            onClick={() => setActiveTab('iv-drip')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'iv-drip'
                ? 'bg-[#0f766e] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#0e3742]'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>Tetesan Infus</span>
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
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'oxygen'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>Oksigen Medis</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PEDIATRIC DOSAGE CALCULATOR */}
      {activeTab === 'pediatric' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Baby className="w-5 h-5 text-teal-600" />
                <h2 className="text-sm font-bold text-slate-900">1. Parameter Fisik Pasien Bayi & Anak</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Usia Anak (Tahun):</label>
                    <input
                      type="number"
                      value={pedsAgeYears}
                      onChange={(e) => setPedsAgeYears(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Berat Badan Pasien (kg):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={pedsWeightKg}
                      onChange={(e) => setPedsWeightKg(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-teal-50 border border-teal-300 rounded-xl text-sm font-black text-teal-950 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tinggi Badan (cm):</label>
                    <input
                      type="number"
                      value={pedsHeightCm}
                      onChange={(e) => setPedsHeightCm(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Dosis Dewasa Acuan (mg):</label>
                    <input
                      type="number"
                      value={adultDoseMg}
                      onChange={(e) => setAdultDoseMg(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">2. Mode Aturan Dosis Farmakologi:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleSwitchDoseMode('per-day')}
                    className={`p-2.5 rounded-2xl font-bold border transition-all text-center ${
                      doseMode === 'per-day'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>mg / kgBB / Hari</span>
                    <p className="text-[9px] font-normal opacity-80">(Total Dosis Harian)</p>
                  </button>

                  <button
                    onClick={() => handleSwitchDoseMode('per-dose')}
                    className={`p-2.5 rounded-2xl font-bold border transition-all text-center ${
                      doseMode === 'per-dose'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>mg / kgBB / Kali</span>
                    <p className="text-[9px] font-normal opacity-80">(Sekali Minum)</p>
                  </button>
                </div>

                <div className="p-2 bg-teal-50/70 rounded-xl border border-teal-100 text-[10px] text-teal-900 leading-snug">
                  {doseMode === 'per-day' ? (
                    <span>💡 <strong>Mode Total Harian:</strong> Total Dosis (mg/hari) = Dosis mg/kg × BB. Dosis Sekali Minum (mg/dosis) = Total Harian ÷ Frekuensi Pemberian.</span>
                  ) : (
                    <span>💡 <strong>Mode Dosis Sekali Minum:</strong> Dosis Sekali Minum (mg/dosis) = Dosis mg/kg × BB. Total Dosis Harian (mg/hari) = Sekali Minum × Frekuensi.</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {doseMode === 'per-day' ? 'Dosis mg/kg/hari:' : 'Dosis mg/kg/kali:'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={targetMgKg}
                    onChange={(e) => setTargetMgKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Frekuensi Pemberian:</label>
                  <select
                    value={timesPerDay}
                    onChange={(e) => setTimesPerDay(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
                  >
                    <option value={1}>1 kali sehari (tiap 24 jam)</option>
                    <option value={2}>2 kali sehari (tiap 12 jam)</option>
                    <option value={3}>3 kali sehari (tiap 8 jam)</option>
                    <option value={4}>4 kali sehari (tiap 6 jam)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-teal-600" />
                  <span>Kekuatan Sediaan Objek (Kustom):</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">Kandungan Miligram (mg):</label>
                    <input
                      type="number"
                      value={syrupMgStrength}
                      onChange={(e) => setSyrupMgStrength(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">Per Volume (mL):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={syrupMlStrength}
                      onChange={(e) => setSyrupMlStrength(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Komparasi Rumus Baku Konversi Dosis:</p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-teal-50 p-2.5 rounded-2xl border border-teal-100">
                    <p className="text-[10px] text-teal-800 font-bold">Rumus Young</p>
                    <p className="text-sm font-black text-teal-950 mt-0.5">{youngDoseMg} <span className="text-[10px] font-normal">mg</span></p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                    <p className="text-[10px] text-slate-600 font-bold">Rumus Dilling</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">{dillingDoseMg} <span className="text-[10px] font-normal">mg</span></p>
                  </div>
                  <div className="bg-emerald-50 p-2.5 rounded-2xl border border-emerald-100">
                    <p className="text-[10px] text-emerald-800 font-bold">BSA Mosteller</p>
                    <p className="text-sm font-black text-emerald-950 mt-0.5">{bsaDoseMg} <span className="text-[10px] font-normal">mg</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-teal-600" />
                    <h2 className="text-sm font-bold text-slate-900">Pilih Obat & Sediaan Pediatrik Populer:</h2>
                  </div>
                  <span className="bg-teal-100 text-teal-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    BB Pasien: {pedsWeightKg} kg
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PEDIATRIC_DRUG_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-2.5 rounded-2xl text-left border transition-all ${
                        selectedPreset.name === preset.name
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs font-bold'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <p className="text-xs truncate">{preset.name}</p>
                      <p className={`text-[10px] ${selectedPreset.name === preset.name ? 'text-teal-100' : 'text-slate-500'}`}>{preset.strengthLabel}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 text-white space-y-5 shadow-xl border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-teal-500/30">
                      PRESISION DOSAGE RESULT
                    </span>
                    <h3 className="text-lg font-black text-teal-300 pt-1">{selectedPreset.name}</h3>
                    <p className="text-xs text-slate-300 font-medium">{selectedPreset.genericName} • Sediaan: {syrupMgStrength} mg / {syrupMlStrength} mL</p>
                  </div>

                  <div className="text-left sm:text-right shrink-0 bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Aturan Pakai Terjadwal:</p>
                    <p className="text-sm font-black text-teal-400">{timesPerDay}x Sehari <span className="text-xs font-normal text-slate-300">(Tiap {intervalHours} Jam)</span></p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700 space-y-0.5">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Dosis Total Harian:</p>
                      <p className="text-2xl font-black text-teal-400">{calculatedTotalDailyMg}</p>
                      <p className="text-[10px] text-slate-400">mg / hari</p>
                    </div>

                    <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700 space-y-0.5">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Dosis Sekali Minum:</p>
                      <p className="text-2xl font-black text-teal-400">{calculatedSingleDoseMg}</p>
                      <p className="text-[10px] text-slate-400">mg / dosis</p>
                    </div>

                    <div className="bg-teal-950 p-3.5 rounded-2xl border border-teal-500/50 space-y-0.5 col-span-2 sm:col-span-2">
                      <p className="text-[10px] text-teal-300 uppercase font-bold">VOLUME PRESISI SEKALI MINUM (mL):</p>
                      <p className="text-3xl font-black text-white">{calculatedMlPerDose} <span className="text-base text-teal-300">mL</span></p>
                      <div className="flex items-center justify-center gap-3 pt-1 text-[11px] font-bold text-teal-200 border-t border-teal-800/80">
                        <span>🥄 {spoon5ml} Sendok Takar (5 mL)</span>
                        <span>•</span>
                        <span>💧 {dropper08ml} Pipet Tetes (0.8 mL)</span>
                      </div>
                    </div>
                  </div>

                  {/* Rentang Dosis Literatur Box */}
                  <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-teal-500/30 text-xs text-white space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-700/80 pb-1.5">
                      <span className="font-extrabold text-teal-300 flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-teal-400" />
                        <span>Rentang Dosis Literatur Aman Pasien (BB {pedsWeightKg} kg):</span>
                      </span>
                      <span className="text-[10px] text-slate-400">{selectedPreset.literatureSource}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-[11px]">
                      <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-700/60">
                        <p className="text-slate-400 text-[10px]">Rentang Harian:</p>
                        <p className="font-bold text-teal-300 mt-0.5">
                          {calculatedMinDailyMg} - {calculatedMaxDailyMg} <span className="text-[10px] font-normal text-slate-300">mg/hari</span>
                        </p>
                      </div>

                      <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-700/60">
                        <p className="text-slate-400 text-[10px]">Rentang Sekali Minum:</p>
                        <p className="font-bold text-teal-300 mt-0.5">
                          {calculatedMinSingleDoseMg} - {calculatedMaxSingleDoseMg} <span className="text-[10px] font-normal text-slate-300">mg/dosis</span>
                        </p>
                      </div>

                      <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-700/60">
                        <p className="text-slate-400 text-[10px]">Rentang Volume Sirup (mL):</p>
                        <p className="font-bold text-amber-300 mt-0.5">
                          {calculatedMinMlPerDose} - {calculatedMaxMlPerDose} <span className="text-[10px] font-normal text-slate-300">mL</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80 text-xs text-slate-300 space-y-1">
                  <p className="font-bold text-teal-300 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-teal-400" />
                    <span>Petunjuk Pemberian Obat Pasien Anak:</span>
                  </p>
                  <p className="leading-relaxed">
                    Minumkan sebanyak <strong>{calculatedMlPerDose} mL</strong> (sekitar {spoon5ml} sendok takar 5mL) sebanyak <strong>{timesPerDay} kali sehari</strong> (setiap {intervalHours} jam). {selectedPreset.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>

              {/* Formula & Calculation Step-by-Step Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <BookOpen className="w-5 h-5 text-teal-400" />
                  <h3 className="text-sm font-black text-teal-300">
                    📐 Keterangan Rumus Matematis & Langkah Perhitungan Dosis Pediatrik
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Rumus Berat Badan & Sediaan */}
                  <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2.5">
                    <p className="font-bold text-teal-300 flex items-center gap-1.5">
                      <Binary className="w-4 h-4 text-teal-400" />
                      <span>1. Rumus Dosis Berbasis Berat Badan (BB):</span>
                    </p>
                    <div className="bg-slate-950/80 p-3 rounded-xl font-mono text-[11px] text-teal-200 space-y-1 border border-teal-900/40">
                      <p className="text-slate-400">// Dosis Total Harian:</p>
                      <p className="font-bold">Dosis Harian (mg) = Dosis Acuan (mg/kg) × BB (kg)</p>
                      <p className="text-teal-300">
                        = {targetMgKg} mg/kg × {safePedsWeight} kg = <strong className="text-white">{calculatedTotalDailyMg} mg/hari</strong>
                      </p>
                      <div className="pt-2 border-t border-slate-800">
                        <p className="text-slate-400">// Dosis Sekali Minum:</p>
                        <p className="font-bold">Dosis Sekali Minum (mg) = Dosis Harian ÷ Frekuensi</p>
                        <p className="text-teal-300">
                          = {calculatedTotalDailyMg} mg ÷ {timesPerDay}x = <strong className="text-white">{calculatedSingleDoseMg} mg/kali</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rumus Konversi Volume Sirup */}
                  <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2.5">
                    <p className="font-bold text-teal-300 flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-teal-400" />
                      <span>2. Rumus Konversi Volume Sediaan Sirup (mL):</span>
                    </p>
                    <div className="bg-slate-950/80 p-3 rounded-xl font-mono text-[11px] text-teal-200 space-y-1 border border-teal-900/40">
                      <p className="text-slate-400">// Perhitungan Volume Minum (mL):</p>
                      <p className="font-bold">Volume (mL) = (Dosis Sekali Minum ÷ Kekuatan mg) × Volume Sediaan (mL)</p>
                      <p className="text-teal-300">
                        = ({calculatedSingleDoseMg} mg ÷ {safeSyrupMg} mg) × {safeSyrupMl} mL
                      </p>
                      <p className="text-amber-300 font-bold">
                        = <strong className="text-white text-sm">{calculatedMlPerDose} mL</strong> (± {spoon5ml} sendok takar 5mL)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Komparasi Rumus Pediatrik Baku Klasik */}
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2.5 text-xs">
                  <p className="font-bold text-teal-300 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-teal-400" />
                    <span>3. Referensi & Keterangan Rumus Konversi Dosis Pediatrik Klasik:</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px]">
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <p className="font-bold text-teal-300">Rumus Young (1-12 Thn):</p>
                      <p className="font-mono text-[10px] text-slate-300">Dosis = [Usia / (Usia + 12)] × Dosis Dewasa</p>
                      <p className="text-teal-400 font-bold mt-1">= [{safePedsAge} / ({safePedsAge} + 12)] × {safeAdultDose} = {youngDoseMg} mg</p>
                    </div>

                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <p className="font-bold text-teal-300">Rumus Dilling (&gt; 8 Thn):</p>
                      <p className="font-mono text-[10px] text-slate-300">Dosis = (Usia / 20) × Dosis Dewasa</p>
                      <p className="text-teal-400 font-bold mt-1">= ({safePedsAge} / 20) × {safeAdultDose} = {dillingDoseMg} mg</p>
                    </div>

                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <p className="font-bold text-teal-300">Rumus Clark (Berat Badan):</p>
                      <p className="font-mono text-[10px] text-slate-300">Dosis = (BB Anak / 70 kg) × Dosis Dewasa</p>
                      <p className="text-teal-400 font-bold mt-1">= ({safePedsWeight} / 70) × {safeAdultDose} = {Math.round((safePedsWeight / 70) * safeAdultDose)} mg</p>
                    </div>

                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <p className="font-bold text-teal-300">Rumus BSA (Mosteller):</p>
                      <p className="font-mono text-[10px] text-slate-300">Dosis = (BSA / 1.73 m²) × Dosis Dewasa</p>
                      <p className="text-teal-400 font-bold mt-1">= ({bsaM2} / 1.73) × {safeAdultDose} = {bsaDoseMg} mg</p>
                    </div>
                  </div>
                </div>
              </div>

        </div>
      )}

      {/* TAB 2: RENAL DOSAGE CALCULATOR */}
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
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Berat Badan (kg):</label>
                    <input
                      type="number"
                      value={renalWeight}
                      onChange={(e) => setRenalWeight(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Serum Kreatinin (SrCr mg/dL):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={renalScr}
                      onChange={(e) => setRenalScr(Number(e.target.value))}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
                    />
                    <span className="text-xs font-semibold text-slate-500">mg/dL</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-2xl text-white space-y-1 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Nilai Estimasi CrCl:</p>
                <p className="text-3xl font-black text-teal-400">{crClValue} <span className="text-xs font-normal text-slate-300">mL/min</span></p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${ckdInfo.color}`}>
                  {ckdInfo.stage}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-teal-600" />
                  <h2 className="text-sm font-bold text-slate-900">Rekomendasi Dosis Ginjal Obat Berisiko</h2>
                </div>

                <div className="relative w-60">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchRenalDrug}
                    onChange={(e) => setSearchRenalDrug(e.target.value)}
                    placeholder="Cari obat (Metformin...)"
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredRenalRules.map((item, idx) => {
                  const matchedRule = item.rules.find(
                    (r) => crClValue >= r.minCrCl && crClValue <= r.maxCrCl
                  ) || item.rules[item.rules.length - 1];

                  return (
                    <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-3">
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-slate-900">{item.drugName}</h3>
                            <span className="bg-teal-50 text-teal-700 text-[10px] px-2 py-0.5 rounded font-bold border border-teal-100">
                              ATC: {item.atcCode}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">Generik: {item.genericName}</p>
                        </div>

                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          matchedRule.status === 'Normal'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : matchedRule.status === 'Adjust'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-red-100 text-red-800 border-red-300 animate-pulse'
                        }`}>
                          {matchedRule.status === 'Normal' ? '✅ Dosis Standar' : matchedRule.status === 'Adjust' ? '⚠️ Perlu Penyesuaian Dosis' : '🚫 KONTRAINDIKASI'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dosis Normal Pasien Tanpa Gangguan Ginjal:</p>
                          <p className="font-bold text-slate-800">{item.normalDose}</p>
                        </div>

                        <div className={`p-3 rounded-2xl border space-y-1 ${
                          matchedRule.status === 'Contraindicated' 
                            ? 'bg-red-50 border-red-200 text-red-900' 
                            : 'bg-teal-50 border-teal-100 text-teal-950'
                        }`}>
                          <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Rekomendasi Dosis (CrCl = {crClValue} mL/min):</p>
                          <p className="font-bold leading-relaxed">{matchedRule.recommendation}</p>
                        </div>
                      </div>

                      <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2 text-[11px] text-amber-900">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <p className="leading-snug">
                          <strong>Catatan Klinis:</strong> {item.clinicalPearls}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Renal Formula & Step-by-Step Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <h3 className="text-sm font-black text-teal-300">
                📐 Keterangan Rumus Cockcroft-Gault & Penilaian Fungsi Ginjal (CrCl / eGFR)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2.5">
                <p className="font-bold text-teal-300 flex items-center gap-1.5">
                  <Binary className="w-4 h-4 text-teal-400" />
                  <span>1. Persamaan Baku Cockcroft-Gault (CrCl):</span>
                </p>
                <div className="bg-slate-950/80 p-3 rounded-xl font-mono text-[11px] text-teal-200 space-y-1.5 border border-teal-900/40">
                  <p className="text-slate-400">// Pasien Laki-Laki:</p>
                  <p className="font-bold">CrCl (mL/min) = [(140 - Usia) × Berat Badan (kg)] ÷ [72 × Serum Kreatinin (mg/dL)]</p>
                  
                  <p className="text-slate-400 pt-1 border-t border-slate-800">// Pasien Wanita (Koreksi Massa Otot × 0.85):</p>
                  <p className="font-bold">CrCl Wanita (mL/min) = CrCl Laki-Laki × 0.85</p>

                  <div className="pt-2 border-t border-slate-800 text-amber-300">
                    <p className="text-slate-400">// Substitusi Nilai Pasien:</p>
                    <p>
                      CrCl = [({140} - {renalAge}) × {renalWeight} kg] ÷ [72 × {renalScr} mg/dL] {renalGender === 'female' ? '× 0.85' : ''}
                    </p>
                    <p className="text-white font-bold text-sm mt-1">
                      = <strong className="text-teal-400">{crClValue} mL/menit</strong> ({ckdInfo.stage})
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2.5">
                <p className="font-bold text-teal-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-400" />
                  <span>2. Kategori Derajat Gangguan Ginjal (KDIGO & FDA Guideline):</span>
                </p>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="font-bold text-emerald-400">G1 (CrCl ≥ 90 mL/min):</span>
                    <span className="text-slate-300">Fungsi Ginjal Normal / Optimal</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="font-bold text-teal-400">G2 (CrCl 60 - 89 mL/min):</span>
                    <span className="text-slate-300">Penurunan Fungsi Ringan</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="font-bold text-amber-400">G3a-G3b (CrCl 30 - 59 mL/min):</span>
                    <span className="text-slate-300">Gangguan Ginjal Sedang</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="font-bold text-rose-400">G4 (CrCl 15 - 29 mL/min):</span>
                    <span className="text-slate-300">Gangguan Ginjal Berat</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="font-bold text-red-500">G5 (CrCl &lt; 15 mL/min / HD):</span>
                    <span className="text-slate-300">Gagal Ginjal Terminal (End-Stage)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: IV DRIP INFUSION CALCULATOR */}
      {activeTab === 'iv-drip' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Droplets className="w-6 h-6 text-teal-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Kalkulator Kecepatan Tetesan Infus (IV Drip TPM)</h2>
              <p className="text-xs text-slate-500">Hitung Tetes Per Menit (TPM) dan interval waktu antar tetesan infus pasien.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Volume Cairan Infus (mL):</label>
              <input
                type="number"
                value={ivVolumeMl}
                onChange={(e) => setIvVolumeMl(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Waktu Habis (Jam):</label>
              <input
                type="number"
                value={ivTimeHours}
                onChange={(e) => setIvTimeHours(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Faktor Tetes Set Infus:</label>
              <select
                value={dripFactor}
                onChange={(e) => setDripFactor(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
              >
                <option value={20}>Makro 20 tetes/mL (Dewasa Standar)</option>
                <option value={60}>Mikro 60 tetes/mL (Pediatrik / Otsuka)</option>
                <option value={15}>Terumo 15 tetes/mL (Darah / Plasma)</option>
              </select>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-teal-950 rounded-3xl p-6 text-white grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-lg text-center">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Kecepatan Tetesan Infus:</p>
              <p className="text-4xl font-black text-teal-400 mt-1">{calcTpm} <span className="text-sm font-semibold text-slate-300">TPM (Tetes/Menit)</span></p>
            </div>

            <div className="bg-teal-950 p-4 rounded-2xl border border-teal-500/40">
              <p className="text-[10px] text-teal-300 uppercase font-bold">Interval Tetesan:</p>
              <p className="text-4xl font-black text-white mt-1">1 <span className="text-sm font-semibold text-teal-200">tetes tiap</span> {calcSecPerDrop} <span className="text-sm font-semibold text-teal-200">detik</span></p>
            </div>
          </div>

          {/* IV Drip Formula & Step-by-Step Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <h3 className="text-sm font-black text-teal-300">
                📐 Keterangan Rumus Kecepatan Tetesan Infus & Pompa Syringe (IV Drip TPM)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <p className="font-bold text-teal-300">1. Rumus Tetes Per Menit (TPM):</p>
                <div className="bg-slate-950/80 p-3 rounded-xl font-mono text-[11px] text-teal-200 space-y-1 border border-teal-900/40">
                  <p className="font-bold text-slate-300">TPM = (Volume mL × Faktor Tetes) ÷ (Waktu Jam × 60)</p>
                  <p className="text-amber-300 pt-1">
                    = ({ivVolumeMl} × {dripFactor}) ÷ ({ivTimeHours} × 60)
                  </p>
                  <p className="text-white font-black text-sm">
                    = <strong className="text-teal-400">{calcTpm} TPM</strong>
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <p className="font-bold text-teal-300">2. Rumus Interval Waktu Tetes:</p>
                <div className="bg-slate-950/80 p-3 rounded-xl font-mono text-[11px] text-teal-200 space-y-1 border border-teal-900/40">
                  <p className="font-bold text-slate-300">Interval (Detik) = 60 Detik ÷ Nilai TPM</p>
                  <p className="text-amber-300 pt-1">
                    = 60 ÷ {calcTpm || 1}
                  </p>
                  <p className="text-white font-black text-sm">
                    = 1 tetes tiap <strong className="text-teal-400">{calcSecPerDrop} detik</strong>
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <p className="font-bold text-teal-300">3. Kecepatan Pompa (Infusion Pump):</p>
                <div className="bg-slate-950/80 p-3 rounded-xl font-mono text-[11px] text-teal-200 space-y-1 border border-teal-900/40">
                  <p className="font-bold text-slate-300">Laju (mL/Jam) = Volume Total (mL) ÷ Target Waktu (Jam)</p>
                  <p className="text-amber-300 pt-1">
                    = {ivVolumeMl} mL ÷ {ivTimeHours} Jam
                  </p>
                  <p className="text-white font-black text-sm">
                    = <strong className="text-teal-400">{ivTimeHours > 0 ? Math.round((ivVolumeMl / ivTimeHours) * 10) / 10 : 0} mL/Jam</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: IBW & BMI CALCULATOR */}
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

          {/* IBW & BMI Formula & Step-by-Step Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <h3 className="text-sm font-black text-teal-300">
                📐 Keterangan Rumus Berat Badan Ideal (Devine IBW, ABW & BMI)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2.5">
                <p className="font-bold text-teal-300 flex items-center gap-1.5">
                  <Binary className="w-4 h-4 text-teal-400" />
                  <span>1. Rumus Devine (Berat Badan Ideal / IBW):</span>
                </p>
                <div className="bg-slate-950/80 p-3 rounded-xl font-mono text-[11px] text-teal-200 space-y-1 border border-teal-900/40">
                  <p className="text-slate-400">// Laki-Laki: 50 kg + 0.9 × (TB cm - 152.4 cm)</p>
                  <p className="text-slate-400">// Wanita: 45.5 kg + 0.9 × (TB cm - 152.4 cm)</p>
                  <div className="pt-2 border-t border-slate-800 text-amber-300">
                    <p>
                      IBW = {ibwGender === 'male' ? '50' : '45.5'} + 0.9 × ({safeHeightCm} - 152.4)
                    </p>
                    <p className="text-white font-bold mt-1">
                      = <strong className="text-teal-400 text-sm">{ibwKg} kg</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2.5">
                <p className="font-bold text-teal-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-teal-400" />
                  <span>2. Rumus Adjusted Body Weight (ABW Koreksi Obesitas):</span>
                </p>
                <div className="bg-slate-950/80 p-3 rounded-xl font-mono text-[11px] text-teal-200 space-y-1 border border-teal-900/40">
                  <p className="text-slate-400">// ABW = IBW + 0.4 × (BB Aktual - IBW)</p>
                  <p className="text-amber-300 pt-1">
                    = {ibwKg} + 0.4 × ({ibwActualWeightKg} - {ibwKg})
                  </p>
                  <p className="text-white font-bold mt-1">
                    = <strong className="text-teal-400 text-sm">{abwKg} kg</strong> (Dosis Aminoglikosida)
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: OXYGEN MEDIS CALCULATOR */}
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
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
              >
                <option value="D">Tabung D (1 m³ / 350 L - Kecil Portable)</option>
                <option value="E">Tabung E (1.5 m³ / 600 L - Ambulance)</option>
                <option value="M">Tabung M (3 m³ / 3000 L - Sedang Klinik)</option>
                <option value="G">Tabung G (6 m³ / 6000 L - Besar Klinik)</option>
                <option value="H">Tabung H/K (7 m³ / 6900 L - Besar Rumah Sakit)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Tekanan Manometer (PSI / Bar):</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={pressurePsi}
                  onChange={(e) => setPressurePsi(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-500">PSI</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-1">Penuh ≈ 2000 PSI (Batas aman: 200 PSI)</p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Laju Aliran Flowmeter (LPM):</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.5"
                  value={flowRateLpm}
                  onChange={(e) => setFlowRateLpm(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-teal-50 border border-teal-300 rounded-xl text-xs font-black text-teal-950 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <span className="text-xs font-bold text-teal-700">L/menit</span>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Alat Terapi Oksigen Pasien:</label>
              <select
                value={oxygenDeliveryDevice}
                onChange={(e) => setOxygenDeliveryDevice(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
              >
                <option value="nasal-cannula">Nasal Kanul (1-6 LPM)</option>
                <option value="simple-mask">Simple Mask (5-8 LPM)</option>
                <option value="nrm">NRM / Kantung Masker (10-15 LPM)</option>
                <option value="venturi-mask">Venturi Mask (Presisi High Flow)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            
            <div className="bg-gradient-to-r from-slate-900 to-teal-950 p-5 rounded-3xl text-white space-y-1 shadow-lg sm:col-span-2">
              <p className="text-[10px] text-teal-300 uppercase font-bold tracking-wider">ESTIMASI DURASI WAKTU HABIS TABUNG OKSIGEN:</p>
              <p className="text-4xl font-black text-teal-400 mt-1">
                {oxygenDurationHours} <span className="text-base font-semibold text-slate-200">Jam</span> {oxygenDurationRemMinutes} <span className="text-base font-semibold text-slate-200">Menit</span>
              </p>
              <p className="text-xs text-slate-300 pt-1">
                Sisa Volume Oksigen Efektif: <strong>{remainingLiters} Liter</strong> (Faktor Tabung: {cFactor})
              </p>
            </div>

            <div className="bg-teal-50 p-5 rounded-3xl border border-teal-200 text-teal-950 space-y-1 shadow-xs">
              <p className="text-[10px] text-teal-800 uppercase font-bold tracking-wider">Estimasi Fraksi Oksigen (FiO2):</p>
              <p className="text-3xl font-black text-teal-950 mt-1">{fio2Info.fio2}</p>
              <p className="text-[10px] font-bold text-teal-700">{fio2Info.notes}</p>
            </div>

          </div>

          {/* Oxygen Formula & Step-by-Step Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <h3 className="text-sm font-black text-teal-300">
                📐 Keterangan Rumus Durasi Tabung Oksigen & Estimasi Fraksi FiO2
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2.5">
                <p className="font-bold text-teal-300 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-teal-400" />
                  <span>1. Rumus Durasi Tabung Oksigen Medis:</span>
                </p>
                <div className="bg-slate-950/80 p-3 rounded-xl font-mono text-[11px] text-teal-200 space-y-1.5 border border-teal-900/40">
                  <p className="font-bold text-slate-300">Durasi (Menit) = [(Tekanan Manometer PSI - 200 PSI) × Faktor Tabung (K)] ÷ Laju Aliran (LPM)</p>
                  <p className="text-amber-300 pt-1">
                    = [({pressurePsi} - 200) × {cFactor}] ÷ {flowRateLpm} LPM
                  </p>
                  <p className="text-amber-300">
                    = {remainingLiters} Liter ÷ {flowRateLpm} LPM = <strong className="text-white text-sm">{oxygenDurationMinutes} Menit</strong>
                  </p>
                  <p className="text-teal-300 font-bold">
                    = <strong className="text-white">{oxygenDurationHours} Jam {oxygenDurationRemMinutes} Menit</strong>
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2.5">
                <p className="font-bold text-teal-300 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-teal-400" />
                  <span>2. Rumus Estimasi Fraksi Oksigen Terhirup (FiO2):</span>
                </p>
                <div className="bg-slate-950/80 p-3 rounded-xl font-mono text-[11px] text-teal-200 space-y-1.5 border border-teal-900/40">
                  <p className="text-slate-400">// Nasal Kanul (1 - 6 LPM):</p>
                  <p className="font-bold">FiO2 (%) ≈ 20% + (Laju Flow LPM × 4%)</p>
                  <p className="text-amber-300">
                    = 20% + ({flowRateLpm} × 4%) ≈ <strong className="text-white text-sm">{fio2Info.fio2}</strong>
                  </p>
                  <p className="text-teal-300 text-[10px] pt-1 border-t border-slate-800">
                    *Venturi Mask memberikan FiO2 presisi tinggi independen terhadap pola napas pasien.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
