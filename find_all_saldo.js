import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.mjs'));
for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (/saldo\s+disponible|disponible\s+wallet|saldo\s+retenido|billetera/i.test(l)) {
      console.log(`[${file}:${idx + 1}] ${l.trim().slice(0, 130)}`);
    }
  });
}
