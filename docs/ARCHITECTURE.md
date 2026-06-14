# Architecture

Public site + admin, same pattern as the private CMS engine — minus the server.

## Storage

One JSON blob in `localStorage` (`cms-demo:v1`). `contentStore.ts` reads/writes it and pings subscribers. Seed JSON lives in `lib/seed/defaultContent.ts`.

Fixed pages: `home`, `about`. Blog is full CRUD. Site config drives nav labels and paths.

## Routes

Public: `/`, `/about`, `/blog`, `/blog/:slug`.

Admin (lazy): dashboard, pages, blog, site. Password gate in `sessionStorage` — demo only.

## Bundling

`core-ui` — react, react-dom, react-router-dom.

`admin-ui` — everything under `pages/admin` and `components/admin`. Loaded when you hit `/admin`.

`BrowserRouter` basename comes from `import.meta.env.BASE_URL` for GitHub Pages subpath deploys.

## React 19 in the demo

- `useActionState` — admin login
- Lazy admin route tree
- `useContent` — `subscribe` + `useState`, no external store package

Replace `contentStore.ts` with fetch when you wire a backend. Keep the function names; admin pages won't care.

## Env

| Variable | Purpose |
|----------|---------|
| `VITE_BASE_PATH` | Vite `base` (e.g. `/react-19-cms-demo/`) |
