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
  Zap,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';
import { PediatricCompoundingCalculator } from './PediatricCompoundingCalculator';
import { ClinicalScoreCalculatorsModal, CalculatorType } from './ClinicalScoreCalculatorsModal';
import { 
  calculateSyringePumpRate, 
  calculateGravityDripRate, 
  IV_DRUGS_DATABASE 
} from '../data/ivCompatibilityData';
import { RENAL_DRUG_RULES, RenalDrugRule } from '../data/renalDosingDatabase';
import { HEPATIC_DRUG_RULES, HepaticDrugRule } from '../data/hepaticDosingDatabase';

interface RenalDoseAdjusterProps {
  drugs: Drug[];
  currentUser: UserProfile | null;
  onOpenPricingModal: () => void;
  initialTab?: 'renal' | 'hepatic' | 'pediatric' | 'compounding' | 'syringe-pump' | 'opioid' | 'ibw-bmi' | 'oxygen' | 'clinical-scores';
}

interface FormulaVariable {
  symbol: string;
  name: string;
  description: string;
  unit?: string;
}

interface MedicalFormulaCardProps {
  title: string;
  badge?: string;
  category?: string;
  formulaDisplay: React.ReactNode;
  secondaryFormulaDisplay?: React.ReactNode;
  variables: FormulaVariable[];
  decisionRules?: string[];
  clinicalPearls: string[];
  reference: string;
  defaultExpanded?: boolean;
  theme?: 'teal' | 'emerald' | 'cyan' | 'sky' | 'indigo' | 'amber' | 'violet' | 'rose' | 'blue';
}

