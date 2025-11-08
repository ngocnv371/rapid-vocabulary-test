import React, { useState, useRef } from 'react';
import type { EmojiParticle } from '../components/EmojiCelebration';

const CELEBRATION_EMOJIS = ['🎉', '✨', '⭐', '🌟', '💫', '🎊', '🔥', '💯'];

export function useEmojiCelebration() {
  const [emojiParticles, setEmojiParticles] = useState<EmojiParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerCelebration = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    
    if (!containerRect) return;

    const clickX = rect.left + rect.width / 2 - containerRect.left;
    const clickY = rect.top + rect.height / 2 - containerRect.top;

    const particles: EmojiParticle[] = [];
    const numParticles = 8;
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        id: Date.now() + i,
        emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
        x: clickX,
        y: clickY,
        angle: (i * 360) / numParticles, // Evenly distributed in a circle
        speed: 80 + Math.random() * 120, // Varying speed (80-200px)
      });
    }
    
    setEmojiParticles(particles);
    
    // Remove particles after animation
    setTimeout(() => {
      setEmojiParticles([]);
    }, 1000);
  };

  return {
    emojiParticles,
    containerRef,
    triggerCelebration,
  };
}