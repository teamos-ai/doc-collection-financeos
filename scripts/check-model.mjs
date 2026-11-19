import ts from 'typescript';
import {readFileSync,writeFileSync} from 'node:fs';
const src=readFileSync('src/model.ts','utf8');
const js=ts.transpileModule(src,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {WORKFLOWS,overview,rules,fields,gates}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
for(const w of [...WORKFLOWS,overview]){
 const ids=w.steps.map(s=>s.id);
 if(new Set(ids).size!==ids.length)throw Error(w.id+' duplicate step');
 for(const l of w.links)if(!ids.includes(l.from)||!ids.includes(l.to))throw Error('Bad edge '+w.id);
 const reached=new Set([ids[0]]);let changed=true;while(changed){changed=false;for(const l of w.links)if(reached.has(l.from)&&!reached.has(l.to)){reached.add(l.to);changed=true}}
 // Controls originate separately in overview. Every detailed workflow must be reachable.
 if(w.id!=='overview'&&reached.size!==ids.length)throw Error(w.id+' disconnected step');
 for(const s of w.steps)if(s.kind==='decision'&&w.links.filter(e=>e.from===s.id).length<2)throw Error(w.id+' decision missing branch');
}
const distinctFolders=new Set(WORKFLOWS.map(w=>w.folder)).size;
if(distinctFolders!==6||WORKFLOWS.length!==7)throw Error('Preview totals mismatch');
writeFileSync('workflow-blueprint.json',JSON.stringify({version:'2026-11-19',status:'proposed',sourceRevision:'e6f6d8d1423bd97a33a014f38f71d0a8282889b8',workflows:WORKFLOWS,overview,rules,fields,gates},null,2));
console.log(`${WORKFLOWS.length} workflows / ${WORKFLOWS.reduce((n,w)=>n+w.steps.length,0)} steps: identifiers, references, decision branches and reachability verified.`);
