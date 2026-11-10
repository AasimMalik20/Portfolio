# Card Components

> **Source**: `src/app/page.tsx` — ProjectCard, ExperienceCard  
> **Last Verified**: 2026-11-09

---

## ProjectCard

**Type**: Flippable 3D card  
**Status**: Inline in `page.tsx`  

**Props**:
```typescript
type ProjectCardProps = {
  project: typeof projects[0];
  style: React.CSSProperties;  // transform, opacity, zIndex from carousel
  isActive: boolean;
  onClick?: () => void;
};
```

**State**: `isFlipped` (boolean, local)

**Flip behavior**: See [features/FEAT-005-projects.md](../features/FEAT-005-projects.md)

**CSS classes for 3D**:
- `.perspective-1000` on outer wrapper
- `.transform-style-preserve-3d` on the flip container
- `.backface-hidden` on front and back faces
- `.rotate-y-180` on back face (always), toggled on flip container

---

## ExperienceCard

**Type**: Static 3D-positioned card (no flip)  
**Status**: Inline in `page.tsx`  

**Props**:
```typescript
type ExperienceCardProps = {
  experience: typeof workExperiences[0];
  style: React.CSSProperties;
  isActive: boolean;
};
```

**No local state** — purely display component.

---

## Certification Cards

Not a reusable component — rendered inline in the certifications section.  
Renders either an `<a>` (with link) or `<div>` (without link) wrapping a `<Card>`.

---

## Related Documents

- [features/FEAT-003-work-experience.md](../features/FEAT-003-work-experience.md)
- [features/FEAT-005-projects.md](../features/FEAT-005-projects.md)
- [modules/UI_COMPONENTS.md](../modules/UI_COMPONENTS.md)
