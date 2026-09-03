import React, { useEffect, useRef } from 'react';
import { playCuteFanfare } from '../utils/cuteSoundEffects';

interface CuteConfettiEffectProps {
  active: boolean;
  onComplete?: () => void;
  withSound?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  vRot: number;
  shape: 'rect' | 'circle' | 'star' | 'pill';
  alpha: number;
}

export const CuteConfettiEffect: React.FC<CuteConfettiEffectProps> = ({
  active,
  onComplete,
  withSound = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    if (withSound) {
      playCuteFanfare();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      '#10b981', '#06b6d4', '#f43f5e', '#a855f7',
      '#fbbf24', '#3b82f6', '#ec4899', '#f97316'
    ];

    const particles: Particle[] = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 4) + Math.random() * (Math.PI / 2); // Upward cone
      const speed = 10 + Math.random() * 16;
      particles.push({
        x: canvas.width * 0.5 + (Math.random() * 200 - 100),
        y: canvas.height * 0.65,
        vx: Math.cos(angle) * (Math.random() > 0.5 ? speed : -speed),
        vy: -Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 10,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        shape: ['rect', 'star', 'pill', 'circle'][Math.floor(Math.random() * 4)] as Particle['shape'],
        alpha: 1.0
      });
    }

    let animationId: number;
    let elapsed = 0;

    const render = () => {
      elapsed += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let aliveCount = 0;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38; // gravity
        p.vx *= 0.98; // air drag
        p.rotation += p.vRot;

        if (elapsed > 60) {
          p.alpha -= 0.015;
        }

        if (p.alpha > 0) {
          aliveCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;

          if (p.shape === 'pill') {
            // Draw mini cute pill
            ctx.beginPath();
            ctx.roundRect(-p.size, -p.size * 0.5, p.size * 2, p.size, p.size * 0.5);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(0, -p.size * 0.5, p.size, p.size, [0, p.size * 0.5, p.size * 0.5, 0]);
            ctx.fill();
          } else if (p.shape === 'star') {
            // Draw star
            ctx.beginPath();
            for (let s = 0; s < 5; s++) {
              ctx.lineTo(Math.cos((18 + s * 72) * 0.01745) * p.size, -Math.sin((18 + s * 72) * 0.01745) * p.size);
              ctx.lineTo(Math.cos((54 + s * 72) * 0.01745) * (p.size * 0.5), -Math.sin((54 + s * 72) * 0.01745) * (p.size * 0.5));
            }
            ctx.closePath();
            ctx.fill();
          } else if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Ribbon rect
            ctx.fillRect(-p.size * 0.5, -p.size * 0.8, p.size, p.size * 1.6);
          }

          ctx.restore();
        }
      });

      if (aliveCount > 0 && elapsed < 200) {
        animationId = requestAnimationFrame(render);
      } else {
        if (onComplete) onComplete();
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, onComplete, withSound]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};
