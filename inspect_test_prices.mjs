import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const testCode = fs.readFileSync(path.join(projectDir, 'run-all-tests.mjs'), 'utf8');

const matches = [...testCode.matchAll(/\$\d+[\d.,]*/g)].map(m => m[0]);
console.log('Dollar amounts tested in run-all-tests.mjs:', [...new Set(matches)]);
