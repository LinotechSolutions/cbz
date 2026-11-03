# CBZ Holdings website

Monorepo for the CBZ Holdings web presence.

| Folder | What it is |
|---|---|
| `frontend/` | The public website: Astro, TypeScript, React islands, plain CSS. See `frontend/README.md` |
| `backend/` | Django REST API (not used by the current frontend build; see `frontend/HANDOFF.md`) |
| `cms/` | Strapi (not used by the current frontend build) |
| `brand-masters/` | Master logo artwork as supplied by Marketing. The site serves cropped copies from `frontend/public/brand/logos/` |

## Quick start

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

## Deploy

Vercel is configured at the root (`vercel.json`): it builds `frontend/` with Astro and serves `frontend/dist`. A Docker image is available from `frontend/Dockerfile`.

## Before launch

Read `frontend/HANDOFF.md`. It lists every value the business still has to confirm and every interface the backend has to provide, and the build regenerates its tail section on every run.
