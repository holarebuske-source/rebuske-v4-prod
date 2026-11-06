# 📱 AUDITORÍA OFICIAL DE SDKs DE TERCEROS Y DECLARACIÓN DE SEGURIDAD (GOOGLE PLAY CONSOLE)

**Aplicación:** Rebuske Hogares & Profesionales  
**Paquete:** `com.rebuske.app` / Web App PWA & Android TWA  
**Responsable Legal:** Camilo Escobar · Medellín, Antioquia, Colombia  
**Canal Legal:** `holarebuske@gmail.com`  
**Fecha de Emisión:** Noviembre 2026  
**Marco Normativo:** Google Play Developer Distribution Agreement, Google Play Data Safety Section, Ley 1581 de 2012 (Colombia) y Ley 1480 de 2011.

---

## 1. Resumen Ejecutivo de Cumplimiento

Esta auditoría técnica documenta el inventario de librerías, pasarelas y servicios externos (SDKs) integrados en Rebuske, certificando que **no existe recolección clandestina, seguimiento publicitario invasivo ni venta de datos a corredores de datos (data brokers)**.

| Proveedor / SDK | Propósito Específico | Datos Procesados | Cifrado en Tránsito | Retención |
| :--- | :--- | :--- | :---: | :--- |
| **Wompi (Bancolombia)** | Procesamiento y custodia de pagos (Bóveda Escrow) | Token de pago cifrado, monto en COP, ID de transacción | **TLS 1.3 (PCI-DSS Nivel 1)** | Regulada por Superfinanciera |
| **Supabase (PostgreSQL & Storage)** | Base de datos de pedidos, perfiles y actas | Nombre, WhatsApp, comuna, mes/año nacimiento | **TLS 1.3 / AES-256 en reposo** | 3 meses inactivos / 3 años contables |
| **Google Maps / Geolocation** | Asignación de técnicos por geocerca en Medellín | Coordenadas GPS en primer plano (Lat/Lng) | **HTTPS / TLS 1.3** | Efímero durante el servicio |
| **Gemini 1.5 Flash API** | Asistencia y soporte al cliente (`💬 Laura 💬`) | Mensajes de texto y notas de voz transitorias | **gRPC / TLS 1.3** | **Cero retención (Zero-Retention)** |

---

## 2. Detalle Técnico por SDK

### A. Wompi (Bancolombia) · Pasarela de Pagos
- **Uso:** Dispersión y cobro seguro mediante Bóveda de Custodia Preventiva.
- **Alcance de Datos:** Tokenización segura de tarjetas crédito/débito, transferencias Nequi y cuentas Bancolombia.
- **Garantía Google Play:** Rebuske **NUNCA** almacena números de tarjeta completos (PAN), códigos de seguridad (CVV) ni claves bancarias en sus servidores.
- **Cumplimiento:** PCI-DSS (Payment Card Industry Data Security Standard) Nivel 1.

### B. Supabase (Backend & Base de Datos)
- **Uso:** Autenticación de usuarios, registro de la lista de espera de Play Store, verificación KYC y almacenamiento de fotos de trabajos.
- **Seguridad:** Implementa **Row Level Security (RLS)**; los clientes solo pueden consultar sus propios pedidos y los técnicos solo los servicios de su comuna asignada.
- **Derecho al Olvido:** Totalmente compatible con la eliminación manual y automática desde `https://rebuske.vercel.app/eliminar-cuenta`.

### C. Geolocalización y Mapas
- **Uso:** Emparejamiento de proximidad (<35 min en Modo Luz Express) y validación de llegada del técnico al domicilio.
- **Permisos Android:** `ACCESS_COARSE_LOCATION` y `ACCESS_FINE_LOCATION` únicamente en primer plano (**Foreground Only**). No se solicita `ACCESS_BACKGROUND_LOCATION`.

### D. Gemini 1.5 Flash (Google Cloud AI)
- **Uso:** Comprensión de notas de voz de clientes en WhatsApp y clasificación de especialidades (plomería, electricidad, cerrajería).
- **Privacidad:** No se utiliza ningún dato de usuario para reentrenar modelos fundacionales.

---

## 3. Hoja de Respuestas para el Formulario de Seguridad de los Datos (Google Play Data Safety)

Al diligenciar la consola de Google Play, marcar exactamente:

1. **¿Tu app recopila o comparte alguno de los tipos de datos de usuarios requeridos?**  
   👉 **SÍ.**
2. **¿Todos los datos de los usuarios que recopila tu aplicación se cifran en tránsito?**  
   👉 **SÍ** (Enforcement estricto de HTTPS/TLS 1.3).
3. **¿Ofreces a los usuarios una forma de solicitar la eliminación de sus datos?**  
   👉 **SÍ**, mediante enlace web público accesible sin iniciar sesión:  
   `https://rebuske.vercel.app/eliminar-cuenta`
4. **Tipos de datos recopilados:**
   - **Ubicación aproximada y precisa:** Funcionalidad de la app (coordinación de servicios en Medellín).
   - **Información personal (Nombre, teléfono, mes/año de nacimiento):** Gestión de cuenta y prevención de fraudes.
   - **Información financiera (Historial de compras):** Procesado exclusivamente mediante pasarela autorizada (Wompi).
   - **Fotos / Multimedia:** Verificación de perfil y evidencia de trabajos técnicos (KYC).

---

## 4. Firma y Aprobación

Documento validado y listo para ser adjuntado en la ficha técnica de Google Play Console.  
**Representante:** Camilo Escobar · Medellín, Antioquia.
