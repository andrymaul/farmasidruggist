import React, { useState, useMemo } from 'react';
import { 
  PEDIATRIC_DRUGS_DATABASE, 
  PediatricDrugProfile, 
  estimateChildWeightKg, 
  calculateMostellerBSA, 
  calculateClassicFormulas 
} from '../data/pediatricDosingData';
import { Drug } from '../types';
import { 
  Calculator, 
  Baby, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Copy, 
  Check, 
  Printer, 
  Share2, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Scale, 
  Pill, 
  FlaskConical, 
  Clock, 
  ShieldAlert, 
  ChevronRight,
  HelpCircle,
  FileText
} from 'lucide-react';

interface CompoundingItem {
  id: string;
  drugId?: string;
  customName: string;
  dosePerPacketMg: number;
  tabletStrengthMg: number;
  tabletWeightMg: number; // approximate weight of whole tablet in mg (default: 200-500mg)
  category?: string;
}

interface PediatricCompoundingCalculatorProps {
  onCheckInteractions?: (drugNames: string[]) => void;
  existingDrugs?: Drug[];
}

export const PediatricCompoundingCalculator: React.FC<PediatricCompoundingCalculatorProps> = ({
  onCheckInteractions,
  existingDrugs = []
}) => {
  // Navigation tabs
  const [activeSubTab, setActiveSubTab] = useState<'quick' | 'compounding' | 'syrup' | 'classic'>('quick');

  // Patient Profile state
  const [ageYears, setAgeYears] = useState<number>(3);
  const [ageMonths, setAgeMonths] = useState<number>(6);
  const [weightKg, setWeightKg] = useState<number>(14);
  const [heightCm, setHeightCm] = useState<number>(95);
  const [patientName, setPatientName] = useState<string>('An. Rahmat (3.5 th)');
  const [isAutoWeight, setIsAutoWeight] = useState<boolean>(false);

  // Quick Calculator state (Tab 1)
  const [selectedDrugId, setSelectedDrugId] = useState<string>('ped-paracetamol');
  const [quickCustomMgPerKg, setQuickCustomMgPerKg] = useState<number>(10);
  const [quickFrequency, setQuickFrequency] = useState<number>(3);
  const [quickSelectedFormulationIndex, setQuickSelectedFormulationIndex] = useState<number>(1);

  // Compounding Puyer state (Tab 2)
  const [packetCount, setPacketCount] = useState<number>(12);
  const [signaText, setSignaText] = useState<string>('3 x sehari 1 bungkus sesudah makan');
  const [targetWeightPerPacketMg, setTargetWeightPerPacketMg] = useState<number>(300); // 300 mg per puyer
  const [fillerType, setFillerType] = useState<string>('Saccharum Lactis (SL / Gula Susu)');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Compounding items (initial preset: Paracetamol + Salbutamol + CTM + Ambroxol)
  const [compoundingItems, setCompoundingItems] = useState<CompoundingItem[]>([
    {
      id: 'comp-1',
      drugId: 'ped-paracetamol',
      customName: 'Paracetamol',
      dosePerPacketMg: 120,
      tabletStrengthMg: 500,
      tabletWeightMg: 550,
      category: 'Antipiretik'
    },
    {
      id: 'comp-2',
      drugId: 'ped-salbutamol',
      customName: 'Salbutamol',
      dosePerPacketMg: 0.5,
      tabletStrengthMg: 2,
      tabletWeightMg: 150,
      category: 'Bronkodilator'
    },
    {
      id: 'comp-3',
      drugId: 'ped-ambroxol',
      customName: 'Ambroxol',
      dosePerPacketMg: 7.5,
      tabletStrengthMg: 30,
      tabletWeightMg: 180,
      category: 'Mukolitik'
    },
    {
      id: 'comp-4',
      drugId: 'ped-ctm',
      customName: 'CTM (Chlorpheniramine)',
      dosePerPacketMg: 0.5,
      tabletStrengthMg: 4,
      tabletWeightMg: 120,
      category: 'Antihistamin'
    }
  ]);

  // Syrup Calculator state (Tab 3)
  const [syrupDrugId, setSyrupDrugId] = useState<string>('ped-amoxicillin');
  const [syrupFormulationIndex, setSyrupFormulationIndex] = useState<number>(0);
  const [syrupDurationDays, setSyrupDurationDays] = useState<number>(5);
  const [syrupFrequency, setSyrupFrequency] = useState<number>(3);
  const [syrupCustomDoseMg, setSyrupCustomDoseMg] = useState<number>(150);

  // Classic Formulas state (Tab 4)
  const [classicAdultDoseMg, setClassicAdultDoseMg] = useState<number>(500);
  const [classicDrugName, setClassicDrugName] = useState<string>('Paracetamol 500 mg');

  // Computed values
  const totalAgeMonths = useMemo(() => ageYears * 12 + ageMonths, [ageYears, ageMonths]);
  const calculatedBSA = useMemo(() => calculateMostellerBSA(heightCm, weightKg), [heightCm, weightKg]);
  const estimatedWeight = useMemo(() => estimateChildWeightKg(ageYears, ageMonths), [ageYears, ageMonths]);

  // Handle auto-weight estimation
  const handleApplyEstimatedWeight = () => {
    setWeightKg(Math.round(estimatedWeight * 10) / 10);
  };

  // Selected drug for Quick tab
  const currentDrug = useMemo(() => {
    return PEDIATRIC_DRUGS_DATABASE.find(d => d.id === selectedDrugId) || PEDIATRIC_DRUGS_DATABASE[0];
  }, [selectedDrugId]);

  // Quick Dose Calculations
  const quickCalculations = useMemo(() => {
    let singleDoseMg = 0;
    let dailyDoseMg = 0;

    if (currentDrug.dosingType === 'per_kg_per_dose') {
      singleDoseMg = quickCustomMgPerKg * weightKg;
      dailyDoseMg = singleDoseMg * quickFrequency;
    } else if (currentDrug.dosingType === 'per_kg_per_day') {
      dailyDoseMg = quickCustomMgPerKg * weightKg;
      singleDoseMg = dailyDoseMg / quickFrequency;
    } else {
      // fixed by age / weight
      singleDoseMg = quickCustomMgPerKg;
      dailyDoseMg = singleDoseMg * quickFrequency;
    }

    // Safety checks
    const isExceedingMaxDaily = currentDrug.maxDailyDoseMg ? dailyDoseMg > currentDrug.maxDailyDoseMg : false;
    const isExceedingMaxSingle = currentDrug.maxSingleDoseMg ? singleDoseMg > currentDrug.maxSingleDoseMg : false;

    // Formulation calculations
    const activeFormulation = currentDrug.formulations[quickSelectedFormulationIndex] || currentDrug.formulations[0];
    let liquidVolumeMlPerDose = 0;
    let householdMeasure = '';

    if (activeFormulation && activeFormulation.volumePerUnit && activeFormulation.volumePerUnit > 0) {
      liquidVolumeMlPerDose = (singleDoseMg / activeFormulation.strengthPerUnit) * activeFormulation.volumePerUnit;
      
      if (activeFormulation.form === 'drops') {
        const drops = Math.round(liquidVolumeMlPerDose * 20); // ~20 drops/mL standard pipet
        householdMeasure = `${liquidVolumeMlPerDose.toFixed(2)} mL (~${drops} tetes / pipet terkalibrasi)`;
      } else {
        const tspCount = liquidVolumeMlPerDose / 5;
        if (Math.abs(tspCount - 1) < 0.1) householdMeasure = `1 sendok teh (5 mL / 1 cth)`;
        else if (Math.abs(tspCount - 0.5) < 0.1) householdMeasure = `1/2 sendok teh (2.5 mL / 1/2 cth)`;
        else if (Math.abs(tspCount - 1.5) < 0.1) householdMeasure = `1 1/2 sendok teh (7.5 mL / 1 1/2 cth)`;
        else if (Math.abs(tspCount - 2) < 0.1) householdMeasure = `2 sendok teh (10 mL / 2 cth)`;
        else householdMeasure = `${liquidVolumeMlPerDose.toFixed(1)} mL (gunakan gelas takar / spuit oral)`;
      }
    }

    return {
      singleDoseMg: Math.round(singleDoseMg * 10) / 10,
      dailyDoseMg: Math.round(dailyDoseMg * 10) / 10,
      isExceedingMaxDaily,
      isExceedingMaxSingle,
      activeFormulation,
      liquidVolumeMlPerDose: Math.round(liquidVolumeMlPerDose * 100) / 100,
      householdMeasure
    };
  }, [currentDrug, quickCustomMgPerKg, weightKg, quickFrequency, quickSelectedFormulationIndex]);

  // Compounding calculations (Tab 2)
  const compoundingResults = useMemo(() => {
    let totalActiveMedicinesWeightMg = 0;

    const itemsSummary = compoundingItems.map(item => {
      const totalMgNeeded = item.dosePerPacketMg * packetCount;
      const rawTablets = totalMgNeeded / item.tabletStrengthMg;
      const roundedHalfTablets = Math.round(rawTablets * 2) / 2; // rounded to nearest 0.5 tablet
      const roundedWholeTablets = Math.ceil(rawTablets);
      const actualDosePerPacket = (roundedHalfTablets * item.tabletStrengthMg) / packetCount;
      const doseDeviationPercent = Math.round(((actualDosePerPacket - item.dosePerPacketMg) / item.dosePerPacketMg) * 100);

      // Estimated powder weight contributed by tablets
      const itemPowderWeight = roundedHalfTablets * (item.tabletWeightMg || item.tabletStrengthMg * 1.2);
      totalActiveMedicinesWeightMg += itemPowderWeight;

      return {
        ...item,
        totalMgNeeded,
        rawTablets: Math.round(rawTablets * 100) / 100,
        roundedHalfTablets,
        roundedWholeTablets,
        actualDosePerPacket: Math.round(actualDosePerPacket * 100) / 100,
        doseDeviationPercent,
        itemPowderWeight
      };
    });

    const targetTotalPowderWeightMg = targetWeightPerPacketMg * packetCount;
    const saccharumLactisNeededMg = Math.max(0, targetTotalPowderWeightMg - totalActiveMedicinesWeightMg);
    const fillerPerPacketMg = saccharumLactisNeededMg / packetCount;

    return {
      itemsSummary,
      totalActiveMedicinesWeightMg: Math.round(totalActiveMedicinesWeightMg),
      targetTotalPowderWeightMg,
      saccharumLactisNeededMg: Math.round(saccharumLactisNeededMg),
      fillerPerPacketMg: Math.round(fillerPerPacketMg),
      isPowderOverflow: totalActiveMedicinesWeightMg > targetTotalPowderWeightMg
    };
  }, [compoundingItems, packetCount, targetWeightPerPacketMg]);

  // Syrup calculations (Tab 3)
  const syrupDrug = useMemo(() => {
    return PEDIATRIC_DRUGS_DATABASE.find(d => d.id === syrupDrugId) || PEDIATRIC_DRUGS_DATABASE[0];
  }, [syrupDrugId]);

  const syrupResults = useMemo(() => {
    const activeForm = syrupDrug.formulations[syrupFormulationIndex] || syrupDrug.formulations[0];
    const strengthMg = activeForm.strengthPerUnit;
    const unitMl = activeForm.volumePerUnit || 5;
    const bottleSize = activeForm.bottleSizeMl || 60;

    const mlPerDose = (syrupCustomDoseMg / strengthMg) * unitMl;
    const totalDoses = syrupFrequency * syrupDurationDays;
    const totalMlNeeded = mlPerDose * totalDoses;
    const bottlesRequired = Math.ceil(totalMlNeeded / bottleSize);
    const remainderMl = (bottlesRequired * bottleSize) - totalMlNeeded;

    let spoonText = '';
    const tspCount = mlPerDose / 5;
    if (Math.abs(tspCount - 0.5) < 0.05) spoonText = '1/2 sendok teh (2.5 mL / 1/2 cth)';
    else if (Math.abs(tspCount - 1) < 0.05) spoonText = '1 sendok teh (5 mL / 1 cth)';
    else if (Math.abs(tspCount - 1.5) < 0.05) spoonText = '1 1/2 sendok teh (7.5 mL / 1 1/2 cth)';
    else if (Math.abs(tspCount - 2) < 0.05) spoonText = '2 sendok teh (10 mL / 2 cth)';
    else if (Math.abs(tspCount - 3) < 0.05) spoonText = '1 sendok makan (15 mL / 1 C)';
    else spoonText = `${mlPerDose.toFixed(1)} mL (gunakan gelas takar / spuit oral)`;

    return {
      activeForm,
      mlPerDose: Math.round(mlPerDose * 100) / 100,
      totalDoses,
      totalMlNeeded: Math.round(totalMlNeeded * 10) / 10,
      bottlesRequired,
      remainderMl: Math.round(remainderMl * 10) / 10,
      spoonText,
      budDays: activeForm.budAfterOpenDays || 30
    };
  }, [syrupDrug, syrupFormulationIndex, syrupCustomDoseMg, syrupFrequency, syrupDurationDays]);

  // Classic Formulas calculation (Tab 4)
  const classicResults = useMemo(() => {
    return calculateClassicFormulas(classicAdultDoseMg, ageYears, ageMonths, weightKg, heightCm);
  }, [classicAdultDoseMg, ageYears, ageMonths, weightKg, heightCm]);

  // Add Item to Compounding
  const handleAddCompoundingItem = () => {
    const newItem: CompoundingItem = {
      id: `comp-${Date.now()}`,
      customName: 'Obat Baru',
      dosePerPacketMg: 10,
      tabletStrengthMg: 100,
      tabletWeightMg: 150,
      category: 'Lainnya'
    };
    setCompoundingItems([...compoundingItems, newItem]);
  };

  // Remove Item from Compounding
  const handleRemoveCompoundingItem = (id: string) => {
    setCompoundingItems(compoundingItems.filter(item => item.id !== id));
  };

  // Update item in compounding
  const handleUpdateCompoundingItem = (id: string, field: keyof CompoundingItem, value: any) => {
    setCompoundingItems(compoundingItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Copy to Clipboard helper
  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(label);
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  // Export to WhatsApp text
  const generateWhatsAppLabelText = () => {
    let text = `📋 *ETIKET RESEP RACIKAN PUYER ANAK*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `👤 *Pasien*: ${patientName}\n`;
    text += `👶 *Usia*: ${ageYears} th ${ageMonths} bln | *BB*: ${weightKg} kg\n`;
    text += `📦 *Jumlah*: ${packetCount} bungkus puyer\n`;
    text += `⏰ *Aturan Pakai*: ${signaText}\n\n`;
    text += `🧪 *Komposisi per Bungkus*:\n`;
    compoundingResults.itemsSummary.forEach((item, idx) => {
      text += `${idx + 1}. ${item.customName}: ${item.dosePerPacketMg} mg\n`;
    });
    text += `\n💡 *Instruksi Pemberian*:\n`;
    text += `• Larutkan 1 bungkus puyer dengan sedikit air hangat atau air gula/madu (pada anak >1 tahun).\n`;
    text += `• Simpan puyer di tempat kering, sejuk, dan terlindung dari sinar matahari langsung.\n`;
    text += `• Masa simpan aman (BUD): Maksimal 30 hari pasca peracikan.\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🏥 _Farmasi Klinis & Apotek Digital_`;
    return text;
  };

  // Check Interactions of compounded drugs
  const handleCheckCompoundedInteractions = () => {
    if (onCheckInteractions) {
      const drugNames = compoundingItems.map(item => item.customName);
      onCheckInteractions(drugNames);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none">
          <Baby className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-100 backdrop-blur-md border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              Modul Farmasi Klinis & Peracikan Resep
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
              BPOM & Standar Farmakope
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Kalkulator Dosis Pediatrik & Konversi Racikan Puyer / Sirup
          </h1>
          <p className="mt-2 text-emerald-100 text-sm md:text-base leading-relaxed">
            Hitung dosis anak berbasis berat badan/BSA, konversi racikan tablet utuh ke puyer dengan penambahan zat pengisi (*Saccharum Lactis*), perhitungan takaran sirup/drops, dan skrining batas dosis toksik.
          </p>
        </div>
      </div>

      {/* PATIENT PROFILE CARD */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Profil Pasien Pediatrik</h2>
              <p className="text-xs text-slate-400">Parameter acuan perhitungan dosis terapeutik anak</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyEstimatedWeight}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition border border-slate-700"
              title="Gunakan estimasi rumus Weech / WHO berdasarkan usia"
            >
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              Gunakan Estimasi BB ({estimatedWeight.toFixed(1)} kg)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Nama Pasien</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              placeholder="cth. An. Rahmat"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Usia (Tahun & Bulan)</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="18"
                  value={ageYears}
                  onChange={(e) => setAgeYears(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-500">th</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={ageMonths}
                  onChange={(e) => setAgeMonths(Math.max(0, Math.min(11, parseInt(e.target.value) || 0)))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-500">bln</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Berat Badan (kg) <span className="text-emerald-400 font-bold">*Wajib</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="1"
                max="100"
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
              <span className="absolute right-3 top-2 text-xs text-slate-500">kg</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Tinggi Badan (cm)</label>
            <div className="relative">
              <input
                type="number"
                min="30"
                max="200"
                value={heightCm}
                onChange={(e) => setHeightCm(Math.max(30, parseInt(e.target.value) || 30))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              <span className="absolute right-3 top-2 text-xs text-slate-500">cm</span>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-center">
            <span className="text-[11px] text-slate-400 font-medium">Luas Permukaan Tubuh (BSA):</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base font-extrabold text-cyan-400">{calculatedBSA.toFixed(2)}</span>
              <span className="text-xs text-slate-500">m² (Mosteller)</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveSubTab('quick')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition ${
            activeSubTab === 'quick'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Kalkulator Dosis Cepat
        </button>

        <button
          onClick={() => setActiveSubTab('compounding')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition ${
            activeSubTab === 'compounding'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          Kalkulator Racikan Puyer & Kapsul
          <span className="ml-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/30 text-amber-300 border border-amber-500/30">
            Resep Racik
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('syrup')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition ${
            activeSubTab === 'syrup'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Pill className="w-4 h-4" />
          Kalkulator Sirup & Botol
        </button>

        <button
          onClick={() => setActiveSubTab('classic')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition ${
            activeSubTab === 'classic'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Scale className="w-4 h-4" />
          Rumus Klasik (Young/Dilling/Fried)
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: KALKULATOR DOSIS CEPAT */}
      {/* ========================================================================= */}
      {activeSubTab === 'quick' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Pill className="w-4 h-4 text-emerald-400" />
                Pilih Obat Pediatrik
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Obat Anak Indonesia (Database BPOM)</label>
                  <select
                    value={selectedDrugId}
                    onChange={(e) => {
                      setSelectedDrugId(e.target.value);
                      const target = PEDIATRIC_DRUGS_DATABASE.find(d => d.id === e.target.value);
                      if (target) {
                        setQuickCustomMgPerKg(target.singleDoseMinMgPerKg || target.standardDoseMgPerKgPerDay || 10);
                        setQuickFrequency(target.defaultFrequencyPerDay);
                        setQuickSelectedFormulationIndex(0);
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500"
                  >
                    {PEDIATRIC_DRUGS_DATABASE.map(drug => (
                      <option key={drug.id} value={drug.id}>
                        {drug.name} ({drug.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dosing Slider & Input */}
                <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-300">
                      {currentDrug.dosingType === 'per_kg_per_dose' ? 'Dosis per Kali Minum:' : 'Dosis Harian Total:'}
                    </label>
                    <span className="text-sm font-bold text-emerald-400">
                      {quickCustomMgPerKg} {currentDrug.dosingType === 'fixed_by_age' ? 'mg/dosis' : 'mg/kgBB'}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={currentDrug.minDoseMgPerKgPerDay || currentDrug.singleDoseMinMgPerKg || 1}
                    max={currentDrug.maxDoseMgPerKgPerDay || currentDrug.singleDoseMaxMgPerKg || 50}
                    step={currentDrug.singleDoseMinMgPerKg && currentDrug.singleDoseMinMgPerKg < 1 ? 0.05 : 1}
                    value={quickCustomMgPerKg}
                    onChange={(e) => setQuickCustomMgPerKg(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>Min: {currentDrug.minDoseMgPerKgPerDay || currentDrug.singleDoseMinMgPerKg || 1}</span>
                    <span>Standar Dosis: {currentDrug.singleDoseMinMgPerKg ? `${currentDrug.singleDoseMinMgPerKg} - ${currentDrug.singleDoseMaxMgPerKg}` : `${currentDrug.minDoseMgPerKgPerDay} - ${currentDrug.maxDoseMgPerKgPerDay}`} mg/kg</span>
                    <span>Maks: {currentDrug.maxDoseMgPerKgPerDay || currentDrug.singleDoseMaxMgPerKg || 50}</span>
                  </div>
                </div>

                {/* Frequency selection */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Frekuensi Pemberian</label>
                  <select
                    value={quickFrequency}
                    onChange={(e) => setQuickFrequency(parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {currentDrug.frequencyOptions.map((opt, idx) => (
                      <option key={idx} value={opt.timesPerDay}>
                        {opt.label} ({opt.timesPerDay}x sehari)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sediaan Komersial */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Pilihan Bentuk Sediaan Komersial</label>
                  <select
                    value={quickSelectedFormulationIndex}
                    onChange={(e) => setQuickSelectedFormulationIndex(parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {currentDrug.formulations.map((form, idx) => (
                      <option key={idx} value={idx}>
                        {form.name} ({form.unitLabel})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hasil Perhitungan Terapi Anak</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  BB: {weightKg} kg | Usia: {ageYears} th {ageMonths} bln
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs text-slate-400 font-medium">Dosis Per Kali Minum</span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-black text-emerald-400">{quickCalculations.singleDoseMg}</span>
                    <span className="text-sm font-semibold text-slate-400">mg / kali</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Diberikan {quickFrequency}x sehari (Tiap {24 / quickFrequency} jam)
                  </span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs text-slate-400 font-medium">Total Dosis Harian</span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-black text-cyan-400">{quickCalculations.dailyDoseMg}</span>
                    <span className="text-sm font-semibold text-slate-400">mg / 24 jam</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Batas Maksimum: {currentDrug.maxDailyDoseMg ? `${currentDrug.maxDailyDoseMg} mg/hari` : 'Sesuai BB'}
                  </span>
                </div>
              </div>

              {/* Liquid Volume Conversion if available */}
              {quickCalculations.liquidVolumeMlPerDose > 0 && (
                <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4 my-4">
                  <div className="flex items-center gap-2 mb-1.5 text-emerald-300 text-xs font-bold">
                    <FlaskConical className="w-4 h-4" />
                    Konversi Takaran Sediaan Cair ({quickCalculations.activeFormulation.name}):
                  </div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-2xl font-black text-white">
                      {quickCalculations.liquidVolumeMlPerDose} mL
                    </span>
                    <span className="text-sm font-semibold text-emerald-300">
                      = {quickCalculations.householdMeasure}
                    </span>
                  </div>
                </div>
              )}

              {/* Safety & Warning Alerts */}
              {(quickCalculations.isExceedingMaxDaily || quickCalculations.isExceedingMaxSingle) ? (
                <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 mt-3">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">PERINGATAN: Dosis Melebihi Batas Keamanan Pediatrik!</span>
                    <p className="mt-0.5 text-rose-300">
                      Dosis yang dihitung melebihi batas maksimum harian ({currentDrug.maxDailyDoseMg} mg). Harap turunkan dosis atau frekuensi pemberian.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs flex items-center gap-2 mt-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Dosis berada dalam rentang terapi aman standar BPOM & Drugs.com.</span>
                </div>
              )}

              {/* Administration & Red Flags */}
              <div className="mt-5 pt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-slate-300">
                  <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200">Cara Pemberian: </span>
                    {currentDrug.administrationNotes}
                  </div>
                </div>

                {currentDrug.redFlags && currentDrug.redFlags.length > 0 && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 space-y-1">
                    <span className="font-bold flex items-center gap-1.5 text-amber-300">
                      <ShieldAlert className="w-3.5 h-3.5" /> Perhatian Klinis:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-200/90 pl-1">
                      {currentDrug.redFlags.map((flag, idx) => (
                        <li key={idx}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: KALKULATOR RACIKAN PUYER & KAPSUL */}
      {/* ========================================================================= */}
      {activeSubTab === 'compounding' && (
        <div className="space-y-6">
          {/* Recipe Configuration Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Formulator Resep Racikan Puyer / Kapsul</h3>
                  <p className="text-xs text-slate-400">Konversi tablet utuh ke serbuk puyer terbagi rata dengan zat pengisi SL</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCheckCompoundedInteractions}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Cek Interaksi Obat Racik
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Jumlah Bungkus Puyer / Kapsul ($N$ Bungkus)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={packetCount}
                    onChange={(e) => setPacketCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-amber-400 focus:outline-none focus:border-amber-500"
                  />
                  <span className="absolute right-3 top-2 text-xs text-slate-500">bungkus</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Aturan Pakai (Signa)</label>
                <input
                  type="text"
                  value={signaText}
                  onChange={(e) => setSignaText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  placeholder="cth. 3 x sehari 1 bungkus"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Target Bobot Serbuk per Bungkus</label>
                <select
                  value={targetWeightPerPacketMg}
                  onChange={(e) => setTargetWeightPerPacketMg(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value={250}>250 mg (Puyer Ringan)</option>
                  <option value={300}>300 mg (Standar Farmakope)</option>
                  <option value={400}>400 mg (Kapsul No. 3 / Puyer Sedang)</option>
                  <option value={500}>500 mg (Kapsul No. 2 / Standar Dewasa)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Zat Pengisi / Pengering</label>
                <select
                  value={fillerType}
                  onChange={(e) => setFillerType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Saccharum Lactis (SL / Gula Susu)">Saccharum Lactis (SL / Gula Susu)</option>
                  <option value="Amylum Manihot / Pati Singkong">Amylum Manihot (Bebas Laktosa)</option>
                  <option value="Carmine (Penanda Homogenitas Merah)">Carmine + SL (Penanda Warna)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Compounding Items Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-emerald-400" />
                Komposisi Obat yang Dirasuk ({compoundingItems.length} Item)
              </h4>

              <button
                onClick={handleAddCompoundingItem}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Obat Racikan
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                    <th className="py-3 px-3">Nama Obat / Generik</th>
                    <th className="py-3 px-3">Dosis per Bungkus</th>
                    <th className="py-3 px-3">Kekuatan Sediaan Tablet</th>
                    <th className="py-3 px-3">Total Dosis ({packetCount} bks)</th>
                    <th className="py-3 px-3 text-amber-300 font-bold">Tablet yang Diambil</th>
                    <th className="py-3 px-3">Pembulatan Praktis</th>
                    <th className="py-3 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {compoundingResults.itemsSummary.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 px-3 font-medium">
                        <input
                          type="text"
                          value={item.customName}
                          onChange={(e) => handleUpdateCompoundingItem(item.id, 'customName', e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white w-36 sm:w-44 focus:outline-none focus:border-emerald-500"
                        />
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="0.1"
                            min="0.01"
                            value={item.dosePerPacketMg}
                            onChange={(e) => handleUpdateCompoundingItem(item.id, 'dosePerPacketMg', parseFloat(e.target.value) || 0)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold w-20 focus:outline-none focus:border-emerald-500"
                          />
                          <span className="text-slate-500">mg</span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="0.5"
                            min="0.1"
                            value={item.tabletStrengthMg}
                            onChange={(e) => handleUpdateCompoundingItem(item.id, 'tabletStrengthMg', parseFloat(e.target.value) || 1)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white w-20 focus:outline-none focus:border-emerald-500"
                          />
                          <span className="text-slate-500">mg/tab</span>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-semibold text-slate-300">
                        {item.totalMgNeeded} mg
                      </td>

                      <td className="py-3 px-3 font-extrabold text-sm text-amber-400">
                        {item.rawTablets} tab
                      </td>

                      <td className="py-3 px-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="font-bold text-white">{item.roundedHalfTablets} tab</span>
                          <span className={`text-[10px] ${Math.abs(item.doseDeviationPercent) > 10 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                            ({item.doseDeviationPercent > 0 ? `+${item.doseDeviationPercent}%` : `${item.doseDeviationPercent}%`})
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleRemoveCompoundingItem(item.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                          title="Hapus obat dari racikan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations Summary & Saccharum Lactis Filler */}
            <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400 block mb-1 font-medium">Estimasi Bobot Obat Aktif:</span>
                <span className="text-xl font-bold text-slate-200">
                  {compoundingResults.totalActiveMedicinesWeightMg} mg
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  (~{(compoundingResults.totalActiveMedicinesWeightMg / packetCount).toFixed(1)} mg / bungkus)
                </span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400 block mb-1 font-medium">Kebutuhan Zat Pengisi ({fillerType}):</span>
                <span className="text-xl font-bold text-emerald-400">
                  {compoundingResults.saccharumLactisNeededMg} mg
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  ({(compoundingResults.saccharumLactisNeededMg / 1000).toFixed(2)} gram / {(compoundingResults.fillerPerPacketMg)} mg per bungkus)
                </span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400 block mb-1 font-medium">Total Bobot Serbuk yang Ditimbang:</span>
                <span className="text-xl font-black text-cyan-400">
                  {compoundingResults.targetTotalPowderWeightMg} mg
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  (Bagi rata menjadi {packetCount} bungkus @ {targetWeightPerPacketMg} mg)
                </span>
              </div>
            </div>

            {/* Action Bar & WhatsApp Export */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyToClipboard(generateWhatsAppLabelText(), 'Etiket Puyer')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition"
                >
                  {copiedNotification === 'Etiket Puyer' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      Tersalin ke Clipboard!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      Salin Etiket Resep WhatsApp
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-slate-400">
                <span className="text-amber-400 font-semibold">Catatan Farmasis: </span>
                Jika tablet yang diambil &lt; 0.5 tab, gunakan metode **Pengenceran Bertingkat (*Trituration*)**.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: KALKULATOR SIRUP & BOTOL */}
      {/* ========================================================================= */}
      {activeSubTab === 'syrup' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-cyan-400" />
                Pilihan Sediaan Sirup Komersial
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Obat Sirup</label>
                <select
                  value={syrupDrugId}
                  onChange={(e) => {
                    setSyrupDrugId(e.target.value);
                    setSyrupFormulationIndex(0);
                    const target = PEDIATRIC_DRUGS_DATABASE.find(d => d.id === e.target.value);
                    if (target) {
                      const dose = (target.singleDoseMinMgPerKg || target.standardDoseMgPerKgPerDay || 10) * (target.dosingType === 'per_kg_per_dose' ? weightKg : (weightKg / target.defaultFrequencyPerDay));
                      setSyrupCustomDoseMg(Math.round(dose));
                      setSyrupFrequency(target.defaultFrequencyPerDay);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-cyan-500"
                >
                  {PEDIATRIC_DRUGS_DATABASE.filter(d => d.formulations.some(f => f.volumePerUnit && f.volumePerUnit > 0)).map(drug => (
                    <option key={drug.id} value={drug.id}>
                      {drug.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Kekuatan Sediaan Sirup / Drops</label>
                <select
                  value={syrupFormulationIndex}
                  onChange={(e) => setSyrupFormulationIndex(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  {syrupDrug.formulations.filter(f => f.volumePerUnit && f.volumePerUnit > 0).map((form, idx) => (
                    <option key={idx} value={idx}>
                      {form.name} ({form.unitLabel} - Botol {form.bottleSizeMl} mL)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Dosis yang Diminta per Kali Minum (mg)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="5"
                    min="1"
                    value={syrupCustomDoseMg}
                    onChange={(e) => setSyrupCustomDoseMg(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-cyan-400 focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3 top-2 text-xs text-slate-500">mg / minum</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Frekuensi per Hari</label>
                  <select
                    value={syrupFrequency}
                    onChange={(e) => setSyrupFrequency(parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value={1}>1 x sehari (Tiap 24 jam)</option>
                    <option value={2}>2 x sehari (Tiap 12 jam)</option>
                    <option value={3}>3 x sehari (Tiap 8 jam)</option>
                    <option value={4}>4 x sehari (Tiap 6 jam)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Durasi Terapi (Hari)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={syrupDurationDays}
                    onChange={(e) => setSyrupDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hasil Perhitungan Takaran & Botol Sirup</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs text-slate-400 font-medium">Takaran Sekali Minum</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-cyan-400">{syrupResults.mlPerDose}</span>
                    <span className="text-sm font-semibold text-slate-300">mL</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 mt-1 block">
                    = {syrupResults.spoonText}
                  </span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs text-slate-400 font-medium">Kebutuhan Botol ({syrupDurationDays} Hari)</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-amber-400">{syrupResults.bottlesRequired}</span>
                    <span className="text-sm font-semibold text-slate-300">Botol ({syrupResults.activeForm.bottleSizeMl} mL)</span>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Total volume dibutuhkan: {syrupResults.totalMlNeeded} mL
                  </span>
                </div>
              </div>

              {/* Beyond Use Date (BUD) Warning */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Informasi Beyond Use Date (BUD) & Penyimpanan:
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>• Masa simpan aman pasca dilarutkan/dibuka: <strong className="text-amber-300">{syrupResults.budDays} Hari</strong>.</p>
                  <p>• {syrupResults.activeForm.form === 'sirup' && syrupResults.activeForm.budAfterOpenDays && syrupResults.activeForm.budAfterOpenDays <= 7 ? 'HARUS DISIMPAN DI LEMARI ES (2 - 8°C) DAN JANGAN DIBEKUKAN.' : 'Simpan pada suhu ruang sejuk (<25°C) terlindung dari sinar matahari langsung.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: RUMUS KLASIK FARMAKOPE */}
      {/* ========================================================================= */}
      {activeSubTab === 'classic' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Komparasi Rumus Dosis Klasik Farmakope Indonesia</h3>
                  <p className="text-xs text-slate-400">Verifikasi dosis anak terhadap Dosis Maksimum (DM) Dewasa</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nama Obat Acuan</label>
                <input
                  type="text"
                  value={classicDrugName}
                  onChange={(e) => setClassicDrugName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Dosis Maksimum / Standar Dewasa (mg)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={classicAdultDoseMg}
                    onChange={(e) => setClassicAdultDoseMg(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-purple-400 focus:outline-none focus:border-purple-500"
                  />
                  <span className="absolute right-3 top-2 text-xs text-slate-500">mg / dosis</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg overflow-hidden">
            <h4 className="text-sm font-bold text-white mb-3">Tabel Hasil Perhitungan Semua Rumus</h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                    <th className="py-3 px-3">Metode / Rumus</th>
                    <th className="py-3 px-3">Kesesuaian Populasi</th>
                    <th className="py-3 px-3">Formula Perhitungan</th>
                    <th className="py-3 px-3 text-purple-300 font-bold">Hasil Dosis Anak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {classicResults.map((res, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        {res.formulaName}
                      </td>
                      <td className="py-3 px-3 text-slate-400">{res.indication}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-300">{res.formulaDescription}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-extrabold text-sm border border-purple-500/30">
                          {res.calculatedDoseMg} mg
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
