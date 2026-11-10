# Google Sheets Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all hardcoded portfolio content with a private Google Sheets data source, adding ISR, on-demand revalidation, GitHub API enrichment, social post previews, and Framer Motion animations.

**Architecture:** Next.js 15 App Router server component (`app/page.tsx`) fetches all sheet data at build/revalidation time via `lib/sheets.ts` (service-account auth, Zod validation, ISR 300 s). Section components receive typed props and render conditionally. All animations use Framer Motion v11 client components with `prefers-reduced-motion` support.

**Tech Stack:** Next.js 15, React 18, TypeScript strict, Tailwind CSS, shadcn/ui, framer-motion v11, googleapis, google-auth-library, zod (already installed)

**Spec:** `docs/superpowers/specs/2026-11-10-sheets-portfolio-design.md`

## Global Constraints

- Env vars `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `REVALIDATE_SECRET` — server-only, never `NEXT_PUBLIC_`
- `GOOGLE_PRIVATE_KEY`: replace `\\n` with `\n` before use
- `visible=FALSE` rows filtered server-side; never reach client
- `visible` blank → treat as TRUE
- Sort all collections by `order` ASC after filtering
- Invalid Zod rows: skip + `console.error`, do not throw
- Sheet fetch failure: return last Next.js cached data (ISR handles this automatically with `revalidate`)
- `*.json` service-account key files must be in `.gitignore`
- All Framer Motion animations: if `prefers-reduced-motion`, duration → 0 (instant)
- Global rule: render UI element only if data field is non-empty
- ISR `revalidate = 300` on the page fetch
- TypeScript `strict: true` (already set in tsconfig)
- `framer-motion` v11 (not v10)

## Review Focus

- **`GOOGLE_PRIVATE_KEY` newline handling**: `process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')` — test that a key with literal `\n` in the env string authenticates correctly. Covered in Task 1.
- **Blank `visible` treated as TRUE**: rows with empty visible cell must pass filter. Covered in Task 1.
- **ISR cache-on-failure**: if Sheets API returns 5xx mid-deploy, Next.js should serve stale page — do NOT throw from the page component. Covered in Task 1 `fetchAllSheetData` try/catch.
- **`revalidate` route secret leak**: must return 401 with no body detail if secret mismatch. Covered in Task 2.
- **Hero stats hide-if-zero**: a stat that computes to 0 must not render. CountUp component and HeroSection both guard this. Covered in Tasks 3 and 7.

---

## Task 1: Data Layer — `lib/sheets.ts`, `lib/date-utils.ts`, `lib/logo.ts`

**Files:**
- Create: `src/lib/sheets.ts`
- Create: `src/lib/date-utils.ts`
- Create: `src/lib/logo.ts`
- Modify: `.gitignore` (add `*.json` service-account key line)
- Create: `.env.example`

**Interfaces:**
- Produces:
  ```ts
  // date-utils.ts
  export function parseFlexDate(s: string | undefined): Date | null
  export function formatDuration(from: Date, to: Date): string  // "2 yrs 4 mos"
  export function relativeDays(from: Date): string              // "2 days ago"
  
  // logo.ts
  export function deviconUrl(slug: string): string
  export function simpleIconUrl(slug: string): string
  // Component-level: falls back to initials badge
  
  // sheets.ts — all exported types and the main fetch function
  export type Project = { ... }   // matches spec columns
  export type Experience = { ... }
  export type Skill = { ... }
  export type Certification = { ... }
  export type Education = { ... }
  export type Post = { ... }
  export type ContactData = Record<string, string>
  export type SettingsData = Record<string, string>
  export type AllSheetData = {
    projects: Project[]
    experience: Experience[]
    skills: Skill[]
    certifications: Certification[]
    education: Education[]
    posts: Post[]
    contact: ContactData
    settings: SettingsData
  }
  export async function fetchAllSheetData(): Promise<AllSheetData>
  ```

