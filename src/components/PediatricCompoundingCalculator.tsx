import React, { useState, useMemo } from 'react';
import { Drug } from '../types';
import { 
  PEDIATRIC_DRUGS_DATABASE, 
  estimateChildWeightKg, 
  calculateMostellerBSA, 
  calculateClassicFormulas,
  ClassicFormulaResult
} from '../data/pediatricDosingData';
import { 
  Baby, 
  Pill, 
  FlaskConical, 
  Calculator, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Plus, 
  Trash2, 
  Clock, 
  Share2, 
  ShieldAlert, 
  Sparkles, 
  Check,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { CuteMascot } from './CuteMascot';
import { FloatingPillsBackground } from './FloatingPillsBackground';

export interface CompoundingItem {
  id: string;
  drugId?: string;
  customName: string;
  dosePerPacketMg: number | string;
  tabletStrengthMg: number | string;
  tabletWeightMg?: number | string;
  category?: string;
}

export interface PediatricCompoundingCalculatorProps {
  hideHeader?: boolean;
  onCheckInteractions?: (drugNames: string[]) => void;
  existingDrugs?: Drug[];
  initialSubTab?: 'quick' | 'compounding' | 'syrup' | 'classic' | string;
}

export const PediatricCompoundingCalculator: React.FC<PediatricCompoundingCalculatorProps> = ({
  hideHeader = false,
  onCheckInteractions,
  existingDrugs = [],
  initialSubTab = 'quick'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'quick' | 'compounding' | 'syrup' | 'classic'>(
    (initialSubTab as any) || 'quick'
  );

  // Patient Profile state (allow empty string for natural keyboard input & backspacing)
  const [patientName, setPatientName] = useState<string>('An. Rahmat (3.5 th)');
  const [ageYears, setAgeYears] = useState<number | string>(3);
  const [ageMonths, setAgeMonths] = useState<number | string>(6);
  const [weightKg, setWeightKg] = useState<number | string>(14);
  const [heightCm, setHeightCm] = useState<number | string>(95);

  // Quick Dose Calculator state (Tab 1)
  const [selectedDrugId, setSelectedDrugId] = useState<string>('ped-paracetamol');
  const [quickCustomMgPerKg, setQuickCustomMgPerKg] = useState<number | string>(10); // 10 mg/kg
  const [quickFrequency, setQuickFrequency] = useState<number>(3); // 3x / day
  const [quickSelectedFormulationIndex, setQuickSelectedFormulationIndex] = useState<number>(0);

  // Compounding Puyer Calculator state (Tab 2)
  const [packetCount, setPacketCount] = useState<number | string>(10); // N = 10 bungkus
  const [targetWeightPerPacketMg, setTargetWeightPerPacketMg] = useState<number>(300); // 300 mg per bungkus
  const [fillerType, setFillerType] = useState<string>('Saccharum Lactis (SL / Gula Susu)');
  const [signaText, setSignaText] = useState<string>('3 x sehari 1 bungkus puyer sesudah makan');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Compounding Items List
  const [compoundingItems, setCompoundingItems] = useState<CompoundingItem[]>([
    {
      id: 'comp-1',
      drugId: 'ped-paracetamol',
      customName: 'Paracetamol (Acetaminophen)',
      dosePerPacketMg: 120,
      tabletStrengthMg: 500,
      tabletWeightMg: 600,
      category: 'Antipiretik & Analgesik'
    },
    {
      id: 'comp-2',
      drugId: 'ped-pseudoephedrine',
      customName: 'Pseudoephedrine HCl',
      dosePerPacketMg: 7.5,
      tabletStrengthMg: 30,
      tabletWeightMg: 150,
      category: 'Dekongestan'
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
  const [syrupDurationDays, setSyrupDurationDays] = useState<number | string>(5);
  const [syrupFrequency, setSyrupFrequency] = useState<number>(3);
  const [syrupCustomDoseMg, setSyrupCustomDoseMg] = useState<number | string>(150);

  // Classic Formulas state (Tab 4)
  const [classicAdultDoseMg, setClassicAdultDoseMg] = useState<number | string>(500);
  const [classicDrugName, setClassicDrugName] = useState<string>('Paracetamol 500 mg');

  // Safe numerical parsed values
  const numAgeYears = useMemo(() => typeof ageYears === 'number' ? ageYears : (parseFloat(ageYears) || 0), [ageYears]);
  const numAgeMonths = useMemo(() => typeof ageMonths === 'number' ? ageMonths : (parseFloat(ageMonths) || 0), [ageMonths]);
  const numWeightKg = useMemo(() => typeof weightKg === 'number' ? weightKg : (parseFloat(weightKg) || 0), [weightKg]);
  const numHeightCm = useMemo(() => typeof heightCm === 'number' ? heightCm : (parseFloat(heightCm) || 0), [heightCm]);
  const numPacketCount = useMemo(() => typeof packetCount === 'number' ? packetCount : (parseInt(packetCount) || 1), [packetCount]);
  const numSyrupDoseMg = useMemo(() => typeof syrupCustomDoseMg === 'number' ? syrupCustomDoseMg : (parseFloat(syrupCustomDoseMg) || 0), [syrupCustomDoseMg]);
  const numSyrupDays = useMemo(() => typeof syrupDurationDays === 'number' ? syrupDurationDays : (parseInt(syrupDurationDays) || 1), [syrupDurationDays]);
  const numClassicAdultDose = useMemo(() => typeof classicAdultDoseMg === 'number' ? classicAdultDoseMg : (parseFloat(classicAdultDoseMg) || 0), [classicAdultDoseMg]);

  // Computed values
  const totalAgeMonths = useMemo(() => numAgeYears * 12 + numAgeMonths, [numAgeYears, numAgeMonths]);
  const calculatedBSA = useMemo(() => calculateMostellerBSA(numHeightCm, numWeightKg), [numHeightCm, numWeightKg]);
  const estimatedWeight = useMemo(() => estimateChildWeightKg(numAgeYears, numAgeMonths), [numAgeYears, numAgeMonths]);

  // Handle auto-weight estimation
  const handleApplyEstimatedWeight = () => {
    setWeightKg(Math.round(estimatedWeight * 10) / 10);
  };

  // Selected drug for Quick tab
  const currentDrug = useMemo(() => {
    return PEDIATRIC_DRUGS_DATABASE.find(d => d.id === selectedDrugId) || PEDIATRIC_DRUGS_DATABASE[0];
  }, [selectedDrugId]);

  // Dosing range & clinical presets configuration based on drug dosingType
  const rangeConfig = useMemo(() => {
    const isDosePerDose = currentDrug.dosingType === 'per_kg_per_dose';
    const isDosePerDay = currentDrug.dosingType === 'per_kg_per_day';

    if (isDosePerDose) {
      const stdMin = currentDrug.singleDoseMinMgPerKg || 10;
      const stdMax = currentDrug.singleDoseMaxMgPerKg || 15;
      const minVal = Math.max(0.1, Math.round(stdMin * 0.5 * 10) / 10);
      const maxVal = Math.max(stdMax * 1.5, stdMax + 10);
      const step = stdMin < 1 ? 0.05 : (stdMin < 10 ? 0.5 : 1);
      const presets = [
        { label: `Min (${stdMin} mg/kg)`, value: stdMin },
        { label: `Standar (${((stdMin + stdMax) / 2).toFixed(1).replace('.0', '')} mg/kg)`, value: parseFloat(((stdMin + stdMax) / 2).toFixed(1)) },
        { label: `Maks (${stdMax} mg/kg)`, value: stdMax }
      ];
      return {
        type: 'per_dose' as const,
        title: 'Dosis Sekali Minum (per Kali Pemberian)',
        unit: 'mg/kgBB/dosis',
        min: minVal,
        max: maxVal,
        stdMin,
        stdMax,
        step,
        presets
      };
    } else if (isDosePerDay) {
      const stdMin = currentDrug.minDoseMgPerKgPerDay || 20;
      const stdMax = currentDrug.maxDoseMgPerKgPerDay || 50;
      const minVal = Math.max(1, Math.round(stdMin * 0.5));
      const maxVal = Math.max(stdMax * 1.5, stdMax + 20);
      const step = stdMin < 5 ? 0.5 : 1;
      const presets = [
        { label: `Ringan (${stdMin} mg/kg/hr)`, value: stdMin },
        { label: `Standar (${currentDrug.standardDoseMgPerKgPerDay || ((stdMin + stdMax) / 2)} mg/kg/hr)`, value: currentDrug.standardDoseMgPerKgPerDay || ((stdMin + stdMax) / 2) },
        { label: `Maksimal (${stdMax} mg/kg/hr)`, value: stdMax }
      ];
      if (currentDrug.id === 'ped-amoxicillin' || currentDrug.id === 'ped-co-amoxiclav') {
        presets.push({ label: 'Dosis OMA (80 mg/kg/hr)', value: 80 });
      }
      return {
        type: 'per_day' as const,
        title: 'Dosis Total Harian (per 24 Jam)',
        unit: 'mg/kgBB/hari',
        min: minVal,
        max: maxVal,
        stdMin,
        stdMax,
        step,
        presets
      };
    } else {
      const stdVal = currentDrug.standardAdultDoseMg || 10;
      return {
        type: 'fixed' as const,
        title: 'Dosis Standar Tetap',
        unit: 'mg/dosis',
        min: 1,
        max: 1000,
        stdMin: 1,
        stdMax: 1000,
        step: 1,
        presets: [{ label: `Standar (${stdVal} mg)`, value: stdVal }]
      };
    }
  }, [currentDrug]);

  const numCustomMgPerKg = useMemo(() => {
    return typeof quickCustomMgPerKg === 'number' ? quickCustomMgPerKg : (parseFloat(quickCustomMgPerKg) || 0);
  }, [quickCustomMgPerKg]);

  // Quick Dose Calculations
  const quickCalculations = useMemo(() => {
    let singleDoseMg = 0;
    let dailyDoseMg = 0;

    if (currentDrug.dosingType === 'per_kg_per_dose') {
      singleDoseMg = numCustomMgPerKg * numWeightKg;
      dailyDoseMg = singleDoseMg * quickFrequency;
    } else if (currentDrug.dosingType === 'per_kg_per_day') {
      dailyDoseMg = numCustomMgPerKg * numWeightKg;
      singleDoseMg = quickFrequency > 0 ? dailyDoseMg / quickFrequency : dailyDoseMg;
    } else {
      singleDoseMg = numCustomMgPerKg;
      dailyDoseMg = singleDoseMg * quickFrequency;
    }

    // Safety checks
    const isExceedingMaxDaily = currentDrug.maxDailyDoseMg ? dailyDoseMg > currentDrug.maxDailyDoseMg : false;
    const isExceedingMaxSingle = currentDrug.maxSingleDoseMg ? singleDoseMg > currentDrug.maxSingleDoseMg : false;
    const isBelowTherapeutic = numCustomMgPerKg > 0 && numCustomMgPerKg < rangeConfig.stdMin;
    const isAboveStandard = numCustomMgPerKg > rangeConfig.stdMax;

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
      isBelowTherapeutic,
      isAboveStandard,
      activeFormulation,
      liquidVolumeMlPerDose: Math.round(liquidVolumeMlPerDose * 100) / 100,
      householdMeasure
    };
  }, [currentDrug, numCustomMgPerKg, numWeightKg, quickFrequency, quickSelectedFormulationIndex, rangeConfig]);

  // Compounding calculations (Tab 2)
  const compoundingResults = useMemo(() => {
    let totalActiveMedicinesWeightMg = 0;
    const safePackets = Math.max(1, numPacketCount);

    const itemsSummary = compoundingItems.map(item => {
      const doseMg = typeof item.dosePerPacketMg === 'number' ? item.dosePerPacketMg : (parseFloat(item.dosePerPacketMg) || 0);
      const strMg = typeof item.tabletStrengthMg === 'number' ? item.tabletStrengthMg : (parseFloat(item.tabletStrengthMg) || 1);
      const tabWtMg = typeof item.tabletWeightMg === 'number' ? item.tabletWeightMg : (parseFloat(item.tabletWeightMg || '') || strMg * 1.2);

      const totalMgNeeded = doseMg * safePackets;
      const rawTablets = strMg > 0 ? totalMgNeeded / strMg : 0;
      const roundedHalfTablets = Math.round(rawTablets * 2) / 2; // rounded to nearest 0.5 tablet
      const roundedWholeTablets = Math.ceil(rawTablets);
      const actualDosePerPacket = safePackets > 0 ? (roundedHalfTablets * strMg) / safePackets : 0;
      const doseDeviationPercent = doseMg > 0 ? Math.round(((actualDosePerPacket - doseMg) / doseMg) * 100) : 0;

      // Estimated powder weight contributed by tablets
      const itemPowderWeight = roundedHalfTablets * tabWtMg;
      totalActiveMedicinesWeightMg += itemPowderWeight;

      return {
        ...item,
        totalMgNeeded: Math.round(totalMgNeeded * 10) / 10,
        rawTablets: Math.round(rawTablets * 100) / 100,
        roundedHalfTablets,
        roundedWholeTablets,
        actualDosePerPacket: Math.round(actualDosePerPacket * 100) / 100,
        doseDeviationPercent,
        itemPowderWeight
      };
    });

    const targetTotalPowderWeightMg = targetWeightPerPacketMg * safePackets;
    const saccharumLactisNeededMg = Math.max(0, targetTotalPowderWeightMg - totalActiveMedicinesWeightMg);
    const fillerPerPacketMg = safePackets > 0 ? saccharumLactisNeededMg / safePackets : 0;

    return {
      itemsSummary,
      totalActiveMedicinesWeightMg: Math.round(totalActiveMedicinesWeightMg),
      targetTotalPowderWeightMg,
      saccharumLactisNeededMg: Math.round(saccharumLactisNeededMg),
      fillerPerPacketMg: Math.round(fillerPerPacketMg),
      isPowderOverflow: totalActiveMedicinesWeightMg > targetTotalPowderWeightMg
    };
  }, [compoundingItems, numPacketCount, targetWeightPerPacketMg]);

  // Syrup calculations (Tab 3)
  const syrupDrug = useMemo(() => {
    return PEDIATRIC_DRUGS_DATABASE.find(d => d.id === syrupDrugId) || PEDIATRIC_DRUGS_DATABASE[0];
  }, [syrupDrugId]);

  const syrupResults = useMemo(() => {
    const activeForm = syrupDrug.formulations[syrupFormulationIndex] || syrupDrug.formulations[0];
    const strengthMg = activeForm.strengthPerUnit || 1;
    const unitMl = activeForm.volumePerUnit || 5;

    const mlPerDose = (numSyrupDoseMg / strengthMg) * unitMl;
    const totalMlPerDay = mlPerDose * syrupFrequency;
    const totalMlNeeded = totalMlPerDay * numSyrupDays;
    const bottlesRequired = Math.ceil(totalMlNeeded / (activeForm.bottleSizeMl || 60));

    let spoonText = '';
    const tsp = mlPerDose / 5;
    if (activeForm.form === 'drops') {
      spoonText = `${mlPerDose.toFixed(2)} mL (~${Math.round(mlPerDose * 20)} tetes)`;
    } else {
      if (Math.abs(tsp - 1) < 0.1) spoonText = '1 sendok teh (5 mL / 1 cth)';
      else if (Math.abs(tsp - 0.5) < 0.1) spoonText = '1/2 sendok teh (2.5 mL / 1/2 cth)';
      else if (Math.abs(tsp - 1.5) < 0.1) spoonText = '1 1/2 sendok teh (7.5 mL / 1 1/2 cth)';
      else if (Math.abs(tsp - 2) < 0.1) spoonText = '2 sendok teh (10 mL / 2 cth)';
      else spoonText = `${mlPerDose.toFixed(1)} mL (gunakan gelas takar / spuit oral)`;
    }

    return {
      activeForm,
      mlPerDose: Math.round(mlPerDose * 100) / 100,
      totalMlPerDay: Math.round(totalMlPerDay * 10) / 10,
      totalMlNeeded: Math.round(totalMlNeeded),
      bottlesRequired,
      spoonText,
      budDays: activeForm.budAfterOpenDays || 14
    };
  }, [syrupDrug, syrupFormulationIndex, numSyrupDoseMg, syrupFrequency, numSyrupDays]);

  // Classic Formulas (Tab 4)
  const classicResults: ClassicFormulaResult[] = useMemo(() => {
    return calculateClassicFormulas(
      numClassicAdultDose,
      numAgeYears,
      numAgeMonths,
      numWeightKg,
      numHeightCm
    );
  }, [numClassicAdultDose, numAgeYears, numAgeMonths, numWeightKg, numHeightCm]);

  // Add Item to Compounding
  const handleAddCompoundingItem = () => {
    const newItem: CompoundingItem = {
      id: `comp-${Date.now()}`,
      customName: 'Obat Tambahan',
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
    text += `👶 *Usia*: ${numAgeYears} th ${numAgeMonths} bln | *BB*: ${numWeightKg} kg\n`;
    text += `📦 *Jumlah*: ${numPacketCount} bungkus puyer\n`;
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
      {/* HERO BANNER - VIOLET ORCHID & DEEP MULBERRY */}
      {!hideHeader && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d0414] via-[#1c0a2e] to-[#2c0f47] p-6 sm:p-8 text-white shadow-2xl border border-purple-500/25">
          <FloatingPillsBackground density="low" accentColor="#c084fc" />
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
            <Baby className="w-48 h-48 text-purple-400" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold font-outfit">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Pedoman Dosis Pediatrik IDAI, Nelson &amp; Farmakope Indonesia</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center shadow-lg shadow-purple-950/50 shrink-0">
                  <Baby className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                    Kalkulator Dosis Pediatrik &amp; Racikan Puyer
                  </h1>
                  <p className="text-xs sm:text-sm text-purple-100/80 font-medium">
                    Hitung dosis anak berbasis BB/BSA, konversi racikan tablet ke puyer dengan zat pengisi SL, dan takaran sirup/drops.
                  </p>
                </div>
              </div>

              {/* Quick Stat Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-purple-200">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Kalkulasi BB &amp; BSA Mosteller</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kompensasi Pengisi Saccharum Lactis</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-pink-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-pink-300" />
                  <span>Skrining Batas Dosis Maksimum</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10">
              {/* Si Kapsul Baby Edition */}
              <div className="hidden sm:block">
                <CuteMascot
                  mood="baby"
                  size="sm"
                  interactive={true}
                  speechBubble="Hitung dosis si kecil dengan presisi ya 🍼✨"
                />
              </div>

              <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-purple-950/60 text-right shadow-md">
                <span className="text-[11px] text-slate-400 block font-medium">Total Obat Pediatrik:</span>
                <span className="text-lg font-black text-purple-400">{PEDIATRIC_DRUGS_DATABASE.length} Formula Dosis Anak</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PATIENT PROFILE CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">Profil Pasien Pediatrik</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Parameter acuan perhitungan dosis terapeutik anak</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyEstimatedWeight}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-teal-50 hover:bg-teal-100 text-teal-900 dark:bg-slate-800 dark:text-teal-300 transition border border-teal-200 dark:border-slate-700 cursor-pointer shadow-2xs"
              title="Gunakan estimasi rumus Weech / WHO berdasarkan usia"
            >
              <Scale className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
              Gunakan Estimasi BB ({estimatedWeight.toFixed(1)} kg)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Pasien</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 shadow-2xs"
              placeholder="cth. An. Rahmat"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Usia (Tahun & Bulan)</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="18"
                  value={ageYears}
                  onChange={(e) => setAgeYears(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 shadow-2xs"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">th</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={ageMonths}
                  onChange={(e) => setAgeMonths(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 shadow-2xs"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">bln</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Berat Badan (kg) <span className="text-teal-700 dark:text-teal-400 font-extrabold">*Wajib</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="150"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-teal-300 dark:border-teal-700 rounded-xl pl-3 pr-8 py-2 text-xs font-black text-teal-800 dark:text-teal-300 focus:outline-none focus:border-teal-600 shadow-2xs"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-black text-teal-700 dark:text-teal-400 pointer-events-none">kg</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tinggi Badan (cm)</label>
            <div className="relative">
              <input
                type="number"
                min="10"
                max="250"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 shadow-2xs"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">cm</span>
            </div>
          </div>

          <div className="bg-teal-50/70 dark:bg-slate-950 rounded-xl p-2.5 border border-teal-200 dark:border-slate-800 flex flex-col justify-center shadow-2xs">
            <span className="text-[11px] text-teal-800 dark:text-slate-400 font-bold">Luas Permukaan Tubuh (BSA):</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-black text-teal-900 dark:text-teal-300">{calculatedBSA.toFixed(2)}</span>
              <span className="text-xs font-bold text-teal-700 dark:text-slate-500">m² (Mosteller)</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <button
          onClick={() => setActiveSubTab('quick')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
            activeSubTab === 'quick'
              ? 'bg-[#0f766e] text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Kalkulator Dosis Cepat
        </button>

        <button
          onClick={() => setActiveSubTab('compounding')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
            activeSubTab === 'compounding'
              ? 'bg-[#0f766e] text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          Kalkulator Racikan Puyer & Kapsul
          <span className={`ml-1 px-2 py-0.5 text-[10px] font-bold rounded-full ${activeSubTab === 'compounding' ? 'bg-teal-900/50 text-teal-100' : 'bg-amber-100 text-amber-900'}`}>
            Resep Racik
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('syrup')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
            activeSubTab === 'syrup'
              ? 'bg-[#0f766e] text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Pill className="w-4 h-4" />
          Kalkulator Sirup & Botol
        </button>

        <button
          onClick={() => setActiveSubTab('classic')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
            activeSubTab === 'classic'
              ? 'bg-[#0f766e] text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
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
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                Pilih Obat Pediatrik
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Obat Anak Indonesia (Database BPOM)</label>
                  <select
                    value={selectedDrugId}
                    onChange={(e) => {
                      const newId = e.target.value;
                      setSelectedDrugId(newId);
                      const target = PEDIATRIC_DRUGS_DATABASE.find(d => d.id === newId);
                      if (target) {
                        if (target.dosingType === 'per_kg_per_dose') {
                          setQuickCustomMgPerKg(target.singleDoseMinMgPerKg || 10);
                        } else if (target.dosingType === 'per_kg_per_day') {
                          setQuickCustomMgPerKg(target.standardDoseMgPerKgPerDay || target.minDoseMgPerKgPerDay || 40);
                        } else {
                          setQuickCustomMgPerKg(target.standardAdultDoseMg || 10);
                        }
                        setQuickFrequency(target.defaultFrequencyPerDay);
                        setQuickSelectedFormulationIndex(0);
                      }
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
                  >
                    {PEDIATRIC_DRUGS_DATABASE.map(drug => (
                      <option key={drug.id} value={drug.id}>
                        {drug.name} ({drug.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Enhanced Dosing Control Box (Dual Slider + Direct Number Input + Presets) */}
                <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-2xs">
                  {/* Top Bar: Title & Direct Numerical Input Box */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-black text-slate-900 dark:text-white block">
                        {rangeConfig.title}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        Standar IDAI: <strong>{rangeConfig.stdMin} - {rangeConfig.stdMax}</strong> {rangeConfig.unit}
                      </span>
                    </div>

                    {/* Direct Number Input */}
                    <div className="flex items-center gap-1.5">
                      <div className="relative">
                        <input
                          type="number"
                          step={rangeConfig.step}
                          min={rangeConfig.min}
                          max={rangeConfig.max}
                          value={quickCustomMgPerKg}
                          onChange={(e) => setQuickCustomMgPerKg(e.target.value)}
                          className="w-24 bg-white dark:bg-slate-900 border border-teal-400 dark:border-teal-600 rounded-xl pl-3 pr-2 py-1.5 text-sm font-black text-teal-800 dark:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-center shadow-2xs"
                        />
                      </div>
                      <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
                        {rangeConfig.type === 'per_dose' ? 'mg/kg' : (rangeConfig.type === 'per_day' ? 'mg/kg/hr' : 'mg')}
                      </span>
                    </div>
                  </div>

                  {/* Range Slider */}
                  <div className="space-y-1">
                    <input
                      type="range"
                      min={rangeConfig.min}
                      max={rangeConfig.max}
                      step={rangeConfig.step}
                      value={numCustomMgPerKg || rangeConfig.stdMin}
                      onChange={(e) => setQuickCustomMgPerKg(parseFloat(e.target.value))}
                      className="w-full accent-[#0f766e] h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer transition"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold px-0.5">
                      <span>Batas Min: {rangeConfig.min}</span>
                      <span className="text-teal-700 dark:text-teal-400">Rekomendasi: {rangeConfig.stdMin} - {rangeConfig.stdMax}</span>
                      <span>Batas Maks: {rangeConfig.max}</span>
                    </div>
                  </div>

                  {/* Clinical Preset Buttons (Chips) */}
                  <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
                      Pilihan Dosis Baku Klinis:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {rangeConfig.presets.map((preset, idx) => {
                        const isSelected = Math.abs(numCustomMgPerKg - preset.value) < 0.01;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setQuickCustomMgPerKg(preset.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer shadow-2xs ${
                              isSelected
                                ? 'bg-[#0f766e] text-white shadow-sm ring-2 ring-teal-500/30'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:text-teal-800 dark:hover:text-teal-300'
                            }`}
                          >
                            {preset.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Real-time Dose Status Badge */}
                  <div className="pt-1">
                    {quickCalculations.isBelowTherapeutic ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        Dosis di bawah rekomendasi standar (Sub-terapeutik &lt; {rangeConfig.stdMin} {rangeConfig.unit})
                      </div>
                    ) : quickCalculations.isAboveStandard ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-orange-50 text-orange-900 border border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800/50">
                        <AlertTriangle className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                        Dosis di atas rekomendasi lazim (&gt; {rangeConfig.stdMax} {rangeConfig.unit}) - Pastikan indikasi tepat
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800/50">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        Dosis berada dalam rentang terapi aman BPOM & Pedoman IDAI
                      </div>
                    )}
                  </div>
                </div>

                {/* Frequency selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Frekuensi Pemberian</label>
                  <select
                    value={quickFrequency}
                    onChange={(e) => setQuickFrequency(parseInt(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
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
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pilihan Bentuk Sediaan Komersial</label>
                  <select
                    value={quickSelectedFormulationIndex}
                    onChange={(e) => setQuickSelectedFormulationIndex(parseInt(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
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
          <div className="lg:col-span-6 space-y-4">
            {/* Main Result Card */}
            <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] border border-[#143d47] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-teal-500/20">
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">Hasil Perhitungan Terapi Anak</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-200 border border-teal-500/30">
                  BB: {numWeightKg} kg | Usia: {numAgeYears} th {numAgeMonths} bln
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#06181c] border border-[#14424e] rounded-xl p-4">
                  <span className="text-xs text-teal-200/80 font-medium">Dosis Per Kali Minum</span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-black text-teal-300">{quickCalculations.singleDoseMg}</span>
                    <span className="text-sm font-bold text-teal-100">mg / kali</span>
                  </div>
                  <span className="text-[11px] text-teal-300/70 block mt-1">
                    Diberikan {quickFrequency}x sehari (Tiap {24 / quickFrequency} jam)
                  </span>
                </div>

                <div className="bg-[#06181c] border border-[#14424e] rounded-xl p-4">
                  <span className="text-xs text-teal-200/80 font-medium">Total Dosis Harian</span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-black text-emerald-300">{quickCalculations.dailyDoseMg}</span>
                    <span className="text-sm font-bold text-teal-100">mg / 24 jam</span>
                  </div>
                  <span className="text-[11px] text-teal-300/70 block mt-1">
                    Batas Maksimum: {currentDrug.maxDailyDoseMg ? `${currentDrug.maxDailyDoseMg} mg/hari` : 'Sesuai BB'}
                  </span>
                </div>
              </div>

              {/* Liquid Volume Conversion if available */}
              {quickCalculations.liquidVolumeMlPerDose > 0 && (
                <div className="bg-[#08282e] border border-teal-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1.5 text-teal-300 text-xs font-bold">
                    <FlaskConical className="w-4 h-4" />
                    Konversi Takaran Sediaan Cair ({quickCalculations.activeFormulation.name}):
                  </div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-2xl font-black text-white">
                      {quickCalculations.liquidVolumeMlPerDose} mL
                    </span>
                    <span className="text-sm font-bold text-teal-300">
                      = {quickCalculations.householdMeasure}
                    </span>
                  </div>
                </div>
              )}

              {/* Safety & Warning Alerts */}
              {(quickCalculations.isExceedingMaxDaily || quickCalculations.isExceedingMaxSingle) ? (
                <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">PERINGATAN: Dosis Melebihi Batas Keamanan Pediatrik!</span>
                    <p className="mt-0.5 text-rose-300">
                      Dosis yang dihitung melebihi batas maksimum harian ({currentDrug.maxDailyDoseMg} mg). Harap turunkan dosis atau frekuensi pemberian.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 flex-shrink-0" />
                  <span>Dosis berada dalam rentang terapi aman standar farmakope & pedoman klinis.</span>
                </div>
              )}

              {/* Administration & Red Flags */}
              <div className="pt-3 border-t border-teal-500/20 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-teal-100">
                  <Info className="w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-teal-200">Cara Pemberian: </span>
                    {currentDrug.administrationNotes}
                  </div>
                </div>

                {currentDrug.redFlags && currentDrug.redFlags.length > 0 && (
                  <div className="p-3 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-200 space-y-1">
                    <span className="font-bold flex items-center gap-1.5 text-amber-300">
                      <ShieldAlert className="w-3.5 h-3.5" /> Perhatian Klinis:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-100 pl-1">
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
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Formulator Resep Racikan Puyer / Kapsul</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Konversi tablet utuh ke serbuk puyer terbagi rata dengan zat pengisi SL</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCheckCompoundedInteractions}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0f766e] hover:bg-[#115e59] text-white shadow-sm transition cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Cek Interaksi Obat Racik
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Jumlah Bungkus Puyer / Kapsul (N)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={packetCount}
                    onChange={(e) => setPacketCount(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-amber-300 dark:border-amber-700 rounded-xl pl-3 pr-16 py-2 text-xs font-black text-amber-900 dark:text-amber-300 focus:outline-none focus:border-amber-600 shadow-2xs"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">bungkus</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Aturan Pakai (Signa)</label>
                <input
                  type="text"
                  value={signaText}
                  onChange={(e) => setSignaText(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 shadow-2xs"
                  placeholder="cth. 3 x sehari 1 bungkus"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Bobot Serbuk per Bungkus</label>
                <select
                  value={targetWeightPerPacketMg}
                  onChange={(e) => setTargetWeightPerPacketMg(parseInt(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
                >
                  <option value={250}>250 mg (Puyer Ringan)</option>
                  <option value={300}>300 mg (Standar Farmakope)</option>
                  <option value={400}>400 mg (Kapsul No. 3 / Puyer Sedang)</option>
                  <option value={500}>500 mg (Kapsul No. 2 / Standar Dewasa)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Zat Pengisi / Pengering</label>
                <select
                  value={fillerType}
                  onChange={(e) => setFillerType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
                >
                  <option value="Saccharum Lactis (SL / Gula Susu)">Saccharum Lactis (SL / Gula Susu)</option>
                  <option value="Amylum Manihot / Pati Singkong">Amylum Manihot (Bebas Laktosa)</option>
                  <option value="Carmine (Penanda Homogenitas Merah)">Carmine + SL (Penanda Warna)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Compounding Items Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                Komposisi Obat yang Dirasuk ({compoundingItems.length} Item)
              </h4>

              <button
                onClick={handleAddCompoundingItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-50 hover:bg-teal-100 text-teal-900 dark:bg-slate-800 dark:text-teal-300 border border-teal-200 dark:border-slate-700 transition cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Obat Racikan
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-bold">
                    <th className="py-3 px-3">Nama Obat / Generik</th>
                    <th className="py-3 px-3">Dosis per Bungkus</th>
                    <th className="py-3 px-3">Kekuatan Sediaan Tablet</th>
                    <th className="py-3 px-3">Total Dosis ({numPacketCount} bks)</th>
                    <th className="py-3 px-3 text-amber-900 dark:text-amber-300 font-black">Tablet yang Diambil</th>
                    <th className="py-3 px-3">Pembulatan Praktis</th>
                    <th className="py-3 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                  {compoundingResults.itemsSummary.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                      <td className="py-3 px-3">
                        <input
                          type="text"
                          value={item.customName}
                          onChange={(e) => handleUpdateCompoundingItem(item.id, 'customName', e.target.value)}
                          className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white w-36 sm:w-44 focus:outline-none focus:border-teal-600"
                        />
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="0.1"
                            value={item.dosePerPacketMg}
                            onChange={(e) => handleUpdateCompoundingItem(item.id, 'dosePerPacketMg', e.target.value)}
                            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-teal-800 dark:text-teal-300 font-bold w-20 focus:outline-none focus:border-teal-600"
                          />
                          <span className="text-slate-500 font-bold">mg</span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="0.5"
                            value={item.tabletStrengthMg}
                            onChange={(e) => handleUpdateCompoundingItem(item.id, 'tabletStrengthMg', e.target.value)}
                            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-900 dark:text-white font-bold w-20 focus:outline-none focus:border-teal-600"
                          />
                          <span className="text-slate-500 font-bold">mg/tab</span>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-200">
                        {item.totalMgNeeded} mg
                      </td>

                      <td className="py-3 px-3 font-black text-sm text-amber-900 dark:text-amber-400">
                        {item.rawTablets} tab
                      </td>

                      <td className="py-3 px-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                          <span className="font-black text-slate-900 dark:text-white">{item.roundedHalfTablets} tab</span>
                          <span className={`text-[10px] font-bold ${Math.abs(item.doseDeviationPercent) > 10 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500'}`}>
                            ({item.doseDeviationPercent > 0 ? `+${item.doseDeviationPercent}%` : `${item.doseDeviationPercent}%`})
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleRemoveCompoundingItem(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition cursor-pointer"
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
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-600 dark:text-slate-400 block mb-1 font-bold">Estimasi Bobot Obat Aktif:</span>
                <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                  {compoundingResults.totalActiveMedicinesWeightMg} mg
                </span>
                <span className="text-[11px] text-slate-500 block mt-1 font-medium">
                  (~{(compoundingResults.totalActiveMedicinesWeightMg / Math.max(1, numPacketCount)).toFixed(1)} mg / bungkus)
                </span>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-4">
                <span className="text-xs text-emerald-800 dark:text-emerald-300 block mb-1 font-bold">Kebutuhan Zat Pengisi ({fillerType}):</span>
                <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                  {compoundingResults.saccharumLactisNeededMg} mg
                </span>
                <span className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 block mt-1 font-medium">
                  ({(compoundingResults.saccharumLactisNeededMg / 1000).toFixed(2)} gram / {(compoundingResults.fillerPerPacketMg)} mg per bungkus)
                </span>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 rounded-xl p-4">
                <span className="text-xs text-teal-800 dark:text-teal-300 block mb-1 font-bold">Total Bobot Serbuk yang Ditimbang:</span>
                <span className="text-xl font-black text-teal-900 dark:text-teal-300">
                  {compoundingResults.targetTotalPowderWeightMg} mg
                </span>
                <span className="text-[11px] text-teal-800/80 dark:text-teal-300/80 block mt-1 font-medium">
                  (Bagi rata menjadi {numPacketCount} bungkus @ {targetWeightPerPacketMg} mg)
                </span>
              </div>
            </div>

            {/* Action Bar & WhatsApp Export */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyToClipboard(generateWhatsAppLabelText(), 'Etiket Puyer')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#0f766e] hover:bg-[#115e59] text-white shadow-md transition cursor-pointer"
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

              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span className="text-amber-800 dark:text-amber-400 font-bold">Catatan Farmasis: </span>
                Jika tablet yang diambil &lt; 0.5 tab, gunakan metode <strong>Pengenceran Bertingkat (<em>Trituration</em>)</strong>.
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
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                Pilihan Sediaan Sirup Komersial
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Obat Sirup</label>
                <select
                  value={syrupDrugId}
                  onChange={(e) => {
                    setSyrupDrugId(e.target.value);
                    setSyrupFormulationIndex(0);
                    const target = PEDIATRIC_DRUGS_DATABASE.find(d => d.id === e.target.value);
                    if (target) {
                      const dose = (target.singleDoseMinMgPerKg || target.standardDoseMgPerKgPerDay || 10) * (target.dosingType === 'per_kg_per_dose' ? numWeightKg : (numWeightKg / target.defaultFrequencyPerDay));
                      setSyrupCustomDoseMg(Math.round(dose));
                      setSyrupFrequency(target.defaultFrequencyPerDay);
                    }
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
                >
                  {PEDIATRIC_DRUGS_DATABASE.filter(d => d.formulations.some(f => f.volumePerUnit && f.volumePerUnit > 0)).map(drug => (
                    <option key={drug.id} value={drug.id}>
                      {drug.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kekuatan Sediaan Sirup / Drops</label>
                <select
                  value={syrupFormulationIndex}
                  onChange={(e) => setSyrupFormulationIndex(parseInt(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
                >
                  {syrupDrug.formulations.filter(f => f.volumePerUnit && f.volumePerUnit > 0).map((form, idx) => (
                    <option key={idx} value={idx}>
                      {form.name} ({form.unitLabel} - Botol {form.bottleSizeMl} mL)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Dosis yang Diminta per Kali Minum (mg)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="5"
                    value={syrupCustomDoseMg}
                    onChange={(e) => setSyrupCustomDoseMg(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-3 pr-20 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 shadow-2xs"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">mg / minum</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Frekuensi per Hari</label>
                  <select
                    value={syrupFrequency}
                    onChange={(e) => setSyrupFrequency(parseInt(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
                  >
                    <option value={1}>1 x sehari (Tiap 24 jam)</option>
                    <option value={2}>2 x sehari (Tiap 12 jam)</option>
                    <option value={3}>3 x sehari (Tiap 8 jam)</option>
                    <option value={4}>4 x sehari (Tiap 6 jam)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Durasi Terapi (Hari)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={syrupDurationDays}
                      onChange={(e) => setSyrupDurationDays(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-3 pr-10 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 shadow-2xs"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">hari</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="bg-gradient-to-r from-[#071c21] via-[#0b353e] to-[#082228] border border-[#143d47] rounded-2xl p-6 text-white shadow-xl space-y-5">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                Hasil Perhitungan Takaran & Botol Sirup
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#06181c] border border-[#14424e] rounded-xl p-4">
                  <span className="text-xs text-teal-200/80 font-medium">Takaran Sekali Minum</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-teal-300">{syrupResults.mlPerDose}</span>
                    <span className="text-sm font-bold text-teal-100">mL</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-300 mt-1 block">
                    = {syrupResults.spoonText}
                  </span>
                </div>

                <div className="bg-[#06181c] border border-[#14424e] rounded-xl p-4">
                  <span className="text-xs text-teal-200/80 font-medium">Kebutuhan Botol ({numSyrupDays} Hari)</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-amber-300">{syrupResults.bottlesRequired}</span>
                    <span className="text-sm font-bold text-teal-100">Botol ({syrupResults.activeForm.bottleSizeMl} mL)</span>
                  </div>
                  <span className="text-xs text-teal-200/70 mt-1 block font-mono">
                    Total volume dibutuhkan: {syrupResults.totalMlNeeded} mL
                  </span>
                </div>
              </div>

              {/* Beyond Use Date (BUD) Warning */}
              <div className="p-4 rounded-xl bg-[#06181c] border border-[#14424e] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-200">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Informasi Beyond Use Date (BUD) & Penyimpanan:
                </div>
                <div className="text-xs text-teal-100/90 space-y-1 font-medium">
                  <p>• Masa simpan aman pasca dilarutkan/dibuka: <strong className="text-amber-300 font-bold">{syrupResults.budDays} Hari</strong>.</p>
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
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Komparasi Rumus Dosis Klasik Farmakope Indonesia</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verifikasi dosis anak terhadap Dosis Maksimum (DM) Dewasa</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Obat Acuan</label>
                <input
                  type="text"
                  value={classicDrugName}
                  onChange={(e) => setClassicDrugName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Dosis Maksimum / Standar Dewasa (mg)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={classicAdultDoseMg}
                    onChange={(e) => setClassicAdultDoseMg(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-3 pr-20 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-600 shadow-2xs"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">mg / dosis</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm overflow-hidden space-y-3">
            <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">Tabel Hasil Perhitungan Semua Rumus</h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-bold">
                    <th className="py-3 px-3">Metode / Rumus</th>
                    <th className="py-3 px-3">Kesesuaian Populasi</th>
                    <th className="py-3 px-3">Formula Perhitungan</th>
                    <th className="py-3 px-3 text-purple-900 dark:text-purple-300 font-black">Hasil Dosis Anak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                  {classicResults.map((res, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                      <td className="py-3 px-3 font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        {res.formulaName}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-medium">{res.indication}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-700 dark:text-slate-300">{res.formulaDescription}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-300 font-black text-xs border border-purple-200 dark:border-purple-800">
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
