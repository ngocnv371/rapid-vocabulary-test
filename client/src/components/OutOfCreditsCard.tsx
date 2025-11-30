import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCreditsContext } from "../contexts/CreditsContext";

const OutOfCreditsCard: React.FC = () => {
  const { showOutOfCreditsDialog, setShowOutOfCreditsDialog, credits } = useCreditsContext();
  const navigate = useNavigate();

  const onShop = useCallback(() => {
    setShowOutOfCreditsDialog(false);
    navigate("/shop");
  }, [navigate, setShowOutOfCreditsDialog]);

  const onClose = useCallback(() => {
    setShowOutOfCreditsDialog(false);
    navigate("/");
  }, [setShowOutOfCreditsDialog, navigate]);

  if (!showOutOfCreditsDialog || credits > 0) {
    return null;
  }

  return (
    <div
      className="mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl border border-purple-500/30 text-center max-w-md w-full relative"
      onClick={(e) => e.stopPropagation()}
    >
      <span
        className="text-7xl mb-4 block"
        role="img"
        aria-label="Broken heart emoji"
      >
        💔
      </span>
      <h3 className="text-2xl font-bold text-red-400 mb-4">
        You're Out of Credits!
      </h3>
      <p className="text-gray-300 mb-8">
        To keep playing and save your high scores, please log in or create an
        account. It's free!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onShop}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg transition-colors"
        >
          Shop
        </button>
        <button
          onClick={onClose}
          className="px-8 py-3 bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500/20 rounded-lg text-lg transition-colors"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
};

export default OutOfCreditsCard;
