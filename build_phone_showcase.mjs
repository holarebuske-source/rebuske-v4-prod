import fs from 'fs';

export function getPhoneShowcaseHTML() {
  return `
  <!-- ==========================================================================
       SHOWCASE OFICIAL DE TELÉFONOS EN VIVO · EXPERIENCIA MÓVIL REBUSKE
       ========================================================================== -->
  <section class="section-wrap phones-showcase-section" id="experiencia-app">
    <div class="sec-header reveal-cascade" style="text-align: center; max-width: 820px; margin: 0 auto 36px;">
      <span class="badge-pill" style="margin-bottom: 12px;">📱 Tecnología Móvil en Vivo</span>
      <h2 class="sec-title" style="font-size: clamp(26px, 4vw, 38px); line-height: 1.15; margin-bottom: 14px;">
        Así Funciona rebuske en la Pantalla de tu Celular
      </h2>
      <p class="sec-desc" style="font-size: 16px; color: var(--mut); line-height: 1.6;">
        Transparencia radical, geolocalización hiperlocal en el Valle de Aburrá, bóveda bancaria escrow y credenciales con código QR antes de abrir la puerta de tu hogar.
      </p>
    </div>

    <div class="phones-grid">

      <!-- ================= TELÉFONO 1: RADAR DE DESPACHO ================= -->
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

            <!-- Contenido de Pantalla 1: Radar -->
            <div class="phone-content phone-content-radar">
              <div class="app-screen-header">
                <span class="screen-live-dot pulse-c"></span>
                <span class="screen-header-title">Radar Hiperlocal · Medellín</span>
              </div>

              <!-- Mapa Táctico Simulado -->
              <div class="radar-map-sim">
                <div class="radar-sweep-circle"></div>
                <div class="radar-grid-lines"></div>
                
                <!-- Pines y Ruta -->
                <div class="radar-pin radar-pin-dest" style="top: 25%; left: 62%;">
                  <span class="pin-pulse"></span>
                  <span class="pin-icon">📍</span>
                  <span class="pin-label">El Poblado</span>
                </div>

                <div class="radar-pin radar-pin-moto" style="top: 60%; left: 35%;">
                  <span class="moto-icon">🏍️</span>
                  <span class="moto-trail"></span>
                </div>

                <svg class="radar-route-svg" viewBox="0 0 100 100">
                  <path d="M 35 60 Q 45 42 62 25" fill="none" stroke="#B8FF3B" stroke-width="2.5" stroke-dasharray="3,3" />
                </svg>
              </div>

              <!-- Tarjeta de Estado del Despacho -->
              <div class="phone-hud-card">
                <div class="hud-top">
                  <span class="hud-badge-urgente">⚡ En Camino</span>
                  <span class="hud-eta">22 min · 2.8 km</span>
                </div>
                <div class="hud-service-name">Fuga Tubería de Agua</div>
                <div class="hud-tech-row">
                  <div class="hud-tech-avatar">👨‍🔧</div>
                  <div class="hud-tech-info">
                    <span class="hud-tech-name">Carlos M. · Fontanería</span>
                    <span class="hud-tech-rating">⭐ 4.96 · 142 servicios</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Indicador Home -->
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
            <span>⏱️ Tiempo promedio auditado: <strong>34 minutos</strong></span>
            <span>📍 Cobertura: <strong>100% comunas y municipios del Valle</strong></span>
          </div>
        </div>
      </div>

      <!-- ================= TELÉFONO 2: BÓVEDA WOMPI ================= -->
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

            <!-- Contenido de Pantalla 2: Bóveda Wompi -->
            <div class="phone-content phone-content-escrow">
              <div class="app-screen-header">
                <span class="screen-bank-badge">Bancolombia</span>
                <span class="screen-header-title">Bóveda Wompi (Escrow)</span>
              </div>

              <!-- Candado y Bóveda -->
              <div class="vault-graphic-box">
                <div class="vault-shield-wrap">
                  <div class="vault-lock-glow"></div>
                  <div class="vault-shield-icon">🛡️</div>
                </div>
                <div class="vault-amount">$140.000 <span class="vault-currency">COP</span></div>
                <span class="vault-status-pill">🔒 Fondos Congelados en Custodia</span>
              </div>

              <!-- Desglose Transparente -->
              <div class="vault-breakdown-card">
                <div class="breakdown-row">
                  <span>93% Pago Técnico</span>
                  <strong style="color:#B8FF3B;">$130.200 COP</strong>
                </div>
                <div class="breakdown-row">
                  <span>7% Plataforma Rebuske</span>
                  <span>$9.800 COP</span>
                </div>
                <div class="breakdown-row total">
                  <span>Anticipos en Efectivo</span>
                  <strong style="color:#FFFA70;">$0 COP (Prohibido)</strong>
                </div>
              </div>

              <!-- Botón de Aprobación -->
              <div class="vault-action-btn">
                <span>Liberar Pago tras Aprobación</span>
              </div>
            </div>

            <!-- Indicador Home -->
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
            <span>🛡️ Protección de Fondos: <strong>100% Bancaria (Wompi)</strong></span>
            <span>📜 Respaldo: <strong>Art. 1262 C.Co & Garantía 48h</strong></span>
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

            <!-- Contenido de Pantalla 3: Credencial QR -->
            <div class="phone-content phone-content-qr">
              <div class="app-screen-header">
                <span class="screen-secure-dot"></span>
                <span class="screen-header-title">Control de Acceso en Puerta</span>
              </div>

              <!-- Carnet del Técnico -->
              <div class="pro-id-badge-card">
                <div class="pro-photo-ring">
                  <div class="pro-photo-sim">👨🏻‍🔧</div>
                  <span class="pro-verified-check">✓</span>
                </div>
                <div class="pro-id-name">Andrés Felipe Ruiz</div>
                <div class="pro-id-specialty">Fontanero Master · C.C. 1.037.xxx</div>
                
                <div class="pro-badges-list">
                  <span class="mini-check-badge">✓ Antecedentes Limpios (Policía/Fiscalía)</span>
                  <span class="mini-check-badge">✓ Huella y Cédula Cotejada</span>
                  <span class="mini-check-badge">✓ Póliza de Responsabilidad Civil</span>
                </div>
              </div>

              <!-- QR Dinámico -->
              <div class="dynamic-qr-box">
                <div class="qr-code-pattern">
                  <div class="qr-corner tl"></div>
                  <div class="qr-corner tr"></div>
                  <div class="qr-corner bl"></div>
                  <div class="qr-center-symbol">RBK</div>
                </div>
                <span class="qr-instruction">Escanea desde tu móvil antes de abrir</span>
              </div>
            </div>

            <!-- Indicador Home -->
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
            <span>🔒 Verificación: <strong>En tiempo real en la nube</strong></span>
            <span>🚫 Suplantación de identidad: <strong>0% de tolerancia</strong></span>
          </div>
        </div>
      </div>

      <!-- ================= TELÉFONO 4: BILLETERA 93% ================= -->
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

            <!-- Contenido de Pantalla 4: Billetera del Técnico -->
            <div class="phone-content phone-content-wallet">
              <div class="app-screen-header">
                <span class="screen-tech-badge">Especialista Pro</span>
                <span class="screen-header-title">Mi Billetera Rebuske</span>
              </div>

              <!-- Saldo Neto -->
              <div class="wallet-balance-card">
                <span class="wallet-label">Saldo Acumulado Disponible</span>
                <div class="wallet-amount">$842.000 <span class="wallet-cur">COP</span></div>
                <div class="wallet-payout-timing">
                  <span class="lightning-ico">⚡</span>
                  <span>Desembolso automático: <strong>En 2 días (Ciclo cada 4 días)</strong></span>
                </div>
              </div>

              <!-- Lista de Labores Recientes -->
              <div class="wallet-tx-list">
                <div class="tx-row">
                  <div class="tx-desc">
                    <span class="tx-title">🔧 Tubería Laureles</span>
                    <span class="tx-date">Hoy · Aprobado</span>
                  </div>
                  <span class="tx-val">+$130.200</span>
                </div>
                <div class="tx-row">
                  <div class="tx-desc">
                    <span class="tx-title">⚡ Breakers Belén</span>
                    <span class="tx-date">Ayer · Aprobado</span>
                  </div>
                  <span class="tx-val">+$111.600</span>
                </div>
                <div class="tx-row">
                  <div class="tx-desc">
                    <span class="tx-title">🔑 Cerradura Poblado</span>
                    <span class="tx-date">Hace 2 días</span>
                  </div>
                  <span class="tx-val">+$83.700</span>
                </div>
              </div>

              <!-- Destino de Pago -->
              <div class="wallet-dest-box">
                <span>Cuenta: Bancolombia / Nequi (···9012) · 93% Neto</span>
              </div>
            </div>

            <!-- Indicador Home -->
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
            <span>💰 Retención para el técnico: <strong>93% Neto</strong></span>
            <span>⚡ Frecuencia de desembolso: <strong>Cada 4 días calendario</strong></span>
          </div>
        </div>
      </div>

    </div>
  </section>
  `;
}
