import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/entrada.html', 'utf8');

const sections = [...html.matchAll(/<section[^>]*id=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log('Section IDs:', sections);

const classes = new Set();
const matches = html.matchAll(/class=["']([^"']+)["']/gi);
for (const m of matches) {
  m[1].split(/\s+/).forEach(c => classes.add(c));
}
console.log('Total unique classes:', classes.size);
console.log('Sample classes:', [...classes].slice(0, 40));
