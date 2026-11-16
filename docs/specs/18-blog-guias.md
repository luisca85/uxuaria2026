# 18 — Plantilla de guías del blog

**id:** `blog-guias`
**Estado:** 🚧 Construida en la rama `construir/blog-guias`, sin publicar · falta que Luis apruebe en el navegador el diseño y los puntos del resumen de las dos guías
**Última actualización:** 2026-11-16
**Relacionada con:** 06-blog, 10-astro, 12-blog-redesign

---

## Historia de usuario

**Como** founder o responsable de producto que llega desde Google a una guía larga del blog (9 o 10 minutos de lectura),
**quiero** ver de entrada qué cubre, saltar a la parte que me sirve y saber en qué punto de la guía estoy,
**para** resolver mi duda sin leerla entera y, si me convence, pedir un diagnóstico o agendar una llamada.

> Redactada a partir del pedido de Luis (2026-11-16).

## Objetivo

Dar a los artículos de tipo **guía / how-to** una plantilla propia, pensada para contenido largo y escaneable, sin cambiar la plantilla del resto de los artículos. Elegir la plantilla es un campo del frontmatter: publicar sigue siendo crear un Markdown.

Guías hoy: `metodo-harada` y `como-elegir-consultora-diseno-ux-confiable`.

Métrica de éxito: uso del índice (`blog_guide_toc`) y tasa de clics en callouts y CTA final de las guías frente a los demás artículos, en GA4. Valor objetivo: **A CONFIRMAR**.

---

## Diseño

- **Figma:** N/A. El diseño lo propone Claude en código, sobre los tokens de `public/site.css` y los patrones de `public/blog.css` (spec 12), y Luis lo revisa en el navegador.
- **Base:** la página de artículo de la spec 12. Se conservan cabecera, portada, "Sobre el autor", "Más artículos", CTA final y footer.

### Propuesta (a validar en el navegador)

