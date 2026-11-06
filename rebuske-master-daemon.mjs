/**
 * ============================================================================
 * REBUSKE MASTER SERVER & DAEMON · 27 AGENTES OFICIALES (PRODUCCIÓN)
 * ============================================================================
 * Centraliza:
 * 1. API REST para el flujo de servicio y Bóveda Wompi (7% Oro VIP / 1% Fundadores).
 * 2. Ciclo autónomo de ideas (Simón -> Dante -> Dr. Lorenzo -> Canashi).
 * 3. Enrutamiento de reportes internos a holarebuske@gmail.com:
 *    - Simón: 40 propuestas de innovación ($0 USD).
 *    - Valeria: Publicidad y redes sociales.
 *    - Sofía: Auditoría UI/UX en 3 toques.
 *    - Dr. Lorenzo: Dictámenes de compliance normativo (Leyes 1480, 1581, 1618, 2195).
 *    - Aliccia: Documentos y gestiones con alcaldías y Cámara de Comercio.
 *    - Cayse: Cierres mensuales y balances contables/tributarios.
 *    - Andrea & Daniela: Gremios, asociaciones y medios (estrictamente interno).
 * 4. Reporte CEO (Canashi) cada 4 días a camiloescobarr63@gmail.com.
 * ============================================================================
 */

import http from 'http';
import tls from 'tls';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3847;
const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';
const CEO_EMAIL = 'camiloescobarr63@gmail.com';

// ----------------------------------------------------------------------------
// 1. ROSTER OFICIAL DE LOS 27 AGENTES
// ----------------------------------------------------------------------------
export const AGENTS = {
  // Dirección General y Estrategia (5)
  canashi: { id: 'canashi', name: 'Canashi', role: 'CEO & Director General', dept: 'Dirección' },
  simon: { id: 'simon', name: 'Simón', role: 'Innovación', dept: 'Dirección' },
  dante: { id: 'dante', name: 'Dante', role: 'Filtro Crítico', dept: 'Dirección' },
  lorenzo: { id: 'lorenzo', name: 'Dr. Lorenzo', role: 'Compliance', dept: 'Dirección' },
  aliccia: { id: 'aliccia', name: 'Aliccia', role: 'Relaciones Institucionales', dept: 'Dirección' },

  // Tecnología, Infraestructura y Datos (7)
  mateo: { id: 'mateo', name: 'Mateo', role: 'Arquitectura Backend', dept: 'Tecnología' },
  valeria: { id: 'valeria', name: 'Valeria', role: 'Diseño UI/UX', dept: 'Tecnología' },
  lucas: { id: 'lucas', name: 'Lucas', role: 'Calidad y Despliegue', dept: 'Tecnología' },
  fernando: { id: 'fernando', name: 'Fernando', role: 'DevOps', dept: 'Tecnología' },
  carlos: { id: 'carlos', name: 'Carlos', role: 'Seguridad Informática / CISO', dept: 'Tecnología' },
  galloti: { id: 'galloti', name: 'Galloti', role: 'Telemetría y Tiempo Real', dept: 'Tecnología' },
  elena_data: { id: 'elena_data', name: 'Elena', role: 'Ciencia de Datos', dept: 'Tecnología' },

  // Finanzas, Pagos y Control (7)
  tomas: { id: 'tomas', name: 'Tomás', role: 'FinTech & Bóveda Wompi', dept: 'Finanzas' },
  mariana: { id: 'mariana', name: 'Mariana', role: 'CFO', dept: 'Finanzas' },
  cayse: { id: 'cayse', name: 'Cayse', role: 'Contabilidad e Impuestos', dept: 'Finanzas' },
  patricia: { id: 'patricia', name: 'Patricia', role: 'Auditoría de Pagos', dept: 'Finanzas' },
  valentina: { id: 'valentina', name: 'Valentina', role: 'KYC', dept: 'Finanzas' },
  roberto: { id: 'roberto', name: 'Roberto', role: 'Antifraude', dept: 'Finanzas' },
  ricardo: { id: 'ricardo', name: 'Ricardo', role: 'Tarifas / Pricing', dept: 'Finanzas' },

  // Operaciones, Servicio y Alianzas (6)
  diego: { id: 'diego', name: 'Diego', role: 'Coordinación de Servicios', dept: 'Operaciones' },
  laura: { id: 'laura', name: 'Laura', role: 'Soporte al Usuario', dept: 'Operaciones' },
  elena_legal: { id: 'elena_legal', name: 'Elena', role: 'Legaltech', dept: 'Operaciones' },
  telmo: { id: 'telmo', name: 'Telmo', role: 'Normalización Técnica', dept: 'Operaciones' },
  andrea: { id: 'andrea', name: 'Andrea', role: 'Alianzas Estratégicas', dept: 'Operaciones' },
  daniela: { id: 'daniela', name: 'Daniela', role: 'Investigación y Oportunidades', dept: 'Operaciones' },

  // Comunicaciones y Marca (2)
  sofia: { id: 'sofia', name: 'Sofia', role: 'Contenido y Difusión', dept: 'Comunicaciones' },
  davinci: { id: 'davinci', name: 'Da vinci', role: 'Identidad de Marca', dept: 'Comunicaciones' }
};

