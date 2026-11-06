/**
 * ============================================================================
 * REBUSKE · DISPATCH CORREO 2: TIKTOK (30 GUIONES + BANNER VERTICAL + ESTRATEGIA)
 * ============================================================================
 */

import path from 'path';
import { sendRawMimeEmail, CAMPAIGN_DIR, TO_EMAIL, CC_EMAIL } from './email_sender_core.mjs';

const bannerPath = path.join(CAMPAIGN_DIR, 'banner_tiktok.png');

const analysisHtml = `
<div style="background: rgba(22, 36, 19, 0.7); border: 1px solid rgba(184, 255, 59, 0.3); border-radius: 16px; padding: 24px; margin-bottom: 30px;">
  <h2 style="color: #B8FF3B; font-family: 'Syne', Arial, sans-serif; margin-top: 0; font-size: 24px;">📊 ANÁLISIS ESTRATÉGICO PARA TIKTOK</h2>
  <table style="width: 100%; border-collapse: collapse; color: #F4FBF1; font-size: 14px;">
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E; width: 220px;">📐 Tamaño & Ratio Oficial:</td>
      <td style="padding: 10px;">
        • <b>Formato Exclusivo:</b> 1080 × 1920 px (Ratio 9:16 vertical a pantalla completa).<br/>
        • <b>Zona Segura:</b> Mantener textos importantes a 150px de los bordes superior e inferior para no taparlos con la descripción o los botones de TikTok.
      </td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E;">🗣️ Cómo se habla en TikTok:</td>
      <td style="padding: 10px;">
        Tono espontáneo, fresco, directo y paisa. Los primeros 3 segundos son de vida o muerte (gancho visual o dilema urgente: <i>"Se me inundó el apartamento un domingo"</i>). Nada de introducciones corporativas lentas. Se habla de "desvare", "despinche", "plata segura" y "cero enredos".
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold; color: #AFFF3E;">🏷️ Hashtags Más Virales en Colombia:</td>
      <td style="padding: 10px; color: #FFFA70;">
        #Medellin #Paisa #StorytimeMedellin #HumorPaisa #CosasQuePasanEnMedellin #DesvareHogar #PlomeroMedellin #TrucosDelHogar #ElectricidadCasera #rebuske #MujeresEnObra #ValleDeAburra #Antioquia #Wompi
      </td>
    </tr>
  </table>
</div>
`;

