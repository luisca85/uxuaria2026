# 07 — Funnel del diagnóstico (AI MVP Rescue)

**id:** `funnel-diagnostico`
**Estado:** ✅ En producción · cambio a dos niveles (A/B) del 2026-09-30 pendiente de deploy y de regresión C · pendiente: envíos reales A/B, GA4 DebugView y celular real (los hace Luis)
**Última actualización:** 2026-09-30
**Relacionada con:** [05-rescue-service.md](05-rescue-service.md) (landing AI MVP Rescue y backend `/api/diagnostico`)

---

## Historia de usuario

**Como** founder o PM con una app hecha con IA que no está creciendo,
**quiero** pedir un diagnóstico UX sin costo respondiendo unas preguntas rápidas, de a una por vez,
**para** recibir el siguiente paso que corresponde a mi caso (reunión, diagnóstico express o recursos) sin fricción.

## Objetivo

Reemplazar el modal de 3 pasos por un funnel de captación en **página propia** (`/diagnostico/`), clara, con el logotipo negro y una interacción tipo Typeform: una pregunta por pantalla, navegable con teclado. El formulario de contacto (`/contacto/`) es otra cosa y **no cambia**.

**Typeform queda deprecado** (decisión del 2026-09-28): todo lo que antes llevaba a Typeform ahora lleva a este funnel.

Cada envío tiene que llegar por email a Luis, y al terminar el formulario la persona ve una **página de agradecimiento** (thank you page). **No hay email automático al lead**: Luis responde a mano (decisión del 2026-09-28). La automatización de la respuesta se va a rediseñar más adelante, fuera de esta spec.

Métrica de éxito: evento **`generate_lead`** en GA4 (envío exitoso a `/api/diagnostico`).

---

## Criterios de aceptación

**Entrada al funnel**
1. Dado que estoy en `/ai-mvp-rescue`, cuando veo los 3 CTA de conversión (`cta_hero`, `cta_proceso`, `cta_final`), entonces los 3 dicen **"Agendá tu diagnóstico UX sin costo"** y llevan a `/diagnostico/?cta=<id>`.
2. Dado que llegué a `/ai-mvp-rescue` con UTM o `gclid` en la URL, cuando hago clic en un CTA, entonces esos parámetros pasan a `/diagnostico/`.
3. Dado un link `uxuaria.com/ai-mvp-rescue#diagnostico` (DMs de LinkedIn), cuando lo abro, entonces me redirige a `/diagnostico/?cta=link_directo`, conservando los UTM.
4. Dado que hago clic en un CTA, entonces se registra `click_formulario_ai_mvp_rescue` con su `cta_id`.
5. Dado que busco el modal `#diag-modal` en `ai-mvp-rescue.html`, entonces no existe (se borraron su HTML, CSS y JS).
5b. Dado que busco referencias a Typeform en el sitio (`typeform.com`, `#checkup-modal`, `ckm-typeform`), entonces no hay ninguna activa.

**Interacción tipo Typeform**
6. Dado que abro `/diagnostico/`, entonces veo una pantalla de bienvenida con el título "Diagnóstico gratuito de tu MVP", el logotipo "uxuaria" en negro sobre fondo claro y el botón "Empezar".
7. Dado que estoy en una pregunta, entonces se ve sola en pantalla, con su número, una barra de progreso arriba y botones ↑↓ abajo a la derecha.
8. Dado que respondí una pregunta de texto, cuando presiono Enter o "OK", entonces paso a la siguiente con una transición vertical.
9. Dado una pregunta de opción única, cuando elijo una opción con clic o con su letra (A–F), entonces la opción parpadea y avanzo solo, sin presionar OK.
10. Dado una pregunta opcional (producto, preocupación, contexto), cuando presiono Enter sin responder, entonces avanzo igual.
11. Dado una pregunta obligatoria vacía o inválida, cuando intento avanzar, entonces veo un error en línea y no avanzo:
    - URL sin dominio (por ejemplo `miapp`): "Escribí la dirección completa, por ejemplo miapp.com".
    - Email inválido: "Hmm… ese email no parece válido".
    - Opción sin elegir: "Elegí una opción".
