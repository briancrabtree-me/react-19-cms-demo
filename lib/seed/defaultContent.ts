import type { ContentBundle } from '../types/content';

export const defaultContent: ContentBundle = {
  site: {
    siteName: 'React 19 CMS Demo',
    nav: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Blog', path: '/blog' },
    ],
  },
  pages: {
    home: {
      id: 'home',
      seo: {
        title: 'React 19 CMS Demo',
        description: 'Public site + admin CRUD with localStorage persistence.',
      },
      sections: [
        {
          type: 'hero',
          headline: 'Build fast. Edit in admin.',
          subhead: 'A minimal CMS demo styled like pure-react-19-vanilla-starter.',
        },
        {
          type: 'prose',
          blocks: [
            {
              type: 'heading',
              text: 'What this is',
            },
            {
              type: 'paragraph',
              text: 'This demo pairs a public marketing site with a lazy-loaded admin panel. All content lives in localStorage — no backend required.',
            },
            {
              type: 'paragraph',
              text: 'Sign in at /admin with password demo. Edit pages, manage blog posts, and update site navigation.',
            },
          ],
        },
      ],
    },
    about: {
      id: 'about',
      seo: {
        title: 'About — React 19 CMS Demo',
        description: 'Architecture notes for the localStorage CMS demo.',
      },
      sections: [
        {
          type: 'hero',
          headline: 'About this demo',
          subhead: 'React 19, vanilla CSS, react-router v7.',
        },
        {
          type: 'prose',
          blocks: [
            {
              type: 'heading',
              text: 'Stack',
            },
            {
              type: 'paragraph',
              text: 'Vite 5, React 19.2, TypeScript, and vanilla CSS custom properties. Admin routes code-split into a separate chunk.',
            },
            {
              type: 'paragraph',
              text: 'Swap contentStore.ts for a real API when you outgrow the browser-only demo.',
            },
          ],
        },
      ],
    },
  },
  posts: {
    'welcome-to-the-demo': {
      slug: 'welcome-to-the-demo',
      title: 'Welcome to the demo',
      publishedAt: '2026-06-01',
      excerpt: 'Seed post — edit or delete from admin.',
      seo: {
        title: 'Welcome to the demo',
        description: 'First seed blog post for the React 19 CMS demo.',
      },
      body: 'This post ships with the demo. Open admin, edit the body, or create new posts. Changes persist in localStorage until you reset demo data.',
    },
    'localstorage-as-database': {
      slug: 'localstorage-as-database',
      title: 'localStorage as your database',
      publishedAt: '2026-06-10',
      excerpt: 'How the content store works in the browser.',
      seo: {
        title: 'localStorage as your database',
        description: 'Content persistence for the GitHub Pages CMS demo.',
      },
      body: 'The content store writes a single JSON blob to localStorage under cms-demo:v1. Public pages and admin share the same store with a lightweight pub/sub for React updates.',
    },
  },
  postOrder: ['welcome-to-the-demo', 'localstorage-as-database'],
};
