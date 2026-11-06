/**
 * ============================================================================
 * REBUSKE · DESPACHO INTEGRAL DE LAS 4 CAMPAÑAS SOCIALES (120 POSTS EN TOTAL)
 * ============================================================================
 * Correo 1: Instagram (30 posts + banner)
 * Correo 2: TikTok (30 posts/guiones + banner)
 * Correo 3: Facebook (30 posts + banner)
 * Correo 4: LinkedIn (30 posts + banner)
 * 
 * Destinatario: holarebuske@gmail.com con copia a camiloescobarr63@gmail.com
 * ============================================================================
 */

import { sendInstagramEmail } from './dispatch_instagram_campaign.mjs';
import { sendTikTokEmail } from './dispatch_tiktok_campaign.mjs';
import { sendFacebookEmail } from './dispatch_facebook_campaign.mjs';
import { sendLinkedInEmail } from './dispatch_linkedin_campaign.mjs';

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runAll() {
  console.log('======================================================================');
  console.log('🚀 INICIANDO DESPACHO DE 4 CORREOS DE PUBLICIDAD OFICIAL DE REBUSKE');
  console.log('======================================================================');
  
  const results = [];

  try {
    console.log('\n[1/4] Despachando Campaña de Instagram...');
    await sendInstagramEmail();
    results.push({ network: 'Instagram', status: 'SENT', posts: 30 });
  } catch (err) {
    console.error('❌ Error enviando Instagram:', err);
    results.push({ network: 'Instagram', status: 'ERROR', error: err.message });
  }

  await wait(3000);

  try {
    console.log('\n[2/4] Despachando Campaña de TikTok...');
    await sendTikTokEmail();
    results.push({ network: 'TikTok', status: 'SENT', posts: 30 });
  } catch (err) {
    console.error('❌ Error enviando TikTok:', err);
    results.push({ network: 'TikTok', status: 'ERROR', error: err.message });
  }

  await wait(3000);

  try {
    console.log('\n[3/4] Despachando Campaña de Facebook...');
    await sendFacebookEmail();
    results.push({ network: 'Facebook', status: 'SENT', posts: 30 });
  } catch (err) {
    console.error('❌ Error enviando Facebook:', err);
    results.push({ network: 'Facebook', status: 'ERROR', error: err.message });
  }

  await wait(3000);

  try {
    console.log('\n[4/4] Despachando Campaña de LinkedIn...');
    await sendLinkedInEmail();
    results.push({ network: 'LinkedIn', status: 'SENT', posts: 30 });
  } catch (err) {
    console.error('❌ Error enviando LinkedIn:', err);
    results.push({ network: 'LinkedIn', status: 'ERROR', error: err.message });
  }

  console.log('\n======================================================================');
  console.log('📊 RESUMEN FINAL DE DESPACHO A HOLAREBUSKE@GMAIL.COM');
  console.log('======================================================================');
  console.table(results);
}

runAll().catch(console.error);
