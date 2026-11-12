# InternMe — Curated Video-First Talent Marketplace (Frontend MVP Demo)

An interactive frontend demonstration of **InternMe**, connecting emerging students and junior builders with early-stage startups through 30-second video pitch reels, dual-track opportunities (**Internships** and **SignMeUp Sprints**), and privacy-by-design candidate protection.

## Getting Started Locally

Install dependencies and launch the development server:

```bash
npm install
npm run dev
```

*(On Windows PowerShell where `npm.ps1` script execution is restricted, use `npm.cmd install` and `npm.cmd run dev`.)*

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Netlify

This repository is pre-configured for Netlify via `netlify.toml` and `.nvmrc`:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Runtime plugin**: `@netlify/plugin-nextjs`
- **Node version**: `22`

Import the GitHub repository directly in Netlify ("Add new site" → "Import an existing project") and Netlify will automatically install dependencies, build Next.js App Router + dynamic OG/SSR routes, and deploy.

## Demo Architecture Notes

- **Frontend-only simulation**: All data, authentication roles, video edge-upload workflows, application submissions, favorites (`localStorage`), and Mutual Growth Compact acceptance (`sessionStorage`) run locally in browser state.
- **Simulated Cloudflare Stream & Age Gate**: `/dashboard/talent/reel` performs genuine browser-side file size (≤ 25 MB), format (MP4/MOV/WebM), and metadata duration (≤ 30s) validation, followed by a simulated 6-stage edge upload pipeline and pre-publish 18+ confirmation modal.
- **Privacy by Design**: Public routes mask candidate identities as `FirstName L.`, keep direct contact fields locked behind the Mutual Growth Compact, and block external ATS redirects during listing creation.
