import type { CaseStudy } from '@/lib/sheets'
import { BriefcaseBusiness } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[]
  copy: SiteCopy
  sectionId?: string
}

export function CaseStudiesSection({ caseStudies, copy, sectionId = 'work' }: CaseStudiesSectionProps) {
  if (caseStudies.length === 0) return null

  return (
    <section id={sectionId} className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        {getSiteCopyValue(copy, 'work_heading') && <div className="flex justify-center items-center gap-2 mb-12">
          <BriefcaseBusiness className="h-6 w-6 text-foreground" />
          <h2 className="text-3xl font-semibold tracking-tight">{getSiteCopyValue(copy, 'work_heading')}</h2>
        </div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {caseStudies.map((caseStudy, index) => {
            const card = <Card className="h-full border border-border bg-card/80 backdrop-blur-sm shadow-sm">
              {caseStudy.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-40 object-cover rounded-t-xl"
                  loading="lazy"
                />
              )}
              <CardHeader>
                {caseStudy.client && (
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {caseStudy.client}
                  </p>
                )}
                <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {caseStudy.result && <p className="font-semibold text-foreground line-clamp-2">{caseStudy.result}</p>}
                {caseStudy.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {caseStudy.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            return <div key={caseStudy.slug || `${caseStudy.title}-${index}`} className="h-full">{caseStudy.slug ? <a className="block h-full" href={`/case-studies/${encodeURIComponent(caseStudy.slug)}`}>{card}</a> : card}</div>
          })}
        </div>
      </div>
    </section>
  )
}
