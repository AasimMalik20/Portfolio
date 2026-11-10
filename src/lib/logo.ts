/**
 * Logo and icon URL resolution.
 * Priority: direct URL → Devicon → Simple Icons → initials badge (handled in component)
 */

/** Slugs that exist in Devicon but not (or not as well) in Simple Icons */
export const DEVICON_OVERRIDES: Record<string, string> = {
  aws: 'amazonwebservices',
  azure: 'azure',
  gcp: 'googlecloud',
  'google-cloud': 'googlecloud',
  googlecloud: 'googlecloud',
  kubernetes: 'kubernetes',
  docker: 'docker',
  terraform: 'terraform',
  bash: 'bash',
  linux: 'linux',
  git: 'git',
  github: 'github',
  python: 'python',
}

/**
 * Return Devicon SVG URL for a slug.
 * Uses DEVICON_OVERRIDES mapping if applicable.
 */
export function deviconUrl(slug: string): string {
  const resolved = DEVICON_OVERRIDES[slug.toLowerCase()] ?? slug.toLowerCase()
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${resolved}/${resolved}-original.svg`
}

/**
 * Return Simple Icons CDN URL for a slug.
 */
export function simpleIconUrl(slug: string): string {
  return `https://cdn.simpleicons.org/${slug.toLowerCase()}`
}

/**
 * Determine if a slug should prefer Devicon over Simple Icons.
 */
export function prefersDevicon(slug: string): boolean {
  return slug.toLowerCase() in DEVICON_OVERRIDES
}
