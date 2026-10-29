# 🎨 REBUSKE — Playbook Maestro de Diseño de Marca, Lectura de PDFs & Automatización de Redes Sociales
**Responsable:** Sofía — Diseñadora de Marca, Directora Creativa & Social Media Manager (Agente IA)  
**Reporta a:** Camilo (CEO de Rebuske)  
**Identidad Visual:** Crema Cálido (`#F6F2EA`) · Esmeralda Confianza (`#0D6E4F`) · Ámbar Energía (`#D97706`) · Carbón Profundo (`#1C1917`)  
**Tipografías Oficiales:** `Fraunces` (Titulares editoriales con carácter cercano) + `Plus Jakarta Sans` (Cuerpo y UI) + `JetBrains Mono` (Badges, garantías y códigos)  
**Promesa de Marca:** *"Arregla · Confía · Repite"* — 3 cotizaciones en minutos (Ruta de Luz), Pago Protegido en custodia y Garantía escrita de 2 días en Medellín y el Valle de Aburrá.

---

## 1. Flujo de Lectura de PDFs e Inspiración Visual (Sofía PDF Reader)

Sofía cuenta con capacidad dual para leer, analizar y transformar documentos PDF (manuales de marca, presentaciones de producto, estudios de mercado, catálogos de servicios o referencias visuales de posts exitosos) en campañas multicanal listas para publicar:

### A. Lectura Nativa en Antigravity (Agente `@sofia-brand-social-designer`)
1. **Cómo invocarla:** En el chat de Antigravity, menciona o delega a Sofía adjuntando la ruta de cualquier documento PDF o imagen (por ejemplo: `C:\ruta\manual_marca.pdf` o `@ejemplo_post.pdf`).
2. **Procesamiento multimodal nativo (`view_file`):** Sofía inspecciona directamente las páginas del PDF, extrayendo:
   - **Estructura visual y composición:** Jerarquía tipográfica, uso de espacios en blanco, proporciones (1:1, 4:5, 9:16, 16:9) y ubicación de sellos de confianza.
   - **Tono y narrativa:** Estructuras de copywriting (Gancho → Problema en casa → Solución Rebuske → Prueba social / Garantía → CTA).
   - **Reglas de marca:** Verificación estricta de que toda pieza respete el fondo Crema (`#F6F2EA`), acentos Esmeralda (`#0D6E4F`) y Ámbar (`#D97706`), evitando estéticas genéricas o frías.
3. **Generación de entregables:** A partir del PDF, Sofía genera los artes visuales (plantillas SVG/HTML exportables en alta resolución o imágenes generadas) y redacta los copys adaptados a las 6 redes sociales de Rebuske.

### B. Lectura Interactiva desde el Panel CEO de Rebuske v4 (`Redes & Diseñadora PDF - Sofía`)
Dentro del Panel de Administración de Rebuske v4 (`marketing-admin-module.js`), el tab **"🎨 Redes & Diseñadora PDF (Sofía)"** permite operar este flujo en vivo:
1. **Carga Drag & Drop (PDF.js / FileReader):** El CEO arrastra cualquier archivo `.pdf` de referencia (ej. brief semanal de arreglos locativos en Laureles/Poblado o guía de campaña de lluvias en Medellín).
2. **Extracción automática de texto y directrices:** El motor del navegador procesa las páginas del PDF, identifica los puntos clave (servicios foco, barrios objetivo, promoción o dolor del cliente) y los inyecta en el generador creativo de Sofía.
3. **Previsualización de Arte Visual en Vivo (SVG/Canvas):** Crea al instante la pieza gráfica con las dimensiones oficiales (`1080x1080` Feed, `1080x1920` Reels/TikTok/Stories, `1200x675` X/YouTube) aplicando la paleta oficial de Rebuske.
4. **Despliegue Omnicanal en 1 Clic:** Permite copiar los payloads, descargar el arte o disparar el webhook/API hacia las 6 redes sociales conectadas.

---

## 2. Arquitectura y Endpoints Exactos para las 6 Redes Sociales

Para automatizar la publicación directa desde el Panel CEO de Rebuske (o vía workers en Cloudflare / Supabase Edge Functions / n8n), utilizamos los endpoints oficiales de cada plataforma:

### 2.1. Facebook (Fanpage Oficial & Grupos de Barrios)
- **API:** Meta Graph API `v21.0`
- **Autenticación:** Page Access Token de larga duración (`pages_manage_posts`, `pages_read_engagement`).
- **Endpoints:**
  - **Publicación de texto/enlace:** `POST https://graph.facebook.com/v21.0/{page-id}/feed`
  - **Publicación con arte gráfico (Foto):** `POST https://graph.facebook.com/v21.0/{page-id}/photos`
