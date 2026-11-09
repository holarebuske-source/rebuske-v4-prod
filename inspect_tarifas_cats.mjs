import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

// List all 17 categories in tarifas.html
const catMatches = [...tarifas.matchAll(/<h3 class=[\"']cat-title[\"']>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Categories found in tarifas.html:', catMatches.length);
catMatches.forEach((c, idx) => console.log(`${idx + 1}. ${c}`));
