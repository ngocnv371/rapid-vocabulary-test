import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "./services/supabase";
import type { Session } from "@supabase/supabase-js";
import Auth from "./components/Auth";
import SpiritAnimalSelector from "./components/SpiritAnimalSelector";
import Quiz from "./components/Quiz";
import GameOver from "./components/GameOver";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import type { Category } from "./types";
import OutOfHeartsDialog from "./components/OutOfHeartsDialog";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";

type GameState = "category" | "quiz" | "gameover" | "leaderboard" | "profile";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [gameState, setGameState] = useState<GameState>("category");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [finalScore, setFinalScore] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [postAuthGameState, setPostAuthGameState] =
    useState<GameState>("category");

  // New state for hearts system
  const [hearts, setHearts] = useState<number>(3);
  const [showOutOfHeartsDialog, setShowOutOfHeartsDialog] = useState(false);

  // Progress tracking for quiz
  const [quizProgress, setQuizProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === "SIGNED_IN" && session) {
        const scoreData = localStorage.getItem("scoreToSave");
        if (scoreData) {
          const { score, categoryId } = JSON.parse(scoreData);
          supabase
            .from("scores")
            .insert([
              {
                user_id: session.user.id,
                score,
                category: categoryId,
              },
            ])
            .select()
            .then(({ error }) => {
              if (!error) {
                localStorage.removeItem("scoreToSave");
              }
            });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const handleCategorySelect = (category: Category) => {
    if (!session && hearts <= 0) {
      setShowOutOfHeartsDialog(true);
      return;
    }
    setSelectedCategory(category);
    setGameState("quiz");
  };

  const handleGameOver = async (score: number) => {
    setFinalScore(score);
    if (session && selectedCategory) {
      await supabase
        .from("scores")
        .insert([
          {
            user_id: session.user.id,
            score: score,
            category: selectedCategory.id, // FIX: was category_id which is not a column
          },
        ])
        .select();
    } else if (selectedCategory) {
      localStorage.setItem(
        "scoreToSave",
        JSON.stringify({
          score: score,
          categoryId: selectedCategory.id,
        })
      );
      // For anonymous users, reduce hearts
      setHearts((prev) => Math.max(0, prev - 1));
    }
    setGameState("gameover");
  };

  const handlePlayAgain = () => {
    setSelectedCategory(null);
    setQuizProgress({ current: 0, total: 0 });
    setGameState("category");
  };

  const handleProgressUpdate = useCallback((current: number, total: number) => {
    setQuizProgress({ current, total });
  }, []);

  const handleViewLeaderboard = () => {
    setGameState("leaderboard");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isSubPage = gameState === "leaderboard" || gameState === "profile";

  const getHeaderTitle = () => {
    switch (gameState) {
      case "leaderboard":
        return "Leaderboard";
      case "profile":
        return "Profile";
      default:
        return "Rapid Test";
    }
  };

  const handleLogin = (redirectState: GameState = "category") => {
    setPostAuthGameState(redirectState);
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setGameState(postAuthGameState);
  };

  const renderContent = () => {
    switch (gameState) {
      case "quiz":
        if (selectedCategory) {
          return (
            <Quiz
              category={selectedCategory}
              onGameOver={handleGameOver}
              onBackToCategories={handlePlayAgain}
              onProgressUpdate={handleProgressUpdate}
            />
          );
        }
        // Fallback to category selection if category is not set
        setGameState("category");
        return null;
      case "gameover":
        return (
          <GameOver
            score={finalScore}
            onPlayAgain={handlePlayAgain}
            onViewLeaderboard={handleViewLeaderboard}
            session={session}
            onLoginToSave={() => handleLogin("leaderboard")}
          />
        );
      case "leaderboard":
        return <Leaderboard />;
      case "profile":
        if (session) {
          return <Profile />;
        }
        setGameState("category");
        return null;
      case "category":
      default:
        return <SpiritAnimalSelector onSelect={handleCategorySelect} />;
    }
  };

  if (showAuth) {
    return <Auth onSignInSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen w-full text-white font-sans flex flex-col items-center p-4 relative">
      <Header
        isSubPage={isSubPage}
        onBack={handlePlayAgain}
        title={getHeaderTitle()}
        session={session}
        hearts={hearts}
        isMenuVisible={!isSubPage}
        onLogout={handleLogout}
        onViewLeaderboard={handleViewLeaderboard}
        onViewProfile={() => setGameState("profile")}
        onLogin={() => {
          localStorage.removeItem("scoreToSave");
          handleLogin("category");
        }}
      />

      {/* Progress bar - only shown during quiz */}
      {gameState === "quiz" && (
        <ProgressBar current={quizProgress.current} total={quizProgress.total} />
      )}

      <main
        className={`w-full flex-grow flex justify-center ${
          isSubPage ? "items-start" : "items-center"
        }`}
      >
        {renderContent()}
      </main>

      {/* Out of Hearts Dialog */}
      {showOutOfHeartsDialog && (
        <OutOfHeartsDialog
          onClose={() => setShowOutOfHeartsDialog(false)}
          onLogin={() => {
            setShowOutOfHeartsDialog(false);
            handleLogin("category");
          }}
        />
      )}
    </div>
  );
}
