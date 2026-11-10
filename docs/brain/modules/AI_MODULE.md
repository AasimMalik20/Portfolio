# AI Module

> **Source**: `src/ai/`  
> **Status**: ⚠️ Scaffolded Only  
> **Last Verified**: 2026-11-09

---

## Files

| File | Status | Purpose |
|------|--------|---------|
| `src/ai/ai-instance.ts` | ✅ Configured | Creates and exports the Genkit `ai` instance |
| `src/ai/dev.ts` | ⚠️ Empty | Genkit dev server entry point — import flows here |

---

## Configuration

```typescript
// ai-instance.ts
export const ai = genkit({
  promptDir: './prompts',
  plugins: [googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })],
  model: 'googleai/gemini-2.0-flash',
});
```

Model: **Gemini 2.0 Flash** (fast, cost-effective)  
Prompts directory: `./prompts` (does not exist yet)

---

## How to Add a Flow

1. Create `src/ai/flows/your-flow.ts`
2. Define the flow using `ai.defineFlow()`
3. Import it in `src/ai/dev.ts` for dev UI discovery
4. Call it from a Server Action or API route — NEVER from a client component directly

---

## Dev Server

```bash
npm run genkit:dev       # Single run
npm run genkit:watch     # Watch mode
```

Opens Genkit Developer UI at `http://localhost:4000` for testing flows interactively.

---

## Rules for This Directory

See [directory-rules/ai.md](../directory-rules/ai.md)

---

## Related Documents

- [features/FEAT-012-ai-genkit.md](../features/FEAT-012-ai-genkit.md)
- [integrations/GENKIT_AI.md](../integrations/GENKIT_AI.md)
- [ENVIRONMENT_VARIABLES.md](../ENVIRONMENT_VARIABLES.md)
