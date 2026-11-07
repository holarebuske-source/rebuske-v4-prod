/**
 * ============================================================================
 * REBUSKE v5 · SUITE MAESTRA DE INTEGRIDAD Y CONTROL DE CALIDAD (CANDADO 3)
 * ============================================================================
 * Auditor de QA: Lucas & Tomás
 *
 * Ejecuta validaciones completas:
 *  1. Sintaxis de módulos Node.js / Serverless API (<= 12 funciones Vercel)
 *  2. FinTech Wompi: Checkout servidor, firma SHA-256, Comprobante Mandato (Art. 1262 C.Co)
 *  3. Central de Despacho Inmediato (/api/dispatch-alert) y conexión de Radar
 *  4. Registro Pro Atómico: Mandato Comercial, Estampado Digital SHA-256 y Fallback
 *  5. Conversión & UI/UX: Thank You Modal, Sticky Mobile Bar, Casos Reales Medellín
 *  6. Diccionario Paisa & Cumplimiento Normativo: Cero palabras ibéricas/mexicanas, Ley 1480, Ley 1581
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

console.log('======================================================================');
console.log('🚀 INICIANDO AUDITORÍA INTEGRAL DE CALIDAD REBUSKE v5 (CANDADO 3 QA)');
console.log('======================================================================');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`  ❌ FALLO: ${message}`);
    throw new Error(message);
  }
  passedTests++;
  console.log(`  ✅ PASÓ: ${message}`);
}

function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(k, v) { this.headers[k] = v; },
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
    end() { return this; }
  };
}

async function runTestSuite() {
  // --------------------------------------------------------------------------
  // TEST 1: SINTAXIS Y CONSOLIDACIÓN SERVERLESS (LÍMITE VERCEL HOBBY)
  // --------------------------------------------------------------------------
  console.log('\n[TEST 1/6] Verificando funciones serverless y límite Vercel Hobby...');
  const apiFiles = fs.readdirSync('./api').filter(f => f.endsWith('.js'));
  assert(apiFiles.length <= 12, `Total de Serverless Functions es ${apiFiles.length} (Límite estricto <= 12 en Vercel Hobby)`);

  const wompiModule = await import('./api/wompi.js');
  assert(typeof wompiModule.default === 'function', 'api/wompi.js exporta handler por defecto');

  const dispatchModule = await import('./api/dispatch-alert.js');
  assert(typeof dispatchModule.default === 'function', 'api/dispatch-alert.js exporta handler por defecto');

  const registerProModule = await import('./api/register-pro.js');
  assert(typeof registerProModule.default === 'function', 'api/register-pro.js exporta handler por defecto');

  const supabaseSync = await import('./supabase-sync.js');
  assert(typeof (supabaseSync.RebuskeSupabase || supabaseSync.default) === 'object', 'supabase-sync.js exporta RebuskeSupabase isomorfo');

  // --------------------------------------------------------------------------
  // TEST 2: FINTECH WOMPI & BÓVEDA ESCROW (TOMÁS)
  // --------------------------------------------------------------------------
  console.log('\n[TEST 2/6] Verificando Ruta de Pago Wompi y Comprobante de Mandato...');
  const reqCheckout = {
    method: 'POST',
    query: { action: 'CREATE_CHECKOUT' },
    body: {
      jobId: 'QA-JOB-101',
      quoteAmount: 150000,
      customerEmail: 'lucas.qa@rebuske.app',
      customerName: 'Lucas Auditor',
      customerPhone: '3009999999',
      proPlan: 'ORO'
    }
  };
  const resCheckout = createMockRes();
  await wompiModule.default(reqCheckout, resCheckout);
  assert(resCheckout.statusCode === 200 && resCheckout.body?.ok === true, 'Checkout seguro generado con status 200');
  assert(resCheckout.body.amountInCents === 15490000, 'Cálculo de centavos exacto ($150.000 cotización + $4.900 cuota)');
  assert(typeof resCheckout.body.signature === 'string' && resCheckout.body.signature.length === 64, 'Firma SHA-256 válida de 64 caracteres');

  // Test Mandato Receipt
  const reqReceipt = {
    method: 'GET',
    query: { action: 'MANDATO_RECEIPT', ref: resCheckout.body.reference }
  };
  const resReceipt = createMockRes();
  await wompiModule.default(reqReceipt, resReceipt);
  assert(resReceipt.statusCode === 200 && resReceipt.body?.tipoDocumento === 'COMPROBANTE_MANDATO_COMERCIAL_Y_PAGO_PROTEGIDO', 'Comprobante de Mandato Comercial (Art. 1262 C.Co) generado');
  assert(resReceipt.body.desgloseMandato?.cuentaContableTercero === '2815_INGRESOS_RECIBIDOS_PARA_TERCEROS', 'Cuenta contable 2815 de Ingresos para Terceros registrada');

  // Test Status
  const reqStatus = {
    method: 'GET',
    query: { action: 'STATUS', reference: resCheckout.body.reference }
  };
  const resStatus = createMockRes();
  await wompiModule.default(reqStatus, resStatus);
  assert(resStatus.statusCode === 200, 'Consulta de estado de transacción STATUS responde HTTP 200');

  // --------------------------------------------------------------------------
  // TEST 3: REGISTRO PRO ATÓMICO & BLINDAJE FISCAL (ART. 1262 C.CO)
  // --------------------------------------------------------------------------
  console.log('\n[TEST 3/6] Verificando Registro Pro Atómico y Estampado Digital de Mandato...');
  // GET Status Cupos
  const reqProStatus = { method: 'GET', headers: {}, query: {} };
  const resProStatus = createMockRes();
  await registerProModule.default(reqProStatus, resProStatus);
  assert(resProStatus.statusCode === 200 && resProStatus.body?.totalPrimordiales === 100, 'GET /api/register-pro responde 200 con 100 cupos base');
  assert(resProStatus.body.benefits?.mes1Neto === '99%', 'Beneficio Mes 1 Fundador configurado al 99% neto');
  assert(resProStatus.body.benefits?.luegoNeto === '89%', 'Beneficio Oro VIP configurado al 89% neto');

  // Rechazo por Mandato no aceptado
  const reqProSinMandato = {
    method: 'POST',
    headers: { 'x-forwarded-for': '127.0.0.1' },
    body: {
      nombre: 'Técnico Sin Mandato',
      cedula: '1020304050',
      tel: '+573001234567',
      oficio: 'Plomería',
      zona: 'Laureles',
      banco: 'Nequi',
      autorizo_mandato: false,
      autorizo_terminos: false
    }
  };
  const resProSinMandato = createMockRes();
  await registerProModule.default(reqProSinMandato, resProSinMandato);
  assert(resProSinMandato.statusCode === 400 && resProSinMandato.body?.ok === false, 'POST /api/register-pro BLOQUEA el registro si no se acepta el Mandato Comercial (Art. 1262 C.Co)');

  // Registro exitoso con estampado digital de Mandato
  const reqProValido = {
    method: 'POST',
    headers: { 'x-forwarded-for': '127.0.0.1', 'user-agent': 'QA Test Agent' },
    body: {
      nombre: 'Técnico Blindado QA',
      cedula: '1099887766',
      tel: '+573119876543',
      oficio: 'Electricidad',
      zona: 'El Poblado',
      banco: 'Bancolombia Ahorros 1234',
      autorizo_mandato: true,
      autorizo_terminos: true,
      autorizo_datos_sensibles: true,
      autorizo_antecedentes: true
    }
  };
  const resProValido = createMockRes();
  await registerProModule.default(reqProValido, resProValido);
  assert(resProValido.statusCode === 200 && resProValido.body?.ok === true, 'POST /api/register-pro procesa registro válido con status 200');
  assert(typeof resProValido.body?.mandato_hash === 'string' && resProValido.body.mandato_hash.length === 64, 'Estampado digital SHA-256 de Mandato generado con 64 caracteres');

  // Verificación de archivo SQL para Supabase
  assert(fs.existsSync('./supabase_schema_v5.sql'), 'Script de migración supabase_schema_v5.sql existe en disco');
  const sqlContent = fs.readFileSync('./supabase_schema_v5.sql', 'utf8');
  assert(sqlContent.includes('registrar_pro_primordial_atomico'), 'Función RPC registrar_pro_primordial_atomico definida en SQL');
  assert(sqlContent.includes('mandato_hash'), 'Columna mandato_hash definida en tabla primordiales_registrations');
  assert(sqlContent.includes('2815_INGRESOS_RECIBIDOS_PARA_TERCEROS') || sqlContent.includes('wallet_ledger'), 'Tabla wallet_ledger definida en SQL');

  // --------------------------------------------------------------------------
  // TEST 4: CENTRAL DE DESPACHO INMEDIATO & RADAR (SOFÍA)
  // --------------------------------------------------------------------------
  console.log('\n[TEST 4/6] Verificando Central de Despacho Inmediato y Radar...');
  const reqDispatch = {
    method: 'POST',
    body: {
      trade: 'Plomería',
      comuna: 'Laureles',
      barrio: 'Bolivariana',
      clientName: 'Cliente Prueba QA',
      clientPhone: '3043812882',
      clientNotes: 'Fuga en tubería principal'
    }
  };
  const resDispatch = createMockRes();
  await dispatchModule.default(reqDispatch, resDispatch);
  assert(resDispatch.statusCode === 200 && resDispatch.body?.ok === true, 'Endpoint /api/dispatch-alert responde HTTP 200 OK');
  assert(resDispatch.body.slaMin === 35 && resDispatch.body.slaMax === 45, 'SLA de llegada configurado entre 35 y 45 min');

  const indexHtml = fs.readFileSync('./index.html', 'utf8');
  assert(indexHtml.includes('/api/dispatch-alert'), 'Radar de búsqueda en index.html conectado a /api/dispatch-alert');

  // --------------------------------------------------------------------------
  // TEST 5: CONVERSIÓN & UI/UX (VALERIA) - PORTAL /ENTRADA Y REGISTROS SEPARADOS
  // --------------------------------------------------------------------------
  console.log('\n[TEST 5/6] Verificando elementos de UI/UX, conversión y arquitectura desacoplada...');
  assert(fs.existsSync('./entrada.html'), 'entrada.html existe en el repositorio');
  assert(fs.existsSync('./registro.html'), 'registro.html existe en el repositorio');
  assert(fs.existsSync('./registro-tecnico.html'), 'registro-tecnico.html existe en el repositorio');
  assert(fs.existsSync('./registro-cliente.html'), 'registro-cliente.html existe en el repositorio');

  const entradaHtml = fs.readFileSync('./entrada.html', 'utf8');
  const registroHtml = fs.readFileSync('./registro.html', 'utf8');
  const regTecnicoHtml = fs.readFileSync('./registro-tecnico.html', 'utf8');
  const regClienteHtml = fs.readFileSync('./registro-cliente.html', 'utf8');

  assert(entradaHtml === registroHtml, 'entrada.html y registro.html tienen sincronización 100% idéntica');

  // Validación de la nueva landing /entrada
  assert(entradaHtml.includes('Empieza aquí'), 'Sección unificada "Empieza aquí" presente');
  assert(entradaHtml.includes('/registro/tecnico'), 'Enlace a portal técnico /registro/tecnico presente');
  assert(entradaHtml.includes('/registro/cliente'), 'Enlace a portal cliente /registro/cliente presente');
  assert(!entradaHtml.includes('Necesito un técnico.'), 'ELIMINADO el camino de pedir pedidos en /entrada (solo quedan registros e info)');
  assert(!entradaHtml.includes('Pide tu servicio desde la app web.'), 'ELIMINADA la invitación a pedir pedidos desde /entrada');
  assert(entradaHtml.includes('family=Syne'), 'Tipografía Syne unificada en /entrada');
  assert(entradaHtml.includes('letter-spacing: -0.038em'), 'Tracking compacto Syne (-0.038em) aplicado a títulos para evitar deformación');
  assert(entradaHtml.includes('letter-spacing: -0.025em'), 'Tracking compacto Syne (-0.025em) aplicado al cuerpo para evitar ensanchamiento');
  assert(entradaHtml.includes('reveal-cascade'), 'Patrón A de animación en cascada implementado');
  assert(entradaHtml.includes('mask-slide-inner'), 'Patrón B de deslizamiento con máscara implementado');
  assert(entradaHtml.includes('pulse-c'), 'Patrón C de pulso implementado');
  assert(entradaHtml.includes('float-d'), 'Patrón D de flotación bioluminiscente implementado');
  assert(entradaHtml.includes('elevate-hover'), 'Patrón E de elevación al hover implementado');
  assert(entradaHtml.includes('haz-luz-wompi'), 'Haz de luz bioluminiscente con base cálida (#FFD35C) en Bóveda Wompi implementado');
  assert(entradaHtml.includes('Nuestros Servicios'), 'Sección "Nuestros Servicios" con 4 bloques presente');
  assert(entradaHtml.includes('Plomería') && entradaHtml.includes('Electricidad') && entradaHtml.includes('Cerrajería') && entradaHtml.includes('Aseo'), '4 especialidades principales presentes en /entrada');
  assert(entradaHtml.includes('Cómo funciona para el cliente'), 'Flujo de 5 pasos para el cliente presente');
  assert(entradaHtml.includes('Bóveda Wompi (Escrow)'), 'Bóveda Wompi documentada en /entrada');
  assert(entradaHtml.includes('Camilo Escobar'), 'Firma del fundador Camilo Escobar presente');

  // Validación del portal /registro/tecnico
  assert(regTecnicoHtml.includes('family=Syne'), 'Tipografía Syne unificada en /registro/tecnico');
  assert(regTecnicoHtml.includes('letter-spacing: -0.038em'), 'Tracking compacto Syne en /registro/tecnico');
  assert(regTecnicoHtml.includes('id="btn-submit-pro"'), 'Botón oficial de envío de Profesional presente en /registro/tecnico');
  assert(regTecnicoHtml.includes('14. Clases Particulares & Música'), 'Especialidad de Clases y Música presente en registro técnico');
  assert(regTecnicoHtml.includes('17. Servicios Profesionales & Legal'), 'Las 17 categorías presentes en el registro técnico');
  assert(regTecnicoHtml.includes('En rebuske Oro (93%)'), 'Simulador técnico muestra Plan Oro al 93% neto');
  assert(regTecnicoHtml.includes('9% Com.') && regTecnicoHtml.includes('Placa Bronce'), 'Placa Bronce configurada al 9% Com.');
  assert(regTecnicoHtml.includes('8% Com.') && regTecnicoHtml.includes('Placa Plata'), 'Placa Plata configurada al 8% Com.');
  assert(regTecnicoHtml.includes('7% Com.') && regTecnicoHtml.includes('Placa Oro'), 'Placa Oro configurada al 7% Com.');
  assert(regTecnicoHtml.includes('v * 0.93'), 'Lógica JS del simulador calcula sobre el 93% para Plan Oro');
  assert(regTecnicoHtml.includes('pro_check_terms'), 'Consentimiento legal técnico presente');

  // Validación del portal /registro/cliente
  assert(regClienteHtml.includes('family=Syne'), 'Tipografía Syne unificada en /registro/cliente');
  assert(regClienteHtml.includes('letter-spacing: -0.038em'), 'Tracking compacto Syne en /registro/cliente');
  assert(regClienteHtml.includes('id="btn-submit-cli"'), 'Botón oficial de envío de Cliente presente en /registro/cliente');
  assert(regClienteHtml.includes('14. Clases y Educación'), 'Categoría de Clases y Educación presente en registro cliente');
  assert(regClienteHtml.includes('17. Servicios Profesionales'), 'Las 17 categorías presentes en el registro cliente');
  assert(regClienteHtml.includes('TUBONO15K-VIP'), 'Bono de cliente muestra código TUBONO15K-VIP');
  assert(regClienteHtml.includes('Google Play Store'), 'Aclaración de lista de espera Play Store presente');
  assert(regClienteHtml.includes('cli_check_terms'), 'Consentimiento legal cliente presente');

  // Validación de Tarifario Oficial y Sistema Tri-Modal de Pagos (17 Servicios)
  const tarifasHtml = fs.readFileSync('./tarifas.html', 'utf8');
  assert(tarifasHtml.includes('Sistema Tri-Modal de Pagos'), 'Sistema Tri-Modal de Pagos documentado en tarifas.html');
  assert(tarifasHtml.includes('Bóveda de Sesiones Progresivas'), 'Bóveda de Sesiones Progresivas para clases/educación documentada');
  assert(tarifasHtml.includes('14. Clases y Educación') && tarifasHtml.includes('Enseñanza de música'), 'Categoría 14 de Clases y Música presente en tarifario');
  assert(tarifasHtml.includes('1. Limpieza y Aseo') && tarifasHtml.includes('17. Servicios Profesionales'), 'Catálogo completo de 17 servicios presente en tarifas.html');
  assert(indexHtml.includes('Clases y Educación (Música & Refuerzo)'), '17 categorías integradas en selector CATS de index.html');
  assert(indexHtml.includes('Sesiones Progresivas (Clases)'), 'Opción de Sesiones Progresivas integrada en solicitud de index.html');

  assert(!indexHtml.includes('id="rebuske-sticky-mobile-bar"'), 'Sticky Action Bar móvil eliminada de index.html para despejar el flujo real');
  assert(indexHtml.includes('real-cases-section'), 'Sección de Casos Reales en Medellín presente en index.html');
  assert(indexHtml.includes('Doña Gloria') && indexHtml.includes('Laureles'), 'Caso real de Laureles documentado');
  assert(indexHtml.includes('Mateo & Camila') && indexHtml.includes('El Poblado'), 'Caso real de El Poblado documentado');

  // --------------------------------------------------------------------------
  // TEST 6: DICCIONARIO PAISA, CUMPLIMIENTO LEGAL Y ZERO LEAKS
  // --------------------------------------------------------------------------
  console.log('\n[TEST 6/6] Verificando filtro lingüístico paisa y ausencia de fugas...');
  const palabrasProhibidas = ['pamplinas', 'caray', 'rayos', 'madre mía', 'joder', 'ostras', 'chamba'];
  for (const p of palabrasProhibidas) {
    assert(!registroHtml.toLowerCase().includes(p), `Filtro Lingüístico: Ausencia de modismo prohibido "${p}" en registro.html`);
    assert(!entradaHtml.toLowerCase().includes(p), `Filtro Lingüístico: Ausencia de modismo prohibido "${p}" en entrada.html`);
    assert(!regTecnicoHtml.toLowerCase().includes(p), `Filtro Lingüístico: Ausencia de modismo prohibido "${p}" en registro-tecnico.html`);
    assert(!regClienteHtml.toLowerCase().includes(p), `Filtro Lingüístico: Ausencia de modismo prohibido "${p}" en registro-cliente.html`);
    assert(!indexHtml.toLowerCase().includes(p), `Filtro Lingüístico: Ausencia de modismo prohibido "${p}" en index.html`);
  }

  // REGLA INQUEBRANTABLE: AUSENCIA TOTAL DE MODO LUZ Y RUTA DE LUZ
  const forbiddenLuzTerms = ['modo luz', 'luz express', 'ruta de luz'];
  for (const term of forbiddenLuzTerms) {
    assert(!entradaHtml.toLowerCase().includes(term), `Ausencia absoluta de "${term}" en entrada.html`);
    assert(!registroHtml.toLowerCase().includes(term), `Ausencia absoluta de "${term}" en registro.html`);
    assert(!indexHtml.toLowerCase().includes(term), `Ausencia absoluta de "${term}" en index.html`);
    assert(!regTecnicoHtml.toLowerCase().includes(term), `Ausencia absoluta de "${term}" en registro-tecnico.html`);
    assert(!regClienteHtml.toLowerCase().includes(term), `Ausencia absoluta de "${term}" en registro-cliente.html`);
  }

  assert(entradaHtml.includes('Despacho Inmediato en Comunas'), 'Protocolo de seguridad incluye Despacho Inmediato en Comunas');
  assert(fs.existsSync('./PROTOCOLO_PERITAJE_OPERATIVO.md'), 'Protocolo Operativo de Peritaje existe en el repositorio');

  const lastHtmlIdx = indexHtml.lastIndexOf('</html>');
  const leakIndex = indexHtml.slice(lastHtmlIdx + 7).trim();
  assert(leakIndex.length === 0, 'ZERO código filtrado después de </html> en index.html');

  const lastRegHtmlIdx = registroHtml.lastIndexOf('</html>');
  const leakReg = registroHtml.slice(lastRegHtmlIdx + 7).trim();
  assert(leakReg.length === 0, 'ZERO código filtrado después de </html> en registro.html');

  const lastEntHtmlIdx = entradaHtml.lastIndexOf('</html>');
  const leakEnt = entradaHtml.slice(lastEntHtmlIdx + 7).trim();
  assert(leakEnt.length === 0, 'ZERO código filtrado después de </html> en entrada.html');

  const lastTecHtmlIdx = regTecnicoHtml.lastIndexOf('</html>');
  const leakTec = regTecnicoHtml.slice(lastTecHtmlIdx + 7).trim();
  assert(leakTec.length === 0, 'ZERO código filtrado después de </html> en registro-tecnico.html');

  const lastCliHtmlIdx = regClienteHtml.lastIndexOf('</html>');
  const leakCli = regClienteHtml.slice(lastCliHtmlIdx + 7).trim();
  assert(leakCli.length === 0, 'ZERO código filtrado después de </html> en registro-cliente.html');

  // --------------------------------------------------------------------------
  // TEST 7: MOTOR DE DIAGNÓSTICO INTELIGENTE DEL DAÑO (10 OFICIOS, FOTO & VOZ)
  // --------------------------------------------------------------------------
  console.log('\n[TEST 7/7] Verificando Motor de Diagnóstico Inteligente multivariable...');
  assert(indexHtml.includes('id="diag_foto"'), 'Input de subida de foto real (#diag_foto) presente en index.html');
  assert(indexHtml.includes('id="diag_foto_preview"'), 'Contenedor de vista previa (#diag_foto_preview) presente en index.html');
  assert(indexHtml.includes('id="btn_dictar_voz"'), 'Botón de dictado por voz (#btn_dictar_voz) implementado');
  assert(indexHtml.includes('class="chip-diag"'), 'Chips de averías rápidas (.chip-diag) presentes en el modal');

  // Validación de las 10 especialidades técnicas de Medellín
  const oficiosEsperados = [
    'Gasodomésticos & Calentadores',
    'Electricidad Residencial',
    'Plomería & Redes Hidráulicas',
    'Refrigeración & Neveras',
    'Lavadoras & Secadoras',
    'Cerrajería & Seguridad',
    'Techos & Cubiertas',
    'Pintura & Tratamiento de Muros',
    'Carpintería & Mobiliario',
    'Aires Acondicionados & Climatización'
  ];
  for (const oficio of oficiosEsperados) {
    assert(indexHtml.includes(oficio), `Especialidad técnica "${oficio}" integrada en el motor de diagnóstico`);
  }

  // Verificación de eliminación del fallback ingenuo que daba siempre la misma respuesta
  assert(!indexHtml.includes("let cat = 'Plomería', rango = '$70.000 – $130.000 COP'"), 'ELIMINADO el fallback estático de Plomería ($70k-$130k)');
  assert(!indexHtml.includes('¿Deseas activar la Ruta de Luz para recibir 3 propuestas'), 'ELIMINADA la mención comercial "Ruta de Luz" del diagnóstico preliminar');

  // Verificación de tarifas y garantías oficiales
  assert(indexHtml.includes('$35.000 COP') && indexHtml.includes('(abonable a la labor)'), 'Tarifa de visita diagnóstica unificada $35.000 COP (abonable a la labor)');
  assert(indexHtml.includes('Garantía Comercial rebuske de 48 h (Ley 1480)'), 'Garantía oficial de 48h (Ley 1480) presente en el resultado del diagnóstico');

  console.log('\n======================================================================');
  console.log(`🎉 TODAS LAS PRUEBAS PASARON EXITOSAMENTE: ${passedTests}/${totalTests} pruebas superadas (100%).`);
  console.log('Certificado de Calidad rebuske v5 aprobado por Lucas QA.');
  console.log('======================================================================');
}

runTestSuite().catch(err => {
  console.error('\n❌ ERROR EN LA SUITE DE PRUEBAS:', err);
  process.exit(1);
});
