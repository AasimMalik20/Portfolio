# Google Sheet Visibility Design

## Intent

Let the Google Sheet decide which portfolio entries appear. The user wants to
choose visibility per row instead of having the homepage silently omit visible
entries through code limits.

## Approaches

- **Sheet-controlled visibility (selected):** Show every usable row marked
  visible in the selected sections; hide rows marked false. Remove row caps and
  project/case-study auto-exclusion. The user can hide duplicates in the Sheet.
- **Keep code caps and tune counts:** Smallest code change, but visible rows
  can still be omitted and visibility is not the sole control.

## Scope

- Apply Sheet visibility to Projects, Case Studies, Experience, Skills,
  Certifications, Testimonials, Posts, Tech Stack, Process, and Services.
- Render Posts, Tech Stack, and Process when they have usable visible rows.
- Preserve existing validation for incomplete rows and existing empty-section
  behavior.
- Keep the Sheet fetch and five-minute cache as-is.
- Do not change hero-stat handling; the user confirmed the updated value is now
  working.

## Constraints

- `visible=TRUE` includes a row; `visible=FALSE` excludes it.
- Because project/case-study duplication will no longer be filtered
  automatically, the user will control duplicates with the Sheet visibility
  column.
- Empty or invalid rows remain omitted even when visible.
