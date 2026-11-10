# FEAT-002: Who Am I Section

> **Status**: ✅ Implemented  
> **Source**: `src/app/page.tsx` — `<section id="WHO AM I">`

---

## Description

Two-column section presenting Aasim's professional identity. Left column: professional summary text. Right column: condensed career timeline with company-colored role listings.

---

## Layout

```
Left Column                    Right Column
─────────────────────────      ────────────────────────────────
[PROFESSIONAL OVERVIEW badge]  ACCENTURE (purple)
"I architect scalable &         Software Engineer (SEPT 2025 - PRESENT) ← green
 secure cloud solutions"        
                                ACCENTURE (purple)
[Professional summary para]     Associate Software Engineer (JUL 2023 - AUG 2025)

                                KODE KLOUD ENGINEER (sky blue)
                                Sr Devops Engineer (JAN 2023 - JUL 2023)

                                KODE KLOUD ENGINEER (sky blue)
                                Devops Engineer (FEB 2022 - DEC 2022)

                                GOWTH CENTRAL VC (dark blue)
                                SME Intern (JULY 2022)
```

---

## Color Coding

Company colors are defined via inline CSS in `page.tsx`:

| Company | CSS Class | Color (Light) | Color (Dark) |
|---------|-----------|--------------|--------------|
| Accenture | `text-accenture-purple` | `#A100FF` | `#C77DFF` |
| Kode Kloud | `text-kodekloud-skyblue` | `#00BFFF` | `#00BFFF` |
| Gowth Central | `text-gowth-darkblue` | `#00008B` | `#ADD8E6` |

Dates containing "PRESENT" receive `text-present-accent` (green) + `font-semibold`.

---

## Known Issue

The `id="WHO AM I"` anchor contains spaces. Browsers encode as `%20` in URLs. Should be changed to `id="who-am-i"` (see KI-003).

---

## To Modify

Update the `coreExperiences` array in `page.tsx` for new job entries. The data format:

```typescript
{
  company: 'COMPANY NAME',
  role: 'Role Title',
  date: 'MON YYYY - MON YYYY',
  location: 'City, Country',
  colorClass: 'text-accenture-purple', // or custom class
}
```

---

## Related Documents

- [features/FEAT-003-work-experience.md](./FEAT-003-work-experience.md)
- [BUSINESS_LOGIC.md](../BUSINESS_LOGIC.md)
