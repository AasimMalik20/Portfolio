# Secrets Management

> **Last Verified**: 2026-11-09

---

## Current Secrets

| Secret | Location | Purpose |
|--------|----------|---------|
| `GOOGLE_GENAI_API_KEY` | `.env` (local), Firebase Secret Manager (production) | Google AI (Gemini) API access |

---

## Local Development

Store in `.env` at the project root:
```
GOOGLE_GENAI_API_KEY=your-api-key-here
```

**Never commit this file.** Verify with:
```bash
git check-ignore -v .env
```

If not ignored, add to `.gitignore`:
```
.env
.env.local
.env*.local
```

---

## Production

Set via Firebase CLI:
```bash
firebase apphosting:secrets:set GOOGLE_GENAI_API_KEY
```

This stores the secret in Google Cloud Secret Manager and injects it as an environment variable in the deployed Next.js app.

---

## If a Secret Is Compromised

1. **Immediately rotate the key** in the Google AI Studio or Cloud Console
2. Update the value in Firebase Secret Manager
3. Remove it from git history if it was committed (use `git filter-branch` or BFG Repo Cleaner)
4. Update your local `.env` with the new key

---

## Related Documents

- [SECURITY.md](../SECURITY.md)
- [ENVIRONMENT_VARIABLES.md](../ENVIRONMENT_VARIABLES.md)
- [rules/SECURITY_RULES.md](../rules/SECURITY_RULES.md)
