import fs from 'node:fs';

const filePath = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod\\CODIGO_COMPLETO_REBUSKE_APP_Y_ENTRADA.doc';
const content = fs.readFileSync(filePath, 'utf8');

const regex = /<div class="file-name">\[(\d+\/\d+)\] Archivo: ([^<]+)<\/div>\s*<div class="file-meta">([^<]+)<\/div>/g;
let match;
console.log('LISTADO OFICIAL DE ARCHIVOS VERIFICADOS EN EL DOC:\n');
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
  console.log(`${match[1].padEnd(8)} | ${match[2].padEnd(25)} | ${match[3]}`);
}
console.log(`\nTotal de archivos verificados: ${count}/25`);
