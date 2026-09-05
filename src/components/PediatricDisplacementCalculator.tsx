import React, { useState, useMemo } from 'react';
import { 
  PEDIATRIC_DISPLACEMENT_PRESETS, 
  PediatricDisplacementPreset, 
  calculateDisplacementDose,
  DisplacementCalculationResult 
} from '../data/injectableDrugsGuideData';
import { 
  Baby, 
  FlaskConical, 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Syringe, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldAlert, 
  HelpCircle,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DualEvidenceBadge } from './EvidenceSourceBadge';

interface PediatricDisplacementCalculatorProps {
  initialPresetId?: string;
}

export const PediatricDisplacementCalculator: React.FC<PediatricDisplacementCalculatorProps> = ({
  initialPresetId = 'disp-ceftriaxone-1g'
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId);
  const [vialStrengthMg, setVialStrengthMg] = useState<number>(1000);
  const [displacementFactorMl, setDisplacementFactorMl] = useState<number>(0.77);
  const [diluentVolumeMl, setDiluentVolumeMl] = useState<number>(9.23);
  const [targetDoseMg, setTargetDoseMg] = useState<number>(250);
  const [diluentName, setDiluentName] = useState<string>('Water for Injection (WFI)');
  const [patientNote, setPatientNote] = useState<string>('Bayi / Anak');
  const [copied, setCopied] = useState<boolean>(false);

  // Active preset metadata
  const currentPreset = useMemo(() => {
    return PEDIATRIC_DISPLACEMENT_PRESETS.find(p => p.id === selectedPresetId);
  }, [selectedPresetId]);

  // Handle preset change
  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (presetId === 'custom') {
      return;
    }
    const preset = PEDIATRIC_DISPLACEMENT_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setVialStrengthMg(preset.vialStrengthMg);
      setDisplacementFactorMl(preset.displacementVolumeMl);
      setDiluentVolumeMl(preset.defaultDiluentVolumeMl);
      setDiluentName(preset.recommendedDiluent);
      // set reasonable target dose (e.g. 25% of vial)
      setTargetDoseMg(Math.round(preset.vialStrengthMg * 0.25));
    }
  };

  // Calculation output
  const calculation: DisplacementCalculationResult = useMemo(() => {
    const validVial = Number(vialStrengthMg) > 0 ? Number(vialStrengthMg) : 1;
    const validFactor = Number(displacementFactorMl) >= 0 ? Number(displacementFactorMl) : 0;
    const validDiluent = Number(diluentVolumeMl) > 0 ? Number(diluentVolumeMl) : 1;
    const validDose = Number(targetDoseMg) > 0 ? Number(targetDoseMg) : 1;

    return calculateDisplacementDose(validVial, validFactor, validDiluent, validDose);
  }, [vialStrengthMg, displacementFactorMl, diluentVolumeMl, targetDoseMg]);

  // Copy instruction text for nursing bedside chart
  const handleCopyInstruction = () => {
    const text = `[RESEP REKONSTITUSI PEDIATRIK - ALISTAIR GRAY IDG]\n` +
      `Obat: ${currentPreset ? currentPreset.drugName : 'Sediaan Kering'}\n` +
      `Kekuatan Vial: ${calculation.vialStrengthMg} mg\n` +
      `Displacement Factor: ${calculation.displacementVolumeMl} mL\n` +
      `Volume Pelarut Ditambahkan: ${calculation.diluentVolumeAddedMl} mL (${diluentName})\n` +
      `Total Volume Larutan: ${calculation.totalSolutionVolumeMl.toFixed(2)} mL\n` +
      `Konsentrasi Efektif Sebenarnya: ${calculation.trueConcentrationMgMl.toFixed(2)} mg/mL\n` +
      `-----------------------------------------\n` +
      `Target Dosis Pasien: ${calculation.targetPatientDoseMg} mg\n` +
      `VOLUME SPUIT PRESISI: ${calculation.requiredVolumeMl.toFixed(2)} mL\n` +
      `Peringatan: Jika serbuk diabaikan, terjadi error under-dosing sebesar ${Math.abs(calculation.dosingErrorPercentage).toFixed(1)}%.\n` +
      `Referensi: Alistair Gray (2021) Injectable Drugs Guide, Pharmaceutical Press & BNFC.`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-6">
      {/* Educational Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 p-6 text-white shadow-xl border border-sky-500/20">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center gap-1.5">
                <Baby className="w-3.5 h-3.5 text-sky-400" />
                Pediatric & Neonatal Safety Standard
              </span>
              <DualEvidenceBadge nationalPreset="kemenkes-iv" internationalPreset="ashp-iv" size="sm" />
              <span className="text-[11px] font-mono text-slate-400 font-bold">
                Ref: Alistair Gray (2021) &amp; BNF for Children
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-outfit tracking-tight text-white flex items-center gap-2.5">
              <FlaskConical className="w-6 h-6 text-sky-400" />
              Kalkulator Rekonstitusi Pediatrik (Displacement Volume)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Serbuk kering obat suntik <strong>menempati ruang fisik (volume pemindahan)</strong> saat larut. 
              Mengabaikan volume serbuk akan menyebabkan konsentrasi larutan lebih rendah dari dugaan, sehingga pasien bayi/anak menerima <strong>under-dosing 7% hingga 15%</strong>.
            </p>
          </div>

          <button
            onClick={handleCopyInstruction}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs font-outfit shadow-lg transition shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Instruksi Disalin!' : 'Salin Instruksi Spuit'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset & Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#071726] border border-sky-200/80 dark:border-sky-500/25 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-500" />
              Parameter Rekonstitusi Vial
            </h3>

            {/* Preset Selector */}
            <div>
              <label className="block text-xs font-bold font-outfit text-slate-700 dark:text-slate-300 mb-1">
                Pilih Preset Sediaan Serbuk (Alistair Gray 2021):
              </label>
              <select
                value={selectedPresetId}
                onChange={(e) => handlePresetSelect(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-bold font-outfit text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                {PEDIATRIC_DISPLACEMENT_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.drugName} (Disp: {p.displacementVolumeMl} mL)
                  </option>
                ))}
                <option value="custom">⚙️ Kustom / Masukkan Nilai Manual</option>
              </select>
            </div>

            {/* Preset Clinical Insight */}
            {currentPreset && (
              <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200/60 dark:border-sky-800/60 text-xs space-y-1">
                <span className="font-black text-sky-900 dark:text-sky-300 block flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  Karakteristik Fisik Serbuk:
                </span>
                <p className="text-slate-700 dark:text-slate-300 font-medium font-outfit leading-relaxed">
                  {currentPreset.clinicalPearls}
                </p>
              </div>
            )}

            {/* Input Controls */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold font-outfit text-slate-600 dark:text-slate-400 mb-1">
                  Kekuatan Vial (mg):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={vialStrengthMg}
                    onChange={(e) => setVialStrengthMg(Number(e.target.value))}
                    min="1"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-black font-mono text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                  <span className="absolute right-3 top-2 text-[10px] font-bold text-slate-400 font-mono">mg</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold font-outfit text-slate-600 dark:text-slate-400 mb-1">
                  Displacement Vol (mL):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={displacementFactorMl}
                    onChange={(e) => setDisplacementFactorMl(Number(e.target.value))}
                    min="0"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-black font-mono text-sky-600 dark:text-sky-400 focus:outline-none focus:border-sky-500"
                  />
                  <span className="absolute right-3 top-2 text-[10px] font-bold text-slate-400 font-mono">mL</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold font-outfit text-slate-600 dark:text-slate-400 mb-1">
                  Pelarut Ditambahkan (mL):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.05"
                    value={diluentVolumeMl}
                    onChange={(e) => setDiluentVolumeMl(Number(e.target.value))}
                    min="0.1"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-black font-mono text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                  <span className="absolute right-3 top-2 text-[10px] font-bold text-slate-400 font-mono">mL</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold font-outfit text-slate-600 dark:text-slate-400 mb-1">
                  Target Dosis Pasien (mg):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    value={targetDoseMg}
                    onChange={(e) => setTargetDoseMg(Number(e.target.value))}
                    min="0.1"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-amber-300 dark:border-amber-700/80 rounded-xl px-3 py-2 text-xs font-black font-mono text-amber-900 dark:text-amber-300 focus:outline-none focus:border-amber-500"
                  />
                  <span className="absolute right-3 top-2 text-[10px] font-bold text-slate-400 font-mono">mg</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold font-outfit text-slate-600 dark:text-slate-400 mb-1">
                Catatan Pasien / Bedside:
              </label>
              <input
                type="text"
                value={patientNote}
                onChange={(e) => setPatientNote(e.target.value)}
                placeholder="Contoh: Bayi A (3.2 kg, Ruang Perina)"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-medium font-outfit text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: High-Precision Result & Dosing Error Alert */}
        <div className="lg:col-span-7 space-y-4">
          {/* Hero Precision Result Card */}
          <div className="bg-gradient-to-br from-white via-sky-50/50 to-blue-50/30 dark:from-[#071726] dark:via-[#091e33] dark:to-[#040e1a] border-2 border-sky-400/80 dark:border-sky-500/50 rounded-3xl p-6 shadow-md space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-sky-200/80 dark:border-sky-800/80">
              <span className="text-xs font-black font-outfit uppercase tracking-wider text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                <Syringe className="w-4 h-4 text-sky-500" />
                Hasil Perhitungan Spuit Presisi (Gray 2021)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-xs">
                Koreksi Serbuk Aktif
              </span>
            </div>

            {/* Main Big Number: Required Volume */}
            <div className="bg-white dark:bg-slate-950/80 rounded-2xl p-5 border border-sky-200 dark:border-sky-800 text-center shadow-inner space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-outfit uppercase tracking-wider">
                Volume yang Harus Diambil dengan Spuit Presisi:
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-sky-600 dark:text-sky-400 tracking-tight">
                {calculation.requiredVolumeMl.toFixed(2)} <span className="text-xl sm:text-2xl font-bold text-slate-600 dark:text-slate-400">mL</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Untuk memenuhi dosis target <strong>{calculation.targetPatientDoseMg} mg</strong> ({patientNote})
              </p>
            </div>

            {/* Breakdown Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold block text-[10px] font-outfit">Total Volume Larutan:</span>
                <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
                  {calculation.totalSolutionVolumeMl.toFixed(2)} mL
                </span>
                <span className="text-[10px] text-slate-400 block">Pelarut + Serbuk</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold block text-[10px] font-outfit">Konsentrasi Sebenarnya:</span>
                <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {calculation.trueConcentrationMgMl.toFixed(2)} mg/mL
                </span>
                <span className="text-[10px] text-slate-400 block">Koreksi displacement</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold block text-[10px] font-outfit">Volume Pemindahan ($V_d$):</span>
                <span className="text-sm font-black font-mono text-sky-600 dark:text-sky-400">
                  {calculation.displacementVolumeMl} mL
                </span>
                <span className="text-[10px] text-slate-400 block">Ruang serbuk</span>
              </div>
            </div>

            {/* Error Analysis Box: What if powder is ignored? */}
            <div className={`p-4 rounded-2xl border-2 space-y-2 ${
              Math.abs(calculation.dosingErrorPercentage) >= 5
                ? 'bg-rose-50/90 dark:bg-rose-950/30 border-rose-400 dark:border-rose-700/80 text-rose-950 dark:text-rose-100'
                : 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-400 dark:border-amber-700/80 text-amber-950 dark:text-amber-100'
            }`}>
              <div className="flex items-center gap-2 font-black font-outfit text-xs sm:text-sm">
                <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>Analisis Risiko Klinis (Jika Mengabaikan Serbuk):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-950/60 border border-rose-200 dark:border-rose-900/60">
                  <span className="text-[10px] font-bold text-slate-500 block">Jika Serbuk Diabaikan:</span>
                  <p className="font-mono text-xs font-bold text-rose-700 dark:text-rose-300">
                    Spuit ditarik: {calculation.nominalVolumeIfDisplacementIgnoredMl.toFixed(2)} mL
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Dosis nyata: {(calculation.nominalVolumeIfDisplacementIgnoredMl * calculation.trueConcentrationMgMl).toFixed(1)} mg
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-950/60 border border-rose-200 dark:border-rose-900/60">
                  <span className="text-[10px] font-bold text-slate-500 block">Selisih Dosis (Under-dosing):</span>
                  <p className="font-mono text-sm font-black text-rose-600 dark:text-rose-400">
                    -{Math.abs(calculation.dosingErrorPercentage).toFixed(1)}%
                  </p>
                  <p className="text-[10px] text-rose-600 dark:text-rose-300 font-bold">
                    Bayi menerima dosis lebih sedikit!
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed font-medium font-outfit pt-1">
                {calculation.interpretationMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
