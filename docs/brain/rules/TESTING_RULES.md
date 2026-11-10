# Testing Rules

> **Status**: No tests exist yet. These rules govern when tests are added.

---

## When Tests Are Required

1. **New business logic** must have unit tests. If you add carousel logic, flip conditions, or data transformation functions, write tests.
2. **Bug fixes** must include a regression test that would have caught the bug.
3. **AI flows** (when added) must have integration tests.
4. **Refactoring** must not reduce test coverage.

---

## Test Types & What to Use Them For

| Type | Tool | Use For |
|------|------|---------|
| Unit tests | Vitest | Functions, hooks, reducers, utilities |
| Component tests | Vitest + @testing-library/react | Individual React components |
| Integration tests | Vitest + @testing-library/react | Multi-component interactions |

> Currently, no testing framework is installed. Use the setup instructions in [TESTING.md](../TESTING.md).

---

## Test File Location & Naming

- Co-locate tests with source files OR use a `__tests__/` directory
- File naming: `ComponentName.test.tsx` or `functionName.test.ts`
- Use `.test.ts` for plain TypeScript, `.test.tsx` for React components

---

## Test Content Rules

1. **Test behavior, not implementation.** Test what the component does, not how it does it.
2. **Use descriptive test names.** `it('should wrap from last to first item on next click')` not `it('works')`.
3. **Do not test styling.** Tailwind class names are not behavior.
4. **Mock external services.** AI flows and Firebase calls must be mocked in tests.

---

## Running Tests

```bash
npm run test         # Run once (vitest --run)
npm run test:watch   # Watch mode (vitest)
```

**Never claim tests pass without actually running them.**

---

## Related Documents

- [TESTING.md](../TESTING.md)
- [BUSINESS_LOGIC.md](../BUSINESS_LOGIC.md)
- [TECHNICAL_DEBT.md](../TECHNICAL_DEBT.md)
