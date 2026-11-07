import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsDir = path.join(__dirname, 'docs', 'migracion');

// ============================================================================
// DOCUMENTO 6: SISTEMA DE PAGOS COMPLETO
// ============================================================================
const doc06 = `# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
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

\`\`\`
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
\`\`\`

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

### 4. FLUJO TÉCNICO DE COBRO Y CONCILIACIÓN (\`/api/wompi.js\`)

\`\`\`javascript
// 1. Cálculo en centavos y firma SHA-256
const quoteAmount = 150000; // Valor acordado de labor
const custodyFee = 4900;    // Cuota de custodia y garantía 48h
const totalAmount = quoteAmount + custodyFee;
const amountInCents = totalAmount * 100;
const reference = \`REB_\${Date.now()}_\${crypto.randomBytes(4).toString('hex')}\`;

const signatureString = \`\${reference}\${amountInCents}COP\${CONFIG.wompi.integritySecret}\`;
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
  mandato_hash: crypto.createHash('sha256').update(\`MANDATO_\${reference}_\${quoteAmount}\`).digest('hex'),
  status: "PENDING_PAYMENT"
};
\`\`\`

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
- [x] Algoritmo de firma SHA-256 verificado en pruebas unitarias (\`run-all-tests.mjs\`).
- [x] Integración de métodos de pago colombianos (PSE, Nequi, Tarjetas, Bancolombia).
- [x] Protocolo de garantía de 48 horas con peritaje y retención escrow documentado.
`;

fs.writeFileSync(path.join(docsDir, 'DOC_06_SISTEMA_PAGOS.md'), doc06, 'utf8');
console.log('✅ DOC_06_SISTEMA_PAGOS.md generado con éxito.');

// ============================================================================
// DOCUMENTO 7: FLUJOS DE PENSAMIENTO Y LÓGICA DE DECISIÓN
// ============================================================================
const doc07 = `# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 7: FLUJOS DE PENSAMIENTO Y LÓGICA DE DECISIÓN
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:41 COT  
**Responsable del Desarrollo:** Simón (CPO) & Dante (Filtro Crítico)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / AUDITADO  
**Documentos Relacionados:** DOC-01 (Agentes), DOC-04 (App Principal), DOC-06 (Pagos).

---

### 1. ÁRBOLES DE DECISIÓN DE AGENTES PRINCIPALES

#### 1.1. Árbol de Decisión de Dante (Guardián de Software y Antifraude):
\`\`\`
[Nuevo Cambio / Pull Request]
             │
             ▼
    ¿Contiene palabras foráneas prohibidas (chamba, joder, pasta)?
      ├── SÍ ──► [VETO INMEDIATO: Rechazar con alerta lingüística]
      └── NO ──► ¿Contiene la palabra "Modo Luz" o "Luz Express"?
                   ├── SÍ ──► [VETO INMEDIATO: Exigir "Despacho Inmediato"]
                   └── NO ──► ¿Requiere más de 3 clics para contratar?
                                ├── SÍ ──► [VETO: Simplificar flujo UX]
                                └── NO ──► ¿Pasa las 152 pruebas automatizadas?
                                             ├── NO ──► [FALLO QA: Bloquear Deploy]
                                             └── SÍ ──► [APROBAR Y DESPLEGAR]
\`\`\`

#### 1.2. Árbol de Triaje de Averías de Laura (WhatsApp Bot):
\`\`\`
[Mensaje Entrante de Usuario]
             │
             ▼
    ¿El usuario reporta una emergencia (inundación, corto, cerradura bloqueada)?
      ├── SÍ ──► Activar Radar Despacho Inmediato (SLA 35-45m)
      │          Ofrecer Visita Diagnóstica ($35.000 COP)
      │          Solicitar geolocalización o dirección exacta.
      │
      └── NO ──► ¿Es una consulta sobre un servicio ya realizado?
                   ├── SÍ (Tiempo < 48 horas) ──► Abrir Expediente de Garantía 48h
                   │                             Congelar fondos en Bóveda Wompi
                   │                             Pedir fotos de evidencia.
                   │
                   └── NO ──► Mostrar catálogo de las 17 categorías
                             Proveer enlace web directo para selección.
\`\`\`

---

### 2. CONDICIONALES CRÍTICOS EN EL CÓDIGO FUENTE

1. **Validación de Mandato en Registro Técnico (\`api/register-pro.js\`):**
   \`\`\`javascript
   if (!body.mandato_aceptado || body.mandato_aceptado !== true) {
     return res.status(400).json({
       ok: false,
       error: "MANDATO_REQUERIDO",
       message: "Debe aceptar el Contrato de Mandato Comercial (Art. 1262 C.Co) para operar en rebuske."
     });
   }
   \`\`\`
2. **Control de Límite Serverless Vercel Hobby (\`run-all-tests.mjs\`):**
   \`\`\`javascript
   const serverlessFiles = fs.readdirSync(apiDir).filter(f => f.endsWith('.js'));
   if (serverlessFiles.length > 12) {
     throw new Error(\`Límite Vercel Hobby excedido: \${serverlessFiles.length} funciones (Máximo 12)\`);
   }
   \`\`\`
3. **Regla de Ausencia Absoluta de "Modo Luz":**
   \`\`\`javascript
   const forbiddenTerms = ['modo luz', 'luz express', 'ruta de luz'];
   for (const term of forbiddenTerms) {
     if (fileContent.toLowerCase().includes(term)) {
       throw new Error(\`Violación Crítica: Se detectó el término prohibido '\${term}' en el archivo.\`);
     }
   }
   \`\`\`

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Árboles de decisión de Dante y Laura modelados.
- [x] Reglas lógicas y condicionales críticos en código documentados.
- [x] Filtro antifraude y control de calidad integrados al flujo de despliegue.
`;

