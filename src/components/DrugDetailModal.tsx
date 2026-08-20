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
  Sparkles
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Dark Teal Header */}
        <div className="bg-[#071c21] p-6 text-white relative flex-shrink-0 border-b border-[#143d47]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-[#0c2f37] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${bpomBadge.style}`}>
              {bpomBadge.label}
            </span>
            <span className="bg-[#0f766e] text-teal-100 text-[10px] px-2 py-0.5 rounded font-black border border-teal-500/40">
              ATC: {drug.atcCode}
            </span>
            {drug.pregnancyCategory && (
              <span className="bg-[#0a2f38] text-teal-200 text-[10px] px-2 py-0.5 rounded font-bold border border-teal-700/50">
                Kehamilan: Kategori {drug.pregnancyCategory}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-black text-white">{drug.name}</h2>
          <p className="text-teal-200/80 text-xs mt-0.5 font-medium">Generik: {drug.genericName}</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          
          {/* Brand Names */}
          <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 space-y-1.5">
            <div className="flex items-center gap-1.5 text-teal-800 font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>Merk Dagang Indonesia:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {drug.brandNames && drug.brandNames.length > 0 ? (
                drug.brandNames.map((brand, i) => (
                  <span
                    key={i}
                    className="bg-white text-teal-900 font-semibold px-2.5 py-0.5 rounded border border-teal-200 shadow-2xs"
                  >
                    {brand}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 italic">Data merk dagang tersedia pada resep</span>
              )}
            </div>
          </div>

          {/* Indikasi & Dosis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-teal-700 font-bold">
                <Activity className="w-4 h-4" />
                <span>Indikasi Klinis Resmi (On-Label)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{drug.indication}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-teal-700 font-bold">
                <Pill className="w-4 h-4" />
                <span>Dosis & Cara Pemberian</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{drug.dosage}</p>
            </div>
          </div>

          {/* Indikasi Off-Label (Jika Ada) */}
          {drug.offLabelIndication && (
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-purple-900 font-extrabold text-xs">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Penggunaan Klinis Off-Label & Dosis (Evidence-Based Off-Label Uses)</span>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-900 border border-purple-300">
                  Off-Label
                </span>
              </div>
              <p className="text-purple-950 leading-relaxed font-medium text-xs">
                {drug.offLabelIndication}
              </p>
            </div>
          )}

          {/* Waktu Terhadap Makanan (Aturan Konsumsi) */}
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold">
              <span className="text-base">🍽️</span>
              <span>Waktu Terhadap Makanan (Aturan Konsumsi)</span>
            </div>
            <p className="text-amber-950 font-medium leading-relaxed">
              {drug.foodInteraction || 'Dapat diminum dengan atau tanpa makanan. Konsultasikan dengan Apoteker bila ada keluhan lambung.'}
            </p>
          </div>

          {/* Farmakologi & Efek Samping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Mekanisme / Farmakologi</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {drug.pharmacology || 'Inhibitor spesifik sesuai monografi obat.'}
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-xl border border-red-100 space-y-1">
              <div className="flex items-center gap-1.5 text-red-700 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Kontraindikasi & Efek Samping</span>
              </div>
              <p className="text-slate-700"><strong>Kontraindikasi:</strong> {drug.contraindications}</p>
              <p className="text-slate-700 pt-0.5"><strong>Efek Samping:</strong> {drug.sideEffects}</p>
            </div>
          </div>

          {/* Known Interactions */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-teal-800 font-bold">
                <ShieldAlert className="w-4 h-4 text-teal-600" />
                <span>Interaksi Terdaftar ({relatedInteractions.length})</span>
              </div>
            </div>

            {relatedInteractions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {relatedInteractions.map((inter) => {
                  const otherDrugName = inter.drugAName.toLowerCase() === drug.name.toLowerCase() 
                    ? inter.drugBName 
                    : inter.drugAName;

                  return (
                    <div 
                      key={inter.id}
                      className="p-3 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{otherDrugName}</span>
                        <span className="ml-2 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          {inter.severity}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onCheckInteractionWith(otherDrugName);
                        }}
                        className="bg-white group-hover:bg-teal-600 text-teal-700 group-hover:text-white px-2.5 py-1 rounded-md border border-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span>Cek</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl text-center text-slate-500 italic">
                Tidak ada catatan interaksi khusus terdaftar untuk obat ini.
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 flex-shrink-0">
          <span className="text-[11px] text-slate-500 font-semibold">
            FarmasiDruggist Clinical Monograph Engine
          </span>

          <button
            onClick={onClose}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl font-semibold text-xs shadow-xs transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
