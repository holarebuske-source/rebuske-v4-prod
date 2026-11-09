import fs from 'fs';
import path from 'path';
import { SVG_ICONS } from './service_icons.mjs';
import { CATEGORIES_DATA } from './categories_data_unrounded.mjs';
import {
  generatePhoneScreensHTML,
  generateUnifiedServicesAndTarifarioHTML,
  generateRestoredFooterHTML,
  generateQuienesSomosHTML
} from './components_refined.mjs';
import { REFINED_STYLES } from './styles_refined.mjs';

const projectDir = 'C:\\Users\\camil\\.gemini\\antigravity\\scratch\\rebuske-app\\rebuske-v4-prod';

function buildEntradaHTML() {
  return `<!DOCTYPE html>
<html lang="es-CO">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>rebuske · Tu Hogar Protegido. Tu Mano de Obra Valorada · Medellín 2026</title>
  
  <!-- SEO & Metadatos Oficiales -->
  <meta name="description" content="rebuske: Plataforma de servicios para el hogar y profesionales en Medellín. Pago protegido en Bóveda Wompi (Bancolombia), Acta Digital de Garantía de 48h y especialistas verificados.">
  <meta name="keywords" content="servicios medellin, plomeria, cerrajeria, electricidad, aseo, clases de musica, reparaciones hogar, pago protegido wompi, rebuske">
  <meta name="theme-color" content="#0C120A">
  <meta name="robots" content="index, follow">

  <!-- Favicon e Iconos PWA Oficiales -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <!-- Tipografía Oficial: Plus Jakarta Sans & Baloo 2 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    /* ======================================================== */
    /* SISTEMA DE DISEÑO OFICIAL REBUSKE (ORGANIC LUMINOUS GLASS) */
    /* Exactamente alineado a la estética visual de la App      */
    /* ======================================================== */
    :root {
      --brand-lima: #B8FF3B;
      --color-primary: #AFFF3E;
      --color-forest: #4E8839;
      --color-lemon: #D9DF36;
      --color-canary: #FFFA70;
      --color-ebony: #3E4C35;
      --ebano: #0C120A;
      --noche: #162413;
      --bosque: #4E8839;
      --lima: #B8FF3B;
      --gy: #AFFF3E;
      --canario: #FFFA70;
      --tinta: #F4FBF1;
      --mut: rgba(244, 251, 241, 0.68);
      --glass-blur: 22px;
      --glass-surface: rgba(22, 36, 19, 0.78);
      --glass-surface-hover: rgba(26, 44, 22, 0.90);
      --glass-border: rgba(255, 255, 255, 0.12);
      --glass-border-lima: rgba(184, 255, 59, 0.32);
      --glass-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-title: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--ebano);
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(78, 136, 57, 0.18) 0%, transparent 60%),
        radial-gradient(circle at 80% 40%, rgba(184, 255, 59, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 20% 70%, rgba(22, 36, 19, 0.6) 0%, transparent 70%);
      color: var(--mut);
      font-family: var(--font-main) !important;
      letter-spacing: -0.01em !important;
      font-size: 15.5px;
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, .sec-title, .hero-tagline, .brand-logo, .start-card-title, .qr-info-title, .trust-card-title, .service-block-title {
      font-family: var(--font-title) !important;
      letter-spacing: -0.015em !important;
      font-weight: 800 !important;
      line-height: 1.18 !important;
      color: var(--tinta);
    }

    p, span, label, input, select, button, .sec-desc, .start-card-desc, .trust-card-desc {
      font-family: var(--font-main) !important;
      letter-spacing: normal !important;
    }

    /* Fondo bioluminiscente difuso */
    .bg-glow-layer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(85px);
      opacity: 0.22;
      animation: floatGlow 22s ease-in-out infinite alternate;
    }
    .glow-orb-1 {
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, var(--lima) 0%, transparent 70%);
      top: -100px;
      left: -100px;
    }
    .glow-orb-2 {
      width: 650px;
      height: 650px;
      background: radial-gradient(circle, var(--bosque) 0%, transparent 70%);
      bottom: -150px;
      right: -100px;
      animation-duration: 28s;
    }
    .glow-orb-3 {
      width: 450px;
      height: 450px;
      background: radial-gradient(circle, rgba(255, 250, 112, 0.16) 0%, transparent 70%);
      top: 45%;
      left: 35%;
      animation-duration: 18s;
      animation-delay: -6s;
    }
    @keyframes floatGlow {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(60px, 40px) scale(1.1); }
      100% { transform: translate(-40px, 70px) scale(0.95); }
    }

    /* ======================================================== */
    /* ANIMACIONES OFICIALES PRESERVADAS (A, B, C, D, E)        */
    /* ======================================================== */
    .reveal-cascade {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.65s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.65s cubic-bezier(0.215, 0.61, 0.355, 1);
      will-change: opacity, transform;
    }
    .reveal-cascade.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .stagger-1 { transition-delay: 0.08s; }
    .stagger-2 { transition-delay: 0.16s; }
    .stagger-3 { transition-delay: 0.24s; }
    .stagger-4 { transition-delay: 0.32s; }
    .stagger-5 { transition-delay: 0.40s; }

    .mask-slide-wrap {
      overflow: hidden;
      display: block;
    }
    .mask-slide-inner {
      display: block;
      transform: translateY(100%);
      opacity: 0;
      transition: transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.8s ease;
    }
    .mask-slide-inner.is-visible {
      transform: translateY(0);
      opacity: 1;
    }

    .pulse-c {
      animation: pulseBiolum 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulseBiolum {
      0%, 100% { opacity: 0.85; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); filter: drop-shadow(0 0 16px rgba(184, 255, 59, 0.45)); }
    }

    .float-d-1 {
      animation: floatD1 6s ease-in-out infinite alternate;
    }
    @keyframes floatD1 {
      0% { transform: translateY(0); }
      100% { transform: translateY(-8px); }
    }

    .elevate-hover {
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .elevate-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 25px rgba(184, 255, 59, 0.16);
      border-color: rgba(184, 255, 59, 0.35);
    }

    .haz-resplandor-wompi {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 70%;
      background: radial-gradient(ellipse at center, rgba(255, 211, 92, 0.12) 0%, rgba(255, 250, 112, 0.05) 45%, transparent 70%);
      filter: blur(60px);
      pointer-events: none;
      z-index: 0;
    }

    /* CONTENEDORES Y ESTRUCTURA GENERAL */
    .section-wrap {
      max-width: 1240px;
      margin: 0 auto;
      padding: 50px 24px;
      position: relative;
      z-index: 2;
    }

    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(184, 255, 59, 0.1);
      border: 1px solid rgba(184, 255, 59, 0.28);
      color: var(--lima);
      font-size: 13px;
      font-weight: 700;
    }

    .sec-tag {
      display: inline-block;
      font-size: 12.5px;
      font-weight: 800;
      color: var(--lima);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
    }

    .sec-title {
      font-size: clamp(26px, 4vw, 38px);
      margin-bottom: 12px;
    }

    .sec-desc {
      font-size: 16px;
      color: var(--mut);
      max-width: 720px;
      line-height: 1.6;
    }

    /* BARRA SUPERIOR */
    .top-bar {
      position: sticky;
      top: 14px;
      max-width: 1240px;
      margin: 14px auto 20px;
      padding: 12px 24px;
      background: rgba(12, 18, 10, 0.82);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--glass-border);
      border-radius: 999px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .top-bar.scrolled {
      background: rgba(10, 15, 8, 0.94);
      border-color: rgba(184, 255, 59, 0.25);
      box-shadow: 0 14px 40px rgba(0, 0, 0, 0.7);
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--tinta);
    }

    .brand-logo-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--lima);
      box-shadow: 0 0 10px var(--lima);
    }

    .brand-name {
      font-family: 'Baloo 2', sans-serif;
      font-size: 24px;
      font-weight: 800;
      color: var(--tinta);
      letter-spacing: -0.02em;
    }

    .brand-tag {
      font-size: 11px;
      font-weight: 700;
      color: var(--lima);
      background: rgba(184, 255, 59, 0.12);
      padding: 2px 7px;
      border-radius: 6px;
      border: 1px solid rgba(184, 255, 59, 0.22);
    }

    .top-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-nav-link {
      color: var(--tinta);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 999px;
      border: 1px solid transparent;
      transition: all 0.2s ease;
    }
    .btn-nav-link:hover, .btn-nav-link.active {
      color: var(--lima);
      background: rgba(184, 255, 59, 0.08);
      border-color: rgba(184, 255, 59, 0.2);
    }

    .btn-pill-primary {
      background: var(--lima);
      color: #0C120A;
      font-size: 13.5px;
      font-weight: 800;
      padding: 8px 18px;
      border-radius: 999px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 0 20px rgba(184, 255, 59, 0.35);
      transition: all 0.25s ease;
      border: none;
      cursor: pointer;
    }
    .btn-pill-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 28px rgba(184, 255, 59, 0.55);
    }

    /* HERO SECTION */
    .hero-section {
      text-align: center;
      padding-top: 30px;
      padding-bottom: 30px;
    }

    .hero-promo-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 6px 16px;
      border-radius: 999px;
      background: rgba(22, 36, 19, 0.85);
      border: 1px solid var(--glass-border-lima);
      color: var(--tinta);
      font-size: 13px;
      text-decoration: none;
      margin-bottom: 24px;
    }

    .hero-promo-tag {
      background: var(--lima);
      color: #0C120A;
      font-size: 10.5px;
      font-weight: 900;
      padding: 2px 7px;
      border-radius: 4px;
    }

    .hero-tagline {
      font-size: clamp(32px, 5.5vw, 54px);
      max-width: 920px;
      margin: 0 auto 18px;
      line-height: 1.12;
    }

    .hero-service-display {
      margin: 18px auto 14px;
      display: flex;
      justify-content: center;
    }

    .hero-service-badge {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 10px 20px;
      background: var(--glass-surface);
      border: 1px solid var(--glass-border-lima);
      border-radius: 999px;
      box-shadow: var(--glass-shadow);
      font-size: 14.5px;
      color: var(--tinta);
      font-weight: 700;
    }

    .hero-service-badge svg {
      color: var(--lima);
      flex-shrink: 0;
    }

    .hero-ver-servicio-btn {
      color: var(--lima);
      font-size: 12.5px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .hero-dots-indicator {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 28px;
    }

    .hero-dot-btn {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .hero-dot-btn.active {
      width: 26px;
      border-radius: 10px;
      background: var(--lima);
      box-shadow: 0 0 10px var(--lima);
    }

    .hero-cta-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px;
      margin-bottom: 32px;
    }

    .btn-hero-primary {
      background: var(--lima);
      color: #0C120A;
      font-size: 14.5px;
      font-weight: 800;
      padding: 13px 26px;
      border-radius: 999px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 0 25px rgba(184, 255, 59, 0.35);
      transition: all 0.25s ease;
    }
    .btn-hero-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 35px rgba(184, 255, 59, 0.55);
    }

    .btn-hero-sec {
      background: var(--glass-surface);
      color: var(--tinta);
      font-size: 14.5px;
      font-weight: 700;
      padding: 13px 24px;
      border-radius: 999px;
      text-decoration: none;
      border: 1px solid var(--glass-border);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.25s ease;
    }
    .btn-hero-sec:hover {
      border-color: var(--lima);
      color: var(--lima);
      transform: translateY(-2px);
    }

    .hero-chips-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      max-width: 900px;
      margin: 0 auto;
    }

    .hero-chip {
      background: rgba(22, 36, 19, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 7px 14px;
      border-radius: 999px;
      font-size: 13px;
      color: var(--tinta);
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }
    .hero-chip svg {
      color: var(--lima);
    }

    /* EMPIEZA AQUÍ */
    .start-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 28px;
      margin-top: 36px;
    }

    .start-card {
      background: var(--glass-surface);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      padding: 32px 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
    }

    .start-icon-container {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      background: rgba(184, 255, 59, 0.12);
      border: 1px solid rgba(184, 255, 59, 0.3);
      color: var(--lima);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .start-card-title {
      font-size: 22px;
      margin-bottom: 12px;
    }

    .start-card-desc {
      font-size: 14.5px;
      color: var(--mut);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .start-perks-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 28px;
    }

    .start-perk-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 13.5px;
      color: var(--tinta);
      line-height: 1.5;
    }
    .start-perk-item svg {
      color: var(--lima);
      flex-shrink: 0;
      margin-top: 3px;
    }

    /* CÓMO FUNCIONA */
    .steps-container {
      display: flex;
      flex-direction: column;
      gap: 18px;
      max-width: 780px;
      margin: 36px auto 0;
      position: relative;
    }

    .step-item {
      background: var(--glass-surface);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 18px;
      transition: all 0.25s ease;
    }
    .step-item:hover {
      border-color: rgba(184, 255, 59, 0.35);
      transform: translateX(4px);
    }

    .step-number {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(184, 255, 59, 0.15);
      border: 1px solid var(--lima);
      color: var(--lima);
      font-family: 'Baloo 2', sans-serif;
      font-size: 18px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .step-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--tinta);
      line-height: 1.45;
    }

    /* PAGO PROTEGIDO */
    .trust-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 36px;
      position: relative;
      z-index: 1;
    }

    .trust-card {
      background: var(--glass-surface);
      border: 1px solid var(--glass-border);
      border-top: 3px solid var(--lima);
      border-radius: 20px;
      padding: 26px 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .trust-card-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(184, 255, 59, 0.12);
      border: 1px solid rgba(184, 255, 59, 0.25);
      color: var(--lima);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .trust-card-title {
      font-size: 17px;
      color: var(--tinta);
    }

    .trust-card-desc {
      font-size: 13.5px;
      color: var(--mut);
      line-height: 1.6;
    }

    /* CREDENCIAL QR */
    .qr-badge-card {
      background: var(--glass-surface);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      padding: 32px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 32px;
    }

    .qr-box {
      width: 140px;
      height: 140px;
      background: #000;
      border: 2px solid var(--lima);
      border-radius: 16px;
      padding: 10px;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(10, 1fr);
      gap: 2px;
      box-shadow: 0 0 25px rgba(184, 255, 59, 0.25);
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }

    .qr-cell { background: transparent; border-radius: 1px; }
    .qr-cell.filled { background: var(--lima); }

    .qr-scan-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--lima);
      box-shadow: 0 0 8px var(--lima);
      animation: qrScan 2.4s ease-in-out infinite alternate;
    }
    @keyframes qrScan {
      0% { top: 4px; }
      100% { top: calc(100% - 6px); }
    }

    .qr-info-content {
      flex: 1;
      min-width: 280px;
    }

    .qr-info-title {
      font-size: 24px;
      margin: 6px 0 10px;
    }

    .qr-info-desc {
      font-size: 14.5px;
      color: var(--mut);
      line-height: 1.6;
    }

    /* PROTOCOLO ACCORDION */
    .protocol-accordion {
      display: flex;
      flex-direction: column;
      gap: 14px;
      max-width: 860px;
      margin: 36px auto 0;
    }

    .protocol-item {
      background: var(--glass-surface);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.25s ease;
    }

    .protocol-header {
      padding: 18px 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    .protocol-header h3 {
      font-size: 16px;
      color: var(--tinta);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .protocol-header h3 svg {
      color: var(--lima);
    }

    .protocol-chevron {
      color: var(--mut);
      transition: transform 0.3s ease;
    }

    .protocol-item.open .protocol-chevron {
      transform: rotate(180deg);
      color: var(--lima);
    }

    .protocol-body {
      padding: 0 22px 18px;
      font-size: 14px;
      color: var(--mut);
      line-height: 1.6;
      display: none;
    }

    .protocol-item.open .protocol-body {
      display: block;
    }

    /* ESTILOS REFINADOS ADICIONALES (TELÉFONOS, GRID COMPACTO CON HOVER, FOOTER) */
    ${REFINED_STYLES}
  </style>
</head>
<body>

  <!-- Capa de brillo bioluminiscente de fondo -->
  <div class="bg-glow-layer" aria-hidden="true">
    <div class="glow-orb glow-orb-1"></div>
    <div class="glow-orb glow-orb-2"></div>
    <div class="glow-orb glow-orb-3"></div>
  </div>

  <!-- ==========================================================================
       1. BARRA SUPERIOR LIMPIA CON ACCESOS OFICIALES (LOGO 3D ANIMADO)
       ========================================================================== -->
  <header class="top-bar" id="topBar">
    <a href="/entrada" class="brand-logo" title="rebuske Medellín · Página Web Principal">
      <div class="logo-3d-bubble pulse-c" title="Luciérnaga Rebuske 3D">
        <img src="/assets/icons/luciernaga_3d_animada.webp" alt="Luciérnaga 3D Rebuske" class="logo-3d-img">
      </div>
      <div style="display:flex;flex-direction:column;line-height:1.1;">
        <span class="brand-name">rebuske</span>
        <span class="brand-tag">Medellín 2026</span>
      </div>
    </a>
    <nav class="top-actions" aria-label="Navegación unificada">
      <a href="#quienes-somos" class="btn-nav-link" title="Quiénes Somos · Conoce nuestra historia">Quiénes somos</a>
      <a href="#nuestros-servicios" class="btn-nav-link" title="Qué Hacemos · 17 especialidades y tarifas">Qué hacemos</a>
      <a href="#contacto" class="btn-pill-primary sheen" title="Contacto y Soporte Oficial">
        <span>Contacto</span>
        ${SVG_ICONS.phone}
      </a>
    </nav>
  </header>

  <!-- ==========================================================================
       2. HERO PRINCIPAL LIMPIO (CERO EMOJIS, PRECIOS NO REDONDEADOS)
       ========================================================================== -->
  <section class="section-wrap hero-section">
    <!-- Banner de Acceso al Catálogo de 17 Categorías -->
    <a href="#nuestros-servicios" class="hero-promo-badge elevate-hover reveal-cascade">
      <span class="hero-promo-tag">OFICIAL 2026</span>
      <span>17 Especialidades · Bóveda Wompi & Precios Transparentes</span>
      <span style="color:var(--lima);display:inline-flex;align-items:center;gap:4px;">
        <span>Ver Tarifas</span>
        ${SVG_ICONS.arrowRight}
      </span>
    </a>

    <div class="mask-slide-wrap">
      <h1 class="hero-tagline mask-slide-inner">Tu Hogar Protegido. Tu Mano de Obra Valorada.</h1>
    </div>

    <p class="sec-desc reveal-cascade stagger-1" style="margin: 0 auto 24px; font-size: 17px; max-width: 760px;">
      La plataforma de multiservicios de Medellín con pago protegido en <strong>Bóveda Wompi (Escrow)</strong>, 
      técnicos verificados con cédula biométrica y <strong>Acta Digital de Garantía de 48 horas</strong>.
    </p>

    <!-- Display reactivo del servicio actual -->
    <div class="hero-service-display reveal-cascade stagger-2">
      <div class="hero-service-badge float-d-1" id="heroServiceBadge">
        <span id="heroServiceIcon">${SVG_ICONS.plomeria}</span>
        <span id="heroServiceName">Plomería · desde $62.840 COP</span>
        <span class="hero-ver-servicio-btn" onclick="scrollearAServicio()">
          <span>Ver detalle</span>
          ${SVG_ICONS.arrowRight}
        </span>
      </div>
    </div>

    <!-- 4 Puntos Indicadores del Hero -->
    <div class="hero-dots-indicator reveal-cascade stagger-3" id="heroDotsWrap">
      <button class="hero-dot-btn active" onclick="seleccionarServicioHero(0)" aria-label="Plomería"></button>
      <button class="hero-dot-btn" onclick="seleccionarServicioHero(1)" aria-label="Electricidad"></button>
      <button class="hero-dot-btn" onclick="seleccionarServicioHero(2)" aria-label="Cerrajería"></button>
      <button class="hero-dot-btn" onclick="seleccionarServicioHero(3)" aria-label="Aseo"></button>
    </div>

    <!-- Botonera Central Hero -->
    <div class="hero-cta-group reveal-cascade stagger-4">
      <a href="/registro/tecnico" class="btn-hero-primary">
        <span>Soy Profesional / Técnico (99% Neto Mes 1)</span>
        ${SVG_ICONS.arrowRight}
      </a>
      <a href="/registro/cliente" class="btn-hero-sec">
        <span>Registro Clientes VIP (Bono $15.000)</span>
      </a>
    </div>

    <!-- 4 Chips de Confianza (Cero Emojis) -->
    <div class="hero-chips-wrap reveal-cascade stagger-5">
      <span class="hero-chip elevate-hover">${SVG_ICONS.shield} Bóveda Wompi Escrow (Bancolombia)</span>
      <span class="hero-chip elevate-hover">${SVG_ICONS.document} 48h Garantía Ley 1480</span>
      <span class="hero-chip elevate-hover">${SVG_ICONS.check} Red de Servicios Profesionales</span>
      <span class="hero-chip elevate-hover">${SVG_ICONS.zap} Primeros 100 Cupos al 1% Comisión</span>
    </div>
  </section>

  <!-- ==========================================================================
       3. SHOWCASE DE TELÉFONOS EN VIVO · PANTALLAS IDÉNTICAS A LA APP REAL
       ========================================================================== -->
  ${generatePhoneScreensHTML()}

  <!-- ==========================================================================
       4. EMPIEZA AQUÍ (DOS CAMINOS DE REGISTRO CLAROS)
       ========================================================================== -->
  <section class="section-wrap" id="empieza-aqui">
    <div style="text-align:center;">
      <span class="sec-tag reveal-cascade">Elige tu camino</span>
      <div class="mask-slide-wrap">
        <h2 class="sec-title mask-slide-inner">Empieza aquí</h2>
      </div>
      <p class="sec-desc reveal-cascade stagger-1" style="margin:0 auto;">Selecciona tu perfil para ingresar al ecosistema protegido de rebuske en Medellín:</p>
    </div>

    <div class="start-cards-grid">
      <!-- Tarjeta 1: Técnico Profesional -->
      <div class="start-card elevate-hover reveal-cascade stagger-2">
        <div>
          <div class="start-icon-container pulse-c" aria-hidden="true">${SVG_ICONS.plomeria}</div>
          <h3 class="start-card-title">Soy Profesional / Técnico</h3>
          <p class="start-card-desc">
            Únete a la red con el mejor esquema de remuneración de Colombia. Tu dinero no se pierde: cobras seguro en tu cuenta bancaria respaldado por la plataforma.
          </p>
          <ul class="start-perks-list">
            <li class="start-perk-item">
              ${SVG_ICONS.check}
              <div><strong>Beneficio Mes 1:</strong> Solo 1% de comisión (te llevas el 99% neto de tus labores).</div>
            </li>
            <li class="start-perk-item">
              ${SVG_ICONS.check}
              <div><strong>Placas por mérito:</strong> Bronce (9%), Plata (8%) y Oro (7%).</div>
            </li>
            <li class="start-perk-item">
              ${SVG_ICONS.check}
              <div><strong>Cero impagos:</strong> La Bóveda Wompi asegura los fondos antes de que inicies el trabajo.</div>
            </li>
          </ul>
        </div>
        <a href="/registro/tecnico" class="btn-hero-primary" style="width:100%;text-align:center;justify-content:center;">
          <span>Registrarme como Técnico</span>
          ${SVG_ICONS.arrowRight}
        </a>
      </div>

      <!-- Tarjeta 2: Cliente Hogar VIP -->
      <div class="start-card elevate-hover reveal-cascade stagger-3">
        <div>
          <div class="start-icon-container pulse-c" aria-hidden="true" style="background:rgba(255,250,112,0.12);border-color:rgba(255,250,112,0.3);color:#FFFA70;">
            ${SVG_ICONS.shield}
          </div>
          <h3 class="start-card-title">Soy Hogar / Cliente VIP</h3>
          <p class="start-card-desc">
            Contrata con total tranquilidad en Medellín. Especialistas verificados, pagos en custodia que solo se liberan tras tu visto bueno y respaldo con acta digital de 48h.
          </p>
          <ul class="start-perks-list">
            <li class="start-perk-item">
              ${SVG_ICONS.check}
              <div><strong>Custodia Total:</strong> Tu dinero queda en Bóveda Wompi y no se desembolsa hasta que apruebes.</div>
            </li>
            <li class="start-perk-item">
              ${SVG_ICONS.check}
              <div><strong>Garantía 48 horas:</strong> Acta formal legalmente vinculante conforme a la Ley 1480.</div>
            </li>
            <li class="start-perk-item">
              ${SVG_ICONS.check}
              <div><strong>Bono VIP:</strong> $15.000 COP de descuento para tu primer servicio.</div>
            </li>
          </ul>
        </div>
        <a href="/registro/cliente" class="btn-hero-sec" style="width:100%;text-align:center;justify-content:center;border-color:var(--lima);color:var(--lima);">
          <span>Registro Clientes VIP (Bono $15.000)</span>
          ${SVG_ICONS.arrowRight}
        </a>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       5. QUIÉNES SOMOS (CAMILO ESCOBAR, DIGNIDAD TÉCNICA 93%, WOMPI ESCROW)
       ========================================================================== -->
  ${generateQuienesSomosHTML()}

  <!-- ==========================================================================
       6. NUESTROS SERVICIOS Y TARIFARIO OFICIAL UNIFICADOS (COMPACTO CON HOVER)
       ========================================================================== -->
  <div id="tarifas" style="position:relative;top:-60px;"></div>
  ${generateUnifiedServicesAndTarifarioHTML()}

  <!-- ==========================================================================
       6. CÓMO FUNCIONA PARA EL CLIENTE (5 PASOS)
       ========================================================================== -->
  <section class="section-wrap" id="como-funciona">
    <div style="text-align:center;">
      <span class="sec-tag reveal-cascade">Flujo Seguro</span>
      <div class="mask-slide-wrap">
        <h2 class="sec-title mask-slide-inner">Cómo funciona para el cliente</h2>
      </div>
      <p class="sec-desc reveal-cascade stagger-1" style="margin:0 auto;">
        Tu dinero y tu hogar 100% protegidos desde la solicitud hasta la firma del acta de garantía:
      </p>
    </div>

    <div class="steps-container">
      <div class="step-item reveal-cascade stagger-1">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3 class="step-title">Elige el servicio que necesitas entre las 17 especialidades disponibles.</h3>
        </div>
      </div>

      <div class="step-item reveal-cascade stagger-2">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3 class="step-title">Indica tu comuna y dirección en Medellín para ubicar profesionales cercanos.</h3>
        </div>
      </div>

      <div class="step-item reveal-cascade stagger-3">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3 class="step-title">Recibe perfiles verificados con su cédula, calificación real y elige el que prefieras.</h3>
        </div>
      </div>

      <div class="step-item reveal-cascade stagger-4">
        <div class="step-number">4</div>
        <div class="step-content">
          <h3 class="step-title">Paga en Bóveda Wompi (Escrow): tu dinero queda en custodia en Bancolombia y no se toca.</h3>
        </div>
      </div>

      <div class="step-item reveal-cascade stagger-5">
        <div class="step-number">5</div>
        <div class="step-content">
          <h3 class="step-title">Aprueba el trabajo. Se libera el pago y recibes el acta digital de garantía de 48 horas.</h3>
        </div>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       7. PAGO PROTEGIDO (TRI-MODAL WOMPI ESCROW)
       ========================================================================== -->
  <section class="section-wrap" id="pago-protegido">
    <div class="haz-resplandor-wompi" aria-hidden="true"></div>

    <div style="text-align:center;position:relative;z-index:1;">
      <span class="sec-tag reveal-cascade">Bóveda Wompi (Escrow)</span>
      <div class="mask-slide-wrap">
        <h2 class="sec-title mask-slide-inner">Pago protegido para cada labor</h2>
      </div>
      <p class="sec-desc reveal-cascade stagger-1" style="margin:0 auto;">
        Blindaje financiero formal para clientes y profesionales independientes en el Valle de Aburrá:
      </p>
    </div>

    <div class="trust-cards-grid">
      <div class="trust-card elevate-hover reveal-cascade stagger-1">
        <div class="trust-card-icon pulse-c" aria-hidden="true">${SVG_ICONS.plomeria}</div>
        <h3 class="trust-card-title">1. Por Labor Única (Escrow 100%)</h3>
        <p class="trust-card-desc">
          Para reparaciones del hogar: el valor queda custodiado en Bóveda Wompi y solo se desembolsa al técnico tras tu visto bueno y firma del acta de 48 horas.
        </p>
      </div>

      <div class="trust-card elevate-hover reveal-cascade stagger-2" style="border-top-color:var(--canario);background:rgba(26,38,20,0.85);">
        <div class="trust-card-icon pulse-c" aria-hidden="true" style="color:#FFFA70;border-color:rgba(255,250,112,0.3);background:rgba(255,250,112,0.1);">${SVG_ICONS.educacion}</div>
        <h3 class="trust-card-title" style="color:var(--canario);">2. Bóveda de Sesiones Progresivas</h3>
        <p class="trust-card-desc">
          Para clases de música, tutorías o idiomas: nadie aprende en un día. Pagas el pack de 2 a 4 semanas en Bóveda y se libera sesión a sesión al registrar asistencia mutua. Saldo no visto 100% reembolsable.
        </p>
      </div>

      <div class="trust-card elevate-hover reveal-cascade stagger-3">
        <div class="trust-card-icon pulse-c" aria-hidden="true">${SVG_ICONS.construccion}</div>
        <h3 class="trust-card-title">3. Proyectos por Hitos Certificados</h3>
        <p class="trust-card-desc">
          Para remodelaciones, carpintería a medida o diseño digital: desembolsos escalonados (30% inicio/materiales, 35% avance con peritaje fotográfico y 35% entrega final a satisfacción).
        </p>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       8. CREDENCIAL QR EN PUERTA
       ========================================================================== -->
  <section class="section-wrap" id="credencial-qr">
    <div class="qr-badge-card elevate-hover reveal-cascade">
      <div class="qr-box" aria-hidden="true">
        <div class="qr-scan-line"></div>
        <div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div>
        <div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div>
        <div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div>
        <div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div>
        <div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div>
        <div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell"></div><div class="qr-cell filled"></div>
        <div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div>
        <div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell"></div>
        <div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell"></div>
        <div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell"></div><div class="qr-cell"></div><div class="qr-cell"></div><div class="qr-cell"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div><div class="qr-cell filled"></div>
      </div>
      <div class="qr-info-content">
        <span class="sec-tag">Seguridad Domiciliaria</span>
        <h3 class="qr-info-title">Credencial QR en puerta</h3>
        <p class="qr-info-desc">
          Antes de abrir la puerta de tu hogar, escanea con la cámara de tu celular la credencial digital del profesional. El sistema valida en tiempo real su identidad biométrica cotejada, antecedentes policivos y orden de servicio activa en tu comuna.
        </p>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       9. PROTOCOLO OFICIAL DE SEGURIDAD Y GARANTÍAS
       ========================================================================== -->
  <section class="section-wrap" id="protocolo-seguridad">
    <div style="text-align:center;">
      <span class="sec-tag reveal-cascade">Protección Integral</span>
      <div class="mask-slide-wrap">
        <h2 class="sec-title mask-slide-inner">Protocolo oficial de seguridad y garantías</h2>
      </div>
      <p class="sec-desc reveal-cascade stagger-1" style="margin:0 auto;">
        Los cuatro pilares normativos y operativos que blindan cada visita técnica en Medellín:
      </p>
    </div>

    <div class="protocol-accordion">
      <div class="protocol-item open reveal-cascade stagger-1">
        <div class="protocol-header" onclick="toggleProtocol(this)">
          <h3>${SVG_ICONS.search} Peritaje Técnico 100%</h3>
          <span class="protocol-chevron" aria-hidden="true">${SVG_ICONS.chevronDown}</span>
        </div>
        <div class="protocol-body">
          Cada técnico registrado en rebuske atraviesa verificación de antecedentes penales en Policía Nacional, Procuraduría y Contraloría, junto a prueba técnica de oficio y cotejo de identidad biométrica facial.
        </div>
      </div>

      <div class="protocol-item reveal-cascade stagger-2">
        <div class="protocol-header" onclick="toggleProtocol(this)">
          <h3>${SVG_ICONS.shield} Bóveda Wompi (Escrow)</h3>
          <span class="protocol-chevron" aria-hidden="true">${SVG_ICONS.chevronDown}</span>
        </div>
        <div class="protocol-body">
          El cliente nunca le transfiere dinero directamente a cuentas personales sin garantía. Los fondos quedan retenidos en una bóveda fiduciaria regulada por la Superintendencia Financiera a través de Wompi (Bancolombia) y solo se desembolsan contra firma de satisfacción.
        </div>
      </div>

      <div class="protocol-item reveal-cascade stagger-3">
        <div class="protocol-header" onclick="toggleProtocol(this)">
          <h3>${SVG_ICONS.mapPin} Despacho Inmediato en Comunas</h3>
          <span class="protocol-chevron" aria-hidden="true">${SVG_ICONS.chevronDown}</span>
        </div>
        <div class="protocol-body">
          Rastreo de disponibilidad en las 16 comunas y 5 corregimientos de Medellín (El Poblado, Laureles, Belén, Robledo, Envigado, Itagüí, Bello). El técnico más cercano recibe la notificación y llega en minutos sin sobrecostos arbitrarios.
        </div>
      </div>

      <div class="protocol-item reveal-cascade stagger-4">
        <div class="protocol-header" onclick="toggleProtocol(this)">
          <h3>${SVG_ICONS.document} Garantía Escrita de 48 Horas (Ley 1480)</h3>
          <span class="protocol-chevron" aria-hidden="true">${SVG_ICONS.chevronDown}</span>
        </div>
        <div class="protocol-body">
          Conforme al Estatuto del Consumidor (Ley 1480 de 2011), cada labor finalizada genera un Acta Digital de Garantía con vigencia de 48 horas. Si la fuga persiste, la cerradura falla o el trabajo presenta imperfecciones, el técnico regresa sin costo alguno o se reembolsa el 100% de la bóveda.
        </div>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       10. FOOTER CORPORATIVO Y LEGAL COMPLETO RESTAURADO (CERO REDUNDANCIAS)
       ========================================================================== -->
  ${generateRestoredFooterHTML()}

  <!-- ==========================================================================
       SCRIPTS: FILTROS INTERACTIVOS, ROTACIÓN HERO Y ANIMACIONES
       ========================================================================== -->
  <script>
    // Barra superior scroll listener
    window.addEventListener('scroll', () => {
      const bar = document.getElementById('topBar');
      if (bar) {
        if (window.scrollY > 40) {
          bar.classList.add('scrolled');
        } else {
          bar.classList.remove('scrolled');
        }
      }
    });

    // Control de Acordeón del Protocolo
    function toggleProtocol(headerEl) {
      const item = headerEl.parentElement;
      if (item) item.classList.toggle('open');
    }

    // Banner de Cookies con persistencia
    function cerrarCookies() {
      const banner = document.getElementById('cookieBanner');
      if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(40px)';
        setTimeout(() => banner.style.display = 'none', 300);
      }
      localStorage.setItem('rebuske_cookies_accepted', 'config');
    }

    function aceptarCookies() {
      const banner = document.getElementById('cookieBanner');
      if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(40px)';
        setTimeout(() => banner.style.display = 'none', 300);
      }
      localStorage.setItem('rebuske_cookies_accepted', 'all');
    }

    if (localStorage.getItem('rebuske_cookies_accepted')) {
      const banner = document.getElementById('cookieBanner');
      if (banner) banner.style.display = 'none';
    }

    // Navegación suave a directorio de servicios
    function scrollearAServicio() {
      const target = document.getElementById('nuestros-servicios');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // ========================================================================
    // FILTRADO DINÁMICO DE ESPECIALIDADES COMPACTAS
    // ========================================================================
    function filtrarServiciosCompactos() {
      const query = (document.getElementById('serviceSearch')?.value || '').toLowerCase().trim();
      const cards = document.querySelectorAll('.srv-compact-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    function filtrarGrupoSrv(grupo, btn) {
      document.querySelectorAll('.srv-filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const cards = document.querySelectorAll('.srv-compact-card');
      cards.forEach(card => {
        const cardGroup = card.getAttribute('data-group');
        if (grupo === 'todos' || cardGroup === grupo) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // ========================================================================
    // OBSERVADOR PARA ANIMACIONES EN CASCADA
    // ========================================================================
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const animObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const maskInners = entry.target.querySelectorAll('.mask-slide-inner');
          maskInners.forEach(m => m.classList.add('is-visible'));
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-cascade, .mask-slide-wrap').forEach(el => {
      animObserver.observe(el);
    });

    // ========================================================================
    // HERO ROTACIÓN LIMPIA DE SERVICIOS (SIN EMOJIS, PRECIOS NO REDONDEADOS)
    // ========================================================================
    const heroServices = [
      { name: 'Plomería · desde $62.840 COP', iconKey: 'plomeria' },
      { name: 'Electricidad · desde $52.540 COP', iconKey: 'electricidad' },
      { name: 'Cerrajería · desde $63.480 COP', iconKey: 'cerrajeria' },
      { name: 'Limpieza y Aseo · desde $82.540 COP', iconKey: 'limpieza' }
    ];

    const heroIcons = {
      plomeria: \`${SVG_ICONS.plomeria}\`,
      electricidad: \`${SVG_ICONS.electricidad}\`,
      cerrajeria: \`${SVG_ICONS.cerrajeria}\`,
      limpieza: \`${SVG_ICONS.limpieza}\`
    };

    let heroIdx = 0;
    let heroHold = false;

    function actualizarDisplayHero(idx) {
      heroIdx = idx;
      const s = heroServices[idx];
      const iconEl = document.getElementById('heroServiceIcon');
      const nameEl = document.getElementById('heroServiceName');
      if (iconEl && heroIcons[s.iconKey]) iconEl.innerHTML = heroIcons[s.iconKey];
      if (nameEl) nameEl.textContent = s.name;

      const dots = document.querySelectorAll('.hero-dot-btn');
      dots.forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === idx);
      });
    }

    function seleccionarServicioHero(idx) {
      heroHold = true;
      actualizarDisplayHero(idx);
    }

    setInterval(() => {
      if (!heroHold) {
        const nextIdx = (heroIdx + 1) % heroServices.length;
        actualizarDisplayHero(nextIdx);
      }
    }, 3400);

    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.mask-slide-inner').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('is-visible');
      });
    });
  </script>
</body>
</html>`;
}

// Generar entrada.html y sincronizar registro.html (100% idénticos)
const entradaContent = buildEntradaHTML();
fs.writeFileSync(path.join(projectDir, 'entrada.html'), entradaContent, 'utf8');
fs.writeFileSync(path.join(projectDir, 'registro.html'), entradaContent, 'utf8');

console.log('entrada.html y registro.html generados exitosamente.');
console.log('Bytes escritos:', entradaContent.length);
