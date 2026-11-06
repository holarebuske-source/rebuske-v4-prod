# REBUSKE · DOSSIER CONTABLE Y TRIBUTARIO PARA CONTADORES Y REVISORES FISCALES
**Guía Oficial de Facturación Electrónica e Ingresos Recibidos para Terceros (DIAN)**
*Versión 4.2 · Sede Medellín · Actualizado a Normativa 2026*

---

## 1. RESUMEN EJECUTIVO PARA EL CONTADOR

**rebuske** es una plataforma digital de intermediación tecnológica que opera bajo la figura jurídica de **Contrato de Mandato Comercial de Cobro e Intermediación** (Artículo 1262 del Código de Comercio).

### Regla de Oro Contable:
> **rebuske NO factura el 100% del valor de los servicios locativos prestados por los técnicos independientes.**  
> Únicamente factura electrónicamente su **Comisión por Servicio de Intermediación Tecnológica del 7%** (o 1% durante el mes de promoción de fundadores).  
> El **93% restante** constituye **Ingresos Recibidos para Terceros** y debe contabilizarse en el **Pasivo (Cuenta 2815)**, sin constituir ingreso bruto, ni base de renta, ni base de ICA para la plataforma.

---

## 2. MARCO LEGAL TRIBUTARIO (COLOMBIA)

1. **Artículo 1262 y ss. del Código de Comercio:** Define el mandato comercial, por el cual el mandatario (rebuske) se encarga de prestar servicios tecnológicos de intermediación y gestión de recaudo por cuenta del mandante (el técnico independiente).
2. **Artículo 1.2.4.11 del Decreto Único Reglamentario 1625 de 2016 (DUR):** Regula los pagos o abonos en cuenta realizados por el mandatario por cuenta del mandante y el tratamiento de los ingresos recibidos para terceros.
3. **Conceptos Unificados DIAN (Oficio 017774 de 2019 y Oficio 901540 de 2021):** La DIAN ratifica que en las plataformas colaborativas y marketplaces de servicios, la empresa intermediaria solo debe reconocer como ingreso propio el valor de la comisión cobrada y facturada al usuario o al prestador del servicio.
4. **Ley 1480 de 2011 (Estatuto del Consumidor):** Garantiza la transparencia en los precios al consumidor final, mostrando el desglose entre el servicio contratado y la tarifa de intermediación.

---

## 3. DINÁMICA DE ASIENTOS CONTABLES (PLAN ÚNICO DE CUENTAS - PUC)

A continuación se detalla la parametrización contable para el software contable (Siigo, Alegra, World Office, etc.) para un servicio típico de **$100.000 COP**:

### Caso Práctico: Servicio de Plomería por $100.000 COP
* **Valor total recaudado por Wompi:** $100.000 COP
* **Ingreso del técnico (93%):** $93.000 COP
* **Comisión rebuske (7%):** $7.000 COP
* *(Si es responsable de IVA régimen común: IVA 19% sobre los $7.000 = $1.330 COP. Si no es responsable de IVA: $0 COP)*

---

### Asiento 1: Recaudo Inicial a través de la Pasarela Wompi
Al recibir la confirmación de pago de Wompi (evento `APPROVED` en webhook):

| Código PUC | Nombre de la Cuenta | Débito | Crédito |
| :--- | :--- | :---: | :---: |
| **111005** | Bancos / Pasarela de Pagos Wompi Recaudo | $100.000 | |
| **281505** | Ingresos Recibidos para Terceros (Técnico Independiente) | | $93.000 |
| **416005** | Ingresos Operacionales - Comisiones de Intermediación rebuske | | $7.000 |
| **Sumas Iguales:** | | **$100.000** | **$100.000** |

*(Nota: La cuenta 281505 es una cuenta de **Pasivo**. Refleja una obligación de rebuske de trasladar esos $93.000 al técnico una vez finalizado el trabajo).*

---

