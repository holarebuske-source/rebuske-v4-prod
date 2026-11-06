/**
 * ============================================================================
 * REBUSKE · GENERADOR Y EMISOR DE LOS 5 NUEVOS MANUALES MAESTROS EN PDF
 * ============================================================================
 * Genera con PDFKit las guías directrices de las que nos basamos y que no
 * existían en formato PDF, y las despacha por correo a holarebuske@gmail.com:
 *  1. Memoria Maestra del Sistema Rebuske
 *  2. Manual de Estandarización Técnica de Servicios en Campo
 *  3. Playbook Oficial de Redes Sociales y Marketing
 *  4. Auditoría de SDKs y Cumplimiento Google Play Console
 *  5. Arquitectura Maestra de APIs y Agentes Operativos
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import tls from 'tls';

const pdfkitPath = 'C:/Users/camil/.gemini/antigravity/scratch/node_modules/pdfkit/js/pdfkit.js';
const PDFDocument = (await import('file:///' + pdfkitPath.replace(/\\/g, '/'))).default;

const OUT_DIR = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske_manuales_maestros_pdf';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';
const TO_EMAIL = 'holarebuske@gmail.com';

// ============================================================================
// 1. GENERACIÓN DE LOS 5 DOCUMENTOS PDF CON PDFKIT
// ============================================================================

function createPdfDocument(filePath, title, subtitle, author, contentSections) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 40, bottom: 40, left: 45, right: 45 }
    });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Encabezado Visual de Marca Rebuske
    doc.rect(0, 0, 595.28, 12).fill('#B8FF3B'); // Barra Verde Lima
    doc.rect(0, 12, 595.28, 70).fill('#0C120A'); // Fondo Ébano

    doc.fillColor('#B8FF3B').fontSize(20).font('Helvetica-Bold').text('rebuske', 45, 26, { continued: true });
    doc.fillColor('#FFFFFF').fontSize(11).font('Helvetica').text(' · GUÍA MAESTRA OPERATIVA', 125, 33);

    doc.fillColor('#97A890').fontSize(9).font('Helvetica')
       .text(`Medellín, Antioquia · Responsable: Camilo Escobar (CEO) · Fecha: Noviembre 2026`, 45, 54);

    doc.moveDown(2.5);

    // Título Principal
    doc.fillColor('#0C120A').fontSize(16).font('Helvetica-Bold').text(title, { align: 'left' });
    doc.fillColor('#2E7D32').fontSize(11).font('Helvetica-Bold').text(subtitle, { align: 'left' });
    doc.fillColor('#555555').fontSize(9).font('Helvetica-Oblique').text(`Responsable Técnico: ${author}`, { align: 'left' });
    doc.moveDown(0.8);

    doc.moveTo(45, doc.y).lineTo(550, doc.y).strokeColor('#B8FF3B').lineWidth(1.5).stroke();
    doc.moveDown(0.8);

    // Secciones de Contenido
    for (const sec of contentSections) {
      if (doc.y > 720) doc.addPage();

      doc.fillColor('#0C120A').fontSize(11).font('Helvetica-Bold').text(sec.heading);
      doc.moveDown(0.3);
      doc.fillColor('#333333').fontSize(9.5).font('Helvetica').text(sec.body, {
        align: 'justify',
        lineGap: 2.5
      });
      doc.moveDown(0.8);
    }

    // Pie de página
    doc.fontSize(8).fillColor('#888888').text(
      'Documento de Circulación Interna · Rebuske Colombia © 2026 · Confidencial',
      45,
      800,
      { align: 'center', width: 505 }
    );

    doc.end();
    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
}

async function buildAllMissingPdfs() {
  console.log('📄 Generando los 5 nuevos manuales maestros en PDF...');

  // PDF 1: Memoria Maestra del Sistema Rebuske
  const pdf1Path = path.join(OUT_DIR, '01_MEMORIA_MAESTRA_SISTEMA_REBUSKE.pdf');
  await createPdfDocument(
    pdf1Path,
    'MEMORIA MAESTRA DEL SISTEMA REBUSKE',
    'Directrices Fundacionales, Modelo Económico y Reglas Operativas Sagradas',
    '💻 Mateo 💻 (Arquitecto Full-Stack) & 👑 Canashi 👑 (CEO)',
    [
      {
        heading: '1. Modelo de Negocio y Estructura de Comisiones (Opción A)',
        body: 'Rebuske opera bajo un modelo de intermediación ética y transparente en el Valle de Aburrá. Para los 100 Primeros Técnicos Primordiales, la comisión durante el Mes 1 es del 1% (99% neto transferido al profesional). A partir del segundo mes y de manera vitalicia, la comisión preferencial se fija en 7% (93% neto para el técnico con Placa Oro VIP). Para servicios con Bono VIP de $15.000 COP (monto >= $90.000 COP), la comisión de Rebuske es del 0%, permitiendo financiar el beneficio sin desembolso de caja para la empresa.'
      },
      {
        heading: '2. Regla de Oro: Bóveda Wompi (Escrow Preventivo) y Cero Anticipos',
        body: 'Está estrictamente prohibido el cobro o pago de anticipos por fuera de la plataforma. Todo valor es retenido en la Bóveda Wompi (Bancolombia) y solo se libera tras la inspección física conforme y la firma del Acta Digital de Entrega bajo la Ley 527 de 1999. Si un técnico intenta acordar pagos en efectivo para eludir la plataforma, el sistema activa una penalización silenciosa algorítmica de 15 posiciones en el feed.'
      },
      {
        heading: '3. Garantía Comunitaria de 48 Horas (Ley 1480 de 2011)',
        body: 'Todos los servicios contratados cuentan con una ventana obligatoria de garantía de 48 horas en mano de obra. Ante cualquier falla reportada en ese periodo, el cliente puede congelar la liberación del pago. El técnico debe realizar una visita de corrección técnica sin costo adicional en menos de 24 horas para liberar sus fondos.'
      },
      {
        heading: '4. Geocercas de 500 Metros y Validación de Proximidad',
        body: 'El botón de "Llegué a tu puerta" cuenta con un candado de geocerca Haversine. Si el dispositivo del técnico se encuentra a más de 500 metros del domicilio registrado, el estado no transiciona. Solo se valida la llegada cuando existe proximidad física comprobada y escaneo del carné QR oficial.'
      }
    ]
  );
  console.log('  ✅ PDF 1 generado: 01_MEMORIA_MAESTRA_SISTEMA_REBUSKE.pdf');

  // PDF 2: Manual de Estandarización Técnica de Servicios en Campo
  const pdf2Path = path.join(OUT_DIR, '02_MANUAL_ESTANDARIZACION_TECNICA_SERVICIOS.pdf');
  await createPdfDocument(
    pdf2Path,
    'MANUAL DE ESTANDARIZACIÓN TÉCNICA DE SERVICIOS',
    'Protocolos de Intervención en Domicilios, Herramientas Mínimas y Tiempos de Respuesta',
    '🔧 Telmo 🔧 (Especialista Técnico) & 🚀 Lucas 🚀 (QA de Campo)',
    [
      {
        heading: '1. Modo Luz Express (< 35 Minutos en Medellín)',
        body: 'El Modo Luz Express está reservado para cerrajería de urgencia, fugas críticas de plomería, cortocircuitos residenciales y auxilio de batería. El profesional en turno motorizado debe confirmar salida en menos de 3 minutos y arribar al punto en un tiempo promedio inferior a 35 minutos en cualquier comuna del Valle de Aburrá.'
      },
      {
        heading: '2. Kit de Herramientas Obligatorio por Gremio',
        body: '• Plomería: Llave Stillson, expansores, prensa terminales, teflón de alta densidad, sonda destapadora y multímetro de humedad.\n• Electricidad: Multímetro digital calibrado, pinza voltiamperimétrica, detector de tensión sin contacto, alicates aislados 1000V y cinta autosoldable.\n• Cerrajería: Ganzúas profesionales, extractor de cilindros, taladro inalámbrico de alto torque y llaves maestras para aperturas no destructivas.\n• Pintura y Resanes: Espátulas de acero, lijas de grano fino a medio, plásticos de protección de pisos, rodillos antigota y masilla epóxica.'
      },
      {
        heading: '3. Protocolo de Presentación y Acta Digital',
        body: 'El técnico debe presentarse con carné digital Rebuske visible en su celular, indumentaria limpia sin logos de otras empresas, y realizar un diagnóstico inicial de 5 minutos antes de destapar o intervenir. Al concluir, emite el código QR del Acta Digital que el cliente escanea para validar la conformidad de la entrega.'
      }
    ]
  );
  console.log('  ✅ PDF 2 generado: 02_MANUAL_ESTANDARIZACION_TECNICA_SERVICIOS.pdf');

  // PDF 3: Playbook Oficial de Redes Sociales y Marketing
  const pdf3Path = path.join(OUT_DIR, '03_PLAYBOOK_REDES_SOCIALES_Y_MARKETING.pdf');
  await createPdfDocument(
    pdf3Path,
    'PLAYBOOK OFICIAL DE REDES SOCIALES Y MARKETING',
    'Estrategia de Adquisición Orgánica, Voz de Marca Paisa y Plan de Contenidos',
    '📢 Sofia 📢 (Social Media) & 🎨 Valeria 🎨 (Directora de Marca)',
    [
      {
        heading: '1. Tono y Personalidad de Marca Rebuske',
        body: 'Rebuske habla como un buen vecino de Medellín: cercano, servicial, respetuoso, directo y con sano orgullo paisa. Cero tecnicismos corporativos fríos, cero promesas exageradas ("la mejor app del mundo"). Preferimos el valor tangible: "tu plata no se entrega al ojo", "técnicos de confianza evaluados por tus vecinos", "apoyamos el talento de nuestras 16 comunas".'
      },
      {
        heading: '2. Pilares de Contenido Semanal (Instagram, TikTok, WhatsApp)',
        body: '• Lunes de Dignidad Laboral: Convocatoria a profesionales, comparativa de comisiones (1% Rebuske vs 25% apps foráneas).\n• Miércoles de Caso Real (POV): Situaciones cotidianas de emergencias en el hogar resueltas en minutos.\n• Viernes de Confianza Bancaria: Explicación didáctica de la Bóveda Wompi y por qué nadie pierde plata.\n• Domingo de Talento Comunal: Historias humanas de plomeros, electricistas y cerrajeros del Valle de Aburrá.'
      },
      {
        heading: '3. Estrategia de Conversión al Link Único (/registro)',
        body: 'Todas las piezas dirigen exclusivamente al enlace único oficial: https://rebuske.vercel.app/registro. En ese portal, el usuario elige en 1 segundo si es Técnico (cupo 1% mes 1) o Cliente (link de Play Store + Bono $15.000 COP).'
      }
    ]
  );
  console.log('  ✅ PDF 3 generado: 03_PLAYBOOK_REDES_SOCIALES_Y_MARKETING.pdf');

  // PDF 4: Auditoría de SDKs y Cumplimiento Google Play Console
  const pdf4Path = path.join(OUT_DIR, '04_AUDITORIA_SDKS_GOOGLE_PLAY_COMPLIANCE.pdf');
  await createPdfDocument(
    pdf4Path,
    'AUDITORÍA DE SDKs Y DECLARACIÓN DE SEGURIDAD GOOGLE PLAY',
    'Inventario Técnico de Integraciones, Privacidad de Datos y Cumplimiento de Políticas',
    '🔒 Carlos 🔒 (Oficial de Ciberseguridad) & ⚖️ Elena ⚖️ (Compliance Legal)',
    [
      {
        heading: '1. Declaración de Datos para Google Play Console (Data Safety)',
        body: 'Rebuske procesa datos bajo el principio de minimización. Se declaran las siguientes integraciones: Wompi (procesamiento de pagos tokenizado PCI-DSS Nivel 1, sin almacenamiento de CVV ni datos bancarios sensibles), Supabase (PostgreSQL con cifrado TLS 1.3 en tránsito y AES-256 en reposo), Google Maps (ubicación en primer plano únicamente, sin rastreo en background) y Gemini 1.5 Flash (procesamiento efímero de notas de voz sin retención).'
      },
      {
        heading: '2. Enlace Público Obligatorio de Eliminación de Cuenta',
        body: 'En cumplimiento estricto de las directrices de Google Play, Rebuske dispone de una página web pública y permanente de baja y supresión de datos: https://rebuske.vercel.app/eliminar-cuenta (espejo: /baja). Cualquier usuario puede solicitar el borrado de su cuenta en cualquier momento.'
      },
      {
        heading: '3. Política de Retención y Purgas Automáticas',
        body: 'Los chats y archivos multimedia temporales se purgan a los 90 días. Los registros contables y de facturación se conservan durante 3 años; a los 2 años y 10 meses (34 meses) se genera un reporte preventivo a holarebuske@gmail.com antes de la purga definitiva.'
      }
    ]
  );
  console.log('  ✅ PDF 4 generado: 04_AUDITORIA_SDKS_GOOGLE_PLAY_COMPLIANCE.pdf');

  // PDF 5: Arquitectura Maestra de APIs y Agentes Operativos
  const pdf5Path = path.join(OUT_DIR, '05_ARQUITECTURA_MAESTRA_APIS_Y_AGENTES.pdf');
  await createPdfDocument(
    pdf5Path,
    'ARQUITECTURA MAESTRA DE APIs Y AGENTES OPERATIVOS',
    'Topología de Microservicios Serverless, Webhooks y Orquestación de Inteligencia Artificial',
    '💻 Mateo 💻 (Arquitecto) & 💬 Laura 💬 (Asistente Omnicanal)',
    [
      {
        heading: '1. Catálogo de Endpoints Serverless en Producción',
        body: '• /api/register-pro: Registro de técnicos, cálculo de cupo primordial y alertas KYC.\n• /api/register-client: Lista de espera Google Play Store, generación de cupón HOGAR15K-VIP y guardado en JSON/CSV/Supabase.\n• /api/whatsapp-webhook: Integración con WhatsApp Cloud API y Gemini 1.5 Flash para procesamiento de texto y audios.\n• /api/wompi-webhook: Recepción de eventos de pago y actualización de estado en Bóveda Escrow.\n• /api/cancel-account: Solicitud de baja segura y envío de correo de confirmación de despedida.'
      },
      {
        heading: '2. Protección contra Ataques Automatizados (Anti-Bot)',
        body: 'La arquitectura implementa tres capas invisibles: 1) Campo Honeypot oculto que descarta envíos de bots; 2) Medición de tiempo de interacción (Time-Gate > 900 ms); 3) Modal de autorización rápida de 1 toque que valida la interacción humana sin recurrir a captchas visuales invasivos.'
      },
      {
        heading: '3. Seguridad en Carga de Archivos (Virus Scanning)',
        body: 'Todo archivo cargado para auditoría KYC pasa por validación de Magic Bytes binarios (JPEG, PNG, PDF) y bloqueo de extensiones ejecutables (.exe, .sh, .php), calculando su hash SHA-256 para prevenir inyecciones de código malicioso.'
      }
    ]
  );
  console.log('  ✅ PDF 5 generado: 05_ARQUITECTURA_MAESTRA_APIS_Y_AGENTES.pdf');

  return [
    { name: '01_MEMORIA_MAESTRA_SISTEMA_REBUSKE.pdf', path: pdf1Path },
    { name: '02_MANUAL_ESTANDARIZACION_TECNICA_SERVICIOS.pdf', path: pdf2Path },
    { name: '03_PLAYBOOK_REDES_SOCIALES_Y_MARKETING.pdf', path: pdf3Path },
    { name: '04_AUDITORIA_SDKS_GOOGLE_PLAY_COMPLIANCE.pdf', path: pdf4Path },
    { name: '05_ARQUITECTURA_MAESTRA_APIS_Y_AGENTES.pdf', path: pdf5Path }
  ];
}

// ============================================================================
// 2. FUNCIÓN DE ENVÍO TLS CHUNKED (STREAMING CON DRAIN)
// ============================================================================

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

function sendEmailWithAttachments({ fromName, to, subject, htmlText, attachments = [] }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    let buffer = '';
    let step = 0;

    const boundary = `rebuske_manuales_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
    const encodedFromName = `=?UTF-8?B?${Buffer.from(fromName, 'utf8').toString('base64')}?=`;

    const headerLines = [
      `From: ${encodedFromName} <${SMTP_USER}>`,
      `To: <${to}>`,
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

    for (const att of attachments) {
      if (!fs.existsSync(att.path)) continue;
      const fileBuf = fs.readFileSync(att.path);
      const b64 = fileBuf.toString('base64').replace(/(.{76})/g, '$1\r\n');
      const filename = att.name || path.basename(att.path);

      fullPayload += [
        `--${boundary}`,
        `Content-Type: application/pdf; name="${filename}"`,
        `Content-Disposition: attachment; filename="${filename}"`,
        `Content-Transfer-Encoding: base64`,
        ``,
        b64,
        ``
      ].join('\r\n');
    }

    fullPayload += `--${boundary}--\r\n.\r\n`;

    const sendCmd = (cmd) => socket.write(cmd + '\r\n');
    const timeout = setTimeout(() => { socket.destroy(); reject(new Error('Timeout SMTP')); }, 45000);

    socket.on('data', async (chunk) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split('\r\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line || line.length < 3 || line[3] === '-') continue;
        const code = parseInt(line.slice(0, 3), 10);
        if (code >= 400) { clearTimeout(timeout); socket.destroy(); return reject(new Error(`SMTP Error ${code}: ${line}`)); }

        if (step === 0 && code === 220) { step = 1; sendCmd('EHLO rebuske.co'); }
        else if (step === 1 && code === 250) { step = 2; sendCmd(`AUTH PLAIN ${Buffer.from(`\0${SMTP_USER}\0${SMTP_PASS}`, 'utf8').toString('base64')}`); }
        else if (step === 2 && code === 235) { step = 3; sendCmd(`MAIL FROM:<${SMTP_USER}>`); }
        else if (step === 3 && code === 250) { step = 4; sendCmd(`RCPT TO:<${to}>`); }
        else if (step === 4 && code === 250) { step = 5; sendCmd('DATA'); }
        else if (step === 5 && code === 354) {
          step = 6;
          console.log(`  ⏳ Transfiriendo los 5 nuevos PDFs (${(fullPayload.length / 1024).toFixed(1)} KB)...`);
          await writeChunked(socket, fullPayload);
        } else if (step === 6 && code === 250) {
          step = 7;
          sendCmd('QUIT');
          clearTimeout(timeout);
          socket.end();
          return resolve({ ok: true, message: `Los 5 PDFs fueron enviados a ${to}` });
        }
      }
    });

    socket.on('error', (err) => { clearTimeout(timeout); reject(err); });
  });
}

// ============================================================================
// 3. EJECUCIÓN DEL FLUJO
// ============================================================================

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════════╗');
  console.log('║   REBUSKE · GENERACIÓN Y ENVÍO DE NUEVOS MANUALES MAESTROS EN PDF  ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝');

  const generatedAttachments = await buildAllMissingPdfs();

  const emailHtml = `
    <div style="font-family: sans-serif; background: #0C120A; color: #F4FBF1; padding: 24px; border-radius: 12px; max-width: 600px;">
      <h2 style="color: #B8FF3B; margin-top: 0;">👑 Los 5 Nuevos Manuales Maestros de Rebuske (Formato PDF)</h2>
      <p>Estimado <strong>Camilo Escobar (👑 Canashi 👑)</strong>,</p>
      <p>Conforme a tu instrucción ("si te guías de algo y no tienes el PDF hecho, realízalo y me lo mandas"), hemos compilado y maquetado en formato PDF profesional todas las guías internas fundamentales con las que operamos el sistema:</p>
      
      <ol style="line-height: 1.8; color: #E5F5E0;">
        <li><strong>01_MEMORIA_MAESTRA_SISTEMA_REBUSKE.pdf:</strong> Reglas operativas sagradas, modelo 1% Mes 1 / 7% vitalicio, Bóveda Wompi y geocercas.</li>
        <li><strong>02_MANUAL_ESTANDARIZACION_TECNICA_SERVICIOS.pdf:</strong> Protocolos de campo, tiempos (<35 min en Modo Luz), herramientas mínimas y actas digitales.</li>
        <li><strong>03_PLAYBOOK_REDES_SOCIALES_Y_MARKETING.pdf:</strong> Pilares de contenido, tono de voz paisa, llamados a la acción y link único de bio.</li>
        <li><strong>04_AUDITORIA_SDKS_GOOGLE_PLAY_COMPLIANCE.pdf:</strong> Auditoría oficial de SDKs (Wompi, Supabase, Maps, Gemini) y link de baja (/eliminar-cuenta).</li>
        <li><strong>05_ARQUITECTURA_MAESTRA_APIS_Y_AGENTES.pdf:</strong> Topología de microservicios serverless, protección anti-bot y escáner de archivos.</li>
      </ol>

      <p style="background: #162413; border-left: 3px solid #B8FF3B; padding: 12px; border-radius: 4px; font-size: 13px;">
        Todos los archivos van adjuntos a este correo en formato PDF listos para lectura en tu móvil o computador.
      </p>

      <hr style="border: 0; border-top: 1px solid #24391E; margin: 20px 0;">
      <p style="font-size: 11px; color: #7A9174;">Rebuske Colombia © 2026 · Dirección General · Medellín, Antioquia</p>
    </div>
  `;

  console.log('\n▶ Despachando correo con los 5 nuevos PDFs a holarebuske@gmail.com...');
  await sendEmailWithAttachments({
    fromName: '💻 Mateo & 🎨 Valeria · Rebuske Central',
    to: TO_EMAIL,
    subject: '📚 [REBUSKE NUEVOS MANUALES MAESTROS] Las 5 Guías Operativas de Referencia en PDF',
    htmlText: emailHtml,
    attachments: generatedAttachments
  });

  console.log('✅ ¡LOS 5 NUEVOS MANUALES PDF FUERON ENVIADOS CON ÉXITO A HOLAREBUSKE@GMAIL.COM!');
}

main().catch(console.error);
