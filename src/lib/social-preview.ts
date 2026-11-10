/**
 * Social preview utilities: OG meta, X oEmbed, Reddit posts.
 * All functions fail silently and return null / [] on error.
 */

export type PostPreview = {
  title?: string
  description?: string
  image?: string
  author?: string
  html?: string    // oEmbed HTML (X/Twitter)
}

export type RedditPost = {
  url: string
  title: string
  date: string          // ISO date string
  subreddit: string     // e.g. "r/devops"
  permalink: string
}

/** Extract a single OG/Twitter meta value from raw HTML */
function extractMeta(html: string, property: string): string | undefined {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, 'i'),
  ]
  for (const re of patterns) {
    const m = html.match(re)
    if (m?.[1]) return m[1]
  }
  return undefined
}

async function fetchOGMeta(url: string): Promise<PostPreview | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'portfolio-bot/1.0',
        'Accept': 'text/html',
      },
      next: { revalidate: 900 },
    })
    if (!res.ok) return null

    const html = await res.text()
    return {
      title: extractMeta(html, 'og:title') ?? extractMeta(html, 'twitter:title'),
      description: extractMeta(html, 'og:description') ?? extractMeta(html, 'twitter:description'),
      image: extractMeta(html, 'og:image') ?? extractMeta(html, 'twitter:image'),
    }
  } catch {
    return null
  }
}

async function fetchXOEmbed(url: string): Promise<PostPreview | null> {
  try {
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true`
    const res = await fetch(oembedUrl, {
      headers: { 'User-Agent': 'portfolio-bot/1.0' },
      next: { revalidate: 900 },
    })
    if (!res.ok) return null

    const data = await res.json() as {
      html?: string
      author_name?: string
    }
    return {
      html: data.html,
      author: data.author_name,
    }
  } catch {
    return null
  }
}

export async function fetchPostPreview(url: string, platform: string): Promise<PostPreview | null> {
  if (!url) return null

  try {
    if (platform === 'x') {
      // Try oEmbed first, fall back to OG
      const oembed = await fetchXOEmbed(url)
      if (oembed?.html) return oembed
    }

    return await fetchOGMeta(url)
  } catch {
    return null
  }
}

export async function fetchRedditPosts(username: string): Promise<RedditPost[]> {
  if (!username) return []

  try {
    const url = `https://www.reddit.com/user/${encodeURIComponent(username)}/submitted.json?limit=10`
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'portfolio-bot/1.0',
        'Accept': 'application/json',
      },
      next: { revalidate: 900 },
    })
    if (!res.ok) return []

    const data = await res.json() as {
      data?: {
        children?: Array<{
          data?: {
            url?: string
            title?: string
            created_utc?: number
            subreddit_name_prefixed?: string
            permalink?: string
          }
        }>
      }
    }

    return (data.data?.children ?? [])
      .map(child => {
        const d = child.data
        if (!d?.url || !d.title) return null
        return {
          url: d.url,
          title: d.title,
          date: d.created_utc ? new Date(d.created_utc * 1000).toISOString() : '',
          subreddit: d.subreddit_name_prefixed ?? '',
          permalink: d.permalink ? `https://reddit.com${d.permalink}` : d.url,
        }
      })
      .filter((p): p is RedditPost => p !== null)
  } catch {
    return []
  }
}
