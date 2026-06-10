# 00 — Estado actual del proyecto

**Auditoría realizada:** 2026-05-27  
**Última actualización:** 2026-06-09  
**Archivos auditados:** `index.html` (~750 líneas), `styles.css` (~1700 líneas), `script.js` (~270 líneas)  
**Estado general:** Contenido real implementado. Sección de portafolio rediseñada (dark panel, carrusel 7 proyectos). Pendiente: páginas individuales de proyecto, favicon, og:image, Google Analytics, i18n.

---

## Lo que existe hoy

El proyecto es un sitio de una sola página (`index.html`) con todo el CSS en un archivo y todo el JS en otro. No hay dependencias externas salvo Google Fonts. El deploy target es Cloudflare Pages.

### Secciones y su estado (orden en producción)

| # | Sección | ID en HTML | Estado | Descripción |
|---|---|---|---|---|
| 1 | Navbar | `#navbar` | ✅ Completa | Fija, blur, responsive. Mobile menu funcional. Blog link apunta a `blog.html`. |
| 2 | Hero | — | ✅ Completa | Diseño retro UI dos columnas. Copy SEO + artboard con 6 ventanas flotantes. Fuentes: Silkscreen + Press Start 2P. |
| 3 | Clients Bar | — | ✅ Completa | Barra oscura con 5 logos: mongepay, strianno, greenify, poy, personal. Marquee infinito 32s. |
| 4 | Portafolio | `#portafolio` | ✅ Completa (homepage) | Proyecto destacado (Monge Pay): panel oscuro con taglines, +300%, flecha ↗. Carrusel horizontal de 7 proyectos con imagen de fondo, overlay 0.72, dato ganador, flecha ↗. Sin página general de portafolio — navegación directa a páginas individuales. |
| 5 | UX Checkup | `#ux-checkup` | ✅ Completa | Sección lead-gen. Mock visual de reporte. CTA mailto. |
| 6 | Servicios | `#servicios` | ✅ Completa | 4 tarjetas con iconos SVG y listas. |
| 7 | Testimonios | `#testimonios` | ✅ Completa | 3 testimonios reales: Flavio Strianese, Ireland Bender, Walter Aguilar. Fotos activas en `images/testimonials/`. Ireland sin foto (fallback gradiente). |
| 8 | Sobre mí | `#sobre-mi` | ⚠️ Incompleta | Texto presente. Columna derecha: SVG placeholder (decisión de diseño pendiente: decorativo / screenshot / eliminar). |
| 9 | CTA final | `#contacto` | ✅ Completa | `mailto:info@uxuaria.com`. Sin formulario ni Calendly (decisión tomada: email directo). |
| 10 | Footer | — | ✅ Completa | LinkedIn real. ©2020–2026. Instagram pendiente. Blog link apunta a `blog.html`. |
| 11 | Blog — listado | `blog.html` | ✅ Completa | Card destacada + grid de artículos. 2 artículos publicados. Implementado 2026-06-03. |
| 12 | Blog — artículos | `blog/[slug].html` | ✅ Completa | Layout col. central 25/50/25. Artículos relacionados (carrusel). CTA de contacto. 2 artículos: `6-preguntas-ux.html`, `3-cosas-ux.html`. |

**Leyenda:** ✅ Completa · ⚠️ Incompleta (estructura presente, contenido faltante) · 🔴 Placeholder (requiere contenido real antes de publicar)

---

## Inconsistencias y deuda — estado actualizado al 2026-05-29

> Las issues resueltas se marcan con ~~tachado~~. Las abiertas siguen activas.

~~**1. Voz de marca — Freelancer vs. Agencia**~~ → ✅ Resuelto 2026-05-27. Primera persona singular aplicada en todo el sitio.

~~**2. El Blog es un link fantasma**~~ → ✅ Resuelto 2026-06-03. `blog.html` implementado con 2 artículos. Navbar y footer actualizados a `href="blog.html"`.

~~**3. Links de redes sociales sin destino real**~~ → ⚠️ Parcial. LinkedIn real implementado (`https://www.linkedin.com/company/uxuaria/`). Instagram: sin handle confirmado, ícono no agregado aún.

~~**4. Año desactualizado en el footer**~~ → ✅ Resuelto 2026-05-27. Ahora muestra `© 2020 – 2026`.

~~**5. Sin favicon, sin Open Graph**~~ → ⚠️ Parcial. OG tags + canonical implementados 2026-05-27. Pendiente: `<link rel="icon">` y `og:image` (1200×630 px).

