import fs from 'fs';
import path from 'path';

const line = fs.readFileSync('logo_3d_data.txt', 'utf8');
const match = line.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/);
if (match) {
  const base64Data = match[1];
  const buffer = Buffer.from(base64Data, 'base64');
  const targetDir = path.join('assets', 'icons');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetPath = path.join(targetDir, 'luciernaga_3d_animada.webp');
  fs.writeFileSync(targetPath, buffer);
  console.log('Saved 3D animated logo to:', targetPath, 'Size:', buffer.length, 'bytes');
} else {
  console.error('Could not match base64 webp data');
}
