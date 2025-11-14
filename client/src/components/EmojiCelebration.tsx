import React from 'react';

type AnimationType = 'burst-pop' | 'spinning-star' | 'confetti-rain' | 'ripple-wave' | 'firework';

interface EmojiParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
  animationType?: AnimationType;
  delay?: number;
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
          @keyframes burst-pop {
            0% {
              transform: translate(-50%, -50%) translateX(0) translateY(0) scale(0.3);
              opacity: 1;
            }
            40% {
              transform: translate(-50%, -50%) 
                         translateX(calc(cos(var(--angle) * 3.14159 / 180) * var(--speed))) 
                         translateY(calc(sin(var(--angle) * 3.14159 / 180) * var(--speed))) 
                         scale(1.2);
              opacity: 1;
            }
            70% {
              transform: translate(-50%, -50%) 
                         translateX(calc(cos(var(--angle) * 3.14159 / 180) * var(--speed) * 0.3)) 
                         translateY(calc(sin(var(--angle) * 3.14159 / 180) * var(--speed) * 0.3)) 
                         scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) translateX(0) translateY(0) scale(0.5);
              opacity: 0;
            }
          }
          
          @keyframes spinning-star {
            0% {
              transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
              opacity: 0;
              filter: drop-shadow(0 0 0px gold);
            }
            50% {
              transform: translate(-50%, -50%) scale(2) rotate(180deg);
              opacity: 1;
              filter: drop-shadow(0 0 20px gold);
            }
            100% {
              transform: translate(-50%, -50%) scale(0.5) rotate(360deg);
              opacity: 0;
              filter: drop-shadow(0 0 0px gold);
            }
          }
          
          @keyframes confetti-rain {
            0% {
              transform: translate(-50%, -50%) translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) translateY(var(--speed)) rotate(720deg);
              opacity: 0;
            }
          }
          
          @keyframes ripple-wave {
            0% {
              transform: translate(-50%, -50%) translateX(0) translateY(0) scale(1);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) 
                         translateX(calc(cos(var(--angle) * 3.14159 / 180) * var(--speed))) 
                         translateY(calc(sin(var(--angle) * 3.14159 / 180) * var(--speed))) 
                         scale(0.5);
              opacity: 0;
            }
          }
          
          @keyframes firework {
            0% {
              transform: translate(-50%, -50%) translateX(0) translateY(0) scale(0);
              opacity: 1;
            }
            50% {
              transform: translate(-50%, -50%) 
                         translateX(calc(cos(var(--angle) * 3.14159 / 180) * var(--speed))) 
                         translateY(calc(sin(var(--angle) * 3.14159 / 180) * var(--speed))) 
                         scale(1.5);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) 
                         translateX(calc(cos(var(--angle) * 3.14159 / 180) * var(--speed))) 
                         translateY(calc(sin(var(--angle) * 3.14159 / 180) * var(--speed) * 1.3)) 
                         scale(0.3);
              opacity: 0;
            }
          }
          
          .animate-burst-pop {
            animation: burst-pop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .animate-spinning-star {
            animation: spinning-star 1s ease-in-out forwards;
          }
          
          .animate-confetti-rain {
            animation: confetti-rain 1.5s ease-in forwards;
          }
          
          .animate-ripple-wave {
            animation: ripple-wave 1.2s ease-out forwards;
          }
          
          .animate-firework {
            animation: firework 1s ease-out forwards;
          }
        `}
      </style>
      
      {particles.map((particle) => {
        const animationClass = particle.animationType 
          ? `animate-${particle.animationType}` 
          : 'animate-burst-pop';
        
        return (
          <div
            key={particle.id}
            className={`absolute pointer-events-none text-4xl ${animationClass} z-50`}
            style={{
              left: particle.x,
              top: particle.y,
              transform: 'translate(-50%, -50%)',
              '--angle': `${particle.angle}`,
              '--speed': `${particle.speed}px`,
              animationDelay: particle.delay ? `${particle.delay}ms` : '0ms',
            } as React.CSSProperties & { '--angle': string; '--speed': string }}
          >
            {particle.emoji}
          </div>
        );
      })}
    </>
  );
}

export type { EmojiParticle };
