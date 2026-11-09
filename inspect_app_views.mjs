import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// Look for navigation tabs in index.html
const navMatch = indexHtml.match(/<nav class=[\"']bot[\"']>[\s\S]*?<\/nav>/i);
console.log('Bottom Nav:', navMatch ? navMatch[0] : 'not found');

// Check view rendering or routers
const viewMatches = indexHtml.match(/function\s+render\w+\s*\(/g) || [];
console.log('Render functions:', viewMatches);
