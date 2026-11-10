# FEAT-005: Project Showcase Carousel

> **Status**: ✅ Implemented  
> **Source**: `src/app/page.tsx` — `<section id="projects">`, `ProjectCard` component

---

## Description

A 3D card carousel displaying 3 projects. The active (center) card can be clicked to flip and reveal a GitHub link, if one exists.

---

## Data Structure

```typescript
type Project = {
  title: string;
  date: string;
  description: string;
  points: string[];
  tags: string[];
  githubLink: string | null;
  liveLink: string | null;
};
```

**Current Projects**:
1. **Cloud-Based RAG Application with Llama Index** (Apr–May 2024) — has GitHub link
2. **Secure Cloud Data Platform** (Dec 2022–Feb 2023) — no GitHub link
3. **Multi-Region Cloud Infrastructure** (Jul–Nov 2022) — no GitHub link

---

## Carousel State

| Variable | Type | Location |
|----------|------|----------|
| `currentProjectIndex` | `number` | `Home()` component |
| `isFlipped` | `boolean` | `ProjectCard` instance (local state) |

---

## Card Flip Behavior

**Conditions for flip to activate**:
1. `isActive === true` (card is the center card)
2. `project.githubLink !== null`

**CSS implementation**:
- `.transform-style-preserve-3d` on the flip container
- `.rotate-y-180` class toggled when `isFlipped === true`
- `.backface-hidden` on both front and back faces
- `.perspective-1000` on the outer wrapper

**Front face**: Shows title, date, description, bullet points, tags, and a GitHub button in footer.
**Back face**: Shows a large "View on GitHub" button.

---

## Carousel Positioning Algorithm

Same as FEAT-003. See [BUSINESS_LOGIC.md](../BUSINESS_LOGIC.md) for full formula.

Key difference from experience carousel: Project cards render at most |offset| ≤ 2, same as experience cards.

---

## Click Event Propagation

The GitHub link button in the card footer uses `e.stopPropagation()` to prevent the click from triggering the card flip when you click the button directly (rather than clicking the card body to flip first).

---

## To Modify

### Adding a Project
```typescript
// In projects array in page.tsx:
{
  title: 'Your New Project Title',
  date: 'Month YYYY - Month YYYY',
  description: 'One sentence description.',
  points: ['Point 1', 'Point 2'],
  tags: ['Tag1', 'Tag2'],
  githubLink: 'https://github.com/...', // or null
  liveLink: 'https://...', // or null
}
```

### Changing Card Height
Find `h-[500px]` in the `ProjectCard` component — it's a fixed height. Adjust with care on mobile viewports.

---

## Known Issues

- No swipe/touch gesture support (see KI-001)
- Fixed card height may clip long content on small screens (see KI-007)

---

## Related Documents

- [FEATURES.md](../FEATURES.md)
- [STATE_MANAGEMENT.md](../STATE_MANAGEMENT.md)
- [BUSINESS_LOGIC.md](../BUSINESS_LOGIC.md)
