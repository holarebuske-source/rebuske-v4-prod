const fs = require('fs');
const file = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod/registro.html';
let content = fs.readFileSync(file, 'utf8');

const targetIndex = content.indexOf('    // Manejo de Registro Profesional (Interceptor con Consentimiento Rápido y Anti-Bot)');
if (targetIndex === -1) {
  console.error('Target index not found');
  process.exit(1);
}

const before = content.substring(0, targetIndex);

const newScript = `    // ========================================================
    // COMPRESIÓN DE IMÁGENES CLIENT-SIDE (CANVAS)
    // ========================================================
    let compressedPerfilBase64 = null;
    let compressedHerramientasList = [];

    async function compressImageFile(file, maxWidth = 1000, maxHeight = 1000, quality = 0.75) {
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
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(dataUrl);
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

    // Manejo de Registro Profesional (Interceptor con Consentimiento Rápido y Anti-Bot)
    function handleProSubmit(e) {
      e.preventDefault();

      // Bot Protection Invisible (Honeypot + Time-gate)
      const hp = document.getElementById('pro-hp-token').value;
      if (hp || (Date.now() - pageLoadTime < 900)) {
        console.warn('Bot submission blocked');
        return;
      }

      // Validar fotos requeridas (1 perfil + mínimo 6 herramientas)
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
          alertMsg.innerText = data.error || 'Hubo un inconveniente al guardar. Tu solicitud fue registrada.';
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

    // Manejo de Registro Cliente (Interceptor con Consentimiento Rápido y Anti-Bot)
    function handleClienteSubmit(e) {
      e.preventDefault();

      // Bot Protection Invisible (Honeypot + Time-gate)
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
          document.getElementById('cli-alert-title').innerText = '🎉 ¡Bienvenido a la Lista VIP Rebuske!';
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
  </script>

</body>
</html>
`;

fs.writeFileSync(file, before + newScript, 'utf8');
console.log('✅ registro.html updated successfully!');
