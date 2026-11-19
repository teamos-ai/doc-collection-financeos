import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {resolve} from 'node:path';

const html=readFileSync('dist/index.html','utf8');
assert(html.includes('id="fos-document-board"'),'Website entry must mount the board');
assert(!html.includes('/src/'),'Website entry must reference compiled assets');
const assets=[...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map(m=>m[1]);
assert(assets.some(p=>p.endsWith('.js')),'Missing compiled website script');
assert(assets.some(p=>p.endsWith('.css')),'Missing compiled website styles');
for(const asset of assets)assert(statSync(resolve('dist',asset.slice(1))).size>0,'Empty asset: '+asset);
console.log('Website output verified: index.html and its compiled assets exist.');
