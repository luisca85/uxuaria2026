# 06 — Blog

**Estado:** ✅ Implementado (4 artículos activos)  
**Archivos:** `blog.html`, `blog/diferencias-creacion-ia-vs-diseno.html`, `blog/prompt-ear-no-es-disenar.html`, `blog/3-cosas-ux.html`, `blog/6-preguntas-ux.html`  
**Última actualización:** 2026-07-14

---

## Propósito

Canal de autoridad para SEO y prueba de conocimiento para clientes potenciales. Artículos de reflexión sobre UX, fintech, IA y producto digital.

---

## Estructura de páginas

| Página | Archivo | Descripción |
|---|---|---|
| Listado | `blog.html` | Grid de artículos con card destacada |
| Artículo | `blog/[slug].html` | Lectura del artículo completo |

---

## Página de listado — `blog.html`

### SEO
```html
<title>Blog sobre UX, IA y producto digital | Uxuaria</title>
<meta name="description" content="Artículos de Luis Carlos Romero sobre diseño UX, fintech, IA y producto digital para startups en LATAM." />
<link rel="canonical" href="https://uxuaria.com/blog.html" />
```

### Layout
```
[navbar fijo]
[blog-hero]
  eyebrow: Blog
  h1: "Ideas sobre UX, IA y producto digital"
  desc: "Reflexiones y aprendizajes de 15 años diseñando productos en LATAM."
[card destacada — artículo más reciente, fila completa]
[grid de artículos — 3 columnas desktop, 2 tablet, 1 mobile]
[footer]
```

### Hero
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
`padding: 124px 0 56px`

### Card destacada (`.blog-card--featured`)

Fila completa (`grid-column: 1 / -1`). Layout: imagen izquierda 60% + contenido derecho 40%.

```
┌──────────────────────────────────────────────────────────────┐  ← borde 3px + shadow 8px
│  [IMAGEN 60%]  │  DISEÑO · fecha                            │
│                │                                             │
│                │  Título del artículo                        │
│                │                                             │
│                │  Resumen 2-3 líneas                         │
│                │                                             │
│                │  [▸ Leer artículo completo]                 │
└──────────────────────────────────────────────────────────────┘
```

- Badge `[ ARTÍCULO DESTACADO ]` en Silkscreen, borde 2px, shadow 3px
- Imagen: `aspect-ratio: 16/9`, `object-fit: cover`, `border-right: 3px solid`
- Hover: `translate(4px, 4px)` + sombra reduce a `4px 4px 0 0`

### Cards regulares (`.blog-card`)

Grid 3 columnas (`repeat(3, 1fr)`, gap: `20px`).

```
┌──────────────────┐
│  [IMAGEN 4:3]    │  ← border-bottom 3px
├──────────────────┤
│  CATEGORÍA · AÑO │  Silkscreen 9px
│  Título          │
│  Resumen...      │  -webkit-line-clamp: 2
│  ▸ Leer más      │
└──────────────────┘
  borde 3px + shadow 6px
```

Hover: `translate(3px, 3px)` + sombra `3px 3px 0 0`

---

## Página de artículo — `blog/[slug].html`

### SEO
```html
<title>[Título del artículo] | Blog | Uxuaria</title>
<meta name="description" content="[Primeras 160 chars del artículo]" />
<meta property="og:type" content="article" />
<meta property="og:image" content="images/blog/[slug]-cover.jpg" />
<meta property="article:published_time" content="YYYY-MM-DD" />
```

### Layout

```
[navbar fijo]
[article-header — columna central]   categoría · título · fecha + tiempo de lectura
[article-cover — columna central]    imagen principal 16:9
[article-body — columna central]     texto del artículo
[related-articles — ancho completo]  carrusel horizontal
[article-cta — ancho completo]       fondo oscuro, CTA de contacto
[footer]
```

### Proporción de columna (25/50/25)

```css
.article-column {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 var(--spacing-container);
}
@media (max-width: 1024px) { .article-column { width: 70%; } }
@media (max-width: 768px)  { .article-column { width: 100%; } }
```

### Tipografía del cuerpo

