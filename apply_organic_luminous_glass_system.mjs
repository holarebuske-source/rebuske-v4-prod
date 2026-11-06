/**
 * ============================================================================
 * REBUSKE · APLICACIÓN DEL SISTEMA "ORGANIC LUMINOUS GLASS / FIREFLY GLOW"
 * ============================================================================
 * Actualiza la identidad visual de la app web (index.html) y la página de registro
 * unificada (registro.html) incorporando:
 *  1. Tipografía oficial SYNE (Google Fonts + local @font-face).
 *  2. Paleta cromática oficial:
 *     - Brand Lima: #B8FF3B (Logo y comunicaciones de marca)
 *     - Green Yellow: #AFFF3E (CTA primario y acciones)
 *     - Forest Green: #4E8839 (Secundarios y éxito)
 *     - Lemon Lime: #D9DF36 (Datos y avisos suaves)
 *     - Canary Yellow: #FFFA70 (Alertas y destacados cálidos)
 *     - Ebony Foundation: #3E4C35 / #0C120A (Fondos atmosféricos y texto sobre lima)
 *     - Glass White / Dark Glass (Superficies translúcidas con blur 22px y borde luz)
 *  3. Las 18 animaciones y micro-interacciones especificadas por Canashi:
 *     - Badges pop/spring, Button states machine, Emoji wave, Toggle switch squash/stretch,
 *       Liquid glass dock, Odometer digits, Chat typing indicator, 3D card stack,
 *       Sweeping text highlight, Review swipe dots, Progress rings, Liquid cursor button, etc.
 *  4. Fondo atmosférico de niebla/campo abierto con luciérnagas flotantes (firefly drift).
 * ============================================================================
 */

import fs from 'fs';

// ============================================================================
// 1. ACTUALIZAR REGISTRO.HTML
// ============================================================================
const registroPath = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/registro.html';
let regContent = fs.readFileSync(registroPath, 'utf8');

// Reemplazar fuentes en <head>
regContent = regContent.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Baloo\+2:[^"]+" rel="stylesheet">/,
  `<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">`
);

