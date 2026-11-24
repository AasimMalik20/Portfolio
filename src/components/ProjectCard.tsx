'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/lib/sheets'
import type { GitHubMeta } from '@/lib/github'
import { StatusBadge } from '@/components/StatusBadge'
import { ProgressBar } from '@/components/ProgressBar'
import { parseFlexDate, formatDuration, relativeDays } from '@/lib/date-utils'
import { Github, ExternalLink, Play, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

export type EnrichedProject = Project & { github?: GitHubMeta | null }

function computeTimeline(start?: string, end?: string, copy?: SiteCopy): string | null {
  const startDate = parseFlexDate(start)
  const endDate = parseFlexDate(end)

  if (startDate && endDate) {
    const dur = formatDuration(startDate, endDate, copy)
    const label = getSiteCopyValue(copy ?? {}, 'project_timeline_shipped')
    return label ? label.replace('{duration}', dur) : null
  }
  if (startDate && !endDate) {
    const dur = formatDuration(startDate, new Date(), copy)
    const label = getSiteCopyValue(copy ?? {}, 'project_timeline_building')
    return label ? label.replace('{duration}', dur) : null
  }
  return null
}

interface ProjectCardProps {
  project: EnrichedProject
  index?: number
  featured?: boolean
  copy: SiteCopy
}

export function ProjectCard({ project, index = 0, featured = false, copy }: ProjectCardProps) {
  const timeline = computeTimeline(project.start_date, project.end_date, copy)
  const topLanguages = project.github?.languages
    ? Object.entries(project.github.languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang)
    : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className={cn(
        'group flex flex-col rounded-xl border border-border bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full',
        featured && 'md:col-span-2',
      )}
    >
      {/* Image */}
      {project.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="font-semibold text-base text-foreground leading-snug">{project.name}</h3>
          {project.status && <StatusBadge status={project.status} copy={copy} />}
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {project.description}
          </p>
        )}

        {/* Timeline */}
        {timeline && (
          <p className="text-xs text-muted-foreground">{timeline}</p>
        )}

        {/* Progress */}
        {typeof project.progress === 'number' && (
          <ProgressBar value={project.progress} copy={copy} />
        )}

        {/* GitHub meta */}
        {project.github && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {project.github.stars > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {project.github.stars.toLocaleString()}
              </span>
            )}
            {project.github.lastCommit && (
              <span>
                {getSiteCopyValue(copy, 'project_last_commit')
                  ? `${getSiteCopyValue(copy, 'project_last_commit')} ${relativeDays(new Date(project.github.lastCommit), copy)}`
                  : null}
              </span>
            )}
          </div>
        )}

        {/* Top languages */}
        {topLanguages.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {topLanguages.map(lang => (
              <Badge key={lang} variant="outline" className="text-xs font-normal">
                {lang}
              </Badge>
            ))}
          </div>
        )}

        {/* Tech tags */}
        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tech.map(t => (
              <Badge key={t} variant="secondary" className="text-xs font-light">
                {t}
              </Badge>
            ))}
          </div>
        )}

        {/* Links */}
        {(project.live_url || project.repo_url || project.demo_url) && (
          <div className="flex flex-wrap gap-2 pt-1 mt-auto">
            {project.live_url && getSiteCopyValue(copy, 'live_label') && (
              <Button variant="default" size="sm" asChild>
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" /> {getSiteCopyValue(copy, 'live_label')}
                </a>
              </Button>
            )}
            {project.repo_url && getSiteCopyValue(copy, 'github_label') && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3 w-3 mr-1" /> {getSiteCopyValue(copy, 'github_label')}
                </a>
              </Button>
            )}
            {project.demo_url && getSiteCopyValue(copy, 'demo_label') && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  <Play className="h-3 w-3 mr-1" /> {getSiteCopyValue(copy, 'demo_label')}
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
