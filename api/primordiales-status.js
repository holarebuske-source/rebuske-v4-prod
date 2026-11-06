/**
 * API: /api/primordiales-status
 * Devuelve el estado en tiempo real de los 100 Cupos Primordiales
 * Rebuske - Medellín
 */

import fs from 'node:fs';
import path from 'node:path';

const DB_PATH = path.join(process.cwd(), 'rebuske_primordiales_db.json');
const INITIAL_BASELINE = 84;
const MAX_PRIMORDIALES = 100;

function getStore() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
      if (typeof data.count === 'number') return data;
    }
  } catch (e) {}
  return {
    count: INITIAL_BASELINE,
    registrations: []
  };
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const store = getStore();
  const currentCount = store.count;
  const remaining = Math.max(0, MAX_PRIMORDIALES - currentCount);
  const isPrimordialOpen = currentCount < MAX_PRIMORDIALES;

  return res.status(200).json({
    totalPrimordiales: MAX_PRIMORDIALES,
    currentCount,
    remaining,
    isOpen: isPrimordialOpen,
    phase: isPrimordialOpen ? 'FASE 1 - CONVOCATORIA PRIMORDIALES' : 'FASE 2 - REGISTRO REGULAR ESTÁNDAR',
    benefits: isPrimordialOpen
      ? {
          tipo: 'ORO_PRIMORDIAL',
          neto: '89%',
          comision: '11%',
          mes1: '1%',
          mes1Neto: '99%',
          luegoComision: '11%',
          luegoNeto: '89%',
          insignia: 'Oro VIP Primordial Vitalicia',
          escalaPlanes: {
            oro: { comision: '11%', neto: '89%', requisitos: '100 Fundadores o Calificación 4.9★+' },
            plata: { comision: '14%', neto: '86%', requisitos: '>10 servicios/mes y Rating 4.7★+' },
            bronce: { comision: '18%', neto: '82%', requisitos: 'Nuevos y ocasionales' }
          }
        }
      : {
          tipo: 'REGULAR',
          neto: '82%',
          comision: '18%',
          mes1: '18%',
          mes1Neto: '82%',
          insignia: 'Profesional Estándar Bronce',
          escalaPlanes: {
            oro: { comision: '11%', neto: '89%', requisitos: 'Calificación 4.9★+ y KYC verificado' },
            plata: { comision: '14%', neto: '86%', requisitos: '>10 servicios/mes y Rating 4.7★+' },
            bronce: { comision: '18%', neto: '82%', requisitos: 'Ingreso estándar inicial' }
          }
        }
  });
}
