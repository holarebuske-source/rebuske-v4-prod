import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

const sampleCat = tarifas.indexOf('✨ 1. Limpieza y Aseo');
console.log(tarifas.substring(sampleCat - 200, sampleCat + 1200));
