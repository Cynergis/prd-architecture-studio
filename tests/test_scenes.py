"""Scenes 1 to 7 of the arc, scripted on the report application against the OTO release this
plugin pins: the project (scene 1), a capture of the report product's obligations through the
gates and the questions the graph then answers (scene 2), what scene 3 derives from (the
specification as facts), the design captured against `ddd` and traced to the specification and
the flow captured against `flow` (scene 4), the implementing agent's brief: BLOCKED by name
until the missing fact is captured, then READY (scene 5), the site rendered from the graph, the
domain pack on a marketplace and the product's store and site published (scene 6), and two
readers: one installs the pack and asks, one syncs the store and asks (scene 7). Needs the engine importable (`OTO_HOME`, or `oto-kg` installed)
and the `product` and `product-report` packs on the machine (`oto ontology list`)."""
import json
import os
import pathlib
import shutil
import subprocess
import sys
import tempfile

import pytest

ROOT = pathlib.Path(__file__).resolve().parent.parent
OTO = pathlib.Path(os.environ.get("OTO_HOME") or ROOT.parent / "oto")
if (OTO / "oto" / "__init__.py").exists() and str(OTO) not in sys.path:
    sys.path.insert(0, str(OTO))
try:
    import oto  # noqa: F401
    from oto.model import ontologies
    HAVE = all(ontologies.dir_for(name) is not None for name in ("product", "product-report", "ddd", "flow"))
except ImportError:
    HAVE = False
pytestmark = pytest.mark.skipif(not HAVE, reason="OTO and the product, product-report packs are needed")

CAPTURE = ROOT / "fixtures" / "capture-report-product-spec.json"
DESIGN = ROOT / "fixtures" / "capture-report-design.json"
FLOW = ROOT / "fixtures" / "capture-report-flow.json"
FLOW_FIELDS = ROOT / "fixtures" / "capture-report-flow-fields.json"


def _captured(root, *captures):
    """Propose, add and apply each capture in turn, through the gates; then build."""
    for capture in captures:
        code, out = oto_cli("curate", "propose", "--project", root, "--from", str(capture))
        assert code == 0 and "unresolved" not in out, out
        doc = json.load(open(capture, encoding="utf-8"))["doc"]
        code, out = oto_cli("curate", "add", "--project", root, "--from", os.path.join(root, "proposals", doc + ".json"))
        assert code == 0, out
    code, out = oto_cli("curate", "check", "--project", root)
    assert code == 0 and "ready to apply" in out, out
    assert oto_cli("curate", "apply", "--project", root, "--by", "the scene test", "--note", "captured")[0] == 0
    assert oto_cli("build", "--project", root)[0] == 0


VIEW = ROOT / "views" / "prd-site"


def oto_cli(*args, cwd=None, env=None):
    r = subprocess.run([sys.executable, "-m", "oto.cli", *args], capture_output=True, text=True, cwd=cwd,
                       env=dict(os.environ, PYTHONPATH=str(OTO), **(env or {})))
    return r.returncode, r.stdout + r.stderr


def test_scene_1_the_project_from_the_product_type():
    with tempfile.TemporaryDirectory() as root:
        code, out = oto_cli("init", "--name", "Fund report automation", "--slug", "funds", "--ontology", "product,product-report", "--empty", "--project", root)
        assert code == 0, out
        assert "wrote: questions.json" in out
        code, out = oto_cli("status", "--project", root)
        assert code == 0 and "class(es)" in out and "graph       0 node(s)" in out, "a product starts from what its people say, not the pack's example"
        code, out = oto_cli("ontology", "capture", "--project", root)
        assert code == 0, out
        schema = json.load(open(os.path.join(root, "capture.json"), encoding="utf-8"))
        who = {s["who"] for s in schema["sections"]}
        assert {"a report product owner", "the data team", "compliance", "operations"} <= who, "the report product's askers are sections"
        req = schema["types"]["Requirement"]
        assert req["fields"]["concerns"]["choices"][:3] == ["identity", "data", "layout"] and "governs" in req["links"]
        assert req["links"]["governs"]["x-term"] == "https://cynergis.ai/ont/product-report#governs"


