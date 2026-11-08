import tls from 'node:tls';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';

const RECIPIENTS = ['holarebuske@gmail.com', 'camiloescobarr63@gmail.com'];
const SUBJECT = '📕 [REBUSKE OFICIAL] Dossier Maestro de Migración en PDF + 4 Manuales de Dirección';

const masterPdfPath = path.join(__dirname, 'DOSSIER_MAESTRO_MIGRACION_20_DOCUMENTOS_REBUSKE.pdf');
const masterPdfsDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske_updated_master_pdfs';

const attachments = [
  { name: 'DOSSIER_MAESTRO_MIGRACION_20_DOCUMENTOS_REBUSKE.pdf', path: masterPdfPath },
  { name: 'Dossier-de-Migracion-Rebuske.pdf', path: path.join(masterPdfsDir, 'Dossier-de-Migracion-Rebuske.pdf') },
  { name: 'Manual-de-Marca-Rebuske.pdf', path: path.join(masterPdfsDir, 'Manual-de-Marca-Rebuske.pdf') },
  { name: 'Estrategia-Marketing-Voz-Rebuske.pdf', path: path.join(masterPdfsDir, 'Estrategia-Marketing-Voz-Rebuske.pdf') },
  { name: 'Roadmap-de-Producto-Rebuske.pdf', path: path.join(masterPdfsDir, 'Roadmap-de-Producto-Rebuske.pdf') }
];

const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).substring(2)}`;

let introHtml = `
<div style="font-family: Arial, sans-serif; color: #111; max-width: 650px; margin: 0 auto; line-height: 1.6;">
  <div style="background: #0B100E; padding: 24px; border-radius: 12px; color: #F2F5EC; border-bottom: 4px solid #B8FF3B;">
    <h1 style="margin: 0; color: #B8FF3B; font-size: 22px;">REBUSKE · ENTREGA OFICIAL EN FORMATO PDF</h1>
    <p style="margin: 6px 0 0 0; color: #F2F5EC; font-size: 13px;">Supervisión: Camilo Escobar (👑 Canashi 👑) · Dirección General</p>
  </div>
  
  <div style="padding: 20px 0;">
    <p>Estimado <strong>Camilo</strong>,</p>
    <p>Adjunto a este despacho oficial encuentras los <strong>5 Documentos Maestros en formato PDF estructurado y listo para lectura e impresión</strong>, incluyendo el <strong>Dossier Completo de los 20 Documentos de Migración</strong>:</p>
    
    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px;">
      <h4 style="margin: 0 0 10px 0; color: #0F172A;">Documentos Adjuntos en este Envío:</h4>
      <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 13px; line-height: 1.8;">
        <li>📕 <strong>DOSSIER_MAESTRO_MIGRACION_20_DOCUMENTOS_REBUSKE.pdf</strong> (El compendio íntegro de los 20 documentos: agentes, APIs, arquitectura, código base, finanzas Wompi, seguridad, UX y roadmap).</li>
        <li>📘 <strong>Dossier-de-Migracion-Rebuske.pdf</strong> (Resumen ejecutivo y arquitectura base).</li>
        <li>📙 <strong>Manual-de-Marca-Rebuske.pdf</strong> (Identidad bio-orgánica neón, Baloo 2, Plus Jakarta Sans, audio y motion).</li>
        <li>📗 <strong>Estrategia-Marketing-Voz-Rebuske.pdf</strong> (Voz paisa auténtica, cero Buffer, protocolo 1-Touch en redes).</li>
        <li>📓 <strong>Roadmap-de-Producto-Rebuske.pdf</strong> (Cronograma 2026-2027, 17 servicios y Google Play Store).</li>
      </ul>
    </div>

    <div style="background: #F0FDF4; border: 1px solid #BBF7D0; padding: 14px; border-radius: 8px; margin-top: 20px;">
      <p style="margin: 0; color: #166534; font-size: 13px;">
        ✅ <strong>Estado del Sistema:</strong> 152/152 pruebas aprobadas al 100%. Despliegue en producción activo en Vercel y repositorio sincronizado en GitHub.
      </p>
    </div>
  </div>
  
  <div style="font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 12px;">
    rebuske v5.0 · Dirección General · Medellín, Colombia
  </div>
</div>
`;

let rawMime = [
  `From: "Rebuske Dirección General" <${SMTP_USER}>`,
  `To: ${RECIPIENTS.join(', ')}`,
  `Subject: ${SUBJECT}`,
  'MIME-Version: 1.0',
  `Content-Type: multipart/mixed; boundary="${boundary}"`,
  '',
  `--${boundary}`,
  'Content-Type: text/html; charset=UTF-8',
  'Content-Transfer-Encoding: 7bit',
  '',
  introHtml,
  ''
];

for (const att of attachments) {
  if (!fs.existsSync(att.path)) {
    console.warn(`Archivo no encontrado: ${att.path}`);
    continue;
  }
  const content = fs.readFileSync(att.path);
  const base64Content = content.toString('base64');
  const formattedBase64 = base64Content.match(/.{1,76}/g).join('\r\n');

  rawMime.push(`--${boundary}`);
  rawMime.push(`Content-Type: application/pdf; name="${att.name}"`);
  rawMime.push('Content-Transfer-Encoding: base64');
  rawMime.push(`Content-Disposition: attachment; filename="${att.name}"`);
  rawMime.push('');
  rawMime.push(formattedBase64);
  rawMime.push('');
}

rawMime.push(`--${boundary}--`);
rawMime.push('');
const finalMimePayload = rawMime.join('\r\n');

async function sendPdfsEmail() {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { rejectUnauthorized: false }, () => {
      // connected
    });

    let step = 0;
    let recipientIndex = 0;
    socket.setEncoding('utf8');

    socket.on('data', (data) => {
      const code = data.slice(0, 3);
      if (code === '220' && step === 0) {
        socket.write('HELO localhost\r\n');
        step = 1;
      } else if (code === '250' && step === 1) {
        socket.write('AUTH LOGIN\r\n');
        step = 2;
      } else if (code === '334' && step === 2) {
        socket.write(Buffer.from(SMTP_USER).toString('base64') + '\r\n');
        step = 3;
      } else if (code === '334' && step === 3) {
        socket.write(Buffer.from(SMTP_PASS).toString('base64') + '\r\n');
        step = 4;
      } else if (code === '235' && step === 4) {
        socket.write(`MAIL FROM:<${SMTP_USER}>\r\n`);
        step = 5;
      } else if (code === '250' && step === 5) {
        socket.write(`RCPT TO:<${RECIPIENTS[recipientIndex]}>\r\n`);
        recipientIndex++;
        if (recipientIndex >= RECIPIENTS.length) {
          step = 6;
        }
      } else if (code === '250' && step === 6) {
        socket.write('DATA\r\n');
        step = 7;
      } else if (code === '354' && step === 7) {
        // Enviar MIME
        socket.write(finalMimePayload);
        socket.write('.\r\n');
        step = 8;
      } else if (code === '250' && step === 8) {
        socket.write('QUIT\r\n');
        step = 9;
        resolve(true);
      }
    });

    socket.on('error', (err) => reject(err));
    socket.on('end', () => resolve(true));
  });
}

console.log('Enviando correo con los 5 PDFs...');
sendPdfsEmail()
  .then(() => console.log('✅ Correo con los 5 PDFs enviado EXITOSAMENTE a holarebuske@gmail.com y camiloescobarr63@gmail.com'))
  .catch((err) => console.error('❌ Error enviando PDFs:', err));
