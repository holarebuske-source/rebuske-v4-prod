/**
 * ============================================================================
 * REBUSKE · GENERADOR DE ACTA DIGITAL DE SERVICIO Y GARANTÍA WOMPI
 * ============================================================================
 * Desarrollado por: ⚖️ Elena ⚖️ (Legaltech) & 📜 Dr. Lorenzo 📜 (Compliance)
 * Marco Legal: Ley 527 de 1999 (Firmas Electrónicas) y Ley 1480 de 2011 (Consumidor)
 * ============================================================================
 */

import crypto from 'crypto';

export function generarActaServicio({
  idServicio,
  tecnico = { nombre: 'Julián Restrepo', cedula: '1020304050', id: 'TEC-042', tier: 'ORO_VIP' },
  cliente = { nombre: 'María Camila Gómez', cedula: '43890123', telefono: '3104567890' },
  inmueble = { direccion: 'Calle 10 # 43D-20, Apto 502', comuna: 'El Poblado (Comuna 14)', ciudad: 'Medellín' },
  servicio = { oficio: 'Plomería & Destapes', descripcion: 'Reparación de fuga en llave de paso y cambio de sifón de lavaplatos', materiales: 'Codo PVC 1/2", cinta teflón, sifón flexible Tigre' },
  liquidacion = { totalCOP: 120000, comisionRebuskeCOP: 8400, pagoNetoTecnicoCOP: 111600 }
}) {
  const timestamp = new Date().toISOString();
  const actaId = `ACTA-${idServicio || Date.now()}`;
  
  // Hash de Integridad Criptográfico (Ley 527 de 1999)
  const canonicalData = `${actaId}|${tecnico.cedula}|${cliente.cedula}|${liquidacion.totalCOP}|${timestamp}`;
  const sha256IntegrityHash = crypto.createHash('sha256').update(canonicalData).digest('hex');

  const actaDocument = {
    actaId,
    timestampUTC: timestamp,
    validezLegal: 'Ley 527 de 1999 (Firma y Mensaje de Datos Válido) · Ley 1480 de 2011',
    hashIntegridadSHA256: sha256IntegrityHash,
    partes: {
      profesionalPrimordial: {
        nombre: tecnico.nombre,
        documento: tecnico.cedula,
        codigoTecnico: tecnico.id,
        tierTarifa: 'Oro VIP 7% vitalicio'
      },
      usuarioCliente: {
        nombre: cliente.nombre,
        documento: cliente.cedula,
        contacto: cliente.telefono,
        ubicacion: inmueble
      }
    },
    laborRealizada: {
      oficio: servicio.oficio,
      detalle: servicio.descripcion,
      materialesSuministrados: servicio.materiales,
      estadoEntrega: 'VERIFICADO_Y_A_CONFORMIDAD'
    },
    bovedaWompiFintech: {
      montoTotalPagado: `$${liquidacion.totalCOP.toLocaleString('es-CO')} COP`,
      comisionRebuske: `$${liquidacion.comisionRebuskeCOP.toLocaleString('es-CO')} COP (7%)`,
      desembolsoNetoTecnico: `$${liquidacion.pagoNetoTecnicoCOP.toLocaleString('es-CO')} COP (93%)`,
      custodiaGarantiaHoras: 48,
      reglaLiberacion: 'Liberación instantánea al calificar 5★ o automática transcurridas 48 horas sin reporte de controversia.'
    },
    terminosGarantia: [
      'Garantía técnica de 48 horas en mano de obra a partir de la firma de este mensaje de datos.',
      'El cliente cuenta con canal directo de mediación vía WhatsApp (+57 304 381 2882) para resolver novedades.',
      'En caso de controversia, los fondos permanecen custodiados en la Bóveda Wompi hasta verificación en sitio.'
    ],
    firmaElectronica: {
      firmadoPorCliente: true,
      firmadoPorTecnico: true,
      metodoFirma: 'Autenticación OTP / Confirmación Biométrica Digital',
      selloTiempo: timestamp
    }
  };

  return actaDocument;
}

// Ejemplo de prueba rápida para verificar ejecución
const ejemplo = generarActaServicio({ idServicio: 'SRV-8941' });
console.log('[ACTA DIGITAL LEY 527 GENERADA]:', JSON.stringify({
  actaId: ejemplo.actaId,
  hash: ejemplo.hashIntegridadSHA256,
  validez: ejemplo.validezLegal,
  wompi: ejemplo.bovedaWompiFintech
}, null, 2));
