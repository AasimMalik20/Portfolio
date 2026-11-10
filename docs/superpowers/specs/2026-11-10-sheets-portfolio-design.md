# Design Doc: Google Sheets-Driven Portfolio

**Date:** 2026-11-10  
**Status:** Approved

---

## Intent & Why

Replace all hardcoded portfolio content in `src/app/page.tsx` with a live Google Sheets data source. Content is edited in the spreadsheet; the site auto-updates within 5 minutes via ISR + an on-edit webhook. The portfolio becomes maintainable without code changes for any content update.

---

## Goals

- Private Google Sheet (service account, read-only) as the single source of truth for all content
- ISR at 300 s with on-demand revalidation via POST `/api/revalidate`
- Server-only data fetching — nothing from the sheet reaches the client bundle except shaped, visible-only props
- Full-rewrite of `page.tsx`; site is a single scrollable page (existing architecture preserved)
- Framer Motion animations: scroll-reveal, count-up stats, timeline line-draw (visual theme deferred to later pass)
- Lighthouse > 90, dark mode default, `prefers-reduced-motion` respected

---

## Non-goals

- Visual theme redesign (colours, fonts) — deferred
- CMS admin UI
- User authentication / protected pages
- Editing the sheet from the site

---

## Anti-goals

- Any sheet data reaching client-side JS before it is filtered for `visible=TRUE`
- Public API key or publicly shared sheet
- Showing "0", "N/A", or empty containers — collapse all UI if data absent

---

## Approach Chosen

**Full rewrite in one branch** (option B). The user confirmed this over the incremental approach. All sections are rebuilt at once; the site is non-functional mid-work but is deployed once all sections are complete. This matches the spec's "work in small steps" delivery in code commit granularity, not deployment granularity.

---

## Constraints

- Next.js 15.2.8, App Router, React 18, TypeScript strict
- `google-auth-library` + `googleapis` for Sheets API v4, scope `spreadsheets.readonly`
- Env vars (server-only): `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `REVALIDATE_SECRET`
- `GOOGLE_PRIVATE_KEY`: handle `\\n` → real newlines
- Zod validation of every sheet row; invalid rows are skipped (logged server-side), not thrown
- `visible` blank = TRUE; `visible=FALSE` rows never reach client
- Sort all tabs by `order` ascending after filtering
- ISR `revalidate = 300`; on-demand via POST `/api/revalidate` checking `Authorization: Bearer <REVALIDATE_SECRET>`
- If sheet fetch fails, serve last ISR-cached page; never a broken page
- `*.json` service account key files in `.gitignore`
- `prefers-reduced-motion`: all animations skip/fade only
- Framer Motion already NOT in package.json — must be added
- `framer-motion` v11 (latest stable at time of writing)

---

## Sheet Tabs & Columns (fixed header names, order may vary)

### Projects
`visible, order, name, description, status (Live|In Progress|Upcoming|Paused), progress (0-100), start_date, end_date, target_date, live_url, repo_url, demo_url, tech (comma slugs), image, featured`

### Experience
`visible, order, company, role, start, end, location, bullets (newline-separated), tech, logo_url`

### Skills
`visible, order, name, category, icon_slug, level, years`

### Certifications
`visible, order, name, issuer, date, credential_url, badge_url`

### Education
`visible, order, school, degree, start, end, gpa, logo_url`

### Posts
`visible, order, platform (linkedin|x|reddit), url, date, pinned`

### Contact
Key/value rows: `email, phone, linkedin, github, x, reddit, leetcode, medium, youtube, instagram, website, resume_url`

### Settings
Key/value rows: `name, tagline, hero_text, location, github_username, reddit_username, fallback_post_message, theme_accent, stats_shipped, stats_live, stats_years, stats_certs`

---

## Hero Stats Logic

Defaults (computed from visible rows only):
- `shipped` = Projects where `status=Live` OR `end_date` is set
- `live` = Projects where `status=Live`
- `in_progress` = Projects where `status=In Progress`
- `years` = earliest Experience `start` date → today (e.g. `"4+"`)
- `certs` = count of visible Certifications rows

Override: if `Settings` has `stats_shipped` / `stats_live` / `stats_years` / `stats_certs` with a non-empty value, use it instead.

Hide any stat whose final value is 0 or empty. Hide the stats row if all stats hidden.

---

## GitHub API Enrichment (Projects)

For each project with `repo_url` pointing to a GitHub repo:
- Server-side fetch (in `lib/sheets.ts` or `lib/github.ts`)
- Endpoints: `/repos/{owner}/{repo}` (stars, last push), `/repos/{owner}/{repo}/languages`
- Cache: Next.js fetch cache, 300 s
- Fail silently: if rate-limited or 404, omit GitHub fields; project still renders

---

## OG / oEmbed Preview (Posts)

For each non-Reddit post URL:
- Server-side fetch OG meta tags (`og:title`, `og:description`, `og:image`)
- X/Twitter: also try `https://publish.twitter.com/oembed?url=<url>` for richer preview
- Cache 15 min
- Fail silently: if fetch fails, render the post URL/platform/date only

