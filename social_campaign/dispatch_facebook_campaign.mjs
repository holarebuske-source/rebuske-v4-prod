/**
 * ============================================================================
 * REBUSKE · DISPATCH CORREO 3: FACEBOOK (30 POSTS + BANNER COMUNITARIO + ESTRATEGIA)
 * ============================================================================
 */

import path from 'path';
import { sendRawMimeEmail, CAMPAIGN_DIR, TO_EMAIL, CC_EMAIL } from './email_sender_core.mjs';

const bannerPath = path.join(CAMPAIGN_DIR, 'banner_facebook.png');

const analysisHtml = `
<div style="background: rgba(22, 36, 19, 0.7); border: 1px solid rgba(184, 255, 59, 0.3); border-radius: 16px; padding: 24px; margin-bottom: 30px;">
  <h2 style="color: #B8FF3B; font-family: 'Syne', Arial, sans-serif; margin-top: 0; font-size: 24px;">📊 ANÁLISIS ESTRATÉGICO PARA FACEBOOK</h2>
  <table style="width: 100%; border-collapse: collapse; color: #F4FBF1; font-size: 14px;">
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E; width: 220px;">📐 Tamaños & Ratios Oficiales:</td>
      <td style="padding: 10px;">
        • <b>Post Horizontal / Enlaces:</b> 1200 × 630 px (Ratio 1.91:1 - Ideal para compartir links con previsualización).<br/>
        • <b>Post Cuadrado / Álbum:</b> 1080 × 1080 px (Ideal para testimonios y comparativas visuales).<br/>
        • <b>Historias de Facebook:</b> 1080 × 1920 px (9:16 vertical).
      </td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E;">🗣️ Cómo se habla en Facebook:</td>
      <td style="padding: 10px;">
        Tono comunitario, protector, familiar y de confianza vecinal. El público en Facebook (cabezas de hogar, administradores de conjuntos, adultos de 28 a 60 años en Medellín) valora la seguridad de su familia, la honestidad en el cobro, la formalidad jurídica y la recomendación entre vecinos de barrio.
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E;">🏷️ Hashtags Más Usados en Grupos Paisas:</td>
      <td style="padding: 10px; color: #FFFA70;">
        #MedellinSegura #VecinosMedellin #LaurelesComunidad #EnvigadoCiudad #BelenMedellin #PobladoComunidad #rebuske #PlomeriaSegura #ElectricistasConfiables #AseoGarantizado #FamiliaPaisa #PropiedadHorizontalMedellin #WompiColombia
      </td>
    </tr>
  </table>
</div>
`;

