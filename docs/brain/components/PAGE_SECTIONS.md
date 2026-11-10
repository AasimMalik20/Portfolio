# Page Section Components

> **Source**: `src/app/page.tsx`  
> **Last Verified**: 2026-11-09

All page sections are currently inline in `page.tsx`. This document maps each section, its anchor ID, background color, and key contents.

---

## Section Map

| Section | Anchor ID | Background | Key Components |
|---------|-----------|-----------|---------------|
| Hero | `#home` | `bg-background` | Badge, h1, Buttons, Image, tech ticker |
| Who Am I | `#WHO AM I` | `bg-secondary` | Two-column grid, career timeline |
| Work Experience | `#work-experience` | `bg-background` | ExperienceCard carousel |
| Skills | `#skills` | `bg-secondary` | Skills grid Card, competencies ticker |
| Projects | `#projects` | `bg-background` | ProjectCard carousel |
| Certifications | `#certifications` | `bg-secondary` | 3-col certification card grid |
| Education | `#education` | `bg-background` | Single Card |
| Contact | `#contact` | `bg-secondary` | Info text + Button row |

Sections alternate between `bg-background` and `bg-secondary` for visual separation.

---

## Inline Sub-Components

### `Logo`
SVG monogram with "A/M" crossed design + "Aasim Malik" text. Used in header.

### `ExperienceCard`
Props: `experience`, `style`, `isActive`  
Fixed height `h-[500px]`. Non-flippable. Scrollable content inside.

### `ProjectCard`  
Props: `project`, `style`, `isActive`, `onClick?`  
Fixed height `h-[500px]`. Flippable on active card with github link.  
Has `isFlipped` local state with `useEffect` reset on inactive.

---

## Recommended Extraction (Future)

Extract to:
- `src/components/Logo.tsx`
- `src/components/ExperienceCard.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/sections/HeroSection.tsx`
- etc.

---

## Related Documents

- [modules/PAGE_MODULE.md](../modules/PAGE_MODULE.md)
- [FEATURES.md](../FEATURES.md)
- [TECHNICAL_DEBT.md](../TECHNICAL_DEBT.md)
