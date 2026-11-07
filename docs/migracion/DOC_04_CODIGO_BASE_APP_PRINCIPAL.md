# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 4: CÓDIGO BASE DETALLADO - APLICACIÓN PRINCIPAL
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:38 COT  
**Responsable del Desarrollo:** Mateo (Full-Stack) & Valeria (UI/UX)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / EN PRODUCCIÓN (152 Tests OK)  
**Documentos Relacionados:** DOC-03 (Arquitectura), DOC-05 (Registro/Entrada), DOC-07 (Lógica de Decisión).

---

### 1. DESCRIPCIÓN DEL ARCHIVO CENTRAL (`index.html` / `app.html`)

El archivo `index.html` es una Single Page Application (SPA) optimizada de alto rendimiento que opera sin frameworks pesados, garantizando tiempos de carga de menos de 600 ms en redes móviles 4G de Medellín.

#### 1.1. Módulos Funcionales Integrados en el Código:
1. **Header & Navigation Bar:** Barra de navegación flotante con efecto cristal (`backdrop-filter: blur(20px)`), indicador de ciudad (Medellín & Valle de Aburrá) y selector rápido de rol (Cliente / Técnico).
2. **Motor de Búsqueda y Filtros de 17 Oficios:** Barra de exploración reactiva que busca en tiempo real por palabras clave ("gotera", "cerradura", "corto", "calentador", "mueble") y categoriza en las 17 especialidades oficiales.
3. **Modal de Diagnóstico Inteligente:** Sistema multivariable para el análisis previo de la falla locativa:
   - Permite escribir el problema o usar dictado por voz (Web Speech API).
   - Input para fotografía real del daño con vista previa instantánea en Canvas/Image.
   - Chips de averías frecuentes (ej: *"Calentador no prende"*, *"Fuga en llave de paso"*, *"Toma con chispa"*).
   - Generación de tarifa preliminar con visita diagnóstica fija de **$35.000 COP** (abonable al valor total de la labor si se contrata).
4. **Radar de Despacho Inmediato:** Conexión con `/api/dispatch-alert.js` para emparejamiento con el profesional más cercano en 35 a 45 minutos.
5. **Feed de Profesionales Destacados:** Tarjetas con foto, insignia de verificación de antecedentes policiales, rating 5 estrellas, precio base y botón directo de solicitud.
6. **Módulo de Custodia Transaccional Wompi:** Resumen de pago protegido con desglose transparente (Monto acordado + Cuota de custodia de $4.900 COP).
7. **PWA Service Worker (`sw.js`):** Caché inteligente offline para consulta del catálogo de servicios incluso sin conexión a datos móviles.

---

### 2. CATÁLOGO OFICIAL DE LAS 17 CATEGORÍAS DEL HOGAR

```javascript
const REBUSKE_17_CATEGORIES = [
  { id: 1, name: "Limpieza y Aseo", icon: "fa-broom", base: 45000 },
  { id: 2, name: "Plomería", icon: "fa-faucet-drip", base: 40000 },
  { id: 3, name: "Electricidad", icon: "fa-bolt", base: 45000 },
  { id: 4, name: "Pintura y Acabados", icon: "fa-paint-roller", base: 60000 },
  { id: 5, name: "Carpintería", icon: "fa-hammer", base: 50000 },
  { id: 6, name: "Cerrajería y Seguridad", icon: "fa-key", base: 45000 },
  { id: 7, name: "Jardinería y Exteriores", icon: "fa-seedling", base: 40000 },
  { id: 8, name: "Construcción y Remodelación", icon: "fa-trowel-bricks", base: 70000 },
  { id: 9, name: "Mudanzas y Transporte", icon: "fa-truck-moving", base: 90000 },
  { id: 10, name: "Electrodomésticos", icon: "fa-blender", base: 55000 },
  { id: 11, name: "Tecnología e Instalación", icon: "fa-laptop-code", base: 50000 },
  { id: 12, name: "Automóviles", icon: "fa-car", base: 60000 },
  { id: 13, name: "Diseño, Tecnología y Digital", icon: "fa-compass-drafting", base: 80000 },
  { id: 14, name: "Clases y Educación", icon: "fa-graduation-cap", base: 35000, model: "pack_por_sesiones" },
  { id: 15, name: "Belleza y Cuidado Personal", icon: "fa-scissors", base: 35000 },
  { id: 16, name: "Eventos", icon: "fa-champagne-glasses", base: 80000 },
  { id: 17, name: "Servicios Profesionales", icon: "fa-briefcase", base: 90000 }
];
```

---

### 3. MECANISMO FINANCIERO ESPECIAL PARA CLASES Y EDUCACIÓN (REGLA PEDAGÓGICA)

En respuesta a la instrucción directa del fundador (*"Nadie aprende música o materias en un solo día, se aprende en ciclos de dos semanas"*), se desarrolló un modelo transaccional especializado:
- **Modelo de Pagos Escalonados / Bono de Sesiones:**
  - El cliente no paga por minuto ni un desembolso gigante por adelantado.
  - Se contrata un **Paquete Quincenal de 4 a 6 sesiones**.
  - Wompi retiene el valor total en la Bóveda Escrow y realiza **desembolsos parciales tras cada clase completada y firmada por el estudiante/padre**.
  - Si el estudiante cancela tras la sesión 2 con causa justificada, el saldo restante se reembolsa sin penalidad abusiva.

---

### 4. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Código de la SPA verificado: libre de fugas sintácticas y con cierre estricto `</html>`.
- [x] 17 categorías integradas en la matriz y el motor de búsqueda.
- [x] Modal de diagnóstico con dictado por voz y subida de foto verificado.
- [x] Tarifa de visita diagnóstica unificada en $35.000 COP y cuota de custodia en $4.900 COP.
- [x] Lógica de paquetes pedagógicos para Clases y Educación documentada.
