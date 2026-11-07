import fs from 'fs';
import path from 'path';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

console.log('🚀 INICIANDO PURGA TOTAL DE "MODO LUZ", "LUZ EXPRESS" Y "RUTA DE LUZ"...');

// 1. PURGAR ENTRADA.HTML Y REGISTRO.HTML
['entrada.html', 'registro.html'].forEach(filename => {
  const filePath = path.join(baseDir, filename);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/Modo Luz Express/g, 'Despacho Inmediato en Comunas');
  content = content.replace(/Modo Luz/g, 'Despacho Inmediato');
  content = content.replace(/modo luz/gi, 'despacho inmediato');
  content = content.replace(/Luz Express/g, 'Despacho Inmediato');
  content = content.replace(/Ruta de Luz/g, 'Seguimiento en Vivo');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${filename}: purgado.`);
});

// 2. PURGAR INDEX.HTML
const indexFile = path.join(baseDir, 'index.html');
if (fs.existsSync(indexFile)) {
  let idx = fs.readFileSync(indexFile, 'utf8');

  idx = idx.replace(/MODO LUZ EXPRESS/g, 'DESPACHO URGENTE INMEDIATO');
  idx = idx.replace(/Modo Luz Express/g, 'Despacho Inmediato');
  idx = idx.replace(/Modo Luz/g, 'Despacho Inmediato');
  idx = idx.replace(/Luz Express/g, 'Despacho Inmediato');
  idx = idx.replace(/Ruta de Luz/g, 'Seguimiento del Servicio');
  idx = idx.replace(/Ruta de luz/g, 'Seguimiento del servicio');
  idx = idx.replace(/ruta de luz/g, 'seguimiento del servicio');
  idx = idx.replace(/¡Ruta de Luz encendida!/g, '¡Seguimiento activado!');
  idx = idx.replace(/la Ruta de Luz se enciende/g, 'el seguimiento se activa');

  fs.writeFileSync(indexFile, idx, 'utf8');
  console.log('✅ index.html: purgado.');
}

// 3. PURGAR CLIENTES.HTML Y CLIENTES-LANDING.HTML
['clientes.html', 'clientes-landing.html'].forEach(filename => {
  const filePath = path.join(baseDir, filename);
  if (!fs.existsSync(filePath)) return;
  let c = fs.readFileSync(filePath, 'utf8');
  c = c.replace(/Modo Luz Express/g, 'Despacho Inmediato');
  c = c.replace(/Modo Luz/g, 'Despacho Inmediato');
  c = c.replace(/Luz Express/g, 'Despacho Inmediato');
  c = c.replace(/Ruta de Luz/g, 'Seguimiento del Servicio');
  fs.writeFileSync(filePath, c, 'utf8');
  console.log(`✅ ${filename}: purgado.`);
});

// 4. PURGAR UPDATE_ENTRADA_AND_TYPOGRAPHY.MJS
const updateScript = path.join(baseDir, 'update_entrada_and_typography.mjs');
if (fs.existsSync(updateScript)) {
  let s = fs.readFileSync(updateScript, 'utf8');
  s = s.replace(/Modo Luz Express/g, 'Despacho Inmediato en Comunas');
  s = s.replace(/Modo Luz/g, 'Despacho Inmediato');
  s = s.replace(/Luz Express/g, 'Despacho Inmediato');
  s = s.replace(/Ruta de Luz/g, 'Seguimiento en Vivo');
  fs.writeFileSync(updateScript, s, 'utf8');
  console.log('✅ update_entrada_and_typography.mjs: purgado.');
}

// 5. ACTUALIZAR .AGENTS/RULES/REBUSKE-CORE-LAWS.MD Y AGENTS.MD
['.agents/rules/rebuske-core-laws.md', 'AGENTS.md'].forEach(f => {
  const p = path.join(baseDir, f);
  if (!fs.existsSync(p)) return;
  let laws = fs.readFileSync(p, 'utf8');
  laws = laws.replace(/Modo Luz Express/g, 'Despacho Inmediato');
  laws = laws.replace(/Modo Luz/g, 'Despacho Inmediato');
  laws = laws.replace(/Ruta de Luz/g, 'Seguimiento en Vivo');
  
  if (!laws.includes('PROHIBICIÓN TOTAL DE MODO LUZ')) {
    laws += `\n\n### REGLA INQUEBRANTABLE: PROHIBICIÓN TOTAL DE "MODO LUZ" Y "RUTA DE LUZ"
Queda estrictamente prohibido usar, mencionar, proponer o escribir los términos "Modo Luz", "Modo Luz Express", "Luz Express" o "Ruta de Luz" en cualquier archivo, pantalla, comunicación, cotización o código de rebuske. Usar únicamente "Despacho Inmediato", "Radar de Proximidad" o "Seguimiento en Vivo".`;
  }
  fs.writeFileSync(p, laws, 'utf8');
  console.log(`✅ ${f}: actualizada con regla inquebrantable.`);
});

console.log('🎉 PURGA DE MODO LUZ COMPLETADA EXITOSAMENTE.');
