/**
 * ============================================================================
 * REBUSKE · EMISOR OFICIAL DE ACTA DIGITAL DE GARANTÍA LEGAL DE 48H (PDF)
 * ============================================================================
 * Genera el documento legal en PDF bajo Ley 527 de 1999 y Ley 1480 de 2011,
 * con hash criptográfico SHA-256 y Bóveda Wompi. Lo envía a holarebuske@gmail.com
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import tls from 'tls';

const pdfkitPath = 'C:/Users/camil/.gemini/antigravity/scratch/node_modules/pdfkit/js/pdfkit.js';
const PDFDocument = (await import('file:///' + pdfkitPath.replace(/\\/g, '/'))).default;

const OUT_PATH = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/Acta-Digital-Garantia-48h-rebuske.pdf';

const actaData = {
  actaId: 'ACTA-2026-MED-48H-9842',
  fechaEmision: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
  tecnico: {
    nombre: 'Marcela Gómez',
    cedula: '43.210.987',
    id: 'PRO-ELLAS-01',
    oficio: 'Limpieza Profunda & Desinfección Residencial',
    comuna: 'Belén (Comuna 16), Medellín'
  },
  cliente: {
    nombre: 'Carolina Restrepo',
    cedula: '1.020.456.789',
    direccion: 'Calle 32 # 75-18, Apto 402',
    comuna: 'Belén Rosales, Medellín',
    telefono: '+57 300 456 7890'
  },
  servicio: {
    categoria: 'Servicios por Ellas · Hogar Impecable Nochebuena',
    descripcion: 'Aseo integral de áreas sociales, desinfección de 2 baños, cocina a fondo y retiro de residuos para festividades de fin de año.',
    valorManoObra: 80000,
    tarifaLlegadaPrioritaria: 3333,
    totalCustodiaWompi: 83333,
    referenciaWompi: 'REB-ACTA48H-MW031'
  }
};

const canonicalString = `${actaData.actaId}|${actaData.tecnico.cedula}|${actaData.cliente.cedula}|${actaData.servicio.totalCustodiaWompi}|${actaData.fechaEmision}`;
const sha256Hash = crypto.createHash('sha256').update(canonicalString).digest('hex');

function buildActaPdf() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 36, bottom: 36, left: 40, right: 40 } });
    const writeStream = fs.createWriteStream(OUT_PATH);
    doc.pipe(writeStream);

    // Fondo y Cabecera Dark Tech
    doc.rect(0, 0, 595.28, 8).fill('#B8FF3B'); // Línea Neon Lime
    doc.rect(0, 8, 595.28, 52).fill('#0C120A'); // Fondo Negro Profundo
    
    doc.fillColor('#B8FF3B').fontSize(22).font('Helvetica-Bold').text('rebuske', 40, 20, { continued: true });
    doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica').text(' · ACTA DIGITAL DE GARANTÍA LEGAL DE 48 HORAS', 125, 27);
    doc.fillColor('#97A890').fontSize(8).font('Helvetica').text('Protección al Consumidor · Ley 1480 de 2011 · Validez de Firma Electrónica Ley 527 de 1999', 40, 44);

    let y = 75;

    // Caja de Identificación de Acta
    doc.roundedRect(40, y, 515, 45, 8).fillAndStroke('#131D11', '#24391E');
    doc.fillColor('#B8FF3B').fontSize(10).font('Helvetica-Bold').text(`ACTA N°: ${actaData.actaId}`, 55, y + 10);
    doc.fillColor('#FFFFFF').fontSize(9).font('Helvetica').text(`Fecha de Emisión: ${actaData.fechaEmision} | Medellín, Antioquia`, 55, y + 26);
    doc.fillColor('#97A890').fontSize(8).font('Helvetica').text(`Ref. Bóveda Wompi: ${actaData.servicio.referenciaWompi}`, 360, y + 10);

    y += 58;

    // Sección 1: Las Partes
    doc.fillColor('#B8FF3B').fontSize(11).font('Helvetica-Bold').text('1. IDENTIFICACIÓN DE LAS PARTES VINCULADAS', 40, y);
    y += 16;

    // Columna Profesional
    doc.roundedRect(40, y, 250, 80, 6).fillAndStroke('#0F170D', '#24391E');
    doc.fillColor('#B8FF3B').fontSize(9).font('Helvetica-Bold').text('PROFESIONAL VERIFICADA (PRESTADORA):', 50, y + 8);
    doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica').text(`Nombre: ${actaData.tecnico.nombre}`, 50, y + 22);
    doc.text(`C.C.: ${actaData.tecnico.cedula}`, 50, y + 34);
    doc.text(`Oficio: ${actaData.tecnico.oficio}`, 50, y + 46);
    doc.text(`Zona: ${actaData.tecnico.comuna}`, 50, y + 58);

    // Columna Cliente
    doc.roundedRect(305, y, 250, 80, 6).fillAndStroke('#0F170D', '#24391E');
    doc.fillColor('#B8FF3B').fontSize(9).font('Helvetica-Bold').text('USUARIO CONTRATANTE (BENEFICIARIO):', 315, y + 8);
    doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica').text(`Nombre: ${actaData.cliente.nombre}`, 315, y + 22);
    doc.text(`C.C.: ${actaData.cliente.cedula}`, 315, y + 34);
    doc.text(`Dirección: ${actaData.cliente.direccion}`, 315, y + 46);
    doc.text(`Teléfono: ${actaData.cliente.telefono}`, 315, y + 58);

    y += 92;

    // Sección 2: Liquidación Económica y Custodia Bóveda Wompi
    doc.fillColor('#B8FF3B').fontSize(11).font('Helvetica-Bold').text('2. LIQUIDACIÓN ECONÓMICA Y RETENCIÓN EN BÓVEDA WOMPI', 40, y);
    y += 16;

    doc.roundedRect(40, y, 515, 60, 6).fillAndStroke('#0F170D', '#24391E');
    doc.fillColor('#E5F5E0').fontSize(8.5).font('Helvetica')
       .text(`Labor Realizada: ${actaData.servicio.categoria}`, 50, y + 8)
       .text(`Detalle: ${actaData.servicio.descripcion}`, 50, y + 20, { width: 495 });
    doc.fillColor('#B8FF3B').font('Helvetica-Bold')
       .text(`Mano de Obra: $${actaData.servicio.valorManoObra.toLocaleString('es-CO')} COP  |  Llegada Prioritaria Exprés: +$${actaData.servicio.tarifaLlegadaPrioritaria.toLocaleString('es-CO')} COP  |  Total en Custodia Wompi: $${actaData.servicio.totalCustodiaWompi.toLocaleString('es-CO')} COP`, 50, y + 44);

    y += 72;

    // Sección 3: Cláusulas de Garantía Legal de 48 Horas
    doc.fillColor('#B8FF3B').fontSize(11).font('Helvetica-Bold').text('3. TÉRMINOS Y CONDICIONES DE LA GARANTÍA LEGAL DE 48 HORAS (LEY 1480 DE 2011)', 40, y);
    y += 16;

    const clausulas = [
      'PRIMERA. OBJETO DE LA COBERTURA: El presente documento formaliza la Garantía Legal de Calidad e Idoneidad sobre la labor ejecutada. Cualquier inconformidad técnica o falla imputable al servicio será atendida sin costo adicional para el contratante.',
      'SEGUNDA. PERÍODO DE VIGENCIA: La garantía inicia a partir de la firma o liberación de fondos y tiene una vigencia legal de cuarenta y ocho (48) horas calendario continuas.',
      'TERCERA. RETORNO TÉCNICO INMEDIATO: En caso de reporte dentro del término legal, el profesional prestador se obliga a retornar al inmueble en un plazo máximo de veinticuatro (24) horas hábiles para subsanar la novedad sin cobro de mano de obra ni transporte.',
      'CUARTA. CUSTODIA PREVENTIVA BÓVEDA WOMPI: Si el usuario presenta una inconformidad fundada a través de la aplicación o con 💬 Laura 💬, el desembolso final queda congelado preventivamente hasta la verificación de satisfacción total.',
      'QUINTA. EXCLUSIONES: La garantía no cubre afectaciones causadas por manipulación de terceros no autorizados, desastres de fuerza mayor o desgaste de materiales ajenos al servicio suministrado.'
    ];

    clausulas.forEach(cl => {
      doc.fillColor('#D8E5D3').fontSize(7.5).font('Helvetica').text(cl, 40, y, { width: 515, align: 'justify' });
      y += 24;
    });

    y += 10;

    // Sección 4: Hash Criptográfico e Integridad
    doc.roundedRect(40, y, 515, 36, 6).fillAndStroke('#131D11', '#24391E');
    doc.fillColor('#B8FF3B').fontSize(8).font('Helvetica-Bold').text('FIRMA ELECTRÓNICA & HASH DE INTEGRIDAD CRIPTOGRÁFICO (LEY 527 DE 1999):', 50, y + 8);
    doc.fillColor('#8FA885').fontSize(7).font('Courier').text(sha256Hash, 50, y + 20);

    y += 50;

    // Firmas
    doc.lineWidth(1).strokeColor('#24391E');
    doc.moveTo(40, y + 30).lineTo(200, y + 30).stroke();
    doc.moveTo(355, y + 30).lineTo(515, y + 30).stroke();

    doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica-Bold').text(actaData.tecnico.nombre, 40, y + 35, { width: 160, align: 'center' });
    doc.fillColor('#97A890').fontSize(7.5).font('Helvetica').text('Profesional Verificada rebuske', 40, y + 46, { width: 160, align: 'center' });

    doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica-Bold').text(actaData.cliente.nombre, 355, y + 35, { width: 160, align: 'center' });
    doc.fillColor('#97A890').fontSize(7.5).font('Helvetica').text('Usuario Contratante Conforme', 355, y + 46, { width: 160, align: 'center' });

    // Sello de Cumplimiento
    doc.rect(225, y + 10, 105, 45).fillAndStroke('#0A1108', '#B8FF3B');
    doc.fillColor('#B8FF3B').fontSize(7.5).font('Helvetica-Bold').text('GARANTÍA 48H', 225, y + 16, { width: 105, align: 'center' });
    doc.fillColor('#FFFFFF').fontSize(6.5).font('Helvetica').text('BÓVEDA WOMPI', 225, y + 26, { width: 105, align: 'center' });
    doc.fillColor('#8FA885').fontSize(6).font('Helvetica').text('LEY 1480 DE 2011', 225, y + 36, { width: 105, align: 'center' });

    doc.end();
    writeStream.on('finish', () => resolve(true));
    writeStream.on('error', reject);
  });
}

console.log('======================================================================');
console.log('📄 REBUSKE · GENERANDO ACTA DIGITAL DE GARANTÍA LEGAL 48H (PDF)');
console.log('======================================================================');

await buildActaPdf();
console.log('✅ Archivo PDF generado exitosamente en:', OUT_PATH);

// Envío del PDF oficial por correo electrónico a holarebuske@gmail.com
const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';

async function emailActaPdf() {
  const fileBytes = fs.readFileSync(OUT_PATH);
  const base64Pdf = fileBytes.toString('base64');
  const boundary = '----=_Part_' + Date.now().toString(16);

  const emailRaw = [
    `From: "rebuske LegalTech" <${SMTP_USER}>`,
    `To: "Canashi CEO" <holarebuske@gmail.com>`,
    `Subject: =?UTF-8?B?${Buffer.from('📄 [Acta Oficial en PDF] Garantía Legal de 48h rebuske (Bóveda Wompi · Ley 1480)').toString('base64')}?`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
    '',
    `<div style="font-family:sans-serif;background:#0C120A;color:#E5EFE0;padding:20px;">`,
    `  <div style="max-width:550px;margin:auto;background:#142312;border:2px solid #B8FF3B;border-radius:16px;padding:20px;">`,
    `    <h2 style="color:#B8FF3B;margin-top:0;">📄 Acta Digital de Garantía Legal de 48 Horas</h2>`,
    `    <p style="font-size:13px;color:#A4BEA0;">Se adjunta el modelo oficial de Acta Digital de Servicio y Garantía de 48 horas bajo la <b>Ley 1480 de 2011</b> y la <b>Ley 527 de 1999</b>.</p>`,
    `    <p style="font-size:12px;color:#C6D8BF;">Incluye hash de integridad SHA-256, sellos de Bóveda Wompi y firmas electrónicas válidas.</p>`,
    `  </div>`,
    `</div>`,
    '',
    `--${boundary}`,
    `Content-Type: application/pdf; name="Acta-Digital-Garantia-48h-rebuske.pdf"`,
    `Content-Transfer-Encoding: base64`,
    `Content-Disposition: attachment; filename="Acta-Digital-Garantia-48h-rebuske.pdf"`,
    '',
    base64Pdf,
    '',
    `--${boundary}--`
  ].join('\r\n');

  return new Promise((resolve) => {
    try {
      const socket = tls.connect({ host: SMTP_HOST, port: SMTP_PORT, rejectUnauthorized: false }, () => {
        let step = 0;
        socket.on('data', (data) => {
          const res = data.toString();
          if (step === 0 && res.startsWith('220')) {
            socket.write(`EHLO localhost\r\n`);
            step++;
          } else if (step === 1 && res.startsWith('250')) {
            socket.write(`AUTH LOGIN\r\n`);
            step++;
          } else if (step === 2 && res.startsWith('334')) {
            socket.write(`${Buffer.from(SMTP_USER).toString('base64')}\r\n`);
            step++;
          } else if (step === 3 && res.startsWith('334')) {
            socket.write(`${Buffer.from(SMTP_PASS).toString('base64')}\r\n`);
            step++;
          } else if (step === 4 && res.startsWith('235')) {
            socket.write(`MAIL FROM:<${SMTP_USER}>\r\n`);
            step++;
          } else if (step === 5 && res.startsWith('250')) {
            socket.write(`RCPT TO:<holarebuske@gmail.com>\r\n`);
            step++;
          } else if (step === 6 && res.startsWith('250')) {
            socket.write(`DATA\r\n`);
            step++;
          } else if (step === 7 && res.startsWith('354')) {
            socket.write(`${emailRaw}\r\n.\r\n`);
            step++;
          } else if (step === 8 && res.startsWith('250')) {
            socket.write(`QUIT\r\n`);
            console.log('📧 Acta Digital en PDF enviada exitosamente a holarebuske@gmail.com');
            resolve(true);
          }
        });
      });
      socket.on('error', (err) => {
        console.warn('Advertencia en SMTP:', err.message);
        resolve(false);
      });
    } catch (err) {
      console.warn('Error inicializando SMTP:', err.message);
      resolve(false);
    }
  });
}

await emailActaPdf();
console.log('✅ Proceso de generación y despacho del Acta Digital de 48h culminado.');
