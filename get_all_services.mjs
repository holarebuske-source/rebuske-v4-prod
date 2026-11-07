import fs from 'fs';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

console.log('=== SERVICIOS EN TARIFAS.HTML ===');
if (fs.existsSync(baseDir + '/tarifas.html')) {
  const content = fs.readFileSync(baseDir + '/tarifas.html', 'utf8');
  const lines = content.split('\n');
  lines.forEach(l => {
    if (l.includes('<h2') || l.includes('<h3') || l.includes('class="service-') || l.includes('COP') || l.includes('tarifa-item') || l.includes('price')) {
      const clean = l.replace(/<[^>]+>/g, '').trim();
      if (clean && clean.length > 3 && clean.length < 120) {
        console.log('  • ' + clean);
      }
    }
  });
}

console.log('\n=== SERVICIOS EN INDEX.HTML (MOTOR DE DIAGNÓSTICO & CATÁLOGO) ===');
if (fs.existsSync(baseDir + '/index.html')) {
  const idx = fs.readFileSync(baseDir + '/index.html', 'utf8');
  // Buscar oficios o categorías
  const oficiosMatch = idx.match(/const\s+(?:OFICIOS|CATEGORIAS|ESPECIALIDADES)\s*=\s*(\[[^\]]+\])/i);
  if (oficiosMatch) {
    console.log('Oficios encontrados:', oficiosMatch[1]);
  }
}
