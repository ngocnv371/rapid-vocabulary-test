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

export interface Product {
  id: string;
  name: string;
  credits: number;
  bonus_credits: number;
  price: number;
  currency: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  profile_id: number;
  product_id: string;
  credits: number;
  amount: number;
  currency: string;
  description: string | null;
  reference: string | null;
  payment_status: string;
  payment_id: string | null;
  created_at: string;
}

export interface ScoreWithProfile extends Score {
  profiles: Profile | null;
}

export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
}