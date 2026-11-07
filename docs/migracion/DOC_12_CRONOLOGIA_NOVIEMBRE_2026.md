# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 12: CRONOLOGÍA TÉCNICA Y OPERATIVA - NOVIEMBRE 2026
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:46 COT  
**Responsable del Desarrollo:** Lucas (QA Lead) & Mateo (Full-Stack)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / HISTORIAL ACTIVO  
**Documentos Relacionados:** DOC-01 (Agentes), DOC-06 (Pagos), DOC-11 (Cronología Octubre).

---

### 1. HITOS DÍA A DÍA Y EVOLUCIÓN ESTRUCTURAL

- **01 Noviembre 2026:**
  - Integración oficial de Wompi Producción (`pub_prod_...` y `prv_prod_...`) para cobros en vivo en moneda colombiana.
  - Implementación del algoritmo de firma de integridad SHA-256 para prevenir alteraciones de montos.
- **02 Noviembre 2026:**
  - Blindaje jurídico tributario bajo la figura de **Mandato Comercial de Cobranza (Art. 1262 Código de Comercio y Art. 1.2.4.11 DUR 1625/2016)**.
  - Configuración de la cuenta contable 2815 de Ingresos para Terceros y generación del Comprobante Digital de Mandato.
  - Estampado criptográfico SHA-256 obligatorio en el alta de profesionales (`/api/register-pro`).
- **03 Noviembre 2026:**
  - Auditoría de accesibilidad WCAG AAA y optimización de tiempos de carga en redes móviles de Medellín (<600 ms).
  - Implementación del Service Worker PWA (`sw.js`) para soporte sin conexión.
- **04 Noviembre 2026:**
  - Unificación de la estructura tarifaria oficial:
    - Tarifa de Visita Diagnóstica en sitio: **$35.000 COP** (abonable a la labor).
    - Cuota de Custodia y Garantía 48h: **$4.900 COP** (cubre pasarela y peritaje).
    - Bono de bienvenida para clientes: **$15.000 COP** (`TUBONO15K-VIP`).
- **05 Noviembre 2026:**
  - **Purgado Total y Absoluto de "Modo Luz":** Se eliminaron de raíz las expresiones "Modo Luz", "Modo Luz Express" y "Ruta de Luz" en los 214 archivos del proyecto, reemplazándolas por "Despacho Inmediato", "Radar de Proximidad" y "Servicio Express Prioritario" (SLA 35 a 45 minutos).
- **06 Noviembre 2026:**
  - Incorporación del **Catálogo Unificado de las 17 Categorías del Hogar**.
  - Desarrollo del modelo de paquetes pedagógicos quincenales para "Clases y Educación".
- **07 Noviembre 2026 (Jornada de Perfeccionamiento y Cierre de Producción):**
  - **Erradicación del Canvas de Casa y Círculo:** Eliminación completa del `<canvas id="heroCanvas">` y sus bucles de partículas geométricas toscas en `entrada.html` y `registro.html`.
  - **Homologación Tipográfica Definitiva:** Sustitución total de la fuente ensanchada `Syne` por **`Plus Jakarta Sans`** con acentos en **`Baloo 2`** en todo el frontend.
  - **Validación QA al 100%:** Aprobación sin fallos de las 152 pruebas automatizadas en `run-all-tests.mjs`.
  - **Despliegue a Producción:** Despliegue exitoso en Vercel (estado `READY`) y sincronización completa con GitHub vía REST API.

---

### 2. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Cronología detallada de hitos y fixes críticos de Noviembre 2026.
- [x] Registro del Mandato Comercial (Art. 1262 C.Co) y Wompi en producción.
- [x] Purga total de "Modo Luz" y erradicación del canvas geométrico verificada.
- [x] Suite de 152 pruebas en verde documentada.
