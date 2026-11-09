import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WebSocket = require('C:/Users/camil/.gemini/antigravity/scratch/rebuske-whatsapp-bot/node_modules/ws');

const BASE_DIR = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\chrome_app_captures';
const PORT = 3894;
const DEBUG_PORT = 9226;

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/' || reqPath === '/app') reqPath = '/index.html';
      const filePath = path.join(BASE_DIR, reqPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        let mime = 'text/html; charset=utf-8';
        if (ext === '.js' || ext === '.mjs') mime = 'application/javascript';
        else if (ext === '.css') mime = 'text/css';
        else if (ext === '.png') mime = 'image/png';
        else if (ext === '.webp') mime = 'image/webp';
        else if (ext === '.svg') mime = 'image/svg+xml';
        res.writeHead(200, { 'Content-Type': mime });
        res.end(fs.readFileSync(filePath));
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function captureScreens() {
  const targetDir = path.join(BASE_DIR, 'assets', 'screenshots');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const server = await startServer();
  console.log(`Server started on http://127.0.0.1:${PORT}`);

  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    `http://127.0.0.1:${PORT}/index.html`
  ]);

  await new Promise(r => setTimeout(r, 2200));

  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${DEBUG_PORT}/json/list`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', async () => {
        try {
          const targets = JSON.parse(body);
          const pageTarget = targets.find(t => t.type === 'page');
          if (!pageTarget) throw new Error('No page target found in Chrome CDP');

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
            console.log('Connected to Chrome CDP WebSocket');

            // 1. Emulate exact mobile viewport: iPhone 14 / Pixel 7 (390 x 844, scale 2)
            await sendCDP('Emulation.setDeviceMetricsOverride', {
              width: 390,
              height: 844,
              deviceScaleFactor: 2,
              mobile: true
            });

            await sendCDP('Page.enable');
            await sendCDP('Runtime.enable');
            await new Promise(r => setTimeout(r, 800));

            // CAPTURA 1: HOME DE LA APP (CATÁLOGO, BUSCADOR, SERVICIOS)
            console.log('Capturando Pantalla 1: Home...');
            await sendCDP('Runtime.evaluate', {
              expression: `
                try {
                  go('home');
                  render();
                } catch(e) { console.error(e); }
              `
            });
            await new Promise(r => setTimeout(r, 1200));
            const shot1 = await sendCDP('Page.captureScreenshot', { format: 'png' });
            const path1 = path.join(targetDir, 'app_screen_1_home.png');
            fs.writeFileSync(path1, Buffer.from(shot1.data, 'base64'));
            console.log(`✅ Pantalla 1 guardada: ${path1} (${shot1.data.length} bytes)`);

            // CAPTURA 2: RADAR & DESPACHO EN TIEMPO REAL
            console.log('Capturando Pantalla 2: Radar...');
            await sendCDP('Runtime.evaluate', {
              expression: `
                try {
                  if (!S.jobs || S.jobs.length === 0) {
                    S.jobs = [{
                      id: 'j_radar_real',
                      t: 'Plomería · Fuga de Agua y Grifo',
                      pro: 'p1',
                      s: 'camino',
                      z: 'El Poblado, Medellín',
                      v: 62840,
                      props: []
                    }];
                  } else {
                    S.jobs[0].s = 'camino';
                  }
                  go('ruta', { id: S.jobs[0].id });
                  render();
                } catch(e) { console.error(e); }
              `
            });
            await new Promise(r => setTimeout(r, 1200));
            const shot2 = await sendCDP('Page.captureScreenshot', { format: 'png' });
            const path2 = path.join(targetDir, 'app_screen_2_radar.png');
            fs.writeFileSync(path2, Buffer.from(shot2.data, 'base64'));
            console.log(`✅ Pantalla 2 guardada: ${path2} (${shot2.data.length} bytes)`);

            // CAPTURA 3: BÓVEDA WOMPI ESCROW & CHECKOUT SEGURO
            console.log('Capturando Pantalla 3: Bóveda Wompi...');
            await sendCDP('Runtime.evaluate', {
              expression: `
                try {
                  if (!S.jobs || S.jobs.length === 0) {
                    S.jobs = [{
                      id: 'j_wompi_real',
                      t: 'Electricidad · Reparación de Brequera',
                      pro: 'p1',
                      s: 'por_pagar',
                      z: 'Laureles, Medellín',
                      v: 78540,
                      bonoVip: true
                    }];
                  } else {
                    S.jobs[0].s = 'por_pagar';
                    S.jobs[0].v = 78540;
                  }
                  go('pago', { id: S.jobs[0].id });
                  render();
                } catch(e) { console.error(e); }
              `
            });
            await new Promise(r => setTimeout(r, 1200));
            const shot3 = await sendCDP('Page.captureScreenshot', { format: 'png' });
            const path3 = path.join(targetDir, 'app_screen_3_wompi.png');
            fs.writeFileSync(path3, Buffer.from(shot3.data, 'base64'));
            console.log(`✅ Pantalla 3 guardada: ${path3} (${shot3.data.length} bytes)`);

            // CAPTURA 4: PERFIL PRO, BILLETERA 93% & QR BIOMÉTRICO
            console.log('Capturando Pantalla 4: Billetera Pro...');
            await sendCDP('Runtime.evaluate', {
              expression: `
                try {
                  go('pro');
                  render();
                } catch(e) { console.error(e); }
              `
            });
            await new Promise(r => setTimeout(r, 1200));
            const shot4 = await sendCDP('Page.captureScreenshot', { format: 'png' });
            const path4 = path.join(targetDir, 'app_screen_4_billetera.png');
            fs.writeFileSync(path4, Buffer.from(shot4.data, 'base64'));
            console.log(`✅ Pantalla 4 guardada: ${path4} (${shot4.data.length} bytes)`);

            ws.close();
            chrome.kill();
            server.close();
            resolve();
          });
        } catch (err) {
          chrome.kill();
          server.close();
          reject(err);
        }
      });
    });
  });
}

captureScreens().catch((err) => {
  console.error('Error capturing screens:', err);
  process.exit(1);
});
