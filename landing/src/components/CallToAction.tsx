
import React from 'react';
import { AppleIcon, GooglePlayIcon } from './icons';

const CallToAction: React.FC = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-8 md:p-12 shadow-2xl shadow-purple-500/40">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Become a Word Master?</h2>
          <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
            Download the app now and start your journey. It's free to play and compete!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#"
              className="flex items-center justify-center gap-3 bg-gray-900/80 hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 w-full sm:w-auto"
            >
              <AppleIcon className="w-7 h-7" />
              <div>
                <p className="text-xs">Download on the</p>
                <p className="text-xl font-bold -mt-1">App Store</p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-3 bg-gray-900/80 hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 w-full sm:w-auto"
            >
              <GooglePlayIcon className="w-7 h-7" />
               <div>
                <p className="text-xs">GET IT ON</p>
                <p className="text-xl font-bold -mt-1">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
