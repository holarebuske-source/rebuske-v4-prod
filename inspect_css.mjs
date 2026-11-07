import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/entrada.html', 'utf8');

const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
if (styleMatch) {
  const css = styleMatch[1];
  console.log('CSS length:', css.length);
  // print first 2000 chars of CSS
  console.log(css.slice(0, 2000));
}
