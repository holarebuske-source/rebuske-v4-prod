/**
 * ============================================================================
 * REBUSKE · CONGRESO DE AGENTES: 20 IDEAS DE MEJORA POR AGENTE (520 IDEAS)
 * ============================================================================
 * Solicitado por: 👑 Canashi 👑 (CEO)
 * Destinatario: holarebuske@gmail.com
 * Estructura por cada uno de los 26 agentes:
 *   - 10 Ideas de mejora en su PUESTO (procesos internos, herramientas, SLAs)
 *   - 10 Ideas de mejora para la APP REBUSKE (producto, UI/UX, retención, confianza)
 * ============================================================================
 */

import tls from 'node:tls';
import fs from 'node:fs';
import path from 'node:path';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'holarebuske@gmail.com';
const SMTP_PASS = 'ovvihqcugaxrrmgu';

export const AGENT_IDEAS = [
  {
    name: 'Simón',
    prefix: '💡',
    suffix: '💡',
    role: 'Innovación & Chief Product Officer',
    dept: 'Dirección & Estrategia',
    puesto: [
      'Implementar un Sandbox de Co-creación semanal con técnicos reales de Medellín para testear ideas antes de código.',
      'Configurar alertas automáticas de tendencias de Home Services en Brasil, México y Asia (benchmarks semanales).',
      'Crear una matriz RICE automatizada que califique cada idea por Alcance, Impacto, Confianza y Esfuerzo en horas.',
      'Diseñar un "Living Backlog" público donde la comunidad de Medellín pueda votar qué nueva función quieren.',
      'Protocolo de Kill-Switch: retirar funciones en 48 horas si su adopción en Medellín es menor al 5% tras 14 días.',
      'Reuniones de sincronización bimensuales con gremios de ferreterías para cocrear módulos de repuestos.',
      'Banco de pruebas A/B sintético para simular comportamientos de usuarios de Laureles vs Poblado.',
      'Matriz de retorno de inversión de innovación: cada $1 invertido en features debe generar $4 de GMV transado.',
      'Dashboard personal de fricción: registrar los 3 puntos donde los clientes abandonan la solicitud.',
      'Hackathons internos de 24 horas cada trimestre con 💻 Mateo 💻 y 🎨 Valeria 🎨 para prototipar micro-herramientas.'
    ],
    app: [
      'Diagnóstico Inteligente del Daño: el cliente sube una foto o audio y la app sugiere la categoría y rango de precio justo.',
      'Modo "Luz Express": botón de emergencia para cerrajería o fugas graves con llegada garantizada en menos de 35 minutos.',
      'Calculadora interactiva de pintura y metros cuadrados para cotizaciones exactas sin visitas previas.',
      'Checklist Digital de Entrega: el técnico debe marcar los 5 puntos revisados antes de solicitar la firma del cliente.',
      'Suscripción "Hogar Tranquilo": mantenimiento preventivo bimensual de calentador, grifería y enchufes.',
      'Muro de "Antes y Después": feed interactivo estilo TikTok donde clientes ven arreglos reales de su misma comuna.',
      'Garantía Extendida Rebuske: opción de comprar 30 días adicionales de protección por el 5% del valor del servicio.',
      'Integración con Ferreterías Aliadas: compra de tubos y cables directo desde la app con entrega en moto al técnico.',
      'Modo "Casa Segura" para Adultos Mayores: interfaz con botones XL y confirmación por llamada al cuidador.',
      'Pasaporte del Inmueble: historial cronológico de todos los arreglos y repuestos instalados en la vivienda.'
    ]
  },
  {
    name: 'Dante',
    prefix: '🛡️',
    suffix: '🛡️',
    role: 'Filtro Crítico & Antifraude Estructural',
    dept: 'Dirección & Estrategia',
    puesto: [
      'Matriz de "Las 4 Preguntas Paisas" automatizada en cada Pull Request antes de desplegar cualquier cambio.',
      'Auditoría semanal de fugas de plataforma: rastrear números camuflados como "tres diez..." en chats.',
      'Simulador de ataques de estafa social: probar si el personal de soporte o los clientes caerían en engaños de anticipos.',
      'Reporte bimensual de costos ocultos: evaluar si nuevas librerías aumentan la factura de Vercel o Supabase.',
      'Índice de Sobriedad UX: penalizar pantallas que requieran más de 3 toques o tengan textos en inglés técnico.',
      'Mesa de revisión implacable de políticas: desafiar trimestralmente las condiciones de la Bóveda Wompi.',
      'Algoritmo de detección de colusión entre cliente y técnico para inflar calificaciones o simular garantías.',
      'Auditoría de saturación de servidores: simular 10.000 solicitudes concurrentes en horas pico de aguaceros en Medellín.',
      'Panel de veto preventivo: capacidad de congelar temporalmente cuentas sospechosas sin afectar la custodia bancaria.',
      'Evaluación ciega de usabilidad con personas mayores de 60 años de Belén y Robledo.'
    ],
    app: [
      'Bloqueador dinámico de números telefónicos y cuentas bancarias en el chat hasta que el servicio esté reservado.',
      'Sello de "Anticipo Cero": banner permanente en el chat recordando que pagar por fuera anula la garantía de 2 días.',
      'Verificación biométrica aleatoria al técnico: selfie con gesto antes de iniciar un trabajo de alto valor.',
      'Doble visto bueno fotográfico: el técnico no puede cobrar sin foto obligatoria del trabajo terminado.',
      'Geocerca de seguridad: validar que el técnico realmente estuvo en el domicilio al momento de reportar inicio y fin.',
      'Alerta de cambio repentino de cuenta bancaria del profesional con retención preventiva de 24 horas.',
      'Bóveda de Disputa Express: congelación inmediata del pago si el cliente reporta daño colateral en menos de 48h.',
      'Calificación cruzada anónima de seguridad para proteger tanto al cliente como al profesional en zonas complejas.',
      'Límite de servicios simultáneos por técnico para evitar que tomen más trabajos de los que pueden cumplir con calidad.',
      'Detección de dispositivos compartidos o clonados para evitar granjas de cuentas de un mismo intermediario.'
    ]
  },
  {
    name: 'Dr. Lorenzo',
    prefix: '📜',
    suffix: '📜',
    role: 'Compliance Normativo & Estatuto del Consumidor',
    dept: 'Dirección & Estrategia',
    puesto: [
      'Matriz de vigilancia regulatoria ante la Superintendencia de Industria y Comercio (SIC) actualizada cada lunes.',
      'Auditoría quincenal del cumplimiento de la Ley 1480 de 2011 (Estatuto del Consumidor) en todas las pantallas.',
      'Manual de procedimiento ante requerimientos de autoridades y juzgados de pequeñas causas de Medellín.',
      'Revisión semestral de los Términos y Condiciones y Política de Privacidad conforme a jurisprudencia de la Corte.',
      'Protocolo de respuesta a quejas de protección al consumidor en menos de 48 horas hábiles.',
      'Capacitación mensual a 💬 Laura 💬 y al equipo de soporte en redacción jurídica amigable y sin ambigüedades.',
      'Archivo probatorio digital inmutable de todos los contratos de adhesión aceptados por clientes y técnicos.',
      'Supervisión de la pauta publicitaria de 📢 Sofia 📢 para asegurar que no contenga afirmaciones engañosas.',
      'Checklist de cumplimiento para la Ley 1618 de 2013 sobre accesibilidad universal e inclusión digital.',
      'Auditoría de legalidad en los esquemas de referidos y promociones comerciales para evitar sanciones tributarias.'
    ],
    app: [
      'Acta Digital de Garantía descargable en PDF con hash criptográfico firmado conforme a la Ley 527 de 1999.',
      'Resumen de Términos en 3 Puntos Clave antes de contratar, evitando textos legales ilegibles.',
      'Módulo de Consentimiento Expreso para Habeas Data con selector granular de finalidades (Ley 1581 de 2012).',
      'Botón visible y reglamentario de "Derecho de Retracto" con reembolso automático en 24h si el técnico no ha salido.',
      'Historial de aceptación de contratos fechado y con dirección IP visible en el perfil del usuario.',
      'Certificado de Idoneidad Técnica visible en el perfil del profesional para cumplir deber de información de la SIC.',
      'Sistema de PQRS reglamentario integrado con número de radicado único y seguimiento en tiempo real.',
      'Hoja de reclamación de garantía en 1 toque con carga guiada de fotos y descripción de inconformidad.',
      'Aviso legal transparente sobre la intermediación tecnológica y la custodia financiera de Wompi Bancolombia.',
      'Descarga completa del expediente de servicio (cotización, chat, comprobante Wompi y fotos) con un solo clic.'
    ]
  },
  {
    name: 'Aliccia',
    prefix: '🏛️',
    suffix: '🏛️',
    role: 'Relaciones Institucionales & Alcaldías',
    dept: 'Dirección & Estrategia',
    puesto: [
      'Mapeo de convocatorias de Ruta N, Alcaldía de Medellín y Gobernación de Antioquia para proyectos de empleo.',
      'Canal de articulación formal con la Cámara de Comercio de Medellín para certificar oficios no formales.',
      'Presentación bimensual de reportes de impacto social (ingresos netos de técnicos) a secretarías de desarrollo.',
      'Mesa de enlace con SENA Regional Antioquia para convalidar competencias laborales de los profesionales Rebuske.',
      'Protocolo institucional para participar en programas de formalización laboral y bancarización comunitaria.',
      'Registro de Rebuske en los ecosistemas de innovación pública y compras sociales del Valle de Aburrá.',
      'Alianzas con comisarías de familia y casas de justicia para programas de empleo digno en comunas vulnerables.',
      'Vigilancia de normativas de espacio público y movilidad de trabajadores independientes en Medellín.',
      'Informes trimestrales de equidad de género en oficios tradicionalmente masculinizados (mujeres electricistas/plomeras).',
      'Convenios marco de pasantías con facultades de ingeniería y ciencias sociales de universidades de Antioquia.'
    ],
    app: [
      'Insignia Oficial "Certificado SENA / Formación Antioquia" destacada en las tarjetas de profesionales.',
      'Filtro de "Profesionales de Mi Comuna" para apoyar el comercio y talento hiperlocal de cada barrio.',
      'Módulo de Reporte Social: métricas en vivo de cuánto dinero ha ido directo a los bolsillos de familias paisas.',
      'Convenio con Centros del Valle del Software para capacitaciones gratuitas a técnicos registrados.',
      'Sección especial de Técnicas Mujeres ("Ellas Construyen") para clientes que prefieran operadoras femeninas.',
      'Acceso a microcréditos productivos para herramientas en alianza con programas de fomento de Medellín.',
      'Puntos de atención física aliados (bibliotecas o casas barriales) para técnicos que necesiten ayuda con la app.',
      'Validación de carnet de vacunación y bioseguridad para servicios de salud doméstica o desinfección.',
      'Sello de "Comercio Local Formalizado" para empresas pequeñas de mantenimiento que operen en Rebuske.',
      'Dashboard cívico con datos anonimizados de demanda de servicios para planeación urbana y empleo juvenil.'
    ]
  },
  {
    name: 'Mateo',
    prefix: '💻',
    suffix: '💻',
    role: 'Arquitectura Backend & Cloud',
    dept: 'Tecnología & Infraestructura',
    puesto: [
      'Arquitectura offline-first con IndexedDB y Service Workers que garantice operatividad con baja señal en comunas.',
      'Optimización de cold starts en serverless functions para responder webhooks de Wompi en menos de 200ms.',
      'Implementación de Row Level Security (RLS) estricto en cada tabla de base de datos con pruebas automáticas.',
      'Compresor de imágenes WebP en el navegador del cliente antes de subir fotos de daños, ahorrando 85% de datos.',
      'Infraestructura serverless con réplica local que mantenga los costos de servidores en $0 USD fijos.',
      'Monitoreo continuo de cuotas y límites de almacenamiento para prevenir caídas sorpresivas.',
      'Pipeline de respaldo cifrado diario de todas las transacciones y registros fuera del entorno primario.',
      'Implementación de idempotencia en todos los endpoints de cobro y dispersión para evitar dobles transacciones.',
      'Estrategia de caché CDN para assets estáticos con invalidación instantánea tras cada despliegue.',
      'Micro-framework de pruebas de carga que simule 500 solicitudes de servicio por minuto.'
    ],
    app: [
      'PWA instalable ultraligera (<1.5 MB) que funciona perfectamente en teléfonos Android de gama media y baja.',
      'Sincronización automática de estado: si el técnico pierde conexión en un ascensor, los datos se envían al reconectar.',
      'Carga ultrarrápida en menos de 1 segundo mediante prerenderizado y optimización de bundle JS (<100 KB gzipped).',
      'Chat en tiempo real resiliente con WebSocket y fallback a polling corto si la red móvil es inestable.',
      'Selector de fotos con compresión automática en vivo y recorte enfocado en la zona de avería.',
      'Almacenamiento local seguro de borradores de cotización para que el técnico no pierda lo escrito si se apaga el móvil.',
      'Mapa vectorial interactivo ligero que no consuma memoria RAM ni sobrecaliente los celulares antiguos.',
      'Indicador de conectividad en tiempo real en la barra superior con advertencia amable de señal débil.',
      'Historial de navegación instantáneo sin recargas de página utilizando State Manager reactivo sin librerías pesadas.',
      'Cierre de sesión remoto desde cualquier dispositivo con invalidación inmediata de tokens en 1 toque.'
    ]
  },
  {
    name: 'Valeria',
    prefix: '🎨',
    suffix: '🎨',
    role: 'Diseño UI/UX & Growth',
    dept: 'Tecnología & Infraestructura',
    puesto: [
      'Auditoría semanal de accesibilidad WCAG 2.1 AA en todas las vistas móviles (contraste, tamaños de toque).',
      'Design System "Luz Paisa" unificado en Figma con paleta 60-30-10 documentada para todo el equipo.',
      'Grabaciones anónimas de sesión con mapas de calor para detectar botones ignorados o confusos.',
      'Pruebas de usabilidad mensuales con adultos mayores y personas con baja alfabetización digital.',
      'Repositorio de ilustraciones y microanimaciones Lottie optimizadas a menos de 30 KB.',
      'Protocolo de pruebas en pantallas bajo luz solar directa para garantizar legibilidad a los técnicos en calle.',
      'Kit de componentes modulares reutilizables para maquetar nuevas pantallas en menos de 3 horas.',
      'Estandarización tipográfica con fallback a fuentes del sistema para no bloquear la renderización inicial.',
      'Matriz de consistencia visual en correos electrónicos y piezas de redes sociales alineada con la app.',
      'Testeo de tiempos de lectura de cotizaciones: lograr que un cliente entienda el precio en menos de 5 segundos.'
    ],
    app: [
      'Modo de Alto Contraste para trabajar bajo el sol brillante del mediodía en tejados o fachadas.',
      'Flujo de Solicitud en 3 Toques: [Categoría] -> [Foto/Audio del daño] -> [Dirección y Enviar].',
      'Fichas de profesionales con tipografía grande y datos esenciales visibles de un vistazo (precio, zona, rating).',
      'Animación de confeti y sonido táctil satisfactorio al liberarse el pago protegido con garantía.',
      'Barra de progreso clara en 4 pasos: Cotizando -> En Custodia -> Trabajo en Curso -> Garantía Activa.',
      'Selector visual de horarios con bloques amigables ("Mañana 8-12", "Tarde 2-6", "Inmediato").',
      'Comparador de cotizaciones en paralelo: ver las 3 propuestas de la Ruta de Luz una al lado de la otra.',
      'Tarjetas de trabajo con colores según urgencia: Verde (Normal), Ámbar (Próximo), Rojo (Inmediato).',
      'Galería de fotos deslizables con lupa integrada para inspeccionar el detalle fino del acabado.',
      'Micro-tutorial interactivo de bienvenida de 3 pantallas con ilustraciones cálidas de Medellín.'
    ]
  },
  {
    name: 'Lucas',
    prefix: '🚀',
    suffix: '🚀',
    role: 'Calidad, QA & Despliegue Continuo',
    dept: 'Tecnología & Infraestructura',
    puesto: [
      'Suite de pruebas automatizadas End-to-End con Playwright simulando el flujo completo de pago con Wompi.',
      'Ambiente de Staging réplica exacta de producción con datos anonimizados para validar antes de cada release.',
      'Checklist de despliegue sin tiempo de inactividad (Zero-Downtime Deployment) con rollback en 30 segundos.',
      'Auditoría semanal de rendimiento en Google Lighthouse (mantener puntuación superior a 95 en móvil).',
      'Pruebas de compatibilidad en más de 20 modelos de dispositivos reales (Samsung A03, Xiaomi, iPhone, Motorola).',
      'Reporte automático de errores en tiempo real a Telegram/WhatsApp con stack trace limpio y contexto del usuario.',
      'Testeo de estrés en conexiones 2G y 3G lentas para asegurar que la app nunca se quede en blanco.',
      'Validación de integridad de formularios: evitar que caracteres especiales o emojis rompan las consultas SQL.',
      'Matriz de pruebas para casos extremos: pagos rechazados, saldos insuficientes, caídas de energía y reinicios.',
      'Certificación semanal de que ningún enlace, botón o número de contacto quede roto o apuntando a demos.'
    ],
    app: [
      'Manejador inteligente de errores de red con botón de "Reintentar" y guardado automático de datos.',
      'Pantalla de estado del servicio transparente si hay mantenimiento, con tiempo estimado de regreso.',
      'Detector de versión desactualizada con banner no intrusivo: "Nueva versión disponible · Actualizar en 1 toque".',
      'Formularios con autocompletado nativo y validación visual inmediata campo por campo.',
      'Prevención de doble clic en botones de pago para evitar cobros duplicados por impaciencia.',
      'Modo de diagnóstico para el usuario: botón en soporte para verificar si su cámara, GPS y conexión funcionan bien.',
      'Registro local de eventos de error que el usuario puede enviar a soporte en 1 clic si algo falla.',
      'Previsualización instantánea de subida de fotos con indicador de porcentaje de carga real.',
      'Cierre automático de modales al presionar la tecla "Atrás" en Android sin salirse de la app.',
      'Confirmación con vibración háptica al pulsar botones clave para dar seguridad de interacción física.'
    ]
  },
  {
    name: 'Fernando',
    prefix: '⚙️',
    suffix: '⚙️',
    role: 'DevOps, CI/CD & Resiliencia',
    dept: 'Tecnología & Infraestructura',
    puesto: [
      'Pipeline de CI/CD en GitHub Actions que ejecute análisis estático, linter y tests en menos de 2 minutos.',
      'Infraestructura multi-región serverless con failover automático si cae un centro de datos de la nube.',
      'Monitoreo sintético con pings cada 60 segundos a las rutas críticas (/api/health, checkout de Wompi).',
      'Políticas de retención de logs optimizadas a 30 días para no sobrecargar el almacenamiento ni violar privacidad.',
      'Estrategia de despliegues canarios (Canary Releases) liberando cambios al 10% de los usuarios inicialmente.',
      'Auditoría de dependencias npm semanales con Dependabot y bloqueo inmediato de paquetes vulnerables.',
      'Configuración de rate limiting a nivel de edge para mitigar ataques DDoS o scrapers de cotizaciones.',
      'Scripts de restauración de base de datos probados mensualmente con tiempo objetivo de recuperación <15 min.',
      'Dashboard unificado de métricas operativas (CPU, memoria, latencia P95 y tasa de errores HTTP 5xx).',
      'Alertas críticas por llamada telefónica automatizada si el sistema reporta fallas en pagos por más de 5 minutos.'
    ],
    app: [
      'Transiciones de red instantáneas: si el usuario pasa de Wi-Fi a datos móviles, la app no pierde la sesión.',
      'Servicio de compresión en el borde (Edge Brotli/Gzip) que reduce a la mitad el consumo de megas del plan del técnico.',
      'Carga diferida inteligente de módulos: el código de pago solo se descarga cuando el usuario decide pagar.',
      'Resolución de DNS ultrarrápida configurada en proveedores con presencia física en Bogotá y Medellín.',
      'Modo de bajo consumo de datos configurable por el usuario para hogares con planes prepago limitados.',
      'Auto-reconexión silenciosa del streaming de datos sin mostrar pop-ups molestos de desconexión.',
      'Cache inteligente de assets que permite navegar la lista de profesionales guardados sin gastar internet.',
      'Registro optimizado de telemetría que envía reportes en lotes pequeños únicamente cuando hay conexión Wi-Fi.',
      'Compatibilidad total con navegadores embebidos de WhatsApp, Instagram, Facebook y TikTok.',
      'Pantalla de inicio ultra-rápida (Splash screen) renderizada directamente en CSS puro sin dependencias externas.'
    ]
  },
  {
    name: 'Carlos',
    prefix: '🔒',
    suffix: '🔒',
    role: 'Seguridad Informática / CISO',
    dept: 'Tecnología & Infraestructura',
    puesto: [
      'Auditoría continua de vulnerabilidades OWASP Top 10 en todas las APIs y parámetros de entrada.',
      'Rotación automática mensual de credenciales maestras y llaves de cifrado en variables de entorno seguras.',
      'Pruebas de penetración (pentesting) ético trimestrales enfocadas en la manipulación de montos de pago.',
      'Aislamiento estricto de secretos: ningún token o credencial visible en código cliente o repositorios git.',
      'Políticas de contraseñas y sesiones con expiración y revocación forzada ante actividades anómalas.',
      'Registro inmutable de auditoría para cada cambio de estado en retiros de fondos de técnicos.',
      'Protocolo de respuesta ante incidentes de ciberseguridad con notificación reglamentaria a autoridades.',
      'Cifrado de datos en reposo (AES-256) y en tránsito (TLS 1.3 con HSTS estricto) en todas las comunicaciones.',
      'Supervisión de permisos de acceso al código fuente aplicando el principio de mínimo privilegio.',
      'Análisis diario de accesos con direcciones IP extranjeras no autorizadas hacia los paneles de gestión.'
    ],
    app: [
      'Autenticación biométrica nativa (huella dactilar / FaceID) para desbloquear la app y autorizar pagos.',
      'Ocultamiento automático de números de cuenta bancaria y cédulas con asteriscos en pantalla.',
      'Teclado numérico aleatorio opcional al digitar PINs de seguridad para prevenir ataques por observación.',
      'Alerta inmediata por correo y SMS si se detecta un inicio de sesión desde un teléfono o navegador nuevo.',
      'Protección contra capturas de pantalla en vistas con información bancaria o documentos personales en Android.',
      'Doble factor de autenticación (2FA) por WhatsApp para retiros de saldo superiores a $500.000 COP.',
      'Enmascaramiento de números de teléfono entre técnico y cliente usando centralita virtual segura.',
      'Expiración automática de sesiones tras 15 minutos de inactividad en pantallas de finanzas y cobros.',
      'Sello de Seguridad SSL/Wompi interactivo con certificado de cifrado visible al momento de pagar.',
      'Botón de pánico o bloqueo de emergencia de cuenta si el usuario pierde o le roban su teléfono móvil.'
    ]
  },
  {
    name: 'Galloti',
    prefix: '📡',
    suffix: '📡',
    role: 'Telemetría & Tiempo Real',
    dept: 'Tecnología & Infraestructura',
    puesto: [
      'Dashboard de telemetría en tiempo real proyectando solicitudes activas por comuna sobre mapa de calor.',
      'Monitoreo de latencia en la entrega de notificaciones push buscando mantenerla bajo los 3 segundos.',
      'Seguimiento en vivo del embudo de conversión: Visitante -> Búsqueda -> Solicitud -> Pago en Custodia.',
      'Alertas de anomalías estadísticas: caída abrupta de solicitudes en una comuna o picos inusuales de tráfico.',
      'Auditoría de tiempos de respuesta de los técnicos desde que reciben la alerta hasta que envían cotización.',
      'Métrica en tiempo real de "Tiempo a la Primera Oferta" (First Quote Time) con meta menor a 15 minutos.',
      'Rastreo anonimizado de batería y rendimiento del dispositivo para alertar si la app gasta demasiada pila.',
      'Registro de pérdida de paquetes en conexiones móviles para mejorar la resiliencia en zonas de ladera.',
      'Reporte diario de disponibilidad del sistema (SLA de uptime 99.9%) consolidado automáticamente.',
      'Modelado de flujo de usuarios en vivo para identificar cuellos de botella antes de que se vuelvan quejas.'
    ],
    app: [
      'Radar en vivo de técnicos cercanos: visualización de disponibilidad en tu barrio sin revelar ubicación exacta.',
      'Tiempo estimado de llegada (ETA) dinámico calculado con el tráfico real de Medellín y estado del clima.',
      'Indicador de "Escribiendo..." y confirmación de lectura con doble check verde en el chat del servicio.',
      'Notificación sonora sutil con timbre de luciérnaga al recibir una nueva cotización o mensaje importante.',
      'Contador en tiempo real de la vigencia de la oferta para generar sentido de oportunidad respetuoso.',
      'Cronómetro visible de la garantía de 48 horas tras finalizar el trabajo con cuenta regresiva precisa.',
      'Alerta al técnico si se detecta tráfico pesado en la Autopista o la 80 para sugerir salida anticipada.',
      'Historial de actividad minuto a minuto dentro de la orden: "Propuesta enviada", "Pago en custodia", "En camino".',
      'Modo de ahorro de batería inteligente que reduce la tasa de actualización de GPS cuando el móvil está quieto.',
      'Resumen diario de actividad en pantalla para el técnico: horas activas, servicios cotizados y completados.'
    ]
  },
  {
    name: 'Elena',
    prefix: '📈',
    suffix: '📈',
    role: 'Ciencia de Datos & Modelos Predictivos',
    dept: 'Tecnología & Infraestructura',
    puesto: [
      'Modelo predictivo de demanda por comuna según día de la semana, clima y quincena en Medellín.',
      'Algoritmo de recomendación que empareja al técnico ideal no solo por cercanía, sino por afinidad y puntualidad.',
      'Detección de patrones de estacionalidad: incremento de pintura en noviembre o de tejados en temporada de lluvias.',
      'Segmentación de clientes por frecuencia de uso (hogares familiares, propietarios de arriendo, locales).',
      'Predicción de deserción de técnicos: alertar si un profesional con 5.0★ lleva más de 5 días sin cotizar.',
      'Calibración continua de precios de referencia para evitar tarifas artificiales que ahuyenten la demanda.',
      'Análisis de sentimiento en los comentarios de reseñas para identificar áreas de mejora no explícitas.',
      'Modelo de optimización de rutas para técnicos que atienden múltiples solicitudes en una misma jornada.',
      'Panel de visualización ejecutiva con cohortes de retención a 30, 60 y 90 días por barrio.',
      'Experimentos controlados de fijación de comisiones para maximizar tanto el ingreso del pro como de la app.'
    ],
    app: [
      'Sugerencia predictiva al cliente: "Es época de lluvias, ¿deseas revisar tus canoas antes de filtraciones?".',
      'Tarifa sugerida óptima para el técnico: rango recomendado para ganar la cotización con alta probabilidad.',
      'Distintivo inteligente "Muy Solicitado": reconoce a los profesionales que cierran más trabajos con 5.0★.',
      'Organización automática de solicitudes por cercanía geográfica para que el técnico ahorre gasolina en moto.',
      'Recordatorio inteligente de servicio recurrente: "¿Hace 6 meses limpiaste tu trampa de grasa, agendamos?".',
      'Gráfica interactiva de ingresos semanales y mensuales en el perfil del técnico con comparativa de crecimiento.',
      'Filtro de búsqueda semántica: encontrar el especialista adecuado aunque el cliente escriba modismos paisas.',
      'Ranking de puntualidad visible: porcentaje de veces que el técnico llegó a la hora acordada.',
      'Estimador de duración del trabajo basado en miles de arreglos similares completados en la plataforma.',
      'Recomendaciones personalizadas en el inicio: mostrar servicios relevantes según el tipo de vivienda del cliente.'
    ]
  },
  {
    name: 'Tomás',
    prefix: '💳',
    suffix: '💳',
    role: 'FinTech & Bóveda Wompi',
    dept: 'Finanzas & Control',
    puesto: [
      'Conciliación automática diaria al 100% entre eventos de webhook de Wompi y el libro mayor contable.',
      'Optimización de la tasa de autorización de tarjetas de crédito y débito bancario PSE en la pasarela.',
      'Protocolo de liquidación de custodia en 48 horas exactas con dispersión masiva de payouts a Nequi y Bancolombia.',
      'Monitoreo en tiempo real de comisiones (7% Oro VIP / 1% Fundadores mes 1) sin desfase de un solo centavo.',
      'Manejo de reintentos exponenciales automáticos ante fallas temporales de red durante el webhook de confirmación.',
      'Auditoría semanal de comisiones de adquirencia para minimizar los costos transaccionales bancarios.',
      'Integración con botones de pago rápido (Bancolombia QR, Nequi directo, PSE, tarjetas Visa/Mastercard).',
      'Mecanismo de reversión limpia de fondos en caso de disputas aprobadas con reintegro al medio de pago original.',
      'Generación de certificados de retención en la fuente e ICA automáticos para los profesionales en cada corte.',
      'Panel de control de saldos retenidos en escrow con visualización de pasivos por garantías pendientes.'
    ],
    app: [
      'Widget de Pago Protegido nativo de Wompi integrado sin redirecciones molestas fuera de la aplicación.',
      'Billetera Rebuske para el profesional: saldo disponible para retiro y saldo en custodia visible al instante.',
      'Retiro en 1 Toque a Nequi o Daviplata sin costo adicional con confirmación en menos de 2 horas.',
      'Visualizador del desglose transparente de pago: [Valor acordado] = [93% Profesional] + [7% Plataforma].',
      'Soporte completo para pagos con QR Bancolombia directo desde la app bancaria del usuario.',
      'Comprobante de Pago Protegido descargable con sello de custodia bancaria oficial para tranquilidad del cliente.',
      'Alertas por WhatsApp y notificación push cada vez que un pago entra en custodia o se libera a la cuenta.',
      'Opción de propina voluntaria al profesional tras calificar con 5 estrellas, 100% directa sin comisión.',
      'Historial de movimientos financieros filtrable por mes con exportación a PDF o Excel para declaración de renta.',
      'Bloqueo preventivo de pagos sospechosos con solicitud de confirmación por clave dinámica de su banco.'
    ]
  },
  {
    name: 'Mariana',
    prefix: '💰',
    suffix: '💰',
    role: 'CFO / Dirección Financiera',
    dept: 'Finanzas & Control',
    puesto: [
      'Modelo financiero de flujo de caja proyectado a 24 meses con optimización de márgenes operativos.',
      'Supervisión de la regla de oro: mantener la infraestructura operativa fija en $0 USD mediante serverless.',
      'Auditoría mensual de rentabilidad unitaria (Unit Economics: LTV/CAC) por cada comuna del Valle de Aburrá.',
      'Gestión de tesorería y rendimientos de saldos en custodia conforme a la regulación financiera colombiana.',
      'Diseño de planes de fidelización e incentivos económicos sostenibles para retención de los mejores técnicos.',
      'Control presupuestal estricto de pauta publicitaria con medición directa de costo por técnico y cliente adquirido.',
      'Preparación de reportes financieros bajo estándares NIIF para inversionistas y entidades de crédito.',
      'Negociación de tarifas preferenciales con pasarelas de pago y proveedores de servicios tecnológicos.',
      'Auditoría de provisiones para garantías no resueltas y contingencias operativas.',
      'Estrategia de pricing dinámico para servicios corporativos en alianza con inmobiliarias y aseguradoras.'
    ],
    app: [
      'Reporte Financiero Anual para el técnico: resumen listo para presentar al contador o declarar renta.',
      'Calculadora de Rentabilidad para el profesional: herramienta para estimar sus ganancias mensuales en la app.',
      'Plan de Recompensas por Lealtad: descuentos en la comisión de la app por acumular trabajos impecables.',
      'Facturación corporativa simplificada para administraciones de edificios y oficinas en Medellín.',
      'Visualización de metas de ahorro personales para que los técnicos puedan planear la compra de herramientas.',
      'Indicador de impacto económico familiar: "Has generado $X COP este mes para tu hogar con Rebuske".',
      'Módulo de microseguros de accidentes laborales adquiribles con cargo al saldo de la billetera.',
      'Opciones de financiamiento en cuotas sin interés para arreglos mayores del hogar a través de Wompi.',
      'Simulador de presupuesto para reformas completas de baños o cocinas con desglose de mano de obra y materiales.',
      'Transparencia total de costos: resumen anual de cuánto ahorró el cliente al contratar con precios justos de referencia.'
    ]
  },
  {
    name: 'Cayse',
    prefix: '🧾',
    suffix: '🧾',
    role: 'Contabilidad, DIAN e Impuestos',
    dept: 'Finanzas & Control',
    puesto: [
      'Facturación electrónica automática validada ante la DIAN por cada comisión cobrada por la plataforma.',
      'Generación y envío del Documento Soporte Electrónico en adquisiciones efectuadas a sujetos no obligados a facturar.',
      'Liquidación mensual exacta de retenciones en la fuente (ReteFuente), ReteIVA y ReteICA ante la Alcaldía de Medellín.',
      'Parametrización contable del plan único de cuentas (PUC) en el sistema para registro automático de cada asiento.',
      'Revisión semestral de cambios en reformas tributarias y su impacto en plataformas de economía colaborativa.',
      'Emisión de certificados anuales de retenciones a técnicos y proveedores en los plazos legales establecidos.',
      'Auditoría de libros oficiales y conciliación con extractos bancarios de Bancolombia sin desfases.',
      'Atención y respuesta técnica a requerimientos de información exógena distrital y nacional (DIAN / Municipio).',
      'Capacitación fiscal básica para técnicos independientes sobre beneficios del Régimen Simple de Tributación (RST).',
      'Archivo digital inmutable de XMLs y representaciones gráficas de facturas por el término legal de 5 años.'
    ],
    app: [
      'Descarga automática de factura electrónica en PDF y XML desde el historial de cada servicio completado.',
      'Módulo "Mi Situación Tributaria" para el profesional: cargar RUT actualizado en 1 toque con validación OCR.',
      'Certificados de Retención descargables con un solo clic al cierre del año fiscal para trámites bancarios.',
      'Desglose impositivo claro en cada recibo (IVA correspondiente a la comisión tecnológica de la plataforma).',
      'Recordatorio amigable de fechas de vencimiento de declaración de renta para personas naturales.',
      'Sección educativa "Aprende con Cayse": cápsulas de 1 minuto explicando cómo formalizarse sin miedo a impuestos.',
      'Generador automático de cuenta de cobro digital para técnicos que presten servicios a empresas o locales.',
      'Validación automática del NIT de clientes corporativos con la base de datos de la DIAN para facturación ágil.',
      'Historial contable ordenado para copropiedades con desglose de gastos de mantenimiento por apartamento.',
      'Emisión de comprobante de retención en la fuente aplicado para técnicos que pertenezcan al régimen común.'
    ]
  },
  {
    name: 'Patricia',
    prefix: '🔍',
    suffix: '🔍',
    role: 'Auditoría de Pagos & Dispersión',
    dept: 'Finanzas & Control',
    puesto: [
      'Monitoreo en tiempo real de la cola de desembolsos a cuentas bancarias y billeteras de profesionales.',
      'Verificación de que el titular de la cuenta bancaria de destino coincida exactamente con la cédula del técnico registrado.',
      'Control diario de topes de retiro y alertas por montos atípicos para prevenir errores operativos.',
      'Auditoría de liberaciones automáticas tras el cumplimiento de las 48 horas de garantía sin reclamo del cliente.',
      'Protocolo de congelamiento preventivo de pagos en caso de disputas abiertas antes del vencimiento del plazo.',
      'Revisión de comprobantes bancarios fallidos por cuentas inactivas o con bloqueos en Nequi/Daviplata.',
      'Auditoría ciega periódica sobre el cálculo de las tarifas del 7% y 1% para certificar cero discrepancias.',
      'Métricas de tiempo de ciclo de dispersión: reducir el tiempo promedio de pago a menos de 45 minutos tras la liberación.',
      'Generación de reportes de dispersión diarios cruzados con las transferencias efectivas de Bancolombia.',
      'Procedimiento de conciliación para pagos realizados en fin de semana o festivos garantizando continuidad operativa.'
    ],
    app: [
      'Rastreador de Retiro en Tiempo Real: barra de progreso [Solicitado] -> [En Auditoría] -> [Enviado a tu Banco].',
      'Validación inmediata del número de Nequi o Daviplata al vincular la cuenta para evitar errores de digitación.',
      'Notificación instantánea por WhatsApp al técnico: "Tu pago de $X COP ha sido enviado a tu cuenta Nequi".',
      'Historial de retiros con número de comprobante bancario oficial para cualquier aclaración con su banco.',
      'Opción de programar retiros automáticos: diario, semanal o quincenal según la preferencia del profesional.',
      'Alerta al usuario si su cuenta bancaria de destino tiene topes mensuales alcanzados en Nequi para evitar rechazos.',
      'Visualizador de fecha y hora exacta en la que se liberará el dinero de la custodia en cada servicio.',
      'Certificado de transferencia bancaria descargable con sello de verificación financiera de Rebuske.',
      'Posibilidad de cambiar o agregar una segunda cuenta de respaldo verificada mediante código de seguridad SMS.',
      'Soporte directo con Patricia en 1 clic si una transferencia presenta demora mayor a 2 horas hábiles.'
    ]
  },
  {
    name: 'Valentina',
    prefix: '🪪',
    suffix: '🪪',
    role: 'KYC & Verificación de Identidad',
    dept: 'Finanzas & Control',
    puesto: [
      'Validación de cédulas de ciudadanía colombiana contra bases de datos públicas de Policía y Contraloría.',
      'Auditoría exhaustiva del protocolo de 5 fotos de trabajos previos reales + 1 foto selfie sosteniendo la cédula.',
      'Detección de fotos descargadas de internet o bancos de imágenes usando búsqueda inversa y análisis de metadatos EXIF.',
      'Revisión de antecedentes disciplinarios, judiciales y medidas correctivas de convivencia ciudadana en Medellín.',
      'Mantenimiento de un tiempo de respuesta de validación menor a 4 horas hábiles por cada solicitud de registro pro.',
      'Entrevista telefónica o videollamada corta de verificación para evaluar modales, experiencia y vocación de servicio.',
      'Archivo digital seguro y cifrado de los documentos de identidad cumpliendo estrictamente con la Ley 1581 de 2012.',
      'Auditoría periódica semestral de antecedentes para todos los profesionales activos en la plataforma.',
      'Detección de suplantación de identidad mediante biometría facial comparando la selfie con la foto de la cédula.',
      'Registro de técnicos vetados con bloqueo definitivo por número de documento para evitar reincidencias.'
    ],
    app: [
      'Flujo de Registro Pro guiado en 3 pasos con cámara integrada para foto frontal y posterior de la cédula.',
      'Sello "Profesional Verificado Rebuske" con insignia dorada en el perfil del técnico para máxima confianza.',
      'Guía visual en pantalla para la selfie: silueta ovalada interactiva que indica si la iluminación es adecuada.',
      'Carga sencilla de las 5 fotos de trabajos previos con selector de oficio (plomería, electricidad, etc.).',
      'Estado de verificación en tiempo real: "Documentos recibidos" -> "En validación" -> "¡Aprobado para trabajar!".',
      'Tarjeta de Identidad Digital del Técnico que el cliente puede verificar escaneando un código QR en la puerta de su casa.',
      'Recordatorio automático al profesional si su cédula está borrosa con instrucciones claras para repetir la toma.',
      'Insignia de "Verificación Presencial" para técnicos que hayan pasado por pruebas técnicas en persona.',
      'Validación de tarjetas profesionales o certificados de matrícula (Conte, Copnia) para electricistas y gasistas.',
      'Transparencia para el cliente: resumen de verificaciones superadas visible al abrir la ficha del especialista.'
    ]
  },
  {
    name: 'Roberto',
    prefix: '🚨',
    prefix: '🚨',
    role: 'Antifraude & Monitoreo Transaccional',
    dept: 'Finanzas & Control',
    puesto: [
      'Motor de reglas heurísticas para detectar transacciones con tarjetas clonadas o compras con patrones anormales.',
      'Monitoreo de velocidad transaccional: alertar si un mismo usuario genera múltiples solicitudes en segundos.',
      'Detección de cuentas vinculadas a IPs sospechosas, proxies anónimos o emuladores fuera del Valle de Aburrá.',
      'Análisis de patrones de colusión: identificar técnicos y clientes que operen repetidamente entre sí sin justificación.',
      'Supervisión de reclamos de garantía recurrentes para detectar usuarios abusivos que busquen servicios gratis.',
      'Bloqueo preventivo de cuentas bancarias asociadas a reportes previos de estafa o evasión de pagos.',
      'Auditoría de números telefónicos virtuales o temporales en el registro de usuarios para exigir líneas reales.',
      'Protocolo de comunicación con el equipo de prevención de fraude de Wompi Bancolombia.',
      'Mapeo de zonas geográficas con mayor incidencia de disputas para reforzar filtros de seguridad preventiva.',
      'Reporte semanal de métricas de fraude manteniendo la tasa de contracargos por debajo del 0.05% del GMV.'
    ],
    app: [
      'Escudo Antifraude visible en el momento del pago informando que la transacción cuenta con monitoreo 24/7.',
      'Alerta al cliente si el profesional intenta pedir dinero en efectivo: botón directo "Reportar cobro indebido".',
      'Desactivación temporal automática del chat si se detectan palabras clave asociadas a estafas o amenazas.',
      'Verificación por SMS antes de autorizar servicios en horarios nocturnos o de montos elevados.',
      'Detección de intentos de evasión: recordatorio de que los acuerdos verbales por fuera pierden la garantía de 2 días.',
      'Filtro de seguridad en la dirección: confirmación de nomenclatura estándar de Medellín para evitar citas falsas.',
      'Botón de reporte anónimo en cada mensaje del chat para denunciar comportamientos sospechosos en 1 clic.',
      'Historial de seguridad visible para el cliente: "Este técnico ha completado 45 trabajos con 0 incidentes".',
      'Bloqueo automático de cotizaciones con precios absurdamente bajos (ej. $1.000 COP) diseñadas para evadir tarifas.',
      'Sistema de reputación blindado: solo pueden calificar clientes que hayan completado y pagado el servicio en la app.'
    ]
  },
  {
    name: 'Ricardo',
    prefix: '📊',
    suffix: '📊',
    role: 'Tarifas / Pricing & Comunas',
    dept: 'Finanzas & Control',
    puesto: [
      'Actualización mensual de la matriz de precios de referencia para las 16 comunas y 5 corregimientos de Medellín.',
      'Estudio de campo continuo en ferreterías y gremios sobre costos de insumos básicos (tubos PVC, cableado, galón de pintura).',
      'Monitoreo de tarifas de mano de obra en estratos 2, 3, 4, 5 y 6 para asegurar equidad y competitividad.',
      'Matriz de compensación por desplazamiento a zonas de difícil acceso o corregimientos (Santa Elena, San Cristóbal).',
      'Diseño de tarifas sugeridas para servicios de emergencia nocturnos o dominicales con recargo transparente.',
      'Auditoría de cotizaciones enviadas por los técnicos para detectar sobrecostos abusivos o prácticas de dumping.',
      'Análisis de elasticidad precio-demanda: identificar en qué rangos de precio los clientes aceptan más rápido.',
      'Comparativa trimestral con tarifas de plataformas competidoras en Colombia para mantener el mejor valor.',
      'Estandarización de unidades de cobro: tarifas por punto eléctrico, metro cuadrado de pintura o arreglo puntual.',
      'Publicación transparente de la tabla de precios oficiales para consulta libre de toda la ciudadanía.'
    ],
    app: [
      'Calculadora de Presupuesto Estimado antes de publicar: el cliente conoce el rango justo de su arreglo.',
      'Etiqueta de "Precio Justo Recomendado" en las cotizaciones que se ubiquen dentro del rango oficial de Medellín.',
      'Desglose claro entre Mano de Obra y Repuestos en cada cotización para total transparencia de costos.',
      'Comparador de tarifas promedio por barrio: "En Laureles este servicio suele costar entre $60.000 y $90.000 COP".',
      'Opción para que el técnico justifique variaciones de precio basadas en complejidades técnicas específicas.',
      'Tarifario oficial de referencia consultable en la pestaña de búsqueda con precios mínimos y máximos.',
      'Ajuste automático de recargos dominicales o nocturnos visible de forma explícita antes de confirmar el servicio.',
      'Simulador interactivo para pintar un apartamento completo seleccionando número de habitaciones.',
      'Alerta al cliente si una cotización recibida supera en más del 40% el precio de referencia del mercado.',
      'Historial de precios pagados por el usuario en servicios anteriores para facilitar presupuestos familiares.'
    ]
  },
  {
    name: 'Diego',
    prefix: '📍',
    suffix: '📍',
    role: 'Coordinación de Servicios & Zonas',
    dept: 'Operaciones & Cobertura',
    puesto: [
      'Monitoreo continuo de la liquidez de técnicos por cada comuna de Medellín y municipios vecinos del Valle de Aburrá.',
      'Gestión de alertas de cobertura: si en Envigado o Bello hay escasez de electricistas, convocar profesionales cercanos.',
      'Protocolo de reasignación express si un técnico presenta un imprevisto de fuerza mayor o pinchazo en moto.',
      'Mapeo de puntos de alta demanda según horarios y días de lluvia para activar profesionales estratégicamente.',
      'Coordinación logística con ferreterías de barrio para facilitar puntos de encuentro de técnicos en ruta.',
      'Mantenimiento de tiempos de asignación de servicio por debajo de los 12 minutos en todo el Valle de Aburrá.',
      'Supervisión de zonas de cobertura seguras y definición de corredores de movilidad ágil para motocicletas.',
      'Reuniones virtuales semanales con capitanes de técnicos por comuna para evaluar condiciones del terreno.',
      'Plan de contingencia para emergencias de servicios durante eventos masivos (Feria de las Flores, marchas, etc.).',
      'Optimización de la distribución de cupos primordiales para asegurar balance entre oficios en cada sector.'
    ],
    app: [
      'Filtro de Búsqueda por Comuna y Barrio específico (Laureles, Poblado, Belén, Robledo, Envigado, Itagüí, Bello).',
      'Estado del Técnico en Tiempo Real: "En camino en moto", "Llegó al domicilio", "Trabajando en el arreglo".',
      'Opción para compartir la ubicación en tiempo real del técnico por WhatsApp con un familiar para tranquilidad.',
      'Modo "Técnico en mi Barrio": ver solicitudes disponibles a menos de 2 km a la redonda para ahorrar gasolina.',
      'Agendamiento Inteligente: sugerir horarios donde el técnico ya tiene otro trabajo cerca en la misma comuna.',
      'Confirmación de Llegada por GPS: notificación al cliente cuando el profesional esté en la portería del edificio.',
      'Instrucciones de acceso para conjuntos cerrados: guardar datos de torre y apartamento de forma segura.',
      'Mapa interactivo de cobertura del Valle de Aburrá mostrando en qué zonas Rebuske presta servicio con garantía.',
      'Alerta al técnico sobre restricciones de movilidad (Pico y Placa para motos y carros en Medellín).',
      'Botón de "Estoy esperando en la portería" para avisar al cliente sin necesidad de llamar por teléfono.'
    ]
  },
  {
    name: 'Laura',
    prefix: '💬',
    suffix: '💬',
    role: 'Soporte al Usuario & WhatsApp',
    dept: 'Operaciones & Cobertura',
    puesto: [
      'Atención omnicanal cálida por WhatsApp (+57 304 381 2882) con tono paisa, respetuoso y empático.',
      'Tiempo medio de primera respuesta en WhatsApp menor a 2 minutos durante jornada hábil (7:00 AM - 9:00 PM).',
      'Guía paso a paso para usuarios adultos mayores que tengan dudas sobre cómo pagar con PSE o tarjeta en la app.',
      'Protocolo de escalamiento inmediato a mediación legal si un cliente manifiesta inconformidad con un trabajo.',
      'Base de conocimiento viva con las respuestas a las 30 preguntas más frecuentes de clientes y técnicos.',
      'Seguimiento proactivo al 10% de los servicios completados cada día para evaluar la experiencia de usuario.',
      'Encuestas de satisfacción post-atención de soporte buscando mantener un CSAT superior al 98%.',
      'Acompañamiento a profesionales durante su primer servicio para asegurar que entiendan la Bóveda Wompi.',
      'Canal de escucha para sugerencias de la comunidad con entrega semanal de propuestas a 💡 Simón 💡 y 🎨 Valeria 🎨.',
      'Protocolo de desescalamiento de tensiones enfocado en soluciones justas, diálogo y respeto mutuo.'
    ],
    app: [
      'Botón flotante directo de WhatsApp con Laura presente en todas las pantallas para asistencia en 1 toque.',
      'Centro de Ayuda Interactivo con buscador rápido y respuestas directas sobre garantías, pagos y cancelaciones.',
      'Chat de Soporte Integrado en la app con historial sincronizado con la conversación de WhatsApp oficial.',
      'Respuestas Rápidas sugeridas en el chat para preguntas comunes ("¿Aceptan tarjeta?", "¿Cuánto dura la garantía?").',
      'Estado del Soporte en vivo: indicador de "Laura está disponible en WhatsApp para ayudarte ahora".',
      'Botón para solicitar llamada telefónica de ayuda si el usuario tiene dificultades para escribir en el móvil.',
      'Preguntas Frecuentes contextuales según la pantalla donde se encuentre el usuario (ej. dudas de pago en checkout).',
      'Mensaje de bienvenida personalizado por WhatsApp tras completar el primer registro en la plataforma.',
      'Opción de calificar la atención de soporte con un solo toque al finalizar la conversación.',
      'Canal prioritario de emergencias domésticas graves con derivación inmediata a técnicos de guardia.'
    ]
  },
  {
    name: 'Elena',
    prefix: '⚖️',
    suffix: '⚖️',
    role: 'Legaltech & Arbitraje 48h',
    dept: 'Operaciones & Cobertura',
    puesto: [
      'Resolución técnica de disputas de garantía de 2 días en un plazo máximo garantizado de 4 horas hábiles.',
      'Protocolo de mediación basado en evidencia fotográfica estricta: fotos del daño inicial vs fotos del trabajo final.',
      'Redacción de actas de conciliación digital con plena validez probatoria bajo la Ley 527 de 1999 de comercio electrónico.',
      'Mesa de consulta con 🔧 Telmo 🔧 para emitir dictámenes periciales técnicos en quejas de plomería o electricidad.',
      'Supervisión de la liberación o reintegro de fondos retenidos en la Bóveda Wompi tras resolver cada disputa.',
      'Monitoreo del índice de reclamos manteniendo la tasa de disputas por debajo del 1.5% de todos los servicios.',
      'Manual de buenas prácticas y criterios objetivos para determinar cuándo aplica reparación, reembolso o mediación.',
      'Capacitación quincenal a técnicos sobre cómo documentar adecuadamente imprevistos o vicios ocultos en tuberías/muros.',
      'Registro histórico anonimizado de casos resueltos como jurisprudencia interna para decisiones consistentes.',
      'Canal de arbitraje amigable que evite que cualquier conflicto trascienda a instancias judiciales ordinarias.'
    ],
    app: [
      'Módulo de "Garantía de 2 Días en 1 Toque": botón en la orden activa para abrir un reclamo sin burocracia.',
      'Asistente guiado de evidencia: pide al cliente subir 2 fotos claras del fallo y una breve descripción de voz.',
      'Línea de tiempo de la disputa visible para ambas partes con plazos transparentes de respuesta.',
      'Opción de "Acuerdo Amistoso": el técnico puede ofrecer regresar sin costo en menos de 24h para corregir el detalle.',
      'Firma digital del acta de conformidad con el dedo sobre la pantalla del móvil al resolverse la garantía.',
      'Retención automática de fondos en la pasarela Wompi mientras el proceso de arbitraje esté abierto.',
      'Notificación transparente de la resolución dictada con explicación jurídica y técnica comprensible.',
      'Reembolso automático al cliente en 24h si el dictamen determina incumplimiento insubsanable del profesional.',
      'Opción de segunda opinión técnica por parte de 🔧 Telmo 🔧 en desacuerdos complejos sobre materiales.',
      'Historial de garantías atendidas visible en el panel del técnico como prueba de su seriedad y cumplimiento.'
    ]
  },
  {
    name: 'Telmo',
    prefix: '🔧',
    suffix: '🔧',
    role: 'Normalización Técnica & Calidad de Oficio',
    dept: 'Operaciones & Cobertura',
    puesto: [
      'Definición de fichas técnicas y estándares de calidad para cada tipo de labor (plomería, electricidad, pintura, drywall).',
      'Diseño del banco de evaluación técnica práctica para aspirantes a cupos de profesionales certificados.',
      'Auditoría aleatoria presencial del 2% de los servicios en Medellín para inspeccionar herramientas y acabados.',
      'Guías de buenas prácticas con normativas técnicas colombianas (RETIE para electricidad, NTC 1500 para fontanería).',
      'Elaboración de manuales de seguridad ocupacional: uso de EPP, gafas, guantes y desconexión de tacos de energía.',
      'Peritajes técnicos especializados para respaldar los arbitrajes de garantías de ⚖️ Elena ⚖️ y 📜 Dr. Lorenzo 📜.',
      'Convenios con fabricantes de herramientas y pinturas para talleres de actualización técnica gratuitos a los pros.',
      'Checklist de diagnóstico preventivo para que los técnicos identifiquen riesgos estructurales en casas antiguas.',
      'Evaluación de la calidad de insumos y repuestos recomendados en las cotizaciones para evitar materiales defectuosos.',
      'Creación del estándar de "Entrega Impecable": dejar el área de trabajo más limpia y ordenada de cómo se encontró.'
    ],
    app: [
      'Checklist Técnico Obligatorio en la app antes de cerrar el trabajo: [Prueba de presión] / [Tensión eléctrica medida].',
      'Glosario Visual de Averías: ayuda al cliente a identificar si su daño es un empaque, sifón, flotador o tubería rota.',
      'Insignia de "Especialista Certificado RETIE" para electricistas con matrícula técnica profesional verificada.',
      'Calculadora de Materiales para el técnico: estimar metros de tubo o galones de pintura según las medidas del área.',
      'Guía interactiva de seguridad para el cliente: "Qué hacer mientras llega el técnico (ej. cerrar la llave de paso)".',
      'Opción para que el técnico adjunte la foto de la factura de los repuestos comprados en ferretería para reembolso.',
      'Recomendaciones de mantenimiento preventivo post-servicio: consejos prácticos para alargar la vida del arreglo.',
      'Evaluación de limpieza y orden como criterio independiente en las estrellas de calificación del profesional.',
      'Manual de solución de fallas frecuentes disponible sin internet para consulta rápida del técnico en la app.',
      'Sello de "Trabajo con Estándar Técnico Rebuske" en el comprobante final de servicio.'
    ]
  },
  {
    name: 'Andrea',
    prefix: '🤝',
    suffix: '🤝',
    role: 'Alianzas Estratégicas & Gremios',
    dept: 'Operaciones & Cobertura',
    puesto: [
      'Alianzas con las principales cadenas de ferreterías de Antioquia para descuentos exclusivos a técnicos en materiales.',
      'Convenios con empresas de seguros para pólizas colectivas de responsabilidad civil extracontractual para el hogar.',
      'Articulación con gremios inmobiliarios (Lonja de Medellín) para atender reparaciones en apartamentos en arriendo.',
      'Acuerdos con marcas de motos y talleres locales para mantenimiento preferencial de los vehículos de los técnicos.',
      'Alianzas con fintechs de ahorro y crédito para que los técnicos puedan adquirir motos o herramientas a cuotas justas.',
      'Mesa de trabajo con administraciones de propiedad horizontal en El Poblado, Laureles y Envigado.',
      'Convenios con cooperativas de ahorro y crédito de Antioquia para educación financiera a las familias de los pros.',
      'Integración con plataformas de domicilios de materiales para despacho express de repuestos directo a la obra.',
      'Alianzas corporativas con empresas de telecomunicaciones para planes móviles prepago económicos a profesionales.',
      'Informes bimensuales de beneficios tangibles generados por alianzas para técnicos y clientes de Rebuske.'
    ],
    app: [
      'Sección "Beneficios Rebuske Pro": cupones y descuentos en ferreterías aliadas con código QR en el celular.',
      'Convenio "Rebuske Inmobiliarias": panel especial para que propietarios gestionen reparaciones de sus inmuebles.',
      'Descuento en repuestos al pagar a través de la app en ferreterías afiliadas al ecosistema Rebuske.',
      'Seguro de Hogar Opcional: protección contra daños mayores respaldada por aseguradora en 1 solo clic.',
      'Alianza con talleres de moto: agendamiento de cambio de aceite con descuento desde el perfil del técnico.',
      'Convenio con entidades de salud: acceso a planes de medicina prepagada o emergencias médicas familiares.',
      'Módulo de Compras de Insumos: el técnico puede solicitar que una ferretería cercana envíe el tubo por moto.',
      'Insignia "Aliado Corporativo" para empresas de mantenimiento que cumplan los estándares de calidad Rebuske.',
      'Puntos Rebuske: acumulación de puntos por servicios completados canjeables por herramientas en ferreterías.',
      'Directorio interactivo de ferreterías aliadas más cercanas a la ubicación actual del técnico en Medellín.'
    ]
  },
  {
    name: 'Daniela',
    prefix: '🔎',
    suffix: '🔎',
    role: 'Investigación & Oportunidades de Mercado',
    dept: 'Operaciones & Cobertura',
    puesto: [
      'Estudios de campo trimestrales sobre necesidades insatisfechas del hogar en el Valle de Aburrá.',
      'Vigilancia de modelos de negocio internacionales (Urban Company, TaskRabbit, Thumbtack, ManoMano).',
      'Mapeo de nuevas categorías de alta demanda potencial: armado de muebles modulares, instalación de paneles solares, domótica.',
      'Monitoreo de hábitos de consumo de familias jóvenes vs adultos mayores en Medellín para adaptar la oferta.',
      'Investigación sobre barreras de adopción del pago digital en estratos 2 y 3 para diseñar estrategias de inclusión.',
      'Análisis de la estacionalidad de ingresos de los trabajadores informales para formular incentivos anticíclicos.',
      'Encuestas cualitativas en profundidad con amas de casa y jefes de hogar sobre percepciones de seguridad doméstica.',
      'Identificación de oportunidades de expansión metropolitana hacia Rionegro, La Ceja y el Oriente Antioqueño.',
      'Monitoreo de la satisfacción laboral y calidad de vida de los profesionales vinculados a la plataforma.',
      'Publicación del "Informe Semestral del Hogar en Medellín": datos sobre daños más comunes y costos reales.'
    ],
    app: [
      'Nuevas Categorías Piloto: botón para solicitar servicios especiales ("Instalación de TV", "Mallas de balcón").',
      'Votación de Nuevas Zonas: "¿Quieres Rebuske en tu municipio? Elige Rionegro, Sabaneta o Copacabana".',
      'Categoría Verde "Eco-Hogar": servicios de ahorro de agua, bombillos LED y mantenimiento de paneles solares.',
      'Módulo de Domótica Fácil: instalación y configuración de cerraduras inteligentes, cámaras y sensores para el hogar.',
      'Encuesta de 1 Pregunta no intrusiva al finalizar el servicio para entender prioridades de la comunidad.',
      'Opción "Sugiérenos un Oficio": caja de texto para que los clientes pidan servicios que aún no figuren en catálogo.',
      'Paquetes Especiales de Mudanza: combo de desarmado, pintura de entrega de apartamento y retoque de paredes.',
      'Diagnóstico de Eficiencia Energética: checklist para saber cuánto dinero pierde una casa por fugas eléctricas o de agua.',
      'Servicio de Instalación para compras de internet: enlace para que compradores de Homecenter o MercadoLibre contraten armado.',
      'Blog de Consejos Prácticos del Hogar integrado en la app con artículos breves de prevención de humedades y daños.'
    ]
  },
  {
    name: 'Sofia',
    prefix: '📢',
    suffix: '📢',
    role: 'Contenido, Redes & Difusión',
    dept: 'Comunicaciones & Marca',
    puesto: [
      'Calendario editorial mensual con 4 pilares: Educación, Confianza, Orgullo del Oficio y Casos Reales de Medellín.',
      'Monitoreo del Protocolo de Publicación Inmediata (1 Toque) en TikTok (@somos.rebuske), IG (@rebuske.col), FB y X.',
      'Creación de contenido audiovisual nativo en video vertical (Reels y TikTok) con técnicos reales en sus barrios.',
      'Estrategia de guerrilla en grupos comunitarios de Facebook de Laureles, Belén, Envigado y El Poblado.',
      'Monitoreo de menciones de marca y gestión de comentarios en redes sociales con tiempo de respuesta <15 min.',
      'Producción de micro-videos de "Antes y Después" de daños impactantes solucionados con pago protegido.',
      'Campañas de difusión hiperlocales en WhatsApp con infografías optimizadas para reenviar entre vecinos.',
      'Alianzas con micro-creadores de contenido locales enfocados en estilo de vida, arquitectura y hogar en Medellín.',
      'Auditoría semanal de métricas de crecimiento orgánico: alcance, engagement y clics hacia la web app.',
      'Banco de contenidos gráficos fotorrealistas de alta definición archivados y listos para contingencias.'
    ],
    app: [
      'Feed Social "Historias Reales Rebuske" en la pantalla de inicio con fotos y testimonios de vecinos de la ciudad.',
      'Botón de "Compartir mi Arreglo en Instagram/WhatsApp" con plantilla visual bonita de Antes y Después.',
      'Tutoriales en Video de 20 segundos integrados en la app sobre cómo funciona el Pago Protegido Wompi.',
      'Insignia de "Cliente Pionero" para usuarios que compartan su experiencia en redes sociales.',
      'Notificaciones estilo micro-relato: historias inspiradoras de técnicos de Medellín que progresan con su trabajo.',
      'Enlace directo para seguir las redes sociales oficiales de Rebuske desde el pie de página de la app.',
      'Visualizador de Consejos Rápidos en video mientras el cliente espera que lleguen las cotizaciones.',
      'Galería de fotos comunitarias de trabajos destacados de la semana con mención al técnico creador.',
      'Módulo de Promociones de Redes Sociales: ingresar cupón visto en TikTok o Instagram para descuento en primer servicio.',
      'Muro de la Confianza: contador público visible de horas de servicio garantizadas y familias beneficiadas.'
    ]
  },
  {
    name: 'Da vinci',
    prefix: '🎭',
    suffix: '🎭',
    role: 'Identidad de Marca & Voz Cultural',
    dept: 'Comunicaciones & Marca',
    puesto: [
      'Custodia del Manual de Identidad de Marca: coherencia de colores, tipografías y estética fotorrealista y retro.',
      'Consistencia de la Voz Rebuske: voseo paisa natural, cálido, digno, respetuoso y sin tecnicismos pretenciosos.',
      'Diseño de uniformes, chalecos reflectivos, gorras y credenciales físicas para los 100 técnicos primordiales.',
      'Curaduría estética de todas las piezas publicitarias para reflejar la belleza arquitectónica de Medellín.',
      'Desarrollo conceptual del personaje y mascota "Lucio la Luciérnaga" como símbolo de luz y guía en el hogar.',
      'Guía de fotografía y dirección de arte: evitar fotos cliché de modelos de catálogo y mostrar personas reales colombianas.',
      'Evolución del branding sensorial: sonidos de notificación característicos, identidad auditiva y tacto UI.',
      'Manifiesto de Marca "El Orgullo del Oficio" redactado e impreso en póster para entrega a los mejores profesionales.',
      'Supervisión del tono ético y cultural de la marca para enaltecer el trabajo manual como pilar de la sociedad.',
      'Auditoría semiótica de toda la comunicación externa para garantizar que transmita 100% seguridad y familiaridad.'
    ],
    app: [
      'Animación de Bienvenida de "Lucio la Luciérnaga" iluminando el camino al abrir la aplicación por primera vez.',
      'Sonido de Éxito Exclusivo Rebuske (acorde cálido de guitarra y campanilla) al confirmarse el pago protegido.',
      'Paleta de Colores Dinámica que cambia suavemente según la hora del día (modo luz cálida diurna y modo noche descanso).',
      'Certificado de Trabajo con diseño tipo diploma de honor firmado digitalmente para el técnico y el cliente.',
      'Frases de aliento y sabiduría popular paisa en las pantallas de carga ("El trabajo bien hecho no necesita excusas").',
      'Micro-animaciones de herramientas vivas (llave inglesa ajustando, brocha pintando) en los estados de progreso.',
      'Iconografía propia artesanal diseñada a mano para representar cada uno de los oficios del hogar.',
      'Modo Festivo / Cultural: detalles visuales temáticos sutiles para fechas especiales de Medellín (Feria de Flores, Diciembre).',
      'Ficha de Presentación del Técnico con formato elegante tipo tarjeta de visita coleccionable.',
      'Mensaje de Agradecimiento Emotivo al finalizar cada servicio recordando el impacto del apoyo al trabajo local.'
    ]
  }
];

