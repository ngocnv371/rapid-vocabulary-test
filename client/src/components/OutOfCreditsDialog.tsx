
import React from 'react';

interface OutOfCreditsDialogProps {
  onClose: () => void;
  onLogin: () => void;
}

const OutOfCreditsDialog: React.FC<OutOfCreditsDialogProps> = ({ onClose, onLogin }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-purple-500/30 text-center max-w-md w-full relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700" aria-label="Close dialog">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <span className="text-7xl mb-4 block" role="img" aria-label="Broken heart emoji">💔</span>
        <h3 className="text-2xl font-bold text-red-400 mb-4">You're Out of Credits!</h3>
        <p className="text-gray-300 mb-8">
          To keep playing and save your high scores, please log in or create an account. It's free!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onLogin}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg transition-colors"
          >
            Login / Sign Up
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500/20 rounded-lg text-lg transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutOfCreditsDialog;