~~**6. Variables CSS sin usar**~~ → ✅ Resuelto 2026-05-27. Variables huérfanas eliminadas o reasignadas.

~~**7. Colores hardcodeados fuera de variables**~~ → ✅ Resuelto 2026-05-27. Todos los valores movidos a `:root`.

~~**8. `.project-card--featured` sin efecto visual**~~ → ✅ Resuelto 2026-05-29. Clase reutilizada como componente de tarjeta destacada de fila completa con carrusel.

~~**9. Smooth scroll captura `href="#"`**~~ → ✅ Resuelto 2026-05-27. Guard `if (!hash || hash === '#') return` en script.js.

~~**10. Sin `prefers-reduced-motion`**~~ → ✅ Resuelto 2026-05-27. Media query implementada para pulse, fade-in y marquee.

~~**11. CTA principal — destino ambiguo**~~ → ✅ Resuelto. Decisión tomada: email directo `mailto:info@uxuaria.com` en todos los CTAs.

**12. Sin mecanismo de i18n real** → 🔴 Abierto. Toggle "EN" existe sin lógica. Requiere spec `07-i18n.md`.

---

## Preguntas abiertas — requieren respuesta del cliente

Estas preguntas están bloqueando partes del proyecto. Ninguna puede resolverse con suposiciones.

| # | Pregunta | Sección afectada | Urgencia | Respuesta |
|---|---|---|---|
| Q1 | **¿Freelancer o estudio?** ¿La marca Uxuaria habla como "yo" (Luis Carlos) o como "nosotros" (estudio)? | Todo el copy | 🔴 Alta | Freelancer individual. Voz en primera persona: "yo", "mi", "trabajo con". |
| Q2 | **¿URLs reales de Instagram y LinkedIn?** ¿Cuáles son los handles/slugs exactos? | Footer, posiblemente About | 🔴 Alta | solo linkedin https://www.linkedin.com/company/uxuaria/ |
| Q3 | **¿Cómo quiere recibir leads?** ¿Formulario embebido, link de Calendly, o email directo `mailto:`? | Sección CTA, navbar CTA | 🔴 Alta | Email directo: info@uxuaria.com |
| Q4 | **¿Existen imágenes de los proyectos?** ¿Screenshots o mockups de los 8 proyectos del portafolio? ¿En qué formato y dónde? | Portafolio | 🔴 Alta | Si existen imagenes
| Q5 | **¿Los testimonios son reales?** ¿Hay nombres, fotos y citas reales de clientes que puedan usarse? | Testimonios | 🔴 Alta | Si existen testimonios 
| Q6 | **¿Existe el blog?** ¿Hay artículos publicados, una plataforma (Substack, Ghost, etc.) o el link debe eliminarse del nav? | Navbar, footer | 🟡 Media | si existen articulos
| Q7 | **¿Cuál es el color de acento de la marca?** La variable `--color-highlight: #C8F135` (verde-lima) está reservada. ¿Es el color oficial? ¿Se aplica? | Todo el diseño | 🟡 Media | el color principal es fondo blanco, con letras negras, no tengo definidos acentos
| Q8 | **¿Se necesita versión en inglés real?** ¿Es un requisito funcional o solo visual? Si es funcional, ¿cuál es la estrategia? | Toggle EN, meta lang | 🟡 Media | si quiero producir la verison en ingles
| Q9 | **¿Hay foto de Luis Carlos para la sección About?** ¿Qué formato, dimensiones mínimas? | Sección About | 🟡 Media | no incluir foto
| Q10 | **¿Se muestra pricing?** ¿Hay paquetes o precios publicables, o se omite intencionalmente para generar consultas? | Posible nueva sección | 🟡 Media | No. Se omite para generar consultas. |
| Q11 | **¿Qué herramienta de analítica?** ¿Google Analytics, Plausible, Fathom, ninguna? | `<head>`, privacidad | 🟢 Baja | Google analitycs
| Q12 | **¿Cuál es el año de inicio de Uxuaria?** El footer dice `© 2025` pero estamos en 2026. ¿`© 2024–2026`? ¿dinámico? | Footer | 🟢 Baja | 2020 - 2026

---

## Deuda técnica pre-launch (no es contenido, es código)

Estos son issues técnicos que deben resolverse antes de publicar, independientemente del contenido:

