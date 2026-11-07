import fs from 'fs';
import path from 'path';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const indexPath = path.join(baseDir, 'index.html');

let idx = fs.readFileSync(indexPath, 'utf8');

// 1. Reemplazar array CATS con las 17 categorías
const oldCatsRegex = /const CATS=\[\[['"]Hogar['"][\s\S]*?\]\];/;
const newCats = `const CATS = [
  ['Limpieza y Aseo', 'home'],
  ['Plomería', 'tool'],
  ['Electricidad', 'tool'],
  ['Pintura y Acabados', 'tool'],
  ['Carpintería', 'tool'],
  ['Cerrajería y Seguridad', 'shield'],
  ['Jardinería y Exteriores', 'home'],
  ['Construcción y Remodelación', 'tool'],
  ['Mudanzas y Transporte', 'bag'],
  ['Electrodomésticos', 'tool'],
  ['Tecnología e Instalación', 'shield'],
  ['Automóviles', 'pin'],
  ['Diseño y Servicios Digitales', 'star'],
  ['Clases y Educación (Música & Refuerzo)', 'user'],
  ['Belleza y Cuidado Personal', 'user'],
  ['Eventos y Celebraciones', 'star'],
  ['Servicios Profesionales', 'wallet']
];`;

if (oldCatsRegex.test(idx)) {
  idx = idx.replace(oldCatsRegex, newCats);
  console.log('✅ CATS actualizado con las 17 categorías en index.html');
}

// 2. En la vista de solicitud, añadir la opción de modalidad de pago
const oldSeg = `<small>Tipo de trabajo</small>
<div class="seg">\${['Corto','Mediano','Largo'].map(s=>\`<button data-a="seg" class="\${(p.k||'Corto')===s?'on':''}">\${s}</button>\`).join('')}</div>`;

const newSeg = `<small>Modalidad de Pago en Bóveda Wompi</small>
<div class="seg">\${['Labor Única','Sesiones Progresivas (Clases)','Hitos de Proyecto'].map(s=>\`<button data-a="seg" class="\${(p.k||'Labor Única')===s?'on':''}">\${s}</button>\`).join('')}</div>`;

if (idx.includes(oldSeg)) {
  idx = idx.replace(oldSeg, newSeg);
  console.log('✅ Modalidad de pago en Bóveda Wompi (Labor vs Sesiones Progresivas vs Hitos) integrada en solicitud');
}

fs.writeFileSync(indexPath, idx, 'utf8');
console.log('✅ index.html guardado.');
