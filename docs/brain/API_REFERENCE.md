# API Reference

> **Last Verified**: 2026-11-09  
> **Source**: `src/app/` directory scan

---

## Summary

**This application has no API routes.** The `src/app/api/` directory does not exist. There are no Next.js Route Handlers, Server Actions, or any backend endpoints.

---

## Absence of API Surface

| API Type | Status |
|----------|--------|
| Next.js Route Handlers (`/api/*`) | ❌ None |
| Next.js Server Actions | ❌ None |
| Genkit Flow Endpoints | ❌ None (flows not yet defined) |
| External API calls from client | ❌ None |

---

## Future API Surface (When AI Features Are Added)

When Genkit flows are added, the recommended pattern using `@genkit-ai/next` is:

```typescript
// src/app/api/ai/route.ts (example)
import { defineFlow } from 'genkit';
import { ai } from '@/ai/ai-instance';

export const POST = async (request: Request) => {
  const { input } = await request.json();
  const result = await yourFlow(input);
  return Response.json({ result });
};
```

Or via Next.js Server Actions:
```typescript
// src/app/actions.ts (example)
'use server';
import { ai } from '@/ai/ai-instance';
```

---

## Static Assets (Served via Next.js, Not API Routes)

| Path | File | MIME Type |
|------|------|-----------|
| `/Aasim_Malik_Resume.pdf` | `public/Aasim_Malik_Resume.pdf` | application/pdf |
| `/profile.png` | `public/profile.png` | image/png |
| `/logo-am.png` | `public/logo-am.png` | image/png |
| `/favicon.ico` | `src/app/favicon.ico` | image/x-icon |

---

## External API Dependencies (Runtime)

| Service | Usage | Auth |
|---------|-------|------|
| Google AI (Gemini) | AI flows (future) | `GOOGLE_GENAI_API_KEY` |
| Google Fonts (Inter) | Font loading at build time | None |

---

## Related Documents

- [DATA_FLOW.md](./DATA_FLOW.md)
- [features/FEAT-012-ai-genkit.md](./features/FEAT-012-ai-genkit.md)
- [INTEGRATIONS.md](./INTEGRATIONS.md)
