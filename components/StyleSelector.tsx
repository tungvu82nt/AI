
import React from 'react';
import type { Style } from '../types';

interface StyleSelectorProps {
  styles: Style[];
  selectedStyle: string;
  onSelectStyle: (styleId: string) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelectStyle(style.id)}
          className={`p-2.5 rounded-lg text-center transition-all duration-200 border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-purple-500
            ${
              selectedStyle === style.id
                ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500'
            }
          `}
        >
          <div className="flex items-center justify-center h-6 w-6 mx-auto mb-1.5">{style.icon}</div>
          <span className="text-xs font-medium">{style.name}</span>
        </button>
      ))}
    </div>
  );
};
