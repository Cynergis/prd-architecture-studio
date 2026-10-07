# PRD & Architecture Studio, version 2

Atlas, the Lead Product Engineer, and the skills that carry a product from an idea to a published
knowledge base that other people query. Version 2 is the front door of [OTO](https://github.com/Cynergis/oto)'s
arc: the studio captures a product's specification and design **against OTO packs**, contributes
every confirmed section to the knowledge base **as it goes**, through the curate gates, and no
longer carries a vocabulary or a graph of its own. It depends on the `oto` plugin.

## The arc

```
1 Start ─► 2 Specify ─► 3 Derive the domain ─► 4 Design and flow ─► 5 Build ─► 6 Publish ─► 7 Readers
```

| Skill | What it does |
|---|---|
| **atlas** | The one owner of the arc. "Atlas, lead this product." Asks which kind of product and what you have, then runs the scenes, stopping at every gate. Orients with `oto status`; never voices a second persona. |
| **studio** | The arc end to end, in one go, with Atlas. "Start a product with the studio." |
| **capture** | The elicitation engine: reads a pack's `capture.json` (the questions by asker, the classes with their fields and links, every field carrying its term), runs the BMAD loop (ask, draft, **[A]** elicit, **[P]** perspectives, **[C]** continue), and on every **C** contributes the section through `oto curate propose`, `add` and `check`, then reports what the graph answers (`oto query questions`). |
| **prd-build** | The specification, captured against `product` and the product type's pack (`product-report`, …). |
| **architecture-build** | The design, captured against `ddd`, which sits on `software-architecture` and `product`. |
| **feature-flow** | A feature through the gates, read from the graph: the idea against the product's purpose (`kg_ask`), the impact on the design and the flow (`kg_neighbors`, `kg_brief impact-*`), the scenarios, then test-first with `kg_brief write-tests` and `kg_brief implement-step` in hand — BLOCKED by name until the missing fact is captured. |
| **prd-site** | The navigable site as an OTO view (`views/prd-site`): `data.js` is written from the graph by the engine on every build, never by hand. |

What left in version 2: `knowledge-graph` and the mesh ontology (the packs are the ontology; the
knowledge base is the graph), the built-in section lists of `prd-build` and `architecture-build`
(the capture schema is the form), and `data.js` as the source of truth (it is a projection).

## How it fits with OTO

```
pack (ontology + questions)  ──oto ontology capture──►  capture.json  ──capture skill──►  captures/<doc>.json
                                                                                              │
graph.json  ◄── oto curate apply ◄── oto curate check ◄── oto curate add ◄── oto curate propose ─┘
    │
    └──► oto build ──► kg_* tools, questions.yaml, capture.json, data.js (projection) ──► the site, the readers
```

- The pack says what to ask (`sections`, `types`, `x-term`); the studio asks it.
- What the person confirms becomes a capture, then a proposal, then facts — with the document,
  the section and the quote as evidence — under the same gates as any document.
- A reader installs the published pack and asks `kg_ask`; a correction comes back through the
  gates as a pull request.

## Install

```
/plugin marketplace add git@github.com:Cynergis/oto-registry.git
/plugin install oto@cynergis
/plugin install prd-architecture-studio@cynergis       # once published
```

Then: **"Atlas, lead this product."** See `GETTING-STARTED.md`, and `WALKTHROUGH.md` for the whole arc on a report product, dry run first.

## Tests

`tests/test_scenes.py` runs scenes 1 to 7 scripted on the report application against the OTO
release the plugin pins (`oto.release` in `.claude-plugin/plugin.json`, 0.11.0; `OTO_HOME` or `oto-kg` installed, and the `product` and `product-report`
packs on the machine, plus `ddd` and `flow`): the project, a capture of the report product's obligations, the gates, the
questions the graph answers and the ones left open, the design and the flow traced to the specification, and the
implementing agent's brief: BLOCKED by name, the missing fact captured, READY; the site from the graph, the domain pack on
a marketplace and the product's store published; a reader who installs the pack and one who syncs the store, both asking.
