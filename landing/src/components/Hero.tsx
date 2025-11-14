
import React from 'react';
import { ArrowRightIcon } from './icons';

const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="container mx-auto text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          Test Your Vocabulary at
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Lightning Speed
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
          Challenge yourself with quick-fire quizzes, climb the global leaderboards, and expand your lexicon like never before.
        </p>
        <div className="flex justify-center items-center gap-4">
          <a
            href="#"
            className="group flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-light-purple text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
          >
            Take a Quick Test
            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <div className="mt-12">
            <img src="https://picsum.photos/seed/vocabulary/800/400" alt="App Preview" className="mx-auto rounded-lg shadow-2xl shadow-purple-900/50 border-4 border-purple-500/30" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
