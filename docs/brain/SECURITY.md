# Security Audit & Knowledge Base

> **Last Verified**: 2026-11-09  
> **Scope**: Full repository review  
> **Severity Scale**: CRITICAL / HIGH / MEDIUM / LOW / INFO

---

## Executive Summary

This is a static personal portfolio website with no backend, no database, no authentication, and no user input processing. The attack surface is very small. The primary security concerns are related to credential management, build configuration, and dependency hygiene.

**Overall Risk Level**: LOW (for a static portfolio)

---

## Findings

### SEC-001: TypeScript Errors Suppressed in Build

| Field | Detail |
|-------|--------|
| **ID** | SEC-001 |
| **Severity** | MEDIUM |
| **File** | `next.config.ts`, line: `typescript: { ignoreBuildErrors: true }` |
| **Description** | TypeScript errors are suppressed during the Next.js build process. This means broken types or unsafe code can be deployed without detection. |
| **Impact** | Type-unsafe code could introduce runtime errors; security-relevant type mismatches would not surface during CI/CD. |
| **Remediation** | Set `ignoreBuildErrors: false` and fix all TypeScript errors. The `// @ts-nocheck` in `theme-toggle-button.tsx` suggests there are pre-existing type issues. |
| **Status** | Open |

---

### SEC-002: ESLint Bypassed During Builds

| Field | Detail |
|-------|--------|
| **ID** | SEC-002 |
| **Severity** | MEDIUM |
| **File** | `next.config.ts`, line: `eslint: { ignoreDuringBuilds: true }` |
| **Description** | ESLint is not run during production builds. Linting rules that catch security issues (e.g., no-eval, no-implied-eval, react/no-danger) are bypassed. |
| **Impact** | Code quality and security issues caught by linting are silently ignored. |
| **Remediation** | Remove `ignoreDuringBuilds: true` and resolve any linting errors. |
| **Status** | Open |

---

### SEC-003: API Key in `.env` — Ensure Not Committed

| Field | Detail |
|-------|--------|
| **ID** | SEC-003 |
| **Severity** | HIGH (if violated) |
| **File** | `.env` (root), `src/ai/ai-instance.ts` |
| **Description** | `GOOGLE_GENAI_API_KEY` is read from environment variables in `ai-instance.ts`. A `.env` file exists at the root. |
| **Impact** | If the `.env` file is committed to git, the API key is exposed. Compromised keys can incur costs or allow unauthorized AI API usage. |
| **Evidence** | `.gitignore` does NOT explicitly ignore `.env` (it ignores `.pem`, `*.tsbuildinfo`, `.genkit/*`, etc., but not `.env` directly). HOWEVER, `.env` is a widely-understood default exclusion. **Verify this is not tracked.** |
| **Remediation** | Explicitly add `.env*` to `.gitignore`. Run `git status` to confirm `.env` is untracked. Rotate the key if it has ever been committed. |
| **Status** | Needs Verification |

---

### SEC-004: `@ts-nocheck` in Theme Toggle Button

| Field | Detail |
|-------|--------|
| **ID** | SEC-004 |
| **Severity** | LOW |
| **File** | `src/components/theme-toggle-button.tsx`, line 1 |
| **Description** | `// @ts-nocheck` disables all TypeScript checking for this file. The comment also says `// TODO: Fix TS errors`. |
| **Impact** | Type safety is completely disabled for theme toggle logic. Any future edits to this file bypass type checking. |
| **Remediation** | Fix the underlying TypeScript error and remove `// @ts-nocheck`. Likely a minor types import issue with `next-themes`. |
| **Status** | Open |

---

### SEC-005: `unknown_file.txt` — Stray File

| Field | Detail |
|-------|--------|
| **ID** | SEC-005 |
| **Severity** | INFO |
| **File** | `unknown_file.txt` (root) |
| **Description** | Contains a JSX fragment: `-4 w-4" />` — clearly an artifact from a cut/paste error during Firebase Studio migration. |
| **Impact** | No security impact. Minor repository hygiene issue. |
| **Remediation** | Delete the file. |
| **Status** | Open |

---

### SEC-006: Remote Image Domains Allow Placeholder Services

