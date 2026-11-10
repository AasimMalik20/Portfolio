/**
 * Google Sheets data layer.
 * - Service-account auth (read-only)
 * - Zod validation per row; invalid rows are skipped
 * - visible=FALSE rows filtered out before returning
 * - ISR-cached via unstable_cache with tag 'sheet-data'
 * - Returns empty AllSheetData on any fetch error
 */

import 'server-only'

import { google } from 'googleapis'
import { z } from 'zod'
import { unstable_cache } from 'next/cache'
import { parseFlexDate } from './date-utils'

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
  // New columns
  milestones: z.string().optional(),
  problem: z.string().optional(),
  result_metric: z.string().optional(),
  tools: z.string().optional(),
  demo_video_url: z.string().optional(),
  case_study_slug: z.string().optional(),
  client_type: z.string().optional(),
})

const ServiceRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  name: z.string().optional().default(''),
  description: z.string().optional().default(''),
  icon_slug: z.string().optional(),
  cta_text: z.string().optional(),
  cta_url: z.string().optional(),
})

const CaseStudyRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  slug: z.string().optional().default(''),
  title: z.string().optional().default(''),
  client: z.string().optional().default(''),
  summary: z.string().optional().default(''),
  problem: z.string().optional(),
  solution: z.string().optional(),
  result: z.string().optional(),
  image: z.string().optional(),
  tags: z.string().optional(),
  url: z.string().optional(),
})

const StackRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  name: z.string().optional().default(''),
  category: z.string().optional().default(''),
  icon_slug: z.string().optional(),
  url: z.string().optional(),
})

const TestimonialRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  author: z.string().optional().default(''),
  role: z.string().optional().default(''),
  company: z.string().optional().default(''),
  quote: z.string().optional().default(''),
  avatar_url: z.string().optional(),
  url: z.string().optional(),
})

