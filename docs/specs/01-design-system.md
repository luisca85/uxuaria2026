# 01 — Design System

**Última actualización:** 2026-06-22  
**Fuente de verdad:** `styles.css` (`:root` + secciones de componentes)  
**Filosofía visual:** Retro 3.1 — bordes duros, sombras desplazadas, sin border-radius en UI, tipografía pixel para labels/badges.

---

## 1. Fuentes

### Cargadas en `<head>`

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Silkscreen:wght@400;700&family=Press+Start+2P&display=swap" rel="stylesheet" />
```

| Variable | Familia | Uso |
|---|---|---|
| `--font` | Inter + system fallbacks | Cuerpo, títulos, todo el texto de UI |
| `--font-pixel` *(en ai-mvp-rescue)* | Silkscreen | Labels, eyebrows, badges, números técnicos |
| `--font-chunky` *(en ai-mvp-rescue)* | Press Start 2P | Elementos retro de impacto |

**Silkscreen** se usa en `styles.css` directamente con `font-family: 'Silkscreen', monospace` (sin variable propia). Se aplica en: `.section-eyebrow`, badges de portafolio, counters del carrusel, `.sp-section-header`, `.s-tag`.

---

## 2. Colores — tokens actuales en `:root`

### Fondos

```css
--color-bg:       #FFFFFF;   /* fondo principal de página */
--color-surface:  #F7F7F5;   /* secciones alternas (servicios, testimonios) */
--color-bg-hover: #FAFAF8;   /* hover de cards */
--color-bg-dark:  #0A0A0A;   /* footer, CTA section, portafolio panel, hero retro */
--color-nav-bg:   rgba(255,255,255,.92); /* navbar glassmorphism */
```

### Bordes

```css
--color-border: #E8E8E4;
```

### Texto

```css
--color-text:         #111111;  /* texto principal + fondo de botones primarios */
--color-text-muted:   #666666;  /* subtextos, descripciones */
--color-text-light:   #999999;  /* bullets, metadata tenue */
--color-text-hover:   #333333;  /* hover de botones oscuros */
--color-text-inverse: #FFFFFF;  /* texto sobre fondo oscuro */
```

### Marca

```css
--color-highlight: #C8F135;  /* acento verde-lima — reservado, sin aplicación actual */
```

### Semánticos

```css
--color-status-active:       #22c55e;  /* punto verde del badge "Trabajando ahora" */
--color-status-active-light: #86efac;  /* anillo exterior del pulse verde */
--color-stars:               #F59E0B;  /* (existía para testimonios — stars eliminadas) */
```

### Blancos con opacidad (solo footer y CTA section)

```css
--color-white-06:  rgba(255,255,255,.06);
--color-white-08:  rgba(255,255,255,.08);
--color-white-10:  rgba(255,255,255,.10);
--color-white-12:  rgba(255,255,255,.12);
--color-white-15:  rgba(255,255,255,.15);
--color-white-30:  rgba(255,255,255,.30);
--color-white-40:  rgba(255,255,255,.40);
--color-white-45:  rgba(255,255,255,.45);
--color-white-55:  rgba(255,255,255,.55);
--color-white-65:  rgba(255,255,255,.65);
--color-white-70:  rgba(255,255,255,.70);
```

### Tokens exclusivos de `ai-mvp-rescue.html` (CSS embebido)

```css
--ochre:    #D9A441;  /* acento ocre — solo en esta landing */
--critical: #d94040;  /* diagnóstico crítico */
--warning:  #c47a1a;  /* diagnóstico advertencia */
--ok:       #2d7a4f;  /* diagnóstico OK */
--hb:       #000;     /* hero black */
--hc:       #F5F5F5;  /* hero cream */
--hbd:      5px;      /* hero border */
```

---

## 3. Tipografía — escala de tamaños

```css
--font-size-xs:   12px;   /* eyebrows, labels uppercase, Silkscreen */
--font-size-sm:   13px;   /* badges, metadata, author role */
--font-size-base: 14px;   /* botones, nav links, body secundario */
--font-size-md:   15px;   /* body de cards, btn--lg */
--font-size-lg:   16px;   /* body principal, section desc */
--font-size-xl:   18px;   /* hero subtitle */
--font-size-2xl:  20px;   /* logo, service card title */
--font-size-3xl:  28px;   /* proof numbers */
```

**Tamaños fluidos** (clamp, definidos en componente):

| Elemento | Valor |
|---|---|
| Hero title | `clamp(40px, 7vw, 56px)` |
| Section titles (h2) | `clamp(28px, 4vw, 40px)` |
| About title | `clamp(32px, 4vw, 48px)` |
| CTA section title | `clamp(32px, 5vw, 52px)` |
| Portafolio stat headline | `clamp(17px, 1.5vw, 23px)` |
| Portafolio número (+300%) | `clamp(54px, 5vw, 76px)` |
| Carrusel slide stat | `clamp(17px, 1.5vw, 24px)` |

### Pesos

```css
--font-weight-medium:   500;
--font-weight-semibold: 600;
--font-weight-bold:     700;
```

### Line heights

```css
--line-height-tight:   1.1;   /* titulares grandes */
--line-height-snug:    1.2;   /* section titles */
--line-height-normal:  1.6;   /* body default */
--line-height-relaxed: 1.7;   /* descripciones de cards */
--line-height-loose:   1.8;   /* about body text */
```

---

## 4. Espaciado

```css
--spacing-section:    100px;  /* padding vertical de secciones */
--spacing-section-sm: 72px;   /* ídem en mobile (≤768px) */
--spacing-container:  24px;   /* padding horizontal del .container */
--spacing-card-gap:   24px;   /* gap entre cards */
--spacing-header-mb:  56px;   /* margin-bottom del .section-header */
```

### `.container`

```css
.container {
  max-width: var(--max-w);  /* 1160px */
  margin: 0 auto;
  padding: 0 var(--spacing-container);  /* 0 24px */
}
```

---

## 5. Bordes, sombras y radio

```css
/* Bordes — patrón retro 3.1 */
border: 3px solid var(--color-text);   /* borde estándar de componentes */
border: 2px solid var(--color-text);   /* borde de badges y tags */

