# 03 — Páginas de Servicios

**Estado:** ✅ Implementado  
**Última actualización:** 2026-06-04  
**Archivos:** `servicios/index.html`, `servicios/servicios.css`, `servicios/[slug]/index.html` × 4  
**Depende de:** `styles.css` (tokens, navbar, footer, blog-hero, checkup, cta-section, breadcrumb)

---

## Stack y sistema visual

| Capa | Valor |
|---|---|
| Deploy | Cloudflare Pages (rama `main`) |
| CSS base | `../styles.css` — todos los tokens V3.1 |
| CSS específico | `servicios/servicios.css` — clases propias de la sección |
| Fuentes | Inter (cuerpo) + Silkscreen (labels, tags, números) — igual que el resto del sitio |
| Paleta | Variables CSS de `:root` — `var(--color-text)`, `var(--color-bg-dark)`, etc. |
| Bordes | `3px solid var(--color-text)` (patrón V3.1) |
| Sombras | `6px 6px 0 0 var(--color-text)` con hover `translate(3px,3px)` |
| Colores diagnóstico | `--s-red: #e57373` · `--s-yellow: #f5c842` · `--s-green: #7ec87e` (solo en mock de checkup) |

> **Nota:** Las barras de título `.EXE` fueron **eliminadas** del diseño visual. Los entregables conservan el nombre de archivo (`.DOC`, `.FIG`) en la barra de la tarjeta, pero sin los controles de ventana `_ □ ×`.

---

## Archivos

```
website/
├── servicios/
│   ├── index.html              ← Listado de servicios
│   ├── servicios.css           ← Estilos específicos de la sección
│   ├── investigacion/
│   │   └── index.html
│   ├── mvp/
│   │   └── index.html
│   ├── experiencia/
│   │   └── index.html
│   └── crecimiento/
│       └── index.html
```

---

## Navegación

El link **Servicios** está presente en el navbar de todas las páginas del sitio:

```html
<a href="servicios/index.html" class="nav-link">Servicios</a>
```

En las páginas de servicios, el link activo lleva la clase `.s-nav-active` (subrayado, definida en `servicios.css`).

---

## Página principal — `servicios/index.html`

### Estructura de secciones (en orden)

```
[navbar fijo]
[blog-hero — breadcrumb + h1 + desc]
[4 bloques de servicio horizontales con parallax]
[checkup — misma sección que index.html]
[cta-section — misma sección que index.html]
[footer]
```

### Hero

Usa exactamente la misma clase y estructura que `blog.html`:

```html
<section class="blog-hero">
  <div class="container">
    <nav class="breadcrumb">
      <a href="../index.html" class="breadcrumb__item">Home</a>
      <span class="breadcrumb__sep">›</span>
      <span class="breadcrumb__item breadcrumb__item--current">Servicios</span>
    </nav>
    <h1 class="blog-hero__title">Lo que hago<br>y cómo lo hago.</h1>
    <p class="blog-hero__desc">Consultoría UX para startups que escalan en LATAM —
    investigación de usuarios, diseño de producto, experiencia e interfaces
    y optimización de conversión.</p>
  </div>
</section>
```

CSS: `blog-hero` definido en `styles.css` → `padding: 124px 0 56px`, `border-bottom: 3px solid`.

### Bloques de servicio

Cuatro secciones `<section class="s-service-block">` en layout de 2 columnas (55%/45%) alternando imagen izquierda/derecha:

```
[contenido: número, título, audiencia, descripción, tags, btn-retro]  |  [imagen placeholder con parallax]
[imagen placeholder con parallax]  |  [contenido]   ← .s-service-block--reverse
```

**Parallax:** JS vanilla al final del `<body>`. Lee el progreso de scroll de cada bloque y aplica `translateY(±30px)` a `.s-service-block__image[data-parallax]`. Respeta `prefers-reduced-motion`.

```js
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = document.querySelectorAll('[data-parallax]');
  function tick() {
    var vh = window.innerHeight;
    els.forEach(function (el) {
      var rect = el.closest('.s-service-block').getBoundingClientRect();
      var progress = 1 - (rect.top + rect.height) / (vh + rect.height);
      el.style.transform = 'translateY(' + (progress - 0.5) * 60 + 'px)';
    });
  }
  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();
```

**Imágenes:** placeholders actuales `blog-img-placeholder`. Reemplazar con `<img>` cuando estén disponibles las imágenes reales.

**Link de acción:** usa `.btn-retro` (definido en `styles.css`):
```html
<a href="investigacion/index.html" class="btn-retro">Ver este servicio →</a>
```

#### Los 4 servicios

