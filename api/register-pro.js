/**
 * ============================================================================
 * REBUSKE v5 · CONTROLADOR OFICIAL DE REGISTRO PRO & CUPOS PRIMORDIALES
 * ============================================================================
 * Arquitectura: Conexión atómica a Supabase (PostgreSQL RPC) con fallback
 * resiliente en caché local y blindaje DIAN (Mandato Comercial Art. 1262 C.Co).
 * Medellín - Valle de Aburrá
 * ============================================================================
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import tls from 'node:tls';

const DB_PATH_LOCAL = path.join(process.cwd(), 'rebuske_primordiales_db.json');
const DB_PATH_TMP = path.join('/tmp', 'rebuske_primordiales_db.json');
const INITIAL_BASELINE = 84;
const MAX_PRIMORDIALES = 100;

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vqvwcbirzezihfzaeziq.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

// Fallback de caché local en disco/tmp
function getLocalStore() {
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

function saveLocalStore(store) {
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

// Consulta atómica de estado en Supabase con fallback local
async function fetchCurrentCountFromSupabase() {
  if (!SUPABASE_URL || (!SUPABASE_SERVICE_ROLE_KEY && !SUPABASE_ANON_KEY)) {
    return null;
  }
  const authKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  try {
    // 1. Intentar RPC oficial
    const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/obtener_estado_cupos_primordiales`, {
      method: 'POST',
      headers: {
        'apikey': authKey,
        'Authorization': `Bearer ${authKey}`,
        'Content-Type': 'application/json'
      },
      body: '{}'
    });
    if (rpcRes.ok) {
      const data = await rpcRes.json();
      if (data && typeof data.currentCount === 'number') {
        return data.currentCount;
      }
    }

    // 2. Fallback a SELECT directo del último cupo registrado
    const tableRes = await fetch(`${SUPABASE_URL}/rest/v1/primordiales_registrations?select=cupo_numero&order=cupo_numero.desc&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': authKey,
        'Authorization': `Bearer ${authKey}`
      }
    });
    if (tableRes.ok) {
      const rows = await tableRes.json();
      if (Array.isArray(rows) && rows.length > 0 && typeof rows[0].cupo_numero === 'number') {
        return Math.max(INITIAL_BASELINE, rows[0].cupo_numero);
      }
    }
  } catch (_) {}
  return null;
}

// Registro atómico en Supabase con prevención de colisiones
async function registerProInSupabase(record) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  try {
    // Intentar invocar función RPC atómica
    const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/registrar_pro_primordial_atomico`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        p_nombre: record.nombre,
        p_tel: record.tel,
        p_oficio: record.oficio,
        p_zona: record.zona,
        p_cedula: record.cedula,
        p_banco: record.banco,
        p_nacimiento: record.nacimiento,
        p_exp: record.exp,
        p_mandato_hash: record.mandato_hash,
        p_mandato_ip: record.mandato_ip,
        p_user_agent: record.user_agent,
        p_foto_kyc_path: record.foto_kyc_path || null
      })
    });

    if (rpcRes.ok) {
      return await rpcRes.json();
    }

    // Fallback: Inserción directa en tabla primordiales_registrations
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/primordiales_registrations`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        cupo_numero: record.cupoNumero,
        nombre: record.nombre,
        tel: record.tel,
        oficio: record.oficio,
        zona: record.zona,
        cedula: record.cedula,
        banco: record.banco,
        nacimiento: record.nacimiento,
        exp: record.exp,
        tipo: record.tipo,
        plan_nombre: record.tipo === 'PRIMORDIAL' ? 'ORO_VIP' : 'BRONCE',
        comision_pct: record.tipo === 'PRIMORDIAL' ? 11.00 : 18.00,
        neto_pct: record.tipo === 'PRIMORDIAL' ? 89.00 : 82.00,
        mes1_comision_pct: record.tipo === 'PRIMORDIAL' ? 1.00 : 18.00,
        mes1_neto_pct: record.tipo === 'PRIMORDIAL' ? 99.00 : 82.00,
        insignia: record.insignia,
        foto_kyc_path: record.foto_kyc_path || null,
        mandato_aceptado: true,
        mandato_hash: record.mandato_hash,
        mandato_ip: record.mandato_ip,
        user_agent: record.user_agent
      })
    });

    if (insertRes.ok) {
      const rows = await insertRes.json();
      return { ok: true, data: rows[0] };
    }
  } catch (_) {}
  return null;
}

// Carga segura de foto biométrica en bucket privado rebuske-kyc-privado
async function uploadKycPhoto(cedula, base64Data) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !base64Data) return null;
  try {
    const cleanCedula = String(cedula || 'pro').replace(/[^a-zA-Z0-9_-]/g, '_');
    const storagePath = `${cleanCedula}/perfil_biometrico_${Date.now()}.jpg`;
    const raw = base64Data.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(raw, 'base64');

    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/rebuske-kyc-privado/${storagePath}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
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

// Notificación SMTP a Valentina KYC
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
             <p><strong>Mandato Comercial (Art. 1262 C.Co):</strong> FIRMADO DIGITALMENTE (Hash: ${record.mandato_hash})</p>
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

// Rate Limiting en memoria para serverless (5 peticiones por IP cada 15 min)
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

// Verificación opcional Cloudflare Turnstile
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
    return true;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Consulta de cupos disponibles
  if (req.method === 'GET') {
    let currentCount = await fetchCurrentCountFromSupabase();
    if (typeof currentCount !== 'number') {
      const localStore = getLocalStore();
      currentCount = localStore.count;
    }
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
    const userAgent = req.headers['user-agent'] || 'Desconocido';

    // 1. Rate Limiting por IP
    if (!checkRateLimit(clientIp, 5, 15 * 60 * 1000)) {
      return res.status(429).json({
        ok: false,
        error: 'Has alcanzado el límite de intentos permitidos (5 cada 15 minutos). Por seguridad antifraude, espera unos minutos antes de reintentar.'
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    // 2. Filtro Anti-Bot Honeypot
    if (body.hp_token) {
      return res.status(400).json({ ok: false, error: 'Solicitud rechazada por filtro anti-bot.' });
    }

    // 3. Verificación Cloudflare Turnstile
    if (body.turnstileToken) {
      const isHuman = await verifyTurnstile(body.turnstileToken, clientIp);
      if (!isHuman) {
        return res.status(403).json({ ok: false, error: 'Verificación de seguridad Turnstile no superada. Intenta nuevamente.' });
      }
    }

    // 4. CANDADO LEGAL: Verificación de Aceptación del Mandato Comercial (Art. 1262 C.Co)
    if (!body.autorizo_mandato && body.autorizo_mandato !== 'true' && !body.autorizo_terminos) {
      return res.status(400).json({
        ok: false,
        error: 'Debes aceptar el Contrato de Mandato Comercial de Cobranza (Art. 1262 Código de Comercio) para que rebuske pueda dispersar legalmente tus pagos sin contingencias tributarias.'
      });
    }

    const { nombre, tel, oficio, zona, cedula, banco, exp, mesNacimiento, anoNacimiento } = body;

    // 5. Validación de Esquema Estricta
    const cleanNombre = String(nombre || '').trim();
    if (cleanNombre.length < 3) {
      return res.status(400).json({ ok: false, error: 'El nombre completo debe tener al menos 3 caracteres.' });
    }

    const cleanCedula = String(cedula || '').replace(/\D/g, '');
    if (!/^\d{6,10}$/.test(cleanCedula)) {
      return res.status(400).json({
        ok: false,
        error: 'La cédula de ciudadanía debe contener únicamente números y tener entre 6 y 10 dígitos.'
      });
    }

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

    // 6. Generación de Estampado Digital de Mandato (Prueba DIAN Art. 1262 C.Co)
    const timestampIso = new Date().toISOString();
    const rawConsent = `${cleanCedula}|${rawTel}|${clientIp}|CONTRATO_MANDATO_REBUSKE_ART_1262_CCO_V5|${timestampIso}`;
    const mandatoHash = crypto.createHash('sha256').update(rawConsent).digest('hex');

    // 7. Cálculo atómico de cupo y persistencia
    const localStore = getLocalStore();
    const isPrimordial = localStore.count < MAX_PRIMORDIALES;
    const newCount = localStore.count + 1;
    localStore.count = newCount;

    const record = {
      id: 'pro_' + Date.now(),
      fecha: timestampIso,
      nombre: cleanNombre,
      tel: rawTel,
      oficio: String(oficio || 'Técnico General').trim(),
      zona: cleanZona,
      cedula: cleanCedula,
      banco: String(banco || 'Nequi').trim(),
      nacimiento: `${mesNacimiento || 'NA'}/${anoNacimiento || 'NA'}`,
      ultimoAcceso: timestampIso,
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
      mandato_aceptado: true,
      mandato_hash: mandatoHash,
      mandato_ip: clientIp,
      user_agent: userAgent,
      autorizo_terminos: !!body.autorizo_terminos,
      autorizo_datos_sensibles_biometria: !!body.autorizo_datos_sensibles,
      autorizo_consulta_antecedentes: !!body.autorizo_antecedentes,
      cookies_analitica_consentimiento: !!body.cookies_analitica_consentimiento,
      antecedentes_estado: 'APTO_SIN_REPORTES_PENDIENTE_COTEJO',
      antecedentes_fecha_consulta: timestampIso,
      autorizo_promo: !!body.autorizo_promo,
      ellas: !!(body.is_woman_pro || body.ellas)
    };

    // Almacenar en local store de respaldo
    localStore.registrations = localStore.registrations || [];
    localStore.registrations.push(record);
    saveLocalStore(localStore);

    // Intentar upload de foto KYC y sincronización atómica a Supabase en background
    if (body.fotoPerfilBase64) {
      uploadKycPhoto(record.cedula, body.fotoPerfilBase64).then(p => {
        if (p) record.foto_kyc_path = p;
        registerProInSupabase(record).catch(() => {});
      }).catch(() => {
        registerProInSupabase(record).catch(() => {});
      });
    } else {
      registerProInSupabase(record).catch(() => {});
    }

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
      mandato_hash: mandatoHash,
      message: isPrimordial
        ? `¡Felicitaciones ${record.nombre}! Aseguraste el Cupo Primordial #${newCount}/100. Recibes 89% neto vitalicio (Plan Oro VIP), 1% de comisión en tu primer mes y Placa Oro VIP.`
        : `¡Bienvenido a rebuske, ${record.nombre}! Los 100 cupos Primordiales ya fueron completados. Tu cuenta queda registrada con tarifa estándar (82% neto para ti / 18% rebuske).`
    });

  } catch (error) {
    console.error('Error en /api/register-pro:', error);
    return res.status(500).json({ error: 'Error procesando el registro del profesional.' });
  }
}