/* Sombra retro desplazada — patrón universal */
box-shadow: 6px 6px 0 0 var(--color-text);   /* cards, project cards */
box-shadow: 8px 8px 0 0 var(--color-text);   /* featured card */
box-shadow: 4px 4px 0 0 var(--color-text);   /* botones y tags */
box-shadow: 3px 3px 0 0 var(--color-text);   /* blog cards hover */

/* Hover: translate compensa la sombra */
transform: translate(3px, 3px);  /* card hover → sombra se reduce a 3px */
transform: translate(4px, 4px);  /* featured hover */

/* Sombras de elevación (solo navbar y modals) */
--shadow-sm: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
--shadow-md: 0 4px 16px rgba(0,0,0,.08);
--shadow-lg: 0 12px 40px rgba(0,0,0,.12);

/* Radios — muy poco uso */
--radius-sm:   8px;    /* badges, avatares */
--radius-md:   12px;
--radius-lg:   20px;
--radius-full: 9999px; /* pills */
```

**Regla:** los componentes de UI (cards, botones principales, tags, inputs) **no tienen border-radius** (`border-radius: 0`). El radio solo se usa en avatares, badges circulares y elementos auxiliares.

---

## 6. Transición

```css
--transition: 0.2s ease;
```

---

## 7. Animaciones

```css
/* Fade-in de secciones al scroll */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Marquee infinito del clients bar */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Pulse del badge verde — hero + CTA */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.5); opacity: 0; }
}

/* Blink digital — badge "Trabajando ahora" en portafolio destacado */
@keyframes blink-dot {
  0%, 49%  { opacity: 1; }
  50%, 100%{ opacity: 0; }
}

