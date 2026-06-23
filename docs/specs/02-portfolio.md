# 02 — Portafolio

**Estado:** ✅ Completamente implementado (7 páginas + sección homepage)  
**Archivos:** `index.html` (sección `#portafolio`), `portafolio/[slug].html`  
**Última actualización:** 2026-06-22

---

## Arquitectura de navegación

No existe `portafolio/index.html`. Los usuarios van directamente desde la sección `#portafolio` de la homepage a la página individual de cada proyecto.

```
homepage #portafolio
  ├── Proyecto destacado (Monge Pay)  ──→ portafolio/monge-pay.html      ✅
  ├── Carrusel / Disney+ Telecom      ──→ portafolio/disney-telecom.html  ✅
  ├── Carrusel / Striano              ──→ portafolio/striano.html         ✅
  ├── Carrusel / WeLink               ──→ portafolio/we-link.html         ✅
  ├── Carrusel / VES                  ──→ portafolio/ves.html             ✅
  ├── Carrusel / Fans.ai              ──→ portafolio/fans-ai.html         ✅
  └── Carrusel / Greenify             ──→ portafolio/greenify.html        ✅
```

**Proyectos con imágenes disponibles pero sin página HTML:**

| Proyecto | Directorio de imágenes |
|---|---|
| Dineflows | `images/portfolio/Dineflows/` |
| TSG System | `images/portfolio/TSG/` |
| Weezy Towels | `images/portfolio/WEEZY/` |
| MyMed | `images/portfolio/mymed/` |

---

## Sección homepage — `#portafolio`

### Encabezado de sección

```
[eyebrow]  Proyectos
[título]   Esto es lo que sucede cuando el diseño es una decisión de negocio.
[desc]     Trabajo real con startups y empresas reales. Desde validar un MVP
           hasta rediseñar una experiencia que no estaba convirtiendo.
```

---

### Proyecto destacado — Monge Pay ✅

**Layout:** dos columnas — media izquierda (carrusel de imágenes) / contenido derecho (panel oscuro `--color-bg-dark`).

#### Panel de contenido

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

#### Datos confirmados

| Campo | Valor |
|---|---|
| Tagline 1 | DISEÑAMOS LA PLATAFORMA MÁS GRANDE DE PAGOS DE COSTA RICA |
| Número | +300% |
| Contexto | de crecimiento · 2025 |
| Cliente | Monge Pay |
| Imágenes del carrusel | `mongepay-desktop.png`, `mongepay.png`, `mongepay_presentation.png` |
| Link ↗ | `portafolio/monge-pay.html` |

**Badge "Trabajando ahora":**
- Animación del punto verde: `@keyframes blink-dot` — on/off digital, `1.2s infinite`
- Sobreescribe `@keyframes pulse` solo dentro de `.project-card--featured`

**Flecha CTA:** 48×48px, borde blanco 70% opacidad, ícono SVG diagonal ↗. Hover: borde blanco sólido.

---

### Carrusel de proyectos seleccionados ✅

**Comportamiento:**
- Scroll horizontal con `scroll-snap-type: x mandatory`
- Sin autoplay — usuario controla
- Flechas prev/next en cabecera de subsección (`.pcarousel-btn`)
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

**Proyectos activos en carrusel (6 slides — estado 2026-06-22):**

| # | Proyecto | Imagen | Dato ganador | Tag | Página |
|---|---|---|---|---|---|
| 1 | Disney+ Telecom Argentina | `disney-telecom/Frame 5567.png` | DISEÑANDO LA ACTIVACIÓN DE DISNEY+ PARA CLIENTES DE TELECOM | Telecom · Streaming · In-house · 2023 | `portafolio/disney-telecom.html` ✅ |
| 2 | Striano | `Striano/striano.png` | UNA SOFTWARE FACTORY CON IDENTIDAD PROPIA PARA EL MERCADO NORTEAMERICANO | Software Factory · UI/UX · USA · 2022 | `portafolio/striano.html` ✅ |
| 3 | WeLink | `Welink/Frame 147.png` | 130.000 VISITANTES, DOS AUDIENCIAS OPUESTAS UNA SOLA HOME PAGE | Marketplace · Two-sided Platform · Europa · 2023 | `portafolio/we-link.html` ✅ |
| 4 | Virtual Event Services | `VES/Events-services.png` | +100 EVENTOS HOSPEDADOS, UNA PLATAFORMA QUE DISEÑAMOS DESDE CERO | Enterprise · Pharma · Plataforma digital · 2022 | `portafolio/ves.html` ✅ |
| 5 | Fans.ai | `Fans.ia/fans-ia.png` | (ver HTML) | Social · IA · 2023 | `portafolio/fans-ai.html` ✅ |
| 6 | Greenify | `greenify/` | (ver HTML) | (ver HTML) | `portafolio/greenify.html` ✅ |

---

## Páginas individuales — estructura

Cada proyecto tiene su propia página `portafolio/[slug].html`. URL canónica: `https://uxuaria.com/portafolio/[slug]`.

### Secciones de cada página

