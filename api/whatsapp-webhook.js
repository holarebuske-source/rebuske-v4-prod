/**
 * ============================================================================
 * REBUSKE · WEBHOOK OFICIAL DE WHATSAPP CLOUD API + GEMINI 1.5 FLASH
 * ============================================================================
 * Agente: Laura (Soporte al Usuario & Coordinación de Servicios en Medellín)
 * Soporta:
 *  1. Handshake de verificación de Meta (GET /api/whatsapp-webhook)
 *  2. Mensajes entrantes de Texto (POST)
 *  3. Notas de voz y Audios (POST) procesados por Gemini 1.5 Flash (transcripción + respuesta)
 *  4. Despacho de respuesta por WhatsApp Cloud API
 *  5. Envío de copia operativa en tiempo real a holarebuske@gmail.com
 * ============================================================================
 */

import tls from 'node:tls';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'rebuske_laura_2026';
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || process.env.META_ACCESS_TOKEN || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// System prompt oficial de Laura
const LAURA_SYSTEM_PROMPT = `Eres Laura, la asistente virtual oficial con Inteligencia Artificial de rebuske en Medellín, Colombia (WhatsApp Oficial +57 304 381 2882). Eres 100% honesta y transparente sobre tu naturaleza automatizada.

SLOGAN OFICIAL:
"Arregla · Confía · Repite" · Servicios Especializados en Medellín con Bóveda Wompi (pago protegido) y 48h de garantía.

PERSONALIDAD & TONO:
- Eres paisa, cálida, amable, muy respetuosa y resolutiva ("¡Hola vecino/vecina!", "Con el mayor de los gustos", "Tranquilo que aquí te resolvemos").
- Respuestas claras, concisas (máximo 2 a 3 párrafos cortos) y orientadas a la acción. No uses jerga robótica.

ESCALAMIENTO HUMANO OBLIGATORIO:
- Si el usuario escribe "HUMANO", "ASESOR", "PERSONA", "HABLAR CON ALGUIEN" o solicita atención de una persona de carne y hueso, respóndele de inmediato:
  "¡Entendido! Te estoy transfiriendo de inmediato con nuestro equipo humano de operaciones en Medellín. Un asesor tomará este chat en menos de 10 minutos (horario hábil 7:00 am - 8:00 pm). Mientras tanto, si gustas puedes detallarme tu dirección o el daño para que el asesor llegue con la solución lista."

CONOCIMIENTO CLAVE DE REBUSKE QUE DEBES MANEJAR:
1. BONO DE BIENVENIDA $15.000 COP (Código: HOGAR15K-VIP):
   - Aplica en servicios desde $80.000 COP en adelante. 1 bono por cliente nuevo.
   - En rebuske protegemos el valor de la mano de obra del técnico.
2. PAGO PROTEGIDO WOMPI BANCOLOMBIA:
   - Jamás se entrega dinero en efectivo ni anticipos por fuera de la plataforma. La plata queda en custodia en Bóveda Wompi y solo se libera cuando el cliente verifica que el arreglo quedó bien.
   - Garantía legal de 48 horas (2 días) por escrito incluida en todo trabajo (Ley 1480).
3. VISITA DIAGNÓSTICA EN SITIO ($35.000 COP):
   - 100% abonable al valor total del trabajo si el cliente aprueba la reparación.
   - Si decide no reparar, cubre los viáticos y peritaje del profesional en moto.
4. MODO EXPRESS (<35 MINUTOS):
   - Para emergencias graves de cerrajería o fugas de agua críticas, con llegada prioritaria en moto en el Valle de Aburrá.
5. TARIFAS DE REFERENCIA ("DESDE") EN MEDELLÍN:
   - Plomería (desde $60k), Electricidad (desde $50k), Cerrajería (desde $60k), Aseo (desde $70k).
   - Tarifario público visible en: https://rebuske.vercel.app/tarifas
6. REGISTRO DE TÉCNICOS:
   - Los profesionales se pueden registrar en: https://rebuske.vercel.app/registro

Si el usuario envía una nota de voz con un daño en su casa o vehículo, identifícale amablemente el problema, indícale el rango de precio de referencia y dale el enlace para solicitar al técnico de inmediato.`;

