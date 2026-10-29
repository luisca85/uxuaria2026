/* ===================================================================
   MUTIS UX — mutisux.js
   Mejora progresiva: sin JS la página se lee entera; la solicitud de acceso
   necesita JS por Turnstile (spec acc).
   =================================================================== */

(function () {
  'use strict';

  /* DOMINIO: único lugar en el JS. Ver también el comentario del <head>. */
  var SITE_URL = 'https://uxuaria.com/mutisux/';
  var SIGNUP_ENDPOINT = '/api/mutisux-beta';

  /* Turnstile (spec acc): mismo widget que la app; su lista de dominios tiene que
     incluir uxuaria.com. En local se usa la clave de prueba de Cloudflare, que siempre
     pasa (el servidor local usa la secreta de prueba: ver README). */
  var TURNSTILE_SITE_KEY = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
    ? '1x00000000000000000000AA'
    : '0x4AAAAAAFYiazrhjM8wUm7a';
  var TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* Mensajes que ve la persona. Las claves son los códigos que devuelve la API. */
  var MESSAGES = {
    nombre: 'Escribe tu nombre.',
    email: 'Escribe un email válido.',
    rol: 'Elige tu rol.',
    expectativa: 'Cuéntanos en pocas palabras qué esperas de Mutis UX.',
    consentimiento: 'Para pedir acceso, acepta la política de privacidad.',
    esperar: 'Espera a que termine el chequeo anti-robots.',
    turnstile: 'No pudimos verificar que no seas un robot. Prueba de nuevo.',
    turnstile_carga: 'No se pudo cargar el chequeo anti-robots. Revisa tu conexión y recarga la página.',
    no_configurado: 'La solicitud de acceso todavía no está abierta. Vuelve a intentarlo en unos días.',
    servidor: 'No pudimos guardar tu solicitud. Intenta de nuevo en unos minutos.',
    red: 'No hay conexión. Revisa tu internet e intenta de nuevo.'
  };

  /* -----------------------------------------------------------------
     Envío de la solicitud: la ÚNICA función que habla con el servidor
     (functions/api/mutisux-beta.js). Devuelve { ok, error }.
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

  /* Turnstile se carga recién cuando alguien apunta o enfoca un "Pide tu acceso" (o al
     abrir el modal), para no pesar en la carga de la página. */
  var turnstileLoad = null;
  function loadTurnstile() {
    if (!turnstileLoad) {
      turnstileLoad = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = TURNSTILE_SRC;
        s.async = true;
        s.onload = function () { resolve(window.turnstile); };
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    return turnstileLoad;
  }

  /* -----------------------------------------------------------------
     Formulario de solicitud de acceso, en un modal (<dialog>)
     Lo abren todos los links a #inscripcion y la URL con #inscripcion
     (el botón "Pedir acceso" de la app lleva a /mutisux/#inscripcion).
  ----------------------------------------------------------------- */
  function initSignup() {
    var form = document.getElementById('acceso-form');
    var modal = document.getElementById('acceso-modal');
    if (!form || !modal || typeof modal.showModal !== 'function' ||
        !window.fetch || !window.URLSearchParams || !window.Promise) return;

    var fields = {
      nombre: form.elements.nombre,
      email: form.elements.email,
      rol: form.elements.rol,
      expectativa: form.elements.expectativa,
      consentimiento: form.elements.consentimiento
    };
    var submit = form.querySelector('.acceso__boton');
    var status = document.getElementById('acceso-estado');
    var done = document.getElementById('acceso-listo');
    var widget = document.getElementById('acceso-turnstile');
    var submitLabel = submit.textContent;
    var token = '';
    var widgetId = null;

    function renderTurnstile() {
      if (widgetId !== null) return;
      widgetId = -1;
      loadTurnstile().then(function (ts) {
        widgetId = ts.render(widget, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'light',
          size: 'flexible',
          callback: function (t) { token = t; if (status.textContent === MESSAGES.esperar) setStatus(''); },
          'expired-callback': function () { token = ''; },
          'error-callback': function () { token = ''; }
        });
      }).catch(function () { setStatus(MESSAGES.turnstile_carga); });
    }
    function resetTurnstile() {
      token = '';
      if (window.turnstile && widgetId !== null && widgetId !== -1) window.turnstile.reset(widgetId);
    }

    function openModal() {
      if (!modal.open) modal.showModal();
      renderTurnstile();
    }
    function closeModal() {
      modal.close();
    }
    // Al cerrar se limpia #inscripcion de la URL: así volver a tocar el link lo reabre.
    modal.addEventListener('close', function () {
      if (location.hash === '#inscripcion') history.replaceState(null, '', location.pathname + location.search);
    });
    modal.querySelector('.acceso__cerrar').addEventListener('click', closeModal);
    // Tocar el fondo cierra (solo si el toque empezó y terminó afuera de la tarjeta).
    var downOnBackdrop = false;
    modal.addEventListener('pointerdown', function (e) { downOnBackdrop = e.target === modal; });
    modal.addEventListener('click', function (e) {
      if (downOnBackdrop && e.target === modal) closeModal();
      downOnBackdrop = false;
    });

    Array.prototype.forEach.call(document.querySelectorAll('a[href="#inscripcion"]'), function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        openModal();
      });
      link.addEventListener('pointerenter', function () { loadTurnstile().catch(function () {}); });
      link.addEventListener('focus', function () { loadTurnstile().catch(function () {}); });
    });
    window.addEventListener('hashchange', function () { if (location.hash === '#inscripcion') openModal(); });
    if (location.hash === '#inscripcion') openModal();

    function setError(name, message) {
      var input = fields[name];
      var error = document.getElementById(name === 'expectativa' ? 'acceso-expectativa-error' : input.getAttribute('aria-describedby'));
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

    function setStatus(message) {
      status.textContent = message || '';
    }

    function validate() {
      var errors = [];
      if (!fields.nombre.value.trim()) errors.push('nombre');
      if (!EMAIL_RE.test(fields.email.value.trim())) errors.push('email');
      if (!fields.rol.value) errors.push('rol');
      if (!fields.expectativa.value.trim()) errors.push('expectativa');
      if (!fields.consentimiento.checked) errors.push('consentimiento');
      Object.keys(fields).forEach(function (name) {
        setError(name, errors.indexOf(name) > -1 ? MESSAGES[name] : '');
      });
      return errors;
    }

    Object.keys(fields).forEach(function (name) {
      var input = fields[name];
      var evento = input.type === 'checkbox' || input.tagName === 'SELECT' ? 'change' : 'blur';
      input.addEventListener(evento, function () {
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
      if (!token) {
        renderTurnstile();
        setStatus(MESSAGES.esperar);
        return;
      }

      var email = fields.email.value.trim();
      submit.disabled = true;
      submit.textContent = 'Enviando…';

      sendSignup({
        nombre: fields.nombre.value.trim(),
        email: email,
        rol: fields.rol.value,
        expectativa: fields.expectativa.value.trim(),
        website: form.elements.website.value,
        consentimiento: fields.consentimiento.checked ? 'si' : '',
        turnstile: token
      }).then(function (result) {
        submit.disabled = false;
        submit.textContent = submitLabel;
        if (result.ok) {
          // La confirmación reemplaza al formulario dentro de la tarjeta y recibe el foco
          document.getElementById('acceso-listo-email').textContent = email;
          form.reset();
          form.hidden = true;
          done.hidden = false;
          done.focus();
          return;
        }
        // Un token de Turnstile sirve una sola vez: para reintentar hace falta otro.
        resetTurnstile();
        if (fields[result.error]) {
          setError(result.error, MESSAGES[result.error]);
          fields[result.error].focus();
          return;
        }
        setStatus(MESSAGES[result.error] || MESSAGES.servidor);
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
