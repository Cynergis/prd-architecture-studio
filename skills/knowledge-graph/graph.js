#!/usr/bin/env node
/*
 * knowledge-graph generator — turns a validated PRD + Architecture into a typed property graph.
 * Usage: node graph.js <data.js> <outDir>
 *   <data.js>  defines window.__PRD__ and window.__ARCH__ (same file the site is built from)
 *   <outDir>   destination folder (created if missing)
 * Produces:
 *   <outDir>/graph.json   — { product, ontologyVersion, generatedAt, stats, nodes[], edges[], unresolved[] }
 *   <outDir>/graph.jsonld — the same graph as JSON-LD for RDF / triple-store / graph tooling
 *
 * Node/edge types follow references/ontology.md (v1). Nodes are namespaced "<slug>:<localId>" so
 * subgraphs from many products compose into one knowledge mesh; shared external products are emitted
 * as un-namespaced "mesh:product:<slug>" seam nodes where subgraphs join.
 */
const fs = require('fs');
const path = require('path');

const ONTOLOGY_VERSION = '1.0.0';
const MESH_BASE = 'https://kg.studio/'; // base IRI for JSON-LD @id
const VOCAB = 'https://kg.studio/ontology#';

const dataPath = process.argv[2], outDir = process.argv[3];
if (!dataPath || !outDir) { console.error('Usage: node graph.js <data.js> <outDir>'); process.exit(1); }

const win = {};
try { new Function('window', fs.readFileSync(dataPath, 'utf8'))(win); }
catch (e) { console.error('data.js does not parse:', e.message); process.exit(1); }
const S = win.__PRD__, A = win.__ARCH__ || {};
if (!S) { console.error('data.js is missing window.__PRD__'); process.exit(1); }

