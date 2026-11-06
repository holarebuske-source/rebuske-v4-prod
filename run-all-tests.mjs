/**
 * ============================================================================
 * REBUSKE · SUITE MAESTRA DE PRUEBAS AUTOMATIZADAS Y CONTROL DE CALIDAD (QA)
 * ============================================================================
 * Auditor de QA: Lucas
 *
 * Ejecuta validaciones completas:
 *  1. Sintaxis de módulos Node.js / Serverless API
 *  2. FinTech Wompi: Checkout servidor, firma SHA-256, Comprobante Mandato (Art. 1262) y manejo de rechazos
 *  3. Central de Despacho Inmediato (/api/dispatch-alert) y conexión de Radar
 *  4. Conversión & UI/UX: Thank You Modal, Sticky Action Bar móvil, Casos Reales Medellín
 *  5. Cumplimiento Normativo: Ley 1480, Ley 1581, Código de Comercio y reglas de marca rebuske
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

console.log('======================================================================');
console.log('🚀 INICIANDO AUDITORÍA INTEGRAL DE CALIDAD REBUSKE v4 (LUCAS QA)');
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
  // TEST 1: SINTAXIS Y MÓDULOS DE API SERVERLESS
  // --------------------------------------------------------------------------
  console.log('\n[TEST 1/5] Verificando importación e isomorfismo de módulos API...');
  const wompiModule = await import('./api/wompi.js');
  assert(typeof wompiModule.default === 'function', 'api/wompi.js exporta handler por defecto');

  const dispatchModule = await import('./api/dispatch-alert.js');
  assert(typeof dispatchModule.default === 'function', 'api/dispatch-alert.js exporta handler por defecto');

  const supabaseSync = await import('./supabase-sync.js');
  assert(typeof (supabaseSync.RebuskeSupabase || supabaseSync.default) === 'object', 'supabase-sync.js exporta RebuskeSupabase isomorfo (Node + Browser)');

  // --------------------------------------------------------------------------
  // TEST 2: FINTECH WOMPI & BÓVEDA ESCROW (TOMÁS)
  // --------------------------------------------------------------------------
  console.log('\n[TEST 2/5] Verificando Ruta de Pago Wompi y Comprobante de Mandato...');
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

  // Test Status con Friendly Decline
  const reqStatus = {
    method: 'GET',
    query: { action: 'STATUS', reference: resCheckout.body.reference }
  };
  const resStatus = createMockRes();
  await wompiModule.default(reqStatus, resStatus);
  assert(resStatus.statusCode === 200, 'Consulta de estado de transacción STATUS responde HTTP 200');

  // --------------------------------------------------------------------------
  // TEST 3: CENTRAL DE DESPACHO INMEDIATO & RADAR (SOFÍA)
  // --------------------------------------------------------------------------
  console.log('\n[TEST 3/5] Verificando Central de Despacho Inmediato y Radar...');
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
  // TEST 4: CONVERSIÓN & UI/UX (VALERIA)
  // --------------------------------------------------------------------------
  console.log('\n[TEST 4/5] Verificando elementos de UI/UX, conversión y retención...');
  const registroHtml = fs.readFileSync('./registro.html', 'utf8');
  assert(registroHtml.includes('id="rebuske-thankyou-modal"'), 'Thank You Modal presente en registro.html');
  assert(registroHtml.includes('openThankYouModal'), 'Función openThankYouModal implementada');
  assert(indexHtml.includes('id="rebuske-sticky-mobile-bar"'), 'Sticky Action Bar móvil presente en index.html');
  assert(indexHtml.includes('real-cases-section'), 'Sección de Casos Reales en Medellín presente en index.html');
  assert(indexHtml.includes('Doña Gloria') && indexHtml.includes('Laureles'), 'Caso real de Laureles documentado');
  assert(indexHtml.includes('Mateo & Camila') && indexHtml.includes('El Poblado'), 'Caso real de El Poblado documentado');

  // Validación de Escala Oficial de Comisiones (18% Bronce / 14% Plata / 11% Oro / 1% Mes 1)
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
  // TEST 5: CUMPLIMIENTO LEGAL, MARCA Y ZERO LEAKS
  // --------------------------------------------------------------------------
  console.log('\n[TEST 5/5] Verificando blindaje legal, directrices de marca y ausencia de fugas...');
  assert(!registroHtml.includes('Luz Express') && !registroHtml.includes('luz express'), 'Eliminada la promesa "Luz Express" de cara al usuario en registro.html');
  assert(!indexHtml.includes('Luz Express') && !indexHtml.includes('luz express'), 'Eliminada la promesa "Luz Express" de cara al usuario en index.html (reemplazada por Servicio Express Prioritario)');
  assert(fs.existsSync('./PROTOCOLO_PERITAJE_OPERATIVO.md'), 'Protocolo Operativo de Peritaje existe en el repositorio');

  const lastHtmlIdx = indexHtml.lastIndexOf('</html>');
  const leakIndex = indexHtml.slice(lastHtmlIdx + 7).trim();
  assert(leakIndex.length === 0, 'ZERO código filtrado después de </html> en index.html');

  const lastRegHtmlIdx = registroHtml.lastIndexOf('</html>');
  const leakReg = registroHtml.slice(lastRegHtmlIdx + 7).trim();
  assert(leakReg.length === 0, 'ZERO código filtrado después de </html> en registro.html');

  console.log('\n======================================================================');
  console.log(`🎉 TODAS LAS PRUEBAS PASARON EXITOSAMENTE: ${passedTests}/${totalTests} pruebas superadas (100%).`);
  console.log('Certificado de Calidad rebuske v4 aprobado por Lucas QA.');
  console.log('======================================================================');
}

runTestSuite().catch(err => {
  console.error('\n❌ ERROR EN LA SUITE DE PRUEBAS:', err);
  process.exit(1);
});