- [ ] **Step 1: Install dependencies**
  ```bash
  npm install googleapis google-auth-library framer-motion@11
  ```

- [ ] **Step 2: Add `*.json` to `.gitignore`**
  Append to existing `.gitignore`:
  ```
  # Service account key files
  *.json
  !package.json
  !package-lock.json
  !tsconfig.json
  !components.json
  !studio.json
  !skills-lock.json
  ```

- [ ] **Step 3: Create `.env.example`**
  ```
  GOOGLE_SHEET_ID=your_sheet_id_here
  GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@your-project.iam.gserviceaccount.com
  GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
  REVALIDATE_SECRET=your_random_secret_here
  ```

- [ ] **Step 4: Write `src/lib/date-utils.ts`**
  - `parseFlexDate(s)`: handles `"Jul 2023"`, `"2024-03"`, `"2023-07-01"`, `"Present"` → returns `Date | null`. `"Present"` → `new Date()`.
  - `formatDuration(from, to)`: computes years + months, returns `"2 yrs 4 mos"` / `"8 mos"` / `"1 yr"` etc.
  - `relativeDays(from)`: returns `"today"`, `"1 day ago"`, `"X days ago"`, `"X months ago"`, `"X years ago"`.

- [ ] **Step 5: Write `src/lib/logo.ts`**
  - `deviconUrl(slug: string): string` → `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`
  - `simpleIconUrl(slug: string): string` → `https://cdn.simpleicons.org/${slug}`
  - Export `DEVICON_OVERRIDES: Record<string, string>` mapping common slugs that are Devicon-only: `{ aws: 'amazonwebservices', azure: 'azure', gcp: 'googlecloud' }`

- [ ] **Step 6: Write `src/lib/sheets.ts`**

  Define Zod schemas for each tab. Key rules:
  - All fields optional (`.optional().default('')` for strings, `.coerce.number().optional()` for numbers)
  - `visible`: `z.string().optional()` — in filter, treat blank/undefined as `true`, only `"FALSE"` (case-insensitive) as false
  - `order`: `z.coerce.number().optional().default(0)`
  - `tech`, `bullets`: split by comma / newline after parse

  Auth: 
  ```ts
  import { google } from 'googleapis'
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  ```

  `fetchAllSheetData()`:
  - Uses `google.sheets({ version: 'v4', auth })` 
  - Calls `spreadsheets.values.batchGet` with ranges `['Projects', 'Experience', 'Skills', 'Certifications', 'Education', 'Posts', 'Contact', 'Settings']`
  - Skips any range named `README`
  - Parse each range: row 0 = headers, rows 1+ = data; build objects by header name (column order independent)
  - Filter `visible !== 'FALSE'` (case-insensitive), sort by `order`
  - Contact/Settings: parse as `Record<string, string>` from key/value rows
  - Wrap entire function body in try/catch; on error: `console.error`, return empty `AllSheetData`
  - Add `export const revalidate = 300` — NOT here (that goes on the page); the fetch itself uses Next.js `cache()` or `unstable_cache`

  Use `import { unstable_cache } from 'next/cache'` to wrap the raw sheets call with a 300 s cache tag `'sheet-data'`.

- [ ] **Step 7: Verify the data layer works locally**
  ```bash
  node -e "const {fetchAllSheetData} = require('./src/lib/sheets.ts'); fetchAllSheetData().then(d => console.log(JSON.stringify(Object.keys(d))))"
  ```
  Or add a temporary `app/api/test-sheets/route.ts` that returns `Response.json(await fetchAllSheetData())`, hit it with `npm run dev`, verify shape.

- [ ] **Step 8: Commit**
  ```bash
  git add src/lib/sheets.ts src/lib/date-utils.ts src/lib/logo.ts .env.example .gitignore
  git commit -m "feat: data layer — sheets fetch, Zod schemas, date utils, logo resolver"
  ```

---

## Task 2: Revalidation API + Apps Script

