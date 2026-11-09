import fs from 'fs';

let code = fs.readFileSync('components_refined.mjs', 'utf8');

// 1. Centrar el texto en generateUnifiedServicesAndTarifarioHTML
code = code.replace(
  /<p class="sec-desc" style="font-size: 16px; color: var\(--mut\); line-height: 1\.6;">\s*Consulta las 17 especialidades/g,
  '<p class="sec-desc" style="font-size: 16px; color: var(--mut); line-height: 1.6; text-align: center !important; margin: 0 auto 20px auto !important; max-width: 820px; display: block;">\n        Consulta las 17 especialidades'
);

// 2. Agregar id="contacto" al footer oficial
code = code.replace(
  '<footer class="site-footer">',
  '<footer class="site-footer" id="contacto">'
);

// 3. Agregar generateQuienesSomosHTML si no existe
if (!code.includes('generateQuienesSomosHTML')) {
  const quienesSomosFn = `
// ============================================================================
// 4. GENERADOR DE SECCIÓN QUIÉNES SOMOS (CAMILO ESCOBAR, 93% NETO, WOMPI)
// ============================================================================
export function generateQuienesSomosHTML() {
  return \`
  <!-- ==========================================================================
       QUIÉNES SOMOS · ORIGEN, EQUIPO Y DIGNIDAD TÉCNICA EN MEDELLÍN
       ========================================================================== -->
  <section class="section-wrap" id="quienes-somos" style="padding-top: 60px;">
    <div class="sec-header reveal-cascade" style="text-align: center; max-width: 820px; margin: 0 auto 36px;">
      <span class="badge-pill" style="margin-bottom: 12px;">
        \${SVG_ICONS.userCheck} Historia y Propósito Rebuske
      </span>
      <h2 class="sec-title" style="font-size: clamp(26px, 4vw, 38px); line-height: 1.15; margin-bottom: 14px; text-align: center;">
        Quiénes Somos: Dignidad para el Técnico, Tranquilidad para tu Hogar
      </h2>
      <p class="sec-desc" style="font-size: 16px; color: var(--mut); line-height: 1.6; text-align: center !important; margin: 0 auto 20px auto !important; max-width: 780px; display: block;">
        Nacimos en Medellín con la convicción de dignificar la mano de obra colombiana eliminando intermediarios abusivos y protegiendo a las familias con tecnología segura.
      </p>
    </div>

    <div class="quienes-somos-grid">
      <div class="quienes-somos-card reveal-cascade">
        <div class="quienes-somos-icon">
          \${SVG_ICONS.zap}
        </div>
        <h3 class="quienes-somos-title">Liderazgo & Visión Fundadora</h3>
        <p class="quienes-somos-text">
          Fundada por <strong>Camilo Escobar</strong> en Medellín, Rebuske nace para que los profesionales técnicos conserven hasta el <strong>93% neto de sus ingresos</strong> cada 4 días, sin pagar comisiones desmedidas del 30% o 40%.
        </p>
      </div>

      <div class="quienes-somos-card reveal-cascade stagger-1">
        <div class="quienes-somos-icon">
          \${SVG_ICONS.shield}
        </div>
        <h3 class="quienes-somos-title">Protección Bancaria Escrow</h3>
        <p class="quienes-somos-text">
          Tu dinero reposa en custodia en la <strong>Bóveda Wompi (Bancolombia)</strong>. El especialista cobra únicamente cuando verificas la labor a conformidad y firmas el <strong>Acta Digital de Garantía de 48 horas</strong> (Ley 1480).
        </p>
      </div>

      <div class="quienes-somos-card reveal-cascade stagger-2">
        <div class="quienes-somos-icon">
          \${SVG_ICONS.mapPin}
        </div>
        <h3 class="quienes-somos-title">Cobertura Valle de Aburrá</h3>
        <p class="quienes-somos-text">
          Atención hiperlocal con técnicos verificados mediante cédula biométrica en Medellín, Envigado, Itagüí, Sabaneta, Bello, La Estrella, Caldas, Copacabana, Girardota y Barbosa.
        </p>
      </div>
    </div>
  </section>
  \`;
}
`;
  code += quienesSomosFn;
}

fs.writeFileSync('components_refined.mjs', code, 'utf8');
console.log('components_refined.mjs updated successfully!');
