import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  Download,
  Activity,
  Cpu,
  Layers
} from 'lucide-react';
import { 
  getAntigravityStatus, 
  checkAntigravityUpdates, 
  applyAntigravityPatch,
  AntigravitySystemStatus 
} from '../utils/antigravityUpdateService';

interface AntigravityUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AntigravityUpdateModal: React.FC<AntigravityUpdateModalProps> = ({
  isOpen,
  onClose
}) => {
  const [status, setStatus] = useState<AntigravitySystemStatus>(getAntigravityStatus());
  const [checking, setChecking] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateResult, setUpdateResult] = useState<{ hasUpdate: boolean; notes: string[] } | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStatus(getAntigravityStatus());
      setSuccessMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckNow = async () => {
    setChecking(true);
    setSuccessMessage(null);
    try {
      const res = await checkAntigravityUpdates();
      setUpdateResult(res);
      setStatus(getAntigravityStatus());
    } catch (e) {
      console.error(e);
    } finally {
      setChecking(false);
    }
  };

  const handleApplyUpdate = async () => {
    setUpdating(true);
    try {
      await applyAntigravityPatch();
      setStatus(getAntigravityStatus());
      setSuccessMessage('🎉 Sistem Antigravity Berhasil Diperbarui ke Versi Terakhir saat Online!');
      setUpdateResult(null);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 text-white relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/20 shrink-0">
              <Zap className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight">Antigravity Live System Auto-Updater</h2>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-teal-500/30">
                  Online Auto-Sync
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Pembaruan sistem otomatis & sinkronisasi basis data klinis saat terhubung internet
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Online Connection Status Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {status.isOnline ? (
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Wifi className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <WifiOff className="w-5 h-5" />
                </div>
              )}
              <div>
                <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>Status Koneksi Antigravity:</span>
                  <span className={status.isOnline ? 'text-emerald-600' : 'text-rose-600'}>
                    {status.isOnline ? 'ONLINE (Terhubung Live)' : 'OFFLINE (Mode Mandiri)'}
                  </span>
                </p>
                <p className="text-[11px] text-slate-500">
                  Versi Engine: <strong>{status.version}</strong> • Sinkronisasi Terakhir: {status.lastSyncTime}
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckNow}
              disabled={checking || updating}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
              <span>{checking ? 'Memeriksa...' : 'Cek Update'}</span>
            </button>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-950 font-bold text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Patch Notes Log */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-teal-600" />
              <span>Catatan Pembaruan Sistem Antigravity Terbaru:</span>
            </p>
            <div className="space-y-1.5 pt-1 text-slate-700">
              {status.patchNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="text-teal-600 font-bold">•</span>
                  <span className="font-medium leading-relaxed">{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Update Available Action Card */}
          {updateResult && updateResult.hasUpdate && (
            <div className="bg-teal-50 border border-teal-200 p-4 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-teal-950 font-bold text-xs">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <span>Pembaruan Sistem Terdeteksi (Ready to Install)!</span>
              </div>
              <div className="space-y-1 text-[11px] text-teal-900">
                {updateResult.notes.map((n, i) => (
                  <p key={i}>• {n}</p>
                ))}
              </div>

              <button
                onClick={handleApplyUpdate}
                disabled={updating}
                className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Download className={`w-4 h-4 ${updating ? 'animate-bounce' : ''}`} />
                <span>{updating ? 'Memasang Pembaruan Sistem...' : 'Pasang Update Antigravity Otomatis'}</span>
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold text-slate-500">
            Powered by Google Antigravity Agentic Auto-Updater
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
