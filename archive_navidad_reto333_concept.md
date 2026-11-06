# REBUSKE · ARCHIVO MAESTRO DE CAMPAÑA NAVIDEÑA Y RETO 333
**Dirección General:** 👑 Canashi 👑 (CEO & Fundador)  
**Fecha de Archivo:** Noviembre 2026  
**Estado:** Guardado para futuras temporadas / activaciones especiales de fin de año  

---

## 1. Justificación y Decisión Estratégica del CEO
El CEO 👑 Canashi 👑 determinó pausar y archivar la campaña de regalos navideños y el Reto 333 para el portal de registro:
> *"Quitemos la propuesta para navidad completamente, ya no nos da el tiempo de que mucha gente se registre y confíe en la app, entonces guarda ese concepto que está muy bueno para otra oportunidad. Solo demos el bono normal de los 15 que ya está desde hace tiempo."*

---

## 2. Concepto General de la Campaña Navideña
- **Nombre:** Campaña Ruta de Luz Navideña · Medellín
- **Enfoque:** Activación comunitaria y gamificación para celebrar el mes de diciembre en Medellín.
- **Incentivo:** 20 regalos exclusivos para los primeros 20 usuarios en alcanzar la puntuación de 333 puntos en el mini-juego de la luciérnaga.
- **Opciones de Regalo:**
  1. *Hogar Impecable Nochebuena:* Aseo profundo para antes de la cena del 24 de diciembre.
  2. *Spa Navideño a Domicilio:* Masaje y relajación para cerrar el año.
  3. *Bono $100.000 COP:* Saldo directo para servicios técnicos en el hogar.
  4. *Rescate del 1 de Enero:* Plomería o cerrajería de emergencia para el primer día del año nuevo.
- **Fechas Clave:**
  - *Vigencia de uso:* Desde el **20 de diciembre** hasta el **1 de enero**.
  - *Recordatorio automatizado:* **19 de diciembre a las 8:00 AM** (24 horas antes).
- **Categoría vinculada:** Exclusivo para solicitar servicios en **"Servicios por Ellas"** (donde solo contratan y prestan servicios mujeres).

---

## 3. Lógica del Reto 333 (Mini-Juego Flappy Luciérnaga)
- **Mecánica:** Juego estilo Flappy Bird adaptado a la identidad de rebuske con la luciérnaga bioluminiscente (`#B8FF3B`) esquivando obstáculos tubulares en un canvas interactivo (340x420 px).
- **Límite de Intentos:** 20 intentos por dispositivo (guardados en `localStorage`).
- **Meta de Victoria:** 333 puntos continuos.
- **Premio:** Generación de un código alfanumérico único de 5 dígitos (ej. `7K9X2`, con ticket `LUC-333-MED-XXXXX`) almacenado en `localStorage.rebuske_reto333_winners`.
- **Acción requerida al ganar:** Tomar captura de pantalla y enviar el código a 💬 Laura 💬 (+57 304 381 2882) por WhatsApp.
- **Módulo de Cesión / Transferencia:** Si el usuario no deseaba usar el regalo, podía transferírselo a otra usuaria destacada de Medellín (Carolina Restrepo, Valentina Henao, Daniela Morales) a través de Laura.

---

## 4. Código Fuente del Motor del Juego (Canvas & State)
```javascript
// Estado y configuración del juego Flappy Luciérnaga Reto 333
const flappyState = {
  active: false,
  score: 0,
  targetScore: 333,
  attemptsMax: 20,
  attemptsLeft: 20,
  bird: { x: 50, y: 150, vy: 0, gravity: 0.35, jump: -6.5, radius: 12 },
  pipes: [],
  pipeWidth: 50,
  pipeGap: 110,
  pipeSpeed: 2.2,
  frameCount: 0,
  particles: []
};

// Generador de código alfanumérico de 5 dígitos al ganar:
function generate5DigitCode() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let res = '';
  for (let i = 0; i < 5; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}
```

---
*Fin del archivo de respaldo. El concepto queda preservado y documentado para reactivarse en la temporada correspondiente.*
