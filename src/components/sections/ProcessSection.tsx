import type { ProcessStep } from '@/lib/sheets'
import { GitBranch } from 'lucide-react'

interface ProcessSectionProps {
  process: ProcessStep[]
}

export function ProcessSection({ process }: ProcessSectionProps) {
  if (process.length === 0) return null

  const steps = [...process].sort((a, b) => (a.step || a.order) - (b.step || b.order))

  return (
    <section id="process" className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <GitBranch className="h-6 w-6 text-foreground" />
          <h2 className="text-3xl font-semibold tracking-tight">How I Work</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {steps.map((step, i) => (
            <div key={step.title + i} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-primary/40 bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {step.step || i + 1}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                {step.description && (
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

