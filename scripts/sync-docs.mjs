import {readFileSync, writeFileSync} from 'node:fs';
const b=JSON.parse(readFileSync('builder-handoff.json','utf8'));
const w=JSON.parse(readFileSync('workflow-blueprint.json','utf8'));
const table=(heads,rows)=>[heads,heads.map(()=>'---'),...rows].map(row=>'| '+row.map(x=>{if(x===undefined)throw new Error('Missing table value');return String(x).replaceAll('|','\\|').replaceAll('\n',' ');}).join(' | ')+' |').join('\n');
const replaceSection=(text,start,end,content)=>{
 const from=text.indexOf(start),to=text.indexOf(end,from+start.length);
 if(from<0||to<0)throw new Error('Missing document section '+start);
 return text.slice(0,from)+start+'\n\n'+content.trim()+'\n\n'+text.slice(to);
};
const handoffPath='docs/builder-handoff-2026-11-19.md';
let handoff=readFileSync(handoffPath,'utf8').replace('19 November 2026. Proposed','Updated 20 November 2026 after the [Perplexity reconciliation](perplexity-cross-check-2026-11-20.md). Proposed');
if(!handoff.includes('## Property scenario routing')) handoff=handoff.replace('## Build order and completion checks','## Property scenario routing\n\n## Build order and completion checks');
const propertyTable=table(['Scenario','Request / conditions','Tag implications','Broker review'],b.propertyScenarios.map(p=>[p.title,p.documents+' '+p.conditions,p.tags,p.review]));
handoff=replaceSection(handoff,'## Property scenario routing','## Build order and completion checks','The four paths are visible in DC-01 and available as synthetic intake examples. Purpose, intended use and tenancy are separate inputs.\n\n'+propertyTable+'\n\n[Evidence, exclusions and staff considerations](property-scenario-coverage-2026-11-20.md).');
handoff=replaceSection(handoff,'## Proposed field schema','## Field-to-rule mapping','Logical names, not live GHL custom-field IDs. Builder must prove the representation.\n\n'+table(['Record','Field names','Type / values','Constraint'],b.schemaFields));
handoff=replaceSection(handoff,'## Field-to-rule mapping','## Workflow instructions',table(['Input / event','Field','Route','Guard'],b.fieldMappings));
const workflows=w.workflows.map(flow=>'### '+flow.id+' · '+flow.title+'\n\n'+flow.sub+'\n\n'+flow.steps.map((step,i)=>{
 const next=flow.links.filter(x=>x.from===step.id).map(x=>(x.label||'Continue')+' → `'+flow.id+'.'+x.to+'`').join('; ');
 return '#### '+flow.id+'.'+String(i+1).padStart(2,'0')+' / `'+flow.id+'.'+step.id+'` · '+step.title+'\n\n'+[
  ['Evidence',step.evidence],['Trigger',step.trigger],['Action',step.action],['Guard',step.guard],['Proposed GHL mapping',step.ghl],...(step.state?[['State',step.state]]:[]),...(step.tags?[['Tag effect',step.tags]]:[]),['Next',next||'Exit / handoff described above.']
 ].map(([label,value])=>'- **'+label+':** '+value).join('\n');
}).join('\n\n')).join('\n\n');
handoff=replaceSection(handoff,'## Workflow instructions','## Message sequence · draft, not approved',workflows);
handoff=handoff.slice(0,handoff.indexOf('## Manual GHL acceptance pack'))+'## Manual GHL acceptance pack\n\nThese are future tests of the manual GHL implementation. Board tests do not establish GHL acceptance.\n\n'+b.acceptanceCases.map((x,i)=>`${i+1}. ${x}`).join('\n')+'\n';
writeFileSync(handoffPath,handoff);
const researchPath='docs/research-validation-2026-11-19.md';
let research=readFileSync(researchPath,'utf8');
research=research.replace('19 November 2026. This supplements','Started 19 November; updated 20 November 2026 after the [completed Perplexity cross-check](perplexity-cross-check-2026-11-20.md). This supplements');
research=replaceSection(research,'## Sources and limitations','## Reconciled scenario matrix',b.sources.map(s=>`- **${s.id} — [${s.name}](${s.url})**. ${s.date}. ${s.status}. ${s.finding}`).join('\n\n')+'\n\nHG and AUSSIE are supplied local comparisons, not current lender policy. ATO pages that rejected direct access are identified as indexed-text checks; no full-page audit is claimed. Publication date and check date are separate.');
research=replaceSection(research,'## Reconciled scenario matrix','## Australian naming register',table(['Rule','Circumstance','Documents','Coverage','Quantity','Freshness','Condition','Authority / sources'],b.scenarioRules.map(r=>[r.id,r.scenario,r.documents,r.period,r.quantity,r.freshness,r.condition,r.basis+'; '+r.sources.join(', ')])));
research=replaceSection(research,'## Australian naming register','## Conflicts resolved explicitly',table(['Key','Client-facing name','Australian aliases / distinction'],b.catalogue.map(d=>[d.key,d.label,(b.namingAliases[d.key]||['Use the catalogue label.']).join('; ')]))+'\n\nBAS is not IAS or an ATO account ledger. Current YTD income statements and finalised annual evidence have different review purposes. Existing catalogue keys remain unchanged.');
research=replaceSection(research,'## Independent Perplexity cross-check','## Remaining decisions','**Completed 20 November 2026 using the report supplied by Tumai.** The earlier retrieval problem is resolved. The report is retained unchanged as secondary research, with its SHA-256 hash and 18 dispositions in the [cross-check ledger](perplexity-cross-check-2026-11-20.md). All eight sections were reconciled for this module; material changes were checked against original sources. This is not an audit of every linked document or approval of every lender route.');
writeFileSync(researchPath,research);
const propertyDoc=`# Property scenario coverage — 20 November 2026

**Current build state:** the previous property-use selector did not affect request generation. It now controls the subject-property rental route, with four explicit canvas paths and synthetic examples. All paths remain a proposed manual-GHL specification; the three founder statement periods remain fixed.

## Four paths

${propertyTable}

## Evidence checked for this amendment

- [ANZ checklist](https://www.anz.com.au/personal/home-loans/get-started/checklist/): property information is deferred during approval in principle; buying and building evidence differ. Rental income has a combined evidence list, while ongoing tenant rent is a different expense purpose. No universal rental-document OR is inferred.
- [CommBank application guide](https://www.commbank.com.au/home-loans/applying-for-a-home-loan.html): distinguishes existing-security evidence from a found property's sale contract. Lists alternative evidence for rental income from another property. The proposed rates-notice item is not a universal lender requirement.
- [NAB July 2025 application](https://www.nab.com.au/content/dam/nabrwd/documents/forms/loans/home-loan-application-form.pdf), pages 2–3: distinguishes refinance history, purchased property, intended use and dwelling age/type. Its six-month refinance history supports the retained founder collection standard; it does not mean a purchase automatically has refinanced debt.
- [Westpac February 2026 broker checklist](https://www.westpac.com.au/content/dam/public/brokers/documents/applications/wbc-minimum-required-documents-checklist.pdf), pages 5–7: existing-tenancy and vacant-property rent use different verification routes. Tenancy details in a purchase contract can support a relevant route. State-specific purchase and grant requirements require review. Its lender exceptions do not silently change founder defaults.

These sources were rechecked on 20 November 2026. Public evidence establishes distinctions; it does not approve every lender route or scheme. Existing catalogue exclusions take precedence for this module, with unmet lender requirements assigned to the broker externally.

## Builder implementation

1. Resolve loan, applicant, property and account IDs. Store purpose and intended property use per property; bind each debt treatment to its account.
2. Select one of the four paths for that property. Combined purchase/refinance or multiple securities require separately linked records; the single-property preview flags this limitation.
3. Add applicant income/ID and existing liabilities independently. Owner occupation does not suppress income from a different rental property; purchasing does not erase retained debts.
4. For purchases, check contract availability and actual funding sources. The savings switch applies only when savings fund purchase/construction. No pure-refinance purchase contract or deposit chase.
5. For investment, select rent not relied upon, existing tenancy or expected future rent. For existing tenancy, select the approved evidence bundle. Do not ask a purchaser for pre-ownership rental credits. Link a tenancy-bearing contract once with both evidence purposes.
6. Expected-rent evidence stays a broker exception because rental appraisals and valuations remain excluded. Do not mark the rent requirement satisfied or invent historical statements. No automatic issue while the selected route is unresolved.
7. Review and confirm the request revision. Draft form edits do not directly add/remove tags. DC-07 reconciles persisted requests across loans/properties/accounts; one received property document cannot clear another's requirement.
8. On changed use, tenancy or property, re-review affected evidence and preserve history. The preview resets affected held/unticked choices, while independent account and other-property requests survive.

## Additional staff considerations

${b.propertyConsiderations.map(x=>'- '+x).join('\n')}

The demo's property reference and per-applicant other-property label are illustrative. Shared ownership, multiple rentals and a purchase funded by another security need proper linked records in the real build. Continuing rent, cash-out, bridging, valuations, insurance, discharge and excluded documents must have an owned external path; no full credit-assessment or settlement coverage is claimed.

**Owner / next action:** builder implements the four paths and scoped records; Tumai/policy owner resolves lender-specific bundles and exceptions. Success: staff can explain why each item is requested and why unavailable or irrelevant evidence is not chased. Review at the builder walkthrough and before automatic issue.
`;
writeFileSync('docs/property-scenario-coverage-2026-11-20.md',propertyDoc);
console.log('Readable handoff and research register refreshed from the same data as the board.');
