import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

const endCards = tarifas.indexOf('17. Servicios Profesionales');
console.log(tarifas.substring(endCards, endCards + 2500));
