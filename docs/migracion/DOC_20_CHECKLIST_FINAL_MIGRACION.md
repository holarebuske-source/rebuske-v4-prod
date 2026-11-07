# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 20: CHECKLIST FINAL Y PLAN DE EJECUCIÓN DE MIGRACIÓN
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:54 COT  
**Responsable del Desarrollo:** Lucas (QA & Deploy Lead)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / LISTO PARA EJECUCIÓN DEFINITIVA  
**Documentos Relacionados:** DOCS 01 al 19.

---

### 1. ORDEN CRÍTICO DE MIGRACIÓN

```
FASE 1: BASE DE DATOS & SEGURIDAD
  1.1. Provisionar instancia de PostgreSQL (Supabase).
  1.2. Ejecutar script de migración DDL/DML: supabase_schema_v5.sql.
  1.3. Configurar políticas RLS y buckets de Storage (kyc-documents).

FASE 2: VARIABLES DE ENTORNO & CLAVES
  2.1. Configurar secretos de Wompi Producción (Public, Private, Events, Integrity).
  2.2. Configurar Cloudflare Turnstile (Site Key & Secret Key).
  2.3. Configurar credenciales SMTP de Gmail (holarebuske@gmail.com).

FASE 3: BACKEND SERVERLESS (12 FUNCIONES)
  3.1. Desplegar los 12 endpoints en /api/*.
  3.2. Verificar conectividad con Wompi (/api/wompi?action=test).
  3.3. Configurar el webhook de Wompi hacia la URL de producción.

FASE 4: FRONTEND & ASSETS
  4.1. Desplegar index.html, entrada.html, registro.html y tarifas.html.
  4.2. Verificar carga de tipografías Plus Jakarta Sans y Baloo 2.
  4.3. Verificar Service Worker (sw.js) y Web App Manifest.

FASE 5: SUITE DE PRUEBAS AUTOMATIZADAS
  5.1. Ejecutar: node run-all-tests.mjs en el nuevo entorno.
  5.2. Confirmar 152/152 pruebas aprobadas al 100%.

FASE 6: NOTIFICACIÓN Y CIERRE
  6.1. Compartir dossier completo de migración a: holarebuske@gmail.com
  6.2. Enviar confirmación ejecutiva a: camiloescobarr63@gmail.com
```

---

### 2. CRITERIOS DE ÉXITO DE LA MIGRACIÓN (GO/NO-GO)

- **Criterio 1:** 152/152 pruebas automatizadas en verde sin excepciones.
- **Criterio 2:** Cero menciones de "Modo Luz" en todo el sistema.
- **Criterio 3:** Generación exitosa de firmas SHA-256 en el checkout Wompi.
- **Criterio 4:** Alta técnica funcional con consentimiento estampado de Mandato Comercial.
- **Criterio 5:** Respuesta del servidor sub-45ms en endpoints serverless.

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Cronograma de 6 fases de migración ordenado por dependencias críticas.
- [x] Criterios de Go/No-Go formalizados para la aceptación final.
- [x] Suite de 20 documentos completa y verificada en el repositorio local.
