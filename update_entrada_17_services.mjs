import fs from 'fs';
import path from 'path';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

['entrada.html', 'registro.html'].forEach(f => {
  const p = path.join(baseDir, f);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');

  // Actualizar Sección 4: Añadir banner de los 17 servicios con enlace a /tarifas
  const banner17 = `
    <!-- Banner de Acceso al Catálogo de 17 Servicios -->
    <div style="background:rgba(60,255,46,0.06);border:1px solid rgba(60,255,46,0.3);border-radius:18px;padding:18px 24px;margin-bottom:28px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
      <div>
        <span style="font-size:12px;font-weight:700;color:var(--accent-warm);text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:4px;">Catálogo Expandido Medellín 2026</span>
        <h4 style="font-size:18px;color:#fff;margin:0;">17 Categorías y 85 Servicios Profesionales</h4>
        <p style="font-size:13.5px;color:var(--text-gray);margin:2px 0 0;">Plomería, electricidad, clases de música y educación, carpintería, mudanzas, tecnología, estética, eventos y más.</p>
      </div>
      <a href="/tarifas" class="btn-pill-primary" style="padding:8px 20px;font-size:13px;white-space:nowrap;">
        Ver Tarifario Completo (17) ➔
      </a>
    </div>
  `;

  if (!content.includes('17 Categorías y 85 Servicios Profesionales')) {
    content = content.replace(
      '<div class="services-grid">',
      banner17 + '\n    <div class="services-grid">'
    );
  }

  // Actualizar Sección 6: Pago Protegido con el Sistema Tri-Modal (incluyendo Bóveda de Sesiones Progresivas)
  const triModalTrust = `
    <div class="trust-cards-grid">
      <div class="trust-card elevate-hover reveal-cascade stagger-1">
        <div class="trust-card-icon pulse-c" aria-hidden="true">🛠️</div>
        <h3 class="trust-card-title">1. Por Labor Única (Escrow 100%)</h3>
        <p class="trust-card-desc">Para reparaciones del hogar: el valor queda custodiado en Bóveda Wompi y solo se desembolsa al técnico tras tu visto bueno y firma del acta de 48h.</p>
      </div>

      <div class="trust-card elevate-hover reveal-cascade stagger-2" style="border-color:rgba(255,211,92,0.45);background:rgba(20,28,14,0.75);">
        <div class="trust-card-icon pulse-c" aria-hidden="true">🎓</div>
        <h3 class="trust-card-title" style="color:var(--accent-warm);">2. Bóveda de Sesiones Progresivas</h3>
        <p class="trust-card-desc">Para clases de música, refuerzo académico o idiomas: nadie aprende en un día. Pagas el pack en Bóveda y se libera clase a clase tras validar cada asistencia. Saldo no visto 100% reembolsable.</p>
      </div>

      <div class="trust-card elevate-hover reveal-cascade stagger-3">
        <div class="trust-card-icon pulse-c" aria-hidden="true">📐</div>
        <h3 class="trust-card-title">3. Proyectos por Hitos Certificados</h3>
        <p class="trust-card-desc">Para remodelaciones, construcción o desarrollo web: desembolsos escalonados (30% inicio/materiales, 35% avance al 50% verificado y 35% entrega final a satisfacción).</p>
      </div>
    </div>
  `;

  if (content.includes('<div class="trust-cards-grid">')) {
    content = content.replace(
      /<div class="trust-cards-grid">[\s\S]*?<\/div>\s*<\/section>/,
      triModalTrust + '\n  </section>'
    );
  }

  fs.writeFileSync(p, content, 'utf8');
  console.log(`✅ ${f}: actualizado con catálogo de 17 servicios y Sistema Tri-Modal de pagos.`);
});
