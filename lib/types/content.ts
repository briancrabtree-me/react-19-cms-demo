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

export type SiteConfig = {
  siteName: string;
  nav: NavItem[];
};

export type ContentBundle = {
  site: SiteConfig;
  pages: Record<string, PageDocument>;
  posts: Record<string, BlogPost>;
  postOrder: string[];
};

export const FIXED_PAGE_IDS = ['home', 'about'] as const;

export type FixedPageId = (typeof FIXED_PAGE_IDS)[number];
