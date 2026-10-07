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
| **architecture-build** | The design, captured against `software-architecture` and `ddd`. |
| **feature-flow** | A feature through the gates: validate against the goals, impact, acceptance, test-first implementation. (Reads the graph in a later release.) |
| **prd-site** | The navigable site, rendered from `data.js`, a projection of the graph. |

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

Then: **"Atlas, lead this product."** See `GETTING-STARTED.md`.

## Tests

`tests/test_scenes.py` runs scenes 1 to 3 scripted on the report application against the OTO
release the plugin pins (`oto.release` in `.claude-plugin/plugin.json`, 0.8.3; `OTO_HOME` or `oto-kg` installed, and the `product` and `product-report`
packs on the machine): the project, a capture of the report product's obligations, the gates, the
questions the graph answers.
