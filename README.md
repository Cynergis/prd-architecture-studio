# PRD & Architecture Studio

A BMAD-inspired plugin that drives the buildup of a **Product Requirements Document** and an
**Architecture & Design** document, then **generates a navigable, traceable HTML site** from them.

It extends the BMAD method (step-based, traceability-first, with an Advanced-elicitation / Perspectives /
Continue loop) but targets a single structured data model that renders as an interactive site.

## Skills

| Skill | What it does |
|-------|--------------|
| **atlas** | **Atlas, the Lead Product Engineer** — the named persona who owns the product end to end and coordinates the other skills as a team. Talk to Atlas to have one owner run discovery, PRD, architecture, the gated feature flow, implementation, and publishing. |
| **studio** | End-to-end orchestrator: discovery → PRD → architecture → generate → preview → publish. Start here ("start a product" / "run the studio"). |
| **feature-flow** | Governed, gated process for any feature (new or changed): validate idea vs goals → **approval gate** → architecture & code impact analysis → **approval gate** → Gherkin acceptance + SME validation → test-first implementation until all acceptance tests pass. |
| **prd-build** | Guided interview **or structure-from-notes** that fills the PRD (`window.__PRD__`): overview, strategic context, personas, product scope, journeys + use cases, functional/non-functional requirements, policies, governance, risk, glossary. Enforces measurable requirements and traceability. |
| **architecture-build** | Guided interview **or structure-from-notes** that fills the Architecture (`window.__ARCH__`): context & drivers, ADRs, tech stack, DDD subdomains (aggregate + components with ten facets), resources, APIs, integrations, security, infrastructure, design links, knowledge base — cross-linked to the PRD. |
| **prd-site** | Generates the static HTML site from `data.js` using the bundled, data-driven template, plus local-preview (`serve.sh`), one-command publish (`publish.sh`), and GitHub Pages tooling. |

## How it fits together

```
prd-build ─┐
           ├─►  data.js  (window.__PRD__ + window.__ARCH__)  ──►  prd-site  ──►  index.html (+ Pages tooling)
architecture-build ─┘
```

- Content lives only in `data.js`. The viewer template is static and data-driven, so regenerating
  after edits is deterministic.
- The shared schema is documented in `skills/prd-site/references/data-schema.md`.
- A worked example (`skills/prd-site/template/data.js`) ships so the site renders out of the box.

## Quick start

The easiest way: **"Atlas, lead this product."** Atlas (Lead Product Engineer) runs everything below
and keeps you in control at each gate. Or run the whole pipeline with **"start a product with the
studio"**, or use the skills individually:

1. **prd-build** — author the PRD (guided, or from existing notes).
2. **architecture-build** — design the solution against it.
3. **prd-site** — generate the site.
4. In the output folder: `bash serve.sh` to preview, `bash publish.sh <repo-url>` to publish to Pages.

See `GETTING-STARTED.md` for the copy-paste version.

## Relationship to BMAD

This is a companion to BMAD. BMAD's `create-prd` and `create-architecture` produce Markdown; this
plugin captures the same kind of content into a structured model and renders it as an explorable,
cross-linked site. Use BMAD for narrative documents and this for the interactive studio.
