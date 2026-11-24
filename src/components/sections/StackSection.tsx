import type { StackItem } from '@/lib/sheets'
import { Layers } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

interface StackSectionProps {
  stack: StackItem[]
  copy: SiteCopy
}

export function StackSection({ stack, copy }: StackSectionProps) {
  if (stack.length === 0) return null

  // Group by category
  const grouped = stack.reduce<Record<string, StackItem[]>>((acc, item) => {
    const cat = item.category || getSiteCopyValue(copy, 'category_other') || ''
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  const categories = Object.entries(grouped)

  return (
    <section id="stack" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <Layers className="h-6 w-6 text-foreground" />
          {getSiteCopyValue(copy, 'stack_heading') && (
            <h2 className="text-3xl font-semibold tracking-tight">{getSiteCopyValue(copy, 'stack_heading')}</h2>
          )}
        </div>

        <div className="space-y-10 max-w-4xl mx-auto">
          {categories.map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item, i) => (
                  item.url ? (
                    <a key={item.name + i} href={item.url} target="_blank" rel="noopener noreferrer">
                      <Badge variant="secondary" className="text-sm py-1 px-3 hover:bg-primary/10 transition-colors cursor-pointer">
                        {item.name}
                      </Badge>
                    </a>
                  ) : (
                    <Badge key={item.name + i} variant="secondary" className="text-sm py-1 px-3">
                      {item.name}
                    </Badge>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

