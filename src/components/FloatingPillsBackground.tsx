import React from 'react';

interface FloatingPillsBackgroundProps {
  density?: 'low' | 'normal' | 'high';
  accentColor?: string; // hex or tailwind class
}

export const FloatingPillsBackground: React.FC<FloatingPillsBackgroundProps> = ({
  density = 'normal',
  accentColor = 'rgba(255, 255, 255, 0.15)'
}) => {
  const count = density === 'low' ? 6 : density === 'normal' ? 10 : 16;

  // Preset floating items with deterministic positions so it doesn't flicker on re-renders
  const items = [
    { type: 'pill', top: '15%', left: '10%', size: 28, delay: '0s', dur: '8s', rot: 25 },
    { type: 'star', top: '25%', left: '85%', size: 16, delay: '1.5s', dur: '6s', rot: 0 },
    { type: 'tablet', top: '70%', left: '15%', size: 20, delay: '2s', dur: '9s', rot: -15 },
    { type: 'pill', top: '65%', left: '80%', size: 24, delay: '3.5s', dur: '10s', rot: -35 },
    { type: 'bubble', top: '40%', left: '45%', size: 14, delay: '0.8s', dur: '7s', rot: 0 },
    { type: 'star', top: '10%', left: '60%', size: 18, delay: '4s', dur: '8.5s', rot: 15 },
    { type: 'tablet', top: '80%', left: '55%', size: 18, delay: '2.5s', dur: '11s', rot: 45 },
    { type: 'pill', top: '35%', left: '25%', size: 22, delay: '5s', dur: '7.5s', rot: -20 },
    { type: 'bubble', top: '18%', left: '35%', size: 12, delay: '3s', dur: '6.5s', rot: 0 },
    { type: 'star', top: '75%', left: '35%', size: 14, delay: '1s', dur: '9.5s', rot: -10 },
    { type: 'pill', top: '50%', left: '92%', size: 20, delay: '2s', dur: '8s', rot: 50 },
    { type: 'tablet', top: '12%', left: '75%', size: 16, delay: '4.5s', dur: '10.5s', rot: -30 }
  ].slice(0, count);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes subtleFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(12deg);
          }
        }
        @keyframes subtlePulseGlow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.15); }
        }
      `}</style>

      {items.map((item, idx) => (
        <div
          key={idx}
          className="absolute opacity-25 hover:opacity-75 transition-opacity"
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            height: item.size,
            animation: `subtleFloat ${item.dur} ease-in-out infinite`,
            animationDelay: item.delay
          }}
        >
          {item.type === 'pill' && (
            <svg viewBox="0 0 40 20" className="w-full h-full fill-current" style={{ color: accentColor }}>
              <rect x="0" y="0" width="40" height="20" rx="10" fill="currentColor" opacity="0.35" />
              <line x1="20" y1="0" x2="20" y2="20" stroke="white" strokeWidth="1.5" opacity="0.4" />
              <circle cx="10" cy="10" r="3" fill="white" opacity="0.5" />
            </svg>
          )}

          {item.type === 'tablet' && (
            <svg viewBox="0 0 24 24" className="w-full h-full" style={{ color: accentColor }}>
              <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.3" stroke="white" strokeWidth="1" />
              <line x1="12" y1="3" x2="12" y2="21" stroke="white" strokeWidth="1.5" opacity="0.5" />
            </svg>
          )}

          {item.type === 'star' && (
            <svg viewBox="0 0 24 24" className="w-full h-full fill-amber-300" style={{ animation: 'subtlePulseGlow 3s ease-in-out infinite', animationDelay: item.delay }}>
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          )}

          {item.type === 'bubble' && (
            <div
              className="w-full h-full rounded-full border border-white/40 bg-white/10 backdrop-blur-xs"
              style={{ animation: 'subtlePulseGlow 4s ease-in-out infinite', animationDelay: item.delay }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