| # | Elemento | Qué agrega frente al artículo normal |
|---|---|---|
| 1 | Cabecera | Igual a la spec 12. (Distintivo extra de guía: **A CONFIRMAR** #1) |
| 2 | Resumen inicial | Bloque con 3 a 5 puntos antes del cuerpo (título **A CONFIRMAR** #1). Sale del frontmatter (`summary`); si el artículo no lo tiene, no se muestra |
| 3 | Índice "En este artículo" | Generado solo de los `h2` del Markdown. En desktop, columna lateral fija junto al cuerpo, con la sección actual resaltada. En mobile, desplegable cerrado bajo la cabecera |
| 4 | Cuerpo | Misma columna de lectura. Los `h2` llevan número de sección ("01", "02"…) para que el índice y el texto se correspondan |
| 5 | Callouts y botones | Los `article-callout` y `btn` actuales, sin cambiar su HTML |
| 6 | Cierre | "Sobre el autor", "Más artículos" y CTA final de la spec 12 (Cal.com, `cta_article_call`) |

---

## Criterios de aceptación

**Elección de plantilla**
1. Dado un artículo con `type: guide` en el frontmatter, cuando se hace build, entonces `/blog/<slug>` usa la plantilla de guía.
2. Dado un artículo sin `type`, entonces usa la plantilla actual de la spec 12 y se ve exactamente igual que antes del cambio.
3. Dado un `type` con un valor no permitido, entonces el build falla con un mensaje claro.

**Índice**
4. Dada una guía con N `h2`, entonces el índice lista los N títulos en orden y cada uno lleva a su sección. "Fuentes" (`h3` final) no aparece.
4b. Dado el índice, entonces se titula "En este artículo" y cada ítem lleva el mismo número que su sección ("01", "02"…).
5. Dado un viewport de 1440 px, cuando hago scroll, entonces el índice queda visible a un costado y resalta la sección en la que estoy.
6. Dado un viewport de 375 px, entonces el índice aparece cerrado bajo la cabecera, se abre y se cierra, y al tocar un ítem lleva a la sección.
7. Dado JavaScript desactivado, entonces el índice se ve y sus links funcionan; solo se pierde el resaltado de la sección actual.
8. Dado un salto a una sección, entonces su título no queda tapado por el header fijo.
8b. Dado un clic en un ítem del índice, entonces se registra en GA4 el evento `blog_guide_toc` con la sección como parámetro.

**Resumen inicial**
9. Dada una guía con `summary` en el frontmatter, entonces se muestra antes del cuerpo como lista; sin resumen, no aparece ni deja espacio vacío.

**Contenido y SEO**
10. Dadas las dos guías actuales, entonces su texto, sus callouts, figuras, botones y `data-track` siguen iguales y funcionando.
11. Dada una guía, entonces conserva `title`, description, canonical, OG, JSON-LD `Article` y un único `<h1>`, y su URL no cambia.
12. Dado el listado `/blog` o "Más artículos", entonces las cards de las guías se ven igual que las demás, sin distintivo.
12b. Dada la guía, entonces su CTA final es el de la spec 12: abre Cal.com y registra `cta_article_call`.

**Accesibilidad e interacción**
13. Dado el índice, entonces es un `<nav>` con nombre accesible, se recorre con teclado y la sección actual se marca con `aria-current`.
14. Dado `prefers-reduced-motion: reduce`, entonces los saltos del índice no usan scroll suave.

**Responsive**
15. Dados 1440 px y 375 px, entonces no hay scroll horizontal y la columna de lectura no se angosta por debajo de lo que tiene hoy en la spec 12.

---

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Tipos con plantilla propia | Solo guía / how-to. Ensayo y preguntas siguen con la plantilla actual (Luis, 2026-11-16) |
| Diseño | Propuesto en código, revisado en el navegador; sin Figma (Luis, 2026-11-16) |
| Cómo se elige | Campo opcional `type: guide` en el frontmatter (código en inglés, CLAUDE.md); sin él, plantilla actual |
| Resumen inicial | Va. Claude propone los puntos de las dos guías y Luis los aprueba antes de publicar (Luis, 2026-11-16) |
| Índice | Solo `h2`, titulado "En este artículo" (Luis, 2026-11-16) |
| Numeración | Sí, "01", "02"… en los `h2` y en el índice (Luis, 2026-11-16) |
| Cards | Sin distintivo de guía en `/blog` ni en "Más artículos" (Luis, 2026-11-16) |
| CTA final | El de la spec 12: Cal.com, `cta_article_call` (Luis, 2026-11-16) |
| Barra de progreso | No va; se mantiene la regla de la spec 12 sin animaciones de scroll (Luis, 2026-11-16) |
| GA4 | Evento nuevo `blog_guide_toc` al hacer clic en el índice (Luis, 2026-11-16) |
| Artículo de la consultora | Se commitea y publica junto con este cambio, ya como guía (Luis, 2026-11-16) |

## Alcance

- Campos `type` y `summary` en el schema de `blog` en `src/content.config.ts`.
- Plantilla de guía: `src/pages/blog/[slug].astro` elige entre las dos; la de guía se arma con componentes en `src/components/`.
- Índice generado de los `headings` que devuelve `render()` de Astro, con un JS mínimo para el resaltado.
- Estilos en `public/blog.css` (o una hoja propia de guías), con su `?v=` actualizado.
- Frontmatter de las dos guías actuales: `type: guide` y su `summary`, con los puntos aprobados por Luis.
- Commit del artículo de la consultora y su portada (`public/images/blog/consultora-ux-portada.jpg`), sin cambiar su texto.

## Fuera de alcance / No tocar

- El texto de los artículos, sus URLs y sus metadatos SEO.
- La plantilla y el aspecto de los artículos que no son guía.
- Listado `/blog` y cards de "Más artículos".
- Barra de progreso de lectura u otras animaciones de scroll.
- MDX, RSS, búsqueda, filtros por tipo.
- Header, footer, home y `--color-highlight`.

## Dependencias

- **Spec 12:** cabecera, portada, autor, relacionados, CTA y `blog.css`.
- **Contenido:** colección `blog` (`src/content.config.ts`, `src/lib/blog.ts`).
- **Astro:** `headings` de `render()` para el índice; ids de los `h2` que ya genera el Markdown (el callout de Harada enlaza a `#y-si-tu-meta-es-un-producto-digital`).
- **Externos:** GA4 (eventos `data-track` existentes y el nuevo `blog_guide_toc`) y Cal.com.

## Estados (UI)

- **Vacío:** una guía sin `h2` no muestra índice; sin resumen, no muestra el bloque. La página no se rompe.
- **Carga:** N/A; página estática.
- **Error:** N/A. Un frontmatter inválido hace fallar el build (spec 10).

## Definición de hecho

La general de [`AGENTS.md`](../AGENTS.md), más:

- [ ] Las dos guías revisadas por Luis en el navegador, en 1440 px y 375 px.
- [ ] Los 5 artículos que no son guía, comparados antes y después: sin cambios visibles.
- [ ] Probados los links del índice, los callouts y los `data-track` de las dos guías, incluido `blog_guide_toc`.
- [ ] Luis aprobó los puntos del resumen de las dos guías.
- [ ] `docs/specs/06-blog.md` (cómo publicar una guía) y `docs/architecture.md` actualizados.
- [ ] Decisiones registradas con `/decidir`.

---

## A CONFIRMAR

1. **Distintivo en la cabecera y título del resumen:** Luis definió el título del índice ("En este artículo"). Falta saber si la cabecera lleva un distintivo de guía y cómo se titula el bloque de resumen ("Lo que vas a encontrar" es provisional). No bloquea: se construye con el provisional y sin distintivo.
2. **Valor objetivo de la métrica:** qué uso del índice o qué diferencia de clics se considera éxito.

---

## Dónde vive

- Schema: `type` (`article` | `guide`, por defecto `article`) y `summary` (3 a 5 textos) en `src/content.config.ts`.
- Plantilla: `src/pages/blog/[slug].astro` elige con `type`; el índice está en `src/components/GuideToc.astro`, en dos versiones: columna fija (desktop) y `<details>` cerrado (menos de 1100 px).
- Estilos: sección GUIDE de `public/blog.css` (`?v=20261116` en todas las páginas que lo cargan).
- JS: `public/guide.js`, solo en las guías. Resalta la sección actual con `aria-current`, cierra el índice mobile al tocar un ítem y envía `blog_guide_toc` con `section` vía `window.uxuariaTrack` (de `script.js`).
- Contenido: `type: guide` y `summary` en `metodo-harada.md` y `como-elegir-consultora-diseno-ux-confiable.md`.

## Conocido

- **Resumen de las dos guías:** los puntos los propuso Claude a partir de los `h2`, y llevan un comentario en el frontmatter hasta que Luis los apruebe. No se publica sin esa aprobación.
- **Números de sección:** salen de un contador CSS sobre los `h2` de `.post-body--guide`, no del Markdown. Un `h2` nuevo se numera solo.
- **Ids con tilde:** el `hash` de los links llega codificado (`reuni%C3%B3n`). `guide.js` lo decodifica antes de buscar la sección y de enviarla a GA4.
- **`prefers-reduced-motion`:** `blog.css` desactiva el scroll suave de `base.css`. Como también lo cargan las páginas de servicio y AI MVP Rescue, el cambio las alcanza, solo para quien pidió menos movimiento.
- **Ancho en mobile:** `site.css` se carga después de `blog.css`, por eso el padding de la guía usa `.post-guide.page-container` para mantener la columna de 343 px a 375 px.

- Las dos guías ya usan callouts (`article-callout`) y botones (`btn btn--primary`) en HTML dentro del Markdown, con estilo de `blog.css` (spec 12).
- "Fuentes" es un `h3` al final; no debe entrar en el índice.