/* Entrada de ventanas del hero retro */
@keyframes win-pop {
  from { opacity: 0; transform: scale(.88) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* Animación de números (stat-number) — JS driven */
/* data-target, data-duration, data-prefix, data-suffix */
```

**Accesibilidad:** todas las animaciones están dentro de `@media (prefers-reduced-motion: no-preference)` o desactivadas en `@media (prefers-reduced-motion: reduce)`.

---

## 8. Componentes — inventario

### Botones

| Clase | Descripción |
|---|---|
| `.btn` | Base — `font-size: var(--font-size-base)`, `font-weight: 600`, `border-radius: 0` |
| `.btn--primary` | Negro sólido / texto blanco. Hover: `#333`. Sombra `4px 4px 0` en hover |
| `.btn--ghost` | Borde oscuro / fondo transparente. Hover: fondo `--color-surface` |
| `.btn--outline` | Alias de `.btn--ghost` |
| `.btn--white` | Para fondos oscuros — fondo blanco / texto negro. Hover: `--color-bg-hover` |
| `.btn--lg` | `font-size: var(--font-size-md)`, `padding: 14px 28px` |
| `.btn-retro` | Link con flecha → sin botón visible. Hover: color + translate |

### Badges y tags

| Clase | Descripción |
|---|---|
| `.section-eyebrow` | Silkscreen 12px · uppercase · `letter-spacing: .12em` |
| `.active-work-badge` | "Trabajando ahora" — fondo blanco 8% · borde blanco 28% · dot `blink-dot` |
| `.scarcity-tag` | "Queda 1 cupo" — dot verde pulsante · usado en homepage + ai-mvp-rescue |
| `.featured-label` | "Proyecto destacado" — Silkscreen · borde 2px · sombra 3px |
| `.blog-card__meta` | Categoría + fecha — Silkscreen 10px |
| `.s-tag` | Tag de técnica/skill — Silkscreen · borde 2px |

### Navegación

| Clase | Descripción |
|---|---|
| `.navbar` | Fixed top · backdrop-filter blur · `--color-nav-bg` |
| `.navbar__logo` | `font-size: 20px` · `font-weight: 700` · texto "uxuaria" en minúscula |
| `.nav-link` | `font-size: 14px` · underline en hover |
| `.navbar__hamburger` | 3 spans · toggled con JS · mobile only |
| `.mobile-menu` | Despliega hacia abajo · `aria-hidden` toggle |
| `.breadcrumb` | Ruta de navegación secundaria · usado en blog y servicios |

### Secciones estructurales

| Clase | Descripción |
|---|---|
| `.section-header` | Wrapper eyebrow + título + desc. `margin-bottom: var(--spacing-header-mb)` |
| `.section-title` | H2 principal de sección. `clamp(28px, 4vw, 40px)` · bold |
| `.section-desc` | Párrafo descriptivo bajo el título. `font-size: var(--font-size-lg)` · muted |
| `.blog-hero` | Hero reutilizable para blog, servicios y contacto. `padding: 124px 0 56px` · `border-bottom: 3px solid` |

### Cards

| Clase | Descripción |
|---|---|
| `.project-card--featured` | Tarjeta destacada fila completa — Monge Pay. Grid 2 col (media / content) |
| `.project-card--featured__content` | Panel oscuro derecho — flex col con badge, taglines, footer |
| `.portfolio-carousel` | Carrusel horizontal scroll-snap de proyectos |
| `.portfolio-carousel__slide` | Slide con imagen bg + overlay 0.72 + contenido flotante |
| `.featured-carousel` | Carrusel de imágenes del proyecto destacado (prev/next con counter) |
| `.testimonial-card` | Blockquote + avatar + nombre/rol |
| `.service-card` | Tarjeta de servicio (homepage) — borde 3px · hover translate |

### Formularios y modals

| Clase | Descripción |
|---|---|
| `.ckm-overlay` | Modal UX Checkup/Typeform — `position: fixed; inset: 0; z-index: 1000` |
| `.ckm-panel` | Panel del modal — `border: 3px solid` · `box-shadow: 8px 8px 0` |
| `.ckm-view--info` | Vista informativa del modal (checklist + CTA) |
| `.ckm-view--form` | Vista con iframe de Typeform |

### Artículos de blog y portafolio

| Clase | Descripción |
|---|---|
| `.article-column` | Columna central 50vw (layout 25/50/25 para artículos) |
| `.article-body` | Cuerpo tipográfico — `font-size: 16px` · `line-height: 1.8` |
| `.related-articles__track` | Carrusel horizontal de artículos relacionados |
| `.case-hero` | Hero de páginas de portafolio individual |
| `.case-summary` | Grid meta + párrafo de descripción |
| `.case-results` | Estadísticas con número grande + label |

### Exclusivos de Servicios (`servicios/servicios.css`)

| Clase | Descripción |
|---|---|
| `.s-service-block` | Bloque horizontal 55%/45% con parallax — página `servicios/index.html` |
| `.sp-section-header` | Divisor Silkscreen entre secciones de servicio individual |
| `.sp-deliverable` | Card de entregable con barra de archivo `.DOC` / `.FIG` |
| `.sp-step` | Paso numerado del proceso |

---

## 9. Utilidades

```css
.visually-hidden  /* H1 SEO — visible para lectores de pantalla, no para usuario */
.container        /* max-width 1160px, padding horizontal 24px */
```

---

## 10. Sticky CTA (mobile)

```html
<a href="https://calendly.com/luisca85/charla-introductoria-clone"
   class="sticky-cta" data-track="cta_sticky_call">
  ▶ Agendá una llamada
</a>
```

Fixed bottom · solo visible en mobile · z-index alto · `background: var(--color-text)` · texto blanco.