const slugify = s => String(s || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'product';
const clip = (s, n = 200) => { s = String(s == null ? '' : s).replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
const arr = x => Array.isArray(x) ? x : [];

const SLUG = slugify(S.overview && S.overview.projectName);

// ---- node / edge stores ----
const nodes = [];
const idx = new Map();       // localId -> fullId (product-scoped)
const externals = new Map(); // fullId  -> node    (mesh seam)
const edges = [];
const unresolved = [];
const pending = [];          // edges resolved in a 2nd pass, after all nodes exist (avoids forward-ref false gaps)

function N(localId, type, label, doc, props) {
  if (idx.has(localId)) return idx.get(localId);
  const id = SLUG + ':' + localId;
  nodes.push({ id, type, label: clip(label, 120), localId, doc, scope: 'product', props: props || {} });
  idx.set(localId, id);
  return id;
}
function EXT(name, props) {
  const id = 'mesh:product:' + slugify(name);
  if (!externals.has(id)) {
    const n = { id, type: 'ExternalProduct', label: clip(name, 120), localId: id, doc: 'mesh', scope: 'mesh', props: props || {} };
    externals.set(id, n); nodes.push(n);
  }
  return id;
}
function E(fromFull, toRef, type, props) { pending.push({ fromFull, toRef, type, props: props || {} }); }
function resolveEdges() {            // 2nd pass: every node now exists, so forward refs resolve
  pending.forEach(p => {
    let toFull = idx.get(p.toRef);
    if (!toFull && externals.has(p.toRef)) toFull = p.toRef;
    if (!p.fromFull || !toFull) { unresolved.push({ from: p.fromFull || null, type: p.type, ref: p.toRef }); return; }
    edges.push({ id: 'e' + (edges.length + 1), from: p.fromFull, to: toFull, type: p.type, props: p.props });
  });
}

// ---------------- PRD ----------------
const ov = S.overview || {};
const PRODUCT = N('PRODUCT', 'Product', ov.projectName || 'Product', 'prd', {
  author: ov.author, date: ov.date, problem: clip(ov.problem, 240),
  domain: (S.portfolio || {}).domain, capability: (S.portfolio || {}).capability,
});

arr(S.personas).forEach(p => {
  const id = N(p.id, 'Persona', p.name || p.id, 'prd', { role: p.role, tier: p.tier, goal: clip(p.goal, 160), authority: p.authority, frequency: p.frequency });
  E(PRODUCT, p.id, 'contains');
});
arr(S.stakeholders).forEach(st => {
  N(st.id, 'Stakeholder', st.name || st.id, 'prd', { role: st.role, interest: clip(st.interest, 160) });
  if (st.govLink) E(idx.get(st.id), st.govLink, 'concerns');
});
arr(ov.criteria).forEach(c => N(c.id, 'SuccessMetric', c.text || c.id, 'prd', { metric: c.metric, text: clip(c.text, 200) }));
arr((S.portfolio || {}).objectives).forEach(o => {
  const oid = N(o.id, 'Objective', o.objective || o.id, 'prd', { owner: o.owner });
  E(PRODUCT, o.id, 'contains');
  arr(o.keyResults).forEach(k => {
    N(k.id, 'KeyResult', k.kr || k.id, 'prd', { kr: clip(k.kr, 160), contribution: clip(k.contribution, 160) });
    E(oid, k.id, 'has_key_result');
    if (k.metric) E(idx.get(k.id), k.metric, 'targets');
  });
});
arr(S.journeys).forEach(j => {
  N(j.id, 'Journey', j.title || j.id, 'prd', { title: j.title });
  if (j.personaId) E(idx.get(j.personaId), j.id, 'experiences');
});
arr(S.usecases).forEach(u => {
  const uid = N(u.id, 'UseCase', u.title || u.id, 'prd', { trigger: clip(u.trigger, 160) });
  if (u.journeyId) E(uid, u.journeyId, 'belongs_to');
  if (u.primaryActor) E(uid, u.primaryActor, 'performed_by');
  arr(u.frs).forEach(fr => E(uid, fr, 'realizes'));
});
const sp = S.specs || {};
arr(sp.functional).forEach(f => {
  const fid = N(f.id, 'FunctionalRequirement', f.text || f.id, 'prd', { area: f.area, text: clip(f.text, 200) });
  if (f.traceJ) E(fid, f.traceJ, 'traces_to');
  if (f.traceSC) E(fid, f.traceSC, 'measured_by');
});
arr(sp.nonfunctional).forEach(n => N(n.id, 'NonFunctionalRequirement', n.text || n.id, 'prd', { cat: n.cat, text: clip(n.text, 200) }));
arr(sp.policies).forEach(po => {
  const pid = N(po.id, 'Policy', po.name || po.id, 'prd', { name: po.name, statement: clip(po.statement, 200) });
  if (po.traceFR) E(pid, po.traceFR, 'governs');
});
arr(S.risk).forEach(r => N(r.id, 'Risk', r.title || r.id, 'prd', { cat: r.cat, likelihood: r.likelihood, impact: r.impact, owner: r.owner }));
arr(S.governance).forEach(g => N(g.id, 'Governance', g.item || g.id, 'prd', { type: g.type, owner: g.owner, status: g.status }));
arr((S.portfolio || {}).dependencies).forEach(d => {
  N(d.id, 'Dependency', d.product || d.id, 'prd', { direction: d.direction, nature: clip(d.nature, 160), status: d.status });
  const ext = EXT(d.product || d.id, { direction: d.direction });
  E(PRODUCT, ext, 'depends_on_product', { via: d.id, direction: d.direction });
  E(idx.get(d.id), ext, 'refers_to');
});

// ---------------- ARCHITECTURE ----------------
arr(A.decisions).forEach(d => {
  const did = N(d.id, 'Decision', d.title || d.id, 'arch', { cat: d.cat, status: d.status, title: clip(d.title, 160) });
  arr(d.affects).forEach(t => E(did, t, 'satisfies'));
});
arr(A.domains).forEach(dom => {
  const sid = N(dom.id, 'Subdomain', dom.name || dom.id, 'arch', { name: dom.name, summary: clip(dom.summary, 160) });
  E(PRODUCT, dom.id, 'contains');
  if (dom.aggregate && dom.aggregate.name) {
    const aggLocal = dom.id + ':AGG';
    N(aggLocal, 'DataStore', dom.aggregate.name, 'arch', { store: dom.aggregate.store, description: clip(dom.aggregate.description, 160) });
    E(sid, aggLocal, 'owns');
  }
  arr(dom.components).forEach(c => {
    const cid = N(c.id, 'Component', c.name || c.id, 'arch', { overview: clip(c.overview, 200), hotspots: arr(c.hotspot).length });
    E(cid, dom.id, 'part_of');
    arr(c.mapsTo).forEach(fr => E(cid, fr, 'implements'));
    arr(c.command).forEach(cm => { if (cm && cm.ref) E(cid, cm.ref, 'realizes_command', { command: clip(cm.command, 120) }); });
    arr(c.businessRules).forEach(br => { if (br && br.ref) E(cid, br.ref, 'enforces'); });
    arr(c.resource).forEach(rr => E(cid, rr, 'uses_resource'));
    arr(c.dependency).forEach(dep => {
      if (!dep || !dep.ref) return;
      if (dep.type === 'resource') E(cid, dep.ref, 'uses_resource', { note: clip(dep.note, 120) });
      else if (dep.type === 'component') E(cid, dep.ref, 'depends_on', { note: clip(dep.note, 120) });
      else if (dep.type === 'integration') E(cid, dep.ref, 'uses_integration', { note: clip(dep.note, 120) });
    });
  });
});
arr(A.resources).forEach(r => N(r.id, 'Resource', r.name || r.id, 'arch', { cat: r.cat, engine: r.engine, desc: clip(r.desc, 160) }));
arr(A.apis).forEach(api => {
  const aid = N(api.id, 'Api', (api.method ? api.method + ' ' : '') + (api.path || api.id), 'arch', { method: api.method, path: api.path, purpose: clip(api.purpose, 160) });
  arr(api.realizes).forEach(fr => E(aid, fr, 'exposes'));
});
arr(A.integrations).forEach(it => {
  const iid = N(it.id, 'Integration', it.system || it.id, 'arch', { direction: it.direction, protocol: it.protocol, data: clip(it.data, 140) });
  if (it.dependsOn) {
    E(iid, it.dependsOn, 'integrates_with');           // -> Dependency node if present
    const dep = arr((S.portfolio || {}).dependencies).find(d => d.id === it.dependsOn);
    if (dep) E(iid, EXT(dep.product || dep.id, {}), 'integrates_with', { via: it.dependsOn });
  }
});
arr(A.security).forEach(se => {
  const seid = N(se.id, 'SecurityControl', se.control || se.id, 'arch', { control: se.control, approach: clip(se.approach, 160) });
  arr(se.addresses).forEach(t => E(seid, t, 'addresses'));
});
arr(A.stack).forEach((t, i) => {
  const label = typeof t === 'string' ? t : (t.choice || t.tech || t.name || Object.values(t)[0]);
  const props = typeof t === 'string' ? {} : { layer: t.layer || t.area, choice: t.choice || t.tech || t.name };
  const tid = N('TECH' + (i + 1), 'Technology', label, 'arch', props);
  E(PRODUCT, tid.split(':').slice(1).join(':'), 'uses_technology'); // pass localId
});
arr(A.kb).forEach((p, i) => { if (p && (p.name || p.title)) N(p.id || ('PATTERN' + (i + 1)), 'Pattern', p.name || p.title, 'arch', { summary: clip(p.summary || p.desc, 160) }); });

// ---------------- resolve edges (2nd pass) ----------------
resolveEdges();

// ---------------- stats ----------------
const byType = {};
nodes.forEach(n => { byType[n.type] = (byType[n.type] || 0) + 1; });
const edgeByType = {};
edges.forEach(e => { edgeByType[e.type] = (edgeByType[e.type] || 0) + 1; });
const stats = { nodes: nodes.length, edges: edges.length, unresolved: unresolved.length, nodeTypes: byType, edgeTypes: edgeByType };

const product = { name: ov.projectName || 'Product', slug: SLUG };
const graph = { product, ontologyVersion: ONTOLOGY_VERSION, generatedAt: new Date().toISOString(), stats, nodes, edges, unresolved };

// ---------------- JSON-LD ----------------
const edgeTypes = [...new Set(edges.map(e => e.type))];
const context = { '@vocab': VOCAB, label: 'http://www.w3.org/2000/01/rdf-schema#label', localId: VOCAB + 'localId', scope: VOCAB + 'scope' };
edgeTypes.forEach(t => { context[t] = { '@id': VOCAB + t, '@type': '@id' }; });
const outByFrom = new Map();
edges.forEach(e => { if (!outByFrom.has(e.from)) outByFrom.set(e.from, {}); const o = outByFrom.get(e.from); (o[e.type] = o[e.type] || []).push(MESH_BASE + encodeURIComponent(e.to)); });
const jsonldGraph = nodes.map(n => {
  const o = { '@id': MESH_BASE + encodeURIComponent(n.id), '@type': n.type, label: n.label, localId: n.localId, scope: n.scope };
  Object.entries(n.props || {}).forEach(([k, v]) => { if (v != null && v !== '') o[VOCAB + k] = v; });
  Object.assign(o, outByFrom.get(n.id) || {});
  return o;
});
const jsonld = { '@context': context, '@graph': jsonldGraph };

// ---------------- write ----------------
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'graph.json'), JSON.stringify(graph, null, 2));
fs.writeFileSync(path.join(outDir, 'graph.jsonld'), JSON.stringify(jsonld, null, 2));

console.log('Knowledge graph for "' + product.name + '" (' + SLUG + ')  ontology v' + ONTOLOGY_VERSION);
console.log('  nodes: ' + stats.nodes + '   edges: ' + stats.edges + '   unresolved refs: ' + stats.unresolved);
console.log('  node types: ' + Object.entries(byType).map(([k, v]) => k + '=' + v).join(', '));
if (unresolved.length) console.log('  ⚠ unresolved (traceability gaps): ' + unresolved.map(u => u.type + '→' + u.ref).slice(0, 12).join(', ') + (unresolved.length > 12 ? ' …' : ''));
console.log('  wrote graph.json + graph.jsonld to ' + outDir);