12. Dado que escribí mi nombre, cuando llego a la pregunta del email, entonces dice "Un gusto, <nombre>. Tu email".
13. Dado que estoy en el campo de contexto, cuando presiono Shift+Enter, entonces se agrega un salto de línea en lugar de avanzar.
14. Dado que presiono ↑ o ↓ (o uso la rueda del mouse) fuera de un campo de texto, entonces voy a la pregunta anterior o a la siguiente.

**Preguntas** (valores idénticos a `OPCIONES` en `functions/api/diagnostico.js`)
15. El orden es: 1 URL\* · 2 nombre del producto · 3 cómo la construiste\* · 4 etapa\* · 5 usuarios activos por mes\* · 6 rol\* · 7 presupuesto a 3 meses\* · 8 urgencia\* · 9 mayor preocupación · 10 nombre\* · 11 email\* · 12 contexto (\* = obligatoria).

**Envío y resultado**
16. Dado que completé todo, cuando presiono "Pedir mi diagnóstico" (o Enter en la última pregunta), entonces se envía `POST /api/diagnostico` con JSON que incluye:
    - los campos del formulario;
    - UTM y `gclid`;
    - `_t`: milisegundos desde "Empezar";
    - el campo trampa `website`.
17. Dado que la API responde `{ ok: true }`, entonces me redirige a la página de agradecimiento **`/diagnostico/gracias`**. El nivel no se muestra al usuario. El nivel B ve el mensaje general; nivel A ve además las condiciones y el botón para agendar (criterio 18c).
18. Dado que estoy en `/diagnostico/gracias`, entonces veo el mismo layout (fondo claro, logotipo negro), un ícono ✓ y:
    - el título "¡Gracias, <nombre>!", o "¡Gracias!" si no hay nombre disponible;
    - el texto "Recibí tu pedido de diagnóstico. Te escribo personalmente pronto.";
    - el link "Volver a AI MVP Rescue".
    El nombre se pasa con `sessionStorage` (no por la URL, para no exponer datos personales). El texto dice "pronto", sin plazo concreto (decisión de Luis, 2026-09-28).
18b. Dado que abro `/diagnostico/gracias` directamente, sin haber enviado el formulario, entonces veo la versión sin nombre. La página es `noindex, nofollow` y no dispara `generate_lead`.
18c. **(Agregado 2026-09-28, decisión de Luis.)** Dado que mi envío dio nivel A, cuando llego a `/diagnostico/gracias`, entonces en lugar de "Te escribo personalmente pronto" veo:
    - el texto de que mi proyecto encaja con el diagnóstico completo y que el siguiente paso es una llamada de 30 minutos;
    - "Cómo funciona" (3 pasos) y "Lo que te pido a cambio" (testimonio si resulta útil, permiso para escribir sin nombrar el producto, usuario de prueba);
    - el botón **"Agendar la llamada"**, que abre el Calendly de Luis en otra pestaña con mi nombre y email precargados;
    - la nota "Al agendar aceptás estas condiciones".
    El link llega en la respuesta de `/api/diagnostico` (`calendly`, solo para nivel A) y pasa por `sessionStorage`, igual que el nombre. Clic en el botón registra `agenda_click`. Si el storage está bloqueado o el link no es de `calendly.com`, se ve la versión general.
19. Dado un envío exitoso, entonces se registra `generate_lead` con `nivel` y `cta_id`.
19b. Dado un envío exitoso, entonces Luis recibe un email (Web3Forms) con el asunto `[Nivel X · N pts] Nuevo lead: …` y todas las respuestas.
19c. Dado un envío exitoso, entonces la persona **no** recibe ningún email automático: `RESEND_API_KEY` y `MAIL_FROM` no se cargan en Cloudflare, y el código se saltea ese paso solo.
20. Dado que el envío falla (red o `ok: false`), entonces veo "No se pudo enviar. Probá de nuevo o escribime a info@uxuaria.com", el botón se reactiva y mis respuestas siguen ahí.
21. Dado que alguna pregunta obligatoria quedó inválida, cuando intento enviar, entonces me lleva a la primera pregunta con problemas.

