import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ContactData, SettingsData } from '@/lib/sheets'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'
import { isExternalLink, isValidHttpUrl } from '@/lib/portfolio-content'

export function ContactSection({ contact, settings, copy, bookingUrl }: {
  contact: ContactData
  settings: SettingsData
  copy: SiteCopy
  bookingUrl?: string
}) {
  const heading = settings.contact_heading?.trim()
  const ctaText = settings.contact_cta_text?.trim()
  const responseTime = settings.contact_response_time?.trim()
  const timezone = settings.contact_timezone?.trim()
  const links = [
    contact.email ? { href: `mailto:${contact.email}`, label: getSiteCopyValue(copy, 'contact_email_label'), Icon: Mail } : undefined,
    contact.linkedin ? { href: contact.linkedin, label: getSiteCopyValue(copy, 'contact_linkedin_label'), Icon: Linkedin } : undefined,
    contact.github ? { href: contact.github, label: getSiteCopyValue(copy, 'contact_github_label'), Icon: Github } : undefined,
  ].filter((item): item is { href: string; label: string; Icon: typeof Mail } => Boolean(item?.label && item.href))
  const phone = contact.phone?.trim()
  if (!heading && !(bookingUrl && ctaText) && !responseTime && !timezone && links.length === 0 && !phone) return null

  return (
    <section id="contact" className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
        {heading && <h2 className="text-3xl font-semibold tracking-tight">{heading}</h2>}
        {bookingUrl && ctaText && <Button size="lg" asChild><a href={bookingUrl} target="_blank" rel="noopener noreferrer">{ctaText}</a></Button>}
        <div className="flex flex-wrap justify-center gap-3">
          {links.map(({ href, label, Icon }) => <Button key={href} variant="outline" size="sm" asChild><a href={href} target={isExternalLink(href) ? '_blank' : undefined} rel={isExternalLink(href) ? 'noopener noreferrer' : undefined}><Icon className="mr-2 h-4 w-4" />{label}</a></Button>)}
          {phone && getSiteCopyValue(copy, 'contact_phone_label') && <a className="flex items-center text-xs text-muted-foreground" href={`tel:${phone.replace(/[^\d+]/g, '')}`}><Phone className="mr-1 h-3 w-3" />{getSiteCopyValue(copy, 'contact_phone_label')}</a>}
        </div>
        {responseTime && <p className="text-sm text-muted-foreground">{responseTime}</p>}
        {timezone && <p className="text-sm text-muted-foreground">{timezone}</p>}
      </div>
    </section>
  )
}
