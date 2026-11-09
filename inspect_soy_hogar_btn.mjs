import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const html = fs.readFileSync(path.join(projectDir, 'entrada.html'), 'utf8');

const t2Idx = html.indexOf('Soy Hogar');
console.log(html.substring(t2Idx, t2Idx + 1100));
