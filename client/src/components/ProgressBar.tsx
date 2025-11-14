import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  if (total === 0) return null;

  const progressPercentage = (current / total) * 100;

  return (
    <div className="w-full max-w-6xl px-4 mb-4">
      <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
        <span>Progress</span>
        <span>
          {current} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
