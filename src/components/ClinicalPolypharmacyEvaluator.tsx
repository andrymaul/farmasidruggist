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
  Edit3
} from 'lucide-react';

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
}

interface PrescriptionItem {
  id: string;
  drug: Drug;
  dose: string; // e.g. "500 mg"
  frequency: string; // e.g. "3x1 (Tiap 8 jam)"
  foodTiming: 'Sebelum Makan' | 'Sesudah Makan' | 'Bersama Makanan' | 'Perut Kosong' | 'Bebas';
  preferredTimes: string[]; // e.g. ["06:00", "14:00", "22:00"]
}

interface ClinicalPolypharmacyEvaluatorProps {
  allDrugs: Drug[];
  allInteractions: DrugInteraction[];
  clinicBranding?: ClinicBrandingSettings;
  onOpenBrandingModal?: () => void;
  onSelectTab?: (tab: string) => void;
}

const FREQUENCY_OPTIONS = [
  { label: '1x1 Pagi (08:00)', times: ['08:00'] },
  { label: '1x1 Malam (21:00 Sebelum Tidur)', times: ['21:00'] },
  { label: '2x1 (Tiap 12 jam: 08:00 & 20:00)', times: ['08:00', '20:00'] },
  { label: '3x1 (Tiap 8 jam: 06:00, 14:00, 22:00)', times: ['06:00', '14:00', '22:00'] },
  { label: '4x1 (Tiap 6 jam: 06:00, 12:00, 18:00, 24:00)', times: ['06:00', '12:00', '18:00', '24:00'] },
  { label: 'PRN / Bila Perlu (Kebutuhan Saja)', times: [] }
];

const COMORBIDITY_OPTIONS = [
  'Hipertensi',
  'Diabetes Melitus',
  'Gagal Jantung (CHF)',
  'Asma / PPOK',
  'Peptic Ulcer / Maag & GGL',
  'Gagal Ginjal Kronis (CKD)',
  'Gangguan Hati / Sirosis',
  'Riwayat Alergi Obat'
];

// Presisi Dosis Sediaan Obat Farmasi Resmi (BPOM / AHFS / Medscape)
const CLINICAL_DRUG_STRENGTHS_MAP: Record<string, string[]> = {
  metformin: ['500 mg', '850 mg', '1000 mg XR'],
  captopril: ['12.5 mg', '25 mg', '50 mg'],
  simvastatin: ['10 mg', '20 mg', '40 mg'],
  amlodipine: ['5 mg', '10 mg'],
  paracetamol: ['500 mg', '650 mg', '120 mg/5ml Sirup', '250 mg Infus'],
  amoxicillin: ['250 mg', '500 mg', '125 mg/5ml Sirup Dry'],
  ciprofloxacin: ['250 mg', '500 mg', '200 mg/100ml Infus'],
  omeprazole: ['20 mg', '40 mg Injeksi'],
  lansoprazole: ['30 mg'],
  allopurinol: ['100 mg', '300 mg'],
  glibenclamide: ['5 mg'],
  glimepiride: ['1 mg', '2 mg', '3 mg', '4 mg'],
  furosemide: ['40 mg', '20 mg/2ml Injeksi'],
  spironolactone: ['25 mg', '100 mg'],
  ketorolac: ['10 mg', '30 mg/ml Injeksi'],
  ibuprofen: ['200 mg', '400 mg'],
  mefenamic: ['250 mg', '500 mg'],
  salbutamol: ['2 mg', '4 mg', '100 mcg/dose Inhaler'],
  dexamethasone: ['0.5 mg', '0.75 mg', '5 mg/ml Injeksi'],
  prednisone: ['5 mg'],
  methylprednisolone: ['4 mg', '8 mg', '16 mg', '125 mg Injeksi'],
  cetirizine: ['10 mg', '5 mg/5ml Sirup'],
  loratadine: ['10 mg'],
  ranitidine: ['150 mg', '50 mg/2ml Injeksi'],
  diazepam: ['2 mg', '5 mg', '10 mg Rektal'],
  alprazolam: ['0.25 mg', '0.5 mg', '1 mg'],
  atorvastatin: ['10 mg', '20 mg', '40 mg'],
  candesartan: ['8 mg', '16 mg'],
  valsartan: ['80 mg', '160 mg'],
  losartan: ['50 mg', '100 mg'],
  bisoprolol: ['2.5 mg', '5 mg', '10 mg'],
  propranolol: ['10 mg', '40 mg'],
  digoxin: ['0.25 mg'],
  warfarin: ['1 mg', '2 mg', '5 mg'],
  clopidogrel: ['75 mg'],
  aspirin: ['80 mg', '100 mg', '500 mg'],
  azithromycin: ['250 mg', '500 mg'],
  erythromycin: ['250 mg', '500 mg'],
  cefixime: ['100 mg', '200 mg'],
  cefadroxil: ['250 mg', '500 mg'],
  cotrimoxazole: ['480 mg', '960 mg Forte'],
  fluconazole: ['50 mg', '150 mg'],
  ketoconazole: ['200 mg'],
  acyclovir: ['200 mg', '400 mg'],
  domperidone: ['10 mg', '5 mg/5ml Sirup'],
  ondansetron: ['4 mg', '8 mg', '4 mg/2ml Injeksi'],
  sucralfate: ['500 mg/5ml Suspensi'],
  antasida: ['200 mg/200 mg Kunyah', 'Suspensi Oral'],
  diltiazem: ['30 mg', '60 mg'],
  verapamil: ['80 mg'],
  nifedipine: ['10 mg', '20 mg Adalat OROS'],
  hyoscine: ['10 mg'],
  piracetam: ['400 mg', '800 mg', '1200 mg'],
  citicoline: ['500 mg', '1000 mg'],
  mecobalamin: ['500 mcg'],
  vitamin: ['50 mg', '100 mg', '1000 IU'],
  folic: ['400 mcg', '1 mg', '5 mg'],
  ferrous: ['300 mg Tablet Tambah Darah']
};

