import type { MetadataRoute } from 'next'
import { resolveSiteUrl } from '@/lib/site-metadata'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)

  return {
    rules: { userAgent: '*', allow: '/' },
    ...(siteUrl ? { sitemap: new URL('/sitemap.xml', siteUrl).toString() } : {}),
  }
}
