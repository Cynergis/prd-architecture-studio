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

1. The project composes `ddd` beside the specification's packs (`oto init --empty --ontology
   product-report,ddd`, or Atlas's scene 4): `ddd` sits on `software-architecture`, which sits on
   `product`, so one name brings the estate and the model, and a project that already has the
   specification adds `ddd` to its `ontology` and re-runs `oto ontology capture`.
2. Run the **capture** skill with the schema of that project. Its askers are the architect, the
   on-call engineer, the data owner, the risk owner, the builder, compliance; its items are
   systems, components, interfaces, data stores, environments, teams, runbooks, repositories
   (the estate) and subdomains, bounded contexts and their map, use cases, events, commands,
   reactions, read models, external systems, aggregates, entities, value objects, business
   rules, domain services (the model) — and the links that make the design traceable: a
   component or a use case `satisfies` a requirement (SA17, DD24 say what is left), a context
   is `deployed_as` a component, a decision is `about` what it shaped, a risk `threatens` an
   asset. The people, the requirements, the policies, the scenarios, the terms, the decisions
   and the open questions are the product's: never captured twice.
3. Decision-first: an ADR is captured with its alternatives and consequences before the
   components it shapes; a component with no decision behind it is a finding (`kg_policy`).

What this skill no longer does: keep its own section list or write `window.__ARCH__`.
