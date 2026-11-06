/**
 * ============================================================================
 * REBUSKE · DISPATCH CORREO 4: LINKEDIN (30 POSTS + BANNER FINTECH + ESTRATEGIA)
 * ============================================================================
 */

import path from 'path';
import { sendRawMimeEmail, CAMPAIGN_DIR, TO_EMAIL, CC_EMAIL } from './email_sender_core.mjs';

const bannerPath = path.join(CAMPAIGN_DIR, 'banner_linkedin.png');

const analysisHtml = `
<div style="background: rgba(22, 36, 19, 0.7); border: 1px solid rgba(184, 255, 59, 0.3); border-radius: 16px; padding: 24px; margin-bottom: 30px;">
  <h2 style="color: #B8FF3B; font-family: 'Syne', Arial, sans-serif; margin-top: 0; font-size: 24px;">📊 ANÁLISIS ESTRATÉGICO PARA LINKEDIN</h2>
  <table style="width: 100%; border-collapse: collapse; color: #F4FBF1; font-size: 14px;">
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E; width: 220px;">📐 Tamaños & Ratios Oficiales:</td>
      <td style="padding: 10px;">
        • <b>Post Horizontal / Feed:</b> 1200 × 627 px (Ratio 1.91:1 - Estándar para artículos y actualizaciones).<br/>
        • <b>Document Carousel (PDF Slides):</b> 1080 × 1080 px o 1080 × 1350 px (Genera mayor tiempo de lectura y retención).
      </td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E;">🗣️ Cómo se habla en LinkedIn:</td>
      <td style="padding: 10px;">
        Tono ejecutivo, analítico, enfocado en impacto económico, Fintech, PropTech y formalización laboral. La audiencia (inversionistas, líderes gremiales, gerentes de operaciones, arquitectos y directores de inmobiliarias en Colombia) busca datos sobre reducción de fricción transaccional, inclusión financiera, resolución de disputas de mano de obra y equidad de género.
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E;">🏷️ Hashtags Más Relevantes en el Ecosistema:</td>
      <td style="padding: 10px; color: #FFFA70;">
        #FinTechColombia #PropTech #InclusionFinanciera #MedellinTech #rebuske #FuturoDelTrabajo #Escrow #ImpactoSocial #MujeresEnTecnologia #EconomiaPopular #StartupsColombia #Wompi #FormalizacionLaboral #GarantiaDigital
      </td>
    </tr>
  </table>
</div>
`;

