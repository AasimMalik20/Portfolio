# Deployment

> **Last Verified**: 2026-11-09  
> **Source**: `studio.json`, `.idx/dev.nix`, `.vscode/launch.json`, `README.md`, `.agents/rules/migration-context.md`

---

## Summary

The portfolio is deployed to **Firebase App Hosting** — a managed serverless hosting platform for Next.js applications that supports SSR, API routes, and static assets natively.

---

## Firebase Project

| Field | Value |
|-------|-------|
| Project ID | `aasim-malik-portfolio-dg25v` |
| Hosting Type | Firebase App Hosting (NOT Firebase Hosting) |
| Source | `studio.json` |

---

## Deployment Command

```bash
firebase deploy
```

This deploys to Firebase App Hosting using the `firebase.json` configuration.

> ⚠️ **Do NOT** use `firebase apphosting:backends:create` or `firebase apphosting:rollouts:create` — these create new backends. Use only `firebase deploy`.
> ⚠️ **Do NOT** deploy to Firebase Hosting (the static file hosting product) — the App Hosting product supports Next.js SSR properly.

---

## `firebase.json` Requirements

The migration context requires a valid `apphosting` block in `firebase.json`. Required fields:

```json
{
  "apphosting": {
    "backendId": "<backend-id>",
    "rootDir": "."
  }
}
```

> ⚠️ `firebase.json` was NOT found in the repository at time of inspection. It may be generated during first deploy or may be missing. **Verify before deploying.**

---

## Development Server

```bash
npm run dev
```

- Starts Next.js with Turbopack on port **9002**
- URL: `http://localhost:9002`

---

## Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev --turbopack -p 9002` | Start dev server with Turbopack on port 9002 |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | Run ESLint |
| `typecheck` | `tsc --noEmit` | Run TypeScript type checking without emitting |
| `genkit:dev` | `genkit start -- tsx src/ai/dev.ts` | Start Genkit dev UI |
| `genkit:watch` | `genkit start -- tsx --watch src/ai/dev.ts` | Start Genkit dev UI with file watching |

---

## Firebase Studio / Project IDX Configuration

The `.idx/dev.nix` file configures the cloud development environment:

- **Node.js version**: 20 (from nixpkgs stable-24.11)
- **Dev preview**: Web preview runs `npm run dev --port $PORT --hostname 0.0.0.0`
- **Default open file**: `src/app/page.tsx`

---

## Environment Variables Required for Production

| Variable | Purpose | Required For |
|----------|---------|-------------|
| `GOOGLE_GENAI_API_KEY` | Google AI API key | Genkit AI flows (when implemented) |

> Currently, since no AI flows are active, this variable is not strictly required for the portfolio to display correctly. It is read in `ai-instance.ts` but that file is not invoked by any page route.

---

## Build Warnings

The build currently has these non-blocking issues (see [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md)):
- TypeScript errors are suppressed (`ignoreBuildErrors: true`)
- ESLint is suppressed (`ignoreDuringBuilds: true`)

---

## CI/CD

❌ **No CI/CD pipeline is configured.** There are no GitHub Actions workflows, no Cloud Build configuration, and no automated deployment on git push.

**Recommended**: Set up a GitHub Actions workflow that:
1. Runs `npm run typecheck`
2. Runs `npm run lint`
3. Runs `npm run build`
4. Deploys to Firebase App Hosting on merge to main

---

## Related Documents

- [CONFIGURATION.md](./CONFIGURATION.md)
- [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)
- [workflows/DEPLOYMENT_WORKFLOW.md](./workflows/DEPLOYMENT_WORKFLOW.md)
- [integrations/FIREBASE.md](./integrations/FIREBASE.md)
