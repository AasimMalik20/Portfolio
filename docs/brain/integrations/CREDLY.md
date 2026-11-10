# Credly Integration

> **Last Verified**: 2026-11-09  
> **Source**: `src/app/page.tsx` — certifications array

---

## Overview

Credly is used as the badge verification platform for Google Cloud and Cisco certifications. Integration is purely via HTML anchor links — no API, no SDK.

---

## Active Badge Links

| Certification | Credly Badge URL |
|--------------|-----------------|
| Professional Cloud Architect | `https://www.credly.com/badges/a0aa0637-f948-4ca6-afeb-e4f0822855af/public_url` |
| Associate Cloud Engineer | `https://www.credly.com/badges/25be3a65-4448-43c7-904c-de0d7f2a3575/public_url` |
| Cybersecurity Essentials (Cisco) | `https://www.credly.com/badges/be946124-75c1-44cb-9b1a-26b89c9fc87d/public_url` |
| GitHub Copilot | `https://www.credly.com/badges/7037903a-d802-4c1b-afd1-20f07a6e7cee/public_url` |

---

## Oracle Certification Catalog Links

| Certification | URL |
|--------------|-----|
| OCI Generative AI Professional | `https://catalog-education.oracle.com/ords/certview/sharebadge?id=E0E9C4E9ACA5E90D8DBB5A343A2FBBD316A7DC87357BEA55F5B07D4E32073F9F` |
| OCI 2023 Foundations Associate | `https://catalog-education.oracle.com/ords/certview/sharebadge?id=9239C29B8DE6F49583D2C113905F445A744579EB91D6C9AAD39C6FD009240CDA` |

---

## Notes

- All links open in new tab with `rel="noopener noreferrer"` ✅
- Badge links are public URLs — no authentication required to view them
- If a certification badge URL changes, update the `link` field in the `certifications` array in `page.tsx`

---

## Related Documents

- [features/FEAT-006-certifications.md](../features/FEAT-006-certifications.md)
- [INTEGRATIONS.md](../INTEGRATIONS.md)
