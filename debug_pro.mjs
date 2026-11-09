import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
process.chdir(__dirname);

import('./api/register-pro.js').then(async m => {
  const req = { method: 'GET', headers: {}, query: {} };
  const res = {
    statusCode: 200,
    headers: {},
    status(c) { this.statusCode = c; return this; },
    json(b) { this.body = b; return this; },
    setHeader(k, v) { this.headers[k] = v; }
  };
  await m.default(req, res);
  console.log('STATUS:', res.statusCode);
  console.log('BODY:', res.body);
  console.log('mes1Neto:', res.body.benefits?.mes1Neto);
});
