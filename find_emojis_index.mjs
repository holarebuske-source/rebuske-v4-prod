import fs from 'fs';

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

console.log('Total lines in index.html:', lines.length);
let count = 0;
lines.forEach((line, idx) => {
  if (emojiRegex.test(line)) {
    count++;
    if (count <= 60) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
console.log('Total lines with emojis in index.html:', count);
