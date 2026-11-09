import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const vIdx = indexHtml.indexOf('const VIEWS={');
console.log(indexHtml.substring(vIdx, vIdx + 1500));
