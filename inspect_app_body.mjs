import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const bodyMatch = indexHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  console.log('Body start:\n', bodyMatch[1].substring(0, 1500));
}
