import { SVG_ICONS } from './service_icons.mjs';
import { CATEGORIES_DATA } from './categories_data_unrounded.mjs';

// ============================================================================
// 1. GENERADOR DE LAS 4 PANTALLAS DE TELÉFONO IDÉNTICAS A LA APP (CERO EMOJIS)
// ============================================================================
export function generatePhoneScreensHTML() {
  return `
  <!-- ==========================================================================
       SHOWCASE DE TELÉFONOS EN VIVO · PANTALLAS REALES DE LA APP
       ========================================================================== -->
  <section class="section-wrap phones-showcase-section" id="experiencia-app">
    <div class="sec-header reveal-cascade" style="text-align: center; max-width: 820px; margin: 0 auto 36px;">
      <h2 class="sec-title" style="font-size: clamp(26px, 4vw, 38px); line-height: 1.15; margin-bottom: 14px; text-align: center;">
        Así Funciona la App en la Pantalla de tu Celular
      </h2>
      <p class="sec-desc" style="font-size: 16px; color: var(--mut); line-height: 1.6; text-align: center !important; margin: 0 auto 20px auto !important; max-width: 820px; display: block;">
        Transparencia algorítmica, despacho hiperlocal en el Valle de Aburrá, bóveda bancaria escrow y credenciales con código QR antes de abrir la puerta de tu hogar.
      </p>
    </div>

    <div class="phones-grid">

      <!-- ================= TELÉFONO 1: PANTALLA PRINCIPAL & CATÁLOGO ================= -->
      <div class="phone-card-wrap reveal-cascade stagger-1">
        <div class="phone-stage-3d">
          <div class="phone-mockup phone-3d-pos-1">
            <!-- Botones físicos de titanio -->
            <div class="phone-btn-action" aria-hidden="true"></div>
            <div class="phone-btn-vol-up" aria-hidden="true"></div>
            <div class="phone-btn-vol-down" aria-hidden="true"></div>
            <div class="phone-btn-power" aria-hidden="true"></div>

            <div class="phone-glare-overlay"></div>
            <div class="phone-glass-sheen" aria-hidden="true"></div>

            <div class="phone-screen">
              <div class="phone-speaker-slit" aria-hidden="true"></div>
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

              <img src="/assets/screenshots/app_screen_1_home.png" alt="Captura Real de la App Rebuske: Catálogo y Buscador" class="phone-real-screenshot" fetchpriority="high" decoding="async">
              <div class="phone-home-indicator"></div>
            </div>
          </div>
          <!-- Sombra de suelo 3D flotante -->
          <div class="phone-3d-floor-shadow" aria-hidden="true"></div>
        </div>

        <div class="phone-caption-card">
          <span class="phone-step-badge">${SVG_ICONS.search} Pantalla 1 · Catálogo Oficial</span>
          <h3 class="phone-caption-title">Exploración & Búsqueda Directa</h3>
          <p class="phone-caption-desc">
            Buscador predictivo, acceso a 18 especialidades en el Valle de Aburrá y negociación de tarifas en tiempo real con botones de + y − (estilo InDrive).
          </p>
          <div class="phone-caption-tags">
            <span>18 Especialidades</span>
            <span>Negociación InDrive (+/-)</span>
            <span>Ellas Construyen</span>
          </div>
        </div>
      </div>

      <!-- ================= TELÉFONO 2: RADAR TÁCTICO & MONITOREO ================= -->
      <div class="phone-card-wrap reveal-cascade stagger-2">
        <div class="phone-stage-3d">
          <div class="phone-mockup phone-3d-pos-2">
            <!-- Botones físicos de titanio -->
            <div class="phone-btn-action" aria-hidden="true"></div>
            <div class="phone-btn-vol-up" aria-hidden="true"></div>
            <div class="phone-btn-vol-down" aria-hidden="true"></div>
            <div class="phone-btn-power" aria-hidden="true"></div>

            <div class="phone-glare-overlay"></div>
            <div class="phone-glass-sheen" aria-hidden="true"></div>

            <div class="phone-screen">
              <div class="phone-speaker-slit" aria-hidden="true"></div>
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

              <img src="/assets/screenshots/app_screen_2_radar.png" alt="Captura Real de la App Rebuske: Radar Táctico en Vivo" class="phone-real-screenshot" fetchpriority="high" decoding="async">
              <div class="phone-home-indicator"></div>
            </div>
          </div>
          <!-- Sombra de suelo 3D flotante -->
          <div class="phone-3d-floor-shadow" aria-hidden="true"></div>
        </div>

        <div class="phone-caption-card">
          <span class="phone-step-badge">${SVG_ICONS.radar} Pantalla 2 · Radar Táctico</span>
          <h3 class="phone-caption-title">Despacho en Comunas</h3>
          <p class="phone-caption-desc">
            Seguimiento en tiempo real con geolocalización, tiempo estimado de llegada (&lt;35-45 min) y trazabilidad del técnico asignado.
          </p>
          <div class="phone-caption-tags">
            <span>Llegada en 35-45m</span>
            <span>Ruta en Vivo</span>
            <span>Comunas Aburrá</span>
          </div>
        </div>
      </div>

      <!-- ================= TELÉFONO 3: BÓVEDA WOMPI ESCROW ================= -->
      <div class="phone-card-wrap reveal-cascade stagger-3">
        <div class="phone-stage-3d">
          <div class="phone-mockup phone-3d-pos-3">
            <!-- Botones físicos de titanio -->
            <div class="phone-btn-action" aria-hidden="true"></div>
            <div class="phone-btn-vol-up" aria-hidden="true"></div>
            <div class="phone-btn-vol-down" aria-hidden="true"></div>
            <div class="phone-btn-power" aria-hidden="true"></div>

            <div class="phone-glare-overlay"></div>
            <div class="phone-glass-sheen" aria-hidden="true"></div>

            <div class="phone-screen">
              <div class="phone-speaker-slit" aria-hidden="true"></div>
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

              <img src="/assets/screenshots/app_screen_3_wompi.png" alt="Captura Real de la App Rebuske: Bóveda Wompi Bancolombia" class="phone-real-screenshot" fetchpriority="high" decoding="async">
              <div class="phone-home-indicator"></div>
            </div>
          </div>
          <!-- Sombra de suelo 3D flotante -->
          <div class="phone-3d-floor-shadow" aria-hidden="true"></div>
        </div>

        <div class="phone-caption-card">
          <span class="phone-step-badge" style="color:#FFFA70;border-color:rgba(255,250,112,0.3);background:rgba(255,250,112,0.1);">${SVG_ICONS.shield} Pantalla 3 · Bóveda Wompi</span>
          <h3 class="phone-caption-title">Custodia Bancolombia Escrow</h3>
          <p class="phone-caption-desc">
            Tu dinero reposa en custodia bancaria blindada. Solo se desembolsa cuando verificas el trabajo y firmas el acta de garantía.
          </p>
          <div class="phone-caption-tags">
            <span>Bancolombia</span>
            <span>Cero Adelantos</span>
            <span>Garantía 48h</span>
          </div>
        </div>
      </div>

      <!-- ================= TELÉFONO 4: BILLETERA PRO & CREDENCIAL QR ================= -->
      <div class="phone-card-wrap reveal-cascade stagger-4">
        <div class="phone-stage-3d">
          <div class="phone-mockup phone-3d-pos-4">
            <!-- Botones físicos de titanio -->
            <div class="phone-btn-action" aria-hidden="true"></div>
            <div class="phone-btn-vol-up" aria-hidden="true"></div>
            <div class="phone-btn-vol-down" aria-hidden="true"></div>
            <div class="phone-btn-power" aria-hidden="true"></div>

            <div class="phone-glare-overlay"></div>
            <div class="phone-glass-sheen" aria-hidden="true"></div>

            <div class="phone-screen">
              <div class="phone-speaker-slit" aria-hidden="true"></div>
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

              <img src="/assets/screenshots/app_screen_4_billetera.png" alt="Captura Real de la App Rebuske: Billetera Pro y Credencial" class="phone-real-screenshot" fetchpriority="high" decoding="async">
              <div class="phone-home-indicator"></div>
            </div>
          </div>
          <!-- Sombra de suelo 3D flotante -->
          <div class="phone-3d-floor-shadow" aria-hidden="true"></div>
        </div>

        <div class="phone-caption-card">
          <span class="phone-step-badge">${SVG_ICONS.wallet} Pantalla 4 · Billetera Pro</span>
          <h3 class="phone-caption-title">Hasta 89% - 99% Neto Cada 4 Días</h3>
          <p class="phone-caption-desc">
            Plataforma ética para el trabajador técnico: retiene hasta el 89% neto (99% en Mes Fundador) de sus ingresos con dispersión directa a Nequi o cuenta bancaria.
          </p>
          <div class="phone-caption-tags">
            <span>89% Oro VIP</span>
            <span>99% Fundador</span>
            <span>Dispersión Cada 4D</span>
          </div>
        </div>
      </div>

    </div>
  </section>
  `;
}


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
      <p class="sec-desc" style="font-size: 16px; color: var(--mut); line-height: 1.6; text-align: center !important; margin: 0 auto 20px auto !important; max-width: 820px; display: block;">
        Consulta las 18 especialidades disponibles en el Valle de Aburrá con precios algorítmicos no redondeados. 
        <strong>Negociación en tiempo real estilo InDrive:</strong> cliente y profesional acuerdan el valor final en vivo con botones de <strong>+ (más)</strong> y <strong>− (menos)</strong> directamente en la app antes de asegurar el pago en Bóveda Wompi.
      </p>
    </div>

    <!-- Buscador compacto en tiempo real -->
    <div class="srv-search-box">
      <span class="srv-search-icon">${SVG_ICONS.search}</span>
      <input type="text" id="serviceSearch" class="srv-search-input" placeholder="Buscar especialidad o labor (ej: paseo perro, baño mascota, fuga, corto, nevera)..." oninput="filtrarServiciosCompactos()">
    </div>

    <!-- Filtros de categoría -->
    <div class="srv-filter-bar">
      <button class="srv-filter-btn active" onclick="filtrarGrupoSrv('todos', this)">Todas las 18 Especialidades</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('hogar', this)">Hogar & Reparaciones</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('mascotas', this)">Mascotas & Veterinaria</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('educacion', this)">Educación & Clases</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('gastronomia', this)">Chef & Gastronomía</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('electro', this)">Electrodomésticos</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('transporte', this)">Transporte & Autos</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('digital', this)">Digital & Diseño</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('bienestar', this)">Belleza & Bienestar</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('eventos', this)">Eventos</button>
      <button class="srv-filter-btn" onclick="filtrarGrupoSrv('profesional', this)">Servicios Profesionales</button>
    </div>

    <!-- Grid de tarjetas estilo álbum Spotify (18 Especialidades) -->
    <div class="srv-compact-grid" id="srvCompactGrid">
      ${CATEGORIES_DATA.map(cat => `
        <article class="srv-compact-card spotify-card" data-group="${cat.group}" data-id="${cat.id}">
          <div class="spotify-cover-wrap" onclick="toggleSrvCard(this, event)">
            <div class="spotify-cover-art" style="background-image: url('${cat.imageUrl}');">
              <div class="spotify-cover-overlay"></div>
            </div>
            <div class="spotify-sleeve-stack" aria-hidden="true">
              <div class="spotify-sleeve-layer s-layer-1"></div>
              <div class="spotify-sleeve-layer s-layer-2"></div>
            </div>
            <div class="spotify-badge-box" title="${cat.name}">
              ${SVG_ICONS[cat.iconKey] || SVG_ICONS.shield}
            </div>
          </div>

          <div class="spotify-card-body" onclick="toggleSrvCard(this, event)">
            <h3 class="spotify-card-title">${cat.num}. ${cat.name}</h3>
            <div class="spotify-card-row">
              <div class="spotify-meta-text">
                <span class="spotify-price-tag">${cat.basePrice}</span>
                <span class="spotify-short-desc">${cat.shortDesc}</span>
              </div>
              <button type="button" class="spotify-chevron-btn srv-chevron-wrap" title="Ver labores de ${cat.name}" aria-label="Ver labores de ${cat.name}" onclick="toggleSrvCard(this, event)">
                ${SVG_ICONS.chevronDown}
              </button>
            </div>
          </div>

          <!-- Panel desplegable al hacer clic -->
          <div class="srv-dropdown-pane" onclick="event.stopPropagation()">
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
  <footer class="site-footer" id="contacto">
    <div class="footer-inner">
      <div class="footer-brand">
        <h4 style="font-family:var(--font-title);font-size:20px;font-weight:800;color:var(--tinta);margin-bottom:8px;">
          rebuske Medellín 2026
        </h4>
        <p style="font-size:13.5px;color:var(--mut);line-height:1.6;max-width:380px;">
          Plataforma tecnológica de servicios técnicos para el hogar con pago protegido en Bóveda Wompi (Bancolombia). Fundador: <a href="https://www.instagram.com/camoescobarr/?hl=es" target="_blank" rel="noopener noreferrer" style="color:var(--lima);text-decoration:none;font-weight:700;">Camilo Escobar</a>.
        </p>
        <p style="margin-top:12px;font-size:12.5px;color:var(--lima);">
          Medellín, Antioquia, Colombia · 100% Hecho en Medellín
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
          <h5>Redes Sociales</h5>
          <ul>
            <li>
              <a href="https://instagram.com/holarebuske" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:var(--lima);flex-shrink:0;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span>Instagram (@holarebuske)</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/camoescobarr/?hl=es" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;color:var(--tinta);">
                <img src="/favicon.svg" alt="rebuske" style="width:15px;height:15px;border-radius:4px;box-shadow:0 0 6px rgba(184,255,59,0.5);flex-shrink:0;">
                <span>Camilo Escobar (@camoescobarr)</span>
              </a>
            </li>
            <li>
              <a href="https://tiktok.com/@holarebuske" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="color:var(--lima);flex-shrink:0;"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.96-4.48V8.75a8.28 8.28 0 0 0 5.25 1.87v-3.45a4.83 4.83 0 0 1-1.44-.48z"/></svg>
                <span>TikTok (@holarebuske)</span>
              </a>
            </li>
            <li>
              <a href="https://facebook.com/holarebuske" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="color:var(--lima);flex-shrink:0;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                <span>Facebook Oficial</span>
              </a>
            </li>
            <li>
              <a href="https://youtube.com/@holarebuske" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="color:var(--lima);flex-shrink:0;"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0C120A"/></svg>
                <span>YouTube (@holarebuske)</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Contacto Directo</h5>
          <ul>
            <li>
              <a href="https://wa.me/573043812882?text=Hola%20Laura%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20rebuske" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:var(--lima);flex-shrink:0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Laura WhatsApp (+57 304 381 2882)</span>
              </a>
            </li>
            <li>
              <a href="mailto:holarebuske@gmail.com" style="display:inline-flex;align-items:center;gap:8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:var(--lima);flex-shrink:0;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>holarebuske@gmail.com</span>
              </a>
            </li>
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

// ============================================================================
// 4. GENERADOR DE SECCIÓN QUIÉNES SOMOS (CAMILO ESCOBAR, 93% NETO, WOMPI)
// ============================================================================
export function generateQuienesSomosHTML() {
  return `
  <!-- ==========================================================================
       QUIÉNES SOMOS · ORIGEN, EQUIPO Y DIGNIDAD TÉCNICA EN MEDELLÍN
       ========================================================================== -->
  <section class="section-wrap" id="quienes-somos" style="padding-top: 60px;">
    <div class="sec-header reveal-cascade" style="text-align: center; max-width: 820px; margin: 0 auto 36px;">
      <span class="badge-pill" style="margin-bottom: 12px;">
        ${SVG_ICONS.userCheck} Historia y Propósito Rebuske
      </span>
      <h2 class="sec-title" style="font-size: clamp(26px, 4vw, 38px); line-height: 1.15; margin-bottom: 14px; text-align: center;">
        Quiénes Somos: Dignidad para el Técnico, Tranquilidad para tu Hogar
      </h2>
      <p class="sec-desc" style="font-size: 16px; color: var(--mut); line-height: 1.6; text-align: center !important; margin: 0 auto 20px auto !important; max-width: 780px; display: block;">
        Nacimos en Medellín con la convicción de dignificar la mano de obra colombiana eliminando intermediarios abusivos y protegiendo a las familias con tecnología segura.
      </p>
    </div>

    <div class="quienes-somos-grid">
      <div class="quienes-somos-card reveal-cascade">
        <div class="quienes-somos-icon">
          ${SVG_ICONS.zap}
        </div>
        <h3 class="quienes-somos-title">Liderazgo & Visión Fundadora</h3>
        <p class="quienes-somos-text">
          Fundada por <a href="https://www.instagram.com/camoescobarr/?hl=es" target="_blank" rel="noopener noreferrer" style="color:var(--lima);text-decoration:none;font-weight:700;">Camilo Escobar</a> en Medellín, Rebuske nace para que los profesionales técnicos conserven hasta el <strong>93% neto de sus ingresos</strong> cada 4 días, sin pagar comisiones desmedidas del 30% o 40%.
        </p>
      </div>

      <div class="quienes-somos-card reveal-cascade stagger-1">
        <div class="quienes-somos-icon">
          ${SVG_ICONS.shield}
        </div>
        <h3 class="quienes-somos-title">Protección Bancaria Escrow</h3>
        <p class="quienes-somos-text">
          Tu dinero reposa en custodia en la <strong>Bóveda Wompi (Bancolombia)</strong>. El especialista cobra únicamente cuando verificas la labor a conformidad y firmas el <strong>Acta Digital de Garantía de 48 horas</strong> (Ley 1480).
        </p>
      </div>

      <div class="quienes-somos-card reveal-cascade stagger-2">
        <div class="quienes-somos-icon">
          ${SVG_ICONS.mapPin}
        </div>
        <h3 class="quienes-somos-title">Cobertura Valle de Aburrá</h3>
        <p class="quienes-somos-text">
          Atención hiperlocal con técnicos verificados mediante cédula biométrica en Medellín, Envigado, Itagüí, Sabaneta, Bello, La Estrella, Caldas, Copacabana, Girardota y Barbosa.
        </p>
      </div>
    </div>
  </section>
  `;
}

// ============================================================================
// 5. GENERADOR DEL SIMULADOR INTERACTIVO DE AHORRO Y DIGNIFICACIÓN TÉCNICA
// ============================================================================
export function generateTechSimulatorHTML() {
  return `
  <!-- ==========================================================================
       SIMULADOR INTERACTIVO DE AHORRO Y DIGNIFICACIÓN TÉCNICA
       ========================================================================== -->
  <section class="section-wrap" id="simulador-tecnico" style="padding-top: 50px; padding-bottom: 50px;">
    <div class="sec-header reveal-cascade" style="text-align: center; max-width: 820px; margin: 0 auto 32px;">
      <span class="badge-pill" style="margin-bottom: 12px;">
        ${SVG_ICONS.wallet} Simulador de Ahorro y Dignificación
      </span>
      <h2 class="sec-title" style="font-size: clamp(26px, 4vw, 38px); line-height: 1.15; margin-bottom: 14px; text-align: center;">
        ¿Cuánto Ganas Netamente con Rebuske?
      </h2>
      <p class="sec-desc" style="font-size: 16px; color: var(--mut); line-height: 1.6; text-align: center !important; margin: 0 auto 20px auto !important; max-width: 780px; display: block;">
        Compara la retención de intermediarios tradicionales (20%-30%) frente a las comisiones justas de Rebuske en Medellín. Tu mano de obra se respeta con dispersión bancaria directa cada 4 días:
      </p>
    </div>

    <div class="sim-card-wrap reveal-cascade stagger-1">
      <div class="sim-box">
        <!-- Control de Facturación Mensual -->
        <div class="sim-header-row">
          <div>
            <label for="simBillingRange" class="sim-label">Tus Ingresos Mensuales Estimados por Labores:</label>
            <div class="sim-amount-display" id="simBillingValText">$3.500.000 COP</div>
          </div>
          <span class="sim-disp-tag">Dispersión Nequi / Bancolombia Cada 4 Días</span>
        </div>

        <input type="range" id="simBillingRange" class="sim-range-slider" min="1000000" max="8000000" step="100000" value="3500000" oninput="actualizarSimuladorWeb()">

        <!-- Selector de Categorías / Placas Metálicas Oficiales -->
        <div class="sim-cats-label">Selecciona tu placa y categoría en Rebuske:</div>
        <div class="sim-tier-selector">
          <button type="button" class="sim-tier-btn active tier-oro" data-rate="0.11" data-net="0.89" data-name="Placa Oro" onclick="seleccionarTierSim(this)">
            <div class="sim-placa-header">
              <div class="sim-placa-icon-badge oro">
                ${SVG_ICONS.crown}
              </div>
              <span class="sim-tier-badge oro">11% Com.</span>
            </div>
            <div class="sim-placa-body">
              <strong class="sim-placa-name">Placa Oro</strong>
              <small class="sim-placa-net">89% Neto al Técnico</small>
            </div>
          </button>
          
          <button type="button" class="sim-tier-btn tier-plata" data-rate="0.14" data-net="0.86" data-name="Placa Plata" onclick="seleccionarTierSim(this)">
            <div class="sim-placa-header">
              <div class="sim-placa-icon-badge plata">
                ${SVG_ICONS.award}
              </div>
              <span class="sim-tier-badge plata">14% Com.</span>
            </div>
            <div class="sim-placa-body">
              <strong class="sim-placa-name">Placa Plata</strong>
              <small class="sim-placa-net">86% Neto al Técnico</small>
            </div>
          </button>

          <button type="button" class="sim-tier-btn tier-bronce" data-rate="0.18" data-net="0.82" data-name="Placa Bronce" onclick="seleccionarTierSim(this)">
            <div class="sim-placa-header">
              <div class="sim-placa-icon-badge bronce">
                ${SVG_ICONS.star}
              </div>
              <span class="sim-tier-badge bronce">18% Com.</span>
            </div>
            <div class="sim-placa-body">
              <strong class="sim-placa-name">Placa Bronce</strong>
              <small class="sim-placa-net">82% Neto al Técnico</small>
            </div>
          </button>

          <button type="button" class="sim-tier-btn promo tier-fundador" data-rate="0.01" data-net="0.99" data-name="Mes 1 Fundador" onclick="seleccionarTierSim(this)">
            <div class="sim-placa-header">
              <div class="sim-placa-icon-badge fundador">
                ${SVG_ICONS.zap}
              </div>
              <span class="sim-tier-badge fundador">1% Com.</span>
            </div>
            <div class="sim-placa-body">
              <strong class="sim-placa-name">Mes 1 Fundador</strong>
              <small class="sim-placa-net">99% Neto (100 Cupos)</small>
            </div>
          </button>
        </div>

        <!-- Resultados en Grid -->
        <div class="sim-results-grid">
          <div class="sim-result-card highlight">
            <span class="sim-res-kicker">Tu Ingreso Neto en Rebuske</span>
            <div class="sim-res-value" id="simNetValText">$3.115.000 COP</div>
            <span class="sim-res-sub" id="simNetDescText">Te quedas con el 89% neto de cada trabajo</span>
          </div>

          <div class="sim-result-card">
            <span class="sim-res-kicker">Dispersión Cada 4 Días</span>
            <div class="sim-res-value" id="simPayoutText">~$445.000 COP</div>
            <span class="sim-res-sub">Aprox. 7 u 8 pagos al mes en tu cuenta</span>
          </div>

          <div class="sim-result-card alert">
            <span class="sim-res-kicker">Otras Apps Tradicionales (25%)</span>
            <div class="sim-res-value" id="simTradLossText">-$875.000 COP</div>
            <span class="sim-res-sub">Comisiones abusivas retenidas por mes</span>
          </div>

          <div class="sim-result-card gold">
            <span class="sim-res-kicker">Ahorro Anual con Rebuske</span>
            <div class="sim-res-value" id="simYearSavingsText">+$5.880.000 COP</div>
            <span class="sim-res-sub">Dinero que se queda en tu hogar al año</span>
          </div>
        </div>

        <!-- CTA del Simulador -->
        <div class="sim-footer-row">
          <p class="sim-guarantee-note">
            ${SVG_ICONS.shield} Fondos asegurados en Bóveda Wompi (Bancolombia) antes de iniciar labores. Cero deudas, cero moras.
          </p>
          <a href="/registro/tecnico" class="btn-hero-primary" style="text-decoration:none;">
            <span>Asegurar Mi Cupo al 99% Neto (Mes 1)</span>
            ${SVG_ICONS.arrowRight}
          </a>
        </div>
      </div>
    </div>
  </section>
  `;
}