const MedicalFormulaCard: React.FC<MedicalFormulaCardProps> = ({
  title,
  badge,
  category,
  formulaDisplay,
  secondaryFormulaDisplay,
  variables,
  decisionRules,
  clinicalPearls,
  reference,
  defaultExpanded = true,
  theme = 'teal'
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const themeClasses = {
    teal: {
      border: 'border-teal-500/30 dark:border-teal-500/40',
      badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      headerBg: 'bg-gradient-to-r from-[#062429] via-[#0a3842] to-[#062429]',
      accentText: 'text-teal-300',
      boxBg: 'bg-[#04191d]/90 border-teal-500/30'
    },
    emerald: {
      border: 'border-emerald-500/30 dark:border-emerald-500/40',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      headerBg: 'bg-gradient-to-r from-[#05281e] via-[#094232] to-[#05281e]',
      accentText: 'text-emerald-300',
      boxBg: 'bg-[#031d16]/90 border-emerald-500/30'
    },
    cyan: {
      border: 'border-cyan-500/30 dark:border-cyan-500/40',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      headerBg: 'bg-gradient-to-r from-[#072530] via-[#0b3c4f] to-[#072530]',
      accentText: 'text-cyan-300',
      boxBg: 'bg-[#041c24]/90 border-cyan-500/30'
    },
    sky: {
      border: 'border-sky-500/30 dark:border-sky-500/40',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      headerBg: 'bg-gradient-to-r from-[#062238] via-[#0b385c] to-[#062238]',
      accentText: 'text-sky-300',
      boxBg: 'bg-[#04192b]/90 border-sky-500/30'
    },
    blue: {
      border: 'border-blue-500/30 dark:border-blue-500/40',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      headerBg: 'bg-gradient-to-r from-[#081e3d] via-[#0f3161] to-[#081e3d]',
      accentText: 'text-blue-300',
      boxBg: 'bg-[#05152b]/90 border-blue-500/30'
    },
    indigo: {
      border: 'border-indigo-500/30 dark:border-indigo-500/40',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      headerBg: 'bg-gradient-to-r from-[#121636] via-[#1d2357] to-[#121636]',
      accentText: 'text-indigo-300',
      boxBg: 'bg-[#0c0e24]/90 border-indigo-500/30'
    },
    amber: {
      border: 'border-amber-500/30 dark:border-amber-500/40',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      headerBg: 'bg-gradient-to-r from-[#291e06] via-[#45320a] to-[#291e06]',
      accentText: 'text-amber-300',
      boxBg: 'bg-[#1c1404]/90 border-amber-500/30'
    },
    violet: {
      border: 'border-violet-500/30 dark:border-violet-500/40',
      badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
      headerBg: 'bg-gradient-to-r from-[#1f0e38] via-[#35195e] to-[#1f0e38]',
      accentText: 'text-violet-300',
      boxBg: 'bg-[#150a26]/90 border-violet-500/30'
    },
    rose: {
      border: 'border-rose-500/30 dark:border-rose-500/40',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      headerBg: 'bg-gradient-to-r from-[#2e0915] via-[#4d1024] to-[#2e0915]',
      accentText: 'text-rose-300',
      boxBg: 'bg-[#20060e]/90 border-rose-500/30'
    }
  }[theme];

  return (
    <div className={`rounded-2xl border ${themeClasses.border} overflow-hidden shadow-lg transition-all`}>
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${themeClasses.headerBg} p-4 sm:p-4.5 cursor-pointer select-none flex items-center justify-between gap-3 text-white`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/10 border border-white/20">
            <Calculator className={`w-4 h-4 ${themeClasses.accentText}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${themeClasses.badgeBg}`}>
                {badge || 'Landasan Matematis & Klinis'}
              </span>
              {category && (
                <span className="text-[11px] text-slate-300 font-medium hidden sm:inline">
                  • {category}
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5 flex items-center gap-1.5">
              {title}
            </h3>
          </div>
        </div>
        <button 
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition shrink-0"
        >
          <span>{isExpanded ? 'Tutup Rumus' : 'Buka Rumus'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="bg-slate-900/95 p-4 sm:p-5 text-slate-200 border-t border-slate-800 space-y-4 text-xs">
          {/* Formula Display Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={`p-4 rounded-xl border ${themeClasses.boxBg} space-y-2`}>
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.accentText}`}>
                  📐 Rumus Utama
                </span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-white font-semibold py-1">
                {formulaDisplay}
              </div>
            </div>

            {secondaryFormulaDisplay ? (
              <div className={`p-4 rounded-xl border ${themeClasses.boxBg} space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    ⚖️ Rumus Penyesuaian Khusus
                  </span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-white font-semibold py-1">
                  {secondaryFormulaDisplay}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
                  📚 Standar Acuan Klinis
                </span>
                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                  {reference}
                </p>
              </div>
            )}
          </div>

          {/* Variables Dictionary */}
          {variables && variables.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                📋 Keterangan Variabel & Satuan:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {variables.map((v, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-start gap-2">
                    <span className="font-mono font-bold text-teal-300 text-xs bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 shrink-0">
                      {v.symbol}
                    </span>
                    <div className="text-[11px] leading-tight">
                      <p className="font-bold text-white">{v.name} {v.unit && <span className="text-slate-400 font-normal">({v.unit})</span>}</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decision Rules / Criteria */}
          {decisionRules && decisionRules.length > 0 && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5 text-amber-200">
              <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Kriteria Pemilihan Rumus & Penyesuaian Klinis:
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-100/90 pl-1">
                {decisionRules.map((rule, idx) => (
                  <li key={idx} className="leading-relaxed">{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Clinical Pearls */}
          {clinicalPearls && clinicalPearls.length > 0 && (
            <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl space-y-1.5 text-teal-200">
              <span className="text-[11px] font-bold text-teal-300 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-teal-400" />
                Mutiara Klinis Apoteker (*Clinical Pearls*):
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-teal-100/90 pl-1">
                {clinicalPearls.map((pearl, idx) => (
                  <li key={idx} className="leading-relaxed">{pearl}</li>
                ))}
              </ul>
            </div>
          )}

          {secondaryFormulaDisplay && reference && (
            <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5 pt-1 border-t border-slate-800">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Sumber: {reference}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
    <div className="space-y-6">
      
      {/* HEADER BANNER - ROYAL INDIGO & COSMIC NAVY */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#050614] via-[#0d102e] to-[#151947] p-6 sm:p-8 text-white shadow-2xl border border-indigo-500/25 space-y-6">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <Calculator className="w-48 h-48 text-indigo-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold font-outfit">
              <Activity className="w-3.5 h-3.5" />
              <span>Standar Cockcroft-Gault, CKD-EPI, Child-Pugh &amp; MELD</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-950/50 shrink-0">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Kalkulator Medis &amp; Penyesuaian Dosis
                </h1>
                <p className="text-xs sm:text-sm text-indigo-100/80 font-medium">
                  Suite kalkulator farmako-klinis: Dosis Ginjal (CrCl/eGFR), Dosis Hepar (Child-Pugh/MELD), Titrasi Pump, Konversi Opioid, dan 14 Skor Klinis.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-indigo-200">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>CrCl Cockcroft-Gault &amp; eGFR CKD-EPI</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-violet-200">
                <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                <span>Skor Child-Pugh &amp; MELD Hepar</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-cyan-200">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>14+ Kalkulator Skor Medis</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-indigo-950/60 text-right shadow-md">
              <span className="text-[11px] text-slate-400 block font-medium">Total Formula Terintegrasi:</span>
              <span className="text-lg font-black text-indigo-400">14+ Formula Medis</span>
            </div>
          </div>
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
              <span>14 Skor Klinis</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: RENAL DOSAGE CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'renal' && (
        <div className="space-y-6">
          {/* Formula & Clinical Guide Card */}
          <MedicalFormulaCard
            title="Rumus Cockcroft-Gault (CrCl) & Bedside Schwartz (Pediatrik)"
            badge="Klirens Ginjal"
            category="Penyesuaian Dosis Renal"
            theme="teal"
            formulaDisplay={
              <div className="space-y-1">
                <p className="text-teal-300 font-bold text-xs">CrCl (mL/min) = [(140 - Usia) × Berat Badan (kg)] / [72 × Serum Kreatinin (mg/dL)]</p>
                <p className="text-slate-300 text-[11px]">* Kalikan faktor 0.85 untuk pasien Wanita (massa otot lebih rendah)</p>
              </div>
            }
            secondaryFormulaDisplay={
              <div className="space-y-1">
                <p className="text-amber-300 font-bold text-xs">ABW (kg) = IBW + 0.4 × (BB Aktual - IBW)</p>
                <p className="text-slate-300 text-[11px]">Bedside Schwartz (Anak): eGFR = (0.413 × Tinggi cm) / Scr</p>
              </div>
            }
            variables={[
              { symbol: 'CrCl', name: 'Creatinine Clearance', description: 'Laju pembersihan kreatinin ginjal terestimasi', unit: 'mL/menit' },
              { symbol: 'Scr', name: 'Serum Creatinine', description: 'Kadar kreatinin dalam serum darah (Normal 0.6 - 1.2)', unit: 'mg/dL' },
              { symbol: 'IBW', name: 'Ideal Body Weight', description: 'Berat Badan Ideal Devine (L: 50 + 2.3/inci; P: 45.5 + 2.3/inci)', unit: 'kg' },
              { symbol: 'ABW', name: 'Adjusted Body Weight', description: 'Bobot terkoreksi untuk pasien obesitas', unit: 'kg' }
            ]}
            decisionRules={[
              'Pasien Normal (BB Aktual ≤ 120% IBW): Gunakan Berat Badan Aktual (TBW) atau IBW.',
              'Pasien Obesitas (BB Aktual > 120% IBW atau BMI ≥ 30): WAJIB gunakan ABW (Adjusted Body Weight) untuk menghitung klirens antibiotik hidrofilik (Aminoglikosida, Vankomisin) guna mencegah overdosis nefrotoksik.',
              'Pasien Geriatri (Usia ≥ 65 th) dengan Scr rendah (<0.8 mg/dL akibat sarkopenia/atrofi massa otot): Bulatkan Scr ke 0.8 - 1.0 mg/dL agar estimasi CrCl tidak overestimate.'
            ]}
            clinicalPearls={[
              'Stadium Gagal Ginjal KDIGO: G1 (≥90 Normal), G2 (60-89 Ringan), G3a (45-59 Ringan-Sedang), G3b (30-44 Sedang-Berat), G4 (15-29 Berat), G5 (<15 Gagal Ginjal Terminal / ESRD).',
              'Metformin KONTRAINDIKASI MUTLAK pada eGFR < 30 mL/min karena risiko fatal Asidosis Laktat.',
              'Allopurinol memerlukan penurunan dosis drastis pada CrCl < 20 mL/min untuk mencegah Sindrom Hipersensitivitas Allopurinol (AHS/DRESS).'
            ]}
            reference="KDIGO Clinical Practice Guideline for CKD 2023 & Cockcroft DW, Gault MH (Nephron 1976)"
          />

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
                        {drug.hemodialysisSupplement && (
                          <div className="flex items-start gap-1.5 text-[11px] text-indigo-900 bg-indigo-50/80 px-2 py-1 rounded-lg border border-indigo-200/60">
                            <span className="font-bold text-indigo-700 shrink-0">🩸 Hemodialisis (HD):</span>
                            <span>{drug.hemodialysisSupplement}</span>
                          </div>
                        )}
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
          {/* Formula & Clinical Guide Card */}
          <MedicalFormulaCard
            title="Klasifikasi Skor Child-Pugh & Model for End-Stage Liver Disease (MELD)"
            badge="Fungsi Hepar"
            category="Penyesuaian Dosis Sirosis & Penyakit Hati"
            theme="rose"
            formulaDisplay={
              <div className="space-y-1">
                <p className="text-rose-300 font-bold text-xs">Skor Child-Pugh = Total Poin 5 Parameter (Skor 5 - 15)</p>
                <p className="text-slate-300 text-[11px]">Kelas A (5-6 pt), Kelas B (7-9 pt), Kelas C (10-15 pt)</p>
              </div>
            }
            secondaryFormulaDisplay={
              <div className="space-y-1">
                <p className="text-amber-300 font-bold text-xs">MELD = 9.57 ln(Cr) + 3.78 ln(Bilirubin) + 11.2 ln(INR) + 6.43</p>
                <p className="text-slate-300 text-[11px]">Rentang Skor MELD: 6 hingga 40 (Prediktor mortalitas 90 hari)</p>
              </div>
            }
            variables={[
              { symbol: 'Enceph', name: 'Ensefalopati Hepatik', description: 'Grade 0 (1 pt), Grade 1-2 (2 pt), Grade 3-4 (3 pt)' },
              { symbol: 'Ascites', name: 'Derajat Asites', description: 'Nihil (1 pt), Ringan/Terkontrol (2 pt), Sedang-Berat (3 pt)' },
              { symbol: 'Bilirubin', name: 'Bilirubin Total', description: '<2.0 mg/dL (1 pt), 2.0-3.0 mg/dL (2 pt), >3.0 mg/dL (3 pt)', unit: 'mg/dL' },
              { symbol: 'Albumin', name: 'Albumin Serum', description: '>3.5 g/dL (1 pt), 2.8-3.5 g/dL (2 pt), <2.8 g/dL (3 pt)', unit: 'g/dL' },
              { symbol: 'INR', name: 'International Normalized Ratio', description: '<1.7 (1 pt), 1.7-2.3 (2 pt), >2.3 (3 pt)' }
            ]}
            decisionRules={[
              'Child-Pugh Kelas A (5-6 poin, Kompensasi Baik): Penyesuaian dosis obat metabolit hepar biasanya tidak diperlukan.',
              'Child-Pugh Kelas B (7-9 poin, Gangguan Sedang): Turunkan dosis awal sebesar 25% - 50% untuk obat dengan first-pass metabolism tinggi atau clearance hepar tinggi.',
              'Child-Pugh Kelas C (10-15 poin, Dekompensasi Berat): Hindari obat dengan metabolisme hepar ekstensif, sedatif (risiko presipitasi koma hepatik), dan obat hepatotoksik (Paracetamol dosis tinggi, OAINS, Statin).'
            ]}
            clinicalPearls={[
              'OAINS (Asam Mefenamat, Ibuprofen, Ketorolac) KONTRAINDIKASI pada sirosis hepatis karena memicu perdarahan varises esofagus dan Sindrom Hepatorenal (HRS).',
              'Paracetamol pada sirosis tetap dapat digunakan sebagai lini pertama nyeri/demam namun dibatasi maksimal 2 gram/24 jam.'
            ]}
            reference="Child CG, Turcotte JG (1964) / Pugh RN et al. (Br J Surg 1973) & UNOS MELD Criteria"
          />

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
          {/* Formula & Clinical Guide Card */}
          <MedicalFormulaCard
            title="Pedoman Konversi Opioid CDC & Oral Morphine Equivalent (OME / MME)"
            badge="Paliatif & Nyeri Kanker"
            category="Manajemen Nyeri & Rotasi Opioid"
            theme="amber"
            formulaDisplay={
              <div className="space-y-1">
                <p className="text-amber-300 font-bold text-xs">Total 24h MME = Dosis Harian Opioid (mg) × Faktor Konversi Morfin Oral</p>
                <p className="text-slate-300 text-[11px]">Target Opioid Baru = (Total MME × [1 - % Reduksi Toleransi Silang]) / Faktor Konversi Baru</p>
              </div>
            }
            secondaryFormulaDisplay={
              <div className="space-y-1">
                <p className="text-rose-300 font-bold text-xs">Dosis Penyelamat (Breakthrough / PRN) = 10% - 15% dari Total Dosis 24 Jam</p>
                <p className="text-slate-300 text-[11px]">Diberikan tiap 2-4 jam jika timbul nyeri tembus (*breakthrough pain*)</p>
              </div>
            }
            variables={[
              { symbol: 'MME', name: 'Morphine Milligram Equivalent', description: 'Standar baku pembanding kekuatan analgetik opioid terhadap morfin oral', unit: 'mg/hari' },
              { symbol: 'Morfin Oral', name: 'Faktor 1.0', description: 'Baseline acuan equianalgesic', unit: 'mg' },
              { symbol: 'Oksikodon Oral', name: 'Faktor 1.5', description: '10 mg Oksikodon = 15 mg Morfin Oral', unit: 'mg' },
              { symbol: 'Hidromorfon Oral', name: 'Faktor 4.0', description: '2 mg Hidromorfon = 8 mg Morfin Oral', unit: 'mg' },
              { symbol: 'Fentanil Patch', name: 'Faktor 2.4 / mcg/jam', description: '25 mcg/jam patch = 60 MME/hari', unit: 'mcg/jam' },
              { symbol: 'Morfin IV', name: 'Faktor 3.0', description: '10 mg Morfin IV = 30 mg Morfin Oral', unit: 'mg' }
            ]}
            decisionRules={[
              'Reduksi Toleransi Silang (Incomplete Cross-Tolerance): Saat rotasi ke opioid baru, kurangi dosis ekuivalen sebesar 25% - 50% untuk mencegah toksisitas fatal akibat reseptor opioid yang belum tersensitisasi.',
              'Ambang Batas Waspada CDC (≥ 50 MME/hari): Gandakan pemantauan dan pertimbangkan resep sedia antidotum Nalokson.',
              'Ambang Batas Bahaya CDC (≥ 90 MME/hari): Risiko overdosis dan depresi napas meningkat drastis; hindari kenaikan dosis tanpa konsultasi konsultan manajemen nyeri.'
            ]}
            clinicalPearls={[
              'Fentanil patch transdermal TIDAK BOLEH digunakan untuk nyeri akut atau pasien yang belum toleran terhadap opioid (*opioid-naive*).',
              'Selalu resepkan laksatif stimulan (Bisacodyl / Senna) bersamaan dengan inisiasi opioid jangka panjang untuk mencegah konstipasi terinduksi opioid.'
            ]}
            reference="CDC Clinical Practice Guideline for Prescribing Opioids for Pain (2022)"
          />

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
        <div className="space-y-6">
          {/* Formula & Clinical Guide Card */}
          <MedicalFormulaCard
            title="Rumus Berat Badan Ideal Devine (IBW), Terkoreksi (ABW) & BMI WHO Asia-Pasifik"
            badge="Antropometri Medis"
            category="Penyesuaian Farmakokinetik Obesitas"
            theme="indigo"
            formulaDisplay={
              <div className="space-y-1">
                <p className="text-indigo-300 font-bold text-xs">Laki-Laki: IBW (kg) = 50 + 2.3 × (Tinggi Badan dalam Inci - 60)</p>
                <p className="text-indigo-300 font-bold text-xs">Perempuan: IBW (kg) = 45.5 + 2.3 × (Tinggi Badan dalam Inci - 60)</p>
              </div>
            }
            secondaryFormulaDisplay={
              <div className="space-y-1">
                <p className="text-amber-300 font-bold text-xs">ABW (kg) = IBW + 0.4 × (Berat Aktual - IBW)</p>
                <p className="text-slate-300 text-[11px]">BMI = Berat Badan (kg) / [Tinggi Badan (m)]²</p>
              </div>
            }
            variables={[
              { symbol: 'IBW', name: 'Ideal Body Weight (Devine 1974)', description: 'Estimasi massa tubuh tanpa lemak berdasarkan tinggi badan', unit: 'kg' },
              { symbol: 'ABW', name: 'Adjusted Body Weight (40%)', description: 'Memperhitungkan 40% penetrasi obat hidrofilik ke jaringan adiposa', unit: 'kg' },
              { symbol: 'BMI', name: 'Body Mass Index', description: 'Indeks massa tubuh rasio berat terhadap kuadrat tinggi', unit: 'kg/m²' },
              { symbol: '1 Inci', name: 'Konversi Metrik', description: '1 Inci = 2.54 cm (60 Inci = 152.4 cm)', unit: 'cm' }
            ]}
            decisionRules={[
              'Dosis Berdasarkan IBW: Digoxin, Teofilin/Aminofilin, Suksinilkolin (obat dengan volume distribusi rendah pada lemak).',
              'Dosis Berdasarkan ABW (Adjusted): Aminoglikosida (Gentamisin, Amikasin), Vankomisin, Daptomisin pada pasien obesitas (Actual > 120% IBW).',
              'Dosis Berdasarkan Total Weight (Aktual): Enoxaparin LMWH, Heparin, Sefalosporin.'
            ]}
            clinicalPearls={[
              'Klasifikasi BMI Standar Asia-Pasifik (WHO WPRO): Underweight (<18.5), Normal (18.5 - 22.9), Overweight / At Risk (23.0 - 24.9), Obesitas I (25.0 - 29.9), Obesitas II (≥30.0 kg/m²).',
              'Batas ambang obesitas populasi Asia lebih rendah (25.0 kg/m²) dibandingkan Kaukasia (30.0 kg/m²) karena tingginya persentase lemak viseral dan risiko kardio-metabolik.'
            ]}
            reference="Devine BJ (Drug Intell Clin Pharm 1974) & WHO Western Pacific Region Obesity Criteria"
          />

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
      </div>
    )}

      {/* ========================================================================= */}
      {/* TAB 5: OXYGEN MEDIS CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'oxygen' && (
        <div className="space-y-6">
          {/* Formula & Clinical Guide Card */}
          <MedicalFormulaCard
            title="Rumus Durasi Tabung Oksigen Medis & Estimasi Fraksi FiO2"
            badge="Emergensi & Respirasi"
            category="Manajemen Pasokan Gas Medis"
            theme="blue"
            formulaDisplay={
              <div className="space-y-1">
                <p className="text-blue-300 font-bold text-xs">Durasi Tabung (menit) = [(Tekanan Manometer psi - 200 psi batas aman) × Faktor Tabung] / Laju Aliran (LPM)</p>
                <p className="text-slate-300 text-[11px]">Sisa Volume Oksigen (Liter) = (Tekanan psi - 200) × Faktor Tabung</p>
              </div>
            }
            secondaryFormulaDisplay={
              <div className="space-y-1">
                <p className="text-amber-300 font-bold text-xs">Estimasi FiO2 Nasal Kanul = 20% + (4% × Laju LPM)</p>
                <p className="text-slate-300 text-[11px]">1 LPM = 24%, 2 LPM = 28%, 3 LPM = 32%, 4 LPM = 36%, 6 LPM = 44%</p>
              </div>
            }
            variables={[
              { symbol: 'psi', name: 'Tekanan Manometer', description: 'Tekanan regulator tabung gas oksigen (Penuh ~2000-2200 psi)', unit: 'psi' },
              { symbol: 'LPM', name: 'Laju Alir (Flowmeter)', description: 'Kecepatan aliran gas oksigen ke pasien', unit: 'Liter/menit' },
              { symbol: 'Tipe D', name: 'Faktor Silinder 0.16', description: 'Tabung portabel kecil (~350-400 Liter)', unit: 'L/psi' },
              { symbol: 'Tipe E', name: 'Faktor Silinder 0.28', description: 'Tabung emergency trolley standar RS (~680 Liter)', unit: 'L/psi' },
              { symbol: 'Tipe M / H', name: 'Faktor Silinder 1.56 / 3.14', description: 'Tabung sentral stasioner besar (~3000 - 6900 Liter)', unit: 'L/psi' }
            ]}
            decisionRules={[
              'Nasal Cannula (1 - 6 LPM): Memberikan FiO2 24% - 44%. Cocok untuk hipoksia ringan tanpa distress pernapasan berat.',
              'Simple Face Mask (5 - 8 LPM): Memberikan FiO2 40% - 60%. Aliran minimal 5 LPM wajib dijaga untuk mencegah rebreathing CO2.',
              'Non-Rebreathing Mask / NRM (10 - 15 LPM): Memberikan FiO2 80% - 95%. Pastikan kantong reservoir terisi penuh sebelum dipasangkan ke wajah pasien.',
              'Venturi Mask: Memberikan FiO2 tetap dan presisi (24%, 28%, 35%, 40%, 50%). Alat pilihan untuk pasien PPOK / COPD dengan retensi CO2.'
            ]}
            clinicalPearls={[
              'Batas Aman Manometer (Safe Margin): Selalu sisakan 200 psi sebagai batas aman penggantian tabung untuk mencegah dekompresi mendadak.',
              'Target Saturasi Oksigen (SpO2): 94% - 98% pada pasien umum, dan 88% - 92% pada pasien PPOK kronik dengan risiko hiperkapnia.'
            ]}
            reference="American Association for Respiratory Care (AARC) Clinical Practice Guidelines & BTS Oxygen Guideline"
          />

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
      </div>
    )}


      {/* ========================================================================= */}
      {/* TAB: PEDIATRIC DOSING CALCULATOR (INTEGRATED) */}
      {/* ========================================================================= */}
      {activeTab === 'pediatric' && (
        <div className="space-y-4">
          {/* Formula & Clinical Guide Card */}
          <MedicalFormulaCard
            title="Rumus Luas Permukaan Tubuh Mosteller (BSA) & Konversi Dosis Anak"
            badge="Dosis Pediatrik"
            category="Penyesuaian Farmakoterapi Anak & Bayi"
            theme="emerald"
            formulaDisplay={
              <div className="space-y-1">
                <p className="text-emerald-300 font-bold text-xs">Mosteller BSA (m²) = √[(Tinggi Badan cm × Berat Badan kg) / 3600]</p>
                <p className="text-slate-300 text-[11px]">Dosis Anak (mg) = BSA Anak (m²) / 1.73 m² × Dosis Dewasa</p>
              </div>
            }
            secondaryFormulaDisplay={
              <div className="space-y-1">
                <p className="text-amber-300 font-bold text-xs">Rumus Clark (BB): Dosis = (BB kg / 70) × Dosis Dewasa</p>
                <p className="text-slate-300 text-[11px]">Young (&lt;8 th): [Usia / (Usia + 12)] × Dosis • Dilling (≥8 th): (Usia / 20) × Dosis</p>
              </div>
            }
            variables={[
              { symbol: 'BSA', name: 'Body Surface Area (Mosteller)', description: 'Luas permukaan tubuh terestimasi (Rata-rata dewasa = 1.73 m²)', unit: 'm²' },
              { symbol: 'mg/kgBB', name: 'Dosis Berbasis Bobot', description: 'Standar emas penentuan dosis obat pediatrik', unit: 'mg/kg/kali atau hari' },
              { symbol: 'Clark', name: 'Rumus Clark', description: 'Konversi berdasarkan berat badan anak (kg) terhadap 70 kg dewasa' },
              { symbol: 'Young', name: 'Rumus Young', description: 'Konversi berdasarkan usia anak di bawah 8 tahun' }
            ]}
            decisionRules={[
              'Metode Dosis Berbasis BB (mg/kgBB): Merupakan standar emas rekomendasi IDAI dan WHO untuk sebagian besar antibiotik dan antipiretik anak.',
              'Metode Dosis Berbasis BSA (mg/m²): Wajib digunakan untuk obat dengan indeks terapi sempit seperti sitostatika kemoterapi, kortikosteroid sistemik, dan obat imunomodulator.',
              'Batas Maksimal: Dosis kalkulasi pediatrik TIDAK BOLEH melebihi dosis maksimal orang dewasa normal.'
            ]}
            clinicalPearls={[
              'Aspirin (Asam Asetilsalisilat) KONTRAINDIKASI MUTLAK pada anak < 12 tahun yang demam akibat infeksi virus karena risiko Reye Syndrome fatal.',
              'Kuinolon (Siprofloksasin) dan Tetrasiklin (Doksisiklin) dihindari pada anak < 8-12 tahun karena risiko artropati kartilago dan diskolorisasi gigi permanen.'
            ]}
            reference="IDAI Pedoman Dosis Anak & Mosteller RD (N Engl J Med 1987)"
          />

          <div className="p-4.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/60">
                <Baby className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Kalkulator Dosis Pediatrik & Sirup Terintegrasi</h3>
                <p className="text-xs text-slate-600 dark:text-emerald-200/80 font-medium">Perhitungan dosis anak akurat berbasis Berat Badan (mg/kgBB), Usia, Luas Permukaan Tubuh (BSA), dan takaran mL sirup.</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 shrink-0 shadow-2xs">
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
          {/* Formula & Clinical Guide Card */}
          <MedicalFormulaCard
            title="Metode Peracikan Puyer (d.t.d vs S.L.) & Stabilitas Beyond-Use Date (USP <795>)"
            badge="Peracikan Non-Steril"
            category="Teknologi Farmasi & Dispensing"
            theme="cyan"
            formulaDisplay={
              <div className="space-y-1">
                <p className="text-cyan-300 font-bold text-xs">Metode d.t.d (da tales doses): Total Bahan Aktif = Dosis per Bungkus × Jumlah Bungkus (N)</p>
                <p className="text-slate-300 text-[11px]">Metode Non-d.t.d: Dosis per Bungkus = Dosis Total Tertulis / Jumlah Bungkus (N)</p>
              </div>
            }
            secondaryFormulaDisplay={
              <div className="space-y-1">
                <p className="text-amber-300 font-bold text-xs">Bobot S.L. Pengisi (mg) = (Target Bobot Bungkus × N) - Total Bobot Tablet Aktif</p>
                <p className="text-slate-300 text-[11px]">Bobot standar 1 bungkus puyer anak = 200 - 300 mg (Maks 500 mg)</p>
              </div>
            }
            variables={[
              { symbol: 'd.t.d', name: 'Da Tales Doses', description: 'Instruksi resep: "Berikan dengan dosis sebanyak itu untuk setiap bungkus"' },
              { symbol: 'N', name: 'Numero (Jumlah)', description: 'Jumlah total bungkus puyer yang diracik', unit: 'Bungkus' },
              { symbol: 'S.L.', name: 'Saccharum Lactis', description: 'Gula susu pengisi inert untuk menyeragamkan bobot serbuk puyer', unit: 'mg / gram' },
              { symbol: 'BUD', name: 'Beyond-Use Date', description: 'Batas kedaluwarsa sediaan racikan setelah dibuka/digerus', unit: 'Hari / Bulan' }
            ]}
            decisionRules={[
              'Metode d.t.d: Selalu kalikan kekuatan obat dengan N. Misal: Paracetamol 100 mg d.t.d No. X -> Butuh 1000 mg (2 tablet 500 mg).',
              'Metode Non-d.t.d: Dosis tertulis adalah untuk seluruh racikan. Misal: Paracetamol 500 mg divide in partes aequales No. X -> Tiap bungkus berisi 50 mg.',
              'Pencegahan Inkompatibilitas: Jangan mencampur obat higroskopis atau garam effervescent dalam kertas perkamen standar tanpa wadah kedap udara.'
            ]}
            clinicalPearls={[
              'Beyond-Use Date (BUD) Puyer USP <795>: 25% dari sisa masa kedaluwarsa terpendek bahan obat atau maksimal 6 bulan (pada suhu ruang kering terlindung cahaya).',
              'Rekonstitusi Sirup Kering Antibiotik (Amoksisilin, Sefadroksil): BUD maksimal 7 - 14 hari pada suhu kulkas (2-8°C).'
            ]}
            reference="USP <795> Pharmaceutical Compounding Nonsterile Preparations & Farmakope Indonesia Ed. VI"
          />

          <div className="p-4.5 bg-gradient-to-r from-cyan-50 via-sky-50 to-cyan-50 dark:from-cyan-950/40 dark:via-sky-950/40 dark:to-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-700/60">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Kalkulator Peracikan Puyer & Serbuk Bagi Terintegrasi</h3>
                <p className="text-xs text-slate-600 dark:text-cyan-200/80 font-medium">Konversi tablet utuh ke puyer serbuk bagi, perhitungan bobot pengisi Saccharum Lactis (SL), etiket resep, dan rekonstitusi sirup kering.</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 shrink-0 shadow-2xs">
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
          {/* Formula & Clinical Guide Card */}
          <MedicalFormulaCard
            title="Rumus Laju Titrasi Syringe Pump & Kecepatan Tetesan Infus Gravitasi"
            badge="ICU & Emergensi"
            category="Titrasi Vasoaktif & Infus Kontinu"
            theme="sky"
            formulaDisplay={
              <div className="space-y-1">
                <p className="text-sky-300 font-bold text-xs">Laju Syringe Pump (mL/jam) = [Dosis (mcg/kg/menit) × BB (kg) × 60] / Konsentrasi (mcg/mL)</p>
                <p className="text-slate-300 text-[11px]">Konsentrasi Spuit (mcg/mL) = [Total Obat dalam Spuit (mg) × 1000] / Total Volume Spuit (mL)</p>
              </div>
            }
            secondaryFormulaDisplay={
              <div className="space-y-1">
                <p className="text-amber-300 font-bold text-xs">Tetesan Infus (gtt/menit) = [Total Volume (mL) × Faktor Tetes] / [Durasi (menit)]</p>
                <p className="text-slate-300 text-[11px]">Makro Dewasa: 20 gtt/mL (1 mL/jam ≈ 1/3 gtt/min) • Mikro Pediatrik: 60 gtt/mL (1 mL/jam = 1 mikro-gtt/min)</p>
              </div>
            }
            variables={[
              { symbol: 'mcg/kg/min', name: 'Target Titrasi Dosis', description: 'Kecepatan pemberian obat inotropik per kgBB per menit' },
              { symbol: 'BB (kg)', name: 'Berat Badan Pasien', description: 'Berat aktual pasien untuk titrasi obat ICU', unit: 'kg' },
              { symbol: 'Spuit 50 mL', name: 'Volume Pelarutan', description: 'Volume standar syringe pump ICU (biasanya 50 mL NS/D5W)', unit: 'mL' },
              { symbol: 'Faktor Tetes', name: 'Drop Factor', description: 'Makro standar = 20 gtt/mL (Baxter = 15); Mikro = 60 gtt/mL', unit: 'gtt/mL' }
            ]}
            decisionRules={[
              'Norepinephrine: Sediaan standar 4 mg dalam 50 mL D5W (Konsentrasi = 80 mcg/mL). Dosis awal 0.01 - 0.05 mcg/kg/min, titrasi hingga target MAP ≥ 65 mmHg.',
              'Dobutamine & Dopamine: Sediaan standar 250 mg / 200 mg dalam 50 mL (Konsentrasi = 5000 mcg/mL / 4000 mcg/mL). Dosis titrasi 2.5 - 20 mcg/kg/min.',
              'Nicardipine: Sediaan 10 mg dalam 50 mL (Konsentrasi = 200 mcg/mL). Dosis awal 0.5 - 5 mg/jam via syringe pump.'
            ]}
            clinicalPearls={[
              'Jalur Vena Sentral (CVC) WAJIB digunakan untuk vasopresor konsentrasi tinggi (Norepinephrine, Epinephrine, Dopamine) untuk mencegah nekrosis jaringan akibat ekstravasasi.',
              'Gunakan in-line filter dan spuit pelindung cahaya hitam untuk obat yang fotosensitif seperti Nitroprusside dan Norepinephrine.'
            ]}
            reference="ASHP Guidelines on Injectable Drug Administration & Trissel's 2024"
          />

          <div className="p-4.5 bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50 dark:from-sky-950/40 dark:via-blue-950/40 dark:to-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-700/60">
                <Syringe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Kalkulator Kecepatan Syringe Pump & Tetesan Infus Drip</h3>
                <p className="text-xs text-slate-600 dark:text-sky-200/80 font-medium">Hitung laju infus titrasi kontinu (mcg/kg/menit, mcg/menit, mg/jam ke mL/jam) dan tetesan infus makro/mikro per menit.</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-500/40 shrink-0 shadow-2xs">
              ICU & Emergensi
            </span>
          </div>

          {/* Quick Drug Presets for Syringe Pump */}
          <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
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
                      ? 'bg-sky-100 dark:bg-sky-950/90 border-sky-400 dark:border-sky-500 text-sky-950 dark:text-sky-200 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-slate-900 dark:text-white">{preset.name}</div>
                  <div className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">{preset.dose}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Parameters */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                Parameter Syringe Pump
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-400 font-bold mb-1">Berat Badan Pasien (kg):</label>
                  <input
                    type="number"
                    value={calcPatientWeightKg}
                    onChange={(e) => setCalcPatientWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-400 font-bold mb-1">Target Dosis Titrasi (mcg / kgBB / menit):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={calcTargetDose}
                    onChange={(e) => setCalcTargetDose(Number(e.target.value))}
                    className="w-full bg-sky-50 dark:bg-sky-950/50 border border-sky-300 dark:border-sky-500/60 rounded-xl px-3 py-2 text-sky-950 dark:text-sky-300 font-black text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-400 font-bold mb-1">Total Obat (mg):</label>
                    <input
                      type="number"
                      value={calcDrugMgInSyringe}
                      onChange={(e) => setCalcDrugMgInSyringe(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-400 font-bold mb-1">Volume Spuit (mL):</label>
                    <input
                      type="number"
                      value={calcSyringeVolumeMl}
                      onChange={(e) => setCalcSyringeVolumeMl(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Gravity Drip Inputs */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Wind className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Parameter Infus Gravitasi (Drip)
                  </h4>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10.5px] text-slate-700 dark:text-slate-400 font-bold mb-1">Volume (mL):</label>
                      <input
                        type="number"
                        value={dripVolumeMl}
                        onChange={(e) => setDripVolumeMl(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] text-slate-700 dark:text-slate-400 font-bold mb-1">Durasi (Jam):</label>
                      <input
                        type="number"
                        value={dripDurationHours}
                        onChange={(e) => setDripDurationHours(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] text-slate-700 dark:text-slate-400 font-bold mb-1">Faktor Tetes:</label>
                      <select
                        value={dripFactor}
                        onChange={(e) => setDripFactor(Number(e.target.value) as 20 | 60)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-1.5 text-xs text-slate-900 dark:text-white font-bold"
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
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 text-white">
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
          <div className="p-4.5 bg-gradient-to-r from-fuchsia-50 via-purple-50 to-pink-50 dark:from-fuchsia-950/40 dark:via-purple-950/40 dark:to-pink-950/40 border border-fuchsia-200 dark:border-fuchsia-800/60 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-700 dark:text-fuchsia-400 border border-fuchsia-200 dark:border-fuchsia-700/60">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Suite 14 Kalkulator Skor Klinis & Risiko Terpadu</h3>
                <p className="text-xs text-slate-600 dark:text-fuchsia-200/80 font-medium">Kalkulator stratifikasi risiko kardiovaskular, stroke, sepsis, dehidrasi, mortalitas, dan psikometri berbasis pedoman klinis internasional.</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-fuchsia-100 dark:bg-fuchsia-500/20 text-fuchsia-800 dark:text-fuchsia-300 border border-fuchsia-300 dark:border-fuchsia-500/40 shrink-0 shadow-2xs">
              14 Skor Valid
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 'ascvd' as CalculatorType,
                name: '10-Year ASCVD Risk',
                org: 'AHA / ACC 2019',
                desc: 'Estimasi risiko aterosklerotik kardiovaskular 10 tahun untuk memulai terapi statin & aspirin.',
                badge: 'Kardiologi',
                cardBg: 'bg-blue-50/60 hover:bg-blue-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-blue-200 hover:border-blue-400 dark:border-blue-800/70 dark:hover:border-blue-500',
                badgeStyle: 'bg-blue-100 text-blue-800 border-blue-300/70 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
                orgStyle: 'text-blue-700 dark:text-blue-400'
              },
              {
                id: 'cha2ds2vasc' as CalculatorType,
                name: 'CHA2DS2-VASc Score',
                org: 'ESC / AHA / ACC',
                desc: 'Stratifikasi risiko stroke tromboemboli pada Fibrilasi Atrium (AF) & indikasi antikoagulan oral (DOAC).',
                badge: 'Antikoagulasi',
                cardBg: 'bg-indigo-50/60 hover:bg-indigo-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-indigo-200 hover:border-indigo-400 dark:border-indigo-800/70 dark:hover:border-indigo-500',
                badgeStyle: 'bg-indigo-100 text-indigo-800 border-indigo-300/70 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
                orgStyle: 'text-indigo-700 dark:text-indigo-400'
              },
              {
                id: 'curb65' as CalculatorType,
                name: 'CURB-65 Pneumonia',
                org: 'BTS Standard',
                desc: 'Penilaian derajat keparahan pneumonia komunitas (CAP) & penentuan lokasi rawat (Rawat Jalan / Ruang Rawat / ICU).',
                badge: 'Respirasi',
                cardBg: 'bg-cyan-50/60 hover:bg-cyan-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-cyan-200 hover:border-cyan-400 dark:border-cyan-800/70 dark:hover:border-cyan-500',
                badgeStyle: 'bg-cyan-100 text-cyan-800 border-cyan-300/70 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800',
                orgStyle: 'text-cyan-700 dark:text-cyan-400'
              },
              {
                id: 'qsofa' as CalculatorType,
                name: 'qSOFA Sepsis Score',
                org: 'Sepsis-3 Guidelines',
                desc: 'Skrining cepat bedside kecurigaan sepsis di luar ICU (Laju napas ≥22, GCS <15, TDS ≤100 mmHg).',
                badge: 'Emergensi',
                cardBg: 'bg-rose-50/60 hover:bg-rose-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-rose-200 hover:border-rose-400 dark:border-rose-800/70 dark:hover:border-rose-500',
                badgeStyle: 'bg-rose-100 text-rose-800 border-rose-300/70 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
                orgStyle: 'text-rose-700 dark:text-rose-400'
              },
              {
                id: 'map' as CalculatorType,
                name: 'Mean Arterial Pressure (MAP)',
                org: 'ICU Hemodinamik',
                desc: 'Penghitungan tekanan arteri rata-rata target perfusi organ (MAP ≥65 mmHg) pada syok & resusitasi.',
                badge: 'Hemodinamik',
                cardBg: 'bg-teal-50/60 hover:bg-teal-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-teal-200 hover:border-teal-400 dark:border-teal-800/70 dark:hover:border-teal-500',
                badgeStyle: 'bg-teal-100 text-teal-800 border-teal-300/70 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800',
                orgStyle: 'text-teal-700 dark:text-teal-400'
              },
              {
                id: 'egfr' as CalculatorType,
                name: 'eGFR CKD-EPI 2021',
                org: 'KDIGO Standard',
                desc: 'Formula estimasi laju filtrasi glomerulus berbasis kreatinin serum terbaru tanpa faktor ras.',
                badge: 'Nefrologi',
                cardBg: 'bg-emerald-50/60 hover:bg-emerald-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-emerald-200 hover:border-emerald-400 dark:border-emerald-800/70 dark:hover:border-emerald-500',
                badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-300/70 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
                orgStyle: 'text-emerald-700 dark:text-emerald-400'
              },
              {
                id: 'childpugh' as CalculatorType,
                name: 'Child-Pugh & MELD Score',
                org: 'UNOS / Mayo Clinic',
                desc: 'Stratifikasi derajat keparahan sirosis hepatis, mortalitas bedah & risiko dekompensasi hepar.',
                badge: 'Hepatologi',
                cardBg: 'bg-amber-50/60 hover:bg-amber-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-amber-200 hover:border-amber-400 dark:border-amber-800/70 dark:hover:border-amber-500',
                badgeStyle: 'bg-amber-100 text-amber-800 border-amber-300/70 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
                orgStyle: 'text-amber-700 dark:text-amber-400'
              },
              {
                id: 'holliday-segar' as CalculatorType,
                name: 'Holliday-Segar Cairan',
                org: 'Pediatrik Standar',
                desc: 'Kalkulasi kebutuhan cairan rumatan harian (maintenance fluid) anak & laju tetesan mL/jam.',
                badge: 'Pediatrik',
                cardBg: 'bg-yellow-50/60 hover:bg-yellow-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-yellow-200 hover:border-yellow-400 dark:border-yellow-800/70 dark:hover:border-yellow-500',
                badgeStyle: 'bg-yellow-100 text-yellow-800 border-yellow-300/70 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800',
                orgStyle: 'text-yellow-700 dark:text-yellow-400'
              },
              {
                id: 'pediatric-dehydration' as CalculatorType,
                name: 'Derajat Dehidrasi WHO',
                org: 'WHO Guidelines',
                desc: 'Klasifikasi dehidrasi diare akut anak (Tanpa, Ringan-Sedang, Berat) & Rencana Terapi Cairan A/B/C.',
                badge: 'Gastro Pediatrik',
                cardBg: 'bg-orange-50/60 hover:bg-orange-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-orange-200 hover:border-orange-400 dark:border-orange-800/70 dark:hover:border-orange-500',
                badgeStyle: 'bg-orange-100 text-orange-800 border-orange-300/70 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
                orgStyle: 'text-orange-700 dark:text-orange-400'
              },
              {
                id: 'hba1c-eag' as CalculatorType,
                name: 'HbA1c to eAG Converter',
                org: 'ADA / ADAG Study',
                desc: 'Konversi nilai HbA1c (%) menjadi perkiraan rata-rata glukosa darah harian (eAG mg/dL).',
                badge: 'Endokrin',
                cardBg: 'bg-purple-50/60 hover:bg-purple-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-purple-200 hover:border-purple-400 dark:border-purple-800/70 dark:hover:border-purple-500',
                badgeStyle: 'bg-purple-100 text-purple-800 border-purple-300/70 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
                orgStyle: 'text-purple-700 dark:text-purple-400'
              },
              {
                id: 'act-asthma' as CalculatorType,
                name: 'Asthma Control Test (ACT)',
                org: 'GINA Standard',
                desc: 'Kuesioner evaluasi tingkat kendali asma 4 minggu (Terkontrol Penuh, Baik, Tidak Terkontrol).',
                badge: 'Asma / Paru',
                cardBg: 'bg-sky-50/60 hover:bg-sky-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-sky-200 hover:border-sky-400 dark:border-sky-800/70 dark:hover:border-sky-500',
                badgeStyle: 'bg-sky-100 text-sky-800 border-sky-300/70 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800',
                orgStyle: 'text-sky-700 dark:text-sky-400'
              },
              {
                id: 'phq9' as CalculatorType,
                name: 'PHQ-9 Depression Scale',
                org: 'DSM-5 / APA',
                desc: 'Instrumen skrining tingkat keparahan depresi 9 kriteria dan evaluasi efikasi antidepresan.',
                badge: 'Psikiatri',
                cardBg: 'bg-fuchsia-50/60 hover:bg-fuchsia-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-fuchsia-200 hover:border-fuchsia-400 dark:border-fuchsia-800/70 dark:hover:border-fuchsia-500',
                badgeStyle: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300/70 dark:bg-fuchsia-950 dark:text-fuchsia-300 dark:border-fuchsia-800',
                orgStyle: 'text-fuchsia-700 dark:text-fuchsia-400'
              },
              {
                id: 'bishop' as CalculatorType,
                name: 'Bishop Score Induksi',
                org: 'ACOG Obstetri',
                desc: 'Penilaian kematangan serviks untuk memprediksi keberhasilan induksi persalinan pervaginam.',
                badge: 'Obstetri',
                cardBg: 'bg-pink-50/60 hover:bg-pink-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-pink-200 hover:border-pink-400 dark:border-pink-800/70 dark:hover:border-pink-500',
                badgeStyle: 'bg-pink-100 text-pink-800 border-pink-300/70 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800',
                orgStyle: 'text-pink-700 dark:text-pink-400'
              },
              {
                id: 'srq20' as CalculatorType,
                name: 'Kuesioner Kesehatan Jiwa (SRQ-20)',
                org: 'WHO / Kemenkes RI',
                desc: 'Instrumen 20 butir skrining gangguan mental emosional (GME), neurosis, ansietas, depresi, & indikasi rujukan psikiatri.',
                badge: 'Kesehatan Jiwa',
                cardBg: 'bg-teal-50/60 hover:bg-teal-50/90 dark:bg-slate-900/90 dark:hover:bg-slate-900',
                borderColor: 'border-teal-200 hover:border-teal-400 dark:border-teal-800/70 dark:hover:border-teal-500',
                badgeStyle: 'bg-teal-100 text-teal-800 border-teal-300/70 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800',
                orgStyle: 'text-teal-700 dark:text-teal-400'
              }
            ].map(scoreItem => (
              <div
                key={scoreItem.id}
                className={`p-5 rounded-2xl border ${scoreItem.borderColor} ${scoreItem.cardBg} flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all group duration-200`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${scoreItem.badgeStyle} shadow-2xs`}>
                      {scoreItem.badge}
                    </span>
                    <span className={`text-[11px] font-bold ${scoreItem.orgStyle}`}>
                      {scoreItem.org}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                    {scoreItem.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {scoreItem.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedClinicalScore(scoreItem.id);
                    setIsScoresModalOpen(true);
                  }}
                  className="w-full py-2.5 px-3.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-teal-600 dark:bg-slate-800 dark:hover:bg-teal-600 text-white border border-slate-800 dark:border-slate-700 hover:border-teal-500 dark:border-teal-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  <Calculator className="w-4 h-4 text-teal-400 dark:text-white" />
                  <span>Buka Kalkulator Skor</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
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
