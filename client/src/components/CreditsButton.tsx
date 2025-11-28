import { useState } from "react";
import CreditsInfoDialog from "./CreditsInfoDialog";
import { useCreditsContext } from "../contexts/CreditsContext";

export default function CreditsButton() {
  const { credits } = useCreditsContext();
  const [showCreditsInfoDialog, setShowCreditsInfoDialog] = useState(false);

  return (
    <>
      <div className="fixed bottom-12 right-4 z-50 relative">
        <div className="absolute right-0 bottom-4 bg-gradient-to-r from-purple-800 to-indigo-700 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-purple-500/30">
          <button
            onClick={() => setShowCreditsInfoDialog(true)}
            className="flex items-center gap-2 text-lg font-bold text-white focus:outline-none"
            aria-label={`You have ${credits} credits left`}
          >
            <span>{credits}</span>
            <span role="img" aria-label="credit emoji">
              💖
            </span>
          </button>
        </div>
      </div>

      {/* Credits Info Dialog */}
      {showCreditsInfoDialog && (
        <CreditsInfoDialog onClose={() => setShowCreditsInfoDialog(false)} />
      )}
    </>
  );
}
