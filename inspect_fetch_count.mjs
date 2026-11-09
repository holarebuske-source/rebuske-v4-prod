import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const regPro = fs.readFileSync(path.join(projectDir, 'api', 'register-pro.js'), 'utf8');

const sIdx = regPro.indexOf('fetchCurrentCountFromSupabase');
console.log(regPro.substring(sIdx, sIdx + 1200));
