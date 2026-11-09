import fs from 'fs';

let html = fs.readFileSync('tarifas.html', 'utf8');

// Replace top-bar in tarifas.html
const oldHeader = `<header class="top-bar">
    <a href="/entrada" class="brand-logo" title="rebuske Medellín · Página Web Principal">
      <span class="brand-logo-dot" aria-hidden="true"></span>
      <span class="brand-name">rebuske</span>
      <span class="brand-tag">Medellín 2026</span>
    </a>
    <nav class="top-actions" aria-label="Navegación oficial">
      <a href="/entrada" class="btn-nav-link" title="Página Web de Entrada">Página Web</a>
      <a href="/app" class="btn-pill-primary sheen" title="Abrir la Aplicación rebuske">
        <span>Abrir App</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </nav>
  </header>`;

const newHeader = `<header class="top-bar" id="topBar">
    <a href="/entrada" class="brand-logo" title="rebuske Medellín · Página Web Principal">
      <div class="logo-3d-bubble pulse-c" title="Luciérnaga Rebuske 3D">
        <img src="/assets/icons/luciernaga_3d_animada.webp" alt="Luciérnaga 3D Rebuske" class="logo-3d-img">
      </div>
      <div style="display:flex;flex-direction:column;line-height:1.1;">
        <span class="brand-name">rebuske</span>
        <span class="brand-tag">Medellín 2026</span>
      </div>
    </a>
    <nav class="top-actions" aria-label="Navegación unificada">
      <a href="/entrada#quienes-somos" class="btn-nav-link" title="Quiénes Somos · Conoce nuestra historia">Quiénes somos</a>
      <a href="/entrada#nuestros-servicios" class="btn-nav-link" title="Qué Hacemos · 17 especialidades y tarifas">Qué hacemos</a>
      <a href="/entrada#contacto" class="btn-pill-primary sheen" title="Contacto y Soporte Oficial">
        <span>Contacto</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </a>
    </nav>
  </header>`;

if (html.includes(oldHeader)) {
  html = html.replace(oldHeader, newHeader);
}

// Add CSS for logo-3d-bubble if not present
if (!html.includes('.logo-3d-bubble')) {
  const bubbleCSS = `
.logo-3d-bubble {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(184, 255, 59, 0.28), rgba(12, 18, 10, 0.95));
  border: 1.5px solid rgba(184, 255, 59, 0.5);
  box-shadow: 0 0 16px rgba(184, 255, 59, 0.35), inset 0 0 10px rgba(184, 255, 59, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  animation: logoBubbleFloat 3.6s ease-in-out infinite alternate;
}
.logo-3d-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(184, 255, 59, 0.6));
}
@keyframes logoBubbleFloat {
  0% { transform: translateY(0) scale(1); box-shadow: 0 0 14px rgba(184,255,59,0.3); }
  50% { transform: translateY(-2px) scale(1.05); box-shadow: 0 0 22px rgba(184,255,59,0.6); }
  100% { transform: translateY(0) scale(1); box-shadow: 0 0 14px rgba(184,255,59,0.3); }
}
`;
  html = html.replace('</style>', bubbleCSS + '\n</style>');
}

fs.writeFileSync('tarifas.html', html, 'utf8');
console.log('tarifas.html updated successfully!');