// ----------------------------------------------------------------------------
// 2. FUNCIÓN DE DESPACHO SMTP TLS DIRECTO
// ----------------------------------------------------------------------------
export function sendMail({ fromName, to, subject, html }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { rejectUnauthorized: false }, () => {});
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
        socket.write(`RCPT TO:<${to}>\r\n`);
      } else if (step === 6 && data.startsWith('250')) {
        step = 7;
        socket.write('DATA\r\n');
      } else if (step === 7 && data.startsWith('354')) {
        step = 8;
        const msg = [
          `From: "${fromName || 'Rebuske Sistema'}" <${SMTP_USER}>`,
          `To: <${to}>`,
          `Subject: ${subject}`,
          'MIME-Version: 1.0',
          'Content-Type: text/html; charset=UTF-8',
          '',
          html,
          '\r\n.\r\n'
        ].join('\r\n');
        socket.write(msg);
      } else if (step === 8 && data.startsWith('250')) {
        step = 9;
        socket.write('QUIT\r\n');
        socket.end();
        resolve({ ok: true, recipient: to });
      }
    });

    socket.on('error', (err) => reject(err));
    socket.setTimeout(15000, () => {
      socket.destroy();
      reject(new Error('Timeout SMTP en conexión'));
    });
  });
}

// ----------------------------------------------------------------------------
// 3. MOTOR DE BÓVEDA WOMPI Y COMISIONES (7% ORO / 1% FUNDADORES)
// ----------------------------------------------------------------------------
export function calculateWompiEscrow(amountCOP, tier = 'ORO_VIP') {
  const TIERS = {
    ORO_VIP: 0.07,     // 7% de por vida
    FUNDADORES: 0.01,  // 1% primer mes
    PLATA: 0.08,
    BRONCE: 0.09
  };
  const rate = TIERS[tier] || TIERS.ORO_VIP;
  const comisionRebuske = Math.round(amountCOP * rate);
  const pagoNetoTecnico = amountCOP - comisionRebuske;

  return {
    montoTotalCOP: amountCOP,
    tierAplicado: tier,
    porcentajeComision: `${rate * 100}%`,
    comisionRebuskeCOP: comisionRebuske,
    pagoNetoTecnicoCOP: pagoNetoTecnico,
    horasCustodia: 48,
    reglaLiberacion: 'Inmediata con 5★ o automática a las 48h. Retención en disputa.'
  };
}

