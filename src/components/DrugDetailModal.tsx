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
  CheckCircle2
} from 'lucide-react';
import { getBpomBadge } from '../utils/bpomHelper';

interface DrugDetailModalProps {
  drug: Drug | null;
  allInteractions: DrugInteraction[];
  allDrugs: Drug[];
  onClose: () => void;
  onCheckInteractionWith: (targetDrugName: string) => void;
}

export const DrugDetailModal: React.FC<DrugDetailModalProps> = ({
  drug,
  allInteractions,
  allDrugs,
  onClose,
  onCheckInteractionWith
}) => {
  if (!drug) return null;

  const bpomBadge = getBpomBadge(drug);

  const relatedInteractions = allInteractions.filter(
    (i) => i.drugAId === drug.id || i.drugBId === drug.id || 
           i.drugAName.toLowerCase() === drug.name.toLowerCase() || 
           i.drugBName.toLowerCase() === drug.name.toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 max-h-[92vh] flex flex-col transition-all">
        
        {/* Dark Teal / Navy Header */}
        <div className="bg-linear-to-r from-[#071c21] via-[#0b2b33] to-[#082026] p-6 text-white relative flex-shrink-0 border-b border-[#143d47]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-[#0c2f37] transition-colors cursor-pointer"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-1.5 mb-2">
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
            <span className="bg-sky-950/80 text-sky-200 text-[10px] px-2 py-0.5 rounded font-bold border border-sky-700/50 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-sky-400" />
              <span>Monografi Terverifikasi</span>
            </span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">{drug.name}</h2>
          <p className="text-teal-200/90 text-xs mt-0.5 font-medium">Generik: {drug.genericName}</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs text-slate-700 dark:text-slate-300">
          
          {/* FDA Black Box Warning (Peringatan Kotak Hitam Khusus) */}
          {drug.blackBoxWarning && (
            <div className="p-4 rounded-xl bg-linear-to-br from-rose-950 to-rose-900 text-rose-100 border-2 border-rose-500/80 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-black tracking-wide uppercase text-[11px]">
                <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse flex-shrink-0" />
                <span>⚠️ Peringatan Kotak Hitam (Boxed Warning)</span>
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
                  <div className="flex items-center gap-1.5 text-sky-800 dark:text-sky-300 font-bold text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-sky-600" />
                    <span>Penyesuaian Dosis Gangguan Ginjal (Renal Adjustment):</span>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-purple-900 dark:text-purple-300 font-extrabold text-xs">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Penggunaan Klinis Off-Label & Dosis (Evidence-Based Off-Label Uses)</span>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-700">
                  Off-Label
                </span>
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

          {/* Waktu Terhadap Makanan & Keamanan Laktasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-bold">
                <span className="text-base">🍽️</span>
                <span>Waktu Terhadap Makanan & Gaya Hidup</span>
              </div>
              <p className="text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                {drug.foodInteraction || 'Dapat diminum dengan atau tanpa makanan. Konsultasikan dengan Apoteker bila ada keluhan lambung.'}
              </p>
            </div>

            <div className="bg-purple-50/70 dark:bg-purple-950/30 p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-purple-900 dark:text-purple-300 font-extrabold">
                <span className="text-sm">🤰</span>
                <span>Keamanan Kehamilan & Laktasi (ASI)</span>
              </div>
              <p className="text-purple-950 dark:text-purple-200 leading-relaxed font-medium">
                <strong>Kategori Kehamilan:</strong> <span className="bg-purple-100 dark:bg-purple-900/70 px-2 py-0.5 rounded text-purple-900 dark:text-purple-200 font-black">Kategori {drug.pregnancyCategory || 'Belum ditentukan'}</span><br />
                <span className="text-xs pt-1 inline-block"><strong>Keamanan Laktasi:</strong> {drug.lactationWarning || 'Diskusikan rasio manfaat vs risiko dengan dokter atau apoteker.'}</span>
              </p>
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
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Monografi Farmakologi Klinis & Penapisan Interaksi</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};

