
import React, { useState, useEffect } from 'react';
import type { Category } from '../types';
import { supabase } from '../services/supabase';
import Spinner from './Spinner';

interface CategorySelectorProps {
  onSelectCategory: (category: Category) => void;
}

const CategoryCard: React.FC<{ category: Category; onClick: () => void; }> = ({ category, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-purple-500/30 hover:bg-gray-700/50 hover:border-purple-500 flex flex-col items-center justify-center aspect-square"
        >
            <span className="text-5xl sm:text-6xl mb-4" role="img" aria-label={`${category.name} emoji`}>{category.icon}</span>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-wide leading-tight">{category.name}</h3>
        </button>
    );
};


export default function CategorySelector({ onSelectCategory }: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, icon')
        .order('name');
        
      if (error) {
        setError('Failed to load categories. Please try again later.');
        console.error(error);
      } else {
        setCategories(data);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner />
        <p className="text-xl text-purple-300">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
        <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-2xl border border-purple-500/30 text-center flex flex-col items-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3">Error Loading Categories</h2>
            <p className="text-lg text-gray-300">{error}</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Choose a Category
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} onClick={() => onSelectCategory(category)} />
        ))}
      </div>
    </div>
  );
}