
import React from 'react';
import { BrainCircuitIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark/50 border-t border-white/10 py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        <div>
          <a href="#" className="flex items-center justify-center md:justify-start gap-2 text-xl font-bold text-white mb-2">
            <BrainCircuitIcon className="w-8 h-8 text-brand-light-purple" />
            <span>Voka</span>
          </a>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Voka. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
