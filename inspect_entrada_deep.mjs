import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/entrada.html', 'utf8');

// Print key animation keyframes
const keyframeMatches = [...html.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
console.log('Keyframes present:', [...new Set(keyframeMatches)]);

// Print main layout sections in body
const bodyOnly = html.split('<body')[1].split('</body>')[0];
const sections = [...bodyOnly.matchAll(/<(section|header|footer|div\s+class="[^"]*section[^"]*")[^>]*>([\s\S]*?)<\/\1>/gi)]
  .map(m => m[0].slice(0, 150));
console.log('\nSections in body:');
console.log(sections);
