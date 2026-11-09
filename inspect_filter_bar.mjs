import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

const filterIdx = tarifas.indexOf('class="filter-bar"');
console.log('filterIdx:', filterIdx);
if (filterIdx !== -1) {
  console.log(tarifas.substring(filterIdx - 100, filterIdx + 1200));
}
