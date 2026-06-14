import { useEffect } from 'react';
import { DEFAULT_ACCENT } from '../lib/types/content';
import { getAccent, subscribe } from '../services/contentStore';

function applyAccent(channels: string): void {
  document.documentElement.style.setProperty('--accent', channels);
}

export function useTheme(): void {
  useEffect(() => {
    applyAccent(getAccent());
    return subscribe(() => applyAccent(getAccent()));
  }, []);
}

export function getDefaultAccent(): string {
  return DEFAULT_ACCENT;
}
