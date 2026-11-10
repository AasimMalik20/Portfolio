# Deployment Workflow

> **Last Verified**: 2026-11-09

---

## Pre-Deployment Checklist

```bash
# 1. Type check
npm run typecheck

# 2. Lint
npm run lint

# 3. Production build
npm run build

# 4. Verify build succeeded — no errors
```

---

## Deploy to Firebase App Hosting

```bash
firebase deploy
```

**Requires**:
- Firebase CLI installed: `npm install -g firebase-tools`
- Authenticated: `firebase login`
- `firebase.json` with valid `apphosting` block

---

## Critical Notes

- ❌ DO NOT: `firebase apphosting:backends:create`
- ❌ DO NOT: `firebase apphosting:rollouts:create`
- ❌ DO NOT: Deploy to Firebase Hosting (static)
- ✅ DO: `firebase deploy` only

---

## Setting Production Secrets

```bash
firebase apphosting:secrets:set GOOGLE_GENAI_API_KEY
```

Enter the API key value when prompted. This stores it in Google Cloud Secret Manager and makes it available to the deployed application.

---

## Rollback

If a deployment causes issues, use the Firebase Console to roll back to a previous deployment from the App Hosting dashboard.

---

## Related Documents

- [DEPLOYMENT.md](../DEPLOYMENT.md)
- [ENVIRONMENT_VARIABLES.md](../ENVIRONMENT_VARIABLES.md)
- [integrations/FIREBASE.md](../integrations/FIREBASE.md)
