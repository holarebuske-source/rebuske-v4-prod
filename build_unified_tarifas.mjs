import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const filePath = path.join(projectDir, 'tarifas.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Re-skin the <style> block of tarifas.html with App tokens, Baloo 2 + Plus Jakarta Sans, and .glass cards
const newCSS = `
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
      --font-title: 'Baloo 2', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background-color: var(--ebano);
      color: var(--mut);
      font-family: var(--font-main);
      font-size: 15.5px;
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, .brand-logo, .sec-title, .cat-title, .hero-title, .conditions-title {
      font-family: var(--font-title);
      font-weight: 700;
      color: var(--tinta);
      line-height: 1.2;
    }

    /* Fondo bioluminiscente con orbes */
    .bg-glow-layer {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 0; overflow: hidden;
    }
    .glow-orb {
      position: absolute; border-radius: 50%; filter: blur(95px); opacity: 0.22;
      animation: floatGlow 22s ease-in-out infinite alternate;
    }
    .glow-orb-1 { width: 550px; height: 550px; background: radial-gradient(circle, var(--lima) 0%, transparent 70%); top: -90px; left: -90px; }
    .glow-orb-2 { width: 650px; height: 650px; background: radial-gradient(circle, var(--bosque) 0%, transparent 70%); bottom: -140px; right: -90px; }
    .glow-orb-3 { width: 450px; height: 450px; background: radial-gradient(circle, var(--noche) 0%, transparent 70%); top: 40%; left: 45%; opacity: 0.15; }

    @keyframes floatGlow {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(30px, 40px) scale(1.08); }
      100% { transform: translate(-20px, -30px) scale(0.96); }
    }

    .container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 2;
    }

    /* BARRA SUPERIOR UNIFICADA CON EXACTAMENTE 2 ENLACES */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 28px;
      background: rgba(12, 18, 10, 0.85);
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--glass-border);
      border-radius: 999px;
      margin: 20px auto 36px;
      position: sticky;
      top: 16px;
      z-index: 100;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      max-width: 1240px;
    }

    .brand-logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--tinta);
      font-size: 20px;
      font-weight: 800;
    }

    .brand-logo-dot {
      width: 10px;
      height: 10px;
      background: var(--lima);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--lima);
    }

    .brand-tag {
      font-size: 11px;
      color: var(--lima);
      font-weight: 700;
      background: rgba(184, 255, 59, 0.12);
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(184, 255, 59, 0.25);
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

    .btn-pill-primary {
      background: linear-gradient(100deg, #AFFF3E 30%, #EEFFC2 50%, #AFFF3E 70%);
      background-size: 220% 100%;
      color: #0C120A;
      font-family: var(--font-main);
      font-size: 13.5px;
      font-weight: 800;
      padding: 9px 20px;
      border-radius: 999px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 6px 20px rgba(184, 255, 59, 0.35);
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .btn-pill-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(184, 255, 59, 0.5);
    }

    .sheen {
      animation: sheen 4.5s ease-in-out infinite;
    }

    @keyframes sheen {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    /* HERO */
    .hero-header {
      text-align: center;
      padding: 40px 0 32px;
      max-width: 860px;
      margin: 0 auto;
    }

    .hero-tag {
      display: inline-block;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--lima);
      background: rgba(184, 255, 59, 0.12);
      border: 1px solid rgba(184, 255, 59, 0.28);
      padding: 5px 14px;
      border-radius: 999px;
      margin-bottom: 16px;
    }

    .hero-title {
      font-size: clamp(32px, 5vw, 48px);
      margin-bottom: 14px;
      letter-spacing: -0.01em;
    }

    .hero-desc {
      font-size: 16.5px;
      color: var(--mut);
      line-height: 1.6;
    }

    /* SISTEMA TRI-MODAL CARD */
    .payment-modalities-card {
      background: var(--glass-surface);
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--glass-border-lima);
      border-radius: 24px;
      padding: 32px 28px;
      margin-bottom: 40px;
      box-shadow: var(--glass-shadow);
    }

    .badge-sesiones {
      display: inline-block;
      background: rgba(255, 250, 112, 0.15);
      color: var(--canario);
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 12px;
      border-radius: 999px;
      border: 1px solid rgba(255, 250, 112, 0.3);
      margin-bottom: 12px;
    }

    .modalities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 24px;
    }

    .modality-box {
      background: rgba(12, 18, 10, 0.7);
      border: 1px solid var(--glass-border);
      border-radius: 18px;
      padding: 20px;
      transition: all 0.3s ease;
    }

    .modality-box:hover {
      border-color: rgba(184, 255, 59, 0.35);
      transform: translateY(-3px);
    }

    .mod-icon {
      font-size: 26px;
      margin-bottom: 10px;
      display: inline-block;
    }

    .mod-title {
      font-family: var(--font-title);
      font-size: 17px;
      font-weight: 700;
      color: var(--tinta);
      margin-bottom: 6px;
    }

    .mod-desc {
      font-size: 13.5px;
      color: var(--mut);
      line-height: 1.5;
    }

    /* FILTROS INTERACTIVOS */
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
      font-size: 13.5px;
      font-weight: 700;
      padding: 9px 18px;
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

    /* BUSCADOR */
    .search-wrap {
      max-width: 520px;
      margin: 0 auto 36px;
      position: relative;
    }

    .search-input {
      width: 100%;
      background: rgba(22, 36, 19, 0.85);
      border: 1px solid var(--glass-border);
      border-radius: 999px;
      padding: 13px 24px;
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

    /* GRID DE CATEGORÍAS */
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 26px;
      margin-bottom: 50px;
    }

    .cat-card {
      background: var(--glass-surface);
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--glass-border);
      border-radius: 22px;
      padding: 24px;
      box-shadow: var(--glass-shadow);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }

    .cat-card:hover {
      border-color: rgba(184, 255, 59, 0.35);
      transform: translateY(-4px);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(184, 255, 59, 0.1);
    }

    .cat-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .cat-title {
      font-size: 19px;
      font-weight: 700;
      color: var(--tinta);
      margin-bottom: 4px;
    }

    .cat-desc {
      font-size: 13px;
      color: var(--mut);
      line-height: 1.45;
    }

    .cat-mod-badge {
      font-size: 10px;
      color: var(--lima);
      background: rgba(184, 255, 59, 0.1);
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(184, 255, 59, 0.2);
      white-space: nowrap;
      margin-left: 8px;
    }

    .service-table {
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex: 1;
      margin-bottom: 18px;
    }

    .service-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: rgba(12, 18, 10, 0.6);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      gap: 12px;
    }

    .service-name {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--tinta);
    }

    .service-detail {
      font-size: 11.5px;
      color: var(--mut);
    }

    .service-price {
      font-family: var(--font-title);
      font-size: 15px;
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
      font-size: 13.5px;
      font-weight: 800;
      padding: 11px;
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

    /* CONDICIONES GENERALES */
    .conditions-card {
      background: var(--glass-surface);
      backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--glass-border);
      border-radius: 22px;
      padding: 28px;
      margin-bottom: 40px;
    }

    .conditions-title {
      font-size: 20px;
      color: var(--tinta);
      margin-bottom: 12px;
    }

    .conditions-text {
      font-size: 14px;
      line-height: 1.7;
      color: var(--mut);
    }

    .conditions-text strong {
      color: var(--lima);
    }

    /* FOOTER CON EXACTAMENTE 2 ENLACES */
    .site-footer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 24px 0 40px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 13px;
      color: var(--mut);
      gap: 16px;
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

// Replace <style>...</style> in tarifas.html
content = content.replace(/<style>[\s\S]*?<\/style>/i, `<style>${newCSS}\n  </style>`);

// Replace header in tarifas.html with exact 2 links
const newHeader = `<header class="top-bar" id="topBar">
      <a href="/entrada" class="brand-logo" title="rebuske Medellín · Inicio">
        <span class="brand-logo-dot pulse-c" aria-hidden="true"></span>
        <span>rebuske</span>
        <span class="brand-tag">Medellín 2026</span>
      </a>
      <nav class="top-actions" aria-label="Navegación unificada">
        <a href="/entrada" class="btn-nav-link" title="Ir a la Página Web de Entrada">🌐 Página Web</a>
        <a href="/app" class="btn-pill-primary sheen" title="Abrir la Aplicación rebuske">📱 Abrir App ➔</a>
      </nav>
    </header>`;

content = content.replace(/<header class=[\"']top-bar[\"']>[\s\S]*?<\/header>/i, newHeader);

// In each article.cat-card, ensure CTA button links to /app
content = content.replace(/<\/article>/g, `  <a href="/app" class="cat-cta-btn">Solicitar en la App ➔</a>\n        </article>`);

// Replace footer with exact 2 links
const newFooter = `<footer class="site-footer">
      <span>© 2026 rebuske. Todos los derechos reservados · Medellín, Colombia</span>
      <div class="footer-links-unified">
        <a href="/entrada" class="footer-link">🌐 Página Web de Entrada</a>
        <span style="color:rgba(255,255,255,0.2);">·</span>
        <a href="/app" class="footer-link-primary">📱 Abrir Aplicación rebuske ➔</a>
      </div>
    </footer>`;

content = content.replace(/<footer class=[\"']site-footer[\"']>[\s\S]*?<\/footer>/i, newFooter);

fs.writeFileSync(filePath, content, 'utf8');
console.log('tarifas.html successfully rebuilt and styled like the App! File size:', fs.statSync(filePath).size);
