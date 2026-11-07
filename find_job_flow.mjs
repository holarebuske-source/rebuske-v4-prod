import fs from 'fs';

const idx = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/index.html', 'utf8');

// Buscar donde se maneja la solicitud o categorías
const lines = idx.split('\n');
lines.forEach((l, i) => {
  if (l.includes('solicitud') && (l.includes('render') || l.includes('function') || l.includes('sheet') || l.includes('view ===') || l.includes('V.solicitud'))) {
    console.log(`Line ${i + 1}: ${l.trim()}`);
  }
});
