import { Badge } from '@/components/ui/badge'
import type { ProofItem } from '@/lib/sheets'

export function ProofSection({ items }: { items: ProofItem[] }) {
  if (items.length === 0) return null
  return (
    <section className="pb-12" aria-label="Proof">
      <div className="container mx-auto px-4 md:px-6 flex flex-wrap justify-center gap-3">
        {items.map((item, index) => {
          const content = <Badge variant="outline" className="px-4 py-2 text-sm"><strong className="mr-2">{item.value}</strong>{item.label}</Badge>
          return item.source_url
            ? <a key={`${item.label}-${index}`} href={item.source_url} target="_blank" rel="noopener noreferrer">{content}</a>
            : <span key={`${item.label}-${index}`}>{content}</span>
        })}
      </div>
    </section>
  )
}
