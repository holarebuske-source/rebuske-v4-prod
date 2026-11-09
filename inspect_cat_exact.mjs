import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

const idx = tarifas.indexOf('1. Limpieza y Aseo');
console.log('Index:', idx);
if (idx !== -1) {
  console.log(tarifas.substring(idx - 100, idx + 800));
}
