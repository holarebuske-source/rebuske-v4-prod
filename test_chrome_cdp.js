import http from 'http';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\chrome_temp_cdp';

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  `--user-data-dir=${userDataDir}`,
  'about:blank'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9222/json/version', (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log('CDP Version Response:', body);
      chrome.kill();
      process.exit(0);
    });
  }).on('error', (err) => {
    console.error('CDP Error:', err.message);
    chrome.kill();
    process.exit(1);
  });
}, 2000);
