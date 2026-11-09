import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const entrada = fs.readFileSync(path.join(projectDir, 'entrada.html'), 'utf8');

const sIdx = entrada.indexOf('<script>');
console.log(entrada.substring(sIdx));
