import React from "react";
import EmojiCelebration from "./EmojiCelebration";
import { useEmojiCelebration } from "../hooks/useEmojiCelebration";

interface StreakBarProps {
  streak: number;
}

export default function StreakBar({ streak }: StreakBarProps) {
  if (streak === 0) return null;
  const { emojiParticles, containerRef, triggerCelebration } =
    useEmojiCelebration("spinning-star");

  React.useEffect(() => {
    triggerCelebration("#celebration-spawn");
  }, [streak]);

  return (
    <div ref={containerRef} className="w-full max-w-6xl px-4 mb-4">
      <div className="bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-500/30">
        <div className="flex justify-between items-center relative">
          <EmojiCelebration particles={emojiParticles} />
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-pulse">🔥</span>
            <span className="text-sm font-semibold text-yellow-300">
              Streak
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div id="celebration-spawn" className="mr-5"></div>
            <span className="text-xl font-bold text-white">{streak}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
