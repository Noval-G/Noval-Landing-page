# Noval - Digital Portfolio

> **Ieong Hoi Long Noval**  
> *Game design, multimedia art, video production, and creative technical coordination.*

This repository contains the source code for Noval's personal portfolio website. The current build is a bilingual, single-page presentation site that turns CV content and selected work into an interactive web experience.

🌐 **Live Demo:** [https://noval-g.github.io/Noval-Landing-page/](https://noval-g.github.io/Noval-Landing-page/)

---

## About The Project

The site follows a **"Cozy Minimalist & Apple-esque"** direction, but the implementation is grounded in the current shipped experience rather than an abstract design concept. It emphasizes clarity, motion, and a premium presentation of cross-disciplinary work in game design, media production, and IT support.

### Current Features
- **Bilingual interface**: English and Traditional Chinese content can be toggled in the navbar.
- **Dual visual modes**: `studio` and `sanctuary` theme modes are available and persisted in `localStorage`.
- **Interactive hero section**: animated type treatment with a mouse-reactive parallax grid background.
- **Expandable project collection**: collection cards open into a modal with images, embedded video preview, and external project links.
- **In-browser CV preview**: a dedicated CV modal supports quick viewing and printing or saving to PDF.
- **Responsive single-page layout**: sections are arranged for both desktop and mobile usage, with further QA still recommended for future revisions.

---

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Runtime**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Mode**: static export with GitHub Pages-compatible `basePath` and `assetPrefix`
- **Compiler**: React Compiler enabled in `next.config.ts`

---

## Project Structure

- `portfolio/`: Next.js application source
- `portfolio/src/app`: app router entry, layout, and global styles
- `portfolio/src/components`: page sections and modal components
- `portfolio/src/context`: language toggle and content dictionary
- repository root: reference assets and planning documents

---

## Getting Started

To run the site locally:

1. Clone the repository.
   ```bash
   git clone https://github.com/Noval-G/Noval-Landing-page.git
   cd Noval-Landing-page/portfolio
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the development server.
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000).

To create the production build:

```bash
npm run build
```

---

## Content Notes

- Portfolio text is primarily maintained in `src/context/LanguageContext.tsx`.
- The collection currently includes game, design, and video entries.
- The video collection card still uses a placeholder thumbnail image and should be replaced when final artwork is ready.

---

## Contact

- **Email**: [sofreeai@gmail.com](mailto:sofreeai@gmail.com)
- **Phone**: +853 63939694

---

© 2026 Ieong Hoi Long Noval. All Rights Reserved.
