# The Queen's Trial

A static FromSoftware-style birthday trial web application built with React, TypeScript, and Tailwind CSS, deployed via GitHub Pages.

## Overview

The site presents a solemn seven-question trial ordained by Queen Marika across Dark Souls, Elden Ring, The Witcher 3, and Formula 1 trivia.

- **Frontend-only**: Fully static client-side single-page application.
- **Persistent State**: Progress and death count are stored in `localStorage`.
- **Atmospheric Design**: Built with Elden Ring inspired typography, audio synthesis via Web Audio API, and custom particle aesthetics.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at the displayed local URL (typically `http://localhost:5173`).

## Building for Production

To produce the static build:
```bash
npm run build
```

The compiled static files will be placed in the `dist/` directory.

## GitHub Pages Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that automatically builds and deploys the site on pushes to the `main` branch.

### Custom Domain: `nima.ph4r5h4d.me`

A `public/CNAME` file is included with `nima.ph4r5h4d.me`.

1. **DNS Setup**:
   In your DNS provider for `ph4r5h4d.me`, add a **CNAME** record:
   - **Type**: `CNAME`
   - **Name / Host**: `nima`
   - **Value / Target**: `<your-github-username>.github.io`

2. **Enable GitHub Pages**:
   - Go to your GitHub repository: **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
   - Under **Custom domain**, verify `nima.ph4r5h4d.me` is listed and check **Enforce HTTPS** (once DNS finishes propagating).

3. **Deploy**:
   - Push to `main` (the workflow will automatically build and publish).
