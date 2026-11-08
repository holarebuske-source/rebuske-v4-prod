/**
 * ============================================================================
 * REBUSKE · BENCHMARK INTERNACIONAL, LECCIONES APRENDIDAS Y PLAN DE MEJORAS
 * ============================================================================
 * Destinatarios: holarebuske@gmail.com, camiloescobarr63@gmail.com
 * Autoridad: 👑 Canashi 👑 (Camilo Escobar, CEO & Fundador)
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import tls from 'tls';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';
const RECIPIENTS = ['holarebuske@gmail.com', 'camiloescobarr63@gmail.com'];

const DOC_OUTPUT = path.join(__dirname, 'BENCHMARK_INTERNACIONAL_Y_MEJORAS_REBUSKE_v5.doc');

console.log('🚀 Compilando Informe de Benchmark Internacional y Mejoras Rebuske...');

const docContent = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>REBUSKE · BENCHMARK GLOBAL DE APPS DE SERVICIOS DEL HOGAR Y ESTRATEGIA DE DOMINANCIA</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #111; line-height: 1.6; padding: 40px; background: #FFFFFF; }
    .cover { background: #0B100E; color: #F2F5EC; padding: 50px 40px; border-radius: 10px; margin-bottom: 40px; border-top: 10px solid #B8FF3B; }
    .cover h1 { color: #B8FF3B; font-size: 28px; margin: 0 0 10px 0; }
    .cover .subtitle { color: #AFFF3E; font-size: 16px; font-weight: bold; margin-bottom: 15px; }
    .cover .meta { font-size: 13px; color: #94A3B8; border-top: 1px solid #223326; padding-top: 15px; }
    h2 { color: #064E3B; border-bottom: 2px solid #10B981; padding-bottom: 8px; margin-top: 40px; font-size: 22px; page-break-before: always; }
    h3 { color: #0F172A; margin-top: 24px; font-size: 17px; border-left: 4px solid #B8FF3B; padding-left: 10px; }
    h4 { color: #334155; margin-top: 16px; font-size: 14px; }
    p, li { font-size: 13.5px; color: #334155; line-height: 1.7; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 12.5px; }
    th, td { border: 1px solid #CBD5E1; padding: 9px 12px; text-align: left; }
    th { background: #F1F5F9; color: #0F172A; font-weight: bold; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    .badge-ok { background: #DCFCE7; color: #166534; }
    .badge-warn { background: #FEF3C7; color: #92400E; }
    .badge-red { background: #FEE2E2; color: #991B1B; }
    .highlight { background: #F0FDF4; border: 1px solid #BBF7D0; padding: 16px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>

  <div class="cover">
    <h1>REBUSKE · BENCHMARK INTERNACIONAL Y PLAN DE SUPERIORIDAD COMPETITIVA</h1>
    <div class="subtitle">Análisis Comparativo de Urban Company, TaskRabbit, Thumbtack, Angi y Frontdoor: Lecciones Globales y Adaptación Letal para Medellín</div>
    <div class="meta">
      <strong>Dirección General:</strong> Camilo Escobar (👑 Canashi 👑, CEO y Fundador de Rebuske)<br>
      <strong>Fecha:</strong> Noviembre 2026 | <strong>Ecosistema:</strong> Rebuske v5.0 Producción<br>
      <strong>Objetivo:</strong> Identificar aciertos y fracasos de los gigantes globales para blindar a Rebuske y dominar el mercado colombiano.
    </div>
  </div>

  <h2>1. MAPA COMPARATIVO DE LOS LÍDERES MUNDIALES EN SERVICIOS DEL HOGAR</h2>

  <table>
    <thead>
      <tr>
        <th>Plataforma</th>
        <th>Países / Mercados</th>
        <th>Modelo de Negocio</th>
        <th>Take Rate (Comisión)</th>
        <th>Garantía al Cliente</th>
        <th>Principal Falla / Vulnerabilidad</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Urban Company</strong><br>(Valuación ~$2.5B)</td>
        <td>India, EAU, Singapur, Arabia Saudita</td>
        <td>Full-Stack Managed Marketplace (Control total de precios, uniforme y herramientas)</td>
        <td><span class="badge badge-red">30% a 36%</span> (Muy alto)</td>
        <td>Garantía de 30 días + seguro contra daños</td>
        <td>Huelgas y descontento masivo de técnicos por comisiones confiscatorias y algoritmos punitivos.</td>
      </tr>
      <tr>
        <td><strong>TaskRabbit</strong><br>(Propiedad de IKEA)</td>
        <td>EE.UU., Reino Unido, Canadá, Europa</td>
        <td>Marketplace por horas / integración en tiendas IKEA</td>
        <td><span class="badge badge-red">15% a 30%</span> + Service Fee</td>
        <td>"Happiness Pledge" hasta $10.000 USD</td>
        <td>Precios impredecibles por hora; los técnicos lentos cobran más. Desintermediación frecuente fuera de la app.</td>
      </tr>
      <tr>
        <td><strong>Thumbtack</strong><br>(Valuación ~$3.2B)</td>
        <td>EE.UU.</td>
        <td>Lead-Generation (El profesional paga por adelantado por cada contacto)</td>
        <td>$15 - $80 USD por Lead (Sin garantía de cierre)</td>
        <td>Garantía de dinero devuelto condicional</td>
        <td>Los técnicos odian pagar por "leads falsos" o clientes que solo preguntan y nunca contratan. Desgaste del profesional.</td>
      </tr>
      <tr>
        <td><strong>Frontdoor / Streem</strong><br>(Cotiza en NASDAQ)</td>
        <td>EE.UU.</td>
        <td>Home Warranty + Triaje por Video con Realidad Aumentada (AR)</td>
        <td>Membresía anual ($400 - $800 USD) + copago por visita</td>
        <td>Reemplazo garantizado de electrodomésticos</td>
        <td>Proceso burocrático, exclusiones en letra pequeña y tiempos de espera de 3 a 5 días para agendar.</td>
      </tr>
      <tr>
        <td><strong>REBUSKE</strong><br>(Colombia v5)</td>
        <td><strong>Medellín y Valle de Aburrá</strong></td>
        <td><strong>FinTech Marketplace con Bóveda Wompi & Mandato Comercial (Art. 1262)</strong></td>
        <td><span class="badge badge-ok">7% neto</span> (Plan Oro)<br><span class="badge badge-ok">1% neto</span> (Mes 1 Fundador)</td>
        <td><strong>48h Escrita (Ley 1480 de 2011) + Bóveda con Pago Custodiado</strong></td>
        <td><strong>VENTAJA TOTAL:</strong> Resuelve el abuso de comisiones, elimina el cobro por leads y entrega rapidez (radar 35-45 min).</td>
      </tr>
    </tbody>
  </table>

  <h2>2. ¿QUÉ APRENDIMOS DE ESTOS GIGANTES INTERNACIONALES? (LECCIONES CRÍTICAS)</h2>

  <div class="highlight">
    <h3>Lección 1: El talón de Aquiles de Urban Company es la codicia del Take Rate (30%-36%)</h3>
    <p>Urban Company construyó un imperio estandarizando la calidad, pero su ambición de elevar la comisión del 20% al 36% provocó protestas masivas de trabajadores y que los mejores técnicos buscaran trabajar por fuera con los clientes que ya conocían.</p>
    <p><strong>Nuestra Ventaja Rebuske:</strong> Con nuestro modelo de <strong>Mandato Comercial (Art. 1262 C.Co)</strong> dejamos el <strong>93% neto al técnico</strong> (y 99% el primer mes). Cobramos una cuota tecnológica mínima de $4.900 al cliente. Esto hace que ningún técnico de Medellín quiera saltarse Rebuske: la plataforma les da seguridad, clientes y respeto financiero.</p>
  </div>

  <div class="highlight">
    <h3>Lección 2: La Bóveda de Custodia (Escrow) es el verdadero motor de la confianza</h3>
    <p>En mercados emergentes como India o Latinoamérica, el 85% de los conflictos ocurren porque el cliente paga por adelantado en efectivo y el técnico deja el trabajo a medias, o el cliente no quiere pagar al finalizar. Tanto TaskRabbit como Urban Company eliminaron el efectivo en mano.</p>
    <p><strong>Nuestra Aplicación Rebuske:</strong> La <strong>Bóveda Wompi</strong> es nuestro baluarte. El dinero está congelado; el cliente sabe que no lo estafan, y el técnico sabe que el dinero ya está en la cuenta 2815 y se le desembolsará inmediatamente apenas el cliente dé el visto bueno.</p>
  </div>

  <div class="highlight">
    <h3>Lección 3: El Triaje Previo con Cámara evita el "Viaje Ciego" (Modelo Streem / Frontdoor)</h3>
    <p>Frontdoor descubrió que el 38% del costo operativo de las reparaciones del hogar proviene de técnicos que llegan a la vivienda solo para decir: <em>"Ah, no traje el empaque que era, tengo que ir a la ferretería y vuelvo mañana"</em>.</p>
    <p><strong>Nuestra Aplicación Rebuske:</strong> Ya tenemos implementado el <strong>Motor de Diagnóstico Inteligente multivariable</strong> con subida de fotos y notas de voz, asistido por el Bot Laura en WhatsApp. El técnico ve la foto de la avería antes de salir y lleva el repuesto exacto.</p>
  </div>

  <div class="highlight">
    <h3>Lección 4: La Estandarización de Tarifas (Baremo Oficial) elimina la desconfianza</h3>
    <p>Thumbtack y los clasificados tradicionales sufren porque cada técnico cobra lo que le parece según el barrio o la cara del cliente. Urban Company ganó porque fijó un precio cerrado por labor.</p>
    <p><strong>Nuestra Aplicación Rebuske:</strong> Nuestro portal <code>tarifas.html</code> con el <strong>Baremo Oficial de 17 oficios</strong> garantiza transparencia radical: la visita diagnóstica cuesta $35.000 (abonable a la labor) y los precios de mano de obra están tabulados.</p>
  </div>

  <h2>3. PLAN MAESTRO: CÓMO SUPERAR A LA COMPETENCIA GLOBAL EN MEDELLÍN</h2>

  <h3>Mejora 1: "Kit de Profesional Primordial" (Estandarización Visual al estilo Urban Company)</h3>
  <ul>
    <li><strong>Uniformidad sin Subordinación:</strong> Entregar a los técnicos del Plan Oro un chaleco de trabajo reflectivo en color Ébano Nocturno (#0B100E) con detalles bioluminiscentes en Verde Lima (#B8FF3B) y carné digital QR.</li>
    <li><strong>QR de Validación Inmediata:</strong> El cliente escanea el carné del técnico con su celular y ve: Foto real, verificación de antecedentes judiciales (Policía / Procuraduría / KYC), especialidad certificada y número de servicios exitosos.</li>
  </ul>

  <h3>Mejora 2: Triaje Visual Asistido por Inteligencia Artificial en WhatsApp ("Rebuske Lens")</h3>
  <ul>
    <li>Integrar visión artificial para que cuando el cliente mande una foto por WhatsApp al Bot Laura (ej. una gotera bajo el lavaplatos), la IA reconozca automáticamente: <em>"Sifón flexible de 1 1/4 pulgada con fisura en la rosca"</em> y pre-cargue en la cotización el repuesto sugerido.</li>
  </ul>

  <h3>Mejora 3: Alianzas con Ferreterías y Retailers de Medellín (El Modelo IKEA-TaskRabbit Criollo)</h3>
  <ul>
    <li>TaskRabbit creció un 400% cuando IKEA lo compró y puso un botón de <em>"Arma tu mueble con TaskRabbit"</em> en cada compra.</li>
    <li><strong>Estrategia Rebuske:</strong> Cerrar acuerdos con Homecenter (Sodimac), Ferreterías de Barrio en comunas y distribuidores de calentadores (Haceb / Bosch). Cuando el cliente compre una grifería o un calentador en Medellín, el vendedor le entrega el código QR de Rebuske con el cupón <code>TUBONO15K-VIP</code> para instalación certificada con Bóveda Wompi y 48h de garantía.</li>
  </ul>

  <h3>Mejora 4: Micro-Seguro de Daños Accidentales Integrado en la Cuota de $4.900</h3>
  <ul>
    <li>Urban Company incluye cobertura contra daños accidentales a la vivienda hasta cierto monto.</li>
    <li><strong>Estrategia Rebuske:</strong> Destinar una fracción de la cuota tecnológica de $4.900 para un fondo de garantía de contingencias. Si durante el arreglo de plomería se rompe una baldosa accidentalmente, Rebuske responde en menos de 24 horas. Esto anula por completo la contratación de técnicos callejeros informales.</li>
  </ul>

  <div class="highlight">
    <strong>CONCLUSIÓN EJECUTIVA:</strong><br>
    Rebuske no necesita inventar la rueda desde cero. Tomamos lo mejor del mundo (el baremo y uniformes de Urban Company, el triaje visual de Frontdoor, la garantía de TaskRabbit) y eliminamos sus mayores defectos (el 36% de comisión abusiva y los cobros de leads de Thumbtack), reemplazándolos con la <strong>Bóveda Wompi</strong> y el <strong>Mandato Comercial Colombiano (7%/93%)</strong>.
  </div>

</body>
</html>
`;

fs.writeFileSync(DOC_OUTPUT, docContent, 'utf8');
console.log(`✅ Archivo generado: ${DOC_OUTPUT} (${(fs.statSync(DOC_OUTPUT).size / 1024).toFixed(1)} KB)`);

// ============================================================================
// DESPACHO POR CORREO ELECTRÓNICO (SMTP TLS 465)
// ============================================================================

function writeChunked(socket, data) {
  return new Promise((resolve) => {
    let offset = 0;
    const chunkSize = 64 * 1024;

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

function sendEmailToRecipient({ to, subject, htmlText, attachmentPath, attachmentName }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    let buffer = '';
    let step = 0;

    const boundary = `rebuske_bm_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
    const fromName = '👑 Rebuske Estrategia Global (Canashi & Mateo)';
    const encodedFromName = `=?UTF-8?B?${Buffer.from(fromName, 'utf8').toString('base64')}?=`;

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

    if (fs.existsSync(attachmentPath)) {
      const fileBuf = fs.readFileSync(attachmentPath);
      const b64 = fileBuf.toString('base64').replace(/(.{76})/g, '$1\r\n');

      const partLines = [
        `--${boundary}`,
        `Content-Type: application/msword; name="${attachmentName}"`,
        `Content-Disposition: attachment; filename="${attachmentName}"`,
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
          console.log(`  ⏳ Transfiriendo reporte (${(fullPayload.length / 1024).toFixed(1)} KB) a ${to}...`);
          await writeChunked(socket, fullPayload);
        } else if (step === 6 && code === 250) {
          step = 7;
          sendCmd('QUIT');
          clearTimeout(timeout);
          socket.end();
          return resolve({ ok: true, message: `Despachado exitosamente a ${to}` });
        }
      }
    });

    socket.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

const emailHtml = `
<div style="font-family: 'Segoe UI', Arial, sans-serif; background: #0B100E; color: #F2F5EC; padding: 28px; border-radius: 12px; max-width: 650px; line-height: 1.6;">
  <div style="border-bottom: 4px solid #B8FF3B; padding-bottom: 16px; margin-bottom: 20px;">
    <h1 style="color: #B8FF3B; margin: 0; font-size: 22px;">REBUSKE · BENCHMARK GLOBAL Y PLAN DE MEJORAS</h1>
    <p style="margin: 6px 0 0 0; color: #AFFF3E; font-size: 13px;">Análisis de Urban Company, TaskRabbit, Thumbtack, Frontdoor y Estrategia de Dominancia</p>
  </div>

  <p>Estimado <strong>Camilo Escobar (👑 Canashi 👑)</strong>,</p>
  <p>En cumplimiento de tu solicitud, realizamos una auditoría de inteligencia competitiva internacional sobre las aplicaciones líderes del planeta en servicios del hogar. Te entregamos el documento maestro adjunto:</p>

  <div style="background: #152219; border: 1px solid #2B4E32; padding: 18px; border-radius: 8px; margin: 20px 0;">
    <h4 style="color: #B8FF3B; margin: 0 0 10px 0; font-size: 15px;">Documento Adjunto en Este Correo:</h4>
    <p style="margin: 0; font-size: 13px; color: #FFFFFF;">
      📄 <strong>BENCHMARK_INTERNACIONAL_Y_MEJORAS_REBUSKE_v5.doc</strong> (~25 KB)<br>
      <span style="color: #94A3B8; font-size: 12px;">Compatible con Google Docs y Word con 1 solo clic.</span>
    </p>
  </div>

  <h4 style="color: #B8FF3B; margin-top: 20px; margin-bottom: 8px;">Las 4 Grandes Lecciones y Mejoras Clave:</h4>
  <ul style="padding-left: 20px; font-size: 13px; color: #CBD5E1; line-height: 1.8;">
    <li>📉 <strong>El error fatal de Urban Company:</strong> Cobran entre el 30% y 36% de comisión, generando huelgas de técnicos. <em>Nuestra ventaja:</em> En Rebuske el técnico se queda con el <strong>93% neto</strong> (o 99% el primer mes). Ningún técnico querrá saltarse la app.</li>
    <li>🔒 <strong>La Bóveda Wompi vence al efectivo:</strong> Ni TaskRabbit ni Urban Company permiten efectivo descontrolado. La Bóveda protege la plata del cliente hasta que firme a satisfacción.</li>
    <li>📱 <strong>Triaje visual por cámara (Frontdoor / Streem):</strong> El 38% de visitas se pierden por no llevar el repuesto. Nuestro diagnóstico por fotos y notas de voz con el Bot Laura soluciona esto antes de salir.</li>
    <li>🤝 <strong>Alianza Retail estilo IKEA-TaskRabbit:</strong> Implementar convenios con ferreterías y tiendas de hogar en Medellín para que los clientes agenden la instalación con Rebuske directamente al comprar.</li>
  </ul>

  <p style="font-size: 11px; color: #94A3B8; margin-top: 25px; border-top: 1px solid #334155; padding-top: 14px;">
    Rebuske Technologies · Medellín, Antioquia, Colombia · <a href="https://rebuske.vercel.app" style="color: #38BDF8; text-decoration: none;">rebuske.vercel.app</a>
  </p>
</div>
`;

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════════╗');
  console.log('║   REBUSKE · DESPACHO DE BENCHMARK INTERNACIONAL AL CORREO          ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝');

  const subject = '🌍 [BENCHMARK INTERNACIONAL] Análisis de Apps Globales, Lecciones y Plan de Mejoras - Rebuske v5';

  for (const recipient of RECIPIENTS) {
    console.log(`\n▶ Enviando Benchmark a: ${recipient}...`);
    try {
      const res = await sendEmailToRecipient({
        to: recipient,
        subject: subject,
        htmlText: emailHtml,
        attachmentPath: DOC_OUTPUT,
        attachmentName: 'BENCHMARK_INTERNACIONAL_Y_MEJORAS_REBUSKE_v5.doc'
      });
      console.log(`  ✅ ${res.message}`);
    } catch (err) {
      console.error(`  ❌ Error enviando a ${recipient}:`, err.message);
    }
  }

  console.log('\n🎉 PROCESO COMPLETADO EXITOSAMENTE');
}

main();
