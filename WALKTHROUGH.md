# Walkthrough — marketplaces, plugins, discovery, then the report and its code

Everything below happens in Claude Code with plugins and your agents; the terminal lines are what
the agents run and what you can run yourself to check them. Three parts: **install** (the
marketplaces and plugins), **discover** (what is there and what it does for you), **do** (define
a report as the analyst, then generate its template and the code of the flow that builds and runs
it).

Is there already a pack? Yes. The levels the arc needs all exist and are plugins now:

| Plugin | What it is | Marketplace |
|---|---|---|
| `oto` | the engine: the `kg_*` tools, the generic skills, the session hook; ships `portfolio`, `product`, `software-architecture`, `ddd`, `work` | `cynergis-engine` (the checkout) → `Cynergis/oto` once pushed |
| `prd-architecture-studio` | Atlas and the studio's skills: capture, prd-build, architecture-build, feature-flow, prd-site | `cynergis-studio` (the checkout) |
| `report` | the report domain: a report type, its sections, fields, columns, policies, lifecycle; skills **new-report**, **ask-reports**, start | `cynergis-local` (the local registry) → `Cynergis/oto-registry` once pushed |
| `product-report` | what a *report* product's specification must say (RP1–RP10) | same |
| `flow` | steps, checks, transitions, artifacts; the briefs; skill **implement-step** | same |
| `work` | work items and milestones; what slips if a component is late | same |
| `pdf-to-template` (the plugin you already have, `local-report-tools`) | the sample PDF → an HTML/CSS + Jinja2 template; keep it: it is the template build | `local-report-tools` |

Nothing to build. What you bring is your product's brief and your report type's definition.

---

## 1. Install

Until the branch is pushed, the engine and the studio come from their checkouts and the packs
from a local registry on this machine. Once pushed, the same four lines point at GitHub.

```bash
# 1. the engine from the checkout (the plugin's MCP server and hook read this; unset it after the push)
echo 'export OTO_SOURCE=$HOME/Downloads/oto' >> ~/.zshrc && source ~/.zshrc
# a command-line oto too, for the lines below
alias oto='uvx --from "$OTO_SOURCE" oto'         # or: python3 -m venv ~/oto-venv && ~/oto-venv/bin/pip install -e "$OTO_SOURCE[rdf]"
oto version
```

In Claude Code (any folder), in this order:

```text
/plugin marketplace add ~/Downloads/oto                     # cynergis-engine        (later: Cynergis/oto)
/plugin marketplace add ~/Downloads/prd-architecture-studio # cynergis-studio        (later: Cynergis/prd-architecture-studio)
/plugin marketplace add ~/Downloads/oto-marketplace         # cynergis-local         (later: Cynergis/oto-registry)
/plugin install oto@cynergis-engine
/plugin install prd-architecture-studio@cynergis-studio
/plugin install report@cynergis-local
/plugin install product-report@cynergis-local
/plugin install flow@cynergis-local
/plugin install work@cynergis-local
```

Then `/plugin` → Installed: eight plugins (the seven above and `pdf-to-template@local-report-tools`).
Remove the old `oto@cynergis` (0.6.1) so one engine answers: `/plugin uninstall oto@cynergis`.

The packs also install their ontologies for the command line: `oto pack list`, and
`oto registry add ~/Downloads/oto-registry-local.git` then `oto pack add report` if a pack is
missing from `oto ontology list`.

---

## 2. Discover

Start Claude Code in a new folder, say nothing yet, and ask these in turn. Each has an agent
that answers from the engine, and a line you can run to see the same thing.

**What plugins and packs are there, and what can they do for me?**
`/oto:concierge` — the guide: where you are, what the choices are, which skill to load next.
The skills by plugin:
- `oto:` start, concierge, curate, query-knowledge, ontology-interview, build-knowledge-base, capture, act, evaluate, vet-provenance, spec;
- `prd-architecture-studio:` atlas, studio, capture, prd-build, architecture-build, feature-flow, prd-site;
- `report:` new-report, ask-reports, start; `flow:` implement-step, start; `product-report:` start; `work:` start.