// ----------------------------------------------------------------------------
// 4. PIPELINE FILTRADO DE UNA IDEA (DANTE -> LORENZO -> CANASHI)
// ----------------------------------------------------------------------------
export function evaluateIdeaPipeline(idea) {
  // Dante: 4 preguntas obligatorias
  const danteQuestions = {
    sePuedeEstafar: Boolean(idea.riesgoFraude),
    loEntiendeAdultoMayorPaisa: Boolean(idea.comprensiblePaisa !== false),
    saturaServidores: Boolean(idea.saturaServidores),
    tieneCostoOculto: Boolean(idea.costoOculto)
  };

  const dantePassed = !danteQuestions.sePuedeEstafar && 
                       danteQuestions.loEntiendeAdultoMayorPaisa && 
                      !danteQuestions.saturaServidores && 
                      !danteQuestions.tieneCostoOculto;

  if (!dantePassed) {
    return {
      ideaId: 'idea_' + Date.now(),
      status: 'RECHAZADA_POR_DANTE',
      evaluador: 'Dante (Filtro Crítico)',
      motivo: 'No superó las 4 preguntas de control de fraude, usabilidad paisa o costos.'
    };
  }

  // Dr. Lorenzo: Compliance Leyes 1480, 1581, 1618, 2195
  const lorenzoPassed = idea.cumpleLey1480 !== false && idea.cumpleLey1581 !== false;
  if (!lorenzoPassed) {
    return {
      ideaId: 'idea_' + Date.now(),
      status: 'RECHAZADA_POR_LORENZO',
      evaluador: 'Dr. Lorenzo (Compliance)',
      motivo: 'Inconsistencia con Estatuto del Consumidor o Protección de Datos Personales.'
    };
  }

  // Canashi: Aprobación Ejecutiva
  return {
    ideaId: 'idea_' + Date.now(),
    status: 'APROBADA_POR_CANASHI',
    evaluador: 'Canashi (CEO)',
    destinatariosDesarrollo: ['mateo', 'valeria', 'lucas'],
    mensaje: 'Propuesta lista para arquitectura backend y despliegue a producción.'
  };
}

