import fs from 'fs';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

console.log('--- EXTRACTO DE TARIFAS.HTML ---');
const tarifas = fs.readFileSync(baseDir + '/tarifas.html', 'utf8');
const lines = tarifas.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<h') || l.includes('class="service') || l.includes('class="item') || l.includes('class="card') || l.includes('name') || l.includes('COP')) {
    const txt = l.replace(/<[^>]+>/g, '').trim();
    if (txt) console.log(`${i}: ${txt}`);
  }
});