For Reddit:
- Fetch `https://www.reddit.com/user/<reddit_username>/submitted.json?limit=10` with `User-Agent: portfolio-bot/1.0`
- Cache 15 min
- Merge with Posts tab entries (dedup by URL)
- Fail silently

Show 3 most recent posts across all platforms. If none, or newest > 30 days old, show fallback card using `Settings.fallback_post_message`.

---

## Logo Resolution (Skills / Experience / Education)

Priority order for icon/logo:
1. `logo_url` or `icon_slug` as a full URL → use directly
2. Try Devicon: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{slug}/{slug}-original.svg`
3. Try Simple Icons: `https://cdn.simpleicons.org/{slug}`
4. Fallback: initials badge (first 2 chars of name, themed background)

Known gaps: AWS, Azure, GCP — use Devicon (`amazonwebservices`, `azure`, `googlecloud`).

---

## Animations (Framer Motion)

- **Scroll reveal**: sections fade + slide up on enter viewport (`useInView`)
- **Staggered grids**: Skills, Certs, Education cards stagger 0.05 s per item
- **Count-up**: Hero stats animate from 0 to final value over 1.2 s on first viewport entry
- **Timeline line-draw**: Experience section vertical line draws from top to bottom on scroll
- **Magnetic buttons**: CTA buttons have subtle cursor-tracking tilt
- **Hero animated stats**: computed from data, count-up on scroll
- **Shimmer/pulse**: Upcoming project cards
- **Status dot**: pulsing dot for `In Progress`

All animations: if `prefers-reduced-motion`, play instantly (duration → 0) or skip.

---

## File Map

```
src/
  lib/
    sheets.ts          # Service-account auth, fetch all tabs, Zod parse, cache
    github.ts          # GitHub API enrichment, fail-silent
    social-preview.ts  # OG/oEmbed fetch, Reddit fetch, fail-silent
    logo.ts            # Logo/icon URL resolver
    date-utils.ts      # Flexible date parse, duration calc
  app/
    page.tsx           # Server component, fetches all data, passes to section components
    layout.tsx         # Unchanged
    globals.css        # Unchanged (theme vars stay)
    api/
      revalidate/
        route.ts       # POST handler, checks Bearer REVALIDATE_SECRET
  components/
    sections/
      HeroSection.tsx
      ExperienceSection.tsx
      ProjectsSection.tsx
      SkillsSection.tsx
      CertificationsSection.tsx
      EducationSection.tsx
      PostsSection.tsx
      ContactSection.tsx
    ui/                # Existing shadcn/ui components (unchanged)
    theme-provider.tsx # Unchanged
    theme-toggle-button.tsx # Unchanged
    LogoBadge.tsx      # Initials fallback badge
    CountUp.tsx        # Animated counter (client component)
    TimelineEntry.tsx  # Experience timeline item (client component)
    ProjectCard.tsx    # Project card with GitHub enrichment
    StatusBadge.tsx    # Colored dot + label
    ProgressBar.tsx    # Animated progress fill
```

---

## Apps Script Snippet

```javascript
// In Google Apps Script bound to the sheet
// Set PORTFOLIO_REVALIDATE_URL and PORTFOLIO_REVALIDATE_SECRET in Script Properties

function onEditTrigger(e) {
  const props = PropertiesService.getScriptProperties();
  const url = props.getProperty('PORTFOLIO_REVALIDATE_URL'); // e.g. https://your-site.com/api/revalidate
  const secret = props.getProperty('PORTFOLIO_REVALIDATE_SECRET');
  if (!url || !secret) return;
  UrlFetchApp.fetch(url, {
    method: 'post',
    headers: { Authorization: 'Bearer ' + secret },
    muteHttpExceptions: true,
  });
}
```

Install as: Extensions → Apps Script → Triggers → onEditTrigger → From spreadsheet → On edit (installable trigger, not simple).

---

## Deliverables Checklist

- [x] Design doc (this file)
- [ ] `lib/sheets.ts`
- [ ] `lib/github.ts`
- [ ] `lib/social-preview.ts`
- [ ] `lib/logo.ts`
- [ ] `lib/date-utils.ts`
- [ ] `app/api/revalidate/route.ts`
- [ ] `app/page.tsx` (server component)
- [ ] All section components
- [ ] `components/CountUp.tsx`, `LogoBadge.tsx`, `StatusBadge.tsx`, `ProgressBar.tsx`, `TimelineEntry.tsx`, `ProjectCard.tsx`
- [ ] `.env.example`
- [ ] `apps-script/onEdit.js`
- [ ] README setup steps
