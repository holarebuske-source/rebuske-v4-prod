import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
process.chdir(__dirname);

import('./api/register-pro.js').then(async m => {
  // Let's check environment variables
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'set' : 'not set');
});
