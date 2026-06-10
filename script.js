// ============================================================
// UXUARIA — script.js
// Progressive enhancement: el sitio funciona sin este script.
// ============================================================

// --- Hero retro UI: pixel art + artboard scaling ---
(function () {
  function px(svg, cells, fill) {
    const ns = 'http://www.w3.org/2000/svg';
    cells.forEach(c => {
      const r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', c[0]); r.setAttribute('y', c[1]);
      r.setAttribute('width', c[2] || 1); r.setAttribute('height', c[3] || 1);
      r.setAttribute('fill', c[4] || fill || '#000');
      svg.appendChild(r);
    });
  }

  // Claude pixel face
  const claudeSvg = document.querySelector('#w-claude svg');
  if (claudeSvg) {
    const B = '#000';
    px(claudeSvg, [[19,1],[20,1],[19,2],[20,2],[18,4,4,2]], B);
    px(claudeSvg, [[12,6,16,1],[10,7,2,1],[28,7,2,1],[9,8,1,1],[30,8,1,1],
      [8,9,1,4],[31,9,1,4],[9,13,1,12],[30,13,1,12],
      [9,25,1,1],[30,25,1,1],[10,26,2,1],[28,26,2,1],[12,27,16,1]], B);
    px(claudeSvg, [[12,7,16,1]], B);
    px(claudeSvg, [[14,13,3,4],[23,13,3,4]], B);
    px(claudeSvg, [[15,14,1,1],[24,14,1,1]], '#F5F5F5');
    px(claudeSvg, [[15,20,10,1],[14,19,1,1],[25,19,1,1]], B);
    px(claudeSvg, [[6,15,2,4],[32,15,2,4]], B);
    px(claudeSvg, [[34,4],[34,6],[33,5],[35,5],[34,5]], B);
  }

  // QR code
  const qrSvg = document.getElementById('qr');
  if (qrSvg) {
    px(qrSvg, [[0,0,13,13]], '#FFFFFF');
    function finder(ox, oy) {
      px(qrSvg, [[ox,oy,5,1],[ox,oy+4,5,1],[ox,oy,1,5],[ox+4,oy,1,5],
        [ox+1,oy+1,3,3,'#FFFFFF'],[ox+2,oy+2,1,1]], '#000');
    }
    finder(0,0); finder(8,0); finder(0,8);
    px(qrSvg, [[6,1],[7,3],[6,5],[8,6],[10,6],[12,6],[6,7],[1,6],[3,6],[5,7],
      [7,8],[9,9],[11,8],[12,10],[10,11],[8,12],[6,10],[7,11],[12,12],[9,12],[11,11]], '#000');
  }

  // Photoshop tool icons
  const psdTools = document.getElementById('psd-tools');
  if (psdTools) {
    const ns = 'http://www.w3.org/2000/svg';
    const icons = {
      cursor:  [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[2,1],[3,2],[2,3],[4,4],[5,5],[3,4],[3,5]],
      marquee: [[0,0],[2,0],[4,0],[6,0],[0,2],[6,2],[0,4],[6,4],[0,6],[2,6],[4,6],[6,6]],
      brush:   [[5,0],[6,0],[4,1],[5,1],[3,2],[4,2],[2,3],[3,3],[1,4],[2,4],[1,5],[0,6],[1,6]],
      text:    [[0,0,7,1],[3,1,1,5]],
      zoom:    [[1,0],[2,0],[3,0],[0,1],[4,1],[0,2],[4,2],[1,3],[2,3],[3,3],[4,4],[5,5],[6,6]]
    };
    Object.keys(icons).forEach(k => {
      const t = document.createElement('div'); t.className = 't';
      const s = document.createElementNS(ns, 'svg');
      s.setAttribute('width', '26'); s.setAttribute('height', '26');
      s.setAttribute('viewBox', '0 0 7 7');
      px(s, icons[k], '#000'); t.appendChild(s); psdTools.appendChild(t);
    });
  }

  // Progress bar segments
  const pbar = document.getElementById('pbar');
  if (pbar) { for (let i = 0; i < 26; i++) { pbar.appendChild(document.createElement('i')); } }

  // Scale artboard to fit right column
  function fitArt() {
    const art = document.querySelector('.hero .art');
    const ab  = document.getElementById('artboard');
    if (!art || !ab) return;
    const w = art.clientWidth, h = art.clientHeight;
    if (w < 40 || h < 40) return;
    const k = Math.min(w / 1000, h / 1050) * 0.7;
    ab.style.transform = 'translate(-50%,-50%) scale(' + k + ')';
  }

  window.addEventListener('resize', fitArt);
  fitArt();
  [0, 60, 160, 400, 900].forEach(t => setTimeout(fitArt, t));
  if (window.ResizeObserver) {
    const artEl = document.querySelector('.hero .art');
    if (artEl) new ResizeObserver(fitArt).observe(artEl);
  }
  document.fonts && document.fonts.ready.then(fitArt);
  window.addEventListener('load', fitArt);
})();