**Files:**
- Create: `src/app/api/revalidate/route.ts`
- Create: `apps-script/onEdit.js`

**Interfaces:**
- Consumes: `REVALIDATE_SECRET` env var
- Produces: `POST /api/revalidate` → 200 `{revalidated:true}` or 401/405

- [ ] **Step 1: Write `src/app/api/revalidate/route.ts`**
  ```ts
  import { revalidateTag } from 'next/cache'
  import { NextRequest } from 'next/server'

  export async function POST(req: NextRequest) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
      return new Response(null, { status: 401 })
    }
    revalidateTag('sheet-data')
    return Response.json({ revalidated: true, at: new Date().toISOString() })
  }
  ```

- [ ] **Step 2: Write `apps-script/onEdit.js`**
  ```javascript
  // Installable trigger: Extensions → Apps Script → Triggers → onEditTrigger
  // Set Script Properties: PORTFOLIO_REVALIDATE_URL, PORTFOLIO_REVALIDATE_SECRET
  function onEditTrigger() {
    const props = PropertiesService.getScriptProperties()
    const url = props.getProperty('PORTFOLIO_REVALIDATE_URL')
    const secret = props.getProperty('PORTFOLIO_REVALIDATE_SECRET')
    if (!url || !secret) return
    UrlFetchApp.fetch(url, {
      method: 'post',
      headers: { Authorization: 'Bearer ' + secret },
      muteHttpExceptions: true,
    })
  }
  ```

- [ ] **Step 3: Commit**
  ```bash
  git add src/app/api/revalidate/route.ts apps-script/onEdit.js
  git commit -m "feat: on-demand revalidation API + Apps Script trigger"
  ```

---

## Task 3: Shared UI Primitives

**Files:**
- Create: `src/components/CountUp.tsx`
- Create: `src/components/LogoBadge.tsx`
- Create: `src/components/StatusBadge.tsx`
- Create: `src/components/ProgressBar.tsx`

**Interfaces:**
- Produces:
  ```ts
  // CountUp.tsx — 'use client'
  export function CountUp({ to, suffix, duration }: { to: number; suffix?: string; duration?: number }): JSX.Element
  // Animates 0 → to. If prefers-reduced-motion, renders static `to` immediately.

  // LogoBadge.tsx — server-compatible
  export function LogoBadge({ name, logoUrl, iconSlug, size }: {
    name: string; logoUrl?: string; iconSlug?: string; size?: number
  }): JSX.Element
  // Priority: logoUrl → deviconUrl(iconSlug) → simpleIconUrl(iconSlug) → initials badge

  // StatusBadge.tsx
  export function StatusBadge({ status }: { status: 'Live' | 'In Progress' | 'Upcoming' | 'Paused' }): JSX.Element
  // Colored dot (pulsing for 'In Progress') + label

  // ProgressBar.tsx — 'use client'
  export function ProgressBar({ value }: { value: number }): JSX.Element
  // Animates fill from 0 → value on scroll into view. Shows percentage label.
  ```

- [ ] **Step 1: Write `src/components/CountUp.tsx`**
  - `'use client'`
  - Use `useRef`, `useEffect`, `useState`, `useInView` from `framer-motion`
  - Check `window.matchMedia('(prefers-reduced-motion: reduce)')` — if true, skip animation
  - Animate with `framer-motion`'s `useMotionValue` + `useTransform` or a simple `setInterval` from 0 to `to` over `duration` ms (default 1200)
  - Render `{value}{suffix ?? ''}`

- [ ] **Step 2: Write `src/components/LogoBadge.tsx`**
  - Import `deviconUrl`, `simpleIconUrl`, `DEVICON_OVERRIDES` from `@/lib/logo`
  - Render `<img>` for URL-based logos; on error (`onError`), fall through to next source via state
  - Initials badge: first 2 chars of `name`, uppercase, in a `rounded-full` div with `bg-muted text-muted-foreground`
  - `size` prop (default 32px)

