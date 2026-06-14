import { useEffect, useState } from 'react';
import { getContent, subscribe } from '../services/contentStore';
import type { ContentBundle } from '../lib/types/content';

export function useContent(): ContentBundle {
  const [content, setContent] = useState(getContent);

  useEffect(() => subscribe(() => setContent(getContent())), []);

  return content;
}
