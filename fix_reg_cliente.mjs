import fs from 'fs';
import path from 'path';

const p = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod\\registro-cliente.html';
let html = fs.readFileSync(p, 'utf8');
html = html.replace(/href=["']https:\/\/rebuske\.vercel\.app\/["']/g, 'href="/app"');
fs.writeFileSync(p, html, 'utf8');
console.log('Fixed registro-cliente.html');