// 30 LinkedIn posts
const inPosts = [
  // --- BLOQUE 1: LO QUE OFRECEMOS Y ARQUITECTURA DEL MODELO (15 POSTS) ---
  {
    num: 1,
    cat: "LO QUE OFRECEMOS",
    title: "El dilema de la informalidad técnica en Colombia: ¿Por qué fallaban los marketplaces tradicionales?",
    format: "Artículo / Post de Opinión (1200x627 px)",
    copy: "En Colombia, más del 70% de los servicios técnicos del hogar operan en la informalidad total. Esto genera un doble problema: el usuario teme pagar por adelantado y ser defraudado, mientras que el técnico teme que no le paguen tras terminar la labor.\n\nEn rebuske solucionamos este cuello de botella con una arquitectura de Bóveda Escrow impulsada por Wompi Bancolombia. El pago del usuario queda retenido en una bóveda neutral y solo se liquida cuando el cliente valida la conformidad del servicio.\n\nDesintermediación con confianza matemática.",
    hashtags: "#FintechColombia #PropTech #Escrow #rebuske #MedellinTech"
  },
  {
    num: 2,
    cat: "LO QUE OFRECEMOS",
    title: "El valor legal del Acta Digital de 48h con hash SHA-256 (Ley 527 de 1999)",
    format: "Post Técnico-Legal (1200x627 px)",
    copy: "¿Cómo convertir una reparación doméstica ordinaria en un contrato con plena validez jurídica? 📜⚖️\n\nBajo el marco de la Ley 527 de comercio electrónico y la Ley 1480 del Estatuto del Consumidor, cada servicio en rebuske genera un Acta Digital de Garantía de 48 horas firmada criptográficamente con hash SHA-256.\n\nEsto brinda certidumbre jurídica al consumidor y formaliza la reputación del técnico independiente.",
    hashtags: "#LegalTech #Compliance #FirmaDigital #rebuske"
  },
  {
    num: 3,
    cat: "LO QUE OFRECEMOS",
    title: "'Servicios por Ellas': Reduciendo la brecha de género en oficios técnicos",
    format: "Post de Impacto Social / ESG (1200x627 px)",
    copy: "Menos del 4% de los profesionales en plomería y electricidad en América Latina son mujeres. No por falta de competencia, sino por barreras culturales de acceso y seguridad física 👩‍🔧.\n\nCon 'Servicios por Ellas' creamos un ecosistema seguro donde mujeres técnicas acceden a demanda residencial calificada con tarifas protegidas y soporte en tiempo real. La verdadera inclusión financiera empieza con oportunidades laborales equitativas.",
    hashtags: "#InclusionLaboral #ESG #MujeresEnOficios #rebuske"
  },
  {
    num: 4,
    cat: "LO QUE OFRECEMOS",
    title: "Algoritmos de geocercas comunales: Reduciendo la huella de carbono y el costo de transporte",
    format: "Post de Eficiencia Operativa (1200x627 px)",
    copy: "El tráfico vehicular en Medellín cuesta millones de horas de productividad al año 🛵.\n\nEn rebuske implementamos geocercas por comunas para emparejar al técnico con el usuario a menos de 4 km a la redonda. Reducimos el tiempo de desplazamiento a menos de 25 minutos, bajamos el gasto de combustible y garantizamos una respuesta ágil ante emergencias residenciales.",
    hashtags: "#LogisticaUrbana #SmartCities #MedellinSostenible #rebuske"
  },
  {
    num: 5,
    cat: "LO QUE OFRECEMOS",
    title: "La economía del micro-recargo dinámico: El modelo de $3.333 COP de Llegada Prioritaria",
    format: "Post de Economía y Pricing (1200x627 px)",
    copy: "¿Cómo incentivar la puntualidad extrema sin canibalizar el margen del usuario? ⚡\n\nDiseñamos un micro-incentivo de $3.333 COP para servicios de emergencia. Este valor no altera la tarifa base del servicio sino que compensa la exclusividad del despacho en motocicleta del profesional. Un modelo de micro-surge pricing transparente y ético.",
    hashtags: "#PricingStrategy #FintechDesign #rebuske"
  },
  {
    num: 6,
    cat: "LO QUE OFRECEMOS",
    title: "De comisiones extractivas del 30% a un modelo de tarifa justa",
    format: "Post Disrupción del Modelo de Negocio (1200x627 px)",
    copy: "Las grandes plataformas de la 'gig economy' cobran comisiones de hasta el 35%, incentivando que usuarios y técnicos negocien por fuera de la app (leakage).\n\nEn rebuske alineamos los incentivos: cobramos una micro-tarifa de plataforma competitiva y ofrecemos a los 100 técnicos fundadores un 1% de comisión inicial. Cuando el técnico gana lo justo, cuida la plataforma.",
    hashtags: "#GigEconomy #PlatformCoop #TrabajoDigno #rebuske"
  },
  {
    num: 7,
    cat: "LO QUE OFRECEMOS",
    title: "Seguridad transaccional sin fricción: Integración nativa con Wompi",
    format: "Post Arquitectura Tecnológica (1200x627 px)",
    copy: "El éxito de un marketplace de servicios depende de la confianza en la pasarela de pagos. Al integrar Wompi (Bancolombia), permitimos pagos con PSE, tarjetas de crédito, débito y botones Bancolombia, reteniendo el saldo en Bóveda Escrow hasta la satisfacción del cliente.",
    hashtags: "#Bancolombia #Wompi #PasarelasDePago #rebuske"
  },
  {
    num: 8,
    cat: "LO QUE OFRECEMOS",
    title: "Resolución de disputas técnicas en menos de 120 minutos",
    format: "Caso de Estudio (1200x627 px)",
    copy: "El principal miedo en reparaciones es: '¿Qué pasa si el trabajo queda mal hecho?'.\n\nEn rebuske, nuestro protocolo de arbitraje liderado por soporte y peritos técnicos analiza fotos, videos y el acta de servicio en menos de 2 horas. Si el trabajo incumple especificaciones, se autoriza la corrección inmediata o el reintegro de fondos en Bóveda Wompi.",
    hashtags: "#AtencionAlCliente #CustomerSuccess #rebuske"
  },
  {
    num: 9,
    cat: "LO QUE OFRECEMOS",
    title: "PWA de alto rendimiento: Por qué evitamos el peso de una app nativa pesada",
    format: "Post de Arquitectura Frontend (1200x627 px)",
    copy: "En mercados emergentes, el almacenamiento en dispositivos móviles es un recurso escaso. Desarrollar una Progressive Web App (PWA) permite una carga sub-segundo, modo offline para zonas de poca cobertura y cero fricción de descarga en tiendas de apps.",
    hashtags: "#WebPerformance #PWA #Engineering #rebuske"
  },
  {
    num: 10,
    cat: "LO QUE OFRECEMOS",
    title: "Estandarización de protocolos técnicos en fontanería y electricidad",
    format: "Post de Calidad Operativa (1200x627 px)",
    copy: "El trabajo informal carece de manuales de procedimientos. En rebuske dotamos a nuestros profesionales de listas de verificación obligatorias: prueba de estanqueidad en tuberías, revisión de voltaje antes y después de intervenir un breaker, y firma de conformidad digital.",
    hashtags: "#Estandarizacion #ControlDeCalidad #rebuske"
  },
  {
    num: 11,
    cat: "LO QUE OFRECEMOS",
    title: "El impacto de la reputación portable para trabajadores independientes",
    format: "Post Futuro del Trabajo (1200x627 px)",
    copy: "Un plomero tradicional lleva 15 años trabajando pero carece de un historial crediticio o laboral demostrable. En rebuske, cada trabajo calificado con 5 estrellas construye un historial portable y verificable que abre puertas a la bancarización y al crédito productivo.",
    hashtags: "#InclusionFinanciera #HistorialLaboral #rebuskePRO"
  },
  {
    num: 12,
    cat: "LO QUE OFRECEMOS",
    title: "Compliance y verificación de antecedentes en tiempo real",
    format: "Post Seguridad y Riesgos (1200x627 px)",
    copy: "La seguridad física del cliente es innegociable. Integramos cruces automáticos contra bases de datos judiciales y disciplinarias antes de activar cualquier cuenta profesional en Medellín. Cero tolerancia al riesgo.",
    hashtags: "#Compliance #SeguridadTotal #RiskManagement #rebuske"
  },
  {
    num: 13,
    cat: "LO QUE OFRECEMOS",
    title: "Cero comisiones ocultas: La ética como ventaja competitiva",
    format: "Post Cultura Corporativa (1200x627 px)",
    copy: "Las empresas más sostenibles a largo plazo son aquellas que construyen confianza radical con sus usuarios. La transparencia en tarifas y en la retención de fondos es el pilar central de nuestra ventaja competitiva en Antioquia.",
    hashtags: "#EticaEmpresarial #CrecimientoOrganico #rebuske"
  },
  {
    num: 14,
    cat: "LO QUE OFRECEMOS",
    title: "La visión de rebuske para 2027: Escalabilidad nacional",
    format: "Post de Visión y Estrategia (1200x627 px)",
    copy: "Consolidar Medellín y el Valle de Aburrá como laboratorio de excelencia en servicios protegidos del hogar es el primer paso de un plan de expansión hacia Bogotá, Cali y el Eje Cafetero para 2027.",
    hashtags: "#Escalabilidad #StartupsColombia #Vision2027 #rebuske"
  },
  {
    num: 15,
    cat: "LO QUE OFRECEMOS",
    title: "rebuske como motor de reactivación económica barrial",
    format: "Post Impacto Comunitario (1200x627 px)",
    copy: "Cada peso invertido en un servicio a través de rebuske se queda en la economía local del barrio: en la ferretería de la esquina, en el técnico vecino y en el bienestar de las familias paisas.",
    hashtags: "#EconomiaLocal #MedellinAvanza #rebuske"
  },

  // --- BLOQUE 2: ACCIÓN DE REGISTRARSE Y ALIANZAS (15 POSTS) ---
  {
    num: 16,
    cat: "ACCIÓN DE REGISTRO",
    title: "Convocatoria a los 100 Primeros Técnicos Fundadores de Medellín",
    format: "Post Reclutamiento Ejecutivo (1200x627 px)",
    copy: "Buscamos a los 100 mejores profesionales técnicos en plomería, electricidad, cerrajería y aseo del Valle de Aburrá para integrarse a nuestra red de fundadores.\n\nBeneficios: 1% de comisión en el primer mes, prioridad en asignación de servicios y acceso a Bóveda Wompi garantizada.",
    hashtags: "#ConvocatoriaLaboral #TecnicosMedellin #rebuskePRO"
  },
  {
    num: 17,
    cat: "ACCIÓN DE REGISTRO",
    title: "Alianzas con Administradoras de Propiedad Horizontal e Inmobiliarias",
    format: "Post B2B Institucional (1200x627 px)",
    copy: "¿Administras edificios residenciales o comerciales en Medellín? Integra rebuske para gestionar mantenimientos preventivos y correctivos con actas digitales de garantía, póliza y trazabilidad de pagos protegidos.",
    hashtags: "#PropiedadHorizontal #InmobiliariasMedellin #B2B #rebuske"
  },
  {
    num: 18,
    cat: "ACCIÓN DE REGISTRO",
    title: "Regístrate en la plataforma y obtén tu bono corporativo de bienvenida",
    format: "Post Beneficios Empresariales (1200x627 px)",
    copy: "Empresas en Medellín están implementando bonos de servicios del hogar de rebuske como parte de sus paquetes de bienestar laboral para colaboradores que trabajan en remoto. Conoce la plataforma en rebuske.vercel.app/registro.",
    hashtags: "#BienestarLaboral #BeneficiosEmpleados #rebuske"
  },
  {
    num: 19,
    cat: "ACCIÓN DE REGISTRO",
    title: "Ingenieros y Arquitectos: Tercericen acabados y reparaciones con respaldo",
    format: "Post Sector Construcción (1200x627 px)",
    copy: "Evita dolores de cabeza con contratistas informales en la etapa de posventas de proyectos inmobiliarios. Vincula tu cuadrilla o contrata especialistas certificados en rebuske.",
    hashtags: "#ConstruccionColombia #ArquitecturaMedellin #rebuske"
  },
  {
    num: 20,
    cat: "ACCIÓN DE REGISTRO",
    title: "Inscripción abierta al programa de formación para mujeres técnicas",
    format: "Post Formación y Talento (1200x627 px)",
    copy: "Junto a aliados estratégicos, abrimos cupos para capacitar y certificar a mujeres en oficios técnicos de alta demanda. Regístrate en nuestra comunidad y sé parte del cambio.",
    hashtags: "#FormacionTecnica #TalentoFemenino #ServiciosPorEllas #rebuske"
  },
  {
    num: 21,
    cat: "ACCIÓN DE REGISTRO",
    title: "Insignia Nivel Oro: La certificación que valida tu maestría técnica",
    format: "Post Reconocimiento Profesional (1200x627 px)",
    copy: "Los técnicos con mejor desempeño en diciembre obtendrán la Insignia Nivel Oro de rebuske, garantizando un flujo constante de clientes residenciales y corporativos en 2027.",
    hashtags: "#NivelOro #ExcelenciaOperativa #rebuskePRO"
  },
  {
    num: 22,
    cat: "ACCIÓN DE REGISTRO",
    title: "Agenda una demo institucional con nuestro equipo directivo",
    format: "Post Invitación B2B (1200x627 px)",
    copy: "Si representas a una compañía de seguros, administradora de activos o fintech y deseas conocer nuestra API y modelo de escrow, comunícate directamente con nuestro equipo de soporte corporativo.",
    hashtags: "#AlianzasEstrategicas #InversionColombia #rebuske"
  },
  {
    num: 23,
    cat: "ACCIÓN DE REGISTRO",
    title: "Prueba la infraestructura en vivo: Cero fricción en el registro",
    format: "Demo de Plataforma (1200x627 px)",
    copy: "En menos de 60 segundos puedes dar de alta tu hogar o postularte como profesional técnico. Diseñado con Syne y arquitectura Luminous Glass para máxima usabilidad.",
    hashtags: "#UXDesign #ProductDesign #rebuskeApp"
  },
  {
    num: 24,
    cat: "ACCIÓN DE REGISTRO",
    title: "Ferreterías y proveedores de materiales: Únanse a la red aliada",
    format: "Post Red de Proveedores (1200x627 px)",
    copy: "Conectamos a las ferreterías de barrio con cientos de técnicos que compran materiales a diario para reparaciones en Medellín. Conviértete en punto de suministro aliado.",
    hashtags: "#FerreteriasMedellin #CadenaDeSuministro #rebuske"
  },
  {
    num: 25,
    cat: "ACCIÓN DE REGISTRO",
    title: "Acompañamiento VIP con Laura para cuentas corporativas",
    format: "Post Soporte Dedicado (1200x627 px)",
    copy: "Nuestra líder de operaciones y soporte técnico, Laura (+57 304 381 2882), brinda atención prioritaria a administraciones y copropiedades con convenios activos.",
    hashtags: "#SoporteCorporativo #AtencionVIP #rebuske"
  },
  {
    num: 26,
    cat: "ACCIÓN DE REGISTRO",
    title: "Cómo la formalización técnica impulsa el acceso a crédito",
    format: "Post Inclusión Financiera (1200x627 px)",
    copy: "Al bancarizar los ingresos de técnicos independientes a través de Wompi, facilitamos que entidades financieras evalúen su capacidad real de pago para créditos de vehículo, vivienda y herramientas.",
    hashtags: "#FintechSocial #Bancarizacion #rebuskePRO"
  },
  {
    num: 27,
    cat: "ACCIÓN DE REGISTRO",
    title: "Registra tu inmueble antes de la temporada alta de fin de año",
    format: "Aviso Corporativo (1200x627 px)",
    copy: "Garantiza disponibilidad de técnicos certificados para emergencias en oficinas, locales y viviendas durante el receso decembrino.",
    hashtags: "#GestionDeActivos #MantenimientoPreventivo #rebuske"
  },
  {
    num: 28,
    cat: "ACCIÓN DE REGISTRO",
    title: "Transparencia de extremo a extremo: Registro en tiempo real",
    format: "Post Transparencia y Datos (1200x627 px)",
    copy: "Cada interacción, cotización y garantía queda registrada digitalmente en nuestra base de datos sincronizada. Eficiencia y control total para usuarios y técnicos.",
    hashtags: "#DataDriven #PropTechColombia #rebuske"
  },
  {
    num: 29,
    cat: "ACCIÓN DE REGISTRO",
    title: "Reclama tu bono de lanzamiento de $15.000 COP",
    format: "Post Incentivo Inicial (1200x627 px)",
    copy: "Diseñado para incentivar la adopción temprana de servicios protegidos. Regístrate hoy en rebuske.vercel.app/registro y comprueba la diferencia de operar con Bóveda Wompi.",
    hashtags: "#EarlyAdopters #InnovacionPaisa #rebuske"
  },
  {
    num: 30,
    cat: "ACCIÓN DE REGISTRO",
    title: "Sé parte de la transformación de los servicios del hogar en Colombia",
    format: "Llamado a la Comunidad Profesional (1200x627 px)",
    copy: "La tecnología solo tiene sentido cuando dignifica el trabajo y protege a las personas. Únete hoy a rebuske como cliente o técnico fundador y construyamos juntos un estándar de confianza para todo el país.",
    hashtags: "#FuturoDelTrabajo #MedellinLidera #rebuske"
  }
];