```bash
oto ontology list                        # every ontology on the machine, by domain, with what it extends
oto ontology list --product-types        # report  product-report: the kinds of product Atlas can start
oto ontology show report                 # a pack in full: classes, questions, rules, the sample, self-check
```

**What is a report, here?** `/report:ask-reports` on a catalogue. Make the demo catalogue first:

```bash
mkdir -p ~/explore && cd ~/explore
oto init --name "Report catalogue" --slug catalogue --pack report     # the pack's sample: the fund profile (balanced)
oto build
```

then ask the agent: *"what reports do we have?"* (Q1), *"what does the fund profile show, section by
section?"* (Q7), *"where does each field come from?"* (Q4, Q5), *"when does it run and where do
the documents go?"* (Q11, Q10), *"what does lineage status mean?"* (`kg_define`). Every answer
names its question and the fact's source; a gap is said, never filled.

```bash
oto query questions                      # the 26 questions of the report ontology and whether this catalogue answers each
oto query ask Q7 REPORT=report.fund-profile-balanced
oto query define ReportType
```

**How do I get started on my own report?** `/report:new-report` — the analyst's interview, below.

**What are the flows, and what will they produce?** Two flows exist as facts:

- the `flow` pack's own sample (three steps: extract, review, done) — `oto init --pack flow`;
- the **pdf-to-template flow**: the real 30-step process that builds a template from a sample PDF
  and runs production batches, ported as a project graph:

```bash
mkdir -p ~/explore-flow && cd ~/explore-flow
oto init --name "pdf-to-template" --slug ptt --ontology flow,report --empty
cp ~/Downloads/report-ontology/fixtures/pdf-to-template/graph.json graph.json && oto build
oto query ask FL18 STEP=step.b10_verify      # which phase, where it starts
oto query ask FL13                            # what the engine must expose to guards
oto query brief implement-step                # readiness: 8 READY, 10 BLOCKED FL3 (no field spec on their JSON output)
oto query brief implement-step STEP=step.b10_verify   # every fact the verify script needs
oto query brief impact-parameter PARAM=param.ssim_region_min_vector   # what a threshold change reaches
```

What the flows produce: the template build phase ends with a frozen `TemplateRelease` (the
template, its sample, its thresholds, who signed it off); the production run ends with a published
batch of documents. What the *tools* produce for you: a knowledge base you can ask (the graph, its
store, its site), a report definition the catalogue holds, a template (the `pdf-to-template`
skill), and step scripts written from their brief (`flow:implement-step`).

---

## 3. Do: define a report as the analyst, then generate its template and its code

### 3.1 The project

```bash
mkdir -p ~/my-reports && cd ~/my-reports
oto init --name "<your product>" --slug reports --ontology product-report,ddd,flow,work --empty
```

`--empty`: the graph holds what your people say, never a pack's example. The product-report
pack brings `product`, `portfolio` and `report` with it. Start Claude Code here; the session hook
prints `oto status`.

### 3.2 Define the report type — `/report:new-report`

