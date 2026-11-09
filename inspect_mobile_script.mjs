import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const script = fs.readFileSync(path.join(projectDir, 'take_mobile_screenshot.mjs'), 'utf8');
console.log(script.substring(0, 1500));
