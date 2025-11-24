import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TestMenuToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show if already on a test page
  if (location.pathname.includes('/test')) {
    return null;
  }

  const handleToggle = () => {
    if (!isOpen) {
      navigate('/test');
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={handleToggle}
        className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl"
        aria-label="Test Menu"
      >
        🧪
      </button>
    </div>
  );
};

export default TestMenuToggle;
