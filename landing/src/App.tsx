
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import LeaderboardPreview from './components/LeaderboardPreview';
import Testimonial from './components/Testimonial';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-deep-purple to-brand-dark text-gray-200 font-sans antialiased overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-0"></div>
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Features />
          <LeaderboardPreview />
          <Testimonial />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
