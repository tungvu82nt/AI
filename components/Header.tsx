
import React from 'react';
import { Sparkles } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-slate-700/50">
      <div className="container mx-auto flex items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text flex items-center gap-3">
           <Sparkles className="w-8 h-8" />
           AI Media Studio
        </h1>
      </div>
    </header>
  );
};
