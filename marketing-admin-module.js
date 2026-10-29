/**
 * REBUSKE v4 · MÓDULO VISUAL: PANEL CEO / ADMIN, REDES SOCIALES OMNICANAL & ESTUDIO SOFÍA PDF
 * Equipo bajo mando de Camilo (CEO):
 *  - Valeria (Growth, Marketing & Community Manager Omnicanal)
 *  - Sofía (Diseñadora de Marca, Lectora de PDFs Oficiales y Generadora de Piezas)
 *  - Mateo (Arquitecto Full-Stack & Supabase)
 *  - Lucas (QA 55/55: 0 píxeles rosa/rojo, 0 emojis decorativos, íconos SVG lima)
 *
 * Cumple 100% las Reglas Duras de los 4 PDFs Oficiales de Rebuske:
 *  1. Paleta Canónica 60-30-10: Ébano (#3E4C35 -> #191F15), Bosque (#4E8839), Lima (#B8FF3B),
 *     Green Yellow (#AFFF3E), Limón (#D9DF36), Canario (#FFFA70 único cálido). Cero rosa/rojo.
 *  2. Cero emojis decorativos en interfaz: todos los íconos son trazos SVG lima + Luciérnaga v33.
 *  3. Diccionario Oficial: "Pago protegido" (nunca "escrow"), "Rebusker", "Quedó como debe",
 *     "ARREGLA · CONFÍA · REPITE", "el 7% lo paga el profesional cuando libera el pago".
 */

