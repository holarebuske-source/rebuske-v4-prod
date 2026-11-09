import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const regPro = fs.readFileSync(path.join(projectDir, 'api', 'register-pro.js'), 'utf8');

const getIdx = regPro.indexOf("req.method === 'GET'");
console.log(regPro.substring(getIdx, getIdx + 1200));
