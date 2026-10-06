---
name: feature-flow
description: >
  Governed, gated process for adding or changing a product feature (from a blank product or as a new
  feature). Always: validate the idea against product goals and coherence, stop for approval, analyze
  architecture and code impact, stop for approval, finalize Gherkin acceptance criteria with SME
  validation, then implement test-first so every acceptance test passes. Use whenever the user wants
  to add a feature, change a feature, propose a capability, or build product features.
---

# Feature flow (gated)

This is the mandatory path for any feature work. Move through the phases in order. **Each gate is a
hard stop** — present findings, then HALT and wait for the user's explicit decision before continuing.
Never skip a gate, never start implementation before Gate 3.

Ground every assessment in the current `data.js` (`window.__PRD__` and `window.__ARCH__`) following
`${CLAUDE_PLUGIN_ROOT}/skills/prd-site/references/data-schema.md`. If the PRD or Architecture does not
exist yet, build them first with **prd-build** / **architecture-build**, then return here per feature.

Keep `data.js` the source of truth: as decisions are accepted, write the resulting FRs, use cases,
policies, ADRs, components, and resources into it, and regenerate the site with **prd-site** so the
documentation matches reality.

---

## Phase 1 — Idea validation (product coherence)

Restate the feature in one sentence, then assess it against the PRD:

- **Goal alignment** — which success metric(s) (`SC#`) or company key results it moves. If it moves
  none, say so plainly.
- **Value-proposition fit** — is it coherent with the vision, differentiator, and target users?
- **Coherence with existing features** — check FRs, use cases, and policies for conflicts, overlaps,
  or duplication. Name any incoherence explicitly.
- **Usability & value impact** — effect on the affected personas and journeys; does it raise or
  dilute overall product value? Any added user-facing complexity?
- **Scope fit** — MVP / Growth / Vision.

Produce a short **Idea Assessment**: a verdict (proceed / refine / reject), the reasons, the risks,
and the requirements it would add or change.

> 🛑 **GATE 1.** Present the Idea Assessment and STOP. Wait for the user to accept, refine, or reject.
> Do not proceed until they accept. If they refine, re-run Phase 1.

---

## Phase 2 — Architecture & code impact analysis

Only after Gate 1 acceptance. Assess against `window.__ARCH__`:

- **Surface touched** — which subdomains, components, aggregates, resources, APIs, integrations.
- **Complexity added** — does it increase coupling or moving parts? New ADRs, or changes to existing
  ADRs? New resources (DB, queue, storage)?
- **Risk** — data migration, performance/NFR pressure, security/governance exposure, blast radius.
- **Feasibility** — is it easily supported by the current architecture? Give the **simplest plan** to
  add it to the architecture and the code, and state what is required.
- **Rating** — low / medium / high effort and risk (no time estimates).

Produce an **Impact Analysis** with a recommended implementation plan and any new/changed ADRs.

> 🛑 **GATE 2.** Present the Impact Analysis and STOP. Wait for approval, or iterate the plan until the
> user is satisfied.

---

## Phase 3 — Acceptance criteria (Gherkin) + SME validation

After Gate 2. Write or complete the use case(s) for the feature and its **acceptance scenarios** in
Given / When / Then form, at the behaviour level (no UI selectors, no implementation detail):

- Map each scenario to the FR(s) it verifies; ensure every FR the feature introduces is covered.
- Include the main success path plus the important alternate and failure paths.
- Present the scenarios for SME review. Incorporate feedback until they are validated.

> 🛑 **GATE 3.** Get explicit authorization to implement. Do not write code before this.

---

## Phase 4 — Test-first implementation

Only after Gate 3 authorization.

1. **Generate the tests first.** Turn the acceptance scenarios into Gherkin `.feature` files and
   scaffold the executable tests (Cucumber step definitions or Playwright specs — match the project's
   stack; default to Gherkin `.feature` + Playwright if none exists).
2. **Implement the code** to satisfy the scenarios, following the approved plan and the project's
   patterns and architecture boundaries.
3. **Run the acceptance tests.** Loop: fix the code and re-run until **all** acceptance tests pass.
4. **When a test fails, diagnose honestly:**
   - If the **code** is wrong, fix the code.
   - If the **test** is wrong (mis-stated expectation), fix the test.
   - If the failure reveals an **incoherence between the feature and how we accepted it**, STOP and
     flag it to the user. Do not quietly weaken acceptance criteria to make tests pass.
5. **Sync the model.** Write the new/changed FRs, use case + acceptance, policies, ADRs, components,
   and resources into `data.js`, then regenerate the site with **prd-site**.

## Definition of done

- Idea accepted (Gate 1), impact approved (Gate 2), acceptance validated and authorized (Gate 3).
- Every acceptance test implemented and passing; no acceptance criterion weakened to force a pass.
- `data.js` updated and the site regenerated so docs, tests, and code agree.
