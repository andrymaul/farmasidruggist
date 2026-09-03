import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark' | 'auto';
}

export const LOGO_IMAGE_URL = '/logo.png';

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true,
  variant = 'auto'
}) => {
  const iconSizes = {
    sm: 'w-10 h-10',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-18 h-18'
  };

  const textMap = {
    sm: { title: 'text-[15px] sm:text-base font-black', sub: 'text-[8px] sm:text-[8.5px] tracking-[0.18em]' },
    md: { title: 'text-base sm:text-lg font-black', sub: 'text-[9px] sm:text-[9.5px] tracking-[0.2em]' },
    lg: { title: 'text-xl sm:text-2xl font-black', sub: 'text-[11px] tracking-[0.22em]' },
    xl: { title: 'text-2xl sm:text-3xl font-black', sub: 'text-xs tracking-[0.24em]' }
  };

  const isDark = variant === 'dark';
  const isLight = variant === 'light';

  // Title color logic
  const titleClass = isDark 
    ? 'text-white' 
    : isLight 
      ? 'text-[#062923]' 
      : 'text-[#062923] dark:text-white';

  // Gradient Druggist wordmark
  const druggistGradient = isDark
    ? 'bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300'
    : isLight
      ? 'bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500'
      : 'bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 dark:from-teal-300 dark:via-cyan-300 dark:to-emerald-300';

  // Subtitle color logic
  const subClass = isDark
    ? 'text-teal-300/85'
    : isLight
      ? 'text-teal-700/80 font-extrabold'
      : 'text-teal-700/80 dark:text-teal-300/80 font-extrabold';

  // Official Logo Emblem Image with Radiant Jewel Border Ring
  const LogoEmblem = (
    <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]} transition-all duration-300 group-hover:scale-105`}>
      {/* Outer Glow & Gradient Accent Ring */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-teal-500 via-cyan-400 to-emerald-400 opacity-80 group-hover:opacity-100 blur-[1px] group-hover:blur-[2px] transition-all duration-300 shadow-sm" />
      
      {/* Emblem Frame */}
      <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#031418] border border-teal-400/40 shadow-sm flex items-center justify-center">
        <img 
          src={LOGO_IMAGE_URL} 
          alt="Logo Farmasi Druggist" 
          className="w-full h-full object-cover select-none"
          loading="eager"
        />
      </div>
    </div>
  );

  if (!showText) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        {LogoEmblem}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {LogoEmblem}
      <div className="flex flex-col justify-center leading-none">
        <div className={`font-black ${textMap[size].title} flex items-center tracking-tight font-outfit`}>
          <span className={`${titleClass} transition-colors`}>
            FARMASI
          </span>
          <span className={`${druggistGradient} bg-clip-text text-transparent font-black ml-1.5`}>
            DRUGGIST
          </span>
        </div>

        <span className={`uppercase mt-0.5 ${subClass} ${textMap[size].sub} font-outfit`}>
          Drug &amp; Clinical Interaction Database
        </span>
      </div>
    </div>
  );
};
