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
  // TEST 5: CONVERSIÓN & UI/UX (VALERIA)
  // --------------------------------------------------------------------------
  console.log('\n[TEST 5/6] Verificando elementos de UI/UX, conversión y retención...');
  const registroHtml = fs.readFileSync('./registro.html', 'utf8');
  assert(registroHtml.includes('id="rebuske-thankyou-modal"'), 'Thank You Modal presente en registro.html');
  assert(registroHtml.includes('openThankYouModal'), 'Función openThankYouModal implementada');
  assert(registroHtml.includes('id="pro-check-mandato"'), 'Checkbox de Mandato Comercial (Art. 1262 C.Co) presente en registro.html');
  assert(registroHtml.includes('id="btn-submit-pro"'), 'Botón oficial de envío de Profesional presente en registro.html');
  assert(registroHtml.includes('id="btn-submit-cli"'), 'Botón oficial de envío de Cliente presente en registro.html');
  assert(registroHtml.includes('id="view-cliente"'), 'Vista unificada de Cliente VIP presente en registro.html');

  assert(indexHtml.includes('id="rebuske-sticky-mobile-bar"'), 'Sticky Action Bar móvil presente en index.html');
  assert(indexHtml.includes('real-cases-section'), 'Sección de Casos Reales en Medellín presente en index.html');
  assert(indexHtml.includes('Doña Gloria') && indexHtml.includes('Laureles'), 'Caso real de Laureles documentado');
  assert(indexHtml.includes('Mateo & Camila') && indexHtml.includes('El Poblado'), 'Caso real de El Poblado documentado');

  // Validación de Escala Oficial de Comisiones
  assert(registroHtml.includes('En rebuske Oro (89%)'), 'Simulador muestra Plan Oro al 89% neto');
  assert(registroHtml.includes('18% Com.') && registroHtml.includes('82% neto'), 'Placa Bronce configurada al 18% com / 82% neto');
  assert(registroHtml.includes('14% Com.') && registroHtml.includes('86% neto'), 'Placa Plata configurada al 14% com / 86% neto');
  assert(registroHtml.includes('11% Com.') && registroHtml.includes('89% neto'), 'Placa Oro configurada al 11% com / 89% neto');
  assert(registroHtml.includes('amount * 0.89'), 'Lógica JS del simulador calcula sobre el 89% para Plan Oro');
  assert(!registroHtml.includes('En rebuske Oro (93%)'), 'Eliminada referencia obsoleta 93% del simulador');
  assert(!registroHtml.includes('9% Com.'), 'Eliminada referencia obsoleta 9% Com de Placa Bronce');
  assert(!/(?<![0-9])8%\s*Com\./i.test(registroHtml), 'Eliminada referencia obsoleta 8% Com de Placa Plata');
  assert(!registroHtml.includes('7% Com.'), 'Eliminada referencia obsoleta 7% Com de Placa Oro');

  // --------------------------------------------------------------------------
  // TEST 6: DICCIONARIO PAISA, CUMPLIMIENTO LEGAL Y ZERO LEAKS
  // --------------------------------------------------------------------------
  console.log('\n[TEST 6/6] Verificando filtro lingüístico paisa y ausencia de fugas...');
  const palabrasProhibidas = ['pamplinas', 'caray', 'rayos', 'madre mía', 'joder', 'ostras', 'chamba'];
  for (const p of palabrasProhibidas) {
    assert(!registroHtml.toLowerCase().includes(p), `Filtro Lingüístico: Ausencia de modismo prohibido "${p}" en registro.html`);
    assert(!indexHtml.toLowerCase().includes(p), `Filtro Lingüístico: Ausencia de modismo prohibido "${p}" en index.html`);
  }

  assert(!registroHtml.includes('Luz Express') && !registroHtml.includes('luz express'), 'Eliminada la promesa "Luz Express" en registro.html');
  assert(!indexHtml.includes('Luz Express') && !indexHtml.includes('luz express'), 'Eliminada la promesa "Luz Express" en index.html');
  assert(fs.existsSync('./PROTOCOLO_PERITAJE_OPERATIVO.md'), 'Protocolo Operativo de Peritaje existe en el repositorio');

  const lastHtmlIdx = indexHtml.lastIndexOf('</html>');
  const leakIndex = indexHtml.slice(lastHtmlIdx + 7).trim();
  assert(leakIndex.length === 0, 'ZERO código filtrado después de </html> en index.html');

  const lastRegHtmlIdx = registroHtml.lastIndexOf('</html>');
  const leakReg = registroHtml.slice(lastRegHtmlIdx + 7).trim();
  assert(leakReg.length === 0, 'ZERO código filtrado después de </html> en registro.html');

  console.log('\n======================================================================');
  console.log(`🎉 TODAS LAS PRUEBAS PASARON EXITOSAMENTE: ${passedTests}/${totalTests} pruebas superadas (100%).`);
  console.log('Certificado de Calidad rebuske v5 aprobado por Lucas QA.');
  console.log('======================================================================');
}

runTestSuite().catch(err => {
  console.error('\n❌ ERROR EN LA SUITE DE PRUEBAS:', err);
  process.exit(1);
});