### Asiento 2: Dispersión del Pago al Técnico Independiente
Cuando el cliente firma el acta digital de entrega y la plataforma ordena la transferencia hacia Nequi, Daviplata o Bancolombia del profesional:

| Código PUC | Nombre de la Cuenta | Débito | Crédito |
| :--- | :--- | :---: | :---: |
| **281505** | Ingresos Recibidos para Terceros (Técnico Independiente) | $93.000 | |
| **111005** | Bancos / Wompi Dispersión (Salida de fondos al técnico) | | $93.000 |
| **Sumas Iguales:** | | **$93.000** | **$93.000** |

*Resultado contable:* La cuenta 281505 queda en **cero ($0)**. No quedan pasivos pendientes y en las cuentas de resultados solo quedó registrado el ingreso real de rebuske (**$7.000** en la 416005).

---

### Asiento 3: Costo Financiero de la Pasarela Wompi (Deducción por Transacción)
Wompi deduce su tarifa de adquirencia (ej. 2.65% + $700 + IVA sobre la tarifa):

| Código PUC | Nombre de la Cuenta | Débito | Crédito |
| :--- | :--- | :---: | :---: |
| **530515** | Gastos Financieros - Comisiones Pasarela Wompi | Tarifa Wompi | |
| **111005** | Bancos / Wompi | | Tarifa Wompi |

---

## 4. EMISIÓN DE FACTURA ELECTRÓNICA DE VENTA

Para cumplir con la Resolución DIAN 000042 de 2020 y normativas concordantes:

1. **Emisor:** Camilo Escobar / rebuske.
2. **Adquirente:** El cliente que pagó el servicio.
3. **Concepto en la Factura:**
   * *Código estándar:* Servicios de intermediación por plataforma tecnológica.
   * *Descripción:* `"Comisión de intermediación tecnológica y acompañamiento de servicio rebuske #REB-XXXXX"`.
   * *Valor Unitario:* `$7.000 COP` (o el valor de la comisión cobrada).
   * *IVA:* Tarifa general del 19% sobre los $7.000 (si es responsable de IVA) o exento/excluido si pertenece al régimen no responsable (antiguo régimen simplificado).
4. **Nota Informativa al Pie de la Factura:**
   > *"La presente factura ampara exclusivamente la comisión por el servicio de intermediación tecnológica. El valor restante del servicio locativo ($93.000 COP) corresponde a ingresos recibidos para terceros en virtud del Contrato de Mandato Comercial (Art. 1262 C.Co y Art. 1.2.4.11 DUR 1625/2016), siendo el técnico independiente el prestador directo de la labor contratada."*

---

## 5. DOCUMENTO SOPORTE ELECTRÓNICO EN ADQUISICIONES A NO OBLIGADOS A FACTURAR

Los técnicos independientes (plomeros, electricistas) generalmente son personas naturales no obligadas a expedir factura electrónica.  
* Para justificar la salida de los recursos ante la DIAN, rebuske registra en su base de datos el acta digital de entrega con la cédula del técnico, valor pagado y fecha.
* Si se requiere formalidad adicional, el software contable de rebuske puede emitir el **Documento Soporte Electrónico para No Obligados a Facturar** transmitido a la DIAN.

---

## 6. AUDITORÍA Y DISPONIBILIDAD DEL LIBRO MAYOR EN SERVIDOR
El servidor de rebuske (`api/wompi.js`) almacena cada transacción en el archivo de libro mayor `wompi_transactions_ledger.json` con los siguientes campos listos para exportar a Excel:
* `reference`: Código único de transacción.
* `totalCOP`: Monto total cobrado al cliente.
* `ingresoTerceroCOP`: 93% correspondiente al técnico.
* `comisionRebuskeCOP`: 7% base gravable de rebuske.
* `status`: Estado bancario oficial confirmado por Wompi (`APPROVED`).
* `dianAccounting`: Codificación contable estandarizada para auditoría tributaria.
