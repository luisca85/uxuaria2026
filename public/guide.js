/* ===================================================================
   UXUARIA — guide.js
   Blog guides: marks the current section in the table of contents,
   closes the mobile index after a jump and sends blog_guide_toc to GA4.
   Without it the index still works as plain links.
   Spec: 18-blog-guias.
   =================================================================== */

(function () {
  const links = [...document.querySelectorAll('[data-toc-link]')];
  if (!links.length) return;

  // Heading ids can have accents, which the link's hash keeps encoded
  const idOf = (link) => decodeURIComponent(link.hash.slice(1));
  const ids = [...new Set(links.map(idOf))];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

  function setCurrent(id) {
    links.forEach((link) => {
      if (idOf(link) === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  // The current section is the last heading that has passed the top third of the viewport
  function update() {
    const line = window.innerHeight / 3;
    let current = null;
    sections.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= line) current = heading.id;
    });
    setCurrent(current);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  update();

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const details = link.closest('details');
      if (details) details.open = false;
      if (typeof window.uxuariaTrack === 'function') {
        window.uxuariaTrack('blog_guide_toc', { section: idOf(link) });
      }
    });
  });
})();
