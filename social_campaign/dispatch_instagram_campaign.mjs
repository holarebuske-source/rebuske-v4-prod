/**
 * ============================================================================
 * REBUSKE · DISPATCH CORREO 1: INSTAGRAM (30 POSTS + BANNER GRÁFICO + ESTRATEGIA)
 * ============================================================================
 */

import path from 'path';
import { sendRawMimeEmail, CAMPAIGN_DIR, TO_EMAIL, CC_EMAIL } from './email_sender_core.mjs';

const bannerPath = path.join(CAMPAIGN_DIR, 'banner_instagram.png');

const analysisHtml = `
<div style="background: rgba(22, 36, 19, 0.7); border: 1px solid rgba(184, 255, 59, 0.3); border-radius: 16px; padding: 24px; margin-bottom: 30px;">
  <h2 style="color: #B8FF3B; font-family: 'Syne', Arial, sans-serif; margin-top: 0; font-size: 24px;">📊 ANÁLISIS ESTRATÉGICO PARA INSTAGRAM</h2>
  <table style="width: 100%; border-collapse: collapse; color: #F4FBF1; font-size: 14px;">
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E; width: 220px;">📐 Tamaños & Ratios Oficiales:</td>
      <td style="padding: 10px;">
        • <b>Post Vertical (Recomendado):</b> 1080 × 1350 px (Ratio 4:5 - Ocupa más pantalla en el feed).<br/>
        • <b>Post Cuadrado / Carruseles:</b> 1080 × 1080 px (Ratio 1:1 - Ideal para guías paso a paso).<br/>
        • <b>Reels & Historias:</b> 1080 × 1920 px (Ratio 9:16 - Formato inmersivo vertical).
      </td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E;">🗣️ Cómo se habla en Instagram:</td>
      <td style="padding: 10px;">
        Tono visual, aspiracional, estético y confiable. El usuario de Medellín en Instagram busca soluciones de calidad para su hogar (El Poblado, Laureles, Envigado, Belén, Sabaneta). Se valora la tranquilidad, el diseño impecable, la puntualidad y la seguridad de no ser estafado con anticipos.
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E;">🏷️ Hashtags Más Usados y Virales:</td>
      <td style="padding: 10px; color: #FFFA70;">
        #Medellin #ServiciosMedellin #HogarMedellin #PlomeriaMedellin #ElectricistasMedellin #CerrajeriaMedellin #AseoMedellin #PobladoMedellin #LaurelesMedellin #Envigado #Sabaneta #rebuske #WompiSeguro #Garantia48h #ServiciosPorEllas #MujeresEnObra #HogarSeguro #DesvareMedellin
      </td>
    </tr>
  </table>
</div>
`;

