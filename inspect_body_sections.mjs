import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/entrada.html', 'utf8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  const body = bodyMatch[1];
  console.log('Body length:', body.length);
  // print sections
  const sections = body.split(/<section/);
  console.log('Total sections in body:', sections.length - 1);
  sections.slice(1).forEach((s, i) => {
    const idMatch = s.match(/id=["']([^"']+)["']/);
    const titleMatch = s.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/);
    console.log(`Section ${i+1}: id="${idMatch ? idMatch[1] : 'none'}" - title="${titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'none'}"`);
  });
}
