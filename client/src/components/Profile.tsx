import { useState, useEffect, useMemo } from "react";
import { supabase } from "../services/supabase";
import type { Score } from "../types";
import Spinner from "./Spinner";
import { useAppContext } from "@/src/contexts/AppContext";
import { Box, useSnackbar } from "zmp-ui";
import { calculateStreak } from "../utils/streakCalculator";
import WeeklyProgressChart from "./WeeklyProgressChart";
import UserAvatar from "./UserAvatar";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { profile, reloadUser, user } = useAppContext();
  const isAnonymous = user?.is_anonymous;
  const { t } = useTranslation();
  const { openSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(true);
  const [highestScore, setHighestScore] = useState<number | null>(null);
  const [weeklyScores, setWeeklyScores] = useState<Score[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error);
        setError(t("profile.logoutError"));
      } else {
        reloadUser();
        openSnackbar({
          text: t("profile.anonymousMode"),
          type: "success",
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Unexpected error during logout:", err);
      setError(t("profile.logoutError"));
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      if (profile?.id) {
        // Calculate date one week ago
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const oneWeekAgoISO = oneWeekAgo.toISOString();

        // Fetch the user's scores from the past week
        const { data, error: scoresError } = await supabase
          .from("scores")
          .select("*")
          .eq("profile_id", profile?.id)
          .gte("created_at", oneWeekAgoISO)
          .order("score", { ascending: false });

        if (scoresError) {
          console.error("Error fetching scores:", scoresError);
          setError("Could not fetch your scores.");
        } else if (data && data.length > 0) {
          const scores = data as Score[];
          setWeeklyScores(scores);
          setHighestScore(scores[0].score || 0);
        } else {
          setWeeklyScores([]);
          setHighestScore(0); // No scores yet
        }
      } else {
        setError("No user is logged in.");
      }
      setLoading(false);
    };
    if (!profile?.id) {
      return;
    }
    fetchProfile();
  }, [profile?.id]);

  // Memoized stats calculations
  const stats = useMemo(() => {
    const gamesPlayed = weeklyScores.length;

    const avgScore =
      gamesPlayed > 0
        ? Math.round(
            weeklyScores.reduce((sum, s) => sum + s.score, 0) / gamesPlayed
          )
        : 0;

    const streak = calculateStreak(weeklyScores);

    return {
      gamesPlayed,
      avgScore,
      streak,
    };
  }, [weeklyScores]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <Spinner />
        <p className="text-xl text-purple-300">{t("profile.loading")}</p>
      </div>
    );
  }

  if (error && !profile) {
    // Only show full-page error if profile couldn't be loaded
    return <div className="text-center text-red-400 min-h-screen">{error}</div>;
  }

  return (
    <div className="p-4 min-h-screen">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute z-[-10] bottom-0 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Profile Avatar Section - Centered */}
      <div className="relative flex justify-center mb-6">
        <div className="relative inline-block">
          {/* Glow ring around avatar */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 blur-xl opacity-75 animate-pulse"></div>
          <UserAvatar />
          {/* Trophy badge */}
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg border-2 border-white/20 transform hover:rotate-12 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Title with enhanced gradient */}
      <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 tracking-wide animate-pulse">
        {t("profile.highScores")}
      </h2>

      {/* Main Score Card with enhanced styling */}
      <div className="text-center mb-8 relative">
        {/* Decorative stars */}
        <div className="absolute -top-4 left-1/4 text-yellow-400 text-2xl animate-bounce">
          ✨
        </div>
        <div
          className="absolute -top-4 right-1/4 text-yellow-400 text-2xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          ✨
        </div>

        <div className="inline-block relative group">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

          {/* Score card */}
          <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20">
            <div className="absolute top-2 right-2 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <p className="text-sm text-purple-100 mb-3 uppercase tracking-widest font-bold">
              {t("profile.bestThisWeek")}
            </p>
            <p className="text-7xl font-black text-white drop-shadow-2xl tracking-tight">
              {highestScore ?? 0}
            </p>
            {/* Confetti dots */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            <div
              className="absolute bottom-4 right-6 w-2 h-2 bg-pink-300 rounded-full animate-ping"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="absolute top-6 right-8 w-2 h-2 bg-blue-300 rounded-full animate-ping"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-gradient-to-br text-center from-indigo-600/50 to-purple-600/50 p-4 rounded-xl border border-indigo-400/30 backdrop-blur-sm hover:border-indigo-400 transition-all duration-300 hover:transform hover:scale-105">
          <div className="text-2xl mb-1">🎮</div>
          <div className="text-xs text-indigo-200 uppercase tracking-wide">
            {t("profile.gamesThisWeek")}
          </div>
          <div className="text-xl font-bold text-white mt-1">
            {stats.gamesPlayed}
          </div>
        </div>
        <div className="bg-gradient-to-br text-center from-pink-600/50 to-rose-600/50 p-4 rounded-xl border border-pink-400/30 backdrop-blur-sm hover:border-pink-400 transition-all duration-300 hover:transform hover:scale-105">
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-xs text-pink-200 uppercase tracking-wide">
            {t("profile.avgScore")}
          </div>
          <div className="text-xl font-bold text-white mt-1">
            {stats.avgScore || "-"}
          </div>
        </div>
        <div className="bg-gradient-to-br text-center from-violet-600/50 to-fuchsia-600/50 p-4 rounded-xl border border-violet-400/30 backdrop-blur-sm hover:border-violet-400 transition-all duration-300 hover:transform hover:scale-105">
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-xs text-violet-200 uppercase tracking-wide">
            {t("profile.streak")}
          </div>
          <div className="text-xl font-bold text-white mt-1">
            {stats.streak > 0
              ? `${stats.streak} ${
                  stats.streak === 1 ? t("profile.day") : t("profile.days")
                }`
              : "-"}
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      {!isAnonymous && <WeeklyProgressChart scores={weeklyScores} />}

      {/* Logout Button */}
      {!isAnonymous && (
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-400/30 backdrop-blur-sm flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {t("profile.logout")}
        </button>
      )}

      {error && (
        <p className="mt-6 text-center text-red-300 bg-red-900/50 p-4 rounded-xl border border-red-500/30 backdrop-blur-sm animate-shake">
          {error}
        </p>
      )}
      <Box className="my-12"></Box>
    </div>
  );
}