// Motor inteligente de respuesta de Laura
export async function procesarMensajeConLaura({ mensajeTexto = '', audioBuffer = null, audioMime = 'audio/ogg', remitente = '' }) {
  // 1. Si hay GEMINI_API_KEY, usar Gemini 1.5 Flash multimodal
  if (GEMINI_API_KEY) {
    try {
      const parts = [];
      if (audioBuffer) {
        parts.push({
          inlineData: {
            mimeType: audioMime,
            data: audioBuffer.toString('base64')
          }
        });
        parts.push({ text: 'Escucha este audio del usuario en Medellín y respóndele como Laura con tu tono oficial.' });
      } else {
        parts.push({ text: mensajeTexto || 'Hola Laura' });
      }

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: LAURA_SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts }],
          generationConfig: { temperature: 0.65, maxOutputTokens: 350 }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiReply && geminiReply.trim()) {
          return geminiReply.trim();
        }
      }
    } catch (e) {
      console.warn('[Laura-Gemini] Error llamando API de Gemini, aplicando fallback heurístico:', e.message);
    }
  }

  // 2. Motor Heurístico Experto de Laura (Garantía de respuesta 100% disponible)
  const lower = mensajeTexto.toLowerCase();

  if (lower.includes('bono') || lower.includes('15') || lower.includes('descuento') || lower.includes('cupón') || lower.includes('cupon') || lower.includes('código')) {
    return `¡Hola vecino! 💚 Claro que sí, tu Bono de Bienvenida es **HOGAR15K-VIP** por valor de **$15.000 COP**.\n\nAplica en cualquier servicio desde $90.000 COP en adelante. En Rebuske exoneramos al 0% nuestra comisión de plataforma para que tú recibas el descuento completo y el técnico reciba su pago pactado sin recortes.\n\nPuedes registrarte para activarlo aquí: https://rebuske.vercel.app/clientes`;
  }

  if (lower.includes('urgencia') || lower.includes('emergencia') || lower.includes('luz express') || lower.includes('fuga') || lower.includes('cerradura') || lower.includes('llave') || lower.includes('encerrado')) {
    return `¡Hola! Si tienes una urgencia crítica en Medellín, activa de inmediato nuestro **Modo Luz Express** con llegada garantizada en menos de 35 minutos en moto para cerrajería o fugas de agua graves 🚨.\n\nToca aquí para solicitarlo ya mismo: https://rebuske.vercel.app`;
  }

  if (lower.includes('vehiculo') || lower.includes('vehículo') || lower.includes('carro') || lower.includes('moto') || lower.includes('aceite') || lower.includes('despinche') || lower.includes('bateria') || lower.includes('batería') || lower.includes('lavado')) {
    return `¡Hola vecino! En Rebuske tenemos técnicos automotrices y de motos verificados en Medellín 🚗🛵:\n\n• Lavado y detailing a domicilio: $30.000 – $80.000 COP\n• Mecánica rápida y cambio de aceite: $60.000 – $160.000 COP\n• Despinchado y auxilio de batería: $35.000 – $90.000 COP\n\nTu pago queda en custodia de Bóveda Wompi hasta que confirmes que quedó perfecto. Pídelo aquí: https://rebuske.vercel.app`;
  }

  if (lower.includes('plomero') || lower.includes('plomería') || lower.includes('tubo') || lower.includes('grifo') || lower.includes('agua') || lower.includes('destape')) {
    return `¡Con mucho gusto te ayudo! Contamos con maestros plomeros certificados en todas las comunas de Medellín (Laureles, Belén, Poblado, Envigado, etc.) 🔧.\n\nTarifa de referencia: $70.000 – $160.000 COP (detección de fugas, destapes con sonda y grifería). Tu plata no se le entrega al técnico hasta que verifiques que no gotea.\n\nIngresa aquí: https://rebuske.vercel.app`;
  }

  if (lower.includes('play store') || lower.includes('descargar') || lower.includes('app') || lower.includes('aplicacion') || lower.includes('aplicación') || lower.includes('instalar')) {
    return `¡Qué alegría que quieras la app! 📲 Estamos ultimando el prelanzamiento oficial en Google Play Store para Medellín.\n\nAsegura tu cupo prioritario y tu bono de $15.000 COP registrándote en: https://rebuske.vercel.app/clientes\n\n¡Apenas esté publicada te llegará el link directo de descarga a tu correo!`;
  }

  return `¡Hola! Soy Laura de Rebuske Medellín 🌸.\n\nEstoy aquí para ayudarte a solucionar cualquier arreglo en tu hogar o vehículo con técnicos verificados, garantía de 2 días y Pago Protegido por Bancolombia Wompi.\n\nCuéntame qué daño tienes o entra directamente a nuestra Web App: https://rebuske.vercel.app`;
}

