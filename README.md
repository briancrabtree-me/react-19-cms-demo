# react-19-cms-demo

**Vite + React 19 + vanilla CSS** — public site, lazy admin CRUD, localStorage. Styled like [pure-react-19-vanilla-starter](https://github.com/briancrabtree-me/pure-react-19-vanilla-starter).

[![Live demo](https://img.shields.io/badge/demo-GitHub_Pages-ccff00?style=flat-square)](https://briancrabtree-me.github.io/react-19-cms-demo/)
[![License: MIT](https://img.shields.io/badge/License-MIT-ccff00?style=flat-square)](LICENSE)
[![Starter](https://img.shields.io/badge/react-pure_react_19_starter-ccff00?style=flat-square)](https://github.com/briancrabtree-me/pure-react-19-vanilla-starter)
[![Tokens](https://img.shields.io/badge/css-vanilla_css_tokens-ccff00?style=flat-square)](https://github.com/briancrabtree-me/vanilla-css-tokens)

**[Live demo](https://briancrabtree-me.github.io/react-19-cms-demo/)** · **[Architecture](docs/ARCHITECTURE.md)** · **[pure-react-19-vanilla-starter](https://github.com/briancrabtree-me/pure-react-19-vanilla-starter)** · **[vanilla-css-tokens](https://github.com/briancrabtree-me/vanilla-css-tokens)** · **[snippet-library](https://github.com/briancrabtree-me/snippet-library)** · **[react-pubsub-store](https://github.com/briancrabtree-me/react-pubsub-store)

---

## What you get

- Public routes — home, about, blog
- Admin — pages (edit-only), blog CRUD, site nav
- React 19 — `useActionState`, lazy `/admin` chunk
- Vanilla CSS — starter tokens, separate `admin.css`

Admin password: `demo`

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

---

## Layout

| Path | Role |
|------|------|
| `services/contentStore.ts` | localStorage + subscribe |
| `pages/admin/` | Admin screens |
| `components/PageRenderer.tsx` | Hero + prose sections |
| `styles/index.css` | Public site |
| `styles/admin.css` | Admin shell |

---

## Deploy

```bash
VITE_BASE_PATH=/react-19-cms-demo/ npm run build
```

GitHub Actions deploy on push to `main`. Pages source: **GitHub Actions**.

---

© 2026 Brian Crabtree · MIT
