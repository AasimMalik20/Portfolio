# FEAT-003: Work Experience Carousel

> **Status**: ✅ Implemented  
> **Source**: `src/app/page.tsx` — `<section id="work-experience">`, `ExperienceCard`

---

## Description

A 3D fan/stack carousel displaying 5 detailed work experience cards with narrative bullet-point descriptions. Users navigate with left/right arrow buttons.

---

## Data (5 Entries — Most Recent First)

| Role | Company | Dates |
|------|---------|-------|
| Software Engineer | Accenture | Sept 2025 – Present |
| Associate Software Engineer | Accenture | Jul 2023 – Aug 2025 |
| Sr Devops Engineer | Kode Kloud Engineer | Jan 2023 – Jul 2023 |
| Devops Engineer | Kode Kloud Engineer | Feb 2022 – Dec 2022 |
| SME Intern | Gowth Central VC | July 2022 |

---

## State

| Variable | Type | Initialized |
|----------|------|------------|
| `currentExperienceIndex` | `number` | `0` (Software Engineer at Accenture) |

---

## Navigation Handlers

```typescript
handlePrevExperience() → index - 1, wraps to last
handleNextExperience() → index + 1, wraps to 0
```

---

## Card Positioning

Each card at `index` gets:
```
offset = index - currentExperienceIndex (with circular wrap)
translateX = offset * 75%
scale = 1 - |offset| * 0.1
opacity = max(0, 1 - |offset| * 0.4)
zIndex = totalItems - |offset|
```
Cards with |offset| > 2 are not rendered.

---

## ExperienceCard Component

Defined inline in `page.tsx`. Props:
```typescript
type ExperienceCardProps = {
  experience: typeof workExperiences[0];
  style: React.CSSProperties;
  isActive: boolean;
};
```

Cards are NOT flippable (unlike ProjectCard). Fixed height `h-[500px]` with internal `overflow-y-auto scrollbar-hide`.

---

## To Modify

### Add a New Experience

```typescript
// In workExperiences array, add at the TOP (most recent first):
{
  title: 'New Role Title',
  company: 'Company Name',
  date: 'Mon YYYY - Mon YYYY',
  location: 'City, Country',
  points: ['Bullet point 1', 'Bullet point 2'],
},
```

Also add a condensed entry to `coreExperiences` for the WHO AM I section.

---

## Related Documents

- [FEATURES.md](../FEATURES.md)
- [BUSINESS_LOGIC.md](../BUSINESS_LOGIC.md)
- [STATE_MANAGEMENT.md](../STATE_MANAGEMENT.md)
