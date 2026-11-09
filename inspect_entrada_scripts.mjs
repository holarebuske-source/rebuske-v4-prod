import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const entrada = fs.readFileSync(path.join(projectDir, 'entrada.html'), 'utf8');

// Check bottom scripts in entrada.html
const scripts = [...entrada.matchAll(/<script[\s\S]*?<\/script>/gi)].map(m => m[0]);
console.log('Scripts in entrada.html:', scripts.length);
scripts.forEach((s, i) => {
  console.log(`Script ${i + 1} (${s.length} chars):`, s.substring(0, 150) + '...');
});
