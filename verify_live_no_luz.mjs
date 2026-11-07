const urls = [
  'https://rebuske.vercel.app/entrada',
  'https://rebuske.vercel.app/registro',
  'https://rebuske.vercel.app/'
];

async function check() {
  for (const u of urls) {
    const res = await fetch(u);
    const text = (await res.text()).toLowerCase();
    const hasModoLuz = text.includes('modo luz');
    const hasLuzExpress = text.includes('luz express');
    const hasRutaDeLuz = text.includes('ruta de luz');
    console.log(`${u} -> Modo Luz: ${hasModoLuz} | Luz Express: ${hasLuzExpress} | Ruta de Luz: ${hasRutaDeLuz}`);
  }
}

check();
