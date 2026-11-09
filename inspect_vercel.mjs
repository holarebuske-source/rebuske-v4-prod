import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const vercel = JSON.parse(fs.readFileSync(path.join(projectDir, 'vercel.json'), 'utf8'));

console.log('Vercel rewrites count:', vercel.rewrites ? vercel.rewrites.length : 0);
console.log('Sample rewrites:');
if (vercel.rewrites) {
  vercel.rewrites.slice(0, 15).forEach(r => console.log(r));
}
