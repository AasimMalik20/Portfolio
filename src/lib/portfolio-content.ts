import type { CaseStudy, Project, Testimonial } from './sheets'

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

export function selectTopRows<T extends { order: number }>(
  rows: readonly T[],
  limit: number,
): T[] {
  return [...rows]
    .sort((a, b) => a.order - b.order)
    .slice(0, Math.max(0, limit))
}

export function selectCaseStudies(rows: readonly CaseStudy[]): CaseStudy[] {
  const meaningful = rows.filter(isMeaningfulCaseStudy)
  return selectTopRows(meaningful, 3)
}

export function excludeCaseStudyProjects(
  projects: readonly Project[],
  caseStudies: readonly CaseStudy[],
): Project[] {
  const caseStudySlugs = new Set(
    caseStudies
      .map(caseStudy => caseStudy.slug.trim().toLowerCase())
      .filter(Boolean),
  )

  return projects.filter(project =>
    !project.case_study_slug ||
    !caseStudySlugs.has(project.case_study_slug.trim().toLowerCase()),
  )
}
