# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 5: CÓDIGO BASE DETALLADO - ENTRADA Y REGISTRO
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:39 COT  
**Responsable del Desarrollo:** Valeria (UI/UX) & Lucas (QA)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / EN PRODUCCIÓN  
**Documentos Relacionados:** DOC-01 (Agentes), DOC-04 (App Principal), DOC-09 (Seguridad).

---

### 1. ARQUITECTURA DE LA PÁGINA DE ENTRADA (`entrada.html` / `registro.html`)

La página de entrada de **rebuske** actúa como portal institucional y embudo de conversión para técnicos y clientes. Se diseñó bajo las directrices estéticas de la App Web:
- **Cero dibujos geométricos invasivos:** Se erradicó por completo el canvas interactivo que trazaba casas y círculos toscos. El Hero ahora es minimalista, moderno y con badges dinámicos de rotación de servicios cada 3.2 segundos.
- **Tipografía Unificada:** Se descartó `Syne` (fuente ancha que deformaba los textos) y se homologó a **`Plus Jakarta Sans`** con acentos en **`Baloo 2`**.
- **Separación de Flujos:** En `/entrada` no se solicitan pedidos; únicamente se orienta al usuario hacia:
  1. Portal de Profesionales: `/registro/tecnico` (o `registro-tecnico.html`).
  2. Portal de Clientes: `/registro/cliente` (o `registro-cliente.html`).
  3. Ingreso directo a la App: `/`.

---

### 2. FORMULARIO DE REGISTRO TÉCNICO (`registro-tecnico.html`)

- **Campos Solicitados:**
  1. Nombre completo y Cédula de Ciudadanía colombiana.
  2. Número de teléfono celular (+57).
  3. Selección de una o más de las 17 especialidades oficiales.
  4. Comuna o zona de residencia principal en el Valle de Aburrá.
  5. Carga de documentos: Cédula de Ciudadanía legible, antecedentes judiciales (Policía Nacional) y **5 fotografías de trabajos reales terminados**.
  6. **Foto de Perfil:** Obligatoriamente selfie con rostro visible **sin logos de empresas de terceros, gorras oscuras ni paisajes**.
- **Simulador Financiero en Vivo:**
  - El técnico visualiza su ganancia neta en tiempo real:
    - **Mes 1 Fundador Primordial:** **99% neto en mano** (1% comisión).
    - **Plan Oro VIP:** **89% neto** (simulador inicial configurado al 93% neto).
- **Aceptación de Mandato Comercial:**
  - Checkbox obligatorio que estampa criptográficamente el hash SHA-256 de aceptación del **Contrato de Mandato de Cobranza (Art. 1262 Código de Comercio)**. Sin este consentimiento, el endpoint `/api/register-pro` rechaza la solicitud con HTTP 400.

---

### 3. FORMULARIO DE REGISTRO CLIENTE (`registro-cliente.html`)

- **Propósito:** Captura de clientes para lista de espera VIP de cara al lanzamiento en Google Play Store.
- **Incentivo Oficial:** Bono de bienvenida de **$15.000 COP** (`TUBONO15K-VIP`), financiado por Rebuske para aplicar en el primer servicio contratado a través de la Bóveda Wompi.
- **Validaciones:**
  - Validación de correo electrónico válido (`@gmail.com`, etc.).
  - Teléfono móvil colombiano de 10 dígitos.
  - Validación anti-bot mediante Cloudflare Turnstile antes de persistir en `rebuske_clientes_waitlist_db.json`.

---

### 4. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Eliminación total del canvas de dibujo de casas y círculos en el Hero.
- [x] Tipografía `Plus Jakarta Sans` y `Baloo 2` verificada en los 5 portales de entrada y registro.
- [x] Estampado digital de Mandato Comercial obligatorio en el alta técnica.
- [x] Pre-auditoría fotográfica (5 fotos reales + foto de perfil sin logos) integrada.
- [x] Código de bono `TUBONO15K-VIP` y validación Turnstile operativas.
