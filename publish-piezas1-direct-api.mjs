import crypto from 'crypto';

const PAGE_TOKEN = 'EAAziZCoiI54sBS2PgDxounpUKofmP0ctjtzcbZC3JVKYoaYSTpwCxvH0ZAh2mUZCs5LHh4iezeUYeyFjSVT2z9ZByRnjZA2ZBv01qHW95nWxbP4ZAUWnDuqfrSoalX7xoPK5sXunsmWpvR2xD5DZBiwKWVSGMFWcb5b3BvdW61CZCaUZBrzFxksnr1zMEnZBaJ4mA53z7wmsGQQ3aMTpZA4SrXCwYhQm1KecTjYlwbOSZCZAayV';
const PAGE_ID = '1326854307188662';

const xConfig = {
  consumerKey: 'd93NGmMzMJITxc2R9KpHIrLBr',
  consumerSecret: 'fSWjMPA3EBsQJrwpQMJjePEJoZ8yyN7W7ySkbfLJIXYsGRyQXX',
  accessToken: '2115614674343370752-VFQ6JgoBDPcrXN9zvX82MBbaxl9g0D',
  accessTokenSecret: 'D68l1XXKGoomXor9l8ObuA22UsDAWlPYIK8bSenB3w0Ro'
};

function percentEncode(str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

function getOAuthHeader(method, url, oauthParams, consumerSecret, tokenSecret) {
  const sortedKeys = Object.keys(oauthParams).sort();
  const paramString = sortedKeys.map(k => `${percentEncode(k)}=${percentEncode(oauthParams[k])}`).join('&');
  const baseString = `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(paramString)}`;
  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`;
  const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

  return 'OAuth ' + Object.keys(oauthParams)
    .concat('oauth_signature')
    .sort()
    .map(k => `${percentEncode(k)}="${percentEncode(k === 'oauth_signature' ? signature : oauthParams[k])}"`)
    .join(', ');
}

async function publishMeta() {
  console.log('--- PUBLICANDO EN META (FACEBOOK) ---');
  const message = `¡Bienvenidos a Rebuske! 👋🇨🇴\n\nNacimos en Medellín para resolver una necesidad real: encontrar personas de confianza para arreglar, instalar o remodelar en casa sin el miedo a anticipos perdidos o trabajos a medias.\n\nConectamos vecinos con profesionales calificados con garantía y seguridad total.\n\n👉 Dale 'Seguir' a nuestra página para enterarte de todo lo que llega a tu barrio.`;
  
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${PAGE_ID}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        access_token: PAGE_TOKEN
      })
    });
    const data = await res.json();
    console.log('Meta FB Response Status:', res.status, JSON.stringify(data));
    return { status: res.status, data };
  } catch (err) {
    console.error('Meta Error:', err.message);
    return { error: err.message };
  }
}

async function publishX() {
  console.log('--- PUBLICANDO EN X (TWITTER) ---');
  const url = 'https://api.twitter.com/2/tweets';
  const text = 'Hola, mundo. Rebuske ya está en Medellín. 👋🇨🇴\n\nCreamos la solución definitiva para servicios del hogar: conexión en minutos, custodia de pago protegida y garantía escrita de cumplimiento.\n\nArregla · Confía · Repite.\n👉 Síguenos en @rebuskeapp.';
  
  const oauthParams = {
    oauth_consumer_key: xConfig.consumerKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: xConfig.accessToken,
    oauth_version: '1.0'
  };

  const authHeader = getOAuthHeader('POST', url, oauthParams, xConfig.consumerSecret, xConfig.accessTokenSecret);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    console.log('X Response Status:', res.status, JSON.stringify(data));
    return { status: res.status, data };
  } catch (err) {
    console.error('X Error:', err.message);
    return { error: err.message };
  }
}

async function run() {
  const metaRes = await publishMeta();
  const xRes = await publishX();
  console.log('Resultados finales directos completados.');
}

run().catch(console.error);
