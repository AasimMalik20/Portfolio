# Testing

> **Last Verified**: 2026-11-09

---

## Current Status

**❌ No tests exist.** No testing framework is configured. No test files exist anywhere in the repository.

---

## What Should Be Tested

If tests are added, these are the areas that matter most:

### Unit Tests

| Target | What to Test |
|--------|-------------|
| Carousel `handleNext` | Index increments; wraps from last to 0 |
| Carousel `handlePrev` | Index decrements; wraps from 0 to last |
| Card flip logic | Flips only when active + has githubLink; resets on inactive |
| `cn()` utility | Class merging and conflict resolution |
| `useIsMobile()` hook | Returns correct boolean at 768px breakpoint |
| `useToast` reducer | ADD_TOAST, UPDATE_TOAST, DISMISS_TOAST, REMOVE_TOAST actions |
| Theme toggle | `isDarkMode` logic, `setTheme` calls |

### Integration Tests

| Target | What to Test |
|--------|-------------|
| Hero section renders | Profile image, CTA buttons present |
| Navigation renders | All 8 nav links present on desktop |
| Mobile menu | Sheet opens on hamburger click, closes on link click |
| Resume download link | Correct `href` and `download` attribute |
| Certification links | `target="_blank"` and `rel="noopener noreferrer"` |
| Carousel navigation | Arrow buttons change active card |

### Visual / Snapshot Tests

- Hero section layout
- Dark mode vs light mode appearance

---

## Recommended Setup

```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest --run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

Add `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

---

## Related Documents

- [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md)
- [rules/TESTING_RULES.md](./rules/TESTING_RULES.md)
- [BUSINESS_LOGIC.md](./BUSINESS_LOGIC.md)
