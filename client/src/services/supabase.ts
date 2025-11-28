
import { createClient } from '@supabase/supabase-js';
import { type Word, type Category, type Score, type Profile, type Credits } from '../types';

interface Database {
  public: {
    Tables: {
      words: {
        Row: Word;
        Insert: Omit<Word, 'id'>;
        Update: Partial<Omit<Word, 'id'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id'>;
        Update: Partial<Omit<Category, 'id'>>;
      };
      scores: {
        Row: Score;
        Insert: Omit<Score, 'id' | 'created_at'>;
        Update: Partial<Omit<Score, 'id' | 'created_at' | 'user_id'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id'>;
        Update: Partial<Omit<Profile, 'id' | 'user_id'>>;
      };
      credits: {
        Row: Credits;
        Insert: Credits;
        Update: Partial<Credits>;
      };
    };
  };
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// A simple check to remind the user to configure their credentials.
if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn(`Supabase credentials are not configured. 
    Please replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_ANON_KEY' in services/supabase.ts, 
    or set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.`);
}


export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);