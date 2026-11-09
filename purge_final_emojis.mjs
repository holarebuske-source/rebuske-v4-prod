import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

const finalReplacements = [
  [`🇨🇴`, `Medellín`],
  [`⚡ Diagnosticar Avería`, `Diagnosticar Avería`],
  [`icon: '⚡'`, `icon: 'bolt'`],
  [`⚡ <b>¡PELIGRO ELÉCTRICO!</b>`, `<b>¡PELIGRO ELÉCTRICO!</b>`],
  [`icon: '❄️'`, `icon: 'shield'`],
  [`icon: '❄'`, `icon: 'shield'`],
  [`❄️ Mantén la puerta`, `Mantén la puerta`],
  [`❄️ Apaga el equipo`, `Apaga el equipo`],
  [`<div style="font-size:36px;margin-bottom:8px">⚠️</div>`, `<div style="font-size:24px;margin-bottom:8px;color:#F59E0B;font-weight:800;">[!]</div>`],
  [`✔`, `✓`],
  [`<span style="font-size:18px;">⚡</span>`, `<span style="font-size:14px;color:#B8FF3B;font-weight:900;">SOS</span>`]
];

for (const [target, replacement] of finalReplacements) {
  html = html.split(target).join(replacement);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Final emojis purged!');
