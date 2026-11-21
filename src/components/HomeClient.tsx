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

export interface HomeSection {
  id: string
  label: string
  content: ReactNode
}

interface HomeClientProps {
  name?: string
  sections: HomeSection[]
}

export function HomeClient({ name, sections }: HomeClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const displayName = name?.trim() || 'Aasim Malik'

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-50 py-4 border-b border-border">
        <div className="container mx-auto flex justify-between items-center gap-4 px-4 md:px-6">
          <a href="#home" className="text-xl font-semibold text-foreground whitespace-nowrap">
            {displayName}
          </a>

          <div className="flex items-center gap-2">
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-4 overflow-x-auto max-w-[65vw]">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {label.toUpperCase()}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <ThemeToggleButton />
            </div>

            <div className="flex items-center md:hidden">
              <ThemeToggleButton />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs p-6">
                  <nav aria-label="Mobile navigation" className="flex flex-col space-y-5 mt-6">
                    {sections.map(({ id, label }) => (
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
          © {new Date().getFullYear()} {displayName}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