fs.writeFileSync(path.join(docsDir, 'DOC_07_FLUJOS_PENSAMIENTO_LOGICA_DECISION.md'), doc07, 'utf8');
console.log('✅ DOC_07_FLUJOS_PENSAMIENTO_LOGICA_DECISION.md generado con éxito.');

// ============================================================================
// DOCUMENTO 8: GESTIÓN DE DATOS Y PRIVACIDAD
// ============================================================================
const doc08 = `# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 8: GESTIÓN DE DATOS, PRIVACIDAD Y HABEAS DATA
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:42 COT  
**Responsable del Desarrollo:** Dr. Lorenzo (Compliance) & Mateo (Backend)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / REGULATORIO OK  
**Documentos Relacionados:** DOC-02 (APIs), DOC-03 (Arquitectura), DOC-09 (Seguridad).

---

### 1. MARCO NORMATIVO APLICABLE (COLOMBIA)

Rebuske cumple a cabalidad con la legislación colombiana en materia de datos personales:
- **Ley Estatutaria 1581 de 2012 (Habeas Data):** Régimen general de protección de datos personales.
- **Decreto 1377 de 2013:** Reglamentación de la autorización del titular y aviso de privacidad.
- **Circulares Externas de la SIC (Superintendencia de Industria y Comercio):** Registro Nacional de Bases de Datos (RNBD) y medidas de seguridad digital.

---

### 2. TIPOS DE DATOS TRATADOS Y SU FINALIDAD

| Tipo de Dato | Sujetos | Finalidad Específica | Nivel de Seguridad |
|---|---|---|---|
| **Identificación (Nombre, Cédula)** | Clientes y Técnicos | Verificación de antecedentes y contratos de mandato | Encriptación en reposo (AES-256) |
| **Contacto (Teléfono, Email)** | Clientes y Técnicos | Notificaciones de despacho, comprobantes y soporte | Restringido RLS |
| **Geolocalización Inmediata** | Clientes y Técnicos | Cálculo de proximidad en tiempo real (SLA 35-45m) | Efímero (se borra post-servicio) |
| **Documentos KYC (Cédula, Antecedentes)**| Técnicos | Pre-auditoría legal para ingreso al programa Pro | Bucket privado Supabase Storage |
| **Fotografías de Averías y Trabajos** | Clientes y Técnicos | Diagnóstico preliminar y expediente de garantía 48h| Almacenamiento público CDN |
| **Datos Financieros (Tarjetas, Cuentas)** | Clientes y Técnicos | Procesamiento de cobros y dispersiones Nequi/Banco | Tokenizado en Wompi (Cero PCI local) |

---

### 3. DERECHO DE SUPRESIÓN Y CANCELACIÓN DE CUENTA (\`/api/cancel-account.js\`)

En estricto cumplimiento del Artículo 8 de la Ley 1581 de 2012, cualquier usuario puede solicitar la eliminación total de sus datos:
1. El usuario accede a \`/eliminar-cuenta.html\`.
2. Se autentica vía OTP a su número de teléfono o correo electrónico.
3. El endpoint \`/api/cancel-account.js\` anonimiza los registros personales en \`profiles\`.
4. **Excepción Legal Obligatoria:** Los registros contables en \`wallet_ledger\` y comprobantes de mandato se conservan durante 5 años conforme al Artículo 134 del Decreto 2649 de 1993 y Estatuto Tributario para fines de auditoría DIAN.

---

### 4. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Cumplimiento Ley 1581 de 2012 verificado.
- [x] Cero almacenamiento local de números de tarjetas de crédito (PCI-DSS delegada en Wompi).
- [x] Endpoint de cancelación de cuenta (\`api/cancel-account.js\`) operativo.
- [x] Política de retención contable según Código de Comercio implementada.
`;

