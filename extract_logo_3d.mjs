import fs from 'fs';

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

for (let i = 135; i < 150; i++) {
  if (lines[i].includes('data:image/webp;base64')) {
    console.log('Found logo line:', i + 1);
    console.log('Line start:', lines[i].substring(0, 100));
    console.log('Line length:', lines[i].length);
    fs.writeFileSync('logo_3d_data.txt', lines[i], 'utf8');
    break;
  }
}
