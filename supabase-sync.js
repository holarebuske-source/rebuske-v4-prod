/**
 * ============================================================================
 * REBUSKE v4 PROD · SUPABASE SYNC & AUTOMATION ENGINE (supabase-sync.js)
 * ============================================================================
 * Arquitecto Full-Stack: Mateo (bajo dirección de Camilo, CEO)
 *
 * Conecta todas las operaciones de Rebuske v4 (`rebuske-app-v4.html`) con la
 * REST API real de Supabase (PostgREST v1) y el conector de automatización
 * para reportes ejecutivos, analítica de embudo y marketing.
 *
 * Tablas sincronizadas:
 *  - public.categories & public.subcategories
 *  - public.professionals & public.profiles
 *  - public.jobs & public.job_quotes
 *  - public.chat_messages (con detección anti-fraude)
 *  - public.wallets & public.wallet_ledger (Comisión 7% / 6% Oro, retiros 4 días)
 *  - public.disputes (Garantía de 2 días y mediación)
 * ============================================================================
 */

(function (global) {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. CONFIGURACIÓN DE SUPABASE REST API & CONSTANTES
  // --------------------------------------------------------------------------
  const SUPABASE_URL = 'https://vqvwcbirzezihfzaeziq.supabase.co';
  const SUPABASE_REST_URL = `${SUPABASE_URL}/rest/v1`;
  const SUPABASE_ANON_KEY = 'sb_publishable_BK1NkxOB_5Ns0R64v-CW3g_g2TEy4Qi';

  const SYNC_QUEUE_KEY = 'rebuske_v4_sync_queue';
  const ANALYTICS_LOG_KEY = 'rebuske_v4_automation_events';
  const ID_MAP_KEY = 'rebuske_v4_uuid_map';

  // Parche preventivo para variable TABS usada en navFor() de rebuske-app-v4.html
  if (typeof global.TABS === 'undefined') {
    global.TABS = ['home', 'trabajos', 'buscar', 'perfil'];
  }

  // Mapeo entre nombres de categorías UI y IDs del esquema SQL (public.categories)
  const CATEGORY_NAME_TO_ID = {
    'Hogar': 'hogar',
    'Reparaciones': 'reparaciones',
    'Vehículos': 'vehiculos',
    'Tecnología': 'tecnologia',
    'Personal': 'personal',
    'Eventos': 'eventos',
    'Transporte': 'transporte',
    'Profesionales': 'profesionales'
  };

  const CATEGORY_ID_TO_NAME = Object.fromEntries(
    Object.entries(CATEGORY_NAME_TO_ID).map(([k, v]) => [v, k])
  );

  const CATEGORY_ID_TO_ICON = {
    'hogar': 'home',
    'reparaciones': 'tool',
    'vehiculos': 'pin',
    'tecnologia': 'shield',
    'personal': 'user',
    'eventos': 'star',
    'transporte': 'bag',
    'profesionales': 'wallet'
  };

  // Mapeo entre estados UI (rebuske-app-v4.html) y estados SQL (public.jobs CHECK constraint)
  // SQL CHECK: ('publicada', 'cotizada', 'asignada', 'en_camino', 'llego', 'en_proceso', 'completado', 'cancelada')
  const UI_TO_DB_STATUS = {
    'buscando': 'publicada',
    'cotizada': 'cotizada',
    'asignado': 'asignada',
    'retenido': 'asignada',
    'en_camino': 'en_camino',
    'llego': 'llego',
    'en_proceso': 'en_proceso',
    'finalizado': 'en_proceso',
    'liberado': 'completado',
    'calificado': 'completado',
    'disputa': 'en_proceso',
    'cancelada': 'cancelada'
  };

  const DB_TO_UI_STATUS = {
    'publicada': 'buscando',
    'cotizada': 'buscando',
    'asignada': 'retenido',
    'en_camino': 'en_camino',
    'llego': 'llego',
    'en_proceso': 'en_proceso',
    'completado': 'calificado',
    'cancelada': 'calificado'
  };

  // Regex anti-fraude idéntica a la vista de chat en rebuske-app-v4.html
  const ANTI_FRAUD_PHONE_REGEX = /\d[\d \-]{6,}\d/;

  // --------------------------------------------------------------------------
  // 2. UTILIDADES DE IDENTIFICADORES UUID DETERMINÍSTICOS & PERSISTENCIA
  // --------------------------------------------------------------------------
  let uuidMap = {};
  try {
    uuidMap = JSON.parse(localStorage.getItem(ID_MAP_KEY) || '{}');
  } catch (_) {
    uuidMap = {};
  }

  function saveUuidMap() {
    try {
      localStorage.setItem(ID_MAP_KEY, JSON.stringify(uuidMap));
    } catch (_) {}
  }

  function generateUUID() {
    if (global.crypto && typeof global.crypto.randomUUID === 'function') {
      return global.crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // UUIDs fijos de semilla para los actores principales de Rebuske v4
  const SEED_UUIDS = {
    'client_camila': '00000000-0000-4000-8000-0000000000c1',
    'p1': '00000000-0000-4000-8000-000000000001', // Julián Restrepo
    'p2': '00000000-0000-4000-8000-000000000002', // Marcela Gómez
    'p3': '00000000-0000-4000-8000-000000000003', // Sandra Villegas
    'p4': '00000000-0000-4000-8000-000000000004', // Lupita Salazar
    'p5': '00000000-0000-4000-8000-000000000005', // Don Jairo
    'j1': '00000000-0000-4000-8000-000000000101',
    'j2': '00000000-0000-4000-8000-000000000102',
    'j3': '00000000-0000-4000-8000-000000000103',
    'j4': '00000000-0000-4000-8000-000000000104'
  };

  function resolveUUID(localId) {
    if (!localId) return null;
    if (UUID_REGEX.test(localId)) return localId;
    if (SEED_UUIDS[localId]) return SEED_UUIDS[localId];
    if (!uuidMap[localId]) {
      uuidMap[localId] = generateUUID();
      saveUuidMap();
    }
    return uuidMap[localId];
  }

  // --------------------------------------------------------------------------
  // 3. CLIENTE HTTP PARA SUPABASE REST API (PostgREST v1) + COLA OFFLINE
  // --------------------------------------------------------------------------
  const SupabaseRestClient = {
    authToken: null,

    setAuthToken(token) {
      this.authToken = token;
    },

    getHeaders(extraHeaders = {}) {
      const bearer = this.authToken || SUPABASE_ANON_KEY;
      return {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${bearer}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        ...extraHeaders
      };
    },

    async request(table, { method = 'GET', query = '', body = null, headers = {}, enqueueOnFail = true } = {}) {
      const url = `${SUPABASE_REST_URL}/${table}${query ? `?${query}` : ''}`;
      const options = {
        method,
        headers: this.getHeaders(headers)
      };
      if (body !== null && method !== 'GET' && method !== 'HEAD') {
        options.body = JSON.stringify(body);
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          const error = new Error(`[Supabase REST ${response.status}] ${table}: ${errText}`);
          error.status = response.status;
          throw error;
        }
        const text = await response.text();
        return text ? JSON.parse(text) : null;
      } catch (err) {
        if (enqueueOnFail && method !== 'GET') {
          SyncQueue.enqueue({ table, method, query, body, headers, timestamp: new Date().toISOString() });
        }
        console.warn(`[RebuskeSync] Operación diferida o en modo híbrido (${method} ${table}):`, err.message);
        return null;
      }
    },

    select(table, query = 'select=*') {
      return this.request(table, { method: 'GET', query, enqueueOnFail: false });
    },

    insert(table, payload, upsert = false) {
      const headers = upsert
        ? { 'Prefer': 'resolution=merge-duplicates,return=representation' }
        : { 'Prefer': 'return=representation' };
      return this.request(table, { method: 'POST', body: payload, headers });
    },

    update(table, matchQuery, payload) {
      return this.request(table, { method: 'PATCH', query: matchQuery, body: payload });
    },

    remove(table, matchQuery) {
      return this.request(table, { method: 'DELETE', query: matchQuery });
    }
  };

  // Cola persistente para tolerancia a fallos de red o desconexión temporal
  const SyncQueue = {
    getQueue() {
      try {
        return JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]');
      } catch (_) {
        return [];
      }
    },

    saveQueue(list) {
      try {
        localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(list.slice(-100)));
      } catch (_) {}
    },

    enqueue(item) {
      const q = this.getQueue();
      q.push(item);
      this.saveQueue(q);
    },

    async flush() {
      const q = this.getQueue();
      if (!q.length) return { flushed: 0, remaining: 0 };
      const remaining = [];
      let flushed = 0;

      for (const op of q) {
        const res = await SupabaseRestClient.request(op.table, {
          method: op.method,
          query: op.query,
          body: op.body,
          headers: op.headers,
          enqueueOnFail: false
        });
        if (res !== null) {
          flushed++;
        } else {
          remaining.push(op);
        }
      }
      this.saveQueue(remaining);
      return { flushed, remaining: remaining.length };
    }
  };

  // --------------------------------------------------------------------------
  // 4. SERVICIOS DE DOMINIO CONECTADOS A LAS 6 ENTIDADES DE SUPABASE
  // --------------------------------------------------------------------------

  /**
   * 4.1 CATEGORÍAS Y SUBCATEGORÍAS (`public.categories` & `public.subcategories`)
   */
  const CategoriesService = {
    async fetchAll() {
      const [categories, subcategories] = await Promise.all([
        SupabaseRestClient.select('categories', 'select=*&order=sort_order.asc'),
        SupabaseRestClient.select('subcategories', 'select=*&order=name.asc')
      ]);

      if (Array.isArray(categories) && categories.length > 0 && Array.isArray(global.CATS)) {
        global.CATS.length = 0;
        categories.forEach(cat => {
          global.CATS.push([cat.name, CATEGORY_ID_TO_ICON[cat.id] || 'tool', cat.id]);
        });
      }

      if (Array.isArray(subcategories) && subcategories.length > 0 && Array.isArray(global.REF)) {
        global.REF.length = 0;
        subcategories.slice(0, 8).forEach(sub => {
          const minFmt = Number(sub.ref_min_price).toLocaleString('es-CO');
          const maxFmt = Number(sub.ref_max_price).toLocaleString('es-CO');
          global.REF.push([sub.name, `${minFmt} – ${maxFmt}`]);
        });
        global.REBUSKE_SUBCATEGORIES = subcategories;
      }

      return { categories: categories || [], subcategories: subcategories || [] };
    }
  };

  /**
   * 4.2 PROFESIONALES (`public.professionals` & `public.profiles`)
   */
  const ProfessionalsService = {
    async fetchAll() {
      const rows = await SupabaseRestClient.select(
        'professionals',
        'select=*,profiles(full_name,zone,city,avatar_url,phone)&order=rating.desc'
      );

      if (Array.isArray(rows) && rows.length > 0 && Array.isArray(global.PROS)) {
        rows.forEach(dbPro => {
          const mapped = this.mapDbToUi(dbPro);
          const idx = global.PROS.findIndex(p => p.id === mapped.id || resolveUUID(p.id) === dbPro.id);
          if (idx >= 0) {
            global.PROS[idx] = { ...global.PROS[idx], ...mapped };
          } else {
            global.PROS.push(mapped);
          }
        });
      }
      return rows || [];
    },

    mapDbToUi(dbPro) {
      const profile = dbPro.profiles || {};
      const expYears = parseInt(String(dbPro.experience || '5').replace(/\D/g, ''), 10) || 5;
      return {
        id: dbPro.id,
        n: profile.full_name || dbPro.profession || 'Profesional Rebuske',
        o: dbPro.subcategory_name || dbPro.profession || 'Servicios Generales',
        c: CATEGORY_ID_TO_NAME[dbPro.category_id] || 'Reparaciones',
        z: profile.zone || 'Laureles',
        r: Number(dbPro.rating || 5.0),
        t: Number(dbPro.jobs_count || 0),
        nv: dbPro.tier || 'Plata',
        p: Number(dbPro.base_price || 60000),
        y: expYears,
        verified: Boolean(dbPro.verified),
        is_available: Boolean(dbPro.is_available)
      };
    },

    async updateAvailability(proLocalId, isAvailable) {
      const proUuid = resolveUUID(proLocalId || 'p1');
      const result = await SupabaseRestClient.update(
        'professionals',
        `id=eq.${proUuid}`,
        { is_available: Boolean(isAvailable) }
      );
      RebuskeAutomation.track('pro_availability_changed', {
        pro_id: proUuid,
        is_available: Boolean(isAvailable)
      });
      return result;
    }
  };

  /**
   * 4.3 TRABAJOS Y COTIZACIONES (`public.jobs` & `public.job_quotes`)
   */
  const JobsService = {
    async fetchAll() {
      const rows = await SupabaseRestClient.select(
        'jobs',
        'select=*,job_quotes(*),chat_messages(*)&order=created_at.desc&limit=50'
      );
      return rows || [];
    },

    mapUiJobToDb(uiJob) {
      const jobUuid = resolveUUID(uiJob.id);
      const clientUuid = resolveUUID('client_camila');
      const proUuid = uiJob.pro ? resolveUUID(uiJob.pro) : null;
      const catId = CATEGORY_NAME_TO_ID[uiJob.c] || 'reparaciones';
      const dbStatus = UI_TO_DB_STATUS[uiJob.s] || 'publicada';

      return {
        id: jobUuid,
        client_id: clientUuid,
        pro_id: proUuid,
        title: uiJob.t || 'Solicitud Rebuske',
        category_id: catId,
        subcategory_name: uiJob.c || 'Reparaciones',
        zone: uiJob.z || (global.S && global.S.zona) || 'Laureles',
        address: `Medellín · ${uiJob.z || 'Laureles'}`,
        schedule_date: uiJob.w || 'Hoy · Inmediato',
        amount: Number(uiJob.v || uiJob.b || 60000),
        description: `${uiJob.t || ''} [Modalidad: ${uiJob.k || 'Corto'}] [EstadoUI: ${uiJob.s || 'buscando'}]`.trim(),
        status: dbStatus,
        milestones: uiJob.k === 'Largo',
        rating: uiJob.n ? Math.min(5, Math.max(1, Number(uiJob.n))) : null,
        review: uiJob.review || null,
        updated_at: new Date().toISOString()
      };
    },

    async createJobWithQuotes(uiJob) {
      const dbJob = this.mapUiJobToDb(uiJob);
      const createdJob = await SupabaseRestClient.insert('jobs', dbJob, true);

      // Si el trabajo tiene propuestas comparables (Ruta de Luz), sincronizarlas en job_quotes
      if (Array.isArray(uiJob.props) && uiJob.props.length > 0) {
        const quotesPayload = uiJob.props.map(q => ({
          id: generateUUID(),
          job_id: dbJob.id,
          pro_id: resolveUUID(q.pro),
          quoted_amount: Number(q.p || dbJob.amount),
          notes: q.m || 'Propuesta verificada en Ruta de Luz',
          status: 'pendiente'
        }));
        await SupabaseRestClient.insert('job_quotes', quotesPayload, true);
      }

      RebuskeAutomation.track('job_published', {
        job_id: dbJob.id,
        local_id: uiJob.id,
        title: dbJob.title,
        category_id: dbJob.category_id,
        zone: dbJob.zone,
        amount: dbJob.amount,
        quotes_count: (uiJob.props || []).length
      });

      return createdJob;
    },

    async selectQuote(uiJob, selectedProId, agreedAmount) {
      const jobUuid = resolveUUID(uiJob.id);
      const proUuid = resolveUUID(selectedProId);

      await Promise.all([
        SupabaseRestClient.update('jobs', `id=eq.${jobUuid}`, {
          pro_id: proUuid,
          amount: Number(agreedAmount),
          status: 'asignada',
          updated_at: new Date().toISOString()
        }),
        SupabaseRestClient.update('job_quotes', `job_id=eq.${jobUuid}&pro_id=eq.${proUuid}`, {
          status: 'aceptada'
        })
      ]);

      RebuskeAutomation.track('quote_selected', {
        job_id: jobUuid,
        pro_id: proUuid,
        agreed_amount: Number(agreedAmount)
      });
    },

    async updateJobStatus(uiJob, extraFields = {}) {
      const jobUuid = resolveUUID(uiJob.id);
      const dbStatus = UI_TO_DB_STATUS[uiJob.s] || 'en_proceso';
      const payload = {
        status: dbStatus,
        amount: Number(uiJob.v || 0),
        description: `${uiJob.t || ''} [Modalidad: ${uiJob.k || 'Corto'}] [EstadoUI: ${uiJob.s}]`.trim(),
        updated_at: new Date().toISOString(),
        ...extraFields
      };
      if (uiJob.pro) payload.pro_id = resolveUUID(uiJob.pro);
      if (uiJob.n) payload.rating = Math.min(5, Math.max(1, Number(uiJob.n)));

      const updated = await SupabaseRestClient.update('jobs', `id=eq.${jobUuid}`, payload);

      RebuskeAutomation.track('job_status_advanced', {
        job_id: jobUuid,
        ui_status: uiJob.s,
        db_status: dbStatus,
        amount: payload.amount
      });

      return updated;
    }
  };

  /**
   * 4.4 MENSAJES DE CHAT CON SOPORTE ANTI-FRAUDE (`public.chat_messages`)
   */
  const ChatService = {
    async fetchMessages(jobLocalId) {
      const jobUuid = resolveUUID(jobLocalId);
      return await SupabaseRestClient.select(
        'chat_messages',
        `select=*&job_id=eq.${jobUuid}&order=created_at.asc`
      );
    },

    async sendMessage(jobLocalId, senderRole, text) {
      const jobUuid = resolveUUID(jobLocalId);
      const senderUuid = senderRole === 'pro' || senderRole === 'p'
        ? resolveUUID('p1')
        : resolveUUID('client_camila');
      const roleNormalized = (senderRole === 'p' || senderRole === 'pro') ? 'pro' : 'cliente';
      const isWarning = ANTI_FRAUD_PHONE_REGEX.test(String(text));

      const payload = {
        id: generateUUID(),
        job_id: jobUuid,
        sender_id: senderUuid,
        sender_role: roleNormalized,
        message: String(text),
        is_warning: isWarning,
        created_at: new Date().toISOString()
      };

      const res = await SupabaseRestClient.insert('chat_messages', payload);

      if (isWarning) {
        RebuskeAutomation.track('chat_anti_fraud_warning', {
          job_id: jobUuid,
          sender_role: roleNormalized,
          detected_pattern: 'phone_or_contact_leak'
        });
      } else {
        RebuskeAutomation.track('chat_message_sent', {
          job_id: jobUuid,
          sender_role: roleNormalized
        });
      }

      return res;
    }
  };

  /**
   * 4.5 BILLETERA Y LIBRO MAYOR CONTABLE (`public.wallets` & `public.wallet_ledger`)
   */
  const WalletsService = {
    async fetchWallet(proLocalId = 'p1') {
      const proUuid = resolveUUID(proLocalId);
      const rows = await SupabaseRestClient.select('wallets', `select=*&pro_id=eq.${proUuid}`);
      if (Array.isArray(rows) && rows[0] && global.S && global.S.wal) {
        global.S.wal.saldo = Number(rows[0].balance_available || 0);
        global.S.wal.pend = Number(rows[0].balance_pending || 0);
      }
      return rows && rows[0] ? rows[0] : null;
    },

    async recordEscrowRetention(uiJob) {
      const proUuid = resolveUUID(uiJob.pro || 'p1');
      const gross = Number(uiJob.v || 0);
      const currentPend = (global.S && global.S.wal && Number(global.S.wal.pend)) || 0;
      const currentSaldo = (global.S && global.S.wal && Number(global.S.wal.saldo)) || 0;

      await SupabaseRestClient.insert('wallets', {
        pro_id: proUuid,
        balance_available: currentSaldo,
        balance_pending: currentPend + gross,
        updated_at: new Date().toISOString()
      }, true);

      RebuskeAutomation.track('escrow_paid', {
        job_id: resolveUUID(uiJob.id),
        pro_id: proUuid,
        amount_gross: gross
      });
    },

    async releasePaymentToWallet(uiJob, proTier = 'Plata') {
      const proUuid = resolveUUID(uiJob.pro || 'p1');
      const jobUuid = resolveUUID(uiJob.id);
      const gross = Number(uiJob.v || 0);
      const feeRate = proTier === 'Oro' ? 6.00 : 7.00;
      const feeAmount = Math.round(gross * (feeRate / 100));
      const netAmount = gross - feeAmount;

      const newSaldo = (global.S && global.S.wal) ? Number(global.S.wal.saldo) : netAmount;
      const newPend = (global.S && global.S.wal) ? Math.max(0, Number(global.S.wal.pend) - gross) : 0;

      await Promise.all([
        SupabaseRestClient.insert('wallets', {
          pro_id: proUuid,
          balance_available: newSaldo,
          balance_pending: newPend,
          updated_at: new Date().toISOString()
        }, true),
        SupabaseRestClient.insert('wallet_ledger', {
          id: generateUUID(),
          pro_id: proUuid,
          job_id: jobUuid,
          concept: `Liberación Pago Protegido · ${uiJob.t || 'Servicio Rebuske'}`,
          amount_gross: gross,
          fee_percentage: feeRate,
          fee_amount: feeAmount,
          amount_net: netAmount,
          type: 'ingreso',
          created_at: new Date().toISOString()
        })
      ]);

      RebuskeAutomation.track('payment_released', {
        job_id: jobUuid,
        pro_id: proUuid,
        amount_gross: gross,
        fee_percentage: feeRate,
        fee_amount: feeAmount,
        amount_net: netAmount
      });

      return { gross, feeRate, feeAmount, netAmount };
    },

    async processWithdrawal(proLocalId = 'p1', withdrawnAmount = 0) {
      const proUuid = resolveUUID(proLocalId);
      const now = new Date().toISOString();

      await Promise.all([
        SupabaseRestClient.insert('wallets', {
          pro_id: proUuid,
          balance_available: 0,
          balance_pending: (global.S && global.S.wal) ? Number(global.S.wal.pend || 0) : 0,
          last_withdrawal_at: now,
          updated_at: now
        }, true),
        SupabaseRestClient.insert('wallet_ledger', {
          id: generateUUID(),
          pro_id: proUuid,
          job_id: null,
          concept: 'Retiro programado (Ciclo 4 días · Nequi / Daviplata / ACH)',
          amount_gross: Number(withdrawnAmount),
          fee_percentage: 0,
          fee_amount: 0,
          amount_net: Number(withdrawnAmount),
          type: 'retiro',
          created_at: now
        })
      ]);

      RebuskeAutomation.track('wallet_withdrawal', {
        pro_id: proUuid,
        amount_withdrawn: Number(withdrawnAmount),
        cooldown_days: 4
      });
    }
  };

  /**
   * 4.6 DISPUTAS Y GARANTÍA DE 2 DÍAS (`public.disputes`)
   */
  const DisputesService = {
    async fetchAll() {
      return (await SupabaseRestClient.select('disputes', 'select=*&order=created_at.desc')) || [];
    },

    async openDispute(uiJob, reasonText) {
      const jobUuid = resolveUUID(uiJob.id);
      const reporterUuid = resolveUUID('client_camila');

      const disputePayload = {
        id: generateUUID(),
        job_id: jobUuid,
        reporter_id: reporterUuid,
        title: `Garantía 2 días · ${uiJob.t || 'Servicio'}`,
        reason: reasonText || uiJob.disp || 'Sin detalle especificado',
        evidence: 'Ticket abierto desde Ruta de Luz con pago congelado en Escrow',
        amount: Number(uiJob.v || 0),
        refund_percentage: 0,
        status: 'En revisión',
        created_at: new Date().toISOString()
      };

      const res = await SupabaseRestClient.insert('disputes', disputePayload);

      RebuskeAutomation.track('dispute_opened', {
        dispute_id: disputePayload.id,
        job_id: jobUuid,
        title: disputePayload.title,
        reason: disputePayload.reason,
        frozen_amount: disputePayload.amount
      });

      return res;
    }
  };

  // --------------------------------------------------------------------------
  // 5. CONECTOR DE AUTOMATIZACIÓN PARA REPORTES EJECUTIVOS Y MARKETING
  // --------------------------------------------------------------------------
  const RebuskeAutomation = {
    webhookUrl: localStorage.getItem('rebuske_automation_webhook') || null,

    configureWebhook(url) {
      this.webhookUrl = url;
      if (url) localStorage.setItem('rebuske_automation_webhook', url);
    },

    getEventsLog() {
      try {
        return JSON.parse(localStorage.getItem(ANALYTICS_LOG_KEY) || '[]');
      } catch (_) {
        return [];
      }
    },

    track(eventName, properties = {}) {
      const eventRecord = {
        id: generateUUID(),
        event: eventName,
        timestamp: new Date().toISOString(),
        zone: (global.S && global.S.zona) || 'Laureles',
        role: (global.S && global.S.role) || 'cliente',
        properties
      };

      // 1. Guardar en bitácora local para reportes ejecutivos inmediatos
      try {
        const log = this.getEventsLog();
        log.push(eventRecord);
        localStorage.setItem(ANALYTICS_LOG_KEY, JSON.stringify(log.slice(-500)));
      } catch (_) {}

      // 2. Enviar a Google Analytics 4 / Meta Pixel dataLayer si está disponible
      if (Array.isArray(global.dataLayer)) {
        global.dataLayer.push({ event: `rebuske_${eventName}`, ...eventRecord });
      }

      // 3. Emitir CustomEvent en el navegador para paneles en vivo
      if (typeof global.dispatchEvent === 'function' && typeof CustomEvent !== 'undefined') {
        global.dispatchEvent(new CustomEvent('rebuske:automation', { detail: eventRecord }));
      }

      // 4. Despachar a Webhook de Automatización (Make / n8n / Zapier / Edge Function)
      if (this.webhookUrl) {
        fetch(this.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventRecord)
        }).catch(() => {});
      }

      return eventRecord;
    },

    /**
     * Genera el Reporte Ejecutivo de Negocio y Finanzas para Camilo (CEO)
     */
    generateExecutiveReport() {
      const state = global.S || { jobs: [], req: [], wal: { saldo: 0, pend: 0 } };
      const jobs = Array.isArray(state.jobs) ? state.jobs : [];
      const pros = Array.isArray(global.PROS) ? global.PROS : [];
      const events = this.getEventsLog();

      const gmvTotal = jobs.reduce((acc, j) => acc + Number(j.v || 0), 0);
      const completedJobs = jobs.filter(j => j.s === 'calificado' || j.s === 'liberado');
      const gmvCompleted = completedJobs.reduce((acc, j) => acc + Number(j.v || 0), 0);
      const disputedJobs = jobs.filter(j => j.s === 'disputa');
      const activeJobs = jobs.filter(j => j.s !== 'calificado' && j.s !== 'disputa');

      // Cálculo de revenue neto Rebuske (7% estándar / 6% Oro)
      const platformRevenue = jobs.reduce((acc, j) => {
        const proObj = pros.find(p => p.id === j.pro);
        const rate = proObj && proObj.nv === 'Oro' ? 0.06 : 0.07;
        return acc + Math.round(Number(j.v || 0) * rate);
      }, 0);

      // Demanda por zona y categoría
      const demandByZone = {};
      const demandByCategory = {};
      jobs.forEach(j => {
        const z = j.z || 'Laureles';
        const c = j.c || 'Reparaciones';
        demandByZone[z] = (demandByZone[z] || 0) + 1;
        demandByCategory[c] = (demandByCategory[c] || 0) + 1;
      });

      return {
        generated_at: new Date().toISOString(),
        supabase_project: SUPABASE_URL,
        kpis: {
          total_jobs: jobs.length,
          active_jobs: activeJobs.length,
          completed_jobs: completedJobs.length,
          disputed_jobs: disputedJobs.length,
          dispute_rate_pct: jobs.length ? Number(((disputedJobs.length / jobs.length) * 100).toFixed(2)) : 0,
          gmv_total_cop: gmvTotal,
          gmv_completed_cop: gmvCompleted,
          estimated_platform_revenue_cop: platformRevenue,
          wallet_available_cop: Number((state.wal && state.wal.saldo) || 0),
          wallet_pending_escrow_cop: Number((state.wal && state.wal.pend) || 0),
          registered_pros: pros.length
        },
        breakdown: {
          by_zone: demandByZone,
          by_category: demandByCategory
        },
        marketing_segments: this.getMarketingSegments(),
        recent_automation_events: events.slice(-20),
        pending_sync_operations: SyncQueue.getQueue().length
      };
    },

    /**
     * Segmentación automática para campañas de Marketing, Retención ("REPITE") y Reactivación
     */
    getMarketingSegments() {
      const state = global.S || { jobs: [] };
      const jobs = Array.isArray(state.jobs) ? state.jobs : [];
      const pros = Array.isArray(global.PROS) ? global.PROS : [];

      return {
        repite_ready_clients: jobs
          .filter(j => j.s === 'calificado' && Number(j.n || 5) >= 4)
          .map(j => ({
            job_id: j.id,
            service: j.t,
            category: j.c,
            zone: j.z,
            pro_id: j.pro,
            campaign_hook: `¿Necesitas de nuevo ${j.t}? Repite con garantía de 2 días en 1 clic.`
          })),
        escrow_abandoned_checkout: jobs
          .filter(j => j.s === 'asignado')
          .map(j => ({
            job_id: j.id,
            service: j.t,
            amount_cop: j.v,
            campaign_hook: 'Tu profesional ya está asignado. Activa el Pago Protegido para iniciar la Ruta de Luz.'
          })),
        tier_upgrade_candidates: pros
          .filter(p => p.nv === 'Plata' && Number(p.r) >= 4.8)
          .map(p => ({
            pro_id: p.id,
            name: p.n,
            specialty: p.o,
            rating: p.r,
            jobs_done: p.t,
            campaign_hook: `¡Estás muy cerca del Nivel Oro en Rebuske! Baja tu comisión del 7% al 6%.`
          }))
      };
    },

    /**
     * Exporta el reporte financiero y operativo en formato CSV descargable
     */
    exportReportCSV() {
      const state = global.S || { jobs: [] };
      const jobs = Array.isArray(state.jobs) ? state.jobs : [];
      const headers = ['ID', 'Titulo', 'Categoria', 'Zona', 'Profesional', 'Estado', 'Valor_COP', 'Comision_Estimada_COP', 'Calificacion'];
      const rows = jobs.map(j => {
        const val = Number(j.v || 0);
        const fee = Math.round(val * 0.07);
        return [
          j.id,
          `"${String(j.t || '').replace(/"/g, '""')}"`,
          `"${String(j.c || '')}"`,
          `"${String(j.z || '')}"`,
          j.pro || 'Sin asignar',
          j.s || 'buscando',
          val,
          fee,
          j.n || ''
        ].join(',');
      });
      return [headers.join(','), ...rows].join('\n');
    }
  };

  // --------------------------------------------------------------------------
  // 6. INTERCEPTOR AUTOMÁTICO DE ACCIONES DE REBUSKE V4 (`window.A` y `sendMsg`)
  // --------------------------------------------------------------------------
  function hookRebuskeV4Actions() {
    if (!global.A || global.A.__supabaseHooked) return;

    const orig = { ...global.A };

    // 1. Publicar solicitud (Ruta de Luz + 3 cotizaciones comparables)
    if (typeof orig.publicar === 'function') {
      global.A.publicar = function (d, el) {
        const res = orig.publicar.call(this, d, el);
        const newestJob = global.S && global.S.jobs && global.S.jobs[0];
        if (newestJob) {
          JobsService.createJobWithQuotes(newestJob);
        }
        return res;
      };
    }

    // 2. Elegir propuesta comparable
    if (typeof orig.elegir === 'function') {
      global.A.elegir = function (d, el) {
        const res = orig.elegir.call(this, d, el);
        const targetJob = global.S && global.S.jobs && global.S.jobs.find(j => j.id === d.j);
        if (targetJob) {
          JobsService.selectQuote(targetJob, d.id, d.pr);
        }
        return res;
      };
    }

    // 3. Ajustar cantidad de servicios adicionales (Ajustes v5 en rebuske-app-v4)
    if (typeof orig.qty === 'function') {
      global.A.qty = function (d, el) {
        const res = orig.qty.call(this, d, el);
        const targetJob = global.S && global.S.jobs && global.S.jobs.find(j => j.id === d.id);
        if (targetJob) {
          JobsService.updateJobStatus(targetJob);
        }
        return res;
      };
    }

    // 4. Confirmar Pago Protegido (Escrow)
    if (typeof orig.pagar === 'function') {
      global.A.pagar = function (d, el) {
        const res = orig.pagar.call(this, d, el);
        setTimeout(() => {
          const targetJob = global.S && global.S.jobs && global.S.jobs.find(j => j.id === d.id);
          if (targetJob) {
            JobsService.updateJobStatus(targetJob);
            WalletsService.recordEscrowRetention(targetJob);
          }
        }, 1950);
        return res;
      };
    }

    // 5. Avanzar estado en Ruta de Luz (en_camino -> llego -> en_proceso -> finalizado)
    if (typeof orig.avanzar === 'function') {
      global.A.avanzar = function (d, el) {
        const res = orig.avanzar.call(this, d, el);
        const targetJob = global.S && global.S.jobs && global.S.jobs.find(j => j.id === d.id);
        if (targetJob) {
          JobsService.updateJobStatus(targetJob);
        }
        return res;
      };
    }

    // 6. Aprobar trabajo y liberar pago a la billetera del profesional
    if (typeof orig.liberar === 'function') {
      global.A.liberar = function (d, el) {
        const targetJob = global.S && global.S.jobs && global.S.jobs.find(j => j.id === d.id);
        const proObj = targetJob && typeof global.PR === 'function' ? global.PR(targetJob.pro) : { nv: 'Plata' };
        const res = orig.liberar.call(this, d, el);
        if (targetJob) {
          JobsService.updateJobStatus(targetJob);
          WalletsService.releasePaymentToWallet(targetJob, proObj.nv);
        }
        return res;
      };
    }

    // 7. Abrir ticket de disputa (Garantía de 2 días)
    if (typeof orig.disputa === 'function') {
      global.A.disputa = function (d, el) {
        const reasonInput = document.getElementById('dm');
        const reasonText = reasonInput ? reasonInput.value.trim() : '';
        const res = orig.disputa.call(this, d, el);
        const targetJob = global.S && global.S.jobs && global.S.jobs.find(j => j.id === d.id);
        if (targetJob) {
          JobsService.updateJobStatus(targetJob);
          DisputesService.openDispute(targetJob, reasonText || targetJob.disp);
        }
        return res;
      };
    }

    // 8. Calificar servicio completado
    if (typeof orig.calif === 'function') {
      global.A.calif = function (d, el) {
        const commentEl = document.getElementById('cm');
        const reviewText = commentEl ? commentEl.value.trim() : '';
        const res = orig.calif.call(this, d, el);
        setTimeout(() => {
          const targetJob = global.S && global.S.jobs && global.S.jobs.find(j => j.id === d.id);
          if (targetJob) {
            targetJob.review = reviewText;
            JobsService.updateJobStatus(targetJob, { review: reviewText || null });
            RebuskeAutomation.track('job_rated', {
              job_id: resolveUUID(targetJob.id),
              rating: targetJob.n || 5,
              review: reviewText
            });
          }
        }, 1950);
        return res;
      };
    }

    // 9. Botón REPITE (re-contratación en 1 clic)
    if (typeof orig.repite === 'function') {
      global.A.repite = function (d, el) {
        const targetJob = global.S && global.S.jobs && global.S.jobs.find(j => j.id === d.id);
        if (targetJob) {
          RebuskeAutomation.track('lead_repite', {
            source_job_id: resolveUUID(targetJob.id),
            pro_id: resolveUUID(targetJob.pro),
            category: targetJob.c,
            amount: targetJob.v
          });
        }
        return orig.repite.call(this, d, el);
      };
    }

    // 10. Profesional acepta solicitud disponible
    if (typeof orig.acep === 'function') {
      global.A.acep = function (d, el) {
        const res = orig.acep.call(this, d, el);
        const acceptedJob = global.S && global.S.jobs && global.S.jobs[0];
        if (acceptedJob) {
          JobsService.createJobWithQuotes(acceptedJob);
        }
        return res;
      };
    }

    // 11. Disponibilidad del profesional (Switch On/Off)
    if (typeof orig.on === 'function') {
      global.A.on = function (d, el) {
        const res = orig.on.call(this, d, el);
        if (global.S) {
          ProfessionalsService.updateAvailability('p1', global.S.on);
        }
        return res;
      };
    }

    // 12. Retiro de saldo de la billetera profesional
    if (typeof orig.retiro === 'function') {
      global.A.retiro = function (d, el) {
        const amountBefore = (global.S && global.S.wal) ? Number(global.S.wal.saldo || 0) : 0;
        const res = orig.retiro.call(this, d, el);
        WalletsService.processWithdrawal('p1', amountBefore);
        return res;
      };
    }

    // 13. Descarga de certificado de ingresos / reporte ejecutivo
    if (typeof orig.cert === 'function') {
      global.A.cert = function (d, el) {
        RebuskeAutomation.track('income_certificate_downloaded', { pro_id: resolveUUID('p1') });
        return orig.cert.call(this, d, el);
      };
    }

    global.A.__supabaseHooked = true;
  }

  // Interceptar sendMsg() para sincronizar chat y detector anti-fraude con public.chat_messages
  function hookSendMsg() {
    if (typeof global.sendMsg !== 'function' || global.sendMsg.__supabaseHooked) return;
    const origSendMsg = global.sendMsg;

    global.sendMsg = function (jobId, text) {
      if (jobId && text) {
        ChatService.sendMessage(jobId, 'cliente', text);
        setTimeout(() => {
          const targetJob = global.S && global.S.jobs && global.S.jobs.find(j => j.id === jobId);
          const lastMsg = targetJob && Array.isArray(targetJob.chat) ? targetJob.chat[targetJob.chat.length - 1] : null;
          if (lastMsg && lastMsg.f === 'p') {
            ChatService.sendMessage(jobId, 'pro', lastMsg.m);
          }
        }, 1500);
      }
      return origSendMsg.call(this, jobId, text);
    };
    global.sendMsg.__supabaseHooked = true;
  }

  // --------------------------------------------------------------------------
  // 7. INICIALIZACIÓN Y API PÚBLICA (`window.RebuskeSupabase`)
  // --------------------------------------------------------------------------
  const RebuskeSupabase = {
    config: {
      url: SUPABASE_URL,
      restUrl: SUPABASE_REST_URL,
      anonKey: SUPABASE_ANON_KEY
    },
    client: SupabaseRestClient,
    queue: SyncQueue,
    categories: CategoriesService,
    professionals: ProfessionalsService,
    jobs: JobsService,
    chat: ChatService,
    wallets: WalletsService,
    disputes: DisputesService,
    automation: RebuskeAutomation,

    async init() {
      hookRebuskeV4Actions();
      hookSendMsg();

      // Sincronizar catálogo inicial y vaciar cola pendiente en segundo plano
      const [catalog] = await Promise.allSettled([
        CategoriesService.fetchAll(),
        ProfessionalsService.fetchAll(),
        WalletsService.fetchWallet('p1'),
        SyncQueue.flush()
      ]);

      if (typeof global.render === 'function') {
        try {
          global.render();
        } catch (_) {}
      }

      RebuskeAutomation.track('app_synced', {
        categories_loaded: catalog.status === 'fulfilled' ? catalog.value.categories.length : 0
      });

      return true;
    }
  };

  global.RebuskeSupabase = RebuskeSupabase;
  global.RebuskeAutomation = RebuskeAutomation;

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => RebuskeSupabase.init());
    } else {
      RebuskeSupabase.init();
    }
    global.addEventListener('online', () => SyncQueue.flush());
  }
})(typeof window !== 'undefined' ? window : globalThis);
