# Custom Hooks Module

> **Source**: `src/hooks/`  
> **Last Verified**: 2026-11-09

---

## `useIsMobile()` — `src/hooks/use-mobile.tsx`

```typescript
const MOBILE_BREAKPOINT = 768

export function useIsMobile(): boolean
```

**Returns**: `true` if viewport width < 768px, `false` otherwise.

**Implementation**: `window.matchMedia` listener that updates on viewport resize.

**Current Usage**: Imported but NOT currently used in `page.tsx`. The portfolio uses Tailwind responsive classes (`hidden md:flex`) for responsive behavior instead.

---

## `useToast()` — `src/hooks/use-toast.ts`

```typescript
export function useToast(): { toasts, toast, dismiss }
export function toast(props: Toast): { id, dismiss, update }
```

Custom implementation inspired by react-hot-toast. Uses a module-level store with reducer pattern.

**Reducer actions**: `ADD_TOAST`, `UPDATE_TOAST`, `DISMISS_TOAST`, `REMOVE_TOAST`

**Constants**:
- `TOAST_LIMIT = 1` — max 1 toast at a time
- `TOAST_REMOVE_DELAY = 1000000ms` — very long; toasts persist until dismissed

**Current Usage**: `Toaster` component is mounted in `layout.tsx`. The `toast()` function is available but not currently called anywhere in the portfolio page. Would be used if a contact form is added.

---

## Related Documents

- [modules/UI_COMPONENTS.md](./UI_COMPONENTS.md)
- [STATE_MANAGEMENT.md](../STATE_MANAGEMENT.md)
