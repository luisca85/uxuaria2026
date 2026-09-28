/* ===================================================================
   UXUARIA — formulario.js
   Typeform-style contact form: one step per screen, keyboard driven.
   Without JS the form renders stacked and posts to Web3Forms directly.
   =================================================================== */
(function () {
  var form = document.getElementById('tfForm');
  if (!form) return;

  var page     = document.body;
  var steps    = Array.prototype.slice.call(form.querySelectorAll('.tf-step'));
  var progress = document.getElementById('tfProgress');
  var navPrev  = document.querySelector('.tf-nav [data-action="prev"]');
  var navNext  = document.querySelector('.tf-nav [data-action="next"]');
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var current  = 0;
  var locked   = false;
  var endIndex = steps.length - 1;
  var ADVANCE_DELAY = 550;

  page.classList.add('is-enhanced');

  // ----- Navigation -----
  function focusStep(step) {
    var target = step.querySelector('.tf-input, .tf-choice input:checked, .tf-choice input, .tf-btn');
    if (target) target.focus({ preventScroll: true });
  }

  function render() {
    steps.forEach(function (step, i) {
      step.classList.toggle('is-active', i === current);
      step.classList.toggle('is-above', i < current);
      step.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      if ('inert' in step) step.inert = i !== current;
    });

    var questions = endIndex - 1; // excludes welcome and thank-you
    var answered  = Math.min(Math.max(current - 1, 0), questions);
    progress.style.width = (current === endIndex ? 100 : (answered / questions) * 100) + '%';

    navPrev.disabled = current === 0 || current === endIndex;
    navNext.disabled = current >= endIndex - 1;

    window.setTimeout(function () { focusStep(steps[current]); }, 60);
  }

  function goTo(index) {
    if (locked || index < 0 || index > endIndex - 1 || index === current) return;
    current = index;
    render();
  }

  function next() {
    if (current === endIndex - 1) { submit(); return; }
    if (!validate(steps[current])) return;
    goTo(current + 1);
  }

  function prev() { goTo(current - 1); }

  // ----- Validation -----
  function showError(step, message) {
    var error = step.querySelector('.tf-error');
    if (!error) return;
    error.textContent = message;
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
      if (input.type === 'email' && !emailRegex.test(value)) { showError(step, 'Hmm… ese email no parece válido'); return false; }
    }
    var group = step.querySelector('.tf-fieldset[data-required]');
    if (group && !group.querySelector('input:checked')) {
      showError(step, 'Elegí una opción');
      return false;
    }
    clearError(step);
    return true;
  }

  // ----- Choices: blink + auto-advance -----
  function pickChoice(choice) {
    var input = choice.querySelector('input');
    input.checked = true;
    var step = choice.closest('.tf-step');
    clearError(step);
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
  var nameInput = document.getElementById('nombre');
  nameInput.addEventListener('input', function () {
    var first = nameInput.value.trim().split(/\s+/)[0];
    form.querySelector('[data-greeting]').textContent = first ? 'Un gusto, ' + first + '.' : 'Un gusto.';
    form.querySelector('[data-name]').textContent = first || 'listo';
  });

  // ----- Autosize textarea -----
  form.querySelectorAll('.tf-input--textarea').forEach(function (area) {
    area.addEventListener('input', function () {
      area.style.height = 'auto';
      area.style.height = area.scrollHeight + 'px';
    });
  });

  form.querySelectorAll('.tf-input').forEach(function (input) {
    input.addEventListener('input', function () { clearError(input.closest('.tf-step')); });
  });

  // ----- Keyboard -----
  document.addEventListener('keydown', function (e) {
    var step = steps[current];
    if (current === endIndex) return;

    if (e.key === 'Enter') {
      if (e.target.tagName === 'TEXTAREA' && e.shiftKey) return; // newline
      if (e.target.tagName === 'A') return;
      e.preventDefault();
      next();
      return;
    }

    // Letter shortcuts for choices (only when not typing in a field)
    var typing = e.target.matches && e.target.matches('.tf-input');
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

  // ----- Wheel / swipe between steps -----
  var wheelLock = false;
  window.addEventListener('wheel', function (e) {
    if (wheelLock || Math.abs(e.deltaY) < 30) return;
    var scroller = steps[current];
    var atTop    = scroller.scrollTop <= 0;
    var atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
    if (e.deltaY > 0 && !atBottom) return;
    if (e.deltaY < 0 && !atTop) return;
    wheelLock = true;
    window.setTimeout(function () { wheelLock = false; }, 800);
    if (e.deltaY > 0) next(); else prev();
  }, { passive: true });

  // ----- Submit -----
  function submit() {
    // All required steps must be valid; jump to the first invalid one
    for (var i = 1; i < endIndex; i++) {
      if (!validate(steps[i])) { current = i; render(); return; }
    }

    var btn = form.querySelector('.tf-btn--submit');
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    var data = new FormData(form);
    var nombre = (data.get('name') || '').trim();
    data.set('subject', 'Nuevo contacto Uxuaria: ' + nombre);

    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
    .then(function (res) {
      if (!res.ok) throw new Error('Error ' + res.status);
      locked = false;
      current = endIndex;
      render();
      if (typeof window.uxuariaTrack === 'function') {
        window.uxuariaTrack('form_submit', { form_id: 'contacto_typeform', motivo: data.get('motivo') });
        window.uxuariaTrack('generate_lead', { form_id: 'contacto_typeform', motivo: data.get('motivo') });
      }
    })
    .catch(function () {
      btn.disabled = false;
      btn.textContent = 'Enviar';
      showError(steps[current], 'No se pudo enviar. Escribime a info@uxuaria.com');
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submit();
  });

  render();
})();
