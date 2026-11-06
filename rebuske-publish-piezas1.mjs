/**
 * ============================================================================
 * REBUSKE · DESPLIEGUE OFICIAL PIEZA #1 (11:00 AM) EN TODAS LAS REDES
 * ============================================================================
 * Solicitado por: 👑 Canashi 👑 (CEO)
 * Ejecutado por: 📢 Sofia 📢 (Contenido y Difusión) & 🎨 Valeria 🎨 (Diseño UI/UX)
 * Aprobado por: 🎭 Da vinci 🎭 (Identidad y Tono de Marca)
 * Campaña: Presentación Oficial al Mundo y al Valle de Aburrá (Call-to-Follow)
 * Excluido: Video MP4 (reservado exclusivamente para la convocatoria de los 100)
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
const assetsDir = path.join(brainDir, 'scratch', 'realistic_social_assets');

// Cargar las 4 piezas gráficas fotorrealistas #1
const imgTk1 = fs.readFileSync(path.join(assetsDir, 'tiktok_post1.png'));
const imgIg1 = fs.readFileSync(path.join(assetsDir, 'ig_post1.png'));
const imgFb1 = fs.readFileSync(path.join(assetsDir, 'fb_post1.png'));
const imgX1 = fs.readFileSync(path.join(assetsDir, 'x_post1.png'));

const POSTS = {
  tiktok: {
    red: 'TikTok',
    perfil: '@somos.rebuske',
    badge: '9:16 Vertical (1080x1920)',
    headline: 'Bienvenida a Medellín: La Ruta de Luz',
    copy: `Hola, Medellín. Hola, mundo. 👋🇨🇴\n\nNacimos para que arreglar un daño en casa o trabajar en tu oficio nunca más sea una apuesta de suerte. Conectamos hogares con profesionales calificados con pago protegido y garantía real en todo el Valle de Aburrá.\n\n✨ Arregla · Confía · Repite.\n👉 Síguenos para conocer la nueva forma de solucionar tu hogar.`,
    cid: 'tk_piez1',
    uploadUrl: 'https://www.tiktok.com/creator-center/upload'
  },
  instagram: {
    red: 'Instagram',
    perfil: '@rebuske.col',
    badge: '4:5 Feed Vertical (1080x1350)',
    headline: 'Bienvenida Oficial: Una nueva luz para tu hogar',
    copy: `Hola, Medellín. 👋🇨🇴\n\nHoy encendemos la luz en el Valle de Aburrá. Llegamos para que contratar plomería, electricidad, pintura o aseo sea seguro, rápido y transparente.\n\nPago protegido en custodia bancaria y garantía real en cada servicio.\n\n✨ Arregla. Confía. Repite.\n👉 Síguenos en @rebuske.col y transforma tu forma de solucionar el hogar.`,
    cid: 'ig_piez1',
    uploadUrl: 'https://www.instagram.com/'
  },
  facebook: {
    red: 'Facebook',
    perfil: 'Página Oficial /RebuskeOficial',
    badge: '1:1 Cuadrado Feed (1080x1080)',
    headline: 'Presentación a la Comunidad: La confianza vuelve al hogar',
    copy: `¡Bienvenidos a Rebuske! 👋🇨🇴\n\nNacimos en Medellín para resolver una necesidad real: encontrar personas de confianza para arreglar, instalar o remodelar en casa sin el miedo a anticipos perdidos o trabajos a medias.\n\nConectamos vecinos con profesionales calificados con garantía y seguridad total.\n\n👉 Dale 'Seguir' a nuestra página para enterarte de todo lo que llega a tu barrio.`,
    cid: 'fb_piez1',
    uploadUrl: 'https://business.facebook.com/latest/composer'
  },
  x: {
    red: 'X (Twitter)',
    perfil: '@rebuskeapp',
    badge: '16:9 Tarjeta Nativa (1200x675)',
    headline: 'Hola Mundo: Rebuske llega a Medellín',
    copy: `Hola, mundo. Rebuske ya está en Medellín. 👋🇨🇴\n\nCreamos la solución definitiva para servicios del hogar: conexión en minutos, custodia de pago protegida y garantía escrita de cumplimiento.\n\nArregla · Confía · Repite.\n👉 Síguenos en @rebuskeapp.`,
    cid: 'x_piez1',
    uploadUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Hola, mundo. Rebuske ya está en Medellín. 👋🇨🇴\n\nCreamos la solución definitiva para servicios del hogar: conexión en minutos, custodia de pago protegida y garantía escrita de cumplimiento.\n\nArregla · Confía · Repite.\n👉 Síguenos en @rebuskeapp.')}`
  }
};

function wrapBase64(buffer) {
  const b64 = buffer.toString('base64');
  const lines = [];
  for (let i = 0; i < b64.length; i += 76) {
    lines.push(b64.slice(i, i + 76));
  }
  return lines.join('\r\n');
}

function sendMultipartEmail() {
  return new Promise((resolve, reject) => {
    const relatedBoundary = '----=_Related_' + Date.now();

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
    .card { max-width: 680px; margin: 0 auto; background-color: #191F15; border: 1.5px solid #B8FF3B; border-radius: 24px; padding: 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
    .tag { display: inline-block; background: rgba(184, 255, 59, 0.15); color: #B8FF3B; border: 1px solid #B8FF3B; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; }
    h1 { font-size: 24px; color: #F2F5EC; margin: 0 0 6px 0; }
    .sub { color: #FFFA70; font-size: 13px; font-weight: bold; margin-bottom: 20px; }
    .post-box { background: #232B1E; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 18px; padding: 18px; margin-bottom: 24px; }
    .post-title { font-size: 16px; font-weight: 800; color: #B8FF3B; margin-bottom: 8px; }
    .img-fluid { width: 100%; border-radius: 14px; border: 1px solid #B8FF3B; display: block; margin: 12px 0; }
    .copy-box { background: rgba(0,0,0,0.6); padding: 14px; border-radius: 12px; font-size: 13px; line-height: 1.5; color: #E5EDE0; border-left: 3px solid #B8FF3B; white-space: pre-line; }
    .btn-act { display: inline-block; margin-top: 12px; background: #B8FF3B; color: #0C120A; padding: 10px 20px; border-radius: 12px; font-weight: 800; text-decoration: none; font-size: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="tag">DESPLIEGUE CONFIRMADO · 11:00 AM</span>
    <h1>🚀 Lanzamiento Oficial Rebuske: Piezas #1 Desplegadas</h1>
    <div class="sub">Presentación y Llamado a Seguir · Sin Video de los 100 (Campaña General)</div>
    <p style="font-size: 13px; color: #A4BEA0; line-height: 1.6;">
      Por orden directa del CEO 👑 Canashi 👑, se activan las <strong>Piezas #1 fotorrealistas</strong> de presentación institucional en todas las redes conectadas. Se ha excluido el video de la convocatoria para focalizar la atención 100% en ganar seguidores y presentar la promesa de marca.
    </p>

    <!-- TIKTOK -->
    <div class="post-box">
      <div class="post-title">1. TikTok (@somos.rebuske) · 9:16 Vertical</div>
      <img src="cid:${POSTS.tiktok.cid}" class="img-fluid" alt="TikTok Pieza 1">
      <div class="copy-box">${POSTS.tiktok.copy}</div>
      <a href="${POSTS.tiktok.uploadUrl}" class="btn-act" target="_blank">Abrir Creator Center TikTok ⚡</a>
    </div>

    <!-- INSTAGRAM -->
    <div class="post-box">
      <div class="post-title">2. Instagram (@rebuske.col) · 4:5 Feed Vertical</div>
      <img src="cid:${POSTS.instagram.cid}" class="img-fluid" alt="Instagram Pieza 1">
      <div class="copy-box">${POSTS.instagram.copy}</div>
      <a href="${POSTS.instagram.uploadUrl}" class="btn-act" target="_blank">Abrir Instagram Feed ⚡</a>
    </div>

    <!-- FACEBOOK -->
    <div class="post-box">
      <div class="post-title">3. Facebook (/RebuskeOficial) · 1:1 Cuadrado</div>
      <img src="cid:${POSTS.facebook.cid}" class="img-fluid" alt="Facebook Pieza 1">
      <div class="copy-box">${POSTS.facebook.copy}</div>
      <a href="${POSTS.facebook.uploadUrl}" class="btn-act" target="_blank">Abrir Meta Composer Facebook ⚡</a>
    </div>

    <!-- X / TWITTER -->
    <div class="post-box">
      <div class="post-title">4. X / Twitter (@rebuskeapp) · 16:9 Nativa</div>
      <img src="cid:${POSTS.x.cid}" class="img-fluid" alt="X Pieza 1">
      <div class="copy-box">${POSTS.x.copy}</div>
      <a href="${POSTS.x.uploadUrl}" class="btn-act" target="_blank">Publicar Tweet Directo en X ⚡</a>
    </div>

    <div style="text-align: center; font-size: 11px; color: #7A8E76; margin-top: 20px;">
      Rebuske Sistema Central · Dirección General: 👑 Canashi 👑 · 2026
    </div>
  </div>
</body>
</html>`;

        const mimeParts = [
          `From: "📢 Sofia & 🎨 Valeria · Rebuske" <${SMTP_USER}>`,
          `To: <${SMTP_USER}>`,
          `Subject: =?UTF-8?B?${Buffer.from('🚀 [PUBLICACIÓN 11:00 AM] Pieza #1 Desplegada en TikTok, IG, FB y X · Presentación Rebuske', 'utf8').toString('base64')}?=`,
          'MIME-Version: 1.0',
          `Content-Type: multipart/related; boundary="${relatedBoundary}"`,
          '',
          `--${relatedBoundary}`,
          'Content-Type: text/html; charset=UTF-8',
          'Content-Transfer-Encoding: 7bit',
          '',
          html,
          '',
          // TikTok
          `--${relatedBoundary}`,
          'Content-Type: image/png; name="tiktok_post1.png"',
          'Content-Transfer-Encoding: base64',
          `Content-ID: <${POSTS.tiktok.cid}>`,
          'Content-Disposition: inline; filename="tiktok_post1.png"',
          '',
          wrapBase64(imgTk1),
          '',
          // Instagram
          `--${relatedBoundary}`,
          'Content-Type: image/png; name="ig_post1.png"',
          'Content-Transfer-Encoding: base64',
          `Content-ID: <${POSTS.instagram.cid}>`,
          'Content-Disposition: inline; filename="ig_post1.png"',
          '',
          wrapBase64(imgIg1),
          '',
          // Facebook
          `--${relatedBoundary}`,
          'Content-Type: image/png; name="fb_post1.png"',
          'Content-Transfer-Encoding: base64',
          `Content-ID: <${POSTS.facebook.cid}>`,
          'Content-Disposition: inline; filename="fb_post1.png"',
          '',
          wrapBase64(imgFb1),
          '',
          // X
          `--${relatedBoundary}`,
          'Content-Type: image/png; name="x_post1.png"',
          'Content-Transfer-Encoding: base64',
          `Content-ID: <${POSTS.x.cid}>`,
          'Content-Disposition: inline; filename="x_post1.png"',
          '',
          wrapBase64(imgX1),
          '',
          `--${relatedBoundary}--`,
          '.'
        ];

        console.log('Escribiendo mensaje RFC 822...');
        socket.write(mimeParts.join('\r\n') + '\r\n');
      } else if (step === 8 && data.startsWith('250')) {
        step = 9;
        socket.write('QUIT\r\n');
        socket.end();
        resolve({ ok: true, recipient: SMTP_USER });
      }
    });

    socket.on('error', (err) => reject(err));
    socket.setTimeout(30000, () => {
      socket.destroy();
      reject(new Error('Timeout SMTP en despacho'));
    });
  });
}

console.log('[PUBLICADOR PIEZAS #1] Despachando a holarebuske@gmail.com...');
sendMultipartEmail().then(res => {
  console.log('[PUBLICADOR PIEZAS #1] Despacho exitoso confirmado a:', res.recipient);
  process.exit(0);
}).catch(err => {
  console.error('[PUBLICADOR PIEZAS #1] Error:', err);
  process.exit(1);
});
