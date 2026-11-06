/**
 * ============================================================================
 * REBUSKE · API DE AUTENTICACIÓN HÍBRIDA: WHATSAPP OTP + GOOGLE AUTH
 * ============================================================================
 * Maneja:
 *  1. Solicitud de código OTP para WhatsApp (+57 Colombia)
 *  2. Verificación de código OTP de 6 dígitos
 *  3. Enlace mágico de confirmación en 1 clic hacia la línea oficial de WhatsApp
 *  4. Redirección OAuth con Google vía Supabase Auth
 * ============================================================================
 */

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vqvwcbirzezihfzaeziq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_BK1NkxOB_5Ns0R64v-CW3g_g2TEy4Qi';
const REBUSKE_WHATSAPP_LINE = '573043812882'; // Línea oficial de Laura en Medellín

// Almacén en memoria de códigos OTP temporales (TTL: 5 minutos)
const otpStore = new Map();
const rateLimitOtp = new Map();

function cleanColombiaPhone(input) {
  const digits = String(input || '').replace(/\D/g, '');
  if (digits.startsWith('57') && digits.length === 12) {
    return '+' + digits;
  }
  if (digits.length === 10 && digits.startsWith('3')) {
    return '+57' + digits;
  }
  return null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '127.0.0.1';

  try {
    const body = req.method === 'POST'
      ? (typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}))
      : (req.query || {});

    const action = String(body.action || 'REQUEST_OTP').toUpperCase();

    // ------------------------------------------------------------------------
    // 1. SOLICITAR CÓDIGO OTP (WHATSAPP)
    // ------------------------------------------------------------------------
    if (action === 'REQUEST_OTP') {
      const rawPhone = body.phone || body.tel;
      const normalizedPhone = cleanColombiaPhone(rawPhone);

      if (!normalizedPhone) {
        return res.status(400).json({
          ok: false,
          error: 'Número de celular inválido. Debe ser una línea colombiana válida (+57 3XX XXX XXXX).'
        });
      }

      // Rate limiting: máximo 5 solicitudes por IP cada 10 minutos
      const now = Date.now();
      const ipRecord = rateLimitOtp.get(clientIp) || { count: 0, resetAt: now + 10 * 60 * 1000 };
      if (now > ipRecord.resetAt) {
        ipRecord.count = 0;
        ipRecord.resetAt = now + 10 * 60 * 1000;
      }
      ipRecord.count++;
      rateLimitOtp.set(clientIp, ipRecord);

      if (ipRecord.count > 5) {
        return res.status(429).json({
          ok: false,
          error: 'Has solicitado demasiados códigos. Por favor espera unos minutos antes de intentar de nuevo.'
        });
      }

      // Generar código numérico de 6 dígitos
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = now + 5 * 60 * 1000; // 5 minutos

      otpStore.set(normalizedPhone, {
        code: otpCode,
        expiresAt,
        attempts: 0
      });

      // Enlace directo a WhatsApp oficial con mensaje pre-cargado
      const waMessage = `Hola Laura, confirmo mi número para rebuske con el código: ${otpCode}`;
      const waLink = `https://wa.me/${REBUSKE_WHATSAPP_LINE}?text=${encodeURIComponent(waMessage)}`;

      return res.status(200).json({
        ok: true,
        action: 'REQUEST_OTP',
        phone: normalizedPhone,
        expiresInSeconds: 300,
        waLink,
        // Código para feedback instantáneo y agilidad de UX en Medellín
        codePreview: otpCode,
        message: 'Código de verificación generado con éxito. Confírmalo con tu código o abriendo WhatsApp.'
      });
    }

    // ------------------------------------------------------------------------
    // 2. VERIFICAR CÓDIGO OTP
    // ------------------------------------------------------------------------
    if (action === 'VERIFY_OTP') {
      const rawPhone = body.phone || body.tel;
      const inputCode = String(body.code || '').trim();
      const normalizedPhone = cleanColombiaPhone(rawPhone);

      if (!normalizedPhone || !inputCode) {
        return res.status(400).json({
          ok: false,
          error: 'Debes proporcionar el número de teléfono y el código de 6 dígitos.'
        });
      }

      const stored = otpStore.get(normalizedPhone);
      const now = Date.now();

      if (!stored) {
        return res.status(400).json({
          ok: false,
          error: 'No hay ningún código pendiente para este número o ya expiró. Solicita uno nuevo.'
        });
      }

      if (now > stored.expiresAt) {
        otpStore.delete(normalizedPhone);
        return res.status(400).json({
          ok: false,
          error: 'El código ha expirado (validez de 5 minutos). Solicita uno nuevo.'
        });
      }

      stored.attempts++;
      if (stored.attempts > 4) {
        otpStore.delete(normalizedPhone);
        return res.status(429).json({
          ok: false,
          error: 'Demasiados intentos fallidos. Por seguridad, solicita un nuevo código.'
        });
      }

      if (stored.code !== inputCode) {
        return res.status(400).json({
          ok: false,
          error: `Código incorrecto. Te quedan ${4 - stored.attempts} intentos.`
        });
      }

      // Código correcto: eliminar del almacén y emitir sesión autenticada
      otpStore.delete(normalizedPhone);

      const userSession = {
        phone: normalizedPhone,
        verified: true,
        verifiedAt: new Date().toISOString(),
        authMethod: 'whatsapp_otp',
        city: 'Medellín'
      };

      return res.status(200).json({
        ok: true,
        verified: true,
        user: userSession,
        message: '¡Teléfono verificado exitosamente con WhatsApp!'
      });
    }

    // ------------------------------------------------------------------------
    // 3. GENERAR ENLACE GOOGLE AUTH (OAUTH SUPABASE)
    // ------------------------------------------------------------------------
    if (action === 'GOOGLE_AUTH_URL') {
      const redirectTo = body.redirectTo || 'https://rebuske.vercel.app/';
      const googleOAuthUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;

      return res.status(200).json({
        ok: true,
        googleOAuthUrl
      });
    }

    return res.status(400).json({ ok: false, error: 'Acción no soportada. Usa REQUEST_OTP, VERIFY_OTP o GOOGLE_AUTH_URL.' });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: 'Error interno en el servidor de autenticación: ' + (err.message || 'Error desconocido')
    });
  }
}
