/**
 * ============================================================================
 * REBUSKE · API REGISTRO DE CLIENTES (LISTA DE ESPERA PLAY STORE & BONO)
 * ============================================================================
 * 1. Guarda internamente en rebuske_clientes_waitlist_db.json.
 * 2. Guarda en formato Google Sheets / CSV en rebuske_clientes_waitlist.csv.
 * 3. Envía correo transaccional automático al cliente con su confirmación de Play Store.
 * 4. Notifica internamente a holarebuske@gmail.com.
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import tls from 'node:tls';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';

function sendRawSmtpMail({ fromName, to, subject, html, text }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    let buffer = '';
    let step = 0;

    const boundary = `reb_cli_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
    const encodedFromName = `=?UTF-8?B?${Buffer.from(fromName || 'Rebuske Hogares', 'utf8').toString('base64')}?=`;

    const isPlainOnly = Boolean(text && !html);
    const mimeMessage = isPlainOnly
      ? [
          `From: ${encodedFromName} <${SMTP_USER}>`,
          `To: <${to}>`,
          `Reply-To: <${SMTP_USER}>`,
          `Subject: ${encodedSubject}`,
          `MIME-Version: 1.0`,
          `Content-Type: text/plain; charset=UTF-8`,
          `Content-Transfer-Encoding: base64`,
          ``,
          Buffer.from(text, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
          ``,
          `.`
        ].join('\r\n')
      : [
          `From: ${encodedFromName} <${SMTP_USER}>`,
          `To: <${to}>`,
          `Reply-To: <${SMTP_USER}>`,
          `Subject: ${encodedSubject}`,
          `MIME-Version: 1.0`,
          `Content-Type: multipart/alternative; boundary="${boundary}"`,
          ``,
          `--${boundary}`,
          `Content-Type: text/html; charset=UTF-8`,
          `Content-Transfer-Encoding: base64`,
          ``,
          Buffer.from(html || '', 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
          ``,
          `--${boundary}--`,
          `.`
        ].join('\r\n');

    const sendCmd = (cmd) => socket.write(cmd + '\r\n');

    const timeout = setTimeout(() => {
      socket.destroy();
      reject(new Error('SMTP timeout'));
    }, 15000);

    socket.on('data', (chunk) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split('\r\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line || line.length < 3) continue;
        if (line[3] === '-') continue;
        const code = parseInt(line.slice(0, 3), 10);

        if (code >= 400) {
          clearTimeout(timeout);
          socket.end();
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
          sendCmd(mimeMessage);
        } else if (step === 6 && code === 250) {
          step = 7;
          sendCmd('QUIT');
          clearTimeout(timeout);
          socket.end();
          return resolve({ ok: true, to, subject });
        }
      }
    });

    socket.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

// Rate Limiting en memoria (5 registros por IP cada 15 min)
const cliRateLimitMap = new Map();
function checkClientRateLimit(ip, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const record = cliRateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + windowMs;
  }
  record.count += 1;
  cliRateLimitMap.set(ip, record);
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
    return true;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Endpoint GET para descargar / exportar a Sheets o CSV
  if (req.method === 'GET') {
    const baseDir = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
    const csvPath = path.join(baseDir, 'rebuske_clientes_waitlist.csv');
    if (fs.existsSync(csvPath)) {
      const csvData = fs.readFileSync(csvPath, 'utf8');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="rebuske_clientes_waitlist.csv"');
      return res.status(200).send(csvData);
    }
    return res.status(200).json({ ok: true, total: 0, message: 'Aún no hay clientes registrados' });
  }

  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Use POST' });

  try {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1').split(',')[0].trim();

    // 1. Rate Limiting por IP (Máx 5 peticiones cada 15 min)
    if (!checkClientRateLimit(clientIp, 5, 15 * 60 * 1000)) {
      return res.status(429).json({
        ok: false,
        error: 'Has alcanzado el límite de intentos permitidos (5 cada 15 min). Por seguridad, espera unos minutos.'
      });
    }

    const baseDir = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    // 2. Filtro Honeypot Anti-Bot
    if (body.hp_token) {
      return res.status(400).json({ ok: false, error: 'Acceso no permitido por filtro anti-bot.' });
    }

    // 3. Verificación Cloudflare Turnstile
    if (body.turnstileToken) {
      const isHuman = await verifyTurnstile(body.turnstileToken, clientIp);
      if (!isHuman) {
        return res.status(403).json({ ok: false, error: 'Verificación de seguridad Turnstile no superada.' });
      }
    }

    const cleanNombre = String(body.nombre || '').trim();
    if (cleanNombre.length < 3) {
      return res.status(400).json({ ok: false, error: 'El nombre completo debe tener al menos 3 caracteres.' });
    }

    const email = String(body.email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ ok: false, error: 'Ingresa un correo electrónico válido (ej: usuario@gmail.com).' });
    }

    // Normalización y Validación E.164 Móvil Colombia (+57 3XX...)
    let rawTel = String(body.whatsapp || body.tel || '').replace(/[\s\-\(\)]/g, '');
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
        error: 'El celular debe ser una línea móvil de Colombia válida (+57 3XX XXX XXXX de 10 dígitos).'
      });
    }

    const comuna = String(body.comuna || 'Medellín').trim();
    const servicio = body.servicio || body.interes || 'Servicios Generales';
    const mesNacimiento = body.mesNacimiento || 'No indicado';
    const anoNacimiento = body.anoNacimiento || 'No indicado';

    const record = {
      id: 'cli_' + Date.now(),
      fecha: new Date().toISOString(),
      nombre: cleanNombre,
      email,
      whatsapp: rawTel,
      comuna,
      servicio,
      nacimiento: `${mesNacimiento}/${anoNacimiento}`,
      bonoCOP: 15000,
      cuponAsignado: 'TUBONO15K-VIP',
      fotoPerfil: body.fotoPerfil ? 'avatar_registrado' : 'sin_foto',
      autorizo_terminos: !!body.autorizo_terminos,
      autorizo_datos_sensibles_biometria: !!body.autorizo_datos_sensibles,
      autorizo_promo: !!body.autorizo_promo,
      cookies_analitica_consentimiento: !!body.cookies_analitica_consentimiento,
      registro_biometrico_status: 'PENDIENTE_APP_PLAYSTORE',
      estado: 'LISTA_PLAYSTORE_ACTIVA',
      ultimoAcceso: new Date().toISOString()
    };

    // 1. Guardar internamente en JSON (con soporte /tmp para entornos Serverless como Vercel)
    let db = { count: 0, clientes: [] };
    const candidates = [
      path.join(baseDir, 'rebuske_clientes_waitlist_db.json'),
      path.join('/tmp', 'rebuske_clientes_waitlist_db.json')
    ];

    for (const p of candidates) {
      if (fs.existsSync(p)) {
        try { db = JSON.parse(fs.readFileSync(p, 'utf8')); break; } catch (_) {}
      }
    }
    db.clientes = db.clientes || [];
    db.clientes.push(record);
    db.count = Math.max(db.clientes.length, 1);

    for (const p of candidates) {
      try {
        fs.writeFileSync(p, JSON.stringify(db, null, 2), 'utf8');
      } catch (_) {}
    }

    // 2. Guardar en formato Google Sheets / CSV con UTF-8 BOM
    const csvCandidates = [
      path.join(baseDir, 'rebuske_clientes_waitlist.csv'),
      path.join('/tmp', 'rebuske_clientes_waitlist.csv')
    ];
    const header = 'ID,Fecha,Nombre,Email,WhatsApp,Comuna,ServicioInteres,BonoCOP,Estado\n';
    const csvRow = `"${record.id}","${record.fecha}","${record.nombre.replace(/"/g, '""')}","${record.email}","${record.whatsapp}","${record.comuna}","${record.servicio}",15000,"${record.estado}"\n`;

    for (const p of csvCandidates) {
      try {
        if (!fs.existsSync(p)) {
          fs.writeFileSync(p, '\uFEFF' + header + csvRow, 'utf8');
        } else {
          fs.appendFileSync(p, csvRow, 'utf8');
        }
      } catch (_) {}
    }

    // 3. Sincronizar en segundo plano a Supabase si está disponible
    const sbUrl = process.env.SUPABASE_URL || 'https://vqvwcbirzezihfzaeziq.supabase.co';
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (sbUrl && sbKey) {
      fetch(`${sbUrl}/rest/v1/client_waitlist`, {
        method: 'POST',
        headers: {
          'apikey': sbKey,
          'Authorization': `Bearer ${sbKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          full_name: nombre,
          email,
          phone: whatsapp,
          zone: comuna,
          service_interest: servicio,
          voucher_code: 'HOGAR15K-VIP',
          created_at: new Date().toISOString()
        })
      }).catch(() => {});
    }

    // 3. Enviar correo de bienvenida al cliente confirmando el enlace de Play Store y su Bono
    const emailHtmlCliente = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px 12px;background:#0C120A;font-family:'Plus Jakarta Sans',sans-serif;color:#F4FBF1;">
  <div style="max-width:560px;margin:0 auto;background:#162413;border:1px solid #24391E;border-radius:18px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);">
    <div style="background:linear-gradient(135deg,#1B2917,#0A1008);padding:24px;border-bottom:2px solid #B8FF3B;text-align:center;">
      <span style="display:inline-block;padding:4px 12px;border-radius:99px;background:rgba(184,255,59,0.15);border:1px solid rgba(184,255,59,0.4);color:#B8FF3B;font-size:11px;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;">
        LISTA VIP GOOGLE PLAY STORE
      </span>
      <h1 style="margin:12px 0 4px;font-size:22px;color:#FFF;font-weight:800;">¡Hola, ${nombre.split(' ')[0]}!</h1>
      <p style="margin:0;font-size:13.5px;color:#97A890;">Tu cupo prioritario y bono de bienvenida están reservados.</p>
    </div>

    <div style="padding:24px;">
      <p style="font-size:13.5px;color:#D4E5CC;line-height:1.6;margin-top:0;">
        Gracias por unirte a la lista de hogares de <strong>${comuna}</strong> que transformarán la manera de solucionar daños en casa con <strong>Pago Protegido Wompi</strong> y técnicos verificados.
      </p>

      <div style="background:#0C120A;border:1px dashed #B8FF3B;border-radius:12px;padding:16px;text-align:center;margin:18px 0;">
        <span style="font-size:11px;color:#97A890;text-transform:uppercase;letter-spacing:0.8px;display:block;">Tu Código de Bono de Bienvenida:</span>
        <strong style="font-size:22px;color:#B8FF3B;letter-spacing:2px;font-family:monospace;display:block;margin:6px 0;">HOGAR15K-VIP</strong>
        <small style="color:#A7F3D0;font-size:11.5px;display:block;margin-top:4px;">
          ✓ Válido por <strong>$15.000 COP</strong> de descuento en tu primer arreglo (servicios desde $90.000 COP).<br/>
          ✓ Rebuske subsidia al 100% nuestra comisión (0%) para garantizar el pago neto completo del técnico.
        </small>
      </div>

      <div style="background:#121A0E;border:1px solid #24391E;border-radius:12px;padding:14px;margin-bottom:20px;font-size:12px;color:#CBD5E1;line-height:1.5;">
        <strong style="color:#FFF;display:block;margin-bottom:6px;">📲 ¿Qué sigue ahora?</strong>
        1. Estamos ultimando los últimos detalles en <strong>Google Play Store</strong>.<br/>
        2. Apenas se active el enlace público para Medellín, recibirás un correo prioritario con el link directo de descarga.<br/>
        3. Mientras tanto, ya puedes probar nuestra Web App oficial directamente en el navegador.
      </div>

      <div style="text-align:center;margin-top:20px;">
        <a href="https://rebuske.vercel.app" style="display:inline-block;padding:12px 28px;background:#B8FF3B;color:#0C120A;font-weight:800;border-radius:10px;text-decoration:none;font-size:13px;">
          Abrir Web App Rebuske →
        </a>
      </div>
    </div>

    <div style="text-align:center;padding:16px;font-size:11px;color:#6B7280;border-top:1px solid #24391E;background:#0C120A;">
      Rebuske Medellín · Soporte WhatsApp Oficial: +57 304 381 2882<br/>
      Pago Protegido Bóveda Wompi Bancolombia · Garantía de 2 Días
    </div>
  </div>
</body>
</html>`;

    // Enviar correo de bienvenida al cliente
    sendRawSmtpMail({
      fromName: 'Rebuske Hogares Medellín',
      to: email,
      subject: `🎉 ¡Bienvenido a la Lista VIP Rebuske Hogares! Tu acceso a Google Play Store + Bono $15.000 COP`,
      html: emailHtmlCliente
    }).catch(err => console.error('Error enviando al cliente:', err));

    // Notificar al equipo interno en holarebuske@gmail.com
    sendRawSmtpMail({
      fromName: 'Rebuske Waitlist Bot',
      to: SMTP_USER,
      subject: `🏠 [NUEVO CLIENTE VIP] ${nombre} (${comuna} · ${servicio})`,
      html: `<h2>Nuevo Registro en Lista de Espera Play Store (Cliente #${db.count})</h2>
             <p><strong>Nombre:</strong> ${nombre}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>WhatsApp:</strong> ${whatsapp}</p>
             <p><strong>Comuna:</strong> ${comuna}</p>
             <p><strong>Servicio de interés:</strong> ${servicio}</p>
             <p><strong>Guardado en:</strong> rebuske_clientes_waitlist_db.json & rebuske_clientes_waitlist.csv</p>`
    }).catch(() => {});

    return res.status(200).json({
      ok: true,
      cupoNumero: db.count,
      message: `¡Felicitaciones ${nombre.split(' ')[0]}! Te hemos agregado a la lista VIP (#${db.count}) y enviado tu bono a ${email}.`
    });

  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
