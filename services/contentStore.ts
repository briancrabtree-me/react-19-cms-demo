import { defaultContent } from '../lib/seed/defaultContent';
import {
  FIXED_PAGE_IDS,
  type BlogPost,
  type ContentBundle,
  type PageDocument,
  type SiteConfig,
} from '../lib/types/content';

const STORAGE_KEY = 'cms-demo:v1';

type Listener = () => void;

const listeners = new Set<Listener>();
let cache: ContentBundle | null = null;

function readStorage(): ContentBundle | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ContentBundle;
  } catch {
    return null;
  }
}

function writeStorage(content: ContentBundle): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  cache = structuredClone(content);
  listeners.forEach((listener) => listener());
}

function ensureContent(): ContentBundle {
  if (cache) return cache;
  const stored = readStorage();
  if (stored) {
    cache = stored;
    return stored;
  }
  const seed = structuredClone(defaultContent);
  writeStorage(seed);
  return seed;
}

export function getContent(): ContentBundle {
  return structuredClone(ensureContent());
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function resetToSeed(): void {
  writeStorage(structuredClone(defaultContent));
}

export function saveSite(site: SiteConfig): void {
  const content = ensureContent();
  writeStorage({ ...content, site: structuredClone(site) });
}

export function listPages(): PageDocument[] {
  const content = ensureContent();
  return FIXED_PAGE_IDS.map((id) => content.pages[id]).filter(Boolean);
}

export function getPage(pageId: string): PageDocument | null {
  const content = ensureContent();
  const page = content.pages[pageId];
  return page ? structuredClone(page) : null;
}

export function savePage(pageId: string, page: PageDocument): void {
  const content = ensureContent();
  if (!FIXED_PAGE_IDS.includes(pageId as (typeof FIXED_PAGE_IDS)[number])) {
    throw new Error(`Page "${pageId}" is not editable.`);
  }
  writeStorage({
    ...content,
    pages: { ...content.pages, [pageId]: structuredClone(page) },
  });
}

export function listPosts(): BlogPost[] {
  const content = ensureContent();
  return content.postOrder.map((slug) => content.posts[slug]).filter(Boolean);
}

export function getPost(slug: string): BlogPost | null {
  const content = ensureContent();
  const post = content.posts[slug];
  return post ? structuredClone(post) : null;
}

export function savePost(post: BlogPost): void {
  const content = ensureContent();
  const slug = post.slug.trim();
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error('Slug must be lowercase letters, numbers, and hyphens.');
  }
  const nextPost = { ...post, slug };
  const isNew = !content.posts[slug];
  const postOrder = isNew ? [slug, ...content.postOrder] : content.postOrder;
  writeStorage({
    ...content,
    posts: { ...content.posts, [slug]: nextPost },
    postOrder,
  });
}

export function deletePost(slug: string): void {
  const content = ensureContent();
  if (!content.posts[slug]) return;
  const posts = { ...content.posts };
  delete posts[slug];
  writeStorage({
    ...content,
    posts,
    postOrder: content.postOrder.filter((item) => item !== slug),
  });
}

export function getSite(): SiteConfig {
  return structuredClone(ensureContent().site);
}
