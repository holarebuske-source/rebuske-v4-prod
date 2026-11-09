import { SVG_ICONS } from './service_icons.mjs';
import { CATEGORIES_DATA } from './categories_data_unrounded.mjs';

// ============================================================================
// 1. GENERADOR DE LAS 4 PANTALLAS DE TELÉFONO IDÉNTICAS A LA APP (CERO EMOJIS)
// ============================================================================
export function generatePhoneScreensHTML() {
  return `
  <!-- ==========================================================================
       SHOWCASE DE TELÉFONOS EN VIVO · PANTALLAS IDÉNTICAS A LA APP REAL
       ========================================================================== -->
  <section class="section-wrap phones-showcase-section" id="experiencia-app">
    <div class="sec-header reveal-cascade" style="text-align: center; max-width: 820px; margin: 0 auto 36px;">
      <span class="badge-pill" style="margin-bottom: 12px;">
        ${SVG_ICONS.radar} Tecnología Móvil en Vivo
      </span>
      <h2 class="sec-title" style="font-size: clamp(26px, 4vw, 38px); line-height: 1.15; margin-bottom: 14px;">
        Así Funciona la App en la Pantalla de tu Celular
      </h2>
      <p class="sec-desc" style="font-size: 16px; color: var(--mut); line-height: 1.6;">
        Transparencia algorítmica, despacho hiperlocal en el Valle de Aburrá, bóveda bancaria escrow y credenciales con código QR antes de abrir la puerta de tu hogar.
      </p>
    </div>

    <div class="phones-grid">

      <!-- ================= TELÉFONO 1: PANTALLA PRINCIPAL & RADAR ================= -->
      <div class="phone-card-wrap reveal-cascade stagger-1">
        <div class="phone-mockup">
          <div class="phone-screen">
            <!-- Barra de Estado -->
            <div class="phone-status-bar">
              <span>9:41</span>
              <div class="phone-island">
                <span class="phone-island-cam"></span>
                <span class="phone-island-sensor"></span>
              </div>
              <div class="phone-status-icons">
                <span>5G</span>
                <div class="phone-battery"><div class="phone-battery-level"></div></div>
              </div>
            </div>

            <!-- Pantalla 1: Home & Radar Real de la App -->
            <div class="phone-content phone-content-app-home">
              <!-- Header Real App -->
              <div class="app-real-hd">
                <div class="app-lz-icon">
                  <svg width="22" height="22" viewBox="0 0 390 372" fill="#B8FF3B" aria-hidden="true">
                    <path fill-rule="evenodd" d="M198.12 328.12 L195.62 328.88 L194.75 329.38 L193.88 330.50 L193.62 331.25 L193.50 350.88 L194.12 352.50 L195.25 353.62 L198.38 354.62 L200.00 354.62 L202.25 353.75 L203.50 352.50 L204.00 351.38 L204.12 332.12 L203.50 330.25 L202.25 328.88 L200.50 328.12 Z"/>
                  </svg>
                </div>
                <div class="app-hd-text">
                  <span class="app-hd-greet">Hola</span>
                  <span class="app-hd-loc">El Poblado, Valle de Aburrá</span>
                </div>
                <div class="app-bell-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/></svg>
                  <span class="app-bell-dot"></span>
                </div>
              </div>

              <!-- Search Bar Real App -->
              <div class="app-real-search">
                ${SVG_ICONS.search}
                <span>¿Qué necesitas resolver hoy?</span>
              </div>

              <!-- Express Urgencia SOS Real App -->
              <div class="app-real-sos-banner">
                <div class="sos-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>
                </div>
                <div class="sos-text">
                  <strong>Servicio Express Prioritario</strong>
                  <small>Urgencias eléctricas y plomería (&lt;35-45 min)</small>
                </div>
                <span class="sos-pill">SOS</span>
              </div>

              <!-- Radar Map In-Progress Real App -->
              <div class="app-real-radar-box">
                <div class="radar-live-hud">
                  <span class="radar-pulse-dot"></span>
                  <span class="radar-status-txt">Técnico en ruta: Carlos M.</span>
                  <span class="radar-eta-txt">22 min</span>
                </div>
                <div class="radar-track-route">
                  <span class="track-node start">El Poblado</span>
                  <span class="track-line"></span>
                  <span class="track-node moto-node">${SVG_ICONS.moto}</span>
                  <span class="track-line"></span>
                  <span class="track-node end">Tu Hogar</span>
                </div>
                <div class="radar-eta-detail">Distancia: 2.8 km · Tarifa: $62.840 COP</div>
              </div>

              <!-- Bottom Nav Bar Real App -->
              <div class="app-real-bot-nav">
                <div class="bot-nav-item active">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z"/></svg>
                  <span>Explorar</span>
                </div>
                <div class="bot-nav-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="6" width="16" height="14" rx="2"/></svg>
                  <span>Pedidos</span>
                </div>
                <div class="bot-nav-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H9l-5 4z"/></svg>
                  <span>Mensajes</span>
                </div>
                <div class="bot-nav-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="14" rx="2"/></svg>
                  <span>Billetera</span>
                </div>
              </div>
            </div>

            <!-- Home indicator -->
            <div class="phone-home-indicator"></div>
          </div>
        </div>

        <!-- Tarjeta de Referencia 01 -->
        <div class="phone-reference-card">
          <div class="ref-tag">REFERENCIA OPERATIVA 01</div>
          <h3 class="ref-title">Radar Hiperlocal de Despacho Inmediato (&lt;45 min)</h3>
          <p class="ref-desc">
            Asignación inteligente por cuadrantes en el Valle de Aburrá (Medellín, Envigado, Itagüí, Sabaneta, Bello). El técnico más cercano en motocicleta recibe el requerimiento con trazabilidad GPS en tiempo real.
          </p>
          <div class="ref-meta">
            <span>${SVG_ICONS.clock} Tiempo promedio auditado: <strong>34 minutos</strong></span>
            <span>${SVG_ICONS.mapPin} Cobertura: <strong>100% comunas y municipios del Valle</strong></span>
          </div>
        </div>
      </div>

      <!-- ================= TELÉFONO 2: BÓVEDA WOMPI ESCROW ================= -->
      <div class="phone-card-wrap reveal-cascade stagger-2">
        <div class="phone-mockup">
          <div class="phone-screen">
            <!-- Barra de Estado -->
            <div class="phone-status-bar">
              <span>9:41</span>
              <div class="phone-island">
                <span class="phone-island-cam"></span>
                <span class="phone-island-sensor"></span>
              </div>
              <div class="phone-status-icons">
                <span>5G</span>
                <div class="phone-battery"><div class="phone-battery-level"></div></div>
              </div>
            </div>

            <!-- Pantalla 2: Bóveda Wompi Escrow Real App -->
            <div class="phone-content phone-content-app-wompi">
              <div class="app-real-hd">
                <div class="app-back-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg>
                </div>
                <div class="app-hd-text" style="text-align:center;">
                  <span class="app-hd-greet">Bóveda Wompi</span>
                  <span class="app-hd-loc" style="color:#B8FF3B;">Bancolombia Escrow</span>
                </div>
                <div style="width:20px;"></div>
              </div>

              <!-- Vault Shield Graphic -->
              <div class="wompi-vault-box">
                <div class="vault-shield-glow">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#B8FF3B" stroke-width="2"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <div class="vault-real-amount">$142.680 <small>COP</small></div>
                <span class="vault-locked-pill">Fondos Congelados en Custodia</span>
              </div>

              <!-- Desglose No Redondeado -->
              <div class="vault-real-breakdown">
                <div class="v-row">
                  <span>93% Mano de Obra Técnico</span>
                  <strong>$132.692 COP</strong>
                </div>
                <div class="v-row">
                  <span>7% Plataforma Rebuske</span>
                  <span>$9.988 COP</span>
                </div>
                <div class="v-row total">
                  <span>Anticipos en Mano</span>
                  <strong style="color:#FFFA70;">$0 COP (Prohibido)</strong>
                </div>
              </div>

              <!-- Garantía y Ley -->
              <div class="vault-legal-badge">
                ${SVG_ICONS.shield}
                <span>Garantía Escrita 48h (Ley 1480 de 2011)</span>
              </div>

              <!-- Action Button Real -->
              <div class="btn-pill-primary sheen" style="width:100%;text-align:center;font-size:11px;padding:9px;margin-top:auto;display:flex;align-items:center;justify-content:center;gap:6px;">
                <span>Aprobar y Liberar Fondos</span>
                ${SVG_ICONS.arrowRight}
              </div>
            </div>

            <!-- Home indicator -->
            <div class="phone-home-indicator"></div>
          </div>
        </div>

        <!-- Tarjeta de Referencia 02 -->
        <div class="phone-reference-card">
          <div class="ref-tag">REFERENCIA FINANCIERA 02</div>
          <h3 class="ref-title">Bóveda Wompi Escrow (Custodia Bancaria & Ley 1480)</h3>
          <p class="ref-desc">
            Cero anticipos en mano al técnico. El dinero ingresa a una cuenta fiduciaria bancaria regulada por la Superfinanciera. El técnico sabe que el dinero está asegurado, y el cliente solo autoriza el desembolso tras verificar la labor.
          </p>
          <div class="ref-meta">
            <span>${SVG_ICONS.shield} Protección de Fondos: <strong>100% Bancaria (Wompi)</strong></span>
            <span>${SVG_ICONS.document} Respaldo: <strong>Art. 1262 C.Co & Garantía 48h</strong></span>
          </div>
        </div>
      </div>

      <!-- ================= TELÉFONO 3: CREDENCIAL QR EN PUERTA ================= -->
      <div class="phone-card-wrap reveal-cascade stagger-3">
        <div class="phone-mockup">
          <div class="phone-screen">
            <!-- Barra de Estado -->
            <div class="phone-status-bar">
              <span>9:41</span>
              <div class="phone-island">
                <span class="phone-island-cam"></span>
                <span class="phone-island-sensor"></span>
              </div>
              <div class="phone-status-icons">
                <span>5G</span>
                <div class="phone-battery"><div class="phone-battery-level"></div></div>
              </div>
            </div>

            <!-- Pantalla 3: Credencial Oficial & QR Real App -->
            <div class="phone-content phone-content-app-qr">
              <div class="app-real-hd">
                <div class="app-back-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg>
                </div>
                <div class="app-hd-text" style="text-align:center;">
                  <span class="app-hd-greet">Control de Seguridad</span>
                  <span class="app-hd-loc" style="color:#B8FF3B;">Credencial en Puerta</span>
                </div>
                <div style="width:20px;"></div>
              </div>

              <!-- Profile Badge -->
              <div class="qr-pro-profile-card">
                <div class="pro-avatar-ring">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8FF3B" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <span class="avatar-verified-mark">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0C120A" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                </div>
                <div class="pro-name-verified">Andrés Felipe Ruiz</div>
                <div class="pro-spec-verified">Fontanero Master · C.C. 1.037.xxx.xxx</div>

                <div class="pro-checks-grid">
                  <div class="check-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B8FF3B" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> <span>Antecedentes Limpios Policía</span></div>
                  <div class="check-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B8FF3B" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> <span>Biometría Facial Cotejada</span></div>
                  <div class="check-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B8FF3B" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> <span>Póliza de Responsabilidad Activa</span></div>
                </div>
              </div>

              <!-- QR Box -->
              <div class="app-real-qr-card">
                <div class="qr-matrix-sim">
                  <div class="qr-cross tl"></div>
                  <div class="qr-cross tr"></div>
                  <div class="qr-cross bl"></div>
                  <span class="qr-code-center">RBK-2026</span>
                </div>
                <small class="qr-scan-hint">Escanea desde tu móvil antes de abrir</small>
              </div>
            </div>

            <!-- Home indicator -->
            <div class="phone-home-indicator"></div>
          </div>
        </div>

        <!-- Tarjeta de Referencia 03 -->
        <div class="phone-reference-card">
          <div class="ref-tag">REFERENCIA SEGURIDAD 03</div>
          <h3 class="ref-title">Autenticación en Puerta con Código QR Dinámico</h3>
          <p class="ref-desc">
            Seguridad estricta para tu familia. Cada técnico porta una credencial digital encriptada. El residente escanea el código desde la cámara del celular para corroborar identidad, fotografía y antecedentes antes de retirar el seguro de su puerta.
          </p>
          <div class="ref-meta">
            <span>${SVG_ICONS.lock} Verificación: <strong>En tiempo real en la nube</strong></span>
            <span>${SVG_ICONS.prohibit} Suplantación de identidad: <strong>0% de tolerancia</strong></span>
          </div>
        </div>
      </div>

      <!-- ================= TELÉFONO 4: BILLETERA 93% NETO ================= -->
      <div class="phone-card-wrap reveal-cascade stagger-4">
        <div class="phone-mockup">
          <div class="phone-screen">
            <!-- Barra de Estado -->
            <div class="phone-status-bar">
              <span>9:41</span>
              <div class="phone-island">
                <span class="phone-island-cam"></span>
                <span class="phone-island-sensor"></span>
              </div>
              <div class="phone-status-icons">
                <span>5G</span>
                <div class="phone-battery"><div class="phone-battery-level"></div></div>
              </div>
            </div>

            <!-- Pantalla 4: Billetera Real App -->
            <div class="phone-content phone-content-app-wallet">
              <div class="app-real-hd">
                <div class="app-back-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg>
                </div>
                <div class="app-hd-text" style="text-align:center;">
                  <span class="app-hd-greet">Mi Billetera</span>
                  <span class="app-hd-loc" style="color:#B8FF3B;">93% Neto al Profesional</span>
                </div>
                <div style="width:20px;"></div>
              </div>

              <!-- Wallet Balance Card -->
              <div class="app-wallet-balance-box">
                <span class="wallet-subtitle">Saldo Acumulado Disponible</span>
                <div class="wallet-big-val">$843.520 <small>COP</small></div>
                <div class="wallet-timing-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFA70" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Retiro automático: Miércoles (Cada 4 días)</span>
                </div>
              </div>

              <!-- Transacciones con precios no redondeados -->
              <div class="app-wallet-ledger">
                <div class="ledger-row">
                  <div class="ledger-info">
                    <strong>Fuga Tubería Laureles</strong>
                    <small>Hoy · Aprobado</small>
                  </div>
                  <span class="ledger-val">+$132.692</span>
                </div>
                <div class="ledger-row">
                  <div class="ledger-info">
                    <strong>Breakers Belén 220V</strong>
                    <small>Ayer · Aprobado</small>
                  </div>
                  <span class="ledger-val">+$113.840</span>
                </div>
                <div class="ledger-row">
                  <div class="ledger-info">
                    <strong>Cerradura El Poblado</strong>
                    <small>Hace 2 días</small>
                  </div>
                  <span class="ledger-val">+$85.420</span>
                </div>
              </div>

              <!-- Destino de Pago -->
              <div class="wallet-dest-pill">
                <span>Cuenta: Bancolombia / Nequi (···4821) · 93% Neto</span>
              </div>
            </div>

            <!-- Home indicator -->
            <div class="phone-home-indicator"></div>
          </div>
        </div>

        <!-- Tarjeta de Referencia 04 -->
        <div class="phone-reference-card">
          <div class="ref-tag">REFERENCIA LABORAL 04</div>
          <h3 class="ref-title">Billetera de Oficio Autónoma (93% Neto Cada 4 Días)</h3>
          <p class="ref-desc">
            Dignificamos el trabajo técnico calificado en Colombia. Sin comisiones abusivas del 30% ni demoras de semanas. El profesional retiene el 93% neto de cada labor y recibe transferencias directas a su cuenta bancaria o billetera digital cada 4 días.
          </p>
          <div class="ref-meta">
            <span>${SVG_ICONS.banknote} Retención para el técnico: <strong>93% Neto</strong></span>
            <span>${SVG_ICONS.zap} Frecuencia de desembolso: <strong>Cada 4 días calendario</strong></span>
          </div>
        </div>
      </div>

    </div>
  </section>
  `;
}

