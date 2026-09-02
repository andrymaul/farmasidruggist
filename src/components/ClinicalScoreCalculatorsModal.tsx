import React, { useState } from 'react';
import {
  X,
  Calculator,
  Heart,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Stethoscope,
  Info,
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  Pill,
  Zap,
  RotateCcw,
  Brain
} from 'lucide-react';
import { Drug } from '../types';

export type CalculatorType =
  | 'ascvd'
  | 'cha2ds2vasc'
  | 'curb65'
  | 'childpugh'
  | 'qsofa'
  | 'map'
  | 'egfr'
  | 'pediatric-dehydration'
  | 'hba1c-eag'
  | 'holliday-segar'
  | 'act-asthma'
  | 'phq9'
  | 'bishop'
  | 'srq20';

interface ClinicalScoreCalculatorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCalculator?: CalculatorType;
  allDrugs?: Drug[];
  onCheckInteractionsWithRegimen?: (drugNames: string[]) => void;
}

export const ClinicalScoreCalculatorsModal: React.FC<ClinicalScoreCalculatorsModalProps> = ({
  isOpen,
  onClose,
  initialCalculator = 'ascvd',
  allDrugs = [],
  onCheckInteractionsWithRegimen
}) => {
  const [activeTab, setActiveTab] = useState<CalculatorType>(initialCalculator);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. ASCVD State
  const [ascvdAge, setAscvdAge] = useState<number>(55);
  const [ascvdGender, setAscvdGender] = useState<'male' | 'female'>('male');
  const [ascvdSbp, setAscvdSbp] = useState<number>(140);
  const [ascvdSmoker, setAscvdSmoker] = useState<boolean>(false);
  const [ascvdTotalChol, setAscvdTotalChol] = useState<number>(220);
  const [ascvdHdl, setAscvdHdl] = useState<number>(45);
  const [ascvdDiabetes, setAscvdDiabetes] = useState<boolean>(false);
  const [ascvdHtnMeds, setAscvdHtnMeds] = useState<boolean>(true);
  const [ascvdKnownCad, setAscvdKnownCad] = useState<boolean>(false);

  // 2. CHA2DS2-VASc State
  const [chaAge, setChaAge] = useState<number>(68);
  const [chaGender, setChaGender] = useState<'male' | 'female'>('male');
  const [chaChf, setChaChf] = useState<boolean>(false);
  const [chaHtn, setChaHtn] = useState<boolean>(true);
  const [chaStroke, setChaStroke] = useState<boolean>(false);
  const [chaVasc, setChaVasc] = useState<boolean>(false);
  const [chaDm, setChaDm] = useState<boolean>(false);

  // 3. CURB-65 State
  const [curbC, setCurbC] = useState<boolean>(false);
  const [curbU, setCurbU] = useState<boolean>(false);
  const [curbR, setCurbR] = useState<boolean>(false);
  const [curbB, setCurbB] = useState<boolean>(false);
  const [curb65Age, setCurb65Age] = useState<boolean>(false);

  // 4. Child-Pugh State
  const [cpBilirubin, setCpBilirubin] = useState<number>(1.5);
  const [cpAlbumin, setCpAlbumin] = useState<number>(3.2);
  const [cpInr, setCpInr] = useState<number>(1.4);
  const [cpAscites, setCpAscites] = useState<'none' | 'slight' | 'moderate'>('slight');
  const [cpEncephalopathy, setCpEncephalopathy] = useState<'none' | 'grade1-2' | 'grade3-4'>('none');

  // 5. qSOFA State
  const [qsofaRr, setQsofaRr] = useState<boolean>(true);
  const [qsofaGcs, setQsofaGcs] = useState<boolean>(false);
  const [qsofaSbp, setQsofaSbp] = useState<boolean>(true);

  // 6. MAP State
  const [mapSbp, setMapSbp] = useState<number>(200);
  const [mapDbp, setMapDbp] = useState<number>(115);

  // 7. eGFR & CrCl State
  const [gfrAge, setGfrAge] = useState<number>(60);
  const [gfrGender, setGfrGender] = useState<'male' | 'female'>('male');
  const [gfrWeight, setGfrWeight] = useState<number>(65);
  const [gfrScr, setGfrScr] = useState<number>(1.4);

  // 8. Pediatric Dehydration State
  const [pedCondition, setPedCondition] = useState<'well' | 'irritable' | 'lethargic'>('irritable');
  const [pedEyes, setPedEyes] = useState<'normal' | 'sunken'>('sunken');
  const [pedThirst, setPedThirst] = useState<'normal' | 'thirsty' | 'unable'>('thirsty');
  const [pedSkinTurgor, setPedSkinTurgor] = useState<'normal' | 'slow' | 'very_slow'>('slow');

  // 9. HbA1c to eAG State
  const [hba1cVal, setHba1cVal] = useState<number>(8.2);

  // 10. Holliday-Segar State
  const [hsWeight, setHsWeight] = useState<number>(14);

  // 11. ACT (Asthma Control Test) State
  const [actQ1, setActQ1] = useState<number>(4);
  const [actQ2, setActQ2] = useState<number>(3);
  const [actQ3, setActQ3] = useState<number>(4);
  const [actQ4, setActQ4] = useState<number>(3);
  const [actQ5, setActQ5] = useState<number>(4);

  // 12. PHQ-9 State
  const [phqScores, setPhqScores] = useState<number[]>([1, 2, 2, 1, 1, 0, 1, 0, 0]);

  // 13. Bishop Score State
  const [bishopDilatation, setBishopDilatation] = useState<number>(1);
  const [bishopEffacement, setBishopEffacement] = useState<number>(1);
  const [bishopStation, setBishopStation] = useState<number>(1);
  const [bishopConsistency, setBishopConsistency] = useState<number>(1);
  const [bishopPosition, setBishopPosition] = useState<number>(1);

  // 14. SRQ-20 State
  const [srqScores, setSrqScores] = useState<number[]>(Array(20).fill(0));

  if (!isOpen) return null;

  const calculatorsList = [
    {
      id: 'ascvd',
      name: 'Risiko ASCVD 10-Tahun & Target Kolesterol LDL',
      category: 'Kardiovaskular',
      badge: 'PERKI 2023 / ACC-AHA',
      icon: Heart,
      color: 'from-rose-500 to-red-600',
      description: 'Menghitung estimasi risiko serangan jantung/stroke 10 tahun dan menentukan dosis Statin serta target LDL.'
    },
    {
      id: 'cha2ds2vasc',
      name: 'Skor CHA₂DS₂-VASc & HAS-BLED',
      category: 'Kardiovaskular',
      badge: 'Fibrilasi Atrium',
      icon: Activity,
      color: 'from-blue-500 to-indigo-600',
      description: 'Menentukan indikasi antikoagulan DOAC/Warfarin dan risiko perdarahan pada Fibrilasi Atrium.'
    },
    {
      id: 'curb65',
      name: 'Skor CURB-65 Pneumonia Dewasa',
      category: 'Respirasi & Paru',
      badge: 'CAP Severity',
      icon: Stethoscope,
      color: 'from-cyan-500 to-blue-600',
      description: 'Menentukan stratifikasi keparahan pneumonia dan tempat rawat inap vs rawat jalan.'
    },
    {
      id: 'childpugh',
      name: 'Skor Child-Pugh & Derajat Sirosis Hepar',
      category: 'Gastrointestinal',
      badge: 'Hepatologi',
      icon: Layers,
      color: 'from-amber-500 to-orange-600',
      description: 'Menilai keparahan disfungsi hati pada sirosis untuk penyesuaian dosis obat metabolik hepar.'
    },
    {
      id: 'qsofa',
      name: 'Skor qSOFA (Quick SOFA Sepsis)',
      category: 'Kedaruratan & Infeksi',
      badge: 'Hour-1 Sepsis',
      icon: AlertTriangle,
      color: 'from-emerald-500 to-teal-600',
      description: 'Skrining cepat disfungsi organ pada kecurigaan sepsis di IGD dan faskes primer.'
    },
    {
      id: 'map',
      name: 'Mean Arterial Pressure (MAP) & Target Krisis Hipertensi',
      category: 'Kardiovaskular',
      badge: 'Krisis Hipertensi',
      icon: Zap,
      color: 'from-violet-500 to-purple-600',
      description: 'Menghitung tekanan arteri rata-rata dan batas aman penurunan tensi 20-25% pada jam pertama.'
    },
    {
      id: 'egfr',
      name: 'Cockcroft-Gault CrCl & eGFR CKD-EPI',
      category: 'Ginjal & Dosis',
      badge: 'Renal Function',
      icon: Calculator,
      color: 'from-teal-500 to-emerald-600',
      description: 'Menghitung fungsi ginjal dan memandu penyesuaian dosis obat nefrotoksik/klirens ginjal.'
    },
    {
      id: 'pediatric-dehydration',
      name: 'Derajat Dehidrasi Diare Anak (WHO / Kemenkes)',
      category: 'Pediatri',
      badge: 'Lintas Diare',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-600',
      description: 'Menentukan Rencana Terapi A (Oralit Rumah), B (Oralit 75 mL/kg), atau C (Infus RL Segera).'
    },
    {
      id: 'hba1c-eag',
      name: 'Konversi HbA1c ke Rata-Rata Glukosa (eAG)',
      category: 'Endokrin',
      badge: 'Diabetes Melitus',
      icon: Activity,
      color: 'from-emerald-500 to-green-600',
      description: 'Mengubah persentase HbA1c menjadi perkiraan angka rata-rata gula darah harian (mg/dL).'
    },
    {
      id: 'holliday-segar',
      name: 'Kebutuhan Cairan Rumatan Anak (Holliday-Segar)',
      category: 'Pediatri',
      badge: 'Cairan Pediatrik',
      icon: Layers,
      color: 'from-sky-500 to-indigo-600',
      description: 'Menghitung volume cairan rumatan 24 jam dan tetesan infus per jam berbasis berat badan.'
    },
    {
      id: 'act-asthma',
      name: 'Asthma Control Test (ACT)',
      category: 'Respirasi & Paru',
      badge: 'GINA 2024',
      icon: Stethoscope,
      color: 'from-teal-500 to-cyan-600',
      description: 'Menilai tingkat kendali asma pasien untuk menaikkan/menurunkan Step inhaler.'
    },
    {
      id: 'phq9',
      name: 'Kuesioner Skrining Depresi (PHQ-9)',
      category: 'Kesehatan Jiwa',
      badge: 'Depresi Klinis',
      icon: Heart,
      color: 'from-indigo-500 to-purple-600',
      description: 'Skrining keparahan depresi 9 item untuk memandu inisiasi antidepresan SSRI.'
    },
    {
      id: 'srq20',
      name: 'Kuesioner Kesehatan Jiwa (SRQ-20)',
      category: 'Kesehatan Jiwa',
      badge: 'WHO / Kemenkes RI',
      icon: Brain,
      color: 'from-teal-500 to-emerald-600',
      description: 'Skrining Gangguan Mental Emosional (GME: cemas, depresi, somatisasi 30 hari terakhir) standar Kemenkes RI.'
    },
    {
      id: 'bishop',
      name: 'Bishop Score (Kematangan Serviks Persalinan)',
      category: 'Kebidanan',
      badge: 'Induksi Persalinan',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600',
      description: 'Menilai kesiapan serviks (skor >= 6 siap oksitosin vs < 6 butuh pematangan misoprostol).'
    }
  ];

  const filteredCalculators = calculatorsList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==========================================
  // CALCULATIONS
  // ==========================================

  // 1. ASCVD Calculation
  const calculateAscvd = () => {
    if (ascvdKnownCad) {
      return {
        riskCategory: 'Risiko Sangat Tinggi (ASCVD Sekunder Terbukti)',
        riskPercent: '>= 20% (Kategori Sangat Tinggi / Ekstrem)',
        statinIntensity: 'Statin Intensitas Tinggi (High-Intensity Statin)',
        recommendedDrugs: ['Atorvastatin 40-80 mg', 'Rosuvastatin 20-40 mg'],
        targetLdl: '< 55 mg/dL (dan penurunan >= 50% dari basal)',
        alertColor: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30'
      };
    }

    let points = 0;
    if (ascvdAge >= 70) points += 5;
    else if (ascvdAge >= 60) points += 4;
    else if (ascvdAge >= 50) points += 3;
    else if (ascvdAge >= 40) points += 1;

    if (ascvdGender === 'male') points += 2;
    if (ascvdSmoker) points += 3;
    if (ascvdDiabetes) points += 3;
    if (ascvdSbp >= 160) points += 3;
    else if (ascvdSbp >= 140) points += 2;
    else if (ascvdSbp >= 130) points += 1;
    if (ascvdHtnMeds) points += 1;
    if (ascvdTotalChol >= 240) points += 3;
    else if (ascvdTotalChol >= 200) points += 2;
    if (ascvdHdl < 40) points += 2;
    else if (ascvdHdl >= 60) points -= 1;

    let riskPercent = Math.min(Math.max(points * 1.8, 1.5), 45);

    if (riskPercent >= 20 || ascvdDiabetes) {
      return {
        riskCategory: 'Risiko Tinggi (High Risk >= 20%)',
        riskPercent: `${riskPercent.toFixed(1)}% Risiko 10-Tahun`,
        statinIntensity: 'Statin Intensitas Tinggi (High-Intensity Statin)',
        recommendedDrugs: ['Atorvastatin 40 mg', 'Rosuvastatin 20 mg'],
        targetLdl: '< 70 mg/dL (atau < 55 mg/dL bila ada diabetes + komorbid)',
        alertColor: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30'
      };
    } else if (riskPercent >= 7.5) {
      return {
        riskCategory: 'Risiko Menengah (Intermediate Risk 7.5 - 19.9%)',
        riskPercent: `${riskPercent.toFixed(1)}% Risiko 10-Tahun`,
        statinIntensity: 'Statin Intensitas Sedang (Moderate-Intensity Statin)',
        recommendedDrugs: ['Atorvastatin 20 mg', 'Simvastatin 20-40 mg', 'Rosuvastatin 10 mg'],
        targetLdl: '< 100 mg/dL (target penurunan LDL 30-49%)',
        alertColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
      };
    } else if (riskPercent >= 5.0) {
      return {
        riskCategory: 'Risiko Borderline (5.0 - 7.4%)',
        riskPercent: `${riskPercent.toFixed(1)}% Risiko 10-Tahun`,
        statinIntensity: 'Pertimbangkan Statin Intensitas Sedang jika ada faktor penguat',
        recommendedDrugs: ['Simvastatin 20 mg', 'Atorvastatin 10 mg'],
        targetLdl: '< 100 mg/dL',
        alertColor: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30'
      };
    } else {
      return {
        riskCategory: 'Risiko Rendah (< 5.0%)',
        riskPercent: `${riskPercent.toFixed(1)}% Risiko 10-Tahun`,
        statinIntensity: 'Gaya Hidup Sehat (Diet Mediterania Rendah Lemak & Olahraga)',
        recommendedDrugs: ['Edukasi Diet Jantung Sehat'],
        targetLdl: '< 116 mg/dL',
        alertColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
      };
    }
  };

  // 2. CHA2DS2-VASc Calculation
  const calculateCha2ds2Vasc = () => {
    let score = 0;
    if (chaChf) score += 1;
    if (chaHtn) score += 1;
    if (chaAge >= 75) score += 2;
    else if (chaAge >= 65) score += 1;
    if (chaDm) score += 1;
    if (chaStroke) score += 2;
    if (chaVasc) score += 1;
    if (chaGender === 'female') score += 1;

    const threshold = chaGender === 'male' ? 2 : 3;
    const isIndicated = score >= threshold;
    const isIntermediate = chaGender === 'male' ? score === 1 : score === 2;

    return {
      score,
      isIndicated,
      isIntermediate,
      recommendation: isIndicated
        ? 'WAJIB TERAPI ANTIKOAGULAN ORAL (DOAC lini pertama: Rivaroxaban 20 mg 1x/hari atau Apixaban 5 mg 2x/hari)'
        : isIntermediate
        ? 'Pertimbangkan Antikoagulan Oral DOAC berdasarkan preferensi klinis'
        : 'Risiko Rendah: Tidak memerlukan terapi antikoagulan atau antiplatelet'
    };
  };

  // 3. CURB-65 Calculation
  const calculateCurb65 = () => {
    let score = 0;
    if (curbC) score += 1;
    if (curbU) score += 1;
    if (curbR) score += 1;
    if (curbB) score += 1;
    if (curb65Age) score += 1;

    if (score >= 3) {
      return {
        score,
        group: 'Risiko Tinggi (Mortalitas 15-40%)',
        treatmentSite: 'Wajib Rawat Inap di Rumah Sakit / Evaluasi Masuk ICU',
        regimen: 'Ceftriaxone 2 g IV/hari + Levofloxacin 750 mg IV/hari atau Meropenem'
      };
    } else if (score === 2) {
      return {
        score,
        group: 'Risiko Sedang (Mortalitas ~9%)',
        treatmentSite: 'Rawat Inap di Bangsal Rumah Sakit Biasa',
        regimen: 'Ceftriaxone 1-2 g IV/hari + Azithromycin 500 mg PO/IV'
      };
    } else {
      return {
        score,
        group: 'Risiko Rendah (Mortalitas < 1.5%)',
        treatmentSite: 'Cukup Rawat Jalan di Rumah',
        regimen: 'Amoxicillin 1000 mg PO 3x/hari atau Azithromycin 500 mg PO hari-1 lalu 250 mg hari 2-5'
      };
    }
  };

  // 4. Child-Pugh Calculation
  const calculateChildPugh = () => {
    let score = 0;
    if (cpBilirubin < 2.0) score += 1;
    else if (cpBilirubin <= 3.0) score += 2;
    else score += 3;

    if (cpAlbumin > 3.5) score += 1;
    else if (cpAlbumin >= 2.8) score += 2;
    else score += 3;

    if (cpInr < 1.7) score += 1;
    else if (cpInr <= 2.2) score += 2;
    else score += 3;

    if (cpAscites === 'none') score += 1;
    else if (cpAscites === 'slight') score += 2;
    else score += 3;

    if (cpEncephalopathy === 'none') score += 1;
    else if (cpEncephalopathy === 'grade1-2') score += 2;
    else score += 3;

    if (score <= 6) {
      return {
        score,
        classGrade: 'Child-Pugh Kelas A (Skor 5-6)',
        status: 'Fungsi Hati Terkompensasi Baik',
        dosingAdvice: 'Dosis obat standar normal, monitor enzim hepar berkala.'
      };
    } else if (score <= 9) {
      return {
        score,
        classGrade: 'Child-Pugh Kelas B (Skor 7-9)',
        status: 'Gangguan Fungsional Hati Derajat Sedang',
        dosingAdvice: 'Turunkan dosis obat yang mengalami metabolisme hepatik tinggi sebesar 25 - 50%.'
      };
    } else {
      return {
        score,
        classGrade: 'Child-Pugh Kelas C (Skor 10-15)',
        status: 'Dekompensasi Hati Berat (Mortalitas 1-Tahun ~50%)',
        dosingAdvice: 'HINDARI obat hepatotoksik dan sedatif. Pasien masuk daftar evaluasi rujukan transplantasi hepar.'
      };
    }
  };

  // 5. qSOFA Calculation
  const calculateQsofa = () => {
    let score = 0;
    if (qsofaRr) score += 1;
    if (qsofaGcs) score += 1;
    if (qsofaSbp) score += 1;

    return {
      score,
      isPositive: score >= 2,
      interpretation:
        score >= 2
          ? 'POSITIF qSOFA (Skor >= 2) → Risiko Tinggi Disfungsi Organ & Kematian Sepsis! SEGERA AKTIFKAN PROTOKOL HOUR-1 BUNDLE (Kultur darah, Laktat, Antibiotik IV < 1 jam, Kristaloid 30 mL/kg, Norepinefrin).'
          : 'Negatif qSOFA (Skor < 2) → Tetap observasi ketat jika ada kecurigaan klinis infeksi berat.'
    };
  };

  // 6. MAP Calculation
  const calculateMap = () => {
    const map = mapDbp + (mapSbp - mapDbp) / 3;
    const lowerTargetMap = map * 0.75;
    const upperTargetMap = map * 0.8;
    return {
      map: Math.round(map),
      targetRange: `${Math.round(lowerTargetMap)} - ${Math.round(upperTargetMap)} mmHg`
    };
  };

  // 7. Cockcroft-Gault & eGFR
  const calculateEgfr = () => {
    let crcl = ((140 - gfrAge) * gfrWeight) / (72 * gfrScr);
    if (gfrGender === 'female') crcl *= 0.85;

    let ckdStage = '';
    if (crcl >= 90) ckdStage = 'Stage 1 (Normal / GFR Tinggi >= 90 mL/min)';
    else if (crcl >= 60) ckdStage = 'Stage 2 (Penurunan Ringan GFR 60-89 mL/min)';
    else if (crcl >= 30) ckdStage = 'Stage 3 (Penurunan Sedang GFR 30-59 mL/min)';
    else if (crcl >= 15) ckdStage = 'Stage 4 (Penurunan Berat GFR 15-29 mL/min)';
    else ckdStage = 'Stage 5 (Gagal Ginjal Terminal GFR < 15 mL/min)';

    return {
      crcl: Math.round(crcl),
      ckdStage
    };
  };

  // 8. Pediatric Dehydration
  const calculatePedDehydration = () => {
    let signs = 0;
    if (pedCondition !== 'well') signs += 1;
    if (pedEyes === 'sunken') signs += 1;
    if (pedThirst !== 'normal') signs += 1;
    if (pedSkinTurgor !== 'normal') signs += 1;

    if (pedCondition === 'lethargic' || pedSkinTurgor === 'very_slow') {
      return {
        plan: 'Rencana Terapi C (Dehidrasi Berat)',
        action: 'Gawat Darurat! Segera berikan cairan intravena Ringer Laktat 100 mL/kgBB (Bayi <1 thn: 30 mL/kg dalam 1 jam, lalu 70 mL/kg dalam 5 jam; Anak >1 thn: 30 mL/kg dalam 30 menit, lalu 70 mL/kg dalam 2.5 jam).'
      };
    } else if (signs >= 2) {
      return {
        plan: 'Rencana Terapi B (Dehidrasi Ringan-Sedang)',
        action: 'Berikan Oralit 75 mL/kgBB dalam 4 jam pertama di fasilitas kesehatan. Berikan Tablet Zink (10-20 mg/hari) selama 10 hari penuh.'
      };
    } else {
      return {
        plan: 'Rencana Terapi A (Tanpa Dehidrasi)',
        action: 'Terapi Cairan di Rumah: Berikan cairan rumah tangga/Oralit ekstra tiap kali BAB cair + Teruskan ASI/makanan + Tablet Zink 10 hari.'
      };
    }
  };

  // 9. HbA1c to eAG
  const calculateEag = () => {
    const eag = 28.7 * hba1cVal - 46.7;
    return Math.round(eag);
  };

  // 10. Holliday-Segar
  const calculateHollidaySegar = () => {
    let totalMl = 0;
    if (hsWeight <= 10) {
      totalMl = hsWeight * 100;
    } else if (hsWeight <= 20) {
      totalMl = 1000 + (hsWeight - 10) * 50;
    } else {
      totalMl = 1500 + (hsWeight - 20) * 20;
    }
    const mlPerHour = Math.round(totalMl / 24);
    const dropsMacro = Math.round((totalMl * 20) / (24 * 60)); // 20 tpm
    const dropsMicro = Math.round((totalMl * 60) / (24 * 60)); // 60 tpm

    return {
      total24h: totalMl,
      mlPerHour,
      dropsMacro,
      dropsMicro
    };
  };

  // 11. ACT Calculation
  const calculateAct = () => {
    const totalScore = actQ1 + actQ2 + actQ3 + actQ4 + actQ5;
    if (totalScore === 25) {
      return {
        score: totalScore,
        category: 'Asma Terkontrol Penuh (Totally Controlled)',
        badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
        advice: 'Bagus sekali! Pasien memiliki kontrol asma sempurna. Pertahankan regimen terapi saat ini. Jika sudah stabil selama >= 3 bulan berturut-turut, pertimbangkan penurunan step terapi (Step-Down) secara bertahap.'
      };
    } else if (totalScore >= 20) {
      return {
        score: totalScore,
        category: 'Asma Terkontrol Sebagian (Partially Controlled)',
        badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
        advice: 'Asma terkendali sebagian. Evaluasi kepatuhan penggunaan inhaler harian dan teknik inhalasi pasien. Pertimbangkan untuk meningkatkan step terapi (Step-Up) jika gejala membatasi aktivitas harian.'
      };
    } else {
      return {
        score: totalScore,
        category: 'Asma Tidak Terkontrol (Uncontrolled Asthma)',
        badgeColor: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
        advice: 'Peringatan: Asma pasien tidak terkontrol dengan risiko tinggi eksaserbasi akut. Wajib NAIKKAN STEP TERAPI (Step-Up GINA: naikkan dosis ICS-Formoterol / tambahkan LAMA), periksa paparan alergen, dan jadwalkan evaluasi ulang dalam 2-4 minggu.'
      };
    }
  };

  // 12. PHQ-9 Calculation
  const calculatePhq9 = () => {
    const totalScore = phqScores.reduce((a, b) => a + b, 0);
    const hasSuicidalIdeation = phqScores[8] > 0;

    if (totalScore >= 20) {
      return {
        score: totalScore,
        severity: 'Depresi Berat (Severe Depression)',
        badgeColor: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
        treatment: 'Wajib Farmakoterapi Antidepresan Lini Pertama SSRI (Sertraline 50 mg/hari atau Fluoxetine 20 mg/hari) + Psikoterapi Intensif + Rujukan Segera ke Dokter Spesialis Kedokteran Jiwa (Psikiater).',
        hasSuicidalIdeation
      };
    } else if (totalScore >= 15) {
      return {
        score: totalScore,
        severity: 'Depresi Sedang-Berat (Moderately Severe Depression)',
        badgeColor: 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30',
        treatment: 'Inisiasi Antidepresan SSRI Lini Pertama (Sertraline / Fluoxetine) dikombinasikan dengan psikoterapi Cognitive Behavioral Therapy (CBT).',
        hasSuicidalIdeation
      };
    } else if (totalScore >= 10) {
      return {
        score: totalScore,
        severity: 'Depresi Sedang (Moderate Depression)',
        badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
        treatment: 'Pertimbangkan Antidepresan SSRI atau Psikoterapi terstruktur berbasis bukti (CBT / Interpersonal Therapy). Evaluasi respons dalam 4-6 minggu.',
        hasSuicidalIdeation
      };
    } else if (totalScore >= 5) {
      return {
        score: totalScore,
        severity: 'Depresi Ringan (Mild Depression)',
        badgeColor: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30',
        treatment: 'Observasi suportif (*watchful waiting*), konseling gaya hidup, perbaikan pola tidur & aktivitas fisik teratur. Evaluasi ulang dalam kurun waktu 1 bulan.',
        hasSuicidalIdeation
      };
    } else {
      return {
        score: totalScore,
        severity: 'Depresi Minimal / Normal (None to Minimal)',
        badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
        treatment: 'Tidak memerlukan intervensi farmakologis atau psikoterapi formal. Berikan edukasi kesehatan mental umum.',
        hasSuicidalIdeation
      };
    }
  };

  // 13. Bishop Score Calculation
  const calculateBishop = () => {
    const totalScore =
      bishopDilatation + bishopEffacement + bishopStation + bishopConsistency + bishopPosition;

    if (totalScore >= 6) {
      return {
        score: totalScore,
        category: 'Serviks Matang (Favorable Cervix / Skor >= 6)',
        badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
        recommendation:
          'Kesiapan serviks tinggi! Pasien siap untuk INDUKSI PERSALINAN LANGSUNG DENGAN INFUS OKSITOSIN DRIP (Tingkat keberhasilan persalinan pervaginam spontan sangat tinggi).',
        isFavorable: true
      };
    } else {
      return {
        score: totalScore,
        category: 'Serviks Belum Matang (Unfavorable Cervix / Skor < 6)',
        badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
        recommendation:
          'Serviks belum siap. WAJIB DILAKUKAN PEMATANGAN SERVIKS (Cervical Ripening) TERLEBIH DAHULU menggunakan Misoprostol dosis rendah (25 mcg tiap 6 jam) atau Kateter Foley Transservikal sebelum memulai induksi oksitosin drip untuk mencegah kegagalan induksi.',
        isFavorable: false
      };
    }
  };

  // 14. SRQ-20 Calculation
  const calculateSrq20 = () => {
    const totalScore = srqScores.reduce((a, b) => a + b, 0);
    const hasSuicidalIdeation = srqScores[16] === 1; // Pertanyaan No. 17 (0-indexed 16)

    if (totalScore >= 12) {
      return {
        score: totalScore,
        category: 'Distres Psikologis Berat / GME Signifikan',
        badgeColor: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
        recommendation:
          'Skor sangat tinggi (>= 12 dari 20). Menandakan adanya distres psikologis berat yang berpotensi mengganggu fungsi okupasi dan sosial sehari-hari. Sangat dianjurkan rujukan segera ke Dokter Spesialis Kedokteran Jiwa (Psikiater) atau Psikolog Klinis untuk pemeriksaan diagnostik komprehensif, psikoterapi, dan pertimbangan intervensi farmakoterapi (antidepresan/ansiolitik).',
        hasSuicidalIdeation
      };
    } else if (totalScore >= 6) {
      return {
        score: totalScore,
        category: 'Terindikasi Gangguan Mental Emosional (GME)',
        badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
        recommendation:
          'Skor mencapai batas ambang resmi Kemenkes RI (>= 6 poin). Mengindikasikan adanya distres emosional bermakna (gejala cemas, depresi, atau somatisasi). Lakukan konseling suportif, eksplorasi faktor pemicu stres, berikan edukasi koping stres adaptif, dan rencanakan rujukan ke layanan kesehatan jiwa di faskes jika keluhan menetap lebih dari 2 minggu.',
        hasSuicidalIdeation
      };
    } else {
      return {
        score: totalScore,
        category: 'Dalam Batas Normal (Tidak Terindikasi GME Bermakna)',
        badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
        recommendation:
          'Skor di bawah batas ambang (< 6 poin). Tidak mengindikasikan adanya gangguan mental emosional yang bermakna dalam kurun 30 hari terakhir. Berikan edukasi kesehatan jiwa preventif, istirahat cukup, relaksasi, dan koping stres adaptif.',
        hasSuicidalIdeation
      };
    }
  };

  const ascvdRes = calculateAscvd();
  const chaRes = calculateCha2ds2Vasc();
  const curbRes = calculateCurb65();
  const cpRes = calculateChildPugh();
  const qsofaRes = calculateQsofa();
  const mapRes = calculateMap();
  const gfrRes = calculateEgfr();
  const pedRes = calculatePedDehydration();
  const eagVal = calculateEag();
  const hsRes = calculateHollidaySegar();
  const actRes = calculateAct();
  const phqRes = calculatePhq9();
  const bishopRes = calculateBishop();
  const srqRes = calculateSrq20();

  const handleApplyDrugs = (drugs: string[]) => {
    if (onCheckInteractionsWithRegimen) {
      onCheckInteractionsWithRegimen(drugs);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/20">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">Kalkulator Skor Klinis & Keputusan Terapi</h2>
                <span className="px-2 py-0.5 text-xs font-semibold bg-teal-400/20 text-teal-300 border border-teal-400/30 rounded-full">
                  Evidence-Based
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Pusat kalkulasi skor risiko klinis terstandarisasi Kemenkes RI, PERKI, IDAI, POGI, PDSKJI & International Guidelines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body with Left Sidebar Tabs and Right Calculator Panel */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Calculator Selection Menu */}
          <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col shrink-0">
            {/* Search Calculator */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kalkulator (ASCVD, ACT, PHQ-9, Bishop)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* List of Calculators */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredCalculators.map((calc) => {
                const IconComponent = calc.icon;
                const isActive = activeTab === calc.id;
                return (
                  <button
                    key={calc.id}
                    onClick={() => setActiveTab(calc.id as CalculatorType)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500/15 to-emerald-500/10 border border-teal-500/30 text-teal-900 dark:text-teal-200 font-semibold shadow-xs'
                        : 'hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${calc.color} text-white shadow-xs shrink-0 mt-0.5`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold truncate">{calc.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {calc.category}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                          {calc.badge}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Active Calculator Workspace */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900">
            {/* 1. ASCVD */}
            {activeTab === 'ascvd' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Pedoman PERKI 2023 / ACC-AHA / ESC
                    </span>
                    <span className="text-xs text-slate-500">Kalkulator Pencegahan Primer & Sekunder</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Kalkulator Risiko Kardiovaskular 10-Tahun (ASCVD) & Target Kolesterol LDL
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Menghitung probabilitas serangan jantung & stroke aterotrombotik dalam 10 tahun untuk menentukan intensitas terapi Statin.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Usia Pasien (Tahun)
                    </label>
                    <input
                      type="number"
                      value={ascvdAge}
                      onChange={(e) => setAscvdAge(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Jenis Kelamin
                    </label>
                    <select
                      value={ascvdGender}
                      onChange={(e) => setAscvdGender(e.target.value as 'male' | 'female')}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Tekanan Darah Sistolik (mmHg)
                    </label>
                    <input
                      type="number"
                      value={ascvdSbp}
                      onChange={(e) => setAscvdSbp(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Kolesterol Total (mg/dL)
                    </label>
                    <input
                      type="number"
                      value={ascvdTotalChol}
                      onChange={(e) => setAscvdTotalChol(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Kolesterol HDL (mg/dL)
                    </label>
                    <input
                      type="number"
                      value={ascvdHdl}
                      onChange={(e) => setAscvdHdl(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ascvdSmoker}
                        onChange={(e) => setAscvdSmoker(e.target.checked)}
                        className="w-4 h-4 text-teal-600 rounded"
                      />
                      Perokok Aktif
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ascvdDiabetes}
                        onChange={(e) => setAscvdDiabetes(e.target.checked)}
                        className="w-4 h-4 text-teal-600 rounded"
                      />
                      Diabetes Melitus
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ascvdHtnMeds}
                        onChange={(e) => setAscvdHtnMeds(e.target.checked)}
                        className="w-4 h-4 text-teal-600 rounded"
                      />
                      Sedang Minum Obat Darah Tinggi
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ascvdKnownCad}
                        onChange={(e) => setAscvdKnownCad(e.target.checked)}
                        className="w-4 h-4 text-rose-600 rounded"
                      />
                      Riwayat PJK / Pasang Ring / Stroke
                    </label>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border ${ascvdRes.alertColor} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Hasil Estimasi Risiko Kardiovaskular
                      </span>
                      <h4 className="text-xl font-black">{ascvdRes.riskCategory}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black">{ascvdRes.riskPercent}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-current/20">
                    <div>
                      <span className="text-xs font-bold block mb-0.5">Rekomendasi Terapi Statin:</span>
                      <p className="text-sm font-semibold">{ascvdRes.statinIntensity}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {ascvdRes.recommendedDrugs.map((drug, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs font-bold rounded-md bg-white/80 dark:bg-slate-900/80 border border-current/20"
                          >
                            💊 {drug}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold block mb-0.5">Target Kolesterol LDL:</span>
                      <p className="text-sm font-black text-emerald-700 dark:text-emerald-300">
                        🎯 {ascvdRes.targetLdl}
                      </p>
                    </div>
                  </div>

                  {ascvdRes.recommendedDrugs.length > 0 && ascvdRes.recommendedDrugs[0] !== 'Edukasi Diet Jantung Sehat' && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleApplyDrugs(ascvdRes.recommendedDrugs)}
                        className="px-4 py-2 text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                      >
                        <Pill className="w-3.5 h-3.5" />
                        Terapkan Regimen Statin ke Cek Interaksi
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. CHA2DS2-VASc */}
            {activeTab === 'cha2ds2vasc' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    Konsensus Fibrilasi Atrium PERKI / ESC
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Skor CHA₂DS₂-VASc (Stratifikasi Risiko Stroke pada Fibrilasi Atrium)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Menghitung risiko tromboemboli stroke tahunan untuk menentukan wajib tidaknya terapi antikoagulan oral.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chaChf}
                      onChange={(e) => setChaChf(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold block">C: Gagal Jantung Kongestif / LVEF &le; 40% (+1)</span>
                      <span className="text-slate-500">Congestive Heart Failure</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chaHtn}
                      onChange={(e) => setChaHtn(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold block">H: Hipertensi (+1)</span>
                      <span className="text-slate-500">Tensi persisten &ge; 140/90 atau sedang minum obat</span>
                    </div>
                  </label>

                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <label className="text-xs font-bold block mb-1">A₂: Usia Pasien</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setChaAge(60)}
                        className={`flex-1 py-1.5 text-xs rounded-lg font-bold border cursor-pointer ${
                          chaAge < 65 ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        &lt; 65 thn (0)
                      </button>
                      <button
                        type="button"
                        onClick={() => setChaAge(70)}
                        className={`flex-1 py-1.5 text-xs rounded-lg font-bold border cursor-pointer ${
                          chaAge >= 65 && chaAge < 75 ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        65 - 74 thn (+1)
                      </button>
                      <button
                        type="button"
                        onClick={() => setChaAge(78)}
                        className={`flex-1 py-1.5 text-xs rounded-lg font-bold border cursor-pointer ${
                          chaAge >= 75 ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        &ge; 75 thn (+2)
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chaDm}
                      onChange={(e) => setChaDm(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold block">D: Diabetes Melitus (+1)</span>
                      <span className="text-slate-500">Gula puasa &gt; 126 atau sedang terapi antidiabetes</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chaStroke}
                      onChange={(e) => setChaStroke(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold block text-rose-600 dark:text-rose-400">
                        S₂: Riwayat Stroke / TIA / Tromboemboli (+2)
                      </span>
                      <span className="text-slate-500">Faktor risiko mayor independen</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chaVasc}
                      onChange={(e) => setChaVasc(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold block">V: Penyakit Vaskular (+1)</span>
                      <span className="text-slate-500">Riwayat Infark Miokard, PAD, atau Plak Aorta</span>
                    </div>
                  </label>
                </div>

                <div
                  className={`p-5 rounded-2xl border ${
                    chaRes.isIndicated
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                  } space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Skor CHA₂DS₂-VASc Pasien
                      </span>
                      <h4 className="text-3xl font-black">{chaRes.score} Poin</h4>
                    </div>
                    <div className="text-right max-w-xs">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          chaRes.isIndicated
                            ? 'bg-rose-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {chaRes.isIndicated ? 'Indikasi Antikoagulan Oral DOAC' : 'Risiko Stroke Rendah'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20">
                    <span className="text-xs font-bold block mb-1">Rekomendasi Klinis:</span>
                    <p className="text-sm font-semibold">{chaRes.recommendation}</p>
                  </div>

                  {chaRes.isIndicated && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleApplyDrugs(['Rivaroxaban', 'Apixaban', 'Warfarin'])}
                        className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Pill className="w-3.5 h-3.5" />
                        Terapkan Regimen Antikoagulan DOAC
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. CURB-65 */}
            {activeTab === 'curb65' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    Pedoman PDPI & BTS Pneumonia
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Skor CURB-65 Pneumonia Komunitas Dewasa (CAP)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Menentukan stratifikasi keparahan pneumonia dan keputusan tempat perawatan (Rawat Jalan vs Rawat Inap vs ICU).
                  </p>
                </div>

                <div className="space-y-2.5">
                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={curbC}
                      onChange={(e) => setCurbC(e.target.checked)}
                      className="w-4 h-4 text-cyan-600 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold block">
                        C: Confusion / Disorientasi Mental Baru (+1)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Disorientasi orang, tempat, atau waktu (Skor AMT &le; 8 atau GCS &lt; 15)
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={curbU}
                      onChange={(e) => setCurbU(e.target.checked)}
                      className="w-4 h-4 text-cyan-600 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold block">
                        U: Urea Darah &gt; 7 mmol/L (BUN &gt; 19 mg/dL) (+1)
                      </span>
                      <span className="text-[11px] text-slate-500">Tanda azotemia uremik prerenal</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={curbR}
                      onChange={(e) => setCurbR(e.target.checked)}
                      className="w-4 h-4 text-cyan-600 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold block">
                        R: Respiratory Rate / Laju Napas &ge; 30 kali/menit (+1)
                      </span>
                      <span className="text-[11px] text-slate-500">Takipnea distres pernapasan</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={curbB}
                      onChange={(e) => setCurbB(e.target.checked)}
                      className="w-4 h-4 text-cyan-600 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold block">
                        B: Blood Pressure / Hipotensi (Sistolik &lt; 90 atau Diastolik &le; 60 mmHg) (+1)
                      </span>
                      <span className="text-[11px] text-slate-500">Instabilitas hemodinamik</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={curb65Age}
                      onChange={(e) => setCurb65Age(e.target.checked)}
                      className="w-4 h-4 text-cyan-600 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold block">
                        65: Usia Pasien &ge; 65 Tahun (+1)
                      </span>
                      <span className="text-[11px] text-slate-500">Populasi geriatri risiko tinggi</span>
                    </div>
                  </label>
                </div>

                <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-950 dark:text-cyan-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Skor CURB-65 Total
                      </span>
                      <h4 className="text-3xl font-black">{curbRes.score} Poin</h4>
                      <p className="text-xs font-bold mt-0.5">{curbRes.group}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 text-xs font-bold bg-cyan-600 text-white rounded-full">
                        {curbRes.treatmentSite}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20">
                    <span className="text-xs font-bold block mb-1">Rekomendasi Regimen Antibiotik:</span>
                    <p className="text-sm font-semibold">{curbRes.regimen}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Child-Pugh */}
            {activeTab === 'childpugh' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Hepatologi PGI-PEGI / AASLD
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Skor Child-Pugh (Derajat Keparahan Sirosis Hati)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Menilai cadangan fungsi hepar dan memandu penyesuaian dosis obat yang dimetabolisme di hati.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Bilirubin Total (mg/dL)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={cpBilirubin}
                      onChange={(e) => setCpBilirubin(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                    <span className="text-[10px] text-slate-500">&lt;2 (1 pt), 2-3 (2 pt), &gt;3 (3 pt)</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Albumin Serum (g/dL)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={cpAlbumin}
                      onChange={(e) => setCpAlbumin(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                    <span className="text-[10px] text-slate-500">&gt;3.5 (1 pt), 2.8-3.5 (2 pt), &lt;2.8 (3 pt)</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Nilai INR / Waktu Protrombin
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={cpInr}
                      onChange={(e) => setCpInr(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                    <span className="text-[10px] text-slate-500">&lt;1.7 (1 pt), 1.7-2.2 (2 pt), &gt;2.2 (3 pt)</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Derajat Asites
                    </label>
                    <select
                      value={cpAscites}
                      onChange={(e) => setCpAscites(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="none">Tidak Ada (1 Poin)</option>
                      <option value="slight">Ringan / Responsif Diuretik (2 Poin)</option>
                      <option value="moderate">Sedang - Berat / Refrakter (3 Poin)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Ensefalopati Hepatik
                    </label>
                    <select
                      value={cpEncephalopathy}
                      onChange={(e) => setCpEncephalopathy(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="none">Tidak Ada (1 Poin)</option>
                      <option value="grade1-2">Derajat 1 - 2 (Konfusi ringan / Asteriksis) (2 Poin)</option>
                      <option value="grade3-4">Derajat 3 - 4 (Stupor / Koma Hepatikum) (3 Poin)</option>
                    </select>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Hasil Skor Child-Pugh
                      </span>
                      <h4 className="text-2xl font-black">{cpRes.classGrade}</h4>
                      <p className="text-xs font-semibold">{cpRes.status}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black">{cpRes.score} Poin</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20">
                    <span className="text-xs font-bold block mb-1">Panduan Dosis Obat Metabolik Hepar:</span>
                    <p className="text-sm font-semibold">{cpRes.dosingAdvice}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. qSOFA */}
            {activeTab === 'qsofa' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Surviving Sepsis Campaign / PNPK Kemenkes RI
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Skor qSOFA (Quick Sequential Organ Failure Assessment)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Skrining cepat disfungsi organ pada pasien dengan kecurigaan infeksi di IGD / Puskesmas tanpa butuh lab.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qsofaRr}
                      onChange={(e) => setQsofaRr(e.target.checked)}
                      className="w-5 h-5 text-emerald-600 rounded"
                    />
                    <div>
                      <span className="text-sm font-bold block">1. Laju Pernapasan (RR) &ge; 22 kali/menit (+1)</span>
                      <span className="text-xs text-slate-500">Takipnea indikator awal asidosis laktat</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qsofaGcs}
                      onChange={(e) => setQsofaGcs(e.target.checked)}
                      className="w-5 h-5 text-emerald-600 rounded"
                    />
                    <div>
                      <span className="text-sm font-bold block">
                        2. Perubahan Status Mental (GCS &lt; 15) (+1)
                      </span>
                      <span className="text-xs text-slate-500">Somnolen, apatis, gelisah, atau disorientasi</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qsofaSbp}
                      onChange={(e) => setQsofaSbp(e.target.checked)}
                      className="w-5 h-5 text-emerald-600 rounded"
                    />
                    <div>
                      <span className="text-sm font-bold block">
                        3. Tekanan Darah Sistolik &le; 100 mmHg (+1)
                      </span>
                      <span className="text-xs text-slate-500">Tanda hipotensi / gangguan perfusi perifer</span>
                    </div>
                  </label>
                </div>

                <div
                  className={`p-5 rounded-2xl border ${
                    qsofaRes.isPositive
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                  } space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Skor qSOFA
                      </span>
                      <h4 className="text-3xl font-black">{qsofaRes.score} / 3 Poin</h4>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        qsofaRes.isPositive ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {qsofaRes.isPositive ? 'Positif Sepsis Berat' : 'qSOFA Negatif'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold pt-1">{qsofaRes.interpretation}</p>
                </div>
              </div>
            )}

            {/* 6. MAP */}
            {activeTab === 'map' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                    Kardiologi & Kedaruratan PERKI
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Kalkulator Mean Arterial Pressure (MAP) & Target Krisis Hipertensi
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Menghitung tekanan perfusi rata-rata dan menentukan target penurunan tensi yang aman (maksimal 20-25% pada 1 jam pertama).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Tekanan Darah Sistolik (mmHg)
                    </label>
                    <input
                      type="number"
                      value={mapSbp}
                      onChange={(e) => setMapSbp(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Tekanan Darah Diastolik (mmHg)
                    </label>
                    <input
                      type="number"
                      value={mapDbp}
                      onChange={(e) => setMapDbp(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/30 text-violet-950 dark:text-violet-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Nilai MAP Pasien Saat Ini
                      </span>
                      <h4 className="text-3xl font-black">{mapRes.map} mmHg</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                        Target MAP 1 Jam Pertama (Turun 20-25%):
                      </span>
                      <span className="text-xl font-black text-violet-700 dark:text-violet-300">
                        {mapRes.targetRange}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs">
                    ⚠️ <strong>Peringatan Klinis:</strong> Jangan menurunkan MAP melebihi 25% pada 1 jam pertama untuk mencegah hipoperfusi iskemia otak sekunder dan gagal ginjal akut!
                  </div>
                </div>
              </div>
            )}

            {/* 7. eGFR & CrCl */}
            {activeTab === 'egfr' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                    Nefrologi KDIGO / PERNEFRI
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Kalkulator Cockcroft-Gault Klirens Kreatinin & Stadium CKD
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Menghitung perkiraan klirens kreatinin ginjal untuk penyesuaian dosis obat (*Renal Dose Adjustment*).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Usia Pasien (Tahun)
                    </label>
                    <input
                      type="number"
                      value={gfrAge}
                      onChange={(e) => setGfrAge(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Jenis Kelamin
                    </label>
                    <select
                      value={gfrGender}
                      onChange={(e) => setGfrGender(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Berat Badan (kg)
                    </label>
                    <input
                      type="number"
                      value={gfrWeight}
                      onChange={(e) => setGfrWeight(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Serum Kreatinin (mg/dL)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={gfrScr}
                      onChange={(e) => setGfrScr(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-950 dark:text-teal-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Hasil Klirens Kreatinin (Cockcroft-Gault)
                      </span>
                      <h4 className="text-3xl font-black">{gfrRes.crcl} mL/menit</h4>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold bg-teal-600 text-white rounded-full">
                      {gfrRes.ckdStage}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 8. PEDIATRIC DEHYDRATION */}
            {activeTab === 'pediatric-dehydration' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
                    Pediatri Lintas Diare Kemenkes RI / WHO
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Kalkulator Derajat Dehidrasi Diare Anak
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Menentukan Rencana Terapi A (Rawat Jalan), B (Oralit 75 mL/kg), atau C (Infus RL Segera).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      1. Keadaan Umum Anak
                    </label>
                    <select
                      value={pedCondition}
                      onChange={(e) => setPedCondition(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="well">Sadar, Baik, Tenang</option>
                      <option value="irritable">Gelisah, Rewel, Cengeng</option>
                      <option value="lethargic">Letargis, Lemas Tak Sadar</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      2. Mata Anak
                    </label>
                    <select
                      value={pedEyes}
                      onChange={(e) => setPedEyes(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="normal">Normal</option>
                      <option value="sunken">Cekung</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      3. Rasa Haus / Minum
                    </label>
                    <select
                      value={pedThirst}
                      onChange={(e) => setPedThirst(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="normal">Minum Normal / Tidak Haus</option>
                      <option value="thirsty">Haus, Minum Lahap / Ingin Minum Terus</option>
                      <option value="unable">Malas Minum / Tidak Bisa Minum</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      4. Turgor Kulit Perut (Kembali)
                    </label>
                    <select
                      value={pedSkinTurgor}
                      onChange={(e) => setPedSkinTurgor(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="normal">Kembali Sangat Cepat (&lt; 1 detik)</option>
                      <option value="slow">Kembali Lambat (&le; 2 detik)</option>
                      <option value="very_slow">Kembali Sangat Lambat (&gt; 2 detik)</option>
                    </select>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-950 dark:text-pink-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Hasil Klasifikasi Dehidrasi
                      </span>
                      <h4 className="text-2xl font-black">{pedRes.plan}</h4>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-semibold">
                    📋 <strong>Tindakan Klinis:</strong> {pedRes.action}
                  </div>
                </div>
              </div>
            )}

            {/* 9. HbA1c to eAG */}
            {activeTab === 'hba1c-eag' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Endokrinologi PERKENI / ADA
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Kalkulator Konversi HbA1c ke Rata-Rata Glukosa Harian (eAG)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Mengubah hasil laboratorium HbA1c (%) menjadi perkiraan rata-rata gula darah harian (mg/dL) untuk memudahkan edukasi pasien.
                  </p>
                </div>

                <div className="max-w-xs">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kadar HbA1c Pasien (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={hba1cVal}
                    onChange={(e) => setHba1cVal(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 dark:text-emerald-200 space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                    Perkiraan Rata-Rata Glukosa Darah Harian (eAG)
                  </span>
                  <h4 className="text-4xl font-black">{eagVal} mg/dL</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Nilai HbA1c {hba1cVal}% setara dengan rata-rata gula darah harian ~{eagVal} mg/dL selama 2-3 bulan terakhir.
                  </p>
                </div>
              </div>
            )}

            {/* 10. HOLLIDAY-SEGAR */}
            {activeTab === 'holliday-segar' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    Pediatri Holliday-Segar Formula
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Kalkulator Cairan Rumatan Pediatrik (Holliday-Segar)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Menghitung kebutuhan volume cairan rumatan 24 jam dan tetesan infus per jam untuk anak rawat inap.
                  </p>
                </div>

                <div className="max-w-xs">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Berat Badan Anak (kg)
                  </label>
                  <input
                    type="number"
                    value={hsWeight}
                    onChange={(e) => setHsWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-950 dark:text-sky-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20">
                      <span className="text-[10px] uppercase font-bold opacity-80 block">Total Cairan 24 Jam</span>
                      <span className="text-2xl font-black">{hsRes.total24h} mL/hari</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20">
                      <span className="text-[10px] uppercase font-bold opacity-80 block">Kecepatan Infus</span>
                      <span className="text-2xl font-black">{hsRes.mlPerHour} mL/jam</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20">
                      <span className="text-[10px] uppercase font-bold opacity-80 block">Tetesan Infus Mikro (60)</span>
                      <span className="text-2xl font-black">{hsRes.dropsMicro} tpm mikro</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 11. ASTHMA CONTROL TEST (ACT) */}
            {/* ============================================================== */}
            {activeTab === 'act-asthma' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                    Pedoman GINA 2024 / PDPI
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Asthma Control Test (ACT) — Penilaian Derajat Kendali Asma
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Kuesioner 5 pertanyaan terstandarisasi untuk mengevaluasi derajat kendali asma dalam 4 minggu terakhir guna menentukan eskalasi (Step-Up) atau de-eskalasi (Step-Down) terapi inhaler.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Q1 */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      1. Dalam 4 minggu terakhir, seberapa sering asma mengganggu Anda melakukan pekerjaan di tempat kerja, sekolah, atau rumah?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {[
                        { val: 1, label: 'Sepanjang waktu (1)' },
                        { val: 2, label: 'Sebagian besar waktu (2)' },
                        { val: 3, label: 'Kadang-kadang (3)' },
                        { val: 4, label: 'Jarang (4)' },
                        { val: 5, label: 'Tidak pernah (5)' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setActQ1(opt.val)}
                          className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            actQ1 === opt.val
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-teal-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      2. Dalam 4 minggu terakhir, seberapa sering Anda mengalami sesak napas?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {[
                        { val: 1, label: '> 1x sehari (1)' },
                        { val: 2, label: '1x sehari (2)' },
                        { val: 3, label: '3-6 hari/minggu (3)' },
                        { val: 4, label: '1-2 hari/minggu (4)' },
                        { val: 5, label: 'Tidak pernah (5)' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setActQ2(opt.val)}
                          className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            actQ2 === opt.val
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-teal-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q3 */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      3. Dalam 4 minggu terakhir, seberapa sering gejala asma (mengi, batuk, sesak) membuat Anda terbangun di malam hari atau lebih awal dari biasanya?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {[
                        { val: 1, label: '>= 4 malam/minggu (1)' },
                        { val: 2, label: '2-3 malam/minggu (2)' },
                        { val: 3, label: '1 malam/minggu (3)' },
                        { val: 4, label: '1-2 kali sebulan (4)' },
                        { val: 5, label: 'Tidak pernah (5)' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setActQ3(opt.val)}
                          className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            actQ3 === opt.val
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-teal-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q4 */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      4. Dalam 4 minggu terakhir, seberapa sering Anda menggunakan inhaler pelega/reliever (Salbutamol atau Budesonide-Formoterol pelega)?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {[
                        { val: 1, label: '>= 3x sehari (1)' },
                        { val: 2, label: '1-2x sehari (2)' },
                        { val: 3, label: '2-3x seminggu (3)' },
                        { val: 4, label: '<= 1x seminggu (4)' },
                        { val: 5, label: 'Tidak pernah (5)' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setActQ4(opt.val)}
                          className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            actQ4 === opt.val
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-teal-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q5 */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      5. Bagaimana Anda menilai kendali asma Anda sendiri dalam 4 minggu terakhir?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {[
                        { val: 1, label: 'Tidak terkontrol sama sekali (1)' },
                        { val: 2, label: 'Kurang terkontrol (2)' },
                        { val: 3, label: 'Cukup terkontrol (3)' },
                        { val: 4, label: 'Terkontrol baik (4)' },
                        { val: 5, label: 'Terkontrol sempurna (5)' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setActQ5(opt.val)}
                          className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            actQ5 === opt.val
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-teal-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ACT Result Box */}
                <div className={`p-5 rounded-2xl border ${actRes.badgeColor} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Hasil Skor Asthma Control Test (ACT)
                      </span>
                      <h4 className="text-2xl font-black">{actRes.category}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black">{actRes.score} / 25 Poin</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-semibold leading-relaxed">
                    📋 <strong>Rekomendasi Klinis:</strong> {actRes.advice}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 12. PHQ-9 (PATIENT HEALTH QUESTIONNAIRE 9) */}
            {/* ============================================================== */}
            {activeTab === 'phq9' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    Psikiatri PDSKJI / APA DSM-5
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Kuesioner Skrining Depresi (PHQ-9 — Patient Health Questionnaire)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Instrumen skrining 9 item untuk mengukur derajat keparahan depresi mayor dan memandu inisiasi terapi farmakologis antidepresan SSRI.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    '1. Kurang berminat atau bergairah dalam melakukan kegiatan sehari-hari (Anhedonia)',
                    '2. Merasa murung, sedih, putus asa, atau tertekan',
                    '3. Sulit tidur / sering terbangun malam, atau sebaliknya tidur terlalu banyak',
                    '4. Merasa lelah, tidak berenergi, atau lesu sepanjang hari',
                    '5. Kurang nafsu makan atau makan terlalu berlebihan',
                    '6. Merasa buruk tentang diri sendiri, merasa gagal atau mengecewakan keluarga',
                    '7. Sulit berkonsentrasi (seperti saat membaca koran, bekerja, atau menonton TV)',
                    '8. Bergerak atau berbicara sangat lambat, atau sebaliknya sangat gelisah dan mondar-mandir',
                    '9. Merasa lebih baik mati atau mempunyai pikiran untuk melukai diri sendiri'
                  ].map((questionText, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2"
                    >
                      <span className={`text-xs font-bold block ${idx === 8 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {questionText}
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { val: 0, label: 'Tidak Pernah (0)' },
                          { val: 1, label: 'Beberapa Hari (1)' },
                          { val: 2, label: '> Separuh Waktu (2)' },
                          { val: 3, label: 'Hampir Setiap Hari (3)' }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => {
                              const next = [...phqScores];
                              next[idx] = opt.val;
                              setPhqScores(next);
                            }}
                            className={`p-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              phqScores[idx] === opt.val
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-indigo-50'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* PHQ-9 Result Box */}
                <div className={`p-5 rounded-2xl border ${phqRes.badgeColor} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Hasil Evaluasi Derajat Depresi
                      </span>
                      <h4 className="text-2xl font-black">{phqRes.severity}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black">{phqRes.score} / 27 Poin</span>
                    </div>
                  </div>

                  {phqRes.hasSuicidalIdeation && (
                    <div className="p-3 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>PERINGATAN KRITIS: Pasien memiliki ide mencederai diri/bunuh diri positif (Item 9 &gt; 0). Wajib pendampingan ketat & rujukan psikiater darurat!</span>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-semibold leading-relaxed">
                    📋 <strong>Rekomendasi Tatalaksana:</strong> {phqRes.treatment}
                  </div>

                  {phqRes.score >= 10 && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleApplyDrugs(['Sertraline', 'Fluoxetine', 'Escitalopram'])}
                        className="px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Pill className="w-3.5 h-3.5" />
                        Terapkan Regimen Antidepresan SSRI
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 13. BISHOP SCORE (KEMATANGAN SERVIKS) */}
            {/* ============================================================== */}
            {activeTab === 'bishop' && (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    Obstetri & Ginekologi POGI / ACOG
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Bishop Score — Penilaian Kematangan Serviks untuk Induksi Persalinan
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Menghitung skor kesiapan serviks melalui 5 parameter pemeriksaan dalam vagina (VT) untuk menentukan apakah pasien siap induksi oksitosin langsung atau memerlukan pematangan serviks (*cervical ripening*) terlebih dahulu.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Parameter 1: Pembukaan Serviks */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      1. Pembukaan Serviks / Dilatasi (cm)
                    </label>
                    <select
                      value={bishopDilatation}
                      onChange={(e) => setBishopDilatation(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      <option value={0}>Tertutup / 0 cm (0 Poin)</option>
                      <option value={1}>1 - 2 cm (1 Poin)</option>
                      <option value={2}>3 - 4 cm (2 Poin)</option>
                      <option value={3}>&ge; 5 cm (3 Poin)</option>
                    </select>
                  </div>

                  {/* Parameter 2: Penipisan Serviks */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      2. Penipisan Serviks / Effacement (%)
                    </label>
                    <select
                      value={bishopEffacement}
                      onChange={(e) => setBishopEffacement(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      <option value={0}>0 - 30% (0 Poin)</option>
                      <option value={1}>40 - 50% (1 Poin)</option>
                      <option value={2}>60 - 70% (2 Poin)</option>
                      <option value={3}>&ge; 80% (3 Poin)</option>
                    </select>
                  </div>

                  {/* Parameter 3: Penurunan Kepala Janin */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      3. Penurunan Kepala Janin / Station
                    </label>
                    <select
                      value={bishopStation}
                      onChange={(e) => setBishopStation(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      <option value={0}>Hodge I / Station -3 (0 Poin)</option>
                      <option value={1}>Hodge II / Station -2 (1 Poin)</option>
                      <option value={2}>Hodge III / Station -1 s/d 0 (2 Poin)</option>
                      <option value={3}>Hodge IV / Station +1 s/d +2 (3 Poin)</option>
                    </select>
                  </div>

                  {/* Parameter 4: Konsistensi Serviks */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      4. Konsistensi Serviks
                    </label>
                    <select
                      value={bishopConsistency}
                      onChange={(e) => setBishopConsistency(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      <option value={0}>Keras / Firm (0 Poin)</option>
                      <option value={1}>Sedang / Medium (1 Poin)</option>
                      <option value={2}>Lunak / Soft (2 Poin)</option>
                    </select>
                  </div>

                  {/* Parameter 5: Posisi Serviks */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      5. Posisi Porsio Serviks
                    </label>
                    <select
                      value={bishopPosition}
                      onChange={(e) => setBishopPosition(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      <option value={0}>Posterior (0 Poin)</option>
                      <option value={1}>Midposisi / Tengah (1 Poin)</option>
                      <option value={2}>Anterior (2 Poin)</option>
                    </select>
                  </div>
                </div>

                {/* Bishop Result Box */}
                <div className={`p-5 rounded-2xl border ${bishopRes.badgeColor} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Hasil Bishop Score Total
                      </span>
                      <h4 className="text-2xl font-black">{bishopRes.category}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black">{bishopRes.score} / 13 Poin</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-semibold leading-relaxed">
                    📋 <strong>Rekomendasi Tindakan:</strong> {bishopRes.recommendation}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 14. SRQ-20 (SELF-REPORTING QUESTIONNAIRE-20) */}
            {/* ============================================================== */}
            {activeTab === 'srq20' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                      Standar Baku WHO / Kemenkes RI (Pedoman Faskes Primer)
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                      Kuesioner Kesehatan Jiwa (SRQ-20 — Self-Reporting Questionnaire)
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Instrumen skrining 20 pertanyaan untuk mendeteksi dini Gangguan Mental Emosional (GME: cemas, depresi, dan gejala somatik) dalam kurun waktu <strong>30 hari terakhir</strong>.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSrqScores(Array(20).fill(0))}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
                      <span>Reset Semua "Tidak"</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {[
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
                  ].map((questionText, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border transition-all ${
                        idx === 16 && srqScores[idx] === 1
                          ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40'
                          : srqScores[idx] === 1
                          ? 'border-teal-400 bg-teal-50/50 dark:bg-teal-950/30'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <span className={`text-xs font-bold leading-relaxed ${
                          idx === 16 ? 'text-rose-600 dark:text-rose-400 font-black' : 'text-slate-800 dark:text-slate-200'
                        }`}>
                          {questionText}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...srqScores];
                              next[idx] = 0;
                              setSrqScores(next);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              srqScores[idx] === 0
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 shadow-2xs'
                                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            Tidak (0)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...srqScores];
                              next[idx] = 1;
                              setSrqScores(next);
                            }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                              srqScores[idx] === 1
                                ? idx === 16
                                  ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                                  : 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-teal-50'
                            }`}
                          >
                            Ya (1)
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SRQ-20 Result Box */}
                <div className={`p-5 rounded-2xl border ${srqRes.badgeColor} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider opacity-80">
                        Hasil Evaluasi Kesehatan Mental (Cut-off Kemenkes RI: &ge; 6)
                      </span>
                      <h4 className="text-2xl font-black">{srqRes.category}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black">{srqRes.score} / 20</span>
                      <span className="block text-[11px] opacity-75 font-semibold">Jawaban "Ya"</span>
                    </div>
                  </div>

                  {srqRes.hasSuicidalIdeation && (
                    <div className="p-3.5 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-start gap-2.5 shadow-md">
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="text-sm font-black">PERINGATAN KRITIS (RED FLAG KESEHATAN JIWA):</div>
                        <div>
                          Pasien menjawab <strong>"Ya"</strong> pada pertanyaan No. 17 (Pikiran untuk mengakhiri hidup). Wajib diberikan pendampingan segera, pengawasan ketat, dan rujukan darurat ke Dokter Spesialis Kedokteran Jiwa (Psikiater) / IGD Rumah Sakit atau Hotline Krisis Kesehatan Jiwa Kemenkes (Halo Kemenkes 1500-567)!
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-semibold leading-relaxed">
                    📋 <strong>Rekomendasi Klinis & Konseling:</strong> {srqRes.recommendation}
                  </div>

                  {srqRes.score >= 6 && (
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        *Skor &ge; 6 mengindikasikan gejala Gangguan Mental Emosional (GME) bermakna menurut pedoman Kemenkes RI.
                      </div>
                      <button
                        onClick={() => handleApplyDrugs(['Sertraline', 'Fluoxetine', 'Escitalopram'])}
                        className="px-4 py-2 text-xs font-bold bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Pill className="w-3.5 h-3.5" />
                        <span>Kaji Terapi Farmakoterapi Lini 1 (SSRI)</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
