import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider'; // Import ThemeProvider
import { fetchAllSheetData } from '@/lib/sheets'
import { getSiteCopyValue } from '@/lib/site-copy'
import { resolveSiteUrl } from '@/lib/site-metadata'

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchAllSheetData()
  const copy = data.siteCopy
  const title = getSiteCopyValue(copy, 'site_title')
  const description = getSiteCopyValue(copy, 'site_description')
  const siteUrl = resolveSiteUrl(data.settings.site_url ?? process.env.NEXT_PUBLIC_SITE_URL)

  return {
    ...(siteUrl ? {
      metadataBase: siteUrl,
      alternates: { canonical: '/' },
    } : {}),
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(title && description ? {
      openGraph: {
        type: 'website',
        title,
        description,
        ...(siteUrl ? { url: siteUrl.toString() } : {}),
      },
      twitter: {
        card: 'summary',
        title,
        description,
      },
    } : {}),
    robots: { index: true, follow: true },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
