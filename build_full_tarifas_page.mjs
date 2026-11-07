import fs from 'fs';
import path from 'path';
import { SERVICIOS_17 } from './matriz_17_servicios.mjs';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

const htmlTarifas = `<!DOCTYPE html>
<html lang="es-CO">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tarifario Oficial 2026 · 17 Categorías y Precios de Referencia · rebuske Medellín</title>
  <meta name="description" content="Consulta los precios de referencia para los 17 servicios del hogar, educación, tecnología, vehículos y eventos en Medellín con Bóveda Wompi y Bóveda de Sesiones Progresivas." />
  <link rel="canonical" href="https://rebuske.vercel.app/tarifas">

  <!-- Open Graph -->
  <meta property="og:title" content="Tarifario Oficial 2026 · 17 Categorías · rebuske Medellín">
  <meta property="og:description" content="Precios transparentes y sistema de pago seguro en Bóveda Wompi (Bancolombia) por labor, por sesiones progresivas y por hitos.">
  <meta property="og:url" content="https://rebuske.vercel.app/tarifas">
  <meta property="og:type" content="website">

  <!-- Favicon e Iconos -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- Tipografía Unificada Syne (Compactada para evitar deformación de ancho) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg-dark: #050A05;
      --bg-surface: #0B140B;
      --bg-card: rgba(10, 20, 10, 0.72);
      --bg-card-hover: rgba(14, 28, 14, 0.90);
      --border-subtle: rgba(255, 255, 255, 0.12);
      --border-neon: rgba(124, 255, 26, 0.28);
      --accent-neon: #3CFF2E;
      --accent-neon-bright: #7BFF1A;
      --accent-warm: #FFD35C;
      --text-white: #F2F5EE;
      --text-gray: #B4BDAE;
      --font-main: 'Syne', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --glow-card: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(60, 255, 46, 0.08);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background-color: var(--bg-dark);
      color: var(--text-gray);
      font-family: var(--font-main) !important;
      letter-spacing: -0.025em !important;
      font-size: 15.5px;
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, .brand-logo, .sec-title, .cat-title {
      font-family: var(--font-main) !important;
      letter-spacing: -0.038em !important;
      font-weight: 700 !important;
      line-height: 1.15 !important;
    }

    p, span, label, input, select, button, .service-name, .service-price, .service-detail {
      letter-spacing: -0.02em !important;
    }

    .bg-glow-layer {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 0; overflow: hidden;
    }
    .glow-orb {
      position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.18;
      animation: floatGlow 24s ease-in-out infinite alternate;
    }
    .glow-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, var(--accent-neon) 0%, transparent 70%); top: -80px; left: -80px; }
    .glow-orb-2 { width: 600px; height: 600px; background: radial-gradient(circle, #1a4d1a 0%, transparent 70%); bottom: -120px; right: -80px; }
    @keyframes floatGlow {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(50px, 40px) scale(1.08); }
    }

    .container-wrap {
      position: relative; z-index: 1; max-width: 1140px; margin: 0 auto; padding: 24px 20px 100px;
    }

    /* TOP BAR */
    .top-bar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 0 24px; border-bottom: 1px solid var(--border-neon);
      margin-bottom: 32px;
    }
    .brand-logo {
      display: flex; align-items: center; gap: 10px; text-decoration: none;
      color: var(--text-white); font-size: 19px;
    }
    .brand-logo-dot {
      width: 10px; height: 10px; background: var(--accent-neon); border-radius: 50%;
      box-shadow: 0 0 10px var(--accent-neon);
    }
    .nav-actions { display: flex; align-items: center; gap: 10px; }
    .btn-pill-sec {
      padding: 8px 18px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.04); color: var(--text-white); text-decoration: none;
      font-size: 13.5px; font-weight: 600; transition: all 0.2s ease;
    }
    .btn-pill-sec:hover { border-color: var(--accent-neon); color: var(--accent-neon); transform: translateY(-2px); }
    .btn-pill-primary {
      padding: 8px 20px; border-radius: 999px; border: none; background: #FFFFFF;
      color: #050A05; text-decoration: none; font-size: 13.5px; font-weight: 700;
      transition: all 0.2s ease;
    }
    .btn-pill-primary:hover { box-shadow: 0 4px 18px rgba(60,255,46,0.35); transform: translateY(-2px); }

    /* HERO */
    .hero-header { text-align: center; margin-bottom: 40px; }
    .hero-tag {
      display: inline-block; font-size: 12px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.12em !important; color: var(--accent-neon); margin-bottom: 8px;
    }
    .hero-title {
      font-size: clamp(30px, 4.5vw, 46px); color: var(--text-white); margin-bottom: 12px;
    }
    .hero-desc {
      font-size: 16px; color: var(--text-gray); max-width: 780px; margin: 0 auto;
    }

    /* CARD DESTACADA: SISTEMA TRI-MODAL DE PAGO */
    .payment-modalities-card {
      background: var(--bg-card); border: 1.5px solid var(--border-neon); border-radius: 24px;
      padding: 32px 28px; margin-bottom: 44px; backdrop-filter: blur(14px);
      box-shadow: var(--glow-card);
    }
    .payment-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 24px;
    }
    @media (max-width: 860px) {
      .payment-grid { grid-template-columns: 1fr; }
    }
    .payment-col {
      background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 18px;
      padding: 22px 18px; transition: border-color 0.2s ease;
    }
    .payment-col:hover { border-color: var(--accent-neon); }
    .payment-col-title {
      font-size: 17px; font-weight: 700; color: var(--text-white); margin-bottom: 8px;
      display: flex; align-items: center; gap: 8px;
    }
    .payment-col-desc { font-size: 13.5px; color: var(--text-gray); line-height: 1.55; }
    .badge-sesiones {
      display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 10px;
      border-radius: 999px; background: rgba(255,211,92,0.15); border: 1px solid var(--accent-warm);
      color: var(--accent-warm); margin-bottom: 8px;
    }

    /* BUSCADOR Y FILTROS */
    .filter-bar {
      display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px;
    }
    .filter-btn {
      padding: 8px 16px; border-radius: 999px; background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.15); color: var(--text-white); font-size: 13px;
      font-weight: 600; cursor: pointer; transition: all 0.2s ease;
    }
    .filter-btn:hover, .filter-btn.active {
      background: rgba(60,255,46,0.12); border-color: var(--accent-neon); color: var(--accent-neon);
    }
    .search-box {
      max-width: 500px; margin: 0 auto 36px; position: relative;
    }
    .search-input {
      width: 100%; height: 48px; border-radius: 999px; background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.2); padding: 0 20px 0 44px; color: #fff;
      font-size: 14.5px; font-family: inherit; outline: none; transition: border-color 0.2s ease;
    }
    .search-input:focus { border-color: var(--accent-neon); box-shadow: 0 0 16px rgba(60,255,46,0.25); }
    .search-icon { position: absolute; left: 18px; top: 15px; font-size: 16px; color: var(--accent-neon); }

    /* TARJETAS DE CATEGORÍA (17 BLOQUES) */
    .categories-wrap { display: flex; flex-direction: column; gap: 32px; }
    .cat-card {
      background: var(--bg-card); border: 1px solid var(--border-neon); border-radius: 22px;
      padding: 28px; backdrop-filter: blur(12px); box-shadow: var(--glow-card);
      transition: transform 0.25s ease, border-color 0.25s ease;
    }
    .cat-card:hover { transform: translateY(-3px); border-color: var(--accent-neon-bright); }
    .cat-header {
      display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;
      gap: 12px; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .cat-title {
      font-size: 22px; font-weight: 700; color: var(--text-white); display: flex; align-items: center; gap: 10px;
    }
    .cat-mod-badge {
      font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 999px;
      background: rgba(60,255,46,0.08); border: 1px solid rgba(60,255,46,0.3); color: var(--accent-neon);
    }
    .cat-desc { font-size: 14px; color: var(--text-gray); margin-top: 4px; }

    /* TABLA DE SUBSERVICIOS */
    .service-table { width: 100%; border-collapse: collapse; }
    .service-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 10px; border-bottom: 1px solid rgba(255,255,255,0.05);
      border-radius: 8px; transition: background 0.2s ease;
    }
    .service-row:hover { background: rgba(60,255,46,0.04); }
    .service-row:last-child { border-bottom: none; }
    .service-name { font-size: 15px; font-weight: 600; color: var(--text-white); margin-bottom: 2px; }
    .service-detail { font-size: 12.5px; color: var(--text-gray); }
    .service-price-wrap { text-align: right; flex-shrink: 0; margin-left: 16px; }
    .service-price { font-size: 16px; font-weight: 700; color: var(--accent-neon); }

    /* VISITA Y CONDICIONES */
    .conditions-card {
      margin-top: 40px; background: rgba(14,28,14,0.6); border: 1px solid rgba(255,211,92,0.3);
      border-radius: 20px; padding: 24px; text-align: center;
    }
    .conditions-title { font-size: 18px; font-weight: 700; color: var(--accent-warm); margin-bottom: 8px; }
    .conditions-text { font-size: 14px; color: var(--text-gray); max-width: 820px; margin: 0 auto; line-height: 1.6; }

    /* FOOTER */
    .site-footer {
      margin-top: 60px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08);
      font-size: 13px; color: var(--text-gray); display: flex; justify-content: space-between;
      flex-wrap: wrap; gap: 12px;
    }
  </style>
</head>
<body>

  <div class="bg-glow-layer" aria-hidden="true">
    <div class="glow-orb glow-orb-1"></div>
    <div class="glow-orb glow-orb-2"></div>
  </div>

  <div class="container-wrap">
    
    <!-- TOP BAR -->
    <header class="top-bar">
      <a href="/entrada" class="brand-logo">
        <span class="brand-logo-dot" aria-hidden="true"></span>
        <span>rebuske Medellín 2026</span>
      </a>
      <div class="nav-actions">
        <a href="/registro/tecnico" class="btn-pill-sec">Soy Profesional</a>
        <a href="/registro/cliente" class="btn-pill-primary">Registro Cliente</a>
      </div>
    </header>

    <!-- HERO -->
    <section class="hero-header">
      <span class="hero-tag">Tarifario Integral 2026 · Valle de Aburrá</span>
      <h1 class="hero-title">17 Categorías · Precios Transparentes de Referencia</h1>
      <p class="hero-desc">
        En rebuske erradicamos las sorpresas y cobros a ciegas en Medellín. Conoce los valores de referencia del mercado para hogares, educación, tecnología, vehículos, eventos y servicios profesionales con pago protegido en Bóveda Wompi (Bancolombia).
      </p>
    </section>

    <!-- SISTEMA TRI-MODAL DE PAGOS EN BÓVEDA WOMPI -->
    <section class="payment-modalities-card">
      <div style="text-align:center;">
        <span class="badge-sesiones">FinTech Bancolombia Escrow</span>
        <h2 style="font-size:24px;color:#fff;margin-bottom:8px;">Sistema Tri-Modal de Pagos Protegidos en Bóveda Wompi</h2>
        <p style="font-size:14px;color:var(--text-gray);max-width:760px;margin:0 auto;">
          Diseñado para resolver con total transparencia tanto reparaciones inmediatas como procesos formativos y de acompañamiento:
        </p>
      </div>

      <div class="payment-grid">
        <!-- Modalidad 1: Por Labor Única -->
        <div class="payment-col">
          <div class="payment-col-title">
            <span>🛠️</span> 1. Pago por Labor Única
          </div>
          <p class="payment-col-desc">
            <strong>Para:</strong> Plomería, cerrajería express, electricidad puntual o aseo por jornada.<br><br>
            <strong>Mecanismo:</strong> El 100% del valor se deposita en Bóveda Wompi antes de iniciar. Solo se libera al técnico cuando revises el trabajo finalizado y firmes el Acta Digital de Garantía de 48 horas.
          </p>
        </div>

        <!-- Modalidad 2: Bóveda de Sesiones Progresivas -->
        <div class="payment-col" style="border-color:rgba(255,211,92,0.4);background:rgba(20,25,12,0.6);">
          <div class="payment-col-title" style="color:var(--accent-warm);">
            <span>🎓</span> 2. Bóveda de Sesiones Progresivas
          </div>
          <p class="payment-col-desc">
            <strong>Para:</strong> Clases de música, refuerzo escolar, idiomas, terapias y entrenamiento.<br><br>
            <strong>Mecanismo:</strong> Nadie aprende en un solo día; los procesos duran 2 a 4 semanas. Pagas el pack en Bóveda Wompi. Tras cada clase dictada y confirmada en la app, <strong>se libera automáticamente la fracción de esa sesión al profesor</strong>. El saldo no visto siempre queda 100% protegido y reembolsable.
          </p>
        </div>

        <!-- Modalidad 3: Hitos de Proyecto -->
        <div class="payment-col">
          <div class="payment-col-title">
            <span>📐</span> 3. Proyectos por Hitos
          </div>
          <p class="payment-col-desc">
            <strong>Para:</strong> Remodelación, construcción, desarrollo web y producción de eventos.<br><br>
            <strong>Mecanismo:</strong> Desembolsos escalonados certificados: <strong>30% inicio/materiales</strong>, <strong>35% avance 50%</strong> verificado con fotos de peritaje y <strong>35% entrega final</strong> a satisfacción.
          </p>
        </div>
      </div>
    </section>

    <!-- BUSCADOR -->
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input type="text" id="serviceSearch" class="search-input" placeholder="Buscar labor o servicio (ej: guitarra, fuga, pintura, nevera)..." oninput="filtrarServicios()">
    </div>

    <!-- FILTROS DE CATEGORÍA -->
    <div class="filter-bar">
      <button class="filter-btn active" onclick="filtrarGrupo('todos', this)">Todas las 17 Categorías</button>
      <button class="filter-btn" onclick="filtrarGrupo('hogar', this)">🏠 Hogar & Reparaciones</button>
      <button class="filter-btn" onclick="filtrarGrupo('educacion', this)">🎓 Clases & Educación</button>
      <button class="filter-btn" onclick="filtrarGrupo('tecnologia', this)">💻 Tecnología & Electro</button>
      <button class="filter-btn" onclick="filtrarGrupo('transporte', this)">🚗 Autos & Mudanzas</button>
      <button class="filter-btn" onclick="filtrarGrupo('digital', this)">🚀 Digital & Diseño</button>
      <button class="filter-btn" onclick="filtrarGrupo('bienestar', this)">💆 Belleza & Cuidado</button>
      <button class="filter-btn" onclick="filtrarGrupo('eventos', this)">🎉 Eventos</button>
      <button class="filter-btn" onclick="filtrarGrupo('profesional', this)">⚖️ Servicios Profesionales</button>
    </div>

    <!-- CONTENEDOR DE LAS 17 CATEGORÍAS -->
    <div class="categories-wrap" id="categoriesWrap">
      ${SERVICIOS_17.map(cat => `
        <article class="cat-card" data-group="${cat.categoriaGrupo}" data-id="${cat.id}">
          <div class="cat-header">
            <div>
              <h2 class="cat-title">
                <span>${cat.icon}</span> ${cat.numero}. ${cat.nombre}
              </h2>
              <p class="cat-desc">${cat.descripcion}</p>
            </div>
            <span class="cat-mod-badge">Modalidad: ${cat.modalidadPago}</span>
          </div>

          <div class="service-table">
            ${cat.items.map(item => `
              <div class="service-row">
                <div>
                  <div class="service-name">${item.nombre}</div>
                  <div class="service-detail">${item.detalle}</div>
                </div>
                <div class="service-price-wrap">
                  <div class="service-price">${item.precio}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </article>
      `).join('')}
    </div>

    <!-- CONDICIONES GENERALES -->
    <section class="conditions-card">
      <h3 class="conditions-title">Condiciones Generales y Garantía de Servicio en Medellín</h3>
      <p class="conditions-text">
        <strong>Visita diagnóstica en sitio:</strong> $35.000 COP (100% abonable al valor final de la labor si decides contratar el servicio con el profesional).<br>
        <strong>Garantía Escrita:</strong> Todos los servicios cuentan con Acta Digital de Garantía de 48 horas bajo la Ley 1480 de 2011.<br>
        <strong>Seguridad:</strong> Pagos custodiados en Bóveda Wompi (Bancolombia). Prohibido el manejo de efectivo riesgoso en la calle.
      </p>
    </section>

    <!-- FOOTER -->
    <footer class="site-footer">
      <span>© 2026 rebuske. Todos los derechos reservados · Medellín, Colombia</span>
      <div>
        <a href="/entrada" style="color:var(--accent-neon);text-decoration:none;margin-right:16px;">Portal /entrada</a>
        <a href="/terminos" style="color:var(--text-gray);text-decoration:none;margin-right:16px;">Términos</a>
        <a href="/privacidad" style="color:var(--text-gray);text-decoration:none;">Privacidad</a>
      </div>
    </footer>

  </div>

  <script>
    // Filtro interactivo por grupos de categoría
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
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(baseDir, 'tarifas.html'), htmlTarifas, 'utf8');
console.log('✅ tarifas.html reconstruido exitosamente con los 17 servicios y el Sistema Tri-Modal de Pagos.');
