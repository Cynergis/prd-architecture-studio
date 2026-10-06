---
name: knowledge-graph
description: >
  Generate a typed knowledge graph (nodes + properties + typed edges) from a validated PRD +
  Architecture (data.js), and contribute it to the organization knowledge mesh / ontology layer. Use
  after the PRD and architecture are reviewed, implemented, and validated — when the user wants to build
  the knowledge base, emit the graph, produce a JSON/JSON-LD graph, add the product to the mesh, or run
  cross-product/portfolio queries over the ontology.
---

# knowledge-graph — from a validated product to the org knowledge mesh

This is the stage **after** build and validation. Once the PRD and architecture are reviewed,
implemented, and the acceptance tests pass, Atlas turns the same `data.js` (the single source of truth)
into a **typed property graph**: every PRD and architecture item becomes a node with properties, and
every cross-reference becomes a typed, directed edge. That subgraph is then contributed to a growing
**knowledge mesh** — an organization-wide knowledge base governed by one shared **ontology**.

## When to run

- The product is validated (gates passed, tests green) and `data.js` reflects reality.
- The user asks to "build the knowledge base / graph", "emit the graph", "add this to the mesh", or to
  query relationships ("what depends on X?", "which decisions touch a PCI control?").

## Inputs

A `data.js` defining `window.__PRD__` and `window.__ARCH__` — the very file the site is generated from.
No separate authoring; the graph is derived, so it can never drift from the documents.

## What it does

1. Confirm the path to `data.js` and an output folder (default: a `knowledge-graph/` in the outputs).
2. Run the generator:
   ```bash
   node ${CLAUDE_PLUGIN_ROOT}/skills/knowledge-graph/graph.js <data.js> <outDir>
   ```
   It validates `data.js`, walks the PRD + architecture, and writes:
   - `graph.json` — `{ product, ontologyVersion, generatedAt, stats, nodes[], edges[], unresolved[] }`
   - `graph.jsonld` — the same graph as JSON-LD for RDF / triple stores / standard graph tooling.
3. Report the stats: node/edge counts by type, and **`unresolved[]`** — cross-references whose target is
   missing. An empty `unresolved` means full traceability; anything in it is a real gap to fix in the
   PRD/architecture (then regenerate). Treat unresolved refs the way Atlas treats any incoherence:
   surface them, don't bury them.
4. Contribute to the mesh: the graph is namespaced by product slug, and shared external systems are
   emitted as un-namespaced **seam nodes** (`mesh:product:<slug>`), so this subgraph joins the mesh at
   exactly the points it shares with other products.

## The ontology (the contract)

Node types include Product, Persona, Stakeholder, Objective, KeyResult, SuccessMetric, Journey, UseCase,
FunctionalRequirement, NonFunctionalRequirement, Policy, Risk, Governance, Decision (ADR), Subdomain,
DataStore, Component, Resource, Api, Integration, SecurityControl, Technology, and ExternalProduct (seam).
Edges are typed and directed — `implements`, `satisfies`, `governs`, `traces_to`, `measured_by`,
`uses_resource`, `depends_on`, `integrates_with`, `addresses`, `depends_on_product`, and more.

**Full definitions live in [references/ontology.md](references/ontology.md).** Read it before extending
node/edge types, and bump `ontologyVersion` in `graph.js` when the schema changes.

## The knowledge mesh / ontology layer

- One graph per product → a growing library of subgraphs, all built against the **same ontology**.
- Subgraphs join at **seam nodes** (shared external products today; shared personas, platform resources,
  and governance items by convention as the mesh matures).
- Because the vocabulary is shared, the union is queryable as one organization graph — impact analysis,
  portfolio dependency maps, compliance coverage, reuse discovery — across every product Atlas delivers.
- The ontology is the organization's **semantic layer**: agreed once, applied everywhere, versioned over
  time. The mesh is built **gradually** — every validated product adds to it.

## Atlas's stance

The graph is *derived*, never hand-maintained — so it stays true to the documents. Atlas runs this stage
only after validation, reports the integrity result honestly, and treats the mesh as a shared asset:
consistent ids, consistent types, no product-specific hacks in the ontology.
