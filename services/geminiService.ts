import { GoogleGenAI, Modality } from "@google/genai";
// FIX: Import `GenerateVideoResponse` to correctly type the video generation operation, which is a generic type.
import type { Operation, GenerateVideoResponse } from '@google/genai';


const getApiKey = () => {
    const key = process.env.API_KEY;
    if (!key) {
        throw new Error("API_KEY environment variable not set.");
    }
    return key;
};

// Use gemini-2.5-flash-image (Nano Banana) for image editing
export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64ImageData,
                        mimeType: mimeType,
                    },
                },
                {
                    text: prompt,
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
    }
    
    let errorMessage = 'No image was generated.';
    if (response.promptFeedback?.blockReason) {
        errorMessage += ` The prompt may have been blocked. Reason: ${response.promptFeedback.blockReason}`;
    }
    throw new Error(errorMessage);
};

// Use Veo for video generation
export const generateVideo = async (
    base64ImageData: string, 
    mimeType: string, 
    prompt: string, 
    // FIX: Specify `GenerateVideoResponse` as the generic type argument for `Operation` to resolve the TypeScript error.
    onProgress: (operation: Operation<GenerateVideoResponse>) => void
): Promise<string> => {
    // A new instance is created here to ensure the latest API key from the dialog is used.
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
            imageBytes: base64ImageData,
            mimeType: mimeType,
        },
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
        }
    });

    while (!operation.done) {
        onProgress(operation);
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    
    onProgress(operation);

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
        throw new Error('Video generation finished, but no download link was provided.');
    }
    
    const response = await fetch(`${downloadLink}&key=${getApiKey()}`);
    if (!response.ok) {
        throw new Error(`Failed to download the generated video. Status: ${response.statusText}`);
    }

    const videoBlob = await response.blob();
    return URL.createObjectURL(videoBlob);
};