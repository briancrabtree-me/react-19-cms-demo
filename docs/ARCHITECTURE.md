# Architecture

## Overview

Single-page app with two surfaces:

1. **Public routes** — marketing pages and blog, rendered from `contentStore`
2. **Admin routes** — lazy-loaded CRUD UI at `/admin/*`

Both read and write the same `localStorage` blob (`cms-demo:v1`). A lightweight pub/sub notifies React components when content changes.

## Data model

```typescript
ContentBundle = {
  site: { siteName, nav[] }
  pages: { home, about }   // fixed IDs, edit-only
  posts: { [slug]: BlogPost }
  postOrder: string[]
}
```

See `lib/types/content.ts` and seed data in `lib/seed/defaultContent.ts`.

## Store API

| Function | Purpose |
|----------|---------|
| `getContent()` | Snapshot of full bundle |
| `subscribe(fn)` | Re-render hook for React |
| `saveSite(config)` | Update site name + nav |
| `getPage(id)` / `savePage(id, page)` | Page edit |
| `listPosts()` / `getPost(slug)` | Blog read |
| `savePost(post)` / `deletePost(slug)` | Blog CRUD |
| `resetToSeed()` | Restore demo defaults |

## Routes

| Path | Component |
|------|-----------|
| `/` | Home (page `home`) |
| `/about` | About (page `about`) |
| `/blog` | Blog index |
| `/blog/:slug` | Blog post |
| `/admin` | Dashboard |
| `/admin/pages/:pageId` | Page editor |
| `/admin/blog`, `/admin/blog/new`, `/admin/blog/:slug` | Blog admin |
| `/admin/site` | Site settings |

## Auth

Demo gate only — password `demo` stored in `sessionStorage` (`cms-demo-auth`). Not production auth.

## Swapping localStorage for an API

Replace functions in `services/contentStore.ts` with `fetch` calls. Keep the same function signatures so admin pages stay unchanged. Use `subscribe` to poll or wire WebSocket/SSE updates.

## Build

- Vite 5 + React 19
- `core-ui` chunk: react, react-dom, react-router-dom
- `admin-ui` chunk: admin pages + components
- `VITE_BASE_PATH` required for GitHub Pages subpath deploy
