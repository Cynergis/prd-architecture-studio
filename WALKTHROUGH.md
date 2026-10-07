# Walkthrough — from an empty folder to a specified, designed, flowed and buildable report product

What this proves, on your own machine, in one sitting: the whole arc of the studio on OTO, for a
report generation tool. You end up with one knowledge base that holds the **product
specification** (what the tool must do), the **report definition** (what one report type is: its
sections, fields, where each value comes from), the **design** (contexts, aggregates, components)
and the **flow** (the steps that build and run it) — and an implementing agent that asks the graph
for its brief and is blocked by name when a fact is missing.

**Is there a pack to build first? No.** Every pack the arc needs exists:

| Level | Pack | Where it is today |
|---|---|---|
| portfolio | `portfolio` | ships with the engine |
| product | `product` | ships with the engine |
| product type | `product-report` @3 | `~/.oto/ontologies` (publish it to the registry when you push D1) |
| domain | `report` @5 | `~/.oto/ontologies` |
| design | `software-architecture`, `ddd` | ship with the engine |
| flow | `flow` @1 | installed from `~/Downloads/report-ontology` (`oto ontology add <checkout> --path oto/flow`) |
| plan | `work` | ships with the engine |

What you bring is **data**, not a pack: your product's brief and your report type's definition.
A new pack is only needed for a new *kind* of product (a second `product-<type>`).

There are two ways through. Do the dry run first (ten minutes, nothing to think about), then the
real one with Atlas.

---

## 0. Setup (once)

```bash
# the engine, from the checkout (the published plugin is older than this branch)
python3 -m venv ~/oto-venv && ~/oto-venv/bin/pip install -e "$HOME/Downloads/oto[rdf]"
export PATH="$HOME/oto-venv/bin:$PATH"
oto --version                                  # 0.11.0

# the packs on this machine
oto ontology list                               # product, portfolio, software-architecture, ddd, work (built-in);
                                                # product-report @3, report @5, flow @1 (yours)
oto ontology add ~/Downloads/report-ontology --path oto/flow   # only if flow is missing
oto ontology list --product-types               # report  product-report  (what Atlas's first question reads)
```

Each `oto ontology show <name>` must end with `self-check: clean`.

---

## 1. The dry run: the scripted arc (CLI only)

The scene tests of this plugin, by hand. The captures are the plugin's fixtures (a fund report
product); nothing is typed, every gate is real.

```bash
STUDIO=~/Downloads/prd-architecture-studio
mkdir -p ~/funds && cd ~/funds

# scene 1 — the project, empty: the graph holds what your people say, never a pack's example
oto init --name "Fund report automation" --slug funds --ontology product-report,ddd,flow,work --empty
oto status
oto ontology capture                            # capture.json: what the packs ask, by whom, with which items

# scene 2 — the specification through the gates
oto curate start
oto curate propose --from $STUDIO/fixtures/capture-report-product-spec.json
oto curate add --from proposals/report-product-brief.json --dry-run
oto curate add --from proposals/report-product-brief.json
oto curate check                                # blocking: none; gaps: the open questions, named
oto curate apply --by "you" --note "the product's obligations"
oto build
oto query questions                             # PR*/RP* answered; the report domain's Q* open: scene 3's work
oto query ask RP2 REPORTTYPE=reporttype.fund-report.rt-fpb

# scene 4 — the design and the flow, the same way
oto curate start
oto curate propose --from $STUDIO/fixtures/capture-report-design.json
oto curate add --from proposals/report-product-design.json
oto curate propose --from $STUDIO/fixtures/capture-report-flow.json
oto curate add --from proposals/report-product-flow.json
oto curate check && oto curate apply --by "you" --note "design and flow" && oto build
oto query ask SA17                              # clean: every obligation is satisfied by something in the design
oto query ask WK5 COMPONENT=component.fund-report.cmp-render   # what slips if the render job is late

# scene 5 — the implementing agent's brief
oto query brief implement-step                  # r0 READY, r1 READY, r2 BLOCKED FL3, r3 READY
oto query brief implement-step STEP=deterministicstep.fund-report.r2   # blocked on FL3: the verify report has no field spec
oto curate start
oto curate propose --from $STUDIO/fixtures/capture-report-flow-fields.json
oto curate add --from proposals/report-product-flow-fields.json
oto curate check && oto curate apply --by "you" --note "the verify report's fields" && oto build
oto query brief implement-step STEP=deterministicstep.fund-report.r2   # READY
oto query brief write-tests STEP=deterministicstep.fund-report.r2      # the tests to write first (FL12)

# scene 6 — the site, from the graph; the product's knowledge published as a store
oto build --target site --view $STUDIO/views/prd-site
open build/site/index.html                      # or: oto serve --http 8080 --view $STUDIO/views/prd-site
git init --bare -b main /tmp/funds-kg.git
oto publish --repo /tmp/funds-kg.git --site

# scene 7 — a reader with nothing but the store
oto sync --repo /tmp/funds-kg.git --dest /tmp/reader-kg
oto query --project /tmp/reader-kg ask RP2 REPORTTYPE=reporttype.fund-report.rt-fpb
oto query --project /tmp/reader-kg brief implement-step
```

