'use client'

import { motion } from 'framer-motion'
import type { Education } from '@/lib/sheets'
import { LogoBadge } from '@/components/LogoBadge'
import { parseFlexDate, formatMonthYear } from '@/lib/date-utils'
import { GraduationCap } from 'lucide-react'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

interface EducationSectionProps {
  education: Education[]
  copy: SiteCopy
  sectionId?: string
}

export function EducationSection({ education, copy, sectionId = 'about-education' }: EducationSectionProps) {
  if (education.length === 0) return null

  return (
    <section id={sectionId} className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-8">
          <GraduationCap className="h-6 w-6 text-foreground" />
          {getSiteCopyValue(copy, 'education_heading') && (
            <h2 className="text-3xl font-semibold tracking-tight">{getSiteCopyValue(copy, 'education_heading')}</h2>
          )}
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {education.map((edu, i) => {
            const startDate = parseFlexDate(edu.start)
            const endDate = parseFlexDate(edu.end)
            const startLabel = startDate ? formatMonthYear(startDate) : edu.start
            const endLabel = endDate ? formatMonthYear(endDate) : edu.end
            const dateRange = [startLabel, endLabel].filter(Boolean).join(' – ')

            return (
              <motion.div
                key={edu.school + i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card/80 shadow-sm"
              >
                <LogoBadge name={edu.school} logoUrl={edu.logo_url} size={40} className="rounded mt-0.5" />
                <div className="flex-1 min-w-0">
                  {edu.degree && <p className="font-semibold text-foreground">{edu.degree}</p>}
                  <p className="text-sm font-medium text-muted-foreground">{edu.school}</p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    {dateRange && (
                      <span className="text-xs text-muted-foreground">{dateRange}</span>
                    )}
                    {edu.gpa && getSiteCopyValue(copy, 'gpa_label') && (
                      <span className="text-xs text-muted-foreground">{getSiteCopyValue(copy, 'gpa_label')} {edu.gpa}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
