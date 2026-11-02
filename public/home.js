// Exploration: scroll-drawn line, reveals and counters for the home
(function () {
  if (!document.documentElement.classList.contains('home-motion')) return;

  // --- Reveal on scroll, staggered inside each row of siblings ---
  const revealItems = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
    });
  }, { rootMargin: '0px 0px -12% 0px' });

  revealItems.forEach((item) => {
    const siblings = [...item.parentElement.children].filter((el) => el.hasAttribute('data-reveal'));
    if (siblings.length > 1 && !item.style.getPropertyValue('--reveal-delay')) {
      item.style.setProperty('--reveal-delay', `${siblings.indexOf(item) * 90}ms`);
    }
    revealObserver.observe(item);
  });

  // --- Metric counters: keeps the prefix and suffix of the visible text ---
  function countUp(el) {
    const node = el.firstChild;
    const match = node.textContent.match(/^(\D*)(\d+)(.*)$/s);
    if (!match) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    const start = performance.now();
    const duration = 1200;
    (function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = prefix + Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  // --- Line drawn with the scroll, from the top of the page downwards ---
  const flow = document.querySelector('.home-flow');
  const svg = document.querySelector('.home-flow__line');
  const strokes = document.querySelector('.home-flow__strokes');
  const path = document.getElementById('flow-path');
  if (!svg || !path) return;

  const total = path.getTotalLength();
  const samples = [];
  let maxY = -Infinity;
  // The path runs bottom to top, so sampling goes from its end. maxY keeps the
  // mapping monotonic across the stretches where the line climbs.
  for (let s = 0; s <= total; s += 8) {
    maxY = Math.max(maxY, path.getPointAtLength(total - s).y);
    samples.push({ s, y: maxY });
  }

  function targetLength() {
    const rect = svg.getBoundingClientRect();
    if (!rect.height) return total;
    const scale = rect.height / 2254.78;
    const tipY = (innerHeight * 0.72 - rect.top) / scale;
    if (tipY >= maxY) return total;
    const next = samples.find((sample) => sample.y > tipY);
    return next ? next.s : total;
  }

  let drawn = 0;
  function frame() {
    drawn += (targetLength() - drawn) * 0.12;
    if (Math.abs(targetLength() - drawn) < 0.5) drawn = targetLength();
    strokes.style.strokeDasharray = `${drawn} ${total}`;
    strokes.style.strokeDashoffset = `${-(total - drawn)}`;
    flow.classList.toggle('home-flow--line-done', drawn >= total - 1);
    requestAnimationFrame(frame);
  }
  frame();
})();
