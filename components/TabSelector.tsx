
import React from 'react';
import type { Tab } from '../types';
import { PhotoIcon, VideoCameraIcon } from './icons';

interface TabSelectorProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: Tab; name: string; icon: React.ReactNode }[] = [
    { id: 'image', name: 'Image Studio', icon: <PhotoIcon /> },
    { id: 'video', name: 'Video Studio', icon: <VideoCameraIcon /> },
  ];

  return (
    <div className="flex justify-center bg-slate-900/60 p-1.5 rounded-xl max-w-sm mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
            ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-700/50'
            }
          `}
        >
          {tab.icon}
          {tab.name}
        </button>
      ))}
    </div>
  );
};
