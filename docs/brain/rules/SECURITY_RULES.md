# Security Rules

> **Mandatory for all changes**

---

## Secrets & Credentials

1. **Never hardcode secrets.** API keys, passwords, and tokens must come from environment variables only.
2. **Never log or print secrets.** Do not `console.log(process.env.GOOGLE_GENAI_API_KEY)` or similar.
3. **Never commit `.env` files.** Ensure `.env`, `.env.local`, `.env.production` are in `.gitignore`.
4. **For production secrets**: Use Firebase Secret Manager via `firebase apphosting:secrets:set`.
5. **If a secret is accidentally committed**: Rotate it immediately. Do not just delete the commit — the git history preserves it.

---

## External Links

6. **All `target="_blank"` links must have `rel="noopener noreferrer"`** — prevents tab-napping. This is already correctly implemented; maintain it.

---

## Content Security

7. **Never use `dangerouslySetInnerHTML`.** All content is static and known — there is no need for it.
8. **All user input** (if added in future) must be sanitized before rendering.

---

## Dependencies

9. **Verify packages before installing.** See [DEPENDENCY_RULES.md](./DEPENDENCY_RULES.md). Typosquatting is a real threat.
10. **Run `npm audit`** before adding new dependencies and periodically on the existing ones.

---

## Build Configuration

11. **Do not disable TypeScript build errors** (`ignoreBuildErrors: true`). Fix the actual errors.
12. **Do not disable ESLint during builds** (`ignoreDuringBuilds: true`). Fix the actual linting issues.

---

## Image Security

13. **Whitelist only necessary remote image domains** in `next.config.ts`. The current `picsum.photos` and `placehold.co` whitelist should be reviewed — remove if not needed.

---

## AI / Genkit

14. **Genkit flows must validate input** before passing to the AI model.
15. **API keys for AI services must be server-side only** — never prefix with `NEXT_PUBLIC_`.
16. **Rate-limit AI endpoints** when implemented to prevent abuse.

---

## Related Documents

- [SECURITY.md](../SECURITY.md)
- [ENVIRONMENT_VARIABLES.md](../ENVIRONMENT_VARIABLES.md)
- [rules/DEPENDENCY_RULES.md](./DEPENDENCY_RULES.md)
