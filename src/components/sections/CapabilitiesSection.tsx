import { Layers } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'
import type { Capability } from '@/lib/portfolio-content'

interface CapabilitiesSectionProps {
  capabilities: Capability[]
  copy: SiteCopy
}

export function CapabilitiesSection({ capabilities, copy }: CapabilitiesSectionProps) {
  if (capabilities.length === 0) return null

  const grouped = capabilities.reduce<Record<string, Capability[]>>((groups, capability) => {
    const category = capability.category || getSiteCopyValue(copy, 'category_other') || 'Other'
    groups[category] ??= []
    groups[category].push(capability)
    return groups
  }, {})

  return (
    <section id="capabilities" className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <Layers className="h-6 w-6 text-foreground" />
          <h2 className="text-3xl font-semibold tracking-tight">
            {getSiteCopyValue(copy, 'capabilities_heading') ?? getSiteCopyValue(copy, 'stack_heading')}
          </h2>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <Badge key={`${category}-${item.name}`} variant="secondary" className="text-sm py-1 px-3">
                    {item.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
