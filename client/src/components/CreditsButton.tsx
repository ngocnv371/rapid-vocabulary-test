import { useState } from "react";
import CreditsInfoDialog from "./CreditsInfoDialog";
import { useCreditsContext } from "../contexts/CreditsContext";

export default function CreditsButton() {
  const { credits, isLoading } = useCreditsContext();
  const [showCreditsInfoDialog, setShowCreditsInfoDialog] = useState(false);

  // Show loading state or default to 0 if credits are not yet loaded
  const displayCredits = isLoading ? "..." : credits ?? 0;

  return (
    <>
      <div className="absolute right-4 bottom-4 bg-gradient-to-r from-purple-800 to-indigo-700 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-purple-500/30">
        <button
          onClick={() => setShowCreditsInfoDialog(true)}
          className="flex items-center gap-2 text-lg font-bold text-white focus:outline-none"
          aria-label={`You have ${displayCredits} credits left`}
        >
          <span>{displayCredits}</span>
          <span role="img" aria-label="credit emoji">
            💖
          </span>
        </button>
      </div>

      {/* Credits Info Dialog */}
      {showCreditsInfoDialog && (
        <CreditsInfoDialog onClose={() => setShowCreditsInfoDialog(false)} />
      )}
    </>
  );
}
