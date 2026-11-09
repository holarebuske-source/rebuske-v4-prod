import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const entrada = fs.readFileSync(path.join(projectDir, 'entrada.html'), 'utf8');

console.log('entrada.html total length:', entrada.length);
console.log('entrada.html lines:', entrada.split('\n').length);

// Extract section headers (h2, h3)
const headings = [...entrada.matchAll(/<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/gi)].map(m => `${m[1]}: ${m[2].replace(/<[^>]+>/g, '').trim()}`);
console.log('Headings in entrada.html:');
headings.forEach(h => console.log('  ', h));