If every line above behaves as its comment says, the machinery is sound. Delete `~/funds` and do
it for real.

---

## 2. The real run: Atlas, on your report generation tool

### 2.1 Wire Claude Code to the checkout

Open Claude Code in a fresh project folder. Until the plugins are published from this branch,
give the folder the skills and the tools directly:

```bash
mkdir -p ~/my-reports && cd ~/my-reports
oto init --name "<your product's name>" --slug reports --ontology product-report,ddd,flow,work --empty

# the kg_* tools, from the checkout's engine
cat > .mcp.json <<EOF
{"mcpServers": {"reports-kg": {"command": "$HOME/oto-venv/bin/oto", "args": ["serve", "--project", "."]}}}
EOF

# the skills: the studio's seven and OTO's ten (OTO's `capture` under another name: the studio has one too)
mkdir -p .claude/skills
for s in atlas capture prd-build architecture-build feature-flow prd-site studio; do
  ln -s ~/Downloads/prd-architecture-studio/skills/$s .claude/skills/$s; done
for s in start concierge curate query-knowledge ontology-interview build-knowledge-base act evaluate vet-provenance spec; do
  ln -s ~/Downloads/oto/skills/$s .claude/skills/$s; done
ln -s ~/Downloads/oto/skills/capture .claude/skills/oto-capture
```

In the studio skills, read `${CLAUDE_PLUGIN_ROOT}` as `~/Downloads/prd-architecture-studio`
(the site view is `~/Downloads/prd-architecture-studio/views/prd-site`).

Start Claude Code in the folder and say: **"Atlas, lead this product."** Atlas orients with
`oto status` and shows the menu. From here you are the domain expert; Atlas asks, you answer,
every confirmed section goes through the gates. What follows is what to expect at each scene and
what you bring to it.

### 2.2 Scene 1 — Start

Atlas asks which kind of product (`oto registry list --product-types` → `report`) and what you
have. You have a brief. If you want one to start from, this is the fund report product the dry run
used, in prose:

> We produce regulated fund documents (monthly fund profiles, in English and French, as PDF) from a
> sample PDF the analyst provides and finished data in a warehouse table. The analyst defines a
> report type once and verifies its data mapping; every value is read from a finished column, never
> computed; every accepted revision of a definition is kept with who accepted it and why; a
> production release is refused while a field is unmapped; compliance signs off every published
> document; documents go to the client portal and are kept seven years; a monthly batch is delivered
> within 24 hours of the as-of date.

Replace it with yours. The project exists already (2.1), so Atlas moves to scene 2.

### 2.3 Scene 2 — Specify (the product specification)

The **capture** skill reads `capture.json` and asks the sections in order: *a report product
owner* (RP1: which report types, for whom, how often), *the data team* (RP2: where the data must
come from), *a designer* (RP3: layout and fidelity), *operations* (RP4, RP6, RP8), *compliance*
(RP5, RP7), then the product core's askers (PR1–PR25: purpose, personas, requirements, releases,
risks, decisions). After each **[C]**, Atlas reports the gate in the engine's words and what the
graph now answers. Expect, after the first section: *"the graph answers PR1, RP1; open: Q2, Q4,
Q5, Q7 …"* — the report domain's questions are open because scene 3 has not happened. That is
correct.

What you bring: the report types your tool must produce, who owns their definition, the data
rule (finished columns or computed?), the channels, the sign-offs, the run guarantees.

### 2.4 Scene 3 — Derive the domain (the report specification)

"What must this product know?" For a report product the domain pack exists (`report`), so Atlas
captures **your report type's definition** against it rather than deriving a new vocabulary:
`oto ontology capture` already lists the `report` sections (Q1–Q26, asked by the analyst, the
data team, compliance, the release manager): the report type's identity and parameters (Q2), its
sections and fields in order (Q7), the table and the column that supplies each field (Q4, Q5),
the field meanings per locale (Q3), the rules (Q14), the sample document and thresholds (Q9),
where documents go (Q10), when it runs (Q11), the quality checks and findings (Q24–Q26).

