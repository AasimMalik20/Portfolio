# FEAT-012: AI / Genkit Integration

> **Status**: ⚠️ Scaffolded Only — No Active Flows  
> **Source**: `src/ai/ai-instance.ts`, `src/ai/dev.ts`

---

## Description

Google Genkit is configured and scaffolded in `src/ai/` but no AI flows have been implemented. The AI layer is ready to use but currently has no effect on the portfolio.

---

## Current Files

### `src/ai/ai-instance.ts`

```typescript
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
```

- Creates and exports a `ai` Genkit instance
- Uses Google AI plugin with Gemini 2.0 Flash as the default model
- `promptDir: './prompts'` — a `prompts/` directory does not currently exist

### `src/ai/dev.ts`

```typescript
// Flows will be imported for their side effects in this file.
```

- Entry point for `genkit start` dev server
- Empty — no flows are imported

---

## How to Add an AI Feature

1. **Create a flow file** (e.g., `src/ai/flows/summarize-experience.ts`):

```typescript
import { ai } from '@/ai/ai-instance';
import { z } from 'zod';

export const summarizeExperienceFlow = ai.defineFlow(
  {
    name: 'summarizeExperience',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (input) => {
    const { text } = await ai.generate({
      prompt: `Summarize this professional experience: ${input}`,
    });
    return text;
  }
);
```

2. **Import the flow in `dev.ts`**:
```typescript
import '@/ai/flows/summarize-experience';
```

3. **Call the flow** from a Next.js Server Action or API route:
```typescript
'use server';
import { summarizeExperienceFlow } from '@/ai/flows/summarize-experience';

export async function summarize(experience: string) {
  return await summarizeExperienceFlow(experience);
}
```

4. **Test with Genkit UI**:
```bash
npm run genkit:dev
```

---

## Environment Requirements

| Variable | Required |
|----------|---------|
| `GOOGLE_GENAI_API_KEY` | Yes — must be set in `.env` |

---

## Agent Skills Available

Multiple agent skill packs are installed in `.agents/skills/` to guide Genkit development:
- `developing-genkit-js/` — JavaScript/TypeScript Genkit guidance
- `developing-genkit-dart/`, `developing-genkit-go/`, `developing-genkit-python/` — other languages
- `firebase-ai-logic-basics/` — Firebase AI integration patterns

---

## Related Documents

- [integrations/GENKIT_AI.md](../integrations/GENKIT_AI.md)
- [ENVIRONMENT_VARIABLES.md](../ENVIRONMENT_VARIABLES.md)
- [directory-rules/ai.md](../directory-rules/ai.md)
- [workflows/AI_FEATURE_DEVELOPMENT.md](../workflows/AI_FEATURE_DEVELOPMENT.md)
