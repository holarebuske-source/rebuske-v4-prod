import fs from 'fs';

let css = fs.readFileSync('styles_refined.mjs', 'utf8');

// Replace or ensure phone-real-screenshot & phone-status-bar rules
const screenshotRules = `
.phone-real-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  border-radius: 36px;
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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, transparent 100%) !important;
  padding: 8px 16px 4px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  color: #F4FBF1;
}

.phone-home-indicator {
  position: absolute !important;
  bottom: 8px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 100px !important;
  height: 4px !important;
  background: rgba(255, 255, 255, 0.5) !important;
  border-radius: 4px !important;
  z-index: 5 !important;
}
`;

css = css.replace('.phone-real-screenshot {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: top center;\n  display: block;\n  border-radius: 36px;\n}', screenshotRules);

fs.writeFileSync('styles_refined.mjs', css, 'utf8');
console.log('styles_refined.mjs updated with exact phone overlay rules!');
