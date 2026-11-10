# Product Requirements Document (Reverse-Engineered)

> **Last Verified**: 2026-11-09  
> **Basis**: Actual implementation in `src/app/page.tsx`, `docs/blueprint.md`  
> **Status**: Reflects the *as-built* product

---

## 1. Product Vision

A professional, visually polished personal portfolio website for Aasim Malik — a Google Cloud Certified Professional Cloud Architect. The site must communicate Aasim's identity, skills, experience, and achievements clearly and quickly to technical recruiters, hiring managers, and professional collaborators.

---

## 2. Product Objectives

1. **Establish professional credibility** — present Google Cloud certifications, verifiable badge links, and detailed work history
2. **Showcase technical depth** — demonstrate cloud architecture expertise through project case studies
3. **Enable direct contact** — provide multiple, frictionless contact channels
4. **Provide downloadable resume** — allow recruiters to obtain a PDF copy in one click
5. **Deliver excellent UX** — responsive design, smooth animations, dark/light theme

---

## 3. Target Users

| User | Goal |
|------|------|
| Technical Recruiter | Quickly evaluate candidate fit and download CV |
| Hiring Manager | Assess depth of cloud architecture skills |
| Engineering Client | Evaluate expertise before engagement |
| Professional Network | Stay updated on Aasim's work and certifications |

---

## 4. Functional Requirements (VERIFIED — AS-BUILT)

### FR-001: Single-Page Portfolio Layout
- The entire portfolio MUST render on a single scrollable page at route `/`
- Navigation MUST use smooth in-page anchor scrolling

### FR-002: Sticky Header Navigation
- The header MUST remain visible while scrolling
- MUST contain: Logo (AM SVG), navigation links, theme toggle button
- Desktop (≥ 768px): navigation links displayed horizontally
- Mobile (< 768px): navigation collapses to hamburger icon → Sheet drawer

### FR-003: Hero Section
- MUST display: introductory badge, name/title as H1, professional tagline, two CTA buttons, profile photo
- "Get In Touch" CTA MUST scroll to the contact section
- "Download CV" MUST trigger download of `/Aasim_Malik_Resume.pdf`
- MUST include a scrolling technology icon ticker below the main content

### FR-004: Who Am I Section
- MUST display a professional overview paragraph (left column)
- MUST display a career timeline (right column) with company, role, date, and company-specific color coding

### FR-005: Work Experience Carousel
- MUST display 5 work experience cards in a 3D carousel
- MUST support left/right navigation with arrow buttons
- Cards MUST show: title, company, date, location, and bullet-point descriptions
- Non-active cards MUST be visually de-emphasized (scale, opacity, blur)

### FR-006: Skills Section
- MUST display technical skills organized into 9 categories with icons
- Skills MUST be rendered as badge pills
- MUST include a scrolling core competencies ticker (14 items)

### FR-007: Project Showcase Carousel
- MUST display 3 projects in a 3D carousel
- Active card MUST be flippable to reveal GitHub link IF the project has one
- MUST show: title, date, description, bullet points, technology tags, and optional GitHub/live links

### FR-008: Certifications Section
- MUST display 6 certification cards in a grid (3 columns on desktop)
- Each card with an external link MUST open the verification badge page in a new tab
- External links MUST use `rel="noopener noreferrer"`

### FR-009: Education Section
- MUST display one education entry: B.E. CSE, St. Joseph's College of Engineering
- MUST show degree, institution, location, graduation date, and CGPA

### FR-010: Contact Section
- MUST display: location, email (as link), phone (as link)
- MUST provide buttons for: Email, LinkedIn, GitHub, WhatsApp, Twitter, Medium
- MUST NOT require user to fill any form for basic contact

### FR-011: Footer
- MUST display copyright notice with current year

### FR-012: Dark/Light Theme
- MUST support dark mode, light mode, and system preference
- Default MUST be system preference
- User preference MUST persist across page refreshes
- Theme MUST use a monochromatic (grayscale) palette

