# 08 — Blog

**Creado:** 2026-06-03  
**Estado:** Spec aprobado — pendiente de implementación  
**Archivos a crear:** `blog.html`, `blog/[slug].html` (o patrón equivalente)  
**Bloqueado por:** Contenido de artículos (textos, imágenes, slugs)

---

## Objetivo

Publicar artículos de reflexión sobre UX, fintech, IA y producto. El blog funciona como canal de autoridad para SEO y como prueba de conocimiento para clientes potenciales.

---

## Estructura de páginas

| Página | Archivo | Descripción |
|---|---|---|
| Listado | `blog.html` | Grid de artículos con card destacada |
| Artículo | `blog/[slug].html` | Lectura del artículo completo |

---

## Navegación y header

- El **navbar global** (`<header class="navbar">`) se replica idéntico al de `index.html`
- El link "Blog" del navbar apunta a `blog.html` (reemplaza el `href="#"` actual en `index.html`, navbar y footer)
- En la página de artículo, el navbar muestra el link activo "Blog" con algún indicador visual (clase `.nav-link--active` o subrayado retro)
- El `<title>` de cada página sigue el patrón: `[Título del artículo] | Blog | Uxuaria`

---

## Página de listado — `blog.html`

### Layout general

```
[navbar fijo]

[hero minimal del blog]
  eyebrow: BLOG
  título: "Ideas sobre UX, IA y producto"
  subtítulo opcional

[card destacada — artículo más reciente]

[grid de artículos — 3 columnas desktop, 2 tablet, 1 mobile]

[footer]
```

### Card destacada (artículo featured)

Ocupa el ancho completo (grid-column: 1 / -1). Layout de dos columnas: imagen izquierda (60%) + contenido derecho (40%).

```
┌──────────────────────────────────────────────────────────────┐  ← borde 3px + shadow 8px
│  [IMAGEN DESTACADA 60%]  │  DISEÑO · 2026-05-10              │
│                          │                                    │
│                          │  Título del artículo destacado     │
│                          │  largo y con peso visual           │
│                          │                                    │
│                          │  Breve resumen de 2-3 líneas que   │
│                          │  explica de qué trata el artículo  │
│                          │  sin revelar todo el contenido.    │
│                          │                                    │
│                          │  [▸ Leer artículo completo]        │
└──────────────────────────────────────────────────────────────┘
```

**Elementos:**
- Badge `[ ARTÍCULO DESTACADO ]` en Silkscreen, borde 2px, shadow 3px (igual a `.featured-label`)
- Imagen: `aspect-ratio: 16/9`, `object-fit: cover`, `border-right: 3px solid var(--color-text)`
- Título: `clamp(22px, 2.5vw, 32px)`, bold, letter-spacing negativo
- Resumen: 2-3 líneas, `color: var(--color-text-muted)`
- Categoría + fecha: Silkscreen 10px, uppercase, borde 2px (igual a `.project-card--featured__tag`)
- CTA "Leer artículo completo": `<a class="blog-card__read-more">` con flecha `▸`

**Hover:** `translate(4px, 4px)` + sombra reduce a `4px 4px 0 0` (mismo patrón que `.project-card--featured`)

---

### Cards de artículos (grid)

Layout: grid 3 columnas (`repeat(3, 1fr)`, gap: `20px`), igual que servicios.

```
┌──────────────────┐
│  [IMAGEN 4:3]    │  ← border-bottom 3px
├──────────────────┤
│  DISEÑO · 2026   │  ← categoría + fecha, Silkscreen 9px
│                  │
│  Título del      │
│  artículo        │
│                  │
│  Resumen breve   │
│  en 2 líneas...  │
│                  │
│  ▸ Leer más      │
└──────────────────┘
  ↓ 3px border + 6px shadow
```

**Elementos por card:**
- `border: 3px solid var(--color-text)` + `box-shadow: 6px 6px 0 0` (igual a `.project-card`)
- `border-radius: 0`
- Imagen: `aspect-ratio: 4/3`, `object-fit: cover`, `border-bottom: 3px solid`
- Categoría + fecha: `.blog-card__meta` en Silkscreen, mismo estilo que `.project-card--featured__tag`
- Título: `font-size: var(--font-size-lg)`, bold
- Resumen: 2 líneas máximo (`-webkit-line-clamp: 2`), `color: var(--color-text-muted)`
- "▸ Leer más": texto con flecha, sin botón visible (link inline con hover de color)

**Hover:** `translate(3px, 3px)` + sombra `3px 3px 0 0` (idéntico a `.project-card:hover`)

---

### Hero minimal del listado

```html
<section class="blog-hero">
  <div class="container">
    <p class="section-eyebrow">Blog</p>
    <h1 class="blog-hero__title">Ideas sobre UX, IA<br>y producto digital</h1>
    <p class="blog-hero__desc">Reflexiones y aprendizajes de 15 años
    diseñando productos en LATAM.</p>
  </div>
</section>
```

