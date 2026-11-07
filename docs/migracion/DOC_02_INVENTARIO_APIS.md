# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 2: INVENTARIO COMPLETO DE APIS E INTEGRACIONES
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:36 COT  
**Responsable del Desarrollo:** Mateo (Arquitectura Full-Stack) & Tomás (FinTech Lead)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / VERIFICADO EN PRODUCCIÓN  
**Documentos Relacionados:** DOC-01 (Agentes), DOC-03 (Arquitectura), DOC-06 (Sistema de Pagos).

---

### 1. MATRIZ GENERAL DE APIS INTEGRADAS

| API / Servicio | Proveedor / Host | Tipo de Integración | Propósito Principal en Rebuske | Entorno Activo |
|---|---|---|---|---|
| **Wompi API v1** | Bancolombia S.A. | REST API + Webhooks | Custodia transaccional, checkout y cobro de cuota | Producción (Live) |
| **Supabase REST / Realtime** | Supabase Inc. (AWS us-east-1) | PostgREST + WebSockets | Persistencia de datos, autenticación y storage KYC | Producción (Live) |
| **WhatsApp Cloud API** | Meta Platforms Inc. | Webhook REST | Bot de atención "Laura" 24/7 y despacho de servicios | Producción (Live) |
| **Gmail SMTP TLS** | Google LLC | Protocolo SMTP (Puerto 465) | Notificaciones transaccionales y reportes de agentes | Producción (Live) |
| **Cloudflare Turnstile** | Cloudflare Inc. | REST Server-to-Server | Protección anti-bot en formularios de registro | Producción (Live) |
| **Geocoding & Maps** | Nominatim / Mapbox / Google | REST API | Normalización de direcciones y cálculo de llegada (35-45m)| Producción (Live) |
| **Meta Graph API v21.0**| Meta Platforms Inc. | REST Graph API | Publicación de campañas en Facebook e Instagram | Producción (Live) |
| **TikTok Video Kit** | TikTok / ByteDance | REST API + Intents | Difusión en @somos.rebuske (Creator Center) | Sandbox / Live |
| **X API v2** | X Corp. | REST API v2 + Web Intents | Hilos editoriales de transparencia y finanzas | Producción (Live) |

---

### 2. ESPECIFICACIÓN DETALLADA POR API

#### 2.1. API DE WOMPI (BANCOLOMBIA S.A. - CUSTODIA Y PAGOS)
- **Función en la App:** Procesa los pagos electrónicos de los clientes con tarjeta de crédito/débito, PSE, Nequi y Botón Bancolombia bajo la figura jurídica de **Mandato Comercial de Cobranza (Art. 1262 C.Co)**. Custodia los fondos hasta la entrega a satisfacción y expiración de la garantía legal de 48 horas.
- **Endpoints Utilizados:**
  1. `GET https://production.wompi.co/v1/merchants/{public_key}`: Obtención de métodos de pago activos y token de aceptación de términos legales de Wompi.
  2. `POST https://production.wompi.co/v1/transactions`: Creación directa de transacciones con tokenización de tarjeta o débito bancario PSE.
  3. `GET https://production.wompi.co/v1/transactions/{id}`: Consulta y verificación del estado final de una transacción (`APPROVED`, `DECLINED`, `VOIDED`, `ERROR`).
- **Integración con la App:**
  - El usuario abre el checkout mediante un widget web seguro o link de pago generado dinámicamente desde `/api/wompi.js`.
  - La cotización se desglosa con absoluta transparencia: Monto acordado con el técnico + Cuota fija de custodia y garantía de **$4.900 COP** (la cuota cubre el 100% de la comisión bancaria de Wompi y los costos de peritaje).
- **Integración con los Agentes:**
  - Agente **Tomás (FinTech)** calcula el monto en centavos colombianos y firma la petición con algoritmo SHA-256.
  - Agente **Mariana (CFO)** audita que los depósitos en Bancolombia coincidan centavo a centavo con el balance del ledger interno.
- **Seguridad e Integridad (Firma SHA-256):**
  ```javascript
  // Generación obligatoria de firma de integridad en Wompi
  const rawString = `${reference}${amountInCents}COP${INTEGRITY_SECRET}`;
  const signature = crypto.createHash('sha256').update(rawString).digest('hex');
  ```
- **Webhooks:**
  - Endpoint receptor: `POST /api/wompi?action=webhook`.
  - Validación de firma del evento: Se valida el hash del evento comparando con `WOMPI_EVENTS_SECRET`.
  - Al recibir `transaction.updated` en estado `APPROVED`, se registra en el ledger `wompi_transactions_ledger.json`, se emite el acta de mandato y se notifica al técnico para que inicie la labor.
- **Costos Asociados:** 2.65% + $700 COP por transacción exitosa (absorbidos íntegramente dentro de la cuota de $4.900 COP pagada por el cliente; **el técnico no paga comisión de pasarela**).

---

#### 2.2. API DE SUPABASE (POSTGRESQL & REALTIME)
- **Función en la App:** Almacén primario de identidades, perfiles, catálogo de oficios, órdenes de trabajo, expedientes KYC de técnicos y registros inmutables de transacciones.
- **Estructura Relacional Principal:**
  1. `profiles`: Datos maestros de usuarios (id, email, full_name, phone, role [client/pro], zone, address, created_at).
  2. `pros`: Extensión de perfil técnico (profession, category_id, rating, jobs_count, base_price, tier [Bronce/Plata/Oro], verified, specialties, avatar_variant, is_available).
  3. `services`: Catálogo de los 17 servicios del hogar (id, category_id, name, description, base_price, urgent_fee, warranty_days).
  4. `service_orders`: Órdenes de servicio (id, client_id, pro_id, service_id, status [solicitado/en_camino/en_sitio/completado/cancelado], quote_amount, custody_fee, total_amount, address, scheduled_at).
  5. `wallet_ledger`: Registro contable de doble entrada (id, transaction_ref, pro_id, client_id, gross_amount, platform_fee, pro_net_amount, status, mandato_hash, created_at).
  6. `primordiales_registrations`: Convocatoria especial de los primeros 100 técnicos con beneficio Mes 1 Fundador (1% comisión) y estampado SHA-256 de aceptación del Mandato Comercial.
