# Google Sheet Visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Google Sheet's row visibility flags the source of truth for the selected portfolio sections.

**Architecture:** Keep Google Sheets fetching and row validation in `sheets.ts`. Remove homepage row caps and automatic project/case-study exclusion, render the selected Sheet-backed sections, and preserve the existing empty-section behavior.

**Tech Stack:** Next.js 15, TypeScript, Node.js built-in test runner.

**Spec:** [2026-11-22-sheet-visibility-design.md](../specs/2026-11-22-sheet-visibility-design.md)

## Global Constraints

- `visible=TRUE` includes a row; `visible=FALSE` excludes it.
- Because project/case-study duplication will no longer be filtered automatically, the user will control duplicates in the Sheet.
- Empty or invalid rows remain omitted even when visible.
- Keep the Sheet fetch and five-minute cache as-is.
- Do not change hero-stat handling.

## Review Focus

- A case study beyond the former three-item cap must still appear; test `selectCaseStudies returns all meaningful rows ordered by priority`.
- A project linked to a case study must remain eligible when its Sheet row is visible; test `selectProjects keeps projects linked to case studies`.
- `TRUE`, `FALSE`, whitespace, and blank visibility values must preserve the parser's case-insensitive behavior and blank-as-visible default; test `isVisible handles true, false, and blank values`.
- Incomplete case studies must remain omitted; retain `isMeaningfulCaseStudy requires a title and supporting detail`.
- Testimonials missing either author or quote must remain omitted; retain `filterUsableTestimonials requires both an author and a quote`.

---

### Task 1: Make Sheet visibility control homepage content

**Files:**
- Modify: `src/lib/portfolio-content.ts`
- Modify: `src/lib/sheets.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/lib/portfolio-content.test.mjs`
- Modify: `README.md`

**Interfaces:**
- `isVisible(value: string | undefined | null): boolean` remains the shared Sheet-row visibility predicate, with blank values retaining the existing visible default.
- `selectProjects(projects: readonly Project[]): Project[]` returns all named projects, including projects linked to case studies.
- `selectCaseStudies(rows: readonly CaseStudy[]): CaseStudy[]` returns every meaningful case study in `order` order.

- [ ] **Step 1: Add failing regression tests**

Add tests named `isVisible handles true, false, and blank values`,
`selectProjects keeps projects linked to case studies`, and
`selectCaseStudies returns all meaningful rows ordered by priority`.
The case-study test must include more than three meaningful rows and one
incomplete row; assert that all meaningful rows are returned in order and the
incomplete row is not.

- [ ] **Step 2: Run tests to verify the regression**

Run: `node --test src/lib/portfolio-content.test.mjs`
Expected: FAIL because the visibility and project selectors are not exported
and `selectCaseStudies` currently returns at most three rows.

- [ ] **Step 3: Implement the Sheet-driven selectors and homepage**

Move the existing `isVisible` predicate into `portfolio-content.ts` for direct
testing, import it from `sheets.ts`, and preserve its current behavior.
Implement `selectProjects` and remove the obsolete `selectTopRows` and
`excludeCaseStudyProjects` curation helpers and tests.

In `page.tsx`, use all usable parsed rows for Projects, Case Studies,
Experience, Skills, Certifications, Testimonials, and Services. Add the Posts,
Tech Stack, and Process sections when their Sheet content is available; keep
Posts when a Reddit username is configured. Do not include Education, which
was not selected. Preserve existing content-quality filters and do not
automatically remove projects linked to case studies.

- [ ] **Step 4: Update the README**

Replace the homepage curation description with the Sheet visibility behavior,
the selected sections, and the fact that the Sheet's visible column can be used
to hide duplicates.

- [ ] **Step 5: Run focused tests and application checks**

Run: `node --test src/lib/portfolio-content.test.mjs`
Expected: all tests pass, including the three new regression tests.

Run: `npm run typecheck`
Expected: exit code 0.

Run: `npm run build`
Expected: production build succeeds. This worktree lacks Google Sheet
credentials, so its build uses the existing empty-data fallback; deployment
configuration is not changed by this task.
