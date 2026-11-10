import { cn } from '@/lib/utils'

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
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
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
      {config.label}
    </span>
  )
}
