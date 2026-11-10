'use client'

import { motion } from 'framer-motion'
import type { Certification } from '@/lib/sheets'
import { LogoBadge } from '@/components/LogoBadge'
import { Award, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CertificationsSectionProps {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (certifications.length === 0) return null

  return (
    <section id="certifications" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <Award className="h-6 w-6 text-foreground" />
          <h2 className="text-3xl font-semibold tracking-tight">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name + i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex flex-col items-center text-center p-5 rounded-xl border border-border bg-card/80 hover:shadow-md transition-shadow gap-3"
            >
              <LogoBadge
                name={cert.name}
                logoUrl={cert.badge_url}
                iconSlug={cert.issuer.toLowerCase().replace(/\s+/g, '')}
                size={48}
              />
              <div>
                <p className="font-semibold text-sm text-foreground leading-snug">{cert.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                {cert.date && (
                  <p className="text-xs text-muted-foreground mt-0.5">{cert.date}</p>
                )}
              </div>
              {cert.credential_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={cert.credential_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" /> Verify
                  </a>
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
