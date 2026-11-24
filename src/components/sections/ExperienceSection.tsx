import type { Experience } from '@/lib/sheets'
import { TimelineEntry } from '@/components/TimelineEntry'
import { Briefcase } from 'lucide-react'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

interface ExperienceSectionProps {
  experience: Experience[]
  copy: SiteCopy
  sectionId?: string
}

export function ExperienceSection({ experience, copy, sectionId = 'about' }: ExperienceSectionProps) {
  if (experience.length === 0) return null

  return (
    <section id={sectionId} className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <Briefcase className="h-6 w-6 text-foreground" />
          {getSiteCopyValue(copy, 'experience_heading') && (
            <h2 className="text-3xl font-semibold tracking-tight">{getSiteCopyValue(copy, 'experience_heading')}</h2>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          {experience.map((entry, i) => (
            <TimelineEntry
              key={`${entry.company}-${entry.role}-${i}`}
              entry={entry}
              isLast={i === experience.length - 1}
              isFirst={i === 0}
              copy={copy}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