function buildHtml() {
  let html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Pack Oficial LinkedIn · rebuske</title>
  </head>
  <body style="background-color: #0C120A; color: #F4FBF1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px;">
    <div style="max-width: 720px; margin: 0 auto; background: #121A0E; border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 30px; box-shadow: 0 15px 45px rgba(0,0,0,0.6);">
      
      <!-- Header -->
      <div style="text-align: center; border-bottom: 1px solid rgba(184,255,59,0.25); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="background: rgba(184,255,59,0.15); color: #B8FF3B; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; letter-spacing: 2px;">REBUSKE SOCIAL SUITE · EMAIL 4 DE 4</span>
        <h1 style="color: #F4FBF1; font-size: 28px; margin: 15px 0 5px 0;">💼 CAMPAÑA COMPLETA DE LINKEDIN</h1>
        <p style="color: #97A890; font-size: 14px; margin: 0;">30 Publicaciones de Liderazgo, FinTech & PropTech + Banner Ejecutivo</p>
      </div>

      <!-- Real Graphic Banner Rendered Inline (CID) -->
      <div style="text-align: center; margin: 25px 0;">
        <p style="color: #AFFF3E; font-size: 13px; font-weight: bold; margin-bottom: 8px;">🎨 BANNER VISUAL OFICIAL PARA LINKEDIN (ADJUNTO Y RENDERIZADO):</p>
        <img src="cid:banner_img" alt="Banner Oficial LinkedIn rebuske" style="width: 100%; max-width: 600px; border-radius: 16px; border: 1px solid rgba(184,255,59,0.35); box-shadow: 0 10px 30px rgba(0,0,0,0.5); display: block; margin: 0 auto;" />
      </div>

      <!-- Analysis -->
      ${analysisHtml}

      <!-- 30 Posts -->
      <h2 style="color: #B8FF3B; font-size: 22px; border-left: 4px solid #B8FF3B; padding-left: 12px; margin: 30px 0 20px 0;">📋 LAS 30 PUBLICACIONES OFICIALES PARA LINKEDIN</h2>
  `;

  inPosts.forEach((p) => {
    html += `
    <div style="background: rgba(22, 36, 19, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 12px;">
        <span style="color: #B8FF3B; font-weight: bold; font-size: 15px;">LINKEDIN #${p.num} · [${p.cat}]</span>
        <span style="background: rgba(255,255,255,0.08); color: #F4FBF1; padding: 3px 10px; border-radius: 8px; font-size: 11px;">${p.format}</span>
      </div>
      
      <h3 style="color: #FFFA70; font-size: 17px; margin: 0 0 10px 0;">${p.title}</h3>
      
      <div style="background: #0C120A; border-radius: 10px; padding: 14px; color: #F4FBF1; font-size: 14px; white-space: pre-wrap; margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.05);">${p.copy}</div>
      
      <!-- Required Laura Contact and Link -->
      <div style="background: rgba(184,255,59,0.08); border-left: 3px solid #B8FF3B; padding: 10px 14px; border-radius: 6px; margin-bottom: 10px; font-size: 13px;">
        🔗 <b>Plataforma & Registro Oficial:</b> <a href="https://rebuske.vercel.app/registro" style="color: #B8FF3B; text-decoration: none;">https://rebuske.vercel.app/registro</a><br/>
        💼 <b>Alianzas y Soporte Institucional (Laura):</b> <a href="https://wa.me/573043812882" style="color: #AFFF3E; text-decoration: none; font-weight: bold;">+57 304 381 2882</a>
      </div>

      <div style="color: #97A890; font-size: 12px;">
        <b>Hashtags Corporativos:</b> <span style="color: #AFFF3E;">${p.hashtags}</span>
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

export async function sendLinkedInEmail() {
  console.log('Enviando Correo 4: Campaña de LinkedIn (30 Posts + Banner PNG)...');
  const html = buildHtml();
  await sendRawMimeEmail({
    fromName: '🎨 Valeria & 💬 Laura · rebuske',
    to: TO_EMAIL,
    cc: CC_EMAIL,
    subject: '💼 [REBUSKE SOCIAL 4/4] PACK 30 PUBLICACIONES OFICIALES · LINKEDIN (FinTech + Formalización + Banner Gráfico)',
    htmlText: html,
    imageAttachment: {
      path: bannerPath,
      filename: 'banner_linkedin_rebuske.png'
    }
  });
  console.log('✅ Correo 4 (LinkedIn) enviado exitosamente a holarebuske@gmail.com con copia a camiloescobarr63@gmail.com.');
}

if (process.argv[1] && process.argv[1].endsWith('dispatch_linkedin_campaign.mjs')) {
  sendLinkedInEmail().catch(console.error);
}
