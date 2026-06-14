export type Seo = {
  title: string;
  description: string;
};

export type ProseBlock = {
  type: 'heading' | 'paragraph';
  text: string;
};

export type HeroSection = {
  type: 'hero';
  headline: string;
  subhead?: string;
};

export type ProseSection = {
  type: 'prose';
  blocks: ProseBlock[];
};

export type PageSection = HeroSection | ProseSection;

export type PageDocument = {
  id: string;
  seo: Seo;
  sections: PageSection[];
};

export type BlogPost = {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  seo: Seo;
  body: string;
};

export type NavItem = {
  label: string;
  path: string;
};

export type SiteTheme = {
  accent: string;
};

export type SiteConfig = {
  siteName: string;
  nav: NavItem[];
  theme?: SiteTheme;
};

export type ActivityEntry = {
  at: string;
  action: string;
  label: string;
};

export type ContentMeta = {
  updatedAt: string;
  revision: number;
};

export type ContentBundle = {
  site: SiteConfig;
  meta: ContentMeta;
  activity: ActivityEntry[];
  pages: Record<string, PageDocument>;
  posts: Record<string, BlogPost>;
  postOrder: string[];
};

export type HealthIssue = {
  level: 'warn' | 'ok';
  message: string;
  href?: string;
};

export type DashboardStats = {
  pages: number;
  posts: number;
  navItems: number;
  storageKb: number;
  revision: number;
  updatedAt: string;
};

export const FIXED_PAGE_IDS = ['home', 'about'] as const;
export const DEFAULT_ACCENT = '204 255 0';

export type FixedPageId = (typeof FIXED_PAGE_IDS)[number];