`padding: 124px 0 56px` (mismo que `.copy` del hero — navbar + 56px gap)

---

## Página de artículo — `blog/[slug].html`

### Layout

```
[navbar fijo]

[article-header — columna central]
  categoría · título · fecha + tiempo de lectura

[article-cover — columna central]
  imagen principal 16:9

[article-body — columna central]
  texto del artículo

[related-articles — ancho completo, carrusel horizontal]

[article-cta — ancho completo, fondo oscuro]

[footer]
```

### Proporción de columna

**Regla:** columna central = 50% del viewport, márgenes laterales = 25% cada uno.

```css
.article-column {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 var(--spacing-container);
}
/* tablet */
@media (max-width: 1024px) { .article-column { width: 70%; } }
/* mobile */
@media (max-width: 768px)  { .article-column { width: 100%; } }
```

### Header del artículo (`.article-header`)

```
padding: 120px 0 40px
```

Elementos dentro de `.article-column`:
- `.article-header__meta`: badge de categoría (`.blog-card__meta` — Silkscreen, borde)
- `.article-header__title`: `clamp(28px, 4vw, 48px)`, bold, `letter-spacing: -.03em`
- `.article-header__date`: Silkscreen xs, muted, uppercase — formato "DD de mes, YYYY · N min de lectura"

### Imagen principal (`.article-cover`)

Dentro de `.article-column`:
- `.article-cover__img`: `aspect-ratio: 16/9`, `border: 3px solid`, `box-shadow: 8px 8px 0 0`

### Cuerpo del artículo (`.article-body`)

```
padding: 56px 0 80px   (sin padding horizontal — lo da .article-column)
```

Tipografía:
- Párrafos: `font-size: var(--font-size-lg)`, `line-height: 1.8`
- H2: `clamp(18px, 2.5vw, 26px)`, bold, `border-bottom: 3px solid`
- Blockquote: `border-left: 4px solid`, fondo `var(--color-surface)`, cursiva
- Listas: bullet custom `▸` en Silkscreen, `position: absolute; left: 0`
- Links: subrayado, hover fondo `var(--color-surface)`
- `<code>`: Silkscreen, `border: 2px solid`, `padding: 2px 6px`

### Artículos relacionados (`.related-articles`)

Sección de ancho completo, fondo `var(--color-surface)`, `border-top: 3px solid`.

```
[EYEBROW: Más artículos]
[track horizontal con scroll si desborda]
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │  blog-card   │  │  blog-card   │  │  blog-card   │
  └──────────────┘  └──────────────┘  └──────────────┘
```