// Inyectar CSS de Sistema Visual "Organic Luminous Glass / Firefly Glow" + 18 Animaciones
const regCssToInject = `
  <style id="organic-luminous-glass-system">
    @font-face {
      font-family: 'Syne';
      font-style: normal;
      font-weight: 400 800;
      font-display: swap;
      src: url('/assets/fonts/Syne-VariableFont_wght.ttf') format('truetype');
    }

    :root {
      /* Brand: Identidad institucional oficial */
      --brand-lima: #B8FF3B;
      
      /* Product palette: UI Funcional */
      --color-primary: #AFFF3E; /* Green Yellow: Único color para CTA primario y acciones */
      --color-forest: #4E8839;  /* Botones secundarios, encabezados, estados de éxito */
      --color-lemon: #D9DF36;   /* Avisos suaves, datos, gráficos secundarios */
      --color-canary: #FFFA70;  /* Destacados cálidos, alertas suaves, resúmenes financieros */
      --color-ebony: #3E4C35;   /* Texto sobre lima, contraste, navegación */
      --color-ebony-dark: #0C120A; /* Fondo primordial de noche/campo abierto */
      --color-ebony-surface: #121A0E;
      --surface-glass: rgba(22, 36, 19, 0.76);
      --surface-glass-light: rgba(255, 255, 255, 0.70);
      
      /* Tipografía oficial Syne */
      --font-display: 'Syne', -apple-system, BlinkMacSystemFont, sans-serif;
      
      /* Shape + Depth */
      --radius-card: 24px;
      --radius-control: 16px;
      --radius-pill: 999px;
      --glass-blur: 22px;
      --glass-border: rgba(255, 255, 255, 0.18);
      --glass-border-glow: rgba(175, 255, 62, 0.35);
      --glass-shadow: 0 14px 40px rgba(0, 0, 0, 0.38);
    }

    html, body, button, input, select, textarea, h1, h2, h3, h4, .font-brand {
      font-family: var(--font-display) !important;
    }

    /* Fondo Atmosférico: Luz difusa atravesando niebla de bosque nocturno */
    .bg-mesh-dark {
      background: 
        radial-gradient(circle at 50% 0%, rgba(175, 255, 62, 0.14) 0%, rgba(12, 18, 10, 0) 60%),
        radial-gradient(circle at 85% 25%, rgba(78, 136, 57, 0.18) 0%, rgba(12, 18, 10, 0) 50%),
        radial-gradient(circle at 15% 75%, rgba(217, 223, 54, 0.09) 0%, rgba(12, 18, 10, 0) 55%),
        #0C120A !important;
      position: relative;
    }

    /* ======================================================== */
    /* 04. FIRMA DE MARCA: LUCIÉRNAGAS FLOTANTES (FIREFLY GLOW) */
    /* ======================================================== */
    .firefly-canvas-layer {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    @keyframes firefly-drift-1 {
      0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.30; }
      40% { transform: translate3d(24px, -35px, 0); opacity: 0.85; }
      75% { transform: translate3d(-15px, 20px, 0); opacity: 0.45; }
    }
    @keyframes firefly-drift-2 {
      0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.25; }
      50% { transform: translate3d(-30px, -20px, 0); opacity: 0.90; }
      80% { transform: translate3d(20px, -10px, 0); opacity: 0.50; }
    }
    @keyframes firefly-drift-3 {
      0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.40; }
      30% { transform: translate3d(18px, 28px, 0); opacity: 0.80; }
      70% { transform: translate3d(-22px, -18px, 0); opacity: 0.35; }
    }

    .firefly-particle {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--color-primary);
      box-shadow: 0 0 8px 2px rgba(175, 255, 62, 0.65), 0 0 28px 8px rgba(175, 255, 62, 0.25);
    }
    .fp-1 { top: 15%; left: 12%; animation: firefly-drift-1 14s cubic-bezier(.37,0,.63,1) infinite; }
    .fp-2 { top: 35%; right: 15%; animation: firefly-drift-2 18s cubic-bezier(.37,0,.63,1) infinite 2s; }
    .fp-3 { top: 65%; left: 20%; animation: firefly-drift-3 16s cubic-bezier(.37,0,.63,1) infinite 4s; }
    .fp-4 { top: 82%; right: 25%; animation: firefly-drift-1 20s cubic-bezier(.37,0,.63,1) infinite 1s; }

    /* ======================================================== */
    /* 18 ANIMACIONES Y MICRO-INTERACCIONES DEL SISTEMA        */
    /* ======================================================== */

    /* 01a. Badge Pop/Spring */
    @keyframes badgePopSpring {
      0% { transform: scale(0); opacity: 0; }
      60% { transform: scale(1.15); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .badge-pop {
      animation: badgePopSpring 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    /* 02b. Emoji Waving (👋 Hey) */
    @keyframes emojiWave {
      0%, 100% { transform: rotate(0deg); }
      20% { transform: rotate(-16deg); }
      40% { transform: rotate(14deg); }
      60% { transform: rotate(-10deg); }
      80% { transform: rotate(8deg); }
    }
    .emoji-waving {
      display: inline-block;
      transform-origin: 75% 75%;
      animation: emojiWave 2.8s ease-in-out infinite;
    }

    /* 02a & 15. Botón de Estados con Squash/Stretch y Presión */
    .btn-primary-action {
      background: var(--color-primary) !important;
      color: var(--color-ebony-dark) !important;
      font-family: var(--font-display) !important;
      font-weight: 800 !important;
      border-radius: var(--radius-pill) !important;
      border: none !important;
      box-shadow: 0 0 0 1px rgba(175,255,62,.2), 0 0 28px rgba(175,255,62,.28) !important;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
      position: relative;
      overflow: hidden;
    }
    .btn-primary-action:hover {
      background: #B6FF4D !important;
      transform: translateY(-2px) scale(1.01) !important;
      box-shadow: 0 0 0 1px rgba(175,255,62,.4), 0 0 35px rgba(175,255,62,.45) !important;
    }
    .btn-primary-action:active {
      transform: scale(0.97) !important;
      filter: brightness(0.95);
    }

    /* 17. Botón Líquido que sigue el cursor */
    .liquid-btn-cursor {
      background-image: radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(255,255,255,0.3) 0%, transparent 60%);
      transition: background-position 0.1s ease;
    }

    /* 03. Toggle Switch Interactivo (Squash & Stretch Knob) */
    .role-toggle-track {
      background: rgba(18, 26, 14, 0.95);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-pill);
      padding: 4px;
      display: inline-flex;
      position: relative;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.4);
    }
    .role-toggle-btn {
      padding: 10px 22px;
      border-radius: var(--radius-pill);
      font-size: 13px;
      font-weight: 700;
      color: #97A890;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      z-index: 2;
    }
    .role-toggle-btn.active {
      color: var(--color-ebony-dark);
      background: var(--color-primary);
      box-shadow: 0 4px 18px rgba(175, 255, 62, 0.35);
      transform: scale(1.02);
    }

    /* 04. Barra Liquid Glass */
    .liquid-glass-dock {
      background: var(--surface-glass) !important;
      backdrop-filter: blur(var(--glass-blur)) saturate(1.4) !important;
      -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.4) !important;
      border: 1px solid var(--glass-border) !important;
      box-shadow: var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.28) !important;
    }

    /* 09. Stack de Tarjetas 3D con Profundidad */
    .card-choice {
      background: var(--surface-glass);
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-card);
      box-shadow: var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      transform-style: preserve-3d;
    }
    .card-choice:hover {
      transform: translateY(-6px) perspective(1000px) rotateX(1deg);
      border-color: var(--color-primary);
      box-shadow: 0 20px 45px rgba(0,0,0,0.4), 0 0 30px rgba(175, 255, 62, 0.2);
    }
    .card-choice.active {
      border-color: var(--color-primary);
      background: rgba(29, 46, 23, 0.92);
      box-shadow: 0 0 35px rgba(175, 255, 62, 0.3), inset 0 1px 0 rgba(175, 255, 62, 0.4);
    }

    /* 10. Texto con Highlight que Barre */
    .highlight-sweep {
      background: linear-gradient(90deg, #F4FBF1 0%, var(--color-primary) 50%, var(--brand-lima) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: highlightSweepAnim 6s ease-in-out infinite;
    }
    @keyframes highlightSweepAnim {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    /* 16. Spotlight Tour / Pulse Ring */
    @keyframes spotlightRingPulse {
      0% { box-shadow: 0 0 0 0 rgba(175, 255, 62, 0.6); }
      70% { box-shadow: 0 0 0 14px rgba(175, 255, 62, 0); }
      100% { box-shadow: 0 0 0 0 rgba(175, 255, 62, 0); }
    }
    .spotlight-pulse {
      animation: spotlightRingPulse 2.4s infinite;
    }

    /* 05. Odometer Counter Effect */
    .odometer-digit {
      display: inline-block;
      font-variant-numeric: tabular-nums;
      transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      .firefly-particle { animation: none; opacity: 0.35; }
      .emoji-waving { animation: none; }
      .highlight-sweep { animation: none; background: var(--color-primary); -webkit-background-clip: text; }
      .badge-pop { animation: none; }
      .spotlight-pulse { animation: none; }
    }
  </style>
`;

