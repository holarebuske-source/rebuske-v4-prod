# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 15: AUTOMATIZACIONES CON N8N Y PLAN DE MIGRACIÓN
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:49 COT  
**Responsable del Desarrollo:** Fernando (DevOps) & Mateo (Full-Stack)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / PLAN DE MIGRACIÓN LISTO  
**Documentos Relacionados:** DOC-01 (Agentes), DOC-02 (APIs), DOC-20 (Checklist).

---

### 1. MAPA DE AUTOMATIZACIONES REBUSKE A N8N

Para independizar los daemons de Node.js en máquinas locales y estandarizar la orquestación en la nube, se ha diseñado la arquitectura de workflows en **n8n**:

```
[Webhook Wompi / WhatsApp] 
         │
         ▼
    [n8n Router]
         ├── Flujo 1: Webhook Wompi ──► Validar Hash SHA-256 ──► Asentar en Ledger ──► Notificar a Laura
         ├── Flujo 2: WhatsApp Entrante ──► Triage IA Avería ──► Sugerir Baremo ──► Alertar a Diego
         └── Flujo 3: Cron Diario (06:00 COT) ──► Extraer KPIs ──► Generar Reporte ──► SMTP a Canashi
```

---

### 2. PLAN DE MIGRACIÓN A CLAUDE CODE AGENTS

Para la siguiente fase operativa, los 27 agentes y subagentes de Antigravity se migrarán a la plataforma **Claude Code**:
1. **Configuración de System Prompts:** Trasladar la matriz inmutable de `AGENTS.md` y `rebuske-core-laws.md` a las configuraciones de personalidad de Claude Code.
2. **Tools Personalizadas (MCP Tools):**
   - `rebuske_test_suite`: Ejecuta `run-all-tests.mjs`.
   - `rebuske_deploy_vercel`: Llama a `deploy-automation.mjs --only-vercel`.
   - `rebuske_github_sync`: Sincroniza archivos vía REST API.
   - `rebuske_wompi_checkout`: Calcula montos y genera firmas SHA-256.
3. **Preservación Inquebrantable:** Mantener activa la regla de **prohibición total de "Modo Luz"**, respeto estricto al vocabulario paisa y conservación del Mandato Comercial (Art. 1262 C.Co).

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Workflows de n8n diseñados para pagos, WhatsApp y reportes ejecutivos.
- [x] Protocolo de migración hacia agentes de Claude Code con MCP tools documentado.
- [x] Garantía de continuidad operativa de las reglas de oro de Rebuske.
