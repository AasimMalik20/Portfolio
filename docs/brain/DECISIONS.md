# Architectural Decision Records

> **Last Verified**: 2026-11-09

Records of significant architectural decisions — actual and inferred from the codebase.

---

## ADR-001: Single-Page Architecture

**Status**: Implemented  
**Date**: ~Jun 2026 (Firebase Studio export)  

**Decision**: Build the entire portfolio as a single scrollable page with anchor navigation rather than multi-page routing.  
**Rationale**: Personal portfolios benefit from uninterrupted scrolling UX. No data isolation requirements. Simpler routing and deployment.  
**Consequences**: All content is on one page. Fast navigation. No deep-linkable sub-pages beyond anchors.

---

## ADR-002: `'use client'` for Entire Page

**Status**: Implemented  

**Decision**: The entire `page.tsx` is a client component.  
**Rationale**: Carousel state (`useState`, `useEffect`), mobile menu state, and card flip logic all require browser-side React. Could have split page into server/client components but wasn't done.  
**Consequences**: The page hydrates fully on the client. No streaming. This is acceptable for a portfolio with no server data needs.

---

## ADR-003: shadcn/ui as UI Component System

**Status**: Implemented  

**Decision**: Use shadcn/ui (Radix UI + CVA + Tailwind) for the component library.  
**Rationale**: shadcn/ui provides accessible, unstyled, composable primitives. Components are owned in the codebase — no version lock. Pairs perfectly with Tailwind.  
**Consequences**: 31 component files in `src/components/ui/` — many unused. The component code is under full control and can be customized.

---

## ADR-004: Monochromatic Grayscale Palette (Deviation from Blueprint)

**Status**: Implemented  

**Decision**: Use a strict monochromatic (black/white/gray) palette instead of the blueprint's dark blue + teal theme.  
**Original blueprint**: Primary `#0A192F`, secondary `#CCD6F6`, accent `#64FFDA`.  
**Actual implementation**: All CSS variables in `globals.css` are grayscale (`0 0% X%`).  
**Rationale**: INFERRED — likely a design preference update made during development.  
**Consequences**: The site looks clean and minimal. The blueprint's color scheme is not reflected in the actual site.

---

## ADR-005: Hardcoded Content (No CMS)

**Status**: Implemented  

**Decision**: All portfolio content is hardcoded in `page.tsx` TypeScript arrays.  
**Rationale**: Simplest implementation for a personal portfolio. No CMS dependency. No API calls.  
**Consequences**: Content updates require code changes and redeployment. Not scalable if content updates are frequent.

---

## ADR-006: Firebase App Hosting (Not Vercel)

**Status**: Implemented  

**Decision**: Deploy to Firebase App Hosting.  
**Rationale**: Project originated in Firebase Studio. Firebase App Hosting supports Next.js natively. Firebase project (`aasim-malik-portfolio-dg25v`) already exists.  
**Consequences**: Deployment via Firebase CLI. Environment secrets managed via Secret Manager.

---

## ADR-007: next-themes for Theme Management

**Status**: Implemented  

**Decision**: Use `next-themes` instead of a manual theme implementation.  
**Rationale**: Handles localStorage persistence, SSR hydration mismatch (`suppressHydrationWarning`), system preference detection, and class-based theme switching with zero custom logic.  
**Consequences**: Adds one dependency but eliminates significant boilerplate.

---

## ADR-008: 3D CSS Carousel (Custom, Not Library)

**Status**: Implemented  

**Decision**: Implement carousels using custom CSS transforms (`translateX`, `scale`, `opacity`, `zIndex`) rather than a carousel library.  
**Rationale**: INFERRED — more control over the 3D fan/stack visual effect. Libraries like Embla or Swiper would have been alternatives.  
**Consequences**: No swipe/touch support. Custom positioning math. Flip animation handled via CSS `rotateY(180deg)`.

---

## Related Documents

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md)
- [CONFIGURATION.md](./CONFIGURATION.md)
