import fs from 'fs';

const p = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/rebuske_primordiales_db.json';
if (fs.existsSync(p)) {
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  data.count = 84;
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
  console.log('✅ rebuske_primordiales_db.json reseteado a count 84.');
}

const tmp = '/tmp/rebuske_primordiales_db.json';
if (fs.existsSync(tmp)) {
  try {
    fs.unlinkSync(tmp);
  } catch (_) {}
}
