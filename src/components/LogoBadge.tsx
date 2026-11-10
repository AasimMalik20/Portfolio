'use client'

import { useState } from 'react'
import { deviconUrl, simpleIconUrl, DEVICON_OVERRIDES } from '@/lib/logo'
import { cn } from '@/lib/utils'

interface LogoBadgeProps {
  name: string
  logoUrl?: string
  iconSlug?: string
  size?: number
  className?: string
}

type Source = 'direct' | 'devicon' | 'simpleicons' | 'initials'

function getInitials(name: string): string {
  return name
    .split(/[\s-_]+/)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)
}

// Deterministic hue from name
function nameToHue(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % 360
}

export function LogoBadge({ name, logoUrl, iconSlug, size = 32, className }: LogoBadgeProps) {
  const slug = iconSlug?.toLowerCase() ?? ''

  // Determine initial source chain
  const initialSource: Source = logoUrl
    ? 'direct'
    : slug
    ? slug in DEVICON_OVERRIDES
      ? 'devicon'
      : 'devicon'  // Try devicon first for all slugs
    : 'initials'

  const [source, setSource] = useState<Source>(initialSource)

  const fallback = () => {
    if (source === 'direct') {
      setSource(slug ? 'devicon' : 'initials')
    } else if (source === 'devicon') {
      setSource('simpleicons')
    } else {
      setSource('initials')
    }
  }

  const imgSrc =
    source === 'direct'
      ? logoUrl!
      : source === 'devicon'
      ? deviconUrl(slug)
      : source === 'simpleicons'
      ? simpleIconUrl(slug)
      : null

  const hue = nameToHue(name)
  const initials = getInitials(name)

  if (source === 'initials' || !imgSrc) {
    return (
      <div
        className={cn('rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0', className)}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.35,
          background: `hsl(${hue}, 55%, 45%)`,
        }}
        aria-label={name}
      >
        {initials}
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={name}
      width={size}
      height={size}
      className={cn('object-contain flex-shrink-0', className)}
      style={{ width: size, height: size }}
      onError={fallback}
    />
  )
}
