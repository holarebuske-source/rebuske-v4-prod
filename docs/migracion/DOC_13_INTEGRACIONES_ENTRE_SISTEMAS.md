# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 13: INTEGRACIONES ENTRE SISTEMAS Y COMUNICACIÓN INTER-AGENTE
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:47 COT  
**Responsable del Desarrollo:** Mateo (Arquitecto) & Galloti (Telemetría)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / AUDITADO  
**Documentos Relacionados:** DOC-01 (Agentes), DOC-02 (APIs), DOC-03 (Arquitectura).

---

### 1. PROTOCOLOS DE COMUNICACIÓN INTER-AGENTE

1. **Entorno CLI / Subagentes Antigravity:** Comunicación mediante canales estándar y JSON estricto:
   - El agente orquestador despacha tareas a los subagentes (`arquitecto-fullstack`, `disenador-ui`, `qa-debugger`, `fintech-pagos-kyc`, `disenadora-social-pdf`).
   - Cada subagente devuelve un resultado estructurado con código de salida y ruta de artefactos generados.
2. **Daemons de Ejecución de Fondo:**
   - `rebuske-autonomous-engine.mjs` y `rebuske-recordatorio-19dic-daemon.mjs` operan tareas desatendidas de monitoreo y generación de informes.
3. **Mesa Redonda Automatizada:**
   - Cuando Simón genera una propuesta de producto, Dante aplica el filtro de Las 4 Preguntas Paisas, Dr. Lorenzo valida la Ley 1480 y Mateo estima el impacto en base de datos antes de enviar el informe ejecutivo consolidado al CEO.

---

### 2. COMUNICACIÓN AGENTES - APLICACIÓN WEB - APIS EXTERNAS

```
[Agentes de Backend / Scripts]
             │
             ├────────► [Supabase PostgreSQL (via PostgREST & REST)]
             ├────────► [Wompi API (Firmas SHA-256 & Webhooks)]
             ├────────► [WhatsApp Cloud API (Mensajes al cliente y técnico)]
             └────────► [Gmail SMTP TLS (Reportes directos al CEO)]
```

- **Manejo de Concurrencia:** Los endpoints serverless en `/api/` son completamente stateless, permitiendo escalabilidad elástica en la red edge de Vercel sin cuellos de botella de memoria compartida.

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Canales de comunicación inter-agente documentados.
- [x] Flujos de datos cruzados entre frontend, serverless y bases de datos mapeados.
- [x] Gestión de concurrencia y arquitectura stateless confirmada.
