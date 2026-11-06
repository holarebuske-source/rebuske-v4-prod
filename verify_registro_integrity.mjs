import fs from 'fs';

const html = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/registro.html', 'utf8');

console.log('HTML size:', html.length);
const bodyMatches = (html.match(/<\/body>/g) || []).length;
const htmlMatches = (html.match(/<\/html>/g) || []).length;
console.log('Closing </body> count:', bodyMatches);
console.log('Closing </html> count:', htmlMatches);

const lastHtmlIndex = html.lastIndexOf('</html>');
const afterHtml = html.slice(lastHtmlIndex + 7).trim();
console.log('Characters after </html>:', afterHtml.length);
if (afterHtml.length > 0) {
  console.error('LEAK DETECTED:', afterHtml);
} else {
  console.log('✅ ZERO code leak after </html>');
}

const christmasWords = ['navid', 'diciembre', 'flappy', 'reto333', 'reto 333', 'nochebuena'];
christmasWords.forEach(w => {
  const count = (html.toLowerCase().match(new RegExp(w, 'g')) || []).length;
  console.log('Word ' + w + ': ' + count);
});

console.log('Has Mini-Simulador:', html.includes('Mini-Simulador de Bolsillo'));
console.log('Has sim-slider:', html.includes('id="sim-slider"'));
console.log('Has Modo Familiar:', html.includes('Modo Familiar'));
console.log('Has Credencial QR:', html.includes('Credencial QR'));
console.log('Has Bono 15k:', html.includes('TUBONO15K-VIP'));
console.log('Has Acordeón Seguridad:', html.includes('Protocolo Oficial de Seguridad y Garantías'));
console.log('Has Bóveda Wompi:', html.includes('acc-wompi'));
console.log('Has Cero Efectivo:', html.includes('acc-efectivo'));
console.log('Has Peritaje:', html.includes('acc-peritaje'));
console.log('Has Acta PDF:', html.includes('acc-acta'));
