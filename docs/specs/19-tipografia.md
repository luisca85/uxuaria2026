# 19 — Escala tipográfica unificada

**id:** `tipografia`
**Estado:** ✅ Implementada en local el 2026-11-16, con la home como excepción (aprobado por Luis) · sin publicar
**Última actualización:** 2026-11-16
**Relacionada con:** 01-design-system, 11-home, 12-blog-redesign, 13-proyectos, 14-contacto, 15-paginas-servicio, 17-servicios-hub

---

## Historia de usuario

**Como** founder que recorre el sitio de Uxuaria,
**quiero** que cada página tenga la misma jerarquía visual (título, subtítulo, descripción, etiqueta),
**para** entender de un vistazo qué es lo principal y percibir un sitio cuidado y coherente.

**Como** Luis, que mantiene el sitio,
**quiero** una sola escala de tamaños con nombres por rol,
**para** que cualquier página o caso nuevo use los mismos estilos sin decidir tamaños a mano.

## Objetivo

Reemplazar los tamaños sueltos por una escala de 9 roles, definida en `:root` de `public/site.css`, con la misma relación de tamaño entre niveles en todas las páginas del diseño nuevo.

---

## Diagnóstico (medido el 2026-11-16, a 1440 px)

### 1. El título principal es más chico que los subtítulos

| Página | `h1` | `h2` |
|---|---|---|
| `/servicios` | 32 px | 40 px |
| `/servicios/investigacion` | 32 px | 40 px |
| `/sobre-nosotros` | 32 px | 40 px |
| `/portafolio/<caso>` | 32 px (64 px en local, cambio sin publicar) | 48 px |
| `/portafolio` | 48 px | 64 px (nombre de cada proyecto) |
| `/blog`, `/contacto`, artículo | 48 px | 40 px |
| Home | 64 px | 48 px |

El mismo rol, el título de la página, aparece en tres tamaños: 32, 48 y 64 px.

### 2. Demasiados tamaños y nombres

- **11 tamaños distintos** en desktop: 11, 13, 14, 16, 20, 24, 32, 40, 48, 56 y 64 px.
- **Tokens que no describen el rol:** `--ux-size-display` (22–48 px) es más chico que `--ux-size-section` (32–48 px), y `--ux-size-heading` (28–40 px) se usa para títulos de distinto nivel.
- **Escalas propias por página:** `--home-size-*` (9 tokens), `--case-size-*` y `--contact-size-title`, además de unos 40 valores fijos en px repartidos entre `site.css`, `portfolio.css`, `service.css`, `blog.css` y `contact.css`.

### 3. Mismo nivel, distinto estilo

- **Títulos de sección (`h2`):** 40 px/700, 48 px/700 y 40 px/500, según la página.
- **Títulos de tarjeta (`h3`):** 40/500, 32/500, 24/700 y 24/400.
- **Tipografía mezclada:** los CTA finales ("Conversemos…", "¿Prefieres empezar por escrito?") y una frase de la home usan **Inter** en 40 y 56 px, mientras que el resto de los títulos usa Space Grotesk.
- **Etiquetas:** las de Space Mono están en 11 px, muy chicas para leer con comodidad. Las fechas usan Inter en 13 px.

---

## Propuesta: 9 roles

Tamaños fluidos entre 375 px y 1440 px de ancho (`clamp()`). La relación entre un nivel y el siguiente es de 1,2 a 1,5, así que cada salto se nota.

| Rol | Token | Desktop | Mobile | Peso | Interlineado | Fuente | Uso |
|---|---|---|---|---|---|---|---|
| Display | `--ux-size-display` | 64 | 40 | 700 | 1,05 | Space Grotesk | El `h1` de **todas** las páginas, el hero de la home y las cifras grandes |
| Título | `--ux-size-title` | 48 | 32 | 700 | 1,1 | Space Grotesk | `h2` de sección y CTA final |
| Subtítulo | `--ux-size-subtitle` | 32 | 24 | 500 | 1,2 | Space Grotesk | `h3`: tarjetas, proyectos en la lista, artículos en el blog |
| Título chico | `--ux-size-heading` | 24 | 20 | 700 | 1,25 | Space Grotesk | `h4`: ítems, preguntas frecuentes, cabeceras de tabla |
| Bajada | `--ux-size-lead` | 24 | 20 | 400 | 1,4 | Space Grotesk | Párrafo de introducción bajo el `h1` o el `h2` |
| Texto | `--ux-size-body` | 20 | 18 | 400 | 1,5 | Space Grotesk | Párrafos y listas |
| Texto chico | `--ux-size-small` | 16 | 16 | 400 | 1,5 | Space Grotesk | Texto de tarjetas, leyendas, botones, formularios |
| Dato | `--ux-size-meta` | 14 | 14 | 700 | 1,3 | Space Mono | Línea de datos ("Fintech · Costa Rica · 2022"), fechas, navegación de migas |
| Etiqueta | `--ux-size-label` | 12 | 12 | 700 | 1,3 | Space Mono, mayúsculas | Etiquetas de sección ("01 / IMPACTO"), badges |

**Fórmulas** (`site.css`):

```css
--ux-size-display:  clamp(40px, 31.55px + 2.254vw, 64px);
--ux-size-title:    clamp(32px, 26.37px + 1.502vw, 48px);
--ux-size-subtitle: clamp(24px, 21.18px + 0.751vw, 32px);
--ux-size-heading:  clamp(20px, 18.59px + 0.376vw, 24px);
--ux-size-lead:     clamp(20px, 18.59px + 0.376vw, 24px);
--ux-size-body:     clamp(18px, 17.30px + 0.188vw, 20px);
--ux-size-small:    16px;
--ux-size-meta:     14px;
--ux-size-label:    12px;
```

