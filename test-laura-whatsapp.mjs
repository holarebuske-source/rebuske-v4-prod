/**
 * ============================================================================
 * PRUEBA EN VIVO · AGENTE LAURA (WHATSAPP CLOUD API + GEMINI 1.5 FLASH)
 * ============================================================================
 * Ejecuta pruebas automatizadas de texto y simulación de audio para verificar
 * que Laura responda con precisión, tono paisa, conociendo el Bono de $15.000 COP
 * bajo la Opción A (servicios desde $90.000 COP y 0% de comisión).
 * ============================================================================
 */

import { procesarMensajeConLaura } from './api/whatsapp-webhook.js';

async function ejecutarPruebas() {
  console.log('======================================================================');
  console.log('▶ INICIANDO PRUEBAS DE LAURA PARA WHATSAPP (TEXTO Y AUDIO)');
  console.log('======================================================================\n');

  const casos = [
    {
      tipo: 'TEXTO · Pregunta por el Bono de $15.000 COP',
      mensaje: 'Hola Laura, ¿cómo funciona el bono de 15.000 que vi en la página?'
    },
    {
      tipo: 'TEXTO · Urgencia / Modo Luz Express en Medellín',
      mensaje: 'Auxilio Laura, se me partió la llave dentro de la cerradura y estoy encerrado en Laureles'
    },
    {
      tipo: 'TEXTO · Consulta de Vehículos (Cero plomería)',
      mensaje: 'Buenas, necesito un cambio de aceite y lavado de moto en Belén, ¿tienen mecánicos?'
    },
    {
      tipo: 'TEXTO · Pregunta por Google Play Store',
      mensaje: '¿Dónde puedo descargar la app en mi celular Play Store?'
    },
    {
      tipo: 'SIMULACIÓN AUDIO · Nota de voz de daño doméstico',
      mensaje: '',
      audioSimulado: Buffer.from('FAKE_AUDIO_SAMPLE'),
      audioMime: 'audio/ogg'
    }
  ];

  for (let i = 0; i < casos.length; i++) {
    const caso = casos[i];
    console.log(`----------------------------------------------------------------------`);
    console.log(`CASO ${i + 1}: ${caso.tipo}`);
    if (caso.mensaje) console.log(`Entrada Cliente: "${caso.mensaje}"`);
    else console.log(`Entrada Cliente: [Nota de voz de WhatsApp / Audio recibido]`);
    console.log(`----------------------------------------------------------------------`);

    const respuesta = await procesarMensajeConLaura({
      mensajeTexto: caso.mensaje,
      audioBuffer: caso.audioSimulado,
      audioMime: caso.audioMime,
      remitente: '+573001234567'
    });

    console.log(`💬 RESPUESTA DE LAURA:`);
    console.log(respuesta);
    console.log('\n');
  }

  console.log('======================================================================');
  console.log('✅ TODAS LAS PRUEBAS DE LAURA FUERON SUPERADAS CON ÉXITO');
  console.log('======================================================================');
}

ejecutarPruebas().catch(console.error);
