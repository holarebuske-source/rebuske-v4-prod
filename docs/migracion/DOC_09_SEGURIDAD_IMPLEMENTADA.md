# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
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

```
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
  - Funciones RPC con `SECURITY DEFINER` auditadas.
  - Encriptación de datos en reposo (AES-256).
```

---

### 2. CÓDIGOS DE RECUPERACIÓN 2FA VERCEL (RESPALDO CEO)

Registrados bajo protocolo de seguridad el 29 de Octubre de 2026 para garantizar el control irrestricto de la infraestructura en caso de emergencia:
1. `b557f09f-7269adc5`
2. `712d2990-72f8f298`
3. `aa3f4fff-bac719db`
4. `e7223467-a9cb459b`
5. `bbfc490f-f194e92f`
6. `2e6d02e6-8f21c650`

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Cabeceras de seguridad HTTP configuradas en `vercel.json`.
- [x] Protección anti-bot Turnstile validada en endpoints de registro.
- [x] Políticas RLS activas en todas las tablas de Supabase.
- [x] Códigos 2FA de contingencia documentados en bóveda segura.
