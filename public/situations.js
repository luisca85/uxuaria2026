/* ===================================================================
   UXUARIA — situations.js
   "¿Te suena?" on the diagnóstico UX page: the cards appear one by one,
   tied to the scroll. Spec: 15-paginas-servicio.
   =================================================================== */

(function () {
  const grid = document.querySelector('[data-situations]');
  if (!grid || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = [...grid.querySelectorAll('.situation-card')];
  let queued = false;

  grid.classList.add('situation-grid--animated');

  // 0 when the grid top reaches 90% of the viewport, 1 when its bottom reaches 75%
  function progress() {
    const r = grid.getBoundingClientRect();
    const start = innerHeight * 0.9;
    const range = r.height + innerHeight * 0.15;
    return Math.max(0, Math.min(1, (start - r.top) / range));
  }

  // Each card takes its own slice of the progress, in order
  function draw() {
    queued = false;
    const span = progress() * cards.length;
    cards.forEach((card, i) => {
      card.style.setProperty('--reveal', Math.max(0, Math.min(1, span - i)).toFixed(3));
    });
  }

  function req() { if (!queued) { queued = true; requestAnimationFrame(draw); } }
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  draw();
})();
