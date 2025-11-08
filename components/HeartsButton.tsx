import React, { useState } from 'react';
import HeartsInfoDialog from './HeartsInfoDialog';

interface HeartsButtonProps {
  hearts: number;
}

export default function HeartsButton({ hearts }: HeartsButtonProps) {
  const [showHeartsInfoDialog, setShowHeartsInfoDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowHeartsInfoDialog(true)}
        className="p-2 rounded-md hover:bg-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2 text-lg font-bold text-pink-400"
        aria-label={`You have ${hearts} hearts left`}
      >
        <span>{hearts}</span>
        <span role="img" aria-label="heart emoji">💖</span>
      </button>

      {/* Hearts Info Dialog */}
      {showHeartsInfoDialog && (
        <HeartsInfoDialog onClose={() => setShowHeartsInfoDialog(false)} />
      )}
    </>
  );
}