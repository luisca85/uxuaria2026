// Contact form: validates, sends to Web3Forms from the browser and tracks the conversion
(function () {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');
  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const messages = {
    empty: 'Completa este campo.',
    select: 'Selecciona una opción.',
    email: 'Escribe un email válido.',
  };

  function fieldProblem(field) {
    const value = field.value.trim();
    if (!value) return field.tagName === 'SELECT' ? messages.select : messages.empty;
    if (field.type === 'email' && !emailRegex.test(value)) return messages.email;
    return '';
  }

  function setFieldError(field, message) {
    const wrapper = field.closest('.contact-field');
    let note = wrapper.querySelector('.contact-field__error');
    if (!message) {
      if (note) note.remove();
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
      return;
    }
    if (!note) {
      note = document.createElement('p');
      note.className = 'contact-field__error';
      note.id = `${field.id}-error`;
      wrapper.appendChild(note);
    }
    note.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', note.id);
  }

  form.querySelectorAll('[required]').forEach((field) => {
    const recheck = () => { if (field.hasAttribute('aria-invalid')) setFieldError(field, fieldProblem(field)); };
    field.addEventListener('input', recheck);
    field.addEventListener('change', recheck);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formError.hidden = true;

    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach((field) => {
      const problem = fieldProblem(field);
      setFieldError(field, problem);
      if (problem && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const button = form.querySelector('.contact-form__submit');
    const buttonText = button.textContent;
    button.textContent = 'Enviando…';
    button.disabled = true;

    const data = {
      nombre: document.getElementById('nombre').value.trim(),
      email: document.getElementById('email').value.trim(),
      tipoProyecto: document.getElementById('tipo-proyecto').value,
      etapa: document.getElementById('etapa').value,
      problema: document.getElementById('problema').value.trim(),
      comoLlegaste: document.getElementById('como-llegaste').value,
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '7ecf21c6-65f3-4f53-99d0-9d4257a15c6b',
        subject: `Nuevo contacto Uxuaria: ${data.nombre}`,
        from_name: 'Formulario Uxuaria',
        name: data.nombre,
        email: data.email,
        message: `Tipo de proyecto: ${data.tipoProyecto}\nEtapa: ${data.etapa}\nCómo llegó: ${data.comoLlegaste}\n\nMensaje:\n${data.problema}`,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Error ${response.status}`);
        form.hidden = true;
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (typeof window.uxuariaTrack === 'function') {
          window.uxuariaTrack('form_submit', { form_id: 'contacto_principal', tipo_proyecto: data.tipoProyecto });
          // Conversion: the contact form was sent
          window.uxuariaTrack('generate_lead', { form_id: 'contacto_principal', tipo_proyecto: data.tipoProyecto });
        }
      })
      .catch(() => {
        button.textContent = buttonText;
        button.disabled = false;
        formError.textContent = 'No se pudo enviar el mensaje. Prueba de nuevo o escríbeme a info@uxuaria.com.';
        formError.hidden = false;
      });
  });
})();
