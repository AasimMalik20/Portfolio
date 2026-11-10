import { fetchAllSheetData, Post, SettingsData } from '@/lib/sheets'
import { fetchPostPreview, fetchRedditPosts, PostPreview } from '@/lib/social-preview'
import { parseFlexDate, relativeDays } from '@/lib/date-utils'
import { PostsClient, DisplayPost } from './PostsClient'

interface PostsSectionProps {
  posts?: Post[]
  settings?: SettingsData
}

export async function PostsSection(props: PostsSectionProps = {}) {
  let posts = props.posts
  let settings = props.settings

  if (!posts || !settings) {
    const sheetData = await fetchAllSheetData()
    posts = posts ?? sheetData.posts
    settings = settings ?? sheetData.settings
  }

  // Fetch Reddit posts if username is configured
  let redditPosts: DisplayPost[] = []
  if (settings?.reddit_username) {
    try {
      const redditData = await fetchRedditPosts(settings.reddit_username)
      redditPosts = redditData.map(rp => {
        const dateObj = parseFlexDate(rp.date)
        return {
          platform: 'reddit' as const,
          url: rp.permalink || rp.url,
          title: rp.title,
          description: rp.subreddit ? `Posted in ${rp.subreddit}` : undefined,
          relativeTime: dateObj ? relativeDays(dateObj) : undefined,
          timestamp: dateObj ? dateObj.getTime() : 0,
        }
      })
    } catch (e) {
      console.error('[PostsSection] Failed to fetch reddit posts:', e)
    }
  }

  // Fetch previews for sheet posts (skip re-fetching if reddit)
  const sheetPostsWithPreviews: DisplayPost[] = await Promise.all(
    (posts || [])
      .filter(p => !!p.url)
      .map(async p => {
        const platform = (p.platform ?? 'linkedin') as 'linkedin' | 'x' | 'reddit'
        let preview: PostPreview | null = null

        if (p.url && platform !== 'reddit') {
          try {
            preview = await fetchPostPreview(p.url, platform)
          } catch (e) {
            console.error('[PostsSection] Failed to fetch post preview:', e)
          }
        }

        const dateObj = parseFlexDate(p.date)
        return {
          platform,
          url: p.url!,
          title: preview?.title,
          description: preview?.description,
          image: preview?.image,
          author: preview?.author,
          relativeTime: dateObj ? relativeDays(dateObj) : undefined,
          timestamp: dateObj ? dateObj.getTime() : 0,
        }
      })
  )

  // Merge and deduplicate by URL
  const seenUrls = new Set<string>()
  const mergedPosts: DisplayPost[] = []

  for (const post of [...sheetPostsWithPreviews, ...redditPosts]) {
    if (!seenUrls.has(post.url)) {
      seenUrls.add(post.url)
      mergedPosts.push(post)
    }
  }

  // Sort descending by date
  mergedPosts.sort((a, b) => b.timestamp - a.timestamp)

  // Check if no posts or newest is older than 30 days
  const now = Date.now()
  const newestTime = mergedPosts[0]?.timestamp
  const isNewestOld = !newestTime || now - newestTime > 30 * 24 * 60 * 60 * 1000
  const showFallback = mergedPosts.length === 0 || isNewestOld

  const fallbackMessage =
    settings?.fallback_post_message ||
    'Heads down shipping. Too busy building to post. Check the projects instead.'

  return (
    <PostsClient
      posts={mergedPosts.slice(0, 3)}
      showFallback={showFallback}
      fallbackMessage={fallbackMessage}
    />
  )
}
