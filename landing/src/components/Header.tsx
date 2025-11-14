
import React, { useState } from 'react';
import { BrainCircuitIcon } from './icons';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#leaderboard', label: 'Leaderboard' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-xl font-bold text-white">
          <BrainCircuitIcon className="w-8 h-8 text-brand-light-purple" />
          <span>VocabRush</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="bg-brand-purple hover:bg-brand-light-purple text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105"
          >
            Get App
          </a>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-brand-dark/80 rounded-lg p-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors text-center" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="bg-brand-purple hover:bg-brand-light-purple text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105 text-center"
            >
              Get App
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