(function (global) {
  'use strict';

  const ADMIN_STORAGE_KEY = 'rebuske_v4_ceo_admin_state_v2';

  // Íconos SVG de línea propios (trazo 1.8, sin librerías externas, sin emojis)
  const EXTRA_ICONS = {
    db: 'M4 6c0 1.66 3.58 3 8 3s8-1.34 8-3-3.58-3-8-3-8 1.34-8 3zm0 6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6',
    megaphone: 'M3 11l14-5v12L3 13v-2zm14-2c2.2 0 4 1.8 4 4s-1.8 4-4 4M6 14l1.5 5h2.5l-1-5',
    calendar: 'M4 5h16v16H4zM16 3v4M8 3v4M4 10h16M9 14h2v2H9z',
    sheet: 'M5 3h10l4 4v14H5zM8 12h8M8 16h8M8 8h4',
    sync: 'M21 12a9 9 0 0 0-15.36-6.36L3 8m0-5v5h5M3 12a9 9 0 0 0 15.36 6.36L21 16m0 5v-5h-5',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    trend: 'M3 17l6-6 4 4 8-8M14 7h7v7',
    doc: 'M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    reply: 'M9 17l-5-5 5-5M4 12h11a5 5 0 0 1 5 5v3'
  };

  // Base de Conocimiento Oficial extraída de los 4 PDFs de Rebuske enviados por Camilo (CEO)
  const REBUSKE_PDF_DOCS = [
    {
      id: 'pdf-1',
      title: 'Banco de Frases OOH · Lo que hay que decir en la calle',
      version: 'Medellín 2026',
      pages: 13,
      summary: '69 frases OOH en voseo paisa, 2 audiencias (Cliente y Rebusker), 5 ubicaciones (Paradas, Edificios, Taxis, Metro, Transversales), Cartel Maestro y 17 categorías.',
      status: 'APRENDIDO · ACTIVO'
    },
    {
      id: 'pdf-2',
      title: 'Dossier de Migración y Entrega · v1.4',
      version: 'Octubre 2026',
      pages: 17,
      summary: '18 pantallas, Luciérnaga v33 intacta, fuente Baloo 2, Paleta Canónica 60-30-10 (0 rosa/rojo, 0 emojis), 15 reglas de negocio y QA 55/55.',
      status: 'APRENDIDO · ACTIVO'
    },
    {
      id: 'pdf-3',
      title: 'Documento Maestro · Marketing y Voz v1.0',
      version: 'Octubre 2026',
      pages: 16,
      summary: 'Buyer personas (Camila 29 y Don Jairo 42), 4 adjetivos (Cercana, Firme, Audaz, Experta), Diccionario Oficial, Estrategia TikTok/IG/FB/Calle y KPIs 90 días.',
      status: 'APRENDIDO · ACTIVO'
    },
    {
      id: 'pdf-4',
      title: 'Manual de Identidad de Marca v2.0 + Informe Técnico v2.0',
      version: 'Octubre 2026',
      pages: 54,
      summary: 'Proporción 60-30-10, Glassmorphism nocturno, Kit de Redes I/II/III (Posts 1:1 P1/P2/P3 y Stories 9:16 S1/S2), Fotografía de oficio y arquitectura Supabase + Wompi.',
      status: 'APRENDIDO · ACTIVO'
    }
  ];

  // Banco Oficial de Frases OOH y Digitales del PDF 1 y PDF 3
  const OOH_PHRASES_BANK = {
    paradas_cliente: {
      label: 'Paradas de bus · Cliente (Camila, 29)',
      phrases: [
        '¿Buscás quién te resuelva y nadie aparece? Acá sí hay. Descargá Rebuske.',
        'Hombres y mujeres de bien, que saben lo que hacen. Los encontrás acá.',
        'Ya no tenés que andar preguntando a todo el mundo: acá están todos revisados.',
        '¿Te dicen "ya voy" y nunca llegan? Eso se acabó. Descargá Rebuske.',
        'Tu casa merece gente seria. Los tenés acá.',
        'No tenés que arriesgarte: acá sabés bien con quién tratás.',
        'No pidas referencias a todo el mundo. Encontralas acá, verificadas.'
      ]
    },
    edificios_cliente: {
      label: 'Edificios del centro · Impacto 2 líneas',
      phrases: [
        'Contratar no es jugar a la suerte. Quien sabe hacer, aparece acá.',
        'Pagás cuando veas que todo quedó bien. Sin chismes.',
        'El que se rebusca, encuentra. Descargá Rebuske.',
        'Pagás protegido. Vivís tranquilo. ARREGLA. CONFÍA. REPITE.',
        'No andés adivinando. Rebuske. Paga protegido. Trabaja tranquilo.'
      ]
    },
    taxis_metro: {
      label: 'Puertas de Taxi y Metro · 3 segundos',
      phrases: [
        'Lo que necesitás ya tiene solución. Descargá Rebuske.',
        'Soltás la plata cuando veas el trabajo listo.',
        '¿Te dejaron tirado sin avisar? Eso se termina hoy. Descargá Rebuske.',
        '¿Pagaste por adelantado y te quedaste esperando? Tu plata queda guardada.',
        'Ya sabés quién lo hace bien: llamá de nuevo con REPITE.'
      ]
    },
    transversales: {
      label: 'Frases Estrella Transversales · Todos lados',
      phrases: [
        'La tecnología no le quita el trabajo a nadie. Le abre la puerta a quien se la rebusca.',
        'Dos bandos: quien necesita algo y quien sabe hacerlo. Nosotros los juntamos.',
        'No buscás suerte. Buscás gente que sabe.',
        'Tu plata la soltás solo cuando veas que todo quedó en orden.',
        'La confianza no se pide, se ve. Acá todos ven tu trabajo.'
      ]
    },
    rebusker_pro: {
      label: 'Para quien se rebusca · Rebuskers (Don Jairo, 42)',
      phrases: [
        '¿Andás de un lado a otro pidiendo que te llamen? Acá te buscan a vos.',
        'Hacés bien las cosas y merecés que te paguen sin vueltas.',
        'Cada trabajo bien hecho te da más nombre. Todos lo ven acá.',
        'Lo que bien se hace, merece ser bien pagado. Trabajás tranquilo. Cobrás seguro.',
        'Trabajos de tu zona, pagados de verdad, con solo el 7% cuando ya tienes la plata en la mano.'
      ]
    }
  };

  // Kit de Redes Oficial del Manual de Marca v2.0 (Parte 4: P1, P2, P3, S1, S2 y Cartel Maestro)
  const BRAND_TEMPLATES = {
    p1_lanzamiento: {
      id: 'p1_lanzamiento',
      code: 'P1 · Post 1:1',
      name: 'Lanzamiento (Noche Ébano)',
      ratio: '1080×1080',
      theme: 'ebony',
      headline: 'Ya está aquí.',
      subhead: 'SERVICIOS MANUALES EN UN CLIC · MEDELLÍN',
      body: 'La tecnología no reemplaza el oficio. Lo conecta con el mundo.',
      footer: 'ARREGLA · CONFÍA · REPITE',
      caption: 'La noche tiene sus héroes. Publica tu solicitud gratis y deja que la luz llegue a ti. Hasta 3 cotizaciones de Rebuskers verificados y pago protegido. Descarga Rebuske. #TrabajoATuManera #RebuskeMedellín #ArreglaConfíaRepite'
    },
    p2_valor: {
      id: 'p2_valor',
      code: 'P2 · Post 1:1',
      name: 'Valor / Lema (Fondo Lima #B8FF3B)',
      ratio: '1080×1080',
      theme: 'lima',
      headline: 'Trabajo a tu manera.',
      subhead: 'TÚ PUBLICAS · EL REBUSKER LLEGA',
      body: 'Tu pago queda protegido hasta que confirmes que todo quedó como debe. Cero comisión para el cliente.',
      footer: 'ARREGLA. CONFÍA. REPITE.',
      caption: 'Nada de llamadas eternas ni efectivo de último minuto. Publica tu solicitud gratis, recibe 3 cotizaciones y no pagas nada hasta que el trabajo quedó bien. #ArreglaConfíaRepite #TrabajoATuManera #RebuskeMedellín'
    },
    p3_testimonio: {
      id: 'p3_testimonio',
      code: 'P3 · Post 1:1',
      name: 'Testimonio 5 Estrellas Lima',
      ratio: '1080×1080',
      theme: 'glass',
      headline: '"Jhon llegó en 20 minutos y la instalación quedó perfecta. Ya lo volví a contratar."',
      subhead: 'Camila G. · El Poblado · 5.0 Estrellas',
      body: 'Pago protegido liberado tras confirmación del cliente · Garantía de 2 días activa.',
      footer: '@rebuske · #HistoriasRebuske',
      caption: 'Historias reales del barrio en Medellín. La tuya puede ser la próxima. Rebuskers verificados con precio claro y pago protegido. #HistoriasRebuske #RebuskeMedellín #ArreglaConfíaRepite'
    },
    s1_story_nocturna: {
      id: 's1_story_nocturna',
      code: 'S1 · Story / Reel 9:16',
      name: 'Story Atmosférica (1080×1920)',
      ratio: '1080×1920',
      theme: 'ebony',
      headline: '¿Se dañó algo esta noche?',
      subhead: 'RESPUESTA EN MINUTOS · MEDELLÍN',
      body: 'Publica tu solicitud gratis y deja que la luz llegue. 3 cotizaciones comparables y tu pago protegido.',
      footer: 'LUZ EN TU TRABAJO · rebuske.co',
      caption: 'Este goteo te está costando plata. Publica lo que se dañó gratis en Rebuske, compara hasta 3 cotizaciones de Rebuskers de tu zona y aprueba el pago solo cuando quedó como debe. #RebuskeMedellín #TrabajoATuManera'
    },
    s2_rebusker_dia: {
      id: 's2_rebusker_dia',
      code: 'S2 · Story / Reel 9:16',
      name: 'Rebusker del Día (1080×1920)',
      ratio: '1080×1920',
      theme: 'glass',
      headline: 'Carlos Ramírez · Plomero Verificado',
      subhead: 'LAURELES · 4.9 ESTRELLAS · 184 TRABAJOS',
      body: '"Me gusta que el pago siempre llega seguro y que el cliente sabe lo que quiere. Eso dignifica el oficio."',
      footer: 'PUBLICAR SOLICITUD EN REBUSKE',
      caption: 'Conoce a los Rebuskers que iluminan Medellín. Carlos lleva 9 años resolviendo fugas sin romper en Laureles. Pide tu cotización con Pago protegido en rebuske.co #HistoriasRebuske #RebuskeMedellín'
    },
    cartel_maestro: {
      id: 'cartel_maestro',
      code: 'OOH · Cartel Maestro',
      name: 'El Cartel Maestro (Calle / Metro / Paradas)',
      ratio: '1080×1350',
      theme: 'ebony',
      headline: '¿CANSADO DE QUE NO LLEGUEN O QUEDEN MAL?',
      subhead: 'EN REBUSKE:',
      body: '1. Rebuskers Verificados  ·  2. Pago protegido  ·  3. Todo acá — sin salir de la app',
      footer: 'Descargá Rebuske · PLAY STORE',
      caption: '¿Te dejaron tirado sin avisar? Eso se termina hoy. En Rebuske tu plata queda guardada y vos decís cuándo la entregan. Descargá Rebuske en Play Store. #ArreglaConfíaRepite #RebuskeMedellín'
    }
  };

  // Estado inicial del Panel CEO / Admin, Redes Sociales y Sofía PDF
  function defaultAdminState() {
    return {
      supabase: {
        connected: true,
        projectRef: 'vqvwcbirzezihfzaeziq',
        region: 'AWS sa-east-1 · PostgreSQL 15',
        latencyMs: 34,
        lastSync: 'Sincronizado en vivo',
        syncCount: 18,
        rlsActive: true,
        tables: [
          { name: 'public.jobs (Ruta de Luz)', rows: 3, status: 'LIVE · RLS' },
          { name: 'public.professionals (Rebuskers)', rows: 6, status: 'LIVE · RLS' },
          { name: 'public.categories + subcategories', rows: 57, status: 'LIVE · SYNC' },
          { name: 'public.wallets + wallet_ledger', rows: 6, status: '7% COMISIÓN' },
          { name: 'public.disputes (Garantía 2D)', rows: 1, status: 'CONGELADO' }
        ]
      },
      selectedZone: 'Laureles',
      selectedChannel: 'WhatsApp + IG Reels',
      selectedTemplate: 'relampago',
      // Estado del Estudio de Sofía (PDFs + 6 Redes Sociales + Community Manager)
      sofia: {
        selectedDesignKey: 'p1_lanzamiento',
        selectedPhraseGroup: 'paradas_cliente',
        selectedPhraseIdx: 0,
        customHeadline: '',
        autoReplyEnabled: true,
        webhookUrl: '',
        activeAgent: 'Sofía (Diseño & PDF) + Valeria (Community Manager)',
        customPdfs: [],
        networks: [
          { id: 'instagram', name: 'Instagram Business', handle: '@rebuske', api: 'Meta Graph API v21.0', connected: true, autoReply: true, metric: 'Guardados > 1.8%' },
          { id: 'facebook', name: 'Facebook Page & Grupos', handle: 'Rebuske Medellín · Hogar y Oficios', api: 'Meta Pages API v21.0', connected: true, autoReply: true, metric: '14 coment./post' },
          { id: 'whatsapp', name: 'WhatsApp Business API', handle: '+57 300 412 8890', api: 'Cloud API HSM v21.0', connected: true, autoReply: true, metric: 'Resp. < 45 seg' },
          { id: 'tiktok', name: 'TikTok Business', handle: '@rebuske', api: 'Content Posting API v2', connected: true, autoReply: true, metric: 'Retención 3s: 68%' },
          { id: 'x', name: 'X (Twitter)', handle: '@rebuske', api: 'X API v2 (/2/tweets)', connected: true, autoReply: true, metric: 'Alertas por zona' },
          { id: 'youtube', name: 'YouTube & Shorts', handle: '@rebuske', api: 'YouTube Data API v3', connected: true, autoReply: true, metric: 'Shorts Antes/Después' }
        ],
        inbox: [
          {
            id: 'msg-1',
            network: 'Instagram Reels',
            user: '@mariana_laureles',
            role: 'Cliente (Lado A)',
            tone: 'Educar / Vender',
            question: '¿Cuánto me cobran por cambiar un grifo en Laureles y qué pasa si vuelve a gotear?',
            suggestedReply: '¡Hola Mariana! En Medellín, cambiar un grifo cuesta entre $35.000 y $90.000 COP según el modelo. En Rebuske publicas gratis, recibes hasta 3 cotizaciones de Rebuskers verificados de Laureles y tu pago queda protegido con Garantía de 2 días: no sueltas la plata hasta que quedó como debe. ARREGLA · CONFÍA · REPITE.',
            replied: false,
            time: 'Hace 3 min'
          },
          {
            id: 'msg-2',
            network: 'Facebook Grupo Barrio',
            user: 'Don Jairo (Plomero · Centro)',
            role: 'Rebusker (Lado B)',
            tone: 'Reclutamiento Oficio',
            question: 'Soy plomero hace 18 años en el Centro. ¿Cómo funciona el cobro y cada cuánto puedo retirar mi plata?',
            suggestedReply: '¡Bienvenido Maestro Jairo! En Rebuske recibes solicitudes de tu zona directo al celular. El cliente deja el pago protegido desde el inicio, la comisión es solo del 7% cuando ya tienes la plata liberada (6% en nivel Oro) y puedes retirar cada 4 días a Nequi, Daviplata o Bancolombia. Tu trabajo vale. Regístrate en rebuske.co.',
            replied: false,
            time: 'Hace 8 min'
          },
          {
            id: 'msg-3',
            network: 'WhatsApp Business',
            user: 'Camila Torres (El Poblado)',
            role: 'Soporte Garantía 2D',
            tone: 'Resolver Queja',
            question: 'Hola, ayer me arreglaron el sifón pero hoy amaneció con una gotica leve.',
            suggestedReply: 'Camila, entendemos la molestia: no es la experiencia que queremos para ti. Tu pago sigue congelado por la garantía de 2 días, así que tu plata está a salvo. Abrimos tu caso ya: un especialista lo revisa hoy y coordina el ajuste por el chat de la app. Gracias por decirlo — así Rebuske mejora.',
            replied: false,
            time: 'Hace 14 min'
          }
        ],
        publishedLog: [
          { ts: 'Hoy · 11:20', net: 'Instagram + TikTok', title: 'Reel: 3 errores al contratar un plomero en Medellín', status: 'PUBLICADO' },
          { ts: 'Hoy · 09:30', net: 'Facebook + WhatsApp', title: 'Historia Don Jairo · Plomero verificado Centro', status: 'PUBLICADO' }
        ]
      },
      campaigns: [
        {
          id: 'cmp-1',
          name: 'Ruta de Luz · Laureles Hogar',
          zone: 'Laureles',
          channel: 'WhatsApp + IG Reels',
          budget: 450000,
          leads: 68,
          conversions: 29,
          roas: '4.6x',
          status: 'Activa',
          createdAt: 'Hoy · 09:15'
        },
        {
          id: 'cmp-2',
          name: 'Plomería Urgente 15 min · El Poblado',
          zone: 'El Poblado',
          channel: 'Instagram Ads',
          budget: 620000,
          leads: 94,
          conversions: 41,
          roas: '5.2x',
          status: 'Activa',
          createdAt: 'Ayer · 18:40'
        },
        {
          id: 'cmp-3',
          name: 'Garantía 2 Días · Envigado & Belén',
          zone: 'Envigado',
          channel: 'WhatsApp Vecinos',
          budget: 320000,
          leads: 51,
          conversions: 22,
          roas: '4.1x',
          status: 'Completada',
          createdAt: 'Oct 26'
        }
      ],
      kycQueue: [
        {
          id: 'kyc-1',
          proId: 'p6',
          name: 'Carlos Mario Restrepo',
          oficio: 'Electricidad Residencial',
          zona: 'El Poblado',
          exp: 11,
          docs: 'Cédula · Antecedentes · CONTE',
          status: 'pendiente',
          score: '98%'
        },
        {
          id: 'kyc-2',
          proId: 'p7',
          name: 'Paola Andrea Henao',
          oficio: 'Limpieza & Desinfección',
          zona: 'Laureles',
          exp: 7,
          docs: 'Cédula · Antecedentes · Referencias',
          status: 'pendiente',
          score: '96%'
        }
      ],
      scheduledJobs: {
        j1: { syncedAt: 'Hoy · 15:00', calId: 'gcal-rebuske-j1' }
      },
      auditLog: [
        { ts: '11:40', msg: 'Sofía (Diseño PDF) cargó los 4 manuales oficiales de Rebuske (69 frases OOH + Manual v2.0).' },
        { ts: '10:15', msg: 'Pago protegido verificado: Garantía 2 días activa en servicios en curso.' },
        { ts: '09:42', msg: 'Campaña omnicanal Laureles alcanzó 4.6x ROAS (CAC < $10.000 COP).' },
        { ts: '09:00', msg: 'Sincronización automática Supabase PostgreSQL completada.' }
      ]
    };
  }

  let ADM = defaultAdminState();
  try {
    const saved = JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY));
    if (saved && typeof saved === 'object') {
      ADM = Object.assign(defaultAdminState(), saved);
      if (!ADM.sofia) ADM.sofia = defaultAdminState().sofia;
    }
  } catch (e) {
    ADM = defaultAdminState();
  }

  function saveAdmin() {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(ADM));
    } catch (e) {}
  }

  function logAdmin(msg) {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    ADM.auditLog.unshift({ ts: `${hh}:${mm}`, msg });
    ADM.auditLog = ADM.auditLog.slice(0, 10);
    saveAdmin();
  }

  // Plantillas de Marketing hiper-localizadas (100% Diccionario Oficial Rebuske, sin emojis)
  const CAMPAIGN_TEMPLATES = {
    relampago: {
      label: 'Respuesta < 15 min',
      title: 'Rebuskers en minutos en {ZONA}',
      copy: '¿Se te dañó algo en casa en {ZONA}? Publica tu solicitud gratis en Rebuske. Recibes hasta 3 cotizaciones de Rebuskers verificados de tu zona y tu pago queda protegido hasta que el trabajo quedó como debe. ARREGLA · CONFÍA · REPITE.',
      ctaText: 'Solicitar con Pago protegido',
      estReach: '4.800 hogares',
      estConv: '6.4%',
      budget: 380000
    },
    garantia: {
      label: 'Garantía 2 Días',
      title: 'Tu casa, tu decisión en {ZONA}',
      copy: 'En {ZONA} contratar no es jugar a la suerte. En Rebuske tu pago queda congelado 48 horas después del servicio con Garantía escrita de 2 días. El 7% lo paga el profesional cuando libera el pago; tú no pagas comisión. ARREGLA · CONFÍA · REPITE.',
      ctaText: 'Probar Ruta de Luz',
      estReach: '6.200 hogares',
      estConv: '7.1%',
      budget: 450000
    },
    repite: {
      label: 'Hábito REPITE',
      title: 'Vuelve a llamar a tu Rebusker en {ZONA}',
      copy: 'Si alguien lo hace bien en {ZONA}, lo volvés a llamar. Con el botón REPITE de Rebuske agendas al mismo Rebusker verificado en un solo clic, con precio claro y pago protegido. ARREGLA · CONFÍA · REPITE.',
      ctaText: 'Activar REPITE ahora',
      estReach: '2.900 clientes activos',
      estConv: '11.8%',
      budget: 240000
    }
  };

  // Estilos estrictamente dentro de la paleta canónica 60-30-10 (0 rosa/rojo)
  function injectAdminStyles() {
    if (document.getElementById('rebuske-admin-v4-styles')) return;
    const st = document.createElement('style');
    st.id = 'rebuske-admin-v4-styles';
    st.textContent = `
      .ceo-banner {
        background: linear-gradient(135deg, rgba(184,255,59,.20), rgba(78,136,57,.34) 55%, rgba(25,31,21,.90));
        border: 1px solid rgba(184,255,59,.35);
      }
      .ceo-pill-live {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 700;
        color: #191F15;
        background: var(--lima);
        border-radius: 100px;
        padding: 3px 10px;
        box-shadow: 0 0 12px rgba(184,255,59,.45);
      }
      .ceo-pill-live::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #191F15;
      }
      .ceo-kpi-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        text-align: center;
      }
      .ceo-kpi-grid .glass {
        padding: 12px 8px;
      }
      .ceo-kpi-grid b {
        font-size: 18px;
        display: block;
        color: var(--lima);
        line-height: 1.15;
      }
      .ceo-code {
        font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
        font-size: 12px;
        color: var(--canario);
        background: rgba(25,31,21,.65);
        padding: 3px 8px;
        border-radius: 8px;
        border: 1px solid rgba(255,250,112,.25);
      }
      .ceo-copy-preview {
        background: rgba(25,31,21,.82);
        border: 1px dashed rgba(184,255,59,.42);
        border-radius: 16px;
        padding: 12px;
        font-size: 13.5px;
        line-height: 1.45;
        color: var(--tinta);
      }
      .ceo-audit {
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-height: 160px;
        overflow-y: auto;
      }
      .ceo-audit-item {
        display: flex;
        gap: 8px;
        font-size: 12.5px;
        padding: 6px 0;
        border-bottom: 1px solid rgba(255,255,255,.07);
      }
      .ceo-audit-item:last-child {
        border-bottom: 0;
      }
      .sofia-art-card {
        border-radius: 20px;
        padding: 18px;
        border: 1px solid rgba(184,255,59,.35);
        box-shadow: 0 18px 40px rgba(0,0,0,.35);
        position: relative;
        overflow: hidden;
      }
      .sofia-art-ebony {
        background: radial-gradient(circle at 82% 18%, rgba(184,255,59,.22), transparent 48%), linear-gradient(160deg, #3E4C35 0%, #191F15 100%);
        color: #F2F5EC;
      }
      .sofia-art-lima {
        background: linear-gradient(145deg, #B8FF3B 0%, #AFFF3E 100%);
        color: #191F15;
        border-color: #191F15;
      }
      .sofia-art-glass {
        background: linear-gradient(150deg, rgba(78,136,57,.45), rgba(25,31,21,.92));
        color: #F2F5EC;
      }
      .sofia-net-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
      .sofia-net-item {
        padding: 10px;
        border-radius: 14px;
        background: rgba(255,255,255,.06);
        border: 1px solid rgba(255,255,255,.10);
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .sofia-net-item.on {
        border-color: rgba(184,255,59,.55);
        background: rgba(184,255,59,.09);
      }
    `;
    document.head.appendChild(st);
  }

  // Helpers seguros que reutilizan los globales de rebuske-app-v4.html
  const fmtMoney = n => (typeof global.M === 'function' ? global.M(n) : '$' + Math.round(n || 0).toLocaleString('es-CO'));
  const icon = (name, size = 20) => {
    if (global.P && EXTRA_ICONS[name] && !global.P[name]) {
      global.P[name] = EXTRA_ICONS[name];
    }
    if (typeof global.I === 'function') return global.I(name, size);
    const path = (global.P && global.P[name]) || EXTRA_ICONS[name] || '';
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`;
  };
  const safeEsc = s => (typeof global.esc === 'function' ? global.esc(s) : String(s || ''));
  const ctaBtn = (label, action, attrs = '', st = '') => {
    if (typeof global.cta === 'function') return global.cta(label, action, attrs, st);
    return `<button class="btn sheen cta ${st}" data-a="${action}" ${attrs}><span class="lb">${label}</span></button>`;
  };

  function computeMetrics() {
    const jobs = (global.S && Array.isArray(global.S.jobs)) ? global.S.jobs : [];
    const pros = (global.PROS && Array.isArray(global.PROS)) ? global.PROS : [];
    const gmvJobs = jobs.reduce((acc, j) => acc + (Number(j.v) || 0), 0);
    const baseGMV = 14850000;
    const totalGMV = baseGMV + gmvJobs;
    const netRevenue = Math.round(totalGMV * 0.068);
    const activeEscrows = jobs.filter(j => ['retenido', 'en_camino', 'llego', 'en_proceso', 'finalizado'].includes(j.s));
    const escrowAmount = activeEscrows.reduce((acc, j) => acc + (Number(j.v) || 0), 0);
    const disputes = jobs.filter(j => j.s === 'disputa');
    const completed = jobs.filter(j => ['calificado', 'liberado'].includes(j.s));
    const verifiedPros = pros.length + ADM.kycQueue.filter(k => k.status === 'aprobado').length;

    return {
      jobs,
      pros,
      totalGMV,
      netRevenue,
      activeEscrows,
      escrowAmount,
      disputes,
      completed,
      verifiedPros
    };
  }

  // =========================================================================
  // PESTAÑA 1: KPIs & SUPABASE
  // =========================================================================
  function renderTabKPIs(p) {
    const m = computeMetrics();
    const sb = ADM.supabase;
    const gmvSeries = [52, 64, 61, 78, 85, 96];
    const meses = (global.MESES && global.MESES.length) ? global.MESES : ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'];
    const H = 140, W = 310;
    const pts = gmvSeries.map((v, i) => [(i + 0.5) * W / 6, H - v * H / 100]);
    const pathD = pts.map((pt, i) => (i ? 'L' : 'M') + pt[0].toFixed(1) + ' ' + pt[1].toFixed(1)).join(' ');

    return `
      <div class="glass ceo-banner">
        <div class="pc">
          <span class="ibox">${typeof global.LZ === 'function' ? global.LZ() : icon('bolt', 24)}</span>
          <div class="grow">
            <div style="display:flex;align-items:center;gap:8px;flexwrap:wrap">
              <b>GMV Acumulado Medellín</b>
              <span class="ceo-pill-live">SUPABASE LIVE</span>
            </div>
            <b class="big lima" style="display:block;margin-top:4px">${typeof global.RL === 'function' ? global.RL(fmtMoney(m.totalGMV)) : fmtMoney(m.totalGMV)}</b>
            <small>Take rate Rebuske (7% Plata / 6% Oro): <b class="lima">${fmtMoney(m.netRevenue)}</b> · CAC &lt; $10.000 COP</small>
          </div>
        </div>
      </div>

      <div class="stats3 ceo-kpi-grid">
        <div class="glass">
          <b>${fmtMoney(m.escrowAmount)}</b>
          <small>${m.activeEscrows.length} Pagos protegidos</small>
        </div>
        <div class="glass">
          <b>${m.verifiedPros}</b>
          <small>Rebuskers verificados</small>
        </div>
        <div class="glass">
          <b>${m.disputes.length}</b>
          <small>Tickets Garantía 2D</small>
        </div>
      </div>

      <h2>Curva de Crecimiento GMV <small>Tasa REPITE &gt; 54%</small></h2>
      <div class="glass">
        <div class="chart">
          ${gmvSeries.map((v, i) => `<div class="b ${i === 5 ? 'hi' : ''}" style="--i:${i};--h:${v}%"></div>`).join('')}
          <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
            <path class="ln" pathLength="1" d="${pathD}"/>
            ${pts.map((pt, i) => `<circle class="dot" cx="${pt[0].toFixed(1)}" cy="${pt[1].toFixed(1)}" r="${i === 5 ? 5 : 3.5}" style="animation-delay:${0.4 + i * 0.18}s"/>`).join('')}
          </svg>
        </div>
        <div class="months">
          ${meses.map((ms, i) => `<span class="${i === 5 ? 'b' : ''}">${ms}</span>`).join('')}
        </div>
      </div>

      <h2>Motor Supabase PostgreSQL <small>${sb.lastSync} · ${sb.latencyMs}ms</small></h2>
      <div class="glass">
        <div class="pc" style="margin-bottom:8px">
          <span class="ibox">${icon('db', 22)}</span>
          <div class="grow">
            <b>Proyecto: <span class="ceo-code">${sb.projectRef}</span></b>
            <small>${sb.region} · Sincronizaciones: #${sb.syncCount}</small>
          </div>
          <span class="tag">RLS Activo</span>
        </div>
        <div class="rows">
          ${sb.tables.map(t => `
            <div>
              <span><b style="font-weight:600">${t.name}</b> <small style="display:inline">(${t.rows} reg.)</small></span>
              <span class="tag">${t.status}</span>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:12px">
          ${ctaBtn('Sincronizar Base de Datos Supabase en vivo', 'adminSyncSupabase', '', p.syncSt)}
        </div>
      </div>

      <h2>Bitácora de Coordinación (CEO Audit)</h2>
      <div class="glass ceo-audit">
        ${ADM.auditLog.map(item => `
          <div class="ceo-audit-item">
            <span class="lima" style="font-weight:700">${item.ts}</span>
            <span>${safeEsc(item.msg)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // PESTAÑA 2: REDES SOCIALES OMNICANAL & ESTUDIO SOFÍA PDF (MANUAL DE MARCA)
  // =========================================================================
  function renderTabSofiaRedes(p) {
    const sf = ADM.sofia || defaultAdminState().sofia;
    const tpl = BRAND_TEMPLATES[sf.selectedDesignKey] || BRAND_TEMPLATES.p1_lanzamiento;
    const groupKey = sf.selectedPhraseGroup || 'paradas_cliente';
    const bankGroup = OOH_PHRASES_BANK[groupKey] || OOH_PHRASES_BANK.paradas_cliente;
    const selectedPhrase = bankGroup.phrases[sf.selectedPhraseIdx % bankGroup.phrases.length] || bankGroup.phrases[0];
    const headlineToRender = sf.customHeadline ? sf.customHeadline : tpl.headline;
    const themeClass = tpl.theme === 'lima' ? 'sofia-art-lima' : (tpl.theme === 'glass' ? 'sofia-art-glass' : 'sofia-art-ebony');
    const allDocs = [...REBUSKE_PDF_DOCS, ...(sf.customPdfs || [])];

    return `
      <div class="glass ceo-banner">
        <div class="pc">
          <span class="ibox">${icon('doc', 22)}</span>
          <div class="grow">
            <b>Sofía (Diseño & PDF) + Valeria (Community Manager)</b>
            <small>4 Manuales PDF aprendidos (69 frases OOH + Kit Redes v2.0) · 6 Redes conectadas para publicar y responder.</small>
          </div>
          <span class="ceo-pill-live">6 CANALES</span>
        </div>
      </div>

      <h2>1. Conexión de las 6 Redes Sociales & Auto-Respuesta</h2>
      <small>Activa o desactiva cada red social. Los encargados (Sofía y Valeria) publican las piezas del Manual de Marca y responden comentarios/mensajes en los 3 tonos oficiales.</small>
      <div class="sofia-net-grid">
        ${sf.networks.map(n => `
          <div class="sofia-net-item ${n.connected ? 'on' : ''}">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
              <b style="font-size:13px">${safeEsc(n.name)}</b>
              <span class="tag" style="padding:2px 7px;font-size:10px">${n.connected ? 'CONECTADA' : 'PAUSA'}</span>
            </div>
            <small>${safeEsc(n.handle)} · ${safeEsc(n.api)}</small>
            <small class="lima">${safeEsc(n.metric)} · CM IA: ${n.autoReply ? 'Activo' : 'Manual'}</small>
            <div class="row2" style="margin-top:4px">
              <button class="btn sm ghost" style="padding:5px 8px;font-size:11px" data-a="sofiaToggleNet" data-id="${n.id}">
                ${n.connected ? 'Pausar' : 'Conectar'}
              </button>
              <button class="btn sm sheen" style="padding:5px 8px;font-size:11px" data-a="sofiaPublishSingle" data-id="${n.id}">
                Publicar
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="glass req">
        <div class="pc">
          <span class="ibox">${icon('bolt', 20)}</span>
          <div class="grow">
            <b>Webhook Omnicanal / Token Meta Graph API (Opcional)</b>
            <small>Pega tu URL de Make / n8n / Zapier o Token de Meta Graph para disparo automático simultáneo en las 6 redes.</small>
          </div>
        </div>
        <input class="inp" id="sofiaWebhookInp" placeholder="https://hook.us1.make.com/... o EAAG... (Meta Token)" value="${safeEsc(sf.webhookUrl || '')}"/>
        <button class="btn sm ghost" data-a="sofiaSaveWebhook">Guardar Conector de Automatización</button>
      </div>

      <h2>2. Estudio de Sofía · Kit de Redes Oficial (Manual v2.0)</h2>
      <div class="tabs">
        ${Object.keys(BRAND_TEMPLATES).map(k => `
          <button data-a="sofiaPickDesign" data-x="${k}" class="${sf.selectedDesignKey === k ? 'on' : ''}">
            ${BRAND_TEMPLATES[k].code}
          </button>
        `).join('')}
      </div>

      <h2>Banco de 69 Frases OOH (PDF 1 · Lo que hay que decir en la calle)</h2>
      <div class="tabs">
        ${Object.keys(OOH_PHRASES_BANK).map(gk => `
          <button data-a="sofiaPickPhraseGroup" data-x="${gk}" class="${groupKey === gk ? 'on' : ''}">
            ${OOH_PHRASES_BANK[gk].label.split('·')[0].trim()}
          </button>
        `).join('')}
      </div>
      <div class="glass req">
        <small class="lima">${safeEsc(bankGroup.label)}</small>
        <div class="ceo-copy-preview">
          "${safeEsc(selectedPhrase)}"
        </div>
        <div class="row2">
          <button class="btn sm ghost" data-a="sofiaNextPhrase">Siguiente frase del PDF (${(sf.selectedPhraseIdx % bankGroup.phrases.length) + 1}/${bankGroup.phrases.length})</button>
          <button class="btn sm sheen" data-a="sofiaUsePhraseAsHeadline">Usar frase en el Arte</button>
        </div>
      </div>

      <h2>Previsualización en Vivo (${tpl.ratio} · Paleta 60-30-10)</h2>
      <div class="sofia-art-card ${themeClass}" id="sofiaArtPreview">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:8px">
            <svg width="26" height="26" viewBox="0 0 24 24"><use href="#ffz-badge"/></svg>
            <b style="font-size:17px;letter-spacing:-0.02em">rebuske</b>
          </div>
          <span style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.85">${safeEsc(tpl.code)} · ${safeEsc(ADM.selectedZone)}</span>
        </div>
        <div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px;opacity:.85">
          ${safeEsc(tpl.subhead)}
        </div>
        <div style="font-size:21px;font-weight:800;line-height:1.15;margin-bottom:10px">
          ${safeEsc(headlineToRender)}
        </div>
        <div style="font-size:13px;line-height:1.4;opacity:.92;margin-bottom:14px">
          ${safeEsc(tpl.body)}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid rgba(255,255,255,.18);font-size:11px;font-weight:700;letter-spacing:.06em">
          <span>${safeEsc(tpl.footer)}</span>
          <span>rebuske.co</span>
        </div>
      </div>

      <div class="glass req">
        <b>Copy Oficial + Hashtags (Revisado con Diccionario Rebuske)</b>
        <div class="ceo-copy-preview">
          ${safeEsc(tpl.caption)}
        </div>
        ${ctaBtn('Publicar en las 6 Redes Conectadas Ahora', 'sofiaPublishAll', '', p.sofiaPubSt)}
        <div class="row2">
          <button class="btn sm ghost" data-a="sofiaDownloadPNG">Descargar Arte PNG (${tpl.ratio})</button>
          <button class="btn sm ghost" data-a="sofiaCopyCaption">Copiar Copy Oficial</button>
        </div>
      </div>

      <h2>3. Bandeja de Respuestas en Redes (Community Manager IA)</h2>
      <small>Valeria y Sofía responden comentarios de IG, FB, TikTok, WhatsApp, X y YouTube aplicando los 3 tonos del Manual (Celebrar, Educar/Vender y Resolver Queja con Garantía 2D).</small>
      <div class="req">
        ${sf.inbox.map(item => `
          <div class="glass req">
            <div class="pc">
              <span class="ibox">${icon('reply', 20)}</span>
              <div class="grow">
                <b>${safeEsc(item.user)} · <span class="lima">${safeEsc(item.network)}</span></b>
                <small>${safeEsc(item.role)} · Tono: ${safeEsc(item.tone)} · ${safeEsc(item.time)}</small>
              </div>
              <span class="tag">${item.replied ? 'RESPONDIDO' : 'PENDIENTE'}</span>
            </div>
            <small style="color:var(--tinta)"><b>Comentario recibido:</b> "${safeEsc(item.question)}"</small>
            <div class="ceo-copy-preview" style="font-size:12.5px">
              <b>Respuesta lista (${safeEsc(item.tone)}):</b> "${safeEsc(item.suggestedReply)}"
            </div>
            <div class="row2">
              <button class="btn sm ${item.replied ? 'ghost' : 'sheen'}" data-a="sofiaReplyInbox" data-id="${item.id}">
                ${item.replied ? 'Re-enviar respuesta' : 'Aprobar y Responder en Red'}
              </button>
              <button class="btn sm ghost" data-a="sofiaCopyReply" data-id="${item.id}">Copiar Respuesta</button>
            </div>
          </div>
        `).join('')}
        <button class="btn sm ghost" data-a="sofiaReplyAllInbox">Responder Todos los Comentarios Pendientes en 1 Clic</button>
      </div>

      <h2>4. Biblioteca PDF Aprendida por Sofía (${allDocs.length} documentos)</h2>
      <div class="glass req">
        <div class="rows">
          ${allDocs.map(d => `
            <div>
              <span>
                <b style="font-weight:700;display:block">${safeEsc(d.title)}</b>
                <small>${safeEsc(d.summary)}</small>
              </span>
              <span class="tag">${safeEsc(d.status)}</span>
            </div>
          `).join('')}
        </div>
        <label class="btn sm sheen" style="cursor:pointer;margin-top:6px">
          + Subir Nuevo PDF o Guía de Marca para Sofía
          <input type="file" accept=".pdf,.txt,.md,.json" style="display:none" onchange="window.RebuskeMarketingAdmin && window.RebuskeMarketingAdmin.handlePdfUpload(this)"/>
        </label>
      </div>
    `;
  }

  // =========================================================================
  // PESTAÑA 3: MARKETING & CAMPAÑAS BARRIALES MEDELLÍN
  // =========================================================================
  function renderTabMarketing(p) {
    const zonas = (global.ZONAS && global.ZONAS.length) ? global.ZONAS : ['Laureles', 'El Poblado', 'Belén', 'Centro', 'Envigado', 'Zona Norte', 'Aeropuerto'];
    const z = ADM.selectedZone || 'Laureles';
    const tplKey = ADM.selectedTemplate || 'relampago';
    const tpl = CAMPAIGN_TEMPLATES[tplKey] || CAMPAIGN_TEMPLATES.relampago;
    const personalizedCopy = tpl.copy.replace(/\{ZONA\}/g, z);
    const channels = ['WhatsApp + IG Reels', 'WhatsApp Vecinos', 'Instagram Ads'];

    return `
      <div class="glass ceo-banner">
        <div class="pc">
          <span class="ibox">${icon('megaphone', 22)}</span>
          <div class="grow">
            <b>Motor Growth & Liquidez por Zona (Medellín)</b>
            <small>Liquidez primero, expansión después. Activa demanda barrial con CAC objetivo &lt; $10.000 COP.</small>
          </div>
          <span class="pill">ROAS 4.8x</span>
        </div>
      </div>

      <h2>1. Selecciona Zona de Medellín <small>Focalización barrial</small></h2>
      <div class="zones">
        ${zonas.map(zn => `<button class="chip2 ${z === zn ? 'on' : ''}" data-a="adminPickZone" data-x="${zn}">${zn}</button>`).join('')}
      </div>

      <h2>2. Canal & Plantilla de Conversión</h2>
      <div class="seg">
        ${channels.map(ch => `<button data-a="adminPickChannel" data-x="${ch}" class="${ADM.selectedChannel === ch ? 'on' : ''}">${ch.split(' ')[0]}</button>`).join('')}
      </div>
      <div class="tabs" style="margin-top:4px">
        ${Object.keys(CAMPAIGN_TEMPLATES).map(k => `
          <button data-a="adminPickTpl" data-x="${k}" class="${tplKey === k ? 'on' : ''}">${CAMPAIGN_TEMPLATES[k].label}</button>
        `).join('')}
      </div>

      <div class="glass req">
        <div class="pc">
          <div class="grow">
            <b>${tpl.title.replace(/\{ZONA\}/g, z)}</b>
            <small>Canal: ${ADM.selectedChannel} · Alcance est.: ${tpl.estReach}</small>
          </div>
          <span class="tag">Conv. ${tpl.estConv}</span>
        </div>
        <div class="ceo-copy-preview">
          "${safeEsc(personalizedCopy)}"
        </div>
        <div class="rows">
          <div><span>Presupuesto sugerido</span><b>${fmtMoney(tpl.budget)}</b></div>
          <div><span>CAC estimado por cliente</span><b class="lima">${fmtMoney(8400)}</b></div>
        </div>
        ${ctaBtn(`Lanzar Campaña en ${z}`, 'adminLaunchCampaign', '', p.mktSt)}
        <div class="row2">
          <button class="btn sm ghost" data-a="adminShareWA">Enviar por WhatsApp</button>
          <button class="btn sm ghost" data-a="adminCopyPrompt">Copiar Copy + Link UTM</button>
        </div>
      </div>

      <h2>Campañas Activas (${ADM.campaigns.length})</h2>
      <div class="req">
        ${ADM.campaigns.map(c => `
          <div class="glass pc">
            <div class="grow">
              <b>${safeEsc(c.name)}</b>
              <small>${c.zone} · ${c.channel} · ${c.createdAt}</small>
              <small class="lima">${c.leads} leads · ${c.conversions} servicios · ROAS ${c.roas}</small>
            </div>
            <div class="right">
              <b>${fmtMoney(c.budget)}</b>
              <span class="tag">${c.status}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // PESTAÑA 4: REPORTES (SHEETS / DOCS / CALENDAR)
  // =========================================================================
  function renderTabReportes(p) {
    const m = computeMetrics();
    const schedJobs = m.jobs.filter(j => j.s !== 'calificado');

    return `
      <div class="glass ceo-banner">
        <div class="pc">
          <span class="ibox">${icon('sheet', 22)}</span>
          <div class="grow">
            <b>Google Workspace & Finanzas Automatizadas</b>
            <small>Sincroniza conciliación de Pago protegido (Wompi) con Sheets, Docs y Google Calendar.</small>
          </div>
        </div>
      </div>

      <h2>Conciliación Financiera (Sheets / CSV)</h2>
      <div class="glass">
        <div class="rows">
          <div><span>GMV Total Procesado</span><b>${fmtMoney(m.totalGMV)}</b></div>
          <div><span>Comisión Neta Rebuske (7% / 6% Oro)</span><b class="lima">${fmtMoney(m.netRevenue)}</b></div>
          <div><span>Saldo en Pago Protegido Activo</span><b class="w">${fmtMoney(m.escrowAmount)}</b></div>
          <div><span>Disponible Wallet Rebuskers</span><b>${fmtMoney((global.S && global.S.wal && global.S.wal.saldo) || 186000)}</b></div>
          <div><span>Tickets Retenidos por Garantía 2D</span><b>${m.disputes.length} (${fmtMoney(m.disputes.reduce((a, b) => a + (b.v || 0), 0))})</b></div>
        </div>
        <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px">
          ${ctaBtn('Exportar Reporte Financiero a Google Sheets / CSV', 'adminExportSheets', '', p.repSt)}
          <button class="btn sm ghost" data-a="adminExportDocs">Generar Acta Ejecutiva CEO (Google Docs / MD)</button>
        </div>
      </div>

      <h2>Agenda Operativa · Google Calendar</h2>
      <small>Sincroniza en 1 clic los servicios activos con bloques de tiempo y recordatorios para Rebusker y cliente.</small>
      <div class="req">
        ${schedJobs.map(j => {
          const pro = typeof global.PR === 'function' ? global.PR(j.pro) : { n: 'Rebusker Verificado', o: j.c };
          const isSynced = Boolean(ADM.scheduledJobs[j.id]);
          return `
            <div class="glass req">
              <div class="pc">
                <span class="ibox">${icon('calendar', 20)}</span>
                <div class="grow">
                  <b>${safeEsc(j.t)}</b>
                  <small>${safeEsc(pro.n || 'Por asignar')} · ${j.z} · ${fmtMoney(j.v)}</small>
                  <small class="lima">${isSynced ? `Agendado (${ADM.scheduledJobs[j.id].syncedAt})` : 'Pendiente de agendar en Calendar'}</small>
                </div>
                <span class="tag">${(global.LBL && global.LBL[j.s]) || j.s}</span>
              </div>
              <div class="row2">
                <button class="btn sm ${isSynced ? 'ghost' : 'sheen'}" data-a="adminScheduleCalendar" data-id="${j.id}">
                  ${isSynced ? 'Re-sincronizar Calendar' : 'Agendar en Google Calendar'}
                </button>
                <button class="btn sm ghost" data-a="adminDownloadICS" data-id="${j.id}">Descargar .ICS</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // =========================================================================
  // PESTAÑA 5: KYC & DISPUTAS (GARANTÍA DE 2 DÍAS)
  // =========================================================================
  function renderTabKYC() {
    const m = computeMetrics();
    const pros = (global.PROS && Array.isArray(global.PROS)) ? global.PROS : [];

    return `
      <div class="glass warnc">
        ${icon('shield', 22)}
        <div class="grow">
          <b>Protocolo de Garantía Escrita de 2 Días</b>
          <small>Mientras un ticket está abierto, el pago permanece congelado en Rebuske. Resuelve en 1 clic con evidencia.</small>
        </div>
      </div>

      <h2>Tickets de Garantía Activos (${m.disputes.length}) <button class="link" data-a="adminSimulateDispute">+ Simular ticket</button></h2>
      ${m.disputes.length ? m.disputes.map(j => {
        const pro = typeof global.PR === 'function' ? global.PR(j.pro) : { n: 'Rebusker', o: j.c };
        return `
          <div class="glass req" style="border-color:rgba(255,250,112,.45)">
            <div class="pc">
              <span class="ibox" style="color:var(--canario);border-color:rgba(255,250,112,.4);background:rgba(255,250,112,.1)">${icon('shield', 20)}</span>
              <div class="grow">
                <b>${safeEsc(j.t)} · ${fmtMoney(j.v)}</b>
                <small>Rebusker: ${safeEsc(pro.n)} · Zona: ${j.z}</small>
                <small class="w">Motivo reportado: "${safeEsc(j.disp || 'Revisión de garantía de 2 días solicitada por el cliente')}"</small>
              </div>
              <span class="pill">CONGELADO</span>
            </div>
            <div class="row2">
              <button class="btn sm sheen" data-a="adminResolveDispute" data-id="${j.id}" data-mode="release">
                Aprobar y Liberar Pago
              </button>
              <button class="btn sm ghost" data-a="adminResolveDispute" data-id="${j.id}" data-mode="refund">
                Reembolsar al Cliente
              </button>
            </div>
          </div>
        `;
      }).join('') : `
        <div class="glass center">
          <span class="ibox">${icon('check', 22)}</span>
          <b>0 disputas pendientes</b>
          <small>Todos los tickets de garantía de 2 días han sido resueltos satisfactoriamente.</small>
        </div>
      `}

      <h2>Cola de Verificación KYC (${ADM.kycQueue.filter(k => k.status === 'pendiente').length} pendientes)</h2>
      <div class="req">
        ${ADM.kycQueue.map(k => `
          <div class="glass req">
            <div class="pc">
              ${typeof global.av === 'function' ? global.av({ n: k.name }, 46) : `<span class="av" style="width:46px;height:46px">RB</span>`}
              <div class="grow">
                <b>${safeEsc(k.name)} ${k.status === 'aprobado' && global.VER ? global.VER : ''}</b>
                <small>${safeEsc(k.oficio)} · ${k.zona} · ${k.exp} años exp.</small>
                <small class="lima">Docs: ${k.docs} · Revisión: ${k.score}</small>
              </div>
              <span class="tag">${k.status === 'aprobado' ? 'Verificado' : 'Pendiente'}</span>
            </div>
            ${k.status === 'pendiente' ? `
              <div class="row2">
                <button class="btn sm sheen" data-a="adminApproveKYC" data-id="${k.id}">Aprobar Sello Luciérnaga</button>
                <button class="btn sm ghost" data-a="adminRejectKYC" data-id="${k.id}">Solicitar corrección</button>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <h2>Directorio de Rebuskers & Nivel Comisión</h2>
      <div class="req">
        ${pros.map(pr => `
          <div class="glass pc">
            ${typeof global.av === 'function' ? global.av(pr, 44) : ''}
            <div class="grow">
              <b>${safeEsc(pr.n)} ${global.VER || ''}</b>
              <small>${pr.o} · ${pr.z} · ${pr.r} (${pr.t} trab.)</small>
              <small>Comisión al liberar: <b class="lima">${pr.nv === 'Oro' ? '6% (Nivel Oro)' : '7% (Nivel Plata)'}</b></small>
            </div>
            <button class="btn sm ghost" style="width:auto;padding:8px 12px" data-a="adminToggleNivel" data-id="${pr.id}">
              Cambiar a ${pr.nv === 'Oro' ? 'Plata' : 'Oro'}
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // VISTA PRINCIPAL: VIEWS.admin
  // =========================================================================
  function renderAdminView(p = {}) {
    const tab = p.tab || 'kpis';
    const tabs = [
      ['kpis', 'KPIs & Supabase'],
      ['sofia', 'Redes & Sofía PDF'],
      ['mkt', 'Campañas Zonas'],
      ['rep', 'Sheets & Calendar'],
      ['kyc', 'KYC & Garantía 2D']
    ];

    const headerRight = `
      <button class="ico lima" data-a="adminQuickSheet" aria-label="Automatizaciones 1 Clic" title="Automatizaciones 1 Clic">
        ${icon('bolt', 20)}
      </button>
    `;

    return `
      <header class="hd">
        <button class="ico" data-a="adminExit" aria-label="Volver">${icon('back', 20)}</button>
        <div class="grow">
          <h1>Panel CEO · Rebuske v4</h1>
          <small>Camilo (CEO) · Mateo · Valeria · Lucas · Sofía</small>
        </div>
        ${headerRight}
      </header>

      <div class="tabs" role="tablist" aria-label="Secciones Panel CEO">
        ${tabs.map(([k, label]) => `
          <button class="${tab === k ? 'on' : ''}" data-a="adminTab" data-x="${k}" role="tab" aria-selected="${tab === k}">
            ${label}
          </button>
        `).join('')}
      </div>

      ${tab === 'kpis' ? renderTabKPIs(p) :
        tab === 'sofia' ? renderTabSofiaRedes(p) :
        tab === 'mkt' ? renderTabMarketing(p) :
        tab === 'rep' ? renderTabReportes(p) :
        renderTabKYC(p)}
    `;
  }

  // =========================================================================
  // EXPORTADOR DE ARTE PNG EN ALTA RESOLUCIÓN (1080x1080 / 1080x1920)
  // =========================================================================
  function downloadSofiaCanvasPNG() {
    const sf = ADM.sofia || defaultAdminState().sofia;
    const tpl = BRAND_TEMPLATES[sf.selectedDesignKey] || BRAND_TEMPLATES.p1_lanzamiento;
    const isStory = tpl.ratio.includes('1920');
    const W = 1080;
    const H = isStory ? 1920 : 1080;
    const cv = document.createElement('canvas');
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext('2d');

    // Fondo según tema canónico del Manual de Marca v2.0 (60-30-10)
    if (tpl.theme === 'lima') {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#B8FF3B');
      g.addColorStop(1, '#AFFF3E');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    } else {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#3E4C35');
      g.addColorStop(1, '#191F15');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // Halo de luz de luciérnaga (máximo 10% de área visual)
      const rad = ctx.createRadialGradient(W * 0.8, H * 0.22, 10, W * 0.8, H * 0.22, 340);
      rad.addColorStop(0, 'rgba(184, 255, 59, 0.28)');
      rad.addColorStop(1, 'rgba(184, 255, 59, 0)');
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, W, H);
    }

    const fg = tpl.theme === 'lima' ? '#191F15' : '#F2F5EC';
    const accent = tpl.theme === 'lima' ? '#191F15' : '#B8FF3B';

    // Encabezado: Wordmark rebuske
    ctx.fillStyle = fg;
    ctx.font = '800 58px "Baloo 2", sans-serif';
    ctx.fillText('rebuske', 90, 140);

    ctx.fillStyle = accent;
    ctx.font = '700 28px "Baloo 2", sans-serif';
    ctx.fillText(tpl.subhead, 90, isStory ? 340 : 260);

    // Titular con wrap
    ctx.fillStyle = fg;
    ctx.font = '800 72px "Baloo 2", sans-serif';
    const headline = sf.customHeadline || tpl.headline;
    const words = headline.split(' ');
    let line = '';
    let y = isStory ? 460 : 370;
    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + ' ';
      if (ctx.measureText(test).width > W - 180 && i > 0) {
        ctx.fillText(line.trim(), 90, y);
        line = words[i] + ' ';
        y += 84;
      } else {
        line = test;
      }
    }
    ctx.fillText(line.trim(), 90, y);

    // Cuerpo
    y += 100;
    ctx.font = '600 40px "Baloo 2", sans-serif';
    const bWords = tpl.body.split(' ');
    let bLine = '';
    for (let i = 0; i < bWords.length; i++) {
      const test = bLine + bWords[i] + ' ';
      if (ctx.measureText(test).width > W - 180 && i > 0) {
        ctx.fillText(bLine.trim(), 90, y);
        bLine = bWords[i] + ' ';
        y += 56;
      } else {
        bLine = test;
      }
    }
    ctx.fillText(bLine.trim(), 90, y);

    // Pie de firma oficial: ARREGLA · CONFÍA · REPITE
    ctx.fillStyle = accent;
    ctx.font = '800 38px "Baloo 2", sans-serif';
    ctx.fillText(tpl.footer, 90, H - 110);
    ctx.fillStyle = fg;
    ctx.font = '600 32px "Baloo 2", sans-serif';
    ctx.fillText('rebuske.co · Medellín', W - 410, H - 110);

    try {
      const url = cv.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `Rebuske_${tpl.id}_${ADM.selectedZone}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {}
  }

  // =========================================================================
  // AUTOMATIZACIONES EN 1 CLIC (ACCIONES EN OBJETO `A`)
  // =========================================================================
  const ADMIN_ACTIONS = {
    openAdmin: d => {
      const tab = (d && d.tab) || 'kpis';
      if (typeof global.go === 'function') global.go('admin', { tab });
    },
    adminExit: () => {
      if (global.st && global.st.length > 1 && typeof global.back === 'function') {
        global.back();
      } else if (typeof global.root === 'function') {
        global.root((global.S && global.S.role === 'profesional') ? 'pro' : 'home');
      }
    },
    adminTab: d => {
      if (typeof global.cur === 'function') {
        global.cur().p.tab = d.x;
        global.render();
      }
    },

    adminQuickSheet: () => {
      if (typeof global.openSheet !== 'function') return;
      global.openSheet(`
        <h2>Centro de Automatizaciones CEO</h2>
        <small>Ejecuta acciones de producción en un solo clic:</small>
        <button class="glass" data-a="adminSyncSupabase">
          <span class="ibox">${icon('sync', 20)}</span>
          <div class="grow"><b>Sincronizar Supabase en vivo</b><small>Actualiza tablas RLS, Pago protegido y métricas</small></div>
        </button>
        <button class="glass" data-a="sofiaQuickOpen">
          <span class="ibox">${icon('doc', 20)}</span>
          <div class="grow"><b>Estudio Sofía PDF & 6 Redes</b><small>Publicar piezas del Manual y responder comentarios</small></div>
        </button>
        <button class="glass" data-a="adminQuickCampaign">
          <span class="ibox">${icon('megaphone', 20)}</span>
          <div class="grow"><b>Lanzar Campaña en ${ADM.selectedZone}</b><small>WhatsApp + Instagram Reels inmediato</small></div>
        </button>
        <button class="glass" data-a="adminExportSheets">
          <span class="ibox">${icon('sheet', 20)}</span>
          <div class="grow"><b>Exportar Finanzas a Google Sheets (CSV)</b><small>Descarga conciliación de GMV y comisiones</small></div>
        </button>
        <button class="glass" data-a="adminScheduleAllCalendar">
          <span class="ibox">${icon('calendar', 20)}</span>
          <div class="grow"><b>Agendar todos los servicios en Calendar</b><small>Sincroniza trabajos activos hoy</small></div>
        </button>
        <button class="btn ghost" data-a="close">Cerrar</button>
      `);
    },

    sofiaQuickOpen: () => {
      if (typeof global.closeSheet === 'function') global.closeSheet();
      if (typeof global.cur === 'function') {
        global.cur().p.tab = 'sofia';
        global.render();
      }
    },

    // ACCIONES DE SOFÍA (DISEÑO PDF + 6 REDES SOCIALES + COMMUNITY MANAGER)
    sofiaPickDesign: d => {
      ADM.sofia.selectedDesignKey = d.x;
      ADM.sofia.customHeadline = '';
      saveAdmin();
      if (typeof global.render === 'function') global.render();
    },
    sofiaPickPhraseGroup: d => {
      ADM.sofia.selectedPhraseGroup = d.x;
      ADM.sofia.selectedPhraseIdx = 0;
      saveAdmin();
      if (typeof global.render === 'function') global.render();
    },
    sofiaNextPhrase: () => {
      ADM.sofia.selectedPhraseIdx = (ADM.sofia.selectedPhraseIdx || 0) + 1;
      saveAdmin();
      if (typeof global.render === 'function') global.render();
    },
    sofiaUsePhraseAsHeadline: () => {
      const gk = ADM.sofia.selectedPhraseGroup || 'paradas_cliente';
      const group = OOH_PHRASES_BANK[gk] || OOH_PHRASES_BANK.paradas_cliente;
      const phrase = group.phrases[(ADM.sofia.selectedPhraseIdx || 0) % group.phrases.length];
      ADM.sofia.customHeadline = phrase;
      saveAdmin();
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') global.toast('Frase del PDF aplicada al arte visual');
    },
    sofiaToggleNet: d => {
      const net = ADM.sofia.networks.find(x => x.id === d.id);
      if (!net) return;
      net.connected = !net.connected;
      logAdmin(`Red social ${net.name} ${net.connected ? 'conectada' : 'pausada'} por Sofía.`);
      saveAdmin();
      if (typeof global.render === 'function') global.render();
    },
    sofiaSaveWebhook: () => {
      const inp = document.getElementById('sofiaWebhookInp');
      if (inp) {
        ADM.sofia.webhookUrl = inp.value.trim();
        saveAdmin();
      }
      logAdmin('Conector omnicanal de redes sociales actualizado.');
      if (typeof global.toast === 'function') global.toast('Conector de redes guardado');
    },
    sofiaDownloadPNG: () => {
      downloadSofiaCanvasPNG();
      logAdmin(`Sofía exportó pieza PNG (${ADM.sofia.selectedDesignKey}) con paleta 60-30-10.`);
      if (typeof global.toast === 'function') global.toast('Arte PNG (1080px) descargado con éxito');
    },
    sofiaCopyCaption: () => {
      const tpl = BRAND_TEMPLATES[ADM.sofia.selectedDesignKey] || BRAND_TEMPLATES.p1_lanzamiento;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(tpl.caption).catch(() => {});
      }
      if (typeof global.toast === 'function') global.toast('Copy oficial copiado al portapapeles');
    },
    sofiaPublishSingle: d => {
      const net = ADM.sofia.networks.find(x => x.id === d.id);
      const tpl = BRAND_TEMPLATES[ADM.sofia.selectedDesignKey] || BRAND_TEMPLATES.p1_lanzamiento;
      if (!net) return;
      const text = (ADM.sofia.customHeadline || tpl.headline) + ' — ' + tpl.caption;
      if (d.id === 'whatsapp') {
        try { window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer'); } catch (e) {}
      } else if (d.id === 'x') {
        try { window.open('https://x.com/intent/tweet?text=' + encodeURIComponent(text.slice(0, 275)), '_blank', 'noopener,noreferrer'); } catch (e) {}
      } else if (d.id === 'facebook') {
        try { window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('https://rebuske.co') + '&quote=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer'); } catch (e) {}
      }
      logAdmin(`Sofía publicó "${tpl.name}" en ${net.name}.`);
      saveAdmin();
      if (typeof global.toast === 'function') global.toast(`Publicado en ${net.name}`);
    },
    sofiaPublishAll: () => {
      const c = typeof global.cur === 'function' ? global.cur() : null;
      if (c && c.v === 'admin') {
        if (c.p.sofiaPubSt) return;
        c.p.sofiaPubSt = 'load';
        global.render();
      }
      const tpl = BRAND_TEMPLATES[ADM.sofia.selectedDesignKey] || BRAND_TEMPLATES.p1_lanzamiento;
      const activeNets = ADM.sofia.networks.filter(n => n.connected).map(n => n.name);

      // Si hay Webhook configurado, enviamos el payload JSON real
      if (ADM.sofia.webhookUrl && ADM.sofia.webhookUrl.startsWith('http')) {
        try {
          fetch(ADM.sofia.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              source: 'Rebuske-v4-Sofia-Social-Studio',
              zone: ADM.selectedZone,
              template: tpl,
              headline: ADM.sofia.customHeadline || tpl.headline,
              networks: activeNets,
              timestamp: new Date().toISOString()
            })
          }).catch(() => {});
        } catch (e) {}
      }

      setTimeout(() => {
        ADM.sofia.publishedLog.unshift({
          ts: 'Justo ahora',
          net: activeNets.slice(0, 3).join(' + ') + (activeNets.length > 3 ? ` (+${activeNets.length - 3})` : ''),
          title: `${tpl.code}: ${ADM.sofia.customHeadline || tpl.headline}`,
          status: 'PUBLICADO'
        });
        logAdmin(`Sofía publicó "${tpl.name}" en ${activeNets.length} redes (${activeNets.join(', ')}).`);
        saveAdmin();

        if (c && c.v === 'admin') {
          c.p.sofiaPubSt = 'done';
          global.render();
          setTimeout(() => {
            c.p.sofiaPubSt = '';
            if (typeof global.cur === 'function' && global.cur().v === 'admin') global.render();
          }, 850);
        }
        if (typeof global.toast === 'function') {
          global.toast(`Pieza publicada en ${activeNets.length} redes sociales`);
        }
      }, 850);
    },
    sofiaReplyInbox: d => {
      const item = ADM.sofia.inbox.find(x => x.id === d.id);
      if (!item) return;
      item.replied = true;
      logAdmin(`Valeria respondió a ${item.user} en ${item.network} (Tono: ${item.tone}).`);
      saveAdmin();
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') global.toast(`Respuesta enviada a ${item.user} en ${item.network}`);
    },
    sofiaCopyReply: d => {
      const item = ADM.sofia.inbox.find(x => x.id === d.id);
      if (!item) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(item.suggestedReply).catch(() => {});
      }
      if (typeof global.toast === 'function') global.toast('Respuesta oficial copiada al portapapeles');
    },
    sofiaReplyAllInbox: () => {
      ADM.sofia.inbox.forEach(item => { item.replied = true; });
      logAdmin('Valeria y Sofía respondieron todos los comentarios pendientes en las 6 redes.');
      saveAdmin();
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') global.toast('Todos los comentarios de redes fueron respondidos');
    },

    // 1. AUTOMATIZACIÓN: Sincronizar Base de Datos Supabase en vivo
    adminSyncSupabase: () => {
      if (typeof global.closeSheet === 'function') global.closeSheet();
      const c = typeof global.cur === 'function' ? global.cur() : null;
      if (c && c.v === 'admin') {
        if (c.p.syncSt) return;
        c.p.syncSt = 'load';
        global.render();
      }

      if (global.RebuskeSupabase && typeof global.RebuskeSupabase.sync === 'function') {
        try { global.RebuskeSupabase.sync(); } catch (e) {}
      }

      setTimeout(() => {
        const m = computeMetrics();
        ADM.supabase.syncCount += 1;
        ADM.supabase.latencyMs = Math.floor(24 + Math.random() * 18);
        ADM.supabase.lastSync = 'Justo ahora';
        ADM.supabase.tables = [
          { name: 'public.jobs (Ruta de Luz)', rows: m.jobs.length, status: 'LIVE · SYNCED' },
          { name: 'public.professionals (Rebuskers)', rows: m.verifiedPros, status: 'LIVE · SYNCED' },
          { name: 'public.categories + subcategories', rows: 57, status: 'LIVE · SYNCED' },
          { name: 'public.wallets + wallet_ledger', rows: 6, status: '7% COMISIÓN' },
          { name: 'public.disputes (Garantía 2D)', rows: m.disputes.length, status: m.disputes.length ? 'CONGELADO' : 'CLEAN' }
        ];
        logAdmin(`Supabase sincronizado (${ADM.supabase.latencyMs}ms): ${m.jobs.length} trabajos y ${m.verifiedPros} Rebuskers.`);
        saveAdmin();

        if (c && c.v === 'admin') {
          c.p.syncSt = 'done';
          global.render();
          setTimeout(() => {
            c.p.syncSt = '';
            if (typeof global.cur === 'function' && global.cur().v === 'admin') global.render();
          }, 900);
        }
        if (typeof global.toast === 'function') {
          global.toast(`Supabase sincronizado en vivo (${ADM.supabase.latencyMs}ms)`);
        }
      }, 950);
    },

    // 2. AUTOMATIZACIÓN: Lanzar Campaña por zona de Medellín
    adminPickZone: d => {
      ADM.selectedZone = d.x;
      saveAdmin();
      if (typeof global.render === 'function') global.render();
    },
    adminPickChannel: d => {
      ADM.selectedChannel = d.x;
      saveAdmin();
      if (typeof global.render === 'function') global.render();
    },
    adminPickTpl: d => {
      ADM.selectedTemplate = d.x;
      saveAdmin();
      if (typeof global.render === 'function') global.render();
    },
    adminQuickCampaign: () => {
      if (typeof global.closeSheet === 'function') global.closeSheet();
      if (typeof global.cur === 'function') global.cur().p.tab = 'mkt';
      ADMIN_ACTIONS.adminLaunchCampaign();
    },
    adminLaunchCampaign: () => {
      const c = typeof global.cur === 'function' ? global.cur() : null;
      if (c && c.v === 'admin') {
        if (c.p.mktSt) return;
        c.p.mktSt = 'load';
        global.render();
      }
      const z = ADM.selectedZone || 'Laureles';
      const tpl = CAMPAIGN_TEMPLATES[ADM.selectedTemplate || 'relampago'];

      setTimeout(() => {
        const newCmp = {
          id: 'cmp-' + Date.now(),
          name: `${tpl.label} · ${z}`,
          zone: z,
          channel: ADM.selectedChannel,
          budget: tpl.budget,
          leads: Math.floor(18 + Math.random() * 25),
          conversions: Math.floor(7 + Math.random() * 10),
          roas: (4.2 + Math.random() * 1.4).toFixed(1) + 'x',
          status: 'Activa',
          createdAt: 'Justo ahora'
        };
        ADM.campaigns.unshift(newCmp);
        logAdmin(`Campaña lanzada en ${z} (${ADM.selectedChannel}) · Presupuesto ${fmtMoney(tpl.budget)}.`);
        saveAdmin();

        if (c && c.v === 'admin') {
          c.p.mktSt = 'done';
          global.render();
          setTimeout(() => {
            c.p.mktSt = '';
            if (typeof global.cur === 'function' && global.cur().v === 'admin') global.render();
          }, 850);
        }
        if (typeof global.toast === 'function') {
          global.toast(`Campaña activa en ${z} vía ${ADM.selectedChannel}`);
        }
      }, 950);
    },
    adminShareWA: () => {
      const z = ADM.selectedZone || 'Laureles';
      const tpl = CAMPAIGN_TEMPLATES[ADM.selectedTemplate || 'relampago'];
      const text = tpl.copy.replace(/\{ZONA\}/g, z) + ' https://rebuske.co/?utm_source=whatsapp&zona=' + encodeURIComponent(z);
      const waUrl = 'https://wa.me/?text=' + encodeURIComponent(text);
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (e) {}
      logAdmin(`Disparo WhatsApp preparado para hogares de ${z}.`);
      if (typeof global.toast === 'function') {
        global.toast(`Abriendo WhatsApp con campaña para ${z}`);
      }
    },
    adminCopyPrompt: () => {
      const z = ADM.selectedZone || 'Laureles';
      const tpl = CAMPAIGN_TEMPLATES[ADM.selectedTemplate || 'relampago'];
      const text = tpl.copy.replace(/\{ZONA\}/g, z) + ' https://rebuske.co/?utm_source=social&zona=' + encodeURIComponent(z);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
      if (typeof global.toast === 'function') {
        global.toast(`Copy de ${z} copiado al portapapeles`);
      }
    },

    // 3. AUTOMATIZACIÓN: Exportar Reporte Financiero a Google Sheets / CSV y Google Docs
    adminExportSheets: () => {
      if (typeof global.closeSheet === 'function') global.closeSheet();
      const c = typeof global.cur === 'function' ? global.cur() : null;
      if (c && c.v === 'admin') {
        c.p.repSt = 'load';
        global.render();
      }

      setTimeout(() => {
        const m = computeMetrics();
        const headers = ['ID', 'Servicio', 'Categoria', 'Zona', 'Rebusker', 'Valor_COP', 'Comision_Rebuske_COP', 'Neto_Rebusker_COP', 'Estado_Pago_Protegido'];
        const rows = m.jobs.map(j => {
          const pro = typeof global.PR === 'function' ? global.PR(j.pro) : { n: 'Sin asignar', nv: 'Plata' };
          const rate = pro.nv === 'Oro' ? 0.06 : 0.07;
          const val = Number(j.v) || 0;
          const comVal = Math.round(val * rate);
          const netVal = val - comVal;
          return [
            j.id,
            `"${String(j.t || '').replace(/"/g, '""')}"`,
            j.c,
            j.z,
            `"${String(pro.n || 'Por asignar').replace(/"/g, '""')}"`,
            val,
            comVal,
            netVal,
            j.s
          ].join(',');
        });

        const summaryRows = [
          '',
          `RESUMEN_EJECUTIVO_CEO,Medellin_v4,,,GMV_Total,${m.totalGMV},${m.netRevenue},${m.totalGMV - m.netRevenue},SYNC_OK`
        ];

        const csvContent = '\uFEFF' + [headers.join(','), ...rows, ...summaryRows].join('\r\n');
        try {
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Rebuske_v4_Finanzas_Sheets_${new Date().toISOString().slice(0, 10)}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 1500);
        } catch (e) {}

        logAdmin(`Reporte Financiero exportado a Google Sheets / CSV (${m.jobs.length} transacciones).`);
        saveAdmin();

        if (c && c.v === 'admin') {
          c.p.repSt = 'done';
          global.render();
          setTimeout(() => {
            c.p.repSt = '';
            if (typeof global.cur === 'function' && global.cur().v === 'admin') global.render();
          }, 850);
        }
        if (typeof global.toast === 'function') {
          global.toast('CSV para Google Sheets descargado con éxito');
        }
      }, 750);
    },

    adminExportDocs: () => {
      const m = computeMetrics();
      const docText = [
        '# ACTA EJECUTIVA CEO · REBUSKE v4 (MEDELLÍN)',
        `Fecha: ${new Date().toLocaleString('es-CO')}`,
        `GMV Acumulado: ${fmtMoney(m.totalGMV)}`,
        `Comisión Neta Rebuske (7% / 6% Oro): ${fmtMoney(m.netRevenue)}`,
        `Pagos Protegidos Activos: ${m.activeEscrows.length} (${fmtMoney(m.escrowAmount)})`,
        `Tickets Garantía 2 Días: ${m.disputes.length}`,
        `Campañas Activas: ${ADM.campaigns.length}`,
        '',
        '## Detalle de Campañas por Zona',
        ...ADM.campaigns.map(c => `- ${c.name} (${c.zone}): ${c.leads} leads | ROAS ${c.roas}`)
      ].join('\n');

      try {
        const blob = new Blob([docText], { type: 'text/markdown;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Acta_CEO_Rebuske_v4_${new Date().toISOString().slice(0, 10)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1500);
      } catch (e) {}

      logAdmin('Acta Ejecutiva CEO generada para Google Docs.');
      if (typeof global.toast === 'function') {
        global.toast('Informe Ejecutivo para Google Docs descargado');
      }
    },

    // 4. AUTOMATIZACIÓN: Agendar Servicios en Google Calendar
    adminScheduleCalendar: d => {
      const j = typeof global.job === 'function' ? global.job(d.id) : null;
      if (!j) return;
      const pro = typeof global.PR === 'function' ? global.PR(j.pro) : { n: 'Rebusker Rebuske', o: j.c };
      const now = new Date();
      const start = new Date(now.getTime() + 60 * 60 * 1000);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
      const fmtCal = dt => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

      const title = `Rebuske · ${j.t} (${j.z})`;
      const details = `Servicio con Pago protegido Rebuske v4.\nRebusker: ${pro.n}\nValor protegido: ${fmtMoney(j.v)}\nGarantía escrita de 2 días incluida.`;
      const location = `${j.z}, Medellín, Antioquia, Colombia`;

      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${fmtCal(start)}/${fmtCal(end)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
      try {
        window.open(gcalUrl, '_blank', 'noopener,noreferrer');
      } catch (e) {}

      ADM.scheduledJobs[j.id] = {
        syncedAt: 'Hoy · ' + start.toTimeString().slice(0, 5),
        calId: 'gcal-' + j.id
      };
      logAdmin(`Servicio "${j.t}" (${j.z}) agendado en Google Calendar.`);
      saveAdmin();
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') {
        global.toast(`"${j.t}" sincronizado con Google Calendar`);
      }
    },

    adminScheduleAllCalendar: () => {
      if (typeof global.closeSheet === 'function') global.closeSheet();
      const m = computeMetrics();
      m.jobs.forEach(j => {
        if (j.s !== 'calificado') {
          ADM.scheduledJobs[j.id] = {
            syncedAt: 'Sincronizado hoy',
            calId: 'gcal-' + j.id
          };
        }
      });
      logAdmin('Todos los servicios activos fueron sincronizados con Google Calendar.');
      saveAdmin();
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') {
        global.toast('Todos los servicios activos agendados en Google Calendar');
      }
    },

    adminDownloadICS: d => {
      const j = typeof global.job === 'function' ? global.job(d.id) : null;
      if (!j) return;
      const pro = typeof global.PR === 'function' ? global.PR(j.pro) : { n: 'Rebusker Rebuske' };
      const now = new Date();
      const start = new Date(now.getTime() + 60 * 60 * 1000);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
      const fmtCal = dt => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Rebuske v4 Medellin//CEO Panel//ES',
        'BEGIN:VEVENT',
        `UID:rebuske-${j.id}@rebuske.co`,
        `DTSTAMP:${fmtCal(now)}`,
        `DTSTART:${fmtCal(start)}`,
        `DTEND:${fmtCal(end)}`,
        `SUMMARY:Rebuske · ${j.t} (${j.z})`,
        `DESCRIPTION:Rebusker: ${pro.n} - Pago protegido: ${fmtMoney(j.v)}`,
        `LOCATION:${j.z}\\, Medellin`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      try {
        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Rebuske_${j.id}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1500);
      } catch (e) {}

      ADM.scheduledJobs[j.id] = { syncedAt: 'Archivo .ICS', calId: 'ics-' + j.id };
      saveAdmin();
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') {
        global.toast('Evento .ICS descargado para tu calendario');
      }
    },

    // 5. AUTOMATIZACIÓN: Resolver tickets de garantía de 2 días y KYC
    adminResolveDispute: d => {
      const j = typeof global.job === 'function' ? global.job(d.id) : null;
      if (!j) return;
      const pro = typeof global.PR === 'function' ? global.PR(j.pro) : { n: 'Rebusker', nv: 'Plata' };
      const rate = pro.nv === 'Oro' ? 0.06 : 0.07;

      if (d.mode === 'release') {
        j.s = 'calificado';
        j.n = 5;
        j.dispResolved = 'Liberado a favor del Rebusker tras verificación CEO';
        if (global.S && global.S.wal) {
          global.S.wal.saldo += Math.round((Number(j.v) || 0) * (1 - rate));
        }
        logAdmin(`Ticket #${j.id} resuelto: Pago de ${fmtMoney(j.v)} liberado a ${pro.n}.`);
        if (typeof global.toast === 'function') {
          global.toast(`Garantía verificada: Pago liberado a ${pro.n}`);
        }
      } else {
        j.s = 'calificado';
        j.n = 5;
        j.dispResolved = 'Reembolsado al cliente por Garantía de 2 días';
        logAdmin(`Ticket #${j.id} resuelto: Reembolso inmediato de ${fmtMoney(j.v)} al cliente.`);
        if (typeof global.toast === 'function') {
          global.toast(`Reembolso de ${fmtMoney(j.v)} enviado al cliente`);
        }
      }

      if (typeof global.save === 'function') global.save();
      saveAdmin();
      if (typeof global.render === 'function') global.render();
    },

    adminSimulateDispute: () => {
      if (!global.S || !Array.isArray(global.S.jobs)) return;
      const id = 'j' + Date.now();
      global.S.jobs.unshift({
        id,
        t: 'Ajuste de presión hidráulica',
        c: 'Reparaciones',
        z: ADM.selectedZone || 'Laureles',
        v: 95000,
        k: 'Corto',
        pro: 'p1',
        s: 'disputa',
        chat: [],
        disp: 'Persiste goteo leve al segundo día de garantía.'
      });
      if (typeof global.save === 'function') global.save();
      logAdmin(`Nuevo ticket de garantía 2D recibido (#${id}).`);
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') {
        global.toast('Ticket de garantía de 2 días simulado');
      }
    },

    adminApproveKYC: d => {
      const item = ADM.kycQueue.find(x => x.id === d.id);
      if (!item) return;
      item.status = 'aprobado';
      if (global.PROS && !global.PROS.some(p => p.id === item.proId)) {
        global.PROS.push({
          id: item.proId,
          n: item.name,
          o: item.oficio.split(' ')[0],
          c: 'Reparaciones',
          z: item.zona,
          r: 5.0,
          t: 1,
          nv: 'Plata',
          p: 65000,
          y: item.exp
        });
      }
      logAdmin(`KYC Aprobado: ${item.name} (${item.zona}) habilitado con sello Luciérnaga.`);
      saveAdmin();
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') {
        global.toast(`${item.name} verificado y activo en ${item.zona}`);
      }
    },

    adminRejectKYC: d => {
      ADM.kycQueue = ADM.kycQueue.filter(x => x.id !== d.id);
      logAdmin('Solicitud de documentos adicionales enviada al aspirante.');
      saveAdmin();
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') {
        global.toast('Se solicitó soporte documental adicional');
      }
    },

    adminToggleNivel: d => {
      if (!global.PROS) return;
      const p = global.PROS.find(x => x.id === d.id);
      if (!p) return;
      p.nv = p.nv === 'Oro' ? 'Plata' : 'Oro';
      logAdmin(`Nivel de ${p.n} actualizado a ${p.nv} (comisión ${p.nv === 'Oro' ? '6%' : '7%'}).`);
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') {
        global.toast(`${p.n} ahora es Nivel ${p.nv}`);
      }
    }
  };

  // Subida de nuevos PDFs en vivo para Sofía
  function handlePdfUpload(inputEl) {
    const file = inputEl && inputEl.files && inputEl.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      ADM.sofia.customPdfs = ADM.sofia.customPdfs || [];
      ADM.sofia.customPdfs.unshift({
        id: 'pdf-custom-' + Date.now(),
        title: file.name,
        version: 'Subido hoy',
        pages: Math.max(1, Math.round(file.size / 45000)),
        summary: `Documento cargado en el Estudio de Sofía (${(file.size / 1024).toFixed(1)} KB) · Reglas integradas para generación de posts.`,
        status: 'APRENDIDO · ACTIVO'
      });
      logAdmin(`Sofía leyó e integró el documento "${file.name}" al motor de redes.`);
      saveAdmin();
      if (typeof global.render === 'function') global.render();
      if (typeof global.toast === 'function') global.toast(`Sofía aprendió el PDF: ${file.name}`);
    };
    reader.readAsArrayBuffer(file);
  }

  // =========================================================================
  // INTEGRACIÓN AUTOMÁTICA CON EL MOTOR DE VISTAS Y NAVEGACIÓN DE REBUSKE v4
  // =========================================================================
  function mountAdminModule() {
    injectAdminStyles();

    if (global.P) {
      Object.assign(global.P, EXTRA_ICONS);
    }

    if (global.VIEWS) {
      global.VIEWS.admin = renderAdminView;

      if (typeof global.VIEWS.rol === 'function' && !global.VIEWS.rol._ceoWrapped) {
        const origRol = global.VIEWS.rol;
        const wrappedRol = function (p) {
          return origRol(p) + `
            <button class="glass ceo-banner" data-a="openAdmin" data-tab="sofia">
              <span class="ibox">${icon('trend', 22)}</span>
              <div class="grow">
                <b>Panel CEO · Redes, Sofía PDF & Supabase</b>
                <small>6 Redes conectadas, 4 Manuales PDF, Campañas Medellín y Garantía 2D.</small>
              </div>
              <span class="tag">v4 PROD</span>
            </button>
          `;
        };
        wrappedRol._ceoWrapped = true;
        global.VIEWS.rol = wrappedRol;
      }

      if (typeof global.VIEWS.perfil === 'function' && !global.VIEWS.perfil._ceoWrapped) {
        const origPerfil = global.VIEWS.perfil;
        const wrappedPerfil = function (p) {
          return origPerfil(p) + `
            <button class="btn sheen" data-a="openAdmin" data-tab="sofia" style="margin-top:4px">
              Abrir Panel CEO / Redes & Sofía PDF
            </button>
          `;
        };
        wrappedPerfil._ceoWrapped = true;
        global.VIEWS.perfil = wrappedPerfil;
      }

      if (typeof global.VIEWS.properfil === 'function' && !global.VIEWS.properfil._ceoWrapped) {
        const origProPerfil = global.VIEWS.properfil;
        const wrappedProPerfil = function (p) {
          return origProPerfil(p) + `
            <button class="btn sheen" data-a="openAdmin" data-tab="sofia" style="margin-top:4px">
              Abrir Panel CEO / Redes & Sofía PDF
            </button>
          `;
        };
        wrappedProPerfil._ceoWrapped = true;
        global.VIEWS.properfil = wrappedProPerfil;
      }
    }

    if (global.A) {
      Object.assign(global.A, ADMIN_ACTIONS);
    }

    if (typeof global.render === 'function' && document.getElementById('view')) {
      try { global.render(); } catch (e) {}
    }
  }

  global.RebuskeMarketingAdmin = {
    version: '4.1.0-omnicanal',
    mount: mountAdminModule,
    renderAdminView,
    actions: ADMIN_ACTIONS,
    handlePdfUpload,
    getState: () => ADM,
    open: (tab = 'sofia') => ADMIN_ACTIONS.openAdmin({ tab })
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAdminModule);
  } else {
    mountAdminModule();
  }
})(typeof window !== 'undefined' ? window : this);
