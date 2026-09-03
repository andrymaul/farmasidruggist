import React, { useState } from 'react';
import { X, Sparkles, Volume2, VolumeX, Heart, PartyPopper, Bell, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CuteMascot, MascotMood } from './CuteMascot';
import { CuteConfettiEffect } from './CuteConfettiEffect';
import { FloatingPillsBackground } from './FloatingPillsBackground';
import {
  isSoundEnabled,
  setSoundEnabled,
  playCutePop,
  playCuteChime,
  playCuteFanfare,
  playCuteAlert
} from '../utils/cuteSoundEffects';

interface CuteVisualPlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CuteVisualPlaygroundModal: React.FC<CuteVisualPlaygroundModalProps> = ({
  isOpen,
  onClose
}) => {
  const [currentMood, setCurrentMood] = useState<MascotMood>('happy');
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [floatingPillsActive, setFloatingPillsActive] = useState(true);

  if (!isOpen) return null;

  const handleToggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playCuteChime();
    }
  };

  const handleLaunchConfetti = () => {
    setTriggerConfetti(true);
  };

  const moodDescriptions: Record<MascotMood, { title: string; subtitle: string; speech: string }> = {
    happy: {
      title: 'Resep Aman (100% Bebas Interaksi)',
      subtitle: 'Dipakai saat telaah resep tidak menemukan risiko bahaya.',
      speech: 'Hore! Resep pasien 100% aman & siap diracik! 👍'
    },
    thinking: {
      title: 'Evaluasi / Interaksi Moderat',
      subtitle: 'Dipakai saat sistem menganalisis atau mendeteksi perlu jeda jam minum.',
      speech: 'Hmm, berikan jeda 2 jam antara kedua obat ini ya~ 🧐'
    },
    alert: {
      title: 'Peringatan / Interaksi Minor',
      subtitle: 'Dipakai saat ada interaksi ringan yang perlu pemantauan klinis.',
      speech: 'Waspada ringan, pantau tekanan darah atau efek pusing ya!'
    },
    danger: {
      title: 'Bahaya Kritis / Kontraindikasi Mayor',
      subtitle: 'Dipakai saat interaksi obat berisiko fatal (contoh: Simvastatin + Paxlovid).',
      speech: 'STOP! Jangan kombinasikan obat ini, laporkan ke dokter! ⚠️'
    },
    baby: {
      title: 'Dosis Pediatrik & Puyer Anak',
      subtitle: 'Dipakai di kalkulator dosis anak & racikan puyer IDAI.',
      speech: 'Takaran puyer si kecil pas & aman diminum! 🍼'
    },
    pregnant: {
      title: 'Keamanan Bumil & Busui',
      subtitle: 'Dipakai di penapisan risiko teratogen trimester & ekskresi ASI.',
      speech: 'Obat ini aman bagi Bunda & calon buah hati tercinta! 🌸'
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Celebration Confetti Engine */}
      <CuteConfettiEffect
        active={triggerConfetti}
        onComplete={() => setTriggerConfetti(false)}
        withSound={soundActive}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0c121e] border-2 border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header with Obsidian Background */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0c0407] via-[#1a0812] to-[#260d1b] p-6 text-white border-b border-rose-500/25">
          {floatingPillsActive && <FloatingPillsBackground density="normal" accentColor="#fb7185" />}

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-lg shadow-rose-950/50">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold font-outfit uppercase">
                  <span>Interactive Visual Lab</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-outfit tracking-tight">
                  Taman Uji Coba: Visual Indah &amp; Lucu
                </h2>
                <p className="text-xs text-rose-100/80 font-medium">
                  Uji coba langsung semua maskot, mikro-animasi kapsul, sound effect, dan selebrasi konfeti!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSound}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  soundActive
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title={soundActive ? 'Suara Aktif (Klik untuk Mute)' : 'Suara Mati (Klik untuk Nyalakan)'}
              >
                {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">

          {/* SECTION 1: MASKOT INTERAKTIF */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white font-outfit flex items-center gap-2">
                  <span className="text-rose-500">1.</span>
                  <span>Maskot Farmasi "Si Kapsul Klinis" (Apo-Pill)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Klik maskot untuk melihat efek membal kenyal (*wobble*) dan suara pop lembut.
                </p>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800 self-start">
                SVG Ringan &amp; Tajam
              </span>
            </div>

            {/* Mascot Showcase Stage */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-100 to-white dark:from-[#070b14] dark:to-[#0c121e] p-6 flex flex-col items-center justify-center border border-slate-200/80 dark:border-slate-800 min-h-[190px]">
              {floatingPillsActive && <FloatingPillsBackground density="low" accentColor="#38bdf8" />}
              
              <CuteMascot
                mood={currentMood}
                size="lg"
                speechBubble={moodDescriptions[currentMood].speech}
                interactive={true}
              />
              
              <div className="mt-3 text-center z-10">
                <p className="text-xs font-black text-slate-900 dark:text-white font-outfit">
                  {moodDescriptions[currentMood].title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {moodDescriptions[currentMood].subtitle}
                </p>
              </div>
            </div>

            {/* Selector Buttons for 6 Moods */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {(['happy', 'thinking', 'alert', 'danger', 'baby', 'pregnant'] as MascotMood[]).map((m) => {
                const labels: Record<MascotMood, string> = {
                  happy: 'Aman (Happy)',
                  thinking: 'Mikir (Thinking)',
                  alert: 'Waspada (Alert)',
                  danger: 'Bahaya (Danger)',
                  baby: 'Bayi (Pediatrik)',
                  pregnant: 'Bumil (Laktasi)'
                };

                const icons: Record<MascotMood, string> = {
                  happy: '🌟',
                  thinking: '🧐',
                  alert: '⚠️',
                  danger: '🛑',
                  baby: '🍼',
                  pregnant: '🌸'
                };

                const isSelected = currentMood === m;

                return (
                  <button
                    key={m}
                    onClick={() => {
                      setCurrentMood(m);
                      playCutePop();
                    }}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer font-outfit border ${
                      isSelected
                        ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-105'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-base">{icons[m]}</span>
                    <span className="text-[10px] text-center leading-tight">{labels[m]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: SELEBRASI KONFETI & SOUND EFFECT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Confetti Celebration Box */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white font-outfit flex items-center gap-2">
                <PartyPopper className="w-4 h-4 text-amber-500" />
                <span>2. Efek Selebrasi Resep Aman</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ledakan partikel bintang emas, kapsul mini, dan nada fanfare saat telaah resep tidak memiliki interaksi.
              </p>

              <button
                onClick={handleLaunchConfetti}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-white font-black text-xs shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 hover:scale-[1.02]"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Uji Ledakan Selebrasi Konfeti! 🎉</span>
              </button>
            </div>

            {/* Web Audio API SFX Tester */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white font-outfit flex items-center gap-2">
                <Bell className="w-4 h-4 text-cyan-500" />
                <span>3. Tes Audio Ceria (Web Audio API)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Suara lembut terintegrasi tanpa file MP3 (100% instan &amp; dapat di-mute).
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => playCutePop()}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-transform active:scale-90 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>🫧 Bubble Pop</span>
                </button>
                <button
                  onClick={() => playCuteChime()}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-transform active:scale-90 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>🔔 Chime Crystal</span>
                </button>
                <button
                  onClick={() => playCuteFanfare()}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-transform active:scale-90 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>🎺 Fanfare Aman</span>
                </button>
                <button
                  onClick={() => playCuteAlert()}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-transform active:scale-90 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>⚠️ Alert Warning</span>
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 3: TOMBOL KAPSUL NYATA (BOUNCY TWO-TONE PILL) */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-white font-outfit flex items-center gap-2">
              <span className="text-rose-500">4.</span>
              <span>Tombol &amp; Badge Kapsul Kenyal (*Two-Tone Pill Design*)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Desain menyerupai kapsul obat nyata dengan separuh warna &amp; separuh putih kaca, membal kenyal saat ditekan.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => playCutePop()}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white font-black text-xs shadow-md shadow-rose-950/30 flex items-center gap-2 border border-rose-400/40 cursor-pointer active:scale-90 hover:scale-105 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Kapsul Ruby (Coba Klik)</span>
              </button>

              <button
                onClick={() => playCutePop()}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 text-white font-black text-xs shadow-md shadow-emerald-950/30 flex items-center gap-2 border border-emerald-400/40 cursor-pointer active:scale-90 hover:scale-105 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Kapsul Emerald Resep</span>
              </button>

              <button
                onClick={() => playCutePop()}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-700 text-white font-black text-xs shadow-md shadow-cyan-950/30 flex items-center gap-2 border border-cyan-400/40 cursor-pointer active:scale-90 hover:scale-105 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kapsul Cyan Uji Lab</span>
              </button>
            </div>
          </div>

          {/* SECTION 4: TOGGLE FLOATING PILLS BACKGROUND */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div>
              <p className="text-xs font-black text-slate-900 dark:text-white font-outfit">
                Partikel Kapsul &amp; Bintang Melayang di Header
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Nyalakan untuk melihat animasi melayang lembut di bagian atas layar.
              </p>
            </div>
            <button
              onClick={() => setFloatingPillsActive(!floatingPillsActive)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer font-outfit ${
                floatingPillsActive
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {floatingPillsActive ? 'ON (Aktif)' : 'OFF'}
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            💡 Semua efek ini ringan, ramah memori, dan tidak memperlambat aplikasi.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Selesai Menguji
          </button>
        </div>

      </div>
    </div>
  );
};
