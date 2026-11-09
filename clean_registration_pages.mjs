import fs from 'fs';
import path from 'path';
import { SVG_ICONS } from './service_icons.mjs';
import { generateRestoredFooterHTML } from './components_refined.mjs';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';

// ============================================================================
// ACTUALIZAR REGISTRO-TECNICO.HTML
// ============================================================================
let tecHtml = fs.readFileSync(path.join(projectDir, 'registro-tecnico.html'), 'utf8');

// Reemplazos de emojis
tecHtml = tecHtml.replace(/🌐 Página Web/g, 'Página Web');
tecHtml = tecHtml.replace(/📱 Abrir App ➔/g, 'Abrir App');
tecHtml = tecHtml.replace(/4\.8★/g, '4.8 Estrellas');
tecHtml = tecHtml.replace(/4\.9★/g, '4.9 Estrellas');
tecHtml = tecHtml.replace(/<div class="kyc-icon">🔄<\/div>/g, `<div class="kyc-icon">${SVG_ICONS.radar}</div>`);
tecHtml = tecHtml.replace(/<div class="kyc-icon">🤳<\/div>/g, `<div class="kyc-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div>`);
tecHtml = tecHtml.replace(/<div class="kyc-icon">👤<\/div>/g, `<div class="kyc-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`);
tecHtml = tecHtml.replace(/<div class="kyc-icon">📜<\/div>/g, `<div class="kyc-icon">${SVG_ICONS.document}</div>`);
tecHtml = tecHtml.replace(/<span>⚖️<\/span>/g, `<span>${SVG_ICONS.profesionales}</span>`);
tecHtml = tecHtml.replace(/⚡<span class="btn-dot"/g, '<span class="btn-dot"');
tecHtml = tecHtml.replace(/<div class="success-icon">🎉<\/div>/g, `<div class="success-icon" style="color:var(--lima);">${SVG_ICONS.check}</div>`);
tecHtml = tecHtml.replace(/Archivo seleccionado ✓/g, 'Archivo seleccionado con éxito');

// Actualizar footer en registro-tecnico.html
const tecFooterIdx = tecHtml.indexOf('<footer');
const tecScriptIdx = tecHtml.indexOf('<script', tecFooterIdx);
if (tecFooterIdx !== -1 && tecScriptIdx !== -1) {
  tecHtml = tecHtml.substring(0, tecFooterIdx) + generateRestoredFooterHTML() + '\n' + tecHtml.substring(tecScriptIdx);
}

fs.writeFileSync(path.join(projectDir, 'registro-tecnico.html'), tecHtml, 'utf8');
console.log('registro-tecnico.html purgado y actualizado.');


// ============================================================================
// ACTUALIZAR REGISTRO-CLIENTE.HTML
// ============================================================================
let cliHtml = fs.readFileSync(path.join(projectDir, 'registro-cliente.html'), 'utf8');

cliHtml = cliHtml.replace(/🌐 Página Web/g, 'Página Web');
cliHtml = cliHtml.replace(/📱 Abrir App ➔/g, 'Abrir App');
cliHtml = cliHtml.replace(/🔔 <strong>Este registro es para recibir el link de Google Play Store/g, `${SVG_ICONS.clock} <strong>Este registro es para recibir el link de Google Play Store`);
cliHtml = cliHtml.replace(/<span style="font-size:24px;">👤<\/span>/g, `<span style="display:inline-flex;color:var(--lima);">${SVG_ICONS.check}</span>`);
cliHtml = cliHtml.replace(/<span>📜 Términos del Bono de Bienvenida/g, `<span>${SVG_ICONS.document} Términos del Bono de Bienvenida`);
cliHtml = cliHtml.replace(/<span>⚖️<\/span>/g, `<span>${SVG_ICONS.profesionales}</span>`);
cliHtml = cliHtml.replace(/⚡<span class="btn-dot"/g, '<span class="btn-dot"');
cliHtml = cliHtml.replace(/<div class="success-icon">🎉<\/div>/g, `<div class="success-icon" style="color:var(--lima);">${SVG_ICONS.check}</div>`);
cliHtml = cliHtml.replace(/Foto seleccionada ✓/g, 'Foto seleccionada con éxito');

// Actualizar footer en registro-cliente.html
const cliFooterIdx = cliHtml.indexOf('<footer');
const cliScriptIdx = cliHtml.indexOf('<script', cliFooterIdx);
if (cliFooterIdx !== -1 && cliScriptIdx !== -1) {
  cliHtml = cliHtml.substring(0, cliFooterIdx) + generateRestoredFooterHTML() + '\n' + cliHtml.substring(cliScriptIdx);
}

fs.writeFileSync(path.join(projectDir, 'registro-cliente.html'), cliHtml, 'utf8');
console.log('registro-cliente.html purgado y actualizado.');
