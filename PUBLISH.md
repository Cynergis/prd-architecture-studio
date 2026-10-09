# Publish the plugins to the Cynergis marketplace, and start from a new laptop

Yes, it is possible, and it is one marketplace: `Cynergis/oto-registry` already is a Claude Code
marketplace (`cynergis`) that lists the engine and the packs. What was missing is a way to list a
plugin that lives in its own repository (the studio, the pdf-to-template tool) **beside** the
engine, because Claude Code resolves a plugin's dependency on `oto` inside the plugin's own
marketplace. OTO 0.11.1 adds that: `oto registry plugin`. Everything below needs your GitHub
credentials, so it is yours to run; `publish-plugins.sh` in this folder runs part A in order.

## Status on 2026-10-09

Part A was run from this laptop: OTO's branch is pushed and its pull request open
(https://github.com/Cynergis/oto/pull/3); the three repositories exist, **private**
(`Cynergis/prd-architecture-studio`, `Cynergis/pdf-to-template-plugin`, `Cynergis/report-ontology`);
the four packs and the two plugins are published to the registry's `stage-5` branch, pull request
https://github.com/Cynergis/oto-registry/pull/2. What remains is yours:

1. merge Cynergis/oto#3;
2. re-run the registry's check (`gh run rerun 37948604090 --repo Cynergis/oto-registry`) and merge #2;
3. decide the three repositories' visibility: a private plugin installs on a machine that is logged in
   to GitHub (`gh auth login`, or a git credential); `gh repo edit Cynergis/<name> --visibility public`
   otherwise;
4. in `report-ontology/.github/workflows`, install the engine from `@main` instead of `@semantic-layer`.

## A. Once, from this laptop

Use the checkout's `oto` (0.11.1): `export OTO_SOURCE=~/Downloads/oto; alias oto='uvx --from "$OTO_SOURCE" oto'`.

**A1. The engine, on `main`.** The marketplace installs `oto` from the repository's default branch,
and the registry's own CI installs the engine from `main` to check the index. Merge first:

```bash
cd ~/Downloads/oto && git push origin semantic-layer
gh pr create --base main --head semantic-layer --title "0.8.2 → 0.11.1: the knowledge programme" --fill && gh pr merge --merge
```

(Not ready to merge? Push the branch, pin it in step A4 with `--plugin-ref semantic-layer`, and
point the registry's check workflow at the same branch: in the `oto-registry` checkout,
`.github/workflows/check.yml` installs `oto-kg @ git+https://github.com/Cynergis/oto`; append
`@semantic-layer` and push. `publish-plugins.sh` does A4's pin when `PIN_ENGINE_BRANCH=semantic-layer`
is set.)

**A2. The studio and the tool get repositories.**

```bash
gh repo create Cynergis/prd-architecture-studio --private --source ~/Downloads/prd-architecture-studio --push
gh repo create Cynergis/pdf-to-template-plugin  --private --source ~/Downloads/pdf-to-template-plugin  --push
gh repo create Cynergis/report-ontology         --private --source ~/Downloads/report-ontology         --push   # the port's home; optional for the marketplace
```

**A3. The packs, into the registry.** Each publish bumps the pack's release, regenerates its plugin
files, updates the index and the marketplace, tags and pushes.

```bash
REG=git@github.com:Cynergis/oto-registry.git
for p in report product-report flow work; do
  oto pack publish --from $p --to $REG --note "stage 5: the report arc on OTO 0.11"
done
```

**A4. The plugins in their own repositories, beside the engine.**

```bash
oto registry plugin prd-architecture-studio --to $REG --repo Cynergis/prd-architecture-studio --version 2.0.0 --category product \
  --description "Atlas, the Lead Product Engineer, and the studio's skills: capture a product's specification and design against OTO packs through the curate gates, build with the brief in hand, publish. Depends on oto."
oto registry plugin pdf-to-template --to $REG --repo Cynergis/pdf-to-template-plugin --version 0.2.0 --category reporting \
  --description "Turn a sample PDF into a data-driven HTML/CSS + Jinja2 template that renders new data to PDF."
# only if A1 was not merged: oto registry plugin oto --to $REG --repo Cynergis/oto --plugin-ref semantic-layer --version 0.11.1
```

**A5. Check what readers will get.**

```bash
git clone $REG /tmp/reg && oto registry check /tmp/reg && claude plugin validate /tmp/reg
```

The registry's GitHub Pages catalog regenerates on push (`oto registry site`); the old packs
(`auto-claims`, `organization-process`, `professional-services`, `software-architecture` @1) stay
listed until you republish or retire them.

**A6. Loose ends.** `report-ontology/.github/workflows` installs the engine from `@semantic-layer`:
switch it to `@main` after A1. Drop `OTO_SOURCE` from your shell once the published engine is the
one you want to run.

## B. The new laptop

1. Install Claude Code, `git`, and `uv` (it provides `uvx`, which runs the engine).
2. In Claude Code, any folder:

   ```text
   /plugin marketplace add Cynergis/oto-registry
   /plugin install oto@cynergis
   /plugin install prd-architecture-studio@cynergis
   /plugin install report@cynergis
   /plugin install product-report@cynergis
   /plugin install flow@cynergis
   /plugin install work@cynergis
   /plugin install pdf-to-template@cynergis
   ```

   (user scope; `/plugin` → all enabled; the engine plugin starts `uvx … oto serve` itself).
3. The command line and the packs' ontologies for it:

   ```bash
   alias oto='uvx --from "oto-kg[all] @ git+https://github.com/Cynergis/oto" oto'
   oto registry add https://github.com/Cynergis/oto-registry
   for p in report product-report flow work; do oto pack add $p; done
   oto ontology list --product-types                  # report  product-report
   ```

4. Start building your report: `mkdir my-reports && cd my-reports && oto init --name "<product>"
   --slug reports --ontology product-report,ddd,flow,work --empty`, open Claude Code there, and
   follow `WALKTHROUGH.md` from section 2 (discover) and 3 (`/report:new-report`, Atlas,
   `/pdf-to-template:pdf-to-template`, `/flow:implement-step`).

Nothing from this laptop is needed afterwards except what A pushed; the packs' sources are the
registry itself (`packs/<name>`), the engine and the studio are their repositories.
