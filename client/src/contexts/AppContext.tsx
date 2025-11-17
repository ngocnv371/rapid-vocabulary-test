import React, { createContext, useContext, useState } from "react";
import { type UserInfo } from "zmp-sdk";
import { useUserInfoLoader } from "../hooks/useUserInfoLoader";

interface AppContextType {
  user: UserInfo | null;
  spiritAnimal: string;
  setSpiritAnimal: React.Dispatch<React.SetStateAction<string>>;
  profileId?: number | null;
  reloadUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const { user, profileId, reload } = useUserInfoLoader();
  const [spiritAnimal, setSpiritAnimal] = useState<string>("🐔");

  const value: AppContextType = {
    user,
    profileId,
    spiritAnimal,
    setSpiritAnimal,
    reloadUser: reload,
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
