/**
 * ============================================================================
 * REBUSKE · ENVÍO VIDEO DE BIENVENIDA TIKTOK (HOGARES & CLIENTES MEDELLÍN)
 * ============================================================================
 * Solicitado por: 👑 Canashi 👑 (CEO)
 * Video: rebuske_tiktok_perfect_master.mp4 (15.00s · 1080x1920 · 9:16 Vertical)
 * Destino: holarebuske@gmail.com
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import tls from 'node:tls';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';

const brainDir = 'C:\\Users\\camil\\.gemini\\antigravity\\brain\\0efe1562-ff3c-463f-b5ee-5944a14c6d84';
const videoPath = path.join(brainDir, 'rebuske_tiktok_perfect_master.mp4');

if (!fs.existsSync(videoPath)) {
  console.error('El video no existe en:', videoPath);
  process.exit(1);
}

const videoBuffer = fs.readFileSync(videoPath);
console.log(`Video cargado exitosamente (${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB).`);

function wrapBase64(buffer) {
  const b64 = buffer.toString('base64');
  const lines = [];
  for (let i = 0; i < b64.length; i += 76) {
    lines.push(b64.slice(i, i + 76));
  }
  return lines.join('\r\n');
}

function sendWelcomeVideoEmail() {
  return new Promise((resolve, reject) => {
    const mixedBoundary = '----=_Mixed_Rebuske_' + Date.now();
    const altBoundary = '----=_Alt_' + Date.now();

    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    let step = 0;
    socket.setEncoding('utf8');

    socket.on('data', (data) => {
      if (step === 0 && data.startsWith('220')) {
        step = 1;
        socket.write('EHLO localhost\r\n');
      } else if (step === 1 && data.includes('250')) {
        step = 2;
        socket.write('AUTH LOGIN\r\n');
      } else if (step === 2 && data.startsWith('334')) {
        step = 3;
        socket.write(Buffer.from(SMTP_USER).toString('base64') + '\r\n');
      } else if (step === 3 && data.startsWith('334')) {
        step = 4;
        socket.write(Buffer.from(SMTP_PASS).toString('base64') + '\r\n');
      } else if (step === 4 && data.startsWith('235')) {
        step = 5;
        socket.write(`MAIL FROM:<${SMTP_USER}>\r\n`);
      } else if (step === 5 && data.startsWith('250')) {
        step = 6;
        socket.write(`RCPT TO:<${SMTP_USER}>\r\n`);
      } else if (step === 6 && data.startsWith('250')) {
        step = 7;
        socket.write('DATA\r\n');
      } else if (step === 7 && data.startsWith('354')) {
        step = 8;

        const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 20px; background-color: #0b0f08; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F2F5EC; }
    .card { max-width: 640px; margin: 0 auto; background-color: #191F15; border: 1.5px solid #B8FF3B; border-radius: 24px; padding: 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
    .tag { display: inline-block; background: rgba(184, 255, 59, 0.15); color: #B8FF3B; border: 1px solid #B8FF3B; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; }
    h1 { font-size: 22px; color: #F2F5EC; margin: 0 0 6px 0; }
    .sub { color: #FFFA70; font-size: 13px; font-weight: bold; margin-bottom: 20px; }
    .feature-box { background: #232B1E; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 18px; margin-bottom: 20px; }
    .feature-title { font-size: 15px; font-weight: 800; color: #B8FF3B; margin-bottom: 8px; }
    .timeline-step { font-size: 13px; color: #E5EDE0; margin-bottom: 10px; line-height: 1.5; }
    .badge-time { background: #0C120A; color: #B8FF3B; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; margin-right: 6px; }
    .callout { background: rgba(184, 255, 59, 0.08); border-left: 3px solid #B8FF3B; padding: 12px 16px; border-radius: 0 12px 12px 0; font-size: 13px; color: #E0EBDC; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="tag">ENTREGA DE ACTIVO AUDIOVISUAL OFICIAL</span>
    <h1>🎬 Video de Bienvenida TikTok · Medellín</h1>
    <div class="sub">15.00s · Formato Nativo 9:16 (1080x1920) · Presentación a Hogares y Usuarios</div>

    <p style="font-size: 13px; color: #A4BEA0; line-height: 1.6;">
      Hola, 👑 Canashi 👑. Aquí tienes el <strong>video oficial de bienvenida</strong> (presentación a Medellín, Bóveda Wompi y garantía de 2 días), totalmente diferenciado del video de la campaña de los 100 técnicos Primordiales.
    </p>

    <div class="feature-box">
      <div class="feature-title">Estructura del Guion Audiovisual (15s)</div>
      
      <div class="timeline-step">
        <span class="badge-time">00:00 - 00:03</span>
        <strong>El Dolor en Medellín:</strong> "¿Te pidieron anticipo para un arreglo y nunca llegaron? Cero anticipos perdidos."
      </div>
      <div class="timeline-step">
        <span class="badge-time">00:03 - 00:06</span>
        <strong>La Solución Rebuske:</strong> "¡En Medellín eso se acabó! Llegó Rebuske. Arregla · Confía · Repite."
      </div>
      <div class="timeline-step">
        <span class="badge-time">00:06 - 00:10</span>
        <strong>Pago Protegido Wompi:</strong> "Tu dinero queda en custodia bancaria (Nequi / Bancolombia). El técnico cobra solo si estás feliz."
      </div>
      <div class="timeline-step">
        <span class="badge-time">00:10 - 00:13</span>
        <strong>Garantía Escrita:</strong> "2 días de garantía técnica y profesionales 5 estrellas calificados."
      </div>
      <div class="timeline-step">
        <span class="badge-time">00:13 - 00:15</span>
        <strong>Llamado a la Acción (CTA):</strong> "Síguenos y descubre la nueva forma de solucionar tu hogar en el Valle de Aburrá."
      </div>
    </div>

    <div class="callout">
      <strong>📎 Archivo adjunto:</strong> <code>Rebuske_Bienvenida_Medellin_TikTok.mp4</code> listo para descargar y publicar en TikTok (@somos.rebuske), Instagram Reels (@rebuske.col) o Shorts.
    </div>

    <div style="text-align: center; font-size: 11px; color: #7A8E76; margin-top: 24px;">
      Rebuske Sistema Audiovisual · 📢 Sofia 📢 & 🎨 Valeria 🎨 · 2026
    </div>
  </div>
</body>
</html>`;

        const rawHeader = [
          `From: "📢 Sofia & 🎨 Valeria · Rebuske" <${SMTP_USER}>`,
          `To: <${SMTP_USER}>`,
          `Subject: =?UTF-8?B?${Buffer.from('🎬 [VIDEO TIKTOK BIENVENIDA] Rebuske Medellín: Arregla · Confía · Repite (15s Vertical)', 'utf8').toString('base64')}?=`,
          'MIME-Version: 1.0',
          `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`,
          '',
          `--${mixedBoundary}`,
          `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
          '',
          `--${altBoundary}`,
          'Content-Type: text/plain; charset=UTF-8',
          '',
          'Video de bienvenida oficial para TikTok y Reels adjunto.',
          '',
          `--${altBoundary}`,
          'Content-Type: text/html; charset=UTF-8',
          'Content-Transfer-Encoding: 7bit',
          '',
          html,
          '',
          `--${altBoundary}--`,
          '',
          // Video adjunto
          `--${mixedBoundary}`,
          'Content-Type: video/mp4; name="Rebuske_Bienvenida_Medellin_TikTok.mp4"',
          'Content-Transfer-Encoding: base64',
          'Content-Disposition: attachment; filename="Rebuske_Bienvenida_Medellin_TikTok.mp4"',
          '',
          wrapBase64(videoBuffer),
          '',
          `--${mixedBoundary}--`,
          '.'
        ];

        console.log('Enviando video MP4 adjunto a través de TLS...');
        socket.write(rawHeader.join('\r\n') + '\r\n');
      } else if (step === 8 && data.startsWith('250')) {
        step = 9;
        socket.write('QUIT\r\n');
        socket.end();
        resolve({ ok: true, recipient: SMTP_USER });
      }
    });

    socket.on('error', (err) => reject(err));
    socket.setTimeout(45000, () => {
      socket.destroy();
      reject(new Error('Timeout SMTP en envío'));
    });
  });
}

console.log('[DESPACHO VIDEO BIENVENIDA] Conectando a Gmail...');
sendWelcomeVideoEmail().then(res => {
  console.log('[DESPACHO VIDEO BIENVENIDA] Video despachado con éxito a:', res.recipient);
  process.exit(0);
}).catch(err => {
  console.error('[DESPACHO VIDEO BIENVENIDA] Error:', err);
  process.exit(1);
});
