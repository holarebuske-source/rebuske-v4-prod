import fs from 'fs';

const html = fs.readFileSync('entrada.html', 'utf8');
const lines = html.split('\n');

for (let i = 2180; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('<section') || line.includes('</section>') || line.includes('<header') || line.includes('</header>') || line.includes('<footer') || line.includes('</footer>')) {
    console.log(`Line ${i + 1}: ${line.trim().substring(0, 90)}`);
  }
}
