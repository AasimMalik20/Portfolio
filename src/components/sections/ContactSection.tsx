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

interface ContactSectionProps {
  contact: ContactData
}

const CONTACT_LINKS: {
  key: string
  label: string
  icon: LucideIcon
}[] = [
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'phone', label: 'Phone', icon: Phone },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'github', label: 'GitHub', icon: Github },
  { key: 'x', label: 'X', icon: Twitter },
  { key: 'reddit', label: 'Reddit', icon: MessageCircle },
  { key: 'leetcode', label: 'LeetCode', icon: Code2 },
  { key: 'medium', label: 'Medium', icon: BookOpen },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'website', label: 'Website', icon: Globe },
  { key: 'resume_url', label: 'Resume', icon: FileText },
]

function getHref(key: string, value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined

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

export function ContactSection({ contact }: ContactSectionProps) {
  const links = CONTACT_LINKS.flatMap(({ key, label, icon: Icon }) => {
    const value = contact[key]
    const href = value ? getHref(key, value) : undefined
    return href ? [{ key, label, href, Icon }] : []
  })

  if (links.length === 0) return null

  return (
    <section id="contact" className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-8">
          <MessageCircle className="h-6 w-6 text-foreground" />
          <h2 className="text-3xl font-semibold tracking-tight text-center">Contact Me</h2>
        </div>
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3">
          {links.map(({ key, label, href, Icon }) => (
            <Button key={key} variant="outline" asChild>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                <Icon className="mr-2 h-4 w-4" />
                {label}
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
