---
name: architecture-build
description: >
  Guided, BMAD-style interview that builds an Architecture & Design document into window.__ARCH__
  inside data.js for the PRD/Architecture studio site. Use when the user wants to design the
  architecture, record ADRs, choose a tech stack, model Domain-Driven Design subdomains, aggregates
  and components, define resources (databases, queues, storage), APIs, integrations, security
  controls, infrastructure and environments, or link the solution back to the PRD. Works either as a
  guided interview or by structuring existing architecture notes, an RFC, or a transcript into the schema.
---

# Build an Architecture & Design document (BMAD-inspired)

Facilitate the design of the solution that satisfies the PRD, writing into `window.__ARCH__` in the
same `data.js`. Read `${CLAUDE_PLUGIN_ROOT}/skills/prd-site/references/data-schema.md` first. Requires
a populated `window.__PRD__` — the architecture cross-links to its FRs, NFRs, governance, and use cases.

## Modes

Choose a mode at the start (ask if unclear):

- **Guided interview** (default) — co-create section by section.
- **Structure from notes** — the user supplies architecture notes, an RFC, a diagram export, or a
  transcript. Read it in full, then draft each section from what it supports, marking gaps and
  assumptions and asking only about the gaps. Never invent technologies or decisions the source
  doesn't state — flag them as `TODO`.

Both modes write the same schema, run the same per-section A/P/C loop, and run the same integrity checks.

## Method (apply throughout)

- **Decision-first** — capture choices as ADRs with rationale, alternatives, and consequences.
- **Verify versions** — when naming technologies, confirm current stable/LTS versions (web search if
  available) and record them in the tech stack.
- **Trace to the PRD** — every ADR `affects`, component `mapsTo`, and security `addresses` must point
  to real PRD ids. Keep the loop bidirectional.
- **Agnostic boundaries** — components read/write directly only to their own subdomain's aggregate
  (its owned database tables); everything else is via API or queue.
- **No time estimates.**

## Per-section loop

For each section: explain it, ask focused questions with `AskUserQuestion`, draft, then present
**[A] Advanced elicitation · [P] Perspectives · [C] Continue & save**. Write to `data.js` only on **C**.

## Sections (in order)

1. **Context & drivers** — `context`: summary, drivers (tie to NFRs/governance), constraints,
   assumptions, and a Mermaid system-context `diagram`.
2. **Decisions (ADRs)** — `decisions`: each with category, status, rationale, alternatives,
   consequences, and `affects` (PRD ids). Cover at least: application architecture style (consult the
   Knowledge Base), data store, security, API style, and platform.
3. **Tech stack** — `stack`: technology per layer with verified versions and a one-line why.
4. **Components (DDD)** — `subdomainMaps` (cross-subdomain Mermaid maps) and `domains` (subdomains).
   For each subdomain: an `aggregate` (its owned data store + tables, each with typed `columns`),
   internal `maps`, and `components`. Each component carries: overview; typed `trigger`
   (API/User/Scheduler/Event with caller/actor/schedule/source + event schema + why); `businessRules`
   (each linked to a policy or FR); `command` list (each linked to an FR); `readModel`
   (Database table or API with request/response); `writeModel` (Subdomain table, or Product/External
   queue with JSON payload); `resource` ids it uses; `dependency` links (resource/component/
   integration); `hotspot` review messages; and a `code` object of links (repo, pipeline, tests,
   coverage, app, dashboard, runbook, owners, per-environment logs).
5. **Resources** — `resources`: every database, cache, object store, queue/stream, configuration,
   secret, and CDN, grouped by category, each with a configuration table. Queue names must match the
   ones referenced in component write models.
6. **APIs** — `apis`: published endpoints (method, path, purpose, errors, FRs realized).
7. **Integrations** — `integrations`: external systems, direction, protocol, data, auth, and the
   portfolio dependency each realizes.
8. **Security** — `security`: controls, each addressing an NFR or governance obligation.
9. **Infrastructure** — `infra`: cloud-wide settings (cloud, platform, summary, the ADRs behind the
   platform/cloud/services, NFRs met) and per-environment detail (cluster, region, console + IaC repo
   links, platform services, dashboards/logs).
10. **Design / UX** — `design.links`: links to external prototypes, system-design boards, Figma.
11. **Project structure** — `structure`: directory tree, requirements-to-code mapping, patterns.
12. **Knowledge base** — `kb`: decision criteria and a catalog of architecture patterns
    (modular monolith, microservices, serverless, durable workflows, event-driven) with when-to-use,
    when-to-avoid, trade-offs. Use it to justify the architecture-style ADR.

## After each save — integrity check

Validate every `affects`, `mapsTo`, `resource`, `dependency.ref`, `addresses`, and write-model queue
name resolves. Report dangling references.

## Hand-off

When ready, run **prd-site** to (re)generate the HTML site from `data.js`.