**Tracking GA4**
22. Al presionar "Empezar" se registra `form_start`, y al avanzar cada pregunta, `form_step` con el nombre del paso.

**Responsive y accesibilidad**
23. Dado un viewport de 375 px, entonces no hay scroll horizontal, las preguntas se leen completas y la navegación ↑↓ no tapa el botón principal. Luis lo prueba en un celular real.
24. Dado que navego solo con teclado, entonces el foco va al campo o a la opción de la pregunta activa, y las pantallas inactivas no son focusables (`inert`).
25. Dado `prefers-reduced-motion`, entonces no hay transiciones ni parpadeo.

---

## Alcance

- Página nueva `diagnostico/index.html` + `diagnostico/diagnostico.css` + `diagnostico/diagnostico.js`.
- Página de agradecimiento `diagnostico/gracias.html` (`noindex, nofollow`, fuera de `sitemap.xml`). Reusa `diagnostico.css`.
- Quitar de `diagnostico/index.html` las pantallas de resultado por nivel y, de `diagnostico.js`, la lógica de nivel y Calendly.
- En `ai-mvp-rescue.html`:
  - Los 3 CTA pasan a apuntar a `/diagnostico/`, con el texto nuevo.
  - El JS de los CTA pasa `cta_id` y los UTM.
  - Se redirige `#diagnostico`.
  - Se borra el modal `#diag-modal`.
- **Deprecar Typeform**: borrar el modal `#checkup-modal` de `index.html` (con su iframe de Typeform) y el bloque JS "UX Checkup Modal" de `script.js`. Hoy es código muerto: el botón que lo abría (`btn-apply-checkup`) ya no existe, así que borrarlo no cambia nada visible.
  - Los estilos `ckm-*` de `styles.css` se borran solo si no los usa ninguna otra página (verificar con grep).
  - La clase `.checkup` y sus derivadas **no se tocan**.
- Actualizar `05-rescue-service.md`:
  - Su "Funnel" y su sección "Typeform" pasan a apuntar a esta spec y a `/diagnostico/`.
  - Su sección "Actualización 2026-09-28" describe el modal `#diag-modal`, que ya no existe.

## Fuera de alcance / No tocar

- **Diseño actual del sitio**: no se modifica nada visual fuera de `/diagnostico/`. En `ai-mvp-rescue.html` solo cambian el destino y el texto de los CTA.
- **`/contacto/`**: el formulario de contacto queda exactamente como está.
- **`functions/api/diagnostico.js`**: puntaje, niveles y la integración con Notion no cambian. Único cambio (2026-09-28): ya no llama a Web3Forms y devuelve `asunto` y `resumen` para que el aviso lo mande el navegador. Segundo cambio (2026-09-28): devuelve `calendly` solo para el nivel A. Tercer cambio (2026-09-30): pasa a dos niveles, A (≥ 60) y B (el resto, incluido proyecto personal); se elimina el C. La próxima acción del nivel B en Notion es genérica ("revisar el caso y responder a mano").
- **Copy de las preguntas**: es el del modal anterior. Cualquier cambio necesita aprobación.
- **Pantallas de resultado por nivel**: se reemplazan por la página de agradecimiento única. Excepción agregada el 2026-09-28: el nivel A ve en esa misma página las condiciones y el botón de Calendly (criterio 18c).
- **Tokens de `diagnostico.css`**: quedan en el `:root` propio del archivo. Mover o no a `styles.css` es una decisión postergada; no se toca en este feature.
- **`ux-ai-repair.html`**: ya resuelto fuera de este feature. Se eliminó el 2026-09-28 y `/ux-ai-repair` redirige 301 a `/ai-mvp-rescue` en `_redirects`.

## Dependencias

