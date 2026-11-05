/* ===================================================================
   UXUARIA — deliverables.js
   "Qué recibes" on the diagnóstico UX page: the symbol travels along the
   dotted line with the scroll and each deliverable lights up when the
   symbol reaches its start. Spec: 15-paginas-servicio.
   =================================================================== */

(function () {
  const block = document.querySelector('[data-deliverables]');
  if (!block) return;

  const symbol = block.querySelector('.deliverables__symbol');
  const items = [...block.querySelectorAll('.deliverables__item')];
  // Side by side only: on one column the items stay lit and the symbol still
  const wide = matchMedia('(min-width: 769px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stops = [], queued = false;

  // Symbol offset that puts it at the start of each item
  function measure() {
    symbol.style.translate = '0';
    const origin = symbol.getBoundingClientRect().left;
    stops = items.map((item) => item.getBoundingClientRect().left - origin);
  }

  // 0 when the block enters the lower part of the viewport, 1 near the top
  function progress() {
    const r = block.getBoundingClientRect();
    const start = innerHeight * 0.85, end = innerHeight * 0.3;
    return Math.max(0, Math.min(1, (start - r.top) / (start - end)));
  }

  function draw() {
    queued = false;
    if (!wide.matches) return;
    const span = progress() * (stops.length - 1);
    const k = Math.min(stops.length - 2, Math.floor(span));
    let x = stops[k] + (stops[k + 1] - stops[k]) * (span - k);
    if (reduce) x = stops[Math.round(span)];
    symbol.style.translate = `${x}px 0`;
    items.forEach((item, i) => item.classList.toggle('is-active', x >= stops[i] - 1));
  }

  function setup() {
    block.classList.toggle('deliverables--animated', wide.matches);
    if (!wide.matches) { symbol.style.translate = ''; return; }
    measure();
    draw();
  }

  function req() { if (!queued) { queued = true; requestAnimationFrame(draw); } }
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', setup);
  setup();
})();
