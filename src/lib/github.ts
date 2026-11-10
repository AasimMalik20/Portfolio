/**
 * GitHub API enrichment for project cards.
 * Returns null on any error (rate limit, 404, network failure).
 * Uses Next.js fetch caching (300 s).
 */

export type GitHubMeta = {
  stars: number
  lastCommit: string        // ISO date string (pushed_at)
  languages: Record<string, number>  // lang name → byte count
}

/** Extract "owner/repo" from a GitHub URL */
function parseGitHubRepo(url: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(url)
    if (!u.hostname.includes('github.com')) return null
    const parts = u.pathname.replace(/^\//, '').replace(/\.git$/, '').split('/')
    if (parts.length < 2) return null
    return { owner: parts[0], repo: parts[1] }
  } catch {
    return null
  }
}

export async function fetchGitHubMeta(repoUrl: string): Promise<GitHubMeta | null> {
  const parsed = parseGitHubRepo(repoUrl)
  if (!parsed) return null

  const { owner, repo } = parsed
  const base = `https://api.github.com/repos/${owner}/${repo}`
  const headers: HeadersInit = {
    'User-Agent': 'portfolio-bot/1.0',
    'Accept': 'application/vnd.github+json',
  }

  try {
    const [repoRes, langRes] = await Promise.all([
      fetch(base, { headers, next: { revalidate: 300 } }),
      fetch(`${base}/languages`, { headers, next: { revalidate: 300 } }),
    ])

    if (!repoRes.ok) return null

    const repoData = await repoRes.json() as {
      stargazers_count?: number
      pushed_at?: string
    }

    const languages: Record<string, number> = langRes.ok
      ? (await langRes.json() as Record<string, number>)
      : {}

    return {
      stars: repoData.stargazers_count ?? 0,
      lastCommit: repoData.pushed_at ?? '',
      languages,
    }
  } catch {
    return null
  }
}
