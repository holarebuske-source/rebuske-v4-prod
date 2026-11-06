import fs from 'fs';
import path from 'path';

const prodDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const registroPath = path.join(prodDir, 'registro.html');

let html = fs.readFileSync(registroPath, 'utf8');

// 1. Inject Cinematic Styles before </head>
const cinematicStyles = `
  <!-- ======================================================== -->
  <!-- REBUSKE CINEMATIC EXPERIENCE SYSTEM (2026 OFFICIAL)      -->
  <!-- ======================================================== -->
  <style id="cinematic-experience-system">
    /* 01. Lienzo Cinemático Base */
    :root {
      --cinematic-ebano: #070B06;
      --cinematic-card-bg: rgba(14, 23, 12, 0.88);
      --cinematic-card-border: rgba(184, 255, 59, 0.22);
      --cinematic-glow-lime: rgba(184, 255, 59, 0.35);
      --cinematic-glow-gold: rgba(245, 158, 11, 0.35);
      --cinematic-blur: 24px;
    }

    /* 02. Canvas de Luciérnagas y Resplandor Ambiental */
    #cinematic-ambient-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    /* 03. Viñeta y Reflector Cinemático */
    .cinematic-spotlight {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 1;
      background: 
        radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 25%), rgba(184, 255, 59, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 50% 100%, rgba(30, 56, 22, 0.25) 0%, transparent 70%);
      mix-blend-mode: screen;
      transition: background 0.3s ease;
    }

    .cinematic-grain-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2;
      opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* 04. Tarjetas Cinemáticas Monolíticas */
    .cinematic-card {
      background: var(--cinematic-card-bg) !important;
      backdrop-filter: blur(var(--cinematic-blur)) !important;
      -webkit-backdrop-filter: blur(var(--cinematic-blur)) !important;
      border: 1px solid var(--cinematic-card-border) !important;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15) !important;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
      position: relative;
      overflow: hidden;
    }
    .cinematic-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(184, 255, 59, 0.1) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
    }
    .cinematic-card:hover::before {
      opacity: 1;
    }
    .cinematic-card:hover {
      transform: translateY(-6px) scale(1.01) !important;
      border-color: rgba(184, 255, 59, 0.5) !important;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(184, 255, 59, 0.25) !important;
    }
    .cinematic-card.active {
      border-color: var(--brand-lima) !important;
      box-shadow: 0 0 35px rgba(184, 255, 59, 0.35), inset 0 0 20px rgba(184, 255, 59, 0.1) !important;
    }

    /* 05. Botón y Controles Cinemáticos */
    .cinematic-btn {
      position: relative;
      background: linear-gradient(135deg, #B8FF3B 0%, #AFFF3E 100%) !important;
      color: #070B06 !important;
      font-weight: 800 !important;
      box-shadow: 0 8px 25px rgba(184, 255, 59, 0.35) !important;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .cinematic-btn:hover {
      transform: translateY(-2px) scale(1.02) !important;
      box-shadow: 0 12px 35px rgba(184, 255, 59, 0.5) !important;
    }

    /* 06. Badge de Estado Bioluminiscente */
    .cinematic-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 9999px;
      background: rgba(22, 36, 19, 0.85);
      border: 1px solid rgba(184, 255, 59, 0.35);
      color: #B8FF3B;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      box-shadow: 0 0 20px rgba(184, 255, 59, 0.2);
    }
    .cinematic-badge-pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #B8FF3B;
      box-shadow: 0 0 10px #B8FF3B;
      animation: pulseBiolum 2s infinite ease-in-out;
    }
    @keyframes pulseBiolum {
      0%, 100% { transform: scale(1); opacity: 0.9; }
      50% { transform: scale(1.4); opacity: 0.4; }
    }

    /* 07. Inputs Cinemáticos Obsidian */
    .cinematic-input {
      background: rgba(8, 14, 6, 0.9) !important;
      border: 1px solid rgba(36, 59, 30, 0.9) !important;
      color: #F4FBF1 !important;
      border-radius: 14px !important;
      transition: all 0.25s ease !important;
    }
    .cinematic-input:focus {
      outline: none !important;
      border-color: #B8FF3B !important;
      box-shadow: 0 0 20px rgba(184, 255, 59, 0.25) !important;
    }

    /* 08. Aura Flotante Laura WhatsApp */
    .laura-float-aura {
      animation: lauraAuraPulse 3s infinite ease-in-out;
    }
    @keyframes lauraAuraPulse {
      0%, 100% { box-shadow: 0 0 15px rgba(37, 211, 102, 0.25); }
      50% { box-shadow: 0 0 28px rgba(37, 211, 102, 0.55); }
    }
  </style>
`;

