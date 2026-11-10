# Theme Module

> **Source**: `src/components/theme-provider.tsx`, `src/components/theme-toggle-button.tsx`, `src/app/globals.css`, `src/app/layout.tsx`  
> **Last Verified**: 2026-11-09

---

## Overview

The theme system uses `next-themes` for dark/light mode switching with system preference detection. The visual palette is strictly monochromatic (grayscale).

---

## Files

| File | Role |
|------|------|
| `src/app/globals.css` | CSS custom property tokens (`:root` + `.dark`) |
| `src/components/theme-provider.tsx` | Thin `next-themes` wrapper |
| `src/components/theme-toggle-button.tsx` | Toggle button component |
| `src/app/layout.tsx` | Mounts ThemeProvider with config |

---

## Provider Configuration

```tsx
<ThemeProvider
  attribute="class"       // Adds 'dark' class to <html>
  defaultTheme="system"   // Respects OS preference
  enableSystem            // Enable system preference detection
  disableTransitionOnChange  // No flash on theme change
>
```

---

## Design Token Reference

All values from `globals.css`:

| Token | Light | Dark |
|-------|-------|------|
| `--background` | `0 0% 100%` (white) | `0 0% 0%` (black) |
| `--foreground` | `0 0% 0%` (black) | `0 0% 100%` (white) |
| `--card` | `0 0% 100%` (white) | `0 0% 10%` (dark gray) |
| `--primary` | `0 0% 0%` (black) | `0 0% 100%` (white) |
| `--secondary` | `0 0% 96.1%` | `0 0% 14.9%` |
| `--muted` | `0 0% 90%` | `0 0% 20%` |
| `--muted-foreground` | `0 0% 40%` | `0 0% 60%` |
| `--accent` | `0 0% 94%` | `0 0% 18%` |
| `--border` | `0 0% 89.8%` | `0 0% 20%` |
| `--radius` | `0.5rem` | (same) |

---

## Related Documents

- [features/FEAT-009-theme-toggle.md](../features/FEAT-009-theme-toggle.md)
- [architecture/FRONTEND.md](../architecture/FRONTEND.md)
