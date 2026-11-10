# Git Rules

---

## Commit Rules

1. **Only create commits when explicitly asked** by the user.
2. **Stage specific files** — avoid `git add .` to prevent accidentally committing unrelated files.
3. **Never commit `.env` or any file containing secrets.**
4. **Check `git status`** before staging to review what has changed.

---

## Branch Rules

5. **Push to a new branch**, never directly to `main`/`master`, unless explicitly requested.
6. Use `git push -u origin <branch-name>` when pushing a new branch.

---

## Commit Message Format

Use present tense, imperative mood:
```
feat: add contact form with validation
fix: correct carousel wrap logic on last item
docs: update brain documentation for FEAT-005
refactor: extract ProjectCard to separate file
style: apply consistent badge variants in skills section
```

---

## Forbidden Actions (Require Explicit User Authorization)

- `git push --force` or `git push -f`
- `git reset --hard`
- `git clean -fd`
- `git branch -D`
- `git commit --amend` on pushed commits
- Deploying to production (`firebase deploy`)

---

## What to Check Before Committing

- `npm run typecheck` passes
- `npm run build` succeeds
- No `.env` files staged
- No `console.log` debug statements
- Brain documentation updated if code changed

---

## Related Documents

- [GLOBAL_RULES.md](./GLOBAL_RULES.md)
- [PERMISSIONS_RULES.md](./PERMISSIONS_RULES.md)
