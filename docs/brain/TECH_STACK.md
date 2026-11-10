# Technology Stack

> **Last Verified**: 2026-11-09  
> **Source**: `package.json`, `tailwind.config.ts`, `tsconfig.json`, `components.json`, `next.config.ts`

---

## Core Framework

| Technology | Version | Role |
|-----------|---------|------|
| **Next.js** | 15.2.8 | React framework, App Router, SSR/CSR, image optimization |
| **React** | 18.3.1 | UI rendering library |
| **React DOM** | 18.3.1 | DOM bindings for React |
| **TypeScript** | ^5 | Static typing across the codebase |

---

## Styling

| Technology | Version | Role |
|-----------|---------|------|
| **Tailwind CSS** | ^3.4.1 | Utility-first CSS framework |
| **tailwindcss-animate** | ^1.0.7 | Animation utilities for Tailwind (accordion, etc.) |
| **class-variance-authority (CVA)** | ^0.7.1 | Component variant management for shadcn/ui |
| **clsx** | ^2.1.1 | Conditional class merging |
| **tailwind-merge** | ^3.0.1 | Smart merging of Tailwind classes (avoids conflicts) |
| **PostCSS** | ^8 | CSS processing pipeline for Tailwind |

---

## UI Components

| Technology | Version | Role |
|-----------|---------|------|
| **shadcn/ui** | N/A (code-generated) | Component collection built on Radix UI primitives |
| **@radix-ui/react-accordion** | ^1.2.3 | Accessible accordion primitive |
| **@radix-ui/react-alert-dialog** | ^1.1.6 | Accessible modal alert dialog |
| **@radix-ui/react-avatar** | ^1.1.3 | Avatar with fallback |
| **@radix-ui/react-checkbox** | ^1.1.4 | Accessible checkbox |
| **@radix-ui/react-dialog** | ^1.1.6 | Accessible dialog/modal |
| **@radix-ui/react-dropdown-menu** | ^2.1.6 | Dropdown menu |
| **@radix-ui/react-label** | ^2.1.2 | Accessible label |
| **@radix-ui/react-menubar** | ^1.1.6 | Menubar |
| **@radix-ui/react-popover** | ^1.1.6 | Popover overlay |
| **@radix-ui/react-progress** | ^1.1.2 | Progress indicator |
| **@radix-ui/react-radio-group** | ^1.2.3 | Radio button group |
| **@radix-ui/react-scroll-area** | ^1.2.3 | Scrollable area with custom scrollbar |
| **@radix-ui/react-select** | ^2.1.6 | Accessible select/combobox |
| **@radix-ui/react-separator** | ^1.1.2 | Visual separator |
| **@radix-ui/react-slider** | ^1.2.3 | Range slider |
| **@radix-ui/react-slot** | ^1.1.2 | Slot pattern for component composition |
| **@radix-ui/react-switch** | ^1.1.3 | Toggle switch |
| **@radix-ui/react-tabs** | ^1.1.3 | Tab panels |
| **@radix-ui/react-toast** | ^1.2.6 | Toast notifications |
| **@radix-ui/react-tooltip** | ^1.1.8 | Tooltips |
| **lucide-react** | ^0.475.0 | SVG icon library (>1000 icons) |

---

## Theme

| Technology | Version | Role |
|-----------|---------|------|
| **next-themes** | ^0.3.0 | Dark/light/system theme management with SSR support |

---

## Forms & Validation (Installed, Not Used in Current Page)

| Technology | Version | Role |
|-----------|---------|------|
| **react-hook-form** | ^7.54.2 | Form state management |
| **@hookform/resolvers** | ^4.1.3 | Validation schema adapters for react-hook-form |
| **zod** | ^3.24.2 | Schema validation library |

> ⚠️ These are installed as dependencies but the current `page.tsx` has no form — the contact section uses direct mailto/social links. These would be used if a contact form is added.

---

## Data Visualization (Installed, Not Used)

| Technology | Version | Role |
|-----------|---------|------|
| **recharts** | ^2.15.1 | Chart library for React |
| **date-fns** | ^3.6.0 | Date utility library |
| **react-day-picker** | ^8.10.1 | Date picker component |

> ⚠️ Installed as part of Firebase Studio scaffolding, not currently used in the portfolio page.

---

## AI / Genkit

| Technology | Version | Role |
|-----------|---------|------|
| **genkit** | ^1.0.4 | Google's open-source AI orchestration framework |
| **@genkit-ai/googleai** | ^1.0.4 | Google AI (Gemini) plugin for Genkit |
| **@genkit-ai/next** | ^1.0.4 | Next.js integration for Genkit flows |
| **genkit-cli** | ^1.0.4 | Dev CLI for running/inspecting Genkit flows |

> ⚠️ The Genkit instance is configured in `src/ai/ai-instance.ts` targeting Gemini 2.0 Flash. No flows are currently defined.

---

## Firebase

| Technology | Version | Role |
|-----------|---------|------|
| **firebase** | ^11.3.0 | Firebase client SDK |

> ⚠️ The Firebase SDK is installed but not imported anywhere in the current codebase. It is likely a scaffold dependency for future Firebase features (Firestore, Auth, etc.).

---

## Data & State

| Technology | Version | Role |
|-----------|---------|------|
| **@tanstack/react-query** | ^5.66.0 | Server state management (not currently used) |
| **@tanstack-query-firebase/react** | ^1.0.5 | React Query adapter for Firebase (not currently used) |

---

## Development Tools

| Technology | Version | Role |
|-----------|---------|------|
| **patch-package** | ^8.0.0 | Patching node_modules (no patches currently active) |
| **@types/node** | ^20 | TypeScript types for Node.js |
| **@types/react** | ^18 | TypeScript types for React |
| **@types/react-dom** | ^18 | TypeScript types for React DOM |

---

## Build & Tooling

| Tool | Configuration | Notes |
|------|--------------|-------|
| **Turbopack** | `next dev --turbopack` | Used in dev mode for faster HMR |
| **TypeScript** | `tsconfig.json` — strict mode, `ES2017` target | `ignoreBuildErrors: true` in next.config.ts (⚠️ tech debt) |
| **ESLint** | `ignoreDuringBuilds: true` in next.config.ts | ⚠️ Linting bypassed during builds |
| **Inter font** | `next/font/google` | Self-hosted via Next.js font optimization |
| **next/image** | Built-in | Remote patterns: picsum.photos, placehold.co |

---

## Runtime Environment

| Environment | Detail |
|-------------|--------|
| Node.js | 20 (defined in `.idx/dev.nix`) |
| Dev server port | 9002 (`npm run dev`) |
| Module resolution | `bundler` (TypeScript) |
| Path aliases | `@/*` → `./src/*` |

---

## Related Documents

- [DEPENDENCY_MAP.md](./DEPENDENCY_MAP.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [CONFIGURATION.md](./CONFIGURATION.md)
- [rules/DEPENDENCY_RULES.md](./rules/DEPENDENCY_RULES.md)