- [ ] Agregar `<link rel="icon">` (favicon) — **pendiente**
- [ ] `og:image` — imagen 1200×630 px para previsualizaciones sociales — **pendiente**
- [ ] Google Analytics — agregar script en `<head>` — **pendiente**
- [ ] Crear páginas individuales de proyecto `portafolio/[slug].html` — spec en `docs/specs/06-portfolio-page.md` — **pendiente** (prioridad: monge-pay)
- [ ] Instagram handle — agregar ícono en footer cuando se confirme — **pendiente**
- [ ] Decisión de diseño columna derecha "Sobre mí" — decorativo / screenshot / eliminar — **pendiente**
- [x] Blog implementado — `blog.html` + `blog/3-cosas-ux.html` + `blog/6-preguntas-ux.html` — 2026-06-03
- [x] URL real del blog — `href="blog.html"` en navbar y footer — 2026-06-04
- [x] Fotos de testimonios — `flavio-strianese.jpg` y `walter-aguilar.jpg` en `images/testimonials/` — confirmadas activas
- [x] Agregar meta tags Open Graph (`og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`) — implementado 2026-05-27
- [x] Agregar `<link rel="canonical">` — implementado 2026-05-27
- [x] Mover colores hardcodeados a variables en `:root` — implementado 2026-05-27
- [x] Eliminar o aplicar las variables CSS huérfanas — implementado 2026-05-27
- [x] Agregar `@media (prefers-reduced-motion: reduce)` para pulse, fade-in y marquee — implementado 2026-05-27/29
- [x] Resolver clase `.project-card--featured` — reutilizada como componente destacado 2026-05-29
- [x] Corregir el año del footer — `© 2020 – 2026` implementado 2026-05-27
- [x] Excluir `href="#"` del smooth scroll handler — implementado 2026-05-27
- [x] Eliminar CSS muerto de `.proof-bar` y derivados — eliminado 2026-05-29

---

## Próximos specs a escribir

| Archivo | Estado | Contenido |
|---|---|---|
| `08-blog.md` | ✅ Implementado 2026-06-04 | Listado + artículos. Layout 25/50/25, relacionados, CTA. 2 artículos activos. |
| `06-portfolio-page.md` | ✅ Homepage implementada · páginas individuales pendientes | Sin página general. Navegación directa homepage → `portafolio/[slug].html`. 8 proyectos mapeados. |
| `03-services-page.md` | ✅ Creado 2026-06-04 | Página `servicios.html` — bloques por servicio, proceso de trabajo, CTA |
| `04-contact-page.md` | ✅ Creado 2026-06-04 | Página `contacto.html` — Calendly (popup) + formulario con medio de respuesta preferido |
| `05-ux-checkup.md` | ✅ Creado 2026-06-04 | Página `ux-checkup.html` — 4 preguntas de elegibilidad, formulario condicional, respuesta en 48h |
| `09-404.md` | ❌ No creado | Página de error 404 — diseño inspirado en Space Invaders, estética retro 3.1 |
| `10-blog-automatizacion.md` | ❌ No creado | Sistema para automatizar la generación futura de artículos del blog |
| `07-i18n.md` | ❌ No creado | Estrategia para la versión en inglés |
| `docs/specs/portfolio/[nombre].md` × 8 | ❌ No creados | Briefs individuales por proyecto. Prioridad: `monge-pay.md` primero. |

---

## Futuros ajustes confirmados

### Página 404 — `404.html`
Página de error con diseño inspirado en **Space Invaders** y estética retro 3.1 del sitio.
- Alienígenas de Space Invaders generados con SVG o canvas JS
- Mensaje de error en tono de marca (Silkscreen, bordes 3px)
- CTA para volver al inicio
- Spec a crear: `docs/specs/09-404.md`
- En Cloudflare Pages: configurar `404.html` en el root del sitio (se activa automáticamente)

### Automatización del blog
Hoy cada artículo es un archivo `.html` hecho a mano. A futuro se quiere automatizar la generación de artículos.
- Opciones documentadas en `08-blog.md` sección "Estrategia de contenido": Opción B (Astro con Markdown) es la recomendada
- Trigger sugerido: cuando haya 5+ artículos o el proceso manual sea un problema
- Alternativa liviana sin migración: script generador en Node.js que toma un `.md` y produce el `.html` con el template actual
- Spec a crear: `docs/specs/10-blog-automatizacion.md`

---

## Changelog

> Registra cada cambio aplicado al código después de la auditoría inicial.  
> Formato: `[fecha] — archivo — qué cambió — por qué`

### 2026-05-27

**`styles.css` — Design tokens (Ciclo 2)**
- Variables CSS reorganizadas y ampliadas según `02-design-tokens.md`
- Colores hardcodeados movidos a `:root` (`--color-status-active`, `--color-bg-dark`, `--color-nav-bg`, etc.)
- Variables huérfanas eliminadas o reasignadas

