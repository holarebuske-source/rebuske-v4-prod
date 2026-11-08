import fs from 'fs';
import path from 'path';

const root = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const terms = [
  "Don Jairo", "Doña Gloria", "Mateo & Camila", "Andrés R.", "Marina E.",
  "Sandra Villegas", "Julián Restrepo", "Marcela Gómez", "Lupita Salazar",
  "Carlos Mario Varela", "Carlos Mario Restrepo", "Paola Andrea Henao",
  "PROS =", "EXPRESS_TRADES", "samplePrice", "renderRealCasesSection",
  "demo", "simula", "4242", "Camila Torres", "186.000", "Visa", "Mastercard"
];

const files = fs.readdirSync(root).filter(f => f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.mjs'));

for (const file of files) {
  const p = path.join(root, file);
  const content = fs.readFileSync(p, 'utf-8');
  let found = [];
  for (const t of terms) {
    const regex = new RegExp(t, 'gi');
    const count = (content.match(regex) || []).length;
    if (count > 0) {
      found.push(`${t} (${count})`);
    }
  }
  if (found.length > 0) {
    console.log(`[${file}] -> ${found.join(', ')}`);
  }
}
