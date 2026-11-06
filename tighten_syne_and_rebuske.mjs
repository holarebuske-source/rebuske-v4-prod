import fs from 'fs';

const dir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

// ============================================================================
// 1. ACTUALIZAR REGISTRO.HTML
// ============================================================================
let reg = fs.readFileSync(dir + '/registro.html', 'utf8');

// Reemplazar "Rebuske" por "rebuske" (siempre con 'r' minúscula)
reg = reg.replace(/Rebuske/g, 'rebuske');

// Ajustar el titular principal específico mostrado en la captura:
// De: <span class="highlight-sweep font-black">rebuske</span>
// A: <span class="highlight-sweep font-bold">rebuske</span> con tracking ajustado
reg = reg.replace(
  'class="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight"',
  'class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 tracking-tight"'
);
reg = reg.replace('font-black', 'font-bold');

// Añadir reglas de estilización tipográfica compacta para Syne en registro.html
const tightSyneCss = `
    /* ======================================================== */
    /* AJUSTE TIPOGRÁFICO DE ANCHO Y TRACKING PARA SYNE         */
    /* ======================================================== */
    html, body {
      font-family: var(--font-display) !important;
      letter-spacing: -0.022em !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, .font-brand, .display-title {
      font-family: var(--font-display) !important;
      letter-spacing: -0.038em !important; /* Compacta el ancho natural expandido de Syne */
      font-weight: 700 !important;
      line-height: 1.15 !important;
    }

    p, span, label, input, select, button {
      letter-spacing: -0.02em !important;
    }

    .btn-primary-action, button {
      letter-spacing: -0.025em !important;
    }
`;

if (!reg.includes('AJUSTE TIPOGRÁFICO DE ANCHO Y TRACKING PARA SYNE')) {
  reg = reg.replace('</style>', tightSyneCss + '\n  </style>');
}

fs.writeFileSync(dir + '/registro.html', reg, 'utf8');
console.log('✅ registro.html: reemplazado Rebuske -> rebuske y condensado ancho de Syne (-0.038em)');

// ============================================================================
// 2. ACTUALIZAR INDEX.HTML
// ============================================================================
let idx = fs.readFileSync(dir + '/index.html', 'utf8');

// Reemplazar "Rebuske" por "rebuske"
idx = idx.replace(/Rebuske/g, 'rebuske');

// Inyectar ajuste de ancho en index-luminous-motion
const idxTightCss = `
  /* Ajuste de compacidad y proporción para Syne */
  body, button, input, select, textarea, h1, h2, h3, small {
    font-family: 'Syne', sans-serif !important;
    letter-spacing: -0.025em !important;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, .big {
    letter-spacing: -0.038em !important;
    font-weight: 700 !important;
  }
`;

if (!idx.includes('Ajuste de compacidad y proporción para Syne')) {
  idx = idx.replace('</style>\n</head>', idxTightCss + '\n</style>\n</head>');
}

fs.writeFileSync(dir + '/index.html', idx, 'utf8');
console.log('✅ index.html: reemplazado Rebuske -> rebuske y compactado ancho de Syne');

// ============================================================================
// 3. ACTUALIZAR RESTO DE PÁGINAS WEB
// ============================================================================
const others = ['pro-landing.html', 'pro.html', 'clientes-landing.html', 'clientes.html', 'reembolsos.html', 'eliminar-cuenta.html', 'terminos.html', 'privacidad.html'];

others.forEach(f => {
  const p = dir + '/' + f;
  if (!fs.existsSync(p)) return;
  let text = fs.readFileSync(p, 'utf8');
  text = text.replace(/Rebuske/g, 'rebuske');
  if (!text.includes('letter-spacing: -0.03em')) {
    text = text.replace(
      'font-family: \'Syne\', sans-serif !important;\n  }',
      `font-family: 'Syne', sans-serif !important;\n    letter-spacing: -0.025em !important;\n  }\n  h1, h2, h3 { letter-spacing: -0.038em !important; font-weight: 700 !important; }`
    );
  }
  fs.writeFileSync(p, text, 'utf8');
  console.log('✓ Rebuske -> rebuske y tracking aplicado a', f);
});
