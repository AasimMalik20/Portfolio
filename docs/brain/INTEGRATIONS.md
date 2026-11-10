# Integrations

> **Last Verified**: 2026-11-09  
> **Source**: `src/ai/ai-instance.ts`, `studio.json`, `src/app/page.tsx`

---

## Integration Overview

| Integration | Type | Status |
|------------|------|--------|
| Firebase App Hosting | Hosting/Infrastructure | ✅ Active (deployed) |
| Google AI / Gemini (via Genkit) | AI | ⚠️ Scaffolded — no active flows |
| Credly | External link (certification badges) | ✅ Active (external links only) |
| Oracle Certification Catalog | External link | ✅ Active (external links only) |
| Google Fonts (Inter) | Typography | ✅ Active (build-time) |
| LinkedIn | External link | ✅ Active |
| GitHub | External link | ✅ Active |
| WhatsApp | External link | ✅ Active |
| Twitter / X | External link | ✅ Active |
| Medium | External link | ✅ Active |

---

## Firebase App Hosting

**Type**: Infrastructure / Hosting  
**Status**: ✅ Active  
**Project ID**: `aasim-malik-portfolio-dg25v` (from `studio.json`)

Firebase App Hosting is a managed platform that serves the Next.js application with:
- Automatic HTTPS
- CDN distribution
- SSR support (though this portfolio is fully client-rendered)
- Environment variable management via Secret Manager

**Deployment**: `firebase deploy`  
**Detail**: [integrations/FIREBASE.md](./integrations/FIREBASE.md)

---

## Google AI / Gemini (Genkit)

**Type**: AI Integration  
**Status**: ⚠️ Scaffolded Only  
**Package**: `genkit` + `@genkit-ai/googleai`  
**Model**: `googleai/gemini-2.0-flash`  
**Config**: `src/ai/ai-instance.ts`

The Genkit integration is configured but has no active flows. The `ai` instance is exported and ready for use.

**Auth**: `GOOGLE_GENAI_API_KEY` environment variable  
**Detail**: [integrations/GENKIT_AI.md](./integrations/GENKIT_AI.md)

---

## Credly (Certification Badge Links)

**Type**: External Link Integration  
**Status**: ✅ Active  

Certification cards link to Credly badge verification pages. These are direct `<a href>` links — no API integration.

**Linked Certifications**:
- Professional Cloud Architect: `credly.com/badges/a0aa0637-f948-4ca6-afeb-e4f0822855af/public_url`
- Associate Cloud Engineer: `credly.com/badges/25be3a65-4448-43c7-904c-de0d7f2a3575/public_url`
- Cybersecurity Essentials: `credly.com/badges/be946124-75c1-44cb-9b1a-26b89c9fc87d/public_url`
- GitHub Copilot: `credly.com/badges/7037903a-d802-4c1b-afd1-20f07a6e7cee/public_url`

**Detail**: [integrations/CREDLY.md](./integrations/CREDLY.md)

---

## Oracle Certification Catalog

**Type**: External Link Integration  
**Status**: ✅ Active  

Two Oracle certification cards link to Oracle's certification view:
- OCI Generative AI Professional
- OCI 2023 Foundations Associate

---

## Google Fonts (Inter)

**Type**: Typography  
**Status**: ✅ Active  
**Implementation**: `next/font/google` in `src/app/layout.tsx`

Next.js downloads and self-hosts the Inter font at build time. No runtime Google Fonts requests are made, which is better for both performance and privacy.

---

## Social / Contact External Links

All links use `target="_blank" rel="noopener noreferrer"`. No API integrations — purely HTML links.

| Platform | URL | Used For |
|----------|-----|---------|
| LinkedIn | linkedin.com/in/aasim-malik/ | Professional network |
| GitHub | github.com/AasimMalik20 | Code repositories |
| WhatsApp | wa.me/919176462019 | Direct messaging |
| Twitter/X | x.com/AasimMalik4957 | Social media |
| Medium | medium.com/@aasimmalik29 | Blog/writing |

---

## Related Documents

- [integrations/FIREBASE.md](./integrations/FIREBASE.md)
- [integrations/GENKIT_AI.md](./integrations/GENKIT_AI.md)
- [integrations/CREDLY.md](./integrations/CREDLY.md)
- [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)