- [ ] **Step 3: Write `src/components/StatusBadge.tsx`**
  - Color map: `Live` → green dot, `In Progress` → yellow pulsing dot (`animate-pulse`), `Upcoming` → blue dot, `Paused` → gray dot
  - Small pill: dot + text label

- [ ] **Step 4: Write `src/components/ProgressBar.tsx`**
  - `'use client'`
  - `useInView` from `framer-motion` to trigger animation on scroll
  - `motion.div` with `width` animating from `'0%'` to `'${value}%'`
  - If `prefers-reduced-motion`, render at full width immediately
  - Show percentage as text alongside

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/CountUp.tsx src/components/LogoBadge.tsx src/components/StatusBadge.tsx src/components/ProgressBar.tsx
  git commit -m "feat: shared UI primitives — CountUp, LogoBadge, StatusBadge, ProgressBar"
  ```

---

## Task 4: GitHub Enrichment + Social Preview Utils

**Files:**
- Create: `src/lib/github.ts`
- Create: `src/lib/social-preview.ts`

**Interfaces:**
- Produces:
  ```ts
  // github.ts
  export type GitHubMeta = {
    stars: number
    lastCommit: string  // ISO date string
    languages: Record<string, number>  // lang → bytes
  }
  export async function fetchGitHubMeta(repoUrl: string): Promise<GitHubMeta | null>
  // Returns null on any error (rate limit, 404, network)

  // social-preview.ts
  export type PostPreview = {
    title?: string
    description?: string
    image?: string
    author?: string
    html?: string  // oEmbed html for X
  }
  export async function fetchPostPreview(url: string, platform: string): Promise<PostPreview | null>
  export async function fetchRedditPosts(username: string): Promise<Array<{url: string; title: string; date: string; subreddit: string}>>
  // Returns [] on any error
  ```

- [ ] **Step 1: Write `src/lib/github.ts`**
  - Parse `repoUrl` to extract `owner/repo` (handle `https://github.com/owner/repo`, trailing slashes, `.git`)
  - Fetch `https://api.github.com/repos/${owner}/${repo}` with `next: { revalidate: 300 }` and `User-Agent: portfolio-bot/1.0`
  - Fetch `https://api.github.com/repos/${owner}/${repo}/languages`
  - Combine: `stars` from repo response, `lastCommit` from `pushed_at`, `languages` from language response
  - Wrap each fetch in try/catch; return `null` on any error
  - Use `fetch` directly (not axios) — Next.js `fetch` caching applies

- [ ] **Step 2: Write `src/lib/social-preview.ts`**
  - `fetchPostPreview(url, platform)`:
    - For `x` platform: try `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}` first; on failure, fall through to OG
    - OG meta: fetch `url` with `next: { revalidate: 900 }`, parse `<meta property="og:title">`, `og:description`, `og:image`, `twitter:title` as fallback
    - Return `null` on any error
  - `fetchRedditPosts(username)`:
    - Fetch `https://www.reddit.com/user/${username}/submitted.json?limit=10` with `User-Agent: portfolio-bot/1.0`, `next: { revalidate: 900 }`
    - Parse `data.children[].data` → `{ url, title, created_utc → date, subreddit_name_prefixed }`
    - Return `[]` on any error

- [ ] **Step 3: Commit**
  ```bash
  git add src/lib/github.ts src/lib/social-preview.ts
  git commit -m "feat: GitHub enrichment + social preview utils (fail-silent)"
  ```

---

## Task 5: Projects Section

**Files:**
- Create: `src/components/sections/ProjectsSection.tsx`
- Create: `src/components/ProjectCard.tsx`

**Interfaces:**
- Consumes: `Project[]` from `sheets.ts`, `GitHubMeta | null` per project (enriched in page.tsx)
- Produces: `<ProjectsSection projects={enrichedProjects} />` as a server-compatible component with client sub-components

  ```ts
  export type EnrichedProject = Project & { github?: GitHubMeta | null }
  
  // ProjectCard.tsx — 'use client'
  export function ProjectCard({ project }: { project: EnrichedProject }): JSX.Element

  // ProjectsSection.tsx — server component
  export function ProjectsSection({ projects }: { projects: EnrichedProject[] }): JSX.Element
  ```

