import fs from 'fs';

let css = fs.readFileSync('styles_refined.mjs', 'utf8');

const additions = `
/* ==========================================================================
   BURBUJA LOGO 3D ANIMADO Y REGLAS DE CENTRADO EXACTO
   ========================================================================== */
.logo-3d-bubble {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(184, 255, 59, 0.28), rgba(12, 18, 10, 0.95));
  border: 1.5px solid rgba(184, 255, 59, 0.5);
  box-shadow: 0 0 16px rgba(184, 255, 59, 0.35), inset 0 0 10px rgba(184, 255, 59, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  animation: logoBubbleFloat 3.6s ease-in-out infinite alternate;
}
.logo-3d-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(184, 255, 59, 0.6));
}
@keyframes logoBubbleFloat {
  0% { transform: translateY(0) scale(1); box-shadow: 0 0 14px rgba(184,255,59,0.3); }
  50% { transform: translateY(-2px) scale(1.05); box-shadow: 0 0 22px rgba(184,255,59,0.6); }
  100% { transform: translateY(0) scale(1); box-shadow: 0 0 14px rgba(184,255,59,0.3); }
}

.sec-desc {
  font-size: 16px !important;
  color: var(--mut) !important;
  max-width: 820px !important;
  line-height: 1.6 !important;
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: 20px !important;
  display: block !important;
}

.phone-real-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  border-radius: 36px;
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
`;

if (!css.includes('.logo-3d-bubble')) {
  css = css.replace('export const REFINED_STYLES = `', 'export const REFINED_STYLES = `\n' + additions);
  fs.writeFileSync('styles_refined.mjs', css, 'utf8');
  console.log('Updated styles_refined.mjs successfully!');
} else {
  console.log('styles_refined.mjs already includes .logo-3d-bubble');
}
