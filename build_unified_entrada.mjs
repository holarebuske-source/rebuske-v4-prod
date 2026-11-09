import fs from 'fs';
import path from 'path';
import { getPhoneShowcaseHTML } from './build_phone_showcase.mjs';
import { phoneShowcaseCSS } from './showcase_css_prototype.mjs';
import { phoneScreensInternalCSS } from './phone_screens_css.mjs';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const entradaPath = path.join(projectDir, 'entrada.html');
const tarifasPath = path.join(projectDir, 'tarifas.html');

let entrada = fs.readFileSync(entradaPath, 'utf8');
const tarifas = fs.readFileSync(tarifasPath, 'utf8');

// 1. EXTRACT 17 CATEGORIES BLOCK FROM TARIFAS.HTML
const searchBoxIdx = tarifas.indexOf('<div class="search-box">');
const condCardIdx = tarifas.lastIndexOf('<section class="conditions-card">');

if (searchBoxIdx === -1 || condCardIdx === -1) {
  throw new Error(`Could not extract 17 categories catalog: searchBox=${searchBoxIdx}, condCard=${condCardIdx}`);
}
const rawCatalogHTML = tarifas.substring(searchBoxIdx, condCardIdx).trim();
console.log('Extracted raw catalog HTML length:', rawCatalogHTML.length);

// Wrap catalog in a proper section
const catalogSectionHTML = `
  <!-- ==========================================================================
       TARIFARIO OFICIAL INTEGRADO · 17 CATEGORÍAS Y PRECIOS DE REFERENCIA
       ========================================================================== -->
  <section class="section-wrap" id="tarifas" style="padding-top: 60px;">
    <div class="sec-header reveal-cascade" style="text-align: center; max-width: 820px; margin: 0 auto 32px;">
      <span class="badge-pill" style="margin-bottom: 12px;">📊 Tarifario Oficial 2026</span>
      <h2 class="sec-title" style="font-size: clamp(26px, 4vw, 38px); line-height: 1.15; margin-bottom: 14px;">
        17 Categorías · Precios Transparentes de Referencia
      </h2>
      <p class="sec-desc" style="font-size: 16px; color: var(--mut); line-height: 1.6;">
        Conoce los valores de referencia del mercado en el Valle de Aburrá sin sorpresas ni sobrecostos. Todo pago custodiado en Bóveda Wompi (Bancolombia) y cubierto con Acta Digital de Garantía de 48 horas.
      </p>
    </div>

    ${rawCatalogHTML}

    <!-- BANNER DE CIERRE DEL TARIFARIO -->
    <div class="glass" style="margin-top: 36px; padding: 28px; text-align: center; border-radius: 20px; border: 1px solid var(--glass-border-lima);">
      <h3 style="font-size: 20px; font-weight: 700; color: var(--tinta); margin-bottom: 8px;">
        ¿Listo para contratar o necesitas una cotización personalizada?
      </h3>
      <p style="font-size: 14.5px; color: var(--mut); max-width: 680px; margin: 0 auto 20px;">
        Abre la aplicación interactiva para solicitar cualquier labor con geolocalización en tiempo real y pago protegido.
      </p>
      <a href="/app" class="btn-pill-primary sheen" style="padding: 12px 32px; font-size: 15px;">
        📱 Abrir la App y Solicitar Servicio ➔
      </a>
    </div>
  </section>
`;

// 2. UNIFY HEADER IN ENTRADA.HTML WITH EXACTLY 2 LINKS
const newHeader = `<header class="top-bar" id="topBar">
    <a href="/entrada" class="brand-logo" title="rebuske Medellín · Página Web Principal">
      <span class="brand-logo-dot pulse-c" aria-hidden="true"></span>
      <span class="brand-name">rebuske</span>
      <span class="brand-tag">Medellín 2026</span>
    </a>
    <nav class="top-actions" aria-label="Navegación unificada">
      <a href="/entrada" class="btn-nav-link active" title="Página Web de Entrada">🌐 Página Web</a>
      <a href="/app" class="btn-pill-primary sheen" title="Abrir la Aplicación rebuske">📱 Abrir App ➔</a>
    </nav>
  </header>`;

