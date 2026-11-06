import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WebSocket = require('C:/Users/camil/.gemini/antigravity/scratch/rebuske-whatsapp-bot/node_modules/ws');

const BASE_DIR = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\chrome_mobile_test';
const PORT = 3892;

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/' || reqPath === '/registro') reqPath = '/registro.html';
      const filePath = path.join(BASE_DIR, reqPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fs.readFileSync(filePath));
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function takeMobileScreen() {
  const server = await startServer();
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9223',
    `--user-data-dir=${USER_DATA_DIR}`,
    `http://127.0.0.1:${PORT}/registro.html`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9223/json/list', (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', async () => {
        try {
          const targets = JSON.parse(body);
          const pageTarget = targets.find(t => t.type === 'page');
          const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

          let id = 1;
          const sendCDP = (method, params = {}) => new Promise((resSend) => {
            const reqId = id++;
            const onMsg = (data) => {
              const msg = JSON.parse(data);
              if (msg.id === reqId) {
                ws.off('message', onMsg);
                resSend(msg.result);
              }
            };
            ws.on('message', onMsg);
            ws.send(JSON.stringify({ id: reqId, method, params }));
          });

          ws.on('open', async () => {
            // Emulate Mobile Device (iPhone 14 / Pixel 7: 390 x 844)
            await sendCDP('Emulation.setDeviceMetricsOverride', {
              width: 390,
              height: 844,
              deviceScaleFactor: 2,
              mobile: true
            });

            await sendCDP('Page.enable');
            await new Promise(r => setTimeout(r, 1200));

            // Capture Hero on Mobile
            const shot1 = await sendCDP('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/test_mobile_hero.png', Buffer.from(shot1.data, 'base64'));
            console.log('📸 Captura 1 (Hero Mobile) guardada.');

            // Scroll down to the Mini-Simulator
            await sendCDP('Runtime.evaluate', {
              expression: `document.getElementById('sim-slider').scrollIntoView({ behavior: 'instant', block: 'center' });`
            });
            await new Promise(r => setTimeout(r, 800));

            // Interact with simulator: set slider to 350.000 COP
            await sendCDP('Runtime.evaluate', {
              expression: `if (typeof setPocketSim === 'function') setPocketSim(350000);`
            });
            await new Promise(r => setTimeout(r, 500));

            const shot2 = await sendCDP('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/test_mobile_simulator.png', Buffer.from(shot2.data, 'base64'));
            console.log('📸 Captura 2 (Mini-Simulador Mobile) guardada.');

            // Scroll down to the Accordion and open Item 1
            await sendCDP('Runtime.evaluate', {
              expression: `
                document.getElementById('acordeon-seguridad').scrollIntoView({ behavior: 'instant', block: 'start' });
                if (typeof toggleAcordeon === 'function') toggleAcordeon('acc-wompi');
              `
            });
            await new Promise(r => setTimeout(r, 600));

            const shot3 = await sendCDP('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync('C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/test_mobile_accordion.png', Buffer.from(shot3.data, 'base64'));
            console.log('📸 Captura 3 (Acordeón Mobile) guardada.');

            ws.close();
            chrome.kill();
            server.close();
            resolve();
          });
        } catch (e) {
          chrome.kill();
          server.close();
          reject(e);
        }
      });
    });
  });
}

takeMobileScreen().catch(console.error);
