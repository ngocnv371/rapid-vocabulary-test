import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  
  return (
    <div className="p-4 pt-10 min-h-screen">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Trophy Icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-full blur-2xl opacity-60 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-6 shadow-2xl border-4 border-white/20 transform hover:scale-110 transition-transform duration-300">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Score Section */}
      <div className="text-center mb-10 relative">
        {/* Decorative confetti */}
        <div className="absolute -top-8 left-1/4 text-yellow-400 text-3xl animate-bounce">🎉</div>
        <div className="absolute -top-8 right-1/4 text-pink-400 text-3xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎊</div>
        
        <p className="text-2xl text-purple-200 mb-4 font-semibold tracking-wide">{t('gameOver.scorePrefix')}</p>
        
        <div className="inline-block relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
          {/* Score display */}
          <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 px-16 py-8 rounded-3xl shadow-2xl border border-white/20">
            <div className="absolute top-2 right-2 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
            <p className="text-8xl font-black text-white drop-shadow-2xl tracking-tight">
              {score}
            </p>
            {/* Sparkle effects */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 right-6 w-3 h-3 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute top-6 right-8 w-2 h-2 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.7s' }}></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:gap-5 relative">
        <button
          onClick={onPlayAgain}
          className="relative group bg-gradient-to-r from-purple-600 to-pink-600 p-4 sm:p-5 rounded-xl shadow-lg text-center transform hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 ease-in-out border border-purple-400/40 hover:border-purple-300/60 text-lg font-semibold text-white overflow-hidden"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span className="relative flex items-center justify-center gap-2">
            {t('gameOver.playAgain')}
          </span>
        </button>
        
        <button
          onClick={onViewLeaderboard}
          className="relative group bg-gray-800/40 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-md text-center transform hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 ease-in-out border border-purple-500/20 hover:bg-gray-800/60 hover:border-purple-400/40 text-lg font-medium text-purple-300 hover:text-purple-200 overflow-hidden"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span className="relative flex items-center justify-center gap-2">
            {t('gameOver.viewLeaderboard')}
          </span>
        </button>
      </div>
    </div>
  );
}
