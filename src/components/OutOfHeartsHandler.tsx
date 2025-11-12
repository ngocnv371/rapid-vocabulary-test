import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import OutOfHeartsDialog from './OutOfHeartsDialog';
import { useNavigate } from 'zmp-ui';

interface OutOfHeartsHandlerProps {
  onLogin?: () => void;
}

export default function OutOfHeartsHandler({ onLogin }: OutOfHeartsHandlerProps) {
  const { showOutOfHeartsDialog, setShowOutOfHeartsDialog } = useAppContext();
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