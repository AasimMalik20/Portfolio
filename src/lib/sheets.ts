/**
 * Google Sheets data layer.
 * - Service-account auth (read-only)
 * - Zod validation per row; invalid rows are skipped
 * - visible=FALSE rows filtered out before returning
 * - ISR-cached via unstable_cache with tag 'sheet-data'
 * - Returns empty AllSheetData on any fetch error
 */

import { google } from 'googleapis'
import { z } from 'zod'
import { unstable_cache } from 'next/cache'

// ─── Helpers ────────────────────────────────────────────────────────────────

function isVisible(val: string | undefined | null): boolean {
  if (!val || val.trim() === '') return true
  return val.trim().toUpperCase() !== 'FALSE'
}

function splitComma(s: string | undefined): string[] {
  if (!s) return []
  return s.split(',').map(v => v.trim()).filter(Boolean)
}

function splitNewline(s: string | undefined): string[] {
  if (!s) return []
  return s.split(/\r?\n/).map(v => v.trim()).filter(Boolean)
}

/** Parse a range's rows into objects keyed by header name */
function parseRange(
  values: string[][] | null | undefined,
): Record<string, string>[] {
  if (!values || values.length < 2) return []
  const headers = values[0].map(h => h.trim())
  return values.slice(1).map(row => {
    const obj: Record<string, string> = {}
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? ''
    })
    return obj
  })
}

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const ProjectRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  name: z.string().optional().default(''),
  description: z.string().optional().default(''),
  status: z.enum(['Live', 'In Progress', 'Upcoming', 'Paused']).optional(),
  progress: z.coerce.number().min(0).max(100).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  target_date: z.string().optional(),
  live_url: z.string().optional(),
  repo_url: z.string().optional(),
  demo_url: z.string().optional(),
  tech: z.string().optional(),
  image: z.string().optional(),
  featured: z.string().optional(),
})

const ExperienceRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  company: z.string().optional().default(''),
  role: z.string().optional().default(''),
  start: z.string().optional(),
  end: z.string().optional(),
  location: z.string().optional(),
  bullets: z.string().optional(),
  tech: z.string().optional(),
  logo_url: z.string().optional(),
})

const SkillRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  name: z.string().optional().default(''),
  category: z.string().optional().default(''),
  icon_slug: z.string().optional(),
  level: z.string().optional(),
  years: z.coerce.number().optional(),
})

const CertificationRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  name: z.string().optional().default(''),
  issuer: z.string().optional().default(''),
  date: z.string().optional(),
  credential_url: z.string().optional(),
  badge_url: z.string().optional(),
})

const EducationRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  school: z.string().optional().default(''),
  degree: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  gpa: z.string().optional(),
  logo_url: z.string().optional(),
})

const PostRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  platform: z.enum(['linkedin', 'x', 'reddit']).optional(),
  url: z.string().optional(),
  date: z.string().optional(),
  pinned: z.string().optional(),
})

// ─── Exported Types ───────────────────────────────────────────────────────────

export type Project = {
  order: number
  name: string
  description: string
  status?: 'Live' | 'In Progress' | 'Upcoming' | 'Paused'
  progress?: number
  start_date?: string
  end_date?: string
  target_date?: string
  live_url?: string
  repo_url?: string
  demo_url?: string
  tech: string[]       // parsed from comma-separated
  image?: string
  featured: boolean
}

export type Experience = {
  order: number
  company: string
  role: string
  start?: string
  end?: string
  location?: string
  bullets: string[]    // parsed from newline-separated
  tech: string[]
  logo_url?: string
}

export type Skill = {
  order: number
  name: string
  category: string
  icon_slug?: string
  level?: string
  years?: number
}

export type Certification = {
  order: number
  name: string
  issuer: string
  date?: string
  credential_url?: string
  badge_url?: string
}

export type Education = {
  order: number
  school: string
  degree?: string
  start?: string
  end?: string
  gpa?: string
  logo_url?: string
}

export type Post = {
  order: number
  platform?: 'linkedin' | 'x' | 'reddit'
  url?: string
  date?: string
  pinned: boolean
}

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

const EMPTY_DATA: AllSheetData = {
  projects: [],
  experience: [],
  skills: [],
  certifications: [],
  education: [],
  posts: [],
  contact: {},
  settings: {},
}

// ─── Row Parsers ──────────────────────────────────────────────────────────────

function parseProjects(rows: Record<string, string>[]): Project[] {
  return rows
    .filter(r => isVisible(r.visible))
    .map(r => {
      const parsed = ProjectRowSchema.safeParse(r)
      if (!parsed.success) {
        console.error('[sheets] Invalid project row:', r, parsed.error.format())
        return null
      }
      const d = parsed.data
      return {
        order: d.order ?? 0,
        name: d.name ?? '',
        description: d.description ?? '',
        status: d.status,
        progress: d.progress,
        start_date: d.start_date || undefined,
        end_date: d.end_date || undefined,
        target_date: d.target_date || undefined,
        live_url: d.live_url || undefined,
        repo_url: d.repo_url || undefined,
        demo_url: d.demo_url || undefined,
        tech: splitComma(d.tech),
        image: d.image || undefined,
        featured: d.featured?.toUpperCase() === 'TRUE',
      } satisfies Project
    })
    .filter((p): p is Project => p !== null)
    .sort((a, b) => a.order - b.order)
}

