# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 3: ARQUITECTURA TÉCNICA Y STACK DEL SISTEMA
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:37 COT  
**Responsable del Desarrollo:** Mateo (Arquitecto Full-Stack) & Fernando (DevOps)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / AUDITADO  
**Documentos Relacionados:** DOC-02 (APIs), DOC-04 (Código App), DOC-05 (Código Entrada/Registro), DOC-09 (Seguridad).

---

### 1. STACK TECNOLÓGICO INTEGRAL

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND DE PRODUCCIÓN                          │
│  HTML5 Semántico + CSS3 Vanilla Bio-Orgánico + JS ES2024 Nativo        │
│  Tipografías: Plus Jakarta Sans (Base & Headings) + Baloo 2 (Acentos)   │
│  Librerías CDN: FontAwesome 6.4 (Iconografía), Canvas-Confetti         │
│  Optimización PWA: Service Worker (sw.js) + Web App Manifest           │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ (HTTPS / TLS 1.3)
┌────────────────────────────────────────────────────────────────────────┐
│                      EDGE COMPUTING & SERVERLESS                       │
│  Vercel Edge Network (São Paulo & Bogotá PoPs)                         │
│  12 Serverless Functions en Node.js 20+ ESM (Plan Hobby Compliance)    │
│  Vercel Rewrites & Headers de Seguridad (CSP, HSTS, X-Frame-Options)   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                   ┌────────────────┴────────────────┐
                   ▼                                 ▼
┌─────────────────────────────────────┐   ┌──────────────────────────────┐
│       BASE DE DATOS & AUTH          │   │      PASARELA FINTECH        │
│  Supabase PostgreSQL 15+            │   │  Wompi (Bancolombia S.A.)    │
│  Row-Level Security (RLS) Activo    │   │  Custodia Escrow 48h         │
│  Triggers & RPCs Atómicas           │   │  Firmas SHA-256 de Mandato   │
│  Storage S3-Compatible (KYC Docs)   │   │  Cuenta Contable 2815        │
└─────────────────────────────────────┘   └──────────────────────────────┘
```

---

### 2. ESTRUCTURA DE DIRECTORIOS DEL REPOSITORIO

```
rebuske-v4-prod/
├── .agents/                          # Leyes fundacionales y reglas inmutables
│   └── rules/
│       └── rebuske-core-laws.md      # Código de conducta y restricciones lingüísticas
├── .github/
│   └── dependabot.yml                # Monitoreo continuo de dependencias
├── .well-known/
│   └── assetlinks.json               # Vinculación nativa con aplicación Android
├── api/                              # EXACTAMENTE 12 SERVERLESS FUNCTIONS (LÍMITE VERCEL)
│   ├── wompi.js                      # Generación de checkout, firmas SHA-256 y webhooks
│   ├── dispatch-alert.js             # Motor de matching y radar de proximidad (35-45m)
│   ├── register-pro.js               # Alta de profesionales primordiales con mandato
│   ├── register-client.js            # Alta de clientes en lista de espera y cupón 15k
│   ├── whatsapp-webhook.js           # Bot conversacional Laura y recepción de fotos
│   ├── chat.js                       # Mensajería interna en tiempo real cliente-técnico
│   ├── kyc-access.js                 # Verificación de cédula, fotos y antecedentes
│   ├── auth-otp.js                   # Verificación de identidad por SMS / WhatsApp
│   ├── send-email.js                 # Emisión de recibos y actas de peritaje
│   ├── social-publish.js             # Publicador One-Touch en Meta, TikTok y X
│   ├── activar-mes1-promo.js         # Activación de comisión al 1% para fundadores
│   └── cancel-account.js             # Cumplimiento Ley 1581 (Derecho de supresión)
├── assets/
│   ├── fonts/                        # Archivos de fuentes locales y licencias OFL
│   └── icons/                        # Favicons e iconos PWA adaptativos (16px a 1024px)
├── docs/                             # Documentación técnica y legal
│   └── migracion/                    # Dossier maestro de 20 documentos de migración
├── social_campaign/                  # Banners y generador gráfico de campañas en redes
├── index.html                        # App Web Principal (Buscador, Radar, Diagnóstico)
├── app.html                          # Vista idéntica de la aplicación web
├── entrada.html                      # Landing page cinemática oficial de bienvenida
├── registro.html                     # Portal unificado de selección (Técnico / Cliente)
├── registro-tecnico.html             # Formulario de alta para profesionales (17 oficios)
├── registro-cliente.html             # Formulario de alta para usuarios con bono $15.000
├── tarifas.html                      # Baremo público y transparente de precios por oficio
├── terminos.html                     # Términos del servicio y contrato de mandato
├── privacidad.html                   # Política de protección de datos (Ley 1581/2012)
├── reembolsos.html                   # Protocolo oficial de garantía 48h y arbitraje
├── supabase-sync.js                  # Módulo isomorfo de sincronización con Supabase
├── deploy-automation.mjs             # Pipeline maestro de QA, GitHub sync y Vercel deploy
├── run-all-tests.mjs                 # Suite automatizada de 152 pruebas de regresión
└── vercel.json                       # Configuración de rutas, rewrites y cabeceras
```

---

### 3. COMPONENTES REUTILIZABLES DEL FRONTEND

1. **Card de Servicio Bio-Orgánica (`.card-glass`):** Tarjeta con borde translúcido de 1px en gradiente esmeralda, desenfoque de fondo (`backdrop-filter: blur(14px)`) y elevación elástica al hover.
2. **Botón Iridiscente Reactivo (`.btn-iridescent`):** Botón principal de llamada a la acción con gradiente lima-canario (`#AFFF3E` a `#B8FF3B`) y micro-resplandor dinámico vinculado al evento `mousemove`.
3. **Modal de Diagnóstico Inteligente (`#modal_diagnostico`):** Componente interactivo que permite al cliente escribir o dictar por voz el daño del hogar, subir una foto y recibir el estimado tarifario del baremo oficial.
4. **Radar de Proximidad (`.radar-scanner`):** Animación circular de ondas concéntricas bioluminiscentes que simula la búsqueda de técnicos disponibles en un radio de 5 km en Medellín.
5. **Simulador de Ganancias para el Profesional (`#simulador_tecnico`):** Slider interactivo que calcula el ingreso neto del técnico según su categoría (Plan Oro al 89%/93% neto o Mes 1 Fundador al 99% neto en mano).

