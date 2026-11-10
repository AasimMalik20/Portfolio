# Frontend Architecture

> **Last Verified**: 2026-11-09  
> **Source**: `src/app/`, `src/components/`, `src/hooks/`, `src/lib/`

---

## Overview

The frontend is a Next.js 15 application using the App Router. The portfolio is a single Client Component page (`'use client'`) rendered entirely in the browser after initial HTML delivery.

---

## Rendering Model

| File | Type | Rendering |
|------|------|-----------|
| `src/app/layout.tsx` | Server Component | SSR — renders on server, hydrates |
| `src/app/page.tsx` | Client Component | Client — hydrates and runs in browser |
| `src/components/theme-provider.tsx` | Client Component | Client |
| `src/components/theme-toggle-button.tsx` | Client Component | Client |
| `src/components/ui/*.tsx` | Mixed (mostly Server-compatible) | Used inside Client component |

---

## Component Structure

### Layout (`src/app/layout.tsx`)

Responsibilities:
- Defines `<html lang="en" suppressHydrationWarning>` (needed for next-themes)
- Loads Inter font via `next/font/google`
- Sets `<title>` and `<meta description>` via `metadata` export
- Wraps children in `ThemeProvider` and renders `Toaster`

```
RootLayout
├── ThemeProvider (next-themes)
│   ├── {children} → page.tsx → Home()
│   └── Toaster
```

---

### Page (`src/app/page.tsx`)

The single portfolio page. Contains:
- 3 inline sub-components: `Logo`, `ProjectCard`, `ExperienceCard`
- 7 data constant arrays: `technologies`, `categorizedSkills`, `coreCompetencies`, `coreExperiences`, `workExperiences`, `projects`, `certifications`
- 3 state variables: `currentExperienceIndex`, `currentProjectIndex`, `isMobileMenuOpen`
- 3 event handlers: `handlePrev/NextExperience`, `handlePrev/NextProject`, `closeMobileMenu`
- Inline `<style jsx global>` for 3D CSS transforms
- 8 page sections + sticky header + footer

---

## Design System

### CSS Custom Properties (Design Tokens)

Defined in `src/app/globals.css`. The entire visual appearance is controlled by these variables:

```
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--border, --input, --ring, --radius
--chart-1 through --chart-5
```

All values are grayscale (`0 0% X%`). Changing these variables changes the entire site's appearance.

### Theme Classes

- Light mode: `:root {}` — white background, black text
- Dark mode: `.dark {}` — black background, white text

### Custom Utilities (Tailwind)

| Utility | Purpose |
|---------|---------|
| `.scrollbar-hide` | Hides scrollbar in cards (CSS + WebKit) |
| `.pause` | Pauses CSS animations |
| `animate-slideLeft` | 60s infinite horizontal scroll animation |

---

## Component Library (shadcn/ui)

31 components in `src/components/ui/`. Components actively used in the portfolio:

| Component | Used For |
|-----------|---------|
| `Button` | CTA buttons, nav links, carousel arrows, social buttons |
| `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription` | Experience cards, project cards, cert cards, edu card, contact card, skills card |
| `Badge` | Intro badge, skill pills, competency pills, project tags, date labels |
| `Sheet`, `SheetContent`, `SheetTrigger`, `SheetClose` | Mobile navigation drawer |
| `Separator` | (imported but not visibly used in final HTML) |
| `Toaster`, `Toast` | Toast notification system (available but unused in current page) |

---

## Responsive Breakpoints

Using Tailwind's default breakpoints:

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Default (mobile-first) | 0px+ | Single column layout |
| `sm` | 640px+ | Two-column flex in contact buttons |
| `md` | 768px+ | Two-column layouts (hero, who am i, skills), desktop nav |
| `lg` | 1024px+ | Three-column skills grid, larger hero text |

Mobile navigation: Hidden desktop nav (`hidden md:flex`), visible hamburger (`md:hidden`).

---

## Animations

| Animation | Where Used | Details |
|-----------|-----------|---------|
| `slideLeft` | Technology ticker, Core Competencies ticker | 60s linear infinite; pauses on group hover |
| `accordion-down/up` | shadcn Accordion | From tailwindcss-animate |
| `transition-transform duration-500` | Carousel cards | CSS transition on transform/opacity |
| `transition-transform duration-700 rotate-y-180` | Project card flip | 3D CSS transform |

---

## Image Optimization

Using `next/image` for the profile photo:
- `src="/profile.png"`, `width={384}`, `height={384}`
- Remote domains whitelisted: `picsum.photos`, `placehold.co` (not currently used)

---

## Font Loading

Inter font loaded via `next/font/google` in `layout.tsx`:
```typescript
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
```
Applied to body as `font-sans` via `tailwind.config.ts`.

---

## Related Documents

- [ARCHITECTURE.md](../ARCHITECTURE.md)
- [STATE_MANAGEMENT.md](../STATE_MANAGEMENT.md)
- [components/PAGE_SECTIONS.md](../components/PAGE_SECTIONS.md)
- [components/SHADCN_UI.md](../components/SHADCN_UI.md)