**`styles.css` — Hero layout y tipografía (fix visual)**
- `.hero__inner max-width`: `680px` → `800px` — bloque de texto demasiado estrecho en desktop
- `.hero__subtitle font-size`: `var(--font-size-xl)` (18px) → `var(--font-size-lg)` (16px) — reducir competencia visual con el título
- `.hero__subtitle max-width`: `520px` → `600px` — proporcional al nuevo ancho del contenedor

**`index.html` + `styles.css` — Copy SEO (Ciclo 1)**
- Voz unificada a primera persona singular en todas las secciones
- Keywords de intención comercial aplicadas según `01-content.md`
- H1 oculto para SEO agregado al hero (`class="visually-hidden"`)
- Títulos de sección convertidos de `<h1>` a `<h2>` donde correspondía

### 2026-05-29

**`styles.css` — Alineación de ancho del hero (fix visual)**
- `.hero__inner max-width`: `800px` → `var(--max-w)` (1160px) — el hero estaba más angosto que el resto de las secciones; ahora todos los bloques comparten el mismo ancho máximo de contenedor

**`styles.css` — Corrección de texto outlined en título hero (fix visual)**
- `.hero__title-accent`: eliminado `color: transparent` + `-webkit-text-stroke: 2px var(--color-text)` — el stroke de Inter en tamaño clamp(40px–72px) producía líneas superpuestas visibles; reemplazado por `color: var(--color-text); font-style: italic` manteniendo diferenciación visual sin artefactos tipográficos

**`index.html` + `styles.css` — Portafolio: imágenes reales implementadas**
- 7 de 9 cards ahora usan `<img>` con `object-fit: cover` en lugar de gradientes CSS
- Farmatouch y Welink mantienen gradiente hasta que se provean imágenes
- Event Virtual Services (Ebizont) agregado como 9° proyecto
- `pos-presentation.png` y `tsg-presentation.png` redimensionados a 1200px de ancho

**`index.html` + `styles.css` + `script.js` — Proyecto destacado: carrusel + etiquetas**
- Layout del card destacado convertido a carrusel: una imagen principal a la vez con navegación por flechas y contador `1 / N`
- Botones prev/next con fade al hover (siempre visibles en touch)
- Swipe support en mobile
- Etiqueta "Proyecto destacado" con raya decorativa
- Badge "Trabajando ahora" con punto verde pulsante (reutiliza animación del hero)
- "Otros proyectos seleccionados" con link a `portafolio.html` (pendiente)
- Grid reducido a 1 fila de 3 cards en homepage

**`index.html` + `styles.css` — Testimonios reales implementados**
- Reemplazados los 3 placeholders con testimonios confirmados: Flavio Strianese (CEO Striano), Ireland Bender (Weezie Towels), Walter Aguilar Barahona (Director DeOper)
- Stars eliminadas (no figuran en los testimonios originales)
- `.author-avatar` actualizado para soportar foto real con gradiente de fallback
- Fotos de Flavio y Walter: paths definidos, archivos pendientes (`images/testimonials/`)

**`index.html` — Reordenamiento de secciones + eliminación proof bar**
- Proof bar (15+ años / 50+ proyectos / 4 países) eliminada
- Nuevo orden: Hero → Clients Bar → Portfolio → UX Checkup → Servicios → Testimonios → Sobre mí → CTA → Footer
- Testimonials: rutas de imagen corregidas `.jpg` → `.png` (flavio-strianese.png, walter-aguilar.png)