// --- Navbar: clase "scrolled" al hacer scroll ---
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// --- Mobile menu: toggle con accesibilidad ---
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Cerrar el menú al hacer clic en cualquier link interno
  mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

// --- Smooth scroll con offset para la navbar fija ---
// Excluye hrefs vacíos (#) para no interferir con botones sin destino aún.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const hash = anchor.getAttribute('href');

    // Saltar anchors vacíos (lang toggle, blog link pendiente, etc.)
    if (!hash || hash === '#') return;

    const target = document.querySelector(hash);
    if (target) {
      e.preventDefault();
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      window.scrollTo({
        top: target.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  });
});

// --- Carrusel del proyecto destacado ---
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track     = carousel.querySelector('[data-carousel-track]');
  const slides    = carousel.querySelectorAll('.featured-carousel__slide');
  const prevBtn   = carousel.querySelector('.featured-carousel__btn--prev');
  const nextBtn   = carousel.querySelector('.featured-carousel__btn--next');
  const currentEl = carousel.querySelector('[data-carousel-current]');
  const total     = slides.length;
  let current     = 0;

  // Si hay una sola imagen, eliminar controles
  if (total <= 1) {
    prevBtn && prevBtn.remove();
    nextBtn && nextBtn.remove();
    carousel.querySelector('.featured-carousel__counter') &&
      carousel.querySelector('.featured-carousel__counter').remove();
    return;
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    if (currentEl) currentEl.textContent = current + 1;
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

  // Swipe en mobile
  let startX = 0;
  carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });
});

// --- Carrusel de proyectos seleccionados ---
(function () {
  const track   = document.querySelector('[data-pcarousel]');
  const prevBtn = document.querySelector('[data-pcarousel-prev]');
  const nextBtn = document.querySelector('[data-pcarousel-next]');

  if (!track) return;

  function getScrollAmount() {
    const slide = track.querySelector('.portfolio-carousel__slide');
    if (!slide) return 320;
    const cs  = getComputedStyle(track);
    const gap = parseFloat(cs.columnGap) || parseFloat(cs.gap) || 20;
    return slide.offsetWidth + gap;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scroll({ left: track.scrollLeft - getScrollAmount(), behavior: 'smooth' });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scroll({ left: track.scrollLeft + getScrollAmount(), behavior: 'smooth' });
    });
  }

  // Swipe en mobile
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      track.scroll({ left: track.scrollLeft + (diff > 0 ? getScrollAmount() : -getScrollAmount()), behavior: 'smooth' });
    }
  }, { passive: true });

  // Click en flecha ↗ de un slide: llevar la card al frente antes de navegar
  track.querySelectorAll('.portfolio-carousel__slide-arrow').forEach(arrow => {
    arrow.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const slide      = this.closest('.portfolio-carousel__slide');
      if (!slide) return;

      const slideLeft  = slide.offsetLeft;
      const slideRight = slideLeft + slide.offsetWidth;
      const viewLeft   = track.scrollLeft;
      const viewRight  = viewLeft + track.offsetWidth;
      const fullyVisible = slideLeft >= viewLeft && slideRight <= viewRight;

      if (fullyVisible) return; // ya visible → navegación normal sin preventDefault

      e.preventDefault();
      track.scroll({ left: slideLeft, behavior: 'smooth' });
      setTimeout(() => { window.location.href = href; }, 420);
    });
  });
})();

