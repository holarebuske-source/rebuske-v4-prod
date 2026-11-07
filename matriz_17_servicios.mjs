import fs from 'fs';
import path from 'path';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

// ============================================================================
// DATOS COMPLETOS DE LOS 17 SERVICIOS REBUSKE MEDELLÍN 2026
// ============================================================================
export const SERVICIOS_17 = [
  {
    id: 'limpieza',
    numero: 1,
    nombre: 'Limpieza y Aseo',
    icon: '✨',
    categoriaGrupo: 'hogar',
    descripcion: 'Aseo profesional de hogares, oficinas, tapicería y fin de obra.',
    modalidadPago: 'Labor Única / Paquete Recurrente',
    items: [
      { nombre: 'Limpieza profunda de hogares y apartamentos', precio: '$80.000 COP', detalle: 'Cocina, baños, pisos, ventanas y alcobas' },
      { nombre: 'Aseo de oficinas y espacios comerciales', precio: '$90.000 COP', detalle: 'Limpieza integral de puestos de trabajo y áreas comunes' },
      { nombre: 'Limpieza post-construcción o remodelación', precio: '$120.000 COP', detalle: 'Retiro de polvo fino, pintura residual y manchas' },
      { nombre: 'Desinfección y sanitización de espacios', precio: '$75.000 COP', detalle: 'Nebulización y aplicación de bactericidas certificados' },
      { nombre: 'Limpieza de muebles, alfombras y tapicería', precio: '$60.000 COP', detalle: 'Inyección-succión para sofás, sillas y colchones' }
    ]
  },
  {
    id: 'plomeria',
    numero: 2,
    nombre: 'Plomería',
    icon: '🔧',
    categoriaGrupo: 'hogar',
    descripcion: 'Destapes, fugas de agua, griferías y redes hidráulicas residenciales.',
    modalidadPago: 'Labor Única',
    items: [
      { nombre: 'Destape de cañerías, lavamanos y desagües', precio: '$60.000 COP', detalle: 'Sonda mecánica no corrosiva para sifones y bajantes' },
      { nombre: 'Detección y reparación de fugas de agua', precio: '$75.000 COP', detalle: 'Fugas visibles en acoples, llaves de paso y sanitarios' },
      { nombre: 'Instalación de grifería, mezcladores y sanitarios', precio: '$90.000 COP', detalle: 'Montaje de lavaplatos, duchas y baterías de baño' },
      { nombre: 'Cambio de tuberías PVC/CPVC y redes hidráulicas', precio: '$110.000 COP', detalle: 'Sustitución de tramos fisurados con prueba de presión' },
      { nombre: 'Mantenimiento de tanques de reserva e hidróflores', precio: '$120.000 COP', detalle: 'Lavado, desinfección y calibración de presurizador' }
    ]
  },
  {
    id: 'electricidad',
    numero: 3,
    nombre: 'Electricidad',
    icon: '⚡',
    categoriaGrupo: 'hogar',
    descripcion: 'Cortocircuitos, cableado, lámparas, tomas y cuadros eléctricos.',
    modalidadPago: 'Labor Única',
    items: [
      { nombre: 'Reparación de cortocircuitos y breaker disparado', precio: '$70.000 COP', detalle: 'Aislamiento de falla con multímetro y corrección' },
      { nombre: 'Instalación de lámparas, ventiladores y puntos de luz', precio: '$60.000 COP', detalle: 'Fijación segura en techo y empalmes certificados' },
      { nombre: 'Cambio de tomas eléctricos e interruptores (hasta 3)', precio: '$50.000 COP', detalle: 'Reemplazo de tomas polarizadas o dobles' },
      { nombre: 'Instalaciones eléctricas completas para hogares', precio: '$250.000 COP', detalle: 'Tendido de líneas independientes según norma RETIE' },
      { nombre: 'Revisión de tableros eléctricos y cableado estructurado', precio: '$85.000 COP', detalle: 'Balanceo de cargas e inspección térmica' }
    ]
  },
  {
    id: 'pintura',
    numero: 4,
    nombre: 'Pintura y Acabados',
    icon: '🎨',
    categoriaGrupo: 'hogar',
    descripcion: 'Pintura interior, fachadas, estuco, drywall y acabados finos.',
    modalidadPago: 'Labor Única / Hitos de Obra',
    items: [
      { nombre: 'Pintura interior de paredes y techos', precio: '$70.000 COP', detalle: 'Tarifa base por alcoba o $9.000 COP / m² dos manos' },
      { nombre: 'Pintura exterior y fachadas', precio: '$180.000 COP', detalle: 'Pintura coraza resistente a intemperie y humedad' },
      { nombre: 'Resane de humedades y estucado', precio: '$80.000 COP', detalle: 'Tratamiento antihongos, masillado y lijado fino' },
      { nombre: 'Instalación de drywall y cielorrasos', precio: '$38.000 COP', detalle: 'Por metro cuadrado instalado y encintado' },
      { nombre: 'Acabados decorativos y texturizados', precio: '$45.000 COP', detalle: 'Microcemento, veneciano y pintura arquitectónica' }
    ]
  },
  {
    id: 'carpinteria',
    numero: 5,
    nombre: 'Carpintería',
    icon: '🪵',
    categoriaGrupo: 'hogar',
    descripcion: 'Muebles, cocinas integrales, puertas, closets y ensamble modular.',
    modalidadPago: 'Labor Única / Hitos de Proyecto',
    items: [
      { nombre: 'Reparación y restauración de muebles', precio: '$70.000 COP', detalle: 'Ajuste de estructuras, lijado, tintilla y barniz' },
      { nombre: 'Fabricación e instalación de cocinas integrales', precio: '$350.000 COP', detalle: 'Por módulo / metro lineal con herrajes de cierre lento' },
      { nombre: 'Cambio de puertas, ventanas y bisagras', precio: '$65.000 COP', detalle: 'Cepillado, ajuste de marcos y cambio de pivotes' },
      { nombre: 'Ensamble de muebles modulares (RTA)', precio: '$60.000 COP', detalle: 'Armado de escritorios, centros de entretenimiento y closets' },
      { nombre: 'Construcción de closets y mobiliario a medida', precio: '$320.000 COP', detalle: 'Melamina rh resistente a humedad con divisiones' }
    ]
  },
  {
    id: 'cerrajeria',
    numero: 6,
    nombre: 'Cerrajería y Seguridad',
    icon: '🔑',
    categoriaGrupo: 'hogar',
    descripcion: 'Aperturas express sin daños, cerraduras digitales y copias de seguridad.',
    modalidadPago: 'Labor Única',
    items: [
      { nombre: 'Apertura express de puertas residenciales (sin daños)', precio: '$60.000 COP', detalle: 'Ganzuado técnico profesional para puertas cerradas' },
      { nombre: 'Cambio de cerraduras, pomos y cilindros de seguridad', precio: '$80.000 COP', detalle: 'Desmonte e instalación con juego de llaves nuevas' },
      { nombre: 'Instalación de cerrojos multipunto y cerraduras digitales', precio: '$120.000 COP', detalle: 'Configuración biométrica de huella, código y tarjeta' },
      { nombre: 'Duplicado de llaves y controles remotos', precio: '$25.000 COP', detalle: 'Copias de llaves de seguridad y control vehicular' },
      { nombre: 'Asesoría en sistemas de seguridad para el hogar', precio: '$35.000 COP', detalle: 'Visita diagnóstica abonable al 100% de la instalación' }
    ]
  },
  {
    id: 'jardineria',
    numero: 7,
    nombre: 'Jardinería y Exteriores',
    icon: '🌿',
    categoriaGrupo: 'hogar',
    descripcion: 'Poda, paisajismo, fumigación, sistemas de riego y zonas verdes.',
    modalidadPago: 'Labor Única / Paquete Recurrente',
    items: [
      { nombre: 'Poda de árboles, arbustos y césped', precio: '$65.000 COP', detalle: 'Orillado, guadañado y perfilado de setos vivos' },
      { nombre: 'Diseño y mantenimiento de jardines', precio: '$90.000 COP', detalle: 'Abonado orgánico, desyerbe y reposición de plantas' },
      { nombre: 'Instalación de sistemas de riego', precio: '$140.000 COP', detalle: 'Riego por goteo o aspersión programable' },
      { nombre: 'Control de plagas y fumigación', precio: '$85.000 COP', detalle: 'Manejo fitosanitario ecológico contra insectos y hongos' },
      { nombre: 'Paisajismo y embellecimiento de zonas verdes', precio: '$120.000 COP', detalle: 'Siembra decorativa con piedras de río y corteza' }
    ]
  },
  {
    id: 'construccion',
    numero: 8,
    nombre: 'Construcción y Remodelación',
    icon: '🧱',
    categoriaGrupo: 'hogar',
    descripcion: 'Remodelaciones de baños, cocinas, losas, impermeabilización y obra civil.',
    modalidadPago: 'Hitos Certificados (30% / 35% / 35%)',
    items: [
      { nombre: 'Remodelación de baños y cocinas', precio: '$450.000 COP', detalle: 'Mano de obra por hito certificado con peritaje' },
      { nombre: 'Ampliaciones y adecuaciones locativas', precio: '$35.000 COP', detalle: 'Visita técnica de diagnóstico y presupuesto detallado' },
      { nombre: 'Obra civil y acabados generales', precio: '$150.000 COP', detalle: 'Enchape porcelanato, nivelación de pisos y muros' },
      { nombre: 'Impermeabilización de losas y cubiertas', precio: '$32.000 COP', detalle: 'Por m² con manto asfáltico o polímero acrílico' },
      { nombre: 'Consultoría y supervisión de proyectos', precio: '$120.000 COP', detalle: 'Interventoría técnica y peritaje de avance' }
    ]
  },
  {
    id: 'mudanzas',
    numero: 9,
    nombre: 'Mudanzas y Transporte',
    icon: '📦',
    categoriaGrupo: 'transporte',
    descripcion: 'Acarreos en camioneta, trasteos en furgón, embalaje y transporte de carga.',
    modalidadPago: 'Labor Única',
    items: [
      { nombre: 'Mudanzas residenciales (camioneta o furgón)', precio: '$90.000 COP', detalle: 'Desde $90k en camioneta a $220k furgón mediano' },
      { nombre: 'Transporte de carga y mercancía', precio: '$80.000 COP', detalle: 'Rutas urbanas en Medellín y Valle de Aburrá' },
      { nombre: 'Embalaje profesional y desmontaje de muebles', precio: '$70.000 COP', detalle: 'Plástico vinipel, mantas protectoras y desarme' },
      { nombre: 'Mudanzas nacionales e intermunicipales', precio: '$400.000 COP', detalle: 'Oriente Antioqueño, Eje Cafetero y Bogotá' },
      { nombre: 'Servicio de trasteo para oficinas y empresas', precio: '$250.000 COP', detalle: 'Traslado seguro de puestos de trabajo y tecnología' }
    ]
  },
  {
    id: 'electrodomesticos',
    numero: 10,
    nombre: 'Electrodomésticos',
    icon: '🧊',
    categoriaGrupo: 'tecnologia',
    descripcion: 'Reparación de neveras, lavadoras, calentadores y estufas a gas.',
    modalidadPago: 'Labor Única',
    items: [
      { nombre: 'Reparación de neveras y refrigeradores', precio: '$85.000 COP', detalle: 'Carga de gas, cambio de termostato, bimetálico y motor' },
      { nombre: 'Servicio técnico para lavadoras y secadoras', precio: '$80.000 COP', detalle: 'Cambio de bomba de desagüe, bandas y tarjeta electrónica' },
      { nombre: 'Mantenimiento de estufas, hornos y calentadores', precio: '$75.000 COP', detalle: 'Limpieza de inyectores, cambio de diafragma y termocupla' },
      { nombre: 'Instalación de electrodomésticos nuevos', precio: '$60.000 COP', detalle: 'Conexión hídrica, eléctrica y de gas bajo norma' },
      { nombre: 'Diagnóstico y reparación de fallas electrónicas', precio: '$70.000 COP', detalle: 'Revisión de tarjetas de potencia y sensores digitales' }
    ]
  },
  {
    id: 'tecnologia',
    numero: 11,
    nombre: 'Tecnología e Instalación',
    icon: '💻',
    categoriaGrupo: 'tecnologia',
    descripcion: 'Computadores, celulares, redes WiFi, cámaras CCTV y domótica.',
    modalidadPago: 'Labor Única',
    items: [
      { nombre: 'Reparación de computadores portátiles y de escritorio', precio: '$60.000 COP', detalle: 'Formateo, cambio de disco a SSD y mantenimiento térmico' },
      { nombre: 'Servicio técnico para celulares y tablets', precio: '$50.000 COP', detalle: 'Cambio de pantalla, batería y puerto de carga' },
      { nombre: 'Instalación y configuración de redes WiFi', precio: '$55.000 COP', detalle: 'Configuración de routers, puntos de acceso Mesh y cableado' },
      { nombre: 'Instalación de cámaras de seguridad y CCTV', precio: '$75.000 COP', detalle: 'Por punto de cámara con monitoreo en app móvil' },
      { nombre: 'Mantenimiento preventivo de equipos tecnológicos', precio: '$50.000 COP', detalle: 'Limpieza interna de disipadores y optimización SO' }
    ]
  },
  {
    id: 'automoviles',
    numero: 12,
    nombre: 'Automóviles',
    icon: '🚗',
    categoriaGrupo: 'transporte',
    descripcion: 'Mecánica ligera, detailing a domicilio, cambio de aceite y sonido.',
    modalidadPago: 'Labor Única',
    items: [
      { nombre: 'Mecánica general y diagnóstico vehicular', precio: '$70.000 COP', detalle: 'Escaneo con escáner OBD2 y revisión preventiva' },
      { nombre: 'Lavado y detailing a domicilio (interior y exterior)', precio: '$45.000 COP', detalle: 'Lavado ecológico sin reguero de agua y porcelanizado' },
      { nombre: 'Cambio de aceite, lubricación y mantenimiento', precio: '$45.000 COP', detalle: 'Mano de obra para cambio de filtro y fluidos' },
      { nombre: 'Alineación, balanceo y cambio de llantas', precio: '$50.000 COP', detalle: 'Montaje de llantas y calibración computarizada' },
      { nombre: 'Instalación de accesorios y sonido automotriz', precio: '$65.000 COP', detalle: 'Radios Android, alarmas, sensores de reversa y bafles' }
    ]
  },
  {
    id: 'digital',
    numero: 13,
    nombre: 'Diseño, Tecnología y Servicios Digitales',
    icon: '🚀',
    categoriaGrupo: 'digital',
    descripcion: 'Páginas web, tiendas online, branding, marketing digital y apps móviles.',
    modalidadPago: 'Hitos Certificados (30% / 35% / 35%)',
    items: [
      { nombre: 'Diseño y desarrollo de páginas web', precio: '$350.000 COP', detalle: 'Sitio web profesional responsive con hosting y dominio' },
      { nombre: 'Creación de tiendas online y landings', precio: '$220.000 COP', detalle: 'Página de aterrizaje optimizada para ventas y WhatsApp' },
      { nombre: 'Diseño gráfico y branding corporativo', precio: '$150.000 COP', detalle: 'Logotipo profesional, paleta de color y manual de marca' },
      { nombre: 'Marketing digital y manejo de redes sociales', precio: '$250.000 COP', detalle: 'Gestión mensual de contenido en Instagram, TikTok y Meta Ads' },
      { nombre: 'Desarrollo de aplicaciones móviles', precio: '$600.000 COP', detalle: 'Módulo o hito de desarrollo para Android e iOS' }
    ]
  },
  {
    id: 'educacion',
    numero: 14,
    nombre: 'Clases y Educación',
    icon: '🎓',
    categoriaGrupo: 'educacion',
    descripcion: 'Clases particulares de matemáticas, idiomas, música y habilidades digitales.',
    modalidadPago: 'Bóveda de Sesiones Progresivas (Pago por Clase Validada)',
    esSesiones: true,
    items: [
      { 
        nombre: 'Clases particulares de matemáticas, física y química', 
        precio: '$35.000 COP / hora', 
        detalle: 'Pack 4 sesiones (2 semanas): $130.000 COP · Pack 8 sesiones (1 mes): $240.000 COP' 
      },
      { 
        nombre: 'Refuerzo escolar y apoyo académico', 
        precio: '$30.000 COP / hora', 
        detalle: 'Acompañamiento en tareas escolares y preparación de exámenes' 
      },
      { 
        nombre: 'Clases de idiomas (inglés, francés, etc.)', 
        precio: '$40.000 COP / hora', 
        detalle: 'Pack 4 sesiones conversacionales (2 semanas): $150.000 COP' 
      },
      { 
        nombre: 'Enseñanza de música e instrumentos (guitarra, piano, técnica vocal)', 
        precio: '$40.000 COP / hora', 
        detalle: 'Pack 4 clases (2 semanas): $150.000 COP · Pack 8 clases (1 mes): $280.000 COP' 
      },
      { 
        nombre: 'Capacitación en habilidades digitales y tecnología', 
        precio: '$45.000 COP / hora', 
        detalle: 'Programación básica, Excel avanzado y herramientas de IA' 
      }
    ]
  },
  {
    id: 'belleza',
    numero: 15,
    nombre: 'Belleza y Cuidado Personal',
    icon: '💇',
    categoriaGrupo: 'bienestar',
    descripcion: 'Cortes, peinados, manicure, estética facial y masajes a domicilio.',
    modalidadPago: 'Labor Única / Paquete de Bienestar',
    items: [
      { nombre: 'Cortes de cabello, peinados y coloración', precio: '$35.000 COP', detalle: 'Corte unisex o secado/ondas a domicilio con bioseguridad' },
      { nombre: 'Manicure, pedicure y uñas acrílicas/gel', precio: '$40.000 COP', detalle: 'Semipermanente con instrumental esterilizado individual' },
      { nombre: 'Tratamientos faciales y cuidado de la piel', precio: '$65.000 COP', detalle: 'Limpieza profunda, microdermoabrasión y mascarilla' },
      { nombre: 'Depilación y tratamientos corporales', precio: '$45.000 COP', detalle: 'Cera miel vegetal o roll-on para diferentes zonas' },
      { nombre: 'Masajes relajantes y terapias de bienestar', precio: '$80.000 COP', detalle: 'Sesión completa de 60 min con aceites esenciales' }
    ]
  },
  {
    id: 'eventos',
    numero: 16,
    nombre: 'Eventos',
    icon: '🎉',
    categoriaGrupo: 'eventos',
    descripcion: 'Catering, fotografía, decoración, sonido y organización integral.',
    modalidadPago: 'Hitos de Evento (50% Reserva / 50% Día del Evento)',
    items: [
      { nombre: 'Catering y servicio gastronómico para eventos', precio: '$35.000 COP', detalle: 'Por persona con plato principal, bebida y pasabocas' },
      { nombre: 'Fotografía y video de eventos sociales', precio: '$120.000 COP', detalle: 'Por hora de cubrimiento con galería editada en alta resolución' },
      { nombre: 'Decoración y diseño de espacios para celebraciones', precio: '$200.000 COP', detalle: 'Arcos de globos orgánicos, mobiliario temático y flores' },
      { nombre: 'Organización integral de bodas y fiestas', precio: '$450.000 COP', detalle: 'Planeación de proveedores, protocolo y coordinación en sitio' },
      { nombre: 'Alquiler de equipos de sonido, iluminación y karaoke', precio: '$150.000 COP', detalle: 'Cabinas activas, micrófonos inalámbricos y luces disco' }
    ]
  },
  {
    id: 'profesional',
    numero: 17,
    nombre: 'Servicios Profesionales',
    icon: '⚖️',
    categoriaGrupo: 'profesional',
    descripcion: 'Asesoría legal, contabilidad, impuestos, consultoría y constitución de empresas.',
    modalidadPago: 'Labor Única / Asesoría Progresiva',
    items: [
      { nombre: 'Asesoría legal y representación jurídica', precio: '$90.000 COP', detalle: 'Concepto jurídico civil, laboral, comercial o inmobiliario' },
      { nombre: 'Contabilidad, impuestos y revisoría fiscal', precio: '$80.000 COP', detalle: 'Declaración de renta personal o contabilidad mensual pyme' },
      { nombre: 'Consultoría empresarial y financiera', precio: '$120.000 COP', detalle: 'Plan de negocios, reducción de costos y estructuración' },
      { nombre: 'Auditoría y gestión administrativa', precio: '$150.000 COP', detalle: 'Revisión de procesos internos y control de riesgos' },
      { nombre: 'Trámites legales y constitución de empresas', precio: '$200.000 COP', detalle: 'Creación de SAS en Cámara de Comercio, RUT y estatutos' }
    ]
  }
];

console.log('✅ Matriz oficial de 17 servicios configurada con 85 sub-servicios y precios aproximados de mercado en Medellín.');
