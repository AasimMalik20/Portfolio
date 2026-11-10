# Genkit AI Integration

> **Last Verified**: 2026-11-09  
> **Source**: `src/ai/ai-instance.ts`, `src/ai/dev.ts`

---

## Overview

Google Genkit is an open-source AI orchestration framework. It's configured with the Google AI plugin (Gemini) and ready for flows to be defined. Currently scaffolded with no active features.

---

## Configuration

| Setting | Value |
|---------|-------|
| Model | `googleai/gemini-2.0-flash` |
| Plugin | `@genkit-ai/googleai` |
| API Key | `process.env.GOOGLE_GENAI_API_KEY` |
| Prompt Dir | `./prompts` (not yet created) |
| Next.js integration | `@genkit-ai/next` (installed) |

---

## Genkit Concepts

| Concept | Description |
|---------|-------------|
| Flow | A typed, observable async function (the main unit of AI work) |
| Generate | Calls the AI model — `ai.generate({ prompt, model })` |
| Prompt | Dotprompt template files in `./prompts/` |
| Plugin | Extension for AI providers (googleAI), tools, vector stores |
| Dev UI | Local development UI at `http://localhost:4000` |

---

## Dev Commands

```bash
npm run genkit:dev    # Start Genkit dev server (genkit start -- tsx src/ai/dev.ts)
npm run genkit:watch  # With file watching
```

---

## Agent Skills Available

The `.agents/skills/developing-genkit-js/` skill pack provides guidance on:
- Setting up Genkit flows
- Common patterns and best practices
- Error handling
- Testing flows

---

## Related Documents

- [features/FEAT-012-ai-genkit.md](../features/FEAT-012-ai-genkit.md)
- [modules/AI_MODULE.md](../modules/AI_MODULE.md)
- [directory-rules/ai.md](../directory-rules/ai.md)
- [workflows/AI_FEATURE_DEVELOPMENT.md](../workflows/AI_FEATURE_DEVELOPMENT.md)
