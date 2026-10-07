---
name: capture
description: >
  Capture a specification or a design against an OTO pack: the pack's capture schema says which
  questions to ask, by whom, and which items with which fields and links each needs; the person
  answers, confirms a section, and the section becomes facts in the knowledge base through the
  curate gates. Guided interview, or structure-from-notes. Use when Atlas specifies or designs,
  or when the user wants to capture a PRD, an architecture, requirements, personas, journeys,
  policies, decisions, components or any section of a product against a pack.
---

# Capture against a pack

The pack knows what to ask. This skill asks it, in the BMAD loop the studio has always used, and
contributes what is confirmed — section by section, never at the end. You are a facilitator and a
peer; never invent content the person has not confirmed.

## Setup

1. The project: an OTO project (`oto status --project <root>`). The packs to capture against are
   the ones the project composes (`project.config.json`, `ontology`); for a specification that is
   `product` and `product-<type>`; for a design, `software-architecture` and `ddd`.
2. The schema: `oto ontology capture --project <root>` writes `capture.json`, what the project's
   vocabulary asks for: **sections** (the questions grouped by who asks), **types** (the classes
   with their fields, links and what they require), every field and link carrying its `x-term`.
   Read it before asking anything. Regenerate it when the vocabulary changes.
3. A document for what is said: the person's brief, notes or transcript if there is one
   (`inbox/`, then `oto ingest`); otherwise the session itself, written as a dated document with
   the **capture** skill of OTO (`oto capture`), so every fact has a source.

## Modes

- **Guided interview** (default when little is written): section by section, as below.
- **Structure from notes**: read the material in full first; for each section draft what the
  source supports, mark gaps and assumptions, ask only to fill the gaps; never invent a fact the
  source does not contain — flag it `TODO` for the person.

## The loop, per section

A section is one asker's questions (`sections[].who`), taken in the order the schema lists them.
For each question:

1. Say what it captures and why (`asks[].question`, `asks[].why`); name the item types it needs
   (`asks[].captures`) and, for each, the fields and links the schema lists — ask for the
   required ones, offer the choices of an enum, name the targets a link may point at.
2. Ask one focused set of questions with `AskUserQuestion`, 1–4 at a time.
3. Draft the items and show them, as items: type, id, label, fields, links, and where it was said.
4. The menu: **[A] Advanced elicitation · [P] Perspectives · [C] Continue & contribute**.
   - **A** — probe deeper: edge cases, missing actors, weak measures, counter-examples.
   - **P** — re-examine from the other askers the schema names (the data team, compliance…).
   - **C** — contribute (below), then the next question.
5. Only contribute on **C**. Ids are stable (`FR3`, `P1`, `ADR-04`); a changed item keeps its id.

## Contribute, on every C

Write the confirmed items as a capture file and let the gates take it:

```json
{"doc": "<document slug>", "as_of": "<the document's date>", "scope": "<the product, so its FR1 stays apart from another's>",
 "items": [{"type": "Requirement", "id": "FR3", "label": "Read every value from a finished column",
            "summary": "…", "fields": {"concerns": "data", "priority": "must"},
            "links": {"governs": ["report.fund-profile-balanced"]},
            "where": "§3.2", "quote": "The product reads finished columns; it never computes."}]}
```

```bash
oto curate propose --project <root> --from captures/<doc>-<section>.json   # refused if it is not a capture against the schema
oto curate add --project <root> --from proposals/<doc>.json --dry-run
oto curate add --project <root> --from proposals/<doc>.json
oto curate check --project <root>
```

Read the check's output and report it in the engine's words: a **blocking** finding (a shape
broken, a required question left unanswered, a link into nothing) is fixed in the capture and
re-proposed, never forced; a **gap** is told to the person and kept. A **SUSPECT** (a new id
whose name matches an existing node) is a question for the person: one thing or two.

Then the gate: `oto query --project <root> questions` says which of the pack's questions the
graph now answers as required and which it cannot, with the gap. Report it as "the graph answers
N of M a <type> product must answer; these are open: …". A `non_empty` question that stays
unanswered is open work, not a block on the conversation.

`oto curate apply --by "<the person>" --note "<what the section made answerable>"` closes a
section's candidate; `oto build` makes the answers queryable. Atlas decides when.

## Hand-off

When the specification's sections are captured, Atlas moves to scene 3 (OTO's **start** on the
specification, then **ontology-interview**). When the design's are, to the flow. The site
(`prd-site`) renders from `data.js`, a projection of the graph, regenerated after a build.

## Guardrails

- **The schema is the form.** A field or link the schema does not list is not captured; if the
  person needs it, that is a vocabulary change through `oto ontology check` and `accept`, not a
  free-text note.
- **Never fill `validated_by`.** A person who knows the domain confirms a term; the capture
  records who said a fact (the document), not that the vocabulary is right.
- **No implementation leakage in a specification; decision-first in a design.**
- **Measurable:** a criterion has a metric, a baseline, a target, a date; "fast" is not a value.
