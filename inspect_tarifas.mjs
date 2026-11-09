import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

// Print first 100 lines and CSS root
const lines = tarifas.split('\n');
console.log('--- Top 80 lines of tarifas.html ---');
console.log(lines.slice(0, 80).join('\n'));

// Check how cards and styles are set
const cssMatch = tarifas.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch) {
  console.log('--- CSS style sample (first 1000 chars) ---');
  console.log(cssMatch[1].substring(0, 1000));
}
