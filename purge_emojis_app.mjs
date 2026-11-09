import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Backup
fs.writeFileSync('index.html.backup_pre_purge', html, 'utf8');

// Replace specific emoji strings with clean professional equivalents
const replacements = [
  // Ellas & SENA badges
  [`<span style="color:#39A900;font-weight:700">🎓 SENA</span>`, `<span style="color:#39A900;font-weight:700">✓ Certificado SENA</span>`],
  [`<span style="color:#EC4899;font-weight:700">🌸 Ellas</span>`, `<span style="color:#EC4899;font-weight:700">✓ Ellas Construyen</span>`],
  [`🎓 Certificado SENA`, `✓ Certificado SENA`],
  [`🌸 Ellas Construyen`, `✓ Ellas Construyen`],
  [`<i>🌸</i>`, `<i>\${I('user',24)}</i>`],

  // Buttons & Labels
  [`<span>💬 Pedir Urgencia por WhatsApp</span>`, `<span>Pedir Urgencia por WhatsApp</span>`],
  [`<span>💬 Despacho Prioritario por WhatsApp</span>`, `<span>Despacho Prioritario por WhatsApp</span>`],
  [`<span style="font-size:20px">🔍</span>`, `<span style="font-size:16px">\${I('search',18)}</span>`],
  [`🛡️`, `✓`],
  [`🛡`, `✓`],
  [`📷 Escanear QR`, `Escanear QR`],
  [`⚡ Abrir Escáner`, `Abrir Escáner`],
  [`📷 Verificar QR`, `Verificar QR`],
  [`🎁 Bono VIP Play Store`, `Bono VIP Play Store`],
  [`🎁 ¡Tu Bono VIP`, `¡Tu Bono VIP`],
  [`📜 3 Reglas de Oro`, `3 Reglas de Oro`],
  [`Editar Datos ✏️`, `Editar Datos`],
  [`Editar Perfil ✏️`, `Editar Perfil`],
  [`familia ⚙️`, `familia (Ajustes)`],
  [`📞 `, `Tel: `],
  [`📍 `, ``],
  [`📄 Descargar PDF`, `Descargar PDF`],
  [`📷 Subir Foto de Trabajo Real`, `Subir Foto de Trabajo Real`],
  [`🛠️ Registrar Herramienta o Equipo`, `Registrar Herramienta o Equipo`],
  [`<div style="font-size:36px;margin-bottom:10px">💼</div>`, `<div style="margin-bottom:10px">\${I('bag',36)}</div>`],
  [`\${c.brand.toLowerCase().includes('visa') ? '💳' : '🏦'}`, `\${c.brand.toLowerCase().includes('visa') ? 'Tarjeta' : 'Bancolombia'}`],
  [`<span>🔒</span>`, `<span>\${I('shield',16)}</span>`],
  [`<span style="font-size:42px;display:block;margin-bottom:8px">🔒</span>`, `<span style="display:block;margin-bottom:8px">\${I('shield',42)}</span>`],
  [`<span style="font-size:42px; display:block; margin-bottom:8px;">📸</span>`, `<span style="display:block;margin-bottom:8px">\${I('user',42)}</span>`],
  [`📷 Subir / Cambiar Nueva Foto`, `Subir / Cambiar Nueva Foto`],
  [`🗑️ Quitar Foto de Perfil`, `Quitar Foto de Perfil`],
  [`📷 Tomar / Adjuntar Foto del Arreglo`, `Tomar / Adjuntar Foto del Arreglo`],
  [`<span style="font-size:28px">🚨</span>`, `<span style="font-size:16px">\${I('bolt',24)}</span>`],
  [`🚨 Solicitud Express activada`, `Solicitud Express activada`],
  [`<span style="font-size:18px;">🛵</span>`, `<span style="font-size:16px">\${I('pin',18)}</span>`],
  [`<span style="font-size:18px;">⚡</span>`, `<span style="font-size:16px">\${I('bolt',18)}</span>`],
  [`<span>🟢 Ver Técnico de Turno`, `<span>Ver Técnico de Turno`],
  [`<span>🟢 Continuar a Pago Protegido`, `<span>Continuar a Pago Protegido`],
  [`<span style="font-size:24px;">🟢</span>`, `<span>✓</span>`],
  [`💰 89% neto pagado`, `89% neto pagado`],
  [`🚀 FINALIZAR Y COBRAR`, `FINALIZAR Y COBRAR`],
  [`<span style="font-size:22px;">🍪</span>`, `<span style="font-size:18px">\${I('shield',20)}</span>`],

  // Diagnostic chips
  [`💧 Fuga / Grifo`, `Fuga / Grifo`],
  [`⚡ Corto / Brequera`, `Corto / Brequera`],
  [`🔥 Calentador a gas`, `Calentador a gas`],
  [`❄️ Nevera / No enfría`, `Nevera / No enfría`],
  [`🧺 Lavadora / Centrifugado`, `Lavadora / Centrifugado`],
  [`🔑 Chapa / Llave trabada`, `Chapa / Llave trabada`],
  [`🌧️ Gotera / Techo`, `Gotera / Techo`],
  [`🧱 Humedad / Pared`, `Humedad / Pared`],
  [`🚪 Mueble / Bisagra`, `Mueble / Bisagra`],
  [`❄️ Aire acondicionado`, `Aire acondicionado`],

  // Microphone and voice
  [`ic.textContent = '🎙️'`, `ic.textContent = 'Audio'`],
  [`ic.textContent = '🔴'`, `ic.textContent = 'Grabando...'`],
  [`toast('🎙️ Habla ahora`, `toast('Habla ahora`],
  [`toast('⚠️ `, `toast('`],
  [`toast('🚨 `, `toast('`],
  [`toast('✅ `, `toast('✓ `],
  [`toast('👩 `, `toast('`],
  [`toast('🔍 `, `toast('`],
  [`toast('📸 `, `toast('`],
  [`toast('💸 `, `toast('`],
  [`toast('🛡️ `, `toast('`],
  [`⚠️ `, ``],
  [`✅ `, `✓ `],
  [`⚡ Ya solucioné`, `Ya solucioné`],
  [`📍 Me equivoqué`, `Me equivoqué`],
  [`🔄 Prefiero reprogramar`, `Prefiero reprogramar`]
];

for (const [target, replacement] of replacements) {
  html = html.split(target).join(replacement);
}

// Clean any leftover raw emoji symbols
html = html.replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html emojis purged successfully!');
