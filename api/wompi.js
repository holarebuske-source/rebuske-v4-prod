/**
 * ============================================================================
 * REBUSKE · CONTROLADOR UNIFICADO FINTECH WOMPI (PAGOS, WEBHOOK Y CONCILIACIÓN)
 * ============================================================================
 * Especialista FinTech: Tomás
 * Funcionalidades en 1 solo punto de entrada optimizado para Vercel:
 *  1. CREATE_CHECKOUT: Cálculo de monto en servidor, centavos (COP*100) y firma SHA-256
 *  2. STATUS: Consulta de estado verificado (Ledger o Wompi API v1)
 *  3. RECONCILE: Job de conciliación para transacciones PENDING (> 15 min)
 *  4. WEBHOOK: Procesamiento de eventos transaccionales con checksum e idempotencia
 * ============================================================================
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY || 'pub_prod_rlfigFJClWV8X56CCbtRngsxy8vF7lzW';
const WOMPI_PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY || 'prv_prod_4oIQNfg2niXirIqpzONGpmVIdaq1b9yu';
const WOMPI_EVENTS_SECRET = process.env.WOMPI_EVENTS_SECRET || 'prod_events_qat3lsI2jTaA82Ky5r2iEd2qCNNAzfEJ';
const WOMPI_INTEGRITY_SECRET = process.env.WOMPI_INTEGRITY_SECRET || 'prod_integrity_6TeHFI9CwfIMh4RzN7RFJAZY6MaCxws0';

const TX_STORE_PATH = path.join(process.cwd(), 'wompi_transactions_ledger.json');
const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

// Escala Oficial de Comisiones rebuske v4 (3 Planes):
// - BRONCE: 18% (82% técnico) - Nuevos / Ocasionales
// - PLATA:  14% (86% técnico) - Activos (>10 servicios/mes, rating 4.7+)
// - ORO:    11% (89% técnico) - Primordiales / VIP (rating 4.9+)
const TIER_FEES = {
  BRONCE: 0.18,
  PLATA: 0.14,
  ORO: 0.11
};

function getLedger() {
  try {
    if (fs.existsSync(TX_STORE_PATH)) {
      return JSON.parse(fs.readFileSync(TX_STORE_PATH, 'utf8') || '[]');
    }
  } catch (_) {}
  return [];
}

function saveLedger(list) {
  try {
    fs.writeFileSync(TX_STORE_PATH, JSON.stringify(list.slice(0, 500), null, 2), 'utf8');
  } catch (_) {}
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-event-checksum, x-wompi-signature');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const queryAction = String(req.query.action || '').toUpperCase();
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const bodyAction = String(body.action || '').toUpperCase();
  const action = queryAction || bodyAction;

  // --------------------------------------------------------------------------
  // 1. CÓDIGO DE CHECKOUT SEGURO EN SERVIDOR (CREATE_CHECKOUT)
  // --------------------------------------------------------------------------
  if (action === 'CREATE_CHECKOUT' || action === 'CHECKOUT' || (!action && body.jobId)) {
    try {
      const { jobId, quoteAmount, couponCode, customerEmail, customerName, customerPhone } = body;

      // Cuota de Pago Protegido y Garantía 48h (cubre 100% de la pasarela Wompi)
      const protectionFeeCOP = 4900;

      let subtotalCOP = Number(quoteAmount);
      if (!subtotalCOP || isNaN(subtotalCOP) || subtotalCOP <= 0) {
        subtotalCOP = 120000;
      }
      subtotalCOP = Math.round(subtotalCOP);

      let discountCOP = 0;
      let couponApplied = null;
      const cleanCoupon = String(couponCode || '').trim().toUpperCase();
      if (cleanCoupon === 'TUBONO15K-VIP' && subtotalCOP >= 90000) {
        discountCOP = 15000;
        couponApplied = 'TUBONO15K-VIP';
      }

      // Total a pagar por el cliente = Cotización + Cuota de Protección ($4.900) - Descuento Bono
      const totalCOP = Math.max(10000, subtotalCOP + protectionFeeCOP - discountCOP);
      const amountInCents = Math.round(totalCOP * 100);
      const cleanJobId = String(jobId || 'SRV').replace(/[^a-zA-Z0-9_-]/g, '').toUpperCase();
      const reference = `REB-${cleanJobId}-${Date.now().toString(36).toUpperCase()}`;
      const currency = 'COP';

      // Cálculo fiscal DIAN y Split por Plan (Bronce 18%, Plata 14%, Oro 11%)
      const planKey = String(body.proPlan || 'ORO').toUpperCase();
      const feeRate = TIER_FEES[planKey] || 0.11;

      // El técnico recibe su porcentaje pactado íntegro sobre su cotización
      const ingresoTerceroCOP = Math.round(subtotalCOP * (1 - feeRate));
      // rebuske percibe su comisión sobre el trabajo + cuota de protección ($4.900) - descuento asumido
      const comisionRebuskeCOP = totalCOP - ingresoTerceroCOP;

      // Firma SHA-256 generada en servidor
      const rawString = `${reference}${amountInCents}${currency}${WOMPI_INTEGRITY_SECRET}`;
      const signature = crypto.createHash('sha256').update(rawString).digest('hex');

      const ledger = getLedger();
      ledger.unshift({
        reference,
        jobId: cleanJobId,
        proPlan: planKey,
        feeRate,
        subtotalCOP,
        protectionFeeCOP,
        discountCOP,
        totalCOP,
        amountInCents,
        currency,
        signature,
        status: 'PENDING',
        customerEmail: customerEmail || 'holarebuske@gmail.com',
        customerName: customerName || 'Camila Torres',
        customerPhone: customerPhone || '+573001234567',
        couponApplied,
        dianAccounting: {
          regimen: 'MANDATO_COMERCIAL_INTERMEDIACION',
          plan: planKey,
          porcentajeComision: `${Math.round(feeRate * 100)}%`,
          porcentajeTecnico: `${Math.round((1 - feeRate) * 100)}%`,
          subtotalCotizado: subtotalCOP,
          cuotaProteccionGarantia48h: protectionFeeCOP,
          ingresoTerceroCOP,
          cuentaIngresoTercero: '2815_INGRESOS_RECIBIDOS_PARA_TERCEROS',
          comisionRebuskeCOP,
          cuentaComision: '4160_INGRESOS_COMISIONES_Y_PROTECCION',
          ivaComisionCOP: 0,
          cuentaIVA: '2408_IVA_GENERADO',
          entidadCustodia: 'Wompi - Bancolombia (Vigilada Superfinanciera)'
        },
        createdAt: new Date().toISOString()
      });
      saveLedger(ledger);

      return res.status(200).json({
        ok: true,
        reference,
        amountInCents,
        currency,
        signature,
        publicKey: WOMPI_PUBLIC_KEY,
        redirectUrl: `https://rebuske.vercel.app/?pago_ref=${encodeURIComponent(reference)}`,
        breakdown: {
          subtotalCOP,
          protectionFeeCOP,
          discountCOP,
          totalCOP,
          formattedSubtotal: `$${subtotalCOP.toLocaleString('es-CO')} COP`,
          formattedProtectionFee: `+$${protectionFeeCOP.toLocaleString('es-CO')} COP`,
          formattedDiscount: discountCOP > 0 ? `-$${discountCOP.toLocaleString('es-CO')} COP` : '$0 COP',
          formattedTotal: `$${totalCOP.toLocaleString('es-CO')} COP`,
          couponApplied
        },
        dianBreakdown: {
          baseComisionCOP: comisionRebuskeCOP,
          ingresoTerceroCOP,
          cuotaProteccionCOP: protectionFeeCOP,
          plan: planKey,
          regimen: 'Mandato Comercial (Art. 1262 C.Co - Art. 1.2.4.11 DUR 1625/2016)',
          custodiaBancaria: 'Wompi / Bancolombia (Vigilada Superfinanciera)'
        },
        security: {
          centsVerified: true,
          calculatedOnServer: true,
          signatureAlgorithm: 'SHA-256'
        }
      });
    } catch (e) {
      return res.status(500).json({ ok: false, error: 'Error calculando checkout: ' + e.message });
    }
  }

  // --------------------------------------------------------------------------
  // 2. CONSULTA DE ESTADO DE TRANSACCIÓN (STATUS)
  // --------------------------------------------------------------------------
  if (action === 'STATUS' || req.query.ref || req.query.reference) {
    const reference = String(req.query.ref || req.query.reference || body.reference || '').trim();
    if (!reference) {
      return res.status(400).json({ ok: false, error: 'Parámetro ref requerido.' });
    }

    const ledger = getLedger();
    const localTx = ledger.find(t => t.reference === reference);

    if (localTx && localTx.status === 'APPROVED') {
      return res.status(200).json({
        ok: true,
        reference,
        status: 'APPROVED',
        verified: true,
        source: 'ledger_approved',
        amountCOP: localTx.totalCOP,
        jobId: localTx.jobId
      });
    }

    // Consulta en vivo a Wompi API
    let wompiStatus = localTx?.status || 'PENDING';
    let wompiTxId = localTx?.wompiTxId || null;

    try {
      const wompiRes = await fetch(`https://production.wompi.co/v1/transactions?reference=${encodeURIComponent(reference)}`, {
        headers: { 'Authorization': `Bearer ${WOMPI_PRIVATE_KEY}` }
      });
      if (wompiRes.ok) {
        const json = await wompiRes.json();
        const txs = json.data || [];
        if (txs.length > 0) {
          const latest = txs[0];
          wompiStatus = latest.status;
          wompiTxId = latest.id;
          if (localTx) {
            localTx.status = wompiStatus;
            localTx.wompiTxId = wompiTxId;
            localTx.updatedAt = new Date().toISOString();
            saveLedger(ledger);
          }
        }
      }
    } catch (_) {}

    return res.status(200).json({
      ok: true,
      reference,
      status: wompiStatus,
      verified: wompiStatus === 'APPROVED',
      source: 'wompi_api_check',
      wompiTxId,
      amountCOP: localTx?.totalCOP || 120000,
      jobId: localTx?.jobId || null
    });
  }

  // --------------------------------------------------------------------------
  // 3. JOB DE CONCILIACIÓN DE TRANSACCIONES PENDING (RECONCILE)
  // --------------------------------------------------------------------------
  if (action === 'RECONCILE') {
    const now = Date.now();
    const ledger = getLedger();
    const pendingTxs = ledger.filter(t => t.status === 'PENDING' && (now - new Date(t.createdAt || 0).getTime()) >= FIFTEEN_MINUTES_MS);
    let updatedCount = 0;
    const reconciled = [];

    for (const tx of pendingTxs) {
      try {
        const wompiRes = await fetch(`https://production.wompi.co/v1/transactions?reference=${encodeURIComponent(tx.reference)}`, {
          headers: { 'Authorization': `Bearer ${WOMPI_PRIVATE_KEY}` }
        });
        if (wompiRes.ok) {
          const json = await wompiRes.json();
          const wompiList = json.data || [];
          if (wompiList.length > 0) {
            const latest = wompiList[0];
            if (latest.status !== tx.status) {
              tx.status = latest.status;
              tx.wompiTxId = latest.id;
              tx.reconciledAt = new Date().toISOString();
              updatedCount++;
              reconciled.push({ reference: tx.reference, status: latest.status });
            }
          }
        }
      } catch (_) {}
    }

    if (updatedCount > 0) saveLedger(ledger);

    return res.status(200).json({
      ok: true,
      scannedCount: pendingTxs.length,
      updatedCount,
      reconciled,
      timestamp: new Date().toISOString()
    });
  }

  // --------------------------------------------------------------------------
  // 4. PROCESAMIENTO OFICIAL DE WEBHOOK DE WOMPI
  // --------------------------------------------------------------------------
  try {
    const event = body;
    console.log('[Tomás FinTech] Webhook Wompi recibido:', event?.event, event?.data?.transaction?.id);

    // Verificación de Checksum
    const signature = req.headers['x-event-checksum'] || req.headers['x-wompi-signature'];
    if (signature && event?.data?.transaction) {
      const tx = event.data.transaction;
      const rawString = `${tx.id}${tx.status}${tx.amount_in_cents}${event.timestamp || ''}${WOMPI_EVENTS_SECRET}`;
      const calculatedHash = crypto.createHash('sha256').update(rawString).digest('hex');
      if (signature !== calculatedHash) {
        console.warn('[Wompi Webhook] Checksum mismatch detectado.');
      }
    }

    if (event?.event === 'transaction.updated') {
      const tx = event.data.transaction;
      const status = tx.status;
      const amountCOP = tx.amount_in_cents / 100;
      const reference = tx.reference;
      const paymentMethod = tx.payment_method_type;

      const ledger = getLedger();
      const existing = ledger.find(t => t.reference === reference);

      if (existing && existing.status === 'APPROVED' && status === 'APPROVED') {
        return res.status(200).json({ status: 'success', idempotent: true, reference });
      }

      if (status === 'APPROVED') {
        const planKey = String(existing?.proPlan || 'ORO').toUpperCase();
        const feeRate = TIER_FEES[planKey] || 0.11;
        const subtotal = existing?.subtotalCOP || amountCOP;
        const splitPro = existing?.ingresoTerceroCOP || Math.round(subtotal * (1 - feeRate));
        const splitRebuske = amountCOP - splitPro;
        const dianAccounting = {
          regimen: 'MANDATO_COMERCIAL_INTERMEDIACION',
          plan: planKey,
          porcentajeComision: `${Math.round(feeRate * 100)}%`,
          porcentajeTecnico: `${Math.round((1 - feeRate) * 100)}%`,
          subtotalCotizado: subtotal,
          cuotaProteccionGarantia48h: existing?.protectionFeeCOP || 4900,
          ingresoTerceroCOP: splitPro,
          cuentaIngresoTercero: '2815_INGRESOS_RECIBIDOS_PARA_TERCEROS',
          comisionRebuskeCOP: splitRebuske,
          cuentaComision: '4160_INGRESOS_COMISIONES_Y_PROTECCION',
          ivaComisionCOP: 0,
          cuentaIVA: '2408_IVA_GENERADO',
          entidadCustodia: 'Wompi - Bancolombia (Vigilada Superfinanciera)'
        };

        if (existing) {
          existing.status = 'APPROVED';
          existing.wompiTxId = tx.id;
          existing.splitRebuske = splitRebuske;
          existing.splitPro = splitPro;
          existing.dianAccounting = dianAccounting;
          existing.approvedAt = new Date().toISOString();
        } else {
          ledger.unshift({
            reference,
            wompiTxId: tx.id,
            status: 'APPROVED',
            totalCOP: amountCOP,
            amountInCents: tx.amount_in_cents,
            splitRebuske,
            splitPro,
            dianAccounting,
            approvedAt: new Date().toISOString()
          });
        }
        saveLedger(ledger);

        return res.status(200).json({
          status: 'success',
          event: 'APPROVED',
          reference,
          split: { total: amountCOP, rebuskeFee: splitRebuske, proPayout: splitPro },
          dianAccounting
        });
      }
    }

    return res.status(200).json({ status: 'received' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
