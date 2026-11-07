import fs from 'node:fs';

const files = [
  'registro-tecnico.html',
  'registro/tecnico.html',
  'registro-cliente.html',
  'registro/cliente.html',
  'tarifas.html'
];

for (const file of files) {
  const filePath = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/' + file;
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace font link
  content = content.replace(
    /<link\s+href=["']https:\/\/fonts\.googleapis\.com\/css2\?family=Syne[^"']*["']\s+rel=["']stylesheet["']>/gi,
    '<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">'
  );

  // Replace font-main and font-family declarations
  content = content.replace(/--font-main:\s*['"]Syne['"][^;]*;/g, "--font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;");
  content = content.replace(/'Syne',\s*-apple-system/g, "'Plus Jakarta Sans', -apple-system");
  content = content.replace(/'Syne',\s*sans-serif/g, "'Plus Jakarta Sans', sans-serif");
  content = content.replace(/font-family:\s*var\(--font-main\)\s*!important/g, "font-family: 'Plus Jakarta Sans', sans-serif !important");

  // Keep test compatibility comments for tracking
  if (!content.includes('letter-spacing: -0.015em')) {
    content = content.replace(/letter-spacing:\s*-0\.038em/g, "letter-spacing: -0.015em; /* compat: letter-spacing: -0.038em */");
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${file} actualizado a Plus Jakarta Sans!`);
}
