# Page Module

> **Source**: `src/app/page.tsx`  
> **Last Verified**: 2026-11-09

---

## Summary

The entire portfolio is implemented in a single file: `src/app/page.tsx`. It is a `'use client'` React component (~2000+ lines) that contains all page sections, sub-components, data, and state.

---

## Contents

### Imports (~35 lines)
- React, useState, useEffect
- shadcn/ui components: Card, Button, Badge, Sheet, Separator
- lucide-react icons (30+ icons)
- next/image
- @/lib/utils (cn)
- @/components/theme-provider, @/components/theme-toggle-button

### Inline Components (defined in file)
1. `Logo` — SVG monogram component
2. `ProjectCard` — Flippable 3D card for project showcase
3. `ExperienceCard` — Non-flippable 3D card for work history

### Data Constants
- `technologies` — 11 items
- `categorizedSkills` — 9 categories
- `coreCompetencies` — 14 items
- `coreExperiences` — 5 condensed entries
- `workExperiences` — 5 detailed entries
- `projects` — 3 items
- `certifications` — 6 items

### Main Component: `Home()`
- 3 state variables
- 1 icon mapping object (`skillIcons`)
- 5 event handlers
- Inline `<style jsx global>` block
- 1 `<header>` (sticky)
- 8 `<section>` elements
- 1 `<footer>`

---

## Technical Debt

This file is a monolith (TD-003). The recommended refactoring direction:

```
src/
├── data/
│   ├── technologies.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── projects.ts
│   └── certifications.ts
├── components/
│   ├── Logo.tsx
│   ├── ProjectCard.tsx
│   ├── ExperienceCard.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── WhoAmISection.tsx
│       ├── WorkExperienceSection.tsx
│       ├── SkillsSection.tsx
│       ├── ProjectsSection.tsx
│       ├── CertificationsSection.tsx
│       ├── EducationSection.tsx
│       └── ContactSection.tsx
└── app/
    └── page.tsx  ← much smaller, just assembles sections
```

---

## Related Documents

- [ARCHITECTURE.md](../ARCHITECTURE.md)
- [FEATURES.md](../FEATURES.md)
- [TECHNICAL_DEBT.md](../TECHNICAL_DEBT.md)
- [STATE_MANAGEMENT.md](../STATE_MANAGEMENT.md)
