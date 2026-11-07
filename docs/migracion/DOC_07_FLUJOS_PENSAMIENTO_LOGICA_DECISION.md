# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
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
```
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
```

#### 1.2. Árbol de Triaje de Averías de Laura (WhatsApp Bot):
```
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
```

---

### 2. CONDICIONALES CRÍTICOS EN EL CÓDIGO FUENTE

1. **Validación de Mandato en Registro Técnico (`api/register-pro.js`):**
   ```javascript
   if (!body.mandato_aceptado || body.mandato_aceptado !== true) {
     return res.status(400).json({
       ok: false,
       error: "MANDATO_REQUERIDO",
       message: "Debe aceptar el Contrato de Mandato Comercial (Art. 1262 C.Co) para operar en rebuske."
     });
   }
   ```
2. **Control de Límite Serverless Vercel Hobby (`run-all-tests.mjs`):**
   ```javascript
   const serverlessFiles = fs.readdirSync(apiDir).filter(f => f.endsWith('.js'));
   if (serverlessFiles.length > 12) {
     throw new Error(`Límite Vercel Hobby excedido: ${serverlessFiles.length} funciones (Máximo 12)`);
   }
   ```
3. **Regla de Ausencia Absoluta de "Modo Luz":**
   ```javascript
   const forbiddenTerms = ['modo luz', 'luz express', 'ruta de luz'];
   for (const term of forbiddenTerms) {
     if (fileContent.toLowerCase().includes(term)) {
       throw new Error(`Violación Crítica: Se detectó el término prohibido '${term}' en el archivo.`);
     }
   }
   ```

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Árboles de decisión de Dante y Laura modelados.
- [x] Reglas lógicas y condicionales críticos en código documentados.
- [x] Filtro antifraude y control de calidad integrados al flujo de despliegue.
