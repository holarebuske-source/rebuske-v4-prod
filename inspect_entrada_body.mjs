import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const entrada = fs.readFileSync(path.join(projectDir, 'entrada.html'), 'utf8');

const bodyStart = entrada.indexOf('<body');
console.log(entrada.substring(bodyStart, bodyStart + 2500));