const ProcessRowSchema = z.object({
  visible: z.string().optional(),
  order: z.coerce.number().optional().default(0),
  step: z.coerce.number().optional().default(0),
  title: z.string().optional().default(''),
  description: z.string().optional().default(''),
  icon_slug: z.string().optional(),
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
  // New columns
  milestones?: string  // raw "A:done; B:todo" string
  computed_progress?: number // derived from milestones unless progress overrides
  problem?: string
  result_metric?: string
  tools: string[]      // parsed from comma-separated
  demo_video_url?: string
  case_study_slug?: string
  client_type?: string
}

export type Service = {
  order: number
  name: string
  description: string
  icon_slug?: string
  cta_text?: string
  cta_url?: string
}

export type CaseStudy = {
  order: number
  slug: string
  title: string
  client: string
  summary: string
  problem?: string
  solution?: string
  result?: string
  image?: string
  tags: string[]
  url?: string
}

export type StackItem = {
  order: number
  name: string
  category: string
  icon_slug?: string
  url?: string
}

export type Testimonial = {
  order: number
  author: string
  role: string
  company: string
  quote: string
  avatar_url?: string
  url?: string
}

export type ProcessStep = {
  order: number
  step: number
  title: string
  description: string
  icon_slug?: string
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

export type HeroStats = {
  shipped?: number
  live?: number
  years?: string
  certs?: number
}

export type AllSheetData = {
  projects: Project[]
  experience: Experience[]
  skills: Skill[]
  certifications: Certification[]
  education: Education[]
  posts: Post[]
  services: Service[]
  caseStudies: CaseStudy[]
  stack: StackItem[]
  testimonials: Testimonial[]
  process: ProcessStep[]
  contact: ContactData
  settings: SettingsData
  stats: HeroStats
}

const EMPTY_DATA: AllSheetData = {
  projects: [],
  experience: [],
  skills: [],
  certifications: [],
  education: [],
  posts: [],
  services: [],
  caseStudies: [],
  stack: [],
  testimonials: [],
  process: [],
  contact: {},
  settings: {},
  stats: {},
}

// ─── Row Parsers ──────────────────────────────────────────────────────────────

/** Parse "A:done; B:todo; C:done" → fraction done */
function parseMilestoneProgress(raw: string | undefined): number | undefined {
  if (!raw?.trim()) return undefined
  const steps = raw.split(';').map(s => s.trim()).filter(Boolean)
  if (steps.length === 0) return undefined
  const done = steps.filter(s => s.toLowerCase().endsWith(':done')).length
  return Math.round((done / steps.length) * 100)
}

function parseProjects(rows: Record<string, string>[]): Project[] {
  const result: Project[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = ProjectRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid project row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    // Progress: manual override wins; else derive from milestones
    const milestoneProgress = parseMilestoneProgress(d.milestones)
    const effectiveProgress = d.progress !== undefined ? d.progress : milestoneProgress
    result.push({
      order: d.order ?? 0,
      name: d.name ?? '',
      description: d.description ?? '',
      status: d.status,
      progress: effectiveProgress,
      start_date: d.start_date || undefined,
      end_date: d.end_date || undefined,
      target_date: d.target_date || undefined,
      live_url: d.live_url || undefined,
      repo_url: d.repo_url || undefined,
      demo_url: d.demo_url || undefined,
      tech: splitComma(d.tech),
      image: d.image || undefined,
      featured: d.featured?.toUpperCase() === 'TRUE',
      milestones: d.milestones || undefined,
      computed_progress: milestoneProgress,
      problem: d.problem || undefined,
      result_metric: d.result_metric || undefined,
      tools: splitComma(d.tools),
      demo_video_url: d.demo_video_url || undefined,
      case_study_slug: d.case_study_slug || undefined,
      client_type: d.client_type || undefined,
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

function parseServices(rows: Record<string, string>[]): Service[] {
  const result: Service[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = ServiceRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid service row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    result.push({
      order: d.order ?? 0,
      name: d.name ?? '',
      description: d.description ?? '',
      icon_slug: d.icon_slug || undefined,
      cta_text: d.cta_text || undefined,
      cta_url: d.cta_url || undefined,
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

function parseCaseStudies(rows: Record<string, string>[]): CaseStudy[] {
  const result: CaseStudy[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = CaseStudyRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid case study row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    result.push({
      order: d.order ?? 0,
      slug: d.slug ?? '',
      title: d.title ?? '',
      client: d.client ?? '',
      summary: d.summary ?? '',
      problem: d.problem || undefined,
      solution: d.solution || undefined,
      result: d.result || undefined,
      image: d.image || undefined,
      tags: splitComma(d.tags),
      url: d.url || undefined,
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

function parseStack(rows: Record<string, string>[]): StackItem[] {
  const result: StackItem[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = StackRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid stack row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    result.push({
      order: d.order ?? 0,
      name: d.name ?? '',
      category: d.category ?? '',
      icon_slug: d.icon_slug || undefined,
      url: d.url || undefined,
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

function parseTestimonials(rows: Record<string, string>[]): Testimonial[] {
  const result: Testimonial[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = TestimonialRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid testimonial row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    result.push({
      order: d.order ?? 0,
      author: d.author ?? '',
      role: d.role ?? '',
      company: d.company ?? '',
      quote: d.quote ?? '',
      avatar_url: d.avatar_url || undefined,
      url: d.url || undefined,
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

function parseProcess(rows: Record<string, string>[]): ProcessStep[] {
  const result: ProcessStep[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = ProcessRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid process row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    result.push({
      order: d.order ?? 0,
      step: d.step ?? 0,
      title: d.title ?? '',
      description: d.description ?? '',
      icon_slug: d.icon_slug || undefined,
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

function parseExperience(rows: Record<string, string>[]): Experience[] {
  const result: Experience[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = ExperienceRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid experience row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    result.push({
      order: d.order ?? 0,
      company: d.company ?? '',
      role: d.role ?? '',
      start: d.start || undefined,
      end: d.end || undefined,
      location: d.location || undefined,
      bullets: splitNewline(d.bullets),
      tech: splitComma(d.tech),
      logo_url: d.logo_url || undefined,
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

function parseSkills(rows: Record<string, string>[]): Skill[] {
  const result: Skill[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = SkillRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid skill row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    result.push({
      order: d.order ?? 0,
      name: d.name ?? '',
      category: d.category ?? '',
      icon_slug: d.icon_slug || undefined,
      level: d.level || undefined,
      years: d.years,
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

function parseCertifications(rows: Record<string, string>[]): Certification[] {
  const result: Certification[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = CertificationRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid cert row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    result.push({
      order: d.order ?? 0,
      name: d.name ?? '',
      issuer: d.issuer ?? '',
      date: d.date || undefined,
      credential_url: d.credential_url || undefined,
      badge_url: d.badge_url || undefined,
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

function parseEducation(rows: Record<string, string>[]): Education[] {
  const result: Education[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = EducationRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid education row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    result.push({
      order: d.order ?? 0,
      school: d.school ?? '',
      degree: d.degree || undefined,
      start: d.start || undefined,
      end: d.end || undefined,
      gpa: d.gpa || undefined,
      logo_url: d.logo_url || undefined,
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

function parsePosts(rows: Record<string, string>[]): Post[] {
  const result: Post[] = []
  for (const r of rows) {
    if (!isVisible(r.visible)) continue
    const parsed = PostRowSchema.safeParse(r)
    if (!parsed.success) {
      console.error('[sheets] Invalid post row:', r, parsed.error.format())
      continue
    }
    const d = parsed.data
    result.push({
      order: d.order ?? 0,
      platform: d.platform,
      url: d.url || undefined,
      date: d.date || undefined,
      pinned: d.pinned?.toUpperCase() === 'TRUE',
    })
  }
  return result.sort((a, b) => a.order - b.order)
}

/** Compute Hero stats from visible rows with Settings overrides */
export function computeHeroStats(
  projects: Project[],
  experience: Experience[],
  certifications: Certification[],
  settings: SettingsData,
): HeroStats {
  // 1. Shipped: status === 'Live' OR has end_date
  const autoShipped = projects.filter(p => p.status === 'Live' || !!p.end_date).length
  const shippedOverride = settings['stats_shipped']?.trim()
  const shipped = shippedOverride ? parseInt(shippedOverride, 10) : autoShipped

  // 2. Live: status === 'Live'
  const autoLive = projects.filter(p => p.status === 'Live').length
  const liveOverride = settings['stats_live']?.trim()
  const live = liveOverride ? parseInt(liveOverride, 10) : autoLive

  // 3. Years: earliest Experience start date -> today (format like "2+")
  let autoYears = ''
  const validDates = experience
    .map(e => parseFlexDate(e.start))
    .filter((d): d is Date => d !== null)
  if (validDates.length > 0) {
    const earliest = new Date(Math.min(...validDates.map(d => d.getTime())))
    const diffYears = (Date.now() - earliest.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    autoYears = `${Math.max(1, Math.floor(diffYears))}+`
  }
  const yearsOverride = settings['stats_years']?.trim()
  const years = yearsOverride || autoYears

  // 4. Certs: visible Certifications count
  const autoCerts = certifications.length
  const certsOverride = settings['stats_certs']?.trim()
  const certs = certsOverride ? parseInt(certsOverride, 10) : autoCerts

  const stats: HeroStats = {}
  // Hide any stat that is 0 or empty
  if (shipped && !isNaN(shipped) && shipped > 0) stats.shipped = shipped
  if (live && !isNaN(live) && live > 0) stats.live = live
  if (years && years !== '0' && years !== '0+') stats.years = years
  if (certs && !isNaN(certs) && certs > 0) stats.certs = certs

  return stats
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

    const TABS = [
      'Projects', 'Experience', 'Skills', 'Certifications', 'Education', 'Posts',
      'Services', 'CaseStudies', 'Stack', 'Testimonials', 'Process',
      'Contact', 'Settings',
    ]

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: sheetId,
      ranges: TABS,
    })

    const valueRanges = response.data.valueRanges ?? []

    const getRange = (tabName: string): string[][] => {
      const idx = TABS.indexOf(tabName)
      return (valueRanges[idx]?.values as string[][] | undefined) ?? []
    }

    const projects = parseProjects(parseRange(getRange('Projects')))
    const experience = parseExperience(parseRange(getRange('Experience')))
    const skills = parseSkills(parseRange(getRange('Skills')))
    const certifications = parseCertifications(parseRange(getRange('Certifications')))
    const education = parseEducation(parseRange(getRange('Education')))
    const posts = parsePosts(parseRange(getRange('Posts')))
    const services = parseServices(parseRange(getRange('Services')))
    const caseStudies = parseCaseStudies(parseRange(getRange('CaseStudies')))
    const stack = parseStack(parseRange(getRange('Stack')))
    const testimonials = parseTestimonials(parseRange(getRange('Testimonials')))
    const process = parseProcess(parseRange(getRange('Process')))
    const contact = parseKeyValue(parseRange(getRange('Contact')))
    const settings = parseKeyValue(parseRange(getRange('Settings')))
    const stats = computeHeroStats(projects, experience, certifications, settings)

    return {
      projects,
      experience,
      skills,
      certifications,
      education,
      posts,
      services,
      caseStudies,
      stack,
      testimonials,
      process,
      contact,
      settings,
      stats,
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