def test_scene_2_a_captured_section_goes_through_the_gates_and_the_graph_answers():
    with tempfile.TemporaryDirectory() as root:
        code, out = oto_cli("init", "--name", "Fund report automation", "--slug", "funds", "--ontology", "product,product-report", "--empty", "--project", root)
        assert code == 0, out
        assert oto_cli("curate", "start", "--project", root)[0] == 0
        code, out = oto_cli("curate", "propose", "--project", root, "--from", str(CAPTURE))
        assert code == 0 and "10 node(s)" in out and "unresolved" not in out, out
        proposal = os.path.join(root, "proposals", "report-product-brief.json")
        code, out = oto_cli("curate", "add", "--project", root, "--from", proposal, "--dry-run")
        assert code == 0 and "refused" not in out.lower(), out
        assert oto_cli("curate", "add", "--project", root, "--from", proposal)[0] == 0
        code, out = oto_cli("curate", "check", "--project", root)
        assert code == 0 and "ready to apply" in out, out
        assert "shape " not in out and "question RP" not in out and "question PR" not in out
        code, out = oto_cli("curate", "apply", "--project", root, "--by", "the scene test", "--note", "the report product's obligations, from its brief")
        assert code == 0, out
        assert oto_cli("build", "--project", root)[0] == 0
        code, out = oto_cli("query", "--project", root, "questions")
        assert code == 0, out
        for qid in ("RP1", "RP2", "RP7", "PR1", "PR3"):
            line = next(l for l in out.splitlines() if l.startswith(qid + " "))
            assert "answered" in line, line
        # what Atlas says after the specification: the product's questions answer, the domain's are open
        status = {l.split()[0]: l.split()[1] for l in out.splitlines() if l[:2] in ("PR", "RP", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9")}
        assert all(status[q] in ("answered", "clean", "empty", "unasked") for q in status if q.startswith(("PR", "RP"))), status
        assert status["Q7"] == "unanswered", "the sections and fields are scene 3's: open, said as such"
        assert "the graph cannot answer as required" in out
        code, out = oto_cli("query", "--project", root, "ask", "RP2", "REPORTTYPE=fund-profile-balanced")
        assert code == 0 and "Read every value from a finished column" in out, out
        code, out = oto_cli("query", "--project", root, "ask", "RP10")
        assert code == 0 and "Refuse a production release while a field is unmapped" in out, out


def test_scene_3_the_specification_is_facts_the_domain_derivation_reads():
    with tempfile.TemporaryDirectory() as root:
        assert oto_cli("init", "--name", "Fund report automation", "--slug", "funds", "--ontology", "product,product-report", "--empty", "--project", root)[0] == 0
        assert oto_cli("curate", "start", "--project", root)[0] == 0
        assert oto_cli("curate", "propose", "--project", root, "--from", str(CAPTURE))[0] == 0
        assert oto_cli("curate", "add", "--project", root, "--from", os.path.join(root, "proposals", "report-product-brief.json"))[0] == 0
        assert oto_cli("curate", "apply", "--project", root, "--by", "the scene test", "--note", "the brief")[0] == 0
        assert oto_cli("build", "--project", root)[0] == 0
        code, out = oto_cli("query", "--project", root, "by-type", "Requirement")
        assert code == 0 and "Requirement (4)" in out and "finished column" in out, "only the product's own requirements: " + out
        code, out = oto_cli("query", "--project", root, "entity", "requirement.fund-report.fr2")
        assert code == 0 and "source_doc=report-product-brief" in out and "governs" in out, out
        # what scene 3 derives from: every obligation is a cited fact with the term it governs
        graph = json.load(open(os.path.join(root, "graph.json"), encoding="utf-8"))
        obligations = [n for n in graph["nodes"] if n["type"] == "Requirement" and n["source_doc"] == "report-product-brief"]
        assert {n["attributes"]["concerns"] for n in obligations} == {"identity", "data", "audit", "readiness"}
        assert all(n["evidence"][0]["quote"] for n in obligations)


def test_scene_4_the_design_is_captured_against_ddd_and_traced_to_the_specification():
    with tempfile.TemporaryDirectory() as root:
        assert oto_cli("init", "--name", "Fund report automation", "--slug", "funds", "--ontology", "product-report,ddd", "--empty", "--project", root)[0] == 0
        assert oto_cli("curate", "start", "--project", root)[0] == 0
        for capture in (CAPTURE, DESIGN):
            code, out = oto_cli("curate", "propose", "--project", root, "--from", str(capture))
            assert code == 0 and "unresolved" not in out, out
            doc = json.load(open(capture, encoding="utf-8"))["doc"]
            code, out = oto_cli("curate", "add", "--project", root, "--from", os.path.join(root, "proposals", doc + ".json"))
            assert code == 0, out
        code, out = oto_cli("curate", "check", "--project", root)
        assert code == 0 and "ready to apply" in out, out
        assert oto_cli("curate", "apply", "--project", root, "--by", "the scene test", "--note", "the design, from the architecture note")[0] == 0
        assert oto_cli("build", "--project", root)[0] == 0
        code, out = oto_cli("query", "--project", root, "questions")
        assert code == 0, out
        for qid in ("DD1", "DD2", "DD3", "DD4", "DD22", "SA1"):
            line = next(l for l in out.splitlines() if l.startswith(qid + " "))
            assert "answered" in line, line
        # the trace: every obligation of the specification is satisfied by something in the design
        code, out = oto_cli("query", "--project", root, "ask", "SA17")
        assert code == 0 and "clean" in out, out
        code, out = oto_cli("query", "--project", root, "ask", "DD4", "USECASE=uc-define")
        assert code == 0 and "Keep every accepted revision" in out and "Report analyst" in out, out
        code, out = oto_cli("query", "--project", root, "entity", "boundedcontext.fund-report.bc-def")
        assert code == 0 and "deployed as → Definition service" in out, out


def test_scene_4_the_flow_is_captured_against_flow_and_scene_5_the_agent_is_blocked_by_name_then_ready():
    with tempfile.TemporaryDirectory() as root:
        assert oto_cli("init", "--name", "Fund report automation", "--slug", "funds", "--ontology", "product-report,ddd,flow", "--empty", "--project", root)[0] == 0
        assert oto_cli("curate", "start", "--project", root)[0] == 0
        _captured(root, CAPTURE, DESIGN, FLOW)
        # scene 4, the flow half: the production run as steps, checks, transitions and artifacts
        code, out = oto_cli("query", "--project", root, "questions")
        assert code == 0, out
        for qid in ("FL1", "FL4", "FL11", "FL13"):
            line = next(l for l in out.splitlines() if l.startswith(qid + " "))
            assert "answered" in line, line
        # scene 5: the implementing agent asks its brief first, and is BLOCKED by name
        code, out = oto_cli("query", "--project", root, "brief", "implement-step")
        assert code == 0 and "deterministicstep.fund-report.r2         BLOCKED FL3" in out and "3 READY, 1 BLOCKED" in out, out
        code, out = oto_cli("query", "--project", root, "brief", "implement-step", "STEP=deterministicstep.fund-report.r2")
        assert code == 0 and "->  READY" not in out and "blocked on: FL3" in out and "JSON output has no field specification" in out, out
        assert "x FL3 REQ" in out and "+ FL4 REQ" in out and "[1 fact(s)]" in out
        code, out = oto_cli("query", "--project", root, "brief", "write-tests", "STEP=deterministicstep.fund-report.r2")
        assert code == 0 and "->  READY" in out and "+ FL12 REQ" in out, "the tests can be written before the implementation: " + out
        # the person captures the missing fact; the same artifact, now with its fields, goes through the gates
        assert oto_cli("curate", "start", "--project", root)[0] == 0
        _captured(root, FLOW_FIELDS)
        code, out = oto_cli("query", "--project", root, "brief", "implement-step", "STEP=deterministicstep.fund-report.r2")
        assert code == 0 and "->  READY" in out and "+ FL3 REQ" in out and "[2 fact(s)]" in out, out
        code, out = oto_cli("query", "--project", root, "brief", "impact-parameter", "PARAM=configparameter.fund-report.cfg-max-unmapped")
        assert code == 0 and "->  READY" in out and "[1 fact(s)]" in out, "the check compared to it: " + out


def _globals(site):
    """data.js, read as the browser would: the two globals."""
    r = subprocess.run(["node", "-e", "const fs=require('fs'),vm=require('vm');const w={};"
                        "vm.runInNewContext(fs.readFileSync(process.argv[1],'utf8'),{window:w});"
                        "console.log(JSON.stringify({PRD:w.__PRD__,ARCH:w.__ARCH__}))", os.path.join(site, "data.js")],
                       capture_output=True, text=True)
    assert r.returncode == 0, r.stderr
    return json.loads(r.stdout)


@pytest.mark.skipif(not shutil.which("node"), reason="node is needed to read data.js")
def test_scene_6_the_site_is_a_view_of_the_graph_and_scene_7_readers_install_a_pack_or_sync_the_store():
    with tempfile.TemporaryDirectory() as root, tempfile.TemporaryDirectory() as home:
        # the product, specified, designed, flowed (scenes 2 to 5)
        assert oto_cli("init", "--name", "Fund report automation", "--slug", "funds", "--ontology", "product-report,ddd,flow", "--empty", "--project", root)[0] == 0
        assert oto_cli("curate", "start", "--project", root)[0] == 0
        _captured(root, CAPTURE, DESIGN, FLOW, FLOW_FIELDS)
        # scene 6: the site, from the graph; nobody wrote data.js
        code, out = oto_cli("build", "--project", root, "--target", "site", "--view", str(VIEW))
        assert code == 0 and "site with app prd-site" in out, out
        site = os.path.join(root, "build", "site")
        g = _globals(site)
        assert g["PRD"]["overview"]["projectName"] == "Fund report automation"
        assert {f["id"] for f in g["PRD"]["specs"]["functional"]} == {"requirement.fund-report.fr%d" % i for i in (1, 2, 3, 4)}
        assert g["PRD"]["usecases"][0]["frs"] and g["PRD"]["specs"]["policies"][0]["id"] == "policy.fund-report.pol1"
        assert g["ARCH"]["domains"][0]["components"][0]["id"] == "boundedcontext.fund-report.bc-def"
        assert g["ARCH"]["domains"][0]["components"][0]["resource"] == ["component.fund-report.cmp-def"]
        assert g["ARCH"]["decisions"][0]["affects"] == ["aggregate.fund-report.agg-def"]
        assert g["ARCH"]["stack"] == [] and g["PRD"]["glossary"] == [], "a section no pack covers is empty, not invented"
        assert os.path.exists(os.path.join(site, "index.html")) and os.path.exists(os.path.join(site, "publish.sh"))
        # scene 6: the domain pack to a marketplace, the product's store and site to a query repository
        sandbox = {"OTO_ONTOLOGIES": os.path.join(home, "ontologies"), "OTO_PACKS": os.path.join(home, "packs"),
                   "OTO_REGISTRIES": os.path.join(home, "registries.json")}
        os.makedirs(sandbox["OTO_ONTOLOGIES"])
        for name in ("report",):
            shutil.copytree(ontologies.dir_for(name), os.path.join(sandbox["OTO_ONTOLOGIES"], name))
        market, store = os.path.join(home, "market.git"), os.path.join(home, "funds-kg.git")
        for bare in (market, store):
            subprocess.run(["git", "init", "--quiet", "--bare", "-b", "main", bare], check=True)
        assert oto_cli("pack", "new", "report", "--ontology", "report", "--maintainer", "Cynergis", env=sandbox)[0] == 0
        code, out = oto_cli("pack", "publish", "--from", "report", "--to", market, "--registry-name", "market", "--note", "the report domain", env=sandbox)
        assert code == 0 and "/plugin install report@market" in out, "the install line Atlas says: " + out
        code, out = oto_cli("publish", "--project", root, "--repo", store, "--site", "--source", "funds@scene")
        assert code == 0 and "published build_seq" in out, out
        # scene 7: a reader installs one pack and asks the catalogue; another syncs the store and asks the product
        shutil.rmtree(os.path.join(sandbox["OTO_PACKS"], "report"))
        assert oto_cli("registry", "add", market, env=sandbox)[0] == 0
        code, out = oto_cli("pack", "add", "report", env=sandbox)
        assert code == 0 and "embeds the ontology report@" in out, out
        reader = os.path.join(home, "reader")
        code, out = oto_cli("init", "--name", "Reader", "--slug", "reader", "--pack", "report", "--project", reader, env=sandbox)
        assert code == 0 and "pack: report @1" in out, out
        assert oto_cli("build", "--project", reader, env=sandbox)[0] == 0
        code, out = oto_cli("query", "--project", reader, "ask", "Q7", "REPORT=report.fund-profile-balanced", env=sandbox)
        assert code == 0 and "status: answered" in out, out
        synced = os.path.join(home, "reader-kg")
        assert oto_cli("sync", "--repo", store, "--dest", synced, env=sandbox)[0] == 0
        code, out = oto_cli("query", "--project", synced, "ask", "RP2", "REPORTTYPE=reporttype.fund-report.rt-fpb", env=sandbox)
        assert code == 0 and "Read every value from a finished column" in out, out
        code, out = oto_cli("query", "--project", synced, "brief", "implement-step", env=sandbox)
        assert code == 0 and "4 READY, 0 BLOCKED" in out, out
        assert os.path.exists(os.path.join(synced, "site", "data.js")), "the site travels with the store"
