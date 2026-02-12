# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Fabien Tafforeau (www.fabientafforeau.fr), a French fullstack developer. The site is a single-page application written in French, built with React 19 and Vite 7, and deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build with SSR prerendering (client build → SSR build → prerender → cleanup)
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint (flat config, JS/JSX only)

## Architecture

**SSR Prerendering pipeline:** The build does not serve SSR at runtime. Instead, `scripts/prerender.js` runs after the Vite build to render the React tree into the static `dist/index.html` for SEO. The server bundle (`src/entry-server.jsx`) is built temporarily and deleted after prerendering. Client-side hydration then takes over via `src/main.jsx`.

**Single-page layout:** `App.jsx` composes section components in order: Navbar → Hero → About → Skills → Experience → Formations → Footer. Each section has an `id` used for anchor-based navigation (e.g., `#skills`). The Navbar is fixed and sections use `scroll-margin-top: 70px` to offset for it.

**Styling:** Plain CSS with no preprocessor or CSS-in-JS. Global design tokens (colors, typography, spacing, transitions, border-radii) are defined as CSS custom properties in `src/index.css` under `:root`. Each component has a co-located `.css` file. BEM-like naming convention: `component__element--modifier` (e.g., `navbar__links--open`). Shared utility classes: `.container` (max-width wrapper), `.section-title`, `.section-subtitle`.

**Assets:** Images are in `src/assets/` (imported by components, processed by Vite). Static files (favicon, CNAME, sitemap, robots.txt, og-image, manifest, CV PDF) are in `public/`.

## ESLint

Flat config in `eslint.config.js`. Key custom rule: `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. Uses Node 20. Custom domain configured via `public/CNAME`.
