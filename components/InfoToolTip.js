"use client"
import { useState } from 'react';

export default function InfoToolTip({ content }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-block ml-1">
      <button
        className="text-gray-400 hover:text-white focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
      {isVisible && (
        <div className="absolute z-10 w-48 px-2 py-1 mt-2 text-sm text-white bg-gray-700 rounded-lg shadow-lg">
          {content}
        </div>
      )}
    </span>
  );
}