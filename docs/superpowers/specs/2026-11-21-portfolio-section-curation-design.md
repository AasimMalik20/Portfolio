# Portfolio Section Curation

**Date:** 2026-11-21  
**Status:** Approved

## Intent

Make the portfolio useful to both hiring teams and prospective clients without presenting every available Sheet tab or repeating the same information in multiple sections.

## Approaches

- **Employer-focused:** Emphasize experience, skills, certifications, and selected projects; de-emphasize services.
- **Client-focused:** Emphasize services, case studies, testimonials, and contact; keep employment history and credentials secondary.
- **Balanced (selected):** Lead with evidence of outcomes, then provide a concise view of experience, expertise, and ways to get in touch.

## Proposed design

- Add a case-studies section backed by visible, valid `CaseStudies` rows, ordered by the Sheet's `order` column and limited to the first three.
- Show up to three complementary projects, excluding projects already represented by a displayed case study.
- Keep experience, a concise skills list, and up to three certifications.
- Show testimonials only when valid visible rows exist, limited to three. The inspected generated page had no testimonial section because it had no parsed visible testimonial rows.
- Keep services only when the Sheet contains meaningful visible entries; omit the standalone stack, process, education, and social-post sections to reduce repetition.
- Keep the hero and contact sections. Preserve the existing visual style and five-minute data refresh.

## Non-goals

- Do not invent testimonial content or display empty sections.
- Do not change the Sheet schema, design theme, or deployment credentials.
- Do not add a CMS or edit Sheet data.

## Constraints and selection rules

- Use the existing server-side Sheets fetch and visibility filtering.
- Use `order` as the editorial priority for all capped lists.
- If a section has no valid visible data, omit it and its navigation link.
- Firebase App Hosting still needs the required runtime secrets configured separately.