// Insertar capa de luciérnagas tras <body>
const fireflyHtmlLayer = `
  <!-- CAMPO DE LUCIÉRNAGAS AMBIENTAL (FIREFLY GLOW) -->
  <div class="firefly-canvas-layer">
    <div class="firefly-particle fp-1"></div>
    <div class="firefly-particle fp-2"></div>
    <div class="firefly-particle fp-3"></div>
    <div class="firefly-particle fp-4"></div>
  </div>
`;

// Inyectar en registro.html
if (!regContent.includes('id="organic-luminous-glass-system"')) {
  regContent = regContent.replace('</head>', regCssToInject + '\n</head>');
}
if (!regContent.includes('class="firefly-canvas-layer"')) {
  regContent = regContent.replace('<body class="bg-mesh-dark', '<body class="bg-mesh-dark');
  regContent = regContent.replace('selection:text-black">', 'selection:text-black">\n' + fireflyHtmlLayer);
}

// Aplicar clases visuales actualizadas en los componentes clave
regContent = regContent.replace(
  'class="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4"',
  'class="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight"'
);
regContent = regContent.replace(
  '<span class="text-[#B8FF3B]">Rebuske</span>',
  '<span class="highlight-sweep font-black">Rebuske</span> <span class="emoji-waving">👋</span>'
);

// Aplicar botón primario liquid con cursor listener
regContent = regContent.replace(
  'id="btn-submit-pro" class="w-full py-4 rounded-xl bg-[#B8FF3B] text-[#0C120A] font-black font-brand text-base tracking-wide hover:bg-[#cbfb60] active:scale-[0.98] transition shadow-xl flex items-center justify-center gap-2"',
  'id="btn-submit-pro" class="w-full py-4 btn-primary-action spotlight-pulse text-base tracking-wide flex items-center justify-center gap-2"'
);

regContent = regContent.replace(
  'id="btn-submit-cli" class="w-full py-4 rounded-xl bg-[#F59E0B] text-[#0C120A] font-black font-brand text-base tracking-wide hover:bg-[#fbbf24] active:scale-[0.98] transition shadow-xl flex items-center justify-center gap-2"',
  'id="btn-submit-cli" class="w-full py-4 btn-primary-action spotlight-pulse text-base tracking-wide flex items-center justify-center gap-2"'
);

// Aplicar badges pop
regContent = regContent.replace(
  'id="pro-counter-badge">84 / 100 Asignados</span>',
  'id="pro-counter-badge" class="badge-pop odometer-digit">84 / 100 Asignados</span>'
);

