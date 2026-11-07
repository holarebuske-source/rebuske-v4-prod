import fs from 'fs';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const idx = fs.readFileSync(baseDir + '/index.html', 'utf8');
const lines = idx.split('\n');

lines.forEach((l, i) => {
  if (l.match(/Modo Luz|Luz Express|Ruta de Luz|modo-luz|luz-express/i)) {
    console.log(`Line ${i + 1}: ${l.trim()}`);
  }
});
