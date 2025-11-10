import React from 'react';
import { useHearts } from '../contexts/HeartsContext';
import OutOfHeartsDialog from './OutOfHeartsDialog';
import { useNavigate } from 'zmp-ui';

interface OutOfHeartsHandlerProps {
  onLogin?: () => void;
}

export default function OutOfHeartsHandler({ onLogin }: OutOfHeartsHandlerProps) {
  const { showOutOfHeartsDialog, setShowOutOfHeartsDialog } = useHearts();
  const navigate = useNavigate();

  if (!showOutOfHeartsDialog) {
    return null;
  }

  return (
    <OutOfHeartsDialog
      onClose={() => setShowOutOfHeartsDialog(false)}
      onLogin={() => {
        setShowOutOfHeartsDialog(false);
        onLogin?.();
        navigate("/login");
      }}
    />
  );
}