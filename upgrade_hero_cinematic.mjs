import fs from 'fs';
import path from 'path';

const prodDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';
const registroPath = path.join(prodDir, 'registro.html');

let html = fs.readFileSync(registroPath, 'utf8');

// Target the Hero & Selection Cards section
const oldHeroRegex = /<!-- ENCABEZADO PRINCIPAL -->[\s\S]*?<!-- TARJETAS DE SELECCI[^\n]*? -->[\s\S]*?(?=<div id="formulario-section")/i;

const newCinematicHero = `<!-- ENCABEZADO PRINCIPAL CINEMATOGRÁFICO -->
    <div class="text-center max-w-4xl mx-auto mb-12 relative z-10">
      <div class="cinematic-badge mb-5 inline-flex items-center gap-2">
        <span class="cinematic-badge-pulse"></span>
        <span>✦ PORTAL OFICIAL DE REGISTRO · MEDELLÍN 2026 · RUTA DE LUZ</span>
      </div>
      
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] mb-5 tracking-tight font-brand">
        Tu Hogar Protegido.<br class="hidden sm:inline">
        <span class="bg-gradient-to-r from-[#B8FF3B] via-[#AFFF3E] to-[#FFFA70] bg-clip-text text-transparent">Tu Mano de Obra Valorada.</span>
      </h1>
      
      <p class="text-sm sm:text-base text-[#F4FBF1]/80 max-w-2xl mx-auto leading-relaxed">
        La primera infraestructura de confianza en servicios del hogar en Medellín. Respaldada por <b>Bóveda Wompi</b> (pago protegido), <b>48h de garantía escrita</b> y el catálogo exclusivo <b>'Servicios por Ellas'</b>.
      </p>

      <!-- Trust Badges Bar -->
      <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs text-[#C6D8BF]">
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121A0E]/90 border border-[#B8FF3B]/30 shadow-[0_0_15px_rgba(184,255,59,0.15)]">
          <span class="text-[#B8FF3B]">🔒</span>
          <span>Bóveda Wompi (Escrow)</span>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121A0E]/90 border border-[#B8FF3B]/30 shadow-[0_0_15px_rgba(184,255,59,0.15)]">
          <span class="text-[#B8FF3B]">📜</span>
          <span>48h Garantía Ley 1480</span>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121A0E]/90 border border-[#B8FF3B]/30 shadow-[0_0_15px_rgba(184,255,59,0.15)]">
          <span class="text-[#B8FF3B]">👩‍🔧</span>
          <span>Servicios por Ellas</span>
        </div>
      </div>
    </div>

    <!-- TARJETAS DE SELECCIÓN CINEMATOGRÁFICAS (PRO vs CLIENTE) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
      
      <!-- OPCIÓN A: SOY PROFESIONAL -->
      <div id="card-pro" onclick="selectRole('pro')" class="card-choice cinematic-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-[#24391E] relative overflow-hidden group cursor-pointer">
        <div class="absolute top-0 right-0 bg-[#B8FF3B]/15 text-[#B8FF3B] text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-bl-2xl border-l border-b border-[#B8FF3B]/30 shadow-[0_0_10px_rgba(184,255,59,0.2)]">
          🥇 Primeros 100 Cupos Oro
        </div>

        <div>
          <div class="w-14 h-14 rounded-2xl bg-[#080E06] border border-[#B8FF3B]/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:border-[#B8FF3B] transition-all shadow-[0_0_20px_rgba(184,255,59,0.2)]">
            🛠️
          </div>
          <h2 class="text-2xl font-bold text-white font-brand mb-2 flex items-center gap-2">
            Soy Profesional / Técnico
          </h2>
          <p class="text-xs sm:text-sm text-[#97A890] mb-5 leading-relaxed">
            Prestas servicios de plomería, electricidad, cerrajería, pintura o aseo a fondo y quieres más clientes garantizados en tu comuna sin regateos.
          </p>

          <ul class="space-y-3 text-xs text-[#E5F5E0] mb-6">
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
              <span><strong>Cero fiao:</strong> Clientes directos en tu misma comuna sin trancones</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#B8FF3B] font-bold text-sm">✓</span>
              <span><strong>Insignia Nivel Oro:</strong> Prioridad en el buscador durante enero</span>
            </li>
          </ul>
        </div>

        <button type="button" class="w-full py-4 px-4 rounded-full text-xs sm:text-sm font-extrabold font-brand tracking-normal transition bg-[#1A2E16] text-[#B8FF3B] border border-[#B8FF3B]/50 group-hover:bg-[#B8FF3B] group-hover:text-[#0C120A] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(184,255,59,0.15)]">
          <span>Registrarme como Profesional</span>
          <span>✦</span>
        </button>
      </div>

      <!-- OPCIÓN B: SOY CLIENTE -->
      <div id="card-cliente" onclick="selectRole('cliente')" class="card-choice cinematic-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-[#24391E] relative overflow-hidden group cursor-pointer">
        <div class="absolute top-0 right-0 bg-[#F59E0B]/15 text-[#FFFA70] text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-bl-2xl border-l border-b border-[#F59E0B]/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          🎁 Bono $15.000 COP Bienvenida
        </div>

        <div>
          <div class="w-14 h-14 rounded-2xl bg-[#080E06] border border-[#F59E0B]/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:border-[#F59E0B] transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            🏡
          </div>
          <h2 class="text-2xl font-bold text-white font-brand mb-2 flex items-center gap-2">
            Soy Cliente / Hogar
          </h2>
          <p class="text-xs sm:text-sm text-[#97A890] mb-5 leading-relaxed">
            Buscas expertos confiables, con antecedentes verificados y garantía real para reparaciones, mantenimiento o emergencias en tu hogar.
          </p>

          <ul class="space-y-3 text-xs text-[#E5F5E0] mb-6">
            <li class="flex items-center gap-2.5">
              <span class="text-[#FFFA70] font-bold text-sm">✓</span>
              <span><strong>Cero riesgo de anticipos:</strong> El técnico cobra solo cuando apruebes el trabajo</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#FFFA70] font-bold text-sm">✓</span>
              <span><strong>Acta Digital de Garantía 48h:</strong> Respaldo legal bajo la Ley 1480</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#FFFA70] font-bold text-sm">✓</span>
              <span><strong>Servicios por Ellas:</strong> Catálogo exclusivo de técnicas certificadas</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-[#FFFA70] font-bold text-sm">✓</span>
              <span><strong>Llegada Prioritaria:</strong> Auxilio rápido por solo +$3.333 COP</span>
            </li>
          </ul>
        </div>

        <button type="button" class="w-full py-4 px-4 rounded-full text-xs sm:text-sm font-extrabold font-brand tracking-normal transition bg-[#2A2312] text-[#FFFA70] border border-[#F59E0B]/50 group-hover:bg-[#F59E0B] group-hover:text-[#0C120A] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <span>Registrarme como Cliente</span>
          <span>✦</span>
        </button>
      </div>

    </div>
    
    `;

if (oldHeroRegex.test(html)) {
  html = html.replace(oldHeroRegex, newCinematicHero);
  fs.writeFileSync(registroPath, html, 'utf8');
  console.log('✅ Hero cinematográfico inyectado con éxito!');
} else {
  console.log('⚠️ No se encontró la expresión exacta del hero antiguo, revisando selectores...');
}
