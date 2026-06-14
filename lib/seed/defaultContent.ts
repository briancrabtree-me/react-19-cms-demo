import type { ContentBundle } from '../types/content';

export const defaultContent: ContentBundle = {
  site: {
    siteName: 'Northline Studio',
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
        title: 'Northline Studio',
        description: 'Small product studio — design, front-end, delivery.',
      },
      sections: [
        {
          type: 'hero',
          headline: 'Ship the site, not the stack.',
          subhead: 'React front-ends, vanilla CSS, fast deploys.',
        },
        {
          type: 'prose',
          blocks: [
            {
              type: 'heading',
              text: 'Work',
            },
            {
              type: 'paragraph',
              text: 'We build marketing sites and admin tools for teams that care about load time more than slide decks.',
            },
            {
              type: 'paragraph',
              text: 'Recent stack: React 19, Vite, static hosting, edge cache when it earns its keep.',
            },
          ],
        },
      ],
    },
    about: {
      id: 'about',
      seo: {
        title: 'About — Northline Studio',
        description: 'Who we are and how we work.',
      },
      sections: [
        {
          type: 'hero',
          headline: 'About',
          subhead: 'Two people, no account managers.',
        },
        {
          type: 'prose',
          blocks: [
            {
              type: 'heading',
              text: 'Process',
            },
            {
              type: 'paragraph',
              text: 'Fixed pages, editable copy, blog when you need it. Admin stays out of the public bundle.',
            },
            {
              type: 'paragraph',
              text: 'This repo is the stripped-down version we hand clients before wiring their API.',
            },
          ],
        },
      ],
    },
  },
  posts: {
    'launch-checklist': {
      slug: 'launch-checklist',
      title: 'Launch checklist',
      publishedAt: '2026-05-28',
      excerpt: 'What we verify before DNS cutover.',
      seo: {
        title: 'Launch checklist',
        description: 'Pre-launch checks for a static React deploy.',
      },
      body: 'Cache headers, 404 shell, form endpoints, analytics deferred, admin behind auth. Run PageSpeed on the production URL twice — not localhost.',
    },
    'field-notes': {
      slug: 'field-notes',
      title: 'Field notes',
      publishedAt: '2026-06-10',
      excerpt: 'Admin edits, public reads, same store.',
      seo: {
        title: 'Field notes',
        description: 'Notes on the demo CMS wiring.',
      },
      body: 'Pages are fixed IDs. Blog posts are full CRUD. Site nav comes from config. Wire your API behind contentStore when you outgrow the browser copy.',
    },
  },
  postOrder: ['launch-checklist', 'field-notes'],
};
