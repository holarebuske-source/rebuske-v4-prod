import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const regPro = fs.readFileSync(path.join(projectDir, 'api', 'register-pro.js'), 'utf8');

const m = regPro.match(/benefits:\s*\{[\s\S]*?\}/);
console.log(m ? m[0] : 'no benefits found');
