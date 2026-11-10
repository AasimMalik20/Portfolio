# Authentication

> **Last Verified**: 2026-11-09

---

## Current Status

**❌ No authentication exists in this application.**

This is a public-facing portfolio website. There are no:
- Login pages
- Protected routes
- User sessions
- Auth providers
- JWT tokens
- Firebase Auth configurations

---

## Installed But Unused

The `firebase` SDK (v11.3.0) is installed and includes Firebase Auth capabilities, but it is not imported or configured anywhere.

The `firebase-auth-basics` agent skill is installed in `.agents/skills/` — this suggests authentication was potentially considered for future features.

---

## If Authentication Is Added

If adding authentication (e.g., admin panel to edit content), follow these guidelines:

1. Use **Firebase Authentication** (already available via installed `firebase` SDK)
2. Configure providers in Firebase Console (Google Sign-In recommended for personal use)
3. Use `firebase/auth` client SDK for client-side flows
4. Protect routes with middleware in `src/middleware.ts`
5. Store session tokens server-side — do not put auth state in `localStorage` for sensitive data
6. Follow the [security/AUTH.md](../security/AUTH.md) patterns

---

## Related Documents

- [SECURITY.md](../SECURITY.md)
- [integrations/FIREBASE.md](../integrations/FIREBASE.md)
- [ARCHITECTURE.md](../ARCHITECTURE.md)
