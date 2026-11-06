/**
 * ============================================================================
 * REBUSKE · MATRIZ OFICIAL DE TARIFAS Y RECARGOS TRANSPARENTES POR COMUNA
 * ============================================================================
 * Diseñado por: 📊 Ricardo 📊 (Pricing) & 📈 Elena 📈 (Ciencia de Datos)
 * Supervisado por: 🛡️ Dante 🛡️ (Filtro Crítico: Cero costos ocultos)
 * ============================================================================
 */

export const COMUNAS_MEDELLIN = {
  1: { nombre: 'Popular', zona: 'Nororiental', factorDistancia: 1.0 },
  2: { nombre: 'Santa Cruz', zona: 'Nororiental', factorDistancia: 1.0 },
  3: { nombre: 'Manrique', zona: 'Nororiental', factorDistancia: 1.0 },
  4: { nombre: 'Aranjuez', zona: 'Nororiental', factorDistancia: 1.0 },
  5: { nombre: 'Castilla', zona: 'Noroccidental', factorDistancia: 1.0 },
  6: { nombre: 'Doce de Octubre', zona: 'Noroccidental', factorDistancia: 1.0 },
  7: { nombre: 'Robledo', zona: 'Noroccidental', factorDistancia: 1.05 },
  8: { nombre: 'Villa Hermosa', zona: 'Centroriental', factorDistancia: 1.0 },
  9: { nombre: 'Buenos Aires', zona: 'Centroriental', factorDistancia: 1.0 },
  10: { nombre: 'La Candelaria (Centro)', zona: 'Centro', factorDistancia: 1.0 },
  11: { nombre: 'Laureles-Estadio', zona: 'Occidental', factorDistancia: 1.0 },
  12: { nombre: 'La América', zona: 'Occidental', factorDistancia: 1.0 },
  13: { nombre: 'San Javier', zona: 'Occidental', factorDistancia: 1.05 },
  14: { nombre: 'El Poblado', zona: 'Suroriental', factorDistancia: 1.10 },
  15: { nombre: 'Guayabal', zona: 'Suroccidental', factorDistancia: 1.0 },
  16: { nombre: 'Belén', zona: 'Suroccidental', factorDistancia: 1.0 },
  // Valle de Aburrá Conurbado
  envigado: { nombre: 'Envigado', zona: 'Sur Conurbado', factorDistancia: 1.10 },
  itagui: { nombre: 'Itagüí', zona: 'Sur Conurbado', factorDistancia: 1.05 },
  sabaneta: { nombre: 'Sabaneta', zona: 'Sur Conurbado', factorDistancia: 1.12 },
  bello: { nombre: 'Bello', zona: 'Norte Conurbado', factorDistancia: 1.08 }
};

export const RECARGOS_HORARIOS = {
  DIURNO_ESTANDAR: { factor: 1.0, etiqueta: 'Horario Normal (6:00 AM - 7:59 PM)', recargoPct: '0%' },
  NOCTURNO_TEMPRANO: { factor: 1.25, etiqueta: 'Urgencia Nocturna (8:00 PM - 11:59 PM)', recargoPct: '+25%' },
  MADRUGADA: { factor: 1.35, etiqueta: 'Urgencia Madrugada (12:00 AM - 5:59 AM)', recargoPct: '+35%' },
  DOMINGO_FESTIVO: { factor: 1.15, etiqueta: 'Domingo / Festivo', recargoPct: '+15%' }
};

export function cotizarServicioJusto({
  tarifaBaseCOP,
  idComuna = 11,
  tipoHorario = 'DIURNO_ESTANDAR',
  esDomingoOFestivo = false
}) {
  const comuna = COMUNAS_MEDELLIN[idComuna] || COMUNAS_MEDELLIN[11];
  const horario = RECARGOS_HORARIOS[tipoHorario] || RECARGOS_HORARIOS.DIURNO_ESTANDAR;

  let factorFinal = horario.factor;
  if (esDomingoOFestivo && tipoHorario === 'DIURNO_ESTANDAR') {
    factorFinal = RECARGOS_HORARIOS.DOMINGO_FESTIVO.factor;
  }

  const subtotalDesplazamiento = Math.round(tarifaBaseCOP * comuna.factorDistancia);
  const totalCotizadoCOP = Math.round(subtotalDesplazamiento * factorFinal);
  const sobrecostoUrgenciaCOP = totalCotizadoCOP - subtotalDesplazamiento;

  // Reparto Wompi (7% Oro VIP de por vida)
  const comisionRebuskeCOP = Math.round(totalCotizadoCOP * 0.07);
  const pagoNetoTecnicoCOP = totalCotizadoCOP - comisionRebuskeCOP;

  return {
    comuna: comuna.nombre,
    zona: comuna.zona,
    tarifaBaseCOP,
    horarioAplicado: horario.etiqueta,
    recargoUrgenciaVisible: sobrecostoUrgenciaCOP > 0 ? `+$${sobrecostoUrgenciaCOP.toLocaleString('es-CO')} COP (${horario.recargoPct})` : '$0 COP',
    totalFinalClienteCOP: totalCotizadoCOP,
    desgloseTransparente: {
      totalPagadoCliente: `$${totalCotizadoCOP.toLocaleString('es-CO')} COP`,
      comisionRebuske7pct: `$${comisionRebuskeCOP.toLocaleString('es-CO')} COP`,
      desembolsoNetoTecnico93pct: `$${pagoNetoTecnicoCOP.toLocaleString('es-CO')} COP`
    },
    mensajeTransparencia: 'En Rebuske el sobrecosto de urgencia se muestra antes de confirmar. Cero sorpresas ni costos ocultos en sitio.'
  };
}

// Test de ejecución
const testCotizacion = cotizarServicioJusto({
  tarifaBaseCOP: 80000,
  idComuna: 14, // El Poblado
  tipoHorario: 'NOCTURNO_TEMPRANO'
});

console.log('[COTIZADOR REBUSKE PRICING & DATA]:', JSON.stringify(testCotizacion, null, 2));
