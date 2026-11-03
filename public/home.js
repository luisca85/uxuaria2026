// Home motion (spec 11-home): scroll-drawn line, reveals, counters, clients strip and testimonials
(function () {
  if (!document.documentElement.classList.contains('home-motion')) return;

  // Once in place, an item drops the reveal rules so its hover transitions run undelayed
  function reveal(item) {
    item.classList.add('is-visible');
    const finish = () => item.removeAttribute('data-reveal');
    item.addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, 1600);
    item.querySelectorAll('[data-count]').forEach(countUp);
  }

  // --- Reveal on scroll, staggered inside each row of siblings ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealObserver.unobserve(entry.target);
      reveal(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });

  document.querySelectorAll('[data-reveal]:not([data-reveal="scroll"])').forEach((item) => {
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

  // --- Testimonials: one at a time, each after a further stretch of scroll ---
  const testimonials = [...document.querySelectorAll('.testimonial-card[data-reveal="scroll"]')];
  const testimonialStep = 0.16;

  function updateTestimonials() {
    const sameRow = testimonials.length > 1 && testimonials[0].offsetTop === testimonials[1].offsetTop;
    testimonials.forEach((card, index) => {
      if (card.classList.contains('is-visible')) return;
      const anchor = sameRow ? card.parentElement : card;
      const line = innerHeight * (0.85 - testimonialStep * (sameRow ? index : 0));
      const previous = testimonials[index - 1];
      if (anchor.getBoundingClientRect().top < line && (!previous || previous.classList.contains('is-visible'))) reveal(card);
    });
  }

  // --- Clients strip: drifts left going down the page and right going back up ---
  const clients = document.querySelector('.home-clients');
  let clientsX = 0;

  function clientsTarget() {
    const rect = clients.getBoundingClientRect();
    const progress = (rect.top + rect.height / 2) / innerHeight - 0.5;
    const range = Math.min(160, innerWidth * 0.11);
    return Math.max(-1, Math.min(1, progress * 2)) * range;
  }

  // --- Line drawn with the scroll, from the top of the page downwards ---
  const flow = document.querySelector('.home-flow');
  const svg = document.querySelector('.home-flow__line');
  const strokes = document.querySelector('.home-flow__strokes');
  const path = document.getElementById('flow-path');
  const total = path.getTotalLength();
  const samples = [];
  let maxY = -Infinity;
  let drawn = 0;
  // maxY keeps the mapping monotonic across the stretches where the line climbs
  for (let s = 0; s <= total; s += 8) {
    maxY = Math.max(maxY, path.getPointAtLength(s).y);
    samples.push({ s, y: maxY });
  }

  function lineTarget() {
    const rect = svg.getBoundingClientRect();
    if (!rect.height) return total;
    const tipY = (innerHeight * 0.72 - rect.top) / (rect.height / svg.viewBox.baseVal.height);
    if (tipY >= maxY) return total;
    const next = samples.find((sample) => sample.y > tipY);
    return next ? next.s : total;
  }

  // --- Shared loop: runs only while something is still moving ---
  let running = false;

  function frame() {
    const lineGoal = lineTarget();
    const clientsGoal = clientsTarget();
    drawn += (lineGoal - drawn) * 0.12;
    clientsX += (clientsGoal - clientsX) * 0.12;
    const settled = Math.abs(lineGoal - drawn) < 0.5 && Math.abs(clientsGoal - clientsX) < 0.2;
    if (settled) {
      drawn = lineGoal;
      clientsX = clientsGoal;
    }
    strokes.style.strokeDasharray = `${drawn} ${total}`;
    flow.classList.toggle('home-flow--line-done', drawn >= total - 1);
    clients.style.transform = `translate3d(${clientsX}px, 0, 0)`;
    updateTestimonials();
    running = !settled;
    if (running) requestAnimationFrame(frame);
  }

  function wake() {
    updateTestimonials();
    if (running) return;
    running = true;
    requestAnimationFrame(frame);
  }

  addEventListener('scroll', wake, { passive: true });
  addEventListener('resize', wake);
  clientsX = clientsTarget();
  wake();
})();
