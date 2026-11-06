import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WebSocket = require('C:/Users/camil/.gemini/antigravity/scratch/rebuske-whatsapp-bot/node_modules/ws');

const BASE_DIR = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\chrome_test_pro_switch';
const PORT = 3894;

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(BASE_DIR, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200);
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, '127.0.0.1', async () => {
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9224',
    `--user-data-dir=${USER_DATA_DIR}`,
    `http://127.0.0.1:${PORT}/index.html`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9224/json/list', (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', async () => {
      const targets = JSON.parse(body);
      const pageTarget = targets.find(t => t.type === 'page');
      const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

      let id = 1;
      const sendCDP = (method, params = {}) => new Promise((resolve) => {
        const reqId = id++;
        const onMsg = (data) => {
          const msg = JSON.parse(data);
          if (msg.id === reqId) {
            ws.removeListener('message', onMsg);
            resolve(msg.result);
          }
        };
        ws.on('message', onMsg);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });

      ws.on('open', async () => {
        await sendCDP('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });

        // Cambiar rol a profesional en la app para ver el switch
        await sendCDP('Runtime.evaluate', {
          expression: `if (typeof go === 'function') { S.role = 'profesional'; go('pro', { tab: 'disp' }); }`
        });
        await new Promise(r => setTimeout(r, 800));

        const shot = await sendCDP('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('C:/Users/camil/.gemini/antigravity/brain/0efe1562-ff3c-463f-b5ee-5944a14c6d84/test_pro_switch_fixed.png', Buffer.from(shot.data, 'base64'));
        console.log('SCREENSHOT_SAVED: test_pro_switch_fixed.png');

        // Screenshot de registro con cookie banner
        await sendCDP('Page.navigate', { url: `http://127.0.0.1:${PORT}/registro.html` });
        await new Promise(r => setTimeout(r, 1200));

        const shotReg = await sendCDP('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('C:/Users/camil/.gemini/antigravity/brain/0efe1562-ff3c-463f-b5ee-5944a14c6d84/test_registro_cookie_banner.png', Buffer.from(shotReg.data, 'base64'));
        console.log('SCREENSHOT_SAVED: test_registro_cookie_banner.png');

        ws.close();
        chrome.kill();
        server.close();
        process.exit(0);
      });
    });
  });
});
