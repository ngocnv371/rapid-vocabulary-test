
export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Word {
  id: number;
  word: string;
  // FIX: Changed category to number to match foreign key type and usage in Quiz.tsx.
  category: number;
  language: string;
  meaning: string;
}

export interface Score {
  id: number;
  user_id: string;
  score: number;
  category: number;
  created_at: string;
}

export interface Profile {
  id: string;
  // FIX: Changed `name` and `email` from optional properties (`?`) to required, nullable
  // properties. The optional syntax was causing Supabase's type inference to fail and resolve to `never`,
  // leading to type errors across the application. This change ensures correct type inference.
  name: string | null;
  email: string | null;
}

export interface ScoreWithProfile extends Score {
  // FIX: The joined profile can be null if a corresponding profile is not found.
  profiles: Profile | null;
}
