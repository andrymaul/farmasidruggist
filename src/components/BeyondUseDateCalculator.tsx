import React, { useState, useMemo } from 'react';
import {
  CalendarClock,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Printer,
  Share2,
  Copy,
  Check,
  Layers,
  BookOpen,
  Info,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  TestTubes,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  BUD_DOSAGE_RULES,
  COMMERCIAL_DRUG_RECONSTITUTIONS,
  DosageFormCategory,
  BudDosageRule,
  CommercialDrugReconstitution
} from '../data/beyondUseDateData';

interface BeyondUseDateCalculatorProps {
  onSelectTab?: (tabId: string) => void;
  onOpenPricingModal?: () => void;
}

export const BeyondUseDateCalculator: React.FC<BeyondUseDateCalculatorProps> = ({
  onSelectTab,
  onOpenPricingModal
}) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'directory' | 'matrix'>('calculator');

  // 1. Calculator State
  const [selectedCategory, setSelectedCategory] = useState<DosageFormCategory>('non_aqueous_solid');
  const [compoundingDate, setCompoundingDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [compoundingTime, setCompoundingTime] = useState<string>('08:00');
  const [rawMaterialExpiryDate, setRawMaterialExpiryDate] = useState<string>(() => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 2);
    return future.toISOString().split('T')[0];
  });
  const [patientName, setPatientName] = useState<string>('Ny. Siti Rahma (32 th)');
  const [recipeName, setRecipeName] = useState<string>('Puyer Racikan Paracetamol + CTM (15 Bungkus)');
  const [copiedLabel, setCopiedLabel] = useState<boolean>(false);

  // 2. Directory State
  const [dirSearchQuery, setDirSearchQuery] = useState<string>('');
  const [dirFormTypeFilter, setDirFormTypeFilter] = useState<string>('all');
  const [selectedReconstitutionModal, setSelectedReconstitutionModal] = useState<CommercialDrugReconstitution | null>(null);

  // Active Dosage Rule Object
  const currentRule = useMemo(() => {
    return BUD_DOSAGE_RULES.find(r => r.id === selectedCategory) || BUD_DOSAGE_RULES[0];
  }, [selectedCategory]);

  // BUD Calculation Engine
  const calculatedBud = useMemo(() => {
    const start = new Date(`${compoundingDate}T${compoundingTime}:00`);
    const rawExp = new Date(`${rawMaterialExpiryDate}T23:59:59`);

    let budDate = new Date(start);
    let calculationExplanation = '';
    let isConstrainedByRawMaterial = false;

    // Days difference between compounding and raw material ED
    const diffTime = rawExp.getTime() - start.getTime();
    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    switch (selectedCategory) {
      case 'non_aqueous_solid': {
        // 25% of remaining days OR 180 days (whichever is shorter)
        const twentyFivePercentDays = Math.floor(diffDays * 0.25);
        const maxDays = Math.min(180, twentyFivePercentDays);

        if (twentyFivePercentDays < 180) {
          isConstrainedByRawMaterial = true;
          calculationExplanation = `25% dari sisa ED bahan baku (${diffDays} hari) = ${twentyFivePercentDays} hari (lebih singkat dari batas maksimal 180 hari).`;
        } else {
          calculationExplanation = `Batas maksimal USP <795> untuk sediaan padat bebas air adalah 180 hari (6 bulan).`;
        }

        budDate.setDate(budDate.getDate() + maxDays);
        break;
      }

      case 'oral_water_containing': {
        // 14 days in refrigerator
        calculationExplanation = `Batas maksimal USP <795> untuk sediaan cair oral mengandung air adalah 14 hari bila disimpan di kulkas (2°C - 8°C).`;
        budDate.setDate(budDate.getDate() + 14);
        break;
      }

      case 'topical_water_containing': {
        // 30 days room temp
        calculationExplanation = `Batas maksimal USP <795> untuk sediaan topikal/mukosal berair (krim/gel) adalah 30 hari pada suhu ruang terkontrol.`;
        budDate.setDate(budDate.getDate() + 30);
        break;
      }

      case 'commercial_dry_syrup': {
        // 14 days standard
        calculationExplanation = `Umumnya 7 hingga 14 hari setelah rekonstitusi air (sesuai Farmakope Indonesia VI dan brosur pabrik).`;
        budDate.setDate(budDate.getDate() + 14);
        break;
      }

      case 'sterile_sdv': {
        // 1 hour outside LAF / 6 hours inside LAF
        calculationExplanation = `Single-Dose Vial (SDV) tanpa pengawet: Maksimal 1 jam jika ditusuk di bangsal / 6 jam jika di LAF ISO Class 5.`;
        budDate.setHours(budDate.getHours() + 1);
        break;
      }

      case 'sterile_mdv': {
        // 28 days
        calculationExplanation = `Multi-Dose Vial (MDV) dengan pengawet antimikroba (misal Insulin Pen / Lidocain): Maksimal 28 hari pasca tusukan pertama.`;
        budDate.setDate(budDate.getDate() + 28);
        break;
      }

      case 'ophthalmic_multidose': {
        // 28 days
        calculationExplanation = `Sediaan tetes mata / salep mata botol multidose berpengawet: Maksimal 28 hari (4 minggu) pasca buka segel.`;
        budDate.setDate(budDate.getDate() + 28);
        break;
      }

      case 'ophthalmic_minidose': {
        // 3 days (72 hours)
        calculationExplanation = `Tetes mata strip minidose tanpa pengawet: Maksimal 3 x 24 jam (72 jam) setelah tutup dibuka.`;
        budDate.setDate(budDate.getDate() + 3);
        break;
      }
    }

    // Safety fallback: BUD cannot exceed raw material expiration date
    if (budDate > rawExp) {
      budDate = new Date(rawExp);
      isConstrainedByRawMaterial = true;
      calculationExplanation += ' (Dibatasi oleh tanggal kadaluarsa bahan baku terdekat).';
    }

    const formattedDate = budDate.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const formattedTime = budDate.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return {
      dateObj: budDate,
      formattedDate,
      formattedTime,
      calculationExplanation,
      isConstrainedByRawMaterial
    };
  }, [selectedCategory, compoundingDate, compoundingTime, rawMaterialExpiryDate]);

  // Filtered Reconstitution Directory
  const filteredReconstitutionList = useMemo(() => {
    return COMMERCIAL_DRUG_RECONSTITUTIONS.filter(item => {
      const matchType = dirFormTypeFilter === 'all' || item.formType === dirFormTypeFilter;
      if (!matchType) return false;

      if (!dirSearchQuery.trim()) return true;
      const q = dirSearchQuery.toLowerCase();
      return (
        item.drugName.toLowerCase().includes(q) ||
        item.genericName.toLowerCase().includes(q) ||
        item.brandExamples.some(b => b.toLowerCase().includes(q))
      );
    });
  }, [dirSearchQuery, dirFormTypeFilter]);

  // Copy Label to Clipboard
  const handleCopyEtiket = () => {
    const labelText = [
      `======================================`,
      `       INSTALASI FARMASI & APOTEK`,
      `    ETIKET RACIKAN & PENETAPAN BUD`,
      `======================================`,
      `Nama Pasien: ${patientName}`,
      `Nama Obat: ${recipeName}`,
      `Bentuk Sediaan: ${currentRule.name}`,
      `--------------------------------------`,
      `Tanggal Racik : ${compoundingDate} Pukul ${compoundingTime} WIB`,
      `BUD / JATUH TEMPO: ${calculatedBud.formattedDate}`,
      `Waktu Kedaluwarsa : Pukul ${calculatedBud.formattedTime} WIB`,
      `--------------------------------------`,
      `Penyimpanan: ${currentRule.storageCondition}`,
      `Standar Acuan: ${currentRule.uspStandard}`,
      `======================================`
    ].join('\n');

    navigator.clipboard.writeText(labelText);
    setCopiedLabel(true);
    setTimeout(() => setCopiedLabel(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c312d] via-[#10433e] to-[#153e3a] p-6 sm:p-8 text-white shadow-xl border border-teal-500/20">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
          <CalendarClock className="w-48 h-48 text-emerald-300" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-outfit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Standar Akreditasi KARS / STARKES, USP &lt;795&gt;, &lt;797&gt; &amp; Farmakope Indonesia VI</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg shrink-0">
                <CalendarClock className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
                  Kalkulator &amp; Stabilitas Beyond Use Date (BUD)
                </h1>
                <p className="text-xs sm:text-sm text-teal-100/80 font-medium">
                  Penetapan batas kadaluarsa sediaan racikan puyer, sirup oral, krim/gel, sirup kering, tetes mata, insulin pen, dan sediaan injeksi steril.
                </p>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-teal-200">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span>Aturan 25% Sisa ED &amp; 180 Hari</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-emerald-200">
                <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                <span>Kalkulator Tanggal &amp; Jam Presisi</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs flex items-center gap-1.5 font-bold text-cyan-200">
                <Printer className="w-3.5 h-3.5 text-cyan-300" />
                <span>Generator Stiker Etiket Farmasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION SUBTABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <CalendarClock className="w-4 h-4" />
          <span>Kalkulator BUD &amp; Etiket Racikan</span>
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'directory'
              ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <TestTubes className="w-4 h-4" />
          <span>Direktori Rekonstitusi Obat Paten</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'matrix'
              ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Matriks Regulasi USP &lt;795&gt; &amp; &lt;797&gt;</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: KALKULATOR PENETAPAN BUD & ETIKET RESEP                        */}
      {/* ========================================================================= */}
      {activeTab === 'calculator' && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Input Parameters (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                  Parameter Peracikan &amp; Sediaan Obat
                </h3>
                <p className="text-xs text-slate-500">
                  Pilih bentuk sediaan, masukkan tanggal peracikan, dan tanggal kadaluarsa (ED) bahan baku terdekat.
                </p>
              </div>

              {/* 1. Dosage Form Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  1. Bentuk Sediaan &amp; Karakteristik Formula:
                </label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value as DosageFormCategory)}
                  className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/40"
                >
                  <option value="non_aqueous_solid">
                    Puyer / Pulveres / Kapsul / Salep Anhidrat (Maks 180 Hari / 25% ED)
                  </option>
                  <option value="oral_water_containing">
                    Sirup Oral / Suspensi Racikan Berair (Maks 14 Hari di Kulkas 2-8°C)
                  </option>
                  <option value="topical_water_containing">
                    Krim / Gel / Pasta Berair Topikal (Maks 30 Hari Suhu Ruang)
                  </option>
                  <option value="commercial_dry_syrup">
                    Sirup Kering Rekonstitusi Pabrik (Umumnya 7 - 14 Hari)
                  </option>
                  <option value="sterile_sdv">
                    Single-Dose Vial / Ampul Steril (Maks 1 Jam Non-LAF / 6 Jam LAF)
                  </option>
                  <option value="sterile_mdv">
                    Multi-Dose Vial / Insulin Pen Berpengawet (Maks 28 Hari)
                  </option>
                  <option value="ophthalmic_multidose">
                    Tetes Mata / Salep Mata Botol Multidose (Maks 28 Hari / 4 Minggu)
                  </option>
                  <option value="ophthalmic_minidose">
                    Tetes Mata Minidose / Unit-Dose Tanpa Pengawet (Maks 3 x 24 Jam)
                  </option>
                </select>
              </div>

              {/* 2. Date & Time of Compounding */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    2. Tanggal Peracikan / Pembukaan Segel:
                  </label>
                  <input
                    type="date"
                    value={compoundingDate}
                    onChange={e => setCompoundingDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Jam Peracikan (WIB):
                  </label>
                  <input
                    type="time"
                    value={compoundingTime}
                    onChange={e => setCompoundingTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* 3. Raw Material Shortest Expiration Date (for Non-Aqueous solids) */}
              {selectedCategory === 'non_aqueous_solid' && (
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 font-outfit">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Aturan 25% Sisa ED Bahan Baku Terdekat:</span>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-amber-950 dark:text-amber-200 block">
                      Tanggal Kadaluarsa (ED) Terdekat pada Kemasan Pabrik:
                    </label>
                    <input
                      type="date"
                      value={rawMaterialExpiryDate}
                      onChange={e => setRawMaterialExpiryDate(e.target.value)}
                      className="w-full p-2 rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* 4. Etiket Info Optional */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Nama Pasien (untuk Etiket):</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Nama Sediaan / Resep:</label>
                  <input
                    type="text"
                    value={recipeName}
                    onChange={e => setRecipeName(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Right: Calculated BUD Result & Printable Etiket Card (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Result Summary Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/40 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-outfit uppercase">
                    Hasil Perhitungan BUD Resmi
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {currentRule.uspStandard}
                  </span>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Jatuh Tempo Beyond Use Date:
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-950 dark:text-emerald-300 font-outfit mt-0.5">
                    {calculatedBud.formattedDate}
                  </div>
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">
                    Pukul {calculatedBud.formattedTime} WIB
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800/80 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  <div>
                    <strong>Petunjuk Penyimpanan:</strong> {currentRule.storageCondition}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                    {calculatedBud.calculationExplanation}
                  </div>
                </div>
              </div>

              {/* Printable Etiket Preview Card */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-dashed border-slate-300 dark:border-slate-700 pb-2">
                  <div className="font-bold font-sans text-slate-900 dark:text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <span>Preview Etiket Racikan:</span>
                  </div>
                  <button
                    onClick={handleCopyEtiket}
                    className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-800 text-[10px] font-bold font-sans flex items-center gap-1 hover:bg-teal-100 cursor-pointer"
                  >
                    {copiedLabel ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLabel ? 'Tersalin!' : 'Salin Teks'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 space-y-1 text-[11px]">
                  <div className="font-bold text-center border-b border-dashed pb-1">
                    APOTEK / INSTALASI FARMASI
                  </div>
                  <div><strong>Pasien:</strong> {patientName}</div>
                  <div><strong>R/ :</strong> {recipeName}</div>
                  <div><strong>Tgl Racik:</strong> {compoundingDate} ({compoundingTime})</div>
                  <div className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold">
                    BUD: {calculatedBud.formattedDate}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Simpan: {currentRule.storageCondition}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: DIREKTORI STABILITAS REKONSTITUSI OBAT PATEN                    */}
      {/* ========================================================================= */}
      {activeTab === 'directory' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari obat sirup kering, serbuk injeksi, insulin (misal: Amoxicillin, Meropenem, Ceftriaxone, Novorapid)..."
                value={dirSearchQuery}
                onChange={e => setDirSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <select
              value={dirFormTypeFilter}
              onChange={e => setDirFormTypeFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="all">Semua Bentuk Sediaan</option>
              <option value="Dry Syrup">Sirup Kering (Dry Syrup)</option>
              <option value="Injeksi IV/IM Powder">Injeksi Serbuk Rekonstitusi</option>
              <option value="Injeksi Insulin">Injeksi Insulin</option>
            </select>
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReconstitutionList.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                        {item.drugName}
                      </h4>
                      <div className="text-xs text-slate-500 font-medium">({item.genericName})</div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                      {item.formType}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 pt-1">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                      <strong>Pelarut:</strong> {item.reconstitutionDiluent}
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold border border-emerald-200 dark:border-emerald-800">
                      BUD Kulkas (2-8°C): {item.budRefrigerated}
                    </div>
                    <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 font-bold border border-amber-200 dark:border-amber-800">
                      BUD Suhu Ruang: {item.budRoomTemp}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">Contoh: {item.brandExamples.slice(0, 2).join(', ')}</span>
                  <button
                    onClick={() => setSelectedReconstitutionModal(item)}
                    className="font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: MATRIKS REGULASI USP <795> & <797>                              */}
      {/* ========================================================================= */}
      {activeTab === 'matrix' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 rounded-3xl bg-teal-500/10 border border-teal-500/30 space-y-2">
            <div className="flex items-center gap-2 text-teal-900 dark:text-teal-300 font-black text-sm font-outfit">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <span>Ringkasan Regulasi Standar Beyond Use Date Farmakope VI &amp; USP</span>
            </div>
            <p className="text-xs text-teal-950 dark:text-teal-200/90 leading-relaxed">
              Panduan resmi untuk akreditasi rumah sakit (STARKES / KARS) dan inspeksi sarana pelayanan kefarmasian oleh BPOM &amp; Dinas Kesehatan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BUD_DOSAGE_RULES.map(rule => (
              <div
                key={rule.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <h4 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                    {rule.name}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold text-xs">
                    {rule.uspStandard}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-bold border border-emerald-200 dark:border-emerald-800">
                    ⏱️ Formula BUD: {rule.maxBudFormula}
                  </div>

                  <div>
                    <strong>Kondisi Simpan:</strong> {rule.storageCondition}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rule.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1 text-slate-700 dark:text-slate-300">
                    <div className="font-bold text-[11px] text-teal-700 dark:text-teal-300">Contoh Sediaan:</div>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      {rule.examples.map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Detail Rekonstitusi Obat Paten */}
      {selectedReconstitutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0c1f20] w-full max-w-2xl rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 border border-slate-200 dark:border-teal-900/60 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white font-outfit">
                  {selectedReconstitutionModal.drugName}
                </h3>
                <div className="text-xs text-slate-500 font-medium">{selectedReconstitutionModal.genericName} • {selectedReconstitutionModal.formType}</div>
              </div>
              <button
                onClick={() => setSelectedReconstitutionModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Instruksi Rekonstitusi &amp; Pelarut:
                </div>
                <div><strong>Pelarut yang Direkomendasikan:</strong> {selectedReconstitutionModal.reconstitutionDiluent}</div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{selectedReconstitutionModal.volumeOrInstruction}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 space-y-1">
                  <div className="font-bold uppercase tracking-wider text-[11px]">Lemari Es (2°C - 8°C):</div>
                  <div className="font-black text-sm">{selectedReconstitutionModal.budRefrigerated}</div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-1">
                  <div className="font-bold uppercase tracking-wider text-[11px]">Suhu Ruang (&lt; 25°C - 30°C):</div>
                  <div className="font-black text-sm">{selectedReconstitutionModal.budRoomTemp}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Catatan Khusus Penyimpanan:</div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedReconstitutionModal.storageNotes}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-[11px]">
                <strong>Rujukan:</strong> {selectedReconstitutionModal.references}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
