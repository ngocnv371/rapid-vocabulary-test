
import React from 'react';

interface GameOverProps {
  score: number;
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
}

export default function GameOver({ score, onPlayAgain, onViewLeaderboard }: GameOverProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-gray-800 p-10 rounded-2xl shadow-2xl border border-purple-500/30">
      <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">Nice Try!</h2>
      <p className="text-2xl text-gray-300 mb-2">Your final score is</p>
      <p className="text-7xl font-bold text-purple-300 mb-10">{score}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onPlayAgain}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg transition-colors"
        >
          Play Again
        </button>
        <button
          onClick={onViewLeaderboard}
          className="px-8 py-4 bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500/20 rounded-lg text-lg transition-colors"
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
}