
import React from 'react';

const Testimonial: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-brand-dark/30">
      <div className="container mx-auto max-w-3xl text-center">
        <blockquote className="relative">
          <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-6 h-16 w-16 text-purple-600/30" stroke="currentColor" fill="none" viewBox="0 0 144 144">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M41.486 114.316C28.234 104.162 24.368 87.2 29.54 71.74c5.172-15.46 18.23-26.68 33.7-26.68 15.47 0 28.528 11.22 33.7 26.68 5.172 15.46.336 32.422-12.916 42.578C70.768 124.47 54.738 124.47 41.486 114.316zM114.316 114.316c-13.252-10.154-17.118-27.114-11.946-42.574C107.542 56.28 120.6 45.06 136.07 45.06c15.47 0 28.528 11.22 33.7 26.68 5.172 15.46.336 32.422-12.916 42.578-13.252 10.156-29.282 10.156-42.534 0z"></path>
          </svg>
          <p className="text-2xl italic text-gray-200">
            "I've always struggled with learning new words. Voka made it an addictive game. My vocabulary has improved more in the last month than it has in years!"
          </p>
          <footer className="mt-8">
            <div className="flex items-center justify-center">
              <img className="w-12 h-12 rounded-full" src="https://i.pravatar.cc/50?u=a042581f4e29026704c" alt="User avatar" />
              <div className="ml-4 text-left">
                <p className="font-bold text-white">Jessica L.</p>
                <p className="text-sm text-gray-400">Avid Learner & Top 10 Player</p>
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

export default Testimonial;
