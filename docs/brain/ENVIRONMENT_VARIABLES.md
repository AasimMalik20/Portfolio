# Environment Variables

> **Last Verified**: 2026-11-09  
> **Source**: `src/ai/ai-instance.ts`, `.gitignore`

---

## ⚠️ Security Notice

Never expose the values of environment variables in documentation, logs, or commits. Reference variables by name only.

---

## Known Variables

| Variable | Used In | Required | Default | Description |
|----------|---------|----------|---------|-------------|
| `GOOGLE_GENAI_API_KEY` | `src/ai/ai-instance.ts` | For AI features | None | Google AI (Gemini) API key for Genkit |

---

## Variable Details

### `GOOGLE_GENAI_API_KEY`

```typescript
// src/ai/ai-instance.ts
googleAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
})
```

- **Source**: Google AI Studio (ai.google.dev) or Google Cloud Console
- **Scope**: Server-side only (used in Genkit flows, not exposed to browser)
- **Status**: Configured in `.env` file. Currently not active because no AI flows exist.
- **When required**: Will be required as soon as any Genkit flow is implemented and called

---

## `.env` File

A `.env` file exists at the project root. It contains at minimum `GOOGLE_GENAI_API_KEY`.

**Git Status**: The `.gitignore` does not explicitly list `.env`. Verify with `git check-ignore -v .env` before committing anything.

**Recommended `.gitignore` addition**:
```
.env
.env.local
.env.production
.env*.local
```

---

## Next.js Environment Variable Conventions

Next.js supports multiple `.env` files with precedence:

| File | Environment | Git Status |
|------|-------------|-----------|
| `.env` | All environments | Should NOT be committed |
| `.env.local` | All (overrides) | Should NOT be committed |
| `.env.development` | `npm run dev` only | Can be committed (no secrets) |
| `.env.production` | `npm run build` only | Should NOT be committed |

**Browser Exposure**: Only variables prefixed with `NEXT_PUBLIC_` are exposed to the client bundle. `GOOGLE_GENAI_API_KEY` has no `NEXT_PUBLIC_` prefix, so it remains server-side only. ✅

---

## Production Environment Setup

For Firebase App Hosting, set environment variables via Firebase CLI or Console:

```bash
firebase apphosting:secrets:set GOOGLE_GENAI_API_KEY
```

This stores the secret in Google Cloud Secret Manager and makes it available to the App Hosting backend.

---

## Related Documents

- [SECURITY.md](./SECURITY.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [integrations/FIREBASE.md](./integrations/FIREBASE.md)
- [rules/SECURITY_RULES.md](./rules/SECURITY_RULES.md)