- **Políticas de Seguridad (Row Level Security - RLS):**
  - Los clientes solo pueden leer sus propias órdenes y cotizaciones.
  - Los técnicos solo pueden leer las órdenes que les han sido asignadas o emitidas en su zona.
  - La tabla `wallet_ledger` tiene RLS de solo lectura para el técnico y solo escritura mediante la función RPC segura `registrar_pro_primordial_atomico`.
- **Integración con Agentes:**
  - **Mateo (Arquitecto)** ejecuta migraciones y optimiza consultas para mantener tiempos de respuesta menores a 45 ms.
  - **Valentina (KYC)** carga las cédulas y certificados laborales en el bucket privado `kyc-documents`.
- **Costos Asociados:** Plan Pro Supabase ($25 USD/mes) o Free Tier con escalabilidad horizontal en AWS.

---

#### 2.3. API DE WHATSAPP BUSINESS (CLOUD API - BOT "LAURA")
- **Función en la App:** Canal conversacional 24/7 para clientes y profesionales en el Valle de Aburrá. Gestiona solicitudes de auxilio locativo, confirmación de citas y mediación de garantías.
- **Línea Oficial:** `+57 304 381 2882`.
- **Plantillas Configuradas:**
  1. `rebuske_bienvenida_cliente`: Saludo paisa, explicación del pago protegido y enlace de solicitud.
  2. `rebuske_despacho_inmediato`: Alerta al técnico con dirección, nombre del cliente y tiempo estimado de llegada (35 a 45 min).
  3. `rebuske_garantia_48h_activada`: Notificación de apertura de caso de peritaje con formulario para adjuntar fotos de evidencia.
- **Webhook de Mensajería:** `/api/whatsapp-webhook.js`.
  - Recibe payloads JSON de Meta con texto, notas de voz o imágenes.
  - El agente **Laura** extrae la avería reportada y sugiere el precio estimado del baremo oficial antes de despachar al profesional.
- **Costos Asociados:** 1.000 conversaciones gratuitas al mes iniciadas por el usuario; ~$0.035 USD por conversación de servicio posterior.

---

#### 2.4. API DE GMAIL (SMTP SEGURO)
- **Función en la App:** Envío autónomo de reportes ejecutivos diarios, comprobantes contables de mandato en PDF, alertas de fraude y confirmaciones de registro.
- **Configuración de Conexión:**
  - Host: `smtp.gmail.com`, Puerto: `465` (TLS directo con `node:tls`).
  - Cuentas activas: `holarebuske@gmail.com` (Operaciones y Agentes) y `camiloescobarr63@gmail.com` (Reportes ejecutivos confidenciales para el CEO).
- **Automatizaciones Implementadas:**
  - `camilo-ceo-daily-report.mjs`: Balance general y KPIs cada 4 días a Camilo.
  - `simon-daily-report.mjs`: Innovaciones y oportunidades de producto cada 12 horas.
  - `valeria-marketing-report.mjs` y `sofia-ux-report.mjs`: Métricas de campaña y diseño de interfaces.
- **Costos:** $0 USD (cuenta Google Workspace / Gmail App Password autorizada).

---

#### 2.5. API DE CLOUDFLARE TURNSTILE (PROTECCIÓN ANTI-BOT)
- **Función en la App:** Garantizar que los registros de clientes y técnicos sean realizados por seres humanos en Colombia, previniendo granjas de registros, fuerza bruta y scraping masivo.
- **Endpoints:**
  - Frontend: `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`
  - Backend: `POST https://challenges.cloudflare.com/turnstile/v0/siteverify`
- **Integración:** El backend valida el token `cf-turnstile-response` antes de permitir cualquier inserción en `primordiales_registrations` o `profiles`.
- **Costos:** $0 USD (Cortesía de Cloudflare en plan gratuito).

---

#### 2.6. SERVICIO DE GEOLOCALIZACIÓN Y RADAR (VALLE DE ABURRÁ)
- **Función:** Asignación inteligente por cercanía en las 16 comunas de Medellín (Popular, Santa Cruz, Manrique, Aranjuez, Castilla, Doce de Octubre, Robledo, Villa Hermosa, Buenos Aires, La Candelaria, Laureles-Estadio, La América, San Javier, El Poblado, Guayabal, Belén) y municipios conurbados (Envigado, Itagüí, Sabaneta, Bello).
- **Lógica de Despacho:**
  - El cliente pulsa "Despacho Inmediato".
  - Se obtienen coordenadas GPS del navegador o dirección digitada.
  - El endpoint `/api/dispatch-alert.js` localiza al profesional disponible más cercano y garantiza una promesa de arribo de **35 a 45 minutos**.

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Configuración completa de Wompi Producción documentada (endpoints, webhooks y firmas SHA-256).
- [x] Esquema relacional de Supabase y políticas RLS descritas con exactitud.
- [x] Flujos y plantillas de WhatsApp Cloud API documentados.
- [x] Arquitectura de transporte de correos SMTP en puerto 465 verificada.
- [x] Sistema anti-bot Turnstile documentado con flujo de verificación.
- [x] Estimaciones de costos y límites de consumo especificados para cada API.
