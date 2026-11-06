/**
 * ============================================================================
 * REBUSKE · CAPTURA CINEMATOGRÁFICA EN VIVO & DESPACHO DE VIDEO MP4 AL CEO
 * ============================================================================
 * Genera un video real (.mp4) de 240 frames a 24 fps de la nueva experiencia
 * cinematográfica de registro.html usando Chrome Headless + CDP + FFmpeg,
 * y lo envía por correo electrónico a holarebuske@gmail.com y camiloescobarr63@gmail.com.
 * ============================================================================
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import tls from 'tls';
import { spawn, execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WebSocket = require('C:/Users/camil/.gemini/antigravity/scratch/rebuske-whatsapp-bot/node_modules/ws');

const BASE_DIR = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const FRAMES_DIR = path.join(BASE_DIR, 'social_campaign', 'frames');
const OUTPUT_VIDEO = path.join(BASE_DIR, 'social_campaign', 'rebuske_registro_cinematic_demo.mp4');
const ARTIFACT_VIDEO = 'C:/Users/camil/.gemini/antigravity/brain/0efe1562-ff3c-463f-b5ee-5944a14c6d84/rebuske_registro_cinematic_demo.mp4';
const FFMPEG_PATH = 'C:/Users/camil/.gemini/antigravity/scratch/habbo-clone/node_modules/ffmpeg-static/ffmpeg.exe';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\chrome_temp_record_cinematic';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';
const TO_EMAIL = 'holarebuske@gmail.com';
const CC_EMAIL = 'camiloescobarr63@gmail.com';

const PORT = 3899;

// 1. Servidor Local HTTP para servir registro.html con assets
function startLocalServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/' || reqPath === '/registro') reqPath = '/registro.html';
      const filePath = path.join(BASE_DIR, reqPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          '.html': 'text/html; charset=utf-8',
          '.css': 'text/css',
          '.js': 'application/javascript',
          '.mjs': 'application/javascript',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.svg': 'image/svg+xml',
          '.ttf': 'font/ttf',
          '.woff': 'font/woff',
          '.woff2': 'font/woff2'
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(fs.readFileSync(filePath));
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });

    server.listen(PORT, '127.0.0.1', () => {
      console.log(`🌐 Servidor local activo en http://127.0.0.1:${PORT}`);
      resolve(server);
    });
  });
}

// 2. Conectar a Chrome CDP y capturar 240 frames con interacciones fluidas
async function captureCinematicFrames() {
  console.log('🎬 Iniciando Google Chrome Headless para captura cinematográfica...');

  // Limpiar frames previos
  if (fs.existsSync(FRAMES_DIR)) {
    const files = fs.readdirSync(FRAMES_DIR);
    for (const f of files) {
      if (f.endsWith('.jpg') || f.endsWith('.png')) {
        fs.unlinkSync(path.join(FRAMES_DIR, f));
      }
    }
  } else {
    fs.mkdirSync(FRAMES_DIR, { recursive: true });
  }

  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    `--user-data-dir=${USER_DATA_DIR}`,
    `http://127.0.0.1:${PORT}/registro.html`
  ]);

  await new Promise(r => setTimeout(r, 2500));

  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', async () => {
        try {
          const targets = JSON.parse(body);
          const pageTarget = targets.find(t => t.type === 'page' && t.url.includes(PORT.toString()));
          if (!pageTarget) {
            throw new Error('No se encontró el target de la página de registro');
          }

          console.log('🔌 Conectando WebSocket a Chrome CDP...');
          const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

          let id = 1;
          const sendCDP = (method, params = {}) => new Promise((resSend) => {
            const reqId = id++;
            const onMsg = (data) => {
              const msg = JSON.parse(data);
              if (msg.id === reqId) {
                ws.off('message', onMsg);
                resSend(msg.result);
              }
            };
            ws.on('message', onMsg);
            ws.send(JSON.stringify({ id: reqId, method, params }));
          });

          ws.on('open', async () => {
            console.log('📐 Configurando viewport cinematográfico 1280x720 (16:9 widescreen)...');
            await sendCDP('Emulation.setDeviceMetricsOverride', {
              width: 1280,
              height: 720,
              deviceScaleFactor: 1.25,
              mobile: false
            });

            await sendCDP('Page.enable');
            // Dar 1s para que la atmósfera y partículas inicien
            await new Promise(r => setTimeout(r, 1000));

            const totalFrames = 240; // 10 segundos a 24 fps
            console.log(`🎥 Grabando ${totalFrames} frames cinematográficos a 24 fps...`);

            let currentScroll = 0;

            for (let i = 0; i < totalFrames; i++) {
              // Coreografía de Cámara Cinematográfica
              if (i >= 30 && i < 75) {
                // Scroll suave hacia las tarjetas de selección
                currentScroll += 8;
                await sendCDP('Runtime.evaluate', {
                  expression: `window.scrollTo({ top: ${currentScroll}, behavior: 'instant' });`
                });
              } else if (i === 80) {
                // Click en "Soy Profesional"
                console.log('   ✦ Frame 80: Seleccionando Rol "Soy Profesional"...');
                await sendCDP('Runtime.evaluate', {
                  expression: `if (typeof selectRole === 'function') selectRole('pro');`
                });
              } else if (i >= 85 && i < 135) {
                // Scroll por el formulario de profesionales
                currentScroll += 7;
                await sendCDP('Runtime.evaluate', {
                  expression: `window.scrollTo({ top: ${currentScroll}, behavior: 'instant' });`
                });
              } else if (i === 145) {
                // Click en "Soy Cliente / Hogar"
                console.log('   ✦ Frame 145: Seleccionando Rol "Soy Cliente / Hogar"...');
                await sendCDP('Runtime.evaluate', {
                  expression: `if (typeof selectRole === 'function') selectRole('cliente');`
                });
              } else if (i >= 150 && i < 195) {
                // Scroll por el formulario de clientes y bono $15.000
                currentScroll = Math.max(350, currentScroll - 4);
                await sendCDP('Runtime.evaluate', {
                  expression: `window.scrollTo({ top: ${currentScroll}, behavior: 'instant' });`
                });
              } else if (i >= 200 && i < 235) {
                // Regreso majestuoso hacia el Hero con las luciérnagas
                currentScroll = Math.max(0, currentScroll - 16);
                await sendCDP('Runtime.evaluate', {
                  expression: `window.scrollTo({ top: ${currentScroll}, behavior: 'instant' });`
                });
              }

              // Captura de frame en alta calidad JPEG
              const shot = await sendCDP('Page.captureScreenshot', {
                format: 'jpeg',
                quality: 88
              });

              const frameNum = String(i + 1).padStart(4, '0');
              const framePath = path.join(FRAMES_DIR, `frame_${frameNum}.jpg`);
              fs.writeFileSync(framePath, Buffer.from(shot.data, 'base64'));

              if ((i + 1) % 48 === 0) {
                console.log(`   📸 Capturados ${i + 1}/${totalFrames} frames (${((i + 1) / totalFrames * 100).toFixed(0)}%)...`);
              }
            }

            console.log('✅ Captura de todos los frames completada.');
            ws.close();
            chrome.kill();
            resolve();
          });
        } catch (err) {
          chrome.kill();
          reject(err);
        }
      });
    }).on('error', (e) => {
      chrome.kill();
      reject(e);
    });
  });
}

// 3. Renderizar Video MP4 con FFmpeg
function renderVideo() {
  console.log('🎞️ Renderizando video MP4 con FFmpeg a 24 fps (H.264)...');
  const inputPattern = path.join(FRAMES_DIR, 'frame_%04d.jpg');
  const cmd = `"${FFMPEG_PATH}" -y -framerate 24 -i "${inputPattern}" -c:v libx264 -pix_fmt yuv420p -crf 20 -preset fast -movflags +faststart "${OUTPUT_VIDEO}"`;
  
  execSync(cmd, { stdio: 'inherit' });
  console.log(`✅ Video generado exitosamente en: ${OUTPUT_VIDEO}`);

  // Copiar al directorio de artefactos para acceso directo
  fs.copyFileSync(OUTPUT_VIDEO, ARTIFACT_VIDEO);
  console.log(`✅ Copia guardada en artefactos: ${ARTIFACT_VIDEO}`);
}

// 4. Enviar correo al CEO con el video adjunto y reporte ejecutivo
function writeChunked(socket, data) {
  return new Promise((resolve) => {
    let offset = 0;
    const chunkSize = 64 * 1024;
    function writeNext() {
      while (offset < data.length) {
        const chunk = data.slice(offset, offset + chunkSize);
        offset += chunkSize;
        if (!socket.write(chunk)) {
          socket.once('drain', writeNext);
          return;
        }
      }
      resolve();
    }
    writeNext();
  });
}

function sendEmailWithVideoAttachment() {
  return new Promise((resolve, reject) => {
    console.log('📬 Despachando correo con video MP4 a holarebuske@gmail.com y camiloescobarr63@gmail.com...');

    const videoBuf = fs.readFileSync(OUTPUT_VIDEO);
    const videoSizeMb = (videoBuf.length / (1024 * 1024)).toFixed(2);
    console.log(`   📦 Peso del video adjunto: ${videoSizeMb} MB`);

    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    let buffer = '';
    let step = 0;
    let rcptIndex = 0;

    const boundary = `rebuske_video_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from('🎬 [VIDEO PREVIEW] Experiencia Cinematográfica Oficial · Portal de Registro rebuske', 'utf8').toString('base64')}?=`;
    const encodedFromName = `=?UTF-8?B?${Buffer.from('🎨 Valeria & 💻 Mateo · rebuske', 'utf8').toString('base64')}?=`;

    const recipients = [TO_EMAIL, CC_EMAIL];

    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Video Preview Cinematográfico · rebuske</title>
    </head>
    <body style="background-color: #070B06; color: #F4FBF1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 25px;">
      <div style="max-width: 680px; margin: 0 auto; background: #0E170C; border: 1px solid rgba(184,255,59,0.3); border-radius: 24px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
        
        <!-- Header -->
        <div style="text-align: center; border-bottom: 1px solid rgba(184,255,59,0.25); padding-bottom: 24px; margin-bottom: 24px;">
          <span style="background: rgba(184,255,59,0.15); color: #B8FF3B; padding: 6px 18px; border-radius: 999px; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; border: 1px solid rgba(184,255,59,0.3);">EXPERIENCIA CINEMATOGRÁFICA OFICIAL</span>
          <h1 style="color: #F4FBF1; font-size: 26px; margin: 16px 0 6px 0; font-weight: 800;">🎬 VIDEO PREVIEW: PORTAL DE REGISTRO</h1>
          <p style="color: #97A890; font-size: 14px; margin: 0;">Para: <b>👑 Canashi 👑 (CEO & Fundador de rebuske)</b></p>
        </div>

        <!-- Video Badge Alert -->
        <div style="background: rgba(184,255,59,0.08); border-left: 4px solid #B8FF3B; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
          <h3 style="color: #B8FF3B; margin: 0 0 6px 0; font-size: 16px;">📹 Video MP4 Adjunto al Correo (${videoSizeMb} MB)</h3>
          <p style="color: #F4FBF1; font-size: 13px; margin: 0;">
            Adjuntamos el video <b>rebuske_registro_cinematic_demo.mp4</b> renderizado a 24 fps (film frame rate) mostrando la navegación real, las partículas bioluminiscentes de la luciérnaga, el selector de roles y los formularios. Puedes reproducirlo directamente en tu teléfono o descargarlo.
          </p>
        </div>

        <!-- Concepto & Mejoras Aplicadas -->
        <h3 style="color: #FFFA70; font-size: 18px; margin-top: 0;">✨ ¿Qué incluye la nueva experiencia cinematográfica?</h3>
        <ul style="color: #F4FBF1; font-size: 14px; padding-left: 20px; space-y: 8px;">
          <li style="margin-bottom: 8px;"><b>Lienzo Bioluminiscente Vivo:</b> Canvas interactivo en el fondo con luciérnagas en verde lima (<code>#B8FF3B</code>) que flotan con pulsaciones orgánicas simulando la noche de Medellín.</li>
          <li style="margin-bottom: 8px;"><b>Viñeta y Reflector Cinemático:</b> Haz de luz difusa que reacciona con micro-movimientos para dar una sensación inmersiva de alta gama sin sobrecargar la batería.</li>
          <li style="margin-bottom: 8px;"><b>Tarjetas Monolíticas de Selección:</b> Cristal ahumado orgánico con bordes iluminados, separando nítidamente <b>Profesionales Fundadores (1% comisión)</b> y <b>Clientes VIP (Bono $15.000 COP)</b>.</li>
          <li style="margin-bottom: 8px;"><b>Información 100% Preservada:</b> No se eliminó ningún campo. Se mantienen la validación de antecedentes, carga de fotos, Bóveda Wompi protegida, Reto 333, odómetro de cupos y soporte de Laura.</li>
          <li style="margin-bottom: 8px;"><b>Canal Directo de Laura (+57 304 381 2882):</b> Botón flotante con aura de bioluminiscencia en la esquina para resolución instantánea de dudas.</li>
        </ul>

        <!-- Action Call -->
        <div style="background: #142211; border: 1px solid rgba(184,255,59,0.3); border-radius: 16px; padding: 20px; text-align: center; margin: 28px 0 10px 0;">
          <p style="color: #B8FF3B; font-weight: bold; font-size: 15px; margin: 0 0 10px 0;">🔗 Probar también la versión en vivo interactiva:</p>
          <a href="https://rebuske.vercel.app/registro" style="display: inline-block; background: #B8FF3B; color: #0C120A; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-weight: 800; font-size: 14px;">ABRIR PORTAL DE REGISTRO EN VIVO</a>
        </div>

        <p style="font-size: 13px; color: #97A890; text-align: center; margin-top: 20px;">
          <i>"Vamos modificando en el camino según tus indicaciones directas, 👑 Canashi 👑."</i>
        </p>

        <!-- Footer -->
        <div style="text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 24px; font-size: 11px; color: #6E8268;">
          rebuske · Servicios del Hogar con Pago Protegido | Medellín, Colombia<br/>
          Generado y verificado por 🎨 Valeria 🎨 & 💻 Mateo 💻
        </div>

      </div>
    </body>
    </html>
    `;

    socket.on('data', async (chunk) => {
      buffer += chunk.toString();

      if (step === 0 && buffer.includes('220')) {
        step = 1;
        buffer = '';
        socket.write(`EHLO rebuske.local\r\n`);
      } else if (step === 1 && buffer.includes('250 ')) {
        step = 2;
        buffer = '';
        socket.write(`AUTH LOGIN\r\n`);
      } else if (step === 2 && buffer.includes('334')) {
        step = 3;
        buffer = '';
        socket.write(Buffer.from(SMTP_USER).toString('base64') + '\r\n');
      } else if (step === 3 && buffer.includes('334')) {
        step = 4;
        buffer = '';
        socket.write(Buffer.from(SMTP_PASS).toString('base64') + '\r\n');
      } else if (step === 4 && buffer.includes('235')) {
        step = 5;
        buffer = '';
        socket.write(`MAIL FROM:<${SMTP_USER}>\r\n`);
      } else if (step === 5 && buffer.includes('250')) {
        step = 6;
        buffer = '';
        rcptIndex = 0;
        socket.write(`RCPT TO:<${recipients[rcptIndex]}>\r\n`);
      } else if (step === 6 && buffer.includes('250')) {
        buffer = '';
        rcptIndex++;
        if (rcptIndex < recipients.length) {
          socket.write(`RCPT TO:<${recipients[rcptIndex]}>\r\n`);
        } else {
          step = 7;
          socket.write(`DATA\r\n`);
        }
      } else if (step === 7 && buffer.includes('354')) {
        step = 8;
        buffer = '';

        const headers = [
          `From: ${encodedFromName} <${SMTP_USER}>`,
          `To: <${TO_EMAIL}>`,
          `Cc: <${CC_EMAIL}>`,
          `Reply-To: <${SMTP_USER}>`,
          `Subject: ${encodedSubject}`,
          `MIME-Version: 1.0`,
          `Content-Type: multipart/mixed; boundary="${boundary}"`,
          ``,
          `--${boundary}`,
          `Content-Type: text/html; charset=UTF-8`,
          `Content-Transfer-Encoding: base64`,
          ``,
          Buffer.from(htmlBody, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
          ``
        ].join('\r\n');

        let fullPayload = headers;

        // Adjuntar video MP4
        const videoB64 = videoBuf.toString('base64').replace(/(.{76})/g, '$1\r\n');
        const videoPart = [
          `--${boundary}`,
          `Content-Type: video/mp4; name="rebuske_registro_cinematic_demo.mp4"`,
          `Content-Disposition: attachment; filename="rebuske_registro_cinematic_demo.mp4"`,
          `Content-Transfer-Encoding: base64`,
          ``,
          videoB64,
          ``
        ].join('\r\n');

        fullPayload += videoPart;
        fullPayload += `--${boundary}--\r\n.\r\n`;

        await writeChunked(socket, fullPayload);
      } else if (step === 8 && buffer.includes('250')) {
        step = 9;
        socket.write(`QUIT\r\n`);
        console.log('✅ Correo con video MP4 entregado exitosamente a Gmail.');
        resolve(true);
      }
    });

    socket.on('error', (err) => {
      reject(err);
    });
  });
}

// 5. Orquestador Principal
async function main() {
  console.log('======================================================================');
  console.log('🚀 INICIANDO PRODUCCIÓN CINEMATOGRÁFICA DE REBUSKE (VIDEO DEMO MP4)');
  console.log('======================================================================');

  let server;
  try {
    server = await startLocalServer();
    await captureCinematicFrames();
    renderVideo();
    await sendEmailWithVideoAttachment();
    console.log('\n======================================================================');
    console.log('🎉 PROCESO CINEMATOGRÁFICO COMPLETADO EXITOSAMENTE');
    console.log(`• Video local: ${OUTPUT_VIDEO}`);
    console.log(`• Video artefacto: ${ARTIFACT_VIDEO}`);
    console.log('• Enviado a: holarebuske@gmail.com & camiloescobarr63@gmail.com');
    console.log('======================================================================');
  } catch (err) {
    console.error('❌ Error en el proceso cinematográfico:', err);
  } finally {
    if (server) server.close();
    process.exit(0);
  }
}

main();
