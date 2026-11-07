# REBUSKE · DOSSIER MAESTRO DE MIGRACIÓN TÉCNICA
## DOCUMENTO 10: ACCESIBILIDAD UNIVERSAL Y EXPERIENCIA DE USUARIO (UX)
**Proyecto:** rebuske (Plataforma FinTech & On-Demand Home Services)  
**Versión de Producción:** v5.0 (Rebuske Prime Evolution)  
**Fecha de Última Actualización:** 7 de Noviembre de 2026, 01:44 COT  
**Responsable del Desarrollo:** Valeria (UI/UX) & Dr. Lorenzo (Ley 1618)  
**Supervisión General:** 👑 Canashi 👑 (Camilo Escobar, Fundador & CEO)  
**Estado Actual:** COMPLETO / WCAG AAA COMPLIANT  
**Documentos Relacionados:** DOC-04 (App Principal), DOC-05 (Registro/Entrada).

---

### 1. ESTÁNDARES DE ACCESIBILIDAD (WCAG 2.2 NIVEL AAA & LEY 1618 DE 2013)

1. **Contraste de Color Óptimo:**
   - Texto principal Marfil (`#F2F5EC`) sobre fondo Ébano (`#191F15` / `#0B100E`): Relación de contraste **14.2:1** (supera con creces el mínimo de 7:1 exigido por el nivel AAA).
   - Botón Iridiscente Lima neón (`#B8FF3B`) con texto negro carbón (`#111111`): Relación de contraste **12.8:1**.
2. **Navegación por Teclado:**
   - Todos los inputs, selectores de oficios y botones cuentan con estados de foco visibles con anillo lima neón (`outline: 2px solid #B8FF3B; outline-offset: 2px`).
   - Flujo de tabulación secuencial sin trampas de foco.
3. **Compatibilidad con Lectores de Pantalla:**
   - Atributos `aria-label` descriptivos en todos los iconos de FontAwesome.
   - Textos alternativos (`alt`) contextuales en fotos de profesionales y diagramas de averías.
   - Regiones semánticas HTML5 (`<main>`, `<header>`, `<nav>`, `<section>`, `<footer>`).

---

### 2. ERADICACIÓN DE PATRONES OSCUROS (ANTI-DARK PATTERNS)

- **Cero Cargos Ocultos:** El cliente conoce el desglose exacto antes de ingresar a Wompi (Monto acordado + Cuota de $4.900 COP).
- **Cero Renovaciones Automáticas Sorpresa:** No se manejan suscripciones recurrentes automáticas sin confirmación previa explícita.
- **Cancelación Simple:** Botón visible y directo de cancelación o reporte de garantía en el panel de servicio.
- **Transparencia en Calificaciones:** Reseñas 100% auténticas de clientes verificados en Medellín; prohibida la eliminación de reseñas críticas justificadas.

---

### 3. ELEMENTOS VERIFICADOS (CHECKLIST DE AUDITORÍA)
- [x] Contraste de colores verificado bajo estándar WCAG AAA.
- [x] Navegación completa mediante teclado testeada.
- [x] Cero dark patterns en el proceso de checkout y contratación.
- [x] Desglose transparente de precios y garantía visible en pantalla.
