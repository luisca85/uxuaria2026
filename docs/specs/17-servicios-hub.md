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
   - Sección "El recorrido": una tarjeta por servicio (símbolo de la home, número, nombre, resumen y enlace, tomados de `src/lib/services.ts`, copy ya aprobado en spec 16), en zigzag y unidas por una línea doble con esquinas redondeadas, como la línea de la home. En tablet y móvil (≤ 900 px) las tarjetas van en una columna y la línea baja recta.
   - La línea es CSS (`public/services-hub.css`), no un trazado de Figma: se adapta al alto de cada tarjeta. Pedido por Luis el 2026-11-13.
   - Copy nuevo aprobado por Luis el 2026-11-13: subtítulo del hero, "El recorrido" y "¿Por dónde empieza tu producto?". La tarjeta de Diseño de experiencia AI Native suma, debajo del resumen, "Amplifica el alcance y acelera el desarrollo de tu producto con un sistema que usa IA donde realmente aporta y criterio humano donde hay que decidir." (aprobado por Luis el 2026-11-13; campo `description` en `services.ts`, se muestra en su tarjeta de /servicios/ y como segundo párrafo del hero de /servicios/diseno-ai-native/). AI MVP Rescue repite el símbolo de diagnóstico rotado: falta un símbolo propio.
   - JSON-LD `ItemList` de `Service` + `BreadcrumbList`. Eventos GA4: `cta_servicios_*`, `servicios_<id>`.
2. **Home**: title "Agencia de diseño UX/UI para startups (IA, Fintech, SaaS) | Uxuaria", description y og:description alineadas con el H1.
3. **AI MVP Rescue**: title "Rescate de MVP hecho con IA (Claude, Lovable, Cursor) | Uxuaria" y description que empieza con "¿Creas tu MVP con IA?".

## A medir

Comparar en Search Console 28 días antes y después de publicar: posición de `/servicios/` y de la home, CTR de `/ai-mvp-rescue`.

## Segunda tanda (2026-11-13)

A partir del mismo diagnóstico:

- **Enlaces internos a `/servicios/`**: "Ver todos los servicios" en el menú desplegable (`data-track="nav_servicios_todos"`), "Servicios" en el menú móvil y en el pie, y un nivel "Servicios" en la ruta de navegación (y en el `BreadcrumbList`) de las cuatro páginas de servicio.
- **Pie**: "Consultoría UX para productos que crecen en LATAM" pasa a "Agencia de diseño UX/UI para startups que crecen en LATAM".
- **Tuteo** (decisions.md 2026-11-03) en la página de contacto, los mensajes de error del formulario (`contact.js`), el cierre de los artículos ("¿Quieres aplicar…?") y una pregunta del FAQ de la home. Quedan con voseo: `/privacidad/` y los artículos `3-cosas-ux`, `6-preguntas-ux` y `diferencias-creacion-ia-vs-diseno`.
- **Contacto**: description nueva orientada a diseño UX/UI para startups.
- **Reservas de Cal.com**: el embed envía `generate_lead` con `form_id: cal_booking` al confirmar una reserva (eventos `bookingSuccessfulV2` y `bookingSuccessful`, se envía una sola vez). A CONFIRMAR con una reserva de prueba. Los botones que abren la agenda en otra pestaña no se miden.
- **Datos estructurados de la home**: nodo `Organization` "Uxuaria" (`#organization`) con fundador `#luis`; la persona suma `worksFor`.

Pendiente de decisión: el `FAQPage` de la home describe preguntas que no se ven en la página, algo que las pautas de Google sobre datos estructurados piden evitar.