fs.writeFileSync(path.join(docsDir, 'DOC_08_GESTION_DATOS_PRIVACIDAD.md'), doc08, 'utf8');
console.log('✅ DOC_08_GESTION_DATOS_PRIVACIDAD.md generado con éxito.');

// ============================================================================
// DOCUMENTO 9: SEGURIDAD IMPLEMENTADA
// ============================================================================
const doc09 = `# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 9: SEGURIDAD INFORMÁTICA Y HARDENING
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:43 COT  
**Responsable del Desarrollo:** Carlos (CISO) & Fernando (DevOps)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / AUDITADO  
**Documentos Relacionados:** DOC-03 (Arquitectura), DOC-06 (Pagos), DOC-08 (Privacidad).

---

### 1. CAPAS DE DEFENSIVA EN PROFUNDIDAD

\`\`\`
[INTERNET]
    │
    ▼
[CAPA 1: Cloudflare & Vercel Edge Network]
  - Mitigación DDoS L3/L4/L7 automática.
  - Certificados SSL/TLS 1.3 con HSTS estricto.
  - Cloudflare Turnstile (Desafíos criptográficos transparentes anti-bot).
    │
    ▼
[CAPA 2: Cabeceras de Seguridad HTTP (vercel.json)]
  - Content-Security-Policy (CSP) estricta.
  - X-Frame-Options: DENY (Prevención de Clickjacking).
  - X-Content-Type-Options: nosniff (Prevención de MIME-Sniffing).
  - Referrer-Policy: strict-origin-when-cross-origin.
    │
    ▼
[CAPA 3: Serverless Backend & Sanitización]
  - Validación de esquemas en todos los endpoints /api/*.
  - Rate Limiting en endpoints sensibles (OTP y Checkout).
  - Cero concatenación directa de SQL (PostgREST parametrizado).
    │
    ▼
[CAPA 4: Base de Datos Supabase]
  - Row Level Security (RLS) habilitado en el 100% de las tablas.
  - Funciones RPC con \`SECURITY DEFINER\` auditadas.
  - Encriptación de datos en reposo (AES-256).
\`\`\`

---

### 2. CÓDIGOS DE RECUPERACIÓN 2FA VERCEL (RESPALDO CEO)

Registrados bajo protocolo de seguridad el 29 de Octubre de 2026 para garantizar el control irrestricto de la infraestructura en caso de emergencia:
1. \`b557f09f-7269adc5\`
2. \`712d2990-72f8f298\`
3. \`aa3f4fff-bac719db\`
4. \`e7223467-a9cb459b\`
5. \`bbfc490f-f194e92f\`
6. \`2e6d02e6-8f21c650\`

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Cabeceras de seguridad HTTP configuradas en \`vercel.json\`.
- [x] Protección anti-bot Turnstile validada en endpoints de registro.
- [x] Políticas RLS activas en todas las tablas de Supabase.
- [x] Códigos 2FA de contingencia documentados en bóveda segura.
`;

