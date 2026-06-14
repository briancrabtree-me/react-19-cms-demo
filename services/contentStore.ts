import { defaultContent } from '../lib/seed/defaultContent';
import {
  DEFAULT_ACCENT,
  FIXED_PAGE_IDS,
  type ActivityEntry,
  type BlogPost,
  type ContentBundle,
  type DashboardStats,
  type HealthIssue,
  type PageDocument,
  type SiteConfig,
} from '../lib/types/content';

const STORAGE_KEY = 'cms-demo:v1';
const ACTIVITY_CAP = 20;

type Listener = () => void;

const listeners = new Set<Listener>();
let cache: ContentBundle | null = null;

function migrateContent(raw: ContentBundle): ContentBundle {
  const seed = defaultContent;
  return {
    ...seed,
    ...raw,
    site: {
      ...seed.site,
      ...raw.site,
      theme: raw.site?.theme ?? seed.site.theme,
    },
    meta: raw.meta ?? seed.meta,
    activity: raw.activity ?? [],
    pages: { ...seed.pages, ...raw.pages },
    posts: { ...seed.posts, ...raw.posts },
    postOrder: raw.postOrder?.length ? raw.postOrder : seed.postOrder,
  };
}

function readStorage(): ContentBundle | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return migrateContent(JSON.parse(raw) as ContentBundle);
  } catch {
    return null;
  }
}

function storageBytes(content: ContentBundle): number {
  return new Blob([JSON.stringify(content)]).size;
}

function recordActivity(content: ContentBundle, action: string, label: string): ActivityEntry[] {
  const entry: ActivityEntry = { at: new Date().toISOString(), action, label };
  return [entry, ...content.activity].slice(0, ACTIVITY_CAP);
}

function withWriteMeta(content: ContentBundle, action: string, label: string): ContentBundle {
  return {
    ...content,
    meta: {
      revision: content.meta.revision + 1,
      updatedAt: new Date().toISOString(),
    },
    activity: recordActivity(content, action, label),
  };
}

function writeStorage(content: ContentBundle, action?: string, label?: string): void {
  if (typeof localStorage === 'undefined') return;
  const next = action && label ? withWriteMeta(content, action, label) : content;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  cache = structuredClone(next);
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
  const content = structuredClone(defaultContent);
  writeStorage(content, 'reset', 'Reset to seed data');
}

export function saveSite(site: SiteConfig): void {
  const content = ensureContent();
  writeStorage({ ...content, site: structuredClone(site) }, 'save-site', 'Updated site settings');
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
  writeStorage(
    { ...content, pages: { ...content.pages, [pageId]: structuredClone(page) } },
    'save-page',
    `Saved page "${pageId}"`,
  );
}

export function listPosts(): BlogPost[] {
  const content = ensureContent();
  return content.postOrder.map((slug) => content.posts[slug]).filter(Boolean);
}

export function getRecentPosts(limit: number): BlogPost[] {
  return listPosts().slice(0, limit);
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
  writeStorage(
    {
      ...content,
      posts: { ...content.posts, [slug]: nextPost },
      postOrder,
    },
    isNew ? 'create-post' : 'save-post',
    isNew ? `Created post "${slug}"` : `Saved post "${slug}"`,
  );
}

export function deletePost(slug: string): void {
  const content = ensureContent();
  if (!content.posts[slug]) return;
  const posts = { ...content.posts };
  delete posts[slug];
  writeStorage(
    {
      ...content,
      posts,
      postOrder: content.postOrder.filter((item) => item !== slug),
    },
    'delete-post',
    `Deleted post "${slug}"`,
  );
}

export function getSite(): SiteConfig {
  return structuredClone(ensureContent().site);
}

export function getDashboardStats(): DashboardStats {
  const content = ensureContent();
  return {
    pages: FIXED_PAGE_IDS.length,
    posts: content.postOrder.length,
    navItems: content.site.nav.length,
    storageKb: Math.round(storageBytes(content) / 1024),
    revision: content.meta.revision,
    updatedAt: content.meta.updatedAt,
  };
}

export function getContentHealth(): HealthIssue[] {
  const content = ensureContent();
  const issues: HealthIssue[] = [];

  for (const id of FIXED_PAGE_IDS) {
    const page = content.pages[id];
    if (!page) continue;
    if (!page.seo.description.trim()) {
      issues.push({
        level: 'warn',
        message: `Page "${id}" is missing an SEO description`,
        href: `/admin/pages/${id}`,
      });
    }
    if (page.seo.title.length < 10) {
      issues.push({
        level: 'warn',
        message: `Page "${id}" has a short SEO title`,
        href: `/admin/pages/${id}`,
      });
    }
  }

  for (const slug of content.postOrder) {
    const post = content.posts[slug];
    if (!post) continue;
    if (!post.excerpt.trim()) {
      issues.push({
        level: 'warn',
        message: `Post "${post.title}" has no excerpt`,
        href: `/admin/blog/${slug}`,
      });
    }
    if (!post.seo.description.trim()) {
      issues.push({
        level: 'warn',
        message: `Post "${post.title}" is missing SEO description`,
        href: `/admin/blog/${slug}`,
      });
    }
  }

  if (issues.length === 0) {
    issues.push({ level: 'ok', message: 'No content issues found' });
  }

  return issues;
}

export function getAccent(): string {
  return ensureContent().site.theme?.accent ?? DEFAULT_ACCENT;
}
