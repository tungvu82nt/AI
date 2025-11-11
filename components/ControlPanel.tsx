
import React from 'react';
import { ImageUploader } from './ImageUploader';
import { StyleSelector } from './StyleSelector';
import { PromptInput } from './PromptInput';
import { GenerateButton } from './GenerateButton';
import type { Style, Tab } from '../types';

interface ControlPanelProps {
  onImageUpload: (file: File) => void;
  styles: Style[];
  selectedStyle: string;
  onSelectStyle: (styleId: string) => void;
  customPrompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  activeTab: Tab;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onImageUpload,
  styles,
  selectedStyle,
  onSelectStyle,
  customPrompt,
  onPromptChange,
  onGenerate,
  isLoading,
  activeTab
}) => {
  return (
    <div className="bg-slate-900/70 p-6 lg:w-1/3 lg:min-w-[380px] lg:border-r border-slate-700 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-100 mb-3">1. Upload Image</h2>
        <ImageUploader onImageUpload={onImageUpload} />
      </div>
      
      {activeTab === 'image' && (
         <div>
            <h2 className="text-lg font-semibold text-slate-100 mb-3">2. Select Style</h2>
            <StyleSelector styles={styles} selectedStyle={selectedStyle} onSelectStyle={onSelectStyle} />
         </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-slate-100 mb-3">
            {activeTab === 'image' ? '3. Add Custom Prompt (Optional)' : '2. Add Prompt'}
        </h2>
        <PromptInput value={customPrompt} onChange={onPromptChange} placeholder={activeTab === 'image' ? "e.g., change outfit to a red dress" : "e.g., make the character wave"}/>
      </div>

      <div className="pt-4">
        <GenerateButton onClick={onGenerate} isLoading={isLoading} activeTab={activeTab} />
      </div>
    </div>
  );
};