- **Payload JSON de ejemplo:**
```json
{
  "url": "https://rebuske-v4-prod.pages.dev/assets/social/post-plomeria-laureles.png",
  "message": "¿Goteo debajo del lavaplatos un domingo en Medellín? 🚰 En Rebuske recibes 3 cotizaciones en minutos con nuestra Ruta de Luz. Tu plata queda en Pago Protegido hasta que el arreglo quede perfecto y tienes 2 días de garantía escrita. 👉 https://rebuske.co",
  "published": true
}
```

### 2.2. Instagram (Feed, Carruseles, Reels y Stories)
- **API:** Instagram Graph API `v21.0` (flujo de 2 pasos: creación de contenedor + publicación).
- **Autenticación:** Instagram Business Account vinculada a la Fanpage (`instagram_basic`, `instagram_content_publish`).
- **Endpoints:**
  - **Paso 1 (Crear contenedor de medios):** `POST https://graph.facebook.com/v21.0/{ig-user-id}/media`
  - **Paso 2 (Publicar contenedor):** `POST https://graph.facebook.com/v21.0/{ig-user-id}/media_publish`
- **Payload JSON de ejemplo (Paso 1 — Imagen o Reel):**
```json
{
  "image_url": "https://rebuske-v4-prod.pages.dev/assets/social/ig-ruta-de-luz-1080x1080.png",
  "caption": "Arregla · Confía · Repite ✨ Así se siente pedir un maestro verificado en Medellín sin miedo a perder el anticipo. #Rebuske #Medellin #HogarMedellin #PagoProtegido"
}
```
*(Para Reels se envía `"media_type": "REELS"` + `"video_url"`, y para Stories `"media_type": "STORIES"`).*

### 2.3. WhatsApp Business Cloud API (Difusión HSM por Barrios de Medellín)
- **API:** Meta WhatsApp Cloud API `v21.0`
- **Autenticación:** System User Token permanente (`whatsapp_business_messaging`).
- **Endpoint:** `POST https://graph.facebook.com/v21.0/{phone-number-id}/messages`
- **Payload JSON de ejemplo (Plantilla HSM aprobada `rebuske_alerta_barrio_v1`):**
```json
{
  "messaging_product": "whatsapp",
  "to": "573001234567",
  "type": "template",
  "template": {
    "name": "rebuske_alerta_barrio_v1",
    "language": { "code": "es_CO" },
    "components": [
      {
        "type": "header",
        "parameters": [
          {
            "type": "image",
            "image": { "link": "https://rebuske-v4-prod.pages.dev/assets/social/wa-header-garantia.png" }
          }
        ]
      },
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "Laureles" },
          { "type": "text", "text": "Plomería, Electricidad y Pintura" }
        ]
      }
    ]
  }
}
```

### 2.4. X / Twitter (Hilos de Confianza y Alertas de Servicio en Tiempo Real)
- **API:** X API `v2` + Media Upload `v1.1`
- **Autenticación:** OAuth 2.0 User Context con PKCE (`tweet.read`, `tweet.write`, `users.read`) o OAuth 1.0a HMAC-SHA1.
- **Endpoints:**
  - **Subir imagen:** `POST https://upload.twitter.com/1.1/media/upload.json`
  - **Publicar post/hilo:** `POST https://api.x.com/2/tweets`
- **Payload JSON de ejemplo:**
```json
{
  "text": "¿Cansado del \"maestro, le pido el 50% para materiales\" y que no vuelva a contestar? 🛑\n\nEn Rebuske cambiamos la regla en Medellín:\n1️⃣ Ruta de Luz: 3 cotizaciones reales.\n2️⃣ Pago Protegido en custodia.\n3️⃣ Garantía escrita de 2 días.\n\nConoce cómo funciona 👇 https://rebuske.co",
  "media": {
    "media_ids": ["185109283749182736"]
  }
}
```

