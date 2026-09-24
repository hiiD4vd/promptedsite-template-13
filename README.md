# PromptedSite Franchise Template

Modern, high-performance coffee franchise landing page template built with Next.js 16, TypeScript, GSAP, and Tailwind CSS.

## Features

- **Interactive 3D Experience**: Seamless 3D coffee cup model with custom camera parallax and scroll-linked GSAP animations.
- **Responsive Layout**: Designed for desktop, tablet, and mobile displays with optimized WebP media.
- **High Performance**: Pre-rendered static pages with Turbopack and zero runtime hydration issues.
- **Modern Typography & Styling**: Custom font stack (`Unbounded`, `Inter Tight`, `Courier Prime`) with tailored dark-mode aesthetics.
- **Production Ready**: Fully verified and optimized build pipeline.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── public/               # Static assets (3D GLB models, video showcases, WebP images, fonts)
├── src/
│   ├── app/              # Next.js App Router (layout, page, global styles)
│   ├── components/       # UI sections (Hero, Metrics, Formats, Package, Terms, etc.)
│   ├── hooks/            # Custom GSAP and scroll animation hooks
│   └── types.ts          # TypeScript type definitions and interfaces
```

## License

MIT
