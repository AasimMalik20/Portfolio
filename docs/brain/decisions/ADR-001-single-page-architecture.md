# ADR-001: Single-Page Architecture

> **Status**: Implemented  
> **Date**: ~Jun 2026

---

## Decision

Build the entire portfolio as a single scrollable page (`/`) with anchor link navigation rather than using multiple routes.

## Context

Personal portfolio websites benefit from an uninterrupted narrative flow — visitors scroll through content progressively. Deep-linking to individual sections via anchors (e.g., `#projects`) is sufficient for the use case.

## Consequences

- **Positive**: Simple routing, fast navigation, no route transitions needed
- **Positive**: Easy deployment — single page, no complex routing config
- **Negative**: All content loads on first visit (acceptable for a small portfolio)
- **Negative**: Cannot deep-link to a specific project or experience item

## Alternatives Considered

- Multi-page routing (`/experience`, `/projects`) — rejected as unnecessary complexity for a portfolio

## Related Documents

- [ARCHITECTURE.md](../ARCHITECTURE.md)
- [DECISIONS.md](../DECISIONS.md)