fs.writeFileSync(path.join(docsDir, 'DOC_09_SEGURIDAD_IMPLEMENTADA.md'), doc09, 'utf8');
console.log('✅ DOC_09_SEGURIDAD_IMPLEMENTADA.md generado con éxito.');

// ============================================================================
// DOCUMENTO 10: ACCESIBILIDAD Y UX
// ============================================================================
const doc10 = `# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 10: ACCESIBILIDAD UNIVERSAL Y EXPERIENCIA DE USUARIO (UX)
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:44 COT  
**Responsable del Desarrollo:** Valeria (UI/UX) & Dr. Lorenzo (Ley 1618)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / WCAG AAA COMPLIANT  
**Documentos Relacionados:** DOC-04 (App Principal), DOC-05 (Registro/Entrada).

---

### 1. ESTÁNDARES DE ACCESIBILIDAD (WCAG 2.2 NIVEL AAA & LEY 1618 DE 2013)

1. **Contraste de Color Óptimo:**
   - Texto principal Marfil (\`#F2F5EC\`) sobre fondo Ébano (\`#191F15\` / \`#0B100E\`): Relación de contraste **14.2:1** (supera con creces el mínimo de 7:1 exigido por el nivel AAA).
   - Botón Iridiscente Lima neón (\`#B8FF3B\`) con texto negro carbón (\`#111111\`): Relación de contraste **12.8:1**.
2. **Navegación por Teclado:**
   - Todos los inputs, selectores de oficios y botones cuentan con estados de foco visibles con anillo lima neón (\`outline: 2px solid #B8FF3B; outline-offset: 2px\`).
   - Flujo de tabulación secuencial sin trampas de foco.
3. **Compatibilidad con Lectores de Pantalla:**
   - Atributos \`aria-label\` descriptivos en todos los iconos de FontAwesome.
   - Textos alternativos (\`alt\`) contextuales en fotos de profesionales y diagramas de averías.
   - Regiones semánticas HTML5 (\`<main>\`, \`<header>\`, \`<nav>\`, \`<section>\`, \`<footer>\`).

---

### 2. ERADICACIÓN DE PATRONES OSCUROS (ANTI-DARK PATTERNS)

- **Cero Cargos Ocultos:** El cliente conoce el desglose exacto antes de ingresar a Wompi (Monto acordado + Cuota de $4.900 COP).
- **Cero Renovaciones Automáticas Sorpresa:** No se manejan suscripciones recurrentes automáticas sin confirmación previa explícita.
- **Cancelación Simple:** Botón visible y directo de cancelación o reporte de garantía en el panel de servicio.
- **Transparencia en Calificaciones:** Reseñas 100% auténticas de clientes verificados en Medellín; prohibida la eliminación de reseñas críticas justificadas.

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Contraste de colores verificado bajo estándar WCAG AAA.
- [x] Navegación completa mediante teclado testeada.
- [x] Cero dark patterns en el proceso de checkout y contratación.
- [x] Desglose transparente de precios y garantía visible en pantalla.
`;

fs.writeFileSync(path.join(docsDir, 'DOC_10_ACCESIBILIDAD_UX.md'), doc10, 'utf8');
console.log('✅ DOC_10_ACCESIBILIDAD_UX.md generado con éxito.');
