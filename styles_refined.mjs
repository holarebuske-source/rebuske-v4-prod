export const REFINED_STYLES = `

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
  padding: 60px 20px 40px;
  position: relative;
  z-index: 2;
  max-width: 1320px;
  margin: 0 auto;
}

.phones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 40px;
}

@media (min-width: 1100px) {
  .phones-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 26px;
  }
}

.phone-card-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* ==========================================================================
   CHASIS IPHONE AIR (TITANIO ULTRA DELGADO, MICRO-BISEL & DYNAMIC ISLAND MICRO)
   ========================================================================== */
.phone-mockup {
  position: relative;
  width: 100%;
  max-width: 288px;
  aspect-ratio: 9 / 19.5;
  background: #050806;
  border-radius: 48px;
  padding: 4px; /* Micro-bisel ultra delgado iPhone Air */
  box-shadow: 
    0 28px 70px -12px rgba(0, 0, 0, 0.95),
    0 0 0 1.5px rgba(244, 251, 241, 0.28),
    0 0 0 3px rgba(184, 255, 59, 0.12),
    0 0 35px rgba(184, 255, 59, 0.18),
    inset 0 0 2px 1px rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(244, 251, 241, 0.35); /* Chasis titanio satinado */
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  overflow: hidden;
}

.phone-mockup::before {
  /* Bisel perimétrico de titanio aeroespacial iPhone Air */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 48px;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 12;
}

.phone-mockup:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 36px 80px -10px rgba(0, 0, 0, 0.98),
    0 0 0 2px rgba(184, 255, 59, 0.6),
    0 0 50px rgba(184, 255, 59, 0.3);
}

.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #080C09;
  border-radius: 44px;
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
  border-radius: 44px;
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.srv-compact-card {
  background: var(--glass-surface);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 18px;
  padding: 16px 18px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  outline: none;
  position: relative;
}

.srv-compact-card:hover, .srv-compact-card:focus-within {
  border-color: rgba(184, 255, 59, 0.45);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(184, 255, 59, 0.14);
  transform: translateY(-3px);
  z-index: 10;
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

.srv-compact-card:hover .srv-icon-badge {
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
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mut);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.srv-compact-card:hover .srv-chevron-wrap, .srv-compact-card:focus-within .srv-chevron-wrap {
  background: rgba(184, 255, 59, 0.2);
  color: var(--lima);
  transform: rotate(180deg);
}

/* DESPLEGABLE SUAVE AL HOVER */
.srv-dropdown-pane {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, margin-top 0.3s ease;
  margin-top: 0;
}

.srv-compact-card:hover .srv-dropdown-pane, .srv-compact-card:focus-within .srv-dropdown-pane {
  max-height: 480px;
  opacity: 1;
  margin-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 12px;
}

.srv-dropdown-desc {
  font-size: 12.5px;
  color: var(--mut);
  line-height: 1.45;
  margin-bottom: 12px;
}

.srv-dropdown-table {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
`;
