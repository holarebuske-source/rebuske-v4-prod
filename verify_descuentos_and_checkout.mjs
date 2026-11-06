import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WebSocket = require('C:/Users/camil/.gemini/antigravity/scratch/rebuske-whatsapp-bot/node_modules/ws');

const BASE_DIR = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\chrome_mobile_test_qa';
const PORT = 3893;

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/' || reqPath === '/registro') reqPath = '/registro.html';
      if (reqPath === '/descuentos') reqPath = '/descuentos.html';
      const filePath = path.join(BASE_DIR, reqPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        let ct = 'text/html; charset=utf-8';
        if (ext === '.css') ct = 'text/css';
        if (ext === '.js') ct = 'application/javascript';
        if (ext === '.png') ct = 'image/png';
        if (ext === '.svg') ct = 'image/svg+xml';
        res.writeHead(200, { 'Content-Type': ct });
        res.end(fs.readFileSync(filePath));
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function runQA() {
  const server = await startServer();
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9224',
    `--user-data-dir=${USER_DATA_DIR}`,
    `http://127.0.0.1:${PORT}/descuentos.html`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const pageTarget = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9224/json/list', (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const targets = JSON.parse(body);
        resolve(targets.find(t => t.type === 'page'));
      });
    });
  });

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

  await new Promise(r => ws.on('open', r));

  await sendCDP('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sendCDP('Page.enable');
  await new Promise(r => setTimeout(r, 1200));

  // 1. Capture Header & Summary Card of descuentos.html
  const shot1 = await sendCDP('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/camil/.gemini/antigravity/brain/0efe1562-ff3c-463f-b5ee-5944a14c6d84/test_mobile_descuentos_header.png', Buffer.from(shot1.data, 'base64'));
  console.log('✅ Captura descuentos_header guardada');

  // 2. Scroll to Section 5 (Diferenciación vs Tarifa de Desplazamiento)
  await sendCDP('Runtime.evaluate', {
    expression: `window.scrollBy(0, 1100);`
  });
  await new Promise(r => setTimeout(r, 800));
  const shot2 = await sendCDP('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/camil/.gemini/antigravity/brain/0efe1562-ff3c-463f-b5ee-5944a14c6d84/test_mobile_descuentos_diferenciacion.png', Buffer.from(shot2.data, 'base64'));
  console.log('✅ Captura descuentos_diferenciacion guardada');

  // 3. Navigate to index.html to verify checkout view with job > 90k
  await sendCDP('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
  await new Promise(r => setTimeout(r, 2000));

  // Initialize a mock job with value 120000 COP and view pago
  await sendCDP('Runtime.evaluate', {
    expression: `
      try {
        localStorage.removeItem('rebuske_prod_v4');
        const testJob = {
          id: 'test_job_1',
          cat: 'plomeria',
          tit: 'Reparación de Fuga de Agua',
          v: 120000,
          s: 'asignado',
          pro: 'p1',
          bonoVip: true,
          chat: []
        };
        S.jobs = [testJob];
        S.cur = { v: 'pago', p: { id: 'test_job_1' } };
        st = [{ v: 'pago', p: { id: 'test_job_1' } }];
        save();
        render();
      } catch(e) { console.error(e); }
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  const shot3 = await sendCDP('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/camil/.gemini/antigravity/brain/0efe1562-ff3c-463f-b5ee-5944a14c6d84/test_mobile_checkout_bono_desglose.png', Buffer.from(shot3.data, 'base64'));
  console.log('✅ Captura checkout_bono_desglose guardada');

  ws.close();
  chrome.kill();
  server.close();
  console.log('🏁 QA Finalizado');
}

runQA().catch(console.error);