// 30 Posts for Instagram
const postsData = [
  // --- BLOQUE 1: LO QUE OFRECEMOS Y CÓMO FUNCIONA (15 POSTS) ---
  {
    num: 1,
    cat: "LO QUE OFRECEMOS",
    title: "La Bóveda Wompi: ¿Por qué en rebuske nunca pierdes tu plata?",
    format: "Carrusel Educativo (1080x1080 px)",
    copy: "Seamos honestos: ¿cuántas veces le diste un anticipo a un técnico y el trabajo quedó a medias o desapareció? 😤\n\nEn rebuske cambiamos las reglas del juego en Medellín con nuestra Bóveda Wompi (Bancolombia) 🔒.\n\nCuando solicitas un fontanero, electricista o cerrajero, tu pago entra en custodia protegida. El técnico realiza el trabajo, tú lo revisas con calma, y SOLO cuando autorizas que quedó impecable, liberamos el dinero a su cuenta.\n\nCero riesgos. Cero estrés. Servicios con garantía escrita de 48 horas.",
    hashtags: "#rebuske #Medellin #SeguridadHogar #BovelaWompi #PlomeriaMedellin #CeroEstafas"
  },
  {
    num: 2,
    cat: "LO QUE OFRECEMOS",
    title: "¿Gotera traicionera? Plomería con Acta de Garantía Escrita de 48h",
    format: "Post Vertical (1080x1350 px)",
    copy: "Una fuga de agua un domingo por la tarde no espera 💧. En rebuske conectas con plomeros y fontaneras verificadas en tu misma comuna.\n\nLo mejor: cada reparación incluye un Acta Digital de Garantía de 48 horas con hash de seguridad bajo la Ley 1480 del Consumidor. Si la gotera vuelve dentro de las 48h, el profesional regresa sin cobrarte un solo peso más.",
    hashtags: "#PlomeríaMedellin #GoterasMedellin #ServiciosDelHogar #LaurelesMedellin #PobladoMedellin"
  },
  {
    num: 3,
    cat: "LO QUE OFRECEMOS",
    title: "Apartado Exclusivo: 'Servicios por Ellas' en Medellín",
    format: "Reel / Foto Destacada (1080x1350 px)",
    copy: "En Medellín, las mujeres se están tomando los oficios técnicos con una minuciosidad impecable 👩‍🔧✨.\n\nPresentamos 'Servicios por Ellas': un espacio dentro de rebuske donde puedes contratar exclusivamente a mujeres profesionales certificadas en aseo a fondo, fontanería, electricidad y mantenimiento.\n\nSeguridad para tu hogar, trabajo digno y respaldo 100% garantizado.",
    hashtags: "#ServiciosPorEllas #MujeresEnObra #MujeresMedellin #EquidadLaboral #rebuske"
  },
  {
    num: 4,
    cat: "LO QUE OFRECEMOS",
    title: "¿Te quedaste encerrado en tu propio apartamento?",
    format: "Carrusel de Emergencia (1080x1080 px)",
    copy: "Saliste a botar la basura o volviste tarde de trabajar y la llave no gira... 🔑🚪 Todos hemos sentido ese frío en el estómago.\n\nNo te arriesgues llamando al número de un poste sin saber quién entrará a tu casa. En rebuske encuentras cerrajeros residenciales con antecedentes verificados, apertura no destructiva y tarifa transparente antes de confirmar.",
    hashtags: "#CerrajeriaMedellin #CerrajeroUrgente #MedellinNoche #SeguridadResidencial #rebuske"
  },
  {
    num: 5,
    cat: "LO QUE OFRECEMOS",
    title: "Llegada Prioritaria ⚡: El técnico llega más rápido por solo +$3.333 COP",
    format: "Post Visual Ébano & Lima (1080x1350 px)",
    copy: "¿El inodoro se rebosó o hay un corto circuito antes de una reunión importante? 🚨\n\nActiva la opción '⚡ Llegada Prioritaria' al pedir tu servicio en rebuske. Por solo $3.333 COP adicionales a la tarifa estándar, el profesional más cercano engrana su ruta directa en moto para llegar a tu puerta en tiempo récord.",
    hashtags: "#DesvareRapido #LlegadaPrioritaria #MedellinExpress #ServiciosMedellin #rebuske"
  },
  {
    num: 6,
    cat: "LO QUE OFRECEMOS",
    title: "Electricidad Segura: Dile adiós a los tacos caídos y cortos sorpresa",
    format: "Post Informativo (1080x1350 px)",
    copy: "El cableado de tu casa no es un juego ⚡. Una mala instalación puede dañar tu nevera o provocar un conato de incendio.\n\nEn rebuske todos nuestros electricistas manejan normativa RETIE, diagnóstico de sobrecargas, balanceo de cargas y cambio de breakers con instrumental certificado. Protege a tu familia y tu patrimonio.",
    hashtags: "#ElectricistasMedellin #NormaRetie #CortosElectricos #HogarSeguro #rebuske"
  },
  {
    num: 7,
    cat: "LO QUE OFRECEMOS",
    title: "Aseo Profundo & Desinfección: Tu casa radiante sin mover un dedo",
    format: "Reel / Antes y Después (1080x1920 px)",
    copy: "Limpiar a fondo la grasa del extractor, desmanchar las juntas de los baños y dejar los vidrios impecables toma todo un fin de semana 🧼🧽.\n\nNuestras especialistas en aseo profundo llegan con técnica profesional y detalle milimétrico. Tú descansas, tu casa queda oliendo a nuevo y con pago retenido en Wompi.",
    hashtags: "#AseoProfundo #LimpiezaMedellin #HogarLimpio #FinDeSemanaPaisa #rebuske"
  },
  {
    num: 8,
    cat: "LO QUE OFRECEMOS",
    title: "¿Cómo verificamos a los profesionales en rebuske?",
    format: "Carrusel de Transparencia (1080x1080 px)",
    copy: "Para nosotros, abrirle la puerta de tu hogar a un técnico requiere confianza absoluta 🛡️.\n\nCada técnico en rebuske pasa por un filtro de 4 pasos:\n1. Validación de identidad biométrica y cédula.\n2. Verificación de antecedentes judiciales y disciplinarios.\n3. Certificación de experiencia y referencias comprobables.\n4. Firma del compromiso de garantía escrita de 48 horas.",
    hashtags: "#ConfianzaTotal #FiltroDeSeguridad #TecnicosMedellin #rebuskeSeguro"
  },
  {
    num: 9,
    cat: "LO QUE OFRECEMOS",
    title: "Tarifas Transparentes por Comunas: Sin cobros sorpresa",
    format: "Infografía de Precios (1080x1350 px)",
    copy: "¿Cansado de que el técnico mire tu fachada y según eso invente el precio? 💸 En rebuske implementamos la Matriz Justa de Tarifas por Comunas.\n\nSabes exactamente cuánto pagarás desde el inicio. El precio pactado en la app es el que se cobra. Ni un peso más, ni letras chiquitas.",
    hashtags: "#TarifasJustas #PreciosClaros #SinSorpresas #EconomiaMedellin #rebuske"
  },
  {
    num: 10,
    cat: "LO QUE OFRECEMOS",
    title: "Mantenimiento Preventivo de Calentadores a Gas",
    format: "Post Educativo (1080x1080 px)",
    copy: "¿El agua caliente se corta a la mitad de la ducha o sale olor a gas? ⚠️\n\nUn calentador sin mantenimiento anual acumula monóxido de carbono y sarro. Nuestros técnicos certificados en gasodomésticos revisan diafragmas, ductos de evacuación y calibran la llama para que te bañes con total tranquilidad.",
    hashtags: "#CalentadoresMedellin #Gasodomesticos #MantenimientoHogar #rebuske"
  },
  {
    num: 11,
    cat: "LO QUE OFRECEMOS",
    title: "Instalación de Cerraduras Inteligentes y Ojos Mágicos Digitales",
    format: "Post Modernización (1080x1350 px)",
    copy: "Lleva la seguridad de tu casa al siglo XXI 📲🔓. Instalar una cerradura digital o con huella requiere cortes limpios en madera o metal para no debilitar el marco.\n\nNuestros cerrajeros expertos te dejan la cerradura configurada con tu app en menos de 90 minutos.",
    hashtags: "#SmartHomeMedellin #CerradurasDigitales #SeguridadInteligente #rebuske"
  },
  {
    num: 12,
    cat: "LO QUE OFRECEMOS",
    title: "¿Humedades en el techo después de un aguacero paisa?",
    format: "Carrusel de Soluciones (1080x1080 px)",
    copy: "Los aguaceros de Medellín no perdonan las tejas corridas ni las terrazas sin impermeabilizar 🌧️🏠.\n\nDetectamos el origen real de la humedad (filtración, capilaridad o tubería rota) y aplicamos selladores de alta duración con garantía escrita.",
    hashtags: "#ImpermeabilizacionMedellin #Humedades #LluviasMedellin #rebuske"
  },
  {
    num: 13,
    cat: "LO QUE OFRECEMOS",
    title: "Respaldo Legal de Ley 1480 en la palma de tu mano",
    format: "Post Institucional (1080x1080 px)",
    copy: "En Colombia, la Ley 1480 protege al consumidor, pero en los servicios informales nadie responde 📑.\n\nrebuske es la primera plataforma en Medellín que emite automáticamente un Acta Digital con validez legal por cada servicio completado. Duerme con la tranquilidad de que tu inversión está blindada.",
    hashtags: "#EstatutoDelConsumidor #Ley1480 #GarantiaReal #rebuskeColombia"
  },
  {
    num: 14,
    cat: "LO QUE OFRECEMOS",
    title: "La Luciérnaga de rebuske: Tu aliada en la noche",
    format: "Post de Marca (1080x1080 px)",
    copy: "¿Por qué una luciérnaga? 🪲💡 Porque cuando todo se apaga en casa (se va la luz, se rompe un tubo o te quedas sin llaves), rebuske es esa pequeña luz verde que llega a iluminar y resolver tu problema con calidez y maestría.",
    hashtags: "#LuciernagaRebuske #RutaDeLuz #MedellinBrilla #rebuskeApp"
  },
  {
    num: 15,
    cat: "LO QUE OFRECEMOS",
    title: "PWA Instalable: Una app que no te llena la memoria del teléfono",
    format: "Reel / Demo de Pantalla (1080x1920 px)",
    copy: "¿Harto de apps pesadas que te piden borrar fotos para poder instalarse? 📱\n\nrebuske funciona con tecnología PWA de última generación: entras a https://rebuske.vercel.app, le das a 'Agregar a pantalla de inicio' y listo. Acceso instantáneo en pantalla completa sin ocupar espacio.",
    hashtags: "#PWA #TecnologiaLigera #AppMedellin #rebuske"
  },

  // --- BLOQUE 2: ACCIÓN DE REGISTRARSE (15 POSTS) ---
  {
    num: 16,
    cat: "ACCIÓN DE REGISTRO",
    title: "Bono de Bienvenida: $15.000 COP para tu primer servicio",
    format: "Post Promocional (1080x1350 px)",
    copy: "¿Tienes una llave goteando o un enchufe que echa chispas? 🎁\n\nRegístrate hoy mismo como cliente en rebuske y recibe un bono exclusivo de $15.000 COP para redimir en tu primera mano de obra.\n\nSolo te toma 30 segundos. ¡Asegura tu bono antes de que se agoten los cupos de lanzamiento!",
    hashtags: "#BonoBienvenida #DescuentoMedellin #ServiciosDelHogar #rebuske"
  },
  {
    num: 17,
    cat: "ACCIÓN DE REGISTRO",
    title: "Convocatoria para Técnicos: Los 100 Primeros Fundadores",
    format: "Post de Reclutamiento PRO (1080x1350 px)",
    copy: "Atención electricistas, plomeros, cerrajeros y técnicas de aseo en Medellín 🛠️:\n\n¿Cansado de que otras plataformas te quiten el 25% o 30% de tu sudor? En rebuske apoyamos al trabajador independiente.\n\nÚnete a los 100 Técnicos Fundadores y disfruta de solo el 1% de comisión durante tu primer mes, clientes directos en tu comuna y pago 100% asegurado en Bóveda Wompi.",
    hashtags: "#TrabajoMedellin #PlomerosMedellin #ElectricistasAntioquia #EmpleoMedellin #rebuskePRO"
  },
  {
    num: 18,
    cat: "ACCIÓN DE REGISTRO",
    title: "Registra tu casa en 1 minuto y ten un auxilio siempre listo",
    format: "Carrusel Paso a Paso (1080x1080 px)",
    copy: "No esperes a tener el agua hasta los tobillos para buscar un plomero ⏱️.\n\n1. Entra a rebuske.vercel.app/registro\n2. Ingresa tu nombre y tu barrio en Medellín\n3. Guarda la app en tu pantalla de inicio\n\nListo. Cuando ocurra una emergencia, tienes a los mejores técnicos a un solo toque.",
    hashtags: "#PrevencionHogar #HogarMedellin #RegistroFacil #rebuske"
  },
  {
    num: 19,
    cat: "ACCIÓN DE REGISTRO",
    title: "Mujeres Técnicas: Tu talento merece visibilidad y respeto",
    format: "Post Empoderamiento (1080x1350 px)",
    copy: "Si eres mujer y tienes experiencia en electricidad, fontanería, pintura o aseo especializado, rebuske es tu casa 💜.\n\nCon 'Servicios por Ellas' conectas con clientas que buscan exclusivamente profesionales mujeres para sus hogares. Pago garantizado y tarifas justas.",
    hashtags: "#MujeresTrabajadoras #ServiciosPorEllas #PoderFemenino #Medellin #rebuske"
  },
  {
    num: 20,
    cat: "ACCIÓN DE REGISTRO",
    title: "Gana clientes recurrentes en tu propio barrio (Sin gastar en gasolina)",
    format: "Post Para Técnicos (1080x1080 px)",
    copy: "Si vives en Belén, atiende en Belén. Si estás en Laureles, trabaja en Laureles 🛵.\n\nEl algoritmo de geolocalización de rebuske te asigna solicitudes dentro de tu perímetro para que no pierdas horas metido en el tráfico del Valle de Aburrá. Regístrate como profesional hoy.",
    hashtags: "#TrabajoLocal #MedellinSinTrafico #PlomeroCercano #rebuskePRO"
  },
  {
    num: 21,
    cat: "ACCIÓN DE REGISTRO",
    title: "¿Administras un edificio o conjunto residencial en Medellín?",
    format: "Post B2B / Copropiedades (1080x1350 px)",
    copy: "Evita reclamos de copropietarios por técnicos informales que dejan daños en las zonas comunes o en las redes matrices 🏢.\n\nRegistra tu conjunto en rebuske para acceder a una red de técnicos certificados con póliza, factura y garantía escrita de 48 horas.",
    hashtags: "#PropiedadHorizontal #EdificiosMedellin #AdministradoresPoblado #rebuske"
  },
  {
    num: 22,
    cat: "ACCIÓN DE REGISTRO",
    title: "Olvídate de buscar plomeros en postes de luz o papeles viejos",
    format: "Meme / Gráfico Comparativo (1080x1080 px)",
    copy: "Buscar un técnico llamando a un número rayado en un poste es jugar a la ruleta rusa con la seguridad de tu casa 🎲❌.\n\nEn rebuske ves foto, calificaciones reales de vecinos, antecedentes verificados y pagas de forma protegida. Regístrate gratis ahora.",
    hashtags: "#SeguridadFamiliar #MedellinInteligente #rebuskeApp"
  },
  {
    num: 23,
    cat: "ACCIÓN DE REGISTRO",
    title: "Técnico Independiente: Cobra tu mano de obra sin que te regateen",
    format: "Post Valor Profesional (1080x1350 px)",
    copy: "Estudiaste, compraste tus herramientas y sabes lo que vale tu tiempo 🧰. En rebuske respetamos tu oficio.\n\nEl cliente deposita el valor en la Bóveda Wompi antes de que salgas de tu casa, garantizando que tu dinero ya está reservado para ti. Regístrate como profesional fundador.",
    hashtags: "#ValorTecnico #CeroRegateo #TrabajoJusto #rebuske"
  },
  {
    num: 24,
    cat: "ACCIÓN DE REGISTRO",
    title: "Prepara tu casa para Navidad: Cupos limitados de aseo profundo",
    format: "Post Estacional Navideño (1080x1350 px)",
    copy: "Las fiestas se acercan y la casa tiene que estar impecable para recibir a la familia 🎄✨.\n\nNuestras expertas en aseo y desinfección ya tienen agenda abierta. Regístrate hoy y asegura tu fecha antes del 20 de diciembre.",
    hashtags: "#NavidadMedellin #HogarImpecable #AseoNavideno #rebuske"
  },
  {
    num: 25,
    cat: "ACCIÓN DE REGISTRO",
    title: "Tu primera reparación respaldada en solo 3 clics",
    format: "Demo Animado / Gráfico (1080x1350 px)",
    copy: "¿Fuga en el sifón? ¿El bombillo no prende? ¿Cerradura trabada?\n\nNo te compliques la vida. Entra a rebuske.vercel.app/registro, elige tu categoría y un profesional verificado estará en camino.",
    hashtags: "#DesvareRapido #HogarPaisa #rebuske"
  },
  {
    num: 26,
    cat: "ACCIÓN DE REGISTRO",
    title: "¿Tienes un taller o negocio técnico? Sube de nivel con rebuske",
    format: "Post Para Talleres (1080x1080 px)",
    copy: "Si eres maestro de obra o lideras una cuadrilla de mantenimiento, digitaliza tu operación con rebuske. Recibe pagos por Wompi, emite actas de garantía digitales y fideliza clientes corporativos.",
    hashtags: "#NegociosMedellin #MaestrosDeObra #rebuskeEmpresas"
  },
  {
    num: 27,
    cat: "ACCIÓN DE REGISTRO",
    title: "Insignia Nivel Oro 🥇: Prioridad #1 para técnicos cumplidos",
    format: "Post Gamificación PRO (1080x1350 px)",
    copy: "Los técnicos que completen sus servicios con 5 estrellas y cero reclamos reciben la Insignia Nivel Oro de rebuske. Eso significa aparecer en los primeros lugares de búsqueda durante todo enero, el mes de mayor demanda del año.",
    hashtags: "#NivelOro #ExitoLaboral #rebuskePRO"
  },
  {
    num: 28,
    cat: "ACCIÓN DE REGISTRO",
    title: "¿Vives solo en Medellín? Seguridad absoluta al abrir tu puerta",
    format: "Post Seguridad Persona Sola (1080x1350 px)",
    copy: "Abrirle la puerta a un desconocido da miedo, especialmente si vives solo/a 🚪🔒. En rebuske sabes el nombre, foto, documento y calificación del técnico antes de que llegue. Y si lo prefieres, puedes solicitar a una mujer técnica en 'Servicios por Ellas'.",
    hashtags: "#SeguridadEnCasa #Tranquilidad #rebuske"
  },
  {
    num: 29,
    cat: "ACCIÓN DE REGISTRO",
    title: "Cero comisiones abusivas: El modelo que cuida el bolsillo paisa",
    format: "Post Transparencia Financiera (1080x1080 px)",
    copy: "Mientras otras aplicaciones le cobran hasta el 35% al técnico y le inflan la tarifa al usuario, en rebuske cobramos una micro-tarifa justa para sostener la plataforma y la Bóveda Wompi. Todos ganan.",
    hashtags: "#ComercioJusto #EconomiaSocial #rebuskeMedellin"
  },
  {
    num: 30,
    cat: "ACCIÓN DE REGISTRO",
    title: "¡Últimos 15 cupos para Técnicos Fundadores con 1% de comisión!",
    format: "Post Cuenta Regresiva (1080x1350 px)",
    copy: "Ya casi completamos los 100 técnicos fundadores de rebuske en el Valle de Aburrá 🚨.\n\nNo dejes pasar el beneficio de pagar solo el 1% de comisión durante todo tu primer mes. Regístrate en 2 minutos antes del cierre de convocatoria.",
    hashtags: "#UltimosCupos #OportunidadLaboral #FundadoresRebuske #Medellin"
  }
];