function parseExperience(rows: Record<string, string>[]): Experience[] {
  return rows
    .filter(r => isVisible(r.visible))
    .map(r => {
      const parsed = ExperienceRowSchema.safeParse(r)
      if (!parsed.success) {
        console.error('[sheets] Invalid experience row:', r, parsed.error.format())
        return null
      }
      const d = parsed.data
      return {
        order: d.order ?? 0,
        company: d.company ?? '',
        role: d.role ?? '',
        start: d.start || undefined,
        end: d.end || undefined,
        location: d.location || undefined,
        bullets: splitNewline(d.bullets),
        tech: splitComma(d.tech),
        logo_url: d.logo_url || undefined,
      } satisfies Experience
    })
    .filter((e): e is Experience => e !== null)
    .sort((a, b) => a.order - b.order)
}

function parseSkills(rows: Record<string, string>[]): Skill[] {
  return rows
    .filter(r => isVisible(r.visible))
    .map(r => {
      const parsed = SkillRowSchema.safeParse(r)
      if (!parsed.success) {
        console.error('[sheets] Invalid skill row:', r, parsed.error.format())
        return null
      }
      const d = parsed.data
      return {
        order: d.order ?? 0,
        name: d.name ?? '',
        category: d.category ?? '',
        icon_slug: d.icon_slug || undefined,
        level: d.level || undefined,
        years: d.years,
      } satisfies Skill
    })
    .filter((s): s is Skill => s !== null)
    .sort((a, b) => a.order - b.order)
}

function parseCertifications(rows: Record<string, string>[]): Certification[] {
  return rows
    .filter(r => isVisible(r.visible))
    .map(r => {
      const parsed = CertificationRowSchema.safeParse(r)
      if (!parsed.success) {
        console.error('[sheets] Invalid cert row:', r, parsed.error.format())
        return null
      }
      const d = parsed.data
      return {
        order: d.order ?? 0,
        name: d.name ?? '',
        issuer: d.issuer ?? '',
        date: d.date || undefined,
        credential_url: d.credential_url || undefined,
        badge_url: d.badge_url || undefined,
      } satisfies Certification
    })
    .filter((c): c is Certification => c !== null)
    .sort((a, b) => a.order - b.order)
}

function parseEducation(rows: Record<string, string>[]): Education[] {
  return rows
    .filter(r => isVisible(r.visible))
    .map(r => {
      const parsed = EducationRowSchema.safeParse(r)
      if (!parsed.success) {
        console.error('[sheets] Invalid education row:', r, parsed.error.format())
        return null
      }
      const d = parsed.data
      return {
        order: d.order ?? 0,
        school: d.school ?? '',
        degree: d.degree || undefined,
        start: d.start || undefined,
        end: d.end || undefined,
        gpa: d.gpa || undefined,
        logo_url: d.logo_url || undefined,
      } satisfies Education
    })
    .filter((e): e is Education => e !== null)
    .sort((a, b) => a.order - b.order)
}

function parsePosts(rows: Record<string, string>[]): Post[] {
  return rows
    .filter(r => isVisible(r.visible))
    .map(r => {
      const parsed = PostRowSchema.safeParse(r)
      if (!parsed.success) {
        console.error('[sheets] Invalid post row:', r, parsed.error.format())
        return null
      }
      const d = parsed.data
      return {
        order: d.order ?? 0,
        platform: d.platform,
        url: d.url || undefined,
        date: d.date || undefined,
        pinned: d.pinned?.toUpperCase() === 'TRUE',
      } satisfies Post
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => a.order - b.order)
}

/** Parse Contact and Settings: key/value rows → Record */
function parseKeyValue(rows: Record<string, string>[]): Record<string, string> {
  const result: Record<string, string> = {}
  for (const row of rows) {
    // Support "key" / "value" column names, or first two columns
    const key = (row['key'] || row['Key'] || Object.values(row)[0] || '').trim()
    const val = (row['value'] || row['Value'] || Object.values(row)[1] || '').trim()
    if (key) result[key] = val
  }
  return result
}

// ─── Auth + Fetch ─────────────────────────────────────────────────────────────

async function _fetchAllSheetData(): Promise<AllSheetData> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (!email || !rawKey || !sheetId) {
    console.error('[sheets] Missing required env vars: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID')
    return EMPTY_DATA
  }

  const privateKey = rawKey.replace(/\\n/g, '\n')

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: email,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const TABS = ['Projects', 'Experience', 'Skills', 'Certifications', 'Education', 'Posts', 'Contact', 'Settings']

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: sheetId,
      ranges: TABS,
    })

    const valueRanges = response.data.valueRanges ?? []

    const getRange = (tabName: string): string[][] => {
      const idx = TABS.indexOf(tabName)
      return (valueRanges[idx]?.values as string[][] | undefined) ?? []
    }

    return {
      projects: parseProjects(parseRange(getRange('Projects'))),
      experience: parseExperience(parseRange(getRange('Experience'))),
      skills: parseSkills(parseRange(getRange('Skills'))),
      certifications: parseCertifications(parseRange(getRange('Certifications'))),
      education: parseEducation(parseRange(getRange('Education'))),
      posts: parsePosts(parseRange(getRange('Posts'))),
      contact: parseKeyValue(parseRange(getRange('Contact'))),
      settings: parseKeyValue(parseRange(getRange('Settings'))),
    }
  } catch (err) {
    console.error('[sheets] Failed to fetch sheet data:', err)
    return EMPTY_DATA
  }
}

/**
 * Cached sheet data fetch. Tagged 'sheet-data' for on-demand revalidation.
 * Cache lifetime: 300 s (matches ISR revalidate).
 */
export const fetchAllSheetData = unstable_cache(
  _fetchAllSheetData,
  ['sheet-data'],
  { revalidate: 300, tags: ['sheet-data'] },
)
