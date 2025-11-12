import React, { useState } from "react";
import HeartsInfoDialog from "./HeartsInfoDialog";
import { useAppContext } from "../contexts/AppContext";

export default function HeartsButton() {
  const { hearts } = useAppContext();
  const [showHeartsInfoDialog, setShowHeartsInfoDialog] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-gradient-to-r from-purple-800 to-indigo-700 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-purple-500/30">
          <button
            onClick={() => setShowHeartsInfoDialog(true)}
            className="flex items-center gap-2 text-lg font-bold text-white focus:outline-none"
            aria-label={`You have ${hearts} hearts left`}
          >
            <span>{hearts}</span>
            <span role="img" aria-label="heart emoji">
              💖
            </span>
          </button>
        </div>
      </div>

      {/* Hearts Info Dialog */}
      {showHeartsInfoDialog && (
        <HeartsInfoDialog onClose={() => setShowHeartsInfoDialog(false)} />
      )}
    </>
  );
}
