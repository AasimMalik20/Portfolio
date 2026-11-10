# Navigation Components

> **Source**: `src/app/page.tsx` — header section  
> **Last Verified**: 2026-11-09

See [features/FEAT-010-navigation.md](../features/FEAT-010-navigation.md) for full feature details.

---

## Header Component (inline in page.tsx)

Sticky header at `z-50`. Two states:
- **Desktop (≥ md)**: Logo | nav links | ThemeToggleButton
- **Mobile (< md)**: Logo | ThemeToggleButton | hamburger + Sheet

---

## ThemeToggleButton (src/components/theme-toggle-button.tsx)

Renders Sun icon (visible in light mode) + Moon icon (visible in dark mode) using CSS transitions. Reads `resolvedTheme` from `useTheme()`.

---

## Logo (inline in page.tsx)

Inline `Logo` component — renders an SVG with two overlapping serif letters "A" and "M" separated by a diagonal line, followed by the text "Aasim Malik".

---

## Related Documents

- [features/FEAT-010-navigation.md](../features/FEAT-010-navigation.md)
- [features/FEAT-009-theme-toggle.md](../features/FEAT-009-theme-toggle.md)
