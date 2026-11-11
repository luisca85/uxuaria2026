/* ===================================================================
   UXUARIA — situations.js
   Service pages: the children of every [data-situations] block (cards,
   list items, table rows) appear one by one, tied to the scroll.
   Spec: 15-paginas-servicio, 16-servicios-ia.
   =================================================================== */

(function () {
  const blocks = [...document.querySelectorAll('[data-situations]')];
  if (!blocks.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let queued = false;

  blocks.forEach((block) => block.classList.add('situation-grid--animated'));

  // 0 when the block top reaches 90% of the viewport, 1 when its bottom reaches 75%
  function progress(block) {
    const r = block.getBoundingClientRect();
    const start = innerHeight * 0.9;
    const range = r.height + innerHeight * 0.15;
    return Math.max(0, Math.min(1, (start - r.top) / range));
  }

  // Each child takes its own slice of the progress, in order
  function draw() {
    queued = false;
    blocks.forEach((block) => {
      const items = [...block.children];
      const span = progress(block) * items.length;
      items.forEach((item, i) => {
        item.style.setProperty('--reveal', Math.max(0, Math.min(1, span - i)).toFixed(3));
      });
    });
  }

  function req() { if (!queued) { queued = true; requestAnimationFrame(draw); } }
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  draw();
})();
