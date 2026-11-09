import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';

['entrada.html', 'registro.html'].forEach(f => {
  const p = path.join(projectDir, f);
  let html = fs.readFileSync(p, 'utf8');

  // Replace href="/app" inside Soy Hogar / Cliente VIP with href="/registro/cliente"
  const target = `<a href="/app" class="btn-hero-sec" style="width:100%;text-align:center;border-color:var(--lima);color:var(--lima);">
          Registro Clientes VIP (Bono $15.000) ➔`;
  const replacement = `<a href="/registro/cliente" class="btn-hero-sec" style="width:100%;text-align:center;border-color:var(--lima);color:var(--lima);">
          Registro Clientes VIP (Bono $15.000) ➔`;

  html = html.replace(target, replacement);
  fs.writeFileSync(p, html, 'utf8');
  console.log(`Updated ${f} with /registro/cliente`);
});
