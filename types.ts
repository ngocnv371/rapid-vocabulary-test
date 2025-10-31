
export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Word {
  id: number;
  word: string;
  category_id: string;
  language: string;
  meaning: string;
}

export interface Score {
  id: number;
  user_id: string;
  score: number;
  category_id: number;
  created_at: string;
}

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
}

export interface ScoreWithProfile extends Score {
  profiles: Profile;
}
