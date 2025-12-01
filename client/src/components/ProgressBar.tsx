import React from "react";

interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  // Progress within current cycle (0-10)
  const currentProgress = value % 10;
  const progressPercentage = currentProgress * 10;
  
  // Number of completed cycles determines background depth
  const cycleCount = Math.floor(value / 10);
  
  // Generate deepening purple background based on cycle count
  const getBackgroundStyle = () => {
    // Start with light purple, deepen with each cycle
    // Light purple: rgb(233, 213, 255) -> Dark purple: rgb(88, 28, 135)
    const lightPurple = { r: 233, g: 213, b: 255 };
    const darkPurple = { r: 88, g: 28, b: 135 };
    
    // Interpolate between light and dark based on cycle count
    const maxCycles = 5; // After 10 cycles, reach max darkness
    const progress = Math.min(cycleCount / maxCycles, 1);
    
    const r = Math.round(lightPurple.r - (lightPurple.r - darkPurple.r) * progress);
    const g = Math.round(lightPurple.g - (lightPurple.g - darkPurple.g) * progress);
    const b = Math.round(lightPurple.b - (lightPurple.b - darkPurple.b) * progress);
    
    return {
      backgroundColor: `rgb(${r}, ${g}, ${b})`
    };
  };

  return (
    <div className="w-full max-w-6xl px-4 mb-4">
      <div 
        className="w-full rounded-full h-6 transition-colors duration-500"
        style={getBackgroundStyle()}
      >
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-6 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="px-2 right-4 absolute">
            <span className="font-bold" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>{value}🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
}