function wrapBase64(buffer) {
  const b64 = buffer.toString('base64');
  const lines = [];
  for (let i = 0; i < b64.length; i += 76) {
    lines.push(b64.slice(i, i + 76));
  }
  return lines.join('\r\n');
}

export function generateMegaReportHTML() {
  const dateStr = new Date().toLocaleDateString('es-CO', {
    timeZone: 'America/Bogota',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let agentsHTML = '';
  let globalCount = 0;

  AGENT_IDEAS.forEach((ag, idx) => {
    agentsHTML += `
      <div style="background:#131B2B;border:1px solid #1E293B;border-radius:16px;padding:22px;margin-bottom:30px;box-shadow:0 10px 25px rgba(0,0,0,0.4);">
        <div style="border-bottom:2px solid #10B981;padding-bottom:14px;margin-bottom:18px;">
          <span style="font-size:26px;vertical-align:middle;margin-right:8px;">${ag.prefix}</span>
          <h2 style="display:inline;margin:0;font-size:20px;font-weight:800;color:#FFFFFF;letter-spacing:-0.4px;">
            ${ag.prefix} ${ag.name} ${ag.suffix}
          </h2>
          <span style="display:inline-block;margin-left:10px;padding:3px 10px;border-radius:99px;background:rgba(16,185,129,0.15);color:#10B981;font-size:11px;font-weight:700;border:1px solid rgba(16,185,129,0.3);text-transform:uppercase;">
            ${ag.role} · ${ag.dept}
          </span>
        </div>

        <!-- 10 IDEAS EN SU PUESTO -->
        <div style="margin-bottom:20px;">
          <h3 style="margin:0 0 10px 0;font-size:14px;font-weight:800;color:#38BDF8;text-transform:uppercase;letter-spacing:0.5px;">
            🛠️ 10 Ideas de Mejora en su Puesto & Procesos Internos:
          </h3>
          <ol style="margin:0;padding-left:22px;color:#CBD5E1;font-size:13px;line-height:1.7;">
            ${ag.puesto.map(idea => `<li><strong>${idea}</strong></li>`).join('')}
          </ol>
        </div>

        <!-- 10 IDEAS PARA LA APP -->
        <div>
          <h3 style="margin:0 0 10px 0;font-size:14px;font-weight:800;color:#FBBF24;text-transform:uppercase;letter-spacing:0.5px;">
            📱 10 Ideas de Mejora para la App Rebuske (Producto & Usuarios):
          </h3>
          <ol style="margin:0;padding-left:22px;color:#CBD5E1;font-size:13px;line-height:1.7;">
            ${ag.app.map(idea => `<li><strong>${idea}</strong></li>`).join('')}
          </ol>
        </div>
      </div>
    `;
    globalCount += ag.puesto.length + ag.app.length;
  });

  const fullHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Rebuske · Congreso de Agentes (520 Ideas de Mejora)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070B14; color: #F8FAFC; margin: 0; padding: 24px 12px; }
    .container { max-width: 820px; margin: 0 auto; background-color: #0B111E; border: 1px solid #1E293B; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.8); }
    .hero { background: linear-gradient(135deg, #064E3B 0%, #065F46 50%, #0F172A 100%); padding: 32px 28px; border-bottom: 2px solid #10B981; }
    .hero h1 { margin: 0 0 8px 0; font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.6px; }
    .hero p { margin: 0; font-size: 14px; color: #A7F3D0; line-height: 1.5; }
    .stat-bar { display: flex; gap: 12px; margin-top: 18px; flex-wrap: wrap; }
    .stat-pill { background: rgba(0,0,0,0.3); border: 1px solid rgba(16,185,129,0.3); padding: 6px 14px; border-radius: 99px; font-size: 12px; font-weight: 700; color: #A7F3D0; }
    .body-content { padding: 28px; }
    .footer { text-align: center; padding: 24px; font-size: 12px; color: #64748B; border-top: 1px solid #1E293B; background: #070D18; }
  </style>
</head>
<body>
  <div class="container">
    <div class="hero">
      <h1>👑 REBUSKE HQ · CONGRESO MAESTRO DE AGENTES</h1>
      <p>
        Dossier Oficial de <strong>520 Ideas de Mejora</strong> (20 por cada uno de los 26 agentes especializados).<br>
        10 mejoras operativas en su puesto + 10 funcionalidades transformadoras para la App Rebuske.
      </p>
      <div class="stat-bar">
        <span class="stat-pill">👥 26 Agentes Participantes</span>
        <span class="stat-pill">💡 520 Propuestas Detalladas</span>
        <span class="stat-pill">📍 Cobertura Valle de Aburrá</span>
        <span class="stat-pill">🛡️ Bóveda Wompi & Garantía 48h</span>
        <span class="stat-pill">📅 ${dateStr}</span>
      </div>
    </div>

    <div class="body-content">
      <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:12px;padding:16px 20px;margin-bottom:28px;font-size:13.5px;color:#E2E8F0;line-height:1.6;">
        <strong>Dirigido a: 👑 Canashi 👑 (CEO & Fundador)</strong><br>
        Tras debatir internamente, auditar las mejores prácticas globales del sector de Home Services (Urban Company, Thumbtack, TaskRabbit) y analizar el contexto socio-técnico de Medellín, el equipo completo de 26 agentes presenta formalmente sus 20 propuestas concretas para llevar a Rebuske del estándar de producción al liderazgo indiscutible en Colombia.
      </div>

      ${agentsHTML}
    </div>

    <div class="footer">
      Rebuske Medellín · Sistema Inteligente de Operaciones & Innovación Continua<br>
      Documento confidencial despachado directamente a <strong>holarebuske@gmail.com</strong>
    </div>
  </div>
</body>
</html>
  `;

  return { html: fullHTML, totalIdeas: globalCount, agentsCount: AGENT_IDEAS.length };
}

export function sendMegaReportEmail() {
  return new Promise((resolve, reject) => {
    const reportData = generateMegaReportHTML();
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    let step = 0;
    socket.setEncoding('utf8');

    const boundary = '----=_Rebuske_Ideas_' + Date.now();
    const subject = `👑 [REBUSKE CONGRESO] 520 Ideas de Mejora: 20 por Agente (10 Puesto + 10 App) para el CEO`;
    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
    const fromHeader = `=?UTF-8?B?${Buffer.from('💡 Simón & 🛡️ Dante · Congreso de Agentes Rebuske', 'utf8').toString('base64')}?= <${SMTP_USER}>`;

    const htmlBuffer = Buffer.from(reportData.html, 'utf8');

    socket.on('data', (data) => {
      if (step === 0 && data.startsWith('220')) {
        step = 1;
        socket.write('EHLO localhost\r\n');
      } else if (step === 1 && data.includes('250')) {
        step = 2;
        socket.write('AUTH LOGIN\r\n');
      } else if (step === 2 && data.startsWith('334')) {
        step = 3;
        socket.write(Buffer.from(SMTP_USER).toString('base64') + '\r\n');
      } else if (step === 3 && data.startsWith('334')) {
        step = 4;
        socket.write(Buffer.from(SMTP_PASS).toString('base64') + '\r\n');
      } else if (step === 4 && data.startsWith('235')) {
        step = 5;
        socket.write(`MAIL FROM:<${SMTP_USER}>\r\n`);
      } else if (step === 5 && data.includes('250')) {
        step = 6;
        socket.write(`RCPT TO:<${SMTP_USER}>\r\n`);
      } else if (step === 6 && data.includes('250')) {
        step = 7;
        socket.write('DATA\r\n');
      } else if (step === 7 && data.startsWith('354')) {
        step = 8;

        let mime = '';
        mime += `From: ${fromHeader}\r\n`;
        mime += `To: <${SMTP_USER}>\r\n`;
        mime += `Subject: ${encodedSubject}\r\n`;
        mime += `MIME-Version: 1.0\r\n`;
        mime += `Content-Type: text/html; charset=UTF-8\r\n`;
        mime += `Content-Transfer-Encoding: base64\r\n\r\n`;

        mime += wrapBase64(htmlBuffer) + '\r\n.\r\n';

        socket.write(mime);
      } else if (step === 8 && data.includes('250')) {
        step = 9;
        socket.write('QUIT\r\n');
        resolve({
          success: true,
          totalAgentes: reportData.agentsCount,
          totalIdeas: reportData.totalIdeas,
          message: `Dossier de 520 Ideas enviado exitosamente a ${SMTP_USER}`
        });
      }
    });

    socket.on('error', (err) => {
      reject(err);
    });

    socket.on('end', () => {
      if (step < 8) reject(new Error('Conexión SMTP cerrada antes de completar el envío'));
    });
  });
}

async function main() {
  console.log('Compilando Congreso de Agentes Rebuske (520 Ideas de Mejora)...');
  try {
    const res = await sendMegaReportEmail();
    console.log('Resultado del despacho:', res);
  } catch (err) {
    console.error('Error despachando el congreso de ideas:', err);
  }
}

if (process.argv[1] && process.argv[1].includes('rebuske-20-ideas-per-agent')) {
  main();
}
