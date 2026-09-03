import React, { useState } from 'react';
import { playCutePop } from '../utils/cuteSoundEffects';

export type MascotMood = 'happy' | 'thinking' | 'alert' | 'danger' | 'baby' | 'pregnant';

interface CuteMascotProps {
  mood?: MascotMood;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  speechBubble?: string;
  interactive?: boolean;
  className?: string;
  color?: string; // Hex or gradient type, defaults to pleasant rose/cyan/emerald
}

export const CuteMascot: React.FC<CuteMascotProps> = ({
  mood = 'happy',
  size = 'md',
  speechBubble,
  interactive = true,
  className = '',
  color
}) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const handleClick = () => {
    if (!interactive) return;
    setIsWiggling(true);
    playCutePop();
    setTimeout(() => setIsWiggling(false), 600);
  };

  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-14 h-14',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48'
  }[size];

  // Pick themed pill top half color based on mood
  const getPillColors = () => {
    if (color) return { top: color, bot: '#ffffff' };
    switch (mood) {
      case 'happy':
        return { top: '#10b981', bot: '#ecfdf5', glow: 'rgba(16, 185, 129, 0.4)' };
      case 'thinking':
        return { top: '#06b6d4', bot: '#ecfeff', glow: 'rgba(6, 182, 212, 0.4)' };
      case 'alert':
        return { top: '#f59e0b', bot: '#fffbeb', glow: 'rgba(245, 158, 11, 0.4)' };
      case 'danger':
        return { top: '#f43f5e', bot: '#fff1f2', glow: 'rgba(244, 63, 94, 0.4)' };
      case 'baby':
        return { top: '#a855f7', bot: '#faf5ff', glow: 'rgba(168, 85, 247, 0.4)' };
      case 'pregnant':
        return { top: '#ec4899', bot: '#fdf2f8', glow: 'rgba(236, 72, 153, 0.4)' };
    }
  };

  const colors = getPillColors();

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Optional Speech Bubble */}
      {speechBubble && (
        <div className="mb-2 relative z-20 animate-bounce">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl px-3.5 py-1.5 text-[11px] sm:text-xs font-black text-slate-800 dark:text-slate-100 font-outfit whitespace-nowrap flex items-center gap-1.5">
            <span className="text-amber-500">✨</span>
            <span>{speechBubble}</span>
          </div>
          {/* Arrow */}
          <div className="w-2.5 h-2.5 bg-white dark:bg-slate-900 border-r-2 border-b-2 border-slate-200 dark:border-slate-700 transform rotate-45 mx-auto -mt-1.5" />
        </div>
      )}

      {/* Interactive Mascot Body */}
      <div
        onClick={handleClick}
        className={`transition-transform duration-300 ${sizeClasses} ${
          interactive ? 'cursor-pointer hover:scale-110 active:scale-95' : ''
        } ${isWiggling ? 'animate-wiggle' : ''}`}
        title={interactive ? 'Klik aku! (*Pop*)' : undefined}
      >
        <svg
          viewBox="0 0 120 150"
          className="w-full h-full drop-shadow-lg filter overflow-visible"
        >
          <defs>
            {/* Pill Gradient */}
            <linearGradient id={`pillTop-${mood}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.top} />
              <stop offset="100%" stopColor={colors.top} stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="pillBot" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
            {/* Gloss reflection shine */}
            <linearGradient id="shineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Halo Glow */}
          <ellipse
            cx="60"
            cy="75"
            rx="50"
            ry="65"
            fill={colors.glow}
            className="animate-pulse"
            opacity="0.3"
          />

          {/* Capsule Pill Body: Outer Rounded Shape */}
          {/* Top Half Capsule */}
          <path
            d="M20,65 C20,30 35,15 60,15 C85,15 100,30 100,65 L100,75 L20,75 Z"
            fill={`url(#pillTop-${mood})`}
          />
          {/* Bottom Half Capsule */}
          <path
            d="M20,75 L100,75 L100,85 C100,120 85,135 60,135 C35,135 20,120 20,85 Z"
            fill="url(#pillBot)"
          />

          {/* Capsule Center Joint Seam */}
          <line
            x1="18"
            y1="75"
            x2="102"
            y2="75"
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Glossy Curved Glass Reflection Left Edge */}
          <path
            d="M26,38 C26,24 38,20 54,19 C42,23 30,34 30,55 L30,95 C30,110 38,124 50,129 C34,124 26,112 26,95 Z"
            fill="url(#shineGrad)"
          />

          {/* Cute Little Stethoscope / Little Cape for Doctor look */}
          {mood !== 'baby' && mood !== 'pregnant' && (
            <path
              d="M38,72 Q60,88 82,72"
              fill="none"
              stroke="#0f766e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* MOOD-SPECIFIC FACE & ACCESSORIES */}
          {/* 1. HAPPY (Aman & Sukses) */}
          {mood === 'happy' && (
            <g>
              {/* Happy Eyes (Arch) */}
              <path d="M40,54 Q48,44 56,54" fill="none" stroke="#064e3b" strokeWidth="4" strokeLinecap="round" />
              <path d="M64,54 Q72,44 80,54" fill="none" stroke="#064e3b" strokeWidth="4" strokeLinecap="round" />
              {/* Rosy Blushing Cheeks */}
              <circle cx="36" cy="62" r="6" fill="#f43f5e" opacity="0.45" />
              <circle cx="84" cy="62" r="6" fill="#f43f5e" opacity="0.45" />
              {/* Big Smile with Tongue */}
              <path d="M48,64 Q60,78 72,64" fill="#064e3b" />
              <path d="M53,70 Q60,76 67,70" fill="#f43f5e" />
              {/* Cute Stethoscope bell on chest */}
              <circle cx="60" cy="94" r="5.5" fill="#0d9488" stroke="#ffffff" strokeWidth="1.5" />
              {/* Star on forehead */}
              <text x="56" y="32" fontSize="13">✨</text>
            </g>
          )}

          {/* 2. THINKING (Moderately Interacting / Evaluating) */}
          {mood === 'thinking' && (
            <g>
              {/* Curious Wide Eyes */}
              <ellipse cx="48" cy="52" rx="6.5" ry="8" fill="#083344" />
              <circle cx="46" cy="49" r="2.5" fill="#ffffff" />
              <ellipse cx="72" cy="52" rx="6.5" ry="8" fill="#083344" />
              <circle cx="70" cy="49" r="2.5" fill="#ffffff" />
              {/* Raised Eyebrow */}
              <path d="M41,40 Q48,34 55,41" fill="none" stroke="#083344" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M65,43 Q72,40 79,43" fill="none" stroke="#083344" strokeWidth="2.5" strokeLinecap="round" />
              {/* Puzzled Cute Mouth */}
              <ellipse cx="60" cy="68" rx="3.5" ry="5" fill="#083344" />
              {/* Cheeks */}
              <circle cx="38" cy="60" r="5" fill="#38bdf8" opacity="0.5" />
              <circle cx="82" cy="60" r="5" fill="#38bdf8" opacity="0.5" />
              {/* Little Magnifying glass in hand */}
              <circle cx="88" cy="85" r="9" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="82" y1="91" x2="74" y2="101" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {/* 3. ALERT (Minor / Moderate Warning) */}
          {mood === 'alert' && (
            <g>
              {/* Wide Alert Eyes */}
              <ellipse cx="48" cy="52" rx="7" ry="8" fill="#451a03" />
              <circle cx="45" cy="49" r="3" fill="#ffffff" />
              <ellipse cx="72" cy="52" rx="7" ry="8" fill="#451a03" />
              <circle cx="69" cy="49" r="3" fill="#ffffff" />
              {/* Little Wavy Mouth */}
              <path d="M50,68 Q55,64 60,68 Q65,72 70,68" fill="none" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
              {/* Sweat Drop on Head */}
              <path d="M82,34 Q85,26 88,34 Q88,40 85,40 Q82,40 82,34" fill="#38bdf8" opacity="0.8" />
              {/* Cheeks */}
              <circle cx="38" cy="62" r="5.5" fill="#f59e0b" opacity="0.5" />
              <circle cx="82" cy="62" r="5.5" fill="#f59e0b" opacity="0.5" />
            </g>
          )}

          {/* 4. DANGER (Major Interaction / High Risk) */}
          {mood === 'danger' && (
            <g>
              {/* Determined / Warning Eyes with V-Brows */}
              <path d="M40,43 L55,49" stroke="#881337" strokeWidth="3" strokeLinecap="round" />
              <path d="M80,43 L65,49" stroke="#881337" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="49" cy="55" rx="6" ry="7" fill="#881337" />
              <circle cx="47" cy="53" r="2" fill="#ffffff" />
              <ellipse cx="71" cy="55" rx="6" ry="7" fill="#881337" />
              <circle cx="69" cy="53" r="2" fill="#ffffff" />
              {/* Tiny Shocked Open Mouth */}
              <ellipse cx="60" cy="70" rx="6" ry="7" fill="#881337" />
              {/* Little Shield Badge on Belly */}
              <path d="M52,86 L68,86 L68,98 Q60,105 52,98 Z" fill="#e11d48" />
              <text x="56" y="97" fill="#ffffff" fontSize="9" fontWeight="bold">!</text>
            </g>
          )}

          {/* 5. BABY (Pediatrik & Puyer) */}
          {mood === 'baby' && (
            <g>
              {/* Baby Beanie Bonnet with Pom-pom */}
              <circle cx="60" cy="11" r="7" fill="#c084fc" />
              <path d="M26,45 C26,20 40,16 60,16 C80,16 94,20 94,45 Z" fill="#c084fc" opacity="0.9" />
              {/* Big Sparkling Anime Chibi Eyes */}
              <ellipse cx="46" cy="56" rx="8" ry="9" fill="#3b0764" />
              <circle cx="43" cy="52" r="3.5" fill="#ffffff" />
              <circle cx="49" cy="61" r="1.5" fill="#ffffff" />
              <ellipse cx="74" cy="56" rx="8" ry="9" fill="#3b0764" />
              <circle cx="71" cy="52" r="3.5" fill="#ffffff" />
              <circle cx="77" cy="61" r="1.5" fill="#ffffff" />
              {/* Cute Pacifier / Dot */}
              <circle cx="60" cy="72" r="7" fill="#f43f5e" />
              <circle cx="60" cy="72" r="4" fill="#ffffff" />
              <circle cx="60" cy="72" r="2" fill="#f43f5e" />
              {/* Super Rosy Cheeks */}
              <circle cx="34" cy="66" r="7" fill="#f472b6" opacity="0.6" />
              <circle cx="86" cy="66" r="7" fill="#f472b6" opacity="0.6" />
            </g>
          )}

          {/* 6. PREGNANT (Keamanan Bumil & Busui) */}
          {mood === 'pregnant' && (
            <g>
              {/* Flower Tiara on Head */}
              <circle cx="60" cy="18" r="6" fill="#f472b6" />
              <circle cx="48" cy="22" r="5" fill="#fb7185" />
              <circle cx="72" cy="22" r="5" fill="#fb7185" />
              {/* Gentle Loving Closed Eyes */}
              <path d="M42,54 Q48,60 54,54" fill="none" stroke="#831843" strokeWidth="3" strokeLinecap="round" />
              <path d="M66,54 Q72,60 78,54" fill="none" stroke="#831843" strokeWidth="3" strokeLinecap="round" />
              {/* Long cute eyelashes */}
              <line x1="40" y1="52" x2="36" y2="48" stroke="#831843" strokeWidth="2" strokeLinecap="round" />
              <line x1="80" y1="52" x2="84" y2="48" stroke="#831843" strokeWidth="2" strokeLinecap="round" />
              {/* Gentle Sweet Smile */}
              <path d="M52,66 Q60,73 68,66" fill="none" stroke="#831843" strokeWidth="3" strokeLinecap="round" />
              {/* Pink Cheeks */}
              <circle cx="36" cy="62" r="6.5" fill="#f43f5e" opacity="0.5" />
              <circle cx="84" cy="62" r="6.5" fill="#f43f5e" opacity="0.5" />
              {/* Little Heart on Belly */}
              <path
                d="M60,94 C57,90 52,90 52,95 C52,100 60,106 60,106 C60,106 68,100 68,95 C68,90 63,90 60,94 Z"
                fill="#ec4899"
              />
            </g>
          )}

          {/* Little Feet at the bottom */}
          <ellipse cx="44" cy="138" rx="10" ry="5" fill="#0f172a" opacity="0.12" />
          <ellipse cx="76" cy="138" rx="10" ry="5" fill="#0f172a" opacity="0.12" />
        </svg>
      </div>
    </div>
  );
};
