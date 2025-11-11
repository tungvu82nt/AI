import React from 'react';
import type { Tab } from '../types';
import { LoadingSpinner, PhotoIcon, VideoCameraIcon, DownloadIcon } from './icons';

interface ResultViewerProps {
  activeTab: Tab;
  originalImage: string | null;
  generatedContent: string | null;
  isLoading: boolean;
  loadingMessage: string;
}

const Placeholder: React.FC<{ type: Tab }> = ({ type }) => (
  <div className="w-full h-full bg-slate-900/50 rounded-lg flex flex-col justify-center items-center text-slate-500">
    {type === 'image' ? (
      <>
        <PhotoIcon className="w-16 h-16 mb-4" />
        <p className="text-lg font-medium">Your {type} will appear here</p>
      </>
    ) : (
      <>
        <VideoCameraIcon className="w-16 h-16 mb-4" />
        <p className="text-lg font-medium">Your {type} will appear here</p>
      </>
    )}
  </div>
);

const handleDownload = (content: string, type: Tab) => {
    const link = document.createElement('a');
    link.href = content;

    // Determine file extension
    const extension = type === 'image' 
        ? content.substring(content.indexOf('/') + 1, content.indexOf(';'))
        : 'mp4';
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `generated-${type}-${timestamp}.${extension || 'png'}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


export const ResultViewer: React.FC<ResultViewerProps> = ({
  activeTab,
  originalImage,
  generatedContent,
  isLoading,
  loadingMessage
}) => {
  const renderContent = (content: string | null, isGenerated: boolean) => {
    if (isLoading && isGenerated) {
      return (
        <div className="w-full h-full bg-slate-900/50 rounded-lg flex flex-col justify-center items-center text-slate-300 p-4">
          <LoadingSpinner className="w-12 h-12 mb-4 text-purple-400" />
          <p className="text-lg font-semibold text-center">{loadingMessage || 'Generating...'}</p>
        </div>
      );
    }

    if (!content) {
      return <Placeholder type={activeTab} />;
    }

    if (activeTab === 'image' || !isGenerated) {
      return (
        <img
          src={content}
          alt={isGenerated ? "Generated" : "Original"}
          className="w-full h-full object-contain rounded-lg"
        />
      );
    }

    if (activeTab === 'video' && isGenerated) {
        return (
            <video
                src={content}
                controls
                autoPlay
                loop
                muted
                className="w-full h-full object-contain rounded-lg"
            />
        );
    }
    
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[50vh]">
      <div className="flex flex-col gap-2">
        <h3 className="text-center font-semibold text-slate-400">Original</h3>
        <div className="aspect-square w-full bg-slate-800/50 rounded-lg p-2">
          {originalImage ? renderContent(originalImage, false) : <Placeholder type="image"/>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-center font-semibold text-slate-400">{activeTab === 'image' ? "Retouched" : "Generated"}</h3>
        <div className="aspect-square w-full bg-slate-800/50 rounded-lg p-2 relative">
          {renderContent(generatedContent, true)}
          {generatedContent && !isLoading && (
            <button
                onClick={() => handleDownload(generatedContent, activeTab)}
                className="absolute top-4 right-4 p-2 text-slate-200 bg-black/50 hover:bg-purple-600 rounded-full transition-all duration-200 backdrop-blur-sm"
                title="Download"
                aria-label="Download generated content"
            >
                <DownloadIcon className="w-5 h-5" />
            </button>
        )}
        </div>
      </div>
    </div>
  );
};