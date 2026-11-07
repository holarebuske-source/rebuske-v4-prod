import fs from 'fs';
const lines = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/tarifas.html', 'utf8').split('\n');
console.log(lines.slice(120, 275).join('\n'));
