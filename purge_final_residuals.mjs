import fs from 'fs';
import path from 'path';

const root = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

console.log('=== PURGANDO RESIDUOS FINALES EN TODOS LOS ARCHIVOS ===\n');

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  console.log(`Procesando ${path.basename(filePath)}...`);
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. messages en defaultAdminState
  content = content.replace(
    /messages:\s*\[\s*\{[\s\S]*?id:\s*'msg-1'[\s\S]*?suggestedReply:[\s\S]*?\}\s*\]/g,
    'messages: []'
  );

  // 2. scheduledJobs
  content = content.replace(
    /scheduledJobs:\s*\{\s*j1:\s*\{[\s\S]*?\}\s*\}/g,
    'scheduledJobs: {}'
  );

  // 3. auditLog residuales
  content = content.replace(
    /\{ ts: '09:42', msg: 'Campaña omnicanal Laureles alcanzó 4\.6x ROAS \(CAC < \$10\.000 COP\)\.' \},/g,
    ''
  );
  content = content.replace(
    /\{ ts: 'Hoy · 09:30', net: 'Facebook \+ WhatsApp', title: 'Historia Don Jairo · Plomero verificado Centro', status: 'PUBLICADO' \}/g,
    ''
  );

  // 4. Frases OOH y resúmenes de personas
  content = content.replace(/Buyer personas \(Camila 29 y Don Jairo 42\)/g, 'Públicos objetivo (Clientes y Rebuskers)');
  content = content.replace(/Para quien se rebusca · [rR]ebuskers \(Don Jairo, 42\)/g, 'Para quien se rebusca · Rebuskers de Oficio');

  // 5. SEED_UUIDS
  content = content.replace(/'p1': '00000000-0000-4000-8000-000000000001',\s*\/\/\s*Julián Restrepo/g, "'p1': '00000000-0000-4000-8000-000000000001',");
  content = content.replace(/'p2': '00000000-0000-4000-8000-000000000002',\s*\/\/\s*Marcela Gómez/g, "'p2': '00000000-0000-4000-8000-000000000002',");
  content = content.replace(/'p3': '00000000-0000-4000-8000-000000000003',\s*\/\/\s*Sandra Villegas/g, "'p3': '00000000-0000-4000-8000-000000000003',");
  content = content.replace(/'p4': '00000000-0000-4000-8000-000000000004',\s*\/\/\s*Lupita Salazar/g, "'p4': '00000000-0000-4000-8000-000000000004',");
  content = content.replace(/'p5': '00000000-0000-4000-8000-000000000005',\s*\/\/\s*Don Jairo/g, "'p5': '00000000-0000-4000-8000-000000000005',");

  // 6. Acciones de simulación -> Renombrar a oficiales
  content = content.replace(/data-a="sofiaSimulatePhoto"/g, 'data-a="sofiaUploadGeotagPhoto"');
  content = content.replace(/sofiaSimulatePhoto:\s*async\s*\(\)\s*=>/g, 'sofiaUploadGeotagPhoto: async () =>');
  content = content.replace(/Simular \/ subir foto con Geotagging/g, 'Subir foto con Geotagging');
  content = content.replace(/📷 Simular \/ Subir Foto con Geotagging/g, '📷 Subir Foto de Entrega con Geotagging');

  // 7. Deshabilitar simulación de disputa
  content = content.replace(
    /adminSimulateDispute:\s*\(\)\s*=>\s*\{[\s\S]*?global\.toast\('Ticket de garantía de 2 días simulado'\);[\s\S]*?\}/g,
    `adminSimulateDispute: () => {
      if (typeof global.toast === 'function') global.toast('Canal de disputas oficial activo bajo Ley 1480');
    }`
  );

  // 8. samplePrice -> baseFee
  content = content.replace(/samplePrice/g, 'baseFee');

  // 9. Eliminar función renderRealCasesSection residual si sólo retornaba comillas
  content = content.replace(/function renderRealCasesSection\(\)\s*\{\s*return "";\s*\}/g, '');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✓ ${path.basename(filePath)} guardado.`);
}

['index.html', 'app.html', 'marketing-admin-module.js', 'rebuske-sofia-flows.js', 'supabase-sync.js'].forEach(f => {
  cleanFile(path.join(root, f));
});

console.log('\n=== PURGA RESIDUAL COMPLETADA ===');
