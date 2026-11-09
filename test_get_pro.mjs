import registerPro from './api/register-pro.js';

const req = { method: 'GET', headers: {}, query: {} };
const res = {
  statusCode: 200,
  headers: {},
  status(c) { this.statusCode = c; return this; },
  json(b) { this.body = b; return this; },
  setHeader(k, v) { this.headers[k] = v; }
};

await registerPro(req, res);
console.log('GET response:', JSON.stringify(res.body, null, 2));
