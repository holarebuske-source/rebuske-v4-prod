/**
 * ============================================================================
 * REBUSKE · DESPLIEGUE OFICIAL PIEZA #2: "EL ORGULLO DEL OFICIO" (PROTOCOLO 1 TOQUE)
 * ============================================================================
 * Solicitado por: 👑 Canashi 👑 (CEO)
 * Ejecutado por: 📢 Sofia 📢 (Contenido y Difusión) & 🎨 Valeria 🎨 (Diseño UI/UX)
 * Aprobado por: 🎭 Da vinci 🎭 (Identidad de Marca) & 🛡️ Dante 🛡️ (Filtro Crítico)
 * Tema: Dignidad, maestría técnica, pago protegido y garantía escrita de 2 días.
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

// Cargar las 4 piezas gráficas fotorrealistas #2
const imgTk2 = fs.readFileSync(path.join(assetsDir, 'tiktok_post2.png'));
const imgIg2 = fs.readFileSync(path.join(assetsDir, 'ig_post2.png'));
const imgFb2 = fs.readFileSync(path.join(assetsDir, 'fb_post2.png'));
const imgX2 = fs.readFileSync(path.join(assetsDir, 'x_post2.png'));

const POSTS = {
  tiktok: {
    red: 'TikTok',
    perfil: '@somos.rebuske',
    badge: '9:16 Vertical (1080x1920)',
    headline: 'El Orgullo del Oficio: Maestros de Confianza',
    copy: `En Medellín el trabajo bien hecho se nota en los detalles. 🛠️🇨🇴\n\nConoce a los especialistas que entran a tu hogar con respeto, herramientas limpias y certificación real. Con Rebuske nunca entregas anticipos al ojo: tu plata se queda en custodia bancaria y solo se libera con tu visto bueno.\n\n✨ Arregla · Confía · Repite.\n👉 Síguenos en @somos.rebuske`,
    cid: 'tk_piez2',
    uploadUrl: 'https://www.tiktok.com/creator-center/upload'
  },
  instagram: {
    red: 'Instagram',
    perfil: '@rebuske.col',
    badge: '4:5 Feed Vertical (1080x1350)',
    headline: 'Dignidad, Puntualidad y Trabajo Impecable',
    copy: `¿Dar el 50% de anticipo a ciegas? En Medellín eso ya es historia. 🛑✨\n\nEn Rebuske reunimos a los plomeros, electricistas y pintores más cumplidos del Valle de Aburrá:\n\n1️⃣ Ruta de Luz: 3 propuestas claras en tu zona.\n2️⃣ Pago Protegido: Tu dinero en custodia segura.\n3️⃣ Garantía de 2 días: Respaldada por escrito.\n\nArregla con tranquilidad. Confía en los que saben.\n👉 Síguenos en @rebuske.col`,
    cid: 'ig_piez2',
    uploadUrl: 'https://www.instagram.com/'
  },
  facebook: {
    red: 'Facebook',
    perfil: 'Página Oficial /RebuskeOficial',
    badge: '1:1 Cuadrado Feed (1080x1080)',
    headline: 'El Estándar que Medellín Merecía para su Hogar',
    copy: `Vecinos del Valle de Aburrá 👋\n\nArreglar un tubo roto, una fuga eléctrica o pintar la sala ya no tiene que ser motivo de estrés. Con Rebuske conectas con profesionales evaluados con sello de confianza, pago protegido y 2 días de garantía legal.\n\nEl respeto al cliente y el orgullo por el buen oficio vuelven a encontrarse.\n\n👉 Síguenos y comparte con tu familia para el próximo arreglo.`,
    cid: 'fb_piez2',
    uploadUrl: 'https://business.facebook.com/latest/composer'
  },
  x: {
    red: 'X (Twitter)',
    perfil: '@rebuskeapp',
    badge: '16:9 Tarjeta Nativa (1200x675)',
    headline: 'Cero Riesgos con Anticipos: La Nueva Regla',
    copy: `En Medellín el talento sobra. Lo que faltaba era un sistema que protegiera tanto al hogar como al técnico cumplido. 🛠️✨\n\nRebuske es:\n1️⃣ 3 cotizaciones reales.\n2️⃣ Pago Protegido en custodia Wompi.\n3️⃣ Garantía escrita de 2 días.\n\nArregla · Confía · Repite 👇\nhttps://rebuske.co`,
    cid: 'x_piez2',
    uploadUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent('En Medellín el talento sobra. Lo que faltaba era un sistema que protegiera tanto al hogar como al técnico cumplido. 🛠️✨\n\nRebuske es:\n1️⃣ 3 cotizaciones reales.\n2️⃣ Pago Protegido en custodia Wompi.\n3️⃣ Garantía escrita de 2 días.\n\nArregla · Confía · Repite 👇\nhttps://rebuske.co\n\n@rebuskeapp')}`
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
      } else if (step === 5 && data.includes('250')) {
        step = 6;
        socket.write(`RCPT TO:<${SMTP_USER}>\r\n`);
      } else if (step === 6 && data.includes('250')) {
        step = 7;
        socket.write('DATA\r\n');
      } else if (step === 7 && data.startsWith('354')) {
        step = 8;

        const subject = '🔥 [REBUSKE AUDITORÍA CEO] Pieza #2: El Orgullo del Oficio (TikTok, IG, FB, X) · Protocolo 1 Toque';
        const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
        const fromHeader = `=?UTF-8?B?${Buffer.from('📢 Sofia & 🎨 Valeria · Rebuske Content', 'utf8').toString('base64')}?= <${SMTP_USER}>`;

        let header = '';
        header += `From: ${fromHeader}\r\n`;
        header += `To: <${SMTP_USER}>\r\n`;
        header += `Subject: ${encodedSubject}\r\n`;
        header += `MIME-Version: 1.0\r\n`;
        header += `Content-Type: multipart/related; boundary="${relatedBoundary}"\r\n\r\n`;

        socket.write(header);

        // HTML Body
        let htmlPart = `--${relatedBoundary}\r\n`;
        htmlPart += `Content-Type: text/html; charset=UTF-8\r\n`;
        htmlPart += `Content-Transfer-Encoding: 8bit\r\n\r\n`;

        htmlPart += `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Pieza #2: El Orgullo del Oficio</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif; background: #0A0D14; color: #F3F4F6; margin: 0; padding: 24px 12px; }
    .card { max-width: 680px; margin: 0 auto; background: #111827; border: 1px solid #1F2937; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); }
    .top-banner { background: linear-gradient(135deg, #064E3B 0%, #065F46 100%); padding: 26px 28px; border-bottom: 2px solid #10B981; }
    .title { margin: 0 0 6px 0; font-size: 23px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px; }
    .sub { margin: 0; font-size: 13.5px; color: #A7F3D0; }
    .content { padding: 28px; }
    .post-box { background: #1A2234; border: 1px solid #28354D; border-radius: 14px; padding: 20px; margin-bottom: 28px; }
    .net-badge { display: inline-block; padding: 5px 12px; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
    .badge-tk { background: #FF004F; color: #FFF; }
    .badge-ig { background: #E1306C; color: #FFF; }
    .badge-fb { background: #1877F2; color: #FFF; }
    .badge-x  { background: #000000; color: #FFF; border: 1px solid #374151; }
    .post-title { font-size: 16px; font-weight: 700; color: #FFF; margin: 0 0 4px 0; }
    .post-user { font-size: 12px; color: #9CA3AF; margin-bottom: 14px; font-family: monospace; }
    .copy-box { background: #0F1523; border: 1px solid #1F293D; border-radius: 8px; padding: 14px; font-size: 13px; line-height: 1.6; color: #D1D5DB; white-space: pre-line; margin-bottom: 16px; }
    .btn-action { display: inline-block; padding: 12px 22px; border-radius: 10px; font-size: 13.5px; font-weight: 700; text-decoration: none; color: #FFF; transition: 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
    .btn-primary { background: #10B981; color: #064E3B; font-weight: 800; }
    .btn-x { background: #1D9BF0; color: #FFF; }
    .img-preview { width: 100%; border-radius: 10px; margin-top: 14px; border: 1px solid #374151; display: block; max-height: 480px; object-fit: contain; background: #05070B; }
    .footer { text-align: center; padding: 20px; font-size: 11.5px; color: #6B7280; border-top: 1px solid #1F2937; }
  </style>
</head>
<body>
  <div class="card">
    <div class="top-banner">
      <h1 class="title">🔥 REBUSKE · PIEZA #2: EL ORGULLO DEL OFICIO</h1>
      <p class="sub">Protocolo de Publicación Inmediata (1 Toque) · Medellín & Valle de Aburrá</p>
    </div>

    <div class="content">
      <p style="font-size: 13.5px; line-height: 1.5; color: #9CA3AF; margin-top: 0; margin-bottom: 24px;">
        Aprobado por 👑 <strong>Canashi</strong> 👑, coordinado por 📢 <strong>Sofia</strong> 📢 y diseñado por 🎨 <strong>Valeria</strong> 🎨.
        Esta segunda entrega visibiliza la maestría de nuestros técnicos certificados, erradica los anticipos a ciegas y posiciona el <strong>Pago Protegido Wompi</strong> con 2 días de garantía.
      </p>

      <!-- 1. TIKTOK -->
      <div class="post-box">
        <span class="net-badge badge-tk">TikTok · ${POSTS.tiktok.badge}</span>
        <div class="post-title">${POSTS.tiktok.headline}</div>
        <div class="post-user">${POSTS.tiktok.perfil}</div>
        <div class="copy-box">${POSTS.tiktok.copy}</div>
        <a href="${POSTS.tiktok.uploadUrl}" target="_blank" class="btn-action btn-primary">🚀 Abrir TikTok Creator Center (1 Toque)</a>
        <img src="cid:${POSTS.tiktok.cid}" class="img-preview" alt="TikTok Arte 2">
      </div>

      <!-- 2. INSTAGRAM -->
      <div class="post-box">
        <span class="net-badge badge-ig">Instagram · ${POSTS.instagram.badge}</span>
        <div class="post-title">${POSTS.instagram.headline}</div>
        <div class="post-user">${POSTS.instagram.perfil}</div>
        <div class="copy-box">${POSTS.instagram.copy}</div>
        <a href="${POSTS.instagram.uploadUrl}" target="_blank" class="btn-action btn-primary">📸 Abrir Instagram Web (1 Toque)</a>
        <img src="cid:${POSTS.instagram.cid}" class="img-preview" alt="Instagram Arte 2">
      </div>

      <!-- 3. FACEBOOK -->
      <div class="post-box">
        <span class="net-badge badge-fb">Facebook · ${POSTS.facebook.badge}</span>
        <div class="post-title">${POSTS.facebook.headline}</div>
        <div class="post-user">${POSTS.facebook.perfil}</div>
        <div class="copy-box">${POSTS.facebook.copy}</div>
        <a href="${POSTS.facebook.uploadUrl}" target="_blank" class="btn-action btn-primary">🌐 Abrir Meta Business Suite (1 Toque)</a>
        <img src="cid:${POSTS.facebook.cid}" class="img-preview" alt="Facebook Arte 2">
      </div>

      <!-- 4. X (TWITTER) -->
      <div class="post-box">
        <span class="net-badge badge-x">X · ${POSTS.x.badge}</span>
        <div class="post-title">${POSTS.x.headline}</div>
        <div class="post-user">${POSTS.x.perfil}</div>
        <div class="copy-box">${POSTS.x.copy}</div>
        <a href="${POSTS.x.uploadUrl}" target="_blank" class="btn-action btn-x">⚡ Tuitear con Texto Precargado (1 Toque)</a>
        <img src="cid:${POSTS.x.cid}" class="img-preview" alt="X Arte 2">
      </div>
    </div>

    <div class="footer">
      Rebuske Medellín · Oficina de Comunicaciones y Crecimiento Orgánico<br>
      Protocolo de Publicación Inmediata de Alta Fidelidad
    </div>
  </div>
</body>
</html>\r\n\r\n`;

        socket.write(htmlPart);

        // Attachment helper
        function writeAttachment(filename, cid, buffer) {
          let att = `--${relatedBoundary}\r\n`;
          att += `Content-Type: image/png; name="${filename}"\r\n`;
          att += `Content-Transfer-Encoding: base64\r\n`;
          att += `Content-ID: <${cid}>\r\n`;
          att += `Content-Disposition: inline; filename="${filename}"\r\n\r\n`;
          att += wrapBase64(buffer) + '\r\n\r\n';
          socket.write(att);
        }

        console.log('Adjuntando pieza TikTok #2...');
        writeAttachment('tiktok_post2.png', POSTS.tiktok.cid, imgTk2);

        console.log('Adjuntando pieza Instagram #2...');
        writeAttachment('ig_post2.png', POSTS.instagram.cid, imgIg2);

        console.log('Adjuntando pieza Facebook #2...');
        writeAttachment('fb_post2.png', POSTS.facebook.cid, imgFb2);

        console.log('Adjuntando pieza X #2...');
        writeAttachment('x_post2.png', POSTS.x.cid, imgX2);

        // Terminar
        socket.write(`--${relatedBoundary}--\r\n\r\n.\r\n`);
      } else if (step === 8 && data.includes('250')) {
        step = 9;
        socket.write('QUIT\r\n');
        resolve({ success: true, message: 'Dossier Pieza #2 enviado con éxito a holarebuske@gmail.com' });
      }
    });

    socket.on('error', (err) => {
      reject(err);
    });

    socket.on('end', () => {
      if (step < 8) reject(new Error('Conexión cerrada prematuramente por el servidor SMTP'));
    });
  });
}

async function main() {
  console.log('Iniciando envío de Pieza #2 a holarebuske@gmail.com...');
  try {
    const res = await sendMultipartEmail();
    console.log('Resultado:', res);
  } catch (err) {
    console.error('Error enviando pieza #2:', err);
  }
}

main();
