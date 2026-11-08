import fs from 'fs';

const content = fs.readFileSync('index.html', 'utf-8');
const lines = content.split('\n');

const terms = [
  "Don Jairo", "Doña Gloria", "Mateo & Camila", "Andrés R.", "Marina E.",
  "Sandra Villegas", "Julián Restrepo", "Marcela Gómez", "Lupita Salazar",
  "Carlos Mario Varela", "Carlos Mario Restrepo", "Paola Andrea Henao",
  "PROS =", "EXPRESS_TRADES", "samplePrice", "renderRealCasesSection",
  "demo", "simula", "4242", "Camila Torres"
];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const t of terms) {
    if (new RegExp(t, 'i').test(line)) {
      console.log(`L${i + 1} [${t}]: ${line.trim().slice(0, 140)}`);
      break;
    }
  }
}
