# Permissions Rules

> **Defines what AI agents and developers may do autonomously vs what requires explicit user approval**

---

## Category A — AUTOMATICALLY ALLOWED

These operations are safe and can be performed without asking:

- ✅ Reading any file in the repository
- ✅ Searching code and file content
- ✅ Analyzing architecture and code patterns
- ✅ Creating or updating brain documentation in `docs/brain/`
- ✅ Running `npm run typecheck` (`tsc --noEmit`)
- ✅ Running `npm run lint`
- ✅ Running `npm run build`
- ✅ Running existing tests (when tests exist)
- ✅ Editing source files within the clearly requested scope
- ✅ Creating new component files
- ✅ Updating content data arrays in `page.tsx`

---

## Category B — ASK BEFORE EXECUTING

Always explain what you're about to do and why before proceeding:

- ⚠️ Installing new npm packages (`npm install <package>`)
- ⚠️ Removing npm packages (`npm uninstall <package>`)
- ⚠️ Changing package versions
- ⚠️ Modifying `next.config.ts` — affects the entire build
- ⚠️ Modifying `tailwind.config.ts` — affects all styling
- ⚠️ Modifying `src/app/globals.css` — affects the entire design system
- ⚠️ Adding or modifying environment variables (`.env`)
- ⚠️ Modifying `firebase.json` — affects deployment
- ⚠️ Running database operations (when Firestore is added)
- ⚠️ Adding new API routes
- ⚠️ Changing authentication / authorization logic
- ⚠️ Running `firebase deploy` — deploys to production

---

## Category C — NEVER WITHOUT EXPLICIT AUTHORIZATION

These operations require the user to explicitly say "yes, do this":

- 🚫 Deploying to production (`firebase deploy`)
- 🚫 Pushing to any remote git repository
- 🚫 Force pushing to git
- 🚫 Deleting database data
- 🚫 Dropping Firestore collections
- 🚫 Publishing npm packages or GitHub releases
- 🚫 Exposing or logging API keys or secrets
- 🚫 Disabling security controls (removing auth, removing HTTPS, etc.)
- 🚫 Mass file deletions
- 🚫 Modifying git history (`git reset --hard`, `git rebase`, `git commit --amend` on pushed commits)
- 🚫 Accessing or modifying production secrets in Secret Manager

---

## Notes

- These rules are guidelines for AI judgment and developer practices.
- The actual execution environment may have its own security controls that supersede these rules.
- When uncertain, always default to asking the user rather than proceeding.

---

## Related Documents

- [GLOBAL_RULES.md](./GLOBAL_RULES.md)
- [SECURITY_RULES.md](./SECURITY_RULES.md)
- [GIT_RULES.md](./GIT_RULES.md)
- [DEPLOYMENT.md](../DEPLOYMENT.md)
