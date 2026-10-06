# PRD Site

A self-contained, **read-only** site (four static files: `index.html`, `support.js`, `engine.js`, `data.js`) that presents two linked documents — a **Product Requirements Document** and an **Architecture & Design** document — structured on the [BMAD method](https://github.com/bmad-code-org/BMAD-METHOD). A `PRD | Architecture` switcher at the top of the left sidebar flips between them.

The PRD navigates ten sections — Overview, Strategic Context, Personas, Product, Use Cases / Journey, Specifications, Release & Rollout, Governance, Risk, Glossary. Strategic Context places the product in its domain and value stream, captures owners and dependencies on other products, and shows a KPI/OKR tree linking company objectives → key results → this product's success metrics. The Architecture document adds Context & Drivers, Decisions (ADRs), Tech Stack, Components, Data, APIs & Integration, Security, Infrastructure, Design / UX, and Project Structure. Traceability is bidirectional: an ADR links to the FRs it satisfies, and a PRD requirement shows which ADRs, components, APIs, and security controls implement it. Both use a left nav, modal detail cards, and traceability links — including **cross-document** links, so an architecture decision (`A.decisions`) points back to the PRD requirements it satisfies (`affects: ['FR3','NFR3','G1','UC2']`).

The viewer is four static files — `index.html` (shell + styles), `support.js` (runtime),
`engine.js` (renderer), and `data.js` (`window.__PRD__` and `window.__ARCH__`). **All content lives in
`data.js`** — it is the only file you edit per project; the other three are the same for every site.
Regenerate after editing the data with the `prd-site` skill, or just edit `data.js` and refresh.

## View locally

**Serving over HTTP is recommended** (the runtime fetches the page over the same origin to stay in
sync). Run the bundled preview script:

```bash
bash serve.sh            # serves at http://localhost:8000
```

Double-clicking `index.html` (file://) also works in most browsers — the page still renders from
`data.js` and Mermaid from a CDN — but serving avoids file:// quirks.

## Publish to GitHub Pages (one command)

Create an empty repo on GitHub, then:

```bash
bash publish.sh https://github.com/<you>/<repo>.git
```

It commits, pushes, and (if the `gh` CLI is installed) enables Pages with the GitHub Actions source.
Otherwise enable it once in the UI — see below. Site URL: `https://<you>.github.io/<repo>/`.

## Publish to GitHub Pages (manual)

This repo deploys automatically via GitHub Actions (the official `actions/deploy-pages` workflow in `.github/workflows/deploy.yml`).

1. Create a GitHub repo and push these files to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "PRD site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. In the repo: **Settings → Pages → Build and deployment → Source → "GitHub Actions"**.

3. The workflow runs on every push to `main`. When it finishes, your site is live at
   `https://<you>.github.io/<repo>/`.

> `.nojekyll` tells GitHub Pages to serve the files as-is instead of running them through Jekyll.

## Edit the content

Open `data.js` and edit the `window.__PRD__ = { ... }` object (and `window.__ARCH__` below it). It holds the entire PRD (overview, personas, product scope, journeys, functional/non-functional requirements, governance, risk) and Architecture. Save and push — Pages redeploys automatically. You never need to touch `index.html`, `support.js`, or `engine.js`.

- **Use cases & journeys:** the "Use Cases / Journey" tab has two sub-views. Journeys are narrative; use cases (`usecases[]`) are formal specs — trigger, actors, numbered `mainFlow`, `extensions`, `terminalStates`, a Mermaid `workflow` diagram, and `acceptance` scenarios in Given/When/Then form. A use case's `journeyId` and `primaryActor` link it back to its journey and persona.
- **Mermaid:** workflow diagrams render via Mermaid loaded from a CDN, so an internet connection is needed to view them. To work fully offline, download `mermaid.min.js` into the repo and point the `<script src>` in `index.html` at the local copy.
- **Traceability:** in each functional requirement, `traceJ` points to a journey `id` and `traceSC` to a success-criterion `id`. Keeping these in sync is what powers the clickable links between sections.
- **Deep links:** each section is addressable via a hash, e.g. `.../#specs`.
