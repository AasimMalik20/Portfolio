import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { SettingsData, StackItem } from '@/lib/sheets'

export function StackSection({ stack, settings }: { stack: StackItem[]; settings: SettingsData }) {
  const visible = stack.filter(item => item.name.trim() && item.category.trim())
  const heading = settings.stack_heading?.trim()
  if (visible.length === 0 || !heading) return null
  const groups = visible.reduce<Record<string, StackItem[]>>((acc, item) => {
    acc[item.category] ??= []
    acc[item.category].push(item)
    return acc
  }, {})
  return (
    <section id="stack" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-center mb-12">{heading}</h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          {Object.entries(groups).map(([category, items]) => <div key={category}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {items.map((item, index) => <Badge key={`${item.name}-${index}`} variant="secondary" className="flex items-center gap-2 px-3 py-2">
                {item.icon_slug && <Image src={`https://cdn.simpleicons.org/${item.icon_slug}`} alt="" width={18} height={18} unoptimized />}
                <span>{item.name}</span>
              </Badge>)}
            </div>
          </div>)}
        </div>
      </div>
    </section>
  )
}
