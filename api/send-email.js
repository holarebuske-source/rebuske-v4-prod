/**
 * ============================================================================
 * REBUSKE v4 PROD · REAL GMAIL SMTP TRANSACTIONAL & EXECUTIVE MAILER
 * ============================================================================
 * 1) Correos Transaccionales (Con Estilo Visual 60-30-10 Rebuske) desde
 *    holarebuske@gmail.com para Clientes y Profesionales SOLO en eventos
 *    financieros, contractuales y de seguridad:
 *      - Cuando contratan (acuerdo + Pago Protegido activado)
 *      - Cuando ya se realizó el trabajo y se dispersa el pago (93% Pro / 7% Rebuske)
 *      - Cuando el profesional retira su pago a Nequi/Daviplata/Banco
 *      - Cuando el cliente ingresa/vincula su tarjeta o medio de pago
 *      - Cuando el profesional configura su cuenta de retiro o aprueba su Verificación (5 fotos + sin logo)
 *      - Cuando se abre o resuelve una Garantía de 2 Días
 *
 * 2) Informe Ejecutivo cada 4 días para Camilo (CEO) enviado directamente a
 *    camiloescobarr63@gmail.com EN FORMATO 100% EJECUTIVO TEXTO SOBRIO (sin diseño).
 * ============================================================================
 */

const tls = require('tls');

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = process.env.GMAIL_USER || 'holarebuske@gmail.com';
const SMTP_PASS = (process.env.GMAIL_APP_PASSWORD || 'ovvihqcugaxrrmgu').replace(/\s+/g, '');
const CEO_REPORT_EMAIL = 'camiloescobarr63@gmail.com';

