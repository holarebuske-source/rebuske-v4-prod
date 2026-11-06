import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const sharp = require('C:/Users/camil/.gemini/antigravity/scratch/rebuske-whatsapp-bot/node_modules/sharp');

const dir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const iconPath = path.join(dir, 'rebuske-icon-1024.png');
const outDir = path.join(dir, 'social_campaign');

const iconB64 = fs.readFileSync(iconPath).toString('base64');

async function createBanners() {
  console.log('Creando banners publicitarios oficiales para redes sociales de rebuske...');

  // 1. INSTAGRAM BANNER (1080x1080)
  const igSvg = `
  <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#B8FF3B" stop-opacity="0.25"/>
        <stop offset="60%" stop-color="#162413" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#0C120A" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#182914" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#0E170C" stop-opacity="0.95"/>
      </linearGradient>
      <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#B8FF3B"/>
        <stop offset="100%" stop-color="#AFFF3E"/>
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="1080" height="1080" fill="#0C120A"/>
    <circle cx="540" cy="420" r="420" fill="url(#glow)"/>

    <!-- Glassmorphic Card -->
    <rect x="80" y="80" width="920" height="920" rx="36" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>

    <!-- Top Tag -->
    <rect x="360" y="130" width="360" height="46" rx="23" fill="rgba(184,255,59,0.12)" stroke="#B8FF3B" stroke-width="1.5"/>
    <text x="540" y="160" fill="#B8FF3B" font-family="'Syne', Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="3" text-anchor="middle">MEDELLÍN · ANTIOQUIA</text>

    <!-- App Icon Center -->
    <image href="data:image/png;base64,${iconB64}" x="420" y="210" width="240" height="240"/>

    <!-- Title -->
    <text x="540" y="520" fill="#F4FBF1" font-family="'Syne', Arial, sans-serif" font-size="52" font-weight="800" text-anchor="middle">rebuske</text>
    <text x="540" y="575" fill="#B8FF3B" font-family="'Syne', Arial, sans-serif" font-size="28" font-weight="700" text-anchor="middle">SERVICIOS DEL HOGAR CON PAGO PROTEGIDO</text>

    <!-- Value Badges -->
    <g transform="translate(140, 620)">
      <!-- Badge 1 -->
      <rect x="0" y="0" width="240" height="80" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(184,255,59,0.3)"/>
      <text x="120" y="34" fill="#B8FF3B" font-family="Arial, sans-serif" font-size="22" font-weight="bold" text-anchor="middle">🔒 BÓVEDA WOMPI</text>
      <text x="120" y="60" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="14" text-anchor="middle">Pago 100% retenido</text>

      <!-- Badge 2 -->
      <rect x="270" y="0" width="260" height="80" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(184,255,59,0.3)"/>
      <text x="400" y="34" fill="#B8FF3B" font-family="Arial, sans-serif" font-size="22" font-weight="bold" text-anchor="middle">📜 48H GARANTÍA</text>
      <text x="400" y="60" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="14" text-anchor="middle">Acta digital escrita</text>

      <!-- Badge 3 -->
      <rect x="560" y="0" width="240" height="80" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(184,255,59,0.3)"/>
      <text x="680" y="34" fill="#B8FF3B" font-family="Arial, sans-serif" font-size="22" font-weight="bold" text-anchor="middle">👩‍🔧 POR ELLAS</text>
      <text x="680" y="60" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="14" text-anchor="middle">Mujeres técnicas</text>
    </g>

    <!-- Services bar -->
    <text x="540" y="750" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="22" font-weight="600" text-anchor="middle">
      Plomería · Electricidad · Cerrajería · Aseo Profundo · Mantenimiento
    </text>

    <!-- CTA Button -->
    <rect x="240" y="790" width="600" height="74" rx="37" fill="url(#btnGrad)"/>
    <text x="540" y="837" fill="#0C120A" font-family="'Syne', Arial, sans-serif" font-size="26" font-weight="800" text-anchor="middle">REGÍSTRATE EN: rebuske.vercel.app/registro</text>

    <!-- Laura Contact Footer -->
    <text x="540" y="930" fill="rgba(244,251,241,0.8)" font-family="Arial, sans-serif" font-size="20" text-anchor="middle">
      💬 ¿Dudas o emergencias? Escribe a Laura por WhatsApp: <tspan fill="#B8FF3B" font-weight="bold">+57 304 381 2882</tspan>
    </text>
  </svg>`;

  await sharp(Buffer.from(igSvg)).png().toFile(path.join(outDir, 'banner_instagram.png'));
  console.log('✅ Banner Instagram (1080x1080) generado.');

  // 2. TIKTOK BANNER (1080x1920)
  const ttSvg = `
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glowTT" cx="50%" cy="35%" r="55%">
        <stop offset="0%" stop-color="#B8FF3B" stop-opacity="0.3"/>
        <stop offset="50%" stop-color="#162413" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#0C120A" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="cardTT" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#182914" stop-opacity="0.88"/>
        <stop offset="100%" stop-color="#0A1008" stop-opacity="0.96"/>
      </linearGradient>
    </defs>

    <rect width="1080" height="1920" fill="#0C120A"/>
    <circle cx="540" cy="700" r="600" fill="url(#glowTT)"/>

    <!-- Main Card -->
    <rect x="70" y="160" width="940" height="1600" rx="44" fill="url(#cardTT)" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>

    <!-- Category Pill -->
    <rect x="300" y="240" width="480" height="54" rx="27" fill="rgba(184,255,59,0.12)" stroke="#B8FF3B" stroke-width="2"/>
    <text x="540" y="275" fill="#B8FF3B" font-family="'Syne', Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3" text-anchor="middle">MEDELLÍN Y VALLE DE ABURRÁ</text>

    <!-- Hook Question -->
    <text x="540" y="380" fill="#FFFA70" font-family="'Syne', Arial, sans-serif" font-size="44" font-weight="900" text-anchor="middle">¿SE TE DAÑÓ UN TUBO O</text>
    <text x="540" y="440" fill="#FFFA70" font-family="'Syne', Arial, sans-serif" font-size="44" font-weight="900" text-anchor="middle">TE QUEDASTE ENCERRADO?</text>

    <!-- Official Logo Icon -->
    <image href="data:image/png;base64,${iconB64}" x="390" y="490" width="300" height="300"/>

    <text x="540" y="860" fill="#F4FBF1" font-family="'Syne', Arial, sans-serif" font-size="68" font-weight="800" text-anchor="middle">rebuske</text>
    <text x="540" y="920" fill="#B8FF3B" font-family="'Syne', Arial, sans-serif" font-size="32" font-weight="700" text-anchor="middle">LA REVOLUCIÓN DEL DESVARE EN EL HOGAR</text>

    <!-- The 3 Rules -->
    <g transform="translate(130, 980)">
      <rect x="0" y="0" width="820" height="120" rx="20" fill="rgba(255,255,255,0.06)" stroke="rgba(184,255,59,0.3)"/>
      <text x="40" y="48" fill="#B8FF3B" font-family="Arial, sans-serif" font-size="28" font-weight="bold">1. BÓVEDA WOMPI PROTEGIDA</text>
      <text x="40" y="86" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="20">El técnico no cobra un peso hasta que tú digas que quedó bien.</text>
    </g>

    <g transform="translate(130, 1130)">
      <rect x="0" y="0" width="820" height="120" rx="20" fill="rgba(255,255,255,0.06)" stroke="rgba(184,255,59,0.3)"/>
      <text x="40" y="48" fill="#B8FF3B" font-family="Arial, sans-serif" font-size="28" font-weight="bold">2. ACTA DIGITAL DE GARANTÍA 48H</text>
      <text x="40" y="86" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="20">Si algo vuelve a gotear o fallar, se repara sin costo adicional.</text>
    </g>

    <g transform="translate(130, 1280)">
      <rect x="0" y="0" width="820" height="120" rx="20" fill="rgba(255,255,255,0.06)" stroke="rgba(184,255,59,0.3)"/>
      <text x="40" y="48" fill="#B8FF3B" font-family="Arial, sans-serif" font-size="28" font-weight="bold">3. TÉCNICOS Y TÉCNICAS VERIFICADAS</text>
      <text x="40" y="86" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="20">Antecedentes, experiencia y calificación real de la comunidad.</text>
    </g>

    <!-- Big CTA -->
    <rect x="180" y="1450" width="720" height="90" rx="45" fill="#B8FF3B"/>
    <text x="540" y="1508" fill="#0C120A" font-family="'Syne', Arial, sans-serif" font-size="34" font-weight="900" text-anchor="middle">👉 REGÍSTRATE EN EL LINK DEL PERFIL</text>

    <!-- Laura Support -->
    <text x="540" y="1600" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="24" text-anchor="middle">rebuske.vercel.app/registro</text>
    <text x="540" y="1670" fill="rgba(244,251,241,0.85)" font-family="Arial, sans-serif" font-size="24" text-anchor="middle">
      💬 WhatsApp de Laura: <tspan fill="#B8FF3B" font-weight="bold">+57 304 381 2882</tspan>
    </text>
  </svg>`;

  await sharp(Buffer.from(ttSvg)).png().toFile(path.join(outDir, 'banner_tiktok.png'));
  console.log('✅ Banner TikTok (1080x1920) generado.');

  // 3. FACEBOOK BANNER (1200x630)
  const fbSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glowFB" cx="70%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#B8FF3B" stop-opacity="0.22"/>
        <stop offset="60%" stop-color="#162413" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#0C120A" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="cardFB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#182914" stop-opacity="0.88"/>
        <stop offset="100%" stop-color="#0C120A" stop-opacity="0.95"/>
      </linearGradient>
    </defs>

    <rect width="1200" height="630" fill="#0C120A"/>
    <rect width="1200" height="630" fill="url(#glowFB)"/>

    <!-- Left Content Box -->
    <rect x="60" y="60" width="1080" height="510" rx="28" fill="url(#cardFB)" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>

    <!-- Left Side: Brand & Icon -->
    <image href="data:image/png;base64,${iconB64}" x="110" y="110" width="150" height="150"/>
    <text x="290" y="170" fill="#F4FBF1" font-family="'Syne', Arial, sans-serif" font-size="46" font-weight="800">rebuske</text>
    <text x="290" y="215" fill="#B8FF3B" font-family="'Syne', Arial, sans-serif" font-size="22" font-weight="700">COMUNIDAD DE SERVICIOS DEL HOGAR EN MEDELLÍN</text>

    <!-- Value Bullets -->
    <text x="110" y="310" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="20">
      ✅ <tspan font-weight="bold" fill="#B8FF3B">Bóveda Wompi:</tspan> El dinero no se entrega al técnico hasta que revises el trabajo.
    </text>
    <text x="110" y="355" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="20">
      ✅ <tspan font-weight="bold" fill="#B8FF3B">Garantía Escrita 48h:</tspan> Si vuelve a fallar, te respondemos sin discusiones.
    </text>
    <text x="110" y="400" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="20">
      ✅ <tspan font-weight="bold" fill="#B8FF3B">Técnicos de Confianza:</tspan> Plomería, electricidad, cerrajería y aseo en tu comuna.
    </text>

    <!-- Footer Bar -->
    <rect x="110" y="450" width="580" height="64" rx="32" fill="#B8FF3B"/>
    <text x="400" y="491" fill="#0C120A" font-family="'Syne', Arial, sans-serif" font-size="20" font-weight="800" text-anchor="middle">REGÍSTRATE: rebuske.vercel.app/registro</text>

    <text x="730" y="490" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="18">
      💬 Dudas con Laura: <tspan fill="#B8FF3B" font-weight="bold">+57 304 381 2882</tspan>
    </text>
  </svg>`;

  await sharp(Buffer.from(fbSvg)).png().toFile(path.join(outDir, 'banner_facebook.png'));
  console.log('✅ Banner Facebook (1200x630) generado.');

  // 4. LINKEDIN BANNER (1200x627)
  const inSvg = `
  <svg width="1200" height="627" viewBox="0 0 1200 627" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glowIN" cx="80%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#4E8839" stop-opacity="0.35"/>
        <stop offset="70%" stop-color="#0C120A" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="cardIN" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#142111" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#0A1008" stop-opacity="0.95"/>
      </linearGradient>
    </defs>

    <rect width="1200" height="627" fill="#0C120A"/>
    <rect width="1200" height="627" fill="url(#glowIN)"/>

    <rect x="60" y="50" width="1080" height="527" rx="24" fill="url(#cardIN)" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>

    <!-- Header tag -->
    <rect x="100" y="90" width="380" height="40" rx="20" fill="rgba(184,255,59,0.12)" stroke="#B8FF3B" stroke-width="1.5"/>
    <text x="290" y="117" fill="#B8FF3B" font-family="'Syne', Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="2" text-anchor="middle">FINTECH &amp; FORMALIZACIÓN · COLOMBIA</text>

    <!-- Brand icon -->
    <image href="data:image/png;base64,${iconB64}" x="100" y="150" width="120" height="120"/>
    <text x="250" y="200" fill="#F4FBF1" font-family="'Syne', Arial, sans-serif" font-size="44" font-weight="800">rebuske</text>
    <text x="250" y="240" fill="#AFFF3E" font-family="'Syne', Arial, sans-serif" font-size="20" font-weight="600">INFRAESTRUCTURA DE CONFIANZA PARA SERVICIOS TÉCNICOS LOCALES</text>

    <!-- Body Description -->
    <text x="100" y="320" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="20" font-weight="400">
      Transformamos la economía informal de Medellín con Bóveda Wompi (Escrow), garantizando que el dinero
    </text>
    <text x="100" y="355" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="20" font-weight="400">
      del cliente quede protegido y que el técnico reciba su pago asegurado tras la satisfacción del servicio.
    </text>
    <text x="100" y="390" fill="#B8FF3B" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
      Pilar de Equidad: "Servicios por Ellas" impulsa a mujeres electricistas, plomeras y técnicas certificadas.
    </text>

    <!-- Footer Box -->
    <g transform="translate(100, 440)">
      <rect x="0" y="0" width="520" height="60" rx="30" fill="#B8FF3B"/>
      <text x="260" y="38" fill="#0C120A" font-family="'Syne', Arial, sans-serif" font-size="19" font-weight="800" text-anchor="middle">CONOCE LA PLATAFORMA: rebuske.vercel.app</text>

      <text x="560" y="37" fill="#F4FBF1" font-family="Arial, sans-serif" font-size="18">
        💼 Contacto y Alianzas: <tspan fill="#B8FF3B" font-weight="bold">Laura (+57 304 381 2882)</tspan>
      </text>
    </g>
  </svg>`;

  await sharp(Buffer.from(inSvg)).png().toFile(path.join(outDir, 'banner_linkedin.png'));
  console.log('✅ Banner LinkedIn (1200x627) generado.');

  console.log('🎉 Todos los banners publicitarios fueron creados con éxito en /social_campaign/');
}

createBanners().catch(console.error);
