# FEAT-009: Dark/Light Theme Toggle

> **Status**: ✅ Implemented  
> **Source**: `src/components/theme-toggle-button.tsx`, `src/components/theme-provider.tsx`, `src/app/globals.css`, `src/app/layout.tsx`

---

## Description

System-aware theme toggle button in the header. Switches between dark and light modes. Respects OS preference on first visit. Persists user choice in localStorage.

---

## Implementation Files

| File | Role |
|------|------|
| `src/components/theme-provider.tsx` | Thin wrapper around `next-themes` `NextThemesProvider` |
| `src/components/theme-toggle-button.tsx` | Sun/Moon button, reads `resolvedTheme`, calls `setTheme` |
| `src/app/layout.tsx` | Renders `ThemeProvider` with `attribute="class"`, `defaultTheme="system"`, `enableSystem` |
| `src/app/globals.css` | `:root {}` (light) and `.dark {}` CSS variable blocks |

---

## How It Works

1. `ThemeProvider` wraps the entire app in `layout.tsx`
2. On first load, `next-themes` reads the OS color scheme preference
3. It adds the `dark` class to `<html>` if dark mode is preferred
4. CSS custom properties in `:root` and `.dark` classes provide all design tokens
5. `ThemeToggleButton` reads `resolvedTheme` (not `theme`) to correctly handle `system` preference
6. When toggled, it sets theme to the opposite definite value (`light` or `dark`)
7. The choice persists in `localStorage`

---

## Theme Palette (VERIFIED from globals.css)

**Light Mode** (`:root`): White background, black text, light gray borders, medium gray muted text  
**Dark Mode** (`.dark`): Black background, white text, dark gray borders, light gray muted text

Both modes are strictly monochromatic (grayscale only). The teal/dark-blue palette from `blueprint.md` was NOT implemented.

---

## Known Issue

`theme-toggle-button.tsx` has `// @ts-nocheck` on line 1. The TypeScript error underlying this is minor and should be fixed (see KI-002, TD-004).

---

## To Modify

### Change Default Theme
In `layout.tsx`:
```typescript
<ThemeProvider defaultTheme="dark">  // or "light"
```

### Add a Color to the Palette
In `globals.css`, add the CSS variable in both `:root {}` and `.dark {}`, then reference it in `tailwind.config.ts` colors.

---

## Related Documents

- [FEATURES.md](../FEATURES.md)
- [STATE_MANAGEMENT.md](../STATE_MANAGEMENT.md)
- [architecture/FRONTEND.md](../architecture/FRONTEND.md)
