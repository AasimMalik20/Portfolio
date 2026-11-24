'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

interface ProgressBarProps {
  value: number   // 0-100
  className?: string
  copy: SiteCopy
}

export function ProgressBar({ value, className, copy }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  // Check once on client side for reduced motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div ref={ref} className={`w-full ${className ?? ''}`}>
      <div className="flex justify-between items-center mb-1 text-xs text-muted-foreground">
        {getSiteCopyValue(copy, 'progress_label') && (
          <span>{getSiteCopyValue(copy, 'progress_label')}</span>
        )}
        <span>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-foreground rounded-full"
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${value}%` } : { width: '0%' }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.8, ease: 'easeOut', delay: 0.1 }
          }
        />
      </div>
    </div>
  )
}