// Envío de mensaje vía WhatsApp Cloud API (Graph API)
async function enviarMensajeWhatsApp({ to, text, phoneNumberId }) {
  if (!WHATSAPP_TOKEN || !phoneNumberId) {
    console.warn('[Laura-WhatsApp] WHATSAPP_TOKEN o PHONE_NUMBER_ID no configurados. Respuesta lista para enviar:', text);
    return { ok: false, reason: 'NO_WHATSAPP_CREDENTIALS' };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { body: text }
      })
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error('[Laura-WhatsApp] Error enviando a Meta Graph API:', err.message);
    return { ok: false, error: err.message };
  }
}

// Descargar audio desde Meta Graph API
async function descargarAudioMeta(mediaId) {
  if (!WHATSAPP_TOKEN || !mediaId) return null;
  try {
    const urlRes = await fetch(`https://graph.facebook.com/v20.0/${mediaId}`, {
      headers: { 'Authorization': `Bearer ${WHATSAPP_TOKEN}` }
    });
    if (!urlRes.ok) return null;
    const mediaMeta = await urlRes.json();
    if (!mediaMeta.url) return null;

    const fileRes = await fetch(mediaMeta.url, {
      headers: { 'Authorization': `Bearer ${WHATSAPP_TOKEN}` }
    });
    if (!fileRes.ok) return null;
    const arrayBuffer = await fileRes.arrayBuffer();
    return {
      buffer: Buffer.from(arrayBuffer),
      mimeType: mediaMeta.mime_type || 'audio/ogg'
    };
  } catch (e) {
    console.error('[Laura-Audio] Error descargando audio de Meta:', e.message);
    return null;
  }
}

