import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const testCode = fs.readFileSync(path.join(projectDir, 'run-all-tests.mjs'), 'utf8');

const lines = testCode.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('70.000') || l.includes('130.000') || l.includes('35.000')) {
    console.log(`${idx + 1}: ${l}`);
  }
});
