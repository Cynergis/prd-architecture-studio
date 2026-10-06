---
name: prd-site
description: >
  Generate or regenerate the navigable PRD + Architecture HTML site from a data.js file using the
  bundled template. Use when the user wants to generate the site, build or render the HTML page,
  produce the PRD/Architecture viewer, or publish it to GitHub Pages.
---

# Generate the PRD + Architecture site

Render `window.__PRD__` and `window.__ARCH__` (from a `data.js`) into the self-contained, read-only
viewer. The viewer is a static, data-driven template — content lives only in `data.js`, so
regenerating after edits is deterministic.

## Inputs

A `data.js` defining `window.__PRD__` and `window.__ARCH__` per
`${CLAUDE_PLUGIN_ROOT}/skills/prd-site/references/data-schema.md`.
- If the user has one, use it.
- If not, offer to (a) start from the bundled sample at
  `${CLAUDE_PLUGIN_ROOT}/skills/prd-site/template/data.js`, or (b) run **prd-build** and
  **architecture-build** first to author the content.

## Steps

1. Confirm the path to `data.js` and the output folder (default: a new `prd-site/` in the outputs).
2. Run the generator:
   ```bash
   node ${CLAUDE_PLUGIN_ROOT}/skills/prd-site/generate.js <data.js> <outDir>
   ```
   It validates that `data.js` parses and defines both globals, then writes the four viewer files
   (`index.html`, `support.js`, `engine.js`, and the provided `data.js`) plus `.nojekyll`,
   `README.md`, `serve.sh`, `publish.sh`, and `.github/workflows/deploy.yml` into `<outDir>`.
   Only `data.js` changes per project; `index.html`, `support.js`, and `engine.js` are copied verbatim.
3. If generation fails, report the parse error and fix `data.js` (it must be valid JavaScript —
   object literals, not JSON).
4. Present `<outDir>/index.html` to the user.

## What the site contains

Two switchable documents. PRD: Overview, Strategic Context, Personas, Product, Use Cases / Journey,
Specifications (Functional / Non-Functional / Policies), Release & Rollout, Governance, Risk,
Glossary. Architecture: Context & Drivers, Decisions (ADRs), Tech Stack, Components (DDD subdomains →
aggregate + components with ten facets), Resources, APIs, Integrations, Security, Infrastructure
(per-environment), Design / UX, Project Structure, Knowledge Base. Cross-links are bidirectional and
Mermaid diagrams render from a CDN.

## Publishing (GitHub Pages)

The output is ready for GitHub Pages: push the folder to `main`, set Settings → Pages → Source to
"GitHub Actions". The bundled workflow deploys it; `.nojekyll` serves files as-is. Mermaid loads from
a CDN, so viewing needs internet — vendor `mermaid.min.js` locally for offline use.

## Editing later

Change `data.js` (by hand or via prd-build / architecture-build) and regenerate. The template
(`index.html`) rarely changes; the content is entirely in `data.js`.
