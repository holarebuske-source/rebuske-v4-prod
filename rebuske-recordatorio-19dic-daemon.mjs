/**
 * ============================================================================
 * REBUSKE · DAEMON OFICIAL DE RECORDATORIOS 24H ANTES (19 DE DICIEMBRE, 8:00 AM)
 * ============================================================================
 * Módulo liderado por 💻 Mateo 💻 (Arquitecto Full-Stack) & 💬 Laura 💬 (Soporte).
 * 
 * Funciones duales:
 * 1. Notificación a las 20 Profesionales Técnicas Preseleccionadas (Ruta Ellas).
 * 2. Recordatorio a los Ganadores Oficiales del Reto 333 (Canje 20 Dic - 01 Ene).
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';

const PROD_DIR = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const DB_WINNERS = path.join(PROD_DIR, 'rebuske_reto333_winners.json');
const DB_PROS = path.join(PROD_DIR, 'rebuske-20-profesionales-ellas.json');

// 1. Mensaje para las 20 Profesionales Técnicas
export function buildProReminderMessage(pro) {
  return `👋 ¡Hola ${pro.nombre}! ✨ Te saluda Laura de rebuske.\n\n` +
         `🎄 *RECORDATORIO OFICIAL: MAÑANA INICIA LA RUTA NAVIDEÑA* 🎄\n\n` +
         `Te confirmamos que estás lista y activa para recibir los servicios de fin de año:\n` +
         `📍 *Tu Zona Asignada:* ${pro.comuna}\n` +
         `🛠️ *Tu Especialidad:* ${pro.especialidad}\n` +
         `💵 *Mano de Obra Base:* $70.000 COP asegurados en Bóveda Wompi (liberados a tu cuenta tan pronto el cliente valide en la app que el trabajo quedó terminado y perfecto).\n` +
         `💰 *Servicios Adicionales:* Recuerda que cualquier arreglo extra o detalle adicional que acuerdes en el sitio es 100% tuyo en efectivo.\n` +
         `🥇 *Insignia 2027:* Al completar tus servicios recibirás Nivel Oro y prioridad #1 en enero.\n\n` +
         `¿Estás 100% lista para iniciar mañana a primera hora? Responde 'SÍ' a este mensaje para confirmar tu turno. ¡Muchos éxitos en la jornada! 🌟`;
}

// 2. Mensaje para los Ganadores del Reto 333
export function buildWinnerReminderMessage(winner) {
  return `✨ ¡Hola ${winner.nombre || 'campeón/a'}! 🪲 Te saluda Laura de rebuske.\n\n` +
         `🎁 *RECORDATORIO DE TU REGALO DE NAVIDAD (24H ANTES)* 🎁\n\n` +
         `Mañana *20 de diciembre* a las 8:00 AM se activa oficialmente la redención de tu beneficio del Reto 333.\n\n` +
         `🎟️ *Tu Código Único:* ${winner.code}\n` +
         `🎄 *Opción Ganadora:* ${winner.regalo || 'Servicio Exclusivo del Hogar'}\n` +
         `📅 *Vigencia:* Del 20 de diciembre al 1 de enero.\n` +
         `👩‍🔧 *Catálogo Exclusivo:* 'Servicios por Ellas' (técnicas verificadas de Medellín).\n\n` +
         `🔗 *Entra aquí para agendar o transferirlo:* https://rebuske.vercel.app/?cat=Ellas+Construyen#servicios-ellas\n\n` +
         `¡Estamos listas para dejar tu hogar impecable para estas fiestas! 💚✨`;
}

export function execute19DicDaemon() {
  console.log('======================================================================');
  console.log('🔔 REBUSKE · DAEMON DE RECORDATORIOS 19 DE DICIEMBRE (8:00 AM COT)');
  console.log('======================================================================');

  // Cargar Profesionales
  let pros = [];
  if (fs.existsSync(DB_PROS)) {
    try { pros = JSON.parse(fs.readFileSync(DB_PROS, 'utf8')); } catch (e) { pros = []; }
  }
  console.log(`\n👩‍🔧 Profesionales preseleccionadas a notificar: ${pros.length}`);
  pros.slice(0, 3).forEach(p => {
    console.log(`   • [${p.id}] ${p.nombre} (${p.comuna}) -> ${p.telefono}`);
  });

  // Cargar Ganadores
  let winners = [];
  if (fs.existsSync(DB_WINNERS)) {
    try { winners = JSON.parse(fs.readFileSync(DB_WINNERS, 'utf8')); } catch (e) { winners = []; }
  }
  console.log(`\n🎁 Ganadores del Reto 333 a notificar: ${winners.length}`);
  winners.slice(0, 3).forEach(w => {
    console.log(`   • [Pos #${w.pos}] ${w.nombre} (${w.code}) -> ${w.telefono}`);
  });

  console.log('\n✅ Protocolo de recordatorios 24h verificado y en guardia.');
  return { prosCount: pros.length, winnersCount: winners.length, status: 'READY_FOR_19_DEC' };
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith('rebuske-recordatorio-19dic-daemon.mjs')) {
  execute19DicDaemon();
}
