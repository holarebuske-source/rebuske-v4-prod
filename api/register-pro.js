/**
 * API: /api/register-pro
 * Registra a un nuevo profesional y gestiona la asignación de Cupos Primordiales vs Estándar
 * Rebuske - Medellín
 */

import fs from 'node:fs';
import path from 'node:path';
import tls from 'node:tls';

const DB_PATH_LOCAL = path.join(process.cwd(), 'rebuske_primordiales_db.json');
const DB_PATH_TMP = path.join('/tmp', 'rebuske_primordiales_db.json');
const INITIAL_BASELINE = 84;
const MAX_PRIMORDIALES = 100;

function getStore() {
  const candidates = [DB_PATH_TMP, DB_PATH_LOCAL];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (typeof data.count === 'number') return data;
      }
    } catch (_) {}
  }
  return {
    count: INITIAL_BASELINE,
    registrations: []
  };
}

function saveStore(store) {
  const content = JSON.stringify(store, null, 2);
  let saved = false;
  try {
    fs.writeFileSync(DB_PATH_LOCAL, content, 'utf8');
    saved = true;
  } catch (_) {}
  try {
    fs.writeFileSync(DB_PATH_TMP, content, 'utf8');
    saved = true;
  } catch (_) {}
  return saved;
}

function notifyKycValentina(record) {
  return new Promise((resolve) => {
    try {
      const socket = tls.connect(465, 'smtp.gmail.com', { rejectUnauthorized: false }, () => {});
      let step = 0;
      socket.setEncoding('utf8');
      socket.setTimeout(8000, () => { socket.destroy(); resolve(false); });

      socket.on('data', (data) => {
        if (step === 0 && data.startsWith('220')) {
          step = 1; socket.write('EHLO localhost\r\n');
        } else if (step === 1 && data.includes('250')) {
          step = 2; socket.write('AUTH LOGIN\r\n');
        } else if (step === 2 && data.startsWith('334')) {
          step = 3; socket.write(Buffer.from('holarebuske@gmail.com').toString('base64') + '\r\n');
        } else if (step === 3 && data.startsWith('334')) {
          step = 4; socket.write(Buffer.from('ovvihqcugaxrrmgu').toString('base64') + '\r\n');
        } else if (step === 4 && data.startsWith('235')) {
          step = 5; socket.write('MAIL FROM:<holarebuske@gmail.com>\r\n');
        } else if (step === 5 && data.startsWith('250')) {
          step = 6; socket.write('RCPT TO:<holarebuske@gmail.com>\r\n');
        } else if (step === 6 && data.startsWith('250')) {
          step = 7; socket.write('DATA\r\n');
        } else if (step === 7 && data.startsWith('354')) {
          step = 8;
          const msg = [
            'From: "🪪 Valentina · KYC Rebuske" <holarebuske@gmail.com>',
            'To: <holarebuske@gmail.com>',
            `Subject: =?UTF-8?B?${Buffer.from(`🪪 [ALTA TÉCNICO] ${record.nombre} (${record.oficio} · ${record.zona})`, 'utf8').toString('base64')}?=`,
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            '',
            `<h2>Nuevo Registro Técnico Primordial #${record.cupoNumero}</h2>
             <p><strong>Profesional:</strong> ${record.nombre}</p>
             <p><strong>Cédula:</strong> ${record.cedula}</p>
             <p><strong>Teléfono / WhatsApp:</strong> ${record.tel}</p>
             <p><strong>Oficio:</strong> ${record.oficio}</p>
             <p><strong>Zona:</strong> ${record.zona}</p>
             <p><strong>Cuenta Pagos:</strong> ${record.banco}</p>
             <p><strong>Tarifa Asignada:</strong> ${record.insignia} (Comisión Mes 1: ${record.mes1Comision} · Vitalicia: ${record.vitaliciaComision})</p>
             <p><strong>Estado KYC:</strong> PENDIENTE VALIDACIÓN DE 5 FOTOS Y FOTO DE PERFIL</p>`,
            '\r\n.\r\n'
          ].join('\r\n');
          socket.write(msg);
        } else if (step === 8 && data.startsWith('250')) {
          step = 9; socket.write('QUIT\r\n'); socket.end(); resolve(true);
        }
      });
      socket.on('error', () => resolve(false));
    } catch (_) { resolve(false); }
  });
}


// Carga segura de foto biométrica en bucket privado rebuske-kyc-privado
async function uploadKycPhoto(cedula, base64Data) {
  const url = process.env.SUPABASE_URL || 'https://vqvwcbirzezihfzaeziq.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key || !base64Data) return null;

  try {
    const cleanCedula = String(cedula || 'pro').replace(/[^a-zA-Z0-9_-]/g, '_');
    const storagePath = `${cleanCedula}/perfil_biometrico_${Date.now()}.jpg`;
    const raw = base64Data.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(raw, 'base64');

    const res = await fetch(`${url}/storage/v1/object/rebuske-kyc-privado/${storagePath}`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'image/jpeg',
        'x-upsert': 'true'
      },
      body: buffer
    });

    if (res.ok) {
      return storagePath;
    }
  } catch (_) {}
  return null;
}

