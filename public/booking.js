// ============================================================
// UXUARIA — booking.js (spec 14-contacto, criterios 11b y 11c)
// One Cal.com loader for the inline calendar and the popup, and the
// booking conversion for GA4 (generate_lead, lead_source: agenda).
// Without JS the cal.com links still open the scheduling page.
// ============================================================
(function () {
  var CAL_ORIGIN = 'https://app.cal.com';
  var BOOKING_HOST = 'https://cal.com/';
  var POPUP_NS = 'popup';
  var tracked = {};
  var popupCta = '';

  function track(params) {
    if (typeof window.uxuariaTrack === 'function') window.uxuariaTrack('generate_lead', params);
    else if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', params);
  }

  function loadCal() {
    if (window.Cal) return window.Cal;
    // Cal.com embed loader (official snippet)
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, CAL_ORIGIN + '/embed/embed.js', 'init');
    window.Cal.config = window.Cal.config || {};
    window.Cal.config.forwardQueryParams = true;
    return window.Cal;
  }

  // Returns the namespace api, creating it once with its booking listener
  function calNamespace(ns, formId) {
    var Cal = loadCal();
    if (Cal.ns && Cal.ns[ns]) return Cal.ns[ns];
    Cal('init', ns, { origin: CAL_ORIGIN });
    Cal.ns[ns]('on', {
      action: 'bookingSuccessfulV2',
      callback: function (e) {
        var data = e && e.detail && e.detail.data;
        var key = (data && data.uid) || ns;
        if (tracked[key]) return; // one conversion per booking
        tracked[key] = true;
        var params = { form_id: formId, lead_source: 'agenda', page: window.location.pathname };
        if (ns === POPUP_NS && popupCta) params.cta_id = popupCta;
        track(params);
      },
    });
    return Cal.ns[ns];
  }

  // Every cal.com link opens the calendar as a popup instead of a new tab
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest && e.target.closest('a[href^="' + BOOKING_HOST + '"]');
    // data-booking-external: the fallback link that must open cal.com in a new tab
    if (!link || link.hasAttribute('data-booking-external')) return;
    var calLink = link.getAttribute('href').slice(BOOKING_HOST.length).split(/[?#]/)[0];
    if (!calLink) return;
    e.preventDefault();
    popupCta = link.dataset.track || '';
    calNamespace(POPUP_NS, 'cal_popup')('modal', { calLink: calLink, config: { layout: 'month_view' } });
    nameModalFrame();
  });

  // Cal.com titles its iframe "Book a call"; give it a Spanish name (WCAG 4.1.2, 3.1.2)
  function nameModalFrame() {
    var tries = 0;
    var timer = window.setInterval(function () {
      var frames = document.querySelectorAll('cal-modal-box iframe');
      frames.forEach(function (frame) { frame.title = 'Agenda una llamada con Uxuaria'; });
      if (frames.length || ++tries > 40) window.clearInterval(timer);
    }, 250);
  }

  window.uxuariaBooking = { calNamespace: calNamespace };
})();
