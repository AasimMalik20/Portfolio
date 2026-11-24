import { cn } from '@/lib/utils'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

type Status = 'Live' | 'In Progress' | 'Upcoming' | 'Paused'

const STATUS_CONFIG: Record<Status, { dot: string; label: string; bg: string; text: string }> = {
  Live: {
    dot: 'bg-green-500',
    label: 'Live',
    bg: 'bg-green-500/10',
    text: 'text-green-600 dark:text-green-400',
  },
  'In Progress': {
    dot: 'bg-yellow-400 animate-pulse',
    label: 'In Progress',
    bg: 'bg-yellow-400/10',
    text: 'text-yellow-600 dark:text-yellow-400',
  },
  Upcoming: {
    dot: 'bg-blue-400',
    label: 'Upcoming',
    bg: 'bg-blue-400/10',
    text: 'text-blue-600 dark:text-blue-400',
  },
  Paused: {
    dot: 'bg-gray-400',
    label: 'Paused',
    bg: 'bg-gray-400/10',
    text: 'text-gray-500 dark:text-gray-400',
  },
}

interface StatusBadgeProps {
  status: Status
  className?: string
  copy: SiteCopy
}

export function StatusBadge({ status, className, copy }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  const statusKey = status === 'Live' ? 'status_live' : status === 'In Progress' ? 'status_in_progress' : status === 'Upcoming' ? 'status_upcoming' : 'status_paused'
  const label = getSiteCopyValue(copy, statusKey)
  if (!label) return null
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full',
        config.bg,
        config.text,
        className,
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', config.dot)} />
      {label}
    </span>
  )
}
