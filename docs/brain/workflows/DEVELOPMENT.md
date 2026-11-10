# Development Workflow

> **Last Verified**: 2026-11-09

---

## Starting the Dev Server

```bash
npm run dev
```

Starts Next.js with Turbopack on `http://localhost:9002`. Hot Module Replacement (HMR) is enabled.

---

## Common Development Tasks

### Update Content (Experience, Projects, Skills, etc.)
1. Open `src/app/page.tsx`
2. Find the relevant data array
3. Edit and save — HMR will reflect changes immediately
4. See [GLOBAL_RULES.md](../rules/GLOBAL_RULES.md) for which array to modify

### Add a New UI Component (from shadcn/ui)
```bash
npx shadcn-ui add <component-name>
```
This adds the component to `src/components/ui/`.

### Add a New Page Section
1. Create the section component in `src/components/sections/` (new directory)
2. Import and render it in `src/app/page.tsx`
3. Add a nav link in the header
4. Document in [FEATURES.md](../FEATURES.md)

### Update the Resume
Replace `public/Aasim_Malik_Resume.pdf` with the new file. No code changes needed.

---

## Verification Before Committing

```bash
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run build        # Full production build
```

All three should pass before considering work done.

---

## Working with Genkit AI

```bash
npm run genkit:dev   # Start Genkit dev UI at http://localhost:4000
```

See [workflows/AI_FEATURE_DEVELOPMENT.md](./AI_FEATURE_DEVELOPMENT.md) for full workflow.

---

## Related Documents

- [DEPLOYMENT.md](../DEPLOYMENT.md)
- [rules/GLOBAL_RULES.md](../rules/GLOBAL_RULES.md)
- [CONFIGURATION.md](../CONFIGURATION.md)
