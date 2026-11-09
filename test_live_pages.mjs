import https from 'https';

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          length: data.length,
          hasPhones: data.includes('experiencia-app'),
          has17Cats: data.includes('17 Categorías'),
          hasOnlyTwoNavLinks: data.includes('Página Web') && data.includes('Abrir App')
        });
      });
    }).on('error', (err) => resolve({ url, error: err.message }));
  });
}

async function run() {
  const urls = [
    'https://rebuske.vercel.app/entrada',
    'https://rebuske.vercel.app/tarifas',
    'https://rebuske.vercel.app/app'
  ];
  for (const u of urls) {
    const res = await checkUrl(u);
    console.log(JSON.stringify(res, null, 2));
  }
}

run();
