import { fetchAllSheetData, Post } from '@/lib/sheets'
import { parseFlexDate, relativeDays } from '@/lib/date-utils'
import { PostsClient, DisplayPost } from './PostsClient'
import type { SiteCopy } from '@/lib/site-copy'

interface PostsSectionProps {
  posts?: Post[]
  copy?: SiteCopy
}

export async function PostsSection(props: PostsSectionProps = {}) {
  let posts = props.posts
  const copy = props.copy ?? {}
  if (!posts) {
    const sheetData = await fetchAllSheetData()
    posts = posts ?? sheetData.posts
  }
  const sheetPosts: DisplayPost[] = (posts || [])
    .filter(p => !!p.url?.trim())
    .map(p => {
      const dateObj = parseFlexDate(p.date)
      return {
        platform: p.platform,
        url: p.url!,
        relativeTime: dateObj ? relativeDays(dateObj, copy) : undefined,
        timestamp: dateObj ? dateObj.getTime() : 0,
      }
    })

  return (
    <PostsClient
      posts={sheetPosts}
      copy={copy}
    />
  )
}
