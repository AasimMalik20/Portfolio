# GitHub Publishing Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a change-aware publishing skill and a GitHub workflow that synchronizes explicit commit trailers to an existing pull request.

**Architecture:** The `publishing-changes` skill inspects outgoing changes and drafts a commit message with `PR-Title` and `PR-Tracking` trailers. A small dependency-free Node script reads metadata from the PR head commit and updates only the PR title and a marked tracking section; GitHub Actions invokes it on PR open/synchronize events after checking out only the trusted base revision.

**Tech Stack:** Markdown skill, GitHub Actions YAML, Node.js built-ins and GitHub REST API.

**Spec:** `docs/superpowers/specs/2026-11-12-publishing-workflow-design.md`

## Global Constraints

- Do not stage files, create commits, push, create PRs, or rewrite existing commit history.
- Do not claim human authorship or remove a disclosure required by project policy.
- Do not send diffs to an external model.
- Do not update a PR when its head commit has missing or invalid metadata.
- Preserve PR description text outside the managed tracking section.
- The workflow reads commit metadata only; it does not check out or execute PR code.

## Review Focus

- Missing either metadata trailer: no PR fields change; test in Task 2.
- Duplicate or malformed metadata trailers: no PR fields change; test in Task 2.
- Empty or invalid PR title/tracking value: no PR fields change; test in Task 2.
- Missing, valid, or malformed tracking markers: preserve unrelated body text and refuse ambiguous marker pairs; test in Task 2.
- Untrusted PR head code: never checked out or executed by the workflow; verify the workflow source in Task 3.

---

### Task 1: Create the publishing skill

**Files:**
- Create: `.agents/skills/publishing-changes/SKILL.md`

**Interfaces:**
- Produces: a skill that inspects staged and outgoing changes, drafts a Conventional Commit message with exactly one `PR-Title` and one `PR-Tracking` trailer, and never stages, commits, pushes, or creates a PR.

- [ ] **Step 1: Run three baseline publishing scenarios without the skill**

Use a fresh-context subagent to respond to three realistic publish requests under combined pressure (time pressure, a request to omit disclosure even if required, and unrelated working-tree changes). Capture the choices and any rationalizations verbatim; do not provide the new skill.

- [ ] **Step 2: Run the scenarios and record baseline behavior**

Expected: observe whether the agent inspects the actual changes, preserves unrelated work, drafts useful metadata, and handles disclosure requests without false authorship claims.

- [ ] **Step 3: Read the skill-authoring reference and write the minimal skill**

Include only the rules needed to address the observed failures, plus the agreed trailer contract and non-mutating behavior. Use `name: publishing-changes` and a discovery description that starts with `Use when...`.

- [ ] **Step 4: Re-run the same scenarios with the skill**

Expected: the agent inspects actual changes, emits the two metadata trailers, preserves unrelated work, and follows disclosure policy without claiming human authorship.

### Task 2: Implement and test PR metadata synchronization

**Files:**
- Create: `.github/scripts/sync-pr-metadata.mjs`
- Test: `.github/scripts/sync-pr-metadata.test.mjs`

**Interfaces:**
- Produces: `parseMetadata(message)` returning `{ title, tracking }` only for a valid final trailer block; `updateTrackingSection(body, tracking)` returning a body with exactly one updated managed section or rejecting ambiguous markers.

- [ ] **Step 1: Write tests for valid/missing/duplicate/malformed trailers and marker preservation**

Cover parsing the two trailers; missing or duplicate values; empty values, control characters, titles over 256 characters, and tracking summaries over 1,000 characters; appending a tracking block when absent; replacing its content when present; preserving text outside the markers; and rejecting partial or duplicate marker pairs.

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test .github/scripts/sync-pr-metadata.test.mjs`
Expected: FAIL because the exported functions do not exist.

- [ ] **Step 3: Implement the parser and body updater**

Require exactly one non-empty `PR-Title` (maximum 256 characters) and `PR-Tracking` (maximum 1,000 characters) in the final commit trailer block. Reject control characters. Use stable markers `<!-- publish-tracker:start -->` and `<!-- publish-tracker:end -->`; preserve content outside one complete marker pair.

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test .github/scripts/sync-pr-metadata.test.mjs`
Expected: PASS for valid, missing, duplicate, malformed, and body-preservation cases.

### Task 3: Wire the GitHub workflow and verify the full change

**Files:**
- Create: `.github/workflows/sync-pr-metadata.yml`
- Modify: `.github/scripts/sync-pr-metadata.mjs`
- Test: `.github/scripts/sync-pr-metadata.test.mjs`

**Interfaces:**
- Consumes: PR number/head SHA from the event payload and the `PR-Title`/`PR-Tracking` trailers from the head commit.
- Produces: `syncPullRequest(event, { token, fetchImpl })` returning `updated` or `skipped`, and throwing on API failure; the workflow updates the existing PR title and managed tracking block only when both trailers are valid.

- [ ] **Step 1: Add tests for `syncPullRequest`**

Use an injected fetch implementation to assert invalid metadata never causes a PATCH and a non-success API response throws.

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test .github/scripts/sync-pr-metadata.test.mjs`
Expected: FAIL because `syncPullRequest` does not exist.

- [ ] **Step 3: Implement `syncPullRequest` in the script**

Read the PR head commit message and current PR body through the GitHub API. Update title and body together only after both trailers and marker structure validate. Missing or invalid metadata must log a clear no-op and leave the PR unchanged; API errors must fail the workflow visibly.

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test .github/scripts/sync-pr-metadata.test.mjs`
Expected: PASS, including no PATCH for invalid metadata and a thrown error for failed API calls.

- [ ] **Step 5: Add a workflow for `pull_request_target` opened/synchronize events**

Grant only `contents: read` and `pull-requests: write`. Check out only the trusted base repository revision, with persisted credentials disabled; never check out PR head code. Invoke the Node script with the event path and `GITHUB_TOKEN`.

- [ ] **Step 6: Verify the script and workflow**

Run: `node --test .github/scripts/sync-pr-metadata.test.mjs`
Expected: PASS.

Run: `git diff --check`
Expected: no whitespace errors.

Inspect the workflow to confirm least-privilege permissions, trusted-base-only checkout, and no shell interpolation of PR-controlled values.
