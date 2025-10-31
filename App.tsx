
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './services/supabase';
import type { Session } from '@supabase/supabase-js';
import Auth from './components/Auth';
import CategorySelector from './components/CategorySelector';
import Quiz from './components/Quiz';
import GameOver from './components/GameOver';
import Leaderboard from './components/Leaderboard';
import type { Category } from './types';

type GameState = 'auth' | 'category' | 'quiz' | 'gameover' | 'leaderboard';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [gameState, setGameState] = useState<GameState>('category');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setGameState('quiz');
  };

  const handleGameOver = async (score: number) => {
    setFinalScore(score);
    if (session && selectedCategory) {
      await supabase.from('scores').insert([{
        user_id: session.user.id,
        score: score,
        category_id: selectedCategory.id,
      }]).select();
    }
    setGameState('gameover');
  };

  const handlePlayAgain = () => {
    setSelectedCategory(null);
    setGameState('category');
  };

  const handleViewLeaderboard = () => {
    setGameState('leaderboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  }
  
  const isLeaderboard = gameState === 'leaderboard';

  const renderContent = () => {
    switch (gameState) {
      case 'quiz':
        if (selectedCategory) {
          return <Quiz category={selectedCategory} onGameOver={handleGameOver} onBackToCategories={handlePlayAgain} />;
        }
        // Fallback to category selection if category is not set
        setGameState('category');
        return null;
      case 'gameover':
        return <GameOver score={finalScore} onPlayAgain={handlePlayAgain} onViewLeaderboard={handleViewLeaderboard} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'category':
      default:
        // FIX: Corrected function name from `handleSelectCategory` to `handleCategorySelect`.
        return <CategorySelector onSelectCategory={handleCategorySelect} />;
    }
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen w-full text-white font-sans flex flex-col items-center p-4 relative">
      <header className="w-full max-w-6xl flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          {isLeaderboard && (
              <button
                onClick={handlePlayAgain}
                className="p-2 rounded-md hover:bg-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Back to categories"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
              </button>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            {isLeaderboard ? 'Leaderboard' : 'Vocabulary Test'}
          </h1>
        </div>
        {!isLeaderboard && (
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
                <div className="p-4 border-b border-gray-700">
                  <p className="text-sm text-gray-400">Signed in as</p>
                  <p className="font-medium truncate" title={session.user.email ?? ''}>{session.user.email}</p>
                </div>
                <button
                  onClick={() => {
                    handleViewLeaderboard();
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
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-purple-500/20 text-purple-300 hover:text-red-400 font-medium transition-colors flex items-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      <main className={`w-full flex-grow flex justify-center ${isLeaderboard ? 'items-start' : 'items-center'}`}>
        {renderContent()}
      </main>
    </div>
  );
}