### 2.5. TikTok (Videos Cortos "Antes y Después" de Arreglos del Hogar)
- **API:** TikTok Content Posting API `v2` (Direct Post)
- **Autenticación:** OAuth 2.0 Bearer Token (`video.publish`, `video.upload`).
- **Endpoint:** `POST https://open.tiktokapis.com/v2/post/publish/video/init/`
- **Payload JSON de ejemplo:**
```json
{
  "post_info": {
    "title": "Lo que pasa cuando contratas con Pago Protegido en Medellín 🛠️✨ #Rebuske #Medellin #ArreglosHogar #AntesYDespues",
    "privacy_level": "PUBLIC_TO_EVERYONE",
    "disable_duet": false,
    "disable_comment": false,
    "disable_stitch": false
  },
  "source_info": {
    "source": "PULL_FROM_URL",
    "video_url": "https://rebuske-v4-prod.pages.dev/assets/social/tiktok-antes-despues-humedad.mp4"
  }
}
```

### 2.6. YouTube & YouTube Shorts (Casos de Éxito y Tutoriales de Diagnóstico)
- **API:** YouTube Data API `v3` (Multipart Resumable Upload)
- **Autenticación:** Google OAuth 2.0 (`https://www.googleapis.com/auth/youtube.upload`).
- **Endpoint:** `POST https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status`
- **Payload JSON de ejemplo:**
```json
{
  "snippet": {
    "title": "Cómo evitar estafas con anticipos en arreglos del hogar en Medellín | Rebuske #Shorts",
    "description": "Con Rebuske recibes 3 cotizaciones en minutos (Ruta de Luz), tu dinero se guarda en Pago Protegido hasta que apruebes el trabajo y cuentas con Garantía escrita de 2 días.\n\n👉 Pide tu servicio gratis en https://rebuske.co",
    "tags": ["Rebuske", "Medellín", "Plomero Medellín", "Electricista Medellín", "Pago Protegido", "Shorts"],
    "categoryId": "26"
  },
  "status": {
    "privacyStatus": "public",
    "selfDeclaredMadeForKids": false
  }
}
```

---

## 3. Seis (6) Ejemplos Reales Listos para Publicar (Identidad Rebuske)

Todos los ejemplos aplican estrictamente el sistema de diseño de Rebuske:
- **Fondo base:** Crema Cálido `#F6F2EA`
- **Color principal y sellos de garantía:** Esmeralda Confianza `#0D6E4F`
- **Llamados a la acción y Ruta de Luz:** Ámbar Energía `#D97706`
- **Pilares:** Ruta de Luz (3 cotizaciones), Pago Protegido en custodia y Garantía escrita de 2 días.

---

### Ejemplo 1: Facebook (Fanpage & Grupos de Vecinos en Laureles / Belén / Envigado)
- **Formato del Arte:** `1080x1080 px` (1:1). Fondo `#F6F2EA`, titular en `Fraunces Bold` color `#1C1917` ("¿Dar anticipo sin garantía? En Medellín eso ya es historia."), tarjeta central estilo UI mostrando la **Ruta de Luz** con 3 propuestas de especialistas verificados (Don Carlos 4.9★, Maestro Julián 5.0★, Andrés 4.8★) y badge inferior en `#0D6E4F` con texto blanco: *"🛡️ PAGO PROTEGIDO + 2 DÍAS DE GARANTÍA ESCRITA"*.
- **Copy listo para publicar:**
> Vecinos de Medellín 👋 ¿A cuántos les ha pasado que pagan el "50% para materiales" y el maestro se demora una semana en volver o deja el arreglo a medias?
>
> En **Rebuske** diseñamos la forma tranquila de arreglar tu casa o apartamento:
> ✨ **Ruta de Luz:** Publicas gratis lo que necesitas (con una foto basta) y recibes hasta **3 cotizaciones** de especialistas verificados cerca de tu barrio.
> 🔒 **Pago Protegido en custodia:** Tu plata no se entrega por adelantado. Queda resguardada en Rebuske y solo se libera cuando tú confirmas que el trabajo quedó impecable.
> 📜 **Garantía escrita de 2 días:** Si algo falla después de entregado, respondemos sin excusas.
>
> Plomería, electricidad, pintura, drywall, armados y filtraciones en todo el Valle de Aburrá.
>
> 👉 **Cotiza gratis en 2 minutos aquí:** https://rebuske.co  
> *Rebuske — Arregla · Confía · Repite.*

---

