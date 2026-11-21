# Portfolio Section Curation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a concise, balanced portfolio centered on case studies, complementary projects, experience, credible testimonials, core skills, services, and contact.

**Architecture:** Keep Google Sheets fetching and row visibility filtering on the server. Add a case-studies presentation component and curate the server page's existing section slots from data already sorted by `order`; the client shell will keep deriving navigation from those slots.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, Zod, existing section components.

**Spec:** `docs/superpowers/specs/2026-11-21-portfolio-section-curation-design.md`

## Global Constraints

- Sheets access remains server-only and read-only.
- Rows marked `visible=FALSE` remain excluded; blank visibility continues to mean visible.
- Use ascending `order` as editorial priority.
- Empty or invalid content must not create an empty section or navigation link.
- Keep the page's existing visual style and five-minute cache/revalidation behavior.
- Do not invent testimonial content or change Firebase credentials.

## Review Focus

- No usable case studies: omit both the case-studies section and its navigation link; keep complementary projects.
- Projects linked to displayed case studies: don't repeat those projects in the project cards.
- Blank/invalid testimonials: omit them and hide the section when no usable testimonials remain.
- More rows than the selected caps: show only the highest-priority rows by `order`.
- Missing/blank services or contact values: omit empty cards, sections, and navigation links.

---

### Task 1: Add a Case Studies Section

**Files:**
- Create: `src/components/sections/CaseStudiesSection.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `CaseStudy[]` from `src/lib/sheets.ts`
- Produces: a server-renderable section with `id="case-studies"` and no output for an empty list

- [x] **Step 1: Add `CaseStudiesSection`**

  Accept `caseStudies: CaseStudy[]`. Render title, client, summary, optional problem/solution/result, tags, and an external link when provided. Return `null` for an empty list.

- [x] **Step 2: Integrate case studies and avoid duplicates**

  In the page assembler, select at most three case studies in existing `order`. Build the set of displayed slugs and exclude matching `Project.case_study_slug` values from complementary projects.

- [x] **Step 3: Verify component and page types**

  Run `npm run typecheck`.
  Expected: PASS; case-study props and project filtering are type-safe.

### Task 2: Curate the Homepage Sections

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/lib/sheets.ts`

**Interfaces:**
- Consumes: the existing `AllSheetData` and `HomeSection` interfaces
- Produces: ordered section slots used by both homepage rendering and navigation

- [x] **Step 1: Filter unusable testimonials**

  In `parseTestimonials`, retain only visible rows with a non-empty `author` and `quote`, then sort by `order`. This prevents blank rows from producing a testimonial section.

- [x] **Step 2: Apply the approved content caps**

  Keep the hero and contact; show up to three case studies, up to three non-duplicate projects, up to four experience entries, up to eight named skills, up to three certifications, up to three meaningful services, and up to three usable testimonials. Use the existing `order` priority.

- [x] **Step 3: Remove lower-priority standalone sections**

  Do not add Education, Stack, Process, or Posts to the homepage section slots. Keep sections and navigation links absent when their selected data is empty.

- [x] **Step 4: Validate the rendered page**

  Run `npm run typecheck` and `npm run build`.
  Inspect `.next/server/app/index.html` with a bounded assertion: case studies and any populated high-priority sections are present; omitted sections are absent; project slugs represented by displayed case studies do not appear again as project cards.