- [ ] **Step 1: Write `src/components/ProjectCard.tsx`**
  - `'use client'`
  - Framer Motion: `motion.div` with `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`
  - Render fields only if non-empty:
    - `image` → `<img>` or `<Image>`
    - `name`, `description`
    - `<StatusBadge status={project.status} />`
    - `<ProgressBar value={project.progress} />` only if `progress` is set
    - Date logic: both `start_date` + `end_date` → `"Shipped in X months"` via `formatDuration`; only `start_date` → `"Building for X months"` (from start to today); neither → no date info
    - `tech` badges (comma-split slugs → badge pills)
    - Link buttons (only if URL exists): `live_url` → "Live", `repo_url` → "GitHub", `demo_url` → "Demo"
    - GitHub meta: stars, last commit relative time, top languages (only if `project.github` is not null)

- [ ] **Step 2: Write `src/components/sections/ProjectsSection.tsx`**
  - Server component (no `'use client'`)
  - Split `projects` into: `upcoming = status === 'Upcoming'` and `rest = status !== 'Upcoming'`
  - `rest` renders in a `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` using `<ProjectCard>`
  - `upcoming` renders in a "Coming Soon" subsection: shimmer/pulse cards (`animate-pulse` on bg), countdown to `target_date` if present
  - `featured` projects get a wider card (full-width on mobile, colspan-2 on desktop)
  - Section hidden if both arrays are empty

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/ProjectCard.tsx src/components/sections/ProjectsSection.tsx
  git commit -m "feat: Projects section with GitHub enrichment, progress bars, Coming Soon"
  ```

---

## Task 6: Experience Section

**Files:**
- Create: `src/components/sections/ExperienceSection.tsx`
- Create: `src/components/TimelineEntry.tsx`

**Interfaces:**
- Consumes: `Experience[]` from `sheets.ts`
- Produces: `<ExperienceSection experience={experience} />`

  ```ts
  // TimelineEntry.tsx — 'use client'
  export function TimelineEntry({ entry, isLast }: { entry: Experience; isLast: boolean }): JSX.Element
  ```

- [ ] **Step 1: Write `src/components/TimelineEntry.tsx`**
  - `'use client'`
  - Framer Motion: line draws from top to bottom using `motion.div` with `scaleY` from 0 → 1 on `useInView`; `transformOrigin: 'top'`
  - Left: vertical line with dot; right: card with `company`, `role`, `start`–`end`, `location`, bullets, tech badges, `<LogoBadge>`
  - Auto-compute duration: `parseFlexDate(start)` + `parseFlexDate(end ?? 'Present')` → `formatDuration`
  - "Present" → show pulsing green dot instead of end date
  - Same company with consecutive entries: group visually (no repeated company name/logo — show as "Promoted to X" sub-entry)

- [ ] **Step 2: Write `src/components/sections/ExperienceSection.tsx`**
  - Group `experience` by company (adjacent same-company entries = one block)
  - Render `<TimelineEntry>` for each entry
  - Section hidden if array empty

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/TimelineEntry.tsx src/components/sections/ExperienceSection.tsx
  git commit -m "feat: Experience timeline with animated line-draw and duration calc"
  ```

---

## Task 7: Skills + Certifications + Education Sections

**Files:**
- Create: `src/components/sections/SkillsSection.tsx`
- Create: `src/components/sections/CertificationsSection.tsx`
- Create: `src/components/sections/EducationSection.tsx`

**Interfaces:**
- Consumes: `Skill[]`, `Certification[]`, `Education[]`
- Produces: server components (no `'use client'`) wrapping client animation wrappers

