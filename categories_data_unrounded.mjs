export const CATEGORIES_DATA = [
  {
    id: 'limpieza',
    group: 'hogar',
    num: '1',
    name: 'Limpieza y Aseo',
    iconKey: 'limpieza',
    basePrice: 'desde $57.490 COP',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Aseo integral de casas, oficinas, muebles y fin de obra',
    desc: 'Aseo integral de cocina, baños, pisos, ventanas, alcobas, muebles y fin de obra con personal verificado.',
    modality: 'Labor Única / Paquete Recurrente',
    rows: [
      { name: 'Limpieza profunda de hogares', detail: 'Aseo integral de cocina, baños, pisos, ventanas y alcobas', price: '$82.540 COP' },
      { name: 'Lavado de muebles y sofás', detail: 'Limpieza por inyección-extracción profunda con vapor para desinfectar tejidos', price: '$74.820 COP' },
      { name: 'Aseo de oficinas y locales', detail: 'Jornada completa de limpieza o desinfección programada para espacios comerciales', price: '$93.650 COP' },
      { name: 'Limpieza fin de obra', detail: 'Remoción especializada de polvo fino, residuos de pintura y escombros leves post-remodelación', price: '$142.380 COP' },
      { name: 'Lavado de alfombras y tapetes', detail: 'Servicio por metro cuadrado o pieza individual para renovar fibras y colores', price: '$57.490 COP' }
    ]
  },
  {
    id: 'plomeria',
    group: 'hogar',
    num: '2',
    name: 'Plomería y Redes Hidráulicas',
    iconKey: 'plomeria',
    basePrice: 'desde $62.840 COP',
    imageUrl: '/assets/images/categories/plomeria_pvc.jpg',
    shortDesc: 'Fugas visibles y ocultas, destapes y geófono acústico',
    desc: 'Reparación de fugas, destapes de cañerías, griferías, tuberías ocultas y geófono acústico.',
    modality: 'Labor Única / Paquetes Semanales (1, 2, 3 o 4 semanas)',
    rows: [
      { name: 'Reparación fuga visible', detail: 'Reparación de tuberías de PVC, cobre o galvanizado en zonas visibles como cocina o baño', price: '$62.840 COP' },
      { name: 'Destape de cañerías y sifones', detail: 'Uso de sonda eléctrica o métodos mecánicos para destapar sin romper estructuras', price: '$68.920 COP' },
      { name: 'Instalación de grifería', detail: 'Cambio e instalación de mezcladores, llaves de paso o cisternas de sanitario', price: '$74.380 COP' },
      { name: 'Reparación tubería oculta', detail: 'Intervención técnica puntual (picada) para reparar fugas bajo piso y sellado hermético', price: '$132.690 COP' },
      { name: 'Detección de fugas (Geófono)', detail: 'Localización acústica no destructiva de fugas escondidas bajo pisos o muros', price: '$184.750 COP' }
    ]
  },
  {
    id: 'electricidad',
    group: 'hogar',
    num: '3',
    name: 'Electricidad Residencial',
    iconKey: 'electricidad',
    basePrice: 'desde $43.680 COP',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Cortos circuitos, iluminación LED y cajas de breakers',
    desc: 'Diagnóstico de cortos, puntos eléctricos, iluminación LED, cajas de breakers y acometidas seguras.',
    modality: 'Labor Única / Paquetes Semanales (1, 2, 3 o 4 semanas)',
    rows: [
      { name: 'Reparación corto circuito', detail: 'Diagnóstico, aislamiento de la falla eléctrica y restablecimiento seguro del servicio', price: '$52.540 COP' },
      { name: 'Instalación tomas/apagadores', detail: 'Instalación o cambio de hasta 3 puntos eléctricos, rosetas o interruptores dobles', price: '$43.680 COP' },
      { name: 'Instalación lámparas LED', detail: 'Fijación segura en techo o muro y conexión eléctrica de paneles o reflectores', price: '$64.250 COP' },
      { name: 'Mantenimiento caja breakers', detail: 'Revisión, cambio de tacos térmicos dañados y ajuste general de barras conductoras', price: '$96.840 COP' },
      { name: 'Cableado estructurado', detail: 'Instalación de circuitos independientes o balanceo de cargas para acometidas nuevas', price: '$143.650 COP' }
    ]
  },
  {
    id: 'pintura',
    group: 'hogar',
    num: '4',
    name: 'Pintura y Acabados',
    iconKey: 'pintura',
    basePrice: 'desde $18.420 COP / m²',
    imageUrl: '/assets/images/categories/pintura_latas.jpg',
    shortDesc: 'Resane de muros, vinilo tipo 1 y acabados integrales',
    desc: 'Resane de muros, vinilo lavable tipo 1, pintura de apartamentos, impermeabilización y esmaltado.',
    modality: 'Por Labor / Metro Cuadrado',
    rows: [
      { name: 'Resane y preparación muros', detail: 'Corrección de fisuras, tratamiento de humedades secas y lijado previo a la pintura', price: '$56.740 COP' },
      { name: 'Pintura muro interior (m²)', detail: 'Aplicación de dos manos de vinilo lavable tipo 1 por metro cuadrado', price: '$18.420 COP / m²' },
      { name: 'Pintura apartamento estándar', detail: 'Mano de obra completa para sala, comedor, dos alcobas y pasillo', price: '$428.600 COP' },
      { name: 'Impermeabilización muros', detail: 'Aplicación de tratamiento hidrófugo y sellador antihongos para paredes afectadas', price: '$112.450 COP' },
      { name: 'Esmaltado puertas/rejas', detail: 'Lijado anticorrosivo y aplicación de esmalte brillante o mate en cerrajería metálica', price: '$73.890 COP' }
    ]
  },
  {
    id: 'carpinteria',
    group: 'hogar',
    num: '5',
    name: 'Carpintería y Ebanistería',
    iconKey: 'carpinteria',
    basePrice: 'desde $53.690 COP',
    imageUrl: '/assets/images/categories/carpinteria_madera.jpg',
    shortDesc: 'Ajuste de puertas, modulares, rieles y repisas a medida',
    desc: 'Ajuste de puertas, ensamble de modulares, rieles, barnizado y repisas a medida en madera o aglomerado RH.',
    modality: 'Labor Única / Hitos de Obra',
    rows: [
      { name: 'Ajuste puertas y bisagras', detail: 'Corrección de puertas que arrastran, rozan con el piso o tienen marcos desajustados', price: '$64.820 COP' },
      { name: 'Armado muebles modulares', detail: 'Ensamble profesional de escritorios, armarios, racks de TV o cajoneras compradas en kit', price: '$78.340 COP' },
      { name: 'Reparación cajones/rieles', detail: 'Cambio de correderas telescópicas dañadas o ajuste de bisagras de cierre lento', price: '$53.690 COP' },
      { name: 'Barnizado y restauración', detail: 'Restauración estética y protectora de mesas, sillas o puertas de madera maciza', price: '$118.420 COP' },
      { name: 'Repisas y estanterías a medida', detail: 'Fabricación e instalación en aglomerado RH o madera natural (pino/cedro)', price: '$134.750 COP' }
    ]
  },
  {
    id: 'cerrajeria',
    group: 'hogar',
    num: '6',
    name: 'Cerrajería y Seguridad',
    iconKey: 'cerrajeria',
    basePrice: 'desde $63.480 COP',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Aperturas de emergencia, guardas y cerraduras digitales',
    desc: 'Aperturas residenciales urgentes, cambio de guardas, cerrojos de sobreponer, cerraduras biométricas y vehículos.',
    modality: 'Labor Única / Urgencia Inmediata (Sin paquetes semanales)',
    rows: [
      { name: 'Apertura puerta residencial', detail: 'Apertura técnica no destructiva de cilindros o pomos de puertas estándar', price: '$63.480 COP' },
      { name: 'Cambio de guarda/cilindro', detail: 'Incluye el suministro del cilindro nuevo y la entrega de 3 llaves codificadas', price: '$84.230 COP' },
      { name: 'Instalación cerradura sobreponer', detail: 'Instalación de cerrojos de seguridad adicionales tipo Yale o Schlage', price: '$76.540 COP' },
      { name: 'Cerradura biométrica/digital', detail: 'Perforación exacta en la puerta y calibración digital del sistema de acceso', price: '$124.950 COP' },
      { name: 'Apertura chapa vehicular/caja', detail: 'Servicio especializado de ganzuado de precisión para autos o cajas fuertes', price: '$112.380 COP' }
    ]
  },
  {
    id: 'jardineria',
    group: 'hogar',
    num: '7',
    name: 'Jardinería y Exteriores',
    iconKey: 'jardineria',
    basePrice: 'desde $58.340 COP',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Poda de césped, árboles, siembra y paisajismo mensual',
    desc: 'Poda de césped, descope de árboles, siembra, fertilización, paisajismo mensual y fumigación fitosanitaria.',
    modality: 'Labor Única / Mantenimiento Mensual',
    rows: [
      { name: 'Poda de césped y orillado', detail: 'Corte de hasta 60 m² con guadaña, orillado preciso y recolección del verde', price: '$58.340 COP' },
      { name: 'Poda árboles y arbustos', detail: 'Descope seguro, formación estética y despeje de ramas cerca de cables eléctricos', price: '$83.650 COP' },
      { name: 'Siembra y fertilización', detail: 'Renovación de tierra negra, aplicación de sustrato mineral y abono orgánico', price: '$72.480 COP' },
      { name: 'Diseño paisajístico mensual', detail: 'Plan recurrente de mantenimiento, riego y cuidado integral de zonas verdes', price: '$164.290 COP' },
      { name: 'Fumigación fitosanitaria', detail: 'Tratamiento químico o ecológico contra plagas como cochinilla, pulgón y hongos', price: '$91.750 COP' }
    ]
  },
  {
    id: 'construccion',
    group: 'hogar',
    num: '8',
    name: 'Construcción y Remodelación',
    iconKey: 'construccion',
    basePrice: 'desde $34.820 COP / m²',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Drywall, enchapes, demolición controlada y reformas',
    desc: 'Drywall, enchape de pisos y paredes, demolición controlada, reparación de grietas y remodelaciones.',
    modality: 'Paquetes Semanales (1, 2, 3 o 4 semanas) / Hitos de Obra',
    rows: [
      { name: 'Drywall (muro/cielo raso)', detail: 'Instalación completa con estructura metálica, placas de yeso y masillado final', price: '$68.450 COP/m²' },
      { name: 'Enchape pisos/pareces', detail: 'Mano de obra de nivelación, aplicación de pegacor y emboquillado de juntas', price: '$34.820 COP/m²' },
      { name: 'Demolición controlada', detail: 'Derribo de muros no estructurales con empaque seguro de escombros en lonas', price: '$97.640 COP' },
      { name: 'Reparación grietas/pañete', detail: 'Aplicación de malla de fibra de vidrio y mortero impermeabilizado para fisuras', price: '$73.520 COP' },
      { name: 'Remodelación baño/cocina', detail: 'Gestión por hitos certificados (demostración de avance) para reformas integrales', price: '$584.200 COP' }
    ]
  },
  {
    id: 'mudanzas',
    group: 'transporte',
    num: '9',
    name: 'Mudanzas',
    iconKey: 'mudanzas',
    basePrice: 'desde $63.850 COP / recorrido (2h)',
    imageUrl: '/assets/images/categories/mudanzas_cajas.jpg',
    shortDesc: 'Camión grande por recorrido fijo (2h incluidas)',
    desc: 'Servicio en camión grande (no motocicleta ni carro particular) con amarre seguro, protección de enseres y rutas locales e intermunicipales.',
    modality: 'Por Recorrido (Camión de Mudanzas / 2h)',
    rows: [
      { name: 'Mudanza local por recorrido (2h)', detail: 'Servicio en camión grande dentro de la ciudad (incluye hasta 2 horas de labor y traslado, no motocicleta ni carro particular)', price: '$63.850 COP' },
      { name: 'Acarreo local express', detail: 'Traslado rápido en camioneta de electrodomésticos o muebles medianos dentro de la ciudad', price: '$84.320 COP' },
      { name: 'Mudanza completa camión', detail: 'Servicio en camión cerrado para trayectos dentro del Valle de Aburrá con amarre seguro', price: '$248.750 COP' },
      { name: 'Embalaje profesional', detail: 'Protección especializada con plástico burbuja y cartón para televisores, vidrios y vajilla', price: '$67.430 COP' },
      { name: 'Transporte intermunicipal', detail: 'Rutas express desde Medellín hacia municipios cercanos como Rionegro, Girardota o Caldas', price: '$118.920 COP' }
    ]
  },
  {
    id: 'electrodomesticos',
    group: 'electro',
    num: '10',
    name: 'Electrodomésticos',
    iconKey: 'electrodomesticos',
    basePrice: 'desde $68.950 COP',
    imageUrl: '/assets/images/categories/electrodomesticos_hogar.jpg',
    shortDesc: 'Reparación de lavadoras, neveras, secadoras y hornos',
    desc: 'Reparación de lavadoras, neveras con recarga de gas, secadoras, hornos microondas y campanas extractoras.',
    modality: 'Labor Única / Diagnóstico Abonable (Sin paquetes semanales)',
    rows: [
      { name: 'Reparación lavadoras', detail: 'Diagnóstico y cambio de componentes como bomba de drenaje, sellos, correas o tarjeta lógica', price: '$83.450 COP' },
      { name: 'Reparación neveras (gas)', detail: 'Detección de fugas, cambio de filtro secador y recarga de gas refrigerante (R600/134)', price: '$114.780 COP' },
      { name: 'Mantenimiento secadoras', detail: 'Limpieza profunda de ductos de pelusa, revisión de termostatos y poleas de transmisión', price: '$87.320 COP' },
      { name: 'Reparación hornos/estufas', detail: 'Cambio de magnetrón en microondas, reparación de chisperos o válvulas de gas en estufas', price: '$72.640 COP' },
      { name: 'Instalación campanas', detail: 'Montaje de campanas extractoras con ducto hacia el exterior o sistema recirculante con filtro', price: '$68.950 COP' }
    ]
  },
  {
    id: 'chef',
    group: 'gastronomia',
    num: '11',
    name: 'Chef Privado a Domicilio',
    iconKey: 'chef',
    basePrice: 'desde $115.000 COP / persona',
    imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Experiencias gastronómicas internacionales a domicilio',
    desc: 'El chef lleva todos los ingredientes frescos, utensilios de cocina profesionales y realiza la preparación en tu hogar. Incluye servicio de mesa y limpieza básica de cocina al finalizar.',
    modality: 'Experiencia Gastronómica / Por Persona',
    rows: [
      { name: 'Menú Italiano Clásico (Europa Mediterránea)', detail: 'Entradas de bruschettas, pasta fresca artesanal (carbonara o pesto) y tiramisú', price: '$145.000 COP por persona' },
      { name: 'Tapas Españolas Premium (Europa Mediterránea)', detail: 'Selección de jamón ibérico, gambas al ajillo, tortilla española y croquetas caseras', price: '$138.000 COP por persona' },
      { name: 'Cena Francesa Gourmet (Europa Mediterránea)', detail: 'Quiche lorraine, coq au vin o salmón en salsa de eneldo y mousse de chocolate', price: '$165.000 COP por persona' },
      { name: 'Experiencia Colombiana Andina (América Latina)', detail: 'Bandeja paisa gourmet, sancocho antioqueño o posta negra con acompañamientos tradicionales', price: '$115.000 COP por persona' },
      { name: 'Noche Mexicana Auténtica (América Latina)', detail: 'Tacos al pastor, guacamole preparado en mesa, enchiladas suizas y churros', price: '$125.000 COP por persona' },
      { name: 'Sabores Peruanos Fusión (América Latina)', detail: 'Ceviche clásico, lomo saltado y causa limeña con toque moderno', price: '$135.000 COP por persona' },
      { name: 'Sushi & Roll Experience (Asia Oriental)', detail: 'Preparación de nigiris, sashimis y rolls especiales con pescado fresco importado', price: '$155.000 COP por persona' },
      { name: 'Wok Thai & Vietnamita (Sudeste Asiático)', detail: 'Pad Thai, curry verde tailandés o pho vietnamita con hierbas frescas aromáticas', price: '$128.000 COP por persona' },
      { name: 'Dim Sum Chino Tradicional (Asia Oriental)', detail: 'Variedad de dumplings al vapor, rollitos primavera y pollo kung pao', price: '$140.000 COP por persona' },
      { name: 'Mezze Libanés (Oriente Medio)', detail: 'Hummus, babaganoush, falafel crujiente, tabuleh y pan pita recién horneado', price: '$132.000 COP por persona' },
      { name: 'Kebabs y Arroz Persa (Oriente Medio)', detail: 'Brochetas de cordero o pollo marinado en especias, arroz con azafrán y yogurt', price: '$142.000 COP por persona' }
    ]
  },
  {
    id: 'automoviles',
    group: 'transporte',
    num: '12',
    name: 'Automóviles y Motos',
    iconKey: 'automoviles',
    basePrice: 'desde $53.820 COP',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Cambio de aceite, escaneo OBD2, frenos y desvares',
    desc: 'Cambio de aceite, escaneo OBD2, pastillas de frenos, lavado ecológico y desvares express a domicilio.',
    modality: 'Labor Única / A Domicilio',
    rows: [
      { name: 'Cambio aceite/filtros domicilio', detail: 'Reemplazo de lubricante sintético de alta gama y filtro de motor original', price: '$58.740 COP' },
      { name: 'Escaneo computarizado OBD2', detail: 'Lectura detallada de códigos de falla del computador del vehículo y borrado de alertas', price: '$83.420 COP' },
      { name: 'Cambio pastillas de frenos', detail: 'Sustitución de pastillas, purga de líquido de frenos y graduación de mordazas', price: '$72.650 COP' },
      { name: 'Lavado ecológico domicilio', detail: 'Limpieza profunda de carrocería, interior y motor usando polímeros sin consumo de agua', price: '$64.380 COP' },
      { name: 'Desvare express', detail: 'Asistencia inmediata con booster profesional de corriente o reparación de pinchazos', price: '$53.820 COP' }
    ]
  },
  {
    id: 'digital',
    group: 'digital',
    num: '13',
    name: 'Servicios Digitales',
    iconKey: 'digital',
    basePrice: 'desde $64.290 COP',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Diseño para redes, landing pages, video y pauta Meta',
    desc: 'Diseño para redes, landing pages, edición Reels/TikTok, campañas Meta Ads y posicionamiento Google.',
    modality: 'Por Proyecto / Hitos Digitales',
    rows: [
      { name: 'Diseño piezas redes sociales', detail: 'Creación de paquete de 3 banners optimizados para Instagram y Facebook', price: '$64.290 COP' },
      { name: 'Landing Page (Web)', detail: 'Diseño de página de aterrizaje responsive enfocada en alta conversión, incluye hosting básico', price: '$284.650 COP' },
      { name: 'Edición videos Reels/TikTok', detail: 'Edición dinámica con subtitulado, efectos visuales y formato vertical 9:16', price: '$78.430 COP' },
      { name: 'Campañas Meta Ads', detail: 'Configuración estratégica de pauta publicitaria con segmentación local en Medellín', price: '$142.890 COP' },
      { name: 'Optimización SEO/Google', detail: 'Mejora de posicionamiento en Google Maps y búsqueda local para negocios en Medellín', price: '$96.540 COP' }
    ]
  },
  {
    id: 'educacion',
    group: 'educacion',
    num: '14',
    name: 'Clases y Educación',
    iconKey: 'educacion',
    basePrice: 'desde $74.898 COP / sesión (2h)',
    imageUrl: '/assets/images/categories/clases_libros_lapices.jpg',
    shortDesc: 'Matemáticas, inglés, música y refuerzo escolar (2h)',
    desc: 'Tutorías en matemáticas, física, inglés conversacional, refuerzo escolar, enseñanza de música y preparación ICFES. Mínimo de contratación: 1 sesión de 2 horas.',
    modality: 'Sesiones de 2h (Mínimo de Contratación) / Bóveda Wompi',
    rows: [
      { name: 'Clases matemáticas/física (2h)', detail: 'Tutoría personalizada intensiva de 2 horas (mínimo de contratación) a domicilio o virtual', price: '$81.434 COP' },
      { name: 'Inglés conversacional (2h)', detail: 'Práctica intensiva de speaking y listening de 2 horas con docente bilingüe certificado', price: '$88.825 COP' },
      { name: 'Refuerzo escolar integral (2h)', detail: 'Acompañamiento escolar de 2 horas para realización de tareas y preparación de exámenes', price: '$74.898 COP' },
      { name: 'Clases música (2h)', detail: 'Instrucción práctica de 2 horas en guitarra, piano o técnica vocal para niños y adultos', price: '$91.067 COP' },
      { name: 'Preparación ICFES/Saber 11 (2h)', detail: 'Sesión intensiva de 2 horas enfocada en simulacros de prueba y razonamiento cuantitativo', price: '$101.992 COP' }
    ]
  },
  {
    id: 'belleza',
    group: 'bienestar',
    num: '15',
    name: 'Belleza y Cuidado Personal',
    iconKey: 'belleza',
    basePrice: 'desde $38.450 COP',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Barbería, manicure, masajes relajantes y faciales',
    desc: 'Corte de cabello, barbería, manicure, pedicure, peinados, masajes relajantes y limpieza facial profunda.',
    modality: 'Labor Única / A Domicilio',
    rows: [
      { name: 'Corte cabello/barba domicilio', detail: 'Servicio de barbería profesional con kit esterilizado y protocolo de bioseguridad', price: '$38.450 COP' },
      { name: 'Manicure/pedicure domicilio', detail: 'Limpieza profunda de cutículas, exfoliación de pies y esmaltado tradicional o semipermanente', price: '$44.680 COP' },
      { name: 'Peinado para eventos', detail: 'Estilismo capilar para ocasiones especiales, incluyendo ondas, liso espejo o recogidos', price: '$52.340 COP' },
      { name: 'Masaje relajante (1 hora)', detail: 'Terapia descontracturante con aceites esenciales utilizando camilla portátil profesional', price: '$61.038 COP' },
      { name: 'Limpieza facial profunda', detail: 'Tratamiento con vapor de ozono, extracción de impurezas y mascarilla hidratante', price: '$68.450 COP' }
    ]
  },
  {
    id: 'eventos',
    group: 'eventos',
    num: '16',
    name: 'Eventos y Protocolo',
    iconKey: 'eventos',
    basePrice: 'desde $87.650 COP',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Meseros por turno, sonido, animación y coctelería',
    desc: 'Meseros por turno, sonido e iluminación, recreación y animación infantil, bartenders y fotografía profesional.',
    modality: 'Por Turno / Evento',
    rows: [
      { name: 'Meseros por turno (4h)', detail: 'Personal uniformado para atención de mesas, servicio de pasabocas y protocolo básico', price: '$87.650 COP' },
      { name: 'Sonido e iluminación', detail: 'Alquiler y operación de cabinas de sonido activas, micrófonos inalámbricos y juego de luces', price: '$194.380 COP' },
      { name: 'Animación infantil', detail: 'Shows temáticos con pintacaritas, globoflexia y juegos dirigidos para niños', price: '$138.450 COP' },
      { name: 'Bartender profesional', detail: 'Preparación de cócteles clásicos y de autor, incluye montaje de barra móvil básica', price: '$112.640 COP' },
      { name: 'Fotografía eventos (hora)', detail: 'Cobertura fotográfica digital con entrega posterior de galería editada en alta resolución', price: '$94.850 COP' }
    ]
  },
  {
    id: 'profesionales',
    group: 'profesional',
    num: '17',
    name: 'Servicios Profesionales (Especializados)',
    iconKey: 'profesionales',
    basePrice: 'desde $83.690 COP',
    imageUrl: '/assets/images/categories/profesional_traje_elegante.jpg',
    shortDesc: 'Consultoría jurídica express, tributaria y negocios',
    desc: 'Consultoría jurídica express, asesoría tributaria básica y estructuración de planes de negocio.',
    modality: 'Labor Única / Asesoría Progresiva',
    rows: [
      { name: 'Consultoría Jurídica Express', detail: 'Revisión rápida y concepto legal preliminar sobre contratos simples, derechos de petición o situaciones civiles básicas', price: '$94.850 COP' },
      { name: 'Asesoría Tributaria Básica', detail: 'Orientación clara sobre obligaciones mensuales, calendarios tributarios y clasificación de responsables de IVA/Renta', price: '$83.690 COP' },
      { name: 'Plan de Negocios', detail: 'Estructuración financiera inicial, definición de modelo de ingresos y análisis de viabilidad para emprendimientos nuevos', price: '$128.450 COP' }
    ]
  },
  {
    id: 'mascotas',
    group: 'mascotas',
    num: '18',
    name: 'Cuidado de Mascotas & Veterinaria',
    iconKey: 'mascotas',
    basePrice: 'desde $37.890 COP',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80',
    shortDesc: 'Paseo canino con GPS (2h), baño y Pet Sitting Premium',
    desc: 'Paseo canino estructurado (mínimo 2 horas) con GPS, baño y peluquería a domicilio, Pet Sitting Premium y limpieza dental sin anestesia.',
    modality: 'Sesiones de 2h / Rutina Semanal',
    rows: [
      { name: 'Paseo canino (2 horas)', detail: 'Paseo estructurado de 2 horas (mínimo de contratación) con reporte GPS, hidratación constante y recogida responsable de excretas', price: '$47.082 COP' },
      { name: 'Baño y peluquería domicilio', detail: 'Baño con champú medicado, corte higiénico, secado profesional y limado de uñas', price: '$54.890 COP' },
      { name: 'Pet Sitting Premium (por día)', detail: 'Cuidado completo en tu hogar incluyendo alimentación según dieta, sesiones de juego, compañía y envío de fotos/videos en tiempo real', price: '$52.500 COP' },
      { name: 'Limpieza dental sin anestesia', detail: 'Higiene bucal preventiva realizada con gel enzimático y cepillos especializados para eliminar sarro superficial', price: '$37.890 COP' }
    ]
  }
];
