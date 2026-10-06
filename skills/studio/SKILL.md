---
name: studio
description: >
  End-to-end workflow for the PRD & Architecture Studio: start a new product, run discovery, build the
  PRD and the Architecture, generate the navigable site, preview it locally, and publish it to GitHub
  Pages. Use when the user wants to start a product, kick off the studio, run the full PRD-to-site
  pipeline, generate the website from scratch, or deploy/publish the site.
---

# Studio — end-to-end pipeline

Drive the full path from idea to a published site. Orchestrate the other skills in this plugin and run
the preview/publish steps. Keep the user oriented: state which step you're on and what comes next.

## The pipeline

```
1 Discovery → 2 PRD → 3 Architecture → 4 Generate → 5 Preview → 6 Publish → 7 Knowledge graph (→ mesh)
```

Confirm scope up front, then proceed step by step. Let the user stop after any step.

### Step 1 — Discovery (gather the inputs)

Establish the working folder and the working `data.js`.
- Create a project folder (e.g. `<product>-studio/`) and a `data.js` seeded with
  `window.__PRD__ = {}; window.__ARCH__ = {};` (or copy the sample from
  `${CLAUDE_PLUGIN_ROOT}/skills/prd-site/template/data.js` to start from a worked example).
- Ask whether the user has existing material (a brief, notes, a transcript, an RFC). If yes, this is
  **structure-from-notes**; if not, it's a **guided interview**. Read any provided documents now.
- Capture the product name, one-line summary, and the primary problem to anchor everything else.

### Step 2 — Build the PRD

Run the **prd-build** skill in the chosen mode. It fills `window.__PRD__` section by section
(overview, strategic context, personas, scope, journeys + use cases, FRs/NFRs/policies, governance,
risk, glossary) with the A/P/C loop, and runs cross-link integrity checks.

### Step 3 — Build the Architecture

Run the **architecture-build** skill. It fills `window.__ARCH__` (context, ADRs, tech stack, DDD
subdomains, resources, APIs, integrations, security, infrastructure, design links, knowledge base),
cross-linked to the PRD.

### Step 4 — Generate the site

Run the **prd-site** skill:
```bash
node ${CLAUDE_PLUGIN_ROOT}/skills/prd-site/generate.js <data.js> <outDir>
```
This writes `index.html`, `data.js`, `serve.sh`, `publish.sh`, `.nojekyll`, `README.md`, and the
GitHub Actions workflow into `<outDir>`. Present `<outDir>/index.html`.

### Step 5 — Preview locally

Tell the user they can:
- **double-click `index.html`** in the output folder, or
- run `bash serve.sh` in that folder and open `http://localhost:8000`.

### Step 6 — Publish to GitHub Pages

Have the user create an empty GitHub repo, then from the output folder run:
```bash
bash publish.sh https://github.com/<you>/<repo>.git
```
It pushes and (with the `gh` CLI) enables Pages on the GitHub Actions source; otherwise they enable it
once under Settings → Pages → Source → "GitHub Actions". The site lands at
`https://<you>.github.io/<repo>/` and redeploys on every push.

### Step 7 — Knowledge graph & mesh (after validation)

Once the product is reviewed, implemented, and validated, run the **knowledge-graph** skill to derive a
typed property graph from the same `data.js`:
```bash
node ${CLAUDE_PLUGIN_ROOT}/skills/knowledge-graph/graph.js <data.js> <outDir>
```
It writes `graph.json` and `graph.jsonld` (nodes with properties + typed edges), reports node/edge
counts and any **unresolved** cross-references (traceability gaps to fix), and namespaces the subgraph so
it joins the organization **knowledge mesh** at shared seam nodes. The mesh — one shared ontology across
products — grows by one validated product at a time.

## Adding or changing features — always use feature-flow

Any individual feature (whether part of the first build or added later) must go through the
**feature-flow** skill, which gates the work: validate the idea against product goals → stop for
approval → analyze architecture & code impact → stop for approval → finalize Gherkin acceptance with
SME validation → implement test-first until all acceptance tests pass. Use prd-build /
architecture-build to capture the resulting requirements and design that feature-flow produces.

## Iterating later

To change content, edit `data.js` (by hand or by re-running prd-build / architecture-build) and
re-run step 4. The template rarely changes; content lives entirely in `data.js`. For feature changes,
route them through **feature-flow** so the gates and test-first implementation are enforced.