**`index.html` + `styles.css` + `images/logos/` — Clients bar (barra de logos)**
- Nueva sección `.clients-bar` entre hero y portafolio (después del reordenamiento)
- Fondo oscuro (`var(--color-bg-dark)` = #0A0A0A), padding 53px/49px, marquee infinito 32s
- 5 logos activos: mongepay.png · strianno.webp · greenify.webp · poy.svg · Personal_logo_2021.png
- Sofrecom: background blanco eliminado con PIL flood-fill (→ transparente), luego excluido del marquee por decisión de cliente
- Logos muestran colores originales (sin blanket filter). Opacidad 0.75 → 1 en hover
- poy.svg: fills cambiados de `#0a0b09` a `#FFFFFF` para visibilidad sobre fondo oscuro
- greenify.webp: clase `--invert` aplica `filter: invert(1)` solo a este logo (texto negro → blanco)
- Set duplicado para bucle sin cortes; animación `@keyframes marquee` con `prefers-reduced-motion: none`
- Barra aumentada 50px extra vs diseño inicial; POY reducido a `height: 20px` con clase `--sm`

**`styles.css` — Limpieza de CSS muerto**
- Eliminados todos los selectores de `.proof-bar`, `.proof-bar__inner`, `.proof-item`, `.proof-number`, `.proof-label`, `.proof-divider` (bloque principal + overrides en 768px y 480px) — código muerto tras eliminación de la sección proof bar

**`index.html` + `styles.css` + `script.js` — Hero retro UI (Ciclo 1)**
- Hero reemplazado por diseño retro de dos columnas (44% copy / 56% art) generado en Claude Design
- Fuentes: Silkscreen y Press Start 2P agregadas a Google Fonts
- Columna izquierda: eyebrow badge con cursor parpadeante, tagline, lead, CTAs retro, specs en tags
- Columna derecha: artboard 960×1020px con 6 ventanas flotantes absolutas (w-claude, w-error, w-brand, w-psd, w-bsod, w-gen)
- Ventanas con animación `win-pop` de entrada escalonada; respeta `prefers-reduced-motion`
- Pixel art: cara Claude generada con canvas JS, QR, iconos PSD y progress bar via script
- `fitArt()` escala el artboard responsivamente con `ResizeObserver` + múltiples fallback timers
- CTAs: `btn-primary` → `mailto:info@uxuaria.com` · `btn-ghost` → `#portafolio`
- Clases de integración: `.wbody` (evita conflicto con DOM body), `hero-lead`, `hero-cta`, `hero-specs`

**`index.html` + `styles.css` — Ajustes al hero (post-revisión cliente)**
- `.tagline` `font-size` max: `72px` → `56px` — reducción del tamaño máximo del título
- `<span class="u">` eliminado del tagline — se quitó el subrayado decorativo de "crecen en LATAM"
- `--transition-base` renombrado a `--transition` en `:root` — simplificación del token de transición
- Referencia rota `var(--transition-base)` en `.clients-bar__logo` corregida a `var(--transition)` (fix aplicado por Claude)

### 2026-06-08

**`index.html` + `styles.css` + `script.js` — Sección portafolio homepage: Ciclo 1**
- Spec `06-portfolio-page.md` creado con arquitectura completa (homepage + páginas individuales)
- Proyecto destacado: stat headline "DISEÑAMOS LA PLATAFORMA..." + número "+300%" agregados al panel de contenido
- Grid estático de 3 cards reemplazado por `.portfolio-carousel` horizontal (scroll-snap)
- 5 proyectos iniciales en el carrusel: Fans.ai, Striano, Weezy Towels, Dineflows, TSG System
- Overlay de slides: `rgba(0,0,0,0.58)` — dato ganador como protagonista de cada card
- Flechas prev/next integradas en cabecera de subsección (`.pcarousel-btn`)
- JS del carrusel: `track.scroll()` con `behavior: 'smooth'`, cálculo de `columnGap`
- Tag de slides: fondo blanco sólido, texto oscuro (antes era semitransparente)
- Link "Ver portafolio completo" eliminado — navegación directa a páginas individuales

### 2026-06-09

**`index.html` + `styles.css` — Sección portafolio homepage: Ciclo 2 (refinamiento)**
- Panel de contenido del destacado: 7 elementos simplificados a 4 (badge · tagline-1 · divider · tagline-2 · footer)
- Fondo del panel cambiado a `var(--color-bg-dark)` (#0A0A0A) — alto contraste
- Todos los textos del panel en blanco / blanco con opacidad
- Badge: animación cambiada de `pulse` (scale) a `blink-dot` (on/off digital 1.2s) — solo dentro de `.project-card--featured`
- Flecha CTA ↗ agregada al panel del destacado (48×48px, borde blanco)
- Cliente "Monge Pay" con label "CLIENTE" en Silkscreen 9px
- Overlay del carrusel aumentado: `0.58` → `0.72` (~20% más oscuro)
- Flecha ↗ agregada a cada slide del carrusel (top: 16px, right: 16px, visible en hover)
- 2 proyectos agregados al carrusel: Event Virtual Services + Retail POS System (total: 7)
- Responsive: border-top del panel en tablet corregido a `rgba(255,255,255,0.14)`

**`docs/specs/06-portfolio-page.md` — Rewrite completo**
- Eliminada Parte 2 (página general de portafolio) — decisión de arquitectura: no existe
- Arquitectura actualizada: navegación directa homepage → `portafolio/[slug].html`
- Inventario actualizado a 8 proyectos con slugs y prioridades
- Composición del panel oscuro documentada con ASCII diagram
- Clases BEM actualizadas con todas las nuevas clases implementadas
