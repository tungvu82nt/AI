import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ResultViewer } from './components/ResultViewer';
import { TabSelector } from './components/TabSelector';
import { ApiKeySelector } from './components/ApiKeySelector';
import { editImage, generateVideo } from './services/geminiService';
import type { Tab, Style } from './types';
import { STYLES } from './constants';
// FIX: Import `GenerateVideoResponse` to provide the required generic type argument for `Operation`.
import type { Operation, GenerateVideoResponse } from '@google/genai';

// A global declaration for the aistudio object for TypeScript
// FIX: Moved the AIStudio interface outside of the `declare global` block. This resolves a TypeScript error
// related to multiple declarations of 'aistudio' by defining the type in the module scope before augmenting the global Window interface.
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}
declare global {
  interface Window {
    aistudio: AIStudio;
  }
}


export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('image');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalMimeType, setOriginalMimeType] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>(STYLES[1].id);
  const [customPrompt, setCustomPrompt] = useState<string>('thay trang phục bikini cho mẫu');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [apiKeySelected, setApiKeySelected] = useState<boolean>(false);
  
  const checkApiKey = useCallback(async () => {
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setApiKeySelected(hasKey);
      return hasKey;
    }
    // For local dev or if aistudio is not present, assume key is available via env
    return true; 
  }, []);

  useEffect(() => {
    if (activeTab === 'video') {
      checkApiKey();
    }
  }, [activeTab, checkApiKey]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      setGeneratedContent(null);
    };
    reader.readAsDataURL(file);
    setOriginalMimeType(file.type);
    setError(null);
  };
  
  const handleGeneration = async () => {
    setError(null);
    setIsLoading(true);

    const style = STYLES.find(s => s.id === selectedStyle);
    
    // Add a strong instruction to preserve the face and identity.
    const preservationInstruction = "It is critically important to preserve the subject's original face, facial features, and identity. Do not change the person. Only apply the following style and modifications: ";
    const userPrompt = `${style?.prompt || ''}. ${customPrompt}`.trim();
    const fullPrompt = preservationInstruction + userPrompt;

    try {
      if (activeTab === 'image') {
        if (!originalImage) {
          setError('Please upload an image first.');
          setIsLoading(false);
          return;
        }
        setLoadingMessage('Retouching your photo...');
        const base64Data = originalImage.split(',')[1];
        const result = await editImage(base64Data, originalMimeType, fullPrompt);
        setGeneratedContent(result);
      } else if (activeTab === 'video') {
         if (window.aistudio && !apiKeySelected) {
           await window.aistudio.openSelectKey();
           setApiKeySelected(true); // Assume success to avoid race condition
         }
        if (!originalImage) {
          setError('Please upload a starting image for the video.');
          setIsLoading(false);
          return;
        }
        setLoadingMessage('Generating video... This may take a few minutes.');
        const base64Data = originalImage.split(',')[1];
        // FIX: Provide `GenerateVideoResponse` as the generic type argument for `Operation` to fix the compilation error.
        const videoUrl = await generateVideo(base64Data, originalMimeType, fullPrompt, (op: Operation<GenerateVideoResponse>) => {
            const progress = (op.metadata?.progressPercent ?? 0);
            setLoadingMessage(`Generating video... ${progress}% complete. This can take a few minutes.`);
        });
        setGeneratedContent(videoUrl);
      }
    } catch (e: any) {
      const errorMessage = e.message || 'An unknown error occurred.';
      console.error(e);
      setError(errorMessage);
      if (activeTab === 'video' && errorMessage.includes('Requested entity was not found')) {
        setError("API Key not found or invalid. Please select a valid API key.");
        setApiKeySelected(false);
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const showApiKeySelector = activeTab === 'video' && !apiKeySelected && typeof window.aistudio !== 'undefined';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6 bg-slate-800/50 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          <div className="flex flex-col lg:flex-row">
            <ControlPanel
              onImageUpload={handleImageUpload}
              styles={STYLES}
              selectedStyle={selectedStyle}
              onSelectStyle={setSelectedStyle}
              customPrompt={customPrompt}
              onPromptChange={setCustomPrompt}
              onGenerate={handleGeneration}
              isLoading={isLoading}
              activeTab={activeTab}
            />
            <div className="flex-grow p-4 md:p-8 lg:w-2/3">
             {showApiKeySelector ? (
                <ApiKeySelector onSelectKey={async () => {
                    if (window.aistudio) {
                      await window.aistudio.openSelectKey();
                      setApiKeySelected(true);
                    }
                }} />
              ) : (
                <ResultViewer
                  activeTab={activeTab}
                  originalImage={originalImage}
                  generatedContent={generatedContent}
                  isLoading={isLoading}
                  loadingMessage={loadingMessage}
                />
              )}
            </div>
          </div>
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-center">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
      </main>
    </div>
  );
}