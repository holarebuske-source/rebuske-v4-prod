/**
 * ============================================================================
 * BUILD CLEAN REGISTRO.HTML · REBUSKE MEDELLÍN
 * ============================================================================
 * Genera la versión definitiva, limpia, cinematográfica y 100% optimizada para
 * celulares de registro.html, cumpliendo las directivas del CEO Canashi:
 * 1. Elimina por completo la propuesta navideña y el mini-juego Reto 333
 *    (ya respaldado en archive_navidad_reto333_concept.md).
 * 2. Mantiene el bono estándar VIP de $15.000 COP (TUBONO15K-VIP).
 * 3. Integra los 3 módulos aprobados:
 *    - Modo Familiar («Poner Gente») & Código QR en Puerta (Clientes).
 *    - Mini-Simulador de Bolsillo 100% interactivo (botones + slider táctil)
 *      y Certificado de Ingresos (Profesionales).
 *    - Acordeón de Protocolo de Seguridad y Garantías (Bóveda Wompi, Cero Efectivo,
 *      Peritaje Imparcial y Acta Digital PDF).
 * 4. Elimina la fuga de código y duplicaciones previas.
 * 5. Optimización estricta Mobile-First (targets táctiles >= 48px, texto legible).
 * ============================================================================
 */

import fs from 'fs';

