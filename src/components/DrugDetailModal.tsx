import React from 'react';
import { Drug, DrugInteraction } from '../types';
import { 
  X, 
  Pill, 
  Tag, 
  AlertTriangle, 
  Activity, 
  ShieldAlert, 
  FileText, 
  Info, 
  ChevronRight, 
  Sparkles, 
  Baby, 
  Dna, 
  HeartPulse, 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2,
  Smartphone,
  HeartHandshake
} from 'lucide-react';
import { getBpomBadge } from '../utils/bpomHelper';
import { getPregnancySafetyProfile, getFdaCategoryBadgeStyle, getHaleBadgeStyle } from '../utils/pregnancySyncHelper';
import { EvidenceSourceBadge, DualEvidenceBadge } from './EvidenceSourceBadge';

interface DrugDetailModalProps {
  drug: Drug | null;
  allInteractions: DrugInteraction[];
  allDrugs: Drug[];
  onClose: () => void;
  onCheckInteractionWith: (targetDrugName: string) => void;
  onAddToPioCard?: (drug: Drug) => void;
  onOpenPregnancyChecker?: (drugName: string) => void;
}

export const DrugDetailModal: React.FC<DrugDetailModalProps> = ({
  drug,
  allInteractions,
  allDrugs,
  onClose,
  onCheckInteractionWith,
  onAddToPioCard,
  onOpenPregnancyChecker
}) => {
  if (!drug) return null;

  const bpomBadge = getBpomBadge(drug);
  const pregProfile = getPregnancySafetyProfile(drug);
  const fdaStyle = getFdaCategoryBadgeStyle(pregProfile?.fdaCategory);
  const haleStyle = pregProfile?.halesLactationRating
    ? getHaleBadgeStyle(pregProfile.halesLactationRating)
    : null;

  const relatedInteractions = (allInteractions || []).filter(
    (i) =>
      i.drugAName.toLowerCase() === drug.name.toLowerCase() ||
      i.drugBName.toLowerCase() === drug.name.toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#051a1e] border-2 border-teal-500/40 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 p-6 text-white border-b border-teal-700/60 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-teal-100 hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${bpomBadge.style}`}>
              {bpomBadge.label}
            </span>
            <span className="bg-[#0f766e] text-teal-100 text-[10px] px-2 py-0.5 rounded font-black border border-teal-500/40 shadow-2xs">
              ATC: {drug.atcCode}
            </span>
            {drug.pregnancyCategory && (
              <span className="bg-[#0a2f38] text-teal-200 text-[10px] px-2 py-0.5 rounded font-bold border border-teal-700/50 flex items-center gap-1">
                <Baby className="w-3 h-3 text-teal-300" />
                <span>Kehamilan: Kat. {drug.pregnancyCategory}</span>
              </span>
            )}
            <DualEvidenceBadge 
              nationalPreset={drug.id.includes('fornas') ? 'fornas' : 'bpom'} 
              internationalPreset={drug.offLabelIndication ? 'ebm-offlabel' : 'ddinter'}
              size="sm" 
            />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">{drug.name}</h2>
          <p className="text-teal-200/90 text-xs mt-0.5 font-medium">Generik: {drug.genericName}</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs text-slate-700 dark:text-slate-300">
          
          {/* FDA Black Box Warning (Peringatan Kotak Hitam Khusus) */}
          {drug.blackBoxWarning && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950 via-rose-900 to-red-950 text-rose-100 border-2 border-rose-500/80 shadow-lg space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-rose-300 font-black tracking-wide uppercase text-[11px]">
                  <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse shrink-0" />
                  <span>Peringatan Khusus Fatal (FDA Boxed Warning)</span>
                </div>
                <DualEvidenceBadge 
                  nationalPreset="bpom" 
                  internationalPreset="fda-pllr" 
                  size="sm" 
                />
              </div>
              <p className="text-rose-100 font-medium leading-relaxed whitespace-pre-line text-xs pl-6">
                {drug.blackBoxWarning}
              </p>
            </div>
          )}

          {/* Brand Names */}
          <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-xl border border-teal-100 dark:border-teal-900/50 space-y-1.5">
            <div className="flex items-center gap-1.5 text-teal-800 dark:text-teal-300 font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>Merk Dagang (Indonesia & Internasional):</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {drug.brandNames && drug.brandNames.length > 0 ? (
                drug.brandNames.map((brand, i) => (
                  <span
                    key={i}
                    className="bg-white dark:bg-slate-800 text-teal-900 dark:text-teal-200 font-semibold px-2.5 py-0.5 rounded border border-teal-200 dark:border-teal-700 shadow-2xs"
                  >
                    {brand}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 italic">Data merk dagang tersedia pada resep</span>
              )}
            </div>
          </div>

          {/* Indikasi & Dosis Ringkasan */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-bold">
              <Activity className="w-4 h-4" />
              <span>Indikasi Klinis Resmi</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">{drug.indication}</p>
          </div>

          {/* Dosis & Cara Pemberian Lengkap */}
          <div className="bg-gradient-to-br from-teal-50/70 via-slate-50 to-white dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-850 p-5 rounded-2xl border border-teal-200/80 dark:border-teal-900/60 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-teal-100 dark:border-slate-700 pb-2.5">
              <div className="flex items-center gap-2 text-teal-900 dark:text-teal-300 font-extrabold text-sm">
                <Pill className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Dosis & Cara Pemberian Lengkap</span>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-200 border border-teal-300 dark:border-teal-700">
                Panduan Terapi
              </span>
            </div>

            {/* Dosis Dewasa per Indikasi */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <span>Dosis Dewasa (Adult Dosage Guidelines):</span>
              </span>
              <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 leading-relaxed text-xs whitespace-pre-line shadow-2xs font-medium">
                {drug.adultDosage || drug.dosage}
              </div>
            </div>

            {/* Sub-grid for Special Populations: Pediatrik, Geriatri, Penyesuaian Ginjal/Hati */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {drug.pediatricDosage && (
                <div className="bg-pink-50/70 dark:bg-pink-950/30 p-3 rounded-xl border border-pink-300 dark:border-pink-800 space-y-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-pink-800 dark:text-pink-300 font-black text-[11px]">
                    <Baby className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                    <span>🌸 Dosis Pediatrik / Anak (Pediatric Dose):</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed whitespace-pre-line font-medium">
                    {drug.pediatricDosage}
                  </p>
                </div>
              )}

              {drug.geriatricDosage && (
                <div className="bg-white dark:bg-slate-900/90 p-3 rounded-xl border border-purple-200 dark:border-purple-900/50 space-y-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-purple-800 dark:text-purple-300 font-bold text-[11px]">
                    <Activity className="w-3.5 h-3.5 text-purple-600" />
                    <span>Dosis Geriatri / Usia Lanjut (Geriatric Dose):</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed whitespace-pre-line">
                    {drug.geriatricDosage}
                  </p>
                </div>
              )}

              {drug.renalDoseAdjustment && (
                <div className="bg-white dark:bg-slate-900/90 p-3 rounded-xl border border-sky-200 dark:border-sky-900/50 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-sky-800 dark:text-sky-300 font-bold text-[11px]">
                      <FileText className="w-3.5 h-3.5 text-sky-600" />
                      <span>Penyesuaian Dosis Gangguan Ginjal (Renal Adjustment):</span>
                    </div>
                    <DualEvidenceBadge 
                      nationalPreset="pnpk-papdi" 
                      internationalPreset="kdigo-renal" 
                      size="sm" 
                    />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed whitespace-pre-line">
                    {drug.renalDoseAdjustment}
                  </p>
                </div>
              )}

              {drug.hepaticDoseAdjustment && (
                <div className="bg-white dark:bg-slate-900/90 p-3 rounded-xl border border-rose-200 dark:border-rose-900/50 space-y-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300 font-bold text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Penyesuaian Dosis Gangguan Hati (Hepatic Adjustment):</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed whitespace-pre-line">
                    {drug.hepaticDoseAdjustment}
                  </p>
                </div>
              )}
            </div>

            {/* Dosis Maksimal & Petunjuk Administrasi */}
            {(drug.maxDoseLimit || drug.administrationGuideline) && (
              <div className="bg-teal-50/80 dark:bg-slate-900/90 p-3.5 rounded-xl border border-teal-200 dark:border-slate-700 space-y-2 text-xs">
                {drug.maxDoseLimit && (
                  <p className="text-slate-800 dark:text-slate-200 font-semibold">
                    <strong className="text-teal-900 dark:text-teal-300">Batas Dosis Maksimal:</strong> {drug.maxDoseLimit}
                  </p>
                )}
                {drug.administrationGuideline && (
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-teal-900 dark:text-teal-300">Petunjuk Administrasi:</strong> {drug.administrationGuideline}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Indikasi Off-Label (Jika Ada) */}
          {drug.offLabelIndication && (
            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-purple-900 dark:text-purple-300 font-extrabold text-xs">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Penggunaan Klinis Off-Label &amp; Dosis (Evidence-Based Off-Label Uses)</span>
                </div>
                <div className="flex items-center gap-2">
                  <DualEvidenceBadge 
                    nationalPreset="pnpk" 
                    internationalPreset="ebm-offlabel" 
                    size="sm" 
                  />
                </div>
              </div>
              <p className="text-purple-950 dark:text-purple-200 leading-relaxed font-medium text-xs whitespace-pre-line">
                {drug.offLabelIndication}
              </p>
            </div>
          )}

          {/* Parameter Pemantauan Terapi & Konseling Pasien */}
          {(drug.monitoringParameters || drug.patientTips) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drug.monitoringParameters && (
                <div className="bg-sky-50 dark:bg-sky-950/30 p-4 rounded-xl border border-sky-200 dark:border-sky-900/50 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-sky-900 dark:text-sky-300 font-bold">
                    <HeartPulse className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>Parameter Pemantauan Terapi (Lab & TTV)</span>
                  </div>
                  <p className="text-sky-950 dark:text-sky-200 leading-relaxed">
                    {drug.monitoringParameters}
                  </p>
                </div>
              )}

              {drug.patientTips && (
                <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Tips Konseling Apoteker & Edukasi Pasien</span>
                  </div>
                  <p className="text-emerald-950 dark:text-emerald-200 leading-relaxed">
                    {drug.patientTips}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Waktu Terhadap Makanan & Gaya Hidup */}
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-bold">
              <span className="text-base">🍽️</span>
              <span>Waktu Terhadap Makanan & Gaya Hidup</span>
            </div>
            <p className="text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
              {drug.foodInteraction || 'Dapat diminum dengan atau tanpa makanan. Konsultasikan dengan Apoteker bila ada keluhan lambung.'}
            </p>
          </div>

          {/* Profil Keamanan Maternal & Laktasi (Synchronized with Pregnancy & Lactation Hub) */}
          <div className="bg-gradient-to-br from-purple-50/90 via-pink-50/60 to-purple-50/90 dark:from-purple-950/40 dark:via-pink-950/20 dark:to-purple-950/40 p-5 rounded-2xl border border-purple-200 dark:border-purple-800/60 space-y-3.5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-200/80 dark:border-purple-800/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  <Baby className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-purple-950 dark:text-purple-100 flex items-center gap-1.5">
                    <span>Keamanan Ibu Hamil & Menyusui (FDA PLLR & Hale's Scale)</span>
                  </h4>
                  <p className="text-[11px] text-purple-800/80 dark:text-purple-300/80 font-medium">
                    Sinkronisasi Terpadu dengan Database Keamanan Bumil & Busui
                  </p>
                </div>
              </div>

              {/* Action: Skrining Cepat */}
              {onOpenPregnancyChecker && (
                <button
                  onClick={() => onOpenPregnancyChecker(drug.name)}
                  className="bg-purple-700 hover:bg-purple-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto hover:scale-[1.02]"
                >
                  <Sparkles className="w-3 h-3 text-purple-200" />
                  <span>Buka di Skrining Bumil</span>
                </button>
              )}
            </div>

            {/* Badges Overview */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg border flex items-center gap-1 shadow-2xs ${fdaStyle.bg} ${fdaStyle.text} ${fdaStyle.border}`}>
                <span>🤰 {fdaStyle.badgeLabel}</span>
              </span>

              {haleStyle && (
                <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg border flex items-center gap-1 shadow-2xs ${haleStyle.bg} ${haleStyle.text} ${haleStyle.border}`}>
                  <span>🍼 {haleStyle.badgeLabel}</span>
                </span>
              )}

              {pregProfile && pregProfile.relativeInfantDosePercent !== undefined && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg border bg-sky-50 dark:bg-sky-950/70 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-700 flex items-center gap-1 shadow-2xs">
                  <span>💧 RID: {pregProfile.relativeInfantDosePercent}{typeof pregProfile.relativeInfantDosePercent === 'number' ? '%' : ''}</span>
                </span>
              )}
            </div>

            {/* Teratogenic Alert Callout (If Any) */}
            {pregProfile?.teratogenicAlert && (
              <div className="p-3.5 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-950 dark:text-rose-100 border border-rose-300 dark:border-rose-800 space-y-1 shadow-2xs">
                <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300 font-black text-xs uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 animate-bounce" />
                  <span>PERINGATAN RISIKO TERATOGENIK:</span>
                </div>
                <p className="text-xs font-semibold leading-relaxed pl-5">
                  {pregProfile.teratogenicAlert}
                </p>
              </div>
            )}

            {/* PLLR & Clinical Summary */}
            <div className="text-xs text-purple-950 dark:text-purple-200 space-y-2">
              <p className="leading-relaxed">
                <strong>FDA PLLR Summary:</strong> {pregProfile?.pllrSummary || fdaStyle.riskDescription}
              </p>

              {/* Trimester Risks Grid (If Synchronized Profile Exists) */}
              {pregProfile?.trimesterRisks && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-purple-200/70 dark:border-purple-800/50 space-y-1 shadow-2xs">
                    <p className="text-[11px] font-black text-purple-900 dark:text-purple-300">Trimester 1 (Organogenesis):</p>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">{pregProfile.trimesterRisks.trimester1}</p>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-purple-200/70 dark:border-purple-800/50 space-y-1 shadow-2xs">
                    <p className="text-[11px] font-black text-purple-900 dark:text-purple-300">Trimester 2 (Pertumbuhan):</p>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">{pregProfile.trimesterRisks.trimester2}</p>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-purple-200/70 dark:border-purple-800/50 space-y-1 shadow-2xs">
                    <p className="text-[11px] font-black text-purple-900 dark:text-purple-300">Trimester 3 (Perinatal):</p>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">{pregProfile.trimesterRisks.trimester3}</p>
                  </div>
                </div>
              )}

              {/* Lactation / ASI Summary */}
              <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-purple-200/70 dark:border-purple-800/50 space-y-1 text-xs">
                <p className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Evaluasi Keamanan Menyusui &amp; ASI (Hale's Lactation Rating):</span>
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {pregProfile?.breastfeedingSummary || drug.lactationWarning || 'Diskusikan rasio manfaat vs risiko laktasi dengan dokter spesialis atau apoteker.'}
                </p>
              </div>

              {/* Safe Alternatives (If Available) */}
              {pregProfile?.safeAlternatives && pregProfile.safeAlternatives.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-purple-900 dark:text-purple-300">Alternatif Lebih Aman:</span>
                  {pregProfile.safeAlternatives.map((alt, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700"
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Farmakologi & Metabolisme CYP450 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold">
                <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Mekanisme / Farmakodinamik</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {drug.pharmacology || drug.description || 'Inhibitor spesifik sesuai monografi obat.'}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold">
                <Dna className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Farmakokinetik & Jalur CYP450</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {drug.cypPathway && <span><strong>Metabolisme Enzim:</strong> {drug.cypPathway}<br /></span>}
                {drug.halfLife && <span><strong>Waktu Paruh (t½):</strong> {drug.halfLife}<br /></span>}
                {drug.clearance && <span><strong>Eliminasi:</strong> {drug.clearance}</span>}
                {!drug.cypPathway && !drug.halfLife && !drug.clearance && 'Metabolisme hepar dan eliminasi ginjal standar.'}
              </p>
            </div>
          </div>

          {/* Kontraindikasi & Efek Samping */}
          <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-xl border border-red-200 dark:border-red-900/50 space-y-1.5">
            <div className="flex items-center gap-1.5 text-red-700 dark:text-red-300 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Kontraindikasi & Efek Samping</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300"><strong>Kontraindikasi:</strong> {drug.contraindications || drug.contraindication || 'Hipersensitivitas terhadap zat aktif.'}</p>
            <p className="text-slate-700 dark:text-slate-300 pt-0.5"><strong>Efek Samping Umum:</strong> {drug.sideEffects || drug.adverseEffects || 'Lihat leaflet kemasan obat.'}</p>
          </div>

          {/* Known Interactions */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-teal-800 dark:text-teal-300 font-bold">
                <ShieldAlert className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Interaksi Terdaftar pada Database ({relatedInteractions.length})</span>
              </div>
            </div>

            {relatedInteractions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {relatedInteractions.map((inter) => {
                  const otherDrugName = inter.drugAName.toLowerCase() === drug.name.toLowerCase() 
                    ? inter.drugBName 
                    : inter.drugAName;

                  const isMajor = inter.severity === 'Major';
                  const isModerate = inter.severity === 'Moderate';

                  return (
                    <div 
                      key={inter.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{otherDrugName}</span>
                        <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isMajor ? 'text-rose-700 bg-rose-50 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800' :
                          isModerate ? 'text-amber-700 bg-amber-50 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800' :
                          'text-slate-700 bg-slate-100 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {inter.severity}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onCheckInteractionWith(otherDrugName);
                        }}
                        className="bg-white dark:bg-slate-700 group-hover:bg-teal-600 dark:group-hover:bg-teal-500 text-teal-700 dark:text-teal-300 group-hover:text-white dark:group-hover:text-white px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-600 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Cek</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center text-slate-500 dark:text-slate-400 italic">
                Tidak ada catatan interaksi khusus terdaftar untuk obat ini.
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Monografi Farmakologi Klinis & Penapisan Interaksi</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onAddToPioCard && (
              <button
                type="button"
                onClick={() => {
                  onAddToPioCard(drug);
                  onClose();
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>📲 Buat Kartu PIO WhatsApp</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-750 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-xl font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

