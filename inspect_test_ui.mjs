import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const testCode = fs.readFileSync(path.join(projectDir, 'run-all-tests.mjs'), 'utf8');

const lines = testCode.split('\n');
console.log(lines.slice(200, 250).map((l, i) => `${200 + i}: ${l}`).join('\n'));
