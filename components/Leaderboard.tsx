import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import type { ScoreWithProfile, Category } from "../types";
import Spinner from "./Spinner";

const formatPlayerName = (
  name: string | null | undefined,
  email: string | null | undefined
) => {
  if (name && name.trim() !== "") return name;
  if (!email) return "Anonymous";
  return email.split("@")[0];
};

const RankDisplay: React.FC<{ rank: number }> = ({ rank }) => {
  const medals: { [key: number]: string } = { 1: "🥇", 2: "🥈", 3: "🥉" };
  const medal = medals[rank];

  const rankClasses: { [key: number]: string } = {
    1: "text-yellow-400",
    2: "text-gray-300",
    3: "text-yellow-600",
  };
  const rankClass = rankClasses[rank] || "text-gray-400";

  return (
    <span
      className={`font-bold text-xl ${rankClass} flex items-center justify-center gap-2`}
    >
      {medal ? (
        <>
          <span className="text-2xl">{medal}</span>
          <span className="hidden sm:inline">{rank}</span>
        </>
      ) : (
        rank
      )}
    </span>
  );
};

export default function Leaderboard() {
  const [scores, setScores] = useState<ScoreWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("scores")
        .select("*, profiles(id, name, email)")
        .order("score", { ascending: false })
        .limit(20);

      const { data, error } = await query;

      if (error) {
        setError("Failed to fetch leaderboard data.");
        console.error(error);
      } else {
        setScores(data);
      }
      setLoading(false);
    };

    fetchScores();
  }, [filterCategory]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <Spinner />
            <p className="text-xl text-purple-300">Loading leaderboard...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mb-4 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
              Could Not Load Scores
            </h3>
            <p className="text-gray-300">{error}</p>
          </div>
        ) : scores.length === 0 ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-purple-500/30 text-center">
            <p className="text-gray-400 text-lg">
              No scores yet for this category. Be the first!
            </p>
          </div>
        ) : (
          scores.map((s, index) => (
            <div
              key={s.id || index}
              className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-purple-500/30 hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <RankDisplay rank={index + 1} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-white font-semibold text-lg truncate"
                      title={s.profiles?.name ?? s.profiles?.email ?? ""}
                    >
                      {formatPlayerName(s.profiles?.name, s.profiles?.email)}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-400">
                      <span className="hidden sm:inline">•</span>
                      <span>{new Date(s.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-purple-300 font-bold text-2xl">
                    {s.score}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
