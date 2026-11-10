# AI Feature Development Workflow

> **Last Verified**: 2026-11-09

---

## Overview

This workflow covers how to add AI-powered features to the portfolio using the existing Genkit + Google AI scaffold in `src/ai/`.

---

## Prerequisites

1. Ensure `GOOGLE_GENAI_API_KEY` is set in `.env`
2. Understand Genkit concepts: see `.agents/skills/developing-genkit-js/` skill pack

---

## Step-by-Step: Adding a New AI Feature

### Step 1: Plan the flow
Define:
- What input does it take? (string, structured object?)
- What does it do? (generate, classify, summarize, etc.)
- What does it return?

### Step 2: Create the flow file

```bash
# Create src/ai/flows/your-feature.ts
```

```typescript
import { ai } from '@/ai/ai-instance';
import { z } from 'zod';

const InputSchema = z.object({
  query: z.string(),
});

const OutputSchema = z.object({
  result: z.string(),
});

export const yourFeatureFlow = ai.defineFlow(
  {
    name: 'yourFeatureName',
    inputSchema: InputSchema,
    outputSchema: OutputSchema,
  },
  async (input) => {
    const { text } = await ai.generate({
      prompt: `Your prompt here: ${input.query}`,
    });
    return { result: text };
  }
);
```

### Step 3: Register in dev.ts

```typescript
// src/ai/dev.ts
import '@/ai/flows/your-feature';
```

### Step 4: Test with Genkit UI

```bash
npm run genkit:dev
# Open http://localhost:4000
# Find "yourFeatureName" flow and test it
```

### Step 5: Create a Server Action

```typescript
// src/app/actions.ts
'use server';
import { yourFeatureFlow } from '@/ai/flows/your-feature';

export async function callYourFeature(query: string) {
  try {
    const result = await yourFeatureFlow({ query });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: 'AI request failed' };
  }
}
```

### Step 6: Call from a Client Component

```typescript
// In a 'use client' component
import { callYourFeature } from '@/app/actions';

const handleSubmit = async () => {
  const response = await callYourFeature(userInput);
  if (response.success) {
    setResult(response.data.result);
  }
};
```

---

## Security Checklist

- [ ] Input validation using Zod schemas
- [ ] Error handling in Server Action
- [ ] `GOOGLE_GENAI_API_KEY` is server-side only (no `NEXT_PUBLIC_` prefix)
- [ ] Rate limiting considered for production

---

## Related Documents

- [features/FEAT-012-ai-genkit.md](../features/FEAT-012-ai-genkit.md)
- [modules/AI_MODULE.md](../modules/AI_MODULE.md)
- [integrations/GENKIT_AI.md](../integrations/GENKIT_AI.md)
- [directory-rules/ai.md](../directory-rules/ai.md)
- [ENVIRONMENT_VARIABLES.md](../ENVIRONMENT_VARIABLES.md)
