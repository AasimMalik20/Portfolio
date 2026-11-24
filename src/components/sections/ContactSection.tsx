import type { ContactData } from '@/lib/sheets'
import {
  BookOpen,
  Code2,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'
import { isExternalLink } from '@/lib/portfolio-content'

interface ContactSectionProps {
  contact: ContactData
  copy: SiteCopy
}

function getHref(key: string, value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (trimmed.startsWith('#')) return trimmed
  if (trimmed.startsWith('/')) return trimmed

  if (key === 'email') {
    return trimmed.startsWith('mailto:') ? trimmed : `mailto:${trimmed}`
  }
  if (key === 'phone') {
    const number = trimmed.replace(/[^\d+]/g, '')
    return number ? `tel:${number}` : undefined
  }
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed)) return `https://${trimmed}`
  return undefined
}

export function ContactSection({ contact, copy }: ContactSectionProps) {
  const CONTACT_LINKS: { key: string; copyKey: string; icon: LucideIcon }[] = [
    { key: 'email', copyKey: 'contact_email_label', icon: Mail },
    { key: 'phone', copyKey: 'contact_phone_label', icon: Phone },
    { key: 'linkedin', copyKey: 'contact_linkedin_label', icon: Linkedin },
    { key: 'github', copyKey: 'contact_github_label', icon: Github },
    { key: 'x', copyKey: 'contact_x_label', icon: Twitter },
    { key: 'reddit', copyKey: 'contact_reddit_label', icon: MessageCircle },
    { key: 'leetcode', copyKey: 'contact_leetcode_label', icon: Code2 },
    { key: 'medium', copyKey: 'contact_medium_label', icon: BookOpen },
    { key: 'youtube', copyKey: 'contact_youtube_label', icon: Youtube },
    { key: 'instagram', copyKey: 'contact_instagram_label', icon: Instagram },
    { key: 'website', copyKey: 'contact_website_label', icon: Globe },
    { key: 'resume_url', copyKey: 'contact_resume_label', icon: FileText },
  ]
  const links = CONTACT_LINKS.flatMap(({ key, copyKey, icon: Icon }) => {
    const value = contact[key]
    const href = value ? getHref(key, value) : undefined
    const label = getSiteCopyValue(copy, copyKey)
    return href && label ? [{ key, label, href, Icon }] : []
  })
  const calls = [
    contact.audit_call_url ? { href: getHref('audit_call', contact.audit_call_url), label: getSiteCopyValue(copy, 'cta_audit_call') } : undefined,
    contact.intro_call_url ? { href: getHref('intro_call', contact.intro_call_url), label: getSiteCopyValue(copy, 'cta_intro_call') } : undefined,
  ].filter((call): call is { href: string; label: string } => Boolean(call?.href && call?.label))

  if (links.length === 0 && calls.length === 0) return null

  return (
    <section id="contact" className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-8">
          <MessageCircle className="h-6 w-6 text-foreground" />
          {getSiteCopyValue(copy, 'contact_heading') && (
            <h2 className="text-3xl font-semibold tracking-tight text-center">{getSiteCopyValue(copy, 'contact_heading')}</h2>
          )}
        </div>
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3">
          {links.map(({ key, label, href, Icon }) => (
            <Button key={key} variant="outline" asChild>
              <a href={href} target={isExternalLink(href) ? '_blank' : undefined} rel={isExternalLink(href) ? 'noopener noreferrer' : undefined}>
                <Icon className="mr-2 h-4 w-4" />
                {label}
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          ))}
          {calls.map(call => (
            <Button key={call.href} variant="default" asChild>
              <a href={call.href} target={isExternalLink(call.href) ? '_blank' : undefined} rel={isExternalLink(call.href) ? 'noopener noreferrer' : undefined}>
                {call.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
