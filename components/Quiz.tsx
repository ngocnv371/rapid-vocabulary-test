
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../services/supabase';
import type { Category, Word } from '../types';
import Spinner from './Spinner';

interface QuizProps {
  category: Category;
  onGameOver: (score: number) => void;
  onBackToCategories: () => void;
  onProgressUpdate?: (current: number, total: number) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function Quiz({ category, onGameOver, onBackToCategories, onProgressUpdate }: QuizProps) {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('words')
        .select('*')
        .limit(100);

      if (error) {
        setError('Failed to fetch words. Please try again.');
        console.error(error);
      } else if (data && data.length > 3) {
        setWords(shuffleArray(data));
      } else {
        setError('Not enough words available to start a quiz. (Need at least 4)');
      }
      setLoading(false);
    };

    fetchWords();
  }, [category]);

  // Update progress when words load or question changes
  useEffect(() => {
    if (words.length > 0 && onProgressUpdate) {
      onProgressUpdate(currentQuestionIndex + 1, words.length);
    }
  }, [currentQuestionIndex, words.length, onProgressUpdate]);

  const allMeanings = useMemo(() => {
      if (!words.length) return [];
      return Array.from(new Set(words.map(w => w.meaning)));
  }, [words]);

  useEffect(() => {
    if (words.length > 0 && currentQuestionIndex < words.length) {
      const currentWord = words[currentQuestionIndex];
      const correctAnswer = currentWord.meaning;
      
      const incorrectAnswers = allMeanings
        .filter(meaning => meaning !== correctAnswer);

      const shuffledIncorrect = shuffleArray(incorrectAnswers);
      
      const choiceOptions = shuffleArray([
        correctAnswer,
        ...shuffledIncorrect.slice(0, 3)
      ]);
      
      setOptions(choiceOptions);
    }
  }, [currentQuestionIndex, words, allMeanings]);

  const handleAnswer = (selectedMeaning: string) => {
    const currentWord = words[currentQuestionIndex];
    if (selectedMeaning === currentWord.meaning) {
      setScore(prev => prev + 1);
      if (currentQuestionIndex + 1 < words.length) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Game won!
        onGameOver(score + 1);
      }
    } else {
      // Game over
      onGameOver(score);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner />
        <p className="text-xl text-purple-300">Loading questions...</p>
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
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3">Oops! Something went wrong.</h2>
        <p className="text-lg text-gray-300 mb-8">{error}</p>
        <button
          onClick={onBackToCategories}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg transition-colors"
        >
          Choose a Different Spirit Animal
        </button>
      </div>
    );
  }

  if (words.length === 0 || currentQuestionIndex >= words.length) {
    return <p className="text-xl">No questions available.</p>;
  }

  const currentWord = words[currentQuestionIndex];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-10 text-center">
        <p className="text-2xl md:text-3xl text-gray-300 mb-4">What is the meaning of</p>
        <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 break-words">
          {currentWord.word}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-purple-500/30 hover:bg-gray-700/50 hover:border-purple-500 text-lg font-semibold text-white"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}