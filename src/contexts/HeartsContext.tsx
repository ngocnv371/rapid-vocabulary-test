import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getItem, setItem } from '../services/storage';

interface HeartsContextType {
  hearts: number;
  session: Session | null;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  useHeart: () => void;
  resetHearts: () => void;
  showOutOfHeartsDialog: boolean;
  setShowOutOfHeartsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  canPlayGame: () => boolean;
  handleGameAttempt: () => boolean;
}

const HeartsContext = createContext<HeartsContextType | undefined>(undefined);

interface HeartsProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export function HeartsProvider({ children, session }: HeartsProviderProps) {
  const [hearts, setHearts] = useState<number>(3);
  const [showOutOfHeartsDialog, setShowOutOfHeartsDialog] = useState(false);

  // Effect for managing hearts persistence for anonymous users
  useEffect(() => {
    if (session) return; // Don't manage hearts for logged-in users

    try {
      const savedHearts = getItem("userHearts");
      if (savedHearts !== null) {
        setHearts(parseInt(savedHearts, 10));
      } else {
        const initialHearts = 3;
        setHearts(initialHearts);
        setItem("userHearts", String(initialHearts));
      }
    } catch (error) {
      console.error("Error accessing nativeStorage:", error);
      setHearts(3); // Fallback to default value
    }
  }, [session]);

  // Update nativeStorage whenever hearts change for anonymous users
  useEffect(() => {
    if (session) return;
    try {
      setItem("userHearts", String(hearts));
    } catch (error) {
      console.error("Error saving hearts to nativeStorage:", error);
    }
  }, [hearts, session]);

  const useHeart = useCallback(() => {
    setHearts((prev) => Math.max(0, prev - 1));
  }, []);

  const resetHearts = useCallback(() => {
    const initialHearts = 3;
    setHearts(initialHearts);
    if (!session) {
      try {
        setItem("userHearts", String(initialHearts));
      } catch (error) {
        console.error("Error resetting hearts in nativeStorage:", error);
      }
    }
  }, [session]);

  const canPlayGame = () => {
    return !!session || hearts > 0;
  };

  const handleGameAttempt = () => {
    if (!session && hearts <= 0) {
      setShowOutOfHeartsDialog(true);
      return false;
    }
    return true;
  };

  const value: HeartsContextType = {
    hearts,
    session,
    setHearts,
    useHeart,
    resetHearts,
    showOutOfHeartsDialog,
    setShowOutOfHeartsDialog,
    canPlayGame,
    handleGameAttempt,
  };

  return (
    <HeartsContext.Provider value={value}>
      {children}
    </HeartsContext.Provider>
  );
}

export function useHearts() {
  const context = useContext(HeartsContext);
  if (context === undefined) {
    throw new Error('useHearts must be used within a HeartsProvider');
  }
  return context;
}