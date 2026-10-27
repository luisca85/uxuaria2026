/* ===================================================================
   MUTIS UX — mutisux.js
   Mejora progresiva: sin JS la página funciona y el formulario hace un
   POST nativo a /api/mutisux-beta.
   =================================================================== */

(function () {
  'use strict';

  /* DOMINIO: único lugar en el JS. Ver también el comentario del <head>. */
  var SITE_URL = 'https://uxuaria.com/mutisux/';
  var SIGNUP_ENDPOINT = '/api/mutisux-beta';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* Mensajes que ve la persona. Las claves son los códigos que devuelve la API. */
  var MESSAGES = {
    nombre: 'Escribe tu nombre.',
    email: 'Escribe un correo válido, por ejemplo nombre@estudio.com.',
    consentimiento: 'Para anotarte, acepta la política de privacidad.',
    no_configurado: 'La inscripción todavía no está abierta. Vuelve a intentarlo en unos días.',
    servidor: 'No pudimos guardar tu inscripción. Intenta de nuevo en unos minutos.',
    red: 'No hay conexión. Revisa tu internet e intenta de nuevo.'
  };

  /* -----------------------------------------------------------------
     Envío de la inscripción: la ÚNICA función que habla con el servidor.
     Si cambia el destino (Brevo, la app u otro), solo cambia esto y
     functions/api/mutisux-beta.js. Devuelve { ok, error }.
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
    var done = document.getElementById('signup-done');
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
          // La confirmación reemplaza al formulario y recibe el foco
          form.reset();
          form.hidden = true;
          done.hidden = false;
          done.focus();
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
     Maquetas animadas: se arman una sola vez. Sin JS corren al cargar
     la página. Con JS esperan a entrar en pantalla y se pausan si salen
     a mitad de camino (.js-anim + .is-visible).
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
     aparecen las flechas a los lados (se apagan en los extremos: dar la
     vuelta movería el riel en sentido contrario al pedido) y un aviso
     para lectores de pantalla con la captura que se ve.
  ----------------------------------------------------------------- */
  function initCarousel() {
    var track = document.getElementById('carousel-track');
    var arrows = document.querySelectorAll('.carousel__arrow');
    var status = document.getElementById('carousel-status');
    if (!track || !arrows.length) return;

    var slides = track.querySelectorAll('.carousel__slide');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = 0;

    // aria-disabled en lugar de disabled: la flecha conserva el foco del teclado
    function updateArrows() {
      Array.prototype.forEach.call(arrows, function (arrow) {
        var dir = Number(arrow.getAttribute('data-dir'));
        var atEnd = dir < 0 ? current === 0 : current === slides.length - 1;
        arrow.setAttribute('aria-disabled', atEnd ? 'true' : 'false');
      });
    }

    function setCurrent(index) {
      current = index;
      updateArrows();
      if (status) status.textContent = 'Captura ' + slides[index].getAttribute('aria-label');
    }

    function goTo(index) {
      if (index < 0 || index >= slides.length) return;
      track.scrollTo({ left: slides[index].offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
      setCurrent(index);
    }

    Array.prototype.forEach.call(arrows, function (arrow) {
      arrow.addEventListener('click', function () { goTo(current + Number(arrow.getAttribute('data-dir'))); });
      arrow.hidden = false;
    });
    updateArrows();

    // Al deslizar con el dedo, el trackpad o el teclado, la captura actual se
    // fija cuando el riel se detiene. Leerla a mitad del desplazamiento la
    // devolvía a la anterior mientras las flechas animaban el riel.
    function syncFromScroll() {
      var index = Math.round(track.scrollLeft / track.clientWidth);
      if (index !== current && index >= 0 && index < slides.length) setCurrent(index);
    }
    if ('onscrollend' in window) {
      track.addEventListener('scrollend', syncFromScroll);
    } else {
      var timer = null;
      track.addEventListener('scroll', function () {
        clearTimeout(timer);
        timer = setTimeout(syncFromScroll, 150);
      }, { passive: true });
    }
  }

  document.documentElement.classList.add('js');
  initMockups();
  initCarousel();
  initSignup();

  /* Disponible para depurar desde la consola. */
  window.MutisUX = { SITE_URL: SITE_URL };
})();
