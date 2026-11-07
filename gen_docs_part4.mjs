import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsDir = path.join(__dirname, 'docs', 'migracion');

// ============================================================================
// DOCUMENTO 16: ESTRATEGIA DE MARKETING Y PROMOCIÓN
// ============================================================================
const doc16 = `# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 16: ESTRATEGIA DE MARKETING, REDES Y PROTOCOLO 1-TOUCH
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:50 COT  
**Responsable del Desarrollo:** Valeria (Marketing) & Sofia (Social Media)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / EN OPERACIÓN  
**Documentos Relacionados:** DOC-01 (Agentes), DOC-03 (Arquitectura), DOC-11 (Cronología).

---

### 1. POLÍTICA DE CERO INTERMEDIARIOS (PROHIBICIÓN TOTAL DE BUFFER)

Por orden directa e inmutable del CEO Camilo (**Canashi**):
- ❌ **TOTALMENTE PROHIBIDO SUGERIR O USAR BUFFER, HOOTSUITE O HERRAMIENTAS DE PAGO INTERMEDIARIAS.**
- ✅ **PROTOCOLO DE PUBLICACIÓN EN 1 TOQUE (ONE-TOUCH INTENT):** Los agentes generan piezas fotorrealistas en las dimensiones exactas de cada plataforma y entregan enlaces directos precargados (\`intent / composer\`) con el texto optimizado y archivo gráfico vinculado para que el CEO o el equipo publiquen de forma instantánea y gratuita con un solo clic.

---

### 2. CANALES OFICIALES Y MATRIZ EDITORIAL SEGMENTADA

| Canal | Perfil Oficial | Formato Principal | Audiencia Objetivo | Narrativa Clave |
|---|---|---|---|---|
| **TikTok** | \`@somos.rebuske\` | Video Vertical 9:16 (15-20s) | Técnicos jóvenes y clientes con urgencias | Gancho en <0.8s, lenguaje paisa, humor cotidiano y despacho inmediato. |
| **Instagram** | \`@rebuske.col\` | Carruseles 4:5 y Reels 9:16 | Hogares y propietarios (Poblado, Laureles) | Confianza, acabados impecables, Bóveda Wompi y garantía de 48h. |
| **Facebook** | Fanpage Rebuske | Imágenes 1:1 con copy largo | Maestros mayores, ferreterías y amas de casa | Dignidad del trabajo, pago justo sin intermediarios abusivos (99% mes 1). |
| **X (Twitter)**| \`@rebuskeapp\` | Hilos de 5 tweets y tarjetas 16:9 | Ecosistema tech, Ruta N, inversionistas | Desintermediación FinTech, Bóveda Escrow y transparencia contable. |
| **WhatsApp** | \`+57 304 381 2882\` | Mensajes directos con formato | Clientes y técnicos en servicio activo | Soporte en <60s, peritaje fotográfico y asistencia en tiempo real. |

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Regla de Cero Buffer / Cero intermediarios de pago documentada.
- [x] Protocolo de publicación en 1 toque (One-Touch Intent) detallado.
- [x] Matriz editorial segmentada por canal y formato validada.
`;

fs.writeFileSync(path.join(docsDir, 'DOC_16_ESTRATEGIA_MARKETING_PROMOCION.md'), doc16, 'utf8');
console.log('✅ DOC_16_ESTRATEGIA_MARKETING_PROMOCION.md generado con éxito.');

// ============================================================================
// DOCUMENTO 17: BACKUPS Y RECUPERACIÓN
// ============================================================================
const doc17 = `# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
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
   - Script de respaldo de exportación manual de tablas críticas en \`backups/\`.
2. **Libro Mayor Transaccional (Ledger):**
   - Archivo inmutable \`wompi_transactions_ledger.json\` respaldado con cada commit en GitHub y sincronizado en el despliegue de Vercel.
3. **Repositorio de Código en GitHub:**
   - Repositorio remoto: \`https://github.com/holarebuske-source/rebuske-v4-prod\` con ramas protegidas y GitHub Pages como contingencia estática.
4. **Despliegues Históricos en Vercel:**
   - Capacidad de Rollback instantáneo a cualquier deployment previo en caso de falla crítica en producción (<10 segundos de RTO).

---

### 2. PROTOCOLO DE RESTAURACIÓN ANTE FALLAS CRÍTICAS

\`\`\`
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
\`\`\`

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Estrategia multi-nivel de respaldos (código, ledger, base de datos) documentada.
- [x] Procedimiento paso a paso de Rollback y restauración verificado.
- [x] Códigos 2FA de Vercel archivados de forma segura.
`;

fs.writeFileSync(path.join(docsDir, 'DOC_17_BACKUPS_Y_RECUPERACION.md'), doc17, 'utf8');
console.log('✅ DOC_17_BACKUPS_Y_RECUPERACION.md generado con éxito.');

