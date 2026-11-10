# Database

> **Last Verified**: 2026-11-09

---

## Summary

**This application has no database.** There is no Firestore configuration, no Cloud SQL connection, no SQLite, and no local database. All content is hardcoded in source code.

---

## Current State

| Database | Status |
|----------|--------|
| Firestore | ❌ Not configured (firebase SDK installed but not used) |
| Cloud SQL | ❌ Not present |
| SQLite / PGLite | ❌ Not in use (pglite-debug.log is empty and a scaffold artifact) |
| Redis | ❌ Not present |
| Any other DB | ❌ Not present |

---

## The `pglite-debug.log` File

A file named `pglite-debug.log` exists at the root. It is **empty**. PGLite is a WebAssembly build of PostgreSQL used in Firebase Studio for local development. This file is a leftover artifact from the Firebase Studio environment and has no impact on the portfolio.

---

## Content Storage

All content is stored as TypeScript arrays/objects in `src/app/page.tsx`:

| Content | Variable | Type |
|---------|----------|------|
| Work experiences | `workExperiences` | Array of objects |
| Projects | `projects` | Array of objects |
| Certifications | `certifications` | Array of objects |
| Technical skills | `categorizedSkills` | Object with arrays |
| Core competencies | `coreCompetencies` | string[] |
| Career timeline | `coreExperiences` | Array of objects |
| Technologies | `technologies` | Array of objects |

---

## Future Database Considerations

If a database is added, recommended approaches given the existing dependency stack:

| Use Case | Recommended Solution |
|----------|---------------------|
| Content management | Firestore (firebase SDK already installed) |
| Contact form submissions | Firestore or Firebase Realtime Database |
| Analytics | Google Analytics + Firestore |
| Blog posts | Firestore or a headless CMS (Contentful, Sanity) |

---

## Related Documents

- [DATA_FLOW.md](./DATA_FLOW.md)
- [INTEGRATIONS.md](./INTEGRATIONS.md)
- [features/FEAT-012-ai-genkit.md](./features/FEAT-012-ai-genkit.md)