```
1. Navbar (idéntico a homepage)
2. case-hero — tag industria/año + dato ganador como H1 visual
3. case-summary — grid meta (rol, entregables, herramientas, año) + párrafo
4. case-hero-image — foto principal, ancho completo, max-height 600px
5. case-objectives — lista de objetivos
6. case-process — grid de imágenes del proceso con captions
7. case-results — números grandes + contexto
8. CTA de contacto (idéntico a homepage)
9. Footer (idéntico a homepage)
```

### Template HTML

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
      </div>
      <p class="case-results__context">[Contexto adicional]</p>
    </div>
  </section>

  <!-- CTA de contacto -->
  <!-- Footer -->

</body>
</html>
```

---

## Clases BEM

### Sección homepage — proyecto destacado

```
.project-card--featured__content         fondo oscuro, flex column
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

### Sección homepage — carrusel

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

### Páginas individuales

```
.case-hero / __tag / __title
.case-summary / __inner / __meta / __text
.case-hero-image / __img          ancho completo, max-height 600px, object-fit: cover
.case-objectives / __list
.case-process / __grid / __item   masonry o grid 2-3 col según imágenes disponibles
.case-results / __grid / __stat / __number / __label / __context
```

---

## Inventario completo

| # | Proyecto | Slug | Estado HTML | Imágenes |
|---|---|---|---|---|
| 1 | Monge Pay | `monge-pay` | ✅ Implementado | `mongepay/` (4 imágenes + @2x) |
| 2 | Disney+ Telecom Argentina | `disney-telecom` | ✅ Implementado | `disney-telecom/` |
| 3 | Striano | `striano` | ✅ Implementado | `Striano/striano.png` |
| 4 | WeLink | `we-link` | ✅ Implementado | `Welink/Frame 147.png` |
| 5 | Virtual Event Services (VES) | `ves` | ✅ Implementado | `VES/Events-services.png` |
| 6 | Fans.ai | `fans-ai` | ✅ Implementado | `Fans.ia/fans-ia.png` |
| 7 | Greenify | `greenify` | ✅ Implementado | `greenify/` |
| — | Dineflows | — | ❌ No creado | `Dineflows/` |
| — | TSG System | — | ❌ No creado | `TSG/` |
| — | Weezy Towels | — | ❌ No creado | `WEEZY/` |
| — | MyMed | — | ❌ No creado | `mymed/` |

---

## Briefs de proyectos implementados

### Monge Pay

**Industria:** Fintech · Pagos · Costa Rica · 2023–2025  
**Rol:** UX Lead  
**Entregables:** Research, wireframes, prototipo hi-fi, design system  
**Herramientas:** Figma, UserTesting  
**Resultado:** +300% de crecimiento de usuarios · 2025  

**Descripción:** Diseño de la plataforma de pagos digitales de Grupo Monge para Costa Rica — la más grande del país. El trabajo incluyó research con usuarios, arquitectura de información, diseño de flujos de pago, onboarding y design system para los equipos de desarrollo.

**Imágenes:**
- `images/portfolio/mongepay/mongepay-desktop.png`
- `images/portfolio/mongepay/mongepay.png`
- `images/portfolio/mongepay/mongepay_presentation.png`
- `images/portfolio/mongepay/mongepay_presentation 1.png`
- Versiones @2x disponibles

---

### Disney+ Telecom Argentina

**Industria:** Telecom · Streaming · In-house · 2023  
**Rol:** UX Designer In-house  
**Dato ganador:** DISEÑANDO LA ACTIVACIÓN DE DISNEY+ PARA CLIENTES DE TELECOM  
**Imagen principal:** `images/portfolio/disney-telecom/Frame 5567.png`

---

### Striano

**Industria:** Software Factory · UI/UX · USA · 2022  
**Dato ganador:** UNA SOFTWARE FACTORY CON IDENTIDAD PROPIA PARA EL MERCADO NORTEAMERICANO  
**Imagen principal:** `images/portfolio/Striano/striano.png`

---

### WeLink

**Industria:** Marketplace · Two-sided Platform · Europa · 2023  
**Dato ganador:** 130.000 VISITANTES, DOS AUDIENCIAS OPUESTAS UNA SOLA HOME PAGE  
**Imagen principal:** `images/portfolio/Welink/Frame 147.png`

---

### Virtual Event Services (VES)

**Industria:** Enterprise · Pharma · Plataforma digital · 2022  
**Dato ganador:** +100 EVENTOS HOSPEDADOS, UNA PLATAFORMA QUE DISEÑAMOS DESDE CERO  
**Imagen principal:** `images/portfolio/VES/Events-services.png`

---

### Fans.ai

**Industria:** Social · IA · 2023  
**Imagen principal:** `images/portfolio/Fans.ia/fans-ia.png`  
*(Ver HTML de la página para copy completo)*

---

### Greenify

**Imagen principal:** `images/portfolio/greenify/`  
*(Ver HTML de la página para copy completo)*

---

## Pendientes

- [ ] Agregar las 7 páginas de portafolio al `sitemap.xml`
- [ ] Decidir si se crean páginas para Dineflows, TSG, Weezy Towels, MyMed
