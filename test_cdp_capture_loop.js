import http from 'http';
import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WebSocket = require('C:/Users/camil/.gemini/antigravity/scratch/rebuske-whatsapp-bot/node_modules/ws');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\chrome_temp_capture_test';

async function testCapture() {
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
    res.on('end', async () => {
      const targets = JSON.parse(body);
      const pageTarget = targets.find(t => t.type === 'page');
      if (!pageTarget) {
        chrome.kill();
        process.exit(1);
      }
      const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
      
      let id = 1;
      const sendCDP = (method, params = {}) => new Promise((resolve) => {
        const reqId = id++;
        const onMsg = (data) => {
          const msg = JSON.parse(data);
          if (msg.id === reqId) {
            ws.off('message', onMsg);
            resolve(msg.result);
          }
        };
        ws.on('message', onMsg);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });

      ws.on('open', async () => {
        console.log('WS connected, setting viewport...');
        await sendCDP('Emulation.setDeviceMetricsOverride', {
          width: 1280,
          height: 800,
          deviceScaleFactor: 1,
          mobile: false
        });
        console.log('Capturing 5 frames...');
        for (let i = 0; i < 5; i++) {
          const res = await sendCDP('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
          console.log(`Frame ${i+1} captured: ${res.data.length} chars`);
        }
        console.log('Done!');
        ws.close();
        chrome.kill();
        process.exit(0);
      });
    });
  });
}

testCapture();
