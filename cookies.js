/* ===================================================================
   UXUARIA — cookies.js (spec 10-cookies-privacidad)
   Aviso de cookies de todo uxuaria.com. Es el único lugar que carga
   Google Analytics 4 y Hotjar, y solo después de "Aceptar".
   Sin JS no aparece el aviso y no se carga nada. Cloudflare Web Analytics
   va aparte en cada página: no usa cookies y no depende de este aviso.
   Se carga en el <head>, sin defer, para que gtag exista antes que los
   scripts de cada página cuando la persona ya aceptó.
   =================================================================== */

(function () {
  'use strict';

  var GA_ID = 'G-6TCJ5969G7';
  var HOTJAR_ID = 6838037;
  var STORAGE_KEY = 'uxuaria:cookies';

  /* Fuera de producción no se cargan los scripts, para no ensuciar los datos. */
  var IS_LIVE = location.hostname === 'uxuaria.com';
  var IS_MUTIS = location.pathname.indexOf('/mutisux') === 0;
  var PRIVACY_URL = IS_MUTIS ? '/mutisux/privacidad' : '/privacidad/';

  /* Valores propios del aviso: toma los tokens de la página si existen. */
  var CSS =
    '.cookie-banner{--cb-bg:var(--color-white,#fff);--cb-text:var(--color-text,#111);--cb-line:var(--color-line,var(--color-border,#e8e8e4));' +
    '--cb-ink:var(--color-ink,#111);--cb-shadow:var(--shadow-card,0 8px 24px rgba(0,0,0,.14));--cb-radius:var(--radius,0);--cb-focus:var(--color-accent,#111);' +
    'position:fixed;left:24px;bottom:24px;z-index:1000;box-sizing:border-box;width:min(440px,calc(100% - 32px));display:flex;flex-direction:column;gap:14px;' +
    'padding:18px 20px;background:var(--cb-bg);color:var(--cb-text);border:1px solid var(--cb-line);border-radius:var(--cb-radius);box-shadow:var(--cb-shadow);' +
    'font-family:var(--font-body,var(--font,system-ui,sans-serif));font-size:14px;line-height:1.5}' +
    '.cookie-banner[hidden]{display:none}' +
    '.cookie-banner__text{margin:0}' +
    '.cookie-banner__text a{color:var(--cb-ink);text-decoration:underline;text-underline-offset:3px}' +
    '.cookie-banner__actions{display:flex;gap:8px}' +
    '.cookie-banner__btn{flex:1;min-height:44px;padding:8px 14px;background:transparent;color:var(--cb-ink);border:1px solid var(--cb-ink);border-radius:var(--cb-radius);font:inherit;font-weight:600;cursor:pointer}' +
    '.cookie-banner__btn:hover{background:var(--cb-ink);color:var(--cb-bg)}' +
    '.cookie-banner__btn:focus-visible,.cookie-banner a:focus-visible{outline:2px solid var(--cb-focus);outline-offset:2px}' +
    '.cookie-links__btn{padding:0;border:0;background:none;color:inherit;font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer}' +
    '.cookie-links a{color:inherit}' +
    '@media (max-width:600px){.cookie-banner{left:16px;right:16px;bottom:16px;width:auto}}';

  var started = false;
  var banner = null;

  function readChoice() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveChoice(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* vale solo para esta visita */ }
  }

  function addScript(src) {
    if (!IS_LIVE) {
      if (window.console) console.info('[cookies] en local no se carga:', src);
      return;
    }
    var script = document.createElement('script');
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  function start() {
    if (started) return;
    started = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    addScript('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);

    window.hj = window.hj || function () { (window.hj.q = window.hj.q || []).push(arguments); };
    window._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 };
    addScript('https://static.hotjar.com/c/hotjar-' + HOTJAR_ID + '.js?sv=6');
  }

  /* Al retirar el permiso se borran las cookies y se recarga para descargar los scripts. */
  function clearCookies() {
    var host = location.hostname;
    var domains = ['', '; domain=' + host, '; domain=.' + host];
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat|_hj)/.test(name)) return;
      domains.forEach(function (domain) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + domain;
      });
    });
  }

  function choose(value) {
    var wasGranted = readChoice() === 'granted';
    saveChoice(value);
    if (banner) banner.hidden = true;
    if (value === 'granted') {
      start();
    } else if (wasGranted) {
      clearCookies();
      location.reload();
    }
  }

  /* El texto no conjuga verbos en vos ni en tú: sirve para el sitio y para la landing. */
  function showBanner() {
    if (!banner) {
      banner = document.createElement('section');
      banner.className = 'cookie-banner';
      banner.setAttribute('aria-label', 'Preferencias de cookies');
      banner.innerHTML =
        '<p class="cookie-banner__text">Este sitio usa cookies de Google Analytics y Hotjar para entender cómo se usa: ' +
        'qué páginas se ven, dónde se hace clic y grabaciones de la sesión, sin lo que se escribe en los formularios. ' +
        'Solo se activan con tu permiso. <a href="' + PRIVACY_URL + '">Política de privacidad</a></p>' +
        '<div class="cookie-banner__actions">' +
        '<button class="cookie-banner__btn" type="button" data-choice="denied">Rechazar</button>' +
        '<button class="cookie-banner__btn" type="button" data-choice="granted">Aceptar</button>' +
        '</div>';
      banner.addEventListener('click', function (event) {
        var button = event.target.closest('[data-choice]');
        if (button) choose(button.getAttribute('data-choice'));
      });
      document.body.appendChild(banner);
    }
    banner.hidden = false;
  }

  /* Enlaces en el pie de las páginas del sitio (la landing tiene los suyos en el HTML). */
  function addFooterLinks() {
    var line = document.querySelector('.footer__bottom p');
    if (!line || IS_MUTIS) return;
    var links = document.createElement('span');
    links.className = 'cookie-links';
    links.innerHTML = ' · <a href="' + PRIVACY_URL + '">Política de privacidad</a> · ' +
      '<button class="cookie-links__btn" type="button" data-cookie-settings>Preferencias de cookies</button>';
    line.appendChild(links);
  }

  function initPage() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    addFooterLinks();
    Array.prototype.forEach.call(document.querySelectorAll('[data-cookie-settings]'), function (el) {
      el.hidden = false;
      el.addEventListener('click', function (event) {
        event.preventDefault();
        showBanner();
      });
    });

    if (readChoice() === null) showBanner();
  }

  if (readChoice() === 'granted') start();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage);
  else initPage();
})();
