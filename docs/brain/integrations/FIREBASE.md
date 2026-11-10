# Firebase Integration

> **Last Verified**: 2026-11-09  
> **Source**: `studio.json`, `.agents/rules/migration-context.md`

---

## Overview

Firebase is used for hosting via **Firebase App Hosting**. The Firebase client SDK is installed but not yet used for any runtime features.

---

## Firebase Project

- **Project ID**: `aasim-malik-portfolio-dg25v`
- **Source**: `studio.json`

---

## Firebase App Hosting

Firebase App Hosting is a managed serverless platform optimized for Next.js.

**Key capabilities**:
- Full Next.js SSR support
- Automatic HTTPS
- CDN distribution
- Secret Manager integration for environment variables
- Scales to zero when idle

**Deployment**: `firebase deploy`

**Required `firebase.json` block**:
```json
{
  "apphosting": {
    "backendId": "<id>",
    "rootDir": "."
  }
}
```

---

## Installed SDK (Unused)

`firebase@^11.3.0` is installed but not imported anywhere. Available modules when needed:
- `firebase/auth` — Authentication
- `firebase/firestore` — NoSQL database
- `firebase/storage` — File storage
- `firebase/functions` — Cloud Functions
- `firebase/analytics` — Google Analytics

---

## Critical Rules

1. **DO NOT** use `firebase apphosting:backends:create` — creates a NEW backend
2. **DO NOT** use `firebase apphosting:rollouts:create` — creates NEW rollout
3. **DO NOT** deploy to Firebase Hosting (static) — use App Hosting only
4. **DO** use `firebase deploy` for standard deployments

---

## Related Documents

- [DEPLOYMENT.md](../DEPLOYMENT.md)
- [architecture/INFRASTRUCTURE.md](../architecture/INFRASTRUCTURE.md)
- [ENVIRONMENT_VARIABLES.md](../ENVIRONMENT_VARIABLES.md)
