import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const sIdx = indexHtml.indexOf('<script');
const scriptPart = indexHtml.substring(sIdx);
const navFns = scriptPart.match(/function\s+[a-zA-Z0-9_]+\s*\([^)]*\)\s*\{/g) || [];
console.log('Total functions:', navFns.length);
console.log('Sample functions:', navFns.slice(0, 30));
