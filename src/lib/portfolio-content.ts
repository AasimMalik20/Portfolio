import type { CaseStudy, Post, Project, Testimonial } from './sheets'

export function isVisible(value: string | undefined | null): boolean {
  if (!value || value.trim() === '') return true
  return value.trim().toUpperCase() !== 'FALSE'
}

export function parseVisibleKeyValueRows(
  rows: readonly Record<string, string>[],
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const row of rows) {
    const findColumn = (name: string): { found: boolean; value: string } => {
      const entry = Object.entries(row).find(
        ([column]) => column.trim().toLowerCase() === name,
      )
      return { found: entry !== undefined, value: entry?.[1] ?? '' }
    }

    const firstValues = Object.values(row)
    const keyColumn = findColumn('key')
    const valueColumn = findColumn('value')
    const key = (keyColumn.found ? keyColumn.value : firstValues[0] ?? '').trim()
    const value = (
      keyColumn.found || valueColumn.found
        ? valueColumn.value
        : firstValues[1] ?? ''
    ).trim()
    const visible = findColumn('visible').value

    if (!key || !isVisible(visible)) continue
    if (!value) {
      console.warn(`[sheets] Key/value row is missing a value for key: ${key}`)
      continue
    }

    result[key] = value
  }

  return result
}

export function filterUsableTestimonials(
  testimonials: readonly Testimonial[],
): Testimonial[] {
  return testimonials.filter(
    testimonial => testimonial.author.trim() && testimonial.quote.trim(),
  )
}

export function isMeaningfulCaseStudy(
  caseStudy: Pick<CaseStudy, 'title' | 'summary' | 'problem' | 'solution' | 'result'>,
): boolean {
  return Boolean(
    caseStudy.title.trim() &&
    [caseStudy.summary, caseStudy.problem, caseStudy.solution, caseStudy.result]
      .some(value => value?.trim()),
  )
}

export function selectProjects(projects: readonly Project[]): Project[] {
  return projects.filter(project => project.name.trim())
}

export function shouldShowPosts(posts: readonly Post[], redditUsername?: string): boolean {
  return posts.some(post => post.url?.trim())
}

export function mergePosts<T extends { url: string; timestamp: number }>(
  posts: readonly T[],
): T[] {
  return [...posts].sort((a, b) => b.timestamp - a.timestamp)
}

export function isExternalLink(url: string): boolean {
  const trimmed = url.trim()
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('/') || trimmed.startsWith('?')) {
    return false
  }
  return /^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed) || /^tel:/i.test(trimmed)
}

export const isExternalUrl = isExternalLink

export function isValidHttpUrl(url: string | undefined | null): boolean {
  if (!url?.trim()) return false
  try {
    const parsed = new URL(url.trim())
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export function getRequiredHttpLinkIssues(
  links: Readonly<Record<string, string>>,
  requiredKeys: readonly string[],
): { key: string; issue: 'missing' | 'invalid' }[] {
  const issues: { key: string; issue: 'missing' | 'invalid' }[] = []
  for (const key of requiredKeys) {
    const raw = links[key]?.trim()
    if (!raw) issues.push({ key, issue: 'missing' })
    else if (!isValidHttpUrl(raw)) issues.push({ key, issue: 'invalid' })
  }
  return issues
}

export function isValidContactLink(key: string, raw: string | undefined | null): boolean {
  const value = raw?.trim()
  if (!value) return false
  if (value.startsWith('#') || value.startsWith('/')) return true
  if (key === 'email') return /^mailto:[^\s]+@[^\s]+$|^[^\s]+@[^\s]+$/i.test(value)
  if (key === 'phone') return /^[+\d()[\]\s.-]+$/.test(value) && /\d/.test(value)
  if (/^https?:\/\//i.test(value)) return isValidHttpUrl(value)
  return /^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(value)
}

export function sortBySheetOrder<T extends { order: number }>(rows: readonly T[]): T[] {
  return [...rows].sort((a, b) => a.order - b.order)
}

export function selectCaseStudies(rows: readonly CaseStudy[]): CaseStudy[] {
  return rows
    .filter(isMeaningfulCaseStudy)
    .sort((a, b) => a.order - b.order)
}
