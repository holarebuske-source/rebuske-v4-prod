/* Showcase CSS Prototype */
export const phoneShowcaseCSS = `
/* ==========================================================================
   SHOWCASE DE TELÉFONOS INTELIGENTES · EXPERIENCIA REBUSKE EN CELULAR
   ========================================================================== */
.phones-showcase-section {
  padding: 80px 20px;
  position: relative;
  z-index: 2;
  max-width: 1320px;
  margin: 0 auto;
}

.phones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 36px;
  margin-top: 48px;
}

@media (min-width: 1100px) {
  .phones-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
  }
}

.phone-card-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

/* MARCO DEL TELÉFONO TIPO IPHONE 16 PRO */
.phone-mockup {
  position: relative;
  width: 100%;
  max-width: 295px;
  aspect-ratio: 9 / 18.8;
  background: #060A07;
  border-radius: 46px;
  padding: 10px;
  box-shadow: 
    0 24px 60px -12px rgba(0, 0, 0, 0.85),
    0 0 0 1px rgba(255, 255, 255, 0.12),
    0 0 35px rgba(184, 255, 59, 0.14),
    inset 0 0 2px 1px rgba(255, 255, 255, 0.25);
  border: 4px solid #1C2B1A;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.phone-mockup:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 32px 70px -10px rgba(0, 0, 0, 0.95),
    0 0 0 1px rgba(184, 255, 59, 0.35),
    0 0 50px rgba(184, 255, 59, 0.28),
    inset 0 0 3px 1px rgba(184, 255, 59, 0.4);
}

/* BOTONES LATERALES DEL CELULAR */
.phone-mockup::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 90px;
  width: 4px;
  height: 48px;
  background: #2D3D2B;
  border-radius: 3px 0 0 3px;
  box-shadow: 0 60px 0 #2D3D2B;
}

.phone-mockup::after {
  content: '';
  position: absolute;
  right: -7px;
  top: 110px;
  width: 4px;
  height: 64px;
  background: #2D3D2B;
  border-radius: 0 3px 3px 0;
}

/* PANTALLA INTERNA DEL CELULAR */
.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #0B100E;
  border-radius: 36px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* BARRA DE ESTADO SUPERIOR */
.phone-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px 4px;
  font-size: 11px;
  font-weight: 700;
  color: #F4FBF1;
  z-index: 10;
  background: transparent;
}

/* ISLA DINÁMICA / DYNAMIC ISLAND */
.phone-island {
  width: 82px;
  height: 20px;
  background: #000;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.phone-island-cam {
  width: 8px;
  height: 8px;
  background: #0F1713;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.phone-island-sensor {
  width: 5px;
  height: 5px;
  background: #142217;
  border-radius: 50%;
}

.phone-status-icons {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
}

.phone-battery {
  display: inline-flex;
  width: 18px;
  height: 9px;
  border: 1px solid #F4FBF1;
  border-radius: 3px;
  padding: 1px;
}

.phone-battery-level {
  width: 85%;
  height: 100%;
  background: #B8FF3B;
  border-radius: 1.5px;
}

/* CONTENIDO DE LA PANTALLA */
.phone-content {
  flex: 1;
  padding: 12px 14px 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* LÍNEA DE INICIO INFERIOR */
.phone-home-indicator {
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 4px;
  margin: 8px auto 4px;
}

/* TARJETA DE REFERENCIA FORMAL DEBAJO DEL TELÉFONO */
.phone-reference-card {
  width: 100%;
  background: rgba(22, 36, 19, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(184, 255, 59, 0.22);
  border-radius: 18px;
  padding: 18px 16px;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.45);
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.phone-reference-card:hover {
  border-color: rgba(184, 255, 59, 0.45);
  transform: translateY(-2px);
}

.ref-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(184, 255, 59, 0.12);
  color: #B8FF3B;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(184, 255, 59, 0.28);
  margin-bottom: 10px;
}

.ref-title {
  font-family: 'Baloo 2', 'Plus Jakarta Sans', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #F4FBF1;
  line-height: 1.25;
  margin-bottom: 8px;
}

.ref-desc {
  font-size: 13px;
  line-height: 1.55;
  color: rgba(244, 251, 241, 0.72);
  margin-bottom: 12px;
}

.ref-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 11.5px;
  color: #B8FF3B;
  font-weight: 600;
}
`;
console.log('Showcase CSS Prototype defined successfully.');
