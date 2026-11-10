import type { Service } from '@/lib/sheets'
import { Wrench } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  if (services.length === 0) return null

  return (
    <section id="services" className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <Wrench className="h-6 w-6 text-foreground" />
          <h2 className="text-3xl font-semibold tracking-tight">Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <Card key={service.name + i} className="border border-border bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                {service.description && (
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                )}
              </CardHeader>
              {service.cta_text && service.cta_url && (
                <CardContent>
                  <Button variant="outline" size="sm" asChild>
                    <a href={service.cta_url} target="_blank" rel="noopener noreferrer">
                      {service.cta_text}
                    </a>
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

