/**
 * ============================================================================
 * API: /api/activar-mes1-promo
 * Activa el Mes 1 al 1% de Comisión para los 100 Fundadores tras el envío masivo
 * de correos de activación de cuenta.
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import tls from 'node:tls';

const PROMO_PATH = path.join(process.cwd(), 'rebuske_primordiales_promo.json');
const DB_PATH = path.join(process.cwd(), 'rebuske_primordiales_db.json');

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = process.env.GMAIL_USER || 'holarebuske@gmail.com';
const SMTP_PASS = (process.env.GMAIL_APP_PASSWORD || 'ovvihqcugaxrrmgu').replace(/\s+/g, '');

function notifyEmailActivation(promo) {
  return new Promise((resolve) => {
    try {
      const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
      const subject = `[ACTIVACIÓN OFICIAL] Mes 1 al 1% de Comisión Activado para los 100 Fundadores Rebuske`;
      const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
      const encodedFromName = `=?UTF-8?B?${Buffer.from('Tomás FinTech Rebuske', 'utf8').toString('base64')}?=`;

      const bodyHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:auto;background:#0c120a;color:#f4fbf1;padding:24px;border-radius:16px;border:2px solid #b8ff3b;">
          <h2 style="color:#b8ff3b;margin-top:0;">⚡ Mes 1 al 1% de Comisión Oficialmente Activado</h2>
          <p style="color:#9fb392;font-size:13px;">Se ha disparado el cronómetro de 30 días para los 100 Profesionales Fundadores de Medellín.</p>
          <hr style="border:0;border-top:1px solid #23361e;margin:20px 0;">
          <div style="background:#141f11;padding:16px;border-radius:12px;border:1px solid #2d4228;font-size:13px;line-height:1.6;">
            <p><b>Fecha de Activación:</b> ${promo.activated_at}</p>
            <p><b>Fecha de Vencimiento (30 días):</b> ${promo.expires_at}</p>
            <p><b>Tarifa Vigente en Wompi:</b> <span style="color:#b8ff3b;font-weight:bold;">1% Rebuske / 99% Neto para el Técnico</span></p>
            <p><b>Tarifa Posterior al Vencimiento:</b> <span style="color:#facc15;font-weight:bold;">7% Rebuske / 93% Neto Vitalicio</span></p>
          </div>
          <p style="margin-top:16px;font-size:12px;color:#8ca381;">El split en los webhooks de Wompi aplicará el 1% de forma automática e irrevocable durante esta ventana.</p>
        </div>
      `;

      const mimeMessage = [
        `From: ${encodedFromName} <${SMTP_USER}>`,
        `To: <holarebuske@gmail.com>`,
        `Subject: ${encodedSubject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        `Content-Transfer-Encoding: base64`,
        ``,
        Buffer.from(bodyHtml, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
        ``,
        `.`
      ].join('\r\n');

      let step = 0;
      socket.on('data', (d) => {
        const msg = d.toString();
        if (step === 0 && msg.startsWith('220')) { socket.write('EHLO rebuske.app\r\n'); step = 1; }
        else if (step === 1 && msg.startsWith('250')) { socket.write('AUTH LOGIN\r\n'); step = 2; }
        else if (step === 2 && msg.startsWith('334')) { socket.write(Buffer.from(SMTP_USER).toString('base64') + '\r\n'); step = 3; }
        else if (step === 3 && msg.startsWith('334')) { socket.write(Buffer.from(SMTP_PASS).toString('base64') + '\r\n'); step = 4; }
        else if (step === 4 && msg.startsWith('235')) { socket.write(`MAIL FROM:<${SMTP_USER}>\r\n`); step = 5; }
        else if (step === 5 && msg.startsWith('250')) { socket.write(`RCPT TO:<holarebuske@gmail.com>\r\n`); step = 6; }
        else if (step === 6 && msg.startsWith('250')) { socket.write(`DATA\r\n`); step = 7; }
        else if (step === 7 && msg.startsWith('354')) { socket.write(mimeMessage + '\r\n'); step = 8; }
        else if (step === 8 && msg.startsWith('250')) { socket.write('QUIT\r\n'); socket.end(); resolve(true); }
      });
      socket.on('error', () => resolve(false));
      setTimeout(() => { socket.destroy(); resolve(false); }, 7000);
    } catch (e) {
      resolve(false);
    }
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Leer estado actual
  let promo = {
    promo_id: 'mes_1_al_1_pct_fundadores',
    is_activated: false,
    duration_days: 30,
    promo_fee_rate: 0.01,
    standard_founder_fee_rate: 0.07,
    regular_fee_rate: 0.09
  };

  try {
    if (fs.existsSync(PROMO_PATH)) {
      promo = JSON.parse(fs.readFileSync(PROMO_PATH, 'utf8'));
    }
  } catch (e) {}

  // Si es GET: consultar estado
  if (req.method === 'GET') {
    const now = Date.now();
    const isCurrentlyActive = promo.is_activated && promo.expires_at && now <= new Date(promo.expires_at).getTime();
    return res.status(200).json({
      ...promo,
      is_currently_in_effect: isCurrentlyActive,
      effective_fee_rate: isCurrentlyActive ? promo.promo_fee_rate : promo.standard_founder_fee_rate
    });
  }

  // Si es POST: Activar la promoción
  const now = new Date();
  const expires = new Date(now.getTime() + (promo.duration_days || 30) * 24 * 60 * 60 * 1000);

  promo.is_activated = true;
  promo.activated_at = now.toISOString();
  promo.expires_at = expires.toISOString();
  promo.status_label = 'ACTIVO (1% COMISIÓN / 99% NETO DURANTE 30 DÍAS)';

  try {
    fs.writeFileSync(PROMO_PATH, JSON.stringify(promo, null, 2), 'utf8');
  } catch (e) {
    console.error('Error guardando promo config:', e);
  }

  // Enviar correo de notificación a holarebuske
  notifyEmailActivation(promo).catch(() => {});

  return res.status(200).json({
    ok: true,
    message: '¡Mes 1 al 1% de comisión activado con éxito por 30 días!',
    promo
  });
}
