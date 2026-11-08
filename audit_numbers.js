import fs from 'fs';

const files = ['index.html', 'app.html', 'marketing-admin-module.js', 'rebuske-sofia-flows.js', 'supabase-sync.js'];
const searchPatterns = [
  /baseGMV/i,
  /14850000/,
  /gmvSeries/i,
  /INGRESOS\s*=/i,
  /186000/,
  /112000/,
  /saldo\s*:\s*[1-9]/i,
  /pend\s*:\s*[1-9]/i,
  /saldo\s*\|\|\s*[1-9]/i,
  /wallet.*186/i
];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const content = fs.readFileSync(f, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    for (const pat of searchPatterns) {
      if (pat.test(l)) {
        console.log(`[${f}:${idx + 1}] ${l.trim().slice(0, 120)}`);
        break;
      }
    }
  });
}
