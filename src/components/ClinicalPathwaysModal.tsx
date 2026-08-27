import React, { useState } from 'react';
import {
  X,
  GitBranch,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Pill,
  Clock,
  Target,
  Info,
  Search,
  Layers,
  Sparkles,
  ShieldAlert,
  Building2,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { CLINICAL_PATHWAYS_DATABASE, ClinicalPathway, PathwayStep } from '../data/clinicalPathwaysData';
import { Drug } from '../types';

interface ClinicalPathwaysModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPathwayId?: string;
  allDrugs?: Drug[];
  onCheckInteractionsWithRegimen?: (drugNames: string[]) => void;
  onSelectDrugForDetail?: (drug: Drug) => void;
}

export const ClinicalPathwaysModal: React.FC<ClinicalPathwaysModalProps> = ({
  isOpen,
  onClose,
  initialPathwayId = 'pathway-t2dm',
  allDrugs = [],
  onCheckInteractionsWithRegimen,
  onSelectDrugForDetail
}) => {
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>(initialPathwayId);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const currentPathway =
    CLINICAL_PATHWAYS_DATABASE.find((p) => p.id === selectedPathwayId) ||
    CLINICAL_PATHWAYS_DATABASE[0];

  const currentStep = currentPathway.steps[activeStepIndex] || currentPathway.steps[0];

  const filteredPathways = CLINICAL_PATHWAYS_DATABASE.filter(
    (p) =>
      p.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStepCategoryColor = (cat: string) => {
    switch (cat) {
      case 'inisiasi':
        return 'bg-emerald-500 text-white';
      case 'kombinasi':
        return 'bg-blue-600 text-white';
      case 'eskalasi':
        return 'bg-amber-500 text-white';
      case 'rujukan':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-teal-600 text-white';
    }
  };

  const getStepBadgeBg = (cat: string) => {
    switch (cat) {
      case 'inisiasi':
        return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'kombinasi':
        return 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'eskalasi':
        return 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'rujukan':
        return 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      default:
        return 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-800';
    }
  };

  const handleApplyDrugs = (drugNames: string[]) => {
    if (onCheckInteractionsWithRegimen) {
      onCheckInteractionsWithRegimen(drugNames);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-[#0d2f38] to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/20">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">
                  Alur Algoritma Keputusan Terapi (Step-by-Step Pathway)
                </h2>
                <span className="px-2 py-0.5 text-xs font-semibold bg-teal-400/20 text-teal-300 border border-teal-400/30 rounded-full">
                  Clinical Decision Tree
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Pohon keputusan klinis bertahap panduan eskalasi terapi, kriteria evaluasi target, dan waktu rujukan
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

        {/* Content Layout: Left Sidebar for Pathway Selection + Right Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Pathway Selector */}
          <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col shrink-0">
            {/* Search Input */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari alur terapi (DMT2, Hipertensi)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* List of Pathways */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredPathways.map((pathway) => {
                const isSelected = selectedPathwayId === pathway.id;
                return (
                  <button
                    key={pathway.id}
                    onClick={() => {
                      setSelectedPathwayId(pathway.id);
                      setActiveStepIndex(0);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-teal-500/15 to-emerald-500/10 border border-teal-500/30 text-teal-900 dark:text-teal-200 font-bold shadow-xs'
                        : 'hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold truncate">{pathway.diseaseName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {pathway.category}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md font-semibold">
                        {pathway.steps.length} Langkah
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Pathway Workspace */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900 space-y-6">
            {/* Pathway Header Details */}
            <div className="space-y-1.5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                  {currentPathway.organization}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {currentPathway.category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {currentPathway.diseaseName}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {currentPathway.shortSummary}
              </p>
            </div>

            {/* Visual Step Progression Bar */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Tahapan Alur Terapi (Klik Langkah untuk Membuka Rincian):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentPathway.steps.map((step, idx) => {
                  const isCurrent = activeStepIndex === idx;
                  const isPast = activeStepIndex > idx;
                  return (
                    <button
                      key={step.stepNumber}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                        isCurrent
                          ? 'border-teal-500 bg-teal-500/10 dark:bg-teal-500/15 shadow-md shadow-teal-500/10'
                          : isPast
                          ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                            isCurrent
                              ? getStepCategoryColor(step.category)
                              : isPast
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.stepNumber}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.timeline}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                        Langkah {step.stepNumber}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                        {step.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Step Detailed Content Panel */}
            <div className="p-5 sm:p-6 rounded-3xl border border-teal-500/30 bg-slate-50/50 dark:bg-[#071c21]/60 shadow-lg space-y-5">
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 text-xs font-black rounded-md border ${getStepBadgeBg(currentStep.category)}`}>
                      Tahap {currentStep.stepNumber} • {currentStep.category.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {currentStep.timeline}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                    {currentStep.title}
                  </h4>
                  <p className="text-xs font-semibold text-teal-800 dark:text-teal-300">
                    {currentStep.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentStep.description}
              </p>

              {/* Drugs Section */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-teal-900 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-teal-600" />
                    <span>Regimen Obat Rekomendasi Tahap Ini:</span>
                  </span>
                </div>
                <div className="space-y-2">
                  {currentStep.drugs.map((drug, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-black text-slate-900 dark:text-white">
                            💊 {drug.name}
                          </span>
                          {drug.fornasTier && (
                            <span className="px-2 py-0.2 text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded border border-emerald-300 dark:border-emerald-700">
                              FORNAS: {drug.fornasTier}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          {drug.dosage}
                        </p>
                        <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold block">
                          Peran Klinis: {drug.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Criteria & Triggers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Target Criteria */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                  <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-emerald-600" />
                    <span>Target Sasaran yang Harus Dicapai:</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200 font-medium">
                    {currentStep.targetCriteria.map((tgt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tgt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Triggers for Next Step */}
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                  <span className="text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Kriteria Kapan Harus Naik Langkah (Triggers):</span>
                  </span>
                  <p className="text-xs text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                    {currentStep.triggersForNextStep}
                  </p>
                </div>
              </div>

              {/* Clinical Pearls & Safety Notes */}
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="font-black text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Catatan Khusus Dokter / Apoteker:</span>
                </span>
                <p className="font-medium leading-relaxed">{currentStep.clinicalNotes}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {activeStepIndex > 0 && (
                    <button
                      onClick={() => setActiveStepIndex(activeStepIndex - 1)}
                      className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      &larr; Langkah Sebelumnya
                    </button>
                  )}
                  {activeStepIndex < currentPathway.steps.length - 1 && (
                    <button
                      onClick={() => setActiveStepIndex(activeStepIndex + 1)}
                      className="px-4 py-2 text-xs font-black rounded-xl bg-teal-700 hover:bg-teal-800 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Langkah Berikutnya</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {onCheckInteractionsWithRegimen && currentStep.drugs.length > 0 && (
                  <button
                    onClick={() => handleApplyDrugs(currentStep.drugs.map((d) => d.name.split('+')[0].trim()))}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-black rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-teal-400 dark:text-teal-600" />
                    <span>Uji Interaksi Regimen Tahap Ini di Checker</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