// 30 Facebook posts
const fbPosts = [
  // --- BLOQUE 1: LO QUE OFRECEMOS Y CÓMO FUNCIONA (15 POSTS) ---
  {
    num: 1,
    cat: "LO QUE OFRECEMOS",
    title: "Seguridad para tu hogar: ¿Sabes realmente quién entra a tu casa?",
    format: "Post con Enlace (1200x630 px)",
    copy: "Para las familias de Medellín, la seguridad de su hogar es lo primero 🏡.\n\nContratar técnicos en la calle o por avisos sin verificar es un riesgo innecesario. En rebuske cada plomero, cerrajero y electricista cuenta con verificación biométrica, antecedentes judiciales limpios y pago protegido por Bóveda Wompi (Bancolombia).\n\nTú pagas en la app, el técnico hace la labor y solo cuando tú autorices que quedó bien, se le libera el dinero.",
    hashtags: "#HogarSeguro #Medellin #FamiliaPaisa #rebuske"
  },
  {
    num: 2,
    cat: "LO QUE OFRECEMOS",
    title: "Garantía de 48 horas bajo la Ley 1480 del Consumidor",
    format: "Post Informativo (1200x630 px)",
    copy: "¿Te arreglaron un tubo y a las 24 horas volvió a botar agua? 💧🤦‍♂️\n\nCon un todero informal te toca pagar de nuevo. En rebuske cada trabajo genera un Acta Digital de Garantía de 48h con hash criptográfico SHA-256. Si la falla persiste en ese lapso, el técnico regresa y lo soluciona sin ningún cobro adicional.",
    hashtags: "#GarantiaEscrita #DerechosDelConsumidor #rebuskeMedellin"
  },
  {
    num: 3,
    cat: "LO QUE OFRECEMOS",
    title: "Conoce 'Servicios por Ellas': Técnicas de confianza en Medellín",
    format: "Álbum de Fotos (1080x1080 px)",
    copy: "Muchas mujeres, madres y adultas mayores prefieren que sea otra mujer quien ingrese a realizar labores técnicas en su vivienda 👩‍🔧.\n\nPor eso creamos 'Servicios por Ellas', el primer catálogo de técnicas especializadas en fontanería, electricidad y aseo a fondo en Medellín. Cuidado en los detalles, puntualidad y respaldo total.",
    hashtags: "#ServiciosPorEllas #MujeresMedellin #ConfianzaHogar #rebuske"
  },
  {
    num: 4,
    cat: "LO QUE OFRECEMOS",
    title: "Cerrajería de urgencia en tu barrio sin dañar la puerta",
    format: "Post de Servicio (1200x630 px)",
    copy: "¿Perdiste las llaves de tu casa al regresar del trabajo? 🔑🚪\n\nNo dejes que rompan la cerradura o te cobren una fortuna. Nuestros cerrajeros residenciales usan técnicas de apertura limpia con ganzúas de precisión. Tarifas claras y técnico en tu puerta en minutos.",
    hashtags: "#CerrajeriaMedellin #UrgenciasHogar #rebuske"
  },
  {
    num: 5,
    cat: "LO QUE OFRECEMOS",
    title: "Llegada Prioritaria por $3.333 COP: Auxilio rápido en emergencias",
    format: "Post Destacado (1200x630 px)",
    copy: "Cuando hay un tubo roto o la nevera se quedó sin luz, cada minuto cuenta 🚨.\n\nCon el adicional de Llegada Prioritaria (+ $3.333 COP), tu solicitud toma el carril express y el técnico más cercano en tu comuna se desplaza de inmediato en moto para auxiliarte.",
    hashtags: "#DesvareRapido #LlegadaPrioritaria #Medellin #rebuske"
  },
  {
    num: 6,
    cat: "LO QUE OFRECEMOS",
    title: "Cuidado con las sobrecargas eléctricas en diciembre",
    format: "Consejo Preventivo (1200x630 px)",
    copy: "Las luces del árbol, los pesebres y los adornos navideños pueden sobrecargar los tomacorrientes antiguos ⚡🎄.\n\nUn electricista certificado de rebuske puede revisar tu tablero de breakers, balancear las cargas y asegurar que tu familia pase unas fiestas tranquilas y sin riesgos de incendio.",
    hashtags: "#NavidadSegura #ElectricidadHogar #Prevencion #rebuske"
  },
  {
    num: 7,
    cat: "LO QUE OFRECEMOS",
    title: "Aseo profundo para recibir el Año Nuevo con casa radiante",
    format: "Post Estacional (1200x630 px)",
    copy: "Lavar cortinas, desengrasar la campana, brillar pisos y limpiar ventanas no tiene que quitarte tu descanso de fin de año 🧼✨.\n\nNuestras profesionales en aseo profundo se encargan de cada rincón de tu casa mientras tú disfrutas con tu familia. Agenda tu servicio con pago protegido.",
    hashtags: "#AseoProfundo #HogarLimpio #AnoNuevoMedellin #rebuske"
  },
  {
    num: 8,
    cat: "LO QUE OFRECEMOS",
    title: "Matriz de Tarifas Justas: Se acabaron las adivinanzas de precio",
    format: "Infografía (1080x1080 px)",
    copy: "En rebuske implementamos precios claros según la complejidad del trabajo y la comuna en Medellín. Sabes cuánto vas a pagar desde el primer clic. Cero cobros inventados al finalizar el trabajo.",
    hashtags: "#PreciosJustos #Transparencia #rebuskeMedellin"
  },
  {
    num: 9,
    cat: "LO QUE OFRECEMOS",
    title: "Mantenimiento preventivo de tuberías antes de la temporada de lluvias",
    format: "Post Educativo (1200x630 px)",
    copy: "Las hojas secas y los sedimentos taponan los bajantes de las casas en Medellín 🍂🌧️. Evita inundaciones en los patios con una limpieza y sondeo preventivo de tuberías con nuestros fontaneros expertos.",
    hashtags: "#PlomeríaPreventiva #LluviasMedellin #HogarSeguro #rebuske"
  },
  {
    num: 10,
    cat: "LO QUE OFRECEMOS",
    title: "Cerraduras de seguridad y cambio de guardas al mudarte",
    format: "Consejo de Seguridad (1200x630 px)",
    copy: "¿Te mudaste a un nuevo apartamento en arriendo o compraste casa? 🔑\n\nNunca te quedes con las llaves que te entregaron. No sabes cuántas copias tienen los inquilinos anteriores. Cambia las guardas con un cerrajero certificado de rebuske hoy mismo.",
    hashtags: "#MudanzaMedellin #SeguridadHogar #Cerrajeria #rebuske"
  },
  {
    num: 11,
    cat: "LO QUE OFRECEMOS",
    title: "Protección a personas mayores que viven solas",
    format: "Post Solidario (1200x630 px)",
    copy: "Si tienes a tus padres o abuelos viviendo solos en Medellín, no permitas que cualquier extraño entre a hacerles arreglos 👵👴.\n\nDesde tu propio celular puedes pedirles el servicio por rebuske, pagar con Wompi de forma remota y monitorear la llegada del técnico verificado.",
    hashtags: "#CuidadoAdultoMayor #FamiliaUnida #rebuske"
  },
  {
    num: 12,
    cat: "LO QUE OFRECEMOS",
    title: "Instalación de ventiladores de techo y lámparas decorativas",
    format: "Post Mejoras del Hogar (1080x1080 px)",
    copy: "Dale un aire moderno a tu sala sin preocuparte por cables colgando o instalaciones flojas 💡. Nuestros electricistas fijan y cablean con anclajes estructurales seguros para que disfrutes de tu iluminación.",
    hashtags: "#DecoracionMedellin #Electricistas #HogarPaisa #rebuske"
  },
  {
    num: 13,
    cat: "LO QUE OFRECEMOS",
    title: "La tecnología que respalda a rebuske: Bóveda Wompi de Bancolombia",
    format: "Post Institucional (1200x630 px)",
    copy: "Para tu tranquilidad, no manejamos tu dinero en cuentas dudosas. Cada peso pagado se custodia directamente a través de Wompi Bancolombia con altos estándares de ciberseguridad.",
    hashtags: "#FintechSegura #WompiBancolombia #rebuske"
  },
  {
    num: 14,
    cat: "LO QUE OFRECEMOS",
    title: "Atención personalizada con Laura: Habla con una persona real",
    format: "Post Atención al Cliente (1200x630 px)",
    copy: "¿Cansado de contestadores automáticos que nunca resuelven nada? 📞 En rebuske te atiende Laura directamente por WhatsApp (+57 304 381 2882) para acompañarte antes, durante y después de tu servicio.",
    hashtags: "#ServicioAlCliente #AtencionHumana #rebuske"
  },
  {
    num: 15,
    cat: "LO QUE OFRECEMOS",
    title: "rebuske: Nacida en Medellín para cuidar a los hogares antioqueños",
    format: "Historia de Marca (1080x1080 px)",
    copy: "Nacimos de una necesidad real: dignificar el trabajo de los técnicos independientes y darle paz mental a las familias que necesitan reparar su hogar sin miedo a las estafas. Somos talento paisa trabajando para los paisas.",
    hashtags: "#OrgulloPaisa #MedellinInnovadora #rebuske"
  },

  // --- BLOQUE 2: ACCIÓN DE REGISTRARSE (15 POSTS) ---
  {
    num: 16,
    cat: "ACCIÓN DE REGISTRO",
    title: "Reclama tu bono de $15.000 COP para tu primer servicio",
    format: "Post Promocional (1200x630 px)",
    copy: "Queremos que pruebes la tranquilidad de contratar con pago protegido 🎁. Regístrate gratis como cliente en rebuske.vercel.app/registro y recibe $15.000 COP de descuento en tu primera mano de obra.",
    hashtags: "#BonoHogar #AhorroFamiliar #Medellin #rebuske"
  },
  {
    num: 17,
    cat: "ACCIÓN DE REGISTRO",
    title: "Convocatoria para Técnicos Fundadores: 1% de comisión en el primer mes",
    format: "Post de Empleo / Convocatoria (1200x630 px)",
    copy: "¿Eres plomero, electricista o cerrajero con experiencia en Medellín? 🧰\n\nPostúlate hoy a los 100 Técnicos Fundadores de rebuske. Paga solo el 1% de comisión en tu primer mes, recibe servicios en tu misma comuna y asegura tus pagos directo a tu cuenta.",
    hashtags: "#EmpleoMedellin #TecnicosMedellin #TrabajoIndependiente #rebuskePRO"
  },
  {
    num: 18,
    cat: "ACCIÓN DE REGISTRO",
    title: "Cómo registrar tu casa en 3 pasos sencillos",
    format: "Guía Paso a Paso (1080x1080 px)",
    copy: "1. Entra a rebuske.vercel.app/registro\n2. Ingresa tu número de WhatsApp y dirección aproximada en Medellín.\n3. Guarda el acceso directo en tu celular.\n\nYa estás listo para pedir cualquier reparación con un solo clic.",
    hashtags: "#RegistroFacil #HogarProtegido #rebuske"
  },
  {
    num: 19,
    cat: "ACCIÓN DE REGISTRO",
    title: "Mujeres Técnicas: Únanse a 'Servicios por Ellas'",
    format: "Convocatoria Femenina (1200x630 px)",
    copy: "Si eres especialista en aseo profundo, pintura o electricidad y vives en el Valle de Aburrá, te invitamos a registrarte como profesional fundadora. Clientes respetuosos, pagos puntuales y apoyo constante.",
    hashtags: "#MujeresTrabajadoras #ServiciosPorEllas #Medellin #rebuske"
  },
  {
    num: 20,
    cat: "ACCIÓN DE REGISTRO",
    title: "Atención Administradores de Conjuntos Residenciales en Medellín",
    format: "Post Institucional B2B (1200x630 px)",
    copy: "¿Problemas recurrentes en tuberías comunales, bombas de agua o cerraduras de portería? Registra tu copropiedad en rebuske y accede a técnicos con actas digitales de garantía y respaldo legal para tus asambleas.",
    hashtags: "#PropiedadHorizontal #AdministradoresMedellin #rebuske"
  },
  {
    num: 21,
    cat: "ACCIÓN DE REGISTRO",
    title: "Técnicos: Dejen de depender del 'boca a boca' y llenen su agenda",
    format: "Post Para Profesionales (1080x1080 px)",
    copy: "Hay días donde no suena el teléfono y los gastos siguen corriendo. Con rebuske recibes notificaciones de trabajos cerca a ti todos los días. Regístrate como profesional y haz crecer tu clientela.",
    hashtags: "#MasClientes #TecnicosPaisa #rebuskePRO"
  },
  {
    num: 22,
    cat: "ACCIÓN DE REGISTRO",
    title: "Agenda tu aseo navideño antes de que se llenen los cupos de diciembre",
    format: "Aviso Urgente de Temporada (1200x630 px)",
    copy: "En diciembre la demanda de aseo a fondo se triplica en Medellín 🎄. No te quedes sin tu fecha. Regístrate hoy y aparta el día para que tu casa quede impecable antes de Navidad.",
    hashtags: "#AseoNavidad #CuposLimitados #rebuske"
  },
  {
    num: 23,
    cat: "ACCIÓN DE REGISTRO",
    title: "Insignia Nivel Oro: El premio a los mejores técnicos de la ciudad",
    format: "Post Reconocimiento (1080x1080 px)",
    copy: "En rebuske premiamos la puntualidad y el buen trato. Los profesionales que destaquen en diciembre tendrán prioridad exclusiva de pedidos durante todo enero.",
    hashtags: "#NivelOro #ExcelenciaLaboral #rebuskePRO"
  },
  {
    num: 24,
    cat: "ACCIÓN DE REGISTRO",
    title: "Acompañamiento por WhatsApp con Laura en tu primer servicio",
    format: "Post Confianza (1200x630 px)",
    copy: "¿Nunca has pedido un servicio por internet? Tranquilo/a. Escríbele a Laura al +57 304 381 2882 y ella te guiará paso a paso para que no tengas ninguna duda.",
    hashtags: "#LauraRebuske #WhatsAppSoporte #rebuske"
  },
  {
    num: 25,
    cat: "ACCIÓN DE REGISTRO",
    title: "Propietarios de viviendas en arriendo: Protejan su inversión",
    format: "Post Arrendatarios y Dueños (1200x630 px)",
    copy: "Un daño de plomería desatendido puede pudrir pisos de madera y filtrarse al vecino de abajo. Atiende las reparaciones de tus inquilinos con técnicos certificados de rebuske.",
    hashtags: "#BienesRaicesMedellin #ArriendosMedellin #rebuske"
  },
  {
    num: 26,
    cat: "ACCIÓN DE REGISTRO",
    title: "Técnicos pensionados con ganas de seguir produciendo: Bienvenidos",
    format: "Post Inclusión Senior (1200x630 px)",
    copy: "La experiencia de toda una vida en fontanería o electricidad vale oro 🏆. En rebuske los profesionales senior son altamente valorados por nuestros clientes. Regístrate a tu propio ritmo.",
    hashtags: "#ExperienciaPaisa #AdultoMayorActivo #rebuskePRO"
  },
  {
    num: 27,
    cat: "ACCIÓN DE REGISTRO",
    title: "Sin descargar nada pesado: Instala rebuske en tu pantalla de inicio",
    format: "Tip Tecnológico (1080x1080 px)",
    copy: "Nuestra web app no ocupa espacio en tu celular. Entra a rebuske.vercel.app y agrégala a tu pantalla. La tendrás disponible 24/7 para cualquier desvare.",
    hashtags: "#TecnologiaFacil #AppLiviana #rebuske"
  },
  {
    num: 28,
    cat: "ACCIÓN DE REGISTRO",
    title: "Evita discusiones de precio en tu sala: Todo queda pactado antes",
    format: "Post Beneficio Claro (1200x630 px)",
    copy: "Nada más incómodo que un técnico cobrando de más al terminar. En rebuske el valor está acordado en la app y retenido en Wompi. Ni un peso más, ni un peso menos.",
    hashtags: "#TranquilidadTotal #CeroConflictos #rebuske"
  },
  {
    num: 29,
    cat: "ACCIÓN DE REGISTRO",
    title: "¿Tienes un comercio o local en Medellín? Ten un auxilio técnico a mano",
    format: "Post Locales Comerciales (1200x630 px)",
    copy: "Si se dañan las luces de tu vitrina o el baño de clientes se rebosa en pleno horario comercial, necesitas solución ya. Regístrate en rebuske y pide auxilio express con llegada prioritaria.",
    hashtags: "#ComercioMedellin #LocalesComerciales #rebuske"
  },
  {
    num: 30,
    cat: "ACCIÓN DE REGISTRO",
    title: "Últimos cupos: Únete hoy a la comunidad de hogares seguros de Medellín",
    format: "Post Cierre de Convocatoria (1200x630 px)",
    copy: "Ya son cientos de familias y técnicos conectados en el Valle de Aburrá. Entra a rebuske.vercel.app/registro y descubre la nueva forma de reparar tu hogar con respaldo total.",
    hashtags: "#ComunidadRebuske #Medellin #UneteHoy"
  }
];

