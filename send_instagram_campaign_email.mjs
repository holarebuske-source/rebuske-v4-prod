/**
 * ============================================================================
 * REBUSKE · ENVÍO DE ESTRATEGIA DE LANZAMIENTO INSTAGRAM (5 DÍAS)
 * ============================================================================
 * Destinatario: holarebuske@gmail.com
 * Solicitado por: 👑 Canashi 👑 (CEO Rebuske)
 * ============================================================================
 */

import tls from 'tls';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';
const TO_EMAIL = 'holarebuske@gmail.com';

function sendRawSmtpMail({ fromName, to, subject, html, text }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    let buffer = '';
    let step = 0;

    const boundary = `ig_rebuske_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
    const encodedFromName = `=?UTF-8?B?${Buffer.from(fromName || '📢 Sofía & Valeria · Rebuske', 'utf8').toString('base64')}?=`;

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
          `Content-Type: text/plain; charset=UTF-8`,
          `Content-Transfer-Encoding: base64`,
          ``,
          Buffer.from(text || 'Estrategia de 5 Publicaciones para Instagram · Rebuske', 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
          ``,
          `--${boundary}`,
          `Content-Type: text/html; charset=UTF-8`,
          `Content-Transfer-Encoding: base64`,
          ``,
          Buffer.from(html, 'utf8').toString('base64').replace(/(.{76})/g, '$1\r\n'),
          ``,
          `--${boundary}--`,
          `.`
        ].join('\r\n');

    const sendCmd = (cmd) => socket.write(cmd + '\r\n');

    const timeout = setTimeout(() => {
      socket.destroy();
      reject(new Error('Timeout de conexión SMTP (20s)'));
    }, 20000);

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
          sendCmd(mimeMessage);
        } else if (step === 6 && code === 250) {
          step = 7;
          sendCmd('QUIT');
          clearTimeout(timeout);
          socket.end();
          return resolve({ success: true, message: 'Correo de Instagram enviado con éxito' });
        }
      }
    });

    socket.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; background-color: #0C120A; color: #F4FBF1; margin: 0; padding: 20px; }
    .card { background-color: #162413; border: 1px solid #24391E; border-radius: 16px; padding: 24px; margin-bottom: 24px; }
    .day-badge { display: inline-block; background-color: #B8FF3B; color: #0C120A; font-weight: 800; font-size: 12px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px; }
    .title { color: #FFFFFF; font-size: 20px; font-weight: bold; margin: 0 0 10px 0; }
    .subtitle { color: #97A890; font-size: 13px; margin-bottom: 16px; }
    .section-box { background-color: #0A1008; border-left: 3px solid #B8FF3B; padding: 12px 16px; margin: 12px 0; border-radius: 0 8px 8px 0; font-size: 13px; }
    .copy-box { background-color: #121E10; border: 1px dashed #B8FF3B; padding: 16px; border-radius: 12px; font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: #FFFFFF; }
    .hashtags { color: #B8FF3B; font-size: 12px; margin-top: 10px; font-weight: bold; }
    .btn { display: inline-block; background-color: #B8FF3B; color: #0C120A; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 14px; margin-top: 15px; }
  </style>
</head>
<body>
  <div style="max-width: 650px; margin: 0 auto;">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #FFFFFF; font-size: 26px; margin-bottom: 5px;">🔥 ESTRATEGIA DE LANZAMIENTO INSTAGRAM</h1>
      <p style="color: #B8FF3B; font-size: 14px; font-weight: bold; margin-top: 0;">5 Días de Publicaciones de Alto Impacto para Rebuske Medellín</p>
      <p style="color: #97A890; font-size: 12px;">Link Único Oficial para Bio de Redes: <strong style="color: #FFFFFF;">https://rebuske.vercel.app/registro</strong></p>
    </div>

    <!-- DÍA 1 -->
    <div class="card">
      <span class="day-badge">DÍA 1 · CONVOCATORIA HISTÓRICA</span>
      <h2 class="title">👑 Convocatoria a los 100 Primeros Profesionales de Medellín</h2>
      <div class="subtitle"><strong>Formato:</strong> Carrusel de 5 Láminas (1080x1350 px) + Portada con Gancho Visual</div>
      
      <div class="section-box">
        <strong>🎨 Descripción Visual (Diseño):</strong><br>
        • <em>Slide 1 (Portada):</em> Fondo negro grafito con la luciérnaga verde lima brillante. Texto gigante: <em>"Técnicos de Medellín: ¿Cansados de que las apps les quiten el 20% o 25% de cada trabajo?"</em><br>
        • <em>Slide 2:</em> Comparativa visual: Apps tradicionales (25% comisión, demoras en pago) vs Rebuske (Solo 1% el primer mes, pago en 48h con Bóveda Wompi).<br>
        • <em>Slide 3:</em> Placa de Oro VIP Fundador y beneficios para los 100 primeros cupos.<br>
        • <em>Slide 4:</em> Oficios prioritarios: Plomería, Electricidad, Cerrajería, Pintura, Aire Acondicionado, Mecánica.<br>
        • <em>Slide 5:</em> Llamado a la acción con flecha señalando: <em>"Asegura tu cupo antes de que se agoten en el link de la bio."</em>
      </div>

      <div class="copy-box">
¡Medellín! 🇨🇴 Llegó el momento de dignificar el trabajo de nuestros técnicos y profesionales independientes.

¿Sabías que la mayoría de aplicaciones intermediarias le descuentan al trabajador hasta el 25% de lo que se gana con el sudor de su frente? En Rebuske cambiamos las reglas:

👑 <strong>Convocatoria Exclusiva para los 100 Primeros Técnicos Fundadores:</strong>
⚡ <strong>Solo el 1% de comisión</strong> durante tu primer mes (¡el 99% de la plata entra limpio a tu bolsillo!).
🔒 <strong>Bóveda Wompi:</strong> Tu dinero queda asegurado antes de salir de tu casa. Cero fiados, cero pérdidas.
📍 <strong>Servicios en tu misma comuna:</strong> Menos trancones, más productividad.

Solo abriremos 100 cupos en esta primera fase. Si eres plomero, electricista, cerrajero, pintor o técnico en el Valle de Aburrá:

👉 <strong>Toca el enlace de nuestro perfil y asegura tu cupo hoy mismo en https://rebuske.vercel.app/registro</strong>

<div class="hashtags">#Rebuske #Medellin #TecnicosMedellin #PlomerosMedellin #ElectricistasMedellin #TrabajoPaisa #ValleDeAburra #PaisaEmprendedor #ServiciosMedellin #Antioquia</div>
      </div>
    </div>

    <!-- DÍA 2 -->
    <div class="card">
      <span class="day-badge" style="background-color: #F59E0B;">DÍA 2 · SOLUCIÓN HOGARES</span>
      <h2 class="title">🏠 ¿Cansado de buscar técnicos y que queden mal?</h2>
      <div class="subtitle"><strong>Formato:</strong> Reel Vertical (9:16) con Audio en Tendencia + Carrusel Explicativo</div>
      
      <div class="section-box">
        <strong>🎨 Descripción Visual (Diseño):</strong><br>
        • <em>Video Reel:</em> Actuación rápida POV. Un tubo de lavaplatos goteando a las 8:00 PM de un domingo. El usuario llama a un "contacto que le recomendaron" y le dejan en visto. Corte dinámico a la pantalla del celular abriendo Rebuske: en 11 minutos un plomero certificado SENA de su mismo barrio acepta el servicio.<br>
        • <em>Lámina final:</em> Sticker animado de Google Play Store + Código de Bono <strong>HOGAR15K-VIP</strong> (-$15.000 COP).
      </div>

      <div class="copy-box">
Se te dañó la cerradura, se fue la luz o empezó a gotear el lavaplatos... y el "amigo del amigo" nunca llegó o te cobró el triple 🤦‍♂️.

Eso se acabó en Medellín. Conoce <strong>Rebuske Hogares</strong>:

📱 La app donde encuentras profesionales verificados con antecedentes judiciales, calificados por vecinos de tu misma comuna y con <strong>Garantía Legal de 48 horas</strong> por escrito.

🎁 <strong>REGALO DE LANZAMIENTO:</strong>
Regístrate en nuestra lista VIP de Google Play Store y recibe un <strong>Bono de $15.000 COP</strong> para tu primer servicio.

👉 <strong>Entra al link de nuestra biografía (https://rebuske.vercel.app/registro), selecciona "Soy Cliente" y asegura tu bono antes del estreno oficial.</strong>

<div class="hashtags">#HogaresMedellin #MedellinInnova #PobladoMedellin #LaurelesMedellin #BelenMedellin #Envigado #ServiciosParaElHogar #ReparacionesMedellin #VidaPaisa #Colombia</div>
      </div>
    </div>

    <!-- DÍA 3 -->
    <div class="card">
      <span class="day-badge">DÍA 3 · SEGURIDAD TOTAL</span>
      <h2 class="title">🔒 Bóveda Wompi: La Garantía donde Nadie Pierde</h2>
      <div class="subtitle"><strong>Formato:</strong> Carrusel Educativo (Paso 1, 2 y 3) con Iconografía de Seguridad</div>
      
      <div class="section-box">
        <strong>🎨 Descripción Visual (Diseño):</strong><br>
        • <em>Slide 1:</em> Candado verde esmeralda y el texto: <em>"¿Por qué en Rebuske nunca te van a robar un anticipo ni le van a quedar debiendo al técnico?"</em><br>
        • <em>Slide 2:</em> Paso 1 - El cliente paga a través de Bancolombia / Nequi / Tarjeta por Wompi. El dinero NO va al técnico ni a Rebuske: entra en Bóveda segura protegida.<br>
        • <em>Slide 3:</em> Paso 2 - El técnico hace el trabajo con la tranquilidad de que la plata ya existe y está garantizada.<br>
        • <em>Slide 4:</em> Paso 3 - Cliente revisa, firma el Acta Digital de Conformidad con código QR y el dinero se transfiere de inmediato al técnico.
      </div>

      <div class="copy-box">
El problema número 1 en los servicios tradicionales:
❌ Al cliente le piden anticipo y se desaparecen.
❌ El técnico termina el trabajo y le dicen "mañana le transfiero" y nunca pagan.

En Rebuske eliminamos la desconfianza con nuestra <strong>Bóveda Wompi de Pago Seguro</strong> 🔒.

1️⃣ Tu pago se custodia en una cuenta blindada.
2️⃣ El profesional trabaja con tranquilidad.
3️⃣ La plata solo se libera cuando tú escaneas el código de conformidad en tu puerta.
4️⃣ Además, cuentas con <strong>48 horas de Garantía Técnica</strong> bajo la Ley 1480.

Medellín se merece servicios de primer nivel.

👉 <strong>Únete a la plataforma que cuida tu bolsillo: enlace único en nuestra bio (https://rebuske.vercel.app/registro).</strong>

<div class="hashtags">#SeguridadFinanciera #FintechColombia #Wompi #PagosSeguros #RebuskeMedellin #ConfianzaTotal #CeroEstafas #MedellinSmartCity</div>
      </div>
    </div>

    <!-- DÍA 4 -->
    <div class="card">
      <span class="day-badge" style="background-color: #B8FF3B;">DÍA 4 · MODO LUZ EXPRESS</span>
      <h2 class="title">⚡ ¿Una Emergencia en Casa? Modo Luz en Menos de 35 Minutos</h2>
      <div class="subtitle"><strong>Formato:</strong> Reel Cinemático Nocturno con Efecto Luciérnaga Neón</div>
      
      <div class="section-box">
        <strong>🎨 Descripción Visual (Diseño):</strong><br>
        • <em>Video Reel:</em> Toma cinematográfica de Medellín de noche. Se te quedaron las llaves dentro del carro o la casa a las 10:00 PM. Música de tensión que se resuelve al presionar el botón rojo de la luciérnaga en la app Rebuske: <em>"Modo Luz Activado"</em>. El cerrajero motorizado más cercano llega con su maletín en 22 minutos, abre la puerta sin daño y el usuario sonríe aliviado.
      </div>

      <div class="copy-box">
¿Te imaginas quedarte encerrado fuera de tu casa a medianoche o pinchado en Las Palmas bajo la lluvia? 🌧️🔑

Para esos momentos creamos el <strong>Modo Luz Express de Rebuske</strong> ⚡.

💡 Con solo tocar el botón de emergencia en la app, nuestro algoritmo georreferenciado localiza al profesional disponible más cercano a tu ubicación con un tiempo promedio de llegada <strong>menor a 35 minutos</strong>.

Disponible para:
🔑 Cerrajería urgente
⚡ Cortocircuitos y fallas eléctricas
🚰 Fugas graves de agua
🚗 Auxilio de batería y despinche

No esperes a que te pase una emergencia para tenernos a mano.

👉 <strong>Regístrate gratis hoy y ten tu solución lista: link en la bio (https://rebuske.vercel.app/registro).</strong>

<div class="hashtags">#ModoLuz #EmergenciasMedellin #CerrajeriaMedellin #DespincheMedellin #PlomeriaUrgente #Medellin24Horas #AppMedellin</div>
      </div>
    </div>

    <!-- DÍA 5 -->
    <div class="card">
      <span class="day-badge" style="background-color: #F4FBF1; color: #0C120A;">DÍA 5 · ORGULLO PAISA</span>
      <h2 class="title">🤝 De Medellín para Medellín: Apoyemos el Talento de Nuestros Barrios</h2>
      <div class="subtitle"><strong>Formato:</strong> Carrusel Fotográfico Humano de Profesionales Reales</div>
      
      <div class="section-box">
        <strong>🎨 Descripción Visual (Diseño):</strong><br>
        • <em>Láminas fotográficas:</em> Retratos cercanos, cálidos y profesionales de técnicos reales en sus barrios (Don Carlos en Belén, Lupita en Laureles, Andrés en Robledo). Todos portando su carné digital oficial con código QR y sonrisa de confianza.<br>
        • <em>Lámina final:</em> El mapa de las 16 comunas de Medellín interconectadas con puntos de luz verde neón.
      </div>

      <div class="copy-box">
Detrás de cada fuga arreglada, de cada pared pintada y de cada motor encendido hay un padre, una madre o un joven paisa que sale a darlo todo por su familia.

Rebuske no es una multinacional lejana. Es una plataforma creada en Medellín para fortalecer la economía de nuestros propios barrios 💚.

Cuando contratas por Rebuske:
✅ Apoyas el talento certificado de tu comuna.
✅ Le aseguras al trabajador un ingreso justo sin intermediarios abusivos.
✅ Recibes un trabajo garantizado y seguro para tu hogar.

Seas profesional buscando crecer, o vecino buscando una mano experta: <strong>esta comunidad es tuya.</strong>

👉 <strong>Entra a https://rebuske.vercel.app/registro y sé parte de la primera generación Rebuske.</strong>

<div class="hashtags">#TalentoPaisa #MedellinCiudadDeCreadores #HechoEnMedellin #OrgulloPaisa #ComunasMedellin #EconomiaLocal #RebuskeApp #Medellin2026</div>
      </div>
    </div>

    <!-- PIE DEL CORREO -->
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #24391E;">
      <p style="color: #97A890; font-size: 12px; margin: 0;">Reporte oficial generado por el equipo de Marketing y Comunicación de Rebuske</p>
      <p style="color: #FFFFFF; font-size: 13px; font-weight: bold; margin-top: 5px;">👑 Dirección General: Canashi · Medellín, 2026</p>
    </div>

  </div>
</body>
</html>
`;

const textContent = `
REBUSKE · ESTRATEGIA DE LANZAMIENTO INSTAGRAM (5 DÍAS)
Destinatario: holarebuske@gmail.com
Link Único para Redes Sociales: https://rebuske.vercel.app/registro

DÍA 1 · CONVOCATORIA 100 TÉCNICOS FUNDADORES (CARRUSEL)
- Copy: Convocatoria exclusiva para los 100 primeros técnicos fundadores con solo el 1% de comisión en el primer mes y pagos en Bóveda Wompi.
- Hashtags: #Rebuske #Medellin #TecnicosMedellin #PlomerosMedellin #ElectricistasMedellin #TrabajoPaisa

DÍA 2 · SOLUCIÓN HOGARES Y PLAY STORE (REEL POV)
- Copy: ¿Cansado de técnicos que no aparecen? Descubre Rebuske Hogares. Acceso anticipado en Google Play Store + Bono de $15.000 COP con cupón HOGAR15K-VIP.
- Hashtags: #HogaresMedellin #MedellinInnova #PobladoMedellin #LaurelesMedellin #BelenMedellin

DÍA 3 · SEGURIDAD TOTAL: BÓVEDA WOMPI Y 48H GARANTÍA (CARRUSEL EDUCATIVO)
- Copy: Cero anticipos perdidos, cero deudas al técnico. La plata se custodia de forma segura y solo se libera con acta digital de conformidad.
- Hashtags: #SeguridadFinanciera #FintechColombia #Wompi #PagosSeguros #RebuskeMedellin

DÍA 4 · MODO LUZ EXPRESS <35 MIN (REEL CINEMÁTICO NOCTURNO)
- Copy: Emergencias en casa o en la calle resueltas en menos de 35 minutos con nuestro botón de la luciérnaga.
- Hashtags: #ModoLuz #EmergenciasMedellin #CerrajeriaMedellin #DespincheMedellin

DÍA 5 · ORGULLO PAISA: DE MEDELLÍN PARA MEDELLÍN (CARRUSEL COMUNIDAD)
- Copy: Apoyemos el talento local de las 16 comunas. Una red hecha en Medellín para impulsar el trabajo digno y justo.
- Hashtags: #TalentoPaisa #MedellinCiudadDeCreadores #HechoEnMedellin #OrgulloPaisa #Rebuske2026
`;

async function main() {
  console.log('Enviando estrategia de 5 publicaciones de Instagram a:', TO_EMAIL);
  try {
    const result = await sendRawSmtpMail({
      fromName: '📢 Sofía & Valeria · Rebuske Marketing',
      to: TO_EMAIL,
      subject: '📸 [INSTAGRAM] Plan Maestro de Lanzamiento (5 Días) + Link Único Oficial',
      html: htmlContent,
      text: textContent
    });
    console.log('✅ Éxito:', result.message);
  } catch (error) {
    console.error('❌ Error enviando correo:', error);
    process.exit(1);
  }
}

main();
