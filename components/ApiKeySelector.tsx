
import React from 'react';
import { KeyIcon } from './icons';

interface ApiKeySelectorProps {
  onSelectKey: () => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onSelectKey }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-slate-900/50 rounded-lg p-8 text-center">
      <KeyIcon className="w-16 h-16 text-purple-400 mb-6" />
      <h2 className="text-2xl font-bold text-white mb-2">API Key Required for Video Generation</h2>
      <p className="text-slate-400 max-w-md mb-6">
        To use the Veo video generation model, you need to select an API key. This will be used for billing purposes.
      </p>
       <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:underline mb-8">
        Learn more about billing
      </a>
      <button
        onClick={onSelectKey}
        className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-purple-500"
      >
        <KeyIcon className="w-5 h-5" />
        Select API Key
      </button>
    </div>
  );
};
