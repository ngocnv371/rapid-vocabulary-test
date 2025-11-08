import React from 'react';
import { useHearts } from '../contexts/HeartsContext';
import OutOfHeartsDialog from './OutOfHeartsDialog';

interface OutOfHeartsHandlerProps {
  onLogin: () => void;
}

export default function OutOfHeartsHandler({ onLogin }: OutOfHeartsHandlerProps) {
  const { showOutOfHeartsDialog, setShowOutOfHeartsDialog } = useHearts();

  if (!showOutOfHeartsDialog) {
    return null;
  }

  return (
    <OutOfHeartsDialog
      onClose={() => setShowOutOfHeartsDialog(false)}
      onLogin={() => {
        setShowOutOfHeartsDialog(false);
        onLogin();
      }}
    />
  );
}