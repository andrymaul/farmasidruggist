import React from 'react';
import { Pill, Activity } from 'lucide-react';

interface ClinicalTabSkeletonProps {
  title?: string;
}

export const ClinicalTabSkeleton: React.FC<ClinicalTabSkeletonProps> = ({ 
  title = 'Memuat Modul Klinis...' 
}) => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 sm:p-12 animate-in fade-in duration-300">
      {/* Central Pulsing Badge */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-20 h-20 rounded-3xl bg-teal-500/15 dark:bg-teal-400/20 blur-xl animate-pulse" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-teal-900/20">
          <Pill className="w-8 h-8 animate-bounce text-white" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-2 max-w-sm mb-8">
        <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          <Activity className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
          <span>Farmasi Druggist Pro</span>
        </div>
        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 font-outfit">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Menyiapkan database & algoritma skrining klinis terverifikasi...
        </p>
      </div>

      {/* Modern Shimmer Skeleton Cards */}
      <div className="w-full max-w-3xl space-y-4">
        {/* Header banner skeleton */}
        <div className="h-24 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse border border-slate-200 dark:border-slate-700/50" />
        
        {/* Search bar skeleton */}
        <div className="h-12 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse border border-slate-200 dark:border-slate-700/50" />

        {/* 2 Grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-40 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse border border-slate-200 dark:border-slate-700/50 p-4 space-y-3">
            <div className="h-5 w-2/3 rounded-lg bg-slate-300 dark:bg-slate-700" />
            <div className="h-3 w-full rounded bg-slate-300/80 dark:bg-slate-700/80" />
            <div className="h-3 w-4/5 rounded bg-slate-300/80 dark:bg-slate-700/80" />
          </div>
          <div className="h-40 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse border border-slate-200 dark:border-slate-700/50 p-4 space-y-3">
            <div className="h-5 w-1/2 rounded-lg bg-slate-300 dark:bg-slate-700" />
            <div className="h-3 w-full rounded bg-slate-300/80 dark:bg-slate-700/80" />
            <div className="h-3 w-3/4 rounded bg-slate-300/80 dark:bg-slate-700/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalTabSkeleton;