function buildHtml() {
  let html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Pack Oficial Instagram · rebuske</title>
  </head>
  <body style="background-color: #0C120A; color: #F4FBF1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px;">
    <div style="max-width: 720px; margin: 0 auto; background: #121A0E; border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 30px; box-shadow: 0 15px 45px rgba(0,0,0,0.6);">
      
      <!-- Header -->
      <div style="text-align: center; border-bottom: 1px solid rgba(184,255,59,0.25); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="background: rgba(184,255,59,0.15); color: #B8FF3B; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; letter-spacing: 2px;">REBUSKE SOCIAL SUITE · EMAIL 1 DE 4</span>
        <h1 style="color: #F4FBF1; font-size: 28px; margin: 15px 0 5px 0;">📸 CAMPAÑA COMPLETA DE INSTAGRAM</h1>
        <p style="color: #97A890; font-size: 14px; margin: 0;">30 Publicaciones Listas para Publicar + Banner Oficial + Guía de Estilo</p>
      </div>

      <!-- Real Graphic Banner Rendered Inline (CID) -->
      <div style="text-align: center; margin: 25px 0;">
        <p style="color: #AFFF3E; font-size: 13px; font-weight: bold; margin-bottom: 8px;">🎨 BANNER VISUAL OFICIAL PARA INSTAGRAM (ADJUNTO Y RENDERIZADO):</p>
        <img src="cid:banner_img" alt="Banner Oficial Instagram rebuske" style="width: 100%; max-width: 600px; border-radius: 16px; border: 1px solid rgba(184,255,59,0.35); box-shadow: 0 10px 30px rgba(0,0,0,0.5); display: block; margin: 0 auto;" />
      </div>

      <!-- Analysis -->
      ${analysisHtml}

      <!-- 30 Posts -->
      <h2 style="color: #B8FF3B; font-size: 22px; border-left: 4px solid #B8FF3B; padding-left: 12px; margin: 30px 0 20px 0;">📋 LAS 30 PUBLICACIONES OFICIALES PARA INSTAGRAM</h2>
  `;

  postsData.forEach((p) => {
    html += `
    <div style="background: rgba(22, 36, 19, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 12px;">
        <span style="color: #B8FF3B; font-weight: bold; font-size: 15px;">POST #${p.num} · [${p.cat}]</span>
        <span style="background: rgba(255,255,255,0.08); color: #F4FBF1; padding: 3px 10px; border-radius: 8px; font-size: 11px;">${p.format}</span>
      </div>
      
      <h3 style="color: #FFFA70; font-size: 17px; margin: 0 0 10px 0;">${p.title}</h3>
      
      <div style="background: #0C120A; border-radius: 10px; padding: 14px; color: #F4FBF1; font-size: 14px; white-space: pre-wrap; margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.05);">${p.copy}</div>
      
      <!-- Required Laura Contact and Link -->
      <div style="background: rgba(184,255,59,0.08); border-left: 3px solid #B8FF3B; padding: 10px 14px; border-radius: 6px; margin-bottom: 10px; font-size: 13px;">
        🔗 <b>Enlace de Registro Oficial:</b> <a href="https://rebuske.vercel.app/registro" style="color: #B8FF3B; text-decoration: none;">https://rebuske.vercel.app/registro</a><br/>
        💬 <b>WhatsApp de Soporte (Laura):</b> <a href="https://wa.me/573043812882" style="color: #AFFF3E; text-decoration: none; font-weight: bold;">+57 304 381 2882</a>
      </div>

      <div style="color: #97A890; font-size: 12px;">
        <b>Hashtags:</b> <span style="color: #AFFF3E;">${p.hashtags}</span>
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

export async function sendInstagramEmail() {
  console.log('Enviando Correo 1: Campaña de Instagram (30 Posts + Banner PNG)...');
  const html = buildHtml();
  await sendRawMimeEmail({
    fromName: '🎨 Valeria & 💬 Laura · rebuske',
    to: TO_EMAIL,
    cc: CC_EMAIL,
    subject: '📸 [REBUSKE SOCIAL 1/4] PACK 30 PUBLICACIONES · INSTAGRAM (Copy + Hashtags + Tamaños + Banner Gráfico)',
    htmlText: html,
    imageAttachment: {
      path: bannerPath,
      filename: 'banner_instagram_rebuske.png'
    }
  });
  console.log('✅ Correo 1 (Instagram) enviado exitosamente a holarebuske@gmail.com con copia a camiloescobarr63@gmail.com.');
}

if (process.argv[1] && process.argv[1].endsWith('dispatch_instagram_campaign.mjs')) {
  sendInstagramEmail().catch(console.error);
}
