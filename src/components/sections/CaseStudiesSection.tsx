import type { CaseStudy } from '@/lib/sheets'
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[]
}

export function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
  if (caseStudies.length === 0) return null

  return (
    <section id="case-studies" className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <BriefcaseBusiness className="h-6 w-6 text-foreground" />
          <h2 className="text-3xl font-semibold tracking-tight">Case Studies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {caseStudies.map((caseStudy, index) => (
            <Card key={caseStudy.slug || `${caseStudy.title}-${index}`} className="border border-border bg-card/80 backdrop-blur-sm shadow-sm">
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
                {caseStudy.summary && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {caseStudy.summary}
                  </p>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {(caseStudy.problem || caseStudy.solution || caseStudy.result) && (
                  <dl className="space-y-2 text-sm">
                    {caseStudy.problem && (
                      <div>
                        <dt className="font-medium">Challenge</dt>
                        <dd className="text-muted-foreground">{caseStudy.problem}</dd>
                      </div>
                    )}
                    {caseStudy.solution && (
                      <div>
                        <dt className="font-medium">Solution</dt>
                        <dd className="text-muted-foreground">{caseStudy.solution}</dd>
                      </div>
                    )}
                    {caseStudy.result && (
                      <div>
                        <dt className="font-medium">Result</dt>
                        <dd className="text-muted-foreground">{caseStudy.result}</dd>
                      </div>
                    )}
                  </dl>
                )}
                {caseStudy.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {caseStudy.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
                {caseStudy.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={caseStudy.url} target="_blank" rel="noopener noreferrer">
                      View case study <ArrowUpRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
