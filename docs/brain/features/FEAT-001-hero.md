# FEAT-001: Hero Section

> **Status**: ✅ Implemented  
> **Source**: `src/app/page.tsx` — `<section id="home">`

---

## Description

The landing section. First thing visitors see. Contains a personal introduction, action buttons, profile photo, and a scrolling technology ticker.

---

## Components Used

| Component | Source | Role |
|-----------|--------|------|
| `Logo` | Inline in `page.tsx` | SVG "A/M" monogram + name text |
| `Badge` | `@/components/ui/badge` | "HELLO! I AM AASIM MALIK" intro pill |
| `Button` (default) | `@/components/ui/button` | "Get In Touch" → scrolls to #contact |
| `Button` (outline) | `@/components/ui/button` | "Download CV" → PDF download |
| `Image` | `next/image` | Profile photo — `/profile.png` |
| `Card` | `@/components/ui/card` | Technology icon cards in ticker |

---

## Technology Ticker

11 items displayed in an infinite horizontally-scrolling animation:

```typescript
const technologies = [
  { name: 'GCP', icon: Cloud },
  { name: 'OCI', icon: Database },
  { name: 'Terraform', icon: Layers },
  { name: 'Docker', icon: Container },
  { name: 'Kubernetes/GKE', icon: ShipWheel },
  { name: 'Security', icon: ShieldCheck },
  { name: 'Networking', icon: Network },
  { name: 'Databases', icon: DatabaseZap },
  { name: 'Monitoring', icon: Activity },
  { name: 'Python', icon: Code },
  { name: 'Bash', icon: Terminal },
];
```

Content is duplicated 4× total inside the animation container for a seamless infinite loop.

---

## Animation Logic

CSS class `animate-slideLeft` on the inner container:
- Defined in `tailwind.config.ts` → `slideLeft` keyframe
- 60 seconds duration, linear, infinite
- Pauses on parent `.group:hover`

---

## State Used

None — purely static.

---

## Interactions

| Action | Result |
|--------|--------|
| Click "Get In Touch" | Smooth scroll to `#contact` |
| Click "Download CV" | Browser downloads `Aasim_Malik_Resume.pdf` |
| Hover over ticker | Animation pauses |

---

## To Modify

- **Update intro text**: Edit h1, badge, and paragraph in `<section id="home">` in `page.tsx`
- **Update profile photo**: Replace `public/profile.png` (384×384px recommended, PNG)
- **Add/remove technologies**: Modify `technologies` array near top of `page.tsx`
- **Update resume**: Replace `public/Aasim_Malik_Resume.pdf`

---

## Related Documents

- [FEATURES.md](../FEATURES.md)
- [features/FEAT-011-resume-download.md](./FEAT-011-resume-download.md)
- [modules/PAGE_MODULE.md](../modules/PAGE_MODULE.md)
