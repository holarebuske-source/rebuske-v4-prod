import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const vIdx = indexHtml.indexOf('const VIEWS={');
const vEnd = indexHtml.indexOf('};', vIdx);
const viewsBlock = indexHtml.substring(vIdx, vEnd);
const keys = [...viewsBlock.matchAll(/([a-zA-Z0-9_]+)\s*:\s*\([^)]*\)\s*=>/g)].map(m => m[1]);
console.log('Total views in VIEWS:', keys.length);
console.log('Views keys:', keys);
