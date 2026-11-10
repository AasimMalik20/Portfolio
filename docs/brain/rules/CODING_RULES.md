# Coding Rules

> **Applies to**: All code changes in this repository  
> **Based on**: Actual codebase conventions (VERIFIED)

---

## Language & Typing

1. **TypeScript everywhere.** All new files must be `.ts` or `.tsx`. No `.js` files in `src/`.
2. **Strict types.** The project uses `"strict": true` in `tsconfig.json`. Do not use `any` without justification.
3. **No `// @ts-ignore` or `// @ts-nocheck`.** Fix the actual type error instead. (The existing `@ts-nocheck` in `theme-toggle-button.tsx` is a known debt item — do not add more.)
4. **Type-annotate function return types** for exported functions.

---

## File & Component Conventions

5. **React components**: Use function declarations or arrow function components.
6. **File naming**: `kebab-case.tsx` for components (e.g., `theme-toggle-button.tsx`).
7. **One component per file** for any new component files added. (The current monolithic `page.tsx` is tech debt — don't add more components to it without refactoring intent.)
8. **`'use client'` directive**: Only add when React hooks or browser APIs are required. Prefer Server Components where possible.

---

## Imports

9. **Use the `@/` alias** for all project imports (e.g., `@/components/ui/button`, `@/lib/utils`).
10. **Import order** (follow existing pattern):
    - React / Next.js
    - Third-party packages
    - Internal `@/components`
    - Internal `@/lib`, `@/hooks`
    - Types

---

## Styling

11. **Tailwind CSS only** for styling. Do not introduce CSS Modules or styled-components.
12. **Use the `cn()` utility** from `@/lib/utils` for all conditional class merging.
13. **Use design tokens.** Always use `text-foreground`, `bg-background`, `text-muted-foreground`, etc. Do not hardcode color values (e.g., avoid `text-gray-500` — use `text-muted-foreground`).
14. **shadcn/ui components first.** Before creating a new UI primitive, check if a shadcn/ui component already exists in `src/components/ui/`.
15. **Lucide icons only.** Icon library is `lucide-react`. Do not install other icon libraries.

---

## State Management

16. **Local state first.** Use `useState` and `useEffect` for component-level state. Only introduce shared state (Context, Zustand) if truly needed across many components.
17. **No global state for content.** Portfolio content is static — don't put it in a context or store.

---

## Data / Content

18. **Content lives in data arrays.** Add new portfolio content to the data arrays in `src/app/page.tsx` (or in `src/data/` if a data layer is extracted).
19. **Keep data structures consistent.** New work experience entries must match the shape of `workExperiences`. New projects must match `projects`.

---

## Error Handling

20. **Handle async errors.** Any future async operations (AI flows, form submissions) must have try/catch with user-visible error handling.
21. **Use `console.error` sparingly.** Prefer structured error handling over logging.

---

## Accessibility

22. **Icon-only buttons** must have `aria-label` (see existing examples: `aria-label="Previous Experience"`, `aria-label="Toggle theme"`).
23. **Screen reader text**: Use `<span className="sr-only">` for hidden text where needed (see `ThemeToggleButton`).
24. **External links**: Always include `rel="noopener noreferrer"` with `target="_blank"`.
25. **Images**: Always include `alt` text.

---

## Prohibited Practices

- ❌ Do not use `dangerouslySetInnerHTML`
- ❌ Do not use inline `style` objects for anything Tailwind can handle
- ❌ Do not introduce a second CSS framework
- ❌ Do not add `// @ts-ignore` or `// @ts-nocheck`
- ❌ Do not hardcode color hex values in className (use design tokens)
- ❌ Do not skip the `cn()` utility when merging classes conditionally
- ❌ Do not add dependencies without following [DEPENDENCY_RULES.md](./DEPENDENCY_RULES.md)

---

## Related Rules

- [ARCHITECTURE_RULES.md](./ARCHITECTURE_RULES.md)
- [DEPENDENCY_RULES.md](./DEPENDENCY_RULES.md)
- [SECURITY_RULES.md](./SECURITY_RULES.md)
