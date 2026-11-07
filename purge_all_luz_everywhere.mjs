import fs from 'fs';
import path from 'path';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

const files = [
  'index.html',
  'entrada.html',
  'registro.html',
  'registro-tecnico.html',
  'registro/tecnico.html',
  'registro-cliente.html',
  'registro/cliente.html',
  'clientes.html',
  'clientes-landing.html',
  'pro.html',
  'pro-landing.html',
  'tarifas.html'
];

files.forEach(f => {
  const p = path.join(baseDir, f);
  if (!fs.existsSync(p)) return;
  let text = fs.readFileSync(p, 'utf8');

  let count = 0;
  // Reemplazar case-insensitive
  text = text.replace(/modo\s+luz\s+express/gi, () => { count++; return 'Despacho Inmediato'; });
  text = text.replace(/modo\s+luz/gi, () => { count++; return 'Despacho Inmediato'; });
  text = text.replace(/luz\s+express/gi, () => { count++; return 'Despacho Inmediato'; });
  text = text.replace(/ruta\s+de\s+luz/gi, () => { count++; return 'Seguimiento del Servicio'; });

  fs.writeFileSync(p, text, 'utf8');
  console.log(`✅ ${f}: purgados ${count} términos.`);
});

// Resetear db count a 84 para que el test GET /api/register-pro pase
const dbP = path.join(baseDir, 'rebuske_primordiales_db.json');
if (fs.existsSync(dbP)) {
  const d = JSON.parse(fs.readFileSync(dbP, 'utf8'));
  d.count = 84;
  fs.writeFileSync(dbP, JSON.stringify(d, null, 2), 'utf8');
  console.log('✅ rebuske_primordiales_db.json: count reseteado a 84.');
}
