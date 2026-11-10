# FEAT-010: Responsive Navigation

> **Status**: ✅ Implemented  
> **Source**: `src/app/page.tsx` — `<header>`

---

## Description

Sticky header with logo, navigation links, and theme toggle. Responsive: horizontal nav on desktop, Sheet drawer on mobile.

---

## Desktop Navigation (≥ md / 768px)

- Class: `hidden md:flex`
- 8 text links: HOME, WHO AM I, WORK EXPERIENCE, SKILLS, PROJECTS, CERTIFICATIONS, EDUCATION, CONTACT
- Each link: `text-muted-foreground hover:text-foreground transition-colors`
- `ThemeToggleButton` visible: `hidden md:block`

---

## Mobile Navigation (< md / 768px)

- Hamburger button uses `<Menu>` icon from lucide-react
- `Sheet` component (Radix Dialog) slides from right side
- Full-screen-width drawer (max-w-xs)
- Same 8 links, larger text
- Each link wrapped in `SheetClose` — closing automatically on tap
- `ThemeToggleButton` also visible on mobile (separate from hamburger)
- State: `isMobileMenuOpen` boolean + `closeMobileMenu()` handler

---

## Header Styling

```
sticky top-0 bg-background/95 backdrop-blur z-50 py-4 border-b border-border
```

Translucent background with blur when scrolled under content.

---

## Navigation Links

| Label | `href` |
|-------|--------|
| HOME | `#home` |
| WHO AM I | `#WHO AM I` ⚠️ spaces |
| WORK EXPERIENCE | `#work-experience` |
| SKILLS | `#skills` |
| PROJECTS | `#projects` |
| CERTIFICATIONS | `#certifications` |
| EDUCATION | `#education` |
| CONTACT | `#contact` |

---

## Related Documents

- [FEATURES.md](../FEATURES.md)
- [KNOWN_ISSUES.md](../KNOWN_ISSUES.md) — KI-003 (spaces in anchor)
- [USER_FLOWS.md](../USER_FLOWS.md)
