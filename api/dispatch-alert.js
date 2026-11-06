/**
 * ============================================================================
 * REBUSKE · API DESPACHO INMEDIATO & ALERTAS OPERATIVAS (api/dispatch-alert.js)
 * ============================================================================
 * Sofía (Operaciones & Despacho) · Camilo (CEO)
 *
 * Dispara una alerta en tiempo real a la central de despacho cuando un cliente
 * en Medellín busca o solicita un técnico en la app web.
 * Notifica a: holarebuske@gmail.com y camiloescobarr63@gmail.com
 * ============================================================================
 */

import tls from 'node:tls';
import fs from 'node:fs';
import path from 'node:path';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';
const NOTIFY_EMAILS = ['holarebuske@gmail.com', 'camiloescobarr63@gmail.com'];

function sendDispatchEmail({ trade, comuna, barrio, clientName, clientPhone, clientNotes, reference }) {
  return new Promise((resolve) => {
    try {
      const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
      socket.setTimeout(8000, () => { socket.destroy(); resolve(false); });
      let step = 0;

      const subject = `🚨 [DESPACHO INMEDIATO] ${trade} en ${comuna || 'Medellín'}`;
      const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
      const cleanPhone = (clientPhone || '').replace(/\D/g, '');
      const waLink = cleanPhone ? `https://wa.me/57${cleanPhone.startsWith('57') ? cleanPhone.slice(2) : cleanPhone}?text=${encodeURIComponent(`Hola ${clientName || 'Cliente'}, te escribe la Central de Despacho de rebuske en Medellín sobre tu solicitud de ${trade}. ¿En qué dirección exacta te encuentras?`)}` : '#';

      const html = `
      <div style="font-family:'Segoe UI',sans-serif;background:#0C120A;color:#F4FBF1;padding:24px;border-radius:16px;max-width:550px;">
        <div style="border-bottom:2px solid #B8FF3B;padding-bottom:12px;margin-bottom:16px;">
          <span style="background:#B8FF3B;color:#0C120A;padding:4px 10px;border-radius:99px;font-size:11px;font-weight:900;">DESPACHO MEDELLÍN · 35-45 MIN</span>
          <h2 style="color:#FFF;margin:8px 0 0;font-size:20px;">Nueva Solicitud: ${trade}</h2>
          <small style="color:#B8FF3B;font-mono">Ref: ${reference || 'DSP-' + Date.now()}</small>
        </div>
        <table style="width:100%;font-size:13px;color:#C6D8BF;line-height:1.8;">
          <tr><td><strong>Comuna / Zona:</strong></td><td style="color:#FFF;">${comuna} ${barrio ? '· ' + barrio : ''}</td></tr>
          <tr><td><strong>Cliente:</strong></td><td style="color:#FFF;">${clientName || 'Usuario en App Web'}</td></tr>
          <tr><td><strong>Teléfono / WhatsApp:</strong></td><td style="color:#FFF;">+57 ${cleanPhone}</td></tr>
          <tr><td><strong>Detalle del Daño:</strong></td><td style="color:#FFFA70;">${clientNotes || 'Solicitud prioritaria por app web'}</td></tr>
          <tr><td><strong>Tarifa Visita / Diagnóstico:</strong></td><td style="color:#B8FF3B;">$35.000 COP (Abonable a la labor)</td></tr>
        </table>
        <div style="margin-top:20px;text-align:center;">
          <a href="${waLink}" style="display:inline-block;background:#25D366;color:#0C120A;font-weight:900;text-decoration:none;padding:12px 24px;border-radius:99px;font-size:14px;box-shadow:0 0 15px rgba(37,211,102,0.4);">
            Contactar al Cliente por WhatsApp 💬
          </a>
        </div>
        <p style="font-size:11px;color:#7E967A;margin-top:20px;text-align:center;">
          rebuske Colombia · Central Operativa Medellín 2026
        </p>
      </div>`;

      const mime = [
        `From: "rebuske Despacho" <${SMTP_USER}>`,
        `To: <${NOTIFY_EMAILS.join(', ')}>`,
        `Subject: ${encodedSubject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        `Content-Transfer-Encoding: base64`,
        ``,
        Buffer.from(html, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
        `.`
      ].join('\r\n');

      const sendCmd = (c) => socket.write(c + '\r\n');

      socket.on('data', (d) => {
        const line = d.toString('utf8');
        const code = parseInt(line.slice(0, 3), 10);
        if (step === 0 && code === 220) {
          step = 1; sendCmd('EHLO rebuske.app');
        } else if (step === 1 && code === 250) {
          step = 2; sendCmd(`AUTH PLAIN ${Buffer.from(`\0${SMTP_USER}\0${SMTP_PASS}`).toString('base64')}`);
        } else if (step === 2 && code === 235) {
          step = 3; sendCmd(`MAIL FROM:<${SMTP_USER}>`);
        } else if (step === 3 && code === 250) {
          step = 4; sendCmd(`RCPT TO:<${NOTIFY_EMAILS[0]}>`);
        } else if (step === 4 && code === 250) {
          step = 5; sendCmd(`RCPT TO:<${NOTIFY_EMAILS[1]}>`);
        } else if (step === 5 && code === 250) {
          step = 6; sendCmd('DATA');
        } else if (step === 6 && code === 354) {
          step = 7; socket.write(mime + '\r\n');
        } else if (step === 7 && code === 250) {
          step = 8; sendCmd('QUIT'); socket.end(); resolve(true);
        }
      });
      socket.on('error', () => resolve(false));
    } catch (_) {
      resolve(false);
    }
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Método no permitido' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const { trade, comuna, barrio, clientName, clientPhone, clientNotes } = body;

  const dispatchRef = 'DSP-' + Date.now().toString(36).toUpperCase();
  const alertPayload = {
    reference: dispatchRef,
    trade: trade || 'Servicio Técnico General',
    comuna: comuna || 'Medellín',
    barrio: barrio || '',
    clientName: clientName || 'Cliente en App Web',
    clientPhone: clientPhone || '',
    clientNotes: clientNotes || 'Solicitud de técnico en tiempo real',
    timestamp: new Date().toISOString()
  };

  // Disparar correo a Canashi / Despacho en segundo plano
  sendDispatchEmail(alertPayload).catch(() => {});

  // Registrar localmente para resiliencia
  try {
    const logPath = path.join('/tmp', 'rebuske_dispatch_log.json');
    let log = [];
    if (fs.existsSync(logPath)) {
      try { log = JSON.parse(fs.readFileSync(logPath, 'utf8')); } catch (_) {}
    }
    log.unshift(alertPayload);
    fs.writeFileSync(logPath, JSON.stringify(log.slice(0, 100), null, 2), 'utf8');
  } catch (_) {}

  return res.status(200).json({
    ok: true,
    dispatchId: dispatchRef,
    estimatedArrival: '35 a 45 min',
    slaMin: 35,
    slaMax: 45,
    message: 'Solicitud recibida por la Central de Despacho de rebuske en Medellín. Un especialista está siendo asignado.'
  });
}
