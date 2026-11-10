# Technical Debt

> **Last Verified**: 2026-11-09  
> **Source**: `next.config.ts`, `src/app/page.tsx`, `src/components/theme-toggle-button.tsx`

---

## Summary

The project is a functional portfolio with relatively low technical debt for its current scope. The main issues are build configuration shortcuts, oversized component files, unused dependencies, and missing test infrastructure.

---

## Debt Items

### TD-001: TypeScript Build Errors Suppressed

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **File** | `next.config.ts` |
| **Code** | `typescript: { ignoreBuildErrors: true }` |
| **Impact** | Type errors can ship to production undetected. Related to `// @ts-nocheck` in `theme-toggle-button.tsx`. |
| **Fix** | Remove `ignoreBuildErrors: true`; fix all TypeScript errors; remove `// @ts-nocheck` |

---

### TD-002: ESLint Suppressed During Builds

| Field | Detail |
|-------|--------|
| **Severity** | Medium |
| **File** | `next.config.ts` |
| **Code** | `eslint: { ignoreDuringBuilds: true }` |
| **Impact** | Code quality issues skip automated checking |
| **Fix** | Remove `ignoreDuringBuilds: true`; fix all linting violations |

---

### TD-003: Monolithic `page.tsx` (2000+ lines)

| Field | Detail |
|-------|--------|
| **Severity** | Medium |
| **File** | `src/app/page.tsx` |
| **Description** | The entire portfolio is a single `'use client'` component file containing all data arrays, helper types, sub-components (`ProjectCard`, `ExperienceCard`, `Logo`), inline CSS, and all 8 page sections. |
| **Impact** | Hard to maintain, hard to test individual sections, slow to navigate, impedes collaboration |
| **Fix** | Extract: data arrays → `src/data/`, section components → `src/components/sections/`, sub-components → individual files in `src/components/` |

---

### TD-004: All Content Hardcoded in Source Code

| Field | Detail |
|-------|--------|
| **Severity** | Medium |
| **Description** | All content (work experiences, projects, skills, certifications) is hardcoded in TypeScript arrays in `page.tsx`. |
| **Impact** | Every content change requires a code edit and redeployment. Not maintainable long-term. |
| **Fix** | Move content to a data layer: either JSON files in `src/data/`, a headless CMS, or Firestore (which is already installed) |

---

### TD-005: Unused Production Dependencies

| Field | Detail |
|-------|--------|
| **Severity** | Low-Medium |
| **Packages** | `firebase`, `@tanstack/react-query`, `@tanstack-query-firebase/react`, `recharts`, `date-fns`, `react-day-picker`, `react-hook-form`, `@hookform/resolvers`, `zod`, `patch-package` |
| **Impact** | Increases bundle size (though Next.js tree-shaking mitigates some impact), increases attack surface through unused dependencies, inflates `node_modules` |
| **Fix** | Remove unused dependencies OR implement the features that require them |

---

### TD-006: `unknown_file.txt` at Root

| Field | Detail |
|-------|--------|
| **Severity** | Low |
| **File** | `unknown_file.txt` |
| **Content** | `-4 w-4" />` (stray JSX fragment) |
| **Fix** | Delete the file |

---

### TD-007: No Tests

| Field | Detail |
|-------|--------|
| **Severity** | Medium |
| **Description** | Zero test files exist. No test framework is configured. |
| **Impact** | Regressions are undetected. Carousel logic, flip state, and theme switching are all untested. |
| **Fix** | Add Vitest or Jest + React Testing Library. Write unit tests for carousel handlers and flip logic. |

---

### TD-008: Anchor ID with Spaces (`#WHO AM I`)

| Field | Detail |
|-------|--------|
| **Severity** | Low |
| **File** | `src/app/page.tsx` |
| **Code** | `<section id="WHO AM I">` and `href="#WHO AM I"` |
| **Impact** | Technically valid but unusual. Browsers encode spaces as `%20`. Deep linking to this section produces an unusual URL. |
| **Fix** | Change to `id="who-am-i"` and update all `href` references |

---

### TD-009: `logo-am.jpg` in Both `/app` and `/public`

| Field | Detail |
|-------|--------|
| **Severity** | Low |
| **Files** | `src/app/logo-am.jpg` and `public/logo-am.png` |
| **Description** | Two versions of the logo exist in different formats (jpg vs png) in different directories. `src/app/logo-am.jpg` is not referenced anywhere in the code. |
| **Fix** | Remove `src/app/logo-am.jpg` (unused). Ensure `public/logo-am.png` is the canonical logo. |

---

### TD-010: `pglite-debug.log` at Root

| Field | Detail |
|-------|--------|
| **Severity** | Low |
| **File** | `pglite-debug.log` |
| **Description** | Empty debug log file from Firebase Studio scaffold. Not needed in production. |
| **Fix** | Delete or add to `.gitignore` |

---

### TD-011: Inline `<style jsx global>` in page.tsx

| Field | Detail |
|-------|--------|
| **Severity** | Low |
| **File** | `src/app/page.tsx` |
| **Description** | 3D card transform CSS (perspective, backface-visibility, rotateY) and animation styles are defined via inline `<style jsx global>`. This works but is less maintainable than Tailwind utilities or global CSS. |
| **Fix** | Move to `globals.css` or add custom Tailwind utilities in `tailwind.config.ts` |

---

## Debt Priority Matrix

| ID | Severity | Effort | Priority |
|----|---------|--------|----------|
| TD-001 | High | Low | Fix first |
| TD-003 | Medium | High | Planned refactor |
| TD-004 | Medium | High | Planned when adding CMS |
| TD-002 | Medium | Low | Fix early |
| TD-007 | Medium | Medium | Add when feasible |
| TD-005 | Low-Medium | Low | Clean up |
| TD-008 | Low | Low | Fix quickly |
| TD-009 | Low | Low | Quick cleanup |
| TD-010 | Low | Low | Quick cleanup |
| TD-006 | Low | Low | Delete the file |
| TD-011 | Low | Medium | Refactor when convenient |

---

## Related Documents

- [KNOWN_ISSUES.md](./KNOWN_ISSUES.md)
- [SECURITY.md](./SECURITY.md)
- [TESTING.md](./TESTING.md)
- [rules/CODING_RULES.md](./rules/CODING_RULES.md)