entrada = entrada.replace(/<header class=[\"']top-bar[\"'][\s\S]*?<\/header>/i, newHeader);

// 3. UPDATE HERO ACTIONS TO POINT TO /APP AND #TARIFAS
entrada = entrada.replace(/href=[\"']\/tarifas[\"'] class=[\"']hero-promo-badge/i, `href="#tarifas" class="hero-promo-badge`);

// 4. INSERT PHONE SHOWCASE RIGHT AFTER HERO SECTION
const heroEndIdx = entrada.indexOf('</section>', entrada.indexOf('hero-section')) + 10;
const phoneShowcase = getPhoneShowcaseHTML();

// 5. INSERT CATALOG SECTION RIGHT AFTER NUESTROS SERVICIOS
// First splice Phone Showcase
entrada = entrada.substring(0, heroEndIdx) + '\n\n' + phoneShowcase + '\n\n' + entrada.substring(heroEndIdx);

// Now find updated position of 'nuestros-servicios' section end
const updatedServicesEndIdx = entrada.indexOf('</section>', entrada.indexOf('id="nuestros-servicios"')) + 10;
entrada = entrada.substring(0, updatedServicesEndIdx) + '\n\n' + catalogSectionHTML + '\n\n' + entrada.substring(updatedServicesEndIdx);

// 6. INJECT CSS FOR PHONES AND CATALOG
const cssInjection = `
  ${phoneShowcaseCSS}
  ${phoneScreensInternalCSS}

  /* ESTILOS DEL TARIFARIO INTEGRADO EN ENTRADA.HTML */
  .search-box {
    max-width: 520px;
    margin: 0 auto 28px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .search-icon {
    position: absolute;
    left: 18px;
    font-size: 16px;
    pointer-events: none;
  }
  .search-input {
    width: 100%;
    background: rgba(22, 36, 19, 0.85);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    padding: 13px 24px 13px 46px;
    color: var(--tinta);
    font-family: var(--font-main);
    font-size: 14.5px;
    outline: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .search-input:focus {
    border-color: var(--lima);
    box-shadow: 0 0 20px rgba(184, 255, 59, 0.25);
  }
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 32px;
  }
  .filter-btn {
    background: rgba(22, 36, 19, 0.8);
    border: 1px solid var(--glass-border);
    color: var(--tinta);
    font-family: var(--font-main);
    font-size: 13px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .filter-btn:hover {
    border-color: rgba(184, 255, 59, 0.4);
    color: var(--lima);
  }
  .filter-btn.active {
    background: rgba(184, 255, 59, 0.18);
    border-color: var(--lima);
    color: var(--lima);
    box-shadow: 0 0 15px rgba(184, 255, 59, 0.2);
  }
  .categories-wrap {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 24px;
  }
  .cat-card {
    background: var(--glass-surface);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 22px;
    box-shadow: var(--glass-shadow);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
  }
  .cat-card:hover {
    border-color: rgba(184, 255, 59, 0.35);
    transform: translateY(-4px);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(184, 255, 59, 0.12);
  }
  .cat-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .cat-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--tinta);
    margin-bottom: 4px;
  }
  .cat-desc {
    font-size: 12.5px;
    color: var(--mut);
    line-height: 1.45;
  }
  .cat-mod-badge {
    font-size: 9.5px;
    color: var(--lima);
    background: rgba(184, 255, 59, 0.1);
    padding: 3px 7px;
    border-radius: 6px;
    border: 1px solid rgba(184, 255, 59, 0.2);
    white-space: nowrap;
    margin-left: 8px;
  }
  .service-table {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    margin-bottom: 16px;
  }
  .service-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
    background: rgba(12, 18, 10, 0.6);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    gap: 10px;
  }
  .service-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--tinta);
  }
  .service-detail {
    font-size: 11px;
    color: var(--mut);
  }
  .service-price {
    font-family: var(--font-title);
    font-size: 14px;
    font-weight: 800;
    color: var(--lima);
    white-space: nowrap;
  }
  .cat-cta-btn {
    width: 100%;
    background: rgba(184, 255, 59, 0.12);
    border: 1px solid rgba(184, 255, 59, 0.3);
    color: var(--lima);
    font-family: var(--font-main);
    font-size: 13px;
    font-weight: 800;
    padding: 10px;
    border-radius: 999px;
    text-decoration: none;
    text-align: center;
    display: block;
    transition: all 0.25s ease;
  }
  .cat-cta-btn:hover {
    background: var(--lima);
    color: #0C120A;
    box-shadow: 0 4px 18px rgba(184, 255, 59, 0.4);
  }

  /* NAV LINK ACTIVE & FOOTER UNIFICADO */
  .btn-nav-link {
    color: var(--tinta);
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 700;
    padding: 9px 18px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    transition: all 0.25s ease;
  }
  .btn-nav-link:hover, .btn-nav-link.active {
    background: rgba(184, 255, 59, 0.12);
    border-color: var(--lima);
    color: var(--lima);
  }
  .footer-links-unified {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .footer-link {
    color: var(--mut);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
  }
  .footer-link:hover {
    color: var(--lima);
  }
  .footer-link-primary {
    color: var(--lima);
    text-decoration: none;
    font-weight: 800;
  }
`;

entrada = entrada.replace('</style>', `${cssInjection}\n  </style>`);

// 7. INJECT CATALOG JAVASCRIPT FUNCTIONS (filtrarGrupo & filtrarServicios)
const jsInjection = `
    // Filtro interactivo de las 17 categorías
    function filtrarGrupo(grupo, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = document.querySelectorAll('.cat-card');
      cards.forEach(card => {
        if (grupo === 'todos' || card.dataset.group === grupo) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Buscador interactivo en tiempo real
    function filtrarServicios() {
      const q = document.getElementById('serviceSearch').value.toLowerCase().trim();
      const cards = document.querySelectorAll('.cat-card');

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
`;

entrada = entrada.replace('</script>', `${jsInjection}\n  </script>`);

// 8. UNIFY FOOTER IN ENTRADA.HTML WITH EXACTLY 2 LINKS
const newFooter = `<footer class="site-footer" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;padding:32px 0 44px;border-top:1px solid rgba(255,255,255,0.1);gap:16px;">
    <span>© 2026 rebuske. Todos los derechos reservados · Medellín, Colombia</span>
    <div class="footer-links-unified">
      <a href="/entrada" class="footer-link">🌐 Página Web de Entrada</a>
      <span style="color:rgba(255,255,255,0.2);">·</span>
      <a href="/app" class="footer-link-primary">📱 Abrir Aplicación rebuske ➔</a>
    </div>
  </footer>`;

entrada = entrada.replace(/<footer[\s\S]*?<\/footer>/i, newFooter);

fs.writeFileSync(entradaPath, entrada, 'utf8');
console.log('entrada.html updated successfully! Size:', fs.statSync(entradaPath).size);

// Synchronize registro.html to be identical
const registroPath = path.join(projectDir, 'registro.html');
fs.writeFileSync(registroPath, entrada, 'utf8');
console.log('registro.html synchronized successfully! Size:', fs.statSync(registroPath).size);
