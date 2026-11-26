import { Badge } from '@/components/ui/badge'
import type { Certification, SettingsData } from '@/lib/sheets'

export function AboutSection({ settings, certifications }: { settings: SettingsData; certifications: Certification[] }) {
  const heading = settings.about_heading?.trim()
  const text = settings.about_text?.trim()
  if (!heading && !text && certifications.length === 0) return null

  return (
    <section id="about" className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6 text-center">
        {heading && <h2 className="text-3xl font-semibold tracking-tight">{heading}</h2>}
        {text && <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{text}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          {certifications.map((cert, index) => {
            const badge = <Badge variant="outline" className="px-3 py-2">{cert.name}{cert.issuer ? ` · ${cert.issuer}` : ''}</Badge>
            return cert.credential_url
              ? <a key={`${cert.name}-${index}`} href={cert.credential_url} target="_blank" rel="noopener noreferrer">{badge}</a>
              : <span key={`${cert.name}-${index}`}>{badge}</span>
          })}
        </div>
      </div>
    </section>
  )
}
