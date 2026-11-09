import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const rIdx = indexHtml.indexOf('function render(){');
console.log(indexHtml.substring(rIdx, rIdx + 2000));
