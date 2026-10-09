#!/bin/sh
# Part A of PUBLISH.md, in order. Needs: gh (logged in), uv, the checkouts under ~/Downloads.
# Stops at the first failure. Set REG to your registry's git URL.
set -e
export OTO_SOURCE="${OTO_SOURCE:-$HOME/Downloads/oto}"
REG="${REG:-git@github.com:Cynergis/oto-registry.git}"
oto() { uvx --from "$OTO_SOURCE" oto "$@"; }

echo "== A1 the engine: push the branch (merge it to main on GitHub before A3 unless you pin it in A4)"
git -C "$HOME/Downloads/oto" push origin semantic-layer

echo "== A2 repositories for the studio, the tool and the port"
for r in prd-architecture-studio pdf-to-template-plugin report-ontology; do
  if git -C "$HOME/Downloads/$r" remote get-url origin >/dev/null 2>&1; then
    git -C "$HOME/Downloads/$r" push -u origin HEAD
  else
    gh repo create "Cynergis/$r" --private --source "$HOME/Downloads/$r" --push
  fi
done

echo "== A3 the packs"
for p in report product-report flow work; do
  oto pack publish --from "$p" --to "$REG" --note "stage 5: the report arc on OTO 0.11"
done

echo "== A4 the plugins in their own repositories"
oto registry plugin prd-architecture-studio --to "$REG" --repo Cynergis/prd-architecture-studio --version 2.0.0 --category product \
  --description "Atlas, the Lead Product Engineer, and the studio's skills: capture a product's specification and design against OTO packs through the curate gates, build with the brief in hand, publish. Depends on oto."
oto registry plugin pdf-to-template --to "$REG" --repo Cynergis/pdf-to-template-plugin --version 0.2.0 --category reporting \
  --description "Turn a sample PDF into a data-driven HTML/CSS + Jinja2 template that renders new data to PDF."
if [ -n "$PIN_ENGINE_BRANCH" ]; then
  oto registry plugin oto --to "$REG" --repo Cynergis/oto --plugin-ref "$PIN_ENGINE_BRANCH" --version 0.11.1
fi

echo "== A5 what readers get"
rm -rf /tmp/reg && git clone -q "$REG" /tmp/reg && oto registry check /tmp/reg && claude plugin validate /tmp/reg
echo "done: on any machine, /plugin marketplace add Cynergis/oto-registry, then /plugin install <name>@cynergis"