### Ejemplo 2: Instagram (Carrusel Educativo de 4 Slides — 1080x1350 px)
- **Dirección de Arte por Slide:**
  - **Slide 1 (Portada):** Fondo `#F6F2EA`, sello superior en `JetBrains Mono` color `#D97706` (`GUÍA HOGAR MEDELLÍN`), titular grande en `Fraunces`: *"3 señales de que una humedad en pared necesita arreglo urgente (y cuánto cuesta realmente)"*.
  - **Slide 2 (La Ruta de Luz):** Ilustración limpia en verde `#0D6E4F` y ámbar `#D97706` comparando 3 cotizaciones transparentes sin precios inflados según el barrio.
  - **Slide 3 (El Escudo Rebuske):** Diagrama de **Pago Protegido en custodia** → *"Tú apruebas la foto final → Nosotros liberamos el pago"*.
  - **Slide 4 (CTA + Sello de Garantía):** Fondo Esmeralda `#0D6E4F`, texto en Crema `#F6F2EA`: *"Garantía escrita de 2 días en cada servicio. Arregla · Confía · Repite"*.
- **Caption listo para publicar:**
> Que una mancha en la pared de la sala no se convierta en un dolor de cabeza ni en una cuenta sorpresa. 🧱💧
>
> Cuando pides un arreglo por **Rebuske**, no contratas a ciegas:
> 1️⃣ Activas la **Ruta de Luz** y comparas **3 cotizaciones** claras en minutos.
> 2️⃣ Contratas con **Pago Protegido en custodia** (cero riesgo con anticipos).
> 3️⃣ Recibes **Garantía escrita de 2 días** respaldada por nosotros.
>
> Desliza para ver cómo protegemos tu hogar y el trabajo honesto de los mejores especialistas de Medellín ➡️
>
> 🔗 Link en la bio para pedir tus 3 cotizaciones gratis hoy mismo.
>
> `#Rebuske` `#Medellin` `#HogarMedellin` `#LaurelesMedellin` `#ElPoblado` `#Envigado` `#RemodelacionesMedellin` `#PagoProtegido`

---

### Ejemplo 3: WhatsApp Business (Plantilla HSM de Activación por Barrio)
- **Arte de Cabecera (Header Image `1200x628 px`):** Tarjeta horizontal color Crema `#F6F2EA` con borde izquierdo Esmeralda `#0D6E4F`, foto cálida de un especialista uniformado entregando un arreglo eléctrico impecable y badge Ámbar `#D97706`: *"3 COTIZACIONES EN MINUTOS · GARANTÍA DE 2 DÍAS"*.
- **Texto de Plantilla HSM listo para envío:**
> ¡Hola! 👋 Te saludamos de **Rebuske Medellín**.
>
> Esta semana tenemos especialistas verificados de **{{1}}** disponibles en **{{2}}** para atender arreglos urgentes hoy mismo. 🛠️
>
> Recuerda que con Rebuske siempre cuentas con:
> 💡 **Ruta de Luz:** Recibes 3 cotizaciones para elegir con tranquilidad.
> 🛡️ **Pago Protegido:** Tu dinero está en custodia hasta que recibas a satisfacción.
> ✅ **Garantía escrita de 2 días** en todos los trabajos.
>
> ¿Tienes algún arreglo pendiente en casa? Toca el botón de abajo, envíanos una foto del daño y recibe tus 3 propuestas sin costo:
- **Botones interactivos (Quick Replies / CTA):**
  - `[📸 Cotizar un arreglo ahora]`
  - `[🛡️ ¿Cómo funciona el Pago Protegido?]`

---

### Ejemplo 4: X / Twitter (Hilo de Posicionamiento de Marca + Imagen 1200x675 px)
- **Arte Adjunto (`1200x675 px`):** Infografía minimalista "El Estándar Rebuske vs. Contratar a Ciegas". Columna izquierda gris apagado ("A ciegas: 1 solo precio al ojo, anticipo del 50% por Nequi sin respaldo, sin garantía"). Columna derecha en Crema `#F6F2EA` y Esmeralda `#0D6E4F` ("Estándar Rebuske: Ruta de Luz con 3 cotizaciones, Pago Protegido en custodia, Garantía escrita de 2 días").
- **Hilo de 3 Posts listo para publicar:**
> **Post 1/3:**  
> En Medellín sobra talento entre nuestros plomeros, electricistas, pintores y toderos. Lo que faltaba era un sistema que protegiera tanto al dueño de casa como al maestro cumplido. 🛠️✨
>
> Por eso creamos **Rebuske** bajo una regla simple: **Arregla · Confía · Repite.** 🧵👇 *(Adjunta infografía 1200x675)*
>
> **Post 2/3:**  
> Así eliminamos la incertidumbre en 3 pasos:
> 🔸 **Ruta de Luz:** Subes una foto del daño y recibes 3 cotizaciones reales para comparar precio y reputación.
> 🔸 **Pago Protegido:** El dinero queda en custodia segura. Ni el cliente pierde su anticipo, ni el especialista trabaja sin respaldo de pago.
>
> **Post 3/3:**  
> 🔸 **Garantía escrita de 2 días:** Todo servicio cerrado por Rebuske entrega certificado de garantía de 48 horas.
>
> ¿Se dañó un enchufe, una llave o necesitas pintar el apartamento? Pruébalo gratis hoy en 👉 https://rebuske.co

