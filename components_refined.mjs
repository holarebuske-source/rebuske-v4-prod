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
      <span class="badge-pill" style="margin-bottom: 12px;">
        ${SVG_ICONS.radar} Tecnología Móvil en Vivo
      </span>
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
        <div class="phone-mockup">
          <div class="phone-screen">
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

            <img src="/assets/screenshots/app_screen_1_home.png" alt="Captura Real de la App Rebuske: Catálogo y Buscador" class="phone-real-screenshot" loading="lazy">
            <div class="phone-home-indicator"></div>
          </div>
        </div>

        <div class="phone-caption-card">
          <span class="phone-step-badge">${SVG_ICONS.search} Pantalla 1 · Catálogo Oficial</span>
          <h3 class="phone-caption-title">Exploración & Búsqueda Directa</h3>
          <p class="phone-caption-desc">
            Buscador predictivo y acceso a las 17 especialidades técnicas en el Valle de Aburrá con precios algorítmicos sin redondeos.
          </p>
          <div class="phone-caption-tags">
            <span>17 Especialidades</span>
            <span>Precios Reales</span>
            <span>Ellas Construyen</span>
          </div>
        </div>
      </div>

      <!-- ================= TELÉFONO 2: RADAR TÁCTICO & MONITOREO ================= -->
      <div class="phone-card-wrap reveal-cascade stagger-2">
        <div class="phone-mockup">
          <div class="phone-screen">
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

            <img src="/assets/screenshots/app_screen_2_radar.png" alt="Captura Real de la App Rebuske: Radar Táctico en Vivo" class="phone-real-screenshot" loading="lazy">
            <div class="phone-home-indicator"></div>
          </div>
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
        <div class="phone-mockup">
          <div class="phone-screen">
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

            <img src="/assets/screenshots/app_screen_3_wompi.png" alt="Captura Real de la App Rebuske: Bóveda Wompi Bancolombia" class="phone-real-screenshot" loading="lazy">
            <div class="phone-home-indicator"></div>
          </div>
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
        <div class="phone-mockup">
          <div class="phone-screen">
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

            <img src="/assets/screenshots/app_screen_4_billetera.png" alt="Captura Real de la App Rebuske: Billetera Pro y Credencial" class="phone-real-screenshot" loading="lazy">
            <div class="phone-home-indicator"></div>
          </div>
        </div>

        <div class="phone-caption-card">
          <span class="phone-step-badge">${SVG_ICONS.wallet} Pantalla 4 · Billetera Pro</span>
          <h3 class="phone-caption-title">93% Neto Cada 4 Días</h3>
          <p class="phone-caption-desc">
            Plataforma ética para el trabajador técnico: retiene hasta el 93% neto de sus ingresos con dispersión directa a Nequi o cuenta bancaria.
          </p>
          <div class="phone-caption-tags">
            <span>93% Neto</span>
            <span>Cero Deudas</span>
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
  <footer class="site-footer" id="contacto">
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
          Fundada por <strong>Camilo Escobar</strong> en Medellín, Rebuske nace para que los profesionales técnicos conserven hasta el <strong>93% neto de sus ingresos</strong> cada 4 días, sin pagar comisiones desmedidas del 30% o 40%.
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
