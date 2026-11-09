import fs from 'fs';

const content = fs.readFileSync('entrada.html', 'utf8');
const lines = content.split('\n');
console.log('Total lines:', lines.length);

lines.forEach((l, i) => {
  const trimmed = l.trim();
  if (trimmed.startsWith('<section') || trimmed.startsWith('<header') || trimmed.startsWith('<footer') || trimmed.startsWith('<nav')) {
    console.log(`Line ${i+1}: ${trimmed.substring(0, 110)}`);
  }
});