---

### Ejemplo 5: TikTok (Guion "Antes y Después" — 9:16 Vertical 1080x1920 px)
- **Estilo Visual en Pantalla:** Superposiciones (overlays) con estética Rebuske: pastillas color Crema `#F6F2EA` con texto Carbón `#1C1917`, contador Ámbar `#D97706` para las 3 cotizaciones y sello final Esmeralda `#0D6E4F`.
- **Guion Segundo a Segundo (Duración: 24 segundos):**
  - **00:00 - 00:04 (Gancho Visual):** Toma real de un lavamanos filtrando agua en un apartamento en Belén. Texto en pantalla (Pastilla Ámbar `#D97706`): *"POV: Se rompe el sifón a las 8:00 AM y no conoces plomero de confianza en Medellín 😭"*.
  - **00:04 - 00:11 (La Ruta de Luz):** Grabación de pantalla del celular abriendo Rebuske, subiendo la foto y viendo encenderse la **Ruta de Luz** con 3 cotizaciones ($65.000, $70.000, $68.000). Voz en off cercana (acento paisa natural): *"En vez de preguntar en diez chats sin respuesta, subí la foto a Rebuske y en minutos me llegaron 3 cotizaciones con la Ruta de Luz"*.
  - **00:11 - 00:18 (Pago Protegido + Ejecución):** Toma rápida del especialista llegando puntual, cambiando el sifón y dejando todo limpio. Texto en pantalla (Sello `#0D6E4F`): *"🛡️ Pago Protegido en custodia: la plata solo se libera cuando queda listo"*.
  - **00:18 - 00:24 (Resultado + Garantía):** Toma del lavamanos funcionando perfecto y tarjeta digital de **Garantía escrita de 2 días**. Voz en off: *"Cero estrés con anticipos y me queda garantía escrita de 2 días. Arregla, confía y repite en rebuske.co"*.
- **Copy y Hashtags:**
> Así de fácil se arregla cualquier daño en casa sin arriesgar tu plata 🛠️💚 Pide tus 3 cotizaciones gratis en el link del perfil. `#Rebuske` `#Medellin` `#ApartamentosMedellin` `#ArreglosLocativos` `#TrucosDelHogar` `#ValleDeAburra`

---

### Ejemplo 6: YouTube Shorts (Caso de Éxito + Tutorial Corto — 1080x1920 px)
- **Portada / Thumbnail del Short (`1080x1920 px`):** Fondo superior con foto nítida de un tablero eléctrico residencial intervenido profesionalmente; franja inferior en Crema `#F6F2EA` y Esmeralda `#0D6E4F` con tipografía `Fraunces Bold`: *"¿Corto eléctrico en casa? 3 cotizaciones + Pago Protegido ⚡"*.
- **Guion de 30 Segundos listo para grabar:**
  1. **Problema (0-6s):** *"¿Tus tacos eléctricos se disparan cada vez que prendes la ducha o la freidora de aire? Cuidado: contratar un arreglo eléctrico sin respaldo puede salir el doble de caro."*
  2. **Mecanismo Rebuske (6-18s):** *"En Rebuske conectamos hogares de Medellín con electricistas verificados. Con nuestra **Ruta de Luz** recibes **3 cotizaciones** transparentes en minutos para que compares experiencia y precio justo."*
  3. **Seguridad y Garantía (18-30s):** *"Además, tu dinero viaja con **Pago Protegido en custodia**: solo pagamos al especialista cuando confirmas que todo funciona al 100%, y te entregamos **Garantía escrita de 2 días**. Entra a rebuske.co: Arregla, Confía y Repite."*
- **Título SEO:** `Cómo arreglar daños eléctricos en Medellín sin arriesgar anticipos ⚡ | Rebuske #Shorts`
- **Descripción:**
> Solicita 3 cotizaciones gratis en minutos con nuestra Ruta de Luz 👉 https://rebuske.co  
> ✔️ Pago Protegido en custodia  
> ✔️ Garantía escrita de 2 días  
> ✔️ Especialistas verificados en Medellín, Envigado, Sabaneta, Itagüí y Bello.