// ============================================================================
// 2. GENERADOR DEL DIRECTORIO COMPACTO DE SERVICIOS & TARIFARIO CON HOVER
// ============================================================================
export function generateUnifiedServicesAndTarifarioHTML() {
  return `
  <!-- ==========================================================================
       NUESTROS SERVICIOS & TARIFARIO OFICIAL DE REFERENCIA (COMPACTO CON HOVER)
       ========================================================================== -->
  <section class="section-wrap" id="nuestros-servicios" style="padding-top: 60px;">
    <div class="sec-header reveal-cascade" style="text-align: center; max-width: 840px; margin: 0 auto 32px;">
      <span class="badge-pill" style="margin-bottom: 12px;">
        ${SVG_ICONS.shield} Directorio Oficial de Especialidades & Tarifario 2026
      </span>
      <h2 class="sec-title" style="font-size: clamp(26px, 4vw, 38px); line-height: 1.15; margin-bottom: 14px;">
        Nuestros Servicios & Precios Transparentes de Referencia
      </h2>
      <p class="sec-desc" style="font-size: 16px; color: var(--mut); line-height: 1.6;">
        Consulta las 17 especialidades disponibles en el Valle de Aburrá con precios algorítmicos no redondeados (Plomería, Electricidad, Cerrajería, Limpieza y Aseo y más). 
        <strong>Pasa el cursor sobre cualquier especialidad o flecha para desplegar las labores y precios de referencia.</strong>
      </p>
    </div>

    <!-- Buscador compacto en tiempo real -->
    <div class="srv-search-box">
      <span class="srv-search-icon">${SVG_ICONS.search}</span>
      <input type="text" id="serviceSearch" class="srv-search-input" placeholder="Buscar especialidad o labor (ej: fuga, corto, nevera, chapa, pintura)..." oninput="filtrarServiciosCompactos()">
    </div>

    <!-- Filtros de categoría -->
    <div class="srv-filter-bar">
      <button class="srv-filter-btn active" onclick="filtrarGrupoSrv('todos', this)">Todas las 17 Especialidades</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('hogar', this)">Hogar & Reparaciones</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('educacion', this)">Educación & Clases</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('tecnologia', this)">Tecnología & Electro</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('transporte', this)">Transporte & Autos</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('digital', this)">Digital & Diseño</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('bienestar', this)">Belleza & Bienestar</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('eventos', this)">Eventos</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('profesional', this)">Servicios Profesionales</button>
    </div>

    <!-- Grid de tarjetas compactas de servicios con desplegable al hover -->
    <div class="srv-compact-grid" id="srvCompactGrid">
      ${CATEGORIES_DATA.map(cat => `
        <article class="srv-compact-card" data-group="${cat.group}" data-id="${cat.id}" tabindex="0">
          <div class="srv-card-main">
            <div class="srv-icon-badge">
              ${SVG_ICONS[cat.iconKey] || SVG_ICONS.shield}
            </div>
            <div class="srv-info">
              <div class="srv-num-tag">${cat.num}. ${cat.name}</div>
              <div class="srv-price-base">${cat.basePrice}</div>
            </div>
            <div class="srv-chevron-wrap" title="Pasa el mouse para ver labores">
              ${SVG_ICONS.chevronDown}
            </div>
          </div>

          <!-- Panel desplegable al hover -->
          <div class="srv-dropdown-pane">
            <p class="srv-dropdown-desc">${cat.desc}</p>
            <div class="srv-dropdown-table">
              ${cat.rows.map(r => `
                <div class="srv-table-row">
                  <div class="srv-row-name">
                    <strong>${r.name}</strong>
                    <small>${r.detail}</small>
                  </div>
                  <div class="srv-row-price">${r.price}</div>
                </div>
              `).join('')}
            </div>
            <div class="srv-dropdown-footer">
              <span class="srv-modality-pill">${cat.modality}</span>
              <span class="srv-guarantee-pill">Garantía Escrita 48h (Ley 1480)</span>
            </div>
          </div>
        </article>
      `).join('')}
    </div>

    <!-- Protocolo y Visita Diagnóstica de Referencia -->
    <div class="glass" style="margin-top: 36px; padding: 24px 28px; border-radius: 20px; border: 1px solid var(--glass-border-lima); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
      <div>
        <h4 style="font-size: 16px; font-weight: 700; color: var(--tinta); margin-bottom: 4px;">
          Visita Diagnóstica Técnica en Medellín: $35.000 COP
        </h4>
        <p style="font-size: 13.5px; color: var(--mut); margin: 0;">
          El 100% de la visita diagnóstica es <strong>abonable a la labor</strong> si contratas el servicio con el especialista. Cero cobros a ciegas.
        </p>
      </div>
      <a href="#protocolo-seguridad" class="btn-nav-link" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
        <span>Ver Protocolo de Garantía</span>
        ${SVG_ICONS.arrowRight}
      </a>
    </div>
  </section>
  `;
}

