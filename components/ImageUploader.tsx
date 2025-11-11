
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const uploaderClass = `flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200
    ${isDragging ? 'border-purple-500 bg-purple-500/10' : 'border-slate-600 bg-slate-800/50 hover:bg-slate-700/50'}`;

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={uploaderClass}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
        <UploadIcon className={`w-8 h-8 mb-3 transition-colors ${isDragging ? 'text-purple-400' : 'text-slate-400'}`} />
        <p className="mb-2 text-sm text-slate-400">
          <span className="font-semibold text-purple-400">Upload a file</span> or drag and drop
        </p>
        <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 10MB</p>
      </div>
      <input type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
    </label>
  );
};