// 30 TikTok video scripts / posts
const tiktokPosts = [
  // --- BLOQUE 1: LO QUE OFRECEMOS Y CÓMO FUNCIONA (15 GUIONES) ---
  {
    num: 1,
    cat: "LO QUE OFRECEMOS",
    title: "POV: Se te estalló el tubo del baño un domingo a las 6 PM",
    hook: "🚨 [0-3s] Primer plano del chorro de agua salpicando la cámara: 'Parce, si esto te pasa un domingo en Medellín, no llames al número de un poste...'",
    script: "Voz en off: 'Antes uno llamaba a un número pegado con cinta en la esquina, le pedían $100.000 de anticipo por Nequi y el man se desaparecía. En rebuske abres la app, pides un plomero certificado y tu plata entra a la Bóveda Wompi. El técnico llega, te arregla el tubo y solo cuando tú dices que quedó melo, se le suelta el pago. Además tienes 48 horas de garantía escrita.'",
    cta: "Link en la bio para emergencias o regístrate en rebuske.vercel.app/registro",
    hashtags: "#Medellin #Plomería #Desvare #StorytimePaisa #rebuske"
  },
  {
    num: 2,
    cat: "LO QUE OFRECEMOS",
    title: "La Bóveda Wompi explicada con manzanas en 20 segundos",
    hook: "🍏 [0-3s] Mostrando un billete de $50.000: '¿Por qué nunca deberías pagarle a un técnico antes de que termine el trabajo?'",
    script: "Voz en off: 'Con la Bóveda Wompi de rebuske, tu dinero queda congelado en un cofre digital de Bancolombia. Ni la app ni el técnico pueden tocarlo. Cuando el plomero o electricista termina y te entrega el trabajo, tú entras a la app, oprimes 'Aprobar' y listo. Si algo no quedó bien, no se desembolsa. Así de simple.'",
    cta: "Prueba la app segura en rebuske.vercel.app/registro",
    hashtags: "#FintechPaisa #Wompi #SeguridadHogar #Medellin #rebuske"
  },
  {
    num: 3,
    cat: "LO QUE OFRECEMOS",
    title: "Mujeres plomeras y electricistas en Medellín: La rompieron",
    hook: "👩‍🔧 [0-3s] Mujer ajustando una llave inglesa con chispas de fondo: 'Decían que la fontanería no era para mujeres... miren esto.'",
    script: "Voz en off: 'En rebuske creamos el apartado 'Servicios por Ellas'. Técnicas certificadas en electricidad, plomería y aseo a fondo para quienes prefieren la minuciosidad, limpieza y confianza de una profesional mujer en su casa. El trabajo queda con garantía digital de 48h.'",
    cta: "Pide tu técnica en el apartado 'Servicios por Ellas' en rebuske.vercel.app/registro",
    hashtags: "#MujeresQueInspiran #MujeresEnObra #Medellin #rebuske"
  },
  {
    num: 4,
    cat: "LO QUE OFRECEMOS",
    title: "Te quedaste afuera del apartamento a las 2 AM",
    hook: "🔑 [0-3s] Mostrando la puerta cerrada y las llaves adentro por la ventana: 'Esta es la peor sensación del mundo...'",
    script: "Voz en off: 'No intentes meter una tarjeta de crédito porque vas a dañar la chapa. Entra a rebuske, pide cerrajería de urgencia y en minutos llega un cerrajero verificado con herramientas especiales de apertura limpia. Cero daños en la puerta y tarifa justa sin sorpresas.'",
    cta: "Guarda la app por si te pasa: rebuske.vercel.app/registro",
    hashtags: "#CerrajeriaMedellin #Encerrado #DesvarePaisa #rebuske"
  },
  {
    num: 5,
    cat: "LO QUE OFRECEMOS",
    title: "Llegada Prioritaria: El técnico llega en modo rayo por $3.333 COP",
    hook: "⚡ [0-3s] Moto arrancando en una loma de Medellín: '¿Sabías que por solo $3.333 pesos el técnico te atiende primero que a nadie?'",
    script: "Voz en off: 'Si tienes una emergencia brava, activa Llegada Prioritaria en rebuske. Por solo $3.333 COP extra a la tarifa normal, el técnico toma ruta prioritaria en su moto y llega a tu dirección sin escalas. Rápido, seguro y garantizado.'",
    cta: "Pide auxilio prioritario en rebuske.vercel.app/registro",
    hashtags: "#LlegadaPrioritaria #DesvareUrgente #Medellin #rebuske"
  },
  {
    num: 6,
    cat: "LO QUE OFRECEMOS",
    title: "3 cosas que un electricista pirata nunca te dirá",
    hook: "⚡ [0-3s] Enchufe quemado echando humo: 'Si tu electricista hace esto, ¡sácalo de tu casa ya!'",
    script: "Voz en off: '1. Te pone un breaker más grande para que no se caiga el taco (peligro de incendio). 2. Empalma cables con cinta aislante barata en vez de conectores de torsión. 3. Te cobra anticipo y te deja los cables al aire. En rebuske solo tenemos electricistas certificados RETIE con 48h de garantía escrita.'",
    cta: "Contrata electricistas de verdad en rebuske.vercel.app/registro",
    hashtags: "#PeligroElectrico #HogarSeguro #TipsCaseros #rebuske"
  },
  {
    num: 7,
    cat: "LO QUE OFRECEMOS",
    title: "Aseo profundo de cocina: El antes y después que da paz mental",
    hook: "🧼 [0-3s] Sartén con grasa pegada vs extractor reluciente: 'La satisfacción de ver esto no tiene precio...'",
    script: "Voz en off: 'Dejar la cocina brillando como de revista toma horas de fregar. Nuestras especialistas en aseo profundo limpian hornos, campanas, juntas de azulejos y esquinas difíciles con productos profesionales. Tú relájate el domingo, ellas dejan tu casa como nueva.'",
    cta: "Agenda tu aseo profundo en rebuske.vercel.app/registro",
    hashtags: "#LimpiezaExtrema #AntesYDespues #AseoMedellin #rebuske"
  },
  {
    num: 8,
    cat: "LO QUE OFRECEMOS",
    title: "Garantía de 48 horas: ¿Qué pasa si la gotera vuelve?",
    hook: "📜 [0-3s] Mostrando el PDF del acta en el celular: 'Esto ningún todero de esquina te lo va a dar jamás.'",
    script: "Voz en off: 'Cada vez que contratas en rebuske, se genera un Acta Digital de Garantía de 48 horas bajo la Ley 1480. Si el técnico te arregla una tubería y al día siguiente vuelve a botar agua, el profesional regresa de inmediato y lo soluciona sin cobrarte un centavo.'",
    cta: "Servicios con garantía real en rebuske.vercel.app/registro",
    hashtags: "#GarantiaEscrita #DerechosDelConsumidor #Medellin #rebuske"
  },
  {
    num: 9,
    cat: "LO QUE OFRECEMOS",
    title: "¿Por qué en Medellín ya nadie busca técnicos en volantes de postes?",
    hook: "🗑️ [0-3s] Arrancando un volante roto de un poste: '¿Le vas a meter a tu casa a alguien que solo conoces por un papel en la calle?'",
    script: "Voz en off: 'No sabes si tiene antecedentes, si sabe trabajar o si te va a cobrar el triple. En rebuske ves la cédula verificada, calificación de 1 a 5 estrellas de vecinos de tu mismo barrio y pagas por Wompi.'",
    cta: "Cambia a lo seguro en rebuske.vercel.app/registro",
    hashtags: "#MedellinSegura #NoTeArriesgues #rebuske"
  },
  {
    num: 10,
    cat: "LO QUE OFRECEMOS",
    title: "El truco para saber si tu calentador de agua está a punto de fallar",
    hook: "🔥 [0-3s] Primer plano a la llama del calentador: 'Si la llama no es azul, estás en problemas...'",
    script: "Voz en off: 'Si la llama sale amarilla o roja, significa que hay mala combustión y estás respirando monóxido. Además de que te vas a bañar con agua helada. Pide mantenimiento preventivo de gasodomésticos en rebuske y evita accidentes graves.'",
    cta: "Revisa tu calentador en rebuske.vercel.app/registro",
    hashtags: "#Calentadores #GasDomiciliario #TipsHogar #rebuske"
  },
  {
    num: 11,
    cat: "LO QUE OFRECEMOS",
    title: "Cerraduras inteligentes: Cómo modernizar tu puerta sin dañarla",
    hook: "📱 [0-3s] Abriendo puerta con huella en Medellín: 'Dile adiós a cargar 10 llaves pesadas en el bolsillo.'",
    script: "Voz en off: 'Instalar una chapa digital no es cuestión de taladrar a lo loco. Nuestros cerrajeros calibran el pasador milimétricamente para que la batería no se gaste forzando el motor. Instalación limpia y rápida.'",
    cta: "Cotiza tu instalación en rebuske.vercel.app/registro",
    hashtags: "#SmartHome #CerraduraDigital #Medellin #rebuske"
  },
  {
    num: 12,
    cat: "LO QUE OFRECEMOS",
    title: "¿Goteras en el techo cuando llueve en Medellín?",
    hook: "🌧️ [0-3s] Balde recogiendo agua del techo: 'La temporada de lluvias en el Valle de Aburrá no perdona tejas flojas.'",
    script: "Voz en off: 'Antes de que el cielo raso se caiga y te dañe los muebles, pide impermeabilización y cambio de tejas en rebuske. Selladores de alta calidad y mano de obra garantizada.'",
    cta: "Protege tu techo en rebuske.vercel.app/registro",
    hashtags: "#LluviasMedellin #TechoGoteras #Impermeabilizacion #rebuske"
  },
  {
    num: 13,
    cat: "LO QUE OFRECEMOS",
    title: "El detrás de cámaras de cómo filtramos a cada técnico",
    hook: "🔍 [0-3s] Mostrando pantalla de validación: 'Así revisamos los antecedentes judiciales antes de que un técnico pise tu casa.'",
    script: "Voz en off: 'Revisamos cédula, antecedentes en Policía, Procuraduría y Contraloría, y certificaciones técnicas. Solo el 30% de los que se postulan pasan el filtro de rebuske. Calidad y seguridad ante todo.'",
    cta: "Conoce a nuestros técnicos en rebuske.vercel.app/registro",
    hashtags: "#FiltroEstricto #SeguridadTotal #Medellin #rebuske"
  },
  {
    num: 14,
    cat: "LO QUE OFRECEMOS",
    title: "¿Qué significa el logo de la luciérnaga en rebuske?",
    hook: "🪲 [0-3s] Animación de la luciérnaga verde neón: 'Esta luciérnaga significa que nunca más vas a estar a oscuras ante una emergencia.'",
    script: "Voz en off: 'La luciérnaga paisa que enciende su luz en medio del problema. Ya sea plomería, cerrajería o electricidad, rebuske es tu guía de confianza.'",
    cta: "Descarga la app en rebuske.vercel.app/registro",
    hashtags: "#Luciernaga #MarcaPaisa #rebuskeApp"
  },
  {
    num: 15,
    cat: "LO QUE OFRECEMOS",
    title: "La app que NO te llena la memoria del celular",
    hook: "📱 [0-3s] Mensaje de 'Memoria llena' en el teléfono: '¿Tuviste que borrar fotos para descargar una app? Con rebuske no tienes que hacer eso.'",
    script: "Voz en off: 'Entras a rebuske.vercel.app en tu navegador, tocas 'Agregar a pantalla principal' y tienes una app completa de 0 megas. Abre en 1 segundo y funciona incluso con internet lento.'",
    cta: "Instálala ya en rebuske.vercel.app/registro",
    hashtags: "#PWA #HackTecnologico #AppLigera #rebuske"
  },

  // --- BLOQUE 2: ACCIÓN DE REGISTRARSE (15 GUIONES) ---
  {
    num: 16,
    cat: "ACCIÓN DE REGISTRO",
    title: "Te regalamos $15.000 COP para que arregles ese daño de una vez",
    hook: "💵 [0-3s] Mostrando billete de $15.000: '¿Tienes una llave goteando o un enchufe malo? Te damos plata para arreglarlo.'",
    script: "Voz en off: 'Solo por registrarte hoy como cliente en rebuske.vercel.app/registro, te llevas un bono directo de $15.000 COP aplicable a tu primera mano de obra. Deja de aplazar ese arreglo.'",
    cta: "Reclama tu bono en rebuske.vercel.app/registro",
    hashtags: "#BonoGratis #DescuentoHogar #Medellin #rebuske"
  },
  {
    num: 17,
    cat: "ACCIÓN DE REGISTRO",
    title: "Técnicos de Medellín: Dejen de regalar el 30% de su trabajo a otras apps",
    hook: "🛠️ [0-3s] Plomero con su caja de herramientas: 'Pille parce, ¿usted sabe cuánta plata le quitan otras aplicaciones por cada servicio?'",
    script: "Voz en off: 'Hasta el 30% se quedan de tu sudor. En rebuske abrimos la convocatoria de los 100 Primeros Técnicos Fundadores: solo pagas el 1% de comisión el primer mes y el cliente te paga asegurado por Wompi.'",
    cta: "Postúlate antes de que se llenen los 100 cupos en rebuske.vercel.app/registro",
    hashtags: "#PlomerosUnidos #TrabajoJusto #MedellinEmpleo #rebuskePRO"
  },
  {
    num: 18,
    cat: "ACCIÓN DE REGISTRO",
    title: "Cómo pedir un técnico verificado en 45 segundos (Tutorial)",
    hook: "⏱️ [0-3s] Cronómetro en mano: '¿Cuánto te demoras en pedir un plomero en rebuske? Vamos a cronometrarlo.'",
    script: "Voz en off: 'Paso 1: Entras a la página. Paso 2: Escoges plomería y pones tu comuna. Paso 3: Confirmas con Wompi protegido. 42 segundos y tu técnico ya va en camino.'",
    cta: "Haz la prueba en rebuske.vercel.app/registro",
    hashtags: "#TutorialPaisa #En45Segundos #rebuske"
  },
  {
    num: 19,
    cat: "ACCIÓN DE REGISTRO",
    title: "Si eres mujer y sabes de arreglos del hogar, te estamos buscando",
    hook: "👩‍🔧 [0-3s] Mujer con taladro en mano: 'Mujeres en Medellín que sepan de plomería, electricidad o aseo a fondo: esto les interesa.'",
    script: "Voz en off: 'En rebuske tenemos cientos de clientas esperando ser atendidas por mujeres en 'Servicios por Ellas'. Regístrate hoy, define tu horario y recibe pagos garantizados a tu cuenta.'",
    cta: "Inscríbete hoy en rebuske.vercel.app/registro",
    hashtags: "#MujeresTrabajando #ServiciosPorEllas #Medellin #rebuske"
  },
  {
    num: 20,
    cat: "ACCIÓN DE REGISTRO",
    title: "Deja de gastar gasolina cruzando todo Medellín para un trabajo",
    hook: "🛵 [0-3s] Moto en el taco de la 80: '¿Cansado de gastar 2 horas de trancón para ganarte $40.000 pesos?'",
    script: "Voz en off: 'rebuske te conecta solo con servicios en tu misma comuna. Si estás en Robledo, trabajas en Robledo. Si estás en Envigado, te salen servicios en Envigado. Menos gasolina, más plata en el bolsillo.'",
    cta: "Regístrate como profesional en rebuske.vercel.app/registro",
    hashtags: "#MenosTrafico #TrabajoCerca #rebuskePRO"
  },
  {
    num: 21,
    cat: "ACCIÓN DE REGISTRO",
    title: "¿Tienes dudas de un arreglo? Laura te responde por WhatsApp",
    hook: "💬 [0-3s] Pantalla de WhatsApp respondiendo al instante: '¿No sabes si tu daño necesita un plomero o un albañil?'",
    script: "Voz en off: 'No te preocupes. Escríbele directo a Laura en el WhatsApp de soporte de rebuske (+57 304 381 2882). Le mandas foto o video del daño y te dice exactamente qué servicio pedir y cuánto cuesta.'",
    cta: "Escribe a Laura o regístrate en rebuske.vercel.app/registro",
    hashtags: "#SoporteWhatsApp #LauraRebuske #Medellin #rebuske"
  },
  {
    num: 22,
    cat: "ACCIÓN DE REGISTRO",
    title: "No esperes al 24 de diciembre para arreglar las luces que no prenden",
    hook: "🎄 [0-3s] Árbol de navidad a oscuras: 'Se acerca Nochebuena y los enchufes no dan abasto...'",
    script: "Voz en off: 'Evita sobrecargar las extensiones con las luces navideñas. Agenda un electricista en rebuske para revisar los circuitos y pasar las fiestas en paz.'",
    cta: "Asegura tu fecha en rebuske.vercel.app/registro",
    hashtags: "#NavidadSegura #LucesNavideñas #rebuske"
  },
  {
    num: 23,
    cat: "ACCIÓN DE REGISTRO",
    title: "Insignia Nivel Oro: La clave para llenar tu agenda en enero",
    hook: "🥇 [0-3s] Medalla virtual dorada en pantalla: 'Técnico que se respete sabe que enero es el mes más duro del año... a menos que tengas esto.'",
    script: "Voz en off: 'Los técnicos que se registren ahora y mantengan 5 estrellas en diciembre reciben la Insignia Nivel Oro. En enero serás el primero que ven los clientes en el buscador.'",
    cta: "Gana tu insignia en rebuske.vercel.app/registro",
    hashtags: "#NivelOro #TrabajoConstante #rebuskePRO"
  },
  {
    num: 24,
    cat: "ACCIÓN DE REGISTRO",
    title: "Testimonio real de un electricista en Laureles",
    hook: "🗣️ [0-3s] Técnico en uniforme con probador de corriente: 'Antes me tocaba rogar para que me pagaran después de trabajar...'",
    script: "Voz en off: 'Con la Bóveda Wompi de rebuske sé que la plata ya está separada desde antes de salir de mi casa. Trabajo tranquilo y el cliente queda feliz porque le doy garantía.'",
    cta: "Únete a los técnicos fundadores en rebuske.vercel.app/registro",
    hashtags: "#TestimonioReal #ElectricistaPaisa #rebuske"
  },
  {
    num: 25,
    cat: "ACCIÓN DE REGISTRO",
    title: "¿Eres dueño de casa o arriendas por Airbnb en Medellín?",
    hook: "🏠 [0-3s] Huéspedes llegando a un Airbnb: 'Imagínate que al huésped se le tape el baño un viernes a la medianoche...'",
    script: "Voz en off: 'No pierdas tu calificación de Superhost. Ten rebuske guardado en el teléfono y despincha cualquier daño de fontanería o cerradura en minutos con factura y garantía.'",
    cta: "Registra tu propiedad en rebuske.vercel.app/registro",
    hashtags: "#AirbnbMedellin #AnfitrionesMedellin #rebuske"
  },
  {
    num: 26,
    cat: "ACCIÓN DE REGISTRO",
    title: "El botón secreto para hablar con una persona real y no con un bot",
    hook: "🤖 [0-3s] Robot diciendo 'Espere en línea': '¿Cansado de bots que no entienden nada de plomería?'",
    script: "Voz en off: 'En rebuske hablas directo con Laura en WhatsApp (+57 304 381 2882). Una persona real en Medellín que te orienta, te ayuda a elegir el técnico y sigue tu caso de principio a fin.'",
    cta: "Escríbenos a WhatsApp o regístrate en rebuske.vercel.app/registro",
    hashtags: "#AtencionHumana #CeroBots #rebuskeLaura"
  },
  {
    num: 27,
    cat: "ACCIÓN DE REGISTRO",
    title: "¿Tienes un taller mecánico o de cerrajería? Gana clientes corporativos",
    hook: "🏢 [0-3s] Edificio empresarial de Medellín: 'Las empresas ya no contratan toderos sin garantía legal.'",
    script: "Voz en off: 'Al vincularte a rebuske como técnico o empresa aliada, emites actas digitales de garantía de 48h con validez jurídica que te abren las puertas a contratos de mantenimiento corporativo.'",
    cta: "Vincula tu taller en rebuske.vercel.app/registro",
    hashtags: "#NegociosPaisa #CrecimientoLaboral #rebuske"
  },
  {
    num: 28,
    cat: "ACCIÓN DE REGISTRO",
    title: "Cero regateo: Tu trabajo técnico vale y aquí se respeta",
    hook: "🤝 [0-3s] Choque de puños entre técnico y cliente: '¿Por qué en Colombia la gente cree que arreglar un tubo es fácil?'",
    script: "Voz en off: 'En rebuske las tarifas son claras y justas. No tienes que rebajar tu trabajo para que te contraten. El cliente paga por seguridad y tú cobras lo que es.'",
    cta: "Sé parte de los fundadores en rebuske.vercel.app/registro",
    hashtags: "#TrabajoDigno #TarifasJustas #rebuskePRO"
  },
  {
    num: 29,
    cat: "ACCIÓN DE REGISTRO",
    title: "¿Cómo redimir tu bono de bienvenida paso a paso?",
    hook: "🎁 [0-3s] Dedo tocando el cupón de $15.000: 'Mira lo fácil que es ahorrarte $15.000 en tu primer servicio.'",
    script: "Voz en off: 'Entras a rebuske.vercel.app/registro, te inscribes como cliente con tu WhatsApp y automáticamente tu código de bono queda activo para tu primera reparación del hogar.'",
    cta: "Reclámalo ya en rebuske.vercel.app/registro",
    hashtags: "#AhorroMedellin #CuponHogar #rebuske"
  },
  {
    num: 30,
    cat: "ACCIÓN DE REGISTRO",
    title: "¡Última llamada! Cupos limitados para los 100 Técnicos Fundadores",
    hook: "⏳ [0-3s] Contador regresivo digital: 'Si eres electricista o plomero en Medellín, esta oportunidad se acaba ya.'",
    script: "Voz en off: 'Solo los primeros 100 profesionales reciben el 1% de comisión en el primer mes y posición prioritaria. No te quedes por fuera de la plataforma que está cambiando los servicios en Antioquia.'",
    cta: "Inscríbete hoy en rebuske.vercel.app/registro",
    hashtags: "#UltimosCupos #ConvocatoriaAbierta #rebuskePRO"
  }
];

