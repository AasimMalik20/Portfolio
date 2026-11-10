# Business Logic

> **Last Verified**: 2026-11-09  
> **Source**: `src/app/page.tsx`

---

## Summary

This portfolio has minimal business logic — it is a display application. The logic that exists governs carousel navigation, card flip mechanics, and theme management.

---

## Carousel Navigation Logic

**Applies to**: Work Experience Carousel (FEAT-003) and Project Showcase Carousel (FEAT-005)

### Index Management

```typescript
// Next (both carousels follow this pattern)
const handleNext = () => {
  setCurrentIndex((prev) =>
    prev === items.length - 1 ? 0 : prev + 1
  );
};

// Prev
const handlePrev = () => {
  setCurrentIndex((prev) =>
    prev === 0 ? items.length - 1 : prev - 1
  );
};
```

**Rule**: Carousels wrap circularly. After the last item, next shows the first. Before the first, prev shows the last.

### Card Positioning Algorithm

For each card at `index`, given `currentIndex`:
```
offset = index - currentIndex

// Circular wrapping:
if (offset > totalItems / 2) offset -= totalItems
if (offset < -totalItems / 2) offset += totalItems

// Visual properties:
translateX = offset * 75%   // horizontal spread
scale = 1 - |offset| * 0.1  // shrinks with distance
opacity = max(0, 1 - |offset| * 0.4)  // fades with distance
zIndex = totalItems - |offset|  // center card on top

// Skip rendering:
if (|offset| > 2) → do not render (perf optimization)
```

---

## Card Flip Logic (ProjectCard only)

**Applies to**: Project Showcase Carousel (FEAT-005)

### Rules
1. Only the **active** card can flip (`isActive` prop must be `true`)
2. The card must have a `githubLink` defined
3. Flip toggles on click
4. When a card becomes inactive, flip resets to `false` automatically (via `useEffect`)

```typescript
const handleCardClick = () => {
  if (isActive && project.githubLink) {
    setIsFlipped(!isFlipped);
  }
};

useEffect(() => {
  if (!isActive) setIsFlipped(false);
}, [isActive]);
```

---

## Theme Logic

**Source**: `src/components/theme-toggle-button.tsx`, `next-themes`

```typescript
// ThemeToggleButton
const { resolvedTheme, setTheme } = useTheme();
const isDarkMode = resolvedTheme === 'dark';
const toggleTheme = () => setTheme(isDarkMode ? 'light' : 'dark');
```

**Rules**:
1. `resolvedTheme` (not `theme`) is used to correctly handle the `system` preference
2. Toggling always produces a definite `light` or `dark` value (never `system`)
3. Preference is stored in `localStorage` by next-themes

---

## Company Color Coding (WHO AM I Section)

Career timeline entries are color-coded by employer:

| Company | Color Variable | Light Mode | Dark Mode |
|---------|---------------|-----------|-----------|
| Accenture | `text-accenture-purple` | `#A100FF` | `#C77DFF` |
| Kode Kloud | `text-kodekloud-skyblue` | `#00BFFF` | `#00BFFF` |
| Gowth Central VC | `text-gowth-darkblue` | `#00008B` | `#ADD8E6` |

**"PRESENT" highlighting**: Dates containing the word "PRESENT" get `text-present-accent` (green) in addition to bold font weight.

---

## Animation Logic (Tickers)

The technology icons ticker (Hero) and core competencies ticker (Skills) use identical CSS animation logic:

**CSS animation**: `slideLeft` — translateX from `0` to `-50%` in 60s linear infinite

**Why -50%?**: The content is duplicated 4× (`[...arr, ...arr, ...arr, ...arr]` effectively). The animation slides exactly half the total width, which equals one full repetition of the content. This creates a seamless infinite loop.

**Pause on hover**: `.group:hover .animate-slideLeft > div { animation-play-state: paused; }`

---

## Navigation Anchor Links

The header navigation and mobile Sheet menu use anchor links for in-page navigation:

| Section | Anchor | Notes |
|---------|--------|-------|
| Hero | `#home` | Standard |
| Who Am I | `#WHO AM I` | ⚠️ Contains spaces |
| Work Experience | `#work-experience` | Standard |
| Skills | `#skills` | Standard |
| Projects | `#projects` | Standard |
| Certifications | `#certifications` | Standard |
| Education | `#education` | Standard |
| Contact | `#contact` | Standard |

Smooth scrolling is handled by CSS: `html { scroll-behavior: smooth; }` in `globals.css`.  
Section offset accounts for sticky header: `section { scroll-margin-top: 20px; }` (via `scroll-mt-20` Tailwind class).

---

## Related Documents

- [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)
- [features/FEAT-003-work-experience.md](./features/FEAT-003-work-experience.md)
- [features/FEAT-005-projects.md](./features/FEAT-005-projects.md)
- [USER_FLOWS.md](./USER_FLOWS.md)
