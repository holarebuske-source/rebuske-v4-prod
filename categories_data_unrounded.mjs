export const CATEGORIES_DATA = [
  {
    id: 'limpieza',
    group: 'hogar',
    num: '1',
    name: 'Limpieza y Aseo',
    iconKey: 'limpieza',
    basePrice: 'desde $82.540 COP',
    desc: 'Aseo profesional de hogares, oficinas, tapicería y fin de obra con personal verificado.',
    modality: 'Labor Única / Paquete Recurrente',
    rows: [
      { name: 'Limpieza profunda de hogares y apartamentos', detail: 'Cocina, baños, pisos, ventanas y alcobas', price: '$82.540 COP' },
      { name: 'Lavado y desinfección de muebles y sofás', detail: 'Inyección-extracción profunda con vapor', price: '$74.820 COP' },
      { name: 'Aseo general de oficinas y locales comerciales', detail: 'Jornada por labor o desinfección programada', price: '$93.650 COP' },
      { name: 'Limpieza fin de obra y remodelaciones', detail: 'Remoción de polvo fino, pintura y escombros leves', price: '$142.380 COP' },
      { name: 'Lavado y aspirado de alfombras y tapetes', detail: 'Por metro cuadrado o pieza individual', price: '$57.490 COP' }
    ]
  },
  {
    id: 'plomeria',
    group: 'hogar',
    num: '2',
    name: 'Plomería y Redes Hidráulicas',
    iconKey: 'plomeria',
    basePrice: 'desde $62.840 COP',
    desc: 'Reparación de fugas, destapes urgentes, griferías y redes de agua potable.',
    modality: 'Labor Única / Bóveda Escrow',
    rows: [
      { name: 'Reparación de fuga visible en tubería de agua', detail: 'PVC, cobre o galvanizado en cocina o baño', price: '$62.840 COP' },
      { name: 'Destape de cañerías, bajantes y sifones', detail: 'Sonda eléctrica o destape mecánico sin romper', price: '$68.920 COP' },
      { name: 'Instalación de grifería, lavamanos y sanitarios', detail: 'Cambio de mezclador, llave de paso o cisterna', price: '$74.380 COP' },
      { name: 'Reparación de tubería oculta o empate PVC', detail: 'Picada técnica puntual y sellado hermético', price: '$132.690 COP' },
      { name: 'Detección técnica de fugas con geófono', detail: 'Localización acústica no destructiva bajo piso', price: '$184.750 COP' }
    ]
  },
  {
    id: 'electricidad',
    group: 'hogar',
    num: '3',
    name: 'Electricidad Residencial y Comercial',
    iconKey: 'electricidad',
    basePrice: 'desde $52.540 COP',
    desc: 'Diagnóstico de cortos, breakers, iluminación LED, cableado y redes 110V/220V.',
    modality: 'Labor Única / Bóveda Escrow',
    rows: [
      { name: 'Revisión diagnóstica y reparación de corto circuito', detail: 'Aislamiento de falla y restablecimiento seguro', price: '$52.540 COP' },
      { name: 'Instalación o cambio de tomas, apagadores y rosetas', detail: 'Hasta 3 puntos eléctricos o interruptores dobles', price: '$43.680 COP' },
      { name: 'Instalación de lámparas, paneles LED y reflectores', detail: 'Fijación en techo o muro y conexión segura', price: '$64.250 COP' },
      { name: 'Mantenimiento e instalación de caja de breakers', detail: 'Cambio de tacos térmicos y ajuste de barras', price: '$96.840 COP' },
      { name: 'Cableado estructurado y balanceo de cargas', detail: 'Por circuito independiente o acometida', price: '$143.650 COP' }
    ]
  },
  {
    id: 'pintura',
    group: 'hogar',
    num: '4',
    name: 'Pintura y Acabados de Muros',
    iconKey: 'pintura',
    basePrice: 'desde $56.740 COP',
    desc: 'Resane, estuco, pintura vinilo lavable interior, fachadas e impermeabilización.',
    modality: 'Por Labor / Metro Cuadrado',
    rows: [
      { name: 'Resane puntual y preparación de muros con estuco', detail: 'Corrección de fisuras, humedades secas y lijado', price: '$56.740 COP' },
      { name: 'Pintura por metro cuadrado muro interior', detail: 'Dos manos de vinilo lavable tipo 1', price: '$18.420 COP / m²' },
      { name: 'Pintura completa de apartamento estándar', detail: 'Sala, comedor, 2 alcobas y pasillo (mano de obra)', price: '$428.600 COP' },
      { name: 'Impermeabilización de muros contra humedad', detail: 'Tratamiento hidrófugo y sellador antihongos', price: '$112.450 COP' },
      { name: 'Esmaltado de puertas, rejas y cerrajería metálica', detail: 'Lijado anticorrosivo y esmalte brillante o mate', price: '$73.890 COP' }
    ]
  },
  {
    id: 'carpinteria',
    group: 'hogar',
    num: '5',
    name: 'Carpintería y Ebanistería',
    iconKey: 'carpinteria',
    basePrice: 'desde $64.820 COP',
    desc: 'Muebles a medida, ajuste de puertas, cocinas modulares, closets y barnizado.',
    modality: 'Labor Única / Hitos de Obra',
    rows: [
      { name: 'Ajuste y cepillado de puertas y bisagras', detail: 'Corrección de arrastre, roce con piso o marco', price: '$64.820 COP' },
      { name: 'Armado y ensamble de muebles modulares', detail: 'Escritorios, armarios, racks de TV o cajoneras', price: '$78.340 COP' },
      { name: 'Reparación de cajones, rieles y manijas', detail: 'Cambio de correderas telescópicas o bisagras cierre lento', price: '$53.690 COP' },
      { name: 'Barnizado, tintillado y restauración de muebles', detail: 'Mesas, sillas o puertas de madera maciza', price: '$118.420 COP' },
      { name: 'Fabricación de repisas y estanterías a medida', detail: 'En aglomerado RH o madera pino / cedro', price: '$134.750 COP' }
    ]
  },
  {
    id: 'cerrajeria',
    group: 'hogar',
    num: '6',
    name: 'Cerrajería y Seguridad',
    iconKey: 'cerrajeria',
    basePrice: 'desde $63.480 COP',
    desc: 'Aperturas residenciales urgentes, cambio de guardas, cerraduras biométricas y digitales.',
    modality: 'Labor Única / Urgencia Inmediata',
    rows: [
      { name: 'Apertura de puerta residencial estándar', detail: 'Técnica no destructiva en cilindro o pomo', price: '$63.480 COP' },
      { name: 'Cambio de guarda, cilindro y juego de llaves', detail: 'Incluye suministro de cilindro nuevo y 3 llaves', price: '$84.230 COP' },
      { name: 'Instalación de cerradura de sobreponer', detail: 'Tipo cerrojo de seguridad Yale o Schlage', price: '$76.540 COP' },
      { name: 'Instalación de cerradura de alta seguridad o biométrica', detail: 'Perforación exacta y calibración digital', price: '$124.950 COP' },
      { name: 'Apertura de chapa vehicular o caja fuerte', detail: 'Ganzuado especializado de precisión', price: '$112.380 COP' }
    ]
  },
  {
    id: 'jardineria',
    group: 'hogar',
    num: '7',
    name: 'Jardinería y Exteriores',
    iconKey: 'jardineria',
    basePrice: 'desde $58.340 COP',
    desc: 'Mantenimiento de zonas verdes, poda de árboles, césped y paisajismo.',
    modality: 'Labor Única / Mantenimiento Mensual',
    rows: [
      { name: 'Poda de césped y orillado de jardines', detail: 'Hasta 60 m² con guadaña y recolección verde', price: '$58.340 COP' },
      { name: 'Poda estética de árboles y arbustos', detail: 'Descope seguro, formación y despeje de cables', price: '$83.650 COP' },
      { name: 'Siembra, fertilización y abono orgánico', detail: 'Renovación de tierra negra y sustrato mineral', price: '$72.480 COP' },
      { name: 'Diseño paisajístico y mantenimiento mensual', detail: 'Plan recurrente de riego y cuidado integral', price: '$164.290 COP' },
      { name: 'Fumigación fitosanitaria contra plagas de jardín', detail: 'Tratamiento contra cochinilla, pulgón y hongos', price: '$91.750 COP' }
    ]
  },
  {
    id: 'construccion',
    group: 'hogar',
    num: '8',
    name: 'Construcción y Remodelación',
    iconKey: 'construccion',
    basePrice: 'desde $68.450 COP',
    desc: 'Drywall, mampostería, enchapes, cielo rasos y reformas de baños y cocinas.',
    modality: 'Hitos Certificados / Bóveda Escrow',
    rows: [
      { name: 'Instalación de muros o cielo raso en drywall', detail: 'Estructura metálica, placas yeso y masillado', price: '$68.450 COP / m²' },
      { name: 'Enchape de pisos y paredes en porcelanato / cerámica', detail: 'Nivelación, pegacor y emboquillado técnico', price: '$34.820 COP / m²' },
      { name: 'Demolición controlada y retiro de escombros', detail: 'Muro no estructural con empaque en lonas', price: '$97.640 COP' },
      { name: 'Reparación de grietas y pañete de muros', detail: 'Malla de fibra de vidrio y mortero impermeabilizado', price: '$73.520 COP' },
      { name: 'Remodelación integral de baño o cocina', detail: 'Por hitos certificados en Bóveda Wompi', price: '$584.200 COP' }
    ]
  },
  {
    id: 'mudanzas',
    group: 'transporte',
    num: '9',
    name: 'Mudanzas y Transporte',
    iconKey: 'mudanzas',
    basePrice: 'desde $84.320 COP',
    desc: 'Acarreos urbanos, mudanzas en camión cerrado, coteros y embalaje con plástico burbuja.',
    modality: 'Por Servicio / Trayecto',
    rows: [
      { name: 'Acarreo local express en camioneta', detail: 'Traslado de electrodomésticos o muebles medianos', price: '$84.320 COP' },
      { name: 'Mudanza completa de apartamento en camión estacas', detail: 'Trayecto dentro del Valle de Aburrá con amarre seguro', price: '$248.750 COP' },
      { name: 'Servicio de cargue, descargue y coteros por hora', detail: 'Personal capacitado para pisos por escalera', price: '$42.680 COP / hr' },
      { name: 'Embalaje profesional con plástico burbuja y cartón', detail: 'Protección de televisores, vidrios y vajilla', price: '$67.430 COP' },
      { name: 'Transporte intermunicipal express (Valle de Aburrá)', detail: 'Medellín hacia Rionegro, Girardota o Caldas', price: '$118.920 COP' }
    ]
  },
  {
    id: 'electrodomesticos',
    group: 'tecnologia',
    num: '10',
    name: 'Electrodomésticos y Refrigeración',
    iconKey: 'electrodomesticos',
    basePrice: 'desde $72.640 COP',
    desc: 'Reparación de neveras, lavadoras, secadoras, hornos y calentadores a gas.',
    modality: 'Labor Única / Diagnóstico Abonable',
    rows: [
      { name: 'Mantenimiento y reparación de lavadoras', detail: 'Cambio de bomba, sellos, correas o tarjeta lógica', price: '$83.450 COP' },
      { name: 'Reparación y recarga de gas de neveras', detail: 'Diagnóstico de fuga, filtro secador y gas ecológico R600/134', price: '$114.780 COP' },
      { name: 'Mantenimiento de secadoras de gas o eléctricas', detail: 'Limpieza de ductos de pelusa, termostato y poleas', price: '$87.320 COP' },
      { name: 'Reparación de hornos microondas y estufas', detail: 'Cambio de magnetrón, chisperos o válvulas de gas', price: '$72.640 COP' },
      { name: 'Instalación y anclaje de campanas extractoras', detail: 'Ducto exterior o recirculante con filtro de carbón', price: '$68.950 COP' }
    ]
  },
  {
    id: 'tecnologia',
    group: 'tecnologia',
    num: '11',
    name: 'Tecnología e Instalación',
    iconKey: 'tecnologia',
    basePrice: 'desde $54.380 COP',
    desc: 'Soporte de computadores, redes WiFi, cámaras de seguridad CCTV y domótica.',
    modality: 'Labor Única / Bóveda Escrow',
    rows: [
      { name: 'Mantenimiento preventivo y formateo de computador', detail: 'Limpieza física, pasta térmica y reinstalación limpia', price: '$68.420 COP' },
      { name: 'Eliminación de virus y optimización de sistema operativo', detail: 'Aceleración de arranque y respaldo de archivos', price: '$54.380 COP' },
      { name: 'Instalación y configuración de cámaras de seguridad CCTV', detail: 'Cableado UTP, configuración IP y acceso móvil remoto', price: '$93.750 COP' },
      { name: 'Configuración y optimización de red WiFi / repetidores', detail: 'Eliminación de zonas muertas y routers mesh', price: '$62.840 COP' },
      { name: 'Montaje y anclaje de soporte de TV en pared', detail: 'Nivelación láser y chazos expansivos hasta 75"', price: '$48.650 COP' }
    ]
  },
  {
    id: 'automoviles',
    group: 'transporte',
    num: '12',
    name: 'Automóviles y Motos',
    iconKey: 'automoviles',
    basePrice: 'desde $58.740 COP',
    desc: 'Mecánica preventiva a domicilio, cambio de aceite, frenos, escáner y desvares.',
    modality: 'Labor Única / A Domicilio',
    rows: [
      { name: 'Cambio de aceite y filtros a domicilio', detail: 'Reemplazo de lubricante sintético y filtro de motor', price: '$58.740 COP' },
      { name: 'Sincronización y escaneo computarizado OBD2', detail: 'Lectura de códigos de falla y borrado Check Engine', price: '$83.420 COP' },
      { name: 'Revisión y cambio de pastillas de frenos', detail: 'Purga de líquido y graduación de mordazas', price: '$72.650 COP' },
      { name: 'Lavado ecológico a domicilio interior y motor', detail: 'Limpieza con polímeros sin gastar agua residencial', price: '$64.380 COP' },
      { name: 'Desvare express por batería, llanta o gasolina', detail: 'Paso de corriente con booster profesional o despinche', price: '$53.820 COP' }
    ]
  },
  {
    id: 'digital',
    group: 'digital',
    num: '13',
    name: 'Diseño, Tecnología y Servicios Digitales',
    iconKey: 'digital',
    basePrice: 'desde $64.290 COP',
    desc: 'Diseño gráfico publicitario, páginas web, edición de video para redes y pauta digital.',
    modality: 'Por Proyecto / Hitos Digitales',
    rows: [
      { name: 'Diseño de piezas publicitarias para redes sociales', detail: 'Paquete de 3 banners optimizados para Instagram/Facebook', price: '$64.290 COP' },
      { name: 'Creación de páginas web de aterrizaje (Landing Page)', detail: 'Diseño responsive de alta conversión con hosting', price: '$284.650 COP' },
      { name: 'Edición de videos reels y tiktoks publicitarios', detail: 'Subtitulado dinámico, efectos y formato vertical 9:16', price: '$78.430 COP' },
      { name: 'Configuración de campañas publicitarias en Meta Ads', detail: 'Segmentación de público en Medellín y píxel de eventos', price: '$142.890 COP' },
      { name: 'Optimización SEO y configuración de Google Mi Negocio', detail: 'Posicionamiento en mapas locales de Medellín', price: '$96.540 COP' }
    ]
  },
  {
    id: 'educacion',
    group: 'educacion',
    num: '14',
    name: 'Clases y Educación',
    iconKey: 'educacion',
    basePrice: 'desde $42.860 COP',
    desc: 'Tutorías escolares, matemáticas, física, inglés y clases de instrumentos musicales.',
    modality: 'Sesiones Progresivas / Bóveda por Clases',
    rows: [
      { name: 'Clase de matemáticas, física o química (1 hora)', detail: 'Tutoría personalizada a domicilio o virtual', price: '$42.860 COP' },
      { name: 'Tutoría personalizada de inglés conversacional', detail: 'Práctica intensiva con docente bilingüe calificado', price: '$46.750 COP' },
      { name: 'Refuerzo escolar integral primaria y bachillerato', detail: 'Acompañamiento en tareas y preparación de exámenes', price: '$39.420 COP' },
      { name: 'Clases de guitarra, piano o técnica vocal (1 hora)', detail: 'Metodología práctica para niños, jóvenes y adultos', price: '$47.930 COP' },
      { name: 'Preparación intensiva para pruebas Saber 11 / ICFES', detail: 'Simulacros y estrategias de razonamiento cuantitativo', price: '$53.680 COP' }
    ]
  },
  {
    id: 'belleza',
    group: 'bienestar',
    num: '15',
    name: 'Belleza y Cuidado Personal',
    iconKey: 'belleza',
    basePrice: 'desde $38.450 COP',
    desc: 'Barbería, corte de cabello, manicure, pedicure, masajes relajantes y estética facial.',
    modality: 'Labor Única / A Domicilio',
    rows: [
      { name: 'Corte de cabello y perfilado de barba a domicilio', detail: 'Barbero profesional con protocolo higiénico completo', price: '$38.450 COP' },
      { name: 'Manicure y pedicure tradicional a domicilio', detail: 'Limpieza de cutícula, exfoliación y esmaltado duradero', price: '$44.680 COP' },
      { name: 'Cepillado, planchado y peinado para eventos', detail: 'Ondas al agua o liso espejo con termoprotector', price: '$52.340 COP' },
      { name: 'Masaje relajante descontracturante (1 hora)', detail: 'Aceites esenciales, música relajante y camilla portátil', price: '$78.920 COP' },
      { name: 'Limpieza facial profunda con hidratación', detail: 'Vapor de ozono, extracción de puntos negros y mascarilla', price: '$68.450 COP' }
    ]
  },
  {
    id: 'eventos',
    group: 'eventos',
    num: '16',
    name: 'Eventos y Protocolo',
    iconKey: 'eventos',
    basePrice: 'desde $87.650 COP',
    desc: 'Meseros, bartenders, sonido profesional, animación y fotografía para eventos en Medellín.',
    modality: 'Por Turno / Evento',
    rows: [
      { name: 'Servicio de meseros profesionales por turno de 4 horas', detail: 'Atención impecable de mesas, pasabocas y protocolo', price: '$87.650 COP' },
      { name: 'Sonido profesional e iluminación para reuniones', detail: 'Cabinas activas, micrófonos inalámbricos y luces LED', price: '$194.380 COP' },
      { name: 'Animación, recreación infantil y shows temáticos', detail: 'Pintucaritas, globoflexia y juegos dirigidos', price: '$138.450 COP' },
      { name: 'Bartender profesional y coctelería personalizada', detail: 'Preparación de cócteles clásicos y de autor', price: '$112.640 COP' },
      { name: 'Fotografía y cobertura digital de eventos por hora', detail: 'Entrega de galería digital editada en alta resolución', price: '$94.850 COP' }
    ]
  },
  {
    id: 'profesionales',
    group: 'profesional',
    num: '17',
    name: 'Servicios Profesionales y Legal',
    iconKey: 'profesionales',
    basePrice: 'desde $94.850 COP',
    desc: 'Asesoría jurídica civil/laboral, contabilidad, declaraciones de renta y constitución de SAS.',
    modality: 'Labor Única / Asesoría Progresiva',
    rows: [
      { name: 'Asesoría legal y concepto jurídico civil / laboral', detail: 'Revisión de contratos, reclamaciones o derechos de petición', price: '$94.850 COP' },
      { name: 'Declaración de renta personal o contabilidad mensual pyme', detail: 'Liquidación tributaria con contador público certificado', price: '$83.690 COP' },
      { name: 'Consultoría empresarial y estructuración de costos', detail: 'Diagnóstico de rentabilidad y optimización operativa', price: '$128.450 COP' },
      { name: 'Trámites en Cámara de Comercio y creación de SAS', detail: 'Estatutos, RUT DIAN, matrícula mercantil y actas', price: '$214.780 COP' },
      { name: 'Auditoría interna y gestión administrativa', detail: 'Revisión de procesos de nómina y seguridad social', price: '$156.320 COP' }
    ]
  }
];
