---
name: prd-build
description: >
  Guided, BMAD-style interview that builds a structured Product Requirements Document into
  window.__PRD__ inside data.js for the PRD/Architecture studio site. Use when the user wants to
  create or extend a PRD, capture requirements, define personas, user journeys, use cases,
  functional or non-functional requirements, policies, governance, risk, product scope, success
  metrics, or strategic/portfolio context for the studio site. Works either as a guided interview or
  by structuring an existing brief, discovery notes, or transcript into the schema.
---

# Build a PRD (BMAD-inspired)

Facilitate, section by section, the creation of a structured PRD that the studio site renders.
You are a facilitator and a peer product manager — never invent content the user has not confirmed.
Write the result into `window.__PRD__` in a `data.js` file, following the shared schema at
`${CLAUDE_PLUGIN_ROOT}/skills/prd-site/references/data-schema.md` (read it before writing).

## Modes

Choose a mode at the start (ask if unclear):

- **Guided interview** (default when little is written) — co-create section by section.
- **Structure from notes** — the user supplies a brief, discovery notes, a transcript, or an existing
  document. Read it in full first. Then for each section, draft the content the source supports,
  explicitly marking gaps and assumptions, and ask targeted questions only to fill the gaps. Never
  invent facts the source doesn't contain — flag them as `TODO` for the user to confirm.

Both modes write the same schema, run the same per-section A/P/C loop, and run the same integrity
checks. In structure-from-notes mode, the per-section "ask questions" step becomes "draft from the
notes, list what's missing, ask only about the gaps".

## Setup

1. Locate the working `data.js`. If none exists, create one from
   `${CLAUDE_PLUGIN_ROOT}/skills/prd-site/template/data.js` (it carries an example you replace) or
   start an empty `window.__PRD__ = {}; window.__ARCH__ = {};`.
2. Confirm the project name and one-line summary before starting.

## Method (apply throughout)

- **High information density** — every sentence carries weight. Cut filler ("the system will allow
  users to…" becomes "Users can…").
- **Measurable requirements** — FRs are testable capabilities; NFRs state metric + condition +
  measurement. Reject subjective adjectives ("fast", "intuitive", "scalable") — replace with numbers.
- **No implementation leakage** — PRD says WHAT, not HOW. No tech names, tables, or endpoints here.
- **Traceability chain** — Problem → Vision → Success metric → Journey → Use case → Functional
  requirement. Every requirement must trace to a user need.

## Per-section loop

Work the sections in the order below. For each one:

1. State what the section captures and why it matters.
2. Ask one focused set of questions with `AskUserQuestion` (don't overwhelm — 1–4 at a time).
3. Draft the section content from the answers and show it.
4. Present the menu: **[A] Advanced elicitation · [P] Perspectives · [C] Continue & save**.
   - **A** — probe deeper (edge cases, missing actors, weak metrics, counter-examples); fold in
     accepted improvements, then show the menu again.
   - **P** — re-examine from other roles (engineer, support, finance, security); fold in accepted
     points, then show the menu again.
   - **C** — write the section into `window.__PRD__` in `data.js`, then move to the next section.
5. Only write to `data.js` on **C**. Keep ids stable.

## Sections (in order)

1. **Overview** — `overview`: problem statement, background, vision, objectives, differentiator,
   target users, and measurable success metrics (`criteria` with `metric`).
2. **Strategic context** — `portfolio`: business domain, capability, value stream and where the
   product sits; owners by role; dependencies on other products (upstream/downstream); company
   objectives → key results → which success metric each contributes to.
3. **Personas** — `personas`: for each, the story frame (situation, goal, obstacle, solution) plus
   tier, personal success metric, permissions, usage frequency, work volume, decision authority,
   collaboration/handoffs, touchpoints, current tools, regulatory context, and a quote. Then
   `stakeholders` (people who care but don't use it daily), each optionally linked to a governance id.
4. **Product** — `product`: MVP strategy, in-scope vs out-of-scope, and MVP/Growth/Vision phases.
5. **Use cases & journeys** — `journeys` (narrative arc: opening → rising → climax → resolution,
   tied to a persona) and `usecases` (trigger, actors, orchestration, numbered main flow,
   extensions, terminal states, the `frs` they exercise, a Mermaid `workflow`, and Given/When/Then
   `acceptance`). Each use case realizes one journey.
6. **Specifications** — `specs.functional` (FRs grouped by capability `area`, each tracing to a
   journey and a success metric), `specs.nonfunctional` (measurable NFRs), and `specs.policies`
   (business rules the product enforces, each tracing to an FR).
7. **Governance** — `governance`: compliance obligations, approvals, ownership, key decisions.
8. **Risk** — `risk`: technical/market/resource risks with likelihood, impact, mitigation, owner.
9. **Glossary** — `glossary`: shared business terms.

## After each save — integrity check

Run the cross-link checks from the schema reference (every `traceJ`/`traceSC`/`frs` id resolves;
every policy/FR reference exists). Flag dangling ids to the user.

## Hand-off

When the PRD is in good shape, tell the user they can run **architecture-build** to design the
solution against it, and **prd-site** to generate the navigable HTML site. For adding or changing an
individual feature afterwards, route it through **feature-flow** (gated idea validation → impact
analysis → acceptance → test-first implementation) rather than editing freehand.
