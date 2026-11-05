/* ===================================================================
   UXUARIA — rescue.js
   AI MVP Rescue: the CTAs lead to the diagnosis funnel (/diagnostico/)
   with their cta_id and the visit's UTM. Same behavior as the old
   ai-mvp-rescue.html. Specs: 07-funnel-diagnostico, 15-paginas-servicio.
   =================================================================== */

(function () {
  const qs = new URLSearchParams(location.search);
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];

  function diagnosisUrl(cta) {
    const u = new URL('/diagnostico/', location.href);
    u.searchParams.set('cta', cta || 'sin_id');
    UTM_KEYS.forEach(function (k) { if (qs.get(k)) u.searchParams.set(k, qs.get(k)); });
    return u.toString();
  }

  // Direct link: uxuaria.com/ai-mvp-rescue#diagnostico opens the funnel (for LinkedIn DMs)
  if (location.hash === '#diagnostico') {
    location.replace(diagnosisUrl('link_directo'));
    return;
  }

  // script.js loads after this file, so uxuariaTrack is looked up on click
  document.querySelectorAll('a[href^="/diagnostico/"][data-track]').forEach(function (el) {
    el.href = diagnosisUrl(el.dataset.track);
    el.addEventListener('click', function () {
      if (window.uxuariaTrack) window.uxuariaTrack('click_formulario_ai_mvp_rescue', { cta_id: el.dataset.track });
    });
  });
})();
