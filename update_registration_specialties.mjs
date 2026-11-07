import fs from 'fs';
import path from 'path';

const baseDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

const proOptions = `                <option value="">Selecciona tu especialidad...</option>
                <option value="limpieza">1. Limpieza y Aseo</option>
                <option value="plomeria">2. Plomería & Redes Hidráulicas</option>
                <option value="electricidad">3. Electricidad Residencial</option>
                <option value="pintura">4. Pintura y Acabados</option>
                <option value="carpinteria">5. Carpintería & Mobiliario</option>
                <option value="cerrajeria">6. Cerrajería & Seguridad</option>
                <option value="jardineria">7. Jardinería & Exteriores</option>
                <option value="construccion">8. Construcción & Remodelación</option>
                <option value="mudanzas">9. Mudanzas & Transporte</option>
                <option value="electrodomesticos">10. Electrodomésticos & Gasodomésticos</option>
                <option value="tecnologia">11. Tecnología & Cámaras CCTV</option>
                <option value="automoviles">12. Automóviles & Mecánica Ligera</option>
                <option value="digital">13. Diseño, Web & Servicios Digitales</option>
                <option value="educacion">14. Clases Particulares & Música</option>
                <option value="belleza">15. Belleza & Cuidado Personal</option>
                <option value="eventos">16. Eventos, Catering & Fotografía</option>
                <option value="profesional">17. Servicios Profesionales & Legal</option>`;

['registro-tecnico.html', 'registro/tecnico.html'].forEach(f => {
  const p = path.join(baseDir, f);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');

  content = content.replace(
    /<select id="pro_oficio" required onchange="validarCampoIndividual\(this, 'grp-pro-oficio'\)">[\s\S]*?<\/select>/,
    `<select id="pro_oficio" required onchange="validarCampoIndividual(this, 'grp-pro-oficio')">\n${proOptions}\n              </select>`
  );

  fs.writeFileSync(p, content, 'utf8');
  console.log(`✅ ${f}: actualizado con las 17 especialidades.`);
});

const cliOptions = `              <option value="">Selecciona una especialidad...</option>
              <option value="limpieza">1. Limpieza y Aseo</option>
              <option value="plomeria">2. Plomería</option>
              <option value="electricidad">3. Electricidad</option>
              <option value="pintura">4. Pintura y Acabados</option>
              <option value="carpinteria">5. Carpintería</option>
              <option value="cerrajeria">6. Cerrajería y Seguridad</option>
              <option value="jardineria">7. Jardinería y Exteriores</option>
              <option value="construccion">8. Construcción y Remodelación</option>
              <option value="mudanzas">9. Mudanzas y Transporte</option>
              <option value="electrodomesticos">10. Electrodomésticos</option>
              <option value="tecnologia">11. Tecnología e Instalación</option>
              <option value="automoviles">12. Automóviles</option>
              <option value="digital">13. Diseño y Servicios Digitales</option>
              <option value="educacion">14. Clases y Educación (Música, Idiomas, Refuerzo)</option>
              <option value="belleza">15. Belleza y Cuidado Personal</option>
              <option value="eventos">16. Eventos y Celebraciones</option>
              <option value="profesional">17. Servicios Profesionales</option>
              <option value="varios">Varios servicios del hogar</option>`;

['registro-cliente.html', 'registro/cliente.html'].forEach(f => {
  const p = path.join(baseDir, f);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');

  content = content.replace(
    /<select id="cli_servicios" required onchange="validarCampoCli\(this, 'grp-cli-servicio'\)">[\s\S]*?<\/select>/,
    `<select id="cli_servicios" required onchange="validarCampoCli(this, 'grp-cli-servicio')">\n${cliOptions}\n            </select>`
  );

  fs.writeFileSync(p, content, 'utf8');
  console.log(`✅ ${f}: actualizado con las 17 categorías.`);
});
