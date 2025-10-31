
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
  category_id: string;
  created_at: string;
}

export interface ScoreWithEmail extends Score {
  profiles: {
    email: string;
  } | null;
}