| # | Slug | Eyebrow | Título |
|---|---|---|---|
| 01 | `investigacion` | INVESTIGACIÓN | Te acercamos a tus usuarios |
| 02 | `mvp` | PRODUCTO | Definimos y validamos tu MVP |
| 03 | `experiencia` | DISEÑO | Potenciamos la experiencia de uso |
| 04 | `crecimiento` | CRECIMIENTO | Escalamos tu crecimiento |

### UX Checkup

Sección idéntica a la de `index.html` — HTML copiado directamente, mismas clases `.checkup`, `.checkup__inner`, `.checkup__visual`, mock de hallazgos. CTA apunta a `../ux-checkup.html`.

### CTA prefooter

Sección idéntica a la de `index.html` — clase `.cta-section`, fondo oscuro, badge "Cupos limitados", botón `btn--white` con `mailto:info@uxuaria.com`.

---

## Páginas individuales — `servicios/[slug]/index.html`

### Estructura de secciones (en orden)

```
[navbar fijo]
[blog-hero — breadcrumb + eyebrow + h1 + desc + tags]
[sp-section-header: DIRIGIDO A]
[sp-problem__body — lista de audiencia]
[sp-section-header: EL PROBLEMA]
[sp-problem__body — quote + párrafo de contexto]
[sp-section-header: QUÉ INCLUYE]
[sp-deliverables__body — grid de tarjetas de entregables]
[sp-section-header: CÓMO FUNCIONA]
[sp-process__body — pasos numerados]
[cta-section — misma sección que index.html]
[footer]
```

### Hero

Misma clase `blog-hero` que el resto del sitio:

```html
<section class="blog-hero">
  <div class="container">
    <nav class="breadcrumb">
      Home › Servicios › [Nombre del servicio]
    </nav>
    <p class="section-eyebrow">01 — INVESTIGACIÓN</p>
    <h1 class="blog-hero__title">Te acercamos<br>a tus usuarios</h1>
    <p class="blog-hero__desc">[descripción del servicio]</p>
    <div class="sp-hero__tags" style="margin-top: 20px">
      <span class="s-tag">User Research</span> ...
    </div>
  </div>
</section>
```

### Secciones de contenido

Todas usan el mismo patrón: `sp-section-header` + cuerpo con `max-width: var(--max-w); margin: 0 auto`.

#### `sp-section-header`
```css
font-family: 'Silkscreen', monospace;
font-size: var(--font-size-xs);
letter-spacing: .15em;
text-transform: uppercase;
padding: 14px var(--spacing-container);
border-top + border-bottom: 3px solid var(--color-text);
```

#### DIRIGIDO A
Usa `.sp-problem__body` como wrapper (mismo padding) + lista `.sp-hero__audience-list` / `.sp-hero__audience-item` (bullet `▸` en Silkscreen).

#### EL PROBLEMA
`.sp-problem__body` con `.sp-problem__quote` (blockquote estilo retro, `border-left: 4px solid`) y `.sp-problem__context`.

#### QUÉ INCLUYE
`.sp-deliverables__body` — grid 3 columnas. Cada tarjeta `.sp-deliverable` tiene:
- `.sp-deliverable__bar` — barra de nombre de archivo (`.DOC`, `.FIG`) en fondo negro
- `.sp-deliverable__body` — nombre + descripción breve

#### CÓMO FUNCIONA
`.sp-process__body` — lista de pasos `.sp-step` con número grande (color `var(--color-border)`), título y descripción.

### CTA prefooter

Idéntica a `index.html` — `section.cta-section`. **No** usa el antiguo `.sp-cta` (eliminado).

---

## Clases CSS — `servicios/servicios.css`

### Página principal

| Clase | Descripción |
|---|---|
| `.s-nav-active` | Link activo del navbar (subrayado) |
| `.s-page-top` | Wrapper breadcrumb en páginas individuales (offset navbar 88px) |
| `.s-service-block` | Bloque horizontal completo por servicio |
| `.s-service-block--reverse` | Variante con imagen a la izquierda |
| `.s-service-block__inner` | Grid 55%/45% del bloque |
| `.s-service-block__content` | Columna de texto del bloque |
| `.s-service-block__number` | Número/categoría (Silkscreen, muted) |
| `.s-service-block__name` | Título del servicio (Inter bold, clamp) |
| `.s-service-block__audience-label` | Label "Dirigido a:" |
| `.s-service-block__audience` | Lista de bullets de audiencia |
| `.s-service-block__desc` | Descripción del servicio |
| `.s-service-block__tags` | Wrapper de tags |
| `.s-service-block__image-wrap` | Contenedor imagen con `overflow: hidden` |
| `.s-service-block__image` | Imagen interna con `position: absolute` para parallax |
| `.s-tag` | Tag de skill/técnica (Silkscreen, borde 2px) |
| `.s-divider` | Header divisor con línea (no activo, disponible) |
| `.s-terminal` / `.s-terminal__*` | Ventana de terminal retro (usada en intro si se necesita) |

