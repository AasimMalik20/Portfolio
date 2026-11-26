import type { MetadataRoute } from 'next'
import { fetchAllSheetData } from '@/lib/sheets'
import { resolveSiteUrl } from '@/lib/site-metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchAllSheetData()
  const siteUrl = resolveSiteUrl(data.settings.site_url ?? process.env.NEXT_PUBLIC_SITE_URL)
  if (!siteUrl) return []

  return [{
    url: new URL('/', siteUrl).toString(),
    lastModified: new Date(),
  }]
}
