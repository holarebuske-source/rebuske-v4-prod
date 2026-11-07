# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
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

### 3. DERECHO DE SUPRESIÓN Y CANCELACIÓN DE CUENTA (`/api/cancel-account.js`)

En estricto cumplimiento del Artículo 8 de la Ley 1581 de 2012, cualquier usuario puede solicitar la eliminación total de sus datos:
1. El usuario accede a `/eliminar-cuenta.html`.
2. Se autentica vía OTP a su número de teléfono o correo electrónico.
3. El endpoint `/api/cancel-account.js` anonimiza los registros personales en `profiles`.
4. **Excepción Legal Obligatoria:** Los registros contables en `wallet_ledger` y comprobantes de mandato se conservan durante 5 años conforme al Artículo 134 del Decreto 2649 de 1993 y Estatuto Tributario para fines de auditoría DIAN.

---

### 4. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Cumplimiento Ley 1581 de 2012 verificado.
- [x] Cero almacenamiento local de números de tarjetas de crédito (PCI-DSS delegada en Wompi).
- [x] Endpoint de cancelación de cuenta (`api/cancel-account.js`) operativo.
- [x] Política de retención contable según Código de Comercio implementada.
