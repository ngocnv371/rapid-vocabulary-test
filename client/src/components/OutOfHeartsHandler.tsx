import React from 'react';
import OutOfHeartsDialog from './OutOfHeartsDialog';
import { useNavigate } from 'zmp-ui';
import { useHeartsContext } from '../contexts/HeartsContext';

interface OutOfHeartsHandlerProps {
  onLogin?: () => void;
}

export default function OutOfHeartsHandler({ onLogin }: OutOfHeartsHandlerProps) {
  const { showOutOfHeartsDialog, setShowOutOfHeartsDialog } = useHeartsContext();
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