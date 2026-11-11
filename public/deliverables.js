/* ===================================================================
   UXUARIA — deliverables.js
   "Qué recibes" on the service pages: the symbol travels along the
   dotted line with the scroll and each deliverable lights up when the
   symbol reaches its start. Works on every [data-deliverables] block.
   Spec: 15-paginas-servicio, 16-servicios-ia.
   =================================================================== */

(function () {
  const blocks = [...document.querySelectorAll('[data-deliverables]')];
  if (!blocks.length) return;

  // Side by side only: on one column the items stay lit and the symbol still
  const wide = matchMedia('(min-width: 769px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let queued = false;

  const states = blocks.map((block) => ({
    block,
    symbol: block.querySelector('.deliverables__symbol'),
    items: [...block.querySelectorAll('.deliverables__item')],
    stops: [],
  }));

  // Symbol offset that puts it at the start of each item
  function measure(s) {
    s.symbol.style.translate = '0';
    const origin = s.symbol.getBoundingClientRect().left;
    s.stops = s.items.map((item) => item.getBoundingClientRect().left - origin);
  }

  // 0 when the block enters the lower part of the viewport, 1 near the top
  function progress(block) {
    const r = block.getBoundingClientRect();
    const start = innerHeight * 0.85, end = innerHeight * 0.3;
    return Math.max(0, Math.min(1, (start - r.top) / (start - end)));
  }

  function drawOne(s) {
    const span = progress(s.block) * (s.stops.length - 1);
    const k = Math.min(s.stops.length - 2, Math.floor(span));
    let x = s.stops[k] + (s.stops[k + 1] - s.stops[k]) * (span - k);
    if (reduce) x = s.stops[Math.round(span)];
    s.symbol.style.translate = `${x}px 0`;
    s.items.forEach((item, i) => item.classList.toggle('is-active', x >= s.stops[i] - 1));
  }

  function draw() {
    queued = false;
    if (wide.matches) states.forEach(drawOne);
  }

  function setup() {
    states.forEach((s) => {
      s.block.classList.toggle('deliverables--animated', wide.matches);
      if (!wide.matches) { s.symbol.style.translate = ''; return; }
      measure(s);
    });
    draw();
  }

  function req() { if (!queued) { queued = true; requestAnimationFrame(draw); } }
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', setup);
  setup();
})();