// --- Parallax stack: servicios page ---
(function () {
  const stack = document.querySelector('.s-parallax-stack');
  if (!stack) return;

  const blocks = Array.from(stack.querySelectorAll('.s-service-block'));
  if (blocks.length < 2) return;

  const STICKY_TOP = 68;
  let rafPending = false;

  function updateParallax() {
    rafPending = false;

    // Bail on reduced-motion only
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      blocks.forEach(b => { b.style.opacity = ''; b.style.transform = ''; });
      return;
    }

    const vh = window.innerHeight;

    blocks.forEach((block, i) => {
      // Last block never fades — it stays fully visible
      if (i === blocks.length - 1) return;

      const nextRect = blocks[i + 1].getBoundingClientRect();

      // progress: 0 = next card just entering viewport bottom
      //           1 = next card has reached sticky top (fully covering this one)
      const range = vh - STICKY_TOP;
      const progress = Math.max(0, Math.min(1, (vh - nextRect.top) / range));

      if (progress <= 0) {
        block.style.opacity = '';
        block.style.transform = '';
      } else {
        block.style.opacity = 1 - progress * 0.7;
        block.style.transform = `scale(${1 - progress * 0.04})`;
      }
    });
  }

  function onScroll() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(updateParallax);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateParallax, { passive: true });
  updateParallax();
})();

// --- UX Checkup Modal ---
(function () {
  const overlay   = document.getElementById('checkup-modal');
  const openBtn   = document.getElementById('btn-apply-checkup');
  const closeBtn  = document.getElementById('ckm-close');
  const formBtn   = document.getElementById('ckm-open-form');
  const backBtn   = document.getElementById('ckm-back');
  const viewInfo  = document.getElementById('ckm-view-info');
  const viewForm  = document.getElementById('ckm-view-form');
  const iframe    = document.getElementById('ckm-typeform');

  if (!overlay || !openBtn) return;

  let formLoaded = false;

  function openModal() {
    overlay.removeAttribute('aria-hidden');
    overlay.classList.add('is-open');
    overlay.classList.remove('is-form');
    showView('info');
    document.body.style.overflow = 'hidden';
    // Focus the close button for accessibility
    setTimeout(() => closeBtn && closeBtn.focus(), 60);
  }

  function closeModal() {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-open', 'is-form');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  function showView(which) {
    if (which === 'info') {
      viewInfo.hidden = false;
      viewForm.hidden = true;
    } else {
      viewInfo.hidden = true;
      viewForm.hidden = false;
      // Lazy-load the Typeform iframe on first open
      if (!formLoaded && iframe) {
        iframe.src = iframe.dataset.src;
        formLoaded = true;
      }
    }
  }

  openBtn.addEventListener('click', openModal);
  closeBtn && closeBtn.addEventListener('click', closeModal);

  formBtn && formBtn.addEventListener('click', () => {
    overlay.classList.add('is-form');
    showView('form');
  });

  backBtn && backBtn.addEventListener('click', () => {
    overlay.classList.remove('is-form');
    showView('info');
  });

  // Close on overlay click (outside panel)
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });
})();

// --- Animated counters (IntersectionObserver + requestAnimationFrame) ---
if ('IntersectionObserver' in window) {
  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = parseInt(el.dataset.duration || 1800, 10);
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
    el.textContent = prefix + '0' + suffix;
    const start = performance.now();
    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = prefix + Math.floor(easeOutQuart(progress) * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else { el.textContent = prefix + target + suffix; el.classList.add('done'); }
    }
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });

  document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));
}

// --- Fade-in al hacer scroll (Intersection Observer) ---
// Solo se activa si IntersectionObserver está disponible (progressive enhancement).
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document
    .querySelectorAll('.service-card, .project-card, .project-card--featured, .portfolio-carousel__slide, .testimonial-card, .checkup__mock')
    .forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
}
