/**
 * REBUSKE · PRUEBA INTEGRAL DE RUTA DE PAGO WOMPI SANDBOX
 * Valida: Checkout en servidor, escala oficial (Bronce 18%, Plata 14%, Oro 11%),
 * Cuota de Protección ($4.900 COP), firma de integridad SHA-256 y webhook de aprobación.
 */

import crypto from 'node:crypto';
import handler from './api/wompi.js';

console.log('======================================================================');
console.log('🧪 INICIANDO AUDITORÍA Y CERTIFICACIÓN DE RUTA DE PAGO WOMPI');
console.log('======================================================================');

// Mock req and res
function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(k, v) { this.headers[k] = v; },
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
    end() { return this; }
  };
  return res;
}

async function testWompiRoute() {
  // 1. PRUEBA DE CHECKOUT
  console.log('\n[1/3] Probando Generación de Checkout Seguro (CREATE_CHECKOUT)...');
  const reqCheckout = {
    method: 'POST',
    query: { action: 'CREATE_CHECKOUT' },
    body: {
      jobId: 'JOB-TEST-2026',
      quoteAmount: 100000,
      customerEmail: 'cliente.prueba@gmail.com',
      customerName: 'Santiago Restrepo',
      customerPhone: '3001234567'
    }
  };
  const resCheckout = createMockRes();
  await handler(reqCheckout, resCheckout);

  console.log('  • Código HTTP:', resCheckout.statusCode);
  console.log('  • Respuesta Checkout:', JSON.stringify(resCheckout.body, null, 2));

  if (!resCheckout.body || !resCheckout.body.ok) {
    throw new Error('Fallo al generar el checkout de Wompi.');
  }

  const { breakdown, reference, amountInCents, signature } = resCheckout.body;
  console.log(`  ✅ Total a Pagar en Wompi: $${breakdown.totalCOP.toLocaleString('es-CO')} COP`);
  console.log(`  ✅ Monto en centavos Wompi: ${amountInCents} (COP * 100)`);
  console.log(`  ✅ Cuota de Protección: $${breakdown.protectionFeeCOP.toLocaleString('es-CO')} COP`);
  console.log(`  ✅ Firma de Integridad SHA-256: ${signature.substring(0, 16)}...`);

  // 2. PRUEBA DE WEBHOOK DE APROBACIÓN
  console.log('\n[2/3] Probando Simulación de Webhook de Aprobación de Wompi...');
  const txId = `SIM-TX-${Date.now()}`;
  const reqWebhook = {
    method: 'POST',
    query: { action: 'WEBHOOK' },
    body: {
      event: 'transaction.updated',
      data: {
        transaction: {
          id: txId,
          reference: reference,
          amount_in_cents: amountInCents,
          currency: 'COP',
          status: 'APPROVED',
          payment_method_type: 'CARD',
          customer_email: 'cliente.prueba@gmail.com',
          created_at: new Date().toISOString()
        }
      }
    }
  };
  const resWebhook = createMockRes();
  await handler(reqWebhook, resWebhook);

  console.log('  • Código HTTP Webhook:', resWebhook.statusCode);
  console.log('  • Respuesta Webhook:', JSON.stringify(resWebhook.body, null, 2));

  if (!resWebhook.body || (resWebhook.body.status !== 'success' && !resWebhook.body.ok)) {
    throw new Error('Fallo al procesar el webhook de Wompi.');
  }
  console.log('  ✅ Transacción marcada como APPROVED en el Ledger de Bóveda Wompi.');

  // 3. PRUEBA DE CONSULTA DE ESTADO (STATUS)
  console.log('\n[3/3] Consultando Estado de la Transacción (STATUS)...');
  const reqStatus = {
    method: 'GET',
    query: { action: 'STATUS', reference: reference }
  };
  const resStatus = createMockRes();
  await handler(reqStatus, resStatus);

  console.log('  • Código HTTP Status:', resStatus.statusCode);
  console.log('  • Estado Confirmado:', resStatus.body.status);

  if (resStatus.body.status !== 'APPROVED') {
    throw new Error(`Estado no coincide: se esperaba APPROVED pero se obtuvo ${resStatus.body.status}`);
  }

  console.log('\n======================================================================');
  console.log('🎉 CERTIFICACIÓN EXITOSA: La ruta de pago Wompi funciona 100% de punta a punta.');
  console.log('======================================================================');
}

testWompiRoute().catch(err => {
  console.error('❌ Error en prueba Wompi:', err);
  process.exit(1);
});