function sendRawSmtpMail({ fromName, to, cc, subject, html, text }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    let buffer = '';
    let step = 0;
    const recipients = [to, ...(cc ? [cc] : [])].filter(Boolean);
    let rcptIdx = 0;

    const boundary = `reb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
    const encodedFromName = `=?UTF-8?B?${Buffer.from(fromName || 'Rebuske Colombia', 'utf8').toString('base64')}?=`;

    const isPlainOnly = Boolean(text && !html);
    const mimeMessage = isPlainOnly
      ? [
          `From: ${encodedFromName} <${SMTP_USER}>`,
          `To: <${to}>`,
          `Reply-To: <${SMTP_USER}>`,
          `Subject: ${encodedSubject}`,
          `MIME-Version: 1.0`,
          `Content-Type: text/plain; charset=UTF-8`,
          `Content-Transfer-Encoding: base64`,
          ``,
          Buffer.from(text, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
          ``,
          `.`
        ].join('\r\n')
      : [
          `From: ${encodedFromName} <${SMTP_USER}>`,
          `To: <${to}>`,
          ...(cc ? [`Cc: <${cc}>`] : []),
          `Reply-To: <${SMTP_USER}>`,
          `Subject: ${encodedSubject}`,
          `MIME-Version: 1.0`,
          `Content-Type: multipart/alternative; boundary="${boundary}"`,
          ``,
          `--${boundary}`,
          `Content-Type: text/html; charset=UTF-8`,
          `Content-Transfer-Encoding: base64`,
          ``,
          Buffer.from(html || '', 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
          ``,
          `--${boundary}--`,
          `.`
        ].join('\r\n');

    const sendCmd = (cmd) => socket.write(cmd + '\r\n');

    const timeout = setTimeout(() => {
      socket.destroy();
      reject(new Error('SMTP timeout'));
    }, 15000);

    socket.on('data', (chunk) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split('\r\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line || line.length < 3) continue;
        if (line[3] === '-') continue;
        const code = parseInt(line.slice(0, 3), 10);

        if (code >= 400) {
          clearTimeout(timeout);
          socket.end();
          return reject(new Error(`SMTP Error ${code}: ${line}`));
        }

        if (step === 0 && code === 220) {
          step = 1;
          sendCmd('EHLO rebuske.co');
        } else if (step === 1 && code === 250) {
          step = 2;
          const authStr = Buffer.from(`\0${SMTP_USER}\0${SMTP_PASS}`, 'utf8').toString('base64');
          sendCmd(`AUTH PLAIN ${authStr}`);
        } else if (step === 2 && code === 235) {
          step = 3;
          sendCmd(`MAIL FROM:<${SMTP_USER}>`);
        } else if (step === 3 && code === 250) {
          if (rcptIdx < recipients.length) {
            const nextRcpt = recipients[rcptIdx++];
            sendCmd(`RCPT TO:<${nextRcpt}>`);
          } else {
            step = 4;
            sendCmd('DATA');
          }
        } else if (step === 4 && code === 354) {
          step = 5;
          sendCmd(mimeMessage);
        } else if (step === 5 && code === 250) {
          step = 6;
          sendCmd('QUIT');
          clearTimeout(timeout);
          socket.end();
          return resolve({ ok: true, response: line, to, subject });
        }
      }
    });

    socket.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

function buildRebuskeEmailTemplate({ badge, refCode, title, subtitle, rows = [], footerNote, ctaText, ctaUrl }) {
  const rowsHtml = rows
    .map(
      ([label, val, highlight]) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #1E2530;color:#9CA3AF;font-size:13px;">${label}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #1E2530;color:${highlight ? '#B8FF3B' : '#F5F7FA'};font-weight:${highlight ? '800' : '600'};font-size:${highlight ? '15px' : '13px'};text-align:right;">${val}</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:28px 14px;background-color:#0D1016;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F5F7FA;">
  <div style="max-width:580px;margin:0 auto;background:#14181F;border:1px solid #232A36;border-radius:20px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.6);">
    <div style="padding:22px 26px;background:linear-gradient(135deg,#19202B 0%,#12161E 100%);border-bottom:1px solid #232A36;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td>
            <span style="display:inline-block;padding:5px 12px;border-radius:99px;background:rgba(184,255,59,0.14);border:1px solid rgba(184,255,59,0.35);color:#B8FF3B;font-size:11px;font-weight:800;letter-spacing:0.8px;text-transform:uppercase;">${badge || 'REBUSKE COLOMBIA'}</span>
          </td>
          ${refCode ? `<td style="text-align:right;font-family:monospace;font-size:12px;color:#9CA3AF;">REF: <strong style="color:#B8FF3B;">${refCode}</strong></td>` : ''}
        </tr>
      </table>
      <h1 style="margin:14px 0 6px;font-size:21px;font-weight:800;color:#F5F7FA;letter-spacing:-0.3px;">${title}</h1>
      <p style="margin:0;font-size:13.5px;color:#9CA3AF;line-height:1.5;">${subtitle || ''}</p>
    </div>
    <div style="padding:22px 26px;">
      <table style="width:100%;border-collapse:collapse;background:#0D1016;border-radius:14px;overflow:hidden;border:1px solid #232A36;">
        <tbody>${rowsHtml}</tbody>
      </table>
      ${
        footerNote
          ? `<div style="margin-top:18px;padding:14px 16px;border-radius:12px;background:rgba(34,197,94,0.09);border:1px solid rgba(34,197,94,0.3);font-size:12.5px;color:#D1FAE5;line-height:1.5;">${footerNote}</div>`
          : ''
      }
      ${
        ctaText
          ? `<div style="margin-top:20px;text-align:center;"><a href="${ctaUrl || 'https://rebuske.vercel.app'}" style="display:inline-block;padding:13px 28px;border-radius:12px;background:#B8FF3B;color:#0D1016;font-weight:800;font-size:13.5px;text-decoration:none;">${ctaText}</a></div>`
          : ''
      }
      <p style="margin:20px 0 0;font-size:11px;color:#6B7280;text-align:center;">
        Enviado automáticamente desde <strong>holarebuske@gmail.com</strong> · Rebuske Medellín, Colombia
      </p>
    </div>
  </div>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Use POST' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    // Modo exclusivo para Reportes Ejecutivos de Camilo cada 4 días (100% texto plano ejecutivo, sin diseño)
    if (body.mode === 'ceo_executive_plain') {
      const result = await sendRawSmtpMail({
        fromName: 'Rebuske Dirección Ejecutiva',
        to: CEO_REPORT_EMAIL,
        subject: body.subject || `[REPORTE EJECUTIVO 4D] Corte Financiero y Operativo Rebuske`,
        text: body.text || 'Reporte Ejecutivo de Ciclo de 4 Días.'
      });
      return res.status(200).json({ ok: true, mode: 'ceo_executive_plain', recipient: CEO_REPORT_EMAIL, ...result });
    }

    // Modo Transaccional Clientes y Profesionales (con Estilo Visual 60-30-10)
    const to = body.to || SMTP_USER;
    const subject = body.subject || '[Rebuske] Comprobante Transaccional';
    const html =
      body.html ||
      buildRebuskeEmailTemplate({
        badge: body.badge || 'COMPROBANTE OFICIAL REBUSKE',
        refCode: body.refCode || '',
        title: body.title || subject,
        subtitle: body.subtitle || '',
        rows: Array.isArray(body.rows) ? body.rows : [],
        footerNote: body.footerNote || '',
        ctaText: body.ctaText || 'Abrir Rebuske App →',
        ctaUrl: body.ctaUrl || 'https://rebuske.vercel.app'
      });

    const result = await sendRawSmtpMail({
      fromName: 'Rebuske Colombia',
      to,
      cc: body.cc || null,
      subject,
      html
    });

    return res.status(200).json({ ok: true, sender: SMTP_USER, ...result });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

module.exports.sendRawSmtpMail = sendRawSmtpMail;
module.exports.buildRebuskeEmailTemplate = buildRebuskeEmailTemplate;