- [ ] **Step 1: Write `src/components/sections/SkillsSection.tsx`**
  - Group skills by `category`
  - For each category: heading + grid of skill cards
  - Skill card: `<LogoBadge iconSlug={skill.icon_slug} name={skill.name}>`, name, optional level/years ring or bar (only if present)
  - Framer Motion (client wrapper): stagger 0.05 s per card on scroll into view
  - Section hidden if array empty

- [ ] **Step 2: Write `src/components/sections/CertificationsSection.tsx`**
  - Badge grid: `<LogoBadge logoUrl={cert.badge_url} name={cert.name}>`, `name`, `issuer`, `date`
  - "Verify" button only if `credential_url` exists (opens in new tab)
  - Staggered grid animation
  - Section hidden if empty

- [ ] **Step 3: Write `src/components/sections/EducationSection.tsx`**
  - Each education entry: `<LogoBadge logoUrl={edu.logo_url} name={edu.school}>`, `school`, `degree`, `start`–`end`, `gpa` — render only non-empty fields
  - Simple fade-in animation
  - Section hidden if empty

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/sections/SkillsSection.tsx src/components/sections/CertificationsSection.tsx src/components/sections/EducationSection.tsx
  git commit -m "feat: Skills, Certifications, Education sections"
  ```

---

## Task 8: Posts Section + Contact + Hero Section

**Files:**
- Create: `src/components/sections/PostsSection.tsx`
- Create: `src/components/sections/ContactSection.tsx`
- Create: `src/components/sections/HeroSection.tsx`

**Interfaces:**
- Consumes: `Post[]` + previews, `ContactData`, `SettingsData`, `AllSheetData` (for hero stats)

  ```ts
  export type EnrichedPost = Post & { preview?: PostPreview | null }
  
  export type HeroStats = {
    shipped?: number
    live?: number
    in_progress?: number
    years?: string
    certs?: number
  }
  
  // HeroSection.tsx — server component wrapping client CountUp
  export function HeroSection({ settings, stats }: { settings: SettingsData; stats: HeroStats }): JSX.Element
  ```

- [ ] **Step 1: Write `src/components/sections/HeroSection.tsx`**
  - Render: `settings.name`, `settings.tagline`, `settings.hero_text`, `settings.location` — each only if non-empty
  - Stats row: for each stat in `{ shipped, live, in_progress, years, certs }`:
    - Hide if value is 0 / empty / undefined
    - Render `<CountUp to={stat} />` (numeric) or static text (years string like "4+")
    - Hide entire stats row if all hidden
  - Resume/download button only if `settings.resume_url` exists (from Contact data passed in)
  - Social buttons from Contact

- [ ] **Step 2: Write `src/components/sections/PostsSection.tsx`**
  - Receive `enrichedPosts: EnrichedPost[]`
  - Sort by date descending, take top 3
  - If none OR newest > 30 days old: show fallback card with `settings.fallback_post_message`
  - Post card: platform icon, preview title/image/description (if available), relative date, link
  - Section hidden if `posts` is empty AND no fallback message

- [ ] **Step 3: Write `src/components/sections/ContactSection.tsx`**
  - Render only links that exist in `ContactData`
  - Use lucide-react icons for known keys (already installed): `Mail`, `Phone`, `Linkedin`, `Github`, `Twitter`, `Globe`, etc.
  - Section hidden if contact is empty

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/sections/HeroSection.tsx src/components/sections/PostsSection.tsx src/components/sections/ContactSection.tsx
  git commit -m "feat: Hero, Posts, Contact sections"
  ```

---

## Task 9: Page Assembly + README

**Files:**
- Modify: `src/app/page.tsx` (full rewrite as server component)
- Create: `README.md` (update/replace)

**Interfaces:**
- Consumes: all sections and lib functions
- Produces: the deployed site

