export interface Animal {
  id: string;
  name: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Word {
  id: number;
  word: string;
  category: string;
  language: string;
  meaning: string;
}

export interface Score {
  id: number;
  profile_id: number;
  score: number;
  category: string;
  created_at: string;
}

export interface Profile {
  id: number;
  user_id: string;
  name: string | null;
  zalo_id: string | null;
  avatar_url: string | null;
}

export interface Credits {
  profile_id: number;
  amount: number;
}

export interface ScoreWithProfile extends Score {
  profiles: Profile | null;
}

export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
}