# 06 — Portafolio: sección homepage + páginas de proyecto

**Estado:** Homepage ✅ implementado · Páginas individuales pendientes  
**Archivos afectados:** `index.html`, `styles.css`, `script.js`, `portafolio/[slug].html` (pendiente)  
**Creado:** 2026-05-29  
**Actualizado:** 2026-06-09  
**Depende de:** `00-overview.md`, `01-content.md`, imágenes en `images/portfolio/`

---

## Decisión de arquitectura — navegación directa

**No existe una página general de portafolio.** Los usuarios van directamente desde la sección `#portafolio` de la homepage a la página individual de cada proyecto.

```
homepage #portafolio
  ├── Proyecto destacado (Monge Pay) ──→ portafolio/monge-pay.html
  ├── Fans.ai                        ──→ portafolio/fans-ai.html
  ├── Striano Landing Page           ──→ portafolio/striano.html
  ├── Weezy Towels                   ──→ portafolio/weezy-towels.html
  ├── Dineflows                      ──→ portafolio/dineflows.html
  ├── TSG System                     ──→ portafolio/tsg-system.html
  ├── Event Virtual Services         ──→ portafolio/ebizont.html
  └── Retail POS System              ──→ portafolio/retail-pos.html
```

Cada flecha ↗ visible en la homepage es el único punto de entrada a las páginas de proyecto.

---

## Parte 1 — Sección portafolio en la homepage

### 1.1 Proyecto destacado ✅ implementado

**Layout:** dos columnas — media izquierda (carrusel de imágenes) / contenido derecho (panel oscuro).

#### Panel de contenido — composición

```
┌─────────────────────────────────────────┐
│  ● Trabajando ahora                     │  badge, align-self: start, blink on/off
│                                         │
│  DISEÑAMOS LA PLATAFORMA                │  tagline-1: flex:1, uppercase bold
│  MÁS GRANDE DE PAGOS                    │  clamp(17px → 23px), texto blanco
│  DE COSTA RICA                          │
│                                         │
│ ─────────────────────────────────────── │  divider rgba(255,255,255,0.14)
│                                         │
│  +300%                                  │  tagline-2-num: clamp(54px → 76px)
│  de crecimiento · 2025                  │  tagline-2-ctx: 13px, blanco 55%
│                                         │
│  Cliente              [↗]              │  footer-row: cliente izq, flecha der
│  Monge Pay                              │
└─────────────────────────────────────────┘
```

**Fondo del panel:** `var(--color-bg-dark)` = `#0A0A0A`

**Badge "Trabajando ahora":**
- `display: inline-flex; align-self: flex-start`
- Fondo `rgba(255,255,255,0.08)`, borde `rgba(255,255,255,0.28)`, texto blanco
- Animación del punto verde: `@keyframes blink-dot` — on/off digital, `1.2s infinite`
- Sobreescribe `@keyframes pulse` solo dentro de `.project-card--featured`

**Flecha CTA:**
- `<a href="portafolio/monge-pay.html">` — cuando la página exista
- 48×48px, borde blanco 70% opacidad, ícono SVG diagonal ↗
- Hover: borde blanco sólido

#### Datos confirmados (2026-06-08)

| Campo | Valor |
|---|---|
| Tagline 1 | DISEÑAMOS LA PLATAFORMA MÁS GRANDE DE PAGOS DE COSTA RICA |
| Número | +300% |
| Contexto | de crecimiento · 2025 |
| Cliente | Monge Pay |
| Imágenes del carrusel | `mongepay-desktop.png`, `mongepay.png`, `mongepay_presentation.png` |

---

### 1.2 Carrusel de proyectos seleccionados ✅ implementado

**Comportamiento:**
- Scroll horizontal con `scroll-snap-type: x mandatory`
- Sin autoplay — el usuario controla
- Flechas prev/next en la cabecera de la subsección (`.pcarousel-btn`)
- Swipe touch nativo

**Visibilidad por breakpoint:**

| Breakpoint | Slides visibles | Ancho de slide |
|---|---|---|
| Desktop (>1024px) | 2.5 | `calc(40% - 8px)` |
| Tablet (≤1024px) | 2 | `calc(50% - 10px)` |
| Mobile (≤768px) | 1.2 | `calc(80% - 10px)` |

**Anatomía de cada slide:**

