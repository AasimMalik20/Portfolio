import type { EnrichedProject } from '@/components/ProjectCard'
import { ProjectCard } from '@/components/ProjectCard'
import { parseFlexDate } from '@/lib/date-utils'
import { FolderGit2 } from 'lucide-react'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

interface ProjectsSectionProps {
  projects: EnrichedProject[]
  copy: SiteCopy
}

function Countdown({ targetDate, copy }: { targetDate: string; copy: SiteCopy }) {
  const target = parseFlexDate(targetDate)
  if (!target) return null
  const now = new Date()
  if (target <= now) return null

  const diffMs = target.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays > 365) return null
  const label = diffDays === 1
    ? getSiteCopyValue(copy, 'projects_launching_tomorrow')
    : getSiteCopyValue(copy, 'projects_launching_in')?.replace('{count}', String(diffDays))
  if (!label) return null
  return (
    <p className="text-xs text-muted-foreground mt-1">
      {label}
    </p>
  )
}

export function ProjectsSection({ projects, copy }: ProjectsSectionProps) {
  if (projects.length === 0) return null

  const upcoming = projects.filter(p => p.status === 'Upcoming')
  const rest = projects.filter(p => p.status !== 'Upcoming')

  return (
    <section id="projects" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <FolderGit2 className="h-6 w-6 text-foreground" />
          {getSiteCopyValue(copy, 'projects_heading') && (
            <h2 className="text-3xl font-semibold tracking-tight">{getSiteCopyValue(copy, 'projects_heading')}</h2>
          )}
        </div>

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.name + i}
                project={project}
                index={i}
                featured={project.featured}
                copy={copy}
              />
            ))}
          </div>
        )}

        {upcoming.length > 0 && (
          <div className="mt-16">
            {getSiteCopyValue(copy, 'projects_coming_soon') && (
              <h3 className="text-xl font-semibold text-center mb-8 text-muted-foreground">
                {getSiteCopyValue(copy, 'projects_coming_soon')}
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((project, i) => (
                <div
                  key={project.name + i}
                  className="rounded-xl border border-border bg-card/50 p-5 space-y-3"
                >
                  <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
                  <div className="h-2 w-full bg-muted/70 rounded animate-pulse" />
                  <div className="h-2 w-4/5 bg-muted/50 rounded animate-pulse" />
                  <div className="pt-2">
                    <p className="font-medium text-foreground">{project.name}</p>
                    {project.description && (
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    )}
                    {project.target_date && <Countdown targetDate={project.target_date} copy={copy} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
