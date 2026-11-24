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
    const findColumn = (name: string): string => {
      const entry = Object.entries(row).find(
        ([column]) => column.trim().toLowerCase() === name,
      )
      return entry?.[1] ?? ''
    }

    const firstValues = Object.values(row)
    const key = (
      findColumn('key') || firstValues[0] || ''
    ).trim()
    const value = (
      findColumn('value') || firstValues[1] || ''
    ).trim()
    const visible = findColumn('visible')

    if (key && isVisible(visible)) {
      result[key] = value
    }
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
  return posts.some(post => post.url?.trim()) || !!redditUsername?.trim()
}

export function mergePosts<T extends { url: string; timestamp: number }>(
  posts: readonly T[],
): T[] {
  const seenUrls = new Set<string>()
  return posts
    .filter(post => {
      if (seenUrls.has(post.url)) return false
      seenUrls.add(post.url)
      return true
    })
    .sort((a, b) => b.timestamp - a.timestamp)
}

export function selectCaseStudies(rows: readonly CaseStudy[]): CaseStudy[] {
  return rows
    .filter(isMeaningfulCaseStudy)
    .sort((a, b) => a.order - b.order)
}
