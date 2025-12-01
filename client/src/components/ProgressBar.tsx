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
  
  // Generate lightening purple background based on cycle count
  const getBackgroundStyle = () => {
    // Start with dark purple, lighten with each cycle
    // Dark purple: rgb(88, 28, 135) -> Light purple: rgb(233, 213, 255)
    const darkPurple = { r: 88, g: 28, b: 135 };
    const lightPurple = { r: 233, g: 213, b: 255 };
    
    // Interpolate between dark and light based on cycle count
    const maxCycles = 5; // After 5 cycles, reach max lightness and restart
    const cyclePosition = cycleCount % maxCycles; // Reset to 0 after reaching max
    const progress = cyclePosition / maxCycles;
    
    const r = Math.round(darkPurple.r + (lightPurple.r - darkPurple.r) * progress);
    const g = Math.round(darkPurple.g + (lightPurple.g - darkPurple.g) * progress);
    const b = Math.round(darkPurple.b + (lightPurple.b - darkPurple.b) * progress);
    
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
