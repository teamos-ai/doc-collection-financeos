import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const js=ts.transpileModule(readFileSync('src/intake.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {previewRequests,initialIntake,reviewIssues,unchangedRequestIds}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const catalogue=readFileSync('docs/document-collection-catalogue-and-tags-2026-11-18.md','utf8');
const form=structuredClone(initialIntake);
let rows=previewRequests(form);
assert.equal(rows.find(r=>r.id==='account-a').period,'6 continuous months');
assert.equal(rows.find(r=>r.id==='account-b').period,'6 continuous months');
assert.equal(rows.find(r=>r.id==='account-c').period,'3 continuous months');
assert(!rows.some(r=>r.key==='salary-statements'),'Salary matching must be explicitly selected');
form.liabilities[1].treatment='Retained';
rows=previewRequests(form);
assert.equal(rows.find(r=>r.id==='account-b').period,'3 continuous months');
assert.equal(rows.filter(r=>r.key==='credit-card-statements').length,2,'Keep account-specific requests');
form.applicants[0].salaryMatch=true;
assert(previewRequests(form).some(r=>r.key==='salary-statements'));
form.purposes=['Purchase'];
assert(!previewRequests(form).some(r=>r.key==='purchase-contract'),'No contract request before contract stage');
form.contractAvailable=true;form.savings=true;
assert(previewRequests(form).some(r=>r.key==='purchase-contract'));
assert(previewRequests(form).some(r=>r.key==='savings-statements'));
form.applicants[0].income=['Trust income','Partnership income','Company income','Rental income'];
form.purposes.push('Construction');
assert(!previewRequests(form).some(r=>r.key==='personal-tax-return'),'Unresolved route must not silently generate tax packs');
assert(!previewRequests(form).some(r=>r.key==='building-contract'),'Unresolved stage must not generate construction pack');
assert(reviewIssues(form).length>=2);
form.applicants[0].incomeRoute='Standard two-year pack';
form.constructionStage='Formal application';
rows=previewRequests(form);
for(const key of ['trust-deed','trust-amendments','trust-financials','partnership-financials','business-tax-return','building-contract'])assert(rows.some(r=>r.key===key),key);
assert(!rows.some(r=>r.key==='payslips'));
for(const row of rows)assert(catalogue.includes('fos-doc-needed-'+row.key),'Outside retained catalogue: '+row.key);
form.applicants.push({...form.applicants[0],id:'applicant-b',name:'Applicant B'});
rows=previewRequests(form);
assert.equal(new Set(rows.map(r=>r.id)).size,rows.length,'Request IDs must remain unique across applicants');
const isolated=structuredClone(initialIntake);
isolated.applicants[0].income=['Company income'];
isolated.applicants[0].incomeRoute='Personal NOAs only';
rows=previewRequests(isolated);
assert.equal(rows.filter(r=>r.key==='notice-of-assessment').length,1);
assert(!rows.some(r=>['personal-tax-return','business-tax-return','trust-financials','ato-income'].includes(r.key)),'Do not stack standard and reduced-document routes');
isolated.applicants[0].incomeRoute='Company wage evidence';
rows=previewRequests(isolated);
assert(rows.some(r=>r.key==='ato-income')&&rows.some(r=>r.key==='payslips'));
assert(!rows.some(r=>r.key==='personal-tax-return'));
isolated.applicants[0].income.push('Trust income');
assert(!previewRequests(isolated).some(r=>r.id.endsWith('-company-ato')),'Mixed entity route cannot use company-wage example');
assert(reviewIssues(isolated).some(x=>x.includes('separate routes')));
const construction=structuredClone(initialIntake);
construction.purposes=['Construction'];
const packs={
 'Pre-approval':['building-contract','building-plans'],
 'Formal application':['building-contract','progress-schedule','building-plans','building-specifications'],
 'Before commencement':['building-approvals','building-plans','construction-insurance'],
 'Progress draw':['progress-claim','builder-invoice'],
 'Final draw':['progress-claim','builder-invoice','completion-evidence'],
};
for(const [stage,keys] of Object.entries(packs)) {
 construction.constructionStage=stage;
 rows=previewRequests(construction).filter(r=>r.subject==='Construction project');
 assert.deepEqual(rows.map(r=>r.key),keys,stage+' requests only current-stage items');
 for(const row of rows) assert(catalogue.includes('fos-doc-needed-'+row.key),'Outside retained catalogue: '+row.key);
}
construction.constructionStage='Pre-approval';
const formal=structuredClone(construction);formal.constructionStage='Formal application';
const unchanged=unchangedRequestIds(construction,formal);
assert(!unchanged.has('loan-building-contract'),'Draft contract held decision cannot satisfy signed contract');
assert(unchanged.has('account-b'),'Unrelated card held decision must survive');
const retainedCard=structuredClone(formal);retainedCard.liabilities[1].treatment='Retained';
assert(!unchangedRequestIds(formal,retainedCard).has('account-b'),'Changed coverage must require checklist re-review');
console.log('Intake scenarios passed: locked coverage, scoped accounts, income route separation, construction stages, catalogue keys and changed-evidence re-review.');