---

## 5. Non-Functional Requirements

| NFR | Requirement | Status |
|-----|------------|--------|
| Responsiveness | Must work on mobile, tablet, and desktop | ✅ Implemented (Tailwind responsive breakpoints) |
| Performance | Fast time-to-interactive (Next.js, Turbopack, optimized images) | ✅ Framework handles this |
| Accessibility | Semantic HTML, aria-labels on icon buttons, sr-only text | ⚠️ Partially implemented |
| SEO | Page title, meta description | ✅ Set in layout.tsx |
| HTTPS | All content served over HTTPS | ✅ Firebase App Hosting enforces this |
| Font | Inter (Google Fonts) | ✅ Via next/font/google |

---

## 6. Complete User Journeys

### Journey 1: Recruiter evaluating a candidate
1. Lands on Hero section
2. Reads tagline and intro
3. Clicks "Download CV" → PDF downloaded
4. Scrolls to Work Experience → reviews Accenture role
5. Scrolls to Skills → confirms GCP expertise
6. Scrolls to Certifications → clicks Google Cloud badge to verify
7. Scrolls to Contact → clicks LinkedIn or Send Email

### Journey 2: Technical evaluator assessing project work
1. Lands on Hero section
2. Navigates via "PROJECTS" link in header
3. Reads project cards, clicks arrow to browse all 3
4. Clicks on the RAG project card → card flips → clicks "View on GitHub"
5. Navigates to Contact section for follow-up

### Journey 3: Mobile visitor
1. Opens site on phone
2. Taps hamburger icon → Sheet menu appears
3. Taps desired section → Sheet closes, page scrolls
4. Views carousels with touch (swipe not implemented, uses arrow buttons)

---

## 7. Screens and Navigation

| Section | Anchor ID | Nav Label |
|---------|-----------|-----------|
| Hero | `#home` | HOME |
| Who Am I | `#WHO AM I` | WHO AM I |
| Work Experience | `#work-experience` | WORK EXPERIENCE |
| Skills | `#skills` | SKILLS |
| Projects | `#projects` | PROJECTS |
| Certifications | `#certifications` | CERTIFICATIONS |
| Education | `#education` | EDUCATION |
| Contact | `#contact` | CONTACT |

> ⚠️ The anchor `#WHO AM I` contains spaces, which is valid HTML but unusual. Browser URL bars will encode it as `#WHO%20AM%20I`.

---

## 8. Business Rules

| Rule | Detail |
|------|--------|
| All content is static | No CMS, no database — content updates require code changes |
| Resume must be manually updated | `public/Aasim_Malik_Resume.pdf` must be replaced for resume changes |
| External links open in new tab | All external URLs use `target="_blank"` |
| Carousel wrapping | Both carousels wrap circularly (last → first, first → last) |
| Card flip only on active cards | Inactive project cards cannot be flipped |
| Card flip only if GitHub link exists | Cards without `githubLink` do not flip and show no pointer cursor |

---

## 9. Current Limitations

1. No contact form — contact requires navigating to external channels
2. No CMS — all content updates require code edits and redeployment
3. No swipe support on carousels — mobile users must use arrow buttons
4. No analytics — no visitor tracking
5. AI layer is scaffolded but non-functional
6. No testing infrastructure
7. TypeScript errors suppressed in build

---

## 10. Planned / Possible Features (INFERRED from installed but unused dependencies)

| Feature | Evidence |
|---------|---------|
| Contact form with validation | `react-hook-form`, `zod`, `@hookform/resolvers` installed |
| Firebase backend features | `firebase`, `@tanstack-query-firebase/react` installed |
| AI-powered features | `genkit`, `@genkit-ai/googleai` configured |
| Charts / analytics display | `recharts` installed |

---

## Related Documents

- [FEATURES.md](./FEATURES.md)
- [USER_FLOWS.md](./USER_FLOWS.md)
- [BUSINESS_LOGIC.md](./BUSINESS_LOGIC.md)
- [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md)
