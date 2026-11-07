# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 6: SISTEMA DE PAGOS COMPLETO Y BÓVEDA WOMPI
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:40 COT  
**Responsable del Desarrollo:** Tomás (FinTech Lead) & Mariana (CFO)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / EN PRODUCCIÓN  
**Documentos Relacionados:** DOC-02 (APIs), DOC-03 (Arquitectura), DOC-08 (Privacidad), DOC-09 (Seguridad).

---

### 1. MODELO JURÍDICO Y FINANCIERO: MANDATO COMERCIAL (ART. 1262 C.CO)

Rebuske opera bajo la figura jurídica de **Mandato Comercial de Cobranza** regulado por el Artículo 1262 del Código de Comercio de Colombia y el Artículo 1.2.4.11 del Decreto Único Reglamentario 1625 de 2016 (Estatuto Tributario):

```
       ┌────────────────────────────────────────────────────────┐
       │             CLIENTE (PAGA EL SERVICIO)                 │
       └──────────────────────────┬─────────────────────────────┘
                                  │ $154.900 COP
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │     BÓVEDA WOMPI - BANCOLOMBIA (EN CUSTODIA ESCROW)     │
       │     (Cuenta Contable 2815: Ingresos para Terceros)     │
       └──────────────────────────┬─────────────────────────────┘
                                  │
          Tras verificación de satisfacción y plazo 48h
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│       TÉCNICO / PROFESIONAL     │       │       REBUSKE PLATAFORMA        │
│  Recibe: $133.500 a $148.500    │       │  Recibe: $4.900 (Custodia) +    │
│  (89% a 99% del valor pactado)  │       │  Comisión por uso de software   │
└─────────────────────────────────┘       └─────────────────────────────────┘
```

1. **Ingresos para Terceros:** Los fondos pagados por el cliente no constituyen ingreso tributario para Rebuske; pertenecen íntegramente al técnico independiente.
2. **Cuenta Contable 2815:** Todos los montos se asientan contablemente como pasivos a favor de terceros hasta el desembolso final.
3. **Comprobante Digital de Mandato:** Cada transacción genera un certificado digital firmado con algoritmo SHA-256 que acredita el mandato y exime a la plataforma de retenciones en la fuente indebidas.

---

### 2. MATRIZ OFICIAL DE TARIFAS Y COMISIONES (INMUTABLE)

| Plan / Nivel | Criterio de Acceso | Comisión Plataforma | Ganancia Neta Técnico | Estado en Producción |
|---|---|---|---|---|
| **Mes 1 Fundador Primordial** | Primeros 100 técnicos en registro | **1%** | **99% neto en mano** | Activo (84/100 cupos tomados) |
| **Plan Oro VIP** | Fundadores / Calificación ≥4.9★ | **11%** | **89% neto** (Simulador: 93%) | Activo |
| **Plan Plata** | >25 servicios finalizados, ≥4.7★ | **14%** | **86% neto** | Activo |
| **Plan Bronce** | Inicial / Ocasional | **18%** | **82% neto** | Activo |
| **Cuota de Pago Protegido** | Pagada por el cliente | **$4.900 COP fija** | Cubre pasarela y peritaje | Activo |
| **Visita Diagnóstica** | Revisión inicial en sitio | **$35.000 COP fija** | Abonable al valor final | Activo |

---

### 3. TIPOS DE PAGO SOPORTADOS EN PRODUCCIÓN CON WOMPI

1. **Tarjetas de Crédito y Débito:** Visa, MasterCard, American Express (procesadas en Colombia con 3DS seguro).
2. **PSE (Pagos Seguros en Línea):** Conexión directa con todos los bancos colombianos (Bancolombia, Davivienda, BBVA, Banco de Bogotá, etc.).
3. **Nequi:** Cobro directo mediante notificación Push o código dinámico.
4. **Botón Bancolombia:** Transferencia directa desde la app de Bancolombia sin costo de intermediación para el usuario.

---

### 4. FLUJO TÉCNICO DE COBRO Y CONCILIACIÓN (`/api/wompi.js`)

```javascript
// 1. Cálculo en centavos y firma SHA-256
const quoteAmount = 150000; // Valor acordado de labor
const custodyFee = 4900;    // Cuota de custodia y garantía 48h
const totalAmount = quoteAmount + custodyFee;
const amountInCents = totalAmount * 100;
const reference = `REB_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

const signatureString = `${reference}${amountInCents}COP${CONFIG.wompi.integritySecret}`;
const signature = crypto.createHash('sha256').update(signatureString).digest('hex');

// 2. Registro en Ledger y Comprobante de Mandato
const transactionData = {
  reference,
  quote_amount: quoteAmount,
  custody_fee: custodyFee,
  total_amount: totalAmount,
  amount_in_cents: amountInCents,
  signature,
  account_code: "2815_INGRESOS_PARA_TERCEROS",
  mandato_hash: crypto.createHash('sha256').update(`MANDATO_${reference}_${quoteAmount}`).digest('hex'),
  status: "PENDING_PAYMENT"
};
```

---

### 5. POLÍTICA DE GARANTÍA LEGAL 48H Y REEMBOLSOS (LEY 1480 DE 2011)

- **Periodo de Retención Protectora:** Los fondos permanecen en la Bóveda Wompi durante el servicio y hasta **48 horas después de reportada la finalización** por parte del técnico.
- **Activación de Disputa por el Cliente:**
  - Si el cliente detecta una falla (ej: fuga residual o desperfecto eléctrico) dentro de las 48h, pulsa "Activar Garantía 48h".
  - Se suspende automáticamente el desembolso al profesional sin costo adicional.
  - El agente **Laura** o el perito técnico **Telmo** solicitan fotografía de evidencia.
  - Si el técnico no corrige en 24h, Rebuske asigna a un técnico Nivel Oro para la corrección o reembolsa el 100% del dinero retenido al cliente.

---

### 6. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Modelo de Mandato Comercial (Art. 1262 C.Co) y cuenta 2815 auditado.
- [x] Matriz de comisiones escalonadas (1% al 18%) preservada de forma inmutable.
- [x] Algoritmo de firma SHA-256 verificado en pruebas unitarias (`run-all-tests.mjs`).
- [x] Integración de métodos de pago colombianos (PSE, Nequi, Tarjetas, Bancolombia).
- [x] Protocolo de garantía de 48 horas con peritaje y retención escrow documentado.
