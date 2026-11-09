import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const svgEnd = indexHtml.indexOf('</svg>');
console.log(indexHtml.substring(svgEnd, svgEnd + 1500));
