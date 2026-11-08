import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Compilando Documento Maestro con el 100% del Código Fuente...');

const filesToInclude = [
  { path: 'index.html', desc: 'App Web Principal (SPA, Buscador, Radar, Diagnóstico, Checkout Wompi)' },
  { path: 'entrada.html', desc: 'Página de Entrada Cinemática (Hero limpio sin canvas, Plus Jakarta Sans, Baloo 2)' },
  { path: 'registro.html', desc: 'Portal Unificado de Registro (Técnicos y Clientes)' },
  { path: 'registro-tecnico.html', desc: 'Registro de Profesionales Primordiales (Mandato Art. 1262 C.Co, 17 oficios, 5 fotos)' },
  { path: 'registro-cliente.html', desc: 'Registro de Clientes (Lista de espera VIP, bono $15.000 TUBONO15K-VIP)' },
  { path: 'tarifas.html', desc: 'Baremo Oficial y Transparente de Tarifas por Categoría y Oficio' },
  { path: 'terminos.html', desc: 'Términos y Condiciones Legales & Contrato de Mandato Comercial' },
  { path: 'privacidad.html', desc: 'Política de Tratamiento de Datos Personales (Ley 1581 de 2012)' },
  { path: 'reembolsos.html', desc: 'Protocolo de Garantía 48h y Política de Devoluciones (Ley 1480 de 2011)' },
  { path: 'supabase-sync.js', desc: 'Módulo Isomorfo de Sincronización en Tiempo Real con Supabase' },
  { path: 'sw.js', desc: 'Service Worker PWA para soporte y caché offline' },
  { path: 'manifest.json', desc: 'Web App Manifest oficial de rebuske PWA' },
  { path: 'vercel.json', desc: 'Configuración de Rutas, Rewrites y Cabeceras de Seguridad HTTP' },
  { path: 'api/wompi.js', desc: 'API Serverless: Checkout Wompi, firmas de integridad SHA-256 y Webhooks' },
  { path: 'api/dispatch-alert.js', desc: 'API Serverless: Motor de despacho inmediato y radar de proximidad (35-45 min)' },
  { path: 'api/register-pro.js', desc: 'API Serverless: Alta atómica de profesionales con estampado de mandato' },
  { path: 'api/register-client.js', desc: 'API Serverless: Alta de clientes en waitlist con validación Turnstile' },
  { path: 'api/whatsapp-webhook.js', desc: 'API Serverless: Bot Laura para atención WhatsApp 24/7 y triage de averías' },
  { path: 'api/chat.js', desc: 'API Serverless: Mensajería interna en tiempo real cliente-técnico' },
  { path: 'api/kyc-access.js', desc: 'API Serverless: Verificación de cédula, fotos reales y antecedentes' },
  { path: 'api/auth-otp.js', desc: 'API Serverless: Generación y validación de OTP por SMS/WhatsApp' },
  { path: 'api/send-email.js', desc: 'API Serverless: Envío de actas de peritaje y recibos de mandato' },
  { path: 'api/social-publish.js', desc: 'API Serverless: Publicador One-Touch en Meta, TikTok y X' },
  { path: 'api/activar-mes1-promo.js', desc: 'API Serverless: Activación de beneficio 1% comisión para fundadores' },
  { path: 'api/cancel-account.js', desc: 'API Serverless: Supresión de cuenta y datos conforme a Ley 1581 de 2012' }
];

let totalLines = 0;
let totalBytes = 0;

let htmlDoc = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>REBUSKE · CÓDIGO FUENTE COMPLETO DE LA APP Y PÁGINA DE ENTRADA</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #111; line-height: 1.5; padding: 30px; }
    .cover { background: #0B100E; color: #F2F5EC; padding: 40px; border-radius: 8px; margin-bottom: 40px; border-top: 8px solid #B8FF3B; }
    h1 { color: #B8FF3B; font-size: 28px; margin: 0 0 10px 0; }
    .file-box { page-break-before: always; margin-top: 40px; border-top: 3px solid #10B981; padding-top: 20px; }
    .file-header { background: #F1F5F9; border: 1px solid #CBD5E1; padding: 12px 18px; border-radius: 6px; margin-bottom: 16px; }
    .file-name { font-size: 18px; font-weight: bold; color: #0F172A; }
    .file-meta { font-size: 12px; color: #64748B; margin-top: 4px; }
    pre { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 15px; border-radius: 6px; font-family: 'Consolas', 'Courier New', monospace; font-size: 11px; line-height: 1.4; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }
  </style>
</head>
<body>
  <div class="cover">
    <h1>REBUSKE · CÓDIGO FUENTE COMPLETO (APP & PORTAL DE ENTRADA)</h1>
    <p><strong>Dossier de Código Maestro v5.0 Producción</strong></p>
    <p>Dirección General: Camilo Escobar (👑 Canashi 👑, CEO y Fundador)</p>
    <p>Este documento contiene la totalidad del código fuente sin omisiones, truncamientos ni elipsis. Cada línea de código está documentada e indexada.</p>
  </div>

  <h2>Índice General de Archivos Incluidos</h2>
  <ul>
`;

filesToInclude.forEach(f => {
  const fullPath = path.join(__dirname, f.path);
  if (fs.existsSync(fullPath)) {
    const stat = fs.statSync(fullPath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n').length;
    totalLines += lines;
    totalBytes += stat.size;
    htmlDoc += `    <li><strong>${f.path}</strong>: ${lines} líneas (${Math.round(stat.size / 1024 * 10) / 10} KB) — <em>${f.desc}</em></li>\n`;
  }
});

htmlDoc += `  </ul>
  <p><strong>Total de Líneas de Código Compiladas:</strong> ${totalLines.toLocaleString()} líneas</p>
  <p><strong>Tamaño Total del Código Fuente:</strong> ${(Math.round(totalBytes / 1024 * 10) / 10).toLocaleString()} KB</p>
  <hr style="margin: 30px 0; border: 0; border-top: 2px solid #E2E8F0;">
`;

// Insertar el 100% de cada archivo
filesToInclude.forEach((f, idx) => {
  const fullPath = path.join(__dirname, f.path);
  if (fs.existsSync(fullPath)) {
    const stat = fs.statSync(fullPath);
    const rawContent = fs.readFileSync(fullPath, 'utf8');
    const lines = rawContent.split('\n').length;
    
    // Escapar HTML en el código para que se muestre verbatim
    const escaped = rawContent
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    htmlDoc += `
  <div class="file-box">
    <div class="file-header">
      <div class="file-name">[${idx + 1}/25] Archivo: ${f.path}</div>
      <div class="file-meta">Descripción: ${f.desc} | Líneas: ${lines} | Tamaño: ${stat.size} bytes</div>
    </div>
    <pre><code>${escaped}</code></pre>
  </div>
`;
  }
});

htmlDoc += `
</body>
</html>
`;

const outDocPath = path.join(__dirname, 'CODIGO_COMPLETO_REBUSKE_APP_Y_ENTRADA.doc');
fs.writeFileSync(outDocPath, htmlDoc, 'utf8');

const statsDoc = fs.statSync(outDocPath);
console.log(`✅ Documento Maestro generado: ${outDocPath}`);
console.log(`   Líneas compiladas: ${totalLines.toLocaleString()}`);
console.log(`   Tamaño del archivo: ${statsDoc.size.toLocaleString()} bytes (${Math.round(statsDoc.size / 1024)} KB)`);