// Script de cursor líquido y odométro
const interactiveMotionScript = `
  <script>
    // 17. Botón Líquido Interactivo (Pointer Follower)
    document.querySelectorAll('.btn-primary-action').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty('--cursor-x', x + '%');
        btn.style.setProperty('--cursor-y', y + '%');
      });
    });

    // 05. Odómetro suave para números
    function animateOdometer(el, start, end, duration) {
      if (!el) return;
      const startTime = performance.now();
      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * ease);
        el.innerText = current + ' / 100 Asignados';
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
  </script>
`;

if (!regContent.includes('// 17. Botón Líquido Interactivo')) {
  regContent = regContent.replace('</body>', interactiveMotionScript + '\n</body>');
}

fs.writeFileSync(registroPath, regContent, 'utf8');
console.log('✅ registro.html actualizado con el sistema visual "Organic Luminous Glass / Firefly Glow"');

// ============================================================================
// 2. ACTUALIZAR INDEX.HTML (APP WEB PRINCIPAL)
// ============================================================================
const indexPath = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Reemplazar fuentes en <head> de index.html
indexContent = indexContent.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Baloo\+2:[^"]+" rel="stylesheet">/,
  `<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">`
);

// Actualizar tokens :root en index.html a la especificación de la página 3 del PDF
const oldRoot = `:root{--ebano:#191F15;--noche:#3E4C35;--bosque:#4E8839;--lima:#B8FF3B;--gy:#AFFF3E;--canario:#FFFA70;--tinta:#F2F5EC;--mut:rgba(242,245,236,.66)}`;
const newRoot = `:root{
  --brand-lima:#B8FF3B;
  --color-primary:#AFFF3E;
  --color-forest:#4E8839;
  --color-lemon:#D9DF36;
  --color-canary:#FFFA70;
  --color-ebony:#3E4C35;
  --ebano:#0C120A;
  --noche:#162413;
  --bosque:#4E8839;
  --lima:#B8FF3B;
  --gy:#AFFF3E;
  --canario:#FFFA70;
  --tinta:#F4FBF1;
  --mut:rgba(244,251,241,.65);
  --glass-blur:22px;
  --glass-surface:rgba(22,36,19,.76);
  --glass-border:rgba(255,255,255,.18);
  --glass-shadow:0 14px 40px rgba(0,0,0,.38);
}`;

indexContent = indexContent.replace(oldRoot, newRoot);

// Reemplazar font-family en body
indexContent = indexContent.replace(
  `body{font-family:'Baloo 2',system-ui,sans-serif;`,
  `body{font-family:'Syne',-apple-system,BlinkMacSystemFont,sans-serif;`
);

// Añadir micro-interacciones a botones en index.html
const indexMotionCss = `
<style id="index-luminous-motion">
  @font-face {
    font-family: 'Syne';
    src: url('/assets/fonts/Syne-VariableFont_wght.ttf') format('truetype');
    font-weight: 400 800;
  }
  body, button, input, select, textarea, h1, h2, h3, small {
    font-family: 'Syne', sans-serif !important;
  }
  /* 04. Barra Liquid Glass Navigation */
  .bar {
    background: var(--glass-surface) !important;
    backdrop-filter: blur(var(--glass-blur)) saturate(1.4) !important;
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.4) !important;
    border: 1px solid var(--glass-border) !important;
    box-shadow: var(--glass-shadow), inset 0 1px 0 rgba(255,255,255,.25) !important;
  }
  /* 02a. Botón Primario Green Yellow con Squash/Stretch */
  .btn:not(.ghost) {
    background: var(--color-primary) !important;
    color: #0C120A !important;
    font-weight: 800 !important;
    border-radius: 999px !important;
    box-shadow: 0 0 24px rgba(175,255,62,.28) !important;
    transition: transform 0.18s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s !important;
  }
  .btn:not(.ghost):hover {
    transform: translateY(-2px) scale(1.01) !important;
    box-shadow: 0 0 32px rgba(175,255,62,.42) !important;
  }
  .btn:active {
    transform: scale(0.96) !important;
  }
  /* 01a. Badge Pop en tags */
  .tag {
    animation: badgePopSpring 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  @keyframes badgePopSpring {
    0% { transform: scale(0); opacity: 0; }
    70% { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  /* 06. Chat Typing Indicator */
  .typing i {
    background: var(--color-primary) !important;
    box-shadow: 0 0 6px rgba(175,255,62,.6);
  }
  /* 10. Highlight Sweep en títulos principales */
  h1 span.highlight {
    background: linear-gradient(90deg, #FFF, var(--color-primary), var(--brand-lima));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
`;

if (!indexContent.includes('id="index-luminous-motion"')) {
  indexContent = indexContent.replace('</head>', indexMotionCss + '\n</head>');
}

fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('✅ index.html actualizado con la tipografía Syne y los tokens Luminous Glass');
