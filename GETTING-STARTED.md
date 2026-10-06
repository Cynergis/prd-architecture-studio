# Getting started — from idea to a live site

Six steps. Steps 1–4 happen in chat (the skills do the work); steps 5–6 you run on your laptop.

## 1. Start
Say: **"Start a product with the studio."** Claude (with this plugin installed) runs the `studio`
pipeline. Give it a product name and a one-line problem statement.

## 2. Discovery → PRD
- If you have a brief, notes, or a transcript, paste or attach it and say **"structure these notes
  into the PRD."** The `prd-build` skill reads it, drafts each section, and flags gaps.
- If you're starting blank, it runs a guided interview instead.
The result is the PRD content (`window.__PRD__`) in a `data.js`.

## 3. Architecture
Say **"build the architecture."** The `architecture-build` skill designs the solution (ADRs, tech
stack, DDD subdomains, resources, APIs, integrations, security, infrastructure) cross-linked to the PRD.

## 4. Generate the site
Say **"generate the PRD site."** The `prd-site` skill writes a folder containing:
`index.html`, `data.js`, `serve.sh`, `publish.sh`, `.nojekyll`, `README.md`, and the GitHub Actions
workflow. Download/save that folder to your laptop.

## 5. View it on your laptop
In that folder, either:
- **double-click `index.html`**, or
- run a local server:
  ```bash
  bash serve.sh        # then open http://localhost:8000
  ```
(Diagrams use Mermaid from a CDN, so keep internet on — or vendor `mermaid.min.js` locally for offline.)

## 6. Publish to GitHub Pages
Create an **empty** repo on GitHub, then in the folder:
```bash
bash publish.sh https://github.com/<your-user>/<repo>.git
```
This commits and pushes. If you have the `gh` CLI it also turns Pages on; otherwise enable it once:
**repo → Settings → Pages → Source → "GitHub Actions."** Your site goes live at
`https://<your-user>.github.io/<repo>/` and redeploys on every push.

## Changing things later
Edit `data.js` (by hand, or re-run `prd-build` / `architecture-build`) and regenerate (step 4), or
just edit `data.js` and refresh the page. The viewer template itself rarely needs to change.
