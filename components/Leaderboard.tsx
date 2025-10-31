import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import type { ScoreWithProfile, Category } from '../types';
import Spinner from './Spinner';

const formatPlayerName = (email: string | null | undefined) => {
    if (!email) return 'Anonymous';
    return email.split('@')[0];
};

const RankDisplay: React.FC<{ rank: number }> = ({ rank }) => {
    const medals: { [key: number]: string } = { 1: '🥇', 2: '🥈', 3: '🥉' };
    const medal = medals[rank];

    const rankClasses: { [key: number]: string } = {
        1: 'text-yellow-400',
        2: 'text-gray-300',
        3: 'text-yellow-600'
    };
    const rankClass = rankClasses[rank] || 'text-gray-400';

    return (
        <span className={`font-bold text-xl ${rankClass} flex items-center justify-center gap-2`}>
            {medal ? 
                <>
                    <span className="text-2xl">{medal}</span>
                    <span className="hidden sm:inline">{rank}</span>
                </> : 
                rank
            }
        </span>
    );
};

export default function Leaderboard() {
  const [scores, setScores] = useState<ScoreWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('id, name').order('name');
      if (!error && data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('scores')
        .select('*, profiles(id, name, email)')
        .order('score', { ascending: false })
        .limit(20);

      if (filterCategory !== 'All') {
        query = query.eq('category_id', filterCategory);
      }

      const { data, error } = await query;

      if (error) {
        setError('Failed to fetch leaderboard data.');
        console.error(error);
      } else {
        setScores(data);
      }
      setLoading(false);
    };

    fetchScores();
  }, [filterCategory]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col">
      <div className="mb-4 self-start">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
          aria-label="Filter scores by category"
        >
          <option value="All">All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-purple-500/30">
        <div className="overflow-x-auto">
            {loading ? (
                <div className="flex justify-center items-center h-64"><Spinner /></div>
            ) : error ? (
                <div className="p-8 text-center flex flex-col items-center justify-center h-64">
                    <div className="w-16 h-16 mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                        Could Not Load Scores
                    </h3>
                    <p className="text-gray-300">{error}</p>
                </div>
            ) : scores.length === 0 ? (
                <p className="p-8 text-center text-gray-400">No scores yet for this category. Be the first!</p>
            ) : (
                <table className="w-full text-left">
                    <thead className="bg-gray-900/70">
                    <tr>
                        <th className="p-4 font-bold text-purple-400 text-center w-24">Rank</th>
                        <th className="p-4 font-bold text-purple-400">Player</th>
                        <th className="p-4 font-bold text-purple-400">Score</th>
                        <th className="p-4 font-bold text-purple-400 hidden sm:table-cell">Category</th>
                        <th className="p-4 font-bold text-purple-400 hidden md:table-cell">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map((s, index) => (
                        <tr key={s.id || index} className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors">
                            <td className="p-4 text-center">
                                <RankDisplay rank={index + 1} />
                            </td>
                            <td className="p-4 text-white font-medium truncate" title={s.profiles?.name ?? ''}>
                                {formatPlayerName(s.profiles?.name)}
                            </td>
                            <td className="p-4 text-purple-300 font-bold text-xl">{s.score}</td>
                            <td className="p-4 text-gray-300 hidden sm:table-cell">{categories.find(c => c.id === s.category_id)?.name}</td>
                            <td className="p-4 text-gray-400 text-sm hidden md:table-cell">{new Date(s.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
      </div>
    </div>
  );
}