```
┌─────────────────────────────────────────┐
│  [Imagen — object-fit: cover]           │
│  [Overlay rgba(0,0,0,0.72)]             │
│                                [↗]     │  posición: top:16px right:16px
│                                         │
│  ┌──────────────────────────────────┐   │
│  │ INDUSTRIA · AÑO                 │   │  tag: fondo blanco, texto negro
│  │ DATO GANADOR EN MAYÚSCULAS      │   │  clamp(17px → 24px), blanco bold
│  │ Nombre del proyecto             │   │  sm, blanco 65%
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Proyectos activos (7 — datos confirmados 2026-06-08):**

| # | Proyecto | Imagen | Dato ganador | Tag | Link destino |
|---|---|---|---|---|---|
| 1 | Fans.ai | `fans-ia.png` | RED SOCIAL CON IA PARA +50K CREADORES | Social · IA · 2023 | `portafolio/fans-ai.html` |
| 2 | Striano Landing Page | `striano.png` | LANDING QUE TRIPLICÓ LAS CONSULTAS | Moda · Marketing · 2022 | `portafolio/striano.html` |
| 3 | Weezy Towels | `weezy-towels.png` | TIENDA QUE AUMENTÓ EL TICKET PROMEDIO 40% | E-commerce · 2023 | `portafolio/weezy-towels.html` |
| 4 | Dineflows | `dineflows-1.png` | POS DISEÑADO PARA CERO ERRORES EN CAJA | Hospitality · 2023 | `portafolio/dineflows.html` |
| 5 | TSG System | `tsg-presentation.png` | SISTEMA ENTERPRISE PARA 200+ USUARIOS | Enterprise · SaaS · 2022 | `portafolio/tsg-system.html` |
| 6 | Event Virtual Services | `Events-services.png` | EXPERIENCIA DIGITAL PARA 10K+ ASISTENTES | Eventos · Digital · 2022 | `portafolio/ebizont.html` |
| 7 | Retail POS System | `pos-presentation.png` | SISTEMA DE CAJA EN TIEMPO REAL PARA 50+ TIENDAS | Retail · POS · 2021 | `portafolio/retail-pos.html` |

---

### 1.3 Clases BEM implementadas

**Proyecto destacado — panel de contenido:**
```
.project-card--featured__content         fondo oscuro, flex column, gap: 0
.project-card--featured__tagline-1       stat headline, flex:1
.project-card--featured__divider         hr rgba blanco 14%
.project-card--featured__tagline-2       wrapper número, flex:1
.project-card--featured__tagline-2-num   "+300%", clamp(54px→76px)
.project-card--featured__tagline-2-ctx   "de crecimiento · 2025", 13px
.project-card--featured__footer-row      flex row: cliente + flecha
.project-card--featured__client          flex column: label + name
.project-card--featured__client-label    "CLIENTE", Silkscreen 9px
.project-card--featured__client-name     "Monge Pay", bold
.project-card--featured__cta-arrow       48x48px, borde blanco, ↗
```

**Carrusel:**
```
.portfolio-carousel-wrapper              grid-column: 1 / -1
.portfolio-carousel                      flex, overflow-x: auto, scroll-snap
.portfolio-carousel__slide               aspect-ratio 4/3, position: relative
.portfolio-carousel__slide-bg            img object-fit: cover, absolute inset 0
.portfolio-carousel__slide-overlay       rgba(0,0,0,0.72), absolute inset 0
.portfolio-carousel__slide-arrow         <a> 36x36px, top/right: 16px, borde blanco
.portfolio-carousel__slide-content       absolute, flex column, justify: flex-end
.portfolio-carousel__slide-tag           fondo #fff, texto var(--color-text)
.portfolio-carousel__slide-stat          uppercase, blanco, clamp(17px→24px)
.portfolio-carousel__slide-title         sm, rgba(255,255,255,0.65)
.pcarousel-btn / --prev / --next         32x32px, en la cabecera de subsección
```

---

## Parte 2 — Páginas individuales de proyecto

Cada proyecto tiene su propia página `portafolio/[slug].html`.  
URL canónica: `https://uxuaria.com/portafolio/[slug]`

> No existe `portafolio/index.html`. Las páginas individuales son el único nivel de profundidad.

### 2.1 Estructura de cada página

```
1. Navbar (idéntico a homepage)
2. Hero — tag industria/año + dato ganador como H1
3. Resumen — grid meta (rol, entregables, herramientas, año) + párrafo
4. Foto principal — ancho completo, max-height 600px
5. Objetivos — lista
6. Fotos del proceso — grid con captions
7. Resultados reales — números grandes + contexto
8. CTA de contacto (idéntico a homepage)
9. Footer (idéntico a homepage)
```

### 2.2 Template HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <title>[Nombre del proyecto] — Caso de estudio UX | Uxuaria</title>
  <meta name="description" content="[Resumen del proyecto en 1 línea]" />
  <link rel="canonical" href="https://uxuaria.com/portafolio/[slug]" />
  <!-- mismo styles.css, mismas fuentes -->
