import type { Testimonial } from '@/lib/sheets'
import { Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  copy: SiteCopy
}

export function TestimonialsSection({ testimonials, copy }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <Quote className="h-6 w-6 text-foreground" />
          {getSiteCopyValue(copy, 'testimonials_heading') && (
            <h2 className="text-3xl font-semibold tracking-tight">{getSiteCopyValue(copy, 'testimonials_heading')}</h2>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <Card key={t.author + i} className="border border-border bg-card/80 backdrop-blur-sm shadow-sm">
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  {t.avatar_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatar_url}
                      alt={t.author}
                      className="w-9 h-9 rounded-full object-cover border border-border"
                      loading="lazy"
                    />
                  )}
                  <div>
                    {t.url ? (
                      <a href={t.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-sm text-foreground hover:text-primary transition-colors">
                        {t.author}
                      </a>
                    ) : (
                      <p className="font-semibold text-sm text-foreground">{t.author}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {t.role}{t.company ? ` · ${t.company}` : ''}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

