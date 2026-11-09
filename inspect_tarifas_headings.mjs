import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

// Find all headings
const headings = [...tarifas.matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi)].map(m => `${m[1]}: ${m[2].replace(/<[^>]+>/g, '').trim()}`);
console.log('Total headings in tarifas.html:', headings.length);
headings.slice(0, 30).forEach(h => console.log('  ', h));
