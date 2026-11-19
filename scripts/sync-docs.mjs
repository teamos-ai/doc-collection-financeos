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
console.log('Readable handoff and research register refreshed from the same data as the board.');