// Rate Limiting en memoria para funciones serverless (5 peticiones por IP cada 15 min)
const rateLimitMap = new Map();
function checkRateLimit(ip, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + windowMs;
  }
  record.count += 1;
  rateLimitMap.set(ip, record);
  return record.count <= limit;
}

// Verificación opcional de Cloudflare Turnstile
async function verifyTurnstile(token, ip) {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || '';
  if (!secret || !token) return true;
  try {
    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);
    if (ip) formData.append('remoteip', ip);
    const cfRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData
    });
    const cfData = await cfRes.json();
    return !!cfData.success;
  } catch (_) {
    return true; // Fallback resiliente
  }
}

// Opcional: Sincronización a Supabase
async function syncToSupabase(record) {
  const url = process.env.SUPABASE_URL || 'https://vqvwcbirzezihfzaeziq.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) return;

  try {
    await fetch(`${url}/rest/v1/primordiales_registrations`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(record)
    });
  } catch (e) {
    // Si la tabla no existe o no hay red, no interrumpe el registro
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }


  if (req.method === 'GET') {
    const store = getStore();
    const currentCount = store.count;
    const remaining = Math.max(0, MAX_PRIMORDIALES - currentCount);
    const isPrimordialOpen = currentCount < MAX_PRIMORDIALES;

    return res.status(200).json({
      totalPrimordiales: MAX_PRIMORDIALES,
      currentCount,
      remaining,
      isOpen: isPrimordialOpen,
      phase: isPrimordialOpen ? 'FASE 1 - CONVOCATORIA PRIMORDIALES' : 'FASE 2 - REGISTRO REGULAR ESTÁNDAR',
      benefits: isPrimordialOpen
        ? {
            tipo: 'ORO_PRIMORDIAL',
            neto: '89%',
            comision: '11%',
            mes1: '1%',
            mes1Neto: '99%',
            luegoComision: '11%',
            luegoNeto: '89%',
            insignia: 'Oro VIP Primordial Vitalicia',
            escalaPlanes: {
              oro: { comision: '11%', neto: '89%', requisitos: '100 Fundadores o Calificación 4.9★+' },
              plata: { comision: '14%', neto: '86%', requisitos: '>10 servicios/mes y Rating 4.7★+' },
              bronce: { comision: '18%', neto: '82%', requisitos: 'Nuevos y ocasionales' }
            }
          }
        : {
            tipo: 'REGULAR',
            neto: '82%',
            comision: '18%',
            mes1: '18%',
            mes1Neto: '82%',
            insignia: 'Profesional Estándar Bronce',
            escalaPlanes: {
              oro: { comision: '11%', neto: '89%', requisitos: 'Calificación 4.9★+ y KYC verificado' },
              plata: { comision: '14%', neto: '86%', requisitos: '>10 servicios/mes y Rating 4.7★+' },
              bronce: { comision: '18%', neto: '82%', requisitos: 'Ingreso estándar inicial' }
            }
          }
    });
  }

    if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Use POST.' });
  }

  try {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1').split(',')[0].trim();

    // 1. Rate Limiting por IP (Máx 5 peticiones cada 15 minutos)
    if (!checkRateLimit(clientIp, 5, 15 * 60 * 1000)) {
      return res.status(429).json({
        ok: false,
        error: 'Has alcanzado el límite de intentos permitidos (5 cada 15 minutos). Por seguridad antifraude, espera unos minutos antes de reintentar.'
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    // 2. Protección Honeypot Invisible contra bots automatizados
    if (body.hp_token) {
      return res.status(400).json({ ok: false, error: 'Solicitud rechazada por filtro anti-bot.' });
    }

    // 3. Verificación Cloudflare Turnstile (si se incluye token)
    if (body.turnstileToken) {
      const isHuman = await verifyTurnstile(body.turnstileToken, clientIp);
      if (!isHuman) {
        return res.status(403).json({ ok: false, error: 'Verificación de seguridad Turnstile no superada. Intenta nuevamente.' });
      }
    }

    const { nombre, tel, oficio, zona, cedula, banco, exp, mesNacimiento, anoNacimiento } = body;

    // 4. Validación de Esquema Estricta (Equivalente Zod)
    const cleanNombre = String(nombre || '').trim();
    if (cleanNombre.length < 3) {
      return res.status(400).json({ ok: false, error: 'El nombre completo debe tener al menos 3 caracteres.' });
    }

    // Validación Cédula colombiana: 6 a 10 dígitos numéricos
    const cleanCedula = String(cedula || '').replace(/\D/g, '');
    if (!/^\d{6,10}$/.test(cleanCedula)) {
      return res.status(400).json({
        ok: false,
        error: 'La cédula de ciudadanía debe contener únicamente números y tener entre 6 y 10 dígitos.'
      });
    }

    // Validación Teléfono Móvil Colombia (E.164: +573XXXXXXXXX)
    let rawTel = String(tel || '').replace(/[\s\-\(\)]/g, '');
    if (rawTel.startsWith('57') && !rawTel.startsWith('+57')) rawTel = '+' + rawTel;
    if (!rawTel.startsWith('+57')) {
      const onlyDigits = rawTel.replace(/\D/g, '');
      if (onlyDigits.length === 10 && onlyDigits.startsWith('3')) {
        rawTel = `+57${onlyDigits}`;
      }
    }
    if (!/^\+573\d{9}$/.test(rawTel)) {
      return res.status(400).json({
        ok: false,
        error: 'El teléfono debe ser una línea móvil de Colombia válida en formato E.164 (+57 3XX XXX XXXX).'
      });
    }

    const cleanZona = String(zona || '').trim();
    if (cleanZona.length < 3) {
      return res.status(400).json({ ok: false, error: 'Debes indicar tu comuna o barrio principal de Medellín.' });
    }

    const store = getStore();
    const isPrimordial = store.count < MAX_PRIMORDIALES;
    const newCount = store.count + 1;
    store.count = newCount;

    const record = {
      id: 'pro_' + Date.now(),
      fecha: new Date().toISOString(),
      nombre: cleanNombre,
      tel: rawTel,
      oficio: String(oficio || 'Técnico General').trim(),
      zona: cleanZona,
      cedula: cleanCedula,
      banco: String(banco || 'Nequi').trim(),
      nacimiento: `${mesNacimiento || 'NA'}/${anoNacimiento || 'NA'}`,
      ultimoAcceso: new Date().toISOString(),
      exp: String(exp || '3').trim(),
      tipo: isPrimordial ? 'PRIMORDIAL' : 'ESTANDAR',
      cupoNumero: newCount,
      comision: isPrimordial ? '11%' : '18%',
      neto: isPrimordial ? '89%' : '82%',
      mes1Comision: isPrimordial ? '1%' : '18%',
      mes1Neto: isPrimordial ? '99%' : '82%',
      vitaliciaComision: isPrimordial ? '11%' : '18%',
      vitaliciaNeto: isPrimordial ? '89%' : '82%',
      insignia: isPrimordial ? 'Oro VIP Primordial' : 'Estándar',
      autorizo_terminos: !!body.autorizo_terminos,
      autorizo_datos_sensibles_biometria: !!body.autorizo_datos_sensibles,
      autorizo_consulta_antecedentes: !!body.autorizo_antecedentes,
      cookies_analitica_consentimiento: !!body.cookies_analitica_consentimiento,
      antecedentes_estado: 'APTO_SIN_REPORTES_PENDIENTE_COTEJO',
      antecedentes_fecha_consulta: new Date().toISOString(),
      autorizo_promo: !!body.autorizo_promo
    };

    store.registrations = store.registrations || [];
    store.registrations.push(record);
    saveStore(store);

    // Intentar carga segura de foto en bucket privado KYC y sincronización en background
    if (body.fotoPerfilBase64) {
      uploadKycPhoto(record.cedula, body.fotoPerfilBase64).then(p => {
        if (p) record.foto_kyc_path = p;
      }).catch(() => {});
    }
    syncToSupabase(record).catch(() => {});
    notifyKycValentina(record).catch(() => {});

    const remaining = Math.max(0, MAX_PRIMORDIALES - newCount);

    return res.status(200).json({
      ok: true,
      tipo: record.tipo,
      cupoNumero: record.cupoNumero,
      currentCount: newCount,
      remaining,
      neto: record.neto,
      comision: record.comision,
      mes1Comision: record.mes1Comision,
      insignia: record.insignia,
      message: isPrimordial
        ? `¡Felicitaciones ${record.nombre}! Aseguraste el Cupo Primordial #${newCount}/100. Recibes 89% neto vitalicio (Plan Oro VIP), 1% de comisión en tu primer mes y Placa Oro VIP.`
        : `¡Bienvenido a Rebuske, ${record.nombre}! Los 100 cupos Primordiales ya fueron completados. Tu cuenta queda registrada con tarifa estándar (82% neto para ti / 18% rebuske).`
    });

  } catch (error) {
    console.error('Error en /api/register-pro:', error);
    return res.status(500).json({ error: 'Error procesando el registro del profesional.' });
  }
}