- `POST /api/diagnostico` (`functions/api/diagnostico.js`, Cloudflare Pages Functions).
- **Email a Luis**: Web3Forms, enviado **desde el navegador** (`diagnostico.js`) con el `asunto` y el `resumen` que devuelve `/api/diagnostico`. El plan Free de Web3Forms rechaza los envíos server-side, como los de una Cloudflare Function. La access key es pública por diseño, igual que en `/contacto/`.
- **Email automático al lead (Resend)**: no se usa en esta spec. El código ya lo soporta, pero solo se activa si están cargadas `RESEND_API_KEY` y `MAIL_FROM`. Queda para el rediseño de la automatización.
- **Ficha en Notion**: `NOTION_TOKEN`, opcional. Sin ella el lead igual llega por email.
- **Otras variables opcionales**: `NOTION_DB_ID` y `CALENDLY_URL` tienen valor por defecto en el código. La clave de Web3Forms está en `diagnostico.js`, no en la función.
- Qué variables están cargadas hoy en producción no se sabe (se revisa en Cloudflare Pages → Settings → Variables and secrets). **No bloquea**: el aviso a Luis funciona con la clave de Web3Forms del código, y sin Resend no sale ningún email al lead, que es lo buscado.
- GA4 `G-6TCJ5969G7` (snippet en `diagnostico/index.html`). `ai-mvp-rescue.html` usa su propio helper `track()`.
- `styles.css`: tokens y `.logo-text`. `script.js` (sin dependencias fuertes, todos los lookups tienen guardas).
- Google Fonts: Inter.

## Estados (UI)

- **Vacío / inicial:** pantalla de bienvenida con "Empezar" y "Menos de 2 minutos". Barra de progreso en 0.
- **Carga:** al enviar, el botón dice "Enviando…" y queda deshabilitado; no se puede enviar dos veces.
- **Error de validación:** mensaje en línea, en rojo, con una pequeña sacudida, debajo del campo. Se borra al escribir o elegir.
- **Error de envío:** mensaje en línea con el email de contacto; el botón se reactiva.
- **Éxito:** redirección a `/diagnostico/gracias` (página de agradecimiento única).
- **Sin JavaScript:** se oculta el formulario y se muestra un aviso para escribir a `info@uxuaria.com`. Decidido el 2026-09-28: alcanza. La prioridad es que el formulario funcione bien para quien tiene JS, que es casi todo el mundo, y no se modifica `functions/api/diagnostico.js` para aceptar formularios sin JS. Esto es una excepción a la regla de progressive enhancement de `CLAUDE.md`, registrada en `docs/decisions.md`.

## Diseño

N/A: no hay Figma de referencia. Se diseñó directamente en código durante la exploración (rama `explorar/funnel-diagnostico`).