function buildHtml() {
  let html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Pack Oficial TikTok · rebuske</title>
  </head>
  <body style="background-color: #0C120A; color: #F4FBF1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px;">
    <div style="max-width: 720px; margin: 0 auto; background: #121A0E; border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 30px; box-shadow: 0 15px 45px rgba(0,0,0,0.6);">
      
      <!-- Header -->
      <div style="text-align: center; border-bottom: 1px solid rgba(184,255,59,0.25); padding-bottom: 20px; margin-bottom: 25px;">
        <span style="background: rgba(184,255,59,0.15); color: #B8FF3B; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; letter-spacing: 2px;">REBUSKE SOCIAL SUITE · EMAIL 2 DE 4</span>
        <h1 style="color: #F4FBF1; font-size: 28px; margin: 15px 0 5px 0;">🎵 CAMPAÑA COMPLETA DE TIKTOK</h1>
        <p style="color: #97A890; font-size: 14px; margin: 0;">30 Guiones de Video con Hook de 3 Segundos + Banner Vertical + Hacks de Retención</p>
      </div>

      <!-- Real Graphic Banner Rendered Inline (CID) -->
      <div style="text-align: center; margin: 25px 0;">
        <p style="color: #AFFF3E; font-size: 13px; font-weight: bold; margin-bottom: 8px;">🎨 BANNER VISUAL OFICIAL PARA TIKTOK (ADJUNTO Y RENDERIZADO):</p>
        <img src="cid:banner_img" alt="Banner Oficial TikTok rebuske" style="width: 100%; max-width: 420px; border-radius: 20px; border: 1px solid rgba(184,255,59,0.35); box-shadow: 0 10px 30px rgba(0,0,0,0.5); display: block; margin: 0 auto;" />
      </div>

      <!-- Analysis -->
      ${analysisHtml}

      <!-- 30 Scripts -->
      <h2 style="color: #B8FF3B; font-size: 22px; border-left: 4px solid #B8FF3B; padding-left: 12px; margin: 30px 0 20px 0;">🎬 LOS 30 GUIONES Y PUBLICACIONES PARA TIKTOK</h2>
  `;

  tiktokPosts.forEach((p) => {
    html += `
    <div style="background: rgba(22, 36, 19, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 12px;">
        <span style="color: #B8FF3B; font-weight: bold; font-size: 15px;">TIKTOK #${p.num} · [${p.cat}]</span>
        <span style="background: rgba(184,255,59,0.15); color: #B8FF3B; padding: 3px 10px; border-radius: 8px; font-size: 11px;">Vertical 9:16</span>
      </div>
      
      <h3 style="color: #FFFA70; font-size: 17px; margin: 0 0 10px 0;">${p.title}</h3>
      
      <div style="background: rgba(184,255,59,0.06); border: 1px dashed rgba(184,255,59,0.4); border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; font-size: 13px; color: #B8FF3B;">
        <b>🎯 GANCHO INICIAL (0-3s):</b> ${p.hook}
      </div>

      <div style="background: #0C120A; border-radius: 10px; padding: 14px; color: #F4FBF1; font-size: 14px; white-space: pre-wrap; margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.05);">
        <b>🗣️ GUIÓN / VOZ EN OFF:</b>\n${p.script}
      </div>
      
      <!-- Required Laura Contact and Link -->
      <div style="background: rgba(184,255,59,0.08); border-left: 3px solid #B8FF3B; padding: 10px 14px; border-radius: 6px; margin-bottom: 10px; font-size: 13px;">
        📲 <b>CTA de Pantalla / Bio:</b> ${p.cta}<br/>
        💬 <b>WhatsApp de Soporte (Laura):</b> <a href="https://wa.me/573043812882" style="color: #AFFF3E; text-decoration: none; font-weight: bold;">+57 304 381 2882</a>
      </div>

      <div style="color: #97A890; font-size: 12px;">
        <b>Hashtags Virales:</b> <span style="color: #AFFF3E;">${p.hashtags}</span>
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

export async function sendTikTokEmail() {
  console.log('Enviando Correo 2: Campaña de TikTok (30 Guiones + Banner PNG)...');
  const html = buildHtml();
  await sendRawMimeEmail({
    fromName: '🎨 Valeria & 💬 Laura · rebuske',
    to: TO_EMAIL,
    cc: CC_EMAIL,
    subject: '🎵 [REBUSKE SOCIAL 2/4] PACK 30 PUBLICACIONES Y GUIONES · TIKTOK (Hooks + Copy + Hashtags + Banner Gráfico)',
    htmlText: html,
    imageAttachment: {
      path: bannerPath,
      filename: 'banner_tiktok_rebuske.png'
    }
  });
  console.log('✅ Correo 2 (TikTok) enviado exitosamente a holarebuske@gmail.com con copia a camiloescobarr63@gmail.com.');
}

if (process.argv[1] && process.argv[1].endsWith('dispatch_tiktok_campaign.mjs')) {
  sendTikTokEmail().catch(console.error);
}
