import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

const endOf17 = tarifas.indexOf('Trámites legales y constitución de empresas');
console.log(tarifas.substring(endOf17, endOf17 + 3500));
