/**
 * Flexible date parsing and formatting utilities.
 * Handles: "Jul 2023", "2024-03", "2023-07-01", "Present", ISO strings.
 */

const MONTH_NAMES: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  january: 0, february: 1, march: 2, april: 3, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
}

/**
 * Parse a flexible date string into a Date object.
 * Returns null for empty/invalid input.
 * "Present" returns today.
 */
export function parseFlexDate(s: string | undefined | null): Date | null {
  if (!s || s.trim() === '') return null
  const trimmed = s.trim()

  if (trimmed.toLowerCase() === 'present') return new Date()

  // ISO full: 2023-07-01
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const d = new Date(trimmed + 'T00:00:00')
    return isNaN(d.getTime()) ? null : d
  }

  // Year-month: 2024-03
  if (/^\d{4}-\d{2}$/.test(trimmed)) {
    const [yr, mo] = trimmed.split('-').map(Number)
    return new Date(yr, mo - 1, 1)
  }

  // "Jul 2023" or "July 2023"
  const monthYear = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (monthYear) {
    const monthIdx = MONTH_NAMES[monthYear[1].toLowerCase()]
    if (monthIdx !== undefined) {
      return new Date(Number(monthYear[2]), monthIdx, 1)
    }
  }

  // "2023 Jul" (reverse)
  const yearMonth = trimmed.match(/^(\d{4})\s+([A-Za-z]+)$/)
  if (yearMonth) {
    const monthIdx = MONTH_NAMES[yearMonth[2].toLowerCase()]
    if (monthIdx !== undefined) {
      return new Date(Number(yearMonth[1]), monthIdx, 1)
    }
  }

  // Just a year: "2023"
  if (/^\d{4}$/.test(trimmed)) {
    return new Date(Number(trimmed), 0, 1)
  }

  // Try native Date parsing as last resort
  const d = new Date(trimmed)
  return isNaN(d.getTime()) ? null : d
}

/**
 * Compute human-readable duration between two dates.
 * Returns strings like "2 yrs 4 mos", "8 mos", "1 yr", "< 1 mo"
 */
export function formatDuration(
  from: Date,
  to: Date,
  copy?: Readonly<Record<string, string>>,
): string {
  const totalMonths = Math.max(
    0,
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()),
  )
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const get = (key: string) => copy?.[key]?.trim()
  if (years === 0 && months === 0) return get('date_less_month') || ''
  if (years === 0) return `${months} ${months === 1 ? get('date_month') || '' : get('date_months') || ''}`.trim()
  if (months === 0) return `${years} ${years === 1 ? get('date_year') || '' : get('date_years') || ''}`.trim()
  return `${years} ${years === 1 ? get('date_year') || '' : get('date_years') || ''} ${months} ${months === 1 ? get('date_month') || '' : get('date_months') || ''}`.trim()
}

/**
 * Return relative string from a past Date to now.
 * e.g. "today", "2 days ago", "3 months ago", "1 year ago"
 */
export function relativeDays(
  from: Date,
  copy?: Readonly<Record<string, string>>,
): string {
  const now = new Date()
  const diffMs = now.getTime() - from.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  const get = (key: string) => copy?.[key]?.trim()
  const fill = (key: string, count: number) => get(key)?.replace('{count}', String(count)) || ''
  if (diffDays === 0) return get('date_today') || ''
  if (diffDays === 1) return fill('date_day_ago', 1)
  if (diffDays < 30) return fill('date_days_ago', diffDays)
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths === 1) return fill('date_month_ago', 1)
  if (diffMonths < 12) return fill('date_months_ago', diffMonths)
  const diffYears = Math.floor(diffMonths / 12)
  if (diffYears === 1) return fill('date_year_ago', 1)
  return fill('date_years_ago', diffYears)
}

/**
 * Format a date as "MMM YYYY" e.g. "Jul 2023"
 */
export function formatMonthYear(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
