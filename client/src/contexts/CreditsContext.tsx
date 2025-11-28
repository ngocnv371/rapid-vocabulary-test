import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useAppContext } from "./AppContext";
import { fetchCredits } from "../services/credits";

interface CreditsContextType {
  credits: number | null;
  isLoading: boolean;
  useCredit: () => void;
  addCredits: (amount: number) => void;
  refreshCredits: () => Promise<void>;
  showOutOfCreditsDialog: boolean;
  setShowOutOfCreditsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  canPlayGame: () => boolean;
  handleGameAttempt: () => boolean;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

const FETCH_INTERVAL_MS = 60000; // 1 minute

interface CreditsProviderProps {
  children: React.ReactNode;
}

export function CreditsProvider({ children }: CreditsProviderProps) {
  const { profile } = useAppContext();
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOutOfCreditsDialog, setShowOutOfCreditsDialog] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch credits from Supabase
  const refreshCredits = useCallback(async () => {
    if (!profile?.id) {
      setCredits(null);
      setIsLoading(false);
      return;
    }

    try {
      const amount = await fetchCredits(profile.id);
      setCredits(amount);
    } catch (error) {
      console.error("Error refreshing credits:", error);
    } finally {
      setIsLoading(false);
    }
  }, [profile?.id]);

  // Initial fetch and setup periodic fetching
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!profile?.id) {
      setCredits(null);
      setIsLoading(false);
      return;
    }

    // Initial fetch
    setIsLoading(true);
    refreshCredits();

    // Set up periodic fetching (every 1 minute)
    intervalRef.current = setInterval(() => {
      refreshCredits();
    }, FETCH_INTERVAL_MS);

    // Cleanup on unmount or profile change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [profile?.id, refreshCredits]);

  // Optimistically reduce credits by one (used after posting score)
  const useCredit = useCallback(() => {
    setCredits((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  // Optimistically add credits (used after purchase)
  const addCredits = useCallback((amount: number) => {
    setCredits((prev) => (prev !== null ? prev + amount : amount));
  }, []);

  const canPlayGame = useCallback(() => {
    return credits !== null && credits > 0;
  }, [credits]);

  const handleGameAttempt = useCallback(() => {
    if (!canPlayGame()) {
      setShowOutOfCreditsDialog(true);
      return false;
    }
    return true;
  }, [canPlayGame]);

  const value: CreditsContextType = {
    credits,
    isLoading,
    useCredit,
    addCredits,
    refreshCredits,
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