if (!html.includes('cinematic-experience-system')) {
  html = html.replace('</head>', `${cinematicStyles}\n</head>`);
}

// 2. Inject Canvas & Vignette right after <body>
const canvasAndVignette = `
  <!-- ======================================================== -->
  <!-- ATMÓSFERA CINEMATOGRÁFICA INTERACTIVA                    -->
  <!-- ======================================================== -->
  <canvas id="cinematic-ambient-canvas" aria-hidden="true"></canvas>
  <div class="cinematic-spotlight" id="cinematic-spotlight" aria-hidden="true"></div>
  <div class="cinematic-grain-overlay" aria-hidden="true"></div>
`;

if (!html.includes('cinematic-ambient-canvas')) {
  html = html.replace(/<body[^>]*>/, match => `${match}\n${canvasAndVignette}`);
}

// 3. Inject Canvas Simulation Script before </body>
const canvasScript = `
  <!-- ======================================================== -->
  <!-- SCRIPT CINEMATOGRÁFICO: LUCIÉRNAGAS VIVAS & SPOTLIGHT    -->
  <!-- ======================================================== -->
  <script>
    (function initCinematicAtmosphere() {
      const canvas = document.getElementById('cinematic-ambient-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      // Partículas Bioluminiscentes (Luciérnagas)
      const fireflies = [];
      const count = Math.min(Math.floor((width * height) / 22000), 55);

      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 0.8,
          baseAlpha: Math.random() * 0.5 + 0.3,
          alpha: 0.3,
          speedX: (Math.random() - 0.5) * 0.45,
          speedY: (Math.random() - 0.5) * 0.45,
          pulseSpeed: Math.random() * 0.025 + 0.015,
          pulseOffset: Math.random() * Math.PI * 2,
          color: Math.random() > 0.3 ? '#B8FF3B' : '#AFFF3E'
        });
      }

      let time = 0;
      function animate() {
        ctx.clearRect(0, 0, width, height);
        time += 0.02;

        for (let i = 0; i < fireflies.length; i++) {
          const f = fireflies[i];
          f.x += f.speedX + Math.sin(time + f.pulseOffset) * 0.25;
          f.y += f.speedY + Math.cos(time + f.pulseOffset) * 0.25;

          if (f.x < -20) f.x = width + 20;
          if (f.x > width + 20) f.x = -20;
          if (f.y < -20) f.y = height + 20;
          if (f.y > height + 20) f.y = -20;

          const currentAlpha = f.baseAlpha + Math.sin(time * f.pulseSpeed * 60 + f.pulseOffset) * 0.28;
          const clampedAlpha = Math.max(0.1, Math.min(0.95, currentAlpha));

          // Resplandor difuso exterior
          const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 7);
          gradient.addColorStop(0, f.color);
          gradient.addColorStop(0.3, 'rgba(184, 255, 59, 0.4)');
          gradient.addColorStop(1, 'rgba(12, 18, 10, 0)');

          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius * 7, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.globalAlpha = clampedAlpha * 0.7;
          ctx.fill();

          // Núcleo incandescente de la luciérnaga
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = clampedAlpha;
          ctx.fill();
        }

        requestAnimationFrame(animate);
      }
      animate();

      // Spotlight dinámico que sigue el cursor / touch
      const spotlight = document.getElementById('cinematic-spotlight');
      window.addEventListener('mousemove', (e) => {
        if (!spotlight) return;
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        spotlight.style.setProperty('--spotlight-x', x + '%');
        spotlight.style.setProperty('--spotlight-y', y + '%');
      });
    })();
  </script>
`;

if (!html.includes('initCinematicAtmosphere')) {
  html = html.replace('</body>', `${canvasScript}\n</body>`);
}

fs.writeFileSync(registroPath, html, 'utf8');
console.log('✅ Sistema cinemático inyectado exitosamente en registro.html!');