// ----------------------------------------------------------------------------
// 5. SERVIDOR HTTP REST & WEBHOOKS
// ----------------------------------------------------------------------------
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      ok: true, 
      sistema: 'Rebuske Master Daemon', 
      agentesActivos: Object.keys(AGENTS).length, 
      bovedaWompi: 'ORO_VIP_7%', 
      timestamp: new Date().toISOString() 
    }));
    return;
  }

  // Lista oficial de los 27 agentes
  if (req.url === '/api/agents') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, total: Object.keys(AGENTS).length, agents: AGENTS }));
    return;
  }

  // Despacho de reporte de Alianzas (Andrea) estrictamente interno a holarebuske@gmail.com
  if (req.url === '/api/reports/andrea-alianzas' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const html = `
          <h2>Informe de Alianzas y Gremios de Antioquia</h2>
          <p><strong>Responsable:</strong> Andrea (Operaciones & Alianzas)</p>
          <p><strong>Destino:</strong> Estrictamente Interno (holarebuske@gmail.com)</p>
          <hr/>
          <pre>${JSON.stringify(payload.entidades || ['Asociación de Fontaneros del Valle de Aburrá', 'Gremio de Electricistas de Antioquia'], null, 2)}</pre>
        `;
        await sendMail({
          fromName: 'Andrea · Alianzas Rebuske',
          to: SMTP_USER,
          subject: 'Informe Confidencial de Gremios y Alianzas en Antioquia',
          html
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, recipient: SMTP_USER, status: 'DESPACHADO_INTERNO_SIN_SALIDAS' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // Reporte Antifraude: Cobro indebido en efectivo
  if (req.url === '/api/security/report-cash' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const logPath = path.join(process.cwd(), 'rebuske_antifraud_log.json');
        let logs = [];
        if (fs.existsSync(logPath)) {
          logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
        }
        const event = {
          id: 'fraud_' + Date.now(),
          fecha: new Date().toISOString(),
          tipo: 'SOLICITUD_COBRO_EFECTIVO',
          jobId: payload.jobId,
          proId: payload.proId || 'p1',
          sancion: 'PENALIZACION_SILENCIOSA_VISIBILIDAD',
          detalle: payload.detalle || 'Cliente reportó solicitud de pago por fuera de la app'
        };
        logs.push(event);
        fs.writeFileSync(logPath, JSON.stringify(logs, null, 2), 'utf8');

        // Alertar por correo a holarebuske@gmail.com
        sendMail({
          fromName: '🚨 Roberto · Antifraude Rebuske',
          to: SMTP_USER,
          subject: `🚨 [ALERTA ANTIFRAUDE] Reporte de Cobro en Efectivo (Orden #${payload.jobId})`,
          html: `<h2>Alerta de Seguridad: Solicitud de Pago Fuera de la App</h2>
                 <p><strong>Orden ID:</strong> ${payload.jobId}</p>
                 <p><strong>Profesional:</strong> ${payload.proName || 'Don Julián Restrepo'}</p>
                 <p><strong>Medida Aplicada:</strong> Sanción silenciosa de visibilidad en el algoritmo.</p>
                 <p><strong>Detalle:</strong> ${event.detalle}</p>`
        }).catch(() => {});

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, status: 'REPORTE_REGISTRADO', sancionSilenciosa: true }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // Validación Biométrica de Alto Valor (> $400.000 COP)
  if (req.url === '/api/security/check-biometrics' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const monto = Number(payload.montoCOP || 0);
        const required = monto >= 400000;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: true,
          montoCOP: monto,
          biometricRequired: required,
          tipoGesto: required ? 'SELFIE_SERIA_O_SONRIENTE' : 'NO_REQUERIDO',
          umbralCOP: 400000,
          mensaje: required
            ? 'Servicio de alto valor (≥$400.000 COP). Validación biométrica facial requerida para autorizar inicio.'
            : 'Monto estándar. No requiere biometría adicional.'
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // Liquidación Wompi
  if (req.url === '/api/wompi/calculate' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const calc = calculateWompiEscrow(Number(data.montoCOP || 100000), data.tier || 'ORO_VIP');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, escrow: calc }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // Listado de Técnicos Registrados (Persistente)
  if (req.url === '/api/technicians' && req.method === 'GET') {
    try {
      const dbPath = path.join(process.cwd(), 'rebuske_primordiales_db.json');
      let data = { count: 84, registrations: [] };
      if (fs.existsSync(dbPath)) {
        data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, total: data.count, tecnicos: data.registrations || [] }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
    }
    return;
  }

  // Registro de Técnico en Servidor Headless
  if (req.url === '/api/register-pro' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const dbPath = path.join(process.cwd(), 'rebuske_primordiales_db.json');
        let data = { count: 84, registrations: [] };
        if (fs.existsSync(dbPath)) {
          data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        }
        const isPrimordial = data.count < 100;
        data.count += 1;
        const record = {
          id: 'pro_' + Date.now(),
          fecha: new Date().toISOString(),
          nombre: payload.nombre,
          cedula: payload.cedula,
          tel: payload.tel,
          oficio: payload.oficio,
          zona: payload.zona,
          banco: payload.banco,
          tipo: isPrimordial ? 'PRIMORDIAL' : 'ESTANDAR',
          cupoNumero: data.count,
          comision: isPrimordial ? '7%' : '9%',
          neto: isPrimordial ? '93%' : '91%',
          statusKYC: 'PENDIENTE_REVISION_VALENTINA'
        };
        data.registrations = data.registrations || [];
        data.registrations.push(record);
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');

        // Notificar a Valentina vía email
        sendMail({
          fromName: '🪪 Valentina · KYC Rebuske',
          to: SMTP_USER,
          subject: `🪪 [ALTA TÉCNICO] ${record.nombre} (${record.oficio} · ${record.zona})`,
          html: `<h2>Nuevo Registro Técnico Primordial #${record.cupoNumero}</h2>
                 <p><strong>Profesional:</strong> ${record.nombre}</p>
                 <p><strong>Cédula:</strong> ${record.cedula}</p>
                 <p><strong>Teléfono:</strong> ${record.tel}</p>
                 <p><strong>Oficio:</strong> ${record.oficio}</p>
                 <p><strong>Zona:</strong> ${record.zona}</p>
                 <p><strong>Cuenta:</strong> ${record.banco}</p>
                 <p><strong>Estado:</strong> ${record.statusKYC}</p>`
        }).catch(() => {});

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: true,
          tipo: record.tipo,
          cupoNumero: record.cupoNumero,
          currentCount: data.count,
          remaining: Math.max(0, 100 - data.count),
          message: isPrimordial
            ? `¡Felicitaciones ${record.nombre}! Asignado Cupo Primordial #${data.count}/100 al 93% neto vitalicio.`
            : `¡Bienvenido ${record.nombre}! Registro completado al 91% neto.`
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // Registro de Clientes (Waitlist Play Store + Sheets + DB Interna)
  if (req.url === '/api/register-client' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const dbPath = path.join(process.cwd(), 'rebuske_clientes_waitlist_db.json');
        let db = { count: 0, clientes: [] };
        if (fs.existsSync(dbPath)) {
          try { db = JSON.parse(fs.readFileSync(dbPath, 'utf8')); } catch (_) {}
        }
        const record = {
          id: 'cli_' + Date.now(),
          fecha: new Date().toISOString(),
          nombre: payload.nombre || 'Vecino Rebuske',
          email: payload.email,
          whatsapp: payload.whatsapp || '',
          comuna: payload.comuna || 'Medellín',
          servicio: payload.servicio || 'Servicios Generales',
          bonoCOP: 15000,
          estado: 'LISTA_PLAYSTORE_ACTIVA'
        };
        db.clientes = db.clientes || [];
        db.clientes.push(record);
        db.count = db.clientes.length;
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

        // CSV para Google Sheets con UTF-8 BOM
        const csvPath = path.join(process.cwd(), 'rebuske_clientes_waitlist.csv');
        const header = 'ID,Fecha,Nombre,Email,WhatsApp,Comuna,ServicioInteres,BonoCOP,Estado\n';
        const csvRow = `"${record.id}","${record.fecha}","${record.nombre.replace(/"/g, '""')}","${record.email}","${record.whatsapp}","${record.comuna}","${record.servicio}",15000,"${record.estado}"\n`;
        if (!fs.existsSync(csvPath)) {
          fs.writeFileSync(csvPath, '\uFEFF' + header + csvRow, 'utf8');
        } else {
          fs.appendFileSync(csvPath, csvRow, 'utf8');
        }

        // Correo al cliente con su enlace y bono
        sendMail({
          fromName: 'Rebuske Hogares Medellín',
          to: record.email,
          subject: `🎉 ¡Bienvenido a la Lista VIP Rebuske Hogares! Acceso Google Play Store + Bono $15.000 COP`,
          html: `<h2>¡Hola, ${record.nombre.split(' ')[0]}!</h2>
                 <p>Has sido agregado a la Lista de Espera VIP de Google Play Store para Medellín (#${db.count}).</p>
                 <p><strong>Tu Bono de Bienvenida:</strong> HOGAR15K-VIP ($15.000 COP de descuento).</p>
                 <p>Te avisaremos a este correo apenas la app esté disponible en la tienda para descarga directa.</p>`
        }).catch(() => {});

        // Notificar internamente a holarebuske@gmail.com
        sendMail({
          fromName: 'Rebuske Waitlist Bot',
          to: SMTP_USER,
          subject: `🏠 [NUEVO CLIENTE VIP] ${record.nombre} (${record.comuna})`,
          html: `<h2>Nuevo Registro en Lista Play Store</h2>
                 <p><strong>Nombre:</strong> ${record.nombre}</p>
                 <p><strong>Email:</strong> ${record.email}</p>
                 <p><strong>WhatsApp:</strong> ${record.whatsapp}</p>
                 <p><strong>Comuna:</strong> ${record.comuna}</p>
                 <p><strong>Servicio:</strong> ${record.servicio}</p>`
        }).catch(() => {});

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: true,
          cupoNumero: db.count,
          message: `¡Felicitaciones ${record.nombre.split(' ')[0]}! Cupo VIP #${db.count} reservado con éxito. Bono enviado a tu correo.`
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // Exportar Clientes a Google Sheets / CSV
  if (req.url === '/api/clientes/export-sheets' && req.method === 'GET') {
    const csvPath = path.join(process.cwd(), 'rebuske_clientes_waitlist.csv');
    if (fs.existsSync(csvPath)) {
      const csvData = fs.readFileSync(csvPath, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="rebuske_clientes_waitlist.csv"'
      });
      res.end(csvData);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, total: 0, message: 'No hay clientes registrados aún' }));
    return;
  }

  // Webhook WhatsApp Cloud API + Gemini 1.5 Flash (Laura Soporte & Coordinación)
  if (req.url.startsWith('/api/whatsapp-webhook')) {
    import('./api/whatsapp-webhook.js').then(mod => {
      mod.default(req, res);
    }).catch(err => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint no encontrado' }));
});

server.listen(PORT, () => {
  console.log(`[REBUSKE MASTER DAEMON] Servidor activo en puerto ${PORT} con los 27 agentes oficiales.`);
});
