import fs from 'fs';

function findEmojis(filename) {
  if (!fs.existsSync(filename)) return [];
  const text = fs.readFileSync(filename, 'utf8');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu;
  const matches = [...new Set(text.match(emojiRegex) || [])];
  return matches;
}

console.log('components_refined.mjs emojis:', findEmojis('components_refined.mjs'));
console.log('service_icons.mjs emojis:', findEmojis('service_icons.mjs'));
console.log('categories_data_unrounded.mjs emojis:', findEmojis('categories_data_unrounded.mjs'));
console.log('styles_refined.mjs emojis:', findEmojis('styles_refined.mjs'));