- [ ] **Step 1: Rewrite `src/app/page.tsx` as a server component**
  - Remove `'use client'` directive
  - `export const revalidate = 300`
  - Call `fetchAllSheetData()` — wrapped in try/catch; on error log and use empty data
  - For each project with `repo_url`: call `fetchGitHubMeta(repo_url)` in parallel (`Promise.all`)
  - For each post: call `fetchPostPreview(url, platform)` in parallel
  - Fetch Reddit posts if `settings.reddit_username` exists
  - Merge Reddit posts with `Posts` tab (dedup by URL, sort by date)
  - Compute `HeroStats`:
    - `shipped`: `settings.stats_shipped` ?? projects with `status==='Live'` OR `end_date` set; hide if 0
    - `live`: `settings.stats_live` ?? projects with `status==='Live'`; hide if 0
    - `in_progress`: projects with `status==='In Progress'`; hide if 0 (no settings override for this one)
    - `years`: `settings.stats_years` ?? compute from earliest Experience `start`; hide if falsy
    - `certs`: `settings.stats_certs` ?? count of certifications; hide if 0
  - Render: `<HeroSection>`, `<ExperienceSection>`, `<ProjectsSection>`, `<SkillsSection>`, `<CertificationsSection>`, `<EducationSection>`, `<PostsSection>`, `<ContactSection>` wrapped in a single `<main>`
  - Each section wrapped in a `<section>` with `id` matching nav anchors (keep existing nav structure)
  - Sticky header + nav: keep existing HTML from old `page.tsx`; update nav links to match new section IDs

- [ ] **Step 2: Write README setup section**
  Add to `README.md`:
  ```
  ## Google Sheets Setup
  1. Create a Google Cloud project & enable Sheets API
  2. Create a service account, download JSON key (do NOT commit it)
  3. Share the sheet with the service account email (Viewer)
  4. Copy values from the JSON key into .env.local (see .env.example)
  5. Set env vars in Firebase App Hosting: firebase apphosting:secrets:set <VAR>
  
  ## Sheet Structure
  [link to spec doc]
  
  ## On-Edit Webhook (Apps Script)
  [paste apps-script/onEdit.js instructions]
  
  ## Local Dev
  npm run dev  # port 9002
  
  ## Deploy
  firebase deploy
  ```

- [ ] **Step 3: Run build**
  ```bash
  npm run build
  ```
  Expected: successful build with no type errors (ESLint and TS errors currently suppressed per next.config.ts — fix any new ones that appear)

- [ ] **Step 4: Run typecheck**
  ```bash
  npm run typecheck
  ```

- [ ] **Step 5: Final commit**
  ```bash
  git add src/app/page.tsx README.md
  git commit -m "feat: assemble full Google Sheets-driven portfolio page"
  ```

---

## Task 10: Cleanup & Hardening

**Files:**
- Modify: `next.config.ts` (remove `ignoreBuildErrors: true`, `ignoreDuringBuilds: true`)
- Delete: `unknown_file.txt`, `pglite-debug.log`, `src/app/logo-am.jpg`, `src/app/studio.code-workspace`
- Verify: `.gitignore` covers `.env`, `.env.local`, `*.json` (service account)
- Update: `docs/brain/CHANGELOG.md`

- [ ] **Step 1: Fix next.config.ts**
  Remove `typescript: { ignoreBuildErrors: true }` and `eslint: { ignoreDuringBuilds: true }`. Re-run `npm run build`. Fix any newly surfaced errors.

- [ ] **Step 2: Delete stray files**
  ```bash
  Remove-Item unknown_file.txt, pglite-debug.log
  Remove-Item src\app\logo-am.jpg, "src\app\studio.code-workspace"
  ```

- [ ] **Step 3: Verify .gitignore**
  Confirm `.env`, `.env.local`, and `*.json` are covered.

- [ ] **Step 4: Update brain changelog**
  Add entry to `docs/brain/CHANGELOG.md`.

- [ ] **Step 5: Final commit**
  ```bash
  git add -A
  git commit -m "chore: cleanup stray files, fix build config, update brain docs"
  ```
