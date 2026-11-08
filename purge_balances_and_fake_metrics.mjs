import fs from 'fs';
import path from 'path';

const root = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

console.log('=== PURGANDO SALDOS FICTICIOS Y MÉTRICAS HARDCODEADAS ===\n');

// 1. Modificar index.html y app.html
['index.html', 'app.html'].forEach(filename => {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) return;
  console.log(`[1] Limpiando ${filename}...`);
  let c = fs.readFileSync(filePath, 'utf-8');

  // a. INGRESOS array a []
  c = c.replace(/const INGRESOS\s*=\s*\[40,55,48,70,62,90\];/, 'const INGRESOS = [];');

  // b. barsHTML adaptativo
  const oldBars = /const barsHTML\s*=\s*\(\)\s*=>`[\s\S]*?<\/div>`;/;
  const newBars = `const barsHTML = () => {
  const califJobs = (S.jobs || []).filter(j => j.s === 'calificado');
  if (!califJobs.length) {
    return \`<div style="padding:16px;text-align:center"><small class="mut">Sin cobros registrados este mes.</small></div>\`;
  }
  return \`<div class="chart">\${MESES.map((m, i) => \`<div class="b" style="--i:\${i};--h:0%"></div>\`).join('')}\${chartSVG()}</div><div class="months">\${MESES.map(m => \`<span>\${m}</span>\`).join('')}</div>\`;
};`;
  c = c.replace(oldBars, newBars);

  // c. pFin cuando no hay profesional registrado
  const oldPFinRegex = /const pFin\s*=\s*\(\)\s*=>\s*\{[\s\S]*?const saldoDisp[\s\S]*?Descargar certificado de ingresos<\/button>`;\s*\};/;
  const newPFin = `const pFin = () => {
  const isRegistered = Boolean(S.proInfo && (S.proInfo.name || S.proInfo.email));
  const califJobs = (S.jobs || []).filter(j => j.s === 'calificado');
  const hasHistory = califJobs.length > 0 || (S.wal && (S.wal.saldo > 0 || S.wal.pend > 0));

  if (!isRegistered && !hasHistory) {
    return \`<div class="ctr sm" style="padding:28px 16px;text-align:center;">
      <div style="font-size:36px;margin-bottom:10px">💼</div>
      <h2 style="margin-bottom:8px">Billetera de Ingresos</h2>
      <p class="mut txtc" style="margin-bottom:18px">No hay profesionales registrados ni saldo disponible en esta sesión.<br>Regístrate como profesional para habilitar tu billetera y cobrar al 93% neto con Bóveda Wompi.</p>
      <a href="/registro/tecnico" class="btn sheen" style="display:inline-block;padding:12px 22px;text-decoration:none;font-weight:900;background:#B8FF3B;color:#111;border-radius:12px">Registrarme como Profesional ➔</a>
    </div>\`;
  }

  const saldoDisp = (S.wal && S.wal.saldo) ? S.wal.saldo : 0;
  const saldoPend = (S.wal && S.wal.pend) ? S.wal.pend : 0;
  const ultJob = califJobs.length ? califJobs[califJobs.length - 1] : null;
  const ultV = ultJob ? ultJob.v : 0;
  const ultCom = Math.round(ultV * 0.07);
  const ultNeto = ultV - ultCom;
  const proNivel = S.proInfo?.nivel || S.proInfo?.nv || 'Bronce';
  const proRating = (S.proInfo?.r || 5.0).toFixed(1);

  return \`<div class="glass wallet">
    <small>Saldo disponible</small>
    <b class="big">\${RL(M(saldoDisp))}</b>
    <small>+ \${M(saldoPend)} pendiente por liberar</small>
    <button class="btn" data-a="retiro" \${saldoDisp > 0 ? '' : 'disabled'} style="margin-top:6px">Retirar ahora</button>
    <small>Retiros cada 4 días · Nequi, Daviplata o cuenta bancaria</small>
  </div>
  <h2>Ingresos por mes <small>netos</small></h2>
  <div class="glass">
    \${califJobs.length ? barsHTML() : '<div style="padding:16px;text-align:center"><small class="mut">Tus métricas de ingresos mensuales se generarán automáticamente al completar tus primeros servicios.</small></div>'}
  </div>
  <h2>Reputación</h2>
  <div class="glass pc">
    <span class="ibox">\${LZ()}</span>
    <div class="grow">
      <b>Nivel \${esc(proNivel)} · \${proRating}★</b>
      <small>Comisión 7% en Bóveda Wompi (93% neto para ti).</small>
      <div class="prog" style="--w:\${proNivel === 'Oro' ? 94 : 93}%"><i></i></div>
    </div>
  </div>
  \${ultJob ? \`<div class="glass rows"><div><span>Último trabajo</span><b>\${M(ultV)}</b></div><div><span>Comisión rebuske (7%)</span><b>−\${M(ultCom)}</b></div><div><span>Recibes</span><b class="lima">\${M(ultNeto)}</b></div></div>\` : \`<div class="glass center" style="padding:14px;text-align:center"><p class="mut">Aún no registras cobros finalizados este mes.</p></div>\`}
  <button class="btn ghost" data-a="cert" \${califJobs.length ? '' : 'disabled'}>Descargar certificado de ingresos</button>\`;
};`;
  c = c.replace(oldPFinRegex, newPFin);

  // d. Asegurar que S.wal sea estrictamente 0 si no hay trabajos
  c = c.replace(
    /if \(S\.wal && S\.wal\.saldo === 186000 && S\.wal\.pend === 112000 && \(!S\.jobs \|\| !S\.jobs\.length\)\) \{\s*S\.wal = \{saldo:0,pend:0\};\s*\}/,
    `if (!S.jobs || !S.jobs.some(j => j.s === 'calificado' || j.s === 'liberado')) {
  S.wal = { saldo: 0, pend: 0 };
}`
  );

  // e. baseGMV = 14850000 -> baseGMV = 0
  c = c.replace(/const baseGMV = 14850000;/g, 'const baseGMV = 0;');

  // f. gmvSeries ficticio
  c = c.replace(/const gmvSeries = \[52, 64, 61, 78, 85, 96\];/g, 'const gmvSeries = [0, 0, 0, 0, 0, 0];');

  // g. Disponible Wallet rebuskers 186000
  c = c.replace(
    /<div><span>Disponible Wallet rebuskers<\/span><b>\$\{fmtMoney\(\(global\.S && global\.S\.wal && global\.S\.wal\.saldo\) \|\| 186000\)\}<\/b><\/div>/g,
    '<div><span>Disponible Wallet rebuskers</span><b>${fmtMoney((global.S && global.S.wal && Number(global.S.wal.saldo)) || 0)}</b></div>'
  );

  fs.writeFileSync(filePath, c, 'utf-8');
  console.log(`  ✓ ${filename} actualizado.`);
});

// 2. Modificar marketing-admin-module.js
const mktPath = path.join(root, 'marketing-admin-module.js');
if (fs.existsSync(mktPath)) {
  console.log('[2] Limpiando marketing-admin-module.js...');
  let mc = fs.readFileSync(mktPath, 'utf-8');
  mc = mc.replace(/const baseGMV = 14850000;/g, 'const baseGMV = 0;');
  mc = mc.replace(/const gmvSeries = \[52, 64, 61, 78, 85, 96\];/g, 'const gmvSeries = [0, 0, 0, 0, 0, 0];');
  mc = mc.replace(
    /<div><span>Disponible Wallet Rebuskers<\/span><b>\$\{fmtMoney\(\(global\.S && global\.S\.wal && global\.S\.wal\.saldo\) \|\| 186000\)\}<\/b><\/div>/g,
    '<div><span>Disponible Wallet Rebuskers</span><b>${fmtMoney((global.S && global.S.wal && Number(global.S.wal.saldo)) || 0)}</b></div>'
  );
  fs.writeFileSync(mktPath, mc, 'utf-8');
  console.log('  ✓ marketing-admin-module.js actualizado.');
}

// 3. Modificar api/wompi.js
const wompiApiPath = path.join(root, 'api/wompi.js');
if (fs.existsSync(wompiApiPath)) {
  console.log('[3] Limpiando api/wompi.js...');
  let wc = fs.readFileSync(wompiApiPath, 'utf-8');
  wc = wc.replace(/customerName: customerName \|\| 'Camila Torres',/g, "customerName: customerName || 'Cliente rebuske',");
  fs.writeFileSync(wompiApiPath, wc, 'utf-8');
  console.log('  ✓ api/wompi.js actualizado.');
}

// 4. Modificar api/chat.js
const chatApiPath = path.join(root, 'api/chat.js');
if (fs.existsSync(chatApiPath)) {
  console.log('[4] Limpiando api/chat.js...');
  let cc = fs.readFileSync(chatApiPath, 'utf-8');
  cc = cc.replace(/3\. 🤝 Voz a voz con Don Jairo y los primeros pros: Que inviten a 2 colegas con prioridad de asignación\.\\n/g, '3. 🤝 Voz a voz con los primeros profesionales verificados: Que inviten a 2 colegas con prioridad de asignación.\\n');
  fs.writeFileSync(chatApiPath, cc, 'utf-8');
  console.log('  ✓ api/chat.js actualizado.');
}

console.log('\n=== PURGA DE SALDOS Y MÉTRICAS COMPLETADA ===');
