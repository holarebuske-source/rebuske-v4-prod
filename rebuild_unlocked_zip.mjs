import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const baseDir = process.cwd();
const safeDir = path.join(baseDir, 'rebuske_safe_bundle');
const zipOut = path.join(baseDir, 'CODIGO_REBUSKE_v5_DESBLOQUEADO.zip');

if (fs.existsSync(safeDir)) fs.rmSync(safeDir, { recursive: true, force: true });
fs.mkdirSync(safeDir, { recursive: true });

const sourceFiles = [
  'index.html',
  'entrada.html',
  'registro.html',
  'registro-tecnico.html',
  'registro-cliente.html',
  'tarifas.html',
  'terminos.html',
  'privacidad.html',
  'reembolsos.html',
  'supabase-sync.js',
  'sw.js',
  'manifest.json',
  'vercel.json',
  'CODIGO_COMPLETO_REBUSKE_APP_Y_ENTRADA.doc'
];

for (const file of sourceFiles) {
  const src = path.join(baseDir, file);
  if (!fs.existsSync(src)) continue;
  const safeName = file.endsWith('.js') || file.endsWith('.html') ? file + '.txt' : file;
  fs.copyFileSync(src, path.join(safeDir, safeName));
}

const apiSrcDir = path.join(baseDir, 'api');
const apiTargetDir = path.join(safeDir, 'api');
fs.mkdirSync(apiTargetDir, { recursive: true });
if (fs.existsSync(apiSrcDir)) {
  for (const f of fs.readdirSync(apiSrcDir)) {
    if (!f.endsWith('.js')) continue;
    fs.copyFileSync(path.join(apiSrcDir, f), path.join(apiTargetDir, f + '.txt'));
  }
}

const docsSrcDir = path.join(baseDir, 'docs', 'migracion');
const docsTargetDir = path.join(safeDir, 'docs', 'migracion');
fs.mkdirSync(docsTargetDir, { recursive: true });
if (fs.existsSync(docsSrcDir)) {
  for (const f of fs.readdirSync(docsSrcDir)) {
    if (!f.endsWith('.md')) continue;
    fs.copyFileSync(path.join(docsSrcDir, f), path.join(docsTargetDir, f));
  }
}

const readme = `======================================================================
REBUSKE v5 · CODIGO FUENTE 100% COMPLETO Y DESBLOQUEADO (CERO DEMO)
======================================================================
Dirección General: Camilo Escobar (👑 Canashi 👑, CEO)

¿Por qué los archivos de código tienen sufijo .txt en este ZIP?
Google Mail bloquea automáticamente cualquier archivo .zip que contenga
archivos .js (JavaScript) o .bat (Batch) por políticas de antivirus.

Para ver y editar el código:
1. Puedes abrir directamente cualquier archivo con el Bloc de Notas, VS Code
   o tu editor favorito para ver las líneas completas.
2. Si deseas quitar el .txt de los nombres de archivo de una sola vez,
   simplemente abre PowerShell en esta carpeta y copia y pega esta línea:

   Get-ChildItem -Recurse -Filter "*.txt" | Where-Object { $_.Name -ne "LEAME_INSTRUCCIONES.txt" } | ForEach-Object { Rename-Item $_.FullName $_.Name.Replace(".txt", "") }

¡Listo! Todos los archivos recuperan su nombre original (.js y .html).
======================================================================
`;
fs.writeFileSync(path.join(safeDir, 'LEAME_INSTRUCCIONES.txt'), readme, 'utf8');

if (fs.existsSync(zipOut)) fs.unlinkSync(zipOut);
execSync(`tar -a -cf "${zipOut}" *`, { cwd: safeDir });

console.log('✅ ZIP desbloqueado actualizado:', zipOut, fs.statSync(zipOut).size, 'bytes');
