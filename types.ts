
import type React from 'react';

export type Tab = 'image' | 'video';

export interface Style {
  id: string;
  name: string;
  prompt: string;
  icon: React.ReactNode;
}
