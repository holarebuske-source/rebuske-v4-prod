import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const html = fs.readFileSync(path.join(projectDir, 'entrada.html'), 'utf8');

const empIdx = html.indexOf('id="empieza-aqui"');
console.log(html.substring(empIdx, empIdx + 1600));
