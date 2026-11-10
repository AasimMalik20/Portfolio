# User Flows

> **Last Verified**: 2026-11-09  
> **Source**: `src/app/page.tsx`

---

## Flow 1: Standard Page Visit (Desktop)

```mermaid
flowchart TD
    A[User visits site URL] --> B[Page loads — lands on Hero section]
    B --> C{User goal?}
    C --> D[Download Resume]
    C --> E[Browse Experience]
    C --> F[View Projects]
    C --> G[Verify Certifications]
    C --> H[Make Contact]
    
    D --> D1[Click 'Download CV' button]
    D1 --> D2[PDF downloads: Aasim_Malik_Resume.pdf]
    
    E --> E1[Click nav link: WORK EXPERIENCE]
    E1 --> E2[Scroll to Work Experience Carousel]
    E2 --> E3[Click arrow buttons to browse 5 experience cards]
    
    F --> F1[Click nav link: PROJECTS]
    F1 --> F2[Scroll to Project Carousel]
    F2 --> F3[Click arrow buttons to browse 3 projects]
    F3 --> F4{Has GitHub link?}
    F4 -->|Yes - RAG project| F5[Click card → card flips]
    F5 --> F6[Click 'View on GitHub' → opens github.com in new tab]
    F4 -->|No link| F7[View project description only]
    
    G --> G1[Click nav link: CERTIFICATIONS]
    G1 --> G2[Scroll to Certifications grid]
    G2 --> G3[Click any certification card]
    G3 --> G4[Opens Credly or Oracle badge in new tab]
    
    H --> H1[Click nav link: CONTACT]
    H1 --> H2[Scroll to Contact section]
    H2 --> H3{Contact method?}
    H3 --> H4[Email: opens email client]
    H3 --> H5[LinkedIn: opens LinkedIn profile]
    H3 --> H6[GitHub: opens GitHub profile]
    H3 --> H7[WhatsApp: opens WhatsApp chat]
    H3 --> H8[Twitter: opens Twitter profile]
    H3 --> H9[Medium: opens Medium blog]
```

---

## Flow 2: Mobile Visit

```mermaid
flowchart TD
    A[User visits on mobile] --> B[Hero section loads — responsive layout]
    B --> C[Tap hamburger icon ☰]
    C --> D[Sheet/drawer slides from right]
    D --> E[Tap desired nav link]
    E --> F[Sheet closes automatically]
    F --> G[Page smooth-scrolls to section]
    G --> H[User reads content]
    H --> I{Carousel section?}
    I -->|Yes| J[Tap left/right arrow buttons to navigate]
    I -->|No| K[Static content — scroll to read]
```

---

## Flow 3: Theme Toggle

```mermaid
flowchart TD
    A[User opens site] --> B{System preference?}
    B -->|Dark OS| C[Site loads in dark mode]
    B -->|Light OS| D[Site loads in light mode]
    C --> E[User clicks Sun/Moon icon in header]
    D --> E
    E --> F[Theme toggles immediately]
    F --> G[Preference saved to localStorage]
    G --> H[Subsequent visits use saved preference]
```

---

## Flow 4: Career Timeline Navigation (WHO AM I)

```mermaid
flowchart TD
    A[User scrolls to or clicks 'WHO AM I'] --> B[Section visible]
    B --> C[Left column: Professional overview text]
    B --> D[Right column: 5-entry career timeline]
    D --> E[Accenture — Software Engineer — PRESENT highlighted in green]
    D --> F[Accenture — ASE — purple color]
    D --> G[Kode Kloud — Sr DevOps — sky blue]
    D --> H[Kode Kloud — DevOps — sky blue]
    D --> I[Gowth Central VC — Intern — dark/light blue]
```

---

## Key Interaction Rules

| Interaction | Behavior |
|------------|---------|
| Nav link click | Smooth scroll to section anchor |
| External link click | Opens in new tab (`target="_blank"`) |
| "Get In Touch" button | Smooth scroll to `#contact` |
| "Download CV" button | Browser downloads PDF |
| Carousel prev/next | Circular wrap — last item wraps to first |
| Project card click (active, has link) | 3D flip reveals GitHub button |
| Project card click (inactive) | No action (pointer-events: none) |
| Project card click (no github link) | No flip, no action |
| Mobile menu link tap | Menu closes, page scrolls to section |
| Technology/competency ticker hover | Animation pauses |

---

## Related Documents

- [FEATURES.md](./FEATURES.md)
- [PRD.md](./PRD.md)
- [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)