What you bring: one real report type — its sample PDF's sections and fields, the warehouse table
and columns, the parameters that identify a document (fund, period, locale). This is the part
only you can do, and the part that makes RP10 (*"which report types are not ready for production,
and what blocks each"*) compute instead of being asserted.

If instead your product's domain is new (not a report), this scene is `/oto:start` on the
specification, then **ontology-interview**: OTO derives the domain questions from the
requirements and you confirm them.

### 2.5 Scene 4 — Design and flow

**architecture-build** captures against `ddd` (which brings `software-architecture`): the
subdomains and bounded contexts, which component carries each, the use cases that `satisfies`
the requirements, commands, events, aggregates, the decisions. Then the **flow**: the steps of
the production run (load, render, verify, publish) and of the template build, their checks
against config parameters, their outcomes and transitions, the artifacts with their fields. Atlas
reports `SA17` (*which requirements does nothing in the design satisfy yet*) and `DD24` after
every section; `WK5` once there is a plan.

What you bring: how you actually build and run it today — the scripts, what they read and write,
what each checks, what a failure does.

### 2.6 Scene 5 — Build (code, with the brief)

Say what you want built: *"implement the verify step"*. **feature-flow** validates the idea
against the product's purpose (`kg_ask PR4`), the impact on the design and the flow (`kg_brief
impact-artifact`, `kg_neighbors`), the acceptance scenarios, then stops at Gate 3. After your go:

1. `kg_brief write-tests STEP=<step>` → READY: the tests to write first (a pass and a fail case
   per check, a route per transition, a property per invariant).
2. `kg_brief implement-step STEP=<step>` → READY with every fact the script needs (what it
   reads and writes, the fields of each JSON artifact, the checks and their thresholds, the
   metrics to record, the parameters from config, the outcomes and where each goes); or
   **BLOCKED by name** — *"FL3: JSON output has no field specification"* — and Atlas asks you
   for the missing fact, captures it, re-asks. No code before READY.
3. The agent writes the tests, then the script, citing the graph (`# implements
   check.reports.chk-unmapped`), runs the tests, and records that the step is implemented.

The code is written by the session, in your stack, from the brief; OTO never writes code, it
decides whether the agent knows enough to.

### 2.7 Scene 6 — Publish, and scene 7 — Readers

**prd-site**: `oto build --target site --view ~/Downloads/prd-architecture-studio/views/prd-site`
— the PRD and Architecture site, from the graph, with the honest coverage bar. Then the store:
`oto publish --repo <your query repo> --site`. A reader: `oto sync --repo <url>` then
`kg_ask`, `kg_brief`; or, for the domain pack, `/plugin install report@<registry>` once D1 is
pushed.

---

## 3. What to expect, and what not to

- **Empty is honest.** Sections of the site, questions in `oto query questions` and the coverage
  bar say what nobody has captured yet. Atlas never fills them.
- **A question reports; a policy refuses.** `curate check` lists open questions as gaps and refuses
  only shapes and blocking policies (an unmapped field in production, a changed fact with no
  supersession).
- **Ids are yours, scoped.** Your capture ids (`FR1`, `RT-FPB`) become `requirement.<scope>.fr1`;
  two products' `FR1` never collide.
- **The flow's test obligations** are `requiresTest` edges for a captured flow (the engine derives
  edges, not nodes); the materialised obligations with citable ids exist only for the ported
  pdf-to-template flow (`report-ontology/fixtures/pdf-to-template/graph.json`). To work on that
  flow instead: `oto init --ontology flow,report --empty`, copy the fixture graph in, build, and
  `oto query brief implement-step` prints what `kgctl readiness` printed.

## 4. If something refuses

| It says | It means | Do |
|---|---|---|
| `is not a capture against this vocabulary: … has no link 'x'` | the item names a field or link the pack does not declare | read `capture.json`'s `types`; use the declared name, or change the vocabulary through `oto ontology check` |
| `candidate would change the graph … blocking: shape …` | a declared constraint is broken | fix the capture, never force |
| `question Q7 unanswered` under **gap** | open work | tell the person; it does not block |
| `BLOCKED FL3` | the implementing agent lacks a fact | capture it (a second capture of the same item with the missing link is fine) |
| `label, summary differ from the candidate. A changed fact is a supersession` | the same id, a different fact | say it changed (supersede) or use the new id |
