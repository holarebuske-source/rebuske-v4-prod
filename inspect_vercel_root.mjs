import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const vercel = JSON.parse(fs.readFileSync(path.join(projectDir, 'vercel.json'), 'utf8'));

const rootRewrite = vercel.rewrites.find(r => r.source === '/' || r.source === '/index' || r.source === '/index.html');
console.log('Root rewrite:', rootRewrite);
