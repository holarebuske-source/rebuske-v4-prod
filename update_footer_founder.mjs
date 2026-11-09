import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';

const newFooter = `<footer class="site-footer" style="padding: 36px 0 48px; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 60px;">
    <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:20px; margin-bottom: 24px;">
      <div>
        <div style="font-family:var(--font-title); font-size:20px; font-weight:800; color:var(--tinta); margin-bottom:6px;">rebuske Medellín 2026</div>
        <p style="font-size:13.5px; color:var(--mut); max-width:640px; line-height:1.6;">
          Plataforma tecnológica de servicios técnicos para el hogar con pago protegido en Bóveda Wompi (Bancolombia). Fundador: <strong>Camilo Escobar</strong>.
        </p>
        <p style="margin-top:6px; font-size:12.5px; color:var(--lima);">
          Medellín, Antioquia, Colombia · Nit en trámite · 100% Hecho en Medellín
        </p>
      </div>
      <div class="footer-links-unified" style="display:flex; align-items:center; gap:16px;">
        <a href="/entrada" class="footer-link">🌐 Página Web de Entrada</a>
        <span style="color:rgba(255,255,255,0.2);">·</span>
        <a href="/app" class="footer-link-primary">📱 Abrir Aplicación rebuske ➔</a>
      </div>
    </div>
    <div style="text-align:center; padding-top:18px; border-top:1px solid rgba(255,255,255,0.06); font-size:12px; color:rgba(244,251,241,0.5);">
      © 2026 rebuske. Todos los derechos reservados · Respaldado por Ley 1480 de 2011 y Art. 1262 Código de Comercio.
    </div>
  </footer>`;

['entrada.html', 'registro.html'].forEach(f => {
  const p = path.join(projectDir, f);
  let html = fs.readFileSync(p, 'utf8');
  html = html.replace(/<footer[\s\S]*?<\/footer>/i, newFooter);
  fs.writeFileSync(p, html, 'utf8');
  console.log(`Updated footer in ${f}`);
});
