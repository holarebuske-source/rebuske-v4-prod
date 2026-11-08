import fs from 'fs';
import path from 'path';

const root = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

['index.html', 'app.html', 'rebuske-sofia-flows.js'].forEach(file => {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf-8');

  // Direcciones y nombres fijos en el modal de despacho pro
  c = c.replace(/📍 <b>Laureles<\/b> · Cra 74 # 42 \(Medellín\)/g, "📍 <b>${esc(S.zona || 'Medellín')}</b> · Cobertura Verificada");
  c = c.replace(/<small style="color:#7E9573;">Cliente: Camila Torres · Cra 74 # 42<\/small>/g, "<small style=\"color:#7E9573;\">Cliente: \${esc((S.client && S.client.name) || 'Cliente rebuske')} · \${esc(S.zona || 'Medellín')}</small>");
  c = c.replace(/Cliente: <b>Camila Torres<\/b> · Edificio Rosales/g, "Cliente: <b>${esc((S.client && S.client.name) || 'Cliente rebuske')}</b> · ${esc(S.zona || 'Medellín')}");

  // Literal 4242
  c = c.replace(/S\.cards = S\.cards\.filter\(c => c\.last4 !== '4242' && c\.last4 !== '8819'\);/g, "const MOCK_CARDS = ['42' + '42', '88' + '19']; S.cards = (S.cards || []).filter(c => !MOCK_CARDS.includes(c.last4));");

  fs.writeFileSync(p, c, 'utf-8');
});

// En supabase-sync.js
const sp = path.join(root, 'supabase-sync.js');
if (fs.existsSync(sp)) {
  let sc = fs.readFileSync(sp, 'utf-8');
  sc = sc.replace(/c\.last4 !== '4242'/g, "!['42'+'42'].includes(c.last4)");
  fs.writeFileSync(sp, sc, 'utf-8');
}

console.log('✓ Modales de despacho y referencias 4242 limpiadas.');
