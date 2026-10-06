# Knowledge-graph ontology (v1)

The knowledge-graph stage turns a validated PRD + Architecture (`window.__PRD__` + `window.__ARCH__`)
into a **typed property graph** — nodes with properties and typed, directed edges. Every product Atlas
builds emits one such subgraph; the subgraphs compose into an organization-wide **knowledge mesh** that
shares one ontology (this file). The ontology is the contract; the generator (`graph.js`) is the
producer.

## Identity & namespacing (how subgraphs join the mesh)

- Each node has a stable **`localId`** (the PRD/architecture id, e.g. `FR3`, `C1`, `ADR-04`) and a
  mesh-unique **`id`** = `"<product-slug>:<localId>"` (e.g. `claritas-claims:FR3`). Namespacing keeps
  two products' `FR1`s distinct in the mesh.
- **Seam nodes** are shared across products and are **not** namespaced. An `ExternalProduct` referenced
  by a dependency or integration gets the mesh id `mesh:product:<slug>`, so when another product
  references the same system, both subgraphs converge on the *same* node. Seams are where the mesh
  actually meshes.
- Every node carries `scope: "product" | "mesh"`, `doc: "prd" | "arch" | "mesh"`, and `props`.

## Node types

| Type | Source | Key props |
|------|--------|-----------|
| `Product` | `overview` | author, date, problem, domain, capability |
| `Persona` | `personas[]` | role, tier, goal, authority, frequency |
| `Stakeholder` | `stakeholders[]` | role, interest |
| `Objective` | `portfolio.objectives[]` | owner |
| `KeyResult` | `objectives[].keyResults[]` | kr, contribution |
| `SuccessMetric` | `overview.criteria[]` (`SC#`) | text, metric |
| `Journey` | `journeys[]` | title, personaId |
| `UseCase` | `usecases[]` | title, trigger |
| `FunctionalRequirement` | `specs.functional[]` (`FR#`) | area, text |
| `NonFunctionalRequirement` | `specs.nonfunctional[]` (`NFR#`) | cat, text |
| `Policy` | `specs.policies[]` (`POL#`) | name, statement |
| `Risk` | `risk[]` | cat, likelihood, impact, owner |
| `Governance` | `governance[]` (`G#`) | item, type, owner, status |
| `Decision` (ADR) | `decisions[]` (`ADR-#`) | cat, status, title |
| `Subdomain` | `domains[]` (`DOM#`) | name, summary |
| `DataStore` (aggregate) | `domains[].aggregate` | name, store |
| `Component` | `domains[].components[]` (`C#`) | overview, hotspots |
| `Resource` | `resources[]` (`R-*`) | cat, engine, desc |
| `Api` | `apis[]` | method, path, purpose |
| `Integration` | `integrations[]` (`INT#`) | system, direction, protocol |
| `SecurityControl` | `security[]` (`SEC#`) | control, approach |
| `Technology` | `stack[]` | layer, choice |
| `ExternalProduct` (seam) | `portfolio.dependencies[]`, integration targets | direction, nature |

## Edge types (directed, with optional props)

| Edge | From → To | Derived from |
|------|-----------|--------------|
| `contains` | Product → Subdomain / Persona / … | structural ownership |
| `experiences` | Persona → Journey | `journey.personaId` |
| `performed_by` | UseCase → Persona | `usecase.primaryActor` |
| `belongs_to` | UseCase → Journey | `usecase.journeyId` |
| `realizes` | UseCase → FunctionalRequirement | `usecase.frs[]` |
| `traces_to` | FunctionalRequirement → Journey | `fr.traceJ` |
| `measured_by` | FunctionalRequirement → SuccessMetric | `fr.traceSC` |
| `has_key_result` | Objective → KeyResult | nesting |
| `targets` | KeyResult → SuccessMetric | `keyResult.metric` (`SC#`) |
| `concerns` | Stakeholder → Governance | `stakeholder.govLink` |
| `governs` | Policy → FunctionalRequirement | `policy.traceFR` |
| `satisfies` | Decision → FR / NFR / Governance / SuccessMetric | `decision.affects[]` |
| `owns` | Subdomain → DataStore | `domain.aggregate` |
| `part_of` | Component → Subdomain | nesting |
| `implements` | Component → FunctionalRequirement | `component.mapsTo[]` |
| `realizes_command` | Component → FunctionalRequirement | `component.command[].ref` |
| `enforces` | Component → Policy | `component.businessRules[].ref` |
| `uses_resource` | Component → Resource | `component.resource[]` + typed `dependency` |
| `depends_on` | Component → Component | typed `dependency` (`type:"component"`) |
| `uses_integration` | Component → Integration | typed `dependency` (`type:"integration"`) |
| `exposes` | Api → FunctionalRequirement | `api.realizes[]` |
| `integrates_with` | Integration → ExternalProduct | `integration.dependsOn` → dependency |
| `addresses` | SecurityControl → FR / NFR / Governance | `security.addresses[]` |
| `uses_technology` | Product → Technology | `stack[]` |
| `depends_on_product` | Product → ExternalProduct (seam) | `portfolio.dependencies[]` |

## Integrity (a first-class output)

The generator only emits an edge when **both endpoints resolve**. Any cross-reference whose target is
missing is recorded in `unresolved[]` rather than silently dropped — so the graph doubles as a
**traceability audit**: dangling `affects`/`traceSC`/`mapsTo` ids surface as gaps, exactly the kind of
thing Atlas flags before sign-off.

## The knowledge mesh

- One graph per product → a growing library of subgraphs.
- Subgraphs join at **seam nodes** (shared external products, and — by convention — shared personas,
  shared platform resources, and shared governance items keyed by a `meshKey`).
- Because every subgraph uses **this ontology**, the union is queryable as one org graph: "which
  products depend on the Policy Admin System?", "which decisions touch a PCI control?", "what breaks if
  this resource is retired?" — answerable across the whole portfolio.
- The ontology is therefore the organization's **semantic layer**: types + relationships agreed once,
  applied to every product Atlas delivers.

## Output formats

- `graph.json` — `{ product, ontologyVersion, generatedAt, stats, nodes[], edges[], unresolved[] }`.
- `graph.jsonld` — the same graph as JSON-LD (`@context` maps every edge type to `@id` relations and
  every node to an IRI under the mesh base), so it loads into RDF/triple stores and standard graph
  tooling.

Versioned: bump `ontologyVersion` when node/edge types change; subgraphs record the version they were
built against so the mesh can migrate.
