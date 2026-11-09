import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const t = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

// Extract all categories and rows
const cards = [...t.matchAll(/<article class=[\"']cat-card[\"'][\s\S]*?<\/article>/g)].map(m => m[0]);
console.log('Cards count:', cards.length);

cards.forEach((c, idx) => {
  const titleM = c.match(/<h2 class=[\"']cat-title[\"']>([\s\S]*?)<\/h2>/);
  const title = titleM ? titleM[1].replace(/<[^>]+>/g, '').trim() : 'no title';
  const rows = [...c.matchAll(/<div class=[\"']service-name[\"']>([\s\S]*?)<\/div>[\s\S]*?<div class=[\"']service-price[\"']>([\s\S]*?)<\/div>/g)].map(m => ({
    name: m[1].trim(),
    price: m[2].trim()
  }));
  console.log(`Cat ${idx + 1}: ${title} (${rows.length} rows)`);
});
