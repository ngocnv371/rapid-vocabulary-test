
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../services/supabase';
import type { Category, Word } from '../types';
import Spinner from './Spinner';
import EmojiCelebration from './EmojiCelebration';
import { useEmojiCelebration, type CelebrationType } from '../hooks/useEmojiCelebration';
import { useTranslation } from 'react-i18next';

interface QuizProps {
  category?: Category;
  onGameOver?: (score: number) => void;
  onBackToCategories?: () => void;
  onProgressUpdate?: (current: number, total: number) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function Quiz({ category, onGameOver, onBackToCategories, onProgressUpdate }: QuizProps) {
  const { t } = useTranslation();
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Change this to try different effects:
  // 'burst-pop', 'spinning-star', 'confetti-rain', 'ripple-wave', 'firework', or 'random'
  const { emojiParticles, containerRef, triggerCelebration } = useEmojiCelebration('random');

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

    onProgressUpdate(0, 0);
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
      // Trigger exit animation
      setIsTransitioning(true);
      
      // Wait for exit animation, then update content and trigger enter animation
      setTimeout(() => {
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
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentQuestionIndex, words, allMeanings]);

  const handleAnswer = (selectedMeaning: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const currentWord = words[currentQuestionIndex];
    if (selectedMeaning === currentWord.meaning) {
      // Trigger emoji celebration
      triggerCelebration(event);
      
      setScore(prev => prev + 1);
      
      // Start transition animation immediately
      setIsTransitioning(true);
      
      // Delay progression to show animation
      setTimeout(() => {
        if (currentQuestionIndex + 1 < words.length) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          // Game won!
          onGameOver(score + 1);
        }
      }, 500);
    } else {
      // Game over
      onGameOver(score);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner />
        <p className="text-xl text-purple-300">{t('quiz.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full max-w-lg p-4'>
        <div className="bg-gray-800 p-4 rounded-2xl shadow-2xl border border-purple-500/30 text-center flex flex-col items-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3">{t('quiz.errorTitle')}</h2>
        <p className="text-lg text-gray-300 mb-8">{error}</p>
        <button
          onClick={onBackToCategories}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg transition-colors"
        >
          {t('quiz.errorButton')}
        </button>
      </div>
      </div>
    );
  }

  if (words.length === 0 || currentQuestionIndex >= words.length) {
    return <p className="text-xl">{t('quiz.noQuestions')}</p>;
  }

  const currentWord = words[currentQuestionIndex];

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto p-4 relative">
      <EmojiCelebration particles={emojiParticles} />
      
      {/* Question container */}
      <div 
        className={`mb-8 text-center transition-all duration-500 ease-in-out ${
          isTransitioning 
            ? 'opacity-0 translate-y-[-20px]' 
            : 'opacity-100 translate-y-0'
        }`}
      >
        <p className="text-xl md:text-2xl text-gray-400 mb-4">{t('quiz.questionPrefix')}</p>
        <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 break-words">
          {currentWord.word}
        </h2>
      </div>
      
      {/* Options container */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={(e) => handleAnswer(option, e)}
            className={`bg-white/5 backdrop-blur-md p-5 sm:p-6 rounded-2xl text-center transform hover:-translate-y-1 transition-all duration-200 ease-out border border-white/10 hover:bg-white/10 hover:border-purple-400/50 text-lg font-medium text-gray-200 hover:text-white ${
              isTransitioning 
                ? 'opacity-0 translate-x-[-20px]' 
                : 'opacity-100 translate-x-0'
            }`}
            style={{
              transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`,
              transitionDuration: '500ms'
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}