You are the report analyst. Bring one real report: its sample PDF, the warehouse table and its
columns, what identifies a document (fund, series, as-of, language). The agent reads
`capture.json` (the form: the ontology's questions by who asks them), asks in groups — what the
report is; what identifies a document; where the data comes from; how it runs and where documents
go; rules, verification and approval — drafts the sections and fields from the PDF for you to
correct, proposes a column per field for you to verify, and after every group runs the gates:

```bash
oto curate propose --from captures/<report>-<group>.json
oto curate add --from proposals/<doc>.json && oto curate check && oto curate apply --by "<you>"
oto build && oto query questions
```

Blocking is a shape or a policy of the report ontology (a mapping that claims a column the table
does not hold; a report past inception with no section); a gap is a question still open (fields
with no column, a meaning missing in French). The report's lifecycle goes `inception` → `saved`
as `StatusChange` facts, never rewritten. At the end you hear what is still owed before production
and who can supply it.

### 3.3 The product specification — Atlas

**"Atlas, lead this product."** Scene 2 captures the *product's* obligations against
`product-report` (which report types it must produce, the data rule, channels, sign-offs, run
guarantees), each section through the gates, `oto query questions` after each: the product's
questions answer, the domain's are the report you just defined. Scene 4 captures the design
(`ddd`) and the flow of *your* build and run; Atlas reports `SA17` (what nothing satisfies) and
`WK5` (what slips if a component is late) as they become answerable.

### 3.4 Generate the template — `/pdf-to-template:pdf-to-template`

From the same sample PDF: inspect, palette, author the HTML/CSS + Jinja2 template, render, diff
against the source until the gate passes, freeze. Its result is a `TemplateRelease`: capture it
(the release, the sample it reproduces, its thresholds, the run that produced it) so Q9, Q13, Q14,
Q21 and Q22 answer and `RP10` can say the report type is ready for production.

### 3.5 Generate the code of the flow — `/flow:implement-step`

For the steps of your flow (or, to see it on the real one, the `~/explore-flow` project):

1. `kg_brief implement-step` — the table: which steps are READY, which BLOCKED and on what.
2. `kg_brief write-tests STEP=<step>` — the tests first: a pass and a fail case per check, a
   route per transition, a property per invariant.
3. `kg_brief implement-step STEP=<step>` — READY: the script's whole specification (what it reads
   and writes, the fields of each artifact, the checks and thresholds, the metrics, the config
   parameters, the outcomes). The agent writes the tests, then the script, citing the graph
   (`# implements check.reports.chk-unmapped`), runs the tests. **BLOCKED** (`FL3: JSON output has
   no field specification`): the agent stops and asks you for the fact; `/prd-architecture-studio:capture`
   takes it through the gates; the brief is asked again.
4. The step is implemented: capture `isImplemented` and the `Implementation`, so FL15 stops listing it.

To see the loop end to end before touching your own flow: `oto query brief implement-step
STEP=step.b01_inspect` in `~/explore-flow` is BLOCKED FL3; capture the fields of `inspect_report`
(a JSON artifact), re-ask, READY, then let the agent write `step_inspect.py` from the brief.

### 3.6 Publish, and let a reader ask — `/prd-architecture-studio:prd-site`, scene 6

```bash
oto build --target site --view "<the studio plugin root>/views/prd-site"   # the PRD and Architecture site, from the graph
oto publish --repo <your query repository> --site                           # the store, with the site beside it
oto sync --repo <that repository> --dest ~/reports-kg                       # a reader, anywhere: then kg_ask, kg_brief
```

---

## 4. What to expect, and what refuses

- **Empty is honest.** The site's coverage bar, `oto query questions` and every brief say what
  nobody has captured yet. No agent fills it.
- **A question reports; a policy refuses.** `curate check` lists open questions as gaps and refuses
  only shapes and blocking policies.
- **Ids are yours, scoped.** `FR1` in a capture with `scope: fund-report` becomes
  `requirement.fund-report.fr1`; two reports' `FR1` never collide.
- **OTO never writes code.** It decides whether the agent knows enough to; the agent writes it,
  in your stack, from the brief.

| It says | It means | Do |
|---|---|---|
| `is not a capture against this vocabulary: … has no link 'x'` | an item names a field or link the pack does not declare | read `capture.json`'s `types`; use the declared name |
| `blocking: shape …` / `policy …` | a declared constraint is broken | fix the capture, never force |
| `question Q4 unanswered` under gap | open work | tell the person; it does not block |
| `BLOCKED FL3` | the implementing agent lacks a fact | capture it (the same item again, with the missing link, is fine) |
| `A changed fact is a supersession` | the same id, a different fact | say it changed, or use a new id |
