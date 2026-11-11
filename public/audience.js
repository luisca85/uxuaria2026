/* ===================================================================
   UXUARIA — audience.js
   "Para quién" on the AI Native page: while the left column stays, each
   moment on the right opens when it reaches the reading area of the
   viewport, and closes again when scrolling back up. Two columns only:
   on one column, or with reduced motion, every moment stays open.
   Spec: 16-servicios-ia.
   =================================================================== */

(function () {
  const blocks = [...document.querySelectorAll('[data-audience]')];
  if (!blocks.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const wide = matchMedia('(min-width: 900px)');
  const items = blocks.map((block) => [...block.querySelectorAll('.audience-item')]);
  let queued = false;

  function draw() {
    queued = false;
    if (!wide.matches) return;
    // A moment opens once its top passes 65% of the viewport
    const line = innerHeight * 0.65;
    items.flat().forEach((item) => item.classList.toggle('is-open', item.getBoundingClientRect().top < line));
  }

  function setup() {
    blocks.forEach((block) => block.classList.toggle('audience--animated', wide.matches));
    draw();
  }

  function req() { if (!queued) { queued = true; requestAnimationFrame(draw); } }
  addEventListener('scroll', req, { passive: true });
  wide.addEventListener('change', setup);
  setup();
})();
