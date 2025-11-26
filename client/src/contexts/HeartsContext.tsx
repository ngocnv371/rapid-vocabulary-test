import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface HeartsContextType {
  hearts: number;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  useHeart: () => void;
  resetHearts: () => void;
  showOutOfHeartsDialog: boolean;
  setShowOutOfHeartsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  canPlayGame: () => boolean;
  handleGameAttempt: () => boolean;
}

const HeartsContext = createContext<HeartsContextType | undefined>(undefined);
const DEFAULT_HEARTS = 5;
const HEARTS_STORAGE_KEY = "hearts";
interface HeartsProviderProps {
  children: React.ReactNode;
}

export function HeartsProvider({ children }: HeartsProviderProps) {
  const [hearts, setHearts] = useState<number>(DEFAULT_HEARTS);
  const [showOutOfHeartsDialog, setShowOutOfHeartsDialog] = useState(false);

  // load saved hearts on start
  useEffect(() => {
    try {
      const savedHearts = localStorage.getItem(HEARTS_STORAGE_KEY);
      if (savedHearts !== null) {
        setHearts(parseInt(savedHearts, 10));
      } else {
        const initialHearts = DEFAULT_HEARTS;
        setHearts(initialHearts);
        localStorage.setItem(HEARTS_STORAGE_KEY, String(initialHearts));
      }
    } catch (error) {
      console.error("Error accessing nativeStorage:", error);
      setHearts(DEFAULT_HEARTS); // Fallback to default value
    }
  }, []);

  // persist hearts on change
  useEffect(() => {
    try {
      localStorage.setItem(HEARTS_STORAGE_KEY, String(hearts));
    } catch (error) {
      console.error("Error saving hearts to nativeStorage:", error);
    }
  }, [hearts]);

  const useHeart = useCallback(() => {
    setHearts((prev) => Math.max(0, prev - 1));
  }, []);

  const resetHearts = useCallback(() => {
    const initialHearts = DEFAULT_HEARTS;
    setHearts(initialHearts);
  }, []);

  const canPlayGame = () => {
    return hearts > 0;
  };

  const handleGameAttempt = () => {
    if (hearts <= 0) {
      setShowOutOfHeartsDialog(true);
      return false;
    }
    return true;
  };

  const value: HeartsContextType = {
    hearts,
    setHearts,
    useHeart,
    resetHearts,
    showOutOfHeartsDialog,
    setShowOutOfHeartsDialog,
    canPlayGame,
    handleGameAttempt,
  };

  return (
    <HeartsContext.Provider value={value}>{children}</HeartsContext.Provider>
  );
}

export function useHeartsContext() {
  const context = useContext(HeartsContext);
  if (context === undefined) {
    throw new Error("useHeartsContext must be used within an HeartsProvider");
  }
  return context;
}
