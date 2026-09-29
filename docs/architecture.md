# Arquitectura

Sitio estático multipágina (HTML + CSS + JS vanilla, sin build) en Cloudflare Pages.
Un push a `main` es un deploy. El único código de servidor son dos Pages Functions en `functions/api/`.
Reconstruido desde el código el 2026-09-29. Lo que no se pudo verificar en el repo está marcado **A CONFIRMAR**.

---

## Módulos

| Módulo | Qué hace | Spec |
|---|---|---|
| Home (`index.html`) | Página de captación: hero, proof bar, servicios, portafolio (destacado + carrusel), testimonios, about, CTA | 00, 03 |
| Servicios (`servicios/`) | Índice + 4 páginas: investigación, MVP, experiencia, crecimiento | 00, 03 |
| Portafolio (`portafolio/*.html`) | 7 casos de estudio, uno por archivo | 02 |
| Blog (`blog.html`, `blog/*.html`) | Índice + 4 artículos | 06 |
| Contacto (`contacto/`) | Formulario general; envía a Web3Forms desde el navegador | 04 |
| AI MVP Rescue (`ai-mvp-rescue.html`) | Landing autocontenida del servicio de rescate: CSS y JS inline, **no** carga `styles.css` ni `script.js` | 05 |
| Funnel diagnóstico (`diagnostico/`) | Formulario de una pregunta por pantalla → `/api/diagnostico` → `/diagnostico/gracias` | 07 |
| `/api/diagnostico` (`functions/api/diagnostico.js`) | Calcula puntaje y nivel A/B/C, crea la ficha en Notion y (opcional) manda email al lead con Resend | 05, 07 |
| `/api/contacto` (`functions/api/contacto.js`) | Eliminado el 2026-09-29 (código muerto; ver decisions.md) | 04 |
| UI compartida (`script.js`) | GA4 `uxuariaTrack` + `data-track`, navbar, menú mobile, smooth scroll, carruseles, parallax de servicios, contadores, fade-in, sticky CTA | — |
| Design system (`styles.css`) | Tokens en `:root` + componentes de todas las páginas (estilo "Retro 3.1") | 01 |

## Dónde vive cada cosa

```
/                     index.html, blog.html, ai-mvp-rescue.html, 404.html
styles.css            estilos globales y de home, blog, artículos y casos (un solo archivo)
script.js             comportamiento compartido; lo cargan todas las páginas salvo ai-mvp-rescue y gracias
servicios/            index + 4 subcarpetas con index.html; estilos propios en servicios.css
portafolio/           un .html por caso
blog/                 un .html por artículo
contacto/             index.html (con el JS del formulario inline) + contacto.css
diagnostico/          index.html, gracias.html, diagnostico.css, diagnostico.js (versionados con ?v=)
functions/api/        Pages Functions (código de servidor)
images/               assets: portfolio/, blog/, services/, testimonials/, logos/ y sueltos
_redirects            301 de Cloudflare (/index.html, /es/*, /en/*, ux-ai-repair → ai-mvp-rescue)
sitemap.xml, robots.txt   SEO; /diagnostico/ y 404 llevan noindex y no están en el sitemap
docs/                 AGENTS.md, architecture.md, decisions.md, specs/
.claude/              config local (launch.json, servidor de preview); ignorado por git
```

Las URLs públicas no llevan `.html` (Cloudflare Pages las resuelve). El servidor local (`python3 -m http.server`) **no** hace esto ni ejecuta `functions/`.

## Modelo de datos

No hay base de datos propia. Las entidades viven en servicios externos.

- **Lead de diagnóstico**: nombre, email, URL del producto, construcción, etapa, usuarios, rol, presupuesto, urgencia, problema.
  - Puntaje = suma de etapa + usuarios + rol + presupuesto + urgencia (tabla `OPCIONES` en `functions/api/diagnostico.js`).
  - Nivel: **A** ≥ 60 · **B** ≥ 35 · **C** si está por debajo, o si el rol o el presupuesto son "personal".
  - Los `value` de las opciones en `diagnostico/index.html` deben coincidir con las claves de `OPCIONES`.
- **Mensaje de contacto**: nombre, email, tipo de proyecto, etapa, problema, cómo llegó.

## Persistencia y servicios externos

| Dato | Dónde queda | Quién lo manda |
|---|---|---|
| Lead de diagnóstico | Notion, base "Funnel Uxuaria" | `/api/diagnostico` (si hay `NOTION_TOKEN`) |
| Aviso a Luis (diagnóstico y contacto) | Email vía Web3Forms | El navegador: el plan Free rechaza envíos server-side |
| Email de bienvenida al lead | **Inactivo.** Luis le escribe a mano. El código de Resend existe pero no hay `RESEND_API_KEY` | `/api/diagnostico` |
| Agenda de la primera llamada (nivel A) | Calendly | Link que devuelve `/api/diagnostico` |
| Nombre y link de agenda para `/gracias` | `sessionStorage` (se borran al leerse) | `diagnostico.js` |
| Eventos (`generate_lead`, clicks con `data-track`) | Google Analytics 4 (`G-6TCJ5969G7`) | `script.js` / scripts inline |

Otros externos: Google Fonts, LinkedIn y WhatsApp (links).

Variables de entorno de Pages (documentadas en el encabezado de `functions/api/diagnostico.js`): `NOTION_TOKEN`, `NOTION_DB_ID`, `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_REPLY_TO`, `CALENDLY_URL`.
Resend no está activo: no hay email automático al lead. A CONFIRMAR: si `NOTION_TOKEN` y `CALENDLY_URL` están cargadas (sin `CALENDLY_URL` se usa el link por defecto del código).

## Caché

Cloudflare sirve el HTML con `max-age=0` y el CSS y JS con `max-age=14400` (4 h). No hay archivo `_headers`: es el comportamiento por defecto. Por eso los assets del diagnóstico se versionan con `?v=AAAAMMDD` (ver AGENTS.md).

## Excepciones conocidas

- `/diagnostico/` requiere JavaScript (decisión del 2026-09-28).
- El formulario de `contacto/` no tiene `action`, así que sin JavaScript no envía. Es un bug y está pendiente de arreglo (spec 04).
- `ai-mvp-rescue.html` nació como una landing aparte (`ux-ai-repair.html`, 2026-06-15). Tiene unas 800 líneas de CSS inline con tokens propios y copias de la navbar y el footer. No usa `styles.css` ni `script.js`.
