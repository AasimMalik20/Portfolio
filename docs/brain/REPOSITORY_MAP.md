# Repository Map

> **Last Verified**: 2026-11-09  
> **Source**: Full directory traversal and file inspection

Every file and directory in this repository is documented here.

---

## Root Directory

```
Portfolio/
├── .agents/               # Agent skills and rules for AI coding tools
├── .git/                  # Git repository metadata (do not modify)
├── .idx/                  # Firebase Project IDX environment config
├── .vscode/               # VS Code / Kiro IDE workspace settings
├── docs/                  # Documentation
├── public/                # Static assets served at /
├── src/                   # Application source code
├── .env                   # Environment variables (NOT committed — contains secrets)
├── .gitignore             # Git ignore rules
├── components.json        # shadcn/ui CLI configuration
├── next.config.ts         # Next.js configuration
├── package.json           # npm manifest — dependencies and scripts
├── package-lock.json      # npm lock file
├── pglite-debug.log       # Empty debug log (artifact from Firebase Studio)
├── postcss.config.mjs     # PostCSS configuration for Tailwind
├── README.md              # Project README (migrated from Firebase Studio)
├── skills-lock.json       # Agent skills lock file (AI tool dependency tracking)
├── studio.json            # Firebase project ID reference
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript compiler configuration
└── unknown_file.txt       # Artifact file (fragment of JSX — safe to delete)
```

---

## `.agents/` — AI Agent Configuration

```
.agents/
├── rules/
│   └── migration-context.md   # Always-on steering rule with project context and AI instructions
└── skills/                    # Agent skill packs (Firebase, Genkit for dart/go/js/python, etc.)
    ├── developing-genkit-dart/
    ├── developing-genkit-go/
    ├── developing-genkit-js/
    ├── developing-genkit-python/
    ├── fbs-to-agy-export/
    ├── firebase-ai-logic-basics/
    ├── firebase-app-hosting-basics/
    ├── firebase-auth-basics/
    ├── firebase-basics/
    ├── firebase-crashlytics/
    ├── firebase-data-connect/
    ├── firebase-firestore/
    ├── firebase-hosting-basics/
    ├── firebase-remote-config-basics/
    ├── firebase-security-rules-auditor/
    └── xcode-project-setup/
```

---

## `src/` — Application Source Code

```
src/
├── ai/
│   ├── ai-instance.ts     # Genkit instance configured with Google AI / Gemini 2.0 Flash
│   └── dev.ts             # Genkit dev server entry point (empty — no flows)
├── app/
│   ├── favicon.ico        # Browser tab icon
│   ├── globals.css        # Global CSS, Tailwind base layers, CSS custom properties (design tokens)
│   ├── layout.tsx         # Root layout — ThemeProvider, Toaster, Inter font, metadata
│   ├── logo-am.jpg        # Logo image (stored in app dir, also in public/)
│   ├── page.tsx           # Entire portfolio page — all sections, carousels, data arrays
│   └── studio.code-workspace  # VS Code workspace file (Firebase Studio artifact)
├── components/
│   ├── theme-provider.tsx     # Thin wrapper around next-themes ThemeProvider
│   ├── theme-toggle-button.tsx # Sun/Moon button for dark/light toggle
│   └── ui/                    # shadcn/ui component library (31 components)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── tooltip.tsx
├── hooks/
│   ├── use-mobile.tsx     # Hook: returns boolean for viewport < 768px
│   └── use-toast.ts       # Custom toast state manager (Radix Toast integration)
└── lib/
    └── utils.ts           # cn() utility — merges Tailwind classes with conflict resolution
```

---

## `public/` — Static Assets

```
public/
├── Aasim_Malik_Resume.pdf  # Resume PDF — served at /Aasim_Malik_Resume.pdf, linked for download
├── logo-am.png             # AM logo image (referenced in public, also copied in app/)
└── profile.png             # Aasim's profile photo — used in Hero section
```

---

## `docs/` — Documentation

```
docs/
├── blueprint.md            # Original app blueprint from Firebase Studio (resume + design spec)
└── brain/                  # ← YOU ARE HERE — this knowledge system
```

---

## Configuration Files (Root Level)

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config — TS/ESLint build bypasses, remote image domains |
| `tailwind.config.ts` | Tailwind — color tokens, font, animations, custom plugins |
| `tsconfig.json` | TypeScript — strict mode, ES2017 target, `@/*` alias |
| `postcss.config.mjs` | PostCSS plugins for Tailwind |
| `components.json` | shadcn/ui config — style, paths, icon library |
| `package.json` | npm manifest — scripts, dependencies |
| `package-lock.json` | Exact dependency tree lock |
| `.gitignore` | Ignores node_modules, .next, .genkit, build artifacts |
| `studio.json` | Firebase project ID: `aasim-malik-portfolio-dg25v` |
| `skills-lock.json` | Hashes for all installed agent skills |
| `.env` | Environment variables (contains `GOOGLE_GENAI_API_KEY`) — NOT in git |
| `pglite-debug.log` | Empty debug artifact from Firebase Studio scaffolding |
| `unknown_file.txt` | Stray JSX fragment (`-4 w-4" />`) — artifact, safe to delete |

---

## Files That Should Not Be Modified Without Care

| File | Reason |
|------|--------|
| `.env` | Contains API keys — never commit |
| `src/app/globals.css` | Modifying CSS variables affects entire design system |
| `tailwind.config.ts` | Changes affect all component styling |
| `src/components/ui/*.tsx` | shadcn/ui components — re-run `npx shadcn-ui add` to regenerate |
| `package-lock.json` | Auto-managed by npm |
| `skills-lock.json` | Auto-managed by agent skills tooling |

---

## Related Documents

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DEPENDENCY_MAP.md](./DEPENDENCY_MAP.md)
- [CONFIGURATION.md](./CONFIGURATION.md)
