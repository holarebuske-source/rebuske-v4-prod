# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 19: LECCIONES APRENDIDAS Y MEJORES PRÁCTICAS
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:53 COT  
**Responsable del Desarrollo:** Lucas (QA Lead) & Dante (Filtro Crítico)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / GUÍA PERMANENTE  
**Documentos Relacionados:** DOC-01 (Agentes), DOC-03 (Arquitectura), DOC-09 (Seguridad).

---

### 1. ERRORES HISTÓRICOS IDENTIFICADOS Y CÓMO FUERON RESUELTOS

1. **El Error de las Tipografías Deformes (`Syne`):**
   - *Problema:* El uso de fuentes experimentales como Syne 700/800 en títulos generaba letras excesivamente anchas y achatadas que dificultaban la lectura y enfurecían al usuario.
   - *Solución:* Se unificó todo el sistema a **`Plus Jakarta Sans`** (fuente neo-grotesca con proporciones equilibradas) y acentos identitarios en **`Baloo 2`**.
2. **El Error del Canvas Invasivo de Casa y Círculo:**
   - *Problema:* Un script en `entrada.html` intentaba trazar con partículas canvas la silueta de una casa y círculos geométricos, viéndose como trazos verdes toscos de tiza que molestaban visualmente.
   - *Solución:* Erradicación total del canvas y reemplazo por un Hero limpio, minimalista y con badges de texto dinámicos.
3. **El Error Lingüístico de "Modo Luz":**
   - *Problema:* El uso del término "Modo Luz" generaba confusión con empresas de energía eléctrica y servicios públicos de EPM.
   - *Solución:* Prohibición absoluta del término y sustitución por **"Despacho Inmediato"** y **"Servicio Express Prioritario"**.
4. **El Límite Serverless de Vercel Hobby:**
   - *Problema:* Crear un archivo `.js` para cada micro-servicio saturó el límite de 12 funciones de Vercel.
   - *Solución:* Consolidación de endpoints afines en handlers unificados con parámetros de acción (`?action=...`), manteniendo el conteo en exactamente 12 funciones.

---

### 2. CONVENCIONES DE CÓDIGO Y ESTÁNDARES ESTABLECIDOS

- **Vanilla JS y ES Modules:** Preferir JavaScript nativo sin bundlers complejos para garantizar despliegues instantáneos y cero dependencias obsoletas.
- **Auditoría Pre-Deploy Obligatoria:** Todo commit debe pasar el 100% de las 152 pruebas automatizadas en `run-all-tests.mjs`.
- **Integridad Semántica HTML:** Prohibido dejar cualquier carácter, comentario o script huérfano después del tag de cierre `</html>`.

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Registro de errores superados y soluciones adoptadas.
- [x] Convenciones de arquitectura y código estandarizadas.
- [x] Protocolo de pruebas pre-deploy documentado.