function buildHtml() {
  let html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Pack Oficial Facebook · rebuske</title>
  </head>
  <body style="background-color: #0C120A; color: #F4FBF1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px;">
    <div style="max-width: 720px; margin: 0 auto; background: #121A0E; border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 30px; box-shadow: 0 15px 45px rgba(0,0,0,0.6);">
      
      <!-- Header -->
      <div style="text-align: center; border-bottom: 1px solid rgba(184,255,59,0.25); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="background: rgba(184,255,59,0.15); color: #B8FF3B; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; letter-spacing: 2px;">REBUSKE SOCIAL SUITE · EMAIL 3 DE 4</span>
        <h1 style="color: #F4FBF1; font-size: 28px; margin: 15px 0 5px 0;">👥 CAMPAÑA COMPLETA DE FACEBOOK</h1>
        <p style="color: #97A890; font-size: 14px; margin: 0;">30 Publicaciones Comunitarias + Banner Horizontal + Estrategia para Grupos Vecinales</p>
      </div>

      <!-- Real Graphic Banner Rendered Inline (CID) -->
      <div style="text-align: center; margin: 25px 0;">
        <p style="color: #AFFF3E; font-size: 13px; font-weight: bold; margin-bottom: 8px;">🎨 BANNER VISUAL OFICIAL PARA FACEBOOK (ADJUNTO Y RENDERIZADO):</p>
        <img src="cid:banner_img" alt="Banner Oficial Facebook rebuske" style="width: 100%; max-width: 600px; border-radius: 16px; border: 1px solid rgba(184,255,59,0.35); box-shadow: 0 10px 30px rgba(0,0,0,0.5); display: block; margin: 0 auto;" />
      </div>

      <!-- Analysis -->
      ${analysisHtml}

      <!-- 30 Posts -->
      <h2 style="color: #B8FF3B; font-size: 22px; border-left: 4px solid #B8FF3B; padding-left: 12px; margin: 30px 0 20px 0;">📋 LAS 30 PUBLICACIONES OFICIALES PARA FACEBOOK</h2>
  `;

  fbPosts.forEach((p) => {
    html += `
    <div style="background: rgba(22, 36, 19, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 12px;">
        <span style="color: #B8FF3B; font-weight: bold; font-size: 15px;">FACEBOOK #${p.num} · [${p.cat}]</span>
        <span style="background: rgba(255,255,255,0.08); color: #F4FBF1; padding: 3px 10px; border-radius: 8px; font-size: 11px;">${p.format}</span>
      </div>
      
      <h3 style="color: #FFFA70; font-size: 17px; margin: 0 0 10px 0;">${p.title}</h3>
      
      <div style="background: #0C120A; border-radius: 10px; padding: 14px; color: #F4FBF1; font-size: 14px; white-space: pre-wrap; margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.05);">${p.copy}</div>
      
      <!-- Required Laura Contact and Link -->
      <div style="background: rgba(184,255,59,0.08); border-left: 3px solid #B8FF3B; padding: 10px 14px; border-radius: 6px; margin-bottom: 10px; font-size: 13px;">
        🔗 <b>Enlace de Registro Directo:</b> <a href="https://rebuske.vercel.app/registro" style="color: #B8FF3B; text-decoration: none;">https://rebuske.vercel.app/registro</a><br/>
        💬 <b>Atención y Dudas con Laura (WhatsApp):</b> <a href="https://wa.me/573043812882" style="color: #AFFF3E; text-decoration: none; font-weight: bold;">+57 304 381 2882</a>
      </div>

      <div style="color: #97A890; font-size: 12px;">
        <b>Hashtags Comunitarios:</b> <span style="color: #AFFF3E;">${p.hashtags}</span>
      </div>
    </div>
    `;
  });

  html += `
      <!-- Footer -->
      <div style="text-align: center; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 20px; margin-top: 30px; font-size: 12px; color: #97A890;">
        rebuske · Servicios del Hogar con Pago Protegido | Medellín, Colombia<br/>
        Reporte generado y despachado por 🎨 Valeria 🎨 (Diseño & Marketing) y 💬 Laura 💬 (Soporte).
      </div>
    </div>
  </body>
  </html>`;

  return html;
}

export async function sendFacebookEmail() {
  console.log('Enviando Correo 3: Campaña de Facebook (30 Posts + Banner PNG)...');
  const html = buildHtml();
  await sendRawMimeEmail({
    fromName: '🎨 Valeria & 💬 Laura · rebuske',
    to: TO_EMAIL,
    cc: CC_EMAIL,
    subject: '👥 [REBUSKE SOCIAL 3/4] PACK 30 PUBLICACIONES OFICIALES · FACEBOOK (Comunidad + Grupos + Banner Gráfico)',
    htmlText: html,
    imageAttachment: {
      path: bannerPath,
      filename: 'banner_facebook_rebuske.png'
    }
  });
  console.log('✅ Correo 3 (Facebook) enviado exitosamente a holarebuske@gmail.com con copia a camiloescobarr63@gmail.com.');
}

if (process.argv[1] && process.argv[1].endsWith('dispatch_facebook_campaign.mjs')) {
  sendFacebookEmail().catch(console.error);
}
