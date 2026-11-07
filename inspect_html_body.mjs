import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/entrada.html', 'utf8');

const lines = html.split('\n');
console.log('Lines 1300 - end:');
console.log(lines.slice(1300).join('\n'));
