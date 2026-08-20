import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export const LOGO_IMAGE_URL = 'https://i.ibb.co/0pgKRTsz/Logo-FD.png';

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true,
  variant = 'light'
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
    xl: 'w-16 h-16'
  };

  const textMap = {
    sm: { title: 'text-sm font-black', sub: 'text-[7.5px] tracking-[0.16em]' },
    md: { title: 'text-base font-black', sub: 'text-[9px] tracking-[0.18em]' },
    lg: { title: 'text-xl font-black', sub: 'text-[11px] tracking-[0.2em]' },
    xl: { title: 'text-2xl font-black', sub: 'text-xs tracking-[0.22em]' }
  };

  // Official Logo Emblem Image
  const LogoEmblem = (
    <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
      <img 
        src={LOGO_IMAGE_URL} 
        alt="Logo Farmasi Druggist" 
        className="w-full h-full object-contain drop-shadow-sm select-none"
        loading="eager"
      />
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
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {LogoEmblem}
      <div className="flex flex-col justify-center leading-none">
        <div className={`font-black ${textMap[size].title} flex items-center tracking-tight font-outfit`}>
          <span className={isDark ? 'text-white' : 'text-[#12645e]'}>
            FARMASI
          </span>
          <span className="text-[#3dbfd1] font-extrabold ml-1">
            DRUGGIST
          </span>
        </div>

        <span className={`font-bold uppercase mt-1 ${isDark ? 'text-[#5fd0df]/90' : 'text-[#12645e]/80'} ${textMap[size].sub} font-outfit`}>
          Drug & Clinical Interaction Database
        </span>
      </div>
    </div>
  );
};