</head>
<body>

  <!-- Navbar -->

  <section class="case-hero">
    <div class="container">
      <span class="case-hero__tag">[Industria · Año]</span>
      <h1 class="case-hero__title">[Dato ganador — mismo que en homepage]</h1>
    </div>
  </section>

  <section class="case-summary">
    <div class="container case-summary__inner">
      <div class="case-summary__meta">
        <div><strong>Rol</strong><span>[Rol]</span></div>
        <div><strong>Industria</strong><span>[Industria]</span></div>
        <div><strong>Entregables</strong><span>[Lista]</span></div>
        <div><strong>Herramientas</strong><span>[Lista]</span></div>
        <div><strong>Año</strong><span>[Año]</span></div>
      </div>
      <p class="case-summary__text">[Resumen — qué era el producto, cuál era el problema, qué hice. 3-4 líneas.]</p>
    </div>
  </section>

  <section class="case-hero-image">
    <div class="container">
      <img src="../images/portfolio/[imagen-principal]" alt="[descripción]" class="case-hero-image__img" />
    </div>
  </section>

  <section class="case-objectives">
    <div class="container">
      <h2 class="section-title">Objetivos del proyecto</h2>
      <ul class="case-objectives__list">
        <li>[Objetivo 1]</li>
        <li>[Objetivo 2]</li>
        <li>[Objetivo 3]</li>
      </ul>
    </div>
  </section>

  <section class="case-process">
    <div class="container">
      <h2 class="section-title">Proceso de diseño</h2>
      <div class="case-process__grid">
        <figure class="case-process__item">
          <img src="../images/portfolio/[imagen-proceso]" alt="[etapa]" />
          <figcaption>[Descripción breve de la etapa]</figcaption>
        </figure>
        <!-- repetir por imagen disponible -->
      </div>
    </div>
  </section>

  <section class="case-results">
    <div class="container">
      <h2 class="section-title">Resultados</h2>
      <div class="case-results__grid">
        <div class="case-results__stat">
          <span class="case-results__number">[Número]</span>
          <span class="case-results__label">[Contexto]</span>
        </div>
        <!-- repetir por resultado -->
      </div>
      <p class="case-results__context">[Contexto adicional]</p>
    </div>
  </section>

  <!-- CTA de contacto -->
  <!-- Footer -->

</body>
</html>
```

### 2.3 Inventario y prioridad

| # | Proyecto | Slug | Imágenes disponibles hoy | Prioridad |
|---|---|---|---|---|
| 1 | Monge Pay | `monge-pay` | `mongepay-desktop.png`, `mongepay.png`, `mongepay_presentation.png` | 🔴 Alta — es el destacado |
| 2 | Fans.ai | `fans-ai` | `fans-ia.png` | 🟡 Media |
| 3 | Striano Landing Page | `striano` | `striano.png` | 🟡 Media |
| 4 | Weezy Towels | `weezy-towels` | `weezy-towels.png`, `weezy-towels-mobile.png` | 🟡 Media |
| 5 | Dineflows | `dineflows` | `dineflows-1.png`, `dineflows-2.png` | 🟡 Media |
| 6 | TSG System | `tsg-system` | `tsg-presentation.png` | 🟢 Baja |
| 7 | Event Virtual Services | `ebizont` | `Events-services.png` | 🟢 Baja |
| 8 | Retail POS System | `retail-pos` | `pos-presentation.png` | 🟢 Baja |

### 2.4 Clases BEM páginas individuales

```
.case-hero / __tag / __title
.case-summary / __inner / __meta / __text
.case-hero-image / __img          ancho completo, max-height 600px, object-fit: cover
.case-objectives / __list
.case-process / __grid / __item   masonry o grid 2-3 col según imágenes disponibles
.case-results / __grid / __stat / __number / __label / __context
```

---

## Pendientes

### Parte 1 — Homepage ✅ completo

- [x] Carrusel de proyectos seleccionados — 2026-06-08
- [x] Stat headline en proyecto destacado — 2026-06-08
- [x] Panel de contenido oscuro (taglines + footer + flecha) — 2026-06-09
- [x] Flecha ↗ en cada slide del carrusel — 2026-06-09
- [x] Overlay 0.72 en slides — 2026-06-09
- [x] Datos ganadores confirmados — 2026-06-08
- [ ] Conectar flechas CTA a URLs reales (cuando se creen las páginas individuales)

### Parte 2 — Páginas individuales

- [x] Crear `docs/specs/portfolio/monge-pay.md` — contenido 100% confirmado ✅ 2026-06-09
- [x] Crear `portafolio/monge-pay.html` ✅ 2026-06-09
- [x] Conectar flecha ↗ homepage (featured card) → `portafolio/monge-pay.html` ✅ 2026-06-09
- [ ] Replicar para los 7 proyectos restantes según tabla de prioridades
- [ ] Agregar cada página al `sitemap.xml` cuando se publique
