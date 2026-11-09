import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu;

const matches = [];
lines.forEach((line, index) => {
  // We exclude ★ and ✓ and ➔ if they are treated as symbols, but let's check what emojis are matched
  const m = line.match(emojiRegex);
  if (m) {
    // filter out star ★ or checkmarks if they don't break seriousness, but let's see which ones are emojis
    matches.push({ lineNum: index + 1, emojis: [...new Set(m)], line: line.trim() });
  }
});

console.log(`Total lines with emojis: ${matches.length}`);
fs.writeFileSync('emojis_in_index.json', JSON.stringify(matches, null, 2));
console.log('Saved to emojis_in_index.json');
