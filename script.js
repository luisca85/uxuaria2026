// ============================================================
// UXUARIA — script.js
// Progressive enhancement: el sitio funciona sin este script.
// ============================================================

// --- Google Analytics (GA4): tracking de clicks en CTAs con data-track ---
(function () {
  function track(eventName, params) {
    if (typeof gtag === 'function') { gtag('event', eventName, params || {}); }
    else if (window.dataLayer) { window.dataLayer.push(Object.assign({ event: eventName }, params || {})); }
  }
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      track('cta_click', { cta_id: el.dataset.track });
    });
  });
  window.uxuariaTrack = track; // exponer para otros scripts inline (ej. formularios)
})();

// --- Parade: pixel characters — fall on load, walk on scroll ---
(function () {
  const stage = document.querySelector('.parade__stage');
  const chars = stage ? Array.from(stage.querySelectorAll('.parade__char')) : [];
  if (!stage || !chars.length) return;

  // Cascade fall: each char drops with a staggered delay
  const FALL_DURATION = 1100;
  const STAGGER       = 280;

  chars.forEach((char, i) => {
    setTimeout(() => {
      char.style.animation = 'char-fall ' + FALL_DURATION + 'ms linear forwards';
      setTimeout(() => {
        char.classList.add('fallen');
        char.style.animation = '';
      }, FALL_DURATION);
    }, i * STAGGER);
  });

  // Enable scroll-walk only after the last char finishes landing
  const readyAt = (chars.length - 1) * STAGGER + FALL_DURATION + 120;
  let ready = false;
  setTimeout(() => { ready = true; }, readyAt);

  // Scroll → translateX on stage
  let charX      = 0;
  let lastY      = window.scrollY;
  let walkTimer  = null;
  const FACTOR   = 0.35;

  function getMaxX() {
    const parade = stage.parentElement;
    return Math.max(0, parade.offsetWidth - stage.offsetWidth - 48);
  }

  window.addEventListener('scroll', function () {
    if (!ready) return;
    const y     = window.scrollY;
    const delta = y - lastY;
    lastY = y;

    charX = Math.min(getMaxX(), Math.max(0, charX + delta * FACTOR));
    stage.style.transform = 'translateX(' + charX + 'px)';

    stage.classList.add('is-walking');
    clearTimeout(walkTimer);
    walkTimer = setTimeout(function () {
      stage.classList.remove('is-walking');
    }, 180);
  }, { passive: true });
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

// --- Portfolio: toda la tarjeta es clickeable ---
(function () {
  // Slides del carrusel de proyectos
  document.querySelectorAll('.portfolio-carousel__slide').forEach(function (slide) {
    var link = slide.querySelector('.portfolio-carousel__slide-arrow');
    if (!link) return;
    slide.addEventListener('click', function () {
      window.location.href = link.href;
    });
  });

  // Tarjeta featured (Monge Pay) — ignora clicks en los botones del carrusel interno
  var featured = document.querySelector('.project-card--featured');
  if (featured) {
    var featuredLink = featured.querySelector('.project-card--featured__cta-arrow');
    if (featuredLink) {
      featured.style.cursor = 'pointer';
      featured.addEventListener('click', function (e) {
        if (!e.target.closest('.featured-carousel__btn')) {
          window.location.href = featuredLink.href;
        }
      });
    }
  }
})();

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
