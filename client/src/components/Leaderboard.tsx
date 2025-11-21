import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import type { ScoreWithProfile, Category } from "../types";
import Spinner from "./Spinner";
import { useTranslation } from "react-i18next";

const RankDisplay: React.FC<{ rank: number; isTopThree?: boolean }> = ({ rank, isTopThree }) => {
  const medals: { [key: number]: string } = { 1: "🥇", 2: "🥈", 3: "🥉" };
  const medal = medals[rank];

  const rankClasses: { [key: number]: string } = {
    1: "text-yellow-400 text-3xl",
    2: "text-gray-300 text-2xl",
    3: "text-amber-600 text-2xl",
  };
  const rankClass = rankClasses[rank] || "text-gray-400";

  if (isTopThree && medal) {
    return (
      <div className="flex flex-col items-center">
        <span className={`${rankClass} animate-float`}>{medal}</span>
      </div>
    );
  }

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

const PlayerAvatar: React.FC<{ name: string; avatarUrl?: string; rank: number }> = ({ 
  name, 
  avatarUrl, 
  rank 
}) => {
  const gradients: { [key: number]: string } = {
    1: "from-yellow-400 via-yellow-500 to-amber-500",
    2: "from-gray-300 via-gray-400 to-gray-500",
    3: "from-amber-600 via-yellow-700 to-orange-600",
  };
  const gradient = gradients[rank] || "from-purple-500 to-pink-500";
  
  const sizes: { [key: number]: string } = {
    1: "w-20 h-20 text-2xl",
    2: "w-16 h-16 text-xl",
    3: "w-16 h-16 text-xl",
  };
  const size = sizes[rank] || "w-12 h-12 text-base";

  const initial = name?.charAt(0).toUpperCase() || "?";

  return (
    <div className={`relative ${rank <= 3 ? 'animate-glow-pulse' : ''}`}>
      <div className={`p-1 rounded-full bg-gradient-to-br ${gradient}`}>
        <div className={`${size} rounded-full bg-gray-900 flex items-center justify-center font-bold text-white overflow-hidden`}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            initial
          )}
        </div>
      </div>
    </div>
  );
};

export default function Leaderboard() {
  const { t } = useTranslation();
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
        .select("*, profiles(id, name, avatar_url)")
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

  const topThree = scores.slice(0, 3);
  const rest = scores.slice(3);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 relative">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <Spinner />
          <p className="text-xl text-purple-300">{t('leaderboard.loading')}</p>
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
            {t('leaderboard.errorTitle')}
          </h3>
          <p className="text-gray-300">{error}</p>
        </div>
      ) : scores.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-purple-500/30 text-center">
          <p className="text-gray-400 text-lg">
            {t('leaderboard.noScores')}
          </p>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {topThree.length > 0 && (
            <div className="mb-8 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                {t('leaderboard.topChampions')}
              </h2>
              <div className="flex items-end justify-center gap-2 mb-8 px-2">
                {/* 2nd Place */}
                {topThree[1] && (
                  <div 
                    className="flex-1 max-w-[115px] animate-fade-in-up"
                    style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
                  >
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-3 border-2 border-gray-400 shadow-xl hover:shadow-gray-400/50 transition-all duration-300 hover:scale-105">
                      <div className="flex flex-col items-center gap-2">
                        <RankDisplay rank={2} isTopThree />
                        <PlayerAvatar 
                          name={topThree[1].profiles?.name || "Player"} 
                          avatarUrl={topThree[1].profiles?.avatar_url}
                          rank={2}
                        />
                        <div className="text-center w-full">
                          <p className="text-white font-bold text-xs leading-tight line-clamp-2 px-1" title={topThree[1].profiles?.name}>
                            {topThree[1].profiles?.name}
                          </p>
                          <div className="mt-1.5 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-2.5 py-1 rounded-full text-base font-bold">
                            {topThree[1].score}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <div 
                    className="flex-1 max-w-[130px] animate-fade-in-up"
                    style={{ animationFillMode: 'both' }}
                  >
                    <div className="relative bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl p-4 border-2 border-yellow-400 shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 hover:scale-105 animate-glow-pulse">
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-lg">
                        {t('leaderboard.champion')}
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <RankDisplay rank={1} isTopThree />
                        <PlayerAvatar 
                          name={topThree[0].profiles?.name || "Player"} 
                          avatarUrl={topThree[0].profiles?.avatar_url}
                          rank={1}
                        />
                        <div className="text-center w-full">
                          <p className="text-white font-bold text-xs leading-tight line-clamp-2 px-1" title={topThree[0].profiles?.name}>
                            {topThree[0].profiles?.name}
                          </p>
                          <div className="mt-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-3 py-1.5 rounded-full text-lg font-bold shadow-lg">
                            {topThree[0].score}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <div 
                    className="flex-1 max-w-[115px] animate-fade-in-up"
                    style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                  >
                    <div className="bg-gradient-to-br from-orange-700 to-amber-800 rounded-2xl p-3 border-2 border-amber-600 shadow-xl hover:shadow-amber-600/50 transition-all duration-300 hover:scale-105">
                      <div className="flex flex-col items-center gap-2">
                        <RankDisplay rank={3} isTopThree />
                        <PlayerAvatar 
                          name={topThree[2].profiles?.name || "Player"} 
                          avatarUrl={topThree[2].profiles?.avatar_url}
                          rank={3}
                        />
                        <div className="text-center w-full">
                          <p className="text-white font-bold text-xs leading-tight line-clamp-2 px-1" title={topThree[2].profiles?.name}>
                            {topThree[2].profiles?.name}
                          </p>
                          <div className="mt-1.5 bg-gradient-to-r from-amber-600 to-orange-700 text-white px-2.5 py-1 rounded-full text-base font-bold">
                            {topThree[2].score}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rest of Rankings */}
          {rest.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-300 mb-4 px-2">
                {t('leaderboard.allRankings')}
              </h3>
              {rest.map((s, index) => {
                const actualRank = index + 4;
                return (
                  <div
                    key={s.id || index}
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-4 rounded-xl shadow-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm animate-fade-in-up"
                    style={{ 
                      animationDelay: `${(index + 3) * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 flex justify-center">
                        <RankDisplay rank={actualRank} />
                      </div>
                      <div className="flex-shrink-0">
                        <PlayerAvatar 
                          name={s.profiles?.name || "Player"} 
                          avatarUrl={s.profiles?.avatar_url}
                          rank={actualRank}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-white font-semibold text-lg truncate"
                          title={s.profiles?.name || ""}
                        >
                          {s.profiles?.name}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span>{new Date(s.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-lg">
                          {s.score}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
