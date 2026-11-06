/**
 * ============================================================================
 * REBUSKE · GENERADOR Y EMISOR DE LOS 4 DOCUMENTOS MAESTROS ACTUALIZADOS EN PDF
 * ============================================================================
 * Genera con PDFKit y despacha directamente a holarebuske@gmail.com los 4
 * documentos oficiales actualizados bajo las directrices maestras de 👑 Canashi 👑:
 *  1. Dossier-de-Migracion-Rebuske.pdf
 *  2. Estrategia-Marketing-Voz-Rebuske.pdf
 *  3. Manual-de-Marca-Rebuske.pdf
 *  4. Roadmap-de-Producto-Rebuske.pdf
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import tls from 'tls';

const pdfkitPath = 'C:/Users/camil/.gemini/antigravity/scratch/node_modules/pdfkit/js/pdfkit.js';
const PDFDocument = (await import('file:///' + pdfkitPath.replace(/\\/g, '/'))).default;

const OUT_DIR = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske_updated_master_pdfs';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';
const TO_EMAIL = 'holarebuske@gmail.com';

// ============================================================================
// FUNCIÓN GENERADORA DE DOCUMENTO PDF MULTIPÁGINA ESTILIZADO CON PDFKIT
// ============================================================================
function createMasterPdf(filePath, title, category, author, sections) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 45, bottom: 45, left: 45, right: 45 }
    });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    function drawHeader() {
      doc.rect(0, 0, 595.28, 10).fill('#B8FF3B'); // Barra Verde Lima
      doc.rect(0, 10, 595.28, 55).fill('#0C120A'); // Fondo Ébano
      doc.fillColor('#B8FF3B').fontSize(18).font('Helvetica-Bold').text('rebuske', 45, 22, { continued: true });
      doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica').text(` · ${category.toUpperCase()}`, 120, 28);
      doc.fillColor('#97A890').fontSize(8.5).font('Helvetica').text('Plataforma Digital de Servicios · Colombia 2026', 45, 45);
    }

    function drawFooter(pageNumber) {
      doc.rect(0, 805, 595.28, 37).fill('#0C120A');
      doc.rect(0, 803, 595.28, 2).fill('#24391E');
      doc.fillColor('#7A9174').fontSize(8).font('Helvetica').text(
        `Rebuske Colombia © 2026 · Dirección General · Responsable: Camilo Escobar · Página ${pageNumber}`,
        45, 818, { align: 'center', width: 505 }
      );
    }

    let pageCount = 1;
    drawHeader();

    // Portada / Cabecera del documento
    doc.moveDown(3);
    doc.fillColor('#B8FF3B').fontSize(10).font('Helvetica-Bold').text(category.toUpperCase(), 45, 85);
    doc.fillColor('#121A0E').fontSize(22).font('Helvetica-Bold').text(title, 45, 100, { width: 505 });
    doc.fillColor('#4B5563').fontSize(9.5).font('Helvetica').text(`Elaborado para la Dirección General y Comité Ejecutivo · ${author}`, 45, 150);
    doc.rect(45, 168, 505, 1.5).fill('#B8FF3B');

    doc.y = 180;

    sections.forEach((sec, idx) => {
      // Verificar salto de página
      if (doc.y > 680) {
        drawFooter(pageCount);
        doc.addPage();
        pageCount++;
        drawHeader();
        doc.y = 80;
      }

      // Título de sección
      doc.moveDown(0.8);
      doc.fillColor('#0C120A').fontSize(13).font('Helvetica-Bold').text(`${idx + 1}. ${sec.title}`);
      doc.rect(45, doc.y + 2, 505, 0.8).fill('#E2E8F0');
      doc.moveDown(0.4);

      // Párrafos y viñetas
      if (sec.paragraphs) {
        sec.paragraphs.forEach(p => {
          if (doc.y > 700) {
            drawFooter(pageCount);
            doc.addPage();
            pageCount++;
            drawHeader();
            doc.y = 80;
          }
          doc.fillColor('#2D3748').fontSize(9.5).font('Helvetica').text(p, {
            width: 505,
            align: 'justify',
            lineGap: 2.5
          });
          doc.moveDown(0.3);
        });
      }

      if (sec.bullets) {
        sec.bullets.forEach(b => {
          if (doc.y > 700) {
            drawFooter(pageCount);
            doc.addPage();
            pageCount++;
            drawHeader();
            doc.y = 80;
          }
          doc.fillColor('#0C120A').fontSize(9.5).font('Helvetica-Bold').text('• ', 55, doc.y, { continued: true });
          doc.fillColor('#2D3748').font('Helvetica').text(b, 65, doc.y, {
            width: 485,
            align: 'justify',
            lineGap: 2
          });
          doc.moveDown(0.2);
        });
      }

      if (sec.highlight) {
        if (doc.y > 670) {
          drawFooter(pageCount);
          doc.addPage();
          pageCount++;
          drawHeader();
          doc.y = 80;
        }
        const boxY = doc.y + 4;
        doc.rect(45, boxY, 505, 36).fill('#F4FBF1');
        doc.rect(45, boxY, 4, 36).fill('#B8FF3B');
        doc.fillColor('#162413').fontSize(9).font('Helvetica-Bold').text(sec.highlight, 55, boxY + 8, {
          width: 485,
          lineGap: 2
        });
        doc.y = boxY + 44;
      }
    });

    drawFooter(pageCount);
    doc.end();

    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
}

// ============================================================================
// DEFINICIÓN DE CONTENIDO PARA LOS 4 DOCUMENTOS MAESTROS ACTUALIZADOS
// ============================================================================

const docsData = [
  // 1. DOSSIER DE MIGRACIÓN REBUSKE
  {
    fileName: 'Dossier-de-Migracion-Rebuske.pdf',
    title: 'Dossier Maestro de Migración, Arquitectura y Reglas del Sistema',
    category: 'Ingeniería, Arquitectura y Operación',
    author: '💻 Mateo · Arquitecto Full-Stack & 🚀 Lucas · QA & Deploy',
    sections: [
      {
        title: 'Arquitectura Tecnológica de Producción Vercel & Supabase',
        paragraphs: [
          'La plataforma Rebuske opera bajo un esquema Serverless High-Availability en Vercel Edge Network acoplado a la infraestructura transaccional de Supabase Postgres y la Bóveda de pagos Wompi.',
          'Se ha consolidado el punto único de entrada web en https://rebuske.vercel.app/registro, eliminando la duplicidad de enlaces y ofreciendo una bifurcación nativa para Profesionales (1% mes 1 / Placas) y Clientes VIP (Bono TUBONO15K-VIP).'
        ],
        highlight: 'Decisión Arquitectónica Clave: Se retiró el prototipo de escáner AR de tuberías y breakers del core productivo para enfocar los recursos en la solidez transaccional y la velocidad de carga.'
      },
      {
        title: 'Modelo de Comisiones y Visibilidad de Placas',
        paragraphs: [
          'El sistema muestra con total transparencia las tres placas oficiales de profesionales desde el primer contacto en el portal de registro, incentivando la permanencia y el ascenso de categoría:'
        ],
        bullets: [
          '🥉 Placa Bronce (9% Comisión): Nivel inicial para profesionales con registro aprobado, verificación de antecedentes y KYC completado. Cobran el 91% neto de cada trabajo.',
          '🥈 Placa Plata (8% Comisión): Requiere superar 25 servicios completados con calificación promedio ≥ 4.7 estrellas y puntualidad ≥ 92%. Cobran el 92% neto.',
          '🥇 Placa Oro (7% Comisión): Requiere superar 80 servicios completados con calificación promedio ≥ 4.9 estrellas, puntualidad ≥ 96% y 0 reclamos en los últimos 60 días. Cobran el 93% neto de por vida.',
          '👑 Promoción Temporal Mes 1 (Los Primeros 100 Cupos): Exclusiva para el primer mes al 1% de comisión (¡99% neto para el pro!). Tras el primer mes, el sistema migra automáticamente al profesional a su placa correspondiente u oferta vigente.'
        ]
      },
      {
        title: 'Nuevo Proceso de Verificación KYC (6 Fotos + 1 Selfie)',
        paragraphs: [
          'Se eliminó definitivamente el requisito de 5 fotos de servicios reales realizados, reemplazándolo por una verificación objetiva de capacidad técnica y biometría:'
        ],
        bullets: [
          '6 Fotografías de Herramientas y Equipos: Fotos completas de los instrumentos reales con los que el profesional ejecuta su oficio. Se acepta indumentaria con marcas deportivas comerciales (Nike, Adidas) sin trabas burocráticas.',
          '1 Foto de Perfil Biométrica: Rostro nítido y visible. Al subirla, el sistema notifica y congela la imagen: no podrá modificarse durante 30 días para proteger la identidad.',
          'Entrevista Exclusiva vía WhatsApp: La validación se ejecuta 100% mediante mensajes de texto, audios, fotos de soporte y ubicación de WhatsApp. Están expresamente prohibidas las llamadas telefónicas.'
        ]
      },
      {
        title: 'Catálogo de Servicios y Estandarización Técnica',
        paragraphs: [
          'Se redefinieron las reglas de negocio en los dos servicios de alta sensibilidad de la plataforma:'
        ],
        bullets: [
          'Luz Express: Queda reservado exclusivamente para emergencias eléctricas críticas (cortos circuitos, brequeras quemadas, apagones) con llegada garantizada en menos de 35 minutos.',
          'Auxilio de Batería (Reenfoque a Celulares): Se abandona el auxilio vehicular para enfocarse en auxilio de carga celular rápida (máximo 30 minutos) con cargadores y cables Tipo C, Lightning (iPhone) y Micro-USB. Es obligatorio que el técnico suba fotos de sus cargadores para ser visible en esta categoría.'
        ]
      },
      {
        title: 'Operación en Campo, Garantías y Disputas',
        paragraphs: [
          'Bajo el marco de la Ley 1480 y el protocolo de servicio Rebuske, las garantías se operan bajo principios de estricta responsabilidad personal:'
        ],
        bullets: [
          'Garantía Única con Técnico Original: Solo aplica contactando y asignando la revisión al técnico que ejecutó el trabajo inicial. No se involucran técnicos de emergencia ni fondos de reserva.',
          'Sanción por Incumplimiento: Si el profesional no asiste a la garantía en el horario acordado, se bloquea su cuenta por 2 días y se le notifica formalmente por correo.',
          'Resolución de Disputas con Facturas de Ferretería: En caso de discrepancias sobre materiales, el técnico debe presentar facturas reales de compra preferiblemente vía WhatsApp. El supervisor revisa el historial y envía capturas como soporte.',
          'Redistribución y Tiempos de Espera: El tiempo mínimo de espera antes de redistribuir se fijó en 30 minutos o más. Cumplidos los 30 minutos, se emite una alerta al cliente ofreciendo esperar hasta 30 minutos adicionales o redistribuir.'
        ]
      },
      {
        title: 'UX/UI, Comandos de Voz y Modo Familiar',
        paragraphs: [
          'Las funcionalidades clave de la aplicación fueron actualizadas para máxima seguridad familiar y evidencia auditable:'
        ],
        bullets: [
          'Modo Familiar 100% Digital: Pagos exclusivos con tarjeta registrada en Bóveda Wompi. Prohibido terminantemente el uso de efectivo. El cabeza de hogar que financia la cuenta tiene la última palabra sobre cualquier sobrecosto.',
          'Chat con Comandos de Voz y Transcripción Automática: Toda nota de voz enviada entre cliente y profesional se transcribe a texto y se almacena en el registro de chat como evidencia legal auditable ante disputas.',
          'Compresión de Imágenes en Navegador: Se implementó compresión automática mediante Canvas API antes de la subida a Storage, reduciendo el peso de fotos a <350 KB.'
        ]
      }
    ]
  },

  // 2. ESTRATEGIA DE MARKETING Y VOZ DE MARCA
  {
    fileName: 'Estrategia-Marketing-Voz-Rebuske.pdf',
    title: 'Estrategia de Marketing, Crecimiento y Voz de Marca Rebuske',
    category: 'Marketing, Comunicaciones y Comunidad',
    author: '🎨 Valeria · Diseñadora UI/UX & Marketing & 📢 Sofía · Social Media',
    sections: [
      {
        title: 'Evolución de Marca: De Sano Orgullo Paisa a Orgullo Colombiano',
        paragraphs: [
          'Rebuske nace en el Valle de Aburrá con raíces antioqueñas profundas, pero su visión y calidez evolucionan formalmente hacia el "Orgullo Colombiano". Este enfoque nos permite conectar con la dignidad del trabajo en toda la geografía nacional con un tono cercano, profesional y sumamente empático.',
          'La marca resalta la honradez, el rebusque digno y la excelencia en el servicio sin caer en localismos excluyentes, integrando el acervo cultural de las distintas regiones de Colombia.'
        ],
        highlight: 'Principio Rector: Comunicar con el corazón de la gente trabajadora, eliminando regionalismos cerrados y exaltando el talento honesto de todo el país.'
      },
      {
        title: 'Integración Oficial del Banco de Palabras Colombianas',
        paragraphs: [
          'Para enriquecer nuestra identidad en redes, atención al cliente y notificaciones push, incorporamos oficialmente el Banco de Palabras Colombianas compuesto por 200 términos y 400 frases reales agrupadas en 10 dimensiones culturales:',
        ],
        bullets: [
          '1. Trabajo, Dinero y Rebusque: Rebusque, camello, chamba, billete, lucas, chichigua, fiao, berraco, tesón, boleo.',
          '2. Trato Cercano y Vínculo Comunitario: Parce, mi pez, llave, parcero, compa, vecina, patrón, mijo, parcera, paisano.',
          '3. Cotidianidad del Hogar y Resolutividad: Desvare, embolate, trasteo, remiendo, cacharro, chéchere, gotera, resane.',
          '4. Expresiones de Asombro y Calidad: Una chimba, brutal, de una, qué nota, bacano, firme, bien parado, nitidez, chicanear.',
          '5. Canales de Aplicación: Se adoptan en los copys de redes sociales de 📢 Sofía 📢, las respuestas automáticas de 💬 Laura 💬 en WhatsApp y el protocolo de bienvenida de la app.'
        ]
      },
      {
        title: 'Canales de Adquisición y Tráfico Centralizado',
        paragraphs: [
          'Toda la estrategia de captación de tráfico orgánico y pago se unificó bajo un solo enlace oficial: https://rebuske.vercel.app/registro.',
          'Siguiendo las instrucciones de la Dirección General, se eliminaron de la estrategia las alianzas con talleres/ferreterías y las transmisiones en vivo de TikTok, concentrando el presupuesto en micro-campañas de geolocalización en comunas y encuestas de satisfacción en todo el territorio de Antioquia.'
        ]
      },
      {
        title: 'Estrategia de Cupones y Propuesta del Bono de $20.000 COP',
        paragraphs: [
          'La ingeniería de incentivos para clientes se divide en dos fases estratégicas:'
        ],
        bullets: [
          'Cupón de Adquisición TUBONO15K-VIP: Otorga $15.000 COP de descuento en el primer servicio igual o superior a $90.000 COP, con 0% de comisión para la plataforma (subsidio de bienvenida).',
          'Propuesta Técnica: Bono de Reactivación de $20.000 COP: Diseñado exclusivamente para una cohorte de 33 clientes inactivos con más de 2 meses sin solicitar servicios. Aplica únicamente en trabajos > $90.000 COP. El profesional recibe íntegramente su pago neto según su placa (93% Oro, 92% Plata, 91% Bronce); Rebuske financia el subsidio promocional con su fondo de retención.'
        ]
      }
    ]
  },

  // 3. MANUAL DE MARCA REBUSKE
  {
    fileName: 'Manual-de-Marca-Rebuske.pdf',
    title: 'Manual de Identidad Visual, Expresión y Marca Rebuske Colombia',
    category: 'Identidad Corporativa y Diseño Visual',
    author: '🎨 Valeria · Directora de Arte & 🎭 Da vinci · Creativo',
    sections: [
      {
        title: 'Filosofía y Territorio Visual de Marca',
        paragraphs: [
          'Rebuske representa la dignidad, la confianza y la luminosidad en medio de los imprevistos cotidianos del hogar. La marca se construye sobre la metáfora de la Luciérnaga: un ser que ilumina el camino en la noche oscura de un tubo roto o un corto circuito.',
          'Nuestro territorio visual fusiona la robustez de las herramientas de trabajo con la sofisticación tecnológica de una plataforma segura con Bóveda de pago.'
        ]
      },
      {
        title: 'Paleta Cromática Oficial',
        paragraphs: [
          'La identidad cromática se compone de cuatro tonalidades fundamentales de alto contraste que cumplen el estándar WCAG AA de accesibilidad:'
        ],
        bullets: [
          'Ébano Nocturno (#0C120A): Color estructural principal. Representa seriedad, profundidad y contraste.',
          'Verde Lima Luciérnaga (#B8FF3B): Color insignia de la marca. Transmite energía, esperanza, tecnología y luz.',
          'Verde Bosque Fuerte (#1E3317): Estabilidad operativa y conexión con la naturaleza y las raíces colombianas.',
          'Dorado Bóveda (#F59E0B): Símbolo de custodia segura, honestidad financiera y garantías Wompi.',
          'Blanco Hueso (#F4FBF1): Claridad tipográfica y máxima legibilidad en interfaces oscuras.'
        ]
      },
      {
        title: 'Personaje Oficial: Lucky en Versión 2D Estática',
        paragraphs: [
          'Se retiró del ecosistema el modelo 3D complejo para adoptar una ilustración 2D limpia, estilizada y empática de Lucky, la luciérnaga amigable.',
          'Lucky se utiliza exclusivamente como fotografía de perfil en el chat de atención al cliente y soporte operativo, transmitiendo calidez, paciencia y respaldo incondicional al usuario.'
        ],
        highlight: 'Directriz Visual: Lucky nunca debe utilizarse con estéticas agresivas o complejas. Su rostro es simple, expresivo y con ojos grandes que generan confianza inmediata.'
      },
      {
        title: 'Sistema Gráfico de Placas para Profesionales',
        paragraphs: [
          'El sistema de reconocimiento profesional se apoya en 3 insignias cromáticas que los usuarios pueden identificar en la aplicación y en el carné digital:'
        ],
        bullets: [
          '🥉 Placa Bronce (#CD7F32): Marco metálico cobrizo cálido. Indica un técnico recién validado con documentación completa.',
          '🥈 Placa Plata (#C0C0C0): Reflejo metálico pulido. Certifica a un profesional con más de 25 servicios excelentes.',
          '🥇 Placa Oro (#F59E0B): Brillo dorado resplandeciente. Distingue a los maestros de más de 80 trabajos con 4.9+ estrellas.'
        ]
      },
      {
        title: 'Políticas de Vestuario, Logos e Indumentaria',
        paragraphs: [
          'Siguiendo las directrices de 👑 Canashi 👑, Rebuske adopta una postura flexible y humana respecto a las prendas de trabajo:',
          'Se permite el uso de indumentaria cotidiana con logotipos deportivos comerciales reconocidos (como Nike, Adidas, Puma, etc.). La moderación no penaliza marcas de uso común, sino que enfoca la evaluación en la pulcritud, el uso de botas de seguridad adecuadas y el porte respetuoso del carné digital en el celular.'
        ]
      }
    ]
  },

  // 4. ROADMAP DE PRODUCTO REBUSKE
  {
    fileName: 'Roadmap-de-Producto-Rebuske.pdf',
    title: 'Hoja de Ruta de Producto, Desarrollo Tecnológico y Expansión 2026',
    category: 'Producto, Roadmap y Estrategia',
    author: '💻 Mateo · Tech Lead & 👑 Canashi 👑 · Fundador & CEO',
    sections: [
      {
        title: 'Visión General y Ajustes de Prioridad Estratégica',
        paragraphs: [
          'El Roadmap 2026 de Rebuske prioriza la solidez operativa, la retención de clientes y la rentabilidad de los profesionales por encima de desarrollos experimentales.',
          'Se despriorizó el escáner AR de tuberías y breakers, aplazándolo para etapas futuras de I+D, concentrando el esfuerzo en la perfección del flujo transaccional y la gestión de garantías.'
        ],
        highlight: 'Meta Primordial Q1: Cerrar los 100 cupos de profesionales fundadores con 1% de comisión en el Valle de Aburrá y habilitar la cohorte VIP de clientes con el bono TUBONO15K-VIP.'
      },
      {
        title: 'Fase 1 (Q1 2026): Lanzamiento y Consolidación en Medellín',
        paragraphs: [
          'Entregables técnicos y operativos completados al 100%:'
        ],
        bullets: [
          'Portal unificado de registro en Vercel (https://rebuske.vercel.app/registro) con bifurcación Pro y Cliente.',
          'Verificación KYC con 6 fotos de herramientas y 1 foto de perfil biométrica con cooldown de 30 días.',
          'Entrevista y pre-auditoría 100% por WhatsApp (mensajes de texto y voz; prohibidas llamadas).',
          'Integración de Bóveda Wompi con liquidación al 99% para los primeros 100 pros (1% comisión mes 1).',
          'Modo Luz Express dedicado exclusivamente a emergencias eléctricas críticas (<35 min).',
          'Modo Familiar 100% digital con tarjeta registrada (cero efectivo) y autorización del cabeza de hogar.',
          'Chat con comandos de voz y transcripción automática de audio a texto para auditoría.'
        ]
      },
      {
        title: 'Fase 2 (Q2 2026): Escalabilidad, Placas y Nuevos Módulos',
        paragraphs: [
          'Objetivos del segundo trimestre:'
        ],
        bullets: [
          'Despliegue formal del sistema de Placas Bronce (9%), Plata (8%) y Oro (7%) con ascensos automáticos.',
          'Activación del módulo Auxilio de Batería de Celular (cargas rápidas de 30 min con cables Tipo C/Lightning/Micro-USB).',
          'Implementación del Bono de Reactivación de $20.000 COP para clientes inactivos de más de 2 meses en servicios > $90k.',
          'Ampliación del sistema de encuestas de satisfacción a todos los municipios del departamento de Antioquia.',
          'Lanzamiento oficial del APK y link en Google Play Store para clientes registrados.'
        ]
      },
      {
        title: 'Fase 3 (Q3-Q4 2026): Expansión Nacional "Orgullo Colombiano"',
        paragraphs: [
          'Escalamiento regional bajo el paraguas de marca unificada:'
        ],
        bullets: [
          'Apertura de operaciones en el Eje Cafetero (Pereira, Manizales, Armenia) y Cali.',
          'Llegada a Bogotá con adaptación a micro-zonas y comunas metropolitanas.',
          'Integración del Banco de Palabras Colombianas en la personalización de perfiles regionales.',
          'Alianzas institucionales para la certificación técnica de plomeros y electricistas.'
        ]
      }
    ]
  }
];

// ============================================================================
// ENVÍO DE CORREO POR TLS DIRECTO (PUERTO 465) A HOLAREBUSKE@GMAIL.COM
// ============================================================================
function sendEmailWithAttachments({ fromName, to, subject, htmlText, attachments }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { minVersion: 'TLSv1.2' }, () => {
      // Conectado
    });

    let step = 0;
    const boundary = '----=_Part_Rebuske_' + Date.now().toString(16);

    socket.setEncoding('utf8');

    socket.on('data', data => {
      const code = parseInt(data.substring(0, 3), 10);

      if (code >= 400 && code !== 434) {
        socket.end();
        return reject(new Error(`SMTP Error [${code}]: ${data.trim()}`));
      }

      if (step === 0 && code === 220) {
        step = 1;
        socket.write(`EHLO rebuske.local\r\n`);
      } else if (step === 1 && code === 250) {
        step = 2;
        socket.write(`AUTH LOGIN\r\n`);
      } else if (step === 2 && code === 334) {
        step = 3;
        socket.write(Buffer.from(SMTP_USER).toString('base64') + '\r\n');
      } else if (step === 3 && code === 334) {
        step = 4;
        socket.write(Buffer.from(SMTP_PASS).toString('base64') + '\r\n');
      } else if (step === 4 && code === 235) {
        step = 5;
        socket.write(`MAIL FROM:<${SMTP_USER}>\r\n`);
      } else if (step === 5 && code === 250) {
        step = 6;
        socket.write(`RCPT TO:<${to}>\r\n`);
      } else if (step === 6 && code === 250) {
        step = 7;
        socket.write(`DATA\r\n`);
      } else if (step === 7 && code === 354) {
        step = 8;

        let emailContent = '';
        emailContent += `From: "${fromName}" <${SMTP_USER}>\r\n`;
        emailContent += `To: <${to}>\r\n`;
        emailContent += `Subject: ${subject}\r\n`;
        emailContent += `MIME-Version: 1.0\r\n`;
        emailContent += `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n`;

        // Parte HTML
        emailContent += `--${boundary}\r\n`;
        emailContent += `Content-Type: text/html; charset="UTF-8"\r\n`;
        emailContent += `Content-Transfer-Encoding: 8bit\r\n\r\n`;
        emailContent += `${htmlText}\r\n\r\n`;

        // Adjuntos en Base64
        for (const att of attachments) {
          const fileBytes = fs.readFileSync(att.path);
          const base64Data = fileBytes.toString('base64');
          emailContent += `--${boundary}\r\n`;
          emailContent += `Content-Type: application/pdf; name="${att.name}"\r\n`;
          emailContent += `Content-Disposition: attachment; filename="${att.name}"\r\n`;
          emailContent += `Content-Transfer-Encoding: base64\r\n\r\n`;
          
          for (let i = 0; i < base64Data.length; i += 76) {
            emailContent += base64Data.substring(i, i + 76) + '\r\n';
          }
          emailContent += '\r\n';
        }

        emailContent += `--${boundary}--\r\n`;
        emailContent += `.\r\n`;

        socket.write(emailContent);
      } else if (step === 8 && code === 250) {
        step = 9;
        socket.write(`QUIT\r\n`);
        resolve({ ok: true, msg: 'Mensaje entregado exitosamente al servidor SMTP' });
      }
    });

    socket.on('error', err => reject(err));
  });
}

// ============================================================================
// EJECUCIÓN PRINCIPAL: GENERAR Y TRANSMITIR
// ============================================================================
async function main() {
  console.log('====================================================================');
  console.log('⚡ REBUSKE · COMPILACIÓN Y ENVÍO DE LOS 4 DOCUMENTOS MAESTROS PDF ⚡');
  console.log('====================================================================');

  const generatedAttachments = [];

  for (const docInfo of docsData) {
    const outPath = path.join(OUT_DIR, docInfo.fileName);
    console.log(`▶ Compilando con PDFKit: ${docInfo.fileName}...`);
    await createMasterPdf(outPath, docInfo.title, docInfo.category, docInfo.author, docInfo.sections);
    const size = fs.statSync(outPath).size;
    console.log(`  ✓ Creado: ${docInfo.fileName} (${(size / 1024).toFixed(1)} KB)`);
    generatedAttachments.push({ name: docInfo.fileName, path: outPath });
  }

  // Correo resumen estructurado
  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 650px; margin: 0 auto; background: #0C120A; color: #F4FBF1; padding: 30px; border-radius: 20px; border: 1px solid #24391E;">
      <div style="border-bottom: 2px solid #B8FF3B; padding-bottom: 16px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
        <h1 style="margin: 0; font-size: 24px; color: #FFFFFF;">rebusk<span style="color: #B8FF3B;">e</span></h1>
        <span style="background: rgba(184, 255, 59, 0.15); color: #B8FF3B; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; border: 1px solid rgba(184, 255, 59, 0.3);">ACTUALIZACIÓN OFICIAL 2026</span>
      </div>

      <p style="font-size: 14px; color: #97A890; margin-bottom: 20px;">
        Estimado <strong>👑 Canashi 👑</strong> y Equipo Directivo de Rebuske,
      </p>

      <p style="font-size: 13px; line-height: 1.6; color: #E5F5E0; margin-bottom: 18px;">
        Cumpliendo con exactitud las <strong>11 Instrucciones Maestras de Actualización del Sistema Rebuske</strong>, adjuntamos los <strong>4 Documentos Maestros Oficiales actualizados en PDF</strong>:
      </p>

      <div style="background: #121A0E; border: 1px solid #24391E; border-radius: 14px; padding: 18px; margin-bottom: 20px;">
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8; color: #F4FBF1;">
          <li><strong style="color: #B8FF3B;">1. Dossier-de-Migracion-Rebuske.pdf:</strong> Vercel + Supabase, Placas (Bronce 9%, Plata 8%, Oro 7%), 1% mes 1 (100 cupos), KYC 6 herramientas + 1 selfie (30d cooldown), WhatsApp exclusivo, Luz Express eléctrico, Auxilio cargador celular, Modo Familiar digital (cero efectivo), Comandos de voz transcritos, Garantía técnico original (2d bloqueo) y Retiro de AR y SIC.</li>
          <li><strong style="color: #B8FF3B;">2. Estrategia-Marketing-Voz-Rebuske.pdf:</strong> Evolución de "Sano Orgullo Paisa" a "Orgullo Colombiano", integración del Banco de Palabras Colombianas (200 términos y 400 ejemplos), link único <code style="color: #B8FF3B;">/registro</code>, cupón TUBONO15K-VIP y propuesta técnica del Bono de $20.000 COP para 33 clientes inactivos.</li>
          <li><strong style="color: #B8FF3B;">3. Manual-de-Marca-Rebuske.pdf:</strong> Identidad Orgullo Colombiano, paleta (#0C120A, #B8FF3B, #1E3317, #F59E0B), mascota Lucky en 2D estático para soporte (cero 3D), diseño visual de placas e indumentaria flexible con logos deportivos comunes (Nike/Adidas).</li>
          <li><strong style="color: #B8FF3B;">4. Roadmap-de-Producto-Rebuske.pdf:</strong> Hoja de ruta 2026 adaptada a la realidad actual, retiro de escáner AR, fases Q1 a Q4, escalamiento nacional y Google Play Store.</li>
        </ul>
      </div>

      <div style="background: #162413; border-left: 4px solid #F59E0B; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; font-size: 12px; color: #D8C7A5;">
        <strong>Nota de Cumplimiento Documental:</strong>
        <br>• <em>Informe-Tecnico-Rebuske</em> se mantiene como documento interno (NO reenviado).
        <br>• <em>Lucky_Avatar_3D_Model_Sheet_Rebuske.pdf</em> y <em>REBUSKE_14_PIEZAS_REDES_SOCIALES_CANASHI.pdf</em> fueron formalmente eliminados.
        <br>• <em>Banco de Palabras Colombianas</em> quedó consolidado en texto plano limpio en <code style="color:#B8FF3B">banco_palabras_colombianas.txt</code>.
      </div>

      <p style="font-size: 11px; color: #7A9174; border-top: 1px solid #24391E; padding-top: 12px; margin: 0; text-align: center;">
        Rebuske Colombia © 2026 · Camilo Escobar · Medellín, Antioquia · Todos los derechos reservados.
      </p>
    </div>
  `;

  console.log('\n▶ Despachando los 4 PDFs actualizados por TLS a holarebuske@gmail.com...');
  const result = await sendEmailWithAttachments({
    fromName: '💻 Mateo & 🎨 Valeria · Rebuske Central',
    to: TO_EMAIL,
    subject: '📚 [REBUSKE 4 DOCUMENTOS MAESTROS ACTUALIZADOS] Directrices 2026 de Canashi',
    htmlText: emailHtml,
    attachments: generatedAttachments
  });

  console.log('✅ ¡LOS 4 DOCUMENTOS MAESTROS EN PDF FUERON GENERADOS Y ENVIADOS EXITOSAMENTE!');
  console.log('Resultado:', result);
}

main().catch(console.error);
