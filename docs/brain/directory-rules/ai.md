# Directory Rules: src/ai/

> **Applies to**: `src/ai/` and all subdirectories  
> **Critical**: Server-only code. Never import into client components.

---

## Responsibilities

- Genkit AI instance configuration
- AI flow definitions
- Prompt templates (future)
- AI utility functions

---

## Rules

1. **Server-side only.** Code in `src/ai/` runs on the server. Never import it directly into a `'use client'` component. Use Server Actions or API routes as the bridge.

2. **`ai-instance.ts` is the single source of the Genkit instance.** Import `ai` from here in all flow files. Do not create additional Genkit instances.

3. **Flow files go in `src/ai/flows/`** (create this directory when adding the first flow).

4. **Register flows in `dev.ts`** by importing them for side effects:
   ```typescript
   import '@/ai/flows/your-flow';
   ```

5. **Input/output must use Zod schemas.** Define `inputSchema` and `outputSchema` for every flow.

6. **Never log the API key.** Do not `console.log(process.env.GOOGLE_GENAI_API_KEY)`.

7. **Error handling required.** Wrap AI calls in try/catch. Return structured errors to callers.

8. **Prompts directory**: `./prompts/` — if using dotprompt files, they go here. Currently does not exist; create it when needed.

---

## File Structure (Current + Recommended Future)

```
src/ai/
├── ai-instance.ts      # ← exists — Genkit instance
├── dev.ts              # ← exists — dev server entry point
├── flows/              # ← create when adding first flow
│   └── your-flow.ts
└── prompts/            # ← create when using dotprompt
    └── your-prompt.prompt
```

---

## Related Documents

- [modules/AI_MODULE.md](../modules/AI_MODULE.md)
- [features/FEAT-012-ai-genkit.md](../features/FEAT-012-ai-genkit.md)
- [integrations/GENKIT_AI.md](../integrations/GENKIT_AI.md)
- [workflows/AI_FEATURE_DEVELOPMENT.md](../workflows/AI_FEATURE_DEVELOPMENT.md)
- [ENVIRONMENT_VARIABLES.md](../ENVIRONMENT_VARIABLES.md)
