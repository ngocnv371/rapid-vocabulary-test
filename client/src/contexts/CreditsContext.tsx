import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface CreditsContextType {
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  useCredit: () => void;
  resetCredits: () => void;
  showOutOfCreditsDialog: boolean;
  setShowOutOfCreditsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  canPlayGame: () => boolean;
  handleGameAttempt: () => boolean;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);
const DEFAULT_CREDITS = 5;
const CREDITS_STORAGE_KEY = "credits";
interface CreditsProviderProps {
  children: React.ReactNode;
}

export function CreditsProvider({ children }: CreditsProviderProps) {
  const [credits, setCredits] = useState<number>(DEFAULT_CREDITS);
  const [showOutOfCreditsDialog, setShowOutOfCreditsDialog] = useState(false);

  // load saved credits on start
  useEffect(() => {
    try {
      const savedCredits = localStorage.getItem(CREDITS_STORAGE_KEY);
      if (savedCredits !== null) {
        setCredits(parseInt(savedCredits, 10));
      } else {
        const initialCredits = DEFAULT_CREDITS;
        setCredits(initialCredits);
        localStorage.setItem(CREDITS_STORAGE_KEY, String(initialCredits));
      }
    } catch (error) {
      console.error("Error accessing nativeStorage:", error);
      setCredits(DEFAULT_CREDITS); // Fallback to default value
    }
  }, []);

  // persist credits on change
  useEffect(() => {
    try {
      localStorage.setItem(CREDITS_STORAGE_KEY, String(credits));
    } catch (error) {
      console.error("Error saving credits to nativeStorage:", error);
    }
  }, [credits]);

  const useCredit = useCallback(() => {
    setCredits((prev) => Math.max(0, prev - 1));
  }, []);

  const resetCredits = useCallback(() => {
    const initialCredits = DEFAULT_CREDITS;
    setCredits(initialCredits);
  }, []);

  const canPlayGame = () => {
    return credits > 0;
  };

  const handleGameAttempt = () => {
    if (credits <= 0) {
      setShowOutOfCreditsDialog(true);
      return false;
    }
    return true;
  };

  const value: CreditsContextType = {
    credits,
    setCredits,
    useCredit,
    resetCredits,
    showOutOfCreditsDialog,
    setShowOutOfCreditsDialog,
    canPlayGame,
    handleGameAttempt,
  };

  return (
    <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>
  );
}

export function useCreditsContext() {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error("useCreditsContext must be used within an CreditsProvider");
  }
  return context;
}
