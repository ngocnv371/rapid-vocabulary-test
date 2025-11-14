import React, { createContext, useContext, useState } from "react";
import { type UserInfo } from "zmp-sdk";

interface AppContextType {
  user: UserInfo | null;
  spiritAnimal: string;
  setSpiritAnimal: React.Dispatch<React.SetStateAction<string>>;
  profileId?: number | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
interface AppProviderProps {
  children: React.ReactNode;
  user: UserInfo | null;
  profileId?: number | null;
}

export function AppProvider({ children, user, profileId }: AppProviderProps) {
  const [spiritAnimal, setSpiritAnimal] = useState<string>("🐔");

  const value: AppContextType = {
    user,
    profileId,
    spiritAnimal,
    setSpiritAnimal,
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
