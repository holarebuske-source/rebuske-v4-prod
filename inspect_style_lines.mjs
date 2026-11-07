import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/entrada.html', 'utf8');

const styleContent = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i)[1];
const styleLines = styleContent.split('\n');

console.log('Lines 701 - 959:');
console.log(styleLines.slice(700, 959).join('\n'));
