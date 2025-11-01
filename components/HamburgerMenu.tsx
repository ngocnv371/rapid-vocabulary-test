
import React, { useState, useRef, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';

interface HamburgerMenuProps {
  session: Session | null;
  onLogout: () => void;
  onViewLeaderboard: () => void;
  onViewProfile: () => void;
  onLogin: () => void;
}

export default function HamburgerMenu({ session, onLogout, onViewLeaderboard, onViewProfile, onLogin }: HamburgerMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 rounded-md hover:bg-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label="Open user menu"
        aria-expanded={isMenuOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 border border-purple-500/50 rounded-lg shadow-lg z-10">
          {session ? (
            <>
              <div className="p-4 border-b border-gray-700">
                <p className="text-sm text-gray-400">Signed in as</p>
                <p className="font-medium truncate" title={session.user.email ?? ''}>{session.user.email}</p>
              </div>
              <button
                onClick={() => {
                  onViewLeaderboard();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-purple-500/20 text-purple-300 hover:text-white font-medium transition-colors flex items-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Leaderboard
              </button>
              <button
                onClick={() => {
                  onViewProfile();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-purple-500/20 text-purple-300 hover:text-white font-medium transition-colors flex items-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-purple-500/20 text-purple-300 hover:text-red-400 font-medium transition-colors flex items-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onViewLeaderboard();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-purple-500/20 text-purple-300 hover:text-white font-medium transition-colors flex items-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Leaderboard
              </button>
              <button
                onClick={() => {
                  onLogin();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-purple-500/20 text-purple-300 hover:text-white font-medium transition-colors flex items-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                Login / Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
