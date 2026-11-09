export const phoneScreensInternalCSS = `
/* ==========================================================================
   ESTILOS INTERNOS DE LAS PANTALLAS DE TELÉFONOS (ALTA FIDELIDAD)
   ========================================================================== */
.app-screen-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 4px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 11px;
  font-weight: 700;
  color: #F4FBF1;
}

.screen-live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #B8FF3B;
  box-shadow: 0 0 8px #B8FF3B;
}

.screen-bank-badge {
  background: #FFDD00;
  color: #000;
  font-size: 9px;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: -0.02em;
}

.screen-secure-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #3B82F6;
  box-shadow: 0 0 8px #3B82F6;
}

.screen-tech-badge {
  background: rgba(184, 255, 59, 0.15);
  color: #B8FF3B;
  font-size: 9px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 10px;
  border: 1px solid rgba(184, 255, 59, 0.3);
}

/* 1. RADAR SCREEN */
.radar-map-sim {
  position: relative;
  width: 100%;
  height: 190px;
  background: #08100A;
  border-radius: 16px;
  margin: 10px 0;
  overflow: hidden;
  border: 1px solid rgba(184, 255, 59, 0.2);
}

.radar-sweep-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 220px;
  height: 220px;
  margin-top: -110px;
  margin-left: -110px;
  border-radius: 50%;
  border: 1px solid rgba(184, 255, 59, 0.25);
  background: conic-gradient(from 0deg, rgba(184, 255, 59, 0.28) 0deg, transparent 60deg, transparent 360deg);
  animation: radarSweep 4s linear infinite;
}

@keyframes radarSweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.radar-grid-lines {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(184, 255, 59, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(184, 255, 59, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
}

.radar-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 5;
}

.radar-pin-dest .pin-icon {
  font-size: 14px;
}

.radar-pin-dest .pin-label {
  background: rgba(0,0,0,0.8);
  border: 1px solid #B8FF3B;
  color: #B8FF3B;
  font-size: 9px;
  font-weight: 800;
  padding: 1px 5px;
  border-radius: 4px;
  white-space: nowrap;
}

.radar-pin-moto {
  animation: motoBounce 2s ease-in-out infinite alternate;
}

@keyframes motoBounce {
  from { transform: translate(-50%, -50%) translateY(0); }
  to { transform: translate(-50%, -50%) translateY(-3px); }
}

.moto-icon {
  font-size: 16px;
  filter: drop-shadow(0 0 6px #B8FF3B);
}

.radar-route-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.phone-hud-card {
  background: rgba(22, 36, 19, 0.88);
  border: 1px solid rgba(184, 255, 59, 0.25);
  border-radius: 14px;
  padding: 10px 12px;
  margin-top: auto;
}

.hud-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.hud-badge-urgente {
  background: rgba(184, 255, 59, 0.18);
  color: #B8FF3B;
  font-size: 9.5px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 6px;
}

.hud-eta {
  font-size: 10px;
  font-weight: 700;
  color: #FFFA70;
}

.hud-service-name {
  font-size: 12px;
  font-weight: 700;
  color: #F4FBF1;
  margin-bottom: 6px;
}

.hud-tech-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.hud-tech-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #1C2B1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border: 1px solid #B8FF3B;
}

.hud-tech-info {
  display: flex;
  flex-direction: column;
}

.hud-tech-name {
  font-size: 10.5px;
  font-weight: 700;
  color: #F4FBF1;
}

.hud-tech-rating {
  font-size: 9px;
  color: rgba(244, 251, 241, 0.65);
}

/* 2. VAULT / ESCROW SCREEN */
.vault-graphic-box {
  text-align: center;
  padding: 18px 10px 14px;
  background: rgba(14, 24, 15, 0.7);
  border-radius: 16px;
  margin: 10px 0;
  border: 1px solid rgba(184, 255, 59, 0.2);
}

.vault-shield-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 8px;
}

.vault-shield-icon {
  font-size: 34px;
  filter: drop-shadow(0 0 12px rgba(184, 255, 59, 0.6));
}

.vault-amount {
  font-family: 'Baloo 2', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #F4FBF1;
  line-height: 1;
  margin-bottom: 6px;
}

.vault-currency {
  font-size: 12px;
  color: #B8FF3B;
  font-weight: 700;
}

.vault-status-pill {
  display: inline-block;
  background: rgba(184, 255, 59, 0.12);
  color: #B8FF3B;
  font-size: 9.5px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid rgba(184, 255, 59, 0.28);
}

.vault-breakdown-card {
  background: rgba(22, 36, 19, 0.7);
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  color: rgba(244, 251, 241, 0.75);
  padding: 3px 0;
}

.breakdown-row.total {
  border-top: 1px dashed rgba(255, 255, 255, 0.12);
  margin-top: 4px;
  padding-top: 5px;
  font-weight: 700;
}

.vault-action-btn {
  background: linear-gradient(100deg, #AFFF3E 30%, #EEFFC2 50%, #AFFF3E 70%);
  color: #0C120A;
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  padding: 10px 12px;
  border-radius: 999px;
  box-shadow: 0 4px 15px rgba(184, 255, 59, 0.35);
  margin-top: auto;
}

/* 3. QR CREDENTIAL SCREEN */
.pro-id-badge-card {
  background: rgba(14, 24, 15, 0.85);
  border-radius: 16px;
  padding: 12px;
  text-align: center;
  margin: 10px 0;
  border: 1px solid rgba(184, 255, 59, 0.22);
}

.pro-photo-ring {
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0 auto 8px;
  border-radius: 50%;
  border: 2px solid #B8FF3B;
  box-shadow: 0 0 12px rgba(184, 255, 59, 0.4);
  background: #1A2818;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pro-photo-sim {
  font-size: 26px;
}

.pro-verified-check {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  background: #B8FF3B;
  color: #0C120A;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #0B100E;
}

.pro-id-name {
  font-family: 'Baloo 2', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #F4FBF1;
  line-height: 1.2;
}

.pro-id-specialty {
  font-size: 10px;
  color: #B8FF3B;
  font-weight: 600;
  margin-bottom: 8px;
}

.pro-badges-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.mini-check-badge {
  font-size: 9px;
  color: rgba(244, 251, 241, 0.8);
  background: rgba(255, 255, 255, 0.05);
  padding: 3px 6px;
  border-radius: 4px;
  border-left: 2px solid #B8FF3B;
}

.dynamic-qr-box {
  background: rgba(22, 36, 19, 0.8);
  border-radius: 14px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px dashed rgba(184, 255, 59, 0.35);
  margin-top: auto;
}

.qr-code-pattern {
  position: relative;
  width: 68px;
  height: 68px;
  background: #000;
  border-radius: 8px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.qr-corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 3px solid #B8FF3B;
}
.qr-corner.tl { top: 4px; left: 4px; }
.qr-corner.tr { top: 4px; right: 4px; }
.qr-corner.bl { bottom: 4px; left: 4px; }

.qr-center-symbol {
  font-size: 10px;
  font-weight: 900;
  color: #B8FF3B;
  letter-spacing: 0.05em;
  background: #0B100E;
  padding: 2px 4px;
  border-radius: 3px;
  border: 1px solid #B8FF3B;
}

.qr-instruction {
  font-size: 9px;
  color: #FFFA70;
  font-weight: 600;
  margin-top: 6px;
  text-align: center;
}

/* 4. WALLET SCREEN */
.wallet-balance-card {
  background: rgba(14, 24, 15, 0.85);
  border-radius: 16px;
  padding: 14px 12px;
  text-align: center;
  margin: 10px 0;
  border: 1px solid rgba(184, 255, 59, 0.25);
}

.wallet-label {
  font-size: 10px;
  color: rgba(244, 251, 241, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.wallet-amount {
  font-family: 'Baloo 2', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #B8FF3B;
  line-height: 1.1;
  margin: 4px 0 6px;
}

.wallet-cur {
  font-size: 12px;
  color: #F4FBF1;
}

.wallet-payout-timing {
  font-size: 9.5px;
  color: #FFFA70;
  background: rgba(255, 250, 112, 0.1);
  padding: 3px 8px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.wallet-tx-list {
  background: rgba(22, 36, 19, 0.7);
  border-radius: 12px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 8px;
}

.tx-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.tx-row:last-child { border-bottom: none; }

.tx-desc {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.tx-title {
  font-size: 10px;
  font-weight: 700;
  color: #F4FBF1;
}

.tx-date {
  font-size: 8.5px;
  color: rgba(244, 251, 241, 0.5);
}

.tx-val {
  font-size: 10.5px;
  font-weight: 800;
  color: #B8FF3B;
}

.wallet-dest-box {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  padding: 6px;
  font-size: 9px;
  color: rgba(244, 251, 241, 0.75);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: auto;
}
`;