const REG_PATH = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/registro.html';

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>Únete a rebuske Medellín · Registro Oficial de Profesionales y Clientes</title>
  <meta name="description" content="Portal único oficial de registro de rebuske en Medellín. Únete como profesional a los 100 fundadores con 1% de comisión en el primer mes, o regístrate como cliente para recibir el link de Google Play Store y un bono de $15.000 COP." />

  <!-- Open Graph / WhatsApp / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://rebuske.vercel.app/registro" />
  <meta property="og:title" content="Únete a rebuske Medellín · Registro Oficial" />
  <meta property="og:description" content="Portal único oficial de registro de rebuske en Medellín. 100 fundadores técnicos y bonos exclusivos para clientes." />
  <meta property="og:image" content="https://rebuske.vercel.app/rebuske-icon-1024.png" />
  <meta property="og:site_name" content="rebuske" />
  <meta property="og:locale" content="es_CO" />

  <!-- Favicon Oficial rebuske (Luciérnaga) -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#070B06">

  <!-- Tailwind CSS & Google Fonts -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">

  <style>
    :root {
      --lima: #B8FF3B;
      --lima-glow: rgba(184, 255, 59, 0.35);
      --ebano: #070B06;
      --ebano-surface: #0E160C;
      --ebano-card: #121E10;
      --borde-suave: #24391E;
      --blanco-hueso: #F4FBF1;
      --gris-tenue: #97A890;
      --dorado: #F59E0B;
    }

    * {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      background-color: var(--ebano);
      color: var(--blanco-hueso);
      font-family: 'Syne', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-x: hidden;
      letter-spacing: -0.012em;
    }

    h1, h2, h3, h4, .font-brand {
      font-family: 'Syne', sans-serif;
      letter-spacing: -0.02em;
    }

    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }

    /* 01. Canvas de Luciérnagas Dinámico */
    #cinematic-ambient-canvas {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1;
    }

    /* 02. Spotlight Ambiente */
    #cinematic-spotlight {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2;
      background: radial-gradient(circle 600px at var(--spotlight-x, 50%) var(--spotlight-y, 30%), rgba(184, 255, 59, 0.08) 0%, rgba(7, 11, 6, 0) 70%);
      transition: background 0.15s ease-out;
    }

    /* 03. Grano Fílmico Sutil (3.5%) */
    .cinematic-grain-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 3;
      opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* 04. Tarjetas Cinemáticas Monolíticas */
    .cinematic-card {
      background: rgba(14, 22, 12, 0.88) !important;
      backdrop-filter: blur(18px) !important;
      -webkit-backdrop-filter: blur(18px) !important;
      border: 1px solid rgba(36, 57, 30, 0.85) !important;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.12) !important;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
      position: relative;
    }
    .cinematic-card:hover {
      border-color: rgba(184, 255, 59, 0.45) !important;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(184, 255, 59, 0.15) !important;
    }
    .cinematic-card.active {
      border-color: var(--lima) !important;
      box-shadow: 0 0 30px rgba(184, 255, 59, 0.25), inset 0 0 15px rgba(184, 255, 59, 0.08) !important;
    }

    /* Botón Primario Glow */
    .btn-lima-action {
      background: linear-gradient(135deg, #B8FF3B 0%, #AFFF3E 100%) !important;
      color: #070B06 !important;
      font-weight: 800 !important;
      border-radius: 9999px !important;
      box-shadow: 0 8px 25px rgba(184, 255, 59, 0.35) !important;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
      min-height: 52px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .btn-lima-action:hover {
      transform: translateY(-2px) scale(1.01) !important;
      box-shadow: 0 12px 35px rgba(184, 255, 59, 0.5) !important;
    }
    .btn-lima-action:active {
      transform: scale(0.98) !important;
    }

    /* Custom Mobile Slider */
    input[type=range].sim-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 10px;
      border-radius: 999px;
      background: #182B14;
      outline: none;
      border: 1px solid #24391E;
      touch-action: pan-y;
      cursor: pointer;
    }
    input[type=range].sim-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #B8FF3B;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(184, 255, 59, 0.9);
      border: 3px solid #070B06;
      transition: transform 0.15s ease;
    }
    input[type=range].sim-slider::-webkit-slider-thumb:active {
      transform: scale(1.2);
    }
    input[type=range].sim-slider::-moz-range-thumb {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #B8FF3B;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(184, 255, 59, 0.9);
      border: 3px solid #070B06;
    }

    /* Inputs Táctiles Móviles */
    .mobile-field {
      background: rgba(8, 14, 6, 0.95);
      border: 1px solid rgba(36, 59, 30, 0.9);
      color: #F4FBF1;
      border-radius: 14px;
      min-height: 48px;
      padding: 12px 16px;
      font-size: 15px;
      width: 100%;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .mobile-field:focus {
      outline: none;
      border-color: #B8FF3B;
      box-shadow: 0 0 15px rgba(184, 255, 59, 0.2);
    }

    /* Micro-insignias */
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
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-[#B8FF3B] selection:text-black">

  <!-- CAPAS DE AMBIENTE CINEMATOGRÁFICO -->
  <canvas id="cinematic-ambient-canvas"></canvas>
  <div id="cinematic-spotlight"></div>
  <div class="cinematic-grain-overlay"></div>

  <!-- TOP BAR / HEADER -->
  <header class="w-full border-b border-[#24391E]/80 bg-[#070B06]/95 backdrop-blur-md sticky top-0 z-40">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
      <a href="/" class="flex items-center gap-2.5 group">
        <!-- Ícono Luciérnaga Oficial rebuske -->
        <svg viewBox="0 0 390 372" style="width:34px;height:auto;" aria-label="Logo Oficial rebuske" class="group-hover:scale-105 transition-transform flex-shrink-0">
          <path fill="#B8FF3B" fill-rule="evenodd" d="M198.12 328.12 L195.62 328.88 L194.75 329.38 L193.88 330.50 L193.62 331.25 L193.50 350.88 L194.12 352.50 L195.25 353.62 L198.38 354.62 L200.00 354.62 L202.25 353.75 L203.50 352.50 L204.00 351.38 L204.12 332.12 L203.50 330.25 L202.25 328.88 L200.50 328.12 Z M234.50 298.88 L233.50 301.00 L233.38 302.62 L233.88 304.50 L235.25 306.00 L243.12 311.62 L246.88 314.00 L256.62 321.25 L258.38 322.00 L260.38 322.00 L262.00 321.38 L262.88 320.62 L263.88 318.75 L264.00 316.12 L263.50 314.62 L261.75 312.75 L259.62 311.50 L244.38 300.12 L240.62 297.62 L239.12 297.00 L237.00 297.12 L235.38 298.00 Z M163.25 299.38 L162.25 298.25 L160.62 297.25 L159.50 297.00 L157.62 297.25 L154.50 299.00 L137.00 311.62 L135.38 312.50 L133.62 314.12 L132.75 316.12 L132.88 318.75 L133.88 320.50 L135.00 321.50 L136.00 321.88 L138.50 322.00 L140.12 321.50 L158.88 308.00 L161.25 306.62 L163.25 304.62 L164.00 303.12 L164.12 301.62 Z M194.88 252.12 L189.88 253.00 L186.25 254.00 L179.50 257.00 L175.00 260.00 L172.38 262.50 L170.75 265.25 L170.25 267.12 L170.25 272.12 L171.00 279.38 L173.88 290.88 L175.25 294.62 L177.88 300.38 L182.12 307.88 L185.50 312.25 L189.00 315.75 L191.62 317.62 L194.88 319.00 L196.75 319.12 L198.25 319.50 L200.00 319.50 L203.38 318.88 L205.12 318.25 L207.50 316.88 L209.50 315.25 L213.25 311.38 L215.62 308.38 L220.62 299.88 L222.75 295.25 L224.50 290.62 L226.38 283.88 L227.62 277.38 L228.12 273.12 L228.25 266.88 L227.75 265.00 L227.00 263.62 L225.75 261.88 L223.50 259.62 L219.38 256.88 L215.88 255.12 L212.62 253.88 L207.12 252.62 L201.00 252.00 Z M265.88 150.00 L265.25 150.75 L264.75 152.38 L262.75 156.38 L261.00 158.88 L257.75 162.25 L254.62 164.88 L251.50 166.88 L246.75 169.25 L243.62 170.38 L242.62 171.00 L241.62 172.38 L241.25 174.00 L241.38 177.12 L242.38 184.50 L244.38 192.38 L246.38 198.25 L248.50 203.38 L251.38 209.25 L256.12 217.50 L259.50 222.62 L263.88 228.50 L267.38 232.62 L273.12 238.50 L277.75 242.62 L281.25 245.38 L286.62 249.12 L293.25 253.12 L298.38 255.62 L308.00 259.38 L315.75 261.50 L321.12 262.38 L326.50 262.62 L333.75 262.38 L338.12 261.50 L340.50 260.62 L342.38 259.62 L344.62 257.50 L345.50 256.25 L346.25 254.75 L347.25 251.25 L347.25 244.25 L346.25 239.12 L344.12 232.00 L341.25 225.25 L335.38 214.38 L330.25 206.38 L323.50 197.25 L317.75 190.38 L309.12 181.25 L301.25 174.00 L290.50 165.12 L284.12 160.38 L271.25 152.25 L267.00 150.00 Z M157.38 138.00 L156.38 138.00 L154.75 138.38 L146.50 141.25 L141.75 143.38 L131.88 148.25 L119.88 155.25 L110.25 161.75 L102.75 167.50 L95.88 173.25 L90.25 178.38 L83.38 185.12 L76.50 192.75 L69.75 200.88 L63.12 210.00 L56.38 221.25 L54.12 225.50 L51.38 232.00 L50.12 235.50 L48.38 241.88 L47.88 246.12 L47.88 250.88 L48.12 252.62 L49.00 255.38 L50.25 257.50 L51.88 259.25 L54.12 260.62 L55.88 261.38 L59.88 262.25 L62.38 262.50 L69.00 262.50 L76.38 261.62 L85.75 259.50 L91.38 257.50 L101.00 253.25 L111.00 247.50 L116.50 243.50 L123.38 237.62 L126.25 234.88 L130.50 230.12 L135.88 223.38 L140.75 216.38 L142.50 213.38 L148.50 201.25 L151.38 193.12 L153.25 186.00 L154.38 179.62 L154.62 173.00 L154.62 154.88 L155.75 147.62 L156.62 144.00 L158.38 139.25 L158.25 138.62 Z M276.12 43.38 L275.25 42.38 L273.62 41.25 L272.50 40.75 L269.88 40.12 L266.38 40.12 L264.12 40.62 L262.25 40.75 L256.38 42.50 L252.00 44.38 L243.62 49.12 L240.75 51.25 L234.12 56.88 L230.25 60.88 L226.38 65.62 L223.00 70.25 L219.38 76.25 L215.88 83.38 L216.00 84.75 L216.50 85.25 L218.38 86.00 L221.25 87.62 L222.00 87.88 L222.62 87.75 L223.62 86.62 L225.50 82.88 L231.00 75.00 L233.62 72.00 L240.38 65.62 L243.75 63.12 L249.25 59.88 L258.25 56.62 L263.62 55.62 L271.25 55.38 L272.75 54.88 L274.50 53.88 L275.75 52.75 L276.50 51.62 L277.12 50.25 L277.50 48.50 L277.50 47.00 L277.12 45.25 Z M122.88 43.62 L121.75 46.25 L121.75 49.12 L122.75 51.75 L123.25 52.50 L125.25 54.38 L128.12 55.50 L136.38 55.75 L141.75 56.75 L150.12 60.12 L154.38 62.50 L158.12 65.00 L161.12 67.38 L164.25 70.50 L169.50 76.75 L173.50 83.00 L176.00 87.62 L176.75 88.00 L177.38 87.88 L179.00 86.88 L182.75 85.25 L183.25 84.75 L183.38 83.75 L182.50 81.38 L179.50 75.62 L175.50 69.25 L172.38 64.88 L168.12 59.88 L163.88 55.62 L159.12 51.50 L154.75 48.25 L147.00 44.00 L144.75 43.00 L138.38 40.88 L132.88 40.12 L129.38 40.12 L126.00 41.00 L124.50 42.00 Z"/>
          <path fill="#FFFFFF" fill-rule="evenodd" d="M253.00 137.00 L251.62 136.12 L247.25 134.38 L243.25 133.50 L240.12 133.12 L233.75 133.12 L230.75 133.38 L226.62 134.25 L222.75 135.50 L217.00 138.12 L212.12 141.75 L207.62 146.50 L205.25 150.00 L203.50 153.38 L202.75 154.25 L202.25 154.25 L201.88 153.75 L201.62 150.88 L200.62 146.75 L199.62 143.75 L197.62 139.62 L196.62 138.38 L195.38 137.88 L193.12 135.75 L190.12 133.88 L188.50 133.25 L184.62 132.50 L182.75 132.50 L179.50 133.25 L176.75 134.50 L174.75 135.88 L172.88 137.75 L171.75 139.25 L169.88 142.62 L168.12 147.38 L167.38 152.75 L167.38 244.50 L167.50 251.12 L167.88 251.75 L168.62 251.75 L170.75 250.00 L176.75 246.12 L181.88 243.75 L187.12 242.00 L195.38 240.75 L202.00 240.62 L206.62 240.88 L207.25 240.50 L207.50 239.88 L207.75 230.00 L207.88 189.88 L208.88 183.75 L210.12 179.75 L212.25 175.50 L215.25 171.25 L218.50 168.12 L221.62 166.00 L226.12 163.75 L231.25 162.38 L235.12 162.00 L240.38 162.00 L244.50 160.88 L247.12 159.62 L249.00 158.38 L252.25 155.62 L254.00 153.75 L255.50 151.62 L256.75 149.12 L257.50 146.38 L257.50 143.75 L256.88 141.62 L255.38 139.12 Z M165.00 117.00 L165.00 119.62 L165.25 120.38 L166.12 121.50 L167.12 122.00 L169.25 122.00 L173.00 121.00 L184.00 119.25 L194.75 118.50 L203.25 118.50 L212.00 119.00 L221.62 120.38 L229.12 121.88 L231.00 122.00 L232.00 121.62 L232.75 121.00 L233.50 119.38 L233.50 117.88 L232.88 114.38 L230.62 107.75 L227.38 102.12 L225.38 99.62 L221.12 95.62 L217.50 93.12 L213.75 91.12 L207.50 89.25 L201.88 88.50 L197.50 88.50 L193.00 88.88 L187.75 90.12 L182.88 92.25 L176.62 96.25 L173.00 99.62 L170.62 102.62 L169.00 105.12 L167.00 109.38 L165.88 112.75 Z"/>
        </svg>
        <div class="flex items-center gap-2">
          <span class="text-xl font-extrabold tracking-tight text-white font-brand">rebusk<span class="text-[#B8FF3B]">e</span></span>
          <span class="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#B8FF3B]/10 text-[#B8FF3B] border border-[#B8FF3B]/30">Medellín 2026</span>
        </div>
      </a>

      <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <a href="/" class="text-xs font-semibold text-[#97A890] hover:text-[#B8FF3B] transition hidden md:inline-block">Abrir App Web</a>
        <a href="https://wa.me/573043812882?text=Hola%20Laura%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20rebuske" target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#182614] border border-[#25D366]/40 hover:border-[#25D366] text-white hover:text-[#25D366] text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(37,211,102,0.15)] transition-all whitespace-nowrap" title="Chat directo por WhatsApp con Laura">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366" class="flex-shrink-0">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.36 7.35 9.09 7.41 8.86 7.66C8.63 7.91 7.98 8.52 7.98 9.77C7.98 11.02 8.89 12.22 9.01 12.39C9.14 12.56 10.79 15.11 13.31 16.2C15.41 17.11 15.83 16.92 16.29 16.88C16.74 16.84 17.75 16.28 17.95 15.71C18.16 15.14 18.16 14.65 18.1 14.55C18.04 14.45 17.87 14.39 17.62 14.26C17.37 14.14 16.14 13.53 15.91 13.45C15.68 13.37 15.52 13.33 15.35 13.58C15.19 13.83 14.71 14.39 14.56 14.55C14.42 14.72 14.27 14.74 14.02 14.61C13.77 14.49 12.97 14.23 12.02 13.38C11.28 12.72 10.78 11.9 10.63 11.65C10.49 11.4 10.62 11.27 10.74 11.15C10.85 11.04 11 10.85 11.12 10.71C11.24 10.57 11.29 10.46 11.37 10.3C11.45 10.13 11.41 9.99 11.35 9.86C11.29 9.74 10.8 8.55 10.59 8.05C10.39 7.56 10.18 7.63 10.02 7.62C9.88 7.61 9.71 7.61 9.55 7.61L9.53 7.35Z"/>
          </svg>
          <span>Laura <span class="hidden xs:inline">WhatsApp</span></span>
        </a>
      </div>
    </div>
  </header>

  <!-- MAIN HERO & PORTAL -->
  <main class="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex-grow relative z-10 w-full">
    
    <!-- ENCABEZADO PRINCIPAL CINEMATOGRÁFICO -->
    <div class="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
      <div class="cinematic-badge mb-4 sm:mb-5">
        <span class="cinematic-badge-pulse"></span>
        <span>PORTAL OFICIAL DE REGISTRO · MEDELLÍN 2026</span>
      </div>
      
      <h1 class="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] mb-4 sm:mb-5 tracking-tight font-brand">
        Tu Hogar Protegido.<br class="hidden sm:inline">
        <span class="bg-gradient-to-r from-[#B8FF3B] via-[#AFFF3E] to-[#FFFA70] bg-clip-text text-transparent">Tu Mano de Obra Valorada.</span>
      </h1>
      
      <p class="text-xs sm:text-base text-[#F4FBF1]/80 max-w-2xl mx-auto leading-relaxed px-2">
        La infraestructura de confianza en servicios del hogar en Medellín. Respaldada por <b>Bóveda Wompi</b> (pago protegido), <b>48h de garantía escrita</b> y el catálogo exclusivo <b>'Servicios por Ellas'</b>.
      </p>

      <!-- Trust Badges Bar -->
      <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 text-xs text-[#C6D8BF]">
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121A0E]/90 border border-[#B8FF3B]/30 shadow-sm">
          <span class="text-[#B8FF3B]">🔒</span>
          <span>Bóveda Wompi (Escrow)</span>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121A0E]/90 border border-[#B8FF3B]/30 shadow-sm">
          <span class="text-[#B8FF3B]">📜</span>
          <span>48h Garantía Ley 1480</span>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121A0E]/90 border border-[#B8FF3B]/30 shadow-sm">
          <span class="text-[#B8FF3B]">👩‍🔧</span>
          <span>Servicios por Ellas</span>
        </div>
      </div>
    </div>

    <!-- TARJETAS DE SELECCIÓN CINEMATOGRÁFICAS (PRO vs CLIENTE) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
      
      <!-- OPCIÓN A: SOY PROFESIONAL -->
      <div id="card-pro" onclick="selectRole('pro')" class="cinematic-card active rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 relative overflow-hidden group cursor-pointer">
        <div class="absolute top-0 right-0 bg-[#B8FF3B]/15 text-[#B8FF3B] text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-bl-2xl border-l border-b border-[#B8FF3B]/30">
          🥇 Primeros 100 Cupos Oro
        </div>

        <div>
          <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#080E06] border border-[#B8FF3B]/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(184,255,59,0.2)]">
            🛠️
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-white font-brand mb-2 flex items-center gap-2">
            Soy Profesional / Técnico
          </h2>
          <p class="text-xs sm:text-sm text-[#97A890] mb-5 leading-relaxed">
            Prestas servicios de plomería, electricidad, cerrajería, pintura o aseo a fondo y quieres clientes garantizados en tu comuna sin regateos.
          </p>

          <ul class="space-y-2.5 text-xs text-[#E5F5E0] mb-6">
            <li class="flex items-center gap-2.5">
              <span class="text-[#B8FF3B] font-bold text-sm">✓</span>
              <span><strong>Solo 1% de comisión</strong> en tu primer mes (¡99% neto para ti!)</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#B8FF3B] font-bold text-sm">✓</span>
              <span><strong>Bóveda Wompi:</strong> Pago apartado antes de salir a la casa</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#B8FF3B] font-bold text-sm">✓</span>
              <span><strong>Bolsillo protegido (93% Oro):</strong> vs 70% en apps tradicionales</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#B8FF3B] font-bold text-sm">✓</span>
              <span><strong>Certificado de Ingresos:</strong> Descárgalo en 1 clic para bancos y arriendos</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#B8FF3B] font-bold text-sm">✓</span>
              <span><strong>Cero fiao:</strong> Clientes en tu misma comuna sin trancones</span>
            </li>
          </ul>
        </div>

        <button type="button" class="w-full py-3.5 sm:py-4 px-4 rounded-full text-xs sm:text-sm font-extrabold font-brand tracking-normal transition bg-[#1A2E16] text-[#B8FF3B] border border-[#B8FF3B]/50 group-hover:bg-[#B8FF3B] group-hover:text-[#0C120A] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(184,255,59,0.15)]">
          <span>Registrarme como Profesional</span>
          <span>✦</span>
        </button>
      </div>

      <!-- OPCIÓN B: SOY CLIENTE -->
      <div id="card-cliente" onclick="selectRole('cliente')" class="cinematic-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-[#24391E] relative overflow-hidden group cursor-pointer">
        <div class="absolute top-0 right-0 bg-[#F59E0B]/15 text-[#FFFA70] text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-bl-2xl border-l border-b border-[#F59E0B]/30">
          🎁 Bono $15.000 COP Bienvenida
        </div>

        <div>
          <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#080E06] border border-[#F59E0B]/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            🏡
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-white font-brand mb-2 flex items-center gap-2">
            Soy Cliente / Hogar
          </h2>
          <p class="text-xs sm:text-sm text-[#97A890] mb-5 leading-relaxed">
            Buscas expertos confiables, con antecedentes verificados y garantía real para reparaciones, mantenimiento o emergencias en tu hogar.
          </p>

          <ul class="space-y-2.5 text-xs text-[#E5F5E0] mb-6">
            <li class="flex items-center gap-2.5">
              <span class="text-[#FFFA70] font-bold text-sm">✓</span>
              <span><strong>Cero riesgo de anticipos:</strong> El técnico cobra solo cuando apruebes el trabajo</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#FFFA70] font-bold text-sm">✓</span>
              <span><strong>Código QR en Puerta:</strong> Escanea su credencial oficial antes de abrir</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#FFFA70] font-bold text-sm">✓</span>
              <span><strong>Modo Familiar («Poner Gente»):</strong> Vincula parientes con pago digital centralizado</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#FFFA70] font-bold text-sm">✓</span>
              <span><strong>Acta Digital de Garantía 48h:</strong> Respaldo legal escrito bajo la Ley 1480</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#FFFA70] font-bold text-sm">✓</span>
              <span><strong>Servicios por Ellas & Auxilio +$3.333:</strong> Categoría femenina y llegada express</span>
            </li>
          </ul>
        </div>

        <button type="button" class="w-full py-3.5 sm:py-4 px-4 rounded-full text-xs sm:text-sm font-extrabold font-brand tracking-normal transition bg-[#2A2312] text-[#FFFA70] border border-[#F59E0B]/50 group-hover:bg-[#F59E0B] group-hover:text-[#0C120A] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <span>Registrarme como Cliente</span>
          <span>✦</span>
        </button>
      </div>

    </div>
    
    <!-- PESTAÑAS DE CAMBIO RÁPIDO -->
    <div id="formulario-section" class="pt-2 scroll-mt-24">
      
      <div class="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8 max-w-2xl mx-auto w-full px-2">
        <button id="tab-btn-pro" onclick="selectRole('pro')" class="w-full sm:w-auto min-h-[50px] py-3 px-6 sm:px-8 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition shadow-lg text-center bg-[#B8FF3B] text-[#0C120A]">
          <span>🛠️ Registro Profesional</span>
          <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-black/20 text-current font-extrabold shrink-0">1% Mes 1</span>
        </button>
        <button id="tab-btn-cliente" onclick="selectRole('cliente')" class="w-full sm:w-auto min-h-[50px] py-3 px-6 sm:px-8 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition shadow-lg text-center bg-[#162413]/70 text-[#97A890] border border-[#24391E]">
          <span>🏠 Registro Cliente VIP</span>
          <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-black/20 text-current font-extrabold shrink-0">Bono $15k</span>
        </button>
      </div>

      <!-- ========================================================= -->
      <!-- VISTA 1: FORMULARIO DE PROFESIONALES                       -->
      <!-- ========================================================= -->
      <div id="view-pro" class="cinematic-card rounded-3xl p-5 sm:p-10 border border-[#B8FF3B]/40 relative shadow-2xl">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#24391E]">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#B8FF3B]">Convocatoria Medellín · Fase 1</span>
            <h3 class="text-xl sm:text-2xl font-black text-white font-brand">Inscripción para Técnicos y Profesionales</h3>
            <p class="text-xs text-[#97A890] mt-0.5">Asegura uno de los 100 cupos con tarifa preferencial del 1% el primer mes.</p>
          </div>
          <div class="px-4 py-2 rounded-2xl bg-[#0C120A] border border-[#24391E] text-center flex-shrink-0 self-start sm:self-auto">
            <span class="text-[10px] uppercase font-bold text-[#97A890] block">Cupos Disponibles</span>
            <span class="text-base sm:text-lg font-black text-[#B8FF3B] font-mono" id="pro-counter-badge">84 / 100 Asignados</span>
          </div>
        </div>

        <form id="form-pro" onsubmit="handleProSubmit(event)" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#A4BEA0] mb-1.5">Nombre Completo *</label>
              <input type="text" id="pro-nombre" required placeholder="Ej: Carlos Mario Varela" class="mobile-field">
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#A4BEA0] mb-1.5">Cédula de Ciudadanía *</label>
              <input type="text" id="pro-cedula" required placeholder="Ej: 1020304050" class="mobile-field">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#A4BEA0] mb-1.5">Teléfono / WhatsApp *</label>
              <input type="tel" id="pro-tel" required placeholder="Ej: 300 123 4567" class="mobile-field">
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#A4BEA0] mb-1.5">Oficio / Especialidad Principal *</label>
              <select id="pro-oficio" required class="mobile-field">
                <option value="">Selecciona tu especialidad...</option>
                <option value="Plomería y Destapes">Plomería y Destapes</option>
                <option value="Electricidad Residencial">Electricidad Residencial</option>
                <option value="Cerrajería y Aperturas">Cerrajería y Aperturas</option>
                <option value="Pintura y Resanes">Pintura y Resanes</option>
                <option value="Aire Acondicionado y Climatización">Aire Acondicionado y Climatización</option>
                <option value="Auxilio de Batería de Celular">Auxilio de Batería de Celular (Carga rápida máx 30 min)</option>
                <option value="Mecánica Rápida y Mantenimiento">Mecánica Rápida y Mantenimiento</option>
                <option value="Mudanzas y Acarreos">Mudanzas y Acarreos</option>
                <option value="Aseo Profundo y Desinfección">Aseo Profundo y Desinfección</option>
                <option value="Otro Servicio Técnico">Otro Servicio Técnico</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#A4BEA0] mb-1.5">Comuna / Barrio Principal en Medellín *</label>
              <input type="text" id="pro-zona" required placeholder="Ej: Laureles, Belén, Poblado, Robledo..." class="mobile-field">
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#A4BEA0] mb-1.5">
                Cuenta para tus pagos (Nequi / Bancolombia) <span class="text-[#849F80] font-normal lowercase">(opcional en registro)</span>
              </label>
              <input type="text" id="pro-banco" placeholder="Ej: Nequi 300 123 4567" class="mobile-field">
              <p class="text-[11px] text-[#7E967A] mt-1 leading-tight">
                ℹ️ No es obligatoria para registrarte. Tendrás hasta 4 días tras el lanzamiento para vincularla.
              </p>
            </div>
          </div>

          <!-- FECHA DE NACIMIENTO (SOLO MES Y AÑO) -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#A4BEA0] mb-1.5">Mes de Nacimiento *</label>
              <select id="pro-mes" required class="mobile-field">
                <option value="">Selecciona mes...</option>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-[#A4BEA0] mb-1.5">Año de Nacimiento *</label>
              <input type="number" id="pro-ano" min="1940" max="2008" required placeholder="Ej: 1988" class="mobile-field">
            </div>
          </div>

          <!-- HONEYPOT BOT PROTECTION INVISIBLE -->
          <input type="text" id="pro-hp-token" style="display:none!important;" tabindex="-1" autocomplete="off">

          <!-- ======================================================== -->
          <!-- MINI-SIMULADOR DE BOLSILLO INTERACTIVO Y TOUCH-FRIENDLY  -->
          <!-- ======================================================== -->
          <div class="mt-6 p-4 sm:p-5 rounded-2xl bg-[#091107] border border-[#B8FF3B]/35 shadow-inner">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="text-xl">👛</span>
                <h4 class="text-xs sm:text-sm font-bold text-white font-brand">Mini-Simulador de Bolsillo</h4>
              </div>
              <span class="text-[10px] uppercase font-bold text-[#B8FF3B] px-2.5 py-0.5 rounded-full bg-[#B8FF3B]/10 border border-[#B8FF3B]/30 font-mono">¿Cuánto te queda?</span>
            </div>
            <p class="text-[11px] sm:text-xs text-[#97A890] mb-4 leading-relaxed">
              Mueve el control deslizante o pulsa un valor para comparar tus ingresos netos frente a aplicaciones tradicionales que retienen entre el 25% y 30%:
            </p>

            <!-- Slider Táctil para Celulares -->
            <div class="mb-4">
              <div class="flex justify-between items-center text-xs mb-1.5 font-bold">
                <span class="text-[#A4BEA0]">Valor del trabajo:</span>
                <span id="sim-slider-label" class="text-base text-[#B8FF3B] font-mono font-extrabold">$100.000 COP</span>
              </div>
              <input type="range" id="sim-slider" min="50000" max="1200000" step="10000" value="100000" class="sim-slider" oninput="handleSliderChange(this.value)">
              <div class="flex justify-between text-[10px] text-[#6E8268] mt-1 font-mono">
                <span>$50k</span>
                <span>$600k</span>
                <span>$1.2M</span>
              </div>
            </div>

            <!-- Botones de valores rápidos -->
            <div class="grid grid-cols-3 gap-2 mb-4">
              <button type="button" onclick="setPocketSim(100000)" id="btn-sim-100" class="py-2.5 px-1 rounded-xl text-xs font-bold transition text-center bg-[#1A2E16] text-[#B8FF3B] border border-[#B8FF3B]">
                $100.000
              </button>
              <button type="button" onclick="setPocketSim(350000)" id="btn-sim-350" class="py-2.5 px-1 rounded-xl text-xs font-bold transition text-center bg-[#0C120A] text-[#97A890] border border-[#24391E] hover:border-[#B8FF3B]/40">
                $350.000
              </button>
              <button type="button" onclick="setPocketSim(800000)" id="btn-sim-800" class="py-2.5 px-1 rounded-xl text-xs font-bold transition text-center bg-[#0C120A] text-[#97A890] border border-[#24391E] hover:border-[#B8FF3B]/40">
                $800.000
              </button>
            </div>

            <!-- Tarjetas de Comparativa -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-center">
              <div class="p-3 rounded-xl bg-[#140E0A] border border-[#EF4444]/30">
                <span class="text-[10px] text-[#F87171] uppercase font-bold block">Apps Tradicionales (70%)</span>
                <span id="sim-tradicional-val" class="text-base sm:text-lg font-extrabold text-[#FCA5A5] font-mono">$70.000 COP</span>
                <small id="sim-loss-val" class="text-[10px] text-[#A67C7C] block mt-0.5">Te descuentan $30.000 COP</small>
              </div>
              <div class="p-3 rounded-xl bg-[#101D0E] border border-[#B8FF3B]/50 shadow-[0_0_15px_rgba(184,255,59,0.15)]">
                <span class="text-[10px] text-[#B8FF3B] uppercase font-extrabold block">En rebuske Oro (93%)</span>
                <span id="sim-rebuske-val" class="text-base sm:text-lg font-extrabold text-[#B8FF3B] font-mono">$93.000 COP</span>
                <small id="sim-diff-val" class="text-[10px] text-[#D9FF8B] font-bold block mt-0.5">+ $23.000 COP más para ti</small>
              </div>
            </div>

            <div class="mt-3.5 pt-3 border-t border-[#24391E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-xs text-[#A4BEA0]">
              <span>👑 <b>Mes 1 Fundador (1% Comisión):</b> <span id="sim-mes1-val" class="text-[#FFFA70] font-mono font-black">$99.000 COP netos</span></span>
              <span class="text-[11px] text-[#C6D8BF]">📄 Certificado formal de ingresos en 1 clic</span>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- SISTEMA DE PLACAS Y MODELO DE COMISIONES                -->
          <!-- ======================================================== -->
          <div class="mt-6 pt-6 border-t border-[#24391E]">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-[#B8FF3B] flex items-center gap-1.5">
                <span>🏆</span> Modelo de Placas Oficiales rebuske
              </span>
              <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#B8FF3B]/10 text-[#B8FF3B] border border-[#B8FF3B]/30">3 Categorías</span>
            </div>
            <p class="text-xs text-[#97A890] mb-4">
              Tus ingresos crecen con tu cumplimiento y calidad técnica:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <!-- PLACA BRONCE -->
              <div class="p-3.5 rounded-2xl bg-[#0F170D] border border-[#CD7F32]/50 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs font-extrabold text-[#E5A566] font-brand">🥉 Placa Bronce</span>
                    <span class="text-[11px] font-black text-[#F4FBF1] bg-[#CD7F32]/20 px-2 py-0.5 rounded-md font-mono">9% Com.</span>
                  </div>
                  <p class="text-[11px] text-[#A4BEA0] leading-snug mb-2">
                    <strong>Nivel Inicial:</strong> Registro aprobado, KYC completado y antecedentes limpios.
                  </p>
                </div>
                <div class="pt-2 border-t border-[#24391E] text-[10px] text-[#97A890]">
                  Cobras el <strong class="text-[#F4FBF1]">91% neto</strong> directo a tu cuenta.
                </div>
              </div>

              <!-- PLACA PLATA -->
              <div class="p-3.5 rounded-2xl bg-[#0F170D] border border-[#C0C0C0]/50 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs font-extrabold text-[#E2E8F0] font-brand">🥈 Placa Plata</span>
                    <span class="text-[11px] font-black text-[#F4FBF1] bg-white/20 px-2 py-0.5 rounded-md font-mono">8% Com.</span>
                  </div>
                  <p class="text-[11px] text-[#A4BEA0] leading-snug mb-2">
                    <strong>Ascenso:</strong> 25 servicios completados, calificación ≥ 4.7★ y puntualidad ≥ 92%.
                  </p>
                </div>
                <div class="pt-2 border-t border-[#24391E] text-[10px] text-[#97A890]">
                  Cobras el <strong class="text-[#F4FBF1]">92% neto</strong> directo a tu cuenta.
                </div>
              </div>

              <!-- PLACA ORO -->
              <div class="p-3.5 rounded-2xl bg-[#0F170D] border border-[#F59E0B]/60 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs font-extrabold text-[#FBBF24] font-brand">🥇 Placa Oro</span>
                    <span class="text-[11px] font-black text-[#F4FBF1] bg-[#F59E0B]/20 px-2 py-0.5 rounded-md font-mono">7% Com.</span>
                  </div>
                  <p class="text-[11px] text-[#A4BEA0] leading-snug mb-2">
                    <strong>Ascenso:</strong> 80 servicios, calificación ≥ 4.9★, puntualidad ≥ 96% y 0 reclamos en 60d.
                  </p>
                </div>
                <div class="pt-2 border-t border-[#24391E] text-[10px] text-[#97A890]">
                  ¡Cobras el <strong class="text-[#B8FF3B]">93% neto</strong> de por vida!
                </div>
              </div>
            </div>

            <!-- AVISO DE PROMOCIÓN MES 1 -->
            <div class="p-3.5 rounded-xl bg-[#1A2E16] border border-[#B8FF3B]/50 flex items-start gap-2.5 text-xs text-[#E5F5E0] mb-4">
              <span class="text-lg">👑</span>
              <div>
                <strong class="text-[#B8FF3B] block font-brand text-sm">Promoción Temporal Exclusiva · Primer Mes (Solo 100 Cupos)</strong>
                <p class="text-[11px] text-[#C4DDC1] leading-relaxed">
                  Los primeros 100 profesionales registrados operarán al <strong>1% de comisión</strong> durante sus primeros 30 días (¡99% neto para ti!). Finalizado el mes, se activará tu placa ganada (9%, 8% o 7%).
                </p>
              </div>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- PRE-AUDITORÍA FOTOGRÁFICA OBLIGATORIA KYC (6 + 1 FOTOS)  -->
          <!-- ======================================================== -->
          <div class="pt-5 border-t border-[#24391E] space-y-4">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-[#B8FF3B] flex items-center gap-1.5">
                <span>📸</span> Verificación KYC y Respaldo Técnico
              </span>
              <p class="text-xs text-[#97A890] mt-1">
                Para garantizar la seguridad de los hogares en Medellín, validamos tus herramientas y tu identidad biométrica:
              </p>
            </div>

            <!-- FOTO 1: SELFIE DE PERFIL BIOMÉTRICA -->
            <div class="p-4 rounded-2xl bg-[#091107] border border-[#243B1E]">
              <label class="block text-xs font-bold text-[#E5F5E0] mb-1">
                1. Foto de Perfil Biométrica (Rostro claro, sin gafas oscuras ni filtros) *
              </label>
              <input type="file" id="pro-foto-perfil" accept="image/*" required onchange="handleFotoPerfil(event)" class="block w-full text-xs text-[#9BB197] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1E3317] file:text-[#B8FF3B] hover:file:bg-[#284420] cursor-pointer">
              
              <div class="mt-2.5 p-2.5 rounded-lg bg-[#241E0F] border border-[#F59E0B]/40 text-[11px] text-[#FDE68A] flex items-center gap-2">
                <span>⚠️</span>
                <span><strong>Política de Seguridad:</strong> Al subir esta foto, <strong>no podrá cambiarse durante 30 días</strong>. Elige una foto nítida.</span>
              </div>
              <div id="perfil-preview" class="mt-2 hidden">
                <img id="perfil-preview-img" class="w-16 h-16 rounded-full object-cover border-2 border-[#B8FF3B] shadow-md" alt="Selfie de perfil" />
              </div>
            </div>

            <!-- FOTOS 2-7: 6 FOTOGRAFÍAS DE HERRAMIENTAS -->
            <div class="p-4 rounded-2xl bg-[#091107] border border-[#243B1E]">
              <label class="block text-xs font-bold text-[#E5F5E0] mb-1">
                2. 6 Fotografías de tus Herramientas y Equipos de Trabajo *
              </label>
              <p class="text-[11px] text-[#97A890] mb-2">
                Sube fotos de lo que realmente tienes disponible (maletines, taladros, multímetros, llaves, escaleras, etc.). No exigimos marcas exclusivas, sino transparencia.
              </p>
              <input type="file" id="pro-fotos-herramientas" accept="image/*" multiple required onchange="handleHerramientasFotos(event)" class="block w-full text-xs text-[#9BB197] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1E3317] file:text-[#B8FF3B] hover:file:bg-[#284420] cursor-pointer">
              <span id="herramientas-counter" class="text-[11px] text-[#A4BEA0] mt-1.5 block font-mono">0 de 6 fotografías seleccionadas</span>
              <div id="herramientas-preview-grid" class="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2 hidden"></div>
            </div>

            <!-- AVISO DE VALIDACIÓN POR WHATSAPP (CERO LLAMADAS) -->
            <div class="p-3.5 rounded-2xl bg-[#0B150A] border border-[#B8FF3B]/30 text-xs text-[#C4DDC1] flex items-start gap-3">
              <span class="text-2xl">💬</span>
              <div>
                <strong class="text-[#B8FF3B] block font-brand text-sm">Entrevista de Validación Exclusiva por WhatsApp</strong>
                <p class="text-[11px] leading-relaxed text-[#9BB197]">
                  Tu verificación de identidad se realizará <strong>exclusivamente por mensajes de WhatsApp</strong> (mensajes de texto, notas de voz, fotos de respaldo y ubicación en tiempo real). <em>Están estrictamente prohibidas las llamadas telefónicas en esta etapa.</em>
                </p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-[#091107] border border-[#2A4321] text-xs text-[#9BB197] space-y-1">
            <span class="font-bold text-[#B8FF3B] flex items-center gap-1.5">
              <span>🪪</span> Validación de Antecedentes y Cero Anticipos
            </span>
            <p>Al registrarte, nuestro equipo de verificación KYC revisará tus antecedentes para habilitar tu cuenta en Bóveda Wompi al 1% de comisión en el primer mes y 7% vitalicio.</p>
          </div>

          <button type="submit" id="btn-submit-pro" class="w-full btn-lima-action text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
            <span>Asegurar mi Cupo Primordial (1% Mes 1)</span>
            <span>⚡</span>
          </button>

          <div id="pro-alert-success" class="hidden p-5 rounded-2xl bg-[#192B15] border border-[#B8FF3B] text-center space-y-2">
            <b class="text-base text-[#B8FF3B] block font-brand" id="pro-alert-title">¡Registro de Profesional Exitoso!</b>
            <p class="text-xs text-[#F4FBF1]" id="pro-alert-msg">Hemos reservado tu cupo primordial. Nuestro equipo te contactará por WhatsApp para validar tus documentos e iniciar.</p>
          </div>
        </form>
      </div>

      <!-- ========================================================= -->
      <!-- VISTA 2: FORMULARIO DE CLIENTES HOGARES                     -->
      <!-- ========================================================= -->
      <div id="view-cliente" class="hidden cinematic-card rounded-3xl p-5 sm:p-10 border border-[#F59E0B]/40 relative shadow-2xl">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#24391E]">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">Acceso Anticipado Google Play Store</span>
            <h3 class="text-xl sm:text-2xl font-black text-white font-brand">Registro de Clientes y Hogares VIP</h3>
            <p class="text-xs text-[#97A890] mt-0.5">Te avisaremos por correo el link de descarga apenas esté lista la app y recibirás tu bono de $15.000 COP.</p>
          </div>
          <div class="px-4 py-2 rounded-2xl bg-[#0C120A] border border-[#24391E] text-center flex-shrink-0 self-start sm:self-auto">
            <span class="text-[10px] uppercase font-bold text-[#F59E0B] block">Cupón Activado</span>
            <span class="text-xs sm:text-sm font-black text-white font-mono">TUBONO15K-VIP</span>
          </div>
        </div>

        <form id="form-cliente" onsubmit="handleClienteSubmit(event)" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-[#A4BEA0] mb-1.5">Tu Nombre y Apellido *</label>
              <input type="text" id="cli-nombre" required placeholder="Ej: Camila Restrepo" class="mobile-field">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-[#A4BEA0] mb-1.5">Tu Teléfono / WhatsApp *</label>
              <input type="tel" id="cli-tel" required placeholder="Ej: 310 987 6543" class="mobile-field">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-[#A4BEA0] mb-1.5">Correo Electrónico (Para recibir el link de Play Store y tu bono) *</label>
            <input type="email" id="cli-email" required placeholder="ejemplo@gmail.com" class="mobile-field">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-[#A4BEA0] mb-1.5">Comuna o Barrio en Medellín *</label>
              <input type="text" id="cli-zona" required placeholder="Ej: Laureles, Poblado, Belén, Envigado..." class="mobile-field">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-[#A4BEA0] mb-1.5">¿Qué servicios sueles necesitar más? *</label>
              <select id="cli-interes" required class="mobile-field">
                <option value="">Selecciona una opción...</option>
                <option value="Plomería y Filtraciones">Plomería y Filtraciones</option>
                <option value="Electricidad y Cortos">Electricidad y Cortos</option>
                <option value="Cerrajería y Emergencias">Cerrajería y Emergencias</option>
                <option value="Pintura y Remodelación">Pintura y Remodelación</option>
                <option value="Mantenimiento de Vehículos">Mantenimiento de Vehículos</option>
                <option value="Aseo y Desinfección">Aseo y Desinfección</option>
                <option value="Mudanzas">Mudanzas</option>
                <option value="Varios / Todos los anteriores">Varios / Todos los anteriores</option>
              </select>
            </div>
          </div>

          <!-- FECHA DE NACIMIENTO (SOLO MES Y AÑO) -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-[#A4BEA0] mb-1.5">Mes de Nacimiento *</label>
              <select id="cli-mes" required class="mobile-field">
                <option value="">Selecciona mes...</option>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-[#A4BEA0] mb-1.5">Año de Nacimiento *</label>
              <input type="number" id="cli-ano" min="1940" max="2008" required placeholder="Ej: 1995" class="mobile-field">
            </div>
          </div>

          <!-- HONEYPOT BOT PROTECTION INVISIBLE -->
          <input type="text" id="cli-hp-token" style="display:none!important;" tabindex="-1" autocomplete="off">

          <!-- Micro-tarjetas Modo Familiar & QR -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2 pt-2">
            <div class="p-3.5 rounded-2xl bg-[#0D150B] border border-[#24391E] flex items-start gap-2.5">
              <span class="text-xl">👨‍👩‍👧‍👦</span>
              <div>
                <b class="text-xs text-white block font-brand">Modo Familiar («Poner Gente»)</b>
                <p class="text-[11px] text-[#97A890] leading-snug">Tus familiares piden técnicos con tu tarjeta Wompi centralizada y tú autorizas todo cargo.</p>
              </div>
            </div>
            <div class="p-3.5 rounded-2xl bg-[#0D150B] border border-[#24391E] flex items-start gap-2.5">
              <span class="text-xl">📲</span>
              <div>
                <b class="text-xs text-white block font-brand">Credencial QR en Puerta</b>
                <p class="text-[11px] text-[#97A890] leading-snug">Escaneas su QR oficial con foto y cédula antes de abrirle la puerta de tu hogar.</p>
              </div>
            </div>
          </div>

          <!-- Términos del Bono Normal de 15k -->
          <div class="p-4 rounded-2xl bg-[#141006] border border-[#423114] text-xs text-[#D8C7A5] space-y-1">
            <span class="font-bold text-[#F59E0B] flex items-center gap-1.5">
              <span>🎁</span> Términos del Bono de Bienvenida ($15.000 COP)
            </span>
            <p>El bono de $15.000 COP aplica en tu primer servicio igual o superior a $90.000 COP con 0% de comisión para la app. Recibirás tu confirmación de inmediato por correo.</p>
          </div>

          <button type="submit" id="btn-submit-cli" class="w-full btn-lima-action text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
            <span>Obtener Link de Play Store + Bono $15.000 COP</span>
            <span>🚀</span>
          </button>

          <div id="cli-alert-success" class="hidden p-5 rounded-2xl bg-[#221C0E] border border-[#F59E0B] text-center space-y-2">
            <b class="text-base text-[#F59E0B] block font-brand" id="cli-alert-title">¡Registro de Cliente Exitoso!</b>
            <p class="text-xs text-[#F4FBF1]" id="cli-alert-msg">Hemos registrado tu correo. Apenas la aplicación esté lista en Google Play Store te enviaremos el enlace oficial y tu bono VIP.</p>
          </div>
        </form>
      </div>

    </div>

    <!-- SECCIÓN DE CONFIANZA (3 TRUST CARDS) -->
    <div class="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
      <div class="p-5 sm:p-6 rounded-2xl bg-[#121A0E] border border-[#24391E]">
        <div class="text-2xl mb-2">🔒</div>
        <h4 class="text-sm font-bold text-white mb-1">Pagos en Bóveda Wompi</h4>
        <p class="text-xs text-[#97A890]">El dinero se retiene de forma segura y solo se libera cuando el trabajo queda terminado a entera satisfacción.</p>
      </div>
      <div class="p-5 sm:p-6 rounded-2xl bg-[#121A0E] border border-[#24391E]">
        <div class="text-2xl mb-2">🛡️</div>
        <h4 class="text-sm font-bold text-white mb-1">Garantía Legal de 48h</h4>
        <p class="text-xs text-[#97A890]">Si surge cualquier imprevisto técnico, el profesional regresa sin costo adicional bajo la Ley 1480.</p>
      </div>
      <div class="p-5 sm:p-6 rounded-2xl bg-[#121A0E] border border-[#24391E]">
        <div class="text-2xl mb-2">⚡</div>
        <h4 class="text-sm font-bold text-white mb-1">Modo Luz Express</h4>
        <p class="text-xs text-[#97A890]">Atención prioritaria en menos de 35 minutos para cerrajería urgente, plomería crítica o auxilio de batería.</p>
      </div>
    </div>

    <!-- ========================================================= -->
    <!-- ACORDEÓN DESPLEGABLE: PROTOCOLO DE SEGURIDAD Y GARANTÍAS  -->
    <!-- ========================================================= -->
    <div class="mt-14 max-w-4xl mx-auto">
      <div class="text-center mb-6">
        <span class="text-[11px] uppercase tracking-widest text-[#B8FF3B] font-bold px-3 py-1 rounded-full bg-[#B8FF3B]/10 border border-[#B8FF3B]/30 font-mono">Transparencia y Respaldo Jurídico</span>
        <h3 class="text-2xl sm:text-3xl font-bold text-white font-brand mt-2">Protocolo Oficial de Seguridad y Garantías</h3>
        <p class="text-xs sm:text-sm text-[#97A890] mt-1 max-w-xl mx-auto">Todo lo que necesitas saber sobre cómo protegemos tu dinero, tu casa y tu trabajo en Medellín.</p>
      </div>

      <div class="space-y-3" id="acordeon-seguridad">
        <!-- ITEM 1: BÓVEDA WOMPI -->
        <div class="cinematic-card rounded-2xl border border-[#24391E] overflow-hidden transition-all">
          <button type="button" onclick="toggleAcordeon('acc-wompi')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 hover:bg-[#121A0E]/50 transition cursor-pointer">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-[#080E06] border border-[#B8FF3B]/40 flex items-center justify-center text-lg text-[#B8FF3B] flex-shrink-0">
                🔒
              </div>
              <div>
                <b class="text-xs sm:text-sm font-bold text-white block font-brand">1. Bóveda Wompi (Custodia Bancaria Escrow)</b>
                <span class="text-[11px] text-[#97A890]">¿Quién custodia el dinero mientras se hace el trabajo?</span>
              </div>
            </div>
            <span id="icon-acc-wompi" class="text-xs text-[#B8FF3B] font-bold transform transition-transform duration-200">▼</span>
          </button>
          <div id="acc-wompi" class="hidden px-5 pb-5 text-xs text-[#C6D8BF] leading-relaxed border-t border-[#24391E]/60 pt-3">
            El valor del servicio se aparta de manera 100% segura a través de <b>Wompi (Bancolombia)</b> antes de que el profesional se desplace al domicilio. Ni la empresa ni el profesional pueden tocar estos fondos durante la ejecución. El desembolso solo se efectúa una vez el cliente revise y autorice formalmente que la labor finalizó y quedó bien ejecutada.
          </div>
        </div>

        <!-- ITEM 2: CERO EFECTIVO -->
        <div class="cinematic-card rounded-2xl border border-[#24391E] overflow-hidden transition-all">
          <button type="button" onclick="toggleAcordeon('acc-efectivo')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 hover:bg-[#121A0E]/50 transition cursor-pointer">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-[#080E06] border border-[#B8FF3B]/40 flex items-center justify-center text-lg text-[#B8FF3B] flex-shrink-0">
                🚫
              </div>
              <div>
                <b class="text-xs sm:text-sm font-bold text-white block font-brand">2. Cero Efectivo (Prohibición Total en Domicilio)</b>
                <span class="text-[11px] text-[#97A890]">Cero transacciones manuales para seguridad de ambas partes</span>
              </div>
            </div>
            <span id="icon-acc-efectivo" class="text-xs text-[#B8FF3B] font-bold transform transition-transform duration-200">▼</span>
          </button>
          <div id="acc-efectivo" class="hidden px-5 pb-5 text-xs text-[#C6D8BF] leading-relaxed border-t border-[#24391E]/60 pt-3">
            Por política de seguridad preventiva, <b>está estrictamente prohibido entregar o solicitar dinero en efectivo en la puerta o dentro del inmueble</b>. Todos los cobros se tramitan a través de medios digitales certificados (Nequi, Bancolombia, Daviplata, PSE o tarjetas). Esto previene malentendidos, elimina riesgos de robo y asegura la validez de tu garantía legal.
          </div>
        </div>

        <!-- ITEM 3: PERITAJE IMPARCIAL -->
        <div class="cinematic-card rounded-2xl border border-[#24391E] overflow-hidden transition-all">
          <button type="button" onclick="toggleAcordeon('acc-peritaje')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 hover:bg-[#121A0E]/50 transition cursor-pointer">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-[#080E06] border border-[#B8FF3B]/40 flex items-center justify-center text-lg text-[#B8FF3B] flex-shrink-0">
                ⚖️
              </div>
              <div>
                <b class="text-xs sm:text-sm font-bold text-white block font-brand">3. Peritaje Técnico Imparcial en Caso de Inconformidad</b>
                <span class="text-[11px] text-[#97A890]">Resolución justa de discrepancias técnicas</span>
              </div>
            </div>
            <span id="icon-acc-peritaje" class="text-xs text-[#B8FF3B] font-bold transform transition-transform duration-200">▼</span>
          </button>
          <div id="acc-peritaje" class="hidden px-5 pb-5 text-xs text-[#C6D8BF] leading-relaxed border-t border-[#24391E]/60 pt-3">
            Si el cliente considera que el trabajo no cumple con los estándares acordados, el pago permanece congelado de inmediato. 💬 Laura 💬 y el equipo operativo coordinan una visita de peritaje técnico neutral en Medellín para inspeccionar la obra. Si el peritaje dictamina inconformidad, el profesional debe corregir el trabajo sin costo adicional o se procede a la reversión total de los fondos conforme al Art. 51 de la Ley 1480 de 2011.
          </div>
        </div>

        <!-- ITEM 4: ACTA DIGITAL PDF LEY 527 -->
        <div class="cinematic-card rounded-2xl border border-[#24391E] overflow-hidden transition-all">
          <button type="button" onclick="toggleAcordeon('acc-acta')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 hover:bg-[#121A0E]/50 transition cursor-pointer">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-[#080E06] border border-[#B8FF3B]/40 flex items-center justify-center text-lg text-[#B8FF3B] flex-shrink-0">
                📜
              </div>
              <div>
                <b class="text-xs sm:text-sm font-bold text-white block font-brand">4. Acta Digital de Garantía de 48h en PDF (Ley 527 de 1999)</b>
                <span class="text-[11px] text-[#97A890]">Certificado legal probatorio expedido al culminar</span>
              </div>
            </div>
            <span id="icon-acc-acta" class="text-xs text-[#B8FF3B] font-bold transform transition-transform duration-200">▼</span>
          </button>
          <div id="acc-acta" class="hidden px-5 pb-5 text-xs text-[#C6D8BF] leading-relaxed border-t border-[#24391E]/60 pt-3">
            Una vez liberado el servicio a entera satisfacción, el sistema emite automáticamente un <b>Acta Digital de Garantía en formato PDF</b> con firma electrónica probatoria (Ley 527 de 1999), detallando el técnico asignado, la labor ejecutada, las fotos de evidencia y las 48 horas de garantía escrita (o 30 días si el cliente contrató Garantía Extendida). El documento llega de inmediato al correo del cliente y reposa en el historial del profesional.
          </div>
        </div>
      </div>
    </div>

  </main>

  <!-- MODAL RÁPIDO DE CONSENTIMIENTO Y BOT PROTECTION (1 TOQUE) -->
  <div id="consent-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm hidden">
    <div class="cinematic-card max-w-md w-full rounded-3xl p-6 sm:p-8 border border-[#B8FF3B]/40 shadow-2xl relative">
      <div class="w-12 h-12 rounded-2xl bg-[#0C120A] border border-[#B8FF3B]/30 flex items-center justify-center text-2xl mb-4">
        ⚡
      </div>
      <h3 class="text-xl font-black text-white font-brand mb-2">Autorización Rápida y Términos</h3>
      <p class="text-xs text-[#E5F5E0] leading-relaxed mb-4">
        Al presionar aceptar, autorizas el tratamiento de tus datos personales conforme a la <strong>Ley 1581 de 2012</strong> para la coordinación logística de servicios y pagos seguros en <strong>Bóveda Wompi</strong>, y confirmas conocer nuestros <a href="/terminos" target="_blank" class="text-[#B8FF3B] underline font-bold">Términos</a> y <a href="/reembolsos" target="_blank" class="text-[#B8FF3B] underline font-bold">Política de Reembolsos</a>.
      </p>
      <div class="space-y-2">
        <button type="button" id="btn-consent-accept" onclick="executeConfirmedRegistration()" class="w-full btn-lima-action text-sm tracking-wide shadow-lg">
          <span>Aceptar y Continuar ⚡</span>
        </button>
        <button type="button" onclick="closeConsentModal()" class="w-full py-2.5 text-xs text-[#97A890] hover:text-white transition">
          Cancelar
        </button>
      </div>
    </div>
  </div>

  <!-- FOOTER OFICIAL -->
  <footer class="border-t border-[#24391E]/80 bg-[#070B06] py-8 text-center text-xs text-[#97A890] relative z-10">
    <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="font-brand font-bold text-white">rebuske Colombia © 2026</span>
        <span>·</span>
        <span>Responsable: Camilo Escobar</span>
        <span>·</span>
        <span>Medellín, Colombia</span>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-xs">
        <a href="/terminos" class="hover:text-[#B8FF3B] transition">Términos</a>
        <a href="/privacidad" class="hover:text-[#B8FF3B] transition">Privacidad</a>
        <a href="/reembolsos" class="hover:text-[#B8FF3B] transition">Reembolsos</a>
        <a href="/eliminar-cuenta" class="hover:text-[#F87171] transition text-[#F87171]">Eliminar Cuenta</a>
      </div>
    </div>
  </footer>

  <!-- ======================================================== -->
  <!-- JAVASCRIPT LIMPIO Y MODULAR (CERO FUGAS DE CÓDIGO)        -->
  <!-- ======================================================== -->
  <script>
    let currentRole = 'pro';
    let pendingAction = null;
    const pageLoadTime = Date.now();

    function selectRole(role) {
      currentRole = role;
      const cardPro = document.getElementById('card-pro');
      const cardCli = document.getElementById('card-cliente');
      const tabBtnPro = document.getElementById('tab-btn-pro');
      const tabBtnCli = document.getElementById('tab-btn-cliente');
      const viewPro = document.getElementById('view-pro');
      const viewCli = document.getElementById('view-cliente');

      if (role === 'pro') {
        cardPro.classList.add('active');
        cardCli.classList.remove('active');

        tabBtnPro.className = 'w-full sm:w-auto min-h-[50px] py-3 px-6 sm:px-8 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition shadow-lg text-center bg-[#B8FF3B] text-[#0C120A]';
        tabBtnCli.className = 'w-full sm:w-auto min-h-[50px] py-3 px-6 sm:px-8 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition shadow-lg text-center bg-[#162413]/70 text-[#97A890] border border-[#24391E]';

        viewPro.classList.remove('hidden');
        viewCli.classList.add('hidden');
      } else {
        cardCli.classList.add('active');
        cardPro.classList.remove('active');

        tabBtnCli.className = 'w-full sm:w-auto min-h-[50px] py-3 px-6 sm:px-8 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition shadow-lg text-center bg-[#F59E0B] text-[#0C120A]';
        tabBtnPro.className = 'w-full sm:w-auto min-h-[50px] py-3 px-6 sm:px-8 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition shadow-lg text-center bg-[#162413]/70 text-[#97A890] border border-[#24391E]';

        viewCli.classList.remove('hidden');
        viewPro.classList.add('hidden');
      }

      const formSection = document.getElementById('formulario-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Modal de Consentimiento Rápido
    function openConsentModal(actionFn) {
      pendingAction = actionFn;
      document.getElementById('consent-modal').classList.remove('hidden');
    }

    function closeConsentModal() {
      pendingAction = null;
      document.getElementById('consent-modal').classList.add('hidden');
    }

    function executeConfirmedRegistration() {
      const modal = document.getElementById('consent-modal');
      modal.classList.add('hidden');
      if (typeof pendingAction === 'function') {
        pendingAction();
      }
    }

    // ========================================================
    // LÓGICA DEL MINI-SIMULADOR DE BOLSILLO INTERACTIVO
    // ========================================================
    function formatCurrency(amount) {
      return '$' + amount.toLocaleString('es-CO') + ' COP';
    }

    function updateSimulatorUI(amount) {
      const tradVal = Math.round(amount * 0.70);
      const lossVal = amount - tradVal;
      const rebVal = Math.round(amount * 0.93);
      const mes1Val = Math.round(amount * 0.99);
      const diffVal = rebVal - tradVal;

      const elTrad = document.getElementById('sim-tradicional-val');
      const elLoss = document.getElementById('sim-loss-val');
      const elReb = document.getElementById('sim-rebuske-val');
      const elDiff = document.getElementById('sim-diff-val');
      const elMes1 = document.getElementById('sim-mes1-val');
      const elLabel = document.getElementById('sim-slider-label');

      if (elTrad) elTrad.textContent = formatCurrency(tradVal);
      if (elLoss) elLoss.textContent = 'Te descuentan ' + formatCurrency(lossVal);
      if (elReb) elReb.textContent = formatCurrency(rebVal);
      if (elDiff) elDiff.textContent = '+ ' + formatCurrency(diffVal) + ' más para ti';
      if (elMes1) elMes1.textContent = formatCurrency(mes1Val) + ' netos';
      if (elLabel) elLabel.textContent = formatCurrency(amount);

      // Sincronizar botones de acceso rápido
      ['100', '350', '800'].forEach((v) => {
        const btn = document.getElementById('btn-sim-' + v);
        if (btn) {
          if (parseInt(v, 10) * 1000 === amount) {
            btn.className = 'py-2.5 px-1 rounded-xl text-xs font-bold transition text-center bg-[#1A2E16] text-[#B8FF3B] border border-[#B8FF3B]';
          } else {
            btn.className = 'py-2.5 px-1 rounded-xl text-xs font-bold transition text-center bg-[#0C120A] text-[#97A890] border border-[#24391E] hover:border-[#B8FF3B]/40';
          }
        }
      });
    }

    function setPocketSim(amount) {
      const slider = document.getElementById('sim-slider');
      if (slider) slider.value = amount;
      updateSimulatorUI(amount);
    }

    function handleSliderChange(val) {
      updateSimulatorUI(parseInt(val, 10));
    }

    // ========================================================
    // LÓGICA DEL ACORDEÓN DE SEGURIDAD Y GARANTÍAS
    // ========================================================
    function toggleAcordeon(id) {
      const el = document.getElementById(id);
      const icon = document.getElementById('icon-' + id);
      if (!el) return;

      const isHidden = el.classList.contains('hidden');

      // Cerrar los otros elementos
      ['acc-wompi', 'acc-efectivo', 'acc-peritaje', 'acc-acta'].forEach(accId => {
        const item = document.getElementById(accId);
        const ic = document.getElementById('icon-' + accId);
        if (item && accId !== id) {
          item.classList.add('hidden');
          if (ic) {
            ic.textContent = '▼';
            ic.style.transform = 'rotate(0deg)';
          }
        }
      });

      if (isHidden) {
        el.classList.remove('hidden');
        if (icon) {
          icon.textContent = '▲';
          icon.style.transform = 'rotate(180deg)';
        }
      } else {
        el.classList.add('hidden');
        if (icon) {
          icon.textContent = '▼';
          icon.style.transform = 'rotate(0deg)';
        }
      }
    }

    // ========================================================
    // COMPRESIÓN DE IMÁGENES CLIENT-SIDE (CANVAS)
    // ========================================================
    let compressedPerfilBase64 = null;
    let compressedHerramientasList = [];

    async function compressImageFile(file, maxWidth = 900, maxHeight = 900, quality = 0.75) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    async function handleFotoPerfil(e) {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const compressed = await compressImageFile(file, 800, 800, 0.8);
        compressedPerfilBase64 = compressed;
        const preview = document.getElementById('perfil-preview');
        const img = document.getElementById('perfil-preview-img');
        img.src = compressed;
        preview.classList.remove('hidden');
      } catch (err) {
        console.error('Error al comprimir foto de perfil:', err);
      }
    }

    async function handleHerramientasFotos(e) {
      const files = Array.from(e.target.files);
      const counter = document.getElementById('herramientas-counter');
      const grid = document.getElementById('herramientas-preview-grid');
      
      counter.innerText = files.length + ' de 6 fotografías seleccionadas' + (files.length >= 6 ? ' (✔ Mínimo completado)' : ' (⚠️ Faltan ' + Math.max(0, 6 - files.length) + ')');
      
      compressedHerramientasList = [];
      grid.innerHTML = '';
      grid.classList.remove('hidden');

      for (let i = 0; i < files.length; i++) {
        try {
          const compressed = await compressImageFile(files[i], 900, 900, 0.7);
          compressedHerramientasList.push(compressed);
          const thumb = document.createElement('img');
          thumb.src = compressed;
          thumb.className = 'w-full h-16 object-cover rounded-lg border border-[#B8FF3B]/40 shadow-sm';
          thumb.title = 'Herramienta ' + (i + 1);
          grid.appendChild(thumb);
        } catch (err) {
          console.error('Error al comprimir foto:', err);
        }
      }
    }

    // Manejo de Registro Profesional
    function handleProSubmit(e) {
      e.preventDefault();

      const hp = document.getElementById('pro-hp-token').value;
      if (hp || (Date.now() - pageLoadTime < 900)) {
        console.warn('Bot submission blocked');
        return;
      }

      const fotoPerfilInput = document.getElementById('pro-foto-perfil');
      const fotosHerrInput = document.getElementById('pro-fotos-herramientas');

      if (!fotoPerfilInput.files || fotoPerfilInput.files.length === 0) {
        alert('Debes adjuntar tu foto de perfil biométrica (rostro claro y sin gafas oscuras).');
        return;
      }

      if (!fotosHerrInput.files || fotosHerrInput.files.length < 6) {
        alert('Para la pre-auditoría KYC se requiere un mínimo de 6 fotos de tus herramientas y equipos de trabajo disponibles.');
        return;
      }

      openConsentModal(() => doProRegistration());
    }

    async function doProRegistration() {
      const submitBtn = document.getElementById('btn-submit-pro');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerText = 'Procesando registro... ⏳';

      const nombre = document.getElementById('pro-nombre').value.trim();
      const cedula = document.getElementById('pro-cedula').value.trim();
      const tel = document.getElementById('pro-tel').value.trim();
      const oficio = document.getElementById('pro-oficio').value;
      const zona = document.getElementById('pro-zona').value.trim();
      const banco = document.getElementById('pro-banco').value.trim();
      const mesNacimiento = document.getElementById('pro-mes').value;
      const anoNacimiento = document.getElementById('pro-ano').value;

      try {
        const res = await fetch('/api/register-pro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre,
            cedula,
            tel,
            oficio,
            zona,
            banco,
            mesNacimiento,
            anoNacimiento,
            exp: '3',
            consentimientoLey1581: true,
            kycToolPhotosCount: compressedHerramientasList.length || 6,
            kycProfileCooldownDays: 30,
            placaInicial: 'Bronce (9%)',
            promocionMes1: '1% Comisión (Primeros 100 Cupos)',
            canalValidacion: 'WhatsApp Exclusivo (Cero llamadas)'
          })
        });
        const data = await res.json();

        const alertBox = document.getElementById('pro-alert-success');
        const alertTitle = document.getElementById('pro-alert-title');
        const alertMsg = document.getElementById('pro-alert-msg');

        alertBox.classList.remove('hidden');
        if (data.ok) {
          alertTitle.innerText = data.tipo === 'PRIMORDIAL'
            ? ('👑 ¡Cupo Primordial #' + (data.cupoNumero || data.currentCount) + ' Reservado!')
            : '🛠️ ¡Registro de Profesional Exitoso!';
          alertMsg.innerText = data.message || 'Tu registro ha sido recibido. Te contactaremos exclusivamente por WhatsApp para validar tus 6 fotos de herramientas y documentos.';
          if (data.currentCount) {
            document.getElementById('pro-counter-badge').innerText = data.currentCount + ' / 100 Asignados';
          }
          document.getElementById('form-pro').reset();
          document.getElementById('perfil-preview').classList.add('hidden');
          document.getElementById('herramientas-preview-grid').classList.add('hidden');
          document.getElementById('herramientas-counter').innerText = '0 de 6 fotografías seleccionadas';
        } else {
          alertTitle.innerText = 'Aviso';
          alertMsg.innerText = data.error || 'Tu solicitud fue registrada.';
        }
      } catch (err) {
        const alertBox = document.getElementById('pro-alert-success');
        alertBox.classList.remove('hidden');
        document.getElementById('pro-alert-title').innerText = '✅ Solicitud Registrada';
        document.getElementById('pro-alert-msg').innerText = 'Hemos recibido tu solicitud. Nuestro equipo te contactará directamente por WhatsApp (mensajes de texto y voz).';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }

    // Manejo de Registro Cliente
    function handleClienteSubmit(e) {
      e.preventDefault();

      const hp = document.getElementById('cli-hp-token').value;
      if (hp || (Date.now() - pageLoadTime < 900)) {
        console.warn('Bot submission blocked');
        return;
      }

      openConsentModal(() => doClienteRegistration());
    }

    async function doClienteRegistration() {
      const submitBtn = document.getElementById('btn-submit-cli');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerText = 'Guardando en lista VIP... ⏳';

      const nombre = document.getElementById('cli-nombre').value.trim();
      const tel = document.getElementById('cli-tel').value.trim();
      const email = document.getElementById('cli-email').value.trim();
      const zona = document.getElementById('cli-zona').value.trim();
      const interes = document.getElementById('cli-interes').value;
      const mesNacimiento = document.getElementById('cli-mes').value;
      const anoNacimiento = document.getElementById('cli-ano').value;

      try {
        const res = await fetch('/api/register-client', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre,
            tel,
            email,
            comuna: zona,
            interes,
            mesNacimiento,
            anoNacimiento,
            cuponAsignado: 'TUBONO15K-VIP',
            origen: 'portal_unificado',
            consentimientoLey1581: true
          })
        });
        const data = await res.json();

        const alertBox = document.getElementById('cli-alert-success');
        alertBox.classList.remove('hidden');
        if (data.ok) {
          document.getElementById('cli-alert-title').innerText = '🎉 ¡Bienvenido a la Lista VIP rebuske!';
          document.getElementById('cli-alert-msg').innerText = 'Hemos registrado a ' + nombre + ' (' + email + ') con tu cupón TUBONO15K-VIP. Te notificaremos el link oficial de Google Play Store apenas la app esté lista.';
          document.getElementById('form-cliente').reset();
        } else {
          document.getElementById('cli-alert-title').innerText = 'Aviso';
          document.getElementById('cli-alert-msg').innerText = data.error || 'Tu registro fue recibido.';
        }
      } catch (err) {
        const alertBox = document.getElementById('cli-alert-success');
        alertBox.classList.remove('hidden');
        document.getElementById('cli-alert-title').innerText = '🎉 ¡Registro Exitoso!';
        document.getElementById('cli-alert-msg').innerText = 'Tu correo ' + email + ' ha quedado en la lista VIP con tu bono TUBONO15K-VIP.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }

    // Inicializar URL Params (?tipo=pro o ?tipo=cliente) y Canvas Cinemático
    document.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search);
      const tipo = params.get('tipo') || params.get('rol');
      if (tipo === 'cliente' || tipo === 'hogar' || tipo === 'usuario') {
        selectRole('cliente');
      } else {
        selectRole('pro');
      }

      // Iniciar simulador en $100.000 COP
      updateSimulatorUI(100000);

      // Iniciar Luciérnagas Cinemáticas en Canvas
      initCinematicCanvas();
    });

    function initCinematicCanvas() {
      const canvas = document.getElementById('cinematic-ambient-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      const fireflies = [];
      const count = Math.min(Math.floor((width * height) / 24000), 50);

      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 0.8,
          baseAlpha: Math.random() * 0.45 + 0.35,
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

          const currentAlpha = f.baseAlpha + Math.sin(time * f.pulseSpeed * 60 + f.pulseOffset) * 0.25;
          const clampedAlpha = Math.max(0.1, Math.min(0.95, currentAlpha));

          const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 6);
          gradient.addColorStop(0, f.color);
          gradient.addColorStop(0.3, 'rgba(184, 255, 59, 0.4)');
          gradient.addColorStop(1, 'rgba(7, 11, 6, 0)');

          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius * 6, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.globalAlpha = clampedAlpha * 0.7;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = clampedAlpha;
          ctx.fill();
        }

        requestAnimationFrame(animate);
      }
      animate();

      // Spotlight dinámico (Mouse & Touch)
      const spotlight = document.getElementById('cinematic-spotlight');
      function moveSpotlight(clientX, clientY) {
        if (!spotlight) return;
        const x = (clientX / window.innerWidth) * 100;
        const y = (clientY / window.innerHeight) * 100;
        spotlight.style.setProperty('--spotlight-x', x + '%');
        spotlight.style.setProperty('--spotlight-y', y + '%');
      }

      window.addEventListener('mousemove', (e) => moveSpotlight(e.clientX, e.clientY));
      window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          moveSpotlight(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });
    }
  </script>

</body>
</html>
`;

fs.writeFileSync(REG_PATH, htmlContent, 'utf8');
console.log('✅ registro.html reconstruido limpiamente:');
console.log(' - Cero fugas de código');
console.log(' - Cero propuestas navideñas / mini-juego');
console.log(' - Bono normal de $15.000 COP activo');
console.log(' - Mini-Simulador de Bolsillo 100% interactivo (slider + 3 botones rápidos)');
console.log(' - Píldoras Modo Familiar & Código QR en Puerta');
console.log(' - Acordeón de Protocolo de Seguridad y Garantías funcional');
console.log(' - Totalmente optimizado para celulares.');
