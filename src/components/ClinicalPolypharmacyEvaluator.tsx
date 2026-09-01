import React, { useState, useMemo, useEffect } from 'react';
import { Drug, DrugInteraction, ClinicBrandingSettings } from '../types';
import { 
  Stethoscope, 
  User, 
  Plus, 
  Trash2, 
  Clock, 
  Utensils, 
  Coffee, 
  Wine, 
  Cigarette, 
  AlertTriangle, 
  AlertCircle,
  CheckCircle2, 
  Printer, 
  Sparkles, 
  Pill, 
  Calendar, 
  ShieldAlert,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Info,
  RotateCcw,
  Activity,
  Heart,
  Baby,
  ShieldCheck,
  Edit3,
  Search,
  Calculator,
  HelpCircle,
  ArrowDownRight,
  MessageSquare,
  Bookmark,
  Copy,
  Check,
  Share2,
  FileText
} from 'lucide-react';
import { getDrugClinicalProfile, DrugClinicalProfile, CLINICAL_DRUG_PROFILES } from '../data/clinicalDrugDefaults';

interface PatientParameters {
  name: string;
  age: number;
  gender: 'Laki-laki' | 'Perempuan';
  weightKg: number;
  heightCm: number;
  enableRenalCheck: boolean; // On/Off Switch for Renal Function
  crCl: number; // mL/min
  hepaticFunction: 'Normal' | 'Gangguan Ringan (Child-Pugh A)' | 'Gangguan Berat (Child-Pugh B/C)';
  pregnancyStatus: 'Tidak Hamil' | 'Trimester 1' | 'Trimester 2' | 'Trimester 3';
  isLactating: boolean;
  isSmoker: boolean;
  alcoholConsumer: 'Tidak' | 'Kadang-kadang' | 'Rutin';
  caffeineConsumer: 'Tidak' | '1-2 cangkir/hari' | '>3 cangkir/hari';
  comorbidities: string[];
  allergies: string[];
  // Vitals & Lab
  systolicBp?: number;
  diastolicBp?: number;
  bloodGlucose?: number; // mg/dL
  serumPotassium?: number; // mmol/L
  serumUricAcid?: number; // mg/dL
}

interface PrescriptionItem {
  id: string;
  drug: Drug;
  dose: string; // e.g. "500 mg"
  frequency: string; // e.g. "3x1 (Tiap 8 jam)"
  foodTiming: 'Sebelum Makan' | 'Sesudah Makan' | 'Bersama Makanan' | 'Perut Kosong' | 'Bebas';
  preferredTimes: string[]; // e.g. ["08:00", "13:00", "19:00"]
}

interface ClinicalPolypharmacyEvaluatorProps {
  allDrugs: Drug[];
  allInteractions: DrugInteraction[];
  clinicBranding?: ClinicBrandingSettings;
  onSelectTab?: (tab: string) => void;
}

export const FREQUENCY_OPTIONS = [
  { label: '1x1 Pagi (06:30 Sebelum Makan / 08:00 Sesudah Sarapan)', times: ['08:00'] },
  { label: '1x1 Malam (21:00 Sebelum Tidur)', times: ['21:00'] },
  { label: '2x1 (Pagi 08:00 & Malam 19:00 / Tiap 12 Jam)', times: ['08:00', '19:00'] },
  { label: '3x1 (Pagi 08:00, Siang 13:00, Malam 19:00 / Tiap 8 Jam)', times: ['08:00', '13:00', '19:00'] },
  { label: '4x1 (Tiap 6 Jam: 06:00, 12:00, 18:00, 24:00)', times: ['06:00', '12:00', '18:00', '24:00'] },
  { label: 'PRN / Bila Perlu (Kebutuhan Saja)', times: [] }
];

export const calculateSmartTimes = (
  frequencyLabel: string,
  foodTiming: PrescriptionItem['foodTiming'],
  drugName: string = ''
): string[] => {
  const name = drugName.toLowerCase();
  const freq = frequencyLabel.toLowerCase();

  // 1x1 Special Cases: Bedtime
  if (
    freq.includes('1x1 malam') ||
    freq.includes('sebelum tidur') ||
    name.includes('statin') ||
    name.includes('bisacodyl') ||
    name.includes('sedatif')
  ) {
    return ['21:00'];
  }

  // 1x1 Pagi
  if (freq.includes('1x1 pagi') || freq.includes('1x sehari') || freq.includes('1x1')) {
    if (
      foodTiming === 'Sebelum Makan' ||
      foodTiming === 'Perut Kosong' ||
      name.includes('prazole') ||
      name.includes('levothyroxine')
    ) {
      return ['06:30']; // 30-60 menit sebelum sarapan pagi
    }
    return ['08:00']; // Saat sarapan / sesudah sarapan pagi
  }

  // 2x1 (2x sehari)
  if (freq.includes('2x1') || freq.includes('2x sehari') || freq.includes('tiap 12 jam')) {
    if (foodTiming === 'Sebelum Makan' || foodTiming === 'Perut Kosong' || name.includes('captopril')) {
      return ['06:30', '17:30']; // Sebelum sarapan & sebelum makan malam
    }
    // Bersama Makanan / Sesudah Makan (Metformin, Amlodipine/Bisoprolol 2x1, Kalsium, etc)
    return ['08:00', '19:00']; // Saat/sesudah sarapan & saat/sesudah makan malam
  }

  // 3x1 (3x sehari)
  if (freq.includes('3x1') || freq.includes('3x sehari') || freq.includes('tiap 8 jam')) {
    if (foodTiming === 'Sebelum Makan' || foodTiming === 'Perut Kosong' || name.includes('sucralfate') || name.includes('antasida')) {
      return ['06:30', '11:30', '17:30']; // Sebelum sarapan, sebelum makan siang, sebelum makan malam
    }
    // Bersama Makanan / Sesudah Makan (Metformin 3x1, Asam Mefenamat, Paracetamol, Amoxicillin)
    return ['08:00', '13:00', '19:00']; // Sarapan pagi, makan siang, makan malam
  }

  // 4x1 (Tiap 6 jam)
  if (freq.includes('4x1') || freq.includes('4x sehari') || freq.includes('tiap 6 jam')) {
    return ['06:00', '12:00', '18:00', '24:00'];
  }

  return ['08:00'];
};

export const ALLERGY_OPTIONS = [
  'Penisilin & Beta-Laktam (Amoksisilin, Ampisilin)',
  'Sefalosporin (Sefadroksil, Sefiksim, Seftriakson)',
  'Sulfonamida / Sulfa (Kotrimoksazol)',
  'Aspirin & OAINS (Asam Mefenamat, Ibuprofen, Diklofenak)',
  'Kuinolon (Siprofloksasin, Levofloksasin)',
  'Parasetamol'
];

export const COMORBIDITY_OPTIONS = [
  'Hipertensi',
  'Diabetes Melitus',
  'Gagal Jantung (CHF)',
  'Asma / PPOK',
  'Peptic Ulcer / Maag & GGL',
  'Gagal Ginjal Kronis (CKD)',
  'Gangguan Hati / Sirosis',
  'BPH (Pembesaran Prostat Jinak)',
  'Glaukoma Sudut Tertutup',
  'Penyakit Parkinson',
  'Demensia / Gangguan Kognitif',
  'Gout / Hiperurisemia',
  'Dislipidemia'
];

