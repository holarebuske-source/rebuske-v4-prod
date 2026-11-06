/**
 * ============================================================================
 * REBUSKE CORE · MOTOR AUTÓNOMO ACTUALIZADO (ROSTER OFICIAL 27 AGENTES)
 * ============================================================================
 * Modificaciones aplicadas por orden del CEO Canashi:
 * - Eliminada la función de Sergio (automatizaciones n8n retirada).
 * - Andrea (Alianzas): Despacho de reportes exclusivamente a holarebuske@gmail.com.
 *   Prohibido estrictamente enviar nada hacia el exterior.
 * ============================================================================
 */

export const AGENTS_ROSTER = {
  // 1. DIRECCIÓN GENERAL Y ESTRATEGIA
  canashi: {
    id: 'canashi',
    name: 'Canashi',
    role: 'CEO & Director General',
    dept: 'Dirección General y Estrategia',
    responsibility: 'Aprobación o veto final de toda propuesta con registro escrito de decisiones. Custodia de la visión estratégica y control compartido de la Bóveda Wompi. Coordina reuniones semanales con líderes para alinear prioridades.'
  },
  simon: {
    id: 'simon',
    name: 'Simón',
    role: 'Innovación',
    dept: 'Dirección General y Estrategia',
    responsibility: 'Recorre toda la organización recopilando hasta 40 ideas cada 12 horas, las clasifica por impacto y costo, y envía el reporte estructurado a holarebuske@gmail.com con copia a Dirección.'
  },
  dante: {
    id: 'dante',
    name: 'Dante',
    role: 'Filtro Crítico',
    dept: 'Dirección General y Estrategia',
    responsibility: 'Evalúa cada iniciativa con cuatro preguntas obligatorias: ¿Se puede estafar con esto? ¿Lo entiende un adulto mayor en Medellín? ¿Satura servidores? ¿Tiene costo oculto? Emite visto bueno o rechazo justificado con observaciones y seguimiento.'
  },
  lorenzo: {
    id: 'lorenzo',
    name: 'Dr. Lorenzo',
    role: 'Compliance',
    dept: 'Dirección General y Estrategia',
    responsibility: 'Verifica el cumplimiento de la Ley 1480/2011, Ley 1581/2012, Ley 1618/2013, Ley 2195/2022 y circulares de la SIC. Revisa cada nuevo flujo antes de su lanzamiento y se alinea con Legaltech. Prepara los informes de cumplimiento y los envía a holarebuske@gmail.com.'
  },
  aliccia: {
    id: 'aliccia',
    name: 'Aliccia',
    role: 'Relaciones Institucionales',
    dept: 'Dirección General y Estrategia',
    responsibility: 'Busca y consulta información en alcaldías, Cámara de Comercio y entidades locales. Prepara las solicitudes y documentos correspondientes y los envía exclusivamente a holarebuske@gmail.com.'
  },

  // 2. TECNOLOGÍA, INFRAESTRUCTURA Y DATOS
  mateo: {
    id: 'mateo',
    name: 'Mateo',
    role: 'Arquitectura Backend',
    dept: 'Tecnología, Infraestructura y Datos',
    responsibility: 'Diseña y mantiene esquemas en Supabase PostgreSQL, Edge Functions y APIs con latencia menor a 45 ms. Documenta cada esquema, establece límites de consulta y monitorea el rendimiento.'
  },
  valeria: {
    id: 'valeria',
    name: 'Valeria',
    role: 'Diseño UI/UX',
    dept: 'Tecnología, Infraestructura y Datos',
    responsibility: 'Crea interfaces con estilo brutalist/limpio, accesibilidad WCAG AAA y flujos completables en máximo 3 clics. Valida con usuarios reales incluyendo adultos mayores y entrega guía de estilos a Marca.'
  },
  lucas: {
    id: 'lucas',
    name: 'Lucas',
    role: 'Calidad y Despliegue',
    dept: 'Tecnología, Infraestructura y Datos',
    responsibility: 'Ejecuta suite de pruebas unitarias, mantiene política de cero regresiones y gestiona despliegues automáticos en Vercel. Notifica fallos de inmediato y mantiene entorno de pre-producción idéntico al real.'
  },
  fernando: {
    id: 'fernando',
    name: 'Fernando',
    role: 'DevOps',
    dept: 'Tecnología, Infraestructura y Datos',
    responsibility: 'Garantiza uptime 99.999%, redundancia São Paulo/Bogotá y encriptación TLS 1.3. Documenta plan de recuperación ante desastres y publica monitoreo de estado del sistema.'
  },
  carlos: {
    id: 'carlos',
    name: 'Carlos',
    role: 'Seguridad Informática / CISO',
    dept: 'Tecnología, Infraestructura y Datos',
    responsibility: 'Implementa reglas WAF, mitiga inyecciones SQL y gestiona rotación de llaves. Vigila accesos, detecta intentos sospechosos y coordina con Antifraude.'
  },
  galloti: {
    id: 'galloti',
    name: 'Galloti',
    role: 'Telemetría y Tiempo Real',
    dept: 'Tecnología, Infraestructura y Datos',
    responsibility: 'Administra WebSockets para mostrar estados del servicio en vivo. Establece límites de actualización y define indicadores claros: en camino → trabajando → finalizado.'
  },
  elena_data: {
    id: 'elena_data',
    name: 'Elena',
    role: 'Ciencia de Datos',
    dept: 'Tecnología, Infraestructura y Datos',
    responsibility: 'Desarrolla modelos predictivos de demanda técnica cubriendo Medellín, comunas y municipios cercanos. Entrega proyecciones a Operaciones y Pricing.'
  },

  // 3. FINANZAS, PAGOS Y CONTROL
  tomas: {
    id: 'tomas',
    name: 'Tomás',
    role: 'FinTech',
    dept: 'Finanzas, Pagos y Control',
    responsibility: 'Administra la Bóveda Wompi con control compartido con el CEO: tarifa Oro VIP 7% de por vida y Fundadores 1% primer mes. Muestra tarifas de forma permanente y confirma cada retención de forma automática.'
  },
  mariana: {
    id: 'mariana',
    name: 'Mariana',
    role: 'CFO',
    dept: 'Finanzas, Pagos y Control',
    responsibility: 'Lleva balance diario de caja y conciliación exacta al centavo. Coordina con Contabilidad los cierres mensuales y la gestión de impuestos.'
  },
  cayse: {
    id: 'cayse',
    name: 'Cayse',
    role: 'Contabilidad e Impuestos',
    dept: 'Finanzas, Pagos y Control',
    responsibility: 'Cierra libros mensuales, elabora la documentación tributaria y contable. Envía todos los documentos y reportes a holarebuske@gmail.com. Mantiene relación con el contador externo.'
  },
  patricia: {
    id: 'patricia',
    name: 'Patricia',
    role: 'Auditoría de Pagos',
    dept: 'Finanzas, Pagos y Control',
    responsibility: 'Realiza cruce y validación de transferencias con Nequi, Bancolombia y Daviplata. Alerta automáticamente pagos con demora y reporta desviaciones al CFO.'
  },
  valentina: {
    id: 'valentina',
    name: 'Valentina',
    role: 'KYC',
    dept: 'Finanzas, Pagos y Control',
    responsibility: 'Valida cédula, antecedentes policiales y pre-auditoría fotográfica de los técnicos. Establece periodo de renovación de la validación y alinea con Antifraude ante inconsistencias.'
  },
  roberto: {
    id: 'roberto',
    name: 'Roberto',
    role: 'Antifraude',
    dept: 'Finanzas, Pagos y Control',
    responsibility: 'Detecta anomalías por IP, geolocalización y tarjetas clonadas. Aplica bloqueo temporal con notificación clara, mantiene base de incidentes y coordina con el CISO.'
  },
  ricardo: {
    id: 'ricardo',
    name: 'Ricardo',
    role: 'Tarifas / Pricing',
    dept: 'Finanzas, Pagos y Control',
    responsibility: 'Diseña algoritmo de tarifas justas por comuna. El sobrecosto de urgencia se muestra de forma visible y transparente; mantiene tabla pública de rangos de precios.'
  },

  // 4. OPERACIONES, SERVICIO Y ALIANZAS
  diego: {
    id: 'diego',
    name: 'Diego',
    role: 'Coordinación de Servicios',
    dept: 'Operaciones, Servicio y Alianzas',
    responsibility: 'Despacha técnicos con meta de llegada según distancia real, no promesa rígida. Gestiona canal de atención rápida para emergencias.'
  },
  laura: {
    id: 'laura',
    name: 'Laura',
    role: 'Soporte al Usuario',
    dept: 'Operaciones, Servicio y Alianzas',
    responsibility: 'Responde en WhatsApp en menos de 60 segundos dentro de horarios definidos. Acompaña peritaje en sitio y escala a mediación cuando no hay acuerdo. Registra cada caso.'
  },
  elena_legal: {
    id: 'elena_legal',
    name: 'Elena',
    role: 'Legaltech',
    dept: 'Operaciones, Servicio y Alianzas',
    responsibility: 'Genera y envía a usuarios y técnicos las actas de servicio con firmas electrónicas válidas según Ley 527/1999. Cada acta incluye descripción, estado final y derechos del usuario; se almacena de forma segura y alineada con Compliance.'
  },
  telmo: {
    id: 'telmo',
    name: 'Telmo',
    role: 'Normalización Técnica',
    dept: 'Operaciones, Servicio y Alianzas',
    responsibility: 'Elabora manuales estandarizados de fontanería, electricidad y cerrajería con pasos, materiales recomendados y rangos de precio de referencia. Los comparte con la red de técnicos.'
  },
  andrea: {
    id: 'andrea',
    name: 'Andrea',
    role: 'Alianzas Estratégicas',
    dept: 'Operaciones, Servicio y Alianzas',
    responsibility: 'Busca y mapea asociaciones, cooperativas y gremios de técnicos en Antioquia. Prepara y envía todos los informes y listados exclusivamente a holarebuske@gmail.com. Prohibido estrictamente enviar nada hacia el exterior.'
  },
  daniela: {
    id: 'daniela',
    name: 'Daniela',
    role: 'Investigación y Oportunidades',
    dept: 'Operaciones, Servicio y Alianzas',
    responsibility: 'Busca e identifica medios de comunicación, periodistas y actores relevantes como potenciales aliados. Junto con Andrea elaboran un informe conjunto con entidades y contactos identificados y lo envían a holarebuske@gmail.com. No se comunica directamente con medios.'
  },

  // 5. COMUNICACIONES Y MARCA
  sofia: {
    id: 'sofia',
    name: 'Sofia',
    role: 'Contenido y Difusión',
    dept: 'Comunicaciones y Marca',
    responsibility: 'Crea reportes PDF vectoriales y piezas para Meta, TikTok y X. Aplica la guía de estilos unificada y mantiene calendario de publicaciones.'
  },
  davinci: {
    id: 'davinci',
    name: 'Da vinci',
    role: 'Identidad de Marca',
    dept: 'Comunicaciones y Marca',
    responsibility: 'Mantiene tono cercano, orgullo paisa y calidez en todo texto público. Documenta frases aprobadas y términos a evitar; revisa copys antes de publicar.'
  }
};