// ============================================================================
// 3. GENERADOR DEL FOOTER CORPORATIVO Y LEGAL COMPLETO RESTAURADO
// ============================================================================
export function generateRestoredFooterHTML() {
  return `
  <!-- ==========================================================================
       FOOTER OFICIAL RESTAURADO CON MARCO LEGAL, CONTACTO Y ORGANIZACIÓN FORMAL
       ========================================================================== -->
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <h4 style="font-family:var(--font-title);font-size:20px;font-weight:800;color:var(--tinta);margin-bottom:8px;">
          rebuske Medellín 2026
        </h4>
        <p style="font-size:13.5px;color:var(--mut);line-height:1.6;max-width:380px;">
          Plataforma tecnológica de servicios técnicos para el hogar con pago protegido en Bóveda Wompi (Bancolombia). Fundador: <strong>Camilo Escobar</strong>.
        </p>
        <p style="margin-top:12px;font-size:12.5px;color:var(--lima);">
          Medellín, Antioquia, Colombia · Nit en trámite · 100% Hecho en Medellín
        </p>
      </div>

      <div class="footer-links">
        <div class="footer-col">
          <h5>Plataforma</h5>
          <ul>
            <li><a href="/registro/tecnico">Registro de Técnicos</a></li>
            <li><a href="/registro/cliente">Registro de Clientes VIP</a></li>
            <li><a href="#nuestros-servicios">Especialidades & Tarifas</a></li>
            <li><a href="#protocolo-seguridad">Protocolo de Garantía</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Legal y Normativo</h5>
          <ul>
            <li><a href="/terminos">Términos y Condiciones</a></li>
            <li><a href="/privacidad">Política de Privacidad</a></li>
            <li><a href="/reembolsos">Política de Reembolsos</a></li>
            <li><a href="/descuentos">Condiciones de Descuentos</a></li>
            <li><a href="/eliminar-cuenta">Eliminar Cuenta</a></li>
            <li><a href="/privacidad#cookies">Política de Cookies</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Contacto Directo</h5>
          <ul>
            <li>
              <a href="https://wa.me/573043812882?text=Hola%20Laura%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20rebuske" target="_blank" rel="noopener noreferrer">
                Laura WhatsApp (+57 304 381 2882)
              </a>
            </li>
            <li><a href="mailto:holarebuske@gmail.com">holarebuske@gmail.com</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2026 rebuske. Todos los derechos reservados. Cumplimiento estricto Ley 1480 y Ley 1581 de Colombia.</span>
      <span>Medellín · El Poblado · Laureles · Belén · Envigado</span>
    </div>
  </footer>

  <!-- BANNER DE COOKIES (Discreto abajo) -->
  <aside class="cookie-banner" id="cookieBanner" aria-label="Consentimiento de cookies">
    <div class="cookie-text">
      Usamos cookies esenciales para operar la plataforma y pagos Wompi. Con tu permiso, usamos analítica para optimizar el servicio en Medellín sin rastrear datos sensibles.
    </div>
    <div class="cookie-actions">
      <button class="btn-cookie-config" onclick="cerrarCookies()">Configurar</button>
      <button class="btn-cookie-accept" onclick="aceptarCookies()">Aceptar todas</button>
    </div>
  </aside>
  `;
}
