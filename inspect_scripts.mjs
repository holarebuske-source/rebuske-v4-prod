import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/entrada.html', 'utf8');

const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
if (scriptMatch) {
  console.log(scriptMatch[1]);
}
