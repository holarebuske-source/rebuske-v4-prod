import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';

['registro-tecnico.html', 'registro-cliente.html'].forEach(f => {
  const file = path.join(projectDir, f);
  if (fs.existsSync(file)) {
    const c = fs.readFileSync(file, 'utf8');
    const navM = c.match(/<header[\s\S]*?<\/header>/);
    console.log(`=== ${f} NAV ===`);
    console.log(navM ? navM[0] : 'no header');
  }
});
