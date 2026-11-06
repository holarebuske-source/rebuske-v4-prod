/**
 * ============================================================================
 * REBUSKE · CAMPAÑA PUBLICITARIA OFICIAL REDES SOCIALES (30 POSTS X RED)
 * ============================================================================
 * Redes: Instagram, TikTok, Facebook, LinkedIn (1 correo dedicado por red)
 * Destinatarios: holarebuske@gmail.com con copia a camiloescobarr63@gmail.com
 * Solicitado por: 👑 Canashi 👑 (CEO & Fundador de rebuske)
 * ============================================================================
 */

import tls from 'tls';
import fs from 'fs';
import path from 'path';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';
const TO_EMAIL = 'holarebuske@gmail.com';
const CC_EMAIL = 'camiloescobarr63@gmail.com';

const BASE_DIR = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const CAMPAIGN_DIR = path.join(BASE_DIR, 'social_campaign');

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

function sendRawMimeEmail({ fromName, to, cc, subject, htmlText, imageAttachment }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    let buffer = '';
    let step = 0;

    const boundary = `rebuske_mime_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
    const encodedFromName = `=?UTF-8?B?${Buffer.from(fromName || '🎨 Valeria & 💬 Laura · rebuske', 'utf8').toString('base64')}?=`;

    const recipients = [to];
    if (cc) recipients.push(cc);

    socket.on('data', async (chunk) => {
      buffer += chunk.toString();

      // Step 0: Greeting 220
      if (step === 0 && buffer.includes('220')) {
        step = 1;
        buffer = '';
        socket.write(`EHLO rebuske.local\r\n`);
      }
      // Step 1: EHLO response 250
      else if (step === 1 && buffer.includes('250 ')) {
        step = 2;
        buffer = '';
        socket.write(`AUTH LOGIN\r\n`);
      }
      // Step 2: Username challenge 334
      else if (step === 2 && buffer.includes('334')) {
        step = 3;
        buffer = '';
        socket.write(Buffer.from(SMTP_USER).toString('base64') + '\r\n');
      }
      // Step 3: Password challenge 334
      else if (step === 3 && buffer.includes('334')) {
        step = 4;
        buffer = '';
        socket.write(Buffer.from(SMTP_PASS).toString('base64') + '\r\n');
      }
      // Step 4: Auth OK 235
      else if (step === 4 && buffer.includes('235')) {
        step = 5;
        buffer = '';
        socket.write(`MAIL FROM:<${SMTP_USER}>\r\n`);
      }
      // Step 5: MAIL FROM OK 250
      else if (step === 5 && buffer.includes('250')) {
        step = 6;
        buffer = '';
        // Send RCPT TO for each recipient
        for (const r of recipients) {
          socket.write(`RCPT TO:<${r}>\r\n`);
        }
      }
      // Step 6: RCPT TO OK
      else if (step === 6 && buffer.includes('250')) {
        step = 7;
        buffer = '';
        socket.write(`DATA\r\n`);
      }
      // Step 7: Ready for DATA 354
      else if (step === 7 && buffer.includes('354')) {
        step = 8;
        buffer = '';

        const headers = [
          `From: ${encodedFromName} <${SMTP_USER}>`,
          `To: <${to}>`,
          cc ? `Cc: <${cc}>` : '',
          `Reply-To: <${SMTP_USER}>`,
          `Subject: ${encodedSubject}`,
          `MIME-Version: 1.0`,
          `Content-Type: multipart/related; boundary="${boundary}"`,
          ``,
          `--${boundary}`,
          `Content-Type: text/html; charset=UTF-8`,
          `Content-Transfer-Encoding: base64`,
          ``,
          Buffer.from(htmlText, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
          ``
        ].filter(Boolean).join('\r\n');

        let fullPayload = headers;

        // Inline Image Attachment (rendered as <img src="cid:banner_img" />)
        if (imageAttachment && fs.existsSync(imageAttachment.path)) {
          const fileBuf = fs.readFileSync(imageAttachment.path);
          const b64 = fileBuf.toString('base64').replace(/(.{76})/g, '$1\r\n');
          const fname = imageAttachment.filename || path.basename(imageAttachment.path);

          const imgPart = [
            `--${boundary}`,
            `Content-Type: image/png; name="${fname}"`,
            `Content-Transfer-Encoding: base64`,
            `Content-ID: <banner_img>`,
            `Content-Disposition: inline; filename="${fname}"`,
            ``,
            b64,
            ``
          ].join('\r\n');

          fullPayload += imgPart;
        }

        fullPayload += `--${boundary}--\r\n.\r\n`;

        await writeChunked(socket, fullPayload);
      }
      // Step 8: Queued/Sent 250
      else if (step === 8 && buffer.includes('250')) {
        step = 9;
        socket.write(`QUIT\r\n`);
        resolve(true);
      }
    });

    socket.on('error', (err) => {
      reject(err);
    });
  });
}

export { sendRawMimeEmail, CAMPAIGN_DIR, TO_EMAIL, CC_EMAIL };
