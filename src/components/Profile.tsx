import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import type { User } from '@supabase/supabase-js';
import Spinner from './Spinner';
import { useAppContext } from '@/src/contexts/AppContext';

export default function Profile() {
    const { user: session } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [initialName, setInitialName] = useState('');
    const [initialEmail, setInitialEmail] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                setEmail(user.email || '');
                setInitialEmail(user.email || '');

                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('name')
                    .eq('id', user.id)
                    .single();

                if (error && error.code !== 'PGRST116') { // PGRST116: no rows found, which is fine
                    setError('Could not fetch your profile.');
                    console.error(error);
                } else if (profile) {
                    setName(profile.name || '');
                    setInitialName(profile.name || '');
                }
            } else {
                setError('No user is logged in.');
            }
            setLoading(false);
        };
        if (!session) {
            return;
        }
        fetchProfile();
    }, [session]);

    const isChanged = name !== initialName || email !== initialEmail;

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setError(null);
        setMessage(null);

        if (!user) {
            setError('User not found');
            setUpdating(false);
            return;
        }

        try {
            // Update name in profiles table
            if (name !== initialName) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({ name })
                    .eq('id', user.id)
                    .select();
                
                if (profileError) throw profileError;
                setInitialName(name);
            }

            // Update email in auth
            let emailMessage = '';
            if (email !== initialEmail) {
                const { error: authError } = await supabase.auth.updateUser({ email });
                if (authError) throw authError;
                // The onAuthStateChange listener in App.tsx should handle the session update once the user confirms.
                // We don't update initialEmail here because it's not confirmed yet.
                emailMessage = ' Please check your new email address to confirm the change.';
            }
            
            setMessage(`Profile updated successfully!${emailMessage}`);

        } catch (error: any) {
            setError(`Failed to update profile: ${error.message}`);
        } finally {
            setUpdating(false);
            setTimeout(() => setMessage(null), 5000);
        }
    }, [name, email, user, initialName, initialEmail]);

    const inputStyles = "w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-white";
    const buttonStyles = "w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300";

    if (!session) {
        return null;
    }

    if (loading) {
        return <div className="flex flex-col items-center justify-center gap-4"><Spinner /><p className="text-xl text-purple-300">Loading profile...</p></div>;
    }

    if (error && !user) { // Only show full-page error if user couldn't be loaded
        return <div className="text-center text-red-400">{error}</div>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4 pt-10">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-purple-500/30">
                <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    Update Your Profile
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputStyles}
                            placeholder="Your display name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            readOnly
                            className={inputStyles}
                            placeholder="you@example.com"
                        />
                    </div>
                    <button type="submit" disabled={!isChanged || updating} className={buttonStyles}>
                        {updating ? <Spinner className="w-6 h-6" /> : 'Save Changes'}
                    </button>
                </form>

                {error && <p className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
                {message && <p className="mt-4 text-center text-green-400 bg-green-900/50 p-3 rounded-md">{message}</p>}
            </div>
        </div>
    );
}
