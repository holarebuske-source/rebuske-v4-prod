export const REFINED_STYLES = `

/* ==========================================================================
   AMBIENTE CINEMÁTICO: LUCIÉRNAGAS WEB & ACABADO DARK LUXURY CON RUIDO
   ========================================================================== */
.web-ambient-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 50;
  opacity: 0.92;
}

.dark-luxury-grain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  mix-blend-mode: screen;
}

/* ==========================================================================
   LUCIÉRNAGA 3D FLOTANTE (SIN CÍRCULO, PURA BIOLUMINISCENCIA NATURAL)
   ========================================================================== */
.logo-3d-bubble {
  width: 42px;
  height: 42px;
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible !important;
  position: relative;
  flex-shrink: 0;
  animation: logoFireflyFloat 3.6s ease-in-out infinite alternate;
}
.logo-3d-img {
  width: 38px;
  height: 38px;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(184, 255, 59, 0.75));
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
}
.logo-3d-bubble:hover .logo-3d-img {
  transform: scale(1.12);
  filter: drop-shadow(0 0 20px rgba(184, 255, 59, 0.95));
}
@keyframes logoFireflyFloat {
  0% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 8px rgba(184,255,59,0.5)); }
  50% { transform: translateY(-3px) scale(1.05); filter: drop-shadow(0 0 18px rgba(184,255,59,0.85)); }
  100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 8px rgba(184,255,59,0.5)); }
}


.quienes-somos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
  margin-top: 32px;
}
.quienes-somos-card {
  background: var(--glass-surface);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.3s ease;
}
.quienes-somos-card:hover {
  border-color: rgba(184, 255, 59, 0.38);
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0,0,0,0.5), 0 0 20px rgba(184,255,59,0.15);
}
.quienes-somos-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(184, 255, 59, 0.12);
  border: 1px solid rgba(184, 255, 59, 0.28);
  color: var(--lima);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ==========================================================================
   SHOWCASE DE TELÉFONOS EN VIVO · PANTALLAS IDÉNTICAS A LA APP REAL
   ========================================================================== */
.phones-showcase-section {
  padding: 30px 20px 40px;
  position: relative;
  z-index: 3;
  max-width: 1320px;
  margin: 0 auto;
  background: transparent;
}

.phones-showcase-section::before {
  content: '';
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  max-width: 1200px;
  height: 400px;
  background: radial-gradient(ellipse 70% 50% at 50% 30%, rgba(78, 136, 57, 0.16) 0%, rgba(184, 255, 59, 0.05) 45%, transparent 75%);
  filter: blur(50px);
  pointer-events: none;
  z-index: -1;
}

.phones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 40px;
  perspective: 1600px;
  perspective-origin: 50% 40%;
}

@media (min-width: 1100px) {
  .phones-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}

.phone-card-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transform-style: preserve-3d;
}

.phone-stage-3d {
  position: relative;
  width: 100%;
  max-width: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-style: preserve-3d;
}

.phone-mockup {
  position: relative;
  width: 100%;
  max-width: 288px;
  aspect-ratio: 9 / 19.5;
  background: #0C120A;
  border-radius: 46px;
  padding: 3.5px;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.4),
    0 0 0 3px #182216,
    0 0 0 4.5px rgba(244, 251, 241, 0.25),
    0 0 0 6px #090E08,
    0 22px 50px -10px rgba(0, 0, 0, 0.95),
    0 40px 85px -15px rgba(0, 0, 0, 0.98),
    0 0 35px rgba(184, 255, 59, 0.15);
  border: 1px solid rgba(184, 255, 59, 0.35);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  transform-style: preserve-3d;
  will-change: transform;
}

/* Posturas 3D en estudio para cada teléfono */
@media (min-width: 900px) {
  .phone-3d-pos-1 {
    transform: perspective(1400px) rotateY(10deg) rotateX(2deg) translateZ(-6px);
  }
  .phone-3d-pos-2 {
    transform: perspective(1400px) rotateY(3deg) rotateX(1deg) translateZ(14px);
  }
  .phone-3d-pos-3 {
    transform: perspective(1400px) rotateY(-3deg) rotateX(1deg) translateZ(14px);
  }
  .phone-3d-pos-4 {
    transform: perspective(1400px) rotateY(-10deg) rotateX(2deg) translateZ(-6px);
  }
}

.phone-card-wrap:hover .phone-mockup {
  transform: perspective(1400px) rotateY(0deg) rotateX(0deg) translateZ(46px) scale(1.04) !important;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.6),
    0 0 0 3px #233420,
    0 0 0 5px rgba(184, 255, 59, 0.4),
    0 0 0 7px #090E08,
    0 32px 75px -10px rgba(0, 0, 0, 0.98),
    0 0 60px rgba(184, 255, 59, 0.35);
}

/* Botones Físicos de Hardware en 3D */
.phone-btn-power {
  position: absolute;
  top: 135px;
  right: -5.5px;
  width: 3.5px;
  height: 52px;
  background: linear-gradient(180deg, #3A4A36, #162214, #3A4A36);
  border-radius: 0 2px 2px 0;
  box-shadow: 1px 0 2px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.4);
  z-index: 20;
}
.phone-btn-action {
  position: absolute;
  top: 95px;
  left: -5.5px;
  width: 3.5px;
  height: 26px;
  background: linear-gradient(180deg, #3A4A36, #B8FF3B, #3A4A36);
  border-radius: 2px 0 0 2px;
  box-shadow: -1px 0 2px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.4);
  z-index: 20;
}
.phone-btn-vol-up {
  position: absolute;
  top: 135px;
  left: -5.5px;
  width: 3.5px;
  height: 44px;
  background: linear-gradient(180deg, #3A4A36, #162214, #3A4A36);
  border-radius: 2px 0 0 2px;
  box-shadow: -1px 0 2px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.4);
  z-index: 20;
}
.phone-btn-vol-down {
  position: absolute;
  top: 190px;
  left: -5.5px;
  width: 3.5px;
  height: 44px;
  background: linear-gradient(180deg, #3A4A36, #162214, #3A4A36);
  border-radius: 2px 0 0 2px;
  box-shadow: -1px 0 2px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.4);
  z-index: 20;
}

/* Ranura del altavoz superior */
.phone-speaker-slit {
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 3px;
  background: #050805;
  border-radius: 3px;
  border: 0.5px solid rgba(255, 255, 255, 0.15);
  z-index: 10;
}

/* Reflejo diagonal de cristal permanente */
.phone-glass-sheen {
  position: absolute;
  inset: 0;
  border-radius: 44px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 35%, transparent 60%);
  pointer-events: none;
  z-index: 8;
}

/* Sombra de suelo 3D flotante */
.phone-3d-floor-shadow {
  width: 82%;
  height: 22px;
  margin-top: 14px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.88) 0%, rgba(184, 255, 59, 0.15) 45%, transparent 75%);
  filter: blur(6px);
  transform: rotateX(65deg);
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.phone-card-wrap:hover .phone-3d-floor-shadow {
  transform: rotateX(65deg) scale(1.15);
  opacity: 0.9;
}

.phone-glare-overlay {
  position: absolute;
  inset: 0;
  border-radius: 46px;
  background: radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.16) 0%, transparent 65%);
  pointer-events: none;
  z-index: 15;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.phone-mockup:hover .phone-glare-overlay {
  opacity: 1;
}

.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #080C09;
  border-radius: 42px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.phone-real-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  border-radius: 42px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.phone-status-bar {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 5 !important;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.2) 75%, transparent 100%) !important;
  padding: 8px 18px 4px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  color: #F4FBF1;
  pointer-events: none;
}

.phone-island {
  width: 68px;
  height: 13px;
  background: #000;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
}

.phone-island-cam {
  width: 6px;
  height: 6px;
  background: #0F1713;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.phone-island-sensor {
  width: 3px;
  height: 3px;
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

.phone-content {
  flex: 1;
  padding: 10px 12px 14px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.phone-home-indicator {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3.5px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 3px;
  z-index: 6;
  pointer-events: none;
}

/* COMPONENTES REALES DE LA APP EN LAS PANTALLAS */
.app-real-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.app-lz-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-hd-text {
  display: flex;
  flex-direction: column;
}

.app-hd-greet {
  font-family: 'Baloo 2', sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  color: #F4FBF1;
  line-height: 1.1;
}

.app-hd-loc {
  font-size: 9.5px;
  color: rgba(244, 251, 241, 0.65);
}

.app-bell-btn, .app-back-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #F4FBF1;
}

.app-bell-dot {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 6px;
  height: 6px;
  background: #B8FF3B;
  border-radius: 50%;
}

.app-real-search {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 7px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10.5px;
  color: rgba(244, 251, 241, 0.6);
  margin: 8px 0;
}

.app-real-sos-banner {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.18) 0%, rgba(185, 28, 28, 0.08) 100%);
  border: 1px solid rgba(239, 68, 68, 0.45);
  border-radius: 12px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.sos-icon-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #EF4444;
  border: 1px solid #FCA5A5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sos-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.sos-text strong {
  font-size: 10px;
  color: #FCA5A5;
  line-height: 1.2;
}

.sos-text small {
  font-size: 8.5px;
  color: #E5E7EB;
}

.sos-pill {
  background: #EF4444;
  color: #FFF;
  font-size: 9px;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 4px;
}

.app-real-radar-box {
  background: rgba(22, 36, 19, 0.85);
  border: 1px solid rgba(184, 255, 59, 0.28);
  border-radius: 14px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: auto;
}

.radar-live-hud {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 9.5px;
}

.radar-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #B8FF3B;
  box-shadow: 0 0 6px #B8FF3B;
}

.radar-status-txt {
  font-weight: 700;
  color: #F4FBF1;
  flex: 1;
  margin-left: 6px;
}

.radar-eta-txt {
  color: #FFFA70;
  font-weight: 800;
}

.radar-track-route {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 9px;
  color: rgba(244, 251, 241, 0.7);
}

.track-line {
  flex: 1;
  height: 2px;
  background: repeating-linear-gradient(90deg, #B8FF3B 0, #B8FF3B 4px, transparent 4px, transparent 8px);
  margin: 0 6px;
}

.radar-eta-detail {
  font-size: 9px;
  color: #B8FF3B;
  font-weight: 700;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 4px;
}

.app-real-bot-nav {
  display: flex;
  justify-content: space-around;
  padding: 8px 0 2px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: auto;
}

.bot-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  font-size: 8.5px;
  color: rgba(244, 251, 241, 0.5);
}

.bot-nav-item.active {
  color: #B8FF3B;
  font-weight: 700;
}

/* PANTALLA 2: WOMPI VAULT */
.wompi-vault-box {
  background: rgba(14, 24, 15, 0.8);
  border: 1px solid rgba(184, 255, 59, 0.25);
  border-radius: 14px;
  padding: 14px 10px;
  text-align: center;
  margin: 8px 0;
}

.vault-shield-glow {
  display: inline-block;
  margin-bottom: 6px;
  filter: drop-shadow(0 0 10px rgba(184, 255, 59, 0.5));
}

.vault-real-amount {
  font-family: 'Baloo 2', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #F4FBF1;
  line-height: 1;
}

.vault-real-amount small {
  font-size: 11px;
  color: #B8FF3B;
}

.vault-locked-pill {
  display: inline-block;
  background: rgba(184, 255, 59, 0.12);
  color: #B8FF3B;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(184, 255, 59, 0.28);
  margin-top: 4px;
}

.vault-real-breakdown {
  background: rgba(22, 36, 19, 0.7);
  border-radius: 12px;
  padding: 8px 10px;
  font-size: 9.5px;
  color: rgba(244, 251, 241, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 8px;
}

.v-row {
  display: flex;
  justify-content: space-between;
  padding: 2.5px 0;
}

.v-row.total {
  border-top: 1px dashed rgba(255, 255, 255, 0.12);
  margin-top: 4px;
  padding-top: 4px;
  font-weight: 700;
}

.vault-legal-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 9px;
  color: #B8FF3B;
  background: rgba(184, 255, 59, 0.08);
  padding: 5px 8px;
  border-radius: 8px;
  border: 1px solid rgba(184, 255, 59, 0.2);
  margin-bottom: 8px;
}

/* PANTALLA 3: CREDENCIAL QR */
.qr-pro-profile-card {
  background: rgba(14, 24, 15, 0.85);
  border: 1px solid rgba(184, 255, 59, 0.25);
  border-radius: 14px;
  padding: 10px;
  text-align: center;
  margin: 8px 0;
}

.pro-avatar-ring {
  width: 44px;
  height: 44px;
  margin: 0 auto 6px;
  border-radius: 50%;
  border: 2px solid #B8FF3B;
  box-shadow: 0 0 10px rgba(184, 255, 59, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #162413;
  position: relative;
}

.avatar-verified-mark {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: #B8FF3B;
  color: #0C120A;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pro-name-verified {
  font-family: 'Baloo 2', sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  color: #F4FBF1;
  line-height: 1.1;
}

.pro-spec-verified {
  font-size: 9.5px;
  color: #B8FF3B;
  margin-bottom: 6px;
}

.pro-checks-grid {
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: left;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 8.5px;
  color: rgba(244, 251, 241, 0.8);
  background: rgba(255, 255, 255, 0.04);
  padding: 3px 6px;
  border-radius: 4px;
}

.app-real-qr-card {
  background: rgba(22, 36, 19, 0.8);
  border: 1px dashed rgba(184, 255, 59, 0.35);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
}

.qr-matrix-sim {
  position: relative;
  width: 64px;
  height: 64px;
  background: #000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.qr-cross {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2.5px solid #B8FF3B;
}
.qr-cross.tl { top: 4px; left: 4px; }
.qr-cross.tr { top: 4px; right: 4px; }
.qr-cross.bl { bottom: 4px; left: 4px; }

.qr-code-center {
  font-size: 9px;
  font-weight: 900;
  color: #B8FF3B;
  background: #0B0F08;
  padding: 2px 4px;
  border-radius: 3px;
  border: 1px solid #B8FF3B;
}

.qr-scan-hint {
  font-size: 8.5px;
  color: #FFFA70;
  margin-top: 5px;
  text-align: center;
}

/* PANTALLA 4: BILLETERA */
.app-wallet-balance-box {
  background: rgba(14, 24, 15, 0.85);
  border: 1px solid rgba(184, 255, 59, 0.25);
  border-radius: 14px;
  padding: 12px 10px;
  text-align: center;
  margin: 8px 0;
}

.wallet-subtitle {
  font-size: 9px;
  color: rgba(244, 251, 241, 0.65);
  text-transform: uppercase;
}

.wallet-big-val {
  font-family: 'Baloo 2', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #B8FF3B;
  line-height: 1.1;
  margin: 3px 0 5px;
}

.wallet-big-val small {
  font-size: 11px;
  color: #F4FBF1;
}

.wallet-timing-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  color: #FFFA70;
  background: rgba(255, 250, 112, 0.1);
  padding: 2px 8px;
  border-radius: 6px;
}

.app-wallet-ledger {
  background: rgba(22, 36, 19, 0.7);
  border-radius: 12px;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 6px;
}

.ledger-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.ledger-row:last-child { border-bottom: none; }

.ledger-info {
  display: flex;
  flex-direction: column;
}

.ledger-info strong {
  font-size: 9.5px;
  color: #F4FBF1;
}

.ledger-info small {
  font-size: 8px;
  color: rgba(244, 251, 241, 0.5);
}

.ledger-val {
  font-size: 10px;
  font-weight: 800;
  color: #B8FF3B;
}

.wallet-dest-pill {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  padding: 5px;
  font-size: 8.5px;
  color: rgba(244, 251, 241, 0.75);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: auto;
}

/* ==========================================================================
   DIRECTORIO COMPACTO DE SERVICIOS Y TARIFARIO CON HOVER
   ========================================================================== */
.srv-search-box {
  max-width: 520px;
  margin: 0 auto 24px;
  position: relative;
  display: flex;
  align-items: center;
}

.srv-search-icon {
  position: absolute;
  left: 18px;
  color: var(--lima);
  pointer-events: none;
  display: flex;
  align-items: center;
}

.srv-search-input {
  width: 100%;
  background: rgba(22, 36, 19, 0.85);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  padding: 13px 24px 13px 48px;
  color: var(--tinta);
  font-family: var(--font-main);
  font-size: 14.5px;
  outline: none;
  transition: all 0.25s ease;
}

.srv-search-input:focus {
  border-color: var(--lima);
  box-shadow: 0 0 20px rgba(184, 255, 59, 0.25);
}

.srv-filter-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 30px;
}

.srv-filter-btn {
  background: rgba(22, 36, 19, 0.8);
  border: 1px solid var(--glass-border);
  color: var(--tinta);
  font-family: var(--font-main);
  font-size: 13px;
  font-weight: 700;
  padding: 7px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.srv-filter-btn:hover {
  border-color: rgba(184, 255, 59, 0.4);
  color: var(--lima);
}

.srv-filter-btn.active {
  background: rgba(184, 255, 59, 0.18);
  border-color: var(--lima);
  color: var(--lima);
  box-shadow: 0 0 15px rgba(184, 255, 59, 0.2);
}

.srv-compact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  align-items: start !important; /* CRITICAL: Evita que las tarjetas hermanas de la misma fila se estiren creando vacíos negros */
}

@media (max-width: 640px) {
  .srv-compact-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.srv-compact-card {
  background: var(--glass-surface);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 16px;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  outline: none;
  position: relative;
  height: auto !important;
  align-self: start !important;
  display: flex;
  flex-direction: column;
}

.srv-compact-card:hover {
  border-color: rgba(184, 255, 59, 0.45);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.65), 0 0 20px rgba(184, 255, 59, 0.14);
  transform: translateY(-3px);
  z-index: 10;
}

.srv-compact-card.is-open {
  border-color: var(--lima) !important;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.8), 0 0 28px rgba(184, 255, 59, 0.25) !important;
  background: rgba(15, 23, 14, 0.96) !important;
  z-index: 15;
}

/* ==========================================================================
   ESTRUCTURA DE TARJETA ESTILO ÁLBUM SPOTIFY (COVER + SLEEVES + BADGE + INFO)
   ========================================================================== */
.spotify-cover-wrap {
  position: relative;
  width: 100%;
  margin-bottom: 22px;
  padding-right: 12px;
  cursor: pointer;
}

.spotify-cover-art {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.srv-compact-card:hover .spotify-cover-art {
  transform: scale(1.02);
}

.spotify-cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(12, 18, 10, 0.04) 0%, rgba(12, 18, 10, 0.3) 55%, rgba(12, 18, 10, 0.88) 100%);
  pointer-events: none;
}

/* Efecto de mangas de vinilo apiladas a la derecha de la portada */
.spotify-sleeve-stack {
  position: absolute;
  top: 10px;
  bottom: 10px;
  right: 0;
  width: 12px;
  display: flex;
  gap: 2.5px;
  pointer-events: none;
}

.spotify-sleeve-layer {
  height: 86%;
  margin: auto 0;
  border-radius: 0 4px 4px 0;
}

.s-layer-1 {
  width: 4px;
  background: rgba(28, 44, 24, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: none;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.45);
}

.s-layer-2 {
  width: 4px;
  height: 72%;
  background: rgba(244, 251, 241, 0.85);
  border-radius: 0 3px 3px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.35);
}

/* Badge inferior izquierdo superpuesto sobre la carátula (como en Spotify) */
.spotify-badge-box {
  position: absolute;
  bottom: -15px;
  left: 12px;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(18, 28, 15, 0.96);
  border: 1.5px solid rgba(184, 255, 59, 0.38);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--lima);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.75), 0 0 16px rgba(184, 255, 59, 0.2);
  z-index: 5;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.spotify-badge-box svg {
  width: 24px;
  height: 24px;
  transition: transform 0.25s ease;
}

.srv-compact-card:hover .spotify-badge-box,
.srv-compact-card.is-open .spotify-badge-box {
  background: var(--lima);
  color: #0C120A;
  transform: scale(1.08) translateY(-2px);
  box-shadow: 0 0 26px rgba(184, 255, 59, 0.65);
  border-color: var(--lima);
}

.srv-compact-card:hover .spotify-badge-box svg,
.srv-compact-card.is-open .spotify-badge-box svg {
  stroke: #0C120A;
}

/* Bloque inferior de metadatos */
.spotify-card-body {
  padding: 2px 4px 0;
  cursor: pointer;
}

.spotify-card-title {
  font-family: var(--font-title);
  font-size: 17px;
  font-weight: 800;
  color: var(--tinta);
  line-height: 1.25;
  margin-bottom: 6px;
  letter-spacing: -0.015em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.spotify-meta-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.spotify-price-tag {
  font-family: var(--font-main);
  font-size: 13px;
  font-weight: 800;
  color: var(--lima);
  letter-spacing: -0.01em;
}

.spotify-short-desc {
  font-size: 11.5px;
  color: var(--mut);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-chevron-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(184, 255, 59, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--lima);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
  cursor: pointer;
  outline: none;
  padding: 0;
}

.spotify-chevron-btn:hover {
  background: rgba(184, 255, 59, 0.22);
  border-color: var(--lima);
  transform: scale(1.1);
}

.srv-compact-card.is-open .spotify-chevron-btn {
  background: var(--lima);
  border-color: var(--lima);
  color: #0C120A;
  transform: rotate(180deg);
}

.srv-card-main {
  display: flex;
  align-items: center;
  gap: 14px;
}

.srv-icon-badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(184, 255, 59, 0.1);
  border: 1px solid rgba(184, 255, 59, 0.25);
  color: var(--lima);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.srv-compact-card:hover .srv-icon-badge,
.srv-compact-card.is-open .srv-icon-badge {
  background: var(--lima);
  color: #0C120A;
  transform: scale(1.05);
}

.srv-info {
  flex: 1;
  min-width: 0;
}

.srv-num-tag {
  font-family: var(--font-title);
  font-size: 15.5px;
  font-weight: 700;
  color: var(--tinta);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.srv-price-base {
  font-family: var(--font-main);
  font-size: 13px;
  font-weight: 700;
  color: var(--lima);
  margin-top: 2px;
}

.srv-chevron-wrap {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mut);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
  cursor: pointer;
  outline: none;
  padding: 0;
}

.srv-chevron-wrap:hover {
  background: rgba(184, 255, 59, 0.22);
  border-color: var(--lima);
  color: var(--lima);
  transform: scale(1.08);
}

.srv-compact-card.is-open .srv-chevron-wrap {
  background: var(--lima);
  border-color: var(--lima);
  color: #0C120A;
  transform: rotate(180deg);
}

/* DESPLEGABLE COMPACTO Y CONTROLADO (SOLO SE ABRE AL CLIC EN LA FLECHA, NO AL PASAR EL MOUSE) */
.srv-dropdown-pane {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease, margin-top 0.28s ease;
  margin-top: 0;
}

.srv-compact-card.is-open .srv-dropdown-pane {
  max-height: 360px;
  opacity: 1;
  margin-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 12px;
}

.srv-dropdown-desc {
  font-size: 12px;
  color: var(--mut);
  line-height: 1.4;
  margin-bottom: 10px;
}

.srv-dropdown-table {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
  max-height: 180px;
  overflow-y: auto;
  padding-right: 4px;
}

.srv-dropdown-table::-webkit-scrollbar {
  width: 3.5px;
}
.srv-dropdown-table::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
}
.srv-dropdown-table::-webkit-scrollbar-thumb {
  background: rgba(184, 255, 59, 0.45);
  border-radius: 4px;
}
  margin-bottom: 12px;
}

.srv-table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  background: rgba(12, 18, 10, 0.65);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  gap: 8px;
}

.srv-row-name {
  display: flex;
  flex-direction: column;
}

.srv-row-name strong {
  font-size: 12px;
  font-weight: 600;
  color: var(--tinta);
}

.srv-row-name small {
  font-size: 10px;
  color: var(--mut);
}

.srv-row-price {
  font-family: var(--font-title);
  font-size: 13.5px;
  font-weight: 800;
  color: var(--lima);
  white-space: nowrap;
}

.srv-dropdown-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding-top: 4px;
}

.srv-modality-pill {
  font-size: 9.5px;
  color: var(--lima);
  background: rgba(184, 255, 59, 0.1);
  padding: 2px 7px;
  border-radius: 6px;
  border: 1px solid rgba(184, 255, 59, 0.2);
}

.srv-guarantee-pill {
  font-size: 9.5px;
  color: #FFFA70;
  background: rgba(255, 250, 112, 0.1);
  padding: 2px 7px;
  border-radius: 6px;
  border: 1px solid rgba(255, 250, 112, 0.2);
}

/* ==========================================================================
   FOOTER CORPORATIVO Y LEGAL COMPLETO RESTAURADO
   ========================================================================== */
.site-footer {
  padding: 60px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 60px;
  position: relative;
  z-index: 2;
  background: rgba(10, 15, 9, 0.85);
}

.footer-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.4fr 2.6fr;
  gap: 48px;
  margin-bottom: 40px;
}

@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 28px;
}

.footer-col h5 {
  font-family: var(--font-title);
  font-size: 14px;
  font-weight: 700;
  color: var(--tinta);
  margin-bottom: 14px;
  letter-spacing: 0.02em;
}

.footer-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.footer-col a {
  color: var(--mut);
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
}

.footer-col a:hover {
  color: var(--lima);
}

.footer-bottom {
  max-width: 1240px;
  margin: 0 auto;
  padding: 24px 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: rgba(244, 251, 241, 0.5);
  gap: 12px;
}

/* ==========================================================================
   SIMULADOR INTERACTIVO DE AHORRO Y DIGNIFICACIÓN TÉCNICA
   ========================================================================== */
.sim-card-wrap {
  max-width: 980px;
  margin: 0 auto;
}

.sim-box {
  background: var(--glass-surface);
  border: 1px solid var(--glass-border-lima);
  border-radius: 28px;
  padding: 34px 32px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(184, 255, 59, 0.08);
  position: relative;
  overflow: hidden;
}

.sim-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 18px;
}

.sim-label {
  font-size: 14px;
  color: var(--mut);
  display: block;
  margin-bottom: 4px;
}

.sim-amount-display {
  font-family: var(--font-title);
  font-size: clamp(26px, 3.5vw, 36px);
  font-weight: 800;
  color: var(--lima);
  letter-spacing: -0.5px;
}

.sim-disp-tag {
  background: rgba(184, 255, 59, 0.1);
  border: 1px solid rgba(184, 255, 59, 0.3);
  color: var(--lima);
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 999px;
}

.sim-range-slider {
  width: 100%;
  height: 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.12);
  outline: none;
  accent-color: var(--lima);
  margin-bottom: 24px;
  cursor: pointer;
}

.sim-cats-label {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--tinta);
  margin-bottom: 12px;
}

.sim-tier-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}

.sim-tier-btn {
  background: rgba(18, 28, 18, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  color: var(--tinta);
  font-family: var(--font-main);
  text-align: left;
  outline: none;
  position: relative;
  backdrop-filter: blur(10px);
}

.sim-tier-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.2);
}

.sim-placa-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.sim-placa-icon-badge {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

/* Concordancia exacta de colores con los servicios y acabados metálicos */
.sim-placa-icon-badge.oro {
  background: rgba(255, 215, 0, 0.12);
  border: 1px solid rgba(255, 215, 0, 0.4);
  color: #FFD700;
}
.sim-placa-icon-badge.plata {
  background: rgba(226, 232, 240, 0.12);
  border: 1px solid rgba(226, 232, 240, 0.4);
  color: #E2E8F0;
}
.sim-placa-icon-badge.bronce {
  background: rgba(205, 127, 50, 0.14);
  border: 1px solid rgba(205, 127, 50, 0.4);
  color: #E09F67;
}
.sim-placa-icon-badge.fundador {
  background: rgba(184, 255, 59, 0.15);
  border: 1px solid rgba(184, 255, 59, 0.45);
  color: #B8FF3B;
}

.sim-tier-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
}
.sim-tier-badge.oro {
  background: rgba(255, 215, 0, 0.15);
  color: #FFD700;
  border-color: rgba(255, 215, 0, 0.35);
}
.sim-tier-badge.plata {
  background: rgba(226, 232, 240, 0.15);
  color: #E2E8F0;
  border-color: rgba(226, 232, 240, 0.35);
}
.sim-tier-badge.bronce {
  background: rgba(205, 127, 50, 0.15);
  color: #E09F67;
  border-color: rgba(205, 127, 50, 0.35);
}
.sim-tier-badge.fundador {
  background: #B8FF3B;
  color: #0C120A;
  border-color: #B8FF3B;
}

.sim-placa-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sim-placa-name {
  font-family: var(--font-title);
  font-size: 15.5px;
  font-weight: 800;
  color: var(--tinta);
}
.sim-placa-net {
  font-size: 12px;
  color: var(--mut);
  font-weight: 600;
}

/* Estados activos con brillo metálico específico */
.sim-tier-btn.active.tier-oro {
  background: rgba(255, 215, 0, 0.08);
  border-color: #FFD700;
  box-shadow: 0 0 24px rgba(255, 215, 0, 0.22);
}
.sim-tier-btn.active.tier-oro .sim-placa-icon-badge {
  background: #FFD700;
  color: #0C120A;
}

.sim-tier-btn.active.tier-plata {
  background: rgba(226, 232, 240, 0.08);
  border-color: #CBD5E1;
  box-shadow: 0 0 24px rgba(203, 213, 225, 0.2);
}
.sim-tier-btn.active.tier-plata .sim-placa-icon-badge {
  background: #E2E8F0;
  color: #0C120A;
}

.sim-tier-btn.active.tier-bronce {
  background: rgba(205, 127, 50, 0.08);
  border-color: #E09F67;
  box-shadow: 0 0 24px rgba(205, 127, 50, 0.2);
}
.sim-tier-btn.active.tier-bronce .sim-placa-icon-badge {
  background: #E09F67;
  color: #0C120A;
}

.sim-tier-btn.active.tier-fundador {
  background: rgba(184, 255, 59, 0.08);
  border-color: var(--lima);
  box-shadow: 0 0 26px rgba(184, 255, 59, 0.28);
}
.sim-tier-btn.active.tier-fundador .sim-placa-icon-badge {
  background: var(--lima);
  color: #0C120A;
}

.sim-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}

.sim-result-card {
  background: rgba(10, 16, 9, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
}

.sim-result-card.highlight {
  border-color: rgba(184, 255, 59, 0.5);
  background: rgba(184, 255, 59, 0.06);
}

.sim-result-card.alert {
  border-color: rgba(255, 99, 71, 0.3);
  background: rgba(255, 99, 71, 0.05);
}

.sim-result-card.gold {
  border-color: rgba(255, 250, 112, 0.4);
  background: rgba(255, 250, 112, 0.06);
}

.sim-res-kicker {
  font-size: 11.5px;
  color: var(--mut);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.sim-res-value {
  font-family: var(--font-title);
  font-size: 22px;
  font-weight: 800;
  color: var(--tinta);
  margin-bottom: 4px;
}

.sim-result-card.highlight .sim-res-value {
  color: var(--lima);
}

.sim-result-card.alert .sim-res-value {
  color: #FF6B6B;
}

.sim-result-card.gold .sim-res-value {
  color: #FFFA70;
}

.sim-res-sub {
  font-size: 11px;
  color: var(--mut);
  line-height: 1.35;
}

.sim-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.sim-guarantee-note {
  font-size: 12.5px;
  color: var(--mut);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  max-width: 480px;
}
.sim-guarantee-note svg {
  color: var(--lima);
  flex-shrink: 0;
}

/* ==========================================================================
   HERO EDITORIAL DARK LUXURY · MUJER PROFESIONAL REBUSKE & ILUMINACIÓN CINEMÁTICA
   (Inspirado directamente en la estética de estudio fotográfico de alta gama)
   ========================================================================== */
html {
  scroll-behavior: smooth !important;
}

.hero-luxury-wrap {
  position: relative;
  min-height: 82vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
  padding: 70px 24px 60px;
  background: transparent !important;
}

.hero-luxury-wrap::before {
  content: '';
  position: absolute;
  top: -100px;
  bottom: -140px;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 0;
  background: 
    radial-gradient(ellipse 75% 55% at 50% 45%, rgba(184, 255, 59, 0.10) 0%, rgba(78, 136, 57, 0.04) 50%, transparent 75%),
    linear-gradient(180deg, 
      rgba(12, 18, 10, 0) 0%, 
      rgba(12, 18, 10, 0.35) 10%, 
      rgba(12, 18, 10, 0.78) 22%, 
      rgba(12, 18, 10, 0.96) 35%, 
      #0C120A 46%, 
      #0C120A 64%, 
      rgba(12, 18, 10, 0.94) 75%, 
      rgba(12, 18, 10, 0.68) 85%, 
      rgba(12, 18, 10, 0.28) 94%, 
      rgba(12, 18, 10, 0) 100%
    );
  mask-image: linear-gradient(180deg, 
    transparent 0%, 
    black 12%, 
    black 88%, 
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(180deg, 
    transparent 0%, 
    black 12%, 
    black 88%, 
    transparent 100%
  );
}

.hero-giant-watermark {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-title);
  font-size: clamp(80px, 16vw, 220px);
  font-weight: 900;
  letter-spacing: 0.06em;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(244, 251, 241, 0.05);
  pointer-events: none;
  z-index: 1;
  white-space: nowrap;
  user-select: none;
}

.hero-luxury-container {
  max-width: 1360px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  position: relative;
  z-index: 3;
  gap: 36px;
}

@media (min-width: 992px) {
  .hero-luxury-container {
    grid-template-columns: 1.15fr 0.9fr 1.05fr;
    gap: 20px;
  }
}

/* Columna Izquierda: Copy, CTAs y Métricas */
.hero-luxury-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
}

.hero-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(184, 255, 59, 0.10);
  border: 1px solid rgba(184, 255, 59, 0.32);
  color: var(--lima);
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 999px;
  align-self: flex-start;
}

.hero-editorial-title {
  font-family: var(--font-title);
  font-size: clamp(32px, 4.2vw, 56px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: #F4FBF1;
  margin: 0;
}

.hero-editorial-accent {
  background: linear-gradient(135deg, #B8FF3B 0%, #A3FF20 45%, #E2E8F0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.hero-editorial-desc {
  font-size: clamp(15px, 1.4vw, 17px);
  color: rgba(244, 251, 241, 0.72);
  line-height: 1.6;
  max-width: 480px;
  margin: 0;
}

.hero-editorial-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.hero-metrics-row {
  display: flex;
  gap: 14px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.hero-stat-card {
  background: rgba(14, 22, 14, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  min-width: 140px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.hero-stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.2);
}

.hero-stat-card.highlight {
  border-color: rgba(184, 255, 59, 0.35);
  background: rgba(184, 255, 59, 0.06);
}

.hero-stat-num {
  font-family: var(--font-title);
  font-size: 26px;
  font-weight: 800;
  color: #F4FBF1;
  line-height: 1;
}

.hero-stat-card.highlight .hero-stat-num {
  color: var(--lima);
}

.hero-stat-lbl {
  font-size: 11px;
  color: var(--mut);
  margin-top: 4px;
  font-weight: 600;
}

/* Columna Central: Retrato Profesional con Rim Light */
.hero-portrait-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hero-portrait-glow-halo {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(184, 255, 59, 0.32) 0%, rgba(78, 136, 57, 0.10) 50%, transparent 75%);
  filter: blur(65px);
  z-index: 1;
  pointer-events: none;
}

.hero-portrait-frame {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 380px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 
    0 24px 60px rgba(0, 0, 0, 0.95),
    0 0 50px rgba(184, 255, 59, 0.25),
    0 0 0 1.5px rgba(184, 255, 59, 0.35);
  transition: transform 0.4s ease;
}

.hero-portrait-frame:hover {
  transform: translateY(-4px) scale(1.02);
}

.hero-portrait-img {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  display: block;
}

.hero-portrait-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(5, 8, 5, 0.95) 0%, rgba(5, 8, 5, 0.6) 60%, transparent 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-portrait-caption span {
  font-size: 11.5px;
  font-weight: 700;
  color: #F4FBF1;
}

.hero-portrait-tag {
  background: rgba(184, 255, 59, 0.15);
  border: 1px solid var(--lima);
  color: var(--lima);
  font-size: 9.5px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 4px;
}

/* Columna Derecha: Tarjeta Flotante Bóveda & Garantía */
.hero-luxury-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
}

@media (min-width: 992px) {
  .hero-luxury-right {
    align-items: flex-end;
  }
}

.hero-statement-text {
  font-family: var(--font-title);
  font-size: clamp(20px, 2.5vw, 32px);
  font-weight: 800;
  line-height: 1.15;
  color: rgba(244, 251, 241, 0.88);
  letter-spacing: -0.01em;
  text-align: left;
}
@media (min-width: 992px) {
  .hero-statement-text {
    text-align: right;
  }
}

.hero-feature-card {
  background: rgba(14, 22, 14, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  padding: 22px 24px;
  max-width: 360px;
  backdrop-filter: blur(14px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(184, 255, 59, 0.15);
  text-align: left;
  border-top: 3px solid var(--lima);
}

.hero-feature-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.hero-feature-pill {
  font-size: 11px;
  font-weight: 800;
  color: var(--lima);
  background: rgba(184, 255, 59, 0.12);
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid rgba(184, 255, 59, 0.30);
}

.hero-feature-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #B8FF3B;
  box-shadow: 0 0 8px #B8FF3B;
}

.hero-feature-title {
  font-family: var(--font-title);
  font-size: 17px;
  font-weight: 800;
  color: #F4FBF1;
  margin-bottom: 6px;
}

.hero-feature-text {
  font-size: 13px;
  color: var(--mut);
  line-height: 1.5;
  margin-bottom: 12px;
}

.hero-feature-badges {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hero-feature-badges span {
  font-size: 11.5px;
  color: rgba(244, 251, 241, 0.85);
  display: flex;
  align-items: center;
  gap: 6px;
}

.hero-feature-badges svg {
  color: var(--lima);
  flex-shrink: 0;
}


/* Transición continua 100% fluida, orgánica y sin líneas ni cortes */
.hero-bottom-blend {
  display: none !important;
}

`;
