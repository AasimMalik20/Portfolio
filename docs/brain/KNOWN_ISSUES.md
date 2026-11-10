# Known Issues

> **Last Verified**: 2026-11-09

---

## KI-001: No Swipe/Touch Support for Carousels

**Severity**: Medium (UX)  
**Affected Feature**: FEAT-003, FEAT-005  
**Description**: The work experience and project carousels only support navigation via the left/right arrow buttons. Mobile users must tap the arrows — there's no swipe gesture support.  
**Impact**: Suboptimal mobile UX.  
**Fix**: Add touch event handlers (`onTouchStart`, `onTouchEnd`) or use a library like `react-swipeable`.

---

## KI-002: TypeScript `// @ts-nocheck` in Theme Toggle

**Severity**: Low  
**Affected File**: `src/components/theme-toggle-button.tsx`  
**Description**: The file has `// @ts-nocheck` on line 1 with a TODO comment to fix TS errors. The underlying TS issue is likely a minor types/import incompatibility with the `next-themes` package.  
**Fix**: Remove the directive and fix the specific type error.

---

## KI-003: Anchor ID Contains Spaces

**Severity**: Low  
**Affected File**: `src/app/page.tsx`  
**Description**: `<section id="WHO AM I">` uses spaces, which browsers encode as `%20` in URLs. The nav links and Sheet menu links use the same `href="#WHO AM I"` which works in browsers but is unconventional.  
**Fix**: Rename to `id="who-am-i"` and update all four references in nav (desktop + mobile).

---

## KI-004: Genkit AI Layer Non-Functional

**Severity**: Low (for current scope)  
**Affected Feature**: FEAT-012  
**Description**: `src/ai/dev.ts` is empty. No Genkit flows are defined. The AI layer is entirely scaffolded with no actual functionality.  
**Status**: Expected — this is a future capability, not a bug.

---

## KI-005: Stray Files at Root

**Severity**: Low  
**Affected Files**: `unknown_file.txt`, `pglite-debug.log`  
**Description**: Two artifact files from Firebase Studio scaffolding remain at the repository root. Neither is harmful.  
**Fix**: Delete both files. Add `*.log` to `.gitignore`.

---

## KI-006: `.env` Not Explicitly in `.gitignore`

**Severity**: Medium (potential)  
**Affected Files**: `.gitignore`, `.env`  
**Description**: The `.gitignore` file does not explicitly list `.env` or `.env*`. While many tools treat this as a common default, it is not guaranteed.  
**Verification**: Run `git check-ignore -v .env` to confirm it is ignored. If not, add `.env*` to `.gitignore` immediately.

---

## KI-007: Card Height Fixed at 500px

**Severity**: Low (UX)  
**Affected Feature**: FEAT-003, FEAT-005  
**Description**: Both `ExperienceCard` and `ProjectCard` use a fixed height of `h-[500px]`. On very small screens or with very long content, text may be cut off. The components use `overflow-y-auto` internally, but the fixed height may feel cramped on some mobile viewports.  
**Fix**: Consider `min-h-[500px]` with `max-h-[...vh]` instead, or adjust per breakpoint.

---

## Related Documents

- [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md)
- [SECURITY.md](./SECURITY.md)
- [FEATURES.md](./FEATURES.md)
