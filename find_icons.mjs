import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const matches = [...indexHtml.matchAll(/const\s+ICONS\s*=|const\s+I\s*=|function\s+I\s*\(/g)];
console.log('Matches:', matches.map(m => m[0]));
if (matches.length > 0) {
  const idx = matches[0].index;
  console.log(indexHtml.substring(idx, idx + 1000));
}