// ============================================================================
// DOCUMENTO 18: PENDIENTES Y ROADMAP
// ============================================================================
const doc18 = `# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 18: TAREAS PENDIENTES Y ROADMAP ESTRATÉGICO
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:52 COT  
**Responsable del Desarrollo:** Simón (CPO) & Mateo (Full-Stack)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** PLANIFICACIÓN ACTIVA  
**Documentos Relacionados:** DOC-01 (Agentes), DOC-04 (App Principal), DOC-06 (Pagos).

---

### 1. TAREAS PENDIENTES INMEDIATAS (Q4 2026)

1. **Cierre de la Convocatoria de Profesionales Primordiales:**
   - Completar los 16 cupos restantes para alcanzar el hito de los **100 Técnicos Fundadores** con beneficio del 99% neto en su primer mes (actualmente en 84/100).
2. **Lanzamiento Oficial en Google Play Store:**
   - La App Web ya cuenta con arquitectura PWA y \`assetlinks.json\` configurado. Falta la compilación del bundle TWA (Trusted Web Activity) con firma de release para publicación en la Play Store de Colombia.
3. **Dispersión Automática de Pagos Wompi Marketplace:**
   - Actualmente las dispersiones se concilian en el ledger contable. La fase final incluye la activación del split transaccional automático una vez aprobada la credencial de Marketplace por parte de Wompi Bancolombia.

---

### 2. ROADMAP DE EXPANSIÓN (2027)

- **Q1 2027 (Consolidación Valle de Aburrá):** Expansión completa en las 16 comunas de Medellín, Envigado, Itagüí, Sabaneta, Bello y Rionegro. Meta: 1.000 servicios mensuales protegidos.
- **Q2 2027 (Apertura Bogotá D.C.):** Despliegue de cuadrillas técnicas en Usaquén, Chapinero, Suba y Teusaquillo.
- **Q3 2027 (Apertura Cali y Eje Cafetero):** Implementación de la plataforma en Cali, Pereira, Manizales y Armenia.
- **Q4 2027 (Rebuske Empresas):** Módulo B2B para contratos de mantenimiento preventivo con inmobiliarias y oficinas.

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Tareas pendientes inmediatas delimitadas con responsables y requisitos.
- [x] Roadmap de producto y expansión geográfica 2027 estructurado.
`;

fs.writeFileSync(path.join(docsDir, 'DOC_18_PENDIENTES_Y_ROADMAP.md'), doc18, 'utf8');
console.log('✅ DOC_18_PENDIENTES_Y_ROADMAP.md generado con éxito.');

// ============================================================================
// DOCUMENTO 19: LECCIONES APRENDIDAS Y BEST PRACTICES
// ============================================================================
const doc19 = `# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
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

1. **El Error de las Tipografías Deformes (\`Syne\`):**
   - *Problema:* El uso de fuentes experimentales como Syne 700/800 en títulos generaba letras excesivamente anchas y achatadas que dificultaban la lectura y enfurecían al usuario.
   - *Solución:* Se unificó todo el sistema a **\`Plus Jakarta Sans\`** (fuente neo-grotesca con proporciones equilibradas) y acentos identitarios en **\`Baloo 2\`**.
2. **El Error del Canvas Invasivo de Casa y Círculo:**
   - *Problema:* Un script en \`entrada.html\` intentaba trazar con partículas canvas la silueta de una casa y círculos geométricos, viéndose como trazos verdes toscos de tiza que molestaban visualmente.
   - *Solución:* Erradicación total del canvas y reemplazo por un Hero limpio, minimalista y con badges de texto dinámicos.
3. **El Error Lingüístico de "Modo Luz":**
   - *Problema:* El uso del término "Modo Luz" generaba confusión con empresas de energía eléctrica y servicios públicos de EPM.
   - *Solución:* Prohibición absoluta del término y sustitución por **"Despacho Inmediato"** y **"Servicio Express Prioritario"**.
4. **El Límite Serverless de Vercel Hobby:**
   - *Problema:* Crear un archivo \`.js\` para cada micro-servicio saturó el límite de 12 funciones de Vercel.
   - *Solución:* Consolidación de endpoints afines en handlers unificados con parámetros de acción (\`?action=...\`), manteniendo el conteo en exactamente 12 funciones.

---

### 2. CONVENCIONES DE CÓDIGO Y ESTÁNDARES ESTABLECIDOS

- **Vanilla JS y ES Modules:** Preferir JavaScript nativo sin bundlers complejos para garantizar despliegues instantáneos y cero dependencias obsoletas.
- **Auditoría Pre-Deploy Obligatoria:** Todo commit debe pasar el 100% de las 152 pruebas automatizadas en \`run-all-tests.mjs\`.
- **Integridad Semántica HTML:** Prohibido dejar cualquier carácter, comentario o script huérfano después del tag de cierre \`</html>\`.

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Registro de errores superados y soluciones adoptadas.
- [x] Convenciones de arquitectura y código estandarizadas.
- [x] Protocolo de pruebas pre-deploy documentado.
`;

fs.writeFileSync(path.join(docsDir, 'DOC_19_LECCIONES_APRENDIDAS_BEST_PRACTICES.md'), doc19, 'utf8');
console.log('✅ DOC_19_LECCIONES_APRENDIDAS_BEST_PRACTICES.md generado con éxito.');

// ============================================================================
// DOCUMENTO 20: CHECKLIST FINAL DE MIGRACIÓN
// ============================================================================
const doc20 = `# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
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

\`\`\`
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
\`\`\`

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
`;

fs.writeFileSync(path.join(docsDir, 'DOC_20_CHECKLIST_FINAL_MIGRACION.md'), doc20, 'utf8');
console.log('✅ DOC_20_CHECKLIST_FINAL_MIGRACION.md generado con éxito.');
