/**
 * ============================================================================
 * REBUSKE · DESPACHO DE TODOS LOS MANUALES, DOSSIERS Y PDFs A HOLAREBUSKE
 * ============================================================================
 * Destinatario: holarebuske@gmail.com
 * Solicitado por: 👑 Canashi 👑 (CEO & Fundador Rebuske)
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

/**
 * Función robusta para escribir datos grandes respetando el buffer y evento drain
 */
function writeChunked(socket, data) {
  return new Promise((resolve, reject) => {
    let offset = 0;
    const chunkSize = 64 * 1024; // 64 KB

    function writeNext() {
      while (offset < data.length) {
        const chunk = data.slice(offset, offset + chunkSize);
        offset += chunkSize;
        const canContinue = socket.write(chunk);
        if (!canContinue) {
          socket.once('drain', writeNext);
          return;
        }
      }
      resolve();
    }

    writeNext();
  });
}

/**
 * Envía un correo con múltiples adjuntos en formato MIME multipart/mixed
 */
function sendEmailWithAttachments({ fromName, to, subject, htmlText, attachments = [] }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    let buffer = '';
    let step = 0;

    const boundary = `rebuske_boundary_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
    const encodedFromName = `=?UTF-8?B?${Buffer.from(fromName || '👑 Rebuske Dirección General', 'utf8').toString('base64')}?=`;

    // 1. Construir cabeceras
    const headerLines = [
      `From: ${encodedFromName} <${SMTP_USER}>`,
      `To: <${to}>`,
      `Reply-To: <${SMTP_USER}>`,
      `Subject: ${encodedSubject}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      ``,
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: base64`,
      ``,
      Buffer.from(htmlText, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
      ``
    ];

    let fullPayload = headerLines.join('\r\n');

    // 2. Agregar cada adjunto
    for (const att of attachments) {
      if (!fs.existsSync(att.path)) {
        console.warn(`  ⚠️ Adjunto no encontrado: ${att.path}`);
        continue;
      }
      const fileBuf = fs.readFileSync(att.path);
      const b64 = fileBuf.toString('base64').replace(/(.{76})/g, '$1\r\n');
      const filename = att.name || path.basename(att.path);

      const partLines = [
        `--${boundary}`,
        `Content-Type: application/pdf; name="${filename}"`,
        `Content-Disposition: attachment; filename="${filename}"`,
        `Content-Transfer-Encoding: base64`,
        ``,
        b64,
        ``
      ].join('\r\n');

      fullPayload += partLines;
    }

    fullPayload += `--${boundary}--\r\n.\r\n`;

    const sendCmd = (cmd) => socket.write(cmd + '\r\n');
    const timeout = setTimeout(() => {
      socket.destroy();
      reject(new Error('Timeout SMTP de 60 segundos'));
    }, 60000);

    socket.on('data', async (chunk) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split('\r\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line || line.length < 3 || line[3] === '-') continue;
        const code = parseInt(line.slice(0, 3), 10);

        if (code >= 400) {
          clearTimeout(timeout);
          socket.destroy();
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
          step = 4;
          sendCmd(`RCPT TO:<${to}>`);
        } else if (step === 4 && code === 250) {
          step = 5;
          sendCmd('DATA');
        } else if (step === 5 && code === 354) {
          step = 6;
          console.log(`  ⏳ Transfiriendo payload con adjuntos (${(fullPayload.length / 1024 / 1024).toFixed(2)} MB en base64)...`);
          await writeChunked(socket, fullPayload);
        } else if (step === 6 && code === 250) {
          step = 7;
          sendCmd('QUIT');
          clearTimeout(timeout);
          socket.end();
          return resolve({ ok: true, message: `Despachado con éxito a ${to}` });
        }
      }
    });

    socket.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

// ============================================================================
// DEFINICIÓN DE LOS 3 PAQUETES MAESTROS DE PDFs
// ============================================================================

const PAQUETE_1_FUNDACIONAL = {
  subject: '📘 [REBUSKE PARTE 1/3] Manual de Marca Oficial, Voz y Roadmap de Producto',
  htmlText: `
    <div style="font-family: sans-serif; background: #0C120A; color: #F4FBF1; padding: 24px; border-radius: 12px; max-width: 600px;">
      <h2 style="color: #B8FF3B; margin-top: 0;">👑 Documentación Maestra Rebuske · Entrega Oficial Parte 1/3</h2>
      <p>Estimado <strong>Camilo Escobar (👑 Canashi 👑)</strong>,</p>
      <p>Conforme a tu solicitud, te enviamos el primer paquete fundamental con los manuales y guías directrices con las que nos guiamos antes de hacer cualquier cambio en Rebuske:</p>
      <ul style="line-height: 1.8; color: #E5F5E0;">
        <li><strong>Manual-de-Marca-Rebuske.pdf (6.7 MB):</strong> Colores oficiales (Verde Lima #B8FF3B, Negro Ébano #0C120A), tipografías Baloo 2 y Plus Jakarta Sans, isotipo vectorial de la luciérnaga y proporciones.</li>
        <li><strong>Estrategia-Marketing-Voz-Rebuske.pdf (883 KB):</strong> Tono de voz auténtico, humilde y paisa, manifiesto de comunidad y pilares de comunicación.</li>
        <li><strong>Roadmap-de-Producto-Rebuske.pdf (1.09 MB):</strong> Módulos, arquitectura de experiencia de usuario y fases de lanzamiento.</li>
      </ul>
      <p style="font-size: 12px; color: #97A890;">Los archivos van adjuntos a este correo para tu archivo y consulta permanente.</p>
      <hr style="border: 0; border-top: 1px solid #24391E; margin: 20px 0;">
      <p style="font-size: 11px; color: #7A9174;">Rebuske Colombia · Dirección Ejecutiva · Medellín, Antioquia</p>
    </div>
  `,
  attachments: [
    { name: 'Manual-de-Marca-Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\REBUSKE TODO\\Manual-de-Marca-Rebuske.pdf' },
    { name: 'Estrategia-Marketing-Voz-Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\REBUSKE TODO\\Estrategia-Marketing-Voz-Rebuske.pdf' },
    { name: 'Roadmap-de-Producto-Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\REBUSKE TODO\\Roadmap-de-Producto-Rebuske.pdf' }
  ]
};

const PAQUETE_2_TECNICO_PIEZAS = {
  subject: '⚙️ [REBUSKE PARTE 2/3] Informe Técnico, Dossier de Migración, 14 Piezas Redes y Lucky 3D',
  htmlText: `
    <div style="font-family: sans-serif; background: #0C120A; color: #F4FBF1; padding: 24px; border-radius: 12px; max-width: 600px;">
      <h2 style="color: #B8FF3B; margin-top: 0;">👑 Documentación Maestra Rebuske · Entrega Oficial Parte 2/3</h2>
      <p>Estimado <strong>Camilo Escobar (👑 Canashi 👑)</strong>,</p>
      <p>Te enviamos el segundo paquete con las especificaciones técnicas y los activos visuales y de redes sociales:</p>
      <ul style="line-height: 1.8; color: #E5F5E0;">
        <li><strong>Informe-Tecnico-Rebuske.pdf (1.92 MB):</strong> Arquitectura cliente-servidor, flujos transaccionales y Bóveda Wompi.</li>
        <li><strong>Dossier-de-Migracion-Rebuske.pdf (1.08 MB):</strong> Especificaciones de bases de datos, APIs y Supabase.</li>
        <li><strong>REBUSKE_14_PIEZAS_REDES_SOCIALES_CANASHI.pdf (3.41 MB):</strong> Catálogo completo de las 14 piezas maestras diseñadas para redes sociales.</li>
        <li><strong>Lucky_Avatar_3D_Model_Sheet_Rebuske.pdf (727 KB):</strong> Ficha técnica y model sheet 3D del personaje Lucky.</li>
      </ul>
      <hr style="border: 0; border-top: 1px solid #24391E; margin: 20px 0;">
      <p style="font-size: 11px; color: #7A9174;">Rebuske Colombia · Dirección Ejecutiva · Medellín, Antioquia</p>
    </div>
  `,
  attachments: [
    { name: 'Informe-Tecnico-Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\REBUSKE TODO\\Informe-Tecnico-Rebuske.pdf' },
    { name: 'Dossier-de-Migracion-Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\REBUSKE TODO\\Dossier-de-Migracion-Rebuske.pdf' },
    { name: 'REBUSKE_14_PIEZAS_REDES_SOCIALES_CANASHI.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\REBUSKE_14_PIEZAS_REDES_SOCIALES_CANASHI.pdf' },
    { name: 'Lucky_Avatar_3D_Model_Sheet_Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\Lucky_Avatar_3D_Model_Sheet_Rebuske.pdf' }
  ]
};

const PAQUETE_3_REPORTES = {
  subject: '📊 [REBUSKE PARTE 3/3] Los 8 Informes Ejecutivos de Auditoría y Gestión de Agentes',
  htmlText: `
    <div style="font-family: sans-serif; background: #0C120A; color: #F4FBF1; padding: 24px; border-radius: 12px; max-width: 600px;">
      <h2 style="color: #B8FF3B; margin-top: 0;">👑 Documentación Maestra Rebuske · Entrega Oficial Parte 3/3</h2>
      <p>Estimado <strong>Camilo Escobar (👑 Canashi 👑)</strong>,</p>
      <p>Te enviamos el tercer paquete con los 8 informes ejecutivos y auditorías especializadas generados por el equipo de agentes:</p>
      <ul style="line-height: 1.8; color: #E5F5E0;">
        <li>01_METRICAS_KPIS_Rebuske.pdf (Métricas y KPIs operativos)</li>
        <li>02_DINERO_PAGOS_Rebuske.pdf (Bóveda Wompi y finanzas)</li>
        <li>03_SEGURIDAD_PRIVACIDAD_Rebuske.pdf (Habeas Data y ciberseguridad)</li>
        <li>04_OPERACION_SERVICIO_Rebuske.pdf (Operación y asignación por comunas)</li>
        <li>05_EXPERIENCIA_USUARIO_Rebuske.pdf (UX/UI y diseño accesible)</li>
        <li>06_MARKETING_VOZ_MARCA_Rebuske.pdf (Marketing y estrategia de contenidos)</li>
        <li>07_TECNOLOGIA_CALIDAD_Rebuske.pdf (Calidad técnica, QA y despliegues)</li>
        <li>08_LEGAL_COSTOS_DECISIONES_Rebuske.pdf (Marco legal Ley 1480 / 1581 y decisiones)</li>
      </ul>
      <hr style="border: 0; border-top: 1px solid #24391E; margin: 20px 0;">
      <p style="font-size: 11px; color: #7A9174;">Rebuske Colombia · Dirección Ejecutiva · Medellín, Antioquia</p>
    </div>
  `,
  attachments: [
    { name: '01_METRICAS_KPIS_Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske_reports_pdf\\01_METRICAS_KPIS_Rebuske.pdf' },
    { name: '02_DINERO_PAGOS_Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske_reports_pdf\\02_DINERO_PAGOS_Rebuske.pdf' },
    { name: '03_SEGURIDAD_PRIVACIDAD_Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske_reports_pdf\\03_SEGURIDAD_PRIVACIDAD_Rebuske.pdf' },
    { name: '04_OPERACION_SERVICIO_Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske_reports_pdf\\04_OPERACION_SERVICIO_Rebuske.pdf' },
    { name: '05_EXPERIENCIA_USUARIO_Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske_reports_pdf\\05_EXPERIENCIA_USUARIO_Rebuske.pdf' },
    { name: '06_MARKETING_VOZ_MARCA_Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske_reports_pdf\\06_MARKETING_VOZ_MARCA_Rebuske.pdf' },
    { name: '07_TECNOLOGIA_CALIDAD_Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske_reports_pdf\\07_TECNOLOGIA_CALIDAD_Rebuske.pdf' },
    { name: '08_LEGAL_COSTOS_DECISIONES_Rebuske.pdf', path: 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske_reports_pdf\\08_LEGAL_COSTOS_DECISIONES_Rebuske.pdf' }
  ]
};

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════════╗');
  console.log('║   REBUSKE · DESPACHO DE DOCUMENTACIÓN PDF COMPLETA A HOLAREBUSKE   ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝');
  console.log(`Destinatario: ${TO_EMAIL}`);

  try {
    console.log('\n▶ Despachando Paquete 1 (Manual de Marca, Voz y Roadmap)...');
    await sendEmailWithAttachments({
      fromName: '🎨 Valeria & 👑 Canashi · Manuales Rebuske',
      to: TO_EMAIL,
      subject: PAQUETE_1_FUNDACIONAL.subject,
      htmlText: PAQUETE_1_FUNDACIONAL.htmlText,
      attachments: PAQUETE_1_FUNDACIONAL.attachments
    });
    console.log('  ✅ Paquete 1/3 enviado exitosamente.');

    console.log('\n▶ Despachando Paquete 2 (Técnico, Migración, Piezas Redes y 3D)...');
    await sendEmailWithAttachments({
      fromName: '💻 Mateo & 🚀 Lucas · Arquitectura Rebuske',
      to: TO_EMAIL,
      subject: PAQUETE_2_TECNICO_PIEZAS.subject,
      htmlText: PAQUETE_2_TECNICO_PIEZAS.htmlText,
      attachments: PAQUETE_2_TECNICO_PIEZAS.attachments
    });
    console.log('  ✅ Paquete 2/3 enviado exitosamente.');

    console.log('\n▶ Despachando Paquete 3 (Los 8 Reportes Ejecutivos Rebuske)...');
    await sendEmailWithAttachments({
      fromName: '📊 Ricardo & ⚖️ Elena · Informes Rebuske',
      to: TO_EMAIL,
      subject: PAQUETE_3_REPORTES.subject,
      htmlText: PAQUETE_3_REPORTES.htmlText,
      attachments: PAQUETE_3_REPORTES.attachments
    });
    console.log('  ✅ Paquete 3/3 enviado exitosamente.');

    console.log('\n🎉 TODOS LOS PDFs (VIEJOS Y NUEVOS) HAN SIDO ENVIADOS CON ÉXITO A HOLAREBUSKE@GMAIL.COM');

  } catch (err) {
    console.error('❌ Error enviando PDFs:', err.message);
    process.exit(1);
  }
}

main();
