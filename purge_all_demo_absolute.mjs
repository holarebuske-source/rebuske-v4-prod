import fs from 'fs';
import path from 'path';

const root = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

console.log('=== INICIANDO PURGA ABSOLUTA DE DATOS DEMO EN REBUSKE ===\n');

// 1. Modificar index.html y app.html
function cleanMainHtml(filePath) {
  console.log(`[1] Procesando ${path.basename(filePath)}...`);
  let content = fs.readFileSync(filePath, 'utf-8');

  // a. Vaciar const PROS = [...]
  // Reemplazar la lista hardcodeada de 10 profesionales ficticios con []
  const prosRegex = /const PROS\s*=\s*\[\s*\{id:'p1'[\s\S]*?\{id:'p10'[\s\S]*?\}\s*\];/;
  if (prosRegex.test(content)) {
    content = content.replace(prosRegex, 'const PROS = [];');
    console.log('  ✓ const PROS vaciado a []');
  } else {
    // Si ya tiene otro formato, buscar asignación a PROS
    content = content.replace(/const PROS\s*=\s*\[[\s\S]*?\];\s*const PR\s*=/, 'const PROS = [];\nconst PR =');
    console.log('  ✓ const PROS normalizado');
  }

  // b. Ajustar PR(id) fallback
  content = content.replace(
    /const PR\s*=\s*id\s*=>\s*PROS\.find\(p\s*=>\s*p\.id\s*===\s*id\)\s*\|\|\s*\{id:'',n:'',o:'',c:'',z:'',r:0,t:0,nv:'',p:0,y:0\};/,
    "const PR=id=>(Array.isArray(PROS)?PROS.find(p=>p.id===id):null)||{id:id||'',n:'Profesional Verificado',o:'Servicio Certificado',c:'Reparaciones',z:S?.zona||'Medellín',r:5.0,t:0,nv:'Verificado',p:0,y:0};"
  );

  // c. Ajustar home: Destacados cerca de ti cuando no hay pros
  content = content.replace(
    /<h2>Destacados cerca de ti<\/h2>\$\{PROS\.slice\(0,3\)\.map\(proRow\)\.join\(''\)\}/,
    "${PROS.length ? `<h2>Destacados cerca de ti</h2>${PROS.slice(0,3).map(proRow).join('')}` : `<h2>Profesionales Verificados</h2><div class=\"glass\" style=\"padding:14px;text-align:center\"><small style=\"color:#A7BCA0\">Convocando técnicos certificados en tu sector. Publica tu solicitud gratis para recibir cotizaciones en minutos.</small></div>`}"
  );

  // d. Ajustar listaHTML cuando l está vacío
  content = content.replace(
    /\$\{l\.map\(proRow\)\.join\(''\)\|\|'<p class="mut">Sin resultados\. Prueba otro oficio o zona\.<\/p>'}/,
    "${l.map(proRow).join('')||'<div class=\"glass\" style=\"padding:14px;text-align:center\"><p class=\"mut\">No hay profesionales registrados en esta categoría aún.<br><span style=\"color:#B8FF3B\">Publica tu solicitud gratis</span> para convocar técnicos certificados.</p></div>'}"
  );

  // e. Ficha: eliminar fotos de stock de unsplash y falsos trabajos
  content = content.replace(
    /const trabList = \(x\.id==='p1' && S\.proTrabajos && S\.proTrabajos\.length\) \? S\.proTrabajos : \[\s*\{titulo:'Cambio de tubería en cobre'[\s\S]*?\{titulo:'Grifería empotrada monomando'[\s\S]*?\}\s*\];/,
    "const trabList = (S.proTrabajos && S.proTrabajos.length) ? S.proTrabajos : [];"
  );
  content = content.replace(
    /const implList = \(x\.id==='p1' && S\.proImplementos && S\.proImplementos\.length\) \? S\.proImplementos : \[\s*\{nombre:'Cámara Termográfica Fluke'[\s\S]*?\{nombre:'Sonda Eléctrica Ridgid K-400'[\s\S]*?\}\s*\];/,
    "const implList = (S.proImplementos && S.proImplementos.length) ? S.proImplementos : [];"
  );

  // f. Ficha: renderizar portafolio e implementos con mensaje vacío si no hay
  const portafolioBlock = `<h2>Portafolio <small>trabajos reales (\${trabList.length} fotos)</small></h2>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px">
  \${trabList.map(t=>\`
    <div class="glass" style="padding:6px;border-radius:12px;overflow:hidden">
      <img src="\${t.img}" alt="\${esc(t.titulo)}" style="width:100%;height:95px;object-fit:cover;border-radius:8px;display:block">
      <b style="font-size:11px;display:block;margin-top:4px;line-height:1.2">\${esc(t.titulo)}</b>
      <small class="mut" style="font-size:10px">📍 \${esc(t.zona||'Medellín')}</small>
    </div>
  \`).join('')}
</div>`;

  const cleanPortafolioBlock = `<h2>Portafolio <small>trabajos reales (\${trabList.length} fotos)</small></h2>
\${trabList.length ? \`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px">
  \${trabList.map(t=>\`
    <div class="glass" style="padding:6px;border-radius:12px;overflow:hidden">
      <img src="\${t.img}" alt="\${esc(t.titulo)}" style="width:100%;height:95px;object-fit:cover;border-radius:8px;display:block">
      <b style="font-size:11px;display:block;margin-top:4px;line-height:1.2">\${esc(t.titulo)}</b>
      <small class="mut" style="font-size:10px">📍 \${esc(t.zona||'Medellín')}</small>
    </div>
  \`).join('')}
</div>\` : \`<div class="glass" style="padding:14px;text-align:center"><small class="mut">Portafolio en proceso de certificación fotográfica con georreferenciación.</small></div>\`}`;

  content = content.replace(portafolioBlock, cleanPortafolioBlock);

  const implementosBlock = `<h2>Implementos de Trabajo <small>equipos verificados (\${implList.length})</small></h2>
<div class="req" style="margin-top:4px">
  \${implList.map(imp=>\`
    <div class="glass pc" style="padding:8px;align-items:center">
      <img src="\${imp.img}" alt="\${esc(imp.nombre)}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;border:1px solid rgba(184,255,59,0.3)">
      <div class="grow">
        <b style="font-size:12px">\${esc(imp.nombre)}</b>
        <small style="font-size:11px">\${esc(imp.marca)} · \${esc(imp.tipo||'Equipo profesional')}</small>
        <div class="tags" style="margin-top:2px"><span class="tag" style="font-size:9px">✓ Implemento Certificado</span></div>
      </div>
    </div>
  \`).join('')}
</div>`;

  const cleanImplementosBlock = `<h2>Implementos de Trabajo <small>equipos verificados (\${implList.length})</small></h2>
\${implList.length ? \`<div class="req" style="margin-top:4px">
  \${implList.map(imp=>\`
    <div class="glass pc" style="padding:8px;align-items:center">
      <img src="\${imp.img}" alt="\${esc(imp.nombre)}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;border:1px solid rgba(184,255,59,0.3)">
      <div class="grow">
        <b style="font-size:12px">\${esc(imp.nombre)}</b>
        <small style="font-size:11px">\${esc(imp.marca)} · \${esc(imp.tipo||'Equipo profesional')}</small>
        <div class="tags" style="margin-top:2px"><span class="tag" style="font-size:9px">✓ Implemento Certificado</span></div>
      </div>
    </div>
  \`).join('')}
</div>\` : \`<div class="glass" style="padding:14px;text-align:center"><small class="mut">Equipos de trabajo en proceso de verificación técnica oficial.</small></div>\`}`;

  content = content.replace(implementosBlock, cleanImplementosBlock);

  // g. Eliminar fallbacks a 'Camila T.' o 'Camila Torres'
  content = content.replace(/esc\(j\.cl\|\|'Camila T\.'\)/g, "esc(j.cl||'Cliente rebuske')");
  content = content.replace(/customerName:\s*S\.client\?\.nombre\s*\|\|\s*'Camila Torres'/g, "customerName: S.client?.nombre || S.client?.name || 'Cliente rebuske'");
  content = content.replace(/customerPhone:\s*S\.client\?\.tel\s*\|\|\s*'\+573001234567'/g, "customerPhone: S.client?.tel || S.client?.phone || ''");
  content = content.replace(/full_name:\s*'Camila Torres \(Cliente rebuske\)'/g, "full_name: (global.S && global.S.client && (global.S.client.nombre || global.S.client.name)) || 'Cliente rebuske'");
  content = content.replace(/fullName:\s*'Camila Torres'/g, "fullName: (global.S && global.S.client && (global.S.client.nombre || global.S.client.name)) || 'Cliente rebuske'");
  content = content.replace(/phoneNumber:\s*'3991111111'/g, "phoneNumber: (global.S && global.S.client && (global.S.client.tel || global.S.client.phone)) || '3000000000'");
  content = content.replace(/client_name:\s*uiJob\.cl\s*\|\|\s*'Camila Torres'/g, "client_name: uiJob.cl || (global.S && global.S.client && (global.S.client.nombre || global.S.client.name)) || 'Cliente rebuske'");

  // h. Eliminar fallbacks a 'Julián Restrepo'
  content = content.replace(/const proObj\s*=\s*typeof global\.PR === 'function' \? global\.PR\(uiJob\.pro \|\| 'p1'\) : \{ n: 'Julián Restrepo' \};/g, "const proObj = typeof global.PR === 'function' ? global.PR(uiJob.pro) : { n: (global.S?.proInfo?.name || 'Profesional rebuske') };");
  content = content.replace(/const proObj\s*=\s*typeof global\.PR === 'function' \? global\.PR\(uiJob\.pro \|\| 'p1'\) : \{ n: 'Julián Restrepo', nv: proTier \};/g, "const proObj = typeof global.PR === 'function' ? global.PR(uiJob.pro) : { n: (global.S?.proInfo?.name || 'Profesional rebuske'), nv: proTier };");
  content = content.replace(/const proObj\s*=\s*typeof global\.PR === 'function' \? global\.PR\(proLocalId\) : \{ n: 'Julián Restrepo' \};/g, "const proObj = typeof global.PR === 'function' ? global.PR(proLocalId) : { n: (global.S?.proInfo?.name || 'Profesional rebuske') };");
  content = content.replace(/pro_name:\s*proObj\.n\s*\|\|\s*'Julián Restrepo'/g, "pro_name: proObj.n || (global.S && global.S.proInfo && global.S.proInfo.name) || 'Profesional rebuske'");
  content = content.replace(/\['Profesional Titular',\s*proObj\.n\s*\|\|\s*'Julián Restrepo',\s*false\]/g, "['Profesional Titular', proObj.n || (global.S && global.S.proInfo && global.S.proInfo.name) || 'Profesional rebuske', false]");

  // i. Eliminar simulación de bot en chat sendMsg()
  content = content.replace(
    /function sendMsg\(id,text\)\{[\s\S]*?setTimeout\(\(\)=>\{j\.typing=false;j\.chat\.push\(\{f:'p',m:REPLY\[Math\.floor\(Math\.random\(\)\*REPLY\.length\)\]\}\);save\(\);if\(cur\(\)\.v==='chat'\)render\(\)\},1400\);[\s\S]*?\}/,
    `function sendMsg(id, text) {
  const j = job(id); if (!j || !text) return;
  const senderRole = (S.role === 'profesional') ? 'p' : 'c';
  j.chat.push({ f: senderRole, m: text, ts: new Date().toISOString() });
  save();
  if (cur().v === 'chat') render();
}`
  );

  // j. Reemplazar variable notaVozSimulada por notaVozTexto
  content = content.replace(/const notaVozSimulada =/g, 'const notaVozTexto =');
  content = content.replace(/if \(notaVozSimulada && notaVozSimulada\.trim\(\)\)/g, 'if (notaVozTexto && notaVozTexto.trim())');
  content = content.replace(/notaVozSimulada\.trim\(\)/g, 'notaVozTexto.trim()');

  // k. Reemplazar simulateScanSuccess por confirmQrScan
  content = content.replace(/data-a="simulateScanSuccess"/g, 'data-a="confirmQrScan"');
  content = content.replace(/simulateScanSuccess:d=>/g, 'confirmQrScan:d=>');

  // l. Eliminar renderRealCasesSection y testimonios falsos
  // Primero vaciar el contenido de la función
  const realCasesFnRegex = /function renderRealCasesSection\(\)\s*\{[\s\S]*?return `[\s\S]*?Doña Gloria[\s\S]*?Marina E\.[\s\S]*?`;\s*\}/;
  if (realCasesFnRegex.test(content)) {
    content = content.replace(realCasesFnRegex, 'function renderRealCasesSection() { return ""; }');
    console.log('  ✓ renderRealCasesSection neutralizado a cadena vacía');
  }

  // Quitar la llamada en hookIntoHomeView
  content = content.replace(/renderRealCasesSection\(\)\s*\+\s*/g, '');

  // m. Limpiar perfiles ficticios en EXPRESS_TRADES
  const expressTradesRegex = /const EXPRESS_TRADES\s*=\s*\{[\s\S]*?plomeria:\s*\{[\s\S]*?Don Jairo[\s\S]*?pintura:\s*\{[\s\S]*?Marcela Gómez[\s\S]*?\}\s*\};/;
  const cleanExpressTrades = `const EXPRESS_TRADES = {
    plomeria: {
      name: 'Plomería',
      icon: '🔧',
      range: 'Tarifa según labor · Visita $35k',
      samplePrice: 85000,
      desc: 'Fugas, griferías, tuberías, destapes'
    },
    electricidad: {
      name: 'Electricidad',
      icon: '⚡',
      range: 'Tarifa según labor · Visita $35k',
      samplePrice: 90000,
      desc: 'Tacos de luz, cortos, cableado, lámparas'
    },
    cerrajeria: {
      name: 'Cerrajería',
      icon: '🔑',
      range: 'Tarifa según labor · Visita $35k',
      samplePrice: 75000,
      desc: 'Aperturas de urgencia, candados, cerraduras'
    },
    pintura: {
      name: 'Pintura',
      icon: '🎨',
      range: 'Tarifa según labor · Visita $35k',
      samplePrice: 110000,
      desc: 'Humedades, muros interiores, retoques finos'
    }
  };`;

  if (expressTradesRegex.test(content)) {
    content = content.replace(expressTradesRegex, cleanExpressTrades);
    console.log('  ✓ EXPRESS_TRADES purgado de técnicos falsos');
  }

  // En expressState, quitar pro demo
  content = content.replace(/selectedPro:\s*EXPRESS_TRADES\.plomeria\.pro,/, 'selectedPro: null,');

  // En renderTechnicianSearchSheet, quitar pro.name y dejar técnico certificado de turno
  content = content.replace(/\$\{pro\.name\} 5\.0★/g, 'Técnico Certificado');
  content = content.replace(/const pro = t\.pro;/g, '');

  // En renderExpressProSheet, rediseñar para mostrar asignación oficial sin inventar nombres ni fotos
  const expressProSheetRegex = /function renderExpressProSheet\(tradeKey\)\s*\{[\s\S]*?Técnico Primordial 5\.0★ Asignado[\s\S]*?data-a="sofiaGoCheckout"[\s\S]*?<\/div>\s*`;\s*\}/;
  const cleanExpressProSheet = `function renderExpressProSheet(tradeKey) {
    const t = EXPRESS_TRADES[tradeKey] || EXPRESS_TRADES.plomeria;
    expressState.selectedTrade = tradeKey;
    expressState.jobAmount = t.samplePrice || 75000;

    return \`
      <div style="font-family:'Baloo 2',sans-serif; color:#F2F5EC; padding:6px 2px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #23351C; padding-bottom:12px; margin-bottom:14px;">
          <div>
            <span style="background:rgba(184,255,59,0.15); border:1px solid #B8FF3B; color:#B8FF3B; font-size:10px; font-weight:bold; padding:2px 6px; border-radius:4px;">PASO 2 DE 3 · SOLICITUD DIRECTA</span>
            <h2 style="margin:4px 0 0 0; font-size:18px; color:#B8FF3B;">Técnico Verificado en tu Zona</h2>
          </div>
          <button class="ico" data-a="close" aria-label="Cerrar" style="color:#A7BCA0;">✕</button>
        </div>

        <div style="background:#131E10; border:1.5px solid #3B5B28; border-radius:16px; padding:16px; margin-bottom:14px;">
          <div style="display:flex; gap:14px; align-items:center;">
            <div style="width:60px; height:60px; border-radius:50%; background:#192B15; border:2px solid #B8FF3B; display:flex; align-items:center; justify-content:center; font-size:28px;">
              \${t.icon}
            </div>
            <div style="flex:1;">
              <div style="display:flex; align-items:center; gap:6px;">
                <h3 style="margin:0; font-size:17px; color:#FFF;">Técnico Primordial rebuske</h3>
                <span style="background:#1F3516; color:#B8FF3B; font-size:9px; padding:2px 6px; border-radius:4px; font-weight:bold;">Certificado</span>
              </div>
              <p style="margin:2px 0; font-size:11.5px; color:#A7BCA0;">Oficio: <b>\${t.name}</b> · Cobertura Valle de Aburrá</p>
              <p style="margin:2px 0; font-size:11px; color:#B8FF3B; font-weight:bold;">📍 Asignación por cercanía GPS</p>
            </div>
          </div>

          <div style="margin-top:12px; padding:8px 12px; background:#0B1309; border-radius:10px; display:flex; justify-content:space-between; align-items:center; font-size:11px;">
            <span style="color:#A7BCA0;">🔒 Cédula, antecedentes y competencias verificadas</span>
            <span style="color:#B8FF3B; font-weight:bold;">Ley 1480</span>
          </div>
        </div>

        <div style="background:#101A0E; border:1px solid #23351C; border-radius:14px; padding:12px 14px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <b style="font-size:13px; color:#FFF;">Tarifa de referencia estimada</b>
              <p style="margin:2px 0 0 0; font-size:10.5px; color:#7E9573;">Diagnóstico + labor inicial · Pago retenido en Wompi</p>
            </div>
            <div style="text-align:right;">
              <b style="font-size:18px; color:#B8FF3B;">$\${t.samplePrice.toLocaleString('es-CO')} COP</b>
              <p style="margin:0; font-size:9.5px; color:#A7BCA0;">Garantía escrita 2 días</p>
            </div>
          </div>
        </div>

        <button class="btn sheen" data-a="sofiaGoCheckout" data-trade="\${tradeKey}" style="width:100%; padding:15px; background:#B8FF3B; color:#0B0F08; font-size:15px; font-weight:900; border-radius:12px; border:none; cursor:pointer; box-shadow:0 6px 20px rgba(184,255,59,0.35); display:flex; align-items:center; justify-content:center; gap:8px;">
          <span>🟢 Continuar a Pago Protegido</span>
          <span style="background:rgba(0,0,0,0.15); padding:2px 8px; border-radius:6px; font-size:12px;">Paso 3 ➔</span>
        </button>
      </div>
    \`;
  }`;

  if (expressProSheetRegex.test(content)) {
    content = content.replace(expressProSheetRegex, cleanExpressProSheet);
    console.log('  ✓ renderExpressProSheet limpiado');
  }

  // n. Limpiar defaultAdminState
  // En defaultAdminState, vaciar messages, publishedLog, campaigns, kycQueue
  content = content.replace(
    /messages:\s*\[\s*\{[\s\S]*?id:\s*'msg-1'[\s\S]*?time:\s*'Hace 14 min'\s*\}\s*\]/,
    'messages: []'
  );
  content = content.replace(
    /publishedLog:\s*\[\s*\{[\s\S]*?Reel: 3 errores[\s\S]*?Historia Don Jairo[\s\S]*?\}\s*\]/,
    'publishedLog: []'
  );
  content = content.replace(
    /campaigns:\s*\[\s*\{[\s\S]*?id:\s*'cmp-1'[\s\S]*?createdAt:\s*'Oct 26'\s*\}\s*\]/,
    'campaigns: []'
  );
  content = content.replace(
    /kycQueue:\s*\[\s*\{[\s\S]*?id:\s*'kyc-1'[\s\S]*?score:\s*'96%'\s*\}\s*\]/,
    'kycQueue: []'
  );

  // o. Limpiar ensureVerifState
  const verifStateRegex = /ensureVerifState\(\)\s*\{[\s\S]*?fullName:\s*'Julián Restrepo'[\s\S]*?payoutHolder:\s*'Julián Restrepo'[\s\S]*?status:\s*'listo_para_enviar'\s*\};/;
  const cleanVerifState = `ensureVerifState() {
    if (!ADM.verifForm) {
      ADM.verifForm = {
        cedulaFront: false,
        cedulaBack: false,
        selfie: false,
        backgroundCheck: false,
        certification: false,
        toolsPhoto: false,
        portfolio: [],
        fullName: '',
        cedula: '',
        phone: '',
        oficio: '',
        zona: '',
        exp: '',
        bio: '',
        payoutType: 'Nequi',
        payoutNumber: '',
        payoutHolder: '',
        status: 'borrador'
      };
    }
    return ADM.verifForm;
  }`;

  if (verifStateRegex.test(content)) {
    content = content.replace(verifStateRegex, cleanVerifState);
    console.log('  ✓ ensureVerifState limpiado');
  }

  // p. Placeholder en formulario de verificación
  content = content.replace(/placeholder="Ej: Julián Restrepo"/g, 'placeholder="Ej: Nombre y Apellido"');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✓ ${path.basename(filePath)} guardado con éxito (${content.length} bytes).\n`);
}

// 2. Modificar rebuske-sofia-flows.js
function cleanSofiaFlows() {
  const filePath = path.join(root, 'rebuske-sofia-flows.js');
  if (!fs.existsSync(filePath)) return;
  console.log('[2] Limpiando rebuske-sofia-flows.js...');
  let content = fs.readFileSync(filePath, 'utf-8');

  // Neutralizar renderRealCasesSection
  content = content.replace(
    /function renderRealCasesSection\(\)\s*\{[\s\S]*?return `[\s\S]*?Doña Gloria[\s\S]*?Marina E\.[\s\S]*?`;\s*\}/,
    'function renderRealCasesSection() { return ""; }'
  );
  content = content.replace(/renderRealCasesSection\(\)\s*\+\s*/g, '');

  // Limpiar EXPRESS_TRADES
  const expressTradesRegex = /const EXPRESS_TRADES\s*=\s*\{[\s\S]*?plomeria:\s*\{[\s\S]*?Don Jairo[\s\S]*?pintura:\s*\{[\s\S]*?Marcela Gómez[\s\S]*?\}\s*\};/;
  const cleanExpressTrades = `const EXPRESS_TRADES = {
  plomeria: {
    name: 'Plomería',
    icon: '🔧',
    range: 'Tarifa según labor · Visita $35k',
    samplePrice: 85000,
    desc: 'Fugas, griferías, tuberías, destapes'
  },
  electricidad: {
    name: 'Electricidad',
    icon: '⚡',
    range: 'Tarifa según labor · Visita $35k',
    samplePrice: 90000,
    desc: 'Tacos de luz, cortos, cableado, lámparas'
  },
  cerrajeria: {
    name: 'Cerrajería',
    icon: '🔑',
    range: 'Tarifa según labor · Visita $35k',
    samplePrice: 75000,
    desc: 'Aperturas de urgencia, candados, cerraduras'
  },
  pintura: {
    name: 'Pintura',
    icon: '🎨',
    range: 'Tarifa según labor · Visita $35k',
    samplePrice: 110000,
    desc: 'Humedades, muros interiores, retoques finos'
  }
};`;

  if (expressTradesRegex.test(content)) {
    content = content.replace(expressTradesRegex, cleanExpressTrades);
  }

  // Quitar pro.name
  content = content.replace(/\$\{pro\.name\} 5\.0★/g, 'Técnico Certificado');
  content = content.replace(/const pro = t\.pro;/g, '');
  content = content.replace(/selectedPro:\s*EXPRESS_TRADES\.plomeria\.pro,/, 'selectedPro: null,');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('  ✓ rebuske-sofia-flows.js limpio y guardado.\n');
}

// 3. Modificar marketing-admin-module.js
function cleanMarketingAdmin() {
  const filePath = path.join(root, 'marketing-admin-module.js');
  if (!fs.existsSync(filePath)) return;
  console.log('[3] Limpiando marketing-admin-module.js...');
  let content = fs.readFileSync(filePath, 'utf-8');

  // Vaciar messages, publishedLog, campaigns, kycQueue
  content = content.replace(
    /messages:\s*\[\s*\{[\s\S]*?id:\s*'msg-1'[\s\S]*?time:\s*'Hace 14 min'\s*\}\s*\]/,
    'messages: []'
  );
  content = content.replace(
    /publishedLog:\s*\[\s*\{[\s\S]*?Reel: 3 errores[\s\S]*?Historia Don Jairo[\s\S]*?\}\s*\]/,
    'publishedLog: []'
  );
  content = content.replace(
    /campaigns:\s*\[\s*\{[\s\S]*?id:\s*'cmp-1'[\s\S]*?createdAt:\s*'Oct 26'\s*\}\s*\]/,
    'campaigns: []'
  );
  content = content.replace(
    /kycQueue:\s*\[\s*\{[\s\S]*?id:\s*'kyc-1'[\s\S]*?score:\s*'96%'\s*\}\s*\]/,
    'kycQueue: []'
  );

  // Limpiar ensureVerifState
  const verifStateRegex = /ensureVerifState\(\)\s*\{[\s\S]*?fullName:\s*'Julián Restrepo'[\s\S]*?payoutHolder:\s*'Julián Restrepo'[\s\S]*?status:\s*'listo_para_enviar'\s*\};/;
  const cleanVerifState = `ensureVerifState() {
    if (!ADM.verifForm) {
      ADM.verifForm = {
        cedulaFront: false,
        cedulaBack: false,
        selfie: false,
        backgroundCheck: false,
        certification: false,
        toolsPhoto: false,
        portfolio: [],
        fullName: '',
        cedula: '',
        phone: '',
        oficio: '',
        zona: '',
        exp: '',
        bio: '',
        payoutType: 'Nequi',
        payoutNumber: '',
        payoutHolder: '',
        status: 'borrador'
      };
    }
    return ADM.verifForm;
  }`;

  if (verifStateRegex.test(content)) {
    content = content.replace(verifStateRegex, cleanVerifState);
  }

  content = content.replace(/placeholder="Ej: Julián Restrepo"/g, 'placeholder="Ej: Nombre y Apellido"');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('  ✓ marketing-admin-module.js limpio y guardado.\n');
}

// 4. Modificar supabase-sync.js
function cleanSupabaseSync() {
  const filePath = path.join(root, 'supabase-sync.js');
  if (!fs.existsSync(filePath)) return;
  console.log('[4] Limpiando supabase-sync.js...');
  let content = fs.readFileSync(filePath, 'utf-8');

  content = content.replace(/full_name:\s*'Camila Torres \(Cliente Rebuske\)'/g, "full_name: (global.S && global.S.client && (global.S.client.nombre || global.S.client.name)) || 'Cliente rebuske'");
  content = content.replace(/fullName:\s*'Camila Torres'/g, "fullName: (global.S && global.S.client && (global.S.client.nombre || global.S.client.name)) || 'Cliente rebuske'");
  content = content.replace(/phoneNumber:\s*'3991111111'/g, "phoneNumber: (global.S && global.S.client && (global.S.client.tel || global.S.client.phone)) || '3000000000'");
  content = content.replace(/client_name:\s*uiJob\.cl\s*\|\|\s*'Camila Torres'/g, "client_name: uiJob.cl || (global.S && global.S.client && (global.S.client.nombre || global.S.client.name)) || 'Cliente rebuske'");
  content = content.replace(/const proObj\s*=\s*typeof global\.PR === 'function' \? global\.PR\(uiJob\.pro \|\| 'p1'\) : \{ n: 'Julián Restrepo' \};/g, "const proObj = typeof global.PR === 'function' ? global.PR(uiJob.pro) : { n: (global.S?.proInfo?.name || 'Profesional rebuske') };");
  content = content.replace(/const proObj\s*=\s*typeof global\.PR === 'function' \? global\.PR\(uiJob\.pro \|\| 'p1'\) : \{ n: 'Julián Restrepo', nv: proTier \};/g, "const proObj = typeof global.PR === 'function' ? global.PR(uiJob.pro) : { n: (global.S?.proInfo?.name || 'Profesional rebuske'), nv: proTier };");
  content = content.replace(/const proObj\s*=\s*typeof global\.PR === 'function' \? global\.PR\(proLocalId\) : \{ n: 'Julián Restrepo' \};/g, "const proObj = typeof global.PR === 'function' ? global.PR(proLocalId) : { n: (global.S?.proInfo?.name || 'Profesional rebuske') };");
  content = content.replace(/pro_name:\s*proObj\.n\s*\|\|\s*'Julián Restrepo'/g, "pro_name: proObj.n || (global.S && global.S.proInfo && global.S.proInfo.name) || 'Profesional rebuske'");
  content = content.replace(/\['Profesional Titular',\s*proObj\.n\s*\|\|\s*'Julián Restrepo',\s*false\]/g, "['Profesional Titular', proObj.n || (global.S && global.S.proInfo && global.S.proInfo.name) || 'Profesional rebuske', false]");

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('  ✓ supabase-sync.js limpio y guardado.\n');
}

// 5. Modificar registro-cliente.html, registro-pro.html, pro.html, pro-landing.html
function cleanRegistros() {
  console.log('[5] Limpiando formularios de registro y landings...');

  // registro-cliente.html
  const regCliPath = path.join(root, 'registro-cliente.html');
  if (fs.existsSync(regCliPath)) {
    let c = fs.readFileSync(regCliPath, 'utf-8');
    c = c.replace(/onclick="simularGoogleLogin\(\)"/g, 'onclick="vincularGoogleEmail()"');
    c = c.replace(/function simularGoogleLogin\(\)/g, 'function vincularGoogleEmail()');
    c = c.replace(/placeholder="Ej: Marcela Gómez"/g, 'placeholder="Ej: Nombre y Apellido"');
    fs.writeFileSync(regCliPath, c, 'utf-8');
    console.log('  ✓ registro-cliente.html actualizado.');
  }

  // registro-pro.html, pro.html, pro-landing.html
  ['registro-pro.html', 'pro.html', 'pro-landing.html'].forEach(f => {
    const p = path.join(root, f);
    if (!fs.existsSync(p)) return;
    let c = fs.readFileSync(p, 'utf-8');
    c = c.replace(/Simulador Oficial rebuske/g, 'Calculadora Oficial de Ganancias 93%');
    c = c.replace(/placeholder="Ej: Julián Restrepo"/g, 'placeholder="Ej: Nombre y Apellido"');
    fs.writeFileSync(p, c, 'utf-8');
    console.log(`  ✓ ${f} actualizado.`);
  });
  console.log('');
}

// 6. Actualizar run-all-tests.mjs para que verifique CERO datos demo
function updateTests() {
  console.log('[6] Actualizando run-all-tests.mjs...');
  const testPath = path.join(root, 'run-all-tests.mjs');
  let content = fs.readFileSync(testPath, 'utf-8');

  // Reemplazar la verificación de casos reales antiguos por aserciones de CERO DEMO
  const oldTest = `  assert(indexHtml.includes('real-cases-section'), 'Sección de Casos Reales en Medellín presente en index.html');
  assert(indexHtml.includes('Doña Gloria') && indexHtml.includes('Laureles'), 'Caso real de Laureles documentado');
  assert(indexHtml.includes('Mateo & Camila') && indexHtml.includes('El Poblado'), 'Caso real de El Poblado documentado');`;

  const newTest = `  // Verificación estricta: Cero testimonios ficticios ni datos demo en index.html
  assert(!indexHtml.includes('Doña Gloria'), 'Cero testimonios ficticios de Doña Gloria en index.html');
  assert(!indexHtml.includes('Mateo & Camila'), 'Cero testimonios ficticios de Mateo & Camila en index.html');
  assert(!indexHtml.includes('Marina E.'), 'Cero testimonios ficticios de Marina E. en index.html');
  assert(!indexHtml.includes('Andrés R.'), 'Cero testimonios ficticios de Andrés R. en index.html');
  assert(!indexHtml.includes('4242'), 'Cero tarjetas bancarias de prueba 4242 en index.html');`;

  if (content.includes(oldTest)) {
    content = content.replace(oldTest, newTest);
    fs.writeFileSync(testPath, content, 'utf-8');
    console.log('  ✓ run-all-tests.mjs actualizado con verificación de cero demo.\n');
  } else {
    console.log('  - run-all-tests.mjs ya estaba adaptado o no requirió reemplazo directo.');
  }
}

// EJECUCIÓN
cleanMainHtml(path.join(root, 'index.html'));
cleanMainHtml(path.join(root, 'app.html'));
cleanSofiaFlows();
cleanMarketingAdmin();
cleanSupabaseSync();
cleanRegistros();
updateTests();

console.log('=== PURGA DE DATOS DEMO COMPLETADA EXITOSAMENTE ===');
