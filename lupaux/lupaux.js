/* ===================================================================
   LUPA UX — lupaux.js
   Mejora progresiva: sin JS la página funciona y el formulario hace un
   POST nativo a /api/lupaux-beta.
   =================================================================== */

(function () {
  'use strict';

  /* DOMINIO: único lugar en el JS. Ver también el comentario del <head>. */
  var SITE_URL = 'https://uxuaria.com/lupaux/';
  var SIGNUP_ENDPOINT = '/api/lupaux-beta';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* Mensajes que ve la persona. Las claves son los códigos que devuelve la API. */
  var MESSAGES = {
    nombre: 'Escribe tu nombre.',
    email: 'Escribe un correo válido, por ejemplo nombre@estudio.com.',
    consentimiento: 'Para anotarte, acepta la política de privacidad.',
    no_configurado: 'La inscripción todavía no está abierta. Vuelve a intentarlo en unos días.',
    servidor: 'No pudimos guardar tu inscripción. Intenta de nuevo en unos minutos.',
    red: 'No hay conexión. Revisa tu internet e intenta de nuevo.',
    ok: 'Listo, ya estás en la lista. Te escribimos cuando te toque tu acceso.'
  };

  /* -----------------------------------------------------------------
     Envío de la inscripción: la ÚNICA función que habla con el servidor.
     Si cambia el destino (Brevo, la app u otro), solo cambia esto y
     functions/api/lupaux-beta.js. Devuelve { ok, error }.
  ----------------------------------------------------------------- */
  function sendSignup(data) {
    var body = new URLSearchParams(data);
    return fetch(SIGNUP_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: body
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (json) {
          if (res.ok && json.ok) return { ok: true };
          return { ok: false, error: json.error || 'servidor' };
        });
      })
      .catch(function () { return { ok: false, error: 'red' }; });
  }

  /* -----------------------------------------------------------------
     Formulario de inscripción
  ----------------------------------------------------------------- */
  function initSignup() {
    var form = document.getElementById('inscripcion');
    if (!form || !window.fetch || !window.URLSearchParams) return;

    var fields = {
      nombre: form.elements.nombre,
      email: form.elements.email,
      consentimiento: form.elements.consentimiento
    };
    var submit = form.querySelector('.signup__submit');
    var status = document.getElementById('signup-status');
    var submitLabel = submit.textContent;

    function setError(name, message) {
      var input = fields[name];
      var error = document.getElementById(input.getAttribute('aria-describedby'));
      if (message) {
        input.setAttribute('aria-invalid', 'true');
        error.textContent = message;
        error.hidden = false;
      } else {
        input.removeAttribute('aria-invalid');
        error.textContent = '';
        error.hidden = true;
      }
    }

    function setStatus(message, type) {
      status.textContent = message || '';
      status.className = 'signup__status' + (type ? ' signup__status--' + type : '');
    }

    function validate() {
      var errors = [];
      if (!fields.nombre.value.trim()) errors.push('nombre');
      if (!EMAIL_RE.test(fields.email.value.trim())) errors.push('email');
      if (!fields.consentimiento.checked) errors.push('consentimiento');
      Object.keys(fields).forEach(function (name) {
        setError(name, errors.indexOf(name) > -1 ? MESSAGES[name] : '');
      });
      return errors;
    }

    Object.keys(fields).forEach(function (name) {
      var input = fields[name];
      input.addEventListener(input.type === 'checkbox' ? 'change' : 'blur', function () {
        if (input.getAttribute('aria-invalid') === 'true') validate();
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      setStatus('');
      var errors = validate();
      if (errors.length) {
        fields[errors[0]].focus();
        return;
      }

      submit.disabled = true;
      submit.textContent = 'Enviando…';

      sendSignup({
        nombre: fields.nombre.value.trim(),
        email: fields.email.value.trim(),
        tipo: form.elements.tipo.value.trim(),
        website: form.elements.website.value,
        consentimiento: fields.consentimiento.checked ? 'si' : ''
      }).then(function (result) {
        submit.disabled = false;
        submit.textContent = submitLabel;
        if (result.ok) {
          form.reset();
          setStatus(MESSAGES.ok, 'ok');
          return;
        }
        if (fields[result.error]) {
          setError(result.error, MESSAGES[result.error]);
          fields[result.error].focus();
          return;
        }
        setStatus(MESSAGES[result.error] || MESSAGES.servidor, 'error');
      });
    });
  }

  /* -----------------------------------------------------------------
     Maquetas animadas: sin JS se animan siempre. Con JS empiezan al
     entrar en pantalla y se pausan al salir (.js-anim + .is-visible).
  ----------------------------------------------------------------- */
  function initMockups() {
    var mockups = document.querySelectorAll('.mockup, .app-frame');
    if (!mockups.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.25 });

    document.documentElement.classList.add('js-anim');
    Array.prototype.forEach.call(mockups, function (mockup) { observer.observe(mockup); });
  }

  /* -----------------------------------------------------------------
     Carrusel de capturas: sin JS es un riel que se desliza solo. Con JS
     aparecen las flechas a los lados (dan la vuelta al llegar al final)
     y un aviso para lectores de pantalla con la captura que se ve.
  ----------------------------------------------------------------- */
  function initCarousel() {
    var track = document.getElementById('carousel-track');
    var arrows = document.querySelectorAll('.carousel__arrow');
    var status = document.getElementById('carousel-status');
    if (!track || !arrows.length) return;

    var slides = track.querySelectorAll('.carousel__slide');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = 0;

    function setCurrent(index) {
      current = index;
      if (status) status.textContent = 'Captura ' + slides[index].getAttribute('aria-label');
    }

    function goTo(index) {
      var target = (index + slides.length) % slides.length;
      track.scrollTo({ left: slides[target].offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
      setCurrent(target);
    }

    Array.prototype.forEach.call(arrows, function (arrow) {
      arrow.addEventListener('click', function () { goTo(current + Number(arrow.getAttribute('data-dir'))); });
      arrow.hidden = false;
    });

    // Al deslizar con el dedo, el trackpad o el teclado, se actualiza la captura actual.
    var frame = null;
    track.addEventListener('scroll', function () {
      if (frame) return;
      frame = window.requestAnimationFrame(function () {
        frame = null;
        var index = Math.round(track.scrollLeft / track.clientWidth);
        if (index !== current && index >= 0 && index < slides.length) setCurrent(index);
      });
    }, { passive: true });
  }

  document.documentElement.classList.add('js');
  initMockups();
  initCarousel();
  initSignup();

  /* Disponible para depurar desde la consola. */
  window.LupaUX = { SITE_URL: SITE_URL };
})();
