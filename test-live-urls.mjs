const urls = [
  'https://rebuske.vercel.app/entrada',
  'https://rebuske.vercel.app/registro',
  'https://rebuske.vercel.app/registro/tecnico',
  'https://rebuske.vercel.app/registro/cliente'
];

async function check() {
  for (const u of urls) {
    try {
      const res = await fetch(u);
      const text = await res.text();
      const hasSyne = text.includes('family=Syne');
      const hasTightTracking = text.includes('letter-spacing: -0.038em');
      const hasNoPedido = !text.includes('Necesito un técnico.');
      console.log(`URL: ${u} | Status: ${res.status} | Syne: ${hasSyne} | TightTracking: ${hasTightTracking} | NoPedido: ${hasNoPedido}`);
    } catch (e) {
      console.error(`Error fetching ${u}:`, e.message);
    }
  }
}

check();
