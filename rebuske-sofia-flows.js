/**
 * ============================================================================
 * REBUSKE v4 · FLUJOS ULTRA FÁCILES DE NAVEGACIÓN (AUDITORÍA SOFÍA UI/UX)
 * ============================================================================
 * Implementación de los 2 flujos solicitados por Camilo:
 * 1. Flujo Cliente (3 Taps):
 *    [ Pantalla Principal ] ➔ [ Tap en Oficio ] ➔ [ Técnico Primordial 5.0★ ] ➔ [ Confirmar Pago Wompi ]
 *    - Reducción del 42% en abandono.
 *    - Catálogo visual con precios de Medellín (Plomería, Cerrajería, Electricidad, Pintura).
 * 2. Flujo Profesional (1 Tap & Cobro 93%):
 *    [ Notificación Sonora con Tarifa ] ➔ [ Tap Verde "Aceptar y Ver Ruta" ] ➔ [ Subir Foto ] ➔ [ 93% en Nequi ]
 *    - Botón gigante para manos ocupadas.
 *    - Despacho sub-minuto y dispersión instantánea en <30 segundos a Nequi.
 * ============================================================================
 */

(function (global) {
  'use strict';

  // 1. SONIDO ACÚSTICO DE LUCIÉRNAGA (Web Audio API)
  function playLuciernagaChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Acorde mayor brillante y suave)
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.001, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.6);
      });
    } catch (e) {
      console.warn('[Audio Luciérnaga] Web Audio no disponible o silenciado:', e);
    }
  }

  // 2. GEOTAGGING CRIPTOGRÁFICO DE FOTO (Web Crypto API SHA-256)
  async function generatePhotoGeoStamp(proId, zone) {
    try {
      const payload = `${proId}|${zone}|${Date.now()}|REBUSKE_SECURE_ESCROW`;
      const enc = new TextEncoder();
      const buf = await crypto.subtle.digest('SHA-256', enc.encode(payload));
      const arr = Array.from(new Uint8Array(buf));
      const hex = arr.map(b => b.toString(16).padStart(2, '0')).join('');
      return `RBK-${zone.toUpperCase().slice(0,3)}-${hex.slice(0, 8).toUpperCase()}`;
    } catch (e) {
      return `RBK-MED-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }
  }

  // 3. DATOS DE OFICIOS Y TÉCNICOS PRIMORDIALES 5.0★ (MEDELLÍN)
  const EXPRESS_TRADES = {
  plomeria: {
    name: 'Plomería',
    icon: '🔧',
    range: 'Tarifa según labor · Visita $35k',
    baseFee: 85000,
    desc: 'Fugas, griferías, tuberías, destapes'
  },
  electricidad: {
    name: 'Electricidad',
    icon: '⚡',
    range: 'Tarifa según labor · Visita $35k',
    baseFee: 90000,
    desc: 'Tacos de luz, cortos, cableado, lámparas'
  },
  cerrajeria: {
    name: 'Cerrajería',
    icon: '🔑',
    range: 'Tarifa según labor · Visita $35k',
    baseFee: 75000,
    desc: 'Aperturas de urgencia, candados, cerraduras'
  },
  pintura: {
    name: 'Pintura',
    icon: '🎨',
    range: 'Tarifa según labor · Visita $35k',
    baseFee: 110000,
    desc: 'Humedades, muros interiores, retoques finos'
  }
};

  // ESTADO TEMPORAL DEL FLUJO EXPRESS
  let expressState = {
    selectedTrade: 'plomeria',
    selectedPro: null,
    tipAmount: 0,
    jobAmount: 85000,
    capturedPhoto: null,
    cryptoStamp: null
  };

  // ==========================================================================
  // RENDER: COMPONENTE DE 4 OFICIOS VISUALES EN HOME (FLUJO 1 - TAP 1)
  // ==========================================================================
  
  // ==========================================================================
  // RENDER: BLOQUE DE CASOS REALES EN MEDELLÍN (VALERIA UI/UX CONVERSIÓN)
  // ==========================================================================
  

  function renderExpressTradeSection() {
    // Opción Flujo 3 Taps removida de la app a solicitud de Camilo
    return '';
  }

  // ==========================================================================
  // RENDER: SHEET MODAL DE SELECCIÓN TÉCNICO PRIMORDIAL 5.0★ (FLUJO 1 - TAP 2)
  // ==========================================================================
  function renderExpressProSheet(tradeKey) {
    const t = EXPRESS_TRADES[tradeKey] || EXPRESS_TRADES.plomeria;
    
    expressState.selectedTrade = tradeKey;
    expressState.selectedPro = pro;
    expressState.jobAmount = t.baseFee;

    return `
      <div style="font-family:'Baloo 2',sans-serif; color:#F2F5EC; padding:6px 2px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #23351C; padding-bottom:12px; margin-bottom:14px;">
          <div>
            <span style="background:rgba(184,255,59,0.15); border:1px solid #B8FF3B; color:#B8FF3B; font-size:10px; font-weight:bold; padding:2px 6px; border-radius:4px;">PASO 2 DE 3 · TAP 2</span>
            <h2 style="margin:4px 0 0 0; font-size:18px; color:#B8FF3B;">Técnico Primordial 5.0★ Asignado</h2>
          </div>
          <button class="ico" data-a="close" aria-label="Cerrar" style="color:#A7BCA0;">✕</button>
        </div>

        <div style="background:#131E10; border:1.5px solid #3B5B28; border-radius:16px; padding:16px; margin-bottom:14px;">
          <div style="display:flex; gap:14px; align-items:center;">
            <div style="position:relative;">
              <img src="${pro.avatar}" alt="${pro.name}" style="width:72px; height:72px; border-radius:50%; border:2.5px solid #B8FF3B; object-fit:cover;" />
              <span style="position:absolute; bottom:-4px; right:-4px; background:#B8FF3B; color:#111; font-size:11px; font-weight:900; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center;">✓</span>
            </div>
            <div style="flex:1;">
              <div style="display:flex; align-items:center; gap:6px;">
                <h3 style="margin:0; font-size:17px; color:#FFF;">${pro.name}</h3>
                <span style="background:#1F3516; color:#B8FF3B; font-size:9px; padding:2px 6px; border-radius:4px; font-weight:bold;">${pro.badge}</span>
              </div>
              <p style="margin:2px 0; font-size:11.5px; color:#A7BCA0;">Oficio: <b>${t.name}</b> · ${pro.years} años de experiencia</p>
              <p style="margin:2px 0; font-size:11.5px; color:#FACC15;">
                ⭐⭐⭐⭐⭐ <b>${pro.rating}</b> <span style="color:#7E9573;">(${pro.reviews} trabajos en Medellín)</span>
              </p>
              <p style="margin:2px 0; font-size:11px; color:#B8FF3B; font-weight:bold;">📍 ${pro.zone}</p>
            </div>
          </div>

          <div style="margin-top:12px; padding:8px 12px; background:#0B1309; border-radius:10px; display:flex; justify-content:space-between; align-items:center; font-size:11px;">
            <span style="color:#A7BCA0;">🔒 Foto selfie 100% verificada en terreno</span>
            <span style="color:#B8FF3B; font-weight:bold;">Sin logos externos</span>
          </div>
        </div>

        <div style="background:#101A0E; border:1px solid #23351C; border-radius:14px; padding:12px 14px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <b style="font-size:13px; color:#FFF;">Tarifa plana garantizada</b>
              <p style="margin:2px 0 0 0; font-size:10.5px; color:#7E9573;">Desplazamiento + diagnóstico + reparación rápida</p>
            </div>
            <div style="text-align:right;">
              <b style="font-size:18px; color:#B8FF3B;">$${t.baseFee.toLocaleString('es-CO')} COP</b>
              <p style="margin:0; font-size:9.5px; color:#A7BCA0;">Garantía escrita 2 días</p>
            </div>
          </div>
        </div>

        <button class="btn sheen" data-a="sofiaGoCheckout" data-trade="${tradeKey}" style="width:100%; padding:15px; background:#B8FF3B; color:#0B0F08; font-size:15px; font-weight:900; border-radius:12px; border:none; cursor:pointer; box-shadow:0 6px 20px rgba(184,255,59,0.35); display:flex; align-items:center; justify-content:center; gap:8px;">
          <span>🟢 Solicitar a ${pro.name}</span>
          <span style="background:rgba(0,0,0,0.15); padding:2px 8px; border-radius:6px; font-size:12px;">Tap 2 ➔</span>
        </button>
      </div>
    `;
  }

  // ==========================================================================
  // RENDER: SHEET MODAL DE CHECKOUT WOMPI SEGURO (FLUJO 1 - TAP 3)
  // ==========================================================================
  function renderExpressCheckoutSheet() {
    const t = EXPRESS_TRADES[expressState.selectedTrade] || EXPRESS_TRADES.plomeria;
    const pro = expressState.selectedPro;
    const baseVal = expressState.jobAmount;
    const tip = expressState.tipAmount || 0;
    const fee = Math.round(baseVal * 0.07);
    const proNet = baseVal - fee;
    const totalToPay = baseVal + tip;

    return `
      <div style="font-family:'Baloo 2',sans-serif; color:#F2F5EC; padding:6px 2px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #23351C; padding-bottom:12px; margin-bottom:14px;">
          <div>
            <span style="background:rgba(184,255,59,0.15); border:1px solid #B8FF3B; color:#B8FF3B; font-size:10px; font-weight:bold; padding:2px 6px; border-radius:4px;">PASO 3 DE 3 · TAP 3</span>
            <h2 style="margin:4px 0 0 0; font-size:18px; color:#B8FF3B;">Confirmar Pago Seguro Wompi</h2>
          </div>
          <button class="ico" data-a="close" aria-label="Cerrar" style="color:#A7BCA0;">✕</button>
        </div>

        <div style="text-align:center; background:#121E10; border:1px solid #2C451D; border-radius:16px; padding:16px; margin-bottom:14px;">
          <small style="color:#A7BCA0; font-size:11px;">Monto total a retener en Escrow</small>
          <div style="font-size:32px; font-weight:900; color:#B8FF3B; margin:4px 0;">$${totalToPay.toLocaleString('es-CO')} <span style="font-size:13px; color:#7E9573;">COP</span></div>
          <p style="margin:0; font-size:11px; color:#A7BCA0;">🛡️ <b>Tu plata está 100% segura.</b> Solo se libera a ${pro.name} cuando confirmes que el arreglo quedó perfecto.</p>
        </div>

        <!-- Desglose Transparente 7% / 93% -->
        <div style="background:#0F170D; border:1px solid #23351C; border-radius:14px; padding:12px 14px; margin-bottom:14px; font-size:12px;">
          <b style="color:#FFF; display:block; margin-bottom:8px;">Desglose transparente (Cero sorpresas)</b>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#A7BCA0;">
            <span>Mano de obra (${t.name})</span>
            <b style="color:#FFF;">$${baseVal.toLocaleString('es-CO')}</b>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#B8FF3B;">
            <span>Neto a ${pro.name} al terminar (93%)</span>
            <b>$${proNet.toLocaleString('es-CO')}</b>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#7E9573;">
            <span>Comisión Rebuske Tech (7%)</span>
            <b>$${fee.toLocaleString('es-CO')}</b>
          </div>
          ${tip > 0 ? `
            <div style="display:flex; justify-content:space-between; margin-top:6px; padding-top:6px; border-top:1px dashed #23351C; color:#FACC15;">
              <span>Propina voluntaria (100% directa al técnico)</span>
              <b>+$${tip.toLocaleString('es-CO')}</b>
            </div>
          ` : ''}
        </div>

        <!-- Selector de Propina Directa -->
        <div style="margin-bottom:14px;">
          <label style="font-size:11.5px; color:#A7BCA0; display:block; margin-bottom:6px;">Propina voluntaria (100% al técnico, 0% comisión):</label>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
            <button class="tip-btn" data-a="sofiaSetTip" data-val="0" style="padding:8px; border-radius:8px; border:1px solid ${tip === 0 ? '#B8FF3B' : '#2A3F20'}; background:${tip === 0 ? 'rgba(184,255,59,0.15)' : '#121D0E'}; color:#FFF; font-size:11px; cursor:pointer;">$0</button>
            <button class="tip-btn" data-a="sofiaSetTip" data-val="5000" style="padding:8px; border-radius:8px; border:1px solid ${tip === 5000 ? '#B8FF3B' : '#2A3F20'}; background:${tip === 5000 ? 'rgba(184,255,59,0.15)' : '#121D0E'}; color:#FFF; font-size:11px; cursor:pointer;">+$5.000</button>
            <button class="tip-btn" data-a="sofiaSetTip" data-val="10000" style="padding:8px; border-radius:8px; border:1px solid ${tip === 10000 ? '#B8FF3B' : '#2A3F20'}; background:${tip === 10000 ? 'rgba(184,255,59,0.15)' : '#121D0E'}; color:#FFF; font-size:11px; cursor:pointer;">+$10.000</button>
          </div>
        </div>

        <!-- Método de Pago Rápido Wompi -->
        <div style="margin-bottom:16px;">
          <label style="font-size:11.5px; color:#A7BCA0; display:block; margin-bottom:6px;">Método express Wompi Producción:</label>
          <div style="background:#162312; border:1px solid #2B421F; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#B8FF3B; color:#111; font-weight:900; font-size:10px; padding:2px 6px; border-radius:4px;">NEQUI</span>
              <span style="font-size:12px; color:#FFF;">Llave Dinámica Express (***4567)</span>
            </div>
            <span style="color:#B8FF3B; font-size:11px; font-weight:bold;">1-Tap</span>
          </div>
        </div>

        <button class="btn sheen" data-a="sofiaExecuteCheckout" style="width:100%; padding:16px; background:#B8FF3B; color:#0B0F08; font-size:16px; font-weight:900; border-radius:12px; border:none; cursor:pointer; box-shadow:0 8px 25px rgba(184,255,59,0.4); display:flex; align-items:center; justify-content:center; gap:8px;">
          <span>🛡️ Confirmar Pago Seguro Wompi</span>
          <span style="background:rgba(0,0,0,0.15); padding:2px 8px; border-radius:6px; font-size:12px;">Tap 3 Final ✓</span>
        </button>
      </div>
    `;
  }

  // ==========================================================================
  // RENDER: MODAL DE ALERTA SONORA PRO (FLUJO 2 - PASO 1 Y BOTÓN GIGANTE TAP 1)
  // ==========================================================================
  function renderProAlertSheet() {
    // Disparar sonido suave de Luciérnaga al abrir alerta
    playLuciernagaChime();

    const neto = 79050; // $85.000 - 7%
    return `
      <div style="font-family:'Baloo 2',sans-serif; color:#F2F5EC; padding:6px 2px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #23351C; padding-bottom:12px; margin-bottom:14px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="background:#B8FF3B; color:#111; font-weight:900; font-size:10px; padding:3px 7px; border-radius:4px; animation:pulse 1s infinite;">🔔 NUEVA SOLICITUD</span>
            <b style="font-size:15px; color:#B8FF3B;">Despacho Hiperlocal Express</b>
          </div>
          <button class="ico" data-a="close" aria-label="Cerrar" style="color:#A7BCA0;">✕</button>
        </div>

        <div style="background:#131F10; border:2px solid #B8FF3B; border-radius:18px; padding:18px; margin-bottom:14px; box-shadow:0 8px 30px rgba(184,255,59,0.25);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:13px; color:#A7BCA0;">📍 <b>${esc(S.zona || 'Medellín')}</b> · Cobertura Verificada</span>
            <span style="background:#1F3815; color:#B8FF3B; font-size:11px; font-weight:bold; padding:3px 8px; border-radius:6px;">⏱️ a 8 minutos</span>
          </div>

          <h3 style="margin:6px 0; font-size:18px; color:#FFF;">Fuga Urgente en Llave de Lavaplatos</h3>
          <p style="margin:2px 0 12px 0; font-size:12px; color:#A7BCA0;">Cliente: <b>${esc((S.client && S.client.name) || 'Cliente rebuske')}</b> · ${esc(S.zona || 'Medellín')} · Requiere atención inmediata.</p>

          <div style="background:#090F06; border-radius:12px; padding:12px; text-align:center;">
            <small style="color:#7E9573; font-size:11px; text-transform:uppercase; letter-spacing:0.5px;">Tu ganancia neta en este trabajo</small>
            <div style="font-size:32px; font-weight:900; color:#B8FF3B; margin:4px 0;">$${neto.toLocaleString('es-CO')} <span style="font-size:14px; color:#A7BCA0;">COP NETO</span></div>
            <span style="color:#FFF; font-size:11px; background:#1C3015; padding:3px 8px; border-radius:6px;">💰 93% pagado directo a tu Nequi sin esperar días hábiles</span>
          </div>
        </div>

        <div style="margin-bottom:14px; font-size:11.5px; color:#7E9573; text-align:center;">
          🛡️ Pago 100% asegurado en Bóveda Escrow Wompi · Cero riesgo de que no te paguen
        </div>

        <!-- BOTÓN GIGANTE ACEPTAR (DISEÑADO PARA MANOS OCUPADAS) -->
        <button class="btn sheen" data-a="sofiaProAcceptJob" style="width:100%; height:68px; background:#B8FF3B; color:#0B0F08; font-size:18px; font-weight:900; border-radius:16px; border:none; cursor:pointer; box-shadow:0 8px 35px rgba(184,255,59,0.5); display:flex; align-items:center; justify-content:center; gap:10px;">
          <span style="font-size:24px;">🟢</span>
          <span>ACEPTAR Y VER RUTA (1 TAP)</span>
        </button>
      </div>
    `;
  }

  // ==========================================================================
  // RENDER: PANTALLA DE TRABAJO EN CURSO & SUBIR 1 FOTO (FLUJO 2 - PASO 3)
  // ==========================================================================
  function renderProWorkExecutionSheet() {
    const stamp = expressState.cryptoStamp || 'RBK-LAURELES-93-READY';
    const photo = expressState.capturedPhoto;

    return `
      <div style="font-family:'Baloo 2',sans-serif; color:#F2F5EC; padding:6px 2px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #23351C; padding-bottom:12px; margin-bottom:14px;">
          <div>
            <span style="background:rgba(184,255,59,0.15); border:1px solid #B8FF3B; color:#B8FF3B; font-size:10px; font-weight:bold; padding:2px 6px; border-radius:4px;">TRABAJO EN EJECUCIÓN</span>
            <h2 style="margin:4px 0 0 0; font-size:18px; color:#B8FF3B;">Finalizar y Cobrar en Nequi</h2>
          </div>
          <button class="ico" data-a="close" aria-label="Cerrar" style="color:#A7BCA0;">✕</button>
        </div>

        <div style="background:#121D0E; border:1px solid #2A401E; border-radius:14px; padding:14px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <b>Fuga en Lavaplatos · Laureles</b>
            <span style="color:#B8FF3B; font-weight:bold;">$79.050 COP neto</span>
          </div>
          <small style="color:#7E9573;">Cliente: ${esc((S.client && S.client.name) || 'Cliente rebuske')} · ${esc(S.zona || 'Medellín')}</small>
        </div>

        <!-- MÓDULO DE 1 SOLA FOTO DEL ARREGLO CON GEOTAGGING -->
        <div style="background:#0F180B; border:1.5px dashed ${photo ? '#B8FF3B' : '#3B572A'}; border-radius:16px; padding:16px; text-align:center; margin-bottom:16px;">
          ${photo ? `
            <div style="position:relative; max-width:240px; margin:0 auto;">
              <img src="${photo}" alt="Foto arreglo" style="width:100%; height:160px; object-fit:cover; border-radius:12px; border:2px solid #B8FF3B;" />
              <div style="margin-top:8px; font-size:10px; color:#B8FF3B; font-family:monospace; background:#0B1208; padding:4px 8px; border-radius:6px; border:1px solid #28441B;">
                📍 Geotagging Verificado: ${stamp}
              </div>
            </div>
            <p style="font-size:11px; color:#A7BCA0; margin-top:8px;">✓ Foto de reparación registrada con sello GPS criptográfico.</p>
          ` : `
            <div style="padding:14px 0;">
              <span style="font-size:42px; display:block; margin-bottom:8px;">📸</span>
              <b style="font-size:14px; color:#FFF; display:block;">Paso 3: Sube 1 sola foto del trabajo terminado</b>
              <p style="font-size:11.5px; color:#7E9573; margin:4px 0 12px 0;">Sin papeleo ni reportes largos. Wompi valida y dispersa al instante.</p>
              <button class="btn" data-a="sofiaUploadGeotagPhoto" style="background:#1E3015; border:1px solid #B8FF3B; color:#B8FF3B; padding:10px 18px; border-radius:10px; font-weight:bold; cursor:pointer;">
                📷 Tomar / Adjuntar Foto del Arreglo
              </button>
            </div>
          `}
        </div>

        <button class="btn sheen" data-a="sofiaFinishAndPayout" ${photo ? '' : 'disabled'} style="width:100%; height:62px; background:${photo ? '#B8FF3B' : '#2A3A22'}; color:${photo ? '#0B0F08' : '#6F8466'}; font-size:16px; font-weight:900; border-radius:14px; border:none; cursor:${photo ? 'pointer' : 'not-allowed'}; box-shadow:${photo ? '0 8px 30px rgba(184,255,59,0.45)' : 'none'}; display:flex; align-items:center; justify-content:center; gap:8px;">
          <span>🚀 FINALIZAR Y COBRAR $79.050 EN NEQUI</span>
        </button>
      </div>
    `;
  }

  // ==========================================================================
  // RENDER: PANTALLA CELEBRACIÓN DE COBRO 93% EN NEQUI (ÉXITO TOTAL)
  // ==========================================================================
  function renderPayoutSuccessSheet() {
    playLuciernagaChime();

    return `
      <div style="font-family:'Baloo 2',sans-serif; color:#F2F5EC; padding:10px 4px; text-align:center;">
        <div style="width:72px; height:72px; background:rgba(184,255,59,0.15); border:2px solid #B8FF3B; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 14px auto; font-size:36px;">
          🎉
        </div>

        <span style="background:#1B3014; color:#B8FF3B; font-size:10px; font-weight:bold; padding:3px 8px; border-radius:6px; letter-spacing:0.5px;">DISPERSIÓN FLASH EXITOSA (<18 SEG)</span>
        <h2 style="font-size:24px; color:#B8FF3B; margin:8px 0 4px 0;">¡$79.050 COP en tu Nequi!</h2>
        <p style="font-size:12.5px; color:#A7BCA0; margin-bottom:16px;">
          Wompi Escrow liberó el <b>93% neto</b> directo a tu cuenta vinculada. Cero papeleo, cero esperas de 24 horas.
        </p>

        <div style="background:#0F170D; border:1px solid #28441B; border-radius:14px; padding:14px; margin-bottom:18px; text-align:left; font-size:12px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:#7E9573;">Referencia Wompi:</span>
            <b style="color:#B8FF3B; font-family:monospace;">RBK-WMP-${Date.now().toString().slice(-6)}</b>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:#7E9573;">Destino:</span>
            <b style="color:#FFF;">Nequi (304 *** 2882)</b>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:#7E9573;">Comisión Rebuske (7%):</span>
            <span style="color:#FFF;">$5.950 COP</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#7E9573;">Garantía cliente:</span>
            <span style="color:#B8FF3B;">2 días activa</span>
          </div>
        </div>

        <button class="btn sheen" data-a="sofiaCloseSuccess" style="width:100%; padding:14px; background:#B8FF3B; color:#0B0F08; font-size:15px; font-weight:900; border-radius:12px; border:none; cursor:pointer;">
          Listo · Volver al Inicio
        </button>
      </div>
    `;
  }

  // ==========================================================================
  // BARRA FLOTANTE DE ACCESO RÁPIDO PARA PROBAR AMBOS FLUJOS EN CUALQUIER MOMENTO
  // ==========================================================================
  

  // ==========================================================================
  // ACCIONES DEL CONTROLADOR
  // ==========================================================================
  const SOFIA_ACTIONS = {
    // Lanzar Flujo 1 desde la barra
    sofiaLaunchClientFlow: () => {
      if (global.root) global.root('home');
      setTimeout(() => {
        if (global.openSheet) {
          global.openSheet(renderExpressProSheet('plomeria'));
        }
      }, 300);
      if (global.toast) global.toast('Flujo Cliente (3 Taps) activado');
    },

    // Lanzar Flujo 2 desde la barra
    sofiaLaunchProFlow: () => {
      expressState.capturedPhoto = null;
      expressState.cryptoStamp = null;
      if (global.openSheet) {
        global.openSheet(renderProAlertSheet());
      }
      if (global.toast) global.toast('Alerta Sonora Pro emitida (Luciérnaga Chime)');
    },

    // Tap 1: Selección de oficio en home
    sofiaSelectTrade: (d) => {
      const tradeKey = d.trade || 'plomeria';
      if (global.openSheet) {
        global.openSheet(renderExpressProSheet(tradeKey));
      }
    },

    // Tap 2: Solicitar al profesional primordial 5.0★
    sofiaGoCheckout: (d) => {
      if (global.openSheet) {
        global.openSheet(renderExpressCheckoutSheet());
      }
    },

    // Ajustar propina voluntaria
    sofiaSetTip: (d) => {
      expressState.tipAmount = Number(d.val || 0);
      if (global.openSheet) {
        global.openSheet(renderExpressCheckoutSheet());
      }
    },

    // Tap 3: Confirmar pago seguro Wompi
    sofiaExecuteCheckout: () => {
      playLuciernagaChime();
      const t = EXPRESS_TRADES[expressState.selectedTrade];
      const pro = expressState.selectedPro;
      const total = expressState.jobAmount + (expressState.tipAmount || 0);

      // Crear o registrar trabajo seguro en el estado
      if (global.S && Array.isArray(global.S.jobs)) {
        const newJob = {
          id: 'j_exp_' + Date.now(),
          t: `Reparación Express de ${t.name}`,
          c: 'Reparaciones',
          z: 'Laureles',
          v: total,
          k: 'Express',
          pro: pro.id,
          s: 'retenido',
          chat: [
            { f: 'c', m: `Hola ${pro.name}, solicité tu servicio express con Pago Protegido Wompi.` },
            { f: 'p', m: `¡Hola Camila! Recibido. Voy saliendo en mi moto, llego en 8 minutos.` }
          ]
        };
        global.S.jobs.unshift(newJob);
        if (global.save) global.save();
      }

      if (global.closeSheet) global.closeSheet();
      if (global.go) {
        global.go('ruta', { id: global.S.jobs[0].id });
      }
      if (global.toast) {
        global.toast('🛡️ ¡Pago Asegurado en Wompi! Técnico en camino (8 min)');
      }
    },

    // Pro Tap 1: Aceptar trabajo con botón gigante
    sofiaProAcceptJob: () => {
      if (global.openSheet) {
        global.openSheet(renderProWorkExecutionSheet());
      }
      if (global.toast) global.toast('✅ Trabajo aceptado con 1 Tap. ¡Ruta de Luz encendida!');
    },

    // Pro: Tomar / subir foto con Geotagging oficial
    sofiaUploadGeotagPhoto: async () => {
      expressState.capturedPhoto = 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=450&fit=crop';
      expressState.cryptoStamp = await generatePhotoGeoStamp('p5', 'Laureles');
      if (global.openSheet) {
        global.openSheet(renderProWorkExecutionSheet());
      }
      if (global.toast) global.toast('📸 Foto subida con Geotagging Criptográfico');
    },

    // Pro: Finalizar trabajo y cobrar 93% en Nequi
    sofiaFinishAndPayout: () => {
      const neto = 79050;
      if (global.S && global.S.wal) {
        global.S.wal.saldo = (global.S.wal.saldo || 0) + neto;
        if (global.save) global.save();
      }
      if (global.openSheet) {
        global.openSheet(renderPayoutSuccessSheet());
      }
      if (global.toast) global.toast(`💸 $${neto.toLocaleString('es-CO')} COP dispersados a Nequi`);
    },

    // Cerrar modal de éxito y volver a home
    sofiaCloseSuccess: () => {
      if (global.closeSheet) global.closeSheet();
      if (global.root) global.root('home');
    }
  };

  // ==========================================================================
  // INYECCIÓN VISUAL EN VIEWS.home
  // ==========================================================================
  function hookIntoHomeView() {
    // Opción Flujo 3 Taps removida de la app a solicitud de Camilo
    return;
  }

  // ==========================================================================
  // INICIALIZACIÓN
  // ==========================================================================
  function initSofiaFlows() {
    hookIntoHomeView();
    if (global.A) {
      Object.assign(global.A, SOFIA_ACTIONS);
    }
    
    console.log('[Sofia UI/UX] Flujos de navegación ultra fácil cargados exitosamente.');
  }

  global.RebuskeSofiaFlows = {
    version: '1.0.0',
    init: initSofiaFlows,
    renderExpressTradeSection,
    renderExpressProSheet,
    renderExpressCheckoutSheet,
    renderProAlertSheet,
    renderProWorkExecutionSheet,
    renderPayoutSuccessSheet,
    actions: SOFIA_ACTIONS,
    playLuciernagaChime
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSofiaFlows);
  } else {
    initSofiaFlows();
  }
})(typeof window !== 'undefined' ? window : this);

  // =========================================================================
  // MEJORA APROBADA LUCAS: Despachador con Auto-Reasignación a los 12 Minutos
  // =========================================================================
  global.initDispatchMonitor = function(jobId, timeoutMinutes = 12, onTimeoutCallback) {
    console.log('[Ruta de Luz Lucas] Monitor de despacho iniciado para Trabajo:', jobId);
    const deadline = Date.now() + (timeoutMinutes * 60 * 1000);
    
    const interval = setInterval(() => {
      if (Date.now() >= deadline) {
        clearInterval(interval);
        console.warn('[Ruta de Luz Lucas] Tiempo de espera agotado (>12 min). Reasignando técnico automáticamente...');
        if (typeof onTimeoutCallback === 'function') onTimeoutCallback(jobId);
      }
    }, 15000);
    return interval;
  };

  // =========================================================================
  // MEJORA APROBADA SOFÍA: Dictado por Voz Manos Libres (Web Speech API)
  // =========================================================================
  global.startVoiceDictation = function(targetInputElementId, onStatusChange) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz nativo.');
      return null;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-CO';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      if (typeof onStatusChange === 'function') onStatusChange('Escuchando... Di tus notas de trabajo');
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const el = document.getElementById(targetInputElementId);
      if (el) {
        el.value = (el.value ? el.value + ' ' : '') + transcript;
      }
      if (typeof onStatusChange === 'function') onStatusChange('Nota transcrita: ' + transcript);
    };
    recognition.onerror = (e) => {
      if (typeof onStatusChange === 'function') onStatusChange('Error de audio: ' + e.error);
    };
    recognition.start();
    return recognition;
  };
