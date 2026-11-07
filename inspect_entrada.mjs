import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/entrada.html', 'utf8');

const headings = [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map(m => `H${m[1]}: ${m[2].replace(/<[^>]+>/g, '').trim()}`);
console.log('--- HEADINGS ---');
console.log(headings.join('\n'));

const sections = [...html.matchAll(/<(section|header|nav|footer)[^>]*id=["']?([^"'> ]+)?["']?[^>]*class=["']?([^"'>]+)?["']?/gi)].map(m => `<${m[1]} id="${m[2]||''}" class="${m[3]||''}">`);
console.log('\n--- SECTIONS ---');
console.log(sections.join('\n'));
