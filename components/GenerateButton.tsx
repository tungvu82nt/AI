
import React from 'react';
import { Sparkles, LoadingSpinner } from './icons';
import type { Tab } from '../types';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  activeTab: Tab;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, activeTab }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 disabled:bg-purple-800/50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-purple-500"
    >
      {isLoading ? (
        <>
          <LoadingSpinner className="w-6 h-6" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Sparkles className="w-6 h-6" />
          <span>Generate {activeTab === 'image' ? 'Image' : 'Video'}</span>
        </>
      )}
    </button>
  );
};
