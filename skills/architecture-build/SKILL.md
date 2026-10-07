---
name: architecture-build
description: >
  Design the solution as a knowledge base: captures the architecture against the
  `software-architecture` and `ddd` packs through the capture skill — context and drivers, ADRs,
  systems, components, interfaces, stores, environments, bounded contexts, aggregates, events —
  every component traced to the requirement it satisfies, every decision recorded with its
  alternatives. Use when the user wants to design or extend the architecture, record an ADR, or
  model the domain.
---

# Build the architecture

The design level of the knowledge base: how the solution is shaped to do what the specification
says. Captured against packs, cross-linked to the specification by relations, not conventions.

1. The project composes `software-architecture` and `ddd` beside the specification's packs
   (`oto init --ontology product,product-report,software-architecture,ddd`, or Atlas's scene 4).
   `ddd` is being generalised out of `ddd-kyc`; until it lands, capture against
   `software-architecture` and say so.
2. Run the **capture** skill with the schema of that project. Its askers are the architect, the
   on-call engineer, the data owner, the risk owner, compliance; its items are systems,
   components, interfaces, data stores, environments, teams, decisions, risks, runbooks,
   repositories — and the links that make the design traceable: a component `satisfies` a
   requirement, a decision `decides` a component, a risk `threatens` an asset.
3. Decision-first: an ADR is captured with its alternatives and consequences before the
   components it shapes; a component with no decision behind it is a finding (`kg_policy`).

What this skill no longer does: keep its own section list or write `window.__ARCH__`.
