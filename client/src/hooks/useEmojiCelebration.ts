import React, { useState, useRef } from 'react';
import type { EmojiParticle } from '../components/EmojiCelebration';

const CELEBRATION_EMOJIS = ['🎉', '✨', '⭐', '💫', '🎊', '🔥'];

export type CelebrationType = 'burst-pop' | 'spinning-star' | 'confetti-rain' | 'ripple-wave' | 'firework' | 'random';

interface CelebrationConfig {
  particles: EmojiParticle[];
  duration: number;
}

function createBurstPop(clickX: number, clickY: number): CelebrationConfig {
  const particles: EmojiParticle[] = [];
  const numParticles = 6;
  
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      id: Date.now() + i,
      emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
      x: clickX,
      y: clickY,
      angle: (i * 360) / numParticles,
      speed: 100,
      animationType: 'burst-pop',
    });
  }
  
  return { particles, duration: 800 };
}

function createSpinningStar(clickX: number, clickY: number): CelebrationConfig {
  const particles: EmojiParticle[] = [
    {
      id: Date.now(),
      emoji: '⭐',
      x: clickX,
      y: clickY,
      angle: 0,
      speed: 0,
      animationType: 'spinning-star',
    }
  ];
  
  return { particles, duration: 1000 };
}

function createConfettiRain(clickX: number, clickY: number): CelebrationConfig {
  const particles: EmojiParticle[] = [];
  const numParticles = 8;
  
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      id: Date.now() + i,
      emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
      x: clickX + (Math.random() - 0.5) * 100,
      y: clickY - 50,
      angle: 0,
      speed: 150 + Math.random() * 100,
      animationType: 'confetti-rain',
      delay: i * 50,
    });
  }
  
  return { particles, duration: 1500 };
}

function createRippleWave(clickX: number, clickY: number): CelebrationConfig {
  const particles: EmojiParticle[] = [];
  const numRings = 3;
  const particlesPerRing = 6;
  
  for (let ring = 0; ring < numRings; ring++) {
    for (let i = 0; i < particlesPerRing; i++) {
      particles.push({
        id: Date.now() + ring * particlesPerRing + i,
        emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
        x: clickX,
        y: clickY,
        angle: (i * 360) / particlesPerRing,
        speed: 80 + ring * 40,
        animationType: 'ripple-wave',
        delay: ring * 100,
      });
    }
  }
  
  return { particles, duration: 1200 };
}

function createFirework(clickX: number, clickY: number): CelebrationConfig {
  const particles: EmojiParticle[] = [];
  const numParticles = 12;
  
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      id: Date.now() + i,
      emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
      x: clickX,
      y: clickY,
      angle: (i * 360) / numParticles + Math.random() * 30,
      speed: 120 + Math.random() * 80,
      animationType: 'firework',
    });
  }
  
  return { particles, duration: 1000 };
}

const celebrationFactories: Record<Exclude<CelebrationType, 'random'>, (x: number, y: number) => CelebrationConfig> = {
  'burst-pop': createBurstPop,
  'spinning-star': createSpinningStar,
  'confetti-rain': createConfettiRain,
  'ripple-wave': createRippleWave,
  'firework': createFirework,
};

export function useEmojiCelebration(type: CelebrationType = 'burst-pop') {
  const [emojiParticles, setEmojiParticles] = useState<EmojiParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerCelebration = (targetSelector: string) => {
    const element = containerRef.current?.querySelector<HTMLElement>(targetSelector);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    
    if (!containerRect) return;

    const clickX = rect.left + rect.width / 2 - containerRect.left;
    const clickY = rect.top + rect.height / 2 - containerRect.top;

    // Select celebration type (random or specific)
    let selectedType = type;
    if (type === 'random') {
      const types = Object.keys(celebrationFactories) as Exclude<CelebrationType, 'random'>[];
      selectedType = types[Math.floor(Math.random() * types.length)];
    }
    
    const factory = celebrationFactories[selectedType as Exclude<CelebrationType, 'random'>];
    const config = factory(clickX, clickY);
    
    setEmojiParticles(config.particles);
    
    // Remove particles after animation
    setTimeout(() => {
      setEmojiParticles([]);
    }, config.duration);
  };

  return {
    emojiParticles,
    containerRef,
    triggerCelebration,
  };
}