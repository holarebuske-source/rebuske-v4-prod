import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';

['entrada.html', 'registro.html'].forEach(f => {
  const p = path.join(projectDir, f);
  let html = fs.readFileSync(p, 'utf8');

  // Replace any link to /tarifas with #tarifas
  html = html.replace(/href=[\"']\/tarifas[\"']/g, 'href="#tarifas"');

  // In 'Empieza aquí' section:
  // Soy Profesional / Técnico -> /app
  // Soy Hogar / Cliente VIP -> /app
  html = html.replace(/href=[\"']\/registro\/tecnico[\"']/g, 'href="/app"');
  html = html.replace(/href=[\"']\/registro\/cliente[\"']/g, 'href="/app"');

  fs.writeFileSync(p, html, 'utf8');
  console.log(`Cleaned links in ${f}!`);
});
