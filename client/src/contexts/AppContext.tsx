import React, { createContext, useContext, useState } from "react";
import { useUserInfoLoader } from "../hooks/useUserInfoLoader";
import { Profile } from "../types";
import { type User } from "@supabase/supabase-js";

interface AppContextType {
  user: User | null;
  spiritAnimal: string;
  setSpiritAnimal: React.Dispatch<React.SetStateAction<string>>;
  profile?: Profile | null;
  reloadUser: () => void;
  reloadProfile: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const { user, profile, reloadUser, reloadProfile } = useUserInfoLoader();
  const [spiritAnimal, setSpiritAnimal] = useState<string>("🐔");

  const value: AppContextType = {
    user,
    profile,
    spiritAnimal,
    setSpiritAnimal,
    reloadUser,
    reloadProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
