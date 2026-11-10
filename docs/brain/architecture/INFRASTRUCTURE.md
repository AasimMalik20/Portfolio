# Infrastructure

> **Last Verified**: 2026-11-09  
> **Source**: `studio.json`, `.idx/dev.nix`, `README.md`, `.agents/rules/migration-context.md`

---

## Hosting Platform

**Firebase App Hosting** — Google's managed hosting for modern web frameworks (Next.js, Angular, etc.)

| Property | Value |
|----------|-------|
| Firebase Project ID | `aasim-malik-portfolio-dg25v` |
| Platform | Firebase App Hosting (NOT Firebase Hosting) |
| Runtime | Node.js |
| Region | UNKNOWN — not specified in accessible config |
| HTTPS | Enforced automatically |
| CDN | Included via Firebase infrastructure |

---

## Firebase App Hosting vs Firebase Hosting

| Feature | Firebase Hosting | Firebase App Hosting |
|---------|-----------------|---------------------|
| Next.js SSR support | ❌ Static files only | ✅ Full support |
| API Routes | ❌ | ✅ |
| Server Actions | ❌ | ✅ |
| Use for this project | ❌ DO NOT USE | ✅ USE THIS |

---

## Deployment Process

```bash
# Deploy to Firebase App Hosting
firebase deploy
```

**Prerequisites**:
1. Firebase CLI installed: `npm install -g firebase-tools`
2. Logged in: `firebase login`
3. `firebase.json` with valid `apphosting` block

**`firebase.json` required structure**:
```json
{
  "apphosting": {
    "backendId": "<backend-id>",
    "rootDir": "."
  }
}
```

> ⚠️ `firebase.json` was not found at inspection time. It may need to be created or recovered.

---

## Environment / Development Infrastructure

### Local Development
- **Framework**: Next.js 15 with Turbopack
- **Dev Port**: 9002
- **Node.js**: 20 (specified in `.idx/dev.nix`)
- **Package Manager**: npm

### Firebase Studio / Project IDX
- Nix-based cloud environment defined in `.idx/dev.nix`
- Runs `npm run dev` with `--hostname 0.0.0.0` for cloud preview

### Kiro IDE / Antigravity
- VS Code-based local environment
- `.vscode/launch.json` configures local debug session on port 9002

---

## Secret Management

For production secrets (API keys), Firebase App Hosting integrates with Google Cloud Secret Manager:

```bash
firebase apphosting:secrets:set GOOGLE_GENAI_API_KEY
```

Secrets are then available as environment variables to the Next.js application at runtime.

---

## No CI/CD

There is no automated CI/CD pipeline. Deployment is manual via Firebase CLI.

**Recommended pipeline** (not yet implemented):
1. GitHub Actions on push to `main`
2. Run `npm run typecheck && npm run lint && npm run build`
3. Deploy via `firebase deploy`

---

## Related Documents

- [DEPLOYMENT.md](../DEPLOYMENT.md)
- [ENVIRONMENT_VARIABLES.md](../ENVIRONMENT_VARIABLES.md)
- [integrations/FIREBASE.md](../integrations/FIREBASE.md)
