/* Claritas Claims — example dataset (P&C insurance claims processing). Large, to exercise the studio. */
window.__PRD__ = {
  overview:{
    projectName:'Claritas Claims — Claims Processing Platform',
    author:'Atlas',
    date:'2026-06-18',
    problem:'Claims take too long, leak money through inconsistent decisions, and strain compliance. Adjusters juggle a legacy policy system, spreadsheets, email, and separate fraud tools, so simple claims move as slowly as complex ones and regulatory deadlines are at risk.',
    background:'A mid-size P&C insurer (auto and property) processes ~120k claims a year across multiple states. The current claims system is a 15-year-old monolith with no straight-through processing, weak audit trails, and manual fraud referral. Catastrophe events cause backlogs the system cannot absorb.',
    objectives:[
      'Cut claim cycle time and enable straight-through processing for low-severity claims.',
      'Reduce claims leakage through consistent, rule-driven adjudication and reserves.',
      'Strengthen fraud detection and regulatory compliance with a full audit trail.'
    ],
    vision:'Give every claim the right level of attention automatically: settle the simple ones in minutes, route the complex and suspicious ones to the right expert with the evidence already in hand.',
    differentiator:'A durable claim workflow that scores fraud and verifies coverage up front, links every decision to a policy rule and an audit record, and scales elastically through catastrophe surges.',
    targetUsers:'P&C claims organizations (auto and property), their adjusters, examiners, SIU investigators, and the policyholders who file claims.',
    criteria:[
      {id:'SC1', text:'Reduce average claim cycle time from 14 days to 7 days', metric:'<= 7 days median'},
      {id:'SC2', text:'Achieve straight-through processing for low-severity claims', metric:'>= 35% STP'},
      {id:'SC3', text:'Reduce claims leakage', metric:'>= 20% reduction'},
      {id:'SC4', text:'Detect more fraudulent claims at high precision', metric:'+25% detection at >= 70% precision'},
      {id:'SC5', text:'Maintain claimant satisfaction', metric:'CSAT >= 4.3 / 5'},
      {id:'SC6', text:'Meet regulatory acknowledgement windows', metric:'100% within mandated window'}
    ]
  },
  portfolio:{
    domain:'Insurance Operations — Claims',
    capability:'Claims lifecycle management (FNOL to settlement and recovery)',
    valueStream:'First Notice of Loss to settlement and recovery — the value stream that turns a reported loss into a fair, fast, compliant payout.',
    position:'Claritas Claims owns adjudication and orchestration of the claim lifecycle. It sits downstream of the Policy Admin system (policy and coverage data) and upstream of Payments and the General Ledger, and it integrates the fraud bureau and document services.',
    owners:[
      {role:'Product Owner', name:'Dana Whitfield'},
      {role:'Engineering Lead', name:'Marcus Lee'},
      {role:'Architecture', name:'Priya Nair'},
      {role:'Data / ML (fraud)', name:'Tom Alvarez'},
      {role:'Compliance SME', name:'Regina Foss'},
      {role:'Executive Sponsor', name:'VP Claims — Helen Cho'}
    ],
    dependencies:[
      {id:'D1', product:'Policy Admin System', direction:'upstream', nature:'Policy, coverage, limits, deductibles, and in-force status at date of loss.', status:'Available (legacy)', notes:'Latency and availability are a known risk (R1).'},
      {id:'D2', product:'Payments / Disbursement', direction:'downstream', nature:'Issues claimant and vendor payments; PCI-scoped.', status:'Available', notes:'Certified gateway; tokenized.'},
      {id:'D3', product:'Fraud bureau (ISO ClaimSearch)', direction:'upstream', nature:'Cross-carrier claim history and watchlists for fraud scoring.', status:'Contracted', notes:'Rate-limited external API.'},
      {id:'D4', product:'Document intelligence (OCR/IDP)', direction:'upstream', nature:'Extracts structured data from photos, estimates, police reports.', status:'Available', notes:'Managed service.'},
      {id:'D5', product:'General Ledger / Finance', direction:'downstream', nature:'Reserves, paid losses, and recoveries posted to finance.', status:'Available', notes:'Daily reconciliation.'},
      {id:'D6', product:'Notification service', direction:'upstream', nature:'Email and SMS to claimants and vendors.', status:'Available', notes:'Shared platform service.'}
    ],
    objectives:[
      {id:'O1', objective:'Make claims fast — settle simple losses in minutes, not days', owner:'VP Claims', keyResults:[
        {id:'KR1', kr:'Cut median cycle time from 14 to 7 days', contribution:'Durable workflow plus auto coverage verification removes handoffs and waiting.', metric:'SC1'},
        {id:'KR2', kr:'Reach 35% straight-through processing for low-severity claims', contribution:'Rules-based auto-adjudication for glass and low-severity auto.', metric:'SC2'}
      ]},
      {id:'O2', objective:'Pay the right amount — reduce leakage', owner:'CFO', keyResults:[
        {id:'KR3', kr:'Reduce leakage by 20%', contribution:'Consistent rule-driven indemnity, deductible, and reserve logic with authority controls.', metric:'SC3'}
      ]},
      {id:'O3', objective:'Stay compliant and catch fraud', owner:'Chief Compliance Officer', keyResults:[
        {id:'KR4', kr:'Increase fraud detection by 25% at >= 70% precision', contribution:'Fraud scoring at FNOL and adjudication with SIU referral.', metric:'SC4'},
        {id:'KR5', kr:'100% of regulatory acknowledgements on time', contribution:'Workflow timers and audit trail enforce mandated windows.', metric:'SC6'}
      ]}
    ]
  },
  personas:[
    {id:'P1', name:'Maria Delgado', role:'Claimant (Policyholder)', tier:'Primary', situation:'Her car was rear-ended; she needs to file a claim and get paid quickly with minimal friction.', goal:'File a claim easily and know what happens next and when.', obstacle:'Confusing forms, repeated requests for the same documents, and silence between updates.', solution:'A guided FNOL with photo upload, instant acknowledgement, and proactive status updates.', successMetric:'Claim filed in minutes; paid without chasing anyone.', permissions:'Can file and view her own claims and upload documents. Cannot see internal notes or other claims.', frequency:'Rare — once or twice when a loss occurs.', volume:'1 claim with several documents.', authority:'End user; no decision authority on the claim.', collaboration:'Interacts with the FNOL agent and adjuster; receives notifications.', touchpoints:'FNOL portal, status page, settlement letter.', tools:'Web and mobile self-service.', regulatory:'Protected PII; subject to fair claims practices.', quote:'I just want to know it is handled and when I will be paid.'},
    {id:'P2', name:'Andre Boateng', role:'FNOL Intake Agent', tier:'Secondary', situation:'Takes loss reports by phone and from the portal queue and must capture them accurately and fast.', goal:'Capture a clean, complete first notice and set the claim on the right track.', obstacle:'Incomplete information and re-keying across systems.', solution:'A single intake screen that validates policy in force and pre-fills from the policy system.', successMetric:'Complete FNOL with low rework; fast handle time.', permissions:'Can create FNOL and attach documents; cannot adjudicate or pay.', frequency:'All day, every shift.', volume:'~60 intakes per day.', authority:'Intake only.', collaboration:'Hands clean claims to triage/assignment.', touchpoints:'Intake console.', tools:'CTI phone, intake console.', regulatory:'Handles PII; must follow data-handling policy.', quote:'Give me the policy on screen and stop making me re-type it.'},
    {id:'P3', name:'Sofia Romano', role:'Claims Adjuster', tier:'Primary', situation:'Owns a queue of auto claims and must investigate, value, and settle them within authority.', goal:'Adjudicate fairly and quickly with the evidence and rules at hand.', obstacle:'Switching between policy, estimates, fraud tools, and email; unclear authority limits.', solution:'One claim workspace with coverage, reserves, estimates, fraud signal, and guided rules.', successMetric:'Throughput and accuracy; low reopen and leakage.', permissions:'Can adjudicate and request payment up to authority limit ($25k); set reserves; refer to SIU.', frequency:'Daily, continuous.', volume:'~25 active claims; 8-10 actions/day.', authority:'Decision maker within authority limit.', collaboration:'Escalates to senior examiner; refers to SIU; coordinates vendors.', touchpoints:'Claim workspace, estimate review, payment request.', tools:'Claim workspace, estimating tool.', regulatory:'Bound by fair claims practices and authority controls.', quote:'Put the decision and the rule behind it in one place.'},
    {id:'P4', name:'David Okafor', role:'Senior Examiner', tier:'Secondary', situation:'Handles complex and high-value claims and approves work above adjuster authority.', goal:'Make sound calls on complex claims and approvals without bottlenecking the queue.', obstacle:'Approvals scattered across email; little context when a claim arrives.', solution:'An approval inbox with full claim context, reserve history, and rule rationale.', successMetric:'Fast, well-documented approvals; controlled leakage.', permissions:'Authority up to $100k; can override within policy; approves adjuster escalations.', frequency:'Daily.', volume:'~12 escalations/approvals per day.', authority:'Senior decision maker.', collaboration:'Works with adjusters, SIU, and the claims manager.', touchpoints:'Approval inbox, complex claim workspace.', tools:'Claim workspace.', regulatory:'Authority controls and audit.', quote:'Show me why it is here and what the rule says.'},
    {id:'P5', name:'Lena Park', role:'SIU Fraud Investigator', tier:'Secondary', situation:'Investigates suspicious claims referred by adjusters or the fraud model.', goal:'Confirm or clear fraud quickly with evidence and a defensible disposition.', obstacle:'Referrals arrive with thin context; cross-claim patterns are hard to see.', solution:'An SIU case workspace with the fraud score, cross-carrier hits, and linked evidence.', successMetric:'Higher confirmed-fraud rate; fewer false referrals.', permissions:'Can open/manage SIU cases, place holds on payment, record disposition.', frequency:'Daily.', volume:'~6 active investigations.', authority:'Can pause a claim pending investigation.', collaboration:'Works with adjusters, legal, and external bureaus.', touchpoints:'SIU case workspace.', tools:'SIU tools, bureau portal.', regulatory:'Mandatory fraud reporting to state bureau.', quote:'Bring me the signal and the history, not a hunch.'},
    {id:'P6', name:'Helen Cho', role:'Claims Manager / VP', tier:'Admin', situation:'Accountable for cycle time, leakage, compliance, and staffing across the book.', goal:'See where claims are stuck and where money and compliance risk leak.', obstacle:'Reporting is after-the-fact and hard to trust.', solution:'Live dashboards on cycle time, leakage, STP, fraud, and SLA breaches.', successMetric:'Targets met across the book; no surprise SLA misses.', permissions:'Full oversight; configure authority limits and queues; no claim-level edits.', frequency:'Weekly review; daily glance.', volume:'Whole book.', authority:'Owns targets and policy configuration.', collaboration:'Reports to executives; directs the claims org.', touchpoints:'Manager dashboards, configuration.', tools:'Dashboards.', regulatory:'Accountable for compliance posture.', quote:'Tell me what is stuck and what it is costing us this week.'}
  ],
  stakeholders:[
    {id:'ST1', name:'Regina Foss', role:'Compliance Officer', interest:'Fair claims practices, regulatory acknowledgements, and a complete audit trail.', govLink:'G1'},
    {id:'ST2', name:'Reinsurance Lead', role:'Reinsurance', interest:'Visibility into large losses and recoveries above retention.', govLink:'G2'},
    {id:'ST3', name:'Finance Controller', role:'Finance', interest:'Accurate reserves, paid losses, and recoveries posted to the ledger.', govLink:'G4'},
    {id:'ST4', name:'CISO', role:'Security', interest:'PCI and PII safeguards across claims and payments.', govLink:'G3'}
  ],
  product:{
    approach:'Problem-solving MVP — prove straight-through processing and rule-driven adjudication on auto, then extend to property and recovery.',
    inScope:['Multichannel FNOL and intake','Coverage verification against the policy system','Rule-driven adjudication with reserves and authority limits','Payments and basic subrogation','Fraud scoring and SIU referral','Document ingestion and audit trail'],
    outScope:['Underwriting and policy administration','Litigation management (Phase 3)','Full salvage marketplace','Customer mobile native apps at MVP','Multi-language claimant portal at MVP'],
    mvp:['Auto FNOL + intake','Coverage verification','Rule-driven adjudication (auto)','Reserves + authority limits','Claimant payments','Fraud score at FNOL + SIU referral','Document ingest + audit log'],
    growth:['Property claims','Subrogation and salvage recovery','Straight-through processing for glass/low-severity','Vendor/repair-network integration','Manager analytics suite'],
    vision:['Predictive severity and reserve recommendations','Catastrophe surge automation','Litigation and complex liability','Cross-line claims (commercial)']
  },
  journeys:[
    {id:'J1', title:'Maria files a claim after a car accident', personaId:'P1', opening:'Saturday evening: Maria is rear-ended and opens the insurer portal on her phone.', rising:'A guided flow confirms her policy, captures the loss, and lets her upload photos of the damage.', climax:'She gets an instant claim number and an acknowledgement with what happens next.', resolution:'Three days later she receives a settlement and a clear letter — without chasing anyone.', capabilities:'Guided FNOL, photo upload, instant acknowledgement, status updates, settlement'},
    {id:'J2', title:'Sofia adjudicates an auto claim', personaId:'P3', opening:'Monday: a new mid-severity auto claim lands in Sofia’s queue, already triaged.', rising:'Coverage is verified, a reserve is set, the estimate is attached, and the fraud signal is green.', climax:'The rules compute indemnity within her authority; she approves and requests payment.', resolution:'The claimant is paid the same day; every decision is linked to a rule and logged.', capabilities:'Coverage, reserves, estimate, fraud signal, rule-driven indemnity, authority, payment'},
    {id:'J3', title:'Lena investigates a suspicious claim', personaId:'P5', opening:'A claim is auto-flagged: high fraud score and a cross-carrier hit.', rising:'Lena opens the SIU case with the score, history, and linked evidence in one place.', climax:'She confirms staged-accident indicators and places a hold on payment.', resolution:'The claim is denied with a documented disposition and reported to the bureau.', capabilities:'Fraud score, cross-carrier history, evidence linkage, payment hold, disposition, reporting'},
    {id:'J4', title:'David approves a high-value claim', personaId:'P4', opening:'An adjuster escalates a $60k total-loss claim above her authority.', rising:'David opens the approval with full context: coverage, reserve history, and rule rationale.', climax:'He approves with a note; dual approval is required and routed automatically.', resolution:'The settlement proceeds with a complete approval trail.', capabilities:'Authority routing, approval inbox, reserve history, dual approval, audit'},
    {id:'J5', title:'Helen reviews the book on Monday', personaId:'P6', opening:'Monday 9am: Helen opens the claims dashboard.', rising:'Cycle time, STP rate, leakage, fraud, and SLA breaches are all current.', climax:'She spots a backlog forming in property after a storm and reallocates staff.', resolution:'SLA breaches are averted; she briefs the executives with live numbers.', capabilities:'KPI dashboards, SLA monitoring, workload view, configuration'}
  ],
  usecases:[
    {id:'UC1', title:'File and intake a first notice of loss', journeyId:'J1', primaryActor:'P1', supportingActors:'FNOL Intake Agent, Policy Admin system, Document service', frs:['FR1','FR2','FR5'],
      trigger:'A policyholder reports a loss via portal, mobile, or phone.',
      preconditions:'The reporter can be matched to a policy; the channel is available.',
      orchestration:'FNOL UI/CTI -> Claims API -> policy verification -> claim created -> claim.fnol.received event.',
      repeatability:'Per loss event; idempotent on duplicate submissions within a short window.',
      postconditions:'A claim exists with a number, status New, and an acknowledgement sent; FNOL event published.',
      mainFlow:['Reporter identifies the policy and date of loss.','System verifies the policy was in force at the date of loss.','Reporter enters loss details and uploads documents/photos.','System creates the claim and assigns a claim number.','System acknowledges receipt within the regulatory window.'],
      extensions:[{at:'2a', text:'Policy not in force at date of loss -> capture as inquiry; do not create a covered claim.'},{at:'3a', text:'Documents missing -> claim created; system requests the missing items.'},{at:'*', text:'Policy system unavailable -> capture FNOL and verify coverage asynchronously.'}],
      terminalStates:[{type:'Success', text:'Claim created, acknowledged, and queued for triage.'},{type:'Failure', text:'No matching policy -> recorded as an inquiry, not a claim.'}],
      workflow:'flowchart TD\n  A([Loss reported]) --> B[Identify policy + date of loss]\n  B --> C{In force?}\n  C -- No --> X([Recorded as inquiry])\n  C -- Yes --> D[Capture loss + documents]\n  D --> E[Create claim + number]\n  E --> F[Acknowledge within window]\n  F --> G([Queued for triage])',
      acceptance:[
        {title:'Coverage in force at date of loss', given:['a policyholder reports a loss','the policy was in force on the date of loss'], when:['the FNOL is submitted'], then:['a claim is created with a unique number','an acknowledgement is sent within the regulatory window']},
        {title:'Policy not in force', given:['the policy was not in force on the date of loss'], when:['the FNOL is submitted'], then:['no covered claim is created','the report is recorded as an inquiry']}
      ]},
    {id:'UC2', title:'Triage and assign a claim', journeyId:'J2', primaryActor:'P2', supportingActors:'Fraud scoring service, Assignment engine', frs:['FR3','FR4','FR17'],
      trigger:'A claim.fnol.received event is published.',
      preconditions:'The claim exists with loss details.',
      orchestration:'FNOL event -> segmentation rules -> fraud score -> assignment by skill and load -> claim.assigned event.',
      repeatability:'Once per claim; re-runs on material change.',
      postconditions:'Claim segmented, fraud-scored, and assigned to an adjuster or STP path.',
      mainFlow:['Segment the claim by line, severity, and complexity.','Request a fraud score for the claim.','Select the STP path or an adjuster by skill and current load.','Assign the claim and notify the owner.'],
      extensions:[{at:'2a', text:'Fraud score above threshold -> route to SIU instead of STP.'},{at:'3a', text:'Low-severity and clean -> straight-through processing.'}],
      terminalStates:[{type:'Success', text:'Claim assigned to the right path or owner.'},{type:'Failure', text:'No eligible adjuster -> placed in an overflow queue.'}],
      workflow:'flowchart TD\n  A([claim.fnol.received]) --> B[Segment by severity]\n  B --> C[Fraud score]\n  C --> D{Score high?}\n  D -- Yes --> S([Route to SIU])\n  D -- No --> E{Low severity + clean?}\n  E -- Yes --> T([Straight-through])\n  E -- No --> F[Assign by skill + load]\n  F --> G([claim.assigned])',
      acceptance:[
        {title:'High fraud score routes to SIU', given:['a claim has been scored above the fraud threshold'], when:['triage runs'], then:['the claim is referred to SIU','the claim is not placed on the straight-through path']},
        {title:'Low-severity clean claim goes straight-through', given:['a low-severity claim with a clean fraud score'], when:['triage runs'], then:['the claim follows the straight-through path']}
      ]},
    {id:'UC3', title:'Verify coverage and set reserve', journeyId:'J2', primaryActor:'P3', supportingActors:'Policy Admin system', frs:['FR5','FR6','FR7'],
      trigger:'A claim is assigned to an adjuster.',
      preconditions:'Policy and coverage data are retrievable.',
      orchestration:'Assignment -> coverage verification against policy -> coverage decision -> reserve set.',
      repeatability:'Reserves can be adjusted as the claim develops.',
      postconditions:'Coverage decision recorded; an initial reserve is set within policy.',
      mainFlow:['Retrieve coverage, limits, and deductibles for the date of loss.','Determine which coverages apply to the reported loss.','Record the coverage decision.','Set an initial reserve based on severity.'],
      extensions:[{at:'1a', text:'Policy system slow/unavailable -> use last-known coverage snapshot and flag for confirmation.'},{at:'4a', text:'Reserve exceeds authority -> route for senior approval.'}],
      terminalStates:[{type:'Success', text:'Coverage confirmed and reserve set.'},{type:'Failure', text:'Coverage cannot be confirmed -> claim held pending policy data.'}],
      workflow:'flowchart TD\n  A([Claim assigned]) --> B[Retrieve coverage + limits]\n  B --> C[Determine applicable coverage]\n  C --> D[Record coverage decision]\n  D --> E[Set reserve]\n  E --> F{Within authority?}\n  F -- No --> G([Route for approval])\n  F -- Yes --> H([Reserve set])',
      acceptance:[
        {title:'Reserve set within 48 hours', given:['a claim has been assigned'], when:['coverage is verified'], then:['a coverage decision is recorded','an initial reserve is set within 48 hours of assignment']},
        {title:'Reserve above authority routes for approval', given:['the proposed reserve exceeds the adjuster authority limit'], when:['the reserve is set'], then:['the reserve is routed to a senior examiner for approval']}
      ]},
    {id:'UC4', title:'Adjudicate and settle a claim', journeyId:'J2', primaryActor:'P3', supportingActors:'Estimating tool, Payments', frs:['FR8','FR9','FR10','FR11','FR13'],
      trigger:'Coverage is confirmed and evidence is gathered.',
      preconditions:'Coverage decision exists; estimate attached.',
      orchestration:'Investigation -> indemnity calculation (deductible + limits) -> authority check -> payment request -> payment.requested event.',
      repeatability:'Supplements can re-open adjudication.',
      postconditions:'Indemnity decided within authority; payment requested; decisions logged.',
      mainFlow:['Record investigation notes and the repair estimate.','Calculate indemnity applying deductible and limits.','Check the amount against the adjuster authority limit.','Approve within authority or route for approval.','Request payment to the claimant.'],
      extensions:[{at:'3a', text:'Amount above authority -> route to senior; dual approval if above the dual-approval threshold.'},{at:'5a', text:'Open fraud hold -> payment blocked until SIU clears.'}],
      terminalStates:[{type:'Success', text:'Claim settled and payment requested.'},{type:'Failure', text:'Denied -> documented denial with rationale and appeal rights.'}],
      workflow:'flowchart TD\n  A([Coverage confirmed]) --> B[Record estimate + notes]\n  B --> C[Calculate indemnity]\n  C --> D[Apply deductible + limits]\n  D --> E{Within authority?}\n  E -- No --> F([Route for approval])\n  E -- Yes --> G{Fraud hold?}\n  G -- Yes --> H([Payment blocked])\n  G -- No --> I([Request payment])',
      acceptance:[
        {title:'Deductible applied before indemnity', given:['an approved estimate and an applicable deductible'], when:['indemnity is calculated'], then:['the deductible is subtracted before the payable amount','the payable amount does not exceed the coverage limit']},
        {title:'Over-authority routes for approval', given:['the payable amount exceeds the adjuster authority limit'], when:['the adjuster approves'], then:['the claim is routed for senior approval before payment']},
        {title:'Fraud hold blocks payment', given:['an open SIU hold on the claim'], when:['a payment is requested'], then:['the payment is blocked until the hold is cleared']}
      ]},
    {id:'UC5', title:'Investigate a suspicious claim (SIU)', journeyId:'J3', primaryActor:'P5', supportingActors:'Fraud bureau, Legal', frs:['FR18','FR19','FR20'],
      trigger:'A claim is referred to SIU by the fraud model or an adjuster.',
      preconditions:'A fraud referral exists with a score and reason.',
      orchestration:'Referral -> SIU case -> bureau lookup + evidence linkage -> disposition -> hold/release.',
      repeatability:'A case can be reopened on new evidence.',
      postconditions:'A disposition is recorded; payment hold released or denial issued; reported if confirmed.',
      mainFlow:['Open an SIU case from the referral.','Pull cross-carrier history and link evidence.','Investigate and record findings.','Record a disposition (confirmed, cleared, inconclusive).','Release the hold or deny the claim.'],
      extensions:[{at:'4a', text:'Confirmed fraud -> deny claim and report to the state bureau.'},{at:'4b', text:'Cleared -> release the payment hold.'}],
      terminalStates:[{type:'Success', text:'Disposition recorded and acted upon.'},{type:'Failure', text:'Inconclusive -> escalate to legal.'}],
      workflow:'flowchart TD\n  A([Referral]) --> B[Open SIU case]\n  B --> C[Bureau lookup + evidence]\n  C --> D[Investigate]\n  D --> E{Disposition}\n  E -- Confirmed --> F([Deny + report])\n  E -- Cleared --> G([Release hold])\n  E -- Inconclusive --> H([Escalate to legal])',
      acceptance:[
        {title:'Confirmed fraud denies and reports', given:['an SIU case with confirmed fraud indicators'], when:['the disposition is recorded as confirmed'], then:['the claim is denied with documented rationale','a fraud report is filed with the state bureau']},
        {title:'Cleared claim releases the hold', given:['an SIU case disposition of cleared'], when:['the disposition is recorded'], then:['the payment hold is released','the claim resumes adjudication']}
      ]},
    {id:'UC6', title:'Recover through subrogation', journeyId:'J2', primaryActor:'P4', supportingActors:'Finance, Legal', frs:['FR15','FR16'],
      trigger:'A settled claim shows third-party liability.',
      preconditions:'Claim settled; liable third party identified.',
      orchestration:'Liability assessment -> subrogation case -> recovery pursuit -> recovery posted to GL.',
      repeatability:'Multiple recovery attempts over time.',
      postconditions:'Recovery pursued and any proceeds posted to finance.',
      mainFlow:['Assess third-party liability share.','Open a subrogation case when liability is sufficient.','Pursue recovery from the liable party or carrier.','Post recovered amounts to the ledger.'],
      extensions:[{at:'1a', text:'Liability below threshold -> close without subrogation.'}],
      terminalStates:[{type:'Success', text:'Recovery obtained and posted.'},{type:'Failure', text:'Recovery denied -> close with rationale.'}],
      workflow:'flowchart TD\n  A([Settled claim]) --> B[Assess liability]\n  B --> C{Liability >= 50%?}\n  C -- No --> X([Close, no subrogation])\n  C -- Yes --> D[Open subrogation case]\n  D --> E[Pursue recovery]\n  E --> F([Post recovery to GL])',
      acceptance:[
        {title:'Subrogation pursued when liability is sufficient', given:['a settled claim with third-party liability at or above 50%'], when:['the claim is reviewed for recovery'], then:['a subrogation case is opened']},
        {title:'Recoveries posted to finance', given:['a recovery is obtained'], when:['the recovery is recorded'], then:['the amount is posted to the general ledger']}
      ]}
  ],
  specs:{
    functional:[
      {id:'FR1', area:'FNOL & Intake', text:'Policyholders and agents can submit a first notice of loss via portal, mobile, or phone', traceJ:'J1', traceSC:'SC1'},
      {id:'FR2', area:'FNOL & Intake', text:'Reporters can attach photos and documents to a loss report', traceJ:'J1', traceSC:'SC1'},
      {id:'FR3', area:'FNOL & Intake', text:'The system can segment a claim by line, severity, and complexity', traceJ:'J2', traceSC:'SC2'},
      {id:'FR4', area:'FNOL & Intake', text:'The system can assign a claim to an adjuster by skill and current load', traceJ:'J2', traceSC:'SC1'},
      {id:'FR5', area:'Coverage & Policy', text:'The system can verify the policy was in force on the date of loss', traceJ:'J1', traceSC:'SC3'},
      {id:'FR6', area:'Coverage & Policy', text:'Adjusters can determine applicable coverages, limits, and deductibles', traceJ:'J2', traceSC:'SC3'},
      {id:'FR7', area:'Coverage & Policy', text:'Adjusters can set and adjust reserves on a claim', traceJ:'J2', traceSC:'SC3'},
      {id:'FR8', area:'Adjudication', text:'Adjusters can record investigation notes and repair estimates', traceJ:'J2', traceSC:'SC3'},
      {id:'FR9', area:'Adjudication', text:'The system can calculate indemnity from the estimate and coverage', traceJ:'J2', traceSC:'SC3'},
      {id:'FR10', area:'Adjudication', text:'The system can apply deductibles and coverage limits to the payable amount', traceJ:'J2', traceSC:'SC3'},
      {id:'FR11', area:'Adjudication', text:'The system can enforce authority limits on decisions and payments', traceJ:'J4', traceSC:'SC3'},
      {id:'FR12', area:'Adjudication', text:'The system can route approvals to the appropriate authority level', traceJ:'J4', traceSC:'SC3'},
      {id:'FR13', area:'Payments & Settlement', text:'Adjusters can request a payment to a claimant or vendor', traceJ:'J2', traceSC:'SC1'},
      {id:'FR14', area:'Payments & Settlement', text:'The system can issue payments through the payment gateway', traceJ:'J2', traceSC:'SC1'},
      {id:'FR15', area:'Payments & Settlement', text:'The system can identify subrogation opportunities from liability', traceJ:'J2', traceSC:'SC3'},
      {id:'FR16', area:'Payments & Settlement', text:'Examiners can manage recoveries and salvage', traceJ:'J2', traceSC:'SC3'},
      {id:'FR17', area:'Fraud & SIU', text:'The system can score fraud risk at FNOL and at adjudication', traceJ:'J3', traceSC:'SC4'},
      {id:'FR18', area:'Fraud & SIU', text:'The system can flag and refer suspicious claims to SIU', traceJ:'J3', traceSC:'SC4'},
      {id:'FR19', area:'Fraud & SIU', text:'Investigators can manage SIU cases and place payment holds', traceJ:'J3', traceSC:'SC4'},
      {id:'FR20', area:'Fraud & SIU', text:'Investigators can record a disposition and report confirmed fraud', traceJ:'J3', traceSC:'SC4'},
      {id:'FR21', area:'Documents & Evidence', text:'The system can ingest documents and photos from any channel', traceJ:'J1', traceSC:'SC1'},
      {id:'FR22', area:'Documents & Evidence', text:'The system can extract structured data from documents (OCR/IDP)', traceJ:'J2', traceSC:'SC1'},
      {id:'FR23', area:'Documents & Evidence', text:'Users can link evidence to a claim and its decisions', traceJ:'J3', traceSC:'SC4'},
      {id:'FR24', area:'Communications', text:'The system can notify claimants of status changes', traceJ:'J1', traceSC:'SC5'},
      {id:'FR25', area:'Communications', text:'The system can request missing information from claimants', traceJ:'J1', traceSC:'SC5'},
      {id:'FR26', area:'Communications', text:'The system can generate settlement and denial letters', traceJ:'J2', traceSC:'SC5'},
      {id:'FR27', area:'Reporting & Compliance', text:'The system can produce regulatory and market-conduct reports', traceJ:'J5', traceSC:'SC6'},
      {id:'FR28', area:'Reporting & Compliance', text:'The system maintains an immutable audit trail of every decision', traceJ:'J4', traceSC:'SC6'},
      {id:'FR29', area:'Reporting & Compliance', text:'Managers can view dashboards for cycle time, leakage, STP, and SLA', traceJ:'J5', traceSC:'SC1'},
      {id:'FR30', area:'Reporting & Compliance', text:'The system can enforce data retention and erasure schedules', traceJ:'J5', traceSC:'SC6'}
    ],
    nonfunctional:[
      {id:'NFR1', cat:'Performance', text:'The system shall acknowledge a submitted FNOL within 3 seconds for the 95th percentile as measured by application monitoring'},
      {id:'NFR2', cat:'Availability', text:'The system shall maintain 99.9% uptime during business hours as measured by the cloud provider SLA'},
      {id:'NFR3', cat:'Security', text:'The system shall encrypt PII and payment data at rest using AES-256 and in transit using TLS 1.2 or higher'},
      {id:'NFR4', cat:'Scale', text:'The system shall absorb a 10x catastrophe surge in FNOL volume within 15 minutes as verified by load testing'},
      {id:'NFR5', cat:'Auditability', text:'The system shall record every claim decision in an append-only audit log retained per the retention schedule'},
      {id:'NFR6', cat:'Compliance', text:'The system shall send regulatory acknowledgements within the state-mandated window for 100% of claims'},
      {id:'NFR7', cat:'Residency', text:'The system shall keep claimant data within the contracted region as verified by configuration audit'}
    ],
    policies:[
      {id:'POL1', name:'Coverage in force', statement:'A loss is covered only if the policy was in force on the date of loss.', traceFR:'FR5'},
      {id:'POL2', name:'Deductible first', statement:'The deductible is applied before the payable indemnity is computed.', traceFR:'FR10'},
      {id:'POL3', name:'Reserve timeliness', statement:'An initial reserve must be set within 48 hours of assignment.', traceFR:'FR7'},
      {id:'POL4', name:'Adjuster authority', statement:'An adjuster may approve decisions and payments up to $25,000.', traceFR:'FR11'},
      {id:'POL5', name:'Senior authority', statement:'A senior examiner may approve up to $100,000; above that requires manager and reinsurance.', traceFR:'FR12'},
      {id:'POL6', name:'Fraud referral threshold', statement:'A fraud score above the threshold mandates an SIU referral.', traceFR:'FR18'},
      {id:'POL7', name:'Coverage before payment', statement:'No payment may be issued before coverage is verified.', traceFR:'FR14'},
      {id:'POL8', name:'Dual approval', statement:'Payments above $50,000 require dual approval.', traceFR:'FR11'},
      {id:'POL9', name:'Acknowledgement window', statement:'Every FNOL must be acknowledged within the state-mandated window.', traceFR:'FR24'},
      {id:'POL10', name:'PII safeguards', statement:'All PII is encrypted and access is least-privilege and logged.', traceFR:'FR28'},
      {id:'POL11', name:'Subrogation threshold', statement:'Subrogation is pursued when third-party liability is at or above 50%.', traceFR:'FR15'},
      {id:'POL12', name:'Document retention', statement:'Claim documents are retained per the applicable state retention schedule.', traceFR:'FR30'}
    ]
  },
  governance:[
    {id:'G1', item:'State DOI fair claims practices compliance', type:'Compliance', owner:'Compliance', status:'Required', notes:'Acknowledgement and decision timelines vary by state.'},
    {id:'G2', item:'NAIC market-conduct reporting', type:'Compliance', owner:'Compliance', status:'Required', notes:'Periodic statutory reports.'},
    {id:'G3', item:'PCI-DSS for payment data', type:'Compliance', owner:'Security', status:'Required', notes:'Tokenize; minimize PCI scope via the gateway.'},
    {id:'G4', item:'SOC 2 Type II', type:'Compliance', owner:'Security', status:'Planned', notes:'Needed before broad rollout.'},
    {id:'G5', item:'GLBA privacy and safeguards', type:'Compliance', owner:'Legal', status:'Required', notes:'Protect non-public personal information.'},
    {id:'G6', item:'State fraud bureau reporting', type:'Compliance', owner:'SIU', status:'Required', notes:'Mandatory reporting of confirmed fraud.'},
    {id:'G7', item:'PRD sign-off before architecture', type:'Approval', owner:'Product + VP Claims', status:'Pending', notes:'Gate: no build before requirements are approved.'}
  ],
  risk:[
    {id:'R1', title:'Legacy policy-admin integration is slow or unavailable', cat:'Technical', likelihood:'High', impact:'High', mitigation:'Cache coverage snapshots; verify asynchronously; circuit-breaker the integration.', owner:'Architecture'},
    {id:'R2', title:'Adjusters resist a new workspace', cat:'Market', likelihood:'Medium', impact:'High', mitigation:'Co-design with adjusters; keep the decision and rule in one place; phased rollout.', owner:'Product'},
    {id:'R3', title:'Fraud model accuracy too low to trust', cat:'Resource', likelihood:'Medium', impact:'High', mitigation:'Human-in-the-loop SIU; measure precision/recall; correctable scores.', owner:'Data / ML'},
    {id:'R4', title:'Payment data widens PCI scope', cat:'Technical', likelihood:'Medium', impact:'High', mitigation:'Tokenize via certified gateway; never store PANs; segment the payment path.', owner:'Security'},
    {id:'R5', title:'Catastrophe surge overwhelms the system', cat:'Technical', likelihood:'Medium', impact:'High', mitigation:'Elastic workers; queue buffering; surge runbook and load tests.', owner:'Architecture'},
    {id:'R6', title:'Regulatory rules vary widely by state', cat:'Market', likelihood:'High', impact:'Medium', mitigation:'Externalize state rules as configuration; per-state timers.', owner:'Compliance'}
  ],
  release:{
    strategy:'Phased rollout: pilot auto claims in one state, then expand states, then add property and recovery. Straight-through processing is feature-flagged and enabled per line and state once precision and leakage targets hold.',
    milestones:[
      {id:'M1', name:'Auto claims pilot (one state)', date:'2026-09', status:'Planned', notes:'FNOL to adjudication to payment for low and mid severity auto.'},
      {id:'M2', name:'Multi-state auto + SIU', date:'2026-12', status:'Planned', notes:'Fraud scoring and SIU live; per-state regulatory timers.'},
      {id:'M3', name:'Property + recovery GA', date:'2027-03', status:'Planned', notes:'Property claims, subrogation and salvage, manager analytics.'}
    ]
  },
  glossary:[
    {id:'GL1', term:'FNOL', definition:'First Notice of Loss — the initial report of a claim.'},
    {id:'GL2', term:'Adjuster', definition:'The person who investigates, values, and settles a claim.'},
    {id:'GL3', term:'Reserve', definition:'The estimated amount set aside to pay a claim.'},
    {id:'GL4', term:'Indemnity', definition:'The payment that restores the insured after a covered loss.'},
    {id:'GL5', term:'Deductible', definition:'The amount the insured bears before coverage pays.'},
    {id:'GL6', term:'Subrogation', definition:'Recovering paid losses from a liable third party.'},
    {id:'GL7', term:'Salvage', definition:'Value recovered from damaged property the insurer takes title to.'},
    {id:'GL8', term:'SIU', definition:'Special Investigations Unit — investigates suspected fraud.'},
    {id:'GL9', term:'Peril', definition:'The cause of a loss (collision, fire, theft).'},
    {id:'GL10', term:'Coverage', definition:'The protection a policy provides for specified perils.'},
    {id:'GL11', term:'Limit', definition:'The maximum a policy will pay for a covered loss.'},
    {id:'GL12', term:'LAE', definition:'Loss Adjustment Expense — the cost of handling a claim.'},
    {id:'GL13', term:'Leakage', definition:'Money lost to overpayment or inconsistent claim handling.'},
    {id:'GL14', term:'Straight-through processing', definition:'Automated end-to-end handling without manual touch.'},
    {id:'GL15', term:'Adjudication', definition:'Deciding coverage and the payable amount of a claim.'},
    {id:'GL16', term:'Catastrophe (CAT)', definition:'A large event causing many claims at once.'}
  ]
};
window.__ARCH__ = {
  resources:[
    {id:'R-PG1', cat:'Databases', name:'claritas-postgres', engine:'PostgreSQL 16', desc:'Primary relational store; one schema per subdomain (fnol, coverage, claim, payment, fraud).', config:[{k:'Engine',v:'PostgreSQL 16'},{k:'HA',v:'Multi-AZ + 1 replica'},{k:'Backups',v:'PITR 35 days'},{k:'Schemas',v:'fnol, coverage, claim, payment, fraud'},{k:'Encryption',v:'KMS at rest; TLS in transit'}]},
    {id:'R-MG1', cat:'Databases', name:'claritas-documents', engine:'MongoDB', desc:'Document and evidence store (photos metadata, extractions).', config:[{k:'Engine',v:'MongoDB 7'},{k:'Collections',v:'document, extraction'},{k:'Encryption',v:'At rest + field-level for PII'}]},
    {id:'R-OS1', cat:'Object storage', name:'claritas-evidence', engine:'S3 bucket', desc:'Binary evidence — photos, PDFs, estimates.', config:[{k:'Bucket',v:'claritas-evidence-<env>'},{k:'Versioning',v:'Enabled'},{k:'Encryption',v:'SSE-KMS'},{k:'Lifecycle',v:'Per retention schedule (POL12)'}]},
    {id:'R-CA1', cat:'Cache', name:'claritas-redis', engine:'Redis 7', desc:'Coverage snapshots and queue/assignment counters.', config:[{k:'Node',v:'cache.r6g.large'},{k:'Use',v:'Coverage cache; rate limits'},{k:'TLS',v:'Required'}]},
    {id:'R-WF1', cat:'Workflow', name:'claritas-temporal', engine:'Temporal', desc:'Durable claim-lifecycle workflow (FNOL to settlement).', config:[{k:'Deployment',v:'Temporal Cloud'},{k:'Workers',v:'Distributed per task queue'},{k:'Retention',v:'30-day history'}]},
    {id:'R-MQ1', cat:'Messaging', name:'claim.fnol.received', engine:'Kafka topic', desc:'Emitted when a claim is created at FNOL.', config:[{k:'Partitions',v:'12'},{k:'Replication',v:'3'},{k:'Key',v:'claimId'},{k:'Producers',v:'Receive FNOL'},{k:'Consumers',v:'Triage & Assign'}]},
    {id:'R-MQ2', cat:'Messaging', name:'claim.assigned', engine:'Kafka topic', desc:'Emitted when a claim is assigned or routed.', config:[{k:'Partitions',v:'6'},{k:'Replication',v:'3'},{k:'Producers',v:'Triage & Assign'},{k:'Consumers',v:'Verify Coverage'}]},
    {id:'R-MQ3', cat:'Messaging', name:'claim.adjudicated', engine:'Kafka topic', desc:'Emitted when an adjudication decision is recorded.', config:[{k:'Partitions',v:'6'},{k:'Replication',v:'3'},{k:'Producers',v:'Adjudicate Claim'},{k:'Consumers',v:'Issue Payment, Reporting'}]},
    {id:'R-MQ4', cat:'Messaging', name:'payment.requested', engine:'Kafka topic', desc:'Emitted when a payment is requested.', config:[{k:'Partitions',v:'6'},{k:'Replication',v:'3'},{k:'Producers',v:'Issue Payment'},{k:'Consumers',v:'Payments integration'}]},
    {id:'R-MQ5', cat:'Messaging', name:'fraud.flagged', engine:'Kafka topic', desc:'Emitted when a claim is flagged for SIU.', config:[{k:'Partitions',v:'6'},{k:'Replication',v:'3'},{k:'Producers',v:'Score Fraud'},{k:'Consumers',v:'Manage SIU Case'}]},
    {id:'R-MQ6', cat:'Messaging', name:'notifications.send', engine:'SQS (standard)', desc:'Outbound claimant/vendor notifications.', config:[{k:'Type',v:'Standard'},{k:'DLQ',v:'notifications.send.dlq'},{k:'Producers',v:'multiple'}]},
    {id:'R-CF1', cat:'Configuration', name:'state-rules', engine:'SSM Parameter Store', desc:'Per-state regulatory timers and thresholds (POL9, R6).', config:[{k:'Path',v:'/claritas/<env>/state-rules/'},{k:'Examples',v:'ack_window_hours, fraud_threshold'}]},
    {id:'R-SE1', cat:'Secrets', name:'claritas-secrets', engine:'Secrets Manager', desc:'Credentials for policy admin, payments, bureau, OCR.', config:[{k:'Rotation',v:'90 days'},{k:'Encryption',v:'KMS CMK'}]},
    {id:'R-CD1', cat:'CDN', name:'claritas-cdn', engine:'CloudFront', desc:'Edge delivery for the claimant portal assets.', config:[{k:'TLS',v:'ACM, TLS 1.2+'},{k:'WAF',v:'Managed rules'}]}
  ],
  context:{
    summary:'Claritas Claims is a multi-tenant claims platform. A durable workflow drives each claim from FNOL to settlement; subdomains own their data; cross-subdomain coordination is via events. Fraud scoring and coverage verification happen up front.',
    drivers:['Long-running, multi-step claim lifecycle that must survive failures and resume (NFR5).','Catastrophe surges demand elastic scale (NFR4).','Heavy compliance and audit requirements (G1, NFR5, NFR6).','Sensitive PII and payment data (NFR3, G3).'],
    constraints:['Must integrate a slow legacy policy-admin system (R1).','PCI scope must stay minimal (G3).','Per-state regulatory variation (R6).'],
    assumptions:['Policy data is authoritative in the policy-admin system.','Payments run through a certified gateway.','One region per tenant for residency (NFR7).'],
    diagram:'flowchart LR\n  CLM[Claimant] --> PORT[Claimant portal]\n  PORT --> API[Claims API]\n  CTI[Phone/CTI] --> API\n  API --> WF[Claim workflow]\n  WF --> PG[(Postgres)]\n  WF --> KAFKA[[Kafka]]\n  WF --> FRAUD[Fraud scoring]\n  WF --> PAY[Payments gateway]\n  API --> DOCS[Document intelligence]'
  },
  decisions:[
    {id:'ADR-01', cat:'Architecture style', title:'Modular monolith core with a durable workflow (Temporal) for the claim lifecycle', status:'Accepted', rationale:'The claim lifecycle is long-running, multi-step, and failure-prone; durable execution gives reliability and visibility without premature microservices. See the Knowledge Base.', alternatives:'Microservices (premature for the team size); hand-rolled cron + queues (brittle for multi-week claims).', consequences:'Clear module seams per subdomain; one orchestration carve-out; revisit splitting under scale.', affects:['NFR4','NFR5','FR11','FR12']},
    {id:'ADR-02', cat:'Data', title:'PostgreSQL per-subdomain schemas; MongoDB for documents', status:'Accepted', rationale:'Relational integrity for claims/payments; a document store fits variable evidence and extractions.', alternatives:'Single shared schema (couples subdomains); all-document (weak for financial integrity).', consequences:'Each subdomain owns its schema; documents in Mongo + binaries in S3.', affects:['FR21','FR22','NFR5']},
    {id:'ADR-03', cat:'Integration', title:'Event-driven cross-subdomain coordination via Kafka', status:'Accepted', rationale:'Decouples subdomains; supports surge buffering and audit replay.', alternatives:'Synchronous calls (tight coupling, fragile under surge).', consequences:'Topics per domain event; idempotent consumers; ordering by claimId.', affects:['NFR4','FR3','FR17']},
    {id:'ADR-04', cat:'Security', title:'Tokenized payments via a certified gateway; minimal PCI scope', status:'Accepted', rationale:'Keep card/bank data out of the platform to limit PCI scope and risk (R4, G3).', alternatives:'Store payment instruments in-platform (large PCI scope).', consequences:'Payment path segmented; tokens only; gateway holds sensitive data.', affects:['FR14','NFR3','G3']},
    {id:'ADR-05', cat:'Fraud', title:'Fraud scoring as a service called at FNOL and adjudication', status:'Accepted', rationale:'Centralize the model; score early to route and late to catch development.', alternatives:'Rules-only (misses patterns); inline model (couples lifecycle to ML).', consequences:'Score is correctable; SIU is human-in-the-loop (R3).', affects:['FR17','FR18','SC4']},
    {id:'ADR-06', cat:'Security', title:'Immutable audit log and least-privilege RBAC', status:'Accepted', rationale:'Every decision must be reconstructable for regulators (G1, NFR5).', alternatives:'Mutable history (fails audit).', consequences:'Append-only audit store; access logged (POL10).', affects:['FR28','NFR5','G1']},
    {id:'ADR-07', cat:'Infrastructure', title:'Managed Kubernetes (EKS) on AWS with elastic workers', status:'Accepted', rationale:'Independent scaling of web and worker tiers to absorb CAT surges (NFR4).', alternatives:'Fixed VMs (cannot surge); serverless-only (awkward for long workflows).', consequences:'Per-environment clusters; autoscaling node groups.', affects:['NFR2','NFR4']},
    {id:'ADR-08', cat:'Integration', title:'Resilient legacy policy-admin integration with cached snapshots', status:'Accepted', rationale:'The legacy system is slow and sometimes down (R1); claims must not stall.', alternatives:'Hard synchronous dependency (stalls FNOL during outages).', consequences:'Coverage snapshots cached; async confirmation; circuit breaker.', affects:['FR5','NFR2','NFR1']}
  ],
  stack:[
    {layer:'Claimant portal', tech:'React + TypeScript', version:'React 18', why:'Guided FNOL and status UI.'},
    {layer:'Styling', tech:'Tailwind CSS', version:'3.x', why:'Consistent tokens, fast build.'},
    {layer:'Backend', tech:'Node.js + Fastify', version:'Node 20 LTS', why:'Async I/O for intake and workers.'},
    {layer:'Workflow', tech:'Temporal', version:'Cloud', why:'Durable claim lifecycle (ADR-01).'},
    {layer:'Database', tech:'PostgreSQL', version:'PG 16', why:'Relational core (ADR-02).'},
    {layer:'Documents', tech:'MongoDB', version:'7', why:'Evidence and extractions (ADR-02).'},
    {layer:'Messaging', tech:'Kafka (MSK)', version:'3.x', why:'Cross-subdomain events (ADR-03).'},
    {layer:'Cache', tech:'Redis', version:'7', why:'Coverage snapshots, counters.'},
    {layer:'Infra', tech:'AWS EKS + IaC', version:'—', why:'Elastic platform (ADR-07).'},
    {layer:'Documents AI', tech:'Managed OCR/IDP', version:'—', why:'Extraction from evidence (ADR-02).'}
  ],
  subdomainMaps:[
    {title:'Claim lifecycle across subdomains', mermaid:'flowchart LR\n  FN[FNOL & Intake] -- claim.fnol.received --> AD[Adjudication]\n  CV[Coverage & Policy] --> AD\n  FR[Fraud & SIU] --> AD\n  AD -- claim.adjudicated --> PM[Payments & Settlement]\n  DOC[Documents & Evidence] --> AD'},
    {title:'External dependencies', mermaid:'flowchart LR\n  CV[Coverage & Policy] -- policy API --> POL[(Policy Admin)]\n  PM[Payments] -- gateway --> PAY[(Payments)]\n  FR[Fraud & SIU] -- bureau --> ISO[(ClaimSearch)]\n  DOC[Documents] -- OCR --> IDP[(IDP)]'}
  ],
  domains:[
    {id:'DOM1', name:'FNOL & Intake', color:'#4f6cff', summary:'Captures first notice of loss from every channel and starts the claim.',
      aggregate:{name:'FNOL store', store:'Postgres schema · fnol', description:'Owned by FNOL & Intake. Its components read/write here directly; others use events or the Claims API.', tables:[
        {name:'claim_fnol', purpose:'The first notice and loss details.', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'policy_ref',type:'text',desc:'Matched policy.'},{name:'date_of_loss',type:'date',desc:'When the loss occurred.'},{name:'channel',type:'enum',desc:'portal|mobile|phone.'},{name:'status',type:'enum',desc:'New, Triaged, Assigned.'},{name:'created_at',type:'timestamp',desc:'Capture time.'}]},
        {name:'fnol_attachment', purpose:'Links to uploaded evidence.', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'claim_id',type:'uuid',desc:'FNOL reference.'},{name:'doc_ref',type:'text',desc:'Document store id.'}]}]},
      maps:[{title:'Capture flow', mermaid:'flowchart LR\n  P[Portal/CTI] --> R[Receive FNOL]\n  R --> DB[(claim_fnol)]\n  R -- claim.fnol.received --> K[[Kafka]]\n  R --> T[Triage & Assign]'}],
      components:[
        {id:'C1', name:'Receive FNOL', overview:'Validates the policy, captures the loss, creates the claim, and emits the FNOL event.', mapsTo:['FR1','FR2','FR5'],
          trigger:[{type:'User', actor:'Claimant or FNOL agent (P1/P2)', action:'Submits a loss report', desc:'Portal, mobile, or phone intake.'},{type:'API', caller:'Mobile app', endpoint:'POST /v1/fnol', desc:'Programmatic submission.'}],
          businessRules:[{rule:'A loss is covered only if the policy was in force at the date of loss.', ref:'POL1'},{rule:'Every FNOL is acknowledged within the state-mandated window.', ref:'POL9'}],
          command:[{command:'SubmitFNOL { policyRef, dateOfLoss, channel, details }', ref:'FR1'},{command:'AttachEvidence { claimId, docRef }', ref:'FR2'}],
          readModel:[{type:'API', api:'Policy Admin API', link:'', request:'GET /policies/{ref}?asOf=dateOfLoss', response:'{ inForce, coverages, limits, deductibles }', desc:'Verify coverage in force at the date of loss.'}],
          writeModel:[{type:'Subdomain', table:'claim_fnol', desc:'Insert the first notice with status New.'},{type:'Subdomain', table:'fnol_attachment', desc:'Record uploaded evidence links.'},{type:'Product', queue:'claim.fnol.received', payload:'{\n  "claimId": "uuid",\n  "policyRef": "text",\n  "dateOfLoss": "date",\n  "channel": "portal|mobile|phone"\n}', desc:'Publish for triage.'}],
          resource:['R-PG1','R-OS1','R-MQ1'],
          dependency:[{type:'resource', ref:'R-PG1', note:'Writes FNOL'},{type:'resource', ref:'R-MQ1', note:'Publishes claim.fnol.received'},{type:'component', ref:'C2', note:'Consumer of the FNOL event'},{type:'integration', ref:'INT1', note:'Verifies coverage'}],
          hotspot:[{level:'Reliability', text:'Policy system may be down — fall back to a cached snapshot and confirm asynchronously (R1).'},{level:'Reliability', text:'Deduplicate repeated submissions within a short window.'}],
          code:{path:'apps/api/src/fnol/', repo:'https://github.com/your-org/claritas/tree/main/apps/api/src/fnol', pipeline:'https://ci.your-org.dev/claritas/pipelines/fnol', tests:'https://ci.your-org.dev/claritas/fnol/acceptance', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=fnol'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=fnol'}], owners:'FNOL squad · #team-fnol'}},
        {id:'C2', name:'Triage & Assign', overview:'Segments the claim, gets a fraud score, and routes it to STP, an adjuster, or SIU.', mapsTo:['FR3','FR4','FR17'],
          trigger:[{type:'Event', source:'Internal queue', name:'claim.fnol.received', schema:'{\n  "claimId": "uuid",\n  "policyRef": "text",\n  "dateOfLoss": "date"\n}', why:'A new claim is ready to be triaged and routed.'}],
          businessRules:[{rule:'A fraud score above the threshold mandates an SIU referral.', ref:'POL6'},{rule:'Assign by skill and current load.', ref:'FR4'}],
          command:[{command:'TriageClaim { claimId }', ref:'FR3'},{command:'AssignClaim { claimId, adjusterId }', ref:'FR4'}],
          readModel:[{type:'Database', table:'claim_fnol', desc:'Loss details to segment (own store).'},{type:'API', api:'Fraud scoring', link:'', request:'POST /score { claimId }', response:'{ score, reasons[] }', desc:'Fraud score for routing.'}],
          writeModel:[{type:'Subdomain', table:'claim_fnol', desc:'Update status to Triaged/Assigned.'},{type:'Product', queue:'claim.assigned', payload:'{\n  "claimId": "uuid",\n  "adjusterId": "uuid|null",\n  "path": "stp|adjuster|siu"\n}', desc:'Publish the routing decision.'},{type:'Product', queue:'fraud.flagged', payload:'{\n  "claimId": "uuid",\n  "score": 0\n}', desc:'Publish when routed to SIU.'}],
          resource:['R-PG1','R-MQ1','R-MQ2','R-MQ5'],
          dependency:[{type:'component', ref:'C1', note:'Producer of the FNOL event'},{type:'component', ref:'C9', note:'Provides the fraud score'},{type:'resource', ref:'R-MQ2', note:'Publishes claim.assigned'}],
          hotspot:[{level:'Question', text:'Open: STP eligibility rules per line and state — where do they live (config vs code)?'}],
          code:{path:'apps/api/src/triage/', repo:'https://github.com/your-org/claritas/tree/main/apps/api/src/triage', pipeline:'https://ci.your-org.dev/claritas/pipelines/triage', tests:'https://ci.your-org.dev/claritas/triage/acceptance', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=triage'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=triage'}], owners:'FNOL squad · #team-fnol'}}
      ]},
    {id:'DOM2', name:'Coverage & Policy', color:'#8b5cff', summary:'Verifies coverage against the policy system and sets reserves.',
      aggregate:{name:'Coverage store', store:'Postgres schema · coverage', description:'Owned by Coverage & Policy.', tables:[
        {name:'coverage_decision', purpose:'The recorded coverage determination.', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'claim_id',type:'uuid',desc:'Claim reference.'},{name:'applies',type:'boolean',desc:'Whether coverage applies.'},{name:'limit',type:'numeric',desc:'Applicable limit.'},{name:'deductible',type:'numeric',desc:'Applicable deductible.'}]},
        {name:'reserve', purpose:'Reserve amounts over time.', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'claim_id',type:'uuid',desc:'Claim reference.'},{name:'amount',type:'numeric',desc:'Reserve amount.'},{name:'set_at',type:'timestamp',desc:'When set.'}]}]},
      maps:[{title:'Coverage flow', mermaid:'flowchart LR\n  A([claim.assigned]) --> V[Verify Coverage]\n  V --> CD[(coverage_decision)]\n  V --> RS[Set Reserve]\n  RS --> R[(reserve)]'}],
      components:[
        {id:'C3', name:'Verify Coverage', overview:'Retrieves and records the coverage decision for the loss.', mapsTo:['FR5','FR6'],
          trigger:[{type:'Event', source:'Internal queue', name:'claim.assigned', schema:'{ "claimId": "uuid" }', why:'A claim needs coverage confirmed before adjudication.'}],
          businessRules:[{rule:'A loss is covered only if the policy was in force at the date of loss.', ref:'POL1'}],
          command:[{command:'VerifyCoverage { claimId }', ref:'FR5'},{command:'RecordCoverageDecision { claimId, applies, limit, deductible }', ref:'FR6'}],
          readModel:[{type:'API', api:'Policy Admin API', link:'', request:'GET /policies/{ref}', response:'{ coverages, limits, deductibles }', desc:'Authoritative coverage data.'},{type:'Database', table:'coverage_decision', desc:'Prior decisions (own store).'}],
          writeModel:[{type:'Subdomain', table:'coverage_decision', desc:'Record the coverage determination.'}],
          resource:['R-PG1','R-CA1'],
          dependency:[{type:'integration', ref:'INT1', note:'Policy data'},{type:'component', ref:'C4', note:'Hands off to reserve setting'},{type:'resource', ref:'R-CA1', note:'Coverage snapshot cache'}],
          hotspot:[{level:'Reliability', text:'Use cached snapshot when the policy system is unavailable; flag for confirmation (R1).'}],
          code:{path:'apps/api/src/coverage/', repo:'https://github.com/your-org/claritas/tree/main/apps/api/src/coverage', pipeline:'https://ci.your-org.dev/claritas/pipelines/coverage', tests:'https://ci.your-org.dev/claritas/coverage/acceptance', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=coverage'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=coverage'}], owners:'Coverage squad · #team-coverage'}},
        {id:'C4', name:'Set Reserve', overview:'Sets and adjusts the reserve within authority.', mapsTo:['FR7'],
          trigger:[{type:'Event', source:'Internal queue', name:'coverage.decided', schema:'{ "claimId": "uuid" }', why:'Coverage is confirmed, so a reserve can be set.'}],
          businessRules:[{rule:'An initial reserve must be set within 48 hours of assignment.', ref:'POL3'},{rule:'A reserve above authority routes for approval.', ref:'POL4'}],
          command:[{command:'SetReserve { claimId, amount }', ref:'FR7'}],
          readModel:[{type:'Database', table:'coverage_decision', desc:'Coverage and limits (own store).'}],
          writeModel:[{type:'Subdomain', table:'reserve', desc:'Insert/adjust the reserve.'}],
          resource:['R-PG1'],
          dependency:[{type:'component', ref:'C3', note:'Provides coverage'},{type:'component', ref:'C6', note:'Approves reserves above authority'}],
          hotspot:[{level:'Consistency', text:'Reserve changes must post to finance (GL) — keep in sync (D5).'}],
          code:{path:'apps/api/src/reserve/', repo:'https://github.com/your-org/claritas/tree/main/apps/api/src/reserve', pipeline:'https://ci.your-org.dev/claritas/pipelines/reserve', tests:'https://ci.your-org.dev/claritas/reserve/acceptance', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=reserve'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=reserve'}], owners:'Coverage squad · #team-coverage'}}
      ]},
    {id:'DOM3', name:'Adjudication', color:'#1ba97a', summary:'Decides the payable amount within authority and records the decision.',
      aggregate:{name:'Claim store', store:'Postgres schema · claim', description:'Owned by Adjudication; the system of record for the claim decision.', tables:[
        {name:'claim', purpose:'The claim record and current status.', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'status',type:'enum',desc:'Lifecycle status.'},{name:'payable',type:'numeric',desc:'Computed payable amount.'}]},
        {name:'decision', purpose:'Each adjudication decision (audit).', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'claim_id',type:'uuid',desc:'Claim reference.'},{name:'rule_ref',type:'text',desc:'Rule applied.'},{name:'actor',type:'text',desc:'Who decided.'},{name:'at',type:'timestamp',desc:'When.'}]},
        {name:'estimate', purpose:'Repair estimates attached to the claim.', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'claim_id',type:'uuid',desc:'Claim reference.'},{name:'amount',type:'numeric',desc:'Estimate amount.'}]}]},
      maps:[{title:'Adjudication flow', mermaid:'flowchart LR\n  A([Coverage confirmed]) --> J[Adjudicate Claim]\n  J --> D[(decision)]\n  J --> AP{Within authority?}\n  AP -- No --> AUTH[Approve within Authority]\n  AP -- Yes --> PAY([Request payment])'}],
      components:[
        {id:'C5', name:'Adjudicate Claim', overview:'Computes indemnity from estimate and coverage and records the decision.', mapsTo:['FR8','FR9','FR10'],
          trigger:[{type:'User', actor:'Adjuster (P3)', action:'Completes investigation and decides', desc:'In the claim workspace.'}],
          businessRules:[{rule:'The deductible is applied before the payable indemnity.', ref:'POL2'},{rule:'The payable amount cannot exceed the coverage limit.', ref:'POL2'}],
          command:[{command:'RecordEstimate { claimId, amount }', ref:'FR8'},{command:'CalculateIndemnity { claimId }', ref:'FR9'}],
          readModel:[{type:'Database', table:'estimate', desc:'Estimates (own store).'},{type:'API', api:'Coverage API', link:'API3', request:'GET /claims/{id}/coverage', response:'{ limit, deductible }', desc:'Coverage to apply.'}],
          writeModel:[{type:'Subdomain', table:'claim', desc:'Set the payable amount.'},{type:'Subdomain', table:'decision', desc:'Append the decision with the rule applied.'},{type:'Product', queue:'claim.adjudicated', payload:'{\n  "claimId": "uuid",\n  "payable": 0\n}', desc:'Publish the adjudication.'}],
          resource:['R-PG1','R-MQ3'],
          dependency:[{type:'component', ref:'C3', note:'Coverage decision'},{type:'component', ref:'C6', note:'Approval when over authority'},{type:'component', ref:'C7', note:'Triggers payment'}],
          hotspot:[{level:'Risk', text:'Indemnity rules drive leakage (SC3) — keep them rule-driven and tested.'}],
          code:{path:'apps/api/src/adjudication/', repo:'https://github.com/your-org/claritas/tree/main/apps/api/src/adjudication', pipeline:'https://ci.your-org.dev/claritas/pipelines/adjudication', tests:'https://ci.your-org.dev/claritas/adjudication/acceptance', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=adj'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=adj'}], owners:'Adjudication squad · #team-adj'}},
        {id:'C6', name:'Approve within Authority', overview:'Enforces authority limits and routes approvals.', mapsTo:['FR11','FR12'],
          trigger:[{type:'Event', source:'Internal queue', name:'approval.requested', schema:'{ "claimId": "uuid", "amount": 0 }', why:'A decision exceeds the requestor authority.'}],
          businessRules:[{rule:'An adjuster may approve up to $25,000.', ref:'POL4'},{rule:'A senior may approve up to $100,000; above requires manager + reinsurance.', ref:'POL5'},{rule:'Payments above $50,000 require dual approval.', ref:'POL8'}],
          command:[{command:'RouteApproval { claimId, amount }', ref:'FR12'},{command:'RecordApproval { claimId, approverId }', ref:'FR11'}],
          readModel:[{type:'Database', table:'decision', desc:'Decision context (own store).'}],
          writeModel:[{type:'Subdomain', table:'decision', desc:'Append the approval record.'}],
          resource:['R-PG1'],
          dependency:[{type:'component', ref:'C5', note:'Source of decisions to approve'}],
          hotspot:[{level:'Security', text:'Authority limits are control points — every override must be logged (ADR-06).'}],
          code:{path:'apps/api/src/approvals/', repo:'https://github.com/your-org/claritas/tree/main/apps/api/src/approvals', pipeline:'https://ci.your-org.dev/claritas/pipelines/approvals', tests:'https://ci.your-org.dev/claritas/approvals/acceptance', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=approvals'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=approvals'}], owners:'Adjudication squad · #team-adj'}}
      ]},
    {id:'DOM4', name:'Payments & Settlement', color:'#d68a16', summary:'Issues payments and pursues recoveries.',
      aggregate:{name:'Payment store', store:'Postgres schema · payment', description:'Owned by Payments & Settlement.', tables:[
        {name:'payment', purpose:'Payment requests and statuses.', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'claim_id',type:'uuid',desc:'Claim reference.'},{name:'amount',type:'numeric',desc:'Amount.'},{name:'status',type:'enum',desc:'Requested, Issued, Held, Failed.'}]},
        {name:'recovery', purpose:'Subrogation and salvage recoveries.', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'claim_id',type:'uuid',desc:'Claim reference.'},{name:'amount',type:'numeric',desc:'Recovered amount.'},{name:'kind',type:'enum',desc:'subrogation|salvage.'}]}]},
      maps:[{title:'Payment flow', mermaid:'flowchart LR\n  A([claim.adjudicated]) --> P[Issue Payment]\n  P --> H{Fraud hold?}\n  H -- Yes --> X([Blocked])\n  H -- No --> G[Gateway]\n  G --> DB[(payment)]'}],
      components:[
        {id:'C7', name:'Issue Payment', overview:'Requests and issues payment through the gateway, respecting holds.', mapsTo:['FR13','FR14'],
          trigger:[{type:'Event', source:'Internal queue', name:'claim.adjudicated', schema:'{ "claimId": "uuid", "payable": 0 }', why:'An approved claim is ready to pay.'}],
          businessRules:[{rule:'No payment before coverage is verified.', ref:'POL7'},{rule:'Payments above $50,000 require dual approval.', ref:'POL8'}],
          command:[{command:'RequestPayment { claimId, amount, payee }', ref:'FR13'},{command:'IssuePayment { paymentId }', ref:'FR14'}],
          readModel:[{type:'Database', table:'payment', desc:'Payment state (own store).'}],
          writeModel:[{type:'Subdomain', table:'payment', desc:'Create and update the payment.'},{type:'External', queue:'payment.requested', payload:'{\n  "paymentId": "uuid",\n  "claimId": "uuid",\n  "amount": 0,\n  "payeeToken": "token"\n}', desc:'Send to the payments gateway (tokenized).'}],
          resource:['R-PG1','R-MQ4'],
          dependency:[{type:'component', ref:'C5', note:'Source of the payable amount'},{type:'integration', ref:'INT2', note:'Payments gateway'},{type:'component', ref:'C10', note:'May place a payment hold'}],
          hotspot:[{level:'Security', text:'Keep PCI scope minimal — tokens only, never card/bank data (R4, G3).'},{level:'Reliability', text:'Idempotent issuance; never double-pay on retry.'}],
          code:{path:'apps/api/src/payments/', repo:'https://github.com/your-org/claritas/tree/main/apps/api/src/payments', pipeline:'https://ci.your-org.dev/claritas/pipelines/payments', tests:'https://ci.your-org.dev/claritas/payments/acceptance', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=pay'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=pay'}], owners:'Payments squad · #team-pay'}},
        {id:'C8', name:'Recover Subrogation', overview:'Opens subrogation cases and posts recoveries.', mapsTo:['FR15','FR16'],
          trigger:[{type:'User', actor:'Senior examiner (P4)', action:'Reviews a settled claim for recovery', desc:'When third-party liability exists.'}],
          businessRules:[{rule:'Subrogation is pursued when third-party liability is at or above 50%.', ref:'POL11'}],
          command:[{command:'OpenSubrogation { claimId }', ref:'FR15'},{command:'PostRecovery { claimId, amount, kind }', ref:'FR16'}],
          readModel:[{type:'Database', table:'recovery', desc:'Recovery records (own store).'}],
          writeModel:[{type:'Subdomain', table:'recovery', desc:'Record recoveries.'}],
          resource:['R-PG1'],
          dependency:[{type:'integration', ref:'INT7', note:'Reinsurance for large losses'},{type:'component', ref:'C7', note:'Settled payment context'}],
          hotspot:[{level:'Consistency', text:'Recoveries must post to the GL (D5).'}],
          code:{path:'apps/api/src/subrogation/', repo:'https://github.com/your-org/claritas/tree/main/apps/api/src/subrogation', pipeline:'https://ci.your-org.dev/claritas/pipelines/subrogation', tests:'https://ci.your-org.dev/claritas/subrogation/acceptance', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=subro'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=subro'}], owners:'Payments squad · #team-pay'}}
      ]},
    {id:'DOM5', name:'Fraud & SIU', color:'#e2495c', summary:'Scores fraud risk and manages investigations.',
      aggregate:{name:'Fraud store', store:'Postgres schema · fraud', description:'Owned by Fraud & SIU.', tables:[
        {name:'fraud_score', purpose:'Scores produced at FNOL and adjudication.', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'claim_id',type:'uuid',desc:'Claim reference.'},{name:'score',type:'numeric',desc:'0-1 risk.'},{name:'reasons',type:'jsonb',desc:'Top reasons.'}]},
        {name:'siu_case', purpose:'Investigation cases and dispositions.', columns:[{name:'id',type:'uuid',desc:'PK.'},{name:'claim_id',type:'uuid',desc:'Claim reference.'},{name:'status',type:'enum',desc:'Open, Confirmed, Cleared, Inconclusive.'},{name:'hold',type:'boolean',desc:'Payment hold flag.'}]}]},
      maps:[{title:'Fraud flow', mermaid:'flowchart LR\n  A([FNOL/Adjudication]) --> S[Score Fraud]\n  S --> F{Above threshold?}\n  F -- Yes --> C[Manage SIU Case]\n  C --> D{Disposition}\n  D -- Confirmed --> DENY([Deny + report])\n  D -- Cleared --> REL([Release hold])'}],
      components:[
        {id:'C9', name:'Score Fraud', overview:'Scores a claim using model features and cross-carrier history.', mapsTo:['FR17','FR18'],
          trigger:[{type:'Event', source:'Internal queue', name:'claim.fnol.received', schema:'{ "claimId": "uuid" }', why:'Score early to route the claim.'},{type:'Event', source:'Internal queue', name:'claim.adjudicated', schema:'{ "claimId": "uuid" }', why:'Re-score as the claim develops.'}],
          businessRules:[{rule:'A score above the threshold mandates an SIU referral.', ref:'POL6'}],
          command:[{command:'ScoreFraud { claimId }', ref:'FR17'},{command:'ReferToSIU { claimId, score }', ref:'FR18'}],
          readModel:[{type:'API', api:'ISO ClaimSearch', link:'', request:'POST /search { party, vin }', response:'{ priorClaims[], watchlistHits[] }', desc:'Cross-carrier history.'},{type:'Database', table:'fraud_score', desc:'Prior scores (own store).'}],
          writeModel:[{type:'Subdomain', table:'fraud_score', desc:'Persist the score and reasons.'},{type:'Product', queue:'fraud.flagged', payload:'{\n  "claimId": "uuid",\n  "score": 0,\n  "reasons": []\n}', desc:'Publish a referral when above threshold.'}],
          resource:['R-PG1','R-MQ5'],
          dependency:[{type:'integration', ref:'INT3', note:'Fraud bureau'},{type:'component', ref:'C10', note:'Consumes referrals'}],
          hotspot:[{level:'Risk', text:'Model precision must clear 70% to be trusted (SC4); keep human-in-the-loop (R3).'}],
          code:{path:'services/fraud/', repo:'https://github.com/your-org/claritas/tree/main/services/fraud', pipeline:'https://ci.your-org.dev/claritas/pipelines/fraud', tests:'https://ci.your-org.dev/claritas/fraud/acceptance', coverage:'https://ci.your-org.dev/claritas/fraud/coverage', dashboard:'https://apm.your-org.dev/claritas/fraud', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=fraud'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=fraud'}], owners:'Data/ML squad · #team-ml'}},
        {id:'C10', name:'Manage SIU Case', overview:'Runs the investigation, holds payment, and records a disposition.', mapsTo:['FR19','FR20'],
          trigger:[{type:'Event', source:'Internal queue', name:'fraud.flagged', schema:'{ "claimId": "uuid", "score": 0 }', why:'A claim was referred for investigation.'}],
          businessRules:[{rule:'Confirmed fraud is reported to the state bureau.', ref:'POL6'},{rule:'An open hold blocks payment.', ref:'POL7'}],
          command:[{command:'OpenSIUCase { claimId }', ref:'FR19'},{command:'RecordDisposition { caseId, disposition }', ref:'FR20'}],
          readModel:[{type:'Database', table:'siu_case', desc:'Case state (own store).'},{type:'API', api:'ISO ClaimSearch', link:'', request:'GET /history/{party}', response:'{ priorClaims[] }', desc:'Investigation history.'}],
          writeModel:[{type:'Subdomain', table:'siu_case', desc:'Create/update the case and hold flag.'}],
          resource:['R-PG1'],
          dependency:[{type:'component', ref:'C9', note:'Source of referrals'},{type:'component', ref:'C7', note:'Places/releases the payment hold'},{type:'integration', ref:'INT3', note:'Bureau reporting'}],
          hotspot:[{level:'Security', text:'Confirmed fraud requires mandatory bureau reporting (G6).'}],
          code:{path:'services/siu/', repo:'https://github.com/your-org/claritas/tree/main/services/siu', pipeline:'https://ci.your-org.dev/claritas/pipelines/siu', tests:'https://ci.your-org.dev/claritas/siu/acceptance', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=siu'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=siu'}], owners:'SIU squad · #team-siu'}}
      ]},
    {id:'DOM6', name:'Documents & Evidence', color:'#2d9cdb', summary:'Ingests evidence and extracts structured data.',
      aggregate:{name:'Document store', store:'MongoDB · documents (+ S3 binaries)', description:'Owned by Documents & Evidence.', tables:[
        {name:'document', purpose:'Document metadata and S3 pointer.', columns:[{name:'_id',type:'objectId',desc:'PK.'},{name:'claim_id',type:'uuid',desc:'Claim reference.'},{name:'type',type:'string',desc:'photo|estimate|police_report.'},{name:'s3_key',type:'string',desc:'Binary location.'}]},
        {name:'extraction', purpose:'OCR/IDP extracted fields.', columns:[{name:'_id',type:'objectId',desc:'PK.'},{name:'document_id',type:'objectId',desc:'Document reference.'},{name:'fields',type:'object',desc:'Extracted key-values.'}]}]},
      maps:[{title:'Ingest flow', mermaid:'flowchart LR\n  U[Upload] --> I[Ingest & Extract]\n  I --> S3[(S3 binary)]\n  I --> M[(document)]\n  I --> OCR[OCR/IDP]\n  OCR --> E[(extraction)]'}],
      components:[
        {id:'C11', name:'Ingest & Extract Document', overview:'Stores evidence, runs OCR/IDP, and links data to the claim.', mapsTo:['FR21','FR22','FR23'],
          trigger:[{type:'Event', source:'Object store', name:'evidence.uploaded', schema:'{ "claimId": "uuid", "s3Key": "string", "type": "string" }', why:'New evidence was uploaded for a claim.'}],
          businessRules:[{rule:'Documents are retained per the state retention schedule.', ref:'POL12'},{rule:'All PII is encrypted and access logged.', ref:'POL10'}],
          command:[{command:'IngestDocument { claimId, s3Key, type }', ref:'FR21'},{command:'ExtractFields { documentId }', ref:'FR22'}],
          readModel:[{type:'API', api:'OCR/IDP', link:'', request:'POST /extract { s3Key }', response:'{ fields }', desc:'Structured data from the document.'}],
          writeModel:[{type:'Subdomain', table:'document', desc:'Store metadata + S3 pointer.'},{type:'Subdomain', table:'extraction', desc:'Store extracted fields linked to the claim.'}],
          resource:['R-MG1','R-OS1'],
          dependency:[{type:'integration', ref:'INT4', note:'OCR/IDP service'},{type:'resource', ref:'R-OS1', note:'Binary storage'}],
          hotspot:[{level:'Security', text:'Evidence often contains PII — encrypt and restrict access (POL10).'}],
          code:{path:'services/documents/', repo:'https://github.com/your-org/claritas/tree/main/services/documents', pipeline:'https://ci.your-org.dev/claritas/pipelines/documents', tests:'https://ci.your-org.dev/claritas/documents/acceptance', logs:[{env:'Production',url:'https://logs.your-org.dev/claritas?env=prod&svc=docs'},{env:'Staging',url:'https://logs.your-org.dev/claritas?env=staging&svc=docs'}], owners:'Documents squad · #team-docs'}}
      ]}
  ],
  apis:[
    {id:'API1', method:'POST', path:'/v1/fnol', purpose:'Submit a first notice of loss.', errors:'400 invalid · 401 unauth · 409 duplicate', realizes:['FR1','FR2']},
    {id:'API2', method:'GET', path:'/v1/claims/{id}', purpose:'Retrieve a claim and its status.', errors:'401 · 404', realizes:['FR29']},
    {id:'API3', method:'GET', path:'/v1/claims/{id}/coverage', purpose:'Coverage decision, limits, and deductibles.', errors:'401 · 404', realizes:['FR6']},
    {id:'API4', method:'POST', path:'/v1/claims/{id}/payments', purpose:'Request a payment on a claim.', errors:'401 · 403 over-authority · 409 fraud-hold', realizes:['FR13']},
    {id:'API5', method:'POST', path:'/v1/claims/{id}/siu', purpose:'Refer a claim to SIU.', errors:'401 · 404', realizes:['FR18']},
    {id:'API6', method:'GET', path:'/v1/reports/regulatory', purpose:'Regulatory and market-conduct extracts.', errors:'401 · 403', realizes:['FR27']}
  ],
  integrations:[
    {id:'INT1', system:'Policy Admin System', direction:'inbound', protocol:'REST (legacy) + nightly batch', data:'Policy, coverage, limits, deductibles, in-force status', auth:'mTLS service account', dependsOn:'D1', notes:'Cached snapshots; circuit breaker (ADR-08).'},
    {id:'INT2', system:'Payments gateway', direction:'bidirectional', protocol:'REST + webhook', data:'Tokenized payment requests; settlement callbacks', auth:'OAuth + signed webhooks', dependsOn:'D2', notes:'PCI handled by the gateway (ADR-04).'},
    {id:'INT3', system:'ISO ClaimSearch (fraud bureau)', direction:'bidirectional', protocol:'REST', data:'Cross-carrier history, watchlist hits, fraud reports', auth:'API key', dependsOn:'D3', notes:'Rate-limited; mandatory reporting (G6).'},
    {id:'INT4', system:'OCR / IDP service', direction:'outbound', protocol:'REST', data:'Document images in; extracted fields out', auth:'API key', dependsOn:'D4', notes:'Managed document intelligence.'},
    {id:'INT5', system:'Notification service', direction:'outbound', protocol:'Internal API', data:'Email and SMS to claimants and vendors', auth:'Service credential', dependsOn:'D6', notes:'Status and missing-info messages.'},
    {id:'INT6', system:'Identity / SSO', direction:'inbound', protocol:'OIDC / SAML', data:'User identity and roles (RBAC)', auth:'SSO', dependsOn:'', notes:'Adjuster, examiner, SIU, manager roles.'},
    {id:'INT7', system:'Reinsurance', direction:'outbound', protocol:'Batch file + API', data:'Large-loss notifications and recoveries above retention', auth:'SFTP/API key', dependsOn:'D5', notes:'For losses above retention.'}
  ],
  security:[
    {id:'SEC1', control:'Encryption of PII and payment data', approach:'AES-256 at rest (KMS); TLS 1.2+ in transit; field-level encryption for sensitive PII.', addresses:['NFR3','G5']},
    {id:'SEC2', control:'Least-privilege RBAC', approach:'Role-based access (adjuster/examiner/SIU/manager); every access logged.', addresses:['G1','NFR5']},
    {id:'SEC3', control:'Immutable audit log', approach:'Append-only decision log retained per schedule; tamper-evident.', addresses:['NFR5','G1']},
    {id:'SEC4', control:'PCI scope minimization', approach:'Tokenize via the gateway; segment the payment path; never store PANs.', addresses:['G3','NFR3']},
    {id:'SEC5', control:'Data retention and erasure', approach:'Per-state retention schedules; documented erasure on request.', addresses:['NFR7','G5']}
  ],
  infra:{
    cloud:'AWS (cloud)',
    platform:'Kubernetes (EKS)',
    summary:'Claritas runs on managed Kubernetes with a separate account per environment. Web and worker tiers scale independently to absorb catastrophe surges; Temporal drives durable claim workflows.',
    adrs:['ADR-07','ADR-01','ADR-02'],
    meets:['NFR2','NFR4','NFR5'],
    environments:[
      {id:'dev', name:'Development', cluster:'claritas-dev', region:'us-east-1', accountUrl:'https://console.aws.example.com/dev', iacUrl:'https://github.com/your-org/claritas-infra/tree/main/envs/dev',
        services:[{name:'EKS · claritas-dev', url:'https://console.aws.example.com/eks/dev'},{name:'RDS PostgreSQL', url:'https://console.aws.example.com/rds/dev'},{name:'DocumentDB/Mongo', url:'https://console.aws.example.com/docdb/dev'},{name:'MSK · Kafka', url:'https://console.aws.example.com/msk/dev'}],
        dashboards:[{name:'Kubernetes dashboard', url:'https://k8s.dev.claritas.dev'},{name:'Workload logs', url:'https://logs.your-org.dev/claritas?env=dev'},{name:'Temporal UI', url:'https://temporal.dev.claritas.dev'}],
        notes:'Ephemeral preview namespaces; synthetic policy-admin stub.'},
      {id:'staging', name:'Staging', cluster:'claritas-staging', region:'us-east-1', accountUrl:'https://console.aws.example.com/staging', iacUrl:'https://github.com/your-org/claritas-infra/tree/main/envs/staging',
        services:[{name:'EKS · claritas-staging', url:'https://console.aws.example.com/eks/staging'},{name:'RDS PostgreSQL', url:'https://console.aws.example.com/rds/staging'},{name:'MSK · Kafka', url:'https://console.aws.example.com/msk/staging'},{name:'Temporal', url:'https://temporal.staging.claritas.dev'}],
        dashboards:[{name:'Kubernetes dashboard', url:'https://k8s.staging.claritas.dev'},{name:'Workload logs', url:'https://logs.your-org.dev/claritas?env=staging'},{name:'Grafana / APM', url:'https://grafana.your-org.dev/staging'}],
        notes:'Mirrors production at smaller scale; UAT for adjusters.'},
      {id:'prod', name:'Production', cluster:'claritas-prod', region:'us-east-1 (multi-AZ)', accountUrl:'https://console.aws.example.com/prod', iacUrl:'https://github.com/your-org/claritas-infra/tree/main/envs/prod',
        services:[{name:'EKS · claritas-prod', url:'https://console.aws.example.com/eks/prod'},{name:'RDS PostgreSQL (Multi-AZ + replica)', url:'https://console.aws.example.com/rds/prod'},{name:'DocumentDB/Mongo', url:'https://console.aws.example.com/docdb/prod'},{name:'MSK · Kafka', url:'https://console.aws.example.com/msk/prod'},{name:'Temporal Cloud', url:'https://cloud.temporal.io'}],
        dashboards:[{name:'Kubernetes dashboard', url:'https://k8s.prod.claritas.dev'},{name:'Workload logs', url:'https://logs.your-org.dev/claritas?env=prod'},{name:'Grafana / APM', url:'https://grafana.your-org.dev/prod'},{name:'Uptime / SLA', url:'https://status.claritas.dev'}],
        notes:'Multi-AZ, autoscaling node groups, surge runbook, 24/7 on-call.'}
    ]
  },
  design:{
    links:[
      {name:'Figma — claimant FNOL flow', url:'https://figma.com/file/claritas-fnol'},
      {name:'Figma — adjuster workspace', url:'https://figma.com/file/claritas-workspace'},
      {name:'Figma — design system', url:'https://figma.com/file/claritas-design-system'},
      {name:'Clickable prototype', url:'https://figma.com/proto/claritas'},
      {name:'System design board (FigJam)', url:'https://figjam.com/board/claritas-architecture'}
    ]
  },
  structure:{
    tree:'claritas/\n├── apps/\n│   ├── portal/         # claimant React portal\n│   └── api/            # Fastify API + workflow activities\n│       └── src/{fnol,triage,coverage,reserve,adjudication,approvals,payments,subrogation}/\n├── services/\n│   ├── fraud/          # scoring model service\n│   ├── siu/            # investigation service\n│   └── documents/      # ingest + OCR/IDP\n├── workflows/          # Temporal claim lifecycle\n├── packages/\n│   ├── db/             # schemas, migrations, repositories\n│   └── rules/          # coverage/indemnity/authority rules\n└── infra/              # IaC, CI/CD',
    mapping:[
      {area:'FNOL & Intake (FR1-FR4)', path:'apps/api/src/fnol, apps/api/src/triage'},
      {area:'Coverage & Policy (FR5-FR7)', path:'apps/api/src/coverage, apps/api/src/reserve'},
      {area:'Adjudication (FR8-FR12)', path:'apps/api/src/adjudication, packages/rules'},
      {area:'Payments & Settlement (FR13-FR16)', path:'apps/api/src/payments, apps/api/src/subrogation'},
      {area:'Fraud & SIU (FR17-FR20)', path:'services/fraud, services/siu'},
      {area:'Documents (FR21-FR23)', path:'services/documents'}
    ],
    patterns:[
      'Feature-first folders per subdomain; rules live in packages/rules and are unit-tested.',
      'All DB access via repositories; no raw SQL in handlers.',
      'Every table carries claim/tenant scope; access via the tenant-scoped client.',
      'The claim lifecycle is a Temporal workflow; activities are idempotent.'
    ]
  },
  kb:{
    intro:'The menu of architecture styles to weigh before recording an ADR. Choose by matching the product constraints to each pattern, biasing toward the simplest option the team can operate.',
    guidance:[
      'Start with the simplest thing that works — usually a modular monolith — and extract services only under real pressure.',
      'Use durable execution for long-running, multi-step, failure-prone processes (the claim lifecycle).',
      'Do not distribute unless you must; each hop adds failure modes and cost.',
      'Match boundaries to subdomains (DDD), not to layers.',
      'Weight team familiarity; keep decisions reversible.'
    ],
    criteria:[
      {name:'Workload shape', q:'Request/response, long-running stateful orchestration, or event streams?'},
      {name:'Team & topology', q:'How many teams, and how independently must they ship?'},
      {name:'Operational maturity', q:'Can the team run distributed systems and on-call?'},
      {name:'Consistency vs latency', q:'Strong transactional integrity (money) or eventual consistency?'},
      {name:'Scale profile', q:'Steady load or catastrophe surges?'},
      {name:'Reversibility', q:'How hard is it to change later?'}
    ],
    patterns:[
      {id:'PT1', name:'Modular monolith', family:'Monolith', summary:'One deployable, internally split into bounded modules. The default for most new products.', whenUse:['Small or single team','Boundaries still emerging','Strong transactional consistency matters','Fast time-to-market'], whenAvoid:['Many teams needing independent deploys','Very different scaling per part'], tradeoffs:'Simplest to build and operate; transactional integrity is easy; scales as a unit.', signals:'Claritas: one team, money-handling, evolving rules — chosen (ADR-01).'},
      {id:'PT2', name:'Microservices', family:'Distributed', summary:'Independently deployable services per bounded context.', whenUse:['Many autonomous teams','Independent scaling','Mature platform'], whenAvoid:['Small team','Shifting boundaries','Strong cross-service transactions'], tradeoffs:'Autonomy and independent scale at the cost of distributed-systems complexity.', signals:'Premature for Claritas today.'},
      {id:'PT3', name:'Serverless / FaaS', family:'Managed', summary:'Event-triggered functions with managed scaling.', whenUse:['Spiky event-driven work','Low baseline traffic','Minimal ops'], whenAvoid:['Long-running or stateful work','Steady high throughput'], tradeoffs:'No servers and elastic scale, but cold starts and weak fit for long workflows.', signals:'Useful for surge spillover, not the core lifecycle.'},
      {id:'PT4', name:'Durable workflows (Temporal)', family:'Orchestration', summary:'Code-defined durable workflows with retries, timers, and sagas.', whenUse:['Long-running multi-step processes','Reliability-critical flows','Must survive crashes and resume'], whenAvoid:['Simple CRUD','No appetite for a new model'], tradeoffs:'Durability and visibility at the cost of a new execution model and a cluster.', signals:'The Claritas claim lifecycle — chosen (ADR-01).'},
      {id:'PT5', name:'Event-driven', family:'Integration', summary:'Components react to events over a broker or log.', whenUse:['Decoupling subdomains','Surge buffering','Audit/replay'], whenAvoid:['Strong synchronous consistency needs'], tradeoffs:'Loose coupling and resilience at the cost of eventual consistency and harder debugging.', signals:'Cross-subdomain coordination — chosen (ADR-03).'}
    ]
  }
};
