import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

const pCardEnd = tarifas.indexOf('</section>', tarifas.indexOf('payment-modalities-card')) + 10;
const condStart = tarifas.indexOf('conditions-card');
console.log(tarifas.substring(pCardEnd, pCardEnd + 1500));
