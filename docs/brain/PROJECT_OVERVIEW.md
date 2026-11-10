# Project Overview

> **Last Verified**: 2026-11-09  
> **Source**: `docs/blueprint.md`, `src/app/layout.tsx`, `src/app/page.tsx`, `package.json`, `studio.json`

---

## What This Project Is

**Aasim Malik Portfolio** is a personal portfolio website for Aasim Malik, a Google Cloud Certified Professional Cloud Architect currently employed at Accenture in Bengaluru, India.

The site serves as a professional digital presence, presenting Aasim's experience, skills, projects, certifications, and contact information to potential employers, clients, and professional contacts.

---

## Intended Purpose

- Present Aasim Malik's professional identity online
- Demonstrate cloud architecture expertise and technical depth
- Showcase three key engineering projects with descriptions and GitHub links
- Provide links to verifiable credential badges (Credly, Oracle)
- Offer multiple contact channels (email, LinkedIn, GitHub, WhatsApp, Twitter, Medium)
- Provide a downloadable PDF copy of the resume

---

## Primary Users

| User Type | Goal |
|-----------|------|
| Recruiters / HR | Quickly assess candidate's background and fit |
| Hiring Managers | Evaluate technical depth and project history |
| Clients / Collaborators | Understand Aasim's expertise and get in touch |
| Professional Network | Learn about certifications and written content |

---

## Main Capabilities (VERIFIED)

1. **Sticky Navigation Header** — Links to all page sections, collapses to a hamburger menu on mobile
2. **Hero Section** — Introduction text, call-to-action buttons (Get In Touch / Download CV), profile photo, and a scrolling technology icon ticker
3. **Who Am I Section** — Professional overview + condensed career timeline in two columns
4. **Work Experience Carousel** — 3D card carousel displaying detailed experience for 5 roles (2 at Accenture, 2 at Kode Kloud, 1 at Gowth Central VC)
5. **Skills Section** — Categorized technical skills grid + animated core competencies ticker
6. **Project Showcase Carousel** — 3D flippable card carousel for 3 projects; the active card flips to show a GitHub link if one exists
7. **Certifications Section** — Grid of certification cards with icons and external Credly/Oracle badge links
8. **Education Section** — Single education card for B.E. CSE from St. Joseph's College of Engineering
9. **Contact Section** — Contact info + six social/contact buttons (Email, LinkedIn, GitHub, WhatsApp, Twitter, Medium)
10. **Dark/Light Theme Toggle** — System-aware theme with manual toggle, using a monochromatic (grayscale) palette
11. **Responsive Layout** — Adapts from mobile to desktop; mobile navigation uses a slide-out Sheet component

---

## Architecture Summary

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.2.8 (App Router) |
| Runtime | React 18.3.1 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Theme | next-themes |
| Icons | lucide-react |
| AI Layer | Genkit 1.0 + Google AI (scaffolded, no active flows) |
| Hosting | Firebase App Hosting (Firebase Project: `aasim-malik-portfolio-dg25v`) |
| Package Manager | npm |

---

## Execution Lifecycle (VERIFIED)

1. User visits the deployed URL
2. Next.js serves the root layout (`src/app/layout.tsx`) which wraps children in `ThemeProvider` and `Toaster`
3. The single page (`src/app/page.tsx`) renders server-side HTML then hydrates on the client
4. On hydration, React state initializes (carousel indexes, mobile menu state, theme)
5. The `ThemeProvider` reads the user's system preference or stored preference and applies the correct CSS class to `<html>`
6. All page sections are rendered in a single scrollable page with smooth scroll anchors

---

## Current Implementation Status

| Area | Status |
|------|--------|
| Core Portfolio Page | ✅ Complete |
| Theme System | ✅ Complete |
| Responsive Navigation | ✅ Complete |
| All 8 Content Sections | ✅ Complete |
| Resume Download | ✅ Complete |
| External Links | ✅ Complete |
| AI / Genkit Integration | ⚠️ Scaffolded only (no flows implemented) |
| Backend / Database | ❌ None |
| Contact Form (server-side) | ❌ None (contact section uses direct links only) |
| Testing | ❌ No tests exist |
| CI/CD Pipeline | ❌ None configured |

---

## Firebase Project

- **Project ID**: `aasim-malik-portfolio-dg25v` (VERIFIED via `studio.json`)
- **Hosting Target**: Firebase App Hosting (not Firebase Hosting)
- **Export Date from Firebase Studio**: 2026-06-23 (VERIFIED via `README.md`)

---

## Related Documents

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [FEATURES.md](./FEATURES.md)
- [PRD.md](./PRD.md)
- [TECH_STACK.md](./TECH_STACK.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
