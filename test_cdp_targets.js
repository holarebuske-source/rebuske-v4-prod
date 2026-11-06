import http from 'http';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Test if we can fetch targets and open websocket
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\chrome_temp_record';

async function test() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    `--user-data-dir=${userDataDir}`,
    'http://127.0.0.1:3000'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9222/json/list', (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log('Targets:', body);
      chrome.kill();
      process.exit(0);
    });
  }).on('error', (e) => {
    console.error('Error:', e.message);
    chrome.kill();
    process.exit(1);
  });
}

test();