- Párrafos: `font-size: var(--font-size-lg)`, `line-height: 1.8`
- H2: `clamp(18px, 2.5vw, 26px)`, bold, `border-bottom: 3px solid`
- Blockquote: `border-left: 4px solid`, fondo `var(--color-surface)`, cursiva
- Listas: bullet custom `▸` en Silkscreen
- `<code>`: Silkscreen, `border: 2px solid`, `padding: 2px 6px`

### CTA de contacto al final del artículo (`.article-cta`)

```
[fondo]  var(--color-bg-dark)
[badge]  badge dot + "Asesorías disponibles"
[título] ¿Querés aplicar todo esto en tu proyecto?
[desc]   (descripción breve)
[btn]    btn--white → mailto:info@uxuaria.com
```

---

## Artículos publicados

| Slug | Archivo | Título aproximado |
|---|---|---|
| `diferencias-creacion-ia-vs-diseno` | `blog/diferencias-creacion-ia-vs-diseno.html` | Diferencias entre diseñar con o sin IA y su impacto en el gesto creativo |
| `prompt-ear-no-es-disenar` | `blog/prompt-ear-no-es-disenar.html` | ¿Por qué las apps hechas con IA se parecen tanto? |
| `3-cosas-ux` | `blog/3-cosas-ux.html` | 3 cosas que aprendí de UX |
| `6-preguntas-ux` | `blog/6-preguntas-ux.html` | 6 preguntas de UX |

> Portada de `prompt-ear-no-es-disenar`: `images/blog/articulo003.png` (1267×832). Usada en `blog.html` (card regular), `blog/prompt-ear-no-es-disenar.html` (`.article-cover__img`) y en los cards relacionados de los otros artículos.
> Portada de `diferencias-creacion-ia-vs-diseno`: `images/blog/articulo004.png` (1408×768). Usada en `blog.html` (card destacada) y en `blog/diferencias-creacion-ia-vs-diseno.html` (`.article-cover__img`).

---

## Clases CSS

| Clase | Descripción |
|---|---|
| `.blog-hero` | Hero del listado y artículo |
| `.blog-hero__title` | Título grande del hero |
| `.blog-hero__desc` | Subtítulo del hero |
| `.blog-grid` | Grid 3 columnas de cards |
| `.blog-card` | Card de artículo regular |
| `.blog-card--featured` | Card destacada (fila completa) |
| `.blog-card__image` | Imagen de la card |
| `.blog-card__meta` | Categoría + fecha (Silkscreen) |
| `.blog-card__title` | Título en la card |
| `.blog-card__excerpt` | Resumen cortado (line-clamp) |
| `.blog-card__read-more` | Link "▸ Leer más" |
| `.article-column` | Columna central 50vw (25/50/25) |
| `.article-header` | Header: categoría, título, fecha |
| `.article-cover` | Wrapper imagen principal |
| `.article-cover__img` | Imagen 16:9 con borde retro |
| `.article-body` | Cuerpo del artículo |
| `.related-articles` | Sección artículos relacionados (full width) |
| `.related-articles__track` | Track horizontal con scroll |
| `.article-cta` | CTA de contacto (full width, fondo oscuro) |

---

## Imágenes

```
images/blog/
├── [slug]-cover.jpg    # imagen principal (1200×630 mínimo)
└── [slug]-cover.webp   # alternativa WebP preferida
```

---

## Estrategia de contenido

**Actual (Opción A):** HTML estático puro. Cada artículo es un `.html` manual. Funciona hoy, sin dependencias.

**Migración futura (Opción B — Astro):** cuando haya 10+ artículos. Permite escribir en Markdown, genera el HTML automáticamente, mantiene el CSS intacto. Esfuerzo: 1-2 días.

---

## Changelog

- **2026-06-03** — `blog.html`, `blog/3-cosas-ux.html`, `blog/6-preguntas-ux.html`. CSS base agregado a `styles.css`.
- **2026-06-04** — Rediseño de artículos: columna 25/50/25, artículos relacionados (carrusel), CTA de contacto.
- **2026-07-06** — Nuevo artículo `prompt-ear-no-es-disenar`. Portada con `.blog-img-placeholder` pendiente de imagen real.
- **2026-07-14** — Nuevo artículo `diferencias-creacion-ia-vs-diseno`. Portada `articulo004.png` (1408×768) agregada.