export const ClinicalPolypharmacyEvaluator: React.FC<ClinicalPolypharmacyEvaluatorProps> = ({
  allDrugs,
  allInteractions,
  clinicBranding,
  onSelectTab
}) => {
  // 1. Patient Parameters State
  const [patient, setPatient] = useState<PatientParameters>({
    name: 'Tn. Ahmad Dahlan',
    age: 68,
    gender: 'Laki-laki',
    weightKg: 65,
    heightCm: 165,
    enableRenalCheck: true,
    crCl: 45,
    hepaticFunction: 'Normal',
    pregnancyStatus: 'Tidak Hamil',
    isLactating: false,
    isSmoker: false,
    alcoholConsumer: 'Tidak',
    caffeineConsumer: '1-2 cangkir/hari',
    comorbidities: ['Hipertensi', 'Diabetes Melitus'],
    allergies: [],
    systolicBp: 135,
    diastolicBp: 85,
    bloodGlucose: 140,
    serumPotassium: 4.2,
    serumUricAcid: 6.5
  });

  // CrCl Cockcroft-Gault Calculator modal/input
  const [serumCreatinine, setSerumCreatinine] = useState<string>('1.4');
  const [showCrClCalculator, setShowCrClCalculator] = useState<boolean>(false);

  // Child-Pugh Score Calculator modal/input
  const [showChildPughCalc, setShowChildPughCalc] = useState<boolean>(false);
  const [cpBilirubin, setCpBilirubin] = useState<number>(1);
  const [cpAlbumin, setCpAlbumin] = useState<number>(1);
  const [cpInr, setCpInr] = useState<number>(1);
  const [cpAscites, setCpAscites] = useState<number>(1);
  const [cpEncephalopathy, setCpEncephalopathy] = useState<number>(1);

  // Show/Hide Vitals & Lab Toggle
  const [showVitalsLab, setShowVitalsLab] = useState<boolean>(false);

  // Initial Prescription Items State
  const [prescription, setPrescription] = useState<PrescriptionItem[]>(() => {
    const metformin = allDrugs.find(d => d.name.toLowerCase().includes('metformin')) || allDrugs[0];
    const captopril = allDrugs.find(d => d.name.toLowerCase().includes('captopril')) || allDrugs[1] || allDrugs[0];
    const simvastatin = allDrugs.find(d => d.name.toLowerCase().includes('simvastatin')) || allDrugs[2] || allDrugs[0];

    return [
      {
        id: 'p1',
        drug: metformin,
        dose: '500 mg',
        frequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
        foodTiming: 'Bersama Makanan',
        preferredTimes: ['08:00', '20:00']
      },
      {
        id: 'p2',
        drug: captopril,
        dose: '25 mg',
        frequency: '2x1 (Tiap 12 jam: 08:00 & 20:00)',
        foodTiming: 'Perut Kosong',
        preferredTimes: ['06:00', '18:00']
      },
      {
        id: 'p3',
        drug: simvastatin,
        dose: '20 mg',
        frequency: '1x1 Malam (21:00 Sebelum Tidur)',
        foodTiming: 'Sesudah Makan',
        preferredTimes: ['21:00']
      }
    ];
  });

  // Drug selector and auto-fill input state
  const [selectedDrugId, setSelectedDrugId] = useState<string>(allDrugs[0]?.id || '');
  const [drugSearchTerm, setDrugSearchTerm] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Semua');
  const [isDrugDropdownOpen, setIsDrugDropdownOpen] = useState<boolean>(false);
  const [customDose, setCustomDose] = useState<string>('500 mg');
  const [isManualDoseInput, setIsManualDoseInput] = useState<boolean>(false);
  const [customFreqLabel, setCustomFreqLabel] = useState<string>(FREQUENCY_OPTIONS[2].label);
  const [customTiming, setCustomTiming] = useState<PrescriptionItem['foodTiming']>('Sesudah Makan');
  const [clinicalAutoHint, setClinicalAutoHint] = useState<string>('');
  const [scheduleViewMode, setScheduleViewMode] = useState<'meal' | 'timeline' | 'table'>('meal');
  const [copiedSchedule, setCopiedSchedule] = useState<boolean>(false);

  // Helper to extract chosen drug object
  const currentDrug = useMemo(() => {
    return allDrugs.find(d => d.id === selectedDrugId) || allDrugs[0];
  }, [allDrugs, selectedDrugId]);

  // Filtered drugs for search dropdown
  const filteredDrugsList = useMemo(() => {
    let list = allDrugs;
    if (selectedCategoryFilter !== 'Semua') {
      const cat = selectedCategoryFilter.toLowerCase();
      list = list.filter(d => {
        const text = (d.category + ' ' + d.name + ' ' + (d.genericName || '') + ' ' + (d.indication || '')).toLowerCase();
        if (cat === 'maag / ppi') return text.includes('lambung') || text.includes('proton') || text.includes('antasida') || text.includes('gastro') || text.includes('maag') || text.includes('ppi');
        if (cat === 'antihipertensi') return text.includes('hipertensi') || text.includes('tekanan darah') || text.includes('arb') || text.includes('ace') || text.includes('ccb') || text.includes('beta');
        if (cat === 'antidiabetes') return text.includes('diabetes') || text.includes('gula') || text.includes('glukosa') || text.includes('insulin') || text.includes('metformin');
        if (cat === 'kalsium & vitamin') return text.includes('kalsium') || text.includes('calcium') || text.includes('vitamin') || text.includes('mineral') || text.includes('zinc') || text.includes('folat');
        if (cat === 'antibiotik') return text.includes('antibiotik') || text.includes('antibakteri') || text.includes('infeksi');
        if (cat === 'analgesik') return text.includes('nyeri') || text.includes('analgesik') || text.includes('antiinflamasi') || text.includes('oains') || text.includes('nsaid');
        if (cat === 'kolesterol') return text.includes('kolesterol') || text.includes('lipid') || text.includes('statin');
        return true;
      });
    }

    if (drugSearchTerm.trim()) {
      const q = drugSearchTerm.toLowerCase();
      list = list.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          (d.genericName && d.genericName.toLowerCase().includes(q)) ||
          (d.category && d.category.toLowerCase().includes(q)) ||
          (d.brandNames && d.brandNames.some(b => b.toLowerCase().includes(q)))
      );
    }
    return list;
  }, [allDrugs, drugSearchTerm, selectedCategoryFilter]);

  // Dynamic available dosage options array based on Clinical Profile or Monograph
  const availableDosages = useMemo(() => {
    if (!currentDrug) return ['500 mg', '250 mg', '100 mg'];
    const profile = getDrugClinicalProfile(currentDrug.name + ' ' + (currentDrug.genericName || ''));
    if (profile && profile.strengths.length > 0) {
      return profile.strengths;
    }

    if (currentDrug.dosage) {
      const matches = currentDrug.dosage.match(/(\d+(\.\d+)?\s*(mg|g|mcg|ml|IU|unit|mg\/ml))/gi);
      if (matches && matches.length > 0) {
        return Array.from(new Set(matches.map(m => m.trim())));
      }
    }

    return ['500 mg', '250 mg', '100 mg'];
  }, [currentDrug]);

  // Auto-Fill Effect: Automatically set optimal frequency, food timing, and standard dose when drug is chosen
  useEffect(() => {
    if (!currentDrug) return;
    const profile = getDrugClinicalProfile(currentDrug.name + ' ' + (currentDrug.genericName || ''));

    if (profile) {
      if (!isManualDoseInput) {
        setCustomDose(profile.defaultStrength || profile.strengths[0] || '500 mg');
      }
      setCustomFreqLabel(profile.defaultFrequency);
      setCustomTiming(profile.defaultTiming);
      setClinicalAutoHint(profile.clinicalReason);
    } else {
      // Fallback: Smart text analysis from drug monograph
      let detectedTiming: PrescriptionItem['foodTiming'] = 'Sesudah Makan';
      let detectedFreq = FREQUENCY_OPTIONS[2].label; // Default 2x1
      let detectedHint = 'Diminum sesudah makan untuk kenyamanan lambung.';

      const monoText = (
        (currentDrug.foodInteraction || '') +
        ' ' +
        (currentDrug.administrationGuideline || '') +
        ' ' +
        (currentDrug.patientTips || '') +
        ' ' +
        (currentDrug.dosage || '')
      ).toLowerCase();

      if (monoText.includes('sebelum makan') || monoText.includes('perut kosong') || monoText.includes('empty stomach')) {
        detectedTiming = 'Sebelum Makan';
        detectedHint = 'Diminum 30-60 menit sebelum makan saat perut kosong untuk absorpsi optimal.';
      } else if (monoText.includes('bersama makanan') || monoText.includes('with food') || monoText.includes('suapan pertama')) {
        detectedTiming = 'Bersama Makanan';
        detectedHint = 'Diminum bersama makanan untuk penyerapan optimal atau mencegah iritasi lambung.';
      }

      if (monoText.includes('1x sehari') || monoText.includes('once daily') || monoText.includes('pagi')) {
        detectedFreq = FREQUENCY_OPTIONS[0].label;
      } else if (monoText.includes('malam') || monoText.includes('sebelum tidur') || monoText.includes('bedtime')) {
        detectedFreq = FREQUENCY_OPTIONS[1].label;
      } else if (monoText.includes('3x') || monoText.includes('tiap 8 jam') || monoText.includes('three times')) {
        detectedFreq = FREQUENCY_OPTIONS[3].label;
      }

      if (!isManualDoseInput) {
        setCustomDose(availableDosages[0] || '500 mg');
      }
      setCustomFreqLabel(detectedFreq);
      setCustomTiming(detectedTiming);
      setClinicalAutoHint(detectedHint);
    }
  }, [selectedDrugId, currentDrug, isManualDoseInput, availableDosages]);

  const handleToggleComorbidity = (item: string) => {
    if (patient.comorbidities.includes(item)) {
      setPatient({
        ...patient,
        comorbidities: patient.comorbidities.filter(c => c !== item)
      });
    } else {
      setPatient({
        ...patient,
        comorbidities: [...patient.comorbidities, item]
      });
    }
  };

  const handleToggleAllergy = (item: string) => {
    const current = patient.allergies || [];
    if (current.includes(item)) {
      setPatient({
        ...patient,
        allergies: current.filter(a => a !== item)
      });
    } else {
      setPatient({
        ...patient,
        allergies: [...current, item]
      });
    }
  };

  // BMI, Ideal Body Weight (IBW) and Adjusted Body Weight (ABW)
  const bmiDetails = useMemo(() => {
    if (!patient.weightKg || !patient.heightCm || patient.heightCm <= 0) {
      return { bmi: 0, status: 'Normal', color: 'text-slate-600', ibw: 0, abw: 0 };
    }
    const heightM = patient.heightCm / 100;
    const bmi = Math.round((patient.weightKg / (heightM * heightM)) * 10) / 10;
    
    let status = 'Normal (Ideal)';
    let color = 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
    if (bmi < 18.5) {
      status = 'Underweight (Kurang Gizi)';
      color = 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800';
    } else if (bmi >= 18.5 && bmi <= 22.9) {
      status = 'Normal (Gizi Baik)';
      color = 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
    } else if (bmi >= 23.0 && bmi <= 24.9) {
      status = 'Overweight (Kelebihan BB)';
      color = 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      status = 'Obesitas Tingkat 1';
      color = 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
    } else {
      status = 'Obesitas Tingkat 2 (Morbid)';
      color = 'text-rose-900 dark:text-rose-200 bg-rose-100 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700';
    }

    // IBW (Devine formula)
    const baseIbw = patient.gender === 'Laki-laki' ? 50 : 45.5;
    const inchOver5Ft = (patient.heightCm - 152.4) / 2.54;
    const ibw = Math.round((baseIbw + 2.3 * (inchOver5Ft > 0 ? inchOver5Ft : 0)) * 10) / 10;

    // ABW (Adjusted Body Weight for Obese BMI >= 25)
    let abw = ibw;
    if (patient.weightKg > ibw) {
      abw = Math.round((ibw + 0.4 * (patient.weightKg - ibw)) * 10) / 10;
    }

    return { bmi, status, color, ibw, abw };
  }, [patient.weightKg, patient.heightCm, patient.gender]);

  const handleCalculateChildPugh = () => {
    const totalScore = cpBilirubin + cpAlbumin + cpInr + cpAscites + cpEncephalopathy;
    if (totalScore <= 6) {
      setPatient(prev => ({ ...prev, hepaticFunction: 'Gangguan Ringan (Child-Pugh A)' }));
    } else {
      setPatient(prev => ({ ...prev, hepaticFunction: 'Gangguan Berat (Child-Pugh B/C)' }));
    }
    setShowChildPughCalc(false);
  };

  const handleAddDrug = () => {
    if (!currentDrug) return;

    if (prescription.some(p => p.drug.id === currentDrug.id)) {
      alert(`Obat "${currentDrug.name}" sudah ada dalam daftar resep pasien!`);
      return;
    }

    const smartTimes = calculateSmartTimes(
      customFreqLabel,
      customTiming,
      currentDrug.name + ' ' + (currentDrug.genericName || '')
    );

    const newItem: PrescriptionItem = {
      id: `p_${Date.now()}`,
      drug: currentDrug,
      dose: customDose,
      frequency: customFreqLabel,
      foodTiming: customTiming,
      preferredTimes: smartTimes
    };

    setPrescription([...prescription, newItem]);
  };

  const handleRemoveDrug = (id: string) => {
    setPrescription(prescription.filter(p => p.id !== id));
  };

  const handleUpdateDrugTime = (drugId: string, newTime: string) => {
    setPrescription(prev => prev.map(p => {
      if (p.id === drugId) {
        return { ...p, preferredTimes: [newTime] };
      }
      return p;
    }));
  };

  const handleCalculateCrCl = () => {
    const scr = parseFloat(serumCreatinine);
    if (!scr || scr <= 0) {
      alert('Masukkan nilai Serum Kreatinin yang valid (misal: 1.2 mg/dL)');
      return;
    }
    let calculated = ((140 - patient.age) * patient.weightKg) / (72 * scr);
    if (patient.gender === 'Perempuan') {
      calculated *= 0.85;
    }
    const rounded = Math.round(calculated * 10) / 10;
    setPatient(prev => ({ ...prev, crCl: rounded, enableRenalCheck: true }));
    setShowCrClCalculator(false);
  };

  const handleLoadCasePreset = (presetType: 'geriatri' | 'hamil' | 'cascade') => {
    if (presetType === 'geriatri') {
      setPatient({
        name: 'Tn. Ahmad Dahlan',
        age: 72,
        gender: 'Laki-laki',
        weightKg: 62,
        heightCm: 165,
        enableRenalCheck: true,
        crCl: 42,
        hepaticFunction: 'Normal',
        pregnancyStatus: 'Tidak Hamil',
        isLactating: false,
        isSmoker: false,
        alcoholConsumer: 'Tidak',
        caffeineConsumer: '1-2 cangkir/hari',
        comorbidities: ['Hipertensi', 'Diabetes Melitus', 'Gagal Ginjal Kronis (CKD)'],
        allergies: [],
        systolicBp: 145,
        diastolicBp: 90,
        bloodGlucose: 155,
        serumPotassium: 4.6,
        serumUricAcid: 7.2
      });
      const d1 = allDrugs.find(d => d.name.toLowerCase().includes('metformin')) || allDrugs[0];
      const d2 = allDrugs.find(d => d.name.toLowerCase().includes('candesartan') || d.name.toLowerCase().includes('captopril')) || allDrugs[1] || allDrugs[0];
      const d3 = allDrugs.find(d => d.name.toLowerCase().includes('amlodipine')) || allDrugs[2] || allDrugs[0];
      const d4 = allDrugs.find(d => d.name.toLowerCase().includes('simvastatin') || d.name.toLowerCase().includes('atorvastatin')) || allDrugs[3] || allDrugs[0];
      const d5 = allDrugs.find(d => d.name.toLowerCase().includes('allopurinol')) || allDrugs[4] || allDrugs[0];
      const d6 = allDrugs.find(d => d.name.toLowerCase().includes('omeprazole')) || allDrugs[5] || allDrugs[0];

      setPrescription([
        { id: 'c1', drug: d1, dose: '500 mg', frequency: '2x1 (Pagi 08:00 & Malam 19:00 / Tiap 12 Jam)', foodTiming: 'Bersama Makanan', preferredTimes: ['08:00', '19:00'] },
        { id: 'c2', drug: d2, dose: '8 mg', frequency: '1x1 Pagi (08:00)', foodTiming: 'Sesudah Makan', preferredTimes: ['08:00'] },
        { id: 'c3', drug: d3, dose: '5 mg', frequency: '1x1 Pagi (08:00)', foodTiming: 'Sesudah Makan', preferredTimes: ['08:00'] },
        { id: 'c4', drug: d4, dose: '20 mg', frequency: '1x1 Malam (21:00 Sebelum Tidur)', foodTiming: 'Sesudah Makan', preferredTimes: ['21:00'] },
        { id: 'c5', drug: d5, dose: '100 mg', frequency: '1x1 Pagi (08:00)', foodTiming: 'Sesudah Makan', preferredTimes: ['08:00'] },
        { id: 'c6', drug: d6, dose: '20 mg', frequency: '1x1 Pagi (06:30 Sebelum Makan)', foodTiming: 'Sebelum Makan', preferredTimes: ['06:30'] }
      ]);
    } else if (presetType === 'hamil') {
      setPatient({
        name: 'Ny. Siti Rahma',
        age: 29,
        gender: 'Perempuan',
        weightKg: 58,
        heightCm: 160,
        enableRenalCheck: false,
        crCl: 100,
        hepaticFunction: 'Normal',
        pregnancyStatus: 'Trimester 1',
        isLactating: false,
        isSmoker: false,
        alcoholConsumer: 'Tidak',
        caffeineConsumer: 'Tidak',
        comorbidities: ['Hipertensi'],
        allergies: [],
        systolicBp: 130,
        diastolicBp: 85,
        bloodGlucose: 95,
        serumPotassium: 4.0,
        serumUricAcid: 4.5
      });
      const d1 = allDrugs.find(d => d.name.toLowerCase().includes('methyldopa') || d.name.toLowerCase().includes('nifedipine')) || allDrugs[0];
      const d2 = allDrugs.find(d => d.name.toLowerCase().includes('folic') || d.name.toLowerCase().includes('asam folat')) || allDrugs[1] || allDrugs[0];
      const d3 = allDrugs.find(d => d.name.toLowerCase().includes('calcium') || d.name.toLowerCase().includes('kalsium')) || allDrugs[2] || allDrugs[0];

      setPrescription([
        { id: 'h1', drug: d1, dose: '250 mg', frequency: '2x1 (Pagi 08:00 & Malam 19:00 / Tiap 12 Jam)', foodTiming: 'Sesudah Makan', preferredTimes: ['08:00', '19:00'] },
        { id: 'h2', drug: d2, dose: '400 mcg', frequency: '1x1 Pagi (08:00)', foodTiming: 'Sesudah Makan', preferredTimes: ['08:00'] },
        { id: 'h3', drug: d3, dose: '500 mg', frequency: '2x1 (Pagi 08:00 & Malam 19:00 / Tiap 12 Jam)', foodTiming: 'Bersama Makanan', preferredTimes: ['08:00', '19:00'] }
      ]);
    } else if (presetType === 'cascade') {
      setPatient({
        name: 'Tn. Hendro Wijaya',
        age: 65,
        gender: 'Laki-laki',
        weightKg: 70,
        heightCm: 170,
        enableRenalCheck: false,
        crCl: 80,
        hepaticFunction: 'Normal',
        pregnancyStatus: 'Tidak Hamil',
        isLactating: false,
        isSmoker: false,
        alcoholConsumer: 'Tidak',
        caffeineConsumer: '1-2 cangkir/hari',
        comorbidities: ['Hipertensi', 'Peptic Ulcer / Maag & GGL'],
        allergies: [],
        systolicBp: 150,
        diastolicBp: 95,
        bloodGlucose: 120,
        serumPotassium: 4.1,
        serumUricAcid: 6.0
      });
      const d1 = allDrugs.find(d => d.name.toLowerCase().includes('amlodipine')) || allDrugs[0];
      const d2 = allDrugs.find(d => d.name.toLowerCase().includes('furosemide')) || allDrugs[1] || allDrugs[0];
      const d3 = allDrugs.find(d => d.name.toLowerCase().includes('mefenamic') || d.name.toLowerCase().includes('ibuprofen')) || allDrugs[2] || allDrugs[0];
      const d4 = allDrugs.find(d => d.name.toLowerCase().includes('omeprazole')) || allDrugs[3] || allDrugs[0];

      setPrescription([
        { id: 'k1', drug: d1, dose: '10 mg', frequency: '1x1 Pagi (08:00)', foodTiming: 'Sesudah Makan', preferredTimes: ['08:00'] },
        { id: 'k2', drug: d2, dose: '40 mg', frequency: '1x1 Pagi (08:00)', foodTiming: 'Sesudah Makan', preferredTimes: ['08:00'] },
        { id: 'k3', drug: d3, dose: '500 mg', frequency: '3x1 (Pagi 08:00, Siang 13:00, Malam 19:00 / Tiap 8 Jam)', foodTiming: 'Sesudah Makan', preferredTimes: ['08:00', '13:00', '19:00'] },
        { id: 'k4', drug: d4, dose: '20 mg', frequency: '1x1 Pagi (06:30 Sebelum Makan)', foodTiming: 'Sebelum Makan', preferredTimes: ['06:30'] }
      ]);
    }
  };

  // Polypharmacy, Pregnancy, Hepatic, Beers 2023, ACB Score & Cascade Evaluation
  const polypharmacyStatus = useMemo(() => {
    const count = prescription.length;
    let level: 'Normal' | 'Polifarmasi' | 'Hiperpolifarmasi' = 'Normal';
    let color = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200';
    let badge = 'Risiko Rendah';

    if (count >= 10) {
      level = 'Hiperpolifarmasi';
      color = 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200';
      badge = '⚠️ Risiko Sangat Tinggi (10+ Obat)';
    } else if (count >= 5) {
      level = 'Polifarmasi';
      color = 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200';
      badge = '⚠️ Polifarmasi (5-9 Obat)';
    }

    const pregnancyAlerts: string[] = [];
    if (patient.pregnancyStatus !== 'Tidak Hamil') {
      prescription.forEach(p => {
        const cat = p.drug.pregnancyCategory?.toUpperCase() || 'C';
        if (cat === 'D' || cat === 'X') {
          pregnancyAlerts.push(`⚠️ KATEGORI ${cat} PADA KEHAMILAN: Obat ${p.drug.name} (${cat}) berisiko tinggi teratogenik / bahaya janin pada ${patient.pregnancyStatus}!`);
        }
      });
    }

    const hepaticAlerts: string[] = [];
    if (patient.hepaticFunction !== 'Normal') {
      prescription.forEach(p => {
        const name = p.drug.name.toLowerCase();
        if (name.includes('paracetamol') || name.includes('acetaminophen')) {
          hepaticAlerts.push(`Toksisitas Hati: ${p.drug.name} berisiko hepatotoksik. Batasi dosis maksimal 2 gram/hari pada ${patient.hepaticFunction}.`);
        }
        if (name.includes('simvastatin') || name.includes('atorvastatin') || name.includes('ketoconazole')) {
          hepaticAlerts.push(`Metabolisme Hati: ${p.drug.name} metabolisme di hati terhambat pada ${patient.hepaticFunction}. Lakukan pemantauan SGOT/SGPT.`);
        }
      });
    }

    // Comprehensive Beers Criteria 2023 & STOPP Criteria
    const elderlyAlerts: string[] = [];
    let totalAcbScore = 0;

    prescription.forEach(p => {
      const name = (p.drug.name + ' ' + (p.drug.genericName || '')).toLowerCase();
      const profile = getDrugClinicalProfile(name);

      if (profile?.acbScore) {
        totalAcbScore += profile.acbScore;
      }

      if (patient.age >= 65) {
        if (profile?.beersWarning) {
          elderlyAlerts.push(`${profile.beersWarning} (${p.drug.name})`);
        } else if (name.includes('glibenclamide')) {
          elderlyAlerts.push(`Kriteria Beers: Glibenklamid dikontraindikasikan pada lansia karena risiko hipoglikemia berat berkepanjangan. Ganti ke Glimepiride atau DPP-4i.`);
        } else if (name.includes('trihexyphenidyl') || name.includes('amitriptyline') || name.includes('chlorpheniramine')) {
          elderlyAlerts.push(`Kriteria Beers: Antikolinergik kuat (${p.drug.name}) meningkatkan risiko delirium, demensia, retensi urin, dan jatuh pada lansia.`);
        } else if (name.includes('diazepam') || name.includes('alprazolam') || name.includes('lorazepam')) {
          elderlyAlerts.push(`Kriteria Beers: Benzodiazepin (${p.drug.name}) tingkatkan risiko sedasi berlebih, jatuh, fraktur panggul, & gangguan kognitif lansia.`);
        } else if (name.includes('ibuprofen') || name.includes('ketorolac') || name.includes('meloxicam') || name.includes('mefenamic') || name.includes('diklofenak')) {
          elderlyAlerts.push(`Kriteria Beers: OAINS (${p.drug.name}) tingkatkan risiko perdarahan lambung, gagal jantung kongestif, & penurunan fungsi ginjal lansia.`);
        }
      }
    });

    // Anticholinergic Cognitive Burden Alert
    let acbAlert: string | null = null;
    if (totalAcbScore >= 3) {
      acbAlert = `⚠️ BEBAN ANTIKOLINERGIK TINGGI (Total Skor ACB = ${totalAcbScore}): Risiko tinggi delirium, penurunan fungsi kognitif, glaukoma, retensi urin, dan peningkatan mortalitas geriatri hingga 3x lipat! Pertimbangkan deprescribing obat antikolinergik.`;
    } else if (totalAcbScore > 0) {
      acbAlert = `Beban Antikolinergik Kumulatif Pasien: Skor ACB = ${totalAcbScore} (Risiko Ringan-Sedang).`;
    }

    // Prescribing Cascades Detection
    const prescribingCascades: string[] = [];
    const rxNames = prescription.map(p => (p.drug.name + ' ' + (p.drug.genericName || '')).toLowerCase());

    if (rxNames.some(n => n.includes('amlodipine')) && rxNames.some(n => n.includes('furosemide'))) {
      prescribingCascades.push('Peringatan Prescribing Cascade: Furosemide mungkin diresepkan untuk mengatasi efek samping edema pergelangan kaki dari Amlodipine. Pertimbangkan ganti CCB ke ARB atau turunkan dosis Amlodipine daripada menambah diuretik.');
    }
    if (rxNames.some(n => n.includes('captopril') || n.includes('enalapril')) && rxNames.some(n => n.includes('dextromethorphan') || n.includes('codeine') || n.includes('antitusif'))) {
      prescribingCascades.push('Peringatan Prescribing Cascade: Sirup obat batuk mungkin diresepkan karena efek samping batuk kering ACE Inhibitor. Ganti Captopril ke ARB (Candesartan) daripada menambah obat batuk.');
    }
    if (rxNames.some(n => n.includes('metoclopramide') || n.includes('haloperidol')) && rxNames.some(n => n.includes('trihexyphenidyl'))) {
      prescribingCascades.push('Peringatan Prescribing Cascade: Trihexyphenidyl diresepkan untuk mengatasi efek samping tremor/EPS dari Metoclopramide/Antipsikotik. Pertimbangkan evaluasi penggantian agen antiemetik ke Domperidone/Ondansetron.');
    }
    if (rxNames.some(n => n.includes('ibuprofen') || n.includes('mefenamic') || n.includes('diklofenak')) && rxNames.some(n => n.includes('omeprazole') || n.includes('lansoprazole') || n.includes('antasida'))) {
      prescribingCascades.push('Peringatan Ko-Preskripsi: PPI/Antasida diresepkan bersamaan dengan OAINS untuk gastroproteksi mukosa lambung. Pastikan OAINS digunakan dalam durasi sesingkat mungkin.');
    }

    // Allergy Alerts & Cross-Reactivity
    const allergyAlerts: string[] = [];
    if (patient.allergies && patient.allergies.length > 0) {
      prescription.forEach(p => {
        const drugName = (p.drug.name + ' ' + (p.drug.genericName || '') + ' ' + (p.drug.category || '')).toLowerCase();
        
        patient.allergies.forEach(allergy => {
          const algLower = allergy.toLowerCase();
          
          if (algLower.includes('penisilin') || algLower.includes('amoksisilin')) {
            if (drugName.includes('amoxicillin') || drugName.includes('ampicillin') || drugName.includes('penicillin') || drugName.includes('clavulanate') || drugName.includes('sulbactam')) {
              allergyAlerts.push(`🚨 KONTRAINDIKASI ALERGI: Pasien memiliki riwayat alergi Penisilin, namun diresepkan "${p.drug.name}"! Berisiko fatal syok anafilaksis!`);
            } else if (drugName.includes('cefadroxil') || drugName.includes('cephalexin') || drugName.includes('cefaclor')) {
              allergyAlerts.push(`⚠️ PERINGATAN ALERGI SILANG: Pasien alergi Penisilin memiliki risiko reaksi silang (3-5%) dengan Sefalosporin Generasi 1 ("${p.drug.name}").`);
            }
          }

          if (algLower.includes('sefalosporin')) {
            if (drugName.includes('cef') || drugName.includes('ceph') || drugName.includes('sefa') || drugName.includes('sefi')) {
              allergyAlerts.push(`🚨 KONTRAINDIKASI ALERGI: Pasien alergi Sefalosporin, namun diresepkan "${p.drug.name}"!`);
            }
          }

          if (algLower.includes('sulfa') || algLower.includes('kotrimoksazol')) {
            if (drugName.includes('cotrimoxazole') || drugName.includes('sulfamethoxazole') || drugName.includes('sulfadiazine') || drugName.includes('sulfasalazine')) {
              allergyAlerts.push(`🚨 KONTRAINDIKASI ALERGI: Pasien alergi Sulfonamida, namun diresepkan "${p.drug.name}"!`);
            }
          }

          if (algLower.includes('oains') || algLower.includes('aspirin')) {
            if (drugName.includes('mefenamic') || drugName.includes('ibuprofen') || drugName.includes('diclofenac') || drugName.includes('meloxicam') || drugName.includes('ketorolac') || drugName.includes('aspirin') || drugName.includes('asetosal') || drugName.includes('piroksikam')) {
              allergyAlerts.push(`🚨 KONTRAINDIKASI ALERGI OAINS: Pasien alergi Golongan OAINS/Aspirin, namun diresepkan "${p.drug.name}"! Risiko bronkospasme/urtikaria berat!`);
            }
          }

          if (algLower.includes('kuinolon')) {
            if (drugName.includes('ciprofloxacin') || drugName.includes('levofloxacin') || drugName.includes('ofloxacin') || drugName.includes('moxifloxacin')) {
              allergyAlerts.push(`🚨 KONTRAINDIKASI ALERGI KUINOLON: Pasien alergi Kuinolon, namun diresepkan "${p.drug.name}"!`);
            }
          }

          if (algLower.includes('parasetamol')) {
            if (drugName.includes('paracetamol') || drugName.includes('acetaminophen')) {
              allergyAlerts.push(`🚨 KONTRAINDIKASI ALERGI: Pasien alergi Parasetamol, namun diresepkan "${p.drug.name}"!`);
            }
          }
        });
      });
    }

    // Comorbidity Contraindication Alerts
    const comorbidityAlerts: string[] = [];
    prescription.forEach(p => {
      const drugName = (p.drug.name + ' ' + (p.drug.genericName || '') + ' ' + (p.drug.category || '')).toLowerCase();

      // BPH vs Anticholinergic & Decongestant
      if (patient.comorbidities.includes('BPH (Pembesaran Prostat Jinak)')) {
        if (drugName.includes('chlorpheniramine') || drugName.includes('ctm') || drugName.includes('amitriptyline') || drugName.includes('trihexyphenidyl') || drugName.includes('pseudoephedrine')) {
          comorbidityAlerts.push(`⚠️ PERINGATAN BPH: Obat "${p.drug.name}" memiliki efek antikolinergik/simpatomimetik yang dapat memicu retensi urin akut pada pasien BPH.`);
        }
      }

      // Glaukoma Sudut Tertutup vs Anticholinergic
      if (patient.comorbidities.includes('Glaukoma Sudut Tertutup')) {
        if (drugName.includes('amitriptyline') || drugName.includes('atropine') || drugName.includes('trihexyphenidyl') || drugName.includes('dexamethasone') || drugName.includes('methylprednisolone')) {
          comorbidityAlerts.push(`🚨 KONTRAINDIKASI GLAUKOMA: "${p.drug.name}" dapat memicu peningkatan tekanan intraokular (TIO) berbahaya pada glaukoma sudut tertutup.`);
        }
      }

      // Parkinson vs Metoclopramide / Haloperidol
      if (patient.comorbidities.includes('Penyakit Parkinson')) {
        if (drugName.includes('metoclopramide') || drugName.includes('haloperidol') || drugName.includes('chlorpromazine')) {
          comorbidityAlerts.push(`🚨 KONTRAINDIKASI PARKINSON: "${p.drug.name}" adalah antagonis dopamin sentral yang memperparah tremor dan rigiditas motorik Parkinson.`);
        }
      }

      // Gout vs Thiazide
      if (patient.comorbidities.includes('Gout / Hiperurisemia')) {
        if (drugName.includes('hydrochlorothiazide') || drugName.includes('hct')) {
          comorbidityAlerts.push(`ℹ️ PERHATIAN GOUT: Diuretik Tiazid ("${p.drug.name}") menghambat ekskresi asam urat di tubulus ginjal, dapat memicu serangan gout akut.`);
        }
      }
    });

    // Vitals & Lab Alerts
    const labAlerts: string[] = [];
    if (patient.systolicBp && patient.systolicBp < 90) {
      labAlerts.push(`⚠️ TEKANAN DARAH RENDAH: Tekanan darah sistolik ${patient.systolicBp} mmHg. Waspada hipotensi simtomatik/risiko jatuh pada pasien polifarmasi.`);
    }
    if (patient.bloodGlucose && patient.bloodGlucose < 70) {
      labAlerts.push(`🚨 PERINGATAN HIPOGLIKEMIA: Glukosa darah sewaktu ${patient.bloodGlucose} mg/dL (<70 mg/dL). Segera berikan asupan glukosa cepat dan evaluasi dosis obat antidiabetes.`);
    }
    if (patient.serumPotassium && patient.serumPotassium >= 5.5) {
      labAlerts.push(`🚨 PERINGATAN HIPERKALEMIA: Kalium serum ${patient.serumPotassium} mmol/L (≥5.5 mmol/L). Waspada aritmia fatal bila dikombinasikan dengan ACEi/ARB atau Spironolakton!`);
    }

    const renalAlerts: string[] = [];
    if (patient.enableRenalCheck && patient.crCl < 60) {
      prescription.forEach(p => {
        const name = (p.drug.name + ' ' + (p.drug.genericName || '')).toLowerCase();
        if (name.includes('metformin') && patient.crCl < 30) {
          renalAlerts.push(`Kontraindikasi Ginjal: Metformin dikontraindikasikan pada CrCl <30 mL/min (Risiko Asidosis Laktat fatal).`);
        } else if (name.includes('metformin') && patient.crCl < 45) {
          renalAlerts.push(`Penyesuaian Dosis Ginjal: Batasi dosis maksimal Metformin 1000 mg/hari pada CrCl ${patient.crCl} mL/min.`);
        }
        if (name.includes('allopurinol') || name.includes('captopril') || name.includes('gabapentin')) {
          renalAlerts.push(`Penyesuaian Dosis Ginjal: ${p.drug.name} memerlukan penurunan dosis atau perpanjangan interval pada CrCl ${patient.crCl} mL/min.`);
        }
      });
    }

    return { 
      count, 
      level, 
      color, 
      badge, 
      pregnancyAlerts, 
      hepaticAlerts, 
      elderlyAlerts, 
      renalAlerts,
      totalAcbScore,
      acbAlert,
      prescribingCascades,
      allergyAlerts,
      comorbidityAlerts,
      labAlerts
    };
  }, [prescription, patient]);

  // Drug-Drug Interactions
  const matchedDrugInteractions = useMemo(() => {
    const results: { drugA: string; drugB: string; severity: string; description: string }[] = [];
    for (let i = 0; i < prescription.length; i++) {
      for (let j = i + 1; j < prescription.length; j++) {
        const nameA = prescription[i].drug.name.toLowerCase();
        const nameB = prescription[j].drug.name.toLowerCase();

        const match = allInteractions.find(inter => {
          const a = inter.drugAName.toLowerCase();
          const b = inter.drugBName.toLowerCase();
          return (a === nameA && b === nameB) || (a === nameB && b === nameA);
        });

        if (match) {
          results.push({
            drugA: prescription[i].drug.name,
            drugB: prescription[j].drug.name,
            severity: match.severity,
            description: `${match.clinicalOutcome || match.mechanism} (Manajemen: ${match.management})`
          });
        }
      }
    }
    return results;
  }, [prescription, allInteractions]);

  // Drug-Food & Lifestyle Interactions Matrix
  const lifestyleInteractions = useMemo(() => {
    const items: { drugName: string; category: 'Grapefruit' | 'Susu/Kalsium' | 'Alkohol' | 'Kopi/Kafein' | 'Merokok'; note: string; severity: 'Tinggi' | 'Sedang' | 'Ringan' }[] = [];

    prescription.forEach(p => {
      const name = p.drug.name.toLowerCase();

      if (name.includes('simvastatin') || name.includes('atorvastatin') || name.includes('amlodipine')) {
        items.push({
          drugName: p.drug.name,
          category: 'Grapefruit',
          note: 'Jus Grapefruit menghambat CYP3A4, meningkatkan kadar obat hingga risiko miopati / hipotensi parah.',
          severity: 'Tinggi'
        });
      }

      if (name.includes('ciprofloxacin') || name.includes('tetracycline') || name.includes('doxycycline')) {
        items.push({
          drugName: p.drug.name,
          category: 'Susu/Kalsium',
          note: 'Kalsium dalam susu/keju mengkelat antibiotik ini sehingga menurunkan penyerapan hingga 50%. Beri jeda 2 jam.',
          severity: 'Tinggi'
        });
      }

      if (name.includes('metronidazole') || name.includes('ketoconazole')) {
        items.push({
          drugName: p.drug.name,
          category: 'Alkohol',
          note: 'Reaksi seperti Disulfiram (mual muntah hebat, pusing, takikardia) bila diminum bersama alkohol.',
          severity: 'Tinggi'
        });
      }
      if (name.includes('paracetamol') || name.includes('acetaminophen')) {
        items.push({
          drugName: p.drug.name,
          category: 'Alkohol',
          note: 'Konsumsi alkohol rutin meningkatkan toksisitas hati akibat penumpukan metabolit NAPQI.',
          severity: 'Sedang'
        });
      }

      if (name.includes('ciprofloxacin')) {
        items.push({
          drugName: p.drug.name,
          category: 'Kopi/Kafein',
          note: 'Ciprofloxacin menghambat metabolisme kafein, memicu deg-degan, gelisah, dan insomnia.',
          severity: 'Sedang'
        });
      }

      if (patient.isSmoker && (name.includes('theophylline') || name.includes('clozapine') || name.includes('olanzapine'))) {
        items.push({
          drugName: p.drug.name,
          category: 'Merokok',
          note: 'Asap rokok menginduksi enzim CYP1A2, menurunkan kadar obat dalam darah hingga 50%. Dosis mungkin perlu ditingkatkan.',
          severity: 'Tinggi'
        });
      }
    });

    return items;
  }, [prescription, patient.isSmoker]);

  // Spacing & Administration Warnings
  const spacingWarnings = useMemo(() => {
    const warnings: string[] = [];
    const names = prescription.map(p => (p.drug.name + ' ' + (p.drug.genericName || '')).toLowerCase());
    
    // Calcium vs Quinolone / Tetracycline
    const hasCalcium = names.some(n => n.includes('calcium') || n.includes('kalsium'));
    const hasQuinolone = names.some(n => n.includes('ciprofloxacin') || n.includes('levofloxacin') || n.includes('doxycycline') || n.includes('tetracycline'));
    if (hasCalcium && hasQuinolone) {
      warnings.push('⚠️ Jeda Waktu Diperlukan: Kalsium mengikat antibiotik Kuinolon/Tetrasiklin. Beri jeda minimal 2 jam di antara kedua obat tersebut.');
    }

    // Antasida / PPI vs Fe / Ketoconazole
    const hasAntacid = names.some(n => n.includes('antasida') || n.includes('sucralfate') || n.includes('omeprazole') || n.includes('lansoprazole'));
    const hasIronOrKeto = names.some(n => n.includes('ferrous') || n.includes('besi') || n.includes('ketoconazole') || n.includes('itraconazole'));
    if (hasAntacid && hasIronOrKeto) {
      warnings.push('⚠️ Jeda Waktu Diperlukan: Antasida/Pengikat asam lambung menurunkan penyerapan Zat Besi/Ketokonazol. Beri jeda minimal 2 jam.');
    }

    // Sucralfate vs Other Oral Drugs
    const hasSucralfate = names.some(n => n.includes('sucralfate'));
    if (hasSucralfate && prescription.length > 1) {
      warnings.push('⚠️ Perhatian Sucralfate: Minum Sucralfate saat perut kosong (1 jam sebelum makan) dan beri jeda 2 jam dengan obat oral lain.');
    }

    return warnings;
  }, [prescription]);

  // Harmonized Meal Clusters for Outpatient Guidance
  const mealClusters = useMemo(() => {
    const periods = [
      {
        id: 'pagi',
        name: 'PAGI HARI (Sarapan Pagi)',
        timeRange: '06:30 - 08:30',
        icon: Sunrise,
        color: 'border-amber-300 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200',
        badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800',
        drugs: prescription.filter(p => p.preferredTimes.some(t => ['06:00', '06:30', '07:00', '08:00', '08:30', '09:00'].includes(t)))
      },
      {
        id: 'siang',
        name: 'SIANG HARI (Makan Siang)',
        timeRange: '11:30 - 13:30',
        icon: Sun,
        color: 'border-sky-300 dark:border-sky-800/80 bg-sky-50/40 dark:bg-sky-950/40 text-sky-950 dark:text-sky-200',
        badgeColor: 'bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-800',
        drugs: prescription.filter(p => p.preferredTimes.some(t => ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'].includes(t)))
      },
      {
        id: 'malam',
        name: 'SORE / MALAM HARI (Makan Malam)',
        timeRange: '17:30 - 19:30',
        icon: Sunset,
        color: 'border-indigo-300 dark:border-indigo-800/80 bg-indigo-50/40 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200',
        badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800',
        drugs: prescription.filter(p => p.preferredTimes.some(t => ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'].includes(t)))
      },
      {
        id: 'tidur',
        name: 'SEBELUM TIDUR MALAM',
        timeRange: '21:00 - 22:30',
        icon: Moon,
        color: 'border-purple-300 dark:border-purple-800/80 bg-purple-50/40 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200',
        badgeColor: 'bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-800',
        drugs: prescription.filter(p => p.preferredTimes.some(t => ['21:00', '21:30', '22:00', '22:30', '23:00', '24:00'].includes(t)))
      }
    ];

    return periods;
  }, [prescription]);

  // Harmonized 24h Specific Slots
  const scheduleTimeline = useMemo(() => {
    const allSlots = [
      { time: '06:30', label: 'Pagi Hari (Sebelum Sarapan / Perut Kosong)', icon: Sunrise },
      { time: '08:00', label: 'Pagi Hari (Saat / Sesudah Sarapan)', icon: Sun },
      { time: '11:30', label: 'Siang Hari (Sebelum Makan Siang)', icon: Sun },
      { time: '13:00', label: 'Siang Hari (Saat / Sesudah Makan Siang)', icon: Sun },
      { time: '17:30', label: 'Sore Hari (Sebelum Makan Malam)', icon: Sunset },
      { time: '19:00', label: 'Malam Hari (Saat / Sesudah Makan Malam)', icon: Sunset },
      { time: '21:00', label: 'Sebelum Tidur Malam', icon: Moon },
      { time: '23:00', label: 'Malam Lanjut (Interval Khusus)', icon: Moon }
    ];

    return allSlots
      .map(slot => {
        const assignedDrugs = prescription.filter(p => p.preferredTimes.includes(slot.time));
        return { ...slot, drugs: assignedDrugs };
      })
      .filter(slot => slot.drugs.length > 0 || ['06:30', '08:00', '13:00', '19:00', '21:00'].includes(slot.time));
  }, [prescription]);

  const handleCopySchedule = () => {
    let text = `📋 *JADWAL HARMONISASI MINUM OBAT PASIEN*\n`;
    text += `Nama Pasien: ${patient.name} (${patient.age} th / ${patient.gender})\n`;
    text += `Tanggal: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}\n\n`;

    mealClusters.forEach(cluster => {
      if (cluster.drugs.length > 0) {
        text += `🔹 *${cluster.name} (${cluster.timeRange})*:\n`;
        cluster.drugs.forEach(d => {
          text += `  • *${d.drug.name}* (${d.dose}) ➔ *${d.foodTiming}* [Jam: ${d.preferredTimes.join(', ')}]\n`;
        });
        text += `\n`;
      }
    });

    if (spacingWarnings.length > 0) {
      text += `⚠️ *Catatan Jeda Waktu Minum*:\n`;
      spacingWarnings.forEach(w => {
        text += `  ${w}\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 3000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200 print:m-0 print:p-0 print:w-full print:max-w-none">
      
      {/* LAYOUT TAMPILAN KHUSUS CETAK 1 HALAMAN (PRINT VIEW ONLY - COLORFUL & BRANDED) */}
      <div className="hidden print:block print:fixed print:inset-0 print:z-[999999] print:bg-white print:p-0 print:m-0 font-sans text-slate-900 space-y-2">
        <style>{`
          @media print {
            html, body {
              background: white !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              overflow: hidden !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              size: A4 portrait;
              margin: 4mm 6mm;
            }
            * {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
          }
        `}</style>

        {/* Header Kop Surat (Warna Menarik Mengikuti Clinic Branding) */}
        <div className="border-b-2 pb-1.5 flex items-center justify-between" style={{ borderColor: clinicBranding?.primaryColor || '#0d9488' }}>
          <div className="flex items-center gap-2">
            {clinicBranding?.logoUrl && (
              <img src={clinicBranding.logoUrl} alt="Logo" className="w-10 h-10 object-contain shrink-0" />
            )}
            <div>
              <h1 className="text-sm font-black uppercase tracking-wider" style={{ color: clinicBranding?.primaryColor || '#0d9488' }}>
                {clinicBranding?.clinicName || 'LEMBAR EVALUASI KLINIS & PENAPISAN POLIFARMASI'}
              </h1>
              <p className="text-[9.5px] text-slate-600 font-bold">
                {clinicBranding?.address || 'Pelayanan Informasi Obat (PIO) & Pengkajian Resep Farmasi Klinis'}
              </p>
            </div>
          </div>
          <div className="text-right text-[8.5px] text-slate-600 font-semibold">
            <p className="font-bold text-slate-900">No. Dokumen: DDI-EVAL-{Date.now().toString().slice(-6)}</p>
            <p>Tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Section 1: Parameter Klinis Pasien (Grid Compact Warna-warni) */}
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-300 text-[9px] grid grid-cols-2 gap-2">
          <div>
            <p><strong>Nama Pasien:</strong> <span className="font-extrabold text-slate-900">{patient.name}</span></p>
            <p><strong>Usia / Gender:</strong> {patient.age} Thn {patient.age >= 65 ? '(Geriatri)' : ''} / {patient.gender}</p>
            <p><strong>BB / TB:</strong> {patient.weightKg} kg / {patient.heightCm} cm • <strong>IMT:</strong> {bmiDetails.bmi} kg/m² ({bmiDetails.status})</p>
            <p><strong>Riwayat Alergi:</strong> <span className="font-bold text-rose-700">{patient.allergies?.join(', ') || 'Tidak Ada'}</span></p>
            <p><strong>Komorbiditas:</strong> {patient.comorbidities.join(', ') || 'Tidak Ada'}</p>
          </div>
          <div>
            <p><strong>Fungsi Ginjal (CrCl):</strong> <span className="font-bold text-teal-800">{patient.enableRenalCheck ? `${patient.crCl} mL/min` : 'Normal (OFF)'}</span></p>
            <p><strong>Fungsi Hati:</strong> <span className="font-bold text-amber-900">{patient.hepaticFunction}</span></p>
            {patient.gender === 'Perempuan' && <p><strong>Status Hamil:</strong> {patient.pregnancyStatus} {patient.isLactating ? '(Menyusui)' : ''}</p>}
            <p><strong>Tanda Vital / Lab:</strong> TD: {patient.systolicBp}/{patient.diastolicBp} mmHg • GDS: {patient.bloodGlucose} mg/dL • K+: {patient.serumPotassium} mmol/L</p>
            <p><strong>Gaya Hidup:</strong> {patient.isSmoker ? 'Perokok' : 'Non-perokok'} • Alkohol: {patient.alcoholConsumer}</p>
          </div>
        </div>

        {/* Section 2: Tabel Resep Obat */}
        <div>
          <h2 className="text-[9.5px] font-extrabold text-teal-950 uppercase tracking-wide border-b border-teal-200 pb-0.5 mb-1">
            1. Daftar Resep & Dosis Pemberian Obat ({prescription.length} Obat):
          </h2>
          <table className="w-full text-[9px] border-collapse border border-slate-300">
            <thead>
              <tr className="bg-teal-700 text-white border-b border-teal-800 font-bold">
                <th className="p-1 border border-teal-800 text-center w-5">No</th>
                <th className="p-1 border border-teal-800 text-left">Nama Obat & Generik</th>
                <th className="p-1 border border-teal-800 text-center">Dosis Sediaan</th>
                <th className="p-1 border border-teal-800 text-center">Frekuensi</th>
                <th className="p-1 border border-teal-800 text-center">Aturan Makan</th>
              </tr>
            </thead>
            <tbody>
              {prescription.map((p, idx) => (
                <tr key={p.id} className="border-b border-slate-200 bg-white">
                  <td className="p-1 border border-slate-300 text-center font-bold text-teal-900">{idx + 1}</td>
                  <td className="p-1 border border-slate-300 font-bold text-slate-900">{p.drug.name} <span className="font-normal text-slate-600">({p.drug.genericName})</span></td>
                  <td className="p-1 border border-slate-300 text-center font-semibold">{p.dose}</td>
                  <td className="p-1 border border-slate-300 text-center font-semibold text-teal-800">{p.frequency}</td>
                  <td className="p-1 border border-slate-300 text-center font-semibold text-amber-900">{p.foodTiming}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: Ringkasan Evaluasi & Jam Minum */}
        <div className="grid grid-cols-2 gap-2 text-[8.5px]">
          <div className="bg-amber-50/70 p-2 rounded-lg border border-amber-200">
            <h3 className="font-bold border-b border-amber-300 pb-0.5 mb-1 uppercase text-amber-950">2. Hasil Skrining Risiko Klinis</h3>
            <p className="mb-0.5 font-bold">Polifarmasi: {polypharmacyStatus.count} Obat ({polypharmacyStatus.badge})</p>
            {polypharmacyStatus.pregnancyAlerts.length > 0 && <p className="text-rose-900 font-bold">• {polypharmacyStatus.pregnancyAlerts[0]}</p>}
            {polypharmacyStatus.hepaticAlerts.length > 0 && <p className="text-amber-900 font-bold">• {polypharmacyStatus.hepaticAlerts[0]}</p>}
            {polypharmacyStatus.renalAlerts.length > 0 && <p className="text-amber-900 font-bold">• {polypharmacyStatus.renalAlerts[0]}</p>}
            {polypharmacyStatus.elderlyAlerts.length > 0 && <p className="text-rose-900 font-bold">• {polypharmacyStatus.elderlyAlerts[0]}</p>}
            {matchedDrugInteractions.length > 0 ? (
              <p className="text-rose-900 font-bold">• Interaksi: {matchedDrugInteractions[0].drugA} ↔ {matchedDrugInteractions[0].drugB} ({matchedDrugInteractions[0].severity})</p>
            ) : (
              <p className="text-emerald-800 font-bold">✅ Bebas Interaksi Obat Berbahaya</p>
            )}
          </div>

          <div className="bg-teal-50/70 p-2 rounded-lg border border-teal-200">
            <h3 className="font-bold border-b border-teal-300 pb-0.5 mb-1 uppercase text-teal-950">3. Jam Pemberian Obat Harian</h3>
            {scheduleTimeline.map((st, i) => (
              st.drugs.length > 0 ? (
                <p key={i} className="mb-0.5 font-medium leading-tight">
                  <strong>Jam {st.time}:</strong> {st.drugs.map(d => `${d.drug.name} (${d.foodTiming})`).join(', ')}
                </p>
              ) : null
            ))}
          </div>
        </div>

        {/* Section 4: Blok Tanda Tangan Resmi Apoteker & Stempel Digital */}
        <div className="pt-1.5 border-t border-slate-300 flex items-end justify-between text-[8.5px] text-slate-600">
          <div>
            <p className="font-bold text-slate-800">Catatan Konseling Apoteker:</p>
            <p className="text-slate-600 text-[8px] max-w-xs leading-tight">Edukasi minum obat teratur & beri jeda waktu antar-obat yang berinteraksi.</p>
          </div>

          <div className="text-center w-40 shrink-0 relative">
            {clinicBranding?.enableDigitalStamp !== false && clinicBranding?.stampUrl && (
              <img 
                src={clinicBranding.stampUrl} 
                alt="Stempel Digital" 
                className="w-14 h-14 object-contain absolute -top-4 right-3 opacity-80 pointer-events-none" 
              />
            )}
            <p className="font-medium text-[8px]">Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="font-bold text-slate-900 text-[8.5px]">Apoteker Penanggung Jawab</p>
            <div className="h-8 flex items-center justify-center italic text-slate-400 text-[8px]">
              ( Tanda Tangan & Stempel Resmi )
            </div>
            <p className="font-bold underline text-slate-900 border-t border-slate-800 pt-0.5 text-[8.5px]">
              {clinicBranding?.pharmacistName || '( apt. Penanggung Jawab, S.Farm. )'}
            </p>
            <p className="text-[7.5px] text-slate-600 font-semibold">{clinicBranding?.pharmacistSipa || 'SIPA: 19940825/SIPA-31.71/2026/2088'}</p>
          </div>
        </div>
      </div>

      {/* TAMPILAN INTERAKTIF LAYAR MONITOR (PRINT HIDDEN) */}
      <div className="space-y-6 print:hidden">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0e172a] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none hidden sm:block">
            <Stethoscope className="w-64 h-64 text-indigo-400 -rotate-12" />
          </div>
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                <Stethoscope className="w-4 h-4 text-indigo-400" />
                <span>Modul Evaluasi Klinis & Penapisan Polifarmasi</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-outfit">
                Evaluasi Klinis & <span className="text-indigo-300">Penapisan Polifarmasi</span> Pasien
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
                Skrining parameter klinis, evaluasi kecocokan dosis, deteksi bahaya polifarmasi, generator jadwal pemberian obat harian, serta interaksi obat dengan makanan & gaya hidup.
              </p>
            </div>

            <div className="flex flex-col items-stretch sm:items-end gap-2.5 shrink-0">
              <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-left sm:text-right shadow-md">
                <span className="text-[11px] text-slate-400 block font-medium">Kriteria Geriatri &amp; Beers:</span>
                <span className="text-base sm:text-lg font-black text-indigo-300">60+ Obat Beers 2023 &amp; STOPP</span>
              </div>
              <button
                onClick={handlePrintReport}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Lembar Evaluasi (1 Halaman)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Case Presets Quick-Load Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-black text-slate-800 dark:text-white">Muat Cepat Contoh Kasus Klinis:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleLoadCasePreset('geriatri')}
              className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-900 dark:text-teal-200 border border-teal-200 dark:border-teal-800 text-xs font-bold transition-colors cursor-pointer"
            >
              🩺 Kasus 1: Geriatri Polifarmasi (6 Obat)
            </button>
            <button
              onClick={() => handleLoadCasePreset('hamil')}
              className="px-3 py-1.5 rounded-xl bg-pink-50 dark:bg-pink-950/50 hover:bg-pink-100 dark:hover:bg-pink-900/60 text-pink-900 dark:text-pink-200 border border-pink-200 dark:border-pink-800 text-xs font-bold transition-colors cursor-pointer"
            >
              🤰 Kasus 2: Kehamilan Trimester 1
            </button>
            <button
              onClick={() => handleLoadCasePreset('cascade')}
              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-colors cursor-pointer"
            >
              ⚠️ Kasus 3: Prescribing Cascade
            </button>
          </div>
        </div>

        {/* Grid Utama 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Kolom Kiri (1/3): Parameter Klinis Pasien */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
                <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Parameter Klinis Pasien</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Profil Pasien
              </span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Identitas Pasien */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Pasien</label>
                <input
                  type="text"
                  value={patient.name}
                  onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white dark:bg-slate-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Usia (Tahun)</label>
                  <input
                    type="number"
                    value={patient.age}
                    onChange={(e) => setPatient({ ...patient, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white dark:bg-slate-950"
                  />
                  {patient.age >= 65 && (
                    <span className="text-[9px] font-black text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-800 mt-1 inline-block">
                      👴 Pasien Geriatri (≥65 th)
                    </span>
                  )}
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jenis Kelamin</label>
                  <select
                    value={patient.gender}
                    onChange={(e) => setPatient({ ...patient, gender: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white dark:bg-slate-950"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Berat Badan (kg)</label>
                  <input
                    type="number"
                    value={patient.weightKg}
                    onChange={(e) => setPatient({ ...patient, weightKg: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    value={patient.heightCm}
                    onChange={(e) => setPatient({ ...patient, heightCm: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white dark:bg-slate-950"
                  />
                </div>
              </div>

              {/* Box Kalkulasi IMT / BMI & Berat Badan Ideal (IBW / ABW) */}
              {bmiDetails.bmi > 0 && (
                <div className="p-3 bg-teal-50/70 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">Indeks Massa Tubuh (IMT):</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${bmiDetails.color}`}>
                      {bmiDetails.bmi} kg/m² • {bmiDetails.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400 pt-0.5 border-t border-teal-200/60 dark:border-teal-800">
                    <span>Berat Badan Ideal (IBW): <strong className="text-slate-900 dark:text-white">{bmiDetails.ibw} kg</strong></span>
                    {patient.weightKg > bmiDetails.ibw && (
                      <span>Adjusted BW (ABW): <strong className="text-slate-900 dark:text-white">{bmiDetails.abw} kg</strong></span>
                    )}
                  </div>
                </div>
              )}

              {/* FITUR RIWAYAT ALERGI OBAT SPESIFIK & ALERGI SILANG */}
              <div className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-950 dark:text-rose-200 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Riwayat Alergi Obat Spesifik</span>
                  </span>
                  <span className="text-[10px] font-black text-rose-700 dark:text-rose-300">
                    {patient.allergies?.length || 0} Terpilih
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 pt-1">
                  {ALLERGY_OPTIONS.map((alg, idx) => {
                    const isSelected = patient.allergies?.includes(alg);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleToggleAllergy(alg)}
                        className={`p-2 rounded-xl text-[10.5px] font-bold text-left transition-all flex items-center justify-between border cursor-pointer ${
                          isSelected
                            ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                            : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-rose-300'
                        }`}
                      >
                        <span className="truncate pr-1">{alg}</span>
                        {isSelected ? <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" /> : <span className="text-slate-300 dark:text-slate-600">+</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fitur ON / OFF Penyesuaian Fungsi Ginjal & Kalkulator Cockcroft-Gault */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-teal-600" />
                    <span>Skrining Penyesuaian Ginjal</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setPatient({ ...patient, enableRenalCheck: !patient.enableRenalCheck })}
                    className={`px-3 py-1 rounded-full font-bold text-[10px] transition-all flex items-center gap-1 cursor-pointer ${
                      patient.enableRenalCheck 
                        ? 'bg-teal-600 text-white shadow-2xs' 
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {patient.enableRenalCheck ? 'ON (Evaluasi Ginjal)' : 'OFF (Normal)'}
                  </button>
                </div>

                {patient.enableRenalCheck ? (
                  <div className="pt-1 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-600 font-medium">Klirens Kreatinin (CrCl):</span>
                      <span className="font-bold text-teal-800">{patient.crCl} mL/min</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="120"
                      value={patient.crCl}
                      onChange={(e) => setPatient({ ...patient, crCl: Number(e.target.value) })}
                      className="w-full accent-teal-600"
                    />
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[10px] text-slate-500 italic">
                        {patient.crCl < 30 ? '🔴 Gangguan Ginjal Berat (CrCl <30)' : patient.crCl < 60 ? '🟡 Gangguan Ginjal Sedang (CrCl 30-59)' : '🟢 Fungsi Ginjal Normal / Ringan (CrCl ≥60)'}
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowCrClCalculator(!showCrClCalculator)}
                        className="text-[10px] font-bold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Calculator className="w-3 h-3" />
                        <span>{showCrClCalculator ? 'Tutup Hitung' : 'Hitung dari SCr'}</span>
                      </button>
                    </div>

                    {showCrClCalculator && (
                      <div className="p-2.5 bg-teal-50/80 rounded-xl border border-teal-200 space-y-1.5 animate-in fade-in">
                        <span className="text-[10px] font-black text-teal-950 block">
                          Kalkulator Cockcroft-Gault Otomatis:
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.1"
                            placeholder="Serum Kreatinin (mg/dL)"
                            value={serumCreatinine}
                            onChange={(e) => setSerumCreatinine(e.target.value)}
                            className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-teal-300 bg-white font-bold"
                          />
                          <button
                            type="button"
                            onClick={handleCalculateCrCl}
                            className="px-3 py-1 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                          >
                            Hitung
                          </button>
                        </div>
                        <span className="text-[9px] text-teal-800 block">
                          Rumus: ((140 - {patient.age}) × {patient.weightKg} kg) / (72 × SCr) {patient.gender === 'Perempuan' ? '× 0.85' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 italic">
                    Fungsi ginjal dianggap Normal (CrCl ≥90 mL/min).
                  </p>
                )}
              </div>

              {/* FUNGSI HATI (Klinis Hepar) & KALKULATOR CHILD-PUGH INTERAKTIF */}
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-amber-950 block text-xs flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-amber-600" />
                    <span>Evaluasi Fungsi Hati (Hepar)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowChildPughCalc(!showChildPughCalc)}
                    className="text-[10px] font-bold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Calculator className="w-3 h-3" />
                    <span>{showChildPughCalc ? 'Tutup' : '⚡ Hitung Child-Pugh'}</span>
                  </button>
                </div>

                <select
                  value={patient.hepaticFunction}
                  onChange={(e) => setPatient({ ...patient, hepaticFunction: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 font-bold text-amber-950 text-xs focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="Normal">Normal (Fungsi Hati Sehat)</option>
                  <option value="Gangguan Ringan (Child-Pugh A)">Gangguan Ringan (Child-Pugh A)</option>
                  <option value="Gangguan Berat (Child-Pugh B/C)">Gangguan Berat (Child-Pugh B/C)</option>
                </select>

                {showChildPughCalc && (
                  <div className="p-3 bg-white rounded-xl border border-amber-300 space-y-2 animate-in fade-in text-[11px]">
                    <span className="font-extrabold text-amber-950 block text-xs">
                      Kalkulator Skor Child-Pugh (5 Kriteria):
                    </span>
                    
                    <div className="space-y-1.5">
                      <div>
                        <label className="font-semibold text-slate-700 block text-[10px]">1. Bilirubin Total</label>
                        <select 
                          value={cpBilirubin} 
                          onChange={(e) => setCpBilirubin(Number(e.target.value))}
                          className="w-full p-1 border rounded bg-slate-50 text-[10.5px]"
                        >
                          <option value={1}>&lt; 2 mg/dL (1 poin)</option>
                          <option value={2}>2 - 3 mg/dL (2 poin)</option>
                          <option value={3}>&gt; 3 mg/dL (3 poin)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block text-[10px]">2. Albumin Serum</label>
                        <select 
                          value={cpAlbumin} 
                          onChange={(e) => setCpAlbumin(Number(e.target.value))}
                          className="w-full p-1 border rounded bg-slate-50 text-[10.5px]"
                        >
                          <option value={1}>&gt; 3.5 g/dL (1 poin)</option>
                          <option value={2}>2.8 - 3.5 g/dL (2 poin)</option>
                          <option value={3}>&lt; 2.8 g/dL (3 poin)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block text-[10px]">3. INR / Waktu Protrombin</label>
                        <select 
                          value={cpInr} 
                          onChange={(e) => setCpInr(Number(e.target.value))}
                          className="w-full p-1 border rounded bg-slate-50 text-[10.5px]"
                        >
                          <option value={1}>INR &lt; 1.7 (1 poin)</option>
                          <option value={2}>INR 1.7 - 2.3 (2 poin)</option>
                          <option value={3}>INR &gt; 2.3 (3 poin)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block text-[10px]">4. Asites</label>
                        <select 
                          value={cpAscites} 
                          onChange={(e) => setCpAscites(Number(e.target.value))}
                          className="w-full p-1 border rounded bg-slate-50 text-[10.5px]"
                        >
                          <option value={1}>Tidak Ada (1 poin)</option>
                          <option value={2}>Ringan / Sedang (2 poin)</option>
                          <option value={3}>Berat / Refrakter (3 poin)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block text-[10px]">5. Ensefalopati Hepatik</label>
                        <select 
                          value={cpEncephalopathy} 
                          onChange={(e) => setCpEncephalopathy(Number(e.target.value))}
                          className="w-full p-1 border rounded bg-slate-50 text-[10.5px]"
                        >
                          <option value={1}>Tidak Ada (1 poin)</option>
                          <option value={2}>Derajat 1 - 2 (2 poin)</option>
                          <option value={3}>Derajat 3 - 4 (3 poin)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCalculateChildPugh}
                      className="w-full mt-2 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Terapkan Hasil Child-Pugh
                    </button>
                  </div>
                )}
              </div>

              {/* Parameter Khusus Pasien Perempuan: Kehamilan & Laktasi */}
              {patient.gender === 'Perempuan' && (
                <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-200 space-y-2">
                  <span className="font-bold text-pink-950 block text-xs flex items-center gap-1.5">
                    <Baby className="w-4 h-4 text-pink-600" />
                    <span>Kehamilan & Menyusui (Maternal)</span>
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-pink-950 block text-[10px] mb-0.5">Status Hamil</label>
                      <select
                        value={patient.pregnancyStatus}
                        onChange={(e) => setPatient({ ...patient, pregnancyStatus: e.target.value as any })}
                        className="w-full px-2 py-1 text-xs border border-pink-200 rounded-lg bg-white font-semibold text-pink-950"
                      >
                        <option value="Tidak Hamil">Tidak Hamil</option>
                        <option value="Trimester 1">Trimester 1 (Bulan 1-3)</option>
                        <option value="Trimester 2">Trimester 2 (Bulan 4-6)</option>
                        <option value="Trimester 3">Trimester 3 (Bulan 7-9)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-pink-950 block text-[10px] mb-0.5">Status Menyusui</label>
                      <button
                        type="button"
                        onClick={() => setPatient({ ...patient, isLactating: !patient.isLactating })}
                        className={`w-full py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          patient.isLactating 
                            ? 'bg-pink-600 text-white border-pink-600' 
                            : 'bg-white text-pink-900 border-pink-200'
                        }`}
                      >
                        {patient.isLactating ? 'Sedang Menyusui' : 'Tidak Menyusui'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FITUR TANDA VITAL & PARAMETER LAB KLINIS (OPSIONAL & COLLAPSIBLE) */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                    <span>Tanda Vital & Parameter Lab</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowVitalsLab(!showVitalsLab)}
                    className="text-[10px] font-bold text-teal-700 hover:underline cursor-pointer"
                  >
                    {showVitalsLab ? 'Sembunyikan' : 'Buka Parameter'}
                  </button>
                </div>

                {showVitalsLab && (
                  <div className="space-y-2.5 pt-2 border-t border-slate-200/80 animate-in fade-in">
                    {/* Tekanan Darah */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold text-slate-600 text-[10px] block">TD Sistolik (mmHg)</label>
                        <input
                          type="number"
                          value={patient.systolicBp || ''}
                          onChange={(e) => setPatient({ ...patient, systolicBp: Number(e.target.value) })}
                          placeholder="misal: 130"
                          className="w-full px-2 py-1 border rounded-lg bg-white text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-600 text-[10px] block">TD Diastolik (mmHg)</label>
                        <input
                          type="number"
                          value={patient.diastolicBp || ''}
                          onChange={(e) => setPatient({ ...patient, diastolicBp: Number(e.target.value) })}
                          placeholder="misal: 85"
                          className="w-full px-2 py-1 border rounded-lg bg-white text-xs font-bold"
                        />
                      </div>
                    </div>

                    {/* Gula Darah & Kalium Serum */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold text-slate-600 text-[10px] block">GDS / GDP (mg/dL)</label>
                        <input
                          type="number"
                          value={patient.bloodGlucose || ''}
                          onChange={(e) => setPatient({ ...patient, bloodGlucose: Number(e.target.value) })}
                          placeholder="misal: 140"
                          className="w-full px-2 py-1 border rounded-lg bg-white text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-600 text-[10px] block">Kalium K+ (mmol/L)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={patient.serumPotassium || ''}
                          onChange={(e) => setPatient({ ...patient, serumPotassium: Number(e.target.value) })}
                          placeholder="misal: 4.2"
                          className="w-full px-2 py-1 border rounded-lg bg-white text-xs font-bold"
                        />
                      </div>
                    </div>

                    {/* Asam Urat */}
                    <div>
                      <label className="font-semibold text-slate-600 text-[10px] block">Asam Urat Serum (mg/dL)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={patient.serumUricAcid || ''}
                        onChange={(e) => setPatient({ ...patient, serumUricAcid: Number(e.target.value) })}
                        placeholder="misal: 6.5"
                        className="w-full px-2 py-1 border rounded-lg bg-white text-xs font-bold"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Komorbiditas & Kondisi Medis Pasien */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="font-bold text-slate-800 block text-[11px] flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Komorbiditas & Riwayat Medis Pasien</span>
                </span>

                <div className="grid grid-cols-2 gap-1.5">
                  {COMORBIDITY_OPTIONS.map((item, idx) => {
                    const checked = patient.comorbidities.includes(item);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleToggleComorbidity(item)}
                        className={`p-2 rounded-xl text-[10.5px] font-bold text-left transition-all flex items-center justify-between border cursor-pointer ${
                          checked 
                            ? 'bg-teal-50 border-teal-300 text-teal-900 shadow-2xs' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate pr-1">{item}</span>
                        {checked && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gaya Hidup & Kebiasaan */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="font-bold text-slate-800 block text-[11px]">Gaya Hidup & Kebiasaan</span>
                
                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    <Cigarette className="w-4 h-4 text-slate-500" />
                    <span>Perokok Aktif</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={patient.isSmoker}
                    onChange={(e) => setPatient({ ...patient, isSmoker: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                  />
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    <Wine className="w-4 h-4 text-slate-500" />
                    <span>Konsumsi Alkohol</span>
                  </span>
                  <select
                    value={patient.alcoholConsumer}
                    onChange={(e) => setPatient({ ...patient, alcoholConsumer: e.target.value as any })}
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-semibold text-slate-800"
                  >
                    <option value="Tidak">Tidak</option>
                    <option value="Kadang-kadang">Kadang-kadang</option>
                    <option value="Rutin">Rutin</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Kolom Kanan (2/3): Resep & Penapisan Polifarmasi */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Status Polifarmasi & Peringatan Risiko */}
            <div className={`p-6 rounded-3xl border ${polypharmacyStatus.color} shadow-xs space-y-3`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Evaluasi Risiko Polifarmasi & Klinis</h3>
                </div>
                <div className="flex items-center gap-2">
                  {polypharmacyStatus.totalAcbScore > 0 && (
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-black border ${
                      polypharmacyStatus.totalAcbScore >= 3 
                        ? 'bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700' 
                        : 'bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800'
                    }`}>
                      Skor ACB: {polypharmacyStatus.totalAcbScore}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 shadow-2xs border border-slate-200 dark:border-slate-700">
                    {polypharmacyStatus.badge}
                  </span>
                </div>
              </div>

              <p className="text-xs leading-relaxed font-medium text-slate-700 dark:text-slate-300">
                Pasien saat ini mengonsumsi <strong className="text-slate-900 dark:text-white">{polypharmacyStatus.count} macam obat</strong>. 
                {polypharmacyStatus.count >= 5 && ' Perlu dilakukan pemantauan ketat terhadap efek samping interaksi obat dan kepatuhan minum obat.'}
              </p>

              {/* Peringatan Alergi, Lab, Kehamilan, Hati, Beers Criteria, Komorbiditas & Cascades */}
              {(polypharmacyStatus.allergyAlerts.length > 0 ||
                polypharmacyStatus.comorbidityAlerts.length > 0 ||
                polypharmacyStatus.labAlerts.length > 0 ||
                polypharmacyStatus.pregnancyAlerts.length > 0 || 
                polypharmacyStatus.hepaticAlerts.length > 0 || 
                polypharmacyStatus.elderlyAlerts.length > 0 || 
                polypharmacyStatus.renalAlerts.length > 0 || 
                polypharmacyStatus.prescribingCascades.length > 0 ||
                polypharmacyStatus.acbAlert) && (
                <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                  
                  {/* ALERGI OBAT & ALERGI SILANG (BAHAYA TINGGI - MERAH MENYALA) */}
                  {polypharmacyStatus.allergyAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-rose-950 dark:text-rose-200 font-black bg-rose-100 dark:bg-rose-950/70 p-2.5 rounded-xl border-2 border-rose-500 shadow-sm animate-pulse">
                      <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}

                  {/* KONTRAINDIKASI KOMORBIDITAS KHUSUS */}
                  {polypharmacyStatus.comorbidityAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-amber-950 dark:text-amber-200 font-bold bg-amber-100/90 dark:bg-amber-950/60 p-2.5 rounded-xl border border-amber-400 dark:border-amber-700 shadow-2xs">
                      <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}

                  {/* HASIL LAB & TANDA VITAL KRITIS */}
                  {polypharmacyStatus.labAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-rose-950 dark:text-rose-200 font-bold bg-rose-50 dark:bg-rose-950/60 p-2.5 rounded-xl border border-rose-300 dark:border-rose-800 shadow-2xs">
                      <Activity className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}

                  {/* Kehamilan */}
                  {polypharmacyStatus.pregnancyAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-rose-950 dark:text-rose-200 font-bold bg-rose-50/90 dark:bg-rose-950/60 p-2.5 rounded-xl border border-rose-300 dark:border-rose-800 shadow-2xs">
                      <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}

                  {/* Hepar */}
                  {polypharmacyStatus.hepaticAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-amber-950 dark:text-amber-200 font-bold bg-amber-50/90 dark:bg-amber-950/60 p-2.5 rounded-xl border border-amber-300 dark:border-amber-800 shadow-2xs">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}

                  {/* Beers Criteria 2023 Lansia */}
                  {polypharmacyStatus.elderlyAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-rose-950 dark:text-rose-200 font-bold bg-rose-50/90 dark:bg-rose-950/60 p-2 rounded-xl border border-rose-200 dark:border-rose-800">
                      <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}

                  {/* Beban Antikolinergik ACB */}
                  {polypharmacyStatus.acbAlert && (
                    <div className="flex items-start gap-1.5 text-purple-950 dark:text-purple-200 font-bold bg-purple-50/90 dark:bg-purple-950/60 p-2.5 rounded-xl border border-purple-200 dark:border-purple-800">
                      <ShieldAlert className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                      <span>{polypharmacyStatus.acbAlert}</span>
                    </div>
                  )}

                  {/* Prescribing Cascades */}
                  {polypharmacyStatus.prescribingCascades.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-indigo-950 dark:text-indigo-200 font-bold bg-indigo-50/90 dark:bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800">
                      <RotateCcw className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}

                  {/* Ginjal */}
                  {polypharmacyStatus.renalAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-amber-950 dark:text-amber-200 font-bold bg-amber-50/90 dark:bg-amber-950/60 p-2.5 rounded-xl border border-amber-300 dark:border-amber-800">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Tambah Obat & Daftar Resep Pasien */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
                  <Pill className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span>Resep / Daftar Obat Pasien</span>
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Total: {prescription.length} Obat
                </span>
              </div>

              {/* Input Form Tambah Obat */}
              <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                
                {/* Search Bar Obat Cepat & Kategori Chips */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block text-xs">
                      🔍 Cari & Pilih Nama Obat ({filteredDrugsList.length} Ditemukan)
                    </label>
                    {drugSearchTerm && (
                      <button
                        type="button"
                        onClick={() => setDrugSearchTerm('')}
                        className="text-[10px] text-rose-600 dark:text-rose-400 hover:underline font-bold cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>

                  {/* Kategori Filter Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[10px]">
                    {['Semua', 'Maag / PPI', 'Antihipertensi', 'Antidiabetes', 'Kalsium & Vitamin', 'Antibiotik', 'Analgesik', 'Kolesterol'].map((cat, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors cursor-pointer ${
                          selectedCategoryFilter === cat
                            ? 'bg-teal-700 text-white shadow-2xs'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Input with Live Suggestions Dropdown */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-teal-600 dark:text-teal-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Ketik nama obat (misal: Omeprazole, Kalsium, Amlodipine, Metformin)..."
                      value={drugSearchTerm}
                      onFocus={() => setIsDrugDropdownOpen(true)}
                      onChange={(e) => {
                        setDrugSearchTerm(e.target.value);
                        setIsDrugDropdownOpen(true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && filteredDrugsList.length > 0) {
                          e.preventDefault();
                          const firstDrug = filteredDrugsList[0];
                          setSelectedDrugId(firstDrug.id);
                          setDrugSearchTerm(firstDrug.name);
                          setIsDrugDropdownOpen(false);
                          setIsManualDoseInput(false);
                        }
                      }}
                      className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-950 shadow-xs text-xs"
                    />
                    {drugSearchTerm && (
                      <button
                        type="button"
                        onClick={() => setDrugSearchTerm('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 cursor-pointer font-bold"
                      >
                        ✕
                      </button>
                    )}

                    {/* Floating Suggestion Popover */}
                    {isDrugDropdownOpen && filteredDrugsList.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-teal-500/40 shadow-2xl z-50 max-h-64 overflow-y-auto p-1.5 space-y-1">
                        <div className="px-2 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <span>Hasil Pencarian ({filteredDrugsList.length} Obat):</span>
                          <span>Klik obat untuk memilih</span>
                        </div>
                        {filteredDrugsList.slice(0, 15).map((d) => {
                          const isSelected = d.id === selectedDrugId;
                          const profile = getDrugClinicalProfile(d.name + ' ' + (d.genericName || ''));
                          return (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => {
                                setSelectedDrugId(d.id);
                                setDrugSearchTerm(d.name);
                                setIsDrugDropdownOpen(false);
                                setIsManualDoseInput(false);
                              }}
                              className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
                                isSelected
                                  ? 'bg-teal-600 text-white font-bold'
                                  : 'hover:bg-teal-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-xs">{d.name}</span>
                                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                  }`}>
                                    {d.genericName}
                                  </span>
                                </div>
                                <span className={`text-[10px] block ${isSelected ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                  {d.category} {profile ? `• Dosis: ${profile.defaultStrength} • ${profile.defaultTiming}` : ''}
                                </span>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg shrink-0 ${
                                isSelected ? 'bg-white text-teal-900' : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                              }`}>
                                Pilih
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Obat Aktif Terpilih */}
                {currentDrug && (
                  <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-700/60 text-[11px] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-teal-600 text-white">
                        <Pill className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <span className="font-extrabold text-teal-950 dark:text-teal-200">{currentDrug.name}</span>
                        <span className="text-teal-800 dark:text-teal-300 font-medium"> ({currentDrug.genericName})</span>
                        <span className="text-teal-700 dark:text-teal-400 font-bold block text-[10px]">Golongan: {currentDrug.category}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-teal-700 text-white text-[10px] font-black shrink-0">
                      Aktif Dipilih
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {/* Dosis Sediaan Disesuaikan Presisi (Dropdown / Custom Input) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300 block">Dosis Sediaan Obat</label>
                      <button
                        type="button"
                        onClick={() => setIsManualDoseInput(!isManualDoseInput)}
                        className="text-[10px] text-teal-700 dark:text-teal-400 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{isManualDoseInput ? 'Pilihan' : 'Ketik Manual'}</span>
                      </button>
                    </div>

                    {!isManualDoseInput ? (
                      <select
                        value={customDose}
                        onChange={(e) => setCustomDose(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-950"
                      >
                        {availableDosages.map((ds, idx) => (
                          <option key={idx} value={ds}>{ds}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={customDose}
                        onChange={(e) => setCustomDose(e.target.value)}
                        placeholder="misal: 500 mg"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-950"
                      />
                    )}
                  </div>

                  {/* Frekuensi Dropdown */}
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Frekuensi Pemberian</label>
                    <select
                      value={customFreqLabel}
                      onChange={(e) => setCustomFreqLabel(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-950 text-[11px]"
                    >
                      {FREQUENCY_OPTIONS.map((f, idx) => (
                        <option key={idx} value={f.label}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Waktu Minum Terhadap Makanan */}
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Waktu Minum Terhadap Makanan</label>
                    <select
                      value={customTiming}
                      onChange={(e) => setCustomTiming(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-950"
                    >
                      <option value="Sesudah Makan">Sesudah Makan</option>
                      <option value="Sebelum Makan">Sebelum Makan (30-60 menit)</option>
                      <option value="Bersama Makanan">Bersama Makanan / Sesaat Setelah Makan</option>
                      <option value="Perut Kosong">Perut Kosong (1 jam sebelum / 2 jam sesudah makan)</option>
                      <option value="Bebas">Bebas / Bebas Jam</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-1">
                  <button
                    onClick={handleAddDrug}
                    className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambahkan Obat Ini ke Resep Pasien</span>
                  </button>
                </div>

                {/* Banner Rekomendasi Otomatis Klinis (Auto-Fill Insight) */}
                {clinicalAutoHint && (
                  <div className="p-2.5 rounded-xl bg-teal-50/80 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 text-[11px] text-teal-950 dark:text-teal-200 font-medium flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-teal-900 dark:text-teal-300">💡 Rekomendasi Otomatis Farmakoterapi: </span>
                      <span>{clinicalAutoHint}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* List Resep Pasien */}
              <div className="space-y-2.5 text-xs">
                {prescription.map((p, idx) => (
                  <div key={p.id} className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-500/50 flex items-center justify-between gap-3 shadow-2xs transition-all">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-black flex items-center justify-center text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{p.drug.name}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                          Generik: {p.drug.genericName} • Golongan: {p.drug.category}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded-md text-[10px]">
                            Dosis: {p.dose}
                          </span>
                          <span className="bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-bold px-2 py-0.5 rounded-md text-[10px]">
                            {p.frequency}
                          </span>
                          <span className="bg-amber-50 dark:bg-amber-950/60 font-bold text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-md text-[10px] flex items-center gap-1">
                            <Utensils className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            <span>{p.foodTiming}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveDrug(p.id)}
                      className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors shrink-0 cursor-pointer"
                      title="Hapus dari resep"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* SECTION: Generator Jadwal & Waktu Pemberian Obat Harian */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-base">
                <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Generator Jadwal & Waktu Pemberian Obat Harian (24 Jam Harmonized)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Harmonisasi jadwal minum obat presisi disesuaikan dengan waktu makan (Sebelum/Bersama/Sesudah Makan & Sebelum Tidur).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Tab Selector Mode Tampilan */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setScheduleViewMode('meal')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    scheduleViewMode === 'meal'
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  🍱 Waktu Makan (Paling Disukai Pasien)
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleViewMode('timeline')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    scheduleViewMode === 'timeline'
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  ⏰ Garis Waktu 24 Jam
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleViewMode('table')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    scheduleViewMode === 'table'
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  📋 Tabel Etiket
                </button>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={handleCopySchedule}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copiedSchedule ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSchedule ? 'Tersalin!' : 'Salin ke WA Pasien'}</span>
              </button>
            </div>
          </div>

          {/* Peringatan Jeda Waktu Minum (Spaced Administration Conflicts) */}
          {spacingWarnings.length > 0 && (
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-amber-950 font-black">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Peringatan Jeda Waktu Minum Obat (Physical & Absorption Separation):</span>
              </div>
              <div className="space-y-1 pl-5">
                {spacingWarnings.map((warn, i) => (
                  <p key={i} className="text-amber-900 font-semibold leading-relaxed">
                    {warn}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* TAMPILAN 1: BERDASARKAN WAKTU MAKAN (PAGI - SIANG - MALAM - SEBELUM TIDUR) */}
          {scheduleViewMode === 'meal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {mealClusters.map((cluster) => {
                const IconComp = cluster.icon;
                return (
                  <div 
                    key={cluster.id} 
                    className={`p-4 rounded-3xl border ${cluster.color} space-y-3 flex flex-col justify-between shadow-xs`}
                  >
                    <div>
                      {/* Header Periode */}
                      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2.5">
                        <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-sm">
                          <span className="p-1.5 rounded-xl bg-white dark:bg-slate-900 shadow-2xs border border-slate-200 dark:border-slate-800">
                            <IconComp className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                          </span>
                          <span className="truncate">{cluster.name.split(' ')[0]}</span>
                        </div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${cluster.badgeColor}`}>
                          {cluster.timeRange}
                        </span>
                      </div>

                      {/* Daftar Obat Pada Periode Ini */}
                      <div className="space-y-2 pt-3">
                        {cluster.drugs.length > 0 ? (
                          cluster.drugs.map((d) => (
                            <div 
                              key={d.id} 
                              className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1.5 hover:border-teal-400 dark:hover:border-teal-500/50 transition-all"
                            >
                              <div className="flex items-start justify-between gap-1">
                                <div>
                                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">{d.drug.name}</h4>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{d.drug.genericName}</p>
                                </div>
                                <span className="bg-slate-100 dark:bg-slate-800 font-black text-slate-800 dark:text-slate-200 text-[10px] px-1.5 py-0.5 rounded-md shrink-0">
                                  {d.dose}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-lg border ${
                                  d.foodTiming === 'Sebelum Makan' || d.foodTiming === 'Perut Kosong'
                                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                                    : d.foodTiming === 'Bersama Makanan'
                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                                    : 'bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 border-teal-200 dark:border-teal-800'
                                }`}>
                                  🍽️ {d.foodTiming}
                                </span>

                                <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                  ⏰ Jam: {d.preferredTimes.join(', ')}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-8 text-center text-slate-400 dark:text-slate-500 italic text-xs">
                            <span className="block mb-1">🌿</span>
                            Tidak ada obat pada waktu ini
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] text-slate-500 dark:text-slate-400 font-semibold border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                      <span>Total Obat:</span>
                      <span className="font-black text-slate-800 dark:text-slate-200">{cluster.drugs.length} Obat</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAMPILAN 2: GARIS WAKTU 24 JAM */}
          {scheduleViewMode === 'timeline' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {scheduleTimeline.map((slot, idx) => {
                const IconComp = slot.icon;
                return (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white text-sm">
                          <IconComp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          <span>{slot.time}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate max-w-[120px]" title={slot.label}>
                          {slot.label}
                        </span>
                      </div>

                      <div className="space-y-2 pt-2">
                        {slot.drugs.length > 0 ? (
                          slot.drugs.map((d) => (
                            <div key={d.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
                              <p className="font-extrabold text-slate-900 dark:text-white">{d.drug.name}</p>
                              <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">{d.dose}</p>
                              <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                {d.foodTiming}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 italic text-center py-4">
                            Bebas obat pada jam ini
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAMPILAN 3: TABEL ETIKET & JADWAL PASIEN */}
          {scheduleViewMode === 'table' && (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-teal-700 dark:bg-teal-900 text-white font-bold">
                    <th className="p-3 border-r border-teal-800 dark:border-teal-950">Nama Obat</th>
                    <th className="p-3 border-r border-teal-800 dark:border-teal-950 text-center">Dosis</th>
                    <th className="p-3 border-r border-teal-800 dark:border-teal-950 text-center">Aturan Makan</th>
                    <th className="p-3 border-r border-teal-800 dark:border-teal-950 text-center bg-amber-600/60 dark:bg-amber-900/60">Pagi (07:00-08:00)</th>
                    <th className="p-3 border-r border-teal-800 dark:border-teal-950 text-center bg-sky-600/60 dark:bg-sky-900/60">Siang (12:00-13:00)</th>
                    <th className="p-3 border-r border-teal-800 dark:border-teal-950 text-center bg-indigo-600/60 dark:bg-indigo-900/60">Malam (18:30-19:30)</th>
                    <th className="p-3 text-center bg-purple-700 dark:bg-purple-900">Sebelum Tidur (21:00)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-semibold">
                  {prescription.map((p) => {
                    const isPagi = p.preferredTimes.some(t => ['06:00', '06:30', '07:00', '08:00', '08:30'].includes(t));
                    const isSiang = p.preferredTimes.some(t => ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'].includes(t));
                    const isMalam = p.preferredTimes.some(t => ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'].includes(t));
                    const isTidur = p.preferredTimes.some(t => ['21:00', '21:30', '22:00', '22:30', '23:00', '24:00'].includes(t));

                    return (
                      <tr key={p.id} className="hover:bg-teal-50/50 dark:hover:bg-slate-800/60">
                        <td className="p-3 border-r border-slate-100 dark:border-slate-800">
                          <span className="font-extrabold text-slate-900 dark:text-white block">{p.drug.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{p.drug.genericName}</span>
                        </td>
                        <td className="p-3 border-r border-slate-100 dark:border-slate-800 text-center font-bold text-slate-700 dark:text-slate-200">{p.dose}</td>
                        <td className="p-3 border-r border-slate-100 dark:border-slate-800 text-center">
                          <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[10px] font-bold">
                            {p.foodTiming}
                          </span>
                        </td>
                        <td className="p-3 border-r border-slate-100 dark:border-slate-800 text-center">
                          {isPagi ? (
                            <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-black text-xs border border-amber-300 dark:border-amber-800">
                              ✅ Minum
                            </span>
                          ) : (
                            <span className="text-slate-300 dark:text-slate-600">-</span>
                          )}
                        </td>
                        <td className="p-3 border-r border-slate-100 dark:border-slate-800 text-center">
                          {isSiang ? (
                            <span className="px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-200 font-black text-xs border border-sky-300 dark:border-sky-800">
                              ✅ Minum
                            </span>
                          ) : (
                            <span className="text-slate-300 dark:text-slate-600">-</span>
                          )}
                        </td>
                        <td className="p-3 border-r border-slate-100 dark:border-slate-800 text-center">
                          {isMalam ? (
                            <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 font-black text-xs border border-indigo-300 dark:border-indigo-800">
                              ✅ Minum
                            </span>
                          ) : (
                            <span className="text-slate-300 dark:text-slate-600">-</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {isTidur ? (
                            <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 font-black text-xs border border-purple-300 dark:border-purple-800">
                              ✅ Minum
                            </span>
                          ) : (
                            <span className="text-slate-300 dark:text-slate-600">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SECTION: Interaksi Obat dengan Makanan, Minuman & Gaya Hidup */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
              <Utensils className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>Interaksi Obat dengan Makanan, Minuman & Gaya Hidup</span>
            </div>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              Penyesuaian Nutrisi Pasien
            </span>
          </div>

          {lifestyleInteractions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {lifestyleInteractions.map((item, idx) => (
                <div key={idx} className="bg-amber-50/60 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">{item.drugName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                      Kategori: {item.category}
                    </span>
                  </div>
                  <p className="text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-950/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-xs italic">
              Tidak ditemukan bahaya interaksi obat spesifik dengan makanan/minuman/rokok untuk resep saat ini.
            </div>
          )}
        </div>

        {/* SECTION: Interaksi Antar Obat (Drug-Drug Interactions) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
              <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span>Deteksi Interaksi Antar Obat (Drug-Drug Interactions)</span>
            </div>
            <span className="text-xs font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
              {matchedDrugInteractions.length} Interaksi Terdeteksi
            </span>
          </div>

          {matchedDrugInteractions.length > 0 ? (
            <div className="space-y-3 text-xs">
              {matchedDrugInteractions.map((inter, idx) => (
                <div key={idx} className="p-4 bg-rose-50/60 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-rose-950 dark:text-rose-200 text-sm">
                      {inter.drugA} ↔ {inter.drugB}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100">
                      Tingkat Keparahan: {inter.severity}
                    </span>
                  </div>
                  <p className="text-rose-900 dark:text-rose-300 font-medium leading-relaxed">
                    {inter.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-950/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              ✅ Tidak terdeteksi kontraindikasi / interaksi obat berbahaya antar obat yang ada dalam resep ini.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
