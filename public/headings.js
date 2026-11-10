/* ===================================================================
   UXUARIA — headings.js
   Service pages: the hero title and lead, and each section's eyebrow,
   title and text, rise in as they enter the viewport, one after another.
   Spec: 15-paginas-servicio.
   =================================================================== */

(function () {
  if (!document.documentElement.classList.contains('service-motion')) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      entry.target.classList.add('is-visible');
    });
  }, { rootMargin: '0px 0px -12% 0px' });

  const groups = [
    [...document.querySelectorAll('.service-hero__title, .service-hero__lead')],
    ...[...document.querySelectorAll('.service-head')].map((head) => [...head.children]),
  ];

  groups.forEach((items) => {
    items.forEach((item, i) => {
      item.style.setProperty('--reveal-delay', `${i * 120}ms`);
      observer.observe(item);
    });
  });
})();
