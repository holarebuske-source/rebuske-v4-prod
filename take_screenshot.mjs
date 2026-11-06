import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const port = 3888;

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const filePath = path.join(baseDir, urlPath === '/' ? 'registro.html' : urlPath);
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const contentType = ext === '.html' ? 'text/html' : ext === '.svg' ? 'image/svg+xml' : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
  
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outArtifactPath = 'C:\\Users\\camil\\.gemini\\antigravity\\brain\\0efe1562-ff3c-463f-b5ee-5944a14c6d84\\rebuske_reto333_victoria_captura.png';
  const localOut = path.join(baseDir, 'rebuske_reto333_victoria_captura.png');

  try {
    console.log('Capturing mobile screenshot with headless Chrome...');
    const cmd = `"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2500 --window-size=400,860 "--screenshot=${localOut}" "http://127.0.0.1:${port}/registro.html?victoria=1"`;
    execSync(cmd, { stdio: 'inherit' });
    console.log('Screenshot captured at:', localOut);
    if (fs.existsSync(localOut)) {
      fs.copyFileSync(localOut, outArtifactPath);
      console.log('Copied to artifacts directory:', outArtifactPath);
    }
  } catch (err) {
    console.error('Error taking screenshot:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