### Qué cambia a la vista

- **`h1` de servicios, diagnóstico UX y sobre nosotros:** de 32 px a 64 px.
- **`h1` de blog, proyectos, contacto y artículos:** de 48 px a 64 px.
- **Títulos de sección (`h2`) que hoy miden 40 px:** pasan a 48 px y quedan siempre en negrita.
- **Nombres de proyecto en `/portafolio`:** de 64 px a 32 px, para que no compitan con el `h1`.
- **Títulos de artículos en `/blog` y de servicios en `/servicios`:** de 40 px a 32 px.
- **CTA finales y frase de la home en Inter:** pasan a Space Grotesk 48 px.
- **Etiquetas de Space Mono:** de 11 px a 12 px. **Fechas en Inter de 13 px:** pasan a Space Mono 14 px.
- **Inter:** queda solo para la interfaz de la agenda y el enlace "Saltar la agenda".

---

## Criterios de aceptación

1. Dada cualquier página del diseño nuevo a 1440 px, entonces su `h1` mide 64 px y es el texto más grande de la página, salvo las cifras de resultados, que comparten el rol Display.
2. Dada cualquier página, entonces cada `h2` es más chico que el `h1` y más grande que cualquier `h3`, y así en cada nivel.
3. Dado el mismo rol en dos páginas distintas, entonces tiene el mismo tamaño, peso, interlineado y fuente.
4. Dado un viewport de 375 px, entonces los tamaños son los de la columna Mobile, no hay scroll horizontal y ninguna palabra se corta fuera de su contenedor.
5. Dado el CSS del diseño nuevo, entonces todo `font-size` usa uno de los 9 tokens; no quedan valores en px ni los tokens `--home-size-*`, `--case-size-title` ni `--contact-size-title`.
6. Dado un cambio de CSS, entonces su `?v=` está actualizado en los HTML que lo cargan (`AGENTS.md`, regla 5).

## Alcance

- `public/site.css` (tokens y estilos compartidos), `home.css`, `portfolio.css`, `blog.css`, `contact.css`, `service.css` y `services-hub.css`.
- Páginas: todas las de `src/pages/` (home, servicios, AI MVP Rescue, proyectos, blog, contacto, sobre nosotros, privacidad y 404). Todas cargan el diseño nuevo (`legacyStyles={false}`).

## Fuera de alcance / No tocar

- Las páginas estáticas con CSS propio: `public/diagnostico/` y `public/mutisux/`.
- **La home**, por decisión de Luis: conserva su escala propia de Figma (`--home-size-*`, spec 11).
- **Header y footer:** logo, navegación, menú de servicios y columnas del footer conservan sus tamaños. Son parte del chrome compartido con la home.
- **La agenda de Cal.com** (`.booking-module__footer`, Inter 13 px) y los bloques de código de Design System AI Ready (`.ds-code`).
- El copy, los colores, los espacios entre secciones y el layout. Solo cambia la tipografía.
- La línea de cifras de la home (`dd`) se queda en Display 64 px, como hoy.

## Definición de hecho

La general de [`AGENTS.md`](../AGENTS.md), más:

- [ ] Medición de tamaños repetida en las 9 páginas de muestra, a 1440 y a 375 px, sin inversiones de jerarquía.
- [ ] Capturas de antes y después de home, un servicio, un caso y un artículo.
- [ ] `docs/specs/01-design-system.md` actualizado con la escala.
- [ ] Decisión registrada con `/decidir`.

---

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Home | Excepción: queda con su escala de Figma (Luis, 2026-11-16) |
| Peso de los subtítulos (`h3`) | 500, la propuesta por defecto, porque no hubo otra indicación |
| Artículos y privacidad | El `h2` del cuerpo usa Subtítulo (32 px) y el `h3`, Título chico (24 px): un nivel menos que una sección de página, para que el texto largo no quede pesado |
| Interlineado | Se unificó en los 4 roles de título (`--ux-leading-*`). Los párrafos conservan el suyo |
| Figma | No se tocó Uxuaria Library |

## Dónde vive

- Tokens: `:root` de `public/site.css` (`--ux-size-*` y `--ux-leading-*`).
- Aplicados en `site.css`, `portfolio.css`, `blog.css`, `contact.css`, `service.css`, `services-hub.css` y `privacidad/privacidad.css`, con `?v=` actualizado en `src/`.
- Se eliminaron `--ux-size-section`, `--case-size-title`, `--case-size-value` y `--contact-size-title`.

## Conocido

- Medición del 2026-11-16 en 12 páginas: a 1440 px, `h1` 64 → `h2` 48 → `h3` 32/24 en todas, salvo la home. A 375 px, `h1` 40 → `h2` 32 → `h3` 24/20. Sin scroll horizontal.
- `/portafolio`: los nombres de proyecto bajan de 64 a 32 px.
- `/contacto`: el `h2` "¿Estás por lanzar…" usa el rol Bajada (24 px, peso 400), como antes.
- Los títulos de la sección de CTA de servicios y de la agenda (`BookingBlock`) pasan de Inter 40 px a Space Grotesk 48 px.

## A CONFIRMAR

1. **Peso de los subtítulos (`h3`):** quedó en 500. ¿Lo prefieres en 700?
2. **Figma:** ¿se actualizan los estilos de texto de Uxuaria Library para que coincidan?