// ----------------------------------------------------------------------------
// MOTOR DE BÓVEDA WOMPI Y COMISIONES (7% ORO VIP / 1% FUNDADORES)
// ----------------------------------------------------------------------------
export function calculateWompiEscrow(amountCOP, tier = 'ORO_VIP') {
  const TIERS = {
    ORO_VIP: 0.07,     // 7% vitalicio
    FUNDADORES: 0.01,  // 1% primer mes
    PLATA: 0.08,
    BRONCE: 0.09
  };
  const rate = TIERS[tier] || TIERS.ORO_VIP;
  const comisionRebuske = Math.round(amountCOP * rate);
  const pagoNetoTecnico = amountCOP - comisionRebuske;

  return {
    montoTotalCOP: amountCOP,
    tierAplicado: tier,
    porcentajeComision: `${rate * 100}%`,
    comisionRebuskeCOP: comisionRebuske,
    pagoNetoTecnicoCOP: pagoNetoTecnico,
    horasCustodia: 48,
    reglaLiberacion: 'Inmediata con calificación 5★ o automática transcurridas 48h. Retención en disputa.'
  };
}

// ----------------------------------------------------------------------------
// PIPELINE FILTRADO DE UNA IDEA (DANTE -> LORENZO -> CANASHI)
// ----------------------------------------------------------------------------
export function evaluateIdeaPipeline(idea) {
  // Dante: 4 preguntas obligatorias
  const danteQuestions = {
    sePuedeEstafar: Boolean(idea.riesgoFraude),
    loEntiendeAdultoMayorPaisa: Boolean(idea.comprensiblePaisa !== false),
    saturaServidores: Boolean(idea.saturaServidores),
    tieneCostoOculto: Boolean(idea.costoOculto)
  };

  const dantePassed = !danteQuestions.sePuedeEstafar && 
                       danteQuestions.loEntiendeAdultoMayorPaisa && 
                      !danteQuestions.saturaServidores && 
                      !danteQuestions.tieneCostoOculto;

  if (!dantePassed) {
    return {
      ideaId: 'idea_' + Date.now(),
      status: 'RECHAZADA_POR_DANTE',
      evaluador: 'Dante (Filtro Crítico)',
      motivo: 'No superó las 4 preguntas de control de fraude, usabilidad paisa o costos.'
    };
  }

  // Dr. Lorenzo: Compliance normativo
  const lorenzoPassed = idea.cumpleLey1480 !== false && idea.cumpleLey1581 !== false;
  if (!lorenzoPassed) {
    return {
      ideaId: 'idea_' + Date.now(),
      status: 'RECHAZADA_POR_LORENZO',
      evaluador: 'Dr. Lorenzo (Compliance)',
      motivo: 'Inconsistencia con Estatuto del Consumidor o Protección de Datos Personales.'
    };
  }

  // Canashi: Aprobación Ejecutiva
  return {
    ideaId: 'idea_' + Date.now(),
    status: 'APROBADA_POR_CANASHI',
    evaluador: 'Canashi (CEO)',
    destinatariosDesarrollo: ['mateo', 'valeria', 'lucas'],
    mensaje: 'Propuesta lista para arquitectura backend y despliegue a producción.'
  };
}

console.log('[REBUSKE AUTONOMOUS ENGINE] 27 Agentes Oficiales Actualizados.');
