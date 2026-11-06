/**
 * ============================================================================
 * INTEGRACIÓN DE LOS 3 MÓDULOS APROBADOS POR CANASHI EN REGISTRO.HTML
 * ============================================================================
 * 1. Píldoras "Modo Familiar" & "Código QR en Puerta" en tarjeta/vista Cliente.
 * 2. Mini-Simulador de Bolsillo (93% vs 70%) & Certificado de Ingresos en Profesional.
 * 3. Acordeón Desplegable de "Protocolo de Seguridad y Garantías" antes del footer.
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';

const REG_PATH = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/registro.html';
let html = fs.readFileSync(REG_PATH, 'utf8');

// 1. Modificar la lista de beneficios en card-cliente
const oldClientUl = `<ul class="space-y-3 text-xs text-[#E5F5E0] mb-6">
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
          </ul>`;

const newClientUl = `<ul class="space-y-3 text-xs text-[#E5F5E0] mb-6">
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
          </ul>`;

if (!html.includes(oldClientUl)) {
  console.error('❌ No se encontró oldClientUl');
} else {
  html = html.replace(oldClientUl, newClientUl);
  console.log('✅ 1. Actualizada lista de beneficios en card-cliente');
}

// 2. Modificar la lista de beneficios en card-pro para incluir Certificado de Ingresos
const oldProUl = `<ul class="space-y-3 text-xs text-[#E5F5E0] mb-6">
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
          </ul>`;

const newProUl = `<ul class="space-y-3 text-xs text-[#E5F5E0] mb-6">
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
          </ul>`;

if (!html.includes(oldProUl)) {
  console.error('❌ No se encontró oldProUl');
} else {
  html = html.replace(oldProUl, newProUl);
  console.log('✅ 2. Actualizada lista de beneficios en card-pro');
}

// 3. Insertar Mini-Simulador de Bolsillo en view-pro (justo después del aviso de promoción temporal)
const targetPromoMes1 = `            <!-- AVISO DE PROMOCIÓN TEMPORAL MES 1 -->
            <div class="p-3 rounded-xl bg-[#1A2E16] border border-[#B8FF3B]/50 flex items-start gap-2.5 text-xs text-[#E5F5E0] mb-4">
              <span class="text-lg">👑</span>
              <div>
                <strong class="text-[#B8FF3B] block font-brand text-sm">Promoción Temporal Exclusiva · Primer Mes (Solo 100 Cupos)</strong>
                <p class="text-[11px] text-[#C4DDC1] leading-relaxed">
                  Los primeros 100 profesionales registrados operarán al <strong>1% de comisión</strong> durante sus primeros 30 días (¡99% neto para ti!). Finalizado el primer mes, el sistema implementará la nueva promoción vigente o activará tu escala de placa ganada (Bronce 9%, Plata 8%, Oro 7%).
                </p>
              </div>
            </div>`;

const miniSimuladorHtml = `            <!-- AVISO DE PROMOCIÓN TEMPORAL MES 1 -->
            <div class="p-3 rounded-xl bg-[#1A2E16] border border-[#B8FF3B]/50 flex items-start gap-2.5 text-xs text-[#E5F5E0] mb-4">
              <span class="text-lg">👑</span>
              <div>
                <strong class="text-[#B8FF3B] block font-brand text-sm">Promoción Temporal Exclusiva · Primer Mes (Solo 100 Cupos)</strong>
                <p class="text-[11px] text-[#C4DDC1] leading-relaxed">
                  Los primeros 100 profesionales registrados operarán al <strong>1% de comisión</strong> durante sus primeros 30 días (¡99% neto para ti!). Finalizado el primer mes, el sistema implementará la nueva promoción vigente o activará tu escala de placa ganada (Bronce 9%, Plata 8%, Oro 7%).
                </p>
              </div>
            </div>

            <!-- MINI-SIMULADOR DE BOLSILLO INTERACTIVO (CANASHI) -->
            <div class="p-4 rounded-2xl bg-[#091107] border border-[#B8FF3B]/30 mb-5 relative overflow-hidden">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-lg">👛</span>
                  <h4 class="text-xs sm:text-sm font-bold text-white font-brand">Mini-Simulador de Bolsillo</h4>
                </div>
                <span class="text-[10px] uppercase font-bold text-[#B8FF3B] px-2 py-0.5 rounded-full bg-[#B8FF3B]/10 border border-[#B8FF3B]/30">¿Cuánto te queda?</span>
              </div>
              <p class="text-[11px] text-[#97A890] mb-3 leading-snug">
                Compara lo que te queda en el bolsillo en <b>rebuske</b> frente a las plataformas tradicionales que retienen entre el 25% y 30%:
              </p>

              <!-- Botones de valores rápidos -->
              <div class="grid grid-cols-3 gap-2 mb-3">
                <button type="button" onclick="setPocketSim(100000)" id="btn-sim-100" class="sim-btn py-2 px-1 rounded-xl text-xs font-bold transition text-center bg-[#1A2E16] text-[#B8FF3B] border border-[#B8FF3B]">
                  $100.000 COP
                </button>
                <button type="button" onclick="setPocketSim(350000)" id="btn-sim-350" class="sim-btn py-2 px-1 rounded-xl text-xs font-bold transition text-center bg-[#0C120A] text-[#97A890] border border-[#24391E] hover:border-[#B8FF3B]/40">
                  $350.000 COP
                </button>
                <button type="button" onclick="setPocketSim(800000)" id="btn-sim-800" class="sim-btn py-2 px-1 rounded-xl text-xs font-bold transition text-center bg-[#0C120A] text-[#97A890] border border-[#24391E] hover:border-[#B8FF3B]/40">
                  $800.000 COP
                </button>
              </div>

              <!-- Resultados de Comparativa -->
              <div class="grid grid-cols-2 gap-2 text-center">
                <div class="p-2.5 rounded-xl bg-[#140E0A] border border-[#EF4444]/30">
                  <span class="text-[10px] text-[#F87171] uppercase font-bold block">Apps Tradicionales (70%)</span>
                  <span id="sim-tradicional-val" class="text-sm sm:text-base font-extrabold text-[#FCA5A5] font-mono">$70.000 COP</span>
                  <small class="text-[9px] text-[#A67C7C] block mt-0.5">Te quitan el 30% ($30.000)</small>
                </div>
                <div class="p-2.5 rounded-xl bg-[#101D0E] border border-[#B8FF3B]/50 shadow-[0_0_15px_rgba(184,255,59,0.15)]">
                  <span class="text-[10px] text-[#B8FF3B] uppercase font-extrabold block">En rebuske Oro (93%)</span>
                  <span id="sim-rebuske-val" class="text-sm sm:text-base font-extrabold text-[#B8FF3B] font-mono">$93.000 COP</span>
                  <small id="sim-diff-val" class="text-[9px] text-[#D9FF8B] font-bold block mt-0.5">+ $23.000 COP extra para ti</small>
                </div>
              </div>

              <div class="mt-3 pt-2.5 border-t border-[#24391E] flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-[#A4BEA0]">
                <span>🎉 <b>Primer mes (1% Fundador):</b> <span id="sim-mes1-val" class="text-[#FFFA70] font-black">$99.000 COP netos</span></span>
                <span class="flex items-center gap-1 text-[#C6D8BF]">📄 Certificado formal de ingresos en 1 clic</span>
              </div>
            </div>`;

if (!html.includes(targetPromoMes1)) {
  console.error('❌ No se encontró targetPromoMes1');
} else {
  html = html.replace(targetPromoMes1, miniSimuladorHtml);
  console.log('✅ 3. Insertado Mini-Simulador de Bolsillo en view-pro');
}

// 4. Insertar píldoras de Modo Familiar y QR en view-cliente
const targetClientTerms = `<div class="p-4 rounded-2xl bg-[#141006] border border-[#423114] text-xs text-[#D8C7A5] space-y-1">
            <span class="font-bold text-[#F59E0B] flex items-center gap-1.5">
              <span>🎁</span> Términos del Bono de Bienvenida
            </span>
            <p>El bono de $15.000 COP aplica en tu primer servicio igual o superior a $90.000 COP con 0% de comisión para la app. Recibirás tu confirmación de inmediato por correo.</p>
          </div>`;

const newClientTerms = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
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

          <div class="p-4 rounded-2xl bg-[#141006] border border-[#423114] text-xs text-[#D8C7A5] space-y-1">
            <span class="font-bold text-[#F59E0B] flex items-center gap-1.5">
              <span>🎁</span> Términos del Bono de Bienvenida
            </span>
            <p>El bono de $15.000 COP aplica en tu primer servicio igual o superior a $90.000 COP con 0% de comisión para la app. Recibirás tu confirmación de inmediato por correo.</p>
          </div>`;

if (!html.includes(targetClientTerms)) {
  console.error('❌ No se encontró targetClientTerms');
} else {
  html = html.replace(targetClientTerms, newClientTerms);
  console.log('✅ 4. Insertadas píldoras Modo Familiar y QR en view-cliente');
}

// 5. Insertar Acordeón Desplegable antes del cierre de </main>
const targetTrustSection = `    <!-- SECCIÓN DE CONFIANZA Y PREGUNTAS FRECUENTES -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <div class="p-6 rounded-2xl bg-[#121A0E] border border-[#24391E]">
        <div class="text-2xl mb-2">🔒</div>
        <h4 class="text-sm font-bold text-white mb-1">Pagos en Bóveda Wompi</h4>
        <p class="text-xs text-[#97A890]">El dinero se retiene de forma segura y solo se libera cuando el trabajo queda terminado a satisfacción.</p>
      </div>
      <div class="p-6 rounded-2xl bg-[#121A0E] border border-[#24391E]">
        <div class="text-2xl mb-2">🛡️</div>
        <h4 class="text-sm font-bold text-white mb-1">Garantía Legal de 48h</h4>
        <p class="text-xs text-[#97A890]">Si surge cualquier imprevisto técnico, el profesional regresa sin costo adicional bajo la Ley 1480.</p>
      </div>
      <div class="p-6 rounded-2xl bg-[#121A0E] border border-[#24391E]">
        <div class="text-2xl mb-2">⚡</div>
        <h4 class="text-sm font-bold text-white mb-1">Modo Luz Express</h4>
        <p class="text-xs text-[#97A890]">Atención prioritaria en menos de 35 minutos para cerrajería urgente, plomería crítica o despinche.</p>
      </div>
    </div>

  </main>`;

const newAccordionSection = `    <!-- SECCIÓN DE CONFIANZA Y PREGUNTAS FRECUENTES -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <div class="p-6 rounded-2xl bg-[#121A0E] border border-[#24391E]">
        <div class="text-2xl mb-2">🔒</div>
        <h4 class="text-sm font-bold text-white mb-1">Pagos en Bóveda Wompi</h4>
        <p class="text-xs text-[#97A890]">El dinero se retiene de forma segura y solo se libera cuando el trabajo queda terminado a satisfacción.</p>
      </div>
      <div class="p-6 rounded-2xl bg-[#121A0E] border border-[#24391E]">
        <div class="text-2xl mb-2">🛡️</div>
        <h4 class="text-sm font-bold text-white mb-1">Garantía Legal de 48h</h4>
        <p class="text-xs text-[#97A890]">Si surge cualquier imprevisto técnico, el profesional regresa sin costo adicional bajo la Ley 1480.</p>
      </div>
      <div class="p-6 rounded-2xl bg-[#121A0E] border border-[#24391E]">
        <div class="text-2xl mb-2">⚡</div>
        <h4 class="text-sm font-bold text-white mb-1">Modo Luz Express</h4>
        <p class="text-xs text-[#97A890]">Atención prioritaria en menos de 35 minutos para cerrajería urgente, plomería crítica o despinche.</p>
      </div>
    </div>

    <!-- ========================================================= -->
    <!-- MÓDULO 3: PROTOCOLO DE SEGURIDAD Y GARANTÍAS (CANASHI)    -->
    <!-- Acordeón Desplegable en Cristal Cinemático                -->
    <!-- ========================================================= -->
    <div class="mt-14 max-w-4xl mx-auto">
      <div class="text-center mb-6">
        <span class="text-[11px] uppercase tracking-widest text-[#B8FF3B] font-bold px-3 py-1 rounded-full bg-[#B8FF3B]/10 border border-[#B8FF3B]/30">Transparencia y Respaldo Jurídico</span>
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
                <b class="text-sm font-bold text-white block font-brand">1. Bóveda Wompi (Custodia Bancaria Escrow)</b>
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
                <b class="text-sm font-bold text-white block font-brand">2. Cero Efectivo (Prohibición Total en Domicilio)</b>
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
                <b class="text-sm font-bold text-white block font-brand">3. Peritaje Técnico Imparcial en Caso de Inconformidad</b>
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
                <b class="text-sm font-bold text-white block font-brand">4. Acta Digital de Garantía de 48h en PDF (Ley 527 de 1999)</b>
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

  </main>`;

if (!html.includes(targetTrustSection)) {
  console.error('❌ No se encontró targetTrustSection');
} else {
  html = html.replace(targetTrustSection, newAccordionSection);
  console.log('✅ 5. Insertado Acordeón de Seguridad y Garantías');
}

// 6. Agregar funciones JS para el Mini-Simulador y el Acordeón
const scriptAnchor = `    // Modal de Consentimiento Rápido`;

const newJsCode = `    // ========================================================
    // LÓGICA DEL MINI-SIMULADOR DE BOLSILLO (CANASHI)
    // ========================================================
    function setPocketSim(amount) {
      const tradVal = Math.round(amount * 0.70);
      const rebVal = Math.round(amount * 0.93);
      const mes1Val = Math.round(amount * 0.99);
      const diffVal = rebVal - tradVal;

      const fmt = (n) => '$' + n.toLocaleString('es-CO') + ' COP';

      const elTrad = document.getElementById('sim-tradicional-val');
      const elReb = document.getElementById('sim-rebuske-val');
      const elMes1 = document.getElementById('sim-mes1-val');
      const elDiff = document.getElementById('sim-diff-val');

      if (elTrad) elTrad.textContent = fmt(tradVal);
      if (elReb) elReb.textContent = fmt(rebVal);
      if (elMes1) elMes1.textContent = fmt(mes1Val) + ' netos';
      if (elDiff) elDiff.textContent = '+ ' + fmt(diffVal) + ' extra para ti';

      // Actualizar estado activo en botones
      ['100', '350', '800'].forEach((v) => {
        const btn = document.getElementById('btn-sim-' + v);
        if (btn) {
          if (parseInt(v) * 1000 === amount) {
            btn.className = 'sim-btn py-2 px-1 rounded-xl text-xs font-bold transition text-center bg-[#1A2E16] text-[#B8FF3B] border border-[#B8FF3B]';
          } else {
            btn.className = 'sim-btn py-2 px-1 rounded-xl text-xs font-bold transition text-center bg-[#0C120A] text-[#97A890] border border-[#24391E] hover:border-[#B8FF3B]/40';
          }
        }
      });
    }

    // ========================================================
    // LÓGICA DEL ACORDEÓN DE SEGURIDAD Y GARANTÍAS (CANASHI)
    // ========================================================
    function toggleAcordeon(id) {
      const el = document.getElementById(id);
      const icon = document.getElementById('icon-' + id);
      if (!el) return;

      const isHidden = el.classList.contains('hidden');

      // Cerrar los otros para mantenerlo limpio
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

    // Modal de Consentimiento Rápido`;

if (!html.includes(scriptAnchor)) {
  console.error('❌ No se encontró scriptAnchor');
} else {
  html = html.replace(scriptAnchor, newJsCode);
  console.log('✅ 6. Agregadas funciones JavaScript de simulación y acordeón');
}

fs.writeFileSync(REG_PATH, html, 'utf8');
console.log('🎉 REGISTRO.HTML ACTUALIZADO CON ÉXITO CON LOS 3 MÓDULOS.');
