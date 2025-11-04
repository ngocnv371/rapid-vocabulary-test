
import React from 'react';
import type { Session } from '@supabase/supabase-js';
import HamburgerMenu from './HamburgerMenu';

interface HeaderProps {
  isSubPage: boolean;
  onBack: () => void;
  title: string;
  session: Session | null;
  hearts: number;
  onShowHeartsInfo: () => void;
  isMenuVisible: boolean;
  onLogout: () => void;
  onViewLeaderboard: () => void;
  onViewProfile: () => void;
  onLogin: () => void;
}

export default function Header({ 
    isSubPage, 
    onBack, 
    title, 
    session, 
    hearts, 
    onShowHeartsInfo,
    isMenuVisible,
    onLogout,
    onViewLeaderboard,
    onViewProfile,
    onLogin
}: HeaderProps) {
  return (
    <header className="w-full max-w-6xl flex justify-between items-center p-4 pl-0 pr-8">
      <div className="flex items-center gap-4">
        {isMenuVisible && (
          <HamburgerMenu 
            session={session}
            onLogout={onLogout}
            onViewLeaderboard={onViewLeaderboard}
            onViewProfile={onViewProfile}
            onLogin={onLogin}
          />
        )}
        {isSubPage && (
          <button
            onClick={onBack}
            className="p-2 rounded-md hover:bg-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Back to categories"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2 pr-8">
        {!session && !isSubPage && (
          <button
            onClick={onShowHeartsInfo}
            className="p-2 rounded-md hover:bg-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2 text-lg font-bold text-pink-400"
            aria-label={`You have ${hearts} hearts left`}
          >
            <span>{hearts}</span>
            <span role="img" aria-label="heart emoji">💖</span>
          </button>
        )}
      </div>
    </header>
  );
}
