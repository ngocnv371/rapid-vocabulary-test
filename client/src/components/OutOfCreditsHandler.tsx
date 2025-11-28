import OutOfCreditsDialog from './OutOfCreditsDialog';
import { useNavigate } from 'zmp-ui';
import { useCreditsContext } from '../contexts/CreditsContext';

interface OutOfCreditsHandlerProps {
  onLogin?: () => void;
}

export default function OutOfCreditsHandler({ onLogin }: OutOfCreditsHandlerProps) {
  const { showOutOfCreditsDialog, setShowOutOfCreditsDialog } = useCreditsContext();
  const navigate = useNavigate();

  if (!showOutOfCreditsDialog) {
    return null;
  }

  return (
    <OutOfCreditsDialog
      onClose={() => setShowOutOfCreditsDialog(false)}
      onLogin={() => {
        setShowOutOfCreditsDialog(false);
        onLogin?.();
        navigate("/login");
      }}
    />
  );
}
