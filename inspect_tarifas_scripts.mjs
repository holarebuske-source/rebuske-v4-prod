import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

// Find all script tags in tarifas.html
const scripts = [...tarifas.matchAll(/<script[\s\S]*?<\/script>/gi)].map(m => m[0]);
console.log('Script count in tarifas.html:', scripts.length);
scripts.forEach((s, idx) => {
  console.log(`Script ${idx + 1} length: ${s.length} chars`);
  console.log(s.substring(0, 200) + '...\n');
});
