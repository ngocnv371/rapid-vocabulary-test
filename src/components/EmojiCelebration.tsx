import React from 'react';

interface EmojiParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
}

interface EmojiCelebrationProps {
  particles: EmojiParticle[];
}

export default function EmojiCelebration({ particles }: EmojiCelebrationProps) {
  if (particles.length === 0) return null;

  return (
    <>
      <style>
        {`
          @keyframes spread-out {
            0% {
              transform: translate(-50%, -50%) translateX(0) translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) 
                         translateX(calc(cos(var(--angle) * 3.14159 / 180) * var(--speed))) 
                         translateY(calc(sin(var(--angle) * 3.14159 / 180) * var(--speed))) 
                         scale(0.3);
              opacity: 0;
            }
          }
          
          .animate-spread-out {
            animation: spread-out 1s ease-out forwards;
          }
        `}
      </style>
      
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none text-4xl animate-spread-out z-50"
          style={{
            left: particle.x,
            top: particle.y,
            transform: 'translate(-50%, -50%)',
            '--angle': `${particle.angle}`,
            '--speed': `${particle.speed}px`,
          } as React.CSSProperties & { '--angle': string; '--speed': string }}
        >
          {particle.emoji}
        </div>
      ))}
    </>
  );
}

export type { EmojiParticle };