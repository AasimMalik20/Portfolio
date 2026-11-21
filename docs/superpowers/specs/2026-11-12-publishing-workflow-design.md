# GitHub Publishing Workflow Design

## Intent

Make commits and pull requests useful as a durable change tracker. The publishing skill should ground wording in the files and behavior actually changing, rather than inventing scope from a request alone.

## Goals

- Add a reusable assistant skill for preparing commit messages and GitHub pull-request metadata from the outgoing changes.
- Keep commit subjects and PR titles concise, natural, and specific; avoid gratuitous references to AI.
- Add a GitHub Actions workflow that updates an existing PR from explicit metadata in the pushed commit.
- Preserve PR description text outside a clearly marked tracking section.

## Non-goals and boundaries

- Do not stage files, create commits, push, create PRs, or rewrite existing commit history.
- Do not claim human authorship or remove a disclosure required by project policy.
- Do not send diffs to an external model.
- Do not update a PR when its head commit has missing or invalid metadata.

## Approaches considered

1. **Assistant skill only:** accurate and simple, but PR metadata must be copied manually.
2. **Mirror the latest commit subject/body:** simple automation, but it can produce poor titles for multi-commit PRs and does not distinguish commit wording from PR wording.
3. **Explicit metadata trailers plus a GitHub workflow (selected):** the skill inspects the changes and supplies `PR-Title` and `PR-Tracking` commit trailers. A workflow reads those trailers and updates the linked PR. This keeps interpretation with the skill, avoids another model/API, and makes the synchronization input explicit.

## Design

- Add a `publishing-changes` skill under `.agents/skills/`.
- Trigger it for requests to prepare, commit, push, or publish GitHub changes, including PR title/body updates.
- Have it inspect the staged changes and relevant outgoing commits before drafting a Conventional Commit message, a `PR-Title` trailer, and a concise `PR-Tracking` summary. It should report uncertainty instead of guessing and leave staging, committing, and pushing to the user.
- Add a GitHub Actions workflow for PR open/synchronize events. It reads only the PR head commit metadata, requires valid trailers, updates the PR title, and replaces only the contents between stable tracking markers in the PR body.
- Use the repository's `GITHUB_TOKEN` with only the permissions needed to read commit metadata and update PRs. Do not check out or execute PR code in the workflow.
- Leave the PR unchanged and report a clear workflow log message when trailers are absent or invalid.

## Constraints and calls

- The workflow updates an existing PR; it does not create one.
- A later push without valid trailers leaves the last synchronized PR metadata unchanged.
- Natural, matter-of-fact wording is the style goal. No disclosure required by repository policy may be bypassed, and the skill must not make false claims about authorship.
- The repository currently has a separate `caveman-commit` skill; this skill should complement it with change inspection and PR tracking rather than duplicate its concise commit-message guidance.

## Open to the implementer

- Choose the smallest safe workflow implementation and validate trailer parsing, marker preservation, and invalid/missing metadata behavior.
- Keep the skill concise and verify it against representative publish scenarios before considering it complete.
