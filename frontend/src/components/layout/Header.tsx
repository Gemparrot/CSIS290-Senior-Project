import React from 'react';

interface HeaderProps {
  onNavigate: () => void; 
  title?: string; 
}

const Header: React.FC<HeaderProps> = ({ onNavigate, title = '' }) => {
  return (
    <div className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={onNavigate}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
