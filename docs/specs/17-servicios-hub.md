# Spec 17 — Índice de servicios y metadatos SEO

Pedido por Luis el 2026-11-13, a partir del diagnóstico de Google Analytics y Search Console (90 días al 2026-11-12).

## Contexto

| Página | Dato de Search Console | Problema |
|---|---|---|
| `/servicios/` | 247 impresiones, posición 49 | Redirigía a `/#servicios` desde el 2026-11-11 (spec 16): Google conocía la URL pero no había página |
| `/` | 281 impresiones, posición 11,6 | `<title>` "Consultora UX…" no coincidía con el H1 nuevo "Agencia de diseño UX/UI AI-native para startups" |
| `/ai-mvp-rescue` | 88 impresiones, 1 clic, posición 8,6 | Primera página pero casi sin clics; búsquedas: "mvp ia", "ai mvp", "claude mvp" |

## Cambios

1. **`/servicios/` vuelve a ser una página** (`src/pages/servicios/index.astro`). Revierte la redirección de spec 16 solo para `/servicios`, `/servicios/` y `/servicios/index.html`; las de `/servicios/mvp`, `/experiencia` y `/crecimiento` siguen.
   - H1: "Servicios de diseño UX/UI para startups".
   - Un bloque por servicio con nombre, resumen y enlace, tomados de `src/lib/services.ts` (copy ya aprobado en spec 16).
   - JSON-LD `ItemList` de `Service` + `BreadcrumbList`. Eventos GA4: `cta_servicios_*`, `servicios_<id>`.
2. **Home**: title "Agencia de diseño UX/UI para startups (IA, Fintech, SaaS) | Uxuaria", description y og:description alineadas con el H1.
3. **AI MVP Rescue**: title "Rescate de MVP hecho con IA (Claude, Lovable, Cursor) | Uxuaria" y description que empieza con "¿Armaste tu MVP con IA?".

## A medir

Comparar en Search Console 28 días antes y después de publicar: posición de `/servicios/` y de la home, CTR de `/ai-mvp-rescue`.
