import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';

['entrada.html', 'registro.html'].forEach(f => {
  const p = path.join(projectDir, f);
  let html = fs.readFileSync(p, 'utf8');

  // Find the 'Empieza aquí' section cards
  // Replace the card hrefs back to /registro/tecnico and /registro/cliente
  const empIdx = html.indexOf('id="empieza-aqui"');
  if (empIdx !== -1) {
    const sectionSnippet = html.substring(empIdx, empIdx + 2000);
    // Let's replace the first /app in empieza-aqui with /registro/tecnico, and second with /registro/cliente
    let updatedSnippet = sectionSnippet;
    const proCardRegex = /(<a\s+href=)["']\/app["']([^>]*>\s*<span[^>]*>Ir a Registro Técnico)/i;
    if (proCardRegex.test(updatedSnippet)) {
      updatedSnippet = updatedSnippet.replace(proCardRegex, '$1"/registro/tecnico"$2');
    } else {
      // In case the text is slightly different
      updatedSnippet = updatedSnippet.replace(/(Soy Profesional \/ Técnico[\s\S]*?<a\s+href=)["']\/app["']/i, '$1"/registro/tecnico"');
    }

    const cliCardRegex = /(<a\s+href=)["']\/app["']([^>]*>\s*<span[^>]*>Ir a Registro Cliente)/i;
    if (cliCardRegex.test(updatedSnippet)) {
      updatedSnippet = updatedSnippet.replace(cliCardRegex, '$1"/registro/cliente"$2');
    } else {
      updatedSnippet = updatedSnippet.replace(/(Soy Hogar \/ Cliente VIP[\s\S]*?<a\s+href=)["']\/app["']/i, '$1"/registro/cliente"');
    }

    html = html.substring(0, empIdx) + updatedSnippet + html.substring(empIdx + 2000);
    fs.writeFileSync(p, html, 'utf8');
    console.log(`Updated 'Empieza aquí' links in ${f}!`);
  }
});
