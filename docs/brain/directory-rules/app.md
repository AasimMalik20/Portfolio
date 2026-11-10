# Directory Rules: src/app/

> **Applies to**: `src/app/` and all subdirectories

---

## Responsibilities

- Next.js App Router pages and layouts
- Global CSS and design tokens
- Route-specific components (inline in page.tsx for now)
- Static assets accessible at routes (via `/public/`)

---

## Rules

1. **`layout.tsx`** is the root layout. Modify it only for: global providers, fonts, metadata, head elements.
2. **`page.tsx`** is the portfolio page. All section changes happen here (or in extracted section components).
3. **`globals.css`** is the single source of truth for design tokens. CSS custom properties here control the entire visual appearance.
4. **Do not add inline styles** to layout.tsx or page.tsx (beyond the existing `<style jsx global>` block which is a known debt item).
5. **New pages** (e.g., `/blog`) get their own `page.tsx` in a new subdirectory: `src/app/blog/page.tsx`.
6. **API routes** go in `src/app/api/[route]/route.ts`.
7. **`src/app/logo-am.jpg`** is unused — do not reference it. Use `public/logo-am.png` instead.
8. **`src/app/studio.code-workspace`** is a VS Code artifact — do not modify.
9. **`src/app/favicon.ico`** — replace to update the browser tab icon.

---

## Metadata Pattern

Metadata is defined via the Next.js `metadata` export in `layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: '...',
  description: '...',
};
```

For page-specific metadata, use a `metadata` export in that page's `page.tsx`.

---

## Related Documents

- [architecture/FRONTEND.md](../architecture/FRONTEND.md)
- [CONFIGURATION.md](../CONFIGURATION.md)
- [rules/ARCHITECTURE_RULES.md](../rules/ARCHITECTURE_RULES.md)
