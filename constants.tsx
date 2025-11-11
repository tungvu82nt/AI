
import React from 'react';
import type { Style } from './types';
import { SmileyIcon, SparkleIcon, StarIcon, FilmIcon, CubeIcon, SunIcon, BrushIcon, MoonIcon, KoreaIcon, CameraIcon } from './components/icons';

export const STYLES: Style[] = [
  {
    id: 'natural',
    name: 'Natural Retouch',
    prompt: 'Perform a natural, subtle retouch on the subject. Enhance lighting and colors slightly. Keep it realistic.',
    icon: <SmileyIcon />,
  },
  {
    id: 'beauty',
    name: 'Beauty Retouch',
    prompt: 'Perform a professional beauty retouch. Smooth skin, enhance makeup, brighten eyes, and add a subtle glamorous glow.',
    icon: <SparkleIcon />,
  },
  {
    id: 'fashion',
    name: 'High-end Fashion',
    prompt: 'Transform the image into a high-end fashion photograph. Use dramatic lighting, desaturated tones, and a sharp, editorial look.',
    icon: <StarIcon />,
  },
  {
    id: 'film',
    name: 'Film / Analog',
    prompt: 'Give the image a vintage, analog film look. Add grain, slight light leaks, and color grading reminiscent of Kodak Portra or Fuji Pro film.',
    icon: <FilmIcon />,
  },
  {
    id: 'cool',
    name: 'Cool Tone',
    prompt: 'Apply a cool, blueish color grade to the image. Enhance the blues and cyans, giving it a calm, modern, or wintery feel.',
    icon: <CubeIcon />,
  },
  {
    id: 'warm',
    name: 'Warm Tone',
    prompt: 'Apply a warm, golden-hour color grade to the image. Enhance the oranges, yellows, and reds for a cozy, nostalgic feel.',
    icon: <SunIcon />,
  },
  {
    id: 'artistic',
    name: 'Artistic',
    prompt: 'Re-imagine the image in a painterly, artistic style. Use visible brush strokes and an impressionistic feel.',
    icon: <BrushIcon />,
  },
  {
    id: 'dark',
    name: 'Dark & Moody',
    prompt: 'Create a dark and moody atmosphere. Deepen the shadows, increase contrast, and use a desaturated, cinematic color palette.',
    icon: <MoonIcon />,
  },
  {
    id: 'korean',
    name: 'Korean Tone',
    prompt: 'Apply a popular Korean-style color grade. Soft, bright, with pastel tones and a clear, almost ethereal skin look.',
    icon: <KoreaIcon />,
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    prompt: 'Give the image a cinematic look. Apply a teal and orange color grade, add letterboxing, and create a dramatic, movie-like feel.',
    icon: <CameraIcon />,
  },
];
