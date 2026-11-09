import fs from 'fs';
import path from 'path';
import { SVG_ICONS } from './service_icons.mjs';
import { CATEGORIES_DATA } from './categories_data_unrounded.mjs';
import { generateRestoredFooterHTML } from './components_refined.mjs';
import { REFINED_STYLES } from './styles_refined.mjs';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';

function buildTarifasHTML() {
  return `<!DOCTYPE html>
<html lang="es-CO">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tarifario Oficial 2026 · 17 Especialidades y Precios de Referencia · rebuske Medellín</title>
  
  <meta name="description" content="Consulta los precios de referencia para los 17 servicios del hogar, educación, tecnología, vehículos y eventos en Medellín con Bóveda Wompi y Bóveda de Sesiones Progresivas.">
  <link rel="canonical" href="https://rebuske.vercel.app/tarifas">

  <!-- Open Graph -->
  <meta property="og:title" content="Tarifario Oficial 2026 · 17 Categorías · rebuske Medellín">
  <meta property="og:description" content="Precios transparentes y sistema de pago seguro en Bóveda Wompi (Bancolombia) por labor, por sesiones progresivas y por hitos.">
  <meta property="og:url" content="https://rebuske.vercel.app/tarifas">
  <meta property="og:type" content="website">

  <!-- Favicon e Iconos -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <!-- Tipografía Oficial: Plus Jakarta Sans & Baloo 2 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    :root {
      --brand-lima: #B8FF3B;
      --color-primary: #AFFF3E;
      --color-forest: #4E8839;
      --color-lemon: #D9DF36;
      --color-canary: #FFFA70;
      --color-ebony: #3E4C35;
      --ebano: #0C120A;
      --noche: #162413;
      --bosque: #4E8839;
      --lima: #B8FF3B;
      --gy: #AFFF3E;
      --canario: #FFFA70;
      --tinta: #F4FBF1;
      --mut: rgba(244, 251, 241, 0.68);
      --glass-blur: 22px;
      --glass-surface: rgba(22, 36, 19, 0.78);
      --glass-surface-hover: rgba(26, 44, 22, 0.90);
      --glass-border: rgba(255, 255, 255, 0.12);
      --glass-border-lima: rgba(184, 255, 59, 0.32);
      --glass-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-title: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background-color: var(--ebano);
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(78, 136, 57, 0.18) 0%, transparent 60%),
        radial-gradient(circle at 80% 40%, rgba(184, 255, 59, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 20% 70%, rgba(22, 36, 19, 0.6) 0%, transparent 70%);
      color: var(--mut);
      font-family: var(--font-main);
      font-size: 15.5px;
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, .brand-logo, .sec-title {
      font-family: var(--font-title);
      font-weight: 800;
      color: var(--tinta);
      line-height: 1.2;
    }

    /* Fondo bioluminiscente difuso */
    .bg-glow-layer {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 0; overflow: hidden;
    }
    .glow-orb {
      position: absolute; border-radius: 50%; filter: blur(85px); opacity: 0.22;
      animation: floatGlow 22s ease-in-out infinite alternate;
    }
    .glow-orb-1 { width: 550px; height: 550px; background: radial-gradient(circle, var(--lima) 0%, transparent 70%); top: -90px; left: -90px; }
    .glow-orb-2 { width: 650px; height: 650px; background: radial-gradient(circle, var(--bosque) 0%, transparent 70%); bottom: -140px; right: -90px; }
    .glow-orb-3 { width: 450px; height: 450px; background: radial-gradient(circle, rgba(255, 250, 112, 0.16) 0%, transparent 70%); top: 40%; left: 45%; }

    @keyframes floatGlow {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(40px, 30px) scale(1.08); }
      100% { transform: translate(-30px, 50px) scale(0.96); }
    }

    .container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 2;
    }

    /* BARRA SUPERIOR */
    .top-bar {
      position: sticky;
      top: 14px;
      max-width: 1240px;
      margin: 14px auto 28px;
      padding: 12px 24px;
      background: rgba(12, 18, 10, 0.85);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--glass-border);
      border-radius: 999px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--tinta);
    }
    .brand-logo-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--lima);
      box-shadow: 0 0 10px var(--lima);
    }
    .brand-name {
      font-family: 'Baloo 2', sans-serif;
      font-size: 24px;
      font-weight: 800;
      color: var(--tinta);
      letter-spacing: -0.02em;
    }
    .brand-tag {
      font-size: 11px;
      font-weight: 700;
      color: var(--lima);
      background: rgba(184, 255, 59, 0.12);
      padding: 2px 7px;
      border-radius: 6px;
      border: 1px solid rgba(184, 255, 59, 0.22);
    }

    .top-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-nav-link {
      color: var(--tinta);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 999px;
      border: 1px solid transparent;
      transition: all 0.2s ease;
    }
    .btn-nav-link:hover, .btn-nav-link.active {
      color: var(--lima);
      background: rgba(184, 255, 59, 0.08);
      border-color: rgba(184, 255, 59, 0.2);
    }

    .btn-pill-primary {
      background: var(--lima);
      color: #0C120A;
      font-size: 13.5px;
      font-weight: 800;
      padding: 8px 18px;
      border-radius: 999px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 0 20px rgba(184, 255, 59, 0.35);
      transition: all 0.25s ease;
      border: none;
    }
    .btn-pill-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 28px rgba(184, 255, 59, 0.55);
    }

    /* SISTEMA TRI-MODAL */
    .tri-modal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin: 28px 0 40px;
    }

    .tri-modal-card {
      background: var(--glass-surface);
      border: 1px solid var(--glass-border);
      border-radius: 18px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: all 0.25s ease;
    }
    .tri-modal-card:hover {
      border-color: rgba(184, 255, 59, 0.4);
      transform: translateY(-3px);
    }
    .tri-modal-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .tri-modal-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: rgba(184, 255, 59, 0.12);
      border: 1px solid rgba(184, 255, 59, 0.25);
      color: var(--lima);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .tri-modal-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--tinta);
    }
    .tri-modal-desc {
      font-size: 13px;
      color: var(--mut);
      line-height: 1.5;
    }

    /* REFINED STYLES IMPORTED */
    ${REFINED_STYLES}
  </style>
</head>
<body>

  <div class="bg-glow-layer" aria-hidden="true">
    <div class="glow-orb glow-orb-1"></div>
    <div class="glow-orb glow-orb-2"></div>
    <div class="glow-orb glow-orb-3"></div>
  </div>

  <!-- BARRA SUPERIOR -->
  <header class="top-bar">
    <a href="/entrada" class="brand-logo" title="rebuske Medellín · Página Web Principal">
      <span class="brand-logo-dot" aria-hidden="true"></span>
      <span class="brand-name">rebuske</span>
      <span class="brand-tag">Medellín 2026</span>
    </a>
    <nav class="top-actions" aria-label="Navegación oficial">
      <a href="/entrada" class="btn-nav-link" title="Página Web de Entrada">Página Web</a>
      <a href="/app" class="btn-pill-primary sheen" title="Abrir la Aplicación rebuske">
        <span>Abrir App</span>
        ${SVG_ICONS.arrowRight}
      </a>
    </nav>
  </header>

  <main class="container">
    <!-- HERO TARIFARIO -->
    <div style="text-align: center; max-width: 840px; margin: 20px auto 32px;">
      <span class="badge-pill" style="margin-bottom: 12px;">
        ${SVG_ICONS.shield} Catálogo Oficial de Tarifas Medellín 2026
      </span>
      <h1 class="sec-title" style="font-size: clamp(28px, 4.5vw, 42px); line-height: 1.15; margin-bottom: 14px;">
        17 Especialidades · Precios Transparentes de Referencia
      </h1>
      <p style="font-size: 16px; color: var(--mut); line-height: 1.6;">
        Valores honestos sin sorpresas ni sobrecostos. Todo pago custodiado en Bóveda Wompi (Bancolombia) y cubierto con Acta Digital de Garantía de 48 horas bajo la Ley 1480.
      </p>
    </div>

    <!-- SISTEMA TRI-MODAL DE PAGOS -->
    <div style="margin-bottom: 10px;">
      <h3 style="font-size: 18px; font-weight: 700; color: var(--tinta); margin-bottom: 6px; text-align: center;">
        Sistema Tri-Modal de Pagos
      </h3>
      <p style="font-size: 13.5px; color: var(--mut); text-align: center; max-width: 680px; margin: 0 auto 16px;">
        Adaptado a la naturaleza técnica de cada servicio para proteger tanto al residente como al profesional.
      </p>
    </div>

    <div class="tri-modal-grid">
      <div class="tri-modal-card">
        <div class="tri-modal-header">
          <div class="tri-modal-icon">${SVG_ICONS.plomeria}</div>
          <div class="tri-modal-title">1. Pago por Labor Única</div>
        </div>
        <p class="tri-modal-desc">
          El cliente deposita el valor en Bóveda Wompi antes de iniciar. Los fondos quedan congelados y solo se transfieren al técnico cuando el cliente autoriza la entrega satisfactoria.
        </p>
      </div>

      <div class="tri-modal-card" style="border-top-color: var(--canario);">
        <div class="tri-modal-header">
          <div class="tri-modal-icon" style="color: #FFFA70; border-color: rgba(255,250,112,0.3); background: rgba(255,250,112,0.1);">${SVG_ICONS.educacion}</div>
          <div class="tri-modal-title" style="color: var(--canario);">2. Bóveda de Sesiones Progresivas</div>
        </div>
        <p class="tri-modal-desc">
          Diseñado para clases particulares, tutorías académicas y Enseñanza de música: el cliente adquiere un paquete de 2 a 4 semanas y la bóveda libera el pago sesión a sesión tras confirmar asistencia. Saldo no visto 100% reembolsable.
        </p>
      </div>

      <div class="tri-modal-card">
        <div class="tri-modal-header">
          <div class="tri-modal-icon">${SVG_ICONS.construccion}</div>
          <div class="tri-modal-title">3. Proyectos por Hitos</div>
        </div>
        <p class="tri-modal-desc">
          Para remodelaciones, carpintería a medida o diseño digital: desembolsos escalonados certificados con registro fotográfico (30% inicio/materiales, 35% avance y 35% entrega final).
        </p>
      </div>
    </div>

    <!-- DIRECTORIO INTERACTIVO COMPACTO DE LAS 17 CATEGORÍAS (CON HOVER) -->
    <!-- Buscador compacto -->
    <div class="srv-search-box">
      <span class="srv-search-icon">${SVG_ICONS.search}</span>
      <input type="text" id="serviceSearch" class="srv-search-input" placeholder="Buscar labor o servicio (ej: fuga, guitarra, pintura, nevera, cerradura)..." oninput="filtrarServiciosCompactos()">
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

    <!-- Cuadrícula compacta de 17 tarjetas con hover -->
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

          <div class="srv-dropdown-pane">
            <p class="srv-dropdown-desc">
              ${cat.desc} ${cat.id === 'educacion' ? 'Incluye preparación académica y enseñanza de música con instrumentos (guitarra, piano, técnica vocal).' : ''}
            </p>
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

    <!-- Visita Diagnóstica Técnica -->
    <div class="glass" style="margin-top: 36px; padding: 24px 28px; border-radius: 20px; border: 1px solid var(--glass-border-lima); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
      <div>
        <h4 style="font-size: 16px; font-weight: 700; color: var(--tinta); margin-bottom: 4px;">
          Visita Diagnóstica Técnica en Medellín: $35.000 COP
        </h4>
        <p style="font-size: 13.5px; color: var(--mut); margin: 0;">
          El 100% de la visita diagnóstica es <strong>abonable a la labor</strong> si contratas el servicio con el especialista. Cero cobros a ciegas.
        </p>
      </div>
      <a href="/entrada#protocolo-seguridad" class="btn-nav-link" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
        <span>Ver Protocolo de Garantía</span>
        ${SVG_ICONS.arrowRight}
      </a>
    </div>
  </main>

  <!-- FOOTER CORPORATIVO Y LEGAL COMPLETO RESTAURADO -->
  ${generateRestoredFooterHTML()}

  <script>
    function filtrarServiciosCompactos() {
      const query = (document.getElementById('serviceSearch')?.value || '').toLowerCase().trim();
      const cards = document.querySelectorAll('.srv-compact-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    function filtrarGrupoSrv(grupo, btn) {
      document.querySelectorAll('.srv-filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const cards = document.querySelectorAll('.srv-compact-card');
      cards.forEach(card => {
        const cardGroup = card.getAttribute('data-group');
        if (grupo === 'todos' || cardGroup === grupo) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    function cerrarCookies() {
      const banner = document.getElementById('cookieBanner');
      if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(40px)';
        setTimeout(() => banner.style.display = 'none', 300);
      }
      localStorage.setItem('rebuske_cookies_accepted', 'config');
    }

    function aceptarCookies() {
      const banner = document.getElementById('cookieBanner');
      if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(40px)';
        setTimeout(() => banner.style.display = 'none', 300);
      }
      localStorage.setItem('rebuske_cookies_accepted', 'all');
    }

    if (localStorage.getItem('rebuske_cookies_accepted')) {
      const banner = document.getElementById('cookieBanner');
      if (banner) banner.style.display = 'none';
    }
  </script>
</body>
</html>`;
}

const tarifasContent = buildTarifasHTML();
fs.writeFileSync(path.join(projectDir, 'tarifas.html'), tarifasContent, 'utf8');
console.log('tarifas.html generado con éxito.');
console.log('Bytes escritos:', tarifasContent.length);
