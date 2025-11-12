import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '../services/storage';
import { type UserInfo } from 'zmp-sdk';

interface AppContextType {
  hearts: number;
  user: UserInfo | null;
  profileId?: number | null;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  useHeart: () => void;
  resetHearts: () => void;
  showOutOfHeartsDialog: boolean;
  setShowOutOfHeartsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  canPlayGame: () => boolean;
  handleGameAttempt: () => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
  user: UserInfo | null;
  profileId?: number | null;
}

export function AppProvider({ children, user, profileId }: AppProviderProps) {
  const [hearts, setHearts] = useState<number>(3);
  const [showOutOfHeartsDialog, setShowOutOfHeartsDialog] = useState(false);

  // Effect for managing hearts persistence for anonymous users
  useEffect(() => {
    if (user) return; // Don't manage hearts for logged-in users

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
  }, [user]);

  // Update nativeStorage whenever hearts change for anonymous users
  useEffect(() => {
    if (user) return;
    try {
      setItem("userHearts", String(hearts));
    } catch (error) {
      console.error("Error saving hearts to nativeStorage:", error);
    }
  }, [hearts, user]);

  const useHeart = useCallback(() => {
    setHearts((prev) => Math.max(0, prev - 1));
  }, []);

  const resetHearts = useCallback(() => {
    const initialHearts = 3;
    setHearts(initialHearts);
    if (!user) {
      try {
        setItem("userHearts", String(initialHearts));
      } catch (error) {
        console.error("Error resetting hearts in nativeStorage:", error);
      }
    }
  }, [user]);

  const canPlayGame = () => {
    return !!user || hearts > 0;
  };

  const handleGameAttempt = () => {
    if (!user && hearts <= 0) {
      setShowOutOfHeartsDialog(true);
      return false;
    }
    return true;
  };

  const value: AppContextType = {
    hearts,
    user,
    profileId,
    setHearts,
    useHeart,
    resetHearts,
    showOutOfHeartsDialog,
    setShowOutOfHeartsDialog,
    canPlayGame,
    handleGameAttempt,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}