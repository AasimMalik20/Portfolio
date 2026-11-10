# Global Rules

> **Applies to**: All AI agents and developers working on this repository  
> **Mandatory**: Yes — read before making any change

---

## Before Making Any Change

1. **Read the relevant brain documents** before touching any file. Start with [INDEX.md](../INDEX.md), then the feature or module you're working on.
2. **Read `docs/blueprint.md`** if you're unsure about the intended purpose of any section.
3. **Understand the affected feature** and its dependencies before editing. Follow cross-references.
4. **Read the actual source files** you're about to modify — never assume what they contain.

---

## During Implementation

5. **Never make unnecessary changes outside the requested scope.** If asked to fix a typo in the hero section, do not refactor the carousel logic.
6. **Preserve existing architecture** unless the user explicitly approves a structural change.
7. **Match existing patterns.** This project uses Tailwind + shadcn/ui + lucide-react. Do not introduce new styling systems.
8. **Never assume undocumented behavior.** If something is unclear, check the source code or ask.
9. **Check [DEPENDENCY_RULES.md](./DEPENDENCY_RULES.md)** before installing any npm package.
10. **Check [PERMISSIONS_RULES.md](./PERMISSIONS_RULES.md)** before running any destructive or side-effectful command.

---

## After Making Changes

11. **Keep documentation synchronized with code.** If you change a feature, update the relevant brain document.
12. **Update [CHANGELOG.md](../CHANGELOG.md)** for any significant change.
13. **Update [FEATURES.md](../FEATURES.md)** if a feature's scope or status changes.
14. **Update [KNOWN_ISSUES.md](../KNOWN_ISSUES.md)** if you discover or fix an issue.
15. **Run `npm run typecheck`** (`tsc --noEmit`) to verify TypeScript health after changes.
16. **Run `npm run build`** to verify the production build succeeds before claiming work is done.

---

## Never

17. **Never expose, log, or commit** `GOOGLE_GENAI_API_KEY` or any other credentials.
18. **Never deploy to production** (`firebase deploy`) without explicit user authorization.
19. **Never push to git** without explicit user request.
20. **Never claim tests passed** if you did not run them.
21. **Never invent functionality** that doesn't exist. Distinguish VERIFIED from INFERRED.
22. **Never drop a feature or requirement** without explaining the tradeoff and getting user approval.

---

## Content Update Rules

Since all portfolio content is hardcoded in `src/app/page.tsx`:

23. **Work experience** → update `workExperiences` array and `coreExperiences` array
24. **Projects** → update `projects` array
25. **Skills** → update `categorizedSkills` object and `coreCompetencies` array
26. **Certifications** → update `certifications` array
27. **Resume** → replace `public/Aasim_Malik_Resume.pdf`

---

## Related Rules

- [CODING_RULES.md](./CODING_RULES.md)
- [SECURITY_RULES.md](./SECURITY_RULES.md)
- [DEPENDENCY_RULES.md](./DEPENDENCY_RULES.md)
- [PERMISSIONS_RULES.md](./PERMISSIONS_RULES.md)
