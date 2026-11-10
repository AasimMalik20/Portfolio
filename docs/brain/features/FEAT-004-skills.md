# FEAT-004: Skills Section

> **Status**: ✅ Implemented  
> **Source**: `src/app/page.tsx` — `<section id="skills">`

---

## Description

Two-part section. Part 1: categorized technical skills grid. Part 2: animated core competencies ticker.

---

## Technical Skills Grid

9 categories, rendered in a 3-column grid (desktop):

| Category | Icon | Skills Count |
|----------|------|-------------|
| Cloud Platforms | `Cloud` | 2 |
| Cloud Services | `CloudCog` | 7 |
| Infrastructure as Code | `Layers` | 2 |
| Containerization | `Container` | 3 |
| Security & Compliance | `ShieldCheck` | 4 |
| Networking | `Network` | 5 |
| Database Systems | `DatabaseZap` | 5 |
| Monitoring & Analytics | `Activity` | 4 |
| Scripting & Programming | `Code` | 2 |

Each category renders skills as `Badge` components with `variant="secondary"`.

---

## Core Competencies Ticker

14 competencies in the same `slideLeft` infinite-scroll animation used by the Hero technology ticker.

Items:
1. Cloud Architecture & Design
2. Problem Solving & Critical Thinking
3. Cost Optimization Strategies
4. Performance Tuning & Improvement
5. Security Implementation & Best Practices
6. Technical Documentation & Runbooks
7. Effective Communication (Technical & Non-Technical)
8. Team Collaboration & Knowledge Sharing
9. Process Automation (IaC, CI/CD)
10. Migration Planning & Execution
11. High Availability & Disaster Recovery Design
12. System Reliability Enhancement
13. Client Interaction & Requirements Gathering
14. Agile Methodologies

---

## To Modify

### Add a Skill to an Existing Category
Find the `categorizedSkills` object in `page.tsx` and add the skill string to the appropriate array.

### Add a New Category
1. Add to `categorizedSkills` object
2. Add a matching entry in `skillIcons` object in `Home()`:
   ```typescript
   'New Category': SomeLucideIcon,
   ```

### Add a Core Competency
Append to the `coreCompetencies` array.

---

## Related Documents

- [FEATURES.md](../FEATURES.md)
- [components/SHADCN_UI.md](../components/SHADCN_UI.md)