| Field | Detail |
|-------|--------|
| **ID** | SEC-006 |
| **Severity** | LOW |
| **File** | `next.config.ts` — `images.remotePatterns` |
| **Description** | `picsum.photos` and `placehold.co` are whitelisted for remote images in `next/image`. These are placeholder/stock services, suggesting they were added during prototyping but may not be needed in production. |
| **Impact** | These domains could potentially serve malicious content if taken over, though this is very unlikely for these specific services. |
| **Remediation** | Review whether these domains are actually used. If not, remove them from the whitelist to reduce surface area. Currently, `page.tsx` uses only local `/profile.png`. |
| **Status** | Open (low priority) |

---

### SEC-007: No Content Security Policy (CSP)

| Field | Detail |
|-------|--------|
| **ID** | SEC-007 |
| **Severity** | MEDIUM |
| **File** | `next.config.ts`, `src/app/layout.tsx` |
| **Description** | No CSP headers are configured. The app uses inline `<style jsx global>` which requires `'unsafe-inline'` in style-src. |
| **Impact** | Without a CSP, XSS attacks have a wider impact. For a static site with no user input, actual XSS risk is low, but hardening is best practice. |
| **Remediation** | Add `headers()` in `next.config.ts` with a CSP. Be aware that `<style jsx global>` in `page.tsx` requires `'unsafe-inline'` or nonces. |
| **Status** | Open (low priority for static portfolio) |

---

### SEC-008: External Links — `rel="noopener noreferrer"` is Correctly Applied

| Field | Detail |
|-------|--------|
| **ID** | SEC-008 |
| **Severity** | INFO (Positive finding) |
| **File** | `src/app/page.tsx` |
| **Description** | All external links use `target="_blank" rel="noopener noreferrer"`, preventing tab-napping attacks. |
| **Impact** | Positive — this is the correct security practice. |
| **Status** | Compliant ✅ |

---

### SEC-009: No CSRF Risk

| Field | Detail |
|-------|--------|
| **ID** | SEC-009 |
| **Severity** | INFO (Positive finding) |
| **Description** | There are no forms, no POST endpoints, no API routes, and no server actions. CSRF attacks require state-changing server operations, none of which exist here. |
| **Status** | Not Applicable ✅ |

---

### SEC-010: No XSS Input Vectors

| Field | Detail |
|-------|--------|
| **ID** | SEC-010 |
| **Severity** | INFO (Positive finding) |
| **Description** | There is no user input rendered to the DOM anywhere in the application. All content is hardcoded. No `dangerouslySetInnerHTML` is used. |
| **Status** | Not Applicable ✅ |

---

### SEC-011: Dependency Vulnerabilities

| Field | Detail |
|-------|--------|
| **ID** | SEC-011 |
| **Severity** | UNKNOWN (requires `npm audit` to verify) |
| **Description** | 42 production dependencies are installed. Vulnerability status has not been checked. |
| **Remediation** | Run `npm audit` regularly. Address HIGH and CRITICAL findings. |
| **Status** | Needs Verification |

---

## Security Controls Matrix

| Control | Status | Notes |
|---------|--------|-------|
| Input validation | ✅ N/A | No user input |
| Output encoding | ✅ N/A | No user-generated content |
| XSS protection | ✅ Safe | No user input, no dangerouslySetInnerHTML |
| CSRF protection | ✅ N/A | No state-changing operations |
| Authentication | ✅ N/A | No auth needed for portfolio |
| Secrets management | ⚠️ Needs verification | `.env` file may not be in .gitignore explicitly |
| Dependency security | ❓ Unknown | `npm audit` not run |
| TypeScript safety | 🔧 Impaired | Build errors suppressed |
| Linting | 🔧 Impaired | ESLint bypassed during builds |
| External link safety | ✅ Compliant | `noopener noreferrer` applied |
| CSP headers | ❌ None | Not configured |
| HTTPS | ✅ Firebase App Hosting enforces HTTPS | |

---

## Related Documents

- [security/SECRETS_MANAGEMENT.md](./security/SECRETS_MANAGEMENT.md)
- [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)
- [rules/SECURITY_RULES.md](./rules/SECURITY_RULES.md)
- [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md)
