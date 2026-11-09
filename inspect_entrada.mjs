import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const entrada = fs.readFileSync(path.join(projectDir, 'entrada.html'), 'utf8');

// Find sections in entrada.html
const sections = [...entrada.matchAll(/<section[^>]*id=[\"']([^\"']+)[\"'][^>]*>/g)].map(m => m[1]);
console.log('Sections with id in entrada.html:', sections);

// Find headers/navbars
const navMatch = entrada.match(/<nav[\s\S]*?<\/nav>/);
console.log('Nav sample:\n', navMatch ? navMatch[0].substring(0, 400) : 'no nav');

// Find :root styles in entrada.html
const rootMatch = entrada.match(/:root\s*\{([\s\S]*?)\}/);
console.log(':root in entrada.html:\n', rootMatch ? rootMatch[1].trim() : 'no root');
