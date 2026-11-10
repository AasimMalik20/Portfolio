# Features Inventory

> **Last Verified**: 2026-11-09  
> **Source**: `src/app/page.tsx`, `src/app/layout.tsx`

Complete inventory of all features in the Aasim Malik Portfolio.

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Fully implemented and working |
| ⚠️ | Partially implemented / scaffolded |
| ❌ | Not implemented |
| 🔧 | Has known issues |

---

## Feature Index

| ID | Feature | Status | Detail |
|----|---------|--------|--------|
| [FEAT-001](#feat-001-hero-section) | Hero Section | ✅ | Profile intro, CTA buttons, photo, tech ticker |
| [FEAT-002](#feat-002-who-am-i-section) | Who Am I Section | ✅ | Professional overview + career timeline |
| [FEAT-003](#feat-003-work-experience-carousel) | Work Experience Carousel | ✅ | 5-item 3D card carousel |
| [FEAT-004](#feat-004-skills-section) | Skills Section | ✅ | Categorized skills grid + competencies ticker |
| [FEAT-005](#feat-005-project-showcase-carousel) | Project Showcase Carousel | ✅ | 3-item 3D flippable card carousel |
| [FEAT-006](#feat-006-certifications-section) | Certifications Section | ✅ | 6 certifications with external links |
| [FEAT-007](#feat-007-education-section) | Education Section | ✅ | B.E. CSE degree card |
| [FEAT-008](#feat-008-contact-section) | Contact Section | ✅ | Contact info + 6 social buttons |
| [FEAT-009](#feat-009-darklight-theme-toggle) | Dark/Light Theme Toggle | ✅ | System-aware, monochromatic palette |
| [FEAT-010](#feat-010-responsive-navigation) | Responsive Navigation | ✅ | Sticky header, hamburger menu on mobile |
| [FEAT-011](#feat-011-resume-download) | Resume Download | ✅ | PDF download button |
| [FEAT-012](#feat-012-ai-genkit-integration) | AI / Genkit Integration | ⚠️ | Scaffolded only |

---

## FEAT-001: Hero Section

**Status**: ✅ Implemented  
**Source**: `src/app/page.tsx` — `<section id="home">`

**Description**: The landing section of the portfolio. First thing visitors see.

**Components**:
- `Badge` — "HELLO! I AM AASIM MALIK" pill badge
- `Button` (primary) — "Get In Touch" CTA → scrolls to `#contact`
- `Button` (outline) — "Download CV" → downloads `/Aasim_Malik_Resume.pdf`
- `Image` (next/image) — Profile photo `/profile.png`, 384×384, circular with border
- `Logo` — Inline SVG component with "A/M" crossed serif design + name text
- Technology icon ticker — `Card` components in an infinite `slideLeft` CSS animation

**Technology Ticker Data** (11 items, duplicated 4× for seamless animation):
GCP, OCI, Terraform, Docker, Kubernetes/GKE, Security, Networking, Databases, Monitoring, Python, Bash

**Animations**: CSS `slideLeft` keyframe (60s linear infinite, pauses on hover)

**Detail Doc**: [features/FEAT-001-hero.md](./features/FEAT-001-hero.md)

---

## FEAT-002: Who Am I Section

**Status**: ✅ Implemented  
**Source**: `src/app/page.tsx` — `<section id="WHO AM I">`

**Description**: Two-column section. Left: professional summary text. Right: condensed career timeline.

**Career Timeline Data** (5 entries):
- Software Engineer @ Accenture (Sept 2025 – Present) — purple color
- Associate Software Engineer @ Accenture (Jul 2023 – Aug 2025) — purple color
- Sr Devops Engineer @ Kode Kloud Engineer (Jan 2023 – Jul 2023) — sky blue color
- Devops Engineer @ Kode Kloud Engineer (Feb 2022 – Dec 2022) — sky blue color
- SME Intern @ Gowth Central VC (July 2022) — dark blue / light blue in dark mode

**Detail Doc**: [features/FEAT-002-who-am-i.md](./features/FEAT-002-who-am-i.md)

---

## FEAT-003: Work Experience Carousel

**Status**: ✅ Implemented  
**Source**: `src/app/page.tsx` — `<section id="work-experience">`, `ExperienceCard` component

**Description**: A 3D card carousel (fan/stack effect) showing 5 detailed work experience entries. Cards stack with scale and opacity falloff. Left/right navigation arrows cycle through entries.

**Carousel Logic**:
- `currentExperienceIndex` state controls the active card
- Each card calculates `offset = index - currentExperienceIndex` for position
- `translateX`: offset × 75%, `scale`: 1 - |offset| × 0.1, `opacity`: 1 - |offset| × 0.4
- Cards with |offset| > 2 are not rendered (performance optimization)

**Data**: 5 work experience entries (see blueprint.md and page.tsx `workExperiences` array)

**Detail Doc**: [features/FEAT-003-work-experience.md](./features/FEAT-003-work-experience.md)

---

## FEAT-004: Skills Section

**Status**: ✅ Implemented  
**Source**: `src/app/page.tsx` — `<section id="skills">`

**Sub-features**:
1. **Technical Skills Grid** — 9 categories of skills displayed as badge pills inside a Card, 3-column on desktop
2. **Core Competencies Ticker** — 14 competencies in an infinite `slideLeft` animation (same as hero ticker)

**Skill Categories** (9): Cloud Platforms, Cloud Services, Infrastructure as Code, Containerization, Security & Compliance, Networking, Database Systems, Monitoring & Analytics, Scripting & Programming

**Core Competencies** (14 items): Cloud Architecture & Design, Problem Solving & Critical Thinking, Cost Optimization Strategies, Performance Tuning & Improvement, Security Implementation & Best Practices, Technical Documentation & Runbooks, Effective Communication, Team Collaboration & Knowledge Sharing, Process Automation (IaC, CI/CD), Migration Planning & Execution, High Availability & Disaster Recovery Design, System Reliability Enhancement, Client Interaction & Requirements Gathering, Agile Methodologies

**Detail Doc**: [features/FEAT-004-skills.md](./features/FEAT-004-skills.md)

---

## FEAT-005: Project Showcase Carousel

**Status**: ✅ Implemented  
**Source**: `src/app/page.tsx` — `<section id="projects">`, `ProjectCard` component

**Description**: Same 3D carousel mechanic as Work Experience, but cards are also **flippable**. The active card flips 180° on click if it has a GitHub link. The back of the card shows a "View on GitHub" button.

**Flip Logic**:
- `isFlipped` state local to each `ProjectCard` instance (via `useState`)
- Flip only activates on the active card (`isActive` prop)
- Flip resets when a card becomes inactive (`useEffect` on `isActive`)
- Cards without a `githubLink` do not flip and show no pointer cursor

**Projects** (3):
1. Cloud-Based RAG Application with Llama Index (Apr–May 2024) — has GitHub link
2. Secure Cloud Data Platform (Dec 2022–Feb 2023) — no GitHub link
3. Multi-Region Cloud Infrastructure (Jul–Nov 2022) — no GitHub link

**Detail Doc**: [features/FEAT-005-projects.md](./features/FEAT-005-projects.md)

---

## FEAT-006: Certifications Section

**Status**: ✅ Implemented  
**Source**: `src/app/page.tsx` — `<section id="certifications">`

**Description**: Grid of 6 certification cards, each linking to an external verification badge (Credly / Oracle).

**Certifications**:
1. Professional Cloud Architect — Google (Credly)
2. Associate Cloud Engineer — Google (Credly)
3. Oracle Cloud Infrastructure Generative AI Professional — Oracle
4. Oracle Cloud Infrastructure 2023 Certified Foundations Associate — Oracle
5. Cybersecurity Essentials — Cisco (Credly)
6. GitHub Copilot — GitHub (Credly)

**Detail Doc**: [features/FEAT-006-certifications.md](./features/FEAT-006-certifications.md)

---

## FEAT-007: Education Section

**Status**: ✅ Implemented  
**Source**: `src/app/page.tsx` — `<section id="education">`

**Description**: Single card showing B.E. Computer Science and Engineering from St. Joseph's College of Engineering, Chennai, Tamil Nadu. Graduated May 2023. CGPA: 9.01/10.00.

**Detail Doc**: [features/FEAT-007-education.md](./features/FEAT-007-education.md)

---

## FEAT-008: Contact Section

**Status**: ✅ Implemented  
**Source**: `src/app/page.tsx` — `<section id="contact">`

**Description**: Displays contact information and 6 social/contact channel buttons. No form or server-side processing.

**Channels**:
- Email: aasimmalik29@gmail.com (mailto link + button)
- Phone: +91 9176462019 (tel link)
- LinkedIn: linkedin.com/in/aasim-malik/
- GitHub: github.com/AasimMalik20
- WhatsApp: wa.me/919176462019
- Twitter: x.com/AasimMalik4957
- Medium: medium.com/@aasimmalik29

**Location**: Srinagar, J&K, India

**⚠️ No server-side form handling.** All contact is via direct external links.

**Detail Doc**: [features/FEAT-008-contact.md](./features/FEAT-008-contact.md)

---

## FEAT-009: Dark/Light Theme Toggle

**Status**: ✅ Implemented  
**Source**: `src/components/theme-toggle-button.tsx`, `src/components/theme-provider.tsx`, `src/app/globals.css`

**Description**: Button in the header toggles between dark and light mode. Respects system preference by default. Persists user choice.

**Implementation**: `next-themes` library with `attribute="class"`, `defaultTheme="system"`, `enableSystem`

**Palette**: Strictly monochromatic (grayscale). Light = white/black. Dark = black/white.

**Detail Doc**: [features/FEAT-009-theme-toggle.md](./features/FEAT-009-theme-toggle.md)

---

## FEAT-010: Responsive Navigation

**Status**: ✅ Implemented  
**Source**: `src/app/page.tsx` — `<header>`

**Description**: Sticky header with logo + navigation + theme toggle. On desktop (≥ md breakpoint): horizontal nav links. On mobile (< md): navigation collapses to a hamburger menu that opens a `Sheet` (slide-out drawer).

**Navigation Links** (8): HOME, WHO AM I, WORK EXPERIENCE, SKILLS, PROJECTS, CERTIFICATIONS, EDUCATION, CONTACT

**Detail Doc**: [features/FEAT-010-navigation.md](./features/FEAT-010-navigation.md)

---

## FEAT-011: Resume Download

**Status**: ✅ Implemented  
**Source**: `src/app/page.tsx` — Hero section, `public/Aasim_Malik_Resume.pdf`

**Description**: "Download CV" button in the Hero section triggers download of the PDF resume.

**Implementation**: `<Button variant="outline"> <a href="/Aasim_Malik_Resume.pdf" download="Aasim_Malik_Resume.pdf">`

**Detail Doc**: [features/FEAT-011-resume-download.md](./features/FEAT-011-resume-download.md)

---

## FEAT-012: AI / Genkit Integration

**Status**: ⚠️ Scaffolded Only  
**Source**: `src/ai/ai-instance.ts`, `src/ai/dev.ts`

**Description**: Genkit is configured with Google AI (Gemini 2.0 Flash) but no flows have been defined. The `dev.ts` entry point is empty.

**What Exists**:
- `ai-instance.ts` exports a configured `ai` object
- `GOOGLE_GENAI_API_KEY` env var is expected

**What Is Missing**:
- No AI flows (`defineFlow`)
- No prompts directory
- No integration with the portfolio page
- No AI-powered features

**To Add AI Features**: Define flows in `src/ai/`, import them in `dev.ts`, and call them from Server Actions or API routes.

**Detail Doc**: [features/FEAT-012-ai-genkit.md](./features/FEAT-012-ai-genkit.md)
