
import React from 'react';
import type { Session } from '@supabase/supabase-js';

interface GameOverProps {
  score: number;
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
  session: Session | null;
  onLoginToSave: () => void;
}

export default function GameOver({ score, onPlayAgain, onViewLeaderboard, session, onLoginToSave }: GameOverProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-10">
        <p className="text-2xl text-gray-300 mb-2">Your final score is</p>
        <p className="text-6xl font-bold text-purple-300 mb-8">{score}</p>
      </div>
      <div className="flex flex-col gap-4 sm:gap-6">
        {!session && (
          <button
            onClick={onLoginToSave}
            className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-green-500/30 hover:bg-green-700/50 hover:border-green-500 text-lg font-semibold text-white bg-green-600"
          >
            Login to Save Score
          </button>
        )}
        <button
          onClick={onPlayAgain}
          className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-purple-500/30 hover:bg-gray-700/50 hover:border-purple-500 text-lg font-semibold text-white bg-purple-600"
        >
          Play Again
        </button>
        <button
          onClick={onViewLeaderboard}
          className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-purple-500/30 hover:bg-purple-600 hover:border-purple-500 text-lg font-semibold text-purple-400 hover:text-white"
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
}
