import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = __dirname;

const filesToScan = [
  'index.html',
  'entrada.html',
  'registro.html',
  'registro-tecnico.html',
  'registro-cliente.html',
  'tarifas.html',
  'supabase-sync.js',
  'sw.js',
  'vercel.json'
];

const apiDir = path.join(baseDir, 'api');
if (fs.existsSync(apiDir)) {
  fs.readdirSync(apiDir).forEach(f => {
    if (f.endsWith('.js')) filesToScan.push(path.join('api', f));
  });
}

function scanFile(relPath) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) return null;

  const content = fs.readFileSync(fullPath, 'utf8');
  const issues = [];

  // 1. Check for exposed private credentials in client-side files
  const clientFiles = [
    'index.html', 'entrada.html', 'registro.html', 'registro-tecnico.html',
    'registro-cliente.html', 'tarifas.html', 'sw.js'
  ];
  if (clientFiles.includes(relPath)) {
    if (content.includes('prv_prod_') || content.includes('service_role') || content.includes('WOMPI_PRIVATE_KEY')) {
      issues.push({
        severity: 'CRÍTICA',
        category: 'EXPOSICIÓN DE SECRETOS',
        rule: 'Claves privadas en frontend',
        detail: 'Se detectó posible clave privada en archivo público cliente.'
      });
    }
  }

  // 2. Check for eval() or new Function()
  if (/\beval\s*\(/.test(content)) {
    issues.push({
      severity: 'ALTA',
      category: 'EJECUCIÓN INSEGURA',
      rule: 'Uso de eval()',
      detail: 'La función eval() permite ejecución arbitraria de strings.'
    });
  }
  if (/new\s+Function\s*\(/.test(content)) {
    issues.push({
      severity: 'MEDIA',
      category: 'EJECUCIÓN INSEGURA',
      rule: 'Uso de new Function()',
      detail: 'El constructor new Function() es vulnerable a inyección de código.'
    });
  }

  // 3. Check for innerHTML usages and examine escaping
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('.innerHTML =') || line.includes('.innerHTML+=')) {
      // Check if it injects unsanitized user inputs or raw query params
      if (line.includes('location.search') || line.includes('decodeURIComponent') || line.includes('params.get')) {
        issues.push({
          severity: 'ALTA',
          category: 'XSS REFLEJADO / DOM XSS',
          rule: 'Inyección directa de URL en innerHTML',
          line: idx + 1,
          detail: line.trim().slice(0, 120)
        });
      }
    }

    // 4. SQL Injection risks in backend / api
    if (relPath.startsWith('api')) {
      if (/(?:supabase|\.db)\.from\(.*[\+`].*\)/.test(line) || /(?:supabase|\.db)\.rpc\(.*[\+`].*\)/.test(line)) {
        issues.push({
          severity: 'ALTA',
          category: 'SQL INJECTION',
          rule: 'Concatenación en queries Supabase',
          line: idx + 1,
          detail: line.trim().slice(0, 120)
        });
      }
    }

    // 5. CSRF / CORS checks in api/
    if (relPath.startsWith('api') && line.includes("Access-Control-Allow-Origin', '*'")) {
      // Wildcard CORS on sensitive mutation endpoints
      if (relPath.includes('wompi') || relPath.includes('register') || relPath.includes('cancel')) {
        issues.push({
          severity: 'MEDIA',
          category: 'CORS PERMISIVO',
          rule: 'Access-Control-Allow-Origin con wildcard (*)',
          line: idx + 1,
          detail: 'Endpoint transaccional permite cualquier origen.'
        });
      }
    }
  });

  return { file: relPath, totalLines: lines.length, issues };
}

console.log('======================================================================');
console.log('🛡️  AUDITORÍA DE SEGURIDAD EXHAUSTIVA DE CÓDIGO FUENTE (FASE 1)       ');
console.log('======================================================================');

const report = [];
let totalCritical = 0;
let totalHigh = 0;
let totalMedium = 0;

filesToScan.forEach(f => {
  const res = scanFile(f);
  if (!res) return;
  report.push(res);

  res.issues.forEach(iss => {
    if (iss.severity === 'CRÍTICA') totalCritical++;
    if (iss.severity === 'ALTA') totalHigh++;
    if (iss.severity === 'MEDIA') totalMedium++;
  });
});

report.forEach(r => {
  if (r.issues.length === 0) {
    console.log(`✅ ${r.file.padEnd(30)} (${r.totalLines} líneas) : 0 hallazgos`);
  } else {
    console.log(`⚠️  ${r.file.padEnd(30)} (${r.totalLines} líneas) : ${r.issues.length} hallazgo(s)`);
    r.issues.forEach(iss => {
      console.log(`   [${iss.severity}] ${iss.category} (Línea ${iss.line || '-'}): ${iss.detail}`);
    });
  }
});

console.log('======================================================================');
console.log(`RESUMEN DE VULNERABILIDADES:`);
console.log(`  🚨 Críticas : ${totalCritical}`);
console.log(`  ⚠️  Altas    : ${totalHigh}`);
console.log(`  ℹ️  Medias   : ${totalMedium}`);
console.log('======================================================================');
