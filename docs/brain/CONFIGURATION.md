# Configuration

> **Last Verified**: 2026-11-09

All configuration files in the repository are documented here.

---

## `next.config.ts`

**Path**: `next.config.ts`  
**Purpose**: Next.js framework configuration

```typescript
const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },  // ⚠️ TD-001: suppresses TS errors in build
  eslint: { ignoreDuringBuilds: true },       // ⚠️ TD-002: suppresses ESLint in build
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'placehold.co' },
    ]
  }
}
```

**Key Points**:
- TypeScript and ESLint errors are suppressed — this is technical debt, not intentional design
- Only `picsum.photos` and `placehold.co` are whitelisted as remote image domains (both are placeholder services; may not be needed in production)
- No API routes, no rewrites, no redirects configured

---

## `tailwind.config.ts`

**Path**: `tailwind.config.ts`  
**Purpose**: Tailwind CSS customization

**Custom additions**:
- **Font**: `var(--font-inter)` as the default sans-serif stack
- **Colors**: All tokens map to CSS custom properties (`hsl(var(--...))`) — enables runtime theme switching
- **Border radius**: `lg`, `md`, `sm` derived from `--radius: 0.5rem`
- **Custom keyframe**: `slideLeft` — 0% → -50% translateX in 60s linear infinite (used for both tickers)
- **Custom plugin**: `scrollbar-hide` utility class; `pause` animation utility

**Content scanning**:
```
"./src/pages/**/*.{js,ts,jsx,tsx,mdx}"
"./src/components/**/*.{js,ts,jsx,tsx,mdx}"
"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
```

---

## `tsconfig.json`

**Path**: `tsconfig.json`  
**Purpose**: TypeScript compiler configuration

| Option | Value | Rationale |
|--------|-------|-----------|
| `target` | ES2017 | Broad browser compatibility |
| `strict` | true | Full type safety (though build errors are suppressed) |
| `module` | esnext | Modern ES module output |
| `moduleResolution` | bundler | Optimized for Vite/Turbopack bundlers |
| `jsx` | preserve | Next.js handles JSX transform |
| `incremental` | true | Faster incremental builds |
| `paths` | `@/*` → `./src/*` | Short import alias |

---

## `components.json`

**Path**: `components.json`  
**Purpose**: shadcn/ui CLI configuration — tells the CLI where to put generated components

```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": { "config": "tailwind.config.ts", "css": "src/app/globals.css", "baseColor": "neutral", "cssVariables": true },
  "aliases": { "components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks" },
  "iconLibrary": "lucide"
}
```

**Key Points**:
- `rsc: true` — RSC support enabled
- `baseColor: neutral` — neutral gray base (overridden in `globals.css` with custom grayscale)
- `cssVariables: true` — uses CSS custom properties for theming

---

## `postcss.config.mjs`

**Path**: `postcss.config.mjs`  
**Purpose**: PostCSS plugin chain for CSS processing

Standard Next.js PostCSS config:
```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

---

## `.vscode/launch.json`

**Path**: `.vscode/launch.json`  
**Purpose**: VS Code/Kiro debug configuration

- Debug configuration: "Next.js: debug server-side"
- Runs `npm run dev` on port 9002
- Pre-launch task: `npm-install`

---

## `.vscode/tasks.json`

**Path**: `.vscode/tasks.json`  
**Purpose**: VS Code task definitions

- Task: `npm-install` → runs `npm install` in shell

---

## `.vscode/settings.json`

**Path**: `.vscode/settings.json`  
**Purpose**: Workspace editor settings

```json
{ "workbench.startupEditor": "readme" }
```

Opens README on workspace launch.

---

## `.idx/dev.nix`

**Path**: `.idx/dev.nix`  
**Purpose**: Firebase Project IDX (cloud IDE) environment definition

- Node.js 20 from nixpkgs stable-24.11
- Web preview runs `npm run dev --port $PORT --hostname 0.0.0.0`
- Default open file: `src/app/page.tsx`

---

## Related Documents

- [TECH_STACK.md](./TECH_STACK.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)
- [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md)
