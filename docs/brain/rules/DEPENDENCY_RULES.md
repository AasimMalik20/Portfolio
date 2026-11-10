# Dependency Rules

> **MANDATORY** — Follow these rules before installing any package

---

## The Golden Rule

**Never install a package simply because it sounds appropriate.**

Installing an incorrect or malicious package can introduce security vulnerabilities, increase bundle size, and create maintainability burdens.

---

## Pre-Installation Checklist

Before running `npm install <package>`:

1. **Check if the functionality already exists.** Search the current `package.json` and `DEPENDENCY_MAP.md`. Many packages are already installed (e.g., `zod` for validation, `recharts` for charts, `react-hook-form` for forms).

2. **Verify the exact package name on npm.** Go to [npmjs.com](https://npmjs.com) and confirm:
   - The package exists with that exact name
   - The weekly downloads are reasonable for a known package
   - The publisher is the expected organization/author

3. **Check for typosquatting.** Common patterns:
   - `tailwindcss` vs `tailwind-css` (fake)
   - `lucide-react` vs `lucide` (different)
   - Extra hyphens, misspellings, different word order

4. **Check maintenance status:**
   - Last publish date (inactive for 2+ years is a warning)
   - Open issues / PRs
   - Is it actively maintained?

5. **Check compatibility:**
   - Does it support React 18?
   - Does it support Next.js 15 / App Router?
   - Does it support TypeScript?

6. **Check license:** Must be compatible (MIT, Apache 2.0, BSD preferred).

7. **Check bundle size** at [bundlephobia.com](https://bundlephobia.com).

8. **Explain why it's needed.** Document the reason in the PR/change description.

---

## Before Upgrading a Dependency

1. Read the changelog for the version range being upgraded
2. Check for breaking changes
3. Verify that the upgraded version still supports React 18 + Next.js 15
4. Do NOT upgrade unrelated dependencies as part of a feature PR

---

## Dev vs Production Dependencies

- **Production** (`dependencies`): Code that runs at runtime on the server or in the browser
- **Dev** (`devDependencies`): Build tools, type definitions, testing utilities

Examples of correct classification:
- `vitest` → `devDependencies`
- `@types/react` → `devDependencies`
- `next-themes` → `dependencies`
- `tailwindcss` → `devDependencies` (build tool only, not runtime)

---

## Packages to Avoid

- Any package that mirrors existing functionality (`clsx` + `tailwind-merge` → we have `cn()`)
- Multiple icon libraries — we use `lucide-react` only
- Multiple CSS-in-JS libraries — we use Tailwind only
- Multiple form libraries — we have `react-hook-form` already
- Multiple validation libraries — we have `zod` already
- Duplicate animation libraries — Tailwind animate + CSS is sufficient

---

## Current Packages That Could Replace Proposed New Ones

| Use Case | Already Installed | Use This |
|---------|----------------|----|
| Form handling | `react-hook-form` | Use existing |
| Validation | `zod` | Use existing |
| Charts | `recharts` | Use existing |
| Date handling | `date-fns` | Use existing |
| Date picker | `react-day-picker` | Use existing |
| Icons | `lucide-react` | Use existing |
| Class merging | `cn()` via `clsx` + `tailwind-merge` | Use existing |
| Firebase | `firebase` SDK | Use existing |
| State (server) | `@tanstack/react-query` | Use existing |
| AI | `genkit` + `@genkit-ai/googleai` | Use existing |

---

## Removing Dependencies

Before removing a dependency:
1. Search the codebase for all imports of that package
2. Verify no transitive dependencies rely on it
3. Run `npm run build` after removal to confirm nothing breaks

---

## Related Documents

- [DEPENDENCY_MAP.md](../DEPENDENCY_MAP.md)
- [TECH_STACK.md](../TECH_STACK.md)
- [TECHNICAL_DEBT.md](../TECHNICAL_DEBT.md)
