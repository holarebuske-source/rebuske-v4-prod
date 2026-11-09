import fs from 'fs';
const data = JSON.parse(fs.readFileSync('emojis_in_index.json', 'utf8'));
data.forEach(d => {
  const nonTextEmojis = d.emojis.filter(e => !['★', '✓', '✕', '➔'].includes(e));
  if (nonTextEmojis.length > 0) {
    console.log(`L${d.lineNum} [${nonTextEmojis.join(' ')}]: ${d.line.slice(0, 140)}`);
  }
});
