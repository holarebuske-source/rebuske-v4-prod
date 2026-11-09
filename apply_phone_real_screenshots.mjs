import fs from 'fs';
import { SVG_ICONS } from './service_icons.mjs';

let code = fs.readFileSync('components_refined.mjs', 'utf8');

const newPhoneScreensHTML = `export function generatePhoneScreensHTML() {
  return \`
  <!-- ==========================================================================
       SHOWCASE DE TELÉFONOS EN VIVO · PANTALLAS REALES DE LA APP
       ========================================================================== -->
  <section class="section-wrap phones-showcase-section" id="experiencia-app">
    <div class="sec-header reveal-cascade" style="text-align: center; max-width: 820px; margin: 0 auto 36px;">
      <span class="badge-pill" style="margin-bottom: 12px;">
        \${SVG_ICONS.radar} Tecnología Móvil en Vivo
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
          <span class="phone-step-badge">\${SVG_ICONS.search} Pantalla 1 · Catálogo Oficial</span>
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
          <span class="phone-step-badge">\${SVG_ICONS.radar} Pantalla 2 · Radar Táctico</span>
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
          <span class="phone-step-badge" style="color:#FFFA70;border-color:rgba(255,250,112,0.3);background:rgba(255,250,112,0.1);">\${SVG_ICONS.shield} Pantalla 3 · Bóveda Wompi</span>
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
          <span class="phone-step-badge">\${SVG_ICONS.wallet} Pantalla 4 · Billetera Pro</span>
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
  \`;
}
`;

const regex = /export function generatePhoneScreensHTML\(\)[\s\S]*?(?=export function generateUnifiedServicesAndTarifarioHTML)/;
code = code.replace(regex, newPhoneScreensHTML + '\n\n');

fs.writeFileSync('components_refined.mjs', code, 'utf8');
console.log('components_refined.mjs updated with real screenshots!');
