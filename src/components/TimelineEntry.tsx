'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Experience } from '@/lib/sheets'
import { LogoBadge } from '@/components/LogoBadge'
import { Badge } from '@/components/ui/badge'
import { parseFlexDate, formatDuration, formatMonthYear } from '@/lib/date-utils'
import { cn } from '@/lib/utils'
import { MapPin } from 'lucide-react'

interface TimelineEntryProps {
  entry: Experience
  isLast: boolean
  isFirst?: boolean
}

export function TimelineEntry({ entry, isLast, isFirst = false }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const startDate = parseFlexDate(entry.start)
  const isPresent = !entry.end || entry.end.toLowerCase() === 'present'
  const endDate = isPresent ? new Date() : parseFlexDate(entry.end)
  const duration = startDate && endDate ? formatDuration(startDate, endDate) : null

  const startLabel = startDate ? formatMonthYear(startDate) : entry.start
  const endLabel = isPresent ? 'Present' : endDate ? formatMonthYear(endDate) : entry.end

  const dateRange = [startLabel, endLabel].filter(Boolean).join(' – ')

  return (
    <div ref={ref} className="flex gap-6 relative">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0 w-8">
        <div className={cn('w-3 h-3 rounded-full border-2 border-background flex-shrink-0 z-10 mt-1.5', isPresent ? 'bg-green-500' : 'bg-foreground')} />
        {!isLast && (
          <motion.div
            className="w-0.5 bg-border flex-1 mt-1"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            style={{ transformOrigin: 'top', minHeight: '100%' }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.4, delay: isFirst ? 0.1 : 0.2 }}
        className="flex-1 pb-10"
      >
        <div className="flex items-start gap-3">
          {(entry.logo_url) && (
            <LogoBadge name={entry.company} logoUrl={entry.logo_url} size={36} className="mt-0.5 rounded" />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">{entry.role}</h3>
            <p className="text-sm font-medium text-muted-foreground">{entry.company}</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
              {dateRange && (
                <span className="text-xs text-muted-foreground">{dateRange}</span>
              )}
              {duration && (
                <span className="text-xs text-muted-foreground">· {duration}</span>
              )}
              {isPresent && (
                <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Now
                </span>
              )}
            </div>
            {entry.location && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                {entry.location}
              </p>
            )}
          </div>
        </div>

        {/* Bullets */}
        {entry.bullets.length > 0 && (
          <ul className="mt-3 space-y-1.5 list-disc list-outside pl-5 text-sm text-muted-foreground">
            {entry.bullets.map((bullet, i) => (
              <li key={i} className="leading-relaxed">{bullet}</li>
            ))}
          </ul>
        )}

        {/* Tech */}
        {entry.tech.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entry.tech.map(t => (
              <Badge key={t} variant="secondary" className="text-xs font-light">{t}</Badge>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
