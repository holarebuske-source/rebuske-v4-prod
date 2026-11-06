import http from 'http';
import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WebSocket = require('C:/Users/camil/.gemini/antigravity/scratch/rebuske-whatsapp-bot/node_modules/ws');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\chrome_temp_ws_test';

async function testWS() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    `--user-data-dir=${userDataDir}`,
    'http://127.0.0.1:3000/registro.html'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9222/json/list', (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const targets = JSON.parse(body);
      const pageTarget = targets.find(t => t.type === 'page');
      if (!pageTarget) {
        console.error('No page target found');
        chrome.kill();
        process.exit(1);
      }
      console.log('Connecting to WS:', pageTarget.webSocketDebuggerUrl);
      const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
      ws.on('open', () => {
        console.log('WebSocket connected to page!');
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        ws.send(JSON.stringify({
          id: 2,
          method: 'Page.startScreencast',
          params: { format: 'jpeg', quality: 80, maxWidth: 1080, maxHeight: 1920 }
        }));
      });
      let frameCount = 0;
      ws.on('message', (data) => {
        const msg = JSON.parse(data);
        if (msg.method === 'Page.screencastFrame') {
          frameCount++;
          ws.send(JSON.stringify({
            id: 100 + frameCount,
            method: 'Page.screencastFrameAck',
            params: { sessionId: msg.params.sessionId }
          }));
          if (frameCount <= 5) {
            console.log(`Captured frame #${frameCount} (base64 length: ${msg.params.data.length})`);
          }
          if (frameCount === 10) {
            console.log('Successfully captured 10 frames via CDP screencast!');
            ws.close();
            chrome.kill();
            process.exit(0);
          }
        }
      });
    });
  }).on('error', (e) => {
    console.error('Error connecting to CDP:', e.message);
    chrome.kill();
    process.exit(1);
  });
}

testWS();
