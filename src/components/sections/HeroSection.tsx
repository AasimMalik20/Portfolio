import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SettingsData } from '@/lib/sheets'

interface HeroSectionProps {
  settings: SettingsData
  bookingUrl?: string
}

export function HeroSection({ settings, bookingUrl }: HeroSectionProps) {
  const label = settings.hero_label?.trim()
  const headline = settings.hero_headline?.trim()
  const subtext = settings.hero_subtext?.trim()
  const primaryText = settings.hero_cta_primary_text?.trim()
  const secondaryText = settings.hero_cta_secondary_text?.trim()
  const secondaryUrl = settings.hero_cta_secondary_url?.trim()

  return (
    <section id="home" className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="space-y-6 text-center lg:text-left">
            {label && <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">{label}</p>}
            {headline && <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">{headline}</h1>}
            {subtext && <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:mx-0">{subtext}</p>}
            {(bookingUrl && primaryText) || (secondaryUrl && secondaryText) ? (
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start pt-4">
                {bookingUrl && primaryText && <Button size="lg" asChild><a href={bookingUrl} target="_blank" rel="noopener noreferrer">{primaryText}<ArrowRight className="ml-2 h-4 w-4" /></a></Button>}
                {secondaryUrl && secondaryText && <Button variant="outline" size="lg" asChild><a href={secondaryUrl} target={secondaryUrl.startsWith('#') || secondaryUrl.startsWith('/') ? undefined : '_blank'} rel={secondaryUrl.startsWith('#') || secondaryUrl.startsWith('/') ? undefined : 'noopener noreferrer'}>{secondaryText}</a></Button>}
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <Image src="/profile.png" width={384} height={384} alt="Aasim Malik, AI automation engineer" className="rounded-full object-cover border-8 border-background shadow-2xl" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
