
import React from 'react';
import { BoltIcon, GlobeAltIcon, ChartBarIcon, BookOpenIcon } from './icons';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 hover:border-purple-400 hover:bg-white/10 hover:-translate-y-2">
    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-500/20 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <BoltIcon className="w-6 h-6 text-purple-400" />,
      title: 'Quick-Fire Quizzes',
      description: 'Test your knowledge in timed, bite-sized quizzes designed to be fast, fun, and challenging.',
    },
    {
      icon: <GlobeAltIcon className="w-6 h-6 text-purple-400" />,
      title: 'Global Leaderboard',
      description: 'Compete against word wizards from around the world and claim your spot at the top.',
    },
    {
      icon: <ChartBarIcon className="w-6 h-6 text-purple-400" />,
      title: 'Track Your Progress',
      description: 'Visualize your growth with detailed stats and watch your vocabulary expand over time.',
    },
    {
      icon: <BookOpenIcon className="w-6 h-6 text-purple-400" />,
      title: 'Expansive Dictionary',
      description: 'Master thousands of words, from common to obscure, with clear definitions and examples.',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-brand-dark/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Why You'll Love Voka</h2>
          <p className="text-lg text-gray-400 mt-2">Everything you need to become a vocabulary champion.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
