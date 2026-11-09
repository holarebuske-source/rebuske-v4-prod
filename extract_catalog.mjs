import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';
const tarifas = fs.readFileSync(path.join(projectDir, 'tarifas.html'), 'utf8');

// Extract the filter bar, search box, and categories grid from tarifas.html
const filterBarStart = tarifas.indexOf('<!-- FILTROS POR GRUPO -->');
const conditionsStart = tarifas.indexOf('<!-- CONDICIONES GENERALES -->');

if (filterBarStart !== -1 && conditionsStart !== -1) {
  const catalogHTML = tarifas.substring(filterBarStart, conditionsStart).trim();
  console.log('Catalog HTML length:', catalogHTML.length);
  console.log('Catalog HTML preview:\n', catalogHTML.substring(0, 300));
} else {
  console.log('Could not find marks:', { filterBarStart, conditionsStart });
}
