/* ===================================================================
   MUTIS UX — analytics.js
   Eventos de la landing. El aviso de cookies y la carga de GA4 y Hotjar
   están en /cookies.js: si la persona no aceptó, gtag no existe y estos
   eventos no hacen nada. Nunca pasar datos personales en params.
   =================================================================== */

(function () {
  'use strict';

  function track(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
    if (window.hj) window.hj('event', name);
  }

  document.addEventListener('click', function (event) {
    var cta = event.target.closest('[data-cta]');
    if (cta) track('click_cta', { cta_id: cta.getAttribute('data-cta') });
  });

  // Las preguntas frecuentes abiertas: <details> avisa con toggle, que no sube por el DOM.
  Array.prototype.forEach.call(document.querySelectorAll('.faq-item'), function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      var question = item.querySelector('summary');
      track('faq_open', { pregunta: question ? question.textContent.trim() : '' });
    });
  });

  // Las secciones del reporte de ejemplo.
  Array.prototype.forEach.call(document.querySelectorAll('.demo-report__radio'), function (radio) {
    radio.addEventListener('change', function () {
      if (radio.checked) track('demo_section', { seccion: radio.id });
    });
  });

  var form = document.getElementById('acceso-form');
  if (form) {
    form.addEventListener('focusin', function onFirstFocus() {
      form.removeEventListener('focusin', onFirstFocus);
      track('form_start', { form: 'mutisux_beta' });
    });
  }

  window.MutisAnalytics = { track: track };
})();
