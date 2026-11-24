'use client'

import { useState, type ReactNode } from 'react'
import { Menu } from 'lucide-react'
import { ThemeToggleButton } from '@/components/theme-toggle-button'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'
import { isExternalLink } from '@/lib/portfolio-content'

export interface HomeSection {
  id: string
  label: string
  content: ReactNode
}

interface HomeClientProps {
  name?: string
  sections: HomeSection[]
  copy: SiteCopy
  callUrls: { audit?: string; introduction?: string }
}

export function HomeClient({ name, sections, copy, callUrls }: HomeClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const displayName = name?.trim()
  const mainNavLabel = getSiteCopyValue(copy, 'a11y_main_navigation')
  const mobileNavLabel = getSiteCopyValue(copy, 'a11y_mobile_navigation')
  const openMenuLabel = getSiteCopyValue(copy, 'a11y_open_menu')
  const auditLabel = getSiteCopyValue(copy, 'cta_audit_call')
  const introductionLabel = getSiteCopyValue(copy, 'cta_intro_call')
  const calls = [
    callUrls.audit ? { href: callUrls.audit, label: auditLabel } : undefined,
    callUrls.introduction ? { href: callUrls.introduction, label: introductionLabel } : undefined,
  ].filter((call): call is { href: string; label: string } =>
    Boolean(call?.href && call?.label && (/^https?:\/\//i.test(call.href.trim()) || /^#[^\s]+/.test(call.href.trim()) || /^\//.test(call.href.trim()))),
  )
  const navSections = sections.filter(({ id, label }) =>
    label.trim() && ['services', 'work', 'projects', 'process', 'about', 'education'].includes(id),
  ).filter((section, index, all) =>
    all.findIndex(candidate => candidate.label === section.label) === index,
  )

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-50 py-4 border-b border-border">
        <div className="container mx-auto flex justify-between items-center gap-4 px-4 md:px-6">
          {displayName && (
            <a href="#home" className="text-xl font-semibold text-foreground whitespace-nowrap">
              {displayName}
            </a>
          )}

          <div className="flex items-center gap-2">
            <nav aria-label={mainNavLabel || undefined} className="hidden md:flex items-center gap-4 overflow-x-auto max-w-[65vw]">
              {navSections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {label.toUpperCase()}
                </a>
              ))}
              {calls.map(call => (
                <a
                  key={call.href}
                  href={call.href}
                  target={isExternalLink(call.href) ? '_blank' : undefined}
                  rel={isExternalLink(call.href) ? 'noopener noreferrer' : undefined}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {call.label.toUpperCase()}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <ThemeToggleButton copy={copy} />
            </div>

            <div className="flex items-center md:hidden">
              <ThemeToggleButton copy={copy} />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label={openMenuLabel || undefined}>
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs p-6">
                  <nav aria-label={mobileNavLabel || undefined} className="flex flex-col space-y-5 mt-6">
                    {navSections.map(({ id, label }) => (
                      <SheetClose asChild key={id}>
                        <a
                          href={`#${id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {label.toUpperCase()}
                        </a>
                      </SheetClose>
                    ))}
                    {calls.map(call => (
                      <SheetClose asChild key={call.href}>
                        <a
                          href={call.href}
                          target={isExternalLink(call.href) ? '_blank' : undefined}
                          rel={isExternalLink(call.href) ? 'noopener noreferrer' : undefined}
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {call.label}
                        </a>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {sections.map(({ id, content }) => (
          <div key={id}>{content}</div>
        ))}
      </main>

      <footer className="py-6 border-t border-border mt-16 bg-background">
        <div className="container mx-auto text-center text-muted-foreground text-xs px-4 md:px-6">
          {getSiteCopyValue(copy, 'footer_copyright') && displayName
            ? `${getSiteCopyValue(copy, 'footer_copyright')} ${new Date().getFullYear()} ${displayName}`
            : null}
        </div>
      </footer>
    </div>
  )
}
