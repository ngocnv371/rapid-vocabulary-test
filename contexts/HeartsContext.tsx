import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';

interface HeartsContextType {
  hearts: number;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  useHeart: () => void;
  resetHearts: () => void;
  showOutOfHeartsDialog: boolean;
  setShowOutOfHeartsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  canPlayGame: (session: any) => boolean;
  handleGameAttempt: (session: any) => boolean;
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

    const savedHearts = localStorage.getItem("userHearts");
    if (savedHearts !== null) {
      setHearts(parseInt(savedHearts, 10));
    } else {
      const initialHearts = 3;
      setHearts(initialHearts);
      localStorage.setItem("userHearts", String(initialHearts));
    }
  }, [session]);

  useEffect(() => {
    if (session) return;
    localStorage.setItem("userHearts", String(hearts));
  }, [hearts, session]);

  const useHeart = () => {
    setHearts((prev) => Math.max(0, prev - 1));
  };

  const resetHearts = () => {
    const initialHearts = 3;
    setHearts(initialHearts);
    if (!session) {
      localStorage.setItem("userHearts", String(initialHearts));
    }
  };

  const canPlayGame = (userSession: any) => {
    return userSession || hearts > 0;
  };

  const handleGameAttempt = (userSession: any) => {
    if (!userSession && hearts <= 0) {
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