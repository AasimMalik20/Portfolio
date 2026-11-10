# FEAT-006: Certifications Section

> **Status**: ✅ Implemented  
> **Source**: `src/app/page.tsx` — `<section id="certifications">`

---

## Description

Grid of 6 certification cards. Each card shows an icon, certification name, and issuer. Cards with verification links open the badge in a new tab.

---

## Certifications Data

| # | Title | Issuer | Icon | External Link |
|---|-------|--------|------|--------------|
| 1 | Professional Cloud Architect | Google Cloud | `Cloud` | Credly ✅ |
| 2 | Associate Cloud Engineer | Google Cloud | `Cloud` | Credly ✅ |
| 3 | Oracle Cloud Infrastructure Generative AI Professional | Oracle | `Database` | Oracle Catalog ✅ |
| 4 | Oracle Cloud Infrastructure 2023 Certified Foundations Associate | Oracle (1Z0-1085-23) | `Database` | Oracle Catalog ✅ |
| 5 | Cybersecurity Essentials | Cisco | `ShieldCheck` | Credly ✅ |
| 6 | GitHub Copilot | GitHub | `Github` | Credly ✅ |

---

## Rendering Logic

- Cards without a `link` property render as `<div>`
- Cards WITH a `link` property render as `<a href={cert.link} target="_blank" rel="noopener noreferrer">`
- All 6 current certifications have links

Card hover state: `hover:bg-accent hover:text-accent-foreground`

---

## Note on `hoverImage`

The certification data has a `hoverImage` field for showing a badge image on hover. All current items have `hoverImage: null` — meaning only the icon is shown (no image). This was removed per design requirements.

---

## To Modify

```typescript
// In certifications array in page.tsx:
{
  title: 'New Certification Name',
  issuer: 'Issuing Organization',
  icon: SomeLucideIcon,  // from lucide-react
  color: 'text-foreground',
  hoverImage: null,
  link: 'https://verify-url.com', // or null if not verifiable
}
```

---

## Related Documents

- [FEATURES.md](../FEATURES.md)
- [integrations/CREDLY.md](../integrations/CREDLY.md)