- `.related-articles__track`: `display: flex`, `overflow-x: auto`, `scroll-snap-type: x mandatory`
- Scrollbar oculta (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`)
- Cada `.blog-card`: `flex: 0 0 300px`, `scroll-snap-align: start`
- Padding lateral alineado con el container de la página

### CTA de contacto (`.article-cta`)

Sección de ancho completo, fondo `var(--color-bg-dark)`, `border-top: 3px solid`, centrado.

```
[badge dot + texto "Asesorías disponibles"]
[título "¿Querés aplicar todo esto en tu proyecto?"]
[descripción — máx 480px]
[btn btn--white btn--lg → mailto:info@uxuaria.com]
```

---

## Clases CSS nuevas

| Clase | Descripción |
|---|---|
| `.blog-hero` | Hero del listado y del artículo |
| `.blog-hero__title` | Título grande del hero |
| `.blog-hero__desc` | Subtítulo del hero |
| `.blog-grid` | Grid 3 columnas de cards |
| `.blog-card` | Card de artículo regular |
| `.blog-card--featured` | Card destacada (fila completa) |
| `.blog-card__image` | Imagen de la card |
| `.blog-card__meta` | Categoría + fecha (Silkscreen) |
| `.blog-card__title` | Título del artículo en la card |
| `.blog-card__excerpt` | Resumen cortado (line-clamp) |
| `.blog-card__read-more` | Link "▸ Leer más" |
| `.article-column` | Columna central 50vw (25/50/25) |
| `.article-header` | Header: categoría, título, fecha |
| `.article-header__title` | Título del artículo |
| `.article-header__date` | Fecha + tiempo de lectura |
| `.article-cover` | Wrapper imagen principal |
| `.article-cover__img` | Imagen 16:9 con borde retro |
| `.article-body` | Cuerpo del artículo (sin padding horizontal) |
| `.related-articles` | Sección artículos relacionados (full width) |
| `.related-articles__track` | Track horizontal con scroll/carrusel |
| `.article-cta` | CTA de contacto (full width, fondo oscuro) |

---

## Archivos de imagen esperados

```
images/blog/
├── [slug]-cover.jpg     # imagen principal del artículo (1200×630 mínimo)
├── [slug]-cover.webp    # alternativa WebP preferida
└── ...
```

Formato recomendado: WebP, 1200px de ancho, compresión 80%. JPG como fallback.

---

## SEO por página

### `blog.html`
```html
<title>Blog sobre UX, IA y producto digital | Uxuaria</title>
<meta name="description" content="Artículos de Luis Carlos Romero sobre diseño UX, fintech, IA y producto digital para startups en LATAM." />
<link rel="canonical" href="https://uxuaria.com/blog.html" />
```

### `blog/[slug].html`
```html
<title>[Título del artículo] | Blog | Uxuaria</title>
<meta name="description" content="[Primeras 160 chars del artículo]" />
<meta property="og:type" content="article" />
<meta property="og:image" content="images/blog/[slug]-cover.jpg" />
<meta property="article:published_time" content="YYYY-MM-DD" />
```

---

## Decisiones

| # | Pregunta | Respuesta |
|---|---|---|
| D1 | ¿URL del blog? | ✅ `blog.html` — archivo estático en raíz |
| D2 | ¿Cuántos artículos hay para el lanzamiento? | ✅ 2 artículos listos |
| D3 | ¿Integración con plataforma externa? | Ver sección "Estrategia de contenido" abajo |
| D4 | ¿Paginación? | Con 2 artículos: no aplica. Resolver cuando supere 9. |
| D5 | ¿Categorías? | Pendiente. Con 2 artículos no es necesario por ahora. |

---

## Estrategia de contenido — D3 respondida

Con el stack actual (HTML/CSS/JS puro, sin build step, Cloudflare Pages), hay tres caminos posibles:

### Opción A — HTML estático puro ✅ Recomendada para ahora

Cada artículo es un archivo `.html` hecho a mano:

```
website/
├── blog.html              ← listado
├── blog/
│   ├── articulo-1.html    ← artículo completo
│   └── articulo-2.html
```

**Cómo se escribe un artículo:** copiar la plantilla `blog/[slug].html`, pegar el contenido en HTML dentro de `.article-body`, subir la imagen a `images/blog/`.

**Ventajas:** sin dependencias, funciona hoy, mismo flujo que el resto del sitio.  
**Limitación:** con 10+ artículos se vuelve tedioso mantener el header/footer en cada archivo.

---

### Opción B — Astro (migración futura cuando haya 10+ artículos)

[Astro](https://astro.build) es un generador de sitios estáticos que:
- Permite escribir artículos en **Markdown** (`.md`) en lugar de HTML
- Genera automáticamente `blog.html` y cada `blog/[slug].html`
- Mantiene el HTML/CSS/JS existente casi intacto (Astro acepta componentes HTML puros)
- Cloudflare Pages ejecuta el build automáticamente en cada push a `main`

**Cómo se escribe un artículo en Astro:**
```markdown
---
title: "Cómo mejoré la conversión de un fintech en 3 semanas"
date: 2026-05-10
category: Fintech
cover: /images/blog/fintech-conversion.webp
excerpt: "El cliente llegó con una app funcional pero con 0% de onboarding completion..."
---

## El problema

El cliente llegó con una app funcional...
```

Astro toma ese `.md` y genera el HTML completo con el layout de artículo.

**Cuándo migrar:** cuando haya 5+ artículos y el mantenimiento manual sea un problema.  
**Esfuerzo estimado de migración:** 1-2 días.

---

### Opción C — Substack / Ghost (plataforma externa)

Substack o Ghost son plataformas de publicación. El blog viviría en `blog.uxuaria.com` o en `uxuaria.substack.com`. La integración con el sitio principal sería solo un link desde el navbar.

**Ventajas:** editor visual cómodo, gestión de suscriptores, newsletter gratuito.  
**Desventajas:** el blog no está en `uxuaria.com` → SEO dividido, estilo 3.1 imposible de replicar fielmente, dependencia de tercero.

**Recomendación:** no recomendado si el objetivo es SEO en el dominio principal.

---

### Decisión para el lanzamiento

**Usar Opción A (HTML estático)** para los 2 artículos del lanzamiento.  
Si el blog crece, migrar a Opción B (Astro) sin tocar el CSS ni el diseño.

El nav de `index.html` (y footer) deben actualizar `href="#"` → `href="blog.html"` cuando el archivo exista.

---

## Changelog

- **2026-06-03** — Implementación inicial: `blog.html`, `blog/3-cosas-ux.html`, `blog/6-preguntas-ux.html`. CSS base del blog agregado a `styles.css`.
- **2026-06-04** — Rediseño de páginas de artículo: columna 25/50/25, estructura Título→Fecha→Imagen→Texto, sección de artículos relacionados (carrusel horizontal), sección CTA de contacto. Spec actualizado.
