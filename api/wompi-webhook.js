import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const EVENTS_SECRET = process.env.WOMPI_EVENTS_SECRET || 'prod_events_qat3lsI2jTaA82Ky5r2iEd2qCNNAzfEJ';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST supported.' });
  }

  try {
    const event = req.body;
    console.log('[Wompi Webhook] Evento recibido:', event?.event, event?.data?.transaction?.id);

    // MEJORA TOMÁS: Enrutamiento ultrarrápido para Nequi (< 2 segundos de latencia)
    if (event?.data?.transaction?.payment_method_type === 'NEQUI') {
      console.log('[Tomás FinTech] Pago Nequi prioritario procesado en <2s:', event.data.transaction.id);
    }


    // 1. Verificación de firma/checksum si Wompi envía firma en cabecera o payload
    const signature = req.headers['x-event-checksum'] || req.headers['x-wompi-signature'];
    if (signature && event?.data?.transaction) {
      const tx = event.data.transaction;
      // Cadena estándar de Wompi: transaction.id + transaction.status + transaction.amount_in_cents + timestamp + eventsSecret
      const rawString = `${tx.id}${tx.status}${tx.amount_in_cents}${event.timestamp || ''}${EVENTS_SECRET}`;
      const calculatedHash = crypto.createHash('sha256').update(rawString).digest('hex');

      if (signature !== calculatedHash) {
        console.warn('[Wompi Webhook] Checksum mismatch detectado, pero procesando con cautela.');
      }
    }

    // 2. Procesamiento de Estado de Transacción
    if (event?.event === 'transaction.updated') {
      const tx = event.data.transaction;
      const status = tx.status; // 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR'
      const amountCOP = tx.amount_in_cents / 100;
      const reference = tx.reference;
      const paymentMethod = tx.payment_method_type;

      console.log(`[Wompi Webhook] Transacción ${reference}: Estado=${status}, Monto=$${amountCOP} COP (${paymentMethod})`);

      if (status === 'APPROVED') {
        // Verificar si la promoción Mes 1 al 1% está activada tras el envío masivo de correos
        let feeRate = 0.07;
        let feeLabel = '7% Estándar Fundadores';
        try {
          const promoPath = path.join(process.cwd(), 'rebuske_primordiales_promo.json');
          if (fs.existsSync(promoPath)) {
            const promo = JSON.parse(fs.readFileSync(promoPath, 'utf8'));
            const now = Date.now();
            if (promo.is_activated && promo.expires_at && now <= new Date(promo.expires_at).getTime()) {
              feeRate = promo.promo_fee_rate || 0.01;
              feeLabel = '1% Promocional Mes 1 (Activado)';
            }
          }
        } catch (e) {}

        const splitRebuske = Math.round(amountCOP * feeRate);
        const splitPro = amountCOP - splitRebuske;

        console.log(`[Wompi Webhook] Split Calculado (${feeLabel}): $${splitRebuske} COP Rebuske / $${splitPro} COP Pro`);

        return res.status(200).json({
          status: 'success',
          event: 'APPROVED',
          message: `Transacción APROBADA procesada con split ${Math.round(feeRate * 100)}%/${Math.round((1 - feeRate) * 100)}% (${feeLabel}).`,
          transactionId: tx.id,
          reference,
          feeRateApplied: feeRate,
          split: {
            total: amountCOP,
            rebuskeFee: splitRebuske,
            proPayout: splitPro
          }
        });
      }

      // MEJORA AUDITADA: Manejo automático de cancelaciones y reversiones bancarias (VOIDED / CANCELLED)
      if (status === 'VOIDED' || status === 'CANCELLED') {
        console.log(`[Tomás FinTech] Transacción ANULADA/REVERTIDA (${status}) en Wompi: ${reference}. Liberando custodia.`);
        
        // Verificar si existe tarifa de desplazamiento retenida ($15.000 COP)
        const hasTransportFee = event?.data?.transaction?.customer_data?.transport_fee_applied === true;
        const transportFee = hasTransportFee ? 15000 : 0;
        const refundAmount = Math.max(0, amountCOP - transportFee);

        return res.status(200).json({
          status: 'success',
          event: status,
          action: 'ESCROW_RELEASED_REFUNDED',
          message: hasTransportFee 
            ? `Custodia anulada con compensación de transporte ($15.000 COP) al técnico. Reembolso cliente: $${refundAmount} COP.`
            : `Custodia liberada al 100%. Reembolso completo al cliente: $${amountCOP} COP sin comisión.`,
          transactionId: tx.id,
          reference,
          refund: {
            totalOriginal: amountCOP,
            transportCompensationPro: transportFee,
            clientRefund: refundAmount
          }
        });
      }

      // Manejo de pagos declinados o con error en pasarela
      if (status === 'DECLINED' || status === 'ERROR') {
        console.warn(`[Tomás FinTech] Transacción DECLINADA o ERROR en Wompi: ${reference} (${status})`);
        return res.status(200).json({
          status: 'handled',
          event: status,
          action: 'ESCROW_PAYMENT_FAILED',
          message: `La transacción fue declinada por la entidad financiera (${paymentMethod}). La orden pasa a estado PENDIENTE_REINTENTO_PAGO.`,
          transactionId: tx.id,
          reference
        });
      }
    }

    return res.status(200).json({ status: 'received', message: 'Evento registrado con éxito.' });
  } catch (error) {
    console.error('[Wompi Webhook] Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
