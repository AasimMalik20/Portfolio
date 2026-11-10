# Data Flow

> **Last Verified**: 2026-11-09  
> **Source**: `src/app/page.tsx`, `src/app/layout.tsx`

---

## Summary

This portfolio has **no dynamic data flow**. All content is hardcoded as TypeScript arrays and objects in `src/app/page.tsx`. There are no API calls, no database reads, and no server-side data fetching at runtime.

---

## Request/Response Flow

```mermaid
sequenceDiagram
    participant Browser
    participant FirebaseHosting as Firebase App Hosting
    participant NextJS as Next.js Server
    participant Client as React Client

    Browser->>FirebaseHosting: GET /
    FirebaseHosting->>NextJS: Forward request
    NextJS->>NextJS: Render layout.tsx (Server Component)
    NextJS->>Browser: Send HTML shell + JS bundles
    Browser->>Client: Hydrate React
    Client->>Client: ThemeProvider reads localStorage / OS preference
    Client->>Client: Apply theme class to <html>
    Client->>Client: Render all sections with hardcoded data
    Client->>Browser: Interactive page ready
```

---

## Static Assets Flow

```mermaid
graph LR
    Browser -->|GET /profile.png| PublicDir["public/profile.png"]
    Browser -->|GET /Aasim_Malik_Resume.pdf| PublicDir2["public/Aasim_Malik_Resume.pdf"]
    Browser -->|GET /logo-am.png| PublicDir3["public/logo-am.png"]
    Browser -->|Click external link| Credly["Credly badge pages"]
    Browser -->|Click external link| GitHub["github.com/AasimMalik20"]
    Browser -->|Click external link| LinkedIn["linkedin.com/in/aasim-malik"]
    Browser -->|Click external link| WhatsApp["wa.me/919176462019"]
    Browser -->|Click mailto| Email["aasimmalik29@gmail.com"]
```

---

## Data Sources (All Hardcoded in `page.tsx`)

| Data Structure | Type | Description |
|---------------|------|-------------|
| `technologies` | Array of `{name, icon}` | 11 tech items for hero ticker |
| `categorizedSkills` | Object keyed by category | 9 categories with skill string arrays |
| `coreCompetencies` | `string[]` | 14 soft skills/competency strings |
| `coreExperiences` | Array of objects | 5 condensed experience items for WHO AM I section |
| `workExperiences` | Array of objects | 5 detailed experience items with bullet points |
| `projects` | Array of objects | 3 project items with tags and optional links |
| `certifications` | Array of objects | 6 certification items with external links |

---

## No Dynamic Data Paths

There are **no** data flow paths for:
- ❌ Contact form submission (no POST route)
- ❌ Database reads (no Firestore queries)
- ❌ External API calls from the client
- ❌ Server Actions
- ❌ AI flow invocations (Genkit flows not yet defined)
- ❌ Analytics tracking
- ❌ Search
- ❌ Authentication

---

## Future Data Flow (If AI Features Are Added)

If Genkit flows are added, the flow would be:

```mermaid
sequenceDiagram
    participant User
    participant Page as page.tsx (Client)
    participant ServerAction as Server Action / API Route
    participant Genkit as src/ai/ (Genkit)
    participant GoogleAI as Google AI (Gemini 2.0 Flash)

    User->>Page: Submit prompt
    Page->>ServerAction: POST request with user input
    ServerAction->>Genkit: Call defined flow
    Genkit->>GoogleAI: Generate content via GOOGLE_GENAI_API_KEY
    GoogleAI-->>Genkit: Response
    Genkit-->>ServerAction: Processed output
    ServerAction-->>Page: Return result
    Page->>User: Display AI response
```

---

## Related Documents

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)
- [API_REFERENCE.md](./API_REFERENCE.md)
- [features/FEAT-012-ai-genkit.md](./features/FEAT-012-ai-genkit.md)
