interface GameOverProps {
  score: number;
  onPlayAgain?: () => void;
  onViewLeaderboard?: () => void;
}

export default function GameOver({
  score,
  onPlayAgain,
  onViewLeaderboard,
}: GameOverProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-10">
        <p className="text-2xl text-gray-300 mb-2">Your final score is</p>
        <p className="text-6xl font-bold text-purple-300 mb-8">{score}</p>
      </div>
      <div className="flex flex-col gap-4 sm:gap-6">
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