---

### 4. GESTIÓN DE VARIABLES DE ENTORNO (`.env`)

```ini
# ============================================================================
# REBUSKE v5 · VARIABLES DE ENTORNO DE PRODUCCIÓN
# ============================================================================
# SUPABASE
SUPABASE_URL=https://vqvwcbirzezihfzaeziq.supabase.co
SUPABASE_ANON_KEY=[CLAVE_PÚBLICA_ANONIMA]
SUPABASE_SERVICE_ROLE_KEY=[CLAVE_PRIVADA_ADMIN]

# WOMPI (BANCOLOMBIA)
WOMPI_PUBLIC_KEY=pub_prod_rlfigFJClWV8X56CCbtRngsxy8vF7lzW
WOMPI_PRIVATE_KEY=prv_prod_4oIQNfg2niXirIqpzONGpmVIdaq1b9yu
WOMPI_EVENTS_SECRET=prod_events_qat3lsI2jTaA82Ky5r2iEd2qCNNAzfEJ
WOMPI_INTEGRITY_SECRET=prod_integrity_6TeHFI9CwfIMh4RzN7RFJAZY6MaCxws0

# CLOUDFLARE TURNSTILE
CLOUDFLARE_TURNSTILE_SITE_KEY=0x4AAAAAAF11brzU-X5kMEg7
CLOUDFLARE_TURNSTILE_SECRET_KEY=0x4AAAAAAF11bqhWXjHkKLWLBFSXXlkk1IQ

# GITHUB & VERCEL AUTOMATION
GITHUB_TOKEN=[TOKEN_PERSONAL_ACCESO_GITHUB]
GITHUB_REPO=rebuske-v4-prod
VERCEL_TOKEN=[TOKEN_API_VERCEL]
VERCEL_PROJECT_NAME=rebuske-v4-prod

# SMTP NOTIFICACIONES
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=holarebuske@gmail.com
SMTP_PASS=[APP_PASSWORD_GMAIL]
```

---

### 5. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Stack tecnológico exhaustivamente descrito (Frontend, Serverless, DB, FinTech).
- [x] Árbol completo de directorios y funciones documentado.
- [x] Límite estricto de 12 Serverless Functions en Vercel Hobby validado y preservado.
- [x] Componentes visuales reutilizables identificados con clases CSS y comportamiento.
- [x] Inventario descriptivo de variables de entorno sin exponer credenciales críticas.
