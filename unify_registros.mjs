import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';

['registro-tecnico.html', 'registro-cliente.html'].forEach(f => {
  const p = path.join(projectDir, f);
  if (fs.existsSync(p)) {
    let html = fs.readFileSync(p, 'utf8');

    // Replace header with unified 2-link top-bar
    const headerRegex = /<header class=[\"']top-bar[\"']>[\s\S]*?<\/header>/i;
    const newHeader = `<header class="top-bar" id="topBar">
      <a href="/entrada" class="brand-logo" title="rebuske Medellín · Página Web Principal">
        <span class="brand-logo-dot pulse-c" aria-hidden="true"></span>
        <span class="brand-name">rebuske</span>
        <span class="brand-tag">Medellín 2026</span>
      </a>
      <nav class="top-actions" aria-label="Navegación unificada">
        <a href="/entrada" class="btn-nav-link" title="Página Web de Entrada">🌐 Página Web</a>
        <a href="/app" class="btn-pill-primary sheen" title="Abrir la Aplicación rebuske">📱 Abrir App ➔</a>
      </nav>
    </header>`;
    html = html.replace(headerRegex, newHeader);

    // Replace footer with unified 2 links
    const footerRegex = /<footer[\s\S]*?<\/footer>/i;
    const newFooter = `<footer class="site-footer" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;padding:32px 0 44px;border-top:1px solid rgba(255,255,255,0.1);gap:16px;">
      <span>© 2026 rebuske. Todos los derechos reservados · Medellín, Colombia</span>
      <div class="footer-links-unified" style="display:flex;align-items:center;gap:16px;">
        <a href="/entrada" style="color:var(--mut);text-decoration:none;font-weight:600;">🌐 Página Web de Entrada</a>
        <span style="color:rgba(255,255,255,0.2);">·</span>
        <a href="/app" style="color:var(--lima);text-decoration:none;font-weight:800;">📱 Abrir Aplicación rebuske ➔</a>
      </div>
    </footer>`;
    if (footerRegex.test(html)) {
      html = html.replace(footerRegex, newFooter);
    }

    fs.writeFileSync(p, html, 'utf8');
    console.log(`${f} updated successfully! Size: ${fs.statSync(p).size}`);
  }
});
