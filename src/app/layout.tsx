import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider'; // Import ThemeProvider
import { fetchAllSheetData } from '@/lib/sheets'
import { getSiteCopyValue } from '@/lib/site-copy'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchAllSheetData()
  const copy = data.siteCopy
  const title = getSiteCopyValue(copy, 'site_title')
  const description = getSiteCopyValue(copy, 'site_description')

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
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