### Páginas individuales

| Clase | Descripción |
|---|---|
| `.sp-section-header` | Divisor de sección con label Silkscreen |
| `.sp-hero__tags` | Fila de tags en el hero |
| `.sp-hero__audience-list` | Lista de audiencia con bullets `▸` |
| `.sp-hero__audience-item` | Ítem de audiencia |
| `.sp-problem__body` | Contenedor de sección de contenido (padding, border) |
| `.sp-problem__quote` | Cita del problema (border-left retro) |
| `.sp-problem__context` | Párrafo de contexto |
| `.sp-deliverables__body` | Grid de entregables |
| `.sp-deliverable` | Tarjeta de entregable |
| `.sp-deliverable__bar` | Barra con nombre de archivo (fondo negro) |
| `.sp-deliverable__body` | Cuerpo de la tarjeta |
| `.sp-deliverable__name` | Nombre del entregable |
| `.sp-deliverable__desc` | Descripción breve |
| `.sp-process__body` | Contenedor de pasos |
| `.sp-step` | Fila de un paso |
| `.sp-step__num` | Número grande (color borde) |
| `.sp-step__title` | Título del paso |
| `.sp-step__desc` | Descripción del paso |

### Clases de `styles.css` reutilizadas

| Clase | Origen | Uso en servicios |
|---|---|---|
| `.blog-hero` | `styles.css` | Hero de todas las páginas de servicios |
| `.blog-hero__title` | `styles.css` | Título del hero |
| `.blog-hero__desc` | `styles.css` | Descripción del hero |
| `.section-eyebrow` | `styles.css` | Número/categoría en hero de páginas individuales |
| `.breadcrumb` / `.breadcrumb__item` | `styles.css` | Navegación de migas en todas las páginas |
| `.btn-retro` | `styles.css` | Link de acción "Ver este servicio →" en bloques |
| `.checkup` / `.checkup__*` | `styles.css` | Sección UX Checkup en `servicios/index.html` |
| `.cta-section` / `.cta-section__*` | `styles.css` | CTA prefooter en todas las páginas |
| `.navbar` / `.footer` | `styles.css` | Compartidos con todo el sitio |

---

## Pendientes

- [ ] Imágenes reales para los 4 bloques de servicio (reemplazar `.blog-img-placeholder`)
- [ ] Agregar link "Servicios" al navbar de `index.html` en los artículos del portafolio cuando exista
- [ ] Decidir si el link de cada servicio en la homepage apunta a `servicios/[slug]/` (sí, actualmente así)
- [ ] Imágenes `og:image` por página de servicio

---

## Secciones eliminadas vs. planificadas

| Sección | Estado | Razón |
|---|---|---|
| Barras `.EXE` en cards de servicio | ❌ Eliminada | Conflicto visual con el resto del sitio |
| Grid 2×2 de tarjetas de servicio | ❌ Reemplazada | Sustituida por bloques horizontales con imagen |
| Sección "Cómo trabajo — Proceso" (4 pasos) | ❌ Eliminada | Redundante con secciones individuales de proceso |
| CTA `.s-cta` con botones propios | ❌ Reemplazada | Sustituida por `.cta-section` idéntica a `index.html` |
| Intro + terminal (sección 2) | ❌ Eliminada | No se llegó a implementar en versión final |
| `.sp-cta` / `.sp-cta__back` en páginas individuales | ❌ Eliminada | Reemplazada por `.cta-section` |

---

## Changelog

- **2026-06-04** — Spec original creado (basado en sistema Space Mono / GitHub Pages — desactualizado)
- **2026-06-04** — Primera implementación: grid 2×2 + `servicios.css` propio
- **2026-06-04** — Migración a tokens V3.1: Inter + Silkscreen, `var(--color-text)`, bordes 3px
- **2026-06-04** — Rediseño: bloques horizontales con parallax, hero normalizado a `blog-hero`
- **2026-06-04** — UX Checkup y CTA prefooter reemplazados por componentes idénticos a `index.html`
- **2026-06-04** — Páginas individuales normalizadas: `blog-hero` + secciones `sp-*` + `cta-section`
- **2026-06-04** — Spec reescrito para reflejar el estado actual implementado
