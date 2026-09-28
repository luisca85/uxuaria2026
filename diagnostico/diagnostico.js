/* ===================================================================
   UXUARIA — diagnostico.js
   Funnel del diagnóstico AI MVP Rescue, estilo Typeform:
   una pregunta por pantalla, navegable con teclado.
   Envía JSON a /api/diagnostico y, si sale bien, redirige a /diagnostico/gracias.
   =================================================================== */
(function () {
  var form = document.getElementById('tfForm');
  if (!form) return;

  var steps     = Array.prototype.slice.call(form.querySelectorAll('.tf-step'));
  var progress  = document.getElementById('tfProgress');
  var navPrev   = document.querySelector('.tf-nav [data-action="prev"]');
  var navNext   = document.querySelector('.tf-nav [data-action="next"]');
  var submitBtn = form.querySelector('.tf-btn--submit');
  var lastIndex = steps.length - 1;
  var qs        = new URLSearchParams(window.location.search);
  var EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var URL_RE    = /\.[a-z]{2,}/i;
  var ADVANCE_DELAY = 550;

  var current = 0;
  var locked  = false;
  var done    = false;
  var sending = false;
  var startedAt = 0;
  var ctaId   = qs.get('cta') || 'sin_id';

  document.documentElement.classList.add('is-enhanced'); // usually already set in <head>

  function track(eventName, params) {
    if (typeof gtag === 'function') gtag('event', eventName, params || {});
    else if (window.dataLayer) window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
  }

  // ----- Rendering -----
  function show(active) {
    steps.forEach(function (step, idx) {
      var isActive = step === active;
      step.classList.toggle('is-active', isActive);
      step.classList.toggle('is-above', idx < current);
      step.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      if ('inert' in step) step.inert = !isActive;
    });
    window.setTimeout(function () {
      var target = active.querySelector('.tf-input, .tf-choice input:checked, .tf-choice input, .tf-btn');
      if (target) target.focus({ preventScroll: true });
    }, 60);
  }

  function render() {
    show(steps[current]);
    progress.style.width = (Math.max(current - 1, 0) / lastIndex) * 100 + '%';
    navPrev.disabled = current === 0;
    navNext.disabled = current === lastIndex;
  }

  function goTo(index) {
    if (done || locked || index < 0 || index > lastIndex || index === current) return;
    current = index;
    render();
  }

  function next() {
    if (done) return;
    if (current === lastIndex) { submit(); return; }
    if (!validate(steps[current])) return;
    if (current === 0 && !startedAt) {
      startedAt = Date.now();
      track('form_start', { form: 'ai_mvp_rescue', cta_id: ctaId });
    } else if (current > 0) {
      track('form_step', { form: 'ai_mvp_rescue', step: steps[current].dataset.step });
    }
    goTo(current + 1);
  }

  function prev() { goTo(current - 1); }

  // ----- Validation -----
  function showError(step, message) {
    var error = step.querySelector('.tf-error');
    if (!error) return;
    error.innerHTML = message;
    error.classList.remove('is-visible');
    void error.offsetWidth; // restart shake animation
    error.classList.add('is-visible');
  }

  function clearError(step) {
    var error = step.querySelector('.tf-error');
    if (error) error.classList.remove('is-visible');
  }

  function validate(step) {
    var input = step.querySelector('.tf-input');
    if (input) {
      var value = input.value.trim();
      if (input.required && !value) { showError(step, 'Por favor completá este campo'); return false; }
      if (value && input.type === 'email' && !EMAIL_RE.test(value)) { showError(step, 'Hmm… ese email no parece válido'); return false; }
      if (value && input.dataset.validate === 'url' && !URL_RE.test(value)) { showError(step, 'Escribí la dirección completa, por ejemplo miapp.com'); return false; }
    }
    var group = step.querySelector('.tf-fieldset[data-required]');
    if (group && !group.querySelector('input:checked')) { showError(step, 'Elegí una opción'); return false; }
    clearError(step);
    return true;
  }

  // ----- Choices: blink + auto-advance -----
  function pickChoice(choice) {
    choice.querySelector('input').checked = true;
    clearError(choice.closest('.tf-step'));
    choice.classList.remove('is-blinking');
    void choice.offsetWidth;
    choice.classList.add('is-blinking');
    locked = true;
    window.setTimeout(function () {
      locked = false;
      choice.classList.remove('is-blinking');
      next();
    }, ADVANCE_DELAY);
  }

  form.addEventListener('click', function (e) {
    var choice = e.target.closest('.tf-choice');
    if (choice) {
      e.preventDefault();
      if (!locked) pickChoice(choice);
      return;
    }
    if (e.target.closest('[data-action="next"]')) next();
  });

  navPrev.addEventListener('click', prev);
  navNext.addEventListener('click', next);

  // ----- Personalization -----
  var nameInput = document.getElementById('diag-nombre');
  var greeting  = form.querySelector('[data-greeting]');
  nameInput.addEventListener('input', function () {
    var first = nameInput.value.trim().split(/\s+/)[0];
    greeting.textContent = first ? 'Un gusto, ' + first + '. ' : '';
  });

  // ----- Inputs: autosize textarea + clear errors while typing -----
  form.querySelectorAll('.tf-input').forEach(function (input) {
    input.addEventListener('input', function () {
      clearError(input.closest('.tf-step'));
      if (input.tagName === 'TEXTAREA') {
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
      }
    });
  });

  // ----- Keyboard -----
  document.addEventListener('keydown', function (e) {
    if (done) return;
    var step = steps[current];
    var typing = e.target.matches && e.target.matches('.tf-input');

    if (e.key === 'Enter') {
      if (e.target.tagName === 'A') return;
      if (e.target.tagName === 'TEXTAREA' && e.shiftKey) return; // newline
      e.preventDefault();
      next();
      return;
    }

    // Letter shortcuts for choices (only when not typing in a field)
    if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && /^[a-z]$/i.test(e.key)) {
      var keys = step.querySelectorAll('.tf-choice__key');
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].textContent.toLowerCase() === e.key.toLowerCase()) {
          e.preventDefault();
          if (!locked) pickChoice(keys[i].closest('.tf-choice'));
          return;
        }
      }
    }

    if (!typing && (e.key === 'ArrowDown' || e.key === 'PageDown')) { e.preventDefault(); next(); }
    if (!typing && (e.key === 'ArrowUp' || e.key === 'PageUp')) { e.preventDefault(); prev(); }
  });

  // ----- Wheel between steps -----
  var wheelLock = false;
  window.addEventListener('wheel', function (e) {
    if (done || wheelLock || Math.abs(e.deltaY) < 30) return;
    var scroller = steps[current];
    var atTop    = scroller.scrollTop <= 0;
    var atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
    if (e.deltaY > 0 && !atBottom) return;
    if (e.deltaY < 0 && !atTop) return;
    wheelLock = true;
    window.setTimeout(function () { wheelLock = false; }, 800);
    if (e.deltaY > 0) next(); else prev();
  }, { passive: true });

  // ----- Submit → /api/diagnostico -----
  function submit() {
    if (sending) return;
    // Every step must be valid; jump to the first invalid one
    for (var i = 1; i <= lastIndex; i++) {
      if (!validate(steps[i])) { current = i; render(); return; }
    }

    sending = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = value; });
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach(function (k) {
      if (qs.get(k)) data[k] = qs.get(k);
    });
    data._t = Date.now() - (startedAt || Date.now());

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (r) {
        if (!res.ok || !r.ok) throw new Error(r.error || 'Error ' + res.status);
        return r;
      });
    })
    .then(function (r) {
      done = true;
      // First name for the thank-you page; sessionStorage keeps it out of the URL
      try {
        var first = (data.nombre || '').trim().split(/\s+/)[0];
        if (first) sessionStorage.setItem('diagnosticoNombre', first);
      } catch (err) { /* storage blocked: the page falls back to a generic title */ }
      goToThanks(r.nivel || '');
    })
    .catch(function () {
      sending = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Pedir mi diagnóstico';
      showError(steps[current], 'No se pudo enviar. Probá de nuevo o escribime a <a href="mailto:info@uxuaria.com">info@uxuaria.com</a>.');
    });
  }

  // Send generate_lead before leaving the page; redirect anyway if GA doesn't answer
  function goToThanks(nivel) {
    var left = false;
    function leave() {
      if (left) return;
      left = true;
      window.location.assign('/diagnostico/gracias');
    }
    var params = { form: 'ai_mvp_rescue', cta_id: ctaId, nivel: nivel, event_callback: leave, event_timeout: 1500 };
    if (typeof gtag === 'function') gtag('event', 'generate_lead', params);
    else track('generate_lead', { form: 'ai_mvp_rescue', cta_id: ctaId, nivel: nivel });
    window.setTimeout(leave, 1500);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submit();
  });

  render();
})();
