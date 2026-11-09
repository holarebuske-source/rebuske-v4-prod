import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';

const files = ['entrada.html', 'tarifas.html', 'registro.html', 'registro-tecnico.html', 'registro-cliente.html'];

for (const file of files) {
  const fullPath = path.join(projectDir, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const titleMatch = content.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : 'no title';
    const fonts = content.match(/fonts\.googleapis\.com[^\"]+/g) || [];
    const hrefMatches = content.match(/href=[\"'][^\"']+[\"']/g) || [];
    const hrefs = [...new Set(hrefMatches.map(h => h.slice(6, -1)))].filter(h => 
      !h.startsWith('data:') && !h.endsWith('.css') && !h.endsWith('.png') && 
      !h.endsWith('.ico') && !h.includes('manifest') && !h.includes('googleapis') && 
      !h.includes('gstatic')
    );
    console.log(`=== ${file} (${content.length} bytes) ===`);
    console.log(`Title: ${title}`);
    console.log(`Fonts:`, fonts);
    console.log(`Hrefs:`, hrefs);
    console.log('---');
  } else {
    console.log(`File not found: ${file}`);
  }
}
