# Utility Module

> **Source**: `src/lib/utils.ts`  
> **Last Verified**: 2026-11-09

---

## `cn()` — Class Name Utility

The only utility function in `src/lib/`.

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Purpose**: Merges Tailwind CSS class strings, resolving conflicts intelligently.

**Why both clsx and tailwind-merge?**
- `clsx` handles conditional class logic (`cn('foo', { 'bar': isActive })`)
- `tailwind-merge` resolves Tailwind conflicts (e.g., `cn('p-4', 'p-6')` → `'p-6'` not `'p-4 p-6'`)

**Used throughout**: All shadcn/ui components, `page.tsx`, `theme-toggle-button.tsx`.

---

## Rules

- Do not modify `cn()` — it's a standard utility
- Add new utilities to `src/lib/` as separate exported functions in `utils.ts` or new files
- Utilities must be pure functions with no side effects

---

## Related Documents

- [TECH_STACK.md](../TECH_STACK.md)
