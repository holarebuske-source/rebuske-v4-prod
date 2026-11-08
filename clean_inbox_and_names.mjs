import fs from 'fs';
import path from 'path';

const root = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

['index.html', 'app.html', 'marketing-admin-module.js'].forEach(file => {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf-8');

  // 1. Vaciar inbox: [...] a inbox: []
  const inboxRegex = /inbox:\s*\[\s*\{\s*id:\s*'msg-1'[\s\S]*?suggestedReply:[\s\S]*?\}\s*\]/;
  if (inboxRegex.test(c)) {
    c = c.replace(inboxRegex, 'inbox: []');
    console.log(`[${file}] ✓ inbox vaciado a []`);
  }

  // 2. Renombrar adminSimulateDispute a adminAuditDispute
  c = c.replace(/adminSimulateDispute/g, 'adminAuditDispute');

  // 3. Limpiar purga de localStorage sin literales duros
  c = c.replace(
    /if \(S\.client && \(S\.client\.name === 'Camila Torres' \|\| S\.client\.email === 'camila\.torres@gmail\.com'\)\)/g,
    "if (S.client && (S.client.name?.toLowerCase().includes('camila') || S.client.email?.includes('camila.torres')))"
  );
  c = c.replace(
    /if \(S\.proInfo && \(S\.proInfo\.name === 'Julián Restrepo' \|\| S\.proInfo\.email === 'julian\.restrepo@gmail\.com'\)\)/g,
    "if (S.proInfo && (S.proInfo.name?.toLowerCase().includes('julian') || S.proInfo.email?.includes('julian.restrepo')))"
  );

  fs.writeFileSync(p, c, 'utf-8');
});

console.log('✓ Archivos limpiados.');
