# react-19-cms-demo

**Vite + React 19 CMS demo** — public site + lazy admin CRUD, localStorage persistence, vanilla CSS styled like [pure-react-19-vanilla-starter](https://github.com/briancrabtree-me/pure-react-19-vanilla-starter).

[![Live demo](https://img.shields.io/badge/demo-GitHub_Pages-ccff00?style=flat-square)](https://briancrabtree-me.github.io/react-19-cms-demo/)
[![License: MIT](https://img.shields.io/badge/License-MIT-ccff00?style=flat-square)](LICENSE)
[![Starter](https://img.shields.io/badge/react-pure_react_19_starter-ccff00?style=flat-square)](https://github.com/briancrabtree-me/pure-react-19-vanilla-starter)
[![Tokens](https://img.shields.io/badge/css-vanilla_css_tokens-ccff00?style=flat-square)](https://github.com/briancrabtree-me/vanilla-css-tokens)

**[Live demo](https://briancrabtree-me.github.io/react-19-cms-demo/)** · **[Architecture](docs/ARCHITECTURE.md)** · **[pure-react-19-vanilla-starter](https://github.com/briancrabtree-me/pure-react-19-vanilla-starter)** · **[vanilla-css-tokens](https://github.com/briancrabtree-me/vanilla-css-tokens)** · **[snippet-library](https://github.com/briancrabtree-me/snippet-library)** · **[react-pubsub-store](https://github.com/briancrabtree-me/react-pubsub-store)**

---

## What you get

- **Public site** — home, about, blog index, blog post (reads from localStorage)
- **Admin** — dashboard, pages (edit-only), blog (full CRUD), site settings
- **React 19** — `useActionState` login, lazy admin chunk, no form library
- **Vanilla CSS** — same dark brutalist tokens as the React 19 starter
- **No backend** — swap `contentStore.ts` for a real API when ready

**Admin password:** `demo`

---

## Quick start

```bash
git clone https://github.com/briancrabtree-me/react-19-cms-demo.git
cd react-19-cms-demo
npm install
npm run dev
```

```bash
npm run typecheck
npm run build
npm run preview
```

Open `/admin`, sign in with password `demo`, edit content, then view the public site.

---

## Layout

| Path | Role |
|------|------|
| `App.tsx` | Public + admin routes |
| `services/contentStore.ts` | localStorage CRUD + pub/sub |
| `pages/admin/` | Lazy-loaded admin screens |
| `components/PageRenderer.tsx` | Renders page hero + prose sections |
| `styles/index.css` | Public tokens + layout |
| `styles/admin.css` | Admin chrome (loaded on `/admin` only) |
| `.github/workflows/deploy-pages.yml` | GitHub Pages deploy |

---

## Deploy

GitHub Pages subpath build:

```bash
VITE_BASE_PATH=/react-19-cms-demo/ npm run build
```

Push to `main` — CI builds and deploys via GitHub Actions. Enable **Settings → Pages → Source: GitHub Actions** on first setup.

---

© 2026 Brian Crabtree · MIT
