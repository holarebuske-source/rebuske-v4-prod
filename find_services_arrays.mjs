import fs from 'fs';

const idx = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/index.html', 'utf8');

// Buscar arrays de categorías o servicios
const matches = idx.match(/(?:const|let|var)\s+([A-Za-z0-9_]+)\s*=\s*\[(?:[^\]]{20,2000})\]/g);
if (matches) {
  matches.forEach(m => {
    if (m.includes('Plomería') || m.includes('Electricidad') || m.includes('name') || m.includes('id:')) {
      console.log('--- ENCONTRADO ARRAY ---');
      console.log(m.slice(0, 300) + '...');
    }
  });
}