Referencia visual: fondo `--color-bg` (blanco), texto y botones `--color-text` (#111), logotipo `.logo-text` en negro, opciones con borde fino y tecla de letra, errores en rojo claro.

## Definición de hecho

La general de [`docs/AGENTS.md`](../AGENTS.md), más la propia de este feature:

- [x] Los criterios de aceptación verificados en el navegador (desktop y 375 px). Ver "Revisión 2026-09-29".
- [ ] Prueba en celular real (la hace Luis).
- [ ] Envío probado contra la función real (deploy de preview de Cloudflare), con un lead de prueba por nivel A y B, usando un email propio de Luis. Se confirma que:
  - el nivel A ve las condiciones y el botón de Calendly con nombre y email precargados; B, el mensaje general;
  - llega el aviso a Luis;
  - se muestra la página de agradecimiento;
  - el lead no recibe ningún email automático;
  - después se borran las fichas de prueba en Notion, si las hubo.
- [ ] `generate_lead` visible en GA4 DebugView, junto con `form_start`, `form_step` y `click_formulario_ai_mvp_rescue`.
- [x] Los valores de las opciones del HTML coinciden con `OPCIONES` de `functions/api/diagnostico.js`.
- [x] `/diagnostico/` con `noindex, follow` y fuera de `sitemap.xml` (decidido: no se indexa).
- [x] Sin referencias activas a Typeform en el sitio.
- [x] `05-rescue-service.md` actualizado y apuntando a esta spec.
- [x] `/contacto/` sin cambios (diff vacío).

---

## Dónde vive

- `diagnostico/index.html`: markup de las 12 preguntas.
- `diagnostico/gracias.html`: página de agradecimiento (URL `/diagnostico/gracias`), con el bloque `#thanksBooking` para el nivel A (clases `tf-booking*`).
- `diagnostico/diagnostico.css`: estilos tipo Typeform (clases `tf-*`).
- `diagnostico/diagnostico.js`: navegación, validación, envío a `/api/diagnostico` y tracking.
- `ai-mvp-rescue.html`: CTA y bloque JS "Diagnóstico: los CTA llevan al funnel en página propia".
- `functions/api/diagnostico.js`: backend (puntaje, nivel A/B y Notion). Sus cambios por este feature están listados en "Fuera de alcance / No tocar".
- `index.html` + `script.js` + `styles.css`: ya no tienen el modal `#checkup-modal` de Typeform ni los estilos `ckm-*` (borrados en este feature).

## Conocido

- El servidor local (`python3 -m http.server`) no ejecuta Pages Functions. Para probar el envío hace falta `wrangler pages dev` o un mock local.
- En local aparece un 404 de `/cdn-cgi/.../email-decode.min.js` en `ai-mvp-rescue.html`: es la protección de email de Cloudflare, que solo existe en producción.
- Las clases CSS usan el prefijo `tf-` con BEM (`tf-choice__key`, `tf-step--end`). Los estados usan `is-*` (`is-active`, `is-blinking`), como el resto del sitio.
- **Web3Forms no acepta envíos server-side en el plan Free** ("This method is not allowed…"). El primer deploy (2026-09-28) mandaba el aviso desde la función, y el envío de prueba de Luis no llegó ni se registró. Por eso el aviso sale desde el navegador. Si `NOTION_TOKEN` no está cargado, el email es el único registro del lead.
- **Caché del navegador:** Cloudflare sirve `.js` y `.css` con `max-age=14400` (4 h). Por eso `diagnostico.css` y `diagnostico.js` se cargan con `?v=AAAAMMDD`, y hay que cambiar ese número al modificarlos. Un envío de prueba ("bvv", 2026-09-28) usó el script viejo en caché y el aviso no salió.
- La respuesta de Web3Forms se valida por `success: true` en el cuerpo, no solo por el código HTTP.

## Revisión 2026-09-29

Hecha en producción (`main` = `origin/main`). No se crearon datos reales: se simularon en el navegador las respuestas de `/api/diagnostico` y Web3Forms, y se anuló `gtag`.

- **Estático**: los valores de las opciones coinciden con `OPCIONES`; el orden de las preguntas es el del criterio 15; `noindex` en las dos páginas y ninguna en el sitemap; sin referencias a Typeform ni a `diag-modal`; `/contacto/` sin cambios; sin secretos en el diff (la clave de Web3Forms es pública por diseño).
- **Navegador**: criterios 1–4, 6–14, 16–18c, 19b, 20–24 OK. Nivel A: el botón de Calendly lleva nombre y email precargados. `/gracias` abierta directo: versión sin nombre y sin bloque de agenda. A 375 px no hay scroll horizontal y los botones ↑↓ no tapan opciones. Consola sin errores.
- **Por código**: 19 (`generate_lead` con `nivel` y `cta_id`), 19c (sin Resend no sale el email) y 25 (`prefers-reduced-motion` en `diagnostico.css`).
- **Regresión B** de `AGENTS.md`: OK (páginas en 200, redirects en 301, `POST {}` a la API da 400).
- **Pendiente (Luis)**: envío real por nivel A y B (incluido un proyecto personal, que cae en B), `generate_lead` en GA4 y prueba en un celular real.
