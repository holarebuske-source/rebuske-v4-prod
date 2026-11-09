import fs from 'fs';

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

console.log('Searching in index.html:');
lines.forEach((line, idx) => {
  const l = line.toLowerCase();
  if (l.includes('3d') || l.includes('luciernaga') || l.includes('function lz') || l.includes('const lz') || l.includes('canvas') || l.includes('logo-bubble') || l.includes('brand-logo')) {
    console.log(`Line ${idx + 1}: ${line.trim().substring(0, 110)}`);
  }
});