export const ClinicalPolypharmacyEvaluator: React.FC<ClinicalPolypharmacyEvaluatorProps> = ({
  allDrugs,
  allInteractions,
  clinicBranding,
  onOpenBrandingModal,
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
    comorbidities: ['Hipertensi', 'Diabetes Melitus']
  });

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

  // Drug selector input state
  const [selectedDrugId, setSelectedDrugId] = useState<string>(allDrugs[0]?.id || '');
  const [customDose, setCustomDose] = useState<string>('500 mg');
  const [isManualDoseInput, setIsManualDoseInput] = useState<boolean>(false);
  const [customFreqLabel, setCustomFreqLabel] = useState<string>(FREQUENCY_OPTIONS[2].label);
  const [customTiming, setCustomTiming] = useState<PrescriptionItem['foodTiming']>('Sesudah Makan');

  // Helper to extract dosage options for chosen drug
  const currentDrug = useMemo(() => {
    return allDrugs.find(d => d.id === selectedDrugId) || allDrugs[0];
  }, [allDrugs, selectedDrugId]);

  // Accurate available dosage options array
  const availableDosages = useMemo(() => {
    if (!currentDrug) return ['500 mg', '250 mg', '100 mg'];
    const nameLower = currentDrug.name.toLowerCase();

    for (const key in CLINICAL_DRUG_STRENGTHS_MAP) {
      if (nameLower.includes(key)) {
        return CLINICAL_DRUG_STRENGTHS_MAP[key];
      }
    }

    if (currentDrug.dosage) {
      const matches = currentDrug.dosage.match(/(\d+(\.\d+)?\s*(mg|g|mcg|ml|IU|unit|mg\/ml))/gi);
      if (matches && matches.length > 0) {
        return Array.from(new Set(matches.map(m => m.trim())));
      }
    }

    return ['500 mg', '250 mg', '100 mg'];
  }, [currentDrug]);

  useEffect(() => {
    if (availableDosages.length > 0 && !isManualDoseInput) {
      setCustomDose(availableDosages[0]);
    }
  }, [selectedDrugId, availableDosages, isManualDoseInput]);

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

  const handleAddDrug = () => {
    if (!currentDrug) return;

    if (prescription.some(p => p.drug.id === currentDrug.id)) {
      alert(`Obat "${currentDrug.name}" sudah ada dalam daftar resep pasien!`);
      return;
    }

    const matchedFreqObj = FREQUENCY_OPTIONS.find(f => f.label === customFreqLabel) || FREQUENCY_OPTIONS[0];

    const newItem: PrescriptionItem = {
      id: `p_${Date.now()}`,
      drug: currentDrug,
      dose: customDose,
      frequency: matchedFreqObj.label,
      foodTiming: customTiming,
      preferredTimes: matchedFreqObj.times
    };

    setPrescription([...prescription, newItem]);
  };

  const handleRemoveDrug = (id: string) => {
    setPrescription(prescription.filter(p => p.id !== id));
  };

  // Polypharmacy, Pregnancy & Hepatic Risk Evaluation
  const polypharmacyStatus = useMemo(() => {
    const count = prescription.length;
    let level: 'Normal' | 'Polifarmasi' | 'Hiperpolifarmasi' = 'Normal';
    let color = 'bg-emerald-50 border-emerald-200 text-emerald-800';
    let badge = 'Risiko Rendah';

    if (count >= 10) {
      level = 'Hiperpolifarmasi';
      color = 'bg-rose-50 border-rose-200 text-rose-800';
      badge = '⚠️ Risiko Sangat Tinggi (10+ Obat)';
    } else if (count >= 5) {
      level = 'Polifarmasi';
      color = 'bg-amber-50 border-amber-200 text-amber-800';
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

    const elderlyAlerts: string[] = [];
    if (patient.age >= 65) {
      prescription.forEach(p => {
        const name = p.drug.name.toLowerCase();
        if (name.includes('diazepam') || name.includes('alprazolam') || name.includes('lorazepam')) {
          elderlyAlerts.push(`Kriteria Beers: ${p.drug.name} (Benzodiazepin) tingkatkan risiko jatuh & gangguan kognitif lansia.`);
        }
        if (name.includes('ibuprofen') || name.includes('ketorolac') || name.includes('meloxicam')) {
          elderlyAlerts.push(`Kriteria Beers: OAINS (${p.drug.name}) tingkatkan risiko perdarahan lambung & penurunan fungsi ginjal lansia.`);
        }
      });
    }

    const renalAlerts: string[] = [];
    if (patient.enableRenalCheck && patient.crCl < 60) {
      prescription.forEach(p => {
        const name = p.drug.name.toLowerCase();
        if (name.includes('metformin') && patient.crCl < 30) {
          renalAlerts.push(`Kontraindikasi Ginjal: Metformin dikontraindikasikan pada CrCl <30 mL/min (Risiko Asidosis Laktat).`);
        }
        if (name.includes('allopurinol') || name.includes('captopril') || name.includes('gabapentin')) {
          renalAlerts.push(`Penyesuaian Dosis Ginjal: ${p.drug.name} memerlukan penurunan dosis pada CrCl ${patient.crCl} mL/min.`);
        }
      });
    }

    return { count, level, color, badge, pregnancyAlerts, hepaticAlerts, elderlyAlerts, renalAlerts };
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

  const scheduleTimeline = useMemo(() => {
    const slots = [
      { time: '06:00', label: 'Pagi Hari (Perut Kosong)', icon: Sunrise },
      { time: '08:00', label: 'Pagi Hari (Sarapan Pagi)', icon: Sun },
      { time: '12:00', label: 'Siang Hari (Makan Siang)', icon: Sun },
      { time: '14:00', label: 'Siang / Sore (Tiap 8 Jam)', icon: Sun },
      { time: '18:00', label: 'Malam Hari (Makan Malam)', icon: Sunset },
      { time: '20:00', label: 'Malam Hari (Tiap 12 Jam)', icon: Moon },
      { time: '21:00', label: 'Sebelum Tidur Malam', icon: Moon },
      { time: '22:00', label: 'Malam Hari (Tiap 8 Jam)', icon: Moon }
    ];

    return slots.map(slot => {
      const assignedDrugs = prescription.filter(p => p.preferredTimes.includes(slot.time));
      return { ...slot, drugs: assignedDrugs };
    }).filter(slot => slot.drugs.length > 0 || slot.time === '08:00' || slot.time === '12:00' || slot.time === '18:00' || slot.time === '21:00');
  }, [prescription]);

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
            <p><strong>Usia / Gender:</strong> {patient.age} Thn / {patient.gender}</p>
            <p><strong>BB / TB:</strong> {patient.weightKg} kg / {patient.heightCm} cm</p>
            <p><strong>Komorbiditas:</strong> {patient.comorbidities.join(', ') || 'Tidak Ada'}</p>
          </div>
          <div>
            <p><strong>Fungsi Ginjal (CrCl):</strong> <span className="font-bold text-teal-800">{patient.enableRenalCheck ? `${patient.crCl} mL/min` : 'Normal (OFF)'}</span></p>
            <p><strong>Fungsi Hati:</strong> <span className="font-bold text-amber-900">{patient.hepaticFunction}</span></p>
            {patient.gender === 'Perempuan' && <p><strong>Status Hamil:</strong> {patient.pregnancyStatus} {patient.isLactating ? '(Menyusui)' : ''}</p>}
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
        <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#143d47] relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                <Stethoscope className="w-4 h-4 text-teal-400" />
                <span>Modul Evaluasi Klinis & Penapisan Polifarmasi 2026</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Evaluasi Klinis & Penapisan Polifarmasi Pasien</h1>
              <p className="text-teal-100/80 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
                Skrining parameter klinis, evaluasi kecocokan dosis, deteksi bahaya polifarmasi, generator jadwal pemberian obat harian, serta interaksi obat dengan makanan & gaya hidup.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {onOpenBrandingModal && (
                <button
                  onClick={onOpenBrandingModal}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 shadow-lg transition-colors flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4 text-amber-400" />
                  <span>Kop & Stempel</span>
                </button>
              )}
              <button
                onClick={handlePrintReport}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Lembar Evaluasi (1 Halaman)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid Utama 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Kolom Kiri (1/3): Parameter Klinis Pasien */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <User className="w-5 h-5 text-teal-600" />
                <span>Parameter Klinis Pasien</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                Profil Pasien
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Pasien</label>
                <input
                  type="text"
                  value={patient.name}
                  onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Usia (Tahun)</label>
                  <input
                    type="number"
                    value={patient.age}
                    onChange={(e) => setPatient({ ...patient, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jenis Kelamin</label>
                  <select
                    value={patient.gender}
                    onChange={(e) => setPatient({ ...patient, gender: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Berat Badan (kg)</label>
                  <input
                    type="number"
                    value={patient.weightKg}
                    onChange={(e) => setPatient({ ...patient, weightKg: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    value={patient.heightCm}
                    onChange={(e) => setPatient({ ...patient, heightCm: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Fitur ON / OFF Penyesuaian Fungsi Ginjal */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-teal-600" />
                    <span>Skrining Penyesuaian Ginjal</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setPatient({ ...patient, enableRenalCheck: !patient.enableRenalCheck })}
                    className={`px-3 py-1 rounded-full font-bold text-[10px] transition-all flex items-center gap-1 ${
                      patient.enableRenalCheck 
                        ? 'bg-teal-600 text-white shadow-2xs' 
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {patient.enableRenalCheck ? 'ON (Evaluasi Ginjal)' : 'OFF (Normal)'}
                  </button>
                </div>

                {patient.enableRenalCheck ? (
                  <div className="pt-1 space-y-1">
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
                    <p className="text-[10px] text-slate-500 italic">
                      {patient.crCl < 30 ? '🔴 Gangguan Ginjal Berat (CrCl <30)' : patient.crCl < 60 ? '🟡 Gangguan Ginjal Sedang (CrCl 30-59)' : '🟢 Fungsi Ginjal Normal / Ringan (CrCl ≥60)'}
                    </p>
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 italic">
                    Fungsi ginjal dianggap Normal (CrCl ≥90 mL/min).
                  </p>
                )}
              </div>

              {/* FUNGSI HATI (Klinis Hepar) */}
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-1.5">
                <label className="font-bold text-amber-950 block text-xs flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <span>Evaluasi Fungsi Hati (Hepar)</span>
                </label>
                <select
                  value={patient.hepaticFunction}
                  onChange={(e) => setPatient({ ...patient, hepaticFunction: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 font-bold text-amber-950 text-xs focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="Normal">Normal (Fungsi Hati Sehat)</option>
                  <option value="Gangguan Ringan (Child-Pugh A)">Gangguan Ringan (Child-Pugh A)</option>
                  <option value="Gangguan Berat (Child-Pugh B/C)">Gangguan Berat (Child-Pugh B/C)</option>
                </select>
              </div>

              {/* Kondisi Hamil / Menyusui */}
              {patient.gender === 'Perempuan' && (
                <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-200 space-y-2">
                  <span className="font-bold text-pink-900 text-xs flex items-center gap-1.5">
                    <Baby className="w-4 h-4 text-pink-600" />
                    <span>Kondisi Kehamilan & Menyusui</span>
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
                        className={`w-full py-1 text-xs font-bold rounded-lg border transition-all ${
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

              {/* Komorbiditas & Kondisi Medis Pasien */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="font-bold text-slate-800 block text-[11px] flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Komorbiditas & Kondisi Medis Pasien</span>
                </span>

                <div className="grid grid-cols-2 gap-1.5">
                  {COMORBIDITY_OPTIONS.map((item, idx) => {
                    const checked = patient.comorbidities.includes(item);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleToggleComorbidity(item)}
                        className={`p-2 rounded-xl text-[11px] font-bold text-left transition-all flex items-center justify-between border ${
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
                  <ShieldAlert className="w-6 h-6" />
                  <h3 className="text-base font-extrabold">Evaluasi Risiko Polifarmasi & Klinis</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-white shadow-2xs border">
                  {polypharmacyStatus.badge}
                </span>
              </div>

              <p className="text-xs leading-relaxed font-medium">
                Pasien saat ini mengonsumsi <strong>{polypharmacyStatus.count} macam obat</strong>. 
                {polypharmacyStatus.count >= 5 && ' Perlu dilakukan pemantauan ketat terhadap efek samping interaksi obat dan kepatuhan minum obat.'}
              </p>

              {/* Peringatan Kehamilan, Hati, Beers Criteria atau Ginjal */}
              {(polypharmacyStatus.pregnancyAlerts.length > 0 || polypharmacyStatus.hepaticAlerts.length > 0 || polypharmacyStatus.elderlyAlerts.length > 0 || polypharmacyStatus.renalAlerts.length > 0) && (
                <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-xs">
                  {polypharmacyStatus.pregnancyAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-rose-950 font-bold bg-white/80 p-2.5 rounded-xl border border-rose-300 shadow-2xs">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}
                  {polypharmacyStatus.hepaticAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-amber-950 font-bold bg-white/80 p-2.5 rounded-xl border border-amber-300 shadow-2xs">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}
                  {polypharmacyStatus.elderlyAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-rose-950 font-bold bg-white/70 p-2 rounded-xl border border-rose-200">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}
                  {polypharmacyStatus.renalAlerts.map((alt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-amber-950 font-bold bg-white/70 p-2 rounded-xl border border-amber-200">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{alt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Tambah Obat & Daftar Resep Pasien */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                  <Pill className="w-5 h-5 text-teal-600" />
                  <span>Resep / Daftar Obat Pasien</span>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  Total: {prescription.length} Obat
                </span>
              </div>

              {/* Input Form Tambah Obat */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                
                {/* Dropdown Pilih Nama Obat */}
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Pilih Nama Obat</label>
                  <select
                    value={selectedDrugId}
                    onChange={(e) => {
                      setSelectedDrugId(e.target.value);
                      setIsManualDoseInput(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    {allDrugs.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.genericName})</option>
                    ))}
                  </select>
                </div>

                {/* Dosis Sediaan Disesuaikan Presisi (Dropdown / Custom Input) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700 block">Dosis Sediaan Obat</label>
                    <button
                      type="button"
                      onClick={() => setIsManualDoseInput(!isManualDoseInput)}
                      className="text-[10px] text-teal-700 font-bold hover:underline flex items-center gap-0.5"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{isManualDoseInput ? 'Pilihan' : 'Ketik Manual'}</span>
                    </button>
                  </div>

                  {!isManualDoseInput ? (
                    <select
                      value={customDose}
                      onChange={(e) => setCustomDose(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 bg-white"
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
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 bg-white"
                    />
                  )}
                </div>

                {/* Frekuensi Dropdown */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Frekuensi Pemberian</label>
                  <select
                    value={customFreqLabel}
                    onChange={(e) => setCustomFreqLabel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 bg-white text-[11px]"
                  >
                    {FREQUENCY_OPTIONS.map((f, idx) => (
                      <option key={idx} value={f.label}>{f.label}</option>
                    ))}
                  </select>
                </div>

                {/* Waktu Minum Terhadap Makanan */}
                <div className="sm:col-span-3">
                  <label className="font-bold text-slate-700 block mb-1">Waktu Minum Terhadap Makanan</label>
                  <select
                    value={customTiming}
                    onChange={(e) => setCustomTiming(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="Sesudah Makan">Sesudah Makan</option>
                    <option value="Sebelum Makan">Sebelum Makan (30-60 menit)</option>
                    <option value="Bersama Makanan">Bersama Makanan / Sesaat Setelah Makan</option>
                    <option value="Perut Kosong">Perut Kosong (1 jam sebelum / 2 jam sesudah makan)</option>
                    <option value="Bebas">Bebas / Bebas Jam</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleAddDrug}
                    className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Obat</span>
                  </button>
                </div>
              </div>

              {/* List Resep Pasien */}
              <div className="space-y-2.5 text-xs">
                {prescription.map((p, idx) => (
                  <div key={p.id} className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-teal-300 flex items-center justify-between gap-3 shadow-2xs transition-all">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-teal-100 text-teal-800 font-black flex items-center justify-center text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{p.drug.name}</h4>
                        <p className="text-slate-500 text-[11px]">
                          Generik: {p.drug.genericName} • Golongan: {p.drug.category}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="bg-slate-100 font-bold text-slate-700 px-2 py-0.5 rounded-md text-[10px]">
                            Dosis: {p.dose}
                          </span>
                          <span className="bg-teal-50 text-teal-800 border border-teal-200 font-bold px-2 py-0.5 rounded-md text-[10px]">
                            {p.frequency}
                          </span>
                          <span className="bg-amber-50 font-bold text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md text-[10px] flex items-center gap-1">
                            <Utensils className="w-3 h-3 text-amber-600" />
                            <span>{p.foodTiming}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveDrug(p.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
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
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <Clock className="w-5 h-5 text-teal-600" />
              <span>Generator Jadwal & Waktu Pemberian Obat Harian (24 Jam Harmonized)</span>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Penataan Jam Pemberian Presisi Sesuai Frekuensi
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {scheduleTimeline.map((slot, idx) => {
              const IconComp = slot.icon;
              return (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                      <div className="flex items-center gap-1.5 font-black text-slate-900 text-sm">
                        <IconComp className="w-4 h-4 text-teal-600" />
                        <span>{slot.time}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{slot.label}</span>
                    </div>

                    <div className="space-y-2 pt-2">
                      {slot.drugs.length > 0 ? (
                        slot.drugs.map((d) => (
                          <div key={d.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                            <p className="font-extrabold text-slate-900">{d.drug.name}</p>
                            <p className="text-[10px] font-semibold text-slate-600">{d.dose}</p>
                            <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                              {d.foodTiming}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-slate-400 italic text-center py-4">
                          Bebas obat pada jam ini
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION: Interaksi Obat dengan Makanan, Minuman & Gaya Hidup */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <Utensils className="w-5 h-5 text-amber-600" />
              <span>Interaksi Obat dengan Makanan, Minuman & Gaya Hidup</span>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Penyesuaian Nutrisi Pasien
            </span>
          </div>

          {lifestyleInteractions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {lifestyleInteractions.map((item, idx) => (
                <div key={idx} className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">{item.drugName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                      Kategori: {item.category}
                    </span>
                  </div>
                  <p className="text-amber-950 font-medium leading-relaxed">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs italic">
              Tidak ditemukan bahaya interaksi obat spesifik dengan makanan/minuman/rokok untuk resep saat ini.
            </div>
          )}
        </div>

        {/* SECTION: Interaksi Antar Obat (Drug-Drug Interactions) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Deteksi Interaksi Antar Obat (Drug-Drug Interactions)</span>
            </div>
            <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              {matchedDrugInteractions.length} Interaksi Terdeteksi
            </span>
          </div>

          {matchedDrugInteractions.length > 0 ? (
            <div className="space-y-3 text-xs">
              {matchedDrugInteractions.map((inter, idx) => (
                <div key={idx} className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-rose-950 text-sm">
                      {inter.drugA} ↔ {inter.drugB}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-900">
                      Tingkat Keparahan: {inter.severity}
                    </span>
                  </div>
                  <p className="text-rose-900 font-medium leading-relaxed">
                    {inter.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-emerald-700 font-bold text-xs">
              ✅ Tidak terdeteksi kontraindikasi / interaksi obat berbahaya antar obat yang ada dalam resep ini.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
