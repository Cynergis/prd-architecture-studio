# Data schema — PRD (`window.__PRD__`) and Architecture (`window.__ARCH__`)

The site reads two global objects defined in `data.js`. The `prd-build` skill fills `__PRD__`; the `architecture-build` skill fills `__ARCH__`. The `prd-site` generator injects them into the template. Keep ids stable — cross-links rely on them.

ID conventions: personas `P#`, journeys `J#`, use cases `UC#`, functional reqs `FR#`, non-functional `NFR#`, success criteria `SC#`, policies `POL#`, governance `G#`, risks `R#`, glossary `GL#`, dependencies `D#`, ADRs `ADR-##`, components `C#`, resources `R-XX#`, integrations `INT#`.

## `window.__PRD__`

```js
{
  overview:{ projectName, author, date, problem, background, objectives:[str], vision, differentiator, targetUsers,
             criteria:[{id:'SC1', text, metric}] },            // success metrics
  portfolio:{ domain, capability, valueStream, position,
              owners:[{role, name}],
              dependencies:[{id:'D1', product, direction:'upstream|downstream', nature, status, notes}],
              objectives:[{id:'O1', objective, owner, keyResults:[{id:'KR1', kr, contribution, metric:'SC2'}]}] },
  personas:[{id:'P1', name, role, tier:'Primary|Secondary|Admin|Future', situation, goal, obstacle, solution,
             successMetric, permissions, frequency, volume, authority, collaboration, touchpoints, tools, regulatory, quote}],
  stakeholders:[{id:'ST1', name, role, interest, govLink:'G3'}],
  product:{ approach, inScope:[str], outScope:[str], mvp:[str], growth:[str], vision:[str] },
  journeys:[{id:'J1', title, personaId:'P1', opening, rising, climax, resolution, capabilities}],
  usecases:[{id:'UC1', title, journeyId:'J1', primaryActor:'P1', supportingActors,
             trigger, preconditions, orchestration, repeatability, postconditions,
             mainFlow:[str], extensions:[{at, text}], terminalStates:[{type:'Success|Failure', text}],
             frs:['FR3','FR4'], workflow:'<mermaid>', acceptance:[{title, given:[str], when:[str], then:[str]}]}],
  specs:{ functional:[{id:'FR1', area, text, traceJ:'J1', traceSC:'SC1'}],
          nonfunctional:[{id:'NFR1', cat, text}],
          policies:[{id:'POL1', name, statement, traceFR:'FR1'}] },
  governance:[{id:'G1', item, type:'Compliance|Approval|Ownership|Decision', owner, status, notes}],
  risk:[{id:'R1', title, cat:'Technical|Market|Resource', likelihood, impact, mitigation, owner}],
  glossary:[{id:'GL1', term, definition}]
}
```

## `window.__ARCH__`

```js
{
  context:{ summary, drivers:[str], constraints:[str], assumptions:[str], diagram:'<mermaid>' },
  decisions:[{id:'ADR-01', cat, title, status:'Accepted|Proposed|Superseded', rationale, alternatives, consequences,
              affects:['FR3','NFR1','G1','UC2']}],            // cross-links to PRD
  stack:[{layer, tech, version, why}],
  subdomainMaps:[{title, mermaid}],
  domains:[{ id:'DOM1', name, color:'#hex', summary,
    aggregate:{ name, store, description, tables:[{name, purpose, columns:[{name, type, desc}]}] },
    maps:[{title, mermaid}],
    components:[{ id:'C1', name, overview, mapsTo:['FR1'],
      trigger:[{type:'API|User|Scheduler|Event', caller, endpoint, actor, action, schedule, source, name, schema, why, desc}],
      businessRules:[{rule, ref:'POL1'}],                     // ref -> POL# or FR#
      command:[{command, ref:'FR1'}],
      readModel:[{type:'Database', table, desc} | {type:'API', api, link:'API3', request, response, desc}],
      writeModel:[{type:'Subdomain', table, desc} | {type:'Product|External', queue:'R-MQ1 name', payload, desc}],
      resource:['R-DB1','R-MQ1'],                             // -> resources[].id
      dependency:[{type:'resource|component|integration', ref, note}],
      hotspot:[{level, text}],                                // level: Risk|Security|Performance|Reliability|Consistency|Question
      code:{ path, repo, pipeline, tests, coverage, app, dashboard, runbook, owners, logs:[{env, url}] } }] }],
  apis:[{id:'API1', method, path, purpose, errors, realizes:['FR1']}],
  integrations:[{id:'INT1', system, direction:'inbound|outbound|bidirectional', protocol, data, auth, dependsOn:'D2', notes}],
  security:[{id:'SEC1', control, approach, addresses:['NFR3','G1']}],
  infra:{ cloud, platform, summary, adrs:['ADR-06'], meets:['NFR1'],
          environments:[{id, name, cluster, region, accountUrl, iacUrl,
                         services:[{name, url}], dashboards:[{name, url}], notes}] },
  design:{ links:[{name, url}] },
  structure:{ tree:'<text>', mapping:[{area, path}], patterns:[str] },
  kb:{ intro, guidance:[str], criteria:[{name, q}],
       patterns:[{id, name, family, summary, whenUse:[str], whenAvoid:[str], tradeoffs, signals}] }
}
```

## Cross-link integrity (check on every save)
- Every `usecases[].frs` id exists in `specs.functional`.
- Every `specs.functional[].traceJ` exists in `journeys`; `traceSC` in `overview.criteria`.
- Every component `mapsTo`, `resource`, and `dependency.ref` resolves to an FR / resource / component / integration that exists.
- Every `decisions[].affects` and `security[].addresses` id exists in the PRD.
- `businessRules[].ref` and `command[].ref` resolve to a `POL#` or `FR#`.
