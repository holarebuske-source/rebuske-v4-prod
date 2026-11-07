# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 17: POLÍTICA DE BACKUPS Y RECUPERACIÓN ANTE DESASTRES (DRP)
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:51 COT  
**Responsable del Desarrollo:** Fernando (DevOps) & Carlos (CISO)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / TESTEADO  
**Documentos Relacionados:** DOC-03 (Arquitectura), DOC-06 (Pagos), DOC-09 (Seguridad).

---

### 1. ESTRATEGIA DE RESPALDO MULTI-NIVEL

1. **Base de Datos Supabase (PostgreSQL):**
   - Copias automáticas diarias con Point-in-Time Recovery (PITR) retenidas durante 7 días.
   - Script de respaldo de exportación manual de tablas críticas en `backups/`.
2. **Libro Mayor Transaccional (Ledger):**
   - Archivo inmutable `wompi_transactions_ledger.json` respaldado con cada commit en GitHub y sincronizado en el despliegue de Vercel.
3. **Repositorio de Código en GitHub:**
   - Repositorio remoto: `https://github.com/holarebuske-source/rebuske-v4-prod` con ramas protegidas y GitHub Pages como contingencia estática.
4. **Despliegues Históricos en Vercel:**
   - Capacidad de Rollback instantáneo a cualquier deployment previo en caso de falla crítica en producción (<10 segundos de RTO).

---

### 2. PROTOCOLO DE RESTAURACIÓN ANTE FALLAS CRÍTICAS

```
1. Alerta de Caída / Corrupción de Datos
   │
   ▼
2. Identificar el último Deployment estable en Vercel Dashboard o API
   │
   ▼
3. Ejecutar Rollback Instantáneo:
   node deploy-automation.mjs --only-vercel
   │
   ▼
4. Restaurar base de datos PostgreSQL desde el último dump de Supabase:
   psql -h aws-0-us-east-1.pooler.supabase.com -U postgres -d postgres -f backup.sql
   │
   ▼
5. Ejecutar la suite de calidad: node run-all-tests.mjs (152/152 pruebas en verde)
```

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Estrategia multi-nivel de respaldos (código, ledger, base de datos) documentada.
- [x] Procedimiento paso a paso de Rollback y restauración verificado.
- [x] Códigos 2FA de Vercel archivados de forma segura.