// Notificación interna a holarebuske@gmail.com
function notificarAuditoriaInterna({ remitente, entrante, respuesta, tipo }) {
  try {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    const subject = `=?UTF-8?B?${Buffer.from(`💬 [WHATSAPP LAURA] Nuevo mensaje de ${remitente} (${tipo})`, 'utf8').toString('base64')}?=`;
    const mime = [
      `From: Laura Soporte Rebuske <${SMTP_USER}>`,
      `To: <${SMTP_USER}>`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: base64`,
      ``,
      Buffer.from(`
        <div style="font-family:sans-serif;padding:16px;background:#0C120A;color:#F4FBF1;border-radius:12px;">
          <h2 style="color:#B8FF3B;margin-top:0;">Registro de Conversación WhatsApp · Laura</h2>
          <p><strong>Remitente:</strong> ${remitente}</p>
          <p><strong>Tipo:</strong> ${tipo}</p>
          <div style="background:#162413;border:1px solid #24391E;padding:12px;border-radius:8px;margin:12px 0;">
            <b style="color:#FFF;">Mensaje del Cliente:</b>
            <p style="color:#CBD5E1;margin:4px 0 0;">${entrante || '(Audio / Nota de voz recibida)'}</p>
          </div>
          <div style="background:#121A0E;border:1px solid #B8FF3B;padding:12px;border-radius:8px;">
            <b style="color:#B8FF3B;">Respuesta de Laura (Gemini):</b>
            <p style="color:#FFF;white-space:pre-line;margin:4px 0 0;">${respuesta}</p>
          </div>
        </div>
      `, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
      ``,
      `.`
    ].join('\r\n');

    let step = 0;
    socket.on('data', (d) => {
      const msg = d.toString();
      if (step === 0 && msg.startsWith('220')) { socket.write('EHLO localhost\r\n'); step = 1; }
      else if (step === 1 && msg.startsWith('250')) { socket.write('AUTH LOGIN\r\n'); step = 2; }
      else if (step === 2 && msg.startsWith('334')) { socket.write(Buffer.from(SMTP_USER).toString('base64') + '\r\n'); step = 3; }
      else if (step === 3 && msg.startsWith('334')) { socket.write(Buffer.from(SMTP_PASS).toString('base64') + '\r\n'); step = 4; }
      else if (step === 4 && msg.startsWith('235')) { socket.write(`MAIL FROM:<${SMTP_USER}>\r\n`); step = 5; }
      else if (step === 5 && msg.startsWith('250')) { socket.write(`RCPT TO:<${SMTP_USER}>\r\n`); step = 6; }
      else if (step === 6 && msg.startsWith('250')) { socket.write('DATA\r\n'); step = 7; }
      else if (step === 7 && msg.startsWith('354')) { socket.write(mime + '\r\n'); step = 8; }
      else if (step === 8 && msg.startsWith('250')) { socket.write('QUIT\r\n'); socket.end(); }
    });
    socket.on('error', () => {});
  } catch (_) {}
}

// Handler HTTP principal (Vercel Serverless / Node HTTP)
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 1. VERIFICACIÓN DE WEBHOOK (GET - Meta Handshake o Vista Directa en Navegador)
  if (req.method === 'GET') {
    const urlObj = new URL(req.url, 'http://localhost');
    const mode = req.query?.['hub.mode'] || urlObj.searchParams.get('hub.mode');
    const token = req.query?.['hub.verify_token'] || urlObj.searchParams.get('hub.verify_token');
    const challenge = req.query?.['hub.challenge'] || urlObj.searchParams.get('hub.challenge');

    // 1.1 Handshake oficial de Meta / WhatsApp Cloud API
    if (mode === 'subscribe') {
      if (token === WHATSAPP_VERIFY_TOKEN) {
        console.log('[Laura-Webhook] Handshake de Meta verificado con éxito.');
        return res.status(200).send(challenge);
      }
      return res.status(403).json({ error: 'Token de verificación de WhatsApp inválido' });
    }

    // 1.2 Si se abre directamente en el navegador (Canashi o testers)
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rebuske · Webhook WhatsApp Laura (Gemini 1.5 Flash)</title>
  <style>
    body { margin:0; padding:24px; background:#0C120A; color:#F4FBF1; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; display:flex; justify-content:center; align-items:center; min-height:90vh; }
    .card { max-width:580px; width:100%; background:#162413; border:1px solid #24391E; border-radius:20px; padding:28px; box-shadow:0 20px 50px rgba(0,0,0,0.6); }
    .badge { display:inline-flex; align-items:center; gap:6px; padding:4px 12px; border-radius:99px; background:rgba(184,255,59,0.15); border:1px solid #B8FF3B; color:#B8FF3B; font-size:12px; font-weight:800; text-transform:uppercase; }
    h1 { font-size:22px; margin:16px 0 6px; color:#FFF; }
    p { font-size:13px; color:#97A890; line-height:1.6; margin:0 0 18px; }
    .info-box { background:#0C120A; border:1px solid #24391E; border-radius:14px; padding:16px; margin-bottom:18px; font-size:12.5px; }
    .row { display:flex; justify-content:space-between; margin-bottom:8px; border-bottom:1px dashed rgba(255,255,255,0.08); padding-bottom:6px; }
    .row:last-child { margin-bottom:0; border-bottom:none; padding-bottom:0; }
    .label { color:#97A890; }
    .val { color:#FFF; font-weight:700; }
    .val.green { color:#B8FF3B; }
    .sim-box { background:#121A0E; border:1px solid #B8FF3B; border-radius:14px; padding:16px; margin-top:20px; }
    input { width:100%; padding:10px 14px; border-radius:10px; background:#0C120A; border:1px solid #24391E; color:#FFF; font-size:13px; box-sizing:border-box; outline:none; margin-bottom:10px; }
    input:focus { border-color:#B8FF3B; }
    button { width:100%; padding:12px; border-radius:10px; background:#B8FF3B; color:#0C120A; font-weight:900; font-size:13px; border:none; cursor:pointer; }
    .reply-area { margin-top:12px; padding:12px; border-radius:10px; background:#0C120A; border:1px solid #24391E; font-size:12.5px; color:#D4E5CC; white-space:pre-line; display:none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <span style="width:8px;height:8px;border-radius:50%;background:#B8FF3B;box-shadow:0 0 10px #B8FF3B;"></span>
      Webhook Oficial Activo · 200 OK
    </div>
    <h1>💬 Laura · Soporte WhatsApp Rebuske</h1>
    <p>Este endpoint es el webhook oficial para Meta / WhatsApp Cloud API y el motor multimodal de <strong>Gemini 1.5 Flash</strong> (texto y notas de voz).</p>

    <div class="info-box">
      <div class="row"><span class="label">Agente Oficial:</span><span class="val">Laura (Soporte & Coordinación)</span></div>
      <div class="row"><span class="label">Línea WhatsApp:</span><span class="val green">+57 304 381 2882</span></div>
      <div class="row"><span class="label">Callback URL Meta:</span><span class="val" style="font-family:monospace;font-size:11px;">https://rebuske.vercel.app/api/whatsapp-webhook</span></div>
      <div class="row"><span class="label">Verify Token Meta:</span><span class="val green" style="font-family:monospace;">rebuske_laura_2026</span></div>
      <div class="row"><span class="label">Motor de Inteligencia:</span><span class="val">Gemini 1.5 Flash + Heurística Paisa</span></div>
      <div class="row"><span class="label">Bono de Bienvenida:</span><span class="val green">HOGAR15K-VIP (-$15.000 COP)</span></div>
    </div>

    <!-- PROBADOR EN VIVO DE LAURA -->
    <div class="sim-box">
      <b style="color:#B8FF3B;display:block;font-size:13px;margin-bottom:8px;">⚡ Probar a Laura en Vivo (Sin WhatsApp):</b>
      <input type="text" id="testMsg" placeholder="Escribe aquí: Ej. ¿Cómo funciona el bono de 15.000?" value="Hola Laura, ¿cómo funciona el bono de 15.000?">
      <button onclick="testLaura()">Enviar mensaje de prueba a Laura</button>
      <div id="replyArea" class="reply-area"></div>
    </div>

    <div style="text-align:center;margin-top:20px;">
      <a href="https://rebuske.vercel.app" style="color:#97A890;font-size:12px;text-decoration:none;">← Volver a la Web App Rebuske</a>
    </div>
  </div>

  <script>
    async function testLaura() {
      const q = document.getElementById('testMsg').value.trim();
      const reply = document.getElementById('replyArea');
      if (!q) return;
      reply.style.display = 'block';
      reply.textContent = '💬 Laura está pensando...';
      try {
        const res = await fetch('/api/whatsapp-webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ testDirectMessage: q })
        });
        const data = await res.json();
        reply.textContent = '💬 LAURA RESPONDE:\\n\\n' + (data.lauraReply || 'Sin respuesta');
      } catch (e) {
        reply.textContent = 'Error: ' + e.message;
      }
    }
  </script>
</body>
</html>
    `);
  }

  // 2. MENSAJES ENTRANTES (POST)
  if (req.method === 'POST') {
    try {
      const body = req.body || {};

      // Si es una prueba directa desde API / frontend
      if (body.testDirectMessage) {
        const reply = await procesarMensajeConLaura({ mensajeTexto: body.testDirectMessage });
        return res.status(200).json({ ok: true, lauraReply: reply });
      }

      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];
      const metadata = value?.metadata;
      const phoneNumberId = metadata?.phone_number_id || process.env.WHATSAPP_PHONE_NUMBER_ID || '';

      if (!message) {
        // Meta envía notificaciones de entrega/lectura que no contienen mensaje
        return res.status(200).json({ status: 'EVENT_RECEIVED_NO_MESSAGE' });
      }

      const fromNumber = message.from;
      let textInput = '';
      let audioBuffer = null;
      let audioMime = 'audio/ogg';
      let messageType = message.type;

      if (message.type === 'text') {
        textInput = message.text?.body || '';
      } else if (message.type === 'audio' || message.type === 'voice') {
        const mediaId = message.audio?.id || message.voice?.id;
        const downloaded = await descargarAudioMeta(mediaId);
        if (downloaded) {
          audioBuffer = downloaded.buffer;
          audioMime = downloaded.mimeType;
        }
      }

      // Procesar respuesta con Laura y Gemini 1.5 Flash
      const lauraReply = await procesarMensajeConLaura({
        mensajeTexto: textInput,
        audioBuffer,
        audioMime,
        remitente: fromNumber
      });

      // Enviar respuesta por WhatsApp
      if (fromNumber && phoneNumberId) {
        await enviarMensajeWhatsApp({
          to: fromNumber,
          text: lauraReply,
          phoneNumberId
        });
      }

      // Registrar auditoría interna en holarebuske@gmail.com
      notificarAuditoriaInterna({
        remitente: fromNumber || 'Cliente Web/API',
        entrante: textInput,
        respuesta: lauraReply,
        tipo: messageType
      });

      return res.status(200).json({ ok: true, processed: true, replyLength: lauraReply.length });

    } catch (err) {
      console.error('[Laura-Webhook] Error procesando webhook:', err);
      return res.status(200).json({ ok: false, error: err.message }); // Siempre 200 a Meta para evitar suspensión
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
