import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const appHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// Find the main app shell in index.html
const shellMatch = appHtml.match(/<div class=[\"']app-container[\"'][\s\S]*?<\/header>/i) || 
                   appHtml.match(/<header[\s\S]*?<\/header>/i);
console.log('App header sample:\n', shellMatch ? shellMatch[0].substring(0, 800) : 'not found');

// Find key UI components in index.html: Radar, Wompi Checkout, QR/Credencial, Wallet
['radar', 'wompi', 'credencial', 'qr', 'wallet', 'billetera'].forEach(term => {
  const idx = appHtml.toLowerCase().indexOf(term);
  console.log(`Term "${term}" at index ${idx}`);
});
