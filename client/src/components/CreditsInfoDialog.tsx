import React from 'react';

interface CreditsInfoDialogProps {
  onClose: () => void;
}

const CreditsInfoDialog: React.FC<CreditsInfoDialogProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-purple-500/30 text-center max-w-md w-full relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700" aria-label="Close dialog">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <span className="text-7xl mb-4 block" role="img" aria-label="Credit emoji">💖</span>
        <h3 className="text-2xl font-bold text-pink-400 mb-4">Your Learning Credits!</h3>
        <p className="text-gray-300 mb-6">
          Each time you start a quiz, you use one credit. This encourages a steady and fun learning pace.
        </p>
        <p className="text-gray-300">
          If you run out, just sign in or create a free account for unlimited plays and to save your scores on the leaderboard!
        </p>
      </div>
    </div>
  );
};

export default CreditsInfoDialog;
