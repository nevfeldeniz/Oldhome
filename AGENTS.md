# AGENTS.md

## Cursor Cloud specific instructions

Single-page React 18 + Vite site for "Old Home Guest House". Static frontend only; no backend is required for local development. The Cloudflare Worker under `workers/` and the `VITE_*` env vars in `.env.example` are optional (used only for the live-publish feature) and are not needed to run or test locally.

- Dev server: `npm run dev` (Vite, serves at `http://localhost:5173/Oldhome/`). Note the non-root base path `/Oldhome/` (set in `vite.config.js`); requests to `/` will 404.
- Admin panel route: `http://localhost:5173/Oldhome/admin`. Default admin password is `oldhome2024` (configurable in the Settings panel). Auth/state is stored client-side in `localStorage` (see `src/utils/storage.js`), so admin edits persist per-browser and are not written to the repo.
- Build: `npm run build`; preview production build: `npm run preview`.
- No lint or test scripts are defined in `package.json` (no `lint`/`test` targets, no test runner configured).
