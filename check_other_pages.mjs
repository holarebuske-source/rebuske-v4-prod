import fs from 'fs';

function findEmojisInFile(filename) {
  if (!fs.existsSync(filename)) return [];
  const text = fs.readFileSync(filename, 'utf8');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu;
  return [...new Set(text.match(emojiRegex) || [])];
}

console.log('registro-tecnico.html:', findEmojisInFile('registro-tecnico.html'));
console.log('registro-cliente.html:', findEmojisInFile('registro-cliente.html'));
