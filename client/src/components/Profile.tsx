import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import type { User } from '@supabase/supabase-js';
import Spinner from './Spinner';
import { useAppContext } from '@/src/contexts/AppContext';
import { Avatar, Box } from 'zmp-ui';
import AskForProfilePermission from './AskForProfilePermission';

export default function Profile() {
    const { user, profileId, spiritAnimal } = useAppContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [highestScore, setHighestScore] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            if (profileId) {
                // Fetch the user's highest score
                const { data, error: scoresError } = await supabase
                    .from('scores')
                    .select('*')
                    .eq('profile_id', profileId)
                    .order('score', { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (scoresError) {
                    console.error('Error fetching scores:', scoresError);
                    setError('Could not fetch your highest score.');
                } else if (data) {
                    setHighestScore(data.score || 0);
                } else {
                    setHighestScore(0); // No scores yet
                }
            } else {
                setError('No user is logged in.');
            }
            setLoading(false);
        };
        if (!profileId) {
            return;
        }
        fetchProfile();
    }, [profileId]);

    if (!user) {
        return null;
    }

    if (loading) {
        return <div className="flex flex-col items-center justify-center gap-4"><Spinner /><p className="text-xl text-purple-300">Loading profile...</p></div>;
    }

    if (error && !user) { // Only show full-page error if user couldn't be loaded
        return <div className="text-center text-red-400">{error}</div>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4 relative">
            {/* Animated background orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Profile Avatar Section - Centered */}
            <div className='relative flex justify-center mb-6'>
                <div className="relative inline-block">
                    {/* Glow ring around avatar */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 blur-xl opacity-75 animate-pulse"></div>
                    <div className="relative ring-4 ring-purple-400/50 rounded-full shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        {user?.avatar ? <Avatar src={user?.avatar} size={96} />: <div className='text-7xl w-[96px] h-[96px]'>{spiritAnimal}</div>}
                    </div>
                    {/* Trophy badge */}
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg border-2 border-white/20 transform hover:rotate-12 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Title with enhanced gradient */}
            <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 tracking-wide animate-pulse">
                🏆 High Scores 🏆
            </h2>

            {/* Main Score Card with enhanced styling */}
            <div className="text-center mb-8 relative">
                {/* Decorative stars */}
                <div className="absolute -top-4 left-1/4 text-yellow-400 text-2xl animate-bounce">✨</div>
                <div className="absolute -top-4 right-1/4 text-yellow-400 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
                
                <div className="inline-block relative group">
                    {/* Outer glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Score card */}
                    <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                        <div className="absolute top-2 right-2 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                        <p className="text-sm text-purple-100 mb-3 uppercase tracking-widest font-bold">🎯 Highest Score 🎯</p>
                        <p className="text-7xl font-black text-white drop-shadow-2xl tracking-tight">
                            {highestScore ?? 0}
                        </p>
                        {/* Confetti dots */}
                        <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                        <div className="absolute bottom-4 right-6 w-2 h-2 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                        <div className="absolute top-6 right-8 w-2 h-2 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-br text-center from-indigo-600/50 to-purple-600/50 p-4 rounded-xl border border-indigo-400/30 backdrop-blur-sm hover:border-indigo-400 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-2xl mb-1">🎮</div>
                    <div className="text-xs text-indigo-200 uppercase tracking-wide">Games Played</div>
                    <div className="text-xl font-bold text-white mt-1">-</div>
                </div>
                <div className="bg-gradient-to-br text-center from-pink-600/50 to-rose-600/50 p-4 rounded-xl border border-pink-400/30 backdrop-blur-sm hover:border-pink-400 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-xs text-pink-200 uppercase tracking-wide">Avg Score</div>
                    <div className="text-xl font-bold text-white mt-1">-</div>
                </div>
                <div className="bg-gradient-to-br text-center from-violet-600/50 to-fuchsia-600/50 p-4 rounded-xl border border-violet-400/30 backdrop-blur-sm hover:border-violet-400 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-2xl mb-1">🔥</div>
                    <div className="text-xs text-violet-200 uppercase tracking-wide">Streak</div>
                    <div className="text-xl font-bold text-white mt-1">-</div>
                </div>
            </div>
            <AskForProfilePermission />

            {error && <p className="mt-6 text-center text-red-300 bg-red-900/50 p-4 rounded-xl border border-red-500/30 backdrop-blur-sm animate-shake">{error}</p>}
            {message && <p className="mt-6 text-center text-green-300 bg-green-900/50 p-4 rounded-xl border border-green-500/30 backdrop-blur-sm">{message}</p>}
            <Box className='my-12'></Box>
        </div>
    );
}
